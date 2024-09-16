
import React, { useEffect, useRef, useState } from "react";
import { id_CNG_PRU } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css";
import SetAttribute1 from "../../OTSUKA/title-OTK";
import { httpApi } from "@/api/http.api";
import { DotGreen, DotRed } from "./SVG_Scorecard";

import "./ScoreCard.css"

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
export default function ScoreCard_CNG_PRU() {
    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);


    const [EVC_STT01, setEVC_STT01] = useState<any | null>(null);
    const [EVC_STT02, setEVC_STT02] = useState<any | null>(null);

    const [PLC_Conn_STT, setPLC_Conn_STT] = useState<any | null>(null);

    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);

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
                    entityId: id_CNG_PRU,
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

            ws.current.onmessage = (event) => {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.update !== null) {
                    setData(prevData => [...prevData, dataReceived]);

              
                    const keys = Object?.keys(dataReceived.data);
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



                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Pressure: setEVC_02_Pressure,

                        EVC_02_Temperature: setEVC_02_Temperature,
                        EVC_02_Vm_of_Last_Day: setEVC_02_Vm_of_Last_Day,
                        EVC_02_Vb_of_Last_Day: setEVC_02_Vb_of_Last_Day,
                        EVC_02_Vm_of_Current_Day: setEVC_02_Vm_of_Current_Day,
                        EVC_02_Vb_of_Current_Day: setEVC_02_Vb_of_Current_Day,

                        EVC_02_Remain_Battery_Service_Life: setEVC_02_Remain_Battery_Service_Life,


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


                        HR_BC: setHR_BC,
                        ESD: setESD,
                        SD: setSD,
                        PT_6004: setPT_6004,


                        PUMP_3: setPUMP_3,
                        SDV_6003: setSDV_6003,


                        EVC_01_Conn_STT: setEVC_STT01,
                        EVC_02_Conn_STT: setEVC_STT02,

                        PLC_Conn_STT: setPLC_Conn_STT,

                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setFC_Conn_STTValue,
                        PLC_Conn_STT: setConn_STTValue,
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
                                .padStart(2, "0")} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate);
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

            const TIT_6002_High = res.data.find((item: any) => item.key === "TIT_6002_High");
            setTIT_6002_High(TIT_6002_High?.value || null);
            const TIT_6002_Low = res.data.find((item: any) => item.key === "TIT_6002_Low");
            setTIT_6002_Low(TIT_6002_Low?.value || null);
            const TIT_6002_Maintain = res.data.find(
                (item: any) => item.key === "TIT_6002_Maintain"
            );


            const TIT_6001A_High = res.data.find((item: any) => item.key === "TIT_6001A_High");
            setTIT_6001A_High(TIT_6001A_High?.value || null);
            const TIT_6001A_Low = res.data.find((item: any) => item.key === "TIT_6001A_Low");
            setTIT_6001A_Low(TIT_6001A_Low?.value || null);
            const TIT_6001A_Maintain = res.data.find(
                (item: any) => item.key === "TIT_6001A_Maintain"
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


            const HR_BC_High = res.data.find((item: any) => item.key === "HR_BC_High");
            setHR_BC_High(HR_BC_High?.value || null);
            const HR_BC_Low = res.data.find((item: any) => item.key === "HR_BC_Low");
            setHR_BC_Low(HR_BC_Low?.value || null);
            const HR_BC_Maintain = res.data.find(
                (item: any) => item.key === "HR_BC_Maintain"
            );


            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const ESD_Maintain = res.data.find(
                (item: any) => item.key === "ESD_Maintain"
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

 // =================================================================================================================== 


            setmaintainPUMP_3(PUMP_3_Maintain?.value || false);
            setmaintainSDV_6003(SDV_6003_Maintain?.value || false);


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
            setmaintainTIT_6002(TIT_6002_Maintain?.value || false);
            setmaintainTIT_6001A(TIT_6001A_Maintain?.value || false);
            setmaintainGD_6001(GD_6001_Maintain?.value || false);
            setmaintainSDV_6001A(SDV_6001A_Maintain?.value || false);
            setmaintainSDV_6001B(SDV_6001B_Maintain?.value || false);
            setmaintainSDV_6002(SDV_6002_Maintain?.value || false);
            setmaintainWater_LSW(Water_LSW_Maintain?.value || false);
            setmaintainWater_PG(Water_PG_Maintain?.value || false);
            setmaintainPUMP_2(PUMP_2_Maintain?.value || false);
            setmaintainPUMP_1(PUMP_1_Maintain?.value || false);
            setmaintainHEATER_2(HEATER_2_Maintain?.value || false);
            setmaintainHEATER_1(HEATER_1_Maintain?.value || false);
            setmaintainHEATER_3(HEATER_3_Maintain?.value || false);

            setmaintainBOILER(BOILER_Maintain?.value || false);
            setmaintainGD_STATUS(GD_STATUS_Maintain?.value || false);
            setmaintainHR_BC(HR_BC_Maintain?.value || false);
            setmaintainESD(ESD_Maintain?.value || false);
            setmaintainSD(SD_Maintain?.value || false);
            setmaintainPT_6004(PT_6004_Maintain?.value || false);

            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

// =================================================================================================================== 

const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
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



     // =================================================================================================================== 

     const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);

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
    


     // =================================================================================================================== 


     const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
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
    



     // =================================================================================================================== 



          const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
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
        

     
          // =================================================================================================================== 


          const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
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
        
     
          // =================================================================================================================== 

          const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
 
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
        
       
              // =================================================================================================================== 
          

              const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
   
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
            
       
         
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
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
        

     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
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
        
     
          // =================================================================================================================== 

        

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
    
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
     
    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);

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
    
    // =================================================================================================================== 


    
  // =================================================================================================================== 
 
 
  const [PIT_6001B, setPIT_6001B] = useState<string | null>(null);
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


  // =================================================================================================================== 



       const [PIT_6002A, setPIT_6002A] = useState<string | null>(null);
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
    

  
       // =================================================================================================================== 


       const [PIT_6002B, setPIT_6002B] = useState<string | null>(null);
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
    

  
       // =================================================================================================================== 


       const [PIT_6001A, setPIT_6001A] = useState<string | null>(null);

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

  
       // =================================================================================================================== 

       const [TIT_6001A, setTIT_6001A] = useState<string | null>(null);
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
    

  
  
       // =================================================================================================================== 

       const [TIT_6002, setTIT_6002] = useState<string | null>(null);
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
    
 
  
       // =================================================================================================================== 




 // =================================================================================================================== 

 const [BOILER, setBOILER] = useState<string | null>(null);
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


     // =================================================================================================================== 

     const [SDV_6001A, setSDV_6001A] = useState<string | null>(null);
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
    
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [SDV_6001B, setSDV_6001B] = useState<string | null>(null);

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




 // =================================================================================================================== 


     // =================================================================================================================== 

