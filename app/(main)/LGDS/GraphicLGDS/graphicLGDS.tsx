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
import { id_OTSUKA, id_LGDS } from "../../data-table-device/ID-DEVICE/IdDevice";
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
import BallVavleSDV_TOP from "../ReactFlow/BallVavleSDV_TOP";
import BallVavleSDV_TOP1 from "../ReactFlow/BallVavleSDV_TOP";
import BallVavleSDV_BOTTOM1 from "../ReactFlow/BallVavleSDV_BOTTOM";
import AlarmLGDS from "@/layout/AlarmBell/AlarmLGDS";
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
export const borderBox = "white";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "yellow";

export default function GraphicLGDS() {
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

    const [GD3, SetGD3] = useState<string | null>(null);

    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);

    const [FC_Conn_STT, setFC_Conn_STT] = useState<string | null>(null);
    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STT, setConn_STT] = useState<string | null>(null);
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);

    const toast = useRef<Toast>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_LGDS,
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
                                id: id_LGDS,
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
                        FC_01_Current_Values_Flow_Rate:
                            setFC_01_Current_Values_Flow_Rate,
                        FC_01_Current_Values_Uncorrected_Flow_Rate:
                            setFC_01_Current_Values_Uncorrected_Flow_Rate,

                        FC_01_Accumulated_Values_Volume:
                            setFC_01_Accumulated_Values_Volume,
                        FC_01_Accumulated_Values_Uncorrected_Volume:
                            setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Current_Values_Static_Pressure:
                            setFC_01_Current_Values_Static_Pressure,

                        FC_02_Current_Values_Flow_Rate:
                            setFC_02_Current_Values_Flow_Rate,
                        FC_02_Current_Values_Uncorrected_Flow_Rate:
                            setFC_02_Current_Values_Uncorrected_Flow_Rate,
                        FC_02_Accumulated_Values_Volume:
                            setFC_02_Accumulated_Values_Volume,
                        FC_02_Accumulated_Values_Uncorrected_Volume:
                            setFC_02_Accumulated_Values_Uncorrected_Volume,

                        FC_02_Current_Values_Static_Pressure:
                            setFC_02_Current_Values_Static_Pressure,

                        GD1: setGD1,
                        GD2: setGD2,
                        GD3: SetGD3,

                        PT1: setPT1,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        FC_Conn_STT: setFC_Conn_STT,
                        PLC_Conn_STT: setConn_STT,

                        time: setTimeUpdate,
                    };

                    const valueStateMap: ValueStateMap = {
                        FC_Conn_STT: setFC_Conn_STTValue,
                        PLC_Conn_STT: setConn_STTValue,
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
    const [
        FC_01_Current_Values_Static_Pressure,
        setFC_01_Current_Values_Static_Pressure,
    ] = useState<string | null>(null);

    const [
        FC_01_Current_Values_Static_Pressure_High,
        setFC_01_Current_Values_Static_Pressure_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Static_Pressure_Low,
        setFC_01_Current_Values_Static_Pressure_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Static_Pressure,
        setExceedThresholdFC_01_Current_Values_Static_Pressure,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Static_Pressure,
        setMaintainFC_01_Current_Values_Static_Pressure,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Static_PressureValue = parseFloat(
            FC_01_Current_Values_Static_Pressure as any
        );
        const highValue = FC_01_Current_Values_Static_Pressure_High ?? NaN;
        const lowValue = FC_01_Current_Values_Static_Pressure_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Static_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Static_Pressure
        ) {
            setExceedThresholdFC_01_Current_Values_Static_Pressure(
                FC_01_Current_Values_Static_PressureValue >= highValue ||
                    FC_01_Current_Values_Static_PressureValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Static_Pressure,
        FC_01_Current_Values_Static_Pressure_High,
        FC_01_Current_Values_Static_Pressure_Low,
        maintainFC_01_Current_Values_Static_Pressure,
    ]);

    //================================ PT 1902======================================================
    const [
        FC_02_Current_Values_Static_Pressure,
        setFC_02_Current_Values_Static_Pressure,
    ] = useState<string | null>(null);

    const [
        FC_02_Current_Values_Static_Pressure_High,
        setFC_02_Current_Values_Static_Pressure_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Static_Pressure_Low,
        setFC_02_Current_Values_Static_Pressure_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Static_Pressure,
        setExceedThresholdFC_02_Current_Values_Static_Pressure,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Static_Pressure,
        setMaintainFC_02_Current_Values_Static_Pressure,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Static_PressureValue = parseFloat(
            FC_02_Current_Values_Static_Pressure as any
        );
        const highValue = FC_02_Current_Values_Static_Pressure_High ?? NaN;
        const lowValue = FC_02_Current_Values_Static_Pressure_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Static_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Static_Pressure
        ) {
            setExceedThresholdFC_02_Current_Values_Static_Pressure(
                FC_02_Current_Values_Static_PressureValue >= highValue ||
                    FC_02_Current_Values_Static_PressureValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Static_Pressure,
        FC_02_Current_Values_Static_Pressure_High,
        FC_02_Current_Values_Static_Pressure_Low,
        maintainFC_02_Current_Values_Static_Pressure,
    ]);

    //================================ PT 1903======================================================
    const [PT1, setPT1] = useState<string | null>(null);

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
    const [GD1, setGD1] = useState<string | null>(null);

    const [GD1_High, setGD1_High] = useState<number | null>(null);
    const [GD1_Low, setGD1_Low] = useState<number | null>(null);
    const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainGD1, setMaintainGD1] = useState<boolean>(false);

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
            setExceedThresholdGD1(
                GD1Value >= highValue || GD1Value <= lowValue
            );
        }
    }, [GD1, GD1_High, GD1_Low, maintainGD1]);

    //================================ GD 1901 ======================================================

    const [GD2, setGD2] = useState<string | null>(null);

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

    const [FC_01_Current_Values_Flow_Rate, setFC_01_Current_Values_Flow_Rate] =
        useState<string | null>(null);

    const [
        FC_01_Current_Values_Flow_Rate_High,
        setFC_01_Current_Values_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Flow_Rate_Low,
        setFC_01_Current_Values_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Flow_Rate,
        setExceedThresholdFC_01_Current_Values_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Flow_Rate,
        setMaintainFC_01_Current_Values_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Flow_RateValue = parseFloat(
            FC_01_Current_Values_Flow_Rate as any
        );
        const highValue = FC_01_Current_Values_Flow_Rate_High ?? NaN;
        const lowValue = FC_01_Current_Values_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Flow_Rate
        ) {
            setExceedThresholdFC_01_Current_Values_Flow_Rate(
                FC_01_Current_Values_Flow_RateValue >= highValue ||
                    FC_01_Current_Values_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Flow_Rate,
        FC_01_Current_Values_Flow_Rate_High,
        FC_01_Current_Values_Flow_Rate_Low,
        maintainFC_01_Current_Values_Flow_Rate,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================
    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate,
        setFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<string | null>(null);

    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate_High,
        setFC_01_Current_Values_Uncorrected_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate_Low,
        setFC_01_Current_Values_Uncorrected_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate,
        setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
        setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Uncorrected_Flow_RateValue = parseFloat(
            FC_01_Current_Values_Uncorrected_Flow_Rate as any
        );
        const highValue =
            FC_01_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
        const lowValue = FC_01_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Uncorrected_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
        ) {
            setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate(
                FC_01_Current_Values_Uncorrected_Flow_RateValue >= highValue ||
                    FC_01_Current_Values_Uncorrected_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Uncorrected_Flow_Rate,
        FC_01_Current_Values_Uncorrected_Flow_Rate_High,
        FC_01_Current_Values_Uncorrected_Flow_Rate_Low,
        maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================

    //================================ SVA1 FIQ 1901 ======================================================
    const [
        FC_01_Accumulated_Values_Volume,
        setFC_01_Accumulated_Values_Volume,
    ] = useState<string | null>(null);

    const [
        FC_01_Accumulated_Values_Volume_High,
        setFC_01_Accumulated_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Accumulated_Values_Volume_Low,
        setFC_01_Accumulated_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Accumulated_Values_Volume,
        setExceedThresholdFC_01_Accumulated_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Accumulated_Values_Volume,
        setMaintainFC_01_Accumulated_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Accumulated_Values_VolumeValue = parseFloat(
            FC_01_Accumulated_Values_Volume as any
        );
        const highValue = FC_01_Accumulated_Values_Volume_High ?? NaN;
        const lowValue = FC_01_Accumulated_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Accumulated_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Accumulated_Values_Volume
        ) {
            setExceedThresholdFC_01_Accumulated_Values_Volume(
                FC_01_Accumulated_Values_VolumeValue >= highValue ||
                    FC_01_Accumulated_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Accumulated_Values_Volume,
        FC_01_Accumulated_Values_Volume_High,
        FC_01_Accumulated_Values_Volume_Low,
        maintainFC_01_Accumulated_Values_Volume,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================
    //================================ SVA1 FIQ 1901 ======================================================
    const [
        FC_01_Accumulated_Values_Uncorrected_Volume,
        setFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_01_Accumulated_Values_Uncorrected_Volume_High,
        setFC_01_Accumulated_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Accumulated_Values_Uncorrected_Volume_Low,
        setFC_01_Accumulated_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume,
        setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Accumulated_Values_Uncorrected_Volume,
        setMaintainFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(
            FC_01_Accumulated_Values_Uncorrected_Volume as any
        );
        const highValue =
            FC_01_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_01_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Accumulated_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Accumulated_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume(
                FC_01_Accumulated_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_01_Accumulated_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Accumulated_Values_Uncorrected_Volume,
        FC_01_Accumulated_Values_Uncorrected_Volume_High,
        FC_01_Accumulated_Values_Uncorrected_Volume_Low,
        maintainFC_01_Accumulated_Values_Uncorrected_Volume,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================

    //================================ GD 1902 ======================================================

    const [FC_02_Current_Values_Flow_Rate, setFC_02_Current_Values_Flow_Rate] =
        useState<string | null>(null);

    const [
        FC_02_Current_Values_Flow_Rate_High,
        setFC_02_Current_Values_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Flow_Rate_Low,
        setFC_02_Current_Values_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Flow_Rate,
        setExceedThresholdFC_02_Current_Values_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Flow_Rate,
        setMaintainFC_02_Current_Values_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Flow_RateValue = parseFloat(
            FC_02_Current_Values_Flow_Rate as any
        );
        const highValue = FC_02_Current_Values_Flow_Rate_High ?? NaN;
        const lowValue = FC_02_Current_Values_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Flow_Rate
        ) {
            setExceedThresholdFC_02_Current_Values_Flow_Rate(
                FC_02_Current_Values_Flow_RateValue >= highValue ||
                    FC_02_Current_Values_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Flow_Rate,
        FC_02_Current_Values_Flow_Rate_High,
        FC_02_Current_Values_Flow_Rate_Low,
        maintainFC_02_Current_Values_Flow_Rate,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================
    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate,
        setFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<string | null>(null);

    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate_High,
        setFC_02_Current_Values_Uncorrected_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate_Low,
        setFC_02_Current_Values_Uncorrected_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate,
        setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
        setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Uncorrected_Flow_RateValue = parseFloat(
            FC_02_Current_Values_Uncorrected_Flow_Rate as any
        );
        const highValue =
            FC_02_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
        const lowValue = FC_02_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Uncorrected_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
        ) {
            setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate(
                FC_02_Current_Values_Uncorrected_Flow_RateValue >= highValue ||
                    FC_02_Current_Values_Uncorrected_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Uncorrected_Flow_Rate,
        FC_02_Current_Values_Uncorrected_Flow_Rate_High,
        FC_02_Current_Values_Uncorrected_Flow_Rate_Low,
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================

    //================================ SVA1 FIQ 1901 ======================================================
    const [
        FC_02_Accumulated_Values_Volume,
        setFC_02_Accumulated_Values_Volume,
    ] = useState<string | null>(null);

    const [
        FC_02_Accumulated_Values_Volume_High,
        setFC_02_Accumulated_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Accumulated_Values_Volume_Low,
        setFC_02_Accumulated_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Accumulated_Values_Volume,
        setExceedThresholdFC_02_Accumulated_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Accumulated_Values_Volume,
        setMaintainFC_02_Accumulated_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Accumulated_Values_VolumeValue = parseFloat(
            FC_02_Accumulated_Values_Volume as any
        );
        const highValue = FC_02_Accumulated_Values_Volume_High ?? NaN;
        const lowValue = FC_02_Accumulated_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Accumulated_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Accumulated_Values_Volume
        ) {
            setExceedThresholdFC_02_Accumulated_Values_Volume(
                FC_02_Accumulated_Values_VolumeValue >= highValue ||
                    FC_02_Accumulated_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Accumulated_Values_Volume,
        FC_02_Accumulated_Values_Volume_High,
        FC_02_Accumulated_Values_Volume_Low,
        maintainFC_02_Accumulated_Values_Volume,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================
    //================================ SVA1 FIQ 1901 ======================================================
    const [
        FC_02_Accumulated_Values_Uncorrected_Volume,
        setFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_02_Accumulated_Values_Uncorrected_Volume_High,
        setFC_02_Accumulated_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Accumulated_Values_Uncorrected_Volume_Low,
        setFC_02_Accumulated_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume,
        setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Accumulated_Values_Uncorrected_Volume,
        setMaintainFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(
            FC_02_Accumulated_Values_Uncorrected_Volume as any
        );
        const highValue =
            FC_02_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_02_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Accumulated_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Accumulated_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume(
                FC_02_Accumulated_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_02_Accumulated_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Accumulated_Values_Uncorrected_Volume,
        FC_02_Accumulated_Values_Uncorrected_Volume_High,
        FC_02_Accumulated_Values_Uncorrected_Volume_Low,
        maintainFC_02_Accumulated_Values_Uncorrected_Volume,
    ]);

    //================================ GVF1 FIQ 1901 ======================================================

    const [lineDuty1901, setLineduty1901] = useState<any>();
    const [lineDuty1902, setLineduty1902] = useState<any>();

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

            const FC_01_Current_Values_Static_Pressure_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_High"
            );
            setFC_01_Current_Values_Static_Pressure_High(
                FC_01_Current_Values_Static_Pressure_High?.value || null
            );
            const FC_01_Current_Values_Static_Pressure_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Low"
            );
            setFC_01_Current_Values_Static_Pressure_Low(
                FC_01_Current_Values_Static_Pressure_Low?.value || null
            );
            const FC_01_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
            );
            setMaintainFC_01_Current_Values_Static_Pressure(
                FC_01_Current_Values_Static_Pressure_Maintain?.value || false
            );
            //===============================================================================================================
            const FC_02_Current_Values_Static_Pressure_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_High"
            );
            setFC_02_Current_Values_Static_Pressure_High(
                FC_02_Current_Values_Static_Pressure_High?.value || null
            );
            const FC_02_Current_Values_Static_Pressure_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Low"
            );
            setFC_02_Current_Values_Static_Pressure_Low(
                FC_02_Current_Values_Static_Pressure_Low?.value || null
            );
            const FC_02_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Maintain"
            );
            setMaintainFC_02_Current_Values_Static_Pressure(
                FC_02_Current_Values_Static_Pressure_Maintain?.value || false
            );
            //===============================================================================================================

            const PT1_High = res.data.find(
                (item: any) => item.key === "PT1_High"
            );
            setPT1_High(PT1_High?.value || null);
            const PT1_Low = res.data.find(
                (item: any) => item.key === "PT1_Low"
            );
            setPT1_Low(PT1_Low?.value || null);
            const PT1_Maintain = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );
            setMaintainPT1(PT1_Maintain?.value || false);
            //===============================================================================================================
            const GD1_High = res.data.find(
                (item: any) => item.key === "GD1_High"
            );
            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find(
                (item: any) => item.key === "GD1_Low"
            );
            setGD1_Low(GD1_Low?.value || null);
            const GD1_Maintain = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setMaintainGD1(GD1_Maintain?.value || false);
            //===============================================================================================================

            const GD2_High = res.data.find(
                (item: any) => item.key === "GD2_High"
            );
            setGD2_High(GD2_High?.value || null);
            const GD2_Low = res.data.find(
                (item: any) => item.key === "GD2_Low"
            );
            setGD2_Low(GD2_Low?.value || null);
            const GD2_Maintain = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD2(GD2_Maintain?.value || false);
            //===============================================================================================================

            const FC_01_Current_Values_Flow_Rate_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Flow_Rate_High"
            );
            setFC_01_Current_Values_Flow_Rate_High(
                FC_01_Current_Values_Flow_Rate_High?.value || null
            );
            const FC_01_Current_Values_Flow_Rate_Low = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Low"
            );
            setFC_01_Current_Values_Flow_Rate_Low(
                FC_01_Current_Values_Flow_Rate_Low?.value || null
            );
            const FC_01_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Flow_Rate_Maintain"
            );
            setMaintainFC_01_Current_Values_Flow_Rate(
                FC_01_Current_Values_Flow_Rate_Maintain?.value || false
            );
            //===============================================================================================================

            const FC_01_Current_Values_Uncorrected_Flow_Rate_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_High"
                );
            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(
                FC_01_Current_Values_Uncorrected_Flow_Rate_High?.value || null
            );
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_Low"
                );
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(
                FC_01_Current_Values_Uncorrected_Flow_Rate_Low?.value || null
            );
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain"
                );
            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(
                FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value ||
                    false
            );
            //===============================================================================================================

            const FC_01_Accumulated_Values_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_High"
            );
            setFC_01_Accumulated_Values_Volume_High(
                FC_01_Accumulated_Values_Volume_High?.value || null
            );
            const FC_01_Accumulated_Values_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_Low"
            );
            setFC_01_Accumulated_Values_Volume_Low(
                FC_01_Accumulated_Values_Volume_Low?.value || null
            );
            const FC_01_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_Maintain"
            );
            setMaintainFC_01_Accumulated_Values_Volume(
                FC_01_Accumulated_Values_Volume_Maintain?.value || false
            );
            //===============================================================================================================

            const FC_01_Accumulated_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_High"
                );
            setFC_01_Accumulated_Values_Uncorrected_Volume_High(
                FC_01_Accumulated_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_01_Accumulated_Values_Uncorrected_Volume_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_Low"
                );
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(
                FC_01_Accumulated_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_01_Accumulated_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_Maintain"
                );
            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(
                FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );
            //===============================================================================================================

            const FC_02_Current_Values_Flow_Rate_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Flow_Rate_High"
            );
            setFC_02_Current_Values_Flow_Rate_High(
                FC_02_Current_Values_Flow_Rate_High?.value || null
            );
            const FC_02_Current_Values_Flow_Rate_Low = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Flow_Rate_Low"
            );
            setFC_02_Current_Values_Flow_Rate_Low(
                FC_02_Current_Values_Flow_Rate_Low?.value || null
            );
            const FC_02_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Flow_Rate_Maintain"
            );
            setMaintainFC_02_Current_Values_Flow_Rate(
                FC_02_Current_Values_Flow_Rate_Maintain?.value || false
            );
            //===============================================================================================================

            const FC_02_Current_Values_Uncorrected_Flow_Rate_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_High"
                );
            setFC_02_Current_Values_Uncorrected_Flow_Rate_High(
                FC_02_Current_Values_Uncorrected_Flow_Rate_High?.value || null
            );
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_Low"
                );
            setFC_02_Current_Values_Uncorrected_Flow_Rate_Low(
                FC_02_Current_Values_Uncorrected_Flow_Rate_Low?.value || null
            );
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain"
                );
            setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(
                FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain?.value ||
                    false
            );
            //===============================================================================================================

            const FC_02_Accumulated_Values_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_High"
            );
            setFC_02_Accumulated_Values_Volume_High(
                FC_02_Accumulated_Values_Volume_High?.value || null
            );
            const FC_02_Accumulated_Values_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_Low"
            );
            setFC_02_Accumulated_Values_Volume_Low(
                FC_02_Accumulated_Values_Volume_Low?.value || null
            );
            const FC_02_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_Maintain"
            );
            setMaintainFC_02_Accumulated_Values_Volume(
                FC_02_Accumulated_Values_Volume_Maintain?.value || false
            );
            //===============================================================================================================

            const FC_02_Accumulated_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_High"
                );
            setFC_02_Accumulated_Values_Uncorrected_Volume_High(
                FC_02_Accumulated_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_02_Accumulated_Values_Uncorrected_Volume_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_Low"
                );
            setFC_02_Accumulated_Values_Uncorrected_Volume_Low(
                FC_02_Accumulated_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_02_Accumulated_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_Maintain"
                );
            setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(
                FC_02_Accumulated_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );
            //===============================================================================================================

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
            if (node.id === "data4") {
                const roundedFC_01_Current_Values_Flow_Rate =
                    FC_01_Current_Values_Flow_Rate !== null
                        ? parseFloat(FC_01_Current_Values_Flow_Rate).toFixed(2)
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
                                        exceedThresholdFC_01_Current_Values_Flow_Rate &&
                                        !maintainFC_01_Current_Values_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Flow_Rate
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
                                        {roundedFC_01_Current_Values_Flow_Rate}
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
                const roundedFC_01_Current_Values_Uncorrected_Flow_Rate =
                    FC_01_Current_Values_Uncorrected_Flow_Rate !== null
                        ? parseFloat(
                              FC_01_Current_Values_Uncorrected_Flow_Rate
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate &&
                                        !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
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
                                            roundedFC_01_Current_Values_Uncorrected_Flow_Rate
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
            if (node.id === "data2") {
                const roundedFC_01_Accumulated_Values_Volume =
                    FC_01_Accumulated_Values_Volume !== null
                        ? parseFloat(FC_01_Accumulated_Values_Volume).toFixed(2)
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Accumulated_Values_Volume &&
                                        !maintainFC_01_Accumulated_Values_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Volume
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
                                        {roundedFC_01_Accumulated_Values_Volume}
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
                const roundedFC_01_Accumulated_Values_Uncorrected_Volume =
                    FC_01_Accumulated_Values_Uncorrected_Volume !== null
                        ? parseFloat(
                              FC_01_Accumulated_Values_Uncorrected_Volume
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    background:
                                        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume &&
                                        !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Uncorrected_Volume
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
                                            roundedFC_01_Accumulated_Values_Uncorrected_Volume
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
                const roundedFC_02_Current_Values_Flow_Rate =
                    FC_02_Current_Values_Flow_Rate !== null
                        ? parseFloat(FC_02_Current_Values_Flow_Rate).toFixed(2)
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Flow_Rate &&
                                        !maintainFC_02_Current_Values_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Flow_Rate
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
                                        {roundedFC_02_Current_Values_Flow_Rate}
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
                const roundedFC_02_Current_Values_Uncorrected_Flow_Rate =
                    FC_02_Current_Values_Uncorrected_Flow_Rate !== null
                        ? parseFloat(
                              FC_02_Current_Values_Uncorrected_Flow_Rate
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate &&
                                        !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Uncorrected_Flow_Rate
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
                                        {
                                            roundedFC_02_Current_Values_Uncorrected_Flow_Rate
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
            if (node.id === "data7") {
                const roundedFC_02_Accumulated_Values_Volume =
                    FC_02_Accumulated_Values_Volume !== null
                        ? parseFloat(FC_02_Accumulated_Values_Volume).toFixed(2)
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Accumulated_Values_Volume &&
                                        !maintainFC_02_Accumulated_Values_Volume
                                            ? "#ff5656"
                                            : maintainFC_02_Accumulated_Values_Volume
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
                                        {roundedFC_02_Accumulated_Values_Volume}
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
                const roundedFC_02_Accumulated_Values_Uncorrected_Volume =
                    FC_02_Accumulated_Values_Uncorrected_Volume !== null
                        ? parseFloat(
                              FC_02_Accumulated_Values_Uncorrected_Volume
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
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume &&
                                        !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                                            ? "#ff5656"
                                            : maintainFC_02_Accumulated_Values_Uncorrected_Volume
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
                                        {
                                            roundedFC_02_Accumulated_Values_Uncorrected_Volume
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
                                    // padding: 2,
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
                                        PT-1203 :
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
                const roundedFC_01_Current_Values_Static_Pressure =
                    FC_01_Current_Values_Static_Pressure !== null
                        ? parseFloat(
                              FC_01_Current_Values_Static_Pressure
                          ).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Static_Pressure &&
                                        !maintainFC_01_Current_Values_Static_Pressure
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Static_Pressure
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
                                        PT-1201:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {/* {roundedFC_01_Current_Values_Static_Pressure} */}
                                        {
                                            roundedFC_01_Current_Values_Static_Pressure
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
                                    BarA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
                const roundedFC_02_Current_Values_Static_Pressure =
                    FC_02_Current_Values_Static_Pressure !== null
                        ? parseFloat(
                              FC_02_Current_Values_Static_Pressure
                          ).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Static_Pressure &&
                                        !maintainFC_02_Current_Values_Static_Pressure
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Static_Pressure
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmFC_02_Current_Values_Static_Pressure()}
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
                                        PT-1202:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {
                                            roundedFC_02_Current_Values_Static_Pressure
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
                                    BarA
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
                                        Gateway{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        FC{" "}
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
                                    <p style={{ marginLeft: 5 }}>
                                        <p style={{ marginLeft: 5 }}>
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
                                        {FC_Conn_STT === "1" ? (
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
                                        {Conn_STT === "1" ? (
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
                                      {FC_Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    ></p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
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
                const roundedGD1 =
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
                                <p>{roundedGD1} %LEL</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
                const roundedGD2 =
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
                                <p>{roundedGD2} %LEL</p>
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
                                    {/* {NO === "1"
                                        ? SVD_NO
                                        : NC === "0"
                                        ? SVD_NC
                                        : null} */}
                                    {SVD_NO}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_IMG2") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {/* {NO === "1"
                                        ? SVD_NO
                                        : NO === "0"
                                        ? SVD_NC
                                        : null} */}
                                    {SVD_NO}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_IMG3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {/* {NO === "1"
                                        ? SVD_NO
                                        : NO === "0"
                                        ? SVD_NC
                                        : null} */}
                                    {SVD_NO}
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
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FC-1201
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
                                FC-1202
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

    // const storedPositionString = localStorage.getItem("positionsLGDS");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
                AlarmCenter
                : 
                {x: 587.5334077118977, y: 393.5876511598906},
                ArrowRight
                : 
                {x: 706.1381419284244, y: 1023.694783335719},
                ArrowRight1
                : 
                {x: -1310.4855228544018, y: 1027.4017827933426},
                ArrowRight2
                : 
                {x: 708.0924678318845, y: 1305.3978173871365},
                BallValue01
                : 
                {x: -1124.791936249579, y: 1134.3068528748481},
                BallValue02
                : 
                {x: -953.0583181071518, y: 1141.6043679334266},
                BallValue03
                : 
                {x: -127.79621954129698, y: 899.6124566834239},
                BallValue04
                : 
                {x: -127.98761243251244, y: 1129.5595186007586},
                BallValue05
                : 
                {x: 69.02660980686983, y: 900.275444950572},
                BallValue06
                : 
                {x: 68.4817333577081, y: 1129.366264933931},
                BallValue07
                : 
                {x: -760.558494130737, y: 813.9595916722001},
                BallValue08
                : 
                {x: -318.78277994435996, y: 813.2368352599929},
                BallValue09
                : 
                {x: -761.5161533656683, y: 1218.0953144552127},
                BallValue10
                : 
                {x: -319.2587189121365, y: 1218.2687283598136},
                BallValue13_Line7Last
                : 
                {x: 617.9013311130955, y: 1290.6241510603852},
                BallValueCenter
                : 
                {x: -490.3799459557838, y: 1016.4944766882877},
                BallValueCenter_Check
                : 
                {x: 90.96636981528951, y: 1084.2937921267353},
                BallValueCenter_None
                : 
                {x: -474.0480962199408, y: 1047.4658048132944},
                BallValueCenter_None2
                : 
                {x: -458.43233108676895, y: 1047.9161594286932},
                BallValueFirst
                : 
                {x: 615.958880827932, y: 1009.9907063439425},
                BallValueLast
                : 
                {x: -1230.666509063442, y: 1014.389416442682},
                BallValuePSV
                : 
                {x: 375.19292050720105, y: 970.9832154843842},
                BallValuePSVNone
                : 
                {x: 393.2839125618558, y: 989.0640389210198},
                BallVavleSDV_BOTTOM
                : 
                {x: 514.3019141028957, y: 1391.7914215997866},
                BallVavleSDV_TOP
                : 
                {x: 516.5482532696202, y: 1109.7862128138597},
                ConnectData
                : 
                {x: -1224.1375965271236, y: 779.7488024784055},
                FIQ_1901
                : 
                {x: -650.2239549709168, y: 407.9922529394157},
                FIQ_1902
                : 
                {x: -651.4547397975546, y: 1294.193679166134},
                FIQ_none
                : 
                {x: -491.4470769137962, y: 797.3702269986474},
                FIQ_none2
                : 
                {x: -491.21770178252325, y: 1201.8983996314123},
                FIQ_none11
                : 
                {x: -461.4522399597448, y: 842.2526102310347},
                FIQ_none22
                : 
                {x: -461.747235677007, y: 1245.2621682188906},
                Flow1
                : 
                {x: -853.4576431348205, y: 1498.5512757003828},
                Flow2
                : 
                {x: -444.10018252327654, y: 1498.2070645557653},
                GD1
                : 
                {x: -725.7034368640515, y: 1033.9450610768665},
                GD1_Name1901
                : 
                {x: -754.4615849863011, y: 959.8454102012485},
                GD1_Value1901
                : 
                {x: -755.1145731402554, y: 995.458904802694},
                GD2
                : 
                {x: -21.04313525608083, y: 1033.1458449005702},
                GD2_Name1902
                : 
                {x: -51.05869480682097, y: 961.6032677823157},
                GD2_Value1902
                : 
                {x: -51.008696324053346, y: 996.7937264938082},
                GD3
                : 
                {x: -33.45865823821708, y: 1023.4968146950976},
                GD3_Name1903
                : 
                {x: -38.935748158151824, y: 965.0434170104967},
                GD3_Value1903
                : 
                {x: -38.71667918527706, y: 990.28449275314},
                GD_none1
                : 
                {x: -700.0501253021391, y: 1052.778277582167},
                GD_none2
                : 
                {x: 3.885562964520915, y: 1052.696199525848},
                GD_none3
                : 
                {x: -8.569329151370312, y: 1040.1027102105159},
                HELP
                : 
                {x: 750.7851455025582, y: 336.66019515746984},
                Header
                : 
                {x: -1158.068877360768, y: 413.182590191916},
                Line2_NONE
                : 
                {x: -884.3336203769039, y: 1046.097424130381},
                Line2_NONE1
                : 
                {x: -771.9885863058424, y: 1046.097424130381},
                LineBall_1_1
                : 
                {x: -1308.1239277818895, y: 1045.9869361614612},
                LineBall_13
                : 
                {x: 720.9953422797897, y: 1041.1767855578794},
                LineBall_14
                : 
                {x: 722.7765057934312, y: 1322.9292064514948},
                PCV01
                : 
                {x: -72.47814833790082, y: 884.6622322842105},
                PCV02
                : 
                {x: -72.36105695687999, y: 1114.7032165712826},
                PCV_NUM01
                : 
                {x: -165.03431054756578, y: 826.7135260838959},
                PCV_NUM02
                : 
                {x: -159.77088821033965, y: 1180.3285742575476},
                PCV_ballVavle_Small1
                : 
                {x: 26.02187311783564, y: 889.8528829879407},
                PCV_ballVavle_Small1_none1
                : 
                {x: -46.98048131286686, y: 903.2535606409883},
                PCV_ballVavle_Small1_none2
                : 
                {x: -46.74022897904909, y: 1132.8134902831985},
                PCV_ballVavle_Small2
                : 
                {x: 23.019930237652545, y: 1120.1549395281857},
                PCV_ballVavle_Small2_none1
                : 
                {x: 32.51922482421617, y: 938.3135634050248},
                PCV_ballVavle_Small2_none2
                : 
                {x: 29.126918736836018, y: 1167.5225930073495},
                PCV_none1
                : 
                {x: -43.356336775693705, y: 932.4844638821777},
                PCV_none2
                : 
                {x: -43.63902265954965, y: 1160.9945398306136},
                PSV01
                : 
                {x: 384.51446969940866, y: 851.1754620710124},
                PSV_01
                : 
                {x: 372.10294218876356, y: 923.3643243912055},
                PSV_02
                : 
                {x: 352.7460871886958, y: 904.3814153335835},
                PSV_03
                : 
                {x: 345.12033949204454, y: 852.4187793834102},
                PSV_None01
                : 
                {x: 393.8612044092128, y: 1049.1820731484372},
                PSV_None02
                : 
                {x: 393.7254868841261, y: 948.4442776727033},
                PSV_None03
                : 
                {x: 372.38126256602715, y: 928.2490764297976},
                PSV_None04
                : 
                {x: 368.91430232750156, y: 872.910717531809},
                PT1
                : 
                {x: 213.79089216580826, y: 952.8215389633342},
                PT2
                : 
                {x: -722.4633098455206, y: 1169.5972236589182},
                PT3
                : 
                {x: -721.2004486313662, y: 764.6642722040159},
                PT_col1
                : 
                {x: 246.10962884511076, y: 1015.995256464112},
                PT_col2
                : 
                {x: -688.3788024700735, y: 826.7156614482261},
                PT_col3
                : 
                {x: -689.7876219423083, y: 1231.990742647488},
                PT_none1
                : 
                {x: 245.97093596247453, y: 1035.3795085307177},
                PT_none2
                : 
                {x: -688.483921541321, y: 790.3698301974988},
                PT_none3
                : 
                {x: -689.4183193240074, y: 1201.000475004107},
                PVC_none1
                : 
                {x: -559.5285900583461, y: 935.5671930782875},
                PVC_none2
                : 
                {x: -554.5116204107262, y: 1246.839418457314},
                Pressure_Trans01
                : 
                {x: 90.64981693221739, y: 710.7078171051338},
                Pressure_Trans02
                : 
                {x: -1099.886302452788, y: 700.90374813061},
                Pressure_Trans03
                : 
                {x: -1099.7905164574756, y: 1295.846598035787},
                SDV
                : 
                {x: -1155.9024533221402, y: 948.1549206467678},
                SDV_Ball
                : 
                {x: -1107.27002180917, y: 1164.281142621933},
                SDV_Ball_top
                : 
                {x: 532.0011596796021, y: 1038.8925180896877},
                SDV_Ball_top1
                : 
                {x: 534.0989077444709, y: 1322.961903924444},
                SDV_IMG
                : 
                {x: -1131.7894792066595, y: 993.8456973136035},
                SDV_IMG2
                : 
                {x: 509.1109395764221, y: 989.156044436319},
                SDV_IMG3
                : 
                {x: 506.92553670083896, y: 1271.3554720796772},
                SDV_IMG_top
                : 
                {x: -1049.7709320021045, y: 1195.6790306469368},
                SDV_IMG_top1
                : 
                {x: -1049.7709320021045, y: 895.6790306469368},
                SDV_Name_none
                : 
                {x: -1249.6461839977737, y: 902.8410000476873},
                SDV_Name_none1
                : 
                {x: -1249.6461839977737, y: 602.8410000476873},
                SDV_Name_none_top
                : 
                {x: 534.0262865165575, y: 1141.1509249021412},
                SDV_Name_none_top1
                : 
                {x: 531.8261899540272, y: 1422.4741937789881},
                SDV_None
                : 
                {x: -1103.1286470234306, y: 1045.1886789070904},
                SDV_top
                : 
                {x: 482.7653941653935, y: 945.7755809120326},
                SDV_top1
                : 
                {x: 484.165191822246, y: 1224.717718794522},
                T_juntion_11
                : 
                {x: -415.1375899376694, y: 826.41338351339},
                T_juntion_14
                : 
                {x: -636.9217801711462, y: 1199.4187412355468},
                Tank
                : 
                {x: -973.0915143309368, y: 977.6697003257602},
                Tank_Ball
                : 
                {x: -935.8789201820911, y: 1173.2073553122648},
                Tank_None
                : 
                {x: -944.673167794951, y: 1045.6292921984523},
                Temperature_Trans01
                : 
                {x: -607.828356494313, y: 562.8487535527242},
                Temperature_Trans02
                : 
                {x: -796.1166124474211, y: 1445.5258186779024},
                VavleWay
                : 
                {x: -549.7343955645046, y: 1023.9896019770438},
                animation_line7
                : 
                {x: -726.8677999585877, y: 845.0411827415849},
                animation_line8
                : 
                {x: -302.1278181476729, y: 845.0900138040361},
                animation_line9
                : 
                {x: -735.8615775891575, y: 1250.0032163426715},
                animation_line10
                : 
                {x: -302.52565055103537, y: 1250.145137738511},
                animation_line11
                : 
                {x: -379.70039074752606, y: 845.4885740100881},
                animation_line12
                : 
                {x: -456.7744720087678, y: 1047.6913485484115},
                animation_line13
                : 
                {x: -471.36187766507726, y: 1047.0994790430639},
                animation_line14
                : 
                {x: -601.6773380252566, y: 1249.8269450159223},
                animation_line15
                : 
                {x: -300.41401361805697, y: 1249.8955661985747},
                borderWhite
                : 
                {x: -1306.946042086337, y: 402.47281223183927},
                data1
                : 
                {x: -650.3842180516542, y: 701.8803319073678},
                data2
                : 
                {x: -650.2983792050409, y: 621.0712209869154},
                data3
                : 
                {x: -650.123776419583, y: 540.3161640771303},
                data4
                : 
                {x: -650.1327025992422, y: 459.2710402012734},
                data5
                : 
                {x: -651.2929361055199, y: 1345.564666748593},
                data6
                : 
                {x: -651.0038187338419, y: 1426.9643939473408},
                data7
                : 
                {x: -650.6749133651101, y: 1508.349081723246},
                data8
                : 
                {x: -650.7647055051796, y: 1589.3276368240022},
                line1
                : 
                {x: -1213.6281398603076, y: 1045.9201535079228},
                line2
                : 
                {x: -845.3367977758118, y: 1046.097424130381},
                line3
                : 
                {x: -743.0134159304, y: 844.6163804041859},
                line4
                : 
                {x: -743.9949690251686, y: 1249.172245093845},
                line5
                : 
                {x: -300.65784806763253, y: 844.3342440262651},
                line6
                : 
                {x: -300.98065704991916, y: 1249.1529639630187},
                line7
                : 
                {x: -196.38382079776343, y: 1045.8956117006094},
                line8
                : 
                {x: -109.84769512178819, y: 930.3833450683701},
                line9
                : 
                {x: -110.37038145875272, y: 1159.9359004593528},
                line10
                : 
                {x: 86.69745659087829, y: 930.5099856332267},
                line11
                : 
                {x: 86.19431979613125, y: 1160.0153295862324},
                line12
                : 
                {x: 210.36749089873302, y: 1040.345253330986},
                line13
                : 
                {x: 633.3802377329793, y: 1041.1767855578794},
                overlay_SmallVavle1
                : 
                {x: -530.6992383631261, y: 919.9899253611712},
                overlay_SmallVavle2
                : 
                {x: -1263.7593947324417, y: 1290.7025144885476},
                overlay_line7
                : 
                {x: -236.18344947635651, y: 1045.7973361160095},
                overlay_line13
                : 
                {x: 166.2131775686383, y: 1038.3852554690623},
                overlay_lineLast
                : 
                {x: 635.324687472906, y: 1323.0053414660558},
                timeUpdate3
                : 
                {x: -1280.9767468799048, y: 483.5893320381276},
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
            style: { border: "none", width: 10, height: 30, background: line },
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
                        SDV-1001
                    </div>
                ),
            },
            position: positions.SDV,
            zIndex: 99999,

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
                background: "none",
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
                color: "white",
                border: "none",
                background: background,
                width: 0,
                height: 0,
            },
        },
        {
            id: "SDV_IMG2",
            position: positions.SDV_IMG2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                color: "white",
                border: "none",
                background: background,
                width: 0,
                height: 0,
            },
        },
        {
            id: "SDV_IMG3",
            position: positions.SDV_IMG3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                color: "white",
                border: "none",
                background: background,
                width: 0,
                height: 0,
            },
        },

        {
            id: "SDV_top",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        SDV-1002
                    </div>
                ),
            },
            position: positions.SDV_top,
            zIndex: 99999,

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
            id: "SDV_Ball_top",
            position: positions.SDV_Ball_top,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 30,
                height: 1,
            },
        },
        {
            id: "SDV_IMG_top",
            position: positions.SDV_IMG_top,
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
            id: "SDV_Name_none_top",
            position: positions.SDV_Name_none_top,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 35,
                height: 0,
            },
        },

        {
            id: "SDV_top1",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        SDV-1003
                    </div>
                ),
            },
            position: positions.SDV_top1,
            zIndex: 99999,

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
            id: "SDV_Ball_top1",
            position: positions.SDV_Ball_top1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 30,
                height: 1,
            },
        },
        {
            id: "SDV_IMG_top1",
            position: positions.SDV_IMG_top1,
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
            id: "SDV_Name_none_top1",
            position: positions.SDV_Name_none_top1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 35,
                height: 0,
            },
        },

        {
            id: "BallVavleSDV_TOP",
            position: positions.BallVavleSDV_TOP,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavleSDV_TOP1 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                background: background,
                width: 0,
                height: 0,
            },
        },

        {
            id: "BallVavleSDV_BOTTOM",
            position: positions.BallVavleSDV_BOTTOM,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavleSDV_BOTTOM1 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
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

        {
            id: "BallValue13_Line7Last",
            position: positions.BallValue13_Line7Last,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueLast />
                    </div>
                ),
            },
            zIndex: 9999,
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
                width: 400,
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
                width: 400,
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
                width: 400,
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
                width: 400,
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
                width: 400,
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

            sourcePosition: Position.Top,
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
                                LGDS
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
        {
            id: "ArrowRight2",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            position: positions.ArrowRight2,

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

        // {
        //     id: "GD1",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD1,
        //     zIndex: 9999,
        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Top,
        // },
        // {
        //     id: "GD2",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD2,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Left,
        // },
        // // {
        // //     id: "GD3",
        // //     data: {
        // //         label: <div>{GD}</div>,
        // //     },

        // //     position: positions.GD3,
        // //     zIndex: 9999,

        // //     style: {
        // //         background: background,
        // //         border: "none",
        // //         width: "10px",

        // //         height: 10,
        // //     },
        // //     targetPosition: Position.Top,
        // // },
        // {
        //     id: "GD1_Name1901",
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
        //                 GD-1001
        //             </div>
        //         ),
        //     },
        //     position: positions.GD1_Name1901,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },
        // {
        //     id: "GD2_Name1902",
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
        //                 GD-1002
        //             </div>
        //         ),
        //     },
        //     position: positions.GD2_Name1902,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },
        // // {
        // //     id: "GD3_Name1903",
        // //     data: {
        // //         label: (
        // //             <div
        // //                 style={{
        // //                     fontSize: 20,
        // //                     fontWeight: 500,
        // //                     position: "relative",
        // //                     bottom: 5,
        // //                 }}
        // //             >
        // //                 GD-1903
        // //             </div>
        // //         ),
        // //     },
        // //     position: positions.GD3_Name1903,

        // //     style: {
        // //         background: "yellow",
        // //         border: "1px solid white",
        // //         width: 130,
        // //         height: 35,
        // //     },
        // //     targetPosition: Position.Left,
        // // },

        // {
        //     id: "GD1_Value1901",
        //     data: {
        //         label: <div style={{}}> </div>,
        //     },
        //     position: positions.GD1_Value1901,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // {
        //     id: "GD2_Value1902",
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
        //     position: positions.GD2_Value1902,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // // {
        // //     id: "GD3_Value1903",
        // //     data: {
        // //         label: (
        // //             <div
        // //                 style={{
        // //                     color: "green",
        // //                     fontSize: 18,
        // //                     fontWeight: 600,
        // //                 }}
        // //             >
        // //                 {" "}
        // //             </div>
        // //         ),
        // //     },
        // //     position: positions.GD3_Value1903,

        // //     style: {
        // //         background: borderBox,
        // //         border: "1px solid white",
        // //         width: 130,
        // //         height: 35,
        // //     },
        // //     targetPosition: Position.Bottom,
        // // },

        // {
        //     id: "GD_none1",
        //     position: positions.GD_none1,
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
        // {
        //     id: "GD_none2",
        //     position: positions.GD_none2,
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
        // // {
        // //     id: "GD_none3",
        // //     position: positions.GD_none3,
        // //     type: "custom",
        // //     data: {
        // //         label: <div></div>,
        // //     },

        // //     sourcePosition: Position.Top,
        // //     targetPosition: Position.Right,
        // //     style: {
        // //         border: "#333333",
        // //         background: colorIMG_none,
        // //         width: 10,
        // //         height: 1,
        // //     },
        // // },

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
                height: 200,
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

            sourcePosition: Position.Bottom,
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

        {
            id: "overlay_lineLast",
            position: positions.overlay_lineLast,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 35,
                height: 0,
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
                        <AlarmLGDS />
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

        //=================================================

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
            id: "LineBall_13",
            position: positions.LineBall_13,
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
            id: "LineBall_14",
            position: positions.LineBall_14,
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
                } else if (id === "SDV_IMG2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG2: position,
                    }));
                } else if (id === "SDV_IMG3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG3: position,
                    }));
                } else if (id === "SDV_Ball") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Ball: position,
                    }));
                }

                if (id === "SDV_top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_top: position,
                    }));
                } else if (id === "SDV_Ball_top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Ball_top: position,
                    }));
                } else if (id === "SDV_IMG_top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG_top: position,
                    }));
                } else if (id === "SDV_Name_none_top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Name_none_top: position,
                    }));
                }

                if (id === "SDV_top1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_top1: position,
                    }));
                } else if (id === "SDV_Ball_top1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Ball_top1: position,
                    }));
                } else if (id === "SDV_IMG_top1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG_top1: position,
                    }));
                } else if (id === "SDV_Name_none_top1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Name_none_top1: position,
                    }));
                } else if (id === "BallVavleSDV_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleSDV_TOP: position,
                    }));
                } else if (id === "BallVavleSDV_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleSDV_BOTTOM: position,
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
                } else if (id === "BallValue13_Line7Last") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue13_Line7Last: position,
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
                } else if (id === "overlay_line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_line7: position,
                    }));
                } else if (id === "overlay_line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_line13: position,
                    }));
                } else if (id === "overlay_lineLast") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_lineLast: position,
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
                }

                //===========================================================
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
                } else if (id === "LineBall_13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineBall_13: position,
                    }));
                } else if (id === "LineBall_14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineBall_14: position,
                    }));
                } else if (id === "ArrowRight2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight2: position,
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
    //     localStorage.setItem("positionsLGDS", JSON.stringify(positions));
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
                    minZoom={0.3}
                    maxZoom={3}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
