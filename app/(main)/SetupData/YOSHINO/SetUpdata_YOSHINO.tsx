import React, { useEffect, useRef, useState } from 'react'
import { id_YOSHINO} from '../../data-table-device/ID-DEVICE/IdDevice';
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
export default function SetUpdata_YOSHINO() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();

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

    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : '';
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
                    entityId: id_YOSHINO,
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
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_YOSHINO,
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

                        FC_Lithium_Battery_Status: setFC_Lithium_Battery_Status,
                        FC_Battery_Voltage: setFC_Battery_Voltage,
                        FC_System_Voltage: setFC_System_Voltage,
                        FC_Charger_Voltage: setFC_Charger_Voltage,

                        
                        FC_01_Accumulated_Values_Uncorrected_Volume: setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Accumulated_Values_Volume: setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Static_Pressure: setFC_01_Current_Values_Static_Pressure,
                        FC_01_Current_Values_Temperature: setFC_01_Current_Values_Temperature,
                        FC_01_Current_Values_Flow_Rate: setFC_01_Current_Values_Flow_Rate,
                        FC_01_Current_Values_Uncorrected_Flow_Rate: setFC_01_Current_Values_Uncorrected_Flow_Rate,
                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume: setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume: setFC_01_Yesterday_Values_Volume,
                        FC_01_Yesterday_Values_Uncorrected_Volume: setFC_01_Yesterday_Values_Uncorrected_Volume,


                        FC_02_Accumulated_Values_Uncorrected_Volume: setFC_02_Accumulated_Values_Uncorrected_Volume,
                        FC_02_Accumulated_Values_Volume: setFC_02_Accumulated_Values_Volume,
                        FC_02_Current_Values_Static_Pressure: setFC_02_Current_Values_Static_Pressure,
                        FC_02_Current_Values_Temperature: setFC_02_Current_Values_Temperature,
                        FC_02_Current_Values_Flow_Rate: setFC_02_Current_Values_Flow_Rate,
                        FC_02_Current_Values_Uncorrected_Flow_Rate: setFC_02_Current_Values_Uncorrected_Flow_Rate,
                        FC_02_Today_Values_Volume:setFC_02_Today_Values_Volume,
                        FC_02_Today_Values_Uncorrected_Volume:setFC_02_Today_Values_Uncorrected_Volume,
                        FC_02_Yesterday_Values_Volume: setFC_02_Yesterday_Values_Volume,
                        FC_02_Yesterday_Values_Uncorrected_Volume: setFC_02_Yesterday_Values_Uncorrected_Volume,


                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,
                     
                        DI_MAP_1: setDI_MAP_1,
                        DI_UPS_BATTERY: setDI_UPS_BATTERY,
                        DI_UPS_CHARGING: setDI_UPS_CHARGING,
                        DI_UPS_ALARM: setDI_UPS_ALARM,
                        DI_SD_1: setDI_SD_1,
                        DI_SELECT_SW: setDI_SELECT_SW,
                        DI_RESET: setDI_RESET,
                        Emergency_NO: setEmergency_NO,
                        Emergency_NC: setEmergency_NC,
                        UPS_Mode: setUPS_Mode,


                        DO_HR_01: setDO_HR_01,
                        SD: setSD,
                        DO_BC_01: setDO_BC_01,
                        DO_SV_01: setDO_SV_01,

                        PLC_Conn_STT: setPLC_Conn_STT,
                        FC_Conn_STT: setFC_Conn_STT,
                  
                    };
                    const valueStateMap: ValueStateMap = {
                        FC_Conn_STT: setEVC_STT01Value,
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
                fetchData()
            };
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_YOSHINO}/values/attributes/SERVER_SCOPE`
            );


         

            const DO_HR_01_High = res.data.find((item: any) => item.key === "DO_HR_01_High");
            setDO_HR_01_High(DO_HR_01_High?.value || null);
            const DO_HR_01_Low = res.data.find((item: any) => item.key === "DO_HR_01_Low");
            setDO_HR_01_Low(DO_HR_01_Low?.value || null);
            const DO_HR_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_HR_01_Maintain"
            );

            const SD_High = res.data.find((item: any) => item.key === "SD_High");
            setSD_High(SD_High?.value || null);
            const SD_Low = res.data.find((item: any) => item.key === "SD_Low");
            setSD_Low(SD_Low?.value || null);
            const SD_Maintain = res.data.find(
                (item: any) => item.key === "SD_Maintain"
            );


            const DO_BC_01_High = res.data.find((item: any) => item.key === "DO_BC_01_High");
            setDO_BC_01_High(DO_BC_01_High?.value || null);
            const DO_BC_01_Low = res.data.find((item: any) => item.key === "DO_BC_01_Low");
            setDO_BC_01_Low(DO_BC_01_Low?.value || null);
            const DO_BC_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_BC_01_Maintain"
            );

            const DO_SV_01_High = res.data.find((item: any) => item.key === "DO_SV_01_High");
            setDO_SV_01_High(DO_SV_01_High?.value || null);
            const DO_SV_01_Low = res.data.find((item: any) => item.key === "DO_SV_01_Low");
            setDO_SV_01_Low(DO_SV_01_Low?.value || null);
            const DO_SV_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_01_Maintain"
            );

       

            const FC_Lithium_Battery_Status_High = res.data.find((item: any) => item.key === "FC_Lithium_Battery_Status_High");
            setFC_Lithium_Battery_Status_High(FC_Lithium_Battery_Status_High?.value || null);
            const FC_Lithium_Battery_Status_Low = res.data.find((item: any) => item.key === "FC_Lithium_Battery_Status_Low");
            setFC_Lithium_Battery_Status_Low(FC_Lithium_Battery_Status_Low?.value || null);
            const MaintainFC_Lithium_Battery_Status = res.data.find(
                (item: any) => item.key === "FC_Lithium_Battery_Status_Maintain"
            );

            const FC_Battery_Voltage_High = res.data.find((item: any) => item.key === "FC_Battery_Voltage_High");
            setFC_Battery_Voltage_High(FC_Battery_Voltage_High?.value || null);
            const FC_Battery_Voltage_Low = res.data.find((item: any) => item.key === "FC_Battery_Voltage_Low");
            setFC_Battery_Voltage_Low(FC_Battery_Voltage_Low?.value || null);
            const FC_Battery_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_Battery_Voltage_Maintain"
            );

            const FC_System_Voltage_High = res.data.find((item: any) => item.key === "FC_System_Voltage_High");
            setFC_System_Voltage_High(FC_System_Voltage_High?.value || null);
            const FC_System_Voltage_Low = res.data.find((item: any) => item.key === "FC_System_Voltage_Low");
            setFC_System_Voltage_Low(FC_System_Voltage_Low?.value || null);
            const FC_System_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_System_Voltage_Maintain"
            );


            const FC_Charger_Voltage_High = res.data.find((item: any) => item.key === "FC_Charger_Voltage_High");
            setFC_Charger_Voltage_High(FC_Charger_Voltage_High?.value || null);
            const FC_Charger_Voltage_Low = res.data.find((item: any) => item.key === "FC_Charger_Voltage_Low");
            setFC_Charger_Voltage_Low(FC_Charger_Voltage_Low?.value || null);
            const FC_Charger_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_Charger_Voltage_Maintain"
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

            const FC_02_Today_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_02_Today_Values_Uncorrected_Volume_High");
            setFC_02_Today_Values_Uncorrected_Volume_High(FC_02_Today_Values_Uncorrected_Volume_High?.value || null);
            const FC_02_Today_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Today_Values_Uncorrected_Volume_Low");
            setFC_02_Today_Values_Uncorrected_Volume_Low(FC_02_Today_Values_Uncorrected_Volume_Low?.value || null);
            const FC_02_Today_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Today_Values_Uncorrected_Volume_Maintain"
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

            const FC_02_Accumulated_Values_Volume_High = res.data.find((item: any) => item.key === "FC_02_Accumulated_Values_Volume_High");
            setFC_02_Accumulated_Values_Volume_High(FC_02_Accumulated_Values_Volume_High?.value || null);
            const FC_02_Accumulated_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Accumulated_Values_Volume_Low");
            setFC_02_Accumulated_Values_Volume_Low(FC_02_Accumulated_Values_Volume_Low?.value || null);
            const FC_02_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Accumulated_Values_Volume_Maintain"
            );


            const FC_02_Current_Values_Static_Pressure_High = res.data.find((item: any) => item.key === "FC_02_Current_Values_Static_Pressure_High");
            setFC_02_Current_Values_Static_Pressure_High(FC_02_Current_Values_Static_Pressure_High?.value || null);
            const FC_02_Current_Values_Static_Pressure_Low = res.data.find((item: any) => item.key === "FC_02_Current_Values_Static_Pressure_Low");
            setFC_02_Current_Values_Static_Pressure_Low(FC_02_Current_Values_Static_Pressure_Low?.value || null);
            const FC_02_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Static_Pressure_Maintain"
            );

            const FC_02_Current_Values_Temperature_High = res.data.find((item: any) => item.key === "FC_02_Current_Values_Temperature_High");
            setFC_02_Current_Values_Temperature_High(FC_02_Current_Values_Temperature_High?.value || null);
            const FC_02_Current_Values_Temperature_Low = res.data.find((item: any) => item.key === "FC_02_Current_Values_Temperature_Low");
            setFC_02_Current_Values_Temperature_Low(FC_02_Current_Values_Temperature_Low?.value || null);
            const FC_02_Current_Values_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Temperature_Maintain"
            );

            const FC_02_Current_Values_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_02_Current_Values_Flow_Rate_High");
            setFC_02_Current_Values_Flow_Rate_High(FC_02_Current_Values_Flow_Rate_High?.value || null);
            const FC_02_Current_Values_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_02_Current_Values_Flow_Rate_Low");
            setFC_02_Current_Values_Flow_Rate_Low(FC_02_Current_Values_Flow_Rate_Low?.value || null);
            const FC_02_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Flow_Rate_Maintain"
            );


            const FC_02_Current_Values_Uncorrected_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_02_Current_Values_Uncorrected_Flow_Rate_High");
            setFC_02_Current_Values_Uncorrected_Flow_Rate_High(FC_02_Current_Values_Uncorrected_Flow_Rate_High?.value || null);
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_02_Current_Values_Uncorrected_Flow_Rate_Low");
            setFC_02_Current_Values_Uncorrected_Flow_Rate_Low(FC_02_Current_Values_Uncorrected_Flow_Rate_Low?.value || null);
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain"
            );

            const FC_02_Today_Values_Volume_High = res.data.find((item: any) => item.key === "FC_02_Today_Values_Volume_High");
            setFC_02_Today_Values_Volume_High(FC_02_Today_Values_Volume_High?.value || null);
            const FC_02_Today_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Today_Values_Volume_Low");
            setFC_02_Today_Values_Volume_Low(FC_02_Today_Values_Volume_Low?.value || null);
            const FC_02_Today_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Today_Values_Volume_Maintain"
            );


            const FC_02_Accumulated_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_02_Accumulated_Values_Uncorrected_Volume_High");
            setFC_02_Accumulated_Values_Uncorrected_Volume_High(FC_02_Accumulated_Values_Uncorrected_Volume_High?.value || null);
            const FC_02_Accumulated_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Accumulated_Values_Uncorrected_Volume_Low");
            setFC_02_Accumulated_Values_Uncorrected_Volume_Low(FC_02_Accumulated_Values_Uncorrected_Volume_Low?.value || null);
            const FC_02_Accumulated_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Accumulated_Values_Uncorrected_Volume_Maintain"
            );
            const FC_02_Yesterday_Values_Volume_High = res.data.find((item: any) => item.key === "FC_02_Yesterday_Values_Volume_High");
            setFC_02_Yesterday_Values_Volume_High(FC_02_Yesterday_Values_Volume_High?.value || null);
            const FC_02_Yesterday_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_Low");
            setFC_02_Yesterday_Values_Volume_Low(FC_02_Yesterday_Values_Volume_Low?.value || null);
            const MaintainFC_02_Yesterday_Values_Volume = res.data.find(
                (item: any) => item.key === "FC_02_Yesterday_Values_Volume_Maintain"
            );

            const FC_02_Yesterday_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_High");
            setFC_02_Yesterday_Values_Uncorrected_Volume_High(FC_02_Yesterday_Values_Uncorrected_Volume_High?.value || null);
            const FC_02_Yesterday_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_Low");
            setFC_02_Yesterday_Values_Uncorrected_Volume_Low(FC_02_Yesterday_Values_Uncorrected_Volume_Low?.value || null);
            const FC_02_Yesterday_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_Maintain"
            );

            const GD1_High = res.data.find((item: any) => item.key === "GD1_High");
            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find((item: any) => item.key === "GD1_Low");
            setGD1_Low(GD1_Low?.value || null);
            const GD1_Maintain = res.data.find(
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


            const DI_ZSO_2_High = res.data.find((item: any) => item.key === "DI_ZSO_2_High");
            setDI_ZSO_2_High(DI_ZSO_2_High?.value || null);
            const DI_ZSO_2_Low = res.data.find((item: any) => item.key === "DI_ZSO_2_Low");
            setDI_ZSO_2_Low(DI_ZSO_2_Low?.value || null);
            const DI_ZSO_2_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSO_2_Maintain"
            );

            const DI_ZSC_2_High = res.data.find((item: any) => item.key === "DI_ZSC_2_High");
            setDI_ZSC_2_High(DI_ZSC_2_High?.value || null);
            const DI_ZSC_2_Low = res.data.find((item: any) => item.key === "DI_ZSC_2_Low");
            setDI_ZSC_2_Low(DI_ZSC_2_Low?.value || null);
            const DI_ZSC_2_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSC_2_Maintain"
            );

            const DI_MAP_1_High = res.data.find((item: any) => item.key === "DI_MAP_1_High");
            setDI_MAP_1_High(DI_MAP_1_High?.value || null);
            const DI_MAP_1_Low = res.data.find((item: any) => item.key === "DI_MAP_1_Low");
            setDI_MAP_1_Low(DI_MAP_1_Low?.value || null);
            const DI_MAP_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_MAP_1_Maintain"
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

            const DI_SD_1_High = res.data.find((item: any) => item.key === "DI_SD_1_High");
            setDI_SD_1_High(DI_SD_1_High?.value || null);
            const DI_SD_1_Low = res.data.find((item: any) => item.key === "DI_SD_1_Low");
            setDI_SD_1_Low(DI_SD_1_Low?.value || null);
            const DI_SD_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_SD_1_Maintain"
            );

            const DI_SELECT_SW_High = res.data.find((item: any) => item.key === "DI_SELECT_SW_High");
            setDI_SELECT_SW_High(DI_SELECT_SW_High?.value || null);
            const DI_SELECT_SW_Low = res.data.find((item: any) => item.key === "DI_SELECT_SW_Low");
            setDI_SELECT_SW_Low(DI_SELECT_SW_Low?.value || null);
            const DI_SELECT_SW_Maintain = res.data.find(
                (item: any) => item.key === "DI_SELECT_SW_Maintain"
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


            const DI_UPS_BATTERY_High = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
            setDI_UPS_BATTERY_High(DI_UPS_BATTERY_High?.value || null);
            const DI_UPS_BATTERY_Low = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
            setDI_UPS_BATTERY_Low(DI_UPS_BATTERY_Low?.value || null);
            const DI_UPS_BATTERY_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
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


            const FC_Conn_STT_High = res.data.find((item: any) => item.key === "FC_Conn_STT_High");
            setFC_Conn_STT_High(FC_Conn_STT_High?.value || null);
            const FC_Conn_STT_Low = res.data.find((item: any) => item.key === "FC_Conn_STT_Low");
            setFC_Conn_STT_Low(FC_Conn_STT_Low?.value || null);
            const FC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "FC_Conn_STT_Maintain"
            );

            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );
 // =================================================================================================================== 

 setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);


 setMaintainFC_Conn_STT(FC_Conn_STT_Maintain?.value || false);



            setMaintainSD(SD_Maintain?.value || false);
            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);





            setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(FC_02_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_02_Today_Values_Volume(FC_02_Today_Values_Volume_Maintain?.value || false);

            setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Flow_Rate(FC_02_Current_Values_Flow_Rate_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Temperature(FC_02_Current_Values_Temperature_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Static_Pressure(FC_02_Current_Values_Static_Pressure_Maintain?.value || false);


            setMaintainFC_02_Accumulated_Values_Volume(FC_02_Accumulated_Values_Volume_Maintain?.value || false);

            
            setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);
            
            setMaintainFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Maintain?.value || false);

            
            setMaintainFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Maintain?.value || false);






         

            setMaintainFC_02_Today_Values_Uncorrected_Volume(FC_02_Today_Values_Uncorrected_Volume_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Maintain?.value || false);

            setMaintainFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Maintain?.value || false);


            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_Charger_Voltage(FC_Charger_Voltage_Maintain?.value || false);

            setMaintainFC_System_Voltage(FC_System_Voltage_Maintain?.value || false);

            setMaintainFC_Battery_Voltage(FC_Battery_Voltage_Maintain?.value || false);

            setMaintainFC_Lithium_Battery_Status(MaintainFC_Lithium_Battery_Status?.value || false);


            setMaintainFC_02_Yesterday_Values_Volume(MaintainFC_02_Yesterday_Values_Volume?.value || false);


            setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(FC_02_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainGD1(GD1_Maintain?.value || false);


            setMaintainGD2(GD2_Maintain?.value || false);


            setMaintainPT1(PT1_Maintain?.value || false);


            setMaintainDI_ZSO_1(DI_ZSO_1_Maintain?.value || false);


            setMaintainUPS_Mode(UPS_Mode_Maintain?.value || false);

            
            setMaintainEmergency_NC(Emergency_NC_Maintain?.value || false);
            
            setMaintainDI_UPS_BATTERY(DI_UPS_BATTERY_Maintain?.value || false);

            
            setMaintainEmergency_NO(Emergency_NO_Maintain?.value || false);

            setMaintainDI_RESET(DI_RESET_Maintain?.value || false);


            setMaintainDI_SELECT_SW(DI_SELECT_SW_Maintain?.value || false);

            setMaintainDI_SD_1(DI_SD_1_Maintain?.value || false);

            setMaintainDI_UPS_ALARM(DI_UPS_ALARM_Maintain?.value || false);


            setMaintainDI_UPS_CHARGING(DI_UPS_CHARGING_Maintain?.value || false);

            setMaintainDI_MAP_1(DI_MAP_1_Maintain?.value || false);


            setMaintainDI_ZSC_2(DI_ZSC_2_Maintain?.value || false);

            setMaintainDI_ZSO_2(DI_ZSO_2_Maintain?.value || false);


            setMaintainDI_ZSC_1(DI_ZSC_1_Maintain?.value || false);




            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [FC_Lithium_Battery_Status, setFC_Lithium_Battery_Status] = useState<string | null>(null);
const [audioPlayingFC_Lithium_Battery_Status, setAudioPlayingFC_Lithium_Battery_Status] = useState(false);
const [inputValueFC_Lithium_Battery_Status, setInputValueFC_Lithium_Battery_Status] = useState<any>();
const [inputValue2FC_Lithium_Battery_Status, setInputValue2FC_Lithium_Battery_Status] = useState<any>();
const [FC_Lithium_Battery_Status_High, setFC_Lithium_Battery_Status_High] = useState<number | null>(null);
const [FC_Lithium_Battery_Status_Low, setFC_Lithium_Battery_Status_Low] = useState<number | null>(null);
const [exceedThresholdFC_Lithium_Battery_Status, setExceedThresholdFC_Lithium_Battery_Status] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_Lithium_Battery_Status, setMaintainFC_Lithium_Battery_Status] = useState<boolean>(false);


useEffect(() => {
    const FC_Lithium_Battery_StatusValue = parseFloat(FC_Lithium_Battery_Status as any);
    const highValue = FC_Lithium_Battery_Status_High ?? NaN;
    const lowValue = FC_Lithium_Battery_Status_Low ?? NaN;

    if (!isNaN(FC_Lithium_Battery_StatusValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_Lithium_Battery_Status) {
        setExceedThresholdFC_Lithium_Battery_Status(FC_Lithium_Battery_StatusValue >= highValue || FC_Lithium_Battery_StatusValue <= lowValue);
    }
}, [FC_Lithium_Battery_Status, FC_Lithium_Battery_Status_High, FC_Lithium_Battery_Status_Low, maintainFC_Lithium_Battery_Status]);


    const handleInputChangeFC_Lithium_Battery_Status = (event: any) => {
        const newValue = event.target.value;
        setInputValueFC_Lithium_Battery_Status(newValue);
    };

    const handleInputChange2FC_Lithium_Battery_Status = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2FC_Lithium_Battery_Status(newValue2);
    };
    const ChangeMaintainFC_Lithium_Battery_Status = async () => {
        try {
            const newValue = !maintainFC_Lithium_Battery_Status;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                { FC_Lithium_Battery_Status_Maintain: newValue }
            );
            setMaintainFC_Lithium_Battery_Status(newValue);
            
        } catch (error) {}
    };


     // =================================================================================================================== 

     const [FC_Battery_Voltage, setFC_Battery_Voltage] = useState<string | null>(null);
     const [audioPlayingFC_Battery_Voltage, setAudioPlayingFC_Battery_Voltage] = useState(false);
     const [inputValueFC_Battery_Voltage, setInputValueFC_Battery_Voltage] = useState<any>();
     const [inputValue2FC_Battery_Voltage, setInputValue2FC_Battery_Voltage] = useState<any>();
     const [FC_Battery_Voltage_High, setFC_Battery_Voltage_High] = useState<number | null>(null);
     const [FC_Battery_Voltage_Low, setFC_Battery_Voltage_Low] = useState<number | null>(null);
     const [exceedThresholdFC_Battery_Voltage, setExceedThresholdFC_Battery_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_Battery_Voltage, setMaintainFC_Battery_Voltage] = useState<boolean>(false);
     
     
     useEffect(() => {
        const FC_Battery_VoltageValue = parseFloat(FC_Battery_Voltage as any);
        const highValue = FC_Battery_Voltage_High ?? NaN;
        const lowValue = FC_Battery_Voltage_Low ?? NaN;
    
        if (!isNaN(FC_Battery_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_Battery_Voltage) {
            setExceedThresholdFC_Battery_Voltage(FC_Battery_VoltageValue >= highValue || FC_Battery_VoltageValue <= lowValue);
        }
    }, [FC_Battery_Voltage, FC_Battery_Voltage_High, FC_Battery_Voltage_Low, maintainFC_Battery_Voltage]);
    
    
     
         const handleInputChangeFC_Battery_Voltage = (event: any) => {
             const newValue = event.target.value;
             setInputValueFC_Battery_Voltage(newValue);
         };
     
         const handleInputChange2FC_Battery_Voltage = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2FC_Battery_Voltage(newValue2);
         };
         const ChangeMaintainFC_Battery_Voltage = async () => {
             try {
                 const newValue = !maintainFC_Battery_Voltage;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                     { FC_Battery_Voltage_Maintain: newValue }
                 );
                 setMaintainFC_Battery_Voltage(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 


     const [FC_System_Voltage, setFC_System_Voltage] = useState<string | null>(null);
     const [audioPlayingFC_System_Voltage, setAudioPlayingFC_System_Voltage] = useState(false);
     const [inputValueFC_System_Voltage, setInputValueFC_System_Voltage] = useState<any>();
     const [inputValue2FC_System_Voltage, setInputValue2FC_System_Voltage] = useState<any>();
     const [FC_System_Voltage_High, setFC_System_Voltage_High] = useState<number | null>(null);
     const [FC_System_Voltage_Low, setFC_System_Voltage_Low] = useState<number | null>(null);
     const [exceedThresholdFC_System_Voltage, setExceedThresholdFC_System_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_System_Voltage, setMaintainFC_System_Voltage] = useState<boolean>(false);
     
     
     useEffect(() => {
        const FC_System_VoltageValue = parseFloat(FC_System_Voltage as any);
        const highValue = FC_System_Voltage_High ?? NaN;
        const lowValue = FC_System_Voltage_Low ?? NaN;
    
        if (!isNaN(FC_System_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_System_Voltage) {
            setExceedThresholdFC_System_Voltage(FC_System_VoltageValue >= highValue || FC_System_VoltageValue <= lowValue);
        }
    }, [FC_System_Voltage, FC_System_Voltage_High, FC_System_Voltage_Low, maintainFC_System_Voltage]);
    
    
     
         const handleInputChangeFC_System_Voltage = (event: any) => {
             const newValue = event.target.value;
             setInputValueFC_System_Voltage(newValue);
         };
     
         const handleInputChange2FC_System_Voltage = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2FC_System_Voltage(newValue2);
         };
         const ChangeMaintainFC_System_Voltage = async () => {
             try {
                 const newValue = !maintainFC_System_Voltage;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                     { FC_System_Voltage_Maintain: newValue }
                 );
                 setMaintainFC_System_Voltage(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 



          const [FC_Charger_Voltage, setFC_Charger_Voltage] = useState<string | null>(null);
          const [audioPlayingFC_Charger_Voltage, setAudioPlayingFC_Charger_Voltage] = useState(false);
          const [inputValueFC_Charger_Voltage, setInputValueFC_Charger_Voltage] = useState<any>();
          const [inputValue2FC_Charger_Voltage, setInputValue2FC_Charger_Voltage] = useState<any>();
          const [FC_Charger_Voltage_High, setFC_Charger_Voltage_High] = useState<number | null>(null);
          const [FC_Charger_Voltage_Low, setFC_Charger_Voltage_Low] = useState<number | null>(null);
          const [exceedThresholdFC_Charger_Voltage, setExceedThresholdFC_Charger_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_Charger_Voltage, setMaintainFC_Charger_Voltage] = useState<boolean>(false);
          
          
          useEffect(() => {
            const FC_Charger_VoltageValue = parseFloat(FC_Charger_Voltage as any);
            const highValue = FC_Charger_Voltage_High ?? NaN;
            const lowValue = FC_Charger_Voltage_Low ?? NaN;
        
            if (!isNaN(FC_Charger_VoltageValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_Charger_Voltage) {
                setExceedThresholdFC_Charger_Voltage(FC_Charger_VoltageValue >= highValue || FC_Charger_VoltageValue <= lowValue);
            }
        }, [FC_Charger_Voltage, FC_Charger_Voltage_High, FC_Charger_Voltage_Low, maintainFC_Charger_Voltage]);
        
        
          
              const handleInputChangeFC_Charger_Voltage = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueFC_Charger_Voltage(newValue);
              };
          
              const handleInputChange2FC_Charger_Voltage = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2FC_Charger_Voltage(newValue2);
              };
              const ChangeMaintainFC_Charger_Voltage = async () => {
                  try {
                      const newValue = !maintainFC_Charger_Voltage;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_Charger_Voltage_Maintain: newValue }
                      );
                      setMaintainFC_Charger_Voltage(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [FC_01_Accumulated_Values_Uncorrected_Volume, setFC_01_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);
          const [audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume, setAudioPlayingFC_01_Accumulated_Values_Uncorrected_Volume] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Accumulated_Values_Uncorrected_Volume_Maintain: newValue }
                      );
                      setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Accumulated_Values_Volume, setFC_01_Accumulated_Values_Volume] = useState<string | null>(null);
          const [audioPlayingFC_01_Accumulated_Values_Volume, setAudioPlayingFC_01_Accumulated_Values_Volume] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Accumulated_Values_Volume_Maintain: newValue }
                      );
                      setMaintainFC_01_Accumulated_Values_Volume(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [FC_01_Current_Values_Flow_Rate, setFC_01_Current_Values_Flow_Rate] = useState<string | null>(null);
          const [audioPlayingFC_01_Current_Values_Flow_Rate, setAudioPlayingFC_01_Current_Values_Flow_Rate] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Flow_Rate_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Flow_Rate(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Temperature, setFC_01_Current_Values_Temperature] = useState<string | null>(null);
          const [audioPlayingFC_01_Current_Values_Temperature, setAudioPlayingFC_01_Current_Values_Temperature] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Temperature_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Temperature(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Static_Pressure, setFC_01_Current_Values_Static_Pressure] = useState<string | null>(null);
          const [audioPlayingFC_01_Current_Values_Static_Pressure, setAudioPlayingFC_01_Current_Values_Static_Pressure] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Static_Pressure_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Static_Pressure(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Uncorrected_Flow_Rate, setFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<string | null>(null);
          const [audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate, setAudioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate] = useState(false);
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
                          `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                          { FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain: newValue }
                      );
                      setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(newValue);
                      
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
                    `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                    `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                    { FC_01_Yesterday_Values_Uncorrected_Volume_Maintain: newValue }
                );
                setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

