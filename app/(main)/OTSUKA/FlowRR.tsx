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

import { readToken } from "@/service/localStorage";
import { id_OTSUKA } from "../data-table-device/ID-DEVICE/IdDevice";
import { station } from "./ReactFlow/IconOTSUKA";
import { initialEdges } from "./ReactFlow/initalsEgdes";
import { OverlayPanel } from "primereact/overlaypanel";
interface StateMap {
    [key: string]: React.Dispatch<React.SetStateAction<string | null>> | undefined;
  }

export default function FlowRR() {
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  
const [data, setData] = useState<any[]>([]);

const [sensorData, setSensorData] = useState<any>([]); // State để lưu trữ dữ liệu cảm biến

    const token = readToken()
    const url = `${process.env.baseUrlWebsocketTelemetry}${token}`;
    const [flowRate, setFlowRate] = useState<any>([]);
    const [pipePressure, setPipePressure] = useState<string | null>(null);

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
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
                setIsWebSocketConnected(true);
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setIsWebSocketConnected(false);

            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, [url]);
    
    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        'Flow_Rate_AI': setFlowRate,
                        'Pipe_Pressure_AI': setPipePressure,
                     
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
    const updatedNodes = nodes.map(node => {
     
        if (node.id === "station") {
            return {
                ...node,
                data: {
                    ...node.data,
                    label: <div>{flowRate}</div>
                }
            };
        }
        if (node.id === "station1") {
            return {
                ...node,
                data: {
                    ...node.data,
                    label: <div>{pipePressure}</div>
                }
            };
        }
        return node;

    });
    setNodes(updatedNodes);

}, [flowRate,pipePressure]);

 const initialPositions = {
        sation: { x: 17, y: 574 },
        station1: { x: 40, y: 200 },
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
                        {" "}
                        <p
                            style={{
                                fontSize: 20,
                                color: "green",
                                fontWeight: 500,
                            }}
                        >
                            Gas in
                        </p>
                        {station}

                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
        {
            id: "station1",
            position: positions.station1,
            type: "custom",
            data: {
                label: (
                    <div>
                        {" "}
                        <p
                            style={{
                                fontSize: 20,
                                color: "green",
                                fontWeight: 500,
                            }}
                        >
                            Gas in
                        </p>
                        {station}

                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
     
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    const paragraphContents: Record<string, string> = {
        FRA: 'Flow Rate AI',
        PPA: 'Pipe Pressure AI',
        LLA: 'Liquie Lever AI',
        TPA: 'Tank Pressure AI',
        S01A: 'Spare 01 AI',
        S02A: 'Spare 02 AI',
        S03A: 'Spare 03 AI',
        S04A: 'Spare 04 AI',
        T01A: 'Temperature_01_AI',
        T02A: 'Temperature_02_AI',
        S01D: 'Solenoid 01 DO'
    };
    return (
        <div>
            <div style={{padding:15, display:'flex', justifyContent:"space-between"}}>
                <div>
                    <p style={{fontSize:25,fontWeight:500}} >EWON OTSUKA</p>
                </div>
                
                <div style={{width:25, height:30, textAlign:'center', cursor:'pointer'}}>
                    <p style={{border:'2px solid black', borderRadius:50, fontWeight:600}} onClick={(e:any) => op.current?.toggle(e)} > ?</p>
                    <OverlayPanel style={{width:300, fontWeight:500, fontSize:17}} ref={op}>
                        {Object.keys(paragraphContents).map((key:string, index:number) => (
                            <p key={index}>{key} - {paragraphContents[key]}</p>
                        ))}
                    </OverlayPanel>
                </div>
          </div>
            <div
                style={{ width: "100%", height: "100vh", position: "relative",  overflow:'hidden', alignItems:'center' }}
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

{isWebSocketConnected ? (
                <div>
                   1
                </div>
            ) : (
                <div>
                    2
                </div>
            )}

                <ReactFlow

                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    // nodesDraggable={false} // Cho phép kéo thả các nút
                
                >
                    <Controls/>
                    <Background style={{ backgroundColor: "#bce4f5" }} />
                </ReactFlow>


            </div>
        </div>
    );
}