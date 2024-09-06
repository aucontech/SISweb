import React, { useEffect, useRef, useState } from "react";
import { id_LGDS,  } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_LGDS() {
    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);


    const [FC_STT01, setFC_STT01] = useState<any | null>(null);
    const [PLC_Conn_STT, setPLC_Conn_STT] = useState<any | null>(null);

    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_LGDS,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
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

                        FC_Lithium_Battery_Status: setFC_Lithium_Battery_Status,
                        FC_Battery_Voltage: setFC_Battery_Voltage,
                        FC_System_Voltage: setFC_System_Voltage,
                        FC_Charger_Voltage: setFC_Charger_Voltage,


                        FC_01_Current_Values_Flow_Rate: setFC_01_Current_Values_Flow_Rate,
                        FC_01_Current_Values_Uncorrected_Flow_Rate: setFC_01_Current_Values_Uncorrected_Flow_Rate,
                        FC_01_Accumulated_Values_Uncorrected_Volume: setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Accumulated_Values_Volume: setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Static_Pressure: setFC_01_Current_Values_Static_Pressure,

                        FC_01_Current_Values_Temperature: setFC_01_Current_Values_Temperature,
                        FC_01_Yesterday_Values_Uncorrected_Volume: setFC_01_Yesterday_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume: setFC_01_Yesterday_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume: setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,

                        FC_02_Current_Values_Flow_Rate: setFC_02_Current_Values_Flow_Rate,
                        FC_02_Current_Values_Uncorrected_Flow_Rate: setFC_02_Current_Values_Uncorrected_Flow_Rate,
                        FC_02_Accumulated_Values_Uncorrected_Volume: setFC_02_Accumulated_Values_Uncorrected_Volume,
                        FC_02_Accumulated_Values_Volume: setFC_02_Accumulated_Values_Volume,
                        FC_02_Current_Values_Static_Pressure: setFC_02_Current_Values_Static_Pressure,

                        FC_02_Current_Values_Temperature: setFC_02_Current_Values_Temperature,
                        FC_02_Yesterday_Values_Uncorrected_Volume: setFC_02_Yesterday_Values_Uncorrected_Volume,
                        FC_02_Yesterday_Values_Volume: setFC_02_Yesterday_Values_Volume,
                        FC_02_Today_Values_Uncorrected_Volume: setFC_02_Today_Values_Uncorrected_Volume,
                        FC_02_Today_Values_Volume: setFC_02_Today_Values_Volume,


                        PT_1003:setPT_1003,


                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,

                        DI_ZSO_2: setDI_ZSO_2,
                        DI_ZSC_2: setDI_ZSC_2,

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
                        DO_SV_02: setDO_SV_02,

                        FC_Conn_STT: setFC_STT01,
                        PLC_Conn_STT: setPLC_Conn_STT,

                    };
                    const valueStateMap: ValueStateMap = {
                        FC_Conn_STT: setFC_Conn_STTValue,
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
                fetchData()
            };
        }
    }, [data]);


    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_LGDS}/values/attributes/SERVER_SCOPE`
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

            const PT_1003_High = res.data.find((item: any) => item.key === "PT_1003_High");
            setPT_1003_High(PT_1003_High?.value || null);
            const PT_1003_Low = res.data.find((item: any) => item.key === "PT_1003_Low");
            setPT_1003_Low(PT_1003_Low?.value || null);
            const PT_1003_Maintain = res.data.find(
                (item: any) => item.key === "PT_1003_Maintain"
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

            const DO_SV_02_High = res.data.find((item: any) => item.key === "DO_SV_02_High");
            setDO_SV_02_High(DO_SV_02_High?.value || null);
            const DO_SV_02_Low = res.data.find((item: any) => item.key === "DO_SV_02_Low");
            setDO_SV_02_Low(DO_SV_02_Low?.value || null);
            const DO_SV_02_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_02_Maintain"
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


            const DI_SD_1_High = res.data.find((item: any) => item.key === "DI_SD_1_High");
            setDI_SD_1_High(DI_SD_1_High?.value || null);
            const DI_SD_1_Low = res.data.find((item: any) => item.key === "DI_SD_1_Low");
            setDI_SD_1_Low(DI_SD_1_Low?.value || null);
            const DI_SD_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_SD_1_Maintain"
            );


            
 // =================================================================================================================== 




 setMaintainDI_SD_1(DI_SD_1_Maintain?.value || false);
 setMaintainPT_1003(PT_1003_Maintain?.value || false);


            setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(FC_02_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_02_Today_Values_Volume(FC_02_Today_Values_Volume_Maintain?.value || false);

            setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Flow_Rate(FC_02_Current_Values_Flow_Rate_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Temperature(FC_02_Current_Values_Temperature_Maintain?.value || false);


            setMaintainFC_02_Current_Values_Static_Pressure(FC_02_Current_Values_Static_Pressure_Maintain?.value || false);


            setMaintainFC_02_Accumulated_Values_Volume(FC_02_Accumulated_Values_Volume_Maintain?.value || false);

            
            

            setMaintainFC_02_Today_Values_Uncorrected_Volume(FC_02_Today_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_02_Yesterday_Values_Volume(MaintainFC_02_Yesterday_Values_Volume?.value || false);


            setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(FC_02_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);



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



            setMaintainFC_Charger_Voltage(FC_Charger_Voltage_Maintain?.value || false);

            setMaintainFC_System_Voltage(FC_System_Voltage_Maintain?.value || false);

            setMaintainFC_Battery_Voltage(FC_Battery_Voltage_Maintain?.value || false);

            setMaintainFC_Lithium_Battery_Status(MaintainFC_Lithium_Battery_Status?.value || false);


     
            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);


            setMaintainDO_SV_02(DO_SV_02_Maintain?.value || false);

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



// =================================================================================================================== 

const [FC_Lithium_Battery_Status, setFC_Lithium_Battery_Status] = useState<string | null>(null);

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





     // =================================================================================================================== 

     const [FC_Battery_Voltage, setFC_Battery_Voltage] = useState<string | null>(null);
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
     


     // =================================================================================================================== 


     const [FC_System_Voltage, setFC_System_Voltage] = useState<string | null>(null);

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
     
  

     // =================================================================================================================== 



          const [FC_Charger_Voltage, setFC_Charger_Voltage] = useState<string | null>(null);
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
          
            
          // =================================================================================================================== 



     const [FC_02_Current_Values_Temperature, setFC_02_Current_Values_Temperature] = useState<string | null>(null);

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
     

     // =================================================================================================================== 


     const [FC_02_Current_Values_Static_Pressure, setFC_02_Current_Values_Static_Pressure] = useState<string | null>(null);

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
     


     // =================================================================================================================== 



          const [FC_02_Accumulated_Values_Uncorrected_Volume, setFC_02_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);

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
         
     
          // =================================================================================================================== 


          const [FC_02_Accumulated_Values_Volume, setFC_02_Accumulated_Values_Volume] = useState<string | null>(null);
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
         

     
          // =================================================================================================================== 

          const [FC_02_Current_Values_Flow_Rate, setFC_02_Current_Values_Flow_Rate] = useState<string | null>(null);
 
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
         
            
              // =================================================================================================================== 
          

              const [FC_02_Current_Values_Uncorrected_Flow_Rate, setFC_02_Current_Values_Uncorrected_Flow_Rate] = useState<string | null>(null);
   
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
             
       
         
          // =================================================================================================================== 


          const [FC_02_Today_Values_Uncorrected_Volume, setFC_02_Today_Values_Uncorrected_Volume] = useState<string | null>(null);
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
         
     
     
          // =================================================================================================================== 

          const [FC_02_Today_Values_Volume, setFC_02_Today_Values_Volume] = useState<string | null>(null);
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
         
     
          // =================================================================================================================== 

        

          const [FC_02_Yesterday_Values_Volume, setFC_02_Yesterday_Values_Volume] = useState<string | null>(null);
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
         
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [FC_02_Yesterday_Values_Uncorrected_Volume, setFC_02_Yesterday_Values_Uncorrected_Volume] = useState<string | null>(null);

    const [FC_02_Yesterday_Values_Uncorrected_Volume_High, setFC_02_Yesterday_Values_Uncorrected_Volume_High] = useState<number | null>(null);
    const [FC_02_Yesterday_Values_Uncorrected_Volume_Low, setFC_02_Yesterday_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
    const [exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume, setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainFC_02_Yesterday_Values_Uncorrected_Volume, setMaintainFC_02_Yesterday_Values_Uncorrected_Volume] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof FC_02_Yesterday_Values_Uncorrected_Volume_High === 'string' && typeof FC_02_Yesterday_Values_Uncorrected_Volume_Low === 'string' && FC_02_Yesterday_Values_Uncorrected_Volume !== null && maintainFC_02_Yesterday_Values_Uncorrected_Volume === false
            ) {
                const highValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume_High);
                const lowValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume_Low);
                const FC_02_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Yesterday_Values_Uncorrected_VolumeValue)) {
                    if (highValue <= FC_02_Yesterday_Values_Uncorrected_VolumeValue || FC_02_Yesterday_Values_Uncorrected_VolumeValue <= lowValue) {
                            setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume(true);
                    } else {
                       setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume(false);
                    }
                } 
            } 
        }, [FC_02_Yesterday_Values_Uncorrected_Volume_High, FC_02_Yesterday_Values_Uncorrected_Volume, FC_02_Yesterday_Values_Uncorrected_Volume_Low,maintainFC_02_Yesterday_Values_Uncorrected_Volume]);
    


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

              const [DI_ZSO_2, setDI_ZSO_2] = useState<string | null>(null);
              const [DI_ZSO_2_High, setDI_ZSO_2_High] = useState<number | null>(null);
              const [DI_ZSO_2_Low, setDI_ZSO_2_Low] = useState<number | null>(null);
              const [exceedThresholdDI_ZSO_2, setExceedThresholdDI_ZSO_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              const [maintainDI_ZSO_2, setMaintainDI_ZSO_2] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof DI_ZSO_2_High === 'string' && typeof DI_ZSO_2_Low === 'string' && DI_ZSO_2 !== null && maintainDI_ZSO_2 === false
                      ) {
                          const highValue = parseFloat(DI_ZSO_2_High);
                          const lowValue = parseFloat(DI_ZSO_2_Low);
                          const DI_ZSO_2Value = parseFloat(DI_ZSO_2);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSO_2Value)) {
                              if (highValue <= DI_ZSO_2Value || DI_ZSO_2Value <= lowValue) {
                                      setExceedThresholdDI_ZSO_2(true);
                              } else {
                                 setExceedThresholdDI_ZSO_2(false);
                              }
                          } 
                      } 
                  }, [DI_ZSO_2_High, DI_ZSO_2, DI_ZSO_2_Low,maintainDI_ZSO_2]);
              
       
         
         
              // =================================================================================================================== 
       
              const [DI_ZSC_2, setDI_ZSC_2] = useState<string | null>(null);
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
                                      setExceedThresholdDI_ZSC_2(true);
                              } else {
                                 setExceedThresholdDI_ZSC_2(false);
                              }
                          } 
                      } 
                  }, [DI_ZSC_2_High, DI_ZSC_2, DI_ZSC_2_Low,maintainDI_ZSC_2]);
              
        
         
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

                   // =================================================================================================================== 


                   const [DO_SV_02, setDO_SV_02] = useState<string | null>(null);
 
                   const [DO_SV_02_High, setDO_SV_02_High] = useState<number | null>(null);
                   const [DO_SV_02_Low, setDO_SV_02_Low] = useState<number | null>(null);
                   const [exceedThresholdDO_SV_02, setExceedThresholdDO_SV_02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainDO_SV_02, setMaintainDO_SV_02] = useState<boolean>(false);
                   
                   
                       useEffect(() => {
                           if (typeof DO_SV_02_High === 'string' && typeof DO_SV_02_Low === 'string' && DO_SV_02 !== null && maintainDO_SV_02 === false
                           ) {
                               const highValue = parseFloat(DO_SV_02_High);
                               const lowValue = parseFloat(DO_SV_02_Low);
                               const DO_SV_02Value = parseFloat(DO_SV_02);
                       
                               if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_SV_02Value)) {
                                   if (highValue <= DO_SV_02Value || DO_SV_02Value <= lowValue) {
                                           setExceedThresholdDO_SV_02(true);
                                   } else {
                                      setExceedThresholdDO_SV_02(false);
                                   }
                               } 
                           } 
                       }, [DO_SV_02_High, DO_SV_02 , DO_SV_02_Low,maintainDO_SV_02]);
                   
                
             
                  
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
 
  

     //======================================================================================================================


     // =================================================================================================================== 




     const [FC_01_Current_Values_Temperature, setFC_01_Current_Values_Temperature] = useState<string | null>(null);

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
      

     // =================================================================================================================== 


     const [FC_01_Current_Values_Static_Pressure, setFC_01_Current_Values_Static_Pressure] = useState<string | null>(null);

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
      
    


     // =================================================================================================================== 



          const [FC_01_Accumulated_Values_Uncorrected_Volume, setFC_01_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);

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
          

     
          // =================================================================================================================== 


          const [FC_01_Accumulated_Values_Volume, setFC_01_Accumulated_Values_Volume] = useState<string | null>(null);
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
          

     
          // =================================================================================================================== 

          const [FC_01_Current_Values_Flow_Rate, setFC_01_Current_Values_Flow_Rate] = useState<string | null>(null);
 
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
          
            
              // =================================================================================================================== 
          

              const [FC_01_Current_Values_Uncorrected_Flow_Rate, setFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<string | null>(null);
   
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
              
         
          // =================================================================================================================== 


          const [FC_01_Today_Values_Uncorrected_Volume, setFC_01_Today_Values_Uncorrected_Volume] = useState<string | null>(null);
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
         

     
     
          // =================================================================================================================== 

          const [FC_01_Today_Values_Volume, setFC_01_Today_Values_Volume] = useState<string | null>(null);
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
          
     
          // =================================================================================================================== 

        

          const [FC_01_Yesterday_Values_Volume, setFC_01_Yesterday_Values_Volume] = useState<string | null>(null);
    
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
         

     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [FC_01_Yesterday_Values_Uncorrected_Volume, setFC_01_Yesterday_Values_Uncorrected_Volume] = useState<string | null>(null);

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
     


    // =================================================================================================================== 


    const [PT_1003, setPT_1003] = useState<string | null>(null);

    const [PT_1003_High, setPT_1003_High] = useState<number | null>(null);
    const [PT_1003_Low, setPT_1003_Low] = useState<number | null>(null);
    const [exceedThresholdPT_1003, setExceedThresholdPT_1003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainPT_1003, setMaintainPT_1003] = useState<boolean>(false);
    
    
    useEffect(() => {
        const PT_1003Value = parseFloat(PT_1003 as any);
        const highValue = PT_1003_High ?? NaN;
        const lowValue = PT_1003_Low ?? NaN;
    
        if (!isNaN(PT_1003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_1003) {
            setExceedThresholdPT_1003(PT_1003Value >= highValue || PT_1003Value <= lowValue);
        }
    }, [PT_1003, PT_1003_High, PT_1003_Low, maintainPT_1003]);
    
    // =================================================================================================================== 
 

    const [FC_Conn_STT, setFC_Conn_STT] = useState<string | null>(null);

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
    
    // =================================================================================================================== 
 
 
    useEffect(() => {
        if (
            (exceedThresholdFC_Lithium_Battery_Status && !maintainFC_Lithium_Battery_Status) ||
            (exceedThresholdFC_Battery_Voltage && !maintainFC_Battery_Voltage) ||
            (exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage) ||
            (exceedThresholdFC_Charger_Voltage && !maintainFC_Charger_Voltage) ||
            (exceedThresholdFC_Conn_STT && !maintainFC_Conn_STT) ||
            (exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume) ||
            (exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure) ||
            (exceedThresholdFC_01_Current_Values_Temperature && !maintainFC_01_Current_Values_Temperature) ||
            (exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate) ||
            (exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate && !maintainFC_01_Current_Values_Uncorrected_Flow_Rate) ||
            (exceedThresholdFC_01_Today_Values_Volume && !maintainFC_01_Today_Values_Volume) ||
            (exceedThresholdFC_01_Today_Values_Uncorrected_Volume && !maintainFC_01_Today_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_01_Yesterday_Values_Volume && !maintainFC_01_Yesterday_Values_Volume) ||
            (exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume && !maintainFC_01_Yesterday_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume && !maintainFC_02_Accumulated_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Accumulated_Values_Volume && !maintainFC_02_Accumulated_Values_Volume) ||
            (exceedThresholdFC_02_Current_Values_Static_Pressure && !maintainFC_02_Current_Values_Static_Pressure) ||
            (exceedThresholdFC_02_Current_Values_Temperature && !maintainFC_02_Current_Values_Temperature) ||
            (exceedThresholdFC_02_Current_Values_Flow_Rate && !maintainFC_02_Current_Values_Flow_Rate) ||
            (exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate && !maintainFC_02_Current_Values_Uncorrected_Flow_Rate) ||
            (exceedThresholdFC_02_Today_Values_Volume && !maintainFC_02_Today_Values_Volume) ||
            (exceedThresholdFC_02_Today_Values_Uncorrected_Volume && !maintainFC_02_Today_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Yesterday_Values_Volume && !maintainFC_02_Yesterday_Values_Volume) ||
            (exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume && !maintainFC_02_Yesterday_Values_Uncorrected_Volume) ||
            (exceedThresholdPT_1003 && !maintainPT_1003)
        ) {
            setAlarmMessage("ALARM");
        } else if (
            maintainFC_Lithium_Battery_Status || maintainFC_Battery_Voltage ||
            maintainFC_System_Voltage || maintainFC_Charger_Voltage ||
            maintainFC_Conn_STT || maintainFC_01_Accumulated_Values_Uncorrected_Volume ||
            maintainFC_01_Accumulated_Values_Volume || maintainFC_01_Current_Values_Static_Pressure ||
            maintainFC_01_Current_Values_Temperature || maintainFC_01_Current_Values_Flow_Rate ||
            maintainFC_01_Current_Values_Uncorrected_Flow_Rate || maintainFC_01_Today_Values_Volume ||
            maintainFC_01_Today_Values_Uncorrected_Volume || maintainFC_01_Yesterday_Values_Volume ||
            maintainFC_01_Yesterday_Values_Uncorrected_Volume || maintainFC_02_Accumulated_Values_Uncorrected_Volume ||
            maintainFC_02_Accumulated_Values_Volume || maintainFC_02_Current_Values_Static_Pressure ||
            maintainFC_02_Current_Values_Temperature || maintainFC_02_Current_Values_Flow_Rate ||
            maintainFC_02_Current_Values_Uncorrected_Flow_Rate || maintainFC_02_Today_Values_Volume ||
            maintainFC_02_Today_Values_Uncorrected_Volume || maintainFC_02_Yesterday_Values_Volume ||
            maintainFC_02_Yesterday_Values_Uncorrected_Volume || maintainPT_1003
        ) {
            setAlarmMessage("Maintaining");
        } else {
            setAlarmMessage(null);
        }
    }, [
        exceedThresholdFC_Lithium_Battery_Status, maintainFC_Lithium_Battery_Status,
        exceedThresholdFC_Battery_Voltage, maintainFC_Battery_Voltage,
        exceedThresholdFC_System_Voltage, maintainFC_System_Voltage,
        exceedThresholdFC_Charger_Voltage, maintainFC_Charger_Voltage,
        exceedThresholdFC_Conn_STT, maintainFC_Conn_STT,
        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume, maintainFC_01_Accumulated_Values_Uncorrected_Volume,
        exceedThresholdFC_01_Accumulated_Values_Volume, maintainFC_01_Accumulated_Values_Volume,
        exceedThresholdFC_01_Current_Values_Static_Pressure, maintainFC_01_Current_Values_Static_Pressure,
        exceedThresholdFC_01_Current_Values_Temperature, maintainFC_01_Current_Values_Temperature,
        exceedThresholdFC_01_Current_Values_Flow_Rate, maintainFC_01_Current_Values_Flow_Rate,
        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate, maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
        exceedThresholdFC_01_Today_Values_Volume, maintainFC_01_Today_Values_Volume,
        exceedThresholdFC_01_Today_Values_Uncorrected_Volume, maintainFC_01_Today_Values_Uncorrected_Volume,
        exceedThresholdFC_01_Yesterday_Values_Volume, maintainFC_01_Yesterday_Values_Volume,
        exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume, maintainFC_01_Yesterday_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume, maintainFC_02_Accumulated_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Accumulated_Values_Volume, maintainFC_02_Accumulated_Values_Volume,
        exceedThresholdFC_02_Current_Values_Static_Pressure, maintainFC_02_Current_Values_Static_Pressure,
        exceedThresholdFC_02_Current_Values_Temperature, maintainFC_02_Current_Values_Temperature,
        exceedThresholdFC_02_Current_Values_Flow_Rate, maintainFC_02_Current_Values_Flow_Rate,
        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate, maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
        exceedThresholdFC_02_Today_Values_Volume, maintainFC_02_Today_Values_Volume,
        exceedThresholdFC_02_Today_Values_Uncorrected_Volume, maintainFC_02_Today_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Yesterday_Values_Volume, maintainFC_02_Yesterday_Values_Volume,
        exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume, maintainFC_02_Yesterday_Values_Uncorrected_Volume,
        exceedThresholdPT_1003, maintainPT_1003
    ]);
    
 
    const tagNameFC = {

        FC_Lithium_Battery_Status: "Lithium Battery Status (0: Yes - 1: No)",

        Battery_Voltage:'Battery Voltage (Volt) ',
        System_Voltage :'System Voltage (Volt)',
        Charger_Voltage:'Charger Voltage (Volt)',
        InputPressure: "Input Pressure (BarA)",
        Temperature: "Temperature (°C)",
        GVF: "Gross Volume Flow (m³/h)",
        SVF: "Standard Volume Flow (Sm³/h)",
        GVA: "Gross Volume Accumulated (m³)",
        SVA: "Standard Volume Accumulated (Sm³)",
        VbToday: "Standard Volume Vb Today (Sm³)",
        VbLastDay: "Standard Volume Vb Yesterday (Sm³)",
        VmToday: "Gross Volume Vm Today (m³)",
        VmLastDay: "Gross Volume Vm Yesterday (m³)",
        ReBattery: "Remainning Battery (Months)",
        PT_1003: "Output Pressure PT-1103 (BarG)",

    };

    const tagNamePLC = {
        PT01: "Output Pressure PT-1003 (BarG)",
        GD1: "Gas Detector GD-1001 (%LEL)",
        GD2: "Gas Detector GD-1002 (%LEL)",
        ZSC1: "SDV-1001 ZSC (0: ON - 1: OFF)",
        ZSC2: "SDV-1002 ZSC (0: ON - 1: OFF)",

        ZSO1: "SDV-1001 ZSO (0: OFF - 1: ON)",
        ZSO2: "SDV-1002 ZSO (0: OFF - 1: ON)",

        DI_SD_1: "Smoker Detected SD-1001 (0: Normal - 1: Smoker Detected)",


        UPS_BATTERY: "UPS BATTERY (0: Normal - 1: Battery)",
        UPS_CHARGING: "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM: "UPS ALARM (0: Normal - 1: No Battery)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",
        UPS_MODE: "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal)",
        SELECT_SW: "SELECT SW (0: Local - 1: Remote)",
        RESET: "RESET (0: OFF - 1: ON)",
        EmergencyNO: "Emergency Stop NO (0: Normal - 1: Emergency)",
        EmergencyNC: "Emergency Stop NC (0: Emergency - 1: Normal)",
        HORN: "HORN (0: OFF - 1: ON)",
        BEACON: "BEACON (0: OFF - 1: ON)",
        MAP: "MAP (0: Normal - 1: Emergency)",
        DO_SV_01: "SDV-1001 SOLENOID (0: OFF - 1: ON)",
        DO_SV_02: "SDV-1002 SOLENOID (0: OFF - 1: ON)",

    };

    const DataRESET = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON" : null;
    const DataDO_SV_01 = DO_SV_01 === "0" ? "OFF" : DO_SV_01 === "1" ? "ON" : null;

    const DataDO_SV_02 = DO_SV_02 === "0" ? "OFF" : DO_SV_02 === "1" ? "ON" : null;

    const DataMap1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null;

    const DataSmoker_Detected = DI_SD_1 === "0" ? "Normal" : DI_SD_1 === "1" ? "Smoker Detected" : null;

    const DataFC_Lithium_Battery_Status = FC_Lithium_Battery_Status === "0" ? "Yes" : FC_Lithium_Battery_Status === "1" ? "No" : null

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
    const DataZSO_1 = DI_ZSO_1 === "0" ? "OFF" : DI_ZSO_1 === "1" ? "ON" : null;

    
    const DataZSC_1 = DI_ZSC_1 === "0" ? " ON" : DI_ZSC_1 === "1" ? "OFF" : null;



    const DataDI_SD_1 = DI_SD_1 === "0" ? " Normal" : DI_SD_1 === "1" ? "Smoker Detected" : null;


    const DataZSO_2 = DI_ZSO_2 === "0" ? " OFF" : DI_ZSO_2 === "1" ? "ON" : null;
    const DataZSC_2 = DI_ZSC_2 === "0" ? " ON" : DI_ZSC_2 === "1" ? "OFF" : null;

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



            const combineCss = {




                CSSPT_1003 : {
                    color:exceedThresholdPT_1003 && !maintainPT_1003
                    ? "#ff5656"
                    : maintainPT_1003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_1003 || maintainPT_1003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_1003 || maintainPT_1003)
                    ? 18
                    : ""
                },

                CSSFC_Lithinum_Battery_Status : {
                    color:exceedThresholdFC_Lithium_Battery_Status && !maintainFC_Lithium_Battery_Status
                    ? "#ff5656"
                    : maintainFC_Lithium_Battery_Status
                    ? "orange"
                    : "" ,

                    fontWeight: exceedThresholdFC_Lithium_Battery_Status && !maintainFC_Lithium_Battery_Status
                    ? 600
                    : maintainFC_Lithium_Battery_Status
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_Lithium_Battery_Status && !maintainFC_Lithium_Battery_Status
                    ? 18
                    : maintainFC_Lithium_Battery_Status
                    ? 18
                    : "" ,
                    
                },
                CSSFC_Battery_Voltage : {
                    color:exceedThresholdFC_Battery_Voltage && !maintainFC_Battery_Voltage
                    ? "#ff5656"
                    : maintainFC_Battery_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_Battery_Voltage && !maintainFC_Battery_Voltage
                    ? 600
                    : maintainFC_Battery_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_Battery_Voltage && !maintainFC_Battery_Voltage
                    ? 18
                    : maintainFC_Battery_Voltage
                    ? 18
                    : "" ,
                    

                },
        
        
                CSSFC_System_Voltage : {
                    color:exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage
                    ? "#ff5656"
                    : maintainFC_System_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage
                    ? 600
                    : maintainFC_System_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage
                    ? 18
                    : maintainFC_System_Voltage
                    ? 18
                    : "" ,
                    
                },
        
        
                CSSFC_Charger_Voltage : {
                    color:exceedThresholdFC_Charger_Voltage && !maintainFC_Charger_Voltage
                    ? "#ff5656"
                    : maintainFC_Charger_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_Charger_Voltage && !maintainFC_Charger_Voltage
                    ? 600
                    : maintainFC_Charger_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_Charger_Voltage && !maintainFC_Charger_Voltage
                    ? 18
                    : maintainFC_Charger_Voltage
                    ? 18
                    : "" ,
                    
                },

//==================================================================================================================================

             
                CSSFC_01_Current_Values_Temperature : {
                    color:exceedThresholdFC_01_Current_Values_Temperature && !maintainFC_01_Current_Values_Temperature
                    ? "#ff5656"
                    : maintainFC_01_Current_Values_Temperature
                    ? "orange"
                    : "" ,

                    fontWeight: exceedThresholdFC_01_Current_Values_Temperature && !maintainFC_01_Current_Values_Temperature
                    ? 600
                    : maintainFC_01_Current_Values_Temperature
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Current_Values_Temperature && !maintainFC_01_Current_Values_Temperature
                    ? 18
                    : maintainFC_01_Current_Values_Temperature
                    ? 18
                    : "" ,
                    
                },
                CSSFC_01_Current_Values_Static_Pressure : {
                    color:exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure
                    ? "#ff5656"
                    : maintainFC_01_Current_Values_Static_Pressure
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure
                    ? 600
                    : maintainFC_01_Current_Values_Static_Pressure
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure
                    ? 18
                    : maintainFC_01_Current_Values_Static_Pressure
                    ? 18
                    : "" ,
                    

                },
        
                CSSFC_01_Accumulated_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? 600
                    : maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? 18
                    : maintainFC_01_Accumulated_Values_Uncorrected_Volume
                    ? 18
                    : "" ,
                },
        
                CSSFC_01_Accumulated_Values_Volume : {
                    color:exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume
                    ? "#ff5656"
                    : maintainFC_01_Accumulated_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume
                    ? 600
                    : maintainFC_01_Accumulated_Values_Volume
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume
                    ? 18
                    : maintainFC_01_Accumulated_Values_Volume
                    ? 18
                    : "" ,
                    
                },
                CSSFC_01_Current_Values_Flow_Rate : {
                    color:exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate
                    ? "#ff5656"
                    : maintainFC_01_Current_Values_Flow_Rate
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate
                    ? 600
                    : maintainFC_01_Current_Values_Flow_Rate
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate
                    ? 18
                    : maintainFC_01_Current_Values_Flow_Rate
                    ? 18
                    : "" ,
                },
        
        
                CSSFC_01_Current_Values_Uncorrected_Flow_Rate : {
                    color:exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate && !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                    ? "#ff5656"
                    : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate || maintainFC_01_Current_Values_Uncorrected_Flow_Rate)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate || maintainFC_01_Current_Values_Uncorrected_Flow_Rate)
                    ? 18
                    : ""
                },
        
        
                CSSFC_01_Today_Values_Volume : {
                    color:exceedThresholdFC_01_Today_Values_Volume && !maintainFC_01_Today_Values_Volume
                    ? "#ff5656"
                    : maintainFC_01_Today_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Today_Values_Volume || maintainFC_01_Today_Values_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Today_Values_Volume || maintainFC_01_Today_Values_Volume)
                    ? 18
                    : ""
                },

                CSSFC_01_Today_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_01_Today_Values_Uncorrected_Volume && !maintainFC_01_Today_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_01_Today_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Today_Values_Uncorrected_Volume || maintainFC_01_Today_Values_Uncorrected_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Today_Values_Uncorrected_Volume || maintainFC_01_Today_Values_Uncorrected_Volume)
                    ? 18
                    : ""
                },
        
          
                CSSFC_01_Yesterday_Values_Volume : {
                    color:exceedThresholdFC_01_Yesterday_Values_Volume && !maintainFC_01_Yesterday_Values_Volume
                    ? "#ff5656"
                    : maintainFC_01_Yesterday_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Yesterday_Values_Volume || maintainFC_01_Yesterday_Values_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Yesterday_Values_Volume || maintainFC_01_Yesterday_Values_Volume)
                    ? 18
                    : ""
                },
        
                CSSFC_01_Yesterday_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume && !maintainFC_01_Yesterday_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_01_Yesterday_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume || maintainFC_01_Yesterday_Values_Uncorrected_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume || maintainFC_01_Yesterday_Values_Uncorrected_Volume)
                    ? 18
                    : ""
                },






//==================================================================================================================================




                CSSFC_02_Current_Values_Temperature : {
                    color:exceedThresholdFC_02_Current_Values_Temperature && !maintainFC_02_Current_Values_Temperature
                    ? "#ff5656"
                    : maintainFC_02_Current_Values_Temperature
                    ? "orange"
                    : "" ,

                    fontWeight: exceedThresholdFC_02_Current_Values_Temperature && !maintainFC_02_Current_Values_Temperature
                    ? 600
                    : maintainFC_02_Current_Values_Temperature
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_02_Current_Values_Temperature && !maintainFC_02_Current_Values_Temperature
                    ? 18
                    : maintainFC_02_Current_Values_Temperature
                    ? 18
                    : "" ,
                    
                },
                CSSFC_02_Current_Values_Static_Pressure : {
                    color:exceedThresholdFC_02_Current_Values_Static_Pressure && !maintainFC_02_Current_Values_Static_Pressure
                    ? "#ff5656"
                    : maintainFC_02_Current_Values_Static_Pressure
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_02_Current_Values_Static_Pressure && !maintainFC_02_Current_Values_Static_Pressure
                    ? 600
                    : maintainFC_02_Current_Values_Static_Pressure
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_02_Current_Values_Static_Pressure && !maintainFC_02_Current_Values_Static_Pressure
                    ? 18
                    : maintainFC_02_Current_Values_Static_Pressure
                    ? 18
                    : "" ,
                    

                },
        
        
                CSSFC_02_Accumulated_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume && !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume && !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? 600
                    : maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume && !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? 18
                    : maintainFC_02_Accumulated_Values_Uncorrected_Volume
                    ? 18
                    : "" ,
                    
                },
        
        
                CSSFC_02_Accumulated_Values_Volume : {
                    color:exceedThresholdFC_02_Accumulated_Values_Volume && !maintainFC_02_Accumulated_Values_Volume
                    ? "#ff5656"
                    : maintainFC_02_Accumulated_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_02_Accumulated_Values_Volume && !maintainFC_02_Accumulated_Values_Volume
                    ? 600
                    : maintainFC_02_Accumulated_Values_Volume
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_02_Accumulated_Values_Volume && !maintainFC_02_Accumulated_Values_Volume
                    ? 18
                    : maintainFC_02_Accumulated_Values_Volume
                    ? 18
                    : "" ,
                    
                },
                CSSFC_02_Current_Values_Flow_Rate : {
                    color:exceedThresholdFC_02_Current_Values_Flow_Rate && !maintainFC_02_Current_Values_Flow_Rate
                    ? "#ff5656"
                    : maintainFC_02_Current_Values_Flow_Rate
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_02_Current_Values_Flow_Rate && !maintainFC_02_Current_Values_Flow_Rate
                    ? 600
                    : maintainFC_02_Current_Values_Flow_Rate
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_02_Current_Values_Flow_Rate && !maintainFC_02_Current_Values_Flow_Rate
                    ? 18
                    : maintainFC_02_Current_Values_Flow_Rate
                    ? 18
                    : "" ,
                },
        
        
                CSSFC_02_Current_Values_Uncorrected_Flow_Rate : {
                    color:exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate && !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                    ? "#ff5656"
                    : maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate || maintainFC_02_Current_Values_Uncorrected_Flow_Rate)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate || maintainFC_02_Current_Values_Uncorrected_Flow_Rate)
                    ? 18
                    : ""
                },
        
        
                CSSFC_02_Today_Values_Volume : {
                    color:exceedThresholdFC_02_Today_Values_Volume && !maintainFC_02_Today_Values_Volume
                    ? "#ff5656"
                    : maintainFC_02_Today_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_02_Today_Values_Volume || maintainFC_02_Today_Values_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_02_Today_Values_Volume || maintainFC_02_Today_Values_Volume)
                    ? 18
                    : ""
                },

                CSSFC_02_Today_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_02_Today_Values_Uncorrected_Volume && !maintainFC_02_Today_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_02_Today_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_02_Today_Values_Uncorrected_Volume || maintainFC_02_Today_Values_Uncorrected_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_02_Today_Values_Uncorrected_Volume || maintainFC_02_Today_Values_Uncorrected_Volume)
                    ? 18
                    : ""
                },
        
          
                CSSFC_02_Yesterday_Values_Volume : {
                    color:exceedThresholdFC_02_Yesterday_Values_Volume && !maintainFC_02_Yesterday_Values_Volume
                    ? "#ff5656"
                    : maintainFC_02_Yesterday_Values_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_02_Yesterday_Values_Volume || maintainFC_02_Yesterday_Values_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_02_Yesterday_Values_Volume || maintainFC_02_Yesterday_Values_Volume)
                    ? 18
                    : ""
                },
        
                CSSFC_02_Yesterday_Values_Uncorrected_Volume : {
                    color:exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume && !maintainFC_02_Yesterday_Values_Uncorrected_Volume
                    ? "#ff5656"
                    : maintainFC_02_Yesterday_Values_Uncorrected_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume || maintainFC_02_Yesterday_Values_Uncorrected_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume || maintainFC_02_Yesterday_Values_Uncorrected_Volume)
                    ? 18
                    : ""
                },




//==================================================================================================================================







        
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



                CSSDI_ZSO_2 : {
                    color:exceedThresholdDI_ZSO_2 && !maintainDI_ZSO_2
                    ? "#ff5656"
                    : maintainDI_ZSO_2
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_ZSO_2 || maintainDI_ZSO_2)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_ZSO_2 || maintainDI_ZSO_2)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSDI_ZSC_2 : {
                    color:exceedThresholdDI_ZSC_2 && !maintainDI_ZSC_2
                    ? "#ff5656"
                    : maintainDI_ZSC_2
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDI_ZSC_2 || maintainDI_ZSC_2)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDI_ZSC_2 || maintainDI_ZSC_2)
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


                CSSDO_SV_02 : {
                    color:exceedThresholdDO_SV_02 && !maintainDO_SV_02
                    ? "#ff5656"
                    : maintainDO_SV_02
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdDO_SV_02 || maintainDO_SV_02)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdDO_SV_02 || maintainDO_SV_02)
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
        
          };


          const dataFC1 = [
            {
                name: <span>{tagNameFC.FC_Lithium_Battery_Status}</span>,
                FC1: <span style={combineCss.CSSFC_Lithinum_Battery_Status}>{FC_Lithium_Battery_Status} {DataFC_Lithium_Battery_Status}</span>,
    
            },
            {
                name: <span>{tagNameFC.Battery_Voltage}</span>,
                FC1: <span style={combineCss.CSSFC_Battery_Voltage}>{FC_Battery_Voltage}</span>,
    
            },
            {
                name: <span>{tagNameFC.System_Voltage}</span>,
                FC1: <span style={combineCss.CSSFC_System_Voltage}>{FC_System_Voltage}</span>,
    
            },
            {
                name: <span>{tagNameFC.Charger_Voltage}</span>,
                FC1: <span style={combineCss.CSSFC_Charger_Voltage}>{FC_Charger_Voltage}</span>,
    
            },
            
          
        ];
//=================================================================================

    const dataFC = [
        {
            name: <span>{tagNameFC.InputPressure}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>{FC_01_Current_Values_Static_Pressure}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure}>{FC_02_Current_Values_Static_Pressure}</span>,

        },
        {
            name: <span>{tagNameFC.Temperature}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>{FC_01_Current_Values_Temperature}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Current_Values_Temperature}>{FC_02_Current_Values_Temperature}</span>,

        },
        {
            name: <span>{tagNameFC.SVF}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>{FC_01_Current_Values_Flow_Rate}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate}>{FC_02_Current_Values_Flow_Rate}</span>,

        },
        {
            name: <span>{tagNameFC.GVF}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>{FC_01_Current_Values_Uncorrected_Flow_Rate}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}>{FC_02_Current_Values_Uncorrected_Flow_Rate}</span>,

        },
        {
            name: <span>{tagNameFC.SVA}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>{FC_01_Accumulated_Values_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume}>{FC_02_Accumulated_Values_Volume}</span>,

        },
        
        {
            name: <span>{tagNameFC.GVA}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>{FC_01_Accumulated_Values_Uncorrected_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}>{FC_02_Accumulated_Values_Uncorrected_Volume}</span>,

        },
       
       
     
        {
            name: <span>{tagNameFC.VbToday}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Today_Values_Volume}>{FC_01_Today_Values_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Today_Values_Volume}>{FC_02_Today_Values_Volume}</span>,

        },
        {
            name: <span>{tagNameFC.VmToday}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>{FC_01_Today_Values_Uncorrected_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}>{FC_02_Today_Values_Uncorrected_Volume}</span>,

        },
        {
            name: <span>{tagNameFC.VbLastDay}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>{FC_01_Yesterday_Values_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume}>{FC_02_Yesterday_Values_Volume}</span>,

        },
       
        {
            name: <span>{tagNameFC.VmLastDay}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>{FC_01_Yesterday_Values_Uncorrected_Volume}</span>,
            FC1902: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}>{FC_02_Yesterday_Values_Uncorrected_Volume}</span>,

        },
      
    ];
    const dataPT = [


        {
            name: <span>Output Pressure PT-1103 (BarG)</span>,
            FC1901: <span style={combineCss.CSSPT_1003}>{PT_1003}</span>,
    
        },
    ];
    // const dataPLC = [
    //     {
    //         name: <span>{tagNamePLC.PT01}</span>,
    //         PLC: <span style={combineCss.CSSPT1}> {PT1}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.GD1}</span>,
    //         PLC: <span style={combineCss.CSSGD1}>{} {GD1}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.GD2}</span>,
    //         PLC: <span style={combineCss.CSSGD2}> {GD2}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.DO_SV_01}</span>,
    //         PLC: <span style={combineCss.CSSDO_SV_01}> {DO_SV_01} {DataDO_SV_01}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.DO_SV_02}</span>,
    //         PLC: <span style={combineCss.CSSDO_SV_02}> {DO_SV_02} {DataDO_SV_02}</span>,
    //     },
      

    //     {
    //         name: <span>{tagNamePLC.ZSO1}</span>,
    //         PLC: <span style={combineCss.CSSDI_ZSO_1}>{DI_ZSO_1} {DataZSO_1}</span>,
    //     },
      
    //     {
    //         name: <span>{tagNamePLC.ZSC1}</span>,
    //         PLC: <span style={combineCss.CSSDI_ZSC_1}>{DI_ZSC_1} {DataZSC_1}</span>,
    //     },


    //     {
    //         name: <span>{tagNamePLC.ZSO2}</span>,
    //         PLC: <span style={combineCss.CSSDI_ZSO_2}>{DI_ZSO_1} {DataZSO_2}</span>,
    //     },
      
    //     {
    //         name: <span>{tagNamePLC.ZSC2}</span>,
    //         PLC: <span style={combineCss.CSSDI_ZSC_2}>{DI_ZSC_2} {DataZSC_2}</span>,
    //     },
      
    //     {
    //         name: <span>{tagNamePLC.UPS_BATTERY}</span>,
    //         PLC: <span style={combineCss.CSSDI_UPS_BATTERY}> {DI_UPS_BATTERY} {DataBattery}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.UPS_CHARGING}</span>,
    //         PLC: <span style={combineCss.CSSDI_UPS_CHARGING}> {DI_UPS_CHARGING} {DataCharging}</span>,
    //     },

     
    //     {
    //         name: <span>{tagNamePLC.UPS_ALARM}</span>,
    //         PLC: <span style={combineCss.CSSDI_UPS_ALARM}>{DI_UPS_ALARM} {DataAlarm}</span>,
    //     },

   
    //     {
    //         name: <span>{tagNamePLC.UPS_MODE}</span>,
    //         PLC: <span style={combineCss.CSSUPS_Mode}> {UPS_Mode} {DataMode}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.DI_SD_1}</span>,
    //         PLC: <span style={combineCss.CSSDI_SD_1}> {DI_SD_1} {DataSmoker_Detected}</span>,
    //     },

    //     {
    //         name: <span>{tagNamePLC.SELECT_SW}</span>,
    //         PLC: <span style={combineCss.CSSDI_SELECT_SW}>{DI_SELECT_SW} {DataDI_SELECT_SW}</span>,
    //     },

    //     {
    //         name: <span>{tagNamePLC.RESET}</span>,
    //         PLC: <span style={combineCss.CSSDI_RESET}>{DI_RESET} {DataRESET}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.EmergencyNO}</span>,
    //         PLC: <span style={combineCss.CSSEmergency_NO}> {Emergency_NO} {DataEmergency_NO}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.EmergencyNC}</span>,
    //         PLC: <span style={combineCss.CSSEmergency_NC}>{Emergency_NC} {DataEmergency_NC}</span>,
    //     },
     

    //     {
    //         name: <span>{tagNamePLC.HORN}</span>,
    //         PLC: <span style={combineCss.CSSDO_HR_01}>{DO_HR_01} {DataHorn}</span>,
    //     },
    //     {
    //         name: <span>{tagNamePLC.BEACON}</span>,
    //         PLC: <span style={combineCss.CSSDO_BC_01}> {DO_BC_01} {DataBeacon}</span>,
    //     },
   

    
    //     {
    //         name: <span>{tagNamePLC.MAP}</span>,
    //         PLC: <span style={combineCss.CSSDI_MAP_1}> {DI_MAP_1} {DataMap1}</span>,
    //     },
    // ];
    const [ShowMore,setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!ShowMore)
    }


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
                            LGDS
                        </div>
                    </div>
                    <div
                        style={{
                            display:'flex',

                            alignItems: "center",
                            padding:5

                        }}
                    >
                        
                        <div style={{  fontWeight: 500,display:'flex',paddingRight:20 }}>
                           {FC_Conn_STTValue}
                        </div>
                        <button onClick={handleShowMore} >
                    {ShowMore ? <i  style={{fontSize:'1.5rem', cursor:'pointer'}} className="pi pi-arrow-up"></i>  : <i style={{fontSize:'1.5rem',cursor:'pointer'}} className="pi pi-arrow-down"></i>}
                    </button>
                    </div>
                    
                </div>



                {ShowMore ?    <div> 


                <DataTable value={dataFC} size="small" selectionMode="single"> 
                    <Column field="name" header="FC Parameter"></Column>

                    <Column
                            field="FC1901"
                            header={FC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center',  position:'relative', right:30}}>
                                {DotGreen} <p style={{marginLeft:5}}>FC-1001</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative', right:30}}>
                                   {DotRed}  <p style={{marginLeft:5}}>FC-1001</p>
                                </div>
                            )}
                        ></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}
                            field="FC1902"
                            header={FC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>FC-1002</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>FC-1002</p>
                             </div>
                            )}
                        ></Column>
                </DataTable>
                    {/* <DataTable value={dataPLC} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > PLC Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="PLC"
                            header={PLC_Conn_STT === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>PLC Value</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>PLC Value</p>
                             </div>
                            )}
                        ></Column>
                    </DataTable> */}
                 <DataTable value={dataPT} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > PT Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="FC1901"
                            header={PLC_Conn_STT === "1" ? (

                                <div style={{ padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                <p style={{marginLeft:5}}>PT-1003 </p>
   
                               </div>
                               
                            ) : (
                                <div style={{ padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                <p style={{marginLeft:5}}>PT-1003 </p>
   
                               </div>
                            )}
                        ></Column>
                    </DataTable>
                    <DataTable value={dataFC1} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > FC Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="FC1"
                            header={FC_STT01 === "1" ? (
                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                 {DotGreen} <p style={{marginLeft:5}}>FC</p>
    
                                </div>
                            ) : (
                                

                        <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>FC</p>
                                    </div>
                            )}
                        ></Column>

                    
                    </DataTable>
                    </div> 
                
                : 
                
                
                <div>
                   
                <DataTable value={dataFC} size="small" selectionMode="single"> 
                    <Column field="name" header="FC Parameter"></Column>

                    <Column
                            field="FC1901"
                            header={FC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center',  position:'relative', right:30}}>
                                {DotGreen} <p style={{marginLeft:5}}>FC-1001</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative', right:30}}>
                                   {DotRed}  <p style={{marginLeft:5}}>FC-1001</p>
                                </div>
                            )}
                        ></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}
                            field="FC1902"
                            header={FC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>FC-1002</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>FC-1002</p>
                             </div>
                            )}
                        ></Column>
                </DataTable>

            </div>

                        }

        </div>

        </div>
    );
}
