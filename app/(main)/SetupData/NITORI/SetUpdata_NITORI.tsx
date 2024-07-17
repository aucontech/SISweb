import React, { useEffect, useRef, useState } from 'react'
import { id_NITORI } from '../../data-table-device/ID-DEVICE/IdDevice';
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
export default function SetUpdata_NITORI() {

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
    useEffect(() => {

        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_NITORI,
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
                                id: id_NITORI,
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

                    
                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,
                        DI_MAP_1: setDI_MAP_1,

                        DI_SD_1: setDI_SD_1,

                        DI_UPS_BATTERY: setDI_UPS_BATTERY,
                        DI_UPS_CHARGING: setDI_UPS_CHARGING,
                        DI_UPS_ALARM: setDI_UPS_ALARM,
                        UPS_Mode: setUPS_Mode,

                        DI_SELECT_SW: setDI_SELECT_SW,
                        DI_RESET: setDI_RESET,

                        Emergency_NO: setEmergency_NO,
                        Emergency_NC: setEmergency_NC,


                        DO_HR_01: setDO_HR_01,
                        DO_BC_01: setDO_BC_01,
                        DO_SV_01: setDO_SV_01,


                  
                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
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
                `/plugins/telemetry/DEVICE/${id_NITORI}/values/attributes/SERVER_SCOPE`
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
 // =================================================================================================================== 



            

            setMaintainEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Maintain?.value || false);




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

            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
const [audioPlayingEVC_01_Remain_Battery_Service_Life, setAudioPlayingEVC_01_Remain_Battery_Service_Life] = useState(false);
const [inputValueEVC_01_Remain_Battery_Service_Life, setInputValueEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_01_Remain_Battery_Service_Life, setInputValue2EVC_01_Remain_Battery_Service_Life] = useState<any>();
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
                    if (!audioPlayingEVC_01_Remain_Battery_Service_Life) {
                        audioRef.current?.play();
                        setAudioPlayingEVC_01_Remain_Battery_Service_Life(true);
                        setExceedThresholdEVC_01_Remain_Battery_Service_Life(true);
                    }
                } else {
                    setAudioPlayingEVC_01_Remain_Battery_Service_Life(false);
                    setExceedThresholdEVC_01_Remain_Battery_Service_Life(false);
                }
            } 
        } 
    }, [EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life, audioPlayingEVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_Low,maintainEVC_01_Remain_Battery_Service_Life]);

    useEffect(() => {
        if (audioPlayingEVC_01_Remain_Battery_Service_Life) {
            const audioEnded = () => {
                setAudioPlayingEVC_01_Remain_Battery_Service_Life(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingEVC_01_Remain_Battery_Service_Life]);

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
                `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
     const [exceedThresholdTemperature, setExceedThresholdTemperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof EVC_01_Temperature_High === 'string' && typeof EVC_01_Temperature_Low === 'string' && EVC_01_Temperature !== null && maintainEVC_01_Temperature === false
             ) {
                 const highValue = parseFloat(EVC_01_Temperature_High);
                 const lowValue = parseFloat(EVC_01_Temperature_Low);
                 const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_TemperatureValue)) {
                     if (highValue <= EVC_01_TemperatureValue || EVC_01_TemperatureValue <= lowValue) {
                         if (!audioPlayingEVC_01_Temperature) {
                             audioRef.current?.play();
                             setAudioPlayingEVC_01_Temperature(true);
                             setExceedThresholdTemperature(true);
                         }
                     } else {
                        setAudioPlayingEVC_01_Temperature(false);
                         setExceedThresholdTemperature(false);
                     }
                 } 
             } 
         }, [EVC_01_Temperature_High, EVC_01_Temperature, audioPlayingEVC_01_Temperature, EVC_01_Temperature_Low,maintainEVC_01_Temperature]);
     
         useEffect(() => {
             if (audioPlayingEVC_01_Temperature) {
                 const audioEnded = () => {
                    setAudioPlayingEVC_01_Temperature(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingEVC_01_Temperature]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
             if (typeof EVC_01_Pressure_High === 'string' && typeof EVC_01_Pressure_Low === 'string' && EVC_01_Pressure !== null && maintainEVC_01_Pressure === false
             ) {
                 const highValue = parseFloat(EVC_01_Pressure_High);
                 const lowValue = parseFloat(EVC_01_Pressure_Low);
                 const EVC_01_PressureValue = parseFloat(EVC_01_Pressure);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_PressureValue)) {
                     if (highValue <= EVC_01_PressureValue || EVC_01_PressureValue <= lowValue) {
                         if (!audioPlayingEVC_01_Pressure) {
                             audioRef.current?.play();
                             setAudioPlayingEVC_01_Pressure(true);
                             setExceedThresholdEVC_01_Pressure(true);
                         }
                     } else {
                        setAudioPlayingEVC_01_Pressure(false);
                        setExceedThresholdEVC_01_Pressure(false);
                     }
                 } 
             } 
         }, [EVC_01_Pressure_High, EVC_01_Pressure, audioPlayingEVC_01_Pressure, EVC_01_Pressure_Low,maintainEVC_01_Pressure]);
     
         useEffect(() => {
             if (audioPlayingEVC_01_Pressure) {
                 const audioEnded = () => {
                    setAudioPlayingEVC_01_Pressure(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingEVC_01_Pressure]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof EVC_01_Volume_at_Base_Condition_High === 'string' && typeof EVC_01_Volume_at_Base_Condition_Low === 'string' && EVC_01_Volume_at_Base_Condition !== null && maintainEVC_01_Volume_at_Base_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Volume_at_Base_Condition_High);
                      const lowValue = parseFloat(EVC_01_Volume_at_Base_Condition_Low);
                      const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Base_ConditionValue)) {
                          if (highValue <= EVC_01_Volume_at_Base_ConditionValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Volume_at_Base_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Volume_at_Base_Condition(true);
                                  setExceedThresholdEVC_01_Volume_at_Base_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Volume_at_Base_Condition(false);
                             setExceedThresholdEVC_01_Volume_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition, audioPlayingEVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_Low,maintainEVC_01_Volume_at_Base_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Volume_at_Base_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Volume_at_Base_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Volume_at_Base_Condition]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof EVC_01_Volume_at_Measurement_Condition_High === 'string' && typeof EVC_01_Volume_at_Measurement_Condition_Low === 'string' && EVC_01_Volume_at_Measurement_Condition !== null && maintainEVC_01_Volume_at_Measurement_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Volume_at_Measurement_Condition_High);
                      const lowValue = parseFloat(EVC_01_Volume_at_Measurement_Condition_Low);
                      const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Measurement_ConditionValue)) {
                          if (highValue <= EVC_01_Volume_at_Measurement_ConditionValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Volume_at_Measurement_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Volume_at_Measurement_Condition(true);
                                  setExceedThresholdEVC_01_Volume_at_Measurement_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Volume_at_Measurement_Condition(false);
                             setExceedThresholdEVC_01_Volume_at_Measurement_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition, audioPlayingEVC_01_Volume_at_Measurement_Condition , EVC_01_Volume_at_Measurement_Condition_Low,maintainEVC_01_Volume_at_Measurement_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Volume_at_Measurement_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Volume_at_Measurement_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Volume_at_Measurement_Condition]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof EVC_01_Flow_at_Base_Condition_High === 'string' && typeof EVC_01_Flow_at_Base_Condition_Low === 'string' && EVC_01_Flow_at_Base_Condition !== null && maintainEVC_01_Flow_at_Base_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Flow_at_Base_Condition_High);
                      const lowValue = parseFloat(EVC_01_Flow_at_Base_Condition_Low);
                      const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Base_ConditionValue)) {
                          if (highValue <= EVC_01_Flow_at_Base_ConditionValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Flow_at_Base_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Flow_at_Base_Condition(true);
                                  setExceedThresholdEVC_01_Flow_at_Base_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Flow_at_Base_Condition(false);
                             setExceedThresholdEVC_01_Flow_at_Base_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition, audioPlayingEVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_Low,maintainEVC_01_Flow_at_Base_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Flow_at_Base_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Flow_at_Base_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Flow_at_Base_Condition]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Base_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vm_of_Current_Day, setAudioPlayingEVC_01_Vm_of_Current_Day] = useState(false);
          const [inputValueEVC_01_Vm_of_Current_Day, setInputValueEVC_01_Vm_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vm_of_Current_Day, setInputValue2EVC_01_Vm_of_Current_Day] = useState<any>();
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
                              if (!audioPlayingEVC_01_Vm_of_Current_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vm_of_Current_Day(true);
                                  setExceedThresholdEVC_01_Vm_of_Current_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vm_of_Current_Day(false);
                             setExceedThresholdEVC_01_Vm_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day, audioPlayingEVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_Low,maintainEVC_01_Vm_of_Current_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vm_of_Current_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vm_of_Current_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vm_of_Current_Day]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
                          { EVC_01_Vm_of_Current_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vm_of_Current_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vb_of_Current_Day, setAudioPlayingEVC_01_Vb_of_Current_Day] = useState(false);
          const [inputValueEVC_01_Vb_of_Current_Day, setInputValueEVC_01_Vb_of_Current_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Current_Day, setInputValue2EVC_01_Vb_of_Current_Day] = useState<any>();
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
                              if (!audioPlayingEVC_01_Vb_of_Current_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vb_of_Current_Day(true);
                                  setExceedThresholdEVC_01_Vb_of_Current_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vb_of_Current_Day(false);
                             setExceedThresholdEVC_01_Vb_of_Current_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day, audioPlayingEVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_Low,maintainEVC_01_Vb_of_Current_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vb_of_Current_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vb_of_Current_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vb_of_Current_Day]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof EVC_01_Flow_at_Measurement_Condition_High === 'string' && typeof EVC_01_Flow_at_Measurement_Condition_Low === 'string' && EVC_01_Flow_at_Measurement_Condition !== null && maintainEVC_01_Flow_at_Measurement_Condition === false
                  ) {
                      const highValue = parseFloat(EVC_01_Flow_at_Measurement_Condition_High);
                      const lowValue = parseFloat(EVC_01_Flow_at_Measurement_Condition_Low);
                      const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Measurement_ConditionValue)) {
                          if (highValue <= EVC_01_Flow_at_Measurement_ConditionValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue) {
                              if (!audioPlayingEVC_01_Flow_at_Measurement_Condition) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Flow_at_Measurement_Condition(true);
                                  setExceedThresholdEVC_01_Flow_at_Measurement_Condition(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Flow_at_Measurement_Condition(false);
                             setExceedThresholdEVC_01_Flow_at_Measurement_Condition(false);
                          }
                      } 
                  } 
              }, [EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition, audioPlayingEVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_Low,maintainEVC_01_Flow_at_Measurement_Condition]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Flow_at_Measurement_Condition) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Flow_at_Measurement_Condition(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Flow_at_Measurement_Condition]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
                          { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
                      );
                      setMaintainEVC_01_Flow_at_Measurement_Condition(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
          const [audioPlayingEVC_01_Vb_of_Last_Day, setAudioPlayingEVC_01_Vb_of_Last_Day] = useState(false);
          const [inputValueEVC_01_Vb_of_Last_Day, setInputValueEVC_01_Vb_of_Last_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Last_Day, setInputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
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
                              if (!audioPlayingEVC_01_Vb_of_Last_Day) {
                                  audioRef.current?.play();
                                  setAudioPlayingEVC_01_Vb_of_Last_Day(true);
                                  setExceedThresholdEVC_01_Vb_of_Last_Day(true);
                              }
                          } else {
                             setAudioPlayingEVC_01_Vb_of_Last_Day(false);
                             setExceedThresholdEVC_01_Vb_of_Last_Day(false);
                          }
                      } 
                  } 
              }, [EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day, audioPlayingEVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low,maintainEVC_01_Vb_of_Last_Day]);
          
              useEffect(() => {
                  if (audioPlayingEVC_01_Vb_of_Last_Day) {
                      const audioEnded = () => {
                         setAudioPlayingEVC_01_Vb_of_Last_Day(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingEVC_01_Vb_of_Last_Day]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
            if (typeof EVC_01_Vm_of_Last_Day_High === 'string' && typeof EVC_01_Vm_of_Last_Day_Low === 'string' && EVC_01_Vm_of_Last_Day !== null && maintainEVC_01_Vm_of_Last_Day === false
            ) {
                const highValue = parseFloat(EVC_01_Vm_of_Last_Day_High);
                const lowValue = parseFloat(EVC_01_Vm_of_Last_Day_Low);
                const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Last_DayValue)) {
                    if (highValue <= EVC_01_Vm_of_Last_DayValue || EVC_01_Vm_of_Last_DayValue <= lowValue) {
                        if (!audioPlayingEVC_01_Vm_of_Last_Day) {
                            audioRef.current?.play();
                            setAudioPlayingEVC_01_Vm_of_Last_Day(true);
                            setExceedThresholdEVC_01_Vm_of_Last_Day(true);
                        }
                    } else {
                       setAudioPlayingEVC_01_Vm_of_Last_Day(false);
                       setExceedThresholdEVC_01_Vm_of_Last_Day(false);
                    }
                } 
            } 
        }, [EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day, audioPlayingEVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low,maintainEVC_01_Vm_of_Last_Day]);
    
        useEffect(() => {
            if (audioPlayingEVC_01_Vm_of_Last_Day) {
                const audioEnded = () => {
                   setAudioPlayingEVC_01_Vm_of_Last_Day(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingEVC_01_Vm_of_Last_Day]);
    
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
                    `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
                    { EVC_01_Vm_of_Last_Day_Maintain: newValue }
                );
                setMaintainEVC_01_Vm_of_Last_Day(newValue);
                
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
          if (typeof GD1_High === 'string' && typeof GD1_Low === 'string' && GD1 !== null && maintainGD1 === false
          ) {
              const highValue = parseFloat(GD1_High);
              const lowValue = parseFloat(GD1_Low);
              const GD1Value = parseFloat(GD1);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1Value)) {
                  if (highValue <= GD1Value || GD1Value <= lowValue) {
                      if (!audioPlayingGD1) {
                          audioRef.current?.play();
                          setAudioPlayingGD1(true);
                          setExceedThresholdGD1(true);
                      }
                  } else {
                     setAudioPlayingGD1(false);
                     setExceedThresholdGD1(false);
                  }
              } 
          } 
      }, [GD1_High, GD1, audioPlayingGD1, GD1_Low,maintainGD1]);
  
      useEffect(() => {
          if (audioPlayingGD1) {
              const audioEnded = () => {
                 setAudioPlayingGD1(false);
              };
              audioRef.current?.addEventListener('ended', audioEnded);
              return () => {
                  audioRef.current?.removeEventListener('ended', audioEnded);
              };
          }
      }, [audioPlayingGD1]);
  
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
                  `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
               if (typeof GD2_High === 'string' && typeof GD2_Low === 'string' && GD2 !== null && maintainGD2 === false
               ) {
                   const highValue = parseFloat(GD2_High);
                   const lowValue = parseFloat(GD2_Low);
                   const GD2Value = parseFloat(GD2);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2Value)) {
                       if (highValue <= GD2Value || GD2Value <= lowValue) {
                           if (!audioPlayingGD2) {
                               audioRef.current?.play();
                               setAudioPlayingGD2(true);
                               setExceedThresholdGD2(true);
                           }
                       } else {
                          setAudioPlayingGD2(false);
                          setExceedThresholdGD2(false);
                       }
                   } 
               } 
           }, [GD2_High, GD2, audioPlayingGD2, GD2_Low,maintainGD2]);
       
           useEffect(() => {
               if (audioPlayingGD2) {
                   const audioEnded = () => {
                      setAudioPlayingGD2(false);
                   };
                   audioRef.current?.addEventListener('ended', audioEnded);
                   return () => {
                       audioRef.current?.removeEventListener('ended', audioEnded);
                   };
               }
           }, [audioPlayingGD2]);
       
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
               if (typeof PT1_High === 'string' && typeof PT1_Low === 'string' && PT1 !== null && maintainPT1 === false
               ) {
                   const highValue = parseFloat(PT1_High);
                   const lowValue = parseFloat(PT1_Low);
                   const PT1Value = parseFloat(PT1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT1Value)) {
                       if (highValue <= PT1Value || PT1Value <= lowValue) {
                           if (!audioPlayingPT1) {
                               audioRef.current?.play();
                               setAudioPlayingPT1(true);
                               setExceedThresholdPT1(true);
                           }
                       } else {
                          setAudioPlayingPT1(false);
                          setExceedThresholdPT1(false);
                       }
                   } 
               } 
           }, [PT1_High, PT1, audioPlayingPT1 , PT1_Low,maintainPT1]);
       
           useEffect(() => {
               if (audioPlayingPT1) {
                   const audioEnded = () => {
                      setAudioPlayingPT1(false);
                   };
                   audioRef.current?.addEventListener('ended', audioEnded);
                   return () => {
                       audioRef.current?.removeEventListener('ended', audioEnded);
                   };
               }
           }, [audioPlayingPT1]);
       
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
               if (typeof DI_ZSO_1_High === 'string' && typeof DI_ZSO_1_Low === 'string' && DI_ZSO_1 !== null && maintainDI_ZSO_1 === false
               ) {
                   const highValue = parseFloat(DI_ZSO_1_High);
                   const lowValue = parseFloat(DI_ZSO_1_Low);
                   const DI_ZSO_1Value = parseFloat(DI_ZSO_1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSO_1Value)) {
                       if (highValue <= DI_ZSO_1Value || DI_ZSO_1Value <= lowValue) {
                           if (!audioPlayingDI_ZSO_1) {
                               audioRef.current?.play();
                               setAudioPlayingDI_ZSO_1(true);
                               setExceedThresholdDI_ZSO_1(true);
                           }
                       } else {
                          setAudioPlayingDI_ZSO_1(false);
                          setExceedThresholdDI_ZSO_1(false);
                       }
                   } 
               } 
           }, [DI_ZSO_1_High, DI_ZSO_1, audioPlayingDI_ZSO_1, DI_ZSO_1_Low,maintainDI_ZSO_1]);
       
           useEffect(() => {
               if (audioPlayingDI_ZSO_1) {
                   const audioEnded = () => {
                      setAudioPlayingDI_ZSO_1(false);
                   };
                   audioRef.current?.addEventListener('ended', audioEnded);
                   return () => {
                       audioRef.current?.removeEventListener('ended', audioEnded);
                   };
               }
           }, [audioPlayingDI_ZSO_1]);
       
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
               if (typeof DI_ZSO_2_High === 'string' && typeof DI_ZSO_2_Low === 'string' && DI_ZSO_2 !== null && maintainDI_ZSO_2 === false
               ) {
                   const highValue = parseFloat(DI_ZSO_2_High);
                   const lowValue = parseFloat(DI_ZSO_2_Low);
                   const DI_ZSO_2Value = parseFloat(DI_ZSO_2);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSO_2Value)) {
                       if (highValue <= DI_ZSO_2Value || DI_ZSO_2Value <= lowValue) {
                           if (!audioPlayingDI_ZSO_2) {
                               audioRef.current?.play();
                               setAudioPlayingDI_ZSO_2(true);
                               setExceedThresholdDI_ZSO_2(true);
                           }
                       } else {
                          setAudioPlayingDI_ZSO_2(false);
                          setExceedThresholdDI_ZSO_2(false);
                       }
                   } 
               } 
           }, [DI_ZSO_2_High, DI_ZSO_2, audioPlayingDI_ZSO_2, DI_ZSO_2_Low,maintainDI_ZSO_2]);
       
           useEffect(() => {
               if (audioPlayingDI_ZSO_2) {
                   const audioEnded = () => {
                      setAudioPlayingDI_ZSO_2(false);
                   };
                   audioRef.current?.addEventListener('ended', audioEnded);
                   return () => {
                       audioRef.current?.removeEventListener('ended', audioEnded);
                   };
               }
           }, [audioPlayingDI_ZSO_2]);
       
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
               if (typeof DI_ZSC_1_High === 'string' && typeof DI_ZSC_1_Low === 'string' && DI_ZSC_1 !== null && maintainDI_ZSC_1 === false
               ) {
                   const highValue = parseFloat(DI_ZSC_1_High);
                   const lowValue = parseFloat(DI_ZSC_1_Low);
                   const DI_ZSC_1Value = parseFloat(DI_ZSC_1);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSC_1Value)) {
                       if (highValue <= DI_ZSC_1Value || DI_ZSC_1Value <= lowValue) {
                           if (!audioPlayingDI_ZSC_1) {
                               audioRef.current?.play();
                               setAudioPlayingDI_ZSC_1(true);
                               setExceedThresholdDI_ZSC_1(true);
                           }
                       } else {
                          setAudioPlayingDI_ZSC_1(false);
                          setExceedThresholdDI_ZSC_1(false);
                       }
                   } 
               } 
           }, [DI_ZSC_1_High, DI_ZSC_1, audioPlayingDI_ZSC_1, DI_ZSC_1_Low,maintainDI_ZSC_1]);
       
           useEffect(() => {
               if (audioPlayingDI_ZSC_1) {
                   const audioEnded = () => {
                      setAudioPlayingDI_ZSC_1(false);
                   };
                   audioRef.current?.addEventListener('ended', audioEnded);
                   return () => {
                       audioRef.current?.removeEventListener('ended', audioEnded);
                   };
               }
           }, [audioPlayingDI_ZSC_1]);
       
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                       `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
         if (typeof DI_MAP_1_High === 'string' && typeof DI_MAP_1_Low === 'string' && DI_MAP_1 !== null && maintainDI_MAP_1 === false
         ) {
             const highValue = parseFloat(DI_MAP_1_High);
             const lowValue = parseFloat(DI_MAP_1_Low);
             const DI_MAP_1Value = parseFloat(DI_MAP_1);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_MAP_1Value)) {
                 if (highValue <= DI_MAP_1Value || DI_MAP_1Value <= lowValue) {
                     if (!audioPlayingDI_MAP_1) {
                         audioRef.current?.play();
                         setAudioPlayingDI_MAP_1(true);
                         setExceedThresholdDI_MAP_1(true);
                     }
                 } else {
                    setAudioPlayingDI_MAP_1(false);
                    setExceedThresholdDI_MAP_1(false);
                 }
             } 
         } 
     }, [DI_MAP_1_High, DI_MAP_1, audioPlayingDI_MAP_1, DI_MAP_1_Low,maintainDI_MAP_1]);
 
     useEffect(() => {
         if (audioPlayingDI_MAP_1) {
             const audioEnded = () => {
                setAudioPlayingDI_MAP_1(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingDI_MAP_1]);
 
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
                 `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
             if (typeof DI_UPS_CHARGING_High === 'string' && typeof DI_UPS_CHARGING_Low === 'string' && DI_UPS_CHARGING !== null && maintainDI_UPS_CHARGING === false
             ) {
                 const highValue = parseFloat(DI_UPS_CHARGING_High);
                 const lowValue = parseFloat(DI_UPS_CHARGING_Low);
                 const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_CHARGINGValue)) {
                     if (highValue <= DI_UPS_CHARGINGValue || DI_UPS_CHARGINGValue <= lowValue) {
                         if (!audioPlayingDI_UPS_CHARGING) {
                             audioRef.current?.play();
                             setAudioPlayingDI_UPS_CHARGING(true);
                             setExceedThresholdDI_UPS_CHARGING(true);
                         }
                     } else {
                        setAudioPlayingDI_UPS_CHARGING(false);
                        setExceedThresholdDI_UPS_CHARGING(false);
                     }
                 } 
             } 
         }, [DI_UPS_CHARGING_High, DI_UPS_CHARGING, audioPlayingDI_UPS_CHARGING, DI_UPS_CHARGING_Low,maintainDI_UPS_CHARGING]);
     
         useEffect(() => {
             if (audioPlayingDI_UPS_CHARGING) {
                 const audioEnded = () => {
                    setAudioPlayingDI_UPS_CHARGING(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingDI_UPS_CHARGING]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
         if (typeof DI_UPS_ALARM_High === 'string' && typeof DI_UPS_ALARM_Low === 'string' && DI_UPS_ALARM !== null && maintainDI_UPS_ALARM === false
         ) {
             const highValue = parseFloat(DI_UPS_ALARM_High);
             const lowValue = parseFloat(DI_UPS_ALARM_Low);
             const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_ALARMValue)) {
                 if (highValue <= DI_UPS_ALARMValue || DI_UPS_ALARMValue <= lowValue) {
                     if (!audioPlayingDI_UPS_ALARM) {
                         audioRef.current?.play();
                         setAudioPlayingDI_UPS_ALARM(true);
                         setExceedThresholdDI_UPS_ALARM(true);
                     }
                 } else {
                    setAudioPlayingDI_UPS_ALARM(false);
                    setExceedThresholdDI_UPS_ALARM(false);
                 }
             } 
         } 
     }, [DI_UPS_ALARM_High, DI_UPS_ALARM, audioPlayingDI_UPS_ALARM, DI_UPS_ALARM_Low,maintainDI_UPS_ALARM]);
 
     useEffect(() => {
         if (audioPlayingDI_UPS_ALARM) {
             const audioEnded = () => {
                setAudioPlayingDI_UPS_ALARM(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingDI_UPS_ALARM]);
 
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
                 `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
         if (typeof DI_SD_1_High === 'string' && typeof DI_SD_1_Low === 'string' && DI_SD_1 !== null && maintainDI_SD_1 === false
         ) {
             const highValue = parseFloat(DI_SD_1_High);
             const lowValue = parseFloat(DI_SD_1_Low);
             const DI_SD_1Value = parseFloat(DI_SD_1);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SD_1Value)) {
                 if (highValue <= DI_SD_1Value || DI_SD_1Value <= lowValue) {
                     if (!audioPlayingDI_SD_1) {
                         audioRef.current?.play();
                         setAudioPlayingDI_SD_1(true);
                         setExceedThresholdDI_SD_1(true);
                     }
                 } else {
                    setAudioPlayingDI_SD_1(false);
                    setExceedThresholdDI_SD_1(false);
                 }
             } 
         } 
     }, [DI_SD_1_High, DI_SD_1, audioPlayingDI_SD_1, DI_SD_1_Low,maintainDI_SD_1]);
 
     useEffect(() => {
         if (audioPlayingDI_SD_1) {
             const audioEnded = () => {
                setAudioPlayingDI_SD_1(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingDI_SD_1]);
 
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
                 `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
     if (typeof DI_SELECT_SW_High === 'string' && typeof DI_SELECT_SW_Low === 'string' && DI_SELECT_SW !== null && maintainDI_SELECT_SW === false
     ) {
         const highValue = parseFloat(DI_SELECT_SW_High);
         const lowValue = parseFloat(DI_SELECT_SW_Low);
         const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SELECT_SWValue)) {
             if (highValue <= DI_SELECT_SWValue || DI_SELECT_SWValue <= lowValue) {
                 if (!audioPlayingDI_SELECT_SW) {
                     audioRef.current?.play();
                     setAudioPlayingDI_SELECT_SW(true);
                     setExceedThresholdDI_SELECT_SW(true);
                 }
             } else {
                setAudioPlayingDI_SELECT_SW(false);
                setExceedThresholdDI_SELECT_SW(false);
             }
         } 
     } 
 }, [DI_SELECT_SW_High, DI_SELECT_SW, audioPlayingDI_SELECT_SW, DI_SELECT_SW_Low,maintainDI_SELECT_SW]);

 useEffect(() => {
     if (audioPlayingDI_SELECT_SW) {
         const audioEnded = () => {
            setAudioPlayingDI_SELECT_SW(false);
         };
         audioRef.current?.addEventListener('ended', audioEnded);
         return () => {
             audioRef.current?.removeEventListener('ended', audioEnded);
         };
     }
 }, [audioPlayingDI_SELECT_SW]);

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
             `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
     if (typeof DI_RESET_High === 'string' && typeof DI_RESET_Low === 'string' && DI_RESET !== null && maintainDI_RESET === false
     ) {
         const highValue = parseFloat(DI_RESET_High);
         const lowValue = parseFloat(DI_RESET_Low);
         const DI_RESETValue = parseFloat(DI_RESET);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_RESETValue)) {
             if (highValue <= DI_RESETValue || DI_RESETValue <= lowValue) {
                 if (!audioPlayingDI_RESET) {
                     audioRef.current?.play();
                     setAudioPlayingDI_RESET(true);
                     setExceedThresholdDI_RESET(true);
                 }
             } else {
                setAudioPlayingDI_RESET(false);
                setExceedThresholdDI_RESET(false);
             }
         } 
     } 
 }, [DI_RESET_High, DI_RESET, audioPlayingDI_RESET, DI_RESET_Low,maintainDI_RESET]);

 useEffect(() => {
     if (audioPlayingDI_RESET) {
         const audioEnded = () => {
            setAudioPlayingDI_RESET(false);
         };
         audioRef.current?.addEventListener('ended', audioEnded);
         return () => {
             audioRef.current?.removeEventListener('ended', audioEnded);
         };
     }
 }, [audioPlayingDI_RESET]);

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
             `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
 if (typeof Emergency_NO_High === 'string' && typeof Emergency_NO_Low === 'string' && Emergency_NO !== null && maintainEmergency_NO === false
 ) {
     const highValue = parseFloat(Emergency_NO_High);
     const lowValue = parseFloat(Emergency_NO_Low);
     const Emergency_NOValue = parseFloat(Emergency_NO);

     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NOValue)) {
         if (highValue <= Emergency_NOValue || Emergency_NOValue <= lowValue) {
             if (!audioPlayingEmergency_NO) {
                 audioRef.current?.play();
                 setAudioPlayingEmergency_NO(true);
                 setExceedThresholdEmergency_NO(true);
             }
         } else {
            setAudioPlayingEmergency_NO(false);
            setExceedThresholdEmergency_NO(false);
         }
     } 
 } 
}, [Emergency_NO_High, Emergency_NO, audioPlayingEmergency_NO, Emergency_NO_Low,maintainEmergency_NO]);

useEffect(() => {
 if (audioPlayingEmergency_NO) {
     const audioEnded = () => {
        setAudioPlayingEmergency_NO(false);
     };
     audioRef.current?.addEventListener('ended', audioEnded);
     return () => {
         audioRef.current?.removeEventListener('ended', audioEnded);
     };
 }
}, [audioPlayingEmergency_NO]);

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
         `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
             if (typeof DI_UPS_BATTERY_High === 'string' && typeof DI_UPS_BATTERY_Low === 'string' && DI_UPS_BATTERY !== null && maintainDI_UPS_BATTERY === false
             ) {
                 const highValue = parseFloat(DI_UPS_BATTERY_High);
                 const lowValue = parseFloat(DI_UPS_BATTERY_Low);
                 const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_BATTERYValue)) {
                     if (highValue <= DI_UPS_BATTERYValue || DI_UPS_BATTERYValue <= lowValue) {
                         if (!audioPlayingDI_UPS_BATTERY) {
                             audioRef.current?.play();
                             setAudioPlayingDI_UPS_BATTERY(true);
                             setExceedThresholdDI_UPS_BATTERY(true);
                         }
                     } else {
                        setAudioPlayingDI_UPS_BATTERY(false);
                        setExceedThresholdDI_UPS_BATTERY(false);
                     }
                 } 
             } 
         }, [DI_UPS_BATTERY_High, DI_UPS_BATTERY, audioPlayingDI_UPS_BATTERY, DI_UPS_BATTERY_Low,maintainDI_UPS_BATTERY]);
     
         useEffect(() => {
             if (audioPlayingDI_UPS_BATTERY) {
                 const audioEnded = () => {
                    setAudioPlayingDI_UPS_BATTERY(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingDI_UPS_BATTERY]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
             if (typeof Emergency_NC_High === 'string' && typeof Emergency_NC_Low === 'string' && Emergency_NC !== null && maintainEmergency_NC === false
             ) {
                 const highValue = parseFloat(Emergency_NC_High);
                 const lowValue = parseFloat(Emergency_NC_Low);
                 const Emergency_NCValue = parseFloat(Emergency_NC);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NCValue)) {
                     if (highValue <= Emergency_NCValue || Emergency_NCValue <= lowValue) {
                         if (!audioPlayingEmergency_NC) {
                             audioRef.current?.play();
                             setAudioPlayingEmergency_NC(true);
                             setExceedThresholdEmergency_NC(true);
                         }
                     } else {
                        setAudioPlayingEmergency_NC(false);
                        setExceedThresholdEmergency_NC(false);
                     }
                 } 
             } 
         }, [Emergency_NC_High, Emergency_NC, audioPlayingEmergency_NC, Emergency_NC_Low,maintainEmergency_NC]);
     
         useEffect(() => {
             if (audioPlayingEmergency_NC) {
                 const audioEnded = () => {
                    setAudioPlayingEmergency_NC(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingEmergency_NC]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
         if (typeof UPS_Mode_High === 'string' && typeof UPS_Mode_Low === 'string' && UPS_Mode !== null && maintainUPS_Mode === false
         ) {
             const highValue = parseFloat(UPS_Mode_High);
             const lowValue = parseFloat(UPS_Mode_Low);
             const UPS_ModeValue = parseFloat(UPS_Mode);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UPS_ModeValue)) {
                 if (highValue <= UPS_ModeValue || UPS_ModeValue <= lowValue) {
                     if (!audioPlayingUPS_Mode) {
                         audioRef.current?.play();
                         setAudioPlayingUPS_Mode(true);
                         setExceedThresholdUPS_Mode(true);
                     }
                 } else {
                    setAudioPlayingUPS_Mode(false);
                    setExceedThresholdUPS_Mode(false);
                 }
             } 
         } 
     }, [UPS_Mode_High, UPS_Mode, audioPlayingUPS_Mode, UPS_Mode_Low,maintainUPS_Mode]);
     
     useEffect(() => {
         if (audioPlayingUPS_Mode) {
             const audioEnded = () => {
                setAudioPlayingUPS_Mode(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingUPS_Mode]);
     
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
                 `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
             if (typeof DO_HR_01_High === 'string' && typeof DO_HR_01_Low === 'string' && DO_HR_01 !== null && maintainDO_HR_01 === false
             ) {
                 const highValue = parseFloat(DO_HR_01_High);
                 const lowValue = parseFloat(DO_HR_01_Low);
                 const DO_HR_01Value = parseFloat(DO_HR_01);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_HR_01Value)) {
                     if (highValue <= DO_HR_01Value || DO_HR_01Value <= lowValue) {
                         if (!audioPlayingDO_HR_01) {
                             audioRef.current?.play();
                             setAudioPlayingDO_HR_01(true);
                             setExceedThresholdDO_HR_01(true);
                         }
                     } else {
                        setAudioPlayingDO_HR_01(false);
                         setExceedThresholdDO_HR_01(false);
                     }
                 } 
             } 
         }, [DO_HR_01_High, DO_HR_01, audioPlayingDO_HR_01, DO_HR_01_Low,maintainDO_HR_01]);
     
         useEffect(() => {
             if (audioPlayingDO_HR_01) {
                 const audioEnded = () => {
                    setAudioPlayingDO_HR_01(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingDO_HR_01]);
     
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
                     `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof DO_BC_01_High === 'string' && typeof DO_BC_01_Low === 'string' && DO_BC_01 !== null && maintainDO_BC_01 === false
                  ) {
                      const highValue = parseFloat(DO_BC_01_High);
                      const lowValue = parseFloat(DO_BC_01_Low);
                      const DO_BC_01Value = parseFloat(DO_BC_01);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_BC_01Value)) {
                          if (highValue <= DO_BC_01Value || DO_BC_01Value <= lowValue) {
                              if (!audioPlayingDO_BC_01) {
                                  audioRef.current?.play();
                                  setAudioPlayingDO_BC_01(true);
                                  setExceedThresholdDO_BC_01(true);
                              }
                          } else {
                             setAudioPlayingDO_BC_01(false);
                             setExceedThresholdDO_BC_01(false);
                          }
                      } 
                  } 
              }, [DO_BC_01_High, DO_BC_01, audioPlayingDO_BC_01, DO_BC_01_Low,maintainDO_BC_01]);
          
              useEffect(() => {
                  if (audioPlayingDO_BC_01) {
                      const audioEnded = () => {
                         setAudioPlayingDO_BC_01(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingDO_BC_01]);
          
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
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
                  if (typeof DO_SV_01_High === 'string' && typeof DO_SV_01_Low === 'string' && DO_SV_01 !== null && maintainDO_SV_01 === false
                  ) {
                      const highValue = parseFloat(DO_SV_01_High);
                      const lowValue = parseFloat(DO_SV_01_Low);
                      const DO_SV_01Value = parseFloat(DO_SV_01);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_SV_01Value)) {
                          if (highValue <= DO_SV_01Value || DO_SV_01Value <= lowValue) {
                              if (!audioPlayingDO_SV_01) {
                                  audioRef.current?.play();
                                  setAudioPlayingDO_SV_01(true);
                                  setExceedThresholdDO_SV_01(true);
                              }
                          } else {
                             setAudioPlayingDO_SV_01(false);
                             setExceedThresholdDO_SV_01(false);
                          }
                      } 
                  } 
              }, [DO_SV_01_High, DO_SV_01, audioPlayingDO_SV_01 , DO_SV_01_Low,maintainDO_SV_01]);
          
              useEffect(() => {
                  if (audioPlayingDO_SV_01) {
                      const audioEnded = () => {
                         setAudioPlayingDO_SV_01(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingDO_SV_01]);
          
              const handleInputChangDO_BC_01 = (event: any) => {
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
                          `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,
                          { DO_SV_01_Maintain: newValue }
                      );
                      setMaintainDO_SV_01(newValue);
                      
                  } catch (error) {}
              };
     
     
    
         
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_NITORI}/SERVER_SCOPE`,



                {
                    
                    DO_HR_01_High: inputValueDO_HR_01,DO_HR_01_Low:inputValue2DO_HR_01,
             
                    DO_BC_01_High: inputValueDO_BC_01,DO_BC_01_Low:inputValue2DO_BC_01,
                    DO_SV_01_High: inputValuDO_SV_01,DO_SV_01_Low:inputValue2DO_SV_01,


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

            setEVC_01_Remain_Battery_Service_Life_High(inputValueEVC_01_Remain_Battery_Service_Life);
            setEVC_01_Remain_Battery_Service_Life_Low(inputValue2EVC_01_Remain_Battery_Service_Life);

            setEVC_01_Temperature_High(inputValueEVC_01_Temperature);
            setEVC_01_Temperature_Low(inputValue2EVC_01_Temperature);

            setEVC_01_Pressure_High(inputValueEVC_01_Pressure);
            setEVC_01_Pressure_Low(inputValue2EVC_01_Pressure);

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

            setDO_SV_01_High(inputValuDO_SV_01);
            setDO_SV_01_Low(inputValue2DO_SV_01);

            setDO_BC_01_High(inputValueDO_BC_01);
            setDO_BC_01_Low(inputValue2DO_BC_01);

             setDO_HR_01_High(inputValueDO_HR_01);
            setDO_HR_01_Low(inputValue2DO_HR_01);
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


         setInputValueDO_HR_01(DO_HR_01_High); 
        setInputValue2DO_HR_01(DO_HR_01_Low); 
        setInputValueDO_BC_01(DO_BC_01_High); 
        setInputValue2DO_BC_01(DO_BC_01_Low); 

        setInputValuDO_SV_01(DO_SV_01_High); 
        setInputValue2DO_SV_01(DO_SV_01_Low); 

     


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

        setInputValueDI_ZSC_1(DI_ZSC_1_High); 
        setInputValue2DI_ZSC_1(DI_ZSC_1_Low); 
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

              DO_HR_01_High, DO_HR_01_Low ,
              DO_BC_01_High,DO_BC_01_Low,
              DO_SV_01_High,DO_SV_01_Low,
              getWayPhoneOTSUKA,
   PCV_01,
           PCV_02,
           PSV_01,

           timeEVC_01,timeEVC_02

        ]);


        
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
            color:exceedThresholdTemperature && !maintainEVC_01_Temperature
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

        CSSDO_SV_01 : {
            color:exceedThresholdDO_SV_01 && !maintainDO_SV_01
            ? "#ff5656"
            : maintainDO_SV_01
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

  };
         
  const mainCategoryFC = {
    EVC: 'EVC01 -  Parameter & Configuration',
 
    PLC: 'PLC -  Parameter & Configuration'
};


        const dataEVC01 = [



            

            {
                mainCategory:mainCategoryFC.EVC,
                timeUpdate: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>Remain Battery Service Life</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>40001	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month} </span> , 
             high: <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Remain_Battery_Service_Life}
             checked={maintainEVC_01_Remain_Battery_Service_Life}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory:mainCategoryFC.EVC,
                timeUpdate: <span style={combineCss.CSSEVC_01_Temperature} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSEVC_01_Temperature}>Temperature</span> ,
    
             modbus: <span style={combineCss.CSSEVC_01_Temperature}>40850	 </span> ,
    
            value: <span style={combineCss.CSSEVC_01_Temperature} > {EVC_01_Temperature} {nameValue.C}</span> , 
             high: <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSEVC_01_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainEVC_01_Temperature}
             checked={maintainEVC_01_Temperature}
         ></Checkbox>
    
            },

            {
                mainCategory:mainCategoryFC.EVC,
                timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
            name: <span style={combineCss.CSSEVC_01_Pressure}>Pressure</span> ,
   
            modbus: <span style={combineCss.CSSEVC_01_Pressure}>40852	 </span> ,
   
           value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
            high: <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainEVC_01_Pressure}
            checked={maintainEVC_01_Pressure}
        ></Checkbox>
   
           },

           {
            mainCategory:mainCategoryFC.EVC,
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
           name: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}> Volume at Base Condition</span> ,
  
           modbus: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>40854	 </span> ,
  
          value: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition} > {EVC_01_Volume_at_Base_Condition} {nameValue.Sm3}</span> , 
           high: <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainEVC_01_Volume_at_Base_Condition}
           checked={maintainEVC_01_Volume_at_Base_Condition}
       ></Checkbox>
  
          },

          {
            mainCategory:mainCategoryFC.EVC,
            timeUpdate: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
          name: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>Volume at Measurement Condition</span> ,
 
          modbus: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>40856	 </span> ,
 
         value: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Condition} {nameValue.m3}</span> , 
          high: <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainEVC_01_Volume_at_Measurement_Condition}
          checked={maintainEVC_01_Volume_at_Measurement_Condition}
      ></Checkbox>
 
         },
         {
            mainCategory:mainCategoryFC.EVC,
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
         name: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>Flow at Base Condition</span> ,

         modbus: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>40858	 </span> ,

        value: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Condition} {nameValue.Sm3h}</span> , 
         high: <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainEVC_01_Flow_at_Base_Condition}
         checked={maintainEVC_01_Flow_at_Base_Condition}
     ></Checkbox>

        },

  
        {
            mainCategory:mainCategoryFC.EVC,
            timeUpdate: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>Flow at Measurement Condition</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>40860	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Condition} {nameValue.m3h}</span> , 
        high: <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Flow_at_Measurement_Condition}
        checked={maintainEVC_01_Flow_at_Measurement_Condition}
    ></Checkbox>

       },
       {
        mainCategory:mainCategoryFC.EVC,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>Vb of Current Day</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>40862	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day} > {EVC_01_Vb_of_Current_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Current_Day}
       checked={maintainEVC_01_Vb_of_Current_Day}
   ></Checkbox>

      },

        {
            mainCategory:mainCategoryFC.EVC,
            timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        name: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>Vm of Current Day</span> ,

        modbus: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>40864	 </span> ,

       value: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day} > {EVC_01_Vm_of_Current_Day} {nameValue.m3}</span> , 
        high: <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Current_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vm_of_Current_Day}
        checked={maintainEVC_01_Vm_of_Current_Day}
    ></Checkbox>

       },


       {
        mainCategory:mainCategoryFC.EVC,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>Vb of Last Day</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40866	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {EVC_01_Vb_of_Last_Day} {nameValue.Sm3}</span> , 
       high: <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

      },

              
      {
        mainCategory:mainCategoryFC.EVC,
        timeUpdate: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} >{EVC_STT01Value} </span>,
      name: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>Vm of Last Day</span> ,

      modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40868	 </span> ,

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {EVC_01_Vm_of_Last_Day} {nameValue.m3}</span> , 
      high: <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainEVC_01_Vm_of_Last_Day}
      checked={maintainEVC_01_Vm_of_Last_Day}
  ></Checkbox>

     },


    ]

    const PLC = [

        {
             mainCategory: mainCategoryFC.PLC ,
            timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSGD1}>Gas Detector GD-1301</span> ,

         modbus: <span style={combineCss.CSSGD1}>40002</span> ,

        value: <span style={combineCss.CSSGD1} > {GD1} {nameValue.LEL} </span> , 
         high: <InputText style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputValueGD1} onChange={handleInputChangeGD1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1} onChange={handleInputChange2GD1} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD1}
         checked={maintainGD1}
     ></Checkbox>

        },


        {
             mainCategory: mainCategoryFC.PLC ,
            timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSGD2}>Gas Detector GD-1302</span> ,

         modbus: <span style={combineCss.CSSGD2}>40004	 </span> ,

        value: <span style={combineCss.CSSGD2} > {GD2} {nameValue.LEL} </span> , 
         high: <InputText style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputValueGD2} onChange={handleInputChangeGD2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2} onChange={handleInputChange2GD2} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD2}
         checked={maintainGD2}
     ></Checkbox>

        },

        {
             mainCategory: mainCategoryFC.PLC ,
            timeUpdate: <span style={combineCss.CSSPT1} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSPT1}>Output Pressure</span> ,

        modbus: <span style={combineCss.CSSPT1}>40006	 </span> ,

       value: <span style={combineCss.CSSPT1} > {PT1} {nameValue.BARG} </span> , 
        high: <InputText style={combineCss.CSSPT1}   placeholder='High' step="0.1" type='number' value={inputValuePT1} onChange={handleInputChangePT1} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSPT1}   placeholder='Low' step="0.1" type='number' value={inputValue2PT1} onChange={handleInputChange2PT1} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainPT1}
        checked={maintainPT1}
    ></Checkbox>

       },


       {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_ZSO_1} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSDI_ZSO_1}>SDV-ZSO</span> ,

       modbus: <span style={combineCss.CSSDI_ZSO_1}>40009	 </span> ,

      value: <span style={combineCss.CSSDI_ZSO_1} > {DI_ZSO_1}</span> , 
       high: <InputText style={combineCss.CSSDI_ZSO_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSO_1} onChange={handleInputChangeDI_ZSO_1} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSDI_ZSO_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSO_1} onChange={handleInputChange2DI_ZSO_1} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainDI_ZSO_1}
       checked={maintainDI_ZSO_1}
   ></Checkbox>

      },





     {
         mainCategory: mainCategoryFC.PLC ,
        timeUpdate: <span style={combineCss.CSSDI_ZSC_1} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSDI_ZSC_1}>SDV-ZSC</span> ,

     modbus: <span style={combineCss.CSSDI_ZSC_1}>40010	 </span> ,

    value: <span style={combineCss.CSSDI_ZSC_1} > {DI_ZSC_1}</span> , 
     high: <InputText style={combineCss.CSSDI_ZSC_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSC_1} onChange={handleInputChangeDI_ZSC_1} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSDI_ZSC_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSC_1} onChange={handleInputChange2DI_ZSC_1} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainDI_ZSC_1}
     checked={maintainDI_ZSC_1}
 ></Checkbox>

    },


    


  {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDI_MAP_1} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSDI_MAP_1}>Manual Alarm Call Point</span> ,

  modbus: <span style={combineCss.CSSDI_MAP_1}>40013 </span> ,

 value: <span style={combineCss.CSSDI_MAP_1} > {DI_MAP_1}</span> , 
  high: <InputText style={combineCss.CSSDI_MAP_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_MAP_1} onChange={handleInputChangeDI_MAP_1} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSDI_MAP_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_MAP_1} onChange={handleInputChange2DI_MAP_1} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

 modbus: <span style={combineCss.CSSDI_UPS_BATTERY}>40014	 </span> ,

