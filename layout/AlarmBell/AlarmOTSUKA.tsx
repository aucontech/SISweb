import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
import { useRouter } from "next/navigation";

export default function AlarmOTSUKA() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_ALARM_BELL}${token}`;

    interface Notification {
        subject: string;
        text: string;
    }

    const ws = useRef<WebSocket | null>(null);


    const router = useRouter();

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
                                id: "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
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
                                id: "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
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
                console.log("Message received from server:", dataReceive);

            };
        }
    }, []);

    return (
        <div>
         
        </div>
    );
}
