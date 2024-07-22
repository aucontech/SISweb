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
import { namePCV_PSV, nameValue } from '../namValue';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

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

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        FC_01_Lithium_Battery_Status: setFC_01_Lithium_Batery_Status,
                        FC_01_Battery_Voltage: setFC_01_Battery_Voltage,
                        FC_01_System_Voltage: setFC_01_System_Voltage,
                        FC_01_Charger_Voltage: setFC_01_Charger_Voltage,
                        FC_01_Conn_STT: setFC_01_Conn_STT,
                        FC_01_Accumulated_Values_Uncorrected_Volume: setFC_01_Accumulated_Values_Uncorrected_Volume,

                        FC_01_Accumulated_Values_Volume: setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Static_Pressure: setFC_01_Current_Values_Static_Pressure,
                        FC_01_Current_Values_Temperature: setFC_01_Current_Values_Temperature,

                        FC_01_Current_Values_Flow_Rate: setFC_01_Current_Values_Flow_Rate,



                        EVC_02_Remain_Battery_Service_Life: setEVC_02_Remain_Battery_Service_Life,

                        EVC_02_Temperature: setEVC_02_Temperature,
                        EVC_02_Pressure: setEVC_02_Pressure,


                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Vm_of_Last_Day: setEVC_02_Vm_of_Last_Day,
                        
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,

                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Vb_of_Current_Day: setEVC_02_Vb_of_Current_Day,
                        EVC_02_Vm_of_Current_Day: setEVC_02_Vm_of_Current_Day,



                        EVC_02_Vb_of_Last_Day:setEVC_02_Vb_of_Last_Day,
                        FC_01_Current_Values_Uncorrected_Flow_Rate:setFC_01_Current_Values_Uncorrected_Flow_Rate,
                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume: setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume: setFC_01_Yesterday_Values_Volume,
                        FC_01_Yesterday_Values_Uncorrected_Volume:setFC_01_Yesterday_Values_Uncorrected_Volume,

                        PT_1103:setPT_1103


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
    
            const FC_01_Lithium_Batery_Status_High = res.data.find((item: any) => item.key === "FC_01_Lithium_Batery_Status_High");
            setFC_01_Lithium_Batery_Status_High(FC_01_Lithium_Batery_Status_High?.value || null);
            const FC_01_Lithium_Batery_Status_Low = res.data.find((item: any) => item.key === "FC_01_Lithium_Batery_Status_Low");
            setFC_01_Lithium_Batery_Status_Low(FC_01_Lithium_Batery_Status_Low?.value || null);
            const MaintainFC_01_Lithium_Batery_Status = res.data.find(
                (item: any) => item.key === "FC_01_Lithium_Batery_Status_Maintain"
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

            const FC_01_Conn_STT_High = res.data.find((item: any) => item.key === "FC_01_Conn_STT_High");
            setFC_01_Conn_STT_High(FC_01_Conn_STT_High?.value || null);
            const FC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "FC_01_Conn_STT_Low");
            setFC_01_Conn_STT_Low(FC_01_Conn_STT_Low?.value || null);
            const FC_01_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Conn_STT_Maintain"
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
            

 // =================================================================================================================== 
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


            setMaintainFC_01_Conn_STT(FC_01_Conn_STT_Maintain?.value || false);

            setMaintainFC_01_Charger_Voltage(FC_01_Charger_Voltage_Maintain?.value || false);

            setMaintainFC_01_System_Voltage(FC_01_System_Voltage_Maintain?.value || false);

            setMaintainFC_01_Battery_Voltage(FC_01_Battery_Voltage_Maintain?.value || false);

            setMaintainFC_01_Lithium_Batery_Status(MaintainFC_01_Lithium_Batery_Status?.value || false);


            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [FC_01_Lithium_Batery_Status, setFC_01_Lithium_Batery_Status] = useState<string | null>(null);
