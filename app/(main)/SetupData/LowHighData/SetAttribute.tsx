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
import { Calendar } from 'primereact/calendar';

export default function SetAttribute() {
    const [sensorData, setSensorData] = useState<any>([]);
    const toast = useRef<Toast>(null);

    const [upData, setUpData] = useState<any>([]);
    const [upTS, setUpTS] = useState<any>([]);
    const [upData2, setUpData2] = useState<any>([]);
    const [upData3, setUpData3] = useState<any>([]);
    const [getWayPhoneOTSUKA,setGetWayPhoneOTSUKA] = useState<any>()

    const [timeEVC_01,setTimeEVC_01] = useState<any>()
    const [timeEVC_02,setTimeEVC_02] = useState<any>()


    const [timeEVC_03,setTimeEVC_03] = useState<any>()
    const [timeEVC_04,setTimeEVC_04] = useState<any>()


    const [inputValue, setInputValue] = useState<any>();
    const [inputValue2, setInputValue2] = useState<any>();
    const [inputValue3, setInputValue3] = useState<any>();
    const [ inputGetwayPhone, setInputGetwayPhone] = useState<any>()


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
                            {
                                type: "ATTRIBUTE",
                                key: "IOT_Gateway_Phone",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_01_Battery_Expiration_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_01_Battery_Installation_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_02_Battery_Expiration_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_02_Battery_Installation_Date",
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
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_02",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_01",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "IOT_Gateway_Phone",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_01_Battery_Expiration_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_01_Battery_Installation_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_02_Battery_Expiration_Date",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "EVC_02_Battery_Installation_Date",
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_01?.value;
                    setUpData(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_01?.value;
                    setUpData(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue2 =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_02?.value;
                    setUpData2(ballValue2);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData2 =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_02?.value;

                    setUpData2(updatedData2);
                }
                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue3 =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_01?.value;
                    setUpData3(ballValue3);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData3 =
                        dataReceived.update[0].latest.ATTRIBUTE?.PSV_01?.value;

                    setUpData3(updatedData3);
                }

                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ballValue3 =
                        dataReceived.data.data[0].latest.ATTRIBUTE.IOT_Gateway_Phone.value;
                        setGetWayPhoneOTSUKA(ballValue3);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData3 =
                        dataReceived.update[0].latest.ATTRIBUTE.IOT_Gateway_Phone.value;

                        setGetWayPhoneOTSUKA(updatedData3);
                }
                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ValueTIME1 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_01_Battery_Expiration_Date.value;
                    setTimeEVC_01(ValueTIME1);

                    const ValueTIME2 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_01_Battery_Installation_Date.value;
                    setTimeEVC_02(ValueTIME2);
                } else if (dataReceived.update && dataReceived.update.length > 0) {
                    const ValueTIME1 = dataReceived.update[0].latest.ATTRIBUTE.EVC_01_Battery_Expiration_Date.value;
                    setTimeEVC_01(ValueTIME1);

                    const ValueTIME2 = dataReceived.update[0].latest.ATTRIBUTE.EVC_01_Battery_Installation_Date.value;
                    setTimeEVC_02(ValueTIME2);
                }

                if (dataReceived.data && dataReceived.data.data.length > 0) {
                    const ValueTIME1 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_02_Battery_Expiration_Date.value;
                    setTimeEVC_03(ValueTIME1);

                    const ValueTIME2 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_02_Battery_Installation_Date.value;
                    setTimeEVC_04(ValueTIME2);
                } else if (dataReceived.update && dataReceived.update.length > 0) {
                    const ValueTIME1 = dataReceived.update[0].latest.ATTRIBUTE.EVC_02_Battery_Expiration_Date.value;
                    setTimeEVC_03(ValueTIME1);

                    const ValueTIME2 = dataReceived.update[0].latest.ATTRIBUTE.EVC_02_Battery_Installation_Date.value;
                    setTimeEVC_04(ValueTIME2);
                }
            };
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PCV_01: inputValue, PCV_02: inputValue2, PSV_01: inputValue3,IOT_Gateway_Phone: inputGetwayPhone, 
                     EVC_01_Battery_Expiration_Date: timeEVC_01,
                    EVC_01_Battery_Installation_Date: timeEVC_02,
                    EVC_02_Battery_Expiration_Date: timeEVC_03,
                    EVC_02_Battery_Installation_Date: timeEVC_04, }
            );
            setUpData(inputValue);
            setUpData2(inputValue2);
            setUpData3(inputValue3);
            setGetWayPhoneOTSUKA(inputGetwayPhone);

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
        setInputGetwayPhone(getWayPhoneOTSUKA)

    }, [upData, upData2, upData3,getWayPhoneOTSUKA,timeEVC_01,timeEVC_02]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue2(newValue);
    };
    const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue3(newValue);
    };

    const handleInputChangeGetWayPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputGetwayPhone(newValue);
    };

    const timeEVC_01Number = parseFloat(timeEVC_01);
    const date = !isNaN(timeEVC_01Number) ? new Date(timeEVC_01Number) : null;

    const timeEVC_02Number = parseFloat(timeEVC_02);
    const date2 = !isNaN(timeEVC_02Number) ? new Date(timeEVC_02Number) : null;

    const timeEVC_03Number = parseFloat(timeEVC_03);
    const date3 = !isNaN(timeEVC_03Number) ? new Date(timeEVC_03Number) : null;

    const timeEVC_04Number = parseFloat(timeEVC_04);
    const date4 = !isNaN(timeEVC_04Number) ? new Date(timeEVC_04Number) : null;

    const handleDateChange = (e: any) => {
        const selectedDate = e.value;
        setTimeEVC_02(selectedDate.getTime());

        const expirationDate = new Date(selectedDate);
        expirationDate.setMonth(expirationDate.getMonth() + 18);
        setTimeEVC_01(expirationDate.getTime());
    };

    const handleDateChange2 = (e: any) => {
        const selectedDate = e.value;
        setTimeEVC_03(selectedDate.getTime());

        const expirationDate = new Date(selectedDate);
        expirationDate.setMonth(expirationDate.getMonth() + 18);
        setTimeEVC_04(expirationDate.getTime());
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

    const configurationName ={
        PSV: "Pressure Safety Valve ( PSV-1901)" ,
        PCV1: "Pressure Control Valve (PCV-1901)",
        PCV2: "Pressure Control Valve (PCV-1902)",
        IOT: "IOT getway phone number",
        EVC_01_Battery_Expiration_Date: "EVC-1901 Battery Expiration Date",
        EVC_01_Battery_Installation_Date: "EVC-1901 Battery Installation Date",

        EVC_02_Battery_Expiration_Date: "EVC-1902 Battery Expiration Date",
        EVC_02_Battery_Installation_Date: "EVC-1902 Battery Installation Date"

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

        {
            Name: <span style={combineCss.PCV}>{configurationName.IOT} </span>,

            Value: (
                <InputText
                    style={combineCss.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
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
            Name: (
                <span style={combineCss.PCV}>
                    {configurationName.EVC_01_Battery_Installation_Date}
                </span>
            ),
          
            Value: (
                <Calendar
                    style={combineCss.PCV}
                    value={date2}
                    onChange={handleDateChange}

                    showTime={false}
                    inputId="timeEVC_02"
                    dateFormat="dd-mm-yy"
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
            Name: (
                <span style={combineCss.PCV}>
                    {configurationName.EVC_01_Battery_Expiration_Date}
                </span>
            ),
          
         
            Value: (
                <Calendar
                
                    style={combineCss.PCV}
                    value={date}
                    disabled

                    showTime={false}
                    inputId="timeEVC_01"
                    dateFormat="dd-mm-yy"
                />
            ),
            Update: (
                <Button
                    className="buttonUpdateSetData"

                    disabled
                    style={{ marginTop: 5,cursor:"no-drop" }}
                    label="Update"
                />
            ),
           
        },

        {
            Name: (
                <span style={combineCss.PCV}>
                    {configurationName.EVC_02_Battery_Installation_Date}
                </span>
            ),
          
            Value: (
                <Calendar
                    style={combineCss.PCV}
                    value={date3}
                    onChange={handleDateChange2}

                    showTime={false}
                    inputId="timeEVC_02"
                    dateFormat="dd-mm-yy"
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
            Name: (
                <span style={combineCss.PCV}>
                    {configurationName.EVC_02_Battery_Expiration_Date}
                </span>
            ),
            
            Value: (
                <Calendar
                
                    style={combineCss.PCV}
                    value={date4}
                    disabled

                    showTime={false}
                    inputId="timeEVC_01"
                    dateFormat="dd-mm-yy"
                />
                
            ),
            Update: (
                <Button
                    className="buttonUpdateSetData"
                    
                    disabled
                    style={{ marginTop: 5,cursor:"no-drop" }}
                    label="Update"
                />
            ),
           
        },
    ];
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Chuyển đổi chuỗi "01-03-2024" thành đối tượng Date
        const dateString = "01-03-2024";
        const parts = dateString.split('-');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
        const day = parseInt(parts[0], 10);
        const dateObject :any = new Date(year, month, day);
    
        setSelectedDate(dateObject);
      }, []);
    return (
        <div>
            <Toast ref={toast} />

            <div style={{ width: "100%",  borderRadius: 5 }}>
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