value: <span style={combineCss.CSSDI_UPS_BATTERY} > {DI_UPS_BATTERY}</span> , 
 high: <InputText style={combineCss.CSSDI_UPS_BATTERY}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_BATTERY} onChange={handleInputChangeDI_UPS_BATTERY} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSDI_UPS_BATTERY}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_BATTERY} onChange={handleInputChange2DI_UPS_BATTERY} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

 modbus: <span style={combineCss.CSSDI_UPS_CHARGING}>40015	 </span> ,

value: <span style={combineCss.CSSDI_UPS_CHARGING} > {DI_UPS_CHARGING}</span> , 
 high: <InputText style={combineCss.CSSDI_UPS_CHARGING}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_CHARGING} onChange={handleInputChangeDI_UPS_CHARGING} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSDI_UPS_CHARGING}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_CHARGING} onChange={handleInputChange2DI_UPS_CHARGING} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSDI_UPS_ALARM}>40016	 </span> ,

value: <span style={combineCss.CSSDI_UPS_ALARM} > {DI_UPS_ALARM}</span> , 
high: <InputText style={combineCss.CSSDI_UPS_ALARM}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_ALARM} onChange={handleInputChangeDI_UPS_ALARM} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDI_UPS_ALARM}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_ALARM} onChange={handleInputChange2DI_UPS_ALARM} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDI_UPS_ALARM}
checked={maintainDI_UPS_ALARM}
></Checkbox>

},


