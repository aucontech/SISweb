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
import { id_CNG_BinhDuong } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { SDV_OFF, SDV_ON } from "../../Graphic/MEIKO/GraphicMeiko/iconSVG";
import AlarmCNG_BINHDUONG from "@/layout/AlarmBell/AlarmCNG_BINHDUONG";
import { nameValue } from "../../SetupData/namValue";

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

export default function Graphic_CNG_BINHDUONG() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);

    const [PCV_2001A, setPCV_2001A] = useState();
    const [PCV_2001B, setPCV_2001B] = useState();
    const [PCV_2002A, setPCV_2002A] = useState();
    const [PCV_2002B, setPCV_2002B] = useState();

    const [PSV_2001A, setPSV_2001A] = useState();
    const [PSV_2001B, setPSV_2001B] = useState();
    const [PSV_2002A, setPSV_2002A] = useState();
    const [PSV_2002B, setPSV_2002B] = useState();

    const [SDV_2001A, setSDV_2001A] = useState<any>();
    const [SDV_2001B, setSDV_2001B] = useState<string | null>(null);
    const [SDV_2002, setSDV_2002] = useState<string | null>(null);

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
                    entityId: id_CNG_BinhDuong,
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
                                key: "PCV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002B",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_CNG_BinhDuong,
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
                                key: "PCV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002B",
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
                        PIT_2006: setPIT_2006,
                        PIT_2007: setPIT_2007,
                        PT_2001: setPT_2001,
                        PT_2002: setPT_2002,

                        EVC_01_Pressure: setEVC_01_Pressure,
                        EVC_02_Pressure: setEVC_02_Pressure,
                        EVC_01_Temperature: setEVC_01_Temperature,
                        EVC_02_Temperature: setEVC_02_Temperature,

                        SDV_2001A: setSDV_2001A,
                        SDV_2001B: setSDV_2001B,
                        SDV_2002: setSDV_2002,
                        TT_2001: setTT_2001,
                        PT_2003: setPT_2003,
                        GD_2001: setGD_2001,

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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2001A
                            .value;
                    setPCV_2001A(ballValue);
                    const ballValueB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2001B
                            .value;
                    setPCV_2001B(ballValueB);
                    const ballValue2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2002B
                            .value;
                    setPCV_2002B(ballValue2B);
                    const ballValue2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2002A
                            .value;
                    setPCV_2002A(ballValue2A);

                    const ballValueS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2001A
                            .value;
                    setPSV_2001A(ballValueS);
                    const ballValueSB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2001B
                            .value;
                    setPSV_2001B(ballValueSB);
                    const ballValueS2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2002B
                            .value;
                    setPSV_2002B(ballValueS2B);
                    const ballValueS2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2002A
                            .value;
                    setPSV_2002A(ballValueS2A);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2001A.value;
                    setPCV_2001A(updatedData);
                    const updatedDataB =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2001B.value;
                    setPCV_2001B(updatedDataB);

                    const ballValue2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2002A.value;
                    setPCV_2002A(ballValue2B);
                    const updatedEVC_01_Volume_at_Base_ConditionA =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2002B.value;
                    setPCV_2002B(updatedEVC_01_Volume_at_Base_ConditionA);

                    const updatedDataS =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2001A.value;
                    setPSV_2001A(updatedDataS);
                    const updatedDataSB =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2001B.value;
                    setPSV_2001B(updatedDataSB);

                    const ballValueS2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2002A.value;
                    setPSV_2002A(ballValueS2B);
                    const updatedDataS2A =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2002B.value;
                    setPSV_2002B(updatedDataS2A);
                }

                fetchData();
            };
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/values/attributes/SERVER_SCOPE`
            );

            const HighPIT_2006 = res.data.find(
                (item: any) => item.key === "PIT_2006_High"
            );
            setPIT_2006_High(HighPIT_2006?.value || null);
            const LowPIT_2006 = res.data.find(
                (item: any) => item.key === "PIT_2006_Low"
            );
            setPIT_2006_Low(LowPIT_2006?.value || null);

            const MaintainPIT_2006 = res.data.find(
                (item: any) => item.key === "PIT_2006_Maintain"
            );
            setmaintainPIT_2006(MaintainPIT_2006?.value || false);
            //===========================================================================================

            const HighPIT_2007 = res.data.find(
                (item: any) => item.key === "PIT_2007_High"
            );
            setPIT_2007_High(HighPIT_2007?.value || null);
            const LowPIT_2007 = res.data.find(
                (item: any) => item.key === "PIT_2007_Low"
            );
            setPIT_2007_Low(LowPIT_2007?.value || null);

            const MaintainPIT_2007 = res.data.find(
                (item: any) => item.key === "PIT_2007_Maintain"
            );
            setmaintainPIT_2007(MaintainPIT_2007?.value || false);
            //===========================================================================================

            const HighPT_2001 = res.data.find(
                (item: any) => item.key === "PT_2001_High"
            );
            setPT_2001_High(HighPT_2001?.value || null);
            const LowPT_2001 = res.data.find(
                (item: any) => item.key === "PT_2001_Low"
            );
            setPT_2001_Low(LowPT_2001?.value || null);

            const PT_2001_Maintain = res.data.find(
                (item: any) => item.key === "PT_2001_Maintain"
            );
            setmaintainPT_2001(PT_2001_Maintain?.value || false);

            //===========================================================================================

            const HighPT_2002 = res.data.find(
                (item: any) => item.key === "PT_2002_High"
            );
            setPT_2002_High(HighPT_2002?.value || null);

            const LowPT_2002 = res.data.find(
                (item: any) => item.key === "PT_2002_Low"
            );
            setPT_2002_Low(LowPT_2002?.value || null);

            const PT_2002_Maintain = res.data.find(
                (item: any) => item.key === "PT_2002_Maintain"
            );
            setmaintainPT_2002(PT_2002_Maintain?.value || false);
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

            const HighTT_2001 = res.data.find(
                (item: any) => item.key === "TT_2001_High"
            );
            setTT_2001_High(HighTT_2001?.value || null);

            const LowTT_2001 = res.data.find(
                (item: any) => item.key === "TT_2001_Low"
            );
            setTT_2001_Low(LowTT_2001?.value || null);

            const TT_2001_Maintain = res.data.find(
                (item: any) => item.key === "TT_2001_Maintain"
            );
            setmaintainTT_2001(TT_2001_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighPT_2003 = res.data.find(
                (item: any) => item.key === "PT_2003_High"
            );
            setPT_2003_High(HighPT_2003?.value || null);

            const LowPT_2003 = res.data.find(
                (item: any) => item.key === "PT_2003_Low"
            );
            setPT_2003_Low(LowPT_2003?.value || null);

            const PT_2003_Maintain = res.data.find(
                (item: any) => item.key === "PT_2003_Maintain"
            );
            setmaintainPT_2003(PT_2003_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighGD_2001 = res.data.find(
                (item: any) => item.key === "GD_2001_High"
            );
            setGD_2001_High(HighGD_2001?.value || null);

            const LowGD_2001 = res.data.find(
                (item: any) => item.key === "GD_2001_Low"
            );
            setGD_2001_Low(LowGD_2001?.value || null);

            const GD_2001_Maintain = res.data.find(
                (item: any) => item.key === "GD_2001_Maintain"
            );
            setmaintainGD_2001(GD_2001_Maintain?.value || false);
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
        PIT_2006: "PIT_2006",
        PIT_2007: "PIT_2007",
        PT_2001: "PT_2001",
        PT_2002: "PT_2002",
        EVC_01_Pressure: "Output Pressure",
        EVC_02_Pressure: "Output Pressure",

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
    //================================ PIT_2006================================

    const [PIT_2006, setPIT_2006] = useState<string | null>(null);

    const [PIT_2006_High, setPIT_2006_High] = useState<number | null>(null);
    const [PIT_2006_Low, setPIT_2006_Low] = useState<number | null>(null);
    const [exceedThresholdPIT_2006, setexceedThresholdPIT_2006] =
        useState(false);

    const [maintainPIT_2006, setmaintainPIT_2006] = useState<boolean>(false);

    useEffect(() => {
        const PIT_2006Value = parseFloat(PIT_2006 as any);
        const highValue = PIT_2006_High ?? NaN;
        const lowValue = PIT_2006_Low ?? NaN;

        if (
            !isNaN(PIT_2006Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPIT_2006
        ) {
            setexceedThresholdPIT_2006(
                PIT_2006Value >= highValue || PIT_2006Value <= lowValue
            );
        }
    }, [PIT_2006, PIT_2006_High, PIT_2006_Low, maintainPIT_2006]);

    //================================ PIT_2007================================

    const [PIT_2007, setPIT_2007] = useState<string | null>(null);
    const [PIT_2007_High, setPIT_2007_High] = useState<number | null>(null);
    const [PIT_2007_Low, setPIT_2007_Low] = useState<number | null>(null);
    const [exceedThresholdPIT_2007, setexceedThresholdPIT_2007] =
        useState(false);
    const [maintainPIT_2007, setmaintainPIT_2007] = useState<boolean>(false);

    useEffect(() => {
        const PIT_2007Value = parseFloat(PIT_2007 as any);
        const highValue = PIT_2007_High ?? NaN;
        const lowValue = PIT_2007_Low ?? NaN;

        if (
            !isNaN(PIT_2007Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPIT_2007
        ) {
            setexceedThresholdPIT_2007(
                PIT_2007Value >= highValue || PIT_2007Value <= lowValue
            );
        }
    }, [PIT_2007, PIT_2007_High, PIT_2007_Low, maintainPIT_2007]);
    //================================ PT_2001================================

    const [PT_2001, setPT_2001] = useState<string | null>(null);
    const [PT_2001_High, setPT_2001_High] = useState<number | null>(null);
    const [PT_2001_Low, setPT_2001_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2001, setexceedThresholdPT_2001] = useState(false);
    const [maintainPT_2001, setmaintainPT_2001] = useState<boolean>(false);

    useEffect(() => {
        const PT_2001Value = parseFloat(PT_2001 as any);
        const highValue = PT_2001_High ?? NaN;
        const lowValue = PT_2001_Low ?? NaN;

        if (
            !isNaN(PT_2001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_2001
        ) {
            setexceedThresholdPT_2001(
                PT_2001Value >= highValue || PT_2001Value <= lowValue
            );
        }
    }, [PT_2001, PT_2001_High, PT_2001_Low, maintainPT_2001]);

    //================================ PT_2002================================

    const [PT_2002, setPT_2002] = useState<string | null>(null);
    const [PT_2002_High, setPT_2002_High] = useState<number | null>(null);
    const [PT_2002_Low, setPT_2002_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2002, setexceedThresholdPT_2002] = useState(false);
    const [maintainPT_2002, setmaintainPT_2002] = useState<boolean>(false);

    useEffect(() => {
        const PT_2002Value = parseFloat(PT_2002 as any);
        const highValue = PT_2002_High ?? NaN;
        const lowValue = PT_2002_Low ?? NaN;

        if (
            !isNaN(PT_2002Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_2002
        ) {
            setexceedThresholdPT_2002(
                PT_2002Value >= highValue || PT_2002Value <= lowValue
            );
        }
    }, [PT_2002, PT_2002_High, PT_2002_Low, maintainPT_2002]);

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

    const [TT_2001, setTT_2001] = useState<string | null>(null);
    const [TT_2001_High, setTT_2001_High] = useState<number | null>(null);
    const [TT_2001_Low, setTT_2001_Low] = useState<number | null>(null);
    const [exceedThresholdTT_2001, setexceedThresholdTT_2001] = useState(false);
    const [maintainTT_2001, setmaintainTT_2001] = useState<boolean>(false);

    useEffect(() => {
        const TT_2001Value = parseFloat(TT_2001 as any);
        const highValue = TT_2001_High ?? NaN;
        const lowValue = TT_2001_Low ?? NaN;

        if (
            !isNaN(TT_2001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainTT_2001
        ) {
            setexceedThresholdTT_2001(
                TT_2001Value >= highValue || TT_2001Value <= lowValue
            );
        }
    }, [TT_2001, TT_2001_High, TT_2001_Low, maintainTT_2001]);

    //================================ EVC_02_Temperature================================

    const [PT_2003, setPT_2003] = useState<string | null>(null);

    const [PT_2003_High, setPT_2003_High] = useState<number | null>(null);
    const [PT_2003_Low, setPT_2003_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2003, setexceedThresholdPT_2003] = useState(false);

    const [maintainPT_2003, setmaintainPT_2003] = useState<boolean>(false);

    useEffect(() => {
        const PT_2003Value = parseFloat(PT_2003 as any);
        const highValue = PT_2003_High ?? NaN;
        const lowValue = PT_2003_Low ?? NaN;

        if (
            !isNaN(PT_2003Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_2003
        ) {
            setexceedThresholdPT_2003(
                PT_2003Value >= highValue || PT_2003Value <= lowValue
            );
        }
    }, [PT_2003, PT_2003_High, PT_2003_Low, maintainPT_2003]);

    //================================ EVC_02_Temperature ======================================================

    const [GD_2001, setGD_2001] = useState<string | null>(null);
    const [GD_2001_High, setGD_2001_High] = useState<number | null>(null);
    const [GD_2001_Low, setGD_2001_Low] = useState<number | null>(null);
    const [exceedThresholdGD_2001, setExceedThresholdGD_2001] = useState(false);
    const [maintainGD_2001, setmaintainGD_2001] = useState<boolean>(false);
    useEffect(() => {
        const GD_2001Value = parseFloat(GD_2001 as any);
        const highValue = GD_2001_High ?? NaN;
        const lowValue = GD_2001_Low ?? NaN;

        if (
            !isNaN(GD_2001Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD_2001
        ) {
            setExceedThresholdGD_2001(
                GD_2001Value >= highValue || GD_2001Value <= lowValue
            );
        }
    }, [GD_2001, GD_2001_High, GD_2001_Low, maintainGD_2001]);

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
            if (node.id === "PIT_2006_DATA") {
                const roundedPT02 =
                    PIT_2006 !== null ? parseFloat(PIT_2006).toFixed(2) : "";

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
                                        exceedThresholdPIT_2006 &&
                                        !maintainPIT_2006
                                            ? "#ff5656"
                                            : maintainPIT_2006
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
                                        PIT-2006 :
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
            if (node.id === "PIT_2007_DATA") {
                const roundedPT02 =
                    PIT_2007 !== null ? parseFloat(PIT_2007).toFixed(2) : "";

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
                                        exceedThresholdPIT_2007 &&
                                        !maintainPIT_2007
                                            ? "#ff5656"
                                            : maintainPIT_2007
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
                                        PIT-2007 :
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

            if (node.id === "PT_2001_DATA") {
                const roundedPT02 =
                    PT_2001 !== null ? parseFloat(PT_2001).toFixed(2) : "";

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
                                        exceedThresholdPT_2001 &&
                                        !maintainPT_2001
                                            ? "#ff5656"
                                            : maintainPT_2001
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
                                        PT-2001 :
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
            if (node.id === "PT_2002_DATA") {
                const roundedPT02 =
                    PT_2002 !== null ? parseFloat(PT_2002).toFixed(2) : "";

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
                                        exceedThresholdPT_2002 &&
                                        !maintainPT_2002
                                            ? "#ff5656"
                                            : maintainPT_2002
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
                                        PT-2002 :
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

            if (node.id === "PCV_2001A_DATA") {
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
                                    PCV-2001A: {PCV_2001A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_2001B_DATA") {
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
                                    PCV-2001B: {PCV_2001B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_2002A_DATA") {
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
                                    PCV-2002A: {PCV_2002A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_2002B_DATA") {
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
                                    PCV-2002B: {PCV_2002B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_2001A") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_2001A === "1"
                                        ? SVD_NO
                                        : SDV_2001A === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_2001B") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_2001B === "1"
                                        ? SVD_NO
                                        : SDV_2001B === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_2002") {
                return {
                    ...node,

                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_2002 === "1"
                                        ? SVD_NO
                                        : SDV_2002 === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "TT_2001_DATA") {
                const roundedPT02 =
                    TT_2001 !== null ? parseFloat(TT_2001).toFixed(2) : "";

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
                                        exceedThresholdTT_2001 &&
                                        !maintainTT_2001
                                            ? "#ff5656"
                                            : maintainTT_2001
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
                                        TT-2001:
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
                                    ˚C
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PT_2003_DATA") {
                const roundedPT02 =
                    PT_2003 !== null ? parseFloat(PT_2003).toFixed(2) : "";

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
                                        exceedThresholdPT_2003 &&
                                        !maintainPT_2003
                                            ? "#ff5656"
                                            : maintainPT_2003
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
                                        PT-2003:
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

            if (node.id === "GD_2001") {
                const roundedPT02 =
                    GD_2001 !== null ? parseFloat(GD_2001).toFixed(2) : "";

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
                                        exceedThresholdGD_2001 &&
                                        !maintainGD_2001
                                            ? "#ff5656"
                                            : maintainGD_2001
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
                                        GD-2001:
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

            if (node.id === "PSV_2001A") {
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
                                    PSV-2001A: {PSV_2001A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_2002A") {
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
                                    PSV-2002A: {PSV_2002A} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_2001B") {
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
                                    PSV-2001B: {PSV_2001B} BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_2002B") {
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
                                    PSV-2002B: {PSV_2002B} BarG
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
        // : {
              const initialPositions = {
              AlarmCenter: { x: -2410.028351525698, y: 692.3224551648495 },
              Arrow10: { x: -657.138368386577, y: 1273.6345814725987 },
              BallVavleLine2_Bottom: {
                  x: -1661.682672878477,
                  y: 1481.0920733587484,
              },
              BallVavleLine2_Bottom_none: {
                  x: -1650.5994566252746,
                  y: 1097.5108416746705,
              },
              BallVavleLine2_Top: {
                  x: -1664.44860296679,
                  y: 1067.0182929442992,
              },
              BallVavleLine2_Top_none: {
                  x: -1648.09187529084,
                  y: 1512.8588877121745,
              },
              BallVavleLine3_Bottom_none: {
                  x: -1135.9949371559305,
                  y: 1511.7342276426302,
              },
              BallVavleLine3_Top_none: {
                  x: -1139.1110384711665,
                  y: 1099.0585739747964,
              },
              BallVavle_Line3_Bottom: {
                  x: -1149.7158985415722,
                  y: 1479.9135199637983,
              },
              BallVavle_Line3_Top: {
                  x: -1152.7158666435062,
                  y: 1067.089077151346,
              },
              DownArrow: { x: -2443.9606667437342, y: 1567.2904931436362 },
              EVC_01_Flow_at_Base_Condition: {
                  x: -1231.2274786015846,
                  y: 828.3556039973657,
              },
              EVC_01_Flow_at_Measurement_Condition: {
                  x: -1231.3827321875701,
                  y: 888.8803205194256,
              },
              EVC_01_Pressure_COL: {
                  x: -1422.6213132405162,
                  y: 1463.468095326561,
              },
              EVC_01_Pressure_DATA: {
                  x: -880.6508855178131,
                  y: 949.4360018233847,
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
                  x: -1231.4232235395534,
                  y: 949.5978850901463,
              },
              EVC_01_Temperature_NONE: {
                  x: -1362.8266325377226,
                  y: 977.2539852046791,
              },
              EVC_01_Volume_at_Base_Condition: {
                  x: -880.8313907480683,
                  y: 828.5981052410312,
              },
              EVC_01_Volume_at_Measurement_Condition: {
                  x: -880.9740513467495,
                  y: 888.981247285729,
              },
              EVC_02_Flow_at_Base_Condition: {
                  x: -1230.5145958317614,
                  y: 1560.1956723694543,
              },
              EVC_02_Flow_at_Measurement_Condition: {
                  x: -1230.6757061202484,
                  y: 1620.9190393547512,
              },
              EVC_02_Pressure_COL: {
                  x: -1425.0343776799361,
                  y: 1050.2965580409796,
              },
              EVC_02_Pressure_DATA: {
                  x: -880.2212858594961,
                  y: 1681.7033414461007,
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
                  x: -1230.8101655521527,
                  y: 1681.2929056054545,
              },
              EVC_02_Temperature_NONE: {
                  x: -1361.3563019384721,
                  y: 1396.8762550311894,
              },
              EVC_02_Volume_at_Base_Condition: {
                  x: -879.9415789599179,
                  y: 1560.2790310516443,
              },
              EVC_02_Volume_at_Measurement_Condition: {
                  x: -880.2057699494289,
                  y: 1621.0287158239244,
              },
              FIQ_2001A: { x: -1334.5315969250962, y: 1089.0476534040276 },
              FIQ_2001B: { x: -1338.7173251004047, y: 1502.4688817650092 },
              GD_2001: { x: -1424.667136474205, y: 1175.579061276146 },
              GD_IMG: { x: -1335.9163433841604, y: 1237.5231030754012 },
              Header: { x: -1682.8691159804866, y: 667.6054700345013 },
              PCV_2001A: { x: -1591.3356076807486, y: 1464.606291335593 },
              PCV_2001A_DATA: { x: -2165.49158352156, y: 994.2048071396639 },
              PCV_2001A_SmallBallVavle: {
                  x: -1503.1177892854255,
                  y: 1471.8848130414924,
              },
              PCV_2001A_none: { x: -1491.3253266041704, y: 1516.998001843855 },
              PCV_2001A_none2: {
                  x: -1560.2798867415365,
                  y: 1482.2617504326024,
              },
              PCV_2001B: { x: -1589.6280768037607, y: 1051.7950507090916 },
              PCV_2001B_DATA: { x: -2172.4592793689617, y: 1410.2100720666779 },
              PCV_2001B_SmallBallVavle: {
                  x: -1501.786173260068,
                  y: 1058.1713499375644,
              },
              PCV_2001B_none: { x: -1559.0670889230703, y: 1066.5206445548827 },
              PCV_2001B_none2: { x: -1489.980563248409, y: 1104.4215156026714 },
              PCV_2002A_DATA: { x: -1658.0952465284213, y: 989.5130937326853 },
              PCV_2002B_DATA: { x: -1658.6124448883636, y: 1412.4910281657576 },
              PCV_line1_Bottom: {
                  x: -2111.3678672845463,
                  y: 1052.190596866844,
              },
              PCV_line1_Bottom_SmallBallVavle: {
                  x: -2020.416081354473,
                  y: 1470.2053739811668,
              },
              PCV_line1_Bottom_none: {
                  x: -2086.3856361287953,
                  y: 1482.207670794438,
              },
              PCV_line1_Bottom_none2: {
                  x: -2009.4145711922317,
                  y: 1519.503878770942,
              },
              PCV_line1_Top: { x: -2115.111822476022, y: 1465.5285118679667 },
              PCV_line1_Top_SmallBallVavle: {
                  x: -2024.363015032123,
                  y: 1060.014175669431,
              },
              PCV_line1_Top_none: {
                  x: -2081.327036890346,
                  y: 1067.255196238937,
              },
              PCV_line1_Top_none2: {
                  x: -2012.863015032123,
                  y: 1106.014175669431,
              },
              PIT_2006_COL: { x: -2224.9142828465674, y: 1466.7281972105643 },
              PIT_2006_DATA: { x: -2345.2206554138606, y: 836.4790335330727 },
              PIT_2006_IMG: { x: -2257.1862508670465, y: 1404.262574863171 },
              PIT_2006_NONE: { x: -2223.0907768540847, y: 1028.0138867797907 },
              PIT_2007_COL: { x: -2224.8219072376414, y: 1049.0653973762749 },
              PIT_2007_DATA: { x: -2345.7936964852297, y: 1251.1609173888633 },
              PIT_2007_IMG: { x: -2256.992885616435, y: 986.1974756804932 },
              PIT_2007_NONE: { x: -2223.5360563984254, y: 1446.3342084888582 },
              PSV_2001A: { x: -1833.1392147665706, y: 918.2174755595645 },
              PSV_2001B: { x: -1834.1764221419073, y: 1327.1218181759557 },
              PSV_2002A: { x: -1513.6908206020153, y: 918.5332629610662 },
              PSV_2002B: { x: -1511.5304974285475, y: 1328.5711280255437 },
              PSV_LINE2_BOTTOM: {
                  x: -1740.5499935425808,
                  y: 1021.4152979362718,
              },
              PSV_LINE2_BOTTOM_HALFCIRCLE: {
                  x: -1435.0489668387918,
                  y: 953.7028750034647,
              },
              PSV_LINE2_BOTTOM_NONE: {
                  x: -1718.3515671112975,
                  y: 1070.542505015602,
              },
              PSV_LINE2_BOTTOM_NONE1: {
                  x: -1741.1883776247973,
                  y: 1440.590423120003,
              },
              PSV_LINE2_BOTTOM_NONE2: {
                  x: -1742.6123310219864,
                  y: 1377.8993730119664,
              },
              PSV_LINE2_BOTTOM_RIGHT: {
                  x: -1760.0864447641275,
                  y: 1002.261090283854,
              },
              PSV_LINE2_TOP: { x: -1742.7180150452293, y: 1436.5441778787165 },
              PSV_LINE2_TOP_HALFCIRCLE: {
                  x: -1763.0861113674155,
                  y: 950.1586579328373,
              },
              PSV_LINE2_TOP_NONE: {
                  x: -1720.5644477435662,
                  y: 1485.1619233541182,
              },
              PSV_LINE2_TOP_NONE1: {
                  x: -1741.292471045089,
                  y: 1024.6454245613245,
              },
              PSV_LINE2_TOP_NONE2: {
                  x: -1739.6279244378063,
                  y: 970.6923874449885,
              },
              PSV_LINE2_TOP_RIGHT: {
                  x: -1761.8879028974573,
                  y: 1417.8878185758788,
              },
              PSV_LINE3_BOTTOM: {
                  x: -1411.1513969577684,
                  y: 1022.3097021803947,
              },
              PSV_LINE3_BOTTOM_HALFCIRCLE: {
                  x: -1766.2849260256212,
                  y: 1359.309168723579,
              },
              PSV_LINE3_BOTTOM_NONE: {
                  x: -1388.5032341218698,
                  y: 1484.008560559632,
              },
              PSV_LINE3_BOTTOM_NONE1: {
                  x: -1411.9335008206397,
                  y: 1437.2004982722633,
              },
              PSV_LINE3_BOTTOM_NONE2: {
                  x: -1411.4682835049944,
                  y: 1378.9543032928286,
              },
              PSV_LINE3_BOTTOM_RIGHT: {
                  x: -1430.140564142181,
                  y: 1003.2130774024754,
              },
              PSV_LINE3_TOP: { x: -1410.5136580587603, y: 1436.3299938652153 },
              PSV_LINE3_TOP_HALFCIRCLE: {
                  x: -1434.9612480677702,
                  y: 1358.5323326899438,
              },
              PSV_LINE3_TOP_NONE: {
                  x: -1388.1918023296519,
                  y: 1069.4987804905948,
              },
              PSV_LINE3_TOP_NONE1: {
                  x: -1411.2952576203431,
                  y: 1025.4316416628542,
              },
              PSV_LINE3_TOP_NONE2: {
                  x: -1411.4987054998287,
                  y: 973.159710586679,
              },
              PSV_LINE3_TOP_RIGHT: {
                  x: -1430.3177984691579,
                  y: 1415.7776838291027,
              },
              PT_2001_COL: { x: -1905.5986412843538, y: 1464.87471554009 },
              PT_2001_DATA: { x: -2027.6841586008773, y: 838.5062473608839 },
              PT_2001_IMG: { x: -1938.1575762242508, y: 1402.2701959596873 },
              PT_2001_NONE: { x: -1905.5753232184695, y: 1031.030553967972 },
              PT_2002_COL: { x: -1905.8531774900025, y: 1051.027958478726 },
              PT_2002_DATA: { x: -2030.8380777669722, y: 1249.7505355187245 },
              PT_2002_IMG: { x: -1938.3531774900027, y: 988.533781469687 },
              PT_2002_NONE: { x: -1904.720994341128, y: 1420.5940219176825 },
              PT_2003: { x: -864.6323890623436, y: 1208.244867729075 },
              PT_2003_COL: { x: -831.2133216884863, y: 1269.8624406146207 },
              PT_2003_DATA: { x: -945.5475933946302, y: 1339.463163476207 },
              PT_2003_NONE: { x: -832.415290430864, y: 1248.8766085759103 },
              SDV_2001A: { x: -2367.264096852104, y: 1047.9003450623102 },
              SDV_2001A_Name: { x: -2400.231075578696, y: 1016.8765739089936 },
              SDV_2001B: { x: -2363.6913165447777, y: 1460.627214731786 },
              SDV_2001B_Name: { x: -2390.630942331568, y: 1427.4085871372292 },
              SDV_2002: { x: -746.5250384256435, y: 1247.0820307864924 },
              SDV_2002_Name: { x: -773.7073670473632, y: 1214.4943003978158 },
              TT_2001: { x: -973.4745171079314, y: 1164.1349309721543 },
              TT_2001_COL: { x: -951.252984021753, y: 1210.020732761909 },
              TT_2001_DATA: { x: -1051.6674629955712, y: 1078.044323611282 },
              TT_2001_NONE: { x: -949.9337363304269, y: 1183.8459312154791 },
              bor1: { x: -2436.5855686504956, y: 1039.1608637258034 },
              bor2: { x: -983.1512218888312, y: 1025.8994423073616 },
              bor3: { x: -2320.8078213113167, y: 1680.894788044694 },
              bor4: { x: -950.4329469573597, y: 1583.0590100592938 },
              borderWhite: { x: -1728.8585406660322, y: 659.7459881443308 },
              line1: { x: -2410.5925492337, y: 1618.373867274551 },
              line2: { x: -2411.913420266014, y: 1589.0810477674625 },
              line3: { x: -2081.3904520635083, y: 1098.5296705520232 },
              line4: { x: -2087.4681785994817, y: 1511.0480348549916 },
              line5: { x: -1559.5270533882806, y: 1098.3740496757796 },
              line6: { x: -1559.7769633031824, y: 1511.1960403304386 },
              line7: { x: -1262.7601739710276, y: 1098.3096365331119 },
              line8: { x: -1263.4897630224293, y: 1511.2475714369527 },
              line9: { x: -909.0588072603842, y: 1297.5251937714008 },
              line9none: { x: -1092.0911189996043, y: 1297.6471053347987 },
              line10: { x: -642.6357609528327, y: 1297.8323709477843 },
              line10none: { x: -642.2337612243081, y: 1297.499384727617 },
              percent: { x: -405.6683476271253, y: 1298.7587875755169 },
              timeUpdate3: { x: -1688.0201184473199, y: 730.1698690184217 },
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
                                CNG BINH DUONG
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
            id: "PSV_2001A",
            position: positions.PSV_2001A,
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
            id: "PSV_2001B",
            position: positions.PSV_2001B,
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
            id: "PSV_2002A",
            position: positions.PSV_2002A,
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
            id: "PSV_2002B",
            position: positions.PSV_2002B,
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
                label: <div>FIQ-2001A</div>,
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
                label: <div>FIQ-2001B</div>,
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
            targetPosition: Position.Left,
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
            targetPosition: Position.Left,
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
            id: "GD_2001",
            position: positions.GD_2001,
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
            id: "PCV_2001A",
            position: positions.PCV_2001A,
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
            id: "PCV_2001B",
            position: positions.PCV_2001B,
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
            id: "PCV_2001B_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_2001B_none,

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
            id: "PCV_2001A_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_2001A_none,

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
            id: "PCV_2001B_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_2001B_none2,

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
            id: "PCV_2001A_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_2001A_none2,

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
            id: "PCV_2001A_SmallBallVavle",
            position: positions.PCV_2001A_SmallBallVavle,
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
            id: "PCV_2001B_SmallBallVavle",
            position: positions.PCV_2001B_SmallBallVavle,
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
            id: "PCV_2001A_DATA",
            position: positions.PCV_2001A_DATA,
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
            id: "PCV_2001B_DATA",
            position: positions.PCV_2001B_DATA,
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
            id: "PCV_2002A_DATA",
            position: positions.PCV_2002A_DATA,
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
            id: "PCV_2002B_DATA",
            position: positions.PCV_2002B_DATA,
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
            id: "PIT_2006_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_2006_IMG,
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
            id: "PIT_2007_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_2007_IMG,
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
            id: "PT_2001_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT_2001_IMG,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PT_2002_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT_2002_IMG,

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
            id: "PIT_2006_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_2006_COL,
            zIndex: 9999999,
            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_2007_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_2007_COL,
            zIndex: 9999999,

            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PT_2001_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PT_2001_COL,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_2002_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PT_2002_COL,
            zIndex: 9999,

            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 60,
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
            id: "PIT_2006_DATA",
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
            position: positions.PIT_2006_DATA,

            style: {
                border: background,
                width: "auto",

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },
        {
            id: "PIT_2007_DATA",
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
            position: positions.PIT_2007_DATA,

            style: {
                border: background,
                width: "auto",

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },
        {
            id: "PT_2001_DATA",
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
            position: positions.PT_2001_DATA,

            style: {
                border: background,
                width: "auto",

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },
        {
            id: "PT_2002_DATA",
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
            position: positions.PT_2002_DATA,

            style: {
                border: background,
                width: "auto",

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
        },

        {
            id: "EVC_01_Pressure_DATA",
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
            position: positions.EVC_01_Pressure_DATA,

            style: {
                border: "1px solid white",
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "EVC_02_Pressure_DATA",
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
            id: "PIT_2006_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_2006_NONE,
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
            id: "PIT_2007_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_2007_NONE,
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
            id: "PT_2001_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PT_2001_NONE,
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
            id: "PT_2002_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PT_2002_NONE,
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
                            fontSize: 25,
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
                            fontSize: 25,
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
            zIndex: 9999,

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
            zIndex: 9999,

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
            id: "SDV_2001A",
            position: positions.SDV_2001A,
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
            id: "SDV_2001B",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_2001B
                    </div>
                ),
            },
            position: positions.SDV_2001B,

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
            id: "SDV_2002",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_2002
                    </div>
                ),
            },
            position: positions.SDV_2002,

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
            id: "SDV_2001A_Name",
            position: positions.SDV_2001A_Name,
            type: "custom",
            data: {
                label: <div>SDV-2001A</div>,
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
            id: "SDV_2001B_Name",
            position: positions.SDV_2001B_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-2001B
                    </div>
                ),
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
            id: "SDV_2002_Name",
            position: positions.SDV_2002_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-2002
                    </div>
                ),
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
        // ==========================================================================================
        {
            id: "TT_2001_COL",
            position: positions.TT_2001_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 100,
                background: line3,
            },
        },

        {
            id: "TT_2001_DATA",
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
            position: positions.TT_2001_DATA,

            style: {
                border: background,
                width: "auto",
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
        },
        {
            id: "TT_2001",
            position: positions.TT_2001,
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
            id: "TT_2001_NONE",
            position: positions.TT_2001_NONE,
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
            id: "PT_2003_COL",
            position: positions.PT_2003_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 40,
                background: line3,
            },
            zIndex: 9999,
        },

        {
            id: "PT_2003_DATA",
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
            position: positions.PT_2003_DATA,

            style: {
                border: background,
                width: "auto",
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Top,
        },
        {
            id: "PT_2003",
            position: positions.PT_2003,
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
            id: "PT_2003_NONE",
            position: positions.PT_2003_NONE,
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
                        <AlarmCNG_BINHDUONG />
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
                } else if (id === "GD_2001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_2001: position,
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
                else if (id === "PCV_2001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001A: position,
                    }));
                } else if (id === "PCV_2001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001B: position,
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
                } else if (id === "PCV_2001B_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001B_none: position,
                    }));
                } else if (id === "PCV_2001A_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001A_none: position,
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
                } else if (id === "PCV_2001B_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001B_none2: position,
                    }));
                } else if (id === "PCV_2001A_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001A_none2: position,
                    }));
                } else if (id === "PCV_line1_Bottom_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_2001B_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001B_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_2001A_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001A_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line1_Top_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_2001A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001A_DATA: position,
                    }));
                } else if (id === "PCV_2002A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2002A_DATA: position,
                    }));
                } else if (id === "PCV_2001B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2001B_DATA: position,
                    }));
                } else if (id === "PCV_2002B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_2002B_DATA: position,
                    }));
                }
                //======================= BallVavle ====================================
                else if (id === "PT_2001_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2001_IMG: position,
                    }));
                } else if (id === "PT_2002_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2002_IMG: position,
                    }));
                } else if (id === "PIT_2006_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2006_IMG: position,
                    }));
                } else if (id === "PIT_2007_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2007_IMG: position,
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
                } else if (id === "PT_2001_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2001_COL: position,
                    }));
                } else if (id === "PT_2002_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2002_COL: position,
                    }));
                } else if (id === "PIT_2006_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2006_COL: position,
                    }));
                } else if (id === "PIT_2007_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2007_COL: position,
                    }));
                } else if (id === "PIT_2006_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2006_DATA: position,
                    }));
                } else if (id === "PIT_2007_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2007_DATA: position,
                    }));
                } else if (id === "PT_2001_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2001_DATA: position,
                    }));
                } else if (id === "PT_2002_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2002_DATA: position,
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
                } else if (id === "PIT_2006_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2006_NONE: position,
                    }));
                } else if (id === "PIT_2007_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_2007_NONE: position,
                    }));
                } else if (id === "PT_2001_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2001_NONE: position,
                    }));
                } else if (id === "PT_2002_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2002_NONE: position,
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
                else if (id === "SDV_2001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2001A: position,
                    }));
                } else if (id === "SDV_2001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2001B: position,
                    }));
                } else if (id === "SDV_2002") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2002: position,
                    }));
                } else if (id === "SDV_2001A_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2001A_Name: position,
                    }));
                } else if (id === "SDV_2001B_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2001B_Name: position,
                    }));
                } else if (id === "SDV_2002_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_2002_Name: position,
                    }));
                }
                //========================== pit line 1 =========================
                else if (id === "TT_2001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2001: position,
                    }));
                } else if (id === "TT_2001_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2001_DATA: position,
                    }));
                } else if (id === "TT_2001_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2001_COL: position,
                    }));
                } else if (id === "TT_2001_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_2001_NONE: position,
                    }));
                }
                //========================== pit line 1 =========================
                else if (id === "PT_2003") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2003: position,
                    }));
                } else if (id === "PT_2003_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2003_DATA: position,
                    }));
                } else if (id === "PT_2003_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2003_COL: position,
                    }));
                } else if (id === "PT_2003_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_2003_NONE: position,
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
                } else if (id === "PSV_2001A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_2001A: position,
                    }));
                } else if (id === "PSV_2001B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_2001B: position,
                    }));
                } else if (id === "PSV_2002A") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_2002A: position,
                    }));
                } else if (id === "PSV_2002B") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_2002B: position,
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
