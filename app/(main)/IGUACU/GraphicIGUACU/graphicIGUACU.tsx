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
import PCV_01_Otsuka from "../ReactFlow/PCV01_Otsuka";
import PCV_02_Otsuka from "../ReactFlow/PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import {
    id_OTSUKA,
    id_IGUECU,
} from "../../data-table-device/ID-DEVICE/IdDevice";
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
import { edgePRU } from "../../PRU/GraphicPRU/edgePRU";
import { edgeZOVC } from "./edgeZOVC";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "./Api_ZOVC";
import { Status } from "../../Graphic/StatusGraphic";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
interface ValueStateMap {
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

export default function GraphicIGUACU() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [active, setActive] = useState();

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
    const [PT1, setPT1] = useState<string | null>(null);

    const [GD1, SetGD1] = useState<string | null>(null);
    const [GD2, SetGD2] = useState<string | null>(null);
    const [GD3, SetGD3] = useState<string | null>(null);

    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);

    const [EVC_01_Conn_STT, setEVC_01_Conn_STT] = useState<string | null>(null);
    const [EVC_01_Conn_STTValue, setEVC_01_Conn_STTValue] = useState<
        string | null
    >(null);
    const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);
    const [EVC_02_Conn_STTValue, setEVC_02_Conn_STTValue] = useState<
        string | null
    >(null);
    const [PLC_STT, setPLC_STT] = useState<string | null>(null);
    const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);

    const toast = useRef<Toast>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_IGUECU,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        const obj_PCV_PSV = {
            entityDataCmds: [
                {
                    cmdId: 1,
                    latestCmd: {
                        keys: [
                            {
                                type: "ATTRIBUTE",
                                key: "active",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_IGUECU,
                            },
                        },
                        pageLink: {
                            pageSize: 1,
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
                        latestValues: [
                            {
                                type: "ATTRIBUTE",
                                key: "active",
                            },
                        ],
                    },
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setCheckConnectData(true);
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                    ws.current?.send(JSON.stringify(obj_PCV_PSV));
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

                    const keys = Object?.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Flow_at_Base_Condition: setSVF1,
                        EVC_01_Flow_at_Measurement_Condition: setGVF1,

                        EVC_01_Volume_at_Base_Condition: setSVA1,
                        EVC_01_Volume_at_Measurement_Condition: setGVA1,

                        EVC_01_Pressure: setPT01,

                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Flow_at_Measurement_Condition: setGVF2,
                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Volume_at_Measurement_Condition: setGVA2,

                        EVC_02_Pressure: setPT02,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT1,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        EVC_01_Conn_STT: setEVC_01_Conn_STT,
                        EVC_02_Conn_STT: setEVC_02_Conn_STT,
                        PLC_Conn_STT: setPLC_STT,

                        time: setTimeUpdate,
                    };

                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_01_Conn_STTValue,
                        EVC_02_Conn_STT: setEVC_02_Conn_STTValue,
                        PLC_Conn_STT: setPLC_Conn_STT,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }

                        if (valueStateMap[key]) {
                            const value = dataReceived.data[key][0][0];

                            const date = new Date(value);
                            const formattedDate = `${date
                                .getDate()
                                .toString()
                                .padStart(2, "0")}-${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}-${date.getFullYear()} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate); // Set formatted timestamp
                        }
                    });
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.active.value;
                    setActive(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.setActive.value;
                    setActive(updatedData);
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

    const [maintainPCV1901, setMaintainPCV1901] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT01 === "string" &&
            typeof LowPT01 === "string" &&
            PT01 !== null &&
            maintainPCV1901 === false
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
    }, [HighPT01, PT01, audioPT1901, LowPT01, maintainPCV1901]);

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

    const ChangeMaintainPCV1901 = async () => {
        try {
            const newValue = !maintainPCV1901;
            await httpApi.post(PostTelemetry_ZOVC, {
                PCV1901_maintain: newValue,
            });
            setMaintainPCV1901(newValue);

            toast.current?.show({
                severity: "info",
                summary: " Maintain PT-1901 ",
                detail: "Success",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };

    const confirmPCV1901 = () => {
        confirmDialog({
            message: "Do you want to change the status?",
            header: " PT-1901",
            icon: "pi pi-info-circle",
            accept: () => ChangeMaintainPCV1901(),
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
            await httpApi.post(PostTelemetry_ZOVC, {
                PT_1902_maintain: newValue,
            });
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
    const [HighPT1, setHighPT1] = useState<number | null>(null);
    const [LowPT1, setLowPT1] = useState<number | null>(null);
    const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT_1903, setMaintainPT_1903] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT1 === "string" &&
            typeof LowPT1 === "string" &&
            PT1 !== null &&
            maintainPT_1903 === false
        ) {
            const highValue = parseFloat(HighPT1);
            const lowValue = parseFloat(LowPT1);
            const PT1Value = parseFloat(PT1);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT1Value)) {
                if (highValue < PT1Value || PT1Value < lowValue) {
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
    }, [HighPT1, PT1, audioPT1903, LowPT1, maintainPT_1903]);

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
            await httpApi.post(PostTelemetry_ZOVC, {
                PT_1903_maintain: newValue,
            });
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
            await httpApi.post(PostTelemetry_ZOVC, { GD1_Maintain: newValue });
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
            await httpApi.post(PostTelemetry_ZOVC, { GD2_Maintain: newValue });
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
            await httpApi.post(PostTelemetry_ZOVC, { GD3_Maintain: newValue });
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
                if (highValueSVF1 < ValueSVF1 || ValueSVF1 < lowValueSVF1) {
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
            await httpApi.post(PostTelemetry_ZOVC, { SVF1_Maintain: newValue });
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
                if (highValueGVF1 < ValueGVF1 || ValueGVF1 < lowValueGVF1) {
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
            await httpApi.post(PostTelemetry_ZOVC, { GVF1_Maintain: newValue });
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
                if (highValueSVA1 < ValueSVA1 || ValueSVA1 < lowValueSVA1) {
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
            await httpApi.post(PostTelemetry_ZOVC, { SVA1_Maintain: newValue });
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
                if (highValueGVA1 < ValueGVA1 || ValueGVA1 < lowValueGVA1) {
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
            await httpApi.post(PostTelemetry_ZOVC, { GVA1_Maintain: newValue });
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
                if (highValueSVF2 < ValueSVF2 || ValueSVF2 < lowValueSVF2) {
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
            await httpApi.post(PostTelemetry_ZOVC, { SVF2_Maintain: newValue });
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
                if (highValueGVF2 < ValueGVF2 || ValueGVF2 < lowValueGVF2) {
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
            await httpApi.post(PostTelemetry_ZOVC, { GVF2_Maintain: newValue });
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
                if (highValueSVA2 < ValueSVA2 || ValueSVA2 < lowValueSVA2) {
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
            await httpApi.post(PostTelemetry_ZOVC, { SVA2_Maintain: newValue });
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
                if (highValueGVA2 < ValueGVA2 || ValueGVA2 < lowValueGVA2) {
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
            await httpApi.post(PostTelemetry_ZOVC, { GVA2_Maintain: newValue });
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

            await httpApi.post(PostTelemetry_ZOVC, {
                FIQ1901_LineDuty: newValue1,
                FIQ1902_LineDuty: newValue2,
            });
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
            const res = await httpApi.get(GetTelemetry_ZOVC);

            const highEVCPressureItem = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_High"
            );
            setHighPT01(highEVCPressureItem?.value || null);
            const lowEVCPressureItem = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Low"
            );
            setLowPT01(lowEVCPressureItem?.value || null);

            const HighPT1902 = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_High"
            );
            setHighPT02(HighPT1902?.value || null);
            const LowPT1902 = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Low"
            );
            setLowPT02(LowPT1902?.value || null);

            const HighPT1903 = res.data.find(
                (item: any) => item.key === "PT1_High"
            );
            setHighPT1(HighPT1903?.value || null);
            const LowPT1903 = res.data.find(
                (item: any) => item.key === "PT1_Low"
            );
            setLowPT1(LowPT1903?.value || null);

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

            const MaintainPCV1901 = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
            );
            setMaintainPCV1901(MaintainPCV1901?.value || false);

            const MaintainPT_1902 = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Maintain"
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
        PCV1901: "PT-1901",
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                const roundedPT1 =
                    PT1 !== null ? parseFloat(PT1).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                        PT-1503 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT1}
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThreshold && !maintainPCV1901
                                            ? "#ff5656"
                                            : maintainPCV1901
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPCV1901()}
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
                                        PT-1501 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {/* {roundedPT01} */}
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
                                    Bara
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
                                    fontSize: 22,
                                    fontWeight: 500,
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
                                        PT-1502 :
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
                                    Bara
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
                                        Gateway :{" "}
                                    </p>
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
                                        {active === "true" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Active
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Un Active
                                            </span>
                                        )}
                                    </p>
                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                {Status.Connected}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                {Status.Disconnected}
                                            </span>
                                        )}
                                    </p>
                                    <p style={{ marginLeft: 5 }}>
                                        {EVC_01_Conn_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                {Status.Connected}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                {Status.Disconnected}
                                            </span>
                                        )}
                                    </p>
                                    <p style={{ marginLeft: 5 }}>
                                        {EVC_02_Conn_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                {Status.Connected}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                {Status.Disconnected}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: background,

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        null
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {EVC_01_Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {EVC_02_Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PLC_Conn_STT}
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
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
                                <div>
                                    {NO === "1"
                                        ? SVD_NO
                                        : NC === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1501
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1502
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
              AlarmCenter: { x: -141.93537908754035, y: 551.5742065897153 },
              ArrowRight: { x: 503.1381419284244, y: 1023.694783335719 },
              ArrowRight1: { x: -1309.5952585721552, y: 1028.6160429390827 },
              BallValue01: { x: -1099.8623120428465, y: 1132.8426285378578 },
              BallValue02: { x: -936.0488084444128, y: 1133.9611112928555 },
              BallValue03: { x: -196.79621954129698, y: 899.1124566834239 },
              BallValue04: { x: -195.60396011679137, y: 1130.0961562807925 },
              BallValue05: { x: 69.02660980686983, y: 900.275444950572 },
              BallValue06: { x: 68.4817333577081, y: 1129.366264933931 },
              BallValue07: { x: -760.558494130737, y: 813.9595916722001 },
              BallValue08: { x: -318.78277994435996, y: 813.2368352599929 },
              BallValue09: { x: -761.5161533656683, y: 1218.0953144552127 },
              BallValue10: { x: -319.2587189121365, y: 1218.2687283598136 },
              BallValueCenter: { x: -490.3799459557838, y: 1016.4944766882877 },
              BallValueCenter_Check: {
                  x: 90.96636981528951,
                  y: 1084.2937921267353,
              },
              BallValueCenter_None: {
                  x: -474.0480962199408,
                  y: 1047.4658048132944,
              },
              BallValueCenter_None2: {
                  x: -458.43233108676895,
                  y: 1047.9161594286932,
              },
              BallValueFirst: { x: 419.65262421132076, y: 1009.5430441067174 },
              BallValueLast: { x: -1236.4348814622088, y: 1015.5065165529766 },
              BallValuePSV: { x: 290.22148707331525, y: 959.6157106130481 },
              BallValuePSVNone: { x: 307.79818356393537, y: 974.3599694543407 },
              ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
              FIQ_1901: { x: -600.2178332288872, y: 530.5500772634006 },
              FIQ_1902: { x: -600.782593545606, y: 1307.348642657379 },
              FIQ_none: { x: -489.9470769137962, y: 797.3702269986474 },
              FIQ_none2: { x: -490.92064731860467, y: 1201.8983996314123 },
              FIQ_none11: { x: -461.4522399597448, y: 842.2526102310347 },
              FIQ_none22: { x: -461.411272356637, y: 1246.8432149457044 },
              Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
              Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
              GD1: { x: -721.106774380396, y: 1036.124815356864 },
              GD1_Name1901: { x: -750.5717919879045, y: 963.6033250363372 },
              GD1_Value1901: { x: -750.6929582767964, y: 998.3450746708818 },
              GD2: { x: -108.63790203727399, y: 1034.2608683363853 },
              GD2_Name1902: { x: -138.3576747080346, y: 962.2555967945655 },
              GD2_Value1902: { x: -138.105199084697, y: 996.9067838824453 },
              GD3: { x: -33.45865823821708, y: 1023.4968146950976 },
              GD3_Name1903: { x: -38.935748158151824, y: 965.0434170104967 },
              GD3_Value1903: { x: -38.71667918527706, y: 990.28449275314 },
              GD_none1: { x: -695.6714460801703, y: 1055.524751466512 },
              GD_none2: { x: -83.45659585230814, y: 1055.0452836615555 },
              GD_none3: { x: -8.569329151370312, y: 1040.1027102105159 },
              HELP: { x: 750.7851455025582, y: 336.66019515746984 },
              Header: { x: -1151.6437416275705, y: 451.3479861495938 },
              Line2_NONE: { x: -884.3336203769039, y: 1046.097424130381 },
              Line2_NONE1: { x: -771.9885863058424, y: 1046.097424130381 },
              LineBall_1_1: { x: -1308.5317402818896, y: 1046.4869361614612 },
              PCV01: { x: -111.50890549579239, y: 883.8137375633868 },
              PCV02: { x: -111.53560759935901, y: 1115.2398542513167 },
              PCV_NUM01: { x: -200.90249819080248, y: 779.1363564017703 },
              PCV_NUM02: { x: -202.05990690632876, y: 1214.5509375649663 },
              PCV_ballVavle_Small1: {
                  x: -9.97812688216436,
                  y: 890.3528829879407,
              },
              PCV_ballVavle_Small1_none1: {
                  x: -85.98048131286686,
                  y: 906.7535606409883,
              },
              PCV_ballVavle_Small1_none2: {
                  x: -87.01319099046559,
                  y: 1140.2927546567473,
              },
              PCV_ballVavle_Small2: {
                  x: -10.924423457684213,
                  y: 1121.8809236143888,
              },
              PCV_ballVavle_Small2_none1: {
                  x: -3.980775175783833,
                  y: 937.8135634050248,
              },
              PCV_ballVavle_Small2_none2: {
                  x: -4.242106929766209,
                  y: 1168.0979210360842,
              },
              PCV_none1: { x: -81.53859921276154, y: 931.6359691613542 },
              PCV_none2: { x: -82.81357330202869, y: 1160.4579021505795 },
              PSV01: { x: 164.5653138749226, y: 709.1940849015447 },
              PSV_01: { x: 286.01399102294744, y: 901.1847523730952 },
              PSV_02: { x: 268.17221043298656, y: 881.9653957553064 },
              PSV_03: { x: 262.0916184180753, y: 802.6731232227132 },
              PSV_None01: { x: 436.98718383080245, y: 1040.7984512500652 },
              PSV_None02: { x: 308.4148444470081, y: 926.8475775498915 },
              PSV_None03: { x: 286.04347842295704, y: 903.492198579528 },
              PSV_None04: { x: 284.45405157984317, y: 822.562379864356 },
              PT1: { x: 210.29089216580826, y: 944.8215389633342 },
              PT2: { x: -708.258294622871, y: 1154.2084571677146 },
              PT3: { x: -714.6813595253996, y: 749.7451241622731 },
              PT_col1: { x: 243.09758907436128, y: 1006.995256464112 },
              PT_col2: { x: -682.0454691367402, y: 812.7156614482261 },
              PT_col3: { x: -676.1744823539359, y: 1217.1938517905614 },
              PT_none1: { x: 246.97093596247453, y: 1035.3795085307177 },
              PT_none2: { x: -681.8592643393351, y: 782.4202415551159 },
              PT_none3: { x: -675.213304101358, y: 1184.4279572443495 },
              PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
              PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
              Pressure_Trans01: {
                  x: 123.01439682372097,
                  y: 1214.0304333064828,
              },
              Pressure_Trans02: {
                  x: -1019.4423849427775,
                  y: 706.6585420699575,
              },
              Pressure_Trans03: {
                  x: -1022.6221979715284,
                  y: 1306.0599379762566,
              },
              SDV: { x: -1127.2804525595525, y: 948.8166088808405 },
              SDV_Ball: { x: -1082.1826908317034, y: 1163.7430466784738 },
              SDV_IMG: { x: -1105.7858651854403, y: 995.2834321094119 },
              SDV_Name_none: { x: -1249.6461839977737, y: 902.8410000476873 },
              SDV_None: { x: -1079.6286470234306, y: 1045.6886789070904 },
              T_juntion_11: { x: -415.1375899376694, y: 826.41338351339 },
              T_juntion_14: { x: -636.9217801711462, y: 1199.4187412355468 },
              Tank: { x: -952.0719666857922, y: 984.2988432580569 },
              Tank_Ball: { x: -918.0480270305792, y: 1165.3460365617266 },
              Tank_None: { x: -929.420575058274, y: 1045.859003360467 },
              Temperature_Trans01: {
                  x: -607.828356494313,
                  y: 562.8487535527242,
              },
              Temperature_Trans02: {
                  x: -796.1166124474211,
                  y: 1445.5258186779024,
              },
              VavleWay: { x: -548.7343955645046, y: 1023.9896019770438 },
              animation_line7: { x: -726.8677999585877, y: 845.0411827415849 },
              animation_line8: { x: -302.1278181476729, y: 845.0900138040361 },
              animation_line9: { x: -735.8615775891575, y: 1250.0032163426715 },
              animation_line10: {
                  x: -302.52565055103537,
                  y: 1250.145137738511,
              },
              animation_line11: {
                  x: -379.70039074752606,
                  y: 845.4885740100881,
              },
              animation_line12: {
                  x: -456.7744720087678,
                  y: 1047.6913485484115,
              },
              animation_line13: {
                  x: -471.36187766507726,
                  y: 1047.0994790430639,
              },
              animation_line14: {
                  x: -601.6773380252566,
                  y: 1249.8269450159223,
              },
              animation_line15: {
                  x: -300.41401361805697,
                  y: 1249.8955661985747,
              },
              borderWhite: { x: -1267.4241384555676, y: 447.0015279974359 },
              data1: { x: -600.2396652303086, y: 733.0298552462513 },
              data2: { x: -600.6538263836953, y: 682.3968450603423 },
              data3: { x: -600.4792235982375, y: 631.8178888851007 },
              data4: { x: -600.1016616532435, y: 580.9222883481272 },
              data5: { x: -600.9941090494707, y: 1357.5928722234303 },
              data6: { x: -600.8317496942007, y: 1408.2027063708313 },
              data7: { x: -600.8761635213684, y: 1458.4550015900893 },
              data8: { x: -600.4659556614379, y: 1508.8491719032568 },
              line1: { x: -1219.4244277428284, y: 1046.4109300929706 },
              line2: { x: -759.1307313177314, y: 1046.097424130381 },
              line3: { x: -743.0134159304, y: 844.6163804041859 },
              line4: { x: -743.9949690251686, y: 1249.172245093845 },
              line5: { x: -300.65784806763253, y: 844.3342440262651 },
              line6: { x: -300.98065704991916, y: 1249.1529639630187 },
              line7: { x: -241.6382268189932, y: 1041.7359796478943 },
              line8: { x: -178.3476951217882, y: 930.3833450683701 },
              line9: { x: -178.37038145875272, y: 1161.2417569105805 },
              line10: { x: 86.69745659087829, y: 930.5099856332267 },
              line11: { x: 86.19431979613125, y: 1161.0153295862324 },
              line12: { x: 116.83816603164496, y: 1040.345253330986 },
              line13: { x: 437.3312960971492, y: 1041.4713896720348 },
              lineBall_13_1: { x: 519.8312960971493, y: 1041.4713896720348 },
              overlay_SmallVavle1: {
                  x: -593.2918361488164,
                  y: 1011.397327575481,
              },
              overlay_SmallVavle2: {
                  x: -1263.7593947324417,
                  y: 1290.7025144885476,
              },
              overlay_line7: { x: -234.00651420480602, y: 1043.3202658573925 },
              overlay_line13: { x: 150.3917593807463, y: 915.3092652673095 },
              timeUpdate3: { x: -1243.9518053811212, y: 516.6560931085854 },
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
            ...edgeZOVC,

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
                width: 35,
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
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
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

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
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
            style: { border: "none", width: 35, height: 5, background: line },
        },

        {
            id: "line8",
            position: positions.line8,
            type: "custom",
            data: {
                label: <div>8</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
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

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
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
                width: 35,
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
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        SDV-1501
                    </div>
                ),
            },
            position: positions.SDV,
            zIndex: 99999,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 130,
                height: 45,
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
                background: "none",
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
                background: "none",
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
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                width: 260,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                        {/* FIQ-1901
                        {lineDuty1901 && <span>1901</span>} */}
                        Not used
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 300,
                height: 50,
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
                width: 300,
                height: 50,
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
            targetPosition: Position.Right,
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
                            fontSize: 22,
                            fontWeight: 500,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
                            fontWeight: 500,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
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
                width: 300,
                height: 50,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
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
                width: 300,
                height: 50,
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
                            fontSize: 22,
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
                width: 300,
                height: 50,
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
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Top,
        },
        {
            id: "Pressure_Trans02",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    ></div>
                ),
            },
            position: positions.Pressure_Trans02,

            style: {
                border: background,
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                background: "none",
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
                                    fontWeight: 600,
                                    color: "#ffaa00",
                                }}
                            >
                                IGUACU
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
        // {
        //     id: "GD3",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD3,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Top,
        // },
        {
            id: "GD1_Name1901",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                            position: "relative",
                            bottom: 5,
                        }}
                    >
                        GD-1501
                    </div>
                ),
            },
            position: positions.GD1_Name1901,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD2_Name1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                            position: "relative",
                            bottom: 5,
                        }}
                    >
                        GD-1502
                    </div>
                ),
            },
            position: positions.GD2_Name1902,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Left,
        },
        // {
        //     id: "GD3_Name1903",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     fontSize: 20,
        //                     fontWeight: 500,
        //                     position: "relative",
        //                     bottom: 5,
        //                 }}
        //             >
        //                 GD-1903
        //             </div>
        //         ),
        //     },
        //     position: positions.GD3_Name1903,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },

        {
            id: "GD1_Value1901",
            data: {
                label: <div style={{}}> </div>,
            },
            position: positions.GD1_Value1901,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 130,
                height: 35,
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
                width: 130,
                height: 35,
            },
            targetPosition: Position.Bottom,
        },
        // {
        //     id: "GD3_Value1903",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     color: "green",
        //                     fontSize: 18,
        //                     fontWeight: 600,
        //                 }}
        //             >
        //                 {" "}
        //             </div>
        //         ),
        //     },
        //     position: positions.GD3_Value1903,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },

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
        // {
        //     id: "GD_none3",
        //     position: positions.GD_none3,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: {
        //         border: "#333333",
        //         background: colorIMG_none,
        //         width: 10,
        //         height: 1,
        //     },
        // },

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
                height: 220,
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

        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <AlarmOTSUKA />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                background: backgroundGraphic,
                border: "none",
                width: 200,
                borderRadius: 5,
            },
        },

        {
            id: "LineBall_1_1",
            position: positions.LineBall_1_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
            },
        },

        {
            id: "lineBall_13_1",
            position: positions.lineBall_13_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
            },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );
                if (id === "SDV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV: position,
                    }));
                } else if (id === "SDV_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_None: position,
                    }));
                } else if (id === "SDV_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG: position,
                    }));
                } else if (id === "SDV_Ball") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Ball: position,
                    }));
                }
                // ================================== end item ==================================

                // ============ line =========================
                else if (id === "line1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line1: position,
                    }));
                } else if (id === "line2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line2: position,
                    }));
                } else if (id === "line3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line3: position,
                    }));
                } else if (id === "line4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line4: position,
                    }));
                } else if (id === "line5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line5: position,
                    }));
                } else if (id === "line6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line6: position,
                    }));
                } else if (id === "line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line7: position,
                    }));
                } else if (id === "line8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line8: position,
                    }));
                } else if (id === "line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line9: position,
                    }));
                } else if (id === "line10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line10: position,
                    }));
                } else if (id === "line11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line11: position,
                    }));
                } else if (id === "line12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line12: position,
                    }));
                } else if (id === "line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line13: position,
                    }));
                }

                // ============ ball vavle ===========================
                else if (id === "BallValue01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue01: position,
                    }));
                } else if (id === "BallValue02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue02: position,
                    }));
                } else if (id === "BallValue03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue03: position,
                    }));
                } else if (id === "BallValue04") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue04: position,
                    }));
                } else if (id === "BallValue05") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue05: position,
                    }));
                } else if (id === "BallValue06") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue06: position,
                    }));
                } else if (id === "BallValue07") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue07: position,
                    }));
                } else if (id === "BallValue08") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue08: position,
                    }));
                } else if (id === "BallValue09") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue09: position,
                    }));
                } else if (id === "BallValue10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue10: position,
                    }));
                } else if (id === "BallValueFirst") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueFirst: position,
                    }));
                } else if (id === "BallValueLast") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueLast: position,
                    }));
                }
                // ============ ball vavle ===========================
                else if (id === "Tank") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank: position,
                    }));
                } else if (id === "Tank_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_None: position,
                    }));
                } else if (id === "Tank_Ball") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_Ball: position,
                    }));
                }
                // ============ PCV ===========================
                else if (id === "PCV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV01: position,
                    }));
                } else if (id === "PCV02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV02: position,
                    }));
                } else if (id === "PCV_NUM01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM01: position,
                    }));
                } else if (id === "PCV_NUM02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM02: position,
                    }));
                } else if (id === "PCV_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_none1: position,
                    }));
                } else if (id === "PCV_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_none2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1_none1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1_none2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2_none1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2_none2: position,
                    }));
                }

                // ============ FIQ ===========================
                else if (id === "FIQ_1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1901: position,
                    }));
                } else if (id === "FIQ_1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1902: position,
                    }));
                } else if (id === "FIQ_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none: position,
                    }));
                } else if (id === "FIQ_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none2: position,
                    }));
                } else if (id === "FIQ_none11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none11: position,
                    }));
                } else if (id === "FIQ_none22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none22: position,
                    }));
                }
                // ============ Ball center ===========================
                else if (id === "BallValueCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter: position,
                    }));
                } else if (id === "BallValueCenter_Check") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_Check: position,
                    }));
                } else if (id === "BallValueCenter_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_None: position,
                    }));
                } else if (id === "BallValueCenter_None2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_None2: position,
                    }));
                } else if (id === "BallValuePSV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValuePSV: position,
                    }));
                } else if (id === "BallValuePSVNone") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValuePSVNone: position,
                    }));
                } else if (id === "VavleWay") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VavleWay: position,
                    }));
                }
                // ========================= data ==========================
                else if (id === "data1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data1: position,
                    }));
                } else if (id === "data2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data2: position,
                    }));
                } else if (id === "data3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data3: position,
                    }));
                } else if (id === "data4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data4: position,
                    }));
                } else if (id === "data5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data5: position,
                    }));
                } else if (id === "data6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data6: position,
                    }));
                } else if (id === "data7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data7: position,
                    }));
                } else if (id === "data8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data8: position,
                    }));
                }
                // ========================= PSV ==========================
                else if (id === "PSV_01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_01: position,
                    }));
                } else if (id === "PSV_02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_02: position,
                    }));
                } else if (id === "PSV_03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_03: position,
                    }));
                } else if (id === "PSV_None01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None01: position,
                    }));
                } else if (id === "PSV_None02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None02: position,
                    }));
                } else if (id === "PSV_None03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None03: position,
                    }));
                } else if (id === "PSV_None04") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None04: position,
                    }));
                } else if (id === "PSV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01: position,
                    }));
                }
                //  ================ PT ===================
                else if (id === "Pressure_Trans01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans01: position,
                    }));
                } else if (id === "Pressure_Trans02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans02: position,
                    }));
                } else if (id === "Pressure_Trans03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans03: position,
                    }));
                } else if (id === "PT1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT1: position,
                    }));
                } else if (id === "PT2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT2: position,
                    }));
                } else if (id === "PT3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT3: position,
                    }));
                } else if (id === "PT_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none1: position,
                    }));
                } else if (id === "PT_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none2: position,
                    }));
                } else if (id === "PT_none3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none3: position,
                    }));
                } else if (id === "PT_col1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col1: position,
                    }));
                } else if (id === "PT_col2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col2: position,
                    }));
                } else if (id === "PT_col3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col3: position,
                    }));
                }

                // ================ TT =================
                else if (id === "Temperature_Trans01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_Trans01: position,
                    }));
                } else if (id === "Temperature_Trans02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_Trans02: position,
                    }));
                }
                // ============= header ===============
                else if (id === "Header") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Header: position,
                    }));
                } else if (id === "HELP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        HELP: position,
                    }));
                }
                // ============= Time Update ==================
                else if (id === "timeUpdate") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate: position,
                    }));
                } else if (id === "timeUpdate2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate2: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                }
                // ============= Connected ===================
                else if (id === "ConnectData") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ConnectData: position,
                    }));
                }
                // ============= Arrow ======================
                else if (id === "ArrowRight") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight: position,
                    }));
                } else if (id === "ArrowRight1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight1: position,
                    }));
                } else if (id === "Flow1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow1: position,
                    }));
                } else if (id === "Flow2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow2: position,
                    }));
                }
                // =========== PT ICONS1 ==================

                //================ GD ====================
                else if (id === "GD1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1: position,
                    }));
                } else if (id === "GD2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2: position,
                    }));
                } else if (id === "GD3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3: position,
                    }));
                } else if (id === "GD1_Name1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1_Name1901: position,
                    }));
                } else if (id === "GD2_Name1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2_Name1902: position,
                    }));
                } else if (id === "GD3_Name1903") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3_Name1903: position,
                    }));
                } else if (id === "GD1_Value1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1_Value1901: position,
                    }));
                } else if (id === "GD2_Value1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2_Value1902: position,
                    }));
                } else if (id === "GD3_Value1903") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3_Value1903: position,
                    }));
                } else if (id === "GD_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none1: position,
                    }));
                } else if (id === "GD_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none2: position,
                    }));
                } else if (id === "GD_none3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none3: position,
                    }));
                }
                // ===================== border white ==================
                else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                }
                // ==================== overlay ========================
                else if (id === "overlay_SmallVavle1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_SmallVavle1: position,
                    }));
                } else if (id === "overlay_SmallVavle2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_SmallVavle2: position,
                    }));
                }
                //========================== animation line =======================
                else if (id === "animation_line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line7: position,
                    }));
                } else if (id === "animation_line8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line8: position,
                    }));
                } else if (id === "animation_line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line9: position,
                    }));
                } else if (id === "animation_line10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line10: position,
                    }));
                } else if (id === "animation_line11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line11: position,
                    }));
                } else if (id === "animation_line12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line12: position,
                    }));
                } else if (id === "animation_line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line13: position,
                    }));
                } else if (id === "animation_line14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line14: position,
                    }));
                } else if (id === "animation_line15") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line15: position,
                    }));
                }
                //========================== T juntion icon  =======================
                else if (id === "T_juntion_11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        T_juntion_11: position,
                    }));
                } else if (id === "T_juntion_14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        T_juntion_14: position,
                    }));
                }
                //========================== AlarmCenter  =======================
                else if (id === "AlarmCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AlarmCenter: position,
                    }));
                } else if (id === "Line2_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE: position,
                    }));
                } else if (id === "Line2_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE1: position,
                    }));
                }

                //================================================================
                else if (id === "LineBall_1_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineBall_1_1: position,
                    }));
                } else if (id === "lineBall_13_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        lineBall_13_1: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    // useEffect(() => {
    //     localStorage.setItem("positionsDemo", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <audio ref={audioRef}>
                <source
                    src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <Button onClick={toggleEditing}>
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
