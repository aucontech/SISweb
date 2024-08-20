"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";
//import { readToken } from "@/service/localStorage";
import { readUser } from "@/service/localStorage";
import "./AlarmBellCssBlink.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { PiBellRingingBold } from "react-icons/pi";
import {
    getSeverAttributesByDeviceandKeys,
    saveOrUpdateSeverAttributesByDevice,
} from "@/api/telemetry.api";
import { Utils } from "@/service/Utils";
import {
    OTSUKA_DEVICE_ID,
    MEIKO_DEVICE_ID,
    YOSHINO_DEVICE_ID,
    CNGHY_DEVICE_ID,
    CNGBD_DEVICE_ID,
    NITORI_DEVICE_ID,
    ARAKAWA_DEVICE_ID,
    VREC_DEVICE_ID,
    KOA_DEVICE_ID,
    SPMCV_DEVICE_ID,
    IGUACU_DEVICE_ID,
    ZOCV_DEVICE_ID,
    LGDS_DEVICE_ID,
    CNGPM3_DEVICE_ID,
    SNGHY_DEVICE_ID,
    SNG_PM3_DEVICEC_ID,
    SNG_ACECOOK_DEVICE_ID,
} from "@/constants/constans";
import { useToken } from "@/hook/useToken";

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
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
export default function Alarmbell() {
    const token = useToken();
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();
    const audioRefs = useRef<HTMLAudioElement[]>([]);
    const op = useRef<OverlayPanel>(null);
    const ws = useRef<WebSocket | null>(null);
    const [loading, setLoading] = useState(true); // State để kiểm soát loading
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [alarmCount, setAlarmCount] = useState<number>(0);
    const [notificationsQueue, setNotificationsQueue] = useState<any[]>([]); // Hàng đợi thông báo
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
    const _fetchAttributeData = useCallback(
        async (deviceId: string, key: string) => {
            return getSeverAttributesByDeviceandKeys(deviceId, key).then(
                (resp) => {
                    const res = resp.data;
                    if (res && res.length === 0) {
                        return saveOrUpdateSeverAttributesByDevice(deviceId, {
                            [key]: false,
                        }).then(() => true);
                    }
                    return res[0].value;
                }
            );
        },
        []
    );
    const connectWebSocket = useCallback(
        (token: string) => {
            ws.current = new WebSocket(
                `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET}/telemetry?token=${token}`
            );
            ws.current.onopen = () => {
                console.log("WebSocket connection opened.");

                let data = {
                    alarmCountCmds: [
                        {
                            query: {
                                severityList: ["CRITICAL", "MAJOR"],
                                statusList: ["ACTIVE"],
                                searchPropagatedAlarms: false,
                                assigneeId: null,
                                entityFilter: {
                                    type: "entityList",
                                    resolveMultiple: true,
                                    entityType: "DEVICE",
                                    entityList: [OTSUKA_DEVICE_ID],
                                },
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
                                        OTSUKA_DEVICE_ID,
                                        MEIKO_DEVICE_ID,
                                        YOSHINO_DEVICE_ID,
                                        CNGHY_DEVICE_ID,
                                        CNGBD_DEVICE_ID,
                                        NITORI_DEVICE_ID,
                                        ARAKAWA_DEVICE_ID,
                                        VREC_DEVICE_ID,
                                        KOA_DEVICE_ID,
                                        SPMCV_DEVICE_ID,
                                        IGUACU_DEVICE_ID,
                                        ZOCV_DEVICE_ID,
                                        LGDS_DEVICE_ID,
                                        CNGPM3_DEVICE_ID,
                                        SNGHY_DEVICE_ID,
                                        SNG_PM3_DEVICEC_ID,
                                        SNG_ACECOOK_DEVICE_ID,
                                    ],
                                },
                                pageLink: {
                                    page: 0,
                                    pageSize: 100,
                                    textSearch: null,
                                    typeList: [],
                                    severityList: ["CRITICAL", "MAJOR"],
                                    statusList: ["ACTIVE"],
                                    searchPropagatedAlarms: false,
                                    sortOrder: {
                                        key: {
                                            key: "createdTime",
                                            type: "ALARM_FIELD",
                                        },
                                        direction: "DESC",
                                    },
                                    timeWindow: 60480000 * 2 * 2 * 2,
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
                if (dataReceive && dataReceive["cmdId"] === 1) {
                    if (
                        dataReceive.data &&
                        dataReceive.data.data &&
                        dataReceive.data.data.length > 0 &&
                        dataReceive.update === null
                    ) {
                        console.log(dataReceive.data.data);
                        setNotificationsQueue(() => [...dataReceive.data.data]);
                        setLoading(false);
                        let alarmsCount = dataReceive.data.totalElements;
                        setAlarmCount(alarmsCount);
                        // let alarms = dataReceive.data.data;
                        //
                        // let criticalAlarm = alarms.filter(
                        //     (alarm: any) => alarm.severity === "CRITICAL"
                        // );
                        // let majorAlarm = alarms.filter(
                        //     (alarm: any) => alarm.severity === "MAJOR"
                        // );
                        // if (criticalAlarm.length > majorAlarm.length) {
                        //     const promise = audioRef.current?.play();
                        //     if (promise !== undefined) {
                        //         promise
                        //             .then(() => {
                        //                 // Autoplay started!
                        //             })
                        //             .catch((error) => {
                        //                 console.error(
                        //                     "Autoplay was prevented.",
                        //                     error
                        //                 );
                        //             });
                        //     }
                        // } else {
                        //     handleStopAudio();
                        // }
                        // setNotifications(alarms);
                        //
                        // setLoading(false);
                    } else if (
                        dataReceive.data &&
                        dataReceive.data.data &&
                        dataReceive.data.data.length === 0 &&
                        dataReceive.update === null
                    ) {
                        handleStopAudio();
                        setNotifications([]);
                        setLoading(false);
                        setAlarmCount(0);
                    }
                } else if (dataReceive && dataReceive["cmdId"] === 2) {
                    //console.log(dataReceive.count);
                    //  setAlarmCount(dataReceive.count);
                    // setLoading(false);
                }
            };
            ws.current.onclose = () => {
                setTimeout(() => connectWebSocket, 10000); // Thử kết nối lại sau 5 giây
            };
            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
                setLoading(true);
                setTimeout(() => connectWebSocket, 10000); // Thử kết nối lại sau 5 giây
            };
        },
        [sendData]
    );

    const fetchWithRetry = async (
        entityId: string,
        tag: string,
        retries = 0
    ): Promise<any> => {
        try {
            return await _fetchAttributeData(entityId, tag + "_Maintain");
        } catch (error) {
            if (retries < MAX_RETRIES) {
                console.log(
                    `Error fetching attribute data for ${tag}. Retrying... Attempt ${
                        retries + 1
                    }`
                );
                await new Promise((resolve) =>
                    setTimeout(resolve, RETRY_DELAY)
                );
                return fetchWithRetry(entityId, tag, retries + 1);
            }
            console.error(
                `Max retries reached for ${tag}. Final error:`,
                error
            );
            throw error;
        }
    };

    const processNotification = async (dataAlarm: any[]) => {
        console.log("Processing notification:", dataAlarm);
        let updatedAlarms = await Promise.all(
            [...dataAlarm].map(async (alarm: any) => {
                let shouldPlaySound = true; // Mặc định là true

                if (alarm.severity === "MAJOR") {
                    return { ...alarm };
                }

                let tag = alarm?.details?.data?.split(",")[0];

                if (tag !== null && tag !== undefined) {
                    try {
                        const maintained = await fetchWithRetry(
                            alarm.entityId.id,
                            tag
                        );
                        shouldPlaySound = !maintained;
                    } catch (error) {
                        console.error(
                            `Failed to fetch attribute data for ${tag} after multiple attempts`
                        );
                        // Không thay đổi shouldPlaySound, giữ nguyên là true
                    }
                }

                return {
                    ...alarm,
                    shouldPlaySound,
                };
            })
        );

        setNotifications([...updatedAlarms]);
    };

    console.log("not", notifications);
    useEffect(() => {
        processNotification(notificationsQueue);
    }, [notificationsQueue]);

    useEffect(() => {
        if (token) {
            connectWebSocket(token);
        }
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connectWebSocket, token]);

    useEffect(() => {
        console.log("notifications", notifications);
        notifications.forEach((notif: any, index) => {
            if (notif.shouldPlaySound === true) {
                const audioEl = audioRefs.current[notif.id.id];
                console.log("audioEl", audioEl);
                if (audioEl) {
                    const playPromise = audioEl.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .catch((error) => {
                                // Auto-play was prevented
                                // Show a UI element to let the user manually start playback
                            })
                            .then(() => {
                                // Auto-play started
                            });
                    }
                }
            } else {
                console.log("turn alarm off");
                const audioEl = audioRefs.current[notif.id.id];
                console.log("audioEl", audioEl);
                if (audioEl) {
                    audioEl.pause();
                    audioEl.currentTime = 0; // Đặt thời gian trở về đầu để chuẩn bị cho lần phát tiếp theo nếu cần
                }
            }
        });
    }, [notifications]);
    // useEffect(() => {
    //     if (
    //         notifications.length > 0 &&
    //         previousNotificationsLength.current < notifications.length
    //     ) {
    //         // console.log(
    //         //     previousNotificationsLength.current,
    //         //     notifications.length
    //         // );
    //         const promise = audioRef.current?.play();
    //         if (promise !== undefined) {
    //             promise
    //                 .then(() => {
    //                     // Autoplay started!
    //                 })
    //                 .catch((error) => {
    //                     console.error("Autoplay was prevented.");
    //                 });
    //         }
    //     }
    //     previousNotificationsLength.current = notifications.length; // Cập nhật giá trị trước đó
    // }, [notifications]);

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
            return (
                <>
                    <div key={index} style={{ padding: "0px 10px" }}>
                        <div
                            style={{
                                border:
                                    item.severity === "CRITICAL"
                                        ? "2px solid red"
                                        : "2px solid orange",

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
                                    {/* <br />
                                    {item.shouldPlaySound == true ? (
                                        <i
                                            className="pi pi-volume-up"
                                            style={{ fontSize: "1rem" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="pi pi-volume-off"
                                            style={{ fontSize: "1rem" }}
                                        ></i>
                                    )} */}
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
    useEffect(() => {
        // Tạo một Set các ID từ notifications hiện tại
        const currentNotificationIds = new Set(
            notifications.map((notif) => notif.id.id)
        );

        // Lặp qua tất cả các key trong audioRefs.current
        Object.keys(audioRefs.current).forEach((audioId) => {
            // Nếu ID không còn trong notifications, xóa nó khỏi audioRefs
            if (!currentNotificationIds.has(audioId)) {
                delete audioRefs.current[audioId];
            }
        });
    }, [notifications]);
    const totalCount =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

    const handleStopAudio = () => {
        notifications.forEach((notif: any, index) => {
            const audioEl = audioRefs.current[notif.id.id];
            console.log("audioEl", audioEl);
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0; // Đặt thời gian trở về đầu để chuẩn bị cho lần phát tiếp theo nếu cần
            }
        });
    };

    return (
        <div>
            <audio ref={audioRef} loop>
                <source
                    src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                    type="audio/mpeg"
                />
            </audio>
            {notifications &&
                notifications.length > 0 &&
                notifications.map((item: any, index: number) => (
                    <div key={index}>
                        <audio
                            loop={true}
                            ref={(el: HTMLAudioElement) => {
                                audioRefs.current[item.id.id] = el;
                            }}
                            src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                            preload="auto"
                        ></audio>
                    </div>
                ))}

            <div className="flex">
                {alarmCount > 0 && (
                    <div className={styles.totalCount}>
                        <p className={styles.totalCount_p}>{alarmCount}</p>
                    </div>
                )}

                {alarmCount > 0 ? (
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
                {loading ? ( // Hiển thị loading spinner khi loading = true
                    <div
                        className="flex justify-content-center align-items-center"
                        style={{ height: "200px" }}
                    >
                        <ProgressSpinner />
                    </div>
                ) : (
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
                                        onClick={handleStopAudio}
                                    >
                                        {" "}
                                        Turn off audio
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
                )}
            </OverlayPanel>
        </div>
    );
}

{
    /* <div className="flex">
                {count !== null && <span>{count}</span>}
                {count !== null && count > 0 ? (
                    <div
                        style={{
                            fontSize: 30,
                            cursor: "pointer",
                            background: "#DD0000",
                            borderRadius: 10,
                            width: 200,
                            height: 80,
                            textAlign: "center",
                            alignItems: "center",
                        }}
                        onClick={() => router.push("/SetupData")}
                    >
                        <p
                            style={{
                                color: "white",
                                marginTop: 10,
                            }}
                        >
                            Alarming
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            fontSize: 40,
                            cursor: "pointer",
                            background: "green",
                            borderRadius: 10,
                            width: 200,
                            height: 80,
                            textAlign: "center",
                            alignItems: "center",
                        }}
                        onClick={() => router.push("/SetupData")}
                    >
                        <p
                            style={{
                                color: "white",
                                marginTop: 10,
                            }}
                        >
                            Normal
                        </p>
                    </div>
                )}
            </div> */
}




// import React from 'react'

// export default function Alarmbell() {
//   return (
//     <div>Alarmbell</div>
//   )
// }

