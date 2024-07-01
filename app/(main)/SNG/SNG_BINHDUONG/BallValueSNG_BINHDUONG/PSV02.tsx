import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useEffect, useRef, useState } from "react";
import { colorData, colorNameValue } from "../Graphic_SNG_BINHDUONG/Graphic_SNG_BINHDUONG";

export default function PSV02() {
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
                                key: "PSV02",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
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
                                key: "PSV02",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV02.value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV02.ts;
                    setUpTS(ballTS);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV02.value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV02.ts;

                    setUpData(updatedData);
                    setUpTS(updateTS);
                }
            };
        }
    }, []);

    // const handleButtonClick = async () => {
    //     try {
    //         await httpApi.post(
    //             "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
    //             { PSV02: inputValue }
    //         );
    //         setUpData(inputValue);
    //         op.current?.hide();
    //     } catch (error) {
    //         console.log("error: ", error);
    //     }
    // };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue = Number(event.target.value);
    //     setInputValue(newValue);
    // };

    // const handleButtonToggle = (e: React.MouseEvent) => {
    //     op.current?.toggle(e);
    //     setInputValue(upData);
    // };

    return (
        <div>
            <div
                style={{
                    border: "none",
                    fontSize: 15,
                    color: "white",
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "space-between",
                    fontWeight: 400,
                }}
            >
                <p style={{ color: colorNameValue }}>PSV-2004</p>
                <p style={{ marginLeft: 20, color: colorData }}> {upData} </p>
                <p style={{ marginLeft: 10, color: colorNameValue }}>BarG</p>
            </div>

            {/* <OverlayPanel ref={op}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 120,
                    }}
                >
                    <p style={{ fontWeight: 500 }}>PCV-1901</p>
                    <InputText
                        keyfilter="int"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Button
                        style={{ marginTop: 5 }}
                        label="Update"
                        onClick={handleButtonClick}
                    />
                </div>
            </OverlayPanel> */}
        </div>
    );
}
