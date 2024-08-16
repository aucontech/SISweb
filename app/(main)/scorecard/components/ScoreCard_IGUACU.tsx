
import React, { useEffect, useRef, useState } from "react";
import { id_IGUECU } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_IGUACU() {
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
                    entityId: id_IGUECU,
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



                        GD1: setGD1,
                        GD2: setGD2,
                        GD3: setGD3,

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


            const EVC_01_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setEVC_01_Vm_of_Last_Day_High(EVC_01_Vm_of_Last_Day_High?.value || null);
            const EVC_01_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setEVC_01_Vm_of_Last_Day_Low(EVC_01_Vm_of_Last_Day_Low?.value || null);
            const EVC_01_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );

            //================================================================================================================





            const EVC_02_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_High");
            setEVC_02_Remain_Battery_Service_Life_High(EVC_02_Remain_Battery_Service_Life_High?.value || null);
            const EVC_02_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Low");
            setEVC_02_Remain_Battery_Service_Life_Low(EVC_02_Remain_Battery_Service_Life_Low?.value || null);
            const MaintainEVC_02_Remain_Battery_Service_Life = res.data.find(
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

            //==========================================================================================================================

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

            const GD3_High = res.data.find((item: any) => item.key === "GD3_High");
            setGD3_High(GD3_High?.value || null);
            const GD3_Low = res.data.find((item: any) => item.key === "GD3_Low");
            setGD3_Low(GD3_Low?.value || null);
            const GD3_Maintain = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
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

 // =================================================================================================================== 



            

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

            setMaintainEVC_02_Remain_Battery_Service_Life(MaintainEVC_02_Remain_Battery_Service_Life?.value || false);


           

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
    const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life as any);
    const highValue = EVC_01_Remain_Battery_Service_Life_High ?? NaN;
    const lowValue = EVC_01_Remain_Battery_Service_Life_Low ?? NaN;

    if (!isNaN(EVC_01_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Remain_Battery_Service_Life) {
        setExceedThresholdEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_LifeValue >= highValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue);
    }
}, [EVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low, maintainEVC_01_Remain_Battery_Service_Life]);




     // =================================================================================================================== 

     const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);

     const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<number | null>(null);
     const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<number | null>(null);
     const [exceedThresholdEVC_01_Temperature, setExceedThresholdEVC_01_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);
     
     useEffect(() => {
        const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature as any);
        const highValue = EVC_01_Temperature_High ?? NaN;
        const lowValue = EVC_01_Temperature_Low ?? NaN;
    
        if (!isNaN(EVC_01_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Temperature) {
            setExceedThresholdEVC_01_Temperature(EVC_01_TemperatureValue >= highValue || EVC_01_TemperatureValue <= lowValue);
        }
    }, [EVC_01_Temperature, EVC_01_Temperature_High, EVC_01_Temperature_Low, maintainEVC_01_Temperature]);
    
     

     // =================================================================================================================== 


     const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);

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
    


     // =================================================================================================================== 



          const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);

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
        
          

     
          // =================================================================================================================== 


          const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
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
        
          
     
          // =================================================================================================================== 

          const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
 
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
        
            
            
              // =================================================================================================================== 
          

              const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
   
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
            
         
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
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
        
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
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
        
          
          // =================================================================================================================== 

        

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
    
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
        
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);

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
    
    
  // =================================================================================================================== 
 
 
  const [GD1, setGD1] = useState<string | null>(null);
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

 

  // =================================================================================================================== 



       const [GD2, setGD2] = useState<string | null>(null);
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

  
       // =================================================================================================================== 


       const [GD3, setGD3] = useState<string | null>(null);
       const [GD3_High, setGD3_High] = useState<number | null>(null);
       const [GD3_Low, setGD3_Low] = useState<number | null>(null);
       const [exceedThresholdGD3, setExceedThresholdGD3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD3, setMaintainGD3] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof GD3_High === 'string' && typeof GD3_Low === 'string' && GD3 !== null && maintainGD3 === false
               ) {
                   const highValue = parseFloat(GD3_High);
                   const lowValue = parseFloat(GD3_Low);
                   const GD3Value = parseFloat(GD3);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD3Value)) {
                       if (highValue <= GD3Value || GD3Value <= lowValue) {
                               setExceedThresholdGD3(true);
                       } else {
                          setExceedThresholdGD3(false);
                       }
                   } 
               } 
           }, [GD3_High, GD3, GD3_Low,maintainGD3]);
       

  
       // =================================================================================================================== 


       const [PT1, setPT1] = useState<string | null>(null);

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
       

  
       // =================================================================================================================== 

       const [DI_ZSO_1, setDI_ZSO_1] = useState<string | null>(null);
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
  
       // =================================================================================================================== 

       const [DI_ZSC_1, setDI_ZSC_1] = useState<string | null>(null);
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


 // =================================================================================================================== 

 const [DI_MAP_1, setDI_MAP_1] = useState<string | null>(null);
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
   
     // =================================================================================================================== 

     const [DI_UPS_CHARGING, setDI_UPS_CHARGING] = useState<string | null>(null);
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
    
       
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [DI_UPS_ALARM, setDI_UPS_ALARM] = useState<string | null>(null);

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

     // =================================================================================================================== 

const [DI_SELECT_SW, setDI_SELECT_SW] = useState<string | null>(null);

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
 


 // =================================================================================================================== 

const [Emergency_NC, setEmergency_NC] = useState<string | null>(null);

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

