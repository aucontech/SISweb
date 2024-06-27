import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BallVavle, BallVavleOff, BallVavleOn, BallVavleRightOff } from "../GraphicZOVC/iconSVG";
import { id_YOSHINO } from "../../data-table-device/ID-DEVICE/IdDevice";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "../GraphicZOVC/Api_ZOVC";

export default function BallVavlePSV() {
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
                                key: "BallVavlePSV",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_YOSHINO,
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
                                key: "BallVavlePSV",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallVavlePSV
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallVavlePSV
                            .ts;
                    setUpTS(ballTS);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallVavlePSV
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallVavlePSV.ts;

                    setUpData(updatedData);
                    setUpTS(updateTS);
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
              
                { BallVavlePSV: newValue }
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
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {data.map((item: any) => (
                <div key={item.key}>
                    {item.key === "BallVavlePSV" && (
                        <div
                        style={{
                            cursor: "pointer",
                            border: "none",
                           
                        }}
                        onClick={handleButtonClick}

                         >
                            
                                {item.value.toString() === "false" ? (
                                    <div style={{   }}>

<Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />

                                    </div>
                                ) : (
                                    <div style={{    }}>

                                               {BallVavleRightOff}

                                    </div>
                                )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
