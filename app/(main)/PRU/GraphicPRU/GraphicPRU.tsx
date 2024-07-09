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
import { id_CNG_PRU } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { SDV_OFF, SDV_ON } from "../../Graphic/MEIKO/GraphicMeiko/iconSVG";

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

export default function GraphicPRU() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);

    const [PIT_6001A, setPIT_6001A] = useState<string | null>(null);
    const [PIT_6001B, setPIT_6001B] = useState<string | null>(null);
    const [PIT_6002A, setPIT_6002A] = useState<string | null>(null);
    const [PIT_6002B, setPIT_6002B] = useState<string | null>(null);
    const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);

    const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(
        null
    );
    const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(
        null
    );
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

    const [
        EVC_02_Flow_at_Measurement_Condition,
        setEVC_02_Flow_at_Measurement_Condition,
    ] = useState<string | null>(null);
    const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] =
        useState<string | null>(null);
    const [
        EVC_02_Volume_at_Base_Condition,
        setEVC_02_Volume_at_Base_Condition,
    ] = useState<string | null>(null);
    const [
        EVC_02_Volume_at_Measurement_Condition,
        setEVC_02_Volume_at_Measurement_Condition,
    ] = useState<string | null>(null);
    const [PCV_6001A, setPCV_6001A] = useState();
    const [PCV_6001B, setPCV_6001B] = useState();
    const [PCV_6002A, setPCV_6002A] = useState();
    const [PCV_6002B, setPCV_6002B] = useState();

    const [PSV_6001A, setPSV_6001A] = useState();
    const [PSV_6001B, setPSV_6001B] = useState();
    const [PSV_6002A, setPSV_6002A] = useState();
    const [PSV_6002B, setPSV_6002B] = useState();

    const [SDV_6001A, setSDV_6001A] = useState<any>();
    const [SDV_6001B, setSDV_6001B] = useState<string | null>(null);
    const [SDV_6002, setSDV_6002] = useState<string | null>(null);

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
    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_CNG_PRU,
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
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002B",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_CNG_PRU,
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
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002B",
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
                        PIT_6001A: setPIT_6001A,
                        PIT_6001B: setPIT_6001B,
                        PIT_6002A: setPIT_6002A,
                        PIT_6002B: setPIT_6002B,

                        EVC_01_Pressure: setEVC_01_Pressure,
                        EVC_02_Pressure: setEVC_02_Pressure,
                        EVC_01_Temperature: setEVC_01_Temperature,
                        EVC_02_Temperature: setEVC_02_Temperature,

                        SDV_6001A: setSDV_6001A,
                        SDV_6001B: setSDV_6001B,
                        SDV_6002: setSDV_6002,
                        TIT_6001A: setTIT_6001A,
                        PIT_6003A: setPIT_6003A,
                        GD_6001: setGD_6001,

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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001A
                            .value;
                    setPCV_6001A(ballValue);
                    const ballValueB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001B
                            .value;
                    setPCV_6001B(ballValueB);
                    const ballValue2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002B
                            .value;
                    setPCV_6002B(ballValue2B);
                    const ballValue2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002A
                            .value;
                    setPCV_6002A(ballValue2A);

                    const ballValueS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001A
                            .value;
                    setPSV_6001A(ballValueS);
                    const ballValueSB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6001B
                            .value;
                    setPSV_6001B(ballValueSB);
                    const ballValueS2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6002B
                            .value;
                    setPSV_6002B(ballValueS2B);
                    const ballValueS2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6002A
                            .value;
                    setPSV_6002A(ballValueS2A);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001A.value;
                    setPCV_6001A(updatedData);
                    const updatedDataB =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001B.value;
                    setPCV_6001B(updatedDataB);

                    const ballValue2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002A.value;
                    setPCV_6002A(ballValue2B);
                    const updatedEVC_01_Volume_at_Base_ConditionA =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002B.value;
                    setPCV_6002B(updatedEVC_01_Volume_at_Base_ConditionA);

                    const updatedDataS =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001A.value;
                    setPSV_6001A(updatedDataS);
                    const updatedDataSB =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6001B.value;
                    setPSV_6001B(updatedDataSB);

                    const ballValueS2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6002A.value;
                    setPSV_6002A(ballValueS2B);
                    const updatedDataS2A =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6002B.value;
                    setPSV_6002B(updatedDataS2A);
                }

            fetchData();

            };

        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/values/attributes/SERVER_SCOPE`
            );

            const HighPIT_6001A = res.data.find(
                (item: any) => item.key === "PIT_6001A_High"
            );
            setHighPIT_6001A(HighPIT_6001A?.value || null);
            const LowPIT_6001A = res.data.find(
                (item: any) => item.key === "PIT_6001A_Low"
            );
            setLowPIT_6001A(LowPIT_6001A?.value || null);

            const MaintainPIT_6001A = res.data.find(
                (item: any) => item.key === "PIT_6001A_Maintain"
            );
            setMaintainPIT_6001A(MaintainPIT_6001A?.value || false);
            //===========================================================================================

            const HighPIT_6001B = res.data.find(
                (item: any) => item.key === "PIT_6001B_High"
            );
            setHighPIT_6001B(HighPIT_6001B?.value || null);
            const LowPIT_6001B = res.data.find(
                (item: any) => item.key === "PIT_6001B_Low"
            );
            setLowPIT_6001B(LowPIT_6001B?.value || null);

            const MaintainPIT_6001B = res.data.find(
                (item: any) => item.key === "PIT_6001B_Maintain"
            );
            setMaintainPIT_6001B(MaintainPIT_6001B?.value || false);
            //===========================================================================================

            const HighPIT_6002A = res.data.find(
                (item: any) => item.key === "PIT_6002A_High"
            );
            setHighPIT_6002A(HighPIT_6002A?.value || null);
            const LowPIT_6002A = res.data.find(
                (item: any) => item.key === "PIT_6002A_Low"
            );
            setLowPIT_6002A(LowPIT_6002A?.value || null);

            const PIT_6002A_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6002A_Maintain"
            );
            setMaintainPIT_6002A(PIT_6002A_Maintain?.value || false);

            //===========================================================================================

            const HighPIT_6002B = res.data.find(
                (item: any) => item.key === "PIT_6002B_High"
            );
            setHighPIT_6002B(HighPIT_6002B?.value || null);

            const LowPIT_6002B = res.data.find(
                (item: any) => item.key === "PIT_6002B_Low"
            );
            setLowPIT_6002B(LowPIT_6002B?.value || null);

            const PIT_6002B_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6002B_Maintain"
            );
            setMaintainPIT_6002B(PIT_6002B_Maintain?.value || false);
            //===========================================================================================

            const HighEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_High"
            );
            setHighEVC_01_Pressure(HighEVC_01_Pressure?.value || null);

            const LowEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Low"
            );
            setLowEVC_01_Pressure(LowEVC_01_Pressure?.value || null);

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
            setHighEVC_02_Pressure(HighEVC_02_Pressure?.value || null);

            const LowEVC_02_Pressure = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Low"
            );
            setLowEVC_02_Pressure(LowEVC_02_Pressure?.value || null);
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
            setHighEVC_01_Temperature(HighEVC_01_Temperature?.value || null);

            const LowEVC_01_Temperature = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Low"
            );
            setLowEVC_01_Temperature(LowEVC_01_Temperature?.value || null);
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
            setHighEVC_02_Temperature(HighEVC_02_Temperature?.value || null);

            const LowEVC_02_Temperature = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Low"
            );
            setLowEVC_02_Temperature(LowEVC_02_Temperature?.value || null);

            const EVC_02_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );
            setMaintainEVC_02_Temperature(
                EVC_02_Temperature_Maintain?.value || false
            );
            //===========================================================================================

            const HighSDV_6001A = res.data.find(
                (item: any) => item.key === "SDV_6001A_High"
            );
            setHighSDV_6001A(HighSDV_6001A?.value || null);

            const LowSDV_6001A = res.data.find(
                (item: any) => item.key === "SDV_6001A_Low"
            );
            setLowSDV_6001A(LowSDV_6001A?.value || null);

            const SDV_6001A_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6001A_Maintain"
            );
            setMaintainSDV_6001A(SDV_6001A_Maintain?.value || false);
            //===========================================================================================

            const HighSDV_6002 = res.data.find(
                (item: any) => item.key === "SDV_6002_High"
            );
            setHighSDV_6002(HighSDV_6002?.value || null);

            const LowSDV_6002 = res.data.find(
                (item: any) => item.key === "SDV_6002_Low"
            );
            setLowSDV_6002(LowSDV_6002?.value || null);

            const SDV_6002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6002_Maintain"
            );
            setMaintainSDV_6002(SDV_6002_Maintain?.value || false);

            //===========================================================================================
            //===========================================================================================

            const HighTIT_6001A = res.data.find(
                (item: any) => item.key === "TIT_6001A_High"
            );
            setHighTIT_6001A(HighTIT_6001A?.value || null);

            const LowTIT_6001A = res.data.find(
                (item: any) => item.key === "TIT_6001A_Low"
            );
            setLowTIT_6001A(LowTIT_6001A?.value || null);

            const TIT_6001A_Maintain = res.data.find(
                (item: any) => item.key === "TIT_6001A_Maintain"
            );
            setMaintainTIT_6001A(TIT_6001A_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighPIT_6003A = res.data.find(
                (item: any) => item.key === "PIT_6003A_High"
            );
            setHighPIT_6003A(HighPIT_6003A?.value || null);

            const LowPIT_6003A = res.data.find(
                (item: any) => item.key === "PIT_6003A_Low"
            );
            setLowPIT_6003A(LowPIT_6003A?.value || null);

            const PIT_6003A_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6003A_Maintain"
            );
            setMaintainPIT_6003A(PIT_6003A_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighGD_6001 = res.data.find(
                (item: any) => item.key === "GD_6001_High"
            );
            setHighGD_6001(HighGD_6001?.value || null);

            const LowGD_6001 = res.data.find(
                (item: any) => item.key === "GD_6001_Low"
            );
            setLowGD_6001(LowGD_6001?.value || null);

            const GD_6001_Maintain = res.data.find(
                (item: any) => item.key === "GD_6001_Maintain"
            );
            setMaintainGD_6001(GD_6001_Maintain?.value || false);
            //===========================================================================================
            //===========================================================================================

            const HighEVC_01_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High"
            );
            setHighEVC_01_Flow_at_Base_Condition(
                HighEVC_01_Flow_at_Base_Condition?.value || null
            );

            const LowEVC_01_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low"
            );
            setLowEVC_01_Flow_at_Base_Condition(
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
            setHighEVC_01_Flow_at_Measurement_Condition(
                HighEVC_01_Flow_at_Measurement_Condition?.value || null
            );

            const LowEVC_01_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Flow_at_Measurement_Condition_Low"
            );
            setLowEVC_01_Flow_at_Measurement_Condition(
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
            setHighEVC_01_Volume_at_Base_Condition(
                HighEVC_01_Volume_at_Base_Condition?.value || null
            );

            const LowEVC_01_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Base_Condition_Low"
            );
            setLowEVC_01_Volume_at_Base_Condition(
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
            setHighEVC_01_Volume_at_Measurement_Condition(
                HighEVC_01_Volume_at_Measurement_Condition?.value || null
            );

            const LowEVC_01_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_01_Volume_at_Measurement_Condition_Low"
            );
            setLowEVC_01_Volume_at_Measurement_Condition(
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
            setHighEVC_02_Flow_at_Base_Condition(
                HighEVC_02_Flow_at_Base_Condition?.value || null
            );

            const LowEVC_02_Flow_at_Base_Condition = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low"
            );
            setLowEVC_02_Flow_at_Base_Condition(
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
            setHighEVC_02_Flow_at_Measurement_Condition(
                HighEVC_02_Flow_at_Measurement_Condition?.value || null
            );

            const LowEVC_02_Flow_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Flow_at_Measurement_Condition_Low"
            );
            setLowEVC_02_Flow_at_Measurement_Condition(
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
            setHighEVC_02_Volume_at_Base_Condition(
                HighEVC_02_Volume_at_Base_Condition?.value || null
            );

            const LowEVC_02_Volume_at_Base_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Base_Condition_Low"
            );
            setLowEVC_02_Volume_at_Base_Condition(
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
            setHighEVC_02_Volume_at_Measurement_Condition(
                HighEVC_02_Volume_at_Measurement_Condition?.value || null
            );

            const LowEVC_02_Volume_at_Measurement_Condition = res.data.find(
                (item: any) =>
                    item.key === "EVC_02_Volume_at_Measurement_Condition_Low"
            );
            setLowEVC_02_Volume_at_Measurement_Condition(
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
        PIT_6001A: "PIT_6001A",
        PIT_6001B: "PIT_6001B",
        PIT_6002A: "PIT_6002A",
        PIT_6002B: "PIT_6002B",
        EVC_01_Pressure: "EVC 01 Pressure",
        EVC_02_Pressure: "EVC 02 Pressure",

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
        BARG: "BARG",
    };
    //================================ PIT_6001A================================

    const [audioPIT_6001A, setaudioPIT_6001A] = useState(false);
    const [HighPIT_6001A, setHighPIT_6001A] = useState<number | null>(null);
    const [LowPIT_6001A, setLowPIT_6001A] = useState<number | null>(null);
    const [audioColorPIT_6001A, setaudioColorPIT_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6001A, setMaintainPIT_6001A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6001A === "string" &&
            typeof LowPIT_6001A === "string" &&
            PIT_6001A !== null &&
            maintainPIT_6001A === false
        ) {
            const highValue = parseFloat(HighPIT_6001A);
            const lowValue = parseFloat(LowPIT_6001A);
            const PIT_6001AValue = parseFloat(PIT_6001A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6001AValue)
            ) {
                if (highValue < PIT_6001AValue || PIT_6001AValue < lowValue) {
                    if (!audioPIT_6001A) {
                        audioRef.current?.play();
                        setaudioPIT_6001A(true);
                        setaudioColorPIT_6001A(true);
                    }
                } else {
                    setaudioPIT_6001A(false);
                    setaudioColorPIT_6001A(false);
                }
            }
        }
    }, [
        HighPIT_6001A,
        PIT_6001A,
        audioPIT_6001A,
        LowPIT_6001A,
        maintainPIT_6001A,
    ]);

    useEffect(() => {
        if (audioPIT_6001A) {
            const audioEnded = () => {
                setaudioPIT_6001A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6001A]);

    //================================ PIT_6001A======================================================

    //================================ PIT_6001B================================

    const [audioPIT_6001B, setaudioPIT_6001B] = useState(false);
    const [HighPIT_6001B, setHighPIT_6001B] = useState<number | null>(null);
    const [LowPIT_6001B, setLowPIT_6001B] = useState<number | null>(null);
    const [audioColorPIT_6001B, setaudioColorPIT_6001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6001B, setMaintainPIT_6001B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6001B === "string" &&
            typeof LowPIT_6001B === "string" &&
            PIT_6001B !== null &&
            maintainPIT_6001B === false
        ) {
            const highValue = parseFloat(HighPIT_6001B);
            const lowValue = parseFloat(LowPIT_6001B);
            const PIT_6001BValue = parseFloat(PIT_6001B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6001BValue)
            ) {
                if (highValue < PIT_6001BValue || PIT_6001BValue < lowValue) {
                    if (!audioPIT_6001B) {
                        audioRef.current?.play();
                        setaudioPIT_6001B(true);
                        setaudioColorPIT_6001B(true);
                    }
                } else {
                    setaudioPIT_6001B(false);
                    setaudioColorPIT_6001B(false);
                }
            }
        }
    }, [
        HighPIT_6001B,
        PIT_6001B,
        audioPIT_6001B,
        LowPIT_6001B,
        maintainPIT_6001B,
    ]);

    useEffect(() => {
        if (audioPIT_6001B) {
            const audioEnded = () => {
                setaudioPIT_6001B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6001B]);

    //================================ PIT_6001B ======================================================

    //================================ PIT_6002A================================

    const [audioPIT_6002A, setaudioPIT_6002A] = useState(false);
    const [HighPIT_6002A, setHighPIT_6002A] = useState<number | null>(null);
    const [LowPIT_6002A, setLowPIT_6002A] = useState<number | null>(null);
    const [audioColorPIT_6002A, setaudioColorPIT_6002A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6002A, setMaintainPIT_6002A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6002A === "string" &&
            typeof LowPIT_6002A === "string" &&
            PIT_6002A !== null &&
            maintainPIT_6002A === false
        ) {
            const highValue = parseFloat(HighPIT_6002A);
            const lowValue = parseFloat(LowPIT_6002A);
            const PIT_6002AValue = parseFloat(PIT_6002A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6002AValue)
            ) {
                if (highValue < PIT_6002AValue || PIT_6002AValue < lowValue) {
                    if (!audioPIT_6002A) {
                        audioRef.current?.play();
                        setaudioPIT_6002A(true);
                        setaudioColorPIT_6002A(true);
                    }
                } else {
                    setaudioPIT_6002A(false);
                    setaudioColorPIT_6002A(false);
                }
            }
        }
    }, [
        HighPIT_6002A,
        PIT_6002A,
        audioPIT_6002A,
        LowPIT_6002A,
        maintainPIT_6002A,
    ]);

    useEffect(() => {
        if (audioPIT_6002A) {
            const audioEnded = () => {
                setaudioPIT_6002A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6002A]);

    //================================ PIT_6002A ======================================================

    //================================ PIT_6002B================================

    const [audioPIT_6002B, setaudioPIT_6002B] = useState(false);
    const [HighPIT_6002B, setHighPIT_6002B] = useState<number | null>(null);
    const [LowPIT_6002B, setLowPIT_6002B] = useState<number | null>(null);
    const [audioColorPIT_6002B, setaudioColorPIT_6002B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6002B, setMaintainPIT_6002B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6002B === "string" &&
            typeof LowPIT_6002B === "string" &&
            PIT_6002B !== null &&
            maintainPIT_6002B === false
        ) {
            const highValue = parseFloat(HighPIT_6002B);
            const lowValue = parseFloat(LowPIT_6002B);
            const PIT_6002BValue = parseFloat(PIT_6002B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6002BValue)
            ) {
                if (highValue < PIT_6002BValue || PIT_6002BValue < lowValue) {
                    if (!audioPIT_6002B) {
                        audioRef.current?.play();
                        setaudioPIT_6002B(true);
                        setaudioColorPIT_6002B(true);
                    }
                } else {
                    setaudioPIT_6002B(false);
                    setaudioColorPIT_6002B(false);
                }
            }
        }
    }, [
        HighPIT_6002B,
        PIT_6002B,
        audioPIT_6002B,
        LowPIT_6002B,
        maintainPIT_6002B,
    ]);

    useEffect(() => {
        if (audioPIT_6002B) {
            const audioEnded = () => {
                setaudioPIT_6002B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6002B]);

    //================================ PIT_6002B ======================================================

    //================================ EVC_02_Pressure================================

    const [audioEVC_02_Pressure, setaudioEVC_02_Pressure] = useState(false);
    const [HighEVC_02_Pressure, setHighEVC_02_Pressure] = useState<
        number | null
    >(null);
    const [LowEVC_02_Pressure, setLowEVC_02_Pressure] = useState<number | null>(
        null
    );
    const [audioColorEVC_02_Pressure, setaudioColorEVC_02_Pressure] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Pressure === "string" &&
            typeof LowEVC_02_Pressure === "string" &&
            EVC_02_Pressure !== null &&
            maintainEVC_02_Pressure === false
        ) {
            const highValue = parseFloat(HighEVC_02_Pressure);
            const lowValue = parseFloat(LowEVC_02_Pressure);
            const EVC_02_PressureValue = parseFloat(EVC_02_Pressure);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC_02_PressureValue)
            ) {
                if (
                    highValue < EVC_02_PressureValue ||
                    EVC_02_PressureValue < lowValue
                ) {
                    if (!audioEVC_02_Pressure) {
                        audioRef.current?.play();
                        setaudioEVC_02_Pressure(true);
                        setaudioColorEVC_02_Pressure(true);
                    }
                } else {
                    setaudioEVC_02_Pressure(false);
                    setaudioColorEVC_02_Pressure(false);
                }
            }
        }
    }, [
        HighEVC_02_Pressure,
        EVC_02_Pressure,
        audioEVC_02_Pressure,
        LowEVC_02_Pressure,
        maintainEVC_02_Pressure,
    ]);

    useEffect(() => {
        if (audioEVC_02_Pressure) {
            const audioEnded = () => {
                setaudioEVC_02_Pressure(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Pressure]);

    //================================ EVC_02_Pressure ======================================================

    //================================ EVC_01_Pressure================================

    const [audioEVC_01_Pressure, setaudioEVC_01_Pressure] = useState(false);
    const [HighEVC_01_Pressure, setHighEVC_01_Pressure] = useState<
        number | null
    >(null);
    const [LowEVC_01_Pressure, setLowEVC_01_Pressure] = useState<number | null>(
        null
    );
    const [audioColorEVC_01_Pressure, setaudioColorEVC_01_Pressure] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC_01_Pressure, setMaintainEVC_01_Pressure] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_01_Pressure === "string" &&
            typeof LowEVC_01_Pressure === "string" &&
            EVC_01_Pressure !== null &&
            maintainEVC_01_Pressure === false
        ) {
            const highValue = parseFloat(HighEVC_01_Pressure);
            const lowValue = parseFloat(LowEVC_01_Pressure);
            const EVC_01_PressureValue = parseFloat(EVC_01_Pressure);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC_01_PressureValue)
            ) {
                if (
                    highValue < EVC_01_PressureValue ||
                    EVC_01_PressureValue < lowValue
                ) {
                    if (!audioEVC_01_Pressure) {
                        audioRef.current?.play();
                        setaudioEVC_01_Pressure(true);
                        setaudioColorEVC_01_Pressure(true);
                    }
                } else {
                    setaudioEVC_01_Pressure(false);
                    setaudioColorEVC_01_Pressure(false);
                }
            }
        }
    }, [
        HighEVC_01_Pressure,
        EVC_01_Pressure,
        audioEVC_01_Pressure,
        LowEVC_01_Pressure,
        maintainEVC_01_Pressure,
    ]);

    useEffect(() => {
        if (audioEVC_01_Pressure) {
            const audioEnded = () => {
                setaudioEVC_01_Pressure(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Pressure]);

    //================================ EVC_01_Pressure ======================================================

    //================================ EVC_01_Temperature================================

    const [audioEVC_01_Temperature, setaudioEVC_01_Temperature] =
        useState(false);
    const [HighEVC_01_Temperature, setHighEVC_01_Temperature] = useState<
        number | null
    >(null);
    const [LowEVC_01_Temperature, setLowEVC_01_Temperature] = useState<
        number | null
    >(null);
    const [audioColorEVC_01_Temperature, setaudioColorEVC_01_Temperature] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_01_Temperature === "string" &&
            typeof LowEVC_01_Temperature === "string" &&
            EVC_01_Temperature !== null &&
            maintainEVC_01_Temperature === false
        ) {
            const highValue = parseFloat(HighEVC_01_Temperature);
            const lowValue = parseFloat(LowEVC_01_Temperature);
            const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC_01_TemperatureValue)
            ) {
                if (
                    highValue < EVC_01_TemperatureValue ||
                    EVC_01_TemperatureValue < lowValue
                ) {
                    if (!audioEVC_01_Temperature) {
                        audioRef.current?.play();
                        setaudioEVC_01_Temperature(true);
                        setaudioColorEVC_01_Temperature(true);
                    }
                } else {
                    setaudioEVC_01_Temperature(false);
                    setaudioColorEVC_01_Temperature(false);
                }
            }
        }
    }, [
        HighEVC_01_Temperature,
        EVC_01_Temperature,
        audioEVC_01_Temperature,
        LowEVC_01_Temperature,
        maintainEVC_01_Temperature,
    ]);

    useEffect(() => {
        if (audioEVC_01_Temperature) {
            const audioEnded = () => {
                setaudioEVC_01_Temperature(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Temperature]);

    //================================ EVC_01_Temperature ======================================================
    //================================ EVC_02_Temperature================================

    const [audioEVC_02_Temperature, setaudioEVC_02_Temperature] =
        useState(false);
    const [HighEVC_02_Temperature, setHighEVC_02_Temperature] = useState<
        number | null
    >(null);
    const [LowEVC_02_Temperature, setLowEVC_02_Temperature] = useState<
        number | null
    >(null);
    const [audioColorEVC_02_Temperature, setaudioColorEVC_02_Temperature] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC_02_Temperature, setMaintainEVC_02_Temperature] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Temperature === "string" &&
            typeof LowEVC_02_Temperature === "string" &&
            EVC_02_Temperature !== null &&
            maintainEVC_02_Temperature === false
        ) {
            const highValue = parseFloat(HighEVC_02_Temperature);
            const lowValue = parseFloat(LowEVC_02_Temperature);
            const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC_02_TemperatureValue)
            ) {
                if (
                    highValue < EVC_02_TemperatureValue ||
                    EVC_02_TemperatureValue < lowValue
                ) {
                    if (!audioEVC_02_Temperature) {
                        audioRef.current?.play();
                        setaudioEVC_02_Temperature(true);
                        setaudioColorEVC_02_Temperature(true);
                    }
                } else {
                    setaudioEVC_02_Temperature(false);
                    setaudioColorEVC_02_Temperature(false);
                }
            }
        }
    }, [
        HighEVC_02_Temperature,
        EVC_02_Temperature,
        audioEVC_02_Temperature,
        LowEVC_02_Temperature,
        maintainEVC_02_Temperature,
    ]);

    useEffect(() => {
        if (audioEVC_02_Temperature) {
            const audioEnded = () => {
                setaudioEVC_02_Temperature(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Temperature]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_02_Temperature================================

    const [audioSDV_6001A, setaudioSDV_6001A] = useState(false);
    const [HighSDV_6001A, setHighSDV_6001A] = useState<number | null>(null);
    const [LowSDV_6001A, setLowSDV_6001A] = useState<number | null>(null);
    const [audioColorSDV_6001A, setaudioColorSDV_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSDV_6001A, setMaintainSDV_6001A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSDV_6001A === "string" &&
            typeof LowSDV_6001A === "string" &&
            SDV_6001A !== null &&
            maintainSDV_6001A === false
        ) {
            const highValue = parseFloat(HighSDV_6001A);
            const lowValue = parseFloat(LowSDV_6001A);
            const SDV_6001AValue = parseFloat(SDV_6001A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(SDV_6001AValue)
            ) {
                if (highValue < SDV_6001AValue || SDV_6001AValue < lowValue) {
                    if (!audioSDV_6001A) {
                        audioRef.current?.play();
                        setaudioSDV_6001A(true);
                        setaudioColorSDV_6001A(true);
                    }
                } else {
                    setaudioSDV_6001A(false);
                    setaudioColorSDV_6001A(false);
                }
            }
        }
    }, [
        HighSDV_6001A,
        SDV_6001A,
        audioSDV_6001A,
        LowSDV_6001A,
        maintainSDV_6001A,
    ]);

    useEffect(() => {
        if (audioSDV_6001A) {
            const audioEnded = () => {
                setaudioSDV_6001A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSDV_6001A]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_02_Temperature================================

    const [audioSDV_6001B, setaudioSDV_6001B] = useState(false);
    const [HighSDV_6001B, setHighSDV_6001B] = useState<number | null>(null);
    const [LowSDV_6001B, setLowSDV_6001B] = useState<number | null>(null);
    const [audioColorSDV_6001B, setaudioColorSDV_6001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSDV_6001B, setMaintainSDV_6001B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSDV_6001B === "string" &&
            typeof LowSDV_6001B === "string" &&
            SDV_6001B !== null &&
            maintainSDV_6001B === false
        ) {
            const highValue = parseFloat(HighSDV_6001B);
            const lowValue = parseFloat(LowSDV_6001B);
            const SDV_6001BValue = parseFloat(SDV_6001B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(SDV_6001BValue)
            ) {
                if (highValue < SDV_6001BValue || SDV_6001BValue < lowValue) {
                    if (!audioSDV_6001B) {
                        audioRef.current?.play();
                        setaudioSDV_6001B(true);
                        setaudioColorSDV_6001B(true);
                    }
                } else {
                    setaudioSDV_6001B(false);
                    setaudioColorSDV_6001B(false);
                }
            }
        }
    }, [
        HighSDV_6001B,
        SDV_6001B,
        audioSDV_6001B,
        LowSDV_6001B,
        maintainSDV_6001B,
    ]);

    useEffect(() => {
        if (audioSDV_6001B) {
            const audioEnded = () => {
                setaudioSDV_6001B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSDV_6001B]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_02_Temperature================================

    const [audioSDV_6002, setaudioSDV_6002] = useState(false);
    const [HighSDV_6002, setHighSDV_6002] = useState<number | null>(null);
    const [LowSDV_6002, setLowSDV_6002] = useState<number | null>(null);
    const [audioColorSDV_6002, setaudioColorSDV_6002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainSDV_6002, setMaintainSDV_6002] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighSDV_6002 === "string" &&
            typeof LowSDV_6002 === "string" &&
            SDV_6002 !== null &&
            maintainSDV_6002 === false
        ) {
            const highValue = parseFloat(HighSDV_6002);
            const lowValue = parseFloat(LowSDV_6002);
            const SDV_6002Value = parseFloat(SDV_6002);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(SDV_6002Value)
            ) {
                if (highValue < SDV_6002Value || SDV_6002Value < lowValue) {
                    if (!audioSDV_6002) {
                        audioRef.current?.play();
                        setaudioSDV_6002(true);
                        setaudioColorSDV_6002(true);
                    }
                } else {
                    setaudioSDV_6002(false);
                    setaudioColorSDV_6002(false);
                }
            }
        }
    }, [HighSDV_6002, SDV_6002, audioSDV_6002, LowSDV_6002, maintainSDV_6002]);

    useEffect(() => {
        if (audioSDV_6002) {
            const audioEnded = () => {
                setaudioSDV_6002(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioSDV_6002]);

    //================================ EVC_02_Temperature =============================================

    //================================ EVC_02_Temperature================================
    const [TIT_6001A, setTIT_6001A] = useState<string | null>(null);
    const [audioTIT_6001A, setaudioTIT_6001A] = useState(false);
    const [HighTIT_6001A, setHighTIT_6001A] = useState<number | null>(null);
    const [LowTIT_6001A, setLowTIT_6001A] = useState<number | null>(null);
    const [audioColorTIT_6001A, setaudioColorTIT_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainTIT_6001A, setMaintainTIT_6001A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighTIT_6001A === "string" &&
            typeof LowTIT_6001A === "string" &&
            TIT_6001A !== null &&
            maintainTIT_6001A === false
        ) {
            const highValue = parseFloat(HighTIT_6001A);
            const lowValue = parseFloat(LowTIT_6001A);
            const TIT_6001AValue = parseFloat(TIT_6001A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(TIT_6001AValue)
            ) {
                if (highValue < TIT_6001AValue || TIT_6001AValue < lowValue) {
                    if (!audioTIT_6001A) {
                        audioRef.current?.play();
                        setaudioTIT_6001A(true);
                        setaudioColorTIT_6001A(true);
                    }
                } else {
                    setaudioTIT_6001A(false);
                    setaudioColorTIT_6001A(false);
                }
            }
        }
    }, [
        HighTIT_6001A,
        TIT_6001A,
        audioTIT_6001A,
        LowTIT_6001A,
        maintainTIT_6001A,
    ]);

    useEffect(() => {
        if (audioTIT_6001A) {
            const audioEnded = () => {
                setaudioTIT_6001A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioTIT_6001A]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_02_Temperature================================
    const [PIT_6003A, setPIT_6003A] = useState<string | null>(null);
    const [audioPIT_6003A, setaudioPIT_6003A] = useState(false);
    const [HighPIT_6003A, setHighPIT_6003A] = useState<number | null>(null);
    const [LowPIT_6003A, setLowPIT_6003A] = useState<number | null>(null);
    const [audioColorPIT_6003A, setaudioColorPIT_6003A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6003A, setMaintainPIT_6003A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6003A === "string" &&
            typeof LowPIT_6003A === "string" &&
            PIT_6003A !== null &&
            maintainPIT_6003A === false
        ) {
            const highValue = parseFloat(HighPIT_6003A);
            const lowValue = parseFloat(LowPIT_6003A);
            const PIT_6003AValue = parseFloat(PIT_6003A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6003AValue)
            ) {
                if (highValue < PIT_6003AValue || PIT_6003AValue < lowValue) {
                    if (!audioPIT_6003A) {
                        audioRef.current?.play();
                        setaudioPIT_6003A(true);
                        setaudioColorPIT_6003A(true);
                    }
                } else {
                    setaudioPIT_6003A(false);
                    setaudioColorPIT_6003A(false);
                }
            }
        }
    }, [
        HighPIT_6003A,
        PIT_6003A,
        audioPIT_6003A,
        LowPIT_6003A,
        maintainPIT_6003A,
    ]);

    useEffect(() => {
        if (audioPIT_6003A) {
            const audioEnded = () => {
                setaudioPIT_6003A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6003A]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_02_Temperature================================
    const [GD_6001, setGD_6001] = useState<string | null>(null);
    const [audioGD_6001, setaudioGD_6001] = useState(false);
    const [HighGD_6001, setHighGD_6001] = useState<number | null>(null);
    const [LowGD_6001, setLowGD_6001] = useState<number | null>(null);
    const [audioColorGD_6001, setaudioColorGD_6001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainGD_6001, setMaintainGD_6001] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighGD_6001 === "string" &&
            typeof LowGD_6001 === "string" &&
            GD_6001 !== null &&
            maintainGD_6001 === false
        ) {
            const highValue = parseFloat(HighGD_6001);
            const lowValue = parseFloat(LowGD_6001);
            const GD_6001Value = parseFloat(GD_6001);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_6001Value)) {
                if (highValue < GD_6001Value || GD_6001Value < lowValue) {
                    if (!audioGD_6001) {
                        audioRef.current?.play();
                        setaudioGD_6001(true);
                        setaudioColorGD_6001(true);
                    }
                } else {
                    setaudioGD_6001(false);
                    setaudioColorGD_6001(false);
                }
            }
        }
    }, [HighGD_6001, GD_6001, audioGD_6001, LowGD_6001, maintainGD_6001]);

    useEffect(() => {
        if (audioGD_6001) {
            const audioEnded = () => {
                setaudioGD_6001(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioGD_6001]);

    //================================ EVC_02_Temperature ======================================================

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================
    const [
        audioEVC_01_Flow_at_Base_Condition,
        setAudioEVC_01_Flow_at_Base_Condition,
    ] = useState(false);
    const [
        HighEVC_01_Flow_at_Base_Condition,
        setHighEVC_01_Flow_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_01_Flow_at_Base_Condition,
        setLowEVC_01_Flow_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Flow_at_Base_Condition,
        setExceedThresholdEVC_01_Flow_at_Base_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        inputValueHighEVC_01_Flow_at_Base_Condition,
        setInputValueHighEVC_01_Flow_at_Base_Condition,
    ] = useState<any>();
    const [
        inputValueLowEVC_01_Flow_at_Base_Condition,
        settInputValueLowEVC_01_Flow_at_Base_Condition,
    ] = useState<any>();

    const [
        maintainEVC_01_Flow_at_Base_Condition,
        setMaintainEVC_01_Flow_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_01_Flow_at_Base_Condition === "string" &&
            typeof LowEVC_01_Flow_at_Base_Condition === "string" &&
            EVC_01_Flow_at_Base_Condition !== null &&
            maintainEVC_01_Flow_at_Base_Condition === false
        ) {
            const highValueEVC_01_Flow_at_Base_Condition = parseFloat(
                HighEVC_01_Flow_at_Base_Condition
            );
            const lowValueEVC_01_Flow_at_Base_Condition = parseFloat(
                LowEVC_01_Flow_at_Base_Condition
            );
            const ValueEVC_01_Flow_at_Base_Condition = parseFloat(
                EVC_01_Flow_at_Base_Condition
            );

            if (
                !isNaN(highValueEVC_01_Flow_at_Base_Condition) &&
                !isNaN(lowValueEVC_01_Flow_at_Base_Condition) &&
                !isNaN(ValueEVC_01_Flow_at_Base_Condition)
            ) {
                if (
                    highValueEVC_01_Flow_at_Base_Condition <=
                        ValueEVC_01_Flow_at_Base_Condition ||
                    ValueEVC_01_Flow_at_Base_Condition <=
                        lowValueEVC_01_Flow_at_Base_Condition
                ) {
                    if (!audioEVC_01_Flow_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Flow_at_Base_Condition(true);
                        setExceedThresholdEVC_01_Flow_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Flow_at_Base_Condition(false);
                    setExceedThresholdEVC_01_Flow_at_Base_Condition(false);
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_01_Flow_at_Base_Condition,
        EVC_01_Flow_at_Base_Condition,
        audioEVC_01_Flow_at_Base_Condition,
        LowEVC_01_Flow_at_Base_Condition,
        maintainEVC_01_Flow_at_Base_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_01_Flow_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Flow_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Flow_at_Base_Condition]);

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    //================================ EVC_01_Flow_at_Measurement_Condition FIQ 1901 ======================================================
    const [
        audioEVC_01_Flow_at_Measurement_Condition,
        setAudioEVC_01_Flow_at_Measurement_Condition,
    ] = useState(false);
    const [
        HighEVC_01_Flow_at_Measurement_Condition,
        setHighEVC_01_Flow_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_01_Flow_at_Measurement_Condition,
        setLowEVC_01_Flow_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Flow_at_Measurement_Condition,
        setExceedThresholdEVC_01_Flow_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_01_Flow_at_Measurement_Condition,
        setMaintainEVC_01_Flow_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_01_Flow_at_Measurement_Condition === "string" &&
            typeof LowEVC_01_Flow_at_Measurement_Condition === "string" &&
            EVC_01_Flow_at_Measurement_Condition !== null &&
            maintainEVC_01_Flow_at_Measurement_Condition === false
        ) {
            const highValueEVC_01_Flow_at_Measurement_Condition = parseFloat(
                HighEVC_01_Flow_at_Measurement_Condition
            );
            const lowValueEVC_01_Flow_at_Measurement_Condition = parseFloat(
                LowEVC_01_Flow_at_Measurement_Condition
            );
            const ValueEVC_01_Flow_at_Measurement_Condition = parseFloat(
                EVC_01_Flow_at_Measurement_Condition
            );

            if (
                !isNaN(highValueEVC_01_Flow_at_Measurement_Condition) &&
                !isNaN(lowValueEVC_01_Flow_at_Measurement_Condition) &&
                !isNaN(ValueEVC_01_Flow_at_Measurement_Condition)
            ) {
                if (
                    highValueEVC_01_Flow_at_Measurement_Condition <=
                        ValueEVC_01_Flow_at_Measurement_Condition ||
                    ValueEVC_01_Flow_at_Measurement_Condition <=
                        lowValueEVC_01_Flow_at_Measurement_Condition
                ) {
                    if (!audioEVC_01_Flow_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Flow_at_Measurement_Condition(true);
                        setExceedThresholdEVC_01_Flow_at_Measurement_Condition(
                            true
                        );
                    }
                } else {
                    setAudioEVC_01_Flow_at_Measurement_Condition(false);
                    setExceedThresholdEVC_01_Flow_at_Measurement_Condition(
                        false
                    );
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_01_Flow_at_Measurement_Condition,
        EVC_01_Flow_at_Measurement_Condition,
        audioEVC_01_Flow_at_Measurement_Condition,
        LowEVC_01_Flow_at_Measurement_Condition,
        maintainEVC_01_Flow_at_Measurement_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_01_Flow_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Flow_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Flow_at_Measurement_Condition]);

    //================================ EVC_01_Flow_at_Measurement_Condition FIQ 1901 ======================================================

    //================================ EVC_01_Volume_at_Base_Condition FIQ 1901 ======================================================
    const [
        audioEVC_01_Volume_at_Base_Condition,
        setAudioEVC_01_Volume_at_Base_Condition,
    ] = useState(false);
    const [
        HighEVC_01_Volume_at_Base_Condition,
        setHighEVC_01_Volume_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_01_Volume_at_Base_Condition,
        setLowEVC_01_Volume_at_Base_Condition,
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
        if (
            typeof HighEVC_01_Volume_at_Base_Condition === "string" &&
            typeof LowEVC_01_Volume_at_Base_Condition === "string" &&
            EVC_01_Volume_at_Base_Condition !== null &&
            maintainEVC_01_Volume_at_Base_Condition === false
        ) {
            const highValueEVC_01_Volume_at_Base_Condition = parseFloat(
                HighEVC_01_Volume_at_Base_Condition
            );
            const lowValueEVC_01_Volume_at_Base_Condition = parseFloat(
                LowEVC_01_Volume_at_Base_Condition
            );
            const ValueEVC_01_Volume_at_Base_Condition = parseFloat(
                EVC_01_Volume_at_Base_Condition
            );

            if (
                !isNaN(highValueEVC_01_Volume_at_Base_Condition) &&
                !isNaN(lowValueEVC_01_Volume_at_Base_Condition) &&
                !isNaN(ValueEVC_01_Volume_at_Base_Condition)
            ) {
                if (
                    highValueEVC_01_Volume_at_Base_Condition <=
                        ValueEVC_01_Volume_at_Base_Condition ||
                    ValueEVC_01_Volume_at_Base_Condition <=
                        lowValueEVC_01_Volume_at_Base_Condition
                ) {
                    if (!audioEVC_01_Volume_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Volume_at_Base_Condition(true);
                        setExceedThresholdEVC_01_Volume_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Volume_at_Base_Condition(false);
                    setExceedThresholdEVC_01_Volume_at_Base_Condition(false);
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_01_Volume_at_Base_Condition,
        EVC_01_Volume_at_Base_Condition,
        audioEVC_01_Volume_at_Base_Condition,
        LowEVC_01_Volume_at_Base_Condition,
        maintainEVC_01_Volume_at_Base_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_01_Volume_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Volume_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Volume_at_Base_Condition]);

    //================================ EVC_01_Volume_at_Base_Condition FIQ 1901 ======================================================

    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================
    const [
        audioEVC_01_Volume_at_Measurement_Condition,
        setAudioEVC_01_Volume_at_Measurement_Condition,
    ] = useState(false);
    const [
        HighEVC_01_Volume_at_Measurement_Condition,
        setHighEVC_01_Volume_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_01_Volume_at_Measurement_Condition,
        setLowEVC_01_Volume_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_01_Volume_at_Measurement_Condition,
        setExceedThresholdEVC_01_Volume_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_01_Volume_at_Measurement_Condition,
        setMaintainEVC_01_Volume_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_01_Volume_at_Measurement_Condition === "string" &&
            typeof LowEVC_01_Volume_at_Measurement_Condition === "string" &&
            EVC_01_Volume_at_Measurement_Condition !== null &&
            maintainEVC_01_Volume_at_Measurement_Condition === false
        ) {
            const highValueEVC_01_Volume_at_Measurement_Condition = parseFloat(
                HighEVC_01_Volume_at_Measurement_Condition
            );
            const lowValueEVC_01_Volume_at_Measurement_Condition = parseFloat(
                LowEVC_01_Volume_at_Measurement_Condition
            );
            const ValueEVC_01_Volume_at_Measurement_Condition = parseFloat(
                EVC_01_Volume_at_Measurement_Condition
            );

            if (
                !isNaN(highValueEVC_01_Volume_at_Measurement_Condition) &&
                !isNaN(lowValueEVC_01_Volume_at_Measurement_Condition) &&
                !isNaN(ValueEVC_01_Volume_at_Measurement_Condition)
            ) {
                if (
                    highValueEVC_01_Volume_at_Measurement_Condition <=
                        ValueEVC_01_Volume_at_Measurement_Condition ||
                    ValueEVC_01_Volume_at_Measurement_Condition <=
                        lowValueEVC_01_Volume_at_Measurement_Condition
                ) {
                    if (!audioEVC_01_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Volume_at_Measurement_Condition(true);
                        setExceedThresholdEVC_01_Volume_at_Measurement_Condition(
                            true
                        );
                    }
                } else {
                    setAudioEVC_01_Volume_at_Measurement_Condition(false);
                    setExceedThresholdEVC_01_Volume_at_Measurement_Condition(
                        false
                    );
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_01_Volume_at_Measurement_Condition,
        EVC_01_Volume_at_Measurement_Condition,
        audioEVC_01_Volume_at_Measurement_Condition,
        LowEVC_01_Volume_at_Measurement_Condition,
        maintainEVC_01_Volume_at_Measurement_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_01_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_01_Volume_at_Measurement_Condition]);

    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================

    //================================ EVC_02_Flow_at_Base_Condition FIQ 1901 ======================================================
    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================
    const [
        audioEVC_02_Flow_at_Base_Condition,
        setAudioEVC_02_Flow_at_Base_Condition,
    ] = useState(false);
    const [
        HighEVC_02_Flow_at_Base_Condition,
        setHighEVC_02_Flow_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_02_Flow_at_Base_Condition,
        setLowEVC_02_Flow_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Flow_at_Base_Condition,
        setExceedThresholdEVC_02_Flow_at_Base_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainEVC_02_Flow_at_Base_Condition,
        setMaintainEVC_02_Flow_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Flow_at_Base_Condition === "string" &&
            typeof LowEVC_02_Flow_at_Base_Condition === "string" &&
            EVC_02_Flow_at_Base_Condition !== null &&
            maintainEVC_02_Flow_at_Base_Condition === false
        ) {
            const highValueEVC_02_Flow_at_Base_Condition = parseFloat(
                HighEVC_02_Flow_at_Base_Condition
            );
            const lowValueEVC_02_Flow_at_Base_Condition = parseFloat(
                LowEVC_02_Flow_at_Base_Condition
            );
            const ValueEVC_02_Flow_at_Base_Condition = parseFloat(
                EVC_02_Flow_at_Base_Condition
            );

            if (
                !isNaN(highValueEVC_02_Flow_at_Base_Condition) &&
                !isNaN(lowValueEVC_02_Flow_at_Base_Condition) &&
                !isNaN(ValueEVC_02_Flow_at_Base_Condition)
            ) {
                if (
                    highValueEVC_02_Flow_at_Base_Condition <=
                        ValueEVC_02_Flow_at_Base_Condition ||
                    ValueEVC_02_Flow_at_Base_Condition <=
                        lowValueEVC_02_Flow_at_Base_Condition
                ) {
                    if (!audioEVC_02_Flow_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Flow_at_Base_Condition(true);
                        setExceedThresholdEVC_02_Flow_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Flow_at_Base_Condition(false);
                    setExceedThresholdEVC_02_Flow_at_Base_Condition(false);
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_02_Flow_at_Base_Condition,
        EVC_02_Flow_at_Base_Condition,
        audioEVC_02_Flow_at_Base_Condition,
        LowEVC_02_Flow_at_Base_Condition,
        maintainEVC_02_Flow_at_Base_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_02_Flow_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Flow_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Flow_at_Base_Condition]);

    //================================ EVC_01_Flow_at_Base_Condition FIQ 1901 ======================================================

    //================================ EVC_02_Flow_at_Measurement_Condition FIQ 1901 ======================================================
    const [
        audioEVC_02_Flow_at_Measurement_Condition,
        setAudioEVC_02_Flow_at_Measurement_Condition,
    ] = useState(false);
    const [
        HighEVC_02_Flow_at_Measurement_Condition,
        setHighEVC_02_Flow_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_02_Flow_at_Measurement_Condition,
        setLowEVC_02_Flow_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Flow_at_Measurement_Condition,
        setExceedThresholdEVC_02_Flow_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Flow_at_Measurement_Condition,
        setMaintainEVC_02_Flow_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Flow_at_Measurement_Condition === "string" &&
            typeof LowEVC_02_Flow_at_Measurement_Condition === "string" &&
            EVC_02_Flow_at_Measurement_Condition !== null &&
            maintainEVC_02_Flow_at_Measurement_Condition === false
        ) {
            const highValueEVC_02_Flow_at_Measurement_Condition = parseFloat(
                HighEVC_02_Flow_at_Measurement_Condition
            );
            const lowValueEVC_02_Flow_at_Measurement_Condition = parseFloat(
                LowEVC_02_Flow_at_Measurement_Condition
            );
            const ValueEVC_02_Flow_at_Measurement_Condition = parseFloat(
                EVC_02_Flow_at_Measurement_Condition
            );

            if (
                !isNaN(highValueEVC_02_Flow_at_Measurement_Condition) &&
                !isNaN(lowValueEVC_02_Flow_at_Measurement_Condition) &&
                !isNaN(ValueEVC_02_Flow_at_Measurement_Condition)
            ) {
                if (
                    highValueEVC_02_Flow_at_Measurement_Condition <=
                        ValueEVC_02_Flow_at_Measurement_Condition ||
                    ValueEVC_02_Flow_at_Measurement_Condition <=
                        lowValueEVC_02_Flow_at_Measurement_Condition
                ) {
                    if (!audioEVC_02_Flow_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Flow_at_Measurement_Condition(true);
                        setExceedThresholdEVC_02_Flow_at_Measurement_Condition(
                            true
                        );
                    }
                } else {
                    setAudioEVC_02_Flow_at_Measurement_Condition(false);
                    setExceedThresholdEVC_02_Flow_at_Measurement_Condition(
                        false
                    );
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_02_Flow_at_Measurement_Condition,
        EVC_02_Flow_at_Measurement_Condition,
        audioEVC_02_Flow_at_Measurement_Condition,
        LowEVC_02_Flow_at_Measurement_Condition,
        maintainEVC_02_Flow_at_Measurement_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_02_Flow_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Flow_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Flow_at_Measurement_Condition]);

    //================================ EVC_01_Flow_at_Measurement_Condition FIQ 1901 ======================================================

    //================================ EVC_02_Volume_at_Base_Condition FIQ 1901 ======================================================
    const [
        audioEVC_02_Volume_at_Base_Condition,
        setAudioEVC_02_Volume_at_Base_Condition,
    ] = useState(false);
    const [
        HighEVC_02_Volume_at_Base_Condition,
        setHighEVC_02_Volume_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_02_Volume_at_Base_Condition,
        setLowEVC_02_Volume_at_Base_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Volume_at_Base_Condition,
        setExceedThresholdEVC_02_Volume_at_Base_Condition,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainEVC_02_Volume_at_Base_Condition,
        setMaintainEVC_02_Volume_at_Base_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Volume_at_Base_Condition === "string" &&
            typeof LowEVC_02_Volume_at_Base_Condition === "string" &&
            EVC_02_Volume_at_Base_Condition !== null &&
            maintainEVC_02_Volume_at_Base_Condition === false
        ) {
            const highValueEVC_02_Volume_at_Base_Condition = parseFloat(
                HighEVC_02_Volume_at_Base_Condition
            );
            const lowValueEVC_02_Volume_at_Base_Condition = parseFloat(
                LowEVC_02_Volume_at_Base_Condition
            );
            const ValueEVC_02_Volume_at_Base_Condition = parseFloat(
                EVC_02_Volume_at_Base_Condition
            );

            if (
                !isNaN(highValueEVC_02_Volume_at_Base_Condition) &&
                !isNaN(lowValueEVC_02_Volume_at_Base_Condition) &&
                !isNaN(ValueEVC_02_Volume_at_Base_Condition)
            ) {
                if (
                    highValueEVC_02_Volume_at_Base_Condition <=
                        ValueEVC_02_Volume_at_Base_Condition ||
                    ValueEVC_02_Volume_at_Base_Condition <=
                        lowValueEVC_02_Volume_at_Base_Condition
                ) {
                    if (!audioEVC_02_Volume_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Volume_at_Base_Condition(true);
                        setExceedThresholdEVC_02_Volume_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Volume_at_Base_Condition(false);
                    setExceedThresholdEVC_02_Volume_at_Base_Condition(false);
                }
            }
        }
    }, [
        HighEVC_02_Volume_at_Base_Condition,
        EVC_02_Volume_at_Base_Condition,
        audioEVC_02_Volume_at_Base_Condition,
        LowEVC_02_Volume_at_Base_Condition,
        maintainEVC_02_Volume_at_Base_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_02_Volume_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Volume_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Volume_at_Base_Condition]);

    //================================ EVC_02_Volume_at_Base_Condition FIQ 1901 ======================================================

    //================================ EVC_02_Volume_at_Measurement_Condition FIQ 1901 ======================================================
    const [
        audioEVC_02_Volume_at_Measurement_Condition,
        setAudioEVC_02_Volume_at_Measurement_Condition,
    ] = useState(false);
    const [
        HighEVC_02_Volume_at_Measurement_Condition,
        setHighEVC_02_Volume_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        LowEVC_02_Volume_at_Measurement_Condition,
        setLowEVC_02_Volume_at_Measurement_Condition,
    ] = useState<number | null>(null);
    const [
        exceedThresholdEVC_02_Volume_at_Measurement_Condition,
        setExceedThresholdEVC_02_Volume_at_Measurement_Condition,
    ] = useState(false);

    const [
        maintainEVC_02_Volume_at_Measurement_Condition,
        setMaintainEVC_02_Volume_at_Measurement_Condition,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC_02_Volume_at_Measurement_Condition === "string" &&
            typeof LowEVC_02_Volume_at_Measurement_Condition === "string" &&
            EVC_02_Volume_at_Measurement_Condition !== null &&
            maintainEVC_02_Volume_at_Measurement_Condition === false
        ) {
            const highValueEVC_02_Volume_at_Measurement_Condition = parseFloat(
                HighEVC_02_Volume_at_Measurement_Condition
            );
            const lowValueEVC_02_Volume_at_Measurement_Condition = parseFloat(
                LowEVC_02_Volume_at_Measurement_Condition
            );
            const ValueEVC_02_Volume_at_Measurement_Condition = parseFloat(
                EVC_02_Volume_at_Measurement_Condition
            );

            if (
                !isNaN(highValueEVC_02_Volume_at_Measurement_Condition) &&
                !isNaN(lowValueEVC_02_Volume_at_Measurement_Condition) &&
                !isNaN(ValueEVC_02_Volume_at_Measurement_Condition)
            ) {
                if (
                    highValueEVC_02_Volume_at_Measurement_Condition <=
                        ValueEVC_02_Volume_at_Measurement_Condition ||
                    ValueEVC_02_Volume_at_Measurement_Condition <=
                        lowValueEVC_02_Volume_at_Measurement_Condition
                ) {
                    if (!audioEVC_02_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Volume_at_Measurement_Condition(true);
                        setExceedThresholdEVC_02_Volume_at_Measurement_Condition(
                            true
                        );
                    }
                } else {
                    setAudioEVC_02_Volume_at_Measurement_Condition(false);
                    setExceedThresholdEVC_02_Volume_at_Measurement_Condition(
                        false
                    );
                }
            }
            // fetchData();
        }
    }, [
        HighEVC_02_Volume_at_Measurement_Condition,
        EVC_02_Volume_at_Measurement_Condition,
        audioEVC_02_Volume_at_Measurement_Condition,
        LowEVC_02_Volume_at_Measurement_Condition,
        maintainEVC_02_Volume_at_Measurement_Condition,
    ]);

    useEffect(() => {
        if (audioEVC_02_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC_02_Volume_at_Measurement_Condition]);

    //================================ EVC_01_Volume_at_Measurement_Condition FIQ 1901 ======================================================
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
            if (node.id === "PIT_6001A_DATA") {
                const roundedPT02 =
                    PIT_6001A !== null ? parseFloat(PIT_6001A).toFixed(2) : "";

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
                                        audioColorPIT_6001A &&
                                        !maintainPIT_6001A
                                            ? "#ff5656"
                                            : maintainPIT_6001A
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
                                        PIT 6001A :
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
            if (node.id === "PIT_6001B_DATA") {
                const roundedPT02 =
                    PIT_6001B !== null ? parseFloat(PIT_6001B).toFixed(2) : "";

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
                                        audioColorPIT_6001B &&
                                        !maintainPIT_6001B
                                            ? "#ff5656"
                                            : maintainPIT_6001B
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
                                        PIT 6001B :
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

            if (node.id === "PIT_6002A_DATA") {
                const roundedPT02 =
                    PIT_6002A !== null ? parseFloat(PIT_6002A).toFixed(2) : "";

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
                                        audioColorPIT_6002A &&
                                        !maintainPIT_6002A
                                            ? "#ff5656"
                                            : maintainPIT_6002A
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
                                        PIT 6002A :
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
            if (node.id === "PIT_6002B_DATA") {
                const roundedPT02 =
                    PIT_6002B !== null ? parseFloat(PIT_6002B).toFixed(2) : "";

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
                                        audioColorPIT_6002B &&
                                        !maintainPIT_6002B
                                            ? "#ff5656"
                                            : maintainPIT_6002B
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
                                        PIT 6002B :
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
                                        audioColorEVC_02_Pressure &&
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
                                    Bara
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
                                        audioColorEVC_01_Pressure &&
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
                                    Bara
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
                                        audioColorEVC_01_Temperature &&
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
                                        audioColorEVC_02_Temperature &&
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

            if (node.id === "PCV_6001A_DATA") {
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

            if (node.id === "PCV_6001B_DATA") {
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

            if (node.id === "PCV_6002A_DATA") {
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

            if (node.id === "PCV_6002B_DATA") {
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

            if (node.id === "SDV_6001A") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_6001A === "1"
                                        ? SVD_NO
                                        : SDV_6001A === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_6001B") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_6001B === "1"
                                        ? SVD_NO
                                        : SDV_6001B === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_6002") {
                return {
                    ...node,

                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {SDV_6002 === "1"
                                        ? SVD_NO
                                        : SDV_6002 === "0"
                                        ? SVD_NC
                                        : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "TIT_6001A_DATA") {
                const roundedPT02 =
                    TIT_6001A !== null ? parseFloat(TIT_6001A).toFixed(2) : "";

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
                                        audioColorTIT_6001A &&
                                        !maintainTIT_6001A
                                            ? "#ff5656"
                                            : maintainTIT_6001A
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
                                        TIT 6001A :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02} :
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

            if (node.id === "PIT_6003A_DATA") {
                const roundedPT02 =
                    PIT_6003A !== null ? parseFloat(PIT_6003A).toFixed(2) : "";

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
                                        audioColorPIT_6003A &&
                                        !maintainPIT_6003A
                                            ? "#ff5656"
                                            : maintainPIT_6003A
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
                                        PIT 6003A :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02} :
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

            if (node.id === "GD_6001") {
                const roundedPT02 =
                    GD_6001 !== null ? parseFloat(GD_6001).toFixed(2) : "";

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
                                        audioColorGD_6001 && !maintainGD_6001
                                            ? "#ff5656"
                                            : maintainGD_6001
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
                                        GD 6001 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02} :
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

            if (node.id === "PSV_6001A") {
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
                                    PSV 6001A :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PSV_6001A} 
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_6002A") {
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
                                    PSV 6002A :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PSV_6002A} 
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_6001B") {
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
                                    PSV 6001B :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001B} 
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PSV_6002B") {
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
                                    PSV 6002B :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PSV_6002B} 
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
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
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionPRU");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {

    const initialPositions = {
        Arrow10
        : 
        {x: -420.53375498677605, y: 1273.8256598751323},
        BallVavleLine2_Bottom
        : 
        {x: -1661.682672878477, y: 1481.0920733587484},
        BallVavleLine2_Bottom_none
        : 
        {x: -1650.5994566252746, y: 1097.5108416746705},
        BallVavleLine2_Top
        : 
        {x: -1664.44860296679, y: 1067.0182929442992},
        BallVavleLine2_Top_none
        : 
        {x: -1648.09187529084, y: 1512.8588877121745},
        BallVavleLine3_Bottom_none
        : 
        {x: -945.4386378616368, y: 1513.0768819977573},
        BallVavleLine3_Top_none
        : 
        {x: -945.2533633599176, y: 1098.9068673573584},
        BallVavle_Line3_Bottom
        : 
        {x: -958.9030596290709, y: 1482.17665624866},
        BallVavle_Line3_Top
        : 
        {x: -959.090980952997, y: 1068.376995289186},
        DownArrow
        : 
        {x: -2440.1778265025932, y: 1638.6301381134936},
        EVC_01_Flow_at_Base_Condition
        : 
        {x: -944.7566756597366, y: 877.4187744710375},
        EVC_01_Flow_at_Measurement_Condition
        : 
        {x: -944.8390916088076, y: 925.5955178129639},
        EVC_01_Pressure_COL
        : 
        {x: -1422.6213132405162, y: 1463.468095326561},
        EVC_01_Pressure_DATA
        : 
        {x: -1565.8256783115937, y: 1148.9827037803145},
        EVC_01_Pressure_IMG
        : 
        {x: -1455.2210748964526, y: 1400.4111483146833},
        EVC_01_Pressure_NONE
        : 
        {x: -1424.2458626037571, y: 1021.7335838041611},
        EVC_01_Temperature
        : 
        {x: -1384.3876204395422, y: 1377.3823609961598},
        EVC_01_Temperature_COL
        : 
        {x: -1360.9590194746786, y: 1427.2945127887838},
        EVC_01_Temperature_DATA
        : 
        {x: -1736.2102870765705, y: 815.4661864731523},
        EVC_01_Temperature_NONE
        : 
        {x: -1362.8266325377226, y: 977.2539852046791},
        EVC_01_Volume_at_Base_Condition
        : 
        {x: -703.8315004521368, y: 877.542107815135},
        EVC_01_Volume_at_Measurement_Condition
        : 
        {x: -704.133309317585, y: 925.6995906874301},
        EVC_02_Flow_at_Base_Condition
        : 
        {x: -932.8685029333565, y: 1611.5650097972457},
        EVC_02_Flow_at_Measurement_Condition
        : 
        {x: -932.8603748341441, y: 1659.619138394843},
        EVC_02_Pressure_COL
        : 
        {x: -1425.0343776799361, y: 1050.2965580409796},
        EVC_02_Pressure_DATA
        : 
        {x: -1563.2499315232963, y: 1587.1147367905612},
        EVC_02_Pressure_IMG
        : 
        {x: -1457.3119231476958, y: 987.4972191813588},
        EVC_02_Pressure_NONE
        : 
        {x: -1422.6407988495287, y: 1424.3535206118927},
        EVC_02_Temperature
        : 
        {x: -1385.8650633329748, y: 960.1049085729308},
        EVC_02_Temperature_COL
        : 
        {x: -1362.8971911342087, y: 1007.3441734368228},
        EVC_02_Temperature_DATA
        : 
        {x: -1727.0419105701028, y: 1232.4793100005968},
        EVC_02_Temperature_NONE
        : 
        {x: -1361.3563019384721, y: 1396.8762550311894},
        EVC_02_Volume_at_Base_Condition
        : 
        {x: -691.7043842569694, y: 1611.7575715748744},
        EVC_02_Volume_at_Measurement_Condition
        : 
        {x: -691.7597706423713, y: 1659.6681974922926},
        FIQ_6001A
        : 
        {x: -1122.9979525971376, y: 1090.3467963356752},
        FIQ_6001B
        : 
        {x: -1127.9442365313425, y: 1503.338633373814},
        GD_6001
        : 
        {x: -1177.1116094437443, y: 1176.7839153333475},
        GD_IMG
        : 
        {x: -1096.8954721391294, y: 1232.7407461451007},
        Header
        : 
        {x: -2347.783064181821, y: 737.4556589669556},
        PCV_6001A
        : 
        {x: -1590.143839770737, y: 1466.187406343237},
        PCV_6001A_DATA
        : 
        {x: -2119.0752064067256, y: 965.1236193186844},
        PCV_6001A_SmallBallVavle
        : 
        {x: -1483.6177892854255, y: 1469.3848130414924},
        PCV_6001A_none
        : 
        {x: -1472.3253266041704, y: 1520.498001843855},
        PCV_6001A_none2
        : 
        {x: -1560.2798867415365, y: 1482.2617504326024},
        PCV_6001B
        : 
        {x: -1589.6280768037607, y: 1051.7950507090916},
        PCV_6001B_DATA
        : 
        {x: -2123.2870218126836, y: 1379.6541893713072},
        PCV_6001B_SmallBallVavle
        : 
        {x: -1486.9036877800625, y: 1056.0055835082862},
        PCV_6001B_none
        : 
        {x: -1559.0670889230703, y: 1066.5206445548827},
        PCV_6001B_none2
        : 
        {x: -1475.720019744693, y: 1104.4215156026714},
        PCV_6002A_DATA
        : 
        {x: -1648.4407513108924, y: 980.9864265861706},
        PCV_6002B_DATA
        : 
        {x: -1650.4202186554123, y: 1389.6028607942028},
        PCV_line1_Bottom
        : 
        {x: -2059.46440478068, y: 1051.690596866844},
        PCV_line1_Bottom_SmallBallVavle
        : 
        {x: -1959.916081354473, y: 1469.1895625081877},
        PCV_line1_Bottom_none
        : 
        {x: -2033.416081354473, y: 1480.8357187400395},
        PCV_line1_Bottom_none2
        : 
        {x: -1948.4145711922317, y: 1518.503878770942},
        PCV_line1_Top
        : 
        {x: -2063.2209588415735, y: 1465.9672706188694},
        PCV_line1_Top_SmallBallVavle
        : 
        {x: -1955.363015032123, y: 1056.514175669431},
        PCV_line1_Top_none
        : 
        {x: -2029.3085400395037, y: 1067.755196238937},
        PCV_line1_Top_none2
        : 
        {x: -1943.863015032123, y: 1106.014175669431},
        PIT_6001A_COL
        : 
        {x: -2194.366805384612, y: 1463.874739139494},
        PIT_6001A_DATA
        : 
        {x: -2323.884062940713, y: 1148.6083704185041},
        PIT_6001A_IMG
        : 
        {x: -2226.866805384612, y: 1400.374739139494},
        PIT_6001A_NONE
        : 
        {x: -2197.8690826568136, y: 1007.3191633358758},
        PIT_6001B_COL
        : 
        {x: -2197.6600827175034, y: 1050.3588175915195},
        PIT_6001B_DATA
        : 
        {x: -2326.9359251148935, y: 1585.7692501253557},
        PIT_6001B_IMG
        : 
        {x: -2230.624481311542, y: 986.990895895738},
        PIT_6001B_NONE
        : 
        {x: -2193.7144666730205, y: 1424.0282015242046},
        PIT_6002A_COL
        : 
        {x: -1866.4577639723273, y: 1462.4297119508683},
        PIT_6002A_DATA
        : 
        {x: -1995.729893153021, y: 1149.2252195340056},
        PIT_6002A_IMG
        : 
        {x: -1898.7568597618636, y: 1399.3826957761635},
        PIT_6002A_NONE
        : 
        {x: -1865.795938216313, y: 1009.610885120657},
        PIT_6002B_COL
        : 
        {x: -1866.073792487846, y: 1050.0079742479018},
        PIT_6002B_DATA
        : 
        {x: -1993.699445139633, y: 1586.4921741314997},
        PIT_6002B_IMG
        : 
        {x: -1898.5737924878463, y: 986.4938130080379},
        PIT_6002B_NONE
        : 
        {x: -1866.220994341128, y: 1425.5940219176825},
        PIT_6003A
        : 
        {x: -677.4292044121116, y: 1187.0328164243124},
        PIT_6003A_COL
        : 
        {x: -644.6785970997771, y: 1250.0518497796409},
        PIT_6003A_DATA
        : 
        {x: -753.9048631752663, y: 1096.5943426448448},
        PIT_6003A_NONE
        : 
        {x: -644.1057092574567, y: 1220.861473990371},
        PSV_6001A
        : 
        {x: -1844.6249877968003, y: 904.7518340240545},
        PSV_6001B
        : 
        {x: -1851.8971023103254, y: 1316.7167432666458},
        PSV_6002A
        : 
        {x: -1307.7176662681832, y: 894.499205487562},
        PSV_6002B
        : 
        {x: -1307.7176662681832, y: 1311.4439993566057},
        PSV_LINE2_BOTTOM
        : 
        {x: -1740.5499935425808, y: 1021.4152979362718},
        PSV_LINE2_BOTTOM_HALFCIRCLE
        : 
        {x: -1266.1474092778985, y: 943.9517620367403},
        PSV_LINE2_BOTTOM_NONE
        : 
        {x: -1718.3515671112975, y: 1070.542505015602},
        PSV_LINE2_BOTTOM_NONE1
        : 
        {x: -1741.7830527009469, y: 1432.6252337777432},
        PSV_LINE2_BOTTOM_NONE2
        : 
        {x: -1742.6123310219864, y: 1377.8993730119664},
        PSV_LINE2_BOTTOM_RIGHT
        : 
        {x: -1760.0864447641275, y: 1002.261090283854},
        PSV_LINE2_TOP
        : 
        {x: -1741.762582600041, y: 1428.90071831721},
        PSV_LINE2_TOP_HALFCIRCLE
        : 
        {x: -1763.0861113674155, y: 950.1586579328373},
        PSV_LINE2_TOP_NONE
        : 
        {x: -1719.609015298378, y: 1478.4738962378},
        PSV_LINE2_TOP_NONE1
        : 
        {x: -1741.292471045089, y: 1024.6454245613245},
        PSV_LINE2_TOP_NONE2
        : 
        {x: -1739.6279244378063, y: 970.6923874449885},
        PSV_LINE2_TOP_RIGHT
        : 
        {x: -1760.932470452269, y: 1409.788926569184},
        PSV_LINE3_BOTTOM
        : 
        {x: -1241.9662551779466, y: 1017.2912953863099},
        PSV_LINE3_BOTTOM_HALFCIRCLE
        : 
        {x: -1766.2849260256212, y: 1357.309168723579},
        PSV_LINE3_BOTTOM_NONE
        : 
        {x: -1212.1740869021496, y: 1482.673575129763},
        PSV_LINE3_BOTTOM_NONE1
        : 
        {x: -1234.6943213706072, y: 1436.0560745736848},
        PSV_LINE3_BOTTOM_NONE2
        : 
        {x: -1235.6368665307696, y: 1382.4374704915526},
        PSV_LINE3_BOTTOM_RIGHT
        : 
        {x: -1261.8081518592426, y: 997.532009870901},
        PSV_LINE3_TOP
        : 
        {x: -1235.1897637926832, y: 1433.6788607117933},
        PSV_LINE3_TOP_HALFCIRCLE
        : 
        {x: -1260.1083626642362, y: 1361.3375074809244},
        PSV_LINE3_TOP_NONE
        : 
        {x: -1219.9913727940623, y: 1066.3862945267433},
        PSV_LINE3_TOP_NONE1
        : 
        {x: -1243.1459580683222, y: 1020.1249803904852},
        PSV_LINE3_TOP_NONE2
        : 
        {x: -1242.4987054998287, y: 963.723626602304},
        PSV_LINE3_TOP_RIGHT
        : 
        {x: -1254.4104579359896, y: 1415.3142896015559},
        SDV_6001A
        : 
        {x: -2367.264096852104, y: 1047.9003450623102},
        SDV_6001A_Name
        : 
        {x: -2400.231075578696, y: 1016.8765739089936},
        SDV_6001B
        : 
        {x: -2347.936922940682, y: 1461.553943767321},
        SDV_6001B_Name
        : 
        {x: -2380.436922940682, y: 1431.1155032793695},
        SDV_6002
        : 
        {x: -537.8948179752053, y: 1248.296378511269},
        SDV_6002_Name
        : 
        {x: -572.9903026817977, y: 1204.827087824066},
        TIT_6001A
        : 
        {x: -807.709256349765, y: 1163.28491796364},
        TIT_6001A_COL
        : 
        {x: -783.8221358118526, y: 1210.6610114128175},
        TIT_6001A_DATA
        : 
        {x: -893.4738263346659, y: 1014.9710461373154},
        TIT_6001A_NONE
        : 
        {x: -783.5454425110814, y: 1188.130946016786},
        bor1
        : 
        {x: -2436.5855686504956, y: 1039.1608637258034},
        bor2
        : 
        {x: -983.1512218888312, y: 1025.8994423073616},
        bor3
        : 
        {x: -2320.8078213113167, y: 1680.894788044694},
        bor4
        : 
        {x: -950.4329469573597, y: 1583.0590100592938},
        borderWhite
        : 
        {x: -2419.4989026325693, y: 730.797467783713},
        line1
        : 
        {x: -2407.3097089925586, y: 1684.7936897594798},
        line2
        : 
        {x: -2407.550402509801, y: 1663.500870252391},
        line3
        : 
        {x: -2030.8329144167883, y: 1098.5296705520232},
        line4
        : 
        {x: -2033.455135048047, y: 1512.635009158724},
        line5
        : 
        {x: -1559.5270533882806, y: 1098.3740496757796},
        line6
        : 
        {x: -1559.7769633031824, y: 1512.7897157412472},
        line7
        : 
        {x: -1036.0060026105384, y: 1098.3096365331119},
        line8
        : 
        {x: -1037.0272391551282, y: 1512.874739139494},
        line9
        : 
        {x: -661.0207270322528, y: 1298.5866709113047},
        line9none
        : 
        {x: -713.1893118583799, y: 1298.7824600879364},
        line10
        : 
        {x: -449.9501828459661, y: 1298.5866709113047},
        line10none
        : 
        {x: -405.6683476271253, y: 1298.7587875755169},
        timeUpdate3
        : 
        {x: -2387.450182845966, y: 800.0866709113047},

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
                                CNG PHU MY 3
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

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_6001A",
            position: positions.PSV_6001A,
            type: "custom",
            data: {
                label: <div>1A</div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_6001B",
            position: positions.PSV_6001B,
            type: "custom",
            data: {
                label: <div>1B</div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_6002A",
            position: positions.PSV_6002A,
            type: "custom",
            data: {
                label: <div>2A</div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },
        {
            id: "PSV_6002B",
            position: positions.PSV_6002B,
            type: "custom",
            data: {
                label: <div>2B</div>,
            },

            style: {
                border: background,
                width: 200,
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
            id: "FIQ_6001A",
            position: positions.FIQ_6001A,
            type: "custom",
            data: {
                label: <div>FIQ 6001A</div>,
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
            id: "FIQ_6001B",
            position: positions.FIQ_6001B,
            type: "custom",
            data: {
                label: <div>FIQ_6001B</div>,
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
            id: "GD_6001",
            position: positions.GD_6001,
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
            id: "PCV_6001A",
            position: positions.PCV_6001A,
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
            id: "PCV_6001B",
            position: positions.PCV_6001B,
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
            id: "PCV_6001B_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_6001B_none,

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
            id: "PCV_6001A_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_6001A_none,

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
            id: "PCV_6001B_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_6001B_none2,

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
            id: "PCV_6001A_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_6001A_none2,

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
            id: "PCV_6001A_SmallBallVavle",
            position: positions.PCV_6001A_SmallBallVavle,
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
            id: "PCV_6001B_SmallBallVavle",
            position: positions.PCV_6001B_SmallBallVavle,
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
            id: "PCV_6001A_DATA",
            position: positions.PCV_6001A_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_6001B_DATA",
            position: positions.PCV_6001B_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_6002A_DATA",
            position: positions.PCV_6002A_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 200,
                height: 45,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            zIndex: 999999,
        },

        {
            id: "PCV_6002B_DATA",
            position: positions.PCV_6002B_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 200,
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
            id: "PIT_6001A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6001A_IMG,
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
            id: "PIT_6001B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6001B_IMG,
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
            id: "PIT_6002A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6002A_IMG,
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
            id: "PIT_6002B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6002B_IMG,
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
            id: "EVC_01_Pressure_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.EVC_01_Pressure_IMG,
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
            id: "EVC_02_Pressure_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.EVC_02_Pressure_IMG,
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
            id: "PIT_6001A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001A_COL,
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
            id: "PIT_6001B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001B_COL,
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
            id: "PIT_6002A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002A_COL,
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
            id: "PIT_6002B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002B_COL,
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
            id: "PIT_6001A_DATA",
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
            position: positions.PIT_6001A_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6001B_DATA",
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
            position: positions.PIT_6001B_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6002A_DATA",
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
            position: positions.PIT_6002A_DATA,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6002B_DATA",
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
            position: positions.PIT_6002B_DATA,

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
            id: "PIT_6001A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001A_NONE,
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
            id: "PIT_6001B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001B_NONE,
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
            id: "PIT_6002A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002A_NONE,
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
            id: "PIT_6002B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002B_NONE,
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
            id: "SDV_6001A",
            position: positions.SDV_6001A,
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
            id: "SDV_6001B",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_6001B
                    </div>
                ),
            },
            position: positions.SDV_6001B,

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
            id: "SDV_6002",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        SDV_6002
                    </div>
                ),
            },
            position: positions.SDV_6002,

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
            id: "SDV_6001A_Name",
            position: positions.SDV_6001A_Name,
            type: "custom",
            data: {
                label: <div>SDV-6001A</div>,
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
            id: "SDV_6001B_Name",
            position: positions.SDV_6001B_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-6001B
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
            id: "SDV_6002_Name",
            position: positions.SDV_6002_Name,

            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        SDV-6002
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
            id: "TIT_6001A_COL",
            position: positions.TIT_6001A_COL,
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
            id: "TIT_6001A_DATA",
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
            position: positions.TIT_6001A_DATA,

            style: {
                border: background,
                width: 240,
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
        },
        {
            id: "TIT_6001A",
            position: positions.TIT_6001A,
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
            id: "TIT_6001A_NONE",
            position: positions.TIT_6001A_NONE,
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
            id: "PIT_6003A_COL",
            position: positions.PIT_6003A_COL,
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
            id: "PIT_6003A_DATA",
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
            position: positions.PIT_6003A_DATA,

            style: {
                border: background,
                width: 240,
                background: borderBox,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6003A",
            position: positions.PIT_6003A,
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
            id: "PIT_6003A_NONE",
            position: positions.PIT_6003A_NONE,
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
    //             if (id === "bor1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     bor1: position,
    //                 }));
    //             } else if (id === "bor2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     bor2: position,
    //                 }));
    //             } else if (id === "bor3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     bor3: position,
    //                 }));
    //             } else if (id === "bor4") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     bor4: position,
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
    //             } else if (id === "Arrow10") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Arrow10: position,
    //                 }));
    //             } else if (id === "GD_6001") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_6001: position,
    //                 }));
    //             } else if (id === "GD_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_IMG: position,
    //                 }));
    //             }

    //             //======================= BallVavle 2 ====================================
    //             else if (id === "BallVavleLine2_Top") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine2_Top: position,
    //                 }));
    //             } else if (id === "BallVavleLine2_Bottom") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine2_Bottom: position,
    //                 }));
    //             } else if (id === "BallVavleLine2_Top_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine2_Top_none: position,
    //                 }));
    //             } else if (id === "BallVavleLine2_Bottom_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine2_Bottom_none: position,
    //                 }));
    //             }

    //             //======================= BallVavle 3 ====================================
    //             else if (id === "BallVavle_Line3_Top") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavle_Line3_Top: position,
    //                 }));
    //             } else if (id === "BallVavle_Line3_Bottom") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavle_Line3_Bottom: position,
    //                 }));
    //             } else if (id === "BallVavleLine3_Top_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine3_Top_none: position,
    //                 }));
    //             } else if (id === "BallVavleLine3_Bottom_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallVavleLine3_Bottom_none: position,
    //                 }));
    //             }

    //             //======================= BallVavle ====================================
    //             else if (id === "PCV_6001A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001A: position,
    //                 }));
    //             } else if (id === "PCV_6001B") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001B: position,
    //                 }));
    //             } else if (id === "PCV_line1_Top") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Top: position,
    //                 }));
    //             } else if (id === "PCV_line1_Bottom") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Bottom: position,
    //                 }));
    //             } else if (id === "PCV_line1_Bottom_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Bottom_none: position,
    //                 }));
    //             } else if (id === "PCV_line1_Top_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Top_none: position,
    //                 }));
    //             } else if (id === "PCV_6001B_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001B_none: position,
    //                 }));
    //             } else if (id === "PCV_6001A_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001A_none: position,
    //                 }));
    //             } else if (id === "PCV_line1_Bottom_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Bottom_none2: position,
    //                 }));
    //             } else if (id === "PCV_line1_Top_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Top_none2: position,
    //                 }));
    //             } else if (id === "PCV_6001B_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001B_none2: position,
    //                 }));
    //             } else if (id === "PCV_6001A_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001A_none2: position,
    //                 }));
    //             } else if (id === "PCV_line1_Bottom_SmallBallVavle") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Bottom_SmallBallVavle: position,
    //                 }));
    //             } else if (id === "PCV_6001B_SmallBallVavle") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001B_SmallBallVavle: position,
    //                 }));
    //             } else if (id === "PCV_6001A_SmallBallVavle") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001A_SmallBallVavle: position,
    //                 }));
    //             } else if (id === "PCV_line1_Top_SmallBallVavle") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_line1_Top_SmallBallVavle: position,
    //                 }));
    //             } else if (id === "PCV_6001A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001A_DATA: position,
    //                 }));
    //             } else if (id === "PCV_6002A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6002A_DATA: position,
    //                 }));
    //             } else if (id === "PCV_6001B_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6001B_DATA: position,
    //                 }));
    //             } else if (id === "PCV_6002B_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_6002B_DATA: position,
    //                 }));
    //             }
    //             //======================= BallVavle ====================================
    //             else if (id === "PIT_6002A_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002A_IMG: position,
    //                 }));
    //             } else if (id === "PIT_6002B_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002B_IMG: position,
    //                 }));
    //             } else if (id === "PIT_6001A_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001A_IMG: position,
    //                 }));
    //             } else if (id === "PIT_6001B_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001B_IMG: position,
    //                 }));
    //             } else if (id === "EVC_01_Pressure_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Pressure_IMG: position,
    //                 }));
    //             } else if (id === "EVC_02_Pressure_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Pressure_IMG: position,
    //                 }));
    //             } else if (id === "EVC_01_Pressure_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Pressure_COL: position,
    //                 }));
    //             } else if (id === "EVC_02_Pressure_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Pressure_COL: position,
    //                 }));
    //             } else if (id === "PIT_6002A_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002A_COL: position,
    //                 }));
    //             } else if (id === "PIT_6002B_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002B_COL: position,
    //                 }));
    //             } else if (id === "PIT_6001A_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001A_COL: position,
    //                 }));
    //             } else if (id === "PIT_6001B_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001B_COL: position,
    //                 }));
    //             } else if (id === "PIT_6001A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001A_DATA: position,
    //                 }));
    //             } else if (id === "PIT_6001B_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001B_DATA: position,
    //                 }));
    //             } else if (id === "PIT_6002A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002A_DATA: position,
    //                 }));
    //             } else if (id === "PIT_6002B_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002B_DATA: position,
    //                 }));
    //             } else if (id === "EVC_01_Pressure_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Pressure_DATA: position,
    //                 }));
    //             } else if (id === "EVC_02_Pressure_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Pressure_DATA: position,
    //                 }));
    //             } else if (id === "PIT_6001A_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001A_NONE: position,
    //                 }));
    //             } else if (id === "PIT_6001B_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6001B_NONE: position,
    //                 }));
    //             } else if (id === "PIT_6002A_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002A_NONE: position,
    //                 }));
    //             } else if (id === "PIT_6002B_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6002B_NONE: position,
    //                 }));
    //             } else if (id === "EVC_01_Pressure_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Pressure_NONE: position,
    //                 }));
    //             } else if (id === "EVC_02_Pressure_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Pressure_NONE: position,
    //                 }));
    //             }

    //             //======================= BallVavle ====================================
    //             else if (id === "EVC_01_Temperature") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Temperature: position,
    //                 }));
    //             } else if (id === "EVC_02_Temperature") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Temperature: position,
    //                 }));
    //             } else if (id === "EVC_01_Temperature_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Temperature_COL: position,
    //                 }));
    //             } else if (id === "EVC_02_Temperature_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Temperature_COL: position,
    //                 }));
    //             } else if (id === "EVC_01_Temperature_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Temperature_DATA: position,
    //                 }));
    //             } else if (id === "EVC_02_Temperature_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Temperature_DATA: position,
    //                 }));
    //             } else if (id === "EVC_01_Temperature_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Temperature_NONE: position,
    //                 }));
    //             } else if (id === "EVC_02_Temperature_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Temperature_NONE: position,
    //                 }));
    //             }

    //             // ========================= PSV LINE 2  ===============================
    //             else if (id === "PSV_LINE2_TOP_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP_NONE: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM_NONE: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_TOP") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_TOP_RIGHT") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP_RIGHT: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM_RIGHT") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM_RIGHT: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM_HALFCIRCLE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM_HALFCIRCLE: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_TOP_HALFCIRCLE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP_HALFCIRCLE: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_TOP_NONE1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP_NONE1: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_TOP_NONE2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_TOP_NONE2: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM_NONE1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM_NONE1: position,
    //                 }));
    //             } else if (id === "PSV_LINE2_BOTTOM_NONE2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE2_BOTTOM_NONE2: position,
    //                 }));
    //             }

    //             // ========================= PSV LINE 2  ===============================
    //             else if (id === "PSV_LINE3_TOP_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP_NONE: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM_NONE: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_TOP") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_TOP_RIGHT") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP_RIGHT: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM_RIGHT") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM_RIGHT: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_TOP_NONE1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP_NONE1: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_TOP_NONE2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP_NONE2: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM_NONE1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM_NONE1: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM_NONE2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM_NONE2: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_BOTTOM_HALFCIRCLE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_BOTTOM_HALFCIRCLE: position,
    //                 }));
    //             } else if (id === "PSV_LINE3_TOP_HALFCIRCLE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_LINE3_TOP_HALFCIRCLE: position,
    //                 }));
    //             }
    //             // ========================= Data  ===============================
    //             else if (id === "SDV_6001A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6001A: position,
    //                 }));
    //             } else if (id === "SDV_6001B") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6001B: position,
    //                 }));
    //             } else if (id === "SDV_6002") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6002: position,
    //                 }));
    //             } else if (id === "SDV_6001A_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6001A_Name: position,
    //                 }));
    //             } else if (id === "SDV_6001B_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6001B_Name: position,
    //                 }));
    //             } else if (id === "SDV_6002_Name") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_6002_Name: position,
    //                 }));
    //             }
    //             //========================== pit line 1 =========================
    //             else if (id === "TIT_6001A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TIT_6001A: position,
    //                 }));
    //             } else if (id === "TIT_6001A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TIT_6001A_DATA: position,
    //                 }));
    //             } else if (id === "TIT_6001A_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TIT_6001A_COL: position,
    //                 }));
    //             } else if (id === "TIT_6001A_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     TIT_6001A_NONE: position,
    //                 }));
    //             }
    //             //========================== pit line 1 =========================
    //             else if (id === "PIT_6003A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6003A: position,
    //                 }));
    //             } else if (id === "PIT_6003A_DATA") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6003A_DATA: position,
    //                 }));
    //             } else if (id === "PIT_6003A_COL") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6003A_COL: position,
    //                 }));
    //             } else if (id === "PIT_6003A_NONE") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PIT_6003A_NONE: position,
    //                 }));
    //             } else if (id === "EVC_01_Volume_at_Measurement_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Volume_at_Measurement_Condition: position,
    //                 }));
    //             } else if (id === "EVC_01_Volume_at_Base_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Volume_at_Base_Condition: position,
    //                 }));
    //             } else if (id === "EVC_01_Flow_at_Measurement_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Flow_at_Measurement_Condition: position,
    //                 }));
    //             } else if (id === "EVC_01_Flow_at_Base_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_01_Flow_at_Base_Condition: position,
    //                 }));
    //             } else if (id === "EVC_02_Flow_at_Base_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Flow_at_Base_Condition: position,
    //                 }));
    //             } else if (id === "EVC_02_Flow_at_Measurement_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Flow_at_Measurement_Condition: position,
    //                 }));
    //             } else if (id === "EVC_02_Volume_at_Base_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Volume_at_Base_Condition: position,
    //                 }));
    //             } else if (id === "EVC_02_Volume_at_Measurement_Condition") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     EVC_02_Volume_at_Measurement_Condition: position,
    //                 }));
    //             } else if (id === "FIQ_6001A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_6001A: position,
    //                 }));
    //             } else if (id === "FIQ_6001B") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_6001B: position,
    //                 }));
    //             } else if (id === "PSV_6001A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_6001A: position,
    //                 }));
    //             } else if (id === "PSV_6001B") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_6001B: position,
    //                 }));
    //             } else if (id === "PSV_6002A") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_6002A: position,
    //                 }));
    //             } else if (id === "PSV_6002B") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_6002B: position,
    //                 }));
    //             }

    //             // =====================================================
    //             else if (id === "borderWhite") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     borderWhite: position,
    //                 }));
    //             } else if (id === "timeUpdate3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate3: position,
    //                 }));
    //             } else if (id === "Header") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Header: position,
    //                 }));
    //             } else if (id === "DownArrow") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     DownArrow: position,
    //                 }));
    //             }  else if (id === "line9none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line9none: position,
    //                 }));
    //             } else if (id === "line10none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line10none: position,
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
