import React, { useEffect, useRef, useState } from 'react'
import { id_CNG_PRU } from '../../data-table-device/ID-DEVICE/IdDevice';
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


                        SDV_6003: setSDV_6003,

                        PUMP_3: setPUMP_3,

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


            const PIT_6001A_High = res.data.find((item: any) => item.key === "PIT_6001A_High");
            setPIT_6001A_High(PIT_6001A_High?.value || null);
            const PIT_6001A_Low = res.data.find((item: any) => item.key === "PIT_6001A_Low");
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
            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const ESD_Maintain = res.data.find(
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


            setmaintainPIT_6001A(MaintainPIT_6001A?.value || false);
            setmaintainPIT_6001B(PIT_6001B_Maintain?.value || false);
            setmaintainPIT_6002A(PIT_6002A_Maintain?.value || false);
            setmaintainPIT_6002B(PIT_6002B_Maintain?.value || false);
            setmaintainPIT_6003A(PIT_6003A_Maintain?.value || false);
            setmaintainTIT_6001A(TIT_6001A_Maintain?.value || false);
            setmaintainTIT_6002(TIT_6002_Maintain?.value || false);
            setmaintainGD_6001(GD_6001_Maintain?.value || false);
            setmaintainSDV_6001A(SDV_6001A_Maintain?.value || false);
            setmaintainSDV_6001B(SDV_6001B_Maintain?.value || false);
            setmaintainSDV_6002(SDV_6002_Maintain?.value || false);
            setmaintainWater_LSW(Water_LSW_Maintain?.value || false);
            setmaintainWater_PG(Water_PG_Maintain?.value || false);
            setmaintainPUMP_2(PUMP_2_Maintain?.value || false);
            setmaintainPUMP_1(PUMP_1_Maintain?.value || false);
            setmaintainHEATER_2(HEATER_2_Maintain?.value || false);
            setmaintainHEATER_3(HEATER_3_Maintain?.value || false);

            setmaintainHEATER_1(HEATER_1_Maintain?.value || false);
            setmaintainBOILER(BOILER_Maintain?.value || false);
            setmaintainGD_STATUS(GD_STATUS_Maintain?.value || false);
            setmaintainESD(ESD_Maintain?.value || false);

            setmaintainPT_6004(PT_6004_Maintain?.value || false);


            setmaintainHR_BC(HR_BC_Maintain?.value || false);
            setmaintainSD(SD_Maintain?.value || false);
            setmaintainPT_6004(PT_6004_Maintain?.value || false);
            setmaintainPUMP_3(PUMP_3_Maintain?.value || false);



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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                      `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
            `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setmaintainEVC_02_Vm_of_Last_Day(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            

            
            
            // =================================================================================================================== 
            const [PIT_6001A, setPIT_6001A] = useState<string | null>(null);
            const [inputValuePIT_6001A, setinputValuePIT_6001A] = useState<any>();
            const [inputValue2PIT_6001A, setinputValue2PIT_6001A] = useState<any>();
            const [PIT_6001A_High, setPIT_6001A_High] = useState<number | null>(null);
            const [PIT_6001A_Low, setPIT_6001A_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_6001A, setexceedThresholdPIT_6001A] = useState(false); 
            const [maintainPIT_6001A, setmaintainPIT_6001A] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_6001AValue = parseFloat(PIT_6001A as any);
                const highValue = PIT_6001A_High ?? NaN;
                const lowValue = PIT_6001A_Low ?? NaN;
            
                if (!isNaN(PIT_6001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_6001A) {
                    setexceedThresholdPIT_6001A(PIT_6001AValue >= highValue || PIT_6001AValue <= lowValue);
                }
            }, [PIT_6001A, PIT_6001A_High, PIT_6001A_Low, maintainPIT_6001A]);
            
            const handleInputChangePIT_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_6001A(event.target.value);
            };
            
            const handleInputChange2PIT_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_6001A(event.target.value);
            };
            
            const ChangemaintainPIT_6001A = async () => {
                try {
                    const newValue = !maintainPIT_6001A;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { PIT_6001A_Maintain: newValue }
                    );
                    setmaintainPIT_6001A(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            

            
 // =================================================================================================================== 
            const [PIT_6001B, setPIT_6001B] = useState<string | null>(null);
            const [inputValuePIT_6001B, setinputValuePIT_6001B] = useState<any>();
            const [inputValue2PIT_6001B, setinputValue2PIT_6001B] = useState<any>();
            const [PIT_6001B_High, setPIT_6001B_High] = useState<number | null>(null);
            const [PIT_6001B_Low, setPIT_6001B_Low] = useState<number | null>(null);
            const [exceedThresholdPIT_6001B, setexceedThresholdPIT_6001B] = useState(false); 
            const [maintainPIT_6001B, setmaintainPIT_6001B] = useState<boolean>(false);
            
            useEffect(() => {
                const PIT_6001BValue = parseFloat(PIT_6001B as any);
                const highValue = PIT_6001B_High ?? NaN;
                const lowValue = PIT_6001B_Low ?? NaN;
            
                if (!isNaN(PIT_6001BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_6001B) {
                    setexceedThresholdPIT_6001B(PIT_6001BValue >= highValue || PIT_6001BValue <= lowValue);
                }
            }, [PIT_6001B, PIT_6001B_High, PIT_6001B_Low, maintainPIT_6001B]);
            
            const handleInputChangePIT_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValuePIT_6001B(event.target.value);
            };
            
            const handleInputChange2PIT_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
                setinputValue2PIT_6001B(event.target.value);
            };
            
            const ChangemaintainPIT_6001B = async () => {
                try {
                    const newValue = !maintainPIT_6001B;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                        { PIT_6001B_Maintain: newValue }
                    );
                    setmaintainPIT_6001B(newValue);
                } catch (error) {
                    console.error(error);
                }
            };

 
   
 
 
      // =================================================================================================================== 


      const [PIT_6002A, setPIT_6002A] = useState<string | null>(null);
      const [inputValuePIT_6002A, setinputValuePIT_6002A] = useState<any>();
      const [inputValue2PIT_6002A, setinputValue2PIT_6002A] = useState<any>();
      const [PIT_6002A_High, setPIT_6002A_High] = useState<number | null>(null);
      const [PIT_6002A_Low, setPIT_6002A_Low] = useState<number | null>(null);
      const [exceedThresholdPIT_6002A, setexceedThresholdPIT_6002A] = useState(false); 
      const [maintainPIT_6002A, setmaintainPIT_6002A] = useState<boolean>(false);
      
      useEffect(() => {
          const PIT_6002AValue = parseFloat(PIT_6002A as any);
          const highValue = PIT_6002A_High ?? NaN;
          const lowValue = PIT_6002A_Low ?? NaN;
      
          if (!isNaN(PIT_6002AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_6002A) {
              setexceedThresholdPIT_6002A(PIT_6002AValue >= highValue || PIT_6002AValue <= lowValue);
          }
      }, [PIT_6002A, PIT_6002A_High, PIT_6002A_Low, maintainPIT_6002A]);
      
      const handleInputChangePIT_6002A = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePIT_6002A(event.target.value);
      };
      
      const handleInputChange2PIT_6002A = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PIT_6002A(event.target.value);
      };
      
      const ChangemaintainPIT_6002A = async () => {
          try {
              const newValue = !maintainPIT_6002A;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                  { PIT_6002A_Maintain: newValue }
              );
              setmaintainPIT_6002A(newValue);
          } catch (error) {
              console.error(error);
          }
      };


      // =================================================================================================================== 
      const [PIT_6002B, setPIT_6002B] = useState<string | null>(null);
      const [inputValuePIT_6002B, setinputValuePIT_6002B] = useState<any>();
      const [inputValue2PIT_6002B, setinputValue2PIT_6002B] = useState<any>();
      const [PIT_6002B_High, setPIT_6002B_High] = useState<number | null>(null);
      const [PIT_6002B_Low, setPIT_6002B_Low] = useState<number | null>(null);
      const [exceedThresholdPIT_6002B, setexceedThresholdPIT_6002B] = useState(false); 
      const [maintainPIT_6002B, setmaintainPIT_6002B] = useState<boolean>(false);
      
      useEffect(() => {
          const PIT_6002BValue = parseFloat(PIT_6002B as any);
          const highValue = PIT_6002B_High ?? NaN;
          const lowValue = PIT_6002B_Low ?? NaN;
      
          if (!isNaN(PIT_6002BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_6002B) {
              setexceedThresholdPIT_6002B(PIT_6002BValue >= highValue || PIT_6002BValue <= lowValue);
          }
      }, [PIT_6002B, PIT_6002B_High, PIT_6002B_Low, maintainPIT_6002B]);
      
      const handleInputChangePIT_6002B = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValuePIT_6002B(event.target.value);
      };
      
      const handleInputChange2PIT_6002B = (event: React.ChangeEvent<HTMLInputElement>) => {
          setinputValue2PIT_6002B(event.target.value);
      };
      
      const ChangemaintainPIT_6002B = async () => {
          try {
              const newValue = !maintainPIT_6002B;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                  { PIT_6002B_Maintain: newValue }
              );
              setmaintainPIT_6002B(newValue);
          } catch (error) {
              console.error(error);
          }
      };


 
 
      
      
           // =================================================================================================================== 


           const [PIT_6003A, setPIT_6003A] = useState<string | null>(null);
           const [inputValuePIT_6003A, setinputValuePIT_6003A] = useState<any>();
           const [inputValue2PIT_6003A, setinputValue2PIT_6003A] = useState<any>();
           const [PIT_6003A_High, setPIT_6003A_High] = useState<number | null>(null);
           const [PIT_6003A_Low, setPIT_6003A_Low] = useState<number | null>(null);
           const [exceedThresholdPIT_6003A, setexceedThresholdPIT_6003A] = useState(false); 
           const [maintainPIT_6003A, setmaintainPIT_6003A] = useState<boolean>(false);
           
           useEffect(() => {
               const PIT_6003AValue = parseFloat(PIT_6003A as any);
               const highValue = PIT_6003A_High ?? NaN;
               const lowValue = PIT_6003A_Low ?? NaN;
           
               if (!isNaN(PIT_6003AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPIT_6003A) {
                   setexceedThresholdPIT_6003A(PIT_6003AValue >= highValue || PIT_6003AValue <= lowValue);
               }
           }, [PIT_6003A, PIT_6003A_High, PIT_6003A_Low, maintainPIT_6003A]);
           
           const handleInputChangePIT_6003A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValuePIT_6003A(event.target.value);
           };
           
           const handleInputChange2PIT_6003A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2PIT_6003A(event.target.value);
           };
           
           const ChangemaintainPIT_6003A = async () => {
               try {
                   const newValue = !maintainPIT_6003A;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { PIT_6003A_Maintain: newValue }
                   );
                   setmaintainPIT_6003A(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
     
 
 
      
      
      
           // =================================================================================================================== 



           const [TIT_6001A, setTIT_6001A] = useState<string | null>(null);
           const [inputValueTIT_6001A, setinputValueTIT_6001A] = useState<any>();
           const [inputValue2TIT_6001A, setinputValue2TIT_6001A] = useState<any>();
           const [TIT_6001A_High, setTIT_6001A_High] = useState<number | null>(null);
           const [TIT_6001A_Low, setTIT_6001A_Low] = useState<number | null>(null);
           const [exceedThresholdTIT_6001A, setexceedThresholdTIT_6001A] = useState(false); 
           const [maintainTIT_6001A, setmaintainTIT_6001A] = useState<boolean>(false);
           
           useEffect(() => {
               const TIT_6001AValue = parseFloat(TIT_6001A as any);
               const highValue = TIT_6001A_High ?? NaN;
               const lowValue = TIT_6001A_Low ?? NaN;
           
               if (!isNaN(TIT_6001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTIT_6001A) {
                   setexceedThresholdTIT_6001A(TIT_6001AValue >= highValue || TIT_6001AValue <= lowValue);
               }
           }, [TIT_6001A, TIT_6001A_High, TIT_6001A_Low, maintainTIT_6001A]);
           
           const handleInputChangeTIT_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTIT_6001A(event.target.value);
           };
           
           const handleInputChange2TIT_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TIT_6001A(event.target.value);
           };
           
           const ChangemaintainTIT_6001A = async () => {
               try {
                   const newValue = !maintainTIT_6001A;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { TIT_6001A_Maintain: newValue }
                   );
                   setmaintainTIT_6001A(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


 
        
      
      
           // =================================================================================================================== 


           const [GD_6001, setGD_6001] = useState<string | null>(null);
           const [inputValueGD_6001, setinputValueGD_6001] = useState<any>();
           const [inputValue2GD_6001, setinputValue2GD_6001] = useState<any>();
           const [GD_6001_High, setGD_6001_High] = useState<number | null>(null);
           const [GD_6001_Low, setGD_6001_Low] = useState<number | null>(null);
           const [exceedThresholdGD_6001, setexceedThresholdGD_6001] = useState(false); 
           const [maintainGD_6001, setmaintainGD_6001] = useState<boolean>(false);
           
           useEffect(() => {
               const GD_6001Value = parseFloat(GD_6001 as any);
               const highValue = GD_6001_High ?? NaN;
               const lowValue = GD_6001_Low ?? NaN;
           
               if (!isNaN(GD_6001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_6001) {
                   setexceedThresholdGD_6001(GD_6001Value >= highValue || GD_6001Value <= lowValue);
               }
           }, [GD_6001, GD_6001_High, GD_6001_Low, maintainGD_6001]);
           
           const handleInputChangeGD_6001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueGD_6001(event.target.value);
           };
           
           const handleInputChange2GD_6001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2GD_6001(event.target.value);
           };
           
           const ChangemaintainGD_6001 = async () => {
               try {
                   const newValue = !maintainGD_6001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { GD_6001_Maintain: newValue }
                   );
                   setmaintainGD_6001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
           // =================================================================================================================== 

           const [TIT_6002, setTIT_6002] = useState<string | null>(null);
           const [inputValueTIT_6002, setinputValueTIT_6002] = useState<any>();
           const [inputValue2TIT_6002, setinputValue2TIT_6002] = useState<any>();
           const [TIT_6002_High, setTIT_6002_High] = useState<number | null>(null);
           const [TIT_6002_Low, setTIT_6002_Low] = useState<number | null>(null);
           const [exceedThresholdTIT_6002, setexceedThresholdTIT_6002] = useState(false); 
           const [maintainTIT_6002, setmaintainTIT_6002] = useState<boolean>(false);
           
           useEffect(() => {
               const TIT_6002Value = parseFloat(TIT_6002 as any);
               const highValue = TIT_6002_High ?? NaN;
               const lowValue = TIT_6002_Low ?? NaN;
           
               if (!isNaN(TIT_6002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTIT_6002) {
                   setexceedThresholdTIT_6002(TIT_6002Value >= highValue || TIT_6002Value <= lowValue);
               }
           }, [TIT_6002, TIT_6002_High, TIT_6002_Low, maintainTIT_6002]);
           
           const handleInputChangeTIT_6002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueTIT_6002(event.target.value);
           };
           
           const handleInputChange2TIT_6002 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2TIT_6002(event.target.value);
           };
           
           const ChangemaintainTIT_6002 = async () => {
               try {
                   const newValue = !maintainTIT_6002;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { TIT_6002_Maintain: newValue }
                   );
                   setmaintainTIT_6002(newValue);
               } catch (error) {
                   console.error(error);
               }
           };


      
      
           // ===================================================================================================================
           
           

           const [SDV_6001A, setSDV_6001A] = useState<string | null>(null);
           const [inputValueSDV_6001A, setinputValueSDV_6001A] = useState<any>();
           const [inputValue2SDV_6001A, setinputValue2SDV_6001A] = useState<any>();
           const [SDV_6001A_High, setSDV_6001A_High] = useState<number | null>(null);
           const [SDV_6001A_Low, setSDV_6001A_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_6001A, setexceedThresholdSDV_6001A] = useState(false); 
           const [maintainSDV_6001A, setmaintainSDV_6001A] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_6001AValue = parseFloat(SDV_6001A as any);
               const highValue = SDV_6001A_High ?? NaN;
               const lowValue = SDV_6001A_Low ?? NaN;
           
               if (!isNaN(SDV_6001AValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_6001A) {
                   setexceedThresholdSDV_6001A(SDV_6001AValue >= highValue || SDV_6001AValue <= lowValue);
               }
           }, [SDV_6001A, SDV_6001A_High, SDV_6001A_Low, maintainSDV_6001A]);
           
           const handleInputChangeSDV_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_6001A(event.target.value);
           };
           
           const handleInputChange2SDV_6001A = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_6001A(event.target.value);
           };
           
           const ChangemaintainSDV_6001A = async () => {
               try {
                   const newValue = !maintainSDV_6001A;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { SDV_6001A_Maintain: newValue }
                   );
                   setmaintainSDV_6001A(newValue);
               } catch (error) {
                   console.error(error);
               }
           };

 
 
        
      
      
           // =================================================================================================================== 


           const [SDV_6001B, setSDV_6001B] = useState<string | null>(null);
           const [inputValueSDV_6001B, setinputValueSDV_6001B] = useState<any>();
           const [inputValue2SDV_6001B, setinputValue2SDV_6001B] = useState<any>();
           const [SDV_6001B_High, setSDV_6001B_High] = useState<number | null>(null);
           const [SDV_6001B_Low, setSDV_6001B_Low] = useState<number | null>(null);
           const [exceedThresholdSDV_6001B, setexceedThresholdSDV_6001B] = useState(false); 
           const [maintainSDV_6001B, setmaintainSDV_6001B] = useState<boolean>(false);
           
           useEffect(() => {
               const SDV_6001BValue = parseFloat(SDV_6001B as any);
               const highValue = SDV_6001B_High ?? NaN;
               const lowValue = SDV_6001B_Low ?? NaN;
           
               if (!isNaN(SDV_6001BValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_6001B) {
                   setexceedThresholdSDV_6001B(SDV_6001BValue >= highValue || SDV_6001BValue <= lowValue);
               }
           }, [SDV_6001B, SDV_6001B_High, SDV_6001B_Low, maintainSDV_6001B]);
           
           const handleInputChangeSDV_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValueSDV_6001B(event.target.value);
           };
           
           const handleInputChange2SDV_6001B = (event: React.ChangeEvent<HTMLInputElement>) => {
               setinputValue2SDV_6001B(event.target.value);
           };
           
           const ChangemaintainSDV_6001B = async () => {
               try {
                   const newValue = !maintainSDV_6001B;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                       { SDV_6001B_Maintain: newValue }
                   );
                   setmaintainSDV_6001B(newValue);
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
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                 `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
             `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
             { HEATER_2_Maintain: newValue }
         );
         setmaintainHEATER_2(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 
 
 
 
 // =================================================================================================================== 

 const [HEATER_3, setHEATER_3] = useState<string | null>(null);
 const [inputValueHEATER_3, setinputValueHEATER_3] = useState<any>();
 const [inputValue2HEATER_3, setinputValue2HEATER_3] = useState<any>();
 const [HEATER_3_High, setHEATER_3_High] = useState<number | null>(null);
 const [HEATER_3_Low, setHEATER_3_Low] = useState<number | null>(null);
 const [exceedThresholdHEATER_3, setexceedThresholdHEATER_3] = useState(false); 
 const [maintainHEATER_3, setmaintainHEATER_3] = useState<boolean>(false);
 
 useEffect(() => {
     const HEATER_3Value = parseFloat(HEATER_3 as any);
     const highValue = HEATER_3_High ?? NaN;
     const lowValue = HEATER_3_Low ?? NaN;
 
     if (!isNaN(HEATER_3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHEATER_3) {
         setexceedThresholdHEATER_3(HEATER_3Value >= highValue || HEATER_3Value <= lowValue);
     }
 }, [HEATER_3, HEATER_3_High, HEATER_3_Low, maintainHEATER_3]);
 
 const handleInputChangeHEATER_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueHEATER_3(event.target.value);
 };
 
 const handleInputChange2HEATER_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2HEATER_3(event.target.value);
 };
 
 const ChangemaintainHEATER_3 = async () => {
     try {
         const newValue = !maintainHEATER_3;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
             { HEATER_3_Maintain: newValue }
         );
         setmaintainHEATER_3(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 
 
 
 
 // =================================================================================================================== 
  
 const [SDV_6002, setSDV_6002] = useState<string | null>(null);
 const [inputValueSDV_6002, setinputValueSDV_6002] = useState<any>();
 const [inputValue2SDV_6002, setinputValue2SDV_6002] = useState<any>();
 const [SDV_6002_High, setSDV_6002_High] = useState<number | null>(null);
 const [SDV_6002_Low, setSDV_6002_Low] = useState<number | null>(null);
 const [exceedThresholdSDV_6002, setexceedThresholdSDV_6002] = useState(false); 
 const [maintainSDV_6002, setmaintainSDV_6002] = useState<boolean>(false);
 
 useEffect(() => {
     const SDV_6002Value = parseFloat(SDV_6002 as any);
     const highValue = SDV_6002_High ?? NaN;
     const lowValue = SDV_6002_Low ?? NaN;
 
     if (!isNaN(SDV_6002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_6002) {
         setexceedThresholdSDV_6002(SDV_6002Value >= highValue || SDV_6002Value <= lowValue);
     }
 }, [SDV_6002, SDV_6002_High, SDV_6002_Low, maintainSDV_6002]);
 
 const handleInputChangeSDV_6002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValueSDV_6002(event.target.value);
 };
 
 const handleInputChange2SDV_6002 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setinputValue2SDV_6002(event.target.value);
 };
 
 const ChangemaintainSDV_6002 = async () => {
     try {
         const newValue = !maintainSDV_6002;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
             { SDV_6002_Maintain: newValue }
         );
         setmaintainSDV_6002(newValue);
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
             `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { GD_STATUS_Maintain: newValue }
                 );
                 setmaintainGD_STATUS(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
        
         
             // =================================================================================================================== 


             const [ESD, setESD] = useState<string | null>(null);
             const [inputValueESD, setinputValueESD] = useState<any>();
             const [inputValue2ESD, setinputValue2ESD] = useState<any>();
             const [ESD_High, setESD_High] = useState<number | null>(null);
             const [ESD_Low, setESD_Low] = useState<number | null>(null);
             const [exceedThresholdESD, setexceedThresholdESD] = useState(false); 
             const [maintainESD, setmaintainESD] = useState<boolean>(false);
             
             useEffect(() => {
                 const ESDValue = parseFloat(ESD as any);
                 const highValue = ESD_High ?? NaN;
                 const lowValue = ESD_Low ?? NaN;
             
                 if (!isNaN(ESDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD) {
                     setexceedThresholdESD(ESDValue >= highValue || ESDValue <= lowValue);
                 }
             }, [ESD, ESD_High, ESD_Low, maintainESD]);
             
             const handleInputChangeESD = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setinputValueESD(event.target.value);
             };
             
             const handleInputChange2ESD = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setinputValue2ESD(event.target.value);
             };
             
             const ChangemaintainESD = async () => {
                 try {
                     const newValue = !maintainESD;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                         { ESD_Maintain: newValue }
                     );
                     setmaintainESD(newValue);
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
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { HR_BC_Maintain: newValue }
                 );
                 setmaintainHR_BC(newValue);
             } catch (error) {
                 console.error(error);
             }
         };


        


    
    
         
         // =================================================================================================================== 
         const [SD, setSD] = useState<string | null>(null);
         const [inputValueSD, setinputValueSD] = useState<any>();
         const [inputValue2SD, setinputValue2SD] = useState<any>();
         const [SD_High, setSD_High] = useState<number | null>(null);
         const [SD_Low, setSD_Low] = useState<number | null>(null);
         const [exceedThresholdSD, setexceedThresholdSD] = useState(false); 
         const [maintainSD, setmaintainSD] = useState<boolean>(false);
         
         useEffect(() => {
             const SDValue = parseFloat(SD as any);
             const highValue = SD_High ?? NaN;
             const lowValue = SD_Low ?? NaN;
         
             if (!isNaN(SDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD) {
                 setexceedThresholdSD(SDValue >= highValue || SDValue <= lowValue);
             }
         }, [SD, SD_High, SD_Low, maintainSD]);
         
         const handleInputChangeSD = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValueSD(event.target.value);
         };
         
         const handleInputChange2SD = (event: React.ChangeEvent<HTMLInputElement>) => {
             setinputValue2SD(event.target.value);
         };
         
         const ChangemaintainSD = async () => {
             try {
                 const newValue = !maintainSD;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                     { SD_Maintain: newValue }
                 );
                 setmaintainSD(newValue);
             } catch (error) {
                 console.error(error);
             }
         };

    

         
         
              // =================================================================================================================== 


              const [SDV_6003, setSDV_6003] = useState<string | null>(null);
              const [inputValueSDV_6003, setinputValueSDV_6003] = useState<any>();
              const [inputValue2SDV_6003, setinputValue2SDV_6003] = useState<any>();
              const [SDV_6003_High, setSDV_6003_High] = useState<number | null>(null);
              const [SDV_6003_Low, setSDV_6003_Low] = useState<number | null>(null);
              const [exceedThresholdSDV_6003, setexceedThresholdSDV_6003] = useState(false); 
              const [maintainSDV_6003, setmaintainSDV_6003] = useState<boolean>(false);
              
              useEffect(() => {
                  const SDV_6003Value = parseFloat(SDV_6003 as any);
                  const highValue = SDV_6003_High ?? NaN;
                  const lowValue = SDV_6003_Low ?? NaN;
              
                  if (!isNaN(SDV_6003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_6003) {
                      setexceedThresholdSDV_6003(SDV_6003Value >= highValue || SDV_6003Value <= lowValue);
                  }
              }, [SDV_6003, SDV_6003_High, SDV_6003_Low, maintainSDV_6003]);
              
              const handleInputChangeSDV_6003 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValueSDV_6003(event.target.value);
              };
              
              const handleInputChange2SDV_6003 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2SDV_6003(event.target.value);
              };
              
              const ChangemaintainSDV_6003 = async () => {
                  try {
                      const newValue = !maintainSDV_6003;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { SDV_6003_Maintain: newValue }
                      );
                      setmaintainSDV_6003(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
     
         
     
              
              
                   // =================================================================================================================== 
     

              const [PT_6004, setPT_6004] = useState<string | null>(null);
              const [inputValuSD, setinputValuSD] = useState<any>();
              const [inputValue2PT_6004, setinputValue2PT_6004] = useState<any>();
              const [PT_6004_High, setPT_6004_High] = useState<number | null>(null);
              const [PT_6004_Low, setPT_6004_Low] = useState<number | null>(null);
              const [exceedThresholdPT_6004, setexceedThresholdPT_6004] = useState(false); 
              const [maintainPT_6004, setmaintainPT_6004] = useState<boolean>(false);
              
              useEffect(() => {
                  const PT_6004Value = parseFloat(PT_6004 as any);
                  const highValue = PT_6004_High ?? NaN;
                  const lowValue = PT_6004_Low ?? NaN;
              
                  if (!isNaN(PT_6004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_6004) {
                      setexceedThresholdPT_6004(PT_6004Value >= highValue || PT_6004Value <= lowValue);
                  }
              }, [PT_6004, PT_6004_High, PT_6004_Low, maintainPT_6004]);
              
              const handleInputChangSD = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValuSD(event.target.value);
              };
              
              const handleInputChange2PT_6004 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2PT_6004(event.target.value);
              };
              
              const ChangemaintainPT_6004 = async () => {
                  try {
                      const newValue = !maintainPT_6004;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { PT_6004_Maintain: newValue }
                      );
                      setmaintainPT_6004(newValue);
                  } catch (error) {
                      console.error(error);
                  }
              };
     
    
    

         
              // =================================================================================================================== 


              const [PUMP_3, setPUMP_3] = useState<string | null>(null);
              const [inputValuePUMP_3, setinputValuePUMP_3] = useState<any>();
              const [inputValue2PUMP_3, setinputValue2PUMP_3] = useState<any>();
              const [PUMP_3_High, setPUMP_3_High] = useState<number | null>(null);
              const [PUMP_3_Low, setPUMP_3_Low] = useState<number | null>(null);
              const [exceedThresholdPUMP_3, setexceedThresholdPUMP_3] = useState(false); 
              const [maintainPUMP_3, setmaintainPUMP_3] = useState<boolean>(false);
              
              useEffect(() => {
                  const PUMP_3Value = parseFloat(PUMP_3 as any);
                  const highValue = PUMP_3_High ?? NaN;
                  const lowValue = PUMP_3_Low ?? NaN;
              
                  if (!isNaN(PUMP_3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPUMP_3) {
                      setexceedThresholdPUMP_3(PUMP_3Value >= highValue || PUMP_3Value <= lowValue);
                  }
              }, [PUMP_3, PUMP_3_High, PUMP_3_Low, maintainPUMP_3]);
              
              const handleInputChangePUMP_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValuePUMP_3(event.target.value);
              };
              
              const handleInputChange2PUMP_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setinputValue2PUMP_3(event.target.value);
              };
              
              const ChangemaintainPUMP_3 = async () => {
                  try {
                      const newValue = !maintainPUMP_3;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                          { PUMP_3_Maintain: newValue }
                      );
                      setmaintainPUMP_3(newValue);
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
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                          `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,



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
                 
                    PIT_6001B_High: inputValuePIT_6001B,PIT_6001B_Low:inputValue2PIT_6001B,
                    PIT_6001A_High: inputValuePIT_6001A,PIT_6001A_Low:inputValue2PIT_6001A,

                    PIT_6002A_High: inputValuePIT_6002A,PIT_6002A_Low:inputValue2PIT_6002A,
                    PIT_6002B_High: inputValuePIT_6002B,PIT_6002B_Low:inputValue2PIT_6002B,
                    PIT_6003A_High: inputValuePIT_6003A,PIT_6003A_Low:inputValue2PIT_6003A,

                    TIT_6001A_High: inputValueTIT_6001A,TIT_6001A_Low:inputValue2TIT_6001A,
                    TIT_6002_High: inputValueTIT_6002,TIT_6002_Low:inputValue2TIT_6002,
                    GD_6001_High: inputValueGD_6001,GD_6001_Low:inputValue2GD_6001,

                    SDV_6001B_High: inputValueSDV_6001B,SDV_6001B_Low:inputValue2SDV_6001B,
                    SDV_6001A_High: inputValueSDV_6001A,SDV_6001A_Low:inputValue2SDV_6001A,
                    SDV_6002_High: inputValueSDV_6002,SDV_6002_Low:inputValue2SDV_6002,

                    Water_PG_High: inputValueWater_PG,Water_PG_Low:inputValue2Water_PG,
                    Water_LSW_High: inputValueWater_LSW,Water_LSW_Low:inputValue2Water_LSW,
                    PUMP_1_High: inputValuePUMP_1,PUMP_1_Low:inputValue2PUMP_1,
                    PUMP_2_High: inputValuePUMP_2,PUMP_2_Low:inputValue2PUMP_2,

                    HEATER_1_High: inputValueHEATER_1,HEATER_1_Low:inputValue2HEATER_1,
                    HEATER_2_High: inputValueHEATER_2,HEATER_2_Low:inputValue2HEATER_2,
                    HEATER_3_High: inputValueHEATER_3,HEATER_3_Low:inputValue2HEATER_3,

                    BOILER_High: inputValueBOILER,BOILER_Low:inputValue2BOILER,
                    GD_STATUS_High: inputValueGD_STATUS,GD_STATUS_Low:inputValue2GD_STATUS,
                    ESD_High: inputValueESD,ESD_Low:inputValue2ESD,


                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,
                    PT_6004_High: inputValuSD,PT_6004_Low:inputValue2PT_6004,
                    PUMP_3_High: inputValuePUMP_3,PUMP_3_Low:inputValue2PUMP_3,

                    SDV_6003_High: inputValueSDV_6003,SDV_6003_Low:inputValue2SDV_6003,


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


      EVC_01_Conn_STT_High:inputValueEVC_01_Conn_STT, EVC_01_Conn_STT_Low:inputValue2EVC_01_Conn_STT,

      EVC_02_Conn_STT_High:inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,
       PLC_Conn_STT_High:inputValuePLC_Conn_STT, PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,
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
            setGetWayPhoneOTSUKA(inputGetwayPhone);


            setSDV_6003_High(inputValueSDV_6003);
            setSDV_6003_Low(inputValue2SDV_6003);
        
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

          

    

    


            setPIT_6001B_High(inputValuePIT_6001B);
            setPIT_6001B_Low(inputValue2PIT_6001B);

            setPIT_6001A_High(inputValuePIT_6001A);
            setPIT_6001A_Low(inputValue2PIT_6001A);

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

            setSDV_6001B_High(inputValueSDV_6001B);
            setSDV_6001B_Low(inputValue2SDV_6001B);

            setSDV_6001A_High(inputValueSDV_6001A);
            setSDV_6001A_Low(inputValue2SDV_6001A);

            setSDV_6002_High(inputValueSDV_6002);
            setSDV_6002_Low(inputValue2SDV_6002);

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

            setHEATER_3_High(inputValueHEATER_3);
            setHEATER_3_Low(inputValue2HEATER_3);

            setBOILER_High(inputValueBOILER);
            setBOILER_Low(inputValue2BOILER);

            setGD_STATUS_High(inputValueGD_STATUS);
            setGD_STATUS_Low(inputValue2GD_STATUS);

            setESD_High(inputValueESD);
            setESD_Low(inputValue2ESD);

            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setPT_6004_High(inputValuSD);
            setPT_6004_Low(inputValue2PT_6004);



            setPUMP_3_High(inputValuePUMP_3);
            setPUMP_3_Low(inputValue2PUMP_3);
        


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
        setInputPCV_6001A(PCV_6001A)
        setInputPCV_6001B(PCV_6001B)
        setInputPCV_6002A(PCV_6002A)
        setInputPCV_6002B(PCV_6002B)


        setInputPSV_6001A(PSV_6001A)
        setInputPSV_6001B(PSV_6001B)
        setInputPSV_6002A(PSV_6002A)
        setInputPSV_6002B(PSV_6002B)
//========================================================
        setInputGetwayPhone(getWayPhoneOTSUKA)
   
    

      


        setinputValueSDV_6003(SDV_6003_High); 
        setinputValue2SDV_6003(SDV_6003_Low); 

   


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




     






        setinputValuePIT_6001A(PIT_6001A_High); 
        setinputValue2PIT_6001A(PIT_6001A_Low); 

        setinputValuePIT_6001B(PIT_6001B_High); 
        setinputValue2PIT_6001B(PIT_6001B_Low); 

        setinputValuePIT_6002A(PIT_6002A_High); 
        setinputValue2PIT_6002A(PIT_6002A_Low); 

        setinputValuePIT_6002B(PIT_6002B_High); 
        setinputValue2PIT_6002B(PIT_6002B_Low); 
        
        setinputValuePIT_6003A(PIT_6003A_High); 
        setinputValue2PIT_6003A(PIT_6003A_Low); 

        setinputValueTIT_6001A(TIT_6001A_High); 
        setinputValue2TIT_6001A(TIT_6001A_Low); 

  
        setinputValueTIT_6002(TIT_6002_High); 
        setinputValue2TIT_6002(TIT_6002_Low); 

        setinputValueGD_6001(GD_6001_High); 
        setinputValue2GD_6001(GD_6001_Low); 


        setinputValueSDV_6001A(SDV_6001A_High); 
        setinputValue2SDV_6001A(SDV_6001A_Low); 

        setinputValueSDV_6001B(SDV_6001B_High); 
        setinputValue2SDV_6001B(SDV_6001B_Low); 

        setinputValueSDV_6002(SDV_6002_High); 
        setinputValue2SDV_6002(SDV_6002_Low); 

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


        setinputValueHEATER_3(HEATER_3_High); 
        setinputValue2HEATER_3(HEATER_3_Low); 


        setinputValueBOILER(BOILER_High); 
        setinputValue2BOILER(BOILER_Low);
        


        setinputValueGD_STATUS(GD_STATUS_High); 
        setinputValue2GD_STATUS(GD_STATUS_Low); 


        setinputValueESD(ESD_High); 
        setinputValue2ESD(ESD_Low); 

        setinputValueHR_BC(HR_BC_High); 
        setinputValue2HR_BC(HR_BC_Low); 

        setinputValueSD(SD_High); 
        setinputValue2SD(SD_Low); 

        setinputValuSD(PT_6004_High); 
        setinputValue2PT_6004(PT_6004_Low); 

        setinputValuePUMP_3(PUMP_3_High); 
        setinputValue2PUMP_3(PUMP_3_Low); 


        setinputValueEVC_01_Conn_STT(EVC_01_Conn_STT_High)
        setinputValue2EVC_01_Conn_STT(EVC_01_Conn_STT_Low)

        setinputValueEVC_02_Conn_STT(EVC_02_Conn_STT_High)
        setinputValue2EVC_02_Conn_STT(EVC_02_Conn_STT_Low)


        setinputValuePLC_Conn_STT(PLC_Conn_STT_High)
        setinputValue2PLC_Conn_STT(PLC_Conn_STT_Low)

    }, [
        
 
        SDV_6003_High, SDV_6003_Low ,
        
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





           PIT_6001A_High, PIT_6001A_Low ,
        PIT_6001B_High, PIT_6001B_Low ,

        PIT_6002A_High, PIT_6002A_Low ,
        PIT_6002B_High,PIT_6002B_Low,
        PIT_6003A_High,PIT_6003A_Low,

         TIT_6001A_High,TIT_6001A_Low ,
          TIT_6002_High,TIT_6002_Low,
          
          GD_6001_High,GD_6001_Low ,
        
           SDV_6001A_High,SDV_6001A_Low,
           SDV_6001B_High,SDV_6001B_Low,
           SDV_6002_High,SDV_6002_Low,

           Water_PG_High,Water_PG_Low,
           Water_LSW_High,Water_LSW_Low,

           PUMP_1_High,PUMP_1_Low,
           PUMP_2_High,PUMP_2_Low,
           HEATER_3_High,HEATER_3_Low,

           HEATER_2_High,HEATER_2_Low,
           HEATER_1_High,HEATER_1_Low,
           BOILER_High,BOILER_Low,
           GD_STATUS_High,GD_STATUS_Low,

           ESD_High,ESD_Low,


           HR_BC_High, HR_BC_Low ,
           SD_High,SD_Low,

           PT_6004_High,PT_6004_Low,
            PUMP_3_High,PUMP_3_Low ,

           getWayPhoneOTSUKA,
           PCV_6001A,
           PCV_6001B,
           PCV_6002A,
           PCV_6002B,

           PSV_6001A,
           PSV_6001B,
           PSV_6002A,
           PSV_6002B,

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
        
                const newPIT_6001A = checked;
                const newPIT_6001B = checked;
                const newPIT_6002A = checked;
                const newPIT_6002B = checked;
                const newPIT_6003A = checked;
                const newTIT_6001A = checked;
                const newTIT_6002 = checked;
                const newGD_6001 = checked;
                const newSDV_6001A = checked;
                const newSDV_6001B = checked;
                const newSDV_6002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newHEATER_3 = checked;

                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD = checked;

                const newSDV_6003 = checked;


                const newSD = checked;
                const newHR_BC = checked;
                const newPT_6004 = checked;
                const newPUMP_3 = checked;
                const newPLC_Conn_STT = checked;

            

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
        
                        PIT_6001A_Maintain: newPIT_6001A,
                        PIT_6001B_Maintain: newPIT_6001B,
                        PIT_6002A_Maintain: newPIT_6002A,
                        PIT_6002B_Maintain: newPIT_6002B,
                        PIT_6003A_Maintain: newPIT_6003A,
                        TIT_6001A_Maintain: newTIT_6001A,
                        TIT_6002_Maintain: newTIT_6002,
                        GD_6001_Maintain: newGD_6001,
                        SDV_6001A_Maintain: newSDV_6001A,
                        SDV_6001B_Maintain: newSDV_6001B,
                        SDV_6002_Maintain: newSDV_6002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        HEATER_3_Maintain: newHEATER_3,

                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_Maintain: newESD,

                        SDV_6003_Maintain: newSDV_6003,


                        SD_Maintain: newSD,
                        HR_BC_Maintain: newHR_BC,
                        PT_6004_Maintain: newPT_6004,
                        PUMP_3_Maintain: newPUMP_3,
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


setmaintainPIT_6001A(newPIT_6001A);
setmaintainPIT_6001B(newPIT_6001B);
setmaintainPIT_6002A(newPIT_6002A);
setmaintainPIT_6002B(newPIT_6002B);
setmaintainPIT_6003A(newPIT_6003A);
setmaintainTIT_6001A(newTIT_6001A);
setmaintainTIT_6002(newTIT_6002);
setmaintainGD_6001(newGD_6001);
setmaintainSDV_6001A(newSDV_6001A);
setmaintainSDV_6001B(newSDV_6001B);
setmaintainSDV_6002(newSDV_6002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainHEATER_3(newHEATER_3);

setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD(newESD);

setmaintainSD(newSD);


setmaintainHR_BC(newHR_BC);
setmaintainPT_6004(newPT_6004);
setmaintainPUMP_3(newPUMP_3);

setmaintainSDV_6003(newSDV_6003);


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
        maintainPIT_6001A === true &&
        maintainPIT_6001B === true &&
        maintainPIT_6002A === true &&
        maintainPIT_6002B === true &&
        maintainPIT_6003A === true &&
        maintainTIT_6001A === true &&
        maintainTIT_6002 === true &&
        maintainGD_6001 === true &&
        maintainSDV_6001A === true &&
        maintainSDV_6001B === true &&
        maintainSDV_6002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainHEATER_3 === true &&

        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD === true &&


        maintainSDV_6003 === true &&


        maintainSD === true &&
        maintainHR_BC === true &&
        maintainPT_6004 === true &&
        maintainPUMP_3 === true &&
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
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
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
              
        
                const newPIT_6001A = checked;
                const newPIT_6001B = checked;
                const newPIT_6002A = checked;
                const newPIT_6002B = checked;
                const newPIT_6003A = checked;
                const newTIT_6001A = checked;
                const newTIT_6002 = checked;
                const newGD_6001 = checked;
                const newSDV_6001A = checked;
                const newSDV_6001B = checked;
                const newSDV_6002 = checked;
                const newWater_PG = checked;
                const newWater_LSW = checked;
                const newPUMP_1 = checked;
                const newPUMP_2 = checked;
                const newHEATER_1 = checked;
                const newHEATER_2 = checked;
                const newHEATER_3 = checked;

                const newBOILER = checked;
                const newGD_STATUS = checked;
                const newESD = checked;

                const newSD = checked;
                const newHR_BC = checked;
                const newPT_6004 = checked;
                const newPUMP_3 = checked;
                const newSDV_6003 = checked;


                const newPLC_Conn_STT = checked;

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_CNG_PRU}/SERVER_SCOPE`,
                    {
                      
        
                        PIT_6001A_Maintain: newPIT_6001A,
                        PIT_6001B_Maintain: newPIT_6001B,
                        PIT_6002A_Maintain: newPIT_6002A,
                        PIT_6002B_Maintain: newPIT_6002B,
                        PIT_6003A_Maintain: newPIT_6003A,
                        TIT_6001A_Maintain: newTIT_6001A,
                        TIT_6002_Maintain: newTIT_6002,
                        GD_6001_Maintain: newGD_6001,
                        SDV_6001A_Maintain: newSDV_6001A,
                        SDV_6001B_Maintain: newSDV_6001B,
                        SDV_6002_Maintain: newSDV_6002,
                        Water_PG_Maintain: newWater_PG,
                        Water_LSW_Maintain: newWater_LSW,
                        PUMP_1_Maintain: newPUMP_1,
                        PUMP_2_Maintain: newPUMP_2,
                        HEATER_1_Maintain: newHEATER_1,
                        HEATER_2_Maintain: newHEATER_2,
                        HEATER_3_Maintain: newHEATER_3,

                        SDV_6003_Maintain: newSDV_6003,


                        BOILER_Maintain: newBOILER,
                        GD_STATUS_Maintain: newGD_STATUS,
                        ESD_Maintain: newESD,

                        SD_Maintain: newSD,
                        HR_BC_Maintain: newHR_BC,
                        PT_6004_Maintain: newPT_6004,
                        PUMP_3_Maintain: newPUMP_3,
                        PLC_Conn_STT_Maintain: newPLC_Conn_STT,

                    }
                );
        

setmaintainPIT_6001A(newPIT_6001A);
setmaintainPIT_6001B(newPIT_6001B);
setmaintainPIT_6002A(newPIT_6002A);
setmaintainPIT_6002B(newPIT_6002B);
setmaintainPIT_6003A(newPIT_6003A);
setmaintainTIT_6001A(newTIT_6001A);
setmaintainTIT_6002(newTIT_6002);
setmaintainGD_6001(newGD_6001);
setmaintainSDV_6001A(newSDV_6001A);
setmaintainSDV_6001B(newSDV_6001B);
setmaintainSDV_6002(newSDV_6002);
setmaintainWater_PG(newWater_PG);
setmaintainWater_LSW(newWater_LSW);
setmaintainPUMP_1(newPUMP_1);
setmaintainPUMP_2(newPUMP_2);
setmaintainHEATER_1(newHEATER_1);
setmaintainHEATER_2(newHEATER_2);
setmaintainHEATER_3(newHEATER_3);

setmaintainSDV_6003(newSDV_6003);


setmaintainBOILER(newBOILER);
setmaintainGD_STATUS(newGD_STATUS);
setmaintainESD(newESD);
setmaintainHR_BC(newHR_BC);
setmaintainPT_6004(newPT_6004);
setmaintainPUMP_3(newPUMP_3);
setmaintainPLC_Conn_STT(newPLC_Conn_STT);

            } catch (error) {
                console.error('Error updating maintain values:', error);
            }
        };


        const checkMaintaining = 
        maintainPIT_6001A === true &&
        maintainPIT_6001B === true &&
        maintainPIT_6002A === true &&
        maintainPIT_6002B === true &&
        maintainPIT_6003A === true &&
        maintainTIT_6001A === true &&
        maintainTIT_6002 === true &&
        maintainGD_6001 === true &&
        maintainSDV_6001A === true &&
        maintainSDV_6001B === true &&
        maintainSDV_6002 === true &&
        maintainWater_PG === true &&
        maintainWater_LSW === true &&
        maintainPUMP_1 === true &&
        maintainPUMP_2 === true &&
        maintainHEATER_1 === true &&
        maintainHEATER_2 === true &&
        maintainHEATER_3 === true &&

        maintainSDV_6003 === true &&


        maintainBOILER === true &&
        maintainGD_STATUS === true &&
        maintainESD === true &&
        maintainHR_BC === true &&
        maintainPT_6004 === true &&
        maintainPUMP_3 === true &&
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
            color:exceedThresholdPIT_6001B && !maintainPIT_6001B
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


        CSSSDV_6002 : {
            color:exceedThresholdSDV_6002 && !maintainSDV_6002
            ? "#ff5656"
            : maintainSDV_6002
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

        CSSESD : {
            color:exceedThresholdESD && !maintainESD
            ? "#ff5656"
            : maintainESD
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



        CSSSDV_6003: {
            color:exceedThresholdSDV_6003 && !maintainSDV_6003
            ? "#ff5656"
            : maintainSDV_6003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
            
        },
  };
    
  const mainCategoryFC = {
    EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-6001A -  Parameter & Configurations
  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC01}
            checked={checkMaintainingEVC01}
        />
     <p style={{fontSize:15}}>Maintain EVC-6001A </p>  </div> )} </span>,
    EVC02: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>   EVC-6001B -  Parameter & Configurations
  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC02}
            checked={checkMaintainingEVC02}
        />
     <p style={{fontSize:15}}>Maintain EVC-6001B </p>  </div> )} </span>,
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


const dataSDV_6001A = SDV_6001A === "0" ? "Close" : SDV_6001A === "1" ? "Open" : null;
const dataSDV_6001B = SDV_6001B === "0" ? "Close" : SDV_6001B === "1" ? "Open" : null;
const dataSDV_6002 = SDV_6002 === "0" ? "Close" : SDV_6002 === "1" ? "Open" : null;
const dataWater_PG = Water_PG === "0" ? "Normal" : Water_PG === "1" ? "Pressure Low" : null;
const dataWater_LSW = Water_LSW === "0" ? "Normal" : Water_LSW === "1" ? "Water Low" : null;
const dataPUMP_1 = PUMP_1 === "0" ? "Stop" : PUMP_1 === "1" ? "Run" : null;
const dataPUMP_2 = PUMP_2 === "0" ? "Stop" : PUMP_2 === "1" ? "Run" : null;

const dataPUMP_3 = PUMP_3 === "0" ? "Stop" : PUMP_3 === "1" ? "Rune" : null;

const dataHEATER_1 = HEATER_1 === "0" ? "Stop" : HEATER_1 === "1" ? "Run" : null;
const dataHEATER_2 = HEATER_2 === "0" ? "Stop" : HEATER_2 === "1" ? "Run" : null;
const dataHEATER_3 = HEATER_3 === "0" ? "Stop" : HEATER_3 === "1" ? "Run" : null;

const dataBOILER = BOILER === "0" ? "Manual" : BOILER === "1" ? "Auto" : null;
const dataGD_STATUS = GD_STATUS === "0" ? "Normal" : GD_STATUS === "1" ? "Alarm" : null;
const dataESD = ESD === "0" ? "Normal" : ESD === "1" ? "Alarm" : null;

const dataSD = SD === "0" ? "Normal" : SD === "1" ? "Alarm" : null;
const dataHR_BC = HR_BC === "0" ? "Normal" : HR_BC === "1" ? "Alarm" : null;
const dataPT_6004 = PT_6004 === "0" ? "Normal" : PT_6004 === "1" ? "Smoker Detected" : null;

const DataEVC_01_Conn_STT = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null
const DataEVC_02_Conn_STT = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null
const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null


const DataSDV_6003 = SDV_6003 === "0" ? "Close" : SDV_6003 === "1" ? "Open" : null



        const dataEVC01 = [



            

            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40001	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
    
             modbus: <span style={combineCss.CSSEVC_01_Temperature}>40850	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature}  {nameValue.C}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
   
            modbus: <span style={combineCss.CSSEVC_01_Pressure}>40852	 </span> ,
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
            high: <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
            update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
  
           modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40854	 </span> ,
  
          value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {EVC_01_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
           high: <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
           update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
 
          modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40856	 </span> ,
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
          high: <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
          update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

         modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40858	 </span> ,

        value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
         high: <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

        modbus: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>40860	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Condition} {nameValue.m3h} </span> , 
        high: <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
        update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40862	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {EVC_01_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
       update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

        modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40864	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {EVC_01_Vm_of_Current_Day} {nameValue.m3}</span> , 
        high: <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40866	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {EVC_01_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

      modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40868	 </span> ,

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {EVC_01_Vm_of_Last_Day} {nameValue.m3}</span> , 
      high: <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
       
            modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40001	 </span> ,
       
           value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span> , 
            high: <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
            update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

    modbus: <span style={combineCss.CSSEVC_02_Temperature}>40850	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Temperature} > {EVC_02_Temperature} {nameValue.C}</span> , 
    high: <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
    update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

   modbus: <span style={combineCss.CSSEVC_02_Pressure}>40852	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
   update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

  modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40854	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

   modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40856	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
   update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

  modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40858	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

 modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40860	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
 update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40862	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

 modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40864	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.m3}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40866	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40868	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
                
                timeUpdate: <span style={combineCss.CSSPIT_6001A} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6001A}>Pressure Indicator Transmitter PIT-6001A</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6001A}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPIT_6001A} > {PIT_6001A} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6001A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6001A} onChange={handleInputChangePIT_6001A} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6001A} onChange={handleInputChange2PIT_6001A} inputMode="decimal" />,
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPIT_6001A}
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
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPIT_6001B}
             checked={maintainPIT_6001B}
         ></Checkbox>
    
            },
    
            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPIT_6002A} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6002A}>Pressure Transmitter PIT-6002A</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6002A}>40005</span> ,
    
            value: <span style={combineCss.CSSPIT_6002A} > {PIT_6002A} {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6002A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6002A} onChange={handleInputChangePIT_6002A} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6002A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6002A} onChange={handleInputChange2PIT_6002A} inputMode="decimal" />,
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPIT_6002A}
             checked={maintainPIT_6002A}
         ></Checkbox>
    
            },


            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPIT_6002B} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPIT_6002B}>Pressure Transmitter PIT-6002B</span> ,
    
             modbus: <span style={combineCss.CSSPIT_6002B}>40007	 </span> ,
    
            value: <span style={combineCss.CSSPIT_6002B} > {PIT_6002B}  {nameValue.BARG}</span> , 
             high: <InputText style={combineCss.CSSPIT_6002B}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6002B} onChange={handleInputChangePIT_6002B} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSPIT_6002B}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6002B} onChange={handleInputChange2PIT_6002B} inputMode="decimal" />,
             update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangemaintainPIT_6002B}
             checked={maintainPIT_6002B}
         ></Checkbox>
    
            },

            {
    mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPIT_6003A} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPIT_6003A}>Pressure Transmitter PIT-6003A</span> ,
   
            modbus: <span style={combineCss.CSSPIT_6003A}>40009	 </span> ,
   
           value: <span style={combineCss.CSSPIT_6003A} > {PIT_6003A}  {nameValue.BARG}</span> , 
            high: <InputText style={combineCss.CSSPIT_6003A}   placeholder='High' step="0.1" type='number' value={inputValuePIT_6003A} onChange={handleInputChangePIT_6003A} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSPIT_6003A}   placeholder='Low' step="0.1" type='number' value={inputValue2PIT_6003A} onChange={handleInputChange2PIT_6003A} inputMode="decimal" />,
            update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangemaintainPIT_6003A}
            checked={maintainPIT_6003A}
        ></Checkbox>
   
           },


           {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTIT_6001A} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSTIT_6001A}>Temperature Transmitter TIT-6001A</span> ,
  
           modbus: <span style={combineCss.CSSTIT_6001A}>40011	 </span> ,
  
          value: <span style={combineCss.CSSTIT_6001A} > {TIT_6001A} {nameValue.C}</span> , 
           high: <InputText style={combineCss.CSSTIT_6001A}   placeholder='High' step="0.1" type='number' value={inputValueTIT_6001A} onChange={handleInputChangeTIT_6001A} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSTIT_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2TIT_6001A} onChange={handleInputChange2TIT_6001A} inputMode="decimal" />,
           update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangemaintainTIT_6001A}
           checked={maintainTIT_6001A}
       ></Checkbox>
  
          },

         {
    mainCategory: mainCategoryFC.PLC,
            
            timeUpdate: <span style={combineCss.CSSTIT_6002} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSTIT_6002}>Temperature Transmitter TIT-6002</span> ,

         modbus: <span style={combineCss.CSSTIT_6002}>40013	 </span> ,

        value: <span style={combineCss.CSSTIT_6002} > {TIT_6002} {nameValue.C}</span> , 
         high: <InputText style={combineCss.CSSTIT_6002}   placeholder='High' step="0.1" type='number' value={inputValueTIT_6002} onChange={handleInputChangeTIT_6002} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSTIT_6002}   placeholder='Low' step="0.1" type='number' value={inputValue2TIT_6002} onChange={handleInputChange2TIT_6002} inputMode="decimal" />,
         update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainTIT_6002}
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
        update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainGD_6001}
        checked={maintainGD_6001}
    ></Checkbox>

       },

    

       {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_6001A} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_6001A}>Shutdown Valve SDV-6001A</span> ,

       modbus: <span style={combineCss.CSSSDV_6001A}>40017	 </span> ,

      value: <span style={combineCss.CSSSDV_6001A} > {SDV_6001A} {dataSDV_6001A}</span> , 
       high: <InputText style={combineCss.CSSSDV_6001A}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6001A} onChange={handleInputChangeSDV_6001A} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_6001A}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6001A} onChange={handleInputChange2SDV_6001A} inputMode="decimal" />,
       update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainSDV_6001A}
       checked={maintainSDV_6001A}
   ></Checkbox>

      },


      {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_6001B} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_6001B}>Shutdown Valve SDV-6001B</span> ,

      modbus: <span style={combineCss.CSSSDV_6001B}>40019	 </span> ,

     value: <span style={combineCss.CSSSDV_6001B} > {SDV_6001B} {dataSDV_6001B}</span> , 
      high: <InputText style={combineCss.CSSSDV_6001B}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6001B} onChange={handleInputChangeSDV_6001B} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_6001B}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6001B} onChange={handleInputChange2SDV_6001B} inputMode="decimal" />,
      update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangemaintainSDV_6001B}
      checked={maintainSDV_6001B}
  ></Checkbox>

     },

     {
    mainCategory: mainCategoryFC.PLC,
        
        timeUpdate: <span style={combineCss.CSSSDV_6002} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSSDV_6002}>Shutdown Valve SDV-6002</span> ,
    
     modbus: <span style={combineCss.CSSSDV_6002}>40021	 </span> ,
    
    value: <span style={combineCss.CSSSDV_6002} > {SDV_6002} {dataSDV_6002}</span> , 
     high: <InputText style={combineCss.CSSSDV_6002}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6002} onChange={handleInputChangeSDV_6002} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSSDV_6002}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6002} onChange={handleInputChange2SDV_6002} inputMode="decimal" />,
     update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangemaintainSDV_6002}
     checked={maintainSDV_6002}
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
     update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
    update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
   update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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
   update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
   Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSHEATER_2} > {HEATER_2} {dataHEATER_2}</span> , 
  high: <InputText style={combineCss.CSSHEATER_2}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_2} onChange={handleInputChangeHEATER_2} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSHEATER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_2} onChange={handleInputChange2HEATER_2} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangemaintainHEATER_2}
  checked={maintainHEATER_2}
></Checkbox>

 },


 {
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSHEATER_3} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSHEATER_3}>Heater 3</span> ,

  modbus: <span style={combineCss.CSSHEATER_3}>40035</span> ,

 value: <span style={combineCss.CSSHEATER_3} > {HEATER_3} {dataHEATER_3}</span> , 
  high: <InputText style={combineCss.CSSHEATER_3}   placeholder='High' step="0.1" type='number' value={inputValueHEATER_3} onChange={handleInputChangeHEATER_3} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSHEATER_3}   placeholder='Low' step="0.1" type='number' value={inputValue2HEATER_3} onChange={handleInputChange2HEATER_3} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangemaintainHEATER_3}
  checked={maintainHEATER_3}
></Checkbox>

 },





{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSBOILER} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSBOILER}>Boiler</span> ,

  modbus: <span style={combineCss.CSSBOILER}>40037	 </span> ,

 value: <span style={combineCss.CSSBOILER} > {BOILER} {dataBOILER}</span> , 
  high: <InputText style={combineCss.CSSBOILER}   placeholder='High' step="0.1" type='number' value={inputValueBOILER} onChange={handleInputChangeBOILER} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSBOILER}   placeholder='Low' step="0.1" type='number' value={inputValue2BOILER} onChange={handleInputChange2BOILER} inputMode="decimal" />,
  update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
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

 modbus: <span style={combineCss.CSSGD_STATUS}>40039	 </span> ,

value: <span style={combineCss.CSSGD_STATUS} > {GD_STATUS} {dataGD_STATUS}</span> , 
 high: <InputText style={combineCss.CSSGD_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD_STATUS} onChange={handleInputChangeGD_STATUS} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSGD_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_STATUS} onChange={handleInputChange2GD_STATUS} inputMode="decimal" />,
 update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainGD_STATUS}
 checked={maintainGD_STATUS}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSESD} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSESD}>Emergency Shutdown</span> ,

 modbus: <span style={combineCss.CSSESD}>40041	 </span> ,

value: <span style={combineCss.CSSESD} > {ESD} {dataESD}</span> , 
 high: <InputText style={combineCss.CSSESD}   placeholder='High' step="0.1" type='number' value={inputValueESD} onChange={handleInputChangeESD} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSESD}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD} onChange={handleInputChange2ESD} inputMode="decimal" />,
 update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainESD}
 checked={maintainESD}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,

modbus: <span style={combineCss.CSSHR_BC}>40043	 </span> ,

value: <span style={combineCss.CSSHR_BC} > {HR_BC} {dataHR_BC}</span> , 
high: <InputText style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainHR_BC}
checked={maintainHR_BC}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD}>Smoker Detector</span> ,

modbus: <span style={combineCss.CSSSD}>40045	 </span> ,

value: <span style={combineCss.CSSSD} > {SD} {dataSD}</span> , 
high: <InputText style={combineCss.CSSSD}   placeholder='High' step="0.1" type='number' value={inputValueSD} onChange={handleInputChangeSD} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSD}   placeholder='Low' step="0.1" type='number' value={inputValue2SD} onChange={handleInputChange2SD} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainSD}
checked={maintainSD}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSPT_6004} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPT_6004}>Pressure Transmitter PT-6004</span> ,

modbus: <span style={combineCss.CSSPT_6004}>40047	 </span> ,

value: <span style={combineCss.CSSPT_6004} > {PT_6004} (BarG)</span> , 
high: <InputText style={combineCss.CSSPT_6004}   placeholder='High' step="0.1" type='number' value={inputValuSD} onChange={handleInputChangSD} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSPT_6004}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_6004} onChange={handleInputChange2PT_6004} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainPT_6004}
checked={maintainPT_6004}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSPUMP_3} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPUMP_3}>Pump 3</span> ,

modbus: <span style={combineCss.CSSPUMP_3}>40049	 </span> ,

value: <span style={combineCss.CSSPUMP_3} > {PUMP_3} {dataPUMP_3}</span> , 
high: <InputText style={combineCss.CSSPUMP_3}   placeholder='High' step="0.1" type='number' value={inputValuePUMP_3} onChange={handleInputChangePUMP_3} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSPUMP_3}   placeholder='Low' step="0.1" type='number' value={inputValue2PUMP_3} onChange={handleInputChange2PUMP_3} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainPUMP_3}
checked={maintainPUMP_3}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSDV_6003} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSDV_6003}>Shutdown Valve SDV-6003</span> ,

modbus: <span style={combineCss.CSSSDV_6003}>40051	 </span> ,

value: <span style={combineCss.CSSSDV_6003} > {SDV_6003} {DataSDV_6003}</span> , 
high: <InputText style={combineCss.CSSSDV_6003}   placeholder='High' step="0.1" type='number' value={inputValueSDV_6003} onChange={handleInputChangeSDV_6003} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSSDV_6003}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_6003} onChange={handleInputChange2SDV_6003} inputMode="decimal" />,
update:  <Button disabled={AuthInput} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangemaintainSDV_6003}
checked={maintainSDV_6003}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-6001A)  {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-6001B)  {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-6002A)  {nameValue.BARG} </span>,
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-6002B)  {nameValue.BARG} </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-6001A)  {nameValue.BARG}</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-6001B)  {nameValue.BARG}</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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


                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-6002A)  {nameValue.BARG}</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-6002B)  {nameValue.BARG}</span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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
                Name: <span style={combineCssAttribute.PCV}>IOT gateway phone number </span>,
    
                Value: (
                    <InputText
                        style={combineCssAttribute.PCV}
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

<h2>CNG PRU</h2>

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
                <h4>Station - Configuration </h4>
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
