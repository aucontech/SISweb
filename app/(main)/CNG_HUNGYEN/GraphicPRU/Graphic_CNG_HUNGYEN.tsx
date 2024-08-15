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
import BallVavle_Line2_Top from "../BallVavlePRU/BallVavle_Line2_Top";
import BallVavle_Line2_Bottom from "../BallVavlePRU/BallVavle_Line2_Bottom";
import Image from "next/image";
import {
    ArrowRight,
    BlackTriangle,
    DownArrow,
    GD,
    GaugeTemperature,
    PTV,
    SVD_NC,
    SVD_NO,
    WhiteTriangleRight,
} from "./iconSVG";
import { BlackTriangleRight } from "../../ZOVC/GraphicZOVC/iconSVG";
import BallVavle_Line3_Top from "../BallVavlePRU/BallVavle_Line3_Top";
import BallVavle_Line3_Bottom from "../BallVavlePRU/BallVavle_Line3_Bottom";
import { id_CNG_HungYen } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import AlarmCNG_HUNGYEN from "@/layout/AlarmBell/AlarmCNG_HUNGYEN";
import { nameValue } from "../../SetupData/namValue";
import "./ForCssGraphic.css"

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

export default function Graphic_CNG_HUNGYEN() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);

    const [PCV_3001A, setPCV_3001A] = useState();
    const [PCV_3001B, setPCV_3001B] = useState();
    const [PCV_3002A, setPCV_3002A] = useState();
    const [PCV_3002B, setPCV_3002B] = useState();

    const [PSV_3001A, setPSV_3001A] = useState();
    const [PSV_3001B, setPSV_3001B] = useState();
    const [PSV_3002A, setPSV_3002A] = useState();
    const [PSV_3002B, setPSV_3002B] = useState();

    const [SDV_3001A, setSDV_3001A] = useState<any>();
    const [SDV_3001B, setSDV_3001B] = useState<string | null>(null);
    const [SDV_3002, setSDV_3002] = useState<string | null>(null);

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

    const [LPG, setLPG] = useState<any>();
    const [AIR, setAIR] = useState<any>();

    const totalHeight = 500;
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
                    entityId: id_CNG_HungYen,
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
                                key: "PCV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002B",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_CNG_HungYen,
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
                                key: "PCV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002B",
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
                        PIT_3001A: setPIT_3001A,
                        PIT_3001B: setPIT_3001B,
                        PT_3001: setPT_3001,
                        PT_3002: setPT_3002,

                        EVC_01_Pressure: setEVC_01_Pressure,
                        EVC_02_Pressure: setEVC_02_Pressure,
                        EVC_01_Temperature: setEVC_01_Temperature,
                        EVC_02_Temperature: setEVC_02_Temperature,

                        SDV_3001A: setSDV_3001A,
                        SDV_3001B: setSDV_3001B,
                        SDV_3002: setSDV_3002,
                        TT_3001: setTT_3001,
                        PT_3003: setPT_3003,
                        GD_3001: setGD_3001,

                        EVC_01_Flow_at_Base_Condition:
                            setEVC_01_Flow_at_Base_Condition,
                        EVC_01_Flow_at_Measurement_Condition:
                            setEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Volume_at_Base_Condition:
                            setEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition:
                            setEVC_01_Volume_at_Measurement_Condition,

                        EVC_02_Flow_at_Base_Condition:
                            setEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition:
                            setEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Volume_at_Base_Condition:
                            setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition:
                            setEVC_02_Volume_at_Measurement_Condition,

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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3001A
                            .value;
                    setPCV_3001A(ballValue);
                    const ballValueB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3001B
                            .value;
                    setPCV_3001B(ballValueB);
                    const ballValue2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3002B
                            .value;
                    setPCV_3002B(ballValue2B);
                    const ballValue2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3002A
                            .value;
                    setPCV_3002A(ballValue2A);

                    const ballValueS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3001A
                            .value;
                    setPSV_3001A(ballValueS);
                    const ballValueSB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3001B
                            .value;
                    setPSV_3001B(ballValueSB);
                    const ballValueS2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3002B
                            .value;
                    setPSV_3002B(ballValueS2B);
                    const ballValueS2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3002A
                            .value;
                    setPSV_3002A(ballValueS2A);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3001A.value;
                    setPCV_3001A(updatedData);
                    const updatedDataB =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3001B.value;
                    setPCV_3001B(updatedDataB);

                    const ballValue2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3002A.value;
                    setPCV_3002A(ballValue2B);
                    const updatedEVC_01_Volume_at_Base_ConditionA =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3002B.value;
                    setPCV_3002B(updatedEVC_01_Volume_at_Base_ConditionA);

                    const updatedDataS =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3001A.value;
                    setPSV_3001A(updatedDataS);
                    const updatedDataSB =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3001B.value;
                    setPSV_3001B(updatedDataSB);

                    const ballValueS2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3002A.value;
                    setPSV_3002A(ballValueS2B);
                    const updatedDataS2A =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3002B.value;
                    setPSV_3002B(updatedDataS2A);
                }

                fetchData();
            };
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/values/attributes/SERVER_SCOPE`
            );

            const HighPIT_3001A = res.data.find(
                (item: any) => item.key === "PIT_3001A_High"
            );
            setPIT_3001A_High(HighPIT_3001A?.value || null);
            const LowPIT_3001A = res.data.find(
                (item: any) => item.key === "PIT_3001A_Low"
            );
            setPIT_3001A_Low(LowPIT_3001A?.value || null);

            const MaintainPIT_3001A = res.data.find(
                (item: any) => item.key === "PIT_3001A_Maintain"
            );
            setmaintainPIT_3001A(MaintainPIT_3001A?.value || false);
            //===========================================================================================

            const HighPIT_3001B = res.data.find(
                (item: any) => item.key === "PIT_3001B_High"
            );
            setPIT_3001B_High(HighPIT_3001B?.value || null);
            const LowPIT_3001B = res.data.find(
                (item: any) => item.key === "PIT_3001B_Low"
            );
            setPIT_3001B_Low(LowPIT_3001B?.value || null);

            const MaintainPIT_3001B = res.data.find(
                (item: any) => item.key === "PIT_3001B_Maintain"
            );
            setmaintainPIT_3001B(MaintainPIT_3001B?.value || false);
            //===========================================================================================

            const HighPT_3001 = res.data.find(
                (item: any) => item.key === "PT_3001_High"
            );
            setPT_3001_High(HighPT_3001?.value || null);
            const LowPT_3001 = res.data.find(
                (item: any) => item.key === "PT_3001_Low"
            );
            setPT_3001_Low(LowPT_3001?.value || null);

            const PT_3001_Maintain = res.data.find(
                (item: any) => item.key === "PT_3001_Maintain"
            );
            setmaintainPT_3001(PT_3001_Maintain?.value || false);

            //===========================================================================================

            const HighPT_3002 = res.data.find(
                (item: any) => item.key === "PT_3002_High"
            );
            setPT_3002_High(HighPT_3002?.value || null);

            const LowPT_3002 = res.data.find(
                (item: any) => item.key === "PT_3002_Low"
            );
            setPT_3002_Low(LowPT_3002?.value || null);

            const PT_3002_Maintain = res.data.find(
                (item: any) => item.key === "PT_3002_Maintain"
            );
            setmaintainPT_3002(PT_3002_Maintain?.value || false);
            //===========================================================================================

            const HighEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_High"
            );
            setEVC_01_Pressure_High(HighEVC_01_Pressure?.value || null);

            const LowEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Low"
            );
            setEVC_01_Pressure_Low(LowEVC_01_Pressure?.value || null);

            const EVC_01_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );
            setmaintainEVC_01_Pressure(
                EVC_01_Pressure_Maintain?.value || false
            );

            //===========================================================================================

            const HighEVC_02_Pressure = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_High"
            );
            setEVC_02_Pressure_High(HighEVC_02_Pressure?.value || null);

            const LowEVC_02_Pressure = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Low"
            );
            setEVC_02_Pressure_Low(LowEVC_02_Pressure?.value || null);
            const EVC_02_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Maintain"
            );
            setmaintainEVC_02_Pressure(
                EVC_02_Pressure_Maintain?.value || false
            );

            //===========================================================================================

            const HighEVC_01_Temperature = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_High"
            );
            setEVC_01_Temperature_High(HighEVC_01_Temperature?.value || null);

            const LowEVC_01_Temperature = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Low"
            );
            setEVC_01_Temperature_Low(LowEVC_01_Temperature?.value || null);
            const EVC_01_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Maintain"
            );
            setmaintainEVC_01_Temperature(
                EVC_01_Temperature_Maintain?.value || false
            );

            //===========================================================================================

            const HighEVC_02_Temperature = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_High"
            );
            setEVC_02_Temperature_High(HighEVC_02_Temperature?.value || null);

            const LowEVC_02_Temperature = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Low"
            );
            setEVC_02_Temperature_Low(LowEVC_02_Temperature?.value || null);

            const EVC_02_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );
            setmaintainEVC_02_Temperature(
                EVC_02_Temperature_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighTT_3001 = res.data.find(
                (item: any) => item.key === "TT_3001_High"
            );
            setTT_3001_High(HighTT_3001?.value || null);

            const LowTT_3001 = res.data.find(
                (item: any) => item.key === "TT_3001_Low"
            );
            setTT_3001_Low(LowTT_3001?.value || null);

            const TT_3001_Maintain = res.data.find(
                (item: any) => item.key === "TT_3001_Maintain"
            );
            setmaintainTT_3001(TT_3001_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighPT_3003 = res.data.find(
                (item: any) => item.key === "PT_3003_High"
            );
            setPT_3003_High(HighPT_3003?.value || null);

            const LowPT_3003 = res.data.find(
                (item: any) => item.key === "PT_3003_Low"
            );
            setPT_3003_Low(LowPT_3003?.value || null);

            const PT_3003_Maintain = res.data.find(
                (item: any) => item.key === "PT_3003_Maintain"
            );
            setmaintainPT_3003(PT_3003_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighGD_3001 = res.data.find(
                (item: any) => item.key === "GD_3001_High"
            );
            setGD_3001_High(HighGD_3001?.value || null);

            const LowGD_3001 = res.data.find(
                (item: any) => item.key === "GD_3001_Low"
            );
            setGD_3001_Low(LowGD_3001?.value || null);

            const GD_3001_Maintain = res.data.find(
                (item: any) => item.key === "GD_3001_Maintain"
            );
            setmaintainGD_3001(GD_3001_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighEVC_01_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High"
            );
            setEVC_01_Flow_at_Base_Condition_High(
                HighEVC_01_Flow_at_Base_Condition?.value || null
            );

            const LowEVC_01_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low"
            );
            setEVC_01_Flow_at_Base_Condition_Low(
                LowEVC_01_Flow_at_Base_Condition?.value || null
            );

            const EVC_01_Flow_at_Base_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );
            setmaintainEVC_01_Flow_at_Base_Condition(
                EVC_01_Flow_at_Base_Condition_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighEVC_01_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_High"
            );
            setEVC_01_Flow_at_Measurement_Condition_High(
                HighEVC_01_Flow_at_Measurement_Condition?.value || null
            );

            const LowEVC_01_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Low"
            );
            setEVC_01_Flow_at_Measurement_Condition_Low(
                LowEVC_01_Flow_at_Measurement_Condition?.value || null
            );

            const EVC_01_Flow_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_01_Flow_at_Measurement_Condition(
                EVC_01_Flow_at_Measurement_Condition_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighEVC_01_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_High"
            );
            setEVC_01_Volume_at_Base_Condition_High(
                HighEVC_01_Volume_at_Base_Condition?.value || null
            );

            const LowEVC_01_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Low"
            );
            setEVC_01_Volume_at_Base_Condition_Low(
                LowEVC_01_Volume_at_Base_Condition?.value || null
            );

            const EVC_01_Volume_at_Base_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setmaintainEVC_01_Volume_at_Base_Condition(
                EVC_01_Volume_at_Base_Condition_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighEVC_01_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_High"
            );
            setEVC_01_Volume_at_Measurement_Condition_High(
                HighEVC_01_Volume_at_Measurement_Condition?.value || null
            );

            const LowEVC_01_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_Low"
            );
            setEVC_01_Volume_at_Measurement_Condition_Low(
                LowEVC_01_Volume_at_Measurement_Condition?.value || null
            );

            const EVC_01_Volume_at_Measurement_Condition_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "EVC_01_Volume_at_Measurement_Condition_Maintain"
                );
            setmaintainEVC_01_Volume_at_Measurement_Condition(
                EVC_01_Volume_at_Measurement_Condition_Maintain?.value || false
            );
            //===========================================================================================
            //===========================================================================================

            const HighEVC_02_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High"
            );
            setEVC_02_Flow_at_Base_Condition_High(
                HighEVC_02_Flow_at_Base_Condition?.value || null
            );

            const LowEVC_02_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low"
            );
            setEVC_02_Flow_at_Base_Condition_Low(
                LowEVC_02_Flow_at_Base_Condition?.value || null
            );

            const EVC_02_Flow_at_Base_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Base_Condition_Maintain"
            );
            setmaintainEVC_02_Flow_at_Base_Condition(
                EVC_02_Flow_at_Base_Condition_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighEVC_02_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_High"
            );
            setEVC_02_Flow_at_Measurement_Condition_High(
                HighEVC_02_Flow_at_Measurement_Condition?.value || null
            );

            const LowEVC_02_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Low"
            );
            setEVC_02_Flow_at_Measurement_Condition_Low(
                LowEVC_02_Flow_at_Measurement_Condition?.value || null
            );

            const EVC_02_Flow_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_02_Flow_at_Measurement_Condition(
                EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false
            );
            //===========================================================================================
            //===========================================================================================

            const HighEVC_02_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Base_Condition_High"
            );
            setEVC_02_Volume_at_Base_Condition_High(
                HighEVC_02_Volume_at_Base_Condition?.value || null
            );

            const LowEVC_02_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Base_Condition_Low"
            );
            setEVC_02_Volume_at_Base_Condition_Low(
                LowEVC_02_Volume_at_Base_Condition?.value || null
            );

            const EVC_02_Volume_at_Base_Condition_Maintain = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            setmaintainEVC_02_Volume_at_Base_Condition(
                EVC_02_Volume_at_Base_Condition_Maintain?.value || false
            );
            //===========================================================================================

            //===========================================================================================

            const HighEVC_02_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Measurement_Condition_High"
            );
            setEVC_02_Volume_at_Measurement_Condition_High(
                HighEVC_02_Volume_at_Measurement_Condition?.value || null
            );

            const LowEVC_02_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Measurement_Condition_Low"
            );
            setEVC_02_Volume_at_Measurement_Condition_Low(
                LowEVC_02_Volume_at_Measurement_Condition?.value || null
            );

            const EVC_02_Volume_at_Measurement_Condition_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "EVC_02_Volume_at_Measurement_Condition_Maintain"
                );
            setmaintainEVC_02_Volume_at_Measurement_Condition(
                EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false
            );
            //===========================================================================================
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PIT_3001A: "PIT_3001A",
        PIT_3001B: "PIT_3001B",
        PT_3001: "PT_3001",
        PT_3002: "PT_3002",
        EVC_01_Pressure: " Pressure",
        EVC_02_Pressure: " Pressure",

        EVC_01_Temperature: "Temperature",
        EVC_02_Temperature: "Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "BarA",
        CC: "°C",
        BARG: "BarG",
    };
    //================================ PIT_3001A================================

    const [PIT_3001A, setPIT_3001A] = useState<string | null>(null);

    const [PIT_3001A_High, setPIT_3001A_High] = useState<number | null>(null);
    const [PIT_3001A_Low, setPIT_3001A_Low] = useState<number | null>(null);
    const [exceedThresholdPIT_3001A, setexceedThresholdPIT_3001A] =
        useState(false);

    const [maintainPIT_3001A, setmaintainPIT_3001A] = useState<boolean>(false);

    useEffect(() => {
        const PIT_3001AValue = parseFloat(PIT_3001A as any);
        const highValue = PIT_3001A_High ?? NaN;
        const lowValue = PIT_3001A_Low ?? NaN;

        if (
            !isNaN(PIT_3001AValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPIT_3001A
        ) {
            setexceedThresholdPIT_3001A(
                PIT_3001AValue >= highValue || PIT_3001AValue <= lowValue
            );
        }
    }, [PIT_3001A, PIT_3001A_High, PIT_3001A_Low, maintainPIT_3001A]);

    //================================ PIT_3001B================================

    const [PIT_3001B, setPIT_3001B] = useState<string | null>(null);
    const [PIT_3001B_High, setPIT_3001B_High] = useState<number | null>(null);
    const [PIT_3001B_Low, setPIT_3001B_Low] = useState<number | null>(null);
    const [exceedThresholdPIT_3001B, setexceedThresholdPIT_3001B] =
        useState(false);
    const [maintainPIT_3001B, setmaintainPIT_3001B] = useState<boolean>(false);

    useEffect(() => {
        const PIT_3001BValue = parseFloat(PIT_3001B as any);
        const highValue = PIT_3001B_High ?? NaN;
        const lowValue = PIT_3001B_Low ?? NaN;

        if (
            !isNaN(PIT_3001BValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPIT_3001B
        ) {
            setexceedThresholdPIT_3001B(
                PIT_3001BValue >= highValue || PIT_3001BValue <= lowValue
            );
        }
    }, [PIT_3001B, PIT_3001B_High, PIT_3001B_Low, maintainPIT_3001B]);
    //================================ PT_3001================================

    const [PT_3001, setPT_3001] = useState<string | null>(null);
    const [PT_3001_High, setPT_3001_High] = useState<number | null>(null);
    const [PT_3001_Low, setPT_3001_Low] = useState<number | null>(null);
    const [exceedThresholdPT_3001, setexceedThresholdPT_3001] = useState(false);
    const [maintainPT_3001, setmaintainPT_3001] = useState<boolean>(false);

    useEffect(() => {
        const PT_3001Value = parseFloat(PT_3001 as any);
        const highValue = PT_3001_High ?? NaN;
        const lowValue = PT_3001_Low ?? NaN;

        if (
            !isNaN(PT_3001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_3001
        ) {
            setexceedThresholdPT_3001(
                PT_3001Value >= highValue || PT_3001Value <= lowValue
            );
        }
    }, [PT_3001, PT_3001_High, PT_3001_Low, maintainPT_3001]);

    //================================ PT_3002================================

    const [PT_3002, setPT_3002] = useState<string | null>(null);
    const [PT_3002_High, setPT_3002_High] = useState<number | null>(null);
    const [PT_3002_Low, setPT_3002_Low] = useState<number | null>(null);
    const [exceedThresholdPT_3002, setexceedThresholdPT_3002] = useState(false);
    const [maintainPT_3002, setmaintainPT_3002] = useState<boolean>(false);

    useEffect(() => {
        const PT_3002Value = parseFloat(PT_3002 as any);
        const highValue = PT_3002_High ?? NaN;
        const lowValue = PT_3002_Low ?? NaN;

        if (
            !isNaN(PT_3002Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_3002
        ) {
            setexceedThresholdPT_3002(
                PT_3002Value >= highValue || PT_3002Value <= lowValue
            );
        }
    }, [PT_3002, PT_3002_High, PT_3002_Low, maintainPT_3002]);

    //================================ EVC_02_Pressure================================
    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);

    const [EVC_02_Pressure_High, setEVC_02_Pressure_High] = useState<
        number | null
    >(null);
    const [EVC_02_Pressure_Low, setEVC_02_Pressure_Low] = useState<
        number | null
    >(null);
    const [exceedThresholdEVC_02_Pressure, setexceedThresholdEVC_02_Pressure] =
        useState(false);

    const [maintainEVC_02_Pressure, setmaintainEVC_02_Pressure] =
        useState<boolean>(false);

    useEffect(() => {
        const EVC_02_PressureValue = parseFloat(EVC_02_Pressure as any);
        const highValue = EVC_02_Pressure_High ?? NaN;
        const lowValue = EVC_02_Pressure_Low ?? NaN;

        if (
            !isNaN(EVC_02_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Pressure
        ) {
            setexceedThresholdEVC_02_Pressure(
                EVC_02_PressureValue >= highValue ||
                    EVC_02_PressureValue <= lowValue
            );
        }
    }, [
        EVC_02_Pressure,
        EVC_02_Pressure_High,
        EVC_02_Pressure_Low,
        maintainEVC_02_Pressure,
    ]);

    //================================ EVC_01_Pressure================================

    const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);

    const [EVC_01_Pressure_High, setEVC_01_Pressure_High] = useState<
        number | null
    >(null);
    const [EVC_01_Pressure_Low, setEVC_01_Pressure_Low] = useState<
        number | null
    >(null);
    const [exceedThresholdEVC_01_Pressure, setexceedThresholdEVC_01_Pressure] =
        useState(false);

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
            setexceedThresholdEVC_01_Pressure(
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
    //================================ EVC_01_Temperature================================

    const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(
        null
    );

    const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<
        number | null
    >(null);
    const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<
        number | null
    >(null);
    const [
        exceedThresholdEVC_01_Temperature,
        setexceedThresholdEVC_01_Temperature,
    ] = useState(false);

    const [maintainEVC_01_Temperature, setmaintainEVC_01_Temperature] =
        useState<boolean>(false);

    useEffect(() => {
        const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature as any);
        const highValue = EVC_01_Temperature_High ?? NaN;
        const lowValue = EVC_01_Temperature_Low ?? NaN;

        if (
            !isNaN(EVC_01_TemperatureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Temperature
        ) {
            setexceedThresholdEVC_01_Temperature(
                EVC_01_TemperatureValue >= highValue ||
                    EVC_01_TemperatureValue <= lowValue
            );
        }
    }, [
        EVC_01_Temperature,
        EVC_01_Temperature_High,
        EVC_01_Temperature_Low,
        maintainEVC_01_Temperature,
    ]);

    //================================ EVC_02_Temperature================================

    const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(
        null
    );

    const [EVC_02_Temperature_High, setEVC_02_Temperature_High] = useState<
        number | null
    >(null);
    const [EVC_02_Temperature_Low, setEVC_02_Temperature_Low] = useState<
        number | null
    >(null);
    const [
        exceedThresholdEVC_02_Temperature,
        setexceedThresholdEVC_02_Temperature,
    ] = useState(false);

    const [maintainEVC_02_Temperature, setmaintainEVC_02_Temperature] =
        useState<boolean>(false);

    useEffect(() => {
        const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature as any);
        const highValue = EVC_02_Temperature_High ?? NaN;
        const lowValue = EVC_02_Temperature_Low ?? NaN;

        if (
            !isNaN(EVC_02_TemperatureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Temperature
        ) {
            setexceedThresholdEVC_02_Temperature(
                EVC_02_TemperatureValue >= highValue ||
                    EVC_02_TemperatureValue <= lowValue
            );
        }
    }, [
        EVC_02_Temperature,
        EVC_02_Temperature_High,
        EVC_02_Temperature_Low,
        maintainEVC_02_Temperature,
    ]);

    //================================ EVC_02_Temperature================================

    const [TT_3001, setTT_3001] = useState<string | null>(null);
    const [TT_3001_High, setTT_3001_High] = useState<number | null>(null);
    const [TT_3001_Low, setTT_3001_Low] = useState<number | null>(null);
    const [exceedThresholdTT_3001, setexceedThresholdTT_3001] = useState(false);
    const [maintainTT_3001, setmaintainTT_3001] = useState<boolean>(false);

    useEffect(() => {
        const TT_3001Value = parseFloat(TT_3001 as any);
        const highValue = TT_3001_High ?? NaN;
        const lowValue = TT_3001_Low ?? NaN;

        if (
            !isNaN(TT_3001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainTT_3001
        ) {
            setexceedThresholdTT_3001(
                TT_3001Value >= highValue || TT_3001Value <= lowValue
            );
        }
    }, [TT_3001, TT_3001_High, TT_3001_Low, maintainTT_3001]);

    //================================ EVC_02_Temperature================================

    const [PT_3003, setPT_3003] = useState<string | null>(null);

    const [PT_3003_High, setPT_3003_High] = useState<number | null>(null);
    const [PT_3003_Low, setPT_3003_Low] = useState<number | null>(null);
    const [exceedThresholdPT_3003, setexceedThresholdPT_3003] = useState(false);

    const [maintainPT_3003, setmaintainPT_3003] = useState<boolean>(false);

    useEffect(() => {
        const PT_3003Value = parseFloat(PT_3003 as any);
        const highValue = PT_3003_High ?? NaN;
        const lowValue = PT_3003_Low ?? NaN;

        if (
            !isNaN(PT_3003Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_3003
        ) {
            setexceedThresholdPT_3003(
                PT_3003Value >= highValue || PT_3003Value <= lowValue
            );
        }
    }, [PT_3003, PT_3003_High, PT_3003_Low, maintainPT_3003]);

    //================================ EVC_02_Temperature ======================================================

    const [GD_3001, setGD_3001] = useState<string | null>(null);
    const [GD_3001_High, setGD_3001_High] = useState<number | null>(null);
    const [GD_3001_Low, setGD_3001_Low] = useState<number | null>(null);
    const [exceedThresholdGD_3001, setExceedThresholdGD_3001] = useState(false);
    const [maintainGD_3001, setmaintainGD_3001] = useState<boolean>(false);
    useEffect(() => {
        const GD_3001Value = parseFloat(GD_3001 as any);
        const highValue = GD_3001_High ?? NaN;
        const lowValue = GD_3001_Low ?? NaN;

        if (
            !isNaN(GD_3001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD_3001
        ) {
            setExceedThresholdGD_3001(
                GD_3001Value >= highValue || GD_3001Value <= lowValue
            );
        }
    }, [GD_3001, GD_3001_High, GD_3001_Low, maintainGD_3001]);

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] =
        useState<string | null>(null);

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
        setexceedThresholdEVC_01_Flow_at_Base_Condition,
    ] = useState(false);

    const [
        maintainEVC_01_Flow_at_Base_Condition,
        setmaintainEVC_01_Flow_at_Base_Condition,
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
            setexceedThresholdEVC_01_Flow_at_Base_Condition(
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
        EVC_01_Flow_at_Measurement_Condition,
        setEVC_01_Flow_at_Measurement_Condition,
    ] = useState<string | null>(null);
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
        setexceedThresholdEVC_01_Flow_at_Measurement_Condition,
    ] = useState(false);
    const [
        maintainEVC_01_Flow_at_Measurement_Condition,
        setmaintainEVC_01_Flow_at_Measurement_Condition,
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
            setexceedThresholdEVC_01_Flow_at_Measurement_Condition(
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

    //================================ EVC_01_Volume_at_Base_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Volume_at_Base_Condition,
        setEVC_01_Volume_at_Base_Condition,
    ] = useState<string | null>(null);

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
        setexceedThresholdEVC_01_Volume_at_Base_Condition,
    ] = useState(false);
    const [
        maintainEVC_01_Volume_at_Base_Condition,
        setmaintainEVC_01_Volume_at_Base_Condition,
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
            setexceedThresholdEVC_01_Volume_at_Base_Condition(
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

    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================

    const [
        EVC_01_Volume_at_Measurement_Condition,
        setEVC_01_Volume_at_Measurement_Condition,
    ] = useState<string | null>(null);
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
        setexceedThresholdEVC_01_Volume_at_Measurement_Condition,
    ] = useState(false);
    const [
        maintainEVC_01_Volume_at_Measurement_Condition,
        setmaintainEVC_01_Volume_at_Measurement_Condition,
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
            setexceedThresholdEVC_01_Volume_at_Measurement_Condition(
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

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    // ===================================================================================================================
    const [
        EVC_02_Volume_at_Base_Condition,
        setEVC_02_Volume_at_Base_Condition,
    ] = useState<string | null>(null);

    const [
        EVC_02_Volume_at_Base_Condition_High,
        setEVC_02_Volume_at_Base_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_02_Volume_at_Base_Condition_Low,
        setEVC_02_Volume_at_Base_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Volume_at_Base_Condition,
        setexceedThresholdEVC_02_Volume_at_Base_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Volume_at_Base_Condition,
        setmaintainEVC_02_Volume_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_02_Volume_at_Base_ConditionValue = parseFloat(
            EVC_02_Volume_at_Base_Condition as any
        );
        const highValue = EVC_02_Volume_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_02_Volume_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Volume_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Volume_at_Base_Condition
        ) {
            setexceedThresholdEVC_02_Volume_at_Base_Condition(
                EVC_02_Volume_at_Base_ConditionValue >= highValue ||
                    EVC_02_Volume_at_Base_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_02_Volume_at_Base_Condition,
        EVC_02_Volume_at_Base_Condition_High,
        EVC_02_Volume_at_Base_Condition_Low,
        maintainEVC_02_Volume_at_Base_Condition,
    ]);

    // ===================================================================================================================
    const [
        EVC_02_Volume_at_Measurement_Condition,
        setEVC_02_Volume_at_Measurement_Condition,
    ] = useState<string | null>(null);

    const [
        EVC_02_Volume_at_Measurement_Condition_High,
        setEVC_02_Volume_at_Measurement_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_02_Volume_at_Measurement_Condition_Low,
        setEVC_02_Volume_at_Measurement_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Volume_at_Measurement_Condition,
        setexceedThresholdEVC_02_Volume_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Volume_at_Measurement_Condition,
        setmaintainEVC_02_Volume_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(
            EVC_02_Volume_at_Measurement_Condition as any
        );
        const highValue = EVC_02_Volume_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_02_Volume_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Volume_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Volume_at_Measurement_Condition
        ) {
            setexceedThresholdEVC_02_Volume_at_Measurement_Condition(
                EVC_02_Volume_at_Measurement_ConditionValue >= highValue ||
                    EVC_02_Volume_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_02_Volume_at_Measurement_Condition,
        EVC_02_Volume_at_Measurement_Condition_High,
        EVC_02_Volume_at_Measurement_Condition_Low,
        maintainEVC_02_Volume_at_Measurement_Condition,
    ]);

    // ===================================================================================================================
    const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] =
        useState<string | null>(null);

    const [
        EVC_02_Flow_at_Base_Condition_High,
        setEVC_02_Flow_at_Base_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_02_Flow_at_Base_Condition_Low,
        setEVC_02_Flow_at_Base_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Flow_at_Base_Condition,
        setexceedThresholdEVC_02_Flow_at_Base_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Flow_at_Base_Condition,
        setmaintainEVC_02_Flow_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_02_Flow_at_Base_ConditionValue = parseFloat(
            EVC_02_Flow_at_Base_Condition as any
        );
        const highValue = EVC_02_Flow_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_02_Flow_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Flow_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Flow_at_Base_Condition
        ) {
            setexceedThresholdEVC_02_Flow_at_Base_Condition(
                EVC_02_Flow_at_Base_ConditionValue >= highValue ||
                    EVC_02_Flow_at_Base_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_02_Flow_at_Base_Condition,
        EVC_02_Flow_at_Base_Condition_High,
        EVC_02_Flow_at_Base_Condition_Low,
        maintainEVC_02_Flow_at_Base_Condition,
    ]);

    // ===================================================================================================================

    const [
        EVC_02_Flow_at_Measurement_Condition,
        setEVC_02_Flow_at_Measurement_Condition,
    ] = useState<string | null>(null);

    const [
        EVC_02_Flow_at_Measurement_Condition_High,
        setEVC_02_Flow_at_Measurement_Condition_High,
    ] = useState<number | null>(null);
    const [
        EVC_02_Flow_at_Measurement_Condition_Low,
        setEVC_02_Flow_at_Measurement_Condition_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Flow_at_Measurement_Condition,
        setexceedThresholdEVC_02_Flow_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Flow_at_Measurement_Condition,
        setmaintainEVC_02_Flow_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(
            EVC_02_Flow_at_Measurement_Condition as any
        );
        const highValue = EVC_02_Flow_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_02_Flow_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Flow_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Flow_at_Measurement_Condition
        ) {
            setexceedThresholdEVC_02_Flow_at_Measurement_Condition(
                EVC_02_Flow_at_Measurement_ConditionValue >= highValue ||
                    EVC_02_Flow_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [
        EVC_02_Flow_at_Measurement_Condition,
        EVC_02_Flow_at_Measurement_Condition_High,
        EVC_02_Flow_at_Measurement_Condition_Low,
        maintainEVC_02_Flow_at_Measurement_Condition,
    ]);

    //====================================================================

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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    bottom: 4,
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
                                        {ValueGas.SVF}:
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

                                        marginLeft: 10,
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 4,

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
                                        {ValueGas.GVF}:
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
                                        marginLeft: 10,
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 4,

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
                                        {ValueGas.SVA}:
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
                                        marginLeft: 10,
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 4,

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
                                        {ValueGas.GVA}:
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
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Flow_at_Base_Condition") {
                const roundedEVC_02_Flow_at_Base_Condition =
                    EVC_02_Flow_at_Base_Condition !== null
                        ? parseFloat(EVC_02_Flow_at_Base_Condition).toFixed(2)
                        : "";

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
                                    bottom: 4,

                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Flow_at_Base_Condition &&
                                        !maintainEVC_02_Flow_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Flow_at_Base_Condition
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
                                        {ValueGas.SVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedEVC_02_Flow_at_Base_Condition}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Flow_at_Measurement_Condition") {
                const roundedEVC_02_Flow_at_Measurement_Condition =
                    EVC_02_Flow_at_Measurement_Condition !== null
                        ? parseFloat(
                              EVC_02_Flow_at_Measurement_Condition
                          ).toFixed(2)
                        : "";

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
                                    bottom: 4,

                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Flow_at_Measurement_Condition &&
                                        !maintainEVC_02_Flow_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Flow_at_Measurement_Condition
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
                                            roundedEVC_02_Flow_at_Measurement_Condition
                                        }
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Volume_at_Base_Condition") {
                const roundedEVC_02_Volume_at_Base_Condition =
                    EVC_02_Volume_at_Base_Condition !== null
                        ? parseFloat(EVC_02_Volume_at_Base_Condition).toFixed(2)
                        : "";

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
                                    bottom: 4,

                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Volume_at_Base_Condition &&
                                        !maintainEVC_02_Volume_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Volume_at_Base_Condition
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
                                        {ValueGas.SVA}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedEVC_02_Volume_at_Base_Condition}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Volume_at_Measurement_Condition") {
                const roundedEVC_02_Volume_at_Measurement_Condition =
                    EVC_02_Volume_at_Measurement_Condition !== null
                        ? parseFloat(
                              EVC_02_Volume_at_Measurement_Condition
                          ).toFixed(2)
                        : "";

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
                                    bottom: 4,

                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Volume_at_Measurement_Condition &&
                                        !maintainEVC_02_Volume_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Volume_at_Measurement_Condition
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
                                        {ValueGas.GVA}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {
                                            roundedEVC_02_Volume_at_Measurement_Condition
                                        }
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_3001A_DATA") {
                const roundedPT02 =
                    PIT_3001A !== null ? parseFloat(PIT_3001A).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPIT_3001A &&
                                        !maintainPIT_3001A
                                            ? "#ff5656"
                                            : maintainPIT_3001A
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
                                        PIT-3001A:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_3001B_DATA") {
                const roundedPT02 =
                    PIT_3001B !== null ? parseFloat(PIT_3001B).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPIT_3001B &&
                                        !maintainPIT_3001B
                                            ? "#ff5656"
                                            : maintainPIT_3001B
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
                                        PIT-3001B:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PT_3001_DATA") {
                const roundedPT02 =
                    PT_3001 !== null ? parseFloat(PT_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3001 &&
                                        !maintainPT_3001
                                            ? "#ff5656"
                                            : maintainPT_3001
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
                                        PT-3001:
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
                                        marginLeft: 15,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PT_3002_DATA") {
                const roundedPT02 =
                    PT_3002 !== null ? parseFloat(PT_3002).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3002 &&
                                        !maintainPT_3002
                                            ? "#ff5656"
                                            : maintainPT_3002
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
                                        PT-3002:
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
                                        marginLeft: 15,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Pressure_DATA") {
                const roundedPT02 =
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdEVC_02_Pressure &&
                                        !maintainEVC_02_Pressure
                                            ? "#ff5656"
                                            : maintainEVC_02_Pressure
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
                                        {ValueGas.EVC_02_Pressure} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    BarA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_01_Pressure_DATA") {
                const roundedPT02 =
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdEVC_01_Pressure &&
                                        !maintainEVC_01_Pressure
                                            ? "#ff5656"
                                            : maintainEVC_01_Pressure
                                            ? "orange"
                                            : "transparent",
                                    marginLeft: 10,
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
                                        {ValueGas.EVC_01_Pressure}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    BarA
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "EVC_01_Temperature_DATA") {
                const roundedPT02 =
                    EVC_01_Temperature !== null
                        ? parseFloat(EVC_01_Temperature).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdEVC_01_Temperature &&
                                        !maintainEVC_01_Temperature
                                            ? "#ff5656"
                                            : maintainEVC_01_Temperature
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
                                        {ValueGas.EVC_01_Temperature}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "EVC_02_Temperature_DATA") {
                const roundedPT02 =
                    EVC_02_Temperature !== null
                        ? parseFloat(EVC_02_Temperature).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdEVC_02_Temperature &&
                                        !maintainEVC_02_Temperature
                                            ? "#ff5656"
                                            : maintainEVC_02_Temperature
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
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_3001A_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: "black", marginLeft: 10 }}>
                                    PCV-3001A: {PCV_3001A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_3001B_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: "black", marginLeft: 10 }}>
                                    PCV-3001B: {PCV_3001B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_3002A_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,

                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: "black" }}>
                                    PCV-3002A: {PCV_3002A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_3002B_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,

                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: "black" }}>
                                    PCV-3002B: {PCV_3002B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_3001A") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_3001A === "1"
                                        ? SVD_NO
                                        : SDV_3001A === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_3001B") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_3001B === "1"
                                        ? SVD_NO
                                        : SDV_3001B === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_3002") {
                return {
                    ...node,

                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_3002 === "1"
                                        ? SVD_NO
                                        : SDV_3002 === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "TT_3001_DATA") {
                const roundedPT02 =
                    TT_3001 !== null ? parseFloat(TT_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTT_3001 &&
                                        !maintainTT_3001
                                            ? "#ff5656"
                                            : maintainTT_3001
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
                                        TT-3001:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    ˚C
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PT_3003_DATA") {
                const roundedPT02 =
                    PT_3003 !== null ? parseFloat(PT_3003).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3003 &&
                                        !maintainPT_3003
                                            ? "#ff5656"
                                            : maintainPT_3003
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
                                        PT-3003:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
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
                                        marginLeft: 10,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GD_3001") {
                const roundedPT02 =
                    GD_3001 !== null ? parseFloat(GD_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdGD_3001 &&
                                        !maintainGD_3001
                                            ? "#ff5656"
                                            : maintainGD_3001
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
                                        GD-3001:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        marginLeft: 10,

                                        top: 5,
                                    }}
                                >
                                    %LEL
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_3001A") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PSV-3001A: {PSV_3001A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_3002A") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PSV-3002A: {PSV_3002A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_3001B") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PSV-3001B: {PSV_3001B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_3002B") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PSV-3002B: {PSV_3002B} BarG
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
                                    <p style={{ marginLeft: 5 }}>
                                        {EVC_02_Conn_STT === "1" ? (
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
                                    width: "50px",
                                    border: "1px solid red",
                                    position: "relative",
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
                                            backgroundColor: "yellow",
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
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionPRU");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
                const initialPositions = {
              AlarmCenter: { x: -914.1523303275185, y: 750.7002523253735 },
              Arrow10: { x: -545.9342380564901, y: 1235.848639932193 },
              BallVavleLine2_Bottom: {
                  x: -1752.748552461399,
                  y: 1398.7809179318454,
              },
              BallVavleLine2_Bottom_none: {
                  x: -1739.1152406034073,
                  y: 1430.2199359776428,
              },
              BallVavleLine2_Top: {
                  x: -1754.9752547260307,
                  y: 1066.3945634448808,
              },
              BallVavleLine2_Top_none: {
                  x: -1740.7857064948557,
                  y: 1097.0254070197795,
              },
              BallVavleLine3_Bottom_none: {
                  x: -1188.6007658649082,
                  y: 1430.7062254963867,
              },
              BallVavleLine3_Top_none: {
                  x: -1190.3857919153643,
                  y: 1097.999896447289,
              },
              BallVavle_Line3_Bottom: {
                  x: -1203.020965699144,
                  y: 1399.2185849353757,
              },
              BallVavle_Line3_Top: {
                  x: -1204.4484013514104,
                  y: 1066.748043368249,
              },
              DownArrow: { x: -2443.3288674803475, y: 1576.7373833505735 },
              EVC_01_Flow_at_Base_Condition: {
                  x: -1300.2117083264288,
                  y: 751.5293893652726,
              },
              EVC_01_Flow_at_Measurement_Condition: {
                  x: -1300.4747755822623,
                  y: 812.9342555162998,
              },
              EVC_01_Pressure_COL: {
                  x: -1422.6213132405162,
                  y: 1463.468095326561,
              },
              EVC_01_Pressure_DATA: {
                  x: -1300.5518647911813,
                  y: 874.307982790011,
              },
              EVC_01_Pressure_IMG: {
                  x: -1455.2210748964526,
                  y: 1400.4111483146833,
              },
              EVC_01_Pressure_NONE: {
                  x: -1424.2458626037571,
                  y: 1021.7335838041611,
              },
              EVC_01_Temperature: {
                  x: -1384.3876204395422,
                  y: 1377.3823609961598,
              },
              EVC_01_Temperature_COL: {
                  x: -1360.9590194746786,
                  y: 1427.2945127887838,
              },
              EVC_01_Temperature_DATA: {
                  x: -1651.9839445793107,
                  y: 873.7849536634603,
              },
              EVC_01_Temperature_NONE: {
                  x: -1362.8266325377226,
                  y: 977.2539852046791,
              },
              EVC_01_Volume_at_Base_Condition: {
                  x: -1651.3638601651735,
                  y: 751.2185853413771,
              },
              EVC_01_Volume_at_Measurement_Condition: {
                  x: -1651.889586160885,
                  y: 812.6874699639815,
              },
              EVC_02_Flow_at_Base_Condition: {
                  x: -1304.5045612961057,
                  y: 1526.246568287584,
              },
              EVC_02_Flow_at_Measurement_Condition: {
                  x: -1304.6902205234626,
                  y: 1587.58097045636,
              },
              EVC_02_Pressure_COL: {
                  x: -1425.0343776799361,
                  y: 1050.2965580409796,
              },
              EVC_02_Pressure_DATA: {
                  x: -1304.6862397428831,
                  y: 1648.7497951092391,
              },
              EVC_02_Pressure_IMG: {
                  x: -1457.3119231476958,
                  y: 987.4972191813588,
              },
              EVC_02_Pressure_NONE: {
                  x: -1422.6407988495287,
                  y: 1424.3535206118927,
              },
              EVC_02_Temperature: {
                  x: -1385.8650633329748,
                  y: 960.1049085729308,
              },
              EVC_02_Temperature_COL: {
                  x: -1362.8971911342087,
                  y: 1007.3441734368228,
              },
              EVC_02_Temperature_DATA: {
                  x: -1655.6231376798764,
                  y: 1649.0182904812473,
              },
              EVC_02_Temperature_NONE: {
                  x: -1361.3563019384721,
                  y: 1396.8762550311894,
              },
              EVC_02_Volume_at_Base_Condition: {
                  x: -1655.441578959918,
                  y: 1526.3262726240537,
              },
              EVC_02_Volume_at_Measurement_Condition: {
                  x: -1655.518638620903,
                  y: 1587.742152328961,
              },
              FIQ_2001A: { x: -1376.2594215963863, y: 1088.2610822726886 },
              FIQ_2001B: { x: -1380.2615237408395, y: 1420.5100867355798 },
              GD_3001: { x: -989.3020106788827, y: 1318.7155007722488 },
              GD_IMG: { x: -902.3496415151986, y: 1386.2752067158738 },
              Header: { x: -2332.820092483261, y: 648.7682137524797 },
              PCV_3001A: { x: -1673.1177611019, y: 1384.1107119962714 },
              PCV_3001A_DATA: { x: -2170.9650034926362, y: 1130.7404080690226 },
              PCV_3001A_SmallBallVavle: {
                  x: -1590.1177892854255,
                  y: 1391.8848130414924,
              },
              PCV_3001A_none: { x: -1578.8253266041704, y: 1437.998001843855 },
              PCV_3001A_none2: {
                  x: -1644.8538756176888,
                  y: 1406.5995698502961,
              },
              PCV_3001B: { x: -1677.3656150260101, y: 1052.000421403267 },
              PCV_3001B_DATA: { x: -2176.351987591129, y: 1459.1757585792388 },
              PCV_3001B_SmallBallVavle: {
                  x: -1589.286173260068,
                  y: 1060.1713499375644,
              },
              PCV_3001B_none: { x: -1648.0670889230703, y: 1076.0206445548827 },
              PCV_3001B_none2: { x: -1577.480563248409, y: 1105.4215156026714 },
              PCV_3002A_DATA: { x: -1732.3997094020176, y: 1126.9918815357198 },
              PCV_3002B_DATA: { x: -1731.7040390057148, y: 1459.3124743874007 },
              PCV_line1_Bottom: {
                  x: -2111.3678672845463,
                  y: 1052.190596866844,
              },
              PCV_line1_Bottom_SmallBallVavle: {
                  x: -2021.0842967435187,
                  y: 1392.2146663154426,
              },
              PCV_line1_Bottom_none: {
                  x: -2082.0447320338617,
                  y: 1406.8642014517307,
              },
              PCV_line1_Bottom_none2: {
                  x: -2009.774232806013,
                  y: 1437.5474817836612,
              },
              PCV_line1_Top: { x: -2112.3004799183254, y: 1384.5659352076464 },
              PCV_line1_Top_SmallBallVavle: {
                  x: -2020.758188887233,
                  y: 1058.572245211475,
              },
              PCV_line1_Top_none: {
                  x: -2079.1641412034114,
                  y: 1073.0229180707613,
              },
              PCV_line1_Top_none2: {
                  x: -2009.2581888872328,
                  y: 1105.293210440453,
              },
              PIT_3001A_COL: { x: -2223.7823195244755, y: 1413.1118233040602 },
              PIT_3001A_DATA: { x: -2348.6186513642347, y: 870.9225639134092 },
              PIT_3001A_IMG: { x: -2256.3886863103135, y: 1350.0078011634216 },
              PIT_3001A_NONE: { x: -2223.5907768540847, y: 1035.0138867797907 },
              PIT_3001B_COL: { x: -2225.3219072376414, y: 1080.2834482527587 },
              PIT_3001B_DATA: { x: -2348.8352724506376, y: 1526.9945389222787 },
              PIT_3001B_IMG: { x: -2258.0017870023357, y: 1017.8084631612446 },
              PIT_3001B_NONE: { x: -2223.5238297655524, y: 1390.9192962280708 },
              PSV_3001A: { x: -1806.4495698232004, y: 966.4171746665486 },
              PSV_3001B: { x: -1799.9019866867252, y: 1297.6141788823015 },
              PSV_3002A: { x: -1500.6943362170002, y: 969.58257364993 },
              PSV_3002B: { x: -1493.6020428530078, y: 1296.9325533391168 },
              PSV_LINE2_BOTTOM: {
                  x: -1822.5499935425808,
                  y: 1022.9152979362718,
              },
              PSV_LINE2_BOTTOM_HALFCIRCLE: {
                  x: -1537.0489668387918,
                  y: 962.2028750034647,
              },
              PSV_LINE2_BOTTOM_NONE: {
                  x: -1800.2748765223484,
                  y: 1071.4335361920557,
              },
              PSV_LINE2_BOTTOM_NONE1: {
                  x: -1823.0693694333604,
                  y: 1360.4020119665827,
              },
              PSV_LINE2_BOTTOM_NONE2: {
                  x: -1823.263852446076,
                  y: 1315.6438506423797,
              },
              PSV_LINE2_BOTTOM_RIGHT: {
                  x: -1841.9793816682281,
                  y: 1003.5894848459614,
              },
              PSV_LINE2_TOP: { x: -1824.621004682478, y: 1357.2168795688774 },
              PSV_LINE2_TOP_HALFCIRCLE: {
                  x: -1846.419275542719,
                  y: 961.8665937984044,
              },
              PSV_LINE2_TOP_NONE: {
                  x: -1802.2062318196358,
                  y: 1404.2787700504089,
              },
              PSV_LINE2_TOP_NONE1: {
                  x: -1822.49563729746,
                  y: 1025.4738191234321,
              },
              PSV_LINE2_TOP_NONE2: {
                  x: -1820.713980893797,
                  y: 982.7946809276918,
              },
              PSV_LINE2_TOP_RIGHT: {
                  x: -1843.7363814733678,
                  y: 1337.2167064142152,
              },
              PSV_LINE3_BOTTOM: {
                  x: -1513.9276090762096,
                  y: 1023.2929663757193,
              },
              PSV_LINE3_BOTTOM_HALFCIRCLE: {
                  x: -1847.8476607451094,
                  y: 1294.5969973308625,
              },
              PSV_LINE3_BOTTOM_NONE: {
                  x: -1491.5458949259623,
                  y: 1402.9749944793095,
              },
              PSV_LINE3_BOTTOM_NONE1: {
                  x: -1513.9942216185614,
                  y: 1359.7067206930428,
              },
              PSV_LINE3_BOTTOM_NONE2: {
                  x: -1512.9767227486302,
                  y: 1314.4270541042574,
              },
              PSV_LINE3_BOTTOM_RIGHT: {
                  x: -1533.4478790692137,
                  y: 1003.5774869187717,
              },
              PSV_LINE3_TOP: { x: -1514.7416075320712, y: 1357.7240669142898 },
              PSV_LINE3_TOP_HALFCIRCLE: {
                  x: -1537.643267778939,
                  y: 1294.1557057434507,
              },
              PSV_LINE3_TOP_NONE: {
                  x: -1491.4345428387423,
                  y: 1068.5155162952701,
              },
              PSV_LINE3_TOP_NONE1: {
                  x: -1514.2952576203431,
                  y: 1026.4316416628542,
              },
              PSV_LINE3_TOP_NONE2: {
                  x: -1512.9987054998287,
                  y: 983.159710586679,
              },
              PSV_LINE3_TOP_RIGHT: {
                  x: -1533.786401000067,
                  y: 1337.8006420545576,
              },
              PT_3001_COL: { x: -1944.126211137847, y: 1414.8743710777078 },
              PT_3001_DATA: { x: -2062.9474286701056, y: 871.9588473450049 },
              PT_3001_IMG: { x: -1976.3967429262366, y: 1351.9634634096726 },
              PT_3001_NONE: { x: -1938.0753232184695, y: 1045.530553967972 },
              PT_3002_COL: { x: -1939.3531774900025, y: 1082.027958478726 },
              PT_3002_DATA: { x: -2067.9964811841455, y: 1526.3956606647857 },
              PT_3002_IMG: { x: -1971.8531774900027, y: 1019.033781469687 },
              PT_3002_NONE: { x: -1943.220994341128, y: 1393.0940219176825 },
              SDV_3001A: { x: -2375.7904529874913, y: 1046.6822941858263 },
              SDV_3001A_Name: { x: -2408.757431714083, y: 1018.4506281074462 },
              SDV_3001B: { x: -2377.0898761861, y: 1379.0178060073683 },
              SDV_3001B_Name: { x: -2411.6354714981053, y: 1348.6127064386965 },
              SDV_3002: { x: -653.7026272334658, y: 1210.1260672163446 },
              SDV_3002_Name: { x: -694.8783133128501, y: 1178.06997145104 },
              TT_3001: { x: -1024.6693805861637, y: 1196.2161585621343 },
              TT_3001_COL: { x: -1001.6514199634926, y: 1243.4512827449053 },
              TT_3001_DATA: { x: -1107.1297683556631, y: 1099.0937179243501 },
              TT_3001_NONE: { x: -610.2603899665803, y: 1209.4943855440024 },
              PT_3003: { x: -804.9838255763632, y: 1193.6908985163677 },
              PT_3003_COL: { x: -772.6201142386359, y: 1255.823965495775 },
              PT_3003_DATA: { x: -881.5805709775428, y: 1097.9621390192506 },
              PT_3003_NONE: { x: -629.1520213626982, y: 1210.0446422285258 },
              bor1: { x: -2436.5855686504956, y: 1039.1608637258034 },
              bor2: { x: -983.1512218888312, y: 1025.8994423073616 },
              bor3: { x: -2320.8078213113167, y: 1680.894788044694 },
              bor4: { x: -950.4329469573597, y: 1583.0590100592938 },
              borderWhite: { x: -2378.220025932068, y: 632.5724848353368 },
              line1: { x: -2410.5925492337, y: 1618.373867274551 },
              line2: { x: -2410.891552880127, y: 1598.1196367183622 },
              line3: { x: -2081.3904520635083, y: 1098.5296705520232 },
              line4: { x: -2082.153208656881, y: 1430.8103326059108 },
              line5: { x: -1647.2085647611, y: 1098.3740496757796 },
              line6: { x: -1643.3489136999835, y: 1430.6385004862382 },
              line7: { x: -1336.2923834627995, y: 1098.3096365331119 },
              line8: { x: -1334.9498607206287, y: 1430.742252363529 },
              line9: { x: -925.9976477005001, y: 1260.4714803086474 },
              line9none: { x: -1148.3698628173815, y: 1260.4228327419648 },
              line10: { x: -531.9035836581911, y: 1260.593609780011 },
              line10none: { x: -880.6662088366958, y: 1260.3787384164796 },
              percent: { x: -405.6683476271253, y: 1298.7587875755169 },
              timeUpdate3: { x: -2336.2287424299593, y: 709.0412944066101 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================
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
                                    fontSize: 35,
                                    fontWeight: 600,
                                    color: "#ffaa00",
                                }}
                            >
                                CNG HUNG YEN
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
                width: 330,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_3001A",
            position: positions.PSV_3001A,
            type: "custom",
            data: {
                label: <div>1A</div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_3001B",
            position: positions.PSV_3001B,
            type: "custom",
            data: {
                label: <div>1B</div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_3002A",
            position: positions.PSV_3002A,
            type: "custom",
            data: {
                label: <div>2A</div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_3002B",
            position: positions.PSV_3002B,
            type: "custom",
            data: {
                label: <div>2B</div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        // =================== data ================================

        {
            id: "FIQ_2001A",
            position: positions.FIQ_2001A,
            type: "custom",
            data: {
                label: <div>FIQ-3001A</div>,
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
            id: "FIQ_2001B",
            position: positions.FIQ_2001B,
            type: "custom",
            data: {
                label: <div>FIQ-3001B</div>,
            },
            sourcePosition: Position.Bottom,
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
            id: "EVC_01_Volume_at_Measurement_Condition",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
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
                width: 350,

                height: 60,
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
                            fontSize: 18,
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
                width: 350,

                height: 60,
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
                            fontSize: 18,
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
                width: 350,
                height: 60,
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
                width: 350,
                height: 60,
            },
            targetPosition: Position.Right,
        },

        {
            id: "EVC_02_Flow_at_Base_Condition",
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

            position: positions.EVC_02_Flow_at_Base_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 350,

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_02_Flow_at_Measurement_Condition",
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

            position: positions.EVC_02_Flow_at_Measurement_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 350,

                height: 60,
            },
            targetPosition: Position.Left,
        },
        {
            id: "EVC_02_Volume_at_Base_Condition",
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

            position: positions.EVC_02_Volume_at_Base_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 350,

                height: 60,
            },
            targetPosition: Position.Top,
        },
        {
            id: "EVC_02_Volume_at_Measurement_Condition",
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

            position: positions.EVC_02_Volume_at_Measurement_Condition,

            style: {
                background: borderBox,
                border: "1px solid white",
                width: 350,

                height: 60,
            },
            targetPosition: Position.Top,
        },

        //==================================================================
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line8",
            position: positions.line8,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line9",
            position: positions.line9,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line10",
            position: positions.line10,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "line9none",
            position: positions.line9none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line10none",
            position: positions.line10none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "DownArrow",
            position: positions.DownArrow,
            type: "custom",
            data: {
                label: <div>{DownArrow}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "Arrow10",
            position: positions.Arrow10,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_IMG",
            position: positions.GD_IMG,
            type: "custom",
            data: {
                label: <div>{GD}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_3001",
            position: positions.GD_3001,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: "auto",
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
        },
        //==========================Ball vavle line 2  ==========================
        {
            id: "BallVavleLine2_Top_none",
            position: positions.BallVavleLine2_Top_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine2_Bottom_none",
            position: positions.BallVavleLine2_Bottom_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine2_Top",
            position: positions.BallVavleLine2_Top,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line2_Top />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "BallVavleLine2_Bottom",
            position: positions.BallVavleLine2_Bottom,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line2_Bottom />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        //==========================Ball vavle line 3  ==========================
        {
            id: "BallVavleLine3_Top_none",
            position: positions.BallVavleLine3_Top_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine3_Bottom_none",
            position: positions.BallVavleLine3_Bottom_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavle_Line3_Top",
            position: positions.BallVavle_Line3_Top,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line3_Top />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "BallVavle_Line3_Bottom",
            position: positions.BallVavle_Line3_Bottom,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line3_Bottom />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        //==========================Ball vavle ==========================

        {
            id: "PCV_3001A",
            position: positions.PCV_3001A,
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
            id: "PCV_3001B",
            position: positions.PCV_3001B,
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
            id: "PCV_line1_Top",
            position: positions.PCV_line1_Top,
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
            id: "PCV_line1_Bottom",
            position: positions.PCV_line1_Bottom,
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
            id: "PCV_line1_Bottom_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Bottom_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line1_Top_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Top_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_3001B_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_3001B_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_3001A_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_3001A_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_line1_Bottom_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Bottom_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line1_Top_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Top_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
        },

        {
            id: "PCV_3001B_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_3001B_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_3001A_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_3001A_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_line1_Bottom_SmallBallVavle",
            position: positions.PCV_line1_Bottom_SmallBallVavle,
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
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line1_Top_SmallBallVavle",
            position: positions.PCV_line1_Top_SmallBallVavle,
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
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_3001A_SmallBallVavle",
            position: positions.PCV_3001A_SmallBallVavle,
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
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_3001B_SmallBallVavle",
            position: positions.PCV_3001B_SmallBallVavle,
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
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_3001A_DATA",
            position: positions.PCV_3001A_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_3001B_DATA",
            position: positions.PCV_3001B_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_3002A_DATA",
            position: positions.PCV_3002A_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_3002B_DATA",
            position: positions.PCV_3002B_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: "auto",
                height: 45,

                background: "none",
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        //==============PIT ===================

        {
            id: "PIT_3001A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_3001A_IMG,
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
            id: "PIT_3001B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_3001B_IMG,
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
            id: "PT_3001_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT_3001_IMG,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PT_3002_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT_3002_IMG,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        // {
        //     id: "EVC_01_Pressure_IMG",
        //     data: {
        //         label: <div>{PTV}</div>,
        //     },

        //     position: positions.EVC_01_Pressure_IMG,
        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // {
        //     id: "EVC_02_Pressure_IMG",
        //     data: {
        //         label: <div>{PTV}</div>,
        //     },

        //     position: positions.EVC_02_Pressure_IMG,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        {
            id: "PIT_3001A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_3001A_COL,
            zIndex: 9999999,
            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 30,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_3001B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_3001B_COL,
            zIndex: 9999999,

            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 30,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PT_3001_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PT_3001_COL,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 30,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_3002_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PT_3002_COL,
            zIndex: 9999,

            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 30,
            },
            targetPosition: Position.Bottom,
        },

        // {
        //     id: "EVC_01_Pressure_COL",
        //     data: {
        //         label: <div></div>,
        //     },

        //     position: positions.EVC_01_Pressure_COL,
        //     zIndex: 9999,
        //     style: {
        //         background: line3,
        //         border: "none",
        //         width: "10px",

        //         height: 60,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // {
        //     id: "EVC_02_Pressure_COL",
        //     data: {
        //         label: <div></div>,
        //     },

        //     position: positions.EVC_02_Pressure_COL,
        //     zIndex: 9999,

        //     style: {
        //         background: line3,
        //         border: "none",
        //         width: "10px",

        //         height: 60,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        {
            id: "PIT_3001A_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_3001A_DATA,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },
        {
            id: "PIT_3001B_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_3001B_DATA,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PT_3001_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PT_3001_DATA,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_3002_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PT_3002_DATA,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "EVC_01_Pressure_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.EVC_01_Pressure_DATA,

            style: {
                border: "1px solid white",
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },
        {
            id: "EVC_02_Pressure_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.EVC_02_Pressure_DATA,

            style: {
                border: "1px solid white",
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "PIT_3001A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_3001A_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_3001B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_3001B_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_3001_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PT_3001_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_3002_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PT_3002_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },

        // {
        //     id: "EVC_01_Pressure_NONE",
        //     data: {
        //         label: <div></div>,
        //     },

        //     position: positions.EVC_01_Pressure_NONE,
        //     zIndex: 9999,

        //     style: {
        //         background: "none",
        //         border: "none",
        //         width: "10px",

        //         height: 0,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // {
        //     id: "EVC_02_Pressure_NONE",
        //     data: {
        //         label: <div></div>,
        //     },

        //     position: positions.EVC_02_Pressure_NONE,
        //     zIndex: 9999,

        //     style: {
        //         background: "none",
        //         border: "none",
        //         width: "10px",

        //         height: 0,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        //===========================  TT LINE ==================================

        // {
        //     id: "EVC_01_Temperature_COL",
        //     position: positions.EVC_01_Temperature_COL,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 100,
        //         background: line3,
        //     },
        // },
        // {
        //     id: "EVC_02_Temperature_COL",
        //     position: positions.EVC_02_Temperature_COL,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 100,
        //         background: line3,
        //     },
        // },
        // {
        //     id: "EVC_01_Temperature",
        //     position: positions.EVC_01_Temperature,
        //     type: "custom",
        //     data: {
        //         label: <div>{GaugeTemperature}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     zIndex: 9999,

        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 10,
        //         background: "none",
        //     },
        // },
        // {
        //     id: "EVC_02_Temperature",
        //     position: positions.EVC_02_Temperature,
        //     type: "custom",
        //     data: {
        //         label: <div>{GaugeTemperature}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     zIndex: 9999,

        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 10,
        //         background: "none",
        //     },
        // },

        //================================  ==================================

        // {
        //     id: "EVC_01_Temperature_COL",
        //     position: positions.EVC_01_Temperature_COL,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,

        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 100,
        //         background: line3,
        //     },
        // },
        // {
        //     id: "EVC_02_Temperature_COL",
        //     position: positions.EVC_02_Temperature_COL,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "none",
        //         width: 10,
        //         height: 100,
        //         background: line3,
        //     },
        // },

        {
            id: "EVC_02_Temperature_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.EVC_02_Temperature_DATA,

            style: {
                border: "1px solid white",
                width: 350,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },
        // {
        //     id: "EVC_02_Temperature_NONE",
        //     position: positions.EVC_02_Temperature_NONE,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Top,
        //     style: {
        //         width: 10,
        //         height: 10,
        //         background: "none",
        //     },
        // },

        {
            id: "EVC_01_Temperature_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.EVC_01_Temperature_DATA,

            style: {
                border: "1px solid white",
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },

        // {
        //     id: "EVC_01_Temperature_NONE",
        //     position: positions.EVC_01_Temperature_NONE,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Top,
        //     style: {
        //         width: 10,
        //         height: 10,
        //         background: "none",
        //     },
        // },
        //========================== PSV line 2  ========================

        {
            id: "PSV_LINE2_TOP",
            position: positions.PSV_LINE2_TOP,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            zIndex: 9999999,

            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_BOTTOM",
            position: positions.PSV_LINE2_BOTTOM,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            zIndex: 9999999,

            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE2_TOP_RIGHT",
            position: positions.PSV_LINE2_TOP_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_BOTTOM_RIGHT",
            position: positions.PSV_LINE2_BOTTOM_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_TOP_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_LINE2_BOTTOM_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE2_BOTTOM_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE2_BOTTOM_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE2_TOP_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE2_TOP_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        //=====================================

        {
            id: "PSV_LINE2_TOP_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE2_TOP_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        {
            id: "PSV_LINE2_BOTTOM_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE2_BOTTOM_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        //========================== PSV line 3  ========================

        {
            id: "PSV_LINE3_TOP_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_LINE3_BOTTOM_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },

        //------------------------------
        {
            id: "PSV_LINE3_TOP_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE3_TOP_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        {
            id: "PSV_LINE3_BOTTOM_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE3_BOTTOM_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },
        //------------------------------

        {
            id: "PSV_LINE3_TOP",
            position: positions.PSV_LINE3_TOP,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE3_BOTTOM",
            position: positions.PSV_LINE3_BOTTOM,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE3_TOP_RIGHT",
            position: positions.PSV_LINE3_TOP_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE3_BOTTOM_RIGHT",
            position: positions.PSV_LINE3_BOTTOM_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE3_BOTTOM_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE3_BOTTOM_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE3_TOP_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE3_TOP_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "SDV_3001A",
            position: positions.SDV_3001A,
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

        {
            id: "SDV_3001B",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_3001B
                    </div>
                ),
            },
            position: positions.SDV_3001B,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 0,
                height: 0,
            },
        },
        {
            id: "SDV_3002",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_3002
                    </div>
                ),
            },
            position: positions.SDV_3002,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 0,
                height: 0,
            },
        },

        {
            id: "SDV_3001A_Name",
            position: positions.SDV_3001A_Name,
            type: "custom",
            data: {
                label: <div>SDV-3001A</div>,
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,
                color: "white",
                background: "none",
                border: "none",
                borderRadius: 5,
            },
        },
        {
            id: "SDV_3001B_Name",
            position: positions.SDV_3001B_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-3001B
                    </div>
                ),
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,
                color: "white",
                background: "none",
                border: "none",
                borderRadius: 5,
            },
        },
        {
            id: "SDV_3002_Name",
            position: positions.SDV_3002_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-3002
                    </div>
                ),
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,
                color: "white",
                background: "none",
                border: "none",
                borderRadius: 5,
            },
        },
        // ==========================================================================================
        {
            id: "TT_3001_COL",
            position: positions.TT_3001_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 30,
                background: line3,
            },
        },

        {
            id: "TT_3001_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TT_3001_DATA,

            style: {
                border: background,
                width: "auto",
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
        },
        {
            id: "TT_3001",
            position: positions.TT_3001,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
                border: "none",
            },
        },

        {
            id: "TT_3001_NONE",
            position: positions.TT_3001_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
                border: "none",
            },
        },

        // ==========================================================================================
        {
            id: "PT_3003_COL",
            position: positions.PT_3003_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 20,
                background: line3,
            },
            zIndex: 9999,
        },

        {
            id: "PT_3003_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 23,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PT_3003_DATA,

            style: {
                border: background,
                width: "auto",
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Top,
        },
        {
            id: "PT_3003",
            position: positions.PT_3003,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
                border: "none",
            },
        },

        {
            id: "PT_3003_NONE",
            position: positions.PT_3003_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
                border: "none",
            },
        },

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

        // {
        //     id: "percent",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     color: "green",
        //                     fontSize: 32,
        //                     fontWeight: 600,
        //                 }}
        //             >
        //                 {" "}
        //             </div>
        //         ),
        //     },
        //     position: positions.percent,

        //     style: {
        //         background: 'none',
        //         border: "1px solid white",
        //         width: 0,
        //         height: 0,
        //         borderRadius: 50,
        //     },
        //     targetPosition: Position.Bottom,
        // },

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

        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <AlarmCNG_HUNGYEN />
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
                if (id === "bor1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor1: position,
                    }));
                } else if (id === "bor2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor2: position,
                    }));
                } else if (id === "bor3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor3: position,
                    }));
                } else if (id === "bor4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor4: position,
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
                } else if (id === "Arrow10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow10: position,
                    }));
                } else if (id === "GD_3001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_3001: position,
                    }));
                } else if (id === "GD_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_IMG: position,
                    }));
                }

                //======================= BallVavle 2 ====================================
                else if (id === "BallVavleLine2_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Top: position,
                    }));
                } else if (id === "BallVavleLine2_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Bottom: position,
                    }));
                } else if (id === "BallVavleLine2_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Top_none: position,
                    }));
                } else if (id === "BallVavleLine2_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Bottom_none: position,
                    }));
                }

                //======================= BallVavle 3 ====================================
                else if (id === "BallVavle_Line3_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavle_Line3_Top: position,
                    }));
                } else if (id === "BallVavle_Line3_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavle_Line3_Bottom: position,
                    }));
                } else if (id === "BallVavleLine3_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine3_Top_none: position,
                    }));
                } else if (id === "BallVavleLine3_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine3_Bottom_none: position,
                    }));
                }

                //======================= BallVavle ====================================
                else if (id === "PCV_3001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001A: position,
                    }));
                } else if (id === "PCV_3001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001B: position,
                    }));
                } else if (id === "PCV_line1_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top: position,
                    }));
                } else if (id === "PCV_line1_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom: position,
                    }));
                } else if (id === "PCV_line1_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_none: position,
                    }));
                } else if (id === "PCV_line1_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_none: position,
                    }));
                } else if (id === "PCV_3001B_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001B_none: position,
                    }));
                } else if (id === "PCV_3001A_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001A_none: position,
                    }));
                } else if (id === "PCV_line1_Bottom_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_none2: position,
                    }));
                } else if (id === "PCV_line1_Top_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_none2: position,
                    }));
                } else if (id === "PCV_3001B_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001B_none2: position,
                    }));
                } else if (id === "PCV_3001A_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001A_none2: position,
                    }));
                } else if (id === "PCV_line1_Bottom_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_3001B_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001B_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_3001A_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001A_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line1_Top_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_3001A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001A_DATA: position,
                    }));
                } else if (id === "PCV_3002A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3002A_DATA: position,
                    }));
                } else if (id === "PCV_3001B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3001B_DATA: position,
                    }));
                } else if (id === "PCV_3002B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_3002B_DATA: position,
                    }));
                }
                //======================= BallVavle ====================================
                else if (id === "PT_3001_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3001_IMG: position,
                    }));
                } else if (id === "PT_3002_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3002_IMG: position,
                    }));
                } else if (id === "PIT_3001A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001A_IMG: position,
                    }));
                } else if (id === "PIT_3001B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001B_IMG: position,
                    }));
                } else if (id === "EVC_01_Pressure_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Pressure_IMG: position,
                    }));
                } else if (id === "EVC_02_Pressure_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Pressure_IMG: position,
                    }));
                } else if (id === "EVC_01_Pressure_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Pressure_COL: position,
                    }));
                } else if (id === "EVC_02_Pressure_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Pressure_COL: position,
                    }));
                } else if (id === "PT_3001_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3001_COL: position,
                    }));
                } else if (id === "PT_3002_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3002_COL: position,
                    }));
                } else if (id === "PIT_3001A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001A_COL: position,
                    }));
                } else if (id === "PIT_3001B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001B_COL: position,
                    }));
                } else if (id === "PIT_3001A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001A_DATA: position,
                    }));
                } else if (id === "PIT_3001B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001B_DATA: position,
                    }));
                } else if (id === "PT_3001_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3001_DATA: position,
                    }));
                } else if (id === "PT_3002_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3002_DATA: position,
                    }));
                } else if (id === "EVC_01_Pressure_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Pressure_DATA: position,
                    }));
                } else if (id === "EVC_02_Pressure_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Pressure_DATA: position,
                    }));
                } else if (id === "PIT_3001A_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001A_NONE: position,
                    }));
                } else if (id === "PIT_3001B_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_3001B_NONE: position,
                    }));
                } else if (id === "PT_3001_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3001_NONE: position,
                    }));
                } else if (id === "PT_3002_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3002_NONE: position,
                    }));
                } else if (id === "EVC_01_Pressure_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Pressure_NONE: position,
                    }));
                } else if (id === "EVC_02_Pressure_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Pressure_NONE: position,
                    }));
                }

                //======================= BallVavle ====================================
                else if (id === "EVC_01_Temperature") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Temperature: position,
                    }));
                } else if (id === "EVC_02_Temperature") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Temperature: position,
                    }));
                } else if (id === "EVC_01_Temperature_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Temperature_COL: position,
                    }));
                } else if (id === "EVC_02_Temperature_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Temperature_COL: position,
                    }));
                } else if (id === "EVC_01_Temperature_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Temperature_DATA: position,
                    }));
                } else if (id === "EVC_02_Temperature_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Temperature_DATA: position,
                    }));
                } else if (id === "EVC_01_Temperature_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_01_Temperature_NONE: position,
                    }));
                } else if (id === "EVC_02_Temperature_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Temperature_NONE: position,
                    }));
                }

                // ========================= PSV LINE 2  ===============================
                else if (id === "PSV_LINE2_TOP_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE1: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE2: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE1: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE2: position,
                    }));
                }

                // ========================= PSV LINE 2  ===============================
                else if (id === "PSV_LINE3_TOP_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE: position,
                    }));
                } else if (id === "PSV_LINE3_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE1: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE2: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE1: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE2: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_HALFCIRCLE: position,
                    }));
                }
                // ========================= Data  ===============================
                else if (id === "SDV_3001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3001A: position,
                    }));
                } else if (id === "SDV_3001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3001B: position,
                    }));
                } else if (id === "SDV_3002") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3002: position,
                    }));
                } else if (id === "SDV_3001A_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3001A_Name: position,
                    }));
                } else if (id === "SDV_3001B_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3001B_Name: position,
                    }));
                } else if (id === "SDV_3002_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_3002_Name: position,
                    }));
                }
                //========================== pit line 1 =========================
                else if (id === "TT_3001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3001: position,
                    }));
                } else if (id === "TT_3001_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3001_DATA: position,
                    }));
                } else if (id === "TT_3001_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3001_COL: position,
                    }));
                } else if (id === "TT_3001_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3001_NONE: position,
                    }));
                }
                //========================== pit line 1 =========================
                else if (id === "PT_3003") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3003: position,
                    }));
                } else if (id === "PT_3003_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3003_DATA: position,
                    }));
                } else if (id === "PT_3003_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3003_COL: position,
                    }));
                } else if (id === "PT_3003_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3003_NONE: position,
                    }));
                } else if (id === "EVC_01_Volume_at_Measurement_Condition") {
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
                } else if (id === "EVC_02_Flow_at_Base_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Flow_at_Base_Condition: position,
                    }));
                } else if (id === "EVC_02_Flow_at_Measurement_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Flow_at_Measurement_Condition: position,
                    }));
                } else if (id === "EVC_02_Volume_at_Base_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Volume_at_Base_Condition: position,
                    }));
                } else if (id === "EVC_02_Volume_at_Measurement_Condition") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        EVC_02_Volume_at_Measurement_Condition: position,
                    }));
                } else if (id === "FIQ_2001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_2001A: position,
                    }));
                } else if (id === "FIQ_2001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_2001B: position,
                    }));
                } else if (id === "PSV_3001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_3001A: position,
                    }));
                } else if (id === "PSV_3001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_3001B: position,
                    }));
                } else if (id === "PSV_3002A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_3002A: position,
                    }));
                } else if (id === "PSV_3002B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_3002B: position,
                    }));
                }

                // =====================================================
                else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                } else if (id === "Header") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Header: position,
                    }));
                } else if (id === "DownArrow") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        DownArrow: position,
                    }));
                } else if (id === "line9none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line9none: position,
                    }));
                } else if (id === "line10none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line10none: position,
                    }));
                } else if (id === "percent") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        percent: position,
                    }));
                } else if (id === "AlarmCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AlarmCenter: position,
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
    //     localStorage.setItem("positionPRU", JSON.stringify(positions));
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
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
