import React, { useEffect, useRef, useState } from 'react'
import { id_ZOCV} from '../../data-table-device/ID-DEVICE/IdDevice';
import { Toast } from 'primereact/toast';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import "./LowHighOtsuka.css"
import { TagName, namePCV_PSV, nameValue } from '../namValue';
import { Button } from 'primereact/button';
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
export default function SetUpdata_ZOVC() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);

    const toast = useRef<Toast>(null);
    const [FC01_Conn_STT, setFC01_Conn_STT] = useState<string | null>(null);
    const [EVC02_Conn_STT, setEVC02_Conn_STT] = useState<string | null>(null);
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
                    entityId: id_ZOCV,
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
                                id: id_ZOCV,
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

                    const keys = Object?.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        FC_01_Lithium_Battery_Status: setFC_01_Lithium_Battery_Status,
                        FC_01_Battery_Voltage: setFC_01_Battery_Voltage,
                        FC_01_System_Voltage: setFC_01_System_Voltage,
                        FC_01_Charger_Voltage: setFC_01_Charger_Voltage,


                        FC_01_Accumulated_Values_Uncorrected_Volume: setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Accumulated_Values_Volume: setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Static_Pressure: setFC_01_Current_Values_Static_Pressure,
                        FC_01_Current_Values_Temperature: setFC_01_Current_Values_Temperature,
                        FC_01_Current_Values_Flow_Rate: setFC_01_Current_Values_Flow_Rate,

                        FC_01_Current_Values_Uncorrected_Flow_Rate:setFC_01_Current_Values_Uncorrected_Flow_Rate,
                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume: setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume: setFC_01_Yesterday_Values_Volume,
                        FC_01_Yesterday_Values_Uncorrected_Volume:setFC_01_Yesterday_Values_Uncorrected_Volume,

                        EVC_02_Remain_Battery_Service_Life: setEVC_02_Remain_Battery_Service_Life,
                        EVC_02_Temperature: setEVC_02_Temperature,
                        EVC_02_Pressure: setEVC_02_Pressure,
                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,

                        EVC_02_Vb_of_Current_Day: setEVC_02_Vb_of_Current_Day,
                        EVC_02_Vm_of_Current_Day: setEVC_02_Vm_of_Current_Day,
                        EVC_02_Vm_of_Last_Day: setEVC_02_Vm_of_Last_Day,
                        EVC_02_Vb_of_Last_Day:setEVC_02_Vb_of_Last_Day,

                        PT_1103:setPT_1103,
                        Mode_ATS:setMode_ATS,
                        ATS_Auto_Man:setATS_Auto_Man,
                        FC_01_Conn_STT:setFC_01_Conn_STT,
                        EVC_02_Conn_STT:setEVC_02_Conn_STT,

                    };
                    const valueStateMap: ValueStateMap = {
                        FC_01_Conn_STT: setFC01_Conn_STT,
                        EVC_02_Conn_STT: setEVC02_Conn_STT,
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
                `/plugins/telemetry/DEVICE/${id_ZOCV}/values/attributes/SERVER_SCOPE`
            );
    
            const FC_01_Lithium_Battery_Status_High = res.data.find((item: any) => item.key === "FC_01_Lithium_Battery_Status_High");
            setFC_01_Lithium_Battery_Status_High(FC_01_Lithium_Battery_Status_High?.value || null);
            const FC_01_Lithium_Battery_Status_Low = res.data.find((item: any) => item.key === "FC_01_Lithium_Battery_Status_Low");
            setFC_01_Lithium_Battery_Status_Low(FC_01_Lithium_Battery_Status_Low?.value || null);
            const MaintainFC_01_Lithium_Battery_Status = res.data.find(
                (item: any) => item.key === "FC_01_Lithium_Battery_Status_Maintain"
            );

            const FC_01_Battery_Voltage_High = res.data.find((item: any) => item.key === "FC_01_Battery_Voltage_High");
            setFC_01_Battery_Voltage_High(FC_01_Battery_Voltage_High?.value || null);
            const FC_01_Battery_Voltage_Low = res.data.find((item: any) => item.key === "FC_01_Battery_Voltage_Low");
            setFC_01_Battery_Voltage_Low(FC_01_Battery_Voltage_Low?.value || null);
            const FC_01_Battery_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Battery_Voltage_Maintain"
            );

            const FC_01_System_Voltage_High = res.data.find((item: any) => item.key === "FC_01_System_Voltage_High");
            setFC_01_System_Voltage_High(FC_01_System_Voltage_High?.value || null);
            const FC_01_System_Voltage_Low = res.data.find((item: any) => item.key === "FC_01_System_Voltage_Low");
            setFC_01_System_Voltage_Low(FC_01_System_Voltage_Low?.value || null);
            const FC_01_System_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_System_Voltage_Maintain"
            );


            const FC_01_Charger_Voltage_High = res.data.find((item: any) => item.key === "FC_01_Charger_Voltage_High");
            setFC_01_Charger_Voltage_High(FC_01_Charger_Voltage_High?.value || null);
            const FC_01_Charger_Voltage_Low = res.data.find((item: any) => item.key === "FC_01_Charger_Voltage_Low");
            setFC_01_Charger_Voltage_Low(FC_01_Charger_Voltage_Low?.value || null);
            const FC_01_Charger_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Charger_Voltage_Maintain"
            );

       

            const FC_01_Accumulated_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_High");
            setFC_01_Accumulated_Values_Uncorrected_Volume_High(FC_01_Accumulated_Values_Uncorrected_Volume_High?.value || null);
            const FC_01_Accumulated_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_Low");
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(FC_01_Accumulated_Values_Uncorrected_Volume_Low?.value || null);
            const FC_01_Accumulated_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_Maintain"
            );

            const FC_01_Accumulated_Values_Volume_High = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Volume_High");
            setFC_01_Accumulated_Values_Volume_High(FC_01_Accumulated_Values_Volume_High?.value || null);
            const FC_01_Accumulated_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Volume_Low");
            setFC_01_Accumulated_Values_Volume_Low(FC_01_Accumulated_Values_Volume_Low?.value || null);
            const FC_01_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Accumulated_Values_Volume_Maintain"
            );

            const FC_01_Current_Values_Static_Pressure_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_High");
            setFC_01_Current_Values_Static_Pressure_High(FC_01_Current_Values_Static_Pressure_High?.value || null);
            const FC_01_Current_Values_Static_Pressure_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Low");
            setFC_01_Current_Values_Static_Pressure_Low(FC_01_Current_Values_Static_Pressure_Low?.value || null);
            const FC_01_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
            );


            const FC_01_Current_Values_Temperature_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Temperature_High");
            setFC_01_Current_Values_Temperature_High(FC_01_Current_Values_Temperature_High?.value || null);
            const FC_01_Current_Values_Temperature_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Temperature_Low");
            setFC_01_Current_Values_Temperature_Low(FC_01_Current_Values_Temperature_Low?.value || null);
            const FC_01_Current_Values_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Temperature_Maintain"
            );

            const FC_01_Current_Values_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Flow_Rate_High");
            setFC_01_Current_Values_Flow_Rate_High(FC_01_Current_Values_Flow_Rate_High?.value || null);
            const FC_01_Current_Values_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Low");
            setFC_01_Current_Values_Flow_Rate_Low(FC_01_Current_Values_Flow_Rate_Low?.value || null);
            const FC_01_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Maintain"
            );

            const FC_01_Current_Values_Uncorrected_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_High");
            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(FC_01_Current_Values_Uncorrected_Flow_Rate_High?.value || null);
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_Low");
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(FC_01_Current_Values_Uncorrected_Flow_Rate_Low?.value || null);
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain"
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

            const EVC_02_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
            setEVC_02_Volume_at_Base_Condition_High(EVC_02_Volume_at_Base_Condition_High?.value || null);
            const EVC_02_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
            setEVC_02_Volume_at_Base_Condition_Low(EVC_02_Volume_at_Base_Condition_Low?.value || null);
            const EVC_02_Volume_at_Base_Condition_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
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


            const EVC_02_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
            setEVC_02_Vm_of_Last_Day_High(EVC_02_Vm_of_Last_Day_High?.value || null);
            const EVC_02_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
            setEVC_02_Vm_of_Last_Day_Low(EVC_02_Vm_of_Last_Day_Low?.value || null);
            const EVC_02_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );

            const PT_1103_High = res.data.find((item: any) => item.key === "PT_1103_High");
            setPT_1103_High(PT_1103_High?.value || null);
            const PT_1103_Low = res.data.find((item: any) => item.key === "PT_1103_Low");
            setPT_1103_Low(PT_1103_Low?.value || null);
            const PT_1103_Maintain = res.data.find(
                (item: any) => item.key === "PT_1103_Maintain"
            );
            setMaintainPT_1103(PT_1103_Maintain?.value || false);


            const Mode_ATS_High = res.data.find((item: any) => item.key === "Mode_ATS_High");
            setMode_ATS_High(Mode_ATS_High?.value || null);
            const Mode_ATS_Low = res.data.find((item: any) => item.key === "Mode_ATS_Low");
            setMode_ATS_Low(Mode_ATS_Low?.value || null);
            const Mode_ATS_Maintain = res.data.find(
                (item: any) => item.key === "Mode_ATS_Maintain"
            );
       
            const ATS_Auto_Man_High = res.data.find((item: any) => item.key === "ATS_Auto_Man_High");
            setATS_Auto_Man_High(ATS_Auto_Man_High?.value || null);
            const ATS_Auto_Man_Low = res.data.find((item: any) => item.key === "ATS_Auto_Man_Low");
            setATS_Auto_Man_Low(ATS_Auto_Man_Low?.value || null);
            const ATS_Auto_Man_Maintain = res.data.find(
                (item: any) => item.key === "ATS_Auto_Man_Maintain"
            );
       
            const EVC_02_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_High");
            setEVC_02_Conn_STT_High(EVC_02_Conn_STT_High?.value || null);
            const EVC_02_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_Low");
            setEVC_02_Conn_STT_Low(EVC_02_Conn_STT_Low?.value || null);
            const EVC_02_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Conn_STT_Maintain"
            );

            const FC_01_Conn_STT_High = res.data.find((item: any) => item.key === "FC_01_Conn_STT_High");
            setFC_01_Conn_STT_High(FC_01_Conn_STT_High?.value || null);
            const FC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "FC_01_Conn_STT_Low");
            setFC_01_Conn_STT_Low(FC_01_Conn_STT_Low?.value || null);
            const FC_01_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Conn_STT_Maintain"
            );

 // =================================================================================================================== 
 setMaintainFC_01_Charger_Voltage(FC_01_Charger_Voltage_Maintain?.value || false);

 setMaintainFC_01_System_Voltage(FC_01_System_Voltage_Maintain?.value || false);

 setMaintainFC_01_Battery_Voltage(FC_01_Battery_Voltage_Maintain?.value || false);

 setMaintainFC_01_Lithium_Battery_Status(MaintainFC_01_Lithium_Battery_Status?.value || false);

            setMaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);

            setMaintainEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Maintain?.value || false);

            setMaintainEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false);


            setMaintainEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Maintain?.value || false);


            setMaintainEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false);

            
            setMaintainEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Maintain?.value || false);
            
            setMaintainEVC_02_Pressure(EVC_02_Pressure_Maintain?.value || false);

            
            setMaintainEVC_02_Temperature(EVC_02_Temperature_Maintain?.value || false);

            setMaintainEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Maintain?.value || false);


            setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Maintain?.value || false);


            setMaintainFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Maintain?.value || false);


            setMaintainFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);



            setMaintainFC_01_Charger_Voltage(FC_01_Charger_Voltage_Maintain?.value || false);

            setMaintainFC_01_System_Voltage(FC_01_System_Voltage_Maintain?.value || false);

            setMaintainFC_01_Battery_Voltage(FC_01_Battery_Voltage_Maintain?.value || false);

            setMaintainFC_01_Lithium_Battery_Status(MaintainFC_01_Lithium_Battery_Status?.value || false);


            setMaintainEVC_02_Conn_STT(EVC_02_Conn_STT_Maintain?.value || false);

            setMaintainFC_01_Conn_STT(FC_01_Conn_STT_Maintain?.value || false);


            setMaintainPT_1103(PT_1103_Maintain?.value || false);

            setMaintainMode_ATS(Mode_ATS_Maintain?.value || false);

            setMaintainATS_Auto_Man(ATS_Auto_Man_Maintain?.value || false);


            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [FC_01_Lithium_Battery_Status, setFC_01_Lithium_Battery_Status] = useState<string | null>(null);
const [inputValueFC_01_Lithium_Battery_Status, setInputValueFC_01_Lithium_Battery_Status] = useState<any>();
const [inputValue2FC_01_Lithium_Battery_Status, setInputValue2FC_01_Lithium_Battery_Status] = useState<any>();
const [FC_01_Lithium_Battery_Status_High, setFC_01_Lithium_Battery_Status_High] = useState<number | null>(null);
const [FC_01_Lithium_Battery_Status_Low, setFC_01_Lithium_Battery_Status_Low] = useState<number | null>(null);
const [exceedThresholdFC_01_Lithium_Battery_Status, setExceedThresholdFC_01_Lithium_Battery_Status] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_01_Lithium_Battery_Status, setMaintainFC_01_Lithium_Battery_Status] = useState<boolean>(false);


