import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import { station } from "./ReactFlow/IconOTSUKA";
import { readToken } from "@/service/localStorage";
import { OverlayPanel } from "primereact/overlaypanel";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export default function FlowRR() {
    const [editingEnabled, setEditingEnabled] = useState(false);
    const toast = useRef<Toast>(null);

    const op = useRef(null);

    const initialPositions = {
        sation: { x: 17, y: 574 },
        station1: { x: 40, y: 200 },
        ball: { x: 40, y: 200 },
    };

    const [positions, setPositions] = useState(initialPositions);
    const [sensorData, setSensorData] = useState<any>([]);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);

    const token = readToken();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj2 = {
            entityDataCmds: [
                {
                    cmdId: 1,
                    latestCmd: {
                        keys: [
                            {
                                type: "ATTRIBUTE",
                                key: "BallValue_01",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: "64b66840-e052-11ee-9ac9-8d2a3ceebd3a",
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
                                key: "BallValue_01",
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
                    ws.current?.send(JSON.stringify(obj2));
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
                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_01
                            .value;
                    setUpData(ballValue);

                    const ballTS =
                        dataReceived.data.data[0].latest.ATTRIBUTE.BallValue_01
                            .ts;
                    setUpTS(ballTS);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_01
                            .value;
                    const updateTS =
                        dataReceived.update[0].latest.ATTRIBUTE.BallValue_01.ts;

                    setUpData(updatedData);
                    setUpTS(updateTS);
                } else {
                    console.log("Invalid data received or no data available.");
                }
            };
        }
    }, []);

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
                        ></p>
                        {station}
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        },
    ]);
    const styleLine = {
        strokeWidth: 5,
        stroke: "#FFF",
    };

    const initialEdges = [
        {
            id: "station-station",
            source: "station1",
            target: "station",
            animated: true,
            markerStart: "myCustomSvgMarker",
            style: {
                ...styleLine,
            },
        },
    ];

    const handleButtonClick = async () => {
        try {
            const newValue = !sensorData;
            await httpApi.post(
                "/plugins/telemetry/DEVICE/64b66840-e052-11ee-9ac9-8d2a3ceebd3a/SERVER_SCOPE",
                { BallValue_01: newValue }
            );
            setSensorData(newValue);
            setUpData(newValue);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "station") {
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
                                <button
                                    style={{
                                        width: 50,
                                        height: 50,
                                        cursor: "pointer",
                                        borderRadius: 10,
                                        border: "1px solid white",
                                    }}
                                    onClick={confirm2}
                                >
                                    {sensorData}
                                </button>
                            </div>
                        ),
                    },
                };
            }

            return node;
        });
        setNodes(updatedNodes);
    }, [sensorData, upData]);

    const confirm2 = () => {
        // xác nhận có delete notification
        confirmDialog({
            message: "Do you want to change this status?",
            header: "Status Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => handleButtonClick(),
        });
    };
    useEffect(() => {
        if (!editingEnabled) {
            setTimeout(() => {
                setPositions({
                    ...positions,
                    ball: positions.sation,
                });
            }, 1000);
        }
    }, [editingEnabled, positions]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <button
                style={{
                    width: 50,
                    height: 50,
                    cursor: "pointer",
                    borderRadius: 10,
                    border: "1px solid white",
                }}
                onClick={confirm2}
            >
                {upData ? "ON" : "OFF"}
            </button>
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <Controls />
                    <Background style={{ backgroundColor: "#bce4f5" }} />
                </ReactFlow>
            </div>
        </div>
    );
}