const [FC_02_Accumulated_Values_Uncorrected_Volume, setFC_02_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);
const [audioPlayingFC_02_Accumulated_Values_Uncorrected_Volume, setAudioPlayingFC_02_Accumulated_Values_Uncorrected_Volume] = useState(false);
const [inputValueFC_02_Accumulated_Values_Uncorrected_Volume, setInputValueFC_02_Accumulated_Values_Uncorrected_Volume] = useState<any>();
const [inputValue2FC_02_Accumulated_Values_Uncorrected_Volume, setInputValue2FC_02_Accumulated_Values_Uncorrected_Volume] = useState<any>();
const [FC_02_Accumulated_Values_Uncorrected_Volume_High, setFC_02_Accumulated_Values_Uncorrected_Volume_High] = useState<number | null>(null);
const [FC_02_Accumulated_Values_Uncorrected_Volume_Low, setFC_02_Accumulated_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
const [exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume, setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_02_Accumulated_Values_Uncorrected_Volume, setMaintainFC_02_Accumulated_Values_Uncorrected_Volume] = useState<boolean>(false);


useEffect(() => {
    const FC_02_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Accumulated_Values_Uncorrected_Volume as any);
    const highValue = FC_02_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
    const lowValue = FC_02_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;

    if (!isNaN(FC_02_Accumulated_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Accumulated_Values_Uncorrected_Volume) {
        setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume(FC_02_Accumulated_Values_Uncorrected_VolumeValue >= highValue || FC_02_Accumulated_Values_Uncorrected_VolumeValue <= lowValue);
    }
}, [FC_02_Accumulated_Values_Uncorrected_Volume, FC_02_Accumulated_Values_Uncorrected_Volume_High, FC_02_Accumulated_Values_Uncorrected_Volume_Low, maintainFC_02_Accumulated_Values_Uncorrected_Volume]);


    const handleInputChangeFC_02_Accumulated_Values_Uncorrected_Volume = (event: any) => {
        const newValue = event.target.value;
        setInputValueFC_02_Accumulated_Values_Uncorrected_Volume(newValue);
    };

    const handleInputChange2FC_02_Accumulated_Values_Uncorrected_Volume = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2FC_02_Accumulated_Values_Uncorrected_Volume(newValue2);
    };
    const ChangeMaintainFC_02_Accumulated_Values_Uncorrected_Volume = async () => {
        try {
            const newValue = !maintainFC_02_Accumulated_Values_Uncorrected_Volume;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                { FC_02_Accumulated_Values_Uncorrected_Volume_Maintain: newValue }
            );
            setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 


const [FC_02_Accumulated_Values_Volume, setFC_02_Accumulated_Values_Volume] = useState<string | null>(null);
const [audioPlayingFC_02_Accumulated_Values_Volume, setAudioPlayingFC_02_Accumulated_Values_Volume] = useState(false);
const [inputValueFC_02_Accumulated_Values_Volume, setInputValueFC_02_Accumulated_Values_Volume] = useState<any>();
const [inputValue2FC_02_Accumulated_Values_Volume, setInputValue2FC_02_Accumulated_Values_Volume] = useState<any>();
const [FC_02_Accumulated_Values_Volume_High, setFC_02_Accumulated_Values_Volume_High] = useState<number | null>(null);
const [FC_02_Accumulated_Values_Volume_Low, setFC_02_Accumulated_Values_Volume_Low] = useState<number | null>(null);
const [exceedThresholdFC_02_Accumulated_Values_Volume, setExceedThresholdFC_02_Accumulated_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_02_Accumulated_Values_Volume, setMaintainFC_02_Accumulated_Values_Volume] = useState<boolean>(false);


useEffect(() => {
    const FC_02_Accumulated_Values_VolumeValue = parseFloat(FC_02_Accumulated_Values_Volume as any);
    const highValue = FC_02_Accumulated_Values_Volume_High ?? NaN;
    const lowValue = FC_02_Accumulated_Values_Volume_Low ?? NaN;

    if (!isNaN(FC_02_Accumulated_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Accumulated_Values_Volume) {
        setExceedThresholdFC_02_Accumulated_Values_Volume(FC_02_Accumulated_Values_VolumeValue >= highValue || FC_02_Accumulated_Values_VolumeValue <= lowValue);
    }
}, [FC_02_Accumulated_Values_Volume, FC_02_Accumulated_Values_Volume_High, FC_02_Accumulated_Values_Volume_Low, maintainFC_02_Accumulated_Values_Volume]);


    const handleInputChangeFC_02_Accumulated_Values_Volume = (event: any) => {
        const newValue = event.target.value;
        setInputValueFC_02_Accumulated_Values_Volume(newValue);
    };

    const handleInputChange2FC_02_Accumulated_Values_Volume = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2FC_02_Accumulated_Values_Volume(newValue2);
    };
    const ChangeMaintainFC_02_Accumulated_Values_Volume = async () => {
        try {
            const newValue = !maintainFC_02_Accumulated_Values_Volume;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                { FC_02_Accumulated_Values_Volume_Maintain: newValue }
            );
            setMaintainFC_02_Accumulated_Values_Volume(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 

    // =================================================================================================================== 

const [FC_02_Current_Values_Static_Pressure, setFC_02_Current_Values_Static_Pressure] = useState<string | null>(null);
const [audioPlayingFC_02_Current_Values_Static_Pressure, setAudioPlayingFC_02_Current_Values_Static_Pressure] = useState(false);
const [inputValueFC_02_Current_Values_Static_Pressure, setInputValueFC_02_Current_Values_Static_Pressure] = useState<any>();
const [inputValue2FC_02_Current_Values_Static_Pressure, setInputValue2FC_02_Current_Values_Static_Pressure] = useState<any>();
const [FC_02_Current_Values_Static_Pressure_High, setFC_02_Current_Values_Static_Pressure_High] = useState<number | null>(null);
const [FC_02_Current_Values_Static_Pressure_Low, setFC_02_Current_Values_Static_Pressure_Low] = useState<number | null>(null);
const [exceedThresholdFC_02_Current_Values_Static_Pressure, setExceedThresholdFC_02_Current_Values_Static_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_02_Current_Values_Static_Pressure, setMaintainFC_02_Current_Values_Static_Pressure] = useState<boolean>(false);



useEffect(() => {
    const FC_02_Current_Values_Static_PressureValue = parseFloat(FC_02_Current_Values_Static_Pressure as any);
    const highValue = FC_02_Current_Values_Static_Pressure_High ?? NaN;
    const lowValue = FC_02_Current_Values_Static_Pressure_Low ?? NaN;

    if (!isNaN(FC_02_Current_Values_Static_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Current_Values_Static_Pressure) {
        setExceedThresholdFC_02_Current_Values_Static_Pressure(FC_02_Current_Values_Static_PressureValue >= highValue || FC_02_Current_Values_Static_PressureValue <= lowValue);
    }
}, [FC_02_Current_Values_Static_Pressure, FC_02_Current_Values_Static_Pressure_High, FC_02_Current_Values_Static_Pressure_Low, maintainFC_02_Current_Values_Static_Pressure]);


const handleInputChangeFC_02_Current_Values_Static_Pressure = (event: any) => {
    const newValue = event.target.value;
    setInputValueFC_02_Current_Values_Static_Pressure(newValue);
};

const handleInputChange2FC_02_Current_Values_Static_Pressure = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2FC_02_Current_Values_Static_Pressure(newValue2);
};
const ChangeMaintainFC_02_Current_Values_Static_Pressure = async () => {
    try {
        const newValue = !maintainFC_02_Current_Values_Static_Pressure;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
            { FC_02_Current_Values_Static_Pressure_Maintain: newValue }
        );
        setMaintainFC_02_Current_Values_Static_Pressure(newValue);
        
    } catch (error) {}
};


// =================================================================================================================== 


        // =================================================================================================================== 

        const [FC_02_Current_Values_Temperature, setFC_02_Current_Values_Temperature] = useState<string | null>(null);
        const [audioPlayingFC_02_Current_Values_Temperature, setAudioPlayingFC_02_Current_Values_Temperature] = useState(false);
        const [inputValueFC_02_Current_Values_Temperature, setInputValueFC_02_Current_Values_Temperature] = useState<any>();
        const [inputValue2FC_02_Current_Values_Temperature, setInputValue2FC_02_Current_Values_Temperature] = useState<any>();
        const [FC_02_Current_Values_Temperature_High, setFC_02_Current_Values_Temperature_High] = useState<number | null>(null);
        const [FC_02_Current_Values_Temperature_Low, setFC_02_Current_Values_Temperature_Low] = useState<number | null>(null);
        const [exceedThresholdFC_02_Current_Values_Temperature, setExceedThresholdFC_02_Current_Values_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainFC_02_Current_Values_Temperature, setMaintainFC_02_Current_Values_Temperature] = useState<boolean>(false);
        
        useEffect(() => {
            const FC_02_Current_Values_TemperatureValue = parseFloat(FC_02_Current_Values_Temperature as any);
            const highValue = FC_02_Current_Values_Temperature_High ?? NaN;
            const lowValue = FC_02_Current_Values_Temperature_Low ?? NaN;
        
            if (!isNaN(FC_02_Current_Values_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Current_Values_Temperature) {
                setExceedThresholdFC_02_Current_Values_Temperature(FC_02_Current_Values_TemperatureValue >= highValue || FC_02_Current_Values_TemperatureValue <= lowValue);
            }
        }, [FC_02_Current_Values_Temperature, FC_02_Current_Values_Temperature_High, FC_02_Current_Values_Temperature_Low, maintainFC_02_Current_Values_Temperature]);
        
        
            const handleInputChangeFC_02_Current_Values_Temperature = (event: any) => {
                const newValue = event.target.value;
                setInputValueFC_02_Current_Values_Temperature(newValue);
            };
        
            const handleInputChange2FC_02_Current_Values_Temperature = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2FC_02_Current_Values_Temperature(newValue2);
            };
            const ChangeMaintainFC_02_Current_Values_Temperature = async () => {
                try {
                    const newValue = !maintainFC_02_Current_Values_Temperature;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                        { FC_02_Current_Values_Temperature_Maintain: newValue }
                    );
                    setMaintainFC_02_Current_Values_Temperature(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
        
        const [FC_02_Current_Values_Flow_Rate, setFC_02_Current_Values_Flow_Rate] = useState<string | null>(null);
        const [audioPlayingFC_02_Current_Values_Flow_Rate, setAudioPlayingFC_02_Current_Values_Flow_Rate] = useState(false);
        const [inputValueFC_02_Current_Values_Flow_Rate, setInputValueFC_02_Current_Values_Flow_Rate] = useState<any>();
        const [inputValue2FC_02_Current_Values_Flow_Rate, setInputValue2FC_02_Current_Values_Flow_Rate] = useState<any>();
        const [FC_02_Current_Values_Flow_Rate_High, setFC_02_Current_Values_Flow_Rate_High] = useState<number | null>(null);
        const [FC_02_Current_Values_Flow_Rate_Low, setFC_02_Current_Values_Flow_Rate_Low] = useState<number | null>(null);
        const [exceedThresholdFC_02_Current_Values_Flow_Rate, setExceedThresholdFC_02_Current_Values_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainFC_02_Current_Values_Flow_Rate, setMaintainFC_02_Current_Values_Flow_Rate] = useState<boolean>(false);
        
        
        useEffect(() => {
            const FC_02_Current_Values_Flow_RateValue = parseFloat(FC_02_Current_Values_Flow_Rate as any);
            const highValue = FC_02_Current_Values_Flow_Rate_High ?? NaN;
            const lowValue = FC_02_Current_Values_Flow_Rate_Low ?? NaN;
        
            if (!isNaN(FC_02_Current_Values_Flow_RateValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Current_Values_Flow_Rate) {
                setExceedThresholdFC_02_Current_Values_Flow_Rate(FC_02_Current_Values_Flow_RateValue >= highValue || FC_02_Current_Values_Flow_RateValue <= lowValue);
            }
        }, [FC_02_Current_Values_Flow_Rate, FC_02_Current_Values_Flow_Rate_High, FC_02_Current_Values_Flow_Rate_Low, maintainFC_02_Current_Values_Flow_Rate]);
        
        
        
            const handleInputChangeFC_02_Current_Values_Flow_Rate = (event: any) => {
                const newValue = event.target.value;
                setInputValueFC_02_Current_Values_Flow_Rate(newValue);
            };
        
            const handleInputChange2FC_02_Current_Values_Flow_Rate = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2FC_02_Current_Values_Flow_Rate(newValue2);
            };
            const ChangeMaintainFC_02_Current_Values_Flow_Rate = async () => {
                try {
                    const newValue = !maintainFC_02_Current_Values_Flow_Rate;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                        { FC_02_Current_Values_Flow_Rate_Maintain: newValue }
                    );
                    setMaintainFC_02_Current_Values_Flow_Rate(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [FC_02_Current_Values_Uncorrected_Flow_Rate, setFC_02_Current_Values_Uncorrected_Flow_Rate] = useState<string | null>(null);
        const [audioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate, setAudioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate] = useState(false);
        const [inputValueFC_02_Current_Values_Uncorrected_Flow_Rate, setInputValueFC_02_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
        const [inputValue2FC_02_Current_Values_Uncorrected_Flow_Rate, setInputValue2FC_02_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
        const [FC_02_Current_Values_Uncorrected_Flow_Rate_High, setFC_02_Current_Values_Uncorrected_Flow_Rate_High] = useState<number | null>(null);
        const [FC_02_Current_Values_Uncorrected_Flow_Rate_Low, setFC_02_Current_Values_Uncorrected_Flow_Rate_Low] = useState<number | null>(null);
        const [exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate, setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainFC_02_Current_Values_Uncorrected_Flow_Rate, setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate] = useState<boolean>(false);
        
        
        useEffect(() => {
            const FC_02_Current_Values_Uncorrected_Flow_RateValue = parseFloat(FC_02_Current_Values_Uncorrected_Flow_Rate as any);
            const highValue = FC_02_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
            const lowValue = FC_02_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;
        
            if (!isNaN(FC_02_Current_Values_Uncorrected_Flow_RateValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Current_Values_Uncorrected_Flow_Rate) {
                setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate(FC_02_Current_Values_Uncorrected_Flow_RateValue >= highValue || FC_02_Current_Values_Uncorrected_Flow_RateValue <= lowValue);
            }
        }, [FC_02_Current_Values_Uncorrected_Flow_Rate, FC_02_Current_Values_Uncorrected_Flow_Rate_High, FC_02_Current_Values_Uncorrected_Flow_Rate_Low, maintainFC_02_Current_Values_Uncorrected_Flow_Rate]);
        
        
        const handleInputChangeFC_02_Current_Values_Uncorrected_Flow_Rate = (event: any) => {
            const newValue = event.target.value;
            setInputValueFC_02_Current_Values_Uncorrected_Flow_Rate(newValue);
        };
        
        const handleInputChange2FC_02_Current_Values_Uncorrected_Flow_Rate = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2FC_02_Current_Values_Uncorrected_Flow_Rate(newValue2);
        };
        const ChangeMaintainFC_02_Current_Values_Uncorrected_Flow_Rate = async () => {
            try {
                const newValue = !maintainFC_02_Current_Values_Uncorrected_Flow_Rate;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                    { FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain: newValue }
                );
                setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(newValue);
                
            } catch (error) {}
        };
        
        
        // =================================================================================================================== 
        

            // =================================================================================================================== 
        
            const [FC_02_Today_Values_Volume, setFC_02_Today_Values_Volume] = useState<string | null>(null);
            const [audioPlayingFC_02_Today_Values_Volume, setAudioPlayingFC_02_Today_Values_Volume] = useState(false);
            const [inputValueFC_02_Today_Values_Volume, setInputValueFC_02_Today_Values_Volume] = useState<any>();
            const [inputValue2FC_02_Today_Values_Volume, setInputValue2FC_02_Today_Values_Volume] = useState<any>();
            const [FC_02_Today_Values_Volume_High, setFC_02_Today_Values_Volume_High] = useState<number | null>(null);
            const [FC_02_Today_Values_Volume_Low, setFC_02_Today_Values_Volume_Low] = useState<number | null>(null);
            const [exceedThresholdFC_02_Today_Values_Volume, setExceedThresholdFC_02_Today_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainFC_02_Today_Values_Volume, setMaintainFC_02_Today_Values_Volume] = useState<boolean>(false);
            
            useEffect(() => {
                const FC_02_Today_Values_VolumeValue = parseFloat(FC_02_Today_Values_Volume as any);
                const highValue = FC_02_Today_Values_Volume_High ?? NaN;
                const lowValue = FC_02_Today_Values_Volume_Low ?? NaN;
            
                if (!isNaN(FC_02_Today_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Today_Values_Volume) {
                    setExceedThresholdFC_02_Today_Values_Volume(FC_02_Today_Values_VolumeValue >= highValue || FC_02_Today_Values_VolumeValue <= lowValue);
                }
            }, [FC_02_Today_Values_Volume, FC_02_Today_Values_Volume_High, FC_02_Today_Values_Volume_Low, maintainFC_02_Today_Values_Volume]);
            
            
            
            const handleInputChangeFC_02_Today_Values_Volume = (event: any) => {
                const newValue = event.target.value;
                setInputValueFC_02_Today_Values_Volume(newValue);
            };
            
            const handleInputChange2FC_02_Today_Values_Volume = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2FC_02_Today_Values_Volume(newValue2);
            };
            const ChangeMaintainFC_02_Today_Values_Volume = async () => {
                try {
                    const newValue = !maintainFC_02_Today_Values_Volume;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                        { FC_02_Today_Values_Volume_Maintain: newValue }
                    );
                    setMaintainFC_02_Today_Values_Volume(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 



            // =================================================================================================================== 
        
            const [FC_02_Today_Values_Uncorrected_Volume, setFC_02_Today_Values_Uncorrected_Volume] = useState<string | null>(null);
            const [audioPlayingFC_02_Today_Values_Uncorrected_Volume, setAudioPlayingFC_02_Today_Values_Uncorrected_Volume] = useState(false);
            const [inputValueFC_02_Today_Values_Uncorrected_Volume, setInputValueFC_02_Today_Values_Uncorrected_Volume] = useState<any>();
            const [inputValue2FC_02_Today_Values_Uncorrected_Volume, setInputValue2FC_02_Today_Values_Uncorrected_Volume] = useState<any>();
            const [FC_02_Today_Values_Uncorrected_Volume_High, setFC_02_Today_Values_Uncorrected_Volume_High] = useState<number | null>(null);
            const [FC_02_Today_Values_Uncorrected_Volume_Low, setFC_02_Today_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
            const [exceedThresholdFC_02_Today_Values_Uncorrected_Volume, setExceedThresholdFC_02_Today_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainFC_02_Today_Values_Uncorrected_Volume, setMaintainFC_02_Today_Values_Uncorrected_Volume] = useState<boolean>(false);
            
            
            useEffect(() => {
                const FC_02_Today_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Today_Values_Uncorrected_Volume as any);
                const highValue = FC_02_Today_Values_Uncorrected_Volume_High ?? NaN;
                const lowValue = FC_02_Today_Values_Uncorrected_Volume_Low ?? NaN;
            
                if (!isNaN(FC_02_Today_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Today_Values_Uncorrected_Volume) {
                    setExceedThresholdFC_02_Today_Values_Uncorrected_Volume(FC_02_Today_Values_Uncorrected_VolumeValue >= highValue || FC_02_Today_Values_Uncorrected_VolumeValue <= lowValue);
                }
            }, [FC_02_Today_Values_Uncorrected_Volume, FC_02_Today_Values_Uncorrected_Volume_High, FC_02_Today_Values_Uncorrected_Volume_Low, maintainFC_02_Today_Values_Uncorrected_Volume]);
            
            
            
            const handleInputChangeFC_02_Today_Values_Uncorrected_Volume = (event: any) => {
                const newValue = event.target.value;
                setInputValueFC_02_Today_Values_Uncorrected_Volume(newValue);
            };
            
            const handleInputChange2FC_02_Today_Values_Uncorrected_Volume = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2FC_02_Today_Values_Uncorrected_Volume(newValue2);
            };
            const ChangeMaintainFC_02_Today_Values_Uncorrected_Volume = async () => {
                try {
                    const newValue = !maintainFC_02_Today_Values_Uncorrected_Volume;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                        { FC_02_Today_Values_Uncorrected_Volume_Maintain: newValue }
                    );
                    setMaintainFC_02_Today_Values_Uncorrected_Volume(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 

 // =================================================================================================================== 

 const [FC_02_Yesterday_Values_Volume, setFC_02_Yesterday_Values_Volume] = useState<string | null>(null);
 const [audioPlayingFC_02_Yesterday_Values_Volume, setAudioPlayingFC_02_Yesterday_Values_Volume] = useState(false);
 const [inputValueFC_02_Yesterday_Values_Volume, setInputValueFC_02_Yesterday_Values_Volume] = useState<any>();
 const [inputValue2FC_02_Yesterday_Values_Volume, setInputValue2FC_02_Yesterday_Values_Volume] = useState<any>();
 const [FC_02_Yesterday_Values_Volume_High, setFC_02_Yesterday_Values_Volume_High] = useState<number | null>(null);
 const [FC_02_Yesterday_Values_Volume_Low, setFC_02_Yesterday_Values_Volume_Low] = useState<number | null>(null);
 const [exceedThresholdFC_02_Yesterday_Values_Volume, setExceedThresholdFC_02_Yesterday_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainFC_02_Yesterday_Values_Volume, setMaintainFC_02_Yesterday_Values_Volume] = useState<boolean>(false);
 
 
 useEffect(() => {
    const FC_02_Yesterday_Values_VolumeValue = parseFloat(FC_02_Yesterday_Values_Volume as any);
    const highValue = FC_02_Yesterday_Values_Volume_High ?? NaN;
    const lowValue = FC_02_Yesterday_Values_Volume_Low ?? NaN;

    if (!isNaN(FC_02_Yesterday_Values_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Yesterday_Values_Volume) {
        setExceedThresholdFC_02_Yesterday_Values_Volume(FC_02_Yesterday_Values_VolumeValue >= highValue || FC_02_Yesterday_Values_VolumeValue <= lowValue);
    }
}, [FC_02_Yesterday_Values_Volume, FC_02_Yesterday_Values_Volume_High, FC_02_Yesterday_Values_Volume_Low, maintainFC_02_Yesterday_Values_Volume]);


 
     const handleInputChangeFC_02_Yesterday_Values_Volume = (event: any) => {
         const newValue = event.target.value;
         setInputValueFC_02_Yesterday_Values_Volume(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2FC_02_Yesterday_Values_Volume(newValue2);
     };
     const ChangeMaintainFC_02_Yesterday_Values_Volume = async () => {
         try {
             const newValue = !maintainFC_02_Yesterday_Values_Volume;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                 { FC_02_Yesterday_Values_Volume_Maintain: newValue }
             );
             setMaintainFC_02_Yesterday_Values_Volume(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [FC_02_Yesterday_Values_Uncorrected_Volume, setFC_02_Yesterday_Values_Uncorrected_Volume] = useState<string | null>(null);
      const [audioPlayingFC_02_Yesterday_Values_Uncorrected_Volume, setAudioPlayingFC_02_Yesterday_Values_Uncorrected_Volume] = useState(false);
      const [inputValueFC_02_Yesterday_Values_Uncorrected_Volume, setInputValueFC_02_Yesterday_Values_Uncorrected_Volume] = useState<any>();
      const [inputValue2FC_02_Yesterday_Values_Uncorrected_Volume, setInputValue2FC_02_Yesterday_Values_Uncorrected_Volume] = useState<any>();
      const [FC_02_Yesterday_Values_Uncorrected_Volume_High, setFC_02_Yesterday_Values_Uncorrected_Volume_High] = useState<number | null>(null);
      const [FC_02_Yesterday_Values_Uncorrected_Volume_Low, setFC_02_Yesterday_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
      const [exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume, setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainFC_02_Yesterday_Values_Uncorrected_Volume, setMaintainFC_02_Yesterday_Values_Uncorrected_Volume] = useState<boolean>(false);
      
      
   
 useEffect(() => {
    const FC_02_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume as any);
    const highValue = FC_02_Yesterday_Values_Uncorrected_Volume_High ?? NaN;
    const lowValue = FC_02_Yesterday_Values_Uncorrected_Volume_Low ?? NaN;

    if (!isNaN(FC_02_Yesterday_Values_Uncorrected_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_02_Yesterday_Values_Uncorrected_Volume) {
        setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume(FC_02_Yesterday_Values_Uncorrected_VolumeValue >= highValue || FC_02_Yesterday_Values_Uncorrected_VolumeValue <= lowValue);
    }
}, [FC_02_Yesterday_Values_Uncorrected_Volume, FC_02_Yesterday_Values_Uncorrected_Volume_High, FC_02_Yesterday_Values_Uncorrected_Volume_Low, maintainFC_02_Yesterday_Values_Uncorrected_Volume]);

      
          const handleInputChangeFC_02_Yesterday_Values_Uncorrected_Volume = (event: any) => {
              const newValue = event.target.value;
              setInputValueFC_02_Yesterday_Values_Uncorrected_Volume(newValue);
          };
      
          const handleInputChange2FC_02_Yesterday_Values_Uncorrected_Volume = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2FC_02_Yesterday_Values_Uncorrected_Volume(newValue2);
          };
          const ChangeMaintainFC_02_Yesterday_Values_Uncorrected_Volume = async () => {
              try {
                  const newValue = !maintainFC_02_Yesterday_Values_Uncorrected_Volume;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                      { FC_02_Yesterday_Values_Uncorrected_Volume_Maintain: newValue }
                  );
                  setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(newValue);
                  
              } catch (error) {}
          };
 
 
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
      
          const handleInputChange2GD1 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2GD1(newValue2);
          };
          const ChangeMaintainGD1 = async () => {
              try {
                  const newValue = !maintainGD1;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                           { DI_ZSO_1_Maintain: newValue }
                       );
                       setMaintainDI_ZSO_1(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [DI_ZSO_2, setDI_ZSO_2] = useState<string | null>(null);
           const [audioPlayingDI_ZSO_2, setAudioPlayingDI_ZSO_2] = useState(false);
           const [inputValueDI_ZSO_2, setInputValueDI_ZSO_2] = useState<any>();
           const [inputValue2DI_ZSO_2, setInputValue2DI_ZSO_2] = useState<any>();
           const [DI_ZSO_2_High, setDI_ZSO_2_High] = useState<number | null>(null);
           const [DI_ZSO_2_Low, setDI_ZSO_2_Low] = useState<number | null>(null);
           const [exceedThresholdDI_ZSO_2, setExceedThresholdDI_ZSO_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_ZSO_2, setMaintainDI_ZSO_2] = useState<boolean>(false);
           
           
           useEffect(() => {
            const DI_ZSO_2Value = parseFloat(DI_ZSO_2 as any);
            const highValue = DI_ZSO_2_High ?? NaN;
            const lowValue = DI_ZSO_2_Low ?? NaN;
        
            if (!isNaN(DI_ZSO_2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_ZSO_2) {
                setExceedThresholdDI_ZSO_2(DI_ZSO_2Value >= highValue || DI_ZSO_2Value <= lowValue);
            }
        }, [DI_ZSO_2, DI_ZSO_2_High, DI_ZSO_2_Low, maintainDI_ZSO_2]);
           
               const handleInputChangeDI_ZSO_2 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_ZSO_2(newValue);
               };
           
               const handleInputChange2DI_ZSO_2 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_ZSO_2(newValue2);
               };
               const ChangeMaintainDI_ZSO_2 = async () => {
                   try {
                       const newValue = !maintainDI_ZSO_2;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                           { DI_ZSO_2_Maintain: newValue }
                       );
                       setMaintainDI_ZSO_2(newValue);
                       
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
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                           { DI_ZSC_1_Maintain: newValue }
                       );
                       setMaintainDI_ZSC_1(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [DI_ZSC_2, setDI_ZSC_2] = useState<string | null>(null);
           const [audioPlayingDI_ZSC_2, setAudioPlayingDI_ZSC_2] = useState(false);
           const [inputValueDI_ZSC_2, setInputValueDI_ZSC_2] = useState<any>();
           const [inputValue2DI_ZSC_2, setInputValue2DI_ZSC_2] = useState<any>();
           const [DI_ZSC_2_High, setDI_ZSC_2_High] = useState<number | null>(null);
           const [DI_ZSC_2_Low, setDI_ZSC_2_Low] = useState<number | null>(null);
           const [exceedThresholdDI_ZSC_2, setExceedThresholdDI_ZSC_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainDI_ZSC_2, setMaintainDI_ZSC_2] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof DI_ZSC_2_High === 'string' && typeof DI_ZSC_2_Low === 'string' && DI_ZSC_2 !== null && maintainDI_ZSC_2 === false
                   ) {
                       const highValue = parseFloat(DI_ZSC_2_High);
                       const lowValue = parseFloat(DI_ZSC_2_Low);
                       const DI_ZSC_2Value = parseFloat(DI_ZSC_2);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSC_2Value)) {
                           if (highValue <= DI_ZSC_2Value || DI_ZSC_2Value <= lowValue) {
                               if (!audioPlayingDI_ZSC_2) {
                                   audioRef.current?.play();
                                   setAudioPlayingDI_ZSC_2(true);
                                   setExceedThresholdDI_ZSC_2(true);
                               }
                           } else {
                              setAudioPlayingDI_ZSC_2(false);
                              setExceedThresholdDI_ZSC_2(false);
                           }
                       } 
                   } 
               }, [DI_ZSC_2_High, DI_ZSC_2, audioPlayingDI_ZSC_2, DI_ZSC_2_Low,maintainDI_ZSC_2]);
           
               useEffect(() => {
                   if (audioPlayingDI_ZSC_2) {
                       const audioEnded = () => {
                          setAudioPlayingDI_ZSC_2(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingDI_ZSC_2]);
           
               const handleInputChangeDI_ZSC_2 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueDI_ZSC_2(newValue);
               };
           
               const handleInputChange2DI_ZSC_2 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2DI_ZSC_2(newValue2);
               };
               const ChangeMaintainDI_ZSC_2 = async () => {
                   try {
                       const newValue = !maintainDI_ZSC_2;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                           { DI_ZSC_2_Maintain: newValue }
                       );
                       setMaintainDI_ZSC_2(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
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
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                     { DI_MAP_1_Maintain: newValue }
                 );
                 setMaintainDI_MAP_1(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
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
                         `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                         { DI_UPS_CHARGING_Maintain: newValue }
                     );
                     setMaintainDI_UPS_CHARGING(newValue);
                     
                 } catch (error) {}
             };
     
     
         // =================================================================================================================== 
 
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
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                     { DI_UPS_ALARM_Maintain: newValue }
                 );
                 setMaintainDI_UPS_ALARM(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
 
     const [DI_SD_1, setDI_SD_1] = useState<string | null>(null);
     const [audioPlayingDI_SD_1, setAudioPlayingDI_SD_1] = useState(false);
     const [inputValueDI_SD_1, setInputValueDI_SD_1] = useState<any>();
     const [inputValue2DI_SD_1, setInputValue2DI_SD_1] = useState<any>();
     const [DI_SD_1_High, setDI_SD_1_High] = useState<number | null>(null);
     const [DI_SD_1_Low, setDI_SD_1_Low] = useState<number | null>(null);
     const [exceedThresholdDI_SD_1, setExceedThresholdDI_SD_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainDI_SD_1, setMaintainDI_SD_1] = useState<boolean>(false);
     
     
     useEffect(() => {
        const DI_SD_1Value = parseFloat(DI_SD_1 as any);
        const highValue = DI_SD_1_High ?? NaN;
        const lowValue = DI_SD_1_Low ?? NaN;
    
        if (!isNaN(DI_SD_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_SD_1) {
            setExceedThresholdDI_SD_1(DI_SD_1Value >= highValue || DI_SD_1Value <= lowValue);
        }
    }, [DI_SD_1, DI_SD_1_High, DI_SD_1_Low, maintainDI_SD_1]);
     
         const handleInputChangeDI_SD_1 = (event: any) => {
             const newValue = event.target.value;
             setInputValueDI_SD_1(newValue);
         };
     
         const handleInputChange2DI_SD_1 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2DI_SD_1(newValue2);
         };
         const ChangeMaintainDI_SD_1 = async () => {
             try {
                 const newValue = !maintainDI_SD_1;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                     { DI_SD_1_Maintain: newValue }
                 );
                 setMaintainDI_SD_1(newValue);
                 
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
                 `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                 { DI_SELECT_SW_Maintain: newValue }
             );
             setMaintainDI_SELECT_SW(newValue);
             
         } catch (error) {}
     };
 
 
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
                 `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
             `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
             { Emergency_NO_Maintain: newValue }
         );
         setMaintainEmergency_NO(newValue);
         
     } catch (error) {}
 };
 
 
 // =================================================================================================================== 
 
 
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
                         `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                         { DI_UPS_BATTERY_Maintain: newValue }
                     );
                     setMaintainDI_UPS_BATTERY(newValue);
                     
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
                         `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                     `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
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
                         `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                         { DO_HR_01_Maintain: newValue }
                     );
                     setMaintainDO_HR_01(newValue);
                     
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
            const SDValue = parseFloat(SD as any);
            const highValue = SD_High ?? NaN;
            const lowValue = SD_Low ?? NaN;
        
            if (!isNaN(SDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD) {
                setExceedThresholdSD(SDValue >= highValue || SDValue <= lowValue);
            }
        }, [SD, SD_High, SD_Low, maintainSD]);
         
         
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
                         `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                         { SD_Maintain: newValue }
                     );
                     setMaintainSD(newValue);
                     
                 } catch (error) {}
             };
    
    
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
                              `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                              { DO_BC_01_Maintain: newValue }
                          );
                          setMaintainDO_BC_01(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
    
              const [DO_SV_01, setDO_SV_01] = useState<string | null>(null);
              const [audioPlayingDO_SV_01, setAudioPlayingDO_SV_01] = useState(false);
              const [inputValuDO_SV_01, setInputValuDO_SV_01] = useState<any>();
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
                      setInputValuDO_SV_01(newValue);
                  };
              
                  const handleInputChange2DO_SV_01 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2DO_SV_01(newValue2);
                  };
                  const ChangeMaintainDO_SV_01 = async () => {
                      try {
                          const newValue = !maintainDO_SV_01;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                              { DO_SV_01_Maintain: newValue }
                          );
                          setMaintainDO_SV_01(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 

              const [FC_Conn_STT, setFC_Conn_STT] = useState<string | null>(null);
const [audioPlayingFC_Conn_STT, setAudioPlayingFC_Conn_STT] = useState(false);
const [inputValueFC_Conn_STT, setInputValueFC_Conn_STT] = useState<any>();
const [inputValue2FC_Conn_STT, setInputValue2FC_Conn_STT] = useState<any>();
const [FC_Conn_STT_High, setFC_Conn_STT_High] = useState<number | null>(null);
const [FC_Conn_STT_Low, setFC_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdFC_Conn_STT, setExceedThresholdFC_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_Conn_STT, setMaintainFC_Conn_STT] = useState<boolean>(false);

useEffect(() => {
    const FC_Conn_STTValue = parseFloat(FC_Conn_STT as any);
    const highValue = FC_Conn_STT_High ?? NaN;
    const lowValue = FC_Conn_STT_Low ?? NaN;

    if (!isNaN(FC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFC_Conn_STT) {
        setExceedThresholdFC_Conn_STT(FC_Conn_STTValue >= highValue || FC_Conn_STTValue <= lowValue);
    }
}, [FC_Conn_STT, FC_Conn_STT_High, FC_Conn_STT_Low, maintainFC_Conn_STT]);

const handleInputChangeFC_Conn_STT = (event: any) => {
    const newValue = event.target.value;
    setInputValueFC_Conn_STT(newValue);
};

const handleInputChange2FC_Conn_STT = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2FC_Conn_STT(newValue2);
};

const ChangeMaintainFC_Conn_STT = async () => {
    try {
        const newValue = !maintainFC_Conn_STT;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
            { FC_Conn_STT_Maintain: newValue }
        );
        setMaintainFC_Conn_STT(newValue);
        
    } catch (error) {}
};

              // =================================================================================================================== 

              // PLC_Conn_STT
const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
const [inputValuePLC_Conn_STT, setInputValuePLC_Conn_STT] = useState<any>();
const [inputValue2PLC_Conn_STT, setInputValue2PLC_Conn_STT] = useState<any>();
const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdPLC_Conn_STT, setExceedThresholdPLC_Conn_STT] = useState(false); 
const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);

useEffect(() => {
    const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
    const highValue = PLC_Conn_STT_High ?? NaN;
    const lowValue = PLC_Conn_STT_Low ?? NaN;

    if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
        setExceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
    }
}, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);

const handleInputChangePLC_Conn_STT = (event: any) => {
    const newValue = event.target.value;
    setInputValuePLC_Conn_STT(newValue);
};

const handleInputChange2PLC_Conn_STT = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2PLC_Conn_STT(newValue2);
};

