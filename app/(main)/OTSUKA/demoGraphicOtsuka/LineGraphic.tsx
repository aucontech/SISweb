import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./demoFlowOTS.css";
import BallValue01 from "../ReactFlow/BallValue01";
import BallValue02 from "../ReactFlow/BallValue02";
import BallValue07 from "../ReactFlow/BallValue07";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ffaa00";

export default function LineGraphic() {

    const storedPositionString = localStorage.getItem("positionsDemo");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              BallValue01: { x: -1128.037821602239, y: 1191.6262752572804 },
              line1: { x: -1216.4118252175665, y: 1045.059045857194 },
              line2: { x: -824.7490621134568, y: 1045.059045857194 },
              line3: { x: -1000.7490621134568, y: 1045.059045857194 },
              line7: { x: -1000.7490621134568, y: 1045.059045857194 },
              line9: { x: -1000.7490621134568, y: 1045.059045857194 },
            
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);


    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const [isAnimated2, setIsAnimated2] = useState<boolean>(false);
    const [isAnimated7, setIsAnimated7] = useState<boolean>(false);

    const lineColor = "#ffaa00"; // Màu sắc mặc định


    const handleIsAnimatedChange = (value: boolean) => {
        setIsAnimated(value);
    };
    const handleIsAnimatedChange2 = (value: boolean) => {
        setIsAnimated2(value);
    };


    const handleIsAnimatedChange7 = (value: boolean) => {
        setIsAnimated7(value);
    };
    useEffect(() => {
        const updatedEdges1 = edgeS1.map((edge) => ({
            ...edge,
            animated: isAnimated,
            style: {
                strokeWidth: isAnimated ? 5 : 20,
                stroke: isAnimated ? "green" : lineColor,
            },
        }));

        // const updatedEdges2 = edgeS2.map((edge) => ({
        //     ...edge,
        //     animated: isAnimated2,
        //     style: {
        //         strokeWidth: isAnimated2 ? 5 : 20,
        //         stroke: isAnimated2 ? "green" : lineColor,
        //     },
        // }));

        const allEdges = [...updatedEdges1, ...edgeS7]; // edgesS7 không thay đổi

        setEdges(allEdges);
    }, [isAnimated, isAnimated2]);
  
    const edgeS1 = [
        {
            id: "line1-line2",
            source: "line1",
            target: "line2",
            animated: isAnimated,
            type: "smoothstep",
    
            style: {
                strokeWidth: 20,
                stroke: "#ffaa00",
            },
        },
        {
            id: "line2-line3",
            source: "line2",
            target: "line3",
            animated: isAnimated,
            type: "smoothstep",
    
            style: {
                strokeWidth: 20,
                stroke: "#ffaa00",
            },
        },
       
    ]
    const edgeS2 = [
     
        {
            id: "line2-line3",
            source: "line2",
            target: "line3",
            animated: isAnimated2,
            type: "smoothstep",
    
            style: {
                strokeWidth: 20,
                stroke: "#ffaa00",
            },
        },
    ]

    const edgeS7 = [
     
        {
            id: "line3-line7",
            source: "line3",
            target: "line7",
            animated: false,
            type: "smoothstep",
    
            style: {
                strokeWidth: 20,
                stroke: "#ffaa00",
            },
        },

        {
            id: "line7-line9",
            source: "line7",
            target: "line9",
            animated: false,
            type: "smoothstep",
    
            style: {
                strokeWidth: 20,
                stroke: "#ffaa00",
            },
        },
    ]
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
            style: { border: "none", width: 30, height: 10, background: line },
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
            style: { border: "none", width: 30, height: 10, background: line },
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
            style: { border: "none", width: 30, height: 10, background: line },
        },

        
        // {
        //     id: "BallValue01",
        //     position: positions.BallValue01,
        //     type: "custom",
        //     data: {
        //         label: <div>
        //                 <BallValue01 onDataLine1={handleIsAnimatedChange} />

        //         </div>,
        //     },
 
        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: { border: "none", width: 30, height: 10, background: line },
        // },
        // {
        //     id: "BallValue02",
        //     position: positions.BallValue02,
        //     type: "custom",
        //     data: {
        //         label: <div>
        //                 <BallValue02 onDataLine2={handleIsAnimatedChange2} />

        //         </div>,
        //     },
 
        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: { border: "none", width: 30, height: 10, background: line },
        // },
        {
            id: "BallValue07",
            position: positions.BallValue07,
            type: "custom",
            data: {
                label: <div>
                        <BallValue07 onDataLine7={handleIsAnimatedChange7} />

                </div>,
            },
 
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
    ]);

 

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([...edgeS1, ...edgeS2,]);


    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );
              
                 if (id === "line1") {
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
                }   else if (id === "line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line7: position,
                    }));
                }  else if (id === "line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line9: position,
                    }));
                } 
                
                else if (id === "BallValue01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue01: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );


    useEffect(() => {
        localStorage.setItem("positionsDemo", JSON.stringify(positions));
    }, [positions]);

 
    return (
        <div>
          
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
                    onNodeDragStop={onNodeDragStop}
                    // nodesDraggable={false} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.5}
                    maxZoom={2}
                >
                    <Controls style={{ position: "absolute", top: 0 }} />

                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
