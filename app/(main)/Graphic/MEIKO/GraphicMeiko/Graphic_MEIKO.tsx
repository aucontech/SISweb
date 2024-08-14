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
import BallVavle_Line2_Top from "../BallVavlueMEIKO/BallVavle_Line2_Top";
import BallVavle_Line2_Bottom from "../BallVavlueMEIKO/BallVavle_Line2_Bottom";
import Image from "next/image";
import "./ForCssGraphic.css"
import {
    ArrowRight,
    BlackTriangle,
    GD,
    GaugeTemperature,
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
    arrowLeft,
    gaugePM,
    icon20,
    icon40,
} from "./iconSVG";
import BallVavle_Line3_Top from "../BallVavlueMEIKO/BallVavle_Line3_Top";
import BallVavle_Line3_Bottom from "../BallVavlueMEIKO/BallVavle_Line3_Bottom";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { id_THACHTHAT } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";
import { BlackTriangleRight } from "@/app/(main)/PRU/GraphicPRU/iconSVG";
import AlarmMeiko from "@/layout/AlarmBell/AlarmMeiko";

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

export default function Graphic_MEIKO() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);
    const [VP_301, setVP_301] = useState<string | null>(null);

    const [Tank_01_Level, setTank_01_Level] = useState<string | null>(null);
    const [Tank_01_Volume, setTank_01_Volume] = useState<string | null>(null);
    const [Tank_01_Mass, setTank_01_Mass] = useState<string | null>(null);
    const [Tank_PT_301, setTank_PT_301] = useState<string | null>(null);
    const [Tank_TT_301, setTank_TT_301] = useState<string | null>(null);

    const [Pipe_Press, setPipe_Press] = useState<string | null>(null);
    const [Pipe_Temp, setPipe_Temp] = useState<any>();

    const [PCV_6001A, setPCV_6001A] = useState();
    const [PCV_6001B, setPCV_6001B] = useState();
    const [PCV_6002A, setPCV_6002A] = useState();
    const [PCV_6002B, setPCV_6002B] = useState();
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

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_THACHTHAT,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
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
                        Tank_01_Level: setTank_01_Level,
                        Tank_01_Volume: setTank_01_Volume,
                        Tank_01_Mass: setTank_01_Mass,
                        Tank_PT_301: setTank_PT_301,
                        Tank_TT_301: setTank_TT_301,
                        VP_301: setVP_301,
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
        Tank_01_Level: " Tank 01",
        Tank_01_Volume: "Volume",
        Tank_01_Mass: "Mass",
        Tank_PT_301: "PT 301",
        Tank_TT_301: "TT 301",
        VP_301: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "sm³/h",
        M3H: "m³/h",
        SM3: "sm³",
        M3: "m³",
        BAR: "Bara",
        CC: "°C",
        BARG: "%",
    };
    //================================ Tank_01_Level================================

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/values/attributes/SERVER_SCOPE`
            );

            const HighTank_01_Level = res.data.find(
                (item: any) => item.key === "Tank_01_Level_High"
            );
            setHighTank_01_Level(HighTank_01_Level?.value || null);
            const LowTank_01_Level = res.data.find(
                (item: any) => item.key === "Tank_01_Level_Low"
            );
            setLowTank_01_Level(LowTank_01_Level?.value || null);

            const MaintainTank_01_Level = res.data.find(
                (item: any) => item.key === "Tank_01_Level_Maintain"
            );
            setMaintainTank_01_Level(MaintainTank_01_Level?.value || false);
            //===========================================================================================

            const HighTank_01_Volume = res.data.find(
                (item: any) => item.key === "Tank_01_Volume_High"
            );
            setHighTank_01_Volume(HighTank_01_Volume?.value || null);
            const LowTank_01_Volume = res.data.find(
                (item: any) => item.key === "Tank_01_Volume_Low"
            );
            setLowTank_01_Volume(LowTank_01_Volume?.value || null);

            const MaintainTank_01_Volume = res.data.find(
                (item: any) => item.key === "Tank_01_Volume_Maintain"
            );
            setMaintainTank_01_Volume(MaintainTank_01_Volume?.value || false);
            //===========================================================================================

            const HighTank_01_Mass = res.data.find(
                (item: any) => item.key === "Tank_01_Mass_High"
            );
            setHighTank_01_Mass(HighTank_01_Mass?.value || null);
            const LowTank_01_Mass = res.data.find(
                (item: any) => item.key === "Tank_01_Mass_Low"
            );
            setLowTank_01_Mass(LowTank_01_Mass?.value || null);

            const Tank_01_Mass_Maintain = res.data.find(
                (item: any) => item.key === "Tank_01_Mass_Maintain"
            );
            setMaintainTank_01_Mass(Tank_01_Mass_Maintain?.value || false);

            //===========================================================================================

            const HighTank_PT_301 = res.data.find(
                (item: any) => item.key === "Tank_PT_301_High"
            );
            setHighTank_PT_301(HighTank_PT_301?.value || null);

            const LowTank_PT_301 = res.data.find(
                (item: any) => item.key === "Tank_PT_301_Low"
            );
            setLowTank_PT_301(LowTank_PT_301?.value || null);

            const Tank_PT_301_Maintain = res.data.find(
                (item: any) => item.key === "Tank_PT_301_Maintain"
            );
            setMaintainTank_PT_301(Tank_PT_301_Maintain?.value || false);
            //===========================================================================================

            const HighTank_TT_301 = res.data.find(
                (item: any) => item.key === "Tank_TT_301_High"
            );
            setHighTank_TT_301(HighTank_TT_301?.value || null);

            const LowTank_TT_301 = res.data.find(
                (item: any) => item.key === "Tank_TT_301_Low"
            );
            setLowTank_TT_301(LowTank_TT_301?.value || null);

            const Tank_TT_301_Maintain = res.data.find(
                (item: any) => item.key === "Tank_TT_301_Maintain"
            );
            setMaintainTank_TT_301(Tank_TT_301_Maintain?.value || false);

            //===========================================================================================

            const HighPipe_Temp = res.data.find(
                (item: any) => item.key === "Pipe_Temp_High"
            );
            setHighPipe_Temp(HighPipe_Temp?.value || null);

            const LowPipe_Temp = res.data.find(
                (item: any) => item.key === "Pipe_Temp_Low"
            );
            setLowPipe_Temp(LowPipe_Temp?.value || null);
            const Pipe_Temp_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Temp_Maintain"
            );
            setMaintainPipe_Temp(Pipe_Temp_Maintain?.value || false);

            //===========================================================================================

            const HighPipe_Press = res.data.find(
                (item: any) => item.key === "Pipe_Press_High"
            );
            setHighPipe_Press(HighPipe_Press?.value || null);

            const LowPipe_Press = res.data.find(
                (item: any) => item.key === "Pipe_Press_Low"
            );
            setLowPipe_Press(LowPipe_Press?.value || null);
            const Pipe_Press_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Press_Maintain"
            );
            setMaintainPipe_Press(Pipe_Press_Maintain?.value || false);

            //===========================================================================================

            const HighFlow_Meter_Total = res.data.find(
                (item: any) => item.key === "Flow_Meter_Total_High"
            );
            setHighFlow_Meter_Total(HighFlow_Meter_Total?.value || null);

            const LowFlow_Meter_Total = res.data.find(
                (item: any) => item.key === "Flow_Meter_Total_Low"
            );
            setLowFlow_Meter_Total(LowFlow_Meter_Total?.value || null);

            const Flow_Meter_Total_Maintain = res.data.find(
                (item: any) => item.key === "Flow_Meter_Total_Maintain"
            );
            setMaintainFlow_Meter_Total(
                Flow_Meter_Total_Maintain?.value || false
            );
            //===========================================================================================

            const HighConsumption_Flow = res.data.find(
                (item: any) => item.key === "Consumption_Flow_High"
            );
            setHighConsumption_Flow(HighConsumption_Flow?.value || null);

            const LowConsumption_Flow = res.data.find(
                (item: any) => item.key === "Consumption_Flow_Low"
            );
            setLowConsumption_Flow(LowConsumption_Flow?.value || null);

            const Consumption_Flow_Maintain = res.data.find(
                (item: any) => item.key === "Consumption_Flow_Maintain"
            );
            setMaintainConsumption_Flow(
                Consumption_Flow_Maintain?.value || false
            );
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
            setMaintainFlow_Velocity(
                Flow_Velocity_Maintain?.value || false
            );
            //===========================================================================================
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [audioTank_01_Level, setaudioTank_01_Level] = useState(false);
    const [HighTank_01_Level, setHighTank_01_Level] = useState<number | null>(
        null
    );
    const [LowTank_01_Level, setLowTank_01_Level] = useState<number | null>(
        null
    );
    const [audioColorTank_01_Level, setaudioColorTank_01_Level] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTank_01_Level, setMaintainTank_01_Level] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTank_01_Level === "string" &&
            typeof LowTank_01_Level === "string" &&
            Tank_01_Level !== null &&
            maintainTank_01_Level === false
        ) {
            const highValue = parseFloat(HighTank_01_Level);
            const lowValue = parseFloat(LowTank_01_Level);
            const Tank_01_LevelValue = parseFloat(Tank_01_Level);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Tank_01_LevelValue)
            ) {
                if (
                    highValue < Tank_01_LevelValue ||
                    Tank_01_LevelValue < lowValue
                ) {
                    if (!audioTank_01_Level) {
                        audioRef.current?.play();
                        setaudioTank_01_Level(true);
                        setaudioColorTank_01_Level(true);
                    }
                } else {
                    setaudioTank_01_Level(false);
                    setaudioColorTank_01_Level(false);
                }
            }
        }
    }, [
        HighTank_01_Level,
        Tank_01_Level,
        audioTank_01_Level,
        LowTank_01_Level,
        maintainTank_01_Level,
    ]);

    useEffect(() => {
        if (audioTank_01_Level) {
            const audioEnded = () => {
                setaudioTank_01_Level(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTank_01_Level]);

    //================================ Tank_01_Level======================================================

    //================================ Tank_01_Volume================================

    const [audioTank_01_Volume, setaudioTank_01_Volume] = useState(false);
    const [HighTank_01_Volume, setHighTank_01_Volume] = useState<number | null>(
        null
    );
    const [LowTank_01_Volume, setLowTank_01_Volume] = useState<number | null>(
        null
    );
    const [audioColorTank_01_Volume, setaudioColorTank_01_Volume] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTank_01_Volume, setMaintainTank_01_Volume] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTank_01_Volume === "string" &&
            typeof LowTank_01_Volume === "string" &&
            Tank_01_Volume !== null &&
            maintainTank_01_Volume === false
        ) {
            const highValue = parseFloat(HighTank_01_Volume);
            const lowValue = parseFloat(LowTank_01_Volume);
            const Tank_01_VolumeValue = parseFloat(Tank_01_Volume);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Tank_01_VolumeValue)
            ) {
                if (
                    highValue < Tank_01_VolumeValue ||
                    Tank_01_VolumeValue < lowValue
                ) {
                    if (!audioTank_01_Volume) {
                        audioRef.current?.play();
                        setaudioTank_01_Volume(true);
                        setaudioColorTank_01_Volume(true);
                    }
                } else {
                    setaudioTank_01_Volume(false);
                    setaudioColorTank_01_Volume(false);
                }
            }
        }
    }, [
        HighTank_01_Volume,
        Tank_01_Volume,
        audioTank_01_Volume,
        LowTank_01_Volume,
        maintainTank_01_Volume,
    ]);

    useEffect(() => {
        if (audioTank_01_Volume) {
            const audioEnded = () => {
                setaudioTank_01_Volume(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTank_01_Volume]);

    //================================ Tank_01_Volume ======================================================

    //================================ Tank_01_Mass================================

    const [audioTank_01_Mass, setaudioTank_01_Mass] = useState(false);
    const [HighTank_01_Mass, setHighTank_01_Mass] = useState<number | null>(
        null
    );
    const [LowTank_01_Mass, setLowTank_01_Mass] = useState<number | null>(null);
    const [audioColorTank_01_Mass, setaudioColorTank_01_Mass] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTank_01_Mass, setMaintainTank_01_Mass] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTank_01_Mass === "string" &&
            typeof LowTank_01_Mass === "string" &&
            Tank_01_Mass !== null &&
            maintainTank_01_Mass === false
        ) {
            const highValue = parseFloat(HighTank_01_Mass);
            const lowValue = parseFloat(LowTank_01_Mass);
            const Tank_01_MassValue = parseFloat(Tank_01_Mass);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Tank_01_MassValue)
            ) {
                if (
                    highValue < Tank_01_MassValue ||
                    Tank_01_MassValue < lowValue
                ) {
                    if (!audioTank_01_Mass) {
                        audioRef.current?.play();
                        setaudioTank_01_Mass(true);
                        setaudioColorTank_01_Mass(true);
                    }
                } else {
                    setaudioTank_01_Mass(false);
                    setaudioColorTank_01_Mass(false);
                }
            }
        }
    }, [
        HighTank_01_Mass,
        Tank_01_Mass,
        audioTank_01_Mass,
        LowTank_01_Mass,
        maintainTank_01_Mass,
    ]);

    useEffect(() => {
        if (audioTank_01_Mass) {
            const audioEnded = () => {
                setaudioTank_01_Mass(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTank_01_Mass]);

    //================================ Tank_01_Mass ======================================================

    //================================ Tank_PT_301================================

    const [audioTank_PT_301, setaudioTank_PT_301] = useState(false);
    const [HighTank_PT_301, setHighTank_PT_301] = useState<number | null>(null);
    const [LowTank_PT_301, setLowTank_PT_301] = useState<number | null>(null);
    const [audioColorTank_PT_301, setaudioColorTank_PT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTank_PT_301, setMaintainTank_PT_301] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTank_PT_301 === "string" &&
            typeof LowTank_PT_301 === "string" &&
            Tank_PT_301 !== null &&
            maintainTank_PT_301 === false
        ) {
            const highValue = parseFloat(HighTank_PT_301);
            const lowValue = parseFloat(LowTank_PT_301);
            const Tank_PT_301Value = parseFloat(Tank_PT_301);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Tank_PT_301Value)
            ) {
                if (
                    highValue < Tank_PT_301Value ||
                    Tank_PT_301Value < lowValue
                ) {
                    if (!audioTank_PT_301) {
                        audioRef.current?.play();
                        setaudioTank_PT_301(true);
                        setaudioColorTank_PT_301(true);
                    }
                } else {
                    setaudioTank_PT_301(false);
                    setaudioColorTank_PT_301(false);
                }
            }
        }
    }, [
        HighTank_PT_301,
        Tank_PT_301,
        audioTank_PT_301,
        LowTank_PT_301,
        maintainTank_PT_301,
    ]);

    useEffect(() => {
        if (audioTank_PT_301) {
            const audioEnded = () => {
                setaudioTank_PT_301(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTank_PT_301]);

    //================================ Tank_PT_301 ======================================================

    //================================ VP_301================================

    //================================ VP_301 ======================================================

    //================================ Tank_TT_301================================

    const [audioTank_TT_301, setaudioTank_TT_301] = useState(false);
    const [HighTank_TT_301, setHighTank_TT_301] = useState<number | null>(null);
    const [LowTank_TT_301, setLowTank_TT_301] = useState<number | null>(null);
    const [audioColorTank_TT_301, setaudioColorTank_TT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTank_TT_301, setMaintainTank_TT_301] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTank_TT_301 === "string" &&
            typeof LowTank_TT_301 === "string" &&
            Tank_TT_301 !== null &&
            maintainTank_TT_301 === false
        ) {
            const highValue = parseFloat(HighTank_TT_301);
            const lowValue = parseFloat(LowTank_TT_301);
            const Tank_TT_301Value = parseFloat(Tank_TT_301);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Tank_TT_301Value)
            ) {
                if (
                    highValue < Tank_TT_301Value ||
                    Tank_TT_301Value < lowValue
                ) {
                    if (!audioTank_TT_301) {
                        audioRef.current?.play();
                        setaudioTank_TT_301(true);
                        setaudioColorTank_TT_301(true);
                    }
                } else {
                    setaudioTank_TT_301(false);
                    setaudioColorTank_TT_301(false);
                }
            }
        }
    }, [
        HighTank_TT_301,
        Tank_TT_301,
        audioTank_TT_301,
        LowTank_TT_301,
        maintainTank_TT_301,
    ]);

    useEffect(() => {
        if (audioTank_TT_301) {
            const audioEnded = () => {
                setaudioTank_TT_301(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTank_TT_301]);

    //================================ Tank_TT_301 ======================================================

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

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "Tank_01_Level") {
                const roundedPT02 =
                    Tank_01_Level !== null
                        ? parseFloat(Tank_01_Level).toFixed(2)
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
                                        audioColorTank_01_Level &&
                                        !maintainTank_01_Level
                                            ? "#ff5656"
                                            : maintainTank_01_Level
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
                                        {ValueGas.Tank_01_Level} :
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
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Tank_01_Volume_DATA") {
                const roundedPT02 =
                    Tank_01_Volume !== null
                        ? parseFloat(Tank_01_Volume).toFixed(2)
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
                                        audioColorTank_01_Volume &&
                                        !maintainTank_01_Volume
                                            ? "#ff5656"
                                            : maintainTank_01_Volume
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
                                        {ValueGas.Tank_01_Volume} :
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

            if (node.id === "Tank_01_Mass_DATA") {
                const roundedPT02 =
                    Tank_01_Mass !== null
                        ? parseFloat(Tank_01_Mass).toFixed(2)
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
                                        audioColorTank_01_Mass &&
                                        !maintainTank_01_Mass
                                            ? "#ff5656"
                                            : maintainTank_01_Mass
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
                                        {ValueGas.Tank_01_Mass} :
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
                                    Kg
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Tank_PT_301_DATA") {
                const roundedPT02 =
                    Tank_PT_301 !== null
                        ? parseFloat(Tank_PT_301).toFixed(2)
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
                                        audioColorTank_PT_301 &&
                                        !maintainTank_PT_301
                                            ? "#ff5656"
                                            : maintainTank_PT_301
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
                                        {ValueGas.Tank_PT_301} :
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
                                    Bar
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Tank_TT_301_DATA") {
                const roundedPT02 =
                    Tank_TT_301 !== null
                        ? parseFloat(Tank_TT_301).toFixed(2)
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
                                        audioColorTank_TT_301 &&
                                        !maintainTank_TT_301
                                            ? "#ff5656"
                                            : maintainTank_TT_301
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
                                        {ValueGas.Tank_TT_301} :
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

            if (node.id === "TT_LINE3_TOP_DATA") {
                const roundedPT02 =
                    Pipe_Temp !== null ? parseFloat(Pipe_Temp).toFixed(2) : "";

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
                                        audioColorPipe_Temp &&
                                        !maintainPipe_Temp
                                            ? "#ff5656"
                                            : maintainPipe_Temp
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
                                        {ValueGas.EVC_01_Temperature} :
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
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_LINE3_BOTTOM_DATA") {
                const roundedPT02 =
                    Pipe_Press !== null
                        ? parseFloat(Pipe_Press).toFixed(2)
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
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPipe_Press &&
                                        !maintainPipe_Press
                                            ? "#ff5656"
                                            : maintainPipe_Press
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
                                        {ValueGas.EVC_02_Temperature} :
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
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6002A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6002B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GAUGE1_DATA") {
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
                                        audioColorPipe_Temp &&
                                        !maintainPipe_Temp
                                            ? "#ff5656"
                                            : audioColorPipe_Temp
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>TT-301</p>
                                <p style={{ color: colorData }}> {Pipe_Temp}</p>
                                <p style={{ color: colorNameValue }}>°C</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GAUGE2_DATA") {
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
                                        audioColorPipe_Press &&
                                        !maintainPipe_Press
                                            ? "#ff5656"
                                            : maintainPipe_Press
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>PT-301</p>
                                <p style={{ color: colorData }}>{Pipe_Press}</p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "VP") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_301 === "1"
                                    ? VP_ON
                                    : VP_301 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "VP2") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_302 === "1"
                                    ? VP_ON
                                    : VP_302 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "VP3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_303 === "1"
                                    ? VP_ON
                                    : VP_303 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_301") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV_301 === "1"
                                    ? SVD_NO
                                    : SDV_301 === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_302") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV_302 === "1"
                                    ? SVD_NO
                                    : SDV_302 === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }
            {
                icon40;
            }

            if (node.id === "GD_101") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_101_High === "0" && GD_101_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: Normal
                                    </span>
                                ) : GD_101_High === "0" &&
                                  GD_101_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 20%
                                    </span>
                                ) : GD_101_High === "1" &&
                                  GD_101_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 40%
                                    </span>
                                ) : GD_101_High === "1" &&
                                  GD_101_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GD_102") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_102_High === "0" && GD_102_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: Normal
                                    </span>
                                ) : GD_102_High === "0" &&
                                  GD_102_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 20%
                                    </span>
                                ) : GD_102_High === "1" &&
                                  GD_102_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 40%
                                    </span>
                                ) : GD_102_High === "1" &&
                                  GD_102_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GD_103") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_103_High === "0" && GD_103_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: Normal
                                    </span>
                                ) : GD_103_High === "0" &&
                                  GD_103_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 20%
                                    </span>
                                ) : GD_103_High === "1" &&
                                  GD_103_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 40%
                                    </span>
                                ) : GD_103_High === "1" &&
                                  GD_103_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Flow_Meter_Total") {
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
                                        audioColorFlow_Meter_Total &&
                                        !maintainFlow_Meter_Total
                                            ? "#ff5656"
                                            : maintainTank_01_Level
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>Total</p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {Flow_Meter_Total}
                                </p>
                                <p style={{ color: colorNameValue }}>m³</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Flow_Velocity") {
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
                                        audioColorFlow_Velocity &&
                                        !maintainFlow_Velocity
                                            ? "#ff5656"
                                            : maintainFlow_Velocity
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>Flow rate :</p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {Flow_Velocity}
                                </p>
                                <p style={{ color: colorNameValue }}>m³/h</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Consumption_Flow") {
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
                                        audioColorConsumption_Flow &&
                                        !maintainConsumption_Flow
                                            ? "#ff5656"
                                            : maintainConsumption_Flow
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}> Volume :</p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {Consumption_Flow}
                                </p>
                                <p style={{ color: colorNameValue }}>m³</p>
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
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_STT == "1" ? (
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

                                            fontSize: 20,
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

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionMEIKO");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
                const initialPositions = {
              AlarmCenter: { x: -2039.8350060092037, y: 976.922382090622 },
              Arrow1: { x: -1803.0251199711197, y: 1299.9325476252639 },
              Arrow2: { x: -1804.0487088215177, y: 1498.5264015128178 },
              Arrow3: { x: -1805.4790663692363, y: 1099.5934309353395 },
              Arrow4: { x: -1918.8136370318027, y: 1639.7830586231873 },
              Arrow5: { x: -1253.596324038457, y: 1067.148313152809 },
              Arrow6: { x: -2272.224330706418, y: 1854.2709334832514 },
              Consumption_Flow: {
                  x: -1374.5609215581903,
                  y: 1696.2791762718223,
              },
              Flow_Meter_Total: {
                  x: -1375.2483772861924,
                  y: 1583.7634831928456,
              },
              Flow_Velocity: { x: -1375.1148961084123, y: 1764.5714815528183 },
              GAUGE1: { x: -1890.5028653732359, y: 1780.385321121582 },
              GAUGE1_DATA: { x: -2194.051286744135, y: 1703.9071372995613 },
              GAUGE1_line: { x: -1858.5001593543586, y: 1841.8417141791438 },
              GAUGE1_none: { x: -2104.7904804957716, y: 1841.9494661129884 },
              GAUGE2: { x: -2136.7904933365207, y: 1780.5058890448004 },
              GAUGE2_DATA: { x: -1947.4989540824558, y: 1704.4415924402429 },
              GAUGE2_line: { x: -2104.4357031772715, y: 1842.2449399434663 },
              GAUGE2_none: { x: -1858.4287646635848, y: 1841.716010221298 },
              GD_101: { x: -2502.586420696874, y: 1569.6648834305963 },
              GD_101_image: { x: -2518.1612713207987, y: 1609.1354282458306 },
              GD_102: { x: -1518.6760705824797, y: 1252.8074770572675 },
              GD_102_image: { x: -1528.160129493159, y: 1288.614752608005 },
              GD_103: { x: -1260.4490226579046, y: 1394.3115684808267 },
              GD_103_image: { x: -1267.1148397996528, y: 1429.6405489627332 },
              SDV_301: { x: -2172.4330946134314, y: 1610.7500139733424 },
              SDV_301_Name: { x: -2204.089717462407, y: 1573.8590004894997 },
              SDV_302: { x: -1602.7491259859116, y: 1828.297501126015 },
              SDV_302_Name: { x: -1636.9218741389043, y: 1796.1608326029445 },
              TankLine: { x: -1123.512135075914, y: 1017.8168832627682 },
              TankMEIKO: { x: -2658.5437371549433, y: 1048.221263138637 },
              Tank_01_Level: { x: -2404.2104502406, y: 1160.458933174752 },
              Tank_01_Mass_DATA: {
                  x: -2258.5933504283275,
                  y: 1331.5430392816806,
              },
              Tank_01_Volume_DATA: {
                  x: -2260.7757736378853,
                  y: 1254.8001422750801,
              },
              Tank_PT_301_DATA: {
                  x: -2551.0491064027174,
                  y: 1255.213903628094,
              },
              Tank_TT_301_DATA: { x: -2550.246082836534, y: 1331.882184005529 },
              V1_Flow_Meter: { x: -1126.4637630930329, y: 1023.2343195212084 },
              V2_Flow_Meter: { x: -1126.4637630930329, y: 1023.2343195212084 },
              VP: { x: -1693.3297731655844, y: 1095.1001920950932 },
              VP2: { x: -1692.2501123147658, y: 1294.3830465559004 },
              VP2_Name: { x: -1694.6711247866426, y: 1257.994735590387 },
              VP3: { x: -1690.3631227903286, y: 1495.7357257492458 },
              VP3_Name: { x: -1690.3631227903286, y: 1458.1192961259965 },
              VP_Name: { x: -1692.3458918362549, y: 1059.477247216768 },
              V_V1_V2: { x: -1265.9827727401046, y: 1829.073726911313 },
              bor1: { x: -2616.9096316888476, y: 1087.3243394936028 },
              bor2: { x: -865.1512218888312, y: 1107.8994423073616 },
              bor3: { x: -2576.8078213113167, y: 1886.894788044694 },
              bor4: { x: -356.4329469573597, y: 1859.0590100592938 },
              borderWhite: { x: -2572.8363750694525, y: 943.4663593260848 },
              buffer: { x: -1107.5142214161438, y: 973.4889092603278 },
              fadeBOTTOM1: { x: -1891.3874692725385, y: 1737.7166359613877 },
              fadeBOTTOM2: { x: -1364.2545505356688, y: 1674.416428177142 },
              fadeTOP1: { x: -1890.2348282742848, y: 1378.8574681978128 },
              fadeTOP2: { x: -1509.5590805972508, y: 1438.436842883119 },
              line1: { x: -2341.909447394958, y: 1464.882831297186 },
              line2: { x: -1903.0169361379424, y: 1660.5369371389736 },
              line3: { x: -1646.7640087133743, y: 1552.478468682168 },
              line3_1: { x: -1611.9583289249204, y: 1598.024986153063 },
              line4: { x: -1645.9362260965163, y: 1353.8223411898482 },
              line4_1: { x: -1611.9994582152644, y: 1395.9301920866767 },
              line5: { x: -1655.4527205660722, y: 1153.322075303456 },
              line5_1: { x: -1610.3096893376992, y: 1197.1600281512376 },
              line6: { x: -2277.407524121134, y: 1879.3076438615028 },
              line_Top_6: { x: -1048.1291087321813, y: 1087.3130020429912 },
              timeUpdate3: { x: -2558.911150405856, y: 1021.6758768483903 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================

        // ============================== line =========================================
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
        // {
        //     id: "Flow_Meter_Total",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     color: "green",
        //                     fontSize: 25,
        //                     fontWeight: 600,
        //                 }}
        //             >
        //                 {" "}
        //                 Flow Total
        //             </div>
        //         ),
        //     },
        //     position: positions.Flow_Meter_Total,

        //     style: {
        //         border: background,
        //         width: 300,

        //         background: borderBox,
        //         // Thêm box shadow với màu (0, 255, 255)
        //     },
        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Bottom,
        // },
        {
            id: "Consumption_Flow",
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
                        Flow Total
                    </div>
                ),
            },
            position: positions.Consumption_Flow,

            style: {
                border: background,
                width: 300,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "Flow_Velocity",
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
                        Flow Total
                    </div>
                ),
            },
            position: positions.Flow_Velocity,

            style: {
                border: background,
                width: 300,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },

        {
            id: "GAUGE1_DATA",
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
            position: positions.GAUGE1_DATA,

            style: {
                border: background,
                width: 200,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "GAUGE2_DATA",
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
            position: positions.GAUGE2_DATA,

            style: {
                border: background,
                width: 200,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "GAUGE1_none",
            position: positions.GAUGE1_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE2_none",
            position: positions.GAUGE2_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE1",
            position: positions.GAUGE1,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE2",
            position: positions.GAUGE2,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "GAUGE1_line",
            position: positions.GAUGE1_line,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 50, background: line },
        },
        {
            id: "GAUGE2_line",
            position: positions.GAUGE2_line,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex:9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 50, background: line },
        },
        {
            id: "Arrow6",
            position: positions.Arrow6,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
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
            id: "TankMEIKO",
            position: positions.TankMEIKO,
            type: "custom",
            data: {
                label: (
                    <div style={{ width: 400, height: 230 }}>{TankMeiko}</div>
                ),
            },
            zIndex:-99999,
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "TankLine",
            position: positions.TankLine,
            type: "custom",
            data: {
                label: <div style={{ width: 0, height: 0 }}>{TankLine}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ============================== line =========================================

        {
            id: "GD_101",
            position: positions.GD_101,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 200,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_101_image",
            position: positions.GD_101_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },

        {
            id: "GD_102",
            position: positions.GD_102,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 200,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_102_image",
            position: positions.GD_102_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },

        {
            id: "GD_103",
            position: positions.GD_103,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 200,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_103_image",
            position: positions.GD_103_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },
        {
            id: "VP",
            position: positions.VP,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_OFF}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP2",
            position: positions.VP2,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_ON}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP3",
            position: positions.VP3,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_ON}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP_Name",
            position: positions.VP_Name,
            type: "custom",
            data: {
                label: <div>VP-301</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "VP2_Name",
            position: positions.VP2_Name,
            type: "custom",
            data: {
                label: <div>VP-302</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "VP3_Name",
            position: positions.VP3_Name,
            type: "custom",
            data: {
                label: <div>VP-303</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
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

            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "none",
                borderRadius: 5,
                border: "none",
            },
            zIndex: 99999,
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
            style: { border: "none", width: 0, height: 10, background: "none" },
            zIndex: 99999,
        },

        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line3_1",
            position: positions.line3_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line4_1",
            position: positions.line4_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line5_1",
            position: positions.line5_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line_Top_6",
            position: positions.line_Top_6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ============================== line =========================================
        {
            id: "buffer",
            position: positions.buffer,
            type: "custom",
            data: {
                label: <div>Buffer Tank</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 25,
                fontWeight: 500,
                padding: 5,
                width: 200,

                background: background,
                color: "white",
                border: "none",
                borderRadius: 5,
            },
        },
        {
            id: "Tank_01_Level",
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
            position: positions.Tank_01_Level,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_01_Volume_DATA",
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
            position: positions.Tank_01_Volume_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_01_Mass_DATA",
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
            position: positions.Tank_01_Mass_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_PT_301_DATA",
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
            position: positions.Tank_PT_301_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "Tank_TT_301_DATA",
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
            position: positions.Tank_TT_301_DATA,

            style: {
                border: background,
                width: 280,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "SDV_301_Name",
            position: positions.SDV_301_Name,
            type: "custom",
            data: {
                label: <div>SDV-301</div>,
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
            id: "SDV_302_Name",
            position: positions.SDV_302_Name,
            type: "custom",
            data: {
                label: <div>SDV-302</div>,
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
            id: "SDV_301",
            position: positions.SDV_301,
            type: "custom",
            data: {
                label: <div>111</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "SDV_302",
            position: positions.SDV_302,
            type: "custom",
            data: {
                label: <div>222</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "V_V1_V2",
            position: positions.V_V1_V2,
            type: "custom",
            data: {
                label: <div>{V_V1_V2}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
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
                        MEIKO
                    </div>
                ),
            },
            position: positions.borderWhite,

            style: {
                background: background,
                border: "1px solid white",
                width: 450,
                height: 140,
                borderRadius: 50,
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
                        <AlarmMeiko/>
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

    // const onNodeDragStop = useCallback(
    //     (event: any, node: any) => {
    //         if (editingEnabled) {
    //             const { id, position } = node;
    //             setNodes((prevNodes) =>
    //                 prevNodes.map((n) =>
    //                     n.id === id ? { ...n, position: position } : n
    //                 )
    //             );
    //             if (id === "Tank_01_Level") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_01_Level: position,
    //                 }));
    //             } else if (id === "Tank_01_Volume_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_01_Volume_DATA: position,
    //                 }));
    //             } else if (id === "Tank_01_Mass_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_01_Mass_DATA: position,
    //                 }));
    //             } else if (id === "Tank_PT_301_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_PT_301_DATA: position,
    //                 }));
    //             } else if (id === "Tank_TT_301_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_TT_301_DATA: position,
    //                 }));
    //             } else if (id === "line1") {
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
    //             } else if (id === "line6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line6: position,
    //                 }));
    //             } else if (id === "TankMEIKO") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TankMEIKO: position,
    //                 }));
    //             } else if (id === "TankLine") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TankLine: position,
    //                 }));
    //             } else if (id === "Arrow1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow1: position,
    //                 }));
    //             } else if (id === "Arrow2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow2: position,
    //                 }));
    //             } else if (id === "Arrow3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow3: position,
    //                 }));
    //             } else if (id === "Arrow4") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow4: position,
    //                 }));
    //             } else if (id === "Arrow5") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow5: position,
    //                 }));
    //             } else if (id === "Arrow6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow6: position,
    //                 }));
    //             } else if (id === "line5_1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line5_1: position,
    //                 }));
    //             } else if (id === "line3_1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line3_1: position,
    //                 }));
    //             } else if (id === "line4_1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line4_1: position,
    //                 }));
    //             } else if (id === "line_Top_6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line_Top_6: position,
    //                 }));
    //             } else if (id === "VP") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP: position,
    //                 }));
    //             } else if (id === "VP2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP2: position,
    //                 }));
    //             } else if (id === "VP3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP3: position,
    //                 }));
    //             } else if (id === "VP_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP_Name: position,
    //                 }));
    //             } else if (id === "VP2_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP2_Name: position,
    //                 }));
    //             } else if (id === "VP3_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     VP3_Name: position,
    //                 }));
    //             } else if (id === "SDV_301_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_301_Name: position,
    //                 }));
    //             } else if (id === "SDV_302_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_302_Name: position,
    //                 }));
    //             } else if (id === "SDV_301") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_301: position,
    //                 }));
    //             } else if (id === "SDV_302") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_302: position,
    //                 }));
    //             } else if (id === "GAUGE1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE1: position,
    //                 }));
    //             } else if (id === "GAUGE2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE2: position,
    //                 }));
    //             } else if (id === "GAUGE1_line") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE1_line: position,
    //                 }));
    //             } else if (id === "GAUGE2_line") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE2_line: position,
    //                 }));
    //             } else if (id === "GAUGE1_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE1_none: position,
    //                 }));
    //             } else if (id === "GAUGE2_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE2_none: position,
    //                 }));
    //             } else if (id === "GAUGE1_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE1_DATA: position,
    //                 }));
    //             } else if (id === "GAUGE2_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GAUGE2_DATA: position,
    //                 }));
    //             } else if (id === "GD_101") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_101: position,
    //                 }));
    //             } else if (id === "GD_101_image") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_101_image: position,
    //                 }));
    //             } else if (id === "GD_102") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_102: position,
    //                 }));
    //             } else if (id === "GD_102_image") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_102_image: position,
    //                 }));
    //             } else if (id === "GD_103") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_103: position,
    //                 }));
    //             } else if (id === "GD_103_image") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_103_image: position,
    //                 }));
    //             } else if (id === "V_V1_V2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     V_V1_V2: position,
    //                 }));
    //             } else if (id === "Flow_Meter_Total") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Flow_Meter_Total: position,
    //                 }));
    //             } else if (id === "borderWhite") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     borderWhite: position,
    //                 }));
    //             } else if (id === "timeUpdate3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate3: position,
    //                 }));
    //             } else if (id === "AlarmCenter") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     AlarmCenter: position,
    //                 }));
    //             } else if (id === "Flow_Velocity") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Flow_Velocity: position,
    //                 }));
    //             } else if (id === "Consumption_Flow") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Consumption_Flow: position,
    //                 }));
    //             } else if (id === "buffer") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     buffer: position,
    //                 }));
    //             }

    //             //========================== pit line 1 =========================
    //         }
    //     },
    //     [setNodes, setPositions, editingEnabled]
    // );
    // const toggleEditing = () => {
    //     setEditingEnabled(!editingEnabled);
    // };

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
