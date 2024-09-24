import React, { useEffect, useRef, useState } from "react";
import { id_ARAKAWA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css";
import SetAttribute1 from "../../OTSUKA/title-OTK";
import { httpApi } from "@/api/http.api";
import { DotGreen, DotRed } from "./SVG_Scorecard";
import 'primeicons/primeicons.css';

import { Down, Up } from "../SVG_Scorecard";

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
export default function ScoreCard_Arakawa() {
    const [data, setData] = useState<any[]>([]);
    const token = readToken();
    const [isVisible, setIsVisible] = useState(false);



    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

 


    const [resetKey, setResetKey] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const [cmdId, setCmdId] = useState(1); // Track cmdId for requests
 
    const connectWebSocket = (cmdId: number) => {
        const token = localStorage.getItem('accessToken');
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_ARAKAWA,
                    scope: "LATEST_TELEMETRY",
                    cmdId: cmdId, // Use dynamic cmdId for new requests
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
            };

            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData(prevData => [...prevData, dataReceived]);

                
                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Flow_at_Base_Condition: setEVC_01_Flow_at_Base_Condition,
                        EVC_01_Flow_at_Measurement_Condition: setEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Volume_at_Base_Condition: setEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition: setEVC_01_Volume_at_Measurement_Condition,
                        EVC_01_Pressure: setEVC_01_Pressure,

                        EVC_01_Temperature: setEVC_01_Temperature,
                        EVC_01_Vm_of_Last_Day: setEVC_01_Vm_of_Last_Day,
                        EVC_01_Vb_of_Last_Day: setEVC_01_Vb_of_Last_Day,
                        EVC_01_Vm_of_Current_Day: setEVC_01_Vm_of_Current_Day,
                        EVC_01_Vb_of_Current_Day: setEVC_01_Vb_of_Current_Day,

                        EVC_01_Remain_Battery_Service_Life: setEVC_01_Remain_Battery_Service_Life,

                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,

                        DI_UPS_BATTERY: setDI_UPS_BATTERY,
                        DI_UPS_CHARGING: setDI_UPS_CHARGING,
                        DI_UPS_ALARM: setDI_UPS_ALARM,
                        UPS_Mode: setUPS_Mode,
                        DI_MAP_1: setDI_MAP_1,
                        
                        DI_SELECT_SW: setDI_SELECT_SW,
                        DI_RESET: setDI_RESET,
                        Emergency_NO: setEmergency_NO,
                        Emergency_NC: setEmergency_NC,
                        DI_SD_1: setDI_SD_1,
                        DO_HR_01: setDO_HR_01,
                        DO_BC_01: setDO_BC_01,
                        DO_SV_01: setDO_SV_01,


                        EVC_01_Conn_STT: setEVC_01_Conn_STT,
                    PLC_Conn_STT: setPLC_Conn_STT,

                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setFC_Conn_STTValue,
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

              
                fetchData();
            };

        }
    };
    useEffect(() => {
        fetchData()
    },[isOnline])
    
    useEffect(() => {
        if (isOnline) {
            // Initial connection
            connectWebSocket(cmdId);
            fetchData()
        }

        return () => {
            if (ws.current) {
                console.log("Cleaning up WebSocket connection.");
                ws.current.close();
            }
        };
    }, [isOnline, cmdId]); // Reconnect if isOnline or cmdId changes
    

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            console.log('Back online. Reconnecting WebSocket with new cmdId.');
            setCmdId(prevCmdId => prevCmdId + 1); // Increment cmdId on reconnect
            fetchData()

        };

        const handleOffline = () => {
            setIsOnline(false);
            console.log('Offline detected. Closing WebSocket.');
            if (ws.current) {
                ws.current.close(); // Close WebSocket when offline
            }
        };

        // Attach event listeners for online/offline status
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            // Cleanup event listeners on unmount
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    //============================GD =============================


    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_ARAKAWA}/values/attributes/SERVER_SCOPE`
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


            const EVC_01_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setEVC_01_Vm_of_Last_Day_High(EVC_01_Vm_of_Last_Day_High?.value || null);
            const EVC_01_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setEVC_01_Vm_of_Last_Day_Low(EVC_01_Vm_of_Last_Day_Low?.value || null);
            const EVC_01_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
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

            const Emergency_NC_High = res.data.find((item: any) => item.key === "Emergency_NC_High");
            setEmergency_NC_High(Emergency_NC_High?.value || null);
            const Emergency_NC_Low = res.data.find((item: any) => item.key === "Emergency_NC_Low");
            setEmergency_NC_Low(Emergency_NC_Low?.value || null);
            const Emergency_NC_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NC_Maintain"
            );


            const DI_UPS_BATTERY_High = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
            setDI_UPS_BATTERY_High(DI_UPS_BATTERY_High?.value || null);
            const DI_UPS_BATTERY_Low = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
            setDI_UPS_BATTERY_Low(DI_UPS_BATTERY_Low?.value || null);
            const DI_UPS_BATTERY_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
            );

            const Emergency_NO_High = res.data.find((item: any) => item.key === "Emergency_NO_High");
            setEmergency_NO_High(Emergency_NO_High?.value || null);
            const Emergency_NO_Low = res.data.find((item: any) => item.key === "Emergency_NO_Low");
            setEmergency_NO_Low(Emergency_NO_Low?.value || null);
            const Emergency_NO_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NO_Maintain"
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

            const DO_SV_01_High = res.data.find((item: any) => item.key === "DO_SV_01_High");
            setDO_SV_01_High(DO_SV_01_High?.value || null);
            const DO_SV_01_Low = res.data.find((item: any) => item.key === "DO_SV_01_Low");
            setDO_SV_01_Low(DO_SV_01_Low?.value || null);
            const DO_SV_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_01_Maintain"
            );
            const DI_SD_1_High = res.data.find((item: any) => item.key === "DI_SD_1_High");
            setDI_SD_1_High(DI_SD_1_High?.value || null);
            const DI_SD_1_Low = res.data.find((item: any) => item.key === "DI_SD_1_Low");
            setDI_SD_1_Low(DI_SD_1_Low?.value || null);
            const DI_SD_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_SD_1_Maintain"
            );

            const EVC_01_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_High");
            setEVC_01_Conn_STT_High(EVC_01_Conn_STT_High?.value || null);
            const EVC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_Low");
            setEVC_01_Conn_STT_Low(EVC_01_Conn_STT_Low?.value || null);
            const EVC_01_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Conn_STT_Maintain"
            );
            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );

 // =====================
 // =================================================================================================================== 


 setMaintainEVC_01_Conn_STT(EVC_01_Conn_STT_Maintain?.value || false);

 setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);

            

            setMaintainEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Maintain?.value || false);

            setMaintainDI_SD_1(DI_SD_1_Maintain?.value || false);



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


           

            setMaintainGD1(GD1_Maintain?.value || false);


            setMaintainGD2(GD2_Maintain?.value || false);


            setMaintainPT1(PT1_Maintain?.value || false);


            setMaintainDI_ZSO_1(DI_ZSO_1_Maintain?.value || false);


            setMaintainUPS_Mode(UPS_Mode_Maintain?.value || false);

            setMaintainDI_RESET(DI_RESET_Maintain?.value || false);
            
            setMaintainEmergency_NO(Emergency_NO_Maintain?.value || false);
            
            setMaintainDI_UPS_BATTERY(DI_UPS_BATTERY_Maintain?.value || false);

            
            setMaintainEmergency_NC(Emergency_NC_Maintain?.value || false);



            setMaintainDI_SELECT_SW(DI_SELECT_SW_Maintain?.value || false);


            setMaintainDI_UPS_ALARM(DI_UPS_ALARM_Maintain?.value || false);


            setMaintainDI_UPS_CHARGING(DI_UPS_CHARGING_Maintain?.value || false);

            setMaintainDI_MAP_1(DI_MAP_1_Maintain?.value || false);





            setMaintainDI_ZSC_1(DI_ZSC_1_Maintain?.value || false);

            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 

const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
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
                        setExceedThresholdEVC_01_Remain_Battery_Service_Life(true);
                } else {
                    setExceedThresholdEVC_01_Remain_Battery_Service_Life(false);
                }
            } 
        } 
    }, [EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life,  EVC_01_Remain_Battery_Service_Life_Low,maintainEVC_01_Remain_Battery_Service_Life]);



     // =================================================================================================================== 

     const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);

     const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<number | null>(null);
     const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<number | null>(null);
     const [exceedThresholdEVC_01_Temperature, setExceedThresholdEVC_01_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof EVC_01_Temperature_High === 'string' && typeof EVC_01_Temperature_Low === 'string' && EVC_01_Temperature !== null && maintainEVC_01_Temperature === false
             ) {
                 const highValue = parseFloat(EVC_01_Temperature_High);
                 const lowValue = parseFloat(EVC_01_Temperature_Low);
                 const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_TemperatureValue)) {
                     if (highValue <= EVC_01_TemperatureValue || EVC_01_TemperatureValue <= lowValue) {
                             setExceedThresholdEVC_01_Temperature(true);
                     } else {
                         setExceedThresholdEVC_01_Temperature(false);
                     }
                 } 
             } 
         }, [EVC_01_Temperature_High, EVC_01_Temperature, EVC_01_Temperature_Low,maintainEVC_01_Temperature]);
     


     // =================================================================================================================== 


     const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);

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
                             setExceedThresholdEVC_01_Pressure(true);
                     } else {
                        setExceedThresholdEVC_01_Pressure(false);
                     }
                 } 
             } 
         }, [EVC_01_Pressure_High, EVC_01_Pressure, EVC_01_Pressure_Low,maintainEVC_01_Pressure]);
     



     // =================================================================================================================== 



          const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);

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
                                  setExceedThresholdEVC_01_Volume_at_Base_Condition(true);
                          } else {
                             setExceedThresholdEVC_01_Volume_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_Low,maintainEVC_01_Volume_at_Base_Condition]);
          

     
          // =================================================================================================================== 


          const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
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
                                  setExceedThresholdEVC_01_Volume_at_Measurement_Condition(true);
                          } else {
                             setExceedThresholdEVC_01_Volume_at_Measurement_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition , EVC_01_Volume_at_Measurement_Condition_Low,maintainEVC_01_Volume_at_Measurement_Condition]);
          

     
          // =================================================================================================================== 

          const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
 
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
                                  setExceedThresholdEVC_01_Flow_at_Base_Condition(true);
                          } else {
                             setExceedThresholdEVC_01_Flow_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_Low,maintainEVC_01_Flow_at_Base_Condition]);
              // =================================================================================================================== 
          

              const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
   
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
                                      setExceedThresholdEVC_01_Flow_at_Measurement_Condition(true);
                              } else {
                                 setExceedThresholdEVC_01_Flow_at_Measurement_Condition(false);
                              }
                          } 
                      } 
                  }, [EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_Low,maintainEVC_01_Flow_at_Measurement_Condition]);
              
       
         
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
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
                                  setExceedThresholdEVC_01_Vm_of_Current_Day(true);
                          } else {
                             setExceedThresholdEVC_01_Vm_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_Low,maintainEVC_01_Vm_of_Current_Day]);
          

     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
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
                                  setExceedThresholdEVC_01_Vb_of_Current_Day(true);
                          } else {
                             setExceedThresholdEVC_01_Vb_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_Low,maintainEVC_01_Vb_of_Current_Day]);

     
          // =================================================================================================================== 

        

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
    
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
                                  setExceedThresholdEVC_01_Vb_of_Last_Day(true);
                          } else {
                             setExceedThresholdEVC_01_Vb_of_Last_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low,maintainEVC_01_Vb_of_Last_Day]);
          

     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);

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
                            setExceedThresholdEVC_01_Vm_of_Last_Day(true);
                    } else {
                       setExceedThresholdEVC_01_Vm_of_Last_Day(false);
                    }
                } 
            } 
        }, [EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low,maintainEVC_01_Vm_of_Last_Day]);
    


    // =================================================================================================================== 
  // =================================================================================================================== 
 
 
  const [GD1, setGD1] = useState<string | null>(null);
  const [GD1_High, setGD1_High] = useState<number | null>(null);
  const [GD1_Low, setGD1_Low] = useState<number | null>(null);
  const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
  const [maintainGD1, setMaintainGD1] = useState<boolean>(false);
  
  
      useEffect(() => {
          if (typeof GD1_High === 'string' && typeof GD1_Low === 'string' && GD1 !== null && maintainGD1 === false
          ) {
              const highValue = parseFloat(GD1_High);
              const lowValue = parseFloat(GD1_Low);
              const GD1Value = parseFloat(GD1);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1Value)) {
                  if (highValue <= GD1Value || GD1Value <= lowValue) {
                          setExceedThresholdGD1(true);
                  } else {
                     setExceedThresholdGD1(false);
                  }
              } 
          } 
      }, [GD1_High, GD1, GD1_Low,maintainGD1]);


  // =================================================================================================================== 



       const [GD2, setGD2] = useState<string | null>(null);
       const [GD2_High, setGD2_High] = useState<number | null>(null);
       const [GD2_Low, setGD2_Low] = useState<number | null>(null);
       const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD2, setMaintainGD2] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof GD2_High === 'string' && typeof GD2_Low === 'string' && GD2 !== null && maintainGD2 === false
               ) {
                   const highValue = parseFloat(GD2_High);
                   const lowValue = parseFloat(GD2_Low);
                   const GD2Value = parseFloat(GD2);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2Value)) {
                       if (highValue <= GD2Value || GD2Value <= lowValue) {
                               setExceedThresholdGD2(true);
                       } else {
                          setExceedThresholdGD2(false);
                       }
                   } 
               } 
           }, [GD2_High, GD2, GD2_Low,maintainGD2]);
       

  
       // =================================================================================================================== 


       const [PT1, setPT1] = useState<string | null>(null);

       const [PT1_High, setPT1_High] = useState<number | null>(null);
       const [PT1_Low, setPT1_Low] = useState<number | null>(null);
       const [exceedThresholdPT1, setExceedThresholdPT1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       
       const [maintainPT1, setMaintainPT1] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof PT1_High === 'string' && typeof PT1_Low === 'string' && PT1 !== null && maintainPT1 === false
               ) {
                   const highValue = parseFloat(PT1_High);
                   const lowValue = parseFloat(PT1_Low);
                   const PT1Value = parseFloat(PT1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT1Value)) {
                       if (highValue <= PT1Value || PT1Value <= lowValue) {
                               setExceedThresholdPT1(true);
                       } else {
                          setExceedThresholdPT1(false);
                       }
                   } 
               } 
           }, [PT1_High, PT1 , PT1_Low,maintainPT1]);
       

  
       // =================================================================================================================== 

       const [DI_ZSO_1, setDI_ZSO_1] = useState<string | null>(null);
       const [DI_ZSO_1_High, setDI_ZSO_1_High] = useState<number | null>(null);
       const [DI_ZSO_1_Low, setDI_ZSO_1_Low] = useState<number | null>(null);
       const [exceedThresholdDI_ZSO_1, setExceedThresholdDI_ZSO_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainDI_ZSO_1, setMaintainDI_ZSO_1] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof DI_ZSO_1_High === 'string' && typeof DI_ZSO_1_Low === 'string' && DI_ZSO_1 !== null && maintainDI_ZSO_1 === false
               ) {
                   const highValue = parseFloat(DI_ZSO_1_High);
                   const lowValue = parseFloat(DI_ZSO_1_Low);
                   const DI_ZSO_1Value = parseFloat(DI_ZSO_1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSO_1Value)) {
                       if (highValue <= DI_ZSO_1Value || DI_ZSO_1Value <= lowValue) {
                               setExceedThresholdDI_ZSO_1(true);
                       } else {
                          setExceedThresholdDI_ZSO_1(false);
                       }
                   } 
               } 
           }, [DI_ZSO_1_High, DI_ZSO_1, DI_ZSO_1_Low,maintainDI_ZSO_1]);
       

  
  
       // =================================================================================================================== 

       const [DI_ZSC_1, setDI_ZSC_1] = useState<string | null>(null);
       const [DI_ZSC_1_High, setDI_ZSC_1_High] = useState<number | null>(null);
       const [DI_ZSC_1_Low, setDI_ZSC_1_Low] = useState<number | null>(null);
       const [exceedThresholdDI_ZSC_1, setExceedThresholdDI_ZSC_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainDI_ZSC_1, setMaintainDI_ZSC_1] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof DI_ZSC_1_High === 'string' && typeof DI_ZSC_1_Low === 'string' && DI_ZSC_1 !== null && maintainDI_ZSC_1 === false
               ) {
                   const highValue = parseFloat(DI_ZSC_1_High);
                   const lowValue = parseFloat(DI_ZSC_1_Low);
                   const DI_ZSC_1Value = parseFloat(DI_ZSC_1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSC_1Value)) {
                       if (highValue <= DI_ZSC_1Value || DI_ZSC_1Value <= lowValue) {
                               setExceedThresholdDI_ZSC_1(true);
                       } else {
                          setExceedThresholdDI_ZSC_1(false);
                       }
                   } 
               } 
           }, [DI_ZSC_1_High, DI_ZSC_1, DI_ZSC_1_Low,maintainDI_ZSC_1]);
       
 
  
       // =================================================================================================================== 




 // =================================================================================================================== 

 const [DI_MAP_1, setDI_MAP_1] = useState<string | null>(null);
 const [DI_MAP_1_High, setDI_MAP_1_High] = useState<number | null>(null);
 const [DI_MAP_1_Low, setDI_MAP_1_Low] = useState<number | null>(null);
 const [exceedThresholdDI_MAP_1, setExceedThresholdDI_MAP_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainDI_MAP_1, setMaintainDI_MAP_1] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof DI_MAP_1_High === 'string' && typeof DI_MAP_1_Low === 'string' && DI_MAP_1 !== null && maintainDI_MAP_1 === false
         ) {
             const highValue = parseFloat(DI_MAP_1_High);
             const lowValue = parseFloat(DI_MAP_1_Low);
             const DI_MAP_1Value = parseFloat(DI_MAP_1);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_MAP_1Value)) {
                 if (highValue <= DI_MAP_1Value || DI_MAP_1Value <= lowValue) {
                         setExceedThresholdDI_MAP_1(true);
                 } else {
                    setExceedThresholdDI_MAP_1(false);
                 }
             } 
         } 
     }, [DI_MAP_1_High, DI_MAP_1, DI_MAP_1_Low,maintainDI_MAP_1]);
 


 // =================================================================================================================== 

     // =================================================================================================================== 

     const [DI_UPS_CHARGING, setDI_UPS_CHARGING] = useState<string | null>(null);
     const [DI_UPS_CHARGING_High, setDI_UPS_CHARGING_High] = useState<number | null>(null);
     const [DI_UPS_CHARGING_Low, setDI_UPS_CHARGING_Low] = useState<number | null>(null);
     const [exceedThresholdDI_UPS_CHARGING, setExceedThresholdDI_UPS_CHARGING] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainDI_UPS_CHARGING, setMaintainDI_UPS_CHARGING] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof DI_UPS_CHARGING_High === 'string' && typeof DI_UPS_CHARGING_Low === 'string' && DI_UPS_CHARGING !== null && maintainDI_UPS_CHARGING === false
             ) {
                 const highValue = parseFloat(DI_UPS_CHARGING_High);
                 const lowValue = parseFloat(DI_UPS_CHARGING_Low);
                 const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_CHARGINGValue)) {
                     if (highValue <= DI_UPS_CHARGINGValue || DI_UPS_CHARGINGValue <= lowValue) {
                             setExceedThresholdDI_UPS_CHARGING(true);
                     } else {
                        setExceedThresholdDI_UPS_CHARGING(false);
                     }
                 } 
             } 
         }, [DI_UPS_CHARGING_High, DI_UPS_CHARGING, DI_UPS_CHARGING_Low,maintainDI_UPS_CHARGING]);
     
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [DI_UPS_ALARM, setDI_UPS_ALARM] = useState<string | null>(null);

 const [DI_UPS_ALARM_High, setDI_UPS_ALARM_High] = useState<number | null>(null);
 const [DI_UPS_ALARM_Low, setDI_UPS_ALARM_Low] = useState<number | null>(null);
 const [exceedThresholdDI_UPS_ALARM, setExceedThresholdDI_UPS_ALARM] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainDI_UPS_ALARM, setMaintainDI_UPS_ALARM] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof DI_UPS_ALARM_High === 'string' && typeof DI_UPS_ALARM_Low === 'string' && DI_UPS_ALARM !== null && maintainDI_UPS_ALARM === false
         ) {
             const highValue = parseFloat(DI_UPS_ALARM_High);
             const lowValue = parseFloat(DI_UPS_ALARM_Low);
             const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_ALARMValue)) {
                 if (highValue <= DI_UPS_ALARMValue || DI_UPS_ALARMValue <= lowValue) {
                         setExceedThresholdDI_UPS_ALARM(true);
                 } else {
                    setExceedThresholdDI_UPS_ALARM(false);
                 }
             } 
         } 
     }, [DI_UPS_ALARM_High, DI_UPS_ALARM, DI_UPS_ALARM_Low,maintainDI_UPS_ALARM]);
 



 // =================================================================================================================== 


     // =================================================================================================================== 

const [DI_SELECT_SW, setDI_SELECT_SW] = useState<string | null>(null);

const [DI_SELECT_SW_High, setDI_SELECT_SW_High] = useState<number | null>(null);
const [DI_SELECT_SW_Low, setDI_SELECT_SW_Low] = useState<number | null>(null);
const [exceedThresholdDI_SELECT_SW, setExceedThresholdDI_SELECT_SW] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainDI_SELECT_SW, setMaintainDI_SELECT_SW] = useState<boolean>(false);


 useEffect(() => {
     if (typeof DI_SELECT_SW_High === 'string' && typeof DI_SELECT_SW_Low === 'string' && DI_SELECT_SW !== null && maintainDI_SELECT_SW === false
     ) {
         const highValue = parseFloat(DI_SELECT_SW_High);
         const lowValue = parseFloat(DI_SELECT_SW_Low);
         const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SELECT_SWValue)) {
             if (highValue <= DI_SELECT_SWValue || DI_SELECT_SWValue <= lowValue) {
            
                     setExceedThresholdDI_SELECT_SW(true);
             } else {
                setExceedThresholdDI_SELECT_SW(false);
             }
         } 
     } 
 }, [DI_SELECT_SW_High, DI_SELECT_SW, DI_SELECT_SW_Low,maintainDI_SELECT_SW]);




// =================================================================================================================== 




 // =================================================================================================================== 

const [Emergency_NC, setEmergency_NC] = useState<string | null>(null);

const [Emergency_NC_High, setEmergency_NC_High] = useState<number | null>(null);
const [Emergency_NC_Low, setEmergency_NC_Low] = useState<number | null>(null);
const [exceedThresholdEmergency_NC, setExceedThresholdEmergency_NC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEmergency_NC, setMaintainEmergency_NC] = useState<boolean>(false);


useEffect(() => {
 if (typeof Emergency_NC_High === 'string' && typeof Emergency_NC_Low === 'string' && Emergency_NC !== null && maintainEmergency_NC === false
 ) {
     const highValue = parseFloat(Emergency_NC_High);
     const lowValue = parseFloat(Emergency_NC_Low);
     const Emergency_NCValue = parseFloat(Emergency_NC);

     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NCValue)) {
         if (highValue <= Emergency_NCValue || Emergency_NCValue <= lowValue) {
                 setExceedThresholdEmergency_NC(true);
         } else {
            setExceedThresholdEmergency_NC(false);
         }
     } 
 } 
}, [Emergency_NC_High, Emergency_NC, Emergency_NC_Low,maintainEmergency_NC]);




// =================================================================================================================== 


     // =================================================================================================================== 

     const [DI_UPS_BATTERY, setDI_UPS_BATTERY] = useState<string | null>(null);
    
     const [DI_UPS_BATTERY_High, setDI_UPS_BATTERY_High] = useState<number | null>(null);
     const [DI_UPS_BATTERY_Low, setDI_UPS_BATTERY_Low] = useState<number | null>(null);
     const [exceedThresholdDI_UPS_BATTERY, setExceedThresholdDI_UPS_BATTERY] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainDI_UPS_BATTERY, setMaintainDI_UPS_BATTERY] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof DI_UPS_BATTERY_High === 'string' && typeof DI_UPS_BATTERY_Low === 'string' && DI_UPS_BATTERY !== null && maintainDI_UPS_BATTERY === false
             ) {
                 const highValue = parseFloat(DI_UPS_BATTERY_High);
                 const lowValue = parseFloat(DI_UPS_BATTERY_Low);
                 const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_BATTERYValue)) {
                     if (highValue <= DI_UPS_BATTERYValue || DI_UPS_BATTERYValue <= lowValue) {
                             setExceedThresholdDI_UPS_BATTERY(true);
                     } else {
                        setExceedThresholdDI_UPS_BATTERY(false);
                     }
                 } 
             } 
         }, [DI_UPS_BATTERY_High, DI_UPS_BATTERY, DI_UPS_BATTERY_Low,maintainDI_UPS_BATTERY]);
     
 
     
     
     // =================================================================================================================== 
     
     
     const [Emergency_NO, setEmergency_NO] = useState<string | null>(null);
     const [Emergency_NO_High, setEmergency_NO_High] = useState<number | null>(null);
     const [Emergency_NO_Low, setEmergency_NO_Low] = useState<number | null>(null);
     const [exceedThresholdEmergency_NO, setExceedThresholdEmergency_NO] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainEmergency_NO, setMaintainEmergency_NO] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof Emergency_NO_High === 'string' && typeof Emergency_NO_Low === 'string' && Emergency_NO !== null && maintainEmergency_NO === false
             ) {
                 const highValue = parseFloat(Emergency_NO_High);
                 const lowValue = parseFloat(Emergency_NO_Low);
                 const Emergency_NOValue = parseFloat(Emergency_NO);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NOValue)) {
                     if (highValue <= Emergency_NOValue || Emergency_NOValue <= lowValue) {
                         
                             setExceedThresholdEmergency_NO(true);
                     } else {
                        setExceedThresholdEmergency_NO(false);
                     }
                 } 
             } 
         }, [Emergency_NO_High, Emergency_NO, , Emergency_NO_Low,maintainEmergency_NO]);
     
     
     
     
     // =================================================================================================================== 
     
         // =================================================================================================================== 
     
     const [UPS_Mode, setUPS_Mode] = useState<string | null>(null);
     const [UPS_Mode_High, setUPS_Mode_High] = useState<number | null>(null);
     const [UPS_Mode_Low, setUPS_Mode_Low] = useState<number | null>(null);
     const [exceedThresholdUPS_Mode, setExceedThresholdUPS_Mode] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainUPS_Mode, setMaintainUPS_Mode] = useState<boolean>(false);
     
     
     useEffect(() => {
         if (typeof UPS_Mode_High === 'string' && typeof UPS_Mode_Low === 'string' && UPS_Mode !== null && maintainUPS_Mode === false
         ) {
             const highValue = parseFloat(UPS_Mode_High);
             const lowValue = parseFloat(UPS_Mode_Low);
             const UPS_ModeValue = parseFloat(UPS_Mode);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UPS_ModeValue)) {
                 if (highValue <= UPS_ModeValue || UPS_ModeValue <= lowValue) {
                         setExceedThresholdUPS_Mode(true);
                 } else {
                    setExceedThresholdUPS_Mode(false);
                 }
             } 
         } 
     }, [UPS_Mode_High, UPS_Mode, , UPS_Mode_Low,maintainUPS_Mode]);
     

      // =================================================================================================================== 


     const [DO_HR_01, setDO_HR_01] = useState<string | null>(null);

     const [DO_HR_01_High, setDO_HR_01_High] = useState<number | null>(null);
     const [DO_HR_01_Low, setDO_HR_01_Low] = useState<number | null>(null);
     const [exceedThresholdDO_HR_01, setExceedThresholdDO_HR_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainDO_HR_01, setMaintainDO_HR_01] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof DO_HR_01_High === 'string' && typeof DO_HR_01_Low === 'string' && DO_HR_01 !== null && maintainDO_HR_01 === false
             ) {
                 const highValue = parseFloat(DO_HR_01_High);
                 const lowValue = parseFloat(DO_HR_01_Low);
                 const DO_HR_01Value = parseFloat(DO_HR_01);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_HR_01Value)) {
                     if (highValue <= DO_HR_01Value || DO_HR_01Value <= lowValue) {
                             setExceedThresholdDO_HR_01(true);
                     } else {
                         setExceedThresholdDO_HR_01(false);
                     }
                 } 
             } 
         }, [DO_HR_01_High, DO_HR_01, DO_HR_01_Low,maintainDO_HR_01]);
     
      

     // =================================================================================================================== 


     const [DI_RESET, setDI_RESET] = useState<string | null>(null);

     const [DI_RESET_High, setDI_RESET_High] = useState<number | null>(null);
     const [DI_RESET_Low, setDI_RESET_Low] = useState<number | null>(null);
     const [exceedThresholdDI_RESET, setExceedThresholdDI_RESET] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainDI_RESET, setMaintainDI_RESET] = useState<boolean>(false);
     
     
      useEffect(() => {
          if (typeof DI_RESET_High === 'string' && typeof DI_RESET_Low === 'string' && DI_RESET !== null && maintainDI_RESET === false
          ) {
              const highValue = parseFloat(DI_RESET_High);
              const lowValue = parseFloat(DI_RESET_Low);
              const DI_RESETValue = parseFloat(DI_RESET);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_RESETValue)) {
                  if (highValue <= DI_RESETValue || DI_RESETValue <= lowValue) {
                          setExceedThresholdDI_RESET(true);
                  } else {
                     setExceedThresholdDI_RESET(false);
                  }
              } 
          } 
      }, [DI_RESET_High, DI_RESET, DI_RESET_Low,maintainDI_RESET]);
     
   
     
     // =================================================================================================================== 


     // =================================================================================================================== 



          const [DO_BC_01, setDO_BC_01] = useState<string | null>(null);
  
          const [DO_BC_01_High, setDO_BC_01_High] = useState<number | null>(null);
          const [DO_BC_01_Low, setDO_BC_01_Low] = useState<number | null>(null);
          const [exceedThresholdDO_BC_01, setExceedThresholdDO_BC_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          const [maintainDO_BC_01, setMaintainDO_BC_01] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof DO_BC_01_High === 'string' && typeof DO_BC_01_Low === 'string' && DO_BC_01 !== null && maintainDO_BC_01 === false
                  ) {
                      const highValue = parseFloat(DO_BC_01_High);
                      const lowValue = parseFloat(DO_BC_01_Low);
                      const DO_BC_01Value = parseFloat(DO_BC_01);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_BC_01Value)) {
                          if (highValue <= DO_BC_01Value || DO_BC_01Value <= lowValue) {
                                  setExceedThresholdDO_BC_01(true);
                          } else {
                             setExceedThresholdDO_BC_01(false);
                          }
                      } 
                  } 
              }, [DO_BC_01_High, DO_BC_01, DO_BC_01_Low,maintainDO_BC_01]);
          
           
     
          // =================================================================================================================== 


          const [DO_SV_01, setDO_SV_01] = useState<string | null>(null);
 
          const [DO_SV_01_High, setDO_SV_01_High] = useState<number | null>(null);
          const [DO_SV_01_Low, setDO_SV_01_Low] = useState<number | null>(null);
          const [exceedThresholdDO_SV_01, setExceedThresholdDO_SV_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainDO_SV_01, setMaintainDO_SV_01] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof DO_SV_01_High === 'string' && typeof DO_SV_01_Low === 'string' && DO_SV_01 !== null && maintainDO_SV_01 === false
                  ) {
                      const highValue = parseFloat(DO_SV_01_High);
                      const lowValue = parseFloat(DO_SV_01_Low);
                      const DO_SV_01Value = parseFloat(DO_SV_01);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_SV_01Value)) {
                          if (highValue <= DO_SV_01Value || DO_SV_01Value <= lowValue) {
                                  setExceedThresholdDO_SV_01(true);
                          } else {
                             setExceedThresholdDO_SV_01(false);
                          }
                      } 
                  } 
              }, [DO_SV_01_High, DO_SV_01 , DO_SV_01_Low,maintainDO_SV_01]);
          
       
    
         
         // =================================================================================================================== 

         const [DI_SD_1, setDI_SD_1] = useState<string | null>(null);

        const [DI_SD_1_High, setDI_SD_1_High] = useState<number | null>(null);
        const [DI_SD_1_Low, setDI_SD_1_Low] = useState<number | null>(null);
        const [exceedThresholdDI_SD_1, setExceedThresholdDI_SD_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        const [maintainDI_SD_1, setMaintainDI_SD_1] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof DI_SD_1_High === 'string' && typeof DI_SD_1_Low === 'string' && DI_SD_1 !== null && maintainDI_SD_1 === false
         ) {
             const highValue = parseFloat(DI_SD_1_High);
             const lowValue = parseFloat(DI_SD_1_Low);
             const DI_SD_1Value = parseFloat(DI_SD_1);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SD_1Value)) {
                 if (highValue <= DI_SD_1Value || DI_SD_1Value <= lowValue) {
                         setExceedThresholdDI_SD_1(true);
                 } else {
                    setExceedThresholdDI_SD_1(false);
                 }
             } 
         } 
     }, [DI_SD_1_High, DI_SD_1, DI_SD_1_Low,maintainDI_SD_1]);
 
    // =================================================================================================================== 
    const [EVC_01_Conn_STT, setEVC_01_Conn_STT] = useState<string | null>(null);
     
    const [EVC_01_Conn_STT_High, setEVC_01_Conn_STT_High] = useState<number | null>(null);
    const [EVC_01_Conn_STT_Low, setEVC_01_Conn_STT_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Conn_STT, setexceedThresholdEVC_01_Conn_STT] = useState(false); 
    const [maintainEVC_01_Conn_STT, setMaintainEVC_01_Conn_STT] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_01_Conn_STTValue = parseFloat(EVC_01_Conn_STT as any);
        const highValue = EVC_01_Conn_STT_High ?? NaN;
        const lowValue = EVC_01_Conn_STT_Low ?? NaN;
    
        if (!isNaN(EVC_01_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Conn_STT) {
            setexceedThresholdEVC_01_Conn_STT(EVC_01_Conn_STTValue >= highValue || EVC_01_Conn_STTValue <= lowValue);
        }
    }, [EVC_01_Conn_STT, EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low, maintainEVC_01_Conn_STT]);
    

    // =================================================================================================================== 


const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);

const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdPLC_Conn_STT, setexceedThresholdPLC_Conn_STT] = useState(false); 
const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);

useEffect(() => {
const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
const highValue = PLC_Conn_STT_High ?? NaN;
const lowValue = PLC_Conn_STT_Low ?? NaN;

if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
   setexceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
}
}, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);



    // =================================================================================================================== 
    

     //======================================================================================================================
    const tagNameEVC = {
        Output: "Output Pressure (BarA)",
        Temperature: "Temperature (°C)",
        GVF: "Gross Volume Flow (m³/h)",
        SVF: "Standard Volume Flow (Sm³/h)",
        GVA: "Gross Volume Accumulated (m³)",
        SVA: "Standard Volume Accumulated (Sm³)",
        VbToday: "Standard Volume Vb Today (Sm³)",
        VbLastDay: "Standard Volume Vb Yesterday (Sm³)",
        VmToday: "Gross Volume Vm Today (m³)",
        VmLastDay: "Gross Volume Vm Yesterday (m³)",
        ReBattery: "Remain Battery Service Life (Months)",
        EVC_01_Conn_STT: "EVC-1601 Connection Status (0: Not Init - 1: COM OK - 2: Error)",
        PLC_Conn_STT: "PLC Connection Status (0: Not Init - 1: COM OK - 2: Error)",
    };

    const tagNamePLC = {
        PT01: "Input Pressure PT-1603        (BarG)",
        GD1: "Gas Detector GD-1601 (%LEL)",
        GD2: "Gas Detector GD-1602 (%LEL)",
        ZSC: "SDV-1601 ZSC (0: ON - 1: OFF)",
        ZSO: "SDV-1601 ZSO (0: OFF - 1: ON)",
        UPS_BATTERY: "UPS BATTERY (0: Normal - 1: Battery)",
        UPS_CHARGING: "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM: "UPS ALARM (0: Normal - 1: No Battery)",
        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",
        UPS_MODE:
            "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal)",
        SELECT_SW: "SELECT SW (0: Local - 1: Remote)",
        RESET: "RESET (0: OFF - 1: ON)",
        EmergencyNO: "Emergency Stop NO (0: Normal - 1: Emergency)",
        EmergencyNC: "Emergency Stop NC (0: Emergency - 1: Normal )",
        HORN: "HORN (0: OFF - 1: ON)",
        BEACON: "BEACON (0: OFF - 1: ON)",
        MAP: "MAP (0: Normal - 1: Emergency)",
        DO_SV_01: "SDV-1601 SOLENOID (0: OFF - 1: ON)",

    };

    const DataRESET = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON" : null;
    const DataDO_SV_01 = DO_SV_01 === "0" ? "OFF" : DO_SV_01 === "1" ? "ON" : null;
    const DataMap1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null;

    const DataSmoker_Detected = DI_SD_1 === "0" ? "Normal" : DI_SD_1 === "1" ? "Smoker Detected" : null;

    const DataCharging =
        DI_UPS_CHARGING === "0"
            ? "Normal"
            : DI_UPS_CHARGING === "1"
            ? "Charging"
            : null;
    const DataBattery =
        DI_UPS_BATTERY === "0" ? "Normal" : DI_UPS_BATTERY === "1" ? "Battery" : null;
    const DataAlarm =
        DI_UPS_ALARM === "0" ? "Normal" : DI_UPS_ALARM === "1" ? "No Battery" : null;
    const DataMode =
        UPS_Mode === "0"
            ? "Error"
            : UPS_Mode === "1"
            ? "UPS Running"
            : UPS_Mode === "2"
            ? "Charging"
            : UPS_Mode === "3"
            ? "No Battery"
            : UPS_Mode === "4"
            ? "Normal"
            : null;
            const DataZSO_1 = DI_ZSO_1 === "0" ? " OFF" : DI_ZSO_1 === "1" ? "ON" : null;
            const DataZSC_1 = DI_ZSC_1 === "0" ? " ON" : DI_ZSC_1 === "1" ? "OFF" : null;

    const DataDI_SELECT_SW =
        DI_SELECT_SW === "0" ? "Local" : DI_SELECT_SW === "1" ? "Remote" : null;
    const DataHorn = DO_HR_01 === "0" ? "OFF" : DO_HR_01 === "1" ? "ON" : null;
    const DataBeacon =
        DO_BC_01 === "0" ? "OFF" : DO_BC_01 === "1" ? "ON" : null;
    const DataEmergency_NO =
        Emergency_NO === "0"
            ? " Normal"
            : Emergency_NO === "1"
            ? "Emergency"
            : null;
    const DataEmergency_NC =
        Emergency_NC === "0"
            ? "Emergency"
            : Emergency_NC === "1"
            ? " Normal"
            : null;

            const DataEVC_01_Conn_STT  = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null;
            const DataPLC_Conn_STT  = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null;


            const combineCss = {



    


                CSSEVC_01_Remain_Battery_Service_Life : {
                    color:exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
                    ? "#ff5656"
                    : maintainEVC_01_Remain_Battery_Service_Life
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
                    ? 600
                    : maintainEVC_01_Remain_Battery_Service_Life
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
                    ? 18
                    : maintainEVC_01_Remain_Battery_Service_Life
                    ? 18
                    : "" ,
                    
                    
                },
                CSSEVC_01_Temperature : {
                    color:exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature
                    ? "#ff5656"
                    : maintainEVC_01_Temperature
                    ? "orange"
                    : "" ,

                    fontWeight: exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature
                    ? 600
                    : maintainEVC_01_Temperature
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature
                    ? 18
                    : maintainEVC_01_Temperature
                    ? 18
                    : "" ,
                    
                },
                CSSEVC_01_Pressure : {
                    color:exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
                    ? "#ff5656"
                    : maintainEVC_01_Pressure
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
                    ? 600
                    : maintainEVC_01_Pressure
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
                    ? 18
                    : maintainEVC_01_Pressure
                    ? 18
                    : "" ,
                    

                },
        
        
                CSSEVC_01_Volume_at_Base_Condition : {
                    color:exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                    ? "#ff5656"
                    : maintainEVC_01_Volume_at_Base_Condition
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                    ? 600
                    : maintainEVC_01_Volume_at_Base_Condition
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                    ? 18
                    : maintainEVC_01_Volume_at_Base_Condition
                    ? 18
                    : "" ,
                    
                },
        
        
                CSSEVC_01_Volume_at_Measurement_Condition : {
                    color:exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                    ? "#ff5656"
                    : maintainEVC_01_Volume_at_Measurement_Condition
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                    ? 600
                    : maintainEVC_01_Volume_at_Measurement_Condition
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                    ? 18
                    : maintainEVC_01_Volume_at_Measurement_Condition
                    ? 18
                    : "" ,
                    
                },
                CSSEVC_01_Flow_at_Base_Condition : {
                    color:exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition
                    ? "#ff5656"
                    : maintainEVC_01_Flow_at_Base_Condition
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition
                    ? 600
                    : maintainEVC_01_Flow_at_Base_Condition
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition
                    ? 18
                    : maintainEVC_01_Flow_at_Base_Condition
                    ? 18
                    : "" ,
                },
        
        
                CSSEVC_01_Flow_at_Measurement_Condition : {
                    color:exceedThresholdEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition
                    ? "#ff5656"
                    : maintainEVC_01_Flow_at_Measurement_Condition
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Flow_at_Measurement_Condition || maintainEVC_01_Flow_at_Measurement_Condition)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Flow_at_Measurement_Condition || maintainEVC_01_Flow_at_Measurement_Condition)
                    ? 18
                    : ""
                },
        
        
                CSSEVC_01_Vb_of_Current_Day : {
                    color:exceedThresholdEVC_01_Vb_of_Current_Day && !maintainEVC_01_Vb_of_Current_Day
                    ? "#ff5656"
                    : maintainEVC_01_Vb_of_Current_Day
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Vb_of_Current_Day || maintainEVC_01_Vb_of_Current_Day)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Vb_of_Current_Day || maintainEVC_01_Vb_of_Current_Day)
                    ? 18
                    : ""
                },

                CSSEVC_01_Vm_of_Current_Day : {
                    color:exceedThresholdEVC_01_Vm_of_Current_Day && !maintainEVC_01_Vm_of_Current_Day
                    ? "#ff5656"
                    : maintainEVC_01_Vm_of_Current_Day
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Vm_of_Current_Day || maintainEVC_01_Vm_of_Current_Day)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Vm_of_Current_Day || maintainEVC_01_Vm_of_Current_Day)
                    ? 18
                    : ""
                },
        
          
                CSSEVC_01_Vb_of_Last_Day : {
                    color:exceedThresholdEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day
                    ? "#ff5656"
                    : maintainEVC_01_Vb_of_Last_Day
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Vb_of_Last_Day || maintainEVC_01_Vb_of_Last_Day)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Vb_of_Last_Day || maintainEVC_01_Vb_of_Last_Day)
                    ? 18
                    : ""
                },
        
                CSSEVC_01_Vm_of_Last_Day : {
                    color:exceedThresholdEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day
                    ? "#ff5656"
                    : maintainEVC_01_Vm_of_Last_Day
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Vm_of_Last_Day || maintainEVC_01_Vm_of_Last_Day)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Vm_of_Last_Day || maintainEVC_01_Vm_of_Last_Day)
                    ? 18
                    : ""
                },
        
                CSSGD1 : {
                    color:exceedThresholdGD1 && !maintainGD1
                    ? "#ff5656"
                    : maintainGD1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD1 || maintainGD1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD1 || maintainGD1)
                    ? 18
                    : ""
                },
        
        
                CSSGD2 : {
                    color:exceedThresholdGD2 && !maintainGD2
                    ? "#ff5656"
                    : maintainGD2
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD2 || maintainGD2)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD2 || maintainGD2)
                    ? 18
                    : ""
                },
        
        
                CSSPT1 : {
                    color:exceedThresholdPT1 && !maintainPT1
                    ? "#ff5656"
                    : maintainPT1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT1 || maintainPT1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT1 || maintainPT1)
                    ? 18
                    : ""
                },
                CSSDI_ZSO_1 : {
                    color:exceedThresholdDI_ZSO_1 && !maintainDI_ZSO_1
                    ? "#ff5656"
                    : maintainDI_ZSO_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_ZSO_1 || maintainDI_ZSO_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_ZSO_1 || maintainDI_ZSO_1)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSDI_ZSC_1 : {
                    color:exceedThresholdDI_ZSC_1 && !maintainDI_ZSC_1
                    ? "#ff5656"
                    : maintainDI_ZSC_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_ZSC_1 || maintainDI_ZSC_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_ZSC_1 || maintainDI_ZSC_1)
                    ? 18
                    : ""
                },
           
        
                CSSDI_MAP_1 : {
                    color:exceedThresholdDI_MAP_1 && !maintainDI_MAP_1
                    ? "#ff5656"
                    : maintainDI_MAP_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_MAP_1 || maintainDI_MAP_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_MAP_1 || maintainDI_MAP_1)
                    ? 18
                    : ""
                },
        
                CSSDI_UPS_CHARGING : {
                    color:exceedThresholdDI_UPS_CHARGING && !maintainDI_UPS_CHARGING
                    ? "#ff5656"
                    : maintainDI_UPS_CHARGING
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_UPS_CHARGING || maintainDI_UPS_CHARGING)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_UPS_CHARGING || maintainDI_UPS_CHARGING)
                    ? 18
                    : ""
                },
        
                CSSDI_UPS_ALARM : {
                    color:exceedThresholdDI_UPS_ALARM && !maintainDI_UPS_ALARM
                    ? "#ff5656"
                    : maintainDI_UPS_ALARM
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_UPS_ALARM || maintainDI_UPS_ALARM)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_UPS_ALARM || maintainDI_UPS_ALARM)
                    ? 18
                    : ""
                },
        
                CSSDI_SELECT_SW : {
                    color:exceedThresholdDI_SELECT_SW && !maintainDI_SELECT_SW
                    ? "#ff5656"
                    : maintainDI_SELECT_SW
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_SELECT_SW || maintainDI_SELECT_SW)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_SELECT_SW || maintainDI_SELECT_SW)
                    ? 18
                    : ""
                },
        
                CSSDI_SD_1 : {
                    color:exceedThresholdDI_SD_1 && !maintainDI_SD_1
                    ? "#ff5656"
                    : maintainDI_SD_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_SD_1 || maintainDI_SD_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_SD_1 || maintainDI_SD_1)
                    ? 18
                    : ""
                },
        
        
                CSSDI_RESET : {
                    color:exceedThresholdDI_RESET && !maintainDI_RESET
                    ? "#ff5656"
                    : maintainDI_RESET
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_RESET || maintainDI_RESET)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_RESET || maintainDI_RESET)
                    ? 18
                    : ""
                },
        
                CSSEmergency_NO : {
                    color:exceedThresholdEmergency_NO && !maintainEmergency_NO
                    ? "#ff5656"
                    : maintainEmergency_NO
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEmergency_NO || maintainEmergency_NO)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEmergency_NO || maintainEmergency_NO)
                    ? 18
                    : ""
                },
        
        
        
        
                CSSDI_UPS_BATTERY : {
                    color:exceedThresholdDI_UPS_BATTERY && !maintainDI_UPS_BATTERY
                    ? "#ff5656"
                    : maintainDI_UPS_BATTERY
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_UPS_BATTERY || maintainDI_UPS_BATTERY)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_UPS_BATTERY || maintainDI_UPS_BATTERY)
                    ? 18
                    : ""
                },
        
        
                CSSEmergency_NC : {
                         color:exceedThresholdEmergency_NC && !maintainEmergency_NC
                    ? "#ff5656"
                    : maintainEmergency_NC
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEmergency_NC || maintainEmergency_NC)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEmergency_NC || maintainEmergency_NC)
                    ? 18
                    : ""
                },
        
                CSSUPS_Mode : {
                    color:exceedThresholdUPS_Mode && !maintainUPS_Mode
                    ? "#ff5656"
                    : maintainUPS_Mode
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdUPS_Mode || maintainUPS_Mode)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdUPS_Mode || maintainUPS_Mode)
                    ? 18
                    : ""
                },
        
                CSSDO_SV_01 : {
                    color:exceedThresholdDO_SV_01 && !maintainDO_SV_01
                    ? "#ff5656"
                    : maintainDO_SV_01
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDO_SV_01 || maintainDO_SV_01)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDO_SV_01 || maintainDO_SV_01)
                    ? 18
                    : ""
                },
                CSSDO_HR_01 : {
                    color:exceedThresholdDO_HR_01 && !maintainDO_HR_01
                    ? "#ff5656"
                    : maintainDO_HR_01
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDO_HR_01 || maintainDO_HR_01)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDO_HR_01 || maintainDO_HR_01)
                    ? 18
                    : ""
                },
                CSSDO_BC_01 : {
                    color:exceedThresholdDO_BC_01 && !maintainDO_BC_01
                    ? "#ff5656"
                    : maintainDO_BC_01
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDO_BC_01 || maintainDO_BC_01)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDO_BC_01 || maintainDO_BC_01)
                    ? 18
                    : ""
                },

                CSSEVC_01_Conn_STT : {
                    color:exceedThresholdEVC_01_Conn_STT && !maintainEVC_01_Conn_STT
                    ? "#ff5656"
                    : maintainEVC_01_Conn_STT
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_01_Conn_STT || maintainEVC_01_Conn_STT)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_01_Conn_STT || maintainEVC_01_Conn_STT)
                    ? 18
                    : ""
                },
                CSSPLC_Conn_STT : {
                    color:exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT
                    ? "#ff5656"
                    : maintainPLC_Conn_STT
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPLC_Conn_STT || maintainPLC_Conn_STT)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPLC_Conn_STT || maintainPLC_Conn_STT)
                    ? 18
                    : ""
                },
        
          };


          const formatValue = (value:any) => {
            return value !== null
                ? new Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 2,
                      useGrouping: true, 
                  }).format(parseFloat(value))
                : "";
        };
  
          const dataEVC = [
            {
                name: <span>{tagNameEVC.Output}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Pressure}>{formatValue(EVC_01_Pressure)}</span>,
            },
            {
                name: <span>{tagNameEVC.Temperature}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Temperature}>{formatValue(EVC_01_Temperature)}</span>,
            },
            {
                name: <span>{tagNameEVC.SVF}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>{formatValue(EVC_01_Flow_at_Base_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.GVF}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>{formatValue(EVC_01_Flow_at_Measurement_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.SVA}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>{formatValue(EVC_01_Volume_at_Base_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.GVA}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>{formatValue(EVC_01_Volume_at_Measurement_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.VbToday}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>{formatValue(EVC_01_Vb_of_Current_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VmToday}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>{formatValue(EVC_01_Vm_of_Current_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VbLastDay}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{formatValue(EVC_01_Vb_of_Last_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VmLastDay}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>{formatValue(EVC_01_Vm_of_Last_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.ReBattery}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>{EVC_01_Remain_Battery_Service_Life}</span>,
            },
        ];


        const dataEVC02 = [
            {
                name: <span>{tagNameEVC.Output}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Pressure}>{formatValue(EVC_01_Pressure)}</span>,
            },
            {
                name: <span>{tagNamePLC.PT01}</span>,
                evc1901: <span style={combineCss.CSSPT1}> {formatValue(PT1)}</span>,
            },
            {
                name: <span>{tagNameEVC.Temperature}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Temperature}>{formatValue(EVC_01_Temperature)}</span>,
            },
            
            {
                name: <span>{tagNameEVC.SVF}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>{formatValue(EVC_01_Flow_at_Base_Condition)}</span>,
            },
            
            {
                name: <span>{tagNameEVC.SVA}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>{formatValue(EVC_01_Volume_at_Base_Condition)}</span>,
            },
            
            {
                name: <span>{tagNameEVC.VbToday}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>{formatValue(EVC_01_Vb_of_Current_Day)}</span>,
            },
            
            {
                name: <span>{tagNameEVC.VbLastDay}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{formatValue(EVC_01_Vb_of_Last_Day)}</span>,
            },
            
        ];


        const STT = [

            {
                name: <span>{tagNameEVC.EVC_01_Conn_STT}</span>,
                STT: <span style={combineCss.CSSEVC_01_Conn_STT}>{formatValue(EVC_01_Conn_STT)} {DataEVC_01_Conn_STT}</span>,
            },
            {
                name: <span>{tagNameEVC.PLC_Conn_STT}</span>,
                STT: <span style={combineCss.CSSPLC_Conn_STT}>{formatValue(PLC_Conn_STT)} {DataPLC_Conn_STT}</span>,
            },
        ]
        
        const dataPLC = [
            {
                name: <span>{tagNamePLC.PT01}</span>,
                PLC: <span style={combineCss.CSSPT1}> {formatValue(PT1)}</span>,
            },
            {
                name: <span>{tagNamePLC.GD1}</span>,
                PLC: <span style={combineCss.CSSGD1}>{formatValue(GD1)}</span>,
            },
            {
                name: <span>{tagNamePLC.GD2}</span>,
                PLC: <span style={combineCss.CSSGD2}> {formatValue(GD2)}</span>,
            },
            {
                name: <span>{tagNamePLC.ZSO}</span>,
                PLC: <span style={combineCss.CSSDI_ZSO_1}>{DI_ZSO_1} {DataZSO_1}</span>,
            },
            {
                name: <span>{tagNamePLC.ZSC}</span>,
                PLC: <span style={combineCss.CSSDI_ZSC_1}>{DI_ZSC_1} {DataZSC_1}</span>,
            },
            {
                name: <span>{tagNamePLC.MAP}</span>,
                PLC: <span style={combineCss.CSSDI_MAP_1}> {DI_MAP_1} {DataMap1}</span>,
            },
            {
                name: <span>{tagNamePLC.UPS_BATTERY}</span>,
                PLC: <span style={combineCss.CSSDI_UPS_BATTERY}> {DI_UPS_BATTERY} {DataBattery}</span>,
            },
            {
                name: <span>{tagNamePLC.UPS_CHARGING}</span>,
                PLC: <span style={combineCss.CSSDI_UPS_CHARGING}> {DI_UPS_CHARGING} {DataCharging}</span>,
            },
            {
                name: <span>{tagNamePLC.UPS_ALARM}</span>,
                PLC: <span style={combineCss.CSSDI_UPS_ALARM}>{DI_UPS_ALARM} {DataAlarm}</span>,
            },
    
            // {
            //     name: <span>{tagNamePLC.Smoker_Detected}</span>,
            //     PLC: <sp an style={combineCss.CSSDI_SD_1}>{DI_SD_1} {DataSmoker_Detected}</span>,
            // },
            {
                name: <span>{tagNamePLC.SELECT_SW}</span>,
                PLC: <span style={combineCss.CSSDI_SELECT_SW}>{DI_SELECT_SW} {DataDI_SELECT_SW}</span>,
            },
            {
                name: <span>{tagNamePLC.RESET}</span>,
                PLC: <span style={combineCss.CSSDI_RESET}>{DI_RESET} {DataRESET}</span>,
            },
            {
                name: <span>{tagNamePLC.EmergencyNO}</span>,
                PLC: <span style={combineCss.CSSEmergency_NO}> {Emergency_NO} {DataEmergency_NO}</span>,
            },
            {
                name: <span>{tagNamePLC.EmergencyNC}</span>,
                PLC: <span style={combineCss.CSSEmergency_NC}>{Emergency_NC} {DataEmergency_NC}</span>,
            },
            {
                name: <span>{tagNamePLC.UPS_MODE}</span>,
                PLC: <span style={combineCss.CSSUPS_Mode}> {UPS_Mode} {DataMode}</span>,
            },
            {
                name: <span>{tagNamePLC.HORN}</span>,
                PLC: <span style={combineCss.CSSDO_HR_01}>{DO_HR_01} {DataHorn}</span>,
            },
            {
                name: <span>{tagNamePLC.BEACON}</span>,
                PLC: <span style={combineCss.CSSDO_BC_01}> {DO_BC_01} {DataBeacon}</span>,
            },
            {
                name: <span>{tagNamePLC.DO_SV_01}</span>,
                PLC: <span style={combineCss.CSSDO_SV_01}> {DO_SV_01} {DataDO_SV_01}</span>,
            },
        ];

    const [ShowMore,setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!ShowMore)
    }



    return (
        <div  >
                  <div className="Container_Scorecard1" >
                   <div className="Container_Scorecard2" >
                        <div className="Container_Name" >
                        Penang
                        </div>
                    </div>
                    <div
                    className="Container_Time_Show" >
                        
                        <div className="Container_Time" >
                           {FC_Conn_STTValue}
                        </div>
                        <div className="Container_Show"  onClick={handleShowMore} >
                    {ShowMore ?
                    
                    <span style={{fontSize:'2rem',cursor:'pointer'}}  className="pi pi-arrow-circle-down"></span>
                     :
                    <span style={{fontSize:'2rem',cursor:'pointer'}}  className="pi pi-arrow-circle-up"></span>}


                    </div>
                    </div>
                    
                </div>


                {ShowMore ?    <div> 
                    
                    
                <DataTable value={dataEVC02} size="small" selectionMode="single"> 
                    <Column field="name" header="EVC Parameter"></Column>
                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}
                        field="evc1901"
                        header={EVC_01_Conn_STT === "1" ? (
                            <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center',}}>
                            {DotGreen} <p>EVC-1601</p>
                           </div>
                        ) : (
                            <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center',}}>
                               {DotRed} <p>EVC-1601</p>
                            </div>
                        )}
                    ></Column>

                </DataTable>

                
                   
                    <DataTable value={STT} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > Status</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="STT"
                            header={PLC_Conn_STT === "1" ? (

                                <div style={{ padding:11,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                 <p style={{marginLeft:5}}></p>
   
                               </div>
                                
                            ) : (
                                <div style={{  padding:11, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                 <p style={{marginLeft:5}}></p>
                             </div>
                            )}
                        ></Column>
                    </DataTable>
                </div> 
                
                : 
                
                
                <div>

                       
                <DataTable value={dataEVC02} size="small" selectionMode="single"> 
                    <Column field="name" header="EVC Parameter"></Column>
                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}
                        field="evc1901"
                        header={EVC_01_Conn_STT === "1" ? (
                            <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center',}}>
                            {DotGreen} <p>EVC-1601</p>
                           </div>
                        ) : (
                            <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center',}}>
                               {DotRed} <p>EVC-1601</p>
                            </div>
                        )}
                    ></Column>

                </DataTable>
                </div> }

            
       

        </div>
    );
}
