import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
import { id_OTSUKA } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";

export default function AlarmOTSUKA() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    interface Notification {
        subject: string;
        text: string;
    }

    const ws = useRef<WebSocket | null>(null);


    const [AlarmCount , setAlarmCount ]= useState<any>()

    useEffect(() => {
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
                                id:id_OTSUKA,
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
                                id:id_OTSUKA,
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

        ws.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => {
            console.log("Cleaning up WebSocket connection.");
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                const dataReceive = JSON.parse(evt.data);

                setAlarmCount(dataReceive.count)
            };
        }
    }, []);

    return (
        <div>
        {AlarmCount === undefined ? (
            <div  style={{
              
            }}></div>
        ) : AlarmCount > 0 ? (
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
                    fontSize: 25
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
                    fontSize: 25
                }}
            >
                Normal
            </div>
        )}



     
        </div>
    );
}
