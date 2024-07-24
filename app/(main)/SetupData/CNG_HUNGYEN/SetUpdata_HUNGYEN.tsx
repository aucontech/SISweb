import React, { useEffect, useRef, useState } from 'react'
import { id_CNG_HungYen } from '../../data-table-device/ID-DEVICE/IdDevice';
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
import { namePCV_PSV, nameValue } from '../namValue';

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
export default function SetUpdata_HUNGYEN() {

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

    const [PCV_3001A,setPCV_3001A] = useState<any>()
    const [inputPCV_3001A, setInputPCV_3001A] = useState<any>();

    const [PCV_3001B,setPCV_3001B] = useState<any>()
    const [inputPCV_3001B, setInputPCV_3001B] = useState<any>();

    const [PCV_3002A,setPCV_3002A] = useState<any>()
    const [inputPCV_3002A, setInputPCV_3002A] = useState<any>();

    const [PCV_3002B,setPCV_3002B] = useState<any>()
    const [inputPCV_3002B, setInputPCV_3002B] = useState<any>();


    const [PSV_3001A,setPSV_3001A] = useState<any>()
    const [inputPSV_3001A, setInputPSV_3001A] = useState<any>();

    const [PSV_3001B,setPSV_3001B] = useState<any>()
    const [inputPSV_3001B, setInputPSV_3001B] = useState<any>();

    const [PSV_3002A,setPSV_3002A] = useState<any>()
    const [inputPSV_3002A, setInputPSV_3002A] = useState<any>();

    const [PSV_3002B,setPSV_3002B] = useState<any>()
    const [inputPSV_3002B, setInputPSV_3002B] = useState<any>();

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
                    entityId: id_CNG_HungYen,
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
                                key: "PCV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002B",
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
                                id: id_CNG_HungYen,
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
                                key: "PCV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_3002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_3002B",
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

                    const keys = Object.keys(dataReceived.data);
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


                        PIT_3001A: setPIT_3001A,
                        PIT_3001B: setPIT_3001B,
                        PT_3001: setPT_3001,
                        PT_3002: setPT_3002,
                        PT_3003: setPT_3003,
                        TT_3001: setTT_3001,

                        TT_3002: setTT_3002,
                        GD_3001: setGD_3001,

                        SDV_3001A: setSDV_3001A,
                        SDV_3001B: setSDV_3001B,
                        SDV_3002: setSDV_3002,

                        Water_PG: setWater_PG,
                        Water_LSW: setWater_LSW,
                        PUMP_1: setPUMP_1,
                        PUMP_2: setPUMP_2,
                        
                        HEATER_1: setHEATER_1,
                        HEATER_2: setHEATER_2,

                        BOILER: setBOILER,
                        GD_STATUS: setGD_STATUS,


                        HR_BC: setHR_BC,
                        SD: setSD,
                        ESD_3001: setESD_3001,
                        SD_3001: setSD_3001,
                        SD_3002: setSD_3002,


                  
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3001A?.value;
                    setPCV_3001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3001A?.value;
                    setPCV_3001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3001B?.value;
                    setPCV_3001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3001B?.value;
                    setPCV_3001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3002A?.value;
                    setPCV_3002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3002A?.value;
                    setPCV_3002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_3002B?.value;
                    setPCV_3002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_3002B?.value;
                    setPCV_3002B(updatedData);
                }

                //=================================


                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3001A?.value;
                    setPSV_3001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3001A?.value;
                    setPSV_3001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3001B?.value;
                    setPSV_3001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3001B?.value;
                    setPSV_3001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3002A?.value;
                    setPSV_3002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3002A?.value;
                    setPSV_3002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_3002B?.value;
                    setPSV_3002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_3002B?.value;
                    setPSV_3002B(updatedData);
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/values/attributes/SERVER_SCOPE`
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


            const ESD_3001_High = res.data.find((item: any) => item.key === "ESD_3001_High");
            setESD_3001_High(ESD_3001_High?.value || null);
            const ESD_3001_Low = res.data.find((item: any) => item.key === "ESD_3001_Low");
            setESD_3001_Low(ESD_3001_Low?.value || null);
            const ESD_3001_Maintain = res.data.find(
                (item: any) => item.key === "ESD_3001_Maintain"
            );

            const SD_3001_High = res.data.find((item: any) => item.key === "SD_3001_High");
            setSD_3001_High(SD_3001_High?.value || null);
            const SD_3001_Low = res.data.find((item: any) => item.key === "SD_3001_Low");
            setSD_3001_Low(SD_3001_Low?.value || null);
            const SD_3001_Maintain = res.data.find(
                (item: any) => item.key === "SD_3001_Maintain"
            );

            const SD_3002_High = res.data.find((item: any) => item.key === "SD_3002_High");
            setSD_3002_High(SD_3002_High?.value || null);
            const SD_3002_Low = res.data.find((item: any) => item.key === "SD_3002_Low");
            setSD_3002_Low(SD_3002_Low?.value || null);
            const SD_3002_Maintain = res.data.find(
                (item: any) => item.key === "SD_3002_Maintain"
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
            const PIT_3001A_High = res.data.find((item: any) => item.key === "PIT_3001A_High");
            setPIT_3001A_High(PIT_3001A_High?.value || null);
            const PIT_3001A_Low = res.data.find((item: any) => item.key === "PIT_3001B_Low");
            setPIT_3001A_Low(PIT_3001A_Low?.value || null);
            const MaintainPIT_3001A = res.data.find(
                (item: any) => item.key === "PIT_3001A_Maintain"
            );


            const PIT_3001B_High = res.data.find((item: any) => item.key === "PIT_3001B_High");
            setPIT_3001B_High(PIT_3001B_High?.value || null);
            const PIT_3001B_Low = res.data.find((item: any) => item.key === "PIT_3001B_Low");
            setPIT_3001B_Low(PIT_3001B_Low?.value || null);
            const PIT_3001B_Maintain = res.data.find(
                (item: any) => item.key === "PIT_3001B_Maintain"
            );

            const PT_3001_High = res.data.find((item: any) => item.key === "PT_3001_High");
            setPT_3001_High(PT_3001_High?.value || null);
            const PT_3001_Low = res.data.find((item: any) => item.key === "PT_3001_Low");
            setPT_3001_Low(PT_3001_Low?.value || null);
            const PT_3001_Maintain = res.data.find(
                (item: any) => item.key === "PT_3001_Maintain"
            );


            const PT_3002_High = res.data.find((item: any) => item.key === "PT_3002_High");
            setPT_3002_High(PT_3002_High?.value || null);
            const PT_3002_Low = res.data.find((item: any) => item.key === "PT_3002_Low");
            setPT_3002_Low(PT_3002_Low?.value || null);
            const PT_3002_Maintain = res.data.find(
                (item: any) => item.key === "PT_3002_Maintain"
            );

            const PT_3003_High = res.data.find((item: any) => item.key === "PT_3003_High");
            setPT_3003_High(PT_3003_High?.value || null);
            const PT_3003_Low = res.data.find((item: any) => item.key === "PT_3003_Low");
            setPT_3003_Low(PT_3003_Low?.value || null);
            const PT_3003_Maintain = res.data.find(
                (item: any) => item.key === "PT_3003_Maintain"
            );

            const TT_3001_High = res.data.find((item: any) => item.key === "TT_3001_High");
            setTT_3001_High(TT_3001_High?.value || null);
            const TT_3001_Low = res.data.find((item: any) => item.key === "TT_3001_Low");
            setTT_3001_Low(TT_3001_Low?.value || null);
            const TT_3001_Maintain = res.data.find(
                (item: any) => item.key === "TT_3001_Maintain"
            );


            const TT_3002_High = res.data.find((item: any) => item.key === "TT_3002_High");
            setTT_3002_High(TT_3002_High?.value || null);
            const TT_3002_Low = res.data.find((item: any) => item.key === "TT_3002_Low");
            setTT_3002_Low(TT_3002_Low?.value || null);
            const TT_3002_Maintain = res.data.find(
                (item: any) => item.key === "TT_3002_Maintain"
            );


            const GD_3001_High = res.data.find((item: any) => item.key === "GD_3001_High");
            setGD_3001_High(GD_3001_High?.value || null);
            const GD_3001_Low = res.data.find((item: any) => item.key === "GD_3001_Low");
            setGD_3001_Low(GD_3001_Low?.value || null);
            const GD_3001_Maintain = res.data.find(
                (item: any) => item.key === "GD_3001_Maintain"
            );

            const SDV_3001A_High = res.data.find((item: any) => item.key === "SDV_3001A_High");
            setSDV_3001A_High(SDV_3001A_High?.value || null);
            const SDV_3001A_Low = res.data.find((item: any) => item.key === "SDV_3001A_Low");
            setSDV_3001A_Low(SDV_3001A_Low?.value || null);
            const SDV_3001A_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3001A_Maintain"
            );

            const SDV_3001B_High = res.data.find((item: any) => item.key === "SDV_3001B_High");
            setSDV_3001B_High(SDV_3001B_High?.value || null);
            const SDV_3001B_Low = res.data.find((item: any) => item.key === "SDV_3001B_Low");
            setSDV_3001B_Low(SDV_3001B_Low?.value || null);
            const SDV_3001B_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3001B_Maintain"
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


            const SDV_3002_High = res.data.find((item: any) => item.key === "SDV_3002_High");
            setSDV_3002_High(SDV_3002_High?.value || null);
            const SDV_3002_Low = res.data.find((item: any) => item.key === "SDV_3002_Low");
            setSDV_3002_Low(SDV_3002_Low?.value || null);
            const SDV_3002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3002_Maintain"
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



            setMaintainHR_BC(HR_BC_Maintain?.value || false);

            setMaintainSD(SD_Maintain?.value || false);

            setMaintainESD_3001(ESD_3001_Maintain?.value || false);


            setMaintainSD_3001(SD_3001_Maintain?.value || false);


            setMaintainSD_3002(SD_3002_Maintain?.value || false);



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


            setMaintainPIT_3001A(MaintainPIT_3001A?.value || false);


            setMaintainPIT_3001B(PIT_3001B_Maintain?.value || false);

            setMaintainPT_3001(PT_3001_Maintain?.value || false);


            setMaintainPT_3002(PT_3002_Maintain?.value || false);


            setMaintainPT_3003(PT_3003_Maintain?.value || false);


            setMaintainTT_3001(TT_3001_Maintain?.value || false);


            setMaintainGD_STATUS(GD_STATUS_Maintain?.value || false);

            
            setMaintainBOILER(BOILER_Maintain?.value || false);
            
            setMaintainSDV_3002(SDV_3002_Maintain?.value || false);

            
            setMaintainHEATER_2(HEATER_2_Maintain?.value || false);

            setMaintainHEATER_1(HEATER_1_Maintain?.value || false);


            setMaintainPUMP_2(PUMP_2_Maintain?.value || false);

            setMaintainPUMP_1(PUMP_1_Maintain?.value || false);

            setMaintainWater_LSW(Water_LSW_Maintain?.value || false);


            setMaintainWater_PG(Water_PG_Maintain?.value || false);

            setMaintainSDV_3001B(SDV_3001B_Maintain?.value || false);


            setMaintainSDV_3001A(SDV_3001A_Maintain?.value || false);

            setMaintainGD_3001(GD_3001_Maintain?.value || false);


            setMaintainTT_3002(TT_3002_Maintain?.value || false);




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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 

 // =================================================================================================================== 

 const [PIT_3001A, setPIT_3001A] = useState<string | null>(null);
 const [audioPlayingPIT_3001A, setAudioPlayingPIT_3001A] = useState(false);
 const [inputValuePIT_3001A, setInputValuePIT_3001A] = useState<any>();
 const [inputValue2PIT_3001A, setInputValue2PIT_3001A] = useState<any>();
 const [PIT_3001A_High, setPIT_3001A_High] = useState<number | null>(null);
 const [PIT_3001A_Low, setPIT_3001A_Low] = useState<number | null>(null);
 const [exceedThresholdPIT_3001A, setExceedThresholdPIT_3001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainPIT_3001A, setMaintainPIT_3001A] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof PIT_3001A_High === 'string' && typeof PIT_3001A_Low === 'string' && PIT_3001A !== null && maintainPIT_3001A === false
         ) {
             const highValue = parseFloat(PIT_3001A_High);
             const lowValue = parseFloat(PIT_3001A_Low);
             const PIT_3001AValue = parseFloat(PIT_3001A);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_3001AValue)) {
                 if (highValue <= PIT_3001AValue || PIT_3001AValue <= lowValue) {
                     if (!audioPlayingPIT_3001A) {
                         audioRef.current?.play();
                         setAudioPlayingPIT_3001A(true);
                         setExceedThresholdPIT_3001A(true);
                     }
                 } else {
                     setAudioPlayingPIT_3001A(false);
                     setExceedThresholdPIT_3001A(false);
                 }
             } 
         } 
     }, [PIT_3001A_High, PIT_3001A, audioPlayingPIT_3001A, PIT_3001A_Low,maintainPIT_3001A]);
 
     useEffect(() => {
         if (audioPlayingPIT_3001A) {
             const audioEnded = () => {
                 setAudioPlayingPIT_3001A(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingPIT_3001A]);
 
     const handleInputChangePIT_3001A = (event: any) => {
         const newValue = event.target.value;
         setInputValuePIT_3001A(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2PIT_3001A(newValue2);
     };
     const ChangeMaintainPIT_3001A = async () => {
         try {
             const newValue = !maintainPIT_3001A;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                 { PIT_3001A_Maintain: newValue }
             );
             setMaintainPIT_3001A(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [PIT_3001B, setPIT_3001B] = useState<string | null>(null);
      const [audioPlayingPIT_3001B, setAudioPlayingPIT_3001B] = useState(false);
      const [inputValuePIT_3001B, setInputValuePIT_3001B] = useState<any>();
      const [inputValue2PIT_3001B, setInputValue2PIT_3001B] = useState<any>();
      const [PIT_3001B_High, setPIT_3001B_High] = useState<number | null>(null);
      const [PIT_3001B_Low, setPIT_3001B_Low] = useState<number | null>(null);
      const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPIT_3001B, setMaintainPIT_3001B] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PIT_3001B_High === 'string' && typeof PIT_3001B_Low === 'string' && PIT_3001B !== null && maintainPIT_3001B === false
              ) {
                  const highValue = parseFloat(PIT_3001B_High);
                  const lowValue = parseFloat(PIT_3001B_Low);
                  const PIT_3001BValue = parseFloat(PIT_3001B);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_3001BValue)) {
                      if (highValue <= PIT_3001BValue || PIT_3001BValue <= lowValue) {
                          if (!audioPlayingPIT_3001B) {
                              audioRef.current?.play();
                              setAudioPlayingPIT_3001B(true);
                              setExceedThreshold302(true);
                          }
                      } else {
                         setAudioPlayingPIT_3001B(false);
                          setExceedThreshold302(false);
                      }
                  } 
              } 
          }, [PIT_3001B_High, PIT_3001B, audioPlayingPIT_3001B, PIT_3001B_Low,maintainPIT_3001B]);
      
          useEffect(() => {
              if (audioPlayingPIT_3001B) {
                  const audioEnded = () => {
                     setAudioPlayingPIT_3001B(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPIT_3001B]);
      
          const handleInputChangePIT_3001B = (event: any) => {
              const newValue = event.target.value;
              setInputValuePIT_3001B(newValue);
          };
      
          const handleInputChange2PIT_3001B = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PIT_3001B(newValue2);
          };
          const ChangeMaintainPIT_3001B = async () => {
              try {
                  const newValue = !maintainPIT_3001B;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                      { PIT_3001B_Maintain: newValue }
                  );
                  setMaintainPIT_3001B(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
      const [PT_3001, setPT_3001] = useState<string | null>(null);
      const [audioPlayingPT_3001, setAudioPlayingPT_3001] = useState(false);
      const [inputValuePT_3001, setInputValuePT_3001] = useState<any>();
      const [inputValue2PT_3001, setInputValue2PT_3001] = useState<any>();
      const [PT_3001_High, setPT_3001_High] = useState<number | null>(null);
      const [PT_3001_Low, setPT_3001_Low] = useState<number | null>(null);
      const [exceedThresholdPT_3001, setExceedThresholdPT_3001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPT_3001, setMaintainPT_3001] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PT_3001_High === 'string' && typeof PT_3001_Low === 'string' && PT_3001 !== null && maintainPT_3001 === false
              ) {
                  const highValue = parseFloat(PT_3001_High);
                  const lowValue = parseFloat(PT_3001_Low);
                  const PT_3001Value = parseFloat(PT_3001);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_3001Value)) {
                      if (highValue <= PT_3001Value || PT_3001Value <= lowValue) {
                          if (!audioPlayingPT_3001) {
                              audioRef.current?.play();
                              setAudioPlayingPT_3001(true);
                              setExceedThresholdPT_3001(true);
                          }
                      } else {
                         setAudioPlayingPT_3001(false);
                         setExceedThresholdPT_3001(false);
                      }
                  } 
              } 
          }, [PT_3001_High, PT_3001, audioPlayingPT_3001, PT_3001_Low,maintainPT_3001]);
      
          useEffect(() => {
              if (audioPlayingPT_3001) {
                  const audioEnded = () => {
                     setAudioPlayingPT_3001(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPT_3001]);
      
          const handleInputChangePT_3001 = (event: any) => {
              const newValue = event.target.value;
              setInputValuePT_3001(newValue);
          };
      
          const handleInputChange2PT_3001 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PT_3001(newValue2);
          };
          const ChangeMaintainPT_3001 = async () => {
              try {
                  const newValue = !maintainPT_3001;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                      { PT_3001_Maintain: newValue }
                  );
                  setMaintainPT_3001(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
 
           const [PT_3002, setPT_3002] = useState<string | null>(null);
           const [audioPlayingPT_3002, setAudioPlayingPT_3002] = useState(false);
           const [inputValuePT_3002, setInputValuePT_3002] = useState<any>();
           const [inputValue2PT_3002, setInputValue2PT_3002] = useState<any>();
           const [PT_3002_High, setPT_3002_High] = useState<number | null>(null);
           const [PT_3002_Low, setPT_3002_Low] = useState<number | null>(null);
           const [exceedThresholdPT_3002, setExceedThresholdPT_3002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPT_3002, setMaintainPT_3002] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PT_3002_High === 'string' && typeof PT_3002_Low === 'string' && PT_3002 !== null && maintainPT_3002 === false
                   ) {
                       const highValue = parseFloat(PT_3002_High);
                       const lowValue = parseFloat(PT_3002_Low);
                       const PT_3002Value = parseFloat(PT_3002);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_3002Value)) {
                           if (highValue <= PT_3002Value || PT_3002Value <= lowValue) {
                               if (!audioPlayingPT_3002) {
                                   audioRef.current?.play();
                                   setAudioPlayingPT_3002(true);
                                   setExceedThresholdPT_3002(true);
                               }
                           } else {
                              setAudioPlayingPT_3002(false);
                              setExceedThresholdPT_3002(false);
                           }
                       } 
                   } 
               }, [PT_3002_High, PT_3002, audioPlayingPT_3002, PT_3002_Low,maintainPT_3002]);
           
               useEffect(() => {
                   if (audioPlayingPT_3002) {
                       const audioEnded = () => {
                          setAudioPlayingPT_3002(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPT_3002]);
           
               const handleInputChangePT_3002 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePT_3002(newValue);
               };
           
               const handleInputChange2PT_3002 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PT_3002(newValue2);
               };
               const ChangeMaintainPT_3002 = async () => {
                   try {
                       const newValue = !maintainPT_3002;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { PT_3002_Maintain: newValue }
                       );
                       setMaintainPT_3002(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [PT_3003, setPT_3003] = useState<string | null>(null);
           const [audioPlayingPT_3003, setAudioPlayingPT_3003] = useState(false);
           const [inputValuePT_3003, setInputValuePT_3003] = useState<any>();
           const [inputValue2PT_3003, setInputValue2PT_3003] = useState<any>();
           const [PT_3003_High, setPT_3003_High] = useState<number | null>(null);
           const [PT_3003_Low, setPT_3003_Low] = useState<number | null>(null);
           const [exceedThresholdPT_3003, setExceedThresholdPT_3003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPT_3003, setMaintainPT_3003] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PT_3003_High === 'string' && typeof PT_3003_Low === 'string' && PT_3003 !== null && maintainPT_3003 === false
                   ) {
                       const highValue = parseFloat(PT_3003_High);
                       const lowValue = parseFloat(PT_3003_Low);
                       const PT_3003Value = parseFloat(PT_3003);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_3003Value)) {
                           if (highValue <= PT_3003Value || PT_3003Value <= lowValue) {
                               if (!audioPlayingPT_3003) {
                                   audioRef.current?.play();
                                   setAudioPlayingPT_3003(true);
                                   setExceedThresholdPT_3003(true);
                               }
                           } else {
                              setAudioPlayingPT_3003(false);
                              setExceedThresholdPT_3003(false);
                           }
                       } 
                   } 
               }, [PT_3003_High, PT_3003, audioPlayingPT_3003 , PT_3003_Low,maintainPT_3003]);
           
               useEffect(() => {
                   if (audioPlayingPT_3003) {
                       const audioEnded = () => {
                          setAudioPlayingPT_3003(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPT_3003]);
           
               const handleInputChangePT_3003 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePT_3003(newValue);
               };
           
               const handleInputChange2PT_3003 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PT_3003(newValue2);
               };
               const ChangeMaintainPT_3003 = async () => {
                   try {
                       const newValue = !maintainPT_3003;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { PT_3003_Maintain: newValue }
                       );
                       setMaintainPT_3003(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TT_3001, setTT_3001] = useState<string | null>(null);
           const [audioPlayingTT_3001, setAudioPlayingTT_3001] = useState(false);
           const [inputValueTT_3001, setInputValueTT_3001] = useState<any>();
           const [inputValue2TT_3001, setInputValue2TT_3001] = useState<any>();
           const [TT_3001_High, setTT_3001_High] = useState<number | null>(null);
           const [TT_3001_Low, setTT_3001_Low] = useState<number | null>(null);
           const [exceedThresholdTT_3001, setExceedThresholdTT_3001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTT_3001, setMaintainTT_3001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TT_3001_High === 'string' && typeof TT_3001_Low === 'string' && TT_3001 !== null && maintainTT_3001 === false
                   ) {
                       const highValue = parseFloat(TT_3001_High);
                       const lowValue = parseFloat(TT_3001_Low);
                       const TT_3001Value = parseFloat(TT_3001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_3001Value)) {
                           if (highValue <= TT_3001Value || TT_3001Value <= lowValue) {
                               if (!audioPlayingTT_3001) {
                                   audioRef.current?.play();
                                   setAudioPlayingTT_3001(true);
                                   setExceedThresholdTT_3001(true);
                               }
                           } else {
                              setAudioPlayingTT_3001(false);
                              setExceedThresholdTT_3001(false);
                           }
                       } 
                   } 
               }, [TT_3001_High, TT_3001, audioPlayingTT_3001, TT_3001_Low,maintainTT_3001]);
           
               useEffect(() => {
                   if (audioPlayingTT_3001) {
                       const audioEnded = () => {
                          setAudioPlayingTT_3001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTT_3001]);
           
               const handleInputChangeTT_3001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTT_3001(newValue);
               };
           
               const handleInputChange2TT_3001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TT_3001(newValue2);
               };
               const ChangeMaintainTT_3001 = async () => {
                   try {
                       const newValue = !maintainTT_3001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { TT_3001_Maintain: newValue }
                       );
                       setMaintainTT_3001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [GD_3001, setGD_3001] = useState<string | null>(null);
           const [audioPlayingGD_3001, setAudioPlayingGD_3001] = useState(false);
           const [inputValueGD_3001, setInputValueGD_3001] = useState<any>();
           const [inputValue2GD_3001, setInputValue2GD_3001] = useState<any>();
           const [GD_3001_High, setGD_3001_High] = useState<number | null>(null);
           const [GD_3001_Low, setGD_3001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_3001, setExceedThresholdGD_3001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainGD_3001, setMaintainGD_3001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof GD_3001_High === 'string' && typeof GD_3001_Low === 'string' && GD_3001 !== null && maintainGD_3001 === false
                   ) {
                       const highValue = parseFloat(GD_3001_High);
                       const lowValue = parseFloat(GD_3001_Low);
                       const GD_3001Value = parseFloat(GD_3001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_3001Value)) {
                           if (highValue <= GD_3001Value || GD_3001Value <= lowValue) {
                               if (!audioPlayingGD_3001) {
                                   audioRef.current?.play();
                                   setAudioPlayingGD_3001(true);
                                   setExceedThresholdGD_3001(true);
                               }
                           } else {
                              setAudioPlayingGD_3001(false);
                              setExceedThresholdGD_3001(false);
                           }
                       } 
                   } 
               }, [GD_3001_High, GD_3001, audioPlayingGD_3001, GD_3001_Low,maintainGD_3001]);
           
               useEffect(() => {
                   if (audioPlayingGD_3001) {
                       const audioEnded = () => {
                          setAudioPlayingGD_3001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingGD_3001]);
           
               const handleInputChangeGD_3001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueGD_3001(newValue);
               };
           
               const handleInputChange2GD_3001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2GD_3001(newValue2);
               };
               const ChangeMaintainGD_3001 = async () => {
                   try {
                       const newValue = !maintainGD_3001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { GD_3001_Maintain: newValue }
                       );
                       setMaintainGD_3001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TT_3002, setTT_3002] = useState<string | null>(null);
           const [audioPlayingTT_3002, setAudioPlayingTT_3002] = useState(false);
           const [inputValueTT_3002, setInputValueTT_3002] = useState<any>();
           const [inputValue2TT_3002, setInputValue2TT_3002] = useState<any>();
           const [TT_3002_High, setTT_3002_High] = useState<number | null>(null);
           const [TT_3002_Low, setTT_3002_Low] = useState<number | null>(null);
           const [exceedThresholdTT_3002, setExceedThresholdTT_3002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTT_3002, setMaintainTT_3002] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TT_3002_High === 'string' && typeof TT_3002_Low === 'string' && TT_3002 !== null && maintainTT_3002 === false
                   ) {
                       const highValue = parseFloat(TT_3002_High);
                       const lowValue = parseFloat(TT_3002_Low);
                       const TT_3002Value = parseFloat(TT_3002);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_3002Value)) {
                           if (highValue <= TT_3002Value || TT_3002Value <= lowValue) {
                               if (!audioPlayingTT_3002) {
                                   audioRef.current?.play();
                                   setAudioPlayingTT_3002(true);
                                   setExceedThresholdTT_3002(true);
                               }
                           } else {
                              setAudioPlayingTT_3002(false);
                              setExceedThresholdTT_3002(false);
                           }
                       } 
                   } 
               }, [TT_3002_High, TT_3002, audioPlayingTT_3002, TT_3002_Low,maintainTT_3002]);
           
               useEffect(() => {
                   if (audioPlayingTT_3002) {
                       const audioEnded = () => {
                          setAudioPlayingTT_3002(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTT_3002]);
           
               const handleInputChangeTT_3002 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTT_3002(newValue);
               };
           
               const handleInputChange2TT_3002 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TT_3002(newValue2);
               };
               const ChangeMaintainTT_3002 = async () => {
                   try {
                       const newValue = !maintainTT_3002;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { TT_3002_Maintain: newValue }
                       );
                       setMaintainTT_3002(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [SDV_3001A, setSDV_3001A] = useState<string | null>(null);
           const [audioPlayingSDV_3001A, setAudioPlayingSDV_3001A] = useState(false);
           const [inputValueSDV_3001A, setInputValueSDV_3001A] = useState<any>();
           const [inputValue2SDV_3001A, setInputValue2SDV_3001A] = useState<any>();
           const [SDV_3001A_High, setSDV_3001A_High] = useState<number | null>(null);
           const [SDV_3001A_Low, setSDV_3001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_3001A, setExceedThresholdSDV_3001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainSDV_3001A, setMaintainSDV_3001A] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof SDV_3001A_High === 'string' && typeof SDV_3001A_Low === 'string' && SDV_3001A !== null && maintainSDV_3001A === false
                   ) {
                       const highValue = parseFloat(SDV_3001A_High);
                       const lowValue = parseFloat(SDV_3001A_Low);
                       const SDV_3001AValue = parseFloat(SDV_3001A);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_3001AValue)) {
                           if (highValue <= SDV_3001AValue || SDV_3001AValue <= lowValue) {
                               if (!audioPlayingSDV_3001A) {
                                   audioRef.current?.play();
                                   setAudioPlayingSDV_3001A(true);
                                   setExceedThresholdSDV_3001A(true);
                               }
                           } else {
                              setAudioPlayingSDV_3001A(false);
                              setExceedThresholdSDV_3001A(false);
                           }
                       } 
                   } 
               }, [SDV_3001A_High, SDV_3001A, audioPlayingSDV_3001A, SDV_3001A_Low,maintainSDV_3001A]);
           
               useEffect(() => {
                   if (audioPlayingSDV_3001A) {
                       const audioEnded = () => {
                          setAudioPlayingSDV_3001A(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingSDV_3001A]);
           
               const handleInputChangeSDV_3001A = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueSDV_3001A(newValue);
               };
           
               const handleInputChange2SDV_3001A = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2SDV_3001A(newValue2);
               };
               const ChangeMaintainSDV_3001A = async () => {
                   try {
                       const newValue = !maintainSDV_3001A;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                           { SDV_3001A_Maintain: newValue }
                       );
                       setMaintainSDV_3001A(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
     // =================================================================================================================== 
 
     const [SDV_3001B, setSDV_3001B] = useState<string | null>(null);
     const [audioPlayingSDV_3001B, setAudioPlayingSDV_3001B] = useState(false);
     const [inputValueSDV_3001B, setInputValueSDV_3001B] = useState<any>();
     const [inputValue2SDV_3001B, setInputValue2SDV_3001B] = useState<any>();
     const [SDV_3001B_High, setSDV_3001B_High] = useState<number | null>(null);
     const [SDV_3001B_Low, setSDV_3001B_Low] = useState<number | null>(null);
     const [exceedThresholdSDV_3001B, setExceedThresholdSDV_3001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainSDV_3001B, setMaintainSDV_3001B] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof SDV_3001B_High === 'string' && typeof SDV_3001B_Low === 'string' && SDV_3001B !== null && maintainSDV_3001B === false
             ) {
                 const highValue = parseFloat(SDV_3001B_High);
                 const lowValue = parseFloat(SDV_3001B_Low);
                 const SDV_3001BValue = parseFloat(SDV_3001B);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_3001BValue)) {
                     if (highValue <= SDV_3001BValue || SDV_3001BValue <= lowValue) {
                         if (!audioPlayingSDV_3001B) {
                             audioRef.current?.play();
                             setAudioPlayingSDV_3001B(true);
                             setExceedThresholdSDV_3001B(true);
                         }
                     } else {
                        setAudioPlayingSDV_3001B(false);
                        setExceedThresholdSDV_3001B(false);
                     }
                 } 
             } 
         }, [SDV_3001B_High, SDV_3001B, audioPlayingSDV_3001B, SDV_3001B_Low,maintainSDV_3001B]);
     
         useEffect(() => {
             if (audioPlayingSDV_3001B) {
                 const audioEnded = () => {
                    setAudioPlayingSDV_3001B(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingSDV_3001B]);
     
         const handleInputChangeSDV_3001B = (event: any) => {
             const newValue = event.target.value;
             setInputValueSDV_3001B(newValue);
         };
     
         const handleInputChange2SDV_3001B = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2SDV_3001B(newValue2);
         };
         const ChangeMaintainSDV_3001B = async () => {
             try {
                 const newValue = !maintainSDV_3001B;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                     { SDV_3001B_Maintain: newValue }
                 );
                 setMaintainSDV_3001B(newValue);
                 
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
                         `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
             `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setMaintainHEATER_2(newValue);
         
     } catch (error) {}
 };
 
 
 // =================================================================================================================== 
 
 
         // =================================================================================================================== 
 
         const [SDV_3002, setSDV_3002] = useState<string | null>(null);
         const [audioPlayingSDV_3002, setAudioPlayingSDV_3002] = useState(false);
         const [inputValueSDV_3002, setInputValueSDV_3002] = useState<any>();
         const [inputValue2SDV_3002, setInputValue2SDV_3002] = useState<any>();
         const [SDV_3002_High, setSDV_3002_High] = useState<number | null>(null);
         const [SDV_3002_Low, setSDV_3002_Low] = useState<number | null>(null);
         const [exceedThresholdSDV_3002, setExceedThresholdSDV_3002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainSDV_3002, setMaintainSDV_3002] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof SDV_3002_High === 'string' && typeof SDV_3002_Low === 'string' && SDV_3002 !== null && maintainSDV_3002 === false
                 ) {
                     const highValue = parseFloat(SDV_3002_High);
                     const lowValue = parseFloat(SDV_3002_Low);
                     const SDV_3002Value = parseFloat(SDV_3002);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_3002Value)) {
                         if (highValue <= SDV_3002Value || SDV_3002Value <= lowValue) {
                             if (!audioPlayingSDV_3002) {
                                 audioRef.current?.play();
                                 setAudioPlayingSDV_3002(true);
                                 setExceedThresholdSDV_3002(true);
                             }
                         } else {
                            setAudioPlayingSDV_3002(false);
                            setExceedThresholdSDV_3002(false);
                         }
                     } 
                 } 
             }, [SDV_3002_High, SDV_3002, audioPlayingSDV_3002, SDV_3002_Low,maintainSDV_3002]);
         
             useEffect(() => {
                 if (audioPlayingSDV_3002) {
                     const audioEnded = () => {
                        setAudioPlayingSDV_3002(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingSDV_3002]);
         
             const handleInputChangeSDV_3002 = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueSDV_3002(newValue);
             };
         
             const handleInputChange2SDV_3002 = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2SDV_3002(newValue2);
             };
             const ChangeMaintainSDV_3002 = async () => {
                 try {
                     const newValue = !maintainSDV_3002;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                         { SDV_3002_Maintain: newValue }
                     );
                     setMaintainSDV_3002(newValue);
                     
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
                         `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                     { GD_STATUS_Maintain: newValue }
                 );
                 setMaintainGD_STATUS(newValue);
                 
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
                         `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                         `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                         { SD_Maintain: newValue }
                     );
                     setMaintainSD(newValue);
                     
                 } catch (error) {}
             };
    
    
         // =================================================================================================================== 
    
    
    
              const [ESD_3001, setESD_3001] = useState<string | null>(null);
              const [audioPlayingESD_3001, setAudioPlayingESD_3001] = useState(false);
              const [inputValueESD_3001, setInputValueESD_3001] = useState<any>();
              const [inputValue2ESD_3001, setInputValue2ESD_3001] = useState<any>();
              const [ESD_3001_High, setESD_3001_High] = useState<number | null>(null);
              const [ESD_3001_Low, setESD_3001_Low] = useState<number | null>(null);
              const [exceedThresholdESD_3001, setExceedThresholdESD_3001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainESD_3001, setMaintainESD_3001] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof ESD_3001_High === 'string' && typeof ESD_3001_Low === 'string' && ESD_3001 !== null && maintainESD_3001 === false
                      ) {
                          const highValue = parseFloat(ESD_3001_High);
                          const lowValue = parseFloat(ESD_3001_Low);
                          const ESD_3001Value = parseFloat(ESD_3001);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESD_3001Value)) {
                              if (highValue <= ESD_3001Value || ESD_3001Value <= lowValue) {
                                  if (!audioPlayingESD_3001) {
                                      audioRef.current?.play();
                                      setAudioPlayingESD_3001(true);
                                      setExceedThresholdESD_3001(true);
                                  }
                              } else {
                                 setAudioPlayingESD_3001(false);
                                 setExceedThresholdESD_3001(false);
                              }
                          } 
                      } 
                  }, [ESD_3001_High, ESD_3001, audioPlayingESD_3001, ESD_3001_Low,maintainESD_3001]);
              
                  useEffect(() => {
                      if (audioPlayingESD_3001) {
                          const audioEnded = () => {
                             setAudioPlayingESD_3001(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingESD_3001]);
              
                  const handleInputChangeESD_3001 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueESD_3001(newValue);
                  };
              
                  const handleInputChange2ESD_3001 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2ESD_3001(newValue2);
                  };
                  const ChangeMaintainESD_3001 = async () => {
                      try {
                          const newValue = !maintainESD_3001;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                              { ESD_3001_Maintain: newValue }
                          );
                          setMaintainESD_3001(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
    
              const [SD_3001, setSD_3001] = useState<string | null>(null);
              const [audioPlayingSD_3001, setAudioPlayingSD_3001] = useState(false);
              const [inputValueSD_3001, setInputValueSD_3001] = useState<any>();
              const [inputValue2SD_3001, setInputValue2SD_3001] = useState<any>();
              const [SD_3001_High, setSD_3001_High] = useState<number | null>(null);
              const [SD_3001_Low, setSD_3001_Low] = useState<number | null>(null);
              const [exceedThresholdSD_3001, setExceedThresholdSD_3001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainSD_3001, setMaintainSD_3001] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof SD_3001_High === 'string' && typeof SD_3001_Low === 'string' && SD_3001 !== null && maintainSD_3001 === false
                      ) {
                          const highValue = parseFloat(SD_3001_High);
                          const lowValue = parseFloat(SD_3001_Low);
                          const SD_3001Value = parseFloat(SD_3001);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SD_3001Value)) {
                              if (highValue <= SD_3001Value || SD_3001Value <= lowValue) {
                                  if (!audioPlayingSD_3001) {
                                      audioRef.current?.play();
                                      setAudioPlayingSD_3001(true);
                                      setExceedThresholdSD_3001(true);
                                  }
                              } else {
                                 setAudioPlayingSD_3001(false);
                                 setExceedThresholdSD_3001(false);
                              }
                          } 
                      } 
                  }, [SD_3001_High, SD_3001, audioPlayingSD_3001 , SD_3001_Low,maintainSD_3001]);
              
                  useEffect(() => {
                      if (audioPlayingSD_3001) {
                          const audioEnded = () => {
                             setAudioPlayingSD_3001(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingSD_3001]);
              
                  const handleInputChangeSD_3001 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueSD_3001(newValue);
                  };
              
                  const handleInputChange2SD_3001 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2SD_3001(newValue2);
                  };
                  const ChangeMaintainSD_3001 = async () => {
                      try {
                          const newValue = !maintainSD_3001;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                              { SD_3001_Maintain: newValue }
                          );
                          setMaintainSD_3001(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
              const [SD_3002, setSD_3002] = useState<string | null>(null);
              const [audioPlayingSD_3002, setAudioPlayingSD_3002] = useState(false);
              const [inputValueSD_3002, setInputValueSD_3002] = useState<any>();
              const [inputValue2SD_3002, setInputValue2SD_3002] = useState<any>();
              const [SD_3002_High, setSD_3002_High] = useState<number | null>(null);
              const [SD_3002_Low, setSD_3002_Low] = useState<number | null>(null);
              const [exceedThresholdSD_3002, setExceedThresholdSD_3002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainSD_3002, setMaintainSD_3002] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof SD_3002_High === 'string' && typeof SD_3002_Low === 'string' && SD_3002 !== null && maintainSD_3002 === false
                      ) {
                          const highValue = parseFloat(SD_3002_High);
                          const lowValue = parseFloat(SD_3002_Low);
                          const SD_3002Value = parseFloat(SD_3002);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SD_3002Value)) {
                              if (highValue <= SD_3002Value || SD_3002Value <= lowValue) {
                                  if (!audioPlayingSD_3002) {
                                      audioRef.current?.play();
                                      setAudioPlayingSD_3002(true);
                                      setExceedThresholdSD_3002(true);
                                  }
                              } else {
                                 setAudioPlayingSD_3002(false);
                                 setExceedThresholdSD_3002(false);
                              }
                          } 
                      } 
                  }, [SD_3002_High, SD_3002, audioPlayingSD_3002, SD_3002_Low,maintainSD_3002]);
              
                  useEffect(() => {
                      if (audioPlayingSD_3002) {
                          const audioEnded = () => {
                             setAudioPlayingSD_3002(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingSD_3002]);
              
                  const handleInputChangeSD_3002 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueSD_3002(newValue);
                  };
              
                  const handleInputChange2SD_3002 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2SD_3002(newValue2);
                  };
                  const ChangeMaintainSD_3002 = async () => {
                      try {
                          const newValue = !maintainSD_3002;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                              { SD_3002_Maintain: newValue }
                          );
                          setMaintainSD_3002(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
         
         
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,



                {
                    
                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,


                    ESD_3001_High: inputValueESD_3001,ESD_3001_Low:inputValue2ESD_3001,
                    SD_3001_High: inputValueSD_3001,SD_3001_Low:inputValue2SD_3001,
                    SD_3002_High: inputValueSD_3002,SD_3002_Low:inputValue2SD_3002,

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







                    PIT_3001B_High: inputValuePIT_3001B,PIT_3001B_Low:inputValue2PIT_3001B,
                    PT_3001_High: inputValuePT_3001,PT_3001_Low:inputValue2PT_3001,
                    PIT_3001A_High: inputValuePIT_3001A,PIT_3001A_Low:inputValue2PIT_3001A,


                    PT_3002_High: inputValuePT_3002,PT_3002_Low:inputValue2PT_3002,
                    PT_3003_High: inputValuePT_3003,PT_3003_Low:inputValue2PT_3003,
                    TT_3001_High: inputValueTT_3001,TT_3001_Low:inputValue2TT_3001,

                    TT_3002_High: inputValueTT_3002,TT_3002_Low:inputValue2TT_3002,
                    GD_3001_High: inputValueGD_3001,GD_3001_Low:inputValue2GD_3001,


                    SDV_3001B_High: inputValueSDV_3001B,SDV_3001B_Low:inputValue2SDV_3001B,
                    SDV_3001A_High: inputValueSDV_3001A,SDV_3001A_Low:inputValue2SDV_3001A,


                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,

                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,


                    SDV_3002_High: inputValueSDV_3002,SDV_3002_Low:inputValue2SDV_3002,
                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,
                    IOT_Gateway_Phone: inputGetwayPhone,
                    PCV_3001A: inputPCV_3001A,
                    PCV_3001B: inputPCV_3001B,

                    PCV_3002A: inputPCV_3002A,
                    PCV_3002B: inputPCV_3002B,

                    PSV_3001A: inputPSV_3001A,
                    PSV_3001B: inputPSV_3001B,

                    PSV_3002A: inputPSV_3002A,
                    PSV_3002B: inputPSV_3002B,

                    EVC_01_Battery_Expiration_Date: timeEVC_01,
                    EVC_01_Battery_Installation_Date: timeEVC_02,
                    EVC_02_Battery_Expiration_Date: timeEVC_03,
                    EVC_02_Battery_Installation_Date: timeEVC_04,
                }
            );
            setPCV_3001A(inputPCV_3001A)
            setPCV_3001B(inputPCV_3001B)
            setPCV_3002A(inputPCV_3002A)
            setPCV_3002B(inputPCV_3002B)

            setPSV_3001A(inputPSV_3001A)
            setPSV_3001B(inputPSV_3001B)
            setPSV_3002A(inputPSV_3002A)
            setPSV_3002B(inputPSV_3002B)
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setESD_3001_High(inputValueESD_3001);
            setESD_3001_Low(inputValue2ESD_3001);

            setSD_3001_High(inputValueSD_3001);
            setSD_3001_Low(inputValue2SD_3001);

            setSD_3002_High(inputValueSD_3002);
            setSD_3002_Low(inputValue2SD_3002);

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


          

    

    


            setPIT_3001B_High(inputValuePIT_3001B);
            setPIT_3001B_Low(inputValue2PIT_3001B);

            setPT_3001_High(inputValuePT_3001);
            setPT_3001_Low(inputValue2PT_3001);

            setPT_3001_High(inputValuePT_3001);
            setPT_3001_Low(inputValue2PT_3001);

            setPT_3002_High(inputValuePT_3002);
            setPT_3002_Low(inputValue2PT_3002);

            setPT_3003_High(inputValuePT_3003);
            setPT_3003_Low(inputValue2PT_3003);

            setTT_3001_High(inputValueTT_3001);
            setTT_3001_Low(inputValue2TT_3001);




            setTT_3002_High(inputValueTT_3002);
            setTT_3002_Low(inputValue2TT_3002);

            setGD_3001_High(inputValueGD_3001);
            setGD_3001_Low(inputValue2GD_3001);

            setSDV_3001B_High(inputValueSDV_3001B);
            setSDV_3001B_Low(inputValue2SDV_3001B);

            setSDV_3001A_High(inputValueSDV_3001A);
            setSDV_3001A_Low(inputValue2SDV_3001A);


            setWater_LSW_High(inputValueWater_LSW);
            setWater_LSW_Low(inputValue2Water_LSW);

            setWater_PG_High(inputValueWater_PG);
            setWater_PG_Low(inputValue2Water_PG);

            setPUMP_1_High(inputValuePUMP_1);
            setPUMP_1_Low(inputValue2PUMP_1);

            setPUMP_2_High(inputValuePUMP_2);
            setPUMP_2_Low(inputValue2PUMP_2);



            setSDV_3002_High(inputValueSDV_3002);
            setSDV_3002_Low(inputValue2SDV_3002);

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
        setInputGetwayPhone(getWayPhoneOTSUKA)
        setInputPCV_3001A(PCV_3001A)
        setInputPCV_3001B(PCV_3001B)
        setInputPCV_3002A(PCV_3002A)
        setInputPCV_3002B(PCV_3002B)


        setInputPSV_3001A(PSV_3001A)
        setInputPSV_3001B(PSV_3001B)
        setInputPSV_3002A(PSV_3002A)
        setInputPSV_3002B(PSV_3002B)
   
        setInputValueHR_BC(HR_BC_High); 
        setInputValue2HR_BC(HR_BC_Low); 

        setInputValueSD(SD_High); 
        setInputValue2SD(SD_Low); 

        setInputValueESD_3001(ESD_3001_High); 
        setInputValue2ESD_3001(ESD_3001_Low); 

        setInputValueSD_3001(SD_3001_High); 
        setInputValue2SD_3001(SD_3001_Low); 

        setInputValueSD_3002(SD_3002_High); 
        setInputValue2SD_3002(SD_3002_Low); 


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




     






        setInputValuePIT_3001A(PIT_3001A_High); 
        setInputValue2PIT_3001A(PIT_3001A_Low); 

        setInputValuePIT_3001B(PIT_3001B_High); 
        setInputValue2PIT_3001B(PIT_3001B_Low); 

        setInputValuePT_3001(PT_3001_High); 
        setInputValue2PT_3001(PT_3001_Low); 



        setInputValuePT_3003(PT_3003_High); 
        setInputValue2PT_3003(PT_3003_Low); 

        setInputValueTT_3001(TT_3001_High); 
        setInputValue2TT_3001(TT_3001_Low); 

        setInputValuePT_3002(PT_3002_High); 
        setInputValue2PT_3002(PT_3002_Low); 
        

        setInputValueTT_3002(TT_3002_High); 
        setInputValue2TT_3002(TT_3002_Low); 

        setInputValueGD_3001(GD_3001_High); 
        setInputValue2GD_3001(GD_3001_Low); 



        setInputValueSDV_3001A(SDV_3001A_High); 
        setInputValue2SDV_3001A(SDV_3001A_Low); 

        setInputValueSDV_3001B(SDV_3001B_High); 
        setInputValue2SDV_3001B(SDV_3001B_Low); 

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


        setInputValueSDV_3002(SDV_3002_High); 
        setInputValue2SDV_3002(SDV_3002_Low); 


        setInputValueBOILER(BOILER_High); 
        setInputValue2BOILER(BOILER_Low); 

        setInputValueGD_STATUS(GD_STATUS_High); 
        setInputValue2GD_STATUS(GD_STATUS_Low); 

    }, [
        getWayPhoneOTSUKA,
        
        HR_BC_High, HR_BC_Low 
        ,SD_High, SD_Low ,


        SD_3001_High,SD_3001_Low,
         SD_3002_High,SD_3002_Low ,
          ESD_3001_High,ESD_3001_Low,
        
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





           PIT_3001A_High, PIT_3001A_Low ,
        PIT_3001B_High, PIT_3001B_Low 
        ,PT_3001_High, PT_3001_Low ,


        PT_3003_High,PT_3003_Low,
         TT_3001_High,TT_3001_Low ,
          PT_3002_High,PT_3002_Low,

          TT_3002_High,TT_3002_Low,
          GD_3001_High,GD_3001_Low ,
        
           SDV_3001A_High,SDV_3001A_Low,
           SDV_3001B_High,SDV_3001B_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,


           SDV_3002_High,SDV_3002_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,

           PCV_3001A,
           PCV_3001B,
           PCV_3002A,
           PCV_3002B,

           PSV_3001A,
           PSV_3001B,
           PSV_3002A,
           PSV_3002B,

           timeEVC_01,timeEVC_02
        ]);


        
    const combineCss = {



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


        CSSESD_3001 : {
            color:exceedThresholdESD_3001 && !maintainESD_3001
            ? "#ff5656"
            : maintainESD_3001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSSD_3001 : {
            color:exceedThresholdSD_3001 && !maintainSD_3001
            ? "#ff5656"
            : maintainSD_3001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSSD_3002 : {
            color:exceedThresholdSD_3002 && !maintainSD_3002
            ? "#ff5656"
            : maintainSD_3002
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





     
      

  
       
        CSSPIT_3001A : {
            color:exceedThresholdPIT_3001A && !maintainPIT_3001A
            ? "#ff5656"
            : maintainPIT_3001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPIT_3001B : {
            color:exceedThreshold302 && !maintainPIT_3001B
            ? "#ff5656"
            : maintainPIT_3001B
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPT_3001 : {
            color:exceedThresholdPT_3001 && !maintainPT_3001
            ? "#ff5656"
            : maintainPT_3001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPT_3002 : {
            color:exceedThresholdPT_3002 && !maintainPT_3002
            ? "#ff5656"
            : maintainPT_3002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPT_3003 : {
            color:exceedThresholdPT_3003 && !maintainPT_3003
            ? "#ff5656"
            : maintainPT_3003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSTT_3001 : {
            color:exceedThresholdTT_3001 && !maintainTT_3001
            ? "#ff5656"
            : maintainTT_3001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


     


        CSSTT_3002 : {
            color:exceedThresholdTT_3002 && !maintainTT_3002
            ? "#ff5656"
            : maintainTT_3002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD_3001 : {
            color:exceedThresholdGD_3001 && !maintainGD_3001
            ? "#ff5656"
            : maintainGD_3001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSSDV_3001A : {
            color:exceedThresholdSDV_3001A && !maintainSDV_3001A
            ? "#ff5656"
            : maintainSDV_3001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSSDV_3001B : {
            color:exceedThresholdSDV_3001B && !maintainSDV_3001B
            ? "#ff5656"
            : maintainSDV_3001B
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

        CSSSDV_3002 : {
            color:exceedThresholdSDV_3002 && !maintainSDV_3002
            ? "#ff5656"
            : maintainSDV_3002
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
    EVC01: 'EVC-01 -  Parameter & Configuration',
    EVC02: 'EVC-02 -  Parameter & Configuration',
    PLC: 'PLC -  Parameter & Configuration'
};

        const dataEVC01 = [
            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
    
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
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature} {nameValue.C}</span> , 
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
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
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
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
          name: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>Volume at Measurement Condition</span> ,
 
          modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40856	 </span> ,
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
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
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Vb of Current Day</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40862	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {EVC_01_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
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
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>Vm of Current Day</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40864	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {EVC_01_Vm_of_Current_Day} {nameValue.m3}</span> , 
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

 value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
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

  value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
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

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
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

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} . {nameValue.m3h}</span> , 
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

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.m3h}</span> , 
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

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.m3}</span> , 
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

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
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

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.m3}</span> , 
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
                
                timeUpdate: <span style={combineCss.CSSPIT_3001A} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_3001A}>Pressure Indicator Transmitter PIT-3001A</span> ,
    
             modbus: <span style={combineCss.CSSPIT_3001A}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPIT_3001A} > {PIT_3001A} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_3001A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_3001A} onChange={handleInputChangePIT_3001A} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_3001A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_3001A} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_3001A}
             checked={maintainPIT_3001A}
         ></Checkbox>
    
            },
    
         
            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPIT_3001B} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_3001B}>Pressure Indicator Transmitter PIT-3001B</span> ,
    
             modbus: <span style={combineCss.CSSPIT_3001B}>40003	 </span> ,
    
            value: <span style={combineCss.CSSPIT_3001B} > {PIT_3001B} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_3001B}   placeholder='High' step="0.1" type='number' value={inputValuePIT_3001B} onChange={handleInputChangePIT_3001B} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_3001B}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_3001B} onChange={handleInputChange2PIT_3001B} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_3001B}
             checked={maintainPIT_3001B}
         ></Checkbox>
    
            },
    
            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_3001} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_3001}>Pressure Transmitter PT-3001</span> ,
    
             modbus: <span style={combineCss.CSSPT_3001}>40005</span> ,
    
            value: <span style={combineCss.CSSPT_3001} > {PT_3001} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPT_3001}   placeholder='High' step="0.1" type='number' value={inputValuePT_3001} onChange={handleInputChangePT_3001} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPT_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_3001} onChange={handleInputChange2PT_3001} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_3001}
             checked={maintainPT_3001}
         ></Checkbox>
    
            },


            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_3002} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_3002}>Pressure Transmitter PT-3002</span> ,
    
             modbus: <span style={combineCss.CSSPT_3002}>40007	 </span> ,
    
            value: <span style={combineCss.CSSPT_3002} > {PT_3002} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPT_3002}   placeholder='High' step="0.1" type='number' value={inputValuePT_3002} onChange={handleInputChangePT_3002} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPT_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_3002} onChange={handleInputChange2PT_3002} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_3002}
             checked={maintainPT_3002}
         ></Checkbox>
    
            },

            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_3003} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPT_3003}>Pressure Transmitter PT-3003</span> ,
   
            modbus: <span style={combineCss.CSSPT_3003}>40009	 </span> ,
   
           value: <span style={combineCss.CSSPT_3003} > {PT_3003} {nameValue.BARG}</span> , 
            high: <InputText style={combineCss.CSSPT_3003}   placeholder='High' step="0.1" type='number' value={inputValuePT_3003} onChange={handleInputChangePT_3003} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSPT_3003}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_3003} onChange={handleInputChange2PT_3003} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainPT_3003}
            checked={maintainPT_3003}
        ></Checkbox>
   
           },


           {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTT_3001} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSTT_3001}>Temperature Transmitter TT-3001</span> ,
  
           modbus: <span style={combineCss.CSSTT_3001}>40011	 </span> ,
  
          value: <span style={combineCss.CSSTT_3001} > {TT_3001} {nameValue.C}</span> , 
           high: <InputText style={combineCss.CSSTT_3001}   placeholder='High' step="0.1" type='number' value={inputValueTT_3001} onChange={handleInputChangeTT_3001} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSTT_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_3001} onChange={handleInputChange2TT_3001} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainTT_3001}
           checked={maintainTT_3001}
       ></Checkbox>
  
          },





         {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTT_3002} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSTT_3002}>Temperature Transmitter TT-3002</span> ,

         modbus: <span style={combineCss.CSSTT_3002}>40013	 </span> ,

        value: <span style={combineCss.CSSTT_3002} > {TT_3002} {nameValue.C}</span> , 
         high: <InputText style={combineCss.CSSTT_3002}   placeholder='High' step="0.1" type='number' value={inputValueTT_3002} onChange={handleInputChangeTT_3002} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSTT_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_3002} onChange={handleInputChange2TT_3002} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainTT_3002}
         checked={maintainTT_3002}
     ></Checkbox>

        },


        {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSGD_3001} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_3001}>Gas Detector GD-3001</span> ,

        modbus: <span style={combineCss.CSSGD_3001}>40015	 </span> ,

       value: <span style={combineCss.CSSGD_3001} > {GD_3001} {nameValue.LEL}</span> , 
        high: <InputText style={combineCss.CSSGD_3001}   placeholder='High' step="0.1" type='number' value={inputValueGD_3001} onChange={handleInputChangeGD_3001} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSGD_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_3001} onChange={handleInputChange2GD_3001} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_3001}
        checked={maintainGD_3001}
    ></Checkbox>

       },



       {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3001A} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_3001A}>Shutdown Valve SDV-3001A</span> ,

       modbus: <span style={combineCss.CSSSDV_3001A}>40017	 </span> ,

      value: <span style={combineCss.CSSSDV_3001A} > {SDV_3001A}</span> , 
       high: <InputText style={combineCss.CSSSDV_3001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3001A} onChange={handleInputChangeSDV_3001A} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_3001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3001A} onChange={handleInputChange2SDV_3001A} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainSDV_3001A}
       checked={maintainSDV_3001A}
   ></Checkbox>

      },


      {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3001B} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_3001B}>Shutdown Valve SDV-3001B</span> ,

      modbus: <span style={combineCss.CSSSDV_3001B}>40019	 </span> ,

     value: <span style={combineCss.CSSSDV_3001B} > {SDV_3001B}</span> , 
      high: <InputText style={combineCss.CSSSDV_3001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3001B} onChange={handleInputChangeSDV_3001B} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_3001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3001B} onChange={handleInputChange2SDV_3001B} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainSDV_3001B}
      checked={maintainSDV_3001B}
  ></Checkbox>

     },
     {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3002} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSSDV_3002}>Shutdown Valve SDV-3002</span> ,
    
     modbus: <span style={combineCss.CSSSDV_3002}>40021	 </span> ,
    
    value: <span style={combineCss.CSSSDV_3002} > {SDV_3002}</span> , 
     high: <InputText style={combineCss.CSSSDV_3002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3002} onChange={handleInputChangeSDV_3002} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSSDV_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3002} onChange={handleInputChange2SDV_3002} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainSDV_3002}
     checked={maintainSDV_3002}
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
    
    timeUpdate: <span style={combineCss.CSSBOILER} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSBOILER}>Boiler</span> ,

  modbus: <span style={combineCss.CSSBOILER}>40035	 </span> ,

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

 modbus: <span style={combineCss.CSSGD_STATUS}>40037	 </span> ,

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
    
    timeUpdate: <span style={combineCss.CSSESD_3001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSESD_3001}> Emergency Shut ESD-3001</span> ,

