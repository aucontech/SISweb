import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Position,
} from "reactflow";
import "reactflow/dist/style.css";
import {
    gasOut,
    gauges,
    halfCricle,
    markPipe,
    pipeEnd,
    pipeMark,
    pipeSDV,
    pipeSmall,
    station,
    svgIcon,
    tankSVG,
} from "./IconOTSUKA";
import "./Flow.css";
import { initialEdges } from "./initalsEgdes";
import { readToken } from "@/service/localStorage";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { OverlayPanel } from "primereact/overlaypanel";
import FlowRR from "../FlowRR";
import InitalsNodes from "./initalsNodes";
import { ConfirmDialog } from "primereact/confirmdialog";
import BallValue01 from "./BallValue01";
import BallValue02 from "./BallValue02";
import SDV_Otsuka from "./SDV_Otsuka";
import { Toast } from "primereact/toast";
import PCV_01_Otsuka from "./PCV01_Otsuka";
import PCV_02_Otsuka from "./PCV02_Otsuka";
import PSV01_Otsuka from "./PSV02_Otsuka";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

export default function App() {
    const op = useRef<OverlayPanel>(null);
    const toast = useRef<Toast>(null);

    const [data, setData] = useState<any[]>([]);
    const token = readToken();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [flowRate, setFlowRate] = useState<any>([]);
    const [pipePressure, setPipePressure] = useState<string | null>(null);
    const [liquidLever, setLiquidLever] = useState<string | null>(null);
    const [tankPressureAI, setTankPreesureAI] = useState<string | null>(null);

    const [spare01AI, setSpare01AI] = useState<string | null>(null);
    const [spare02AI, setSpare02AI] = useState<string | null>(null);
    const [spare03AI, setSpare03AI] = useState<string | null>(null);
    const [spare04AI, setSpare04AI] = useState<string | null>(null);

    const [temprerature01AI, setTemperature01AI] = useState<string | null>(
        null
    );
    const [temprerature02AI, setTemperature02AI] = useState<string | null>(
        null
    );

    const [solenoido01Do, setSolenoid01Do] = useState<string | null>(null);

    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const [checkConnectData, setCheckConnectData] = useState(false);

    const ws = useRef<WebSocket | null>(null);

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
                        DI_MAP_1: setFlowRate,
                        DI_RESET: setPipePressure,
                        DI_SD_1: setLiquidLever,
                        DO_BC_01: setTankPreesureAI,

                        DI_SELECT_SW: setSpare01AI,
                        DI_UPS_ALARM: setSpare02AI,
                        DI_UPS_BATTERY: setSpare03AI,
                        DI_UPS_CHARGING: setSpare04AI,

                        DI_ZSC_1: setTemperature01AI,
                        DI_ZSC_2: setTemperature02AI,
                        DI_ZSO_1: setSolenoid01Do,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                    if (keys.includes("time")) {
                        const timeUpdate = dataReceived.data["time"][0][1];
                        setTimeUpdate(timeUpdate);
                    }
                }
            };
        }
    }, [data]);

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
    };

    const KeyGas = {
        SM3H: "SM3/H",
        M3H: "M3/H",
        SM3: "SM3",
        M3: "M3",
    };

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "1a") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.SVF} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {" "}
                                        {flowRate}{" "}
                                    </p>
                                </div>
                                {KeyGas.SM3H}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "1b") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.GVF} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {pipePressure}
                                    </p>
                                </div>
                                <p>{KeyGas.M3H}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "1c") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.SVA} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {liquidLever}
                                    </p>
                                </div>
                                {KeyGas.SM3}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "1d") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.GVA} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {tankPressureAI}
                                    </p>
                                </div>
                                {KeyGas.M3}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "2a") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.SVF} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {" "}
                                        {spare01AI}{" "}
                                    </p>
                                </div>
                                {KeyGas.SM3H}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "2b") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.GVF} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {" "}
                                        {spare02AI}{" "}
                                    </p>
                                </div>
                                {KeyGas.M3H}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "2c") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.SVA} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {" "}
                                        {spare03AI}{" "}
                                    </p>
                                </div>
                                {KeyGas.SM3}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "2d") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <p style={{ color: "black" }}>
                                        {ValueGas.GVA} -
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {" "}
                                        {spare04AI}{" "}
                                    </p>
                                </div>

                                {KeyGas.M3}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "bara1") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 35,
                                    fontWeight: 500,
                                    display: "flex",
                                }}
                            >
                                <p
                                    style={{
                                        color: "green",
                                        display: "flex",
                                        marginLeft: 20,
                                    }}
                                >
                                    {temprerature01AI?.slice(0, 4)} BARA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "bara2") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 35,
                                    fontWeight: 500,
                                    display: "flex",
                                }}
                            >
                                <p
                                    style={{
                                        color: "green",
                                        display: "flex",
                                        marginLeft: 20,
                                    }}
                                >
                                    {temprerature02AI?.slice(0, 4)} BARA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "bara3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 35,
                                    fontWeight: 500,
                                    display: "flex",
                                }}
                            >
                                <p
                                    style={{
                                        color: "green",
                                        display: "flex",
                                        marginLeft: 20,
                                    }}
                                >
                                    {solenoido01Do?.slice(0, 4)} BARG
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
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                }}
                            >
                                <p>Last Update</p>
                                <p
                                    style={{
                                        color: "green",
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
            if (node.id === "ConnectData") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 500,
                                    display: "flex",
                                    padding: 10,
                                }}
                            >
                                {checkConnectData ? (
                                    <div style={{}}>
                                        <p
                                            style={{
                                                padding: 5,
                                                color: "green",
                                            }}
                                        >
                                            CONNECTED
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{}}>
                                        <p
                                            style={{
                                                padding: 5,
                                                color: "red",
                                            }}
                                        >
                                            DISCONNECT
                                        </p>
                                    </div>
                                )}
                            </div>
                        ),
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
    }, [flowRate, pipePressure]);

    const storedPositionString = localStorage.getItem("positions");
    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              ConnectData: { x: 208, y: -191 },
              FIQ: { x: 981.2251539415981, y: 257.1013591338559 },
              FIQ2: { x: 1226.1465266939656, y: 726.6350071962734 },
              TankSVG: { x: 385.07262836525877, y: 277.9478545543576 },
              bara1: { x: 484.3049129189668, y: 137.40231270294777 },
              bara2: { x: 812.4155143100833, y: 549.6845581780644 },
              bara3: { x: 1696.691591708324, y: 184.59079367738252 },
              coupling: { x: 1023.0081198522901, y: 475.897562474152 },
              coupling2: { x: 1222, y: 258 },
              gasout: { x: 2208.0977013919046, y: 501 },
              gauges: { x: 781.7512871049225, y: 218.79590743621344 },
              gauges2: { x: 782.2030149904368, y: 687.8553699550267 },
              gauges3: { x: 1860.8894273127753, y: 320.77797356828194 },
              halfCricle: { x: 208.76511323364036, y: 106.11892503762641 },
              halfCricle2: { x: 2069.3257850544323, y: 134.44178854694428 },
              pipeEnd: { x: 1628.0073170731707, y: 327.44634146341457 },
              pipeEnd2: { x: 1627, y: 627.9926829268292 },
              pipeMark: { x: 585.8373981032122, y: 499.5746838226502 },
              pipeMark2: { x: 1431, y: 503 },
              pipeMark3: { x: 1824, y: 501 },
              pipeSVD: { x: 368.0514839198503, y: 630.7105280371044 },
              pipeSmall: { x: 171.08770377058852, y: 825.3606829381719 },
              pipeSmall2: { x: 385.9928793215362, y: 825.6382385547478 },
              position1: { x: 865.6323620672963, y: -192 },
              position2: { x: 821, y: 850 },
              sation: { x: 135.66390840327284, y: 650.8221976174074 },
              timeUpdate: { x: 1600.9121951219513, y: -191.17073170731666 },
          };

    const [positions, setPositions] = useState(initialPositions);
    const [editingEnabled, setEditingEnabled] = useState(false);

    const [initialNodes, setInitialNodes] = useState([
        {
            id: "station",
            position: positions.sation,
            type: "custom",
            data: {
                label: (
                    <div>
                        <p
                            style={{
                                fontSize: 20,
                                color: "green",
                                fontWeight: 500,
                            }}
                        ></p>
                        {station}
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "pipeSmall",
            position: positions.pipeSmall,
            data: {
                label: (
                    <div>
                        {" "}
                        <BallValue01 /> {pipeSmall}
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "pipeSmall2",
            position: positions.pipeSmall2,
            data: {
                label: (
                    <div>
                        {" "}
                        <BallValue02 /> {pipeSmall}
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "pipeSVD",
            position: positions.pipeSVD,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20 }}>
                            {" "}
                            <SDV_Otsuka />
                        </p>
                        {pipeSDV}
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "TankSVG",
            position: positions.TankSVG,
            data: {
                label: <div> {tankSVG}</div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "halfCricle",
            position: positions.halfCricle,
            data: {
                label: <div> {halfCricle}</div>,
            },
        },
        {
            id: "pipeMark",
            position: positions.pipeMark,
            data: {
                label: <div> {pipeMark}</div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "gauges",
            position: positions.gauges,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 30, fontWeight: 500 }}>PT</p>
                        {gauges}
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },

        {
            id: "gauges2",
            position: positions.gauges2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 30, fontWeight: 500 }}>PT</p>
                        {gauges}
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },

        {
            id: "FIQ",
            position: positions.FIQ,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 25 }}>FIQ-1501</p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "FIQ2",
            position: positions.FIQ2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 25 }}>FIQ-1502</p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "1",
            position: positions.position1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 30 }}></p>
                    </div>
                ),
            },

            style: {
                width: 600,
                height: 290,
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
        },
        {
            id: "1a",
            data: { label: "" },
            position: { x: 5, y: 5 },
            parentNode: "1",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "1b",
            data: { label: "" },

            position: { x: 5, y: 75 },
            parentNode: "1",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "1c",
            data: { label: "" },

            position: { x: 5, y: 145 },
            parentNode: "1",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "1d",
            data: { label: "" },

            position: { x: 5, y: 215 },
            parentNode: "1",
            style: { width: "590px", height: "70px" },
        },

        {
            id: "2",
            position: positions.position2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 30 }}></p>
                    </div>
                ),
            },

            style: {
                width: 600,
                height: 290,
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Top,
        },
        {
            id: "2a",
            data: { label: "" },
            position: { x: 5, y: 5 },
            parentNode: "2",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "2b",
            data: { label: "" },

            position: { x: 5, y: 75 },
            parentNode: "2",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "2c",
            data: { label: "" },

            position: { x: 5, y: 145 },
            parentNode: "2",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "2d",
            data: { label: "" },

            position: { x: 5, y: 215 },
            parentNode: "2",
            style: { width: "590px", height: "70px" },
        },
        {
            id: "coupling",
            position: positions.coupling,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {markPipe}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "coupling2",
            position: positions.coupling2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {markPipe}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "pipeMark2",
            position: positions.pipeMark2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {pipeMark}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },

        {
            id: "pipeEnd",
            position: positions.pipeEnd,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 23, fontWeight: 500 }}>
                            <PCV_01_Otsuka />
                            {pipeEnd}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },

        {
            id: "pipeEnd2",
            position: positions.pipeEnd2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 23, fontWeight: 500 }}>
                            <PCV_02_Otsuka />
                            {pipeEnd}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "gauges3",
            position: positions.gauges3,
            data: {
                label: (
                    <div>
                        <div>
                            <p style={{ fontSize: 30, fontWeight: 500 }}>PT</p>
                            {gauges}
                        </div>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },
        {
            id: "halfCricle2",
            position: positions.halfCricle2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            <p>
                                <PSV01_Otsuka />
                            </p>
                            {halfCricle}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Bottom,

            targetPosition: Position.Bottom,
        },
        {
            id: "pipeMark3",
            position: positions.pipeMark3,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {pipeMark}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,

            targetPosition: Position.Left,
        },
        {
            id: "gasout",
            position: positions.gasout,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {gasOut}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,

            targetPosition: Position.Left,
        },
        {
            id: "bara1",
            position: positions.bara1,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {gasOut}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { width: "300px", height: "70px" },
        },
        {
            id: "bara2",
            position: positions.bara2,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {gasOut}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,

            style: { width: "300px", height: "70px" },
        },
        {
            id: "bara3",
            position: positions.bara3,
            data: {
                label: (
                    <div>
                        <p style={{ fontSize: 20, fontWeight: 500 }}>
                            {gasOut}
                        </p>
                    </div>
                ),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Right,

            style: { width: "300px", height: "70px" },
        },

        {
            id: "timeUpdate",
            position: positions.timeUpdate,
            data: {
                label: <div></div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { width: "730px" },
        },
        {
            id: "ConnectData",
            position: positions.ConnectData,
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { width: "300px" },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);
    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );
                if (id === "1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        position1: position,
                    }));
                } else if (id === "coupling") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        coupling: position,
                    }));
                } else if (id === "station") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        sation: position,
                    }));
                } else if (id === "pipeSVD") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeSVD: position,
                    }));
                } else if (id === "TankSVG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TankSVG: position,
                    }));
                } else if (id === "halfCricle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        halfCricle: position,
                    }));
                } else if (id === "pipeMark") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeMark: position,
                    }));
                } else if (id === "pipeSmall") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeSmall: position,
                    }));
                } else if (id === "pipeSmall2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeSmall2: position,
                    }));
                } else if (id === "gauges") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        gauges: position,
                    }));
                } else if (id === "gauges2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        gauges2: position,
                    }));
                } else if (id === "FIQ") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ: position,
                    }));
                } else if (id === "FIQ2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ2: position,
                    }));
                } else if (id === "3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        coupling2: position,
                    }));
                } else if (id === "pipeMark2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeMark2: position,
                    }));
                } else if (id === "pipeEnd") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeEnd: position,
                    }));
                } else if (id === "pipeEnd2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeEnd2: position,
                    }));
                } else if (id === "gauges3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        gauges3: position,
                    }));
                } else if (id === "halfCricle2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        halfCricle2: position,
                    }));
                } else if (id === "pipeMark3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        pipeMark3: position,
                    }));
                } else if (id === "gasout") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        gasout: position,
                    }));
                } else if (id === "bara1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bara1: position,
                    }));
                } else if (id === "bara2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bara2: position,
                    }));
                } else if (id === "bara3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bara3: position,
                    }));
                } else if (id === "timeUpdate") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate: position,
                    }));
                } else if (id === "ConnectData") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ConnectData: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );

    useEffect(() => {
        localStorage.setItem("positions", JSON.stringify(positions));
    }, [positions]);

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    const paragraphContents: Record<string, string> = {
        SVF: "Standard Volume Flow Rate",
        GVF: "Gross Volume Flow Rate",
        SVA: "Standard Volume Accumulated",
        GVA: "Gross Volume Accumulated",
        PT: "Pressure Transmitter",
        PSV: "Pressure Safety Valve",
        PCV: "Pressure Control Valve",
        SSV: "Slam Shut Off Valve",
        SDV: "Shutdown valve",
    };
    return (
        <div>
            <Toast ref={toast} />

            <ConfirmDialog />
            <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button>
            <div
                style={{
                    padding: 15,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <p style={{ fontSize: 25, fontWeight: 500 }}>EWON OTSUKA</p>
                </div>

                <div
                    style={{
                        width: 25,
                        height: 30,
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    <p
                        style={{
                            border: "2px solid black",
                            borderRadius: 50,
                            fontWeight: 600,
                        }}
                        onClick={(e: any) => op.current?.toggle(e)}
                    >
                        ?
                    </p>
                    <OverlayPanel
                        style={{ width: 400, fontWeight: 500, fontSize: 17 }}
                        ref={op}
                    >
                        {Object.keys(paragraphContents).map(
                            (key: string, index: number) => (
                                <p key={index}>
                                    {key} - {paragraphContents[key]} <hr />
                                </p>
                            )
                        )}
                    </OverlayPanel>
                </div>
            </div>

            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                }}
            >
                {!editingEnabled && (
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
                )}

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    fitView
                    // nodesDraggable={false} // Cho phép kéo thả các nút
                >
                    <Background style={{ backgroundColor: "gray" }} />
                </ReactFlow>
            </div>
        </div>
    );
}
