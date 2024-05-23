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


interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ffaa00";

export default function GraphicPRU() {

    const storedPositionString = localStorage.getItem("positionPRU");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {


            bor1: { x: -1216.4118252175665, y: 1045.059045857194 },
            bor2: { x: -1216.4118252175665, y: 1045.059045857194 },
            bor3: { x: -1216.4118252175665, y: 1045.059045857194 },
            bor4: { x: -1216.4118252175665, y: 1045.059045857194 },
             
              line1: { x: -1216.4118252175665, y: 1045.059045857194 },
              line2: { x: -1216.4118252175665, y: 1045.059045857194 },
              line3: { x: -1216.4118252175665, y: 1045.059045857194 },
              line4: { x: -1216.4118252175665, y: 1045.059045857194 },
              line5: { x: -1216.4118252175665, y: 1045.059045857194 },
              line6: { x: -1216.4118252175665, y: 1045.059045857194 },
            
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
            style: { border: "none", width: 20, height: 10, background: line },
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
            style: { border: "none", width: 30, height: 10, background: line },
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
            style: { border: "none", width: 30, height: 10, background: line },
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
                } 
                else if (id === "bor3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor3: position,
                    }));
                } else if (id === "bor4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor4: position,
                    }));
                } 
                else if (id === "line1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line1: position,
                    }));
                } else if (id === "line2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line2: position,
                    }));
                } 
                else if (id === "line3") {
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
                    // onNodeDragStop={onNodeDragStop}
                    nodesDraggable={true} // Cho phép kéo thả các nút
                    fitView={true}
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