modbus: <span style={combineCss.CSSESD_3001}>40039	 </span> ,

value: <span style={combineCss.CSSESD_3001} > {ESD_3001}</span> , 
high: <InputText style={combineCss.CSSESD_3001}   placeholder='High' step="0.1" type='number' value={inputValueESD_3001} onChange={handleInputChangeESD_3001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSESD_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD_3001} onChange={handleInputChange2ESD_3001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainESD_3001}
checked={maintainESD_3001}
></Checkbox>

},




{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,

modbus: <span style={combineCss.CSSHR_BC}>40041	 </span> ,

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
    
    timeUpdate: <span style={combineCss.CSSSD_3001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_3001}>Smoker Detector SD-3001</span> ,

modbus: <span style={combineCss.CSSSD_3001}>40043	 </span> ,

value: <span style={combineCss.CSSSD_3001} > {SD_3001}</span> , 
high: <InputText style={combineCss.CSSSD_3001}   placeholder='High' step="0.1" type='number' value={inputValueSD_3001} onChange={handleInputChangeSD_3001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_3001} onChange={handleInputChange2SD_3001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD_3001}
checked={maintainSD_3001}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD_3002} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_3002}> Smoker Detector SD-3002</span> ,

modbus: <span style={combineCss.CSSSD_3002}>40045	 </span> ,

