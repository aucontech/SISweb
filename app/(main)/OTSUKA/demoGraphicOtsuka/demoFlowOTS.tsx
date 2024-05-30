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
    PTV,
    SVD_NC,
    SVD_NO,
    VavleWay,
    WhiteTriangleRight,
    juntionBottom,
    juntionTop,
    tankGas,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { httpApi } from "@/api/http.api";
import BallVavlePSV from "../ReactFlow/BallVavlePSV";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AlarmOTSUKA from "@/layout/AlarmBell/AlarmOTSUKA";
import BallValueFirst from "../ReactFlow/BallValueFirst";
import BallValueLast from "../ReactFlow/BallValueLast";
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

    const [EVC_STT01, setEVC_STT01] = useState<string | null>(null);
    const [EVC_STT02, setEVC_STT02] = useState<string | null>(null);

    const [PLC_STT, setPLC_STT] = useState<string | null>(null);

    const toast = useRef<Toast>(null);

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

                        EVC_01_Conn_STT: setEVC_STT01,
                        EVC_02_Conn_STT: setEVC_STT02,
                        PLC_Conn_STT: setPLC_STT,

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
                fetchData();
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

    const [maintainPT_1901, setMaintainPT_1901] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT01 === "string" &&
            typeof LowPT01 === "string" &&
            PT01 !== null &&
            maintainPT_1901 === false
        ) {
            const highValue = parseFloat(HighPT01);
            const lowValue = parseFloat(LowPT01);
            const PT01Value = parseFloat(PT01);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT01Value)) {
                if (highValue <= PT01Value || PT01Value <= lowValue) {
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
    }, [HighPT01, PT01, audioPT1901, LowPT01, maintainPT_1901]);

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

    const ChangeMaintainPT_1901 = async () => {
        try {
            const newValue = !maintainPT_1901;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PT_1901_maintain: newValue }
            );
            setMaintainPT_1901(newValue);

            toast.current?.show({
                severity: "info",
                summary: " Maintain PT-1901 ",
                detail: "Success",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmPT_1901 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " PT-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainPT_1901(),
        });
    };

    //================================ PT 1901======================================================

    //================================ PT 1902======================================================
    const [audioPT1902, setAudio1902] = useState(false);
    const [HighPT02, setHighPT02] = useState<number | null>(null);
    const [LowPT02, setLowPT02] = useState<number | null>(null);
    const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT_1902, setMaintainPT_1902] = useState<boolean>(false);

    const op1902 = useRef<OverlayPanel>(null);

    useEffect(() => {
        if (
            typeof HighPT02 === "string" &&
            typeof LowPT02 === "string" &&
            PT02 !== null &&
            maintainPT_1902 === false
        ) {
            const highValue = parseFloat(HighPT02);
            const lowValue = parseFloat(LowPT02);
            const PT02Value = parseFloat(PT02);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT02Value)) {
                if (highValue <= PT02Value || PT02Value <= lowValue) {
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
    }, [HighPT02, PT02, audioPT1902, LowPT02, maintainPT_1902]);

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

    const ChangeMaintainPT_1902 = async () => {
        try {
            const newValue = !maintainPT_1902;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PT_1902_maintain: newValue }
            );
            setMaintainPT_1902(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain PT-1902 ",
                detail: "Success",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmPT_1902 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " PT-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainPT_1902(),
        });
    };

    //================================ PT 1902======================================================

    //================================ PT 1903======================================================
    const [audioPT1903, setAudio1903] = useState(false);
    const [HighPT03, setHighPT03] = useState<number | null>(null);
    const [LowPT03, setLowPT03] = useState<number | null>(null);
    const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT_1903, setMaintainPT_1903] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT03 === "string" &&
            typeof LowPT03 === "string" &&
            PT03 !== null &&
            maintainPT_1903 === false
        ) {
            const highValue = parseFloat(HighPT03);
            const lowValue = parseFloat(LowPT03);
            const PT03Value = parseFloat(PT03);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT03Value)) {
                if (highValue <= PT03Value || PT03Value <= lowValue) {
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
    }, [HighPT03, PT03, audioPT1903, LowPT03, maintainPT_1903]);

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

    const ChangeMaintainPT_1903 = async () => {
        try {
            const newValue = !maintainPT_1903;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PT_1903_maintain: newValue }
            );
            setMaintainPT_1903(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain PT-1903 ",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmPT_1903 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " PT-1903",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainPT_1903(),
        });
    };

    //================================ PT 1903======================================================

    //================================ GD 1901 ======================================================
    const [audioGD01, setAudioGD01] = useState(false);
    const [HighGD01, setHighGD01] = useState<number | null>(null);
    const [LowGD01, setLowGD01] = useState<number | null>(null);
    const [exceedThresholdGD01, setExceedThresholdGD01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainGD_1901, setMaintainGD_1901] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGD01 === "string" &&
            typeof LowGD01 === "string" &&
            GD1 !== null &&
            maintainGD_1901 === false
        ) {
            const highValueGD01 = parseFloat(HighGD01);
            const lowValueGD01 = parseFloat(LowGD01);
            const ValueGD01 = parseFloat(GD1);

            if (
                !isNaN(highValueGD01) &&
                !isNaN(lowValueGD01) &&
                !isNaN(ValueGD01)
            ) {
                if (highValueGD01 <= ValueGD01 || ValueGD01 <= lowValueGD01) {
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
    }, [HighGD01, GD1, audioGD01, LowGD01, maintainGD_1901]);

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

    const ChangeMaintainGD_01 = async () => {
        try {
            const newValue = !maintainGD_1901;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD1_Maintain: newValue }
            );
            setMaintainGD_1901(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain GD-1901 ",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGD_1901 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GD-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGD_01(),
        });
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

    const [maintainGD_1902, setMaintainGD_1902] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGD02 === "string" &&
            typeof LowGD02 === "string" &&
            GD2 !== null &&
            maintainGD_1902 === false
        ) {
            const highValueGD02 = parseFloat(HighGD02);
            const lowValueGD02 = parseFloat(LowGD02);
            const ValueGD02 = parseFloat(GD2);

            if (
                !isNaN(highValueGD02) &&
                !isNaN(lowValueGD02) &&
                !isNaN(ValueGD02)
            ) {
                if (highValueGD02 <= ValueGD02 || ValueGD02 <= lowValueGD02) {
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
    }, [HighGD02, GD2, audioGD02, LowGD02, maintainGD_1902]);

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

    const ChangeMaintainGD_02 = async () => {
        try {
            const newValue = !maintainGD_1902;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD2_Maintain: newValue }
            );
            setMaintainGD_1902(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain GD-1902 ",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGD_1902 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GD-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGD_02(),
        });
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

    const [maintainGD_1903, setMaintainGD_1903] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGD03 === "string" &&
            typeof LowGD03 === "string" &&
            GD3 !== null &&
            maintainGD_1903 === false
        ) {
            const highValueGD03 = parseFloat(HighGD03);
            const lowValueGD03 = parseFloat(LowGD03);
            const ValueGD03 = parseFloat(GD3);

            if (
                !isNaN(highValueGD03) &&
                !isNaN(lowValueGD03) &&
                !isNaN(ValueGD03)
            ) {
                if (highValueGD03 <= ValueGD03 || ValueGD03 <= lowValueGD03) {
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
    }, [HighGD03, GD3, audioGD03, LowGD03, maintainGD_1903]);

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

    const ChangeMaintainGD_03 = async () => {
        try {
            const newValue = !maintainGD_1903;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD3_Maintain: newValue }
            );
            setMaintainGD_1903(newValue);

            toast.current?.show({
                severity: "info",
                summary: "GD-1903 ",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGD_1903 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: "Maintain GD-1903",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGD_03(),
        });
    };

    //================================ GD 1902 ======================================================

    //================================ SVF1 FIQ 1901 ======================================================
    const [audioSVF1, setAudioSVF1] = useState(false);
    const [HighSVF1, setHighSVF1] = useState<number | null>(null);
    const [LowSVF1, setLowSVF1] = useState<number | null>(null);
    const [exceedThresholdSVF1, setExceedThresholdSVF1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [inputValueHighSVF1, setInputValueHighSVF1] = useState<any>();
    const [inputValueLowSVF1, settInputValueLowSVF1] = useState<any>();

    const [maintainSVF1, setMaintainSVF1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSVF1 === "string" &&
            typeof LowSVF1 === "string" &&
            SVF1 !== null &&
            maintainSVF1 === false
        ) {
            const highValueSVF1 = parseFloat(HighSVF1);
            const lowValueSVF1 = parseFloat(LowSVF1);
            const ValueSVF1 = parseFloat(SVF1);

            if (
                !isNaN(highValueSVF1) &&
                !isNaN(lowValueSVF1) &&
                !isNaN(ValueSVF1)
            ) {
                if (highValueSVF1 <= ValueSVF1 || ValueSVF1 <= lowValueSVF1) {
                    if (!audioSVF1) {
                        audioRef.current?.play();
                        setAudioSVF1(true);
                        setExceedThresholdSVF1(true);
                    }
                } else {
                    setAudioSVF1(false);
                    setExceedThresholdSVF1(false);
                }
            }
            fetchData();
        }
    }, [HighSVF1, SVF1, audioSVF1, LowSVF1, maintainSVF1]);

    useEffect(() => {
        if (audioSVF1) {
            const audioEnded = () => {
                setAudioSVF1(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSVF1]);

    const ChangeMaintainSVF_1 = async () => {
        try {
            const newValue = !maintainSVF1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { SVF1_Maintain: newValue }
            );
            setMaintainSVF1(newValue);

            toast.current?.show({
                severity: "info",
                summary: " Maintain SVF FIQ-1901",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmSVF_1 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " SVF FIQ-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainSVF_1(),
        });
    };

    //================================ SVF1 FIQ 1901 ======================================================

    //================================ GVF1 FIQ 1901 ======================================================
    const [audioGVF1, setAudioGVF1] = useState(false);
    const [HighGVF1, setHighGVF1] = useState<number | null>(null);
    const [LowGVF1, setLowGVF1] = useState<number | null>(null);
    const [exceedThresholdGVF1, setExceedThresholdGVF1] = useState(false);

    const [maintainGVF1, setMaintainGVF1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGVF1 === "string" &&
            typeof LowGVF1 === "string" &&
            GVF1 !== null &&
            maintainGVF1 === false
        ) {
            const highValueGVF1 = parseFloat(HighGVF1);
            const lowValueGVF1 = parseFloat(LowGVF1);
            const ValueGVF1 = parseFloat(GVF1);

            if (
                !isNaN(highValueGVF1) &&
                !isNaN(lowValueGVF1) &&
                !isNaN(ValueGVF1)
            ) {
                if (highValueGVF1 <= ValueGVF1 || ValueGVF1 <= lowValueGVF1) {
                    if (!audioGVF1) {
                        audioRef.current?.play();
                        setAudioGVF1(true);
                        setExceedThresholdGVF1(true);
                    }
                } else {
                    setAudioGVF1(false);
                    setExceedThresholdGVF1(false);
                }
            }
            fetchData();
        }
    }, [HighGVF1, GVF1, audioGVF1, LowGVF1, maintainGVF1]);

    useEffect(() => {
        if (audioGVF1) {
            const audioEnded = () => {
                setAudioGVF1(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioGVF1]);

    const ChangeMaintainGVF_1 = async () => {
        try {
            const newValue = !maintainGVF1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GVF1_Maintain: newValue }
            );
            setMaintainGVF1(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain GVF FIQ-1901",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGVF_1 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GVF FIQ-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGVF_1(),
        });
    };

    //================================ GVF1 FIQ 1901 ======================================================

    //================================ SVA1 FIQ 1901 ======================================================
    const [audioSVA1, setAudioSVA1] = useState(false);
    const [HighSVA1, setHighSVA1] = useState<number | null>(null);
    const [LowSVA1, setLowSVA1] = useState<number | null>(null);
    const [exceedThresholdSVA1, setExceedThresholdSVA1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSVA1, setMaintainSVA1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSVA1 === "string" &&
            typeof LowSVA1 === "string" &&
            SVA1 !== null &&
            maintainSVA1 === false
        ) {
            const highValueSVA1 = parseFloat(HighSVA1);
            const lowValueSVA1 = parseFloat(LowSVA1);
            const ValueSVA1 = parseFloat(SVA1);

            if (
                !isNaN(highValueSVA1) &&
                !isNaN(lowValueSVA1) &&
                !isNaN(ValueSVA1)
            ) {
                if (highValueSVA1 <= ValueSVA1 || ValueSVA1 <= lowValueSVA1) {
                    if (!audioSVA1) {
                        audioRef.current?.play();
                        setAudioSVA1(true);
                        setExceedThresholdSVA1(true);
                    }
                } else {
                    setAudioSVA1(false);
                    setExceedThresholdSVA1(false);
                }
            }
            fetchData();
        }
    }, [HighSVA1, SVA1, audioSVA1, LowSVA1, maintainSVA1]);

    useEffect(() => {
        if (audioSVA1) {
            const audioEnded = () => {
                setAudioSVA1(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSVA1]);

    const ChangeMaintainSVA_1 = async () => {
        try {
            const newValue = !maintainSVA1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { SVA1_Maintain: newValue }
            );
            setMaintainSVA1(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain SVA FIQ-1901",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmSVA_1 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " SVA FIQ-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainSVA_1(),
        });
    };

    //================================ SVA1 FIQ 1901 ======================================================

    //================================ GVA1 FIQ 1901 ======================================================
    const [audioGVA1, setAudioGVA1] = useState(false);
    const [HighGVA1, setHighGVA1] = useState<number | null>(null);
    const [LowGVA1, setLowGVA1] = useState<number | null>(null);
    const [exceedThresholdGVA1, setExceedThresholdGVA1] = useState(false);

    const [maintainGVA1, setMaintainGVA1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGVA1 === "string" &&
            typeof LowGVA1 === "string" &&
            GVA1 !== null &&
            maintainGVA1 === false
        ) {
            const highValueGVA1 = parseFloat(HighGVA1);
            const lowValueGVA1 = parseFloat(LowGVA1);
            const ValueGVA1 = parseFloat(GVA1);

            if (
                !isNaN(highValueGVA1) &&
                !isNaN(lowValueGVA1) &&
                !isNaN(ValueGVA1)
            ) {
                if (highValueGVA1 <= ValueGVA1 || ValueGVA1 <= lowValueGVA1) {
                    if (!audioGVA1) {
                        audioRef.current?.play();
                        setAudioGVA1(true);
                        setExceedThresholdGVA1(true);
                    }
                } else {
                    setAudioGVA1(false);
                    setExceedThresholdGVA1(false);
                }
            }
            fetchData();
        }
    }, [HighGVA1, GVA1, audioGVA1, LowGVA1, maintainGVA1]);

    useEffect(() => {
        if (audioGVA1) {
            const audioEnded = () => {
                setAudioGVA1(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioGVA1]);

    const ChangeMaintainGVA_1 = async () => {
        try {
            const newValue = !maintainGVA1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GVA1_Maintain: newValue }
            );
            setMaintainGVA1(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain GVA FIQ-1901 ",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGVA_1 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GVA FIQ-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGVA_1(),
        });
    };

    //================================ GVA1 FIQ 1901 ======================================================

    //================================ SVF2 FIQ 1901 ======================================================
    //================================ SVF1 FIQ 1901 ======================================================
    const [audioSVF2, setAudioSVF2] = useState(false);
    const [HighSVF2, setHighSVF2] = useState<number | null>(null);
    const [LowSVF2, setLowSVF2] = useState<number | null>(null);
    const [exceedThresholdSVF2, setExceedThresholdSVF2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSVF2, setMaintainSVF2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSVF2 === "string" &&
            typeof LowSVF2 === "string" &&
            SVF2 !== null &&
            maintainSVF2 === false
        ) {
            const highValueSVF2 = parseFloat(HighSVF2);
            const lowValueSVF2 = parseFloat(LowSVF2);
            const ValueSVF2 = parseFloat(SVF2);

            if (
                !isNaN(highValueSVF2) &&
                !isNaN(lowValueSVF2) &&
                !isNaN(ValueSVF2)
            ) {
                if (highValueSVF2 <= ValueSVF2 || ValueSVF2 <= lowValueSVF2) {
                    if (!audioSVF2) {
                        audioRef.current?.play();
                        setAudioSVF2(true);
                        setExceedThresholdSVF2(true);
                    }
                } else {
                    setAudioSVF2(false);
                    setExceedThresholdSVF2(false);
                }
            }
            fetchData();
        }
    }, [HighSVF2, SVF2, audioSVF2, LowSVF2, maintainSVF2]);

    useEffect(() => {
        if (audioSVF2) {
            const audioEnded = () => {
                setAudioSVF2(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSVF2]);

    const ChangeMaintainSVF_2 = async () => {
        try {
            const newValue = !maintainSVF2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { SVF2_Maintain: newValue }
            );
            setMaintainSVF2(newValue);

            toast.current?.show({
                severity: "info",
                summary: " Maintain SVF FIQ-1902",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmSVF_2 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " SVF FIQ-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainSVF_2(),
        });
    };

    //================================ SVF1 FIQ 1901 ======================================================

    //================================ GVF2 FIQ 1901 ======================================================
    const [audioGVF2, setAudioGVF2] = useState(false);
    const [HighGVF2, setHighGVF2] = useState<number | null>(null);
    const [LowGVF2, setLowGVF2] = useState<number | null>(null);
    const [exceedThresholdGVF2, setExceedThresholdGVF2] = useState(false);

    const [maintainGVF2, setMaintainGVF2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGVF2 === "string" &&
            typeof LowGVF2 === "string" &&
            GVF2 !== null &&
            maintainGVF2 === false
        ) {
            const highValueGVF2 = parseFloat(HighGVF2);
            const lowValueGVF2 = parseFloat(LowGVF2);
            const ValueGVF2 = parseFloat(GVF2);

            if (
                !isNaN(highValueGVF2) &&
                !isNaN(lowValueGVF2) &&
                !isNaN(ValueGVF2)
            ) {
                if (highValueGVF2 <= ValueGVF2 || ValueGVF2 <= lowValueGVF2) {
                    if (!audioGVF2) {
                        audioRef.current?.play();
                        setAudioGVF2(true);
                        setExceedThresholdGVF2(true);
                    }
                } else {
                    setAudioGVF2(false);
                    setExceedThresholdGVF2(false);
                }
            }
            fetchData();
        }
    }, [HighGVF2, GVF2, audioGVF2, LowGVF2, maintainGVF2]);

    useEffect(() => {
        if (audioGVF2) {
            const audioEnded = () => {
                setAudioGVF2(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioGVF2]);

    const ChangeMaintainGVF_2 = async () => {
        try {
            const newValue = !maintainGVF2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GVF2_Maintain: newValue }
            );
            setMaintainGVF2(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain GVF FIQ-1902",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGVF_2 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GVF FIQ-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGVF_2(),
        });
    };

    //================================ GVF1 FIQ 1901 ======================================================

    //================================ SVA2 FIQ 1901 ======================================================
    const [audioSVA2, setAudioSVA2] = useState(false);
    const [HighSVA2, setHighSVA2] = useState<number | null>(null);
    const [LowSVA2, setLowSVA2] = useState<number | null>(null);
    const [exceedThresholdSVA2, setExceedThresholdSVA2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSVA2, setMaintainSVA2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSVA2 === "string" &&
            typeof LowSVA2 === "string" &&
            SVA2 !== null &&
            maintainSVA2 === false
        ) {
            const highValueSVA2 = parseFloat(HighSVA2);
            const lowValueSVA2 = parseFloat(LowSVA2);
            const ValueSVA2 = parseFloat(SVA2);

            if (
                !isNaN(highValueSVA2) &&
                !isNaN(lowValueSVA2) &&
                !isNaN(ValueSVA2)
            ) {
                if (highValueSVA2 <= ValueSVA2 || ValueSVA2 <= lowValueSVA2) {
                    if (!audioSVA2) {
                        audioRef.current?.play();
                        setAudioSVA2(true);
                        setExceedThresholdSVA2(true);
                    }
                } else {
                    setAudioSVA2(false);
                    setExceedThresholdSVA2(false);
                }
            }
            fetchData();
        }
    }, [HighSVA2, SVA2, audioSVA2, LowSVA2, maintainSVA2]);

    useEffect(() => {
        if (audioSVA2) {
            const audioEnded = () => {
                setAudioSVA2(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSVA2]);

    const ChangeMaintainSVA_2 = async () => {
        try {
            const newValue = !maintainSVA2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { SVA2_Maintain: newValue }
            );
            setMaintainSVA2(newValue);

            toast.current?.show({
                severity: "info",
                summary: "Maintain SVA FIQ-1902",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmSVA_2 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " SVA FIQ-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainSVA_2(),
        });
    };

    //================================ SVA2 FIQ 1901 ======================================================

    //================================ GVA2 FIQ 1901 ======================================================
    const [audioGVA2, setAudioGVA2] = useState(false);
    const [HighGVA2, setHighGVA2] = useState<number | null>(null);
    const [LowGVA2, setLowGVA2] = useState<number | null>(null);
    const [exceedThresholdGVA2, setExceedThresholdGVA2] = useState(false);

    const [maintainGVA2, setMaintainGVA2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGVA2 === "string" &&
            typeof LowGVA2 === "string" &&
            GVA2 !== null &&
            maintainGVA2 === false
        ) {
            const highValueGVA2 = parseFloat(HighGVA2);
            const lowValueGVA2 = parseFloat(LowGVA2);
            const ValueGVA2 = parseFloat(GVA2);

            if (
                !isNaN(highValueGVA2) &&
                !isNaN(lowValueGVA2) &&
                !isNaN(ValueGVA2)
            ) {
                if (highValueGVA2 <= ValueGVA2 || ValueGVA2 <= lowValueGVA2) {
                    if (!audioGVA2) {
                        audioRef.current?.play();
                        setAudioGVA2(true);
                        setExceedThresholdGVA2(true);
                    }
                } else {
                    setAudioGVA2(false);
                    setExceedThresholdGVA2(false);
                }
            }
            fetchData();
        }
    }, [HighGVA2, GVA2, audioGVA2, LowGVA2, maintainGVA2]);

    useEffect(() => {
        if (audioGVA2) {
            const audioEnded = () => {
                setAudioGVA2(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioGVA2]);

    const ChangeMaintainGVA_2 = async () => {
        try {
            const newValue = !maintainGVA2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GVA2_Maintain: newValue }
            );
            setMaintainGVA2(newValue);

            toast.current?.show({
                severity: "info",
                summary: " Maintain GVA FIQ-1902",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmGVA_2 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " GVA FIQ-1902",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainGVA_2(),
        });
    };

    //================================ GVA1 FIQ 1901 ======================================================

    const [lineDuty1901, setLineduty1901] = useState<boolean>(false);
    const [lineDuty1902, setLineduty1902] = useState<boolean>(true);

    const ChangeStatusFIQ = async () => {
        try {
            const newValue1 = !lineDuty1901;
            const newValue2 = !lineDuty1902;

            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { FIQ1901_LineDuty: newValue1, FIQ1902_LineDuty: newValue2 }
            );
            setLineduty1901(newValue1);
            setLineduty1902(newValue2);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };
    const confirmLineDuty = () => {
        confirmDialog({
            header: "Comfirmation",
            message: "Are you sure to change Line Duty?",
            icon: "pi pi-info-circle",
            accept: () => ChangeStatusFIQ(),
        });
    };

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/values/attributes/SERVER_SCOPE`
            );

            const highEVCPressureItem = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_High"
            );
            setHighPT01(highEVCPressureItem?.value || null);
            const lowEVCPressureItem = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Low"
            );
            setLowPT01(lowEVCPressureItem?.value || null);

            const HighPT1902 = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_High"
            );
            setHighPT02(HighPT1902?.value || null);
            const LowPT1902 = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Low"
            );
            setLowPT02(LowPT1902?.value || null);

            const HighPT1903 = res.data.find(
                (item: any) => item.key === "PT1_High"
            );
            setHighPT03(HighPT1903?.value || null);
            const LowPT1903 = res.data.find(
                (item: any) => item.key === "PT1_Low"
            );
            setLowPT03(LowPT1903?.value || null);

            const HighGD01 = res.data.find(
                (item: any) => item.key === "GD1_High"
            );
            setHighGD01(HighGD01?.value || null);

            const LowGD01 = res.data.find(
                (item: any) => item.key === "GD1_Low"
            );
            setLowGD01(LowGD01?.value || null);

            const HighGD02 = res.data.find(
                (item: any) => item.key === "GD2_High"
            );
            setHighGD02(HighGD02?.value || null);

            const LowGD02 = res.data.find(
                (item: any) => item.key === "GD2_Low"
            );
            setLowGD02(LowGD02?.value || null);

            const HighGD03 = res.data.find(
                (item: any) => item.key === "GD3_High"
            );
            setHighGD03(HighGD03?.value || null);

            const LowGD03 = res.data.find(
                (item: any) => item.key === "GD3_Low"
            );
            setLowGD03(LowGD03?.value || null);

            const HighSVF1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_High"
            );
            setHighSVF1(HighSVF1?.value || null);

            const LowSVF1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Low"
            );
            setLowSVF1(LowSVF1?.value || null);

            const HighGVF1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High"
            );
            setHighGVF1(HighGVF1?.value || null);

            const LowGVF1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low"
            );
            setLowGVF1(LowGVF1?.value || null);

            const HighSVA1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_High"
            );
            setHighSVA1(HighSVA1?.value || null);

            const LowSVA1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Low"
            );
            setLowSVA1(LowSVA1?.value || null);

            const HighGVA1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_High"
            );
            setHighGVA1(HighGVA1?.value || null);

            const LowGVA1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_Low"
            );
            setLowGVA1(LowGVA1?.value || null);

            const HighSVF2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_High"
            );
            setHighSVF2(HighSVF2?.value || null);

            const LowSVF2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Low"
            );
            setLowSVF2(LowSVF2?.value || null);

            const HighGVF2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High"
            );
            setHighGVF2(HighGVF2?.value || null);

            const LowGVF2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low"
            );
            setLowGVF2(LowGVF2?.value || null);

            const HighSVA2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_High"
            );
            setHighSVA2(HighSVA2?.value || null);

            const LowSVA2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Low"
            );
            setLowSVA2(LowSVA2?.value || null);

            const HighGVA2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High"
            );
            setHighGVA2(HighGVA2?.value || null);

            const LowGVA2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low"
            );
            setLowGVA2(LowGVA2?.value || null);

            const MaintainPT_1901 = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );
            setMaintainPT_1901(MaintainPT_1901?.value || false);

            const MaintainPT_1902 = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Maintain"
            );
            setMaintainPT_1902(MaintainPT_1902?.value || false);

            const MaintainPT_1903 = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );
            setMaintainPT_1903(MaintainPT_1903?.value || false);

            const MaintainGD_1901 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setMaintainGD_1901(MaintainGD_1901?.value || false);

            const MaintainGD_1902 = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD_1902(MaintainGD_1902?.value || false);

            const MaintainGD_1903 = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
            );
            setMaintainGD_1903(MaintainGD_1903?.value || false);

            const MaintainSVF_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );
            setMaintainSVF1(MaintainSVF_1?.value || false);

            const MaintainGVF_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainGVF1(MaintainGVF_1?.value || false);

            const MaintainSVA_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setMaintainSVA1(MaintainSVA_1?.value || false);

            const MaintainGVA_1 = res.data.find(
                (item: any) =>
                    item.key ===
                    "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainGVA1(MaintainGVA_1?.value || false);

            const MaintainSVF_2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Base_Condition_Maintain"
            );
            setMaintainSVF2(MaintainSVF_2?.value || false);

            const MaintainGVF_2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainGVF2(MaintainGVF_2?.value || false);

            const MaintainSVA_2 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            setMaintainSVA2(MaintainSVA_2?.value || false);

            const MaintainGVA_2 = res.data.find(
                (item: any) =>
                    item.key ===
                    "EVC_02_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainGVA2(MaintainGVA_2?.value || false);

            const LineDuty1901 = res.data.find(
                (item: any) => item.key === "FIQ1901_LineDuty"
            );
            setLineduty1901(LineDuty1901?.value || false);

            const LineDuty1902 = res.data.find(
                (item: any) => item.key === "FIQ1902_LineDuty"
            );
            setLineduty1902(LineDuty1902?.value || false);
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

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
                const roundedSVF1 =
                    SVF1 !== null ? parseFloat(SVF1).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdSVF1 && !maintainSVF1
                                            ? "#ff5656"
                                            : maintainSVF1
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVF_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedSVF1}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data3") {
                const roundedGVF1 =
                    GVF1 !== null ? parseFloat(GVF1).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdGVF1 && !maintainGVF1
                                            ? "#ff5656"
                                            : maintainGVF1
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVF_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedGVF1}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
                const roundedSVA1 =
                    SVA1 !== null ? parseFloat(SVA1).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdSVA1 && !maintainSVA1
                                            ? "#ff5656"
                                            : maintainSVA1
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVA_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedSVA1}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
                const roundedGVA1 =
                    GVA1 !== null ? parseFloat(GVA1).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    background:
                                        exceedThresholdGVA1 && !maintainGVA1
                                            ? "#ff5656"
                                            : maintainGVA1
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVA_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVA} :
                                    </p>

                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedGVA1}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
                const roundedSVF2 =
                    SVF2 !== null ? parseFloat(SVF2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdSVF2 && !maintainSVF2
                                            ? "#ff5656"
                                            : maintainSVF2
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVF_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedSVF2}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data6") {
                const roundedGVF2 =
                    GVF2 !== null ? parseFloat(GVF2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdGVF2 && !maintainGVF2
                                            ? "#ff5656"
                                            : maintainGVF2
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVF_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedGVF2}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
                const roundedSVA2 =
                    SVA2 !== null ? parseFloat(SVA2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdSVA2 && !maintainSVA2
                                            ? "#ff5656"
                                            : maintainSVA2
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVA_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedSVA2}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
                const roundedGVA2 =
                    GVA2 !== null ? parseFloat(GVA2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdGVA2 && !maintainGVA2
                                            ? "#ff5656"
                                            : maintainGVA2
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVA_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedGVA2}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans01") {
                const roundedPT03 =
                    PT03 !== null ? parseFloat(PT03).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThreshold3 && !maintainPT_1903
                                            ? "#ff5656"
                                            : maintainPT_1903
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPT_1903()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1903} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT03}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans02") {
                const roundedPT01 =
                    PT01 !== null ? parseFloat(PT01).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThreshold && !maintainPT_1901
                                            ? "#ff5656"
                                            : maintainPT_1901
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPT_1901()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1901} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT01}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
                const roundedPT02 =
                    PT02 !== null ? parseFloat(PT02).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThreshold2 && !maintainPT_1902
                                            ? "#ff5656"
                                            : maintainPT_1902
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.PT_1902} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
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
                                    fontSize: 15,
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

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        EVC 01 :{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        EVC 02 :{" "}
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                    <p style={{ marginLeft: 5 }}>
                                        {EVC_STT01 === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                    <p style={{ marginLeft: 5 }}>
                                        {EVC_STT02 === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {timeUpdate}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {timeUpdate}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
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
                const roundedGD01 =
                    GD1 !== null ? parseFloat(GD1).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    width: 65,
                                    right: 4,
                                    backgroundColor:
                                        exceedThresholdGD01 && !maintainGD_1901
                                            ? "#ff5656"
                                            : maintainGD_1901
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1901()}
                            >
                                <p>{roundedGD01} LEL</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
                const roundedGD02 =
                    GD2 !== null ? parseFloat(GD2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    width: 65,
                                    right: 4,

                                    backgroundColor:
                                        exceedThresholdGD02 && !maintainGD_1902
                                            ? "#ff5656"
                                            : maintainGD_1902
                                            ? "orange"
                                            : "transparent",

                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1902()}
                            >
                                <p>{roundedGD02} LEL</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD3_Value1903") {
                const roundedGD03 =
                    GD3 !== null ? parseFloat(GD3).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    width: 65,
                                    right: 4,

                                    backgroundColor:
                                        exceedThresholdGD03 && !maintainGD_1903
                                            ? "#ff5656"
                                            : maintainGD_1903
                                            ? "orange"
                                            : "transparent",

                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1903()}
                            >
                                <p>{roundedGD03} LEL</p>
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
                                <div>{NO === "1" ? SVD_NO : (NC === "0" ? SVD_NC : null)}</div>

                                {/* {NO === "1" && <div>{SVD_NO}</div>}
                                {NC === "0" && <div>{SVD_NC}</div>} */}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FIQ_1901") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1901
                                {lineDuty1901 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "FIQ_1902") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1902
                                {lineDuty1902 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )}
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
              AlarmCenter: { x: -769.7577251992393, y: 567.1797209870246 },
              ArrowRight: { x: 258.9256642678949, y: 1019.0985886548262 },
              ArrowRight1: { x: -1165.821109536864, y: 1026.8452833725173 },
              BallValue01: { x: -1090.3623120428465, y: 1130.8426285378578 },
              BallValue02: { x: -887.6141478861746, y: 1129.6502447788996 },
              BallValue03: { x: -758.5075509147275, y: 894.4326848093123 },
              BallValue04: { x: -757.8322908208111, y: 1127.684549644359 },
              BallValue05: { x: -573.743025120388, y: 893.7254573680121 },
              BallValue06: { x: -574.2453934982136, y: 1128.1337792139873 },
              BallValue07: { x: -391.71326336183927, y: 813.8244470890327 },
              BallValue08: { x: 45.69338469127294, y: 814.8530502988284 },
              BallValue09: { x: -390.7347918738091, y: 1204.6166524541484 },
              BallValue10: { x: 44.70166109368827, y: 1204.159292175339 },
              BallValueCenter: {
                  x: -165.80710887361258,
                  y: 1006.8595594996316,
              },
              BallValueCenter_Check: {
                  x: 90.96636981528951,
                  y: 1084.2937921267353,
              },
              BallValueCenter_None: {
                  x: -148.86672654059413,
                  y: 1039.286470841561,
              },
              BallValueCenter_None2: {
                  x: -133.78263324371193,
                  y: 1038.6243048935844,
              },
              BallValueFirst: { x: 342.15262421132076, y: 1005.5430441067174 },
              BallValueLast: { x: -1237.9047231598838, y: 1013.6849449585161 },
              BallValuePSV: { x: 210.72148707331525, y: 958.6157106130481 },
              BallValuePSVNone: { x: 228.65438036310263, y: 974.0164290314665 },
              ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
              FIQ_1901: { x: -240.7533028867357, y: 550.5684432829023 },
              FIQ_1902: { x: -231.60088039032206, y: 1289.1255396791125 },
              FIQ_none: { x: -165.54268721568215, y: 798.0972512607284 },
              FIQ_none2: { x: -157.1205623176026, y: 1186.5853436430443 },
              FIQ_none11: { x: -136.12942459049623, y: 842.6885101213705 },
              FIQ_none22: { x: -127.36875034337497, y: 1231.0392945117674 },
              Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
              Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
              GD1: { x: -745.9526824268976, y: 1025.5908034534227 },
              GD1_Name1901: { x: -750.5717919879045, y: 968.8438653513034 },
              GD1_Value1901: { x: -750.6929582767964, y: 994.0597991500013 },
              GD2: { x: -351.4389941850782, y: 1022.7819038201158 },
              GD2_Name1902: { x: -354.74096631277996, y: 964.7102283049067 },
              GD2_Value1902: { x: -354.6295300462283, y: 989.9911271099056 },
              GD3: { x: 19.041341761782917, y: 1021.9968146950976 },
              GD3_Name1903: { x: 14.064251841848176, y: 962.5434170104967 },
              GD3_Value1903: { x: 14.283320814722941, y: 988.28449275314 },
              GD_none1: { x: -720.3956940812873, y: 1045.5612154866174 },
              GD_none2: { x: -326.8704087949896, y: 1040.14552169912 },
              GD_none3: { x: 44.43067084862969, y: 1036.1027102105159 },
              HELP: { x: 750.7851455025582, y: 336.66019515746984 },
              Header: { x: -1151.6225319026826, y: 574.7715183161662 },
              PCV01: { x: -703.6225805120118, y: 879.1889175310166 },
              PCV02: { x: -703.7261320869296, y: 1113.240259699294 },
              PCV_NUM01: { x: -755.074102746647, y: 787.3298251728983 },
              PCV_NUM02: { x: -753.2670022508862, y: 1219.3276654276463 },
              PCV_ballVavle_Small1: {
                  x: -617.133632772711,
                  y: 885.6388490887801,
              },
              PCV_ballVavle_Small1_none1: {
                  x: -679.9410117692291,
                  y: 895.8737610941586,
              },
              PCV_ballVavle_Small1_none2: {
                  x: -678.2299433549822,
                  y: 1129.2909413576103,
              },
              PCV_ballVavle_Small2: {
                  x: -615.6989498965552,
                  y: 1119.4114511310147,
              },
              PCV_ballVavle_Small2_none1: {
                  x: -610.8824333182524,
                  y: 932.044876458853,
              },
              PCV_ballVavle_Small2_none2: {
                  x: -609.4476614967655,
                  y: 1165.7292372994432,
              },
              PCV_none1: { x: -675.8483009440444, y: 925.4958577880325 },
              PCV_none2: { x: -674.3258973272732, y: 1158.0479877126536 },
              PSV01: { x: 121.99644634072223, y: 722.5979741364629 },
              PSV_01: { x: 207.36093454652644, y: 894.8194564074687 },
              PSV_02: { x: 186.61559387183382, y: 874.8453736745709 },
              PSV_03: { x: 179.24045238769793, y: 807.8513210996118 },
              PSV_None01: { x: 264.6066519200614, y: 1036.7984512500655 },
              PSV_None02: { x: 229.41484444700808, y: 920.3475775498915 },
              PSV_None03: { x: 205.13413659641662, y: 897.6667259680172 },
              PSV_None04: { x: 202.2501602840781, y: 827.0933030066423 },
              PT1: { x: -996.9532738162299, y: 949.6022756172126 },
              PT2: { x: -350.4391791978867, y: 1138.464910598512 },
              PT3: { x: -344.2422546040923, y: 750.8313302579564 },
              PT_col1: { x: -965.0334069238746, y: 1012.8802095314497 },
              PT_col2: { x: -311.61340748391814, y: 813.5387087224499 },
              PT_col3: { x: -318.1578385287693, y: 1201.5982564241394 },
              PT_none1: { x: -964.3722675067637, y: 978.9303239049175 },
              PT_none2: { x: -310.54194957541347, y: 782.7500279655704 },
              PT_none3: { x: -317.74068971173074, y: 1173.5423779574912 },
              PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
              PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
              Pressure_Trans01: {
                  x: -1049.2473802202082,
                  y: 855.3114796471364,
              },
              Pressure_Trans02: { x: -562.6962249223983, y: 688.6387678519382 },
              Pressure_Trans03: {
                  x: -564.0315214558219,
                  y: 1323.5258392422122,
              },
              SDV: { x: -1099.8835403835114, y: 956.6494709563746 },
              SDV_Ball: { x: -1072.658207783444, y: 1161.1738486098288 },
              SDV_IMG: { x: -1095.7464489538452, y: 994.0752335439693 },
              SDV_Name_none: { x: -1249.6461839977737, y: 902.8410000476873 },
              SDV_None: { x: -1069.034965906526, y: 1045.0156837354775 },
              T_juntion_11: { x: -71.38782403918049, y: 827.0462087381112 },
              T_juntion_14: { x: -289.03721709708736, y: 1184.5034182177258 },
              Tank: { x: -903.8348910158862, y: 983.557904759858 },
              Tank_Ball: { x: -869.8918792522013, y: 1161.3421223886141 },
              Tank_None: { x: -880.9288889403146, y: 1045.4801484268744 },
              Temperature_Trans01: {
                  x: -607.828356494313,
                  y: 562.8487535527242,
              },
              Temperature_Trans02: {
                  x: -796.1166124474211,
                  y: 1445.5258186779024,
              },
              VavleWay: { x: -224.78705778398276, y: 1015.8472031854426 },
              animation_line7: { x: -359.940697041692, y: 845.650011090059 },
              animation_line8: { x: 58.61285378247803, y: 845.7339111102631 },
              animation_line9: {
                  x: -367.83294526673615,
                  y: 1235.2489576729074,
              },
              animation_line10: { x: 58.79445151290554, y: 1235.4134977535994 },
              animation_line11: { x: -36.25094554550509, y: 845.4101876460927 },
              animation_line12: {
                  x: -133.2992075354374,
                  y: 1038.0566391817506,
              },
              animation_line13: {
                  x: -149.50201219483813,
                  y: 1038.8111762620706,
              },
              animation_line14: {
                  x: -253.98006830837323,
                  y: 1235.4034694811062,
              },
              animation_line15: {
                  x: 61.881522019472186,
                  y: 1235.5350090951665,
              },
              borderWhite: { x: -1255.5860527043733, y: 570.6973852763994 },
              data1: { x: -241.3789449409768, y: 742.0872704993753 },
              data2: { x: -241.1892960415438, y: 694.1327393419244 },
              data3: { x: -241.0146932560861, y: 646.4850519390955 },
              data4: { x: -240.75823101830503, y: 598.1099182771684 },
              data5: { x: -231.36808141646952, y: 1336.5701182589364 },
              data6: { x: -231.73476394811564, y: 1384.208994293254 },
              data7: { x: -231.77917777528347, y: 1431.9903313994284 },
              data8: { x: -231.36896991535298, y: 1479.4135435995122 },
              line1: { x: -1214.9782042334255, y: 1044.7946609746105 },
              line2: { x: -857.076582460349, y: 1044.8496174211396 },
              line3: { x: -740.4843786514932, y: 924.7734644855461 },
              line4: { x: -740.238419040097, y: 1158.8559724650454 },
              line5: { x: -556.2037786773546, y: 924.6826669400624 },
              line6: { x: -556.6558035478338, y: 1158.6558163299526 },
              line7: { x: -460.3340758870887, y: 1039.7355815474468 },
              line8: { x: -374.1947990352617, y: 845.1255935069244 },
              line9: { x: -373.5456900377612, y: 1234.7053320346292 },
              line10: { x: 63.19832835757296, y: 845.1595827580492 },
              line11: { x: 62.86985056843554, y: 1234.683954724923 },
              line12: { x: 159.8198310785691, y: 1035.9323508670825 },
              line13: { x: 359.3312960971492, y: 1036.9713896720348 },
              overlay_SmallVavle1: {
                  x: -620.7026867284558,
                  y: 942.6024251546756,
              },
              overlay_SmallVavle2: {
                  x: -618.7304687850988,
                  y: 1176.6189557419923,
              },
              overlay_line7: { x: -496.1247334784416, y: 1038.8156819743556 },
              overlay_line13: { x: 134.32824796850616, y: 1034.2196427442032 },
              timeUpdate3: { x: -1224.1168870724678, y: 634.2416848243695 },
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
                strokeWidth: isAnimated07 && !isAnimatedCenter ? 3 : 10,
                stroke: isAnimated07 && !isAnimatedCenter ? "white" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 10, // Thêm điều kiện ở đây
                stroke: isAnimated09 && !isAnimatedCenter ? "white" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 10,
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
                width: 10,
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
                background: "none",
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
                background: background,
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
                background: background,
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
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: background,
            },
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                width: 35,
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
                background: background,
                width: 10,
                height: 22,
            },
        },
        {
            id: "line13",
            position: positions.line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 1,
                background: background,
            },
        },

        // ============================== line =========================================

        {
            id: "SDV",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
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
                width: 90,
                height: 37,
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
                width: 35,
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
                width: 10,
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
                width: 10,
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

        {
            id: "BallValueFirst",
            position: positions.BallValueFirst,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueFirst />
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
            id: "BallValueLast",
            position: positions.BallValueLast,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueLast />
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
                width: 55,
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
                width: 35,
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
                            width={60}
                            height={60}
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
                            width={60}
                            height={60}
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
                            width={30}
                            height={30}
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
                            width={30}
                            height={30}
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
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PCV_01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 180,
                height: 50,
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
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PCV_02_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: background,
                width: 180,
                height: 50,

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
                        onClick={confirmLineDuty}
                    >
                        FIQ-1901
                        {lineDuty1901 && <span>1901</span>}
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 230,
                height: 47,
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
                        onClick={confirmLineDuty}
                    >
                        FIQ-1902
                        {lineDuty1902 && <span>1902</span>}
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 230,
                height: 47,
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
                width: 10,
                height: 10,
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
                width: 10,
                height: 10,
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
                height: 40,
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
                            fontSize: 15,
                            fontWeight: 400,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
                            fontWeight: 400,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
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
                width: 230,
                height: 47,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
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
                width: 230,
                height: 47,
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
                            fontSize: 15,
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
                width: 230,
                height: 47,
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
                background: "none",
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
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None03",
            position: positions.PSV_None03,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None04",
            position: positions.PSV_None04,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
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
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PSV01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 180,
                height: 50,
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
                width: 190,
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
                            fontSize: 15,
                            fontWeight: 600,
                        }}
                    ></div>
                ),
            },
            position: positions.Pressure_Trans02,

            style: {
                border: background,
                width: 190,
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
                width: 190,
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
                width: 10,
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
                width: 10,
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
                width: 20,
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
                width: 0,
                height: 40,

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
                height: 40,

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
                height: 40,

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
                                    fontSize: 45,
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
                width: 10,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // {
        //     id: "HELP",
        //     data: {
        //         label: (
        //             <div>
        //                 <div
        //                     style={{
        //                         textAlign: "center",
        //                         cursor: "pointer",
        //                     }}
        //                 >
        //                     <p
        //                         style={{
        //                             width: 50,
        //                             height: 50,
        //                             border: "5px solid white",
        //                             borderRadius: 50,
        //                             fontWeight: 600,
        //                             color: "white",
        //                             fontSize: 30,
        //                         }}
        //                         onClick={() => setVisible(true)}
        //                     >
        //                         ?
        //                     </p>
        //                 </div>
        //             </div>
        //         ),
        //     },

        //     position: positions.HELP,

        //     style: {
        //         background: background,
        //         border: background,
        //         width: 10,
        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },
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
                width: 370,

                height: 10,
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
                            fontSize: 13,
                            fontWeight: 400,
                            position: "relative",
                            bottom: 5,
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
                width: 80,
                height: 25,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD2_Name1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 400,
                            position: "relative",
                            bottom: 5,
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
                width: 80,
                height: 25,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD3_Name1903",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 400,
                            position: "relative",
                            bottom: 5,
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
                width: 80,
                height: 25,
            },
            targetPosition: Position.Left,
        },

        {
            id: "GD1_Value1901",
            data: {
                label: <div style={{}}> </div>,
            },
            position: positions.GD1_Value1901,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 80,
                height: 30,
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
                width: 80,
                height: 30,
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
                width: 80,
                height: 30,
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
                width: 10,
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
                width: 10,
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
                width: 10,
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
                width: 420,
                height: 190,
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
                width: 100,
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
                width: 100,
                height: 10,
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

        //===============================  Alarm center ===========================

        // {
        //     id: "AlarmCenter",
        //     position: positions.AlarmCenter,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div>
        //                 <AlarmOTSUKA />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Left,
        //     targetPosition: Position.Right,
        //     style: {
        //         background: backgroundGraphic,
        //         border: "none",
        //         width: 200,
        //         borderRadius: 5,
        //     },
        // },
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
    //             } else if (id === "BallValueFirst") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueFirst: position,
    //                 }));
    //             } else if (id === "BallValueLast") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueLast: position,
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
    //             //========================== AlarmCenter  =======================
    //             else if (id === "AlarmCenter") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     AlarmCenter: position,
    //                 }));
    //             }
    //         }
    //     },
    //     [setNodes, setPositions, editingEnabled]
    // );

    // const toggleEditing = () => {
    //     setEditingEnabled(!editingEnabled);
    // };
    // useEffect(() => {
    //     localStorage.setItem("positionsDemo", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            <audio ref={audioRef}>
                <source
                    src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                    type="audio/mpeg"
                />
            </audio>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}

            <Toast ref={toast} />
            <ConfirmDialog />

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
                    borderRadius: 5,
                    //width: "auto",
                    height: "100%",
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
        </>
    );
}
