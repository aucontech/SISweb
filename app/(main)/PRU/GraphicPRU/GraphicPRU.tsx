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
import { PTV } from "./iconSVG";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ff7f00";
export const line2 = "#ffaa00";
export const line3 = "#ffe900";

export default function GraphicPRU() {
    const storedPositionString = localStorage.getItem("positionPRU");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              BallVavleLine2_Bottom: {
                  x: -1704.7388471521438,
                  y: 1481.8303136006748,
              },
              BallVavleLine2_Bottom_none: {
                  x: -1688.5252190609085,
                  y: 1171.6462752096652,
              },
              BallVavleLine2_Top: {
                  x: -1702.3743654024242,
                  y: 1140.1537264792937,
              },
              BallVavleLine2_Top_none: {
                  x: -1690.9098093225805,
                  y: 1512.8588877121745,
              },
              PCV_line1_Bottom: { x: -2059.1303743954895, y: 1124.89430757521 },
              PCV_line1_Top: { x: -2063.586031897838, y: 1465.9672706188692 },
              PCV_line2_Bottom: {
                  x: -1591.8141450374405,
                  y: 1126.5496618578609,
              },
              PCV_line2_Top: { x: -1591.330484732139, y: 1466.4783649502676 },
              PIT_6001A_IMG: { x: -2349.366805384612, y: 1410.874739139494 },
              PIT_6001B_IMG: { x: -2325.0596312479825, y: 1068.1877137613621 },

              PIT_6001A_COL: { x: -2349.366805384612, y: 1410.874739139494 },
              PIT_6001B_COL: { x: -2325.0596312479825, y: 1068.1877137613621 },

              PIT_6002A_IMG: { x: -1977.3668053846118, y: 1422.874739139494 },
              PIT_6002B_IMG: { x: -1981.0596312479825, y: 1078.1877137613621 },

              PIT_6002A_COL: { x: -1977.3668053846118, y: 1422.874739139494 },
              PIT_6002B_COL: { x: -1981.0596312479825, y: 1078.1877137613621 },


              bor1: { x: -2700.9096316888476, y: 759.3243394936028 },
              bor2: { x: -363.1512218888312, y: 767.8994423073616 },
              bor3: { x: -2684.8078213113167, y: 1892.894788044694 },
              bor4: { x: -356.4329469573597, y: 1859.0590100592938 },
              line1: { x: -2407.8045111487268, y: 1756.5941055869862 },
              line2: { x: -2408.0452046659693, y: 1558.901078166144 },
              line3: { x: -2030.3972526578927, y: 1171.9004583712474 },
              line4: { x: -2033.455135048047, y: 1512.635009158724 },
              line5: { x: -1561.8938529953525, y: 1171.7448374950038 },
              line6: { x: -1559.7769633031824, y: 1512.7897157412472 },
              line7: { x: -1096.283265291935, y: 1171.7678508198076 },
              line8: { x: -1097.3668053846118, y: 1512.874739139494 },
              line9: { x: -857.0596312479826, y: 1340.1877137613621 },



              
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================
        {
            id: "bor1",
            position: positions.bor1,
            type: "custom",
            data: {
                label: <div>b1</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor2",
            position: positions.bor2,
            type: "custom",
            data: {
                label: <div>b2</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor3",
            position: positions.bor3,
            type: "custom",
            data: {
                label: <div>b3</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor4",
            position: positions.bor4,
            type: "custom",
            data: {
                label: <div>b4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },

        //==================================================================
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div>1</div>,
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
                label: <div>2</div>,
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
                label: <div>3</div>,
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
                label: <div>4</div>,
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
                label: <div>5</div>,
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
                label: <div>6</div>,
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
                label: <div>7</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
        },

        //==========================Ball vavle ==========================
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

        //==========================Ball vavle ==========================

        {
            id: "PCV_line2_Top",
            position: positions.PCV_line2_Top,
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
            id: "PCV_line2_Bottom",
            position: positions.PCV_line2_Bottom,
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
                }

                //======================= BallVavle ====================================
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
                //======================= BallVavle ====================================
                else if (id === "PCV_line2_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top: position,
                    }));
                } else if (id === "PCV_line2_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom: position,
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
                }

                //======================= BallVavle ====================================
                else if (id === "PIT_6002A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_IMG: position,
                    }));
                } else if (id === "PIT_6002B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_IMG: position,
                    }));
                } else if (id === "PIT_6001A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_IMG: position,
                    }));
                } else if (id === "PIT_6001B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_IMG: position,
                    }));
                }


                else if (id === "PIT_6002A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_COL: position,
                    }));
                } else if (id === "PIT_6002B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_COL: position,
                    }));
                } else if (id === "PIT_6001A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_COL: position,
                    }));
                } else if (id === "PIT_6001B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_COL: position,
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
        localStorage.setItem("positionPRU", JSON.stringify(positions));
    }, [positions]);

    return (
        <>
            <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button>
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
                    // nodesDraggable={true} // Cho phép kéo thả các nút
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