// =================================================================================================================== 


     // =================================================================================================================== 

     const [DI_UPS_BATTERY, setDI_UPS_BATTERY] = useState<string | null>(null);
    
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
     
     
     // =================================================================================================================== 
     
     
     const [Emergency_NO, setEmergency_NO] = useState<string | null>(null);
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
         // =================================================================================================================== 
     
     const [UPS_Mode, setUPS_Mode] = useState<string | null>(null);
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

      // =================================================================================================================== 


     const [DO_HR_01, setDO_HR_01] = useState<string | null>(null);

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

     // =================================================================================================================== 


     const [DI_RESET, setDI_RESET] = useState<string | null>(null);

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
     // =================================================================================================================== 



          const [DO_BC_01, setDO_BC_01] = useState<string | null>(null);
  
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
          // =================================================================================================================== 


          const [DO_SV_01, setDO_SV_01] = useState<string | null>(null);
 
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

const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
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


     // =================================================================================================================== 

     const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);

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
    
    

     // =================================================================================================================== 


     const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);

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
    

     // =================================================================================================================== 



          const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);

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
        

     
          // =================================================================================================================== 


          const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
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

     
          // =================================================================================================================== 

          const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
 
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
        
          
              // =================================================================================================================== 
          

              const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
   
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
            
         
          // =================================================================================================================== 


          const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
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
        
        
     
          // =================================================================================================================== 

          const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
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
        
          // =================================================================================================================== 

        

          const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
    
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
        
        
    // =================================================================================================================== 

    const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);

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
        PT01: "Input Pressure (BarG)",
        GD1: "Gas Detector GD-1501 (%LEL)",
        GD2: "Gas Detector GD-1502 (%LEL)",
        GD3: "Gas Detector GD-1903 (%LEL)",

        ZSC: "SDV-1501 ZSC (0: ON - 1: OFF)",
        ZSO: "SDV-1501 ZSO (0: OFF - 1: ON)",
        UPS_BATTERY: "UPS BATTERY (0: Normal - 1: Battery)",
        UPS_CHARGING: "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM: "UPS ALARM (0: Normal - 1: No Battery)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",

        UPS_MODE:
            "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal)",
        SELECT_SW: "SELECT SW (0: Local - 1: Remote)",
        RESET: "RESET (0: OFF - 1: ON)",
        EmergencyNO: "Emergency Stop NO (0: Normal - 1: Emergency)",
        EmergencyNC: "Emergency Stop NC (0: Emergency - 1: Normal)",
        HORN: "HORN (0: OFF - 1: ON)",
        BEACON: "BEACON (0: OFF - 1: ON)",
        MAP: "MAP (0: Normal - 1: Emergency)",
        DO_SV_01: "SDV-1501 SOLENOID (0: OFF - 1: ON)",

    };

    const DataRESET = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON" : null;
    const DataDO_SV_01 = DO_SV_01 === "0" ? "OFF" : DO_SV_01 === "1" ? "ON" : null;
    const DataMap1 = DI_MAP_1 === "0" ? "Normal" : DI_RESET === "1" ? "Emergency" : null;

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
    const DataZSC_1 = DI_ZSC_1 === "0" ? "ON" : DI_ZSC_1 === "1" ? "OFF" : null;
    const DataZSO_1 = DI_ZSO_1 === "0" ? "OFF" : DI_ZSO_1 === "1" ? "ON" : null;

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

                CSSGD3 : {
                    color:exceedThresholdGD3 && !maintainGD3
                    ? "#ff5656"
                    : maintainGD3
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD3 || maintainGD3)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD3 || maintainGD3)
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
        
          };



    const dataEVC = [

        {
            name: <span>{tagNameEVC.ReBattery}</span>,
            evc1901: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>{EVC_01_Remain_Battery_Service_Life}</span>,
            evc1902: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>{EVC_02_Remain_Battery_Service_Life}</span>,

        },
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
   
    ];

    const dataPLC = [
        {
            name: <span>{tagNamePLC.PT01}</span>,
            PLC: <span style={combineCss.CSSPT1}> {PT1}</span>,
        },
        {
            name: <span>{tagNamePLC.GD1}</span>,
            PLC: <span style={combineCss.CSSGD1}>{} {GD1}</span>,
        },
        {
            name: <span>{tagNamePLC.GD2}</span>,
            PLC: <span style={combineCss.CSSGD2}> {GD2}</span>,
        },
        // {
        //     name: <span>{tagNamePLC.GD3}</span>,
        //     PLC: <span style={combineCss.CSSGD3}> {GD3}</span>,
        // },
        {
            name: <span>{tagNamePLC.DO_SV_01}</span>,
            PLC: <span style={combineCss.CSSDO_SV_01}> {DO_SV_01} {DataDO_SV_01}</span>,
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
        //     PLC: <span style={combineCss.CSSDI_SD_1}>{DI_SD_1} {DataSmoker_Detected}</span>,
        // },
        {
            name: <span>{tagNamePLC.UPS_MODE}</span>,
            PLC: <span style={combineCss.CSSUPS_Mode}> {UPS_Mode} {DataMode}</span>,
        },


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
            name: <span>{tagNamePLC.HORN}</span>,
            PLC: <span style={combineCss.CSSDO_HR_01}>{DO_HR_01} {DataHorn}</span>,
        },
        {
            name: <span>{tagNamePLC.BEACON}</span>,
            PLC: <span style={combineCss.CSSDO_BC_01}> {DO_BC_01} {DataBeacon}</span>,
        },
   

    
        {
            name: <span>{tagNamePLC.MAP}</span>,
            PLC: <span style={combineCss.CSSDI_MAP_1}> {DI_MAP_1} {DataMap1}</span>,
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
                            IGUACU
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
                                {DotGreen} <p style={{marginLeft:5}}>EVC-1501</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative', right:30}}>
                                   {DotRed}  <p style={{marginLeft:5}}>EVC-1501</p>
                                </div>
                            )}
                        ></Column>
                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="evc1902"
                            header={EVC_STT02 === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-1502</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>EVC-1502</p>
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
