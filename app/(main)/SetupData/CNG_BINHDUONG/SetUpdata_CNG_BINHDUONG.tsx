import React, { useEffect, useRef, useState } from 'react'
import { id_CNG_BinhDuong, id_SNG_BinhDuong } from '../../data-table-device/ID-DEVICE/IdDevice';
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
import { UserOperator, UserTechnican } from '../../userID/UserID';

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



    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : null;
     const userId = userData?.id?.id;
    
 
    
    
    const TECH_OPER = userId !== UserTechnican.A  && 
    userId !== UserTechnican.Q &&
    userId !==  UserTechnican.N &&
     userId !== UserTechnican.T  &&
      userId !== UserTechnican.TN &&
        userId !== UserTechnican.DT &&
        userId !== UserTechnican.KL &&
        userId !== UserOperator.VHPM3 &&
        userId !== UserOperator.TTVHpm3 ; 

     

            const TECHNIAN_AUTH = userId !== UserTechnican.A  && 
            userId !== UserTechnican.Q &&
            userId !==  UserTechnican.N &&
             userId !== UserTechnican.T  &&
              userId !== UserTechnican.TN &&
                userId !== UserTechnican.DT &&
                userId !== UserTechnican.KL ;
              
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
                        ESD_2001: setESD_2001,
                        SD_2001: setSD_2001,
                        SD_2002: setSD_2002,

                        EVC_01_Conn_STT: setEVC_01_Conn_STT,
                        EVC_02_Conn_STT: setEVC_02_Conn_STT,
                        PLC_Conn_STT: setPLC_Conn_STT,
                  
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

            const EVC_01_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_High");
            setEVC_01_Remain_Battery_Service_Life_High(EVC_01_Remain_Battery_Service_Life_High?.value || null);
            const EVC_01_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Low");
            setEVC_01_Remain_Battery_Service_Life_Low(EVC_01_Remain_Battery_Service_Life_Low?.value || null);
            const EVC_01_Remain_Battery_Service_Life_Maintain = res.data.find(
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
            const SDV_2002_High = res.data.find((item: any) => item.key === "SDV_2002_High");
            setSDV_2002_High(SDV_2002_High?.value || null);
            const SDV_2002_Low = res.data.find((item: any) => item.key === "SDV_2002_Low");
            setSDV_2002_Low(SDV_2002_Low?.value || null);
            const SDV_2002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2002_Maintain"
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


            const HR_BC_High = res.data.find((item: any) => item.key === "HR_BC_High");
            setHR_BC_High(HR_BC_High?.value || null);
            const HR_BC_Low = res.data.find((item: any) => item.key === "HR_BC_Low");
            setHR_BC_Low(HR_BC_Low?.value || null);
            const HR_BC_Maintain = res.data.find(
                (item: any) => item.key === "HR_BC_Maintain"
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



            const EVC_01_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_High");
            setEVC_01_Conn_STT_High(EVC_01_Conn_STT_High?.value || null);
            const EVC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_Low");
            setEVC_01_Conn_STT_Low(EVC_01_Conn_STT_Low?.value || null);
            const EVC_01_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Conn_STT_Maintain"
            );

            const EVC_02_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_High");
            setEVC_02_Conn_STT_High(EVC_02_Conn_STT_High?.value || null);
            const EVC_02_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_Low");
            setEVC_02_Conn_STT_Low(EVC_02_Conn_STT_Low?.value || null);
            const EVC_02_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Conn_STT_Maintain"
            );

            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );

 // =================================================================================================================== 





            setmaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);
            setmaintainEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Maintain?.value || false);
            setmaintainEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Maintain?.value || false);
            setmaintainEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Maintain?.value || false);

            setmaintainEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false);
            setmaintainEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Maintain?.value || false);
            setmaintainEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false);
            setmaintainEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Maintain?.value || false);

            setmaintainEVC_02_Pressure(EVC_02_Pressure_Maintain?.value || false);
            setmaintainEVC_02_Temperature(EVC_02_Temperature_Maintain?.value || false);

            setmaintainEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Maintain?.value || false);



            setmaintainEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Maintain?.value || false);
            setmaintainEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Maintain?.value || false);
            setmaintainEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_Maintain?.value || false);
            setmaintainEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_Maintain?.value || false);


            setmaintainEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_Maintain?.value || false);
            setmaintainEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_Maintain?.value || false);
            setmaintainEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_Maintain?.value || false);
            setmaintainEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_Maintain?.value || false);

            setmaintainEVC_01_Pressure(EVC_01_Pressure_Maintain?.value || false);
            setmaintainEVC_01_Temperature(EVC_01_Temperature_Maintain?.value || false);

            setmaintainEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_Maintain?.value || false);


            setmaintainPIT_2006(MaintainPIT_2006?.value || false);
            setmaintainPIT_2007(PIT_2007_Maintain?.value || false);
            setmaintainPT_2001(PT_2001_Maintain?.value || false);
            setmaintainPT_2002(PT_2002_Maintain?.value || false);
            setmaintainPT_2003(PT_2003_Maintain?.value || false);
            setmaintainTT_2001(TT_2001_Maintain?.value || false);
            setmaintainTT_2002(TT_2002_Maintain?.value || false);
            setmaintainGD_2001(GD_2001_Maintain?.value || false);
            setmaintainSDV_2001A(SDV_2001A_Maintain?.value || false);
            setmaintainSDV_2001B(SDV_2001B_Maintain?.value || false);
            setmaintainSDV_2002(SDV_2002_Maintain?.value || false);
            setmaintainWater_LSW(Water_LSW_Maintain?.value || false);
            setmaintainWater_PG(Water_PG_Maintain?.value || false);
            setmaintainPUMP_2(PUMP_2_Maintain?.value || false);
            setmaintainPUMP_1(PUMP_1_Maintain?.value || false);
            setmaintainHEATER_2(HEATER_2_Maintain?.value || false);
            setmaintainHEATER_1(HEATER_1_Maintain?.value || false);
            setmaintainBOILER(BOILER_Maintain?.value || false);
            setmaintainGD_STATUS(GD_STATUS_Maintain?.value || false);
            setmaintainHR_BC(HR_BC_Maintain?.value || false);
            setmaintainESD_2001(ESD_2001_Maintain?.value || false);
            setmaintainSD_2001(SD_2001_Maintain?.value || false);
            setmaintainSD_2002(SD_2002_Maintain?.value || false);



            setmaintainEVC_01_Conn_STT(EVC_01_Conn_STT_Maintain?.value || false);
            setmaintainEVC_02_Conn_STT(EVC_02_Conn_STT_Maintain?.value || false);
            setmaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);

            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };



        const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
const [inputValueEVC_01_Remain_Battery_Service_Life, setinputValueEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_01_Remain_Battery_Service_Life, setinputValue2EVC_01_Remain_Battery_Service_Life] = useState<any>();
const [EVC_01_Remain_Battery_Service_Life_High, setEVC_01_Remain_Battery_Service_Life_High] = useState<number | null>(null);
const [EVC_01_Remain_Battery_Service_Life_Low, setEVC_01_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Remain_Battery_Service_Life, setexceedThresholdEVC_01_Remain_Battery_Service_Life] = useState(false); 
const [maintainEVC_01_Remain_Battery_Service_Life, setmaintainEVC_01_Remain_Battery_Service_Life] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life as any);
    const highValue = EVC_01_Remain_Battery_Service_Life_High ?? NaN;
    const lowValue = EVC_01_Remain_Battery_Service_Life_Low ?? NaN;

    if (!isNaN(EVC_01_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Remain_Battery_Service_Life) {
        setexceedThresholdEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_LifeValue >= highValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue);
    }
}, [EVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low, maintainEVC_01_Remain_Battery_Service_Life]);

const handleInputChangeEVC_01_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Remain_Battery_Service_Life(event.target.value);
};

const handleInputChange2EVC_01_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Remain_Battery_Service_Life(event.target.value);
};

const ChangemaintainEVC_01_Remain_Battery_Service_Life = async () => {
    try {
        const newValue = !maintainEVC_01_Remain_Battery_Service_Life;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_01_Remain_Battery_Service_Life_Maintain: newValue }
        );
        setmaintainEVC_01_Remain_Battery_Service_Life(newValue);
    } catch (error) {
        console.error(error);
    }
};
     // =================================================================================================================== 


const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);
const [inputValueEVC_01_Temperature, setinputValueEVC_01_Temperature] = useState<any>();
const [inputValue2EVC_01_Temperature, setinputValue2EVC_01_Temperature] = useState<any>();
const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<number | null>(null);
const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Temperature, setexceedThresholdEVC_01_Temperature] = useState(false); 
const [maintainEVC_01_Temperature, setmaintainEVC_01_Temperature] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature as any);
    const highValue = EVC_01_Temperature_High ?? NaN;
    const lowValue = EVC_01_Temperature_Low ?? NaN;

    if (!isNaN(EVC_01_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Temperature) {
        setexceedThresholdEVC_01_Temperature(EVC_01_TemperatureValue >= highValue || EVC_01_TemperatureValue <= lowValue);
    }
}, [EVC_01_Temperature, EVC_01_Temperature_High, EVC_01_Temperature_Low, maintainEVC_01_Temperature]);

const handleInputChangeEVC_01_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Temperature(event.target.value);
};

const handleInputChange2EVC_01_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Temperature(event.target.value);
};

const ChangemaintainEVC_01_Temperature = async () => {
    try {
        const newValue = !maintainEVC_01_Temperature;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_01_Temperature_Maintain: newValue }
        );
        setmaintainEVC_01_Temperature(newValue);
    } catch (error) {
        console.error(error);
    }
};
     // =================================================================================================================== 


const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
const [inputValueEVC_01_Pressure, setinputValueEVC_01_Pressure] = useState<any>();
const [inputValue2EVC_01_Pressure, setinputValue2EVC_01_Pressure] = useState<any>();
const [EVC_01_Pressure_High, setEVC_01_Pressure_High] = useState<number | null>(null);
const [EVC_01_Pressure_Low, setEVC_01_Pressure_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Pressure, setexceedThresholdEVC_01_Pressure] = useState(false); 
const [maintainEVC_01_Pressure, setmaintainEVC_01_Pressure] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_PressureValue = parseFloat(EVC_01_Pressure as any);
    const highValue = EVC_01_Pressure_High ?? NaN;
    const lowValue = EVC_01_Pressure_Low ?? NaN;

    if (!isNaN(EVC_01_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Pressure) {
        setexceedThresholdEVC_01_Pressure(EVC_01_PressureValue >= highValue || EVC_01_PressureValue <= lowValue);
    }
}, [EVC_01_Pressure, EVC_01_Pressure_High, EVC_01_Pressure_Low, maintainEVC_01_Pressure]);

const handleInputChangeEVC_01_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Pressure(event.target.value);
};

const handleInputChange2EVC_01_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Pressure(event.target.value);
};

