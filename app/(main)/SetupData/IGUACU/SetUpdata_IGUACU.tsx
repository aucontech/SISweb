import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import "./LowHighOtsuka.css"
import { id_IGUECU } from '../../data-table-device/ID-DEVICE/IdDevice';
import { Button } from 'primereact/button';
import { namePCV_PSV, nameValue } from '../namValue';
import { Calendar } from 'primereact/calendar';
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
export default function SetUpdata_IGUACU() {

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

    const [PCV_01,setPCV_01] = useState<any>()
    const [inputPCV_01, setInputPCV_01] = useState<any>();

    const [PCV_02,setPCV_02] = useState<any>()
    const [inputPCV_02, setInputPCV_02] = useState<any>();

    const [PSV_01,setPSV_01] = useState<any>()
    const [inputPSV_01, setInputPSV_01] = useState<any>();


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

        const AuthUpdatePCV = userId !== UserTechnican.A  &&
        userId !== UserTechnican.Q &&
         userId !==  UserTechnican.N &&
          userId !== UserTechnican.T  &&
           userId !== UserTechnican.TN &&
            userId !== UserTechnican.DT &&
            userId !== UserTechnican.KL ;


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
                    entityId: id_IGUECU,
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
                                id: id_IGUECU,
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



                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,
                        DI_MAP_1: setDI_MAP_1,
                        DI_UPS_BATTERY: setDI_UPS_BATTERY,
                        DI_UPS_CHARGING: setDI_UPS_CHARGING,
                        DI_UPS_ALARM: setDI_UPS_ALARM,
                        DI_SELECT_SW: setDI_SELECT_SW,
                        DI_RESET: setDI_RESET,
                        Emergency_NO: setEmergency_NO,
                        Emergency_NC: setEmergency_NC,
                        UPS_Mode: setUPS_Mode,
                        DO_HR_01: setDO_HR_01,
                        DO_BC_01: setDO_BC_01,
                        DO_SV_01: setDO_SV_01,

                  
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_01?.value;
                    setPCV_01(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_01?.value;
                    setPCV_01(updatedData);
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_02?.value;
                    setPCV_02(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_02?.value;
                    setPCV_02(updatedData);
                }
                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PSV_01?.value;
                    setPSV_01(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PSV_01?.value;
                    setPSV_01(updatedData);
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
                `/plugins/telemetry/DEVICE/${id_IGUECU}/values/attributes/SERVER_SCOPE`
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
            const GD1_High = res.data.find((item: any) => item.key === "GD1_High");
            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find((item: any) => item.key === "GD1_Low");
            setGD1_Low(GD1_Low?.value || null);
            const MaintainGD1 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );


            const GD2_High = res.data.find((item: any) => item.key === "GD2_High");
            setGD2_High(GD2_High?.value || null);
            const GD2_Low = res.data.find((item: any) => item.key === "GD2_Low");
            setGD2_Low(GD2_Low?.value || null);
            const GD2_Maintain = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );

            const PT1_High = res.data.find((item: any) => item.key === "PT1_High");
            setPT1_High(PT1_High?.value || null);
            const PT1_Low = res.data.find((item: any) => item.key === "PT1_Low");
            setPT1_Low(PT1_Low?.value || null);
            const PT1_Maintain = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );


            const DI_ZSO_1_High = res.data.find((item: any) => item.key === "DI_ZSO_1_High");
            setDI_ZSO_1_High(DI_ZSO_1_High?.value || null);
            const DI_ZSO_1_Low = res.data.find((item: any) => item.key === "DI_ZSO_1_Low");
            setDI_ZSO_1_Low(DI_ZSO_1_Low?.value || null);
            const DI_ZSO_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSO_1_Maintain"
            );

            const DI_ZSC_1_High = res.data.find((item: any) => item.key === "DI_ZSC_1_High");
            setDI_ZSC_1_High(DI_ZSC_1_High?.value || null);
            const DI_ZSC_1_Low = res.data.find((item: any) => item.key === "DI_ZSC_1_Low");
            setDI_ZSC_1_Low(DI_ZSC_1_Low?.value || null);
            const DI_ZSC_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSC_1_Maintain"
            );

            const DI_MAP_1_High = res.data.find((item: any) => item.key === "DI_MAP_1_High");
            setDI_MAP_1_High(DI_MAP_1_High?.value || null);
            const DI_MAP_1_Low = res.data.find((item: any) => item.key === "DI_MAP_1_Low");
            setDI_MAP_1_Low(DI_MAP_1_Low?.value || null);
            const DI_MAP_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_MAP_1_Maintain"
            );


            const DI_UPS_BATTERY_High = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
            setDI_UPS_BATTERY_High(DI_UPS_BATTERY_High?.value || null);
            const DI_UPS_BATTERY_Low = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
            setDI_UPS_BATTERY_Low(DI_UPS_BATTERY_Low?.value || null);
            const DI_UPS_BATTERY_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
            );


            const DI_UPS_CHARGING_High = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_High");
            setDI_UPS_CHARGING_High(DI_UPS_CHARGING_High?.value || null);
            const DI_UPS_CHARGING_Low = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_Low");
            setDI_UPS_CHARGING_Low(DI_UPS_CHARGING_Low?.value || null);
            const DI_UPS_CHARGING_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_CHARGING_Maintain"
            );

            const DI_UPS_ALARM_High = res.data.find((item: any) => item.key === "DI_UPS_ALARM_High");
            setDI_UPS_ALARM_High(DI_UPS_ALARM_High?.value || null);
            const DI_UPS_ALARM_Low = res.data.find((item: any) => item.key === "DI_UPS_ALARM_Low");
            setDI_UPS_ALARM_Low(DI_UPS_ALARM_Low?.value || null);
            const DI_UPS_ALARM_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_ALARM_Maintain"
            );


            const DI_RESET_High = res.data.find((item: any) => item.key === "DI_RESET_High");
            setDI_RESET_High(DI_RESET_High?.value || null);
            const DI_RESET_Low = res.data.find((item: any) => item.key === "DI_RESET_Low");
            setDI_RESET_Low(DI_RESET_Low?.value || null);
            const DI_RESET_Maintain = res.data.find(
                (item: any) => item.key === "DI_RESET_Maintain"
            );

            const Emergency_NO_High = res.data.find((item: any) => item.key === "Emergency_NO_High");
            setEmergency_NO_High(Emergency_NO_High?.value || null);
            const Emergency_NO_Low = res.data.find((item: any) => item.key === "Emergency_NO_Low");
            setEmergency_NO_Low(Emergency_NO_Low?.value || null);
            const Emergency_NO_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NO_Maintain"
            );

            const Emergency_NC_High = res.data.find((item: any) => item.key === "Emergency_NC_High");
            setEmergency_NC_High(Emergency_NC_High?.value || null);
            const Emergency_NC_Low = res.data.find((item: any) => item.key === "Emergency_NC_Low");
            setEmergency_NC_Low(Emergency_NC_Low?.value || null);
            const Emergency_NC_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NC_Maintain"
            );

            const UPS_Mode_High = res.data.find((item: any) => item.key === "UPS_Mode_High");
            setUPS_Mode_High(UPS_Mode_High?.value || null);
            const UPS_Mode_Low = res.data.find((item: any) => item.key === "UPS_Mode_Low");
            setUPS_Mode_Low(UPS_Mode_Low?.value || null);
            const UPS_Mode_Maintain = res.data.find(
                (item: any) => item.key === "UPS_Mode_Maintain"
            );

            const DO_HR_01_High = res.data.find((item: any) => item.key === "DO_HR_01_High");
            setDO_HR_01_High(DO_HR_01_High?.value || null);
            const DO_HR_01_Low = res.data.find((item: any) => item.key === "DO_HR_01_Low");
            setDO_HR_01_Low(DO_HR_01_Low?.value || null);
            const DO_HR_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_HR_01_Maintain"
            );

            const DO_BC_01_High = res.data.find((item: any) => item.key === "DO_BC_01_High");
            setDO_BC_01_High(DO_BC_01_High?.value || null);
            const DO_BC_01_Low = res.data.find((item: any) => item.key === "DO_BC_01_Low");
            setDO_BC_01_Low(DO_BC_01_Low?.value || null);
            const DO_BC_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_BC_01_Maintain"
            );


            const DI_SELECT_SW_High = res.data.find((item: any) => item.key === "DI_SELECT_SW_High");
            setDI_SELECT_SW_High(DI_SELECT_SW_High?.value || null);
            const DI_SELECT_SW_Low = res.data.find((item: any) => item.key === "DI_SELECT_SW_Low");
            setDI_SELECT_SW_Low(DI_SELECT_SW_Low?.value || null);
            const DI_SELECT_SW_Maintain = res.data.find(
                (item: any) => item.key === "DI_SELECT_SW_Maintain"
            );

            const DO_SV_01_High = res.data.find((item: any) => item.key === "DO_SV_01_High");
            setDO_SV_01_High(DO_SV_01_High?.value || null);
            const DO_SV_01_Low = res.data.find((item: any) => item.key === "DO_SV_01_Low");
            setDO_SV_01_Low(DO_SV_01_Low?.value || null);
            const DO_SV_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_01_Maintain"
            );

        //=====================================================================================

const EVC_01_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_High");
setEVC_01_Conn_STT_High(EVC_01_Conn_STT_High?.value || null);
const EVC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_Low");
setEVC_01_Conn_STT_Low(EVC_01_Conn_STT_Low?.value || null);

const maintainEVC_01_Conn_STT = res.data.find(
    (item: any) => item.key === "EVC_01_Conn_STT_Maintain"
);
setmaintainEVC_01_Conn_STT(maintainEVC_01_Conn_STT?.value || false);
//=====================================================================================

//=====================================================================================

const EVC_02_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_High");
setEVC_02_Conn_STT_High(EVC_02_Conn_STT_High?.value || null);
const EVC_02_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_Low");
setEVC_02_Conn_STT_Low(EVC_02_Conn_STT_Low?.value || null);

const maintainEVC_02_Conn_STT = res.data.find(
    (item: any) => item.key === "EVC_02_Conn_STT_Maintain"
);
setmaintainEVC_02_Conn_STT(maintainEVC_02_Conn_STT?.value || false);
//=====================================================================================

//=====================================================================================

const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);

const maintainPLC_Conn_STT = res.data.find(
    (item: any) => item.key === "PLC_Conn_STT_Maintain"
);
setmaintainPLC_Conn_STT(maintainPLC_Conn_STT?.value || false);
//=====================================================================================

 // =================================================================================================================== 






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


            setMaintainGD1(MaintainGD1?.value || false);


            setMaintainGD2(GD2_Maintain?.value || false);

            setMaintainPT1(PT1_Maintain?.value || false);


            setMaintainDI_ZSO_1(DI_ZSO_1_Maintain?.value || false);


            setMaintainDI_ZSC_1(DI_ZSC_1_Maintain?.value || false);


            setMaintainDI_MAP_1(DI_MAP_1_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);

            
            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);
            
            setMaintainDI_SELECT_SW(DI_SELECT_SW_Maintain?.value || false);

            
            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);

            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainUPS_Mode(UPS_Mode_Maintain?.value || false);

            setMaintainEmergency_NC(Emergency_NC_Maintain?.value || false);

            setMaintainEmergency_NO(Emergency_NO_Maintain?.value || false);


            setMaintainDI_RESET(DI_RESET_Maintain?.value || false);



            setMaintainDI_UPS_ALARM(DI_UPS_ALARM_Maintain?.value || false);

            setMaintainDI_UPS_CHARGING(DI_UPS_CHARGING_Maintain?.value || false);


            setMaintainDI_UPS_BATTERY(DI_UPS_BATTERY_Maintain?.value || false);




            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
const [inputValueEVC_01_Remain_Battery_Service_Life, setInputValueEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_01_Remain_Battery_Service_Life, setInputValue2EVC_01_Remain_Battery_Service_Life] = useState<any>();
const [EVC_01_Remain_Battery_Service_Life_High, setEVC_01_Remain_Battery_Service_Life_High] = useState<number | null>(null);
const [EVC_01_Remain_Battery_Service_Life_Low, setEVC_01_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Remain_Battery_Service_Life, setExceedThresholdEVC_01_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_01_Remain_Battery_Service_Life, setMaintainEVC_01_Remain_Battery_Service_Life] = useState<boolean>(false);


