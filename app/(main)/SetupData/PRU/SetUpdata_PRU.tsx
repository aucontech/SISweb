import React, { useEffect, useRef, useState } from 'react'
import { id_CNG_PRU, } from '../../data-table-device/ID-DEVICE/IdDevice';
import { Toast } from 'primereact/toast';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import "./LowHighOtsuka.css"
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { nameValue } from '../namValue';
import { C } from '@fullcalendar/core/internal-common';

interface StateMap {

    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;

}

interface ValueStateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
export default function SetUpdata_PRU() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);

    const toast = useRef<Toast>(null);
    const [EVC_STT01Value, setEVC_STT01Value] = useState<string | null>(null);
    const [EVC_STT02Value, setEVC_STT02Value] = useState<string | null>(null);
    const [PLC_STTValue, setPLC_STTValue] = useState<string | null>(null);
    const [getWayPhoneOTSUKA,setGetWayPhoneOTSUKA] = useState<any>()
    const [ inputGetwayPhone, setInputGetwayPhone] = useState<any>()


    const [PCV_6001A,setPCV_6001A] = useState<any>()
    const [inputPCV_6001A, setInputPCV_6001A] = useState<any>();

    const [PCV_6001B,setPCV_6001B] = useState<any>()
    const [inputPCV_6001B, setInputPCV_6001B] = useState<any>();

    const [PCV_6002A,setPCV_6002A] = useState<any>()
    const [inputPCV_6002A, setInputPCV_6002A] = useState<any>();

    const [PCV_6002B,setPCV_6002B] = useState<any>()
    const [inputPCV_6002B, setInputPCV_6002B] = useState<any>();


    const [PSV_6001A,setPSV_6001A] = useState<any>()
    const [inputPSV_6001A, setInputPSV_6001A] = useState<any>();

    const [PSV_6001B,setPSV_6001B] = useState<any>()
    const [inputPSV_6001B, setInputPSV_6001B] = useState<any>();

    const [PSV_6002A,setPSV_6002A] = useState<any>()
    const [inputPSV_6002A, setInputPSV_6002A] = useState<any>();

    const [PSV_6002B,setPSV_6002B] = useState<any>()
    const [inputPSV_6002B, setInputPSV_6002B] = useState<any>();

    const [timeEVC_01,setTimeEVC_01] = useState<any>()
    const [timeEVC_02,setTimeEVC_02] = useState<any>()


    const [timeEVC_03,setTimeEVC_03] = useState<any>()
    const [timeEVC_04,setTimeEVC_04] = useState<any>()
    useEffect(() => {

        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_CNG_PRU,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };
        const obj_PCV_PSV = {
            entityDataCmds: [
                {
                    cmdId: 1,
                    latestCmd: {
                        keys: [
                            {
                                type: "ATTRIBUTE",
                                key: "IOT_Gateway_Phone",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002B",
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
                                id: id_CNG_PRU,
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
                                key: "IOT_Gateway_Phone",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_6002B",
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
                    ws.current?.send(JSON.stringify(obj1));
                    ws.current?.send(JSON.stringify(obj_PCV_PSV));

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
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object?.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Remain_Battery_Service_Life: setEVC_01_Remain_Battery_Service_Life,

                        EVC_01_Temperature: setEVC_01_Temperature,
                        EVC_01_Pressure: setEVC_01_Pressure,
                        EVC_01_Volume_at_Base_Condition: setEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition: setEVC_01_Volume_at_Measurement_Condition,
                        EVC_01_Flow_at_Base_Condition: setEVC_01_Flow_at_Base_Condition,

                        EVC_01_Flow_at_Measurement_Condition: setEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Vb_of_Current_Day: setEVC_01_Vb_of_Current_Day,
                        EVC_01_Vm_of_Current_Day: setEVC_01_Vm_of_Current_Day,

                        EVC_01_Vb_of_Last_Day: setEVC_01_Vb_of_Last_Day,



                        EVC_01_Vm_of_Last_Day: setEVC_01_Vm_of_Last_Day,

                        EVC_02_Remain_Battery_Service_Life: setEVC_02_Remain_Battery_Service_Life,
                        EVC_02_Temperature: setEVC_02_Temperature,


                        EVC_02_Pressure: setEVC_02_Pressure,

                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,

                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Vb_of_Current_Day: setEVC_02_Vb_of_Current_Day,
                        EVC_02_Vm_of_Current_Day: setEVC_02_Vm_of_Current_Day,
                        EVC_02_Vb_of_Last_Day:setEVC_02_Vb_of_Last_Day,

                        EVC_02_Vm_of_Last_Day:setEVC_02_Vm_of_Last_Day,

                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume: setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume: setFC_01_Yesterday_Values_Volume,
                        FC_01_Yesterday_Values_Uncorrected_Volume:setFC_01_Yesterday_Values_Uncorrected_Volume,

                        PIT_6001A: setPIT_6001A,
                        PIT_6001B: setPIT_6001B,
                        PIT_6002A: setPIT_6002A,
                        PIT_6002B: setPIT_6002B,
                        PIT_6003A: setPIT_6003A,
                        TIT_6001A: setTIT_6001A,

                        TIT_6002: setTIT_6002,
                        GD_6001: setGD_6001,
                        SDV_6001A: setSDV_6001A,

                        SDV_6001B: setSDV_6001B,
                        SDV_6002: setSDV_6002,

                        Water_PG: setWater_PG,
                        Water_LSW: setWater_LSW,


                        PUMP_1: setPUMP_1,
                        PUMP_2: setPUMP_2,
                        
                        HEATER_1: setHEATER_1,
                        HEATER_2: setHEATER_2,

                        HEATER_3: setHEATER_3,
                        BOILER: setBOILER,
                        GD_STATUS: setGD_STATUS,


                        ESD: setESD,
                        HR_BC: setHR_BC,
                        SD: setSD,
                        PT_6004: setPT_6004,
                        PUMP_3: setPUMP_3,
                        SDV_6003: setSDV_6003,


                  
                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
                        EVC_02_Conn_STT: setEVC_STT02Value,
                        PLC_Conn_STT: setPLC_STTValue,
                    };
                    keys.forEach((key) => {
                        if (stateMap[key]) {    
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }

                        if (valueStateMap[key]) {
                            const value = dataReceived.data[key][0][0];

                            const date = new Date(value);
                            const formattedDate = `${date
                                .getDate()
                                .toString()
                                .padStart(2, "0")}-${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}-${date.getFullYear()} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate); // Set formatted timestamp
                        }
                    });
                }
                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.IOT_Gateway_Phone.value;
                            setGetWayPhoneOTSUKA(ballValue);
                   
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.IOT_Gateway_Phone.value;
                        setGetWayPhoneOTSUKA(updatedData);
                }



                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001A?.value;
                    setPCV_6001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001A?.value;
                    setPCV_6001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001B?.value;
                    setPCV_6001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001B?.value;
                    setPCV_6001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002A?.value;
                    setPCV_6002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002A?.value;
                    setPCV_6002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002B?.value;
                    setPCV_6002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002B?.value;
                    setPCV_6002B(updatedData);
                }

                //=================================


                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6001A?.value;
                    setPSV_6001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6001A?.value;
                    setPSV_6001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6001B?.value;
                    setPSV_6001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6001B?.value;
                    setPSV_6001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6002A?.value;
                    setPSV_6002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6002A?.value;
                    setPSV_6002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_6002B?.value;
                    setPSV_6002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_6002B?.value;
                    setPSV_6002B(updatedData);
                }


                if (dataReceived.data && dataReceived.data.data?.length > 0) {
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

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
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



                fetchData()
            };
        }
    }, [data]);


 

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/values/attributes/SERVER_SCOPE`
            );


            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const MaintainESD = res.data.find(
                (item: any) => item.key === "ESD_Maintain"
            );

            const HR_BC_High = res.data.find((item: any) => item.key === "HR_BC_High");
            setHR_BC_High(HR_BC_High?.value || null);
            const HR_BC_Low = res.data.find((item: any) => item.key === "HR_BC_Low");
            setHR_BC_Low(HR_BC_Low?.value || null);
            const HR_BC_Maintain = res.data.find(
                (item: any) => item.key === "HR_BC_Maintain"
            );

            const SD_High = res.data.find((item: any) => item.key === "SD_High");
            setSD_High(SD_High?.value || null);
            const SD_Low = res.data.find((item: any) => item.key === "SD_Low");
            setSD_Low(SD_Low?.value || null);
            const SD_Maintain = res.data.find(
                (item: any) => item.key === "SD_Maintain"
            );


            const PT_6004_High = res.data.find((item: any) => item.key === "PT_6004_High");
            setPT_6004_High(PT_6004_High?.value || null);
            const PT_6004_Low = res.data.find((item: any) => item.key === "PT_6004_Low");
            setPT_6004_Low(PT_6004_Low?.value || null);
            const PT_6004_Maintain = res.data.find(
                (item: any) => item.key === "PT_6004_Maintain"
            );

            const PUMP_3_High = res.data.find((item: any) => item.key === "PUMP_3_High");
            setPUMP_3_High(PUMP_3_High?.value || null);
            const PUMP_3_Low = res.data.find((item: any) => item.key === "PUMP_3_Low");
            setPUMP_3_Low(PUMP_3_Low?.value || null);
            const PUMP_3_Maintain = res.data.find(
                (item: any) => item.key === "PUMP_3_Maintain"
            );

            const SDV_6003_High = res.data.find((item: any) => item.key === "SDV_6003_High");
            setSDV_6003_High(SDV_6003_High?.value || null);
            const SDV_6003_Low = res.data.find((item: any) => item.key === "SDV_6003_Low");
            setSDV_6003_Low(SDV_6003_Low?.value || null);
            const SDV_6003_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6003_Maintain"
            );



    
            const EVC_01_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_High");
            setEVC_01_Remain_Battery_Service_Life_High(EVC_01_Remain_Battery_Service_Life_High?.value || null);
            const EVC_01_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Low");
            setEVC_01_Remain_Battery_Service_Life_Low(EVC_01_Remain_Battery_Service_Life_Low?.value || null);
            const MaintainEVC_01_Remain_Battery_Service_Life = res.data.find(
                (item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Maintain"
            );

            const EVC_01_Temperature_High = res.data.find((item: any) => item.key === "EVC_01_Temperature_High");
            setEVC_01_Temperature_High(EVC_01_Temperature_High?.value || null);
            const EVC_01_Temperature_Low = res.data.find((item: any) => item.key === "EVC_01_Temperature_Low");
            setEVC_01_Temperature_Low(EVC_01_Temperature_Low?.value || null);
            const EVC_01_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Maintain"
            );

            const EVC_01_Pressure_High = res.data.find((item: any) => item.key === "EVC_01_Pressure_High");
            setEVC_01_Pressure_High(EVC_01_Pressure_High?.value || null);
            const EVC_01_Pressure_Low = res.data.find((item: any) => item.key === "EVC_01_Pressure_Low");
            setEVC_01_Pressure_Low(EVC_01_Pressure_Low?.value || null);
            const EVC_01_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );


            const EVC_01_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_High");
            setEVC_01_Volume_at_Base_Condition_High(EVC_01_Volume_at_Base_Condition_High?.value || null);
            const EVC_01_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Low");
            setEVC_01_Volume_at_Base_Condition_Low(EVC_01_Volume_at_Base_Condition_Low?.value || null);
            const EVC_01_Volume_at_Base_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );

            const EVC_01_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_High");
            setEVC_01_Volume_at_Measurement_Condition_High(EVC_01_Volume_at_Measurement_Condition_High?.value || null);
            const EVC_01_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Low");
            setEVC_01_Volume_at_Measurement_Condition_Low(EVC_01_Volume_at_Measurement_Condition_Low?.value || null);
            const EVC_01_Volume_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );

            const EVC_01_Flow_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High");
            setEVC_01_Flow_at_Base_Condition_High(EVC_01_Flow_at_Base_Condition_High?.value || null);
            const EVC_01_Flow_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low");
            setEVC_01_Flow_at_Base_Condition_Low(EVC_01_Flow_at_Base_Condition_Low?.value || null);
            const EVC_01_Flow_at_Base_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );

            const EVC_01_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_High");
            setEVC_01_Flow_at_Measurement_Condition_High(EVC_01_Flow_at_Measurement_Condition_High?.value || null);
            const EVC_01_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Low");
            setEVC_01_Flow_at_Measurement_Condition_Low(EVC_01_Flow_at_Measurement_Condition_Low?.value || null);
            const EVC_01_Flow_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );

            const EVC_01_Vb_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_High");
            setEVC_01_Vb_of_Current_Day_High(EVC_01_Vb_of_Current_Day_High?.value || null);
            const EVC_01_Vb_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_Low");
            setEVC_01_Vb_of_Current_Day_Low(EVC_01_Vb_of_Current_Day_Low?.value || null);
            const EVC_01_Vb_of_Current_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Current_Day_Maintain"
            );


            const EVC_01_Vm_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_High");
            setEVC_01_Vm_of_Current_Day_High(EVC_01_Vm_of_Current_Day_High?.value || null);
            const EVC_01_Vm_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_Low");
            setEVC_01_Vm_of_Current_Day_Low(EVC_01_Vm_of_Current_Day_Low?.value || null);
            const EVC_01_Vm_of_Current_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Current_Day_Maintain"
            );

            const EVC_01_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_High");
            setEVC_01_Vb_of_Last_Day_High(EVC_01_Vb_of_Last_Day_High?.value || null);
            const EVC_01_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_Low");
            setEVC_01_Vb_of_Last_Day_Low(EVC_01_Vb_of_Last_Day_Low?.value || null);
            const EVC_01_Vb_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Last_Day_Maintain"
            );

            const EVC_02_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
            setEVC_02_Vm_of_Last_Day_High(EVC_02_Vm_of_Last_Day_High?.value || null);
            const EVC_02_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
            setEVC_02_Vm_of_Last_Day_Low(EVC_02_Vm_of_Last_Day_Low?.value || null);
            const EVC_02_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );

            const FC_01_Today_Values_Volume_High = res.data.find((item: any) => item.key === "FC_01_Today_Values_Volume_High");
            setFC_01_Today_Values_Volume_High(FC_01_Today_Values_Volume_High?.value || null);
            const FC_01_Today_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Today_Values_Volume_Low");
            setFC_01_Today_Values_Volume_Low(FC_01_Today_Values_Volume_Low?.value || null);
            const FC_01_Today_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Today_Values_Volume_Maintain"
            );

            const FC_01_Today_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_01_Today_Values_Uncorrected_Volume_High");
            setFC_01_Today_Values_Uncorrected_Volume_High(FC_01_Today_Values_Uncorrected_Volume_High?.value || null);
            const FC_01_Today_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Today_Values_Uncorrected_Volume_Low");
            setFC_01_Today_Values_Uncorrected_Volume_Low(FC_01_Today_Values_Uncorrected_Volume_Low?.value || null);
            const FC_01_Today_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Today_Values_Uncorrected_Volume_Maintain"
            );

            const FC_01_Yesterday_Values_Volume_High = res.data.find((item: any) => item.key === "FC_01_Yesterday_Values_Volume_High");
            setFC_01_Yesterday_Values_Volume_High(FC_01_Yesterday_Values_Volume_High?.value || null);
            const FC_01_Yesterday_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Yesterday_Values_Volume_Low");
            setFC_01_Yesterday_Values_Volume_Low(FC_01_Yesterday_Values_Volume_Low?.value || null);
            const FC_01_Yesterday_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Yesterday_Values_Volume_Maintain"
            );

            const FC_01_Yesterday_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_01_Yesterday_Values_Uncorrected_Volume_High");
            setFC_01_Yesterday_Values_Uncorrected_Volume_High(FC_01_Yesterday_Values_Uncorrected_Volume_High?.value || null);
            const FC_01_Yesterday_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Yesterday_Values_Uncorrected_Volume_Low");
            setFC_01_Yesterday_Values_Uncorrected_Volume_Low(FC_01_Yesterday_Values_Uncorrected_Volume_Low?.value || null);
            const FC_01_Yesterday_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Yesterday_Values_Uncorrected_Volume_Maintain"
            );

            const EVC_01_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setEVC_01_Vm_of_Last_Day_High(EVC_01_Vm_of_Last_Day_High?.value || null);
            const EVC_01_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setEVC_01_Vm_of_Last_Day_Low(EVC_01_Vm_of_Last_Day_Low?.value || null);
            const EVC_01_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );

            const EVC_02_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_High");
            setEVC_02_Remain_Battery_Service_Life_High(EVC_02_Remain_Battery_Service_Life_High?.value || null);
            const EVC_02_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Low");
            setEVC_02_Remain_Battery_Service_Life_Low(EVC_02_Remain_Battery_Service_Life_Low?.value || null);
            const EVC_02_Remain_Battery_Service_Life_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Maintain"
            );

            const EVC_02_Temperature_High = res.data.find((item: any) => item.key === "EVC_02_Temperature_High");
            setEVC_02_Temperature_High(EVC_02_Temperature_High?.value || null);
            const EVC_02_Temperature_Low = res.data.find((item: any) => item.key === "EVC_02_Temperature_Low");
            setEVC_02_Temperature_Low(EVC_02_Temperature_Low?.value || null);
            const EVC_02_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );

            const EVC_02_Pressure_High = res.data.find((item: any) => item.key === "EVC_02_Pressure_High");
            setEVC_02_Pressure_High(EVC_02_Pressure_High?.value || null);
            const EVC_02_Pressure_Low = res.data.find((item: any) => item.key === "EVC_02_Pressure_Low");
            setEVC_02_Pressure_Low(EVC_02_Pressure_Low?.value || null);
            const EVC_02_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Maintain"
            );

            const EVC_02_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
            setEVC_02_Volume_at_Measurement_Condition_High(EVC_02_Volume_at_Measurement_Condition_High?.value || null);
            const EVC_02_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
            setEVC_02_Volume_at_Measurement_Condition_Low(EVC_02_Volume_at_Measurement_Condition_Low?.value || null);
            const EVC_02_Volume_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
            );


            const EVC_02_Flow_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High");
            setEVC_02_Flow_at_Base_Condition_High(EVC_02_Flow_at_Base_Condition_High?.value || null);
            const EVC_02_Flow_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low");
            setEVC_02_Flow_at_Base_Condition_Low(EVC_02_Flow_at_Base_Condition_Low?.value || null);
            const EVC_02_Flow_at_Base_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Maintain"
            );

            const EVC_02_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
            setEVC_02_Flow_at_Measurement_Condition_High(EVC_02_Flow_at_Measurement_Condition_High?.value || null);
            const EVC_02_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
            setEVC_02_Flow_at_Measurement_Condition_Low(EVC_02_Flow_at_Measurement_Condition_Low?.value || null);
            const EVC_02_Flow_at_Measurement_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );

            const EVC_02_Vb_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_High");
            setEVC_02_Vb_of_Current_Day_High(EVC_02_Vb_of_Current_Day_High?.value || null);
            const EVC_02_Vb_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_Low");
            setEVC_02_Vb_of_Current_Day_Low(EVC_02_Vb_of_Current_Day_Low?.value || null);
            const EVC_02_Vb_of_Current_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vb_of_Current_Day_Maintain"
            );


            const EVC_02_Vm_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_High");
            setEVC_02_Vm_of_Current_Day_High(EVC_02_Vm_of_Current_Day_High?.value || null);
            const EVC_02_Vm_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_Low");
            setEVC_02_Vm_of_Current_Day_Low(EVC_02_Vm_of_Current_Day_Low?.value || null);
            const EVC_02_Vm_of_Current_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Current_Day_Maintain"
            );

            const EVC_02_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_High");
            setEVC_02_Vb_of_Last_Day_High(EVC_02_Vb_of_Last_Day_High?.value || null);
            const EVC_02_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_Low");
            setEVC_02_Vb_of_Last_Day_Low(EVC_02_Vb_of_Last_Day_Low?.value || null);
            const EVC_02_Vb_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vb_of_Last_Day_Maintain"
            );


            const EVC_02_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
            setEVC_02_Volume_at_Base_Condition_High(EVC_02_Volume_at_Base_Condition_High?.value || null);
            const EVC_02_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
            setEVC_02_Volume_at_Base_Condition_Low(EVC_02_Volume_at_Base_Condition_Low?.value || null);
            const EVC_02_Volume_at_Base_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            const PIT_6001A_High = res.data.find((item: any) => item.key === "PIT_6001A_High");
            setPIT_6001A_High(PIT_6001A_High?.value || null);
            const PIT_6001A_Low = res.data.find((item: any) => item.key === "PIT_6001B_Low");
            setPIT_6001A_Low(PIT_6001A_Low?.value || null);
            const MaintainPIT_6001A = res.data.find(
                (item: any) => item.key === "PIT_6001A_Maintain"
            );


            const PIT_6001B_High = res.data.find((item: any) => item.key === "PIT_6001B_High");
            setPIT_6001B_High(PIT_6001B_High?.value || null);
            const PIT_6001B_Low = res.data.find((item: any) => item.key === "PIT_6001B_Low");
            setPIT_6001B_Low(PIT_6001B_Low?.value || null);
            const PIT_6001B_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6001B_Maintain"
            );

            const PIT_6002A_High = res.data.find((item: any) => item.key === "PIT_6002A_High");
            setPIT_6002A_High(PIT_6002A_High?.value || null);
            const PIT_6002A_Low = res.data.find((item: any) => item.key === "PIT_6002A_Low");
            setPIT_6002A_Low(PIT_6002A_Low?.value || null);
            const PIT_6002A_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6002A_Maintain"
            );


            const PIT_6002B_High = res.data.find((item: any) => item.key === "PIT_6002B_High");
            setPIT_6002B_High(PIT_6002B_High?.value || null);
            const PIT_6002B_Low = res.data.find((item: any) => item.key === "PIT_6002B_Low");
            setPIT_6002B_Low(PIT_6002B_Low?.value || null);
            const PIT_6002B_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6002B_Maintain"
            );

            const PIT_6003A_High = res.data.find((item: any) => item.key === "PIT_6003A_High");
            setPIT_6003A_High(PIT_6003A_High?.value || null);
            const PIT_6003A_Low = res.data.find((item: any) => item.key === "PIT_6003A_Low");
            setPIT_6003A_Low(PIT_6003A_Low?.value || null);
            const PIT_6003A_Maintain = res.data.find(
                (item: any) => item.key === "PIT_6003A_Maintain"
            );

            const TIT_6001A_High = res.data.find((item: any) => item.key === "TIT_6001A_High");
            setTIT_6001A_High(TIT_6001A_High?.value || null);
            const TIT_6001A_Low = res.data.find((item: any) => item.key === "TIT_6001A_Low");
            setTIT_6001A_Low(TIT_6001A_Low?.value || null);
            const TIT_6001A_Maintain = res.data.find(
                (item: any) => item.key === "TIT_6001A_Maintain"
            );

            const TIT_6002_High = res.data.find((item: any) => item.key === "TIT_6002_High");
            setTIT_6002_High(TIT_6002_High?.value || null);
            const TIT_6002_Low = res.data.find((item: any) => item.key === "TIT_6002_Low");
            setTIT_6002_Low(TIT_6002_Low?.value || null);
            const TIT_6002_Maintain = res.data.find(
                (item: any) => item.key === "TIT_6002_Maintain"
            );

            const GD_6001_High = res.data.find((item: any) => item.key === "GD_6001_High");
            setGD_6001_High(GD_6001_High?.value || null);
            const GD_6001_Low = res.data.find((item: any) => item.key === "GD_6001_Low");
            setGD_6001_Low(GD_6001_Low?.value || null);
            const GD_6001_Maintain = res.data.find(
                (item: any) => item.key === "GD_6001_Maintain"
            );


            const SDV_6001A_High = res.data.find((item: any) => item.key === "SDV_6001A_High");
            setSDV_6001A_High(SDV_6001A_High?.value || null);
            const SDV_6001A_Low = res.data.find((item: any) => item.key === "SDV_6001A_Low");
            setSDV_6001A_Low(SDV_6001A_Low?.value || null);
            const SDV_6001A_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6001A_Maintain"
            );

            const SDV_6001B_High = res.data.find((item: any) => item.key === "SDV_6001B_High");
            setSDV_6001B_High(SDV_6001B_High?.value || null);
            const SDV_6001B_Low = res.data.find((item: any) => item.key === "SDV_6001B_Low");
            setSDV_6001B_Low(SDV_6001B_Low?.value || null);
            const SDV_6001B_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6001B_Maintain"
            );

            const SDV_6002_High = res.data.find((item: any) => item.key === "SDV_6002_High");
            setSDV_6002_High(SDV_6002_High?.value || null);
            const SDV_6002_Low = res.data.find((item: any) => item.key === "SDV_6002_Low");
            setSDV_6002_Low(SDV_6002_Low?.value || null);
            const SDV_6002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_6002_Maintain"
            );

            const Water_PG_High = res.data.find((item: any) => item.key === "Water_PG_High");
            setWater_PG_High(Water_PG_High?.value || null);
            const Water_PG_Low = res.data.find((item: any) => item.key === "Water_PG_Low");
            setWater_PG_Low(Water_PG_Low?.value || null);
            const Water_PG_Maintain = res.data.find(
                (item: any) => item.key === "Water_PG_Maintain"
            );

            const Water_LSW_High = res.data.find((item: any) => item.key === "Water_LSW_High");
            setWater_LSW_High(Water_LSW_High?.value || null);
            const Water_LSW_Low = res.data.find((item: any) => item.key === "Water_LSW_Low");
            setWater_LSW_Low(Water_LSW_Low?.value || null);
            const Water_LSW_Maintain = res.data.find(
                (item: any) => item.key === "Water_LSW_Maintain"
            );

            const PUMP_1_High = res.data.find((item: any) => item.key === "PUMP_1_High");
            setPUMP_1_High(PUMP_1_High?.value || null);
            const PUMP_1_Low = res.data.find((item: any) => item.key === "PUMP_1_Low");
            setPUMP_1_Low(PUMP_1_Low?.value || null);
            const PUMP_1_Maintain = res.data.find(
                (item: any) => item.key === "PUMP_1_Maintain"
            );

            const PUMP_2_High = res.data.find((item: any) => item.key === "PUMP_2_High");
            setPUMP_2_High(PUMP_2_High?.value || null);
            const PUMP_2_Low = res.data.find((item: any) => item.key === "PUMP_2_Low");
            setPUMP_2_Low(PUMP_2_Low?.value || null);
            const PUMP_2_Maintain = res.data.find(
                (item: any) => item.key === "PUMP_2_Maintain"
            );

            const HEATER_1_High = res.data.find((item: any) => item.key === "HEATER_1_High");
            setHEATER_1_High(HEATER_1_High?.value || null);
            const HEATER_1_Low = res.data.find((item: any) => item.key === "HEATER_1_Low");
            setHEATER_1_Low(HEATER_1_Low?.value || null);
            const HEATER_1_Maintain = res.data.find(
                (item: any) => item.key === "HEATER_1_Maintain"
            );

            const HEATER_2_High = res.data.find((item: any) => item.key === "HEATER_2_High");
            setHEATER_2_High(HEATER_2_High?.value || null);
            const HEATER_2_Low = res.data.find((item: any) => item.key === "HEATER_2_Low");
            setHEATER_2_Low(HEATER_2_Low?.value || null);
            const HEATER_2_Maintain = res.data.find(
                (item: any) => item.key === "HEATER_2_Maintain"
            );


            const HEATER_3_High = res.data.find((item: any) => item.key === "HEATER_3_High");
            setHEATER_3_High(HEATER_3_High?.value || null);
            const HEATER_3_Low = res.data.find((item: any) => item.key === "HEATER_3_Low");
            setHEATER_3_Low(HEATER_3_Low?.value || null);
            const HEATER_3_Maintain = res.data.find(
                (item: any) => item.key === "HEATER_3_Maintain"
            );

            const BOILER_High = res.data.find((item: any) => item.key === "BOILER_High");
            setBOILER_High(BOILER_High?.value || null);
            const BOILER_Low = res.data.find((item: any) => item.key === "BOILER_Low");
            setBOILER_Low(BOILER_Low?.value || null);
            const BOILER_Maintain = res.data.find(
                (item: any) => item.key === "BOILER_Maintain"
            );

            const GD_STATUS_High = res.data.find((item: any) => item.key === "GD_STATUS_High");
            setGD_STATUS_High(GD_STATUS_High?.value || null);
            const GD_STATUS_Low = res.data.find((item: any) => item.key === "GD_STATUS_Low");
            setGD_STATUS_Low(GD_STATUS_Low?.value || null);
            const GD_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD_STATUS_Maintain"
            );
 // =================================================================================================================== 


 setMaintainESD(MaintainESD?.value || false);

 setMaintainHR_BC(HR_BC_Maintain?.value || false);

 setMaintainSD(SD_Maintain?.value || false);


 setMaintainPT_6004(PT_6004_Maintain?.value || false);


 setMaintainPUMP_3(PUMP_3_Maintain?.value || false);

 setSDV_6003(SDV_6003_Maintain?.value || false);


            setMaintainEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Maintain?.value || false);

            setMaintainEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Maintain?.value || false);

            setMaintainEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false);


            setMaintainEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Maintain?.value || false);


            setMaintainEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false);

            
            setMaintainEVC_02_Pressure(EVC_02_Pressure_Maintain?.value || false);
            
            setMaintainEVC_02_Temperature(EVC_02_Temperature_Maintain?.value || false);

            
            setMaintainEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Maintain?.value || false);

            setMaintainEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Maintain?.value || false);


            setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Maintain?.value || false);


            setMaintainFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Maintain?.value || false);

            setMaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);


            setMaintainEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Maintain?.value || false);

            setMaintainEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_Maintain?.value || false);

            setMaintainEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_Maintain?.value || false);


            setMaintainEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_Maintain?.value || false);

            setMaintainEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_Maintain?.value || false);

            setMaintainEVC_01_Pressure(EVC_01_Pressure_Maintain?.value || false);

            setMaintainEVC_01_Temperature(EVC_01_Temperature_Maintain?.value || false);

            setMaintainEVC_01_Remain_Battery_Service_Life(MaintainEVC_01_Remain_Battery_Service_Life?.value || false);


            setMaintainPIT_6001A(MaintainPIT_6001A?.value || false);


            setMaintainPIT_6001B(PIT_6001B_Maintain?.value || false);

            setMaintainPIT_6002A(PIT_6002A_Maintain?.value || false);


            setMaintainPIT_6002B(PIT_6002B_Maintain?.value || false);


            setMaintainPIT_6003A(PIT_6003A_Maintain?.value || false);


            setMaintainTIT_6001A(TIT_6001A_Maintain?.value || false);


            setMaintainGD_STATUS(GD_STATUS_Maintain?.value || false);

            
            setMaintainBOILER(BOILER_Maintain?.value || false);
            
            setMaintainHEATER_3(HEATER_3_Maintain?.value || false);

            
            setMaintainHEATER_2(HEATER_2_Maintain?.value || false);

            setMaintainHEATER_1(HEATER_1_Maintain?.value || false);


            setMaintainPUMP_2(PUMP_2_Maintain?.value || false);

            setMaintainPUMP_1(PUMP_1_Maintain?.value || false);

            setMaintainWater_LSW(Water_LSW_Maintain?.value || false);


            setMaintainWater_PG(Water_PG_Maintain?.value || false);

            setMaintainSDV_6002(SDV_6002_Maintain?.value || false);


            setMaintainSDV_6001B(SDV_6001B_Maintain?.value || false);

            setMaintainSDV_6001A(SDV_6001A_Maintain?.value || false);


            setMaintainGD_6001(GD_6001_Maintain?.value || false);


            setMaintainTIT_6002(TIT_6002_Maintain?.value || false);


            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