const ChangemaintainEVC_01_Pressure = async () => {
    try {
        const newValue = !maintainEVC_01_Pressure;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_01_Pressure_Maintain: newValue }
        );
        setmaintainEVC_01_Pressure(newValue);
    } catch (error) {
        console.error(error);
    }
};


 



     // =================================================================================================================== 

     const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
     const [inputValueEVC_01_Volume_at_Base_Condition, setinputValueEVC_01_Volume_at_Base_Condition] = useState<any>();
     const [inputValue2EVC_01_Volume_at_Base_Condition, setinputValue2EVC_01_Volume_at_Base_Condition] = useState<any>();
     const [EVC_01_Volume_at_Base_Condition_High, setEVC_01_Volume_at_Base_Condition_High] = useState<number | null>(null);
     const [EVC_01_Volume_at_Base_Condition_Low, setEVC_01_Volume_at_Base_Condition_Low] = useState<number | null>(null);
     const [exceedThresholdEVC_01_Volume_at_Base_Condition, setexceedThresholdEVC_01_Volume_at_Base_Condition] = useState(false); 
     const [maintainEVC_01_Volume_at_Base_Condition, setmaintainEVC_01_Volume_at_Base_Condition] = useState<boolean>(false);
     
     useEffect(() => {
         const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition as any);
         const highValue = EVC_01_Volume_at_Base_Condition_High ?? NaN;
         const lowValue = EVC_01_Volume_at_Base_Condition_Low ?? NaN;
     
         if (!isNaN(EVC_01_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Base_Condition) {
             setexceedThresholdEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_ConditionValue >= highValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue);
         }
     }, [EVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition_Low, maintainEVC_01_Volume_at_Base_Condition]);
     
     const handleInputChangeEVC_01_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValueEVC_01_Volume_at_Base_Condition(event.target.value);
     };
     
     const handleInputChange2EVC_01_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValue2EVC_01_Volume_at_Base_Condition(event.target.value);
     };
     
     const ChangemaintainEVC_01_Volume_at_Base_Condition = async () => {
         try {
             const newValue = !maintainEVC_01_Volume_at_Base_Condition;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                 { EVC_01_Volume_at_Base_Condition_Maintain: newValue }
             );
             setmaintainEVC_01_Volume_at_Base_Condition(newValue);
         } catch (error) {
             console.error(error);
         }
     };
     
     


     // =================================================================================================================== 
     const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
     const [inputValueEVC_01_Volume_at_Measurement_Condition, setinputValueEVC_01_Volume_at_Measurement_Condition] = useState<any>();
     const [inputValue2EVC_01_Volume_at_Measurement_Condition, setinputValue2EVC_01_Volume_at_Measurement_Condition] = useState<any>();
     const [EVC_01_Volume_at_Measurement_Condition_High, setEVC_01_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
     const [EVC_01_Volume_at_Measurement_Condition_Low, setEVC_01_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
     const [exceedThresholdEVC_01_Volume_at_Measurement_Condition, setexceedThresholdEVC_01_Volume_at_Measurement_Condition] = useState(false); 
     const [maintainEVC_01_Volume_at_Measurement_Condition, setmaintainEVC_01_Volume_at_Measurement_Condition] = useState<boolean>(false);
     
     useEffect(() => {
         const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition as any);
         const highValue = EVC_01_Volume_at_Measurement_Condition_High ?? NaN;
         const lowValue = EVC_01_Volume_at_Measurement_Condition_Low ?? NaN;
     
         if (!isNaN(EVC_01_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Measurement_Condition) {
             setexceedThresholdEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_ConditionValue >= highValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue);
         }
     }, [EVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition_Low, maintainEVC_01_Volume_at_Measurement_Condition]);
     
     const handleInputChangeEVC_01_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValueEVC_01_Volume_at_Measurement_Condition(event.target.value);
     };
     
     const handleInputChange2EVC_01_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValue2EVC_01_Volume_at_Measurement_Condition(event.target.value);
     };
     
     const ChangemaintainEVC_01_Volume_at_Measurement_Condition = async () => {
         try {
             const newValue = !maintainEVC_01_Volume_at_Measurement_Condition;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                 { EVC_01_Volume_at_Measurement_Condition_Maintain: newValue }
             );
             setmaintainEVC_01_Volume_at_Measurement_Condition(newValue);
         } catch (error) {
             console.error(error);
         }
     };
     
          // =================================================================================================================== 


          const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
          const [inputValueEVC_01_Flow_at_Base_Condition, setinputValueEVC_01_Flow_at_Base_Condition] = useState<any>();
          const [inputValue2EVC_01_Flow_at_Base_Condition, setinputValue2EVC_01_Flow_at_Base_Condition] = useState<any>();
          const [EVC_01_Flow_at_Base_Condition_High, setEVC_01_Flow_at_Base_Condition_High] = useState<number | null>(null);
          const [EVC_01_Flow_at_Base_Condition_Low, setEVC_01_Flow_at_Base_Condition_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Flow_at_Base_Condition, setexceedThresholdEVC_01_Flow_at_Base_Condition] = useState(false); 
          const [maintainEVC_01_Flow_at_Base_Condition, setmaintainEVC_01_Flow_at_Base_Condition] = useState<boolean>(false);
          
          useEffect(() => {
              const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition as any);
              const highValue = EVC_01_Flow_at_Base_Condition_High ?? NaN;
              const lowValue = EVC_01_Flow_at_Base_Condition_Low ?? NaN;
          
              if (!isNaN(EVC_01_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Base_Condition) {
                  setexceedThresholdEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_ConditionValue >= highValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue);
              }
          }, [EVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition_Low, maintainEVC_01_Flow_at_Base_Condition]);
          
          const handleInputChangeEVC_01_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValueEVC_01_Flow_at_Base_Condition(event.target.value);
          };
          
          const handleInputChange2EVC_01_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValue2EVC_01_Flow_at_Base_Condition(event.target.value);
          };
          
          const ChangemaintainEVC_01_Flow_at_Base_Condition = async () => {
              try {
                  const newValue = !maintainEVC_01_Flow_at_Base_Condition;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
                  );
                  setmaintainEVC_01_Flow_at_Base_Condition(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          
    // =================================================================================================================== 


    const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
    const [inputValueEVC_01_Flow_at_Measurement_Condition, setinputValueEVC_01_Flow_at_Measurement_Condition] = useState<any>();
    const [inputValue2EVC_01_Flow_at_Measurement_Condition, setinputValue2EVC_01_Flow_at_Measurement_Condition] = useState<any>();
    const [EVC_01_Flow_at_Measurement_Condition_High, setEVC_01_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
    const [EVC_01_Flow_at_Measurement_Condition_Low, setEVC_01_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Flow_at_Measurement_Condition, setexceedThresholdEVC_01_Flow_at_Measurement_Condition] = useState(false); 
    const [maintainEVC_01_Flow_at_Measurement_Condition, setmaintainEVC_01_Flow_at_Measurement_Condition] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition as any);
        const highValue = EVC_01_Flow_at_Measurement_Condition_High ?? NaN;
        const lowValue = EVC_01_Flow_at_Measurement_Condition_Low ?? NaN;
    
        if (!isNaN(EVC_01_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Measurement_Condition) {
            setexceedThresholdEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_ConditionValue >= highValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue);
        }
    }, [EVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition_Low, maintainEVC_01_Flow_at_Measurement_Condition]);
    
    const handleInputChangeEVC_01_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValueEVC_01_Flow_at_Measurement_Condition(event.target.value);
    };
    
    const handleInputChange2EVC_01_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue2EVC_01_Flow_at_Measurement_Condition(event.target.value);
    };
    
    const ChangemaintainEVC_01_Flow_at_Measurement_Condition = async () => {
        try {
            const newValue = !maintainEVC_01_Flow_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
            );
            setmaintainEVC_01_Flow_at_Measurement_Condition(newValue);
        } catch (error) {
            console.error(error);
        }
    };
    


          // =================================================================================================================== 



          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vm_of_Current_Day, setinputValueEVC_01_Vm_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vm_of_Current_Day, setinputValue2EVC_01_Vm_of_Current_Day] = useState<any>();
          const [EVC_01_Vm_of_Current_Day_High, setEVC_01_Vm_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vm_of_Current_Day_Low, setEVC_01_Vm_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vm_of_Current_Day, setexceedThresholdEVC_01_Vm_of_Current_Day] = useState(false); 
          const [maintainEVC_01_Vm_of_Current_Day, setmaintainEVC_01_Vm_of_Current_Day] = useState<boolean>(false);
          
          useEffect(() => {
              const EVC_01_Vm_of_Current_DayValue = parseFloat(EVC_01_Vm_of_Current_Day as any);
              const highValue = EVC_01_Vm_of_Current_Day_High ?? NaN;
              const lowValue = EVC_01_Vm_of_Current_Day_Low ?? NaN;
          
              if (!isNaN(EVC_01_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Current_Day) {
                  setexceedThresholdEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_DayValue >= highValue || EVC_01_Vm_of_Current_DayValue <= lowValue);
              }
          }, [EVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day_Low, maintainEVC_01_Vm_of_Current_Day]);
          
          const handleInputChangeEVC_01_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValueEVC_01_Vm_of_Current_Day(event.target.value);
          };
          
          const handleInputChange2EVC_01_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValue2EVC_01_Vm_of_Current_Day(event.target.value);
          };
          
          const ChangemaintainEVC_01_Vm_of_Current_Day = async () => {
              try {
                  const newValue = !maintainEVC_01_Vm_of_Current_Day;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { EVC_01_Vm_of_Current_Day_Maintain: newValue }
                  );
                  setmaintainEVC_01_Vm_of_Current_Day(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          


          

     
          // =================================================================================================================== 



          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vb_of_Current_Day, setinputValueEVC_01_Vb_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Current_Day, setinputValue2EVC_01_Vb_of_Current_Day] = useState<any>();
          const [EVC_01_Vb_of_Current_Day_High, setEVC_01_Vb_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Current_Day_Low, setEVC_01_Vb_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Current_Day, setexceedThresholdEVC_01_Vb_of_Current_Day] = useState(false); 
          const [maintainEVC_01_Vb_of_Current_Day, setmaintainEVC_01_Vb_of_Current_Day] = useState<boolean>(false);
          
          useEffect(() => {
              const EVC_01_Vb_of_Current_DayValue = parseFloat(EVC_01_Vb_of_Current_Day as any);
              const highValue = EVC_01_Vb_of_Current_Day_High ?? NaN;
              const lowValue = EVC_01_Vb_of_Current_Day_Low ?? NaN;
          
              if (!isNaN(EVC_01_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Current_Day) {
                  setexceedThresholdEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_DayValue >= highValue || EVC_01_Vb_of_Current_DayValue <= lowValue);
              }
          }, [EVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day_Low, maintainEVC_01_Vb_of_Current_Day]);
          
          const handleInputChangeEVC_01_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValueEVC_01_Vb_of_Current_Day(event.target.value);
          };
          
          const handleInputChange2EVC_01_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValue2EVC_01_Vb_of_Current_Day(event.target.value);
          };
          
          const ChangemaintainEVC_01_Vb_of_Current_Day = async () => {
              try {
                  const newValue = !maintainEVC_01_Vb_of_Current_Day;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { EVC_01_Vb_of_Current_Day_Maintain: newValue }
                  );
                  setmaintainEVC_01_Vb_of_Current_Day(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          


     
      

          // =================================================================================================================== 

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vb_of_Last_Day, setinputValueEVC_01_Vb_of_Last_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Last_Day, setinputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
          const [EVC_01_Vb_of_Last_Day_High, setEVC_01_Vb_of_Last_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Last_Day_Low, setEVC_01_Vb_of_Last_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Last_Day, setexceedThresholdEVC_01_Vb_of_Last_Day] = useState(false); 
          const [maintainEVC_01_Vb_of_Last_Day, setmaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);
          
          useEffect(() => {
              const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day as any);
              const highValue = EVC_01_Vb_of_Last_Day_High ?? NaN;
              const lowValue = EVC_01_Vb_of_Last_Day_Low ?? NaN;
          
              if (!isNaN(EVC_01_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Last_Day) {
                  setexceedThresholdEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_DayValue >= highValue || EVC_01_Vb_of_Last_DayValue <= lowValue);
              }
          }, [EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day_Low, maintainEVC_01_Vb_of_Last_Day]);
          
          const handleInputChangeEVC_01_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValueEVC_01_Vb_of_Last_Day(event.target.value);
          };
          
          const handleInputChange2EVC_01_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
              setinputValue2EVC_01_Vb_of_Last_Day(event.target.value);
          };
          
          const ChangemaintainEVC_01_Vb_of_Last_Day = async () => {
              try {
                  const newValue = !maintainEVC_01_Vb_of_Last_Day;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                      { EVC_01_Vb_of_Last_Day_Maintain: newValue }
                  );
                  setmaintainEVC_01_Vb_of_Last_Day(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          


    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);
    const [inputValueEVC_01_Vm_of_Last_Day, setinputValueEVC_01_Vm_of_Last_Day] = useState<any>();
    const [inputValue2EVC_01_Vm_of_Last_Day, setinputValue2EVC_01_Vm_of_Last_Day] = useState<any>();
    const [EVC_01_Vm_of_Last_Day_High, setEVC_01_Vm_of_Last_Day_High] = useState<number | null>(null);
    const [EVC_01_Vm_of_Last_Day_Low, setEVC_01_Vm_of_Last_Day_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Vm_of_Last_Day, setexceedThresholdEVC_01_Vm_of_Last_Day] = useState(false); 
    const [maintainEVC_01_Vm_of_Last_Day, setmaintainEVC_01_Vm_of_Last_Day] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day as any);
        const highValue = EVC_01_Vm_of_Last_Day_High ?? NaN;
        const lowValue = EVC_01_Vm_of_Last_Day_Low ?? NaN;
    
        if (!isNaN(EVC_01_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Last_Day) {
            setexceedThresholdEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_DayValue >= highValue || EVC_01_Vm_of_Last_DayValue <= lowValue);
        }
    }, [EVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day_Low, maintainEVC_01_Vm_of_Last_Day]);
    
    const handleInputChangeEVC_01_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValueEVC_01_Vm_of_Last_Day(event.target.value);
    };
    
    const handleInputChange2EVC_01_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue2EVC_01_Vm_of_Last_Day(event.target.value);
    };
    
    const ChangemaintainEVC_01_Vm_of_Last_Day = async () => {
        try {
            const newValue = !maintainEVC_01_Vm_of_Last_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                { EVC_01_Vm_of_Last_Day_Maintain: newValue }
            );
            setmaintainEVC_01_Vm_of_Last_Day(newValue);
        } catch (error) {
            console.error(error);
        }
    };
    

        // =================================================================================================================== 

        const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
        const [inputValueEVC_02_Remain_Battery_Service_Life, setinputValueEVC_02_Remain_Battery_Service_Life] = useState<any>();
        const [inputValue2EVC_02_Remain_Battery_Service_Life, setinputValue2EVC_02_Remain_Battery_Service_Life] = useState<any>();
        const [EVC_02_Remain_Battery_Service_Life_High, setEVC_02_Remain_Battery_Service_Life_High] = useState<number | null>(null);
        const [EVC_02_Remain_Battery_Service_Life_Low, setEVC_02_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Remain_Battery_Service_Life, setexceedThresholdEVC_02_Remain_Battery_Service_Life] = useState(false); 
        const [maintainEVC_02_Remain_Battery_Service_Life, setmaintainEVC_02_Remain_Battery_Service_Life] = useState<boolean>(false);
        
        useEffect(() => {
            const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life as any);
            const highValue = EVC_02_Remain_Battery_Service_Life_High ?? NaN;
            const lowValue = EVC_02_Remain_Battery_Service_Life_Low ?? NaN;
        
            if (!isNaN(EVC_02_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Remain_Battery_Service_Life) {
                setexceedThresholdEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_LifeValue >= highValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue);
            }
        }, [EVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life_Low, maintainEVC_02_Remain_Battery_Service_Life]);
        
        const handleInputChangeEVC_02_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValueEVC_02_Remain_Battery_Service_Life(event.target.value);
        };
        
        const handleInputChange2EVC_02_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValue2EVC_02_Remain_Battery_Service_Life(event.target.value);
        };
        
        const ChangemaintainEVC_02_Remain_Battery_Service_Life = async () => {
            try {
                const newValue = !maintainEVC_02_Remain_Battery_Service_Life;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
                );
                setmaintainEVC_02_Remain_Battery_Service_Life(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        




            // =================================================================================================================== 


            const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);
            const [inputValueEVC_02_Temperature, setinputValueEVC_02_Temperature] = useState<any>();
            const [inputValue2EVC_02_Temperature, setinputValue2EVC_02_Temperature] = useState<any>();
            const [EVC_02_Temperature_High, setEVC_02_Temperature_High] = useState<number | null>(null);
            const [EVC_02_Temperature_Low, setEVC_02_Temperature_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Temperature, setexceedThresholdEVC_02_Temperature] = useState(false); 
            const [maintainEVC_02_Temperature, setmaintainEVC_02_Temperature] = useState<boolean>(false);
            
            useEffect(() => {
                const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature as any);
                const highValue = EVC_02_Temperature_High ?? NaN;
                const lowValue = EVC_02_Temperature_Low ?? NaN;
            
                if (!isNaN(EVC_02_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Temperature) {
                    setexceedThresholdEVC_02_Temperature(EVC_02_TemperatureValue >= highValue || EVC_02_TemperatureValue <= lowValue);
                }
            }, [EVC_02_Temperature, EVC_02_Temperature_High, EVC_02_Temperature_Low, maintainEVC_02_Temperature]);
            
            const handleInputChangeEVC_02_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValueEVC_02_Temperature(event.target.value);
            };
            
            const handleInputChange2EVC_02_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2EVC_02_Temperature(event.target.value);
            };
            
            const ChangemaintainEVC_02_Temperature = async () => {
                try {
                    const newValue = !maintainEVC_02_Temperature;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Temperature_Maintain: newValue }
                    );
                    setmaintainEVC_02_Temperature(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            


    // =================================================================================================================== 





    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
    const [inputValueEVC_02_Pressure, setinputValueEVC_02_Pressure] = useState<any>();
    const [inputValue2EVC_02_Pressure, setinputValue2EVC_02_Pressure] = useState<any>();
    const [EVC_02_Pressure_High, setEVC_02_Pressure_High] = useState<number | null>(null);
    const [EVC_02_Pressure_Low, setEVC_02_Pressure_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Pressure, setexceedThresholdEVC_02_Pressure] = useState(false); 
    const [maintainEVC_02_Pressure, setmaintainEVC_02_Pressure] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_02_PressureValue = parseFloat(EVC_02_Pressure as any);
        const highValue = EVC_02_Pressure_High ?? NaN;
        const lowValue = EVC_02_Pressure_Low ?? NaN;
    
        if (!isNaN(EVC_02_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Pressure) {
            setexceedThresholdEVC_02_Pressure(EVC_02_PressureValue >= highValue || EVC_02_PressureValue <= lowValue);
        }
    }, [EVC_02_Pressure, EVC_02_Pressure_High, EVC_02_Pressure_Low, maintainEVC_02_Pressure]);
    
    const handleInputChangeEVC_02_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValueEVC_02_Pressure(event.target.value);
    };
    
    const handleInputChange2EVC_02_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue2EVC_02_Pressure(event.target.value);
    };
    
    const ChangemaintainEVC_02_Pressure = async () => {
        try {
            const newValue = !maintainEVC_02_Pressure;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                { EVC_02_Pressure_Maintain: newValue }
            );
            setmaintainEVC_02_Pressure(newValue);
        } catch (error) {
            console.error(error);
        }
    };
    




        // =================================================================================================================== 


        const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
        const [inputValueEVC_02_Volume_at_Base_Condition, setinputValueEVC_02_Volume_at_Base_Condition] = useState<any>();
        const [inputValue2EVC_02_Volume_at_Base_Condition, setinputValue2EVC_02_Volume_at_Base_Condition] = useState<any>();
        const [EVC_02_Volume_at_Base_Condition_High, setEVC_02_Volume_at_Base_Condition_High] = useState<number | null>(null);
        const [EVC_02_Volume_at_Base_Condition_Low, setEVC_02_Volume_at_Base_Condition_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Volume_at_Base_Condition, setexceedThresholdEVC_02_Volume_at_Base_Condition] = useState(false); 
        const [maintainEVC_02_Volume_at_Base_Condition, setmaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);
        
        useEffect(() => {
            const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition as any);
            const highValue = EVC_02_Volume_at_Base_Condition_High ?? NaN;
            const lowValue = EVC_02_Volume_at_Base_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_02_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Base_Condition) {
                setexceedThresholdEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_ConditionValue >= highValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue);
            }
        }, [EVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition_Low, maintainEVC_02_Volume_at_Base_Condition]);
        
        const handleInputChangeEVC_02_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValueEVC_02_Volume_at_Base_Condition(event.target.value);
        };
        
        const handleInputChange2EVC_02_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValue2EVC_02_Volume_at_Base_Condition(event.target.value);
        };
        
        const ChangemaintainEVC_02_Volume_at_Base_Condition = async () => {
            try {
                const newValue = !maintainEVC_02_Volume_at_Base_Condition;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
                );
                setmaintainEVC_02_Volume_at_Base_Condition(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        


// =================================================================================================================== 



const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Volume_at_Measurement_Condition, setinputValueEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Measurement_Condition, setinputValue2EVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [EVC_02_Volume_at_Measurement_Condition_High, setEVC_02_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Measurement_Condition_Low, setEVC_02_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Measurement_Condition, setexceedThresholdEVC_02_Volume_at_Measurement_Condition] = useState(false); 
const [maintainEVC_02_Volume_at_Measurement_Condition, setmaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition as any);
    const highValue = EVC_02_Volume_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_02_Volume_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Measurement_Condition) {
        setexceedThresholdEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_ConditionValue >= highValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition_Low, maintainEVC_02_Volume_at_Measurement_Condition]);

const handleInputChangeEVC_02_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Volume_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_02_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Volume_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_02_Volume_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Volume_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Volume_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



// =================================================================================================================== 

    // =================================================================================================================== 



    const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
    const [inputValueEVC_02_Flow_at_Base_Condition, setinputValueEVC_02_Flow_at_Base_Condition] = useState<any>();
    const [inputValue2EVC_02_Flow_at_Base_Condition, setinputValue2EVC_02_Flow_at_Base_Condition] = useState<any>();
    const [EVC_02_Flow_at_Base_Condition_High, setEVC_02_Flow_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_02_Flow_at_Base_Condition_Low, setEVC_02_Flow_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Flow_at_Base_Condition, setexceedThresholdEVC_02_Flow_at_Base_Condition] = useState(false); 
    const [maintainEVC_02_Flow_at_Base_Condition, setmaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition as any);
        const highValue = EVC_02_Flow_at_Base_Condition_High ?? NaN;
        const lowValue = EVC_02_Flow_at_Base_Condition_Low ?? NaN;
    
        if (!isNaN(EVC_02_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Base_Condition) {
            setexceedThresholdEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_ConditionValue >= highValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue);
        }
    }, [EVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition_Low, maintainEVC_02_Flow_at_Base_Condition]);
    
    const handleInputChangeEVC_02_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValueEVC_02_Flow_at_Base_Condition(event.target.value);
    };
    
    const handleInputChange2EVC_02_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue2EVC_02_Flow_at_Base_Condition(event.target.value);
    };
    
    const ChangemaintainEVC_02_Flow_at_Base_Condition = async () => {
        try {
            const newValue = !maintainEVC_02_Flow_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
            );
            setmaintainEVC_02_Flow_at_Base_Condition(newValue);
        } catch (error) {
            console.error(error);
        }
    };
    

// =================================================================================================================== 

const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Flow_at_Measurement_Condition, setinputValueEVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Flow_at_Measurement_Condition, setinputValue2EVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setexceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false); 
const [maintainEVC_02_Flow_at_Measurement_Condition, setmaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition as any);
    const highValue = EVC_02_Flow_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_02_Flow_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Measurement_Condition) {
        setexceedThresholdEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_ConditionValue >= highValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition_Low, maintainEVC_02_Flow_at_Measurement_Condition]);

const handleInputChangeEVC_02_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Flow_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_02_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Flow_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_02_Flow_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Flow_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Flow_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



        
        // =================================================================================================================== 
        const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
