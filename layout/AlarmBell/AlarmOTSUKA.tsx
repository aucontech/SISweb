import React, { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";
import { readToken } from "@/service/localStorage";
//import tingting from "./Notification.mp3";
import "./AlarmBellCssBlink.css";

import { PiBellRingingBold, PiBellZFill } from "react-icons/pi";

export default function AlarmOTSUKA() {
    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_ALARM_BELL}${token}`;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [prevTotalCount, setPrevTotalCount] = useState<number>(0);

    const op = useRef<OverlayPanel>(null);
    const router = useRouter();
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
    const ws = useRef<WebSocket | null>(null);
    const [data, setData] = useState<WebSocketMessage[]>([]);
    console.log("data: ", data);
    const [totalUnreadCount, setTotalUnreadCount] = useState<string>("");
    const [obj1Processed, setObj1Processed] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    console.log("notifications: ", notifications);
    const [firstRender, setFirstRender] = useState<boolean>(true); // State để kiểm soát việc gọi audio trong lần render đầu tiên
    const [wsCalled, setWsCalled] = useState(false);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = { unreadCountSubCmd: { cmdId: 1 } };

        ws.current.onopen = () => {
            console.log("WebSocket connection opened.");
            ws.current?.send(JSON.stringify(obj1));
            setWsCalled(true); // Set state khi đã gọi xong WebSocket

        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => {
            console.log("Cleaning up WebSocket connection.");
            ws.current?.close();
        };
    }, []);

    const subjectCount = notifications.length;
    let totalSubjectDisplay: string | number = subjectCount;

    if (subjectCount > 99) {
        totalSubjectDisplay = "99+";
    }
    const totalCount: any =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

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
                    // audioRef.current?.play();
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

    return (
        <div>
          <div>
        {wsCalled && (
            <div className="flex">
                {totalCount  ? (
                    <div
                        style={{
                            fontSize: 50,
                            cursor: "pointer",
                            background: "#DD0000",
                            borderRadius: 10,
                            width: 260,
                            height: 100,
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
                            fontSize: 50,
                            cursor: "pointer",
                            background: "green",
                            borderRadius: 10,
                            width: 260,
                            height: 100,
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
            </div>
        )}
    </div>
        </div>
    );
}