value: <span style={combineCss.CSSSD_3002} > {SD_3002}</span> , 
high: <InputText style={combineCss.CSSSD_3002}   placeholder='High' step="0.1" type='number' value={inputValueSD_3002} onChange={handleInputChangeSD_3002} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_3002} onChange={handleInputChange2SD_3002} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD_3002}
checked={maintainSD_3002}
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
        const handleInputPCV_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_3001A(newValue);
        };
        const handleInputPCV_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_3001B(newValue);
        };
        const handleInputPCV_3002A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_3002A(newValue);
        };
        const handleInputPCV_3002B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_3002B(newValue);
        };
        const handleInputPSV_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_3001A(newValue);
        };
        const handleInputPSV_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_3001B(newValue);
        };
        const handleInputPSV_3002A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_3002A(newValue);
        };
        const handleInputPSV_3002B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_3002B(newValue);
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
             setTimeEVC_04(selectedDate.getTime());
    
            const expirationDate = new Date(selectedDate);
            expirationDate.setMonth(expirationDate.getMonth() + 18);
            setTimeEVC_03(expirationDate.getTime());
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 6001A ( BARG ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_3001A}
                        onChange={handleInputPCV_3001A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 6001B ( BARG ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_3001B}
                        onChange={handleInputPCV_3001B}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 6002A ( BARG ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_3002A}
                        onChange={handleInputPCV_3002A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 6002B ( BARG ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_3002B}
                        onChange={handleInputPCV_3002B}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 6001A ( Bar ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_3001A}
                        onChange={handleInputPSV_3001A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 6001B ( Bar ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_3001B}
                        onChange={handleInputPSV_3001B}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 6002A ( Bar ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_3002A}
                        onChange={handleInputPSV_3002A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 6002B ( Bar ) </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_3002B}
                        onChange={handleInputPSV_3002B}
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
                        value={date4}
                        onChange={handleDateChange2}
    
                        showTime={false}
                        inputId="timeEVC_04"
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
                        value={date3}
                        disabled
    
                        showTime={false}
                        inputId="timeEVC_03"
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10,marginTop:10  }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>CNG HUNG YEN</h2>

    <div style={{width:'100%' , borderRadius:5 }}>

        

    <DataTable  size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}    >
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
                <DataTable value={Configuration} size={"small"} selectionMode="single"
                
                columnResizeMode="expand"
                resizableColumns >
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
