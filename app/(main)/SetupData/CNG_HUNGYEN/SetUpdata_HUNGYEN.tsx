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



    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : null;
     const userId = userData?.id?.id;
    
    const AuthUpdate = userId === UserTechnican.A  ||
    userId === UserTechnican.Q ||
     userId ===  UserTechnican.N ||
      userId === UserTechnican.T  ||
       userId === UserTechnican.TN ||
        userId === UserTechnican.DT ||
        userId === UserTechnican.KL ; 
    
    
    const AuthInput = userId !== UserTechnican.A  && 
    userId !== UserTechnican.Q &&
    userId !==  UserTechnican.N &&
     userId !== UserTechnican.T  &&
      userId !== UserTechnican.TN &&
        userId !== UserTechnican.DT &&
        userId !== UserTechnican.KL &&
        userId !== UserOperator.VHPM3 &&
        userId !== UserOperator.TTVHpm3 ; 

        const AuthUpdatePCV = userId !== UserTechnican.A  &&
        userId !== UserTechnican.Q &&
         userId !==  UserTechnican.N &&
          userId !== UserTechnican.T  &&
           userId !== UserTechnican.TN &&
            userId !== UserTechnican.DT &&
            userId !== UserTechnican.KL ;


            const AuthInputHighLow = userId !== UserTechnican.A  && 
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
                        ESD_3001: setESD_3001,
                        SD_3001: setSD_3001,
                        SD_3002: setSD_3002,

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
            const SDV_3002_High = res.data.find((item: any) => item.key === "SDV_3002_High");
            setSDV_3002_High(SDV_3002_High?.value || null);
            const SDV_3002_Low = res.data.find((item: any) => item.key === "SDV_3002_Low");
            setSDV_3002_Low(SDV_3002_Low?.value || null);
            const SDV_3002_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3002_Maintain"
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


            setmaintainPIT_3001A(MaintainPIT_3001A?.value || false);
            setmaintainPIT_3001B(PIT_3001B_Maintain?.value || false);
            setmaintainPT_3001(PT_3001_Maintain?.value || false);
            setmaintainPT_3002(PT_3002_Maintain?.value || false);
            setmaintainPT_3003(PT_3003_Maintain?.value || false);
            setmaintainTT_3001(TT_3001_Maintain?.value || false);
            setmaintainTT_3002(TT_3002_Maintain?.value || false);
            setmaintainGD_3001(GD_3001_Maintain?.value || false);
            setmaintainSDV_3001A(SDV_3001A_Maintain?.value || false);
            setmaintainSDV_3001B(SDV_3001B_Maintain?.value || false);
            setmaintainSDV_3002(SDV_3002_Maintain?.value || false);
            setmaintainWater_LSW(Water_LSW_Maintain?.value || false);
            setmaintainWater_PG(Water_PG_Maintain?.value || false);
            setmaintainPUMP_2(PUMP_2_Maintain?.value || false);
            setmaintainPUMP_1(PUMP_1_Maintain?.value || false);
            setmaintainHEATER_2(HEATER_2_Maintain?.value || false);
            setmaintainHEATER_1(HEATER_1_Maintain?.value || false);
            setmaintainBOILER(BOILER_Maintain?.value || false);
            setmaintainGD_STATUS(GD_STATUS_Maintain?.value || false);
            setmaintainHR_BC(HR_BC_Maintain?.value || false);
            setmaintainESD_3001(ESD_3001_Maintain?.value || false);
            setmaintainSD_3001(SD_3001_Maintain?.value || false);
            setmaintainSD_3002(SD_3002_Maintain?.value || false);



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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setmaintainEVC_02_Vm_of_Last_Day(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            

            
            
            // =================================================================================================================== 
            const [PIT_3001A, setPIT_3001A] = useState<string | null>(null);
            const [inputValuePIT_3001A, setinputValuePIT_3001A] = useState<any>();
            const [inputValue2PIT_3001A, setinputValue2PIT_3001A] = useState<any>();
            const [PIT_3001A_High, setPIT_3001A_High] = useState<number | null>(null);
            const [PIT_3001A_Low, setPIT_3001A_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_3001A, setexceedThresholdPIT_3001A] = useState(false); 
            const [maintainPIT_3001A, setmaintainPIT_3001A] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_3001AValue = parseFloat(PIT_3001A as any);
                const highValue = PIT_3001A_High ?? NaN;
                const lowValue = PIT_3001A_Low ?? NaN;
            
                if (!isNaN(PIT_3001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_3001A) {
                    setexceedThresholdPIT_3001A(PIT_3001AValue >= highValue || PIT_3001AValue <= lowValue);
                }
            }, [PIT_3001A, PIT_3001A_High, PIT_3001A_Low, maintainPIT_3001A]);
            
            const handleInputChangePIT_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_3001A(event.target.value);
            };
            
            const handleInputChange2PIT_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_3001A(event.target.value);
            };
            
            const ChangemaintainPIT_3001A = async () => {
                try {
                    const newValue = !maintainPIT_3001A;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                        { PIT_3001A_Maintain: newValue }
                    );
                    setmaintainPIT_3001A(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            
 // =================================================================================================================== 
            const [PIT_3001B, setPIT_3001B] = useState<string | null>(null);
            const [inputValuePIT_3001B, setinputValuePIT_3001B] = useState<any>();
            const [inputValue2PIT_3001B, setinputValue2PIT_3001B] = useState<any>();
            const [PIT_3001B_High, setPIT_3001B_High] = useState<number | null>(null);
            const [PIT_3001B_Low, setPIT_3001B_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_3001B, setexceedThresholdPIT_3001B] = useState(false); 
            const [maintainPIT_3001B, setmaintainPIT_3001B] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_3001BValue = parseFloat(PIT_3001B as any);
                const highValue = PIT_3001B_High ?? NaN;
                const lowValue = PIT_3001B_Low ?? NaN;
            
                if (!isNaN(PIT_3001BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_3001B) {
                    setexceedThresholdPIT_3001B(PIT_3001BValue >= highValue || PIT_3001BValue <= lowValue);
                }
            }, [PIT_3001B, PIT_3001B_High, PIT_3001B_Low, maintainPIT_3001B]);
            
            const handleInputChangePIT_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_3001B(event.target.value);
            };
            
            const handleInputChange2PIT_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_3001B(event.target.value);
            };
            
            const ChangemaintainPIT_3001B = async () => {
                try {
                    const newValue = !maintainPIT_3001B;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                        { PIT_3001B_Maintain: newValue }
                    );
                    setmaintainPIT_3001B(newValue);
                } catch (error) {
                    console.error(error);
                }
            };

 
   
 
 
      // =================================================================================================================== 


      const [PT_3001, setPT_3001] = useState<string | null>(null);
      const [inputValuePT_3001, setinputValuePT_3001] = useState<any>();
      const [inputValue2PT_3001, setinputValue2PT_3001] = useState<any>();
      const [PT_3001_High, setPT_3001_High] = useState<number | null>(null);
      const [PT_3001_Low, setPT_3001_Low] = useState<number | null>(null);
      const [exceedThresholdPT_3001, setexceedThresholdPT_3001] = useState(false); 
      const [maintainPT_3001, setmaintainPT_3001] = useState<boolean>(false);
      
      useEffect(() => {
          const PT_3001Value = parseFloat(PT_3001 as any);
          const highValue = PT_3001_High ?? NaN;
          const lowValue = PT_3001_Low ?? NaN;
      
          if (!isNaN(PT_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3001) {
              setexceedThresholdPT_3001(PT_3001Value >= highValue || PT_3001Value <= lowValue);
          }
      }, [PT_3001, PT_3001_High, PT_3001_Low, maintainPT_3001]);
      
      const handleInputChangePT_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePT_3001(event.target.value);
      };
      
      const handleInputChange2PT_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PT_3001(event.target.value);
      };
      
      const ChangemaintainPT_3001 = async () => {
          try {
              const newValue = !maintainPT_3001;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                  { PT_3001_Maintain: newValue }
              );
              setmaintainPT_3001(newValue);
          } catch (error) {
              console.error(error);
          }
      };


      // =================================================================================================================== 
      const [PT_3002, setPT_3002] = useState<string | null>(null);
      const [inputValuePT_3002, setinputValuePT_3002] = useState<any>();
      const [inputValue2PT_3002, setinputValue2PT_3002] = useState<any>();
      const [PT_3002_High, setPT_3002_High] = useState<number | null>(null);
      const [PT_3002_Low, setPT_3002_Low] = useState<number | null>(null);
      const [exceedThresholdPT_3002, setexceedThresholdPT_3002] = useState(false); 
      const [maintainPT_3002, setmaintainPT_3002] = useState<boolean>(false);
      
      useEffect(() => {
          const PT_3002Value = parseFloat(PT_3002 as any);
          const highValue = PT_3002_High ?? NaN;
          const lowValue = PT_3002_Low ?? NaN;
      
          if (!isNaN(PT_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3002) {
              setexceedThresholdPT_3002(PT_3002Value >= highValue || PT_3002Value <= lowValue);
          }
      }, [PT_3002, PT_3002_High, PT_3002_Low, maintainPT_3002]);
      
      const handleInputChangePT_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePT_3002(event.target.value);
      };
      
      const handleInputChange2PT_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PT_3002(event.target.value);
      };
      
      const ChangemaintainPT_3002 = async () => {
          try {
              const newValue = !maintainPT_3002;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                  { PT_3002_Maintain: newValue }
              );
              setmaintainPT_3002(newValue);
          } catch (error) {
              console.error(error);
          }
      };


 
 
      
      
           // =================================================================================================================== 


           const [PT_3003, setPT_3003] = useState<string | null>(null);
           const [inputValuePT_3003, setinputValuePT_3003] = useState<any>();
           const [inputValue2PT_3003, setinputValue2PT_3003] = useState<any>();
           const [PT_3003_High, setPT_3003_High] = useState<number | null>(null);
           const [PT_3003_Low, setPT_3003_Low] = useState<number | null>(null);
           const [exceedThresholdPT_3003, setexceedThresholdPT_3003] = useState(false); 
           const [maintainPT_3003, setmaintainPT_3003] = useState<boolean>(false);
           
           useEffect(() => {
               const PT_3003Value = parseFloat(PT_3003 as any);
               const highValue = PT_3003_High ?? NaN;
               const lowValue = PT_3003_Low ?? NaN;
           
               if (!isNaN(PT_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3003) {
                   setexceedThresholdPT_3003(PT_3003Value >= highValue || PT_3003Value <= lowValue);
               }
           }, [PT_3003, PT_3003_High, PT_3003_Low, maintainPT_3003]);
           
           const handleInputChangePT_3003 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValuePT_3003(event.target.value);
           };
           
           const handleInputChange2PT_3003 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2PT_3003(event.target.value);
           };
           
           const ChangemaintainPT_3003 = async () => {
               try {
                   const newValue = !maintainPT_3003;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { PT_3003_Maintain: newValue }
                   );
                   setmaintainPT_3003(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
     
 
 
      
      
      
           // =================================================================================================================== 



           const [TT_3001, setTT_3001] = useState<string | null>(null);
           const [inputValueTT_3001, setinputValueTT_3001] = useState<any>();
           const [inputValue2TT_3001, setinputValue2TT_3001] = useState<any>();
           const [TT_3001_High, setTT_3001_High] = useState<number | null>(null);
           const [TT_3001_Low, setTT_3001_Low] = useState<number | null>(null);
           const [exceedThresholdTT_3001, setexceedThresholdTT_3001] = useState(false); 
           const [maintainTT_3001, setmaintainTT_3001] = useState<boolean>(false);
           
           useEffect(() => {
               const TT_3001Value = parseFloat(TT_3001 as any);
               const highValue = TT_3001_High ?? NaN;
               const lowValue = TT_3001_Low ?? NaN;
           
               if (!isNaN(TT_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3001) {
                   setexceedThresholdTT_3001(TT_3001Value >= highValue || TT_3001Value <= lowValue);
               }
           }, [TT_3001, TT_3001_High, TT_3001_Low, maintainTT_3001]);
           
           const handleInputChangeTT_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTT_3001(event.target.value);
           };
           
           const handleInputChange2TT_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TT_3001(event.target.value);
           };
           
           const ChangemaintainTT_3001 = async () => {
               try {
                   const newValue = !maintainTT_3001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { TT_3001_Maintain: newValue }
                   );
                   setmaintainTT_3001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


 
        
      
      
           // =================================================================================================================== 


           const [GD_3001, setGD_3001] = useState<string | null>(null);
           const [inputValueGD_3001, setinputValueGD_3001] = useState<any>();
           const [inputValue2GD_3001, setinputValue2GD_3001] = useState<any>();
           const [GD_3001_High, setGD_3001_High] = useState<number | null>(null);
           const [GD_3001_Low, setGD_3001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_3001, setexceedThresholdGD_3001] = useState(false); 
           const [maintainGD_3001, setmaintainGD_3001] = useState<boolean>(false);
           
           useEffect(() => {
               const GD_3001Value = parseFloat(GD_3001 as any);
               const highValue = GD_3001_High ?? NaN;
               const lowValue = GD_3001_Low ?? NaN;
           
               if (!isNaN(GD_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3001) {
                   setexceedThresholdGD_3001(GD_3001Value >= highValue || GD_3001Value <= lowValue);
               }
           }, [GD_3001, GD_3001_High, GD_3001_Low, maintainGD_3001]);
           
           const handleInputChangeGD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueGD_3001(event.target.value);
           };
           
           const handleInputChange2GD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2GD_3001(event.target.value);
           };
           
           const ChangemaintainGD_3001 = async () => {
               try {
                   const newValue = !maintainGD_3001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { GD_3001_Maintain: newValue }
                   );
                   setmaintainGD_3001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
           // =================================================================================================================== 

           const [TT_3002, setTT_3002] = useState<string | null>(null);
           const [inputValueTT_3002, setinputValueTT_3002] = useState<any>();
           const [inputValue2TT_3002, setinputValue2TT_3002] = useState<any>();
           const [TT_3002_High, setTT_3002_High] = useState<number | null>(null);
           const [TT_3002_Low, setTT_3002_Low] = useState<number | null>(null);
           const [exceedThresholdTT_3002, setexceedThresholdTT_3002] = useState(false); 
           const [maintainTT_3002, setmaintainTT_3002] = useState<boolean>(false);
           
           useEffect(() => {
               const TT_3002Value = parseFloat(TT_3002 as any);
               const highValue = TT_3002_High ?? NaN;
               const lowValue = TT_3002_Low ?? NaN;
           
               if (!isNaN(TT_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3002) {
                   setexceedThresholdTT_3002(TT_3002Value >= highValue || TT_3002Value <= lowValue);
               }
           }, [TT_3002, TT_3002_High, TT_3002_Low, maintainTT_3002]);
           
           const handleInputChangeTT_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTT_3002(event.target.value);
           };
           
           const handleInputChange2TT_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TT_3002(event.target.value);
           };
           
           const ChangemaintainTT_3002 = async () => {
               try {
                   const newValue = !maintainTT_3002;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { TT_3002_Maintain: newValue }
                   );
                   setmaintainTT_3002(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
      
           // ===================================================================================================================
           
           

           const [SDV_3001A, setSDV_3001A] = useState<string | null>(null);
           const [inputValueSDV_3001A, setinputValueSDV_3001A] = useState<any>();
           const [inputValue2SDV_3001A, setinputValue2SDV_3001A] = useState<any>();
           const [SDV_3001A_High, setSDV_3001A_High] = useState<number | null>(null);
           const [SDV_3001A_Low, setSDV_3001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_3001A, setexceedThresholdSDV_3001A] = useState(false); 
           const [maintainSDV_3001A, setmaintainSDV_3001A] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_3001AValue = parseFloat(SDV_3001A as any);
               const highValue = SDV_3001A_High ?? NaN;
               const lowValue = SDV_3001A_Low ?? NaN;
           
               if (!isNaN(SDV_3001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3001A) {
                   setexceedThresholdSDV_3001A(SDV_3001AValue >= highValue || SDV_3001AValue <= lowValue);
               }
           }, [SDV_3001A, SDV_3001A_High, SDV_3001A_Low, maintainSDV_3001A]);
           
           const handleInputChangeSDV_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_3001A(event.target.value);
           };
           
           const handleInputChange2SDV_3001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_3001A(event.target.value);
           };
           
           const ChangemaintainSDV_3001A = async () => {
               try {
                   const newValue = !maintainSDV_3001A;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { SDV_3001A_Maintain: newValue }
                   );
                   setmaintainSDV_3001A(newValue);
               } catch (error) {
                   console.error(error);
               }
           };

 
 
        
      
      
           // =================================================================================================================== 


           const [SDV_3001B, setSDV_3001B] = useState<string | null>(null);
           const [inputValueSDV_3001B, setinputValueSDV_3001B] = useState<any>();
           const [inputValue2SDV_3001B, setinputValue2SDV_3001B] = useState<any>();
           const [SDV_3001B_High, setSDV_3001B_High] = useState<number | null>(null);
           const [SDV_3001B_Low, setSDV_3001B_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_3001B, setexceedThresholdSDV_3001B] = useState(false); 
           const [maintainSDV_3001B, setmaintainSDV_3001B] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_3001BValue = parseFloat(SDV_3001B as any);
               const highValue = SDV_3001B_High ?? NaN;
               const lowValue = SDV_3001B_Low ?? NaN;
           
               if (!isNaN(SDV_3001BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3001B) {
                   setexceedThresholdSDV_3001B(SDV_3001BValue >= highValue || SDV_3001BValue <= lowValue);
               }
           }, [SDV_3001B, SDV_3001B_High, SDV_3001B_Low, maintainSDV_3001B]);
           
           const handleInputChangeSDV_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_3001B(event.target.value);
           };
           
           const handleInputChange2SDV_3001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_3001B(event.target.value);
           };
           
           const ChangemaintainSDV_3001B = async () => {
               try {
                   const newValue = !maintainSDV_3001B;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                       { SDV_3001B_Maintain: newValue }
                   );
                   setmaintainSDV_3001B(newValue);
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
             `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setmaintainHEATER_2(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 
 
 
 
 // =================================================================================================================== 


  
 const [SDV_3002, setSDV_3002] = useState<string | null>(null);
 const [inputValueSDV_3002, setinputValueSDV_3002] = useState<any>();
 const [inputValue2SDV_3002, setinputValue2SDV_3002] = useState<any>();
 const [SDV_3002_High, setSDV_3002_High] = useState<number | null>(null);
 const [SDV_3002_Low, setSDV_3002_Low] = useState<number | null>(null);
 const [exceedThresholdSDV_3002, setexceedThresholdSDV_3002] = useState(false); 
 const [maintainSDV_3002, setmaintainSDV_3002] = useState<boolean>(false);
 
 useEffect(() => {
     const SDV_3002Value = parseFloat(SDV_3002 as any);
     const highValue = SDV_3002_High ?? NaN;
     const lowValue = SDV_3002_Low ?? NaN;
 
     if (!isNaN(SDV_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3002) {
         setexceedThresholdSDV_3002(SDV_3002Value >= highValue || SDV_3002Value <= lowValue);
     }
 }, [SDV_3002, SDV_3002_High, SDV_3002_Low, maintainSDV_3002]);
 
 const handleInputChangeSDV_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueSDV_3002(event.target.value);
 };
 
 const handleInputChange2SDV_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2SDV_3002(event.target.value);
 };
 
 const ChangemaintainSDV_3002 = async () => {
     try {
         const newValue = !maintainSDV_3002;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
             { SDV_3002_Maintain: newValue }
         );
         setmaintainSDV_3002(newValue);
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
             `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                     { HR_BC_Maintain: newValue }
                 );
                 setmaintainHR_BC(newValue);
             } catch (error) {
                 console.error(error);
             }
         };


        


    
    
         
         // =================================================================================================================== 
         const [ESD_3001, setESD_3001] = useState<string | null>(null);
         const [inputValueESD_3001, setinputValueESD_3001] = useState<any>();
         const [inputValue2ESD_3001, setinputValue2ESD_3001] = useState<any>();
         const [ESD_3001_High, setESD_3001_High] = useState<number | null>(null);
         const [ESD_3001_Low, setESD_3001_Low] = useState<number | null>(null);
         const [exceedThresholdESD_3001, setexceedThresholdESD_3001] = useState(false); 
         const [maintainESD_3001, setmaintainESD_3001] = useState<boolean>(false);
         
         useEffect(() => {
             const ESD_3001Value = parseFloat(ESD_3001 as any);
             const highValue = ESD_3001_High ?? NaN;
             const lowValue = ESD_3001_Low ?? NaN;
         
             if (!isNaN(ESD_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD_3001) {
                 setexceedThresholdESD_3001(ESD_3001Value >= highValue || ESD_3001Value <= lowValue);
             }
         }, [ESD_3001, ESD_3001_High, ESD_3001_Low, maintainESD_3001]);
         
         const handleInputChangeESD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueESD_3001(event.target.value);
         };
         
         const handleInputChange2ESD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2ESD_3001(event.target.value);
         };
         
         const ChangemaintainESD_3001 = async () => {
             try {
                 const newValue = !maintainESD_3001;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                     { ESD_3001_Maintain: newValue }
                 );
                 setmaintainESD_3001(newValue);
             } catch (error) {
                 console.error(error);
             }
         };

    

         
         
              // =================================================================================================================== 

              const [SD_3001, setSD_3001] = useState<string | null>(null);
              const [inputValueSD_3001, setinputValueSD_3001] = useState<any>();
              const [inputValue2SD_3001, setinputValue2SD_3001] = useState<any>();
              const [SD_3001_High, setSD_3001_High] = useState<number | null>(null);
              const [SD_3001_Low, setSD_3001_Low] = useState<number | null>(null);
              const [exceedThresholdSD_3001, setexceedThresholdSD_3001] = useState(false); 
              const [maintainSD_3001, setmaintainSD_3001] = useState<boolean>(false);
              
              useEffect(() => {
                  const SD_3001Value = parseFloat(SD_3001 as any);
                  const highValue = SD_3001_High ?? NaN;
                  const lowValue = SD_3001_Low ?? NaN;
              
                  if (!isNaN(SD_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD_3001) {
                      setexceedThresholdSD_3001(SD_3001Value >= highValue || SD_3001Value <= lowValue);
                  }
              }, [SD_3001, SD_3001_High, SD_3001_Low, maintainSD_3001]);
              
              const handleInputChangeSD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueSD_3001(event.target.value);
              };
              
              const handleInputChange2SD_3001 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2SD_3001(event.target.value);
              };
              
              const ChangemaintainSD_3001 = async () => {
                  try {
                      const newValue = !maintainSD_3001;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                          { SD_3001_Maintain: newValue }
                      );
                      setmaintainSD_3001(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
     
    
    

         
              // =================================================================================================================== 


              const [SD_3002, setSD_3002] = useState<string | null>(null);
              const [inputValueSD_3002, setinputValueSD_3002] = useState<any>();
              const [inputValue2SD_3002, setinputValue2SD_3002] = useState<any>();
              const [SD_3002_High, setSD_3002_High] = useState<number | null>(null);
              const [SD_3002_Low, setSD_3002_Low] = useState<number | null>(null);
              const [exceedThresholdSD_3002, setexceedThresholdSD_3002] = useState(false); 
              const [maintainSD_3002, setmaintainSD_3002] = useState<boolean>(false);
              
              useEffect(() => {
                  const SD_3002Value = parseFloat(SD_3002 as any);
                  const highValue = SD_3002_High ?? NaN;
                  const lowValue = SD_3002_Low ?? NaN;
              
                  if (!isNaN(SD_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD_3002) {
                      setexceedThresholdSD_3002(SD_3002Value >= highValue || SD_3002Value <= lowValue);
                  }
              }, [SD_3002, SD_3002_High, SD_3002_Low, maintainSD_3002]);
              
              const handleInputChangeSD_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueSD_3002(event.target.value);
              };
              
              const handleInputChange2SD_3002 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2SD_3002(event.target.value);
              };
              
              const ChangemaintainSD_3002 = async () => {
                  try {
                      const newValue = !maintainSD_3002;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                          { SD_3002_Maintain: newValue }
                      );
                      setmaintainSD_3002(newValue);
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,



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
                 
                    PIT_3001B_High: inputValuePIT_3001B,PIT_3001B_Low:inputValue2PIT_3001B,
                    PIT_3001A_High: inputValuePIT_3001A,PIT_3001A_Low:inputValue2PIT_3001A,

                    PT_3001_High: inputValuePT_3001,PT_3001_Low:inputValue2PT_3001,
                    PT_3002_High: inputValuePT_3002,PT_3002_Low:inputValue2PT_3002,
                    PT_3003_High: inputValuePT_3003,PT_3003_Low:inputValue2PT_3003,

                    TT_3001_High: inputValueTT_3001,TT_3001_Low:inputValue2TT_3001,
                    TT_3002_High: inputValueTT_3002,TT_3002_Low:inputValue2TT_3002,
                    GD_3001_High: inputValueGD_3001,GD_3001_Low:inputValue2GD_3001,

                    SDV_3001B_High: inputValueSDV_3001B,SDV_3001B_Low:inputValue2SDV_3001B,
                    SDV_3001A_High: inputValueSDV_3001A,SDV_3001A_Low:inputValue2SDV_3001A,
                    SDV_3002_High: inputValueSDV_3002,SDV_3002_Low:inputValue2SDV_3002,

                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,
                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,
                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,

                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    ESD_3001_High: inputValueESD_3001,ESD_3001_Low:inputValue2ESD_3001,
                    SD_3001_High: inputValueSD_3001,SD_3001_Low:inputValue2SD_3001,
                    SD_3002_High: inputValueSD_3002,SD_3002_Low:inputValue2SD_3002,

                    IOT_Gateway_Phone: inputGetwayPhone,

      //==========================================


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


      EVC_01_Conn_STT_High:inputValueEVC_01_Conn_STT, EVC_01_Conn_STT_Low:inputValue2EVC_01_Conn_STT,

      EVC_02_Conn_STT_High:inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,
       PLC_Conn_STT_High:inputValuePLC_Conn_STT, PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,
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

          

    

    


            setPIT_3001B_High(inputValuePIT_3001B);
            setPIT_3001B_Low(inputValue2PIT_3001B);

            setPIT_3001A_High(inputValuePIT_3001A);
            setPIT_3001A_Low(inputValue2PIT_3001A);

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

            setSDV_3002_High(inputValueSDV_3002);
            setSDV_3002_Low(inputValue2SDV_3002);

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

            setESD_3001_High(inputValueESD_3001);
            setESD_3001_Low(inputValue2ESD_3001);

            setSD_3001_High(inputValueSD_3001);
            setSD_3001_Low(inputValue2SD_3001);



            setSD_3002_High(inputValueSD_3002);
            setSD_3002_Low(inputValue2SD_3002);
        


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
        setInputPCV_3001A(PCV_3001A)
        setInputPCV_3001B(PCV_3001B)
        setInputPCV_3002A(PCV_3002A)
        setInputPCV_3002B(PCV_3002B)


        setInputPSV_3001A(PSV_3001A)
        setInputPSV_3001B(PSV_3001B)
        setInputPSV_3002A(PSV_3002A)
        setInputPSV_3002B(PSV_3002B)
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




     






        setinputValuePIT_3001A(PIT_3001A_High); 
        setinputValue2PIT_3001A(PIT_3001A_Low); 

        setinputValuePIT_3001B(PIT_3001B_High); 
        setinputValue2PIT_3001B(PIT_3001B_Low); 

        setinputValuePT_3001(PT_3001_High); 
        setinputValue2PT_3001(PT_3001_Low); 

        setinputValuePT_3002(PT_3002_High); 
        setinputValue2PT_3002(PT_3002_Low); 
        
        setinputValuePT_3003(PT_3003_High); 
        setinputValue2PT_3003(PT_3003_Low); 

        setinputValueTT_3001(TT_3001_High); 
        setinputValue2TT_3001(TT_3001_Low); 

  
        setinputValueTT_3002(TT_3002_High); 
        setinputValue2TT_3002(TT_3002_Low); 

        setinputValueGD_3001(GD_3001_High); 
        setinputValue2GD_3001(GD_3001_Low); 


        setinputValueSDV_3001A(SDV_3001A_High); 
        setinputValue2SDV_3001A(SDV_3001A_Low); 

        setinputValueSDV_3001B(SDV_3001B_High); 
        setinputValue2SDV_3001B(SDV_3001B_Low); 

        setinputValueSDV_3002(SDV_3002_High); 
        setinputValue2SDV_3002(SDV_3002_Low); 

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

        setinputValueESD_3001(ESD_3001_High); 
        setinputValue2ESD_3001(ESD_3001_Low); 

        setinputValueSD_3001(SD_3001_High); 
        setinputValue2SD_3001(SD_3001_Low); 

        setinputValueSD_3002(SD_3002_High); 
        setinputValue2SD_3002(SD_3002_Low); 


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





           PIT_3001A_High, PIT_3001A_Low ,
        PIT_3001B_High, PIT_3001B_Low ,

        PT_3001_High, PT_3001_Low ,
        PT_3002_High,PT_3002_Low,
        PT_3003_High,PT_3003_Low,

         TT_3001_High,TT_3001_Low ,
          TT_3002_High,TT_3002_Low,
          
          GD_3001_High,GD_3001_Low ,
        
           SDV_3001A_High,SDV_3001A_Low,
           SDV_3001B_High,SDV_3001B_Low,
           SDV_3002_High,SDV_3002_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,

           HR_BC_High, HR_BC_Low ,
           ESD_3001_High,ESD_3001_Low,

           SD_3001_High,SD_3001_Low,
            SD_3002_High,SD_3002_Low ,

           getWayPhoneOTSUKA,
           PCV_3001A,
           PCV_3001B,
           PCV_3002A,
           PCV_3002B,

           PSV_3001A,
           PSV_3001B,
           PSV_3002A,
           PSV_3002B,

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
        
                const newPIT_3001A = checked;
                const newPIT_3001B = checked;
                const newPT_3001 = checked;
                const newPT_3002 = checked;
                const newPT_3003 = checked;
                const newTT_3001 = checked;
                const newTT_3002 = checked;
                const newGD_3001 = checked;
                const newSDV_3001A = checked;
                const newSDV_3001B = checked;
                const newSDV_3002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD_3001 = checked;
                const newHR_BC = checked;
                const newSD_3001 = checked;
                const newSD_3002 = checked;
                const newPLC_Conn_STT = checked;

            

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
        
                        PIT_3001A_Maintain: newPIT_3001A,
                        PIT_3001B_Maintain: newPIT_3001B,
                        PT_3001_Maintain: newPT_3001,
                        PT_3002_Maintain: newPT_3002,
                        PT_3003_Maintain: newPT_3003,
                        TT_3001_Maintain: newTT_3001,
                        TT_3002_Maintain: newTT_3002,
                        GD_3001_Maintain: newGD_3001,
                        SDV_3001A_Maintain: newSDV_3001A,
                        SDV_3001B_Maintain: newSDV_3001B,
                        SDV_3002_Maintain: newSDV_3002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_3001_Maintain: newESD_3001,
                        HR_BC_Maintain: newHR_BC,
                        SD_3001_Maintain: newSD_3001,
                        SD_3002_Maintain: newSD_3002,
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


setmaintainPIT_3001A(newPIT_3001A);
setmaintainPIT_3001B(newPIT_3001B);
setmaintainPT_3001(newPT_3001);
setmaintainPT_3002(newPT_3002);
setmaintainPT_3003(newPT_3003);
setmaintainTT_3001(newTT_3001);
setmaintainTT_3002(newTT_3002);
setmaintainGD_3001(newGD_3001);
setmaintainSDV_3001A(newSDV_3001A);
setmaintainSDV_3001B(newSDV_3001B);
setmaintainSDV_3002(newSDV_3002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD_3001(newESD_3001);
setmaintainHR_BC(newHR_BC);
setmaintainSD_3001(newSD_3001);
setmaintainSD_3002(newSD_3002);

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
        maintainPIT_3001A === true &&
        maintainPIT_3001B === true &&
        maintainPT_3001 === true &&
        maintainPT_3002 === true &&
        maintainPT_3003 === true &&
        maintainTT_3001 === true &&
        maintainTT_3002 === true &&
        maintainGD_3001 === true &&
        maintainSDV_3001A === true &&
        maintainSDV_3001B === true &&
        maintainSDV_3002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD_3001 === true &&
        maintainHR_BC === true &&
        maintainSD_3001 === true &&
        maintainSD_3002 === true &&
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
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
              
        
                const newPIT_3001A = checked;
                const newPIT_3001B = checked;
                const newPT_3001 = checked;
                const newPT_3002 = checked;
                const newPT_3003 = checked;
                const newTT_3001 = checked;
                const newTT_3002 = checked;
                const newGD_3001 = checked;
                const newSDV_3001A = checked;
                const newSDV_3001B = checked;
                const newSDV_3002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD_3001 = checked;
                const newHR_BC = checked;
                const newSD_3001 = checked;
                const newSD_3002 = checked;
                const newPLC_Conn_STT = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_HungYen}/SERVER_SCOPE`,
                    {
                      
        
                        PIT_3001A_Maintain: newPIT_3001A,
                        PIT_3001B_Maintain: newPIT_3001B,
                        PT_3001_Maintain: newPT_3001,
                        PT_3002_Maintain: newPT_3002,
                        PT_3003_Maintain: newPT_3003,
                        TT_3001_Maintain: newTT_3001,
                        TT_3002_Maintain: newTT_3002,
                        GD_3001_Maintain: newGD_3001,
                        SDV_3001A_Maintain: newSDV_3001A,
                        SDV_3001B_Maintain: newSDV_3001B,
                        SDV_3002_Maintain: newSDV_3002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_3001_Maintain: newESD_3001,
                        HR_BC_Maintain: newHR_BC,
                        SD_3001_Maintain: newSD_3001,
                        SD_3002_Maintain: newSD_3002,
                        PLC_Conn_STT_Maintain: newPLC_Conn_STT,

                    }
                );
        

setmaintainPIT_3001A(newPIT_3001A);
setmaintainPIT_3001B(newPIT_3001B);
setmaintainPT_3001(newPT_3001);
setmaintainPT_3002(newPT_3002);
setmaintainPT_3003(newPT_3003);
setmaintainTT_3001(newTT_3001);
setmaintainTT_3002(newTT_3002);
setmaintainGD_3001(newGD_3001);
setmaintainSDV_3001A(newSDV_3001A);
setmaintainSDV_3001B(newSDV_3001B);
setmaintainSDV_3002(newSDV_3002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD_3001(newESD_3001);
setmaintainHR_BC(newHR_BC);
setmaintainSD_3001(newSD_3001);
setmaintainSD_3002(newSD_3002);
setmaintainPLC_Conn_STT(newPLC_Conn_STT);

            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };


        const checkMaintaining = 
        maintainPIT_3001A === true &&
        maintainPIT_3001B === true &&
        maintainPT_3001 === true &&
        maintainPT_3002 === true &&
        maintainPT_3003 === true &&
        maintainTT_3001 === true &&
        maintainTT_3002 === true &&
        maintainGD_3001 === true &&
        maintainSDV_3001A === true &&
        maintainSDV_3001B === true &&
        maintainSDV_3002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD_3001 === true &&
        maintainHR_BC === true &&
        maintainSD_3001 === true &&
        maintainSD_3002 === true &&
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
            color:exceedThresholdPIT_3001B && !maintainPIT_3001B
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
    EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-3001A -  Parameter & configuration
  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC01}
            checked={checkMaintainingEVC01}
        />
     <p style={{fontSize:15}}>Maintain EVC-3001A </p>  </div> )} </span>,
    EVC02: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-3001B -  Parameter & configuration
  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC02}
            checked={checkMaintainingEVC02}
        />
     <p style={{fontSize:15}}>Maintain EVC-3001A </p>  </div> )} </span>,
    PLC: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameters & Configurations  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangePLC}
            checked={checkMaintaining}
        />
     <p style={{fontSize:15}}>Maintain PLC</p>  </div> )} </span>
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


const dataSDV_3001A = SDV_3001A === "0" ? "Close" : SDV_3001A === "1" ? "Open" : null;
const dataSDV_3001B = SDV_3001B === "0" ? "Close" : SDV_3001B === "1" ? "Open" : null;
const dataSDV_3002 = SDV_3002 === "0" ? "Close" : SDV_3002 === "1" ? "Open" : null;
const dataWater_PG = Water_PG === "0" ? "Normal" : Water_PG === "1" ? "Pressure Low" : null;
const dataWater_LSW = Water_LSW === "0" ? "Normal" : Water_LSW === "1" ? "Water Low" : null;
const dataPUMP_1 = PUMP_1 === "0" ? "Stop" : PUMP_1 === "1" ? "Rune" : null;
const dataPUMP_2 = PUMP_2 === "0" ? "Stop" : PUMP_2 === "1" ? "Rune" : null;
const dataHEATER_1 = HEATER_1 === "0" ? "Stop" : HEATER_1 === "1" ? "Rune" : null;
const dataHEATER_2 = HEATER_2 === "0" ? "Stop" : HEATER_2 === "1" ? "Rune" : null;
const dataBOILER = BOILER === "0" ? "Manual" : BOILER === "1" ? "Auto" : null;
const dataGD_STATUS = GD_STATUS === "0" ? "Normal" : GD_STATUS === "1" ? "Alarm" : null;
const dataESD_3001 = ESD_3001 === "0" ? "Not Active" : ESD_3001 === "1" ? "Active" : null;
const dataHR_BC = HR_BC === "0" ? "Normal" : HR_BC === "1" ? "Alarm" : null;
const dataSD_3001 = SD_3001 === "0" ? "Normal" : SD_3001 === "1" ? "Smoker Detected" : null;
const dataSD_3002 = SD_3002 === "0" ? "Normal" : SD_3002 === "1" ? "Smoker Detected" : null;

const DataEVC_01_Conn_STT = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null
const DataEVC_02_Conn_STT = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null
const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null


        const dataEVC01 = [



            

            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40002	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainEVC_01_Remain_Battery_Service_Life}
             checked={maintainEVC_01_Remain_Battery_Service_Life}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Temperature} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Temperature}>Temperature</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Temperature}>40851	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature}  {nameValue.C}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainEVC_01_Temperature}
             checked={maintainEVC_01_Temperature}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSEVC_01_Pressure}>Output Pressure</span> ,
   
            modbus: <span style={combineCss.CSSEVC_01_Pressure}>40853	 </span> ,
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
            high: <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangemaintainEVC_01_Pressure}
            checked={maintainEVC_01_Pressure}
        ></Checkbox>
   
           },

           {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}> Standard Volume Accumulated</span> ,
  
           modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40855	 </span> ,
  
          value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {EVC_01_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
           high: <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
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
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
          high: <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangemaintainEVC_01_Volume_at_Measurement_Condition}
          checked={maintainEVC_01_Volume_at_Measurement_Condition}
      ></Checkbox>
 
         },
         {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
         name: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

         modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40859	 </span> ,

        value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
         high: <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
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

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Condition} {nameValue.m3h} </span> , 
        high: <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Flow_at_Measurement_Condition}
        checked={maintainEVC_01_Flow_at_Measurement_Condition}
    ></Checkbox>

       },
       {
                mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40863	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {EVC_01_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
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

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {EVC_01_Vm_of_Current_Day} {nameValue.m3}</span> , 
        high: <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
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

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {EVC_01_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
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

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {EVC_01_Vm_of_Last_Day} {nameValue.m3}</span> , 
      high: <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangemaintainEVC_01_Vm_of_Last_Day}
      checked={maintainEVC_01_Vm_of_Last_Day}
  ></Checkbox>

     },


     { 
        mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSS_EVC_01_Conn_STT} >{EVC_STT01Value}</span>,
    modbus: <span style={combineCss.CSS_EVC_01_Conn_STT}>Status</span> ,

    name: <span style={combineCss.CSS_EVC_01_Conn_STT}> EVC Connection Status</span> ,

    value: <span style={combineCss.CSS_EVC_01_Conn_STT} > {EVC_01_Conn_STT} {DataEVC_01_Conn_STT}</span>, 
    high: <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_01_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Conn_STT} onChange={handleInputChangeEVC_01_Conn_STT} inputMode="decimal" />, 
    low:  <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_01_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Conn_STT} onChange={handleInputChange2EVC_01_Conn_STT} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_01_Conn_STT}
    checked={maintainEVC_01_Conn_STT}
></Checkbox>

    },

    

          ]


          const dataEVC02 = [

            {
                mainCategory: mainCategoryFC.EVC02,
                
                timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,
            name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
       
            modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40002	 </span> ,
       
           value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span> , 
            high: <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangemaintainEVC_02_Remain_Battery_Service_Life}
            checked={maintainEVC_02_Remain_Battery_Service_Life}
        ></Checkbox>
       
           },
    
        




    {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC_STT02Value}</span>,
    name: <span style={combineCss.CSSEVC_02_Temperature}>Temperature</span> ,

    modbus: <span style={combineCss.CSSEVC_02_Temperature}>40851	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Temperature} > {EVC_02_Temperature} {nameValue.C}</span> , 
    high: <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_02_Temperature}
    checked={maintainEVC_02_Temperature}
></Checkbox>

   },


   {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
   name: <span style={combineCss.CSSEVC_02_Pressure}>Output Pressure</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Pressure}>40853	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangemaintainEVC_02_Pressure}
   checked={maintainEVC_02_Pressure}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>Standard Volume Accumulated</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40855	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

  value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangemaintainEVC_02_Volume_at_Measurement_Condition}
   checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40859	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainEVC_02_Flow_at_Measurement_Condition}
 checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},

{
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40863	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.m3}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
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

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
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

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},
{ 
    mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSS_EVC_02_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_EVC_02_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_EVC_02_Conn_STT}> EVC Connection Status </span> ,

value: <span style={combineCss.CSS_EVC_02_Conn_STT} > {EVC_02_Conn_STT} {DataEVC_02_Conn_STT}</span>, 
high: <InputText  
disabled={AuthInputHighLow}

style={combineCss.CSS_EVC_02_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Conn_STT} onChange={handleInputChangeEVC_02_Conn_STT} inputMode="decimal" />, 
low:  <InputText  
disabled={AuthInputHighLow}

style={combineCss.CSS_EVC_02_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Conn_STT} onChange={handleInputChange2EVC_02_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainEVC_02_Conn_STT}
checked={maintainEVC_02_Conn_STT}
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
             low:  <InputText style={combineCss.CSSPIT_3001A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_3001A} onChange={handleInputChange2PIT_3001A} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPIT_3001A}
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
             onChange={ChangemaintainPIT_3001B}
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
             onChange={ChangemaintainPT_3001}
             checked={maintainPT_3001}
         ></Checkbox>
    
            },


            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_3002} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_3002}>Pressure Transmitter PT-3002</span> ,
    
             modbus: <span style={combineCss.CSSPT_3002}>40007	 </span> ,
    
            value: <span style={combineCss.CSSPT_3002} > {PT_3002}  {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPT_3002}   placeholder='High' step="0.1" type='number' value={inputValuePT_3002} onChange={handleInputChangePT_3002} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPT_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_3002} onChange={handleInputChange2PT_3002} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPT_3002}
             checked={maintainPT_3002}
         ></Checkbox>
    
            },

            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_3003} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPT_3003}>Pressure Transmitter PT-3003</span> ,
   
            modbus: <span style={combineCss.CSSPT_3003}>40009	 </span> ,
   
           value: <span style={combineCss.CSSPT_3003} > {PT_3003}  {nameValue.BARG}</span> , 
            high: <InputText style={combineCss.CSSPT_3003}   placeholder='High' step="0.1" type='number' value={inputValuePT_3003} onChange={handleInputChangePT_3003} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSPT_3003}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_3003} onChange={handleInputChange2PT_3003} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangemaintainPT_3003}
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
           onChange={ChangemaintainTT_3001}
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
         onChange={ChangemaintainTT_3002}
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
        onChange={ChangemaintainGD_3001}
        checked={maintainGD_3001}
    ></Checkbox>

       },



       {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3001A} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_3001A}>Shutdown Valve SDV-3001A</span> ,

       modbus: <span style={combineCss.CSSSDV_3001A}>40017	 </span> ,

      value: <span style={combineCss.CSSSDV_3001A} > {SDV_3001A} {dataSDV_3001A}</span> , 
       high: <InputText style={combineCss.CSSSDV_3001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3001A} onChange={handleInputChangeSDV_3001A} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_3001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3001A} onChange={handleInputChange2SDV_3001A} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainSDV_3001A}
       checked={maintainSDV_3001A}
   ></Checkbox>

      },


      {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3001B} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_3001B}>Shutdown Valve SDV-3001B</span> ,

      modbus: <span style={combineCss.CSSSDV_3001B}>40019	 </span> ,

     value: <span style={combineCss.CSSSDV_3001B} > {SDV_3001B} {dataSDV_3001B}</span> , 
      high: <InputText style={combineCss.CSSSDV_3001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3001B} onChange={handleInputChangeSDV_3001B} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_3001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3001B} onChange={handleInputChange2SDV_3001B} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangemaintainSDV_3001B}
      checked={maintainSDV_3001B}
  ></Checkbox>

     },
     {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_3002} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSSDV_3002}>Shutdown Valve SDV-3002</span> ,
    
     modbus: <span style={combineCss.CSSSDV_3002}>40021	 </span> ,
    
    value: <span style={combineCss.CSSSDV_3002} > {SDV_3002} {dataSDV_3002}</span> , 
     high: <InputText style={combineCss.CSSSDV_3002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_3002} onChange={handleInputChangeSDV_3002} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSSDV_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_3002} onChange={handleInputChange2SDV_3002} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangemaintainSDV_3002}
     checked={maintainSDV_3002}
    ></Checkbox>
    
    },


     {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSWater_PG} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSWater_PG}>Water Pressure</span> ,

     modbus: <span style={combineCss.CSSWater_PG}>40023	 </span> ,

    value: <span style={combineCss.CSSWater_PG} > {Water_PG} {dataWater_PG}</span> , 
     high: <InputText style={combineCss.CSSWater_PG}   placeholder='High' step="0.1" type='number' value={inputValueWater_PG} onChange={handleInputChangeWater_PG} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSWater_PG}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_PG} onChange={handleInputChange2Water_PG} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
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

   value: <span style={combineCss.CSSWater_LSW} > {Water_LSW} {dataWater_LSW}</span> , 
    high: <InputText style={combineCss.CSSWater_LSW}   placeholder='High' step="0.1" type='number' value={inputValueWater_LSW} onChange={handleInputChangeWater_LSW} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSWater_LSW}   placeholder='Low' step="0.1" type='number' value={inputValue2Water_LSW} onChange={handleInputChange2Water_LSW} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
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

  value: <span style={combineCss.CSSPUMP_1} > {PUMP_1} {dataPUMP_1}</span> , 
   high: <InputText style={combineCss.CSSPUMP_1}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_1} onChange={handleInputChangePUMP_1} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSPUMP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_1} onChange={handleInputChange2PUMP_1} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSPUMP_2} > {PUMP_2} {dataPUMP_2}</span> , 
  high: <InputText style={combineCss.CSSPUMP_2}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_2} onChange={handleInputChangePUMP_2} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSPUMP_2}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_2} onChange={handleInputChange2PUMP_2} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

  value: <span style={combineCss.CSSHEATER_1} > {HEATER_1} {dataHEATER_1}</span> , 
   high: <InputText style={combineCss.CSSHEATER_1}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_1} onChange={handleInputChangeHEATER_1} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSHEATER_1}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_1} onChange={handleInputChange2HEATER_1} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangemaintainHEATER_1}
   checked={maintainHEATER_1}
></Checkbox>

  },


  {
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSHEATER_2} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSHEATER_2}>Heater 1</span> ,

  modbus: <span style={combineCss.CSSHEATER_2}>40033</span> ,

 value: <span style={combineCss.CSSHEATER_2} > {HEATER_2} {dataHEATER_2}</span> , 
  high: <InputText style={combineCss.CSSHEATER_2}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_2} onChange={handleInputChangeHEATER_2} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSHEATER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_2} onChange={handleInputChange2HEATER_2} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSBOILER} > {BOILER} {dataBOILER}</span> , 
  high: <InputText style={combineCss.CSSBOILER}   placeholder='High' step="0.1" type='number' value={inputValueBOILER} onChange={handleInputChangeBOILER} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSBOILER}   placeholder='Low' step="0.1" type='number' value={inputValue2BOILER} onChange={handleInputChange2BOILER} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

value: <span style={combineCss.CSSGD_STATUS} > {GD_STATUS} {dataGD_STATUS}</span> , 
 high: <InputText style={combineCss.CSSGD_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD_STATUS} onChange={handleInputChangeGD_STATUS} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSGD_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_STATUS} onChange={handleInputChange2GD_STATUS} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainGD_STATUS}
 checked={maintainGD_STATUS}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSESD_3001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSESD_3001}> Emergency Shut ESD-3001</span> ,

modbus: <span style={combineCss.CSSESD_3001}>40039	 </span> ,

value: <span style={combineCss.CSSESD_3001} > {ESD_3001} {dataESD_3001}</span> , 
high: <InputText style={combineCss.CSSESD_3001}   placeholder='High' step="0.1" type='number' value={inputValueESD_3001} onChange={handleInputChangeESD_3001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSESD_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD_3001} onChange={handleInputChange2ESD_3001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainESD_3001}
checked={maintainESD_3001}
></Checkbox>

},




{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,

modbus: <span style={combineCss.CSSHR_BC}>40041	 </span> ,

value: <span style={combineCss.CSSHR_BC} > {HR_BC} {dataHR_BC}</span> , 
high: <InputText style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainHR_BC}
checked={maintainHR_BC}
></Checkbox>

},





{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD_3001} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_3001}>Smoke Detector SD-3001</span> ,

modbus: <span style={combineCss.CSSSD_3001}>40043	 </span> ,

value: <span style={combineCss.CSSSD_3001} > {SD_3001} {dataSD_3001}</span> , 
high: <InputText style={combineCss.CSSSD_3001}   placeholder='High' step="0.1" type='number' value={inputValueSD_3001} onChange={handleInputChangeSD_3001} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_3001}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_3001} onChange={handleInputChange2SD_3001} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainSD_3001}
checked={maintainSD_3001}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD_3002} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD_3002}> Smoke Detector SD-3002</span> ,

modbus: <span style={combineCss.CSSSD_3002}>40045	 </span> ,

value: <span style={combineCss.CSSSD_3002} > {SD_3002} {dataSD_3002}</span> , 
high: <InputText style={combineCss.CSSSD_3002}   placeholder='High' step="0.1" type='number' value={inputValueSD_3002} onChange={handleInputChangeSD_3002} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD_3002}   placeholder='Low' step="0.1" type='number' value={inputValue2SD_3002} onChange={handleInputChange2SD_3002} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainSD_3002}
checked={maintainSD_3002}
></Checkbox>

},

{ 
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSS_PLC_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_PLC_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_PLC_Conn_STT}>PLC Connection Status</span> ,

value: <span style={combineCss.CSS_PLC_Conn_STT} > {PLC_Conn_STT} {DataPLC_Conn_STT}</span>, 
high: <InputText  
disabled={AuthInputHighLow}

style={combineCss.CSS_PLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
low:  <InputText  
disabled={AuthInputHighLow}

style={combineCss.CSS_PLC_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
Maintain:   <Checkbox
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2001B {nameValue.BARG} </span>,
    
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2002A {nameValue.BARG} </span>,
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} 2002B {nameValue.BARG} </span>,
    
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001A {nameValue.BARG}</span>,
    
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2001B {nameValue.BARG}</span>,
    
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


                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002A {nameValue.BARG}</span>,
    
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} 2002B {nameValue.BARG}</span>,
    
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
   
        const maintainHeader = (
            <div>
    
                {!AuthInput && (
                    <Checkbox
                        style={{ marginRight: 5 }}
                        onChange={handleCheckboxChange}
                        checked={handleMaintainingAll}
                    />
                )} 
                Maintain
    
            </div>
        );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, marginTop:10 }}>
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
  {AuthInput ? " " :  <Column field="Maintain" header={maintainHeader} />
}
      {AuthInput ?  " " : <Column field="update" header="Update" /> }

</DataTable>


</div>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - configuration </h4>
                <DataTable value={configuration} size={"small"} selectionMode="single"
                
                columnResizeMode="expand"
                resizableColumns >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    {AuthUpdate ?  <Column field="Update" header="Update" />  : " "}
                </DataTable>
            </div>
<br />
<br />

</div>
  )
}