const [inputValueEVC_02_Vb_of_Current_Day, setinputValueEVC_02_Vb_of_Current_Day] = useState<any>();
const [inputValue2EVC_02_Vb_of_Current_Day, setinputValue2EVC_02_Vb_of_Current_Day] = useState<any>();
const [EVC_02_Vb_of_Current_Day_High, setEVC_02_Vb_of_Current_Day_High] = useState<number | null>(null);
const [EVC_02_Vb_of_Current_Day_Low, setEVC_02_Vb_of_Current_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vb_of_Current_Day, setexceedThresholdEVC_02_Vb_of_Current_Day] = useState(false); 
const [maintainEVC_02_Vb_of_Current_Day, setmaintainEVC_02_Vb_of_Current_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day as any);
    const highValue = EVC_02_Vb_of_Current_Day_High ?? NaN;
    const lowValue = EVC_02_Vb_of_Current_Day_Low ?? NaN;

    if (!isNaN(EVC_02_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Current_Day) {
        setexceedThresholdEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_DayValue >= highValue || EVC_02_Vb_of_Current_DayValue <= lowValue);
    }
}, [EVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day_Low, maintainEVC_02_Vb_of_Current_Day]);

const handleInputChangeEVC_02_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Vb_of_Current_Day(event.target.value);
};

const handleInputChange2EVC_02_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Vb_of_Current_Day(event.target.value);
};