// {
//  mainCategory: mainCategoryFC.PLC ,
// timeUpdate: <span style={combineCss.CSSDI_SD_1} >{PLC_STTValue}</span>,
// name: <span style={combineCss.CSSDI_SD_1}>Smoker Detected</span> ,

// modbus: <span style={combineCss.CSSDI_SD_1}>40017	 </span> ,

// value: <span style={combineCss.CSSDI_SD_1} > {DI_SD_1}</span> , 
// high: <InputText style={combineCss.CSSDI_SD_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_SD_1} onChange={handleInputChangeDI_SD_1} inputMode="decimal" />, 
// low:  <InputText style={combineCss.CSSDI_SD_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SD_1} onChange={handleInputChange2DI_SD_1} inputMode="decimal" />,
// update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
// Maintain:   <Checkbox
// style={{ marginRight: 20, }}
// onChange={ChangeMaintainDI_SD_1}
// checked={maintainDI_SD_1}
// ></Checkbox>

// },


{
 mainCategory: mainCategoryFC.PLC ,
timeUpdate: <span style={combineCss.CSSDI_SELECT_SW} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSDI_SELECT_SW}>Select Switch</span> ,

modbus: <span style={combineCss.CSSDI_SELECT_SW}>40018	 </span> ,

value: <span style={combineCss.CSSDI_SELECT_SW} > {DI_SELECT_SW}</span> , 
high: <InputText style={combineCss.CSSDI_SELECT_SW}   placeholder='High' step="0.1" type='number' value={inputValueDI_SELECT_SW} onChange={handleInputChangeDI_SELECT_SW} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDI_SELECT_SW}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SELECT_SW} onChange={handleInputChange2DI_SELECT_SW} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

