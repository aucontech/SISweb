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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2001A
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
            setMaintainPIT_2006(MaintainPIT_2006?.value || false);
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
            setMaintainPIT_2007(MaintainPIT_2007?.value || false);
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
            setMaintainPT_2001(PT_2001_Maintain?.value || false);

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
            setMaintainPT_2002(PT_2002_Maintain?.value || false);
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
            setMaintainEVC_01_Pressure(
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
            setMaintainEVC_02_Pressure(
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
            setMaintainEVC_01_Temperature(
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
            setMaintainEVC_02_Temperature(
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
            setMaintainTT_2001(TT_2001_Maintain?.value || false);
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
            setMaintainPT_2003(PT_2003_Maintain?.value || false);
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
            setMaintainGD_2001(GD_2001_Maintain?.value || false);
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
            setMaintainEVC_01_Flow_at_Base_Condition(
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
            setMaintainEVC_01_Flow_at_Measurement_Condition(
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
            setMaintainEVC_01_Volume_at_Base_Condition(
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
            setMaintainEVC_01_Volume_at_Measurement_Condition(
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
            setMaintainEVC_02_Flow_at_Base_Condition(
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
            setMaintainEVC_02_Flow_at_Measurement_Condition(
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
            setMaintainEVC_02_Volume_at_Base_Condition(
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
            setMaintainEVC_02_Volume_at_Measurement_Condition(
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
        EVC_01_Pressure: "EVC 01 Pressure",
        EVC_02_Pressure: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
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
    const [exceedThresholdPIT_2006, setExceedThresholdPIT_2006] =
        useState(false);
    const [maintainPIT_2006, setMaintainPIT_2006] = useState<boolean>(false);
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
            setExceedThresholdPIT_2006(
                PIT_2006Value >= highValue || PIT_2006Value <= lowValue
            );
        }
    }, [PIT_2006, PIT_2006_High, PIT_2006_Low, maintainPIT_2006]);

    //================================ PIT_2007================================

    const [PIT_2007, setPIT_2007] = useState<string | null>(null);

    const [PIT_2007_High, setPIT_2007_High] = useState<number | null>(null);
    const [PIT_2007_Low, setPIT_2007_Low] = useState<number | null>(null);
    const [exceedThresholdPIT_2007, setExceedThresholdPIT_2007] =
        useState(false);
    const [maintainPIT_2007, setMaintainPIT_2007] = useState<boolean>(false);
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
            setExceedThresholdPIT_2007(
                PIT_2007Value >= highValue || PIT_2007Value <= lowValue
            );
        }
    }, [PIT_2007, PIT_2007_High, PIT_2007_Low, maintainPIT_2007]);

    //================================ PT_2001================================

    const [PT_2001, setPT_2001] = useState<string | null>(null);
    const [PT_2001_High, setPT_2001_High] = useState<number | null>(null);
    const [PT_2001_Low, setPT_2001_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2001, setExceedThresholdPT_2001] = useState(false);
    const [maintainPT_2001, setMaintainPT_2001] = useState<boolean>(false);
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
            setExceedThresholdPT_2001(
                PT_2001Value >= highValue || PT_2001Value <= lowValue
            );
        }
    }, [PT_2001, PT_2001_High, PT_2001_Low, maintainPT_2001]);

    //================================ PT_2002================================
    const [PT_2002, setPT_2002] = useState<string | null>(null);
    const [PT_2002_High, setPT_2002_High] = useState<number | null>(null);
    const [PT_2002_Low, setPT_2002_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2002, setExceedThresholdPT_2002] = useState(false);
    const [maintainPT_2002, setMaintainPT_2002] = useState<boolean>(false);
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
            setExceedThresholdPT_2002(
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
    const [exceedThresholdEVC_02_Pressure, setExceedThresholdEVC_02_Pressure] =
        useState(false);
    const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] =
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
            setExceedThresholdEVC_02_Pressure(
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
    const [exceedThresholdEVC_01_Pressure, setExceedThresholdEVC_01_Pressure] =
        useState(false);
    const [maintainEVC_01_Pressure, setMaintainEVC_01_Pressure] =
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
            setExceedThresholdEVC_01_Pressure(
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
        setExceedThresholdEVC_01_Temperature,
    ] = useState(false);
    const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] =
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
            setExceedThresholdEVC_01_Temperature(
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
        setExceedThresholdEVC_02_Temperature,
    ] = useState(false);
    const [maintainEVC_02_Temperature, setMaintainEVC_02_Temperature] =
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
            setExceedThresholdEVC_02_Temperature(
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
    const [exceedThresholdTT_2001, setExceedThresholdTT_2001] = useState(false);
    const [maintainTT_2001, setMaintainTT_2001] = useState<boolean>(false);
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
            setExceedThresholdTT_2001(
                TT_2001Value >= highValue || TT_2001Value <= lowValue
            );
        }
    }, [TT_2001, TT_2001_High, TT_2001_Low, maintainTT_2001]);

    //================================ EVC_02_Temperature================================

    const [PT_2003, setPT_2003] = useState<string | null>(null);
    const [PT_2003_High, setPT_2003_High] = useState<number | null>(null);
    const [PT_2003_Low, setPT_2003_Low] = useState<number | null>(null);
    const [exceedThresholdPT_2003, setExceedThresholdPT_2003] = useState(false);
    const [maintainPT_2003, setMaintainPT_2003] = useState<boolean>(false);
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
            setExceedThresholdPT_2003(
                PT_2003Value >= highValue || PT_2003Value <= lowValue
            );
        }
    }, [PT_2003, PT_2003_High, PT_2003_Low, maintainPT_2003]);

    //================================ EVC_02_Temperature ======================================================

    const [GD_2001, setGD_2001] = useState<string | null>(null);
    const [GD_2001_High, setGD_2001_High] = useState<number | null>(null);
    const [GD_2001_Low, setGD_2001_Low] = useState<number | null>(null);
    const [exceedThresholdGD_2001, setExceedThresholdGD_2001] = useState(false);
    const [maintainGD_2001, setMaintainGD_2001] = useState<boolean>(false);
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


    const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
    const [EVC_01_Flow_at_Base_Condition_High, setEVC_01_Flow_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_01_Flow_at_Base_Condition_Low, setEVC_01_Flow_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Flow_at_Base_Condition, setExceedThresholdEVC_01_Flow_at_Base_Condition] = useState(false);
    const [maintainEVC_01_Flow_at_Base_Condition, setMaintainEVC_01_Flow_at_Base_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition as any);
        const highValue = EVC_01_Flow_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_01_Flow_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Flow_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Flow_at_Base_Condition
        ) {
            setExceedThresholdEVC_01_Flow_at_Base_Condition(
                EVC_01_Flow_at_Base_ConditionValue >= highValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue
            );
        }
    }, [EVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition_Low, maintainEVC_01_Flow_at_Base_Condition]);



    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
    const [EVC_01_Flow_at_Measurement_Condition_High, setEVC_01_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
    const [EVC_01_Flow_at_Measurement_Condition_Low, setEVC_01_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Flow_at_Measurement_Condition, setExceedThresholdEVC_01_Flow_at_Measurement_Condition] = useState(false);
    const [maintainEVC_01_Flow_at_Measurement_Condition, setMaintainEVC_01_Flow_at_Measurement_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition as any);
        const highValue = EVC_01_Flow_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_01_Flow_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Flow_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Flow_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_01_Flow_at_Measurement_Condition(
                EVC_01_Flow_at_Measurement_ConditionValue >= highValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [EVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition_Low, maintainEVC_01_Flow_at_Measurement_Condition]);



    //================================ EVC_01_Volume_at_Base_Condition FIQ 1901 ======================================================

    const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
    const [EVC_01_Volume_at_Base_Condition_High, setEVC_01_Volume_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_01_Volume_at_Base_Condition_Low, setEVC_01_Volume_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Volume_at_Base_Condition, setExceedThresholdEVC_01_Volume_at_Base_Condition] = useState(false);
    const [maintainEVC_01_Volume_at_Base_Condition, setMaintainEVC_01_Volume_at_Base_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition as any);
        const highValue = EVC_01_Volume_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_01_Volume_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Volume_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Volume_at_Base_Condition
        ) {
            setExceedThresholdEVC_01_Volume_at_Base_Condition(
                EVC_01_Volume_at_Base_ConditionValue >= highValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue
            );
        }
    }, [EVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition_Low, maintainEVC_01_Volume_at_Base_Condition]);


    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================


    const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
    const [EVC_01_Volume_at_Measurement_Condition_High, setEVC_01_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
    const [EVC_01_Volume_at_Measurement_Condition_Low, setEVC_01_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Volume_at_Measurement_Condition, setExceedThresholdEVC_01_Volume_at_Measurement_Condition] = useState(false);
    const [maintainEVC_01_Volume_at_Measurement_Condition, setMaintainEVC_01_Volume_at_Measurement_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition as any);
        const highValue = EVC_01_Volume_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_01_Volume_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_01_Volume_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_01_Volume_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_01_Volume_at_Measurement_Condition(
                EVC_01_Volume_at_Measurement_ConditionValue >= highValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [EVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition_Low, maintainEVC_01_Volume_at_Measurement_Condition]);


    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================



    const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
    const [EVC_02_Flow_at_Base_Condition_High, setEVC_02_Flow_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_02_Flow_at_Base_Condition_Low, setEVC_02_Flow_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Flow_at_Base_Condition, setExceedThresholdEVC_02_Flow_at_Base_Condition] = useState(false);
    const [maintainEVC_02_Flow_at_Base_Condition, setMaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition as any);
        const highValue = EVC_02_Flow_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_02_Flow_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Flow_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Flow_at_Base_Condition
        ) {
            setExceedThresholdEVC_02_Flow_at_Base_Condition(
                EVC_02_Flow_at_Base_ConditionValue >= highValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue
            );
        }
    }, [EVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition_Low, maintainEVC_02_Flow_at_Base_Condition]);


    //================================ EVC_02_Flow_at_Measurement_Condition FIQ 1901 ======================================================



    const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
    const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
    const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setExceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false);
    const [maintainEVC_02_Flow_at_Measurement_Condition, setMaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition as any);
        const highValue = EVC_02_Flow_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_02_Flow_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Flow_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Flow_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_02_Flow_at_Measurement_Condition(
                EVC_02_Flow_at_Measurement_ConditionValue >= highValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [EVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition_Low, maintainEVC_02_Flow_at_Measurement_Condition]);



    //================================ EVC_02_Volume_at_Base_Condition FIQ 1901 ======================================================


    const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
    const [EVC_02_Volume_at_Base_Condition_High, setEVC_02_Volume_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_02_Volume_at_Base_Condition_Low, setEVC_02_Volume_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Volume_at_Base_Condition, setExceedThresholdEVC_02_Volume_at_Base_Condition] = useState(false);
    const [maintainEVC_02_Volume_at_Base_Condition, setMaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition as any);
        const highValue = EVC_02_Volume_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_02_Volume_at_Base_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Volume_at_Base_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Volume_at_Base_Condition
        ) {
            setExceedThresholdEVC_02_Volume_at_Base_Condition(
                EVC_02_Volume_at_Base_ConditionValue >= highValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue
            );
        }
    }, [EVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition_Low, maintainEVC_02_Volume_at_Base_Condition]);




    //================================ EVC_02_Volume_at_Measurement_Condition FIQ 1901 ======================================================
    const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
    const [EVC_02_Volume_at_Measurement_Condition_High, setEVC_02_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
    const [EVC_02_Volume_at_Measurement_Condition_Low, setEVC_02_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Volume_at_Measurement_Condition, setExceedThresholdEVC_02_Volume_at_Measurement_Condition] = useState(false);
    const [maintainEVC_02_Volume_at_Measurement_Condition, setMaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);
    useEffect(() => {
        const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition as any);
        const highValue = EVC_02_Volume_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_02_Volume_at_Measurement_Condition_Low ?? NaN;

        if (
            !isNaN(EVC_02_Volume_at_Measurement_ConditionValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainEVC_02_Volume_at_Measurement_Condition
        ) {
            setExceedThresholdEVC_02_Volume_at_Measurement_Condition(
                EVC_02_Volume_at_Measurement_ConditionValue >= highValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue
            );
        }
    }, [EVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition_Low, maintainEVC_02_Volume_at_Measurement_Condition]);

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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                        {ValueGas.SVF} :
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    padding: 2,
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
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                        {ValueGas.EVC_01_Pressure} :
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
                                    fontSize: 18,
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
                                    fontSize: 18,
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
                                <p style={{ color: colorNameValue }}>
                                    PCV-2001A :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_2001A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                <p style={{ color: colorNameValue }}>
                                    PCV-2001B :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_2001B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV-2002A :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_2002A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV-2002B :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_2002B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    fontSize: 18,
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
                                        TT-2001 :
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
                                    fontSize: 18,
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
                                        PT-2003 :
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
                                    fontSize: 18,
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
                                        GD-2001 :
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
                                    PSV-2001B :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PSV_2001A} :
                                </p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    PSV-2002A :
                                </p>
                                <p style={{ color: colorData }}> {PSV_2002A}</p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    PSV-2001B :
                                </p>
                                <p style={{ color: colorData }}> {PCV_2002A}</p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
                                    PSV-2002B :
                                </p>
                                <p style={{ color: colorData }}> {PSV_2002B}</p>
                                <p style={{ color: colorNameValue }}>BarG</p>
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
        AlarmCenter: { x: -1244.529411972646, y: 762.0298862357979 },
        Arrow10: { x: -419.8018780792174, y: 1273.381523476552 },
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
            x: -945.4386378616368,
            y: 1513.0768819977573,
        },
        BallVavleLine3_Top_none: {
            x: -945.2533633599176,
            y: 1098.9068673573584,
        },
        BallVavle_Line3_Bottom: {
            x: -958.9030596290709,
            y: 1482.17665624866,
        },
        BallVavle_Line3_Top: {
            x: -959.090980952997,
            y: 1068.376995289186,
        },
        DownArrow: { x: -2440.1778265025932, y: 1643.6301381134936 },
        EVC_01_Flow_at_Base_Condition: {
            x: -944.7566756597366,
            y: 877.4187744710375,
        },
        EVC_01_Flow_at_Measurement_Condition: {
            x: -944.8390916088076,
            y: 925.5955178129639,
        },
        EVC_01_Pressure_COL: {
            x: -1422.6213132405162,
            y: 1463.468095326561,
        },
        EVC_01_Pressure_DATA: {
            x: -1565.8256783115937,
            y: 1148.9827037803145,
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
            x: -1736.2102870765705,
            y: 815.4661864731523,
        },
        EVC_01_Temperature_NONE: {
            x: -1362.8266325377226,
            y: 977.2539852046791,
        },
        EVC_01_Volume_at_Base_Condition: {
            x: -703.8315004521368,
            y: 877.542107815135,
        },
        EVC_01_Volume_at_Measurement_Condition: {
            x: -704.133309317585,
            y: 925.6995906874301,
        },
        EVC_02_Flow_at_Base_Condition: {
            x: -932.8685029333565,
            y: 1611.5650097972457,
        },
        EVC_02_Flow_at_Measurement_Condition: {
            x: -932.8603748341441,
            y: 1659.619138394843,
        },
        EVC_02_Pressure_COL: {
            x: -1425.0343776799361,
            y: 1050.2965580409796,
        },
        EVC_02_Pressure_DATA: {
            x: -1563.2499315232963,
            y: 1587.1147367905612,
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
            x: -1727.0419105701028,
            y: 1232.4793100005968,
        },
        EVC_02_Temperature_NONE: {
            x: -1361.3563019384721,
            y: 1396.8762550311894,
        },
        EVC_02_Volume_at_Base_Condition: {
            x: -691.7043842569694,
            y: 1611.7575715748744,
        },
        EVC_02_Volume_at_Measurement_Condition: {
            x: -691.7597706423713,
            y: 1659.6681974922926,
        },
        FIQ_2001A: { x: -1122.9979525971376, y: 1090.3467963356752 },
        FIQ_2001B: { x: -1127.9442365313425, y: 1503.338633373814 },
        GD_2001: { x: -1177.1116094437443, y: 1176.7839153333475 },
        GD_IMG: { x: -1096.8954721391294, y: 1232.7407461451007 },
        Header: { x: -2375.4269666355694, y: 739.4302234279377 },
        PCV_2001A: { x: -1590.143839770737, y: 1466.187406343237 },
        PCV_2001A_DATA: { x: -2129.6272157235535, y: 991.5991483239666 },
        PCV_2001A_SmallBallVavle: {
            x: -1483.6177892854255,
            y: 1469.3848130414924,
        },
        PCV_2001A_none: { x: -1472.3253266041704, y: 1520.498001843855 },
        PCV_2001A_none2: {
            x: -1560.2798867415365,
            y: 1482.2617504326024,
        },
        PCV_2001B: { x: -1589.6280768037607, y: 1051.7950507090916 },
        PCV_2001B_DATA: { x: -2131.981935662864, y: 1402.9439742063528 },
        PCV_2001B_SmallBallVavle: {
            x: -1486.9036877800625,
            y: 1056.0055835082862,
        },
        PCV_2001B_none: { x: -1559.0670889230703, y: 1066.5206445548827 },
        PCV_2001B_none2: { x: -1475.720019744693, y: 1104.4215156026714 },
        PCV_2002A_DATA: { x: -1670.0177925707806, y: 989.3425335926158 },
        PCV_2002B_DATA: { x: -1669.2998780554922, y: 1403.0927905211088 },
        PCV_line1_Bottom: { x: -2059.46440478068, y: 1051.690596866844 },
        PCV_line1_Bottom_SmallBallVavle: {
            x: -1959.916081354473,
            y: 1469.1895625081877,
        },
        PCV_line1_Bottom_none: {
            x: -2033.416081354473,
            y: 1480.8357187400395,
        },
        PCV_line1_Bottom_none2: {
            x: -1948.4145711922317,
            y: 1518.503878770942,
        },
        PCV_line1_Top: { x: -2063.2209588415735, y: 1465.9672706188694 },
        PCV_line1_Top_SmallBallVavle: {
            x: -1955.363015032123,
            y: 1056.514175669431,
        },
        PCV_line1_Top_none: {
            x: -2029.3085400395037,
            y: 1067.755196238937,
        },
        PCV_line1_Top_none2: {
            x: -1943.863015032123,
            y: 1106.014175669431,
        },
        PIT_2006_COL: { x: -2194.366805384612, y: 1463.874739139494 },
        PIT_2006_DATA: { x: -2323.884062940713, y: 1148.6083704185041 },
        PIT_2006_IMG: { x: -2226.866805384612, y: 1400.374739139494 },
        PIT_2006_NONE: { x: -2197.8690826568136, y: 1007.3191633358758 },
        PIT_2007_COL: { x: -2197.6600827175034, y: 1050.3588175915195 },
        PIT_2007_DATA: { x: -2326.9359251148935, y: 1585.7692501253557 },
        PIT_2007_IMG: { x: -2230.624481311542, y: 986.990895895738 },
        PIT_2007_NONE: { x: -2193.7144666730205, y: 1424.0282015242046 },
        PSV_2001A: { x: -1844.6249877968003, y: 904.7518340240545 },
        PSV_2001B: { x: -1851.8971023103254, y: 1316.7167432666458 },
        PSV_2002A: { x: -1307.7176662681832, y: 894.499205487562 },
        PSV_2002B: { x: -1307.7176662681832, y: 1311.4439993566057 },
        PSV_LINE2_BOTTOM: {
            x: -1740.5499935425808,
            y: 1021.4152979362718,
        },
        PSV_LINE2_BOTTOM_HALFCIRCLE: {
            x: -1266.1474092778985,
            y: 943.9517620367403,
        },
        PSV_LINE2_BOTTOM_NONE: {
            x: -1718.3515671112975,
            y: 1070.542505015602,
        },
        PSV_LINE2_BOTTOM_NONE1: {
            x: -1741.7830527009469,
            y: 1432.6252337777432,
        },
        PSV_LINE2_BOTTOM_NONE2: {
            x: -1742.6123310219864,
            y: 1377.8993730119664,
        },
        PSV_LINE2_BOTTOM_RIGHT: {
            x: -1760.0864447641275,
            y: 1002.261090283854,
        },
        PSV_LINE2_TOP: { x: -1741.762582600041, y: 1428.90071831721 },
        PSV_LINE2_TOP_HALFCIRCLE: {
            x: -1763.0861113674155,
            y: 950.1586579328373,
        },
        PSV_LINE2_TOP_NONE: { x: -1719.609015298378, y: 1478.4738962378 },
        PSV_LINE2_TOP_NONE1: {
            x: -1741.292471045089,
            y: 1024.6454245613245,
        },
        PSV_LINE2_TOP_NONE2: {
            x: -1739.6279244378063,
            y: 970.6923874449885,
        },
        PSV_LINE2_TOP_RIGHT: {
            x: -1760.932470452269,
            y: 1409.788926569184,
        },
        PSV_LINE3_BOTTOM: {
            x: -1241.9662551779466,
            y: 1017.2912953863099,
        },
        PSV_LINE3_BOTTOM_HALFCIRCLE: {
            x: -1766.2849260256212,
            y: 1357.309168723579,
        },
        PSV_LINE3_BOTTOM_NONE: {
            x: -1212.1740869021496,
            y: 1482.673575129763,
        },
        PSV_LINE3_BOTTOM_NONE1: {
            x: -1234.6943213706072,
            y: 1436.0560745736848,
        },
        PSV_LINE3_BOTTOM_NONE2: {
            x: -1235.6368665307696,
            y: 1382.4374704915526,
        },
        PSV_LINE3_BOTTOM_RIGHT: {
            x: -1261.8081518592426,
            y: 997.532009870901,
        },
        PSV_LINE3_TOP: { x: -1235.1897637926832, y: 1433.6788607117933 },
        PSV_LINE3_TOP_HALFCIRCLE: {
            x: -1260.1083626642362,
            y: 1361.3375074809244,
        },
        PSV_LINE3_TOP_NONE: {
            x: -1219.9913727940623,
            y: 1066.3862945267433,
        },
        PSV_LINE3_TOP_NONE1: {
            x: -1243.1459580683222,
            y: 1020.1249803904852,
        },
        PSV_LINE3_TOP_NONE2: {
            x: -1242.4987054998287,
            y: 963.723626602304,
        },
        PSV_LINE3_TOP_RIGHT: {
            x: -1254.4104579359896,
            y: 1415.3142896015559,
        },
        PT_2001_COL: { x: -1866.4577639723273, y: 1462.4297119508683 },
        PT_2001_DATA: { x: -1995.729893153021, y: 1149.2252195340056 },
        PT_2001_IMG: { x: -1898.7568597618636, y: 1399.3826957761635 },
        PT_2001_NONE: { x: -1865.795938216313, y: 1009.610885120657 },
        PT_2002_COL: { x: -1866.073792487846, y: 1050.0079742479018 },
        PT_2002_DATA: { x: -1993.699445139633, y: 1586.4921741314997 },
        PT_2002_IMG: { x: -1898.5737924878463, y: 986.4938130080379 },
        PT_2002_NONE: { x: -1866.220994341128, y: 1425.5940219176825 },
        PT_2003: { x: -666.2089558729057, y: 1188.8850079129675 },
        PT_2003_COL: { x: -633.9583485605712, y: 1251.8967025568588 },
        PT_2003_DATA: { x: -742.9610697521994, y: 1091.3785184131166 },
        PT_2003_NONE: { x: -633.0354493104628, y: 1209.00064035183 },
        SDV_2001A: { x: -2367.264096852104, y: 1047.9003450623102 },
        SDV_2001A_Name: { x: -2400.231075578696, y: 1016.8765739089936 },
        SDV_2001B: { x: -2347.936922940682, y: 1461.553943767321 },
        SDV_2001B_Name: { x: -2380.436922940682, y: 1431.1155032793695 },
        SDV_2002: { x: -546.8250410658575, y: 1247.6548809936753 },
        SDV_2002_Name: { x: -578.6384414106462, y: 1206.9501983013681 },
        TT_2001: { x: -804.780575412963, y: 1160.3568104077146 },
        TT_2001_COL: { x: -782.9206503661431, y: 1211.2440219701655 },
        TT_2001_DATA: { x: -891.8701172663017, y: 1010.002688321111 },
        TT_2001_NONE: { x: -781.9417334427174, y: 1174.1528941713789 },
        bor1: { x: -2436.5855686504956, y: 1039.1608637258034 },
        bor2: { x: -983.1512218888312, y: 1025.8994423073616 },
        bor3: { x: -2320.8078213113167, y: 1680.894788044694 },
        bor4: { x: -950.4329469573597, y: 1583.0590100592938 },
        borderWhite: { x: -2419.4989026325693, y: 730.797467783713 },
        line1: { x: -2407.3097089925586, y: 1684.7936897594798 },
        line2: { x: -2407.550402509801, y: 1663.500870252391 },
        line3: { x: -2030.8329144167883, y: 1098.5296705520232 },
        line4: { x: -2033.455135048047, y: 1512.635009158724 },
        line5: { x: -1559.5270533882806, y: 1098.3740496757796 },
        line6: { x: -1559.7769633031824, y: 1512.7897157412472 },
        line7: { x: -1036.0060026105384, y: 1098.3096365331119 },
        line8: { x: -1037.0272391551282, y: 1512.874739139494 },
        line9: { x: -661.0207270322528, y: 1298.5866709113047 },
        line9none: { x: -713.1893118583799, y: 1298.7824600879364 },
        line10: { x: -449.9501828459661, y: 1298.5866709113047 },
        line10none: { x: -405.6683476271253, y: 1298.7587875755169 },
        percent: { x: -405.6683476271253, y: 1298.7587875755169 },
        timeUpdate3: { x: -2381.52648946302, y: 800.0866709113047 },
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
                height: 47,
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
                width: 240,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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
                width: 220,
                height: 45,

                background: borderBox,
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

        {
            id: "EVC_01_Pressure_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.EVC_01_Pressure_IMG,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_02_Pressure_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.EVC_02_Pressure_IMG,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_2006_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_2006_COL,
            zIndex: 9999,
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
            zIndex: 9999,

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

        {
            id: "EVC_01_Pressure_COL",
            data: {
                label: <div></div>,
            },

            position: positions.EVC_01_Pressure_COL,
            zIndex: 9999,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "EVC_02_Pressure_COL",
            data: {
                label: <div></div>,
            },

            position: positions.EVC_02_Pressure_COL,
            zIndex: 9999,

            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },

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
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
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
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
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
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
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
                width: 280,

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
                border: background,
                width: 300,
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
                border: background,
                width: 300,
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

        {
            id: "EVC_01_Pressure_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.EVC_01_Pressure_NONE,
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
            id: "EVC_02_Pressure_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.EVC_02_Pressure_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },

        //===========================  TT LINE ==================================

        {
            id: "EVC_01_Temperature_COL",
            position: positions.EVC_01_Temperature_COL,
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
            id: "EVC_02_Temperature_COL",
            position: positions.EVC_02_Temperature_COL,
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
            id: "EVC_01_Temperature",
            position: positions.EVC_01_Temperature,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
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
            id: "EVC_02_Temperature",
            position: positions.EVC_02_Temperature,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
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

        //================================  ==================================

        {
            id: "EVC_01_Temperature_COL",
            position: positions.EVC_01_Temperature_COL,
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
            id: "EVC_02_Temperature_COL",
            position: positions.EVC_02_Temperature_COL,
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
                border: background,
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },
        {
            id: "EVC_02_Temperature_NONE",
            position: positions.EVC_02_Temperature_NONE,
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
            },
        },

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
                border: background,
                width: 350,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },
        {
            id: "EVC_01_Temperature_NONE",
            position: positions.EVC_01_Temperature_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
            },
        },
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
                width: 240,
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
                height: 60,
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
                width: 240,
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
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
                    <Controls style={{ position: "absolute", top: 0 }} />

                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
