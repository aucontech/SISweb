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

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {

                        FC_Lithinum_Battery_Status: setFC_Lithium_Battery_Status,
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
                        DI_ZSO_2: setDI_ZSO_2,
                        DI_ZSC_2: setDI_ZSC_2,
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
                        DO_SV_02: setDO_SV_02,


                  
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

            const DO_SV_02_High = res.data.find((item: any) => item.key === "DO_SV_02_High");
            setDO_SV_02_High(DO_SV_02_High?.value || null);
            const DO_SV_02_Low = res.data.find((item: any) => item.key === "DO_SV_02_Low");
            setDO_SV_02_Low(DO_SV_02_Low?.value || null);
            const DO_SV_02_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_02_Maintain"
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
 // =================================================================================================================== 




            setMaintainSD(SD_Maintain?.value || false);
            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);


            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);


            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);


            setMaintainDO_SV_02(DO_SV_02_Maintain?.value || false);



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
        if (typeof FC_Lithium_Battery_Status_High === 'string' && typeof FC_Lithium_Battery_Status_Low === 'string' && FC_Lithium_Battery_Status !== null && maintainFC_Lithium_Battery_Status === false
        ) {
            const highValue = parseFloat(FC_Lithium_Battery_Status_High);
            const lowValue = parseFloat(FC_Lithium_Battery_Status_Low);
            const FC_Lithium_Battery_StatusValue = parseFloat(FC_Lithium_Battery_Status);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_Lithium_Battery_StatusValue)) {
                if (highValue <= FC_Lithium_Battery_StatusValue || FC_Lithium_Battery_StatusValue <= lowValue) {
                    if (!audioPlayingFC_Lithium_Battery_Status) {
                        audioRef.current?.play();
                        setAudioPlayingFC_Lithium_Battery_Status(true);
                        setExceedThresholdFC_Lithium_Battery_Status(true);
                    }
                } else {
                    setAudioPlayingFC_Lithium_Battery_Status(false);
                    setExceedThresholdFC_Lithium_Battery_Status(false);
                }
            } 
        } 
    }, [FC_Lithium_Battery_Status_High, FC_Lithium_Battery_Status, audioPlayingFC_Lithium_Battery_Status, FC_Lithium_Battery_Status_Low,maintainFC_Lithium_Battery_Status]);

    useEffect(() => {
        if (audioPlayingFC_Lithium_Battery_Status) {
            const audioEnded = () => {
                setAudioPlayingFC_Lithium_Battery_Status(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingFC_Lithium_Battery_Status]);

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
     const [exceedThresholdTemperature, setExceedThresholdTemperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainFC_Battery_Voltage, setMaintainFC_Battery_Voltage] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof FC_Battery_Voltage_High === 'string' && typeof FC_Battery_Voltage_Low === 'string' && FC_Battery_Voltage !== null && maintainFC_Battery_Voltage === false
             ) {
                 const highValue = parseFloat(FC_Battery_Voltage_High);
                 const lowValue = parseFloat(FC_Battery_Voltage_Low);
                 const FC_Battery_VoltageValue = parseFloat(FC_Battery_Voltage);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_Battery_VoltageValue)) {
                     if (highValue <= FC_Battery_VoltageValue || FC_Battery_VoltageValue <= lowValue) {
                         if (!audioPlayingFC_Battery_Voltage) {
                             audioRef.current?.play();
                             setAudioPlayingFC_Battery_Voltage(true);
                             setExceedThresholdTemperature(true);
                         }
                     } else {
                        setAudioPlayingFC_Battery_Voltage(false);
                         setExceedThresholdTemperature(false);
                     }
                 } 
             } 
         }, [FC_Battery_Voltage_High, FC_Battery_Voltage, audioPlayingFC_Battery_Voltage, FC_Battery_Voltage_Low,maintainFC_Battery_Voltage]);
     
         useEffect(() => {
             if (audioPlayingFC_Battery_Voltage) {
                 const audioEnded = () => {
                    setAudioPlayingFC_Battery_Voltage(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingFC_Battery_Voltage]);
     
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
             if (typeof FC_System_Voltage_High === 'string' && typeof FC_System_Voltage_Low === 'string' && FC_System_Voltage !== null && maintainFC_System_Voltage === false
             ) {
                 const highValue = parseFloat(FC_System_Voltage_High);
                 const lowValue = parseFloat(FC_System_Voltage_Low);
                 const FC_System_VoltageValue = parseFloat(FC_System_Voltage);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_System_VoltageValue)) {
                     if (highValue <= FC_System_VoltageValue || FC_System_VoltageValue <= lowValue) {
                         if (!audioPlayingFC_System_Voltage) {
                             audioRef.current?.play();
                             setAudioPlayingFC_System_Voltage(true);
                             setExceedThresholdFC_System_Voltage(true);
                         }
                     } else {
                        setAudioPlayingFC_System_Voltage(false);
                        setExceedThresholdFC_System_Voltage(false);
                     }
                 } 
             } 
         }, [FC_System_Voltage_High, FC_System_Voltage, audioPlayingFC_System_Voltage, FC_System_Voltage_Low,maintainFC_System_Voltage]);
     
         useEffect(() => {
             if (audioPlayingFC_System_Voltage) {
                 const audioEnded = () => {
                    setAudioPlayingFC_System_Voltage(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingFC_System_Voltage]);
     
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
                  if (typeof FC_Charger_Voltage_High === 'string' && typeof FC_Charger_Voltage_Low === 'string' && FC_Charger_Voltage !== null && maintainFC_Charger_Voltage === false
                  ) {
                      const highValue = parseFloat(FC_Charger_Voltage_High);
                      const lowValue = parseFloat(FC_Charger_Voltage_Low);
                      const FC_Charger_VoltageValue = parseFloat(FC_Charger_Voltage);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_Charger_VoltageValue)) {
                          if (highValue <= FC_Charger_VoltageValue || FC_Charger_VoltageValue <= lowValue) {
                              if (!audioPlayingFC_Charger_Voltage) {
                                  audioRef.current?.play();
                                  setAudioPlayingFC_Charger_Voltage(true);
                                  setExceedThresholdFC_Charger_Voltage(true);
                              }
                          } else {
                             setAudioPlayingFC_Charger_Voltage(false);
                             setExceedThresholdFC_Charger_Voltage(false);
                          }
                      } 
                  } 
              }, [FC_Charger_Voltage_High, FC_Charger_Voltage, audioPlayingFC_Charger_Voltage, FC_Charger_Voltage_Low,maintainFC_Charger_Voltage]);
          
              useEffect(() => {
                  if (audioPlayingFC_Charger_Voltage) {
                      const audioEnded = () => {
                         setAudioPlayingFC_Charger_Voltage(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingFC_Charger_Voltage]);
          
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
              }, [FC_01_Accumulated_Values_Uncorrected_Volume_High, FC_01_Accumulated_Values_Uncorrected_Volume, audioPlayingFC_01_Accumulated_Values_Uncorrected_Volume , FC_01_Accumulated_Values_Uncorrected_Volume_Low,maintainFC_01_Accumulated_Values_Uncorrected_Volume]);
          
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
        if (typeof FC_02_Accumulated_Values_Uncorrected_Volume_High === 'string' && typeof FC_02_Accumulated_Values_Uncorrected_Volume_Low === 'string' && FC_02_Accumulated_Values_Uncorrected_Volume !== null && maintainFC_02_Accumulated_Values_Uncorrected_Volume === false
        ) {
            const highValue = parseFloat(FC_02_Accumulated_Values_Uncorrected_Volume_High);
            const lowValue = parseFloat(FC_02_Accumulated_Values_Uncorrected_Volume_Low);
            const FC_02_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Accumulated_Values_Uncorrected_Volume);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Accumulated_Values_Uncorrected_VolumeValue)) {
                if (highValue <= FC_02_Accumulated_Values_Uncorrected_VolumeValue || FC_02_Accumulated_Values_Uncorrected_VolumeValue <= lowValue) {
                    if (!audioPlayingFC_02_Accumulated_Values_Uncorrected_Volume) {
                        audioRef.current?.play();
                        setAudioPlayingFC_02_Accumulated_Values_Uncorrected_Volume(true);
                        setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume(true);
                    }
                } else {
                   setAudioPlayingFC_02_Accumulated_Values_Uncorrected_Volume(false);
                   setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume(false);
                }
            } 
        } 
    }, [FC_02_Accumulated_Values_Uncorrected_Volume_High, FC_02_Accumulated_Values_Uncorrected_Volume, audioPlayingFC_02_Accumulated_Values_Uncorrected_Volume, FC_02_Accumulated_Values_Uncorrected_Volume_Low,maintainFC_02_Accumulated_Values_Uncorrected_Volume]);

    useEffect(() => {
        if (audioPlayingFC_02_Accumulated_Values_Uncorrected_Volume) {
            const audioEnded = () => {
               setAudioPlayingFC_02_Accumulated_Values_Uncorrected_Volume(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingFC_02_Accumulated_Values_Uncorrected_Volume]);

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
        if (typeof FC_02_Accumulated_Values_Volume_High === 'string' && typeof FC_02_Accumulated_Values_Volume_Low === 'string' && FC_02_Accumulated_Values_Volume !== null && maintainFC_02_Accumulated_Values_Volume === false
        ) {
            const highValue = parseFloat(FC_02_Accumulated_Values_Volume_High);
            const lowValue = parseFloat(FC_02_Accumulated_Values_Volume_Low);
            const FC_02_Accumulated_Values_VolumeValue = parseFloat(FC_02_Accumulated_Values_Volume);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Accumulated_Values_VolumeValue)) {
                if (highValue <= FC_02_Accumulated_Values_VolumeValue || FC_02_Accumulated_Values_VolumeValue <= lowValue) {
                    if (!audioPlayingFC_02_Accumulated_Values_Volume) {
                        audioRef.current?.play();
                        setAudioPlayingFC_02_Accumulated_Values_Volume(true);
                        setExceedThresholdFC_02_Accumulated_Values_Volume(true);
                    }
                } else {
                   setAudioPlayingFC_02_Accumulated_Values_Volume(false);
                   setExceedThresholdFC_02_Accumulated_Values_Volume(false);
                }
            } 
        } 
    }, [FC_02_Accumulated_Values_Volume_High, FC_02_Accumulated_Values_Volume, audioPlayingFC_02_Accumulated_Values_Volume, FC_02_Accumulated_Values_Volume_Low,maintainFC_02_Accumulated_Values_Volume]);

    useEffect(() => {
        if (audioPlayingFC_02_Accumulated_Values_Volume) {
            const audioEnded = () => {
               setAudioPlayingFC_02_Accumulated_Values_Volume(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingFC_02_Accumulated_Values_Volume]);

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
    if (typeof FC_02_Current_Values_Static_Pressure_High === 'string' && typeof FC_02_Current_Values_Static_Pressure_Low === 'string' && FC_02_Current_Values_Static_Pressure !== null && maintainFC_02_Current_Values_Static_Pressure === false
    ) {
        const highValue = parseFloat(FC_02_Current_Values_Static_Pressure_High);
        const lowValue = parseFloat(FC_02_Current_Values_Static_Pressure_Low);
        const FC_02_Current_Values_Static_PressureValue = parseFloat(FC_02_Current_Values_Static_Pressure);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Current_Values_Static_PressureValue)) {
            if (highValue <= FC_02_Current_Values_Static_PressureValue || FC_02_Current_Values_Static_PressureValue <= lowValue) {
                if (!audioPlayingFC_02_Current_Values_Static_Pressure) {
                    audioRef.current?.play();
                    setAudioPlayingFC_02_Current_Values_Static_Pressure(true);
                    setExceedThresholdFC_02_Current_Values_Static_Pressure(true);
                }
            } else {
               setAudioPlayingFC_02_Current_Values_Static_Pressure(false);
               setExceedThresholdFC_02_Current_Values_Static_Pressure(false);
            }
        } 
    } 
}, [FC_02_Current_Values_Static_Pressure_High, FC_02_Current_Values_Static_Pressure, audioPlayingFC_02_Current_Values_Static_Pressure, FC_02_Current_Values_Static_Pressure_Low,maintainFC_02_Current_Values_Static_Pressure]);

