
import React, { useEffect, useRef, useState } from "react";
import { id_CNG_BinhDuong } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_CNG_BINHDUONG() {
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


                        PIT_2006: setPIT_2006,

                        PIT_2007: setPIT_2007,
                        PT_2001: setPT_2001,
                        PT_2002: setPT_2002,
                        PT_2003: setPT_2003,

                        TT_2002: setTT_2002,
                        TT_2001: setTT_2001,

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
 
 
  const [PIT_2007, setPIT_2007] = useState<string | null>(null);
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


  // =================================================================================================================== 



       const [PT_2001, setPT_2001] = useState<string | null>(null);
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
    

  
       // =================================================================================================================== 


       const [PT_2002, setPT_2002] = useState<string | null>(null);
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
    

  
       // =================================================================================================================== 


       const [PIT_2006, setPIT_2006] = useState<string | null>(null);

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

  
       // =================================================================================================================== 

       const [TT_2002, setTT_2002] = useState<string | null>(null);
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
    

  
  
       // =================================================================================================================== 

       const [TT_2001, setTT_2001] = useState<string | null>(null);
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

     const [SDV_2001A, setSDV_2001A] = useState<string | null>(null);
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
    
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [SDV_2001B, setSDV_2001B] = useState<string | null>(null);

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

     const [GD_2001, setGD_2001] = useState<string | null>(null);
    
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
     
     const [SDV_2002, setSDV_2002] = useState<string | null>(null);
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


          const [PT_2003, setPT_2003] = useState<string | null>(null);
 
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
    
    
    
              const [ESD_2001, setESD_2001] = useState<string | null>(null);
   
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
         
              // =================================================================================================================== 
              const [SD_2001, setSD_2001] = useState<string | null>(null);
   
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
              
              // =================================================================================================================== 
    
              const [SD_2002, setSD_2002] = useState<string | null>(null);
          
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
        PIT_2006: "Pressure Indicator Transmitter PIT-2006 (BarG)",
        PIT_2007: "Pressure Indicator Transmitter PIT-2007 (BarG)",
        PT_2001: "Pressure Transmitter PT-2001 (BarG)",
        PT_2002: "Pressure Transmitter PT-2002 (BarG)",
        PT_2003: "Pressure Transmitter PT-2003 (BarG)",

        TT_2001: "Temperature Transmitter TT-2001 (˚C)",
        TT_2002: "Temperature Transmitter TT-2002 (˚C)",
        GD_2001: "Gas Detector GD-2001 (%LEL)",
        SDV_2001A: "Shutdown Valve SDV-2001A (0: Close - 1: Open)",
        SDV_2001B: "Shutdown Valve SDV-2001B (0: Close - 1: Open)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",

        SDV_2002:
            "Shutdown Valve SDV-2002 (0: Close - 1: Open)",
        Water_PG: "Water Pressure (0: Normal - 1: Pressure Low)",
        Water_LSW: "Water Level (0: Normal - 1: Water Low)",
        PUMP_1: "Pump 1 (0: Stop - 1: Run)",
        PUMP_2: "Pump 2 (0: Stop - 1: Run)",
        HEATER_1: "Heater 1 (0: Stop - 1: Run)",
        HEATER_2: "Heater 2 (0: Stop - 1: Run)",
        BOILER: "Boiler (0: Manual - 1: Auto)",


        GD_STATUS: "Gas Detector Status (0: Normal - 1: Alarm)",
        ESD_2001: "Emergency Shut ESD-2001 (0: Not Active - 1: Active)",

        HR_BC: "Horn And Beacon (0: Normal - 1: Alarm)",
        SD_2001: "Smoke Detector SD-2001 (0: Normal - 1: Smoker Detected)",
        SD_2002: "Smoke Detector SD-2002 (0: Normal - 1: Smoker Detected)",

    };



    const DataGD_STATUS = GD_STATUS === "0" ? "Normal" : GD_STATUS === "1" ? "Alarm" : null;
    const DataHR_BC = HR_BC === "0" ? "Normal" : HR_BC === "1" ? "Alarm" : null;
    const DataESD_2001 = ESD_2001 === "0" ? "Not Active" : ESD_2001 === "1" ? "Active" : null;
    const DataSD_2001 = SD_2001 === "0" ? "Normal" : SD_2001 === "1" ? "Smoker Detected" : null;

    const DataSD_2002 = SD_2002 === "0" ? "Normal" : SD_2002 === "1" ? "Smoker Detected" : null;

    const DataWater_LSW = Water_LSW === "0" ? "Normal" : Water_LSW === "1" ? "Water Low" : null;
    const DataPT_2003 = PT_2003 === "0" ? "OFF" : PT_2003 === "1" ? "ON" : null;
    const DataBOILER = BOILER === "0" ? "Manual" : BOILER === "1" ? "Auto" : null;
    const DataTT_2001 = TT_2001 === "0" ? "ON" : TT_2001 === "1" ? "OFF" : null;
    const DataTT_2002 = TT_2002 === "0" ? "OFF" : TT_2002 === "1" ? "ON" : null;

    const DataCharging =
        SDV_2001A === "0"
            ? "Close"
            : SDV_2001A === "1"
            ? "Open"
            : null;
    const DataBattery =
        GD_2001 === "0" ? "Normal" : GD_2001 === "1" ? "Battery" : null;
    const DataAlarm =
        SDV_2001B === "0" ? "Close" : SDV_2001B === "1" ? "Open" : null;
    const DataMode =
    SDV_2002 === "0" ? "Close" : SDV_2002 === "1" ? "Open" : null;


    const DataWater_PG =
        Water_PG === "0" ? "Normal" : Water_PG === "1" ? " Pressure Low" : null;
    const DataHEATER_1 = HEATER_1 === "0" ? "Stop" : HEATER_1 === "1" ? "Run" : null;
    const DataHEATER_2 = HEATER_2 === "0" ? "Stop" : HEATER_2 === "1" ? "Run" : null;
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
                CSSPIT_2007 : {
                    color:exceedThresholdPIT_2007 && !maintainPIT_2007
                    ? "#ff5656"
                    : maintainPIT_2007
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_2007 || maintainPIT_2007)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_2007 || maintainPIT_2007)
                    ? 18
                    : ""
                },
        
        
                CSSPT_2001 : {
                    color:exceedThresholdPT_2001 && !maintainPT_2001
                    ? "#ff5656"
                    : maintainPT_2001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2001 || maintainPT_2001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2001 || maintainPT_2001)
                    ? 18
                    : ""
                },

                CSSPT_2002 : {
                    color:exceedThresholdPT_2002 && !maintainPT_2002
                    ? "#ff5656"
                    : maintainPT_2002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2002 || maintainPT_2002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2002 || maintainPT_2002)
                    ? 18
                    : ""
                },
        
        
                CSSPIT_2006 : {
                    color:exceedThresholdPIT_2006 && !maintainPIT_2006
                    ? "#ff5656"
                    : maintainPIT_2006
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPIT_2006 || maintainPIT_2006)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPIT_2006 || maintainPIT_2006)
                    ? 18
                    : ""
                },
                CSSTT_2002 : {
                    color:exceedThresholdTT_2002 && !maintainTT_2002
                    ? "#ff5656"
                    : maintainTT_2002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2002 || maintainTT_2002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2002 || maintainTT_2002)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSTT_2001 : {
                    color:exceedThresholdTT_2001 && !maintainTT_2001
                    ? "#ff5656"
                    : maintainTT_2001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2001 || maintainTT_2001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2001 || maintainTT_2001)
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
        
                CSSSDV_2001A : {
                    color:exceedThresholdSDV_2001A && !maintainSDV_2001A
                    ? "#ff5656"
                    : maintainSDV_2001A
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_2001A || maintainSDV_2001A)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_2001A || maintainSDV_2001A)
                    ? 18
                    : ""
                },
        
                CSSSDV_2001B : {
                    color:exceedThresholdSDV_2001B && !maintainSDV_2001B
                    ? "#ff5656"
                    : maintainSDV_2001B
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_2001B || maintainSDV_2001B)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_2001B || maintainSDV_2001B)
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
        
        
        
        
                CSSGD_2001 : {
                    color:exceedThresholdGD_2001 && !maintainGD_2001
                    ? "#ff5656"
                    : maintainGD_2001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2001 || maintainGD_2001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2001 || maintainGD_2001)
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
        
                CSSSDV_2002 : {
                    color:exceedThresholdSDV_2002 && !maintainSDV_2002
                    ? "#ff5656"
                    : maintainSDV_2002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_2002 || maintainSDV_2002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_2002 || maintainSDV_2002)
                    ? 18
                    : ""
                },
        
                CSSPT_2003 : {
                    color:exceedThresholdPT_2003 && !maintainPT_2003
                    ? "#ff5656"
                    : maintainPT_2003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2003 || maintainPT_2003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2003 || maintainPT_2003)
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
  
        
                CSSESD_2001 : {
                    color:exceedThresholdESD_2001 && !maintainESD_2001
                    ? "#ff5656"
                    : maintainESD_2001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdESD_2001 || maintainESD_2001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdESD_2001 || maintainESD_2001)
                    ? 18
                    : ""
                },
                CSSSD_2001 : {
                    color:exceedThresholdSD_2001 && !maintainSD_2001
                    ? "#ff5656"
                    : maintainSD_2001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSD_2001 || maintainSD_2001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSD_2001 || maintainSD_2001)
                    ? 18
                    : ""
                },
                CSSSD_2002 : {
                    color:exceedThresholdSD_2002 && !maintainSD_2002
                    ? "#ff5656"
                    : maintainSD_2002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSD_2002 || maintainSD_2002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSD_2002 || maintainSD_2002)
                    ? 18
                    : ""
                },
        
          };



    const dataEVC = [
        {
            name: <span>{tagNameEVC.InputPressure}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Pressure}>{EVC_01_Pressure}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Pressure}>{EVC_02_Pressure}</span>,

        },
        {
            name: <span>{tagNameEVC.Temperature}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Temperature}>{EVC_01_Temperature}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Temperature}>{EVC_02_Temperature}</span>,

        },
        {
            name: <span>{tagNameEVC.SVF}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>{EVC_01_Flow_at_Base_Condition}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>{EVC_02_Flow_at_Base_Condition}</span>,

        },
        {
            name: <span>{tagNameEVC.GVF}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>{EVC_01_Flow_at_Measurement_Condition}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>{EVC_02_Flow_at_Measurement_Condition}</span>,

        },
        {
            name: <span>{tagNameEVC.SVA}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>{EVC_01_Volume_at_Base_Condition}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>{EVC_02_Volume_at_Base_Condition}</span>,

        },
        {
            name: <span>{tagNameEVC.GVA}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>{EVC_01_Volume_at_Measurement_Condition}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>{EVC_02_Volume_at_Measurement_Condition}</span>,

        },
     

        {
            name: <span>{tagNameEVC.VbToday}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>{EVC_01_Vb_of_Current_Day}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>{EVC_02_Vb_of_Current_Day}</span>,

        },
        {
            name: <span>{tagNameEVC.VbLastDay}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{EVC_01_Vb_of_Last_Day}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>{EVC_02_Vb_of_Last_Day}</span>,

        },
        {
            name: <span>{tagNameEVC.VmToday}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>{EVC_01_Vm_of_Current_Day}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>{EVC_02_Vm_of_Current_Day}</span>,

        },
        {
            name: <span>{tagNameEVC.VmLastDay}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>{EVC_01_Vm_of_Last_Day}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>{EVC_02_Vm_of_Last_Day}</span>,

        },
        {
            name: <span>{tagNameEVC.ReBattery}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>{EVC_01_Remain_Battery_Service_Life}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>{EVC_02_Remain_Battery_Service_Life}</span>,

        },
    ];

    const dataPLC = [
        {
            name: <span>{tagNamePLC.PIT_2006}</span>,
            PLC: <span style={combineCss.CSSPIT_2006}> {PIT_2006}</span>,
        },
        {
            name: <span>{tagNamePLC.PIT_2007}</span>,
            PLC: <span style={combineCss.CSSPIT_2007}>{} {PIT_2007}</span>,
        },
        {
            name: <span>{tagNamePLC.PT_2001}</span>,
            PLC: <span style={combineCss.CSSPT_2001}> {PT_2001}</span>,
        },
        {
            name: <span>{tagNamePLC.PT_2002}</span>,
            PLC: <span style={combineCss.CSSPT_2002}> {PT_2002}</span>,
        },
        {
            name: <span>{tagNamePLC.PT_2003}</span>,
            PLC: <span style={combineCss.CSSPT_2003}> {PT_2003} {DataPT_2003}</span>,
        },
      

        {
            name: <span>{tagNamePLC.TT_2002}</span>,
            PLC: <span style={combineCss.CSSTT_2002}>{TT_2002} {DataTT_2002}</span>,
        },
      
        {
            name: <span>{tagNamePLC.TT_2001}</span>,
            PLC: <span style={combineCss.CSSTT_2001}>{TT_2001} {DataTT_2001}</span>,
        },
      
        {
            name: <span>{tagNamePLC.GD_2001}</span>,
            PLC: <span style={combineCss.CSSGD_2001}> {GD_2001} {DataBattery}</span>,
        },
        {
            name: <span>{tagNamePLC.SDV_2001A}</span>,
            PLC: <span style={combineCss.CSSSDV_2001A}> {SDV_2001A} {DataCharging}</span>,
        },

     
        {
            name: <span>{tagNamePLC.SDV_2001B}</span>,
            PLC: <span style={combineCss.CSSSDV_2001B}>{SDV_2001B} {DataAlarm}</span>,
        },

        // {
        //     name: <span>{tagNamePLC.Smoker_Detected}</span>,
        //     PLC: <span style={combineCss.CSSDI_SD_1}>{DI_SD_1} {DataSmoker_Detected}</span>,
        // },
        {
            name: <span>{tagNamePLC.SDV_2002}</span>,
            PLC: <span style={combineCss.CSSSDV_2002}> {SDV_2002} {DataMode}</span>,
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
            name: <span>{tagNamePLC.ESD_2001}</span>,
            PLC: <span style={combineCss.CSSESD_2001}>{ESD_2001} {DataESD_2001}</span>,
        },
        {
            name: <span>{tagNamePLC.SD_2001}</span>,
            PLC: <span style={combineCss.CSSSD_2001}> {SD_2001} {DataSD_2001}</span>,
        },
   

    
        {
            name: <span>{tagNamePLC.SD_2002}</span>,
            PLC: <span style={combineCss.CSSSD_2002}> {SD_2002} {DataSD_2002}</span>,
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
                            CNG BINH DUONG
                        </div>

                     
                       
                    </div>
                    <div
                        style={{
                            alignItems: "center",
                            padding:5

                        }}
                    >
                    
                        <div style={{  fontWeight: 500,display:'flex' }}>
                           <p style={{fontWeight:700}}>EVC</p> : {FC_Conn_STTValue}
                        </div>
                        <div style={{  fontWeight: 500 , display:'flex'}}>
                           <p style={{fontWeight:700}}>PLC</p> : {Conn_STTValue}
                        </div>
                    </div>
                   
                </div>
                <DataTable value={dataEVC} size="small" selectionMode="single"> 
                    <Column field="name" header="EVC Parameter"></Column>
                    
                    <Column
                            field="evc1901"
                            header={EVC_STT01 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center',  position:'relative', right:30}}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-2001A</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative', right:30}}>
                                   {DotRed}  <p style={{marginLeft:5}}>EVC-2001A</p>
                                </div>
                            )}
                        ></Column>
                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="evc1902"
                            header={EVC_STT02 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-2001B</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>EVC-2001B</p>
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
                                {DotGreen} <p style={{marginLeft:5}}>PLC Value</p>
                               </div>
                                
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>PLC Value</p>
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