const ChangeMaintainPLC_Conn_STT = async () => {
    try {
        const newValue = !maintainPLC_Conn_STT;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
            { PLC_Conn_STT_Maintain: newValue }
        );
        setMaintainPLC_Conn_STT(newValue);
        
    } catch (error) {}
};

              // =================================================================================================================== 
    

              const handleMainTainAll = async (checked:any) => {
                try {

                    const newMaintainFC_Lithium_Battery_Status = checked;
                    const newMaintainFC_Battery_Voltage = checked;
                    const newMaintainFC_System_Voltage = checked;
                    const newMaintainFC_Charger_Voltage = checked;


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

                    const newMaintainFC_02_Accumulated_Values_Uncorrected_Volume = checked;
                    const newMaintainFC_02_Accumulated_Values_Volume = checked;
                    const newMaintainFC_02_Current_Values_Static_Pressure = checked;
                    const newMaintainFC_02_Current_Values_Temperature = checked;
                    const newMaintainFC_02_Current_Values_Flow_Rate = checked;
                    const newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate = checked;
                    const newMaintainFC_02_Today_Values_Volume = checked;
                    const newMaintainFC_02_Today_Values_Uncorrected_Volume = checked;
                    const newMaintainFC_02_Yesterday_Values_Volume = checked;
                    const newMaintainFC_02_Yesterday_Values_Uncorrected_Volume = checked;
            
                    const newMaintainDI_SD_1 = checked;
                
            
                    const newMaintainGD1 = checked;
                    const newMaintainGD2 = checked;
                    const newMaintainPT1 = checked;
                    const newMaintainDI_ZSO_1 = checked;
                    const newMaintainDI_ZSC_1 = checked;
           
                    const newMaintainDI_MAP_1 = checked;
                    const newMaintainDI_UPS_CHARGING = checked;
                    const newMaintainDI_UPS_ALARM = checked;
                    const newMaintainDI_SELECT_SW = checked;
                    const newMaintainDI_RESET = checked;
                    const newMaintainDI_UPS_BATTERY = checked;
                    const newMaintainEmergency_NO = checked;
                    const newMaintainEmergency_NC = checked;
                    const newMaintainUPS_Mode = checked;
                    const newMaintainDO_HR_01 = checked;
                    const newMaintainDO_BC_01 = checked;
                    const newMaintainDO_SV_01 = checked;
                    const newMaintainPLC_Conn_STT = checked;
                    const newMaintainFC_Conn_STT = checked;

            
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,




                        {
                            
                        FC_Lithium_Battery_Status_Maintain: newMaintainFC_Lithium_Battery_Status,
                        FC_Battery_Voltage_Maintain: newMaintainFC_Battery_Voltage,

                         FC_System_Voltage_Maintain: newMaintainFC_System_Voltage,
                         FC_Charger_Voltage_Maintain: newMaintainFC_Charger_Voltage,
                            
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

                           FC_02_Accumulated_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Accumulated_Values_Uncorrected_Volume,
                           FC_02_Accumulated_Values_Volume_Maintain: newMaintainFC_02_Accumulated_Values_Volume,
                           FC_02_Current_Values_Static_Pressure_Maintain: newMaintainFC_02_Current_Values_Static_Pressure,
                           FC_02_Current_Values_Temperature_Maintain: newMaintainFC_02_Current_Values_Temperature,
                           FC_02_Current_Values_Flow_Rate_Maintain: newMaintainFC_02_Current_Values_Flow_Rate,
                           FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain: newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate,
                           FC_02_Today_Values_Volume_Maintain: newMaintainFC_02_Today_Values_Volume,
                           FC_02_Today_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Today_Values_Uncorrected_Volume,
                           FC_02_Yesterday_Values_Volume_Maintain: newMaintainFC_02_Yesterday_Values_Volume,
                           FC_02_Yesterday_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Yesterday_Values_Uncorrected_Volume,
            
            
                     
                           DI_SD_1_Maintain: newMaintainDI_SD_1,
            
                           GD1_Maintain: newMaintainGD1,
                           GD2_Maintain: newMaintainGD2,
            
                           PT1_Maintain: newMaintainPT1,
                          DI_ZSO_1_Maintain: newMaintainDI_ZSO_1,
                          DI_ZSC_1_Maintain: newMaintainDI_ZSC_1,

                    
                           DI_MAP_1_Maintain: newMaintainDI_MAP_1,
                           DI_UPS_CHARGING_Maintain: newMaintainDI_UPS_CHARGING,
                           DI_UPS_ALARM_Maintain: newMaintainDI_UPS_ALARM,
                           DI_SELECT_SW_Maintain: newMaintainDI_SELECT_SW,
                           DI_RESET_Maintain: newMaintainDI_RESET,
                           DI_UPS_BATTERY_Maintain: newMaintainDI_UPS_BATTERY,
            
                           Emergency_NO_Maintain: newMaintainEmergency_NO,
                           Emergency_NC_Maintain: newMaintainEmergency_NC,
                           UPS_Mode_Maintain: newMaintainUPS_Mode,
                           DO_HR_01_Maintain: newMaintainDO_HR_01,
                           DO_BC_01_Maintain: newMaintainDO_BC_01,
                           DO_SV_01_Maintain: newMaintainDO_SV_01,
                           PLC_Conn_STT_Maintain: newMaintainPLC_Conn_STT,

                           FC_Conn_STT_Maintain: newMaintainFC_Conn_STT,
            
                         }
                    );

                    setMaintainFC_Lithium_Battery_Status(newMaintainFC_Lithium_Battery_Status);
                    setMaintainFC_Battery_Voltage(newMaintainFC_Battery_Voltage);

                    setMaintainFC_System_Voltage(newMaintainFC_System_Voltage);
                    setMaintainFC_Charger_Voltage(newMaintainFC_Charger_Voltage);

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
            
                    setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(newMaintainFC_02_Accumulated_Values_Uncorrected_Volume);
                    setMaintainFC_02_Accumulated_Values_Volume(newMaintainFC_02_Accumulated_Values_Volume);
                    setMaintainFC_02_Current_Values_Static_Pressure(newMaintainFC_02_Current_Values_Static_Pressure);
                    setMaintainFC_02_Current_Values_Temperature(newMaintainFC_02_Current_Values_Temperature);
                    setMaintainFC_02_Current_Values_Flow_Rate(newMaintainFC_02_Current_Values_Flow_Rate);
                    setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate);
                    setMaintainFC_02_Today_Values_Volume(newMaintainFC_02_Today_Values_Volume);
                    setMaintainFC_02_Today_Values_Uncorrected_Volume(newMaintainFC_02_Today_Values_Uncorrected_Volume);
                    setMaintainFC_02_Yesterday_Values_Volume(newMaintainFC_02_Yesterday_Values_Volume);
                    setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(newMaintainFC_02_Yesterday_Values_Uncorrected_Volume);
                    
                    setMaintainDI_SD_1(newMaintainDI_SD_1);
            
                    setMaintainGD1(newMaintainGD1);
                    setMaintainGD2(newMaintainGD2);
            
                    setMaintainPT1(newMaintainPT1);
                    setMaintainDI_ZSO_1(newMaintainDI_ZSO_1);
                    setMaintainDI_ZSC_1(newMaintainDI_ZSC_1);

         
                    setMaintainDI_MAP_1(newMaintainDI_MAP_1);
                    setMaintainDI_UPS_CHARGING(newMaintainDI_UPS_CHARGING);
                    setMaintainDI_UPS_ALARM(newMaintainDI_UPS_ALARM);
                    setMaintainDI_SELECT_SW(newMaintainDI_SELECT_SW);
                    setMaintainDI_RESET(newMaintainDI_RESET);
                    setMaintainDI_UPS_BATTERY(newMaintainDI_UPS_BATTERY);
            
                    setMaintainEmergency_NO(newMaintainEmergency_NO);
                    setMaintainEmergency_NC(newMaintainEmergency_NC);
                    setMaintainUPS_Mode(newMaintainUPS_Mode);
                    setMaintainDO_HR_01(newMaintainDO_HR_01);
                    setMaintainDO_BC_01(newMaintainDO_BC_01);
                    setMaintainDO_SV_01(newMaintainDO_SV_01);
                    setMaintainPLC_Conn_STT(newMaintainPLC_Conn_STT);
                    setMaintainFC_Conn_STT(newMaintainPLC_Conn_STT);
            
            
                } catch (error) {
                    console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
                }
            };
            
            const handleCheckboxChange = (e:any) => {
                const isChecked = e.checked;
            
                handleMainTainAll(isChecked);
            };


            const checkMaintainingAll = 
    maintainFC_Lithium_Battery_Status === true &&
    maintainFC_Battery_Voltage === true &&
    maintainFC_System_Voltage === true &&
    maintainFC_Charger_Voltage === true &&
    maintainFC_Conn_STT === true &&
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
    maintainFC_02_Accumulated_Values_Uncorrected_Volume === true &&
    maintainFC_02_Accumulated_Values_Volume === true &&
    maintainFC_02_Current_Values_Static_Pressure === true &&
    maintainFC_02_Current_Values_Temperature === true &&
    maintainFC_02_Current_Values_Flow_Rate === true &&
    maintainFC_02_Current_Values_Uncorrected_Flow_Rate === true &&
    maintainFC_02_Today_Values_Volume === true &&
    maintainFC_02_Today_Values_Uncorrected_Volume === true &&
    maintainFC_02_Yesterday_Values_Volume === true &&
    maintainFC_02_Yesterday_Values_Uncorrected_Volume === true &&
    maintainGD1 === true &&
    maintainGD2 === true &&
    maintainPT1 === true &&
    maintainDI_ZSO_1 === true &&
    maintainDI_ZSC_1 === true &&
    maintainDI_MAP_1 === true &&
    maintainDI_UPS_BATTERY === true &&
    maintainDI_UPS_CHARGING === true &&
    maintainDI_UPS_ALARM === true &&
    maintainDI_SD_1 === true &&
    maintainDI_SELECT_SW === true &&
    maintainDI_RESET === true &&
    maintainEmergency_NO === true &&
    maintainEmergency_NC === true &&
    maintainUPS_Mode === true &&
    maintainDO_HR_01 === true &&
    maintainDO_BC_01 === true &&
    maintainDO_SV_01 === true &&
    maintainPLC_Conn_STT === true;

            
            const maintainHeader = (
                <div>
        
                    {!AuthInput && (
                        <Checkbox
                            style={{ marginRight: 5 }}
                            onChange={handleCheckboxChange}
                            checked={checkMaintainingAll}
                        />
                    )} 
                    Maintain
        
                </div>
            );
         
        // =================================================================================================================== 

        const handleMainTainFC = async (checked:any) => {

            try {

                const newMaintainFC_Lithium_Battery_Status = checked;
                const newMaintainFC_Battery_Voltage = checked;
                const newMaintainFC_System_Voltage = checked;
                const newMaintainFC_Charger_Voltage = checked;

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

                const newMaintainFC_02_Accumulated_Values_Uncorrected_Volume = checked;
                const newMaintainFC_02_Accumulated_Values_Volume = checked;
                const newMaintainFC_02_Current_Values_Static_Pressure = checked;
                const newMaintainFC_02_Current_Values_Temperature = checked;
                const newMaintainFC_02_Current_Values_Flow_Rate = checked;
                const newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate = checked;
                const newMaintainFC_02_Today_Values_Volume = checked;
                const newMaintainFC_02_Today_Values_Uncorrected_Volume = checked;
                const newMaintainFC_02_Yesterday_Values_Volume = checked;
                const newMaintainFC_02_Yesterday_Values_Uncorrected_Volume = checked;
        
                const newMaintainFC_Conn_STT = checked;

        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,




                    {
                        
                    FC_Lithium_Battery_Status_Maintain: newMaintainFC_Lithium_Battery_Status,
                    FC_Battery_Voltage_Maintain: newMaintainFC_Battery_Voltage,

                     FC_System_Voltage_Maintain: newMaintainFC_System_Voltage,
                     FC_Charger_Voltage_Maintain: newMaintainFC_Charger_Voltage,
                        
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

                       FC_02_Accumulated_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Accumulated_Values_Uncorrected_Volume,
                       FC_02_Accumulated_Values_Volume_Maintain: newMaintainFC_02_Accumulated_Values_Volume,
                       FC_02_Current_Values_Static_Pressure_Maintain: newMaintainFC_02_Current_Values_Static_Pressure,
                       FC_02_Current_Values_Temperature_Maintain: newMaintainFC_02_Current_Values_Temperature,
                       FC_02_Current_Values_Flow_Rate_Maintain: newMaintainFC_02_Current_Values_Flow_Rate,
                       FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain: newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate,
                       FC_02_Today_Values_Volume_Maintain: newMaintainFC_02_Today_Values_Volume,
                       FC_02_Today_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Today_Values_Uncorrected_Volume,
                       FC_02_Yesterday_Values_Volume_Maintain: newMaintainFC_02_Yesterday_Values_Volume,
                       FC_02_Yesterday_Values_Uncorrected_Volume_Maintain: newMaintainFC_02_Yesterday_Values_Uncorrected_Volume,
        
        
                 

                       FC_Conn_STT_Maintain: newMaintainFC_Conn_STT,
        
                     }
                );

                setMaintainFC_Lithium_Battery_Status(newMaintainFC_Lithium_Battery_Status);
                setMaintainFC_Battery_Voltage(newMaintainFC_Battery_Voltage);

                setMaintainFC_System_Voltage(newMaintainFC_System_Voltage);
                setMaintainFC_Charger_Voltage(newMaintainFC_Charger_Voltage);

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
        
                setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(newMaintainFC_02_Accumulated_Values_Uncorrected_Volume);
                setMaintainFC_02_Accumulated_Values_Volume(newMaintainFC_02_Accumulated_Values_Volume);
                setMaintainFC_02_Current_Values_Static_Pressure(newMaintainFC_02_Current_Values_Static_Pressure);
                setMaintainFC_02_Current_Values_Temperature(newMaintainFC_02_Current_Values_Temperature);
                setMaintainFC_02_Current_Values_Flow_Rate(newMaintainFC_02_Current_Values_Flow_Rate);
                setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(newMaintainFC_02_Current_Values_Uncorrected_Flow_Rate);
                setMaintainFC_02_Today_Values_Volume(newMaintainFC_02_Today_Values_Volume);
                setMaintainFC_02_Today_Values_Uncorrected_Volume(newMaintainFC_02_Today_Values_Uncorrected_Volume);
                setMaintainFC_02_Yesterday_Values_Volume(newMaintainFC_02_Yesterday_Values_Volume);
                setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(newMaintainFC_02_Yesterday_Values_Uncorrected_Volume);
                
                setMaintainFC_Conn_STT(newMaintainFC_Conn_STT);
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChangeFC = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainFC(isChecked);
        };
        
        const checkMaintainingFC = 
        maintainFC_Lithium_Battery_Status === true &&
        maintainFC_Battery_Voltage === true &&
        maintainFC_System_Voltage === true &&
        maintainFC_Charger_Voltage === true &&
        maintainFC_Conn_STT === true &&
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
        maintainFC_02_Accumulated_Values_Uncorrected_Volume === true &&
        maintainFC_02_Accumulated_Values_Volume === true &&
        maintainFC_02_Current_Values_Static_Pressure === true &&
        maintainFC_02_Current_Values_Temperature === true &&
        maintainFC_02_Current_Values_Flow_Rate === true &&
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate === true &&
        maintainFC_02_Today_Values_Volume === true &&
        maintainFC_02_Today_Values_Uncorrected_Volume === true &&
        maintainFC_02_Yesterday_Values_Volume === true &&
        maintainFC_02_Yesterday_Values_Uncorrected_Volume === true;
    
     
     // =================================================================================================================== 



              // =================================================================================================================== 
    

              const handleMainTainPLC = async (checked:any) => {
                try {

                    const newMaintainGD1 = checked;
                    const newMaintainGD2 = checked;
                    const newMaintainPT1 = checked;
                    const newMaintainDI_ZSO_1 = checked;
                    const newMaintainDI_ZSC_1 = checked;
           
                    const newMaintainDI_MAP_1 = checked;
                    const newMaintainDI_UPS_CHARGING = checked;
                    const newMaintainDI_UPS_ALARM = checked;
                    const newMaintainDI_SELECT_SW = checked;
                    const newMaintainDI_RESET = checked;
                    const newMaintainDI_UPS_BATTERY = checked;
                    const newMaintainEmergency_NO = checked;
                    const newMaintainEmergency_NC = checked;
                    const newMaintainUPS_Mode = checked;
                    const newMaintainDO_HR_01 = checked;
                    const newMaintainDO_BC_01 = checked;
                    const newMaintainDO_SV_01 = checked;
                    const newMaintainPLC_Conn_STT = checked;

            
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,

                        {
                            
            
                           GD1_Maintain: newMaintainGD1,
                           GD2_Maintain: newMaintainGD2,
            
                           PT1_Maintain: newMaintainPT1,
                          DI_ZSO_1_Maintain: newMaintainDI_ZSO_1,
                          DI_ZSC_1_Maintain: newMaintainDI_ZSC_1,

                    
                           DI_MAP_1_Maintain: newMaintainDI_MAP_1,
                           DI_UPS_CHARGING_Maintain: newMaintainDI_UPS_CHARGING,
                           DI_UPS_ALARM_Maintain: newMaintainDI_UPS_ALARM,
                           DI_SELECT_SW_Maintain: newMaintainDI_SELECT_SW,
                           DI_RESET_Maintain: newMaintainDI_RESET,
                           DI_UPS_BATTERY_Maintain: newMaintainDI_UPS_BATTERY,
            
                           Emergency_NO_Maintain: newMaintainEmergency_NO,
                           Emergency_NC_Maintain: newMaintainEmergency_NC,
                           UPS_Mode_Maintain: newMaintainUPS_Mode,
                           DO_HR_01_Maintain: newMaintainDO_HR_01,
                           DO_BC_01_Maintain: newMaintainDO_BC_01,
                           DO_SV_01_Maintain: newMaintainDO_SV_01,
                           PLC_Conn_STT_Maintain: newMaintainPLC_Conn_STT,

            
                         }
                    );

          
                    
            
                    setMaintainGD1(newMaintainGD1);
                    setMaintainGD2(newMaintainGD2);
            
                    setMaintainPT1(newMaintainPT1);
                    setMaintainDI_ZSO_1(newMaintainDI_ZSO_1);
                    setMaintainDI_ZSC_1(newMaintainDI_ZSC_1);

         
                    setMaintainDI_MAP_1(newMaintainDI_MAP_1);
                    setMaintainDI_UPS_CHARGING(newMaintainDI_UPS_CHARGING);
                    setMaintainDI_UPS_ALARM(newMaintainDI_UPS_ALARM);
                    setMaintainDI_SELECT_SW(newMaintainDI_SELECT_SW);
                    setMaintainDI_RESET(newMaintainDI_RESET);
                    setMaintainDI_UPS_BATTERY(newMaintainDI_UPS_BATTERY);
            
                    setMaintainEmergency_NO(newMaintainEmergency_NO);
                    setMaintainEmergency_NC(newMaintainEmergency_NC);
                    setMaintainUPS_Mode(newMaintainUPS_Mode);
                    setMaintainDO_HR_01(newMaintainDO_HR_01);
                    setMaintainDO_BC_01(newMaintainDO_BC_01);
                    setMaintainDO_SV_01(newMaintainDO_SV_01);
                    setMaintainPLC_Conn_STT(newMaintainPLC_Conn_STT);
            
            
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
            maintainDI_SD_1 === true &&
            maintainDI_SELECT_SW === true &&
            maintainDI_RESET === true &&
            maintainEmergency_NO === true &&
            maintainEmergency_NC === true &&
            maintainUPS_Mode === true &&
            maintainDO_HR_01 === true &&
            maintainDO_BC_01 === true &&
            maintainDO_SV_01 === true &&
            maintainPLC_Conn_STT === true;
        
         
         // =================================================================================================================== 
         


    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,

                {
                    
                    DO_HR_01_High: inputValueDO_HR_01,DO_HR_01_Low:inputValue2DO_HR_01,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,
                    DO_BC_01_High: inputValueDO_BC_01,DO_BC_01_Low:inputValue2DO_BC_01,
                    DO_SV_01_High: inputValuDO_SV_01,DO_SV_01_Low:inputValue2DO_SV_01,

                    FC_Battery_Voltage_High: inputValueFC_Battery_Voltage,FC_Battery_Voltage_Low:inputValue2FC_Battery_Voltage,
                    FC_System_Voltage_High: inputValueFC_System_Voltage,FC_System_Voltage_Low:inputValue2FC_System_Voltage,
                    FC_Lithium_Battery_Status_High: inputValueFC_Lithium_Battery_Status,FC_Lithium_Battery_Status_Low:inputValue2FC_Lithium_Battery_Status,
                    FC_Charger_Voltage_High: inputValueFC_Charger_Voltage,FC_Charger_Voltage_Low:inputValue2FC_Charger_Voltage,
                    
                    FC_01_Accumulated_Values_Uncorrected_Volume_High: inputValueFC_01_Accumulated_Values_Uncorrected_Volume,FC_01_Accumulated_Values_Uncorrected_Volume_Low:inputValue2FC_01_Accumulated_Values_Uncorrected_Volume,
                    FC_01_Accumulated_Values_Volume_High: inputValueFC_01_Accumulated_Values_Volume,FC_01_Accumulated_Values_Volume_Low:inputValue2FC_01_Accumulated_Values_Volume,
                    FC_01_Current_Values_Static_Pressure_High: inputValueFC_01_Current_Values_Static_Pressure,FC_01_Current_Values_Static_Pressure_Low:inputValue2FC_01_Current_Values_Static_Pressure,
                    FC_01_Current_Values_Temperature_High: inputValueFC_01_Current_Values_Temperature,FC_01_Current_Values_Temperature_Low:inputValue2FC_01_Current_Values_Temperature,
                    FC_01_Current_Values_Flow_Rate_High: inputValueFC_01_Current_Values_Flow_Rate,FC_01_Current_Values_Flow_Rate_Low:inputValue2FC_01_Current_Values_Flow_Rate,


                    FC_01_Today_Values_Volume_High: inputValueFC_01_Today_Values_Volume,FC_01_Today_Values_Volume_Low:inputValue2FC_01_Today_Values_Volume,
                    FC_01_Current_Values_Uncorrected_Flow_Rate_High: inputValueFC_01_Current_Values_Uncorrected_Flow_Rate,FC_01_Current_Values_Uncorrected_Flow_Rate_Low:inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate,
                    FC_01_Today_Values_Uncorrected_Volume_High: inputValueFC_01_Today_Values_Uncorrected_Volume,FC_01_Today_Values_Uncorrected_Volume_Low:inputValue2FC_01_Today_Values_Uncorrected_Volume,
                    FC_01_Yesterday_Values_Volume_High: inputValueFC_01_Yesterday_Values_Volume,FC_01_Yesterday_Values_Volume_Low:inputValue2FC_01_Yesterday_Values_Volume,
                    FC_01_Yesterday_Values_Uncorrected_Volume_High: inputValueFC_01_Yesterday_Values_Uncorrected_Volume,FC_01_Yesterday_Values_Uncorrected_Volume_Low:inputValue2FC_01_Yesterday_Values_Uncorrected_Volume,
                  
                    FC_02_Accumulated_Values_Uncorrected_Volume_High: inputValueFC_02_Accumulated_Values_Uncorrected_Volume,FC_02_Accumulated_Values_Uncorrected_Volume_Low:inputValue2FC_02_Accumulated_Values_Uncorrected_Volume,
                    FC_02_Accumulated_Values_Volume_High: inputValueFC_02_Accumulated_Values_Volume,FC_02_Accumulated_Values_Volume_Low:inputValue2FC_02_Accumulated_Values_Volume,
                    FC_02_Current_Values_Static_Pressure_High: inputValueFC_02_Current_Values_Static_Pressure,FC_02_Current_Values_Static_Pressure_Low:inputValue2FC_02_Current_Values_Static_Pressure,
                    FC_02_Current_Values_Temperature_High: inputValueFC_02_Current_Values_Temperature,FC_02_Current_Values_Temperature_Low:inputValue2FC_02_Current_Values_Temperature,
                    FC_02_Current_Values_Flow_Rate_High: inputValueFC_02_Current_Values_Flow_Rate,FC_02_Current_Values_Flow_Rate_Low:inputValue2FC_02_Current_Values_Flow_Rate,
                 
                    FC_02_Current_Values_Uncorrected_Flow_Rate_High: inputValueFC_02_Current_Values_Uncorrected_Flow_Rate,FC_02_Current_Values_Uncorrected_Flow_Rate_Low:inputValue2FC_02_Current_Values_Uncorrected_Flow_Rate,
                    FC_02_Today_Values_Volume_High: inputValueFC_02_Today_Values_Volume,FC_02_Today_Values_Volume_Low:inputValue2FC_02_Today_Values_Volume,
                    FC_02_Today_Values_Uncorrected_Volume_High: inputValueFC_02_Today_Values_Uncorrected_Volume,FC_02_Today_Values_Uncorrected_Volume_Low:inputValue2FC_02_Today_Values_Uncorrected_Volume,
                    FC_02_Yesterday_Values_Uncorrected_Volume_High: inputValueFC_02_Yesterday_Values_Uncorrected_Volume,FC_02_Yesterday_Values_Uncorrected_Volume_Low:inputValue2FC_02_Yesterday_Values_Uncorrected_Volume,
                    FC_02_Yesterday_Values_Volume_High: inputValueFC_02_Yesterday_Values_Volume,FC_02_Yesterday_Values_Volume_Low:inputValue2FC_02_Yesterday_Values_Volume,

                    GD1_High: inputValueGD1,GD1_Low:inputValue2GD1,
                    GD2_High: inputValueGD2,GD2_Low:inputValue2GD2,
                    PT1_High: inputValuePT1,PT1_Low:inputValue2PT1,
                    DI_ZSO_1_High: inputValueDI_ZSO_1,DI_ZSO_1_Low:inputValue2DI_ZSO_1,
                    DI_ZSC_1_High: inputValueDI_ZSC_1,DI_ZSC_1_Low:inputValue2DI_ZSC_1,
                  
                    DI_ZSO_2_High: inputValueDI_ZSO_2,DI_ZSO_2_Low:inputValue2DI_ZSO_2,
                    DI_MAP_1_High: inputValueDI_MAP_1,DI_MAP_1_Low:inputValue2DI_MAP_1,
                    DI_ZSC_2_High: inputValueDI_ZSC_2,DI_ZSC_2_Low:inputValue2DI_ZSC_2,
                    DI_UPS_CHARGING_High: inputValueDI_UPS_CHARGING,DI_UPS_CHARGING_Low:inputValue2DI_UPS_CHARGING,
                    DI_UPS_ALARM_High: inputValueDI_UPS_ALARM,DI_UPS_ALARM_Low:inputValue2DI_UPS_ALARM,
               
                    DI_SD_1_High: inputValueDI_SD_1,DI_SD_1_Low:inputValue2DI_SD_1,
                    DI_SELECT_SW_High: inputValueDI_SELECT_SW,DI_SELECT_SW_Low:inputValue2DI_SELECT_SW,
                    DI_RESET_High: inputValueDI_RESET,DI_RESET_Low:inputValue2DI_RESET,
                    Emergency_NO_High: inputValueEmergency_NO,Emergency_NO_Low:inputValue2Emergency_NO,
                    DI_UPS_BATTERY_High: inputValueDI_UPS_BATTERY,DI_UPS_BATTERY_Low:inputValue2DI_UPS_BATTERY,
                 
                    Emergency_NC_High: inputValueEmergency_NC,Emergency_NC_Low:inputValue2Emergency_NC,
                    UPS_Mode_High: inputValueUPS_Mode,UPS_Mode_Low:inputValue2UPS_Mode,

                    FC_Conn_STT_High: inputValueFC_Conn_STT,FC_Conn_STT_Low:inputValue2FC_Conn_STT,
                    PLC_Conn_STT_High: inputValuePLC_Conn_STT,PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,

                    IOT_Gateway_Phone: inputGetwayPhone,
                    PCV_01: inputPCV_01,
                    PCV_02: inputPCV_02,
                    PSV_01: inputPSV_01,
                }
            );
     
            setGetWayPhoneOTSUKA(inputGetwayPhone);
            setPSV_01(inputPSV_01)
            setPCV_02(inputPCV_02)
            setPCV_01(inputPCV_01)
            setDO_HR_01_High(inputValueDO_HR_01);
            setDO_HR_01_Low(inputValue2DO_HR_01);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setDO_BC_01_High(inputValueDO_BC_01);
            setDO_BC_01_Low(inputValue2DO_BC_01);

            setDO_SV_01_High(inputValuDO_SV_01);
            setDO_SV_01_Low(inputValue2DO_SV_01);

   

            setFC_Lithium_Battery_Status_High(inputValueFC_Lithium_Battery_Status);
            setFC_Lithium_Battery_Status_Low(inputValue2FC_Lithium_Battery_Status);

            setFC_Battery_Voltage_High(inputValueFC_Battery_Voltage);
            setFC_Battery_Voltage_Low(inputValue2FC_Battery_Voltage);

            setFC_System_Voltage_High(inputValueFC_System_Voltage);
            setFC_System_Voltage_Low(inputValue2FC_System_Voltage);

            setFC_System_Voltage_High(inputValueFC_System_Voltage);
            setFC_System_Voltage_Low(inputValue2FC_System_Voltage);

            setFC_Charger_Voltage_High(inputValueFC_Charger_Voltage);
            setFC_Charger_Voltage_Low(inputValue2FC_Charger_Voltage);

            setFC_01_Accumulated_Values_Uncorrected_Volume_High(inputValueFC_01_Accumulated_Values_Uncorrected_Volume);
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(inputValue2FC_01_Accumulated_Values_Uncorrected_Volume);

            setFC_01_Accumulated_Values_Volume_High(inputValueFC_01_Accumulated_Values_Volume);
            setFC_01_Accumulated_Values_Volume_Low(inputValue2FC_01_Accumulated_Values_Volume);


            setFC_01_Current_Values_Static_Pressure_High(inputValueFC_01_Current_Values_Static_Pressure);
            setFC_01_Current_Values_Static_Pressure_Low(inputValue2FC_01_Current_Values_Static_Pressure);

            setFC_01_Current_Values_Temperature_High(inputValueFC_01_Current_Values_Temperature);
            setFC_01_Current_Values_Temperature_Low(inputValue2FC_01_Current_Values_Temperature);

            setFC_01_Current_Values_Flow_Rate_High(inputValueFC_01_Current_Values_Flow_Rate);
            setFC_01_Current_Values_Flow_Rate_Low(inputValue2FC_01_Current_Values_Flow_Rate);

            setFC_01_Today_Values_Volume_High(inputValueFC_01_Today_Values_Volume);
            setFC_01_Today_Values_Volume_Low(inputValue2FC_01_Today_Values_Volume);

            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(inputValueFC_01_Current_Values_Uncorrected_Flow_Rate);
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate);


            setFC_01_Yesterday_Values_Volume_High(inputValueFC_01_Yesterday_Values_Volume);
            setFC_01_Yesterday_Values_Volume_Low(inputValue2FC_01_Yesterday_Values_Volume);

            setFC_01_Today_Values_Uncorrected_Volume_High(inputValueFC_01_Today_Values_Uncorrected_Volume);
            setFC_01_Today_Values_Uncorrected_Volume_Low(inputValue2FC_01_Today_Values_Uncorrected_Volume);

            setFC_01_Yesterday_Values_Uncorrected_Volume_High(inputValueFC_01_Yesterday_Values_Uncorrected_Volume);
            setFC_01_Yesterday_Values_Uncorrected_Volume_Low(inputValue2FC_01_Yesterday_Values_Uncorrected_Volume);

            setFC_02_Accumulated_Values_Uncorrected_Volume_High(inputValueFC_02_Accumulated_Values_Uncorrected_Volume);
            setFC_02_Accumulated_Values_Uncorrected_Volume_Low(inputValue2FC_02_Accumulated_Values_Uncorrected_Volume);



            setFC_02_Current_Values_Temperature_High(inputValueFC_02_Current_Values_Temperature);
            setFC_02_Current_Values_Temperature_Low(inputValue2FC_02_Current_Values_Temperature);

            setFC_02_Current_Values_Flow_Rate_High(inputValueFC_02_Current_Values_Flow_Rate);
            setFC_02_Current_Values_Flow_Rate_Low(inputValue2FC_02_Current_Values_Flow_Rate);

            setFC_02_Current_Values_Uncorrected_Flow_Rate_High(inputValueFC_02_Current_Values_Uncorrected_Flow_Rate);
            setFC_02_Current_Values_Uncorrected_Flow_Rate_Low(inputValue2FC_02_Current_Values_Uncorrected_Flow_Rate);

            setFC_02_Today_Values_Volume_High(inputValueFC_02_Today_Values_Volume);
            setFC_02_Today_Values_Volume_Low(inputValue2FC_02_Today_Values_Volume);

            setFC_02_Today_Values_Uncorrected_Volume_High(inputValueFC_02_Today_Values_Uncorrected_Volume);
            setFC_02_Today_Values_Uncorrected_Volume_Low(inputValue2FC_02_Today_Values_Uncorrected_Volume);


          

    

    


            setFC_02_Yesterday_Values_Uncorrected_Volume_High(inputValueFC_02_Yesterday_Values_Uncorrected_Volume);
            setFC_02_Yesterday_Values_Uncorrected_Volume_Low(inputValue2FC_02_Yesterday_Values_Uncorrected_Volume);

            setGD1_High(inputValueGD1);
            setGD1_Low(inputValue2GD1);

            setGD1_High(inputValueGD1);
            setGD1_Low(inputValue2GD1);

            setGD2_High(inputValueGD2);
            setGD2_Low(inputValue2GD2);

            setPT1_High(inputValuePT1);
            setPT1_Low(inputValue2PT1);

            setDI_ZSO_1_High(inputValueDI_ZSO_1);
            setDI_ZSO_1_Low(inputValue2DI_ZSO_1);




            setDI_ZSC_1_High(inputValueDI_ZSC_1);
            setDI_ZSC_1_Low(inputValue2DI_ZSC_1);

            setDI_ZSO_2_High(inputValueDI_ZSO_2);
            setDI_ZSO_2_Low(inputValue2DI_ZSO_2);

            setDI_MAP_1_High(inputValueDI_MAP_1);
            setDI_MAP_1_Low(inputValue2DI_MAP_1);

            setDI_ZSC_2_High(inputValueDI_ZSC_2);
            setDI_ZSC_2_Low(inputValue2DI_ZSC_2);


            setDI_UPS_ALARM_High(inputValueDI_UPS_ALARM);
            setDI_UPS_ALARM_Low(inputValue2DI_UPS_ALARM);

            setDI_UPS_CHARGING_High(inputValueDI_UPS_CHARGING);
            setDI_UPS_CHARGING_Low(inputValue2DI_UPS_CHARGING);

            setDI_SD_1_High(inputValueDI_SD_1);
            setDI_SD_1_Low(inputValue2DI_SD_1);

            setDI_SELECT_SW_High(inputValueDI_SELECT_SW);
            setDI_SELECT_SW_Low(inputValue2DI_SELECT_SW);



            setDI_UPS_BATTERY_High(inputValueDI_UPS_BATTERY);
            setDI_UPS_BATTERY_Low(inputValue2DI_UPS_BATTERY);

            setEmergency_NC_High(inputValueEmergency_NC);
            setEmergency_NC_Low(inputValue2Emergency_NC);

            setUPS_Mode_High(inputValueUPS_Mode);
            setUPS_Mode_Low(inputValue2UPS_Mode);



            setFC_Conn_STT_High(inputValueFC_Conn_STT);
            setFC_Conn_STT_Low(inputValue2FC_Conn_STT);

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

        setInputValueSD(SD_High); 
        setInputValue2SD(SD_Low); 

        setInputValueDO_HR_01(DO_HR_01_High); 
        setInputValue2DO_HR_01(DO_HR_01_Low); 

        setInputValueDO_BC_01(DO_BC_01_High); 
        setInputValue2DO_BC_01(DO_BC_01_Low); 

        setInputValuDO_SV_01(DO_SV_01_High); 
        setInputValue2DO_SV_01(DO_SV_01_Low); 

        setInputValueFC_Lithium_Battery_Status(FC_Lithium_Battery_Status_High); 
        setInputValue2FC_Lithium_Battery_Status(FC_Lithium_Battery_Status_Low); 

        setInputValueFC_Battery_Voltage(FC_Battery_Voltage_High); 
        setInputValue2FC_Battery_Voltage(FC_Battery_Voltage_Low); 

        setInputValueFC_System_Voltage(FC_System_Voltage_High); 
        setInputValue2FC_System_Voltage(FC_System_Voltage_Low); 

        setInputValueFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_High); 
        setInputValue2FC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Low); 

        setInputValueFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_High); 
        setInputValue2FC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Low); 

        setInputValueFC_Charger_Voltage(FC_Charger_Voltage_High); 
        setInputValue2FC_Charger_Voltage(FC_Charger_Voltage_Low); 
        
        setInputValueFC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_High); 
        setInputValue2FC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_Low); 

        setInputValueFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_High); 
        setInputValue2FC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Low); 

        setInputValueFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_High); 
        setInputValue2FC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Low); 

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

        setInputValueFC_02_Accumulated_Values_Uncorrected_Volume(FC_02_Accumulated_Values_Uncorrected_Volume_High); 
        setInputValue2FC_02_Accumulated_Values_Uncorrected_Volume(FC_02_Accumulated_Values_Uncorrected_Volume_Low); 

        setInputValueFC_02_Accumulated_Values_Volume(FC_02_Accumulated_Values_Volume_High); 
        setInputValue2FC_02_Accumulated_Values_Volume(FC_02_Accumulated_Values_Volume_Low); 

        setInputValueFC_02_Current_Values_Static_Pressure(FC_02_Current_Values_Static_Pressure_High); 
        setInputValue2FC_02_Current_Values_Static_Pressure(FC_02_Current_Values_Static_Pressure_Low); 

        setInputValueFC_02_Current_Values_Temperature(FC_02_Current_Values_Temperature_High); 
        setInputValue2FC_02_Current_Values_Temperature(FC_02_Current_Values_Temperature_Low); 

        setInputValueFC_02_Current_Values_Flow_Rate(FC_02_Current_Values_Flow_Rate_High); 
        setInputValue2FC_02_Current_Values_Flow_Rate(FC_02_Current_Values_Flow_Rate_Low); 

        setInputValueFC_02_Current_Values_Uncorrected_Flow_Rate(FC_02_Current_Values_Uncorrected_Flow_Rate_High); 
        setInputValue2FC_02_Current_Values_Uncorrected_Flow_Rate(FC_02_Current_Values_Uncorrected_Flow_Rate_Low); 

        setInputValueFC_02_Today_Values_Volume(FC_02_Today_Values_Volume_High); 
        setInputValue2FC_02_Today_Values_Volume(FC_02_Today_Values_Volume_Low); 

        setInputValueFC_02_Today_Values_Uncorrected_Volume(FC_02_Today_Values_Uncorrected_Volume_High); 
        setInputValue2FC_02_Today_Values_Uncorrected_Volume(FC_02_Today_Values_Uncorrected_Volume_Low); 

        setInputValueFC_02_Yesterday_Values_Volume(FC_02_Yesterday_Values_Volume_High); 
        setInputValue2FC_02_Yesterday_Values_Volume(FC_02_Yesterday_Values_Volume_Low); 

        setInputValueFC_02_Yesterday_Values_Uncorrected_Volume(FC_02_Yesterday_Values_Uncorrected_Volume_High); 
        setInputValue2FC_02_Yesterday_Values_Uncorrected_Volume(FC_02_Yesterday_Values_Uncorrected_Volume_Low); 

        setInputValueGD1(GD1_High); 
        setInputValue2GD1(GD1_Low); 

        setInputValuePT1(PT1_High); 
        setInputValue2PT1(PT1_Low); 

        setInputValueDI_ZSO_1(DI_ZSO_1_High); 
        setInputValue2DI_ZSO_1(DI_ZSO_1_Low); 

        setInputValueGD2(GD2_High); 
        setInputValue2GD2(GD2_Low); 

        setInputValueDI_ZSC_1(DI_ZSC_1_High); 
        setInputValue2DI_ZSC_1(DI_ZSC_1_Low); 

        setInputValueDI_ZSO_2(DI_ZSO_2_High); 
        setInputValue2DI_ZSO_2(DI_ZSO_2_Low); 

        setInputValueDI_ZSC_2(DI_ZSC_2_High); 
        setInputValue2DI_ZSC_2(DI_ZSC_2_Low); 

        setInputValueDI_MAP_1(DI_MAP_1_High); 
        setInputValue2DI_MAP_1(DI_MAP_1_Low); 

        setInputValueDI_UPS_CHARGING(DI_UPS_CHARGING_High); 
        setInputValue2DI_UPS_CHARGING(DI_UPS_CHARGING_Low); 

        setInputValueDI_UPS_ALARM(DI_UPS_ALARM_High); 
        setInputValue2DI_UPS_ALARM(DI_UPS_ALARM_Low); 

        setInputValueDI_SD_1(DI_SD_1_High); 
        setInputValue2DI_SD_1(DI_SD_1_Low); 

        setInputValueDI_SELECT_SW(DI_SELECT_SW_High); 
        setInputValue2DI_SELECT_SW(DI_SELECT_SW_Low); 

        setInputValueDI_RESET(DI_RESET_High); 
        setInputValue2DI_RESET(DI_RESET_Low); 

        setInputValueEmergency_NO(Emergency_NO_High); 
        setInputValue2Emergency_NO(Emergency_NO_Low); 

        setInputValueDI_UPS_BATTERY(DI_UPS_BATTERY_High); 
        setInputValue2DI_UPS_BATTERY(DI_UPS_BATTERY_Low); 

        setInputValueEmergency_NC(Emergency_NC_High); 
        setInputValue2Emergency_NC(Emergency_NC_Low); 

        setInputValueUPS_Mode(UPS_Mode_High); 
        setInputValue2UPS_Mode(UPS_Mode_Low); 

        setInputValueFC_Conn_STT(FC_Conn_STT_High); 
        setInputValue2FC_Conn_STT(FC_Conn_STT_Low); 

        setInputValuePLC_Conn_STT(PLC_Conn_STT_High); 
        setInputValue2PLC_Conn_STT(PLC_Conn_STT_Low); 

    }, [
        
        ,SD_High, SD_Low ,
        DO_HR_01_High, DO_HR_01_Low ,
        DO_BC_01_High,DO_BC_01_Low,
        DO_SV_01_High,DO_SV_01_Low,
         
        
        FC_Lithium_Battery_Status_High, FC_Lithium_Battery_Status_Low ,
        FC_Battery_Voltage_High, FC_Battery_Voltage_Low 
        ,FC_System_Voltage_High, FC_System_Voltage_Low ,


        FC_01_Accumulated_Values_Uncorrected_Volume_High,FC_01_Accumulated_Values_Uncorrected_Volume_Low,
         FC_01_Accumulated_Values_Volume_High,FC_01_Accumulated_Values_Volume_Low ,
          FC_Charger_Voltage_High,FC_Charger_Voltage_Low,

          FC_01_Current_Values_Temperature_High,FC_01_Current_Values_Temperature_Low,
          FC_01_Current_Values_Flow_Rate_High,FC_01_Current_Values_Flow_Rate_Low ,
           FC_01_Current_Values_Static_Pressure_High,FC_01_Current_Values_Static_Pressure_Low,
        
           FC_01_Current_Values_Uncorrected_Flow_Rate_High,FC_01_Current_Values_Uncorrected_Flow_Rate_Low,
           FC_01_Today_Values_Volume_High,FC_01_Today_Values_Volume_Low,

           FC_01_Today_Values_Uncorrected_Volume_High,FC_01_Today_Values_Uncorrected_Volume_Low,
           FC_01_Yesterday_Values_Volume_High,FC_01_Yesterday_Values_Volume_Low,

           FC_01_Yesterday_Values_Uncorrected_Volume_High,FC_01_Yesterday_Values_Uncorrected_Volume_Low,
           FC_02_Accumulated_Values_Uncorrected_Volume_High,FC_02_Accumulated_Values_Uncorrected_Volume_Low,

           FC_02_Current_Values_Static_Pressure_High,FC_02_Current_Values_Static_Pressure_Low,
           FC_02_Accumulated_Values_Volume_High,FC_02_Accumulated_Values_Volume_Low,


           FC_02_Current_Values_Temperature_High,FC_02_Current_Values_Temperature_Low,
           FC_02_Current_Values_Flow_Rate_High,FC_02_Current_Values_Flow_Rate_Low,
           FC_02_Current_Values_Uncorrected_Flow_Rate_High,FC_02_Current_Values_Uncorrected_Flow_Rate_Low,

           FC_02_Today_Values_Volume_High,FC_02_Today_Values_Volume_Low,

           FC_02_Today_Values_Uncorrected_Volume_High,FC_02_Today_Values_Uncorrected_Volume_Low,





           FC_02_Yesterday_Values_Volume_High, FC_02_Yesterday_Values_Volume_Low ,
        FC_02_Yesterday_Values_Uncorrected_Volume_High, FC_02_Yesterday_Values_Uncorrected_Volume_Low 
        ,GD1_High, GD1_Low ,


        PT1_High,PT1_Low,
         DI_ZSO_1_High,DI_ZSO_1_Low ,
          GD2_High,GD2_Low,

          DI_ZSC_1_High,DI_ZSC_1_Low,
          DI_ZSO_2_High,DI_ZSO_2_Low ,
        
           DI_ZSC_2_High,DI_ZSC_2_Low,
           DI_MAP_1_High,DI_MAP_1_Low,

           DI_UPS_CHARGING_High,DI_UPS_CHARGING_Low,
           DI_UPS_ALARM_High,DI_UPS_ALARM_Low,

           DI_SD_1_High,DI_SD_1_Low,
           DI_SELECT_SW_High,DI_SELECT_SW_Low,

           Emergency_NO_High,Emergency_NO_Low,
           DI_RESET_High,DI_RESET_Low,


           DI_UPS_BATTERY_High,DI_UPS_BATTERY_Low,
           Emergency_NC_High,Emergency_NC_Low,
           UPS_Mode_High,UPS_Mode_Low,


           PLC_Conn_STT_High,PLC_Conn_STT_Low,
           FC_Conn_STT_High,FC_Conn_STT_Low,

              getWayPhoneOTSUKA,

              PCV_01,
              PCV_02,
              PSV_01
        ]);


        
    const combineCss = {



        CSSDO_HR_01 : {
            color:exceedThresholdDO_HR_01 && !maintainDO_HR_01
            ? "#ff5656"
            : maintainDO_HR_01
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


        CSSDO_BC_01 : {
            color:exceedThresholdDO_BC_01 && !maintainDO_BC_01
            ? "#ff5656"
            : maintainDO_BC_01
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
  


        CSSFC_Lithium_Battery_Status : {
            color:exceedThresholdFC_Lithium_Battery_Status && !maintainFC_Lithium_Battery_Status
            ? "#ff5656"
            : maintainFC_Lithium_Battery_Status
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_Battery_Voltage : {
            color:exceedThresholdFC_Battery_Voltage && !maintainFC_Battery_Voltage
            ? "#ff5656"
            : maintainFC_Battery_Voltage
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_System_Voltage : {
            color:exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage
            ? "#ff5656"
            : maintainFC_System_Voltage
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_Charger_Voltage : {
            color:exceedThresholdFC_Charger_Voltage && !maintainFC_Charger_Voltage
            ? "#ff5656"
            : maintainFC_Charger_Voltage
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

        CSSFC_02_Accumulated_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume && !maintainFC_02_Accumulated_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_02_Accumulated_Values_Uncorrected_Volume
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


        CSSFC_02_Accumulated_Values_Volume : {
            color:exceedThresholdFC_02_Accumulated_Values_Volume && !maintainFC_02_Accumulated_Values_Volume
            ? "#ff5656"
            : maintainFC_02_Accumulated_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFC_02_Current_Values_Static_Pressure : {
            color:exceedThresholdFC_02_Current_Values_Static_Pressure && !maintainFC_02_Current_Values_Static_Pressure
            ? "#ff5656"
            : maintainFC_02_Current_Values_Static_Pressure
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSFC_02_Current_Values_Temperature : {
            color:exceedThresholdFC_02_Current_Values_Temperature && !maintainFC_02_Current_Values_Temperature
            ? "#ff5656"
            : maintainFC_02_Current_Values_Temperature
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_02_Current_Values_Flow_Rate : {
            color:exceedThresholdFC_02_Current_Values_Flow_Rate && !maintainFC_02_Current_Values_Flow_Rate
            ? "#ff5656"
            : maintainFC_02_Current_Values_Flow_Rate
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFC_02_Current_Values_Uncorrected_Flow_Rate : {
            color:exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate && !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
            ? "#ff5656"
            : maintainFC_02_Current_Values_Uncorrected_Flow_Rate
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSFC_02_Today_Values_Volume : {
            color:exceedThresholdFC_02_Today_Values_Volume && !maintainFC_02_Today_Values_Volume
            ? "#ff5656"
            : maintainFC_02_Today_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFC_02_Today_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_02_Today_Values_Uncorrected_Volume && !maintainFC_02_Today_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_02_Today_Values_Uncorrected_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },





     
      

  
       
        CSSFC_02_Yesterday_Values_Volume : {
            color:exceedThresholdFC_02_Yesterday_Values_Volume && !maintainFC_02_Yesterday_Values_Volume
            ? "#ff5656"
            : maintainFC_02_Yesterday_Values_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_02_Yesterday_Values_Uncorrected_Volume : {
            color:exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume && !maintainFC_02_Yesterday_Values_Uncorrected_Volume
            ? "#ff5656"
            : maintainFC_02_Yesterday_Values_Uncorrected_Volume
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
        CSSDI_ZSO_2 : {
            color:exceedThresholdDI_ZSO_2 && !maintainDI_ZSO_2
            ? "#ff5656"
            : maintainDI_ZSO_2
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSDI_ZSC_2 : {
            color:exceedThresholdDI_ZSC_2 && !maintainDI_ZSC_2
            ? "#ff5656"
            : maintainDI_ZSC_2
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

        CSSDI_SELECT_SW : {
            color:exceedThresholdDI_SELECT_SW && !maintainDI_SELECT_SW
            ? "#ff5656"
            : maintainDI_SELECT_SW
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSDI_SD_1 : {
            color:exceedThresholdDI_SD_1 && !maintainDI_SD_1
            ? "#ff5656"
            : maintainDI_SD_1
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




        CSSDI_UPS_BATTERY : {
            color:exceedThresholdDI_UPS_BATTERY && !maintainDI_UPS_BATTERY
            ? "#ff5656"
            : maintainDI_UPS_BATTERY
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

        CSSUPS_Mode : {
            color:exceedThresholdUPS_Mode && !maintainUPS_Mode
            ? "#ff5656"
            : maintainUPS_Mode
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },



        CSSFC_Conn_STT : {
            color:exceedThresholdFC_Conn_STT && !maintainFC_Conn_STT
            ? "#ff5656"
            : maintainFC_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPLC_Conn_STT : {
            color:exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT
            ? "#ff5656"
            : maintainPLC_Conn_STT
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
  };
         
  const mainCategoryFC = {
    FC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> FC-1401 -  Parameters & Configurations {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangeFC}
            checked={checkMaintainingFC}
        />
    <p style={{fontSize:15}}>Maintain EVC-1701</p>  </div> )}  </span> ,
    FC02: 'FC-1402 -  Parameters & Configurations',
    PLC: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameters & Configurations {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
        <Checkbox
            style={{ marginRight: 5 }}
            onChange={handleCheckboxChangePLC}
            checked={checkMaintainingPLC}
        />
    <p style={{fontSize:15}}>Maintain EVC-1701</p>  </div> )}  </span> ,
    FC: 'FC -  Parameters & Configurations',

};

const DataDI_ZSO_1 = DI_ZSO_1 === "0" ? "OFF" : DI_ZSO_1 === "1" ? "ON" : null;
const DataDI_ZSC_1 = DI_ZSC_1 === "0" ? "ON" : DI_ZSC_1 === "1" ? "OFF" : null;

const DataDI_MAP_1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null;
const DataDI_UPS_BATTERY = DI_UPS_BATTERY === "0" ? "Normal" : DI_UPS_BATTERY === "1" ? "Battery" : null;
const DataDI_UPS_CHARGING = DI_UPS_CHARGING === "0" ? "Normal" : DI_UPS_CHARGING === "1" ? "Charging" : null;
const DataDI_UPS_ALARM = DI_UPS_ALARM === "0" ? "Normal" : DI_UPS_ALARM === "1" ? "No Battery" : null;
const DataDI_SD_1 = DI_SD_1 === "0" ? "Normal" : DI_SD_1 === "1" ? "Smoker Deteced" : null;
const DataDI_SELECT_SW = DI_SELECT_SW === "0" ? "Local" : DI_SELECT_SW === "1" ? "Remote" : null;
const DataDI_RESET = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON " : null;

const DataEmergency_NO = Emergency_NO === "0" ? "Normal" : Emergency_NO === "1" ? "Emergency" : null;
const DataEmergency_NC = Emergency_NC === "0" ? "Emergency" : Emergency_NC === "1" ? "Normal" : null;
const DataUPS_Mode = UPS_Mode === "0" ? "Error" : UPS_Mode === "1" ? "UPS Running" : UPS_Mode === "2" ? "Charging" : UPS_Mode === "3" ? "No Battery" : UPS_Mode === "4" ? "Normal" : null


const DataFC_Lithium_Battery_Status = FC_Lithium_Battery_Status === "0" ? "Yes" : FC_Lithium_Battery_Status === "1" ? "No" : null;

const DataDO_HR_01 = DO_HR_01 === "0" ? "OFF" : DO_HR_01 === "1" ? "ON" : null;
const DataDO_BC_01 = DO_BC_01 === "0" ? "OFF" : DO_BC_01 === "1" ? "ON" : null;
const DataDO_SV_01 = DO_SV_01 === "0" ? "OFF" : DO_SV_01 === "1" ? "ON" : null;

const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null;
const DataFC_Conn_STT = FC_Conn_STT === "0" ? "Not Init" : FC_Conn_STT === "1" ? "COM OK" : FC_Conn_STT === "2" ? "Error" : null;



        const dataFC01 =  [

  
        {
            
             mainCategory: mainCategoryFC.FC01 ,
            timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>Input Pressure</span> ,

        modbus: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>47619	 </span> ,

       value: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} > {FC_01_Current_Values_Static_Pressure} {nameValue.Bara}</span> , 
        high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Static_Pressure} onChange={handleInputChangeFC_01_Current_Values_Static_Pressure} inputMode="decimal" />, 
        low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Static_Pressure} onChange={handleInputChange2FC_01_Current_Values_Static_Pressure} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainFC_01_Current_Values_Static_Pressure}
        checked={maintainFC_01_Current_Values_Static_Pressure}
    ></Checkbox>

       },
       {
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Temperature} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>Temperature</span> ,
       modbus: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>47621	 </span> ,
      value: <span style={combineCss.CSSFC_01_Current_Values_Temperature} > {FC_01_Current_Values_Temperature} {nameValue.C}</span> , 
       high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Temperature} onChange={handleInputChangeFC_01_Current_Values_Temperature} inputMode="decimal" />, 
       low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Temperature} onChange={handleInputChange2FC_01_Current_Values_Temperature} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainFC_01_Current_Values_Temperature}
       checked={maintainFC_01_Current_Values_Temperature}
   ></Checkbox>

      },
      {
            
        mainCategory: mainCategoryFC.FC01 ,
       timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
     name: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>Gross Volume Accumulated</span> ,

     modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>47615	 </span> ,

    value: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} > {FC_01_Accumulated_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
     high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />, 
     low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainFC_01_Accumulated_Values_Uncorrected_Volume}
     checked={maintainFC_01_Accumulated_Values_Uncorrected_Volume}
 ></Checkbox>

    },
    {
       
        mainCategory: mainCategoryFC.FC01 ,
       timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>Standard Volume Accumulated</span> ,

    modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>47617	 </span> ,

   value: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} > {FC_01_Accumulated_Values_Volume} {nameValue.Sm3}</span> , 
    high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Volume} inputMode="decimal" />, 
    low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Volume} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFC_01_Accumulated_Values_Volume}
    checked={maintainFC_01_Accumulated_Values_Volume}
></Checkbox>

   },
        {
            
             mainCategory: mainCategoryFC.FC01 ,
            timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>Standard Volume Flow</span> ,

        modbus: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>7623	 </span> ,

       value: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} > {FC_01_Current_Values_Flow_Rate} {nameValue.Sm3h}</span> , 
        high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Flow_Rate} inputMode="decimal" />, 
        low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Flow_Rate} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainFC_01_Current_Values_Flow_Rate}
        checked={maintainFC_01_Current_Values_Flow_Rate}
    ></Checkbox>

       },


       {
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>Gross Volume Flow</span> ,

       modbus: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>47625	 </span> ,

      value: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} > {FC_01_Current_Values_Uncorrected_Flow_Rate} {nameValue.m3h}</span> , 
       high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />, 
       low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainFC_01_Current_Values_Uncorrected_Flow_Rate}
       checked={maintainFC_01_Current_Values_Uncorrected_Flow_Rate}
   ></Checkbox>

      },

              
      {
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Volume} >{EVC_STT01Value}</span>,
      name: <span style={combineCss.CSSFC_01_Today_Values_Volume}>Standard Volume Vb Today</span> ,

      modbus: <span style={combineCss.CSSFC_01_Today_Values_Volume}>47627	 </span> ,

     value: <span style={combineCss.CSSFC_01_Today_Values_Volume} > {FC_01_Today_Values_Volume} {nameValue.Sm3}</span> , 
      high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Volume} onChange={handleInputChangeFC_01_Today_Values_Volume} inputMode="decimal" />, 
      low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Volume} onChange={handleInputChange2FC_01_Today_Values_Volume} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainFC_01_Today_Values_Volume}
      checked={maintainFC_01_Today_Values_Volume}
  ></Checkbox>

     },




    


            {
                
                 mainCategory: mainCategoryFC.FC01 ,
                timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>Gross Volume Vm Today</span> ,
       
            modbus: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>47629	 </span> ,
       
           value: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} > {FC_01_Today_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
            high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />, 
            low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainFC_01_Today_Values_Uncorrected_Volume}
            checked={maintainFC_01_Today_Values_Uncorrected_Volume}
        ></Checkbox>
       
           },
    
        




    {
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>Standard Volume Vb Yesterday</span> ,

    modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>47631	 </span> ,

   value: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} > {FC_01_Yesterday_Values_Volume}  {nameValue.Sm3}</span> , 
    high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Volume} inputMode="decimal" />, 
    low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Volume} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFC_01_Yesterday_Values_Volume}
    checked={maintainFC_01_Yesterday_Values_Volume}
