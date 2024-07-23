import React, { useEffect, useRef, useState } from 'react'
import { id_CNG_BinhDuong } from '../../data-table-device/ID-DEVICE/IdDevice';
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
export default function SetUpdata_CNG_BINHDUONG() {

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



    const [PCV_2001A,setPCV_2001A] = useState<any>()
    const [inputPCV_2001A, setInputPCV_2001A] = useState<any>();

    const [PCV_2001B,setPCV_2001B] = useState<any>()
    const [inputPCV_2001B, setInputPCV_2001B] = useState<any>();

    const [PCV_2002A,setPCV_2002A] = useState<any>()
    const [inputPCV_2002A, setInputPCV_2002A] = useState<any>();

    const [PCV_2002B,setPCV_2002B] = useState<any>()
    const [inputPCV_2002B, setInputPCV_2002B] = useState<any>();


    const [PSV_2001A,setPSV_2001A] = useState<any>()
    const [inputPSV_2001A, setInputPSV_2001A] = useState<any>();

    const [PSV_2001B,setPSV_2001B] = useState<any>()
    const [inputPSV_2001B, setInputPSV_2001B] = useState<any>();

    const [PSV_2002A,setPSV_2002A] = useState<any>()
    const [inputPSV_2002A, setInputPSV_2002A] = useState<any>();

    const [PSV_2002B,setPSV_2002B] = useState<any>()
    const [inputPSV_2002B, setInputPSV_2002B] = useState<any>();

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
                    entityId: id_CNG_BinhDuong,
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
                                key: "PCV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002B",
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
                                id: id_CNG_BinhDuong,
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
                                key: "PCV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_2002B",
                            },

                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PSV_2002B",
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


                        PIT_2006: setPIT_2006,
                        PIT_2007: setPIT_2007,
                        PT_2001: setPT_2001,
                        PT_2002: setPT_2002,
                        PT_2003: setPT_2003,
                        TT_2001: setTT_2001,

                        TT_2002: setTT_2002,
                        GD_2001: setGD_2001,

                        SDV_2001A: setSDV_2001A,
                        SDV_2001B: setSDV_2001B,
                        SDV_2002: setSDV_2002,

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
                        ESD_2001: setESD_2001,
                        SD_2001: setSD_2001,
                        SD_2002: setSD_2002,


                  
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2001A?.value;
                    setPCV_2001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2001A?.value;
                    setPCV_2001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2001B?.value;
                    setPCV_2001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2001B?.value;
                    setPCV_2001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2002A?.value;
                    setPCV_2002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2002A?.value;
                    setPCV_2002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_2002B?.value;
                    setPCV_2002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_2002B?.value;
                    setPCV_2002B(updatedData);
                }

                //=================================


                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2001A?.value;
                    setPSV_2001A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2001A?.value;
                    setPSV_2001A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2001B?.value;
                    setPSV_2001B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2001B?.value;
                    setPSV_2001B(updatedData);
                }




                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2002A?.value;
                    setPSV_2002A(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2002A?.value;
                    setPSV_2002A(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_2002B?.value;
                    setPSV_2002B(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_2002B?.value;
                    setPSV_2002B(updatedData);
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
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/values/attributes/SERVER_SCOPE`
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


            const ESD_2001_High = res.data.find((item: any) => item.key === "ESD_2001_High");
            setESD_2001_High(ESD_2001_High?.value || null);
            const ESD_2001_Low = res.data.find((item: any) => item.key === "ESD_2001_Low");
            setESD_2001_Low(ESD_2001_Low?.value || null);
            const ESD_2001_Maintain = res.data.find(
                (item: any) => item.key === "ESD_2001_Maintain"
            );

            const SD_2001_High = res.data.find((item: any) => item.key === "SD_2001_High");
            setSD_2001_High(SD_2001_High?.value || null);
            const SD_2001_Low = res.data.find((item: any) => item.key === "SD_2001_Low");
            setSD_2001_Low(SD_2001_Low?.value || null);
            const SD_2001_Maintain = res.data.find(
                (item: any) => item.key === "SD_2001_Maintain"
            );

            const SD_2002_High = res.data.find((item: any) => item.key === "SD_2002_High");
            setSD_2002_High(SD_2002_High?.value || null);
            const SD_2002_Low = res.data.find((item: any) => item.key === "SD_2002_Low");
            setSD_2002_Low(SD_2002_Low?.value || null);
            const SD_2002_Maintain = res.data.find(
                (item: any) => item.key === "SD_2002_Maintain"
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
            const PIT_2006_High = res.data.find((item: any) => item.key === "PIT_2006_High");
            setPIT_2006_High(PIT_2006_High?.value || null);
            const PIT_2006_Low = res.data.find((item: any) => item.key === "PIT_2007_Low");
            setPIT_2006_Low(PIT_2006_Low?.value || null);
            const MaintainPIT_2006 = res.data.find(
                (item: any) => item.key === "PIT_2006_Maintain"
            );


            const PIT_2007_High = res.data.find((item: any) => item.key === "PIT_2007_High");
            setPIT_2007_High(PIT_2007_High?.value || null);
            const PIT_2007_Low = res.data.find((item: any) => item.key === "PIT_2007_Low");
            setPIT_2007_Low(PIT_2007_Low?.value || null);
            const PIT_2007_Maintain = res.data.find(
                (item: any) => item.key === "PIT_2007_Maintain"
            );

            const PT_2001_High = res.data.find((item: any) => item.key === "PT_2001_High");
            setPT_2001_High(PT_2001_High?.value || null);
            const PT_2001_Low = res.data.find((item: any) => item.key === "PT_2001_Low");
            setPT_2001_Low(PT_2001_Low?.value || null);
            const PT_2001_Maintain = res.data.find(
                (item: any) => item.key === "PT_2001_Maintain"
            );


            const PT_2002_High = res.data.find((item: any) => item.key === "PT_2002_High");
            setPT_2002_High(PT_2002_High?.value || null);
            const PT_2002_Low = res.data.find((item: any) => item.key === "PT_2002_Low");
            setPT_2002_Low(PT_2002_Low?.value || null);
            const PT_2002_Maintain = res.data.find(
                (item: any) => item.key === "PT_2002_Maintain"
            );

            const PT_2003_High = res.data.find((item: any) => item.key === "PT_2003_High");
            setPT_2003_High(PT_2003_High?.value || null);
            const PT_2003_Low = res.data.find((item: any) => item.key === "PT_2003_Low");
            setPT_2003_Low(PT_2003_Low?.value || null);
            const PT_2003_Maintain = res.data.find(
                (item: any) => item.key === "PT_2003_Maintain"
            );

            const TT_2001_High = res.data.find((item: any) => item.key === "TT_2001_High");
            setTT_2001_High(TT_2001_High?.value || null);
            const TT_2001_Low = res.data.find((item: any) => item.key === "TT_2001_Low");
            setTT_2001_Low(TT_2001_Low?.value || null);
            const TT_2001_Maintain = res.data.find(
                (item: any) => item.key === "TT_2001_Maintain"
            );


            const TT_2002_High = res.data.find((item: any) => item.key === "TT_2002_High");
            setTT_2002_High(TT_2002_High?.value || null);
            const TT_2002_Low = res.data.find((item: any) => item.key === "TT_2002_Low");
            setTT_2002_Low(TT_2002_Low?.value || null);
            const TT_2002_Maintain = res.data.find(
                (item: any) => item.key === "TT_2002_Maintain"
            );


            const GD_2001_High = res.data.find((item: any) => item.key === "GD_2001_High");
            setGD_2001_High(GD_2001_High?.value || null);
            const GD_2001_Low = res.data.find((item: any) => item.key === "GD_2001_Low");
            setGD_2001_Low(GD_2001_Low?.value || null);
            const GD_2001_Maintain = res.data.find(
                (item: any) => item.key === "GD_2001_Maintain"
            );

            const SDV_2001A_High = res.data.find((item: any) => item.key === "SDV_2001A_High");
            setSDV_2001A_High(SDV_2001A_High?.value || null);
            const SDV_2001A_Low = res.data.find((item: any) => item.key === "SDV_2001A_Low");
            setSDV_2001A_Low(SDV_2001A_Low?.value || null);
            const SDV_2001A_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2001A_Maintain"
            );

            const SDV_2001B_High = res.data.find((item: any) => item.key === "SDV_2001B_High");
            setSDV_2001B_High(SDV_2001B_High?.value || null);
            const SDV_2001B_Low = res.data.find((item: any) => item.key === "SDV_2001B_Low");
            setSDV_2001B_Low(SDV_2001B_Low?.value || null);
            const SDV_2001B_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2001B_Maintain"
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


            const SDV_2002_High = res.data.find((item: any) => item.key === "SDV_2002_High");
            setSDV_2002_High(SDV_2002_High?.value || null);
            const SDV_2002_Low = res.data.find((item: any) => item.key === "SDV_2002_Low");
            setSDV_2002_Low(SDV_2002_Low?.value || null);
            const SDV_2002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2002_Maintain"
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

            setMaintainESD_2001(ESD_2001_Maintain?.value || false);


            setMaintainSD_2001(SD_2001_Maintain?.value || false);


            setMaintainSD_2002(SD_2002_Maintain?.value || false);



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


            setMaintainPIT_2006(MaintainPIT_2006?.value || false);


            setMaintainPIT_2007(PIT_2007_Maintain?.value || false);

            setMaintainPT_2001(PT_2001_Maintain?.value || false);


            setMaintainPT_2002(PT_2002_Maintain?.value || false);


            setMaintainPT_2003(PT_2003_Maintain?.value || false);


            setMaintainTT_2001(TT_2001_Maintain?.value || false);


            setMaintainGD_STATUS(GD_STATUS_Maintain?.value || false);

            
            setMaintainBOILER(BOILER_Maintain?.value || false);
            
            setMaintainSDV_2002(SDV_2002_Maintain?.value || false);

            
            setMaintainHEATER_2(HEATER_2_Maintain?.value || false);

            setMaintainHEATER_1(HEATER_1_Maintain?.value || false);


            setMaintainPUMP_2(PUMP_2_Maintain?.value || false);

            setMaintainPUMP_1(PUMP_1_Maintain?.value || false);

            setMaintainWater_LSW(Water_LSW_Maintain?.value || false);


            setMaintainWater_PG(Water_PG_Maintain?.value || false);

            setMaintainSDV_2001B(SDV_2001B_Maintain?.value || false);


            setMaintainSDV_2001A(SDV_2001A_Maintain?.value || false);

            setMaintainGD_2001(GD_2001_Maintain?.value || false);


            setMaintainTT_2002(TT_2002_Maintain?.value || false);




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
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 

 // =================================================================================================================== 

 const [PIT_2006, setPIT_2006] = useState<string | null>(null);
 const [audioPlayingPIT_2006, setAudioPlayingPIT_2006] = useState(false);
 const [inputValuePIT_2006, setInputValuePIT_2006] = useState<any>();
 const [inputValue2PIT_2006, setInputValue2PIT_2006] = useState<any>();
 const [PIT_2006_High, setPIT_2006_High] = useState<number | null>(null);
 const [PIT_2006_Low, setPIT_2006_Low] = useState<number | null>(null);
 const [exceedThresholdPIT_2006, setExceedThresholdPIT_2006] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainPIT_2006, setMaintainPIT_2006] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof PIT_2006_High === 'string' && typeof PIT_2006_Low === 'string' && PIT_2006 !== null && maintainPIT_2006 === false
         ) {
             const highValue = parseFloat(PIT_2006_High);
             const lowValue = parseFloat(PIT_2006_Low);
             const PIT_2006Value = parseFloat(PIT_2006);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_2006Value)) {
                 if (highValue <= PIT_2006Value || PIT_2006Value <= lowValue) {
                     if (!audioPlayingPIT_2006) {
                         audioRef.current?.play();
                         setAudioPlayingPIT_2006(true);
                         setExceedThresholdPIT_2006(true);
                     }
                 } else {
                     setAudioPlayingPIT_2006(false);
                     setExceedThresholdPIT_2006(false);
                 }
             } 
         } 
     }, [PIT_2006_High, PIT_2006, audioPlayingPIT_2006, PIT_2006_Low,maintainPIT_2006]);
 
     useEffect(() => {
         if (audioPlayingPIT_2006) {
             const audioEnded = () => {
                 setAudioPlayingPIT_2006(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingPIT_2006]);
 
     const handleInputChangePIT_2006 = (event: any) => {
         const newValue = event.target.value;
         setInputValuePIT_2006(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2PIT_2006(newValue2);
     };
     const ChangeMaintainPIT_2006 = async () => {
         try {
             const newValue = !maintainPIT_2006;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                 { PIT_2006_Maintain: newValue }
             );
             setMaintainPIT_2006(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [PIT_2007, setPIT_2007] = useState<string | null>(null);
      const [audioPlayingPIT_2007, setAudioPlayingPIT_2007] = useState(false);
      const [inputValuePIT_2007, setInputValuePIT_2007] = useState<any>();
      const [inputValue2PIT_2007, setInputValue2PIT_2007] = useState<any>();
      const [PIT_2007_High, setPIT_2007_High] = useState<number | null>(null);
      const [PIT_2007_Low, setPIT_2007_Low] = useState<number | null>(null);
      const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPIT_2007, setMaintainPIT_2007] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PIT_2007_High === 'string' && typeof PIT_2007_Low === 'string' && PIT_2007 !== null && maintainPIT_2007 === false
              ) {
                  const highValue = parseFloat(PIT_2007_High);
                  const lowValue = parseFloat(PIT_2007_Low);
                  const PIT_2007Value = parseFloat(PIT_2007);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PIT_2007Value)) {
                      if (highValue <= PIT_2007Value || PIT_2007Value <= lowValue) {
                          if (!audioPlayingPIT_2007) {
                              audioRef.current?.play();
                              setAudioPlayingPIT_2007(true);
                              setExceedThreshold302(true);
                          }
                      } else {
                         setAudioPlayingPIT_2007(false);
                          setExceedThreshold302(false);
                      }
                  } 
              } 
          }, [PIT_2007_High, PIT_2007, audioPlayingPIT_2007, PIT_2007_Low,maintainPIT_2007]);
      
          useEffect(() => {
              if (audioPlayingPIT_2007) {
                  const audioEnded = () => {
                     setAudioPlayingPIT_2007(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPIT_2007]);
      
          const handleInputChangePIT_2007 = (event: any) => {
              const newValue = event.target.value;
              setInputValuePIT_2007(newValue);
          };
      
          const handleInputChange2PIT_2007 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PIT_2007(newValue2);
          };
          const ChangeMaintainPIT_2007 = async () => {
              try {
                  const newValue = !maintainPIT_2007;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { PIT_2007_Maintain: newValue }
                  );
                  setMaintainPIT_2007(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
      const [PT_2001, setPT_2001] = useState<string | null>(null);
      const [audioPlayingPT_2001, setAudioPlayingPT_2001] = useState(false);
      const [inputValuePT_2001, setInputValuePT_2001] = useState<any>();
      const [inputValue2PT_2001, setInputValue2PT_2001] = useState<any>();
      const [PT_2001_High, setPT_2001_High] = useState<number | null>(null);
      const [PT_2001_Low, setPT_2001_Low] = useState<number | null>(null);
      const [exceedThresholdPT_2001, setExceedThresholdPT_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPT_2001, setMaintainPT_2001] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof PT_2001_High === 'string' && typeof PT_2001_Low === 'string' && PT_2001 !== null && maintainPT_2001 === false
              ) {
                  const highValue = parseFloat(PT_2001_High);
                  const lowValue = parseFloat(PT_2001_Low);
                  const PT_2001Value = parseFloat(PT_2001);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2001Value)) {
                      if (highValue <= PT_2001Value || PT_2001Value <= lowValue) {
                          if (!audioPlayingPT_2001) {
                              audioRef.current?.play();
                              setAudioPlayingPT_2001(true);
                              setExceedThresholdPT_2001(true);
                          }
                      } else {
                         setAudioPlayingPT_2001(false);
                         setExceedThresholdPT_2001(false);
                      }
                  } 
              } 
          }, [PT_2001_High, PT_2001, audioPlayingPT_2001, PT_2001_Low,maintainPT_2001]);
      
          useEffect(() => {
              if (audioPlayingPT_2001) {
                  const audioEnded = () => {
                     setAudioPlayingPT_2001(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingPT_2001]);
      
          const handleInputChangePT_2001 = (event: any) => {
              const newValue = event.target.value;
              setInputValuePT_2001(newValue);
          };
      
          const handleInputChange2PT_2001 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PT_2001(newValue2);
          };
          const ChangeMaintainPT_2001 = async () => {
              try {
                  const newValue = !maintainPT_2001;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { PT_2001_Maintain: newValue }
                  );
                  setMaintainPT_2001(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
 
           const [PT_2002, setPT_2002] = useState<string | null>(null);
           const [audioPlayingPT_2002, setAudioPlayingPT_2002] = useState(false);
           const [inputValuePT_2002, setInputValuePT_2002] = useState<any>();
           const [inputValue2PT_2002, setInputValue2PT_2002] = useState<any>();
           const [PT_2002_High, setPT_2002_High] = useState<number | null>(null);
           const [PT_2002_Low, setPT_2002_Low] = useState<number | null>(null);
           const [exceedThresholdPT_2002, setExceedThresholdPT_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPT_2002, setMaintainPT_2002] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PT_2002_High === 'string' && typeof PT_2002_Low === 'string' && PT_2002 !== null && maintainPT_2002 === false
                   ) {
                       const highValue = parseFloat(PT_2002_High);
                       const lowValue = parseFloat(PT_2002_Low);
                       const PT_2002Value = parseFloat(PT_2002);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2002Value)) {
                           if (highValue <= PT_2002Value || PT_2002Value <= lowValue) {
                               if (!audioPlayingPT_2002) {
                                   audioRef.current?.play();
                                   setAudioPlayingPT_2002(true);
                                   setExceedThresholdPT_2002(true);
                               }
                           } else {
                              setAudioPlayingPT_2002(false);
                              setExceedThresholdPT_2002(false);
                           }
                       } 
                   } 
               }, [PT_2002_High, PT_2002, audioPlayingPT_2002, PT_2002_Low,maintainPT_2002]);
           
               useEffect(() => {
                   if (audioPlayingPT_2002) {
                       const audioEnded = () => {
                          setAudioPlayingPT_2002(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPT_2002]);
           
               const handleInputChangePT_2002 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePT_2002(newValue);
               };
           
               const handleInputChange2PT_2002 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PT_2002(newValue2);
               };
               const ChangeMaintainPT_2002 = async () => {
                   try {
                       const newValue = !maintainPT_2002;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { PT_2002_Maintain: newValue }
                       );
                       setMaintainPT_2002(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [PT_2003, setPT_2003] = useState<string | null>(null);
           const [audioPlayingPT_2003, setAudioPlayingPT_2003] = useState(false);
           const [inputValuePT_2003, setInputValuePT_2003] = useState<any>();
           const [inputValue2PT_2003, setInputValue2PT_2003] = useState<any>();
           const [PT_2003_High, setPT_2003_High] = useState<number | null>(null);
           const [PT_2003_Low, setPT_2003_Low] = useState<number | null>(null);
           const [exceedThresholdPT_2003, setExceedThresholdPT_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPT_2003, setMaintainPT_2003] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PT_2003_High === 'string' && typeof PT_2003_Low === 'string' && PT_2003 !== null && maintainPT_2003 === false
                   ) {
                       const highValue = parseFloat(PT_2003_High);
                       const lowValue = parseFloat(PT_2003_Low);
                       const PT_2003Value = parseFloat(PT_2003);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2003Value)) {
                           if (highValue <= PT_2003Value || PT_2003Value <= lowValue) {
                               if (!audioPlayingPT_2003) {
                                   audioRef.current?.play();
                                   setAudioPlayingPT_2003(true);
                                   setExceedThresholdPT_2003(true);
                               }
                           } else {
                              setAudioPlayingPT_2003(false);
                              setExceedThresholdPT_2003(false);
                           }
                       } 
                   } 
               }, [PT_2003_High, PT_2003, audioPlayingPT_2003 , PT_2003_Low,maintainPT_2003]);
           
               useEffect(() => {
                   if (audioPlayingPT_2003) {
                       const audioEnded = () => {
                          setAudioPlayingPT_2003(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPT_2003]);
           
               const handleInputChangePT_2003 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePT_2003(newValue);
               };
           
               const handleInputChange2PT_2003 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PT_2003(newValue2);
               };
               const ChangeMaintainPT_2003 = async () => {
                   try {
                       const newValue = !maintainPT_2003;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { PT_2003_Maintain: newValue }
                       );
                       setMaintainPT_2003(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TT_2001, setTT_2001] = useState<string | null>(null);
           const [audioPlayingTT_2001, setAudioPlayingTT_2001] = useState(false);
           const [inputValueTT_2001, setInputValueTT_2001] = useState<any>();
           const [inputValue2TT_2001, setInputValue2TT_2001] = useState<any>();
           const [TT_2001_High, setTT_2001_High] = useState<number | null>(null);
           const [TT_2001_Low, setTT_2001_Low] = useState<number | null>(null);
           const [exceedThresholdTT_2001, setExceedThresholdTT_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTT_2001, setMaintainTT_2001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TT_2001_High === 'string' && typeof TT_2001_Low === 'string' && TT_2001 !== null && maintainTT_2001 === false
                   ) {
                       const highValue = parseFloat(TT_2001_High);
                       const lowValue = parseFloat(TT_2001_Low);
                       const TT_2001Value = parseFloat(TT_2001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2001Value)) {
                           if (highValue <= TT_2001Value || TT_2001Value <= lowValue) {
                               if (!audioPlayingTT_2001) {
                                   audioRef.current?.play();
                                   setAudioPlayingTT_2001(true);
                                   setExceedThresholdTT_2001(true);
                               }
                           } else {
                              setAudioPlayingTT_2001(false);
                              setExceedThresholdTT_2001(false);
                           }
                       } 
                   } 
               }, [TT_2001_High, TT_2001, audioPlayingTT_2001, TT_2001_Low,maintainTT_2001]);
           
               useEffect(() => {
                   if (audioPlayingTT_2001) {
                       const audioEnded = () => {
                          setAudioPlayingTT_2001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTT_2001]);
           
               const handleInputChangeTT_2001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTT_2001(newValue);
               };
           
               const handleInputChange2TT_2001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TT_2001(newValue2);
               };
               const ChangeMaintainTT_2001 = async () => {
                   try {
                       const newValue = !maintainTT_2001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { TT_2001_Maintain: newValue }
                       );
                       setMaintainTT_2001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [GD_2001, setGD_2001] = useState<string | null>(null);
           const [audioPlayingGD_2001, setAudioPlayingGD_2001] = useState(false);
           const [inputValueGD_2001, setInputValueGD_2001] = useState<any>();
           const [inputValue2GD_2001, setInputValue2GD_2001] = useState<any>();
           const [GD_2001_High, setGD_2001_High] = useState<number | null>(null);
           const [GD_2001_Low, setGD_2001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_2001, setExceedThresholdGD_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainGD_2001, setMaintainGD_2001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof GD_2001_High === 'string' && typeof GD_2001_Low === 'string' && GD_2001 !== null && maintainGD_2001 === false
                   ) {
                       const highValue = parseFloat(GD_2001_High);
                       const lowValue = parseFloat(GD_2001_Low);
                       const GD_2001Value = parseFloat(GD_2001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2001Value)) {
                           if (highValue <= GD_2001Value || GD_2001Value <= lowValue) {
                               if (!audioPlayingGD_2001) {
                                   audioRef.current?.play();
                                   setAudioPlayingGD_2001(true);
                                   setExceedThresholdGD_2001(true);
                               }
                           } else {
                              setAudioPlayingGD_2001(false);
                              setExceedThresholdGD_2001(false);
                           }
                       } 
                   } 
               }, [GD_2001_High, GD_2001, audioPlayingGD_2001, GD_2001_Low,maintainGD_2001]);
           
               useEffect(() => {
                   if (audioPlayingGD_2001) {
                       const audioEnded = () => {
                          setAudioPlayingGD_2001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingGD_2001]);
           
               const handleInputChangeGD_2001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueGD_2001(newValue);
               };
           
               const handleInputChange2GD_2001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2GD_2001(newValue2);
               };
               const ChangeMaintainGD_2001 = async () => {
                   try {
                       const newValue = !maintainGD_2001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { GD_2001_Maintain: newValue }
                       );
                       setMaintainGD_2001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [TT_2002, setTT_2002] = useState<string | null>(null);
           const [audioPlayingTT_2002, setAudioPlayingTT_2002] = useState(false);
           const [inputValueTT_2002, setInputValueTT_2002] = useState<any>();
           const [inputValue2TT_2002, setInputValue2TT_2002] = useState<any>();
           const [TT_2002_High, setTT_2002_High] = useState<number | null>(null);
           const [TT_2002_Low, setTT_2002_Low] = useState<number | null>(null);
           const [exceedThresholdTT_2002, setExceedThresholdTT_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainTT_2002, setMaintainTT_2002] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof TT_2002_High === 'string' && typeof TT_2002_Low === 'string' && TT_2002 !== null && maintainTT_2002 === false
                   ) {
                       const highValue = parseFloat(TT_2002_High);
                       const lowValue = parseFloat(TT_2002_Low);
                       const TT_2002Value = parseFloat(TT_2002);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2002Value)) {
                           if (highValue <= TT_2002Value || TT_2002Value <= lowValue) {
                               if (!audioPlayingTT_2002) {
                                   audioRef.current?.play();
                                   setAudioPlayingTT_2002(true);
                                   setExceedThresholdTT_2002(true);
                               }
                           } else {
                              setAudioPlayingTT_2002(false);
                              setExceedThresholdTT_2002(false);
                           }
                       } 
                   } 
               }, [TT_2002_High, TT_2002, audioPlayingTT_2002, TT_2002_Low,maintainTT_2002]);
           
               useEffect(() => {
                   if (audioPlayingTT_2002) {
                       const audioEnded = () => {
                          setAudioPlayingTT_2002(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingTT_2002]);
           
               const handleInputChangeTT_2002 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueTT_2002(newValue);
               };
           
               const handleInputChange2TT_2002 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2TT_2002(newValue2);
               };
               const ChangeMaintainTT_2002 = async () => {
                   try {
                       const newValue = !maintainTT_2002;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { TT_2002_Maintain: newValue }
                       );
                       setMaintainTT_2002(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [SDV_2001A, setSDV_2001A] = useState<string | null>(null);
           const [audioPlayingSDV_2001A, setAudioPlayingSDV_2001A] = useState(false);
           const [inputValueSDV_2001A, setInputValueSDV_2001A] = useState<any>();
           const [inputValue2SDV_2001A, setInputValue2SDV_2001A] = useState<any>();
           const [SDV_2001A_High, setSDV_2001A_High] = useState<number | null>(null);
           const [SDV_2001A_Low, setSDV_2001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_2001A, setExceedThresholdSDV_2001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainSDV_2001A, setMaintainSDV_2001A] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof SDV_2001A_High === 'string' && typeof SDV_2001A_Low === 'string' && SDV_2001A !== null && maintainSDV_2001A === false
                   ) {
                       const highValue = parseFloat(SDV_2001A_High);
                       const lowValue = parseFloat(SDV_2001A_Low);
                       const SDV_2001AValue = parseFloat(SDV_2001A);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2001AValue)) {
                           if (highValue <= SDV_2001AValue || SDV_2001AValue <= lowValue) {
                               if (!audioPlayingSDV_2001A) {
                                   audioRef.current?.play();
                                   setAudioPlayingSDV_2001A(true);
                                   setExceedThresholdSDV_2001A(true);
                               }
                           } else {
                              setAudioPlayingSDV_2001A(false);
                              setExceedThresholdSDV_2001A(false);
                           }
                       } 
                   } 
               }, [SDV_2001A_High, SDV_2001A, audioPlayingSDV_2001A, SDV_2001A_Low,maintainSDV_2001A]);
           
               useEffect(() => {
                   if (audioPlayingSDV_2001A) {
                       const audioEnded = () => {
                          setAudioPlayingSDV_2001A(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingSDV_2001A]);
           
               const handleInputChangeSDV_2001A = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueSDV_2001A(newValue);
               };
           
               const handleInputChange2SDV_2001A = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2SDV_2001A(newValue2);
               };
               const ChangeMaintainSDV_2001A = async () => {
                   try {
                       const newValue = !maintainSDV_2001A;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                           { SDV_2001A_Maintain: newValue }
                       );
                       setMaintainSDV_2001A(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
     // =================================================================================================================== 
 
     const [SDV_2001B, setSDV_2001B] = useState<string | null>(null);
     const [audioPlayingSDV_2001B, setAudioPlayingSDV_2001B] = useState(false);
     const [inputValueSDV_2001B, setInputValueSDV_2001B] = useState<any>();
     const [inputValue2SDV_2001B, setInputValue2SDV_2001B] = useState<any>();
     const [SDV_2001B_High, setSDV_2001B_High] = useState<number | null>(null);
     const [SDV_2001B_Low, setSDV_2001B_Low] = useState<number | null>(null);
     const [exceedThresholdSDV_2001B, setExceedThresholdSDV_2001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainSDV_2001B, setMaintainSDV_2001B] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof SDV_2001B_High === 'string' && typeof SDV_2001B_Low === 'string' && SDV_2001B !== null && maintainSDV_2001B === false
             ) {
                 const highValue = parseFloat(SDV_2001B_High);
                 const lowValue = parseFloat(SDV_2001B_Low);
                 const SDV_2001BValue = parseFloat(SDV_2001B);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2001BValue)) {
                     if (highValue <= SDV_2001BValue || SDV_2001BValue <= lowValue) {
                         if (!audioPlayingSDV_2001B) {
                             audioRef.current?.play();
                             setAudioPlayingSDV_2001B(true);
                             setExceedThresholdSDV_2001B(true);
                         }
                     } else {
                        setAudioPlayingSDV_2001B(false);
                        setExceedThresholdSDV_2001B(false);
                     }
                 } 
             } 
         }, [SDV_2001B_High, SDV_2001B, audioPlayingSDV_2001B, SDV_2001B_Low,maintainSDV_2001B]);
     
         useEffect(() => {
             if (audioPlayingSDV_2001B) {
                 const audioEnded = () => {
                    setAudioPlayingSDV_2001B(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingSDV_2001B]);
     
         const handleInputChangeSDV_2001B = (event: any) => {
             const newValue = event.target.value;
             setInputValueSDV_2001B(newValue);
         };
     
         const handleInputChange2SDV_2001B = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2SDV_2001B(newValue2);
         };
         const ChangeMaintainSDV_2001B = async () => {
             try {
                 const newValue = !maintainSDV_2001B;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { SDV_2001B_Maintain: newValue }
                 );
                 setMaintainSDV_2001B(newValue);
                 
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
                         `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
             `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setMaintainHEATER_2(newValue);
         
     } catch (error) {}
 };
 
 
 // =================================================================================================================== 
 
 
         // =================================================================================================================== 
 
         const [SDV_2002, setSDV_2002] = useState<string | null>(null);
         const [audioPlayingSDV_2002, setAudioPlayingSDV_2002] = useState(false);
         const [inputValueSDV_2002, setInputValueSDV_2002] = useState<any>();
         const [inputValue2SDV_2002, setInputValue2SDV_2002] = useState<any>();
         const [SDV_2002_High, setSDV_2002_High] = useState<number | null>(null);
         const [SDV_2002_Low, setSDV_2002_Low] = useState<number | null>(null);
         const [exceedThresholdSDV_2002, setExceedThresholdSDV_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainSDV_2002, setMaintainSDV_2002] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof SDV_2002_High === 'string' && typeof SDV_2002_Low === 'string' && SDV_2002 !== null && maintainSDV_2002 === false
                 ) {
                     const highValue = parseFloat(SDV_2002_High);
                     const lowValue = parseFloat(SDV_2002_Low);
                     const SDV_2002Value = parseFloat(SDV_2002);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2002Value)) {
                         if (highValue <= SDV_2002Value || SDV_2002Value <= lowValue) {
                             if (!audioPlayingSDV_2002) {
                                 audioRef.current?.play();
                                 setAudioPlayingSDV_2002(true);
                                 setExceedThresholdSDV_2002(true);
                             }
                         } else {
                            setAudioPlayingSDV_2002(false);
                            setExceedThresholdSDV_2002(false);
                         }
                     } 
                 } 
             }, [SDV_2002_High, SDV_2002, audioPlayingSDV_2002, SDV_2002_Low,maintainSDV_2002]);
         
             useEffect(() => {
                 if (audioPlayingSDV_2002) {
                     const audioEnded = () => {
                        setAudioPlayingSDV_2002(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingSDV_2002]);
         
             const handleInputChangeSDV_2002 = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueSDV_2002(newValue);
             };
         
             const handleInputChange2SDV_2002 = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2SDV_2002(newValue2);
             };
             const ChangeMaintainSDV_2002 = async () => {
                 try {
                     const newValue = !maintainSDV_2002;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                         { SDV_2002_Maintain: newValue }
                     );
                     setMaintainSDV_2002(newValue);
                     
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
                         `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                         `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
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
                         `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                         { SD_Maintain: newValue }
                     );
                     setMaintainSD(newValue);
                     
                 } catch (error) {}
             };
    
    
         // =================================================================================================================== 
    
    
    
              const [ESD_2001, setESD_2001] = useState<string | null>(null);
              const [audioPlayingESD_2001, setAudioPlayingESD_2001] = useState(false);
              const [inputValueESD_2001, setInputValueESD_2001] = useState<any>();
              const [inputValue2ESD_2001, setInputValue2ESD_2001] = useState<any>();
              const [ESD_2001_High, setESD_2001_High] = useState<number | null>(null);
              const [ESD_2001_Low, setESD_2001_Low] = useState<number | null>(null);
              const [exceedThresholdESD_2001, setExceedThresholdESD_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainESD_2001, setMaintainESD_2001] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof ESD_2001_High === 'string' && typeof ESD_2001_Low === 'string' && ESD_2001 !== null && maintainESD_2001 === false
                      ) {
                          const highValue = parseFloat(ESD_2001_High);
                          const lowValue = parseFloat(ESD_2001_Low);
                          const ESD_2001Value = parseFloat(ESD_2001);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESD_2001Value)) {
                              if (highValue <= ESD_2001Value || ESD_2001Value <= lowValue) {
                                  if (!audioPlayingESD_2001) {
                                      audioRef.current?.play();
                                      setAudioPlayingESD_2001(true);
                                      setExceedThresholdESD_2001(true);
                                  }
                              } else {
                                 setAudioPlayingESD_2001(false);
                                 setExceedThresholdESD_2001(false);
                              }
                          } 
                      } 
                  }, [ESD_2001_High, ESD_2001, audioPlayingESD_2001, ESD_2001_Low,maintainESD_2001]);
              
                  useEffect(() => {
                      if (audioPlayingESD_2001) {
                          const audioEnded = () => {
                             setAudioPlayingESD_2001(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingESD_2001]);
              
                  const handleInputChangeESD_2001 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueESD_2001(newValue);
                  };
              
                  const handleInputChange2ESD_2001 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2ESD_2001(newValue2);
                  };
                  const ChangeMaintainESD_2001 = async () => {
                      try {
                          const newValue = !maintainESD_2001;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                              { ESD_2001_Maintain: newValue }
                          );
                          setMaintainESD_2001(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
    
              const [SD_2001, setSD_2001] = useState<string | null>(null);
              const [audioPlayingSD_2001, setAudioPlayingSD_2001] = useState(false);
              const [inputValueSD_2001, setInputValueSD_2001] = useState<any>();
              const [inputValue2SD_2001, setInputValue2SD_2001] = useState<any>();
              const [SD_2001_High, setSD_2001_High] = useState<number | null>(null);
              const [SD_2001_Low, setSD_2001_Low] = useState<number | null>(null);
              const [exceedThresholdSD_2001, setExceedThresholdSD_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainSD_2001, setMaintainSD_2001] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof SD_2001_High === 'string' && typeof SD_2001_Low === 'string' && SD_2001 !== null && maintainSD_2001 === false
                      ) {
                          const highValue = parseFloat(SD_2001_High);
                          const lowValue = parseFloat(SD_2001_Low);
                          const SD_2001Value = parseFloat(SD_2001);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SD_2001Value)) {
                              if (highValue <= SD_2001Value || SD_2001Value <= lowValue) {
                                  if (!audioPlayingSD_2001) {
                                      audioRef.current?.play();
                                      setAudioPlayingSD_2001(true);
                                      setExceedThresholdSD_2001(true);
                                  }
                              } else {
                                 setAudioPlayingSD_2001(false);
                                 setExceedThresholdSD_2001(false);
                              }
                          } 
                      } 
                  }, [SD_2001_High, SD_2001, audioPlayingSD_2001 , SD_2001_Low,maintainSD_2001]);
              
                  useEffect(() => {
                      if (audioPlayingSD_2001) {
                          const audioEnded = () => {
                             setAudioPlayingSD_2001(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingSD_2001]);
              
                  const handleInputChangeSD_2001 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueSD_2001(newValue);
                  };
              
                  const handleInputChange2SD_2001 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2SD_2001(newValue2);
                  };
                  const ChangeMaintainSD_2001 = async () => {
                      try {
                          const newValue = !maintainSD_2001;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                              { SD_2001_Maintain: newValue }
                          );
                          setMaintainSD_2001(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
              const [SD_2002, setSD_2002] = useState<string | null>(null);
              const [audioPlayingSD_2002, setAudioPlayingSD_2002] = useState(false);
              const [inputValueSD_2002, setInputValueSD_2002] = useState<any>();
              const [inputValue2SD_2002, setInputValue2SD_2002] = useState<any>();
              const [SD_2002_High, setSD_2002_High] = useState<number | null>(null);
              const [SD_2002_Low, setSD_2002_Low] = useState<number | null>(null);
              const [exceedThresholdSD_2002, setExceedThresholdSD_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainSD_2002, setMaintainSD_2002] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof SD_2002_High === 'string' && typeof SD_2002_Low === 'string' && SD_2002 !== null && maintainSD_2002 === false
                      ) {
                          const highValue = parseFloat(SD_2002_High);
                          const lowValue = parseFloat(SD_2002_Low);
                          const SD_2002Value = parseFloat(SD_2002);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SD_2002Value)) {
                              if (highValue <= SD_2002Value || SD_2002Value <= lowValue) {
                                  if (!audioPlayingSD_2002) {
                                      audioRef.current?.play();
                                      setAudioPlayingSD_2002(true);
                                      setExceedThresholdSD_2002(true);
                                  }
                              } else {
                                 setAudioPlayingSD_2002(false);
                                 setExceedThresholdSD_2002(false);
                              }
                          } 
                      } 
                  }, [SD_2002_High, SD_2002, audioPlayingSD_2002, SD_2002_Low,maintainSD_2002]);
              
                  useEffect(() => {
                      if (audioPlayingSD_2002) {
                          const audioEnded = () => {
                             setAudioPlayingSD_2002(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingSD_2002]);
              
                  const handleInputChangeSD_2002 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueSD_2002(newValue);
                  };
              
                  const handleInputChange2SD_2002 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2SD_2002(newValue2);
                  };
                  const ChangeMaintainSD_2002 = async () => {
                      try {
                          const newValue = !maintainSD_2002;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                              { SD_2002_Maintain: newValue }
                          );
                          setMaintainSD_2002(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
         
         
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,



                {
                    
                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,


                    ESD_2001_High: inputValueESD_2001,ESD_2001_Low:inputValue2ESD_2001,
                    SD_2001_High: inputValueSD_2001,SD_2001_Low:inputValue2SD_2001,
                    SD_2002_High: inputValueSD_2002,SD_2002_Low:inputValue2SD_2002,

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







                    PIT_2007_High: inputValuePIT_2007,PIT_2007_Low:inputValue2PIT_2007,
                    PT_2001_High: inputValuePT_2001,PT_2001_Low:inputValue2PT_2001,
                    PIT_2006_High: inputValuePIT_2006,PIT_2006_Low:inputValue2PIT_2006,


                    PT_2002_High: inputValuePT_2002,PT_2002_Low:inputValue2PT_2002,
                    PT_2003_High: inputValuePT_2003,PT_2003_Low:inputValue2PT_2003,
                    TT_2001_High: inputValueTT_2001,TT_2001_Low:inputValue2TT_2001,

                    TT_2002_High: inputValueTT_2002,TT_2002_Low:inputValue2TT_2002,
                    GD_2001_High: inputValueGD_2001,GD_2001_Low:inputValue2GD_2001,


                    SDV_2001B_High: inputValueSDV_2001B,SDV_2001B_Low:inputValue2SDV_2001B,
                    SDV_2001A_High: inputValueSDV_2001A,SDV_2001A_Low:inputValue2SDV_2001A,


                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,

                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,


                    SDV_2002_High: inputValueSDV_2002,SDV_2002_Low:inputValue2SDV_2002,
                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,
                    IOT_Gateway_Phone: inputGetwayPhone,

      //==========================================


      PCV_2001A: inputPCV_2001A,
      PCV_2001B: inputPCV_2001B,

      PCV_2002A: inputPCV_2002A,
      PCV_2002B: inputPCV_2002B,

      PSV_2001A: inputPSV_2001A,
      PSV_2001B: inputPSV_2001B,

      PSV_2002A: inputPSV_2002A,
      PSV_2002B: inputPSV_2002B,

      EVC_01_Battery_Expiration_Date: timeEVC_01,
      EVC_01_Battery_Installation_Date: timeEVC_02,
      EVC_02_Battery_Expiration_Date: timeEVC_03,
      EVC_02_Battery_Installation_Date: timeEVC_04,
                }
            );
            setPCV_2001A(inputPCV_2001A)
            setPCV_2001B(inputPCV_2001B)
            setPCV_2002A(inputPCV_2002A)
            setPCV_2002B(inputPCV_2002B)

            setPSV_2001A(inputPSV_2001A)
            setPSV_2001B(inputPSV_2001B)
            setPSV_2002A(inputPSV_2002A)
            setPSV_2002B(inputPSV_2002B)
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setESD_2001_High(inputValueESD_2001);
            setESD_2001_Low(inputValue2ESD_2001);

            setSD_2001_High(inputValueSD_2001);
            setSD_2001_Low(inputValue2SD_2001);

            setSD_2002_High(inputValueSD_2002);
            setSD_2002_Low(inputValue2SD_2002);

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


          

    

    


            setPIT_2007_High(inputValuePIT_2007);
            setPIT_2007_Low(inputValue2PIT_2007);

            setPT_2001_High(inputValuePT_2001);
            setPT_2001_Low(inputValue2PT_2001);

            setPT_2001_High(inputValuePT_2001);
            setPT_2001_Low(inputValue2PT_2001);

            setPT_2002_High(inputValuePT_2002);
            setPT_2002_Low(inputValue2PT_2002);

            setPT_2003_High(inputValuePT_2003);
            setPT_2003_Low(inputValue2PT_2003);

            setTT_2001_High(inputValueTT_2001);
            setTT_2001_Low(inputValue2TT_2001);




            setTT_2002_High(inputValueTT_2002);
            setTT_2002_Low(inputValue2TT_2002);

            setGD_2001_High(inputValueGD_2001);
            setGD_2001_Low(inputValue2GD_2001);

            setSDV_2001B_High(inputValueSDV_2001B);
            setSDV_2001B_Low(inputValue2SDV_2001B);

            setSDV_2001A_High(inputValueSDV_2001A);
            setSDV_2001A_Low(inputValue2SDV_2001A);


            setWater_LSW_High(inputValueWater_LSW);
            setWater_LSW_Low(inputValue2Water_LSW);

            setWater_PG_High(inputValueWater_PG);
            setWater_PG_Low(inputValue2Water_PG);

            setPUMP_1_High(inputValuePUMP_1);
            setPUMP_1_Low(inputValue2PUMP_1);

            setPUMP_2_High(inputValuePUMP_2);
            setPUMP_2_Low(inputValue2PUMP_2);



            setSDV_2002_High(inputValueSDV_2002);
            setSDV_2002_Low(inputValue2SDV_2002);

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
        setInputPCV_2001A(PCV_2001A)
        setInputPCV_2001B(PCV_2001B)
        setInputPCV_2002A(PCV_2002A)
        setInputPCV_2002B(PCV_2002B)


        setInputPSV_2001A(PSV_2001A)
        setInputPSV_2001B(PSV_2001B)
        setInputPSV_2002A(PSV_2002A)
        setInputPSV_2002B(PSV_2002B)
//========================================================
        setInputGetwayPhone(getWayPhoneOTSUKA)
   
        setInputValueHR_BC(HR_BC_High); 
        setInputValue2HR_BC(HR_BC_Low); 

        setInputValueSD(SD_High); 
        setInputValue2SD(SD_Low); 

        setInputValueESD_2001(ESD_2001_High); 
        setInputValue2ESD_2001(ESD_2001_Low); 

        setInputValueSD_2001(SD_2001_High); 
        setInputValue2SD_2001(SD_2001_Low); 

        setInputValueSD_2002(SD_2002_High); 
        setInputValue2SD_2002(SD_2002_Low); 


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




     






        setInputValuePIT_2006(PIT_2006_High); 
        setInputValue2PIT_2006(PIT_2006_Low); 

        setInputValuePIT_2007(PIT_2007_High); 
        setInputValue2PIT_2007(PIT_2007_Low); 

        setInputValuePT_2001(PT_2001_High); 
        setInputValue2PT_2001(PT_2001_Low); 



        setInputValuePT_2003(PT_2003_High); 
        setInputValue2PT_2003(PT_2003_Low); 

        setInputValueTT_2001(TT_2001_High); 
        setInputValue2TT_2001(TT_2001_Low); 

        setInputValuePT_2002(PT_2002_High); 
        setInputValue2PT_2002(PT_2002_Low); 
        

        setInputValueTT_2002(TT_2002_High); 
        setInputValue2TT_2002(TT_2002_Low); 

        setInputValueGD_2001(GD_2001_High); 
        setInputValue2GD_2001(GD_2001_Low); 



        setInputValueSDV_2001A(SDV_2001A_High); 
        setInputValue2SDV_2001A(SDV_2001A_Low); 

        setInputValueSDV_2001B(SDV_2001B_High); 
        setInputValue2SDV_2001B(SDV_2001B_Low); 

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


        setInputValueSDV_2002(SDV_2002_High); 
        setInputValue2SDV_2002(SDV_2002_Low); 


        setInputValueBOILER(BOILER_High); 
        setInputValue2BOILER(BOILER_Low); 

        setInputValueGD_STATUS(GD_STATUS_High); 
        setInputValue2GD_STATUS(GD_STATUS_Low); 

    }, [
        
        HR_BC_High, HR_BC_Low 
        ,SD_High, SD_Low ,


        SD_2001_High,SD_2001_Low,
         SD_2002_High,SD_2002_Low ,
          ESD_2001_High,ESD_2001_Low,
        
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





           PIT_2006_High, PIT_2006_Low ,
        PIT_2007_High, PIT_2007_Low 
        ,PT_2001_High, PT_2001_Low ,


        PT_2003_High,PT_2003_Low,
         TT_2001_High,TT_2001_Low ,
          PT_2002_High,PT_2002_Low,

          TT_2002_High,TT_2002_Low,
          GD_2001_High,GD_2001_Low ,
        
           SDV_2001A_High,SDV_2001A_Low,
           SDV_2001B_High,SDV_2001B_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,


           SDV_2002_High,SDV_2002_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,
           getWayPhoneOTSUKA,
           PCV_2001A,
           PCV_2001B,
           PCV_2002A,
           PCV_2002B,

           PSV_2001A,
           PSV_2001B,
           PSV_2002A,
           PSV_2002B,

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


        CSSESD_2001 : {
            color:exceedThresholdESD_2001 && !maintainESD_2001
            ? "#ff5656"
            : maintainESD_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSSD_2001 : {
            color:exceedThresholdSD_2001 && !maintainSD_2001
            ? "#ff5656"
            : maintainSD_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSSD_2002 : {
            color:exceedThresholdSD_2002 && !maintainSD_2002
            ? "#ff5656"
            : maintainSD_2002
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





     
      

  
       
        CSSPIT_2006 : {
            color:exceedThresholdPIT_2006 && !maintainPIT_2006
            ? "#ff5656"
            : maintainPIT_2006
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPIT_2007 : {
            color:exceedThreshold302 && !maintainPIT_2007
            ? "#ff5656"
            : maintainPIT_2007
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPT_2001 : {
            color:exceedThresholdPT_2001 && !maintainPT_2001
            ? "#ff5656"
            : maintainPT_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPT_2002 : {
            color:exceedThresholdPT_2002 && !maintainPT_2002
            ? "#ff5656"
            : maintainPT_2002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSPT_2003 : {
            color:exceedThresholdPT_2003 && !maintainPT_2003
            ? "#ff5656"
            : maintainPT_2003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSTT_2001 : {
            color:exceedThresholdTT_2001 && !maintainTT_2001
            ? "#ff5656"
            : maintainTT_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


     


        CSSTT_2002 : {
            color:exceedThresholdTT_2002 && !maintainTT_2002
            ? "#ff5656"
            : maintainTT_2002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD_2001 : {
            color:exceedThresholdGD_2001 && !maintainGD_2001
            ? "#ff5656"
            : maintainGD_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSSDV_2001A : {
            color:exceedThresholdSDV_2001A && !maintainSDV_2001A
            ? "#ff5656"
            : maintainSDV_2001A
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSSDV_2001B : {
            color:exceedThresholdSDV_2001B && !maintainSDV_2001B
            ? "#ff5656"
            : maintainSDV_2001B
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




        CSSSDV_2002 : {
            color:exceedThresholdSDV_2002 && !maintainSDV_2002
            ? "#ff5656"
            : maintainSDV_2002
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
    EVC01: 'EVC-01 -  Parameter & configuration',
    EVC02: 'EVC-02 -  Parameter & configuration',
    PLC: 'PLC -  Parameter & configuration'
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
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature}  {nameValue.C}</span> , 
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

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Condition} {nameValue.m3h} </span> , 
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

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
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

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
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
                
                timeUpdate: <span style={combineCss.CSSPIT_2006} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_2006}>Pressure Indicator Transmitter PIT-2006</span> ,
    
             modbus: <span style={combineCss.CSSPIT_2006}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPIT_2006} > {PIT_2006} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_2006}   placeholder='High' step="0.1" type='number' value={inputValuePIT_2006} onChange={handleInputChangePIT_2006} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_2006}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_2006} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_2006}
             checked={maintainPIT_2006}
         ></Checkbox>
    
            },
    
         
            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPIT_2007} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_2007}>Pressure Indicator Transmitter PIT-2007</span> ,
    
             modbus: <span style={combineCss.CSSPIT_2007}>40003	 </span> ,
    
            value: <span style={combineCss.CSSPIT_2007} > {PIT_2007} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_2007}   placeholder='High' step="0.1" type='number' value={inputValuePIT_2007} onChange={handleInputChangePIT_2007} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_2007}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_2007} onChange={handleInputChange2PIT_2007} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPIT_2007}
             checked={maintainPIT_2007}
         ></Checkbox>
    
            },
    
            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2001} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2001}>Pressure Transmitter PT-2001</span> ,
    
             modbus: <span style={combineCss.CSSPT_2001}>40005</span> ,
    
            value: <span style={combineCss.CSSPT_2001} > {PT_2001} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPT_2001}   placeholder='High' step="0.1" type='number' value={inputValuePT_2001} onChange={handleInputChangePT_2001} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPT_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2001} onChange={handleInputChange2PT_2001} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_2001}
             checked={maintainPT_2001}
         ></Checkbox>
    
            },


            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2002} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2002}>Pressure Transmitter PT-2002</span> ,
    
             modbus: <span style={combineCss.CSSPT_2002}>40007	 </span> ,
    
            value: <span style={combineCss.CSSPT_2002} > {PT_2002}  {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPT_2002}   placeholder='High' step="0.1" type='number' value={inputValuePT_2002} onChange={handleInputChangePT_2002} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPT_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2002} onChange={handleInputChange2PT_2002} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_2002}
             checked={maintainPT_2002}
         ></Checkbox>
    
            },

            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2003} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPT_2003}>Pressure Transmitter PT-2003</span> ,
   
            modbus: <span style={combineCss.CSSPT_2003}>40009	 </span> ,
   
           value: <span style={combineCss.CSSPT_2003} > {PT_2003}  {nameValue.BARG}</span> , 
            high: <InputText style={combineCss.CSSPT_2003}   placeholder='High' step="0.1" type='number' value={inputValuePT_2003} onChange={handleInputChangePT_2003} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSPT_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2003} onChange={handleInputChange2PT_2003} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainPT_2003}
            checked={maintainPT_2003}
        ></Checkbox>
   
           },


           {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTT_2001} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSTT_2001}>Temperature Transmitter TT-2001</span> ,
  
           modbus: <span style={combineCss.CSSTT_2001}>40011	 </span> ,
  
          value: <span style={combineCss.CSSTT_2001} > {TT_2001} {nameValue.C}</span> , 
           high: <InputText style={combineCss.CSSTT_2001}   placeholder='High' step="0.1" type='number' value={inputValueTT_2001} onChange={handleInputChangeTT_2001} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSTT_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2001} onChange={handleInputChange2TT_2001} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainTT_2001}
           checked={maintainTT_2001}
       ></Checkbox>
  
          },





         {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTT_2002} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSTT_2002}>Temperature Transmitter TT-2002</span> ,

         modbus: <span style={combineCss.CSSTT_2002}>40013	 </span> ,

        value: <span style={combineCss.CSSTT_2002} > {TT_2002} {nameValue.C}</span> , 
         high: <InputText style={combineCss.CSSTT_2002}   placeholder='High' step="0.1" type='number' value={inputValueTT_2002} onChange={handleInputChangeTT_2002} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSTT_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2002} onChange={handleInputChange2TT_2002} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainTT_2002}
         checked={maintainTT_2002}
     ></Checkbox>

        },


        {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSGD_2001} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_2001}>Gas Detector GD-2001</span> ,

        modbus: <span style={combineCss.CSSGD_2001}>40015	 </span> ,

       value: <span style={combineCss.CSSGD_2001} > {GD_2001} {nameValue.LEL}</span> , 
        high: <InputText style={combineCss.CSSGD_2001}   placeholder='High' step="0.1" type='number' value={inputValueGD_2001} onChange={handleInputChangeGD_2001} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSGD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2001} onChange={handleInputChange2GD_2001} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_2001}
        checked={maintainGD_2001}
    ></Checkbox>

       },



       {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_2001A} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_2001A}>Shutdown Valve SDV-2001A</span> ,

       modbus: <span style={combineCss.CSSSDV_2001A}>40017	 </span> ,

      value: <span style={combineCss.CSSSDV_2001A} > {SDV_2001A}</span> , 
       high: <InputText style={combineCss.CSSSDV_2001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2001A} onChange={handleInputChangeSDV_2001A} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_2001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2001A} onChange={handleInputChange2SDV_2001A} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainSDV_2001A}
       checked={maintainSDV_2001A}
   ></Checkbox>

      },


      {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_2001B} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_2001B}>Shutdown Valve SDV-2001B</span> ,

      modbus: <span style={combineCss.CSSSDV_2001B}>40019	 </span> ,

     value: <span style={combineCss.CSSSDV_2001B} > {SDV_2001B}</span> , 
      high: <InputText style={combineCss.CSSSDV_2001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2001B} onChange={handleInputChangeSDV_2001B} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_2001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2001B} onChange={handleInputChange2SDV_2001B} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainSDV_2001B}
      checked={maintainSDV_2001B}
  ></Checkbox>

     },
     {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_2002} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSSDV_2002}>Shutdown Valve SDV-2002</span> ,
    
     modbus: <span style={combineCss.CSSSDV_2002}>40021	 </span> ,
    
    value: <span style={combineCss.CSSSDV_2002} > {SDV_2002}</span> , 
     high: <InputText style={combineCss.CSSSDV_2002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2002} onChange={handleInputChangeSDV_2002} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSSDV_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2002} onChange={handleInputChange2SDV_2002} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainSDV_2002}
     checked={maintainSDV_2002}
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
    
    timeUpdate: <span style={combineCss.CSSESD_2001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSESD_2001}> Emergency Shut ESD-2001</span> ,