const [audioPlayingEVC_01_Remain_Battery_Service_Life, setAudioPlayingEVC_01_Remain_Battery_Service_Life] = useState(false);
const [inputValueEVC_01_Remain_Battery_Service_Life, setInputValueEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_01_Remain_Battery_Service_Life, setInputValue2EVC_01_Remain_Battery_Service_Life] = useState<any>();
const [EVC_01_Remain_Battery_Service_Life_High, setEVC_01_Remain_Battery_Service_Life_High] = useState<number | null>(null);
const [EVC_01_Remain_Battery_Service_Life_Low, setEVC_01_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Remain_Battery_Service_Life, setExceedThresholdEVC_01_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_01_Remain_Battery_Service_Life, setMaintainEVC_01_Remain_Battery_Service_Life] = useState<boolean>(false);


    useEffect(() => {
        if (typeof EVC_01_Remain_Battery_Service_Life_High === 'string' && typeof EVC_01_Remain_Battery_Service_Life_Low === 'string' && EVC_01_Remain_Battery_Service_Life !== null && maintainEVC_01_Remain_Battery_Service_Life === false
        ) {
            const highValue = parseFloat(EVC_01_Remain_Battery_Service_Life_High);
            const lowValue = parseFloat(EVC_01_Remain_Battery_Service_Life_Low);
            const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Remain_Battery_Service_LifeValue)) {
                if (highValue <= EVC_01_Remain_Battery_Service_LifeValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue) {
                    if (!audioPlayingEVC_01_Remain_Battery_Service_Life) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_01_Remain_Battery_Service_Life(true);
                        setExceedThresholdEVC_01_Remain_Battery_Service_Life(true);
                    }
                } else {
                    setAudioPlayingEVC_01_Remain_Battery_Service_Life(false);
                    setExceedThresholdEVC_01_Remain_Battery_Service_Life(false);
                }
            } 
        } 
    }, [EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life, audioPlayingEVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_Low,maintainEVC_01_Remain_Battery_Service_Life]);

    useEffect(() => {
        if (audioPlayingEVC_01_Remain_Battery_Service_Life) {
            const audioEnded = () => {
                setAudioPlayingEVC_01_Remain_Battery_Service_Life(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_01_Remain_Battery_Service_Life]);

    const handleInputChangeEVC_01_Remain_Battery_Service_Life = (event: any) => {
        const newValue = event.target.value;
        setInputValueEVC_01_Remain_Battery_Service_Life(newValue);
    };

    const handleInputChange2EVC_01_Remain_Battery_Service_Life = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2EVC_01_Remain_Battery_Service_Life(newValue2);
    };
    const ChangeMaintainEVC_01_Remain_Battery_Service_Life = async () => {
        try {
            const newValue = !maintainEVC_01_Remain_Battery_Service_Life;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                { EVC_01_Remain_Battery_Service_Life_Maintain: newValue }
            );
            setMaintainEVC_01_Remain_Battery_Service_Life(newValue);
            
        } catch (error) {}
    };


     // =================================================================================================================== 

     const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);
     const [audioPlayingEVC_01_Temperature, setAudioPlayingEVC_01_Temperature] = useState(false);
     const [inputValueEVC_01_Temperature, setInputValueEVC_01_Temperature] = useState<any>();
     const [inputValue2EVC_01_Temperature, setInputValue2EVC_01_Temperature] = useState<any>();
     const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<number | null>(null);
     const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<number | null>(null);
     const [exceedThresholdTemperature, setExceedThresholdTemperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof EVC_01_Temperature_High === 'string' && typeof EVC_01_Temperature_Low === 'string' && EVC_01_Temperature !== null && maintainEVC_01_Temperature === false
             ) {
                 const highValue = parseFloat(EVC_01_Temperature_High);
                 const lowValue = parseFloat(EVC_01_Temperature_Low);
                 const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_TemperatureValue)) {
                     if (highValue <= EVC_01_TemperatureValue || EVC_01_TemperatureValue <= lowValue) {
                         if (!audioPlayingEVC_01_Temperature) {
                             audioRef.current?.play();
                             setAudioPlayingEVC_01_Temperature(true);
                             setExceedThresholdTemperature(true);
                         }
                     } else {
                        setAudioPlayingEVC_01_Temperature(false);
                         setExceedThresholdTemperature(false);
                     }
                 } 
             } 
         }, [EVC_01_Temperature_High, EVC_01_Temperature, audioPlayingEVC_01_Temperature, EVC_01_Temperature_Low,maintainEVC_01_Temperature]);
     
         useEffect(() => {
             if (audioPlayingEVC_01_Temperature) {
                 const audioEnded = () => {
                    setAudioPlayingEVC_01_Temperature(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingEVC_01_Temperature]);
     
         const handleInputChangeEVC_01_Temperature = (event: any) => {
             const newValue = event.target.value;
             setInputValueEVC_01_Temperature(newValue);
         };
     
         const handleInputChange2EVC_01_Temperature = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2EVC_01_Temperature(newValue2);
         };
         const ChangeMaintainEVC_01_Temperature = async () => {
             try {
                 const newValue = !maintainEVC_01_Temperature;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { EVC_01_Temperature_Maintain: newValue }
                 );
                 setMaintainEVC_01_Temperature(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 


     const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
     const [audioPlayingEVC_01_Pressure, setAudioPlayingEVC_01_Pressure] = useState(false);
     const [inputValueEVC_01_Pressure, setInputValueEVC_01_Pressure] = useState<any>();
     const [inputValue2EVC_01_Pressure, setInputValue2EVC_01_Pressure] = useState<any>();
     const [EVC_01_Pressure_High, setEVC_01_Pressure_High] = useState<number | null>(null);
     const [EVC_01_Pressure_Low, setEVC_01_Pressure_Low] = useState<number | null>(null);
     const [exceedThresholdEVC_01_Pressure, setExceedThresholdEVC_01_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Pressure, setMaintainEVC_01_Pressure] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof EVC_01_Pressure_High === 'string' && typeof EVC_01_Pressure_Low === 'string' && EVC_01_Pressure !== null && maintainEVC_01_Pressure === false
             ) {
                 const highValue = parseFloat(EVC_01_Pressure_High);
                 const lowValue = parseFloat(EVC_01_Pressure_Low);
                 const EVC_01_PressureValue = parseFloat(EVC_01_Pressure);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_PressureValue)) {
                     if (highValue <= EVC_01_PressureValue || EVC_01_PressureValue <= lowValue) {
                         if (!audioPlayingEVC_01_Pressure) {
                             audioRef.current?.play();
                             setAudioPlayingEVC_01_Pressure(true);
                             setExceedThresholdEVC_01_Pressure(true);
                         }
                     } else {
                        setAudioPlayingEVC_01_Pressure(false);
                        setExceedThresholdEVC_01_Pressure(false);
                     }
                 } 
             } 
         }, [EVC_01_Pressure_High, EVC_01_Pressure, audioPlayingEVC_01_Pressure, EVC_01_Pressure_Low,maintainEVC_01_Pressure]);
     
         useEffect(() => {
             if (audioPlayingEVC_01_Pressure) {
                 const audioEnded = () => {
                    setAudioPlayingEVC_01_Pressure(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingEVC_01_Pressure]);
     
         const handleInputChangeEVC_01_Pressure = (event: any) => {
             const newValue = event.target.value;
             setInputValueEVC_01_Pressure(newValue);
         };
     
         const handleInputChange2EVC_01_Pressure = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2EVC_01_Pressure(newValue2);
         };
         const ChangeMaintainEVC_01_Pressure = async () => {
             try {
                 const newValue = !maintainEVC_01_Pressure;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { EVC_01_Pressure_Maintain: newValue }
                 );
                 setMaintainEVC_01_Pressure(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 



          const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
          const [audioPlayingEVC_01_Volume_at_Base_Condition, setAudioPlayingEVC_01_Volume_at_Base_Condition] = useState(false);
          const [inputValueEVC_01_Volume_at_Base_Condition, setInputValueEVC_01_Volume_at_Base_Condition] = useState<any>();
          const [inputValue2EVC_01_Volume_at_Base_Condition, setInputValue2EVC_01_Volume_at_Base_Condition] = useState<any>();
          const [EVC_01_Volume_at_Base_Condition_High, setEVC_01_Volume_at_Base_Condition_High] = useState<number | null>(null);
          const [EVC_01_Volume_at_Base_Condition_Low, setEVC_01_Volume_at_Base_Condition_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Volume_at_Base_Condition, setExceedThresholdEVC_01_Volume_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Volume_at_Base_Condition, setMaintainEVC_01_Volume_at_Base_Condition] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Volume_at_Base_Condition_High === 'string' && typeof EVC_01_Volume_at_Base_Condition_Low === 'string' && EVC_01_Volume_at_Base_Condition !== null && maintainEVC_01_Volume_at_Base_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Volume_at_Base_Condition_High);
                      const lowValue = parseFloat(EVC_01_Volume_at_Base_Condition_Low);
                      const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Base_ConditionValue)) {
                          if (highValue <= EVC_01_Volume_at_Base_ConditionValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Volume_at_Base_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Volume_at_Base_Condition(true);
                                  setExceedThresholdEVC_01_Volume_at_Base_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Volume_at_Base_Condition(false);
                             setExceedThresholdEVC_01_Volume_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition, audioPlayingEVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_Low,maintainEVC_01_Volume_at_Base_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Volume_at_Base_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Volume_at_Base_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Volume_at_Base_Condition]);
          
              const handleInputChangeEVC_01_Volume_at_Base_Condition = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Volume_at_Base_Condition(newValue);
              };
          
              const handleInputChange2EVC_01_Volume_at_Base_Condition = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Volume_at_Base_Condition(newValue2);
              };
              const ChangeMaintainEVC_01_Volume_at_Base_Condition = async () => {
                  try {
                      const newValue = !maintainEVC_01_Volume_at_Base_Condition;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Volume_at_Base_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Volume_at_Base_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
          const [audioPlayingEVC_01_Volume_at_Measurement_Condition, setAudioPlayingEVC_01_Volume_at_Measurement_Condition] = useState(false);
          const [inputValueEVC_01_Volume_at_Measurement_Condition, setInputValueEVC_01_Volume_at_Measurement_Condition] = useState<any>();
          const [inputValue2EVC_01_Volume_at_Measurement_Condition, setInputValue2EVC_01_Volume_at_Measurement_Condition] = useState<any>();
          const [EVC_01_Volume_at_Measurement_Condition_High, setEVC_01_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
          const [EVC_01_Volume_at_Measurement_Condition_Low, setEVC_01_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Volume_at_Measurement_Condition, setExceedThresholdEVC_01_Volume_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Volume_at_Measurement_Condition, setMaintainEVC_01_Volume_at_Measurement_Condition] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Volume_at_Measurement_Condition_High === 'string' && typeof EVC_01_Volume_at_Measurement_Condition_Low === 'string' && EVC_01_Volume_at_Measurement_Condition !== null && maintainEVC_01_Volume_at_Measurement_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Volume_at_Measurement_Condition_High);
                      const lowValue = parseFloat(EVC_01_Volume_at_Measurement_Condition_Low);
                      const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Measurement_ConditionValue)) {
                          if (highValue <= EVC_01_Volume_at_Measurement_ConditionValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Volume_at_Measurement_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Volume_at_Measurement_Condition(true);
                                  setExceedThresholdEVC_01_Volume_at_Measurement_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Volume_at_Measurement_Condition(false);
                             setExceedThresholdEVC_01_Volume_at_Measurement_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition, audioPlayingEVC_01_Volume_at_Measurement_Condition , EVC_01_Volume_at_Measurement_Condition_Low,maintainEVC_01_Volume_at_Measurement_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Volume_at_Measurement_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Volume_at_Measurement_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Volume_at_Measurement_Condition]);
          
              const handleInputChangeEVC_01_Volume_at_Measurement_Condition = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Volume_at_Measurement_Condition(newValue);
              };
          
              const handleInputChange2EVC_01_Volume_at_Measurement_Condition = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Volume_at_Measurement_Condition(newValue2);
              };
              const ChangeMaintainEVC_01_Volume_at_Measurement_Condition = async () => {
                  try {
                      const newValue = !maintainEVC_01_Volume_at_Measurement_Condition;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Volume_at_Measurement_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Volume_at_Measurement_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
          const [audioPlayingEVC_01_Flow_at_Base_Condition, setAudioPlayingEVC_01_Flow_at_Base_Condition] = useState(false);
          const [inputValueEVC_01_Flow_at_Base_Condition, setInputValueEVC_01_Flow_at_Base_Condition] = useState<any>();
          const [inputValue2EVC_01_Flow_at_Base_Condition, setInputValue2EVC_01_Flow_at_Base_Condition] = useState<any>();
          const [EVC_01_Flow_at_Base_Condition_High, setEVC_01_Flow_at_Base_Condition_High] = useState<number | null>(null);
          const [EVC_01_Flow_at_Base_Condition_Low, setEVC_01_Flow_at_Base_Condition_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Flow_at_Base_Condition, setExceedThresholdEVC_01_Flow_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Flow_at_Base_Condition, setMaintainEVC_01_Flow_at_Base_Condition] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Flow_at_Base_Condition_High === 'string' && typeof EVC_01_Flow_at_Base_Condition_Low === 'string' && EVC_01_Flow_at_Base_Condition !== null && maintainEVC_01_Flow_at_Base_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Flow_at_Base_Condition_High);
                      const lowValue = parseFloat(EVC_01_Flow_at_Base_Condition_Low);
                      const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Base_ConditionValue)) {
                          if (highValue <= EVC_01_Flow_at_Base_ConditionValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Flow_at_Base_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Flow_at_Base_Condition(true);
                                  setExceedThresholdEVC_01_Flow_at_Base_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Flow_at_Base_Condition(false);
                             setExceedThresholdEVC_01_Flow_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition, audioPlayingEVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_Low,maintainEVC_01_Flow_at_Base_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Flow_at_Base_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Flow_at_Base_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Flow_at_Base_Condition]);
          
              const handleInputChangeEVC_01_Flow_at_Base_Condition = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Flow_at_Base_Condition(newValue);
              };
          
              const handleInputChange2EVC_01_Flow_at_Base_Condition = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Flow_at_Base_Condition(newValue2);
              };
              const ChangeMaintainEVC_01_Flow_at_Base_Condition = async () => {
                  try {
                      const newValue = !maintainEVC_01_Flow_at_Base_Condition;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Base_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vm_of_Current_Day, setAudioPlayingEVC_01_Vm_of_Current_Day] = useState(false);
          const [inputValueEVC_01_Vm_of_Current_Day, setInputValueEVC_01_Vm_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vm_of_Current_Day, setInputValue2EVC_01_Vm_of_Current_Day] = useState<any>();
          const [EVC_01_Vm_of_Current_Day_High, setEVC_01_Vm_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vm_of_Current_Day_Low, setEVC_01_Vm_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vm_of_Current_Day, setExceedThresholdEVC_01_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vm_of_Current_Day, setMaintainEVC_01_Vm_of_Current_Day] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Vm_of_Current_Day_High === 'string' && typeof EVC_01_Vm_of_Current_Day_Low === 'string' && EVC_01_Vm_of_Current_Day !== null && maintainEVC_01_Vm_of_Current_Day === false
                  ) {
                      const highValue = parseFloat(EVC_01_Vm_of_Current_Day_High);
                      const lowValue = parseFloat(EVC_01_Vm_of_Current_Day_Low);
                      const EVC_01_Vm_of_Current_DayValue = parseFloat(EVC_01_Vm_of_Current_Day);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Current_DayValue)) {
                          if (highValue <= EVC_01_Vm_of_Current_DayValue || EVC_01_Vm_of_Current_DayValue <= lowValue) {
                              if (!audioPlayingEVC_01_Vm_of_Current_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vm_of_Current_Day(true);
                                  setExceedThresholdEVC_01_Vm_of_Current_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vm_of_Current_Day(false);
                             setExceedThresholdEVC_01_Vm_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day, audioPlayingEVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_Low,maintainEVC_01_Vm_of_Current_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vm_of_Current_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vm_of_Current_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vm_of_Current_Day]);
          
              const handleInputChangeEVC_01_Vm_of_Current_Day = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Vm_of_Current_Day(newValue);
              };
          
              const handleInputChange2EVC_01_Vm_of_Current_Day = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Vm_of_Current_Day(newValue2);
              };
              const ChangeMaintainEVC_01_Vm_of_Current_Day = async () => {
                  try {
                      const newValue = !maintainEVC_01_Vm_of_Current_Day;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Vm_of_Current_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vm_of_Current_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vb_of_Current_Day, setAudioPlayingEVC_01_Vb_of_Current_Day] = useState(false);
          const [inputValueEVC_01_Vb_of_Current_Day, setInputValueEVC_01_Vb_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Current_Day, setInputValue2EVC_01_Vb_of_Current_Day] = useState<any>();
          const [EVC_01_Vb_of_Current_Day_High, setEVC_01_Vb_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Current_Day_Low, setEVC_01_Vb_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Current_Day, setExceedThresholdEVC_01_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vb_of_Current_Day, setMaintainEVC_01_Vb_of_Current_Day] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Vb_of_Current_Day_High === 'string' && typeof EVC_01_Vb_of_Current_Day_Low === 'string' && EVC_01_Vb_of_Current_Day !== null && maintainEVC_01_Vb_of_Current_Day === false
                  ) {
                      const highValue = parseFloat(EVC_01_Vb_of_Current_Day_High);
                      const lowValue = parseFloat(EVC_01_Vb_of_Current_Day_Low);
                      const EVC_01_Vb_of_Current_DayValue = parseFloat(EVC_01_Vb_of_Current_Day);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vb_of_Current_DayValue)) {
                          if (highValue <= EVC_01_Vb_of_Current_DayValue || EVC_01_Vb_of_Current_DayValue <= lowValue) {
                              if (!audioPlayingEVC_01_Vb_of_Current_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vb_of_Current_Day(true);
                                  setExceedThresholdEVC_01_Vb_of_Current_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vb_of_Current_Day(false);
                             setExceedThresholdEVC_01_Vb_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day, audioPlayingEVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_Low,maintainEVC_01_Vb_of_Current_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vb_of_Current_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vb_of_Current_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vb_of_Current_Day]);
          
              const handleInputChangeEVC_01_Vb_of_Current_Day = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Vb_of_Current_Day(newValue);
              };
          
              const handleInputChange2EVC_01_Vb_of_Current_Day = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Vb_of_Current_Day(newValue2);
              };
              const ChangeMaintainEVC_01_Vb_of_Current_Day = async () => {
                  try {
                      const newValue = !maintainEVC_01_Vb_of_Current_Day;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Vb_of_Current_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vb_of_Current_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
          const [audioPlayingEVC_01_Flow_at_Measurement_Condition, setAudioPlayingEVC_01_Flow_at_Measurement_Condition] = useState(false);
          const [inputValueEVC_01_Flow_at_Measurement_Condition, setInputValueEVC_01_Flow_at_Measurement_Condition] = useState<any>();
          const [inputValue2EVC_01_Flow_at_Measurement_Condition, setInputValue2EVC_01_Flow_at_Measurement_Condition] = useState<any>();
          const [EVC_01_Flow_at_Measurement_Condition_High, setEVC_01_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
          const [EVC_01_Flow_at_Measurement_Condition_Low, setEVC_01_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Flow_at_Measurement_Condition, setExceedThresholdEVC_01_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Flow_at_Measurement_Condition, setMaintainEVC_01_Flow_at_Measurement_Condition] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Flow_at_Measurement_Condition_High === 'string' && typeof EVC_01_Flow_at_Measurement_Condition_Low === 'string' && EVC_01_Flow_at_Measurement_Condition !== null && maintainEVC_01_Flow_at_Measurement_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Flow_at_Measurement_Condition_High);
                      const lowValue = parseFloat(EVC_01_Flow_at_Measurement_Condition_Low);
                      const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Measurement_ConditionValue)) {
                          if (highValue <= EVC_01_Flow_at_Measurement_ConditionValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Flow_at_Measurement_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Flow_at_Measurement_Condition(true);
                                  setExceedThresholdEVC_01_Flow_at_Measurement_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Flow_at_Measurement_Condition(false);
                             setExceedThresholdEVC_01_Flow_at_Measurement_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition, audioPlayingEVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_Low,maintainEVC_01_Flow_at_Measurement_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Flow_at_Measurement_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Flow_at_Measurement_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Flow_at_Measurement_Condition]);
          
              const handleInputChangeEVC_01_Flow_at_Measurement_Condition = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Flow_at_Measurement_Condition(newValue);
              };
          
              const handleInputChange2EVC_01_Flow_at_Measurement_Condition = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Flow_at_Measurement_Condition(newValue2);
              };
              const ChangeMaintainEVC_01_Flow_at_Measurement_Condition = async () => {
                  try {
                      const newValue = !maintainEVC_01_Flow_at_Measurement_Condition;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Measurement_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vb_of_Last_Day, setAudioPlayingEVC_01_Vb_of_Last_Day] = useState(false);
          const [inputValueEVC_01_Vb_of_Last_Day, setInputValueEVC_01_Vb_of_Last_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Last_Day, setInputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
          const [EVC_01_Vb_of_Last_Day_High, setEVC_01_Vb_of_Last_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Last_Day_Low, setEVC_01_Vb_of_Last_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Last_Day, setExceedThresholdEVC_01_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vb_of_Last_Day, setMaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof EVC_01_Vb_of_Last_Day_High === 'string' && typeof EVC_01_Vb_of_Last_Day_Low === 'string' && EVC_01_Vb_of_Last_Day !== null && maintainEVC_01_Vb_of_Last_Day === false
                  ) {
                      const highValue = parseFloat(EVC_01_Vb_of_Last_Day_High);
                      const lowValue = parseFloat(EVC_01_Vb_of_Last_Day_Low);
                      const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vb_of_Last_DayValue)) {
                          if (highValue <= EVC_01_Vb_of_Last_DayValue || EVC_01_Vb_of_Last_DayValue <= lowValue) {
                              if (!audioPlayingEVC_01_Vb_of_Last_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vb_of_Last_Day(true);
                                  setExceedThresholdEVC_01_Vb_of_Last_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vb_of_Last_Day(false);
                             setExceedThresholdEVC_01_Vb_of_Last_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day, audioPlayingEVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low,maintainEVC_01_Vb_of_Last_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vb_of_Last_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vb_of_Last_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vb_of_Last_Day]);
          
              const handleInputChangeEVC_01_Vb_of_Last_Day = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Vb_of_Last_Day(newValue);
              };
          
              const handleInputChange2EVC_01_Vb_of_Last_Day = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Vb_of_Last_Day(newValue2);
              };
              const ChangeMaintainEVC_01_Vb_of_Last_Day = async () => {
                  try {
                      const newValue = !maintainEVC_01_Vb_of_Last_Day;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { EVC_01_Vb_of_Last_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vb_of_Last_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);
    const [audioPlayingEVC_01_Vm_of_Last_Day, setAudioPlayingEVC_01_Vm_of_Last_Day] = useState(false);
    const [inputValueEVC_01_Vm_of_Last_Day, setInputValueEVC_01_Vm_of_Last_Day] = useState<any>();
    const [inputValue2EVC_01_Vm_of_Last_Day, setInputValue2EVC_01_Vm_of_Last_Day] = useState<any>();
    const [EVC_01_Vm_of_Last_Day_High, setEVC_01_Vm_of_Last_Day_High] = useState<number | null>(null);
    const [EVC_01_Vm_of_Last_Day_Low, setEVC_01_Vm_of_Last_Day_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Vm_of_Last_Day, setExceedThresholdEVC_01_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_01_Vm_of_Last_Day, setMaintainEVC_01_Vm_of_Last_Day] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_01_Vm_of_Last_Day_High === 'string' && typeof EVC_01_Vm_of_Last_Day_Low === 'string' && EVC_01_Vm_of_Last_Day !== null && maintainEVC_01_Vm_of_Last_Day === false
            ) {
                const highValue = parseFloat(EVC_01_Vm_of_Last_Day_High);
                const lowValue = parseFloat(EVC_01_Vm_of_Last_Day_Low);
                const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Last_DayValue)) {
                    if (highValue <= EVC_01_Vm_of_Last_DayValue || EVC_01_Vm_of_Last_DayValue <= lowValue) {
                        if (!audioPlayingEVC_01_Vm_of_Last_Day) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_01_Vm_of_Last_Day(true);
                            setExceedThresholdEVC_01_Vm_of_Last_Day(true);
                        }
                    } else {
                       setAudioPlayingEVC_01_Vm_of_Last_Day(false);
                       setExceedThresholdEVC_01_Vm_of_Last_Day(false);
                    }
                } 
            } 
        }, [EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day, audioPlayingEVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low,maintainEVC_01_Vm_of_Last_Day]);
    
        useEffect(() => {
            if (audioPlayingEVC_01_Vm_of_Last_Day) {
                const audioEnded = () => {
                   setAudioPlayingEVC_01_Vm_of_Last_Day(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_01_Vm_of_Last_Day]);
    
        const handleInputChangeEVC_01_Vm_of_Last_Day = (event: any) => {
            const newValue = event.target.value;
            setInputValueEVC_01_Vm_of_Last_Day(newValue);
        };
    
        const handleInputChange2EVC_01_Vm_of_Last_Day = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2EVC_01_Vm_of_Last_Day(newValue2);
        };
        const ChangeMaintainEVC_01_Vm_of_Last_Day = async () => {
            try {
                const newValue = !maintainEVC_01_Vm_of_Last_Day;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    { EVC_01_Vm_of_Last_Day_Maintain: newValue }
                );
                setMaintainEVC_01_Vm_of_Last_Day(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

        const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
        const [audioPlayingEVC_02_Remain_Battery_Service_Life, setAudioPlayingEVC_02_Remain_Battery_Service_Life] = useState(false);
        const [inputValueEVC_02_Remain_Battery_Service_Life, setInputValueEVC_02_Remain_Battery_Service_Life] = useState<any>();
        const [inputValue2EVC_02_Remain_Battery_Service_Life, setInputValue2EVC_02_Remain_Battery_Service_Life] = useState<any>();
        const [EVC_02_Remain_Battery_Service_Life_High, setEVC_02_Remain_Battery_Service_Life_High] = useState<number | null>(null);
        const [EVC_02_Remain_Battery_Service_Life_Low, setEVC_02_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Remain_Battery_Service_Life, setExceedThresholdEVC_02_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Remain_Battery_Service_Life, setMaintainEVC_02_Remain_Battery_Service_Life] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Remain_Battery_Service_Life_High === 'string' && typeof EVC_02_Remain_Battery_Service_Life_Low === 'string' && EVC_02_Remain_Battery_Service_Life !== null && maintainEVC_02_Remain_Battery_Service_Life === false
                ) {
                    const highValue = parseFloat(EVC_02_Remain_Battery_Service_Life_High);
                    const lowValue = parseFloat(EVC_02_Remain_Battery_Service_Life_Low);
                    const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Remain_Battery_Service_LifeValue)) {
                        if (highValue <= EVC_02_Remain_Battery_Service_LifeValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue) {
                            if (!audioPlayingEVC_02_Remain_Battery_Service_Life) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Remain_Battery_Service_Life(true);
                                setExceedThresholdEVC_02_Remain_Battery_Service_Life(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Remain_Battery_Service_Life(false);
                           setExceedThresholdEVC_02_Remain_Battery_Service_Life(false);
                        }
                    } 
                } 
            }, [EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life, audioPlayingEVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_Low,maintainEVC_02_Remain_Battery_Service_Life]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Remain_Battery_Service_Life) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Remain_Battery_Service_Life(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Remain_Battery_Service_Life]);
        
            const handleInputChangeEVC_02_Remain_Battery_Service_Life = (event: any) => {
                const newValue = event.target.value;
                setInputValueEVC_02_Remain_Battery_Service_Life(newValue);
            };
        
            const handleInputChange2EVC_02_Remain_Battery_Service_Life = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2EVC_02_Remain_Battery_Service_Life(newValue2);
            };
            const ChangeMaintainEVC_02_Remain_Battery_Service_Life = async () => {
                try {
                    const newValue = !maintainEVC_02_Remain_Battery_Service_Life;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
                    );
                    setMaintainEVC_02_Remain_Battery_Service_Life(newValue);
                    
                } catch (error) {}
            };
    
    
        // =================================================================================================================== 

            // =================================================================================================================== 

    const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);
    const [audioPlayingEVC_02_Temperature, setAudioPlayingEVC_02_Temperature] = useState(false);
    const [inputValueEVC_02_Temperature, setInputValueEVC_02_Temperature] = useState<any>();
    const [inputValue2EVC_02_Temperature, setInputValue2EVC_02_Temperature] = useState<any>();
    const [EVC_02_Temperature_High, setEVC_02_Temperature_High] = useState<number | null>(null);
    const [EVC_02_Temperature_Low, setEVC_02_Temperature_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Temperature, setExceedThresholdEVC_02_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_02_Temperature, setMaintainEVC_02_Temperature] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Temperature_High === 'string' && typeof EVC_02_Temperature_Low === 'string' && EVC_02_Temperature !== null && maintainEVC_02_Temperature === false
            ) {
                const highValue = parseFloat(EVC_02_Temperature_High);
                const lowValue = parseFloat(EVC_02_Temperature_Low);
                const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_TemperatureValue)) {
                    if (highValue <= EVC_02_TemperatureValue || EVC_02_TemperatureValue <= lowValue) {
                        if (!audioPlayingEVC_02_Temperature) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Temperature(true);
                            setExceedThresholdEVC_02_Temperature(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Temperature(false);
                       setExceedThresholdEVC_02_Temperature(false);
                    }
                } 
            } 
        }, [EVC_02_Temperature_High, EVC_02_Temperature, audioPlayingEVC_02_Temperature, EVC_02_Temperature_Low,maintainEVC_02_Temperature]);
    
        useEffect(() => {
            if (audioPlayingEVC_02_Temperature) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Temperature(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Temperature]);
    
        const handleInputChangeEVC_02_Temperature = (event: any) => {
            const newValue = event.target.value;
            setInputValueEVC_02_Temperature(newValue);
        };
    
        const handleInputChange2EVC_02_Temperature = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2EVC_02_Temperature(newValue2);
        };
        const ChangeMaintainEVC_02_Temperature = async () => {
            try {
                const newValue = !maintainEVC_02_Temperature;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    { EVC_02_Temperature_Maintain: newValue }
                );
                setMaintainEVC_02_Temperature(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 


    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
    const [audioPlayingEVC_02_Pressure, setAudioPlayingEVC_02_Pressure] = useState(false);
    const [inputValueEVC_02_Pressure, setInputValueEVC_02_Pressure] = useState<any>();
    const [inputValue2EVC_02_Pressure, setInputValue2EVC_02_Pressure] = useState<any>();
    const [EVC_02_Pressure_High, setEVC_02_Pressure_High] = useState<number | null>(null);
    const [EVC_02_Pressure_Low, setEVC_02_Pressure_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Pressure, setExceedThresholdEVC_02_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Pressure_High === 'string' && typeof EVC_02_Pressure_Low === 'string' && EVC_02_Pressure !== null && maintainEVC_02_Pressure === false
            ) {
                const highValue = parseFloat(EVC_02_Pressure_High);
                const lowValue = parseFloat(EVC_02_Pressure_Low);
                const EVC_02_PressureValue = parseFloat(EVC_02_Pressure);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_PressureValue)) {
                    if (highValue <= EVC_02_PressureValue || EVC_02_PressureValue <= lowValue) {
                        if (!audioPlayingEVC_02_Pressure) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Pressure(true);
                            setExceedThresholdEVC_02_Pressure(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Pressure(false);
                       setExceedThresholdEVC_02_Pressure(false);
                    }
                } 
            } 
        }, [EVC_02_Pressure_High, EVC_02_Pressure, audioPlayingEVC_02_Pressure, EVC_02_Pressure_Low,maintainEVC_02_Pressure]);
    
        useEffect(() => {
            if (audioPlayingEVC_02_Pressure) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Pressure(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Pressure]);
    
        const handleInputChangeEVC_02_Pressure = (event: any) => {
            const newValue = event.target.value;
            setInputValueEVC_02_Pressure(newValue);
        };
    
        const handleInputChange2EVC_02_Pressure = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2EVC_02_Pressure(newValue2);
        };
        const ChangeMaintainEVC_02_Pressure = async () => {
            try {
                const newValue = !maintainEVC_02_Pressure;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    { EVC_02_Pressure_Maintain: newValue }
                );
                setMaintainEVC_02_Pressure(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
const [audioPlayingEVC_02_Volume_at_Base_Condition, setAudioPlayingEVC_02_Volume_at_Base_Condition] = useState(false);
const [inputValueEVC_02_Volume_at_Base_Condition, setInputValueEVC_02_Volume_at_Base_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Base_Condition, setInputValue2EVC_02_Volume_at_Base_Condition] = useState<any>();
const [EVC_02_Volume_at_Base_Condition_High, setEVC_02_Volume_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Base_Condition_Low, setEVC_02_Volume_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Base_Condition, setExceedThresholdEVC_02_Volume_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Volume_at_Base_Condition, setMaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);


    useEffect(() => {
        if (typeof EVC_02_Volume_at_Base_Condition_High === 'string' && typeof EVC_02_Volume_at_Base_Condition_Low === 'string' && EVC_02_Volume_at_Base_Condition !== null && maintainEVC_02_Volume_at_Base_Condition === false
        ) {
            const highValue = parseFloat(EVC_02_Volume_at_Base_Condition_High);
            const lowValue = parseFloat(EVC_02_Volume_at_Base_Condition_Low);
            const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Base_ConditionValue)) {
                if (highValue <= EVC_02_Volume_at_Base_ConditionValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue) {
                    if (!audioPlayingEVC_02_Volume_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_02_Volume_at_Base_Condition(true);
                        setExceedThresholdEVC_02_Volume_at_Base_Condition(true);
                    }
                } else {
                   setAudioPlayingEVC_02_Volume_at_Base_Condition(false);
                   setExceedThresholdEVC_02_Volume_at_Base_Condition(false);
                }
            } 
        } 
    }, [EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition, audioPlayingEVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_Low,maintainEVC_02_Volume_at_Base_Condition]);

    useEffect(() => {
        if (audioPlayingEVC_02_Volume_at_Base_Condition) {
            const audioEnded = () => {
               setAudioPlayingEVC_02_Volume_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_02_Volume_at_Base_Condition]);

    const handleInputChangeEVC_02_Volume_at_Base_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputValueEVC_02_Volume_at_Base_Condition(newValue);
    };

    const handleInputChange2EVC_02_Volume_at_Base_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2EVC_02_Volume_at_Base_Condition(newValue2);
    };
    const ChangeMaintainEVC_02_Volume_at_Base_Condition = async () => {
        try {
            const newValue = !maintainEVC_02_Volume_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Volume_at_Base_Condition(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 


const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [audioPlayingEVC_02_Volume_at_Measurement_Condition, setAudioPlayingEVC_02_Volume_at_Measurement_Condition] = useState(false);
const [inputValueEVC_02_Volume_at_Measurement_Condition, setInputValueEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Measurement_Condition, setInputValue2EVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [EVC_02_Volume_at_Measurement_Condition_High, setEVC_02_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Measurement_Condition_Low, setEVC_02_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Measurement_Condition, setExceedThresholdEVC_02_Volume_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Volume_at_Measurement_Condition, setMaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);


    useEffect(() => {
        if (typeof EVC_02_Volume_at_Measurement_Condition_High === 'string' && typeof EVC_02_Volume_at_Measurement_Condition_Low === 'string' && EVC_02_Volume_at_Measurement_Condition !== null && maintainEVC_02_Volume_at_Measurement_Condition === false
        ) {
            const highValue = parseFloat(EVC_02_Volume_at_Measurement_Condition_High);
            const lowValue = parseFloat(EVC_02_Volume_at_Measurement_Condition_Low);
            const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_02_Volume_at_Measurement_ConditionValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue) {
                    if (!audioPlayingEVC_02_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_02_Volume_at_Measurement_Condition(true);
                        setExceedThresholdEVC_02_Volume_at_Measurement_Condition(true);
                    }
                } else {
                   setAudioPlayingEVC_02_Volume_at_Measurement_Condition(false);
                   setExceedThresholdEVC_02_Volume_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition, audioPlayingEVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_Low,maintainEVC_02_Volume_at_Measurement_Condition]);

    useEffect(() => {
        if (audioPlayingEVC_02_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
               setAudioPlayingEVC_02_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_02_Volume_at_Measurement_Condition]);

    const handleInputChangeEVC_02_Volume_at_Measurement_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputValueEVC_02_Volume_at_Measurement_Condition(newValue);
    };

    const handleInputChange2EVC_02_Volume_at_Measurement_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2EVC_02_Volume_at_Measurement_Condition(newValue2);
    };
    const ChangeMaintainEVC_02_Volume_at_Measurement_Condition = async () => {
        try {
            const newValue = !maintainEVC_02_Volume_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Volume_at_Measurement_Condition(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 

    // =================================================================================================================== 

const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
const [audioPlayingEVC_02_Flow_at_Base_Condition, setAudioPlayingEVC_02_Flow_at_Base_Condition] = useState(false);
const [inputValueEVC_02_Flow_at_Base_Condition, setInputValueEVC_02_Flow_at_Base_Condition] = useState<any>();
const [inputValue2EVC_02_Flow_at_Base_Condition, setInputValue2EVC_02_Flow_at_Base_Condition] = useState<any>();
const [EVC_02_Flow_at_Base_Condition_High, setEVC_02_Flow_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_02_Flow_at_Base_Condition_Low, setEVC_02_Flow_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Flow_at_Base_Condition, setExceedThresholdEVC_02_Flow_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Flow_at_Base_Condition, setMaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);


useEffect(() => {
    if (typeof EVC_02_Flow_at_Base_Condition_High === 'string' && typeof EVC_02_Flow_at_Base_Condition_Low === 'string' && EVC_02_Flow_at_Base_Condition !== null && maintainEVC_02_Flow_at_Base_Condition === false
    ) {
        const highValue = parseFloat(EVC_02_Flow_at_Base_Condition_High);
        const lowValue = parseFloat(EVC_02_Flow_at_Base_Condition_Low);
        const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Base_ConditionValue)) {
            if (highValue <= EVC_02_Flow_at_Base_ConditionValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue) {
                if (!audioPlayingEVC_02_Flow_at_Base_Condition) {
                    audioRef.current?.play();
                    setAudioPlayingEVC_02_Flow_at_Base_Condition(true);
                    setExceedThresholdEVC_02_Flow_at_Base_Condition(true);
                }
            } else {
               setAudioPlayingEVC_02_Flow_at_Base_Condition(false);
               setExceedThresholdEVC_02_Flow_at_Base_Condition(false);
            }
        } 
    } 
}, [EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition, audioPlayingEVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_Low,maintainEVC_02_Flow_at_Base_Condition]);

useEffect(() => {
    if (audioPlayingEVC_02_Flow_at_Base_Condition) {
        const audioEnded = () => {
           setAudioPlayingEVC_02_Flow_at_Base_Condition(false);
        };
        audioRef.current?.addEventListener('ended', audioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', audioEnded);
        };
    }
}, [audioPlayingEVC_02_Flow_at_Base_Condition]);

const handleInputChangeEVC_02_Flow_at_Base_Condition = (event: any) => {
    const newValue = event.target.value;
    setInputValueEVC_02_Flow_at_Base_Condition(newValue);
};

const handleInputChange2EVC_02_Flow_at_Base_Condition = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2EVC_02_Flow_at_Base_Condition(newValue2);
};
const ChangeMaintainEVC_02_Flow_at_Base_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Flow_at_Base_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
            { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
        );
        setMaintainEVC_02_Flow_at_Base_Condition(newValue);
        
    } catch (error) {}
};


// =================================================================================================================== 


        // =================================================================================================================== 

        const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
        const [audioPlayingEVC_02_Flow_at_Measurement_Condition, setAudioPlayingEVC_02_Flow_at_Measurement_Condition] = useState(false);
        const [inputValueEVC_02_Flow_at_Measurement_Condition, setInputValueEVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [inputValue2EVC_02_Flow_at_Measurement_Condition, setInputValue2EVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
        const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setExceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Flow_at_Measurement_Condition, setMaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Flow_at_Measurement_Condition_High === 'string' && typeof EVC_02_Flow_at_Measurement_Condition_Low === 'string' && EVC_02_Flow_at_Measurement_Condition !== null && maintainEVC_02_Flow_at_Measurement_Condition === false
                ) {
                    const highValue = parseFloat(EVC_02_Flow_at_Measurement_Condition_High);
                    const lowValue = parseFloat(EVC_02_Flow_at_Measurement_Condition_Low);
                    const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Measurement_ConditionValue)) {
                        if (highValue <= EVC_02_Flow_at_Measurement_ConditionValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue) {
                            if (!audioPlayingEVC_02_Flow_at_Measurement_Condition) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Flow_at_Measurement_Condition(true);
                                setExceedThresholdEVC_02_Flow_at_Measurement_Condition(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Flow_at_Measurement_Condition(false);
                           setExceedThresholdEVC_02_Flow_at_Measurement_Condition(false);
                        }
                    } 
                } 
            }, [EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition, audioPlayingEVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_Low,maintainEVC_02_Flow_at_Measurement_Condition]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Flow_at_Measurement_Condition) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Flow_at_Measurement_Condition(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Flow_at_Measurement_Condition]);
        
            const handleInputChangeEVC_02_Flow_at_Measurement_Condition = (event: any) => {
                const newValue = event.target.value;
                setInputValueEVC_02_Flow_at_Measurement_Condition(newValue);
            };
        
            const handleInputChange2EVC_02_Flow_at_Measurement_Condition = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2EVC_02_Flow_at_Measurement_Condition(newValue2);
            };
            const ChangeMaintainEVC_02_Flow_at_Measurement_Condition = async () => {
                try {
                    const newValue = !maintainEVC_02_Flow_at_Measurement_Condition;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
                    );
                    setMaintainEVC_02_Flow_at_Measurement_Condition(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
        
        const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
        const [audioPlayingEVC_02_Vb_of_Current_Day, setAudioPlayingEVC_02_Vb_of_Current_Day] = useState(false);
        const [inputValueEVC_02_Vb_of_Current_Day, setInputValueEVC_02_Vb_of_Current_Day] = useState<any>();
        const [inputValue2EVC_02_Vb_of_Current_Day, setInputValue2EVC_02_Vb_of_Current_Day] = useState<any>();
        const [EVC_02_Vb_of_Current_Day_High, setEVC_02_Vb_of_Current_Day_High] = useState<number | null>(null);
        const [EVC_02_Vb_of_Current_Day_Low, setEVC_02_Vb_of_Current_Day_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Vb_of_Current_Day, setExceedThresholdEVC_02_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Vb_of_Current_Day, setMaintainEVC_02_Vb_of_Current_Day] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Vb_of_Current_Day_High === 'string' && typeof EVC_02_Vb_of_Current_Day_Low === 'string' && EVC_02_Vb_of_Current_Day !== null && maintainEVC_02_Vb_of_Current_Day === false
                ) {
                    const highValue = parseFloat(EVC_02_Vb_of_Current_Day_High);
                    const lowValue = parseFloat(EVC_02_Vb_of_Current_Day_Low);
                    const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Current_DayValue)) {
                        if (highValue <= EVC_02_Vb_of_Current_DayValue || EVC_02_Vb_of_Current_DayValue <= lowValue) {
                            if (!audioPlayingEVC_02_Vb_of_Current_Day) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Vb_of_Current_Day(true);
                                setExceedThresholdEVC_02_Vb_of_Current_Day(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Vb_of_Current_Day(false);
                           setExceedThresholdEVC_02_Vb_of_Current_Day(false);
                        }
                    } 
                } 
            }, [EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day, audioPlayingEVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_Low,maintainEVC_02_Vb_of_Current_Day]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Vb_of_Current_Day) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Vb_of_Current_Day(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Vb_of_Current_Day]);
        
            const handleInputChangeEVC_02_Vb_of_Current_Day = (event: any) => {
                const newValue = event.target.value;
                setInputValueEVC_02_Vb_of_Current_Day(newValue);
            };
        
            const handleInputChange2EVC_02_Vb_of_Current_Day = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2EVC_02_Vb_of_Current_Day(newValue2);
            };
            const ChangeMaintainEVC_02_Vb_of_Current_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vb_of_Current_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Vb_of_Current_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vb_of_Current_Day(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
        const [audioPlayingEVC_02_Vm_of_Current_Day, setAudioPlayingEVC_02_Vm_of_Current_Day] = useState(false);
        const [inputValueEVC_02_Vm_of_Current_Day, setInputValueEVC_02_Vm_of_Current_Day] = useState<any>();
        const [inputValue2EVC_02_Vm_of_Current_Day, setInputValue2EVC_02_Vm_of_Current_Day] = useState<any>();
        const [EVC_02_Vm_of_Current_Day_High, setEVC_02_Vm_of_Current_Day_High] = useState<number | null>(null);
        const [EVC_02_Vm_of_Current_Day_Low, setEVC_02_Vm_of_Current_Day_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Vm_of_Current_Day, setExceedThresholdEVC_02_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Vm_of_Current_Day, setMaintainEVC_02_Vm_of_Current_Day] = useState<boolean>(false);
        
        
        useEffect(() => {
            if (typeof EVC_02_Vm_of_Current_Day_High === 'string' && typeof EVC_02_Vm_of_Current_Day_Low === 'string' && EVC_02_Vm_of_Current_Day !== null && maintainEVC_02_Vm_of_Current_Day === false
            ) {
                const highValue = parseFloat(EVC_02_Vm_of_Current_Day_High);
                const lowValue = parseFloat(EVC_02_Vm_of_Current_Day_Low);
                const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Current_DayValue)) {
                    if (highValue <= EVC_02_Vm_of_Current_DayValue || EVC_02_Vm_of_Current_DayValue <= lowValue) {
                        if (!audioPlayingEVC_02_Vm_of_Current_Day) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Vm_of_Current_Day(true);
                            setExceedThresholdEVC_02_Vm_of_Current_Day(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Vm_of_Current_Day(false);
                       setExceedThresholdEVC_02_Vm_of_Current_Day(false);
                    }
                } 
            } 
        }, [EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day, audioPlayingEVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_Low,maintainEVC_02_Vm_of_Current_Day]);
        
        useEffect(() => {
            if (audioPlayingEVC_02_Vm_of_Current_Day) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Vm_of_Current_Day(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Vm_of_Current_Day]);
        
        const handleInputChangeEVC_02_Vm_of_Current_Day = (event: any) => {
            const newValue = event.target.value;
            setInputValueEVC_02_Vm_of_Current_Day(newValue);
        };
        
        const handleInputChange2EVC_02_Vm_of_Current_Day = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2EVC_02_Vm_of_Current_Day(newValue2);
        };
        const ChangeMaintainEVC_02_Vm_of_Current_Day = async () => {
            try {
                const newValue = !maintainEVC_02_Vm_of_Current_Day;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    { EVC_02_Vm_of_Current_Day_Maintain: newValue }
                );
                setMaintainEVC_02_Vm_of_Current_Day(newValue);
                
            } catch (error) {}
        };
        
        
        // =================================================================================================================== 
        

            // =================================================================================================================== 
        
            const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
            const [audioPlayingEVC_02_Vb_of_Last_Day, setAudioPlayingEVC_02_Vb_of_Last_Day] = useState(false);
            const [inputValueEVC_02_Vb_of_Last_Day, setInputValueEVC_02_Vb_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vb_of_Last_Day, setInputValue2EVC_02_Vb_of_Last_Day] = useState<any>();
            const [EVC_02_Vb_of_Last_Day_High, setEVC_02_Vb_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vb_of_Last_Day_Low, setEVC_02_Vb_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vb_of_Last_Day, setExceedThresholdEVC_02_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainEVC_02_Vb_of_Last_Day, setMaintainEVC_02_Vb_of_Last_Day] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof EVC_02_Vb_of_Last_Day_High === 'string' && typeof EVC_02_Vb_of_Last_Day_Low === 'string' && EVC_02_Vb_of_Last_Day !== null && maintainEVC_02_Vb_of_Last_Day === false
                ) {
                    const highValue = parseFloat(EVC_02_Vb_of_Last_Day_High);
                    const lowValue = parseFloat(EVC_02_Vb_of_Last_Day_Low);
                    const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Last_DayValue)) {
                        if (highValue <= EVC_02_Vb_of_Last_DayValue || EVC_02_Vb_of_Last_DayValue <= lowValue) {
                            if (!audioPlayingEVC_02_Vb_of_Last_Day) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Vb_of_Last_Day(true);
                                setExceedThresholdEVC_02_Vb_of_Last_Day(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Vb_of_Last_Day(false);
                           setExceedThresholdEVC_02_Vb_of_Last_Day(false);
                        }
                    } 
                } 
            }, [EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day, audioPlayingEVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_Low,maintainEVC_02_Vb_of_Last_Day]);
            
            useEffect(() => {
                if (audioPlayingEVC_02_Vb_of_Last_Day) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Vb_of_Last_Day(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Vb_of_Last_Day]);
            
            const handleInputChangeEVC_02_Vb_of_Last_Day = (event: any) => {
                const newValue = event.target.value;
                setInputValueEVC_02_Vb_of_Last_Day(newValue);
            };
            
            const handleInputChange2EVC_02_Vb_of_Last_Day = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2EVC_02_Vb_of_Last_Day(newValue2);
            };
            const ChangeMaintainEVC_02_Vb_of_Last_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vb_of_Last_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Vb_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vb_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 



            // =================================================================================================================== 
        
            const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
            const [audioPlayingEVC_02_Vm_of_Last_Day, setAudioPlayingEVC_02_Vm_of_Last_Day] = useState(false);
            const [inputValueEVC_02_Vm_of_Last_Day, setInputValueEVC_02_Vm_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vm_of_Last_Day, setInputValue2EVC_02_Vm_of_Last_Day] = useState<any>();
            const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vm_of_Last_Day, setExceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainEVC_02_Vm_of_Last_Day, setMaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof EVC_02_Vm_of_Last_Day_High === 'string' && typeof EVC_02_Vm_of_Last_Day_Low === 'string' && EVC_02_Vm_of_Last_Day !== null && maintainEVC_02_Vm_of_Last_Day === false
                ) {
                    const highValue = parseFloat(EVC_02_Vm_of_Last_Day_High);
                    const lowValue = parseFloat(EVC_02_Vm_of_Last_Day_Low);
                    const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Last_DayValue)) {
                        if (highValue <= EVC_02_Vm_of_Last_DayValue || EVC_02_Vm_of_Last_DayValue <= lowValue) {
                            if (!audioPlayingEVC_02_Vm_of_Last_Day) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Vm_of_Last_Day(true);
                                setExceedThresholdEVC_02_Vm_of_Last_Day(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Vm_of_Last_Day(false);
                           setExceedThresholdEVC_02_Vm_of_Last_Day(false);
                        }
                    } 
                } 
            }, [EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day, audioPlayingEVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_Low,maintainEVC_02_Vm_of_Last_Day]);
            
            useEffect(() => {
                if (audioPlayingEVC_02_Vm_of_Last_Day) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Vm_of_Last_Day(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Vm_of_Last_Day]);
            
            const handleInputChangeEVC_02_Vm_of_Last_Day = (event: any) => {
                const newValue = event.target.value;
                setInputValueEVC_02_Vm_of_Last_Day(newValue);
            };
            
            const handleInputChange2EVC_02_Vm_of_Last_Day = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2EVC_02_Vm_of_Last_Day(newValue2);
            };
            const ChangeMaintainEVC_02_Vm_of_Last_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vm_of_Last_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 


                   // =================================================================================================================== 
        
                   const [FC_01_Today_Values_Volume, setFC_01_Today_Values_Volume] = useState<string | null>(null);
                   const [audioPlayingFC_01_Today_Values_Volume, setAudioPlayingFC_01_Today_Values_Volume] = useState(false);
                   const [inputValueFC_01_Today_Values_Volume, setInputValueFC_01_Today_Values_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Volume, setInputValue2FC_01_Today_Values_Volume] = useState<any>();
                   const [FC_01_Today_Values_Volume_High, setFC_01_Today_Values_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Volume_Low, setFC_01_Today_Values_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Volume, setExceedThresholdFC_01_Today_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Volume, setMaintainFC_01_Today_Values_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                       if (typeof FC_01_Today_Values_Volume_High === 'string' && typeof FC_01_Today_Values_Volume_Low === 'string' && FC_01_Today_Values_Volume !== null && maintainFC_01_Today_Values_Volume === false
                       ) {
                           const highValue = parseFloat(FC_01_Today_Values_Volume_High);
                           const lowValue = parseFloat(FC_01_Today_Values_Volume_Low);
                           const FC_01_Today_Values_VolumeValue = parseFloat(FC_01_Today_Values_Volume);
                   
                           if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Today_Values_VolumeValue)) {
                               if (highValue <= FC_01_Today_Values_VolumeValue || FC_01_Today_Values_VolumeValue <= lowValue) {
                                   if (!audioPlayingFC_01_Today_Values_Volume) {
                                       audioRef.current?.play();
                                       setAudioPlayingFC_01_Today_Values_Volume(true);
                                       setExceedThresholdFC_01_Today_Values_Volume(true);
                                   }
                               } else {
                                  setAudioPlayingFC_01_Today_Values_Volume(false);
                                  setExceedThresholdFC_01_Today_Values_Volume(false);
                               }
                           } 
                       } 
                   }, [FC_01_Today_Values_Volume_High, FC_01_Today_Values_Volume, audioPlayingFC_01_Today_Values_Volume, FC_01_Today_Values_Volume_Low,maintainFC_01_Today_Values_Volume]);
                   
                   useEffect(() => {
                       if (audioPlayingFC_01_Today_Values_Volume) {
                           const audioEnded = () => {
                              setAudioPlayingFC_01_Today_Values_Volume(false);
                           };
                           audioRef.current?.addEventListener('ended', audioEnded);
                           return () => {
                               audioRef.current?.removeEventListener('ended', audioEnded);
                           };
                       }
                   }, [audioPlayingFC_01_Today_Values_Volume]);
                   
                   const handleInputChangeFC_01_Today_Values_Volume = (event: any) => {
                       const newValue = event.target.value;
                       setInputValueFC_01_Today_Values_Volume(newValue);
                   };
                   
                   const handleInputChange2FC_01_Today_Values_Volume = (event: any) => {
                       const newValue2 = event.target.value;
                       setInputValue2FC_01_Today_Values_Volume(newValue2);
                   };
                   const ChangeMaintainFC_01_Today_Values_Volume = async () => {
                       try {
                           const newValue = !maintainFC_01_Today_Values_Volume;
                           await httpApi.post(
                               `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                               { FC_01_Today_Values_Volume_Maintain: newValue }
                           );
                           setMaintainFC_01_Today_Values_Volume(newValue);
                           
                       } catch (error) {}
                   };
                   
                   
                   // =================================================================================================================== 

                   // =================================================================================================================== 
        
                   const [FC_01_Today_Values_Uncorrected_Volume, setFC_01_Today_Values_Uncorrected_Volume] = useState<string | null>(null);
                   const [audioPlayingFC_01_Today_Values_Uncorrected_Volume, setAudioPlayingFC_01_Today_Values_Uncorrected_Volume] = useState(false);
                   const [inputValueFC_01_Today_Values_Uncorrected_Volume, setInputValueFC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Uncorrected_Volume, setInputValue2FC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [FC_01_Today_Values_Uncorrected_Volume_High, setFC_01_Today_Values_Uncorrected_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Uncorrected_Volume_Low, setFC_01_Today_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Uncorrected_Volume, setExceedThresholdFC_01_Today_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Uncorrected_Volume, setMaintainFC_01_Today_Values_Uncorrected_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                       if (typeof FC_01_Today_Values_Uncorrected_Volume_High === 'string' && typeof FC_01_Today_Values_Uncorrected_Volume_Low === 'string' && FC_01_Today_Values_Uncorrected_Volume !== null && maintainFC_01_Today_Values_Uncorrected_Volume === false
                       ) {
                           const highValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume_High);
                           const lowValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume_Low);
                           const FC_01_Today_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume);
                   
                           if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Today_Values_Uncorrected_VolumeValue)) {
                               if (highValue <= FC_01_Today_Values_Uncorrected_VolumeValue || FC_01_Today_Values_Uncorrected_VolumeValue <= lowValue) {
                                   if (!audioPlayingFC_01_Today_Values_Uncorrected_Volume) {
                                       audioRef.current?.play();
                                       setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(true);
                                       setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(true);
                                   }
                               } else {
                                  setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(false);
                                  setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(false);
                               }
                           } 
                       } 
                   }, [FC_01_Today_Values_Uncorrected_Volume_High, FC_01_Today_Values_Uncorrected_Volume, audioPlayingFC_01_Today_Values_Uncorrected_Volume, FC_01_Today_Values_Uncorrected_Volume_Low,maintainFC_01_Today_Values_Uncorrected_Volume]);
                   
                   useEffect(() => {
                       if (audioPlayingFC_01_Today_Values_Uncorrected_Volume) {
                           const audioEnded = () => {
                              setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(false);
                           };
                           audioRef.current?.addEventListener('ended', audioEnded);
                           return () => {
                               audioRef.current?.removeEventListener('ended', audioEnded);
                           };
                       }
                   }, [audioPlayingFC_01_Today_Values_Uncorrected_Volume]);
                   
                   const handleInputChangeFC_01_Today_Values_Uncorrected_Volume = (event: any) => {
                       const newValue = event.target.value;
                       setInputValueFC_01_Today_Values_Uncorrected_Volume(newValue);
                   };
                   
                   const handleInputChange2FC_01_Today_Values_Uncorrected_Volume = (event: any) => {
                       const newValue2 = event.target.value;
                       setInputValue2FC_01_Today_Values_Uncorrected_Volume(newValue2);
                   };
                   const ChangeMaintainFC_01_Today_Values_Uncorrected_Volume = async () => {
                       try {
                           const newValue = !maintainFC_01_Today_Values_Uncorrected_Volume;
                           await httpApi.post(
                               `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                               { FC_01_Today_Values_Uncorrected_Volume_Maintain: newValue }
                           );
                           setMaintainFC_01_Today_Values_Uncorrected_Volume(newValue);
                           
                       } catch (error) {}
                   };
                   
                   
                   // =================================================================================================================== 

                           // =================================================================================================================== 
        
                           const [FC_01_Yesterday_Values_Volume, setFC_01_Yesterday_Values_Volume] = useState<string | null>(null);
                           const [audioPlayingFC_01_Yesterday_Values_Volume, setAudioPlayingFC_01_Yesterday_Values_Volume] = useState(false);
                           const [inputValueFC_01_Yesterday_Values_Volume, setInputValueFC_01_Yesterday_Values_Volume] = useState<any>();
                           const [inputValue2FC_01_Yesterday_Values_Volume, setInputValue2FC_01_Yesterday_Values_Volume] = useState<any>();
                           const [FC_01_Yesterday_Values_Volume_High, setFC_01_Yesterday_Values_Volume_High] = useState<number | null>(null);
                           const [FC_01_Yesterday_Values_Volume_Low, setFC_01_Yesterday_Values_Volume_Low] = useState<number | null>(null);
                           const [exceedThresholdFC_01_Yesterday_Values_Volume, setExceedThresholdFC_01_Yesterday_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                           
                           const [maintainFC_01_Yesterday_Values_Volume, setMaintainFC_01_Yesterday_Values_Volume] = useState<boolean>(false);
                           
                           
                           useEffect(() => {
                               if (typeof FC_01_Yesterday_Values_Volume_High === 'string' && typeof FC_01_Yesterday_Values_Volume_Low === 'string' && FC_01_Yesterday_Values_Volume !== null && maintainFC_01_Yesterday_Values_Volume === false
                               ) {
                                   const highValue = parseFloat(FC_01_Yesterday_Values_Volume_High);
                                   const lowValue = parseFloat(FC_01_Yesterday_Values_Volume_Low);
                                   const FC_01_Yesterday_Values_VolumeValue = parseFloat(FC_01_Yesterday_Values_Volume);
                           
                                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Yesterday_Values_VolumeValue)) {
                                       if (highValue <= FC_01_Yesterday_Values_VolumeValue || FC_01_Yesterday_Values_VolumeValue <= lowValue) {
                                           if (!audioPlayingFC_01_Yesterday_Values_Volume) {
                                               audioRef.current?.play();
                                               setAudioPlayingFC_01_Yesterday_Values_Volume(true);
                                               setExceedThresholdFC_01_Yesterday_Values_Volume(true);
                                           }
                                       } else {
                                          setAudioPlayingFC_01_Yesterday_Values_Volume(false);
                                          setExceedThresholdFC_01_Yesterday_Values_Volume(false);
                                       }
                                   } 
                               } 
                           }, [FC_01_Yesterday_Values_Volume_High, FC_01_Yesterday_Values_Volume, audioPlayingFC_01_Yesterday_Values_Volume, FC_01_Yesterday_Values_Volume_Low,maintainFC_01_Yesterday_Values_Volume]);
                           
                           useEffect(() => {
                               if (audioPlayingFC_01_Yesterday_Values_Volume) {
                                   const audioEnded = () => {
                                      setAudioPlayingFC_01_Yesterday_Values_Volume(false);
                                   };
                                   audioRef.current?.addEventListener('ended', audioEnded);
                                   return () => {
                                       audioRef.current?.removeEventListener('ended', audioEnded);
                                   };
                               }
                           }, [audioPlayingFC_01_Yesterday_Values_Volume]);
                           
                           const handleInputChangeFC_01_Yesterday_Values_Volume = (event: any) => {
                               const newValue = event.target.value;
                               setInputValueFC_01_Yesterday_Values_Volume(newValue);
                           };
                           
                           const handleInputChange2FC_01_Yesterday_Values_Volume = (event: any) => {
                               const newValue2 = event.target.value;
                               setInputValue2FC_01_Yesterday_Values_Volume(newValue2);
                           };
                           const ChangeMaintainFC_01_Yesterday_Values_Volume = async () => {
                               try {
                                   const newValue = !maintainFC_01_Yesterday_Values_Volume;
                                   await httpApi.post(
                                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                                       { FC_01_Yesterday_Values_Volume_Maintain: newValue }
                                   );
                                   setMaintainFC_01_Yesterday_Values_Volume(newValue);
                                   
                               } catch (error) {}
                           };
                           
                           
                           // =================================================================================================================== 

        
                               const [FC_01_Yesterday_Values_Uncorrected_Volume, setFC_01_Yesterday_Values_Uncorrected_Volume] = useState<string | null>(null);
                               const [audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume, setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume] = useState(false);
                               const [inputValueFC_01_Yesterday_Values_Uncorrected_Volume, setInputValueFC_01_Yesterday_Values_Uncorrected_Volume] = useState<any>();
                               const [inputValue2FC_01_Yesterday_Values_Uncorrected_Volume, setInputValue2FC_01_Yesterday_Values_Uncorrected_Volume] = useState<any>();
                               const [FC_01_Yesterday_Values_Uncorrected_Volume_High, setFC_01_Yesterday_Values_Uncorrected_Volume_High] = useState<number | null>(null);
                               const [FC_01_Yesterday_Values_Uncorrected_Volume_Low, setFC_01_Yesterday_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
                               const [exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume, setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                               
                               const [maintainFC_01_Yesterday_Values_Uncorrected_Volume, setMaintainFC_01_Yesterday_Values_Uncorrected_Volume] = useState<boolean>(false);
                               
                               
                               useEffect(() => {
                                   if (typeof FC_01_Yesterday_Values_Uncorrected_Volume_High === 'string' && typeof FC_01_Yesterday_Values_Uncorrected_Volume_Low === 'string' && FC_01_Yesterday_Values_Uncorrected_Volume !== null && maintainFC_01_Yesterday_Values_Uncorrected_Volume === false
                                   ) {
                                       const highValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume_High);
                                       const lowValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume_Low);
                                       const FC_01_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume);
                               
                                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Yesterday_Values_Uncorrected_VolumeValue)) {
                                           if (highValue <= FC_01_Yesterday_Values_Uncorrected_VolumeValue || FC_01_Yesterday_Values_Uncorrected_VolumeValue <= lowValue) {
                                               if (!audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume) {
                                                   audioRef.current?.play();
                                                   setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(true);
                                                   setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(true);
                                               }
                                           } else {
                                              setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                              setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                           }
                                       } 
                                   } 
                               }, [FC_01_Yesterday_Values_Uncorrected_Volume_High, FC_01_Yesterday_Values_Uncorrected_Volume, audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume, FC_01_Yesterday_Values_Uncorrected_Volume_Low,maintainFC_01_Yesterday_Values_Uncorrected_Volume]);
                               
                               useEffect(() => {
                                   if (audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume) {
                                       const audioEnded = () => {
                                          setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                       };
                                       audioRef.current?.addEventListener('ended', audioEnded);
                                       return () => {
                                           audioRef.current?.removeEventListener('ended', audioEnded);
                                       };
                                   }
                               }, [audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume]);
                               
                               const handleInputChangeFC_01_Yesterday_Values_Uncorrected_Volume = (event: any) => {
                                   const newValue = event.target.value;
                                   setInputValueFC_01_Yesterday_Values_Uncorrected_Volume(newValue);
                               };
                               
                               const handleInputChange2FC_01_Yesterday_Values_Uncorrected_Volume = (event: any) => {
                                   const newValue2 = event.target.value;
                                   setInputValue2FC_01_Yesterday_Values_Uncorrected_Volume(newValue2);
                               };
                               const ChangeMaintainFC_01_Yesterday_Values_Uncorrected_Volume = async () => {
                                   try {
                                       const newValue = !maintainFC_01_Yesterday_Values_Uncorrected_Volume;
                                       await httpApi.post(
                                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                                           { FC_01_Yesterday_Values_Uncorrected_Volume_Maintain: newValue }
                                       );
                                       setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(newValue);
                                       
                                   } catch (error) {}
                               };
                               
                               
                               // =================================================================================================================== 


 // =================================================================================================================== 

 const [PIT_6001A, setPIT_6001A] = useState<string | null>(null);
 const [audioPlayingPIT_6001A, setAudioPlayingPIT_6001A] = useState(false);
 const [inputValuePIT_6001A, setInputValuePIT_6001A] = useState<any>();
 const [inputValue2PIT_6001A, setInputValue2PIT_6001A] = useState<any>();
 const [PIT_6001A_High, setPIT_6001A_High] = useState<number | null>(null);
 const [PIT_6001A_Low, setPIT_6001A_Low] = useState<number | null>(null);
 const [exceedThresholdPIT_6001A, setExceedThresholdPIT_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainPIT_6001A, setMaintainPIT_6001A] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof PIT_6001A_High === 'string' && typeof PIT_6001A_Low === 'string' && PIT_6001A !== null && maintainPIT_6001A === false
         ) {
             const highValue = parseFloat(PIT_6001A_High);
             const lowValue = parseFloat(PIT_6001A_Low);
             const PIT_6001AValue = parseFloat(PIT_6001A);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_6001AValue)) {
                 if (highValue <= PIT_6001AValue || PIT_6001AValue <= lowValue) {
                     if (!audioPlayingPIT_6001A) {
                         audioRef.current?.play();
                         setAudioPlayingPIT_6001A(true);
                         setExceedThresholdPIT_6001A(true);
                     }
                 } else {
                     setAudioPlayingPIT_6001A(false);
                     setExceedThresholdPIT_6001A(false);
                 }
             } 
         } 
     }, [PIT_6001A_High, PIT_6001A, audioPlayingPIT_6001A, PIT_6001A_Low,maintainPIT_6001A]);
 
     useEffect(() => {
         if (audioPlayingPIT_6001A) {
             const audioEnded = () => {
                 setAudioPlayingPIT_6001A(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingPIT_6001A]);
 
     const handleInputChangePIT_6001A = (event: any) => {
         const newValue = event.target.value;
         setInputValuePIT_6001A(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2PIT_6001A(newValue2);
     };
     const ChangeMaintainPIT_6001A = async () => {
         try {
             const newValue = !maintainPIT_6001A;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                 { PIT_6001A_Maintain: newValue }
             );
             setMaintainPIT_6001A(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [PIT_6001B, setPIT_6001B] = useState<string | null>(null);
      const [audioPlayingPIT_6001B, setAudioPlayingPIT_6001B] = useState(false);
      const [inputValuePIT_6001B, setInputValuePIT_6001B] = useState<any>();
      const [inputValue2PIT_6001B, setInputValue2PIT_6001B] = useState<any>();
      const [PIT_6001B_High, setPIT_6001B_High] = useState<number | null>(null);
      const [PIT_6001B_Low, setPIT_6001B_Low] = useState<number | null>(null);
      const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPIT_6001B, setMaintainPIT_6001B] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PIT_6001B_High === 'string' && typeof PIT_6001B_Low === 'string' && PIT_6001B !== null && maintainPIT_6001B === false
              ) {
                  const highValue = parseFloat(PIT_6001B_High);
                  const lowValue = parseFloat(PIT_6001B_Low);
                  const PIT_6001BValue = parseFloat(PIT_6001B);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_6001BValue)) {
                      if (highValue <= PIT_6001BValue || PIT_6001BValue <= lowValue) {
                          if (!audioPlayingPIT_6001B) {
                              audioRef.current?.play();
                              setAudioPlayingPIT_6001B(true);
                              setExceedThreshold302(true);
                          }
                      } else {
                         setAudioPlayingPIT_6001B(false);
                          setExceedThreshold302(false);
                      }
                  } 
              } 
          }, [PIT_6001B_High, PIT_6001B, audioPlayingPIT_6001B, PIT_6001B_Low,maintainPIT_6001B]);
      
          useEffect(() => {
              if (audioPlayingPIT_6001B) {
                  const audioEnded = () => {
                     setAudioPlayingPIT_6001B(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPIT_6001B]);
      
          const handleInputChangePIT_6001B = (event: any) => {
              const newValue = event.target.value;
              setInputValuePIT_6001B(newValue);
          };
      
          const handleInputChange2PIT_6001B = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PIT_6001B(newValue2);
          };
          const ChangeMaintainPIT_6001B = async () => {
              try {
                  const newValue = !maintainPIT_6001B;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                      { PIT_6001B_Maintain: newValue }
                  );
                  setMaintainPIT_6001B(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
      const [PIT_6002A, setPIT_6002A] = useState<string | null>(null);
      const [audioPlayingPIT_6002A, setAudioPlayingPIT_6002A] = useState(false);
      const [inputValuePIT_6002A, setInputValuePIT_6002A] = useState<any>();
      const [inputValue2PIT_6002A, setInputValue2PIT_6002A] = useState<any>();
      const [PIT_6002A_High, setPIT_6002A_High] = useState<number | null>(null);
      const [PIT_6002A_Low, setPIT_6002A_Low] = useState<number | null>(null);
      const [exceedThresholdPIT_6002A, setExceedThresholdPIT_6002A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPIT_6002A, setMaintainPIT_6002A] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PIT_6002A_High === 'string' && typeof PIT_6002A_Low === 'string' && PIT_6002A !== null && maintainPIT_6002A === false
              ) {
                  const highValue = parseFloat(PIT_6002A_High);
                  const lowValue = parseFloat(PIT_6002A_Low);
                  const PIT_6002AValue = parseFloat(PIT_6002A);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_6002AValue)) {
                      if (highValue <= PIT_6002AValue || PIT_6002AValue <= lowValue) {
                          if (!audioPlayingPIT_6002A) {
                              audioRef.current?.play();
                              setAudioPlayingPIT_6002A(true);
                              setExceedThresholdPIT_6002A(true);
                          }
                      } else {
                         setAudioPlayingPIT_6002A(false);
                         setExceedThresholdPIT_6002A(false);
                      }
                  } 
              } 
          }, [PIT_6002A_High, PIT_6002A, audioPlayingPIT_6002A, PIT_6002A_Low,maintainPIT_6002A]);
      
          useEffect(() => {
              if (audioPlayingPIT_6002A) {
                  const audioEnded = () => {
                     setAudioPlayingPIT_6002A(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPIT_6002A]);
      
          const handleInputChangePIT_6002A = (event: any) => {
              const newValue = event.target.value;
              setInputValuePIT_6002A(newValue);
          };
      
          const handleInputChange2PIT_6002A = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PIT_6002A(newValue2);
          };
          const ChangeMaintainPIT_6002A = async () => {
              try {
                  const newValue = !maintainPIT_6002A;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                      { PIT_6002A_Maintain: newValue }
                  );
                  setMaintainPIT_6002A(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
 
           const [PIT_6002B, setPIT_6002B] = useState<string | null>(null);
           const [audioPlayingPIT_6002B, setAudioPlayingPIT_6002B] = useState(false);
           const [inputValuePIT_6002B, setInputValuePIT_6002B] = useState<any>();
           const [inputValue2PIT_6002B, setInputValue2PIT_6002B] = useState<any>();
           const [PIT_6002B_High, setPIT_6002B_High] = useState<number | null>(null);
           const [PIT_6002B_Low, setPIT_6002B_Low] = useState<number | null>(null);
           const [exceedThresholdPIT_6002B, setExceedThresholdPIT_6002B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPIT_6002B, setMaintainPIT_6002B] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PIT_6002B_High === 'string' && typeof PIT_6002B_Low === 'string' && PIT_6002B !== null && maintainPIT_6002B === false
                   ) {
                       const highValue = parseFloat(PIT_6002B_High);
                       const lowValue = parseFloat(PIT_6002B_Low);
                       const PIT_6002BValue = parseFloat(PIT_6002B);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_6002BValue)) {
                           if (highValue <= PIT_6002BValue || PIT_6002BValue <= lowValue) {
                               if (!audioPlayingPIT_6002B) {
                                   audioRef.current?.play();
                                   setAudioPlayingPIT_6002B(true);
                                   setExceedThresholdPIT_6002B(true);
                               }
                           } else {
                              setAudioPlayingPIT_6002B(false);
                              setExceedThresholdPIT_6002B(false);
                           }
                       } 
                   } 
               }, [PIT_6002B_High, PIT_6002B, audioPlayingPIT_6002B, PIT_6002B_Low,maintainPIT_6002B]);
           
               useEffect(() => {
                   if (audioPlayingPIT_6002B) {
                       const audioEnded = () => {
                          setAudioPlayingPIT_6002B(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPIT_6002B]);
           
               const handleInputChangePIT_6002B = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePIT_6002B(newValue);
               };
           
               const handleInputChange2PIT_6002B = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PIT_6002B(newValue2);
               };
               const ChangeMaintainPIT_6002B = async () => {
                   try {
                       const newValue = !maintainPIT_6002B;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { PIT_6002B_Maintain: newValue }
                       );
                       setMaintainPIT_6002B(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [PIT_6003A, setPIT_6003A] = useState<string | null>(null);
           const [audioPlayingPIT_6003A, setAudioPlayingPIT_6003A] = useState(false);
           const [inputValuePIT_6003A, setInputValuePIT_6003A] = useState<any>();
           const [inputValue2PIT_6003A, setInputValue2PIT_6003A] = useState<any>();
           const [PIT_6003A_High, setPIT_6003A_High] = useState<number | null>(null);
           const [PIT_6003A_Low, setPIT_6003A_Low] = useState<number | null>(null);
           const [exceedThresholdPIT_6003A, setExceedThresholdPIT_6003A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPIT_6003A, setMaintainPIT_6003A] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PIT_6003A_High === 'string' && typeof PIT_6003A_Low === 'string' && PIT_6003A !== null && maintainPIT_6003A === false
                   ) {
                       const highValue = parseFloat(PIT_6003A_High);
                       const lowValue = parseFloat(PIT_6003A_Low);
                       const PIT_6003AValue = parseFloat(PIT_6003A);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_6003AValue)) {
                           if (highValue <= PIT_6003AValue || PIT_6003AValue <= lowValue) {
                               if (!audioPlayingPIT_6003A) {
                                   audioRef.current?.play();
                                   setAudioPlayingPIT_6003A(true);
                                   setExceedThresholdPIT_6003A(true);
                               }
                           } else {
                              setAudioPlayingPIT_6003A(false);
                              setExceedThresholdPIT_6003A(false);
                           }
                       } 
                   } 
               }, [PIT_6003A_High, PIT_6003A, audioPlayingPIT_6003A , PIT_6003A_Low,maintainPIT_6003A]);
           
               useEffect(() => {
                   if (audioPlayingPIT_6003A) {
                       const audioEnded = () => {
                          setAudioPlayingPIT_6003A(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPIT_6003A]);
           
               const handleInputChangePIT_6003A = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePIT_6003A(newValue);
               };
           
               const handleInputChange2PIT_6003A = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PIT_6003A(newValue2);
               };
               const ChangeMaintainPIT_6003A = async () => {
                   try {
                       const newValue = !maintainPIT_6003A;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { PIT_6003A_Maintain: newValue }
                       );
                       setMaintainPIT_6003A(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TIT_6001A, setTIT_6001A] = useState<string | null>(null);
           const [audioPlayingTIT_6001A, setAudioPlayingTIT_6001A] = useState(false);
           const [inputValueTIT_6001A, setInputValueTIT_6001A] = useState<any>();
           const [inputValue2TIT_6001A, setInputValue2TIT_6001A] = useState<any>();
           const [TIT_6001A_High, setTIT_6001A_High] = useState<number | null>(null);
           const [TIT_6001A_Low, setTIT_6001A_Low] = useState<number | null>(null);
           const [exceedThresholdTIT_6001A, setExceedThresholdTIT_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTIT_6001A, setMaintainTIT_6001A] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TIT_6001A_High === 'string' && typeof TIT_6001A_Low === 'string' && TIT_6001A !== null && maintainTIT_6001A === false
                   ) {
                       const highValue = parseFloat(TIT_6001A_High);
                       const lowValue = parseFloat(TIT_6001A_Low);
                       const TIT_6001AValue = parseFloat(TIT_6001A);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TIT_6001AValue)) {
                           if (highValue <= TIT_6001AValue || TIT_6001AValue <= lowValue) {
                               if (!audioPlayingTIT_6001A) {
                                   audioRef.current?.play();
                                   setAudioPlayingTIT_6001A(true);
                                   setExceedThresholdTIT_6001A(true);
                               }
                           } else {
                              setAudioPlayingTIT_6001A(false);
                              setExceedThresholdTIT_6001A(false);
                           }
                       } 
                   } 
               }, [TIT_6001A_High, TIT_6001A, audioPlayingTIT_6001A, TIT_6001A_Low,maintainTIT_6001A]);
           
               useEffect(() => {
                   if (audioPlayingTIT_6001A) {
                       const audioEnded = () => {
                          setAudioPlayingTIT_6001A(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTIT_6001A]);
           
               const handleInputChangeTIT_6001A = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTIT_6001A(newValue);
               };
           
               const handleInputChange2TIT_6001A = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TIT_6001A(newValue2);
               };
               const ChangeMaintainTIT_6001A = async () => {
                   try {
                       const newValue = !maintainTIT_6001A;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { TIT_6001A_Maintain: newValue }
                       );
                       setMaintainTIT_6001A(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [SDV_6001A, setSDV_6001A] = useState<string | null>(null);
           const [audioPlayingSDV_6001A, setAudioPlayingSDV_6001A] = useState(false);
           const [inputValueSDV_6001A, setInputValueSDV_6001A] = useState<any>();
           const [inputValue2SDV_6001A, setInputValue2SDV_6001A] = useState<any>();
           const [SDV_6001A_High, setSDV_6001A_High] = useState<number | null>(null);
           const [SDV_6001A_Low, setSDV_6001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_6001A, setExceedThresholdSDV_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainSDV_6001A, setMaintainSDV_6001A] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof SDV_6001A_High === 'string' && typeof SDV_6001A_Low === 'string' && SDV_6001A !== null && maintainSDV_6001A === false
                   ) {
                       const highValue = parseFloat(SDV_6001A_High);
                       const lowValue = parseFloat(SDV_6001A_Low);
                       const SDV_6001AValue = parseFloat(SDV_6001A);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_6001AValue)) {
                           if (highValue <= SDV_6001AValue || SDV_6001AValue <= lowValue) {
                               if (!audioPlayingSDV_6001A) {
                                   audioRef.current?.play();
                                   setAudioPlayingSDV_6001A(true);
                                   setExceedThresholdSDV_6001A(true);
                               }
                           } else {
                              setAudioPlayingSDV_6001A(false);
                              setExceedThresholdSDV_6001A(false);
                           }
                       } 
                   } 
               }, [SDV_6001A_High, SDV_6001A, audioPlayingSDV_6001A, SDV_6001A_Low,maintainSDV_6001A]);
           
               useEffect(() => {
                   if (audioPlayingSDV_6001A) {
                       const audioEnded = () => {
                          setAudioPlayingSDV_6001A(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingSDV_6001A]);
           
               const handleInputChangeSDV_6001A = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueSDV_6001A(newValue);
               };
           
               const handleInputChange2SDV_6001A = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2SDV_6001A(newValue2);
               };
               const ChangeMaintainSDV_6001A = async () => {
                   try {
                       const newValue = !maintainSDV_6001A;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { SDV_6001A_Maintain: newValue }
                       );
                       setMaintainSDV_6001A(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [GD_6001, setGD_6001] = useState<string | null>(null);
           const [audioPlayingGD_6001, setAudioPlayingGD_6001] = useState(false);
           const [inputValueGD_6001, setInputValueGD_6001] = useState<any>();
           const [inputValue2GD_6001, setInputValue2GD_6001] = useState<any>();
           const [GD_6001_High, setGD_6001_High] = useState<number | null>(null);
           const [GD_6001_Low, setGD_6001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_6001, setExceedThresholdGD_6001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainGD_6001, setMaintainGD_6001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof GD_6001_High === 'string' && typeof GD_6001_Low === 'string' && GD_6001 !== null && maintainGD_6001 === false
                   ) {
                       const highValue = parseFloat(GD_6001_High);
                       const lowValue = parseFloat(GD_6001_Low);
                       const GD_6001Value = parseFloat(GD_6001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_6001Value)) {
                           if (highValue <= GD_6001Value || GD_6001Value <= lowValue) {
                               if (!audioPlayingGD_6001) {
                                   audioRef.current?.play();
                                   setAudioPlayingGD_6001(true);
                                   setExceedThresholdGD_6001(true);
                               }
                           } else {
                              setAudioPlayingGD_6001(false);
                              setExceedThresholdGD_6001(false);
                           }
                       } 
                   } 
               }, [GD_6001_High, GD_6001, audioPlayingGD_6001, GD_6001_Low,maintainGD_6001]);
           
               useEffect(() => {
                   if (audioPlayingGD_6001) {
                       const audioEnded = () => {
                          setAudioPlayingGD_6001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingGD_6001]);
           
               const handleInputChangeGD_6001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueGD_6001(newValue);
               };
           
               const handleInputChange2GD_6001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2GD_6001(newValue2);
               };
               const ChangeMaintainGD_6001 = async () => {
                   try {
                       const newValue = !maintainGD_6001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { GD_6001_Maintain: newValue }
                       );
                       setMaintainGD_6001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TIT_6002, setTIT_6002] = useState<string | null>(null);
           const [audioPlayingTIT_6002, setAudioPlayingTIT_6002] = useState(false);
           const [inputValueTIT_6002, setInputValueTIT_6002] = useState<any>();
           const [inputValue2TIT_6002, setInputValue2TIT_6002] = useState<any>();
           const [TIT_6002_High, setTIT_6002_High] = useState<number | null>(null);
           const [TIT_6002_Low, setTIT_6002_Low] = useState<number | null>(null);
           const [exceedThresholdTIT_6002, setExceedThresholdTIT_6002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTIT_6002, setMaintainTIT_6002] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TIT_6002_High === 'string' && typeof TIT_6002_Low === 'string' && TIT_6002 !== null && maintainTIT_6002 === false
                   ) {
                       const highValue = parseFloat(TIT_6002_High);
                       const lowValue = parseFloat(TIT_6002_Low);
                       const TIT_6002Value = parseFloat(TIT_6002);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TIT_6002Value)) {
                           if (highValue <= TIT_6002Value || TIT_6002Value <= lowValue) {
                               if (!audioPlayingTIT_6002) {
                                   audioRef.current?.play();
                                   setAudioPlayingTIT_6002(true);
                                   setExceedThresholdTIT_6002(true);
                               }
                           } else {
                              setAudioPlayingTIT_6002(false);
                              setExceedThresholdTIT_6002(false);
                           }
                       } 
                   } 
               }, [TIT_6002_High, TIT_6002, audioPlayingTIT_6002, TIT_6002_Low,maintainTIT_6002]);
           
               useEffect(() => {
                   if (audioPlayingTIT_6002) {
                       const audioEnded = () => {
                          setAudioPlayingTIT_6002(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTIT_6002]);
           
               const handleInputChangeTIT_6002 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTIT_6002(newValue);
               };
           
               const handleInputChange2TIT_6002 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TIT_6002(newValue2);
               };
               const ChangeMaintainTIT_6002 = async () => {
                   try {
                       const newValue = !maintainTIT_6002;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { TIT_6002_Maintain: newValue }
                       );
                       setMaintainTIT_6002(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [SDV_6001B, setSDV_6001B] = useState<string | null>(null);
           const [audioPlayingSDV_6001B, setAudioPlayingSDV_6001B] = useState(false);
           const [inputValueSDV_6001B, setInputValueSDV_6001B] = useState<any>();
           const [inputValue2SDV_6001B, setInputValue2SDV_6001B] = useState<any>();
           const [SDV_6001B_High, setSDV_6001B_High] = useState<number | null>(null);
           const [SDV_6001B_Low, setSDV_6001B_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_6001B, setExceedThresholdSDV_6001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainSDV_6001B, setMaintainSDV_6001B] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof SDV_6001B_High === 'string' && typeof SDV_6001B_Low === 'string' && SDV_6001B !== null && maintainSDV_6001B === false
                   ) {
                       const highValue = parseFloat(SDV_6001B_High);
                       const lowValue = parseFloat(SDV_6001B_Low);
                       const SDV_6001BValue = parseFloat(SDV_6001B);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_6001BValue)) {
                           if (highValue <= SDV_6001BValue || SDV_6001BValue <= lowValue) {
                               if (!audioPlayingSDV_6001B) {
                                   audioRef.current?.play();
                                   setAudioPlayingSDV_6001B(true);
                                   setExceedThresholdSDV_6001B(true);
                               }
                           } else {
                              setAudioPlayingSDV_6001B(false);
                              setExceedThresholdSDV_6001B(false);
                           }
                       } 
                   } 
               }, [SDV_6001B_High, SDV_6001B, audioPlayingSDV_6001B, SDV_6001B_Low,maintainSDV_6001B]);
           
               useEffect(() => {
                   if (audioPlayingSDV_6001B) {
                       const audioEnded = () => {
                          setAudioPlayingSDV_6001B(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingSDV_6001B]);
           
               const handleInputChangeSDV_6001B = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueSDV_6001B(newValue);
               };
           
               const handleInputChange2SDV_6001B = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2SDV_6001B(newValue2);
               };
               const ChangeMaintainSDV_6001B = async () => {
                   try {
                       const newValue = !maintainSDV_6001B;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                           { SDV_6001B_Maintain: newValue }
                       );
                       setMaintainSDV_6001B(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
     // =================================================================================================================== 
 
     const [SDV_6002, setSDV_6002] = useState<string | null>(null);
     const [audioPlayingSDV_6002, setAudioPlayingSDV_6002] = useState(false);
     const [inputValueSDV_6002, setInputValueSDV_6002] = useState<any>();
     const [inputValue2SDV_6002, setInputValue2SDV_6002] = useState<any>();
     const [SDV_6002_High, setSDV_6002_High] = useState<number | null>(null);
     const [SDV_6002_Low, setSDV_6002_Low] = useState<number | null>(null);
     const [exceedThresholdSDV_6002, setExceedThresholdSDV_6002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainSDV_6002, setMaintainSDV_6002] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof SDV_6002_High === 'string' && typeof SDV_6002_Low === 'string' && SDV_6002 !== null && maintainSDV_6002 === false
             ) {
                 const highValue = parseFloat(SDV_6002_High);
                 const lowValue = parseFloat(SDV_6002_Low);
                 const SDV_6002Value = parseFloat(SDV_6002);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_6002Value)) {
                     if (highValue <= SDV_6002Value || SDV_6002Value <= lowValue) {
                         if (!audioPlayingSDV_6002) {
                             audioRef.current?.play();
                             setAudioPlayingSDV_6002(true);
                             setExceedThresholdSDV_6002(true);
                         }
                     } else {
                        setAudioPlayingSDV_6002(false);
                        setExceedThresholdSDV_6002(false);
                     }
                 } 
             } 
         }, [SDV_6002_High, SDV_6002, audioPlayingSDV_6002, SDV_6002_Low,maintainSDV_6002]);
     
         useEffect(() => {
             if (audioPlayingSDV_6002) {
                 const audioEnded = () => {
                    setAudioPlayingSDV_6002(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingSDV_6002]);
     
         const handleInputChangeSDV_6002 = (event: any) => {
             const newValue = event.target.value;
             setInputValueSDV_6002(newValue);
         };
     
         const handleInputChange2SDV_6002 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2SDV_6002(newValue2);
         };
         const ChangeMaintainSDV_6002 = async () => {
             try {
                 const newValue = !maintainSDV_6002;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { SDV_6002_Maintain: newValue }
                 );
                 setMaintainSDV_6002(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
         // =================================================================================================================== 
 
         const [Water_PG, setWater_PG] = useState<string | null>(null);
         const [audioPlayingWater_PG, setAudioPlayingWater_PG] = useState(false);
         const [inputValueWater_PG, setInputValueWater_PG] = useState<any>();
         const [inputValue2Water_PG, setInputValue2Water_PG] = useState<any>();
         const [Water_PG_High, setWater_PG_High] = useState<number | null>(null);
         const [Water_PG_Low, setWater_PG_Low] = useState<number | null>(null);
         const [exceedThresholdWater_PG, setExceedThresholdWater_PG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainWater_PG, setMaintainWater_PG] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof Water_PG_High === 'string' && typeof Water_PG_Low === 'string' && Water_PG !== null && maintainWater_PG === false
                 ) {
                     const highValue = parseFloat(Water_PG_High);
                     const lowValue = parseFloat(Water_PG_Low);
                     const Water_PGValue = parseFloat(Water_PG);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Water_PGValue)) {
                         if (highValue <= Water_PGValue || Water_PGValue <= lowValue) {
                             if (!audioPlayingWater_PG) {
                                 audioRef.current?.play();
                                 setAudioPlayingWater_PG(true);
                                 setExceedThresholdWater_PG(true);
                             }
                         } else {
                            setAudioPlayingWater_PG(false);
                            setExceedThresholdWater_PG(false);
                         }
                     } 
                 } 
             }, [Water_PG_High, Water_PG, audioPlayingWater_PG, Water_PG_Low,maintainWater_PG]);
         
             useEffect(() => {
                 if (audioPlayingWater_PG) {
                     const audioEnded = () => {
                        setAudioPlayingWater_PG(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingWater_PG]);
         
             const handleInputChangeWater_PG = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueWater_PG(newValue);
             };
         
             const handleInputChange2Water_PG = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2Water_PG(newValue2);
             };
             const ChangeMaintainWater_PG = async () => {
                 try {
                     const newValue = !maintainWater_PG;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { Water_PG_Maintain: newValue }
                     );
                     setMaintainWater_PG(newValue);
                     
                 } catch (error) {}
             };
     
     
         // =================================================================================================================== 
 
             // =================================================================================================================== 
 
     const [Water_LSW, setWater_LSW] = useState<string | null>(null);
     const [audioPlayingWater_LSW, setAudioPlayingWater_LSW] = useState(false);
     const [inputValueWater_LSW, setInputValueWater_LSW] = useState<any>();
     const [inputValue2Water_LSW, setInputValue2Water_LSW] = useState<any>();
     const [Water_LSW_High, setWater_LSW_High] = useState<number | null>(null);
     const [Water_LSW_Low, setWater_LSW_Low] = useState<number | null>(null);
     const [exceedThresholdWater_LSW, setExceedThresholdWater_LSW] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainWater_LSW, setMaintainWater_LSW] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof Water_LSW_High === 'string' && typeof Water_LSW_Low === 'string' && Water_LSW !== null && maintainWater_LSW === false
             ) {
                 const highValue = parseFloat(Water_LSW_High);
                 const lowValue = parseFloat(Water_LSW_Low);
                 const Water_LSWValue = parseFloat(Water_LSW);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Water_LSWValue)) {
                     if (highValue <= Water_LSWValue || Water_LSWValue <= lowValue) {
                         if (!audioPlayingWater_LSW) {
                             audioRef.current?.play();
                             setAudioPlayingWater_LSW(true);
                             setExceedThresholdWater_LSW(true);
                         }
                     } else {
                        setAudioPlayingWater_LSW(false);
                        setExceedThresholdWater_LSW(false);
                     }
                 } 
             } 
         }, [Water_LSW_High, Water_LSW, audioPlayingWater_LSW, Water_LSW_Low,maintainWater_LSW]);
     
         useEffect(() => {
             if (audioPlayingWater_LSW) {
                 const audioEnded = () => {
                    setAudioPlayingWater_LSW(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingWater_LSW]);
     
         const handleInputChangeWater_LSW = (event: any) => {
             const newValue = event.target.value;
             setInputValueWater_LSW(newValue);
         };
     
         const handleInputChange2Water_LSW = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2Water_LSW(newValue2);
         };
         const ChangeMaintainWater_LSW = async () => {
             try {
                 const newValue = !maintainWater_LSW;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { Water_LSW_Maintain: newValue }
                 );
                 setMaintainWater_LSW(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
 
     const [PUMP_1, setPUMP_1] = useState<string | null>(null);
     const [audioPlayingPUMP_1, setAudioPlayingPUMP_1] = useState(false);
     const [inputValuePUMP_1, setInputValuePUMP_1] = useState<any>();
     const [inputValue2PUMP_1, setInputValue2PUMP_1] = useState<any>();
     const [PUMP_1_High, setPUMP_1_High] = useState<number | null>(null);
     const [PUMP_1_Low, setPUMP_1_Low] = useState<number | null>(null);
     const [exceedThresholdPUMP_1, setExceedThresholdPUMP_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainPUMP_1, setMaintainPUMP_1] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof PUMP_1_High === 'string' && typeof PUMP_1_Low === 'string' && PUMP_1 !== null && maintainPUMP_1 === false
             ) {
                 const highValue = parseFloat(PUMP_1_High);
                 const lowValue = parseFloat(PUMP_1_Low);
                 const PUMP_1Value = parseFloat(PUMP_1);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PUMP_1Value)) {
                     if (highValue <= PUMP_1Value || PUMP_1Value <= lowValue) {
                         if (!audioPlayingPUMP_1) {
                             audioRef.current?.play();
                             setAudioPlayingPUMP_1(true);
                             setExceedThresholdPUMP_1(true);
                         }
                     } else {
                        setAudioPlayingPUMP_1(false);
                        setExceedThresholdPUMP_1(false);
                     }
                 } 
             } 
         }, [PUMP_1_High, PUMP_1, audioPlayingPUMP_1, PUMP_1_Low,maintainPUMP_1]);
     
         useEffect(() => {
             if (audioPlayingPUMP_1) {
                 const audioEnded = () => {
                    setAudioPlayingPUMP_1(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingPUMP_1]);
     
         const handleInputChangePUMP_1 = (event: any) => {
             const newValue = event.target.value;
             setInputValuePUMP_1(newValue);
         };
     
         const handleInputChange2PUMP_1 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2PUMP_1(newValue2);
         };
         const ChangeMaintainPUMP_1 = async () => {
             try {
                 const newValue = !maintainPUMP_1;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { PUMP_1_Maintain: newValue }
                 );
                 setMaintainPUMP_1(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
         // =================================================================================================================== 
 
 const [PUMP_2, setPUMP_2] = useState<string | null>(null);
 const [audioPlayingPUMP_2, setAudioPlayingPUMP_2] = useState(false);
 const [inputValuePUMP_2, setInputValuePUMP_2] = useState<any>();
 const [inputValue2PUMP_2, setInputValue2PUMP_2] = useState<any>();
 const [PUMP_2_High, setPUMP_2_High] = useState<number | null>(null);
 const [PUMP_2_Low, setPUMP_2_Low] = useState<number | null>(null);
 const [exceedThresholdPUMP_2, setExceedThresholdPUMP_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainPUMP_2, setMaintainPUMP_2] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof PUMP_2_High === 'string' && typeof PUMP_2_Low === 'string' && PUMP_2 !== null && maintainPUMP_2 === false
         ) {
             const highValue = parseFloat(PUMP_2_High);
             const lowValue = parseFloat(PUMP_2_Low);
             const PUMP_2Value = parseFloat(PUMP_2);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PUMP_2Value)) {
                 if (highValue <= PUMP_2Value || PUMP_2Value <= lowValue) {
                     if (!audioPlayingPUMP_2) {
                         audioRef.current?.play();
                         setAudioPlayingPUMP_2(true);
                         setExceedThresholdPUMP_2(true);
                     }
                 } else {
                    setAudioPlayingPUMP_2(false);
                    setExceedThresholdPUMP_2(false);
                 }
             } 
         } 
     }, [PUMP_2_High, PUMP_2, audioPlayingPUMP_2, PUMP_2_Low,maintainPUMP_2]);
 
     useEffect(() => {
         if (audioPlayingPUMP_2) {
             const audioEnded = () => {
                setAudioPlayingPUMP_2(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingPUMP_2]);
 
     const handleInputChangePUMP_2 = (event: any) => {
         const newValue = event.target.value;
         setInputValuePUMP_2(newValue);
     };
 
     const handleInputChange2PUMP_2 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2PUMP_2(newValue2);
     };
     const ChangeMaintainPUMP_2 = async () => {
         try {
             const newValue = !maintainPUMP_2;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                 { PUMP_2_Maintain: newValue }
             );
             setMaintainPUMP_2(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
 
 const [HEATER_1, setHEATER_1] = useState<string | null>(null);
 const [audioPlayingHEATER_1, setAudioPlayingHEATER_1] = useState(false);
 const [inputValueHEATER_1, setInputValueHEATER_1] = useState<any>();
 const [inputValue2HEATER_1, setInputValue2HEATER_1] = useState<any>();
 const [HEATER_1_High, setHEATER_1_High] = useState<number | null>(null);
 const [HEATER_1_Low, setHEATER_1_Low] = useState<number | null>(null);
 const [exceedThresholdHEATER_1, setExceedThresholdHEATER_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainHEATER_1, setMaintainHEATER_1] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof HEATER_1_High === 'string' && typeof HEATER_1_Low === 'string' && HEATER_1 !== null && maintainHEATER_1 === false
         ) {
             const highValue = parseFloat(HEATER_1_High);
             const lowValue = parseFloat(HEATER_1_Low);
             const HEATER_1Value = parseFloat(HEATER_1);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HEATER_1Value)) {
                 if (highValue <= HEATER_1Value || HEATER_1Value <= lowValue) {
                     if (!audioPlayingHEATER_1) {
                         audioRef.current?.play();
                         setAudioPlayingHEATER_1(true);
                         setExceedThresholdHEATER_1(true);
                     }
                 } else {
                    setAudioPlayingHEATER_1(false);
                    setExceedThresholdHEATER_1(false);
                 }
             } 
         } 
     }, [HEATER_1_High, HEATER_1, audioPlayingHEATER_1, HEATER_1_Low,maintainHEATER_1]);
 
     useEffect(() => {
         if (audioPlayingHEATER_1) {
             const audioEnded = () => {
                setAudioPlayingHEATER_1(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingHEATER_1]);
 
     const handleInputChangeHEATER_1 = (event: any) => {
         const newValue = event.target.value;
         setInputValueHEATER_1(newValue);
     };
 
     const handleInputChange2HEATER_1 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2HEATER_1(newValue2);
     };
     const ChangeMaintainHEATER_1 = async () => {
         try {
             const newValue = !maintainHEATER_1;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                 { HEATER_1_Maintain: newValue }
             );
             setMaintainHEATER_1(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
     // =================================================================================================================== 
 
 const [HEATER_2, setHEATER_2] = useState<string | null>(null);
 const [audioPlayingHEATER_2, setAudioPlayingHEATER_2] = useState(false);
 const [inputValueHEATER_2, setInputValueHEATER_2] = useState<any>();
 const [inputValue2HEATER_2, setInputValue2HEATER_2] = useState<any>();
 const [HEATER_2_High, setHEATER_2_High] = useState<number | null>(null);
 const [HEATER_2_Low, setHEATER_2_Low] = useState<number | null>(null);
 const [exceedThresholdHEATER_2, setExceedThresholdHEATER_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainHEATER_2, setMaintainHEATER_2] = useState<boolean>(false);
 
 
 useEffect(() => {
     if (typeof HEATER_2_High === 'string' && typeof HEATER_2_Low === 'string' && HEATER_2 !== null && maintainHEATER_2 === false
     ) {
         const highValue = parseFloat(HEATER_2_High);
         const lowValue = parseFloat(HEATER_2_Low);
         const HEATER_2Value = parseFloat(HEATER_2);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HEATER_2Value)) {
             if (highValue <= HEATER_2Value || HEATER_2Value <= lowValue) {
                 if (!audioPlayingHEATER_2) {
                     audioRef.current?.play();
                     setAudioPlayingHEATER_2(true);
                     setExceedThresholdHEATER_2(true);
                 }
             } else {
                setAudioPlayingHEATER_2(false);
                setExceedThresholdHEATER_2(false);
             }
         } 
     } 
 }, [HEATER_2_High, HEATER_2, audioPlayingHEATER_2, HEATER_2_Low,maintainHEATER_2]);
 
 useEffect(() => {
     if (audioPlayingHEATER_2) {
         const audioEnded = () => {
            setAudioPlayingHEATER_2(false);
         };
         audioRef.current?.addEventListener('ended', audioEnded);
         return () => {
             audioRef.current?.removeEventListener('ended', audioEnded);
         };
     }
 }, [audioPlayingHEATER_2]);
 
 const handleInputChangeHEATER_2 = (event: any) => {
     const newValue = event.target.value;
     setInputValueHEATER_2(newValue);
 };
 
 const handleInputChange2HEATER_2 = (event: any) => {
     const newValue2 = event.target.value;
     setInputValue2HEATER_2(newValue2);
 };
 const ChangeMaintainHEATER_2 = async () => {
     try {
         const newValue = !maintainHEATER_2;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setMaintainHEATER_2(newValue);
         
     } catch (error) {}
 };
 
 
 // =================================================================================================================== 
 
 
         // =================================================================================================================== 
 
         const [HEATER_3, setHEATER_3] = useState<string | null>(null);
         const [audioPlayingHEATER_3, setAudioPlayingHEATER_3] = useState(false);
         const [inputValueHEATER_3, setInputValueHEATER_3] = useState<any>();
         const [inputValue2HEATER_3, setInputValue2HEATER_3] = useState<any>();
         const [HEATER_3_High, setHEATER_3_High] = useState<number | null>(null);
         const [HEATER_3_Low, setHEATER_3_Low] = useState<number | null>(null);
         const [exceedThresholdHEATER_3, setExceedThresholdHEATER_3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainHEATER_3, setMaintainHEATER_3] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof HEATER_3_High === 'string' && typeof HEATER_3_Low === 'string' && HEATER_3 !== null && maintainHEATER_3 === false
                 ) {
                     const highValue = parseFloat(HEATER_3_High);
                     const lowValue = parseFloat(HEATER_3_Low);
                     const HEATER_3Value = parseFloat(HEATER_3);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HEATER_3Value)) {
                         if (highValue <= HEATER_3Value || HEATER_3Value <= lowValue) {
                             if (!audioPlayingHEATER_3) {
                                 audioRef.current?.play();
                                 setAudioPlayingHEATER_3(true);
                                 setExceedThresholdHEATER_3(true);
                             }
                         } else {
                            setAudioPlayingHEATER_3(false);
                            setExceedThresholdHEATER_3(false);
                         }
                     } 
                 } 
             }, [HEATER_3_High, HEATER_3, audioPlayingHEATER_3, HEATER_3_Low,maintainHEATER_3]);
         
             useEffect(() => {
                 if (audioPlayingHEATER_3) {
                     const audioEnded = () => {
                        setAudioPlayingHEATER_3(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingHEATER_3]);
         
             const handleInputChangeHEATER_3 = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueHEATER_3(newValue);
             };
         
             const handleInputChange2HEATER_3 = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2HEATER_3(newValue2);
             };
             const ChangeMaintainHEATER_3 = async () => {
                 try {
                     const newValue = !maintainHEATER_3;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { HEATER_3_Maintain: newValue }
                     );
                     setMaintainHEATER_3(newValue);
                     
                 } catch (error) {}
             };
         
         
         // =================================================================================================================== 
         
         
         const [BOILER, setBOILER] = useState<string | null>(null);
         const [audioPlayingBOILER, setAudioPlayingBOILER] = useState(false);
         const [inputValueBOILER, setInputValueBOILER] = useState<any>();
         const [inputValue2BOILER, setInputValue2BOILER] = useState<any>();
         const [BOILER_High, setBOILER_High] = useState<number | null>(null);
         const [BOILER_Low, setBOILER_Low] = useState<number | null>(null);
         const [exceedThresholdBOILER, setExceedThresholdBOILER] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainBOILER, setMaintainBOILER] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof BOILER_High === 'string' && typeof BOILER_Low === 'string' && BOILER !== null && maintainBOILER === false
                 ) {
                     const highValue = parseFloat(BOILER_High);
                     const lowValue = parseFloat(BOILER_Low);
                     const BOILERValue = parseFloat(BOILER);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(BOILERValue)) {
                         if (highValue <= BOILERValue || BOILERValue <= lowValue) {
                             if (!audioPlayingBOILER) {
                                 audioRef.current?.play();
                                 setAudioPlayingBOILER(true);
                                 setExceedThresholdBOILER(true);
                             }
                         } else {
                            setAudioPlayingBOILER(false);
                            setExceedThresholdBOILER(false);
                         }
                     } 
                 } 
             }, [BOILER_High, BOILER, audioPlayingBOILER, BOILER_Low,maintainBOILER]);
         
             useEffect(() => {
                 if (audioPlayingBOILER) {
                     const audioEnded = () => {
                        setAudioPlayingBOILER(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingBOILER]);
         
             const handleInputChangeBOILER = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueBOILER(newValue);
             };
         
             const handleInputChange2BOILER = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2BOILER(newValue2);
             };
             const ChangeMaintainBOILER = async () => {
                 try {
                     const newValue = !maintainBOILER;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { BOILER_Maintain: newValue }
                     );
                     setMaintainBOILER(newValue);
                     
                 } catch (error) {}
             };
         
         
         // =================================================================================================================== 
         
             // =================================================================================================================== 
         
         const [GD_STATUS, setGD_STATUS] = useState<string | null>(null);
         const [audioPlayingGD_STATUS, setAudioPlayingGD_STATUS] = useState(false);
         const [inputValueGD_STATUS, setInputValueGD_STATUS] = useState<any>();
         const [inputValue2GD_STATUS, setInputValue2GD_STATUS] = useState<any>();
         const [GD_STATUS_High, setGD_STATUS_High] = useState<number | null>(null);
         const [GD_STATUS_Low, setGD_STATUS_Low] = useState<number | null>(null);
         const [exceedThresholdGD_STATUS, setExceedThresholdGD_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainGD_STATUS, setMaintainGD_STATUS] = useState<boolean>(false);
         
         
         useEffect(() => {
             if (typeof GD_STATUS_High === 'string' && typeof GD_STATUS_Low === 'string' && GD_STATUS !== null && maintainGD_STATUS === false
             ) {
                 const highValue = parseFloat(GD_STATUS_High);
                 const lowValue = parseFloat(GD_STATUS_Low);
                 const GD_STATUSValue = parseFloat(GD_STATUS);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_STATUSValue)) {
                     if (highValue <= GD_STATUSValue || GD_STATUSValue <= lowValue) {
                         if (!audioPlayingGD_STATUS) {
                             audioRef.current?.play();
                             setAudioPlayingGD_STATUS(true);
                             setExceedThresholdGD_STATUS(true);
                         }
                     } else {
                        setAudioPlayingGD_STATUS(false);
                        setExceedThresholdGD_STATUS(false);
                     }
                 } 
             } 
         }, [GD_STATUS_High, GD_STATUS, audioPlayingGD_STATUS, GD_STATUS_Low,maintainGD_STATUS]);
         
         useEffect(() => {
             if (audioPlayingGD_STATUS) {
                 const audioEnded = () => {
                    setAudioPlayingGD_STATUS(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingGD_STATUS]);
         
         const handleInputChangeGD_STATUS = (event: any) => {
             const newValue = event.target.value;
             setInputValueGD_STATUS(newValue);
         };
         
         const handleInputChange2GD_STATUS = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2GD_STATUS(newValue2);
         };
         const ChangeMaintainGD_STATUS = async () => {
             try {
                 const newValue = !maintainGD_STATUS;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { GD_STATUS_Maintain: newValue }
                 );
                 setMaintainGD_STATUS(newValue);
                 
             } catch (error) {}
         };

          // =================================================================================================================== 

    const [ESD, setESD] = useState<string | null>(null);
    const [audioPlayingESD, setAudioPlayingESD] = useState(false);
    const [inputValueESD, setInputValueESD] = useState<any>();
    const [inputValue2ESD, setInputValue2ESD] = useState<any>();
    const [ESD_High, setESD_High] = useState<number | null>(null);
    const [ESD_Low, setESD_Low] = useState<number | null>(null);
    const [exceedThresholdESD, setExceedThresholdESD] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainESD, setMaintainESD] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof ESD_High === 'string' && typeof ESD_Low === 'string' && ESD !== null && maintainESD === false
            ) {
                const highValue = parseFloat(ESD_High);
                const lowValue = parseFloat(ESD_Low);
                const ESDValue = parseFloat(ESD);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESDValue)) {
                    if (highValue <= ESDValue || ESDValue <= lowValue) {
                        if (!audioPlayingESD) {
                            audioRef.current?.play();
                            setAudioPlayingESD(true);
                            setExceedThresholdESD(true);
                        }
                    } else {
                        setAudioPlayingESD(false);
                        setExceedThresholdESD(false);
                    }
                } 
            } 
        }, [ESD_High, ESD, audioPlayingESD, ESD_Low,maintainESD]);
    
        useEffect(() => {
            if (audioPlayingESD) {
                const audioEnded = () => {
                    setAudioPlayingESD(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingESD]);
    
        const handleInputChangeESD = (event: any) => {
            const newValue = event.target.value;
            setInputValueESD(newValue);
        };
    
        const handleInputChange2ESD = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2ESD(newValue2);
        };
        const ChangeMaintainESD = async () => {
            try {
                const newValue = !maintainESD;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    { ESD_Maintain: newValue }
                );
                setMaintainESD(newValue);
                
            } catch (error) {}
        };
    
    
         // =================================================================================================================== 
    
         const [HR_BC, setHR_BC] = useState<string | null>(null);
         const [audioPlayingHR_BC, setAudioPlayingHR_BC] = useState(false);
         const [inputValueHR_BC, setInputValueHR_BC] = useState<any>();
         const [inputValue2HR_BC, setInputValue2HR_BC] = useState<any>();
         const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
         const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
         const [exceedThresholdHR_BC, setExceedThresholdHR_BC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainHR_BC, setMaintainHR_BC] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof HR_BC_High === 'string' && typeof HR_BC_Low === 'string' && HR_BC !== null && maintainHR_BC === false
                 ) {
                     const highValue = parseFloat(HR_BC_High);
                     const lowValue = parseFloat(HR_BC_Low);
                     const HR_BCValue = parseFloat(HR_BC);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HR_BCValue)) {
                         if (highValue <= HR_BCValue || HR_BCValue <= lowValue) {
                             if (!audioPlayingHR_BC) {
                                 audioRef.current?.play();
                                 setAudioPlayingHR_BC(true);
                                 setExceedThresholdHR_BC(true);
                             }
                         } else {
                            setAudioPlayingHR_BC(false);
                             setExceedThresholdHR_BC(false);
                         }
                     } 
                 } 
             }, [HR_BC_High, HR_BC, audioPlayingHR_BC, HR_BC_Low,maintainHR_BC]);
         
             useEffect(() => {
                 if (audioPlayingHR_BC) {
                     const audioEnded = () => {
                        setAudioPlayingHR_BC(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingHR_BC]);
         
             const handleInputChangeHR_BC = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueHR_BC(newValue);
             };
         
             const handleInputChange2HR_BC = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2HR_BC(newValue2);
             };
             const ChangeMaintainHR_BC = async () => {
                 try {
                     const newValue = !maintainHR_BC;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { HR_BC_Maintain: newValue }
                     );
                     setMaintainHR_BC(newValue);
                     
                 } catch (error) {}
             };
    
    
         // =================================================================================================================== 
    
    
         const [SD, setSD] = useState<string | null>(null);
         const [audioPlayingSD, setAudioPlayingSD] = useState(false);
         const [inputValueSD, setInputValueSD] = useState<any>();
         const [inputValue2SD, setInputValue2SD] = useState<any>();
         const [SD_High, setSD_High] = useState<number | null>(null);
         const [SD_Low, setSD_Low] = useState<number | null>(null);
         const [exceedThresholdSD, setExceedThresholdSD] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainSD, setMaintainSD] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof SD_High === 'string' && typeof SD_Low === 'string' && SD !== null && maintainSD === false
                 ) {
                     const highValue = parseFloat(SD_High);
                     const lowValue = parseFloat(SD_Low);
                     const SDValue = parseFloat(SD);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDValue)) {
                         if (highValue <= SDValue || SDValue <= lowValue) {
                             if (!audioPlayingSD) {
                                 audioRef.current?.play();
                                 setAudioPlayingSD(true);
                                 setExceedThresholdSD(true);
                             }
                         } else {
                            setAudioPlayingSD(false);
                            setExceedThresholdSD(false);
                         }
                     } 
                 } 
             }, [SD_High, SD, audioPlayingSD, SD_Low,maintainSD]);
         
             useEffect(() => {
                 if (audioPlayingSD) {
                     const audioEnded = () => {
                        setAudioPlayingSD(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingSD]);
         
             const handleInputChangeSD = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueSD(newValue);
             };
         
             const handleInputChange2SD = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2SD(newValue2);
             };
             const ChangeMaintainSD = async () => {
                 try {
                     const newValue = !maintainSD;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { SD_Maintain: newValue }
                     );
                     setMaintainSD(newValue);
                     
                 } catch (error) {}
             };
    
    
         // =================================================================================================================== 
    
    
    
              const [PT_6004, setPT_6004] = useState<string | null>(null);
              const [audioPlayingPT_6004, setAudioPlayingPT_6004] = useState(false);
              const [inputValuePT_6004, setInputValuePT_6004] = useState<any>();
              const [inputValue2PT_6004, setInputValue2PT_6004] = useState<any>();
              const [PT_6004_High, setPT_6004_High] = useState<number | null>(null);
              const [PT_6004_Low, setPT_6004_Low] = useState<number | null>(null);
              const [exceedThresholdPT_6004, setExceedThresholdPT_6004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainPT_6004, setMaintainPT_6004] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof PT_6004_High === 'string' && typeof PT_6004_Low === 'string' && PT_6004 !== null && maintainPT_6004 === false
                      ) {
                          const highValue = parseFloat(PT_6004_High);
                          const lowValue = parseFloat(PT_6004_Low);
                          const PT_6004Value = parseFloat(PT_6004);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_6004Value)) {
                              if (highValue <= PT_6004Value || PT_6004Value <= lowValue) {
                                  if (!audioPlayingPT_6004) {
                                      audioRef.current?.play();
                                      setAudioPlayingPT_6004(true);
                                      setExceedThresholdPT_6004(true);
                                  }
                              } else {
                                 setAudioPlayingPT_6004(false);
                                 setExceedThresholdPT_6004(false);
                              }
                          } 
                      } 
                  }, [PT_6004_High, PT_6004, audioPlayingPT_6004, PT_6004_Low,maintainPT_6004]);
              
                  useEffect(() => {
                      if (audioPlayingPT_6004) {
                          const audioEnded = () => {
                             setAudioPlayingPT_6004(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingPT_6004]);
              
                  const handleInputChangePT_6004 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValuePT_6004(newValue);
                  };
              
                  const handleInputChange2PT_6004 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2PT_6004(newValue2);
                  };
                  const ChangeMaintainPT_6004 = async () => {
                      try {
                          const newValue = !maintainPT_6004;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                              { PT_6004_Maintain: newValue }
                          );
                          setMaintainPT_6004(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
    
              const [PUMP_3, setPUMP_3] = useState<string | null>(null);
              const [audioPlayingPUMP_3, setAudioPlayingPUMP_3] = useState(false);
              const [inputValuePUMP_3, setInputValuePUMP_3] = useState<any>();
              const [inputValue2PUMP_3, setInputValue2PUMP_3] = useState<any>();
              const [PUMP_3_High, setPUMP_3_High] = useState<number | null>(null);
              const [PUMP_3_Low, setPUMP_3_Low] = useState<number | null>(null);
              const [exceedThresholdPUMP_3, setExceedThresholdPUMP_3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainPUMP_3, setMaintainPUMP_3] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof PUMP_3_High === 'string' && typeof PUMP_3_Low === 'string' && PUMP_3 !== null && maintainPUMP_3 === false
                      ) {
                          const highValue = parseFloat(PUMP_3_High);
                          const lowValue = parseFloat(PUMP_3_Low);
                          const PUMP_3Value = parseFloat(PUMP_3);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PUMP_3Value)) {
                              if (highValue <= PUMP_3Value || PUMP_3Value <= lowValue) {
                                  if (!audioPlayingPUMP_3) {
                                      audioRef.current?.play();
                                      setAudioPlayingPUMP_3(true);
                                      setExceedThresholdPUMP_3(true);
                                  }
                              } else {
                                 setAudioPlayingPUMP_3(false);
                                 setExceedThresholdPUMP_3(false);
                              }
                          } 
                      } 
                  }, [PUMP_3_High, PUMP_3, audioPlayingPUMP_3 , PUMP_3_Low,maintainPUMP_3]);
              
                  useEffect(() => {
                      if (audioPlayingPUMP_3) {
                          const audioEnded = () => {
                             setAudioPlayingPUMP_3(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingPUMP_3]);
              
                  const handleInputChangePUMP_3 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValuePUMP_3(newValue);
                  };
              
                  const handleInputChange2PUMP_3 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2PUMP_3(newValue2);
                  };
                  const ChangeMaintainPUMP_3 = async () => {
                      try {
                          const newValue = !maintainPUMP_3;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                              { PUMP_3_Maintain: newValue }
                          );
                          setMaintainPUMP_3(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
              const [SDV_6003, setSDV_6003] = useState<string | null>(null);
              const [audioPlayingSDV_6003, setAudioPlayingSDV_6003] = useState(false);
              const [inputValueSDV_6003, setInputValueSDV_6003] = useState<any>();
              const [inputValue2SDV_6003, setInputValue2SDV_6003] = useState<any>();
              const [SDV_6003_High, setSDV_6003_High] = useState<number | null>(null);
              const [SDV_6003_Low, setSDV_6003_Low] = useState<number | null>(null);
              const [exceedThresholdSDV_6003, setExceedThresholdSDV_6003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainSDV_6003, setMaintainSDV_6003] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof SDV_6003_High === 'string' && typeof SDV_6003_Low === 'string' && SDV_6003 !== null && maintainSDV_6003 === false
                      ) {
                          const highValue = parseFloat(SDV_6003_High);
                          const lowValue = parseFloat(SDV_6003_Low);
                          const SDV_6003Value = parseFloat(SDV_6003);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_6003Value)) {
                              if (highValue <= SDV_6003Value || SDV_6003Value <= lowValue) {
                                  if (!audioPlayingSDV_6003) {
                                      audioRef.current?.play();
                                      setAudioPlayingSDV_6003(true);
                                      setExceedThresholdSDV_6003(true);
                                  }
                              } else {
                                 setAudioPlayingSDV_6003(false);
                                 setExceedThresholdSDV_6003(false);
                              }
                          } 
                      } 
                  }, [SDV_6003_High, SDV_6003, audioPlayingSDV_6003, SDV_6003_Low,maintainSDV_6003]);
              
                  useEffect(() => {
                      if (audioPlayingSDV_6003) {
                          const audioEnded = () => {
                             setAudioPlayingSDV_6003(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingSDV_6003]);
              
                  const handleInputChangeSDV_6003 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueSDV_6003(newValue);
                  };
              
                  const handleInputChange2SDV_6003 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2SDV_6003(newValue2);
                  };
                  const ChangeMaintainSDV_6003 = async () => {
                      try {
                          const newValue = !maintainSDV_6003;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                              { SDV_6003_Maintain: newValue }
                          );
                          setMaintainSDV_6003(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
         
         
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,



                {
                    
                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,
                    ESD_High: inputValueESD,ESD_Low:inputValue2ESD,


                    PT_6004_High: inputValuePT_6004,PT_6004_Low:inputValue2PT_6004,
                    PUMP_3_High: inputValuePUMP_3,PUMP_3_Low:inputValue2PUMP_3,
                    SDV_6003_High: inputValueSDV_6003,SDV_6003_Low:inputValue2SDV_6003,

                    EVC_01_Temperature_High: inputValueEVC_01_Temperature,EVC_01_Temperature_Low:inputValue2EVC_01_Temperature,
                    EVC_01_Pressure_High: inputValueEVC_01_Pressure,EVC_01_Pressure_Low:inputValue2EVC_01_Pressure,
                    EVC_01_Remain_Battery_Service_Life_High: inputValueEVC_01_Remain_Battery_Service_Life,EVC_01_Remain_Battery_Service_Life_Low:inputValue2EVC_01_Remain_Battery_Service_Life,


                    EVC_01_Volume_at_Base_Condition_High: inputValueEVC_01_Volume_at_Base_Condition,EVC_01_Volume_at_Base_Condition_Low:inputValue2EVC_01_Volume_at_Base_Condition,
                    EVC_01_Volume_at_Measurement_Condition_High: inputValueEVC_01_Volume_at_Measurement_Condition,EVC_01_Volume_at_Measurement_Condition_Low:inputValue2EVC_01_Volume_at_Measurement_Condition,
                    EVC_01_Flow_at_Base_Condition_High: inputValueEVC_01_Flow_at_Base_Condition,EVC_01_Flow_at_Base_Condition_Low:inputValue2EVC_01_Flow_at_Base_Condition,

                    EVC_01_Flow_at_Measurement_Condition_High: inputValueEVC_01_Flow_at_Measurement_Condition,EVC_01_Flow_at_Measurement_Condition_Low:inputValue2EVC_01_Flow_at_Measurement_Condition,
                    EVC_01_Vb_of_Current_Day_High: inputValueEVC_01_Vb_of_Current_Day,EVC_01_Vb_of_Current_Day_Low:inputValue2EVC_01_Vb_of_Current_Day,
                    EVC_01_Vm_of_Current_Day_High: inputValueEVC_01_Vm_of_Current_Day,EVC_01_Vm_of_Current_Day_Low:inputValue2EVC_01_Vm_of_Current_Day,


                    EVC_01_Vm_of_Last_Day_High: inputValueEVC_01_Vm_of_Last_Day,EVC_01_Vm_of_Last_Day_Low:inputValue2EVC_01_Vm_of_Last_Day,
                    EVC_01_Vb_of_Last_Day_High: inputValueEVC_01_Vb_of_Last_Day,EVC_01_Vb_of_Last_Day_Low:inputValue2EVC_01_Vb_of_Last_Day,


                    EVC_02_Remain_Battery_Service_Life_High: inputValueEVC_02_Remain_Battery_Service_Life,EVC_02_Remain_Battery_Service_Life_Low:inputValue2EVC_02_Remain_Battery_Service_Life,
                    EVC_02_Temperature_High: inputValueEVC_02_Temperature,EVC_02_Temperature_Low:inputValue2EVC_02_Temperature,

                    EVC_02_Pressure_High: inputValueEVC_02_Pressure,EVC_02_Pressure_Low:inputValue2EVC_02_Pressure,
                    EVC_02_Volume_at_Base_Condition_High: inputValueEVC_02_Volume_at_Base_Condition,EVC_02_Volume_at_Base_Condition_Low:inputValue2EVC_02_Volume_at_Base_Condition,

                    EVC_02_Volume_at_Measurement_Condition_High: inputValueEVC_02_Volume_at_Measurement_Condition,EVC_02_Volume_at_Measurement_Condition_Low:inputValue2EVC_02_Volume_at_Measurement_Condition,
                    EVC_02_Flow_at_Base_Condition_High: inputValueEVC_02_Flow_at_Base_Condition,EVC_02_Flow_at_Base_Condition_Low:inputValue2EVC_02_Flow_at_Base_Condition,


                    EVC_02_Flow_at_Measurement_Condition_High: inputValueEVC_02_Flow_at_Measurement_Condition,EVC_02_Flow_at_Measurement_Condition_Low:inputValue2EVC_02_Flow_at_Measurement_Condition,
                    EVC_02_Vb_of_Current_Day_High: inputValueEVC_02_Vb_of_Current_Day,EVC_02_Vb_of_Current_Day_Low:inputValue2EVC_02_Vb_of_Current_Day,
                    EVC_02_Vm_of_Current_Day_High: inputValueEVC_02_Vm_of_Current_Day,EVC_02_Vm_of_Current_Day_Low:inputValue2EVC_02_Vm_of_Current_Day,

                    EVC_02_Vb_of_Last_Day_High: inputValueEVC_02_Vb_of_Last_Day,EVC_02_Vb_of_Last_Day_Low:inputValue2EVC_02_Vb_of_Last_Day,

                    EVC_02_Vm_of_Last_Day_High: inputValueEVC_02_Vm_of_Last_Day,EVC_02_Vm_of_Last_Day_Low:inputValue2EVC_02_Vm_of_Last_Day,



                    FC_01_Today_Values_Volume_High: inputValueFC_01_Today_Values_Volume,FC_01_Today_Values_Volume_Low:inputValue2FC_01_Today_Values_Volume,
                    FC_01_Today_Values_Uncorrected_Volume_High: inputValueFC_01_Today_Values_Uncorrected_Volume,FC_01_Today_Values_Uncorrected_Volume_Low:inputValue2FC_01_Today_Values_Uncorrected_Volume,
                    FC_01_Yesterday_Values_Volume_High: inputValueFC_01_Yesterday_Values_Volume,FC_01_Yesterday_Values_Volume_Low:inputValue2FC_01_Yesterday_Values_Volume,

                    FC_01_Yesterday_Values_Uncorrected_Volume_High: inputValueFC_01_Yesterday_Values_Uncorrected_Volume,FC_01_Yesterday_Values_Uncorrected_Volume_Low:inputValue2FC_01_Yesterday_Values_Uncorrected_Volume,



                    PIT_6001B_High: inputValuePIT_6001B,PIT_6001B_Low:inputValue2PIT_6001B,
                    PIT_6002A_High: inputValuePIT_6002A,PIT_6002A_Low:inputValue2PIT_6002A,
                    PIT_6001A_High: inputValuePIT_6001A,PIT_6001A_Low:inputValue2PIT_6001A,


                    PIT_6002B_High: inputValuePIT_6002B,PIT_6002B_Low:inputValue2PIT_6002B,
                    PIT_6003A_High: inputValuePIT_6003A,PIT_6003A_Low:inputValue2PIT_6003A,
                    TIT_6001A_High: inputValueTIT_6001A,TIT_6001A_Low:inputValue2TIT_6001A,

                    TIT_6002_High: inputValueTIT_6002,TIT_6002_Low:inputValue2TIT_6002,
                    GD_6001_High: inputValueGD_6001,GD_6001_Low:inputValue2GD_6001,
                    SDV_6001A_High: inputValueSDV_6001A,SDV_6001A_Low:inputValue2SDV_6001A,


                    SDV_6002_High: inputValueSDV_6002,SDV_6002_Low:inputValue2SDV_6002,
                    SDV_6001B_High: inputValueSDV_6001B,SDV_6001B_Low:inputValue2SDV_6001B,


                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,

                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,


                    HEATER_3_High: inputValueHEATER_3,HEATER_3_Low:inputValue2HEATER_3,
                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,
                    IOT_Gateway_Phone: inputGetwayPhone,

                    //==========================================


                    PCV_6001A: inputPCV_6001A,
                    PCV_6001B: inputPCV_6001B,

                    PCV_6002A: inputPCV_6002A,
                    PCV_6002B: inputPCV_6002B,

                    PSV_6001A: inputPSV_6001A,
                    PSV_6001B: inputPSV_6001B,

                    PSV_6002A: inputPSV_6002A,
                    PSV_6002B: inputPSV_6002B,

                    EVC_01_Battery_Expiration_Date: timeEVC_01,
                    EVC_01_Battery_Installation_Date: timeEVC_02,
                    EVC_02_Battery_Expiration_Date: timeEVC_03,
                    EVC_02_Battery_Installation_Date: timeEVC_04,

                }
            );

            setPCV_6001A(inputPCV_6001A)
            setPCV_6001B(inputPCV_6001B)
            setPCV_6002A(inputPCV_6002A)
            setPCV_6002B(inputPCV_6002B)

            setPSV_6001A(inputPSV_6001A)
            setPSV_6001B(inputPSV_6001B)
            setPSV_6002A(inputPSV_6002A)
            setPSV_6002B(inputPSV_6002B)

            //===========================================
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setESD_High(inputValueESD);
            setESD_Low(inputValue2ESD);

            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setPT_6004_High(inputValuePT_6004);
            setPT_6004_Low(inputValue2PT_6004);

            setPUMP_3_High(inputValuePUMP_3);
            setPUMP_3_Low(inputValue2PUMP_3);

            setSDV_6003_High(inputValueSDV_6003);
            setSDV_6003_Low(inputValue2SDV_6003);

            setEVC_01_Remain_Battery_Service_Life_High(inputValueEVC_01_Remain_Battery_Service_Life);
            setEVC_01_Remain_Battery_Service_Life_Low(inputValue2EVC_01_Remain_Battery_Service_Life);

            setEVC_01_Temperature_High(inputValueEVC_01_Temperature);
            setEVC_01_Temperature_Low(inputValue2EVC_01_Temperature);

            setEVC_01_Pressure_High(inputValueEVC_01_Pressure);
            setEVC_01_Pressure_Low(inputValue2EVC_01_Pressure);

            setEVC_01_Pressure_High(inputValueEVC_01_Pressure);
            setEVC_01_Pressure_Low(inputValue2EVC_01_Pressure);

            setEVC_01_Volume_at_Base_Condition_High(inputValueEVC_01_Volume_at_Base_Condition);
            setEVC_01_Volume_at_Base_Condition_Low(inputValue2EVC_01_Volume_at_Base_Condition);

            setEVC_01_Volume_at_Measurement_Condition_High(inputValueEVC_01_Volume_at_Measurement_Condition);
            setEVC_01_Volume_at_Measurement_Condition_Low(inputValue2EVC_01_Volume_at_Measurement_Condition);

            setEVC_01_Flow_at_Base_Condition_High(inputValueEVC_01_Flow_at_Base_Condition);
            setEVC_01_Flow_at_Base_Condition_Low(inputValue2EVC_01_Flow_at_Base_Condition);


            setEVC_01_Flow_at_Measurement_Condition_High(inputValueEVC_01_Flow_at_Measurement_Condition);
            setEVC_01_Flow_at_Measurement_Condition_Low(inputValue2EVC_01_Flow_at_Measurement_Condition);

            setEVC_01_Vb_of_Current_Day_High(inputValueEVC_01_Vb_of_Current_Day);
            setEVC_01_Vb_of_Current_Day_Low(inputValue2EVC_01_Vb_of_Current_Day);

            setEVC_01_Vm_of_Current_Day_High(inputValueEVC_01_Vm_of_Current_Day);
            setEVC_01_Vm_of_Current_Day_Low(inputValue2EVC_01_Vm_of_Current_Day);

            setEVC_01_Vm_of_Last_Day_High(inputValueEVC_01_Vm_of_Last_Day);
            setEVC_01_Vm_of_Last_Day_Low(inputValue2EVC_01_Vm_of_Last_Day);

            setEVC_01_Vb_of_Last_Day_High(inputValueEVC_01_Vb_of_Last_Day);
            setEVC_01_Vb_of_Last_Day_Low(inputValue2EVC_01_Vb_of_Last_Day);


            setEVC_02_Temperature_High(inputValueEVC_02_Temperature);
            setEVC_02_Temperature_Low(inputValue2EVC_02_Temperature);

            setEVC_02_Remain_Battery_Service_Life_High(inputValueEVC_02_Remain_Battery_Service_Life);
            setEVC_02_Remain_Battery_Service_Life_Low(inputValue2EVC_02_Remain_Battery_Service_Life);

            setEVC_02_Pressure_High(inputValueEVC_02_Pressure);
            setEVC_02_Pressure_Low(inputValue2EVC_02_Pressure);

            setEVC_02_Volume_at_Base_Condition_High(inputValueEVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_Low(inputValue2EVC_02_Volume_at_Base_Condition);



            setEVC_02_Flow_at_Measurement_Condition_High(inputValueEVC_02_Flow_at_Measurement_Condition);
            setEVC_02_Flow_at_Measurement_Condition_Low(inputValue2EVC_02_Flow_at_Measurement_Condition);

            setEVC_02_Vb_of_Current_Day_High(inputValueEVC_02_Vb_of_Current_Day);
            setEVC_02_Vb_of_Current_Day_Low(inputValue2EVC_02_Vb_of_Current_Day);

            setEVC_02_Vm_of_Current_Day_High(inputValueEVC_02_Vm_of_Current_Day);
            setEVC_02_Vm_of_Current_Day_Low(inputValue2EVC_02_Vm_of_Current_Day);

            setEVC_02_Vb_of_Last_Day_High(inputValueEVC_02_Vb_of_Last_Day);
            setEVC_02_Vb_of_Last_Day_Low(inputValue2EVC_02_Vb_of_Last_Day);

            setEVC_02_Vm_of_Last_Day_High(inputValueEVC_02_Vm_of_Last_Day);
            setEVC_02_Vm_of_Last_Day_Low(inputValue2EVC_02_Vm_of_Last_Day);


            setFC_01_Today_Values_Volume_High(inputValueFC_01_Today_Values_Volume);
            setFC_01_Today_Values_Volume_Low(inputValue2FC_01_Today_Values_Volume);

            setFC_01_Today_Values_Uncorrected_Volume_High(inputValueFC_01_Today_Values_Uncorrected_Volume);
            setFC_01_Today_Values_Uncorrected_Volume_Low(inputValue2FC_01_Today_Values_Uncorrected_Volume);

            setFC_01_Yesterday_Values_Volume_High(inputValueFC_01_Yesterday_Values_Volume);
            setFC_01_Yesterday_Values_Volume_Low(inputValue2FC_01_Yesterday_Values_Volume);

            setFC_01_Yesterday_Values_Uncorrected_Volume_High(inputValueFC_01_Yesterday_Values_Uncorrected_Volume);
            setFC_01_Yesterday_Values_Uncorrected_Volume_Low(inputValue2FC_01_Yesterday_Values_Uncorrected_Volume);

            setPIT_6001B_High(inputValuePIT_6001B);
            setPIT_6001B_Low(inputValue2PIT_6001B);

            setPIT_6002A_High(inputValuePIT_6002A);
            setPIT_6002A_Low(inputValue2PIT_6002A);

            setPIT_6002A_High(inputValuePIT_6002A);
            setPIT_6002A_Low(inputValue2PIT_6002A);

            setPIT_6002B_High(inputValuePIT_6002B);
            setPIT_6002B_Low(inputValue2PIT_6002B);

            setPIT_6003A_High(inputValuePIT_6003A);
            setPIT_6003A_Low(inputValue2PIT_6003A);

            setTIT_6001A_High(inputValueTIT_6001A);
            setTIT_6001A_Low(inputValue2TIT_6001A);


            setTIT_6002_High(inputValueTIT_6002);
            setTIT_6002_Low(inputValue2TIT_6002);

            setGD_6001_High(inputValueGD_6001);
            setGD_6001_Low(inputValue2GD_6001);

            setSDV_6001A_High(inputValueSDV_6001A);
            setSDV_6001A_Low(inputValue2SDV_6001A);

            setSDV_6002_High(inputValueSDV_6002);
            setSDV_6002_Low(inputValue2SDV_6002);

            setSDV_6001B_High(inputValueSDV_6001B);
            setSDV_6001B_Low(inputValue2SDV_6001B);


            setWater_LSW_High(inputValueWater_LSW);
            setWater_LSW_Low(inputValue2Water_LSW);

            setWater_PG_High(inputValueWater_PG);
            setWater_PG_Low(inputValue2Water_PG);

            setPUMP_1_High(inputValuePUMP_1);
            setPUMP_1_Low(inputValue2PUMP_1);

            setPUMP_2_High(inputValuePUMP_2);
            setPUMP_2_Low(inputValue2PUMP_2);



            setHEATER_3_High(inputValueHEATER_3);
            setHEATER_3_Low(inputValue2HEATER_3);

            setBOILER_High(inputValueBOILER);
            setBOILER_Low(inputValue2BOILER);

            setGD_STATUS_High(inputValueGD_STATUS);
            setGD_STATUS_Low(inputValue2GD_STATUS);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
        } catch (error) {
            console.log("error: ", error);
            toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
        }
    };
    const confirmUpData = () => {
        confirmDialog({
            message: "Are you sure you updated the data?",
            header: "Confirmation",
            icon: "pi pi-info-circle",
            accept: () => handleButtonClick(),
        });
    }

    useEffect(() => {

        setInputPCV_6001A(PCV_6001A)
        setInputPCV_6001B(PCV_6001B)
        setInputPCV_6002A(PCV_6002A)
        setInputPCV_6002B(PCV_6002B)


        setInputPSV_6001A(PSV_6001A)
        setInputPSV_6001B(PSV_6001B)
        setInputPSV_6002A(PSV_6002A)
        setInputPSV_6002B(PSV_6002B)
//========================================================
        setInputValueESD(ESD_High); 
        setInputValue2ESD(ESD_Low); 

        setInputValueHR_BC(HR_BC_High); 
        setInputValue2HR_BC(HR_BC_Low); 

        setInputValueSD(SD_High); 
        setInputValue2SD(SD_Low); 

        setInputValuePT_6004(PT_6004_High); 
        setInputValue2PT_6004(PT_6004_Low); 

        setInputValuePUMP_3(PUMP_3_High); 
        setInputValue2PUMP_3(PUMP_3_Low); 

        setInputValueSDV_6003(SDV_6003_High); 
        setInputValue2SDV_6003(SDV_6003_Low); 


        setInputValueEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_High); 
        setInputValue2EVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_Low); 

        setInputValueEVC_01_Temperature(EVC_01_Temperature_High); 
        setInputValue2EVC_01_Temperature(EVC_01_Temperature_Low); 

        setInputValueEVC_01_Pressure(EVC_01_Pressure_High); 
        setInputValue2EVC_01_Pressure(EVC_01_Pressure_Low); 



        setInputValueEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_High); 
        setInputValue2EVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_Low); 

        setInputValueEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_High); 
        setInputValue2EVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_Low); 

        setInputValueEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_High); 
        setInputValue2EVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_Low); 
        

        setInputValueEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_High); 
        setInputValue2EVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_Low); 

        setInputValueEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_High); 
        setInputValue2EVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_Low); 

        setInputValueEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_High); 
        setInputValue2EVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_Low); 

        setInputValueEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_High); 
        setInputValue2EVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Low); 

        setInputValueEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_High); 
        setInputValue2EVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Low); 

        setInputValueEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_High); 
        setInputValue2EVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Low); 

        setInputValueEVC_02_Temperature(EVC_02_Temperature_High); 
        setInputValue2EVC_02_Temperature(EVC_02_Temperature_Low); 

        setInputValueEVC_02_Pressure(EVC_02_Pressure_High); 
        setInputValue2EVC_02_Pressure(EVC_02_Pressure_Low); 

        setInputValueEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_High); 
        setInputValue2EVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Low); 


        setInputValueEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_High); 
        setInputValue2EVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Low); 

        setInputValueEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_High); 
        setInputValue2EVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Low); 


        setInputValueEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_High); 
        setInputValue2EVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Low); 


        setInputValueEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_High); 
        setInputValue2EVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Low); 

        setInputValueEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_High); 
        setInputValue2EVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Low); 


        setInputValueEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_High); 
        setInputValue2EVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Low); 

        setInputValueEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_High); 
        setInputValue2EVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Low); 




        setInputValueFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_High); 
        setInputValue2FC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Low); 

        setInputValueFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Low); 


        setInputValueFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_High); 
        setInputValue2FC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Low); 

        setInputValueFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Low); 


        setInputValuePIT_6001A(PIT_6001A_High); 
        setInputValue2PIT_6001A(PIT_6001A_Low); 

        setInputValuePIT_6001B(PIT_6001B_High); 
        setInputValue2PIT_6001B(PIT_6001B_Low); 

        setInputValuePIT_6002A(PIT_6002A_High); 
        setInputValue2PIT_6002A(PIT_6002A_Low); 



        setInputValuePIT_6003A(PIT_6003A_High); 
        setInputValue2PIT_6003A(PIT_6003A_Low); 

        setInputValueTIT_6001A(TIT_6001A_High); 
        setInputValue2TIT_6001A(TIT_6001A_Low); 

        setInputValuePIT_6002B(PIT_6002B_High); 
        setInputValue2PIT_6002B(PIT_6002B_Low); 
        

        setInputValueGD_6001(GD_6001_High); 
        setInputValue2GD_6001(GD_6001_Low); 

        setInputValueSDV_6001A(SDV_6001A_High); 
        setInputValue2SDV_6001A(SDV_6001A_Low); 

        setInputValueTIT_6002(TIT_6002_High); 
        setInputValue2TIT_6002(TIT_6002_Low); 

        setInputValueSDV_6001B(SDV_6001B_High); 
        setInputValue2SDV_6001B(SDV_6001B_Low); 

        setInputValueSDV_6002(SDV_6002_High); 
        setInputValue2SDV_6002(SDV_6002_Low); 

        setInputValueWater_PG(Water_PG_High); 
        setInputValue2Water_PG(Water_PG_Low); 

        setInputValueWater_LSW(Water_LSW_High); 
        setInputValue2Water_LSW(Water_LSW_Low); 

        setInputValuePUMP_1(PUMP_1_High); 
        setInputValue2PUMP_1(PUMP_1_Low); 

        setInputValuePUMP_2(PUMP_2_High); 
        setInputValue2PUMP_2(PUMP_2_Low); 


        setInputValueHEATER_1(HEATER_1_High); 
        setInputValue2HEATER_1(HEATER_1_Low); 

        setInputValueHEATER_2(HEATER_2_High); 
        setInputValue2HEATER_2(HEATER_2_Low); 


        setInputValueHEATER_3(HEATER_3_High); 
        setInputValue2HEATER_3(HEATER_3_Low); 


        setInputValueBOILER(BOILER_High); 
        setInputValue2BOILER(BOILER_Low); 

        setInputValueGD_STATUS(GD_STATUS_High); 
        setInputValue2GD_STATUS(GD_STATUS_Low); 
        setInputGetwayPhone(getWayPhoneOTSUKA)

    }, [
        
        ESD_High, ESD_Low ,
        HR_BC_High, HR_BC_Low 
        ,SD_High, SD_Low ,


        PUMP_3_High,PUMP_3_Low,
         SDV_6003_High,SDV_6003_Low ,
          PT_6004_High,PT_6004_Low,
        
        EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low ,
        EVC_01_Temperature_High, EVC_01_Temperature_Low 
        ,EVC_01_Pressure_High, EVC_01_Pressure_Low ,


        EVC_01_Volume_at_Measurement_Condition_High,EVC_01_Volume_at_Measurement_Condition_Low,
         EVC_01_Flow_at_Base_Condition_High,EVC_01_Flow_at_Base_Condition_Low ,
          EVC_01_Volume_at_Base_Condition_High,EVC_01_Volume_at_Base_Condition_Low,

          EVC_01_Vb_of_Current_Day_High,EVC_01_Vb_of_Current_Day_Low,
          EVC_01_Vm_of_Current_Day_High,EVC_01_Vm_of_Current_Day_Low ,
           EVC_01_Flow_at_Measurement_Condition_High,EVC_01_Flow_at_Measurement_Condition_Low,
        
           EVC_01_Vb_of_Last_Day_High,EVC_01_Vb_of_Last_Day_Low,
           EVC_01_Vm_of_Last_Day_High,EVC_01_Vm_of_Last_Day_Low,

           EVC_02_Remain_Battery_Service_Life_High,EVC_02_Remain_Battery_Service_Life_Low,
           EVC_02_Temperature_High,EVC_02_Temperature_Low,

           EVC_02_Pressure_High,EVC_02_Pressure_Low,
           EVC_02_Volume_at_Base_Condition_High,EVC_02_Volume_at_Base_Condition_Low,

           EVC_02_Flow_at_Base_Condition_High,EVC_02_Flow_at_Base_Condition_Low,
           EVC_02_Volume_at_Measurement_Condition_High,EVC_02_Volume_at_Measurement_Condition_Low,


           EVC_02_Flow_at_Measurement_Condition_High,EVC_02_Flow_at_Measurement_Condition_Low,
           EVC_02_Vb_of_Current_Day_High,EVC_02_Vb_of_Current_Day_Low,
           EVC_02_Vm_of_Current_Day_High,EVC_02_Vm_of_Current_Day_Low,

           EVC_02_Vb_of_Last_Day_High,EVC_02_Vb_of_Last_Day_Low,

           EVC_02_Vm_of_Last_Day_High,EVC_02_Vm_of_Last_Day_Low,


           FC_01_Today_Values_Volume_High,FC_01_Today_Values_Volume_Low,

           FC_01_Today_Values_Uncorrected_Volume_High,FC_01_Today_Values_Uncorrected_Volume_Low,
           FC_01_Yesterday_Values_Volume_High,FC_01_Yesterday_Values_Volume_Low,

           FC_01_Yesterday_Values_Uncorrected_Volume_High,FC_01_Yesterday_Values_Uncorrected_Volume_Low,

           PIT_6001A_High, PIT_6001A_Low ,
        PIT_6001B_High, PIT_6001B_Low 
        ,PIT_6002A_High, PIT_6002A_Low ,


        PIT_6003A_High,PIT_6003A_Low,
         TIT_6001A_High,TIT_6001A_Low ,
          PIT_6002B_High,PIT_6002B_Low,

          GD_6001_High,GD_6001_Low,
          SDV_6001A_High,SDV_6001A_Low ,
           TIT_6002_High,TIT_6002_Low,
        
           SDV_6001B_High,SDV_6001B_Low,
           SDV_6002_High,SDV_6002_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,


           HEATER_3_High,HEATER_3_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,

              getWayPhoneOTSUKA,

              PCV_6001A,
              PCV_6001B,
              PCV_6002A,
              PCV_6002B,

              PSV_6001A,
              PSV_6001B,
              PSV_6002A,
              PSV_6002B,

              timeEVC_01,timeEVC_02
        ]);


    const combineCss = {



        CSSESD : {
            color:exceedThresholdESD && !maintainESD
            ? "#ff5656"
            : maintainESD
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSHR_BC : {
            color:exceedThresholdHR_BC && !maintainHR_BC
            ? "#ff5656"
            : maintainHR_BC
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSSD : {
            color:exceedThresholdSD && !maintainSD
            ? "#ff5656"
            : maintainSD
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPT_6004 : {
            color:exceedThresholdPT_6004 && !maintainPT_6004
            ? "#ff5656"
            : maintainPT_6004
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPUMP_3 : {
            color:exceedThresholdPUMP_3 && !maintainPUMP_3
            ? "#ff5656"
            : maintainPUMP_3
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSSDV_6003 : {
            color:exceedThresholdSDV_6003 && !maintainSDV_6003
            ? "#ff5656"
            : maintainSDV_6003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },



        CSSEVC_01_Remain_Battery_Service_Life : {
            color:exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
            ? "#ff5656"
            : maintainEVC_01_Remain_Battery_Service_Life
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSEVC_01_Temperature : {
            color:exceedThresholdTemperature && !maintainEVC_01_Temperature
            ? "#ff5656"
            : maintainEVC_01_Temperature
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSEVC_01_Pressure : {
            color:exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
            ? "#ff5656"
            : maintainEVC_01_Pressure
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_01_Volume_at_Base_Condition : {
            color:exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
            ? "#ff5656"
            : maintainEVC_01_Volume_at_Base_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_01_Volume_at_Measurement_Condition : {
            color:exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
            ? "#ff5656"
            : maintainEVC_01_Volume_at_Measurement_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSEVC_01_Flow_at_Base_Condition : {
            color:exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition
            ? "#ff5656"
            : maintainEVC_01_Flow_at_Base_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_01_Flow_at_Measurement_Condition : {
            color:exceedThresholdEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition
            ? "#ff5656"
            : maintainEVC_01_Flow_at_Measurement_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_01_Vb_of_Current_Day : {
            color:exceedThresholdEVC_01_Vb_of_Current_Day && !maintainEVC_01_Vb_of_Current_Day
            ? "#ff5656"
            : maintainEVC_01_Vb_of_Current_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSEVC_01_Vm_of_Current_Day : {
            color:exceedThresholdEVC_01_Vm_of_Current_Day && !maintainEVC_01_Vm_of_Current_Day
            ? "#ff5656"
            : maintainEVC_01_Vm_of_Current_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSEVC_01_Vb_of_Last_Day : {
            color:exceedThresholdEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day
            ? "#ff5656"
            : maintainEVC_01_Vb_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_01_Vm_of_Last_Day : {
            color:exceedThresholdEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day
            ? "#ff5656"
            : maintainEVC_01_Vm_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Remain_Battery_Service_Life : {
            color:exceedThresholdEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
            ? "#ff5656"
            : maintainEVC_02_Remain_Battery_Service_Life
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Temperature : {
            color:exceedThresholdEVC_02_Temperature && !maintainEVC_02_Temperature
            ? "#ff5656"
            : maintainEVC_02_Temperature
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Volume_at_Base_Condition : {
            color:exceedThresholdEVC_02_Volume_at_Base_Condition && !maintainEVC_02_Volume_at_Base_Condition
            ? "#ff5656"
            : maintainEVC_02_Volume_at_Base_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Pressure : {
            color:exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
            ? "#ff5656"
            : maintainEVC_02_Pressure
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_02_Volume_at_Measurement_Condition : {
            color:exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
            ? "#ff5656"
            : maintainEVC_02_Volume_at_Measurement_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Flow_at_Base_Condition : {
            color:exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
            ? "#ff5656"
            : maintainEVC_02_Flow_at_Base_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSEVC_02_Flow_at_Measurement_Condition : {
            color:exceedThresholdEVC_02_Flow_at_Measurement_Condition && !maintainEVC_02_Flow_at_Measurement_Condition
            ? "#ff5656"
            : maintainEVC_02_Flow_at_Measurement_Condition
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_02_Vb_of_Current_Day : {
            color:exceedThresholdEVC_02_Vb_of_Current_Day && !maintainEVC_02_Vb_of_Current_Day
            ? "#ff5656"
            : maintainEVC_02_Vb_of_Current_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Vm_of_Current_Day : {
            color:exceedThresholdEVC_02_Vm_of_Current_Day && !maintainEVC_02_Vm_of_Current_Day
            ? "#ff5656"
            : maintainEVC_02_Vm_of_Current_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSEVC_02_Vb_of_Last_Day : {
            color:exceedThresholdEVC_02_Vb_of_Last_Day && !maintainEVC_02_Vb_of_Last_Day
            ? "#ff5656"
            : maintainEVC_02_Vb_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_02_Vm_of_Last_Day : {
            color:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
            ? "#ff5656"
            : maintainEVC_02_Vm_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },





        CSSFC_01_Today_Values_Volume : {
            color:exceedThresholdFC_01_Today_Values_Volume && !maintainFC_01_Today_Values_Volume
            ? "#ff5656"
            : maintainFC_01_Today_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFC_01_Today_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_01_Today_Values_Uncorrected_Volume && !maintainFC_01_Today_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_01_Today_Values_Uncorrected_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_01_Yesterday_Values_Volume : {
            color:exceedThresholdFC_01_Yesterday_Values_Volume && !maintainFC_01_Yesterday_Values_Volume
            ? "#ff5656"
            : maintainFC_01_Yesterday_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFC_01_Yesterday_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume && !maintainFC_01_Yesterday_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_01_Yesterday_Values_Uncorrected_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPIT_6001A : {
            color:exceedThresholdPIT_6001A && !maintainPIT_6001A
            ? "#ff5656"
            : maintainPIT_6001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPIT_6001B : {
            color:exceedThreshold302 && !maintainPIT_6001B
            ? "#ff5656"
            : maintainPIT_6001B
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPIT_6002A : {
            color:exceedThresholdPIT_6002A && !maintainPIT_6002A
            ? "#ff5656"
            : maintainPIT_6002A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPIT_6002B : {
            color:exceedThresholdPIT_6002B && !maintainPIT_6002B
            ? "#ff5656"
            : maintainPIT_6002B
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPIT_6003A : {
            color:exceedThresholdPIT_6003A && !maintainPIT_6003A
            ? "#ff5656"
            : maintainPIT_6003A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSTIT_6001A : {
            color:exceedThresholdTIT_6001A && !maintainTIT_6001A
            ? "#ff5656"
            : maintainTIT_6001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSTIT_6002 : {
            color:exceedThresholdTIT_6002 && !maintainTIT_6002
            ? "#ff5656"
            : maintainTIT_6002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_6001 : {
            color:exceedThresholdGD_6001 && !maintainGD_6001
            ? "#ff5656"
            : maintainGD_6001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSSDV_6001A : {
            color:exceedThresholdSDV_6001A && !maintainSDV_6001A
            ? "#ff5656"
            : maintainSDV_6001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSSDV_6001B : {
            color:exceedThresholdSDV_6001B && !maintainSDV_6001B
            ? "#ff5656"
            : maintainSDV_6001B
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSSDV_6002 : {
            color:exceedThresholdSDV_6002 && !maintainSDV_6002
            ? "#ff5656"
            : maintainSDV_6002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSWater_PG : {
            color:exceedThresholdWater_PG && !maintainWater_PG
            ? "#ff5656"
            : maintainWater_PG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSWater_LSW : {
            color:exceedThresholdWater_LSW && !maintainWater_LSW
            ? "#ff5656"
            : maintainWater_LSW
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPUMP_2 : {
            color:exceedThresholdPUMP_2 && !maintainPUMP_2
            ? "#ff5656"
            : maintainPUMP_2
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPUMP_1 : {
            color:exceedThresholdPUMP_1 && !maintainPUMP_1
            ? "#ff5656"
            : maintainPUMP_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSHEATER_1 : {
            color:exceedThresholdHEATER_1 && !maintainHEATER_1
            ? "#ff5656"
            : maintainHEATER_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSHEATER_2 : {
            color:exceedThresholdHEATER_2 && !maintainHEATER_2
            ? "#ff5656"
            : maintainHEATER_2
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSHEATER_3 : {
            color:exceedThresholdHEATER_3 && !maintainHEATER_3
            ? "#ff5656"
            : maintainHEATER_3
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSBOILER : {
            color:exceedThresholdBOILER && !maintainBOILER
            ? "#ff5656"
            : maintainBOILER
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSGD_STATUS : {
            color:exceedThresholdGD_STATUS && !maintainGD_STATUS
            ? "#ff5656"
            : maintainGD_STATUS
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
  };
         
  const mainCategoryFC = {
    EVC01: 'EVC01 -  Parameter & Configuration',
    EVC02: 'EVC02 -  Parameter & Configuration',
    PLC: 'PLC -  Parameter & Configuration'
};


        const dataEVC01 = [



            

            {
                
                mainCategory: mainCategoryFC.EVC01,
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery_Service Life</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40001	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Remain_Battery_Service_Life}
             checked={maintainEVC_01_Remain_Battery_Service_Life}
         ></Checkbox>
    
            },
    
         
            {
                
                mainCategory: mainCategoryFC.EVC01,
                timeUpdate: <span style={combineCss.CSSEVC_01_Temperature} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Temperature}>Temperature</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Temperature}>40850	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature} {nameValue.C} </span> , 
             high: <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Temperature}
             checked={maintainEVC_01_Temperature}
         ></Checkbox>
    
            },

            {
                
                mainCategory: mainCategoryFC.EVC01,
                timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSEVC_01_Pressure}>Pressure</span> ,
   
            modbus: <span style={combineCss.CSSEVC_01_Pressure}>40852	 </span> ,
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure}  {nameValue.Bara}</span> , 
            high: <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainEVC_01_Pressure}
            checked={maintainEVC_01_Pressure}
        ></Checkbox>
   
           },
           {
            
            mainCategory: mainCategoryFC.EVC01,
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
          name: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>Volume at Measurement Condition</span> ,
 
          modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40856	 </span> ,
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Condition} {nameValue.m3} </span> , 
          high: <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainEVC_01_Volume_at_Measurement_Condition}
          checked={maintainEVC_01_Volume_at_Measurement_Condition}
      ></Checkbox>
 
         },

           {
            
            mainCategory: mainCategoryFC.EVC01,
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}> Volume at Base Condition</span> ,
  
           modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40854	 </span> ,
  
          value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {EVC_01_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
           high: <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainEVC_01_Volume_at_Base_Condition}
           checked={maintainEVC_01_Volume_at_Base_Condition}
       ></Checkbox>
  
          },


         {
            
            mainCategory: mainCategoryFC.EVC01,
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>Flow at Measurement Condition</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>40860	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
        high: <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Flow_at_Measurement_Condition}
        checked={maintainEVC_01_Flow_at_Measurement_Condition}
    ></Checkbox>

       },
         {
            
            mainCategory: mainCategoryFC.EVC01,
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
         name: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>Flow at Base Condition</span> ,

         modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40858	 </span> ,

        value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
         high: <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainEVC_01_Flow_at_Base_Condition}
         checked={maintainEVC_01_Flow_at_Base_Condition}
     ></Checkbox>

        },

  
        {
            
            mainCategory: mainCategoryFC.EVC01,
            timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>Vm of Current Day</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40864	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {EVC_01_Vm_of_Current_Day}  {nameValue.m3} </span> , 
        high: <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vm_of_Current_Day}
        checked={maintainEVC_01_Vm_of_Current_Day}
    ></Checkbox>

       },

       {
        
        mainCategory: mainCategoryFC.EVC01,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Vb of Current Day</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40862	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {EVC_01_Vb_of_Current_Day}  {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Current_Day}
       checked={maintainEVC_01_Vb_of_Current_Day}
   ></Checkbox>

      },

      {
        
        mainCategory: mainCategoryFC.EVC01,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} >{EVC_STT01Value}</span>,
      name: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>Vm of Last Day</span> ,

      modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40868	 </span> ,

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {EVC_01_Vm_of_Last_Day} {nameValue.m3}</span> , 
      high: <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainEVC_01_Vm_of_Last_Day}
      checked={maintainEVC_01_Vm_of_Last_Day}
  ></Checkbox>

     },

       {
        
        mainCategory: mainCategoryFC.EVC01,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>Vb of Last Day</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40866	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {EVC_01_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

      },

              
  




    

          ]


          const dataEVC02 = [

            {
                mainCategory: mainCategoryFC.EVC02,
                timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,
            name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
       
            modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40001	 </span> ,
       
           value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span> , 
            high: <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainEVC_02_Remain_Battery_Service_Life}
            checked={maintainEVC_02_Remain_Battery_Service_Life}
        ></Checkbox>
       
           },
    
        




    {
        mainCategory: mainCategoryFC.EVC02,
        timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC_STT02Value}</span>,
    name: <span style={combineCss.CSSEVC_02_Temperature}>Temperature</span> ,

    modbus: <span style={combineCss.CSSEVC_02_Temperature}>40850	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Temperature} > {EVC_02_Temperature} {nameValue.C}</span> , 
    high: <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_02_Temperature}
    checked={maintainEVC_02_Temperature}
></Checkbox>

   },


   {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
   name: <span style={combineCss.CSSEVC_02_Pressure}>Pressure</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Pressure}>40852	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Pressure}
   checked={maintainEVC_02_Pressure}
></Checkbox>

  },


  {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>Volume at Base Condition</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40854	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.m3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Volume_at_Base_Condition}
  checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

 },

 {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} >{EVC_STT02Value}</span>,
   name: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>Volume at Measurement Condition</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40856	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.Sm3}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Volume_at_Measurement_Condition}
   checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

  },


  {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>Flow at Base Condition</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40858	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Flow_at_Base_Condition}
  checked={maintainEVC_02_Flow_at_Base_Condition}
></Checkbox>

 },




 {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} >{EVC_STT02Value}</span>,
 name: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>Flow at Measurement Condition</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40860	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.Sm3h}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Flow_at_Measurement_Condition}
 checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>Vb of Current Day</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40862	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.m3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Vb_of_Current_Day}
  checked={maintainEVC_02_Vb_of_Current_Day}
></Checkbox>

 },


 {
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} >{EVC_STT02Value}</span>,
 name: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>Vm of Current Day</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40864	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.Sm3}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Vm_of_Current_Day}
 checked={maintainEVC_02_Vm_of_Current_Day}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>Vb of Last Day</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40866	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vb_of_Last_Day}
checked={maintainEVC_02_Vb_of_Last_Day}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.EVC02,
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>Vm of Last Day</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40868	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.Sm3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},


          ]



          const PLC01 = [


        

            {
                mainCategory: mainCategoryFC.PLC,
                timeUpdate: <span style={combineCss.CSSPIT_6001A} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6001A}>Pressure Indicator Transmitter PIT-6001A</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6001A}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPIT_6001A} > {PIT_6001A} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6001A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6001A} onChange={handleInputChangePIT_6001A} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6001A} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_6001A}
             checked={maintainPIT_6001A}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory: mainCategoryFC.PLC,
                timeUpdate: <span style={combineCss.CSSPIT_6001B} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6001B}>Pressure Indicator Transmitter PIT-6001B</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6001B}>40003	 </span> ,
    
            value: <span style={combineCss.CSSPIT_6001B} > {PIT_6001B} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6001B}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6001B} onChange={handleInputChangePIT_6001B} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6001B}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6001B} onChange={handleInputChange2PIT_6001B} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_6001B}
             checked={maintainPIT_6001B}
         ></Checkbox>
    
            },
    
            {
                mainCategory: mainCategoryFC.PLC,
                timeUpdate: <span style={combineCss.CSSPIT_6002A} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6002A}>Pressure Indicator Transmitter PIT-6002A</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6002A}>40005</span> ,
    
            value: <span style={combineCss.CSSPIT_6002A} > {PIT_6002A} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6002A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6002A} onChange={handleInputChangePIT_6002A} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6002A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6002A} onChange={handleInputChange2PIT_6002A} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_6002A}
             checked={maintainPIT_6002A}
         ></Checkbox>
    
            },


            {
                mainCategory: mainCategoryFC.PLC,
                timeUpdate: <span style={combineCss.CSSPIT_6002B} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6002B}>Pressure Indicator Transmitter PIT-6002B</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6002B}>40007	 </span> ,
    
            value: <span style={combineCss.CSSPIT_6002B} > {PIT_6002B} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6002B}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6002B} onChange={handleInputChangePIT_6002B} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6002B}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6002B} onChange={handleInputChange2PIT_6002B} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_6002B}
             checked={maintainPIT_6002B}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.PLC,
                timeUpdate: <span style={combineCss.CSSPIT_6003A} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPIT_6003A}>Pressure Indicator Transmitter PIT-6003A</span> ,
   
            modbus: <span style={combineCss.CSSPIT_6003A}>40009	 </span> ,
   
           value: <span style={combineCss.CSSPIT_6003A} > {PIT_6003A} {nameValue.BARG}</span> , 
            high: <InputText style={combineCss.CSSPIT_6003A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6003A} onChange={handleInputChangePIT_6003A} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSPIT_6003A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6003A} onChange={handleInputChange2PIT_6003A} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainPIT_6003A}
            checked={maintainPIT_6003A}
        ></Checkbox>
   
           },

           {
            mainCategory: mainCategoryFC.PLC,
            timeUpdate: <span style={combineCss.CSSPT_6004} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSPT_6004}> Pressure Transmitter PT-6004</span> ,
        
        modbus: <span style={combineCss.CSSPT_6004}>40047	 </span> ,
        
        value: <span style={combineCss.CSSPT_6004} > {PT_6004} {nameValue.BARG}</span> , 
        high: <InputText style={combineCss.CSSPT_6004}   placeholder='High' step="0.1" type='number' value={inputValuePT_6004} onChange={handleInputChangePT_6004} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSPT_6004}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_6004} onChange={handleInputChange2PT_6004} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainPT_6004}
        checked={maintainPT_6004}
        ></Checkbox>
        
        },
           {
            mainCategory: mainCategoryFC.PLC,
            timeUpdate: <span style={combineCss.CSSTIT_6001A} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSTIT_6001A}>Temperature Indicator Transmitter TIT-6001A</span> ,
  
           modbus: <span style={combineCss.CSSTIT_6001A}>40011	 </span> ,
  
          value: <span style={combineCss.CSSTIT_6001A} > {TIT_6001A} {nameValue.C}</span> , 
           high: <InputText style={combineCss.CSSTIT_6001A}   placeholder='High' step="0.1" type='number' value={inputValueTIT_6001A} onChange={handleInputChangeTIT_6001A} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSTIT_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2TIT_6001A} onChange={handleInputChange2TIT_6001A} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainTIT_6001A}
           checked={maintainTIT_6001A}
       ></Checkbox>
  
          },




          {
            mainCategory: mainCategoryFC.PLC,
            timeUpdate: <span style={combineCss.CSSTIT_6002} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSTIT_6002}>Temperature Indicator Transmitter TIT-6002</span> ,
 
          modbus: <span style={combineCss.CSSTIT_6002}>40013	 </span> ,
 
         value: <span style={combineCss.CSSTIT_6002} > {TIT_6002 } {nameValue.C}</span> , 
          high: <InputText style={combineCss.CSSTIT_6002}   placeholder='High' step="0.1" type='number' value={inputValueTIT_6002} onChange={handleInputChangeTIT_6002} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSTIT_6002}   placeholder='Low' step="0.1" type='number' value={inputValue2TIT_6002} onChange={handleInputChange2TIT_6002} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainTIT_6002}
          checked={maintainTIT_6002}
      ></Checkbox>
 
         },

         {
            mainCategory: mainCategoryFC.PLC,
            timeUpdate: <span style={combineCss.CSSGD_6001} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSGD_6001}>Gas Detector GD-6001</span> ,

         modbus: <span style={combineCss.CSSGD_6001}>40015	 </span> ,

        value: <span style={combineCss.CSSGD_6001} > {GD_6001} {nameValue.LEL}</span> , 
         high: <InputText style={combineCss.CSSGD_6001}   placeholder='High' step="0.1" type='number' value={inputValueGD_6001} onChange={handleInputChangeGD_6001} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSGD_6001}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_6001} onChange={handleInputChange2GD_6001} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD_6001}
         checked={maintainGD_6001}
     ></Checkbox>

        },


        {
            mainCategory: mainCategoryFC.PLC,
            timeUpdate: <span style={combineCss.CSSSDV_6001A} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSSDV_6001A}>Shutdown Valve SDV-6001A</span> ,

        modbus: <span style={combineCss.CSSSDV_6001A}>40017	 </span> ,

       value: <span style={combineCss.CSSSDV_6001A} > {SDV_6001A}</span> , 
        high: <InputText style={combineCss.CSSSDV_6001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6001A} onChange={handleInputChangeSDV_6001A} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSSDV_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6001A} onChange={handleInputChange2SDV_6001A} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainSDV_6001A}
        checked={maintainSDV_6001A}
    ></Checkbox>

       },



       {
        mainCategory: mainCategoryFC.PLC,
        timeUpdate: <span style={combineCss.CSSSDV_6001B} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_6001B}>Shutdown Valve SDV-6001B</span> ,

       modbus: <span style={combineCss.CSSSDV_6001B}>40019	 </span> ,

      value: <span style={combineCss.CSSSDV_6001B} > {SDV_6001B}</span> , 
       high: <InputText style={combineCss.CSSSDV_6001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6001B} onChange={handleInputChangeSDV_6001B} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_6001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6001B} onChange={handleInputChange2SDV_6001B} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainSDV_6001B}
       checked={maintainSDV_6001B}
   ></Checkbox>

      },


      {
        mainCategory: mainCategoryFC.PLC,
        timeUpdate: <span style={combineCss.CSSSDV_6002} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_6002}>Shutdown Valve SDV-6002</span> ,

      modbus: <span style={combineCss.CSSSDV_6002}>40021	 </span> ,

     value: <span style={combineCss.CSSSDV_6002} > {SDV_6002}</span> , 
      high: <InputText style={combineCss.CSSSDV_6002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6002} onChange={handleInputChangeSDV_6002} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_6002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6002} onChange={handleInputChange2SDV_6002} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainSDV_6002}
      checked={maintainSDV_6002}
  ></Checkbox>

     },



     {
        mainCategory: mainCategoryFC.PLC,
        timeUpdate: <span style={combineCss.CSSWater_PG} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSWater_PG}>Water Pressure</span> ,

     modbus: <span style={combineCss.CSSWater_PG}>40023	 </span> ,

    value: <span style={combineCss.CSSWater_PG} > {Water_PG}</span> , 
     high: <InputText style={combineCss.CSSWater_PG}   placeholder='High' step="0.1" type='number' value={inputValueWater_PG} onChange={handleInputChangeWater_PG} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSWater_PG}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_PG} onChange={handleInputChange2Water_PG} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainWater_PG}
     checked={maintainWater_PG}
 ></Checkbox>

    },


    {
        mainCategory: mainCategoryFC.PLC,
        timeUpdate: <span style={combineCss.CSSWater_LSW} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSWater_LSW}>Water Level</span> ,

    modbus: <span style={combineCss.CSSWater_LSW}>40025	 </span> ,

   value: <span style={combineCss.CSSWater_LSW} > {Water_LSW}</span> , 
    high: <InputText style={combineCss.CSSWater_LSW}   placeholder='High' step="0.1" type='number' value={inputValueWater_LSW} onChange={handleInputChangeWater_LSW} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSWater_LSW}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_LSW} onChange={handleInputChange2Water_LSW} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainWater_LSW}
    checked={maintainWater_LSW}