useEffect(() => {
    const FC_01_Lithium_Battery_StatusValue = parseFloat(FC_01_Lithium_Battery_Status as any);
    const highValue = FC_01_Lithium_Battery_Status_High ?? NaN;
    const lowValue = FC_01_Lithium_Battery_Status_Low ?? NaN;

    if (!isNaN(FC_01_Lithium_Battery_StatusValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Lithium_Battery_Status) {
        setExceedThresholdFC_01_Lithium_Battery_Status(FC_01_Lithium_Battery_StatusValue >= highValue || FC_01_Lithium_Battery_StatusValue <= lowValue);
    }
}, [FC_01_Lithium_Battery_Status, FC_01_Lithium_Battery_Status_High, FC_01_Lithium_Battery_Status_Low, maintainFC_01_Lithium_Battery_Status]);

    const handleInputChangeFC_01_Lithium_Battery_Status = (event: any) => {
        const newValue = event.target.value;
        setInputValueFC_01_Lithium_Battery_Status(newValue);
    };

    const handleInputChange2FC_01_Lithium_Battery_Status = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2FC_01_Lithium_Battery_Status(newValue2);
    };
    const ChangeMaintainFC_01_Lithium_Battery_Status = async () => {
        try {
            const newValue = !maintainFC_01_Lithium_Battery_Status;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { FC_01_Lithium_Battery_Status_Maintain: newValue }
            );
            setMaintainFC_01_Lithium_Battery_Status(newValue);
            
        } catch (error) {}
    };


     // =================================================================================================================== 

     const [FC_01_Battery_Voltage, setFC_01_Battery_Voltage] = useState<string | null>(null);
     const [inputValueFC_01_Battery_Voltage, setInputValueFC_01_Battery_Voltage] = useState<any>();
     const [inputValue2FC_01_Battery_Voltage, setInputValue2FC_01_Battery_Voltage] = useState<any>();
     const [FC_01_Battery_Voltage_High, setFC_01_Battery_Voltage_High] = useState<number | null>(null);
     const [FC_01_Battery_Voltage_Low, setFC_01_Battery_Voltage_Low] = useState<number | null>(null);
     const [exceedThresholdFC_01_Battery_Voltage, setExceedThresholdFC_01_Battery_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_01_Battery_Voltage, setMaintainFC_01_Battery_Voltage] = useState<boolean>(false);
     
     
     useEffect(() => {
        const FC_01_Battery_VoltageValue = parseFloat(FC_01_Battery_Voltage as any);
        const highValue = FC_01_Battery_Voltage_High ?? NaN;
        const lowValue = FC_01_Battery_Voltage_Low ?? NaN;
    
        if (!isNaN(FC_01_Battery_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Battery_Voltage) {
            setExceedThresholdFC_01_Battery_Voltage(FC_01_Battery_VoltageValue >= highValue || FC_01_Battery_VoltageValue <= lowValue);
        }
    }, [FC_01_Battery_Voltage, FC_01_Battery_Voltage_High, FC_01_Battery_Voltage_Low, maintainFC_01_Battery_Voltage]);
    
     
         const handleInputChangeFC_01_Battery_Voltage = (event: any) => {
             const newValue = event.target.value;
             setInputValueFC_01_Battery_Voltage(newValue);
         };
     
         const handleInputChange2FC_01_Battery_Voltage = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2FC_01_Battery_Voltage(newValue2);
         };
         const ChangeMaintainFC_01_Battery_Voltage = async () => {
             try {
                 const newValue = !maintainFC_01_Battery_Voltage;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                     { FC_01_Battery_Voltage_Maintain: newValue }
                 );
                 setMaintainFC_01_Battery_Voltage(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 


     const [FC_01_System_Voltage, setFC_01_System_Voltage] = useState<string | null>(null);
     const [inputValueFC_01_System_Voltage, setInputValueFC_01_System_Voltage] = useState<any>();
     const [inputValue2FC_01_System_Voltage, setInputValue2FC_01_System_Voltage] = useState<any>();
     const [FC_01_System_Voltage_High, setFC_01_System_Voltage_High] = useState<number | null>(null);
     const [FC_01_System_Voltage_Low, setFC_01_System_Voltage_Low] = useState<number | null>(null);
     const [exceedThresholdFC_01_System_Voltage, setExceedThresholdFC_01_System_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_01_System_Voltage, setMaintainFC_01_System_Voltage] = useState<boolean>(false);
     
     
     useEffect(() => {
        const FC_01_System_VoltageValue = parseFloat(FC_01_System_Voltage as any);
        const highValue = FC_01_System_Voltage_High ?? NaN;
        const lowValue = FC_01_System_Voltage_Low ?? NaN;
    
        if (!isNaN(FC_01_System_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_System_Voltage) {
            setExceedThresholdFC_01_System_Voltage(FC_01_System_VoltageValue >= highValue || FC_01_System_VoltageValue <= lowValue);
        }
    }, [FC_01_System_Voltage, FC_01_System_Voltage_High, FC_01_System_Voltage_Low, maintainFC_01_System_Voltage]);
    
     
         const handleInputChangeFC_01_System_Voltage = (event: any) => {
             const newValue = event.target.value;
             setInputValueFC_01_System_Voltage(newValue);
         };
     
         const handleInputChange2FC_01_System_Voltage = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2FC_01_System_Voltage(newValue2);
         };
         const ChangeMaintainFC_01_System_Voltage = async () => {
             try {
                 const newValue = !maintainFC_01_System_Voltage;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                     { FC_01_System_Voltage_Maintain: newValue }
                 );
                 setMaintainFC_01_System_Voltage(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 



          const [FC_01_Charger_Voltage, setFC_01_Charger_Voltage] = useState<string | null>(null);
          const [inputValueFC_01_Charger_Voltage, setInputValueFC_01_Charger_Voltage] = useState<any>();
          const [inputValue2FC_01_Charger_Voltage, setInputValue2FC_01_Charger_Voltage] = useState<any>();
          const [FC_01_Charger_Voltage_High, setFC_01_Charger_Voltage_High] = useState<number | null>(null);
          const [FC_01_Charger_Voltage_Low, setFC_01_Charger_Voltage_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Charger_Voltage, setExceedThresholdFC_01_Charger_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Charger_Voltage, setMaintainFC_01_Charger_Voltage] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_01_Charger_VoltageValue = parseFloat(FC_01_Charger_Voltage as any);
            const highValue = FC_01_Charger_Voltage_High ?? NaN;
            const lowValue = FC_01_Charger_Voltage_Low ?? NaN;
        
            if (!isNaN(FC_01_Charger_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Charger_Voltage) {
                setExceedThresholdFC_01_Charger_Voltage(FC_01_Charger_VoltageValue >= highValue || FC_01_Charger_VoltageValue <= lowValue);
            }
        }, [FC_01_Charger_Voltage, FC_01_Charger_Voltage_High, FC_01_Charger_Voltage_Low, maintainFC_01_Charger_Voltage]);
        
         
          
              const handleInputChangeFC_01_Charger_Voltage = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Charger_Voltage(newValue);
              };
          
              const handleInputChange2FC_01_Charger_Voltage = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Charger_Voltage(newValue2);
              };
              const ChangeMaintainFC_01_Charger_Voltage = async () => {
                  try {
                      const newValue = !maintainFC_01_Charger_Voltage;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Charger_Voltage_Maintain: newValue }
                      );
                      setMaintainFC_01_Charger_Voltage(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


     
          // =================================================================================================================== 

          const [FC_01_Accumulated_Values_Uncorrected_Volume, setFC_01_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);
          const [inputValueFC_01_Accumulated_Values_Uncorrected_Volume, setInputValueFC_01_Accumulated_Values_Uncorrected_Volume] = useState<any>();
          const [inputValue2FC_01_Accumulated_Values_Uncorrected_Volume, setInputValue2FC_01_Accumulated_Values_Uncorrected_Volume] = useState<any>();
          const [FC_01_Accumulated_Values_Uncorrected_Volume_High, setFC_01_Accumulated_Values_Uncorrected_Volume_High] = useState<number | null>(null);
          const [FC_01_Accumulated_Values_Uncorrected_Volume_Low, setFC_01_Accumulated_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume, setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Accumulated_Values_Uncorrected_Volume, setMaintainFC_01_Accumulated_Values_Uncorrected_Volume] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_01_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Accumulated_Values_Uncorrected_Volume as any);
            const highValue = FC_01_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
            const lowValue = FC_01_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;
        
            if (!isNaN(FC_01_Accumulated_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Accumulated_Values_Uncorrected_Volume) {
                setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_VolumeValue >= highValue || FC_01_Accumulated_Values_Uncorrected_VolumeValue <= lowValue);
            }
        }, [FC_01_Accumulated_Values_Uncorrected_Volume, FC_01_Accumulated_Values_Uncorrected_Volume_High, FC_01_Accumulated_Values_Uncorrected_Volume_Low, maintainFC_01_Accumulated_Values_Uncorrected_Volume]);
        
          
              const handleInputChangeFC_01_Accumulated_Values_Uncorrected_Volume = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Accumulated_Values_Uncorrected_Volume(newValue);
              };
          
              const handleInputChange2FC_01_Accumulated_Values_Uncorrected_Volume = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Accumulated_Values_Uncorrected_Volume(newValue2);
              };
              const ChangeMaintainFC_01_Accumulated_Values_Uncorrected_Volume = async () => {
                  try {
                      const newValue = !maintainFC_01_Accumulated_Values_Uncorrected_Volume;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Accumulated_Values_Uncorrected_Volume_Maintain: newValue }
                      );
                      setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [FC_01_Current_Values_Temperature, setFC_01_Current_Values_Temperature] = useState<string | null>(null);
          const [inputValueFC_01_Current_Values_Temperature, setInputValueFC_01_Current_Values_Temperature] = useState<any>();
          const [inputValue2FC_01_Current_Values_Temperature, setInputValue2FC_01_Current_Values_Temperature] = useState<any>();
          const [FC_01_Current_Values_Temperature_High, setFC_01_Current_Values_Temperature_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Temperature_Low, setFC_01_Current_Values_Temperature_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Temperature, setExceedThresholdFC_01_Current_Values_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Temperature, setMaintainFC_01_Current_Values_Temperature] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_01_Current_Values_TemperatureValue = parseFloat(FC_01_Current_Values_Temperature as any);
            const highValue = FC_01_Current_Values_Temperature_High ?? NaN;
            const lowValue = FC_01_Current_Values_Temperature_Low ?? NaN;
        
            if (!isNaN(FC_01_Current_Values_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Current_Values_Temperature) {
                setExceedThresholdFC_01_Current_Values_Temperature(FC_01_Current_Values_TemperatureValue >= highValue || FC_01_Current_Values_TemperatureValue <= lowValue);
            }
        }, [FC_01_Current_Values_Temperature, FC_01_Current_Values_Temperature_High, FC_01_Current_Values_Temperature_Low, maintainFC_01_Current_Values_Temperature]);
        
          
          
              const handleInputChangeFC_01_Current_Values_Temperature = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Current_Values_Temperature(newValue);
              };
          
              const handleInputChange2FC_01_Current_Values_Temperature = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Current_Values_Temperature(newValue2);
              };
              const ChangeMaintainFC_01_Current_Values_Temperature = async () => {
                  try {
                      const newValue = !maintainFC_01_Current_Values_Temperature;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Temperature_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Temperature(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Static_Pressure, setFC_01_Current_Values_Static_Pressure] = useState<string | null>(null);
          const [inputValueFC_01_Current_Values_Static_Pressure, setInputValueFC_01_Current_Values_Static_Pressure] = useState<any>();
          const [inputValue2FC_01_Current_Values_Static_Pressure, setInputValue2FC_01_Current_Values_Static_Pressure] = useState<any>();
          const [FC_01_Current_Values_Static_Pressure_High, setFC_01_Current_Values_Static_Pressure_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Static_Pressure_Low, setFC_01_Current_Values_Static_Pressure_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Static_Pressure, setExceedThresholdFC_01_Current_Values_Static_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Static_Pressure, setMaintainFC_01_Current_Values_Static_Pressure] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_01_Current_Values_Static_PressureValue = parseFloat(FC_01_Current_Values_Static_Pressure as any);
            const highValue = FC_01_Current_Values_Static_Pressure_High ?? NaN;
            const lowValue = FC_01_Current_Values_Static_Pressure_Low ?? NaN;
        
            if (!isNaN(FC_01_Current_Values_Static_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Current_Values_Static_Pressure) {
                setExceedThresholdFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_PressureValue >= highValue || FC_01_Current_Values_Static_PressureValue <= lowValue);
            }
        }, [FC_01_Current_Values_Static_Pressure, FC_01_Current_Values_Static_Pressure_High, FC_01_Current_Values_Static_Pressure_Low, maintainFC_01_Current_Values_Static_Pressure]);
        
          
              const handleInputChangeFC_01_Current_Values_Static_Pressure = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Current_Values_Static_Pressure(newValue);
              };
          
              const handleInputChange2FC_01_Current_Values_Static_Pressure = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Current_Values_Static_Pressure(newValue2);
              };
              const ChangeMaintainFC_01_Current_Values_Static_Pressure = async () => {
                  try {
                      const newValue = !maintainFC_01_Current_Values_Static_Pressure;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Static_Pressure_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Static_Pressure(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Accumulated_Values_Volume, setFC_01_Accumulated_Values_Volume] = useState<string | null>(null);
          const [inputValueFC_01_Accumulated_Values_Volume, setInputValueFC_01_Accumulated_Values_Volume] = useState<any>();
          const [inputValue2FC_01_Accumulated_Values_Volume, setInputValue2FC_01_Accumulated_Values_Volume] = useState<any>();
          const [FC_01_Accumulated_Values_Volume_High, setFC_01_Accumulated_Values_Volume_High] = useState<number | null>(null);
          const [FC_01_Accumulated_Values_Volume_Low, setFC_01_Accumulated_Values_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Accumulated_Values_Volume, setExceedThresholdFC_01_Accumulated_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Accumulated_Values_Volume, setMaintainFC_01_Accumulated_Values_Volume] = useState<boolean>(false);
          
          useEffect(() => {
            const FC_01_Accumulated_Values_VolumeValue = parseFloat(FC_01_Accumulated_Values_Volume as any);
            const highValue = FC_01_Accumulated_Values_Volume_High ?? NaN;
            const lowValue = FC_01_Accumulated_Values_Volume_Low ?? NaN;
        
            if (!isNaN(FC_01_Accumulated_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Accumulated_Values_Volume) {
                setExceedThresholdFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_VolumeValue >= highValue || FC_01_Accumulated_Values_VolumeValue <= lowValue);
            }
        }, [FC_01_Accumulated_Values_Volume, FC_01_Accumulated_Values_Volume_High, FC_01_Accumulated_Values_Volume_Low, maintainFC_01_Accumulated_Values_Volume]);
        
          
              const handleInputChangeFC_01_Accumulated_Values_Volume = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Accumulated_Values_Volume(newValue);
              };
          
              const handleInputChange2FC_01_Accumulated_Values_Volume = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Accumulated_Values_Volume(newValue2);
              };
              const ChangeMaintainFC_01_Accumulated_Values_Volume = async () => {
                  try {
                      const newValue = !maintainFC_01_Accumulated_Values_Volume;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Accumulated_Values_Volume_Maintain: newValue }
                      );
                      setMaintainFC_01_Accumulated_Values_Volume(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Flow_Rate, setFC_01_Current_Values_Flow_Rate] = useState<string | null>(null);
          const [inputValueFC_01_Current_Values_Flow_Rate, setInputValueFC_01_Current_Values_Flow_Rate] = useState<any>();
          const [inputValue2FC_01_Current_Values_Flow_Rate, setInputValue2FC_01_Current_Values_Flow_Rate] = useState<any>();
          const [FC_01_Current_Values_Flow_Rate_High, setFC_01_Current_Values_Flow_Rate_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Flow_Rate_Low, setFC_01_Current_Values_Flow_Rate_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Flow_Rate, setExceedThresholdFC_01_Current_Values_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Flow_Rate, setMaintainFC_01_Current_Values_Flow_Rate] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_01_Current_Values_Flow_RateValue = parseFloat(FC_01_Current_Values_Flow_Rate as any);
            const highValue = FC_01_Current_Values_Flow_Rate_High ?? NaN;
            const lowValue = FC_01_Current_Values_Flow_Rate_Low ?? NaN;
        
            if (!isNaN(FC_01_Current_Values_Flow_RateValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Current_Values_Flow_Rate) {
                setExceedThresholdFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_RateValue >= highValue || FC_01_Current_Values_Flow_RateValue <= lowValue);
            }
        }, [FC_01_Current_Values_Flow_Rate, FC_01_Current_Values_Flow_Rate_High, FC_01_Current_Values_Flow_Rate_Low, maintainFC_01_Current_Values_Flow_Rate]);
        
          
              const handleInputChangeFC_01_Current_Values_Flow_Rate = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_01_Current_Values_Flow_Rate(newValue);
              };
          
              const handleInputChange2FC_01_Current_Values_Flow_Rate = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_01_Current_Values_Flow_Rate(newValue2);
              };
              const ChangeMaintainFC_01_Current_Values_Flow_Rate = async () => {
                  try {
                      const newValue = !maintainFC_01_Current_Values_Flow_Rate;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Flow_Rate_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Flow_Rate(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
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
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
                );
                setMaintainEVC_02_Remain_Battery_Service_Life(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

        const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);
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
                        `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                        { EVC_02_Temperature_Maintain: newValue }
                    );
                    setMaintainEVC_02_Temperature(newValue);
                    
                } catch (error) {}
            };
    
    
        // =================================================================================================================== 

            // =================================================================================================================== 

    const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
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
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { EVC_02_Pressure_Maintain: newValue }
                );
                setMaintainEVC_02_Pressure(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 


    const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
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
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
                );
                setMaintainEVC_02_Volume_at_Base_Condition(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
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
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { EVC_02_Vm_of_Last_Day_Maintain: newValue }
            );
            setMaintainEVC_02_Vm_of_Last_Day(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 


const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
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
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Volume_at_Measurement_Condition(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 

    // =================================================================================================================== 

const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
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
            `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                        { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
                    );
                    setMaintainEVC_02_Flow_at_Measurement_Condition(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
        
        const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
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
                        `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                        { EVC_02_Vb_of_Current_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vb_of_Current_Day(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
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
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { EVC_02_Vm_of_Current_Day_Maintain: newValue }
                );
                setMaintainEVC_02_Vm_of_Current_Day(newValue);
                
            } catch (error) {}
        };
        
        
        // =================================================================================================================== 
        

            // =================================================================================================================== 
        
            const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
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
                        `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                        { EVC_02_Vb_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vb_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 



            // =================================================================================================================== 
        
            const [FC_01_Current_Values_Uncorrected_Flow_Rate, setFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<string | null>(null);
            const [inputValueFC_01_Current_Values_Uncorrected_Flow_Rate, setInputValueFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
            const [inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate, setInputValue2FC_01_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
            const [FC_01_Current_Values_Uncorrected_Flow_Rate_High, setFC_01_Current_Values_Uncorrected_Flow_Rate_High] = useState<number | null>(null);
            const [FC_01_Current_Values_Uncorrected_Flow_Rate_Low, setFC_01_Current_Values_Uncorrected_Flow_Rate_Low] = useState<number | null>(null);
            const [exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate, setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainFC_01_Current_Values_Uncorrected_Flow_Rate, setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<boolean>(false);
            
            
            useEffect(() => {
                const FC_01_Current_Values_Uncorrected_Flow_RateValue = parseFloat(FC_01_Current_Values_Uncorrected_Flow_Rate as any);
                const highValue = FC_01_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
                const lowValue = FC_01_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;
            
                if (!isNaN(FC_01_Current_Values_Uncorrected_Flow_RateValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Current_Values_Uncorrected_Flow_Rate) {
                    setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_RateValue >= highValue || FC_01_Current_Values_Uncorrected_Flow_RateValue <= lowValue);
                }
            }, [FC_01_Current_Values_Uncorrected_Flow_Rate, FC_01_Current_Values_Uncorrected_Flow_Rate_High, FC_01_Current_Values_Uncorrected_Flow_Rate_Low, maintainFC_01_Current_Values_Uncorrected_Flow_Rate]);
            
            
            const handleInputChangeFC_01_Current_Values_Uncorrected_Flow_Rate = (event: any) => {
                const newValue = event.target.value;
                setInputValueFC_01_Current_Values_Uncorrected_Flow_Rate(newValue);
            };
            
            const handleInputChange2FC_01_Current_Values_Uncorrected_Flow_Rate = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2FC_01_Current_Values_Uncorrected_Flow_Rate(newValue2);
            };
            const ChangeMaintainFC_01_Current_Values_Uncorrected_Flow_Rate = async () => {
                try {
                    const newValue = !maintainFC_01_Current_Values_Uncorrected_Flow_Rate;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                        { FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain: newValue }
                    );
                    setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 


                   // =================================================================================================================== 
        
                   const [FC_01_Today_Values_Volume, setFC_01_Today_Values_Volume] = useState<string | null>(null);
                   const [inputValueFC_01_Today_Values_Volume, setInputValueFC_01_Today_Values_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Volume, setInputValue2FC_01_Today_Values_Volume] = useState<any>();
                   const [FC_01_Today_Values_Volume_High, setFC_01_Today_Values_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Volume_Low, setFC_01_Today_Values_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Volume, setExceedThresholdFC_01_Today_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Volume, setMaintainFC_01_Today_Values_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                    const FC_01_Today_Values_VolumeValue = parseFloat(FC_01_Today_Values_Volume as any);
                    const highValue = FC_01_Today_Values_Volume_High ?? NaN;
                    const lowValue = FC_01_Today_Values_Volume_Low ?? NaN;
                
                    if (!isNaN(FC_01_Today_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Today_Values_Volume) {
                        setExceedThresholdFC_01_Today_Values_Volume(FC_01_Today_Values_VolumeValue >= highValue || FC_01_Today_Values_VolumeValue <= lowValue);
                    }
                }, [FC_01_Today_Values_Volume, FC_01_Today_Values_Volume_High, FC_01_Today_Values_Volume_Low, maintainFC_01_Today_Values_Volume]);
                
                   
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
                               `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                               { FC_01_Today_Values_Volume_Maintain: newValue }
                           );
                           setMaintainFC_01_Today_Values_Volume(newValue);
                           
                       } catch (error) {}
                   };
                   
                   
                   // =================================================================================================================== 

                   // =================================================================================================================== 
        
                   const [FC_01_Today_Values_Uncorrected_Volume, setFC_01_Today_Values_Uncorrected_Volume] = useState<string | null>(null);
                   const [inputValueFC_01_Today_Values_Uncorrected_Volume, setInputValueFC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Uncorrected_Volume, setInputValue2FC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [FC_01_Today_Values_Uncorrected_Volume_High, setFC_01_Today_Values_Uncorrected_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Uncorrected_Volume_Low, setFC_01_Today_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Uncorrected_Volume, setExceedThresholdFC_01_Today_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Uncorrected_Volume, setMaintainFC_01_Today_Values_Uncorrected_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                    const FC_01_Today_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume as any);
                    const highValue = FC_01_Today_Values_Uncorrected_Volume_High ?? NaN;
                    const lowValue = FC_01_Today_Values_Uncorrected_Volume_Low ?? NaN;
                
                    if (!isNaN(FC_01_Today_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Today_Values_Uncorrected_Volume) {
                        setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_VolumeValue >= highValue || FC_01_Today_Values_Uncorrected_VolumeValue <= lowValue);
                    }
                }, [FC_01_Today_Values_Uncorrected_Volume, FC_01_Today_Values_Uncorrected_Volume_High, FC_01_Today_Values_Uncorrected_Volume_Low, maintainFC_01_Today_Values_Uncorrected_Volume]);
                
                   
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
                               `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                               { FC_01_Today_Values_Uncorrected_Volume_Maintain: newValue }
                           );
                           setMaintainFC_01_Today_Values_Uncorrected_Volume(newValue);
                           
                       } catch (error) {}
                   };
                   
                   
                   // =================================================================================================================== 

                           // =================================================================================================================== 
        
                           const [FC_01_Yesterday_Values_Volume, setFC_01_Yesterday_Values_Volume] = useState<string | null>(null);
                           const [inputValueFC_01_Yesterday_Values_Volume, setInputValueFC_01_Yesterday_Values_Volume] = useState<any>();
                           const [inputValue2FC_01_Yesterday_Values_Volume, setInputValue2FC_01_Yesterday_Values_Volume] = useState<any>();
                           const [FC_01_Yesterday_Values_Volume_High, setFC_01_Yesterday_Values_Volume_High] = useState<number | null>(null);
                           const [FC_01_Yesterday_Values_Volume_Low, setFC_01_Yesterday_Values_Volume_Low] = useState<number | null>(null);
                           const [exceedThresholdFC_01_Yesterday_Values_Volume, setExceedThresholdFC_01_Yesterday_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                           
                           const [maintainFC_01_Yesterday_Values_Volume, setMaintainFC_01_Yesterday_Values_Volume] = useState<boolean>(false);
                           
                           
                           useEffect(() => {
                            const FC_01_Yesterday_Values_VolumeValue = parseFloat(FC_01_Yesterday_Values_Volume as any);
                            const highValue = FC_01_Yesterday_Values_Volume_High ?? NaN;
                            const lowValue = FC_01_Yesterday_Values_Volume_Low ?? NaN;
                        
                            if (!isNaN(FC_01_Yesterday_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Yesterday_Values_Volume) {
                                setExceedThresholdFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_VolumeValue >= highValue || FC_01_Yesterday_Values_VolumeValue <= lowValue);
                            }
                        }, [FC_01_Yesterday_Values_Volume, FC_01_Yesterday_Values_Volume_High, FC_01_Yesterday_Values_Volume_Low, maintainFC_01_Yesterday_Values_Volume]);
                        
                           
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
                                       `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                                       { FC_01_Yesterday_Values_Volume_Maintain: newValue }
                                   );
                                   setMaintainFC_01_Yesterday_Values_Volume(newValue);
                                   
                               } catch (error) {}
                           };
                           
                           
                           // =================================================================================================================== 

                           
                                     // =================================================================================================================== 
        
                                     const [FC_01_Yesterday_Values_Uncorrected_Volume, setFC_01_Yesterday_Values_Uncorrected_Volume] = useState<string | null>(null);
                                     const [inputValueFC_01_Yesterday_Values_Uncorrected_Volume, setInputValueFC_01_Yesterday_Values_Uncorrected_Volume] = useState<any>();
                                     const [inputValue2FC_01_Yesterday_Values_Uncorrected_Volume, setInputValue2FC_01_Yesterday_Values_Uncorrected_Volume] = useState<any>();
                                     const [FC_01_Yesterday_Values_Uncorrected_Volume_High, setFC_01_Yesterday_Values_Uncorrected_Volume_High] = useState<number | null>(null);
                                     const [FC_01_Yesterday_Values_Uncorrected_Volume_Low, setFC_01_Yesterday_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
                                     const [exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume, setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                                     
                                     const [maintainFC_01_Yesterday_Values_Uncorrected_Volume, setMaintainFC_01_Yesterday_Values_Uncorrected_Volume] = useState<boolean>(false);
                                     
                                     
                                     useEffect(() => {
                                        const FC_01_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume as any);
                                        const highValue = FC_01_Yesterday_Values_Uncorrected_Volume_High ?? NaN;
                                        const lowValue = FC_01_Yesterday_Values_Uncorrected_Volume_Low ?? NaN;
                                    
                                        if (!isNaN(FC_01_Yesterday_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Yesterday_Values_Uncorrected_Volume) {
                                            setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_VolumeValue >= highValue || FC_01_Yesterday_Values_Uncorrected_VolumeValue <= lowValue);
                                        }
                                    }, [FC_01_Yesterday_Values_Uncorrected_Volume, FC_01_Yesterday_Values_Uncorrected_Volume_High, FC_01_Yesterday_Values_Uncorrected_Volume_Low, maintainFC_01_Yesterday_Values_Uncorrected_Volume]);
                                    
                                     
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
                                                 `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                                                 { FC_01_Yesterday_Values_Uncorrected_Volume_Maintain: newValue }
                                             );
                                             setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(newValue);
                                             
                                         } catch (error) {}
                                     };
                                     
                                         // =================================================================================================================== 
        
                               const [PT_1103, setPT_1103] = useState<string | null>(null);
                               const [inputValuePT_1103, setInputValuePT_1103] = useState<any>();
                               const [inputValue2PT_1103, setInputValue2PT_1103] = useState<any>();
                               const [PT_1103_High, setPT_1103_High] = useState<number | null>(null);
                               const [PT_1103_Low, setPT_1103_Low] = useState<number | null>(null);
                               const [exceedThresholdPT_1103, setExceedThresholdPT_1103] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                               
                               const [maintainPT_1103, setMaintainPT_1103] = useState<boolean>(false);
                               
                               
                               useEffect(() => {
                                const PT_1103Value = parseFloat(PT_1103 as any);
                                const highValue = PT_1103_High ?? NaN;
                                const lowValue = PT_1103_Low ?? NaN;
                            
                                if (!isNaN(PT_1103Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_1103) {
                                    setExceedThresholdPT_1103(PT_1103Value >= highValue || PT_1103Value <= lowValue);
                                }
                            }, [PT_1103, PT_1103_High, PT_1103_Low, maintainPT_1103]);
                            
                               
                               const handleInputChangePT_1103 = (event: any) => {
                                   const newValue = event.target.value;
                                   setInputValuePT_1103(newValue);
                               };
                               
                               const handleInputChange2PT_1103 = (event: any) => {
                                   const newValue2 = event.target.value;
                                   setInputValue2PT_1103(newValue2);
                               };
                               const ChangeMaintainPT_1103 = async () => {
                                   try {
                                       const newValue = !maintainPT_1103;
                                       await httpApi.post(
                                           `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                                           { PT_1103_Maintain: newValue }
                                       );
                                       setMaintainPT_1103(newValue);
                                       
                                   } catch (error) {}
                               };
                               
                               
                               // =================================================================================================================== 

                               const [Mode_ATS, setMode_ATS] = useState<string | null>(null);
                               const [inputValueMode_ATS, setInputValueMode_ATS] = useState<any>();
                               const [inputValue2Mode_ATS, setInputValue2Mode_ATS] = useState<any>();
                               const [Mode_ATS_High, setMode_ATS_High] = useState<number | null>(null);
                               const [Mode_ATS_Low, setMode_ATS_Low] = useState<number | null>(null);
                               const [exceedThresholdMode_ATS, setExceedThresholdMode_ATS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                               
                               const [maintainMode_ATS, setMaintainMode_ATS] = useState<boolean>(false);
                               
                               
                               useEffect(() => {
                                const Mode_ATSValue = parseFloat(Mode_ATS as any);
                                const highValue = Mode_ATS_High ?? NaN;
                                const lowValue = Mode_ATS_Low ?? NaN;
                            
                                if (!isNaN(Mode_ATSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainMode_ATS) {
                                    setExceedThresholdMode_ATS(Mode_ATSValue >= highValue || Mode_ATSValue <= lowValue);
                                }
                            }, [Mode_ATS, Mode_ATS_High, Mode_ATS_Low, maintainMode_ATS]);
                            
                               
                               const handleInputChangeMode_ATS = (event: any) => {
                                   const newValue = event.target.value;
                                   setInputValueMode_ATS(newValue);
                               };
                               
                               const handleInputChange2Mode_ATS = (event: any) => {
                                   const newValue2 = event.target.value;
                                   setInputValue2Mode_ATS(newValue2);
                               };
                               const ChangeMaintainMode_ATS = async () => {
                                   try {
                                       const newValue = !maintainMode_ATS;
                                       await httpApi.post(
                                           `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                                           { Mode_ATS_Maintain: newValue }
                                       );
                                       setMaintainMode_ATS(newValue);
                                       
                                   } catch (error) {}
                               };
                               
                               
                               // =================================================================================================================== 

                               const [ATS_Auto_Man, setATS_Auto_Man] = useState<string | null>(null);
                               const [inputValueATS_Auto_Man, setInputValueATS_Auto_Man] = useState<any>();
                               const [inputValue2ATS_Auto_Man, setInputValue2ATS_Auto_Man] = useState<any>();
                               const [ATS_Auto_Man_High, setATS_Auto_Man_High] = useState<number | null>(null);
                               const [ATS_Auto_Man_Low, setATS_Auto_Man_Low] = useState<number | null>(null);
                               const [exceedThresholdATS_Auto_Man, setExceedThresholdATS_Auto_Man] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                               const [maintainATS_Auto_Man, setMaintainATS_Auto_Man] = useState<boolean>(false);
                               
                               
                               useEffect(() => {
                                const ATS_Auto_ManValue = parseFloat(ATS_Auto_Man as any);
                                const highValue = ATS_Auto_Man_High ?? NaN;
                                const lowValue = ATS_Auto_Man_Low ?? NaN;
                            
                                if (!isNaN(ATS_Auto_ManValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainATS_Auto_Man) {
                                    setExceedThresholdATS_Auto_Man(ATS_Auto_ManValue >= highValue || ATS_Auto_ManValue <= lowValue);
                                }
                            }, [ATS_Auto_Man, ATS_Auto_Man_High, ATS_Auto_Man_Low, maintainATS_Auto_Man]);
                            
                               
                               const handleInputChangeATS_Auto_Man = (event: any) => {
                                   const newValue = event.target.value;
                                   setInputValueATS_Auto_Man(newValue);
                               };
                               
                               const handleInputChange2ATS_Auto_Man = (event: any) => {
                                   const newValue2 = event.target.value;
                                   setInputValue2ATS_Auto_Man(newValue2);
                               };
                               const ChangeMaintainATS_Auto_Man = async () => {
                                   try {
                                       const newValue = !maintainATS_Auto_Man;
                                       await httpApi.post(
                                           `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                                           { ATS_Auto_Man_Maintain: newValue }
                                       );
                                       setMaintainATS_Auto_Man(newValue);
                                       
                                   } catch (error) {}
                               };
                               
                               
                               // =================================================================================================================== 
          // =================================================================================================================== 

          const [FC_01_Conn_STT, setFC_01_Conn_STT] = useState<string | null>(null);
          const [inputValueFC_01_Conn_STT, setInputValueFC_01_Conn_STT] = useState<any>();
          const [inputValue2FC_01_Conn_STT, setInputValue2FC_01_Conn_STT] = useState<any>();
          const [FC_01_Conn_STT_High, setFC_01_Conn_STT_High] = useState<number | null>(null);
          const [FC_01_Conn_STT_Low, setFC_01_Conn_STT_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Conn_STT, setExceedThresholdFC_01_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Conn_STT, setMaintainFC_01_Conn_STT] = useState<boolean>(false);
          
          
          useEffect(() => {
           const FC_01_Conn_STTValue = parseFloat(FC_01_Conn_STT as any);
           const highValue = FC_01_Conn_STT_High ?? NaN;
           const lowValue = FC_01_Conn_STT_Low ?? NaN;
       
           if (!isNaN(FC_01_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_01_Conn_STT) {
               setExceedThresholdFC_01_Conn_STT(FC_01_Conn_STTValue >= highValue || FC_01_Conn_STTValue <= lowValue);
           }
       }, [FC_01_Conn_STT, FC_01_Conn_STT_High, FC_01_Conn_STT_Low, maintainFC_01_Conn_STT]);
       
          
          const handleInputChangeFC_01_Conn_STT = (event: any) => {
              const newValue = event.target.value;
              setInputValueFC_01_Conn_STT(newValue);
          };
          
          const handleInputChange2FC_01_Conn_STT = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2FC_01_Conn_STT(newValue2);
          };
          const ChangeMaintainFC_01_Conn_STT = async () => {
              try {
                  const newValue = !maintainFC_01_Conn_STT;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                      { FC_01_Conn_STT_Maintain: newValue }
                  );
                  setMaintainFC_01_Conn_STT(newValue);
                  
              } catch (error) {}
          };
          
          
          // =================================================================================================================== 
          // =================================================================================================================== 

          const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);
          const [inputValueEVC_02_Conn_STT, setInputValueEVC_02_Conn_STT] = useState<any>();
          const [inputValue2EVC_02_Conn_STT, setInputValue2EVC_02_Conn_STT] = useState<any>();
          const [EVC_02_Conn_STT_High, setEVC_02_Conn_STT_High] = useState<number | null>(null);
          const [EVC_02_Conn_STT_Low, setEVC_02_Conn_STT_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_02_Conn_STT, setExceedThresholdEVC_02_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_02_Conn_STT, setMaintainEVC_02_Conn_STT] = useState<boolean>(false);
          
          
          useEffect(() => {
           const EVC_02_Conn_STTValue = parseFloat(EVC_02_Conn_STT as any);
           const highValue = EVC_02_Conn_STT_High ?? NaN;
           const lowValue = EVC_02_Conn_STT_Low ?? NaN;
       
           if (!isNaN(EVC_02_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Conn_STT) {
               setExceedThresholdEVC_02_Conn_STT(EVC_02_Conn_STTValue >= highValue || EVC_02_Conn_STTValue <= lowValue);
           }
       }, [EVC_02_Conn_STT, EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low, maintainEVC_02_Conn_STT]);
       
          
          const handleInputChangeEVC_02_Conn_STT = (event: any) => {
              const newValue = event.target.value;
              setInputValueEVC_02_Conn_STT(newValue);
          };
          
          const handleInputChange2EVC_02_Conn_STT = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2EVC_02_Conn_STT(newValue2);
          };
          const ChangeMaintainEVC_02_Conn_STT = async () => {
              try {
                  const newValue = !maintainEVC_02_Conn_STT;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                      { EVC_02_Conn_STT_Maintain: newValue }
                  );
                  setMaintainEVC_02_Conn_STT(newValue);
                  
              } catch (error) {}
          };
          
          
          // =================================================================================================================== 

                                     // =================================================================================================================== 

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { FC_01_Battery_Voltage_High: inputValueFC_01_Battery_Voltage,FC_01_Battery_Voltage_Low:inputValue2FC_01_Battery_Voltage,
                    FC_01_System_Voltage_High: inputValueFC_01_System_Voltage,FC_01_System_Voltage_Low:inputValue2FC_01_System_Voltage,
                    FC_01_Lithium_Battery_Status_High: inputValueFC_01_Lithium_Battery_Status,FC_01_Lithium_Battery_Status_Low:inputValue2FC_01_Lithium_Battery_Status,


                    FC_01_Charger_Voltage_High: inputValueFC_01_Charger_Voltage,FC_01_Charger_Voltage_Low:inputValue2FC_01_Charger_Voltage,
                    FC_01_Accumulated_Values_Uncorrected_Volume_High: inputValueFC_01_Accumulated_Values_Uncorrected_Volume,FC_01_Accumulated_Values_Uncorrected_Volume_Low:inputValue2FC_01_Accumulated_Values_Uncorrected_Volume,

                    FC_01_Accumulated_Values_Volume_High: inputValueFC_01_Accumulated_Values_Volume,FC_01_Accumulated_Values_Volume_Low:inputValue2FC_01_Accumulated_Values_Volume,
                    FC_01_Current_Values_Static_Pressure_High: inputValueFC_01_Current_Values_Static_Pressure,FC_01_Current_Values_Static_Pressure_Low:inputValue2FC_01_Current_Values_Static_Pressure,
                    FC_01_Current_Values_Temperature_High: inputValueFC_01_Current_Values_Temperature,FC_01_Current_Values_Temperature_Low:inputValue2FC_01_Current_Values_Temperature,


                    EVC_02_Remain_Battery_Service_Life_High: inputValueEVC_02_Remain_Battery_Service_Life,EVC_02_Remain_Battery_Service_Life_Low:inputValue2EVC_02_Remain_Battery_Service_Life,
                    FC_01_Current_Values_Flow_Rate_High: inputValueFC_01_Current_Values_Flow_Rate,FC_01_Current_Values_Flow_Rate_Low:inputValue2FC_01_Current_Values_Flow_Rate,


                    EVC_02_Temperature_High: inputValueEVC_02_Temperature,EVC_02_Temperature_Low:inputValue2EVC_02_Temperature,
                    EVC_02_Pressure_High: inputValueEVC_02_Pressure,EVC_02_Pressure_Low:inputValue2EVC_02_Pressure,

                    EVC_02_Volume_at_Base_Condition_High: inputValueEVC_02_Volume_at_Base_Condition,EVC_02_Volume_at_Base_Condition_Low:inputValue2EVC_02_Volume_at_Base_Condition,
                    EVC_02_Vm_of_Last_Day_High: inputValueEVC_02_Vm_of_Last_Day,EVC_02_Vm_of_Last_Day_Low:inputValue2EVC_02_Vm_of_Last_Day,

                    EVC_02_Volume_at_Measurement_Condition_High: inputValueEVC_02_Volume_at_Measurement_Condition,EVC_02_Volume_at_Measurement_Condition_Low:inputValue2EVC_02_Volume_at_Measurement_Condition,
                    EVC_02_Flow_at_Base_Condition_High: inputValueEVC_02_Flow_at_Base_Condition,EVC_02_Flow_at_Base_Condition_Low:inputValue2EVC_02_Flow_at_Base_Condition,


                    EVC_02_Flow_at_Measurement_Condition_High: inputValueEVC_02_Flow_at_Measurement_Condition,EVC_02_Flow_at_Measurement_Condition_Low:inputValue2EVC_02_Flow_at_Measurement_Condition,
                    EVC_02_Vb_of_Current_Day_High: inputValueEVC_02_Vb_of_Current_Day,EVC_02_Vb_of_Current_Day_Low:inputValue2EVC_02_Vb_of_Current_Day,
                    EVC_02_Vm_of_Current_Day_High: inputValueEVC_02_Vm_of_Current_Day,EVC_02_Vm_of_Current_Day_Low:inputValue2EVC_02_Vm_of_Current_Day,

                    EVC_02_Vb_of_Last_Day_High: inputValueEVC_02_Vb_of_Last_Day,EVC_02_Vb_of_Last_Day_Low:inputValue2EVC_02_Vb_of_Last_Day,

                    FC_01_Current_Values_Uncorrected_Flow_Rate_High: inputValueFC_01_Current_Values_Uncorrected_Flow_Rate,FC_01_Current_Values_Uncorrected_Flow_Rate_Low:inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate,


                    FC_01_Today_Values_Volume_High: inputValueFC_01_Today_Values_Volume,FC_01_Today_Values_Volume_Low:inputValue2FC_01_Today_Values_Volume,
                    FC_01_Today_Values_Uncorrected_Volume_High: inputValueFC_01_Today_Values_Uncorrected_Volume,FC_01_Today_Values_Uncorrected_Volume_Low:inputValue2FC_01_Today_Values_Uncorrected_Volume,
                    FC_01_Yesterday_Values_Volume_High: inputValueFC_01_Yesterday_Values_Volume,FC_01_Yesterday_Values_Volume_Low:inputValue2FC_01_Yesterday_Values_Volume,

                    FC_01_Yesterday_Values_Uncorrected_Volume_High: inputValueFC_01_Yesterday_Values_Uncorrected_Volume,FC_01_Yesterday_Values_Uncorrected_Volume_Low:inputValue2FC_01_Yesterday_Values_Uncorrected_Volume,
                    

                    EVC_02_Conn_STT_High: inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,



                    PT_1103_High: inputValuePT_1103,PT_1103_Low:inputValue2PT_1103,
                    Mode_ATS_High: inputValueMode_ATS,Mode_ATS_Low:inputValue2Mode_ATS,
                    ATS_Auto_Man_High: inputValueATS_Auto_Man,ATS_Auto_Man_Low:inputValue2ATS_Auto_Man,

                    FC_01_Conn_STT_High: inputValueFC_01_Conn_STT,FC_01_Conn_STT_Low:inputValue2FC_01_Conn_STT,
                    
                    
                    IOT_Gateway_Phone: inputGetwayPhone,

                    PCV_01: inputPCV_01,
                    PCV_02: inputPCV_02,

                    PSV_01: inputPSV_01,


                    EVC_01_Battery_Expiration_Date: timeEVC_01,
                    EVC_01_Battery_Installation_Date: timeEVC_02,
                    EVC_02_Battery_Expiration_Date: timeEVC_03,
                    EVC_02_Battery_Installation_Date: timeEVC_04,
                }
            );

            setPSV_01(inputPSV_01)
            setPCV_02(inputPCV_02)
            setPCV_01(inputPCV_01)
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setFC_01_Lithium_Battery_Status_High(inputValueFC_01_Lithium_Battery_Status);
            setFC_01_Lithium_Battery_Status_Low(inputValue2FC_01_Lithium_Battery_Status);

            setFC_01_Battery_Voltage_High(inputValueFC_01_Battery_Voltage);
            setFC_01_Battery_Voltage_Low(inputValue2FC_01_Battery_Voltage);

            setFC_01_System_Voltage_High(inputValueFC_01_System_Voltage);
            setFC_01_System_Voltage_Low(inputValue2FC_01_System_Voltage);

            setFC_01_System_Voltage_High(inputValueFC_01_System_Voltage);
            setFC_01_System_Voltage_Low(inputValue2FC_01_System_Voltage);

            setFC_01_Charger_Voltage_High(inputValueFC_01_Charger_Voltage);
            setFC_01_Charger_Voltage_Low(inputValue2FC_01_Charger_Voltage);

           

            setFC_01_Accumulated_Values_Uncorrected_Volume_High(inputValueFC_01_Accumulated_Values_Uncorrected_Volume);
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(inputValue2FC_01_Accumulated_Values_Uncorrected_Volume);


            setFC_01_Accumulated_Values_Volume_High(inputValueFC_01_Accumulated_Values_Volume);
            setFC_01_Accumulated_Values_Volume_Low(inputValue2FC_01_Accumulated_Values_Volume);

            setFC_01_Current_Values_Static_Pressure_High(inputValueFC_01_Current_Values_Static_Pressure);
            setFC_01_Current_Values_Static_Pressure_Low(inputValue2FC_01_Current_Values_Static_Pressure);

            setFC_01_Current_Values_Temperature_High(inputValueFC_01_Current_Values_Temperature);
            setFC_01_Current_Values_Temperature_Low(inputValue2FC_01_Current_Values_Temperature);

            setEVC_02_Remain_Battery_Service_Life_High(inputValueEVC_02_Remain_Battery_Service_Life);
            setEVC_02_Remain_Battery_Service_Life_Low(inputValue2EVC_02_Remain_Battery_Service_Life);

            setFC_01_Current_Values_Flow_Rate_High(inputValueFC_01_Current_Values_Flow_Rate);
            setFC_01_Current_Values_Flow_Rate_Low(inputValue2FC_01_Current_Values_Flow_Rate);


            setEVC_02_Pressure_High(inputValueEVC_02_Pressure);
            setEVC_02_Pressure_Low(inputValue2EVC_02_Pressure);

            setEVC_02_Temperature_High(inputValueEVC_02_Temperature);
            setEVC_02_Temperature_Low(inputValue2EVC_02_Temperature);

            setEVC_02_Volume_at_Base_Condition_High(inputValueEVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_Low(inputValue2EVC_02_Volume_at_Base_Condition);

            setEVC_02_Vm_of_Last_Day_High(inputValueEVC_02_Vm_of_Last_Day);
            setEVC_02_Vm_of_Last_Day_Low(inputValue2EVC_02_Vm_of_Last_Day);



            setEVC_02_Flow_at_Measurement_Condition_High(inputValueEVC_02_Flow_at_Measurement_Condition);
            setEVC_02_Flow_at_Measurement_Condition_Low(inputValue2EVC_02_Flow_at_Measurement_Condition);

            setEVC_02_Vb_of_Current_Day_High(inputValueEVC_02_Vb_of_Current_Day);
            setEVC_02_Vb_of_Current_Day_Low(inputValue2EVC_02_Vb_of_Current_Day);

            setEVC_02_Vm_of_Current_Day_High(inputValueEVC_02_Vm_of_Current_Day);
            setEVC_02_Vm_of_Current_Day_Low(inputValue2EVC_02_Vm_of_Current_Day);

            setEVC_02_Vb_of_Last_Day_High(inputValueEVC_02_Vb_of_Last_Day);
            setEVC_02_Vb_of_Last_Day_Low(inputValue2EVC_02_Vb_of_Last_Day);

            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(inputValueFC_01_Current_Values_Uncorrected_Flow_Rate);
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate);


            setFC_01_Today_Values_Volume_High(inputValueFC_01_Today_Values_Volume);
            setFC_01_Today_Values_Volume_Low(inputValue2FC_01_Today_Values_Volume);

            setFC_01_Today_Values_Uncorrected_Volume_High(inputValueFC_01_Today_Values_Uncorrected_Volume);
            setFC_01_Today_Values_Uncorrected_Volume_Low(inputValue2FC_01_Today_Values_Uncorrected_Volume);

            setFC_01_Yesterday_Values_Volume_High(inputValueFC_01_Yesterday_Values_Volume);
            setFC_01_Yesterday_Values_Volume_Low(inputValue2FC_01_Yesterday_Values_Volume);

            setFC_01_Yesterday_Values_Uncorrected_Volume_High(inputValueFC_01_Yesterday_Values_Uncorrected_Volume);
            setFC_01_Yesterday_Values_Uncorrected_Volume_Low(inputValue2FC_01_Yesterday_Values_Uncorrected_Volume);


            setFC_01_Conn_STT_High(inputValueFC_01_Conn_STT);
            setFC_01_Conn_STT_Low(inputValue2FC_01_Conn_STT);

            setEVC_02_Conn_STT_High(inputValueEVC_02_Conn_STT);
            setEVC_02_Conn_STT_Low(inputValue2EVC_02_Conn_STT);

            setPT_1103_High(inputValuePT_1103);
            setPT_1103_Low(inputValue2PT_1103);

            setMode_ATS_High(inputValueMode_ATS);
            setMode_ATS_Low(inputValue2Mode_ATS);

            setATS_Auto_Man_High(inputValueATS_Auto_Man);
            setATS_Auto_Man_Low(inputValue2ATS_Auto_Man);

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
        setInputValueFC_01_Lithium_Battery_Status(FC_01_Lithium_Battery_Status_High); 
        setInputValue2FC_01_Lithium_Battery_Status(FC_01_Lithium_Battery_Status_Low); 

        setInputValueFC_01_Battery_Voltage(FC_01_Battery_Voltage_High); 
        setInputValue2FC_01_Battery_Voltage(FC_01_Battery_Voltage_Low); 

        setInputValueFC_01_System_Voltage(FC_01_System_Voltage_High); 
        setInputValue2FC_01_System_Voltage(FC_01_System_Voltage_Low); 

        setInputValueFC_01_Charger_Voltage(FC_01_Charger_Voltage_High); 
        setInputValue2FC_01_Charger_Voltage(FC_01_Charger_Voltage_Low); 

  

        setInputValueFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Low); 

      
        

        setInputValueFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_High); 
        setInputValue2FC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Low); 

        setInputValueFC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_High); 
        setInputValue2FC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_Low); 

        setInputValueFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_High); 
        setInputValue2FC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Low); 

        setInputValueFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_High); 
        setInputValue2FC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Low); 

        setInputValueEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_High); 
        setInputValue2EVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Low); 

        setInputValueEVC_02_Temperature(EVC_02_Temperature_High); 
        setInputValue2EVC_02_Temperature(EVC_02_Temperature_Low); 

        setInputValueEVC_02_Pressure(EVC_02_Pressure_High); 
        setInputValue2EVC_02_Pressure(EVC_02_Pressure_Low); 

        setInputValueEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_High); 
        setInputValue2EVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Low); 

        setInputValueEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_High); 
        setInputValue2EVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Low); 


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

        setInputValueFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_High); 
        setInputValue2FC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_Low); 




        setInputValueFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_High); 
        setInputValue2FC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Low); 

        setInputValueFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Low); 


        setInputValueFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_High); 
        setInputValue2FC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Low); 

        setInputValueFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Low); 



        setInputValueFC_01_Conn_STT(FC_01_Conn_STT_High); 
        setInputValue2FC_01_Conn_STT(FC_01_Conn_STT_Low); 

        setInputValueEVC_02_Conn_STT(EVC_02_Conn_STT_High); 
        setInputValue2EVC_02_Conn_STT(EVC_02_Conn_STT_Low); 

        setInputValuePT_1103(PT_1103_High); 
        setInputValue2PT_1103(PT_1103_Low); 

        setInputValueMode_ATS(Mode_ATS_High); 
        setInputValue2Mode_ATS(Mode_ATS_Low); 

        setInputValueATS_Auto_Man(ATS_Auto_Man_High); 
        setInputValue2ATS_Auto_Man(ATS_Auto_Man_Low); 

    }, [FC_01_Lithium_Battery_Status_High, FC_01_Lithium_Battery_Status_Low ,
        FC_01_Battery_Voltage_High, FC_01_Battery_Voltage_Low 
        ,FC_01_System_Voltage_High, FC_01_System_Voltage_Low ,


         FC_01_Accumulated_Values_Uncorrected_Volume_High,FC_01_Accumulated_Values_Uncorrected_Volume_Low ,
          FC_01_Charger_Voltage_High,FC_01_Charger_Voltage_Low,

          FC_01_Current_Values_Static_Pressure_High,FC_01_Current_Values_Static_Pressure_Low,
          FC_01_Current_Values_Temperature_High,FC_01_Current_Values_Temperature_Low ,
           FC_01_Accumulated_Values_Volume_High,FC_01_Accumulated_Values_Volume_Low,
        
           FC_01_Current_Values_Flow_Rate_High,FC_01_Current_Values_Flow_Rate_Low,
           EVC_02_Remain_Battery_Service_Life_High,EVC_02_Remain_Battery_Service_Life_Low,

           EVC_02_Temperature_High,EVC_02_Temperature_Low,
           EVC_02_Pressure_High,EVC_02_Pressure_Low,

           EVC_02_Volume_at_Base_Condition_High,EVC_02_Volume_at_Base_Condition_Low,
           EVC_02_Vm_of_Last_Day_High,EVC_02_Vm_of_Last_Day_Low,

           EVC_02_Flow_at_Base_Condition_High,EVC_02_Flow_at_Base_Condition_Low,
           EVC_02_Volume_at_Measurement_Condition_High,EVC_02_Volume_at_Measurement_Condition_Low,


           EVC_02_Flow_at_Measurement_Condition_High,EVC_02_Flow_at_Measurement_Condition_Low,
           EVC_02_Vb_of_Current_Day_High,EVC_02_Vb_of_Current_Day_Low,
           EVC_02_Vm_of_Current_Day_High,EVC_02_Vm_of_Current_Day_Low,

           EVC_02_Vb_of_Last_Day_High,EVC_02_Vb_of_Last_Day_Low,

           FC_01_Current_Values_Uncorrected_Flow_Rate_High,FC_01_Current_Values_Uncorrected_Flow_Rate_Low,


           FC_01_Today_Values_Volume_High,FC_01_Today_Values_Volume_Low,

           FC_01_Today_Values_Uncorrected_Volume_High,FC_01_Today_Values_Uncorrected_Volume_Low,
           FC_01_Yesterday_Values_Volume_High,FC_01_Yesterday_Values_Volume_Low,

           FC_01_Yesterday_Values_Uncorrected_Volume_High,FC_01_Yesterday_Values_Uncorrected_Volume_Low,

           FC_01_Conn_STT_High,FC_01_Conn_STT_Low,

           EVC_02_Conn_STT_High,EVC_02_Conn_STT_Low,

           PT_1103_High,PT_1103_Low,

           Mode_ATS_High,Mode_ATS_Low,

           ATS_Auto_Man_High,ATS_Auto_Man_Low,

           getWayPhoneOTSUKA,
           PCV_01,
           PCV_02,
           PSV_01,

           timeEVC_01,timeEVC_02

        ]);
//============================================================================================================


        const handleMainTainAll = async (checked:any) => {
            try {

                
                const newMaintainFC_01_Lithium_Battery_Status = checked;
                const newMaintainFC_01_Battery_Voltage = checked;
                const newMaintainFC_01_System_Voltage = checked;
                const newMaintainFC_01_Charger_Voltage = checked;
                const newMaintainFC_01_Accumulated_Values_Uncorrected_Volume = checked;
                const newMaintainFC_01_Accumulated_Values_Volume = checked;
                const newMaintainFC_01_Current_Values_Static_Pressure = checked;
                const newMaintainFC_01_Current_Values_Temperature = checked;
                const newMaintainFC_01_Current_Values_Flow_Rate = checked;
                const newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate = checked;
                const newMaintainFC_01_Today_Values_Volume = checked;
                const newMaintainFC_01_Today_Values_Uncorrected_Volume = checked;
                const newMaintainFC_01_Yesterday_Values_Volume = checked;
                const newMaintainFC_01_Yesterday_Values_Uncorrected_Volume = checked;
        
                const newMaintainEVC_02_Remain_Battery_Service_Life = checked;
                const newMaintainEVC_02_Temperature = checked;
                const newMaintainEVC_02_Volume_at_Base_Condition = checked;
                const newMaintainEVC_02_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Pressure = checked;
                const newMaintainEVC_02_Flow_at_Base_Condition = checked;
                const newMaintainEVC_02_Vm_of_Current_Day = checked;
                const newMaintainEVC_02_Vb_of_Current_Day = checked;
                const newMaintainEVC_02_Flow_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Vb_of_Last_Day = checked;
                const newMaintainEVC_02_Vm_of_Last_Day = checked;
                const newMaintainFC_01_Conn_STT = checked;
                const newMaintainPT_1103 = checked;
                const newMaintainEVC_02_Conn_STT = checked;
                const newMaintainMode_ATS = checked;
                const newMaintainATS_Auto_Man = checked;

          
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { 
                        FC_01_Lithium_Battery_Status_Maintain: newMaintainFC_01_Lithium_Battery_Status,
                        FC_01_Battery_Voltage_Maintain: newMaintainFC_01_Battery_Voltage,
                        FC_01_System_Voltage_Maintain: newMaintainFC_01_System_Voltage,
                        FC_01_Charger_Voltage_Maintain: newMaintainFC_01_Charger_Voltage,
                        FC_01_Accumulated_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Accumulated_Values_Uncorrected_Volume,
                       FC_01_Accumulated_Values_Volume_Maintain: newMaintainFC_01_Accumulated_Values_Volume,
                       FC_01_Current_Values_Static_Pressure_Maintain: newMaintainFC_01_Current_Values_Static_Pressure,
                       FC_01_Current_Values_Temperature_Maintain: newMaintainFC_01_Current_Values_Temperature,
                       FC_01_Current_Values_Flow_Rate_Maintain: newMaintainFC_01_Current_Values_Flow_Rate,
                       FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain: newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate,
                       FC_01_Today_Values_Volume_Maintain: newMaintainFC_01_Today_Values_Volume,
                       FC_01_Today_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Today_Values_Uncorrected_Volume,
                       FC_01_Yesterday_Values_Volume_Maintain: newMaintainFC_01_Yesterday_Values_Volume,
                       FC_01_Yesterday_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Yesterday_Values_Uncorrected_Volume,
        
        
                       EVC_02_Remain_Battery_Service_Life_Maintain: newMaintainEVC_02_Remain_Battery_Service_Life,
                       EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
                       EVC_02_Volume_at_Base_Condition_Maintain: newMaintainEVC_02_Volume_at_Base_Condition,
                       EVC_02_Volume_at_Measurement_Condition_Maintain: newMaintainEVC_02_Volume_at_Measurement_Condition,
                       EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
                       EVC_02_Flow_at_Base_Condition_Maintain: newMaintainEVC_02_Flow_at_Base_Condition,
                       EVC_02_Vm_of_Current_Day_Maintain: newMaintainEVC_02_Vm_of_Current_Day,
                       EVC_02_Vb_of_Current_Day_Maintain: newMaintainEVC_02_Vb_of_Current_Day,
                       EVC_02_Flow_at_Measurement_Condition_Maintain: newMaintainEVC_02_Flow_at_Measurement_Condition,
                       EVC_02_Vb_of_Last_Day_Maintain: newMaintainEVC_02_Vb_of_Last_Day,
                       EVC_02_Vm_of_Last_Day_Maintain: newMaintainEVC_02_Vm_of_Last_Day,
        
                       PT_1103_Maintain: newMaintainPT_1103,
             
                       FC_01_Conn_STT_Maintain: newMaintainFC_01_Conn_STT,
                       EVC_02_Conn_STT_Maintain: newMaintainEVC_02_Conn_STT,
                       Mode_ATS_Maintain: newMaintainMode_ATS,
                       ATS_Auto_Man_Maintain: newMaintainATS_Auto_Man,
        
        
                     }
                );

                setMaintainFC_01_Lithium_Battery_Status(newMaintainFC_01_Lithium_Battery_Status);
                setMaintainFC_01_Battery_Voltage(newMaintainFC_01_Battery_Voltage);
                setMaintainFC_01_System_Voltage(newMaintainFC_01_System_Voltage);
                setMaintainFC_01_Charger_Voltage(newMaintainFC_01_Charger_Voltage);
                setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(newMaintainFC_01_Accumulated_Values_Uncorrected_Volume);
                setMaintainFC_01_Accumulated_Values_Volume(newMaintainFC_01_Accumulated_Values_Volume);
                setMaintainFC_01_Current_Values_Static_Pressure(newMaintainFC_01_Current_Values_Static_Pressure);
                setMaintainFC_01_Current_Values_Temperature(newMaintainFC_01_Current_Values_Temperature);
                setMaintainFC_01_Current_Values_Flow_Rate(newMaintainFC_01_Current_Values_Flow_Rate);
                setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate);
                setMaintainFC_01_Today_Values_Volume(newMaintainFC_01_Today_Values_Volume);
                setMaintainFC_01_Today_Values_Uncorrected_Volume(newMaintainFC_01_Today_Values_Uncorrected_Volume);
                setMaintainFC_01_Yesterday_Values_Volume(newMaintainFC_01_Yesterday_Values_Volume);
                setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(newMaintainFC_01_Yesterday_Values_Uncorrected_Volume);
        


                setMaintainEVC_02_Remain_Battery_Service_Life(newMaintainEVC_02_Remain_Battery_Service_Life);
                setMaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
                setMaintainEVC_02_Volume_at_Base_Condition(newMaintainEVC_02_Volume_at_Base_Condition);
                setMaintainEVC_02_Volume_at_Measurement_Condition(newMaintainEVC_02_Volume_at_Measurement_Condition);
                setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
                setMaintainEVC_02_Flow_at_Base_Condition(newMaintainEVC_02_Flow_at_Base_Condition);
                setMaintainEVC_02_Vm_of_Current_Day(newMaintainEVC_02_Vm_of_Current_Day);
                setMaintainEVC_02_Vb_of_Current_Day(newMaintainEVC_02_Vb_of_Current_Day);
                setMaintainEVC_02_Flow_at_Measurement_Condition(newMaintainEVC_02_Flow_at_Measurement_Condition);
                setMaintainEVC_02_Vb_of_Last_Day(newMaintainEVC_02_Vb_of_Last_Day);
                setMaintainEVC_02_Vm_of_Last_Day(newMaintainEVC_02_Vm_of_Last_Day);
                setMaintainPT_1103(newMaintainPT_1103);
       
                setMaintainFC_01_Conn_STT(newMaintainFC_01_Conn_STT);
                setMaintainEVC_02_Conn_STT(newMaintainEVC_02_Conn_STT);
                setMaintainMode_ATS(newMaintainMode_ATS);
                setMaintainATS_Auto_Man(newMaintainATS_Auto_Man);
        
        
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };




        const checkMaintainingAll = 
        maintainFC_01_Lithium_Battery_Status === true &&
    maintainFC_01_Battery_Voltage === true &&
    maintainFC_01_System_Voltage === true &&
    maintainFC_01_Charger_Voltage === true &&
    maintainFC_01_Conn_STT === true &&
    maintainFC_01_Accumulated_Values_Uncorrected_Volume === true &&
    maintainFC_01_Accumulated_Values_Volume === true &&
    maintainFC_01_Current_Values_Static_Pressure === true &&
    maintainFC_01_Current_Values_Temperature === true &&
    maintainFC_01_Current_Values_Flow_Rate === true &&
    maintainFC_01_Current_Values_Uncorrected_Flow_Rate === true &&
    maintainFC_01_Today_Values_Volume === true &&
    maintainFC_01_Today_Values_Uncorrected_Volume === true &&
    maintainFC_01_Yesterday_Values_Volume === true &&
    maintainFC_01_Yesterday_Values_Uncorrected_Volume === true &&
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
    maintainPT_1103 === true &&
    maintainMode_ATS === true &&
    maintainATS_Auto_Man === true;

        
        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainAll(isChecked);
        };
        const maintainHeader = (
            <div>
    
                {AuthInput ? " "  :
                    <Checkbox
                        style={{ marginRight: 5 }}
                        onChange={handleCheckboxChange}
                        checked={checkMaintainingAll}
                    />
                } 
                Maintain
    
            </div>
        );




//==========================================================================================================

const handleMainTainFC0 = async (checked:any) => {
    try {

        
        const newMaintainFC_01_Lithium_Battery_Status = checked;
        const newMaintainFC_01_Battery_Voltage = checked;
        const newMaintainFC_01_System_Voltage = checked;
        const newMaintainFC_01_Charger_Voltage = checked;
      



        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
            { 
                FC_01_Lithium_Battery_Status_Maintain: newMaintainFC_01_Lithium_Battery_Status,
                FC_01_Battery_Voltage_Maintain: newMaintainFC_01_Battery_Voltage,
                FC_01_System_Voltage_Maintain: newMaintainFC_01_System_Voltage,
                FC_01_Charger_Voltage_Maintain: newMaintainFC_01_Charger_Voltage,
               




             }
        );

        setMaintainFC_01_Lithium_Battery_Status(newMaintainFC_01_Lithium_Battery_Status);
        setMaintainFC_01_Battery_Voltage(newMaintainFC_01_Battery_Voltage);
        setMaintainFC_01_System_Voltage(newMaintainFC_01_System_Voltage);
        setMaintainFC_01_Charger_Voltage(newMaintainFC_01_Charger_Voltage);
   








    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};


const checkMaintainingFC0 = 
maintainFC_01_Lithium_Battery_Status === true &&
maintainFC_01_Battery_Voltage === true &&
maintainFC_01_System_Voltage === true &&
maintainFC_01_Charger_Voltage === true ;



const handleCheckboxChangeFC0 = (e:any) => {
    const isChecked = e.checked;

    handleMainTainFC0(isChecked);
};





//==========================================================================================================



        const handleMainTainFC = async (checked:any) => {
            try {

                
                const newMaintainFC_01_Lithium_Battery_Status = checked;
                const newMaintainFC_01_Battery_Voltage = checked;
                const newMaintainFC_01_System_Voltage = checked;
                const newMaintainFC_01_Charger_Voltage = checked;
                const newMaintainFC_01_Accumulated_Values_Uncorrected_Volume = checked;
                const newMaintainFC_01_Accumulated_Values_Volume = checked;
                const newMaintainFC_01_Current_Values_Static_Pressure = checked;
                const newMaintainFC_01_Current_Values_Temperature = checked;
                const newMaintainFC_01_Current_Values_Flow_Rate = checked;
                const newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate = checked;
                const newMaintainFC_01_Today_Values_Volume = checked;
                const newMaintainFC_01_Today_Values_Uncorrected_Volume = checked;
                const newMaintainFC_01_Yesterday_Values_Volume = checked;
                const newMaintainFC_01_Yesterday_Values_Uncorrected_Volume = checked;
                const newMaintainFC_01_Conn_STT = checked;

        
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { 
                        FC_01_Lithium_Battery_Status_Maintain: newMaintainFC_01_Lithium_Battery_Status,
                        FC_01_Battery_Voltage_Maintain: newMaintainFC_01_Battery_Voltage,
                        FC_01_System_Voltage_Maintain: newMaintainFC_01_System_Voltage,
                        FC_01_Charger_Voltage_Maintain: newMaintainFC_01_Charger_Voltage,
                        FC_01_Accumulated_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Accumulated_Values_Uncorrected_Volume,
                       FC_01_Accumulated_Values_Volume_Maintain: newMaintainFC_01_Accumulated_Values_Volume,
                       FC_01_Current_Values_Static_Pressure_Maintain: newMaintainFC_01_Current_Values_Static_Pressure,
                       FC_01_Current_Values_Temperature_Maintain: newMaintainFC_01_Current_Values_Temperature,
                       FC_01_Current_Values_Flow_Rate_Maintain: newMaintainFC_01_Current_Values_Flow_Rate,
                       FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain: newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate,
                       FC_01_Today_Values_Volume_Maintain: newMaintainFC_01_Today_Values_Volume,
                       FC_01_Today_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Today_Values_Uncorrected_Volume,
                       FC_01_Yesterday_Values_Volume_Maintain: newMaintainFC_01_Yesterday_Values_Volume,
                       FC_01_Yesterday_Values_Uncorrected_Volume_Maintain: newMaintainFC_01_Yesterday_Values_Uncorrected_Volume,
                       FC_01_Conn_STT_Maintain: newMaintainFC_01_Conn_STT,
        
        
        
        
                     }
                );

                setMaintainFC_01_Lithium_Battery_Status(newMaintainFC_01_Lithium_Battery_Status);
                setMaintainFC_01_Battery_Voltage(newMaintainFC_01_Battery_Voltage);
                setMaintainFC_01_System_Voltage(newMaintainFC_01_System_Voltage);
                setMaintainFC_01_Charger_Voltage(newMaintainFC_01_Charger_Voltage);
                setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(newMaintainFC_01_Accumulated_Values_Uncorrected_Volume);
                setMaintainFC_01_Accumulated_Values_Volume(newMaintainFC_01_Accumulated_Values_Volume);
                setMaintainFC_01_Current_Values_Static_Pressure(newMaintainFC_01_Current_Values_Static_Pressure);
                setMaintainFC_01_Current_Values_Temperature(newMaintainFC_01_Current_Values_Temperature);
                setMaintainFC_01_Current_Values_Flow_Rate(newMaintainFC_01_Current_Values_Flow_Rate);
                setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(newMaintainFC_01_Current_Values_Uncorrected_Flow_Rate);
                setMaintainFC_01_Today_Values_Volume(newMaintainFC_01_Today_Values_Volume);
                setMaintainFC_01_Today_Values_Uncorrected_Volume(newMaintainFC_01_Today_Values_Uncorrected_Volume);
                setMaintainFC_01_Yesterday_Values_Volume(newMaintainFC_01_Yesterday_Values_Volume);
                setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(newMaintainFC_01_Yesterday_Values_Uncorrected_Volume);
                setMaintainFC_01_Conn_STT(newMaintainFC_01_Conn_STT);
        


       
        
        
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };


        const checkMaintainingFC = 
        maintainFC_01_Lithium_Battery_Status === true &&
    maintainFC_01_Battery_Voltage === true &&
    maintainFC_01_System_Voltage === true &&
    maintainFC_01_Charger_Voltage === true &&
    maintainFC_01_Conn_STT === true &&
    maintainFC_01_Accumulated_Values_Uncorrected_Volume === true &&
    maintainFC_01_Accumulated_Values_Volume === true &&
    maintainFC_01_Current_Values_Static_Pressure === true &&
    maintainFC_01_Current_Values_Temperature === true &&
    maintainFC_01_Current_Values_Flow_Rate === true &&
    maintainFC_01_Current_Values_Uncorrected_Flow_Rate === true &&
    maintainFC_01_Today_Values_Volume === true &&
    maintainFC_01_Today_Values_Uncorrected_Volume === true &&
    maintainFC_01_Yesterday_Values_Volume === true &&
    maintainFC_01_Yesterday_Values_Uncorrected_Volume === true;


        const handleCheckboxChangeFC = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainFC(isChecked);
        };

//===================================================================================================================
        const handleMainTainEVC02 = async (checked:any) => {
            try {
        
                const newMaintainEVC_02_Remain_Battery_Service_Life = checked;
                const newMaintainEVC_02_Temperature = checked;
                const newMaintainEVC_02_Volume_at_Base_Condition = checked;
                const newMaintainEVC_02_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Pressure = checked;
                const newMaintainEVC_02_Flow_at_Base_Condition = checked;
                const newMaintainEVC_02_Vm_of_Current_Day = checked;
                const newMaintainEVC_02_Vb_of_Current_Day = checked;
                const newMaintainEVC_02_Flow_at_Measurement_Condition = checked;
                const newMaintainEVC_02_Vb_of_Last_Day = checked;
                const newMaintainEVC_02_Vm_of_Last_Day = checked;
        
                const newMaintainPT_1103 = checked;
                const newMaintainEVC_02_Conn_STT = checked;
                const newMaintainMode_ATS = checked;
                const newMaintainATS_Auto_Man = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { 
        
                       EVC_02_Remain_Battery_Service_Life_Maintain: newMaintainEVC_02_Remain_Battery_Service_Life,
                       EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
                       EVC_02_Volume_at_Base_Condition_Maintain: newMaintainEVC_02_Volume_at_Base_Condition,
                       EVC_02_Volume_at_Measurement_Condition_Maintain: newMaintainEVC_02_Volume_at_Measurement_Condition,
                       EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
                       EVC_02_Flow_at_Base_Condition_Maintain: newMaintainEVC_02_Flow_at_Base_Condition,
                       EVC_02_Vm_of_Current_Day_Maintain: newMaintainEVC_02_Vm_of_Current_Day,
                       EVC_02_Vb_of_Current_Day_Maintain: newMaintainEVC_02_Vb_of_Current_Day,
                       EVC_02_Flow_at_Measurement_Condition_Maintain: newMaintainEVC_02_Flow_at_Measurement_Condition,
                       EVC_02_Vb_of_Last_Day_Maintain: newMaintainEVC_02_Vb_of_Last_Day,
                       EVC_02_Vm_of_Last_Day_Maintain: newMaintainEVC_02_Vm_of_Last_Day,
                       PT_1103_Maintain: newMaintainPT_1103,
                       EVC_02_Conn_STT_Maintain: newMaintainEVC_02_Conn_STT,
                       Mode_ATS_Maintain: newMaintainMode_ATS,
                       ATS_Auto_Man_Maintain: newMaintainATS_Auto_Man,
                     }
                );

                setMaintainEVC_02_Remain_Battery_Service_Life(newMaintainEVC_02_Remain_Battery_Service_Life);
                setMaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
                setMaintainEVC_02_Volume_at_Base_Condition(newMaintainEVC_02_Volume_at_Base_Condition);
                setMaintainEVC_02_Volume_at_Measurement_Condition(newMaintainEVC_02_Volume_at_Measurement_Condition);
                setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
                setMaintainEVC_02_Flow_at_Base_Condition(newMaintainEVC_02_Flow_at_Base_Condition);
                setMaintainEVC_02_Vm_of_Current_Day(newMaintainEVC_02_Vm_of_Current_Day);
                setMaintainEVC_02_Vb_of_Current_Day(newMaintainEVC_02_Vb_of_Current_Day);
                setMaintainEVC_02_Flow_at_Measurement_Condition(newMaintainEVC_02_Flow_at_Measurement_Condition);
                setMaintainEVC_02_Vb_of_Last_Day(newMaintainEVC_02_Vb_of_Last_Day);
                setMaintainEVC_02_Vm_of_Last_Day(newMaintainEVC_02_Vm_of_Last_Day);
                setMaintainPT_1103(newMaintainPT_1103);
                setMaintainEVC_02_Conn_STT(newMaintainEVC_02_Conn_STT);
                setMaintainMode_ATS(newMaintainMode_ATS);
                setMaintainATS_Auto_Man(newMaintainATS_Auto_Man);
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
        maintainEVC_02_Conn_STT === true &&
        maintainPT_1103 === true &&
        maintainMode_ATS === true &&
        maintainATS_Auto_Man === true;
    
        //=============================================================================================


        const handleMainTainUPS = async (checked:any) => {
            try {
        
             
                const newMaintainMode_ATS = checked;
                const newMaintainATS_Auto_Man = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { 
        
                       Mode_ATS_Maintain: newMaintainMode_ATS,
                       ATS_Auto_Man_Maintain: newMaintainATS_Auto_Man,
                     }
                );

        
                setMaintainMode_ATS(newMaintainMode_ATS);
                setMaintainATS_Auto_Man(newMaintainATS_Auto_Man);
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };


        
        const handleCheckboxChangeUPS = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainUPS(isChecked);
        };
       
        const checkMaintainingUPS = 
        maintainMode_ATS === true &&
        maintainATS_Auto_Man === true;
    
        //=============================================================================================



        const handleMainTainPT_1103 = async (checked:any) => {
            try {
    
        
                const newMaintainPT_1103 = checked;
             
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                    { 
                 
                       PT_1103_Maintain: newMaintainPT_1103,
                     }
                );
                setMaintainPT_1103(newMaintainPT_1103);
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };


        
        const handleCheckboxChangePT_1103 = (e:any) => {
            const isChecked = e.checked;
            handleMainTainPT_1103(isChecked);
        };
        const checkMaintainingPT_1103 = 
   
        maintainPT_1103 === true
 
    
        //=============================================================================================
        
    const combineCss = {
        CSSFC_01_Lithium_Battery_Status : {
            color:exceedThresholdFC_01_Lithium_Battery_Status && !maintainFC_01_Lithium_Battery_Status
            ? "#ff5656"
            : maintainFC_01_Lithium_Battery_Status
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_01_Battery_Voltage : {
            color:exceedThresholdFC_01_Battery_Voltage && !maintainFC_01_Battery_Voltage
            ? "#ff5656"
            : maintainFC_01_Battery_Voltage
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_01_System_Voltage : {
            color:exceedThresholdFC_01_System_Voltage && !maintainFC_01_System_Voltage
            ? "#ff5656"
            : maintainFC_01_System_Voltage
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_01_Charger_Voltage : {
            color:exceedThresholdFC_01_Charger_Voltage && !maintainFC_01_Charger_Voltage
            ? "#ff5656"
            : maintainFC_01_Charger_Voltage
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_01_Conn_STT : {
            color:exceedThresholdFC_01_Conn_STT && !maintainFC_01_Conn_STT
            ? "#ff5656"
            : maintainFC_01_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_01_Accumulated_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_01_Accumulated_Values_Uncorrected_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_01_Accumulated_Values_Volume : {
            color:exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume
            ? "#ff5656"
            : maintainFC_01_Accumulated_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_01_Current_Values_Static_Pressure : {
            color:exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure
            ? "#ff5656"
            : maintainFC_01_Current_Values_Static_Pressure
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_01_Current_Values_Temperature : {
            color:exceedThresholdFC_01_Current_Values_Temperature && !maintainFC_01_Current_Values_Temperature
            ? "#ff5656"
            : maintainFC_01_Current_Values_Temperature
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSFC_01_Current_Values_Flow_Rate : {
            color:exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate
            ? "#ff5656"
            : maintainFC_01_Current_Values_Flow_Rate
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

        CSSEVC_02_Vm_of_Last_Day : {
            color:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
            ? "#ff5656"
            : maintainEVC_02_Vm_of_Last_Day
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

        CSSFC_01_Current_Values_Uncorrected_Flow_Rate : {
            color:exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate && !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
            ? "#ff5656"
            : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
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

        CSSEVC_02_Conn_STT: {
            color: exceedThresholdEVC_02_Conn_STT && !maintainEVC_02_Conn_STT
                ? "#ff5656"
                : maintainEVC_02_Conn_STT
                ? "orange"
                : "",
            height: 25,
            fontWeight: 400,
        },
        
        CSSPT_1103: {
            color: exceedThresholdPT_1103 && !maintainPT_1103
                ? "#ff5656"
                : maintainPT_1103
                ? "orange"
                : "",
            height: 25,
            fontWeight: 400,
        },
        
        CSSMode_ATS: {
            color: exceedThresholdMode_ATS && !maintainMode_ATS
                ? "#ff5656"
                : maintainMode_ATS
                ? "orange"
                : "",
            height: 25,
            fontWeight: 400,
        },
        
        CSSATS_Auto_Man: {
            color: exceedThresholdATS_Auto_Man && !maintainATS_Auto_Man
                ? "#ff5656"
                : maintainATS_Auto_Man
                ? "orange"
                : "",
            height: 25,
            fontWeight: 400,
        },
  };
  const mainCategoryFC = {
    EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>FC-1101 -  Parameters & Configurations
  {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeFC}
            checked={checkMaintainingFC}
        />
    <p style={{fontSize:15}}>Maintain FC-1101</p>  </div> )}  </span>  ,
    EVC02: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>EVC-1102 -  Parameters & Configurations
    {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
          <Checkbox
              style={{ marginRight: 5 }}
              onChange={handleCheckboxChangeEVC02}
              checked={checkMaintainingEVC02}
          />
      <p style={{fontSize:15}}>Maintain EVC-1102</p>  </div> )}  </span> ,
      
      
      UPS: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>UPS -  Parameters & Configurations
      {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangeUPS}
                checked={checkMaintainingUPS}
            />
        <p style={{fontSize:15}}>Maintain UPS</p>  </div> )}  </span> 
      
      ,

      PT1103: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>PT-1103 -  Parameters & Configurations
      {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangePT_1103}
                checked={checkMaintainingPT_1103}
            />
        <p style={{fontSize:15}}>Maintain PT-1103</p>  </div> )}  </span> 
      
      ,
      FC: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}>FC -  Parameters & Configurations
      {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangeFC0}
                checked={checkMaintainingFC0}
            />
        <p style={{fontSize:15}}>Maintain FC</p>  </div> )}  </span>  ,
};


const dataFC_01_Lithium_Battery_Status = FC_01_Lithium_Battery_Status === "0" ? "Yes" : FC_01_Lithium_Battery_Status === "1" ? "No" : null

const dataMode_ATS = Mode_ATS === "0" ? "USP Run" : Mode_ATS === "1" ? "Line Run" : null
const dataATS_Auto_Man = ATS_Auto_Man === "0" ? "Auto" : ATS_Auto_Man === "1" ? "Man" : null
const DataEVC_02_Conn_STT  = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null;
      

const DataFC_01_Conn_STT  = FC_01_Conn_STT === "0" ? "Not Init" : FC_01_Conn_STT === "1" ? "COM OK" : FC_01_Conn_STT === "2" ? "Error" : null;


        const dataEVC01 = [
            {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} >{FC01_Conn_STT}</span>,
         name: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>{TagName.Input_Pressure}</span> ,
        
         modbus: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>47619	 </span> ,
        
        value: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} > {FC_01_Current_Values_Static_Pressure} {nameValue.Bara}</span> , 
         high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Static_Pressure} onChange={handleInputChangeFC_01_Current_Values_Static_Pressure} inputMode="decimal" />, 
         low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Static_Pressure} onChange={handleInputChange2FC_01_Current_Values_Static_Pressure} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainFC_01_Current_Values_Static_Pressure}
         checked={maintainFC_01_Current_Values_Static_Pressure}
        ></Checkbox>
        
        },
        
          {
            mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Temperature} >{FC01_Conn_STT}</span>,
    name: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>Temperature</span> ,
    
    modbus: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>47621	 </span> ,
    
    value: <span style={combineCss.CSSFC_01_Current_Values_Temperature} > {FC_01_Current_Values_Temperature} {nameValue.C}</span> , 
    high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Temperature} onChange={handleInputChangeFC_01_Current_Values_Temperature} inputMode="decimal" />, 
    low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Temperature} onChange={handleInputChange2FC_01_Current_Values_Temperature} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFC_01_Current_Values_Temperature}
    checked={maintainFC_01_Current_Values_Temperature}
    ></Checkbox>
    
    },
    {
        mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} >{FC01_Conn_STT}</span>,
name: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>Standard Volume Flow</span> ,

modbus: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>47623	 </span> ,

value: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} > {FC_01_Current_Values_Flow_Rate} {nameValue.Sm3h}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Flow_Rate} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Flow_Rate} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Current_Values_Flow_Rate}
checked={maintainFC_01_Current_Values_Flow_Rate}
></Checkbox>

},
{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} >{FC01_Conn_STT}</span>,
name: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>Gross Volume Flow</span> ,

modbus: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>47627	 </span> ,

value: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} > {FC_01_Current_Values_Uncorrected_Flow_Rate} {nameValue.m3h} </span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Current_Values_Uncorrected_Flow_Rate}
checked={maintainFC_01_Current_Values_Uncorrected_Flow_Rate}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} >{FC01_Conn_STT}</span>,
name: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>Standard Volume Accumulated</span> ,

modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>47617	 </span> ,

value: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} > {FC_01_Accumulated_Values_Volume} {nameValue.Sm3}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Volume} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Volume} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Accumulated_Values_Volume}
checked={maintainFC_01_Accumulated_Values_Volume}
></Checkbox>

},

         {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} >{FC01_Conn_STT}</span>,
         name: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}> Gross Volume Accumulated</span> ,

         modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>47615	 </span> ,

        value: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} > {FC_01_Accumulated_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
         high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />, 
         low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainFC_01_Accumulated_Values_Uncorrected_Volume}
         checked={maintainFC_01_Accumulated_Values_Uncorrected_Volume}
     ></Checkbox>

        },

   
        

  










     {
                mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Volume} >{FC01_Conn_STT}</span>,
     name: <span style={combineCss.CSSFC_01_Today_Values_Volume}>Standard Volume Vb Today</span> ,

     modbus: <span style={combineCss.CSSFC_01_Today_Values_Volume}>47625	 </span> ,

    value: <span style={combineCss.CSSFC_01_Today_Values_Volume} > {FC_01_Today_Values_Volume} {nameValue.Sm3}</span> , 
     high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Volume} onChange={handleInputChangeFC_01_Today_Values_Volume} inputMode="decimal" />, 
     low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Volume} onChange={handleInputChange2FC_01_Today_Values_Volume} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainFC_01_Today_Values_Volume}
     checked={maintainFC_01_Today_Values_Volume}
 ></Checkbox>

    },


    {
                mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} >{FC01_Conn_STT}</span>,
    name: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>Gross Volume Vm Today</span> ,

    modbus: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>47629	 </span> ,

   value: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} > {FC_01_Today_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
    high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />, 
    low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFC_01_Today_Values_Uncorrected_Volume}
    checked={maintainFC_01_Today_Values_Uncorrected_Volume}
></Checkbox>

   },
  

 {
                mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} >{FC01_Conn_STT}</span>,
 name: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>Standard Volume Vb Yesterday</span> ,

 modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>47631	 </span> ,

value: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} > {FC_01_Yesterday_Values_Volume} {nameValue.Sm3}</span> , 
 high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Volume} inputMode="decimal" />, 
 low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Volume} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainFC_01_Yesterday_Values_Volume}
 checked={maintainFC_01_Yesterday_Values_Volume}
></Checkbox>

},

{
                mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} >{FC01_Conn_STT}</span>,
name: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>Gross Volume Vm Yesterday</span> ,

modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>47633	 </span> ,

value: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} > {FC_01_Yesterday_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Yesterday_Values_Uncorrected_Volume}
checked={maintainFC_01_Yesterday_Values_Uncorrected_Volume}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.EVC01,

timeUpdate: <span style={combineCss.CSSFC_01_Conn_STT} >{FC01_Conn_STT}</span>,
name: <span style={combineCss.CSSFC_01_Conn_STT}>FC Connection Status</span> ,

modbus: <span style={combineCss.CSSFC_01_Conn_STT}>Status	 </span> ,

value: <span style={combineCss.CSSFC_01_Conn_STT} > {FC_01_Conn_STT} {DataFC_01_Conn_STT}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Conn_STT} onChange={handleInputChangeFC_01_Conn_STT} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Conn_STT} onChange={handleInputChange2FC_01_Conn_STT} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Conn_STT}
checked={maintainFC_01_Conn_STT}
></Checkbox>

},

          ]


          const dataEVC02 = [


            
 
            {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC02_Conn_STT}</span>,
    name: <span style={combineCss.CSSEVC_02_Pressure}>Input Pressure</span> ,

    modbus: <span style={combineCss.CSSEVC_02_Pressure}>40852	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
    high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
    low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_02_Pressure}
    checked={maintainEVC_02_Pressure}
></Checkbox>

   },



     {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC02_Conn_STT}</span>,
     name: <span style={combineCss.CSSEVC_02_Temperature}>{TagName.EVC_01_Temperature}</span> ,

     modbus: <span style={combineCss.CSSEVC_02_Temperature}>40850	 </span> ,

    value: <span style={combineCss.CSSEVC_02_Temperature} > {EVC_02_Temperature} {nameValue.C}</span> , 
     high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
     low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainEVC_02_Temperature}
     checked={maintainEVC_02_Temperature}
 ></Checkbox>

    },



   {
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>{TagName.SVF}</span> ,

modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40858	 </span> ,

value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Volume_at_Measurement_Condition}
checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>{TagName.GVF}</span> ,

modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40860	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Flow_at_Base_Condition}
checked={maintainEVC_02_Flow_at_Base_Condition}
></Checkbox>

},
   {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC02_Conn_STT}</span>,
   name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>{TagName.SVA}</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40854	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
   high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
   low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Volume_at_Base_Condition}
   checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

  },

{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>{TagName.GVA}</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40856	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.m3h}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},



 {
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>{TagName.Vb_Today}</span> ,

modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40862	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.Sm3}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Flow_at_Measurement_Condition}
checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},

{
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC02_Conn_STT}</span>,
  name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>{TagName.Vm_Today}</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40864	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.m3}</span> , 
  high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Vb_of_Current_Day}
  checked={maintainEVC_02_Vb_of_Current_Day}
></Checkbox>

 },


 {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} >{EVC02_Conn_STT}</span>,
 name: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>{TagName.Vb_Yesterday}</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40866	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.Sm3}</span> , 
 high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Vm_of_Current_Day}
 checked={maintainEVC_02_Vm_of_Current_Day}
></Checkbox>

},


{
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>{TagName.Vm_Yesterday}</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40868	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.m3}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vb_of_Last_Day}
checked={maintainEVC_02_Vb_of_Last_Day}
></Checkbox>

},



{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery Service Life </span> ,

modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40001	 </span> ,

value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Remain_Battery_Service_Life}
checked={maintainEVC_02_Remain_Battery_Service_Life}
></Checkbox>

},




{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Conn_STT} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Conn_STT}>EVC Connection Status</span> ,

modbus: <span style={combineCss.CSSEVC_02_Conn_STT}>Status</span> ,

value: <span style={combineCss.CSSEVC_02_Conn_STT} > {EVC_02_Conn_STT} {DataEVC_02_Conn_STT}</span> , 
high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Conn_STT} onChange={handleInputChangeEVC_02_Conn_STT} inputMode="decimal" />, 
low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSEVC_02_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Conn_STT} onChange={handleInputChange2EVC_02_Conn_STT} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Conn_STT}
checked={maintainEVC_02_Conn_STT}
></Checkbox>

},
          ]


          const PT_1103_Parameter = [
            {
                mainCategory: mainCategoryFC.PT1103,
            
            timeUpdate: <span style={combineCss.CSSPT_1103} >{EVC02_Conn_STT}</span>,
            name: <span style={combineCss.CSSPT_1103}>Output Pressure PT-1103</span> ,
            
            modbus: <span style={combineCss.CSSPT_1103}>AI1</span> ,
            
            value: <span style={combineCss.CSSPT_1103} > {PT_1103} {nameValue.BARG}</span> , 
            high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSPT_1103}   placeholder='High' step="0.1" type='number' value={inputValuePT_1103} onChange={handleInputChangePT_1103} inputMode="decimal" />, 
            low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSPT_1103}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_1103} onChange={handleInputChange2PT_1103} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainPT_1103}
            checked={maintainPT_1103}
            ></Checkbox>
            
            },
            

         ] 


         const UPS_Parameter = [
            {
                mainCategory: mainCategoryFC.UPS,
            
            timeUpdate: <span style={combineCss.CSSMode_ATS} >{EVC02_Conn_STT}</span>,
            name: <span style={combineCss.CSSMode_ATS}>Mode ATS</span> ,
            
            modbus: <span style={combineCss.CSSMode_ATS}>DI3</span> ,
            
            value: <span style={combineCss.CSSMode_ATS} > {Mode_ATS} {dataMode_ATS}</span> , 
            high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSMode_ATS}   placeholder='High' step="0.1" type='number' value={inputValueMode_ATS} onChange={handleInputChangeMode_ATS} inputMode="decimal" />, 
            low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSMode_ATS}   placeholder='Low' step="0.1" type='number' value={inputValue2Mode_ATS} onChange={handleInputChange2Mode_ATS} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainMode_ATS}
            checked={maintainMode_ATS}
            ></Checkbox>
            
            },
            
            {
                mainCategory: mainCategoryFC.UPS,
            
            timeUpdate: <span style={combineCss.CSSATS_Auto_Man} >{EVC02_Conn_STT}</span>,
            name: <span style={combineCss.CSSATS_Auto_Man}>ATS Auto Man</span> ,
            
            modbus: <span style={combineCss.CSSATS_Auto_Man}>DI4</span> ,
            
            value: <span style={combineCss.CSSATS_Auto_Man} > {ATS_Auto_Man} {dataATS_Auto_Man}</span> , 
            high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSATS_Auto_Man}   placeholder='High' step="0.1" type='number' value={inputValueATS_Auto_Man} onChange={handleInputChangeATS_Auto_Man} inputMode="decimal" />, 
            low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSATS_Auto_Man}   placeholder='Low' step="0.1" type='number' value={inputValue2ATS_Auto_Man} onChange={handleInputChange2ATS_Auto_Man} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainATS_Auto_Man}
            checked={maintainATS_Auto_Man}
            ></Checkbox>
            
            },

         ] 


         const FC = [
      
         
            {
                mainCategory: mainCategoryFC.FC,
                
                timeUpdate: <span style={combineCss.CSSFC_01_Battery_Voltage} >{FC01_Conn_STT}</span>,
             name: <span style={combineCss.CSSFC_01_Battery_Voltage}>{TagName.Battery_Voltage}</span> ,
    
             modbus: <span style={combineCss.CSSFC_01_Battery_Voltage}>46617	 </span> ,
    
            value: <span style={combineCss.CSSFC_01_Battery_Voltage} > {FC_01_Battery_Voltage} {nameValue.Volt}</span> , 
             high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Battery_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Battery_Voltage} onChange={handleInputChangeFC_01_Battery_Voltage} inputMode="decimal" />, 
             low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Battery_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Battery_Voltage} onChange={handleInputChange2FC_01_Battery_Voltage} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_01_Battery_Voltage}
             checked={maintainFC_01_Battery_Voltage}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.FC,
                
                timeUpdate: <span style={combineCss.CSSFC_01_System_Voltage} >{FC01_Conn_STT}</span>,
            name: <span style={combineCss.CSSFC_01_System_Voltage}>{TagName.System_Voltage}</span> ,
   
            modbus: <span style={combineCss.CSSFC_01_System_Voltage}>46615	 </span> ,
   
           value: <span style={combineCss.CSSFC_01_System_Voltage} > {FC_01_System_Voltage} {nameValue.Volt}</span> , 
            high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_System_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_System_Voltage} onChange={handleInputChangeFC_01_System_Voltage} inputMode="decimal" />, 
            low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_System_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_System_Voltage} onChange={handleInputChange2FC_01_System_Voltage} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainFC_01_System_Voltage}
            checked={maintainFC_01_System_Voltage}
        ></Checkbox>
   
           },

           {
                mainCategory: mainCategoryFC.FC,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Charger_Voltage} >{FC01_Conn_STT}</span>,
           name: <span style={combineCss.CSSFC_01_Charger_Voltage}> {TagName.Charger_Voltage} </span> ,
  
           modbus: <span style={combineCss.CSSFC_01_Charger_Voltage}>46619	 </span> ,
  
          value: <span style={combineCss.CSSFC_01_Charger_Voltage} > {FC_01_Charger_Voltage} {nameValue.Volt}</span> , 
           high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Charger_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Charger_Voltage} onChange={handleInputChangeFC_01_Charger_Voltage} inputMode="decimal" />, 
           low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Charger_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Charger_Voltage} onChange={handleInputChange2FC_01_Charger_Voltage} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFC_01_Charger_Voltage}
           checked={maintainFC_01_Charger_Voltage}
       ></Checkbox>
  
          },
          {
            mainCategory: mainCategoryFC.FC,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Lithium_Battery_Status} >{FC01_Conn_STT}</span>,
         name: <span style={combineCss.CSSFC_01_Lithium_Battery_Status}>Lithium Battery Status</span> ,

         modbus: <span style={combineCss.CSSFC_01_Lithium_Battery_Status}>5615	 </span> ,

        value: <span style={combineCss.CSSFC_01_Lithium_Battery_Status} > {FC_01_Lithium_Battery_Status} {dataFC_01_Lithium_Battery_Status}</span> , 
         high: <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Lithium_Battery_Status}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Lithium_Battery_Status} onChange={handleInputChangeFC_01_Lithium_Battery_Status} inputMode="decimal" />, 
         low:  <InputText    disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Lithium_Battery_Status}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Lithium_Battery_Status} onChange={handleInputChange2FC_01_Lithium_Battery_Status} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update'  disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainFC_01_Lithium_Battery_Status}
         checked={maintainFC_01_Lithium_Battery_Status}
     ></Checkbox>

        },


         ]
          const combinedData = [...dataEVC01,...dataEVC02,...FC ,...PT_1103_Parameter , ...UPS_Parameter,  ];

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

      const ConfigurationsName ={
        PSV: "Pressure Safety Valve ( PSV-1901)" ,
        PCV1: "Pressure Control Valve (PCV-1901)",
        PCV2: "Pressure Control Valve (PCV-1902)",
        IOT: "IOT getway phone number",
        EVC_01_Battery_Expiration_Date: "EVC-1102 Battery Expiration Date",
        EVC_01_Battery_Installation_Date: "EVC-1102 Battery Installation Date",

    

    }

    const combineCssTime = {
        PCV: {
            height: 25,
            fontWeight: 400,
        },
    };
    const Configurations = [
        {
            Name: <span style={combineCssAttribute.PCV}>PCV-1101 {namePCV_PSV.control} (BarG)</span>,

            Value: (
                <InputText    disabled={AuthInputHighLow}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputPCV_01}
                    onChange={handleInputPCV_01}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthInputHighLow}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>PCV-1102 {namePCV_PSV.control} (BarG)</span>,

            Value: (
                <InputText    disabled={AuthInputHighLow}
                    style={combineCssAttribute.PCV}
                    
                    step="0.1"
                    type="Name"
                    value={inputPCV_02}
                    onChange={handleInputPCV_02}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthInputHighLow}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>PSV-1101 {namePCV_PSV.safety} (BarG)</span>,

            Value: (
                <InputText    disabled={AuthInputHighLow}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputPSV_01}
                    onChange={handleInputPSV_01}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthInputHighLow}
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
                <InputText    disabled={AuthInputHighLow}
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
                    inputMode="decimal"
                />
            ),

            Update:    <Button
            disabled={AuthUpdatePCV}

            className="buttonUpdateSetData"
            style={{ marginTop: 5 }}
            label="Update"
            onClick={confirmUpData}
        />,
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
                    disabled={AuthInput}

                    showTime={false}
                    inputId="timeEVC_02"
                    dateFormat="dd-mm-yy"
                />
            ),
           
            Update: (
                <Button
                disabled={AuthInput}

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  padding:10, borderRadius:10 }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>ZOCV</h2>

    <div style={{width:'100%' ,  borderRadius:5 }}>


    <DataTable     size={'small'}    resizableColumns
        tableStyle={{ minWidth: '50rem' }}     value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" 
                    sortOrder={1}   rowGroupHeaderTemplate={mainCategoryTemplate}   >
  {/* <Column field="modbus" header="Modbus" /> */}
  <Column field="timeUpdate" header="Time Update" />

  <Column field="modbus" header="Modbus" />

  <Column field="name" header="Name" />

  <Column field="value" header="Value" />
  <Column  field="high" header="High" />
  <Column field="low" header="Low" />
  {AuthInput ? " " :  <Column field="Maintain" header={maintainHeader} />
}
      {AuthInput ? " " : <Column field="update" header="Update" />}

</DataTable>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - Configurations </h4>
                <DataTable  resizableColumns
        tableStyle={{ minWidth: '50rem' }}  value={Configurations} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    {AuthInput ? " " : 
                         <Column field="Update" header="Update" />  

}
                </DataTable>
            </div>
</div>

<br />
<br />

</div>
  )
}
