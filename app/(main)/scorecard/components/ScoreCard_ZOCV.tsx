import React, { useEffect, useRef, useState } from "react";
import { id_ZOCV,  } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_ZOCV() {
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
                    entityId: id_ZOCV,
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

                        FC_01_Lithium_Battery_Status: setFC_01_Lithium_Battery_Status,
                        FC_01_Battery_Voltage: setFC_01_Battery_Voltage,
                        FC_01_System_Voltage: setFC_01_System_Voltage,
                        FC_01_Charger_Voltage: setFC_01_Charger_Voltage,


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
                        EVC_02_Vb_of_Last_Day: setEVC_02_Vb_of_Last_Day,

                        PT_1103:setPT_1103,

                        Mode_ATS:setMode_ATS,
                        ATS_Auto_Man:setATS_Auto_Man,
                        FC_01_Conn_STT:setFC_Conn_STTValue,
                        EVC_02_Conn_STT:setEVC_02_Conn_STT,


                    };
                    const valueStateMap: ValueStateMap = {
                        FC_01_Conn_STT: setFC_STT01,
                        EVC_02_Conn_STT: setConn_STTValue,
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

            const FC_01_Current_Values_Temperature_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Temperature_High");
            setFC_01_Current_Values_Temperature_High(FC_01_Current_Values_Temperature_High?.value || null);
            const FC_01_Current_Values_Temperature_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Temperature_Low");
            setFC_01_Current_Values_Temperature_Low(FC_01_Current_Values_Temperature_Low?.value || null);
            const FC_01_Current_Values_Temperature_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Temperature_Maintain"
            );

            const FC_01_Current_Values_Static_Pressure_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_High");
            setFC_01_Current_Values_Static_Pressure_High(FC_01_Current_Values_Static_Pressure_High?.value || null);
            const FC_01_Current_Values_Static_Pressure_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Low");
            setFC_01_Current_Values_Static_Pressure_Low(FC_01_Current_Values_Static_Pressure_Low?.value || null);
            const FC_01_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
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
//==================================================================================================================================


const EVC_02_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
setEVC_02_Volume_at_Measurement_Condition_High(EVC_02_Volume_at_Measurement_Condition_High?.value || null);
const EVC_02_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
setEVC_02_Volume_at_Measurement_Condition_Low(EVC_02_Volume_at_Measurement_Condition_Low?.value || null);
const EVC_02_Volume_at_Measurement_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
);

const EVC_02_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
setEVC_02_Vm_of_Last_Day_High(EVC_02_Vm_of_Last_Day_High?.value || null);
const EVC_02_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
setEVC_02_Vm_of_Last_Day_Low(EVC_02_Vm_of_Last_Day_Low?.value || null);
const EVC_02_Vm_of_Last_Day_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
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

const EVC_02_Vm_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_High");
setEVC_02_Vm_of_Current_Day_High(EVC_02_Vm_of_Current_Day_High?.value || null);
const EVC_02_Vm_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_Low");
setEVC_02_Vm_of_Current_Day_Low(EVC_02_Vm_of_Current_Day_Low?.value || null);
const EVC_02_Vm_of_Current_Day_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Vm_of_Current_Day_Maintain"
);


const EVC_02_Vb_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_High");
setEVC_02_Vb_of_Current_Day_High(EVC_02_Vb_of_Current_Day_High?.value || null);
const EVC_02_Vb_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_Low");
setEVC_02_Vb_of_Current_Day_Low(EVC_02_Vb_of_Current_Day_Low?.value || null);
const EVC_02_Vb_of_Current_Day_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Vb_of_Current_Day_Maintain"
);


const EVC_02_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_High");
setEVC_02_Vb_of_Last_Day_High(EVC_02_Vb_of_Last_Day_High?.value || null);
const EVC_02_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_Low");
setEVC_02_Vb_of_Last_Day_Low(EVC_02_Vb_of_Last_Day_Low?.value || null);
const EVC_02_Vb_of_Last_Day_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Vb_of_Last_Day_Maintain"
);

const EVC_02_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
setEVC_02_Flow_at_Measurement_Condition_High(EVC_02_Flow_at_Measurement_Condition_High?.value || null);
const EVC_02_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
setEVC_02_Flow_at_Measurement_Condition_Low(EVC_02_Flow_at_Measurement_Condition_Low?.value || null);
const EVC_02_Flow_at_Measurement_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
);


