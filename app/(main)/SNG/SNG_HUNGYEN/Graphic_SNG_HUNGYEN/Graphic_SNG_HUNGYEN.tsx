import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { edgePRU } from "./edgePRU";
import { Button } from "primereact/button";

import Image from "next/image";
import {
    ArrowRight,
    BlackTriangle,
    FIQ,
    GD,
    GaugeTemperature,
    PCV,
    PTV,
    SDV_Meiko,
    SDV_OFF,
    SDV_ON,
    SVD_NC,
    SVD_NO,
    TankLine,
    TankMeiko,
    VP_Black,
    VP_OFF,
    VP_ON,
    V_V1_V2,
    WhiteTriangleRight,
    arrowDown,
    arrowLeft,
    arrowUp,
    gaugePM,
    icon20,
    icon40,
} from "./iconSVG";

import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { id_SNG_HungYen } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";
import { BlackTriangleRight } from "@/app/(main)/PRU/GraphicPRU/iconSVG";
import AlarmMeiko from "@/layout/AlarmBell/AlarmMeiko";
import BallValue01 from "../BallValueSNG_HUNGYEN/BallValue01";
import BallValue02 from "../BallValueSNG_HUNGYEN/BallValue02";
import BallValue03 from "../BallValueSNG_HUNGYEN/BallValue03";
import PSV01 from "../BallValueSNG_HUNGYEN/PSV01";
import PSV02 from "../BallValueSNG_HUNGYEN/PSV02";
import AlarmSNG_HUNGYEN from "@/layout/AlarmBell/AlarmSNG_HUNGYEN";

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
export const colorNameValue = "black";
export const colorData = "green";
export const borderBox = "#aad4ff";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ff7f00";
export const line2 = "#ffaa00";
export const line3 = "#ffe900";