useEffect(() => {
    if (audioPlayingFC_02_Current_Values_Static_Pressure) {
        const audioEnded = () => {
           setAudioPlayingFC_02_Current_Values_Static_Pressure(false);
        };
        audioRef.current?.addEventListener('ended', audioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', audioEnded);
        };
    }
}, [audioPlayingFC_02_Current_Values_Static_Pressure]);

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
                if (typeof FC_02_Current_Values_Temperature_High === 'string' && typeof FC_02_Current_Values_Temperature_Low === 'string' && FC_02_Current_Values_Temperature !== null && maintainFC_02_Current_Values_Temperature === false
                ) {
                    const highValue = parseFloat(FC_02_Current_Values_Temperature_High);
                    const lowValue = parseFloat(FC_02_Current_Values_Temperature_Low);
                    const FC_02_Current_Values_TemperatureValue = parseFloat(FC_02_Current_Values_Temperature);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Current_Values_TemperatureValue)) {
                        if (highValue <= FC_02_Current_Values_TemperatureValue || FC_02_Current_Values_TemperatureValue <= lowValue) {
                            if (!audioPlayingFC_02_Current_Values_Temperature) {
                                audioRef.current?.play();
                                setAudioPlayingFC_02_Current_Values_Temperature(true);
                                setExceedThresholdFC_02_Current_Values_Temperature(true);
                            }
                        } else {
                           setAudioPlayingFC_02_Current_Values_Temperature(false);
                           setExceedThresholdFC_02_Current_Values_Temperature(false);
                        }
                    } 
                } 
            }, [FC_02_Current_Values_Temperature_High, FC_02_Current_Values_Temperature, audioPlayingFC_02_Current_Values_Temperature, FC_02_Current_Values_Temperature_Low,maintainFC_02_Current_Values_Temperature]);
        
            useEffect(() => {
                if (audioPlayingFC_02_Current_Values_Temperature) {
                    const audioEnded = () => {
                       setAudioPlayingFC_02_Current_Values_Temperature(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingFC_02_Current_Values_Temperature]);
        
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
                if (typeof FC_02_Current_Values_Flow_Rate_High === 'string' && typeof FC_02_Current_Values_Flow_Rate_Low === 'string' && FC_02_Current_Values_Flow_Rate !== null && maintainFC_02_Current_Values_Flow_Rate === false
                ) {
                    const highValue = parseFloat(FC_02_Current_Values_Flow_Rate_High);
                    const lowValue = parseFloat(FC_02_Current_Values_Flow_Rate_Low);
                    const FC_02_Current_Values_Flow_RateValue = parseFloat(FC_02_Current_Values_Flow_Rate);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Current_Values_Flow_RateValue)) {
                        if (highValue <= FC_02_Current_Values_Flow_RateValue || FC_02_Current_Values_Flow_RateValue <= lowValue) {
                            if (!audioPlayingFC_02_Current_Values_Flow_Rate) {
                                audioRef.current?.play();
                                setAudioPlayingFC_02_Current_Values_Flow_Rate(true);
                                setExceedThresholdFC_02_Current_Values_Flow_Rate(true);
                            }
                        } else {
                           setAudioPlayingFC_02_Current_Values_Flow_Rate(false);
                           setExceedThresholdFC_02_Current_Values_Flow_Rate(false);
                        }
                    } 
                } 
            }, [FC_02_Current_Values_Flow_Rate_High, FC_02_Current_Values_Flow_Rate, audioPlayingFC_02_Current_Values_Flow_Rate, FC_02_Current_Values_Flow_Rate_Low,maintainFC_02_Current_Values_Flow_Rate]);
        
            useEffect(() => {
                if (audioPlayingFC_02_Current_Values_Flow_Rate) {
                    const audioEnded = () => {
                       setAudioPlayingFC_02_Current_Values_Flow_Rate(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingFC_02_Current_Values_Flow_Rate]);
        
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
            if (typeof FC_02_Current_Values_Uncorrected_Flow_Rate_High === 'string' && typeof FC_02_Current_Values_Uncorrected_Flow_Rate_Low === 'string' && FC_02_Current_Values_Uncorrected_Flow_Rate !== null && maintainFC_02_Current_Values_Uncorrected_Flow_Rate === false
            ) {
                const highValue = parseFloat(FC_02_Current_Values_Uncorrected_Flow_Rate_High);
                const lowValue = parseFloat(FC_02_Current_Values_Uncorrected_Flow_Rate_Low);
                const FC_02_Current_Values_Uncorrected_Flow_RateValue = parseFloat(FC_02_Current_Values_Uncorrected_Flow_Rate);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Current_Values_Uncorrected_Flow_RateValue)) {
                    if (highValue <= FC_02_Current_Values_Uncorrected_Flow_RateValue || FC_02_Current_Values_Uncorrected_Flow_RateValue <= lowValue) {
                        if (!audioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate) {
                            audioRef.current?.play();
                            setAudioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate(true);
                            setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate(true);
                        }
                    } else {
                       setAudioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate(false);
                       setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate(false);
                    }
                } 
            } 
        }, [FC_02_Current_Values_Uncorrected_Flow_Rate_High, FC_02_Current_Values_Uncorrected_Flow_Rate, audioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate, FC_02_Current_Values_Uncorrected_Flow_Rate_Low,maintainFC_02_Current_Values_Uncorrected_Flow_Rate]);
        
        useEffect(() => {
            if (audioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate) {
                const audioEnded = () => {
                   setAudioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingFC_02_Current_Values_Uncorrected_Flow_Rate]);
        
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
                if (typeof FC_02_Today_Values_Volume_High === 'string' && typeof FC_02_Today_Values_Volume_Low === 'string' && FC_02_Today_Values_Volume !== null && maintainFC_02_Today_Values_Volume === false
                ) {
                    const highValue = parseFloat(FC_02_Today_Values_Volume_High);
                    const lowValue = parseFloat(FC_02_Today_Values_Volume_Low);
                    const FC_02_Today_Values_VolumeValue = parseFloat(FC_02_Today_Values_Volume);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Today_Values_VolumeValue)) {
                        if (highValue <= FC_02_Today_Values_VolumeValue || FC_02_Today_Values_VolumeValue <= lowValue) {
                            if (!audioPlayingFC_02_Today_Values_Volume) {
                                audioRef.current?.play();
                                setAudioPlayingFC_02_Today_Values_Volume(true);
                                setExceedThresholdFC_02_Today_Values_Volume(true);
                            }
                        } else {
                           setAudioPlayingFC_02_Today_Values_Volume(false);
                           setExceedThresholdFC_02_Today_Values_Volume(false);
                        }
                    } 
                } 
            }, [FC_02_Today_Values_Volume_High, FC_02_Today_Values_Volume, audioPlayingFC_02_Today_Values_Volume, FC_02_Today_Values_Volume_Low,maintainFC_02_Today_Values_Volume]);
            
            useEffect(() => {
                if (audioPlayingFC_02_Today_Values_Volume) {
                    const audioEnded = () => {
                       setAudioPlayingFC_02_Today_Values_Volume(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingFC_02_Today_Values_Volume]);
            
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
                if (typeof FC_02_Today_Values_Uncorrected_Volume_High === 'string' && typeof FC_02_Today_Values_Uncorrected_Volume_Low === 'string' && FC_02_Today_Values_Uncorrected_Volume !== null && maintainFC_02_Today_Values_Uncorrected_Volume === false
                ) {
                    const highValue = parseFloat(FC_02_Today_Values_Uncorrected_Volume_High);
                    const lowValue = parseFloat(FC_02_Today_Values_Uncorrected_Volume_Low);
                    const FC_02_Today_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Today_Values_Uncorrected_Volume);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Today_Values_Uncorrected_VolumeValue)) {
                        if (highValue <= FC_02_Today_Values_Uncorrected_VolumeValue || FC_02_Today_Values_Uncorrected_VolumeValue <= lowValue) {
                            if (!audioPlayingFC_02_Today_Values_Uncorrected_Volume) {
                                audioRef.current?.play();
                                setAudioPlayingFC_02_Today_Values_Uncorrected_Volume(true);
                                setExceedThresholdFC_02_Today_Values_Uncorrected_Volume(true);
                            }
                        } else {
                           setAudioPlayingFC_02_Today_Values_Uncorrected_Volume(false);
                           setExceedThresholdFC_02_Today_Values_Uncorrected_Volume(false);
                        }
                    } 
                } 
            }, [FC_02_Today_Values_Uncorrected_Volume_High, FC_02_Today_Values_Uncorrected_Volume, audioPlayingFC_02_Today_Values_Uncorrected_Volume, FC_02_Today_Values_Uncorrected_Volume_Low,maintainFC_02_Today_Values_Uncorrected_Volume]);
            
            useEffect(() => {
                if (audioPlayingFC_02_Today_Values_Uncorrected_Volume) {
                    const audioEnded = () => {
                       setAudioPlayingFC_02_Today_Values_Uncorrected_Volume(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingFC_02_Today_Values_Uncorrected_Volume]);
            
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
         if (typeof FC_02_Yesterday_Values_Volume_High === 'string' && typeof FC_02_Yesterday_Values_Volume_Low === 'string' && FC_02_Yesterday_Values_Volume !== null && maintainFC_02_Yesterday_Values_Volume === false
         ) {
             const highValue = parseFloat(FC_02_Yesterday_Values_Volume_High);
             const lowValue = parseFloat(FC_02_Yesterday_Values_Volume_Low);
             const FC_02_Yesterday_Values_VolumeValue = parseFloat(FC_02_Yesterday_Values_Volume);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Yesterday_Values_VolumeValue)) {
                 if (highValue <= FC_02_Yesterday_Values_VolumeValue || FC_02_Yesterday_Values_VolumeValue <= lowValue) {
                     if (!audioPlayingFC_02_Yesterday_Values_Volume) {
                         audioRef.current?.play();
                         setAudioPlayingFC_02_Yesterday_Values_Volume(true);
                         setExceedThresholdFC_02_Yesterday_Values_Volume(true);
                     }
                 } else {
                     setAudioPlayingFC_02_Yesterday_Values_Volume(false);
                     setExceedThresholdFC_02_Yesterday_Values_Volume(false);
                 }
             } 
         } 
     }, [FC_02_Yesterday_Values_Volume_High, FC_02_Yesterday_Values_Volume, audioPlayingFC_02_Yesterday_Values_Volume, FC_02_Yesterday_Values_Volume_Low,maintainFC_02_Yesterday_Values_Volume]);
 
     useEffect(() => {
         if (audioPlayingFC_02_Yesterday_Values_Volume) {
             const audioEnded = () => {
                 setAudioPlayingFC_02_Yesterday_Values_Volume(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingFC_02_Yesterday_Values_Volume]);
 
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
      const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainFC_02_Yesterday_Values_Uncorrected_Volume, setMaintainFC_02_Yesterday_Values_Uncorrected_Volume] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof FC_02_Yesterday_Values_Uncorrected_Volume_High === 'string' && typeof FC_02_Yesterday_Values_Uncorrected_Volume_Low === 'string' && FC_02_Yesterday_Values_Uncorrected_Volume !== null && maintainFC_02_Yesterday_Values_Uncorrected_Volume === false
              ) {
                  const highValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume_High);
                  const lowValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume_Low);
                  const FC_02_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(FC_02_Yesterday_Values_Uncorrected_Volume);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FC_02_Yesterday_Values_Uncorrected_VolumeValue)) {
                      if (highValue <= FC_02_Yesterday_Values_Uncorrected_VolumeValue || FC_02_Yesterday_Values_Uncorrected_VolumeValue <= lowValue) {
                          if (!audioPlayingFC_02_Yesterday_Values_Uncorrected_Volume) {
                              audioRef.current?.play();
                              setAudioPlayingFC_02_Yesterday_Values_Uncorrected_Volume(true);
                              setExceedThreshold302(true);
                          }
                      } else {
                         setAudioPlayingFC_02_Yesterday_Values_Uncorrected_Volume(false);
                          setExceedThreshold302(false);
                      }
                  } 
              } 
          }, [FC_02_Yesterday_Values_Uncorrected_Volume_High, FC_02_Yesterday_Values_Uncorrected_Volume, audioPlayingFC_02_Yesterday_Values_Uncorrected_Volume, FC_02_Yesterday_Values_Uncorrected_Volume_Low,maintainFC_02_Yesterday_Values_Uncorrected_Volume]);
      
          useEffect(() => {
              if (audioPlayingFC_02_Yesterday_Values_Uncorrected_Volume) {
                  const audioEnded = () => {
                     setAudioPlayingFC_02_Yesterday_Values_Uncorrected_Volume(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingFC_02_Yesterday_Values_Uncorrected_Volume]);
      
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
                 if (typeof SD_High === 'string' && typeof SD_Low === 'string' && SD !== null && maintainSD === false
                 ) {
                     const highValue = parseFloat(SD_High);
                     const lowValue = parseFloat(SD_Low);
                     const SDValue = parseFloat(SD);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDValue)) {
                         if (highValue <= SDValue || SDValue <= lowValue) {
                             if (!audioPlayingSD) {
                                 audioRef.current?.play();
                                 setAudioPlayingSD(true);
                                 setExceedThresholdSD(true);
                             }
                         } else {
                            setAudioPlayingSD(false);
                            setExceedThresholdSD(false);
                         }
                     } 
                 } 
             }, [SD_High, SD, audioPlayingSD, SD_Low,maintainSD]);
         
             useEffect(() => {
                 if (audioPlayingSD) {
                     const audioEnded = () => {
                        setAudioPlayingSD(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingSD]);
         
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
                              `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                              { DO_SV_01_Maintain: newValue }
                          );
                          setMaintainDO_SV_01(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
              const [DO_SV_02, setDO_SV_02] = useState<string | null>(null);
              const [audioPlayingDO_SV_02, setAudioPlayingDO_SV_02] = useState(false);
              const [inputValueDO_SV_02, setInputValueDO_SV_02] = useState<any>();
              const [inputValue2DO_SV_02, setInputValue2DO_SV_02] = useState<any>();
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
                                  if (!audioPlayingDO_SV_02) {
                                      audioRef.current?.play();
                                      setAudioPlayingDO_SV_02(true);
                                      setExceedThresholdDO_SV_02(true);
                                  }
                              } else {
                                 setAudioPlayingDO_SV_02(false);
                                 setExceedThresholdDO_SV_02(false);
                              }
                          } 
                      } 
                  }, [DO_SV_02_High, DO_SV_02, audioPlayingDO_SV_02, DO_SV_02_Low,maintainDO_SV_02]);
              
                  useEffect(() => {
                      if (audioPlayingDO_SV_02) {
                          const audioEnded = () => {
                             setAudioPlayingDO_SV_02(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingDO_SV_02]);
              
                  const handleInputChangeDO_SV_02 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueDO_SV_02(newValue);
                  };
              
                  const handleInputChange2DO_SV_02 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2DO_SV_02(newValue2);
                  };
                  const ChangeMaintainDO_SV_02 = async () => {
                      try {
                          const newValue = !maintainDO_SV_02;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_YOSHINO}/SERVER_SCOPE`,
                              { DO_SV_02_Maintain: newValue }
                          );
                          setMaintainDO_SV_02(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
         
         
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
                    DO_SV_02_High: inputValueDO_SV_02,DO_SV_02_Low:inputValue2DO_SV_02,

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

            setDO_SV_02_High(inputValueDO_SV_02);
            setDO_SV_02_Low(inputValue2DO_SV_02);

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

        setInputValueDO_SV_02(DO_SV_02_High); 
        setInputValue2DO_SV_02(DO_SV_02_Low); 


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

    }, [
        
        ,SD_High, SD_Low ,
        DO_HR_01_High, DO_HR_01_Low ,
        DO_BC_01_High,DO_BC_01_Low,
        DO_SV_01_High,DO_SV_01_Low,
         DO_SV_02_High,DO_SV_02_Low ,
         
        
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
        CSSDO_SV_02 : {
            color:exceedThresholdDO_SV_02 && !maintainDO_SV_02
            ? "#ff5656"
            : maintainDO_SV_02
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
            color:exceedThresholdTemperature && !maintainFC_Battery_Voltage
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
            color:exceedThreshold302 && !maintainFC_02_Yesterday_Values_Uncorrected_Volume
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
  };
         
    
  const mainCategoryFC = {
    FC01: 'FC01 -  Parameter & Configuration',
    FC02: 'FC02 -  Parameter & Configuration',
    PLC: 'PLC -  Parameter & Configuration',
    FC: 'FC -  Parameter & Configuration',

};




        const dataFC01 =  [

         

  
        {
            
             mainCategory: mainCategoryFC.FC01 ,
            timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Static_Pressure} >{EVC_STT01Value}</span>,
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
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Temperature} >{EVC_STT01Value}</span>,
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
            
        mainCategory: mainCategoryFC.FC01 ,
       timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
     name: <span style={combineCss.CSSFC_01_Accumulated_Values_Uncorrected_Volume}>Gross Volume Accumulated</span> ,

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
       
        mainCategory: mainCategoryFC.FC01 ,
       timeUpdate: <span style={combineCss.CSSFC_01_Accumulated_Values_Volume} >{EVC_STT01Value}</span>,
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
            
             mainCategory: mainCategoryFC.FC01 ,
            timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Flow_Rate} >{EVC_STT01Value}</span>,
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
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} >{EVC_STT01Value}</span>,
       name: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>Gross Volume Flow</span> ,

       modbus: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate}>7625	 </span> ,

      value: <span style={combineCss.CSSFC_01_Current_Values_Uncorrected_Flow_Rate} > {FC_01_Current_Values_Uncorrected_Flow_Rate} {nameValue.m3h}</span> , 
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
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Volume} >{EVC_STT01Value}</span>,
      name: <span style={combineCss.CSSFC_01_Today_Values_Volume}>Standard Volume Vb Today</span> ,

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
                
                 mainCategory: mainCategoryFC.FC01 ,
                timeUpdate: <span style={combineCss.CSSFC_01_Today_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
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
        
         mainCategory: mainCategoryFC.FC01 ,
        timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>Standard Volume Vb Yesterday</span> ,

    modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume}>7631	 </span> ,

   value: <span style={combineCss.CSSFC_01_Yesterday_Values_Volume} > {FC_01_Yesterday_Values_Volume}  {nameValue.Sm3}</span> , 
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
    
     mainCategory: mainCategoryFC.FC01 ,
    timeUpdate: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} >{EVC_STT01Value}</span>,
   name: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>Gross Volume Vm Yesterday</span> ,

   modbus: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume}>7633	 </span> ,

  value: <span style={combineCss.CSSFC_01_Yesterday_Values_Uncorrected_Volume} > {FC_01_Yesterday_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
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


const dataFC02 = [




  {
    
     mainCategory: mainCategoryFC.FC02 ,
    timeUpdate: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure} >{EVC_STT01Value}</span>,
  name: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure}>Input Pressure</span> ,

  modbus: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure}>8619	 </span> ,

 value: <span style={combineCss.CSSFC_02_Current_Values_Static_Pressure} > {FC_02_Current_Values_Static_Pressure}  {nameValue.Bara}</span> , 
  high: <InputText style={combineCss.CSSFC_02_Current_Values_Static_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Static_Pressure} onChange={handleInputChangeFC_02_Current_Values_Static_Pressure} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSFC_02_Current_Values_Static_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Static_Pressure} onChange={handleInputChange2FC_02_Current_Values_Static_Pressure} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

 modbus: <span style={combineCss.CSSFC_02_Current_Values_Temperature}>8621	 </span> ,