value: <span style={combineCss.CSSDI_RESET} > {DI_RESET}</span> , 
high: <InputText style={combineCss.CSSDI_RESET}   placeholder='High' step="0.1" type='number' value={inputValueDI_RESET} onChange={handleInputChangeDI_RESET} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDI_RESET}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_RESET} onChange={handleInputChange2DI_RESET} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSEmergency_NO}>40020	 </span> ,

value: <span style={combineCss.CSSEmergency_NO} > {Emergency_NO}</span> , 
high: <InputText style={combineCss.CSSEmergency_NO}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NO} onChange={handleInputChangeEmergency_NO} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEmergency_NO}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NO} onChange={handleInputChange2Emergency_NO} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSEmergency_NC}>40021	 </span> ,

value: <span style={combineCss.CSSEmergency_NC} > {Emergency_NC}</span> , 
high: <InputText style={combineCss.CSSEmergency_NC}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NC} onChange={handleInputChangeEmergency_NC} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSEmergency_NC}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NC} onChange={handleInputChange2Emergency_NC} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSUPS_Mode}>40022	 </span> ,

value: <span style={combineCss.CSSUPS_Mode} > {UPS_Mode}</span> , 
high: <InputText style={combineCss.CSSUPS_Mode}   placeholder='High' step="0.1" type='number' value={inputValueUPS_Mode} onChange={handleInputChangeUPS_Mode} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSUPS_Mode}   placeholder='Low' step="0.1" type='number' value={inputValue2UPS_Mode} onChange={handleInputChange2UPS_Mode} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSDO_BC_01}>40026	 </span> ,

