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
    const [criticalElements, setCriticalElements] = useState<number>(0);
    const [majorElements, setMajorElements] = useState<number>(0);
    console.log('criticalElements: ', criticalElements);
    console.log('majorElements: ', majorElements);

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
                                id: id_CNG_PRU,
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

        const obj2 = {
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
                                id: id_CNG_PRU,
                            },
                        },
                        pageLink: {
                            page: 0,
                            pageSize: 10,
                            textSearch: null,
                            typeList: [],
                            severityList: ["MAJOR"],
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
                    cmdId: 2,
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
                    ws.current?.send(JSON.stringify(obj2));
                });
            };

            ws.current.onmessage = (evt) => {
                const dataReceived = JSON.parse(evt.data);
                if (dataReceived.data) {
                    if (dataReceived.data.cmdId === 1) {
                        const criticalElements = dataReceived.data.totalElements || 0;
                        setCriticalElements(criticalElements);
                    }
                    if (dataReceived.data.cmdId === 2) {
                        const majorElements = dataReceived.data.totalElements || 0;
                        setMajorElements(majorElements);
                    }
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
        <div style={{display:'flex',}}>
            <div>
                {criticalElements === 0 ? (
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
                            marginBottom: 10,
                        }}
                    >
                        Normal
                    </div>
                ) : (
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
                            marginBottom: 10,
                        }}
                    >
                        Critical Alarming
                    </div>
                )}
            </div>
            <div style={{marginLeft:10}}>
                {majorElements === 0 ? (
                    " "
                ) : (
                    <div
                        style={{
                            background: 'orange',
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
                            marginBottom: 10,
                        }}
                    >
                        Major Alarming
                    </div>
                )}
            </div>
        </div>
    );
}
