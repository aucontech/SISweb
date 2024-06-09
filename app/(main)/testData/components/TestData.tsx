import { readToken } from '@/service/localStorage';
import React, { useEffect, useRef, useState } from 'react'
import { id_OTSUKA } from '../../data-table-device/ID-DEVICE/IdDevice';
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}


interface ValueStateMap {
    [key: string]: React.Dispatch<React.SetStateAction<string | null>> | undefined;
  }
export default function TestData() {


    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);

    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const [EVC_STT01, setEVC_STT01] = useState<string | null>(null);
    const [EVC_STT01Value, setEVC_STT01Value] = useState<string | null>(null);
    const [EVC_STT02, setEVC_STT02] = useState<string | null>(null);
    const [EVC_STT02Value, setEVC_STT02Value] = useState<string | null>(null);
    const [PLC_STT, setPLC_STT] = useState<string | null>(null);
    const [PLC_STTValue, setPLC_STTValue] = useState<string | null>(null);


    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_OTSUKA,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setCheckConnectData(true);
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setCheckConnectData(false);
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                

                        EVC_01_Conn_STT: setEVC_STT01,
                        EVC_02_Conn_STT: setEVC_STT02,
                        PLC_Conn_STT: setPLC_STT,


                    };


                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
                        EVC_02_Conn_STT: setEVC_STT02Value,
                        PLC_Conn_STT: setPLC_STTValue,
                      };

                  
          keys.forEach((key) => {
            if (stateMap[key] && valueStateMap[key]) {
              const timestamp = dataReceived.data[key][0][0]; // Get the timestamp
              const value = dataReceived.data[key][0][1]; // Get the value
              stateMap[key]?.(new Date(timestamp).toLocaleString()); // Convert timestamp to locale string
              valueStateMap[key]?.(value); // Set the value
            }
          });
                }
            };
        }
    }, [data]);
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
  return (
    <div>

        {EVC_STT01}

        <div>
        <strong>EVC_01_Conn_STT Value:</strong> {EVC_STT01Value}
      </div>
    </div>
  )
}