const EVC_02_Flow_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High");
setEVC_02_Flow_at_Base_Condition_High(EVC_02_Flow_at_Base_Condition_High?.value || null);
const EVC_02_Flow_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low");
setEVC_02_Flow_at_Base_Condition_Low(EVC_02_Flow_at_Base_Condition_Low?.value || null);
const EVC_02_Flow_at_Base_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Maintain"
);
//==================================================================================================================================
         
            const PT_1103_High = res.data.find((item: any) => item.key === "PT_1103_High");
            setPT_1103_High(PT_1103_High?.value || null);
            const PT_1103_Low = res.data.find((item: any) => item.key === "PT_1103_Low");
            setPT_1103_Low(PT_1103_Low?.value || null);
            const PT_1103_Maintain = res.data.find(
                (item: any) => item.key === "PT_1103_Maintain"
            );


                   
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

 setMaintainPT_1103(PT_1103_Maintain?.value || false);

 setMaintainFC_01_Charger_Voltage(FC_01_Charger_Voltage_Maintain?.value || false);

 setMaintainFC_01_System_Voltage(FC_01_System_Voltage_Maintain?.value || false);

 setMaintainFC_01_Battery_Voltage(FC_01_Battery_Voltage_Maintain?.value || false);

 setMaintainFC_01_Lithium_Battery_Status(MaintainFC_01_Lithium_Battery_Status?.value || false);
            

            setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(FC_01_Yesterday_Values_Uncorrected_Volume_Maintain?.value || false);




            setMaintainFC_01_Yesterday_Values_Volume(FC_01_Yesterday_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Today_Values_Uncorrected_Volume(FC_01_Today_Values_Uncorrected_Volume_Maintain?.value || false);


            setMaintainFC_01_Today_Values_Volume(FC_01_Today_Values_Volume_Maintain?.value || false);


            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Maintain?.value || false);


            setMaintainFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Maintain?.value || false);

            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Maintain?.value || false);

            setMaintainFC_01_Current_Values_Temperature(FC_01_Current_Values_Temperature_Maintain?.value || false);

 // =================================================================================================================== 


            setMaintainEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Maintain?.value || false);




            setMaintainEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false);

            setMaintainEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Maintain?.value || false);
            setMaintainEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Maintain?.value || false);


            setMaintainEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Maintain?.value || false);


            setMaintainEVC_02_Temperature(EVC_02_Temperature_Maintain?.value || false);

            setMaintainEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Maintain?.value || false);


            setMaintainEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Maintain?.value || false);

            setMaintainEVC_02_Pressure(EVC_02_Pressure_Maintain?.value || false);

            setMaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);

            setMaintainEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false);


            setMaintainEVC_02_Conn_STT(EVC_02_Conn_STT_Maintain?.value || false);

            setMaintainMode_ATS(Mode_ATS_Maintain?.value || false);

            setMaintainATS_Auto_Man(ATS_Auto_Man_Maintain?.value || false);

            setMaintainFC_01_Conn_STT(FC_01_Conn_STT_Maintain?.value || false);
           
           
 // =================================================================================================================== 

       

            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 
// =================================================================================================================== 