const [audioPlayingFC_01_Lithium_Batery_Status, setAudioPlayingFC_01_Lithium_Batery_Status] = useState(false);
const [inputValueFC_01_Lithium_Batery_Status, setInputValueFC_01_Lithium_Batery_Status] = useState<any>();
const [inputValue2FC_01_Lithium_Batery_Status, setInputValue2FC_01_Lithium_Batery_Status] = useState<any>();
const [FC_01_Lithium_Batery_Status_High, setFC_01_Lithium_Batery_Status_High] = useState<number | null>(null);
const [FC_01_Lithium_Batery_Status_Low, setFC_01_Lithium_Batery_Status_Low] = useState<number | null>(null);
const [exceedThresholdFC_01_Lithium_Batery_Status, setExceedThresholdFC_01_Lithium_Batery_Status] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainFC_01_Lithium_Batery_Status, setMaintainFC_01_Lithium_Batery_Status] = useState<boolean>(false);


    useEffect(() => {
        if (typeof FC_01_Lithium_Batery_Status_High === 'string' && typeof FC_01_Lithium_Batery_Status_Low === 'string' && FC_01_Lithium_Batery_Status !== null && maintainFC_01_Lithium_Batery_Status === false
        ) {
            const highValue = parseFloat(FC_01_Lithium_Batery_Status_High);
            const lowValue = parseFloat(FC_01_Lithium_Batery_Status_Low);
            const FC_01_Lithium_Batery_StatusValue = parseFloat(FC_01_Lithium_Batery_Status);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Lithium_Batery_StatusValue)) {
                if (highValue <= FC_01_Lithium_Batery_StatusValue || FC_01_Lithium_Batery_StatusValue <= lowValue) {
                    if (!audioPlayingFC_01_Lithium_Batery_Status) {
                        audioRef.current?.play();
                        setAudioPlayingFC_01_Lithium_Batery_Status(true);
                        setExceedThresholdFC_01_Lithium_Batery_Status(true);
                    }
                } else {
                    setAudioPlayingFC_01_Lithium_Batery_Status(false);
                    setExceedThresholdFC_01_Lithium_Batery_Status(false);
                }
            } 
        } 
    }, [FC_01_Lithium_Batery_Status_High, FC_01_Lithium_Batery_Status, audioPlayingFC_01_Lithium_Batery_Status, FC_01_Lithium_Batery_Status_Low,maintainFC_01_Lithium_Batery_Status]);

    useEffect(() => {
        if (audioPlayingFC_01_Lithium_Batery_Status) {
            const audioEnded = () => {
                setAudioPlayingFC_01_Lithium_Batery_Status(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingFC_01_Lithium_Batery_Status]);

    const handleInputChangeFC_01_Lithium_Batery_Status = (event: any) => {
        const newValue = event.target.value;
        setInputValueFC_01_Lithium_Batery_Status(newValue);
    };

    const handleInputChange2FC_01_Lithium_Batery_Status = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2FC_01_Lithium_Batery_Status(newValue2);
    };
    const ChangeMaintainFC_01_Lithium_Batery_Status = async () => {
        try {
            const newValue = !maintainFC_01_Lithium_Batery_Status;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { FC_01_Lithium_Batery_Status_Maintain: newValue }
            );
            setMaintainFC_01_Lithium_Batery_Status(newValue);
            
        } catch (error) {}
    };


     // =================================================================================================================== 

     const [FC_01_Battery_Voltage, setFC_01_Battery_Voltage] = useState<string | null>(null);
     const [audioPlayingFC_01_Battery_Voltage, setAudioPlayingFC_01_Battery_Voltage] = useState(false);
     const [inputValueFC_01_Battery_Voltage, setInputValueFC_01_Battery_Voltage] = useState<any>();
     const [inputValue2FC_01_Battery_Voltage, setInputValue2FC_01_Battery_Voltage] = useState<any>();
     const [FC_01_Battery_Voltage_High, setFC_01_Battery_Voltage_High] = useState<number | null>(null);
     const [FC_01_Battery_Voltage_Low, setFC_01_Battery_Voltage_Low] = useState<number | null>(null);
     const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_01_Battery_Voltage, setMaintainFC_01_Battery_Voltage] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof FC_01_Battery_Voltage_High === 'string' && typeof FC_01_Battery_Voltage_Low === 'string' && FC_01_Battery_Voltage !== null && maintainFC_01_Battery_Voltage === false
             ) {
                 const highValue = parseFloat(FC_01_Battery_Voltage_High);
                 const lowValue = parseFloat(FC_01_Battery_Voltage_Low);
                 const FC_01_Battery_VoltageValue = parseFloat(FC_01_Battery_Voltage);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Battery_VoltageValue)) {
                     if (highValue <= FC_01_Battery_VoltageValue || FC_01_Battery_VoltageValue <= lowValue) {
                         if (!audioPlayingFC_01_Battery_Voltage) {
                             audioRef.current?.play();
                             setAudioPlayingFC_01_Battery_Voltage(true);
                             setExceedThreshold302(true);
                         }
                     } else {
                        setAudioPlayingFC_01_Battery_Voltage(false);
                         setExceedThreshold302(false);
                     }
                 } 
             } 
         }, [FC_01_Battery_Voltage_High, FC_01_Battery_Voltage, audioPlayingFC_01_Battery_Voltage, FC_01_Battery_Voltage_Low,maintainFC_01_Battery_Voltage]);
     
         useEffect(() => {
             if (audioPlayingFC_01_Battery_Voltage) {
                 const audioEnded = () => {
                    setAudioPlayingFC_01_Battery_Voltage(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingFC_01_Battery_Voltage]);
     
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
     const [audioPlayingFC_01_System_Voltage, setAudioPlayingFC_01_System_Voltage] = useState(false);
     const [inputValueFC_01_System_Voltage, setInputValueFC_01_System_Voltage] = useState<any>();
     const [inputValue2FC_01_System_Voltage, setInputValue2FC_01_System_Voltage] = useState<any>();
     const [FC_01_System_Voltage_High, setFC_01_System_Voltage_High] = useState<number | null>(null);
     const [FC_01_System_Voltage_Low, setFC_01_System_Voltage_Low] = useState<number | null>(null);
     const [exceedThresholdFC_01_System_Voltage, setExceedThresholdFC_01_System_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_01_System_Voltage, setMaintainFC_01_System_Voltage] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof FC_01_System_Voltage_High === 'string' && typeof FC_01_System_Voltage_Low === 'string' && FC_01_System_Voltage !== null && maintainFC_01_System_Voltage === false
             ) {
                 const highValue = parseFloat(FC_01_System_Voltage_High);
                 const lowValue = parseFloat(FC_01_System_Voltage_Low);
                 const FC_01_System_VoltageValue = parseFloat(FC_01_System_Voltage);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_System_VoltageValue)) {
                     if (highValue <= FC_01_System_VoltageValue || FC_01_System_VoltageValue <= lowValue) {
                         if (!audioPlayingFC_01_System_Voltage) {
                             audioRef.current?.play();
                             setAudioPlayingFC_01_System_Voltage(true);
                             setExceedThresholdFC_01_System_Voltage(true);
                         }
                     } else {
                        setAudioPlayingFC_01_System_Voltage(false);
                        setExceedThresholdFC_01_System_Voltage(false);
                     }
                 } 
             } 
         }, [FC_01_System_Voltage_High, FC_01_System_Voltage, audioPlayingFC_01_System_Voltage, FC_01_System_Voltage_Low,maintainFC_01_System_Voltage]);
     
         useEffect(() => {
             if (audioPlayingFC_01_System_Voltage) {
                 const audioEnded = () => {
                    setAudioPlayingFC_01_System_Voltage(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingFC_01_System_Voltage]);
     
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
          const [audioPlayingFC_01_Charger_Voltage, setAudioPlayingFC_01_Charger_Voltage] = useState(false);
          const [inputValueFC_01_Charger_Voltage, setInputValueFC_01_Charger_Voltage] = useState<any>();
          const [inputValue2FC_01_Charger_Voltage, setInputValue2FC_01_Charger_Voltage] = useState<any>();
          const [FC_01_Charger_Voltage_High, setFC_01_Charger_Voltage_High] = useState<number | null>(null);
          const [FC_01_Charger_Voltage_Low, setFC_01_Charger_Voltage_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Charger_Voltage, setExceedThresholdFC_01_Charger_Voltage] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Charger_Voltage, setMaintainFC_01_Charger_Voltage] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Charger_Voltage_High === 'string' && typeof FC_01_Charger_Voltage_Low === 'string' && FC_01_Charger_Voltage !== null && maintainFC_01_Charger_Voltage === false
                  ) {
                      const highValue = parseFloat(FC_01_Charger_Voltage_High);
                      const lowValue = parseFloat(FC_01_Charger_Voltage_Low);
                      const FC_01_Charger_VoltageValue = parseFloat(FC_01_Charger_Voltage);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Charger_VoltageValue)) {
                          if (highValue <= FC_01_Charger_VoltageValue || FC_01_Charger_VoltageValue <= lowValue) {
                              if (!audioPlayingFC_01_Charger_Voltage) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Charger_Voltage(true);
                                  setExceedThresholdFC_01_Charger_Voltage(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Charger_Voltage(false);
                             setExceedThresholdFC_01_Charger_Voltage(false);
                          }
                      } 
                  } 
              }, [FC_01_Charger_Voltage_High, FC_01_Charger_Voltage, audioPlayingFC_01_Charger_Voltage, FC_01_Charger_Voltage_Low,maintainFC_01_Charger_Voltage]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Charger_Voltage) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Charger_Voltage(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Charger_Voltage]);
          
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


          const [FC_01_Conn_STT, setFC_01_Conn_STT] = useState<string | null>(null);
          const [audioPlayingFC_01_Conn_STT, setAudioPlayingFC_01_Conn_STT] = useState(false);
          const [inputValueFC_01_Conn_STT, setInputValueFC_01_Conn_STT] = useState<any>();
          const [inputValue2FC_01_Conn_STT, setInputValue2FC_01_Conn_STT] = useState<any>();
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
                              if (!audioPlayingFC_01_Conn_STT) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Conn_STT(true);
                                  setExceedThresholdFC_01_Conn_STT(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Conn_STT(false);
                             setExceedThresholdFC_01_Conn_STT(false);
                          }
                      } 
                  } 
              }, [FC_01_Conn_STT_High, FC_01_Conn_STT, audioPlayingFC_01_Conn_STT , FC_01_Conn_STT_Low,maintainFC_01_Conn_STT]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Conn_STT) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Conn_STT(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Conn_STT]);
          
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

          const [FC_01_Accumulated_Values_Uncorrected_Volume, setFC_01_Accumulated_Values_Uncorrected_Volume] = useState<string | null>(null);
          const [audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume, setAudioPlayingFC_01_Accumulated_Values_Uncorrected_Volume] = useState(false);
          const [inputValueFC_01_Accumulated_Values_Uncorrected_Volume, setInputValueFC_01_Accumulated_Values_Uncorrected_Volume] = useState<any>();
          const [inputValue2FC_01_Accumulated_Values_Uncorrected_Volume, setInputValue2FC_01_Accumulated_Values_Uncorrected_Volume] = useState<any>();
          const [FC_01_Accumulated_Values_Uncorrected_Volume_High, setFC_01_Accumulated_Values_Uncorrected_Volume_High] = useState<number | null>(null);
          const [FC_01_Accumulated_Values_Uncorrected_Volume_Low, setFC_01_Accumulated_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume, setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Accumulated_Values_Uncorrected_Volume, setMaintainFC_01_Accumulated_Values_Uncorrected_Volume] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Accumulated_Values_Uncorrected_Volume_High === 'string' && typeof FC_01_Accumulated_Values_Uncorrected_Volume_Low === 'string' && FC_01_Accumulated_Values_Uncorrected_Volume !== null && maintainFC_01_Accumulated_Values_Uncorrected_Volume === false
                  ) {
                      const highValue = parseFloat(FC_01_Accumulated_Values_Uncorrected_Volume_High);
                      const lowValue = parseFloat(FC_01_Accumulated_Values_Uncorrected_Volume_Low);
                      const FC_01_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Accumulated_Values_Uncorrected_Volume);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Accumulated_Values_Uncorrected_VolumeValue)) {
                          if (highValue <= FC_01_Accumulated_Values_Uncorrected_VolumeValue || FC_01_Accumulated_Values_Uncorrected_VolumeValue <= lowValue) {
                              if (!audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Accumulated_Values_Uncorrected_Volume(true);
                                  setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Accumulated_Values_Uncorrected_Volume(false);
                             setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume(false);
                          }
                      } 
                  } 
              }, [FC_01_Accumulated_Values_Uncorrected_Volume_High, FC_01_Accumulated_Values_Uncorrected_Volume, audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume, FC_01_Accumulated_Values_Uncorrected_Volume_Low,maintainFC_01_Accumulated_Values_Uncorrected_Volume]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Accumulated_Values_Uncorrected_Volume(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume]);
          
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
          const [audioPlayingFC_01_Current_Values_Temperature, setAudioPlayingFC_01_Current_Values_Temperature] = useState(false);
          const [inputValueFC_01_Current_Values_Temperature, setInputValueFC_01_Current_Values_Temperature] = useState<any>();
          const [inputValue2FC_01_Current_Values_Temperature, setInputValue2FC_01_Current_Values_Temperature] = useState<any>();
          const [FC_01_Current_Values_Temperature_High, setFC_01_Current_Values_Temperature_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Temperature_Low, setFC_01_Current_Values_Temperature_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Temperature, setExceedThresholdFC_01_Current_Values_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Temperature, setMaintainFC_01_Current_Values_Temperature] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Current_Values_Temperature_High === 'string' && typeof FC_01_Current_Values_Temperature_Low === 'string' && FC_01_Current_Values_Temperature !== null && maintainFC_01_Current_Values_Temperature === false
                  ) {
                      const highValue = parseFloat(FC_01_Current_Values_Temperature_High);
                      const lowValue = parseFloat(FC_01_Current_Values_Temperature_Low);
                      const FC_01_Current_Values_TemperatureValue = parseFloat(FC_01_Current_Values_Temperature);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Current_Values_TemperatureValue)) {
                          if (highValue <= FC_01_Current_Values_TemperatureValue || FC_01_Current_Values_TemperatureValue <= lowValue) {
                              if (!audioPlayingFC_01_Current_Values_Temperature) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Current_Values_Temperature(true);
                                  setExceedThresholdFC_01_Current_Values_Temperature(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Current_Values_Temperature(false);
                             setExceedThresholdFC_01_Current_Values_Temperature(false);
                          }
                      } 
                  } 
              }, [FC_01_Current_Values_Temperature_High, FC_01_Current_Values_Temperature, audioPlayingFC_01_Current_Values_Temperature, FC_01_Current_Values_Temperature_Low,maintainFC_01_Current_Values_Temperature]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Current_Values_Temperature) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Current_Values_Temperature(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Current_Values_Temperature]);
          
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
          const [audioPlayingFC_01_Current_Values_Static_Pressure, setAudioPlayingFC_01_Current_Values_Static_Pressure] = useState(false);
          const [inputValueFC_01_Current_Values_Static_Pressure, setInputValueFC_01_Current_Values_Static_Pressure] = useState<any>();
          const [inputValue2FC_01_Current_Values_Static_Pressure, setInputValue2FC_01_Current_Values_Static_Pressure] = useState<any>();
          const [FC_01_Current_Values_Static_Pressure_High, setFC_01_Current_Values_Static_Pressure_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Static_Pressure_Low, setFC_01_Current_Values_Static_Pressure_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Static_Pressure, setExceedThresholdFC_01_Current_Values_Static_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Static_Pressure, setMaintainFC_01_Current_Values_Static_Pressure] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Current_Values_Static_Pressure_High === 'string' && typeof FC_01_Current_Values_Static_Pressure_Low === 'string' && FC_01_Current_Values_Static_Pressure !== null && maintainFC_01_Current_Values_Static_Pressure === false
                  ) {
                      const highValue = parseFloat(FC_01_Current_Values_Static_Pressure_High);
                      const lowValue = parseFloat(FC_01_Current_Values_Static_Pressure_Low);
                      const FC_01_Current_Values_Static_PressureValue = parseFloat(FC_01_Current_Values_Static_Pressure);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Current_Values_Static_PressureValue)) {
                          if (highValue <= FC_01_Current_Values_Static_PressureValue || FC_01_Current_Values_Static_PressureValue <= lowValue) {
                              if (!audioPlayingFC_01_Current_Values_Static_Pressure) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Current_Values_Static_Pressure(true);
                                  setExceedThresholdFC_01_Current_Values_Static_Pressure(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Current_Values_Static_Pressure(false);
                             setExceedThresholdFC_01_Current_Values_Static_Pressure(false);
                          }
                      } 
                  } 
              }, [FC_01_Current_Values_Static_Pressure_High, FC_01_Current_Values_Static_Pressure, audioPlayingFC_01_Current_Values_Static_Pressure, FC_01_Current_Values_Static_Pressure_Low,maintainFC_01_Current_Values_Static_Pressure]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Current_Values_Static_Pressure) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Current_Values_Static_Pressure(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Current_Values_Static_Pressure]);
          
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
          const [audioPlayingFC_01_Accumulated_Values_Volume, setAudioPlayingFC_01_Accumulated_Values_Volume] = useState(false);
          const [inputValueFC_01_Accumulated_Values_Volume, setInputValueFC_01_Accumulated_Values_Volume] = useState<any>();
          const [inputValue2FC_01_Accumulated_Values_Volume, setInputValue2FC_01_Accumulated_Values_Volume] = useState<any>();
          const [FC_01_Accumulated_Values_Volume_High, setFC_01_Accumulated_Values_Volume_High] = useState<number | null>(null);
          const [FC_01_Accumulated_Values_Volume_Low, setFC_01_Accumulated_Values_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Accumulated_Values_Volume, setExceedThresholdFC_01_Accumulated_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Accumulated_Values_Volume, setMaintainFC_01_Accumulated_Values_Volume] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Accumulated_Values_Volume_High === 'string' && typeof FC_01_Accumulated_Values_Volume_Low === 'string' && FC_01_Accumulated_Values_Volume !== null && maintainFC_01_Accumulated_Values_Volume === false
                  ) {
                      const highValue = parseFloat(FC_01_Accumulated_Values_Volume_High);
                      const lowValue = parseFloat(FC_01_Accumulated_Values_Volume_Low);
                      const FC_01_Accumulated_Values_VolumeValue = parseFloat(FC_01_Accumulated_Values_Volume);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Accumulated_Values_VolumeValue)) {
                          if (highValue <= FC_01_Accumulated_Values_VolumeValue || FC_01_Accumulated_Values_VolumeValue <= lowValue) {
                              if (!audioPlayingFC_01_Accumulated_Values_Volume) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Accumulated_Values_Volume(true);
                                  setExceedThresholdFC_01_Accumulated_Values_Volume(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Accumulated_Values_Volume(false);
                             setExceedThresholdFC_01_Accumulated_Values_Volume(false);
                          }
                      } 
                  } 
              }, [FC_01_Accumulated_Values_Volume_High, FC_01_Accumulated_Values_Volume, audioPlayingFC_01_Accumulated_Values_Volume, FC_01_Accumulated_Values_Volume_Low,maintainFC_01_Accumulated_Values_Volume]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Accumulated_Values_Volume) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Accumulated_Values_Volume(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Accumulated_Values_Volume]);
          
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
          const [audioPlayingFC_01_Current_Values_Flow_Rate, setAudioPlayingFC_01_Current_Values_Flow_Rate] = useState(false);
          const [inputValueFC_01_Current_Values_Flow_Rate, setInputValueFC_01_Current_Values_Flow_Rate] = useState<any>();
          const [inputValue2FC_01_Current_Values_Flow_Rate, setInputValue2FC_01_Current_Values_Flow_Rate] = useState<any>();
          const [FC_01_Current_Values_Flow_Rate_High, setFC_01_Current_Values_Flow_Rate_High] = useState<number | null>(null);
          const [FC_01_Current_Values_Flow_Rate_Low, setFC_01_Current_Values_Flow_Rate_Low] = useState<number | null>(null);
          const [exceedThresholdFC_01_Current_Values_Flow_Rate, setExceedThresholdFC_01_Current_Values_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFC_01_Current_Values_Flow_Rate, setMaintainFC_01_Current_Values_Flow_Rate] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof FC_01_Current_Values_Flow_Rate_High === 'string' && typeof FC_01_Current_Values_Flow_Rate_Low === 'string' && FC_01_Current_Values_Flow_Rate !== null && maintainFC_01_Current_Values_Flow_Rate === false
                  ) {
                      const highValue = parseFloat(FC_01_Current_Values_Flow_Rate_High);
                      const lowValue = parseFloat(FC_01_Current_Values_Flow_Rate_Low);
                      const FC_01_Current_Values_Flow_RateValue = parseFloat(FC_01_Current_Values_Flow_Rate);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Current_Values_Flow_RateValue)) {
                          if (highValue <= FC_01_Current_Values_Flow_RateValue || FC_01_Current_Values_Flow_RateValue <= lowValue) {
                              if (!audioPlayingFC_01_Current_Values_Flow_Rate) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_01_Current_Values_Flow_Rate(true);
                                  setExceedThresholdFC_01_Current_Values_Flow_Rate(true);
                              }
                          } else {
                             setAudioPlayingFC_01_Current_Values_Flow_Rate(false);
                             setExceedThresholdFC_01_Current_Values_Flow_Rate(false);
                          }
                      } 
                  } 
              }, [FC_01_Current_Values_Flow_Rate_High, FC_01_Current_Values_Flow_Rate, audioPlayingFC_01_Current_Values_Flow_Rate, FC_01_Current_Values_Flow_Rate_Low,maintainFC_01_Current_Values_Flow_Rate]);
          
              useEffect(() => {
                  if (audioPlayingFC_01_Current_Values_Flow_Rate) {
                      const audioEnded = () => {
                         setAudioPlayingFC_01_Current_Values_Flow_Rate(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_01_Current_Values_Flow_Rate]);
          
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
    const [audioPlayingEVC_02_Remain_Battery_Service_Life, setAudioPlayingEVC_02_Remain_Battery_Service_Life] = useState(false);
    const [inputValueEVC_02_Remain_Battery_Service_Life, setInputValueEVC_02_Remain_Battery_Service_Life] = useState<any>();
    const [inputValue2EVC_02_Remain_Battery_Service_Life, setInputValue2EVC_02_Remain_Battery_Service_Life] = useState<any>();
    const [EVC_02_Remain_Battery_Service_Life_High, setEVC_02_Remain_Battery_Service_Life_High] = useState<number | null>(null);
    const [EVC_02_Remain_Battery_Service_Life_Low, setEVC_02_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Remain_Battery_Service_Life, setExceedThresholdEVC_02_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_02_Remain_Battery_Service_Life, setMaintainEVC_02_Remain_Battery_Service_Life] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Remain_Battery_Service_Life_High === 'string' && typeof EVC_02_Remain_Battery_Service_Life_Low === 'string' && EVC_02_Remain_Battery_Service_Life !== null && maintainEVC_02_Remain_Battery_Service_Life === false
            ) {
                const highValue = parseFloat(EVC_02_Remain_Battery_Service_Life_High);
                const lowValue = parseFloat(EVC_02_Remain_Battery_Service_Life_Low);
                const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Remain_Battery_Service_LifeValue)) {
                    if (highValue <= EVC_02_Remain_Battery_Service_LifeValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue) {
                        if (!audioPlayingEVC_02_Remain_Battery_Service_Life) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Remain_Battery_Service_Life(true);
                            setExceedThresholdEVC_02_Remain_Battery_Service_Life(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Remain_Battery_Service_Life(false);
                       setExceedThresholdEVC_02_Remain_Battery_Service_Life(false);
                    }
                } 
            } 
        }, [EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life, audioPlayingEVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_Low,maintainEVC_02_Remain_Battery_Service_Life]);
    
        useEffect(() => {
            if (audioPlayingEVC_02_Remain_Battery_Service_Life) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Remain_Battery_Service_Life(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Remain_Battery_Service_Life]);
    
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
        const [audioPlayingEVC_02_Temperature, setAudioPlayingEVC_02_Temperature] = useState(false);
        const [inputValueEVC_02_Temperature, setInputValueEVC_02_Temperature] = useState<any>();
        const [inputValue2EVC_02_Temperature, setInputValue2EVC_02_Temperature] = useState<any>();
        const [EVC_02_Temperature_High, setEVC_02_Temperature_High] = useState<number | null>(null);
        const [EVC_02_Temperature_Low, setEVC_02_Temperature_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Temperature, setExceedThresholdEVC_02_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Temperature, setMaintainEVC_02_Temperature] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Temperature_High === 'string' && typeof EVC_02_Temperature_Low === 'string' && EVC_02_Temperature !== null && maintainEVC_02_Temperature === false
                ) {
                    const highValue = parseFloat(EVC_02_Temperature_High);
                    const lowValue = parseFloat(EVC_02_Temperature_Low);
                    const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_TemperatureValue)) {
                        if (highValue <= EVC_02_TemperatureValue || EVC_02_TemperatureValue <= lowValue) {
                            if (!audioPlayingEVC_02_Temperature) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Temperature(true);
                                setExceedThresholdEVC_02_Temperature(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Temperature(false);
                           setExceedThresholdEVC_02_Temperature(false);
                        }
                    } 
                } 
            }, [EVC_02_Temperature_High, EVC_02_Temperature, audioPlayingEVC_02_Temperature, EVC_02_Temperature_Low,maintainEVC_02_Temperature]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Temperature) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Temperature(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Temperature]);
        
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
    const [audioPlayingEVC_02_Pressure, setAudioPlayingEVC_02_Pressure] = useState(false);
    const [inputValueEVC_02_Pressure, setInputValueEVC_02_Pressure] = useState<any>();
    const [inputValue2EVC_02_Pressure, setInputValue2EVC_02_Pressure] = useState<any>();
    const [EVC_02_Pressure_High, setEVC_02_Pressure_High] = useState<number | null>(null);
    const [EVC_02_Pressure_Low, setEVC_02_Pressure_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Pressure, setExceedThresholdEVC_02_Pressure] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Pressure_High === 'string' && typeof EVC_02_Pressure_Low === 'string' && EVC_02_Pressure !== null && maintainEVC_02_Pressure === false
            ) {
                const highValue = parseFloat(EVC_02_Pressure_High);
                const lowValue = parseFloat(EVC_02_Pressure_Low);
                const EVC_02_PressureValue = parseFloat(EVC_02_Pressure);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_PressureValue)) {
                    if (highValue <= EVC_02_PressureValue || EVC_02_PressureValue <= lowValue) {
                        if (!audioPlayingEVC_02_Pressure) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Pressure(true);
                            setExceedThresholdEVC_02_Pressure(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Pressure(false);
                       setExceedThresholdEVC_02_Pressure(false);
                    }
                } 
            } 
        }, [EVC_02_Pressure_High, EVC_02_Pressure, audioPlayingEVC_02_Pressure, EVC_02_Pressure_Low,maintainEVC_02_Pressure]);
    
        useEffect(() => {
            if (audioPlayingEVC_02_Pressure) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Pressure(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Pressure]);
    
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
    const [audioPlayingEVC_02_Volume_at_Base_Condition, setAudioPlayingEVC_02_Volume_at_Base_Condition] = useState(false);
    const [inputValueEVC_02_Volume_at_Base_Condition, setInputValueEVC_02_Volume_at_Base_Condition] = useState<any>();
    const [inputValue2EVC_02_Volume_at_Base_Condition, setInputValue2EVC_02_Volume_at_Base_Condition] = useState<any>();
    const [EVC_02_Volume_at_Base_Condition_High, setEVC_02_Volume_at_Base_Condition_High] = useState<number | null>(null);
    const [EVC_02_Volume_at_Base_Condition_Low, setEVC_02_Volume_at_Base_Condition_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Volume_at_Base_Condition, setExceedThresholdEVC_02_Volume_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_02_Volume_at_Base_Condition, setMaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof EVC_02_Volume_at_Base_Condition_High === 'string' && typeof EVC_02_Volume_at_Base_Condition_Low === 'string' && EVC_02_Volume_at_Base_Condition !== null && maintainEVC_02_Volume_at_Base_Condition === false
            ) {
                const highValue = parseFloat(EVC_02_Volume_at_Base_Condition_High);
                const lowValue = parseFloat(EVC_02_Volume_at_Base_Condition_Low);
                const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Base_ConditionValue)) {
                    if (highValue <= EVC_02_Volume_at_Base_ConditionValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue) {
                        if (!audioPlayingEVC_02_Volume_at_Base_Condition) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Volume_at_Base_Condition(true);
                            setExceedThresholdEVC_02_Volume_at_Base_Condition(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Volume_at_Base_Condition(false);
                       setExceedThresholdEVC_02_Volume_at_Base_Condition(false);
                    }
                } 
            } 
        }, [EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition, audioPlayingEVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_Low,maintainEVC_02_Volume_at_Base_Condition]);
    
        useEffect(() => {
            if (audioPlayingEVC_02_Volume_at_Base_Condition) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Volume_at_Base_Condition(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Volume_at_Base_Condition]);
    
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
const [audioPlayingEVC_02_Vm_of_Last_Day, setAudioPlayingEVC_02_Vm_of_Last_Day] = useState(false);
const [inputValueEVC_02_Vm_of_Last_Day, setInputValueEVC_02_Vm_of_Last_Day] = useState<any>();
const [inputValue2EVC_02_Vm_of_Last_Day, setInputValue2EVC_02_Vm_of_Last_Day] = useState<any>();
const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vm_of_Last_Day, setExceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Vm_of_Last_Day, setMaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);


    useEffect(() => {
        if (typeof EVC_02_Vm_of_Last_Day_High === 'string' && typeof EVC_02_Vm_of_Last_Day_Low === 'string' && EVC_02_Vm_of_Last_Day !== null && maintainEVC_02_Vm_of_Last_Day === false
        ) {
            const highValue = parseFloat(EVC_02_Vm_of_Last_Day_High);
            const lowValue = parseFloat(EVC_02_Vm_of_Last_Day_Low);
            const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Last_DayValue)) {
                if (highValue <= EVC_02_Vm_of_Last_DayValue || EVC_02_Vm_of_Last_DayValue <= lowValue) {
                    if (!audioPlayingEVC_02_Vm_of_Last_Day) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_02_Vm_of_Last_Day(true);
                        setExceedThresholdEVC_02_Vm_of_Last_Day(true);
                    }
                } else {
                   setAudioPlayingEVC_02_Vm_of_Last_Day(false);
                   setExceedThresholdEVC_02_Vm_of_Last_Day(false);
                }
            } 
        } 
    }, [EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day, audioPlayingEVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_Low,maintainEVC_02_Vm_of_Last_Day]);

    useEffect(() => {
        if (audioPlayingEVC_02_Vm_of_Last_Day) {
            const audioEnded = () => {
               setAudioPlayingEVC_02_Vm_of_Last_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_02_Vm_of_Last_Day]);

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
const [audioPlayingEVC_02_Volume_at_Measurement_Condition, setAudioPlayingEVC_02_Volume_at_Measurement_Condition] = useState(false);
const [inputValueEVC_02_Volume_at_Measurement_Condition, setInputValueEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Measurement_Condition, setInputValue2EVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [EVC_02_Volume_at_Measurement_Condition_High, setEVC_02_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Measurement_Condition_Low, setEVC_02_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Measurement_Condition, setExceedThresholdEVC_02_Volume_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Volume_at_Measurement_Condition, setMaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);


    useEffect(() => {
        if (typeof EVC_02_Volume_at_Measurement_Condition_High === 'string' && typeof EVC_02_Volume_at_Measurement_Condition_Low === 'string' && EVC_02_Volume_at_Measurement_Condition !== null && maintainEVC_02_Volume_at_Measurement_Condition === false
        ) {
            const highValue = parseFloat(EVC_02_Volume_at_Measurement_Condition_High);
            const lowValue = parseFloat(EVC_02_Volume_at_Measurement_Condition_Low);
            const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_02_Volume_at_Measurement_ConditionValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue) {
                    if (!audioPlayingEVC_02_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_02_Volume_at_Measurement_Condition(true);
                        setExceedThresholdEVC_02_Volume_at_Measurement_Condition(true);
                    }
                } else {
                   setAudioPlayingEVC_02_Volume_at_Measurement_Condition(false);
                   setExceedThresholdEVC_02_Volume_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition, audioPlayingEVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_Low,maintainEVC_02_Volume_at_Measurement_Condition]);

    useEffect(() => {
        if (audioPlayingEVC_02_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
               setAudioPlayingEVC_02_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_02_Volume_at_Measurement_Condition]);

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
const [audioPlayingEVC_02_Flow_at_Base_Condition, setAudioPlayingEVC_02_Flow_at_Base_Condition] = useState(false);
const [inputValueEVC_02_Flow_at_Base_Condition, setInputValueEVC_02_Flow_at_Base_Condition] = useState<any>();
const [inputValue2EVC_02_Flow_at_Base_Condition, setInputValue2EVC_02_Flow_at_Base_Condition] = useState<any>();
const [EVC_02_Flow_at_Base_Condition_High, setEVC_02_Flow_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_02_Flow_at_Base_Condition_Low, setEVC_02_Flow_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Flow_at_Base_Condition, setExceedThresholdEVC_02_Flow_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Flow_at_Base_Condition, setMaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);


useEffect(() => {
    if (typeof EVC_02_Flow_at_Base_Condition_High === 'string' && typeof EVC_02_Flow_at_Base_Condition_Low === 'string' && EVC_02_Flow_at_Base_Condition !== null && maintainEVC_02_Flow_at_Base_Condition === false
    ) {
        const highValue = parseFloat(EVC_02_Flow_at_Base_Condition_High);
        const lowValue = parseFloat(EVC_02_Flow_at_Base_Condition_Low);
        const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Base_ConditionValue)) {
            if (highValue <= EVC_02_Flow_at_Base_ConditionValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue) {
                if (!audioPlayingEVC_02_Flow_at_Base_Condition) {
                    audioRef.current?.play();
                    setAudioPlayingEVC_02_Flow_at_Base_Condition(true);
                    setExceedThresholdEVC_02_Flow_at_Base_Condition(true);
                }
            } else {
               setAudioPlayingEVC_02_Flow_at_Base_Condition(false);
               setExceedThresholdEVC_02_Flow_at_Base_Condition(false);
            }
        } 
    } 
}, [EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition, audioPlayingEVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_Low,maintainEVC_02_Flow_at_Base_Condition]);

useEffect(() => {
    if (audioPlayingEVC_02_Flow_at_Base_Condition) {
        const audioEnded = () => {
           setAudioPlayingEVC_02_Flow_at_Base_Condition(false);
        };
        audioRef.current?.addEventListener('ended', audioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', audioEnded);
        };
    }
}, [audioPlayingEVC_02_Flow_at_Base_Condition]);

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
        const [audioPlayingEVC_02_Flow_at_Measurement_Condition, setAudioPlayingEVC_02_Flow_at_Measurement_Condition] = useState(false);
        const [inputValueEVC_02_Flow_at_Measurement_Condition, setInputValueEVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [inputValue2EVC_02_Flow_at_Measurement_Condition, setInputValue2EVC_02_Flow_at_Measurement_Condition] = useState<any>();
        const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
        const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setExceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Flow_at_Measurement_Condition, setMaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Flow_at_Measurement_Condition_High === 'string' && typeof EVC_02_Flow_at_Measurement_Condition_Low === 'string' && EVC_02_Flow_at_Measurement_Condition !== null && maintainEVC_02_Flow_at_Measurement_Condition === false
                ) {
                    const highValue = parseFloat(EVC_02_Flow_at_Measurement_Condition_High);
                    const lowValue = parseFloat(EVC_02_Flow_at_Measurement_Condition_Low);
                    const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Measurement_ConditionValue)) {
                        if (highValue <= EVC_02_Flow_at_Measurement_ConditionValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue) {
                            if (!audioPlayingEVC_02_Flow_at_Measurement_Condition) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Flow_at_Measurement_Condition(true);
                                setExceedThresholdEVC_02_Flow_at_Measurement_Condition(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Flow_at_Measurement_Condition(false);
                           setExceedThresholdEVC_02_Flow_at_Measurement_Condition(false);
                        }
                    } 
                } 
            }, [EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition, audioPlayingEVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_Low,maintainEVC_02_Flow_at_Measurement_Condition]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Flow_at_Measurement_Condition) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Flow_at_Measurement_Condition(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Flow_at_Measurement_Condition]);
        
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
        const [audioPlayingEVC_02_Vb_of_Current_Day, setAudioPlayingEVC_02_Vb_of_Current_Day] = useState(false);
        const [inputValueEVC_02_Vb_of_Current_Day, setInputValueEVC_02_Vb_of_Current_Day] = useState<any>();
        const [inputValue2EVC_02_Vb_of_Current_Day, setInputValue2EVC_02_Vb_of_Current_Day] = useState<any>();
        const [EVC_02_Vb_of_Current_Day_High, setEVC_02_Vb_of_Current_Day_High] = useState<number | null>(null);
        const [EVC_02_Vb_of_Current_Day_Low, setEVC_02_Vb_of_Current_Day_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Vb_of_Current_Day, setExceedThresholdEVC_02_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Vb_of_Current_Day, setMaintainEVC_02_Vb_of_Current_Day] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof EVC_02_Vb_of_Current_Day_High === 'string' && typeof EVC_02_Vb_of_Current_Day_Low === 'string' && EVC_02_Vb_of_Current_Day !== null && maintainEVC_02_Vb_of_Current_Day === false
                ) {
                    const highValue = parseFloat(EVC_02_Vb_of_Current_Day_High);
                    const lowValue = parseFloat(EVC_02_Vb_of_Current_Day_Low);
                    const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Current_DayValue)) {
                        if (highValue <= EVC_02_Vb_of_Current_DayValue || EVC_02_Vb_of_Current_DayValue <= lowValue) {
                            if (!audioPlayingEVC_02_Vb_of_Current_Day) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Vb_of_Current_Day(true);
                                setExceedThresholdEVC_02_Vb_of_Current_Day(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Vb_of_Current_Day(false);
                           setExceedThresholdEVC_02_Vb_of_Current_Day(false);
                        }
                    } 
                } 
            }, [EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day, audioPlayingEVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_Low,maintainEVC_02_Vb_of_Current_Day]);
        
            useEffect(() => {
                if (audioPlayingEVC_02_Vb_of_Current_Day) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Vb_of_Current_Day(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Vb_of_Current_Day]);
        
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
        const [audioPlayingEVC_02_Vm_of_Current_Day, setAudioPlayingEVC_02_Vm_of_Current_Day] = useState(false);
        const [inputValueEVC_02_Vm_of_Current_Day, setInputValueEVC_02_Vm_of_Current_Day] = useState<any>();
        const [inputValue2EVC_02_Vm_of_Current_Day, setInputValue2EVC_02_Vm_of_Current_Day] = useState<any>();
        const [EVC_02_Vm_of_Current_Day_High, setEVC_02_Vm_of_Current_Day_High] = useState<number | null>(null);
        const [EVC_02_Vm_of_Current_Day_Low, setEVC_02_Vm_of_Current_Day_Low] = useState<number | null>(null);
        const [exceedThresholdEVC_02_Vm_of_Current_Day, setExceedThresholdEVC_02_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainEVC_02_Vm_of_Current_Day, setMaintainEVC_02_Vm_of_Current_Day] = useState<boolean>(false);
        
        
        useEffect(() => {
            if (typeof EVC_02_Vm_of_Current_Day_High === 'string' && typeof EVC_02_Vm_of_Current_Day_Low === 'string' && EVC_02_Vm_of_Current_Day !== null && maintainEVC_02_Vm_of_Current_Day === false
            ) {
                const highValue = parseFloat(EVC_02_Vm_of_Current_Day_High);
                const lowValue = parseFloat(EVC_02_Vm_of_Current_Day_Low);
                const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Current_DayValue)) {
                    if (highValue <= EVC_02_Vm_of_Current_DayValue || EVC_02_Vm_of_Current_DayValue <= lowValue) {
                        if (!audioPlayingEVC_02_Vm_of_Current_Day) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_02_Vm_of_Current_Day(true);
                            setExceedThresholdEVC_02_Vm_of_Current_Day(true);
                        }
                    } else {
                       setAudioPlayingEVC_02_Vm_of_Current_Day(false);
                       setExceedThresholdEVC_02_Vm_of_Current_Day(false);
                    }
                } 
            } 
        }, [EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day, audioPlayingEVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_Low,maintainEVC_02_Vm_of_Current_Day]);
        
        useEffect(() => {
            if (audioPlayingEVC_02_Vm_of_Current_Day) {
                const audioEnded = () => {
                   setAudioPlayingEVC_02_Vm_of_Current_Day(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_02_Vm_of_Current_Day]);
        
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
            const [audioPlayingEVC_02_Vb_of_Last_Day, setAudioPlayingEVC_02_Vb_of_Last_Day] = useState(false);
            const [inputValueEVC_02_Vb_of_Last_Day, setInputValueEVC_02_Vb_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vb_of_Last_Day, setInputValue2EVC_02_Vb_of_Last_Day] = useState<any>();
            const [EVC_02_Vb_of_Last_Day_High, setEVC_02_Vb_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vb_of_Last_Day_Low, setEVC_02_Vb_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vb_of_Last_Day, setExceedThresholdEVC_02_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainEVC_02_Vb_of_Last_Day, setMaintainEVC_02_Vb_of_Last_Day] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof EVC_02_Vb_of_Last_Day_High === 'string' && typeof EVC_02_Vb_of_Last_Day_Low === 'string' && EVC_02_Vb_of_Last_Day !== null && maintainEVC_02_Vb_of_Last_Day === false
                ) {
                    const highValue = parseFloat(EVC_02_Vb_of_Last_Day_High);
                    const lowValue = parseFloat(EVC_02_Vb_of_Last_Day_Low);
                    const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Last_DayValue)) {
                        if (highValue <= EVC_02_Vb_of_Last_DayValue || EVC_02_Vb_of_Last_DayValue <= lowValue) {
                            if (!audioPlayingEVC_02_Vb_of_Last_Day) {
                                audioRef.current?.play();
                                setAudioPlayingEVC_02_Vb_of_Last_Day(true);
                                setExceedThresholdEVC_02_Vb_of_Last_Day(true);
                            }
                        } else {
                           setAudioPlayingEVC_02_Vb_of_Last_Day(false);
                           setExceedThresholdEVC_02_Vb_of_Last_Day(false);
                        }
                    } 
                } 
            }, [EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day, audioPlayingEVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_Low,maintainEVC_02_Vb_of_Last_Day]);
            
            useEffect(() => {
                if (audioPlayingEVC_02_Vb_of_Last_Day) {
                    const audioEnded = () => {
                       setAudioPlayingEVC_02_Vb_of_Last_Day(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingEVC_02_Vb_of_Last_Day]);
            
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
            const [audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate, setAudioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate] = useState(false);
            const [inputValueFC_01_Current_Values_Uncorrected_Flow_Rate, setInputValueFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
            const [inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate, setInputValue2FC_01_Current_Values_Uncorrected_Flow_Rate] = useState<any>();
            const [FC_01_Current_Values_Uncorrected_Flow_Rate_High, setFC_01_Current_Values_Uncorrected_Flow_Rate_High] = useState<number | null>(null);
            const [FC_01_Current_Values_Uncorrected_Flow_Rate_Low, setFC_01_Current_Values_Uncorrected_Flow_Rate_Low] = useState<number | null>(null);
            const [exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate, setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainFC_01_Current_Values_Uncorrected_Flow_Rate, setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof FC_01_Current_Values_Uncorrected_Flow_Rate_High === 'string' && typeof FC_01_Current_Values_Uncorrected_Flow_Rate_Low === 'string' && FC_01_Current_Values_Uncorrected_Flow_Rate !== null && maintainFC_01_Current_Values_Uncorrected_Flow_Rate === false
                ) {
                    const highValue = parseFloat(FC_01_Current_Values_Uncorrected_Flow_Rate_High);
                    const lowValue = parseFloat(FC_01_Current_Values_Uncorrected_Flow_Rate_Low);
                    const FC_01_Current_Values_Uncorrected_Flow_RateValue = parseFloat(FC_01_Current_Values_Uncorrected_Flow_Rate);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Current_Values_Uncorrected_Flow_RateValue)) {
                        if (highValue <= FC_01_Current_Values_Uncorrected_Flow_RateValue || FC_01_Current_Values_Uncorrected_Flow_RateValue <= lowValue) {
                            if (!audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate) {
                                audioRef.current?.play();
                                setAudioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate(true);
                                setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate(true);
                            }
                        } else {
                           setAudioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate(false);
                           setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate(false);
                        }
                    } 
                } 
            }, [FC_01_Current_Values_Uncorrected_Flow_Rate_High, FC_01_Current_Values_Uncorrected_Flow_Rate, audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate, FC_01_Current_Values_Uncorrected_Flow_Rate_Low,maintainFC_01_Current_Values_Uncorrected_Flow_Rate]);
            
            useEffect(() => {
                if (audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate) {
                    const audioEnded = () => {
                       setAudioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingFC_01_Current_Values_Uncorrected_Flow_Rate]);
            
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
                   const [audioPlayingFC_01_Today_Values_Volume, setAudioPlayingFC_01_Today_Values_Volume] = useState(false);
                   const [inputValueFC_01_Today_Values_Volume, setInputValueFC_01_Today_Values_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Volume, setInputValue2FC_01_Today_Values_Volume] = useState<any>();
                   const [FC_01_Today_Values_Volume_High, setFC_01_Today_Values_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Volume_Low, setFC_01_Today_Values_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Volume, setExceedThresholdFC_01_Today_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Volume, setMaintainFC_01_Today_Values_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                       if (typeof FC_01_Today_Values_Volume_High === 'string' && typeof FC_01_Today_Values_Volume_Low === 'string' && FC_01_Today_Values_Volume !== null && maintainFC_01_Today_Values_Volume === false
                       ) {
                           const highValue = parseFloat(FC_01_Today_Values_Volume_High);
                           const lowValue = parseFloat(FC_01_Today_Values_Volume_Low);
                           const FC_01_Today_Values_VolumeValue = parseFloat(FC_01_Today_Values_Volume);
                   
                           if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Today_Values_VolumeValue)) {
                               if (highValue <= FC_01_Today_Values_VolumeValue || FC_01_Today_Values_VolumeValue <= lowValue) {
                                   if (!audioPlayingFC_01_Today_Values_Volume) {
                                       audioRef.current?.play();
                                       setAudioPlayingFC_01_Today_Values_Volume(true);
                                       setExceedThresholdFC_01_Today_Values_Volume(true);
                                   }
                               } else {
                                  setAudioPlayingFC_01_Today_Values_Volume(false);
                                  setExceedThresholdFC_01_Today_Values_Volume(false);
                               }
                           } 
                       } 
                   }, [FC_01_Today_Values_Volume_High, FC_01_Today_Values_Volume, audioPlayingFC_01_Today_Values_Volume, FC_01_Today_Values_Volume_Low,maintainFC_01_Today_Values_Volume]);
                   
                   useEffect(() => {
                       if (audioPlayingFC_01_Today_Values_Volume) {
                           const audioEnded = () => {
                              setAudioPlayingFC_01_Today_Values_Volume(false);
                           };
                           audioRef.current?.addEventListener('ended', audioEnded);
                           return () => {
                               audioRef.current?.removeEventListener('ended', audioEnded);
                           };
                       }
                   }, [audioPlayingFC_01_Today_Values_Volume]);
                   
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
                   const [audioPlayingFC_01_Today_Values_Uncorrected_Volume, setAudioPlayingFC_01_Today_Values_Uncorrected_Volume] = useState(false);
                   const [inputValueFC_01_Today_Values_Uncorrected_Volume, setInputValueFC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [inputValue2FC_01_Today_Values_Uncorrected_Volume, setInputValue2FC_01_Today_Values_Uncorrected_Volume] = useState<any>();
                   const [FC_01_Today_Values_Uncorrected_Volume_High, setFC_01_Today_Values_Uncorrected_Volume_High] = useState<number | null>(null);
                   const [FC_01_Today_Values_Uncorrected_Volume_Low, setFC_01_Today_Values_Uncorrected_Volume_Low] = useState<number | null>(null);
                   const [exceedThresholdFC_01_Today_Values_Uncorrected_Volume, setExceedThresholdFC_01_Today_Values_Uncorrected_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainFC_01_Today_Values_Uncorrected_Volume, setMaintainFC_01_Today_Values_Uncorrected_Volume] = useState<boolean>(false);
                   
                   
                   useEffect(() => {
                       if (typeof FC_01_Today_Values_Uncorrected_Volume_High === 'string' && typeof FC_01_Today_Values_Uncorrected_Volume_Low === 'string' && FC_01_Today_Values_Uncorrected_Volume !== null && maintainFC_01_Today_Values_Uncorrected_Volume === false
                       ) {
                           const highValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume_High);
                           const lowValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume_Low);
                           const FC_01_Today_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Today_Values_Uncorrected_Volume);
                   
                           if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Today_Values_Uncorrected_VolumeValue)) {
                               if (highValue <= FC_01_Today_Values_Uncorrected_VolumeValue || FC_01_Today_Values_Uncorrected_VolumeValue <= lowValue) {
                                   if (!audioPlayingFC_01_Today_Values_Uncorrected_Volume) {
                                       audioRef.current?.play();
                                       setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(true);
                                       setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(true);
                                   }
                               } else {
                                  setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(false);
                                  setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(false);
                               }
                           } 
                       } 
                   }, [FC_01_Today_Values_Uncorrected_Volume_High, FC_01_Today_Values_Uncorrected_Volume, audioPlayingFC_01_Today_Values_Uncorrected_Volume, FC_01_Today_Values_Uncorrected_Volume_Low,maintainFC_01_Today_Values_Uncorrected_Volume]);
                   
                   useEffect(() => {
                       if (audioPlayingFC_01_Today_Values_Uncorrected_Volume) {
                           const audioEnded = () => {
                              setAudioPlayingFC_01_Today_Values_Uncorrected_Volume(false);
                           };
                           audioRef.current?.addEventListener('ended', audioEnded);
                           return () => {
                               audioRef.current?.removeEventListener('ended', audioEnded);
                           };
                       }
                   }, [audioPlayingFC_01_Today_Values_Uncorrected_Volume]);
                   
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
                           const [audioPlayingFC_01_Yesterday_Values_Volume, setAudioPlayingFC_01_Yesterday_Values_Volume] = useState(false);
                           const [inputValueFC_01_Yesterday_Values_Volume, setInputValueFC_01_Yesterday_Values_Volume] = useState<any>();
                           const [inputValue2FC_01_Yesterday_Values_Volume, setInputValue2FC_01_Yesterday_Values_Volume] = useState<any>();
                           const [FC_01_Yesterday_Values_Volume_High, setFC_01_Yesterday_Values_Volume_High] = useState<number | null>(null);
                           const [FC_01_Yesterday_Values_Volume_Low, setFC_01_Yesterday_Values_Volume_Low] = useState<number | null>(null);
                           const [exceedThresholdFC_01_Yesterday_Values_Volume, setExceedThresholdFC_01_Yesterday_Values_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                           
                           const [maintainFC_01_Yesterday_Values_Volume, setMaintainFC_01_Yesterday_Values_Volume] = useState<boolean>(false);
                           
                           
                           useEffect(() => {
                               if (typeof FC_01_Yesterday_Values_Volume_High === 'string' && typeof FC_01_Yesterday_Values_Volume_Low === 'string' && FC_01_Yesterday_Values_Volume !== null && maintainFC_01_Yesterday_Values_Volume === false
                               ) {
                                   const highValue = parseFloat(FC_01_Yesterday_Values_Volume_High);
                                   const lowValue = parseFloat(FC_01_Yesterday_Values_Volume_Low);
                                   const FC_01_Yesterday_Values_VolumeValue = parseFloat(FC_01_Yesterday_Values_Volume);
                           
                                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Yesterday_Values_VolumeValue)) {
                                       if (highValue <= FC_01_Yesterday_Values_VolumeValue || FC_01_Yesterday_Values_VolumeValue <= lowValue) {
                                           if (!audioPlayingFC_01_Yesterday_Values_Volume) {
                                               audioRef.current?.play();
                                               setAudioPlayingFC_01_Yesterday_Values_Volume(true);
                                               setExceedThresholdFC_01_Yesterday_Values_Volume(true);
                                           }
                                       } else {
                                          setAudioPlayingFC_01_Yesterday_Values_Volume(false);
                                          setExceedThresholdFC_01_Yesterday_Values_Volume(false);
                                       }
                                   } 
                               } 
                           }, [FC_01_Yesterday_Values_Volume_High, FC_01_Yesterday_Values_Volume, audioPlayingFC_01_Yesterday_Values_Volume, FC_01_Yesterday_Values_Volume_Low,maintainFC_01_Yesterday_Values_Volume]);
                           
                           useEffect(() => {
                               if (audioPlayingFC_01_Yesterday_Values_Volume) {
                                   const audioEnded = () => {
                                      setAudioPlayingFC_01_Yesterday_Values_Volume(false);
                                   };
                                   audioRef.current?.addEventListener('ended', audioEnded);
                                   return () => {
                                       audioRef.current?.removeEventListener('ended', audioEnded);
                                   };
                               }
                           }, [audioPlayingFC_01_Yesterday_Values_Volume]);
                           
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
        
                               const [PT_1103, setPT_1103] = useState<string | null>(null);
                               const [audioPlayingPT_1103, setAudioPlayingPT_1103] = useState(false);
                               const [inputValuePT_1103, setInputValuePT_1103] = useState<any>();
                               const [inputValue2PT_1103, setInputValue2PT_1103] = useState<any>();
                               const [PT_1103_High, setPT_1103_High] = useState<number | null>(null);
                               const [PT_1103_Low, setPT_1103_Low] = useState<number | null>(null);
                               const [exceedThresholdPT_1103, setExceedThresholdPT_1103] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                               
                               const [maintainPT_1103, setMaintainPT_1103] = useState<boolean>(false);
                               
                               
                               useEffect(() => {
                                   if (typeof PT_1103_High === 'string' && typeof PT_1103_Low === 'string' && PT_1103 !== null && maintainPT_1103 === false
                                   ) {
                                       const highValue = parseFloat(PT_1103_High);
                                       const lowValue = parseFloat(PT_1103_Low);
                                       const PT_1103Value = parseFloat(PT_1103);
                               
                                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_1103Value)) {
                                           if (highValue <= PT_1103Value || PT_1103Value <= lowValue) {
                                               if (!audioPlayingPT_1103) {
                                                   audioRef.current?.play();
                                                   setAudioPlayingPT_1103(true);
                                                   setExceedThresholdPT_1103(true);
                                               }
                                           } else {
                                              setAudioPlayingPT_1103(false);
                                              setExceedThresholdPT_1103(false);
                                           }
                                       } 
                                   } 
                               }, [PT_1103_High, PT_1103, audioPlayingPT_1103, PT_1103_Low,maintainPT_1103]);
                               
                               useEffect(() => {
                                   if (audioPlayingPT_1103) {
                                       const audioEnded = () => {
                                          setAudioPlayingPT_1103(false);
                                       };
                                       audioRef.current?.addEventListener('ended', audioEnded);
                                       return () => {
                                           audioRef.current?.removeEventListener('ended', audioEnded);
                                       };
                                   }
                               }, [audioPlayingPT_1103]);
                               
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
                                         if (typeof FC_01_Yesterday_Values_Uncorrected_Volume_High === 'string' && typeof FC_01_Yesterday_Values_Uncorrected_Volume_Low === 'string' && FC_01_Yesterday_Values_Uncorrected_Volume !== null && maintainFC_01_Yesterday_Values_Uncorrected_Volume === false
                                         ) {
                                             const highValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume_High);
                                             const lowValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume_Low);
                                             const FC_01_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_01_Yesterday_Values_Uncorrected_Volume);
                                     
                                             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_01_Yesterday_Values_Uncorrected_VolumeValue)) {
                                                 if (highValue <= FC_01_Yesterday_Values_Uncorrected_VolumeValue || FC_01_Yesterday_Values_Uncorrected_VolumeValue <= lowValue) {
                                                     if (!audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume) {
                                                         audioRef.current?.play();
                                                         setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(true);
                                                         setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(true);
                                                     }
                                                 } else {
                                                    setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                                    setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                                 }
                                             } 
                                         } 
                                     }, [FC_01_Yesterday_Values_Uncorrected_Volume_High, FC_01_Yesterday_Values_Uncorrected_Volume, audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume, FC_01_Yesterday_Values_Uncorrected_Volume_Low,maintainFC_01_Yesterday_Values_Uncorrected_Volume]);
                                     
                                     useEffect(() => {
                                         if (audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume) {
                                             const audioEnded = () => {
                                                setAudioPlayingFC_01_Yesterday_Values_Uncorrected_Volume(false);
                                             };
                                             audioRef.current?.addEventListener('ended', audioEnded);
                                             return () => {
                                                 audioRef.current?.removeEventListener('ended', audioEnded);
                                             };
                                         }
                                     }, [audioPlayingFC_01_Yesterday_Values_Uncorrected_Volume]);
                                     
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

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ZOCV}/SERVER_SCOPE`,
                { FC_01_Battery_Voltage_High: inputValueFC_01_Battery_Voltage,FC_01_Battery_Voltage_Low:inputValue2FC_01_Battery_Voltage,
                    FC_01_System_Voltage_High: inputValueFC_01_System_Voltage,FC_01_System_Voltage_Low:inputValue2FC_01_System_Voltage,
                    FC_01_Lithium_Batery_Status_High: inputValueFC_01_Lithium_Batery_Status,FC_01_Lithium_Batery_Status_Low:inputValue2FC_01_Lithium_Batery_Status,


                    FC_01_Charger_Voltage_High: inputValueFC_01_Charger_Voltage,FC_01_Charger_Voltage_Low:inputValue2FC_01_Charger_Voltage,
                    FC_01_Conn_STT_High: inputValueFC_01_Conn_STT,FC_01_Conn_STT_Low:inputValue2FC_01_Conn_STT,
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
                    
                    PT_1103_High: inputValuePT_1103,PT_1103_Low:inputValue2PT_1103,
                    
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

            setFC_01_Lithium_Batery_Status_High(inputValueFC_01_Lithium_Batery_Status);
            setFC_01_Lithium_Batery_Status_Low(inputValue2FC_01_Lithium_Batery_Status);

            setFC_01_Battery_Voltage_High(inputValueFC_01_Battery_Voltage);
            setFC_01_Battery_Voltage_Low(inputValue2FC_01_Battery_Voltage);

            setFC_01_System_Voltage_High(inputValueFC_01_System_Voltage);
            setFC_01_System_Voltage_Low(inputValue2FC_01_System_Voltage);

            setFC_01_System_Voltage_High(inputValueFC_01_System_Voltage);
            setFC_01_System_Voltage_Low(inputValue2FC_01_System_Voltage);

            setFC_01_Charger_Voltage_High(inputValueFC_01_Charger_Voltage);
            setFC_01_Charger_Voltage_Low(inputValue2FC_01_Charger_Voltage);

            setFC_01_Conn_STT_High(inputValueFC_01_Conn_STT);
            setFC_01_Conn_STT_Low(inputValue2FC_01_Conn_STT);

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
        setInputValueFC_01_Lithium_Batery_Status(FC_01_Lithium_Batery_Status_High); 
        setInputValue2FC_01_Lithium_Batery_Status(FC_01_Lithium_Batery_Status_Low); 

        setInputValueFC_01_Battery_Voltage(FC_01_Battery_Voltage_High); 
        setInputValue2FC_01_Battery_Voltage(FC_01_Battery_Voltage_Low); 

        setInputValueFC_01_System_Voltage(FC_01_System_Voltage_High); 
        setInputValue2FC_01_System_Voltage(FC_01_System_Voltage_Low); 

        setInputValueFC_01_Charger_Voltage(FC_01_Charger_Voltage_High); 
        setInputValue2FC_01_Charger_Voltage(FC_01_Charger_Voltage_Low); 

        setInputValueFC_01_Conn_STT(FC_01_Conn_STT_High); 
        setInputValue2FC_01_Conn_STT(FC_01_Conn_STT_Low); 

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

    }, [FC_01_Lithium_Batery_Status_High, FC_01_Lithium_Batery_Status_Low ,
        FC_01_Battery_Voltage_High, FC_01_Battery_Voltage_Low 
        ,FC_01_System_Voltage_High, FC_01_System_Voltage_Low ,


        FC_01_Conn_STT_High,FC_01_Conn_STT_Low,
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
           getWayPhoneOTSUKA,
           PCV_01,
           PCV_02,
           PSV_01,

           timeEVC_01,timeEVC_02

        ]);


        
    const combineCss = {
        CSSFC_01_Lithium_Batery_Status : {
            color:exceedThresholdFC_01_Lithium_Batery_Status && !maintainFC_01_Lithium_Batery_Status
            ? "#ff5656"
            : maintainFC_01_Lithium_Batery_Status
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSFC_01_Battery_Voltage : {
            color:exceedThreshold302 && !maintainFC_01_Battery_Voltage
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
  };
         
  const mainCategoryFC = {
    EVC01: 'FC-1101 -  Parameters & Configurations',
    EVC02: 'EVC-1102 -  Parameters & Configurations',
    PLC: 'PLC -  Parameters & Configurations'
};


        const dataEVC01 = [

            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSFC_01_Lithium_Batery_Status} >{FC01_Conn_STT}</span>,
             name: <span style={combineCss.CSSFC_01_Lithium_Batery_Status}> Lithinum Battery Status </span> ,
    
             modbus: <span style={combineCss.CSSFC_01_Lithium_Batery_Status}>5615	 </span> ,
    
            value: <span style={combineCss.CSSFC_01_Lithium_Batery_Status} > {FC_01_Lithium_Batery_Status} </span> , 
             high: <InputText style={combineCss.CSSFC_01_Lithium_Batery_Status}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Lithium_Batery_Status} onChange={handleInputChangeFC_01_Lithium_Batery_Status} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_01_Lithium_Batery_Status}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Lithium_Batery_Status} onChange={handleInputChange2FC_01_Lithium_Batery_Status} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_01_Lithium_Batery_Status}
             checked={maintainFC_01_Lithium_Batery_Status}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSFC_01_Battery_Voltage} >{FC01_Conn_STT}</span>,
             name: <span style={combineCss.CSSFC_01_Battery_Voltage}> Battery Voltage</span> ,
    
             modbus: <span style={combineCss.CSSFC_01_Battery_Voltage}>6615	 </span> ,
    
            value: <span style={combineCss.CSSFC_01_Battery_Voltage} > {FC_01_Battery_Voltage} {nameValue.Volt}</span> , 
             high: <InputText style={combineCss.CSSFC_01_Battery_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Battery_Voltage} onChange={handleInputChangeFC_01_Battery_Voltage} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_01_Battery_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Battery_Voltage} onChange={handleInputChange2FC_01_Battery_Voltage} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainFC_01_Battery_Voltage}
             checked={maintainFC_01_Battery_Voltage}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.EVC01,
                
                timeUpdate: <span style={combineCss.CSSFC_01_System_Voltage} >{FC01_Conn_STT}</span>,
            name: <span style={combineCss.CSSFC_01_System_Voltage}>System Voltage</span> ,
   
            modbus: <span style={combineCss.CSSFC_01_System_Voltage}>6617	 </span> ,
   
           value: <span style={combineCss.CSSFC_01_System_Voltage} > {FC_01_System_Voltage} {nameValue.Volt}</span> , 
            high: <InputText style={combineCss.CSSFC_01_System_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_System_Voltage} onChange={handleInputChangeFC_01_System_Voltage} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSFC_01_System_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_System_Voltage} onChange={handleInputChange2FC_01_System_Voltage} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainFC_01_System_Voltage}
            checked={maintainFC_01_System_Voltage}
        ></Checkbox>
   
           },

           {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Charger_Voltage} >{FC01_Conn_STT}</span>,
           name: <span style={combineCss.CSSFC_01_Charger_Voltage}> Charger Voltage </span> ,
  
           modbus: <span style={combineCss.CSSFC_01_Charger_Voltage}>6619	 </span> ,
  
          value: <span style={combineCss.CSSFC_01_Charger_Voltage} > {FC_01_Charger_Voltage} {nameValue.Volt}</span> , 
           high: <InputText style={combineCss.CSSFC_01_Charger_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Charger_Voltage} onChange={handleInputChangeFC_01_Charger_Voltage} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSFC_01_Charger_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Charger_Voltage} onChange={handleInputChange2FC_01_Charger_Voltage} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFC_01_Charger_Voltage}
           checked={maintainFC_01_Charger_Voltage}
       ></Checkbox>
  
          },

          {
            mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Temperature} >{FC01_Conn_STT}</span>,
    name: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>Temperature</span> ,
    
    modbus: <span style={combineCss.CSSFC_01_Current_Values_Temperature}>7621	 </span> ,
    
    value: <span style={combineCss.CSSFC_01_Current_Values_Temperature} > {FC_01_Current_Values_Temperature} {nameValue.C}</span> , 
    high: <InputText style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Temperature} onChange={handleInputChangeFC_01_Current_Values_Temperature} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSFC_01_Current_Values_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Temperature} onChange={handleInputChange2FC_01_Current_Values_Temperature} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFC_01_Current_Values_Temperature}
    checked={maintainFC_01_Current_Values_Temperature}
    ></Checkbox>
    
    },


         {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} >{FC01_Conn_STT}</span>,
         name: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}> Gross Volume Accumulated</span> ,

         modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>7615	 </span> ,

        value: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} > {FC_01_Accumulated_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
         high: <InputText style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainFC_01_Accumulated_Values_Uncorrected_Volume}
         checked={maintainFC_01_Accumulated_Values_Uncorrected_Volume}
     ></Checkbox>

        },

          {
                mainCategory: mainCategoryFC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} >{FC01_Conn_STT}</span>,
          name: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>Standard Volume Accumulated</span> ,
 
          modbus: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume}>7617	 </span> ,
 
         value: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} > {FC_01_Accumulated_Values_Volume} {nameValue.Sm3}</span> , 
          high: <InputText style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Accumulated_Values_Volume} onChange={handleInputChangeFC_01_Accumulated_Values_Volume} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSFC_01_Accumulated_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Accumulated_Values_Volume} onChange={handleInputChange2FC_01_Accumulated_Values_Volume} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainFC_01_Accumulated_Values_Volume}
          checked={maintainFC_01_Accumulated_Values_Volume}
      ></Checkbox>
 
         },
        

         {
            mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} >{FC01_Conn_STT}</span>,
  name: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>Gross Volume Flow</span> ,

  modbus: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>7625	 </span> ,

 value: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} > {FC_01_Current_Values_Uncorrected_Flow_Rate} {nameValue.m3h} </span> , 
  high: <InputText style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainFC_01_Current_Values_Uncorrected_Flow_Rate}
  checked={maintainFC_01_Current_Values_Uncorrected_Flow_Rate}
></Checkbox>

 },


       {
                mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} >{FC01_Conn_STT}</span>,
       name: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>Standard Volume Flow</span> ,

       modbus: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate}>7623	 </span> ,

      value: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} > {FC_01_Current_Values_Flow_Rate} {nameValue.Sm3h}</span> , 
       high: <InputText style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Flow_Rate} onChange={handleInputChangeFC_01_Current_Values_Flow_Rate} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSFC_01_Current_Values_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Flow_Rate} onChange={handleInputChange2FC_01_Current_Values_Flow_Rate} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainFC_01_Current_Values_Flow_Rate}
       checked={maintainFC_01_Current_Values_Flow_Rate}
   ></Checkbox>

      },




 {
        mainCategory: mainCategoryFC.EVC01,
    
    timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} >{FC01_Conn_STT}</span>,
 name: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>Input Pressure</span> ,

 modbus: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure}>7619	 </span> ,

value: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} > {FC_01_Current_Values_Static_Pressure} {nameValue.Bara}</span> , 
 high: <InputText style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Current_Values_Static_Pressure} onChange={handleInputChangeFC_01_Current_Values_Static_Pressure} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSFC_01_Current_Values_Static_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Current_Values_Static_Pressure} onChange={handleInputChange2FC_01_Current_Values_Static_Pressure} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainFC_01_Current_Values_Static_Pressure}
 checked={maintainFC_01_Current_Values_Static_Pressure}
></Checkbox>

},





     {
                mainCategory: mainCategoryFC.EVC01,
        
        timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Volume} >{FC01_Conn_STT}</span>,
     name: <span style={combineCss.CSSFC_01_Today_Values_Volume}> Standard Volume Vb Today</span> ,

     modbus: <span style={combineCss.CSSFC_01_Today_Values_Volume}>7627	 </span> ,

    value: <span style={combineCss.CSSFC_01_Today_Values_Volume} > {FC_01_Today_Values_Volume} {nameValue.Sm3}</span> , 
     high: <InputText style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Volume} onChange={handleInputChangeFC_01_Today_Values_Volume} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSFC_01_Today_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Volume} onChange={handleInputChange2FC_01_Today_Values_Volume} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

    modbus: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}>7629	 </span> ,

   value: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} > {FC_01_Today_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
    high: <InputText style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Today_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Today_Values_Uncorrected_Volume} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

 modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>7631	 </span> ,

value: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} > {FC_01_Yesterday_Values_Volume} {nameValue.Sm3}</span> , 
 high: <InputText style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Volume} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSFC_01_Yesterday_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Volume} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>7633	 </span> ,

value: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} > {FC_01_Yesterday_Values_Uncorrected_Volume} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChangeFC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_01_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChange2FC_01_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainFC_01_Yesterday_Values_Uncorrected_Volume}
checked={maintainFC_01_Yesterday_Values_Uncorrected_Volume}
></Checkbox>

},

          ]


          const dataEVC02 = [


            
      {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} >{EVC02_Conn_STT}</span>,
      name: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>Remain Battery</span> ,

      modbus: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}>40001	 </span> ,

     value: <span style={combineCss.CSSEVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span> , 
      high: <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSEVC_02_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainEVC_02_Remain_Battery_Service_Life}
      checked={maintainEVC_02_Remain_Battery_Service_Life}
  ></Checkbox>

     },



     {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Temperature} >{EVC02_Conn_STT}</span>,
     name: <span style={combineCss.CSSEVC_02_Temperature}>Temperature</span> ,

     modbus: <span style={combineCss.CSSEVC_02_Temperature}>40850	 </span> ,

    value: <span style={combineCss.CSSEVC_02_Temperature} > {EVC_02_Temperature} {nameValue.C}</span> , 
     high: <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSEVC_02_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainEVC_02_Temperature}
     checked={maintainEVC_02_Temperature}
 ></Checkbox>

    },


    {
                mainCategory: mainCategoryFC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC02_Conn_STT}</span>,
    name: <span style={combineCss.CSSEVC_02_Pressure}>Input Pressure</span> ,

    modbus: <span style={combineCss.CSSEVC_02_Pressure}>40852	 </span> ,

   value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
    high: <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSEVC_02_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_02_Pressure}
    checked={maintainEVC_02_Pressure}
></Checkbox>

   },

   {
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>SVF</span> ,

modbus: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}>40858	 </span> ,

value: <span style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Volume_at_Measurement_Condition}
checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

},
   {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} >{EVC02_Conn_STT}</span>,
   name: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>SVA</span> ,

   modbus: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition}>40854	 </span> ,

  value: <span style={combineCss.CSSEVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
   high: <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSEVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainEVC_02_Volume_at_Base_Condition}
   checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

  },



 

{
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>GVA</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day}>40856	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Last_Day} > {EVC_02_Vm_of_Last_Day} {nameValue.m3h}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vm_of_Last_Day}
checked={maintainEVC_02_Vm_of_Last_Day}
></Checkbox>

},

  {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} >{EVC02_Conn_STT}</span>,
  name: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>GVF</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition}>40860	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Flow_at_Base_Condition}
  checked={maintainEVC_02_Flow_at_Base_Condition}
></Checkbox>

 },

 {
    mainCategory: mainCategoryFC.EVC02,

timeUpdate: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>Vb Today</span> ,

modbus: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}>40862	 </span> ,

value: <span style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Condition} {nameValue.Sm3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Flow_at_Measurement_Condition}
checked={maintainEVC_02_Flow_at_Measurement_Condition}
></Checkbox>

},




{
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} >{EVC02_Conn_STT}</span>,
  name: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>Vm Today</span> ,

  modbus: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day}>40864	 </span> ,

 value: <span style={combineCss.CSSEVC_02_Vb_of_Current_Day} > {EVC_02_Vb_of_Current_Day} {nameValue.m3}</span> , 
  high: <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainEVC_02_Vb_of_Current_Day}
  checked={maintainEVC_02_Vb_of_Current_Day}
></Checkbox>

 },


 {
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} >{EVC02_Conn_STT}</span>,
 name: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>Vb Yesterday</span> ,

 modbus: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day}>40866	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vm_of_Current_Day} > {EVC_02_Vm_of_Current_Day} {nameValue.Sm3}</span> , 
 high: <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSEVC_02_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Vm_of_Current_Day}
 checked={maintainEVC_02_Vm_of_Current_Day}
></Checkbox>

},


{
                mainCategory: mainCategoryFC.EVC02,
    
    timeUpdate: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} >{EVC02_Conn_STT}</span>,
name: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>Vm Yesterday</span> ,

modbus: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day}>40868	 </span> ,

value: <span style={combineCss.CSSEVC_02_Vb_of_Last_Day} > {EVC_02_Vb_of_Last_Day} {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEVC_02_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainEVC_02_Vb_of_Last_Day}
checked={maintainEVC_02_Vb_of_Last_Day}
></Checkbox>

},
          ]
          const combinedData = [...dataEVC01,...dataEVC02, ];

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
        EVC_01_Battery_Expiration_Date: "EVC-1101 Battery Expiration Date",
        EVC_01_Battery_Installation_Date: "EVC-1101 Battery Installation Date",

        EVC_02_Battery_Expiration_Date: "EVC-1102 Battery Expiration Date",
        EVC_02_Battery_Installation_Date: "EVC-1102 Battery Installation Date"

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
                <InputText
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
                <Button
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
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
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
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>PSV-1101 {namePCV_PSV.safety} (BarG)</span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputPSV_01}
                    onChange={handleInputPSV_01}
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
             Name: <span style={combineCssAttribute.PCV}>IOT getway phone number </span>,

            Value: (
                <InputText
                    style={combineCssAttribute.PCV}
                    placeholder="High"
                    step="0.1"
                    type="Name"
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
                    inputMode="decimal"
                />
            ),

            Update:    <Button
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

        {
            Name: (
                <span style={combineCssTime.PCV}>
                    {ConfigurationsName.EVC_02_Battery_Installation_Date}
                </span>
            ),
          
            Value: (
                <Calendar
                    style={combineCssTime.PCV}
                    value={date3}
                    onChange={handleDateChange2}

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
                    {ConfigurationsName.EVC_02_Battery_Expiration_Date}
                </span>
            ),
          
         
            Value: (
                <Calendar
                
                    style={combineCssTime.PCV}
                    value={date4}
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


    <DataTable      size={"small"}
                value={combinedData}
                rowGroupMode="subheader"
                groupRowsBy="mainCategory"
                sortMode="single"
                sortOrder={1}
                rowGroupHeaderTemplate={mainCategoryTemplate}   >
  {/* <Column field="modbus" header="Modbus" /> */}
  <Column field="timeUpdate" header="Time Update" />

  <Column field="modbus" header="Modbus" />

  <Column field="name" header="Name" />

  <Column field="value" header="Value" />
  <Column  field="high" header="High" />
  <Column field="low" header="Low" />
  <Column field="Maintain" header="Maintain" />
  <Column field="update" header="Update" />

</DataTable>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - Configurations </h4>
                <DataTable value={Configurations} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    <Column field="Update" header="Update" />
                </DataTable>
            </div>
</div>

<br />
<br />

</div>
  )
}
