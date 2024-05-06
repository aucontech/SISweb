import React, { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRouter } from "next/navigation";
import { readToken } from "@/service/localStorage";
import "./AlarmBellCssBlink.css"


export default function AlarmOTSUKA() {

    let token: string | null = "";
    if (typeof window !== "undefined") {
        token = readToken();
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_ALARM_BELL}${token}`;
    const audioRef = useRef<HTMLAudioElement>(null);

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

    
    const subjectCount = notifications.length;
    let totalSubjectDisplay: string | number = subjectCount;

    if (subjectCount > 99) {
        totalSubjectDisplay = "99+";
    }

    const totalCount =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

    return (
        <div>
            <audio ref={audioRef}>
                <source src="/audios/NotificationCuu.mp3" type="audio/mpeg" />
            </audio>
            <div className="flex">

           {totalCount ? ( 
                    <div  style={{ fontSize:50,  cursor:'pointer', background:'#DD0000',borderRadius:10, width:260, height:100,textAlign:'center',alignItems:'center', }} onClick={()=> router.push('/SetupData')} >
                 <p style={{marginRight:15, color:'white',marginTop:10   }} >Alarming</p>  <p style={{marginTop:5}}>  </p> 

                    </div>
                 ) : (
                    <div  style={{ fontSize:50,  cursor:'pointer', background:'green',borderRadius:10, width:260, height:100 ,alignItems:'center',textAlign:'center' }} onClick={()=> router.push('/SetupData')} >
                 <p style={{marginRight:15, color:'white', marginTop:10   }} >Normal</p>  <p style={{marginTop:5}}>  </p> 

                    </div>
                 )} 
            </div>
        </div>
    );
}