const [FC_01_Lithium_Battery_Status, setFC_01_Lithium_Battery_Status] = useState<string | null>(null);

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



     // =================================================================================================================== 

     const [FC_01_Battery_Voltage, setFC_01_Battery_Voltage] = useState<string | null>(null);
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
    
  
     // =================================================================================================================== 


     const [FC_01_System_Voltage, setFC_01_System_Voltage] = useState<string | null>(null);

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
    
 

     // =================================================================================================================== 



          const [FC_01_Charger_Voltage, setFC_01_Charger_Voltage] = useState<string | null>(null);
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

    const [PT_1103, setPT_1103] = useState<string | null>(null);

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
    
    // =================================================================================================================== 

    const [Mode_ATS, setMode_ATS] = useState<string | null>(null);

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
    

    // =================================================================================================================== 
    const [ATS_Auto_Man, setATS_Auto_Man] = useState<string | null>(null);

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
    
            // =================================================================================================================== 
    const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);

    const [EVC_02_Conn_STT_High, setEVC_02_Conn_STT_High] = useState<number | null>(null);
    const [EVC_02_Conn_STT_Low, setEVC_02_Conn_STT_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Conn_STT, setExceedThresholdEVC_02_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainEVC_02_Conn_STT, setMaintainEVC_02_Conn_STT] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Conn_STT_High === 'string' && typeof EVC_02_Conn_STT_Low === 'string' && EVC_02_Conn_STT !== null && maintainEVC_02_Conn_STT === false
            ) {
                const highValue = parseFloat(EVC_02_Conn_STT_High);
                const lowValue = parseFloat(EVC_02_Conn_STT_Low);
                const EVC_02_Conn_STTValue = parseFloat(EVC_02_Conn_STT);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Conn_STTValue)) {
                    if (highValue <= EVC_02_Conn_STTValue || EVC_02_Conn_STTValue <= lowValue) {
                            setExceedThresholdEVC_02_Conn_STT(true);
                    } else {
                       setExceedThresholdEVC_02_Conn_STT(false);
                    }
                } 
            } 
        }, [EVC_02_Conn_STT_High, EVC_02_Conn_STT, EVC_02_Conn_STT_Low,maintainEVC_02_Conn_STT]);

                    // =================================================================================================================== 
    const [FC_01_Conn_STT, setFC_01_Conn_STT] = useState<string | null>(null);

    const [FC_01_Conn_STT_High, setFC_01_Conn_STT_High] = useState<number | null>(null);
    const [FC_01_Conn_STT_Low, setFC_01_Conn_STT_Low] = useState<number | null>(null);
    const [exceedThresholdFC_01_Conn_STT, setExceedThresholdFC_01_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainFC_01_Conn_STT, setMaintainFC_01_Conn_STT] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof FC_01_Conn_STT_High === 'string' && typeof FC_01_Conn_STT_Low === 'string' && FC_01_Conn_STT !== null && maintainFC_01_Conn_STT === false
            ) {
                const highValue = parseFloat(FC_01_Conn_STT_High);
                const lowValue = parseFloat(FC_01_Conn_STT_Low);
                const FC_01_Conn_STTValue = parseFloat(FC_01_Conn_STT);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Conn_STTValue)) {
                    if (highValue <= FC_01_Conn_STTValue || FC_01_Conn_STTValue <= lowValue) {
                            setExceedThresholdFC_01_Conn_STT(true);
                    } else {
                       setExceedThresholdFC_01_Conn_STT(false);
                    }
                } 
            } 
        }, [FC_01_Conn_STT_High, FC_01_Conn_STT, FC_01_Conn_STT_Low,maintainFC_01_Conn_STT]);
    
    // =================================================================================================================== 
    const tagNameFC = {

        FC_01_Lithium_Battery_Status: "Lithium Battery Status (0: Yes - 1: No)",

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
        ReBattery: "Lithium Battery Status (Months)",
        PT_1103: "Output Pressure PT-1103 (BarG)",

    };

    const tagNamePLC = {
        PT01: "Output Pressure (BarG)",
        GD1: "Gas Detector GD-1101 (%LEL)",
        GD2: "Gas Detector GD-1102 (%LEL)",
        ZSC1: "SDV-ZSC-1 (0: On - 1: Off)",
        ZSO1: "SDV-ZSO-1 (0: Off - 1: On)",


        ZSC2: "SDV-ZSC-2 (0: On - 1: Off)",
        ZSO2: "SDV-ZSO-2 (0: Off - 1: On)",
        UPS_BATTERY: "UPS BATTERY (0 :Normal - 1: Battery)",
        UPS_CHARGING: "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM: "UPS ALARM (0: Normal - 1: No Battery)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",

        UPS_MODE:
            "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal)",
        SELECT_SW: "SELECT SW (0: Local - 1: Remote)",
        RESET: "RESET (0: Off - 1: On)",
        EmergencyNO: "Emergency Stop NO (0: Normal - 1: Emergency)",
        EmergencyNC: "Emergency Stop NC (0: Emergency - 1: Normal )",
        HORN: "HORN (0: Off - 1: On)",
        BEACON: "BEACON (0: Off - 1: On)",
        MAP: "MAP (0: Normal - 1: Emergency)",
        DO_SV_01: "SDV SOLENOID (0: Off - 1: On)",
        DO_SV_02: "SDV SOLENOID (0: Off - 1: On)",

    };



    const DataFC_01_Lithium_Battery_Status = FC_01_Lithium_Battery_Status === "0" ? "Yes" : FC_01_Lithium_Battery_Status === "1" ? "No" : null




            const combineCss = {

                CSSFC_Lithinum_Battery_Status : {
                    color:exceedThresholdFC_01_Lithium_Battery_Status && !maintainFC_01_Lithium_Battery_Status
                    ? "#ff5656"
                    : maintainFC_01_Lithium_Battery_Status
                    ? "orange"
                    : "" ,

                    fontWeight: exceedThresholdFC_01_Lithium_Battery_Status && !maintainFC_01_Lithium_Battery_Status
                    ? 600
                    : maintainFC_01_Lithium_Battery_Status
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Lithium_Battery_Status && !maintainFC_01_Lithium_Battery_Status
                    ? 18
                    : maintainFC_01_Lithium_Battery_Status
                    ? 18
                    : "" ,
                    
                },
                CSSFC_01_Battery_Voltage : {
                    color:exceedThresholdFC_01_Battery_Voltage && !maintainFC_01_Battery_Voltage
                    ? "#ff5656"
                    : maintainFC_01_Battery_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Battery_Voltage && !maintainFC_01_Battery_Voltage
                    ? 600
                    : maintainFC_01_Battery_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Battery_Voltage && !maintainFC_01_Battery_Voltage
                    ? 18
                    : maintainFC_01_Battery_Voltage
                    ? 18
                    : "" ,
                },
        
                CSSFC_01_System_Voltage : {
                    color:exceedThresholdFC_01_System_Voltage && !maintainFC_01_System_Voltage
                    ? "#ff5656"
                    : maintainFC_01_System_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_System_Voltage && !maintainFC_01_System_Voltage
                    ? 600
                    : maintainFC_01_System_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_System_Voltage && !maintainFC_01_System_Voltage
                    ? 18
                    : maintainFC_01_System_Voltage
                    ? 18
                    : "" ,
                },
        
                CSSFC_01_Charger_Voltage : {
                    color:exceedThresholdFC_01_Charger_Voltage && !maintainFC_01_Charger_Voltage
                    ? "#ff5656"
                    : maintainFC_01_Charger_Voltage
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdFC_01_Charger_Voltage && !maintainFC_01_Charger_Voltage
                    ? 600
                    : maintainFC_01_Charger_Voltage
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdFC_01_Charger_Voltage && !maintainFC_01_Charger_Voltage
                    ? 18
                    : maintainFC_01_Charger_Voltage
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
                CSSEVC_02_Vm_of_Last_Day : {
                    color:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
                    ? "#ff5656"
                    : maintainEVC_02_Vm_of_Last_Day
                    ? "orange"
                    : "" ,
                    fontWeight: exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
                    ? 600
                    : maintainEVC_02_Vm_of_Last_Day
                    ? 600
                    : "" ,
                    fontSize:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
                    ? 18
                    : maintainEVC_02_Vm_of_Last_Day
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
                    fontWeight: (exceedThresholdEVC_02_Temperature || maintainEVC_02_Temperature)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_02_Temperature || maintainEVC_02_Temperature)
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
        
                CSSEVC_02_Flow_at_Base_Condition : {
                    color:exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
                    ? "#ff5656"
                    : maintainEVC_02_Flow_at_Base_Condition
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_02_Flow_at_Base_Condition || maintainEVC_02_Flow_at_Base_Condition)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_02_Flow_at_Base_Condition || maintainEVC_02_Flow_at_Base_Condition)
                    ? 18
                    : ""
                },



                CSSEVC_02_Conn_STT : {
                    color:exceedThresholdEVC_02_Conn_STT && !maintainEVC_02_Conn_STT
                    ? "#ff5656"
                    : maintainEVC_02_Conn_STT
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdEVC_02_Conn_STT || maintainEVC_02_Conn_STT)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdEVC_02_Conn_STT || maintainEVC_02_Conn_STT)
                    ? 18
                    : ""
                },
        
        
                CSSPT_1103 : {
                    color:exceedThresholdPT_1103 && !maintainPT_1103
                    ? "#ff5656"
                    : maintainPT_1103
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_1103 || maintainPT_1103)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_1103 || maintainPT_1103)
                    ? 18
                    : ""
                },

                CSSMode_ATS : {
                    color:exceedThresholdMode_ATS && !maintainMode_ATS
                    ? "#ff5656"
                    : maintainMode_ATS
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdMode_ATS || maintainMode_ATS)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdMode_ATS || maintainMode_ATS)
                    ? 18
                    : ""
                },
        
          
                CSSATS_Auto_Man : {
                    color:exceedThresholdATS_Auto_Man && !maintainATS_Auto_Man
                    ? "#ff5656"
                    : maintainATS_Auto_Man
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdATS_Auto_Man || maintainATS_Auto_Man)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdATS_Auto_Man || maintainATS_Auto_Man)
                    ? 18
                    : ""
                },
        
                CSSFC_01_Conn_STT : {
                    color:exceedThresholdFC_01_Conn_STT && !maintainFC_01_Conn_STT
                    ? "#ff5656"
                    : maintainFC_01_Conn_STT
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdFC_01_Conn_STT || maintainFC_01_Conn_STT)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdFC_01_Conn_STT || maintainFC_01_Conn_STT)
                    ? 18
                    : ""
                },



          };
          const dataFC_01_Lithium_Battery_Status = FC_01_Lithium_Battery_Status === "0" ? "USP Run" : FC_01_Lithium_Battery_Status === "1" ? "Line Run" : null

