import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { SDV, SVD_NO } from "../demoGraphicOtsuka/iconSVG";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

export default function SDV_Otsuka() {


    const [data, setData] = useState<any[]>([]);


    const token = readToken();

    const[NC,setNC] = useState<string | null>(null);
    const[NO,setNO] = useState<string | null>(null);
    const [PT02, setPT02] = useState<string | null>(null);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const ws = useRef<WebSocket | null>(null);

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
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
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
                        DI_ZSC_1:setNC,
                        DI_ZSO_1:setNO,

                    
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }
            };
        }
    }, [data]);


    return (
        <div>
      
            {NO === '1' &&  <div>
                NO {SDV}
            </div>}
            {NC === '1' && <div>
                NC {SVD_NO}
            </div>}
            {NC === '0' && NO === '0' && <div> {SVD_NO}</div>}

          
        </div>
    );
}
