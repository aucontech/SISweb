import React, { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";
import { readToken } from "@/service/localStorage";
import { readUser } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";

import { PiBellRingingBold, PiBellZFill } from "react-icons/pi";
import { Utils } from "@/service/Utils";

interface Notification {
    subject: string;
    text: string;
}
interface WebSocketMessage {
    update: any;
    cmdUpdateType: string;
    notifications: Notification[];
    totalUnreadCount: string;
}
export default function Alarmbell() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();
    const op = useRef<OverlayPanel>(null);
    const ws = useRef<WebSocket | null>(null);
    //const [data, setData] = useState<WebSocketMessage[]>([]);
    // const [totalUnreadCount, setTotalUnreadCount] = useState<string>("");
    // const [obj1Processed, setObj1Processed] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    console.log("notifications: ", notifications);
    // const [firstRender, setFirstRender] = useState<boolean>(true); // State để kiểm soát việc gọi audio trong lần render đầu tiên
    const [currentUser, setCurrentUser] = useState<any>(null);
    //const [alarmCount, setAlarmCount] = useState<number>(0);
    useEffect(() => {
        const user = readUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    const sendData = (data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    };
    const connectWebSocket = (token: string) => {
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
                            statusList: ["ACTIVE", "UNACK"],
                            searchPropagatedAlarms: false,
                            assigneeId: null,
                            entityFilter: {
                                type: "entityList",
                                resolveMultiple: true,
                                entityType: "DEVICE",
                                entityList: [
                                    //"6996ea90-ece8-11ee-b18f-f142b946d0bb",
                                    "b92cda00-07c9-11ef-973a-dde5fe61203a",
                                    // "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
                                ],
                            },
                        },
                        // query: {
                        //     entityFilter: {
                        //         type: "entityList",
                        //         resolveMultiple: true,
                        //         entityType: "DEVICE",
                        //         entityList: [
                        //             //"6996ea90-ece8-11ee-b18f-f142b946d0bb",
                        //             "b92cda00-07c9-11ef-973a-dde5fe61203a",
                        //             "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
                        //         ],
                        //     },
                        //     pageLink: {
                        //         page: 0,
                        //         pageSize: 10,
                        //         textSearch: null,
                        //         typeList: [],
                        //         severityList: ["CRITICAL"],
                        //         statusList: ["ACTIVE", "UNACK"],
                        //         searchPropagatedAlarms: false,
                        //         sortOrder: {
                        //             key: {
                        //                 key: "createdTime",
                        //                 type: "ALARM_FIELD",
                        //             },
                        //             direction: "DESC",
                        //         },
                        //         timeWindow: 2592000,
                        //     },
                        //     alarmFields: [
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "createdTime",
                        //         },
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "originator",
                        //         },
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "type",
                        //         },
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "severity",
                        //         },
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "status",
                        //         },
                        //         {
                        //             type: "ALARM_FIELD",
                        //             key: "assignee",
                        //         },
                        //     ],
                        //     entityFields: [],
                        //     latestValues: [],
                        // },
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
                                    // "b92cda00-07c9-11ef-973a-dde5fe61203a",
                                    // "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
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

        ws.current.onmessage = async (evt: any) => {
            const dataReceive: any = JSON.parse(evt.data);
            console.log("dataReceive", dataReceive);

            if (dataReceive && dataReceive["cmdId"] === 1) {
                if (
                    dataReceive.data &&
                    dataReceive.data.data &&
                    dataReceive.data.data.length > 0
                ) {
                    audioRef.current?.play();
                    setNotifications(dataReceive.data.data);
                } else if (
                    dataReceive.data &&
                    dataReceive.data.data &&
                    dataReceive.data.data.length === 0 &&
                    dataReceive.update === null
                ) {
                    audioRef.current?.pause();
                    setNotifications([]);
                }
            }
        };
        ws.current.onclose = () => {
            console.log("WebSocket connection closed. Trying to reconnect...");
            setTimeout(() => connectWebSocket(token), 3000); // Thử kết nối lại sau 5 giây
        };
        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setTimeout(() => connectWebSocket(token), 3000); // Thử kết nối lại sau 5 giây
            // UIUtils.showError({});
        };
    };
    useEffect(() => {
        let token: string | null = null;
        if (typeof window !== "undefined") {
            token = readToken();
            console.log("Token", token);
            if (token) {
                connectWebSocket(token);
            }
        }
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    // useEffect(() => {
    //     const obj3 = { unsubCmd: { cmdId: 1 } };
    //     const obj2 = { unreadSubCmd: { limit: totalUnreadCount, cmdId: 1 } };

    //     if (ws.current) {
    //         ws.current.onmessage = (evt) => {
    //             const dataReceive = JSON.parse(evt.data) as WebSocketMessage;
    //             if (dataReceive.update !== null) {
    //                 setTotalUnreadCount(dataReceive.totalUnreadCount);
    //                 setData([...data, dataReceive]);
    //                 setObj1Processed(true);
    //                 audioRef.current?.play();
    //             } else if (
    //                 dataReceive.cmdUpdateType === "NOTIFICATIONS" &&
    //                 dataReceive.notifications
    //             ) {
    //                 setNotifications(dataReceive.notifications);
    //             }
    //         };
    //     }

    //     if (obj1Processed) {
    //         ws.current?.send(JSON.stringify(obj3));
    //         ws.current?.send(JSON.stringify(obj2));
    //     }
    // }, [totalUnreadCount, obj1Processed]);

    // const dataAlarm = notifications.slice(0, 6).map((item: any, index: any) => {
    //     const isAlarm = item.subject.includes("New alarm");
    //     const subjectStyle = {};

    //     const createTime = new Date(item.createdTime);
    //     const formattedTime = `${createTime.getDate()}/${
    //         createTime.getMonth() + 1
    //     }/${createTime.getFullYear()}, ${("0" + createTime.getHours()).slice(
    //         -2
    //     )}:${("0" + createTime.getMinutes()).slice(-2)}:${(
    //         "0" + createTime.getSeconds()
    //     ).slice(-2)}`;

    //     return (
    //         <div key={index} style={{ padding: "0px 10px" }}>
    //             <div
    //                 style={{
    //                     border: isAlarm ? "2px solid orange" : "2px solid blue",
    //                     padding: 20,
    //                     borderRadius: 5,
    //                 }}
    //             >
    //                 <div style={{ display: "flex" }}>
    //                     <PiBellRingingBold size={50} />
    //                     <div style={{ marginLeft: 20 }}>
    //                         <p className={styles.subject} style={{}}>
    //                             {item.info.alarmOriginatorName}{" "}
    //                             {item.info.alarmType}
    //                         </p>
    //                         <p>{formattedTime}</p>
    //                     </div>
    //                 </div>
    //                 <div style={{ marginTop: 10 }}>
    //                     <Button
    //                         onClick={() => router.push("/notifications")}
    //                         style={{
    //                             width: "100%",
    //                             textAlign: "center",
    //                             justifyContent: "center",
    //                         }}
    //                     >
    //                         View More
    //                     </Button>
    //                 </div>
    //             </div>

    //             <hr />
    //         </div>
    //     );
    // });

    const _renderAlarmBell = () => {
        return notifications.map((item: any, index: any) => {
            console.log("item", item);
            return (
                <>
                    <div key={index} style={{ padding: "0px 10px" }}>
                        <div
                            style={{
                                border: "2px solid orange",
                                padding: 20,
                                borderRadius: 5,
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                <PiBellRingingBold size={50} />
                                <div style={{ marginLeft: 20 }}>
                                    <p className={styles.subject} style={{}}>
                                        Station: {item.originatorName} -{" "}
                                        {item.type}
                                    </p>
                                    {Utils.formatUnixTimeToString(
                                        item.startTs,
                                        "dd-MM-yyyy , HH:mm:ss"
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Button
                                    onClick={handleClickViewMore(
                                        item.entityId.id
                                    )}
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    View More
                                </Button>
                            </div>
                        </div>

                        <hr />
                    </div>
                </>
            );
        });
    };

    const createQueryString = (name: any, value: any) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };
    const handleClickViewMore = (item: any) => () => {
        if (currentUser.authority === "CUSTOMER_USER") {
            router.push(
                "/alarmsummarycustomer" +
                    "?" +
                    createQueryString("deviceId", item)
            );
        } else {
            router.push(
                "/alarmsummary" + "?" + createQueryString("deviceId", item)
            );
        }
    };
    const subjectCount = notifications.length;
    let totalSubjectDisplay: string | number = subjectCount;

    if (subjectCount > 99) {
        totalSubjectDisplay = "99+";
    }

    const totalCount =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

    // const handleMarkAllAsRead = () => {
    //     const ReadAllAlarm = { markAllAsReadCmd: { cmdId: 4 } };
    //     ws.current?.send(JSON.stringify(ReadAllAlarm));

    //     const obj3 = { unsubCmd: { cmdId: 1 } };
    //     const obj2 = { unreadSubCmd: { limit: totalUnreadCount, cmdId: 1 } };
    //     ws.current?.send(JSON.stringify(obj3));
    //     ws.current?.send(JSON.stringify(obj2));
    // };

    return (
        <div>
            <audio ref={audioRef} loop>
                <source
                    src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                    type="audio/mpeg"
                />
            </audio>

            <div className="flex">
                {totalCount && (
                    <div className={styles.totalCount}>
                        <p className={styles.totalCount_p}>
                            {totalCount.totalSubjects}
                        </p>
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
            <OverlayPanel style={{ marginLeft: 10, minWidth: 450 }} ref={op}>
                <div>
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
                                    // onClick={handleMarkAllAsRead}
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

                    {notifications && notifications.length > 0 ? (
                        <div style={{ overflowY: "auto", maxHeight: 400 }}>
                            {_renderAlarmBell()}
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
                </div>
            </OverlayPanel>
        </div>
    );
}
