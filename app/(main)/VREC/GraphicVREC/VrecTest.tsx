import { readToken } from '@/service/localStorage';
import React, { useEffect, useRef, useState } from 'react';
import { id_LGDS, id_VREC } from '../../data-table-device/ID-DEVICE/IdDevice';

interface ValueStateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

export default function VrecTest() {
    const token = readToken();
    const [data, setData] = useState<any[]>([]);
    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const [resetKey, setResetKey] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [cmdId, setCmdId] = useState(1); // Track cmdId for requests

    const connectWebSocket = (cmdId: number) => {
        const token = localStorage.getItem('accessToken');
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_LGDS,
                    scope: "LATEST_TELEMETRY",
                    cmdId: cmdId, // Use dynamic cmdId for new requests
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData((prevData) => [...prevData, dataReceived]); // Update data state with new message
                    const keys = Object.keys(dataReceived.data);
                
                    const valueStateMap: ValueStateMap = {
                        FC_Conn_STT: setFC_Conn_STTValue,
                    };

                    keys.forEach((key) => {
                        if (valueStateMap[key]) {
                            const value = dataReceived.data[key][0][0];
                            const date = new Date(value);
                            const formattedDate = `${date
                                .getDate()
                                .toString()
                                .padStart(2, "0")}-${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate);
                        }
                    });
                }
                
            };
        }
    };

    useEffect(() => {
        if (isOnline) {
            // Initial connection
            connectWebSocket(cmdId);
        }

        return () => {
            if (ws.current) {
                console.log("Cleaning up WebSocket connection.");
                ws.current.close();
            }
        };
    }, [isOnline, cmdId]); // Reconnect if isOnline or cmdId changes

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            console.log('Back online. Reconnecting WebSocket with new cmdId.');
            setCmdId(prevCmdId => prevCmdId + 1); // Increment cmdId on reconnect
        };

        const handleOffline = () => {
            setIsOnline(false);
            console.log('Offline detected. Closing WebSocket.');
            if (ws.current) {
                ws.current.close(); // Close WebSocket when offline
            }
        };

        // Attach event listeners for online/offline status
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            // Cleanup event listeners on unmount
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div key={resetKey}>
            {isOnline ? (
                <p>Internet connection is active. WebSocket connected.</p>
            ) : (
                <p>No internet connection. Please check your network.</p>
            )}
            <div>{FC_Conn_STTValue}</div>
        </div>
    );
}
