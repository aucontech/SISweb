import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BallValueCenter() {
    const [sensorData, setSensorData] = useState<any>([]);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);

    const [data, setData] = useState([]);

    const [Status, setStatus] = useState<any>([]);

    const token = readToken();

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
                                key: "BallValue_center",
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
                                key: "BallValue_center",
                            },
                        ],
                    },
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj2));
                });
            };

            ws.current.onclose = () => {};

            return () => {
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_center
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_center
                            .ts;
                    setUpTS(ballTS);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_center
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_center.ts;

                    setUpData(updatedData);
                    setUpTS(updateTS);
                }
            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            const newValue = !sensorData;
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                { BallValue_center: newValue }
            );
            setSensorData(newValue);
            fetchData();
        } catch (error) {}
    };

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/values/attributes/SERVER_SCOPE"
            );
            setData(res.data);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {data.map((item: any) => (
                <div key={item.key}>
                    {item.key === "BallValue_center" && (
                        <div>
                           <button
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    width: 50,
                                    height: 50,
                                    background: "white",
                                    fontWeight: 600,
                                    fontSize: 25,
                                }}
                                onClick={handleButtonClick}
                            >
                                {item.value.toString() === "false" ? (
                                    <div style={{   display: "flex", flexDirection: "column", alignItems: "center", }}>
                                        <div style={{display:'flex'}}>
                                        <Image
                                        style={{marginRight:10}}
                                            src="/layout/imgGraphic/checkValue.png"
                                            width={50}
                                            height={50}
                                            alt="Picture of the author"
                                        /> 
                                        <Image
                                            src="/layout/imgGraphic/BallVavle.png"
                                            width={50}
                                            height={50}
                                            alt="Picture of the author"
                                        /> 
                                              
                                        </div>

                                        <p  style={{color:'red', padding:5,borderRadius:10}} >Close</p>

                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{display:'flex'}}>
                                        <Image
                                        style={{marginRight:10}}
                                            src="/layout/imgGraphic/checkValue.png"
                                            width={50}
                                            height={50}
                                            alt="Picture of the author"
                                        /> 
                                        <Image
                                            src="/layout/imgGraphic/BallVavleON.png"
                                            width={50}
                                            height={50}
                                            alt="Picture of the author"
                                        />
                                        </div>
                                        <p style={{color:'green', padding:5,borderRadius:10}}>Open</p>

                                    </div>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
