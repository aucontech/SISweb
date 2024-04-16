import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./demoFlowOTS.css";
// import tingting from "./NotificationCuu.mp3";

import {
    ConnectedLed,
    disconnectedLed,
    station,
} from "../ReactFlow/IconOTSUKA";
import { DemoEdges } from "./demoEdges";
import Image from "next/image";
import BallValue01 from "../ReactFlow/BallValue01";
import BallValue02 from "../ReactFlow/BallValue02";
import BallValue03 from "../ReactFlow/BallValue03";
import BallValue04 from "../ReactFlow/BallValue04";
import BallValue05 from "../ReactFlow/BallValue05";
import BallValue06 from "../ReactFlow/BallValue06";
import BallValue07 from "../ReactFlow/BallValue07";
import BallValue08 from "../ReactFlow/BallValue08";
import BallValue09 from "../ReactFlow/BallValue09";
import BallValue10 from "../ReactFlow/BallValue10";
import SDV_Otsuka from "../ReactFlow/SDV_Otsuka";
import PCV_01_Otsuka from "../ReactFlow/PCV01_Otsuka";
import PCV_02_Otsuka from "../ReactFlow/PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import BallValueCenter from "../ReactFlow/BallValueCenter";
import { OverlayPanel } from "primereact/overlaypanel";
import {
    ArrowRight,
    BallVavle,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    GD,
    PCV,
    PTV,
    SDV,
    SVD_NC,
    SVD_NO,
    VavleWay,
    WhiteTriangleRight,
    connect,
    gasIn,
    juntionBottom,
    juntionTop,
    tankGas,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { httpApi } from "@/api/http.api";
import BallVavlePSV from "../ReactFlow/BallVavlePSV";
import { InputText } from "primereact/inputtext";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";
const backGroundData = "white";
export const borderBox = "#aad4ff";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ffaa00";

export default function DemoFlowOTS() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);

    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);
    const [data, setData] = useState<any[]>([]);

    const [GVF1, setGVF1] = useState<string | null>(null);
    const [SVF1, setSVF1] = useState<string | null>(null);
    const [SVA1, setSVA1] = useState<string | null>(null);
    const [GVA1, setGVA1] = useState<string | null>(null);

    const [GVF2, setGVF2] = useState<string | null>(null);
    const [SVF2, setSVF2] = useState<string | null>(null);
    const [SVA2, setSVA2] = useState<string | null>(null);
    const [GVA2, setGVA2] = useState<string | null>(null);

    const [PT01, setPT01] = useState<string | null>(null);
    const [PT02, setPT02] = useState<string | null>(null);
    const [PT03, setPT03] = useState<string | null>(null);

    const [GD1, SetGD1] = useState<string | null>(null);
    const [GD2, SetGD2] = useState<string | null>(null);
    const [GD3, SetGD3] = useState<string | null>(null);

    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);







   
    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_OTSUKA,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setCheckConnectData(true);
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setCheckConnectData(false);
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Flow_at_Base_Condition: setSVF1,
                        EVC_01_Flow_at_Measurement_Condition: setGVF1,

                        EVC_01_Volume_at_Base_Condition: setSVA1,
                        EVC_01_Vm_Adjustable_Counter: setGVA1,
                        EVC_01_Pressure: setPT01,

                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Flow_at_Measurement_Condition: setGVF2,

                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Vm_Adjustable_Counter: setGVA2,

                        EVC_02_Pressure: setPT02,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT03,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        time: setTimeUpdate,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }
                fetchData()
            };
        }
    }, [data]);
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    //============================GD =============================

//================================ PT 1901================================

    const [audioPT1901, setAudio1901] = useState(false);
    const [HighPT01, setHighPT01] = useState<number | null>(null);
    const [LowPT01, setLowPT01] = useState<number | null>(null);
    const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const op1901 = useRef<OverlayPanel>(null);
    const [inputValueHighPT1901, setInputValueHighPT1901] = useState<any>();
    const [inputValueLowPT1901, settInputValueLowPT1901] = useState<any>();
    useEffect(() => {
        if (
            typeof HighPT01 === "string" &&
            typeof LowPT01 === "string" &&
            PT01 !== null
        ) {
            const highValue = parseFloat(HighPT01);
            const lowValue = parseFloat(LowPT01);
            const PT01Value = parseFloat(PT01);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT01Value)) {
                if (highValue < PT01Value || PT01Value < lowValue) {
                    if (!audioPT1901) {
                        audioRef.current?.play();
                        setAudio1901(true);
                        setExceedThreshold(true);
                    }
                } else {
                    setAudio1901(false);
                    setExceedThreshold(false);
                }
            }
            fetchData();
        }
    }, [HighPT01, PT01, audioPT1901, LowPT01]);

  

    useEffect(() => {
        if (audioPT1901) {
            const audioEnded = () => {
                setAudio1901(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPT1901]);

    const handleButtonPT1901 = async () => {
        try {
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                { High_EK1_Pressure: inputValueHighPT1901, Low_EK1_Pressure: inputValueLowPT1901 }
            );
            setHighPT01(inputValueHighPT1901);
            setLowPT01(inputValueLowPT1901);
            op1901.current?.hide();
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const handleTogglePT1901 = (e: React.MouseEvent) => {
        op1901.current?.toggle(e);
        setInputValueHighPT1901(HighPT01);
        settInputValueLowPT1901(LowPT01);
    };

    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setInputValueHighPT1901(newValue);
    };

    const handleInputChange2 = (event: any) => {
        const newValue2 = event.target.value;
        settInputValueLowPT1901(newValue2);
    };

//================================ PT 1901======================================================

//================================ PT 1902======================================================
const [audioPT1902, setAudio1902] = useState(false);
const [HighPT02, setHighPT02] = useState<number | null>(null);
const [LowPT02, setLowPT02] = useState<number | null>(null);
const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [inputValueHighPT1902, setInputValueHighPT1902] = useState<any>();
const [inputValueLowPT1902, settInputValueLowPT1902] = useState<any>();
const op1902 = useRef<OverlayPanel>(null);

useEffect(() => {
    if (
        typeof HighPT02 === "string" &&
        typeof LowPT02 === "string" &&
        PT02 !== null
    ) {
        const highValue = parseFloat(HighPT02);
        const lowValue = parseFloat(LowPT02);
        const PT02Value = parseFloat(PT02);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT02Value)) {
            if (highValue < PT02Value || PT02Value < lowValue) {
                if (!audioPT1902) {
                    audioRef.current?.play();
                    setAudio1902(true);
                    setExceedThreshold2(true);
                }
            } else {
                setAudio1902(false);
                setExceedThreshold2(false);
            }
        }
        fetchData();
    }
}, [HighPT02, PT02, audioPT1902, LowPT02]);



useEffect(() => {
    if (audioPT1902) {
        const audioEnded = () => {
            setAudio1902(false);
        };
        audioRef.current?.addEventListener("ended", audioEnded);
        return () => {
            audioRef.current?.removeEventListener("ended", audioEnded);
        };
    }
}, [audioPT1902]);

const handleButtonPT1902 = async () => {
    try {
        await httpApi.post(
            "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
            { High_EK2_Pressure: inputValueHighPT1902, Low_EK2_Pressure: inputValueLowPT1902 }
        );
        setHighPT02(inputValueHighPT1902);
        setLowPT02(inputValueLowPT1902);
        op1902.current?.hide();
    } catch (error) {
        console.log("error: ", error);
    }
};

const handleTogglePT1902 = (e: React.MouseEvent) => {
    op1902.current?.toggle(e);
    setInputValueHighPT1902(HighPT02);
    settInputValueLowPT1902(LowPT02);
};

const handleInputChangept1902 = (event: any) => {
    const newValue = event.target.value;
    setInputValueHighPT1902(newValue);
};

const handleInputChange2PT1902 = (event: any) => {
    const newValue2 = event.target.value;
    settInputValueLowPT1902(newValue2);
};

//================================ PT 1902======================================================


 //================================ PT 1903======================================================
 const [audioPT1903, setAudio1903] = useState(false);
 const [HighPT03, setHighPT03] = useState<number | null>(null);
 const [LowPT03, setLowPT03] = useState<number | null>(null);
 const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [inputValueHighPT1903, setInputValueHighPT1903] = useState<any>();
 const [inputValueLowPT1903, settInputValueLowPT1903] = useState<any>();
 const op1903 = useRef<OverlayPanel>(null);
 
 useEffect(() => {
     if (
         typeof HighPT03 === "string" &&
         typeof LowPT03 === "string" &&
         PT03 !== null
     ) {
         const highValue = parseFloat(HighPT03);
         const lowValue = parseFloat(LowPT03);
         const PT03Value = parseFloat(PT03);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT03Value)) {
             if (highValue < PT03Value || PT03Value < lowValue) {
                 if (!audioPT1903) {
                     audioRef.current?.play();
                     setAudio1903(true);
                     setExceedThreshold3(true);
                 }
             } else {
                 setAudio1903(false);
                 setExceedThreshold3(false);
             }
         }
         fetchData();
     }
 }, [HighPT03, PT03, audioPT1903, LowPT03]);
 
 
 
 useEffect(() => {
     if (audioPT1903) {
         const audioEnded = () => {
             setAudio1903(false);
         };
         audioRef.current?.addEventListener("ended", audioEnded);
         return () => {
             audioRef.current?.removeEventListener("ended", audioEnded);
         };
     }
 }, [audioPT1903]);
 
 const handleButtonPT1903 = async () => {
     try {
         await httpApi.post(
             "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
             { High_EK3_Pressure: inputValueHighPT1903, Low_EK3_Pressure: inputValueLowPT1903 }
         );
         setHighPT03(inputValueHighPT1903);
         setLowPT03(inputValueLowPT1903);
         op1903.current?.hide();
     } catch (error) {
         console.log("error: ", error);
     }
 };
 
 const handleTogglePT1903 = (e: React.MouseEvent) => {
     op1903.current?.toggle(e);
     setInputValueHighPT1903(HighPT03);
     settInputValueLowPT1903(LowPT03);
 };
 
 const handleInputChangept1903 = (event: any) => {
     const newValue = event.target.value;
     setInputValueHighPT1903(newValue);
 };
 
 const handleInputChange2PT1903 = (event: any) => {
     const newValue2 = event.target.value;
     settInputValueLowPT1903(newValue2);
 };

