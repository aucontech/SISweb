import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { colorData, colorNameValue } from "../GraphicNITORI/graphicNITORI";
import { id_NITORI } from "../../data-table-device/ID-DEVICE/IdDevice";


export default function PCV_02_Otsuka() {
    const [sensorData, setSensorData] = useState<any>([]);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);

    const [inputValue, setInputValue] = useState<any>();

    const token = readToken();
    const op = useRef<OverlayPanel>(null);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj2 = {
            entityDataCmds: [
                {
                    cmdId: 1,
                    latestCmd: {
                        keys: [
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_02",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_NITORI,
                            },
                        },
                        pageLink: {
                            pageSize: 1,
                            page: 0,
                            sortOrder: {
                                key: {
                                    type: "ENTITY_FIELD",
                                    key: "createdTime",
                                },
                                direction: "DESC",
                            },
                        },
                        entityFields: [
                            {
                                type: "ENTITY_FIELD",
                                key: "name",
                            },
                            {
                                type: "ENTITY_FIELD",
                                key: "label",
                            },
                            {
                                type: "ENTITY_FIELD",
                                key: "additionalInfo",
                            },
                        ],
                        latestValues: [
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_02",
                            },
                        ],
                    },
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj2));
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
            ws.current.onmessage = (event) => {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_02.value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_02.ts;
                    setUpTS(ballTS);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_02.value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_02.ts;

                    setUpData(updatedData);
                    setUpTS(updateTS);
                }
            };
        }
    }, []);



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputValue(newValue);
    };

    const handleButtonToggle = (e: React.MouseEvent) => {
        op.current?.toggle(e);
        setInputValue(upData);
    };

    return (
        <div>
            <div
                style={{
                    border: "none",
                    fontSize: 22,
                    color: "white",
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "space-between",
                    fontWeight: 500,
                }}
                onClick={handleButtonToggle}
            >
                <p style={{ color: 'black' }}>PCV-1302 : </p>
                <p style={{ marginLeft: 20, color: 'black' }}> {upData} </p>
                <p style={{ marginLeft: 10,color: 'black'}}>BarG</p>
            </div>

            {/* <OverlayPanel ref={op}>
                <div style={{display:'flex', flexDirection:'column',}}>
                <p  style={{fontWeight:500}}>PCV-1902</p>

                <InputText keyfilter="int" value={inputValue} onChange={handleInputChange} />

                    <Button style={{marginTop:5}} label="Update" onClick={handleButtonClick} />
                </div>
            </OverlayPanel> */}
        </div>
    );
}
