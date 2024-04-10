import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./demoFlowOTS.css";

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
//import tingting from "./NotificationCuu.mp3";

import {
    ArrowRight,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    GD,
    PTV,
    SDV,
    SVD_NC,
    SVD_NO,
    VavleWay,
    WhiteTriangleRight,
    tankGas,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { httpApi } from "@/api/http.api";
import BallVavlePSV from "../ReactFlow/BallVavlePSV";
import { InputText } from "primereact/inputtext";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";
const backGroundData = "white";
const colorNameValue = "black";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ffaa00";

export default function GraphicFlow() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [visible, setVisible] = useState(false);

    const [dataApi, setDataApi] = useState<any>([]);
    console.log("dataApi: ", dataApi);

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

    const [HighPT02, setHighPT02] = useState<number | null>(null);
    const [LowPT02, setLowPT02] = useState<number | null>(null);
    const [HighInputPT02, setHighInputPT02] = useState<any>();
    const [LowInputPT02, setLowInputPT02] = useState<any>();

    const [HighPT03, setHighPT03] = useState<number | null>(null);
    const [LowPT03, setLowPT03] = useState<number | null>(null);
    const [HighInputPT03, setHighInputPT03] = useState<any>();
    const [LowInputPT03, setLowInputPT03] = useState<any>();

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [exceedThreshold03, setExceedThreshold03] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const op = useRef<OverlayPanel>(null);

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
                        EK1_Flow_at_Measurement_Conditions: setGVF1,
                        EK1_Flow_at_Base_Conditions: setSVF1,
                        EK1_Volume_at_Base_Conditions: setSVA1,
                        EK1_Vm_Adjustable_Counter: setGVA1,
                        EK1_Pressure: setPT02,

                        EK2_Flow_at_Measurement_Conditions: setGVF2,
                        EK2_Flow_at_Base_Conditions: setSVF2,
                        EK2_Volume_at_Base_Conditions: setSVA2,
                        EK2_Vm_Adjustable_Counter: setGVA2,
                        EK2_Pressure: setPT03,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT01,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

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
            };
        }
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await httpApi.get(
                    "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/values/attributes/SERVER_SCOPE"
                );
                //================================ PT02 ===================================================
                const highPT02 = res.data.find(
                    (item: any) => item.key === "High_EK1_Pressure"
                );
                setHighPT02(highPT02?.value || null);
                const LowPT02 = res.data.find(
                    (item: any) => item.key === "Low_EK1_Pressure"
                );
                setLowPT02(LowPT02?.value || null);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (
            typeof HighPT02 === "string" &&
            typeof LowPT02 === "string" &&
            PT02 !== null
        ) {
            const highValue02 = parseFloat(HighPT02);
            const lowValue02 = parseFloat(LowPT02);
            const PT02Value = parseFloat(PT02);

            if (
                !isNaN(highValue02) &&
                !isNaN(lowValue02) &&
                !isNaN(PT02Value)
            ) {
                if (highValue02 < PT02Value || PT02Value < lowValue02) {
                    if (!audioPlaying) {
                        audioRef.current?.play();
                        setAudioPlaying(true);
                        setExceedThreshold(true);
                    }
                } else {
                    setAudioPlaying(false);
                    setExceedThreshold(false);
                }
            }
        }
    }, [LowPT02, HighPT02, PT02, audioPlaying]);

    useEffect(() => {
        if (audioPlaying) {
            const audioEnded = () => {
                setAudioPlaying(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPlaying]);

    const handleHighPT02 = (event: any) => {
        const newValue = event.target.value;
        setHighInputPT02(newValue);
    };

    const handleLowPT02 = (event: any) => {
        const newValue2 = event.target.value;
        setLowInputPT02(newValue2);
    };

    const handleButtonToggle = (e: React.MouseEvent) => {
        op.current?.toggle(e);
        setHighInputPT02(HighPT02);
        setLowInputPT02(LowPT02);
    };

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                {
                    High_EK1_Pressure: HighInputPT02,
                    Low_EK1_Pressure: LowInputPT02,
                }
            );

            setHighPT02(HighInputPT02);
            setLowPT02(LowInputPT02);

            op.current?.hide();
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
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
    function formatNumberWithCommas(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    function formatNumberWithCommas1(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
                let decimalSVF1: string | number = "";

                if (SVF1 !== null) {
                    const SVF1Number = parseFloat(SVF1);
                    if (!isNaN(SVF1Number)) {
                        decimalSVF1 = formatNumberWithCommas(SVF1Number);
                    } else {
                        decimalSVF1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalSVF1}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data3") {
                let decimalGVF1: string | number = "";

                if (GVF1 !== null) {
                    const SVA1Number = parseFloat(GVF1);
                    if (!isNaN(SVA1Number)) {
                        decimalGVF1 = formatNumberWithCommas(SVA1Number);
                    } else {
                        decimalGVF1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalGVF1}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
                let decimalSVA1: string | number = "";

                if (SVA1 !== null) {
                    const SVA1Number = parseFloat(SVA1);
                    if (!isNaN(SVA1Number)) {
                        decimalSVA1 = formatNumberWithCommas(SVA1Number);
                    } else {
                        decimalSVA1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalSVA1}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
                let decimalGVA1: string | number = "";

                if (GVA1 !== null) {
                    const GVA1Number = parseFloat(GVA1);
                    if (!isNaN(GVA1Number)) {
                        decimalGVA1 = formatNumberWithCommas1(GVA1Number);
                    } else {
                        decimalGVA1 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalGVA1}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
                let decimalSVF2: string | number = "";

                if (SVF2 !== null) {
                    const SVF2Number = parseFloat(SVF2);
                    if (!isNaN(SVF2Number)) {
                        decimalSVF2 = formatNumberWithCommas(SVF2Number);
                    } else {
                        decimalSVF2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalSVF2}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data6") {
                let decimalGVF2: string | number = "";

                if (GVF2 !== null) {
                    const GVF2Number = parseFloat(GVF2);
                    if (!isNaN(GVF2Number)) {
                        decimalGVF2 = formatNumberWithCommas(GVF2Number);
                    } else {
                        decimalGVF2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalGVF2}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
                let decimalSVA2: string | number = "";

                if (SVA2 !== null) {
                    const SVA2Number = parseFloat(SVA2);
                    if (!isNaN(SVA2Number)) {
                        decimalSVA2 = formatNumberWithCommas(SVA2Number);
                    } else {
                        decimalSVA2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalSVA2}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
                let decimalGVA2: string | number = "";

                if (GVA2 !== null) {
                    const GVA2Number = parseFloat(GVA2);
                    if (!isNaN(GVA2Number)) {
                        decimalGVA2 = formatNumberWithCommas(GVA2Number);
                    } else {
                        decimalGVA2 = "";
                    }
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {decimalGVA2}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans01") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.PT} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {PT01}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans02") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: exceedThreshold
                                        ? "red"
                                        : "transparent",
                                }}
                                onClick={handleButtonToggle}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.PT} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {PT02}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 27,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: line }}>
                                        {ValueGas.PT} :
                                    </p>
                                    <p
                                        style={{
                                            color: backGroundData,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {PT03}
                                    </p>
                                </div>
                                <p style={{ color: backGroundData }}>
                                    {KeyGas.BAR}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "timeUpdate") {
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
                                <p style={{ color: "white" }}>Status EK1 : </p>

                                <div style={{}}>
                                    {checkConnectData ? (
                                        <div
                                            style={{
                                                fontWeight: 500,

                                                display: "flex",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                fontWeight: 500,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p
                                    style={{
                                        color: "white",

                                        marginLeft: 15,
                                    }}
                                >
                                    {timeUpdate}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "timeUpdate2") {
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
                                <p style={{ color: "white" }}>Status EK2 : </p>

                                <div style={{}}>
                                    {checkConnectData ? (
                                        <div
                                            style={{
                                                fontWeight: 500,

                                                display: "flex",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                fontWeight: 500,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p
                                    style={{
                                        color: "white",

                                        display: "flex",
                                        marginLeft: 15,
                                    }}
                                >
                                    {timeUpdate}
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
                                    fontSize: 20,
                                    fontWeight: 500,

                                    display: "flex",
                                }}
                            >
                                <p style={{ color: "white" }}>Status PLC : </p>

                                <div style={{}}>
                                    {checkConnectData ? (
                                        <div
                                            style={{
                                                fontWeight: 500,

                                                display: "flex",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "#25d125",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Connected
                                            </p>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                fontWeight: 500,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "white",
                                                    marginLeft: 15,
                                                }}
                                            >
                                                Disconnect
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p
                                    style={{
                                        color: "white",

                                        fontSize: 20,
                                        marginLeft: 15,
                                    }}
                                >
                                    {timeUpdate}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            //  =============================== GD ===================================

            if (node.id === "GD1_Value1901") {
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
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: backGroundData }}>
                                        {GD1} LEL
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
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
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: backGroundData }}>
                                        {GD2} LEL
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD3_Value1903") {
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
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: backGroundData }}>
                                        {GD3} LEL
                                    </p>
                                </div>
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
                                {NO === "1" && <div>{SVD_NO}</div>}
                                {NC === "1" && <div>{SVD_NC}</div>}
                                {NC === "0" && NO === "0" && <div> {SDV}</div>}
                            </div>
                        ),
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    const initialPositions = {
        ArrowRight: { x: 768.5423568651795, y: 998.5512757003828 },
        ArrowRight1: { x: -1262.1001825232765, y: 1000.2070645557653 },
        BallValue01: { x: -1128.037821602239, y: 1191.6262752572804 },
        BallValue02: { x: -903.8172406747104, y: 1193.399667617022 },
        BallValue03: { x: -701.4277571154358, y: 811.268852001003 },
        BallValue04: { x: -702.8672275157428, y: 1196.5644365920487 },
        BallValue05: { x: -409.1293248998188, y: 811.8988197919384 },
        BallValue06: { x: -408.81019299266336, y: 1196.4905308723003 },
        BallValue07: { x: 504.8485477377201, y: 1275.7596294538605 },
        BallValue08: { x: 503.96196630239683, y: 731.9490736073253 },
        BallValue09: { x: -110.97796431132724, y: 1276.0539298322096 },
        BallValue10: { x: -110.7879376251401, y: 731.3407916825689 },
        BallValueCenter: { x: 171.8879607409171, y: 997.3707577281239 },
        BallValueCenter_Check: {
            x: 90.96636981528951,
            y: 1084.2937921267353,
        },
        BallValueCenter_None: {
            x: 194.0927490343022,
            y: 1049.7940379274323,
        },
        BallValueCenter_None2: {
            x: 188.97569648423308,
            y: 1050.2566331831772,
        },
        BallValuePSV: { x: 707.4535331808087, y: 925.0884862803827 },
        BallValuePSVNone: { x: 738.7414507122355, y: 942.2822573892058 },
        ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
        FIQ_1901: { x: 109.21476408033044, y: 333.03027399043043 },
        FIQ_1902: { x: 102.93274684979508, y: 1390.9527295767557 },
        FIQ_none: { x: 248.9733646620158, y: 703.1349517698848 },
        FIQ_none2: { x: 243.1791231142755, y: 1246.433138125363 },
        FIQ_none11: { x: 297.9700546608087, y: 776.4933333155745 },
        FIQ_none22: { x: 291.83473663064194, y: 1326.765516678561 },
        GD1: { x: -593.1247404829055, y: 1021.5484138763804 },
        GD1_Name1901: { x: -642.5174367324778, y: 929.7999982291198 },
        GD1_Value1901: { x: -642.2309648261335, y: 969.2951649681137 },
        GD2: { x: -42.50089224243885, y: 1021.4354854552315 },
        GD2_Name1902: { x: -93.0443422577471, y: 929.3762980384839 },
        GD2_Value1902: { x: -92.91457554484961, y: 969.1203079122581 },
        GD3: { x: 459.914400589417, y: 1020.9672974791615 },
        GD3_Name1903: { x: 408.94939138278767, y: 926.3542185615489 },
        GD3_Value1903: { x: 409.16846035566243, y: 966.2240910379097 },
        GD_none1: { x: -557.4064666813481, y: 1048.346153521593 },
        GD_none2: { x: -7.7844474100276955, y: 1044.8685851757357 },
        GD_none3: { x: 494.08483331589105, y: 1051.9593704975985 },
        HELP: { x: 750.7851455025582, y: 309.0601951574698 },
        Header: { x: -1206.6213894992948, y: 364.1584689447791 },
        PCV01: { x: -599.94289821967, y: 802.6626518716577 },
        PCV02: { x: -599.958842024047, y: 1182.9561914947765 },
        PCV_NUM01: { x: -685.2202972740031, y: 658.7120912134735 },
        PCV_NUM02: { x: -684.9232711228508, y: 1384.163392899504 },
        PCV_ballVavle_Small1: {
            x: -463.95750208249893,
            y: 796.3268812764675,
        },
        PCV_ballVavle_Small1_none1: {
            x: -565.2385229733152,
            y: 816.2575474175768,
        },
        PCV_ballVavle_Small1_none2: {
            x: -564.568543995368,
            y: 1198.5320880854015,
        },
        PCV_ballVavle_Small2: {
            x: -471.39757167976717,
            y: 1178.6960358714698,
        },
        PCV_ballVavle_Small2_none1: {
            x: -450.31021631638924,
            y: 869.5519055175876,
        },
        PCV_ballVavle_Small2_none2: {
            x: -458.105425182069,
            y: 1251.7751314040793,
        },
        PCV_none1: { x: -561.5028035240778, y: 865.4758644182178 },
        PCV_none2: { x: -560.7446075974576, y: 1245.861392635763 },
        PSV01: { x: 612.1731993621377, y: 610.5133777676822 },
        PSV_01: { x: 706.026929274324, y: 839.5277060688408 },
        PSV_02: { x: 677.371154154704, y: 804.4314434762641 },
        PSV_03: { x: 663.4773354313934, y: 704.930638396519 },
        PSV_None01: { x: 784.3052438210208, y: 1043.0259819068465 },
        PSV_None02: { x: 740.5334428531365, y: 887.7863120430411 },
        PSV_None03: { x: 698.7618492817661, y: 839.0390132826677 },
        PSV_None04: { x: 691.0055856547771, y: 735.8487283773412 },
        PT1: { x: -1030.7668278678443, y: 923.6792519357384 },
        PT2: { x: -27.189835027824415, y: 1206.4222152022392 },
        PT3: { x: -20.381746689621593, y: 662.037880506796 },
        PT_col1: { x: -990.7658686613956, y: 998.6460419620203 },
        PT_col2: { x: 19.862308874268933, y: 737.7028110648847 },
        PT_col3: { x: 13.295698935440726, y: 1282.5019427337986 },
        PT_none1: { x: -994.879694196512, y: 940.6460419620203 },
        PT_none2: { x: 14.303438303551133, y: 701.7157609793983 },
        PT_none3: { x: 7.676012482892929, y: 1237.2951782160794 },
        PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
        PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
        Pressure_Trans01: {
            x: -1079.8436117067047,
            y: 781.9865024503554,
        },
        Pressure_Trans02: { x: -290.0766678403734, y: 607.0339683340325 },
        Pressure_Trans03: {
            x: -299.9462192355602,
            y: 1436.8780553467147,
        },
        SDV: { x: -1233.5296036246955, y: 898.5758808521592 },
        SDV_Ball: { x: -1108.7415047384393, y: 1243.8057655958721 },
        SDV_IMG: { x: -1128.421296764186, y: 980.1809849794247 },
        SDV_None: { x: -1089.4833742545557, y: 1045.0428308586213 },
        Tank: { x: -921.5169052023348, y: 946.94544810155 },
        Tank_Ball: { x: -881.0746635080593, y: 1244.2870542191342 },
        Tank_None: { x: -913.9045068453281, y: 1045.2445985526958 },
        Temperature_Trans01: {
            x: -607.828356494313,
            y: 562.8487535527242,
        },
        Temperature_Trans02: {
            x: -796.1166124474211,
            y: 1445.5258186779024,
        },
        VavleWay: { x: 85.58988116725641, y: 1016.4139269928653 },
        borderWhite: { x: -1229.392001466799, y: 338.67009122532744 },
        data1: { x: 109.47946341011584, y: 589.2589906944482 },
        data2: { x: 109.27991967319247, y: 526.0779074551506 },
        data3: { x: 109.73947478062132, y: 461.5806591350607 },
        data4: { x: 109.8371177007175, y: 397.84637033965646 },
        data5: { x: 102.78007803710699, y: 1455.8924158928564 },
        data6: { x: 103.10223762535634, y: 1518.8843616862086 },
        data7: { x: 102.5272888932326, y: 1582.2717633592201 },
        data8: { x: 102.42098616731909, y: 1646.7545909037456 },
        line1: { x: -1216.4118252175665, y: 1045.059045857194 },
        line2: { x: -824.7490621134568, y: 1045.059045857194 },
        line3: { x: -679.4548405099899, y: 864.3210507007146 },
        line4: { x: -679.8288704580859, y: 1247.5473074652164 },
        line5: { x: -386.35311440840894, y: 864.5020291308545 },
        line6: { x: -386.02218778401766, y: 1247.470831450982 },
        line7: { x: -210.82907734671454, y: 1052.6632425418165 },
        line8: { x: -88.04540708877198, y: 784.1775456107679 },
        line9: { x: -88.0002755654424, y: 1328.89662061928 },
        line10: { x: 526.287999771183, y: 784.4482798747053 },
        line11: { x: 526.7985068882073, y: 1328.7506749429908 },
        line12: { x: 669.453281622097, y: 1042.0651701525298 },
        line13: { x: 784.3012389553304, y: 1043.0028327994185 },
        overlay_SmallVavle1: {
            x: -460.2968162301511,
            y: 885.6463541552142,
        },
        overlay_SmallVavle2: {
            x: -467.9401692198322,
            y: 1268.7449655852304,
        },
        overlay_line7: { x: -265.2148544974418, y: 1051.46019515747 },
        overlay_line13: { x: 628.1970734597824, y: 1042.1470412495723 },
        timeUpdate: { x: -1205.539796691701, y: 463.6522453863277 },
        timeUpdate2: { x: -1206.679214981902, y: 505.7174141210413 },
        timeUpdate3: { x: -1208.113792389707, y: 546.6921195736882 },
    };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [initialNodes, setInitialNodes] = useState([
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
            style: { border: "none", width: 30, height: 10, background: line },
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                width: 60,
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
                background: line,
                width: 20,
                height: 22,
            },
        },
        {
            id: "line13",
            position: positions.line13,
            type: "custom",
            data: {
                label: <div>13</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 1,
                background: line,
            },
        },

        // ============================== line =========================================
        {
            id: "SDV",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 25,
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
                width: 170,
                height: 65,
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
                width: 65,
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
                width: 20,
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
                width: 20,
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
                        <BallValue07 />
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
                        <BallValue08 />
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
                        <BallValue09 />
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
                        <BallValue10 />
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
                width: 125,
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
                width: 65,
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
                            width={80}
                            height={80}
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
                            width={80}
                            height={80}
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
                            width={50}
                            height={50}
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
                            width={50}
                            height={50}
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
                    <div style={{ fontSize: 25, display: "flex" }}>
                        <PCV_01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 270,
                background: background,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "PCV_NUM02",
            position: positions.PCV_NUM02,
            type: "custom",
            data: {
                label: (
                    <div>
                        <PCV_02_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: background,
                width: 270,
                background: background,
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
                    >
                        FIQ-1901
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 400,
                height: 65,
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
                    >
                        FIQ-1902
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "yellow",
                border: "1px solid white",
                width: 400,
                height: 65,
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
                        <BallValueCenter />
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
                width: 65,
                height: 22,
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
                width: 65,
                height: 22,
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
                height: 75,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data1,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data2,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data3,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data5,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data6,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data7,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data8,

            style: {
                background: background,
                border: "1px solid white",
                width: 400,
                height: 65,
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
                background: line,
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
                background: colorIMG_none,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None03",
            position: positions.PSV_None03,
            type: "custom",
            data: {
                label: <div>3</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None04",
            position: positions.PSV_None04,
            type: "custom",
            data: {
                label: <div>4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
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
                    <div style={{ fontSize: 25, display: "flex" }}>
                        <PSV01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: background,
                width: 270,
                background: background,
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
                width: 200,
                background: background,
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
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.Pressure_Trans02,

            style: {
                border: background,
                width: 200,
                background: background,
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
                width: 200,
                background: background,
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
                width: 30,
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
                width: 30,
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
                width: 30,
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
                width: 10,
                height: 65,

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
                height: 65,

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
                height: 65,

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
                                    fontSize: 60,
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
                width: "500px",

                height: 100,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "HELP",
            data: {
                label: (
                    <div>
                        <div
                            style={{
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            <p
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "5px solid white",
                                    borderRadius: 50,
                                    fontWeight: 600,
                                    color: "white",
                                    fontSize: 30,
                                }}
                                onClick={() => setVisible(true)}
                            >
                                ?
                            </p>
                        </div>
                    </div>
                ),
            },

            position: positions.HELP,

            style: {
                background: background,
                border: background,
                width: 10,
                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // =============== TIME  =======================

        {
            id: "timeUpdate",
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

            position: positions.timeUpdate,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: 500,

                height: 45,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "timeUpdate2",
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

            position: positions.timeUpdate2,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: 500,

                height: 45,
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
                width: 510,

                height: 45,
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
                            fontSize: 18,
                            fontWeight: 500,
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
                width: 200,
                height: 40,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD2_Name1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
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
                width: 200,
                height: 40,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD3_Name1903",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
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
                width: 200,

                height: 40,
            },
            targetPosition: Position.Left,
        },

        {
            id: "GD1_Value1901",
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
            position: positions.GD1_Value1901,

            style: {
                background: background,
                border: "1px solid white",
                width: 200,
                height: 40,
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
                background: background,
                border: "1px solid white",
                width: 200,

                height: 40,
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
                background: background,
                border: "1px solid white",
                width: 200,

                height: 40,
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
                width: 30,
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
                width: 30,
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
                width: 30,
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
                width: 550,
                height: 270,
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
                width: 130,
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
                width: 150,
                height: 22,
            },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(DemoEdges);

    return (
        <div>
            <audio ref={audioRef}>
                <source src="/audios/Notification.mp3" type="audio/mpeg" />
            </audio>
            <OverlayPanel ref={op}>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div>High</div>
                            <div style={{ paddingLeft: 20 }}>
                                <InputText
                                    placeholder="High"
                                    value={HighInputPT02}
                                    onChange={handleHighPT02}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div>Low</div>
                            <div style={{ paddingLeft: 25 }}>
                                <InputText
                                    placeholder="Low"
                                    value={LowInputPT02}
                                    onChange={handleLowPT02}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <Button label="Update" onClick={handleButtonClick} />
                </div>
            </OverlayPanel>

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
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                    background: background,
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodesDraggable={false} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.5}
                    maxZoom={2}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