></Checkbox>

   },


   {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSPUMP_1} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSPUMP_1}>Pump 1</span> ,

   modbus: <span style={combineCss.CSSPUMP_1}>40027	 </span> ,

  value: <span style={combineCss.CSSPUMP_1} > {PUMP_1}</span> , 
   high: <InputText style={combineCss.CSSPUMP_1}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_1} onChange={handleInputChangePUMP_1} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSPUMP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_1} onChange={handleInputChange2PUMP_1} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainPUMP_1}
   checked={maintainPUMP_1}
></Checkbox>

  },


  {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSPUMP_2} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSPUMP_2}>Pump 2</span> ,

  modbus: <span style={combineCss.CSSPUMP_2}>40029	 </span> ,

 value: <span style={combineCss.CSSPUMP_2} > {PUMP_2}</span> , 
  high: <InputText style={combineCss.CSSPUMP_2}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_2} onChange={handleInputChangePUMP_2} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSPUMP_2}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_2} onChange={handleInputChange2PUMP_2} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainPUMP_2}
  checked={maintainPUMP_2}
></Checkbox>

 },

 {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSHEATER_1} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSHEATER_1}>Heater 1</span> ,

   modbus: <span style={combineCss.CSSHEATER_1}>40031	 </span> ,

  value: <span style={combineCss.CSSHEATER_1} > {HEATER_1}</span> , 
   high: <InputText style={combineCss.CSSHEATER_1}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_1} onChange={handleInputChangeHEATER_1} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSHEATER_1}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_1} onChange={handleInputChange2HEATER_1} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainHEATER_1}
   checked={maintainHEATER_1}
