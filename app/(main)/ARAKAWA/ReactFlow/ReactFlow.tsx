import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow,  { Controls, Position, useEdgesState, useNodesState, } from "reactflow";

import "./Flow.css";

import Image from "next/image";
import BallValue01 from "./BallValue01";
import BallValue02 from "./BallValue02";
import BallValue03 from "./BallValue03";
import BallValue04 from "./BallValue04";
import BallValue05 from "./BallValue05";
import BallValue06 from "./BallValue06";
import BallValue07 from "./BallValue07";
import BallValue08 from "./BallValue08";
import BallValue09 from "./BallValue09";
import BallValue10 from "./BallValue10";
import SDV_Otsuka from "./SDV_Otsuka";
import PCV_01_Otsuka from "./PCV01_Otsuka";
import PCV_02_Otsuka from "./PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import BallValueCenter from "./BallValueCenter";
import { initalsEgdes } from "./initalsEgdes";
import { OverlayPanel } from "primereact/overlaypanel";
interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
export default function ReactFlowHigh() {
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

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.baseUrlWebsocketTelemetry}${token}`;

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
                        EK1_Vm_Adjustable_Counter:setGVA1,

                        EK2_Flow_at_Measurement_Conditions: setGVF2,
                        EK2_Flow_at_Base_Conditions: setSVF2,
                        EK2_Volume_at_Base_Conditions: setSVA2,
                        EK2_Vm_Adjustable_Counter:setGVA2,

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
    };

    const KeyGas = {
        SM3H: "SM3/H",
        M3H: "M3/H",
        SM3: "SM3",
        M3: "M3",
    };

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p style={{ color: "green" }}>{SVF1}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.SM3H}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data3") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p style={{ color: "green" }}>{GVF1}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.M3H}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p style={{ color: "green" }}>{SVA1}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.SM3}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p style={{ color: "green" }}>
                                    {GVA1}

                                    </p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.M3}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.SVF} :
                                    </p>
                                    <p style={{ color: "green" }}>{SVF2}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.SM3H}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data6") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.GVF} :
                                    </p>
                                    <p style={{ color: "green" }}>{GVF2}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.M3H}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.SVA} :
                                    </p>
                                    <p style={{ color: "green" }}>{SVA2}</p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.SM3}</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
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
                                    <p style={{ color: "white" }}>
                                        {ValueGas.GVA} :
                                    </p>
                                    <p style={{ color: "green" }}>
                                        {GVA2}
                                    </p>
                                </div>
                                <p style={{ color: "white" }}>{KeyGas.M3}</p>
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
                                ></p>
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
                                ></p>
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
                                ></p>
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
                                <p style={{ color: "white" }}>Last Update</p>
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
                            <div style={{}}>
                                {checkConnectData ? (
                                    <div style={{}}>
                                        <p
                                            style={{
                                                padding: 5,
                                                color: "green",
                                            }}
                                        >
                                            {/* {ConnectedLed} */}
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
                                            {/* {disconnectedLed} */}
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
    }, [data]);

    const storedPositionString = localStorage.getItem("positionsDemo");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              BallCenter: { x: 1310.951148683639, y: 828.7698239631837 },
              TM1: { x: 1281.7484064862829, y: 597.4322976792727 },
              TM2: { x: 1290.8955932643962, y: 1113.7693606579335 },
              a1: { x: -229.43883457175264, y: 778.5652353625532 },
              a2: { x: -0.1889794828818765, y: 742.2532438872325 },
              a2a4: { x: 0.10273508338707416, y: 806.1917947498391 },
              a3: { x: 232.03332922104704, y: 755.9597314937049 },
              a4: { x: -0.45112418741769034, y: 933.6119273621325 },
              a5: { x: 232.11439062589363, y: 935.65679273712 },
              a5a3: { x: 231.8971233234156, y: 806.9675184921454 },
              a6: { x: 465.56606726403834, y: 616.120611613153 },
              a7: { x: 640.1533130719292, y: 603.7520524046778 },
              a8: { x: 816.535393145343, y: 615.905006920832 },
              a8a11: { x: 812.9412867356604, y: 1086.438485892446 },
              a9: { x: 464.2916565134959, y: 1036.803440610771 },
              a10: { x: 639.358703505003, y: 1024.90285497321 },
              a11: { x: 813.1442650823649, y: 1036.8311131458647 },
              a11a8: { x: 815.7335617338521, y: 665.9159081279635 },
              a12: { x: 1012.6339972528488, y: 564.893896568368 },
              a13: { x: 1555, y: 565.0913772247163 },
              a13_BallCenter: { x: 1609.8720094417527, y: 606.2335423759686 },
              a14: { x: 1012.2367878055722, y: 1084.0123883774495 },
              a14_BallCenter: { x: 1110.68044502287, y: 1124.5598195760622 },
              a15: { x: 1555.2679949062424, y: 1083.7336832529672 },
              a16: { x: 1753.4071151650487, y: 858.3807621455585 },
              a17: { x: 2056.673779572456, y: 830.1370600911795 },
              a1313: { x: 1555, y: 1119.4798126318437 },
              data1: { x: 1106.6730286441682, y: 470.7553917072497 },
              data2: { x: 1106.3080212753916, y: 391.49940744997264 },
              data3: { x: 1106.4319225336608, y: 314.1222842732521 },
              data4: { x: 1106.7253789405067, y: 235.8901485451295 },
              data5: { x: 1116.0067509322091, y: 1221.3672989301788 },
              data6: { x: 1116.037189197011, y: 1299.5743886935893 },
              data7: { x: 1115.814160999785, y: 1376.7098108936295 },
              data8: { x: 1115.7679949062424, y: 1454.488492633882 },
              dataTM1: { x: 1293, y: 100 },
              timeUpdate: { x: -146.43461687213102, y: 261.5130385679415 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [initialNodes, setInitialNodes] = useState([
        {
            id: "a1",
            position: positions.a1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/Vector.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a2",
            position: positions.a2,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <SDV_Otsuka />
                        <br />
                        <p style={{ fontSize: 20 }}>
                            <Image
                                src="/layout/imgGraphic/Symbol.png"
                                width={80}
                                height={60}
                                alt="Picture of the author"
                            />
                        </p>
                    </div>
                ),
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a3",
            position: positions.a3,
            type: "custom",
            data: {
                label: (
                    <div
                        style={{
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        {" "}
                        <Image
                            src="/layout/imgGraphic/TankFilter.png"
                            width={80}
                            height={70}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },
            zIndex: 999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a4",
            position: positions.a4,
            type: "turbo",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue01 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a5",
            position: positions.a5,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue02 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a6",
            position: positions.a6,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue03 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a7",
            position: positions.a7,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <PCV_01_Otsuka />
                        <br />
                        <Image
                            src="/layout/imgGraphic/PCV.png"
                            width={80}
                            height={60}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a8",

            position: positions.a8,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue04 />
                    </div>
                ),
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a9",
            position: positions.a9,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue05 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a10",
            position: positions.a10,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <PCV_02_Otsuka />
                        <br />
                        <Image
                            src="/layout/imgGraphic/PCV.png"
                            width={80}
                            height={60}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a11",
            position: positions.a11,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue06 />
                    </div>
                ),
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a12",
            position: positions.a12,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue07 />
                    </div>
                ),
            },
            borderRadius: 8,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a13",
            position: positions.a13,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue08 />
                    </div>
                ),
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a14",
            position: positions.a14,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue09 />
                    </div>
                ),
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a15",
            position: positions.a15,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValue10 />
                    </div>
                ),
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a16",
            position: positions.a16,
            type: "custom",
            data: {
                label: <div style={{ background: "#999999" }}></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { background: "#999999", border: "none", height: "3px" },
        },
        {
            id: "a17",
            position: positions.a17,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/icons8-arrow-100.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "a2a4",
            position: positions.a2a4,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
        },
        {
            id: "a5a3",
            position: positions.a5a3,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
        },
        {
            id: "a8a11",
            position: positions.a8a11,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },
        {
            id: "a11a8",
            position: positions.a11a8,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },
        {
            id: "a1313",
            position: positions.a1313,
            type: "custom",
            data: {
                label: <div> </div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },

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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
            },
            targetPosition: Position.Top,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
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
                background: "#333333",
                border: "2px solid white",
                width: 500,
                height: 70,
            },
            targetPosition: Position.Top,
        },
        {
            id: "TM1",
            position: positions.TM1,
            type: "custom",
            data: {
                label: <div style={{ fontSize: 25 }}> FIQ-1901</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
        },
        {
            id: "TM2",
            position: positions.TM2,
            type: "custom",
            data: {
                label: <div style={{ fontSize: 25 }}>FIQ_1902 </div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
        },
        {
            id: "timeUpdate",
            position: positions.timeUpdate,
            data: {
                label: <div></div>,
            },
            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                background: "#333333",
                border: "none",
                width: 750,
            },
        },
        {
            id: "BallCenter",
            position: positions.BallCenter,
            type: "custom",
            data: {
                label: (
                    <div style={{ height: 100 }}>
                        {" "}
                        <BallValueCenter />
                    </div>
                ),
            },
            borderRadius: 8,

            targetPosition: Position.Right,
            sourcePosition: Position.Left,
        },
        {
            id: "a13_BallCenter",
            position: positions.a13_BallCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <p>a13CT</p>
                    </div>
                ),
            },
            borderRadius: 8,

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: { width: 50 },
        },
        {
            id: "a14_BallCenter",
            position: positions.a14_BallCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <p> a14CT</p>
                    </div>
                ),
            },
            borderRadius: 8,

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: { width: 50 },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initalsEgdes);
    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );
                if (id === "a1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a1: position,
                    }));
                } else if (id === "a2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a2: position,
                    }));
                } else if (id === "a3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a3: position,
                    }));
                } else if (id === "a4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a4: position,
                    }));
                } else if (id === "a5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a5: position,
                    }));
                } else if (id === "a6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a6: position,
                    }));
                } else if (id === "a7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a7: position,
                    }));
                } else if (id === "a8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a8: position,
                    }));
                } else if (id === "a9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a9: position,
                    }));
                } else if (id === "a10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a10: position,
                    }));
                } else if (id === "a11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a11: position,
                    }));
                } else if (id === "a12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a12: position,
                    }));
                } else if (id === "a13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a13: position,
                    }));
                } else if (id === "a14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a14: position,
                    }));
                } else if (id === "a15") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a15: position,
                    }));
                } else if (id === "a16") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a16: position,
                    }));
                } else if (id === "a17") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a17: position,
                    }));
                } else if (id === "a5a3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a5a3: position,
                    }));
                } else if (id === "a2a4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a2a4: position,
                    }));
                } else if (id === "a8a11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a8a11: position,
                    }));
                } else if (id === "a11a8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a11a8: position,
                    }));
                } else if (id === "a1313") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a1313: position,
                    }));
                } else if (id === "TM1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM1: position,
                    }));
                } else if (id === "dataTM1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        dataTM1: position,
                    }));
                } else if (id === "TM2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM2: position,
                    }));
                } else if (id === "data1") {
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
                } else if (id === "timeUpdate") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate: position,
                    }));
                } else if (id === "BallCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallCenter: position,
                    }));
                } else if (id === "a13_BallCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a13_BallCenter: position,
                    }));
                } else if (id === "a14_BallCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        a14_BallCenter: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    useEffect(() => {
        localStorage.setItem("positionsDemo", JSON.stringify(positions));
    }, [positions]);

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
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
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
                    background: "#333333",
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
                    onNodeDragStop={onNodeDragStop}
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