value: <span style={combineCss.CSSFC_02_Current_Values_Temperature} > {FC_02_Current_Values_Temperature}  {nameValue.C}</span> , 
 high: <InputText style={combineCss.CSSFC_02_Current_Values_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Temperature} onChange={handleInputChangeFC_02_Current_Values_Temperature} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSFC_02_Current_Values_Temperature}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Temperature} onChange={handleInputChange2FC_02_Current_Values_Temperature} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

 modbus: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}>8615	 </span> ,

value: <span style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume} > {FC_02_Accumulated_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
 high: <InputText style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSFC_02_Accumulated_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Accumulated_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Accumulated_Values_Uncorrected_Volume} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

  modbus: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume}>8617	 </span> ,

 value: <span style={combineCss.CSSFC_02_Accumulated_Values_Volume} > {FC_02_Accumulated_Values_Volume}  {nameValue.Sm3}</span> , 
  high: <InputText style={combineCss.CSSFC_02_Accumulated_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Accumulated_Values_Volume} onChange={handleInputChangeFC_02_Accumulated_Values_Volume} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSFC_02_Accumulated_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Accumulated_Values_Volume} onChange={handleInputChange2FC_02_Accumulated_Values_Volume} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

  modbus: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate}>8623	 </span> ,

 value: <span style={combineCss.CSSFC_02_Current_Values_Flow_Rate} > {FC_02_Current_Values_Flow_Rate}  {nameValue.Sm3h}</span> , 
  high: <InputText style={combineCss.CSSFC_02_Current_Values_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Flow_Rate} onChange={handleInputChangeFC_02_Current_Values_Flow_Rate} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSFC_02_Current_Values_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Flow_Rate} onChange={handleInputChange2FC_02_Current_Values_Flow_Rate} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
 high: <InputText style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChangeFC_02_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSFC_02_Current_Values_Uncorrected_Flow_Rate}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Current_Values_Uncorrected_Flow_Rate} onChange={handleInputChange2FC_02_Current_Values_Uncorrected_Flow_Rate} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSFC_02_Today_Values_Volume}>8627	 </span> ,