></Checkbox>

  },


  {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSHEATER_2} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSHEATER_2}>HEATER_2</span> ,

  modbus: <span style={combineCss.CSSHEATER_2}>400011	 </span> ,

 value: <span style={combineCss.CSSHEATER_2} > {HEATER_2}</span> , 
  high: <InputText style={combineCss.CSSHEATER_2}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_2} onChange={handleInputChangeHEATER_2} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSHEATER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_2} onChange={handleInputChange2HEATER_2} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainHEATER_2}
  checked={maintainHEATER_2}
></Checkbox>

 },




 {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSHEATER_3} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSHEATER_3}>HEATER_3</span> ,

 modbus: <span style={combineCss.CSSHEATER_3}>40035	 </span> ,

value: <span style={combineCss.CSSHEATER_3} > {HEATER_3}</span> , 
 high: <InputText style={combineCss.CSSHEATER_3}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_3} onChange={handleInputChangeHEATER_3} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSHEATER_3}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_3} onChange={handleInputChange2HEATER_3} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainHEATER_3}
 checked={maintainHEATER_3}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSBOILER} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSBOILER}>Boiler</span> ,

  modbus: <span style={combineCss.CSSBOILER}>40037	 </span> ,

 value: <span style={combineCss.CSSBOILER} > {BOILER}</span> , 
  high: <InputText style={combineCss.CSSBOILER}   placeholder='High' step="0.1" type='number' value={inputValueBOILER} onChange={handleInputChangeBOILER} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSBOILER}   placeholder='Low' step="0.1" type='number' value={inputValue2BOILER} onChange={handleInputChange2BOILER} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainBOILER}
  checked={maintainBOILER}
