import React, { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";
import { readToken } from "@/service/localStorage";
//import tingting from "./Notification.mp3";
import "./AlarmBellCssBlink.css"
export default function Alarmbell() {
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
    const [totalUnreadCount, setTotalUnreadCount] = useState<string>("");
    const [obj1Processed, setObj1Processed] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [firstRender, setFirstRender] = useState<boolean>(true); // State để kiểm soát việc gọi audio trong lần render đầu tiên

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = { unreadCountSubCmd: { cmdId: 1 } };

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
    }, [totalUnreadCount, obj1Processed,]);


    const dataAlarm = notifications.slice(0, 6).map((item, index) => {
        const isAlarm = item.subject.includes("New alarm");
        const subjectStyle = {
            color: isAlarm ? "red" : "blue" 
        };
        return (
            <div key={index} style={{ padding: "0px 10px" }}>
                <div>
                    <p className={styles.subject} style={subjectStyle}>{item.subject}</p>
                    <p>{item.text}</p>
                    <hr />
                </div>
            </div>
        );
    });
    
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
    return (
        <div>
            <audio ref={audioRef}>
                <source src="/audios/NotificationCuu.mp3" type="audio/mpeg" />
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

                    <div className="BackgroundRed" style={{width:30, textAlign:'center', alignItems:'center'}}>
                 <i
                    className="pi pi-bell"
                    style={{ fontSize: "1.5rem", cursor: "pointer",color:'white', marginTop:3 }}
                    onClick={(e) => op?.current?.toggle(e)}
                />

                    </div>
                 ) : (
                    <div style={{width:30, textAlign:'center', alignItems:'center', borderRadius:50,marginTop:3  }}>

                    <i
                    className="pi pi-bell"
                    style={{ fontSize: "1.5rem", cursor: "pointer", }}
                    onClick={(e) => op?.current?.toggle(e)}
                />
                    </div>
                 )}
                


                
            </div>
            <OverlayPanel style={{ marginLeft: 10 }} ref={op}>
                <div className={styles.overlayPanel}>
                    <div style={{ padding: "10px 20px " , display:'flex', justifyContent:'space-between', alignItems:'center',}}>
                       
                       <div >
                        <p style={{ fontSize: 20, fontWeight: 600,  }}>Alarms</p>
                        </div>

                        {totalCount ? ( 
                                <div className="MarkAllBell">

                    <p style={{fontWeight:500,  marginTop:4,cursor:'pointer' }} onClick={handleMarkAllAsRead}> Mark all as read</p>

                                </div>

                        ) : ("")}
                    </div>
                    <hr />

                    {dataAlarm.length > 0 ? (
                        <div style={{ overflowY: "auto", maxHeight: 300 }}>
                            {dataAlarm}
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
                            onClick={() => router.push("/SetupData")}
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