export default function Graphic_SNG_HUNGYEN() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);
    const [VP_301, setVP_301] = useState<string | null>(null);

    const [PT_2004, setPT_2004] = useState<string | null>(null);
    const [PT_2005, setPT_2005] = useState<string | null>(null);
    const [TM_2002_SNG, setTM_2002_SNG] = useState<string | null>(null);
    const [TM_2003_SNG, setTM_2003_SNG] = useState<string | null>(null);
    const [TT_2003, setTT_2003] = useState<string | null>(null);
    const [TT_2004, setTT_2004] = useState<string | null>(null);

    const [Pipe_Press, setPipe_Press] = useState<string | null>(null);
    const [Pipe_Temp, setPipe_Temp] = useState<any>();

    const [FCV_2001, setFCV_2001] = useState<string | null>(null);

    const [SDV, setSDV] = useState<string | null>(null);

    const [WB_1001, setWB_1001] = useState<string | null>(null);
    const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
    const [HV_1001, setHV_1001] = useState<string | null>(null);
    const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
    const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);

    const [VP_302, setVP_302] = useState<string | null>(null);
    const [VP_303, setVP_303] = useState<string | null>(null);
    const [SDV_301, setSDV_301] = useState<string | null>(null);
    const [SDV_302, setSDV_302] = useState<string | null>(null);
    const [GD_101_High, setGD_101_High] = useState<any | null>(null);
    const [GD_101_Low, setGD_101_Low] = useState<any | null>(null);
    const [GD_102_High, setGD_102_High] = useState<string | null>(null);
    const [GD_102_Low, setGD_102_Low] = useState<string | null>(null);
    const [GD_103_High, setGD_103_High] = useState<string | null>(null);
    const [GD_103_Low, setGD_103_Low] = useState<string | null>(null);

    const [Consumption_Flow, setConsumption_Flow] = useState<string | null>(
        null
    );
    const [Flow_Velocity, setFlow_Velocity] = useState<string | null>(null);

    const [V2_Flow_Meter, setV2_Flow_Meter] = useState<any>();
    const [V1_Flow_Meter, setV1_Flow_Meter] = useState<any>();
    const [Flow_Meter_Total, setFlow_Meter_Total] = useState<any>();
    const [PLC_STT, setPLC_STT] = useState<string | null>(null);

    const [PLC_STTValue, setPLC_STTValue] = useState<any>();
    const [active, setActive] = useState();
    const [LPG, setLPG] = useState<any>();
    const [AIR, setAIR] = useState<any>();

    const totalHeight = 620;
    const totalWidth = 50;

    const DataLPG = (totalHeight * LPG) / 100;
    const DataAir = (totalHeight * AIR) / 100;
    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_SNG_HungYen,
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
                                id: id_SNG_HungYen,
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
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                    ws.current?.send(JSON.stringify(obj_PCV_PSV));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (event) => {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        PT_3005: setPT_2004,
                        PT_3006: setPT_2005,
                        TM_3002_SNG: setTM_2002_SNG,
                        TM_3003_SNG: setTM_2003_SNG,
                        TT_3003: setTT_2003,
                        TT_3004: setTT_2004,

                        FCV_3001: setFCV_2001,

                        SDV_3004: setSDV,

                        WB_3001: setWB_1001,

                        WB_Setpoint: setWB_Setpoint,
                        HV_3001: setHV_1001,

                        RATIO_MODE: setRATIO_MODE,
                        FCV_MODE: setFCV_MODE,

                        VP_302: setVP_302,
                        VP_303: setVP_303,

                        SDV_301: setSDV_301,
                        SDV_302: setSDV_302,

                        Pipe_Temp: setPipe_Temp,
                        Pipe_Press: setPipe_Press,
                        GD_101_High: setGD_101_High,
                        GD_101_Low: setGD_101_Low,
                        GD_102_High: setGD_102_High,
                        GD_102_Low: setGD_102_Low,
                        GD_103_High: setGD_103_High,
                        GD_103_Low: setGD_103_Low,

                        Flow_Meter_Total: setFlow_Meter_Total,
                        Consumption_Flow: setConsumption_Flow,
                        Flow_Velocity: setFlow_Velocity,

                        V1_Flow_Meter: setV1_Flow_Meter,
                        V2_Flow_Meter: setV2_Flow_Meter,
                        PLC_Conn_STT: setPLC_STT,

                        PERCENT_AIR: setAIR,
                        PERCENT_LPG: setLPG,
                    };
                    const valueStateMap: ValueStateMap = {
                        PLC_Conn_STT: setPLC_STTValue,
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

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PT_2004: " Tank 01",
        PT_2005: "Volume",
        TM_2002_SNG: "TM-3002",
        TM_2003_SNG: "TM-3003",
        TT_2003: "TT 301",
        VP_301: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "Bara",
        CC: "°C",
        BARG: "%",
    };
    //================================ PT_2004================================

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_SNG_HungYen}/values/attributes/SERVER_SCOPE`
            );

            const HighPT_2004 = res.data.find(
                (item: any) => item.key === "PT_2004_High"
            );
            setHighPT_2004(HighPT_2004?.value || null);
            const LowPT_2004 = res.data.find(
                (item: any) => item.key === "PT_2004_Low"
            );
            setLowPT_2004(LowPT_2004?.value || null);

            const MaintainPT_2004 = res.data.find(
                (item: any) => item.key === "PT_2004_Maintain"
            );
            setMaintainPT_2004(MaintainPT_2004?.value || false);
            //===========================================================================================

            const HighPT_2005 = res.data.find(
                (item: any) => item.key === "PT_2005_High"
            );
            setHighPT_2005(HighPT_2005?.value || null);
            const LowPT_2005 = res.data.find(
                (item: any) => item.key === "PT_2005_Low"
            );
            setLowPT_2005(LowPT_2005?.value || null);

            const MaintainPT_2005 = res.data.find(
                (item: any) => item.key === "PT_2005_Maintain"
            );
            setMaintainPT_2005(MaintainPT_2005?.value || false);
            //===========================================================================================

            const HighTM_2002_SNG = res.data.find(
                (item: any) => item.key === "TM_2002_SNG_High"
            );
            setHighTM_2002_SNG(HighTM_2002_SNG?.value || null);
            const LowTM_2002_SNG = res.data.find(
                (item: any) => item.key === "TM_2002_SNG_Low"
            );
            setLowTM_2002_SNG(LowTM_2002_SNG?.value || null);

            const TM_2002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2002_SNG_Maintain"
            );
            setMaintainTM_2002_SNG(TM_2002_SNG_Maintain?.value || false);

            //===========================================================================================

            const HighTM_2003_SNG = res.data.find(
                (item: any) => item.key === "TM_2003_SNG_High"
            );
            setHighTM_2003_SNG(HighTM_2003_SNG?.value || null);

            const LowTM_2003_SNG = res.data.find(
                (item: any) => item.key === "TM_2003_SNG_Low"
            );
            setLowTM_2003_SNG(LowTM_2003_SNG?.value || null);

            const TM_2003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2003_SNG_Maintain"
            );
            setMaintainTM_2003_SNG(TM_2003_SNG_Maintain?.value || false);
            //===========================================================================================

            const HighTT_2003 = res.data.find(
                (item: any) => item.key === "TT_2003_High"
            );
            setHighTT_2003(HighTT_2003?.value || null);

            const LowTT_2003 = res.data.find(
                (item: any) => item.key === "TT_2003_Low"
            );
            setLowTT_2003(LowTT_2003?.value || null);

            const TT_2003_Maintain = res.data.find(
                (item: any) => item.key === "TT_2003_Maintain"
            );
            setMaintainTT_2003(TT_2003_Maintain?.value || false);

            //===========================================================================================

            const HighTT_2004 = res.data.find(
                (item: any) => item.key === "TT_2004_High"
            );
            setHighTT_2004(HighTT_2004?.value || null);
            const LowTT_2004 = res.data.find(
                (item: any) => item.key === "TT_2004_Low"
            );
            setLowTT_2004(LowTT_2004?.value || null);

            const MaintainTT_2004 = res.data.find(
                (item: any) => item.key === "TT_2004_Maintain"
            );
            setMaintainTT_2004(MaintainTT_2004?.value || false);
            //===========================================================================================

            const HighFCV_2001 = res.data.find(
                (item: any) => item.key === "FCV_2001_High"
            );
            setHighFCV_2001(HighFCV_2001?.value || null);
            const LowFCV_2001 = res.data.find(
                (item: any) => item.key === "FCV_2001_Low"
            );
            setLowFCV_2001(LowFCV_2001?.value || null);

            const MaintainFCV_2001 = res.data.find(
                (item: any) => item.key === "FCV_2001_Maintain"
            );
            setMaintainFCV_2001(MaintainFCV_2001?.value || false);
            //===========================================================================================

            const HighWB_1001 = res.data.find(
                (item: any) => item.key === "WB_1001_High"
            );
            setHighWB_1001(HighWB_1001?.value || null);
            const LowWB_1001 = res.data.find(
                (item: any) => item.key === "WB_1001_Low"
            );
            setLowWB_1001(LowWB_1001?.value || null);

            const MaintainWB_1001 = res.data.find(
                (item: any) => item.key === "WB_1001_Maintain"
            );
            setMaintainWB_1001(MaintainWB_1001?.value || false);
            //===========================================================================================
            const HighWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_High"
            );
            setHighWB_Setpoint(HighWB_Setpoint?.value || null);
            const LowWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Low"
            );
            setLowWB_Setpoint(LowWB_Setpoint?.value || null);

            const MaintainWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );
            setMaintainWB_Setpoint(MaintainWB_Setpoint?.value || false);
            //===========================================================================================

            const HighHV_1001 = res.data.find(
                (item: any) => item.key === "HV_1001_High"
            );
            setHighHV_1001(HighHV_1001?.value || null);
            const LowHV_1001 = res.data.find(
                (item: any) => item.key === "HV_1001_Low"
            );
            setLowHV_1001(LowHV_1001?.value || null);

            const MaintainHV_1001 = res.data.find(
                (item: any) => item.key === "HV_1001_Maintain"
            );
            setMaintainHV_1001(MaintainHV_1001?.value || false);
            //===========================================================================================

            const HighRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_High"
            );
            setHighRATIO_MODE(HighRATIO_MODE?.value || null);
            const LowRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Low"
            );
            setLowRATIO_MODE(LowRATIO_MODE?.value || null);

            const MaintainRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Maintain"
            );
            setMaintainRATIO_MODE(MaintainRATIO_MODE?.value || false);
            //===========================================================================================

            const HighFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_High"
            );
            setHighFCV_MODE(HighFCV_MODE?.value || null);
            const LowFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_Low"
            );
            setLowFCV_MODE(LowFCV_MODE?.value || null);

            const MaintainFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_Maintain"
            );
            setMaintainFCV_MODE(MaintainFCV_MODE?.value || false);
            //===========================================================================================

            const HighFlow_Velocity = res.data.find(
                (item: any) => item.key === "Flow_Velocity_High"
            );
            setHighFlow_Velocity(HighFlow_Velocity?.value || null);

            const LowFlow_Velocity = res.data.find(
                (item: any) => item.key === "Flow_Velocity_Low"
            );
            setLowFlow_Velocity(LowFlow_Velocity?.value || null);

            const Flow_Velocity_Maintain = res.data.find(
                (item: any) => item.key === "Flow_Velocity_Maintain"
            );
            setMaintainFlow_Velocity(Flow_Velocity_Maintain?.value || false);
            //===========================================================================================
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [audioPT_2004, setaudioPT_2004] = useState(false);
    const [HighPT_2004, setHighPT_2004] = useState<number | null>(null);
    const [LowPT_2004, setLowPT_2004] = useState<number | null>(null);
    const [audioColorPT_2004, setaudioColorPT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT_2004, setMaintainPT_2004] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT_2004 === "string" &&
            typeof LowPT_2004 === "string" &&
            PT_2004 !== null &&
            maintainPT_2004 === false
        ) {
            const highValue = parseFloat(HighPT_2004);
            const lowValue = parseFloat(LowPT_2004);
            const PT_2004Value = parseFloat(PT_2004);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2004Value)) {
                if (highValue < PT_2004Value || PT_2004Value < lowValue) {
                    if (!audioPT_2004) {
                        audioRef.current?.play();
                        setaudioPT_2004(true);
                        setaudioColorPT_2004(true);
                    }
                } else {
                    setaudioPT_2004(false);
                    setaudioColorPT_2004(false);
                }
            }
        }
    }, [HighPT_2004, PT_2004, audioPT_2004, LowPT_2004, maintainPT_2004]);

    useEffect(() => {
        if (audioPT_2004) {
            const audioEnded = () => {
                setaudioPT_2004(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPT_2004]);

    //================================ PT_2004======================================================

    //================================ PT_2005================================

    const [audioPT_2005, setaudioPT_2005] = useState(false);
    const [HighPT_2005, setHighPT_2005] = useState<number | null>(null);
    const [LowPT_2005, setLowPT_2005] = useState<number | null>(null);
    const [audioColorPT_2005, setaudioColorPT_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT_2005, setMaintainPT_2005] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPT_2005 === "string" &&
            typeof LowPT_2005 === "string" &&
            PT_2005 !== null &&
            maintainPT_2005 === false
        ) {
            const highValue = parseFloat(HighPT_2005);
            const lowValue = parseFloat(LowPT_2005);
            const PT_2005Value = parseFloat(PT_2005);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2005Value)) {
                if (highValue < PT_2005Value || PT_2005Value < lowValue) {
                    if (!audioPT_2005) {
                        audioRef.current?.play();
                        setaudioPT_2005(true);
                        setaudioColorPT_2005(true);
                    }
                } else {
                    setaudioPT_2005(false);
                    setaudioColorPT_2005(false);
                }
            }
        }
    }, [HighPT_2005, PT_2005, audioPT_2005, LowPT_2005, maintainPT_2005]);

    useEffect(() => {
        if (audioPT_2005) {
            const audioEnded = () => {
                setaudioPT_2005(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPT_2005]);

    //================================ PT_2005 ======================================================

    //================================ TM_2002_SNG================================

    const [audioTM_2002_SNG, setaudioTM_2002_SNG] = useState(false);
    const [HighTM_2002_SNG, setHighTM_2002_SNG] = useState<number | null>(null);
    const [LowTM_2002_SNG, setLowTM_2002_SNG] = useState<number | null>(null);
    const [audioColorTM_2002_SNG, setaudioColorTM_2002_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTM_2002_SNG, setMaintainTM_2002_SNG] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTM_2002_SNG === "string" &&
            typeof LowTM_2002_SNG === "string" &&
            TM_2002_SNG !== null &&
            maintainTM_2002_SNG === false
        ) {
            const highValue = parseFloat(HighTM_2002_SNG);
            const lowValue = parseFloat(LowTM_2002_SNG);
            const TM_2002_SNGValue = parseFloat(TM_2002_SNG);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(TM_2002_SNGValue)
            ) {
                if (
                    highValue < TM_2002_SNGValue ||
                    TM_2002_SNGValue < lowValue
                ) {
                    if (!audioTM_2002_SNG) {
                        audioRef.current?.play();
                        setaudioTM_2002_SNG(true);
                        setaudioColorTM_2002_SNG(true);
                    }
                } else {
                    setaudioTM_2002_SNG(false);
                    setaudioColorTM_2002_SNG(false);
                }
            }
        }
    }, [
        HighTM_2002_SNG,
        TM_2002_SNG,
        audioTM_2002_SNG,
        LowTM_2002_SNG,
        maintainTM_2002_SNG,
    ]);

    useEffect(() => {
        if (audioTM_2002_SNG) {
            const audioEnded = () => {
                setaudioTM_2002_SNG(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTM_2002_SNG]);

    //================================ TM_2002_SNG ======================================================

    //================================ TM_2003_SNG================================

    const [audioTM_2003_SNG, setaudioTM_2003_SNG] = useState(false);
    const [HighTM_2003_SNG, setHighTM_2003_SNG] = useState<number | null>(null);
    const [LowTM_2003_SNG, setLowTM_2003_SNG] = useState<number | null>(null);
    const [audioColorTM_2003_SNG, setaudioColorTM_2003_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTM_2003_SNG, setMaintainTM_2003_SNG] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTM_2003_SNG === "string" &&
            typeof LowTM_2003_SNG === "string" &&
            TM_2003_SNG !== null &&
            maintainTM_2003_SNG === false
        ) {
            const highValue = parseFloat(HighTM_2003_SNG);
            const lowValue = parseFloat(LowTM_2003_SNG);
            const TM_2003_SNGValue = parseFloat(TM_2003_SNG);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(TM_2003_SNGValue)
            ) {
                if (
                    highValue < TM_2003_SNGValue ||
                    TM_2003_SNGValue < lowValue
                ) {
                    if (!audioTM_2003_SNG) {
                        audioRef.current?.play();
                        setaudioTM_2003_SNG(true);
                        setaudioColorTM_2003_SNG(true);
                    }
                } else {
                    setaudioTM_2003_SNG(false);
                    setaudioColorTM_2003_SNG(false);
                }
            }
        }
    }, [
        HighTM_2003_SNG,
        TM_2003_SNG,
        audioTM_2003_SNG,
        LowTM_2003_SNG,
        maintainTM_2003_SNG,
    ]);

    useEffect(() => {
        if (audioTM_2003_SNG) {
            const audioEnded = () => {
                setaudioTM_2003_SNG(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTM_2003_SNG]);

    //================================ TM_2003_SNG ======================================================

    //================================ VP_301================================

    //================================ VP_301 ======================================================

    //================================ TT_2003================================

    const [audioTT_2003, setaudioTT_2003] = useState(false);
    const [HighTT_2003, setHighTT_2003] = useState<number | null>(null);
    const [LowTT_2003, setLowTT_2003] = useState<number | null>(null);
    const [audioColorTT_2003, setaudioColorTT_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTT_2003, setMaintainTT_2003] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTT_2003 === "string" &&
            typeof LowTT_2003 === "string" &&
            TT_2003 !== null &&
            maintainTT_2003 === false
        ) {
            const highValue = parseFloat(HighTT_2003);
            const lowValue = parseFloat(LowTT_2003);
            const TT_2003Value = parseFloat(TT_2003);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2003Value)) {
                if (highValue < TT_2003Value || TT_2003Value < lowValue) {
                    if (!audioTT_2003) {
                        audioRef.current?.play();
                        setaudioTT_2003(true);
                        setaudioColorTT_2003(true);
                    }
                } else {
                    setaudioTT_2003(false);
                    setaudioColorTT_2003(false);
                }
            }
        }
    }, [HighTT_2003, TT_2003, audioTT_2003, LowTT_2003, maintainTT_2003]);

    useEffect(() => {
        if (audioTT_2003) {
            const audioEnded = () => {
                setaudioTT_2003(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTT_2003]);

    //================================ TT_2003 ======================================================

    //================================ Pipe_Temp================================

    const [audioPipe_Temp, setaudioPipe_Temp] = useState(false);
    const [HighPipe_Temp, setHighPipe_Temp] = useState<number | null>(null);
    const [LowPipe_Temp, setLowPipe_Temp] = useState<number | null>(null);
    const [audioColorPipe_Temp, setaudioColorPipe_Temp] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPipe_Temp, setMaintainPipe_Temp] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPipe_Temp === "string" &&
            typeof LowPipe_Temp === "string" &&
            Pipe_Temp !== null &&
            maintainPipe_Temp === false
        ) {
            const highValue = parseFloat(HighPipe_Temp);
            const lowValue = parseFloat(LowPipe_Temp);
            const Pipe_TempValue = parseFloat(Pipe_Temp);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Pipe_TempValue)
            ) {
                if (highValue < Pipe_TempValue || Pipe_TempValue < lowValue) {
                    if (!audioPipe_Temp) {
                        audioRef.current?.play();
                        setaudioPipe_Temp(true);
                        setaudioColorPipe_Temp(true);
                    }
                } else {
                    setaudioPipe_Temp(false);
                    setaudioColorPipe_Temp(false);
                }
            }
        }
    }, [
        HighPipe_Temp,
        Pipe_Temp,
        audioPipe_Temp,
        LowPipe_Temp,
        maintainPipe_Temp,
    ]);

    useEffect(() => {
        if (audioPipe_Temp) {
            const audioEnded = () => {
                setaudioPipe_Temp(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPipe_Temp]);

    //================================ Pipe_Temp ======================================================
    //================================ Pipe_Press================================

    const [audioPipe_Press, setaudioPipe_Press] = useState(false);
    const [HighPipe_Press, setHighPipe_Press] = useState<number | null>(null);
    const [LowPipe_Press, setLowPipe_Press] = useState<number | null>(null);
    const [audioColorPipe_Press, setaudioColorPipe_Press] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPipe_Press, setMaintainPipe_Press] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPipe_Press === "string" &&
            typeof LowPipe_Press === "string" &&
            Pipe_Press !== null &&
            maintainPipe_Press === false
        ) {
            const highValue = parseFloat(HighPipe_Press);
            const lowValue = parseFloat(LowPipe_Press);
            const Pipe_PressValue = parseFloat(Pipe_Press);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Pipe_PressValue)
            ) {
                if (highValue < Pipe_PressValue || Pipe_PressValue < lowValue) {
                    if (!audioPipe_Press) {
                        audioRef.current?.play();
                        setaudioPipe_Press(true);
                        setaudioColorPipe_Press(true);
                    }
                } else {
                    setaudioPipe_Press(false);
                    setaudioColorPipe_Press(false);
                }
            }
        }
    }, [
        HighPipe_Press,
        Pipe_Press,
        audioPipe_Press,
        LowPipe_Press,
        maintainPipe_Press,
    ]);

    useEffect(() => {
        if (audioPipe_Press) {
            const audioEnded = () => {
                setaudioPipe_Press(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPipe_Press]);

    //================================ Pipe_Press ======================================================

    //================================ Pipe_Press================================

    const [audioFlow_Meter_Total, setaudioFlow_Meter_Total] = useState(false);
    const [HighFlow_Meter_Total, setHighFlow_Meter_Total] = useState<
        number | null
    >(null);
    const [LowFlow_Meter_Total, setLowFlow_Meter_Total] = useState<
        number | null
    >(null);
    const [audioColorFlow_Meter_Total, setaudioColorFlow_Meter_Total] =
        useState(false);

    const [maintainFlow_Meter_Total, setMaintainFlow_Meter_Total] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighFlow_Meter_Total === "string" &&
            typeof LowFlow_Meter_Total === "string" &&
            Flow_Meter_Total !== null &&
            maintainFlow_Meter_Total === false
        ) {
            const highValue = parseFloat(HighFlow_Meter_Total);
            const lowValue = parseFloat(LowFlow_Meter_Total);
            const Flow_Meter_TotalValue = parseFloat(Flow_Meter_Total);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Flow_Meter_TotalValue)
            ) {
                if (
                    highValue < Flow_Meter_TotalValue ||
                    Flow_Meter_TotalValue < lowValue
                ) {
                    if (!audioFlow_Meter_Total) {
                        audioRef.current?.play();
                        setaudioFlow_Meter_Total(true);
                        setaudioColorFlow_Meter_Total(true);
                    }
                } else {
                    setaudioFlow_Meter_Total(false);
                    setaudioColorFlow_Meter_Total(false);
                }
            }
        }
    }, [
        HighFlow_Meter_Total,
        Flow_Meter_Total,
        audioFlow_Meter_Total,
        LowFlow_Meter_Total,
        maintainFlow_Meter_Total,
    ]);

    useEffect(() => {
        if (audioFlow_Meter_Total) {
            const audioEnded = () => {
                setaudioFlow_Meter_Total(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioFlow_Meter_Total]);

    //================================ Flow_Meter_Total ======================================================

    //================================ Pipe_Press================================

    const [audioConsumption_Flow, setaudioConsumption_Flow] = useState(false);
    const [HighConsumption_Flow, setHighConsumption_Flow] = useState<
        number | null
    >(null);
    const [LowConsumption_Flow, setLowConsumption_Flow] = useState<
        number | null
    >(null);
    const [audioColorConsumption_Flow, setaudioColorConsumption_Flow] =
        useState(false);

    const [maintainConsumption_Flow, setMaintainConsumption_Flow] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighConsumption_Flow === "string" &&
            typeof LowConsumption_Flow === "string" &&
            Consumption_Flow !== null &&
            maintainConsumption_Flow === false
        ) {
            const highValue = parseFloat(HighConsumption_Flow);
            const lowValue = parseFloat(LowConsumption_Flow);
            const Consumption_FlowValue = parseFloat(Consumption_Flow);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Consumption_FlowValue)
            ) {
                if (
                    highValue < Consumption_FlowValue ||
                    Consumption_FlowValue < lowValue
                ) {
                    if (!audioConsumption_Flow) {
                        audioRef.current?.play();
                        setaudioConsumption_Flow(true);
                        setaudioColorConsumption_Flow(true);
                    }
                } else {
                    setaudioConsumption_Flow(false);
                    setaudioColorConsumption_Flow(false);
                }
            }
        }
    }, [
        HighConsumption_Flow,
        Consumption_Flow,
        audioConsumption_Flow,
        LowConsumption_Flow,
        maintainConsumption_Flow,
    ]);

    useEffect(() => {
        if (audioConsumption_Flow) {
            const audioEnded = () => {
                setaudioConsumption_Flow(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioConsumption_Flow]);

    //================================ Flow_Meter_Total ======================================================

    //================================ Pipe_Press================================

    const [audioFlow_Velocity, setaudioFlow_Velocity] = useState(false);
    const [HighFlow_Velocity, setHighFlow_Velocity] = useState<number | null>(
        null
    );
    const [LowFlow_Velocity, setLowFlow_Velocity] = useState<number | null>(
        null
    );
    const [audioColorFlow_Velocity, setaudioColorFlow_Velocity] =
        useState(false);

    const [maintainFlow_Velocity, setMaintainFlow_Velocity] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighFlow_Velocity === "string" &&
            typeof LowFlow_Velocity === "string" &&
            Flow_Velocity !== null &&
            maintainFlow_Velocity === false
        ) {
            const highValue = parseFloat(HighFlow_Velocity);
            const lowValue = parseFloat(LowFlow_Velocity);
            const Flow_VelocityValue = parseFloat(Flow_Velocity);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Flow_VelocityValue)
            ) {
                if (
                    highValue < Flow_VelocityValue ||
                    Flow_VelocityValue < lowValue
                ) {
                    if (!audioFlow_Velocity) {
                        audioRef.current?.play();
                        setaudioFlow_Velocity(true);
                        setaudioColorFlow_Velocity(true);
                    }
                } else {
                    setaudioFlow_Velocity(false);
                    setaudioColorFlow_Velocity(false);
                }
            }
        }
    }, [
        HighFlow_Velocity,
        Flow_Velocity,
        audioFlow_Velocity,
        LowFlow_Velocity,
        maintainFlow_Velocity,
    ]);

    useEffect(() => {
        if (audioFlow_Velocity) {
            const audioEnded = () => {
                setaudioFlow_Velocity(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioFlow_Velocity]);

    //================================ Flow_Meter_Total ======================================================

    const [audioTT_2004, setaudioTT_2004] = useState(false);
    const [HighTT_2004, setHighTT_2004] = useState<number | null>(null);
    const [LowTT_2004, setLowTT_2004] = useState<number | null>(null);
    const [audioColorTT_2004, setaudioColorTT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTT_2004, setMaintainTT_2004] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTT_2004 === "string" &&
            typeof LowTT_2004 === "string" &&
            TT_2004 !== null &&
            maintainTT_2004 === false
        ) {
            const highValue = parseFloat(HighTT_2004);
            const lowValue = parseFloat(LowTT_2004);
            const TT_2004Value = parseFloat(TT_2004);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2004Value)) {
                if (highValue < TT_2004Value || TT_2004Value < lowValue) {
                    if (!audioTT_2004) {
                        audioRef.current?.play();
                        setaudioTT_2004(true);
                        setaudioColorTT_2004(true);
                    }
                } else {
                    setaudioTT_2004(false);
                    setaudioColorTT_2004(false);
                }
            }
        }
    }, [HighTT_2004, TT_2004, audioTT_2004, LowTT_2004, maintainTT_2004]);

    useEffect(() => {
        if (audioTT_2004) {
            const audioEnded = () => {
                setaudioTT_2004(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTT_2004]);

    //================================ TT_2004======================================================

    const [audioFCV_2001, setaudioFCV_2001] = useState(false);
    const [HighFCV_2001, setHighFCV_2001] = useState<number | null>(null);
    const [LowFCV_2001, setLowFCV_2001] = useState<number | null>(null);
    const [audioColorFCV_2001, setaudioColorFCV_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainFCV_2001, setMaintainFCV_2001] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighFCV_2001 === "string" &&
            typeof LowFCV_2001 === "string" &&
            FCV_2001 !== null &&
            maintainFCV_2001 === false
        ) {
            const highValue = parseFloat(HighFCV_2001);
            const lowValue = parseFloat(LowFCV_2001);
            const FCV_2001Value = parseFloat(FCV_2001);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(FCV_2001Value)
            ) {
                if (highValue < FCV_2001Value || FCV_2001Value < lowValue) {
                    if (!audioFCV_2001) {
                        audioRef.current?.play();
                        setaudioFCV_2001(true);
                        setaudioColorFCV_2001(true);
                    }
                } else {
                    setaudioFCV_2001(false);
                    setaudioColorFCV_2001(false);
                }
            }
        }
    }, [HighFCV_2001, FCV_2001, audioFCV_2001, LowFCV_2001, maintainFCV_2001]);

    useEffect(() => {
        if (audioFCV_2001) {
            const audioEnded = () => {
                setaudioFCV_2001(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioFCV_2001]);

    //================================ FCV_2001======================================================

    //================================ WB_1001================================

    const [audioWB_1001, setaudioWB_1001] = useState(false);
    const [HighWB_1001, setHighWB_1001] = useState<number | null>(null);
    const [LowWB_1001, setLowWB_1001] = useState<number | null>(null);
    const [audioColorWB_1001, setaudioColorWB_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainWB_1001, setMaintainWB_1001] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighWB_1001 === "string" &&
            typeof LowWB_1001 === "string" &&
            WB_1001 !== null &&
            maintainWB_1001 === false
        ) {
            const highValue = parseFloat(HighWB_1001);
            const lowValue = parseFloat(LowWB_1001);
            const WB_1001Value = parseFloat(WB_1001);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WB_1001Value)) {
                if (highValue < WB_1001Value || WB_1001Value < lowValue) {
                    if (!audioWB_1001) {
                        audioRef.current?.play();
                        setaudioWB_1001(true);
                        setaudioColorWB_1001(true);
                    }
                } else {
                    setaudioWB_1001(false);
                    setaudioColorWB_1001(false);
                }
            }
        }
    }, [HighWB_1001, WB_1001, audioWB_1001, LowWB_1001, maintainWB_1001]);

    useEffect(() => {
        if (audioWB_1001) {
            const audioEnded = () => {
                setaudioWB_1001(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioWB_1001]);

    //================================ WB_1001 ======================================================

    const [audioWB_Setpoint, setaudioWB_Setpoint] = useState(false);
    const [HighWB_Setpoint, setHighWB_Setpoint] = useState<number | null>(null);
    const [LowWB_Setpoint, setLowWB_Setpoint] = useState<number | null>(null);
    const [audioColorWB_Setpoint, setaudioColorWB_Setpoint] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainWB_Setpoint, setMaintainWB_Setpoint] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighWB_Setpoint === "string" &&
            typeof LowWB_Setpoint === "string" &&
            WB_Setpoint !== null &&
            maintainWB_Setpoint === false
        ) {
            const highValue = parseFloat(HighWB_Setpoint);
            const lowValue = parseFloat(LowWB_Setpoint);
            const WB_SetpointValue = parseFloat(WB_Setpoint);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(WB_SetpointValue)
            ) {
                if (
                    highValue < WB_SetpointValue ||
                    WB_SetpointValue < lowValue
                ) {
                    if (!audioWB_Setpoint) {
                        audioRef.current?.play();
                        setaudioWB_Setpoint(true);
                        setaudioColorWB_Setpoint(true);
                    }
                } else {
                    setaudioWB_Setpoint(false);
                    setaudioColorWB_Setpoint(false);
                }
            }
        }
    }, [
        HighWB_Setpoint,
        WB_Setpoint,
        audioWB_Setpoint,
        LowWB_Setpoint,
        maintainWB_Setpoint,
    ]);

    useEffect(() => {
        if (audioWB_Setpoint) {
            const audioEnded = () => {
                setaudioWB_Setpoint(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioWB_Setpoint]);

    //================================ WB_Setpoint======================================================
    const [audioHV_1001, setaudioHV_1001] = useState(false);
    const [HighHV_1001, setHighHV_1001] = useState<number | null>(null);
    const [LowHV_1001, setLowHV_1001] = useState<number | null>(null);
    const [audioColorHV_1001, setaudioColorHV_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainHV_1001, setMaintainHV_1001] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighHV_1001 === "string" &&
            typeof LowHV_1001 === "string" &&
            HV_1001 !== null &&
            maintainHV_1001 === false
        ) {
            const highValue = parseFloat(HighHV_1001);
            const lowValue = parseFloat(LowHV_1001);
            const HV_1001Value = parseFloat(HV_1001);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HV_1001Value)) {
                if (highValue < HV_1001Value || HV_1001Value < lowValue) {
                    if (!audioHV_1001) {
                        audioRef.current?.play();
                        setaudioHV_1001(true);
                        setaudioColorHV_1001(true);
                    }
                } else {
                    setaudioHV_1001(false);
                    setaudioColorHV_1001(false);
                }
            }
        }
    }, [HighHV_1001, HV_1001, audioHV_1001, LowHV_1001, maintainHV_1001]);

    useEffect(() => {
        if (audioHV_1001) {
            const audioEnded = () => {
                setaudioHV_1001(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioHV_1001]);

    //================================ HV_1001======================================================
    const [audioRATIO_MODE, setaudioRATIO_MODE] = useState(false);
    const [HighRATIO_MODE, setHighRATIO_MODE] = useState<number | null>(null);
    const [LowRATIO_MODE, setLowRATIO_MODE] = useState<number | null>(null);
    const [audioColorRATIO_MODE, setaudioColorRATIO_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainRATIO_MODE, setMaintainRATIO_MODE] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighRATIO_MODE === "string" &&
            typeof LowRATIO_MODE === "string" &&
            RATIO_MODE !== null &&
            maintainRATIO_MODE === false
        ) {
            const highValue = parseFloat(HighRATIO_MODE);
            const lowValue = parseFloat(LowRATIO_MODE);
            const RATIO_MODEValue = parseFloat(RATIO_MODE);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(RATIO_MODEValue)
            ) {
                if (highValue < RATIO_MODEValue || RATIO_MODEValue < lowValue) {
                    if (!audioRATIO_MODE) {
                        audioRef.current?.play();
                        setaudioRATIO_MODE(true);
                        setaudioColorRATIO_MODE(true);
                    }
                } else {
                    setaudioRATIO_MODE(false);
                    setaudioColorRATIO_MODE(false);
                }
            }
        }
    }, [
        HighRATIO_MODE,
        RATIO_MODE,
        audioRATIO_MODE,
        LowRATIO_MODE,
        maintainRATIO_MODE,
    ]);

    useEffect(() => {
        if (audioRATIO_MODE) {
            const audioEnded = () => {
                setaudioRATIO_MODE(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioRATIO_MODE]);

    //================================ RATIO_MODE======================================================

    const [audioFCV_MODE, setaudioFCV_MODE] = useState(false);
    const [HighFCV_MODE, setHighFCV_MODE] = useState<number | null>(null);
    const [LowFCV_MODE, setLowFCV_MODE] = useState<number | null>(null);
    const [audioColorFCV_MODE, setaudioColorFCV_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainFCV_MODE, setMaintainFCV_MODE] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighFCV_MODE === "string" &&
            typeof LowFCV_MODE === "string" &&
            FCV_MODE !== null &&
            maintainFCV_MODE === false
        ) {
            const highValue = parseFloat(HighFCV_MODE);
            const lowValue = parseFloat(LowFCV_MODE);
            const FCV_MODEValue = parseFloat(FCV_MODE);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(FCV_MODEValue)
            ) {
                if (highValue < FCV_MODEValue || FCV_MODEValue < lowValue) {
                    if (!audioFCV_MODE) {
                        audioRef.current?.play();
                        setaudioFCV_MODE(true);
                        setaudioColorFCV_MODE(true);
                    }
                } else {
                    setaudioFCV_MODE(false);
                    setaudioColorFCV_MODE(false);
                }
            }
        }
    }, [HighFCV_MODE, FCV_MODE, audioFCV_MODE, LowFCV_MODE, maintainFCV_MODE]);

    useEffect(() => {
        if (audioFCV_MODE) {
            const audioEnded = () => {
                setaudioFCV_MODE(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioFCV_MODE]);

    //================================ FCV_MODE======================================================
    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            // if (node.id === "timeUpdate3") {
            //     return {
            //         ...node,
            //         data: {
            //             ...node.data,
            //             label: (
            //                 <div
            //                     style={{
            //                         fontSize: 20,
            //                         fontWeight: 500,

            //                         display: "flex",
            //                     }}
            //                 >
            //                     <div>
            //                         <p
            //                             style={{
            //                                 color: "white",
            //                                 display: "flex",
            //                             }}
            //                         >
            //                             {" "}
            //                             PLC :{" "}
            //                         </p>
            //                     </div>

            //                     <div style={{}}>
            //                         <p style={{ marginLeft: 5 }}>
            //                             {PLC_STT == "1" ? (
            //                                 <span
            //                                     style={{
            //                                         color: "#25d125",
            //                                     }}
            //                                 >
            //                                     Connected
            //                                 </span>
            //                             ) : (
            //                                 <span
            //                                     style={{
            //                                         color: "#ff5656",
            //                                     }}
            //                                 >
            //                                     Disconnect
            //                                 </span>
            //                             )}
            //                         </p>
            //                     </div>
            //                     <div>
            //                         <p
            //                             style={{
            //                                 color: "white",

            //                                 fontSize: 20,
            //                                 marginLeft: 15,
            //                             }}
            //                         >
            //                             {PLC_STTValue}
            //                         </p>
            //                     </div>
            //                 </div>
            //             ),
            //         },
            //     };
            // }
            if (node.id === "PT_2004") {
                const roundedPT02 =
                    PT_2004 !== null ? parseFloat(PT_2004).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPT_2004 && !maintainPT_2004
                                            ? "#ff5656"
                                            : maintainPT_2004
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
                                        PIT-3005 :
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
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PT_2005") {
                const roundedPT02 =
                    PT_2005 !== null ? parseFloat(PT_2005).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPT_2005 && !maintainPT_2005
                                            ? "#ff5656"
                                            : maintainPT_2005
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
                                        PIT-3006 :
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
                                    L
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_2002_SNG") {
                const roundedPT02 =
                    TM_2002_SNG !== null
                        ? parseFloat(TM_2002_SNG).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorTM_2002_SNG &&
                                        !maintainTM_2002_SNG
                                            ? "#ff5656"
                                            : maintainTM_2002_SNG
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
                                        {ValueGas.TM_2002_SNG} :
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
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_2003_SNG") {
                const roundedPT02 =
                    TM_2003_SNG !== null
                        ? parseFloat(TM_2003_SNG).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorTM_2003_SNG &&
                                        !maintainTM_2003_SNG
                                            ? "#ff5656"
                                            : maintainTM_2003_SNG
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
                                        {ValueGas.TM_2003_SNG} :
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
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_2003") {
                const roundedPT02 =
                    TT_2003 !== null ? parseFloat(TT_2003).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorTT_2003 && !maintainTT_2003
                                            ? "#ff5656"
                                            : maintainTT_2003
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
                                        TT-3003 :
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
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_2004") {
                const roundedPT02 =
                    TT_2004 !== null ? parseFloat(TT_2004).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorTT_2004 && !maintainTT_2004
                                            ? "#ff5656"
                                            : maintainTT_2004
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
                                        TT-3004 :
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
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV === "1"
                                    ? SVD_NO
                                    : SDV === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FCV_2001") {
                const roundedPT02 =
                    FCV_2001 !== null ? parseFloat(FCV_2001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorFCV_2001 && !maintainFCV_2001
                                            ? "#ff5656"
                                            : maintainFCV_2001
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
                                        FCV-3001 :
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
                                    %
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "WB_1001") {
                const roundedPT02 =
                    WB_1001 !== null ? parseFloat(WB_1001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorWB_1001 && !maintainWB_1001
                                            ? "#ff5656"
                                            : maintainWB_1001
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
                                        WB-3001 :
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
                                    MJ/Sm3
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "WB_Setpoint") {
                const roundedPT02 =
                    WB_Setpoint !== null
                        ? parseFloat(WB_Setpoint).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorWB_Setpoint &&
                                        !maintainWB_Setpoint
                                            ? "#ff5656"
                                            : maintainWB_Setpoint
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        SET POINT
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 5,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                    <p
                                        style={{
                                            color: colorNameValue,
                                            position: "relative",
                                        }}
                                    >
                                        MJ/Sm3
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "HV_1001") {
                const roundedPT02 =
                    HV_1001 !== null ? parseFloat(HV_1001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorHV_1001 && !maintainHV_1001
                                            ? "#ff5656"
                                            : maintainHV_1001
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        HV REAL
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 5,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                    <p
                                        style={{
                                            color: colorNameValue,
                                            position: "relative",
                                        }}
                                    >
                                        MJ/Sm3
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "RATIO_MODE") {
                const roundedPT02 =
                    RATIO_MODE !== null
                        ? parseFloat(RATIO_MODE).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorRATIO_MODE &&
                                        !maintainRATIO_MODE
                                            ? "#ff5656"
                                            : maintainRATIO_MODE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        RATIO MODE
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",

                                        textAlign: "center",
                                        justifyContent: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    {RATIO_MODE === "0" ? (
                                        <div style={{ color: colorData }}>
                                            Manual
                                        </div>
                                    ) : (
                                        <div style={{ color: colorData }}>
                                            Auto
                                        </div>
                                    )}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FCV_MODE") {
                const roundedPT02 =
                    FCV_MODE !== null ? parseFloat(FCV_MODE).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorFCV_MODE && !maintainFCV_MODE
                                            ? "#ff5656"
                                            : maintainFCV_MODE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        FCV MODE
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",

                                        textAlign: "center",
                                        justifyContent: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    {FCV_MODE === "0" ? (
                                        <div style={{ color: colorData }}>
                                            Manual
                                        </div>
                                    ) : (
                                        <div style={{ color: colorData }}>
                                            Auto
                                        </div>
                                    )}
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
                                    fontSize: 18,
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
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: background,

                                            fontSize: 18,
                                            marginLeft: 15,
                                        }}
                                    >
                                        null
                                    </p>

                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 18,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PLC_STTValue}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }


            if (node.id === "percent") {
                return {
                    ...node,

                    data: {
                        ...node.data,
                        label: (
                            <div
                                className="column-chart"
                                style={{
                                    height: `${totalHeight}px`,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    width: "120px",
                                    position: "relative",
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column-reverse",
                                    }}
                                    className="column"
                                >
                                    <div
                                        className="id"
                                        style={{
                                            height: `${DataLPG}px`,
                                            width: "100%",
                                            textAlign: "center",
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#ff7f00",
                                            position: "absolute",
                                            top: "0",
                                        }}
                                    ></div>
                                    <div
                                        className="name"
                                        style={{
                                            height: `${DataAir}px`,
                                            width: "100%",
                                            textAlign: "center",
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "blue",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "DATA_LPG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div style={{ fontSize: "23px", fontWeight: 500 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    LPG
                                </p>

                                <p>{LPG} %</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "DATA_AIR") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div style={{ fontSize: "23px", fontWeight: 500 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    AIR
                                </p>

                                <p>{AIR} %</p>
                            </div>
                        ),
                    },
                };
            }

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionMEIKO");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
                AIR_INLET: { x: -2721.4692108086797, y: 2178.2907767624192 },
                Arrow1: { x: -1239.020658935167, y: 1537.2353073134132 },
                Arrow2: { x: -2246.4848054605154, y: 2163.170126568243 },
                Arrow3: { x: -2248.2397512254984, y: 1536.7414426555551 },
                Arrow4: { x: -1557.0888105506951, y: 2163.558085755739 },
                Arrow5: { x: -1566.4728623125252, y: 1536.6111860122028 },
                Arrow6: { x: -1991.4757732732585, y: 2163.2121664995484 },
                Arrow7: { x: -1984.5166487488032, y: 1536.691171840094 },
                Arrow8: { x: -1255.0116069020437, y: 2163.3701843909553 },
                Arrow9: { x: -2342.972586495079, y: 1868.4236338489889 },
                Arrow10: { x: -1142.531516958929, y: 1871.8272271253613 },
                Arrow11: { x: -972.1220766830197, y: 2014.4794086100776 },
                Arrow12: { x: -971.7810854275426, y: 1728.2651848777923 },
                BUFFER_TANK: { x: -1958.1757845426985, y: 1620.103924022733 },
                BUFFER_TANK_NAME: {
                    x: -1874.7436375336874,
                    y: 1617.0729924052746,
                },
                BallValue11: { x: -2562.687334970434, y: 1525.380959202904 },
                BallValue22: { x: -2568.3193414331317, y: 1857.5519670170406 },
                BallValue33: { x: -2565.343560648521, y: 2151.586409954696 },
                DATA_AIR: { x: -787.1794744946745, y: 2214.105613896207 },
                DATA_LPG: { x: -794.9699574379098, y: 1440.04907533999 },
                FCV_2001: { x: -1254.3812438605855, y: 2023.7863110251546 },
                FCV_BOTTOM: { x: -1168.803254788462, y: 2125.64217446725 },
                FCV_MODE: { x: -1132.3050547590105, y: 1256.5220916366088 },
                FCV_TOP: { x: -1308.5150887771715, y: 1507.9011102989418 },
                HV_1001: { x: -1962.3798384027098, y: 1257.7884339657485 },
                LPG_INLET: { x: -2719.878456811581, y: 1551.2475103920935 },
                LineTankLeft1: { x: -2526.8297727250642, y: 1895.1957023502964 },
                LineTankLeft2: { x: -1903.8600266450999, y: 1826.842413014107 },
                LineTankRight1: { x: -1611.644057434805, y: 1830.0526187533744 },
                LineTankRight2: { x: -920.551115995792, y: 1898.0333573875023 },
                MIXED_GAS_OUT: { x: -2723.1498211288877, y: 1866.5461610946509 },
                PCV_BOTTOM: { x: -1805.6040907182978, y: 2124.1143674165332 },
                PCV_TOP: { x: -1805.969879472551, y: 1499.8300133358384 },
                PSV01: { x: -2524.555753361747, y: 1396.1332968176719 },
                PSV01_IMG: { x: -2438.813095850789, y: 1509.5596531094666 },
                PSV02: { x: -2520.3740303520035, y: 2026.2666342841972 },
                PSV02_IMG: { x: -2437.4724669071406, y: 2135.119959178102 },
                PTV_BOTTOM: { x: -2434.736534286145, y: 2280.792696466395 },
                PTV_BOTTOM_COL: { x: -2434.736534286145, y: 2280.792696466395 },
                PTV_TOP: { x: -2434.736534286145, y: 2280.792696466395 },
                PTV_TOP_COL: { x: -2434.736534286145, y: 2280.792696466395 },
                PT_2004: { x: -2235.931274709016, y: 1396.3343394173278 },
                PT_2005: { x: -2231.444162009503, y: 2025.8739669330853 },
                PT_2005_BOTTOM: { x: -2151.853482122052, y: 1462.0794767738978 },
                PT_2005_BOTTOM_COL: {
                    x: -2112.3024448062247,
                    y: 2150.519770963608,
                },
                PT_2005_TOP: { x: -2144.4698414713403, y: 2088.5281306737793 },
                PT_2005_TOP_COL: {
                    x: -2119.2764056451915,
                    y: 1524.7964418784134,
                },
                RATIO_MODE: { x: -1410.6416464768204, y: 1256.368255138329 },
                SDV: { x: -1401.52488436053, y: 1832.5718544031654 },
                SDV_Name: { x: -1425.5257248610396, y: 1798.1112206166258 },
                TM_2002_SNG: { x: -1888.131178519121, y: 1398.176397881909 },
                TM_2003_SNG: { x: -1888.6614296514017, y: 2024.619337816509 },
                TOTAL_VOLUME: { x: -1687.4440455409626, y: 1257.580931640653 },
                TT_2003: { x: -1552.7725000031662, y: 1397.4615647145274 },
                TT_2004: { x: -1562.9435099464908, y: 2023.3170986034156 },
                Temperature_BOTTOM: {
                    x: -1450.8321181787871,
                    y: 2103.867900090218,
                },
                Temperature_BOTTOM_COL: {
                    x: -1421.4588626631796,
                    y: 1524.090167367983,
                },
                Temperature_TOP: {
                    x: -1444.3531433973876,
                    y: 1473.6968496650152,
                },
                Temperature_TOP_COL: {
                    x: -1428.5197678449044,
                    y: 2154.1174370168173,
                },
                WB_1001: { x: -1896.9232355027152, y: 1735.774769535127 },
                WB_Setpoint: { x: -2236.7052623296595, y: 1258.7416601549014 },
                borderWhite: { x: -2857.034393780186, y: 1153.4381617663353 },
                line1: { x: -2520.638664749054, y: 1563.7956401030622 },
                line2: { x: -945.3136370318025, y: 1897.7955179886687 },
                line3: { x: -2524.296141994977, y: 2189.2006419886534 },
                percent: { x: -802.620762343302, y: 1565.641363272772 },
                timeUpdate3: { x: -2820.484797907167, y: 1247.8726878582834 },
                AlarmCenter: {x: -800.5294119726459, y: 1246.647867192829},

          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================

        // ============================== line =========================================
        // {
        //     id: "timeUpdate3",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     display: "flex",
        //                     justifyContent: "space-between",
        //                     textAlign: "center",
        //                     alignItems: "center",
        //                 }}
        //             >
        //                 <div>
        //                     <p
        //                         style={{
        //                             fontSize: 60,
        //                             fontWeight: 500,
        //                             color: "#ffaa00",
        //                         }}
        //                     ></p>
        //                 </div>
        //             </div>
        //         ),
        //     },

        //     position: positions.timeUpdate3,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: 430,

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        {
            id: "Arrow4",
            position: positions.Arrow4,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow1",
            position: positions.Arrow1,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "Arrow2",
            position: positions.Arrow2,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow3",
            position: positions.Arrow3,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow5",
            position: positions.Arrow5,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow6",
            position: positions.Arrow6,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "Arrow7",
            position: positions.Arrow7,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow8",
            position: positions.Arrow8,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow9",
            position: positions.Arrow9,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow10",
            position: positions.Arrow10,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow11",
            position: positions.Arrow11,
            type: "custom",
            data: {
                label: <div>{arrowDown}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow12",
            position: positions.Arrow12,
            type: "custom",
            data: {
                label: <div>{arrowUp}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        //==========================================================================

        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ==============================================================================

        // ================================================================================
        {
            id: "PCV_TOP",
            position: positions.PCV_TOP,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PCV_BOTTOM",
            position: positions.PCV_BOTTOM,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "FCV_BOTTOM",
            position: positions.FCV_BOTTOM,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "LineTankRight1",
            position: positions.LineTankRight1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "LineTankRight2",
            position: positions.LineTankRight2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "LineTankLeft1",
            position: positions.LineTankLeft1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "LineTankLeft2",
            position: positions.LineTankLeft2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "BUFFER_TANK",
            position: positions.BUFFER_TANK,
            type: "custom",
            data: {
                label: <div>{TankMeiko}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_2005_BOTTOM",
            position: positions.PT_2005_BOTTOM,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_2005_TOP",
            position: positions.PT_2005_TOP,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_2005_BOTTOM_COL",
            position: positions.PT_2005_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:99999,

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 50, background: "blue" },
        },

        {
            id: "PT_2005_TOP_COL",
            position: positions.PT_2005_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:99999,
            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "#ff7f00",
            },
        },

        {
            id: "Temperature_TOP_COL",
            position: positions.Temperature_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:99999,
            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 50, background: "blue" },
        },

        {
            id: "Temperature_BOTTOM_COL",
            position: positions.Temperature_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:99999,

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "#ff7f00",
            },
        },

        {
            id: "Temperature_TOP",
            position: positions.Temperature_TOP,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Temperature_BOTTOM",
            position: positions.Temperature_BOTTOM,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "BUFFER_TANK_NAME",
            position: positions.BUFFER_TANK_NAME,
            type: "custom",
            data: {
                label: <div>BUFFER TANK </div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 250,
                height: 10,
                background: "none",
                fontSize: 30,
                fontWeight: 600,
                color: "white",
            },
        },

        {
            id: "BallValue11",
            position: positions.BallValue11,
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
            id: "BallValue22",
            position: positions.BallValue22,
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
            id: "BallValue33",
            position: positions.BallValue33,
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
            id: "PT_2004",
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
            position: positions.PT_2004,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "PT_2005",
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
            position: positions.PT_2005,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TM_2002_SNG",
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
            position: positions.TM_2002_SNG,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TM_2003_SNG",
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
            position: positions.TM_2003_SNG,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TT_2004",
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
            position: positions.TT_2004,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TT_2003",
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
            position: positions.TT_2003,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "FCV_2001",
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
            position: positions.FCV_2001,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "WB_1001",
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
            position: positions.WB_1001,
            zIndex:99999,
            style: {
                border: background,
                width: 300,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "SDV_Name",
            position: positions.SDV_Name,
            type: "custom",
            data: {
                label: <div>SDV-3004</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "LPG_INLET",
            position: positions.LPG_INLET,
            type: "custom",
            data: {
                label: <div>LPG INLET</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "MIXED_GAS_OUT",
            position: positions.MIXED_GAS_OUT,
            type: "custom",
            data: {
                label: <div>MIXED GAS OUT</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "AIR_INLET",
            position: positions.AIR_INLET,
            type: "custom",
            data: {
                label: <div>AIR INLET</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "SDV",
            position: positions.SDV,
            type: "custom",
            data: {
                label: <div>111</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PSV01",
            position: positions.PSV01,
            type: "custom",
            data: {
                label: (
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PSV01 />
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
            id: "PSV02",
            position: positions.PSV02,
            type: "custom",
            data: {
                label: (
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PSV02 />
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
            id: "PSV01_IMG",
            position: positions.PSV01_IMG,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={70}
                            height={70}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PSV02_IMG",
            position: positions.PSV02_IMG,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={70}
                            height={70}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "WB_Setpoint",
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
            position: positions.WB_Setpoint,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "HV_1001",
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
            position: positions.HV_1001,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "RATIO_MODE",
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
            position: positions.RATIO_MODE,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "FCV_MODE",
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
            position: positions.FCV_MODE,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TOTAL_VOLUME",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        TOTAL VOLUME
                        <div style={{marginTop:10}}>Waiting...</div>
                    </div>
                ),
            },
            position: positions.TOTAL_VOLUME,

            style: {
                border: background,
                width: 250,
                height: 103,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "borderWhite",
            data: {
                label: (
                    <div
                        style={{
                            color: line,
                            fontSize: 50,
                            fontWeight: 600,
                        }}
                    >
                        SNG HUNG YEN
                    </div>
                ),
            },
            position: positions.borderWhite,

            style: {
                background: background,
                border: "1px solid white",
                width: 500,
                height: 200,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },

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
                width: 430,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "percent",
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
            position: positions.percent,

            style: {
                background: "none",
                border: "none",
                width: 0,
                height: 0,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "DATA_LPG",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        LPG
                    </div>
                ),
            },
            position: positions.DATA_LPG,

            style: {
                background: borderBox,
                border: borderBox,
                width: 120,
                height: 120,
                borderRadius: 100,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "DATA_AIR",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        AIR
                    </div>
                ),
            },
            position: positions.DATA_AIR,

            style: {
                background: borderBox,
                border: borderBox,
                width: 120,
                height: 120,
                borderRadius: 100,
            },
            targetPosition: Position.Bottom,
        },


        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <AlarmSNG_HUNGYEN />
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

                if (id === "Arrow1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow1: position,
                    }));
                } else if (id === "Arrow2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow2: position,
                    }));
                } else if (id === "Arrow3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow3: position,
                    }));
                } else if (id === "Arrow4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow4: position,
                    }));
                } else if (id === "Arrow8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow8: position,
                    }));
                } else if (id === "Arrow5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow5: position,
                    }));
                } else if (id === "Arrow6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow6: position,
                    }));
                } else if (id === "Arrow7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow7: position,
                    }));
                } else if (id === "Arrow9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow9: position,
                    }));
                } else if (id === "Arrow10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow10: position,
                    }));
                } else if (id === "Arrow11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow11: position,
                    }));
                } else if (id === "Arrow12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow12: position,
                    }));
                } else if (id === "line1") {
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
                } else if (id === "BUFFER_TANK") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BUFFER_TANK: position,
                    }));
                } else if (id === "LineTankLeft1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankLeft1: position,
                    }));
                } else if (id === "LineTankLeft2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankLeft2: position,
                    }));
                } else if (id === "LineTankRight1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankRight1: position,
                    }));
                } else if (id === "LineTankRight2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankRight2: position,
                    }));
                } else if (id === "BUFFER_TANK_NAME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BUFFER_TANK_NAME: position,
                    }));
                } else if (id === "PT_2005_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2005_BOTTOM: position,
                    }));
                } else if (id === "PT_2005_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2005_TOP: position,
                    }));
                } else if (id === "PT_2005_BOTTOM_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2005_BOTTOM_COL: position,
                    }));
                } else if (id === "PT_2005_TOP_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2005_TOP_COL: position,
                    }));
                } else if (id === "Temperature_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_TOP: position,
                    }));
                } else if (id === "Temperature_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_BOTTOM: position,
                    }));
                } else if (id === "Temperature_TOP_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_TOP_COL: position,
                    }));
                } else if (id === "Temperature_BOTTOM_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_BOTTOM_COL: position,
                    }));
                } else if (id === "PCV_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_TOP: position,
                    }));
                } else if (id === "PCV_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_BOTTOM: position,
                    }));
                } else if (id === "FCV_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_TOP: position,
                    }));
                } else if (id === "FCV_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_BOTTOM: position,
                    }));
                } else if (id === "BallValue11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue11: position,
                    }));
                } else if (id === "BallValue22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue22: position,
                    }));
                } else if (id === "BallValue33") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue33: position,
                    }));
                } else if (id === "PT_2004") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2004: position,
                    }));
                } else if (id === "PT_2005") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2005: position,
                    }));
                } else if (id === "TM_2002_SNG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM_2002_SNG: position,
                    }));
                } else if (id === "TM_2003_SNG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM_2003_SNG: position,
                    }));
                } else if (id === "TT_2003") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2003: position,
                    }));
                } else if (id === "TT_2004") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2004: position,
                    }));
                } else if (id === "FCV_2001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_2001: position,
                    }));
                } else if (id === "SDV_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Name: position,
                    }));
                } else if (id === "SDV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV: position,
                    }));
                } else if (id === "WB_1001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        WB_1001: position,
                    }));
                } else if (id === "PSV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01: position,
                    }));
                } else if (id === "PSV02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV02: position,
                    }));
                } else if (id === "PSV01_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01_IMG: position,
                    }));
                } else if (id === "PSV02_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV02_IMG: position,
                    }));
                } else if (id === "WB_Setpoint") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        WB_Setpoint: position,
                    }));
                } else if (id === "HV_1001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        HV_1001: position,
                    }));
                } else if (id === "RATIO_MODE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        RATIO_MODE: position,
                    }));
                } else if (id === "TOTAL_VOLUME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TOTAL_VOLUME: position,
                    }));
                } else if (id === "FCV_MODE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_MODE: position,
                    }));
                } else if (id === "LPG_INLET") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LPG_INLET: position,
                    }));
                } else if (id === "MIXED_GAS_OUT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        MIXED_GAS_OUT: position,
                    }));
                } else if (id === "AIR_INLET") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AIR_INLET: position,
                    }));
                } else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                }
                //========================== pit line 1 =========================

                else if (id === "percent") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        percent: position,
                    }));
                } else if (id === "DATA_LPG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        DATA_LPG: position,
                    }));
                } else if (id === "DATA_AIR") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        DATA_AIR: position,
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
    //     localStorage.setItem("positionMEIKO", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
            <div
                style={{
                    // width: "100%",
                    height: "100%",
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
        </>
    );
}
1;
