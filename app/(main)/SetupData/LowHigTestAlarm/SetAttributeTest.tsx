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
import {  confirmDialog } from "primereact/confirmdialog";
import {   UserOperator, UserTechnican} from "../../userID/UserID";

export default function SetAttributeTest() {
    const toast = useRef<Toast>(null);
    const [upData, setUpData] = useState<any>([]);
    const [inputValue, setInputValue] = useState<any>();
    const token = readToken();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const ws = useRef<WebSocket | null>(null);

    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : null;
    const userId = userData?.id?.id;
    const AuthUpdate = userId === UserTechnican.A  ||
     userId === UserTechnican.Q ||
      userId ===  UserTechnican.N ||
       userId === UserTechnican.T  ||
        userId === UserTechnican.TN ||
         userId === UserTechnican.DT ;


    const AuthInput = userId !== UserTechnican.A  || 
    userId !== UserTechnican.Q ||
     userId !==  UserTechnican.N ||
      userId !== UserTechnican.T  ||
       userId !== UserTechnican.TN ||
         userId !== UserTechnican.DT ||
         userId !== UserOperator.VHPM3 ||
         userId !== UserOperator.TTVHpm3 ; 
         

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
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_OTSUKA,
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
                    const ballValue = dataReceived.data.data[0].latest.ATTRIBUTE.PCV_01?.value;
                    setUpData(ballValue);
                } else if (dataReceived.update && dataReceived.update.length > 0) {
                    const updatedData = dataReceived.update[0].latest.ATTRIBUTE.PCV_01?.value;
                    setUpData(updatedData);
                }
            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PCV_01: inputValue }
            );
            setUpData(inputValue);

            toast.current?.show({
                severity: "info",
                detail: "Success",
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
    }, [upData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
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
        },
    };

    const configurationName = {
        PCV1: "Pressure Control Valve (PCV-1901)",
    };

    const configuration = [
        {
            Name: <span style={combineCss.PCV}>{configurationName.PCV1} (BarG)</span>,
            Value: (
                <InputText
                    style={combineCss.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    inputMode="decimal"
                    disabled={AuthInput}
                    
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

            <div style={{ width: "100%", borderRadius: 5 }}>
                <h4>Station - Configuration</h4>
                <DataTable value={configuration} size={"small"} selectionMode="single">
                    <Column  field="Name" header="Name" />
                    <Column field="Value" header="Value"  />

                    {AuthUpdate ?  <Column field="Update" header="Update" />  : " "}
                </DataTable>
            </div>


        </div>
    );
}