useEffect(() => {
    const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life as any);
    const highValue = EVC_01_Remain_Battery_Service_Life_High ?? NaN;
    const lowValue = EVC_01_Remain_Battery_Service_Life_Low ?? NaN;

    if (!isNaN(EVC_01_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Remain_Battery_Service_Life) {
        setExceedThresholdEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_LifeValue >= highValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue);
    }
}, [EVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low, maintainEVC_01_Remain_Battery_Service_Life]);


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
                `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
     const [exceedThresholdEVC_01_Temperature, setexceedThresholdEVC_01_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);
     
     
     useEffect(() => {
        const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature as any);
        const highValue = EVC_01_Temperature_High ?? NaN;
        const lowValue = EVC_01_Temperature_Low ?? NaN;
    
        if (!isNaN(EVC_01_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Temperature) {
            setexceedThresholdEVC_01_Temperature(EVC_01_TemperatureValue >= highValue || EVC_01_TemperatureValue <= lowValue);
        }
    }, [EVC_01_Temperature, EVC_01_Temperature_High, EVC_01_Temperature_Low, maintainEVC_01_Temperature]);
    
     
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
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
        const EVC_01_PressureValue = parseFloat(EVC_01_Pressure as any);
        const highValue = EVC_01_Pressure_High ?? NaN;
        const lowValue = EVC_01_Pressure_Low ?? NaN;
    
        if (!isNaN(EVC_01_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Pressure) {
            setExceedThresholdEVC_01_Pressure(EVC_01_PressureValue >= highValue || EVC_01_PressureValue <= lowValue);
        }
    }, [EVC_01_Pressure, EVC_01_Pressure_High, EVC_01_Pressure_Low, maintainEVC_01_Pressure]);
    
     
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
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition as any);
            const highValue = EVC_01_Volume_at_Base_Condition_High ?? NaN;
            const lowValue = EVC_01_Volume_at_Base_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_01_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Base_Condition) {
                setExceedThresholdEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_ConditionValue >= highValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue);
            }
        }, [EVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition_Low, maintainEVC_01_Volume_at_Base_Condition]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition as any);
            const highValue = EVC_01_Volume_at_Measurement_Condition_High ?? NaN;
            const lowValue = EVC_01_Volume_at_Measurement_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_01_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Measurement_Condition) {
                setExceedThresholdEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_ConditionValue >= highValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue);
            }
        }, [EVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition_Low, maintainEVC_01_Volume_at_Measurement_Condition]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition as any);
            const highValue = EVC_01_Flow_at_Base_Condition_High ?? NaN;
            const lowValue = EVC_01_Flow_at_Base_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_01_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Base_Condition) {
                setExceedThresholdEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_ConditionValue >= highValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue);
            }
        }, [EVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition_Low, maintainEVC_01_Flow_at_Base_Condition]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Base_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vm_of_Current_Day, setInputValueEVC_01_Vm_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vm_of_Current_Day, setInputValue2EVC_01_Vm_of_Current_Day] = useState<any>();
          const [EVC_01_Vm_of_Current_Day_High, setEVC_01_Vm_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vm_of_Current_Day_Low, setEVC_01_Vm_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vm_of_Current_Day, setExceedThresholdEVC_01_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vm_of_Current_Day, setMaintainEVC_01_Vm_of_Current_Day] = useState<boolean>(false);
          
          
          useEffect(() => {
            const EVC_01_Vm_of_Current_DayValue = parseFloat(EVC_01_Vm_of_Current_Day as any);
            const highValue = EVC_01_Vm_of_Current_Day_High ?? NaN;
            const lowValue = EVC_01_Vm_of_Current_Day_Low ?? NaN;
        
            if (!isNaN(EVC_01_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Current_Day) {
                setExceedThresholdEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_DayValue >= highValue || EVC_01_Vm_of_Current_DayValue <= lowValue);
            }
        }, [EVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day_Low, maintainEVC_01_Vm_of_Current_Day]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                          { EVC_01_Vm_of_Current_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vm_of_Current_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vb_of_Current_Day, setInputValueEVC_01_Vb_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Current_Day, setInputValue2EVC_01_Vb_of_Current_Day] = useState<any>();
          const [EVC_01_Vb_of_Current_Day_High, setEVC_01_Vb_of_Current_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Current_Day_Low, setEVC_01_Vb_of_Current_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Current_Day, setExceedThresholdEVC_01_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vb_of_Current_Day, setMaintainEVC_01_Vb_of_Current_Day] = useState<boolean>(false);
          
          
          useEffect(() => {
            const EVC_01_Vb_of_Current_DayValue = parseFloat(EVC_01_Vb_of_Current_Day as any);
            const highValue = EVC_01_Vb_of_Current_Day_High ?? NaN;
            const lowValue = EVC_01_Vb_of_Current_Day_Low ?? NaN;
        
            if (!isNaN(EVC_01_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Current_Day) {
                setExceedThresholdEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_DayValue >= highValue || EVC_01_Vb_of_Current_DayValue <= lowValue);
            }
        }, [EVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day_Low, maintainEVC_01_Vb_of_Current_Day]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition as any);
            const highValue = EVC_01_Flow_at_Measurement_Condition_High ?? NaN;
            const lowValue = EVC_01_Flow_at_Measurement_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_01_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Measurement_Condition) {
                setExceedThresholdEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_ConditionValue >= highValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue);
            }
        }, [EVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition_Low, maintainEVC_01_Flow_at_Measurement_Condition]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Measurement_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vb_of_Last_Day, setInputValueEVC_01_Vb_of_Last_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Last_Day, setInputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
          const [EVC_01_Vb_of_Last_Day_High, setEVC_01_Vb_of_Last_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Last_Day_Low, setEVC_01_Vb_of_Last_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Last_Day, setExceedThresholdEVC_01_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vb_of_Last_Day, setMaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);
          
          
          useEffect(() => {
            const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day as any);
            const highValue = EVC_01_Vb_of_Last_Day_High ?? NaN;
            const lowValue = EVC_01_Vb_of_Last_Day_Low ?? NaN;
        
            if (!isNaN(EVC_01_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Last_Day) {
                setExceedThresholdEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_DayValue >= highValue || EVC_01_Vb_of_Last_DayValue <= lowValue);
            }
        }, [EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day_Low, maintainEVC_01_Vb_of_Last_Day]);
        
          
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
                          `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
        const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day as any);
        const highValue = EVC_01_Vm_of_Last_Day_High ?? NaN;
        const lowValue = EVC_01_Vm_of_Last_Day_Low ?? NaN;
    
        if (!isNaN(EVC_01_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Last_Day) {
            setExceedThresholdEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_DayValue >= highValue || EVC_01_Vm_of_Last_DayValue <= lowValue);
        }
    }, [EVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day_Low, maintainEVC_01_Vm_of_Last_Day]);
    
    
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
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life as any);
            const highValue = EVC_02_Remain_Battery_Service_Life_High ?? NaN;
            const lowValue = EVC_02_Remain_Battery_Service_Life_Low ?? NaN;
        
            if (!isNaN(EVC_02_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Remain_Battery_Service_Life) {
                setExceedThresholdEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_LifeValue >= highValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue);
            }
        }, [EVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life_Low, maintainEVC_02_Remain_Battery_Service_Life]);
        
        
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
                        `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
        const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature as any);
        const highValue = EVC_02_Temperature_High ?? NaN;
        const lowValue = EVC_02_Temperature_Low ?? NaN;
    
        if (!isNaN(EVC_02_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Temperature) {
            setExceedThresholdEVC_02_Temperature(EVC_02_TemperatureValue >= highValue || EVC_02_TemperatureValue <= lowValue);
        }
    }, [EVC_02_Temperature, EVC_02_Temperature_High, EVC_02_Temperature_Low, maintainEVC_02_Temperature]);
    
    
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
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
        const EVC_02_PressureValue = parseFloat(EVC_02_Pressure as any);
        const highValue = EVC_02_Pressure_High ?? NaN;
        const lowValue = EVC_02_Pressure_Low ?? NaN;
    
        if (!isNaN(EVC_02_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Pressure) {
            setExceedThresholdEVC_02_Pressure(EVC_02_PressureValue >= highValue || EVC_02_PressureValue <= lowValue);
        }
    }, [EVC_02_Pressure, EVC_02_Pressure_High, EVC_02_Pressure_Low, maintainEVC_02_Pressure]);
    
    
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
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
    const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition as any);
    const highValue = EVC_02_Volume_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_02_Volume_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Base_Condition) {
        setExceedThresholdEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_ConditionValue >= highValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition_Low, maintainEVC_02_Volume_at_Base_Condition]);


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
                `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
    const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition as any);
    const highValue = EVC_02_Volume_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_02_Volume_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Measurement_Condition) {
        setExceedThresholdEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_ConditionValue >= highValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition_Low, maintainEVC_02_Volume_at_Measurement_Condition]);


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
                `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
    const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition as any);
    const highValue = EVC_02_Flow_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_02_Flow_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Base_Condition) {
        setExceedThresholdEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_ConditionValue >= highValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition_Low, maintainEVC_02_Flow_at_Base_Condition]);


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
            `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
            { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
        );
        setMaintainEVC_02_Flow_at_Base_Condition(newValue);
        
    } catch (error) {}
};