//================================ PT 1903======================================================

 //================================ GD 1901 ======================================================
 const [audioGD01, setAudioGD01] = useState(false);
 const [HighGD01, setHighGD01] = useState<number | null>(null);
 const [LowGD01, setLowGD01] = useState<number | null>(null);
 const [exceedThresholdGD01, setExceedThresholdGD01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [inputValueHighGD01, setInputValueHighGD01] = useState<any>();
 const [inputValueLowGD01, settInputValueLowGD01] = useState<any>();
 const opGD01 = useRef<OverlayPanel>(null);
 
 useEffect(() => {
     if (
         typeof HighGD01 === "string" &&
         typeof LowGD01 === "string" &&
         GD1 !== null
     ) {
         const highValueGD01 = parseFloat(HighGD01);
         const lowValueGD01 = parseFloat(LowGD01);
         const ValueGD01 = parseFloat(GD1);
 
         if (!isNaN(highValueGD01) && !isNaN(lowValueGD01) && !isNaN(ValueGD01)) {
             if (highValueGD01 < ValueGD01 || ValueGD01 < lowValueGD01) {
                 if (!audioGD01) {
                     audioRef.current?.play();
                     setAudioGD01(true);
                     setExceedThresholdGD01(true);
                 }
             } else {
                setAudioGD01(false);
                setExceedThresholdGD01(false);
             }
         }
         fetchData();
     }
 }, [HighGD01, GD1, audioGD01, LowGD01]);
 
 
 
 useEffect(() => {
     if (audioGD01) {
         const audioEnded = () => {
             setAudioGD01(false);
         };
         audioRef.current?.addEventListener("ended", audioEnded);
         return () => {
             audioRef.current?.removeEventListener("ended", audioEnded);
         };
     }
 }, [audioGD01]);
 
 const handleButtonGD01 = async () => {
     try {
         await httpApi.post(
             "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
             { GD_High_1: inputValueHighGD01, GD_Low_1: inputValueLowGD01 }
         );
         setHighGD01(inputValueHighGD01);
         setLowGD01(inputValueLowGD01);
         opGD01.current?.hide();
     } catch (error) {
         console.log("error: ", error);
     }
 };
 
 const handleToggleGD01 = (e: React.MouseEvent) => {
    opGD01.current?.toggle(e);
     setInputValueHighGD01(HighGD01);
     settInputValueLowGD01(LowGD01);
 };
 
 const handleInputChange1GD01 = (event: any) => {
     const newValue = event.target.value;
     setInputValueHighGD01(newValue);
 };
 
 const handleInputChange2GD01 = (event: any) => {
     const newValue2 = event.target.value;
     settInputValueLowGD01(newValue2);
 };

//================================ GD 1901======================================================

 //================================ GD 1902 ======================================================
 const [audioGD02, setAudioGD02] = useState(false);
 const [HighGD02, setHighGD02] = useState<number | null>(null);
 const [LowGD02, setLowGD02] = useState<number | null>(null);
 const [exceedThresholdGD02, setExceedThresholdGD02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [inputValueHighGD02, setInputValueHighGD02] = useState<any>();
 const [inputValueLowGD02, settInputValueLowGD02] = useState<any>();
 const opGD02 = useRef<OverlayPanel>(null);
 
 useEffect(() => {
     if (
         typeof HighGD02 === "string" &&
         typeof LowGD02 === "string" &&
         GD2 !== null
     ) {
         const highValueGD02 = parseFloat(HighGD02);
         const lowValueGD02 = parseFloat(LowGD02);
         const ValueGD02 = parseFloat(GD2);
 
         if (!isNaN(highValueGD02) && !isNaN(lowValueGD02) && !isNaN(ValueGD02)) {
             if (highValueGD02 < ValueGD02 || ValueGD02 < lowValueGD02) {
                 if (!audioGD02) {
                     audioRef.current?.play();
                     setAudioGD02(true);
                     setExceedThresholdGD02(true);
                 }
             } else {
                setAudioGD02(false);
                setExceedThresholdGD02(false);
             }
         }
         fetchData();
     }
 }, [HighGD02, GD2, audioGD02, LowGD02]);
 
 
 
 useEffect(() => {
     if (audioGD02) {
         const audioEnded = () => {
             setAudioGD02(false);
         };
         audioRef.current?.addEventListener("ended", audioEnded);
         return () => {
             audioRef.current?.removeEventListener("ended", audioEnded);
         };
     }
 }, [audioGD02]);
 
 const handleButtonGD02 = async () => {
     try {
         await httpApi.post(
             "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
             { GD_High_2: inputValueHighGD02, GD_Low_2: inputValueLowGD02 }
         );
         setHighGD02(inputValueHighGD02);
         setLowGD02(inputValueLowGD02);
         opGD02.current?.hide();
     } catch (error) {
         console.log("error: ", error);
     }
 };
 
 const handleToggleGD02 = (e: React.MouseEvent) => {
    opGD02.current?.toggle(e);
     setInputValueHighGD02(HighGD02);
     settInputValueLowGD02(LowGD02);
 };
 
 const handleInputChange1GD02 = (event: any) => {
     const newValue = event.target.value;
     setInputValueHighGD02(newValue);
 };
 
 const handleInputChange2GD02 = (event: any) => {
     const newValue2 = event.target.value;
     settInputValueLowGD02(newValue2);
 };

//================================ GD 1902 ======================================================

 //================================ GD 1902 ======================================================
 const [audioGD03, setAudioGD03] = useState(false);
 const [HighGD03, setHighGD03] = useState<number | null>(null);
 const [LowGD03, setLowGD03] = useState<number | null>(null);
 const [exceedThresholdGD03, setExceedThresholdGD03] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [inputValueHighGD03, setInputValueHighGD03] = useState<any>();
 const [inputValueLowGD03, settInputValueLowGD03] = useState<any>();
 const opGD03 = useRef<OverlayPanel>(null);
 
 useEffect(() => {
     if (
         typeof HighGD03 === "string" &&
         typeof LowGD03 === "string" &&
         GD3 !== null
     ) {
         const highValueGD03 = parseFloat(HighGD03);
         const lowValueGD03 = parseFloat(LowGD03);
         const ValueGD03 = parseFloat(GD3);
 
         if (!isNaN(highValueGD03) && !isNaN(lowValueGD03) && !isNaN(ValueGD03)) {
             if (highValueGD03 < ValueGD03 || ValueGD03 < lowValueGD03) {
                 if (!audioGD03) {
                     audioRef.current?.play();
                     setAudioGD03(true);
                     setExceedThresholdGD03(true);
                 }
             } else {
                setAudioGD03(false);
                setExceedThresholdGD03(false);
             }
         }
         fetchData();
     }
 }, [HighGD03, GD3, audioGD03, LowGD03]);
 
 
 
 useEffect(() => {
     if (audioGD03) {
         const audioEnded = () => {
             setAudioGD03(false);
         };
         audioRef.current?.addEventListener("ended", audioEnded);
         return () => {
             audioRef.current?.removeEventListener("ended", audioEnded);
         };
     }
 }, [audioGD03]);
 
 const handleButtonGD03 = async () => {
     try {
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
             { GD_High_3: inputValueHighGD03, GD_Low_3: inputValueLowGD03 }
         );
         setHighGD03(inputValueHighGD03);
         setLowGD03(inputValueLowGD03);
         opGD03.current?.hide();
     } catch (error) {
         console.log("error: ", error);
     }
 };
 
 const handleToggleGD03 = (e: React.MouseEvent) => {
    opGD03.current?.toggle(e);
     setInputValueHighGD03(HighGD03);
     settInputValueLowGD03(LowGD03);
 };
 
 const handleInputChange1GD03 = (event: any) => {
     const newValue = event.target.value;
     setInputValueHighGD03(newValue);
 };
 
 const handleInputChange2GD03 = (event: any) => {
     const newValue2 = event.target.value;
     settInputValueLowGD03(newValue2);
 };

//================================ GD 1902 ======================================================
    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/values/attributes/SERVER_SCOPE`
            );

            const highEVCPressureItem = res.data.find(
                (item: any) => item.key === "High_EK1_Pressure"
            );
            setHighPT01(highEVCPressureItem?.value || null);
            const lowEVCPressureItem = res.data.find(
                (item: any) => item.key === "Low_EK1_Pressure"
            );
            setLowPT01(lowEVCPressureItem?.value || null);

      
            const HighPT1902 = res.data.find(
                (item: any) => item.key === "High_EK2_Pressure"
            );
            setHighPT02(HighPT1902?.value || null);
            const LowPT1902 = res.data.find(
                (item: any) => item.key === "Low_EK2_Pressure"
            );
            setLowPT02(LowPT1902?.value || null);


            const HighPT1903 = res.data.find(
                (item: any) => item.key === "High_EK3_Pressure"
            );
            setHighPT03(HighPT1903?.value || null);
            const LowPT1903 = res.data.find(
                (item: any) => item.key === "Low_EK3_Pressure"
            );
            setLowPT03(LowPT1903?.value || null);


            const HighGD01 = res.data.find(
                (item: any) => item.key === "GD_High_1"
            );
            setHighGD01(HighGD01?.value || null);

            const LowGD01 = res.data.find(
                (item: any) => item.key === "GD_Low_1"
            );
            setLowGD01(LowGD01?.value || null);



            const HighGD02 = res.data.find(
                (item: any) => item.key === "GD_High_2"
            );
            setHighGD02(HighGD02?.value || null);

            const LowGD02 = res.data.find(
                (item: any) => item.key === "GD_Low_2"
            );
            setLowGD02(LowGD02?.value || null);



            const HighGD03 = res.data.find(
                (item: any) => item.key === "GD_High_3"
            );
            setHighGD03(HighGD03?.value || null);

            const LowGD03 = res.data.find(
                (item: any) => item.key === "GD_Low_3"
            );
            setLowGD03(LowGD03?.value || null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PT_1901: "PT-1901",
        PT_1902: "PT-1902",
        PT_1903: "PT-1903",

        TT: "TT",
    };

    const KeyGas = {
        SM3H: "sm³/h",
        M3H: "m³/h",
        SM3: "sm³",
        M3: "m³",
        BAR: "Bara",
        CC: "°C",
    };
    const paragraphContents: Record<string, string> = {
        SVF: "Standard Volume Flow Rate",
        GVF: "Gross Volume Flow Rate",
        SVA: "Standard Volume Accumulated",
        GVA: "Gross Volume Accumulated",
        PT: "Pressure Transmitter",
        TT: "Temperature Transmitter",
        PSV: "Pressure Safety Valve",
        PCV: "Pressure Control Valve",
        SSV: "Slam Shut Off Valve",
        SDV: "Shutdown valve",
    };
    function formatNumberWithCommas(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    function formatNumberWithCommas1(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
                let decimalSVF1: string | number = "";

                if (SVF1 !== null) {
                    const SVF1Number = parseFloat(SVF1);
                    if (!isNaN(SVF1Number)) {
                        decimalSVF1 = formatNumberWithCommas(SVF1Number);
                    } else {
                        decimalSVF1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalSVF1}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data3") {
                let decimalGVF1: string | number = "";

                if (GVF1 !== null) {
                    const SVA1Number = parseFloat(GVF1);
                    if (!isNaN(SVA1Number)) {
                        decimalGVF1 = formatNumberWithCommas(SVA1Number);
                    } else {
                        decimalGVF1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalGVF1}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
                let decimalSVA1: string | number = "";

                if (SVA1 !== null) {
                    const SVA1Number = parseFloat(SVA1);
                    if (!isNaN(SVA1Number)) {
                        decimalSVA1 = formatNumberWithCommas(SVA1Number);
                    } else {
                        decimalSVA1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalSVA1}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
                let decimalGVA1: string | number = "";

                if (GVA1 !== null) {
                    const GVA1Number = parseFloat(GVA1);
                    if (!isNaN(GVA1Number)) {
                        decimalGVA1 = formatNumberWithCommas1(GVA1Number);
                    } else {
                        decimalGVA1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalGVA1}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
                let decimalSVF2: string | number = "";

                if (SVF2 !== null) {
                    const SVF2Number = parseFloat(SVF2);
                    if (!isNaN(SVF2Number)) {
                        decimalSVF2 = formatNumberWithCommas(SVF2Number);
                    } else {
                        decimalSVF2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalSVF2}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data6") {
                let decimalGVF2: string | number = "";

                if (GVF2 !== null) {
                    const GVF2Number = parseFloat(GVF2);
                    if (!isNaN(GVF2Number)) {
                        decimalGVF2 = formatNumberWithCommas(GVF2Number);
                    } else {
                        decimalGVF2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {decimalGVF2}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
                let decimalSVA2: string | number = "";

                if (SVA2 !== null) {
                    const SVA2Number = parseFloat(SVA2);
                    if (!isNaN(SVA2Number)) {
                        decimalSVA2 = formatNumberWithCommas(SVA2Number);
                    } else {
                        decimalSVA2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {decimalSVA2}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
                let decimalGVA2: string | number = "";

                if (GVA2 !== null) {
                    const GVA2Number = parseFloat(GVA2);
                    if (!isNaN(GVA2Number)) {
                        decimalGVA2 = formatNumberWithCommas(GVA2Number);
                    } else {
                        decimalGVA2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {decimalGVA2}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans01") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: exceedThreshold3
                                        ? "#ff5656"
                                        : "transparent",
                                }}
                                onClick={handleTogglePT1903}

                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1903} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PT03}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>BarG</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans02") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: exceedThreshold
                                        ? "#ff5656"
                                        : "transparent",
                                }}
                                onClick={handleTogglePT1901}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1901} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PT01}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: exceedThreshold2
                                        ? "#ff5656"
                                        : "transparent",
                                    cursor: "pointer",
                                }}
                                onClick={handleTogglePT1902}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1902} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PT02}
                                    </p>
                                </div>
                                <p style={{ color: colorNameValue }}>
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "timeUpdate3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,

                                    display: "flex",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        PLC :{" "}
                                    </p>

                                    <p style={{ color: "white",
                                            display: "flex",
                                        }}> EVC 01 : </p>
                                    <p style={{ color: "white",
                                            display: "flex",
                                        }}> EVC 02 : </p>
                                </div>

                                <div style={{}}>
                                    <p>
                                        {checkConnectData ? (
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        ) : (
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        )}
                                    </p>
                                    <p>
                                        {checkConnectData ? (
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        ) : (
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        )}
                                    </p>
                                    <p>
                                        {checkConnectData ? (
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        ) : (
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 20,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {timeUpdate}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 20,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {timeUpdate}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 20,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {timeUpdate}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            //  =============================== GD ===================================

            if (node.id === "GD1_Value1901") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    background: exceedThresholdGD01 ? '#ff5656' : 'transparent',
                                    cursor:'pointer',
                                }}

                                onClick={handleToggleGD01}
                            >
                                <p style={{  }} >
                                    {GD1} LEL
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    background: exceedThresholdGD02 ? '#ff5656' : 'transparent',
                                    cursor:'pointer'

                                }}
                                onClick={handleToggleGD02}

                            >
                                <p
                                    style={{
                                       
                                        textAlign: "center",
                                    }}
                                >
                                    {GD2} LEL
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD3_Value1903") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    background: exceedThresholdGD03 ? '#ff5656' : 'transparent',
                                    cursor:'pointer'
                                }}
                                onClick={handleToggleGD03}

                            >
                                <p
                                    style={{
                                        textAlign: "center",
                                        
                                    }}
                                >
                                    {GD3} LEL
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_IMG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {NO === "1" && <div>{SVD_NO}</div>}
                                {NC === "1" && <div>{SVD_NC}</div>}
                            </div>
                        ),
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionsDemo");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {

            const initialPositions = {
              ArrowRight: { x: 768.5423568651795, y: 998.5512757003828 },
              ArrowRight1: { x: -1262.1001825232765, y: 1000.2070645557653 },
              BallValue01: { x: -1128.7252492515188, y: 1191.6262752572804 },
              BallValue02: { x: -901.8172406747104, y: 1191.399667617022 },
              BallValue03: { x: -701.4277571154358, y: 811.268852001003 },
              BallValue04: { x: -701.8672275157428, y: 1196.0644365920487 },
              BallValue05: { x: -408.81817382654674, y: 812.3988197919385 },
              BallValue06: { x: -408.92842757827566, y: 1195.0575990996279 },
              BallValue07: { x: -109.976146570266, y: 732.5849962342946 },
              BallValue08: { x: 511.81515033374035, y: 732.8905369491654 },
              BallValue09: { x: -109.18869777338799, y: 1276.8905722131906 },
              BallValue10: { x: 512.076750938122, y: 1276.6662483937687 },
              BallValueCenter: { x: 216.68461956782312, y: 991.2550857949235 },
              BallValueCenter_Check: {
                  x: 90.96636981528951,
                  y: 1084.2937921267353,
              },
              BallValueCenter_None: {
                  x: 235.16919766969937,
                  y: 1043.6799040315725,
              },
              BallValueCenter_None2: {
                  x: 236.508540978033,
                  y: 1043.4269432822834,
              },
              BallValuePSV: { x: 707.9554044991246, y: 924.5866149620667 },
              BallValuePSVNone: { x: 738.7414507122355, y: 942.2822573892058 },
              ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
              FIQ_1901: { x: 138.2731367163276, y: 333.440904461505 },
              FIQ_1902: { x: 128.63597487275513, y: 1396.7039906596735 },
              FIQ_none: { x: 238.7014619002282, y: 704.8821189824897 },
              FIQ_none2: { x: 229.33821336902065, y: 1248.873990363984 },
              FIQ_none11: { x: 287.37057540950383, y: 731.1885101213705 },
              FIQ_none22: { x: 277.46451545391005, y: 1321.703090896381 },
              Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
              Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
              GD1: { x: -593.1247404829055, y: 1021.5484138763804 },
              GD1_Name1901: { x: -617.0174367324778, y: 922.7999982291198 },
              GD1_Value1901: { x: -617.2309648261335, y: 962.7951649681137 },
              GD2: { x: -42.50089224243885, y: 1021.4354854552315 },
              GD2_Name1902: { x: -67.54434225774708, y: 923.5792056424372 },
              GD2_Value1902: { x: -67.91457554484958, y: 963.1203079122581 },
              GD3: { x: 471.914400589417, y: 1018.4672974791615 },
              GD3_Name1903: { x: 446.44939138278767, y: 922.3542185615489 },
              GD3_Value1903: { x: 446.16846035566243, y: 961.7240910379097 },
              GD_none1: { x: -557.4064666813481, y: 1048.346153521593 },
              GD_none2: { x: -7.7844474100276955, y: 1044.8685851757357 },
              GD_none3: { x: 506.08483331589105, y: 1037.4593704975985 },
              HELP: { x: 750.7851455025582, y: 336.66019515746984 },
              Header: { x: -1146.0797880182224, y: 343.9694534020156 },
              PCV01: { x: -600.44289821967, y: 803.2924339111273 },
              PCV02: { x: -599.7215945882494, y: 1186.490897441539 },
              PCV_NUM01: { x: -685.509356814222, y: 647.8453966003194 },
              PCV_NUM02: { x: -684.9095065313029, y: 1347.8359120884465 },
              PCV_ballVavle_Small1: {
                  x: -463.45750208249893,
                  y: 796.2045791299236,
              },
              PCV_ballVavle_Small1_none1: {
                  x: -566.2385229733152,
                  y: 817.7575474175768,
              },
              PCV_ballVavle_Small1_none2: {
                  x: -564.568543995368,
                  y: 1200.5823936921363,
              },
              PCV_ballVavle_Small2: {
                  x: -471.39757167976717,
                  y: 1178.6960358714698,
              },
              PCV_ballVavle_Small2_none1: {
                  x: -450.31021631638924,
                  y: 869.5519055175876,
              },
              PCV_ballVavle_Small2_none2: {
                  x: -458.105425182069,
                  y: 1251.7751314040793,
              },
              PCV_none1: { x: -561.5028035240778, y: 865.4758644182178 },
              PCV_none2: { x: -560.7446075974576, y: 1245.861392635763 },
              PSV01: { x: 602.1731993621377, y: 559.5742417551456 },
              PSV_01: { x: 706.026929274324, y: 839.5277060688408 },
              PSV_02: { x: 677.371154154704, y: 804.4314434762641 },
              PSV_03: { x: 663.4773354313934, y: 704.930638396519 },
              PSV_None01: { x: 784.3052438210208, y: 1043.0259819068465 },
              PSV_None02: { x: 740.5334428531365, y: 887.7863120430411 },
              PSV_None03: { x: 698.7618492817661, y: 839.0390132826677 },
              PSV_None04: { x: 691.0055856547771, y: 735.8487283773412 },
              PT1: { x: -1030.7668278678443, y: 923.6792519357384 },
              PT2: { x: -21.651669453574158, y: 1195.9276507252328 },
              PT3: { x: -22.68528485027099, y: 654.3057712932034 },
              PT_col1: { x: -990.7658686613956, y: 998.6460419620203 },
              PT_col2: { x: 17.862308874268933, y: 729.2802360193444 },
              PT_col3: { x: 18.093270328360745, y: 1270.9966728522536 },
              PT_none1: { x: -994.879694196512, y: 940.6460419620203 },
              PT_none2: { x: 12.872468321767258, y: 683.258994488236 },
              PT_none3: { x: 12.893848453058297, y: 1216.7858497116608 },
              PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
              PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
              Pressure_Trans01: { x: -1144.6672900563185, y: 775.737751310433 },
              Pressure_Trans02: { x: -326.82628571826723, y: 543.387636352668 },
              Pressure_Trans03: {
                  x: -327.47184043716663,
                  y: 1434.9801685486188,
              },
              SDV: { x: -1259.5296036246955, y: 892.5758808521592 },
              SDV_Ball: { x: -1108.7415047384393, y: 1243.8057655958721 },
              SDV_IMG: { x: -1128.9943569208203, y: 972.9252744312048 },
              SDV_None: { x: -1089.4833742545557, y: 1045.0428308586213 },
              T_juntion_11: { x: 365.1924037601432, y: 761.5664930235843 },
              T_juntion_14: { x: 51.19739447051353, y: 1267.8592609282646 },
              Tank: { x: -921.5169052023348, y: 949.94544810155 },
              Tank_Ball: { x: -881.0746635080593, y: 1244.2870542191342 },
              Tank_None: { x: -913.9045068453281, y: 1045.2445985526958 },
              Temperature_Trans01: {
                  x: -607.828356494313,
                  y: 562.8487535527242,
              },
              Temperature_Trans02: {
                  x: -796.1166124474211,
                  y: 1445.5258186779024,
              },
              VavleWay: { x: 130.10547762418554, y: 1009.7718094592451 },
              animation_line7: { x: -57.33638520737881, y: 786.0142010748291 },
              animation_line8: { x: 534.5875681565667, y: 785.9286837518672 },
              animation_line9: { x: -53.98482361983602, y: 1329.7796968105158 },
              animation_line10: { x: 534.2944515129055, y: 1329.9134977535994 },
              animation_line11: { x: 408.14915225646655, y: 785.6291840355361 },
              animation_line12: { x: 280.9850323278604, y: 1044.4121840565192 },
              animation_line13: {
                  x: 166.17450133771734,
                  y: 1044.2699746503904,
              },
              animation_line14: { x: 94.07809660966518, y: 1330.0304864638001 },
              animation_line15: { x: 534.0396421290242, y: 1330.0605161042722 },
              borderWhite: { x: -1259.8488098276323, y: 334.804469377478 },
              data1: { x: 138.48451703477264, y: 596.2740760310676 },
              data2: { x: 138.54690230832, y: 530.5871687087123 },
              data3: { x: 138.4853067439139, y: 464.9850519390955 },
              data4: { x: 138.24176898169497, y: 399.6099182771684 },
              data5: { x: 128.39018884209577, y: 1462.0516670689742 },
              data6: { x: 128.39044711407342, y: 1527.510065004808 },
              data7: { x: 128.50430359604275, y: 1593.2398068137738 },
              data8: { x: 128.41451145597324, y: 1658.7248430688853 },
              line1: { x: -1216.4118252175665, y: 1045.059045857194 },
              line2: { x: -824.7490621134568, y: 1045.059045857194 },
              line3: { x: -679.4548405099899, y: 864.3210507007146 },
              line4: { x: -679.8288704580859, y: 1247.5473074652164 },
              line5: { x: -386.35311440840894, y: 864.5020291308545 },
              line6: { x: -386.02218778401766, y: 1247.470831450982 },
              line7: { x: -210.82907734671454, y: 1052.6632425418165 },
              line8: { x: -87.61107491463122, y: 784.7281266640797 },
              line9: { x: -87.10280598982942, y: 1328.8966206192802 },
              line10: { x: 534.6840573888813, y: 784.8089932160253 },
              line11: { x: 534.738997393544, y: 1329.1045170701034 },
              line12: { x: 669.453281622097, y: 1042.0651701525298 },
              line13: { x: 784.3012389553304, y: 1043.0028327994185 },
              overlay_SmallVavle1: {
                  x: -460.2968162301511,
                  y: 885.6463541552142,
              },
              overlay_SmallVavle2: {
                  x: -467.9401692198322,
                  y: 1268.7449655852304,
              },
              overlay_line7: { x: -267.2148544974418, y: 1051.46019515747 },
              overlay_line13: { x: 628.1970734597824, y: 1042.1470412495723 },
      
              timeUpdate3: { x: -1237.2874487196173, y: 450.1676750421451 },
          };
    const [positions, setPositions] = useState(initialPositions);

    const lineColor = "#ffaa00";

    const [isAnimated07, setIsAnimated07] = useState<boolean>(false);
    const [isAnimated08, setIsAnimated08] = useState<boolean>(false);
    const [isAnimated09, setIsAnimated09] = useState<boolean>(false);
    const [isAnimated10, setIsAnimated10] = useState<boolean>(false);
    const [isAnimatedCenter, setIsAnimatedCenter] = useState<boolean>(false);

    const animated_center = (value: boolean) => {
        setIsAnimatedCenter(value);
    };
    const animated_07 = (value: boolean) => {
        setIsAnimated07(value);
    };
    const animated_08 = (value: boolean) => {
        setIsAnimated08(value);
    };
    const animated_09 = (value: boolean) => {
        setIsAnimated09(value);
    };
    const animated_10 = (value: boolean) => {
        setIsAnimated10(value);
    };

    useEffect(() => {
        const updatedEdges07_08 = edge7.map((edge) => ({
            ...edge,
            animated: isAnimated07,
            style: {
                strokeWidth: isAnimated07 && !isAnimatedCenter ? 3 : 20,
                stroke: isAnimated07 && !isAnimatedCenter ? "white" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 20, // Thêm điều kiện ở đây
                stroke: isAnimated09 && !isAnimatedCenter ? "white" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 20,
                stroke: isAnimatedCenter ? "white" : lineColor,
            },
        }));

        const allEdges = [
            ...DemoEdges,

            ...updatedEdgesCenter,
            ...(isAnimatedCenter ? [] : updatedEdges07_08), // Thêm điều kiện ở đây

            ...(isAnimatedCenter ? [] : updatedEdges09_10), // Thêm điều kiện ở đây
        ];

        setEdges(allEdges);
    }, [isAnimated07, isAnimated09, isAnimatedCenter]);

    const edge7 = [
        {
            id: "animation_line7-animation_line8",
            source: "animation_line7",
            target: "animation_line8",
            animated: isAnimated07,
            type: "smoothstep",
        },
    ];
    const edge9 = [
        {
            id: "animation_line9-animation_line10",
            source: "animation_line9",
            target: "animation_line10",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const egdeCenter = [
        {
            id: "animation_line7-animation_line11",
            source: "animation_line7",
            target: "animation_line11",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line11-animation_line12",
            source: "animation_line11",
            target: "animation_line12",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line13-animation_line14",
            source: "animation_line13",
            target: "animation_line14",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line14-animation_line15",
            source: "animation_line14",
            target: "animation_line15",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([...edge7]);

    const [initialNodes, setInitialNodes] = useState([
        //============================ animated_Line =======================================
        //============================ animated_Line =======================================

        {
            id: "animation_line7",
            position: positions.animation_line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line8",
            position: positions.animation_line8,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line9",
            position: positions.animation_line9,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line10",
            position: positions.animation_line10,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line11",
            position: positions.animation_line11,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },

        {
            id: "animation_line12",
            position: positions.animation_line12,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line13",
            position: positions.animation_line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line14",
            position: positions.animation_line14,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: line,
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line15",
            position: positions.animation_line15,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        // ============================== line =========================================
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div>4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div>5</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div>6</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line7",
            position: positions.line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 5, background: line },
        },
        {
            id: "line8",
            position: positions.line8,
            type: "custom",
            data: {
                label: <div>8</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line9",
            position: positions.line9,
            type: "custom",
            data: {
                label: <div>9</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line10",
            position: positions.line10,
            type: "custom",
            data: {
                label: <div>10</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line11",
            position: positions.line11,
            type: "custom",
            data: {
                label: <div>11</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 60,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line12",
            position: positions.line12,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: line,
                width: 20,
                height: 22,
            },
        },
        {
            id: "line13",
            position: positions.line13,
            type: "custom",
            data: {
                label: <div>13</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 1,
                background: line,
            },
        },

        // ============================== line =========================================
        {
            id: "SDV",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 25,
                            fontWeight: 500,
                        }}
                    >
                        SDV-1901
                    </div>
                ),
            },
            position: positions.SDV,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 170,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "SDV_None",
            position: positions.SDV_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 30,
                height: 1,
            },
        },
        {
            id: "SDV_Ball",
            position: positions.SDV_Ball,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 65,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "SDV_IMG",
            position: positions.SDV_IMG,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 0,
                height: 0,
            },
        },

        //=================== Ball vavle ==================================
        {
            id: "BallValue01",
            position: positions.BallValue01,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue01 />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: background,

                background: background,
                width: 20,
                height: 20,
            },
            zIndex: 99999,
        },
        {
            id: "BallValue02",
            position: positions.BallValue02,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue02 />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: background,

                background: background,
                width: 20,
                height: 20,
            },
            zIndex: 99999,
        },
        {
            id: "BallValue03",
            position: positions.BallValue03,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue03 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,

                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue04",
            position: positions.BallValue04,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue04 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue05",
            position: positions.BallValue05,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue05 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,

                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue06",
            position: positions.BallValue06,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue06 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue07",
            position: positions.BallValue07,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue07 onDataLine7={animated_07} />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,

                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue08",
            position: positions.BallValue08,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue08 onDataLine8={animated_08} />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue09",
            position: positions.BallValue09,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue09 onDataLine09={animated_09} />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,

                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "BallValue10",
            position: positions.BallValue10,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue10 onDataLine10={animated_10} />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
        },
        // ================= Tank ======================
        {
            id: "Tank",
            position: positions.Tank,
            type: "custom",
            data: {
                label: <div>{tankGas}</div>,
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "Tank_None",
            position: positions.Tank_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#ffaa00",
                background: "#ffaa00",
                width: 125,
                height: 1,
            },
        },
        {
            id: "Tank_Ball",
            position: positions.Tank_Ball,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 65,
                height: 2,
                opacity: 0.01,
            },
        },

        // ================= PCV =============================

        {
            id: "PCV01",
            position: positions.PCV01,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={80}
                            height={80}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "PCV02",
            position: positions.PCV02,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={80}
                            height={80}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_ballVavle_Small1",
            position: positions.PCV_ballVavle_Small1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "PCV_ballVavle_Small2",
            position: positions.PCV_ballVavle_Small2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_ballVavle_Small1_none1",
            position: positions.PCV_ballVavle_Small1_none1,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small2_none1",
            position: positions.PCV_ballVavle_Small2_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: line,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small1_none2",
            position: positions.PCV_ballVavle_Small1_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small2_none2",
            position: positions.PCV_ballVavle_Small2_none2,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: line,
                width: 30,
                height: 1,
            },
        },

        {
            id: "PCV_NUM01",
            position: positions.PCV_NUM01,
            type: "custom",
            data: {
                label: (
                    <div style={{ fontSize: 25, display: "flex" }}>
                        <PCV_01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 270,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 2)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "PCV_NUM02",
            position: positions.PCV_NUM02,
            type: "custom",
            data: {
                label: (
                    <div>
                        <PCV_02_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: background,
                width: 270,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },
        {
            id: "PCV_none1",
            position: positions.PCV_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },
        {
            id: "PCV_none2",
            position: positions.PCV_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },

        // ==================== FIQ =============================
        {
            id: "FIQ_1901",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                        }}
                    >
                        FIQ-1901
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "FIQ_1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                        }}
                    >
                        FIQ-1902
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Top,
        },
        {
            id: "FIQ_none",
            position: positions.FIQ_none,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                background: background,
                height: 1,
                width: 1,
                border: background,
            },
            zIndex: 9999,
        },
        {
            id: "FIQ_none2",
            position: positions.FIQ_none2,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                background: background,
                height: 1,
                width: 1,
                border: background,
            },
            zIndex: 9999,
        },

        {
            id: "FIQ_none11",
            position: positions.FIQ_none11,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },
        {
            id: "FIQ_none22",
            position: positions.FIQ_none22,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },
        // ==================== Ball center =============================
        {
            id: "BallValueCenter",
            position: positions.BallValueCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueCenter onDataLineCenter={animated_center} />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "BallValueCenter_None",
            position: positions.BallValueCenter_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 65,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "BallValueCenter_None2",
            position: positions.BallValueCenter_None2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 65,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "BallValuePSV",
            position: positions.BallValuePSV,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavlePSV />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "BallValuePSVNone",
            position: positions.BallValuePSVNone,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 22,
                height: 75,
            },
        },
        {
            id: "VavleWay",
            position: positions.VavleWay,
            type: "custom",
            data: {
                label: <div>{VavleWay}</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 99999,
        },
        // =================== data ================================

        {
            id: "data1",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data1,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data2",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data2,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data3",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data3,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data4",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data4,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "data5",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data5,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Top,
        },
        {
            id: "data6",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data6,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Left,
        },
        {
            id: "data7",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data7,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Top,
        },
        {
            id: "data8",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data8,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 320,
                height: 65,
            },
            targetPosition: Position.Top,
        },
        // ============= PSV =====================

        {
            id: "PSV_01",
            position: positions.PSV_01,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV_02",
            position: positions.PSV_02,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV_03",
            position: positions.PSV_03,
            type: "custom",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None01",
            position: positions.PSV_None01,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None02",
            position: positions.PSV_None02,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None03",
            position: positions.PSV_None03,
            type: "custom",
            data: {
                label: <div>3</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None04",
            position: positions.PSV_None04,
            type: "custom",
            data: {
                label: <div>4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV01",
            position: positions.PSV01,
            type: "custom",
            data: {
                label: (
                    <div style={{ fontSize: 25, display: "flex" }}>
                        <PSV01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 270,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        // =================  PT ===================================

        {
            id: "Pressure_Trans01",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.Pressure_Trans01,

            style: {
                border: background,
                width: 330,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "Pressure_Trans02",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    ></div>
                ),
            },
            position: positions.Pressure_Trans02,

            style: {
                border: background,
                width: 330,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Right,
        },
        {
            id: "Pressure_Trans03",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.Pressure_Trans03,

            style: {
                border: background,
                width: 330,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Right,
        },
        {
            id: "PT1",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT1,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT2",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT2,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT3",
            data: {
                label: <div>{PTV}</div>,
            },
            zIndex: 9999,

            position: positions.PT3,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_none1",
            position: positions.PT_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PT_none2",
            position: positions.PT_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PT_none3",
            position: positions.PT_none3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PT_col1",
            position: positions.PT_col1,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 10,
                height: 65,

                borderRadius: "none",
            },
        },
        {
            id: "PT_col2",
            position: positions.PT_col2,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 10,
                height: 65,

                borderRadius: "none",
            },
        },
        {
            id: "PT_col3",
            position: positions.PT_col3,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 10,
                height: 65,

                borderRadius: "none",
            },
        },

        //  ================== TT ======================

        // ================ header ========================

        {
            id: "Header",
            data: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: 60,
                                    fontWeight: 500,
                                    color: "#ffaa00",
                                }}
                            >
                                OTSUKA
                            </p>
                        </div>
                    </div>
                ),
            },

            position: positions.Header,
            zIndex: 9999,

            style: {
                background: background,
                border: background,
                width: 300,

                height: 100,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "HELP",
            data: {
                label: (
                    <div>
                        <div
                            style={{
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            <p
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "5px solid white",
                                    borderRadius: 50,
                                    fontWeight: 600,
                                    color: "white",
                                    fontSize: 30,
                                }}
                                onClick={() => setVisible(true)}
                            >
                                ?
                            </p>
                        </div>
                    </div>
                ),
            },

            position: positions.HELP,

            style: {
                background: background,
                border: background,
                width: 10,
                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // =============== TIME  =======================

        {
            id: "timeUpdate3",
            data: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: 60,
                                    fontWeight: 500,
                                    color: "#ffaa00",
                                }}
                            ></p>
                        </div>
                    </div>
                ),
            },

            position: positions.timeUpdate3,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: 470,

                height: 45,
            },
            targetPosition: Position.Bottom,
        },

        //====================== Conneted ===================

        {
            id: "ConnectData",
            data: {
                label: <div></div>,
            },

            position: positions.ConnectData,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // =================== Arrow ======================

        {
            id: "ArrowRight",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            position: positions.ArrowRight,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "ArrowRight1",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            position: positions.ArrowRight1,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        // {
        //     id: "Flow1",
        //     data: {
        //         label: <div>{ArrowRight}</div>,
        //     },

        //     position: positions.Flow1,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        // {
        //     id: "Flow2",
        //     data: {
        //         label: <div>{ArrowRight}</div>,
        //     },

        //     position: positions.Flow2,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        // ================ PT ICONS ===================

        // ============= GD =====================

        {
            id: "GD1",
            data: {
                label: <div>{GD}</div>,
            },

            position: positions.GD1,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Top,
        },
        {
            id: "GD2",
            data: {
                label: <div>{GD}</div>,
            },

            position: positions.GD2,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD3",
            data: {
                label: <div>{GD}</div>,
            },

            position: positions.GD3,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Top,
        },
        {
            id: "GD1_Name1901",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        GD-1901
                    </div>
                ),
            },
            position: positions.GD1_Name1901,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 150,
                height: 40,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD2_Name1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        GD-1902
                    </div>
                ),
            },
            position: positions.GD2_Name1902,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 150,
                height: 40,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD3_Name1903",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        GD-1903
                    </div>
                ),
            },
            position: positions.GD3_Name1903,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 150,

                height: 40,
            },
            targetPosition: Position.Left,
        },

        {
            id: "GD1_Value1901",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.GD1_Value1901,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 150,
                height: 50,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "GD2_Value1902",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.GD2_Value1902,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 150,

                height: 50,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "GD3_Value1903",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.GD3_Value1903,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 150,

                height: 50,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "GD_none1",
            position: positions.GD_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },
        {
            id: "GD_none2",
            position: positions.GD_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },
        {
            id: "GD_none3",
            position: positions.GD_none3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 30,
                height: 1,
            },
        },

        // ============ border white ======================
        {
            id: "borderWhite",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.borderWhite,

            style: {
                background: background,
                border: "1px solid white",
                width: 520,
                height: 270,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },
        // =================== overlay =================================

        {
            id: "overlay_SmallVavle1",
            position: positions.overlay_SmallVavle1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 50,
                height: 1,
            },
        },
        {
            id: "overlay_SmallVavle2",
            position: positions.overlay_SmallVavle2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 50,
                height: 1,
            },
        },
        {
            id: "overlay_line7",
            position: positions.overlay_line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 130,
                height: 22,
            },
        },
        {
            id: "overlay_line13",
            position: positions.overlay_line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 150,
                height: 22,
            },
        },
        //============================ T_JUNTION ==========================

        {
            id: "T_juntion_11",
            position: positions.T_juntion_11,
            type: "custom",
            data: {
                label: <div>{juntionBottom}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "T_juntion_14",
            position: positions.T_juntion_14,
            type: "custom",
            data: {
                label: <div>{juntionTop}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    // const onNodeDragStop = useCallback(
    //     (event: any, node: any) => {
    //         if (editingEnabled) {
    //             const { id, position } = node;
    //             setNodes((prevNodes) =>
    //                 prevNodes.map((n) =>
    //                     n.id === id ? { ...n, position: position } : n
    //                 )
    //             );
    //             if (id === "SDV") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV: position,
    //                 }));
    //             } else if (id === "SDV_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_None: position,
    //                 }));
    //             } else if (id === "SDV_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_IMG: position,
    //                 }));
    //             } else if (id === "SDV_Ball") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_Ball: position,
    //                 }));
    //             }
    //             // ================================== end item ==================================

    //             // ============ line =========================
    //             else if (id === "line1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line1: position,
    //                 }));
    //             } else if (id === "line2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line2: position,
    //                 }));
    //             } else if (id === "line3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line3: position,
    //                 }));
    //             } else if (id === "line4") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line4: position,
    //                 }));
    //             } else if (id === "line5") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line5: position,
    //                 }));
    //             } else if (id === "line6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line6: position,
    //                 }));
    //             } else if (id === "line7") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line7: position,
    //                 }));
    //             } else if (id === "line8") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line8: position,
    //                 }));
    //             } else if (id === "line9") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line9: position,
    //                 }));
    //             } else if (id === "line10") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line10: position,
    //                 }));
    //             } else if (id === "line11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line11: position,
    //                 }));
    //             } else if (id === "line12") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line12: position,
    //                 }));
    //             } else if (id === "line13") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line13: position,
    //                 }));
    //             }

    //             // ============ ball vavle ===========================
    //             else if (id === "BallValue01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue01: position,
    //                 }));
    //             } else if (id === "BallValue02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue02: position,
    //                 }));
    //             } else if (id === "BallValue03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue03: position,
    //                 }));
    //             } else if (id === "BallValue04") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue04: position,
    //                 }));
    //             } else if (id === "BallValue05") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue05: position,
    //                 }));
    //             } else if (id === "BallValue06") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue06: position,
    //                 }));
    //             } else if (id === "BallValue07") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue07: position,
    //                 }));
    //             } else if (id === "BallValue08") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue08: position,
    //                 }));
    //             } else if (id === "BallValue09") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue09: position,
    //                 }));
    //             } else if (id === "BallValue10") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue10: position,
    //                 }));
    //             }
    //             // ============ ball vavle ===========================
    //             else if (id === "Tank") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank: position,
    //                 }));
    //             } else if (id === "Tank_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_None: position,
    //                 }));
    //             } else if (id === "Tank_Ball") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_Ball: position,
    //                 }));
    //             }
    //             // ============ PCV ===========================
    //             else if (id === "PCV01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV01: position,
    //                 }));
    //             } else if (id === "PCV02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV02: position,
    //                 }));
    //             } else if (id === "PCV_NUM01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_NUM01: position,
    //                 }));
    //             } else if (id === "PCV_NUM02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_NUM02: position,
    //                 }));
    //             } else if (id === "PCV_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_none1: position,
    //                 }));
    //             } else if (id === "PCV_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_none2: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small1: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small2: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small1_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small1_none1: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small1_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small1_none2: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small2_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small2_none1: position,
    //                 }));
    //             } else if (id === "PCV_ballVavle_Small2_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_ballVavle_Small2_none2: position,
    //                 }));
    //             }

    //             // ============ FIQ ===========================
    //             else if (id === "FIQ_1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_1901: position,
    //                 }));
    //             } else if (id === "FIQ_1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_1902: position,
    //                 }));
    //             } else if (id === "FIQ_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none: position,
    //                 }));
    //             } else if (id === "FIQ_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none2: position,
    //                 }));
    //             } else if (id === "FIQ_none11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none11: position,
    //                 }));
    //             } else if (id === "FIQ_none22") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none22: position,
    //                 }));
    //             }
    //             // ============ Ball center ===========================
    //             else if (id === "BallValueCenter") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter: position,
    //                 }));
    //             } else if (id === "BallValueCenter_Check") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_Check: position,
    //                 }));
    //             } else if (id === "BallValueCenter_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_None: position,
    //                 }));
    //             } else if (id === "BallValueCenter_None2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_None2: position,
    //                 }));
    //             } else if (id === "BallValuePSV") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValuePSV: position,
    //                 }));
    //             } else if (id === "BallValuePSVNone") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValuePSVNone: position,
    //                 }));
    //             } else if (id === "VavleWay") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VavleWay: position,
    //                 }));
    //             }
    //             // ========================= data ==========================
    //             else if (id === "data1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data1: position,
    //                 }));
    //             } else if (id === "data2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data2: position,
    //                 }));
    //             } else if (id === "data3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data3: position,
    //                 }));
    //             } else if (id === "data4") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data4: position,
    //                 }));
    //             } else if (id === "data5") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data5: position,
    //                 }));
    //             } else if (id === "data6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data6: position,
    //                 }));
    //             } else if (id === "data7") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data7: position,
    //                 }));
    //             } else if (id === "data8") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data8: position,
    //                 }));
    //             }
    //             // ========================= PSV ==========================
    //             else if (id === "PSV_01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_01: position,
    //                 }));
    //             } else if (id === "PSV_02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_02: position,
    //                 }));
    //             } else if (id === "PSV_03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_03: position,
    //                 }));
    //             } else if (id === "PSV_None01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None01: position,
    //                 }));
    //             } else if (id === "PSV_None02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None02: position,
    //                 }));
    //             } else if (id === "PSV_None03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None03: position,
    //                 }));
    //             } else if (id === "PSV_None04") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None04: position,
    //                 }));
    //             } else if (id === "PSV01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV01: position,
    //                 }));
    //             }
    //             //  ================ PT ===================
    //             else if (id === "Pressure_Trans01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans01: position,
    //                 }));
    //             } else if (id === "Pressure_Trans02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans02: position,
    //                 }));
    //             } else if (id === "Pressure_Trans03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans03: position,
    //                 }));
    //             } else if (id === "PT1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT1: position,
    //                 }));
    //             } else if (id === "PT2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT2: position,
    //                 }));
    //             } else if (id === "PT3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT3: position,
    //                 }));
    //             } else if (id === "PT_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none1: position,
    //                 }));
    //             } else if (id === "PT_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none2: position,
    //                 }));
    //             } else if (id === "PT_none3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none3: position,
    //                 }));
    //             } else if (id === "PT_col1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_col1: position,
    //                 }));
    //             } else if (id === "PT_col2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_col2: position,
    //                 }));
    //             } else if (id === "PT_col3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_col3: position,
    //                 }));
    //             }

    //             // ================ TT =================
    //             else if (id === "Temperature_Trans01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Temperature_Trans01: position,
    //                 }));
    //             } else if (id === "Temperature_Trans02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Temperature_Trans02: position,
    //                 }));
    //             }
    //             // ============= header ===============
    //             else if (id === "Header") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Header: position,
    //                 }));
    //             } else if (id === "HELP") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     HELP: position,
    //                 }));
    //             }
    //             // ============= Time Update ==================
    //             else if (id === "timeUpdate") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate: position,
    //                 }));
    //             } else if (id === "timeUpdate2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate2: position,
    //                 }));
    //             } else if (id === "timeUpdate3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate3: position,
    //                 }));
    //             }
    //             // ============= Connected ===================
    //             else if (id === "ConnectData") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ConnectData: position,
    //                 }));
    //             }
    //             // ============= Arrow ======================
    //             else if (id === "ArrowRight") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ArrowRight: position,
    //                 }));
    //             } else if (id === "ArrowRight1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ArrowRight1: position,
    //                 }));
    //             } else if (id === "Flow1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Flow1: position,
    //                 }));
    //             } else if (id === "Flow2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Flow2: position,
    //                 }));
    //             }
    //             // =========== PT ICONS1 ==================

    //             //================ GD ====================
    //             else if (id === "GD1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1: position,
    //                 }));
    //             } else if (id === "GD2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2: position,
    //                 }));
    //             } else if (id === "GD3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3: position,
    //                 }));
    //             } else if (id === "GD1_Name1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1_Name1901: position,
    //                 }));
    //             } else if (id === "GD2_Name1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2_Name1902: position,
    //                 }));
    //             } else if (id === "GD3_Name1903") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3_Name1903: position,
    //                 }));
    //             } else if (id === "GD1_Value1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1_Value1901: position,
    //                 }));
    //             } else if (id === "GD2_Value1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2_Value1902: position,
    //                 }));
    //             } else if (id === "GD3_Value1903") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3_Value1903: position,
    //                 }));
    //             } else if (id === "GD_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none1: position,
    //                 }));
    //             } else if (id === "GD_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none2: position,
    //                 }));
    //             } else if (id === "GD_none3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none3: position,
    //                 }));
    //             }
    //             // ===================== border white ==================
    //             else if (id === "borderWhite") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     borderWhite: position,
    //                 }));
    //             }
    //             // ==================== overlay ========================
    //             else if (id === "overlay_SmallVavle1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     overlay_SmallVavle1: position,
    //                 }));
    //             } else if (id === "overlay_SmallVavle2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     overlay_SmallVavle2: position,
    //                 }));
    //             } else if (id === "overlay_line7") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     overlay_line7: position,
    //                 }));
    //             } else if (id === "overlay_line13") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     overlay_line13: position,
    //                 }));
    //             }
    //             //========================== animation line =======================
    //             else if (id === "animation_line7") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line7: position,
    //                 }));
    //             } else if (id === "animation_line8") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line8: position,
    //                 }));
    //             } else if (id === "animation_line9") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line9: position,
    //                 }));
    //             } else if (id === "animation_line10") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line10: position,
    //                 }));
    //             } else if (id === "animation_line11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line11: position,
    //                 }));
    //             } else if (id === "animation_line12") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line12: position,
    //                 }));
    //             } else if (id === "animation_line13") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line13: position,
    //                 }));
    //             } else if (id === "animation_line14") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line14: position,
    //                 }));
    //             } else if (id === "animation_line15") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     animation_line15: position,
    //                 }));
    //             }
    //             //========================== T juntion icon  =======================
    //             else if (id === "T_juntion_11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     T_juntion_11: position,
    //                 }));
    //             } else if (id === "T_juntion_14") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     T_juntion_14: position,
    //                 }));
    //             }
    //         }
    //     },
    //     [setNodes, setPositions, editingEnabled]
    // );

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    // useEffect(() => {
    //     localStorage.setItem("positionsDemo", JSON.stringify(positions));
    // }, [positions]);

    return (
        <div>
            <audio ref={audioRef}>
                <source src="/audios/NotificationCuu.mp3" type="audio/mpeg" />
            </audio>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}

            <OverlayPanel ref={op1901}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        PT-1901
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighPT1901}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowPT1901}
                            onChange={handleInputChange2}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonPT1901}
                    />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={op1902}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        PT-1902
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighPT1902}
                            onChange={handleInputChangept1902}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowPT1902}
                            onChange={handleInputChange2PT1902}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonPT1902}
                    />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={op1903}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        PT-1903
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighPT1903}
                            onChange={handleInputChangept1903}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowPT1903}
                            onChange={handleInputChange2PT1903}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonPT1903}
                    />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={opGD01}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        GD-1901
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighGD01}
                            onChange={handleInputChange1GD01}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowGD01}
                            onChange={handleInputChange2GD01}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonGD01}
                    />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={opGD02}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        GD-1902
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighGD02}
                            onChange={handleInputChange1GD02}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowGD02}
                            onChange={handleInputChange2GD02}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonGD02}
                    />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={opGD03}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            fontSize: 17,
                            fontWeight: 500,
                            color: background,
                            marginBottom: 10,
                        }}
                    >
                        GD-1903
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ marginTop: 10, marginRight: 5 }}> High</p>
                        <InputText
                            placeholder="High"
                            value={inputValueHighGD03}
                            onChange={handleInputChange1GD03}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 10,
                        }}
                    >
                        <p style={{ marginTop: 10 }}> Low</p>
                        <InputText
                            style={{ marginLeft: 10 }}
                            placeholder="Low"
                            value={inputValueLowGD03}
                            onChange={handleInputChange2GD03}
                        />
                    </div>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        margin: 10,
                    }}
                >
                    <Button
                        style={{}}
                        label="Update"
                        onClick={handleButtonGD03}
                    />
                </div>
            </OverlayPanel>
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                style={{
                    width: 500,
                    fontWeight: 500,
                    fontSize: 17,
                }}
            >
                {Object.keys(paragraphContents).map(
                    (key: string, index: number) => (
                        <p key={index}>
                            {key} - {paragraphContents[key]} <hr />
                        </p>
                    )
                )}
            </Dialog>
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                    background: background,
                }}
            >
                {/* {!editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.02)",

                            zIndex: 999,
                            opacity: 0.2,
                        }}
                    ></div>
                )}

                {editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    ></div>
                )} */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // onNodeDragStop={onNodeDragStop}
                    nodesDraggable={false} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.5}
                    maxZoom={2}
                >
                    <Controls style={{ position: "absolute", top: 0 }} />

                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