></Checkbox>

   },


   {
    
     mainCategory: mainCategoryFC.FC01 ,
    timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
   name: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>Gross Volume Vm Yesterday</span> ,

   modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>47633	 </span> ,

  value: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} > {FC_01_Yesterday_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
   high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />, 
   low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainFC_01_Yesterday_Values_Uncorrected_Volume}
   checked={maintainFC_01_Yesterday_Values_Uncorrected_Volume}
></Checkbox>

  },

]


const dataFC02 = [




  {
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure} >{EVC_STT01Value}</span>,
  name: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure}>Input Pressure</span> ,

  modbus: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure}>48619	 </span> ,

 value: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure} > {FC_02_Current_Values_Static_Pressure}  {nameValue.Bara}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Static_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Static_Pressure} onChange={handleInputChangeFC_02_Current_Values_Static_Pressure} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Static_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Static_Pressure} onChange={handleInputChange2FC_02_Current_Values_Static_Pressure} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainFC_02_Current_Values_Static_Pressure}
  checked={maintainFC_02_Current_Values_Static_Pressure}
></Checkbox>

 },




 {
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Current_Values_Temperature} >{EVC_STT01Value}</span>,
 name: <span style={combineCss.CSSFC_02_Current_Values_Temperature}>Temperature</span> ,

 modbus: <span style={combineCss.CSSFC_02_Current_Values_Temperature}>48621	 </span> ,

