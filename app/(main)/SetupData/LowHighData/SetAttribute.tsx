import { httpApi } from "@/api/http.api";
import { readToken } from "@/service/localStorage";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useEffect, useRef, useState } from "react";
import "./LowHighOtsuka.css";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function SetAttribute() {
    const [sensorData, setSensorData] = useState<any>([]);
    const toast = useRef<Toast>(null);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);
    const [upData2, setUpData2] = useState<any>([]);
    const [upData3, setUpData3] = useState<any>([]);

    const [inputValue, setInputValue] = useState<any>();
    const [inputValue2, setInputValue2] = useState<any>();
    const [inputValue3, setInputValue3] = useState<any>();

    const token = readToken();
    const op = useRef<OverlayPanel>(null);

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
                                key: "PCV_01",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_02",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_01",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
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
                                key: "PCV_01",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_02",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_01",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_01.value;
                    setUpData(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_01.value;
                    setUpData(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue2 =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_02.value;
                    setUpData2(ballValue2);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData2 =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_02.value;

                    setUpData2(updatedData2);
                }
                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue3 =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_01.value;
                    setUpData3(ballValue3);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData3 =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_01.value;

                    setUpData3(updatedData3);
                }
            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PCV_01: inputValue, PCV_02: inputValue2, PSV_01: inputValue3 }
            );
            setUpData(inputValue);
            setUpData2(inputValue2);
            setUpData3(inputValue3);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
        } catch (error) {
            console.log("error: ", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Message Content",
                life: 3000,
            });
        }
    };

    useEffect(() => {
        setInputValue(upData);
        setInputValue2(upData2);
        setInputValue3(upData3);
    }, [upData, upData2, upData3]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value; // Giữ nguyên chuỗi đầu vào
        setInputValue(newValue);
    };

    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value; // Giữ nguyên chuỗi đầu vào
        setInputValue2(newValue);
    };
    const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value; // Giữ nguyên chuỗi đầu vào
        setInputValue3(newValue);
    };

    const confirmUpData = () => {
        confirmDialog({
            message: "Are you sure you updated the data?",
            header: "Confirmation",
            icon: "pi pi-info-circle",
            accept: () => handleButtonClick(),
        });
    };
    const combineCss = {
        PCV: {
            height: 25,
            fontWeight: 400,
            padding: 10,
        },
    };

    const configurationName ={
        PSV: "Pressure Safety Valve ( PSV-1901)" ,
        PCV1: "Pressure Control Valve (PCV-1901)",
        PCV2: "Pressure Control Valve (PCV-1902)",
    }

    const configuration = [
        {
            Name: <span style={combineCss.PCV}>{configurationName.PCV1} (BarG) </span>,

            Value: (
                <InputText
                    style={combineCss.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCss.PCV}>{configurationName.PCV2} (BarG) </span>,

            Value: (
                <InputText
                    style={combineCss.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputValue2}
                    onChange={handleInputChange2}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCss.PCV}>{configurationName.PSV} (BarG) </span>,

            Value: (
                <InputText
                    style={combineCss.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputValue3}
                    onChange={handleInputChange3}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },
    ];

    return (
        <div>
            <Toast ref={toast} />

            <div style={{ width: "100%", padding: 5, borderRadius: 5 }}>
                <h4>Station - configuration </h4>
                <DataTable value={configuration} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    <Column field="Update" header="Update" />
                </DataTable>
            </div>
        </div>
    );
}
