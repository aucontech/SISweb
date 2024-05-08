import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import React, { useEffect, useRef, useState } from "react";
import {  BallVavleOff, BallVavleOn } from "../demoGraphicOtsuka/iconSVG";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";

// export default function BallValue01({ onDataLine1 }: { onDataLine1: (data: any) => void }) {

export default function BallValueFirst() {

    const [sensorData, setSensorData] = useState<any>([]);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);

    const [data, setData] = useState([]);


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
                                key: "BallValue_First",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_OTSUKA,
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
                                key: "BallValue_First",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_First
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_First
                            .ts;
                    setUpTS(ballTS);
                    // onDataLine1({ value: ballValue});

                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_First
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_First.ts;

                    setUpData(updatedData);
                    // onDataLine1({ value: updatedData});

                }
        fetchData();

            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            const newValue = !sensorData;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { BallValue_First: newValue }
            );
            setSensorData(newValue);
            
        } catch (error) {}
    };

        const fetchData = async () => {
            try {
                const res = await httpApi.get(
                    `/plugins/telemetry/DEVICE/${id_OTSUKA}/values/attributes/SERVER_SCOPE`
                );
                setData(res.data);
                const ballValue = res.data.find((item: any) => item.key === "BallValue_First")?.value;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        useEffect(() => {
            fetchData();

    }, []);


    return (
        <div>
            {data.map((item: any) => (
                <div key={item.key}>
                    {item.key === "BallValue_First" && (
                        <div
                        style={{
                            cursor: "pointer",
                            border: "none",
                           
                        }}
                        onClick={handleButtonClick}

                         >
                             {item.value ? <div> {BallVavleOn}</div> :  <div>{BallVavleOff}</div> }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