value: <span style={combineCss.CSSFC_02_Current_Values_Temperature} > {FC_02_Current_Values_Temperature}  {nameValue.C}</span> , 
 high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Temperature} onChange={handleInputChangeFC_02_Current_Values_Temperature} inputMode="decimal" />, 
 low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Temperature} onChange={handleInputChange2FC_02_Current_Values_Temperature} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainFC_02_Current_Values_Temperature}
 checked={maintainFC_02_Current_Values_Temperature}
></Checkbox>

},
{
    
    mainCategory: mainCategoryFC.FC02 ,
   timeUpdate: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
 name: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}>Gross Volume Accumulated</span> ,

 modbus: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}>48615	 </span> ,

value: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume} > {FC_02_Accumulated_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
 high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />, 
 low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainFC_02_Accumulated_Values_Uncorrected_Volume}
 checked={maintainFC_02_Accumulated_Values_Uncorrected_Volume}
></Checkbox>

},

{
   
    mainCategory: mainCategoryFC.FC02 ,
   timeUpdate: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume} >{EVC_STT01Value}</span>,
  name: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume}>Standard Volume Accumulated</span> ,

  modbus: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume}>48617	 </span> ,

 value: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume} > {FC_02_Accumulated_Values_Volume}  {nameValue.Sm3}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Accumulated_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Accumulated_Values_Volume} onChange={handleInputChangeFC_02_Accumulated_Values_Volume} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Accumulated_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Accumulated_Values_Volume} onChange={handleInputChange2FC_02_Accumulated_Values_Volume} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainFC_02_Accumulated_Values_Volume}
  checked={maintainFC_02_Accumulated_Values_Volume}
