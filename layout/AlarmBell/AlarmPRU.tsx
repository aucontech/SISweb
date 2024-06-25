import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
import { id_CNG_PRU } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";

export default function AlarmPRU() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const ws = useRef<WebSocket | null>(null);
    const [alarmCount, setAlarmCount] = useState<number | undefined>(undefined);

    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket(url);

            const obj1 = {
                attrSubCmds: [],
                tsSubCmds: [],
                historyCmds: [],
                entityDataCmds: [
                    {
                        query: {
                            entityFilter: {
                                type: "singleEntity",
                                singleEntity: {
                                    entityType: "DEVICE",
                                    id: id_CNG_PRU,
                                },
                            },
                            pageLink: {
                                pageSize: 1024,
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
                                { type: "ENTITY_FIELD", key: "name" },
                                { type: "ENTITY_FIELD", key: "label" },
                                { type: "ENTITY_FIELD", key: "additionalInfo" },
                            ],
                            latestValues: [],
                        },
                        cmdId: 1,
                    },
                    {
                        query: {
                            entityFilter: {
                                type: "singleEntity",
                                singleEntity: {
                                    entityType: "DEVICE",
                                    id: id_CNG_PRU,
                                },
                            },
                            pageLink: {
                                pageSize: 1024,
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
                                { type: "ENTITY_FIELD", key: "name" },
                                { type: "ENTITY_FIELD", key: "label" },
                                { type: "ENTITY_FIELD", key: "additionalInfo" },
                            ],
                            latestValues: [],
                        },
                        cmdId: 2,
                    },
                ],
                entityDataUnsubscribeCmds: [],
                alarmDataCmds: [],
                alarmDataUnsubscribeCmds: [],
                entityCountCmds: [],
                entityCountUnsubscribeCmds: [],
                alarmCountCmds: [
                    {
                        query: {
                            severityList: ["CRITICAL"],
                            statusList: ["ACTIVE", "UNACK"],
                            searchPropagatedAlarms: false,
                            assigneeId: null,
                        },
                        cmdId: 3,
                    },
                ],
                alarmCountUnsubscribeCmds: [],
            };

            ws.current.onopen = () => {
                console.log("WebSocket connection opened.");
                ws.current?.send(JSON.stringify(obj1));
            };

            ws.current.onmessage = (evt) => {
                const dataReceive = JSON.parse(evt.data);
                setAlarmCount(dataReceive.count);
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
            };
        };

        connectWebSocket();

        const interval = setInterval(() => {
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    alarmCountCmds: [
                        {
                            query: {
                                severityList: ["CRITICAL"],
                                statusList: ["ACTIVE", "UNACK"],
                                searchPropagatedAlarms: false,
                                assigneeId: null,
                            },
                            cmdId: 3,
                        },
                    ],
                }));
            }
        }, 10000); // 10 seconds interval

        return () => {
            clearInterval(interval);
            ws.current?.close();
        };
    }, [url]);

    return (
        <div>
            {alarmCount === undefined ? (
                <div style={{}}></div>
            ) : alarmCount > 0 ? (
                <div
                    style={{
                        background: 'red',
                        width: 150,
                        height: 60,
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        borderRadius: 5,
                        fontWeight: 500,
                        fontSize: 25,
                    }}
                >
                    Alarming
                </div>
            ) : (
                <div
                    style={{
                        background: 'green',
                        width: 150,
                        height: 60,
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        borderRadius: 5,
                        fontWeight: 500,
                        fontSize: 25,
                    }}
                >
                    Normal
                </div>
            )}
        </div>
    );
}