// =================================================================================================================== 


        // =================================================================================================================== 

        const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
        const [inputValueEVC_02_Flow_at_Measurement_Condition, setInputValueEVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [inputValue2EVC_02_Flow_at_Measurement_Condition, setInputValue2EVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
        const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setExceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Flow_at_Measurement_Condition, setMaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);
        
        
        useEffect(() => {
            const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition as any);
            const highValue = EVC_02_Flow_at_Measurement_Condition_High ?? NaN;
            const lowValue = EVC_02_Flow_at_Measurement_Condition_Low ?? NaN;
        
            if (!isNaN(EVC_02_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Measurement_Condition) {
                setExceedThresholdEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_ConditionValue >= highValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue);
            }
        }, [EVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition_Low, maintainEVC_02_Flow_at_Measurement_Condition]);
        
        
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
                        `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day as any);
            const highValue = EVC_02_Vb_of_Current_Day_High ?? NaN;
            const lowValue = EVC_02_Vb_of_Current_Day_Low ?? NaN;
        
            if (!isNaN(EVC_02_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Current_Day) {
                setExceedThresholdEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_DayValue >= highValue || EVC_02_Vb_of_Current_DayValue <= lowValue);
            }
        }, [EVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day_Low, maintainEVC_02_Vb_of_Current_Day]);
        
        
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
                        `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
            const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day as any);
            const highValue = EVC_02_Vm_of_Current_Day_High ?? NaN;
            const lowValue = EVC_02_Vm_of_Current_Day_Low ?? NaN;
        
            if (!isNaN(EVC_02_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Current_Day) {
                setExceedThresholdEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_DayValue >= highValue || EVC_02_Vm_of_Current_DayValue <= lowValue);
            }
        }, [EVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day_Low, maintainEVC_02_Vm_of_Current_Day]);
        
        
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
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
                const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day as any);
                const highValue = EVC_02_Vb_of_Last_Day_High ?? NaN;
                const lowValue = EVC_02_Vb_of_Last_Day_Low ?? NaN;
            
                if (!isNaN(EVC_02_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Last_Day) {
                    setExceedThresholdEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_DayValue >= highValue || EVC_02_Vb_of_Last_DayValue <= lowValue);
                }
            }, [EVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day_Low, maintainEVC_02_Vb_of_Last_Day]);
            
            
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
                        `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
                const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day as any);
                const highValue = EVC_02_Vm_of_Last_Day_High ?? NaN;
                const lowValue = EVC_02_Vm_of_Last_Day_Low ?? NaN;
            
                if (!isNaN(EVC_02_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Last_Day) {
                    setExceedThresholdEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_DayValue >= highValue || EVC_02_Vm_of_Last_DayValue <= lowValue);
                }
            }, [EVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low, maintainEVC_02_Vm_of_Last_Day]);
            
            
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
                        `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 

 // =================================================================================================================== 

 const [GD1, setGD1] = useState<string | null>(null);
 const [audioPlayingGD1, setAudioPlayingGD1] = useState(false);
 const [inputValueGD1, setInputValueGD1] = useState<any>();
 const [inputValue2GD1, setInputValue2GD1] = useState<any>();
 const [GD1_High, setGD1_High] = useState<number | null>(null);
 const [GD1_Low, setGD1_Low] = useState<number | null>(null);
 const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainGD1, setMaintainGD1] = useState<boolean>(false);
 
 
 useEffect(() => {
    const GD1Value = parseFloat(GD1 as any);
    const highValue = GD1_High ?? NaN;
    const lowValue = GD1_Low ?? NaN;

    if (!isNaN(GD1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD1) {
        setExceedThresholdGD1(GD1Value >= highValue || GD1Value <= lowValue);
    }
}, [GD1, GD1_High, GD1_Low, maintainGD1]);

 
     const handleInputChangeGD1 = (event: any) => {
         const newValue = event.target.value;
         setInputValueGD1(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2GD1(newValue2);
     };
     const ChangeMaintainGD1 = async () => {
         try {
             const newValue = !maintainGD1;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                 { GD1_Maintain: newValue }
             );
             setMaintainGD1(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [GD2, setGD2] = useState<string | null>(null);
      const [audioPlayingGD2, setAudioPlayingGD2] = useState(false);
      const [inputValueGD2, setInputValueGD2] = useState<any>();
      const [inputValue2GD2, setInputValue2GD2] = useState<any>();
      const [GD2_High, setGD2_High] = useState<number | null>(null);
      const [GD2_Low, setGD2_Low] = useState<number | null>(null);
      const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainGD2, setMaintainGD2] = useState<boolean>(false);
      
      
      useEffect(() => {
        const GD2Value = parseFloat(GD2 as any);
        const highValue = GD2_High ?? NaN;
        const lowValue = GD2_Low ?? NaN;
    
        if (!isNaN(GD2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD2) {
            setExceedThresholdGD2(GD2Value >= highValue || GD2Value <= lowValue);
        }
    }, [GD2, GD2_High, GD2_Low, maintainGD2]);



          const handleInputChangeGD2 = (event: any) => {
              const newValue = event.target.value;
              setInputValueGD2(newValue);
          };
      
          const handleInputChange2GD2 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2GD2(newValue2);
          };
          const ChangeMaintainGD2 = async () => {
              try {
                  const newValue = !maintainGD2;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                      { GD2_Maintain: newValue }
                  );
                  setMaintainGD2(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
      const [PT1, setPT1] = useState<string | null>(null);
      const [audioPlayingPT1, setAudioPlayingPT1] = useState(false);
      const [inputValuePT1, setInputValuePT1] = useState<any>();
      const [inputValue2PT1, setInputValue2PT1] = useState<any>();
      const [PT1_High, setPT1_High] = useState<number | null>(null);
      const [PT1_Low, setPT1_Low] = useState<number | null>(null);
      const [exceedThresholdPT1, setExceedThresholdPT1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainPT1, setMaintainPT1] = useState<boolean>(false);
      
      useEffect(() => {
        const PT1Value = parseFloat(PT1 as any);
        const highValue = PT1_High ?? NaN;
        const lowValue = PT1_Low ?? NaN;
    
        if (!isNaN(PT1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT1) {
            setExceedThresholdPT1(PT1Value >= highValue || PT1Value <= lowValue);
        }
    }, [PT1, PT1_High, PT1_Low, maintainPT1]);
      
          const handleInputChangePT1 = (event: any) => {
              const newValue = event.target.value;
              setInputValuePT1(newValue);
          };
      
          const handleInputChange2PT1 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2PT1(newValue2);
          };
          const ChangeMaintainPT1 = async () => {
              try {
                  const newValue = !maintainPT1;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                      { PT1_Maintain: newValue }
                  );
                  setMaintainPT1(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
 
           const [DI_ZSO_1, setDI_ZSO_1] = useState<string | null>(null);
           const [audioPlayingDI_ZSO_1, setAudioPlayingDI_ZSO_1] = useState(false);
           const [inputValueDI_ZSO_1, setInputValueDI_ZSO_1] = useState<any>();
           const [inputValue2DI_ZSO_1, setInputValue2DI_ZSO_1] = useState<any>();
           const [DI_ZSO_1_High, setDI_ZSO_1_High] = useState<number | null>(null);
           const [DI_ZSO_1_Low, setDI_ZSO_1_Low] = useState<number | null>(null);
           const [exceedThresholdDI_ZSO_1, setExceedThresholdDI_ZSO_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_ZSO_1, setMaintainDI_ZSO_1] = useState<boolean>(false);
           
           useEffect(() => {
            const DI_ZSO_1Value = parseFloat(DI_ZSO_1 as any);
            const highValue = DI_ZSO_1_High ?? NaN;
            const lowValue = DI_ZSO_1_Low ?? NaN;
        
            if (!isNaN(DI_ZSO_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_ZSO_1) {
                setExceedThresholdDI_ZSO_1(DI_ZSO_1Value >= highValue || DI_ZSO_1Value <= lowValue);
            }
        }, [DI_ZSO_1, DI_ZSO_1_High, DI_ZSO_1_Low, maintainDI_ZSO_1]);
           
               const handleInputChangeDI_ZSO_1 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_ZSO_1(newValue);
               };
           
               const handleInputChange2DI_ZSO_1 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_ZSO_1(newValue2);
               };
               const ChangeMaintainDI_ZSO_1 = async () => {
                   try {
                       const newValue = !maintainDI_ZSO_1;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_ZSO_1_Maintain: newValue }
                       );
                       setMaintainDI_ZSO_1(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [DI_ZSC_1, setDI_ZSC_1] = useState<string | null>(null);
           const [audioPlayingDI_ZSC_1, setAudioPlayingDI_ZSC_1] = useState(false);
           const [inputValueDI_ZSC_1, setInputValueDI_ZSC_1] = useState<any>();
           const [inputValue2DI_ZSC_1, setInputValue2DI_ZSC_1] = useState<any>();
           const [DI_ZSC_1_High, setDI_ZSC_1_High] = useState<number | null>(null);
           const [DI_ZSC_1_Low, setDI_ZSC_1_Low] = useState<number | null>(null);
           const [exceedThresholdDI_ZSC_1, setExceedThresholdDI_ZSC_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_ZSC_1, setMaintainDI_ZSC_1] = useState<boolean>(false);
           
           
       
useEffect(() => {
    const DI_ZSC_1Value = parseFloat(DI_ZSC_1 as any);
    const highValue = DI_ZSC_1_High ?? NaN;
    const lowValue = DI_ZSC_1_Low ?? NaN;

    if (!isNaN(DI_ZSC_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_ZSC_1) {
        setExceedThresholdDI_ZSC_1(DI_ZSC_1Value >= highValue || DI_ZSC_1Value <= lowValue);
    }
}, [DI_ZSC_1, DI_ZSC_1_High, DI_ZSC_1_Low, maintainDI_ZSC_1]);
           
               const handleInputChangeDI_ZSC_1 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_ZSC_1(newValue);
               };
           
               const handleInputChange2DI_ZSC_1 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_ZSC_1(newValue2);
               };
               const ChangeMaintainDI_ZSC_1 = async () => {
                   try {
                       const newValue = !maintainDI_ZSC_1;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_ZSC_1_Maintain: newValue }
                       );
                       setMaintainDI_ZSC_1(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [DI_MAP_1, setDI_MAP_1] = useState<string | null>(null);
           const [audioPlayingDI_MAP_1, setAudioPlayingDI_MAP_1] = useState(false);
           const [inputValueDI_MAP_1, setInputValueDI_MAP_1] = useState<any>();
           const [inputValue2DI_MAP_1, setInputValue2DI_MAP_1] = useState<any>();
           const [DI_MAP_1_High, setDI_MAP_1_High] = useState<number | null>(null);
           const [DI_MAP_1_Low, setDI_MAP_1_Low] = useState<number | null>(null);
           const [exceedThresholdDI_MAP_1, setExceedThresholdDI_MAP_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_MAP_1, setMaintainDI_MAP_1] = useState<boolean>(false);
           
           
           useEffect(() => {
            const DI_MAP_1Value = parseFloat(DI_MAP_1 as any);
            const highValue = DI_MAP_1_High ?? NaN;
            const lowValue = DI_MAP_1_Low ?? NaN;
        
            if (!isNaN(DI_MAP_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_MAP_1) {
                setExceedThresholdDI_MAP_1(DI_MAP_1Value >= highValue || DI_MAP_1Value <= lowValue);
            }
        }, [DI_MAP_1, DI_MAP_1_High, DI_MAP_1_Low, maintainDI_MAP_1]);
           
               const handleInputChangeDI_MAP_1 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_MAP_1(newValue);
               };
           
               const handleInputChange2DI_MAP_1 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_MAP_1(newValue2);
               };
               const ChangeMaintainDI_MAP_1 = async () => {
                   try {
                       const newValue = !maintainDI_MAP_1;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_MAP_1_Maintain: newValue }
                       );
                       setMaintainDI_MAP_1(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [DI_UPS_CHARGING, setDI_UPS_CHARGING] = useState<string | null>(null);
           const [audioPlayingDI_UPS_CHARGING, setAudioPlayingDI_UPS_CHARGING] = useState(false);
           const [inputValueDI_UPS_CHARGING, setInputValueDI_UPS_CHARGING] = useState<any>();
           const [inputValue2DI_UPS_CHARGING, setInputValue2DI_UPS_CHARGING] = useState<any>();
           const [DI_UPS_CHARGING_High, setDI_UPS_CHARGING_High] = useState<number | null>(null);
           const [DI_UPS_CHARGING_Low, setDI_UPS_CHARGING_Low] = useState<number | null>(null);
           const [exceedThresholdDI_UPS_CHARGING, setExceedThresholdDI_UPS_CHARGING] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_UPS_CHARGING, setMaintainDI_UPS_CHARGING] = useState<boolean>(false);
           
           useEffect(() => {
            const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING as any);
            const highValue = DI_UPS_CHARGING_High ?? NaN;
            const lowValue = DI_UPS_CHARGING_Low ?? NaN;
        
            if (!isNaN(DI_UPS_CHARGINGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_CHARGING) {
                setExceedThresholdDI_UPS_CHARGING(DI_UPS_CHARGINGValue >= highValue || DI_UPS_CHARGINGValue <= lowValue);
            }
        }, [DI_UPS_CHARGING, DI_UPS_CHARGING_High, DI_UPS_CHARGING_Low, maintainDI_UPS_CHARGING]);
        
           
               const handleInputChangeDI_UPS_CHARGING = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_UPS_CHARGING(newValue);
               };
           
               const handleInputChange2DI_UPS_CHARGING = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_UPS_CHARGING(newValue2);
               };
               const ChangeMaintainDI_UPS_CHARGING = async () => {
                   try {
                       const newValue = !maintainDI_UPS_CHARGING;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_UPS_CHARGING_Maintain: newValue }
                       );
                       setMaintainDI_UPS_CHARGING(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [DI_UPS_BATTERY, setDI_UPS_BATTERY] = useState<string | null>(null);
           const [audioPlayingDI_UPS_BATTERY, setAudioPlayingDI_UPS_BATTERY] = useState(false);
           const [inputValueDI_UPS_BATTERY, setInputValueDI_UPS_BATTERY] = useState<any>();
           const [inputValue2DI_UPS_BATTERY, setInputValue2DI_UPS_BATTERY] = useState<any>();
           const [DI_UPS_BATTERY_High, setDI_UPS_BATTERY_High] = useState<number | null>(null);
           const [DI_UPS_BATTERY_Low, setDI_UPS_BATTERY_Low] = useState<number | null>(null);
           const [exceedThresholdDI_UPS_BATTERY, setExceedThresholdDI_UPS_BATTERY] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_UPS_BATTERY, setMaintainDI_UPS_BATTERY] = useState<boolean>(false);
           
           useEffect(() => {
            const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY as any);
            const highValue = DI_UPS_BATTERY_High ?? NaN;
            const lowValue = DI_UPS_BATTERY_Low ?? NaN;
        
            if (!isNaN(DI_UPS_BATTERYValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_BATTERY) {
                setExceedThresholdDI_UPS_BATTERY(DI_UPS_BATTERYValue >= highValue || DI_UPS_BATTERYValue <= lowValue);
            }
        }, [DI_UPS_BATTERY, DI_UPS_BATTERY_High, DI_UPS_BATTERY_Low, maintainDI_UPS_BATTERY]);
           
               const handleInputChangeDI_UPS_BATTERY = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_UPS_BATTERY(newValue);
               };
           
               const handleInputChange2DI_UPS_BATTERY = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_UPS_BATTERY(newValue2);
               };
               const ChangeMaintainDI_UPS_BATTERY = async () => {
                   try {
                       const newValue = !maintainDI_UPS_BATTERY;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_UPS_BATTERY_Maintain: newValue }
                       );
                       setMaintainDI_UPS_BATTERY(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [DI_UPS_ALARM, setDI_UPS_ALARM] = useState<string | null>(null);
           const [audioPlayingDI_UPS_ALARM, setAudioPlayingDI_UPS_ALARM] = useState(false);
           const [inputValueDI_UPS_ALARM, setInputValueDI_UPS_ALARM] = useState<any>();
           const [inputValue2DI_UPS_ALARM, setInputValue2DI_UPS_ALARM] = useState<any>();
           const [DI_UPS_ALARM_High, setDI_UPS_ALARM_High] = useState<number | null>(null);
           const [DI_UPS_ALARM_Low, setDI_UPS_ALARM_Low] = useState<number | null>(null);
           const [exceedThresholdDI_UPS_ALARM, setExceedThresholdDI_UPS_ALARM] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_UPS_ALARM, setMaintainDI_UPS_ALARM] = useState<boolean>(false);
           
           
      
useEffect(() => {
    const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM as any);
    const highValue = DI_UPS_ALARM_High ?? NaN;
    const lowValue = DI_UPS_ALARM_Low ?? NaN;

    if (!isNaN(DI_UPS_ALARMValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_ALARM) {
        setExceedThresholdDI_UPS_ALARM(DI_UPS_ALARMValue >= highValue || DI_UPS_ALARMValue <= lowValue);
    }
}, [DI_UPS_ALARM, DI_UPS_ALARM_High, DI_UPS_ALARM_Low, maintainDI_UPS_ALARM]);

           
               const handleInputChangeDI_UPS_ALARM = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_UPS_ALARM(newValue);
               };
           
               const handleInputChange2DI_UPS_ALARM = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_UPS_ALARM(newValue2);
               };
               const ChangeMaintainDI_UPS_ALARM = async () => {
                   try {
                       const newValue = !maintainDI_UPS_ALARM;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                           { DI_UPS_ALARM_Maintain: newValue }
                       );
                       setMaintainDI_UPS_ALARM(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 

 
         // =================================================================================================================== 
 
         const [DI_RESET, setDI_RESET] = useState<string | null>(null);
         const [audioPlayingDI_RESET, setAudioPlayingDI_RESET] = useState(false);
         const [inputValueDI_RESET, setInputValueDI_RESET] = useState<any>();
         const [inputValue2DI_RESET, setInputValue2DI_RESET] = useState<any>();
         const [DI_RESET_High, setDI_RESET_High] = useState<number | null>(null);
         const [DI_RESET_Low, setDI_RESET_Low] = useState<number | null>(null);
         const [exceedThresholdDI_RESET, setExceedThresholdDI_RESET] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainDI_RESET, setMaintainDI_RESET] = useState<boolean>(false);
         
         
         useEffect(() => {
            const DI_RESETValue = parseFloat(DI_RESET as any);
            const highValue = DI_RESET_High ?? NaN;
            const lowValue = DI_RESET_Low ?? NaN;
        
            if (!isNaN(DI_RESETValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_RESET) {
                setExceedThresholdDI_RESET(DI_RESETValue >= highValue || DI_RESETValue <= lowValue);
            }
        }, [DI_RESET, DI_RESET_High, DI_RESET_Low, maintainDI_RESET]);
         
             const handleInputChangeDI_RESET = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueDI_RESET(newValue);
             };
         
             const handleInputChange2DI_RESET = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2DI_RESET(newValue2);
             };
             const ChangeMaintainDI_RESET = async () => {
                 try {
                     const newValue = !maintainDI_RESET;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                         { DI_RESET_Maintain: newValue }
                     );
                     setMaintainDI_RESET(newValue);
                     
                 } catch (error) {}
             };
     
     
         // =================================================================================================================== 
 
             // =================================================================================================================== 
 
     const [Emergency_NO, setEmergency_NO] = useState<string | null>(null);
     const [audioPlayingEmergency_NO, setAudioPlayingEmergency_NO] = useState(false);
     const [inputValueEmergency_NO, setInputValueEmergency_NO] = useState<any>();
     const [inputValue2Emergency_NO, setInputValue2Emergency_NO] = useState<any>();
     const [Emergency_NO_High, setEmergency_NO_High] = useState<number | null>(null);
     const [Emergency_NO_Low, setEmergency_NO_Low] = useState<number | null>(null);
     const [exceedThresholdEmergency_NO, setExceedThresholdEmergency_NO] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEmergency_NO, setMaintainEmergency_NO] = useState<boolean>(false);
     
     
     useEffect(() => {
        const Emergency_NOValue = parseFloat(Emergency_NO as any);
        const highValue = Emergency_NO_High ?? NaN;
        const lowValue = Emergency_NO_Low ?? NaN;
    
        if (!isNaN(Emergency_NOValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEmergency_NO) {
            setExceedThresholdEmergency_NO(Emergency_NOValue >= highValue || Emergency_NOValue <= lowValue);
        }
    }, [Emergency_NO, Emergency_NO_High, Emergency_NO_Low, maintainEmergency_NO]);
     
         const handleInputChangeEmergency_NO = (event: any) => {
             const newValue = event.target.value;
             setInputValueEmergency_NO(newValue);
         };
     
         const handleInputChange2Emergency_NO = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2Emergency_NO(newValue2);
         };
         const ChangeMaintainEmergency_NO = async () => {
             try {
                 const newValue = !maintainEmergency_NO;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                     { Emergency_NO_Maintain: newValue }
                 );
                 setMaintainEmergency_NO(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
 
     const [Emergency_NC, setEmergency_NC] = useState<string | null>(null);
     const [audioPlayingEmergency_NC, setAudioPlayingEmergency_NC] = useState(false);
     const [inputValueEmergency_NC, setInputValueEmergency_NC] = useState<any>();
     const [inputValue2Emergency_NC, setInputValue2Emergency_NC] = useState<any>();
     const [Emergency_NC_High, setEmergency_NC_High] = useState<number | null>(null);
     const [Emergency_NC_Low, setEmergency_NC_Low] = useState<number | null>(null);
     const [exceedThresholdEmergency_NC, setExceedThresholdEmergency_NC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEmergency_NC, setMaintainEmergency_NC] = useState<boolean>(false);
     
     
     useEffect(() => {
        const Emergency_NCValue = parseFloat(Emergency_NC as any);
        const highValue = Emergency_NC_High ?? NaN;
        const lowValue = Emergency_NC_Low ?? NaN;
    
        if (!isNaN(Emergency_NCValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEmergency_NC) {
            setExceedThresholdEmergency_NC(Emergency_NCValue >= highValue || Emergency_NCValue <= lowValue);
        }
    }, [Emergency_NC, Emergency_NC_High, Emergency_NC_Low, maintainEmergency_NC]);
    
     
         const handleInputChangeEmergency_NC = (event: any) => {
             const newValue = event.target.value;
             setInputValueEmergency_NC(newValue);
         };
     
         const handleInputChange2Emergency_NC = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2Emergency_NC(newValue2);
         };
         const ChangeMaintainEmergency_NC = async () => {
             try {
                 const newValue = !maintainEmergency_NC;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                     { Emergency_NC_Maintain: newValue }
                 );
                 setMaintainEmergency_NC(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
         // =================================================================================================================== 
 
 const [UPS_Mode, setUPS_Mode] = useState<string | null>(null);
 const [audioPlayingUPS_Mode, setAudioPlayingUPS_Mode] = useState(false);
 const [inputValueUPS_Mode, setInputValueUPS_Mode] = useState<any>();
 const [inputValue2UPS_Mode, setInputValue2UPS_Mode] = useState<any>();
 const [UPS_Mode_High, setUPS_Mode_High] = useState<number | null>(null);
 const [UPS_Mode_Low, setUPS_Mode_Low] = useState<number | null>(null);
 const [exceedThresholdUPS_Mode, setExceedThresholdUPS_Mode] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainUPS_Mode, setMaintainUPS_Mode] = useState<boolean>(false);
 
 useEffect(() => {
    const UPS_ModeValue = parseFloat(UPS_Mode as any);
    const highValue = UPS_Mode_High ?? NaN;
    const lowValue = UPS_Mode_Low ?? NaN;

    if (!isNaN(UPS_ModeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainUPS_Mode) {
        setExceedThresholdUPS_Mode(UPS_ModeValue >= highValue || UPS_ModeValue <= lowValue);
    }
}, [UPS_Mode, UPS_Mode_High, UPS_Mode_Low, maintainUPS_Mode]);
 
     const handleInputChangeUPS_Mode = (event: any) => {
         const newValue = event.target.value;
         setInputValueUPS_Mode(newValue);
     };
 
     const handleInputChange2UPS_Mode = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2UPS_Mode(newValue2);
     };
     const ChangeMaintainUPS_Mode = async () => {
         try {
             const newValue = !maintainUPS_Mode;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                 { UPS_Mode_Maintain: newValue }
             );
             setMaintainUPS_Mode(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
 
 const [DO_HR_01, setDO_HR_01] = useState<string | null>(null);
 const [audioPlayingDO_HR_01, setAudioPlayingDO_HR_01] = useState(false);
 const [inputValueDO_HR_01, setInputValueDO_HR_01] = useState<any>();
 const [inputValue2DO_HR_01, setInputValue2DO_HR_01] = useState<any>();
 const [DO_HR_01_High, setDO_HR_01_High] = useState<number | null>(null);
 const [DO_HR_01_Low, setDO_HR_01_Low] = useState<number | null>(null);
 const [exceedThresholdDO_HR_01, setExceedThresholdDO_HR_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainDO_HR_01, setMaintainDO_HR_01] = useState<boolean>(false);
 
 
 useEffect(() => {
    const DO_HR_01Value = parseFloat(DO_HR_01 as any);
    const highValue = DO_HR_01_High ?? NaN;
    const lowValue = DO_HR_01_Low ?? NaN;

    if (!isNaN(DO_HR_01Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_HR_01) {
        setExceedThresholdDO_HR_01(DO_HR_01Value >= highValue || DO_HR_01Value <= lowValue);
    }
}, [DO_HR_01, DO_HR_01_High, DO_HR_01_Low, maintainDO_HR_01]);
 
     const handleInputChangeDO_HR_01 = (event: any) => {
         const newValue = event.target.value;
         setInputValueDO_HR_01(newValue);
     };
 
     const handleInputChange2DO_HR_01 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2DO_HR_01(newValue2);
     };
     const ChangeMaintainDO_HR_01 = async () => {
         try {
             const newValue = !maintainDO_HR_01;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                 { DO_HR_01_Maintain: newValue }
             );
             setMaintainDO_HR_01(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
     // =================================================================================================================== 
 
 const [DO_BC_01, setDO_BC_01] = useState<string | null>(null);
 const [audioPlayingDO_BC_01, setAudioPlayingDO_BC_01] = useState(false);
 const [inputValueDO_BC_01, setInputValueDO_BC_01] = useState<any>();
 const [inputValue2DO_BC_01, setInputValue2DO_BC_01] = useState<any>();
 const [DO_BC_01_High, setDO_BC_01_High] = useState<number | null>(null);
 const [DO_BC_01_Low, setDO_BC_01_Low] = useState<number | null>(null);
 const [exceedThresholdDO_BC_01, setExceedThresholdDO_BC_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainDO_BC_01, setMaintainDO_BC_01] = useState<boolean>(false);
 
 
 useEffect(() => {
    const DO_BC_01Value = parseFloat(DO_BC_01 as any);
    const highValue = DO_BC_01_High ?? NaN;
    const lowValue = DO_BC_01_Low ?? NaN;

    if (!isNaN(DO_BC_01Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_BC_01) {
        setExceedThresholdDO_BC_01(DO_BC_01Value >= highValue || DO_BC_01Value <= lowValue);
    }
}, [DO_BC_01, DO_BC_01_High, DO_BC_01_Low, maintainDO_BC_01]);
 
 const handleInputChangeDO_BC_01 = (event: any) => {
     const newValue = event.target.value;
     setInputValueDO_BC_01(newValue);
 };
 
 const handleInputChange2DO_BC_01 = (event: any) => {
     const newValue2 = event.target.value;
     setInputValue2DO_BC_01(newValue2);
 };
 const ChangeMaintainDO_BC_01 = async () => {
     try {
         const newValue = !maintainDO_BC_01;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
             { DO_BC_01_Maintain: newValue }
         );
         setMaintainDO_BC_01(newValue);
         
     } catch (error) {}
 };
 
 
 // =================================================================================================================== 
 
 
         // =================================================================================================================== 
 
         const [DI_SELECT_SW, setDI_SELECT_SW] = useState<string | null>(null);
         const [audioPlayingDI_SELECT_SW, setAudioPlayingDI_SELECT_SW] = useState(false);
         const [inputValueDI_SELECT_SW, setInputValueDI_SELECT_SW] = useState<any>();
         const [inputValue2DI_SELECT_SW, setInputValue2DI_SELECT_SW] = useState<any>();
         const [DI_SELECT_SW_High, setDI_SELECT_SW_High] = useState<number | null>(null);
         const [DI_SELECT_SW_Low, setDI_SELECT_SW_Low] = useState<number | null>(null);
         const [exceedThresholdDI_SELECT_SW, setExceedThresholdDI_SELECT_SW] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainDI_SELECT_SW, setMaintainDI_SELECT_SW] = useState<boolean>(false);
         
         
         useEffect(() => {
            const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW as any);
            const highValue = DI_SELECT_SW_High ?? NaN;
            const lowValue = DI_SELECT_SW_Low ?? NaN;
        
            if (!isNaN(DI_SELECT_SWValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_SELECT_SW) {
                setExceedThresholdDI_SELECT_SW(DI_SELECT_SWValue >= highValue || DI_SELECT_SWValue <= lowValue);
            }
        }, [DI_SELECT_SW, DI_SELECT_SW_High, DI_SELECT_SW_Low, maintainDI_SELECT_SW]);
         
             const handleInputChangeDI_SELECT_SW = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueDI_SELECT_SW(newValue);
             };
         
             const handleInputChange2DI_SELECT_SW = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2DI_SELECT_SW(newValue2);
             };
             const ChangeMaintainDI_SELECT_SW = async () => {
                 try {
                     const newValue = !maintainDI_SELECT_SW;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                         { DI_SELECT_SW_Maintain: newValue }
                     );
                     setMaintainDI_SELECT_SW(newValue);
                     
                 } catch (error) {}
             };
         
         
         // =================================================================================================================== 
         
         
         const [DO_SV_01, setDO_SV_01] = useState<string | null>(null);
         const [audioPlayingDO_SV_01, setAudioPlayingDO_SV_01] = useState(false);
         const [inputValueDO_SV_01, setInputValueDO_SV_01] = useState<any>();
         const [inputValue2DO_SV_01, setInputValue2DO_SV_01] = useState<any>();
         const [DO_SV_01_High, setDO_SV_01_High] = useState<number | null>(null);
         const [DO_SV_01_Low, setDO_SV_01_Low] = useState<number | null>(null);
         const [exceedThresholdDO_SV_01, setExceedThresholdDO_SV_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainDO_SV_01, setMaintainDO_SV_01] = useState<boolean>(false);
         
         
         useEffect(() => {
            const DO_SV_01Value = parseFloat(DO_SV_01 as any);
            const highValue = DO_SV_01_High ?? NaN;
            const lowValue = DO_SV_01_Low ?? NaN;
        
            if (!isNaN(DO_SV_01Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_SV_01) {
                setExceedThresholdDO_SV_01(DO_SV_01Value >= highValue || DO_SV_01Value <= lowValue);
            }
        }, [DO_SV_01, DO_SV_01_High, DO_SV_01_Low, maintainDO_SV_01]);
         
             const handleInputChangeDO_SV_01 = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueDO_SV_01(newValue);
             };
         
             const handleInputChange2DO_SV_01 = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2DO_SV_01(newValue2);
             };
             const ChangeMaintainDO_SV_01 = async () => {
                 try {
                     const newValue = !maintainDO_SV_01;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                         { DO_SV_01_Maintain: newValue }
                     );
                     setMaintainDO_SV_01(newValue);
                     
                 } catch (error) {}
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
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                     { PLC_Conn_STT_Maintain: newValue }
                 );
                 setmaintainPLC_Conn_STT(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
         
         
         
         //===========================================================================================
         
    
    
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,



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



                    GD1_High: inputValueGD1,GD1_Low:inputValue2GD1,

                    GD2_High: inputValueGD2,GD2_Low:inputValue2GD2,
                    PT1_High: inputValuePT1,PT1_Low:inputValue2PT1,


                    DI_ZSO_1_High: inputValueDI_ZSO_1,DI_ZSO_1_Low:inputValue2DI_ZSO_1,
                    DI_ZSC_1_High: inputValueDI_ZSC_1,DI_ZSC_1_Low:inputValue2DI_ZSC_1,
                    DI_MAP_1_High: inputValueDI_MAP_1,DI_MAP_1_Low:inputValue2DI_MAP_1,

                    DI_UPS_BATTERY_High: inputValueDI_UPS_BATTERY,DI_UPS_BATTERY_Low:inputValue2DI_UPS_BATTERY,
                    DI_UPS_CHARGING_High: inputValueDI_UPS_CHARGING,DI_UPS_CHARGING_Low:inputValue2DI_UPS_CHARGING,


                    DI_UPS_ALARM_High: inputValueDI_UPS_ALARM,DI_UPS_ALARM_Low:inputValue2DI_UPS_ALARM,


                    DI_RESET_High: inputValueDI_RESET,DI_RESET_Low:inputValue2DI_RESET,
                    Emergency_NO_High: inputValueEmergency_NO,Emergency_NO_Low:inputValue2Emergency_NO,

                    Emergency_NC_High: inputValueEmergency_NC,Emergency_NC_Low:inputValue2Emergency_NC,
                    UPS_Mode_High: inputValueUPS_Mode,UPS_Mode_Low:inputValue2UPS_Mode,

                    DO_HR_01_High: inputValueDO_HR_01,DO_HR_01_Low:inputValue2DO_HR_01,
                    DO_BC_01_High: inputValueDO_BC_01,DO_BC_01_Low:inputValue2DO_BC_01,


                    DI_SELECT_SW_High: inputValueDI_SELECT_SW,DI_SELECT_SW_Low:inputValue2DI_SELECT_SW,
                    DO_SV_01_High: inputValueDO_SV_01,DO_SV_01_Low:inputValue2DO_SV_01,
                    IOT_Gateway_Phone: inputGetwayPhone,
                    PCV_01: inputPCV_01,
                    PCV_02: inputPCV_02,
                    PSV_01: inputPSV_01,


                    EVC_01_Battery_Expiration_Date: timeEVC_01,
                    EVC_01_Battery_Installation_Date: timeEVC_02,
                    EVC_02_Battery_Expiration_Date: timeEVC_03,
                    EVC_02_Battery_Installation_Date: timeEVC_04,

                    EVC_01_Conn_STT_High:inputValueEVC_01_Conn_STT, EVC_01_Conn_STT_Low:inputValue2EVC_01_Conn_STT,

                    EVC_02_Conn_STT_High:inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,
                     PLC_Conn_STT_High:inputValuePLC_Conn_STT, PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,
                }
            );
     
            setGetWayPhoneOTSUKA(inputGetwayPhone);
            setPSV_01(inputPSV_01)
            setPCV_02(inputPCV_02)
            setPCV_01(inputPCV_01)
   
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


            setEVC_02_Flow_at_Base_Condition_High(inputValueEVC_02_Flow_at_Base_Condition);
            setEVC_02_Flow_at_Base_Condition_Low(inputValue2EVC_02_Flow_at_Base_Condition);

            setEVC_02_Pressure_High(inputValueEVC_02_Pressure);
            setEVC_02_Pressure_Low(inputValue2EVC_02_Pressure);

            setEVC_02_Volume_at_Base_Condition_High(inputValueEVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_Low(inputValue2EVC_02_Volume_at_Base_Condition);

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


          

    

    

            setGD1_High(inputValueGD1);
            setGD1_Low(inputValue2GD1);

            setGD2_High(inputValueGD2);
            setGD2_Low(inputValue2GD2);

            setPT1_High(inputValuePT1);
            setPT1_Low(inputValue2PT1);

            setPT1_High(inputValuePT1);
            setPT1_Low(inputValue2PT1);

            setDI_ZSO_1_High(inputValueDI_ZSO_1);
            setDI_ZSO_1_Low(inputValue2DI_ZSO_1);

            setDI_ZSC_1_High(inputValueDI_ZSC_1);
            setDI_ZSC_1_Low(inputValue2DI_ZSC_1);

            setDI_MAP_1_High(inputValueDI_MAP_1);
            setDI_MAP_1_Low(inputValue2DI_MAP_1);




            setDI_UPS_BATTERY_High(inputValueDI_UPS_BATTERY);
            setDI_UPS_BATTERY_Low(inputValue2DI_UPS_BATTERY);

            setDI_UPS_CHARGING_High(inputValueDI_UPS_CHARGING);
            setDI_UPS_CHARGING_Low(inputValue2DI_UPS_CHARGING);

    

            setDI_UPS_ALARM_High(inputValueDI_UPS_ALARM);
            setDI_UPS_ALARM_Low(inputValue2DI_UPS_ALARM);


            setEmergency_NO_High(inputValueEmergency_NO);
            setEmergency_NO_Low(inputValue2Emergency_NO);

            setDI_RESET_High(inputValueDI_RESET);
            setDI_RESET_Low(inputValue2DI_RESET);

            setEmergency_NC_High(inputValueEmergency_NC);
            setEmergency_NC_Low(inputValue2Emergency_NC);

            setUPS_Mode_High(inputValueUPS_Mode);
            setUPS_Mode_Low(inputValue2UPS_Mode);



            setDI_SELECT_SW_High(inputValueDI_SELECT_SW);
            setDI_SELECT_SW_Low(inputValue2DI_SELECT_SW);

            setDO_SV_01_High(inputValueDO_SV_01);
            setDO_SV_01_Low(inputValue2DO_SV_01);

            setDO_SV_01_High(inputValueDO_SV_01);
            setDO_SV_01_Low(inputValue2DO_SV_01);

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

        setInputGetwayPhone(getWayPhoneOTSUKA)
        setInputPCV_01(PCV_01)
        setInputPCV_02(PCV_02)
        setInputPSV_01(PSV_01)
 


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




     






        setInputValueGD1(GD1_High); 
        setInputValue2GD1(GD1_Low); 

        setInputValueGD2(GD2_High); 
        setInputValue2GD2(GD2_Low); 

        setInputValuePT1(PT1_High); 
        setInputValue2PT1(PT1_Low); 



        setInputValueDI_ZSC_1(DI_ZSC_1_High); 
        setInputValue2DI_ZSC_1(DI_ZSC_1_Low); 

        setInputValueDI_MAP_1(DI_MAP_1_High); 
        setInputValue2DI_MAP_1(DI_MAP_1_Low); 

        setInputValueDI_ZSO_1(DI_ZSO_1_High); 
        setInputValue2DI_ZSO_1(DI_ZSO_1_Low); 
        

        setInputValueDI_UPS_BATTERY(DI_UPS_BATTERY_High); 
        setInputValue2DI_UPS_BATTERY(DI_UPS_BATTERY_Low); 

        setInputValueDI_UPS_CHARGING(DI_UPS_CHARGING_High); 
        setInputValue2DI_UPS_CHARGING(DI_UPS_CHARGING_Low); 



        setInputValueDI_UPS_ALARM(DI_UPS_ALARM_High); 
        setInputValue2DI_UPS_ALARM(DI_UPS_ALARM_Low); 



        setInputValueDI_RESET(DI_RESET_High); 
        setInputValue2DI_RESET(DI_RESET_Low); 

        setInputValueEmergency_NO(Emergency_NO_High); 
        setInputValue2Emergency_NO(Emergency_NO_Low); 

        setInputValueEmergency_NC(Emergency_NC_High); 
        setInputValue2Emergency_NC(Emergency_NC_Low); 

        setInputValueUPS_Mode(UPS_Mode_High); 
        setInputValue2UPS_Mode(UPS_Mode_Low); 


        setInputValueDO_HR_01(DO_HR_01_High); 
        setInputValue2DO_HR_01(DO_HR_01_Low); 

        setInputValueDO_BC_01(DO_BC_01_High); 
        setInputValue2DO_BC_01(DO_BC_01_Low); 


        setInputValueDI_SELECT_SW(DI_SELECT_SW_High); 
        setInputValue2DI_SELECT_SW(DI_SELECT_SW_Low); 


        setInputValueDO_SV_01(DO_SV_01_High); 
        setInputValue2DO_SV_01(DO_SV_01_Low); 

        setInputValueDO_SV_01(DO_SV_01_High); 
        setInputValue2DO_SV_01(DO_SV_01_Low); 



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





           GD1_High, GD1_Low ,
        GD2_High, GD2_Low 
        ,PT1_High, PT1_Low ,


        DI_ZSC_1_High,DI_ZSC_1_Low,
         DI_MAP_1_High,DI_MAP_1_Low ,
          DI_ZSO_1_High,DI_ZSO_1_Low,

          DI_UPS_BATTERY_High,DI_UPS_BATTERY_Low,
          DI_UPS_CHARGING_High,DI_UPS_CHARGING_Low ,
        
           DI_UPS_ALARM_High,DI_UPS_ALARM_Low,

           DI_RESET_High,DI_RESET_Low,
           Emergency_NO_High,Emergency_NO_Low,

           Emergency_NC_High,Emergency_NC_Low,
           UPS_Mode_High,UPS_Mode_Low,

           DO_BC_01_High,DO_BC_01_Low,
           DO_HR_01_High,DO_HR_01_Low,


           DI_SELECT_SW_High,DI_SELECT_SW_Low,
           DO_SV_01_High,DO_SV_01_Low,
           getWayPhoneOTSUKA,
           PCV_01,
           PCV_02,
           PSV_01,

           timeEVC_01,timeEVC_02,
           EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low ,
           EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low ,
           PLC_Conn_STT_High, PLC_Conn_STT_Low ,

        ]);



        const handleMainTainAll = async (checked:any) => {
            try {
                const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
                const newmaintainEVC_01_Temperature = checked;
                const newmaintainEVC_01_Volume_at_Base_Condition = checked;
                const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_01_Pressure = checked;
                const newMaintainEVC_01_Flow_at_Base_Condition = checked;
                const newmaintainEVC_01_Vm_of_Current_Day = checked;
                const newMaintainEVC_01_Vb_of_Current_Day = checked;
                const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_01_Vb_of_Last_Day = checked;
                const newmaintainEVC_01_Vm_of_Last_Day = checked;
        
                const newmaintainEVC_02_Remain_Battery_Service_Life = checked;
                const newMaintainEVC_02_Temperature = checked;
                const newmaintainEVC_02_Volume_at_Base_Condition = checked;
                const newmaintainEVC_02_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Pressure = checked;
                const newmaintainEVC_02_Flow_at_Base_Condition = checked;
                const newmaintainEVC_02_Vm_of_Current_Day = checked;
                const newmaintainEVC_02_Vb_of_Current_Day = checked;
                const newmaintainEVC_02_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_02_Vb_of_Last_Day = checked;
                const newmaintainEVC_02_Vm_of_Last_Day = checked;
        
                const newMaintainGD1 = checked;
                const newMaintainGD2 = checked;
                const newMaintainGD3 = checked;
        
                const newMaintainPT1 = checked;
                const newMaintainDI_DI_ZSO_1 = checked;
                const newMaintainDI_DI_ZSC_1 = checked;
                const newmaintainDI_MAP_1 = checked;
                const newmaintainDI_UPS_CHARGING = checked;
                const newmaintainDI_UPS_ALARM = checked;
                const newmaintainDI_SELECT_SW = checked;
                const newmaintainDI_RESET = checked;
                const newmaintainDI_UPS_BATTERY = checked;
                const newmaintainDO_SV1 = checked;
        
                const newmaintainEmergency_NO = checked;
                const newmaintainEmergency_NC = checked;
                const newmaintainUPS_Mode = checked;
                const newmaintainDO_HR_01 = checked;
                const newmaintainDO_BC_01 = checked;
                const newMaintainDO_SV_01 = checked;
                const newmaintainPLC_Conn_STT = checked;
                const newmaintainEVC_01_Conn_STT = checked;
                const newmaintainEVC_02_Conn_STT = checked;
        
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                    { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
                       EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
                       EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
                       EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
                       EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
                       EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
                       EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
                       EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
                       EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
                       EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
                       EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,
        
        
                       EVC_02_Remain_Battery_Service_Life_Maintain: newmaintainEVC_02_Remain_Battery_Service_Life,
                       EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
                       EVC_02_Volume_at_Base_Condition_Maintain: newmaintainEVC_02_Volume_at_Base_Condition,
                       EVC_02_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_02_Volume_at_Measurement_Condition,
                       EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
                       EVC_02_Flow_at_Base_Condition_Maintain: newmaintainEVC_02_Flow_at_Base_Condition,
                       EVC_02_Vm_of_Current_Day_Maintain: newmaintainEVC_02_Vm_of_Current_Day,
                       EVC_02_Vb_of_Current_Day_Maintain: newmaintainEVC_02_Vb_of_Current_Day,
                       EVC_02_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_02_Flow_at_Measurement_Condition,
                       EVC_02_Vb_of_Last_Day_Maintain: newmaintainEVC_02_Vb_of_Last_Day,
                       EVC_02_Vm_of_Last_Day_Maintain: newmaintainEVC_02_Vm_of_Last_Day,
        
                       GD1_Maintain: newMaintainGD1,
                       GD2_Maintain: newMaintainGD2,
                       GD3_Maintain: newMaintainGD3,
                       PT1_Maintain: newMaintainPT1,
                        DI_ZSO_1_Maintain: newMaintainDI_DI_ZSO_1,
                       DI_ZSC_1_Maintain: newMaintainDI_DI_ZSC_1,
                       DI_MAP_1_Maintain: newmaintainDI_MAP_1,
                       DI_UPS_CHARGING_Maintain: newmaintainDI_UPS_CHARGING,
                       DI_UPS_ALARM_Maintain: newmaintainDI_UPS_ALARM,
                       DI_SELECT_SW_Maintain: newmaintainDI_SELECT_SW,
                       DI_RESET_Maintain: newmaintainDI_RESET,
                       DI_UPS_BATTERY_Maintain: newmaintainDI_UPS_BATTERY,
                       DO_SV1_Maintain: newmaintainDO_SV1,
        
                       Emergency_NO_Maintain: newmaintainEmergency_NO,
                       Emergency_NC_Maintain: newmaintainEmergency_NC,
                       UPS_Mode_Maintain: newmaintainUPS_Mode,
                       DO_HR_01_Maintain: newmaintainDO_HR_01,
                       DO_BC_01_Maintain: newmaintainDO_BC_01,
                       DO_SV_01_Maintain: newMaintainDO_SV_01,
                       PLC_Conn_STT_Maintain: newmaintainPLC_Conn_STT,
                       EVC_01_Conn_STT_Maintain: newmaintainEVC_01_Conn_STT,
                       EVC_02_Conn_STT_Maintain: newmaintainEVC_02_Conn_STT,
        
        
                     }
                );
                setMaintainEVC_01_Remain_Battery_Service_Life(newMaintainEVC_01_Remain_Battery_Service_Life);
                setMaintainEVC_01_Temperature(newmaintainEVC_01_Temperature);
                setMaintainEVC_01_Volume_at_Base_Condition(newmaintainEVC_01_Volume_at_Base_Condition);
                setMaintainEVC_01_Volume_at_Measurement_Condition(newmaintainEVC_01_Volume_at_Measurement_Condition);
                setMaintainEVC_01_Pressure(newMaintainEVC_01_Pressure);
                setMaintainEVC_01_Flow_at_Base_Condition(newMaintainEVC_01_Flow_at_Base_Condition);
                setMaintainEVC_01_Vm_of_Current_Day(newmaintainEVC_01_Vm_of_Current_Day);
                setMaintainEVC_01_Vb_of_Current_Day(newMaintainEVC_01_Vb_of_Current_Day);
                setMaintainEVC_01_Flow_at_Measurement_Condition(newmaintainEVC_01_Flow_at_Measurement_Condition);
                setMaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
                setMaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);
        
                setMaintainEVC_02_Remain_Battery_Service_Life(newmaintainEVC_02_Remain_Battery_Service_Life);
                setMaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
                setMaintainEVC_02_Volume_at_Base_Condition(newmaintainEVC_02_Volume_at_Base_Condition);
                setMaintainEVC_02_Volume_at_Measurement_Condition(newmaintainEVC_02_Volume_at_Measurement_Condition);
                setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
                setMaintainEVC_02_Flow_at_Base_Condition(newmaintainEVC_02_Flow_at_Base_Condition);
                setMaintainEVC_02_Vm_of_Current_Day(newmaintainEVC_02_Vm_of_Current_Day);
                setMaintainEVC_02_Vb_of_Current_Day(newmaintainEVC_02_Vb_of_Current_Day);
                setMaintainEVC_02_Flow_at_Measurement_Condition(newmaintainEVC_02_Flow_at_Measurement_Condition);
                setMaintainEVC_02_Vb_of_Last_Day(newmaintainEVC_02_Vb_of_Last_Day);
                setMaintainEVC_02_Vm_of_Last_Day(newmaintainEVC_02_Vm_of_Last_Day);
                
        
                setMaintainGD1(newMaintainGD1);
                setMaintainGD2(newMaintainGD2);
        
                setMaintainPT1(newMaintainPT1);
                setMaintainDI_ZSO_1(newMaintainDI_DI_ZSO_1);
                setMaintainDI_ZSC_1(newMaintainDI_DI_ZSC_1);
                setMaintainDI_MAP_1(newmaintainDI_MAP_1);
                setMaintainDI_UPS_CHARGING(newmaintainDI_UPS_CHARGING);
                setMaintainDI_UPS_ALARM(newmaintainDI_UPS_ALARM);
                setMaintainDI_SELECT_SW(newmaintainDI_SELECT_SW);
                setMaintainDI_RESET(newmaintainDI_RESET);
                setMaintainDI_UPS_BATTERY(newmaintainDI_UPS_BATTERY);
                setMaintainDO_SV_01(newmaintainDO_SV1);
        
                setMaintainEmergency_NO(newmaintainEmergency_NO);
                setMaintainEmergency_NC(newmaintainEmergency_NC);
                setMaintainUPS_Mode(newmaintainUPS_Mode);
                setMaintainDO_HR_01(newmaintainDO_HR_01);
                setMaintainDO_BC_01(newmaintainDO_BC_01);
        
                setmaintainEVC_01_Conn_STT(newmaintainEVC_01_Conn_STT);
                setmaintainEVC_02_Conn_STT(newmaintainEVC_02_Conn_STT);
                setmaintainPLC_Conn_STT(newmaintainPLC_Conn_STT);
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainAll(isChecked);
        };
        const checkMaintainingAll = 
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
    maintainEVC_01_Conn_STT === true &&
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
    maintainEVC_02_Conn_STT === true &&
    maintainGD1 === true &&
    maintainGD2 === true &&
    maintainPT1 === true &&
    maintainDI_ZSO_1 === true &&
    maintainDI_ZSC_1 === true &&
    maintainDI_MAP_1 === true &&
    maintainDI_UPS_BATTERY === true &&
    maintainDI_UPS_CHARGING === true &&
    maintainDI_UPS_ALARM === true &&
    maintainDI_SELECT_SW === true &&
    maintainDI_RESET === true &&
    maintainEmergency_NO === true &&
    maintainEmergency_NC === true &&
    maintainUPS_Mode === true &&
    maintainDO_HR_01 === true &&
    maintainDO_BC_01 === true &&
    maintainDO_SV_01 === true &&
    maintainPLC_Conn_STT === true;