></Checkbox>

 },
{
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate} >{EVC_STT01Value}</span>,
  name: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate}>Standard Volume Flow</span> ,

  modbus: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate}>48623	 </span> ,

 value: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate} > {FC_02_Current_Values_Flow_Rate}  {nameValue.Sm3h}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Flow_Rate} onChange={handleInputChangeFC_02_Current_Values_Flow_Rate} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Flow_Rate} onChange={handleInputChange2FC_02_Current_Values_Flow_Rate} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainFC_02_Current_Values_Flow_Rate}
  checked={maintainFC_02_Current_Values_Flow_Rate}
></Checkbox>

 },


 {
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate} >{EVC_STT01Value}</span>,
 name: <span style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}>Gross Volume Flow</span> ,

 modbus: <span style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}>8625	 </span> ,

value: <span style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate} > {FC_02_Current_Values_Uncorrected_Flow_Rate}  {nameValue.m3h}</span> , 
 high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChangeFC_02_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />, 
 low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChange2FC_02_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainFC_02_Current_Values_Uncorrected_Flow_Rate}
 checked={maintainFC_02_Current_Values_Uncorrected_Flow_Rate}
></Checkbox>

},


{
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Today_Values_Volume} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSFC_02_Today_Values_Volume}>Standard Volume Vb Today</span> ,