value: <span style={combineCss.CSSDO_BC_01} > {DO_BC_01}</span> , 
high: <InputText style={combineCss.CSSDO_BC_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_BC_01} onChange={handleInputChangeDO_BC_01} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDO_BC_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_BC_01} onChange={handleInputChange2DO_BC_01} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSDO_HR_01}>40027	 </span> ,

value: <span style={combineCss.CSSDO_HR_01} > {DO_HR_01}</span> , 
high: <InputText style={combineCss.CSSDO_HR_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_HR_01} onChange={handleInputChangeDO_HR_01} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDO_HR_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_HR_01} onChange={handleInputChange2DO_HR_01} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDO_HR_01}
checked={maintainDO_HR_01}
></Checkbox>

},





{
 mainCategory: mainCategoryFC.PLC ,
timeUpdate: <span style={combineCss.CSSDO_SV_01} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSDO_SV_01}>SDV-SOLENOID</span> ,

modbus: <span style={combineCss.CSSDO_SV_01}>40028	 </span> ,

value: <span style={combineCss.CSSDO_SV_01} > {DO_SV_01}</span> , 
high: <InputText style={combineCss.CSSDO_SV_01}   placeholder='High' step="0.1" type='number' value={inputValuDO_SV_01} onChange={handleInputChangDO_BC_01} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSDO_SV_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_SV_01} onChange={handleInputChange2DO_SV_01} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
Maintain:   <Checkbox
style={{ marginRight: 20, }}
onChange={ChangeMaintainDO_SV_01}
checked={maintainDO_SV_01}
></Checkbox>

},

      ]

      const combinedData = [ ...dataEVC01 , ...PLC];

      const mainCategoryTemplate = (data: any) => {
          return (
              <div style={{fontWeight:600, fontSize:23,background:'#f8fafc', marginTop:10}}>
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

  const ConfigurationName ={
    PSV: "Pressure Safety Valve ( PSV-1901)" ,
    PCV1: "{namePCV_PSV.control} (PCV-1901)",
    PCV2: "{namePCV_PSV.control} (PCV-1902)",
    IOT: "IOT getway phone number",
    EVC_01_Battery_Expiration_Date: "EVC 01 Battery Expiration Date",
    EVC_01_Battery_Installation_Date: "EVC 01 Battery Installation Date",

    EVC_02_Battery_Expiration_Date: "EVC 02 Battery Expiration Date",
    EVC_02_Battery_Installation_Date: "EVC 02 Battery Installation Date"

}

const combineCssTime = {
    PCV: {
        height: 25,
        fontWeight: 400,
    },
};
const Configuration = [
   
    {
        Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1301) (BarG)</span>,

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
        Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1302) (BarG)</span>,

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
        Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-1301) (BarG)</span>,

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
                {ConfigurationName.EVC_01_Battery_Installation_Date}
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
                {ConfigurationName.EVC_01_Battery_Expiration_Date}
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
                {ConfigurationName.EVC_02_Battery_Installation_Date}
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
                {ConfigurationName.EVC_02_Battery_Expiration_Date}
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   borderRadius:10,marginTop:10,  }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>NITORI</h2>

    <div style={{width:'100%' ,  borderRadius:5 }}>
    <DataTable  size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}   >
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
                <h4>Station - Configuration </h4>
                <DataTable value={Configuration} size={"small"} selectionMode="single" >
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
