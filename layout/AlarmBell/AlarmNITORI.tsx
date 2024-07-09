import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
import { id_NITORI } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";

export default function AlarmNITORI() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const ws = useRef<WebSocket | null>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    console.log('totalElements: ', totalElements);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [],
            historyCmds: [],
            entityDataCmds: [],
            entityDataUnsubscribeCmds: [],
            alarmDataCmds: [
                {
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_NITORI,
                            },
                        },
                        pageLink: {
                            page: 0,
                            pageSize: 10,
                            textSearch: null,
                            typeList: [],
                            severityList: ["CRITICAL"],
                            statusList: ["ACTIVE"],
                            searchPropagatedAlarms: false,
                            assigneeId: null,
                            sortOrder: {
                                key: {
                                    key: "createdTime",
                                    type: "ALARM_FIELD",
                                },
                                direction: "DESC",
                            },
                            timeWindow: 86400000,
                        },
                        alarmFields: [
                            { type: "ALARM_FIELD", key: "createdTime" },
                            { type: "ALARM_FIELD", key: "originator" },
                            { type: "ALARM_FIELD", key: "type" },
                            { type: "ALARM_FIELD", key: "severity" },
                            { type: "ALARM_FIELD", key: "status" },
                            { type: "ALARM_FIELD", key: "assignee" },
                        ],
                        entityFields: [],
                        latestValues: [],
                    },
                    cmdId: 1,
                },
            ],
            alarmDataUnsubscribeCmds: [],
            entityCountCmds: [],
            entityCountUnsubscribeCmds: [],
            alarmCountCmds: [],
            alarmCountUnsubscribeCmds: [],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onmessage = (evt) => {
                const dataReceived = JSON.parse(evt.data);
                if (dataReceived.data) {
                    const totalElements = dataReceived.data.totalElements || 0;
                    setTotalElements(totalElements);
                }
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, [url]);

    return (
        <div>

            {totalElements === undefined ? (
                <div style={{}}></div>
            ) : totalElements > 0 ? (
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
