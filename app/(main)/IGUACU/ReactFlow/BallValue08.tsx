import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import React, { useEffect, useRef, useState } from "react";
import {  BallVavleOff, BallVavleOn } from "../GraphicIGUACU/iconSVG";
import { id_KOA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "../GraphicIGUACU/Api_ZOVC";

export default function BallValue08({ onDataLine8 }: { onDataLine8: (data: any) => void }) {
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
                                key: "BallValue_08",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_KOA,
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
                                key: "BallValue_08",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_08
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_08
                            .ts;
                    setUpTS(ballTS);
                    onDataLine8({ value: ballValue});

                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_08
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_08.ts;

                    setUpData(updatedData);
                    onDataLine8({ value: updatedData});

                }
        fetchData();

            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            const newValue = !sensorData;
            await httpApi.post(
PostTelemetry_ZOVC,
                { BallValue_08: newValue }
            );
            setSensorData(newValue);
        } catch (error) {}
    };

        const fetchData = async () => {
            try {
                const res = await httpApi.get(
                    GetTelemetry_ZOVC,
                );
                setData(res.data);
                const ballValue = res.data.find((item: any) => item.key === "BallValue_08")?.value;
                onDataLine8(ballValue);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        useEffect(() => {

        fetchData();
    }, [onDataLine8]);


    return (
        <div>
            {data.map((item: any) => (
                <div key={item.key}>
                    {item.key === "BallValue_08" && (
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