//==============================================================================================================
        
        const handleMainTainEVC01 = async (checked:any) => {
            try {
                const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
                const newmaintainEVC_01_Temperature = checked;
                const newmaintainEVC_01_Volume_at_Base_Condition = checked;
                const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_01_Pressure = checked;
                const newMaintainEVC_01_Flow_at_Base_Condition = checked;
                const newmaintainEVC_01_Vm_of_Current_Day = checked;
                const newMaintainEVC_01_Vb_of_Current_Day = checked;
                const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_01_Vb_of_Last_Day = checked;
                const newmaintainEVC_01_Vm_of_Last_Day = checked;
                const newmaintainEVC_01_Conn_STT = checked;
        
           
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                    { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
                       EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
                       EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
                       EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
                       EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
                       EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
                       EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
                       EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
                       EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
                       EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
                       EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,
                       EVC_01_Conn_STT_Maintain: newmaintainEVC_01_Conn_STT,
        
        
                     }
                );
                setMaintainEVC_01_Remain_Battery_Service_Life(newMaintainEVC_01_Remain_Battery_Service_Life);
                setMaintainEVC_01_Temperature(newmaintainEVC_01_Temperature);
                setMaintainEVC_01_Volume_at_Base_Condition(newmaintainEVC_01_Volume_at_Base_Condition);
                setMaintainEVC_01_Volume_at_Measurement_Condition(newmaintainEVC_01_Volume_at_Measurement_Condition);
                setMaintainEVC_01_Pressure(newMaintainEVC_01_Pressure);
                setMaintainEVC_01_Flow_at_Base_Condition(newMaintainEVC_01_Flow_at_Base_Condition);
                setMaintainEVC_01_Vm_of_Current_Day(newmaintainEVC_01_Vm_of_Current_Day);
                setMaintainEVC_01_Vb_of_Current_Day(newMaintainEVC_01_Vb_of_Current_Day);
                setMaintainEVC_01_Flow_at_Measurement_Condition(newmaintainEVC_01_Flow_at_Measurement_Condition);
                setMaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
                setMaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);
                setmaintainEVC_01_Conn_STT(newmaintainEVC_01_Conn_STT);
        
               
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChangeEVC01 = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainEVC01(isChecked);
        };
        const checkMaintainingEVC = 
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
//==============================================================================================================
        
        const handleMainTainEVC02 = async (checked:any) => {
            try {
                const newmaintainEVC_02_Remain_Battery_Service_Life = checked;
                const newMaintainEVC_02_Temperature = checked;
                const newmaintainEVC_02_Volume_at_Base_Condition = checked;
                const newmaintainEVC_02_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Pressure = checked;
                const newmaintainEVC_02_Flow_at_Base_Condition = checked;
                const newmaintainEVC_02_Vm_of_Current_Day = checked;
                const newmaintainEVC_02_Vb_of_Current_Day = checked;
                const newmaintainEVC_02_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_02_Vb_of_Last_Day = checked;
                const newmaintainEVC_02_Vm_of_Last_Day = checked;
                const newmaintainEVC_02_Conn_STT = checked;
        
           
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                    { EVC_02_Remain_Battery_Service_Life_Maintain: newmaintainEVC_02_Remain_Battery_Service_Life,
                       EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
                       EVC_02_Volume_at_Base_Condition_Maintain: newmaintainEVC_02_Volume_at_Base_Condition,
                       EVC_02_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_02_Volume_at_Measurement_Condition,
                       EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
                       EVC_02_Flow_at_Base_Condition_Maintain: newmaintainEVC_02_Flow_at_Base_Condition,
                       EVC_02_Vm_of_Current_Day_Maintain: newmaintainEVC_02_Vm_of_Current_Day,
                       EVC_02_Vb_of_Current_Day_Maintain: newmaintainEVC_02_Vb_of_Current_Day,
                       EVC_02_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_02_Flow_at_Measurement_Condition,
                       EVC_02_Vb_of_Last_Day_Maintain: newmaintainEVC_02_Vb_of_Last_Day,
                       EVC_02_Vm_of_Last_Day_Maintain: newmaintainEVC_02_Vm_of_Last_Day,
                       EVC_02_Conn_STT_Maintain: newmaintainEVC_02_Conn_STT,
        
        
                     }
                );
                setMaintainEVC_02_Remain_Battery_Service_Life(newmaintainEVC_02_Remain_Battery_Service_Life);
                setMaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
                setMaintainEVC_02_Volume_at_Base_Condition(newmaintainEVC_02_Volume_at_Base_Condition);
                setMaintainEVC_02_Volume_at_Measurement_Condition(newmaintainEVC_02_Volume_at_Measurement_Condition);
                setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
                setMaintainEVC_02_Flow_at_Base_Condition(newmaintainEVC_02_Flow_at_Base_Condition);
                setMaintainEVC_02_Vm_of_Current_Day(newmaintainEVC_02_Vm_of_Current_Day);
                setMaintainEVC_02_Vb_of_Current_Day(newmaintainEVC_02_Vb_of_Current_Day);
                setMaintainEVC_02_Flow_at_Measurement_Condition(newmaintainEVC_02_Flow_at_Measurement_Condition);
                setMaintainEVC_02_Vb_of_Last_Day(newmaintainEVC_02_Vb_of_Last_Day);
                setMaintainEVC_02_Vm_of_Last_Day(newmaintainEVC_02_Vm_of_Last_Day);
                setmaintainEVC_02_Conn_STT(newmaintainEVC_02_Conn_STT);
        
               
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
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

//==============================================================================================================
        
        const handleMainTainPLC = async (checked:any) => {
            try {
                const newMaintainGD1 = checked;
                const newMaintainGD2 = checked;
        
                const newMaintainPT1 = checked;
                const newMaintainDI_DI_ZSO_1 = checked;
                const newMaintainDI_DI_ZSC_1 = checked;
                const newmaintainDI_MAP_1 = checked;
                const newmaintainDI_UPS_CHARGING = checked;
                const newmaintainDI_UPS_ALARM = checked;
                const newmaintainDI_SELECT_SW = checked;
                const newmaintainDI_RESET = checked;
                const newmaintainDI_UPS_BATTERY = checked;
                const newmaintainDO_SV1 = checked;
        
                const newmaintainEmergency_NO = checked;
                const newmaintainEmergency_NC = checked;
                const newmaintainUPS_Mode = checked;
                const newmaintainDO_HR_01 = checked;
                const newmaintainDO_BC_01 = checked;
                const newMaintainDO_SV_01 = checked;
                const newmaintainPLC_Conn_STT = checked;
        
           
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_IGUECU}/SERVER_SCOPE`,
                    {                GD1_Maintain: newMaintainGD1,
                        GD2_Maintain: newMaintainGD2,
                        PT1_Maintain: newMaintainPT1,
                        DI_ZSO_1_Maintain: newMaintainDI_DI_ZSO_1,
                        DI_ZSC_1_Maintain: newMaintainDI_DI_ZSC_1,
                        DI_MAP_1_Maintain: newmaintainDI_MAP_1,
                        DI_UPS_CHARGING_Maintain: newmaintainDI_UPS_CHARGING,
                        DI_UPS_ALARM_Maintain: newmaintainDI_UPS_ALARM,
                        DI_SELECT_SW_Maintain: newmaintainDI_SELECT_SW,
                        DI_RESET_Maintain: newmaintainDI_RESET,
                        DI_UPS_BATTERY_Maintain: newmaintainDI_UPS_BATTERY,
                        DO_SV1_Maintain: newmaintainDO_SV1,
         
                        Emergency_NO_Maintain: newmaintainEmergency_NO,
                        Emergency_NC_Maintain: newmaintainEmergency_NC,
                        UPS_Mode_Maintain: newmaintainUPS_Mode,
                        DO_HR_01_Maintain: newmaintainDO_HR_01,
                        DO_BC_01_Maintain: newmaintainDO_BC_01,
                        DO_SV_01_Maintain: newMaintainDO_SV_01,
                        PLC_Conn_STT_Maintain: newmaintainPLC_Conn_STT,
        
        
                     }
                );
                setMaintainGD1(newMaintainGD1);
                setMaintainGD2(newMaintainGD2);
        
                setMaintainPT1(newMaintainPT1);
                setMaintainDI_ZSO_1(newMaintainDI_DI_ZSO_1);
                setMaintainDI_ZSC_1(newMaintainDI_DI_ZSC_1);
                setMaintainDI_MAP_1(newmaintainDI_MAP_1);
                setMaintainDI_UPS_CHARGING(newmaintainDI_UPS_CHARGING);
                setMaintainDI_UPS_ALARM(newmaintainDI_UPS_ALARM);
                setMaintainDI_SELECT_SW(newmaintainDI_SELECT_SW);
                setMaintainDI_RESET(newmaintainDI_RESET);
                setMaintainDI_UPS_BATTERY(newmaintainDI_UPS_BATTERY);
                setMaintainDO_SV_01(newmaintainDO_SV1);
        
                setMaintainEmergency_NO(newmaintainEmergency_NO);
                setMaintainEmergency_NC(newmaintainEmergency_NC);
                setMaintainUPS_Mode(newmaintainUPS_Mode);
                setMaintainDO_HR_01(newmaintainDO_HR_01);
                setMaintainDO_BC_01(newmaintainDO_BC_01);
                setmaintainPLC_Conn_STT(newmaintainPLC_Conn_STT);
        
        
               
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChangePLC = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainPLC(isChecked);
        };
        const checkMaintainingPLC = 
    maintainGD1 === true &&
    maintainGD2 === true &&
    maintainPT1 === true &&
    maintainDI_ZSO_1 === true &&
    maintainDI_ZSC_1 === true &&
    maintainDI_MAP_1 === true &&
    maintainDI_UPS_BATTERY === true &&
    maintainDI_UPS_CHARGING === true &&
    maintainDI_UPS_ALARM === true &&
    maintainDI_SELECT_SW === true &&
    maintainDI_RESET === true &&
    maintainEmergency_NO === true &&
    maintainEmergency_NC === true &&
    maintainUPS_Mode === true &&
    maintainDO_HR_01 === true &&
    maintainDO_BC_01 === true &&
    maintainDO_SV_01 === true &&
    maintainPLC_Conn_STT === true;

        
        //===========================================================================================
        
        
        
    const combineCss = {




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





     
      

  
       
        CSSGD1 : {
            color:exceedThresholdGD1 && !maintainGD1
            ? "#ff5656"
            : maintainGD1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD2 : {
            color:exceedThresholdGD2 && !maintainGD2
            ? "#ff5656"
            : maintainGD2
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPT1 : {
            color:exceedThresholdPT1 && !maintainPT1
            ? "#ff5656"
            : maintainPT1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSDI_ZSO_1 : {
            color:exceedThresholdDI_ZSO_1 && !maintainDI_ZSO_1
            ? "#ff5656"
            : maintainDI_ZSO_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSDI_ZSC_1 : {
            color:exceedThresholdDI_ZSC_1 && !maintainDI_ZSC_1
            ? "#ff5656"
            : maintainDI_ZSC_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSDI_MAP_1 : {
            color:exceedThresholdDI_MAP_1 && !maintainDI_MAP_1
            ? "#ff5656"
            : maintainDI_MAP_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


     


        CSSDI_UPS_BATTERY : {
            color:exceedThresholdDI_UPS_BATTERY && !maintainDI_UPS_BATTERY
            ? "#ff5656"
            : maintainDI_UPS_BATTERY
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSDI_UPS_CHARGING : {
            color:exceedThresholdDI_UPS_CHARGING && !maintainDI_UPS_CHARGING
            ? "#ff5656"
            : maintainDI_UPS_CHARGING
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSDI_UPS_ALARM : {
            color:exceedThresholdDI_UPS_ALARM && !maintainDI_UPS_ALARM
            ? "#ff5656"
            : maintainDI_UPS_ALARM
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSDI_RESET : {
            color:exceedThresholdDI_RESET && !maintainDI_RESET
            ? "#ff5656"
            : maintainDI_RESET
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEmergency_NO : {
            color:exceedThresholdEmergency_NO && !maintainEmergency_NO
            ? "#ff5656"
            : maintainEmergency_NO
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSUPS_Mode : {
            color:exceedThresholdUPS_Mode && !maintainUPS_Mode
            ? "#ff5656"
            : maintainUPS_Mode
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEmergency_NC : {
            color:exceedThresholdEmergency_NC && !maintainEmergency_NC
            ? "#ff5656"
            : maintainEmergency_NC
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSDO_HR_01 : {
            color:exceedThresholdDO_HR_01 && !maintainDO_HR_01
            ? "#ff5656"
            : maintainDO_HR_01
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSDO_BC_01 : {
            color:exceedThresholdDO_BC_01 && !maintainDO_BC_01
            ? "#ff5656"
            : maintainDO_BC_01
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSDI_SELECT_SW : {
            color:exceedThresholdDI_SELECT_SW && !maintainDI_SELECT_SW
            ? "#ff5656"
            : maintainDI_SELECT_SW
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSDO_SV_01 : {
            color:exceedThresholdDO_SV_01 && !maintainDO_SV_01
            ? "#ff5656"
            : maintainDO_SV_01
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
         
    
  const DataEVC_01_Conn_STT = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null
  const DataEVC_02_Conn_STT = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null
  const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null




  const mainCategoryEVC = {
       
    EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> EVC-1501 -  Parameters & Configurations   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
        <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC01}
            checked={checkMaintainingEVC}
        />
    <p style={{fontSize:15}}>Maintain EVC-1501</p>  </div>  </span>,
    EVC02:  <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> EVC-1502 -  Parameters & Configurations   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
        <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeEVC02}
            checked={checkMaintainingEVC02}
        />
     <p style={{fontSize:15}}>Maintain EVC-1902</p>  </div>  </span>,
    PLC:  <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameters & Configurations    <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
        <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 5 }}
            onChange={handleCheckboxChangePLC}
            checked={checkMaintainingPLC}
        />
     <p style={{fontSize:15}}>Maintain PLC</p>  </div> </span>
};



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
            mainCategory: mainCategoryEVC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40001	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {formatValue(EVC_01_Remain_Battery_Service_Life)} {nameValue.month}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Remain_Battery_Service_Life}
             checked={maintainEVC_01_Remain_Battery_Service_Life}
         ></Checkbox>
    
            },
    
         
            {
            mainCategory: mainCategoryEVC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Temperature} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Temperature}>Temperature</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Temperature}>40850	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {formatValue(EVC_01_Temperature)} {nameValue.C}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Temperature}
             checked={maintainEVC_01_Temperature}
         ></Checkbox>
    
            },

            {
            mainCategory: mainCategoryEVC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSEVC_01_Pressure}>Input Pressure</span> ,
   
            modbus: <span style={combineCss.CSSEVC_01_Pressure}>40852	 </span> ,
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {formatValue(EVC_01_Pressure)} {nameValue.Bara}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
            update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
            Maintain:   <Checkbox disabled={TECH_OPER}
        
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainEVC_01_Pressure}
            checked={maintainEVC_01_Pressure}
        ></Checkbox>
   
           },

           {
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>Standard Volume Accumulated</span> ,
  
           modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40854	 </span> ,
  
          value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {formatValue(EVC_01_Volume_at_Base_Condition)} {nameValue.Sm3}</span> , 
           high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
           low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
           update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
           Maintain:   <Checkbox disabled={TECH_OPER}
    
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainEVC_01_Volume_at_Base_Condition}
           checked={maintainEVC_01_Volume_at_Base_Condition}
       ></Checkbox>
  
          },

          {
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
          name: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>Gross Volume Accumulated</span> ,
 
          modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40856	 </span> ,
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {formatValue(EVC_01_Volume_at_Measurement_Condition)} {nameValue.m3}</span> , 
          high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
          low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
          update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
          Maintain:   <Checkbox disabled={TECH_OPER}
    
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainEVC_01_Volume_at_Measurement_Condition}
          checked={maintainEVC_01_Volume_at_Measurement_Condition}
      ></Checkbox>
 
         },
         {
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
         name: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

         modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40858	 </span> ,

        value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {formatValue(EVC_01_Flow_at_Base_Condition)} {nameValue.Sm3h}</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
         Maintain:   <Checkbox disabled={TECH_OPER}
    
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainEVC_01_Flow_at_Base_Condition}
         checked={maintainEVC_01_Flow_at_Base_Condition}
     ></Checkbox>

        },

  
        {
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>Gross Volume Flow</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>40860	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {formatValue(EVC_01_Flow_at_Measurement_Condition)} {nameValue.m3h}</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
        update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
        Maintain:   <Checkbox disabled={TECH_OPER}
    
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Flow_at_Measurement_Condition}
        checked={maintainEVC_01_Flow_at_Measurement_Condition}
    ></Checkbox>

       },
       {
            mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40862	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {formatValue(EVC_01_Vb_of_Current_Day)} {nameValue.Sm3}</span> , 
       high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
       low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
       update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
       Maintain:   <Checkbox disabled={TECH_OPER}

       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Current_Day}
       checked={maintainEVC_01_Vb_of_Current_Day}
   ></Checkbox>

      },

        {
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>Gross Volume Vm Today</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40864	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {formatValue(EVC_01_Vm_of_Current_Day)} {nameValue.m3}</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
        Maintain:   <Checkbox disabled={TECH_OPER}
    
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vm_of_Current_Day}
        checked={maintainEVC_01_Vm_of_Current_Day}
    ></Checkbox>

       },


       {
            mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>Standard Volume Vb Yesterday</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40866	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {formatValue(EVC_01_Vb_of_Last_Day)} {nameValue.Sm3}</span> , 
       high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
       Maintain:   <Checkbox disabled={TECH_OPER}

       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

      },

              
      {
            mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} >{EVC_STT01Value}</span>,
      name: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>Gross Volume Vm Yesterday</span> ,

      modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40868	 </span> ,

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {formatValue(EVC_01_Vm_of_Last_Day)} {nameValue.m3}</span> , 
      high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
      Maintain:   <Checkbox disabled={TECH_OPER}

      style={{ marginRight: 20, }}
      onChange={ChangeMaintainEVC_01_Vm_of_Last_Day}
      checked={maintainEVC_01_Vm_of_Last_Day}
  ></Checkbox>

     },


     { 
        mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSS_EVC_01_Conn_STT} >{EVC_STT01Value}</span>,
    modbus: <span style={combineCss.CSS_EVC_01_Conn_STT}>Status</span> ,
    
    name: <span style={combineCss.CSS_EVC_01_Conn_STT}>EVC Connection Status </span> ,
    
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
                mainCategory: mainCategoryEVC.EVC02,

                
                timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,
            name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
       
            modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40001	 </span> ,
       
           value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {formatValue(EVC_02_Remain_Battery_Service_Life)} {nameValue.month}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
            update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
            Maintain:   <Checkbox disabled={TECH_OPER}
        
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainEVC_02_Remain_Battery_Service_Life}
            checked={maintainEVC_02_Remain_Battery_Service_Life}
        ></Checkbox>
       
           },
    {
        
        mainCategory: mainCategoryEVC.EVC02,

        
        timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC_STT02Value}</span>,
    name: <span style={combineCss.CSSEVC_02_Temperature}>Temperature</span> ,

    modbus: <span style={combineCss.CSSEVC_02_Temperature}>40850	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Temperature} > {formatValue(EVC_02_Temperature)} {nameValue.C}</span> , 
    high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
    update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
    Maintain:   <Checkbox disabled={TECH_OPER}

    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_02_Temperature}
    checked={maintainEVC_02_Temperature}
></Checkbox>

   },


   {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
   name: <span style={combineCss.CSSEVC_02_Pressure}>Input Pressure</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Pressure}>40852	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Pressure} > {formatValue(EVC_02_Pressure)} {nameValue.Bara}</span> , 
   high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
   low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
   update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
   Maintain:   <Checkbox disabled={TECH_OPER}
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Pressure}
   checked={maintainEVC_02_Pressure}
></Checkbox>

  },


  {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>Standard Volume Accumulated</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40854	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {formatValue(EVC_02_Volume_at_Base_Condition)} {nameValue.Sm3}</span> , 
  high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
  update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox disabled={TECH_OPER}
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Volume_at_Base_Condition}
  checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

 },

 {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} >{EVC_STT02Value}</span>,
   name: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>Gross Volume Accumulated</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40856	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {formatValue(EVC_02_Volume_at_Measurement_Condition)} {nameValue.m3}</span> , 
   high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
   low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
   update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
   Maintain:   <Checkbox disabled={TECH_OPER}
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Volume_at_Measurement_Condition}
   checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

  },


  {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>Standard Volume Flow</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40858	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {formatValue(EVC_02_Flow_at_Base_Condition)} {nameValue.Sm3h}</span> , 
  high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
  update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox disabled={TECH_OPER}
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Flow_at_Base_Condition}
  checked={maintainEVC_02_Flow_at_Base_Condition}
></Checkbox>

 },




 {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} >{EVC_STT02Value}</span>,
 name: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>Gross Volume Flow</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40860	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
 update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Flow_at_Measurement_Condition}
 checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},

{
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
  name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>Standard Volume Vb Today</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40862	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {formatValue(EVC_02_Vb_of_Current_Day)} {nameValue.Sm3}</span> , 
  high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox disabled={TECH_OPER}
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Vb_of_Current_Day}
  checked={maintainEVC_02_Vb_of_Current_Day}
></Checkbox>

 },


 {
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} >{EVC_STT02Value}</span>,
 name: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>Gross Volume Vm Today</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40864	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {formatValue(EVC_02_Vm_of_Current_Day)} {nameValue.m3}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Vm_of_Current_Day}
 checked={maintainEVC_02_Vm_of_Current_Day}
></Checkbox>

},


{
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>Standard Volume Vb Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40866	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {formatValue(EVC_02_Vb_of_Last_Day)} {nameValue.Sm3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vb_of_Last_Day}
checked={maintainEVC_02_Vb_of_Last_Day}
></Checkbox>

},


{
    
            mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} >{EVC_STT02Value}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>Gross Volume Vm Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40868	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {formatValue(EVC_02_Vm_of_Last_Day)} {nameValue.m3}</span> , 
high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
Maintain:   <Checkbox disabled={TECH_OPER}
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},

{ 
    mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSS_EVC_02_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_EVC_02_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_EVC_02_Conn_STT}>EVC Connection Status </span> ,

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

          const DataDI_ZSO_1 = DI_ZSO_1 === "0" ? "OFF" : DI_ZSO_1 === "1" ? "ON" : null;
          const DataDI_ZSC_1 = DI_ZSC_1 === "0" ? "ON" : DI_ZSC_1 === "1" ? "OFF" : null;
          
          const DataDI_MAP_1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null;
          const DataDI_UPS_BATTERY = DI_UPS_BATTERY === "0" ? "Normal" : DI_UPS_BATTERY === "1" ? "Battery" : null;
          const DataDI_UPS_CHARGING = DI_UPS_CHARGING === "0" ? "Normal" : DI_UPS_CHARGING === "1" ? "Charging" : null;
          const DataDI_UPS_ALARM = DI_UPS_ALARM === "0" ? "Normal" : DI_UPS_ALARM === "1" ? "No Battery" : null;
          const DataDI_SELECT_SW = DI_SELECT_SW === "0" ? "Local" : DI_SELECT_SW === "1" ? "Remote  " : null;
          const DataDI_RESET = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON " : null;
          
          const DataEmergency_NO = Emergency_NO === "0" ? "Normal" : Emergency_NO === "1" ? "Emergency" : null;
          const DataEmergency_NC = Emergency_NC === "0" ? "Emergency" : Emergency_NC === "1" ? "Normal" : null;
          const DataUPS_Mode = UPS_Mode === "0" ? "Error" : UPS_Mode === "1" ? "UPS Running" : UPS_Mode === "2" ? "Charging" : UPS_Mode === "3" ? "No Battery" : UPS_Mode === "4" ? "Normal" : null
          
          const DataDO_HR_01 = DO_HR_01 === "0" ? "OFF" : DO_HR_01 === "1" ? "ON" : null;
          const DataDO_BC_01 = DO_BC_01 === "0" ? "OFF" : DO_BC_01 === "1" ? "ON" : null;
          const DataDO_SV_01 = DO_SV_01 === "0" ? "OFF" : DO_SV_01 === "1" ? "ON" : null;

          const PLC01 = [

            {
            mainCategory: mainCategoryEVC.PLC,
                
                timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD1}>Gas Detector GD-1501</span> ,
    
             modbus: <span style={combineCss.CSSGD1}>DB5F106</span> ,
    
            value: <span style={combineCss.CSSGD1} > {formatValue(GD1)} {nameValue.LEL}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputValueGD1} onChange={handleInputChangeGD1} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD1}
             checked={maintainGD1}
         ></Checkbox>
    
            },
    
            {
            mainCategory: mainCategoryEVC.PLC,
                
                timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD2}>Gas Detector GD-1502</span> ,
    
             modbus: <span style={combineCss.CSSGD2}>DB5F110	 </span> ,
    
            value: <span style={combineCss.CSSGD2} > {formatValue(GD2)} {nameValue.LEL}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputValueGD2} onChange={handleInputChangeGD2} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2} onChange={handleInputChange2GD2} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD2}
             checked={maintainGD2}
         ></Checkbox>
    
            },
    
            {
            mainCategory: mainCategoryEVC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT1}>Output Pressure PT-1503</span> ,
    
             modbus: <span style={combineCss.CSSPT1}>DB5F114</span> ,
    
            value: <span style={combineCss.CSSPT1} > {formatValue(PT1)} {nameValue.BARG}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT1}   placeholder='High' step="0.1" type='number' value={inputValuePT1} onChange={handleInputChangePT1} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPT1}   placeholder='Low' step="0.1" type='number' value={inputValue2PT1} onChange={handleInputChange2PT1} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT1}
             checked={maintainPT1}
         ></Checkbox>
    
            },


            {
            mainCategory: mainCategoryEVC.PLC,
                
                timeUpdate: <span style={combineCss.CSSDI_ZSO_1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSDI_ZSO_1}>SDV-1501 ZSO</span> ,
    
             modbus: <span style={combineCss.CSSDI_ZSO_1}>DB5W16	 </span> ,
    
            value: <span style={combineCss.CSSDI_ZSO_1} > {formatValue(DI_ZSO_1)} {DataDI_ZSO_1}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_ZSO_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSO_1} onChange={handleInputChangeDI_ZSO_1} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_ZSO_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSO_1} onChange={handleInputChange2DI_ZSO_1} inputMode="decimal" />,
             update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
             Maintain:   <Checkbox disabled={TECH_OPER}
        
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainDI_ZSO_1}
             checked={maintainDI_ZSO_1}
         ></Checkbox>
    
            },

            {
            mainCategory: mainCategoryEVC.PLC,
                
                timeUpdate: <span style={combineCss.CSSDI_ZSC_1} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSDI_ZSC_1}>SDV-1501 ZSC</span> ,
   
            modbus: <span style={combineCss.CSSDI_ZSC_1}>DB5W18	 </span> ,
   
           value: <span style={combineCss.CSSDI_ZSC_1} > {formatValue(DI_ZSC_1)} {DataDI_ZSC_1}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_ZSC_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSC_1} onChange={handleInputChangeDI_ZSC_1} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_ZSC_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSC_1} onChange={handleInputChange2DI_ZSC_1} inputMode="decimal" />,
            update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
            Maintain:   <Checkbox disabled={TECH_OPER}
        
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainDI_ZSC_1}
            checked={maintainDI_ZSC_1}
        ></Checkbox>
   
           },


           {
            mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSSDI_MAP_1} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSDI_MAP_1}>MAP</span> ,
  
           modbus: <span style={combineCss.CSSDI_MAP_1}>DB5W24	 </span> ,
  
          value: <span style={combineCss.CSSDI_MAP_1} > {formatValue(DI_MAP_1)} {DataDI_MAP_1}</span> , 
           high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_MAP_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_MAP_1} onChange={handleInputChangeDI_MAP_1} inputMode="decimal" />, 
           low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_MAP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_MAP_1} onChange={handleInputChange2DI_MAP_1} inputMode="decimal" />,
           update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
           Maintain:   <Checkbox disabled={TECH_OPER}
    
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainDI_MAP_1}
           checked={maintainDI_MAP_1}
       ></Checkbox>
  
          },




         {
            mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSSDI_UPS_BATTERY} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSDI_UPS_BATTERY}>UPS BATTERY</span> ,

         modbus: <span style={combineCss.CSSDI_UPS_BATTERY}>DB5W26	 </span> ,

        value: <span style={combineCss.CSSDI_UPS_BATTERY} > {formatValue(DI_UPS_BATTERY)} {DataDI_UPS_BATTERY}</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_BATTERY}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_BATTERY} onChange={handleInputChangeDI_UPS_BATTERY} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_BATTERY}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_BATTERY} onChange={handleInputChange2DI_UPS_BATTERY} inputMode="decimal" />,
         update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
         Maintain:   <Checkbox disabled={TECH_OPER}
    
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainDI_UPS_BATTERY}
         checked={maintainDI_UPS_BATTERY}
     ></Checkbox>

        },


        {
            mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSSDI_UPS_CHARGING} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSDI_UPS_CHARGING}>UPS CHARGING</span> ,

        modbus: <span style={combineCss.CSSDI_UPS_CHARGING}>DB5W28	 </span> ,

       value: <span style={combineCss.CSSDI_UPS_CHARGING} > {formatValue(DI_UPS_CHARGING)} {DataDI_UPS_CHARGING}</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_CHARGING}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_CHARGING} onChange={handleInputChangeDI_UPS_CHARGING} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_CHARGING}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_CHARGING} onChange={handleInputChange2DI_UPS_CHARGING} inputMode="decimal" />,
        update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
        Maintain:   <Checkbox disabled={TECH_OPER}
    
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_UPS_CHARGING}
        checked={maintainDI_UPS_CHARGING}
    ></Checkbox>

       },



       {
            mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSDI_UPS_ALARM} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSDI_UPS_ALARM}>UPS ALARM</span> ,

       modbus: <span style={combineCss.CSSDI_UPS_ALARM}>DB5W30	 </span> ,

      value: <span style={combineCss.CSSDI_UPS_ALARM} > {formatValue(DI_UPS_ALARM)} {DataDI_UPS_ALARM}</span> , 
       high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_ALARM}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_ALARM} onChange={handleInputChangeDI_UPS_ALARM} inputMode="decimal" />, 
       low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_UPS_ALARM}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_ALARM} onChange={handleInputChange2DI_UPS_ALARM} inputMode="decimal" />,
       update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
       Maintain:   <Checkbox disabled={TECH_OPER}

       style={{ marginRight: 20, }}
       onChange={ChangeMaintainDI_UPS_ALARM}
       checked={maintainDI_UPS_ALARM}
   ></Checkbox>

      },
     {
            mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSDI_SELECT_SW} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSDI_SELECT_SW}>SELECT SW</span> ,
    
     modbus: <span style={combineCss.CSSDI_SELECT_SW}>DB5W34	 </span> ,
    
    value: <span style={combineCss.CSSDI_SELECT_SW} > {formatValue(DI_SELECT_SW)} {DataDI_SELECT_SW}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_SELECT_SW}   placeholder='High' step="0.1" type='number' value={inputValueDI_SELECT_SW} onChange={handleInputChangeDI_SELECT_SW} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_SELECT_SW}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SELECT_SW} onChange={handleInputChange2DI_SELECT_SW} inputMode="decimal" />,
     update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
     Maintain:   <Checkbox disabled={TECH_OPER}

     style={{ marginRight: 20, }}
     onChange={ChangeMaintainDI_SELECT_SW}
     checked={maintainDI_SELECT_SW}
    ></Checkbox>
    
    },


     {
            mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSDI_RESET} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSDI_RESET}>RESET</span> ,

     modbus: <span style={combineCss.CSSDI_RESET}>DB5W36	 </span> ,

    value: <span style={combineCss.CSSDI_RESET} > {formatValue(DI_RESET)} {DataDI_RESET}</span> , 
     high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_RESET}   placeholder='High' step="0.1" type='number' value={inputValueDI_RESET} onChange={handleInputChangeDI_RESET} inputMode="decimal" />, 
     low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDI_RESET}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_RESET} onChange={handleInputChange2DI_RESET} inputMode="decimal" />,
     update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
     Maintain:   <Checkbox disabled={TECH_OPER}

     style={{ marginRight: 20, }}
     onChange={ChangeMaintainDI_RESET}
     checked={maintainDI_RESET}
 ></Checkbox>

    },


    {
            mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSEmergency_NO} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSEmergency_NO}>Emergency Stop NO</span> ,

    modbus: <span style={combineCss.CSSEmergency_NO}>DB5W38	 </span> ,

   value: <span style={combineCss.CSSEmergency_NO} > {formatValue(Emergency_NO)} {DataEmergency_NO}</span> , 
    high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEmergency_NO}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NO} onChange={handleInputChangeEmergency_NO} inputMode="decimal" />, 
    low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEmergency_NO}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NO} onChange={handleInputChange2Emergency_NO} inputMode="decimal" />,
    update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
    Maintain:   <Checkbox disabled={TECH_OPER}

    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEmergency_NO}
    checked={maintainEmergency_NO}
></Checkbox>

   },


   {
            mainCategory: mainCategoryEVC.PLC,
    
    timeUpdate: <span style={combineCss.CSSEmergency_NC} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSEmergency_NC}>Emergency Stop NC</span> ,

   modbus: <span style={combineCss.CSSEmergency_NC}>DB5W40	 </span> ,

  value: <span style={combineCss.CSSEmergency_NC} > {formatValue(Emergency_NC)} {DataEmergency_NC}</span> , 
   high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEmergency_NC}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NC} onChange={handleInputChangeEmergency_NC} inputMode="decimal" />, 
   low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSEmergency_NC}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NC} onChange={handleInputChange2Emergency_NC} inputMode="decimal" />,
   update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
   Maintain:   <Checkbox disabled={TECH_OPER}
   
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEmergency_NC}
   checked={maintainEmergency_NC}
></Checkbox>

  },


  {
            mainCategory: mainCategoryEVC.PLC,
    
    timeUpdate: <span style={combineCss.CSSUPS_Mode} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSUPS_Mode}>UPS MODE</span> ,

  modbus: <span style={combineCss.CSSUPS_Mode}>DB5W44	 </span> ,

 value: <span style={combineCss.CSSUPS_Mode} > {formatValue(UPS_Mode)} {DataUPS_Mode}</span> , 
  high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSUPS_Mode}   placeholder='High' step="0.1" type='number' value={inputValueUPS_Mode} onChange={handleInputChangeUPS_Mode} inputMode="decimal" />, 
  low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSUPS_Mode}   placeholder='Low' step="0.1" type='number' value={inputValue2UPS_Mode} onChange={handleInputChange2UPS_Mode} inputMode="decimal" />,
  update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox disabled={TECH_OPER}
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainUPS_Mode}
  checked={maintainUPS_Mode}
></Checkbox>

 },

 {
            mainCategory: mainCategoryEVC.PLC,
    
    timeUpdate: <span style={combineCss.CSSDO_HR_01} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSDO_HR_01}>HORN</span> ,

   modbus: <span style={combineCss.CSSDO_HR_01}>DB5W50	 </span> ,

  value: <span style={combineCss.CSSDO_HR_01} > {formatValue(DO_HR_01)} {DataDO_HR_01}</span> , 
   high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_HR_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_HR_01} onChange={handleInputChangeDO_HR_01} inputMode="decimal" />, 
   low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_HR_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_HR_01} onChange={handleInputChange2DO_HR_01} inputMode="decimal" />,
   update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
   Maintain:   <Checkbox disabled={TECH_OPER}
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainDO_HR_01}
   checked={maintainDO_HR_01}
></Checkbox>

  },


  {
            mainCategory: mainCategoryEVC.PLC,
    
    timeUpdate: <span style={combineCss.CSSDO_BC_01} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSDO_BC_01}>BEACON</span> ,

  modbus: <span style={combineCss.CSSDO_BC_01}>DB5W52	 </span> ,

 value: <span style={combineCss.CSSDO_BC_01} > {formatValue(DO_BC_01)} {DataDO_BC_01}</span> , 
  high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_BC_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_BC_01} onChange={handleInputChangeDO_BC_01} inputMode="decimal" />, 
  low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_BC_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_BC_01} onChange={handleInputChange2DO_BC_01} inputMode="decimal" />,
  update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
  Maintain:   <Checkbox disabled={TECH_OPER}
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainDO_BC_01}
  checked={maintainDO_BC_01}
></Checkbox>

 },

 {
    mainCategory: mainCategoryEVC.PLC,
    timeUpdate: <span style={combineCss.CSSDO_SV_01} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSDO_SV_01}>SDV-1501 SOLENOID</span> ,

 modbus: <span style={combineCss.CSSDO_SV_01}>DB5W54	 </span> ,

value: <span style={combineCss.CSSDO_SV_01} > {formatValue(DO_SV_01)} {DataDO_SV_01}</span> , 
 high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_SV_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_SV_01} onChange={handleInputChangeDO_SV_01} inputMode="decimal" />, 
 low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSDO_SV_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_SV_01} onChange={handleInputChange2DO_SV_01} inputMode="decimal" />,
 update:  <Button disabled={TECHNIAN_AUTH} className='buttonUpdateSetData' onClick={confirmUpData} label='Update' />,
 Maintain:   <Checkbox disabled={TECH_OPER}
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainDO_SV_01}
 checked={maintainDO_SV_01}
></Checkbox>

},
{ 
    mainCategory: mainCategoryEVC.PLC,

    timeUpdate: <span style={combineCss.CSS_PLC_Conn_STT} >{EVC_STT01Value}</span>,
modbus: <span style={combineCss.CSS_PLC_Conn_STT}>Status</span> ,

name: <span style={combineCss.CSS_PLC_Conn_STT}> PLC Connection Status </span> ,

value: <span style={combineCss.CSS_PLC_Conn_STT} > {formatValue(PLC_Conn_STT)} {DataPLC_Conn_STT}</span>, 
high: <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_PLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
low:  <InputText disabled={TECHNIAN_AUTH}  

style={combineCss.CSS_PLC_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
update:  <Button disabled={TECHNIAN_AUTH}  className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
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
    const handleInputPCV_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_01(newValue);
    };

    const handleInputPCV_02 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPCV_02(newValue);
    };
    const handleInputPSV_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : any = event.target.value;
        setInputPSV_01(newValue);
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

      const ConfigurationsName ={

        IOT: "IOT getway phone number",
        EVC_01_Battery_Expiration_Date: "EVC-1501 Battery Expiration Date",
        EVC_01_Battery_Installation_Date: "EVC-1501 Battery Installation Date",
        EVC_02_Battery_Expiration_Date: "EVC-1502 Battery Expiration Date",
        EVC_02_Battery_Installation_Date: "EVC-1502 Battery Installation Date"

    }
    const combineCssTime = {
        PCV: {
            height: 25,
            fontWeight: 400,
        },
    };
    const Configurations = [
        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1501) (BarG)</span>,

            Value: (
                <InputText disabled={TECHNIAN_AUTH}
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPCV_01}
                    onChange={handleInputPCV_01}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button disabled={TECHNIAN_AUTH}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1502) (BarG)</span>,

            Value: (
                <InputText disabled={AuthUpdatePCV}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputPCV_02}
                    onChange={handleInputPCV_02}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button disabled={TECHNIAN_AUTH}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-1501) (BarG)</span>,

            Value: (
                <InputText disabled={AuthUpdatePCV}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputPSV_01}
                    onChange={handleInputPSV_01}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button disabled={TECHNIAN_AUTH}
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
                <InputText disabled={AuthUpdatePCV}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button disabled={TECHNIAN_AUTH}
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
                    {ConfigurationsName.EVC_01_Battery_Installation_Date}
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
                <Button disabled={TECH_OPER}

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
                    {ConfigurationsName.EVC_01_Battery_Expiration_Date}
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
                <Button disabled
                    className="buttonUpdateSetData"

                    style={{ marginTop: 5,cursor:"no-drop" }}
                    label="Update"
                />
            ),
           
        },

        {
            Name: (
                <span style={combineCssTime.PCV}>
                    {ConfigurationsName.EVC_02_Battery_Installation_Date}
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
                <Button disabled={TECH_OPER}

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
                    {ConfigurationsName.EVC_02_Battery_Expiration_Date}
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
                <Button disabled
                    className="buttonUpdateSetData"
                    
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
                    checked={checkMaintainingAll}
                />
            Maintain

        </div>
    );

       //=========================================================================

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>IGUACU</h2>

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
style={{ width: '133px' }} 
/>  {/* Set consistent width */}
    </DataTable>
  </div>

  <div style={{ width: '100%', borderRadius: 5,}}>
    <h4>Station - Configuration</h4>
    <DataTable value={Configurations} size={'small'} selectionMode="single">
      <Column field="Name" header="Name" />
     
      <Column field="Value" header="value" />
      <Column 
        field="Update" 
        header={<div style={{position:'relative', right:45}}>Update</div>} 
        style={{ display: 'flex', justifyContent: 'flex-end',}} 
      />  {/* Set the same width */} 
    </DataTable>
  </div>
</div>


<br />
<br />

</div>
  )
}
