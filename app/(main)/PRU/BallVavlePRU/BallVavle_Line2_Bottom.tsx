import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import React, { useEffect, useRef, useState } from "react";
import { id_CNG_PRU, id_ZOCV } from "../../data-table-device/ID-DEVICE/IdDevice";
import { GetTelemetry_PRU, PostTelemetry_PRU } from "../GraphicPRU/Api_PRU";
import { BallVavleOff, BallVavleOn } from "../GraphicPRU/iconSVG";

// export default function BallValue01({ onDataLine1 }: { onDataLine1: (data: any) => void }) {

export default function BallVavle_Line2_Bottom() {

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
                                key: "BallVavle_Line2_Bottom",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_CNG_PRU,
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
                                key: "BallVavle_Line2_Bottom",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallVavle_Line2_Bottom
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallVavle_Line2_Bottom
                            .ts;
                    setUpTS(ballTS);
                    // onDataLine1({ value: ballValue});

                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallVavle_Line2_Bottom
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallVavle_Line2_Bottom.ts;

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
               PostTelemetry_PRU,
                { BallVavle_Line2_Bottom: newValue }
            );
            setSensorData(newValue);
            
        } catch (error) {}
    };

        const fetchData = async () => {
            try {
                const res = await httpApi.get(
                   GetTelemetry_PRU
                );
                setData(res.data);
                const ballValue = res.data.find((item: any) => item.key === "BallVavle_Line2_Bottom")?.value;
                // onDataLine1(ballValue);
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
                    {item.key === "BallVavle_Line2_Bottom" && (
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