></Checkbox>

 },


 {
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSGD_STATUS} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSGD_STATUS}>Gas Detector ST</span> ,

 modbus: <span style={combineCss.CSSGD_STATUS}>40039	 </span> ,

value: <span style={combineCss.CSSGD_STATUS} > {GD_STATUS}</span> , 
 high: <InputText style={combineCss.CSSGD_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD_STATUS} onChange={handleInputChangeGD_STATUS} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSGD_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_STATUS} onChange={handleInputChange2GD_STATUS} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainGD_STATUS}
 checked={maintainGD_STATUS}
></Checkbox>

},



{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSESD} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSESD}> Emergency Shutdown </span> ,

modbus: <span style={combineCss.CSSESD}>40041	 </span> ,

value: <span style={combineCss.CSSESD} > {ESD}</span> , 
high: <InputText style={combineCss.CSSESD}   placeholder='High' step="0.1" type='number' value={inputValueESD} onChange={handleInputChangeESD} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSESD}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD} onChange={handleInputChange2ESD} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainESD}
checked={maintainESD}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,

modbus: <span style={combineCss.CSSHR_BC}>40043	 </span> ,

value: <span style={combineCss.CSSHR_BC} > {HR_BC}</span> , 
high: <InputText style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainHR_BC}
checked={maintainHR_BC}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSSD} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD}>Smoker Detector</span> ,

