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

import {
    ConnectedLed,
    disconnectedLed,
    station,
} from "../ReactFlow/IconOTSUKA";
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
import {
    ArrowRight,
    BallVavle,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    GD,
    PCV,
    PTV,
    SDV,
    WhiteTriangleRight,
    connect,
    gasIn,
    tankGas,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { connected } from "process";
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

export default function DemoFlowOTS() {
    const [visible, setVisible] = useState(false);

    const op = useRef<OverlayPanel>(null);

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

    const [TT01, setTT01] = useState<string | null>(null);
    const [TT02, setTT02] = useState<string | null>(null);

    const [GD1, SetGD1] = useState<string | null>(null);
    const [GD2, SetGD2] = useState<string | null>(null);
    const [GD3, SetGD3] = useState<string | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

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
                        EK1_Temperature: setTT01,

                        EK2_Flow_at_Measurement_Conditions: setGVF2,
                        EK2_Flow_at_Base_Conditions: setSVF2,
                        EK2_Volume_at_Base_Conditions: setSVA2,
                        EK2_Vm_Adjustable_Counter: setGVA2,
                        EK2_Pressure: setPT03,
                        EK2_Temperature: setTT02,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT01,

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
                                                    marginLeft: 20,
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
                                                    marginLeft: 20,
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

                                        marginLeft: 20,
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
                                                    marginLeft: 20,
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
                                                    marginLeft: 20,
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
                                        marginLeft: 20,
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
                                                    marginLeft: 20,
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
                                                    marginLeft: 20,
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
                                        marginLeft: 20,
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

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionsDemo");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     :
        
    const initialPositions =   {
        ArrowRight: { x: 823.955471857383, y: 999.6807441860246 },
        ArrowRight1: { x: -1261.8585518029631, y: 1038.9120392894379 },
        BallValue01: { x: -1129.9980812500166, y: 1187.9107038056438 },
        BallValue02: { x: -895.356682967557, y: 1189.8020033217338 },
        BallValue03: { x: -701.3246378085894, y: 883.8304778298589 },
        BallValue04: { x: -702.693312830796, y: 1196.0996633088027 },
        BallValue05: { x: -378.0807121369639, y: 882.6824168265823 },
        BallValue06: { x: -378.1704246285699, y: 1195.6987844499788 },
        BallValue07: { x: 462.80957360308423, y: 1275.632981441439 },
        BallValue08: { x: 462.6050864040965, y: 805.8830489984563 },
        BallValue09: { x: -113.22647003069105, y: 1277.0117880830726 },
        BallValue10: { x: -113.02940460357098, y: 805.6518574509679 },
        BallValueCenter: { x: 155.01754710958227, y: 1061.7611985041206 },
        BallValueCenter_Check: {
            x: 90.96636981528951,
            y: 1084.2937921267353,
        },
        BallValueCenter_None: {
            x: 174.25466354995183,
            y: 1114.0567134405967,
        },
        BallValueCenter_None2: {
            x: 175.72043709091793,
            y: 1114.1142700381654,
        },
        ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
        FIQ_1901: { x: 33.28704961872347, y: 335.1135501590107 },
        FIQ_1902: { x: 36.64222079991478, y: 1397.4336269884245 },
        FIQ_none: { x: 223.6869922039623, y: 777.2354742632019 },
        FIQ_none2: { x: 225.06548244808948, y: 1247.3671164522668 },
        FIQ_none11: { x: 272.7139984525454, y: 856.912018718329 },
        FIQ_none22: { x: 275.4324075532159, y: 1326.360590984426 },
        GD1: { x: -705.1814154857234, y: 1057.508602928905 },
        GD1_Name1901: { x: -615.0195844024829, y: 982.637181181105 },
        GD1_Value1901: { x: -615.6307245161495, y: 1022.748043629185 },
        GD2: { x: -133.94457688309086, y: 1056.6756602852502 },
        GD2_Name1902: { x: -59.779589372016574, y: 978.6585600806475 },
        GD2_Value1902: { x: -58.69915684202027, y: 1018.8095852734185 },
        GD3: { x: 309.01737430287176, y: 1050.8606129330037 },
        GD3_Name1903: { x: 384.1349817802261, y: 984.8342277734904 },
        GD3_Value1903: { x: 383.9248093630961, y: 1022.7174334287059 },
        GD_none1: { x: -670.1784767260174, y: 1074.5507789267567 },
        GD_none2: { x: -101.34408008024292, y: 1082.1710089261915 },
        GD_none3: { x: 345.62391441028547, y: 1087.609177087721 },
        HELP: { x: 750.7851455025582, y: 309.0601951574698 },
        Header: { x: -1206.7800640424662, y: 388.37876746146 },
        PCV01: { x: -596.9577180787576, y: 874.4326119207913 },
        PCV02: { x: -597.6433959532042, y: 1186.237160632944 },
        PCV_NUM01: { x: -673.4856861354434, y: 726.0294822075074 },
        PCV_NUM02: { x: -674.7380892015382, y: 1370.5199593154873 },
        PCV_none1: { x: -559.5509818116116, y: 935.3683241530094 },
        PCV_none2: { x: -560.7446075974576, y: 1245.861392635763 },
        PSV01: { x: 610.473175015095, y: 597.3219090263999 },
        PSV_01: { x: 707.4234072547852, y: 834.0399185360251 },
        PSV_02: { x: 677.371154154704, y: 804.4314434762641 },
        PSV_03: { x: 663.4773354313934, y: 704.930638396519 },
        PSV_None01: { x: 796.2500184506105, y: 1044.2017434854683 },
        PSV_None02: { x: 742.4037921900604, y: 882.687476499454 },
        PSV_None03: { x: 698.7618492817661, y: 839.0390132826677 },
        PSV_None04: { x: 691.0055856547771, y: 735.8487283773412 },
        PT1: { x: -1025.2125246843698, y: 1004.1838777096069 },
        PT2: { x: -25.542489665719472, y: 1256.3255536762633 },
        PT3: { x: -5.0188432487411205, y: 789.4562620346093 },
        PT_none1: { x: -989.7465212143211, y: 1034.3299806591485 },
        PT_none2: { x: 29.223411113184227, y: 817.3255536762634 },
        PT_none3: { x: 11.42743990310646, y: 1282.7324187845866 },
        PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
        PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
        Pressure_Trans01: { x: -1074.582503155971, y: 780.2569333035837 },
        Pressure_Trans02: { x: -286.3699613505455, y: 722.7662576288657 },
        Pressure_Trans03: {
            x: -320.6762190909783,
            y: 1368.5878435786115,
        },
        SDV: { x: -1247.5296036246955, y: 936.5758808521592 },
        SDV_Ball: { x: -1109.8969185378605, y: 1241.6399506143773 },
        SDV_IMG: { x: -1127.898707272786, y: 1020.6408310422089 },
        SDV_None: { x: -1092.597048928013, y: 1084.7361187303948 },
        Tank: { x: -911.664517080937, y: 965.7322464522078 },
        Tank_Ball: { x: -875.1430460093859, y: 1242.7446917036984 },
        Tank_None: { x: -906.6261313289393, y: 1085.4707750355217 },
        Temperature_Trans01: {
            x: -607.828356494313,
            y: 562.8487535527242,
        },
        Temperature_Trans02: {
            x: -796.1166124474211,
            y: 1445.5258186779024,
        },
        borderWhite: { x: -1228.5752488233188, y: 377.16014281141565 },
        data1: { x: 33.98800518087057, y: 593.0278017643932 },
        data2: { x: 33.78846144394731, y: 528.3506431415917 },
        data3: { x: 33.36374521178436, y: 463.6853304857493 },
        data4: { x: 32.63339716779848, y: 399.39870601500076 },
        data5: { x: 36.9278303152023, y: 1461.095011105468 },
        data6: { x: 36.7721669447223, y: 1524.7459382860852 },
        data7: { x: 36.197218212598386, y: 1588.775369537831 },
        data8: { x: 35.58508145225224, y: 1653.1748866910893 },
        line1: { x: -1252.0791151967255, y: 1085.5692254680569 },
        line2: { x: -817.6211537200223, y: 1085.4365275251103 },
        line3: { x: -679.4548405099899, y: 936.4534537832784 },
        line4: { x: -679.8288704580859, y: 1247.5473074652164 },
        line5: { x: -355.96875345751545, y: 936.5969570000603 },
        line6: { x: -355.67780000165965, y: 1247.470831450982 },
        line7: { x: -188.45830132383423, y: 1089.4219836777133 },
        line8: { x: -90.39616947758043, y: 858.6688336051166 },
        line9: { x: -90.52620249154324, y: 1329.2727569858912 },
        line10: { x: 484.86843311853136, y: 858.5611750826382 },
        line11: { x: 484.9474549111277, y: 1329.260296490842 },
        line12: { x: 706.3313915738289, y: 1043.5647138277245 },
        line13: { x: 854.493627374797, y: 1044.463725443685 },
        timeUpdate: { x: -1204.4329288664649, y: 481.78426525992836 },
        timeUpdate2: { x: -1206.7571479926846, y: 524.0916184511616 },
        timeUpdate3: { x: -1207.68200120475, y: 569.5594513023825 },
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
                height: 10,
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
                background: colorIMG_none,
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
                label: <div>{SDV}</div>,
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
                width: 250,
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
                width: 250,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 500,
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
                width: 250,
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

                height: 100,
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
                width: 500,

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
                background: "#ffaa00",
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
                width: 300,
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
                width: 300,
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
                width: 230,

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
                width: 300,
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
                width: 300,

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
                width: 230,

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
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(DemoEdges);
    // const onNodeDragStop = useCallback(
    //     (event: any, node: any) => {
    //         if (editingEnabled) {
    //             const { id, position } = node;
    //             setNodes((prevNodes) =>
    //                 prevNodes.map((n) =>
    //                     n.id === id ? { ...n, position: position } : n
    //                 )
    //             );
    //             if (id === "SDV") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV: position,
    //                 }));
    //             } else if (id === "SDV_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_None: position,
    //                 }));
    //             } else if (id === "SDV_IMG") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_IMG: position,
    //                 }));
    //             } else if (id === "SDV_Ball") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     SDV_Ball: position,
    //                 }));
    //             }
    //             // ================================== end item ==================================

    //             // ============ line =========================
    //             else if (id === "line1") {
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
    //             } else if (id === "line11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line11: position,
    //                 }));
    //             } else if (id === "line12") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line12: position,
    //                 }));
    //             } else if (id === "line13") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     line13: position,
    //                 }));
    //             }

    //             // ============ ball vavle ===========================
    //             else if (id === "BallValue01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue01: position,
    //                 }));
    //             } else if (id === "BallValue02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue02: position,
    //                 }));
    //             } else if (id === "BallValue03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue03: position,
    //                 }));
    //             } else if (id === "BallValue04") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue04: position,
    //                 }));
    //             } else if (id === "BallValue05") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue05: position,
    //                 }));
    //             } else if (id === "BallValue06") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue06: position,
    //                 }));
    //             } else if (id === "BallValue07") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue07: position,
    //                 }));
    //             } else if (id === "BallValue08") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue08: position,
    //                 }));
    //             } else if (id === "BallValue09") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue09: position,
    //                 }));
    //             } else if (id === "BallValue10") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValue10: position,
    //                 }));
    //             }
    //             // ============ ball vavle ===========================
    //             else if (id === "Tank") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank: position,
    //                 }));
    //             } else if (id === "Tank_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_None: position,
    //                 }));
    //             } else if (id === "Tank_Ball") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Tank_Ball: position,
    //                 }));
    //             }
    //             // ============ PCV ===========================
    //             else if (id === "PCV01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV01: position,
    //                 }));
    //             } else if (id === "PCV02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV02: position,
    //                 }));
    //             } else if (id === "PCV_NUM01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_NUM01: position,
    //                 }));
    //             } else if (id === "PCV_NUM02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_NUM02: position,
    //                 }));
    //             } else if (id === "PCV_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_none1: position,
    //                 }));
    //             } else if (id === "PCV_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PCV_none2: position,
    //                 }));
    //             }
    //             // ============ FIQ ===========================
    //             else if (id === "FIQ_1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_1901: position,
    //                 }));
    //             } else if (id === "FIQ_1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_1902: position,
    //                 }));
    //             } else if (id === "FIQ_none") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none: position,
    //                 }));
    //             } else if (id === "FIQ_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none2: position,
    //                 }));
    //             } else if (id === "FIQ_none11") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none11: position,
    //                 }));
    //             } else if (id === "FIQ_none22") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     FIQ_none22: position,
    //                 }));
    //             }
    //             // ============ Ball center ===========================
    //             else if (id === "BallValueCenter") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter: position,
    //                 }));
    //             } else if (id === "BallValueCenter_Check") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_Check: position,
    //                 }));
    //             } else if (id === "BallValueCenter_None") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_None: position,
    //                 }));
    //             } else if (id === "BallValueCenter_None2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     BallValueCenter_None2: position,
    //                 }));
    //             }
    //             // ========================= data ==========================
    //             else if (id === "data1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data1: position,
    //                 }));
    //             } else if (id === "data2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data2: position,
    //                 }));
    //             } else if (id === "data3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data3: position,
    //                 }));
    //             } else if (id === "data4") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data4: position,
    //                 }));
    //             } else if (id === "data5") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data5: position,
    //                 }));
    //             } else if (id === "data6") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data6: position,
    //                 }));
    //             } else if (id === "data7") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data7: position,
    //                 }));
    //             } else if (id === "data8") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     data8: position,
    //                 }));
    //             }
    //             // ========================= PSV ==========================
    //             else if (id === "PSV_01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_01: position,
    //                 }));
    //             } else if (id === "PSV_02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_02: position,
    //                 }));
    //             } else if (id === "PSV_03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_03: position,
    //                 }));
    //             } else if (id === "PSV_None01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None01: position,
    //                 }));
    //             } else if (id === "PSV_None02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None02: position,
    //                 }));
    //             } else if (id === "PSV_None03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None03: position,
    //                 }));
    //             } else if (id === "PSV_None04") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV_None04: position,
    //                 }));
    //             } else if (id === "PSV01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PSV01: position,
    //                 }));
    //             }
    //             //  ================ PT ===================
    //             else if (id === "Pressure_Trans01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans01: position,
    //                 }));
    //             } else if (id === "Pressure_Trans02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans02: position,
    //                 }));
    //             } else if (id === "Pressure_Trans03") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Pressure_Trans03: position,
    //                 }));
    //             } else if (id === "PT1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT1: position,
    //                 }));
    //             } else if (id === "PT2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT2: position,
    //                 }));
    //             } else if (id === "PT3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT3: position,
    //                 }));
    //             } else if (id === "PT_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none1: position,
    //                 }));
    //             } else if (id === "PT_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none2: position,
    //                 }));
    //             } else if (id === "PT_none3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     PT_none3: position,
    //                 }));
    //             }

    //             // ================ TT =================
    //             else if (id === "Temperature_Trans01") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Temperature_Trans01: position,
    //                 }));
    //             } else if (id === "Temperature_Trans02") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Temperature_Trans02: position,
    //                 }));
    //             }
    //             // ============= header ===============
    //             else if (id === "Header") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     Header: position,
    //                 }));
    //             } else if (id === "HELP") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     HELP: position,
    //                 }));
    //             }
    //             // ============= Time Update ==================
    //             else if (id === "timeUpdate") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate: position,
    //                 }));
    //             } else if (id === "timeUpdate2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate2: position,
    //                 }));
    //             } else if (id === "timeUpdate3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     timeUpdate3: position,
    //                 }));
    //             }
    //             // ============= Connected ===================
    //             else if (id === "ConnectData") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ConnectData: position,
    //                 }));
    //             }
    //             // ============= Arrow ======================
    //             else if (id === "ArrowRight") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ArrowRight: position,
    //                 }));
    //             } else if (id === "ArrowRight1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     ArrowRight1: position,
    //                 }));
    //             }
    //             // =========== PT ICONS1 ==================

    //             //================ GD ====================
    //             else if (id === "GD1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1: position,
    //                 }));
    //             } else if (id === "GD2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2: position,
    //                 }));
    //             } else if (id === "GD3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3: position,
    //                 }));
    //             } else if (id === "GD1_Name1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1_Name1901: position,
    //                 }));
    //             } else if (id === "GD2_Name1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2_Name1902: position,
    //                 }));
    //             } else if (id === "GD3_Name1903") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3_Name1903: position,
    //                 }));
    //             } else if (id === "GD1_Value1901") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD1_Value1901: position,
    //                 }));
    //             } else if (id === "GD2_Value1902") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD2_Value1902: position,
    //                 }));
    //             } else if (id === "GD3_Value1903") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD3_Value1903: position,
    //                 }));
    //             } else if (id === "GD_none1") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none1: position,
    //                 }));
    //             } else if (id === "GD_none2") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none2: position,
    //                 }));
    //             } else if (id === "GD_none3") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     GD_none3: position,
    //                 }));
    //             }
    //             // ===================== border white ==================
    //             else if (id === "borderWhite") {
    //                 setPositions((prevPositions: any) => ({
    //                     ...prevPositions,
    //                     borderWhite: position,
    //                 }));
    //             }
    //         }
    //     },
    //     [setNodes, setPositions, editingEnabled]
    // );

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    // useEffect(() => {
    //     localStorage.setItem("positionsDemo", JSON.stringify(positions));
    // }, [positions]);

    return (
        <div>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
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
                    nodesDraggable={false}
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