value: <span style={combineCss.CSSFC_02_Today_Values_Volume} > {FC_02_Today_Values_Volume}  {nameValue.Sm3}</span> , 
high: <InputText style={combineCss.CSSFC_02_Today_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Today_Values_Volume} onChange={handleInputChangeFC_02_Today_Values_Volume} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSFC_02_Today_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Today_Values_Volume} onChange={handleInputChange2FC_02_Today_Values_Volume} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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

modbus: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}>8629	 </span> ,

value: <span style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume} > {FC_02_Today_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
high: <InputText style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Today_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Today_Values_Uncorrected_Volume} inputMode="decimal" />, 
low:  <InputText style={combineCss.CSSFC_02_Today_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Today_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Today_Values_Uncorrected_Volume} inputMode="decimal" />,
update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
    
             modbus: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume}>8631	 </span> ,
    
            value: <span style={combineCss.CSSFC_02_Yesterday_Values_Volume} > {FC_02_Yesterday_Values_Volume}  {nameValue.Sm3}</span> , 
             high: <InputText style={combineCss.CSSFC_02_Yesterday_Values_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Yesterday_Values_Volume} onChange={handleInputChangeFC_02_Yesterday_Values_Volume} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_02_Yesterday_Values_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Yesterday_Values_Volume} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
    
             modbus: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}>8633	 </span> ,
    
            value: <span style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume} > {FC_02_Yesterday_Values_Uncorrected_Volume}  {nameValue.m3}</span> , 
             high: <InputText style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}   placeholder='High' step="0.1" type='number' value={inputValueFC_02_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChangeFC_02_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_02_Yesterday_Values_Uncorrected_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_02_Yesterday_Values_Uncorrected_Volume} onChange={handleInputChange2FC_02_Yesterday_Values_Uncorrected_Volume} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
    
             modbus: <span style={combineCss.CSSGD1}>40002</span> ,
    
            value: <span style={combineCss.CSSGD1} > {GD1}  {nameValue.LEL}</span> , 
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
             name: <span style={combineCss.CSSGD2}>Gas Detector GD-1402</span> ,
    
             modbus: <span style={combineCss.CSSGD2}>40004	 </span> ,
    
            value: <span style={combineCss.CSSGD2} > {GD2}  {nameValue.LEL}</span> , 
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
   
           value: <span style={combineCss.CSSPT1} > {PT1}  {nameValue.BARG}</span> , 
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
           name: <span style={combineCss.CSSDI_ZSO_1}>SDV_ZSO</span> ,
  
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


   {
     mainCategory: mainCategoryFC.PLC ,
    timeUpdate: <span style={combineCss.CSSDI_SD_1} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSDI_SD_1}>Smoker Detected</span> ,

   modbus: <span style={combineCss.CSSDI_SD_1}>40017	 </span> ,

  value: <span style={combineCss.CSSDI_SD_1} > {DI_SD_1}</span> , 
   high: <InputText style={combineCss.CSSDI_SD_1}   placeholder='High' step="0.1" type='number' value={inputValueDI_SD_1} onChange={handleInputChangeDI_SD_1} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSDI_SD_1}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SD_1} onChange={handleInputChange2DI_SD_1} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainDI_SD_1}
   checked={maintainDI_SD_1}