modbus: <span style={combineCss.CSSFC_02_Today_Values_Volume}>48627	 </span> ,

value: <span style={combineCss.CSSFC_02_Today_Values_Volume} > {FC_02_Today_Values_Volume}  {nameValue.Sm3}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Today_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Today_Values_Volume} onChange={handleInputChangeFC_02_Today_Values_Volume} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Today_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Today_Values_Volume} onChange={handleInputChange2FC_02_Today_Values_Volume} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_02_Today_Values_Volume}
checked={maintainFC_02_Today_Values_Volume}
></Checkbox>

},


{
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
name: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}>Gross Volume Vm Today</span> ,

modbus: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}>48629	 </span> ,

value: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume} > {FC_02_Today_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Today_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Today_Values_Uncorrected_Volume} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Today_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Today_Values_Uncorrected_Volume} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_02_Today_Values_Uncorrected_Volume}
checked={maintainFC_02_Today_Values_Uncorrected_Volume}
></Checkbox>

},




        

            {
                
                 mainCategory: mainCategoryFC.FC02 ,
                timeUpdate: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume}>Standard Volume Vb Yesterday</span> ,
    
             modbus: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume}>48631	 </span> ,
    
            value: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume} > {FC_02_Yesterday_Values_Volume}  {nameValue.Sm3}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Yesterday_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Yesterday_Values_Volume} onChange={handleInputChangeFC_02_Yesterday_Values_Volume} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Yesterday_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Yesterday_Values_Volume} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_02_Yesterday_Values_Volume}
             checked={maintainFC_02_Yesterday_Values_Volume}
         ></Checkbox>
    
            },
    
         
            {
                
                 mainCategory: mainCategoryFC.FC02 ,
                timeUpdate: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}>Gross Volume Vm Yesterday</span> ,
    
             modbus: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}>48633	 </span> ,
    
            value: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume} > {FC_02_Yesterday_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_02_Yesterday_Values_Uncorrected_Volume}
             checked={maintainFC_02_Yesterday_Values_Uncorrected_Volume}
         ></Checkbox>
    
            },
        ]

 

        const PLC = [

            {
                 mainCategory: mainCategoryFC.PLC ,
                timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD1}>Gas Detector GD-1401</span> ,
    
             modbus: <span style={combineCss.CSSGD1}>DB5F106</span> ,
    
            value: <span style={combineCss.CSSGD1} > {GD1}  {nameValue.LEL}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputValueGD1} onChange={handleInputChangeGD1} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1} onChange={handleInputChange2GD1} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD1}
             checked={maintainGD1}
         ></Checkbox>
    
            },


            {
                 mainCategory: mainCategoryFC.PLC ,
                timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD2}>Gas Detector GD-1402</span> ,
    
             modbus: <span style={combineCss.CSSGD2}>DB5F110	 </span> ,
    
            value: <span style={combineCss.CSSGD2} > {GD2}  {nameValue.LEL}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputValueGD2} onChange={handleInputChangeGD2} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2} onChange={handleInputChange2GD2} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD2}
             checked={maintainGD2}
         ></Checkbox>
    
            },

            {
                 mainCategory: mainCategoryFC.PLC ,
                timeUpdate: <span style={combineCss.CSSPT1} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSPT1}>Output Pressure PT-1403</span> ,
   
            modbus: <span style={combineCss.CSSPT1}>DB5F114	 </span> ,
   
           value: <span style={combineCss.CSSPT1} > {PT1}  {nameValue.BARG}</span> , 
            high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSPT1}   placeholder='High' step="0.1" type='number' value={inputValuePT1} onChange={handleInputChangePT1} inputMode="decimal" />, 
            low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSPT1}   placeholder='Low' step="0.1" type='number' value={inputValue2PT1} onChange={handleInputChange2PT1} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainPT1}
            checked={maintainPT1}
        ></Checkbox>
   
           },


           {
             mainCategory: mainCategoryFC.PLC ,
            timeUpdate: <span style={combineCss.CSSDI_ZSO_1} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSDI_ZSO_1}>SDV-1401 ZSO</span> ,
  
           modbus: <span style={combineCss.CSSDI_ZSO_1}>DB5W16	 </span> ,
  
          value: <span style={combineCss.CSSDI_ZSO_1} > {DI_ZSO_1} {DataDI_ZSO_1}</span> , 
           high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_ZSO_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSO_1} onChange={handleInputChangeDI_ZSO_1} inputMode="decimal" />, 
           low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_ZSO_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSO_1} onChange={handleInputChange2DI_ZSO_1} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainDI_ZSO_1}
           checked={maintainDI_ZSO_1}
       ></Checkbox>
  
          },





         {
             mainCategory: mainCategoryFC.PLC ,
            timeUpdate: <span style={combineCss.CSSDI_ZSC_1} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSDI_ZSC_1}>SDV-1401 ZSC</span> ,

         modbus: <span style={combineCss.CSSDI_ZSC_1}> DB5W18	 </span> ,

        value: <span style={combineCss.CSSDI_ZSC_1} > {DI_ZSC_1} {DataDI_ZSC_1}</span> , 
         high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_ZSC_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSC_1} onChange={handleInputChangeDI_ZSC_1} inputMode="decimal" />, 
         low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_ZSC_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSC_1} onChange={handleInputChange2DI_ZSC_1} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainDI_ZSC_1}
         checked={maintainDI_ZSC_1}
     ></Checkbox>

        },


        


      {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_MAP_1} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSDI_MAP_1}>MAP</span> ,

      modbus: <span style={combineCss.CSSDI_MAP_1}>DB5W24 </span> ,

     value: <span style={combineCss.CSSDI_MAP_1} > {DI_MAP_1} {DataDI_MAP_1}</span> , 
      high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_MAP_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_MAP_1} onChange={handleInputChangeDI_MAP_1} inputMode="decimal" />, 
      low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_MAP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_MAP_1} onChange={handleInputChange2DI_MAP_1} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainDI_MAP_1}
      checked={maintainDI_MAP_1}
  ></Checkbox>

     },
     {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_UPS_BATTERY} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSDI_UPS_BATTERY}>UPS BATTERY</span> ,
    
     modbus: <span style={combineCss.CSSDI_UPS_BATTERY}>DB5W26	 </span> ,
    
    value: <span style={combineCss.CSSDI_UPS_BATTERY} > {DI_UPS_BATTERY} {DataDI_UPS_BATTERY}</span> , 
     high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_BATTERY}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_BATTERY} onChange={handleInputChangeDI_UPS_BATTERY} inputMode="decimal" />, 
     low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_BATTERY}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_BATTERY} onChange={handleInputChange2DI_UPS_BATTERY} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainDI_UPS_BATTERY}
     checked={maintainDI_UPS_BATTERY}
    ></Checkbox>
    
    },


     {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_UPS_CHARGING} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSDI_UPS_CHARGING}>UPS CHARGING</span> ,

     modbus: <span style={combineCss.CSSDI_UPS_CHARGING}>DB5W28	 </span> ,

    value: <span style={combineCss.CSSDI_UPS_CHARGING} > {DI_UPS_CHARGING} {DataDI_UPS_CHARGING}</span> , 
     high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_CHARGING}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_CHARGING} onChange={handleInputChangeDI_UPS_CHARGING} inputMode="decimal" />, 
     low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_CHARGING}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_CHARGING} onChange={handleInputChange2DI_UPS_CHARGING} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainDI_UPS_CHARGING}
     checked={maintainDI_UPS_CHARGING}
 ></Checkbox>

    },


    {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_UPS_ALARM} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSDI_UPS_ALARM}>UPS ALARM</span> ,

    modbus: <span style={combineCss.CSSDI_UPS_ALARM}>DB5W30	 </span> ,

   value: <span style={combineCss.CSSDI_UPS_ALARM} > {DI_UPS_ALARM} {DataDI_UPS_ALARM}</span> , 
    high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_ALARM}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_ALARM} onChange={handleInputChangeDI_UPS_ALARM} inputMode="decimal" />, 
    low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_UPS_ALARM}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_ALARM} onChange={handleInputChange2DI_UPS_ALARM} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainDI_UPS_ALARM}
    checked={maintainDI_UPS_ALARM}