const [Water_PG, setWater_PG] = useState<string | null>(null);

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



 // =================================================================================================================== 

const [PUMP_2, setPUMP_2] = useState<string | null>(null);

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




// =================================================================================================================== 


     // =================================================================================================================== 

     const [GD_6001, setGD_6001] = useState<string | null>(null);
    
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
    
 
     
     
     // =================================================================================================================== 
     
     
     const [PUMP_1, setPUMP_1] = useState<string | null>(null);
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
    
     
         // =================================================================================================================== 
     
     const [SDV_6002, setSDV_6002] = useState<string | null>(null);
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
    

      // =================================================================================================================== 


     const [HEATER_2, setHEATER_2] = useState<string | null>(null);

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
    
      

     // =================================================================================================================== 


     const [Water_LSW, setWater_LSW] = useState<string | null>(null);

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
    

     // =================================================================================================================== 



          const [HEATER_1, setHEATER_1] = useState<string | null>(null);
  
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
        
           
     
          // =================================================================================================================== 




          const [HEATER_3, setHEATER_3] = useState<string | null>(null);
  
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
        
           
     
          // =================================================================================================================== 


          const [PIT_6003A, setPIT_6003A] = useState<string | null>(null);
 
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
        
       
    
         
         // =================================================================================================================== 




     // =================================================================================================================== 


     const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
 
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




     // =================================================================================================================== 

     const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);
 
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




     // =================================================================================================================== 

     const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
 
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





     // =================================================================================================================== 
     const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
 
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



          // =================================================================================================================== 
          const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
 
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

   
          

     
          // =================================================================================================================== 
          const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
 
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


              // =================================================================================================================== 

              const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
 
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
    

       
         
          // =================================================================================================================== 

          const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
 
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



     
     
          // =================================================================================================================== 

          const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
 
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


          // =================================================================================================================== 

          const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
 
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


    // =================================================================================================================== 

    const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
 
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



    
 // =================================================================================================================== 

 const [GD_STATUS, setGD_STATUS] = useState<string | null>(null);
 
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




          // =================================================================================================================== 
      

    
    
         // =================================================================================================================== 
         const [HR_BC, setHR_BC] = useState<string | null>(null);
 
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
        
    
         // =================================================================================================================== 
    
    
    
              const [ESD, setESD] = useState<string | null>(null);
   
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
         
              // =================================================================================================================== 
              const [SD, setSD] = useState<string | null>(null);
   
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
              
              // =================================================================================================================== 
    
              const [PT_6004, setPT_6004] = useState<string | null>(null);
          
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
            
              
         
              // =================================================================================================================== 



              const [PUMP_3, setPUMP_3] = useState<string | null>(null);
   
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
              
              // =================================================================================================================== 
    
              const [SDV_6003, setSDV_6003] = useState<string | null>(null);
          
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
            
              
         
              // =================================================================================================================== 

    // =================================================================================================================== 
    const tagNameEVC = {
        InputPressure: "Output Pressure (BarA)",
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
    };

    const tagNamePLC = {
        PIT_6001A: "Pressure Indicator Transmitter PIT-6001A (BarG)",
        PIT_6001B: "Pressure Indicator Transmitter PIT-6001B (BarG)",
        PIT_6002A: "Pressure Indicator Transmitter PIT-6002A (BarG)",
        PIT_6002B: "Pressure Indicator Transmitter PIT-6002B (BarG)",
        PIT_6003A: "Pressure Indicator Transmitter PIT-6003A (BarG)",

        TIT_6002: "Temperature Indicator Transmitter TIT-6001A (˚C)",
        TIT_6001A: "Temperature Indicator Transmitter TIT-6002 (˚C)",
        GD_6001: "Gas Detector GD-6001 (%LEL)",
        SDV_6001A: "Shutdown Valve SDV-6001A (0: Close - 1: Open)",
        SDV_6001B: "Shutdown Valve SDV-6001B (0: Close - 1: Open)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",

        SDV_6002:
            "Shutdown Valve SDV-6002 (0: Close - 1: Open)",
        Water_PG: "Water Pressure (0: Normal - 1: Pressure Low)",
        Water_LSW: "Water Level (0: Normal - 1: Water Low)",
        PUMP_1: "Pump 1 (0: Stop - 1: Run)",
        PUMP_2: "Pump 2 (0: Stop - 1: Run)",
        HEATER_1: "Heater 1 (0: Stop - 1: Run)",
        HEATER_2: "Heater 2 (0: Stop - 1: Run)",

        HEATER_3: "Heater 3 (0: Stop - 1: Run)",

        BOILER: "Boiler (0: Manual - 1: Auto)",


        GD_STATUS: "Gas Detector ST (0: Normal - 1: Alarm)",
        ESD: "Emergency Shutdown (0: Normal - 1: Alarm)",

        HR_BC: "Horn And Beacon (0: Normal - 1: Alarm)",
        SD: "Smoker Detector (0: Normal - 1: Alarm)",
        PT_6004: "Pressure Transmitter PT-6004 (BarG)",


        PUMP_3: "Pump 3 (0: Stop - 1: Run)",
        SDV_6003: "Shutdown Valve SDV-6003 (0: Close - 1: Open)",
    };



    const DataGD_STATUS = GD_STATUS === "0" ? "Normal" : GD_STATUS === "1" ? "Alarm" : null;
    const DataHR_BC = HR_BC === "0" ? "Normal" : HR_BC === "1" ? "Alarm" : null;
    const DataESD = ESD === "0" ? "Normal" : ESD === "1" ? "Alarm" : null;
    const DataSD = SD === "0" ? "Normal" : SD === "1" ? "Alarm" : null;

    const DataPT_6004 = PT_6004 === "0" ? "Normal" : PT_6004 === "1" ? "Smoker Detected" : null;

    const DataWater_LSW = Water_LSW === "0" ? "Normal" : Water_LSW === "1" ? "Water Low" : null;
    const DataPIT_6003A = PIT_6003A === "0" ? "OFF" : PIT_6003A === "1" ? "ON" : null;
    const DataBOILER = BOILER === "0" ? "Manual" : BOILER === "1" ? "Auto" : null;
    const DataTIT_6002 = TIT_6002 === "0" ? "ON" : TIT_6002 === "1" ? "OFF" : null;
    const DataTIT_6001A = TIT_6001A === "0" ? "OFF" : TIT_6001A === "1" ? "ON" : null;

    const DataCharging =
        SDV_6001A === "0"
            ? "Close"
            : SDV_6001A === "1"
            ? "Open"
            : null;
    const DataBattery =
        GD_6001 === "0" ? "Normal" : GD_6001 === "1" ? "Battery" : null;
    const DataAlarm =
        SDV_6001B === "0" ? "Close" : SDV_6001B === "1" ? "Open" : null;
    const DataMode =
    SDV_6002 === "0" ? "Close" : SDV_6002 === "1" ? "Open" : null;


    const DataWater_PG =
        Water_PG === "0" ? "Normal" : Water_PG === "1" ? " Pressure Low" : null;
    const DataHEATER_1 = HEATER_1 === "0" ? "Stop" : HEATER_1 === "1" ? "Run" : null;
    const DataHEATER_2 = HEATER_2 === "0" ? "Stop" : HEATER_2 === "1" ? "Run" : null;
    const DataHEATER_3 = HEATER_3 === "0" ? "Stop" : HEATER_3 === "1" ? "Run" : null;


    const DataPUMP_3 = PUMP_3 === "0" ? "Stop" : PUMP_3 === "1" ? "Run" : null;
    const DataSDV_6003 = SDV_6003 === "0" ? "Close" : SDV_6003 === "1" ? "Open" : null;


    const DataPUMP_1 =
        PUMP_1 === "0"
            ? "Stop"
            : PUMP_1 === "1"
            ? "Run"
            : null;
    const DataPUMP_2 =
        PUMP_2 === "0"
            ? "Stop"
            : PUMP_2 === "1"
            ? " Run"
            : null;

            const combineCss = {



    //===========================================================================================================================================


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
    //===========================================================================================================================================
    CSSEVC_02_Remain_Battery_Service_Life : {
        color:exceedThresholdEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
        ? "#ff5656"
        : maintainEVC_02_Remain_Battery_Service_Life
        ? "orange"
        : "" ,
        fontWeight: exceedThresholdEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
        ? 600
        : maintainEVC_02_Remain_Battery_Service_Life
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
        ? 18
        : maintainEVC_02_Remain_Battery_Service_Life
        ? 18
        : "" ,
        
        
    },
    CSSEVC_02_Temperature : {
        color:exceedThresholdEVC_02_Temperature && !maintainEVC_02_Temperature
        ? "#ff5656"
        : maintainEVC_02_Temperature
        ? "orange"
        : "" ,

        fontWeight: exceedThresholdEVC_02_Temperature && !maintainEVC_02_Temperature
        ? 600
        : maintainEVC_02_Temperature
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Temperature && !maintainEVC_02_Temperature
        ? 18
        : maintainEVC_02_Temperature
        ? 18
        : "" ,
        
    },
    CSSEVC_02_Pressure : {
        color:exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
        ? "#ff5656"
        : maintainEVC_02_Pressure
        ? "orange"
        : "" ,
        fontWeight: exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
        ? 600
        : maintainEVC_02_Pressure
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
        ? 18
        : maintainEVC_02_Pressure
        ? 18
        : "" ,
        

    },


    CSSEVC_02_Volume_at_Base_Condition : {
        color:exceedThresholdEVC_02_Volume_at_Base_Condition && !maintainEVC_02_Volume_at_Base_Condition
        ? "#ff5656"
        : maintainEVC_02_Volume_at_Base_Condition
        ? "orange"
        : "" ,
        fontWeight: exceedThresholdEVC_02_Volume_at_Base_Condition && !maintainEVC_02_Volume_at_Base_Condition
        ? 600
        : maintainEVC_02_Volume_at_Base_Condition
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Volume_at_Base_Condition && !maintainEVC_02_Volume_at_Base_Condition
        ? 18
        : maintainEVC_02_Volume_at_Base_Condition
        ? 18
        : "" ,
        
    },


    CSSEVC_02_Volume_at_Measurement_Condition : {
        color:exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
        ? "#ff5656"
        : maintainEVC_02_Volume_at_Measurement_Condition
        ? "orange"
        : "" ,
        fontWeight: exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
        ? 600
        : maintainEVC_02_Volume_at_Measurement_Condition
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
        ? 18
        : maintainEVC_02_Volume_at_Measurement_Condition
        ? 18
        : "" ,
        
    },
    CSSEVC_02_Flow_at_Base_Condition : {
        color:exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
        ? "#ff5656"
        : maintainEVC_02_Flow_at_Base_Condition
        ? "orange"
        : "" ,
        fontWeight: exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
        ? 600
        : maintainEVC_02_Flow_at_Base_Condition
        ? 600
        : "" ,
        fontSize:exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
        ? 18
        : maintainEVC_02_Flow_at_Base_Condition
        ? 18
        : "" ,
    },


    CSSEVC_02_Flow_at_Measurement_Condition : {
        color:exceedThresholdEVC_02_Flow_at_Measurement_Condition && !maintainEVC_02_Flow_at_Measurement_Condition
        ? "#ff5656"
        : maintainEVC_02_Flow_at_Measurement_Condition
        ? "orange"
        : "" ,
        fontWeight: (exceedThresholdEVC_02_Flow_at_Measurement_Condition || maintainEVC_02_Flow_at_Measurement_Condition)
        ? 600
        : "",
        fontSize: (exceedThresholdEVC_02_Flow_at_Measurement_Condition || maintainEVC_02_Flow_at_Measurement_Condition)
        ? 18
        : ""
    },


    CSSEVC_02_Vb_of_Current_Day : {
        color:exceedThresholdEVC_02_Vb_of_Current_Day && !maintainEVC_02_Vb_of_Current_Day
        ? "#ff5656"
        : maintainEVC_02_Vb_of_Current_Day
        ? "orange"
        : "" ,
        fontWeight: (exceedThresholdEVC_02_Vb_of_Current_Day || maintainEVC_02_Vb_of_Current_Day)
        ? 600
        : "",
        fontSize: (exceedThresholdEVC_02_Vb_of_Current_Day || maintainEVC_02_Vb_of_Current_Day)
        ? 18
        : ""
    },

    CSSEVC_02_Vm_of_Current_Day : {
        color:exceedThresholdEVC_02_Vm_of_Current_Day && !maintainEVC_02_Vm_of_Current_Day
        ? "#ff5656"
        : maintainEVC_02_Vm_of_Current_Day
        ? "orange"
        : "" ,
        fontWeight: (exceedThresholdEVC_02_Vm_of_Current_Day || maintainEVC_02_Vm_of_Current_Day)
        ? 600
        : "",
        fontSize: (exceedThresholdEVC_02_Vm_of_Current_Day || maintainEVC_02_Vm_of_Current_Day)
        ? 18
        : ""
    },


    CSSEVC_02_Vb_of_Last_Day : {
        color:exceedThresholdEVC_02_Vb_of_Last_Day && !maintainEVC_02_Vb_of_Last_Day
        ? "#ff5656"
        : maintainEVC_02_Vb_of_Last_Day
        ? "orange"
        : "" ,
        fontWeight: (exceedThresholdEVC_02_Vb_of_Last_Day || maintainEVC_02_Vb_of_Last_Day)
        ? 600
        : "",
        fontSize: (exceedThresholdEVC_02_Vb_of_Last_Day || maintainEVC_02_Vb_of_Last_Day)
        ? 18
        : ""
    },

    CSSEVC_02_Vm_of_Last_Day : {
        color:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
        ? "#ff5656"
        : maintainEVC_02_Vm_of_Last_Day
        ? "orange"
        : "" ,
        fontWeight: (exceedThresholdEVC_02_Vm_of_Last_Day || maintainEVC_02_Vm_of_Last_Day)
        ? 600
        : "",
        fontSize: (exceedThresholdEVC_02_Vm_of_Last_Day || maintainEVC_02_Vm_of_Last_Day)
        ? 18
        : ""
    },
                CSSPIT_6001B : {
                    color:exceedThresholdPIT_6001B && !maintainPIT_6001B
                    ? "#ff5656"
                    : maintainPIT_6001B
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_6001B || maintainPIT_6001B)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_6001B || maintainPIT_6001B)
                    ? 18
                    : ""
                },
        
        
                CSSPIT_6002A : {
                    color:exceedThresholdPIT_6002A && !maintainPIT_6002A
                    ? "#ff5656"
                    : maintainPIT_6002A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_6002A || maintainPIT_6002A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_6002A || maintainPIT_6002A)
                    ? 18
                    : ""
                },

                CSSPIT_6002B : {
                    color:exceedThresholdPIT_6002B && !maintainPIT_6002B
                    ? "#ff5656"
                    : maintainPIT_6002B
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_6002B || maintainPIT_6002B)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_6002B || maintainPIT_6002B)
                    ? 18
                    : ""
                },
        
        
                CSSPIT_6001A : {
                    color:exceedThresholdPIT_6001A && !maintainPIT_6001A
                    ? "#ff5656"
                    : maintainPIT_6001A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_6001A || maintainPIT_6001A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_6001A || maintainPIT_6001A)
                    ? 18
                    : ""
                },
                CSSTIT_6001A : {
                    color:exceedThresholdTIT_6001A && !maintainTIT_6001A
                    ? "#ff5656"
                    : maintainTIT_6001A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTIT_6001A || maintainTIT_6001A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTIT_6001A || maintainTIT_6001A)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSTIT_6002 : {
                    color:exceedThresholdTIT_6002 && !maintainTIT_6002
                    ? "#ff5656"
                    : maintainTIT_6002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTIT_6002 || maintainTIT_6002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTIT_6002 || maintainTIT_6002)
                    ? 18
                    : ""
                },
           
        
                CSSBOILER : {
                    color:exceedThresholdBOILER && !maintainBOILER
                    ? "#ff5656"
                    : maintainBOILER
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdBOILER || maintainBOILER)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdBOILER || maintainBOILER)
                    ? 18
                    : ""
                },
        
                CSSSDV_6001A : {
                    color:exceedThresholdSDV_6001A && !maintainSDV_6001A
                    ? "#ff5656"
                    : maintainSDV_6001A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_6001A || maintainSDV_6001A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_6001A || maintainSDV_6001A)
                    ? 18
                    : ""
                },
        
                CSSSDV_6001B : {
                    color:exceedThresholdSDV_6001B && !maintainSDV_6001B
                    ? "#ff5656"
                    : maintainSDV_6001B
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_6001B || maintainSDV_6001B)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_6001B || maintainSDV_6001B)
                    ? 18
                    : ""
                },
        
                CSSWater_PG : {
                    color:exceedThresholdWater_PG && !maintainWater_PG
                    ? "#ff5656"
                    : maintainWater_PG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdWater_PG || maintainWater_PG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdWater_PG || maintainWater_PG)
                    ? 18
                    : ""
                },
        
        
                CSSWater_LSW : {
                    color:exceedThresholdWater_LSW && !maintainWater_LSW
                    ? "#ff5656"
                    : maintainWater_LSW
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdWater_LSW || maintainWater_LSW)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdWater_LSW || maintainWater_LSW)
                    ? 18
                    : ""
                },
        
                CSSPUMP_1 : {
                    color:exceedThresholdPUMP_1 && !maintainPUMP_1
                    ? "#ff5656"
                    : maintainPUMP_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPUMP_1 || maintainPUMP_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPUMP_1 || maintainPUMP_1)
                    ? 18
                    : ""
                },
        
        
        
        
                CSSGD_6001 : {
                    color:exceedThresholdGD_6001 && !maintainGD_6001
                    ? "#ff5656"
                    : maintainGD_6001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_6001 || maintainGD_6001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_6001 || maintainGD_6001)
                    ? 18
                    : ""
                },
        
        
                CSSPUMP_2 : {
                         color:exceedThresholdPUMP_2 && !maintainPUMP_2
                    ? "#ff5656"
                    : maintainPUMP_2
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPUMP_2 || maintainPUMP_2)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPUMP_2 || maintainPUMP_2)
                    ? 18
                    : ""
                },
        
                CSSSDV_6002 : {
                    color:exceedThresholdSDV_6002 && !maintainSDV_6002
                    ? "#ff5656"
                    : maintainSDV_6002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_6002 || maintainSDV_6002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_6002 || maintainSDV_6002)
                    ? 18
                    : ""
                },
        
                CSSPIT_6003A : {
                    color:exceedThresholdPIT_6003A && !maintainPIT_6003A
                    ? "#ff5656"
                    : maintainPIT_6003A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_6003A || maintainPIT_6003A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_6003A || maintainPIT_6003A)
                    ? 18
                    : ""
                },
                CSSHEATER_2 : {
                    color:exceedThresholdHEATER_2 && !maintainHEATER_2
                    ? "#ff5656"
                    : maintainHEATER_2
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdHEATER_2 || maintainHEATER_2)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdHEATER_2 || maintainHEATER_2)
                    ? 18
                    : ""
                },
                CSSHEATER_1 : {
                    color:exceedThresholdHEATER_1 && !maintainHEATER_1
                    ? "#ff5656"
                    : maintainHEATER_1
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdHEATER_1 || maintainHEATER_1)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdHEATER_1 || maintainHEATER_1)
                    ? 18
                    : ""
                },
                CSSHEATER_3 : {
                    color:exceedThresholdHEATER_3 && !maintainHEATER_3
                    ? "#ff5656"
                    : maintainHEATER_3
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdHEATER_3 || maintainHEATER_3)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdHEATER_3 || maintainHEATER_3)
                    ? 18
                    : ""
                },


                CSSGD_STATUS : {
                    color:exceedThresholdGD_STATUS && !maintainGD_STATUS
                    ? "#ff5656"
                    : maintainGD_STATUS
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_STATUS || maintainGD_STATUS)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_STATUS || maintainGD_STATUS)
                    ? 18
                    : ""
                },
        
        
                CSSHR_BC : {
                         color:exceedThresholdHR_BC && !maintainHR_BC
                    ? "#ff5656"
                    : maintainHR_BC
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdHR_BC || maintainHR_BC)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdHR_BC || maintainHR_BC)
                    ? 18
                    : ""
                },
  
        
                CSSESD : {
                    color:exceedThresholdESD && !maintainESD
                    ? "#ff5656"
                    : maintainESD
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdESD || maintainESD)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdESD || maintainESD)
                    ? 18
                    : ""
                },
                CSSSD : {
                    color:exceedThresholdSD && !maintainSD
                    ? "#ff5656"
                    : maintainSD
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSD || maintainSD)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSD || maintainSD)
                    ? 18
                    : ""
                },
                CSSPT_6004 : {
                    color:exceedThresholdPT_6004 && !maintainPT_6004
                    ? "#ff5656"
                    : maintainPT_6004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_6004 || maintainPT_6004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_6004 || maintainPT_6004)
                    ? 18
                    : ""
                },
                CSSPUMP_3 : {
                    color:exceedThresholdPUMP_3 && !maintainPUMP_3
                    ? "#ff5656"
                    : maintainPUMP_3
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPUMP_3 || maintainPUMP_3)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPUMP_3 || maintainPUMP_3)
                    ? 18
                    : ""
                },
                CSSSDV_6003 : {
                    color:exceedThresholdSDV_6003 && !maintainSDV_6003
                    ? "#ff5656"
                    : maintainSDV_6003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_6003 || maintainSDV_6003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_6003 || maintainSDV_6003)
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
                name: <span>{tagNameEVC.InputPressure}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Pressure}>{formatValue(EVC_01_Pressure)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Pressure}>{formatValue(EVC_02_Pressure)}</span>,
            },
            {
                name: <span>{tagNameEVC.Temperature}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Temperature}>{formatValue(EVC_01_Temperature)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Temperature}>{formatValue(EVC_02_Temperature)}</span>,
            },
            {
                name: <span>{tagNameEVC.SVF}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>{formatValue(EVC_01_Flow_at_Base_Condition)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>{formatValue(EVC_02_Flow_at_Base_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.GVF}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>{formatValue(EVC_01_Flow_at_Measurement_Condition)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>{formatValue(EVC_02_Flow_at_Measurement_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.SVA}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>{formatValue(EVC_01_Volume_at_Base_Condition)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>{formatValue(EVC_02_Volume_at_Base_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.GVA}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>{formatValue(EVC_01_Volume_at_Measurement_Condition)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>{formatValue(EVC_02_Volume_at_Measurement_Condition)}</span>,
            },
            {
                name: <span>{tagNameEVC.VbToday}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>{formatValue(EVC_01_Vb_of_Current_Day)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>{formatValue(EVC_02_Vb_of_Current_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VbLastDay}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{formatValue(EVC_01_Vb_of_Last_Day)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>{formatValue(EVC_02_Vb_of_Last_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VmToday}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>{formatValue(EVC_01_Vm_of_Current_Day)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>{formatValue(EVC_02_Vm_of_Current_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.VmLastDay}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>{formatValue(EVC_01_Vm_of_Last_Day)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>{formatValue(EVC_02_Vm_of_Last_Day)}</span>,
            },
            {
                name: <span>{tagNameEVC.ReBattery}</span>,
                evc1901: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>{formatValue(EVC_01_Remain_Battery_Service_Life)}</span>,
                evc1902: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>{formatValue(EVC_02_Remain_Battery_Service_Life)}</span>,
            },
        ];
        

    const dataPLC = [
        {
            name: <span>{tagNamePLC.PIT_6001A}</span>,
            PLC: <span style={combineCss.CSSPIT_6001A}> {formatValue(PIT_6001A)}</span>,
        },
        {
            name: <span>{tagNamePLC.PIT_6001B}</span>,
            PLC: <span style={combineCss.CSSPIT_6001B}>{} {formatValue(PIT_6001B)}</span>,
        },
        {
            name: <span>{tagNamePLC.PIT_6002A}</span>,
            PLC: <span style={combineCss.CSSPIT_6002A}> {formatValue(PIT_6002A)}</span>,
        },
        {
            name: <span>{tagNamePLC.PIT_6002B}</span>,
            PLC: <span style={combineCss.CSSPIT_6002B}> {formatValue(PIT_6002B)}</span>,
        },
        {
            name: <span>{tagNamePLC.PIT_6003A}</span>,
            PLC: <span style={combineCss.CSSPIT_6003A}> {PIT_6003A} {DataPIT_6003A}</span>,
        },
      

        {
            name: <span>{tagNamePLC.TIT_6001A}</span>,
            PLC: <span style={combineCss.CSSTIT_6001A}>{TIT_6001A} {DataTIT_6001A}</span>,
        },
      
        {
            name: <span>{tagNamePLC.TIT_6002}</span>,
            PLC: <span style={combineCss.CSSTIT_6002}>{TIT_6002} {DataTIT_6002}</span>,
        },
      
        {
            name: <span>{tagNamePLC.GD_6001}</span>,
            PLC: <span style={combineCss.CSSGD_6001}> {GD_6001} {DataBattery}</span>,
        },
        {
            name: <span>{tagNamePLC.SDV_6001A}</span>,
            PLC: <span style={combineCss.CSSSDV_6001A}> {SDV_6001A} {DataCharging}</span>,
        },

     
        {
            name: <span>{tagNamePLC.SDV_6001B}</span>,
            PLC: <span style={combineCss.CSSSDV_6001B}>{SDV_6001B} {DataAlarm}</span>,
        },

        // {
        //     name: <span>{tagNamePLC.Smoker_Detected}</span>,
        //     PLC: <span style={combineCss.CSSDI_SD_1}>{DI_SD_1} {DataSmoker_Detected}</span>,
        // },
        {
            name: <span>{tagNamePLC.SDV_6002}</span>,
            PLC: <span style={combineCss.CSSSDV_6002}> {SDV_6002} {DataMode}</span>,
        },


        {
            name: <span>{tagNamePLC.Water_PG}</span>,
            PLC: <span style={combineCss.CSSWater_PG}>{Water_PG} {DataWater_PG}</span>,
        },

        {
            name: <span>{tagNamePLC.Water_LSW}</span>,
            PLC: <span style={combineCss.CSSWater_LSW}>{Water_LSW} {DataWater_LSW}</span>,
        },
        {
            name: <span>{tagNamePLC.PUMP_1}</span>,
            PLC: <span style={combineCss.CSSPUMP_1}> {PUMP_1} {DataPUMP_1}</span>,
        },
        {
            name: <span>{tagNamePLC.PUMP_2}</span>,
            PLC: <span style={combineCss.CSSPUMP_2}>{PUMP_2} {DataPUMP_2}</span>,
        },
     

        {
            name: <span>{tagNamePLC.HEATER_1}</span>,
            PLC: <span style={combineCss.CSSHEATER_1}>{HEATER_1} {DataHEATER_1}</span>,
        },
        {
            name: <span>{tagNamePLC.HEATER_2}</span>,
            PLC: <span style={combineCss.CSSHEATER_2}> {HEATER_2} {DataHEATER_2}</span>,
        },
   
        {
            name: <span>{tagNamePLC.HEATER_3}</span>,
            PLC: <span style={combineCss.CSSHEATER_3}> {HEATER_3} {DataHEATER_3}</span>,
        },
    
        {
            name: <span>{tagNamePLC.BOILER}</span>,
            PLC: <span style={combineCss.CSSBOILER}> {BOILER} {DataBOILER}</span>,
        },




        {
            name: <span>{tagNamePLC.GD_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD_STATUS}>{GD_STATUS} {DataGD_STATUS}</span>,
        },
        {
            name: <span>{tagNamePLC.HR_BC}</span>,
            PLC: <span style={combineCss.CSSHR_BC}> {HR_BC} {DataHR_BC}</span>,
        },
    
     

        {
            name: <span>{tagNamePLC.ESD}</span>,
            PLC: <span style={combineCss.CSSESD}>{ESD} {DataESD}</span>,
        },
        {
            name: <span>{tagNamePLC.SD}</span>,
            PLC: <span style={combineCss.CSSSD}> {SD} {DataSD}</span>,
        },
   

    
        {
            name: <span>{tagNamePLC.PT_6004}</span>,
            PLC: <span style={combineCss.CSSPT_6004}> {PT_6004} </span>,
        },



        {
            name: <span>{tagNamePLC.PUMP_3}</span>,
            PLC: <span style={combineCss.CSSPUMP_3}> {PUMP_3} {DataPUMP_3}</span>,
        },
   

    
        {
            name: <span>{tagNamePLC.SDV_6003}</span>,
            PLC: <span style={combineCss.CSSSDV_6003}> {SDV_6003} {DataSDV_6003}</span>,
        },
    ];

    return (
        <div >
            <div  >
                <div
                    style={{
                        background: "#64758B",
                        color: "white",
                        borderRadius: "10px 10px 0 0",
                        display:'flex',
                        justifyContent:'space-between'
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "5px 5px 0px 5px",
                        }}
                    >
                        <div style={{ fontSize: 30, fontWeight: 700 }}>
                            {" "}
                            CNG PRU
                        </div>

                     
                       
                    </div>
                    <div
                        style={{
                            alignItems: "center",
                            padding:5,
display:'flex'
                        }}
                    >
                    
                        <div style={{  fontWeight: 500,display:'flex' }}>
                          {FC_Conn_STTValue}
                        </div>
                      
                    </div>
                   
                </div>
                <DataTable value={dataEVC} size="small" selectionMode="single"> 
                    <Column field="name" header="EVC Parameter"></Column>
                    
                    <Column
                            field="evc1901"
                            header={EVC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center',  position:'relative', right:30}}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-6001A</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative', right:30}}>
                                   {DotRed}  <p style={{marginLeft:5}}>EVC-6001A</p>
                                </div>
                            )}
                        ></Column>
                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="evc1902"
                            header={EVC_STT02 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-6001B</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>EVC-6001B</p>
                             </div>
                            )}
                        ></Column>

                </DataTable>
                    <DataTable value={dataPLC} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > PLC Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="PLC"
                            header={PLC_Conn_STT === "1" ? (
                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>PLC</p>
                               </div>
                                
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>PLC</p>
                             </div>
                            )}
                        ></Column>
                    </DataTable>
                
            </div>

            {/* <div>
                <SetAttribute1/>
            </div> */}

        </div>
    );
}