const ChangemaintainEVC_02_Vb_of_Current_Day = async () => {
    try {
        const newValue = !maintainEVC_02_Vb_of_Current_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
            { EVC_02_Vb_of_Current_Day_Maintain: newValue }
        );
        setmaintainEVC_02_Vb_of_Current_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};


        // =================================================================================================================== 


        const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
        const [inputValueEVC_02_Vm_of_Current_Day, setinputValueEVC_02_Vm_of_Current_Day] = useState<any>();
        const [inputValue2EVC_02_Vm_of_Current_Day, setinputValue2EVC_02_Vm_of_Current_Day] = useState<any>();
        const [EVC_02_Vm_of_Current_Day_High, setEVC_02_Vm_of_Current_Day_High] = useState<number | null>(null);
        const [EVC_02_Vm_of_Current_Day_Low, setEVC_02_Vm_of_Current_Day_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Vm_of_Current_Day, setexceedThresholdEVC_02_Vm_of_Current_Day] = useState(false); 
        const [maintainEVC_02_Vm_of_Current_Day, setmaintainEVC_02_Vm_of_Current_Day] = useState<boolean>(false);
        
        useEffect(() => {
            const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day as any);
            const highValue = EVC_02_Vm_of_Current_Day_High ?? NaN;
            const lowValue = EVC_02_Vm_of_Current_Day_Low ?? NaN;
        
            if (!isNaN(EVC_02_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Current_Day) {
                setexceedThresholdEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_DayValue >= highValue || EVC_02_Vm_of_Current_DayValue <= lowValue);
            }
        }, [EVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day_Low, maintainEVC_02_Vm_of_Current_Day]);
        
        const handleInputChangeEVC_02_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValueEVC_02_Vm_of_Current_Day(event.target.value);
        };
        
        const handleInputChange2EVC_02_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
            setinputValue2EVC_02_Vm_of_Current_Day(event.target.value);
        };
        
        const ChangemaintainEVC_02_Vm_of_Current_Day = async () => {
            try {
                const newValue = !maintainEVC_02_Vm_of_Current_Day;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    { EVC_02_Vm_of_Current_Day_Maintain: newValue }
                );
                setmaintainEVC_02_Vm_of_Current_Day(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        
        

        

            // =================================================================================================================== 


            const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
            const [inputValueEVC_02_Vb_of_Last_Day, setinputValueEVC_02_Vb_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vb_of_Last_Day, setinputValue2EVC_02_Vb_of_Last_Day] = useState<any>();
            const [EVC_02_Vb_of_Last_Day_High, setEVC_02_Vb_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vb_of_Last_Day_Low, setEVC_02_Vb_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vb_of_Last_Day, setexceedThresholdEVC_02_Vb_of_Last_Day] = useState(false); 
            const [maintainEVC_02_Vb_of_Last_Day, setmaintainEVC_02_Vb_of_Last_Day] = useState<boolean>(false);
            
            useEffect(() => {
                const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day as any);
                const highValue = EVC_02_Vb_of_Last_Day_High ?? NaN;
                const lowValue = EVC_02_Vb_of_Last_Day_Low ?? NaN;
            
                if (!isNaN(EVC_02_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Last_Day) {
                    setexceedThresholdEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_DayValue >= highValue || EVC_02_Vb_of_Last_DayValue <= lowValue);
                }
            }, [EVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day_Low, maintainEVC_02_Vb_of_Last_Day]);
            
            const handleInputChangeEVC_02_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValueEVC_02_Vb_of_Last_Day(event.target.value);
            };
            
            const handleInputChange2EVC_02_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2EVC_02_Vb_of_Last_Day(event.target.value);
            };
            
            const ChangemaintainEVC_02_Vb_of_Last_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vb_of_Last_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Vb_of_Last_Day_Maintain: newValue }
                    );
                    setmaintainEVC_02_Vb_of_Last_Day(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            
            // =================================================================================================================== 

            const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
            const [inputValueEVC_02_Vm_of_Last_Day, setinputValueEVC_02_Vm_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vm_of_Last_Day, setinputValue2EVC_02_Vm_of_Last_Day] = useState<any>();
            const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vm_of_Last_Day, setexceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); 
            const [maintainEVC_02_Vm_of_Last_Day, setmaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);
            
            useEffect(() => {
                const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day as any);
                const highValue = EVC_02_Vm_of_Last_Day_High ?? NaN;
                const lowValue = EVC_02_Vm_of_Last_Day_Low ?? NaN;
            
                if (!isNaN(EVC_02_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Last_Day) {
                    setexceedThresholdEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_DayValue >= highValue || EVC_02_Vm_of_Last_DayValue <= lowValue);
                }
            }, [EVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low, maintainEVC_02_Vm_of_Last_Day]);
            
            const handleInputChangeEVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValueEVC_02_Vm_of_Last_Day(event.target.value);
            };
            
            const handleInputChange2EVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2EVC_02_Vm_of_Last_Day(event.target.value);
            };
            
            const ChangemaintainEVC_02_Vm_of_Last_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vm_of_Last_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setmaintainEVC_02_Vm_of_Last_Day(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            

            
            
            // =================================================================================================================== 
            const [PIT_2006, setPIT_2006] = useState<string | null>(null);
            const [inputValuePIT_2006, setinputValuePIT_2006] = useState<any>();
            const [inputValue2PIT_2006, setinputValue2PIT_2006] = useState<any>();
            const [PIT_2006_High, setPIT_2006_High] = useState<number | null>(null);
            const [PIT_2006_Low, setPIT_2006_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_2006, setexceedThresholdPIT_2006] = useState(false); 
            const [maintainPIT_2006, setmaintainPIT_2006] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_2006Value = parseFloat(PIT_2006 as any);
                const highValue = PIT_2006_High ?? NaN;
                const lowValue = PIT_2006_Low ?? NaN;
            
                if (!isNaN(PIT_2006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_2006) {
                    setexceedThresholdPIT_2006(PIT_2006Value >= highValue || PIT_2006Value <= lowValue);
                }
            }, [PIT_2006, PIT_2006_High, PIT_2006_Low, maintainPIT_2006]);
            
            const handleInputChangePIT_2006 = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_2006(event.target.value);
            };
            
            const handleInputChange2PIT_2006 = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_2006(event.target.value);
            };
            
            const ChangemaintainPIT_2006 = async () => {
                try {
                    const newValue = !maintainPIT_2006;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { PIT_2006_Maintain: newValue }
                    );
                    setmaintainPIT_2006(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            
 // =================================================================================================================== 
            const [PIT_2007, setPIT_2007] = useState<string | null>(null);
            const [inputValuePIT_2007, setinputValuePIT_2007] = useState<any>();
            const [inputValue2PIT_2007, setinputValue2PIT_2007] = useState<any>();
            const [PIT_2007_High, setPIT_2007_High] = useState<number | null>(null);
            const [PIT_2007_Low, setPIT_2007_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_2007, setexceedThresholdPIT_2007] = useState(false); 
            const [maintainPIT_2007, setmaintainPIT_2007] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_2007Value = parseFloat(PIT_2007 as any);
                const highValue = PIT_2007_High ?? NaN;
                const lowValue = PIT_2007_Low ?? NaN;
            
                if (!isNaN(PIT_2007Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_2007) {
                    setexceedThresholdPIT_2007(PIT_2007Value >= highValue || PIT_2007Value <= lowValue);
                }
            }, [PIT_2007, PIT_2007_High, PIT_2007_Low, maintainPIT_2007]);
            
            const handleInputChangePIT_2007 = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_2007(event.target.value);
            };
            
            const handleInputChange2PIT_2007 = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_2007(event.target.value);
            };
            
            const ChangemaintainPIT_2007 = async () => {
                try {
                    const newValue = !maintainPIT_2007;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                        { PIT_2007_Maintain: newValue }
                    );
                    setmaintainPIT_2007(newValue);
                } catch (error) {
                    console.error(error);
                }
            };

 
   
 
 
      // =================================================================================================================== 


      const [PT_2001, setPT_2001] = useState<string | null>(null);
      const [inputValuePT_2001, setinputValuePT_2001] = useState<any>();
      const [inputValue2PT_2001, setinputValue2PT_2001] = useState<any>();
      const [PT_2001_High, setPT_2001_High] = useState<number | null>(null);
      const [PT_2001_Low, setPT_2001_Low] = useState<number | null>(null);
      const [exceedThresholdPT_2001, setexceedThresholdPT_2001] = useState(false); 
      const [maintainPT_2001, setmaintainPT_2001] = useState<boolean>(false);
      
      useEffect(() => {
          const PT_2001Value = parseFloat(PT_2001 as any);
          const highValue = PT_2001_High ?? NaN;
          const lowValue = PT_2001_Low ?? NaN;
      
          if (!isNaN(PT_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_2001) {
              setexceedThresholdPT_2001(PT_2001Value >= highValue || PT_2001Value <= lowValue);
          }
      }, [PT_2001, PT_2001_High, PT_2001_Low, maintainPT_2001]);
      
      const handleInputChangePT_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePT_2001(event.target.value);
      };
      
      const handleInputChange2PT_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PT_2001(event.target.value);
      };
      
      const ChangemaintainPT_2001 = async () => {
          try {
              const newValue = !maintainPT_2001;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                  { PT_2001_Maintain: newValue }
              );
              setmaintainPT_2001(newValue);
          } catch (error) {
              console.error(error);
          }
      };


      // =================================================================================================================== 
      const [PT_2002, setPT_2002] = useState<string | null>(null);
      const [inputValuePT_2002, setinputValuePT_2002] = useState<any>();
      const [inputValue2PT_2002, setinputValue2PT_2002] = useState<any>();
      const [PT_2002_High, setPT_2002_High] = useState<number | null>(null);
      const [PT_2002_Low, setPT_2002_Low] = useState<number | null>(null);
      const [exceedThresholdPT_2002, setexceedThresholdPT_2002] = useState(false); 
      const [maintainPT_2002, setmaintainPT_2002] = useState<boolean>(false);
      
      useEffect(() => {
          const PT_2002Value = parseFloat(PT_2002 as any);
          const highValue = PT_2002_High ?? NaN;
          const lowValue = PT_2002_Low ?? NaN;
      
          if (!isNaN(PT_2002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_2002) {
              setexceedThresholdPT_2002(PT_2002Value >= highValue || PT_2002Value <= lowValue);
          }
      }, [PT_2002, PT_2002_High, PT_2002_Low, maintainPT_2002]);
      
      const handleInputChangePT_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePT_2002(event.target.value);
      };
      
      const handleInputChange2PT_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PT_2002(event.target.value);
      };
      
      const ChangemaintainPT_2002 = async () => {
          try {
              const newValue = !maintainPT_2002;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                  { PT_2002_Maintain: newValue }
              );
              setmaintainPT_2002(newValue);
          } catch (error) {
              console.error(error);
          }
      };


 
 
      
      
           // =================================================================================================================== 


           const [PT_2003, setPT_2003] = useState<string | null>(null);
           const [inputValuePT_2003, setinputValuePT_2003] = useState<any>();
           const [inputValue2PT_2003, setinputValue2PT_2003] = useState<any>();
           const [PT_2003_High, setPT_2003_High] = useState<number | null>(null);
           const [PT_2003_Low, setPT_2003_Low] = useState<number | null>(null);
           const [exceedThresholdPT_2003, setexceedThresholdPT_2003] = useState(false); 
           const [maintainPT_2003, setmaintainPT_2003] = useState<boolean>(false);
           
           useEffect(() => {
               const PT_2003Value = parseFloat(PT_2003 as any);
               const highValue = PT_2003_High ?? NaN;
               const lowValue = PT_2003_Low ?? NaN;
           
               if (!isNaN(PT_2003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_2003) {
                   setexceedThresholdPT_2003(PT_2003Value >= highValue || PT_2003Value <= lowValue);
               }
           }, [PT_2003, PT_2003_High, PT_2003_Low, maintainPT_2003]);
           
           const handleInputChangePT_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValuePT_2003(event.target.value);
           };
           
           const handleInputChange2PT_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2PT_2003(event.target.value);
           };
           
           const ChangemaintainPT_2003 = async () => {
               try {
                   const newValue = !maintainPT_2003;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { PT_2003_Maintain: newValue }
                   );
                   setmaintainPT_2003(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
     
 
 
      
      
      
           // =================================================================================================================== 



           const [TT_2001, setTT_2001] = useState<string | null>(null);
           const [inputValueTT_2001, setinputValueTT_2001] = useState<any>();
           const [inputValue2TT_2001, setinputValue2TT_2001] = useState<any>();
           const [TT_2001_High, setTT_2001_High] = useState<number | null>(null);
           const [TT_2001_Low, setTT_2001_Low] = useState<number | null>(null);
           const [exceedThresholdTT_2001, setexceedThresholdTT_2001] = useState(false); 
           const [maintainTT_2001, setmaintainTT_2001] = useState<boolean>(false);
           
           useEffect(() => {
               const TT_2001Value = parseFloat(TT_2001 as any);
               const highValue = TT_2001_High ?? NaN;
               const lowValue = TT_2001_Low ?? NaN;
           
               if (!isNaN(TT_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_2001) {
                   setexceedThresholdTT_2001(TT_2001Value >= highValue || TT_2001Value <= lowValue);
               }
           }, [TT_2001, TT_2001_High, TT_2001_Low, maintainTT_2001]);
           
           const handleInputChangeTT_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTT_2001(event.target.value);
           };
           
           const handleInputChange2TT_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TT_2001(event.target.value);
           };
           
           const ChangemaintainTT_2001 = async () => {
               try {
                   const newValue = !maintainTT_2001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { TT_2001_Maintain: newValue }
                   );
                   setmaintainTT_2001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


 
        
      
      
           // =================================================================================================================== 


           const [GD_2001, setGD_2001] = useState<string | null>(null);
           const [inputValueGD_2001, setinputValueGD_2001] = useState<any>();
           const [inputValue2GD_2001, setinputValue2GD_2001] = useState<any>();
           const [GD_2001_High, setGD_2001_High] = useState<number | null>(null);
           const [GD_2001_Low, setGD_2001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_2001, setexceedThresholdGD_2001] = useState(false); 
           const [maintainGD_2001, setmaintainGD_2001] = useState<boolean>(false);
           
           useEffect(() => {
               const GD_2001Value = parseFloat(GD_2001 as any);
               const highValue = GD_2001_High ?? NaN;
               const lowValue = GD_2001_Low ?? NaN;
           
               if (!isNaN(GD_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2001) {
                   setexceedThresholdGD_2001(GD_2001Value >= highValue || GD_2001Value <= lowValue);
               }
           }, [GD_2001, GD_2001_High, GD_2001_Low, maintainGD_2001]);
           
           const handleInputChangeGD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueGD_2001(event.target.value);
           };
           
           const handleInputChange2GD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2GD_2001(event.target.value);
           };
           
           const ChangemaintainGD_2001 = async () => {
               try {
                   const newValue = !maintainGD_2001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { GD_2001_Maintain: newValue }
                   );
                   setmaintainGD_2001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
           // =================================================================================================================== 

           const [TT_2002, setTT_2002] = useState<string | null>(null);
           const [inputValueTT_2002, setinputValueTT_2002] = useState<any>();
           const [inputValue2TT_2002, setinputValue2TT_2002] = useState<any>();
           const [TT_2002_High, setTT_2002_High] = useState<number | null>(null);
           const [TT_2002_Low, setTT_2002_Low] = useState<number | null>(null);
           const [exceedThresholdTT_2002, setexceedThresholdTT_2002] = useState(false); 
           const [maintainTT_2002, setmaintainTT_2002] = useState<boolean>(false);
           
           useEffect(() => {
               const TT_2002Value = parseFloat(TT_2002 as any);
               const highValue = TT_2002_High ?? NaN;
               const lowValue = TT_2002_Low ?? NaN;
           
               if (!isNaN(TT_2002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_2002) {
                   setexceedThresholdTT_2002(TT_2002Value >= highValue || TT_2002Value <= lowValue);
               }
           }, [TT_2002, TT_2002_High, TT_2002_Low, maintainTT_2002]);
           
           const handleInputChangeTT_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTT_2002(event.target.value);
           };
           
           const handleInputChange2TT_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TT_2002(event.target.value);
           };
           
           const ChangemaintainTT_2002 = async () => {
               try {
                   const newValue = !maintainTT_2002;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { TT_2002_Maintain: newValue }
                   );
                   setmaintainTT_2002(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
      
           // ===================================================================================================================
           
           

           const [SDV_2001A, setSDV_2001A] = useState<string | null>(null);
           const [inputValueSDV_2001A, setinputValueSDV_2001A] = useState<any>();
           const [inputValue2SDV_2001A, setinputValue2SDV_2001A] = useState<any>();
           const [SDV_2001A_High, setSDV_2001A_High] = useState<number | null>(null);
           const [SDV_2001A_Low, setSDV_2001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_2001A, setexceedThresholdSDV_2001A] = useState(false); 
           const [maintainSDV_2001A, setmaintainSDV_2001A] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_2001AValue = parseFloat(SDV_2001A as any);
               const highValue = SDV_2001A_High ?? NaN;
               const lowValue = SDV_2001A_Low ?? NaN;
           
               if (!isNaN(SDV_2001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_2001A) {
                   setexceedThresholdSDV_2001A(SDV_2001AValue >= highValue || SDV_2001AValue <= lowValue);
               }
           }, [SDV_2001A, SDV_2001A_High, SDV_2001A_Low, maintainSDV_2001A]);
           
           const handleInputChangeSDV_2001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_2001A(event.target.value);
           };
           
           const handleInputChange2SDV_2001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_2001A(event.target.value);
           };
           
           const ChangemaintainSDV_2001A = async () => {
               try {
                   const newValue = !maintainSDV_2001A;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { SDV_2001A_Maintain: newValue }
                   );
                   setmaintainSDV_2001A(newValue);
               } catch (error) {
                   console.error(error);
               }
           };

 
 
        
      
      
           // =================================================================================================================== 


           const [SDV_2001B, setSDV_2001B] = useState<string | null>(null);
           const [inputValueSDV_2001B, setinputValueSDV_2001B] = useState<any>();
           const [inputValue2SDV_2001B, setinputValue2SDV_2001B] = useState<any>();
           const [SDV_2001B_High, setSDV_2001B_High] = useState<number | null>(null);
           const [SDV_2001B_Low, setSDV_2001B_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_2001B, setexceedThresholdSDV_2001B] = useState(false); 
           const [maintainSDV_2001B, setmaintainSDV_2001B] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_2001BValue = parseFloat(SDV_2001B as any);
               const highValue = SDV_2001B_High ?? NaN;
               const lowValue = SDV_2001B_Low ?? NaN;
           
               if (!isNaN(SDV_2001BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_2001B) {
                   setexceedThresholdSDV_2001B(SDV_2001BValue >= highValue || SDV_2001BValue <= lowValue);
               }
           }, [SDV_2001B, SDV_2001B_High, SDV_2001B_Low, maintainSDV_2001B]);
           
           const handleInputChangeSDV_2001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_2001B(event.target.value);
           };
           
           const handleInputChange2SDV_2001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_2001B(event.target.value);
           };
           
           const ChangemaintainSDV_2001B = async () => {
               try {
                   const newValue = !maintainSDV_2001B;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                       { SDV_2001B_Maintain: newValue }
                   );
                   setmaintainSDV_2001B(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
 

         // =================================================================================================================== 



         const [Water_PG, setWater_PG] = useState<string | null>(null);
         const [inputValueWater_PG, setinputValueWater_PG] = useState<any>();
         const [inputValue2Water_PG, setinputValue2Water_PG] = useState<any>();
         const [Water_PG_High, setWater_PG_High] = useState<number | null>(null);
         const [Water_PG_Low, setWater_PG_Low] = useState<number | null>(null);
         const [exceedThresholdWater_PG, setexceedThresholdWater_PG] = useState(false); 
         const [maintainWater_PG, setmaintainWater_PG] = useState<boolean>(false);
         
         useEffect(() => {
             const Water_PGValue = parseFloat(Water_PG as any);
             const highValue = Water_PG_High ?? NaN;
             const lowValue = Water_PG_Low ?? NaN;
         
             if (!isNaN(Water_PGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWater_PG) {
                 setexceedThresholdWater_PG(Water_PGValue >= highValue || Water_PGValue <= lowValue);
             }
         }, [Water_PG, Water_PG_High, Water_PG_Low, maintainWater_PG]);
         
         const handleInputChangeWater_PG = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueWater_PG(event.target.value);
         };
         
         const handleInputChange2Water_PG = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2Water_PG(event.target.value);
         };
         
         const ChangemaintainWater_PG = async () => {
             try {
                 const newValue = !maintainWater_PG;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { Water_PG_Maintain: newValue }
                 );
                 setmaintainWater_PG(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
 
     
         // =================================================================================================================== 




         const [Water_LSW, setWater_LSW] = useState<string | null>(null);
         const [inputValueWater_LSW, setinputValueWater_LSW] = useState<any>();
         const [inputValue2Water_LSW, setinputValue2Water_LSW] = useState<any>();
         const [Water_LSW_High, setWater_LSW_High] = useState<number | null>(null);
         const [Water_LSW_Low, setWater_LSW_Low] = useState<number | null>(null);
         const [exceedThresholdWater_LSW, setexceedThresholdWater_LSW] = useState(false); 
         const [maintainWater_LSW, setmaintainWater_LSW] = useState<boolean>(false);
         
         useEffect(() => {
             const Water_LSWValue = parseFloat(Water_LSW as any);
             const highValue = Water_LSW_High ?? NaN;
             const lowValue = Water_LSW_Low ?? NaN;
         
             if (!isNaN(Water_LSWValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWater_LSW) {
                 setexceedThresholdWater_LSW(Water_LSWValue >= highValue || Water_LSWValue <= lowValue);
             }
         }, [Water_LSW, Water_LSW_High, Water_LSW_Low, maintainWater_LSW]);
         
         const handleInputChangeWater_LSW = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueWater_LSW(event.target.value);
         };
         
         const handleInputChange2Water_LSW = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2Water_LSW(event.target.value);
         };
         
         const ChangemaintainWater_LSW = async () => {
             try {
                 const newValue = !maintainWater_LSW;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { Water_LSW_Maintain: newValue }
                 );
                 setmaintainWater_LSW(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
 
 
 
     // =================================================================================================================== 

     const [PUMP_1, setPUMP_1] = useState<string | null>(null);
     const [inputValuePUMP_1, setinputValuePUMP_1] = useState<any>();
     const [inputValue2PUMP_1, setinputValue2PUMP_1] = useState<any>();
     const [PUMP_1_High, setPUMP_1_High] = useState<number | null>(null);
     const [PUMP_1_Low, setPUMP_1_Low] = useState<number | null>(null);
     const [exceedThresholdPUMP_1, setexceedThresholdPUMP_1] = useState(false); 
     const [maintainPUMP_1, setmaintainPUMP_1] = useState<boolean>(false);
     
     useEffect(() => {
         const PUMP_1Value = parseFloat(PUMP_1 as any);
         const highValue = PUMP_1_High ?? NaN;
         const lowValue = PUMP_1_Low ?? NaN;
     
         if (!isNaN(PUMP_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPUMP_1) {
             setexceedThresholdPUMP_1(PUMP_1Value >= highValue || PUMP_1Value <= lowValue);
         }
     }, [PUMP_1, PUMP_1_High, PUMP_1_Low, maintainPUMP_1]);
     
     const handleInputChangePUMP_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValuePUMP_1(event.target.value);
     };
     
     const handleInputChange2PUMP_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValue2PUMP_1(event.target.value);
     };
     
     const ChangemaintainPUMP_1 = async () => {
         try {
             const newValue = !maintainPUMP_1;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                 { PUMP_1_Maintain: newValue }
             );
             setmaintainPUMP_1(newValue);
         } catch (error) {
             console.error(error);
         }
     };
 

     // =================================================================================================================== 


     const [PUMP_2, setPUMP_2] = useState<string | null>(null);
     const [inputValuePUMP_2, setinputValuePUMP_2] = useState<any>();
     const [inputValue2PUMP_2, setinputValue2PUMP_2] = useState<any>();
     const [PUMP_2_High, setPUMP_2_High] = useState<number | null>(null);
     const [PUMP_2_Low, setPUMP_2_Low] = useState<number | null>(null);
     const [exceedThresholdPUMP_2, setexceedThresholdPUMP_2] = useState(false); 
     const [maintainPUMP_2, setmaintainPUMP_2] = useState<boolean>(false);
     
     useEffect(() => {
         const PUMP_2Value = parseFloat(PUMP_2 as any);
         const highValue = PUMP_2_High ?? NaN;
         const lowValue = PUMP_2_Low ?? NaN;
     
         if (!isNaN(PUMP_2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPUMP_2) {
             setexceedThresholdPUMP_2(PUMP_2Value >= highValue || PUMP_2Value <= lowValue);
         }
     }, [PUMP_2, PUMP_2_High, PUMP_2_Low, maintainPUMP_2]);
     
     const handleInputChangePUMP_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValuePUMP_2(event.target.value);
     };
     
     const handleInputChange2PUMP_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setinputValue2PUMP_2(event.target.value);
     };
     
     const ChangemaintainPUMP_2 = async () => {
         try {
             const newValue = !maintainPUMP_2;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                 { PUMP_2_Maintain: newValue }
             );
             setmaintainPUMP_2(newValue);
         } catch (error) {
             console.error(error);
         }
     };
 
         // =================================================================================================================== 
 
         const [HEATER_1, setHEATER_1] = useState<string | null>(null);
         const [inputValueHEATER_1, setinputValueHEATER_1] = useState<any>();
         const [inputValue2HEATER_1, setinputValue2HEATER_1] = useState<any>();
         const [HEATER_1_High, setHEATER_1_High] = useState<number | null>(null);
         const [HEATER_1_Low, setHEATER_1_Low] = useState<number | null>(null);
         const [exceedThresholdHEATER_1, setexceedThresholdHEATER_1] = useState(false); 
         const [maintainHEATER_1, setmaintainHEATER_1] = useState<boolean>(false);
         
         useEffect(() => {
             const HEATER_1Value = parseFloat(HEATER_1 as any);
             const highValue = HEATER_1_High ?? NaN;
             const lowValue = HEATER_1_Low ?? NaN;
         
             if (!isNaN(HEATER_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHEATER_1) {
                 setexceedThresholdHEATER_1(HEATER_1Value >= highValue || HEATER_1Value <= lowValue);
             }
         }, [HEATER_1, HEATER_1_High, HEATER_1_Low, maintainHEATER_1]);
         
         const handleInputChangeHEATER_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueHEATER_1(event.target.value);
         };
         
         const handleInputChange2HEATER_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2HEATER_1(event.target.value);
         };
         
         const ChangemaintainHEATER_1 = async () => {
             try {
                 const newValue = !maintainHEATER_1;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { HEATER_1_Maintain: newValue }
                 );
                 setmaintainHEATER_1(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
 // =================================================================================================================== 
 
 const [HEATER_2, setHEATER_2] = useState<string | null>(null);
 const [inputValueHEATER_2, setinputValueHEATER_2] = useState<any>();
 const [inputValue2HEATER_2, setinputValue2HEATER_2] = useState<any>();
 const [HEATER_2_High, setHEATER_2_High] = useState<number | null>(null);
 const [HEATER_2_Low, setHEATER_2_Low] = useState<number | null>(null);
 const [exceedThresholdHEATER_2, setexceedThresholdHEATER_2] = useState(false); 
 const [maintainHEATER_2, setmaintainHEATER_2] = useState<boolean>(false);
 
 useEffect(() => {
     const HEATER_2Value = parseFloat(HEATER_2 as any);
     const highValue = HEATER_2_High ?? NaN;
     const lowValue = HEATER_2_Low ?? NaN;
 
     if (!isNaN(HEATER_2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHEATER_2) {
         setexceedThresholdHEATER_2(HEATER_2Value >= highValue || HEATER_2Value <= lowValue);
     }
 }, [HEATER_2, HEATER_2_High, HEATER_2_Low, maintainHEATER_2]);
 
 const handleInputChangeHEATER_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueHEATER_2(event.target.value);
 };
 
 const handleInputChange2HEATER_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2HEATER_2(event.target.value);
 };
 
 const ChangemaintainHEATER_2 = async () => {
     try {
         const newValue = !maintainHEATER_2;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setmaintainHEATER_2(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 
 
 
 
 // =================================================================================================================== 


  
 const [SDV_2002, setSDV_2002] = useState<string | null>(null);
 const [inputValueSDV_2002, setinputValueSDV_2002] = useState<any>();
 const [inputValue2SDV_2002, setinputValue2SDV_2002] = useState<any>();
 const [SDV_2002_High, setSDV_2002_High] = useState<number | null>(null);
 const [SDV_2002_Low, setSDV_2002_Low] = useState<number | null>(null);
 const [exceedThresholdSDV_2002, setexceedThresholdSDV_2002] = useState(false); 
 const [maintainSDV_2002, setmaintainSDV_2002] = useState<boolean>(false);
 
 useEffect(() => {
     const SDV_2002Value = parseFloat(SDV_2002 as any);
     const highValue = SDV_2002_High ?? NaN;
     const lowValue = SDV_2002_Low ?? NaN;
 
     if (!isNaN(SDV_2002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_2002) {
         setexceedThresholdSDV_2002(SDV_2002Value >= highValue || SDV_2002Value <= lowValue);
     }
 }, [SDV_2002, SDV_2002_High, SDV_2002_Low, maintainSDV_2002]);
 
 const handleInputChangeSDV_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueSDV_2002(event.target.value);
 };
 
 const handleInputChange2SDV_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2SDV_2002(event.target.value);
 };
 
 const ChangemaintainSDV_2002 = async () => {
     try {
         const newValue = !maintainSDV_2002;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
             { SDV_2002_Maintain: newValue }
         );
         setmaintainSDV_2002(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 

         
         
         // =================================================================================================================== 

         
  
 const [BOILER, setBOILER] = useState<string | null>(null);
 const [inputValueBOILER, setinputValueBOILER] = useState<any>();
 const [inputValue2BOILER, setinputValue2BOILER] = useState<any>();
 const [BOILER_High, setBOILER_High] = useState<number | null>(null);
 const [BOILER_Low, setBOILER_Low] = useState<number | null>(null);
 const [exceedThresholdBOILER, setexceedThresholdBOILER] = useState(false); 
 const [maintainBOILER, setmaintainBOILER] = useState<boolean>(false);
 
 useEffect(() => {
     const BOILERValue = parseFloat(BOILER as any);
     const highValue = BOILER_High ?? NaN;
     const lowValue = BOILER_Low ?? NaN;
 
     if (!isNaN(BOILERValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainBOILER) {
         setexceedThresholdBOILER(BOILERValue >= highValue || BOILERValue <= lowValue);
     }
 }, [BOILER, BOILER_High, BOILER_Low, maintainBOILER]);
 
 const handleInputChangeBOILER = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueBOILER(event.target.value);
 };
 
 const handleInputChange2BOILER = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2BOILER(event.target.value);
 };
 
 const ChangemaintainBOILER = async () => {
     try {
         const newValue = !maintainBOILER;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
             { BOILER_Maintain: newValue }
         );
         setmaintainBOILER(newValue);
     } catch (error) {
         console.error(error);
     }
 };

  
         
         // =================================================================================================================== 


         const [GD_STATUS, setGD_STATUS] = useState<string | null>(null);
         const [inputValueGD_STATUS, setinputValueGD_STATUS] = useState<any>();
         const [inputValue2GD_STATUS, setinputValue2GD_STATUS] = useState<any>();
         const [GD_STATUS_High, setGD_STATUS_High] = useState<number | null>(null);
         const [GD_STATUS_Low, setGD_STATUS_Low] = useState<number | null>(null);
         const [exceedThresholdGD_STATUS, setexceedThresholdGD_STATUS] = useState(false); 
         const [maintainGD_STATUS, setmaintainGD_STATUS] = useState<boolean>(false);
         
         useEffect(() => {
             const GD_STATUSValue = parseFloat(GD_STATUS as any);
             const highValue = GD_STATUS_High ?? NaN;
             const lowValue = GD_STATUS_Low ?? NaN;
         
             if (!isNaN(GD_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_STATUS) {
                 setexceedThresholdGD_STATUS(GD_STATUSValue >= highValue || GD_STATUSValue <= lowValue);
             }
         }, [GD_STATUS, GD_STATUS_High, GD_STATUS_Low, maintainGD_STATUS]);
         
         const handleInputChangeGD_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueGD_STATUS(event.target.value);
         };
         
         const handleInputChange2GD_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2GD_STATUS(event.target.value);
         };
         
         const ChangemaintainGD_STATUS = async () => {
             try {
                 const newValue = !maintainGD_STATUS;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { GD_STATUS_Maintain: newValue }
                 );
                 setmaintainGD_STATUS(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
        
         
             // =================================================================================================================== 




         const [HR_BC, setHR_BC] = useState<string | null>(null);
         const [inputValueHR_BC, setinputValueHR_BC] = useState<any>();
         const [inputValue2HR_BC, setinputValue2HR_BC] = useState<any>();
         const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
         const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
         const [exceedThresholdHR_BC, setexceedThresholdHR_BC] = useState(false); 
         const [maintainHR_BC, setmaintainHR_BC] = useState<boolean>(false);
         
         useEffect(() => {
             const HR_BCValue = parseFloat(HR_BC as any);
             const highValue = HR_BC_High ?? NaN;
             const lowValue = HR_BC_Low ?? NaN;
         
             if (!isNaN(HR_BCValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHR_BC) {
                 setexceedThresholdHR_BC(HR_BCValue >= highValue || HR_BCValue <= lowValue);
             }
         }, [HR_BC, HR_BC_High, HR_BC_Low, maintainHR_BC]);
         
         const handleInputChangeHR_BC = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueHR_BC(event.target.value);
         };
         
         const handleInputChange2HR_BC = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2HR_BC(event.target.value);
         };
         
         const ChangemaintainHR_BC = async () => {
             try {
                 const newValue = !maintainHR_BC;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { HR_BC_Maintain: newValue }
                 );
                 setmaintainHR_BC(newValue);
             } catch (error) {
                 console.error(error);
             }
         };


        


    
    
         
         // =================================================================================================================== 
         const [ESD_2001, setESD_2001] = useState<string | null>(null);
         const [inputValueESD_2001, setinputValueESD_2001] = useState<any>();
         const [inputValue2ESD_2001, setinputValue2ESD_2001] = useState<any>();
         const [ESD_2001_High, setESD_2001_High] = useState<number | null>(null);
         const [ESD_2001_Low, setESD_2001_Low] = useState<number | null>(null);
         const [exceedThresholdESD_2001, setexceedThresholdESD_2001] = useState(false); 
         const [maintainESD_2001, setmaintainESD_2001] = useState<boolean>(false);
         
         useEffect(() => {
             const ESD_2001Value = parseFloat(ESD_2001 as any);
             const highValue = ESD_2001_High ?? NaN;
             const lowValue = ESD_2001_Low ?? NaN;
         
             if (!isNaN(ESD_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD_2001) {
                 setexceedThresholdESD_2001(ESD_2001Value >= highValue || ESD_2001Value <= lowValue);
             }
         }, [ESD_2001, ESD_2001_High, ESD_2001_Low, maintainESD_2001]);
         
         const handleInputChangeESD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueESD_2001(event.target.value);
         };
         
         const handleInputChange2ESD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2ESD_2001(event.target.value);
         };
         
         const ChangemaintainESD_2001 = async () => {
             try {
                 const newValue = !maintainESD_2001;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                     { ESD_2001_Maintain: newValue }
                 );
                 setmaintainESD_2001(newValue);
             } catch (error) {
                 console.error(error);
             }
         };

    

         
         
              // =================================================================================================================== 

              const [SD_2001, setSD_2001] = useState<string | null>(null);
              const [inputValueSD_2001, setinputValueSD_2001] = useState<any>();
              const [inputValue2SD_2001, setinputValue2SD_2001] = useState<any>();
              const [SD_2001_High, setSD_2001_High] = useState<number | null>(null);
              const [SD_2001_Low, setSD_2001_Low] = useState<number | null>(null);
              const [exceedThresholdSD_2001, setexceedThresholdSD_2001] = useState(false); 
              const [maintainSD_2001, setmaintainSD_2001] = useState<boolean>(false);
              
              useEffect(() => {
                  const SD_2001Value = parseFloat(SD_2001 as any);
                  const highValue = SD_2001_High ?? NaN;
                  const lowValue = SD_2001_Low ?? NaN;
              
                  if (!isNaN(SD_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD_2001) {
                      setexceedThresholdSD_2001(SD_2001Value >= highValue || SD_2001Value <= lowValue);
                  }
              }, [SD_2001, SD_2001_High, SD_2001_Low, maintainSD_2001]);
              
              const handleInputChangeSD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueSD_2001(event.target.value);
              };
              
              const handleInputChange2SD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2SD_2001(event.target.value);
              };
              
              const ChangemaintainSD_2001 = async () => {
                  try {
                      const newValue = !maintainSD_2001;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                          { SD_2001_Maintain: newValue }
                      );
                      setmaintainSD_2001(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
     
    
    

         
              // =================================================================================================================== 


              const [SD_2002, setSD_2002] = useState<string | null>(null);
              const [inputValueSD_2002, setinputValueSD_2002] = useState<any>();
              const [inputValue2SD_2002, setinputValue2SD_2002] = useState<any>();
              const [SD_2002_High, setSD_2002_High] = useState<number | null>(null);
              const [SD_2002_Low, setSD_2002_Low] = useState<number | null>(null);
              const [exceedThresholdSD_2002, setexceedThresholdSD_2002] = useState(false); 
              const [maintainSD_2002, setmaintainSD_2002] = useState<boolean>(false);
              
              useEffect(() => {
                  const SD_2002Value = parseFloat(SD_2002 as any);
                  const highValue = SD_2002_High ?? NaN;
                  const lowValue = SD_2002_Low ?? NaN;
              
                  if (!isNaN(SD_2002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD_2002) {
                      setexceedThresholdSD_2002(SD_2002Value >= highValue || SD_2002Value <= lowValue);
                  }
              }, [SD_2002, SD_2002_High, SD_2002_Low, maintainSD_2002]);
              
              const handleInputChangeSD_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueSD_2002(event.target.value);
              };
              
              const handleInputChange2SD_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2SD_2002(event.target.value);
              };
              
              const ChangemaintainSD_2002 = async () => {
                  try {
                      const newValue = !maintainSD_2002;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                          { SD_2002_Maintain: newValue }
                      );
                      setmaintainSD_2002(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
     
    
     
         
              // =================================================================================================================== 
              const [EVC_01_Conn_STT, setEVC_01_Conn_STT] = useState<string | null>(null);
              const [inputValueEVC_01_Conn_STT, setinputValueEVC_01_Conn_STT] = useState<any>();
              const [inputValue2EVC_01_Conn_STT, setinputValue2EVC_01_Conn_STT] = useState<any>();
              const [EVC_01_Conn_STT_High, setEVC_01_Conn_STT_High] = useState<number | null>(null);
              const [EVC_01_Conn_STT_Low, setEVC_01_Conn_STT_Low] = useState<number | null>(null);
              const [exceedThresholdEVC_01_Conn_STT, setexceedThresholdEVC_01_Conn_STT] = useState(false); 
              const [maintainEVC_01_Conn_STT, setmaintainEVC_01_Conn_STT] = useState<boolean>(false);
              
              useEffect(() => {
                  const EVC_01_Conn_STTValue = parseFloat(EVC_01_Conn_STT as any);
                  const highValue = EVC_01_Conn_STT_High ?? NaN;
                  const lowValue = EVC_01_Conn_STT_Low ?? NaN;
              
                  if (!isNaN(EVC_01_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Conn_STT) {
                      setexceedThresholdEVC_01_Conn_STT(EVC_01_Conn_STTValue >= highValue || EVC_01_Conn_STTValue <= lowValue);
                  }
              }, [EVC_01_Conn_STT, EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low, maintainEVC_01_Conn_STT]);
              
              const handleInputChangeEVC_01_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueEVC_01_Conn_STT(event.target.value);
              };
              
              const handleInputChange2EVC_01_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2EVC_01_Conn_STT(event.target.value);
              };
              
              const ChangemaintainEVC_01_Conn_STT = async () => {
                  try {
                      const newValue = !maintainEVC_01_Conn_STT;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                          { EVC_01_Conn_STT_Maintain: newValue }
                      );
                      setmaintainEVC_01_Conn_STT(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
              
              
              
              const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);
              const [inputValueEVC_02_Conn_STT, setinputValueEVC_02_Conn_STT] = useState<any>();
              const [inputValue2EVC_02_Conn_STT, setinputValue2EVC_02_Conn_STT] = useState<any>();
              const [EVC_02_Conn_STT_High, setEVC_02_Conn_STT_High] = useState<number | null>(null);
              const [EVC_02_Conn_STT_Low, setEVC_02_Conn_STT_Low] = useState<number | null>(null);
              const [exceedThresholdEVC_02_Conn_STT, setexceedThresholdEVC_02_Conn_STT] = useState(false); 
              const [maintainEVC_02_Conn_STT, setmaintainEVC_02_Conn_STT] = useState<boolean>(false);
              
              useEffect(() => {
                  const EVC_02_Conn_STTValue = parseFloat(EVC_02_Conn_STT as any);
                  const highValue = EVC_02_Conn_STT_High ?? NaN;
                  const lowValue = EVC_02_Conn_STT_Low ?? NaN;
              
                  if (!isNaN(EVC_02_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Conn_STT) {
                      setexceedThresholdEVC_02_Conn_STT(EVC_02_Conn_STTValue >= highValue || EVC_02_Conn_STTValue <= lowValue);
                  }
              }, [EVC_02_Conn_STT, EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low, maintainEVC_02_Conn_STT]);
              
              const handleInputChangeEVC_02_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueEVC_02_Conn_STT(event.target.value);
              };
              
              const handleInputChange2EVC_02_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2EVC_02_Conn_STT(event.target.value);
              };
              
              const ChangemaintainEVC_02_Conn_STT = async () => {
                  try {
                      const newValue = !maintainEVC_02_Conn_STT;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                          { EVC_02_Conn_STT_Maintain: newValue }
                      );
                      setmaintainEVC_02_Conn_STT(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
              
              
              
              
              const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
              const [inputValuePLC_Conn_STT, setinputValuePLC_Conn_STT] = useState<any>();
              const [inputValue2PLC_Conn_STT, setinputValue2PLC_Conn_STT] = useState<any>();
              const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
              const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
              const [exceedThresholdPLC_Conn_STT, setexceedThresholdPLC_Conn_STT] = useState(false); 
              const [maintainPLC_Conn_STT, setmaintainPLC_Conn_STT] = useState<boolean>(false);
              
              useEffect(() => {
                  const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
                  const highValue = PLC_Conn_STT_High ?? NaN;
                  const lowValue = PLC_Conn_STT_Low ?? NaN;
              
                  if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
                      setexceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
                  }
              }, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);
              
              const handleInputChangePLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValuePLC_Conn_STT(event.target.value);
              };
              
              const handleInputChange2PLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2PLC_Conn_STT(event.target.value);
              };
              
              const ChangemaintainPLC_Conn_STT = async () => {
                  try {
                      const newValue = !maintainPLC_Conn_STT;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                          { PLC_Conn_STT_Maintain: newValue }
                      );
                      setmaintainPLC_Conn_STT(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
              
         
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,



                {
                    
               

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
                    PIT_2006_High: inputValuePIT_2006,PIT_2006_Low:inputValue2PIT_2006,

                    PT_2001_High: inputValuePT_2001,PT_2001_Low:inputValue2PT_2001,
                    PT_2002_High: inputValuePT_2002,PT_2002_Low:inputValue2PT_2002,
                    PT_2003_High: inputValuePT_2003,PT_2003_Low:inputValue2PT_2003,

                    TT_2001_High: inputValueTT_2001,TT_2001_Low:inputValue2TT_2001,
                    TT_2002_High: inputValueTT_2002,TT_2002_Low:inputValue2TT_2002,
                    GD_2001_High: inputValueGD_2001,GD_2001_Low:inputValue2GD_2001,

                    SDV_2001B_High: inputValueSDV_2001B,SDV_2001B_Low:inputValue2SDV_2001B,
                    SDV_2001A_High: inputValueSDV_2001A,SDV_2001A_Low:inputValue2SDV_2001A,
                    SDV_2002_High: inputValueSDV_2002,SDV_2002_Low:inputValue2SDV_2002,

                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,
                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,
                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,

                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    ESD_2001_High: inputValueESD_2001,ESD_2001_Low:inputValue2ESD_2001,
                    SD_2001_High: inputValueSD_2001,SD_2001_Low:inputValue2SD_2001,
                    SD_2002_High: inputValueSD_2002,SD_2002_Low:inputValue2SD_2002,

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


      EVC_01_Conn_STT_High:inputValueEVC_01_Conn_STT, EVC_01_Conn_STT_Low:inputValue2EVC_01_Conn_STT,

      EVC_02_Conn_STT_High:inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,
       PLC_Conn_STT_High:inputValuePLC_Conn_STT, PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,
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

        
            setEVC_01_Remain_Battery_Service_Life_High(inputValueEVC_01_Remain_Battery_Service_Life);
            setEVC_01_Remain_Battery_Service_Life_Low(inputValue2EVC_01_Remain_Battery_Service_Life);

            setEVC_01_Temperature_High(inputValueEVC_01_Temperature);
            setEVC_01_Temperature_Low(inputValue2EVC_01_Temperature);

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

            setEVC_01_Vb_of_Last_Day_High(inputValueEVC_01_Vb_of_Last_Day);
            setEVC_01_Vb_of_Last_Day_Low(inputValue2EVC_01_Vb_of_Last_Day);

            setEVC_01_Vm_of_Current_Day_High(inputValueEVC_01_Vm_of_Current_Day);
            setEVC_01_Vm_of_Current_Day_Low(inputValue2EVC_01_Vm_of_Current_Day);

            setEVC_01_Vm_of_Last_Day_High(inputValueEVC_01_Vm_of_Last_Day);
            setEVC_01_Vm_of_Last_Day_Low(inputValue2EVC_01_Vm_of_Last_Day);



            setEVC_02_Remain_Battery_Service_Life_High(inputValueEVC_02_Remain_Battery_Service_Life);
            setEVC_02_Remain_Battery_Service_Life_Low(inputValue2EVC_02_Remain_Battery_Service_Life);

            setEVC_02_Temperature_High(inputValueEVC_02_Temperature);
            setEVC_02_Temperature_Low(inputValue2EVC_02_Temperature);

            setEVC_02_Pressure_High(inputValueEVC_02_Pressure);
            setEVC_02_Pressure_Low(inputValue2EVC_02_Pressure);

            setEVC_02_Volume_at_Base_Condition_High(inputValueEVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_Low(inputValue2EVC_02_Volume_at_Base_Condition);

            setEVC_02_Volume_at_Measurement_Condition_High(inputValueEVC_02_Volume_at_Measurement_Condition);
            setEVC_02_Volume_at_Measurement_Condition_Low(inputValue2EVC_02_Volume_at_Measurement_Condition);

            setEVC_02_Flow_at_Base_Condition_High(inputValueEVC_02_Flow_at_Base_Condition);
            setEVC_02_Flow_at_Base_Condition_Low(inputValue2EVC_02_Flow_at_Base_Condition);


            setEVC_02_Flow_at_Measurement_Condition_High(inputValueEVC_02_Flow_at_Measurement_Condition);
            setEVC_02_Flow_at_Measurement_Condition_Low(inputValue2EVC_02_Flow_at_Measurement_Condition);

            setEVC_02_Vb_of_Current_Day_High(inputValueEVC_02_Vb_of_Current_Day);
            setEVC_02_Vb_of_Current_Day_Low(inputValue2EVC_02_Vb_of_Current_Day);

            setEVC_02_Vb_of_Last_Day_High(inputValueEVC_02_Vb_of_Last_Day);
            setEVC_02_Vb_of_Last_Day_Low(inputValue2EVC_02_Vb_of_Last_Day);
            
            setEVC_02_Vm_of_Current_Day_High(inputValueEVC_02_Vm_of_Current_Day);
            setEVC_02_Vm_of_Current_Day_Low(inputValue2EVC_02_Vm_of_Current_Day);

            setEVC_02_Vm_of_Last_Day_High(inputValueEVC_02_Vm_of_Last_Day);
            setEVC_02_Vm_of_Last_Day_Low(inputValue2EVC_02_Vm_of_Last_Day);

          

    

    


            setPIT_2007_High(inputValuePIT_2007);
            setPIT_2007_Low(inputValue2PIT_2007);

            setPIT_2006_High(inputValuePIT_2006);
            setPIT_2006_Low(inputValue2PIT_2006);

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

            setSDV_2002_High(inputValueSDV_2002);
            setSDV_2002_Low(inputValue2SDV_2002);

            setWater_LSW_High(inputValueWater_LSW);
            setWater_LSW_Low(inputValue2Water_LSW);

            setWater_PG_High(inputValueWater_PG);
            setWater_PG_Low(inputValue2Water_PG);

            setPUMP_1_High(inputValuePUMP_1);
            setPUMP_1_Low(inputValue2PUMP_1);

            setPUMP_2_High(inputValuePUMP_2);
            setPUMP_2_Low(inputValue2PUMP_2);


            setHEATER_1_High(inputValueHEATER_1);
            setHEATER_1_Low(inputValue2HEATER_1)
            

            setHEATER_2_High(inputValueHEATER_2);
            setHEATER_2_Low(inputValue2HEATER_2);

            setBOILER_High(inputValueBOILER);
            setBOILER_Low(inputValue2BOILER);

            setGD_STATUS_High(inputValueGD_STATUS);
            setGD_STATUS_Low(inputValue2GD_STATUS);

            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

            setESD_2001_High(inputValueESD_2001);
            setESD_2001_Low(inputValue2ESD_2001);

            setSD_2001_High(inputValueSD_2001);
            setSD_2001_Low(inputValue2SD_2001);



            setSD_2002_High(inputValueSD_2002);
            setSD_2002_Low(inputValue2SD_2002);
        


            setEVC_02_Conn_STT_High(inputValueEVC_02_Conn_STT);
            setEVC_02_Conn_STT_Low(inputValue2EVC_02_Conn_STT);


            setEVC_01_Conn_STT_High(inputValueEVC_01_Conn_STT);
            setEVC_01_Conn_STT_Low(inputValue2EVC_01_Conn_STT);

            setPLC_Conn_STT_High(inputValuePLC_Conn_STT);
            setPLC_Conn_STT_Low(inputValue2PLC_Conn_STT);

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
   
    

      



   


        setinputValueEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_High); 
        setinputValue2EVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_Low); 

        setinputValueEVC_01_Temperature(EVC_01_Temperature_High); 
        setinputValue2EVC_01_Temperature(EVC_01_Temperature_Low); 

        setinputValueEVC_01_Pressure(EVC_01_Pressure_High); 
        setinputValue2EVC_01_Pressure(EVC_01_Pressure_Low); 



        setinputValueEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_High); 
        setinputValue2EVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_Low); 

        setinputValueEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_High); 
        setinputValue2EVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_Low); 

        setinputValueEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_High); 
        setinputValue2EVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_Low); 
        

        setinputValueEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_High); 
        setinputValue2EVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_Low); 

        setinputValueEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_High); 
        setinputValue2EVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_Low); 

        setinputValueEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_High); 
        setinputValue2EVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_Low); 

        setinputValueEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_High); 
        setinputValue2EVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Low); 

        setinputValueEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_High); 
        setinputValue2EVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Low); 

        setinputValueEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_High); 
        setinputValue2EVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Low); 

        setinputValueEVC_02_Temperature(EVC_02_Temperature_High); 
        setinputValue2EVC_02_Temperature(EVC_02_Temperature_Low); 

        setinputValueEVC_02_Pressure(EVC_02_Pressure_High); 
        setinputValue2EVC_02_Pressure(EVC_02_Pressure_Low); 

        setinputValueEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_High); 
        setinputValue2EVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Low); 


        setinputValueEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_High); 
        setinputValue2EVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Low); 

        setinputValueEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_High); 
        setinputValue2EVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Low); 


        setinputValueEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_High); 
        setinputValue2EVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Low); 


        setinputValueEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_High); 
        setinputValue2EVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Low); 

        setinputValueEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_High); 
        setinputValue2EVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Low); 


        setinputValueEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_High); 
        setinputValue2EVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Low); 

        setinputValueEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_High); 
        setinputValue2EVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Low); 




     






        setinputValuePIT_2006(PIT_2006_High); 
        setinputValue2PIT_2006(PIT_2006_Low); 

        setinputValuePIT_2007(PIT_2007_High); 
        setinputValue2PIT_2007(PIT_2007_Low); 

        setinputValuePT_2001(PT_2001_High); 
        setinputValue2PT_2001(PT_2001_Low); 

        setinputValuePT_2002(PT_2002_High); 
        setinputValue2PT_2002(PT_2002_Low); 
        
        setinputValuePT_2003(PT_2003_High); 
        setinputValue2PT_2003(PT_2003_Low); 

        setinputValueTT_2001(TT_2001_High); 
        setinputValue2TT_2001(TT_2001_Low); 

  
        setinputValueTT_2002(TT_2002_High); 
        setinputValue2TT_2002(TT_2002_Low); 

        setinputValueGD_2001(GD_2001_High); 
        setinputValue2GD_2001(GD_2001_Low); 


        setinputValueSDV_2001A(SDV_2001A_High); 
        setinputValue2SDV_2001A(SDV_2001A_Low); 

        setinputValueSDV_2001B(SDV_2001B_High); 
        setinputValue2SDV_2001B(SDV_2001B_Low); 

        setinputValueSDV_2002(SDV_2002_High); 
        setinputValue2SDV_2002(SDV_2002_Low); 

        setinputValueWater_PG(Water_PG_High); 
        setinputValue2Water_PG(Water_PG_Low); 

        setinputValueWater_LSW(Water_LSW_High); 
        setinputValue2Water_LSW(Water_LSW_Low); 

        setinputValuePUMP_1(PUMP_1_High); 
        setinputValue2PUMP_1(PUMP_1_Low); 

        setinputValuePUMP_2(PUMP_2_High); 
        setinputValue2PUMP_2(PUMP_2_Low); 


        setinputValueHEATER_1(HEATER_1_High); 
        setinputValue2HEATER_1(HEATER_1_Low); 

        setinputValueHEATER_2(HEATER_2_High); 
        setinputValue2HEATER_2(HEATER_2_Low); 





        setinputValueBOILER(BOILER_High); 
        setinputValue2BOILER(BOILER_Low);
        


        setinputValueGD_STATUS(GD_STATUS_High); 
        setinputValue2GD_STATUS(GD_STATUS_Low); 

        setinputValueHR_BC(HR_BC_High); 
        setinputValue2HR_BC(HR_BC_Low); 

        setinputValueESD_2001(ESD_2001_High); 
        setinputValue2ESD_2001(ESD_2001_Low); 

        setinputValueSD_2001(SD_2001_High); 
        setinputValue2SD_2001(SD_2001_Low); 

        setinputValueSD_2002(SD_2002_High); 
        setinputValue2SD_2002(SD_2002_Low); 


        setinputValueEVC_01_Conn_STT(EVC_01_Conn_STT_High)
        setinputValue2EVC_01_Conn_STT(EVC_01_Conn_STT_Low)

        setinputValueEVC_02_Conn_STT(EVC_02_Conn_STT_High)
        setinputValue2EVC_02_Conn_STT(EVC_02_Conn_STT_Low)


        setinputValuePLC_Conn_STT(PLC_Conn_STT_High)
        setinputValue2PLC_Conn_STT(PLC_Conn_STT_Low)

    }, [
        
 
        
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
        PIT_2007_High, PIT_2007_Low ,

        PT_2001_High, PT_2001_Low ,
        PT_2002_High,PT_2002_Low,
        PT_2003_High,PT_2003_Low,

         TT_2001_High,TT_2001_Low ,
          TT_2002_High,TT_2002_Low,
          
          GD_2001_High,GD_2001_Low ,
        
           SDV_2001A_High,SDV_2001A_Low,
           SDV_2001B_High,SDV_2001B_Low,
           SDV_2002_High,SDV_2002_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,

           HR_BC_High, HR_BC_Low ,
           ESD_2001_High,ESD_2001_Low,

           SD_2001_High,SD_2001_Low,
            SD_2002_High,SD_2002_Low ,

           getWayPhoneOTSUKA,
           PCV_2001A,
           PCV_2001B,
           PCV_2002A,
           PCV_2002B,

           PSV_2001A,
           PSV_2001B,
           PSV_2002A,
           PSV_2002B,

           timeEVC_01,timeEVC_02,


           EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low ,
           EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low ,
           PLC_Conn_STT_High, PLC_Conn_STT_Low ,
        ]);


        const handleMainTainAll = async (checked:any) => {
            try {
                const newEVC_01_Remain_Battery_Service_Life = checked;
                const newEVC_01_Temperature = checked;
                const newEVC_01_Pressure = checked;
                const newEVC_01_Volume_at_Base_Condition = checked;
                const newEVC_01_Volume_at_Measurement_Condition = checked;
                const newEVC_01_Flow_at_Base_Condition = checked;
                const newEVC_01_Flow_at_Measurement_Condition = checked;
                const newEVC_01_Vb_of_Current_Day = checked;
                const newEVC_01_Vm_of_Current_Day = checked;
                const newEVC_01_Vb_of_Last_Day = checked;
                const newEVC_01_Vm_of_Last_Day = checked;
                const newEVC_01_Conn_STT = checked;
        
                const newEVC_02_Remain_Battery_Service_Life = checked;
                const newEVC_02_Temperature = checked;
                const newEVC_02_Pressure = checked;
                const newEVC_02_Volume_at_Base_Condition = checked;
                const newEVC_02_Volume_at_Measurement_Condition = checked;
                const newEVC_02_Flow_at_Base_Condition = checked;
                const newEVC_02_Flow_at_Measurement_Condition = checked;
                const newEVC_02_Vb_of_Current_Day = checked;
                const newEVC_02_Vm_of_Current_Day = checked;
                const newEVC_02_Vb_of_Last_Day = checked;
                const newEVC_02_Vm_of_Last_Day = checked;
                const newEVC_02_Conn_STT = checked;
        
                const newPIT_2006 = checked;
                const newPIT_2007 = checked;
                const newPT_2001 = checked;
                const newPT_2002 = checked;
                const newPT_2003 = checked;
                const newTT_2001 = checked;
                const newTT_2002 = checked;
                const newGD_2001 = checked;
                const newSDV_2001A = checked;
                const newSDV_2001B = checked;
                const newSDV_2002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD_2001 = checked;
                const newHR_BC = checked;
                const newSD_2001 = checked;
                const newSD_2002 = checked;
                const newPLC_Conn_STT = checked;

            

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    {
                        EVC_01_Remain_Battery_Service_Life_Maintain: newEVC_01_Remain_Battery_Service_Life,
                        EVC_01_Temperature_Maintain: newEVC_01_Temperature,
                        EVC_01_Pressure_Maintain: newEVC_01_Pressure,
                        EVC_01_Volume_at_Base_Condition_Maintain: newEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition_Maintain: newEVC_01_Volume_at_Measurement_Condition,
                        EVC_01_Flow_at_Base_Condition_Maintain: newEVC_01_Flow_at_Base_Condition,
                        EVC_01_Flow_at_Measurement_Condition_Maintain: newEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Vb_of_Current_Day_Maintain: newEVC_01_Vb_of_Current_Day,
                        EVC_01_Vm_of_Current_Day_Maintain: newEVC_01_Vm_of_Current_Day,
                        EVC_01_Vb_of_Last_Day_Maintain: newEVC_01_Vb_of_Last_Day,
                        EVC_01_Vm_of_Last_Day_Maintain: newEVC_01_Vm_of_Last_Day,
                        EVC_01_Conn_STT_Maintain: newEVC_01_Conn_STT,
        
                        EVC_02_Remain_Battery_Service_Life_Maintain: newEVC_02_Remain_Battery_Service_Life,
                        EVC_02_Temperature_Maintain: newEVC_02_Temperature,
                        EVC_02_Pressure_Maintain: newEVC_02_Pressure,
                        EVC_02_Volume_at_Base_Condition_Maintain: newEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition_Maintain: newEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition_Maintain: newEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition_Maintain: newEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Vb_of_Current_Day_Maintain: newEVC_02_Vb_of_Current_Day,
                        EVC_02_Vm_of_Current_Day_Maintain: newEVC_02_Vm_of_Current_Day,
                        EVC_02_Vb_of_Last_Day_Maintain: newEVC_02_Vb_of_Last_Day,
                        EVC_02_Vm_of_Last_Day_Maintain: newEVC_02_Vm_of_Last_Day,
                        EVC_02_Conn_STT_Maintain: newEVC_02_Conn_STT,
        
                        PIT_2006_Maintain: newPIT_2006,
                        PIT_2007_Maintain: newPIT_2007,
                        PT_2001_Maintain: newPT_2001,
                        PT_2002_Maintain: newPT_2002,
                        PT_2003_Maintain: newPT_2003,
                        TT_2001_Maintain: newTT_2001,
                        TT_2002_Maintain: newTT_2002,
                        GD_2001_Maintain: newGD_2001,
                        SDV_2001A_Maintain: newSDV_2001A,
                        SDV_2001B_Maintain: newSDV_2001B,
                        SDV_2002_Maintain: newSDV_2002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_2001_Maintain: newESD_2001,
                        HR_BC_Maintain: newHR_BC,
                        SD_2001_Maintain: newSD_2001,
                        SD_2002_Maintain: newSD_2002,
                        PLC_Conn_STT_Maintain: newPLC_Conn_STT,

                    }
                );
        
                // Update state values
      setmaintainEVC_01_Remain_Battery_Service_Life(newEVC_01_Remain_Battery_Service_Life);
setmaintainEVC_01_Temperature(newEVC_01_Temperature);
setmaintainEVC_01_Pressure(newEVC_01_Pressure);
setmaintainEVC_01_Volume_at_Base_Condition(newEVC_01_Volume_at_Base_Condition);
setmaintainEVC_01_Volume_at_Measurement_Condition(newEVC_01_Volume_at_Measurement_Condition);
setmaintainEVC_01_Flow_at_Base_Condition(newEVC_01_Flow_at_Base_Condition);
setmaintainEVC_01_Flow_at_Measurement_Condition(newEVC_01_Flow_at_Measurement_Condition);
setmaintainEVC_01_Vb_of_Current_Day(newEVC_01_Vb_of_Current_Day);
setmaintainEVC_01_Vm_of_Current_Day(newEVC_01_Vm_of_Current_Day);
setmaintainEVC_01_Vb_of_Last_Day(newEVC_01_Vb_of_Last_Day);
setmaintainEVC_01_Vm_of_Last_Day(newEVC_01_Vm_of_Last_Day);

setmaintainEVC_01_Conn_STT(newEVC_01_Conn_STT);


setmaintainEVC_02_Remain_Battery_Service_Life(newEVC_02_Remain_Battery_Service_Life);
setmaintainEVC_02_Temperature(newEVC_02_Temperature);
setmaintainEVC_02_Pressure(newEVC_02_Pressure);
setmaintainEVC_02_Volume_at_Base_Condition(newEVC_02_Volume_at_Base_Condition);
setmaintainEVC_02_Volume_at_Measurement_Condition(newEVC_02_Volume_at_Measurement_Condition);
setmaintainEVC_02_Flow_at_Base_Condition(newEVC_02_Flow_at_Base_Condition);
setmaintainEVC_02_Flow_at_Measurement_Condition(newEVC_02_Flow_at_Measurement_Condition);
setmaintainEVC_02_Vb_of_Current_Day(newEVC_02_Vb_of_Current_Day);
setmaintainEVC_02_Vm_of_Current_Day(newEVC_02_Vm_of_Current_Day);
setmaintainEVC_02_Vb_of_Last_Day(newEVC_02_Vb_of_Last_Day);
setmaintainEVC_02_Vm_of_Last_Day(newEVC_02_Vm_of_Last_Day);
setmaintainEVC_02_Conn_STT(newEVC_02_Conn_STT);


setmaintainPIT_2006(newPIT_2006);
setmaintainPIT_2007(newPIT_2007);
setmaintainPT_2001(newPT_2001);
setmaintainPT_2002(newPT_2002);
setmaintainPT_2003(newPT_2003);
setmaintainTT_2001(newTT_2001);
setmaintainTT_2002(newTT_2002);
setmaintainGD_2001(newGD_2001);
setmaintainSDV_2001A(newSDV_2001A);
setmaintainSDV_2001B(newSDV_2001B);
setmaintainSDV_2002(newSDV_2002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD_2001(newESD_2001);
setmaintainHR_BC(newHR_BC);
setmaintainSD_2001(newSD_2001);
setmaintainSD_2002(newSD_2002);

setmaintainPLC_Conn_STT(newPLC_Conn_STT);


            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };





        const handleMaintainingAll =     
        maintainEVC_01_Remain_Battery_Service_Life === true &&
        maintainEVC_01_Temperature === true &&
        maintainEVC_01_Pressure === true &&
        maintainEVC_01_Volume_at_Base_Condition === true &&
        maintainEVC_01_Volume_at_Measurement_Condition === true &&
        maintainEVC_01_Flow_at_Base_Condition === true &&
        maintainEVC_01_Flow_at_Measurement_Condition === true &&
        maintainEVC_01_Vb_of_Current_Day === true &&
        maintainEVC_01_Vm_of_Current_Day === true &&
        maintainEVC_01_Vb_of_Last_Day === true &&
        maintainEVC_01_Vm_of_Last_Day === true &&
        maintainEVC_02_Remain_Battery_Service_Life === true &&
        maintainEVC_02_Temperature === true &&
        maintainEVC_02_Pressure === true &&
        maintainEVC_02_Volume_at_Base_Condition === true &&
        maintainEVC_02_Volume_at_Measurement_Condition === true &&
        maintainEVC_02_Flow_at_Base_Condition === true &&
        maintainEVC_02_Flow_at_Measurement_Condition === true &&
        maintainEVC_02_Vb_of_Current_Day === true &&
        maintainEVC_02_Vm_of_Current_Day === true &&
        maintainEVC_02_Vb_of_Last_Day === true &&
        maintainEVC_02_Vm_of_Last_Day === true &&
        maintainPIT_2006 === true &&
        maintainPIT_2007 === true &&
        maintainPT_2001 === true &&
        maintainPT_2002 === true &&
        maintainPT_2003 === true &&
        maintainTT_2001 === true &&
        maintainTT_2002 === true &&
        maintainGD_2001 === true &&
        maintainSDV_2001A === true &&
        maintainSDV_2001B === true &&
        maintainSDV_2002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD_2001 === true &&
        maintainHR_BC === true &&
        maintainSD_2001 === true &&
        maintainSD_2002 === true &&
        maintainEVC_01_Conn_STT === true && 
        maintainEVC_02_Conn_STT === true && 
        maintainPLC_Conn_STT === true ;

        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainAll(isChecked);
        };