const dataMode_ATS = Mode_ATS === "0" ? "USP Run" : Mode_ATS === "1" ? "Line Run" : null
const dataATS_Auto_Man = ATS_Auto_Man === "0" ? "Auto" : ATS_Auto_Man === "1" ? "Man" : null
const DataEVC_02_Conn_STT  = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null;
      

const DataFC_01_Conn_STT  = FC_01_Conn_STT === "0" ? "Not Init" : FC_01_Conn_STT === "1" ? "COM OK" : FC_01_Conn_STT === "2" ? "Error" : null;


const dataFC = [

        {
            name: <span>{tagNameFC.FC_01_Lithium_Battery_Status}</span>,
            FC1901: <span style={combineCss.CSSFC_Lithinum_Battery_Status}>{FC_01_Lithium_Battery_Status} {DataFC_01_Lithium_Battery_Status}</span>,

        },
        {
            name: <span>{tagNameFC.Battery_Voltage}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Battery_Voltage}>{FC_01_Battery_Voltage}</span>,

        },
        {
            name: <span>{tagNameFC.System_Voltage}</span>,
            FC1901: <span style={combineCss.CSSFC_01_System_Voltage}>{FC_01_System_Voltage}</span>,

        },
        {
            name: <span>{tagNameFC.Charger_Voltage}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Charger_Voltage}>{FC_01_Charger_Voltage}</span>,

        },
        {
            name: <span>{tagNameFC.InputPressure}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>{FC_01_Current_Values_Static_Pressure}</span>,

        },
        {
            name: <span>{tagNameFC.Temperature}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>{FC_01_Current_Values_Temperature}</span>,

        },
        {
            name: <span>{tagNameFC.SVF}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>{FC_01_Current_Values_Flow_Rate}</span>,

        },
        {
            name: <span>{tagNameFC.GVF}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>{FC_01_Current_Values_Uncorrected_Flow_Rate}</span>,

        },
        {
            name: <span>{tagNameFC.GVA}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>{FC_01_Accumulated_Values_Uncorrected_Volume}</span>,
        },
        {
            name: <span>{tagNameFC.SVA}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>{FC_01_Accumulated_Values_Volume}</span>,

        },
     
        {
            name: <span>{tagNameFC.VbToday}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Today_Values_Volume}>{FC_01_Today_Values_Volume}</span>,

        },
        {
            name: <span>{tagNameFC.VbLastDay}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>{FC_01_Yesterday_Values_Volume}</span>,

        },
        {
            name: <span>{tagNameFC.VmToday}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>{FC_01_Today_Values_Uncorrected_Volume}</span>,

        },
        {
            name: <span>{tagNameFC.VmLastDay}</span>,
            FC1901: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>{FC_01_Yesterday_Values_Uncorrected_Volume}</span>,

        },
     
    ];

    const dataPLC = [
        {
            name: <span>Remain Battery Service Life (Months) </span>,
            FC1901: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>{EVC_02_Remain_Battery_Service_Life}</span>,

        },
        {
            name: <span>{tagNameFC.Temperature}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Temperature}>{EVC_02_Temperature}</span>,

        },
        {
            name: <span>{tagNameFC.InputPressure}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Pressure}>{EVC_02_Pressure}</span>,
        },
             
        {
            name: <span>Standard Volume Accumulated (Sm³)</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>{EVC_02_Volume_at_Base_Condition}</span>,
        },
        {
            name: <span>Standard Volume Flow (Sm³/h)</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>{EVC_02_Flow_at_Base_Condition}</span>,

        },
        {
            name: <span>Gross Volume Accumulated (m³)</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>{EVC_02_Volume_at_Measurement_Condition}</span>,

        },
        {
            name: <span>Gross Volume Flow (m³/h)</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>{EVC_02_Flow_at_Measurement_Condition}</span>,

        },

     
        {
            name: <span>{tagNameFC.VbToday}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>{EVC_02_Vm_of_Current_Day}</span>,

        },
        {
            name: <span>{tagNameFC.VbLastDay}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>{EVC_02_Vb_of_Last_Day}</span>,

        },
        {
            name: <span>{tagNameFC.VmLastDay}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>{EVC_02_Vm_of_Last_Day}</span>,

        },
       
        {
            name: <span>{tagNameFC.VmToday}</span>,
            FC1901: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>{EVC_02_Vb_of_Current_Day}</span>,

        },
 

      
    ];


    const dataUPS = [
       

        {
            name: <span>Output Pressure PT-1103 (BarG)</span>,
            FC1901: <span style={combineCss.CSSPT_1103}>{PT_1103}</span>,

        },
     
        {
            name: <span>Mode ATS (0: UPS Run - 1: Line Run)</span>,
            FC1901: <span style={combineCss.CSSMode_ATS}>{Mode_ATS} {dataMode_ATS}</span>,

        },
        {
            name: <span>ATS Auto Man (0: Auto - 1: Man)</span>,
            FC1901: <span style={combineCss.CSSATS_Auto_Man}>{ATS_Auto_Man} {dataATS_Auto_Man}</span>,

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
                            ZOCV
                        </div>

                       
                    </div>
                    <div
                        style={{
                            alignItems: "center",
                           padding:5

                        }}
                    >
                       
                        <div style={{  fontWeight: 500,display:'flex' }}>
                           <p style={{fontWeight:700}}>FC</p> : {FC_STT01}
                        </div>
                        <div style={{  fontWeight: 500 , display:'flex'}}>
                           <p style={{fontWeight:700}}>PLC</p> : {Conn_STTValue}
                        </div>
                    </div>
                    
                </div>





                <DataTable value={dataFC} size="small" selectionMode="single"> 
                    <Column field="name" header="FC Parameter"></Column>

                    <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="FC1901"
                            header={FC_Conn_STTValue === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center',  position:'relative',}}>
                                {DotGreen} <p style={{marginLeft:5}}>FC-1101</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center' , position:'relative',}}>
                                   {DotRed}  <p style={{marginLeft:5}}>FC-1101</p>
                                </div>
                            )}
                        ></Column>
                       
                </DataTable>
                    <DataTable value={dataPLC} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > EVC-1102 Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="FC1901"
                            header={EVC_02_Conn_STT === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>EVC-1102 Value</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>EVC-1102 Value</p>
                             </div>
                            )}
                        ></Column>
                    </DataTable>
                
                    <DataTable value={dataUPS} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > UPS Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="FC1901"
                            header={PLC_Conn_STT === "1" ? (

                                <div style={{ padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                <p style={{marginLeft:5}}>UPS Value</p>
   
                               </div>
                               
                            ) : (
                                <div style={{ padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                <p style={{marginLeft:5}}>UPS Value</p>
   
                               </div>
                            )}
                        ></Column>
                    </DataTable>
            </div>

        

        </div>
    );
}