modbus: <span style={combineCss.CSSESD_2001}>40039	 </span> ,

value: <span style={combineCss.CSSESD_2001} > {ESD_2001}</span> , 
high: <InputText style={combineCss.CSSESD_2001}   placeholder='High' step="0.1" type='number' value={inputValueESD_2001} onChange={handleInputChangeESD_2001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSESD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD_2001} onChange={handleInputChange2ESD_2001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainESD_2001}
checked={maintainESD_2001}
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
    
    timeUpdate: <span style={combineCss.CSSSD_2001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_2001}>Smoker Detector SD-2001</span> ,

modbus: <span style={combineCss.CSSSD_2001}>40043	 </span> ,

value: <span style={combineCss.CSSSD_2001} > {SD_2001}</span> , 
high: <InputText style={combineCss.CSSSD_2001}   placeholder='High' step="0.1" type='number' value={inputValueSD_2001} onChange={handleInputChangeSD_2001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_2001} onChange={handleInputChange2SD_2001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD_2001}
checked={maintainSD_2001}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD_2002} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_2002}> Smoker Detector SD-2002</span> ,

modbus: <span style={combineCss.CSSSD_2002}>40045	 </span> ,

value: <span style={combineCss.CSSSD_2002} > {SD_2002}</span> , 
high: <InputText style={combineCss.CSSSD_2002}   placeholder='High' step="0.1" type='number' value={inputValueSD_2002} onChange={handleInputChangeSD_2002} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_2002} onChange={handleInputChange2SD_2002} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD_2002}
checked={maintainSD_2002}
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
        const handleInputPCV_2001A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_2001A(newValue);
        };
        const handleInputPCV_2001B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_2001B(newValue);
        };
        const handleInputPCV_2002A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_2002A(newValue);
        };
        const handleInputPCV_2002B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPCV_2002B(newValue);
        };
        const handleInputPSV_2001A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_2001A(newValue);
        };
        const handleInputPSV_2001B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_2001B(newValue);
        };
        const handleInputPSV_2002A = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_2002A(newValue);
        };
        const handleInputPSV_2002B = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue : any = event.target.value;
            setInputPSV_2002B(newValue);
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
        const configuration = [
            {
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2001A {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_2001A}
                        onChange={handleInputPCV_2001A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2001B {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_2001B}
                        onChange={handleInputPCV_2001B}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2002A {nameValue.BARG} </span>,
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_2002A}
                        onChange={handleInputPCV_2002A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2002B {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPCV_2002B}
                        onChange={handleInputPCV_2002B}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001A ( Bar )</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_2001A}
                        onChange={handleInputPSV_2001A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001B ( Bar )</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_2001B}
                        onChange={handleInputPSV_2001B}
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


                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002A ( Bar )</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_2002A}
                        onChange={handleInputPSV_2002A}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002B ( Bar )</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
                        placeholder="High"
                        step="0.1"
                        type="Name"
                        value={inputPSV_2002B}
                        onChange={handleInputPSV_2002B}
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, marginTop:10 }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>CNG BINH DUONG</h2>

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


</div>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - configuration </h4>
                <DataTable value={configuration} size={"small"} selectionMode="single"
                
                columnResizeMode="expand"
                resizableColumns >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    <Column field="Update" header="Update" />
                </DataTable>
            </div>
<br />
<br />

</div>
  )
}
