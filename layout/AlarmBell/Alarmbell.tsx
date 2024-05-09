import React, { useEffect, useRef, useState, useCallback } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";
import { readToken, readUser } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
interface Notification {
    // subject: string;
    // text: string;
}
interface WebSocketMessage {
    update: any;
    cmdUpdateType: string;
    notifications: Notification[];
    totalUnreadCount: string;
}
interface Item {
    [key: string]: string | number; // Example properties
}
export default function Alarmbell() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const op = useRef<OverlayPanel>(null);
    const router = useRouter();
    const ws = useRef<WebSocket | null>(null);
    const [data, setData] = useState<WebSocketMessage[]>([]);
    const [totalUnreadCount, setTotalUnreadCount] = useState<string>("");
    const [obj1Processed, setObj1Processed] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [alarmCount, setAlarmCount] = useState<number>(0);
    useEffect(() => {
        const user = readUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    const sendData = useCallback((data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    }, []);

    const playNotificationSound = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);
    const connectWebSocket = useCallback(
        (token: string) => {
            ws.current = new WebSocket(
                `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET}/telemetry?token=${token}`
            );
            ws.current.onopen = () => {
                console.log("WebSocket connection opened.");
                //  setLoading(false);
                let data = {
                    alarmCountCmds: [
                        {
                            query: {
                                severityList: ["CRITICAL"],
                                statusList: ["ACTIVE"],
                                searchPropagatedAlarms: false,
                                assigneeId: null,
                            },
                            cmdId: 2,
                        },
                    ],
                    alarmDataCmds: [
                        {
                            query: {
                                entityFilter: {
                                    type: "entityList",
                                    resolveMultiple: true,
                                    entityType: "DEVICE",
                                    entityList: [
                                        "6996ea90-ece8-11ee-b18f-f142b946d0bb",
                                        "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
                                    ],
                                },
                                pageLink: {
                                    page: 0,
                                    pageSize: 10,
                                    textSearch: null,
                                    typeList: [],
                                    severityList: ["CRITICAL"],
                                    statusList: ["ACTIVE"],
                                    searchPropagatedAlarms: false,
                                    sortOrder: {
                                        key: {
                                            key: "createdTime",
                                            type: "ALARM_FIELD",
                                        },
                                        direction: "DESC",
                                    },
                                    timeWindow: 604800000,
                                },
                                alarmFields: [
                                    {
                                        type: "ALARM_FIELD",
                                        key: "createdTime",
                                    },
                                    {
                                        type: "ALARM_FIELD",
                                        key: "originator",
                                    },
                                    {
                                        type: "ALARM_FIELD",
                                        key: "type",
                                    },
                                    {
                                        type: "ALARM_FIELD",
                                        key: "severity",
                                    },
                                    {
                                        type: "ALARM_FIELD",
                                        key: "status",
                                    },
                                    {
                                        type: "ALARM_FIELD",
                                        key: "assignee",
                                    },
                                ],
                                entityFields: [],
                                latestValues: [],
                            },
                            cmdId: 1,
                        },
                    ],
                };

                sendData(JSON.stringify(data));
            };

            ws.current.onmessage = (evt: any) => {
                const dataReceive: any = JSON.parse(evt.data);
                console.log("dataReceive", dataReceive);
                if (dataReceive && dataReceive["cmdId"] === 2) {
                    setAlarmCount(dataReceive.count);
                }
                if (dataReceive && dataReceive["cmdId"] === 1) {
                    if (dataReceive.data && dataReceive.data.data) {
                        let dataAlarm = dataReceive?.data.data;
                        if (notifications.length === 0) {
                            console.log("dataAlarm", dataAlarm);
                            const updatedAlarms = dataAlarm.map(
                                (alarm: any) => ({
                                    ...alarm,
                                    shouldPlaySound: true,
                                })
                            );

                            setNotifications(updatedAlarms);
                        }
                    } else {
                    }
                }
            };
            ws.current.onclose = () => {
                console.log(
                    "WebSocket connection closed. Trying to reconnect..."
                );
                setTimeout(() => connectWebSocket(token), 10000); // Thử kết nối lại sau 5 giây
            };
            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
                setTimeout(() => connectWebSocket(token), 10000); // Thử kết nối lại sau 5 giây
                // UIUtils.showError({});
            };
        },
        [sendData]
    );
    const ring = useCallback(() => {
        notifications.forEach((notif: any) => {
            if (notif.shouldPlaySound) {
                playNotificationSound();
            }
        });
    }, [notifications]);
    console.log("notifications", notifications);
    useEffect(() => {
        ring();
    }, [notifications, ring]);
    useEffect(() => {
        let token: string | null = null;
        if (typeof window !== "undefined") {
            token = readToken();
            console.log("Token", token);
            if (token) {
                connectWebSocket(token);
            }
        }
    }, [connectWebSocket]);

    useEffect(() => {
        const obj3 = { unsubCmd: { cmdId: 1 } };
        const obj2 = { unreadSubCmd: { limit: totalUnreadCount, cmdId: 1 } };

        if (ws.current) {
            ws.current.onmessage = (evt) => {
                const dataReceive = JSON.parse(evt.data) as WebSocketMessage;
                if (dataReceive.update !== null) {
                    setTotalUnreadCount(dataReceive.totalUnreadCount);
                    setData([...data, dataReceive]);
                    setObj1Processed(true);
                    audioRef.current?.play();
                } else if (
                    dataReceive.cmdUpdateType === "NOTIFICATIONS" &&
                    dataReceive.notifications
                ) {
                    setNotifications(dataReceive.notifications);
                }
            };
        }

        if (obj1Processed) {
            ws.current?.send(JSON.stringify(obj3));
            ws.current?.send(JSON.stringify(obj2));
        }
    }, [totalUnreadCount, obj1Processed]);
    const createQueryString = (name: any, value: any) => {
        const params = new URLSearchParams();
        params.set(name, value);

        return params.toString();
    };
    const handleClick = (item: Item) => () => {
        if (currentUser.authority === "CUSTOMER_USER") {
            router.push(
                "/alarmhistorycustomer?" + createQueryString("deviceid", item)
            );
        } else {
            router.push("/alarmhistory?" + createQueryString("deviceid", item));
        }
    };
    const _renderAlarms = () => {
        return notifications.map((item, index) => (
            <React.Fragment key={index}>
                <div>
                    <p className={styles.subject} style={{ color: "red" }}>
                        Subject Placeholder
                    </p>
                    <p>Description Placeholder</p>
                </div>
                <hr />
            </React.Fragment>
        ));
    };

    const subjectCount = notifications.length;
    let totalSubjectDisplay: string | number = subjectCount;

    if (subjectCount > 99) {
        totalSubjectDisplay = "99+";
    }

    const totalCount =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

    const handleMarkAllAsRead = () => {
        const ReadAllAlarm = { markAllAsReadCmd: { cmdId: 4 } };
        ws.current?.send(JSON.stringify(ReadAllAlarm));

        const obj3 = { unsubCmd: { cmdId: 1 } };
        const obj2 = { unreadSubCmd: { limit: totalUnreadCount, cmdId: 1 } };
        ws.current?.send(JSON.stringify(obj3));
        ws.current?.send(JSON.stringify(obj2));
    };
    console.log("alarmCount", alarmCount);
    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/audios/NotificationCuu.mp3" type="audio/mpeg" />
            </audio>

            <div className="flex">
                {alarmCount > 0 && (
                    <div className={styles.totalCount}>
                        <p className={styles.totalCount_p}>{alarmCount}</p>
                    </div>
                )}

                {totalCount ? (
                    <div
                        className="BackgroundRed"
                        style={{
                            width: 30,
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <i
                            className="pi pi-bell"
                            style={{
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                color: "white",
                                marginTop: 3,
                            }}
                            onClick={(e) => op?.current?.toggle(e)}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            width: 30,
                            textAlign: "center",
                            alignItems: "center",
                            borderRadius: 50,
                            marginTop: 3,
                        }}
                    >
                        <i
                            className="pi pi-bell"
                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            onClick={(e) => op?.current?.toggle(e)}
                        />
                    </div>
                )}
            </div>
            <OverlayPanel style={{ marginLeft: 10 }} ref={op}>
                <div className={styles.overlayPanel}>
                    <div
                        style={{
                            padding: "10px 20px ",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Alarms
                            </p>
                        </div>

                        {totalCount ? (
                            <div className="MarkAllBell">
                                <p
                                    style={{
                                        fontWeight: 500,
                                        marginTop: 4,
                                        cursor: "pointer",
                                    }}
                                    onClick={handleMarkAllAsRead}
                                >
                                    {" "}
                                    Mark all as read
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <hr />

                    {notifications.length > 0 ? (
                        <div style={{ overflowY: "auto", maxHeight: 300 }}>
                            <div style={{ padding: "0px 10px" }}>
                                {_renderAlarms()}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.alarmEmpty}>
                            <Image
                                src="/demo/images/logoBell/bel.svg"
                                width={200}
                                height={200}
                                alt="Picture of the author"
                            />
                        </div>
                    )}
                    <div style={{ padding: 20 }}>
                        <Button
                            onClick={() => router.push("/alarmhistory")}
                            className={styles.buttonViewAll}
                        >
                            View All
                        </Button>
                    </div>
                    <div></div>
                </div>
            </OverlayPanel>
        </div>
    );
}