//====================================================================================================================

     
     
        const handleMainTainEVC01 = async (checked:any) => {
            try {
                const newEVC_01_Remain_Battery_Service_Life = checked;
                const newEVC_01_Temperature = checked;
                const newEVC_01_Pressure = checked;
                const newEVC_01_Volume_at_Base_Condition = checked;
                const newEVC_01_Volume_at_Measurement_Condition = checked;
                const newEVC_01_Flow_at_Base_Condition = checked;
                const newEVC_01_Flow_at_Measurement_Condition = checked;
                const newEVC_01_Vb_of_Current_Day = checked;
                const newEVC_01_Vm_of_Current_Day = checked;
                const newEVC_01_Vb_of_Last_Day = checked;
                const newEVC_01_Vm_of_Last_Day = checked;
                const newEVC_01_Conn_STT = checked;
        

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    {
                        EVC_01_Remain_Battery_Service_Life_Maintain: newEVC_01_Remain_Battery_Service_Life,
                        EVC_01_Temperature_Maintain: newEVC_01_Temperature,
                        EVC_01_Pressure_Maintain: newEVC_01_Pressure,
                        EVC_01_Volume_at_Base_Condition_Maintain: newEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition_Maintain: newEVC_01_Volume_at_Measurement_Condition,
                        EVC_01_Flow_at_Base_Condition_Maintain: newEVC_01_Flow_at_Base_Condition,
                        EVC_01_Flow_at_Measurement_Condition_Maintain: newEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Vb_of_Current_Day_Maintain: newEVC_01_Vb_of_Current_Day,
                        EVC_01_Vm_of_Current_Day_Maintain: newEVC_01_Vm_of_Current_Day,
                        EVC_01_Vb_of_Last_Day_Maintain: newEVC_01_Vb_of_Last_Day,
                        EVC_01_Vm_of_Last_Day_Maintain: newEVC_01_Vm_of_Last_Day,
                        EVC_01_Conn_STT_Maintain: newEVC_01_Conn_STT,
        
                 
                    }
                );
        
                // Update state values
      setmaintainEVC_01_Remain_Battery_Service_Life(newEVC_01_Remain_Battery_Service_Life);
setmaintainEVC_01_Temperature(newEVC_01_Temperature);
setmaintainEVC_01_Pressure(newEVC_01_Pressure);
setmaintainEVC_01_Volume_at_Base_Condition(newEVC_01_Volume_at_Base_Condition);
setmaintainEVC_01_Volume_at_Measurement_Condition(newEVC_01_Volume_at_Measurement_Condition);
setmaintainEVC_01_Flow_at_Base_Condition(newEVC_01_Flow_at_Base_Condition);
setmaintainEVC_01_Flow_at_Measurement_Condition(newEVC_01_Flow_at_Measurement_Condition);
setmaintainEVC_01_Vb_of_Current_Day(newEVC_01_Vb_of_Current_Day);
setmaintainEVC_01_Vm_of_Current_Day(newEVC_01_Vm_of_Current_Day);
setmaintainEVC_01_Vb_of_Last_Day(newEVC_01_Vb_of_Last_Day);
setmaintainEVC_01_Vm_of_Last_Day(newEVC_01_Vm_of_Last_Day);
setmaintainEVC_01_Conn_STT(newEVC_01_Conn_STT);



            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };


        const handleCheckboxChangeEVC01 = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainEVC01(isChecked);
        };

        const checkMaintainingEVC01 = 
        maintainEVC_01_Remain_Battery_Service_Life === true &&
        maintainEVC_01_Temperature === true &&
        maintainEVC_01_Pressure === true &&
        maintainEVC_01_Volume_at_Base_Condition === true &&
        maintainEVC_01_Volume_at_Measurement_Condition === true &&
        maintainEVC_01_Flow_at_Base_Condition === true &&
        maintainEVC_01_Flow_at_Measurement_Condition === true &&
        maintainEVC_01_Vb_of_Current_Day === true &&
        maintainEVC_01_Vm_of_Current_Day === true &&
        maintainEVC_01_Vb_of_Last_Day === true &&
        maintainEVC_01_Vm_of_Last_Day === true && 
        maintainEVC_01_Conn_STT === true; 

