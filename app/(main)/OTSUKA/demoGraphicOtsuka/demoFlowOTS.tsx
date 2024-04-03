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

import { station } from "../ReactFlow/IconOTSUKA";
import { DemoEdges } from "./demoEdges";
import Image from "next/image";

export default function DemoFlowOTS() {
    const storedPositionString = localStorage.getItem("positionsDemo");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              TM1: { x: 1293.7181115812032, y: 556.1850596719108 },
              TM2: { x: 1290.8679337804706, y: 1115.3377191951529 },
              a1: { x: -229.35530650075793, y: 802.2264493747017 },
              a2: { x: 1.1368683772161603e-13, y: 795.9999999999999 },
              a2a4: { x: -2.397264916612926, y: 829.6917947498391 },
              a3: { x: 232.03809160380172, y: 802.519609075786 },
              a4: { x: -0.45112418741769034, y: 933.6119273621325 },
              a5: { x: 232.11439062589363, y: 935.65679273712 },
              a5a3: { x: 231.8971233234156, y: 829.3111816004766 },
              a6: { x: 465.56606726403834, y: 613.4713199329753 },
              a7: { x: 642.6657581527438, y: 608.4243529339919 },
              a8: { x: 819.8180820251027, y: 613.7514773845294 },
              a8a11: { x: 818.4143975338893, y: 1060.2435691571122 },
              a9: { x: 464.2916565134959, y: 1032.9341002249093 },
              a10: { x: 642.1588636159529, y: 1026.669907593499 },
              a11: { x: 818.0282674187075, y: 1032.9981183096234 },
              a11a8: { x: 819.3068697314144, y: 641.2185210559456 },
              a12: { x: 1016.5372958131381, y: 537.3672989301787 },
              a13: { x: 1555, y: 537.4798126318436 },
              a14: { x: 1016.3141609997849, y: 1096.5598462289852 },
              a15: { x: 1555.2679949062424, y: 1096.2811411045031 },
              a16: { x: 1753.3999999999996, y: 834 },
              a17: { x: 2068.5522145404025, y: 806.8955709191952 },
              a1313: { x: 1555, y: 1119.4798126318437 },
              data1: { x: 1122.5372958131381, y: 445.36729893017866 },
              data2: { x: 1122, y: 379.47981263184363 },
              data3: { x: 1122.314160999785, y: 310.5598462289852 },
              data4: { x: 1122.2679949062424, y: 246.28114110450315 },
              data5: { x: 1122.5372958131381, y: 1221.3672989301788 },
              data6: { x: 1122, y: 1287.4798126318437 },
              data7: { x: 1122.314160999785, y: 1354.5598462289852 },
              data8: { x: 1122.2679949062424, y: 1422.2811411045031 },
              dataTM1: { x: 1293, y: 100 },
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/TankFilter.png"
                            width={60}
                            height={50}
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a5",
            position: positions.a5,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a6",
            position: positions.a6,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a7",
            position: positions.a7,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a10",
            position: positions.a10,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
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
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a14",
            position: positions.a14,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
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
            id: "a15",
            position: positions.a15,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <Image
                            src="/layout/imgGraphic/BallVavle.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
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
            id: "TM1",
            position: positions.TM1,
            type: "custom",
            data: {
                label: <div> TM</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },

        {
            id: "data1",
            data: { label: <div> 1</div> },
            position: positions.data1,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data2",
            data: { label: <div> 2</div> },

            position: positions.data2,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data3",
            data: { label: <div> 3</div> },

            position: positions.data3,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data4",
            data: { label: <div> 4</div> },

            position: positions.data4,

            style: { width: "500px", height: "50px" },
        },

        {
            id: "data5",
            data: { label: <div> 1</div> },
            position: positions.data5,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data6",
            data: { label: <div> 2</div> },

            position: positions.data6,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data7",
            data: { label: <div> 3</div> },

            position: positions.data7,

            style: { width: "500px", height: "50px" },
        },
        {
            id: "data8",
            data: { label: <div> 4</div> },

            position: positions.data8,

            style: { width: "500px", height: "50px" },
        },

        {
            id: "TM2",
            position: positions.TM2,
            type: "custom",
            data: {
                label: <div>TM </div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(DemoEdges);
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
    return (
        <div>
            <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button>

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
                    // nodesDraggable={false} // Cho phép kéo thả các nút
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
