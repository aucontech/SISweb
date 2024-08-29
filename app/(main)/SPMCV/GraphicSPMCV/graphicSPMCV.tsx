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

import PCV_01_Otsuka from "../ReactFlow/PCV01_Otsuka";
import PCV_02_Otsuka from "../ReactFlow/PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import { id_SPMCV } from "../../data-table-device/ID-DEVICE/IdDevice";
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
import AlarmSPMCV from "@/layout/AlarmBell/AlarmSPMCV";
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
export const borderBox = "'white";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "yellow";

export default function GraphicSPMCV() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [fitViewEnabled, setFitViewEnabled] = useState(true);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [active, setActive] = useState();

    const handleFitView = () => {
        setFitViewEnabled(true);
    };
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const [data, setData] = useState<any[]>([]);

    const [
        EVC_01_Flow_at_Measurement_Condition,
        setEVC_01_Flow_at_Measurement_Condition,
    ] = useState<string | null>(null);
    const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] =
        useState<string | null>(null);
    const [
        EVC_01_Volume_at_Base_Condition,
        setEVC_01_Volume_at_Base_Condition,
    ] = useState<string | null>(null);
    const [
        EVC_01_Volume_at_Measurement_Condition,
        setEVC_01_Volume_at_Measurement_Condition,
    ] = useState<string | null>(null);

    const [GVF2, setGVF2] = useState<string | null>(null);
    const [SVF2, setSVF2] = useState<string | null>(null);
    const [SVA2, setSVA2] = useState<string | null>(null);
    const [GVA2, setGVA2] = useState<string | null>(null);

    const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
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
                    entityId: id_SPMCV,
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
                                id: id_SPMCV,
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

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Flow_at_Base_Condition:
                            setEVC_01_Flow_at_Base_Condition,
                        EVC_01_Flow_at_Measurement_Condition:
                            setEVC_01_Flow_at_Measurement_Condition,

                        EVC_01_Volume_at_Base_Condition:
                            setEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition:
                            setEVC_01_Volume_at_Measurement_Condition,
                        EVC_01_Pressure: setEVC_01_Pressure,

                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Flow_at_Measurement_Condition: setGVF2,

                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Volume_at_Measurement_Condition: setGVA2,

                        EVC_02_Pressure: setEVC_02_Pressure,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT1,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        EVC_01_Conn_STT: setEVC_01_Conn_STT,
                        EVC_02_Conn_STT: setEVC_02_Conn_STT,
                        PLC_Conn_STT: setPLC_STT,
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
                                .padStart(2, "0")} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate);
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

    const [EVC_01_Pressure_High, setEVC_01_Pressure_High] = useState<
        number | null
    >(null);
    const [EVC_01_Pressure_Low, setEVC_01_Pressure_Low] = useState<
        number | null
    >(null);
    const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC_01_Pressure, setmaintainEVC_01_Pressure] =
        useState<boolean>(false);

    useEffect(() => {
        const EVC_01_PressureValue = parseFloat(EVC_01_Pressure as any);
        const highValue = EVC_01_Pressure_High ?? NaN;
        const lowValue = EVC_01_Pressure_Low ?? NaN;

        if (
            !isNaN(EVC_01_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Pressure
        ) {
            setExceedThreshold(
                EVC_01_PressureValue >= highValue ||
                    EVC_01_PressureValue <= lowValue
            );
        }
    }, [
        EVC_01_Pressure,
        EVC_01_Pressure_High,
        EVC_01_Pressure_Low,
        maintainEVC_01_Pressure,
    ]);

    //================================ PT 1903======================================================
    const [PT1_High, setPT1_High] = useState<number | null>(null);
    const [PT1_Low, setPT1_Low] = useState<number | null>(null);
    const [exceedThresholdPT1, setExceedThresholdPT1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT1, setMaintainPT1] = useState<boolean>(false);

    useEffect(() => {
        const PT1Value = parseFloat(PT1 as any);
        const highValue = PT1_High ?? NaN;
        const lowValue = PT1_Low ?? NaN;

        if (
            !isNaN(PT1Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT1
        ) {
            setExceedThresholdPT1(
                PT1Value >= highValue || PT1Value <= lowValue
            );
        }
    }, [PT1, PT1_High, PT1_Low, maintainPT1]);

    //================================ GD 1901 ======================================================
    const [GD1_High, setGD1_High] = useState<number | null>(null);
    const [GD1_Low, setGD1_Low] = useState<number | null>(null);
    const [exceedThresholdGD1, setexceedThresholdGD1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainGD1, setmaintainGD1] = useState<boolean>(false);

    useEffect(() => {
        const GD1Value = parseFloat(GD1 as any);
        const highValue = GD1_High ?? NaN;
        const lowValue = GD1_Low ?? NaN;

        if (
            !isNaN(GD1Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD1
        ) {
            setexceedThresholdGD1(
                GD1Value >= highValue || GD1Value <= lowValue
            );
        }
    }, [GD1, GD1_High, GD1_Low, maintainGD1]);

    //================================ GD 1902 ======================================================
    const [GD2_High, setGD2_High] = useState<number | null>(null);
    const [GD2_Low, setGD2_Low] = useState<number | null>(null);
    const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainGD2, setMaintainGD2] = useState<boolean>(false);

    useEffect(() => {
        const GD2Value = parseFloat(GD2 as any);
        const highValue = GD2_High ?? NaN;
        const lowValue = GD2_Low ?? NaN;

        if (
            !isNaN(GD2Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD2
        ) {
            setExceedThresholdGD2(
                GD2Value >= highValue || GD2Value <= lowValue
            );
        }
    }, [GD2, GD2_High, GD2_Low, maintainGD2]);
    //================================ GD 1902 ======================================================

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Flow_at_Base_Condition_High,
        setEVC_01_Flow_at_Base_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_01_Flow_at_Base_Condition_Low,
        setEVC_01_Flow_at_Base_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Flow_at_Base_Condition,
        setExceedThresholdEVC_01_Flow_at_Base_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainEVC_01_Flow_at_Base_Condition,
        setMaintainEVC_01_Flow_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_01_Flow_at_Base_ConditionValue = parseFloat(
            EVC_01_Flow_at_Base_Condition as any
        );
        const highValue = EVC_01_Flow_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_01_Flow_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Flow_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Flow_at_Base_Condition
        ) {
            setExceedThresholdEVC_01_Flow_at_Base_Condition(
                EVC_01_Flow_at_Base_ConditionValue >= highValue ||
                    EVC_01_Flow_at_Base_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_01_Flow_at_Base_Condition,
        EVC_01_Flow_at_Base_Condition_High,
        EVC_01_Flow_at_Base_Condition_Low,
        maintainEVC_01_Flow_at_Base_Condition,
    ]);

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Flow_at_Measurement_Condition_High,
        setEVC_01_Flow_at_Measurement_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_01_Flow_at_Measurement_Condition_Low,
        setEVC_01_Flow_at_Measurement_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Flow_at_Measurement_Condition,
        setExceedThresholdEVC_01_Flow_at_Measurement_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainEVC_01_Flow_at_Measurement_Condition,
        setMaintainEVC_01_Flow_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(
            EVC_01_Flow_at_Measurement_Condition as any
        );
        const highValue = EVC_01_Flow_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_01_Flow_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Flow_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Flow_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_01_Flow_at_Measurement_Condition(
                EVC_01_Flow_at_Measurement_ConditionValue >= highValue ||
                    EVC_01_Flow_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_01_Flow_at_Measurement_Condition,
        EVC_01_Flow_at_Measurement_Condition_High,
        EVC_01_Flow_at_Measurement_Condition_Low,
        maintainEVC_01_Flow_at_Measurement_Condition,
    ]);

    //================================ EVC_01_Flow_at_Measurement_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Volume_at_Base_Condition_High,
        setEVC_01_Volume_at_Base_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_01_Volume_at_Base_Condition_Low,
        setEVC_01_Volume_at_Base_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Volume_at_Base_Condition,
        setExceedThresholdEVC_01_Volume_at_Base_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainEVC_01_Volume_at_Base_Condition,
        setMaintainEVC_01_Volume_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_01_Volume_at_Base_ConditionValue = parseFloat(
            EVC_01_Volume_at_Base_Condition as any
        );
        const highValue = EVC_01_Volume_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_01_Volume_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Volume_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Volume_at_Base_Condition
        ) {
            setExceedThresholdEVC_01_Volume_at_Base_Condition(
                EVC_01_Volume_at_Base_ConditionValue >= highValue ||
                    EVC_01_Volume_at_Base_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_01_Volume_at_Base_Condition,
        EVC_01_Volume_at_Base_Condition_High,
        EVC_01_Volume_at_Base_Condition_Low,
        maintainEVC_01_Volume_at_Base_Condition,
    ]);

    //================================ EVC_01_Volume_at_Base_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Volume_at_Measurement_Condition_High,
        setEVC_01_Volume_at_Measurement_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_01_Volume_at_Measurement_Condition_Low,
        setEVC_01_Volume_at_Measurement_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Volume_at_Measurement_Condition,
        setExceedThresholdEVC_01_Volume_at_Measurement_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainEVC_01_Volume_at_Measurement_Condition,
        setMaintainEVC_01_Volume_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(
            EVC_01_Volume_at_Measurement_Condition as any
        );
        const highValue = EVC_01_Volume_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_01_Volume_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Volume_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Volume_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_01_Volume_at_Measurement_Condition(
                EVC_01_Volume_at_Measurement_ConditionValue >= highValue ||
                    EVC_01_Volume_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_01_Volume_at_Measurement_Condition,
        EVC_01_Volume_at_Measurement_Condition_High,
        EVC_01_Volume_at_Measurement_Condition_Low,
        maintainEVC_01_Volume_at_Measurement_Condition,
    ]);

    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================

    const [lineDuty1901, setLineduty1901] = useState<boolean>(false);
    const [lineDuty1902, setLineduty1902] = useState<boolean>(true);

    const ChangeStatusFIQ = async () => {
        try {
            const newValue1 = !lineDuty1901;
            const newValue2 = !lineDuty1902;

            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SPMCV}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_SPMCV}/values/attributes/SERVER_SCOPE`
            );

            const highEVCPressureItem = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_High"
            );
            setEVC_01_Pressure_High(highEVCPressureItem?.value || null);
            const lowEVCPressureItem = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Low"
            );
            setEVC_01_Pressure_Low(lowEVCPressureItem?.value || null);

            const PT1_High = res.data.find(
                (item: any) => item.key === "PT1_High"
            );
            setPT1_High(PT1_High?.value || null);
            const PT1_Low = res.data.find(
                (item: any) => item.key === "PT1_Low"
            );
            setPT1_Low(PT1_Low?.value || null);

            const GD1_High = res.data.find(
                (item: any) => item.key === "GD1_High"
            );
            setGD1_High(GD1_High?.value || null);

            const GD1_Low = res.data.find(
                (item: any) => item.key === "GD1_Low"
            );
            setGD1_Low(GD1_Low?.value || null);

            const GD2_High = res.data.find(
                (item: any) => item.key === "GD2_High"
            );
            setGD2_High(GD2_High?.value || null);

            const GD2_Low = res.data.find(
                (item: any) => item.key === "GD2_Low"
            );
            setGD2_Low(GD2_Low?.value || null);

            const EVC_01_Flow_at_Base_Condition_High = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_High"
            );
            setEVC_01_Flow_at_Base_Condition_High(
                EVC_01_Flow_at_Base_Condition_High?.value || null
            );

            const EVC_01_Flow_at_Base_Condition_Low = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Low"
            );
            setEVC_01_Flow_at_Base_Condition_Low(
                EVC_01_Flow_at_Base_Condition_Low?.value || null
            );

            const EVC_01_Flow_at_Measurement_Condition_High = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High"
            );
            setEVC_01_Flow_at_Measurement_Condition_High(
                EVC_01_Flow_at_Measurement_Condition_High?.value || null
            );

            const EVC_01_Flow_at_Measurement_Condition_Low = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low"
            );
            setEVC_01_Flow_at_Measurement_Condition_Low(
                EVC_01_Flow_at_Measurement_Condition_Low?.value || null
            );

            const EVC_01_Volume_at_Base_Condition_High = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_High"
            );
            setEVC_01_Volume_at_Base_Condition_High(
                EVC_01_Volume_at_Base_Condition_High?.value || null
            );

            const EVC_01_Volume_at_Base_Condition_Low = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Low"
            );
            setEVC_01_Volume_at_Base_Condition_Low(
                EVC_01_Volume_at_Base_Condition_Low?.value || null
            );

            const EVC_01_Volume_at_Measurement_Condition_High = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_High"
            );
            setEVC_01_Volume_at_Measurement_Condition_High(
                EVC_01_Volume_at_Measurement_Condition_High?.value || null
            );

            const EVC_01_Volume_at_Measurement_Condition_Low = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_Low"
            );
            setEVC_01_Volume_at_Measurement_Condition_Low(
                EVC_01_Volume_at_Measurement_Condition_Low?.value || null
            );

            const maintainEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );
            setmaintainEVC_01_Pressure(maintainEVC_01_Pressure?.value || false);

            const maintainPT1 = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );
            setMaintainPT1(maintainPT1?.value || false);

            const maintainGD1 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setmaintainGD1(maintainGD1?.value || false);

            const maintainGD2 = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD2(maintainGD2?.value || false);

            const MaintainGVF_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_01_Flow_at_Measurement_Condition(
                MaintainGVF_1?.value || false
            );

            const MaintainSVA_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setMaintainEVC_01_Volume_at_Base_Condition(
                MaintainSVA_1?.value || false
            );

            const MaintainGVA_1 = res.data.find(
                (item: any) =>
                    item.key ===
                    "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_01_Volume_at_Measurement_Condition(
                MaintainGVA_1?.value || false
            );

            const MaintainSVF_1 = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Base_Condition_Maintain"
            );
            setMaintainEVC_01_Flow_at_Base_Condition(
                MaintainSVF_1?.value || false
            );
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
        PT_1901: "PT-1701",
        PT_1902: "PT-1702",
        PT_1903: "PT-1703",

        TT: "TT",
    };

    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "BarA",
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
            if (node.id === "EVC_01_Flow_at_Base_Condition") {
                const roundedEVC_01_Flow_at_Base_Condition =
                    EVC_01_Flow_at_Base_Condition !== null
                        ? parseFloat(EVC_01_Flow_at_Base_Condition).toFixed(2)
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_01_Flow_at_Base_Condition &&
                                        !maintainEVC_01_Flow_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Flow_at_Base_Condition
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
                                        {roundedEVC_01_Flow_at_Base_Condition}
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
            if (node.id === "EVC_01_Flow_at_Measurement_Condition") {
                const roundedEVC_01_Flow_at_Measurement_Condition =
                    EVC_01_Flow_at_Measurement_Condition !== null
                        ? parseFloat(
                              EVC_01_Flow_at_Measurement_Condition
                          ).toFixed(2)
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_01_Flow_at_Measurement_Condition &&
                                        !maintainEVC_01_Flow_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Flow_at_Measurement_Condition
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
                                        {
                                            roundedEVC_01_Flow_at_Measurement_Condition
                                        }
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
            if (node.id === "EVC_01_Volume_at_Base_Condition") {
                const roundedEVC_01_Volume_at_Base_Condition =
                    EVC_01_Volume_at_Base_Condition !== null
                        ? parseFloat(EVC_01_Volume_at_Base_Condition).toFixed(2)
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_01_Volume_at_Base_Condition &&
                                        !maintainEVC_01_Volume_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Volume_at_Base_Condition
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
                                        {roundedEVC_01_Volume_at_Base_Condition}
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
            if (node.id === "EVC_01_Volume_at_Measurement_Condition") {
                const roundedEVC_01_Volume_at_Measurement_Condition =
                    EVC_01_Volume_at_Measurement_Condition !== null
                        ? parseFloat(
                              EVC_01_Volume_at_Measurement_Condition
                          ).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    background:
                                        exceedThresholdEVC_01_Volume_at_Measurement_Condition &&
                                        !maintainEVC_01_Volume_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Volume_at_Measurement_Condition
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
                                        {
                                            roundedEVC_01_Volume_at_Measurement_Condition
                                        }
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
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
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
                                        {/* {roundedSVF2} */}
                                        Not used
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
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
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
                                        {/* {roundedGVF2} */}
                                        Not used
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
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
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
                                        {/* {roundedSVA2} */}
                                        Not used
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
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
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
                                        {/* {roundedGVA2} */}
                                        Not used
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
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT1 && !maintainPT1
                                            ? "#ff5656"
                                            : maintainPT1
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
                                        {ValueGas.PT_1903}:
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
                const roundedEVC_01_Pressure =
                    EVC_01_Pressure !== null
                        ? parseFloat(EVC_01_Pressure).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThreshold &&
                                        !maintainEVC_01_Pressure
                                            ? "#ff5656"
                                            : maintainEVC_01_Pressure
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
                                        {ValueGas.PT_1901}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedEVC_01_Pressure}
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
                const roundedEVC_02_Pressure =
                    EVC_02_Pressure !== null
                        ? parseFloat(EVC_02_Pressure).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
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
                                        Not used
                                    </p>
                                </div>
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
                                    fontSize: 25,
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
                                        Gateway{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        PLC{" "}
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        EVC 01{" "}
                                    </p>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 10 }}>
                                        {active === "true" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Online
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Offline
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
                                        {EVC_01_Conn_STT === "1" ? (
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
                                        }}
                                    >
                                        {PLC_Conn_STT}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    ></p>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    ></p>
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
                                        exceedThresholdGD1 && !maintainGD1
                                            ? "#ff5656"
                                            : maintainGD1
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1901()}
                            >
                                <p>{roundedGD01} %LEL</p>
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
                                        exceedThresholdGD2 && !maintainGD2
                                            ? "#ff5656"
                                            : maintainGD2
                                            ? "orange"
                                            : "transparent",

                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1902()}
                            >
                                <p>{roundedGD02} %LEL</p>
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,

                                    right: 4,
                                }}
                                // onClick={() => confirmGD_1903()}
                            >
                                <p>{roundedGD03} %LEL</p>
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
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1701
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
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FIQ-1702
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

    // const storedPositionString = localStorage.getItem("positionsSPMCV");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
              AlarmCenter: { x: 283.59624370081974, y: 372.1544066615297 },
              ArrowRight: { x: 407.4256642678949, y: 1019.0985886548262 },
              ArrowRight1: { x: -1377.765238350283, y: 1029.2839122667642 },
              BallValue01: { x: -1108.440790541049, y: 1131.119650683875 },
              BallValue02: { x: -941.3988306125451, y: 1132.519440708925 },
              BallValue03: { x: -774.8687072979039, y: 894.71316658712 },
              BallValue04: { x: -774.5658025383268, y: 1135.4678560265843 },
              BallValue05: { x: -507.1682385592361, y: 894.2425590876456 },
              BallValue06: { x: -503.7128349152163, y: 1136.0091043258865 },
              BallValue07: { x: -391.21326336183927, y: 814.8244470890327 },
              BallValue08: { x: 50.570087938376275, y: 814.4837375610233 },
              BallValue09: { x: -390.7347918738091, y: 1204.6166524541484 },
              BallValue10: { x: 45.36832776035493, y: 1204.8259588420058 },
              BallValueCenter: {
                  x: -167.30710887361258,
                  y: 1007.8595594996316,
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
                  x: -136.78263324371193,
                  y: 1039.1243048935844,
              },
              BallValueFirst: { x: 325.65262421132076, y: 1005.5430441067174 },
              BallValueLast: { x: -1321.6123824708486, y: 1014.0668924353204 },
              BallValuePSV: { x: 203.67357075539667, y: 959.1191332071851 },
              BallValuePSVNone: { x: 223.62015442173225, y: 974.0164290314665 },
              ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
              EVC_01_Flow_at_Base_Condition: {
                  x: -376.97542980491426,
                  y: 417.24652675562265,
              },
              EVC_01_Flow_at_Measurement_Condition: {
                  x: -377.2199453794234,
                  y: 497.87274583044757,
              },
              EVC_01_Temperature: {
                  x: -1397.4430569167453,
                  y: 1160.0348765205,
              },
              EVC_01_Volume_at_Base_Condition: {
                  x: -376.7902338698629,
                  y: 578.7562142826833,
              },
              EVC_01_Volume_at_Measurement_Condition: {
                  x: -376.5135698793857,
                  y: 659.5115253024958,
              },
              EVC_02_Temperature: {
                  x: -508.4032164626999,
                  y: 1502.617581291104,
              },
              FIQ_1901: { x: -376.7990973971664, y: 361.591656819135 },
              FIQ_1902: { x: -378.87479945539656, y: 1289.7747070359603 },
              FIQ_none: { x: -216.373913367841, y: 798.1456910291513 },
              FIQ_none2: { x: -219.38711961000132, y: 1187.2683013135133 },
              FIQ_none11: { x: -187.27078106781747, y: 837.68091951101 },
              FIQ_none22: { x: -189.44080519906746, y: 1231.3610095531735 },
              Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
              Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
              FullScreen: { x: 359.3312960971492, y: 1036.9713896720348 },
              GD1: { x: -706.3301306692865, y: 1034.6537686321053 },
              GD1_Name1901: { x: -735.9500671990377, y: 963.4268072979715 },
              GD1_Value1901: { x: -735.7622248938596, y: 998.7992472458197 },
              GD2: { x: -340.2800293943576, y: 1036.2021439643406 },
              GD2_Name1902: { x: -369.7973952262454, y: 962.8403828448106 },
              GD2_Value1902: { x: -369.7416469139345, y: 997.1904549653616 },
              GD3: { x: 13.374675095116203, y: 1037.243511740587 },
              GD3_Name1903: { x: -16.079104275602333, y: 963.1634625787311 },
              GD3_Value1903: { x: -16.401337483820626, y: 998.7295202130439 },
              GD_none1: { x: -680.8408824721303, y: 1053.7496989003014 },
              GD_none2: { x: -314.7114440042691, y: 1057.0316583224167 },
              GD_none3: { x: 38.597337515296346, y: 1056.6594300401225 },
              HELP: { x: 750.7851455025582, y: 336.66019515746984 },
              Header: { x: -1238.0252315688263, y: 405.3003492753461 },
              Line2_NONE: { x: -884.3336203769039, y: 1046.3496174211396 },
              Line2_NONE1: { x: -779.4885863058424, y: 1046.3496174211396 },
              LineBall_1_1: { x: -1372.5317402818896, y: 1045.9869361614612 },
              PCV01: { x: -689.7970151337088, y: 879.00632918006 },
              PCV02: { x: -692.1078758499317, y: 1120.7254019726813 },
              PCV_NUM01: { x: -753.1197637959665, y: 828.7379359721325 },
              PCV_NUM02: { x: -754.9807048889562, y: 1181.3618221440458 },
              PCV_ballVavle_Small1: {
                  x: -597.4113415337335,
                  y: 882.8095517403245,
              },
              PCV_ballVavle_Small1_none1: {
                  x: -665.0629396476888,
                  y: 902.0359579483519,
              },
              PCV_ballVavle_Small1_none2: {
                  x: -667.1691720404733,
                  y: 1141.0987492112777,
              },
              PCV_ballVavle_Small2: {
                  x: -597.5196697396369,
                  y: 1124.7706207942995,
              },
              PCV_ballVavle_Small2_none1: {
                  x: -591.5512215024908,
                  y: 932.0283184188106,
              },
              PCV_ballVavle_Small2_none2: {
                  x: -591.3659180111881,
                  y: 1172.918606583641,
              },
              PCV_none1: { x: -660.6947202927415, y: 923.80189117024 },
              PCV_none2: { x: -661.9127246926923, y: 1165.3911488680144 },
              PSV01: { x: 207.11185760127665, y: 811.0400447211364 },
              PSV_01: { x: 200.98653008354864, y: 895.8399919722908 },
              PSV_02: { x: 180.98895788876345, y: 876.1112955712117 },
              PSV_03: { x: 173.24045238769793, y: 808.8513210996118 },
              PSV_None01: { x: 257.0621581962799, y: 1036.7984512500655 },
              PSV_None02: { x: 222.36692812908956, y: 920.8510001440285 },
              PSV_None03: { x: 199.8008032630833, y: 898.0000593013505 },
              PSV_None04: { x: 196.9168269507448, y: 827.4266363399756 },
              PT1: { x: -1248.552773720958, y: 969.1291015417314 },
              PT2: { x: -0.8878436466131916, y: 1153.060016586797 },
              PT3: { x: -1.361413707790149, y: 762.4414610609027 },
              PT_col1: { x: -1216.2184970277972, y: 1031.4628364925754 },
              PT_col2: { x: 31.255842776130976, y: 825.1751567166594 },
              PT_col3: { x: 31.542019688165198, y: 1216.1843897830795 },
              PT_none1: { x: -1215.33217151093, y: 1005.9301182806702 },
              PT_none2: { x: 30.727111036710014, y: 792.2682647427301 },
              PT_none3: { x: 30.869967141627455, y: 1184.3070444322354 },
              PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
              PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
              Pressure_Trans01: { x: -1370.178598844617, y: 809.4634279335849 },
              Pressure_Trans02: { x: 115.09741172932343, y: 656.4198989710571 },
              Pressure_Trans03: { x: 116.12349758016171, y: 1288.418537187422 },
              SDV: { x: -1140.086396422953, y: 946.7196538271689 },
              SDV_Ball: { x: -1091.1806472239737, y: 1162.1857429302347 },
              SDV_IMG: { x: -1115.4963861998212, y: 994.274284574213 },
              SDV_Name_none: { x: -1249.6461839977737, y: 902.8410000476873 },
              SDV_None: { x: -1089.720700971003, y: 1046.083325698294 },
              T_juntion_11: { x: -71.03198916443257, y: 826.6284580114444 },
              T_juntion_14: { x: -289.03721709708736, y: 1184.5034182177258 },
              Tank: { x: -961.1373095989246, y: 977.5992617936554 },
              Tank_Ball: { x: -923.9708216841641, y: 1163.4131295204752 },
              Tank_None: { x: -933.6419103358979, y: 1047.4663129728283 },
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
              animation_line8: { x: 64.61285378247803, y: 845.7339111102631 },
              animation_line9: {
                  x: -367.83294526673615,
                  y: 1235.2489576729074,
              },
              animation_line10: { x: 58.79445151290554, y: 1235.4134977535994 },
              animation_line11: { x: -35.76111225621217, y: 845.5377293237694 },
              animation_line12: {
                  x: -134.7992075354374,
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
              borderWhite: { x: -1370.4376313140192, y: 389.9536467433811 },
              data5: { x: -378.8925103452375, y: 1345.6321747105403 },
              data6: { x: -378.5744303511996, y: 1426.4830888584006 },
              data7: { x: -378.13724965362826, y: 1507.423813422966 },
              data8: { x: -377.54215501476085, y: 1588.4049539814343 },
              line1: { x: -1304.5570414051474, y: 1045.8299743897232 },
              line2: { x: -842.576582460349, y: 1046.3496174211396 },
              line3: { x: -757.3073258645178, y: 924.8718460504479 },
              line4: { x: -757.4999146099806, y: 1165.8382016355595 },
              line5: { x: -486.4746346347322, y: 1165.7762026567975 },
              line6: { x: -489.7046768331517, y: 924.8292697197214 },
              line7: { x: -431.12640487944697, y: 1040.1356866297433 },
              line8: { x: -374.1947990352617, y: 845.1255935069244 },
              line9: { x: -373.5456900377612, y: 1234.7053320346292 },
              line10: { x: 62.71542285024981, y: 845.1457838268836 },
              line11: { x: 62.86985056843554, y: 1234.683954724923 },
              line12: { x: 93.14663849995844, y: 1035.9323508670827 },
              line13: { x: 343.3312960971492, y: 1036.9713896720348 },
              lineBall_13_1: { x: 429.8312960971493, y: 1036.9713896720348 },
              overlay_SmallVavle1: {
                  x: -863.2358516386571,
                  y: 1208.6706191298017,
              },
              overlay_SmallVavle2: {
                  x: -434.80044580641925,
                  y: 1046.4815751188462,
              },
              overlay_line7: { x: -582.1247334784416, y: 1178.3156819743556 },
              overlay_line13: { x: 129.352809676908, y: 1033.9170911378842 },
              timeUpdate3: { x: -1324.5654610976844, y: 503.3924695552174 },
          };
    const [positions, setPositions] = useState(initialPositions);

    const lineColor = "yellow";

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
                stroke:
                    isAnimated07 && !isAnimatedCenter ? "orange" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 10, // Thêm điều kiện ở đây
                stroke:
                    isAnimated09 && !isAnimatedCenter ? "orange" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 10,
                stroke: isAnimatedCenter ? "orange" : lineColor,
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
                background: 'none',
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
                        SDV-1701
                    </div>
                ),
            },
            position: positions.SDV,

            style: {
                color: "white",
                background: "green",
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
                border: "yellow",
                background: "yellow",
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
                background: "none",
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
                border: "none",
                width: 260,
                background: "none",
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
                border: "none",
                width: 260,
                background: "none",
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
                            fontWeight: 600,
                        }}
                        onClick={confirmLineDuty}
                    >
                        FIQ-1701
                        {lineDuty1901 && <span>1901</span>}
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 400,
                height: 55,
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
                            fontWeight: 600,
                        }}
                        onClick={confirmLineDuty}
                    >
                        FIQ-1702
                        {lineDuty1902 && <span>1902</span>}
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 400,
                height: 55,
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
            id: "EVC_01_Volume_at_Measurement_Condition",
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
            position: positions.EVC_01_Volume_at_Measurement_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 400,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_01_Volume_at_Base_Condition",
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
            position: positions.EVC_01_Volume_at_Base_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 400,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_01_Flow_at_Measurement_Condition",
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

            position: positions.EVC_01_Flow_at_Measurement_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 400,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_01_Flow_at_Base_Condition",
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

            position: positions.EVC_01_Flow_at_Base_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 400,
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
                width: 400,
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
                width: 400,
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
                width: 400,
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
                width: 400,
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
                border: "none",
                width: 260,
                background: "none",
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
                width: 330,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
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
                            fontSize: 22,
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
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Left,
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
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Left,
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
                height: 25,

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
                height: 25,

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
                height: 25,

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
                                    color: "orange",
                                }}
                            >
                                SPMCV
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
                                    fontWeight: 600,
                                    color: "yellow",
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
                width: 500,

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
                        GD-1701
                    </div>
                ),
            },
            position: positions.GD1_Name1901,

            style: {
                color: "white",
                background: "green",
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
                        GD-1702
                    </div>
                ),
            },
            position: positions.GD2_Name1902,

            style: {
                color: "white",
                background: "green",
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
        //                 GD-1703
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
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    ></div>
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
        //                     fontSize: 22,
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
                width: 580,
                height: 320,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },
        // =================== overlay =================================

        //============================ T_JUNTION ==========================

        // {
        //     id: "T_juntion_11",
        //     position: positions.T_juntion_11,
        //     type: "custom",
        //     data: {
        //         label: <div>{juntionBottom}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },

        // {
        //     id: "T_juntion_14",
        //     position: positions.T_juntion_14,
        //     type: "custom",
        //     data: {
        //         label: <div>{juntionTop}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },

        //===============================  Alarm center ===========================

        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <AlarmSPMCV />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                background: backgroundGraphic,
                border: "none",
                width: 0,
                borderRadius: 5,
            },
        },

        //==================================================================

        {
            id: "Line2_NONE",
            position: positions.Line2_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
            },
        },
        {
            id: "Line2_NONE1",
            position: positions.Line2_NONE1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
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
                else if (id === "EVC_01_Volume_at_Measurement_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Volume_at_Measurement_Condition: position,
                    }));
                } else if (id === "EVC_01_Volume_at_Base_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Volume_at_Base_Condition: position,
                    }));
                } else if (id === "EVC_01_Flow_at_Measurement_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Flow_at_Measurement_Condition: position,
                    }));
                } else if (id === "EVC_01_Flow_at_Base_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Flow_at_Base_Condition: position,
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
                } else if (id === "FullScreen") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FullScreen: position,
                    }));
                }

                //=============================================================
                else if (id === "Line2_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE: position,
                    }));
                } else if (id === "Line2_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE1: position,
                    }));
                } else if (id === "LineBall_1_1") {
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

    // const toggleEditing = () => {
    //     setEditingEnabled(!editingEnabled);
    // };
    // useEffect(() => {
    //     localStorage.setItem("positionsSPMCV", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
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
                    fontWeight: 600,
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
                    minZoom={0.3}
                    maxZoom={3}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