></Checkbox>

   },

   {
    mainCategory: mainCategoryFC.PLC ,
   timeUpdate: <span style={combineCss.CSSDI_SD_1} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSDI_SD_1}>Smoker Detected SD-1401</span> ,

 modbus: <span style={combineCss.CSSDI_SD_1}>DB5W32	 </span> ,

value: <span style={combineCss.CSSDI_SD_1} > {DI_SD_1} {DataDI_SD_1}</span> , 
 high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_SD_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_SD_1} onChange={handleInputChangeDI_SD_1} inputMode="decimal" />, 
 low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_SD_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SD_1} onChange={handleInputChange2DI_SD_1} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainDI_SD_1}
 checked={maintainDI_SD_1}
></Checkbox>

},


  {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDI_SELECT_SW} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSDI_SELECT_SW}>SELECT SW</span> ,

  modbus: <span style={combineCss.CSSDI_SELECT_SW}>DB5W34	 </span> ,

 value: <span style={combineCss.CSSDI_SELECT_SW} > {DI_SELECT_SW} {DataDI_SELECT_SW}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_SELECT_SW}   placeholder='High' step="0.1" type='number' value={inputValueDI_SELECT_SW} onChange={handleInputChangeDI_SELECT_SW} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_SELECT_SW}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SELECT_SW} onChange={handleInputChange2DI_SELECT_SW} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainDI_SELECT_SW}
  checked={maintainDI_SELECT_SW}
></Checkbox>

 },

 {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDI_RESET} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSDI_RESET}>Reset Button</span> ,

   modbus: <span style={combineCss.CSSDI_RESET}>40019	 </span> ,

  value: <span style={combineCss.CSSDI_RESET} > {DI_RESET} {DataDI_RESET}</span> , 
   high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_RESET}   placeholder='High' step="0.1" type='number' value={inputValueDI_RESET} onChange={handleInputChangeDI_RESET} inputMode="decimal" />, 
   low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDI_RESET}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_RESET} onChange={handleInputChange2DI_RESET} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainDI_RESET}
   checked={maintainDI_RESET}
></Checkbox>

  },


  {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSEmergency_NO} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSEmergency_NO}>Emergency Stop NO</span> ,

  modbus: <span style={combineCss.CSSEmergency_NO}>DB5W38	 </span> ,

 value: <span style={combineCss.CSSEmergency_NO} > {Emergency_NO} {DataEmergency_NO}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSEmergency_NO}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NO} onChange={handleInputChangeEmergency_NO} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSEmergency_NO}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NO} onChange={handleInputChange2Emergency_NO} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEmergency_NO}
  checked={maintainEmergency_NO}
></Checkbox>

 },






{
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSEmergency_NC} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSEmergency_NC}>Emergency Stop NC</span> ,

  modbus: <span style={combineCss.CSSEmergency_NC}>DB5W40	 </span> ,

 value: <span style={combineCss.CSSEmergency_NC} > {Emergency_NC} {DataEmergency_NC}</span> , 
  high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSEmergency_NC}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NC} onChange={handleInputChangeEmergency_NC} inputMode="decimal" />, 
  low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSEmergency_NC}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NC} onChange={handleInputChange2Emergency_NC} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEmergency_NC}
  checked={maintainEmergency_NC}
></Checkbox>

 },


 {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSUPS_Mode} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSUPS_Mode}>UPS MODE</span> ,

 modbus: <span style={combineCss.CSSUPS_Mode}>DB5W42	 </span> ,

value: <span style={combineCss.CSSUPS_Mode} > {UPS_Mode} {DataUPS_Mode}</span> , 
 high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSUPS_Mode}   placeholder='High' step="0.1" type='number' value={inputValueUPS_Mode} onChange={handleInputChangeUPS_Mode} inputMode="decimal" />, 
 low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSUPS_Mode}   placeholder='Low' step="0.1" type='number' value={inputValue2UPS_Mode} onChange={handleInputChange2UPS_Mode} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainUPS_Mode}
 checked={maintainUPS_Mode}
></Checkbox>

},

{
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDO_BC_01} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSDO_BC_01}> HORN</span> ,

modbus: <span style={combineCss.CSSDO_BC_01}>DB5W50	 </span> ,

value: <span style={combineCss.CSSDO_BC_01} > {DO_BC_01} {DataDO_HR_01}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_BC_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_BC_01} onChange={handleInputChangeDO_BC_01} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_BC_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_BC_01} onChange={handleInputChange2DO_BC_01} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDO_BC_01}
checked={maintainDO_BC_01}
></Checkbox>

},




{
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDO_HR_01} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSDO_HR_01}>BEACON</span> ,

modbus: <span style={combineCss.CSSDO_HR_01}>DB5W52	 </span> ,

value: <span style={combineCss.CSSDO_HR_01} > {DO_HR_01} {DataDO_BC_01}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_HR_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_HR_01} onChange={handleInputChangeDO_HR_01} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_HR_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_HR_01} onChange={handleInputChange2DO_HR_01} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDO_HR_01}
checked={maintainDO_HR_01}
></Checkbox>

},







{
    mainCategory: mainCategoryFC.PLC ,
   timeUpdate: <span style={combineCss.CSSDO_SV_01} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSDO_SV_01}>SDV-1401 SOLENOID</span> ,

modbus: <span style={combineCss.CSSDO_SV_01}>DB5W54	 </span> ,

value: <span style={combineCss.CSSDO_SV_01} > {DO_SV_01} {DataDO_SV_01}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_SV_01}   placeholder='High' step="0.1" type='number' value={inputValuDO_SV_01} onChange={handleInputChangeDO_SV_01} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSDO_SV_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_SV_01} onChange={handleInputChange2DO_SV_01} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDO_SV_01}
checked={maintainDO_SV_01}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.PLC ,
   timeUpdate: <span style={combineCss.CSSPLC_Conn_STT} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPLC_Conn_STT}>PLC Connection Status</span> ,

modbus: <span style={combineCss.CSSPLC_Conn_STT}>Status	 </span> ,

value: <span style={combineCss.CSSPLC_Conn_STT} > {PLC_Conn_STT} {DataPLC_Conn_STT}</span> , 
high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSPLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSPLC_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainPLC_Conn_STT}
checked={maintainPLC_Conn_STT}
></Checkbox>

},

          ]

          const dataFC = [

            {
                mainCategory: mainCategoryFC.FC ,
                timeUpdate: <span style={combineCss.CSSFC_Lithium_Battery_Status} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSFC_Lithium_Battery_Status}>Lithium Battery Status</span> ,
             modbus: <span style={combineCss.CSSFC_Lithium_Battery_Status}>5615	 </span> ,
            value: <span style={combineCss.CSSFC_Lithium_Battery_Status} > {FC_Lithium_Battery_Status} {DataFC_Lithium_Battery_Status}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Lithium_Battery_Status}   placeholder='High' step="0.1" type='number' value={inputValueFC_Lithium_Battery_Status} onChange={handleInputChangeFC_Lithium_Battery_Status} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Lithium_Battery_Status}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Lithium_Battery_Status} onChange={handleInputChange2FC_Lithium_Battery_Status} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_Lithium_Battery_Status}
             checked={maintainFC_Lithium_Battery_Status}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory:mainCategoryFC.FC ,
                timeUpdate: <span style={combineCss.CSSFC_Battery_Voltage} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSFC_Battery_Voltage}>Battery Voltage</span> ,
    
             modbus: <span style={combineCss.CSSFC_Battery_Voltage}>46615	 </span> ,
    
            value: <span style={combineCss.CSSFC_Battery_Voltage} > {FC_Battery_Voltage} {nameValue.Volt}</span> , 
             high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Battery_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_Battery_Voltage} onChange={handleInputChangeFC_Battery_Voltage} inputMode="decimal" />, 
             low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Battery_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Battery_Voltage} onChange={handleInputChange2FC_Battery_Voltage} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_Battery_Voltage}
             checked={maintainFC_Battery_Voltage}
         ></Checkbox>
    
            },

            {
                mainCategory:mainCategoryFC.FC ,
                timeUpdate: <span style={combineCss.CSSFC_System_Voltage} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSFC_System_Voltage}>System Voltage</span> ,
   
            modbus: <span style={combineCss.CSSFC_System_Voltage}>46617	 </span> ,
   
           value: <span style={combineCss.CSSFC_System_Voltage} > {FC_System_Voltage} {nameValue.Volt}</span> , 
            high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_System_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_System_Voltage} onChange={handleInputChangeFC_System_Voltage} inputMode="decimal" />, 
            low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_System_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_System_Voltage} onChange={handleInputChange2FC_System_Voltage} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainFC_System_Voltage}
            checked={maintainFC_System_Voltage}
        ></Checkbox>
   
           },

           {
            mainCategory:mainCategoryFC.FC ,
            timeUpdate: <span style={combineCss.CSSFC_Charger_Voltage} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSFC_Charger_Voltage}>Charger Voltage</span> ,
  
           modbus: <span style={combineCss.CSSFC_Charger_Voltage}>46619	 </span> ,
  
          value: <span style={combineCss.CSSFC_Charger_Voltage} > {FC_Charger_Voltage} {nameValue.Volt}</span> , 
           high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Charger_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_Charger_Voltage} onChange={handleInputChangeFC_Charger_Voltage} inputMode="decimal" />, 
           low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Charger_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Charger_Voltage} onChange={handleInputChange2FC_Charger_Voltage} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFC_Charger_Voltage}
           checked={maintainFC_Charger_Voltage}
       ></Checkbox>
  
          },



          {
            mainCategory:mainCategoryFC.FC ,
            timeUpdate: <span style={combineCss.CSSFC_Conn_STT} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSFC_Conn_STT}>FC Connection Status</span> ,
  
           modbus: <span style={combineCss.CSSFC_Conn_STT}>Status	 </span> ,
  
          value: <span style={combineCss.CSSFC_Conn_STT} > {FC_Conn_STT} {DataFC_Conn_STT}</span> , 
           high: <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueFC_Conn_STT} onChange={handleInputChangeFC_Conn_STT} inputMode="decimal" />, 
           low:  <InputText disabled={AuthInputHighLow} style={combineCss.CSSFC_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Conn_STT} onChange={handleInputChange2FC_Conn_STT} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFC_Conn_STT}
           checked={maintainFC_Conn_STT}
       ></Checkbox>
  
          },


        ]
          const combinedData = [...dataFC01, ...dataFC02 ,...dataFC, ...PLC, ];

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
    const Configuration = [
        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1401) (BarG)</span>,

            Value: (
                <InputText disabled={AuthInputHighLow}
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
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                disabled={AuthInputHighLow}

                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1402) (BarG)</span>,

            Value: (
                <InputText disabled={AuthInputHighLow}
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
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                disabled={AuthInputHighLow}

                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-1401) (BarG)</span>,

            Value: (
                <InputText 
                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputPSV_01}
                    onChange={handleInputPSV_01}
                    inputMode="decimal"
                disabled={AuthInputHighLow}

                />
            ),

            Update: (
                <Button
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}

                disabled={AuthInputHighLow}

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
                disabled={AuthInputHighLow}

                />
            ),

            Update: 
                <Button 
                disabled={AuthInputHighLow}
                
                className='buttonUpdateSetData'  onClick={confirmUpData} label='Update'  />,
            
        },

    ];

       //=========================================================================

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   borderRadius:10, marginTop:10 }}>
        {/* <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio> */}
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>YOSHINO</h2>

    <div style={{width:'100%' ,  borderRadius:5 }}>

        

    <DataTable size={'small'}    value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" 
                    sortOrder={1}   rowGroupHeaderTemplate={mainCategoryTemplate}   >
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
                <DataTable value={Configuration} size={"small"} selectionMode="single" >
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