//=======================================================================================================
        const handleMainTainEVC02 = async (checked:any) => {
            try {
             
        
                const newEVC_02_Remain_Battery_Service_Life = checked;
                const newEVC_02_Temperature = checked;
                const newEVC_02_Pressure = checked;
                const newEVC_02_Volume_at_Base_Condition = checked;
                const newEVC_02_Volume_at_Measurement_Condition = checked;
                const newEVC_02_Flow_at_Base_Condition = checked;
                const newEVC_02_Flow_at_Measurement_Condition = checked;
                const newEVC_02_Vb_of_Current_Day = checked;
                const newEVC_02_Vm_of_Current_Day = checked;
                const newEVC_02_Vb_of_Last_Day = checked;
                const newEVC_02_Vm_of_Last_Day = checked;
                const newEVC_02_Conn_STT = checked;
        
         
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    {
       
                        EVC_02_Remain_Battery_Service_Life_Maintain: newEVC_02_Remain_Battery_Service_Life,
                        EVC_02_Temperature_Maintain: newEVC_02_Temperature,
                        EVC_02_Pressure_Maintain: newEVC_02_Pressure,
                        EVC_02_Volume_at_Base_Condition_Maintain: newEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition_Maintain: newEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition_Maintain: newEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition_Maintain: newEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Vb_of_Current_Day_Maintain: newEVC_02_Vb_of_Current_Day,
                        EVC_02_Vm_of_Current_Day_Maintain: newEVC_02_Vm_of_Current_Day,
                        EVC_02_Vb_of_Last_Day_Maintain: newEVC_02_Vb_of_Last_Day,
                        EVC_02_Vm_of_Last_Day_Maintain: newEVC_02_Vm_of_Last_Day,
                        EVC_02_Conn_STT_Maintain: newEVC_02_Conn_STT,
        
                  
                    }
                );
        
                // Update state values


setmaintainEVC_02_Remain_Battery_Service_Life(newEVC_02_Remain_Battery_Service_Life);
setmaintainEVC_02_Temperature(newEVC_02_Temperature);
setmaintainEVC_02_Pressure(newEVC_02_Pressure);
setmaintainEVC_02_Volume_at_Base_Condition(newEVC_02_Volume_at_Base_Condition);
setmaintainEVC_02_Volume_at_Measurement_Condition(newEVC_02_Volume_at_Measurement_Condition);
setmaintainEVC_02_Flow_at_Base_Condition(newEVC_02_Flow_at_Base_Condition);
setmaintainEVC_02_Flow_at_Measurement_Condition(newEVC_02_Flow_at_Measurement_Condition);
setmaintainEVC_02_Vb_of_Current_Day(newEVC_02_Vb_of_Current_Day);
setmaintainEVC_02_Vm_of_Current_Day(newEVC_02_Vm_of_Current_Day);
setmaintainEVC_02_Vb_of_Last_Day(newEVC_02_Vb_of_Last_Day);
setmaintainEVC_02_Vm_of_Last_Day(newEVC_02_Vm_of_Last_Day);
setmaintainEVC_02_Conn_STT(newEVC_02_Conn_STT);



            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };

    const handleCheckboxChangeEVC02 = (e:any) => {
        const isChecked = e.checked;
    
        handleMainTainEVC02(isChecked);
    };
    const checkMaintainingEVC02 = 
    maintainEVC_02_Remain_Battery_Service_Life === true &&
    maintainEVC_02_Temperature === true &&
    maintainEVC_02_Pressure === true &&
    maintainEVC_02_Volume_at_Base_Condition === true &&
    maintainEVC_02_Volume_at_Measurement_Condition === true &&
    maintainEVC_02_Flow_at_Base_Condition === true &&
    maintainEVC_02_Flow_at_Measurement_Condition === true &&
    maintainEVC_02_Vb_of_Current_Day === true &&
    maintainEVC_02_Vm_of_Current_Day === true &&
    maintainEVC_02_Vb_of_Last_Day === true &&
    maintainEVC_02_Vm_of_Last_Day === true && 
    maintainEVC_02_Conn_STT === true; 
        //===========================================================================
        const handleMainTainPLC = async (checked:any) => {
            try {
              
        
                const newPIT_2006 = checked;
                const newPIT_2007 = checked;
                const newPT_2001 = checked;
                const newPT_2002 = checked;
                const newPT_2003 = checked;
                const newTT_2001 = checked;
                const newTT_2002 = checked;
                const newGD_2001 = checked;
                const newSDV_2001A = checked;
                const newSDV_2001B = checked;
                const newSDV_2002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD_2001 = checked;
                const newHR_BC = checked;
                const newSD_2001 = checked;
                const newSD_2002 = checked;
                const newPLC_Conn_STT = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_BinhDuong}/SERVER_SCOPE`,
                    {
                      
        
                        PIT_2006_Maintain: newPIT_2006,
                        PIT_2007_Maintain: newPIT_2007,
                        PT_2001_Maintain: newPT_2001,
                        PT_2002_Maintain: newPT_2002,
                        PT_2003_Maintain: newPT_2003,
                        TT_2001_Maintain: newTT_2001,
                        TT_2002_Maintain: newTT_2002,
                        GD_2001_Maintain: newGD_2001,
                        SDV_2001A_Maintain: newSDV_2001A,
                        SDV_2001B_Maintain: newSDV_2001B,
                        SDV_2002_Maintain: newSDV_2002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_2001_Maintain: newESD_2001,
                        HR_BC_Maintain: newHR_BC,
                        SD_2001_Maintain: newSD_2001,
                        SD_2002_Maintain: newSD_2002,
                        PLC_Conn_STT_Maintain: newPLC_Conn_STT,

                    }
                );
        

setmaintainPIT_2006(newPIT_2006);
setmaintainPIT_2007(newPIT_2007);
setmaintainPT_2001(newPT_2001);
setmaintainPT_2002(newPT_2002);
setmaintainPT_2003(newPT_2003);
setmaintainTT_2001(newTT_2001);
setmaintainTT_2002(newTT_2002);
setmaintainGD_2001(newGD_2001);
setmaintainSDV_2001A(newSDV_2001A);
setmaintainSDV_2001B(newSDV_2001B);
setmaintainSDV_2002(newSDV_2002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD_2001(newESD_2001);
setmaintainHR_BC(newHR_BC);
setmaintainSD_2001(newSD_2001);
setmaintainSD_2002(newSD_2002);
setmaintainPLC_Conn_STT(newPLC_Conn_STT);

            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };


        const checkMaintaining = 
        maintainPIT_2006 === true &&
        maintainPIT_2007 === true &&
        maintainPT_2001 === true &&
        maintainPT_2002 === true &&
        maintainPT_2003 === true &&
        maintainTT_2001 === true &&
        maintainTT_2002 === true &&
        maintainGD_2001 === true &&
        maintainSDV_2001A === true &&
        maintainSDV_2001B === true &&
        maintainSDV_2002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD_2001 === true &&
        maintainHR_BC === true &&
        maintainSD_2001 === true &&
        maintainSD_2002 === true &&
        maintainPLC_Conn_STT === true;


        const handleCheckboxChangePLC = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainPLC(isChecked);
        };

        

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
            color:exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature
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

     

        CSSEVC_02_Pressure : {
            color:exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
            ? "#ff5656"
            : maintainEVC_02_Pressure
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
            color:exceedThresholdPIT_2007 && !maintainPIT_2007
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


        CSS_EVC_01_Conn_STT: {
            color:exceedThresholdEVC_01_Conn_STT && !maintainEVC_01_Conn_STT
            ? "#ff5656"
            : maintainEVC_01_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
            
        },
          CSS_PLC_Conn_STT: {
            color:exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT
            ? "#ff5656"
            : maintainPLC_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSS_EVC_02_Conn_STT: {
            color:exceedThresholdEVC_02_Conn_STT && !maintainEVC_02_Conn_STT
            ? "#ff5656"
            : maintainEVC_02_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
  };
    
  const mainCategoryFC = {
    EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-2001A -  Parameter & configuration
   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox disabled={TECH_OPER}
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC01}
            checked={checkMaintainingEVC01}
        />
     <p style={{fontSize:15}}>Maintain EVC-2001A </p>  </div> </span>,
    EVC02: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-2001B -  Parameter & configuration
   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox disabled={TECH_OPER}
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC02}
            checked={checkMaintainingEVC02}
        />
     <p style={{fontSize:15}}>Maintain EVC-2001B </p>  </div> </span>,
    PLC: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameters & Configurations   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox disabled={TECH_OPER}
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangePLC}
            checked={checkMaintaining}
        />
     <p style={{fontSize:15}}>Maintain PLC</p>  </div>  </span>
};

const valueCNGbd = {
    C_O : "0: Close - 1: Open",
    N_P:"0: Normal - 1: Pressure Low",
    N_W:"0: Normal - 1: Water Low",
    S_R:"0: Stop - 1: Run",
    M_AU:"0: Manual - 1: Auto",
    M_AL:"0: Normal - 1: Alarm",
    N_A:"0: Not Active - 1: Active",
    N_S:"0: Normal - 1: Smoker Detected",
    N_C_E:"0: Not Init - 1: COM OK - 2: Error",
}

const dataSDV_2001A = SDV_2001A === "0" ? "Close" : SDV_2001A === "1" ? "Open" : null;
const dataSDV_2001B = SDV_2001B === "0" ? "Close" : SDV_2001B === "1" ? "Open" : null;
const dataSDV_2002 = SDV_2002 === "0" ? "Close" : SDV_2002 === "1" ? "Open" : null;
const dataWater_PG = Water_PG === "0" ? "Normal" : Water_PG === "1" ? "Pressure Low" : null;
const dataWater_LSW = Water_LSW === "0" ? "Normal" : Water_LSW === "1" ? "Water Low" : null;
const dataPUMP_1 = PUMP_1 === "0" ? "Stop" : PUMP_1 === "1" ? "Run" : null;
const dataPUMP_2 = PUMP_2 === "0" ? "Stop" : PUMP_2 === "1" ? "Run" : null;
const dataHEATER_1 = HEATER_1 === "0" ? "Stop" : HEATER_1 === "1" ? "Run" : null;
const dataHEATER_2 = HEATER_2 === "0" ? "Stop" : HEATER_2 === "1" ? "Run" : null;
const dataBOILER = BOILER === "0" ? "Manual" : BOILER === "1" ? "Auto" : null;
const dataGD_STATUS = GD_STATUS === "0" ? "Normal" : GD_STATUS === "1" ? "Alarm" : null;
const dataESD_2001 = ESD_2001 === "0" ? "Not Active" : ESD_2001 === "1" ? "Active" : null;
const dataHR_BC = HR_BC === "0" ? "Normal" : HR_BC === "1" ? "Alarm" : null;
const dataSD_2001 = SD_2001 === "0" ? "Normal" : SD_2001 === "1" ? "Smoker Detected" : null;
const dataSD_2002 = SD_2002 === "0" ? "Normal" : SD_2002 === "1" ? "Smoker Detected" : null;

const DataEVC_01_Conn_STT = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null
const DataEVC_02_Conn_STT = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null
const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null


const formatValue = (value:any) => {
    return value !== null
        ? new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true, 
          }).format(parseFloat(value))
        : "";
};


const dataEVC01 = [
    {
        mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSSEVC_01_Pressure}>Output Pressure</span> ,

    modbus: <span style={combineCss.CSSEVC_01_Pressure}>40853	 </span> ,

   value: <span style={combineCss.CSSEVC_01_Pressure} > {formatValue(EVC_01_Pressure)} {nameValue.Bara}</span> , 
    high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
    low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
    Maintain:   <Checkbox disabled={TECH_OPER}
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_01_Pressure}
    checked={maintainEVC_01_Pressure}
></Checkbox>

   },
   {
    mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSEVC_01_Temperature} >{EVC_STT01Value}</span>,
 name: <span style={combineCss.CSSEVC_01_Temperature}>Temperature</span> ,

 modbus: <span style={combineCss.CSSEVC_01_Temperature}>40851	 </span> ,

value: <span style={combineCss.CSSEVC_01_Temperature} > {formatValue(EVC_01_Temperature)}  {nameValue.C}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangemaintainEVC_01_Temperature}
 checked={maintainEVC_01_Temperature}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40859	 </span> ,

value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {formatValue(EVC_01_Flow_at_Base_Condition)} {nameValue.Sm3h}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Flow_at_Base_Condition}
checked={maintainEVC_01_Flow_at_Base_Condition}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>Gross Volume Flow</span> ,

modbus: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>40861	 </span> ,

value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {formatValue(EVC_01_Flow_at_Measurement_Condition)} {nameValue.m3h} </span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Flow_at_Measurement_Condition}
checked={maintainEVC_01_Flow_at_Measurement_Condition}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}> Standard Volume Accumulated</span> ,

modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40855	 </span> ,

value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {formatValue(EVC_01_Volume_at_Base_Condition)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Volume_at_Base_Condition}
checked={maintainEVC_01_Volume_at_Base_Condition}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>Gross Volume Accumulated</span> ,

modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40857	 </span> ,

value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {formatValue(EVC_01_Volume_at_Measurement_Condition)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Volume_at_Measurement_Condition}
checked={maintainEVC_01_Volume_at_Measurement_Condition}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40863	 </span> ,

value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {formatValue(EVC_01_Vb_of_Current_Day)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Vb_of_Current_Day}
checked={maintainEVC_01_Vb_of_Current_Day}
></Checkbox>

},

{
        mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>Gross Volume Vm Today</span> ,

modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40865	 </span> ,

value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {formatValue(EVC_01_Vm_of_Current_Day)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Vm_of_Current_Day}
checked={maintainEVC_01_Vm_of_Current_Day}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>Standard Volume Vb Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40867	 </span> ,

value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {formatValue(EVC_01_Vb_of_Last_Day)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Vb_of_Last_Day}
checked={maintainEVC_01_Vb_of_Last_Day}
></Checkbox>

},   
{
        mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>Gross Volume Vm Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40869	 </span> ,

value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {formatValue(EVC_01_Vm_of_Last_Day)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Vm_of_Last_Day}
checked={maintainEVC_01_Vm_of_Last_Day}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
 name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,

 modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40002	 </span> ,

value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {formatValue(EVC_01_Remain_Battery_Service_Life)} {nameValue.month}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangemaintainEVC_01_Remain_Battery_Service_Life}
 checked={maintainEVC_01_Remain_Battery_Service_Life}
></Checkbox>

},
{ 
mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSS_EVC_01_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_EVC_01_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_EVC_01_Conn_STT}> EVC Connection Status</span> ,

value: <span style={combineCss.CSS_EVC_01_Conn_STT} > {formatValue(EVC_01_Conn_STT)} {DataEVC_01_Conn_STT}</span>, 
high: <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_EVC_01_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Conn_STT} onChange={handleInputChangeEVC_01_Conn_STT} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_EVC_01_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Conn_STT} onChange={handleInputChange2EVC_01_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_01_Conn_STT}
checked={maintainEVC_01_Conn_STT}
></Checkbox>

},
  ]


  const dataEVC02 = [
    {
        mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Pressure}>Output Pressure</span> ,

modbus: <span style={combineCss.CSSEVC_02_Pressure}>40853	 </span> ,

value: <span style={combineCss.CSSEVC_02_Pressure} > {formatValue(EVC_02_Pressure)} {nameValue.Bara}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Pressure}
checked={maintainEVC_02_Pressure}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Temperature}>Temperature</span> ,

modbus: <span style={combineCss.CSSEVC_02_Temperature}>40851	 </span> ,

value: <span style={combineCss.CSSEVC_02_Temperature} > {formatValue(EVC_02_Temperature)} {nameValue.C}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Temperature}
checked={maintainEVC_02_Temperature}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40859	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {formatValue(EVC_02_Flow_at_Base_Condition)} {nameValue.Sm3h}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Flow_at_Base_Condition}
checked={maintainEVC_02_Flow_at_Base_Condition}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>Gross Volume Flow</span> ,

modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40861	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {formatValue(EVC_02_Flow_at_Measurement_Condition)} {nameValue.m3h}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Flow_at_Measurement_Condition}
checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>Standard Volume Accumulated</span> ,

modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40855	 </span> ,

value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {formatValue(EVC_02_Volume_at_Base_Condition)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Volume_at_Base_Condition}
checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>Gross Volume Accumulated</span> ,

modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40857	 </span> ,

value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {formatValue(EVC_02_Volume_at_Measurement_Condition)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Volume_at_Measurement_Condition}
checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40863	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {formatValue(EVC_02_Vb_of_Current_Day)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Vb_of_Current_Day}
checked={maintainEVC_02_Vb_of_Current_Day}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>Gross Volume Vm Today</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40865	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {formatValue(EVC_02_Vm_of_Current_Day)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Vm_of_Current_Day}
checked={maintainEVC_02_Vm_of_Current_Day}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>Standard Volume Vb Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40867	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {formatValue(EVC_02_Vb_of_Last_Day)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Vb_of_Last_Day}
checked={maintainEVC_02_Vb_of_Last_Day}
></Checkbox>

},
{
        mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>Gross Volume Vm Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40869	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {formatValue(EVC_02_Vm_of_Last_Day)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,

modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40002	 </span> ,

value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {formatValue(EVC_02_Remain_Battery_Service_Life)} {nameValue.month}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Remain_Battery_Service_Life}
checked={maintainEVC_02_Remain_Battery_Service_Life}
></Checkbox>

},
{ 
mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSS_EVC_02_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_EVC_02_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_EVC_02_Conn_STT}> EVC Connection Status </span> ,

value: <span style={combineCss.CSS_EVC_02_Conn_STT} > {formatValue(EVC_02_Conn_STT)} {DataEVC_02_Conn_STT}</span>, 
high: <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_EVC_02_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Conn_STT} onChange={handleInputChangeEVC_02_Conn_STT} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_EVC_02_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Conn_STT} onChange={handleInputChange2EVC_02_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Conn_STT}
checked={maintainEVC_02_Conn_STT}
></Checkbox>

},
  ]



  const PLC01 = [




    {
mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSPIT_2006} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSPIT_2006}>Pressure Indicator Transmitter PIT-2006</span> ,

     modbus: <span style={combineCss.CSSPIT_2006}>40001	 </span> ,

    value: <span style={combineCss.CSSPIT_2006} > {formatValue(PIT_2006)} {nameValue.BARG}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPIT_2006}   placeholder='High' step="0.1" type='number' value={inputValuePIT_2006} onChange={handleInputChangePIT_2006} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPIT_2006}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_2006} onChange={handleInputChange2PIT_2006} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
     Maintain:   <Checkbox disabled={TECH_OPER}
     style={{ marginRight: 20, }}
     onChange={ChangemaintainPIT_2006}
     checked={maintainPIT_2006}
 ></Checkbox>

    },

 
    {
mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSPIT_2007} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSPIT_2007}>Pressure Indicator Transmitter PIT-2007</span> ,

     modbus: <span style={combineCss.CSSPIT_2007}>40003	 </span> ,

    value: <span style={combineCss.CSSPIT_2007} > {formatValue(PIT_2007)} {nameValue.BARG}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPIT_2007}   placeholder='High' step="0.1" type='number' value={inputValuePIT_2007} onChange={handleInputChangePIT_2007} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPIT_2007}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_2007} onChange={handleInputChange2PIT_2007} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
     Maintain:   <Checkbox disabled={TECH_OPER}
     style={{ marginRight: 20, }}
     onChange={ChangemaintainPIT_2007}
     checked={maintainPIT_2007}
 ></Checkbox>

    },

    {
mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSPT_2001} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSPT_2001}>Pressure Transmitter PT-2001</span> ,

     modbus: <span style={combineCss.CSSPT_2001}>40005</span> ,

    value: <span style={combineCss.CSSPT_2001} > {formatValue(PT_2001)} {nameValue.BARG}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2001}   placeholder='High' step="0.1" type='number' value={inputValuePT_2001} onChange={handleInputChangePT_2001} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2001} onChange={handleInputChange2PT_2001} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
     Maintain:   <Checkbox disabled={TECH_OPER}
     style={{ marginRight: 20, }}
     onChange={ChangemaintainPT_2001}
     checked={maintainPT_2001}
 ></Checkbox>

    },


    {
mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSPT_2002} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSPT_2002}>Pressure Transmitter PT-2002</span> ,

     modbus: <span style={combineCss.CSSPT_2002}>40007	 </span> ,

    value: <span style={combineCss.CSSPT_2002} > {formatValue(PT_2002)}  {nameValue.BARG}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2002}   placeholder='High' step="0.1" type='number' value={inputValuePT_2002} onChange={handleInputChangePT_2002} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2002} onChange={handleInputChange2PT_2002} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
     Maintain:   <Checkbox disabled={TECH_OPER}
     style={{ marginRight: 20, }}
     onChange={ChangemaintainPT_2002}
     checked={maintainPT_2002}
 ></Checkbox>

    },

    {
mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSPT_2003} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSPT_2003}>Pressure Transmitter PT-2003</span> ,

    modbus: <span style={combineCss.CSSPT_2003}>40009	 </span> ,

   value: <span style={combineCss.CSSPT_2003} > {formatValue(PT_2003)}  {nameValue.BARG}</span> , 
    high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2003}   placeholder='High' step="0.1" type='number' value={inputValuePT_2003} onChange={handleInputChangePT_2003} inputMode="decimal" />, 
    low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2003} onChange={handleInputChange2PT_2003} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
    Maintain:   <Checkbox disabled={TECH_OPER}
    style={{ marginRight: 20, }}
    onChange={ChangemaintainPT_2003}
    checked={maintainPT_2003}
></Checkbox>

   },


   {
mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTT_2001} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSTT_2001}>Temperature Transmitter TT-2001</span> ,

   modbus: <span style={combineCss.CSSTT_2001}>40011	 </span> ,

  value: <span style={combineCss.CSSTT_2001} > {formatValue(TT_2001)} {nameValue.C}</span> , 
   high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTT_2001}   placeholder='High' step="0.1" type='number' value={inputValueTT_2001} onChange={handleInputChangeTT_2001} inputMode="decimal" />, 
   low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTT_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2001} onChange={handleInputChange2TT_2001} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
   Maintain:   <Checkbox disabled={TECH_OPER}
   style={{ marginRight: 20, }}
   onChange={ChangemaintainTT_2001}
   checked={maintainTT_2001}
></Checkbox>

  },





 {
mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTT_2002} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSTT_2002}>Temperature Transmitter TT-2002</span> ,

 modbus: <span style={combineCss.CSSTT_2002}>40013	 </span> ,

value: <span style={combineCss.CSSTT_2002} > {formatValue(TT_2002)} {nameValue.C}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTT_2002}   placeholder='High' step="0.1" type='number' value={inputValueTT_2002} onChange={handleInputChangeTT_2002} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTT_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2002} onChange={handleInputChange2TT_2002} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangemaintainTT_2002}
 checked={maintainTT_2002}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD_2001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSGD_2001}>Gas Detector GD-2001</span> ,

modbus: <span style={combineCss.CSSGD_2001}>40015	 </span> ,

value: <span style={combineCss.CSSGD_2001} > {formatValue(GD_2001)} {nameValue.LEL}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_2001}   placeholder='High' step="0.1" type='number' value={inputValueGD_2001} onChange={handleInputChangeGD_2001} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2001} onChange={handleInputChange2GD_2001} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainGD_2001}
checked={maintainGD_2001}
></Checkbox>

},



{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSDV_2001A} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSDV_2001A}>Shutdown Valve SDV-2001A</span> ,

modbus: <span style={combineCss.CSSSDV_2001A}>40017	 </span> ,

value: <span style={combineCss.CSSSDV_2001A} > {formatValue(SDV_2001A)} {dataSDV_2001A}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2001A} onChange={handleInputChangeSDV_2001A} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2001A} onChange={handleInputChange2SDV_2001A} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainSDV_2001A}
checked={maintainSDV_2001A}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSDV_2001B} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSDV_2001B}>Shutdown Valve SDV-2001B</span> ,

modbus: <span style={combineCss.CSSSDV_2001B}>40019	 </span> ,

value: <span style={combineCss.CSSSDV_2001B} > {formatValue(SDV_2001B)} {dataSDV_2001B}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2001B} onChange={handleInputChangeSDV_2001B} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2001B} onChange={handleInputChange2SDV_2001B} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainSDV_2001B}
checked={maintainSDV_2001B}
></Checkbox>

},
{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSDV_2002} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSDV_2002}>Shutdown Valve SDV-2002</span> ,

modbus: <span style={combineCss.CSSSDV_2002}>40021	 </span> ,

value: <span style={combineCss.CSSSDV_2002} > {formatValue(SDV_2002)} {dataSDV_2002}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2002} onChange={handleInputChangeSDV_2002} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2002} onChange={handleInputChange2SDV_2002} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainSDV_2002}
checked={maintainSDV_2002}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSWater_PG} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSWater_PG}>Water Pressure</span> ,

modbus: <span style={combineCss.CSSWater_PG}>40023	 </span> ,

value: <span style={combineCss.CSSWater_PG} > {formatValue(Water_PG)} {dataWater_PG}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSWater_PG}   placeholder='High' step="0.1" type='number' value={inputValueWater_PG} onChange={handleInputChangeWater_PG} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSWater_PG}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_PG} onChange={handleInputChange2Water_PG} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainWater_PG}
checked={maintainWater_PG}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSWater_LSW} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSWater_LSW}>Water Level</span> ,

modbus: <span style={combineCss.CSSWater_LSW}>40025	 </span> ,

value: <span style={combineCss.CSSWater_LSW} > {formatValue(Water_LSW)} {dataWater_LSW}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSWater_LSW}   placeholder='High' step="0.1" type='number' value={inputValueWater_LSW} onChange={handleInputChangeWater_LSW} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSWater_LSW}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_LSW} onChange={handleInputChange2Water_LSW} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainWater_LSW}
checked={maintainWater_LSW}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSPUMP_1} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPUMP_1}>Pump 1</span> ,

modbus: <span style={combineCss.CSSPUMP_1}>40027	 </span> ,

value: <span style={combineCss.CSSPUMP_1} > {formatValue(PUMP_1)} {dataPUMP_1}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPUMP_1}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_1} onChange={handleInputChangePUMP_1} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPUMP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_1} onChange={handleInputChange2PUMP_1} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainPUMP_1}
checked={maintainPUMP_1}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSPUMP_2} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPUMP_2}>Pump 2</span> ,

modbus: <span style={combineCss.CSSPUMP_2}>40029	 </span> ,

value: <span style={combineCss.CSSPUMP_2} > {formatValue(PUMP_2)} {dataPUMP_2}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPUMP_2}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_2} onChange={handleInputChangePUMP_2} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPUMP_2}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_2} onChange={handleInputChange2PUMP_2} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainPUMP_2}
checked={maintainPUMP_2}
></Checkbox>

},

{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSHEATER_1} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHEATER_1}>Heater 1</span> ,

modbus: <span style={combineCss.CSSHEATER_1}>40031	 </span> ,

value: <span style={combineCss.CSSHEATER_1} > {formatValue(HEATER_1)} {dataHEATER_1}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHEATER_1}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_1} onChange={handleInputChangeHEATER_1} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHEATER_1}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_1} onChange={handleInputChange2HEATER_1} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainHEATER_1}
checked={maintainHEATER_1}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSHEATER_2} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHEATER_2}>Heater 2</span> ,

modbus: <span style={combineCss.CSSHEATER_2}>40033</span> ,

value: <span style={combineCss.CSSHEATER_2} > {formatValue(HEATER_2)} {dataHEATER_2}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHEATER_2}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_2} onChange={handleInputChangeHEATER_2} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHEATER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_2} onChange={handleInputChange2HEATER_2} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainHEATER_2}
checked={maintainHEATER_2}
></Checkbox>

},






{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSBOILER} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSBOILER}>Boiler</span> ,

modbus: <span style={combineCss.CSSBOILER}>40035	 </span> ,

value: <span style={combineCss.CSSBOILER} > {formatValue(BOILER)} {dataBOILER}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSBOILER}   placeholder='High' step="0.1" type='number' value={inputValueBOILER} onChange={handleInputChangeBOILER} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSBOILER}   placeholder='Low' step="0.1" type='number' value={inputValue2BOILER} onChange={handleInputChange2BOILER} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainBOILER}
checked={maintainBOILER}
></Checkbox>

},


{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSGD_STATUS} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSGD_STATUS}>Gas Detector Status</span> ,

modbus: <span style={combineCss.CSSGD_STATUS}>40037	 </span> ,

value: <span style={combineCss.CSSGD_STATUS} > {formatValue(GD_STATUS)} {dataGD_STATUS}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD_STATUS} onChange={handleInputChangeGD_STATUS} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_STATUS} onChange={handleInputChange2GD_STATUS} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainGD_STATUS}
checked={maintainGD_STATUS}
></Checkbox>

},

{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSESD_2001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSESD_2001}> Emergency Shut ESD-2001</span> ,

modbus: <span style={combineCss.CSSESD_2001}>40039	 </span> ,

value: <span style={combineCss.CSSESD_2001} > {formatValue(ESD_2001)} {dataESD_2001}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSESD_2001}   placeholder='High' step="0.1" type='number' value={inputValueESD_2001} onChange={handleInputChangeESD_2001} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSESD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD_2001} onChange={handleInputChange2ESD_2001} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainESD_2001}
checked={maintainESD_2001}
></Checkbox>

},




{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,

modbus: <span style={combineCss.CSSHR_BC}>40041	 </span> ,

value: <span style={combineCss.CSSHR_BC} > {formatValue(HR_BC)} {dataHR_BC}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainHR_BC}
checked={maintainHR_BC}
></Checkbox>

},





{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSD_2001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_2001}>Smoke Detector SD-2001</span> ,

modbus: <span style={combineCss.CSSSD_2001}>40043	 </span> ,

value: <span style={combineCss.CSSSD_2001} > {formatValue(SD_2001)} {dataSD_2001}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSD_2001}   placeholder='High' step="0.1" type='number' value={inputValueSD_2001} onChange={handleInputChangeSD_2001} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSD_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_2001} onChange={handleInputChange2SD_2001} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainSD_2001}
checked={maintainSD_2001}
></Checkbox>

},

{
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSD_2002} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_2002}> Smoke Detector SD-2002</span> ,

modbus: <span style={combineCss.CSSSD_2002}>40045	 </span> ,

value: <span style={combineCss.CSSSD_2002} > {formatValue(SD_2002)} {dataSD_2002}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSD_2002}   placeholder='High' step="0.1" type='number' value={inputValueSD_2002} onChange={handleInputChangeSD_2002} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSD_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_2002} onChange={handleInputChange2SD_2002} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainSD_2002}
checked={maintainSD_2002}
></Checkbox>

},

{ 
mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSS_PLC_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_PLC_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_PLC_Conn_STT}>PLC Connection Status</span> ,

value: <span style={combineCss.CSS_PLC_Conn_STT} > {formatValue(PLC_Conn_STT)} {DataPLC_Conn_STT}</span>, 
high: <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_PLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_PLC_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangemaintainPLC_Conn_STT}
checked={maintainPLC_Conn_STT}
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
            IOT: "IOT gateway phone number",
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
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

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
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

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
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

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
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

                        className="buttonUpdateSetData"
                        style={{ marginTop: 5 }}
                        label="Update"
                        onClick={confirmUpData}
                    />
                ),
            },
    
    
            //===========================================
    
    
            {
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001A {nameValue.BARG}</span>,
    
                Value: (
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

                        className="buttonUpdateSetData"
                        style={{ marginTop: 5 }}
                        label="Update"
                        onClick={confirmUpData}
                    />
                ),
            },
    
            {
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001B {nameValue.BARG}</span>,
    
                Value: (
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

                        className="buttonUpdateSetData"
                        style={{ marginTop: 5 }}
                        label="Update"
                        onClick={confirmUpData}
                    />
                ),
            },
    
            {


                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002A {nameValue.BARG}</span>,
    
                Value: (
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

                        className="buttonUpdateSetData"
                        style={{ marginTop: 5 }}
                        label="Update"
                        onClick={confirmUpData}
                    />
                ),
            },
    
    
            {
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002B {nameValue.BARG}</span>,
    
                Value: (
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

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
                    <InputText disabled={TECHNIAN_AUTH}
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
                    disabled={TECHNIAN_AUTH}

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
                        disabled={TECH_OPER}
    
                        showTime={false}
                        inputId="timeEVC_02"
                        dateFormat="dd-mm-yy"
                    />
                ),
               
                Update: (
                    <Button
                    disabled={TECH_OPER}

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
                        disabled={TECH_OPER}
    
                        showTime={false}
                        inputId="timeEVC_04"
                        dateFormat="dd-mm-yy"
                    />
                ),
               
                Update: (
                    <Button
                    disabled={TECH_OPER}
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
   
        const maintainHeader = (
            <div>
    
                    <Checkbox disabled={TECH_OPER}
                        style={{ marginRight: 5 }}
                        onChange={handleCheckboxChange}
                        checked={handleMaintainingAll}
                    />
                Maintain
    
            </div>
        );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, }}>
   
    <Toast ref={toast} />

    <ConfirmDialog />

<h2>CNG BINH DUOONG</h2>

<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
<div style={{ width: '100%' }}>
<DataTable 
   rowGroupMode="subheader"
   size={'small'}      resizableColumns
   tableStyle={{ minWidth: '50rem' }} 
  value={combinedData}  
  groupRowsBy="mainCategory"  
   sortOrder={1} 
   rowGroupHeaderTemplate={mainCategoryTemplate} >
  <Column field="timeUpdate" header="Time Update" />
  <Column field="modbus" header="Modbus" />
  <Column field="name" header="Name" />
  <Column field="value" header="Value" />
  <Column field="high" header="High" />
  <Column field="low" header="Low" />
    <Column field="Maintain" header={maintainHeader} />
 <Column field="update" header="Update"     
style={{ width: '45px' }} 
/>  
</DataTable>
</div>

<div style={{ width: '100%', borderRadius: 5,}}>
<h4>Station - Configuration</h4>
<DataTable value={configuration} size={'small'} selectionMode="single">
  <Column field="Name" header="Name" />
 
  <Column field="Value" header="value" />

  <Column
    field="Update" 
    header={<div style={{position:'relative', right:45}}>Update</div>} 
    style={{ display: 'flex', justifyContent: 'flex-end',right:45}} 
  />  
</DataTable>
</div>
</div>


<br />
<br />

</div>
  )
}