modbus: <span style={combineCss.CSSSD}>40045	 </span> ,

value: <span style={combineCss.CSSSD} > {SD}</span> , 
high: <InputText style={combineCss.CSSSD}   placeholder='High' step="0.1" type='number' value={inputValueSD} onChange={handleInputChangeSD} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD}   placeholder='Low' step="0.1" type='number' value={inputValue2SD} onChange={handleInputChange2SD} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD}
checked={maintainSD}
></Checkbox>

},



{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSPUMP_3} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPUMP_3}>Pump 3</span> ,

modbus: <span style={combineCss.CSSPUMP_3}>40049	 </span> ,

value: <span style={combineCss.CSSPUMP_3} > {PUMP_3}</span> , 
high: <InputText style={combineCss.CSSPUMP_3}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_3} onChange={handleInputChangePUMP_3} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSPUMP_3}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_3} onChange={handleInputChange2PUMP_3} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainPUMP_3}
checked={maintainPUMP_3}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    timeUpdate: <span style={combineCss.CSSSDV_6003} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSDV_6003}> Shutdown Valve SDV-6003</span> ,

modbus: <span style={combineCss.CSSSDV_6003}>40051	 </span> ,

value: <span style={combineCss.CSSSDV_6003} > {SDV_6003}</span> , 
high: <InputText style={combineCss.CSSSDV_6003}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6003} onChange={handleInputChangeSDV_6003} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSDV_6003}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6003} onChange={handleInputChange2SDV_6003} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSDV_6003}
checked={maintainSDV_6003}
></Checkbox>

},

          ]

          
          const combinedData = [...dataEVC01, ...dataEVC02, ...PLC01];

          const mainCategoryTemplate = (data: any) => {
              return (
                  <div style={{fontWeight:600, fontSize:23,background:'#f8fafc'}}>
                      <span >{data.mainCategory}</span>
                  </div>
              );
          };
          
       //=========================================================================


       const combineCssAttribute = {
        PCV: {
            height: 25,
            fontWeight: 400,
        },
    };
  

  
 
    const handleInputChangeGetWayPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputGetwayPhone(newValue);
    };

    const handleInputPCV_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_6001A(newValue);
    };
    const handleInputPCV_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_6001B(newValue);
    };
    const handleInputPCV_6002A = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_6002A(newValue);
    };
    const handleInputPCV_6002B = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_6002B(newValue);
    };
    const handleInputPSV_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPSV_6001A(newValue);
    };
    const handleInputPSV_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPSV_6001B(newValue);
    };
    const handleInputPSV_6002A = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPSV_6002A(newValue);
    };
    const handleInputPSV_6002B = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPSV_6002B(newValue);
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
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const dateString = "01-03-2024";
        const parts = dateString.split('-');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; 
        const day = parseInt(parts[0], 10);
        const dateObject :any = new Date(year, month, day);
    
        setSelectedDate(dateObject);
      }, []);

      const ConfigurationName ={
        PSV: "Pressure Safety Valve ( PSV-1901)" ,
        PCV1: "Pressure Control Valve (PCV-1901)",
        PCV2: "Pressure Control Valve (PCV-1902)",
        IOT: "IOT getway phone number",
        EVC_01_Battery_Expiration_Date: "EVC 01 Battery Expiration Date",
        EVC_01_Battery_Installation_Date: "EVC 01 Battery Installation Date",

        EVC_02_Battery_Expiration_Date: "EVC 02 Battery Expiration Date",
        EVC_02_Battery_Installation_Date: "EVC 02 Battery Installation Date"

    }

    const combineCssTime = {
        PCV: {
            height: 25,
            fontWeight: 400,
        },
    };
    const Configuration = [
       
       

        {
            Name: <span style={combineCssAttribute.PCV}>PCV 6001A </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPCV_6001A}
                    onChange={handleInputPCV_6001A}
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
            Name: <span style={combineCssAttribute.PCV}>PCV 6001B </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPCV_6001B}
                    onChange={handleInputPCV_6001B}
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
            Name: <span style={combineCssAttribute.PCV}>PCV 6002A </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPCV_6002A}
                    onChange={handleInputPCV_6002A}
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
            Name: <span style={combineCssAttribute.PCV}>PCV 6002B </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPCV_6002B}
                    onChange={handleInputPCV_6002B}
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



        //===========================================


        {
            Name: <span style={combineCssAttribute.PCV}>PSV 6001A </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPSV_6001A}
                    onChange={handleInputPSV_6001A}
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
            Name: <span style={combineCssAttribute.PCV}>PSV 6001B </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPSV_6001B}
                    onChange={handleInputPSV_6001B}
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
            Name: <span style={combineCssAttribute.PCV}>PSV 6002A </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPSV_6002A}
                    onChange={handleInputPSV_6002A}
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
            Name: <span style={combineCssAttribute.PCV}>PSV 6002B </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPSV_6002B}
                    onChange={handleInputPSV_6002B}
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
            Name: <span style={combineCssAttribute.PCV}>IOT getway phone number </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
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
                <span style={combineCssTime.PCV}>
                    {ConfigurationName.EVC_01_Battery_Installation_Date}
                </span>
            ),
          
            Value: (
                <Calendar
                    style={combineCssTime.PCV}
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
                <span style={combineCssTime.PCV}>
                    {ConfigurationName.EVC_01_Battery_Expiration_Date}
                </span>
            ),
          
         
            Value: (
                <Calendar
                
                    style={combineCssTime.PCV}
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
                <span style={combineCssTime.PCV}>
                    {ConfigurationName.EVC_02_Battery_Installation_Date}
                </span>
            ),
          
            Value: (
                <Calendar
                    style={combineCssTime.PCV}
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
                <span style={combineCssTime.PCV}>
                    {ConfigurationName.EVC_02_Battery_Expiration_Date}
                </span>
            ),
          
         
            Value: (
                <Calendar
                
                    style={combineCssTime.PCV}
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

       //=========================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius:10, marginTop:10 }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

        {SDV_6003}

<h2>CNG PRU</h2>

    <div style={{width:'100%' ,  borderRadius:5 }}>

        

    <DataTable size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}     >
  {/* <Column field="modbus" header="Modbus" /> */}
  <Column field="timeUpdate" header="Time Update" />

  <Column field="modbus" header="Modbus" />

  <Column field="name" header="Name" />

  <Column field="value" header="Value" />
  <Column  field="high" header="High" />
  <Column field="low" header="Low" />
  <Column field="Maintain" header="Maintain" />
  <Column field="update" header="Update" />

</DataTable>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - Configuration </h4>
                <DataTable value={Configuration} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    <Column field="Update" header="Update" />
                </DataTable>
            </div>
</div>

<br />
<br />



</div>
  )
}