></Checkbox>

  },


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

          const dataFC = [

            {
                mainCategory: mainCategoryFC.FC ,
                timeUpdate: <span style={combineCss.CSSFC_Lithium_Battery_Status} >{EVC_STT01Value}</span>,
             name: <span style={combineCss.CSSFC_Lithium_Battery_Status}>Lithium Battery Status</span> ,
             modbus: <span style={combineCss.CSSFC_Lithium_Battery_Status}>5615	 </span> ,
            value: <span style={combineCss.CSSFC_Lithium_Battery_Status} > {FC_Lithium_Battery_Status}</span> , 
             high: <InputText style={combineCss.CSSFC_Lithium_Battery_Status}   placeholder='High' step="0.1" type='number' value={inputValueFC_Lithium_Battery_Status} onChange={handleInputChangeFC_Lithium_Battery_Status} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_Lithium_Battery_Status}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Lithium_Battery_Status} onChange={handleInputChange2FC_Lithium_Battery_Status} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
    
             modbus: <span style={combineCss.CSSFC_Battery_Voltage}>6615	 </span> ,
    
            value: <span style={combineCss.CSSFC_Battery_Voltage} > {FC_Battery_Voltage} {nameValue.Volt}</span> , 
             high: <InputText style={combineCss.CSSFC_Battery_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_Battery_Voltage} onChange={handleInputChangeFC_Battery_Voltage} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSFC_Battery_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Battery_Voltage} onChange={handleInputChange2FC_Battery_Voltage} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
   
            modbus: <span style={combineCss.CSSFC_System_Voltage}>6617	 </span> ,
   
           value: <span style={combineCss.CSSFC_System_Voltage} > {FC_System_Voltage} {nameValue.Volt}</span> , 
            high: <InputText style={combineCss.CSSFC_System_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_System_Voltage} onChange={handleInputChangeFC_System_Voltage} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSFC_System_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_System_Voltage} onChange={handleInputChange2FC_System_Voltage} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
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
  
           modbus: <span style={combineCss.CSSFC_Charger_Voltage}>6619	 </span> ,
  
          value: <span style={combineCss.CSSFC_Charger_Voltage} > {FC_Charger_Voltage} {nameValue.Volt}</span> , 
           high: <InputText style={combineCss.CSSFC_Charger_Voltage}   placeholder='High' step="0.1" type='number' value={inputValueFC_Charger_Voltage} onChange={handleInputChangeFC_Charger_Voltage} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSFC_Charger_Voltage}   placeholder='Low' step="0.1" type='number' value={inputValue2FC_Charger_Voltage} onChange={handleInputChange2FC_Charger_Voltage} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFC_Charger_Voltage}
           checked={maintainFC_Charger_Voltage}
       ></Checkbox>
  
          },

        ]
          const combinedData = [...dataFC01, ...dataFC02 , ...PLC,...dataFC, ];

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
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1402) (BarG)</span>,

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
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-1401) (BarG)</span>,

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

            Update: 
                <Button className='buttonUpdateSetData' onClick={confirmUpData} > Update </Button>,
            
        },

    ];

       //=========================================================================

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   borderRadius:10, marginTop:10 }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>YOSHINO</h2>

    <div style={{width:'100%' ,  borderRadius:5 }}>

        

    <DataTable size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}    >
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
