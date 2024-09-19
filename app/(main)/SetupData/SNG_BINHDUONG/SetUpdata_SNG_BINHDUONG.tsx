import React, { useEffect, useRef, useState } from 'react'
import { id_SNG_BinhDuong } from '../../data-table-device/ID-DEVICE/IdDevice';
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
export default function SetUpdata_SNG_BINHDUONG() {

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
    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : null;
     const userId = userData?.id?.id;
    

    
    
    const TECH_OPER = userId !== UserTechnican.A  && 
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


            const TECHNIAN_AUTH = userId !== UserTechnican.A  && 
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
                    entityId: id_SNG_BinhDuong,
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
                           
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_SNG_BinhDuong,
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
                        PT_2004: setPT_2004,

                        PT_2005: setPT_2005,
                        TT_2003: setTT_2003,
                        TT_2004: setTT_2004,
                        TG_2005: setTG_2005,
                        WB_1001: setWB_1001,
                        GD_2002: setGD_2002,

                        GD_2003: setGD_2003,
                        GD_2004: setGD_2004,
                        GD_2005: setGD_2005,
                        GD_2006: setGD_2006,

                        TM_2002_SNG: setTM_2002_SNG,
                        TM_2003_SNG: setTM_2003_SNG,


                        TOTAL_SNG: setTOTAL_SNG,

                        SDV_2004: setSDV_2004,
                        
                        SDV_2003: setSDV_2003,
                        GD1_STATUS: setGD1_STATUS,

                        GD2_STATUS: setGD2_STATUS,
                        GD3_STATUS: setGD3_STATUS,
                        GD4_STATUS: setGD4_STATUS,
                        GD5_STATUS:setGD5_STATUS,
                        EVC_02_Vm_of_Last_Day:setEVC_02_Vm_of_Last_Day,


                        ESD: setESD,
                        HR_BC: setHR_BC,
                        SD: setSD,

                        VAPORIZER_1: setVAPORIZER_1,
                        VAPORIZER_2: setVAPORIZER_2,
                        VAPORIZER_3: setVAPORIZER_3,
                        VAPORIZER_4: setVAPORIZER_4,
                        COOLING_V: setCOOLING_V,

                        FCV_2001: setFCV_2001,
                        PERCENT_LPG: setPERCENT_LPG,

                        PERCENT_AIR: setPERCENT_AIR,
                        HV_1001: setHV_1001,
                        RATIO_MODE: setRATIO_MODE,

                        FCV_MODE: setFCV_MODE,
                        TOTAL_CNG: setTOTAL_CNG,
                        TM_2002_CNG: setTM_2002_CNG,
                        TM_2003_CNG: setTM_2003_CNG,
                        
                        WB_Setpoint: setWB_Setpoint,


                        ESD_2001: setESD_2001,
                   
                        WIS_Calorimeter: setWIS_Calorimeter,
                        CVS_Calorimeter: setCVS_Calorimeter,
                        SG_Calorimeter :setSG_Calorimeter,


                        TD_4072_Conn_STT: setTD_4072_Conn_STT,
                        PLC_Conn_STT: setPLC_Conn_STT,
                  
                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
                        EVC_02_Conn_STT: setEVC_STT02Value,
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
                fetchData()
            };
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/values/attributes/SERVER_SCOPE`
            );


         

        

    
            const PT_2004_High = res.data.find((item: any) => item.key === "PT_2004_High");
            setPT_2004_High(PT_2004_High?.value || null);
            const PT_2004_Low = res.data.find((item: any) => item.key === "PT_2004_Low");
            setPT_2004_Low(PT_2004_Low?.value || null);
            const MaintainPT_2004 = res.data.find(
                (item: any) => item.key === "PT_2004_Maintain"
            );

            const PT_2005_High = res.data.find((item: any) => item.key === "PT_2005_High");
            setPT_2005_High(PT_2005_High?.value || null);
            const PT_2005_Low = res.data.find((item: any) => item.key === "PT_2005_Low");
            setPT_2005_Low(PT_2005_Low?.value || null);
            const PT_2005_Maintain = res.data.find(
                (item: any) => item.key === "PT_2005_Maintain"
            );

            const TT_2003_High = res.data.find((item: any) => item.key === "TT_2003_High");
            setTT_2003_High(TT_2003_High?.value || null);
            const TT_2003_Low = res.data.find((item: any) => item.key === "TT_2003_Low");
            setTT_2003_Low(TT_2003_Low?.value || null);
            const TT_2003_Maintain = res.data.find(
                (item: any) => item.key === "TT_2003_Maintain"
            );


            const TT_2004_High = res.data.find((item: any) => item.key === "TT_2004_High");
            setTT_2004_High(TT_2004_High?.value || null);
            const TT_2004_Low = res.data.find((item: any) => item.key === "TT_2004_Low");
            setTT_2004_Low(TT_2004_Low?.value || null);
            const TT_2004_Maintain = res.data.find(
                (item: any) => item.key === "TT_2004_Maintain"
            );

            const TG_2005_High = res.data.find((item: any) => item.key === "TG_2005_High");
            setTG_2005_High(TG_2005_High?.value || null);
            const TG_2005_Low = res.data.find((item: any) => item.key === "TG_2005_Low");
            setTG_2005_Low(TG_2005_Low?.value || null);
            const TG_2005_Maintain = res.data.find(
                (item: any) => item.key === "TG_2005_Maintain"
            );

            const WB_1001_High = res.data.find((item: any) => item.key === "WB_1001_High");
            setWB_1001_High(WB_1001_High?.value || null);
            const WB_1001_Low = res.data.find((item: any) => item.key === "WB_1001_Low");
            setWB_1001_Low(WB_1001_Low?.value || null);
            const WB_1001_Maintain = res.data.find(
                (item: any) => item.key === "WB_1001_Maintain"
            );

            const GD_2002_High = res.data.find((item: any) => item.key === "GD_2002_High");
            setGD_2002_High(GD_2002_High?.value || null);
            const GD_2002_Low = res.data.find((item: any) => item.key === "GD_2002_Low");
            setGD_2002_Low(GD_2002_Low?.value || null);
            const GD_2002_Maintain = res.data.find(
                (item: any) => item.key === "GD_2002_Maintain"
            );

            const GD_2003_High = res.data.find((item: any) => item.key === "GD_2003_High");
            setGD_2003_High(GD_2003_High?.value || null);
            const GD_2003_Low = res.data.find((item: any) => item.key === "GD_2003_Low");
            setGD_2003_Low(GD_2003_Low?.value || null);
            const GD_2003_Maintain = res.data.find(
                (item: any) => item.key === "GD_2003_Maintain"
            );


            const GD_2004_High = res.data.find((item: any) => item.key === "GD_2004_High");
            setGD_2004_High(GD_2004_High?.value || null);
            const GD_2004_Low = res.data.find((item: any) => item.key === "GD_2004_Low");
            setGD_2004_Low(GD_2004_Low?.value || null);
            const GD_2004_Maintain = res.data.find(
                (item: any) => item.key === "GD_2004_Maintain"
            );

            const GD_2005_High = res.data.find((item: any) => item.key === "GD_2005_High");
            setGD_2005_High(GD_2005_High?.value || null);
            const GD_2005_Low = res.data.find((item: any) => item.key === "GD_2005_Low");
            setGD_2005_Low(GD_2005_Low?.value || null);
            const GD_2005_Maintain = res.data.find(
                (item: any) => item.key === "GD_2005_Maintain"
            );

            const EVC_02_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
            setEVC_02_Vm_of_Last_Day_High(EVC_02_Vm_of_Last_Day_High?.value || null);
            const EVC_02_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
            setEVC_02_Vm_of_Last_Day_Low(EVC_02_Vm_of_Last_Day_Low?.value || null);
            const EVC_02_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );


            const GD_2006_High = res.data.find((item: any) => item.key === "GD_2006_High");
            setGD_2006_High(GD_2006_High?.value || null);
            const GD_2006_Low = res.data.find((item: any) => item.key === "GD_2006_Low");
            setGD_2006_Low(GD_2006_Low?.value || null);
            const GD_2006_Maintain = res.data.find(
                (item: any) => item.key === "GD_2006_Maintain"
            );

            const TM_2002_SNG_High = res.data.find((item: any) => item.key === "TM_2002_SNG_High");
            setTM_2002_SNG_High(TM_2002_SNG_High?.value || null);
            const TM_2002_SNG_Low = res.data.find((item: any) => item.key === "TM_2002_SNG_Low");
            setTM_2002_SNG_Low(TM_2002_SNG_Low?.value || null);
            const TM_2002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2002_SNG_Maintain"
            );

            const TM_2003_SNG_High = res.data.find((item: any) => item.key === "TM_2003_SNG_High");
            setTM_2003_SNG_High(TM_2003_SNG_High?.value || null);
            const TM_2003_SNG_Low = res.data.find((item: any) => item.key === "TM_2003_SNG_Low");
            setTM_2003_SNG_Low(TM_2003_SNG_Low?.value || null);
            const TM_2003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2003_SNG_Maintain"
            );

            const TOTAL_SNG_High = res.data.find((item: any) => item.key === "TOTAL_SNG_High");
            setTOTAL_SNG_High(TOTAL_SNG_High?.value || null);
            const TOTAL_SNG_Low = res.data.find((item: any) => item.key === "TOTAL_SNG_Low");
            setTOTAL_SNG_Low(TOTAL_SNG_Low?.value || null);
            const TOTAL_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Maintain"
            );

            const SDV_2003_High = res.data.find((item: any) => item.key === "SDV_2003_High");
            setSDV_2003_High(SDV_2003_High?.value || null);
            const SDV_2003_Low = res.data.find((item: any) => item.key === "SDV_2003_Low");
            setSDV_2003_Low(SDV_2003_Low?.value || null);
            const SDV_2003_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2003_Maintain"
            );


            const GD1_STATUS_High = res.data.find((item: any) => item.key === "GD1_STATUS_High");
            setGD1_STATUS_High(GD1_STATUS_High?.value || null);
            const GD1_STATUS_Low = res.data.find((item: any) => item.key === "GD1_STATUS_Low");
            setGD1_STATUS_Low(GD1_STATUS_Low?.value || null);
            const GD1_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD1_STATUS_Maintain"
            );

            const GD2_STATUS_High = res.data.find((item: any) => item.key === "GD2_STATUS_High");
            setGD2_STATUS_High(GD2_STATUS_High?.value || null);
            const GD2_STATUS_Low = res.data.find((item: any) => item.key === "GD2_STATUS_Low");
            setGD2_STATUS_Low(GD2_STATUS_Low?.value || null);
            const GD2_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD2_STATUS_Maintain"
            );

            const GD3_STATUS_High = res.data.find((item: any) => item.key === "GD3_STATUS_High");
            setGD3_STATUS_High(GD3_STATUS_High?.value || null);
            const GD3_STATUS_Low = res.data.find((item: any) => item.key === "GD3_STATUS_Low");
            setGD3_STATUS_Low(GD3_STATUS_Low?.value || null);
            const GD3_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD3_STATUS_Maintain"
            );


            const GD4_STATUS_High = res.data.find((item: any) => item.key === "GD4_STATUS_High");
            setGD4_STATUS_High(GD4_STATUS_High?.value || null);
            const GD4_STATUS_Low = res.data.find((item: any) => item.key === "GD4_STATUS_Low");
            setGD4_STATUS_Low(GD4_STATUS_Low?.value || null);
            const GD4_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD4_STATUS_Maintain"
            );

            const GD5_STATUS_High = res.data.find((item: any) => item.key === "GD5_STATUS_High");
            setGD5_STATUS_High(GD5_STATUS_High?.value || null);
            const GD5_STATUS_Low = res.data.find((item: any) => item.key === "GD5_STATUS_Low");
            setGD5_STATUS_Low(GD5_STATUS_Low?.value || null);
            const GD5_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD5_STATUS_Maintain"
            );


            const SDV_2004_High = res.data.find((item: any) => item.key === "SDV_2004_High");
            setSDV_2004_High(SDV_2004_High?.value || null);
            const SDV_2004_Low = res.data.find((item: any) => item.key === "SDV_2004_Low");
            setSDV_2004_Low(SDV_2004_Low?.value || null);
            const SDV_2004_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2004_Maintain"
            );
            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const MaintainESD = res.data.find(
                (item: any) => item.key === "ESD_Maintain"
            );


            const VAPORIZER_1_High = res.data.find((item: any) => item.key === "VAPORIZER_1_High");
            setVAPORIZER_1_High(VAPORIZER_1_High?.value || null);
            const VAPORIZER_1_Low = res.data.find((item: any) => item.key === "VAPORIZER_1_Low");
            setVAPORIZER_1_Low(VAPORIZER_1_Low?.value || null);
            const VAPORIZER_1_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_1_Maintain"
            );

            const VAPORIZER_2_High = res.data.find((item: any) => item.key === "VAPORIZER_2_High");
            setVAPORIZER_2_High(VAPORIZER_2_High?.value || null);
            const VAPORIZER_2_Low = res.data.find((item: any) => item.key === "VAPORIZER_2_Low");
            setVAPORIZER_2_Low(VAPORIZER_2_Low?.value || null);
            const VAPORIZER_2_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_2_Maintain"
            );


            const VAPORIZER_3_High = res.data.find((item: any) => item.key === "VAPORIZER_3_High");
            setVAPORIZER_3_High(VAPORIZER_3_High?.value || null);
            const VAPORIZER_3_Low = res.data.find((item: any) => item.key === "VAPORIZER_3_Low");
            setVAPORIZER_3_Low(VAPORIZER_3_Low?.value || null);
            const VAPORIZER_3_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_3_Maintain"
            );

            const VAPORIZER_4_High = res.data.find((item: any) => item.key === "VAPORIZER_4_High");
            setVAPORIZER_4_High(VAPORIZER_4_High?.value || null);
            const VAPORIZER_4_Low = res.data.find((item: any) => item.key === "VAPORIZER_4_Low");
            setVAPORIZER_4_Low(VAPORIZER_4_Low?.value || null);
            const VAPORIZER_4_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_4_Maintain"
            );

            const COOLING_V_High = res.data.find((item: any) => item.key === "COOLING_V_High");
            setCOOLING_V_High(COOLING_V_High?.value || null);
            const COOLING_V_Low = res.data.find((item: any) => item.key === "COOLING_V_Low");
            setCOOLING_V_Low(COOLING_V_Low?.value || null);
            const COOLING_V_Maintain = res.data.find(
                (item: any) => item.key === "COOLING_V_Maintain"
            );


            const FCV_2001_High = res.data.find((item: any) => item.key === "FCV_2001_High");
            setFCV_2001_High(FCV_2001_High?.value || null);
            const FCV_2001_Low = res.data.find((item: any) => item.key === "FCV_2001_Low");
            setFCV_2001_Low(FCV_2001_Low?.value || null);
            const FCV_2001_Maintain = res.data.find(
                (item: any) => item.key === "FCV_2001_Maintain"
            );


            const PERCENT_LPG_High = res.data.find((item: any) => item.key === "PERCENT_LPG_High");
            setPERCENT_LPG_High(PERCENT_LPG_High?.value || null);
            const PERCENT_LPG_Low = res.data.find((item: any) => item.key === "PERCENT_LPG_Low");
            setPERCENT_LPG_Low(PERCENT_LPG_Low?.value || null);
            const PERCENT_LPG_Maintain = res.data.find(
                (item: any) => item.key === "PERCENT_LPG_Maintain"
            );

            const PERCENT_AIR_High = res.data.find((item: any) => item.key === "PERCENT_AIR_High");
            setPERCENT_AIR_High(PERCENT_AIR_High?.value || null);
            const PERCENT_AIR_Low = res.data.find((item: any) => item.key === "PERCENT_AIR_Low");
            setPERCENT_AIR_Low(PERCENT_AIR_Low?.value || null);
            const PERCENT_AIR_Maintain = res.data.find(
                (item: any) => item.key === "PERCENT_AIR_Maintain"
            );

            const HV_1001_High = res.data.find((item: any) => item.key === "HV_1001_High");
            setHV_1001_High(HV_1001_High?.value || null);
            const HV_1001_Low = res.data.find((item: any) => item.key === "HV_1001_Low");
            setHV_1001_Low(HV_1001_Low?.value || null);
            const HV_1001_Maintain = res.data.find(
                (item: any) => item.key === "HV_1001_Maintain"
            );

            const FCV_MODE_High = res.data.find((item: any) => item.key === "FCV_MODE_High");
            setFCV_MODE_High(FCV_MODE_High?.value || null);
            const FCV_MODE_Low = res.data.find((item: any) => item.key === "FCV_MODE_Low");
            setFCV_MODE_Low(FCV_MODE_Low?.value || null);
            const FCV_MODE_Maintain = res.data.find(
                (item: any) => item.key === "FCV_MODE_Maintain"
            );

            const TOTAL_CNG_High = res.data.find((item: any) => item.key === "TOTAL_CNG_High");
            setTOTAL_CNG_High(TOTAL_CNG_High?.value || null);
            const TOTAL_CNG_Low = res.data.find((item: any) => item.key === "TOTAL_CNG_Low");
            setTOTAL_CNG_Low(TOTAL_CNG_Low?.value || null);
            const TOTAL_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_CNG_Maintain"
            );

            const TM_2002_CNG_High = res.data.find((item: any) => item.key === "TM_2002_CNG_High");
            setTM_2002_CNG_High(TM_2002_CNG_High?.value || null);
            const TM_2002_CNG_Low = res.data.find((item: any) => item.key === "TM_2002_CNG_Low");
            setTM_2002_CNG_Low(TM_2002_CNG_Low?.value || null);
            const TM_2002_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2002_CNG_Maintain"
            );

            const TM_2003_CNG_High = res.data.find((item: any) => item.key === "TM_2003_CNG_High");
            setTM_2003_CNG_High(TM_2003_CNG_High?.value || null);
            const TM_2003_CNG_Low = res.data.find((item: any) => item.key === "TM_2003_CNG_Low");
            setTM_2003_CNG_Low(TM_2003_CNG_Low?.value || null);
            const TM_2003_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2003_CNG_Maintain"
            );

            const WB_Setpoint_High = res.data.find((item: any) => item.key === "WB_Setpoint_High");
            setWB_Setpoint_High(WB_Setpoint_High?.value || null);
            const WB_Setpoint_Low = res.data.find((item: any) => item.key === "WB_Setpoint_Low");
            setWB_Setpoint_Low(WB_Setpoint_Low?.value || null);
            const WB_Setpoint_Maintain = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );

         

            const RATIO_MODE_High = res.data.find((item: any) => item.key === "RATIO_MODE_High");
            setRATIO_MODE_High(RATIO_MODE_High?.value || null);
            const RATIO_MODE_Low = res.data.find((item: any) => item.key === "RATIO_MODE_Low");
            setRATIO_MODE_Low(RATIO_MODE_Low?.value || null);
            const RATIO_MODE_Maintain = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Maintain"
            );

            const WIS_Calorimeter_High = res.data.find((item: any) => item.key === "WIS_Calorimeter_High");
            setWIS_Calorimeter_High(WIS_Calorimeter_High?.value || null);
            const WIS_Calorimeter_Low = res.data.find((item: any) => item.key === "WIS_Calorimeter_Low");
            setWIS_Calorimeter_Low(WIS_Calorimeter_Low?.value || null);
            const WIS_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "WIS_Calorimeter_Maintain"
            );

            const CVS_Calorimeter_High = res.data.find((item: any) => item.key === "CVS_Calorimeter_High");
            setCVS_Calorimeter_High(CVS_Calorimeter_High?.value || null);
            const CVS_Calorimeter_Low = res.data.find((item: any) => item.key === "CVS_Calorimeter_Low");
            setCVS_Calorimeter_Low(CVS_Calorimeter_Low?.value || null);
            const CVS_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "CVS_Calorimeter_Maintain"
            );

            const SG_Calorimeter_High = res.data.find((item: any) => item.key === "SG_Calorimeter_High");
            setSG_Calorimeter_High(SG_Calorimeter_High?.value || null);
            const SG_Calorimeter_Low = res.data.find((item: any) => item.key === "SG_Calorimeter_Low");
            setSG_Calorimeter_Low(SG_Calorimeter_Low?.value || null);
            const SG_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "SG_Calorimeter_Maintain"
            );
            const HR_BC_High = res.data.find((item: any) => item.key === "HR_BC_High");
            setHR_BC_High(HR_BC_High?.value || null);
            const HR_BC_Low = res.data.find((item: any) => item.key === "HR_BC_Low");
            setHR_BC_Low(HR_BC_Low?.value || null);
            const HR_BC_Maintain = res.data.find(
                (item: any) => item.key === "HR_BC_Maintain"
            );

            const SD_High = res.data.find((item: any) => item.key === "SD_High");
            setSD_High(SD_High?.value || null);
            const SD_Low = res.data.find((item: any) => item.key === "SD_Low");
            setSD_Low(SD_Low?.value || null);
            const SD_Maintain = res.data.find(
                (item: any) => item.key === "SD_Maintain"
            );


            const ESD_2001_High = res.data.find((item: any) => item.key === "ESD_2001_High");
            setESD_2001_High(ESD_2001_High?.value || null);
            const ESD_2001_Low = res.data.find((item: any) => item.key === "ESD_2001_Low");
            setESD_2001_Low(ESD_2001_Low?.value || null);
            const ESD_2001_Maintain = res.data.find(
                (item: any) => item.key === "ESD_2001_Maintain"
            );

     

            const TD_4072_Conn_STT_High = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_High");
            setTD_4072_Conn_STT_High(TD_4072_Conn_STT_High?.value || null);
            const TD_4072_Conn_STT_Low = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_Low");
            setTD_4072_Conn_STT_Low(TD_4072_Conn_STT_Low?.value || null);
            const TD_4072_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "TD_4072_Conn_STT_Maintain"
            );

            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );

         
 // =================================================================================================================== 



      


            setMaintainSDV_2004(SDV_2004_Maintain?.value || false);

            setMaintainGD5_STATUS(GD5_STATUS_Maintain?.value || false);

            setMaintainGD4_STATUS(GD4_STATUS_Maintain?.value || false);


            setMaintainGD3_STATUS(GD3_STATUS_Maintain?.value || false);


            setMaintainGD2_STATUS(GD2_STATUS_Maintain?.value || false);


            setMaintainGD1_STATUS(GD1_STATUS_Maintain?.value || false);


            setMaintainSDV_2003(SDV_2003_Maintain?.value || false);

            
            setMaintainTOTAL_SNG(TOTAL_SNG_Maintain?.value || false);
            
            setMaintainTM_2003_SNG(TM_2003_SNG_Maintain?.value || false);

            
            setMaintainTM_2002_SNG(TM_2002_SNG_Maintain?.value || false);

            setMaintainGD_2006(GD_2006_Maintain?.value || false);


            setMaintainTT_2004(TT_2004_Maintain?.value || false);




         

            setMaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);


            setMaintainGD_2005(GD_2005_Maintain?.value || false);

            setMaintainGD_2004(GD_2004_Maintain?.value || false);


            setMaintainGD_2003(GD_2003_Maintain?.value || false);


            setMaintainGD_2002(GD_2002_Maintain?.value || false);

            setMaintainWB_1001(WB_1001_Maintain?.value || false);


            setMaintainTG_2005(TG_2005_Maintain?.value || false);


            setMaintainTT_2003(TT_2003_Maintain?.value || false);

            setMaintainPT_2005(PT_2005_Maintain?.value || false);

            setMaintainPT_2004(MaintainPT_2004?.value || false);


            setMaintainESD(MaintainESD?.value || false);


            setMaintainVAPORIZER_1(VAPORIZER_1_Maintain?.value || false);

            setMaintainVAPORIZER_2(VAPORIZER_2_Maintain?.value || false);


            setMaintainVAPORIZER_3(VAPORIZER_3_Maintain?.value || false);


            setMaintainVAPORIZER_4(VAPORIZER_4_Maintain?.value || false);


            setMaintainCOOLING_V(COOLING_V_Maintain?.value || false);



            
            
            setMaintainRATIO_MODE(RATIO_MODE_Maintain?.value || false);

  

            setMaintainWB_Setpoint(WB_Setpoint_Maintain?.value || false);


            setMaintainTM_2003_CNG(TM_2003_CNG_Maintain?.value || false);

            setMaintainTM_2002_CNG(TM_2002_CNG_Maintain?.value || false);

            setMaintainTOTAL_CNG(TOTAL_CNG_Maintain?.value || false);


            setMaintainFCV_MODE(FCV_MODE_Maintain?.value || false);

            setMaintainHV_1001(HV_1001_Maintain?.value || false);


            setMaintainPERCENT_AIR(PERCENT_AIR_Maintain?.value || false);

            setMaintainPERCENT_LPG(PERCENT_LPG_Maintain?.value || false);


            setMaintainFCV_2001(FCV_2001_Maintain?.value || false);


  
            setMaintainWIS_Calorimeter(WIS_Calorimeter_Maintain?.value || false);
           
            setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);
           
            setMaintainSG_Calorimeter(SG_Calorimeter_Maintain?.value || false);
           
           
                       setMaintainHR_BC(HR_BC_Maintain?.value || false);
           
                       setMaintainSD(SD_Maintain?.value || false);
           
                       setMaintainESD_2001(ESD_2001_Maintain?.value || false);

                       setMaintainTD_4072_Conn_STT(TD_4072_Conn_STT_Maintain?.value || false);

                       setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);
                      

            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };


        

        const [TT_2004, setTT_2004] = useState<string | null>(null);
        const [inputValueTT_2004, setInputValueTT_2004] = useState<any>();
        const [inputValue2TT_2004, setInputValue2TT_2004] = useState<any>();
        const [TT_2004_High, setTT_2004_High] = useState<number | null>(null);
        const [TT_2004_Low, setTT_2004_Low] = useState<number | null>(null);
        const [exceedThresholdTT_2004, setExceedThresholdTT_2004] = useState(false); 
        const [maintainTT_2004, setMaintainTT_2004] = useState<boolean>(false);
    
        useEffect(() => {
            const TT_2004Value = parseFloat(TT_2004 as any);
            const highValue = TT_2004_High ?? NaN;
            const lowValue = TT_2004_Low ?? NaN;
    
            if (!isNaN(TT_2004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_2004) {
                setExceedThresholdTT_2004(TT_2004Value >= highValue || TT_2004Value <= lowValue);
            }
        }, [TT_2004, TT_2004_High, TT_2004_Low, maintainTT_2004]);
    
        const handleInputChangeTT_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValueTT_2004(event.target.value);
        };
    
        const handleInputChange2TT_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue2TT_2004(event.target.value);
        };
    
        const ChangeMaintainTT_2004 = async () => {
            try {
                const newValue = !maintainTT_2004;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { TT_2004_Maintain: newValue }
                );
                setMaintainTT_2004(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        

 const [PT_2004, setPT_2004] = useState<string | null>(null);
 const [inputValuePT_2004, setInputValuePT_2004] = useState<any>();
 const [inputValue2PT_2004, setInputValue2PT_2004] = useState<any>();
 const [PT_2004_High, setPT_2004_High] = useState<number | null>(null);
 const [PT_2004_Low, setPT_2004_Low] = useState<number | null>(null);
 const [exceedThresholdPT_2004, setExceedThresholdPT_2004] = useState(false); 
 const [maintainPT_2004, setMaintainPT_2004] = useState<boolean>(false);

 useEffect(() => {
     const PT_2004Value = parseFloat(PT_2004 as any);
     const highValue = PT_2004_High ?? NaN;
     const lowValue = PT_2004_Low ?? NaN;

     if (!isNaN(PT_2004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_2004) {
         setExceedThresholdPT_2004(PT_2004Value >= highValue || PT_2004Value <= lowValue);
     }
 }, [PT_2004, PT_2004_High, PT_2004_Low, maintainPT_2004]);

 const handleInputChangePT_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValuePT_2004(event.target.value);
 };

 const handleInputChange2PT_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue2PT_2004(event.target.value);
 };

 const ChangeMaintainPT_2004 = async () => {
     try {
         const newValue = !maintainPT_2004;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
             { PT_2004_Maintain: newValue }
         );
         setMaintainPT_2004(newValue);
     } catch (error) {
         console.error(error);
     }
 };
 

     // =================================================================================================================== 

     const [PT_2005, setPT_2005] = useState<string | null>(null);
     const [inputValuePT_2005, setInputValuePT_2005] = useState<any>();
     const [inputValue2PT_2005, setInputValue2PT_2005] = useState<any>();
     const [PT_2005_High, setPT_2005_High] = useState<number | null>(null);
     const [PT_2005_Low, setPT_2005_Low] = useState<number | null>(null);
     const [exceedThresholdPT_2005, setExceedThresholdPT_2005] = useState(false); 
     const [maintainPT_2005, setMaintainPT_2005] = useState<boolean>(false);
    
     useEffect(() => {
         const PT_2005Value = parseFloat(PT_2005 as any);
         const highValue = PT_2005_High ?? NaN;
         const lowValue = PT_2005_Low ?? NaN;
    
         if (!isNaN(PT_2005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_2005) {
             setExceedThresholdPT_2005(PT_2005Value >= highValue || PT_2005Value <= lowValue);
         }
     }, [PT_2005, PT_2005_High, PT_2005_Low, maintainPT_2005]);
    
     const handleInputChangePT_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValuePT_2005(event.target.value);
     };
    
     const handleInputChange2PT_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValue2PT_2005(event.target.value);
     };
    
     const ChangeMaintainPT_2005 = async () => {
         try {
             const newValue = !maintainPT_2005;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { PT_2005_Maintain: newValue }
             );
             setMaintainPT_2005(newValue);
         } catch (error) {
             console.error(error);
         }
     };
     
     // =================================================================================================================== 


     const [TT_2003, setTT_2003] = useState<string | null>(null);
     const [inputValueTT_2003, setInputValueTT_2003] = useState<any>();
     const [inputValue2TT_2003, setInputValue2TT_2003] = useState<any>();
     const [TT_2003_High, setTT_2003_High] = useState<number | null>(null);
     const [TT_2003_Low, setTT_2003_Low] = useState<number | null>(null);
     const [exceedThresholdTT_2003, setExceedThresholdTT_2003] = useState(false); 
     const [maintainTT_2003, setMaintainTT_2003] = useState<boolean>(false);
    
     useEffect(() => {
         const TT_2003Value = parseFloat(TT_2003 as any);
         const highValue = TT_2003_High ?? NaN;
         const lowValue = TT_2003_Low ?? NaN;
    
         if (!isNaN(TT_2003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_2003) {
             setExceedThresholdTT_2003(TT_2003Value >= highValue || TT_2003Value <= lowValue);
         }
     }, [TT_2003, TT_2003_High, TT_2003_Low, maintainTT_2003]);
    
     const handleInputChangeTT_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValueTT_2003(event.target.value);
     };
    
     const handleInputChange2TT_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValue2TT_2003(event.target.value);
     };
    
     const ChangeMaintainTT_2003 = async () => {
         try {
             const newValue = !maintainTT_2003;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { TT_2003_Maintain: newValue }
             );
             setMaintainTT_2003(newValue);
         } catch (error) {
             console.error(error);
         }
     };

     
          // =================================================================================================================== 


          const [TG_2005, setTG_2005] = useState<string | null>(null);
     const [inputValueTG_2005, setInputValueTG_2005] = useState<any>();
     const [inputValue2TG_2005, setInputValue2TG_2005] = useState<any>();
     const [TG_2005_High, setTG_2005_High] = useState<number | null>(null);
     const [TG_2005_Low, setTG_2005_Low] = useState<number | null>(null);
     const [exceedThresholdTG_2005, setExceedThresholdTG_2005] = useState(false); 
     const [maintainTG_2005, setMaintainTG_2005] = useState<boolean>(false);
    
     useEffect(() => {
         const TG_2005Value = parseFloat(TG_2005 as any);
         const highValue = TG_2005_High ?? NaN;
         const lowValue = TG_2005_Low ?? NaN;
    
         if (!isNaN(TG_2005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTG_2005) {
             setExceedThresholdTG_2005(TG_2005Value >= highValue || TG_2005Value <= lowValue);
         }
     }, [TG_2005, TG_2005_High, TG_2005_Low, maintainTG_2005]);
    
     const handleInputChangeTG_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValueTG_2005(event.target.value);
     };
    
     const handleInputChange2TG_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValue2TG_2005(event.target.value);
     };
    
     const ChangeMaintainTG_2005 = async () => {
         try {
             const newValue = !maintainTG_2005;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { TG_2005_Maintain: newValue }
             );
             setMaintainTG_2005(newValue);
         } catch (error) {
             console.error(error);
         }
     };
     
     
          // =================================================================================================================== 
          const [WB_1001, setWB_1001] = useState<string | null>(null);
          const [inputValueWB_1001, setInputValueWB_1001] = useState<any>();
          const [inputValue2WB_1001, setInputValue2WB_1001] = useState<any>();
          const [WB_1001_High, setWB_1001_High] = useState<number | null>(null);
          const [WB_1001_Low, setWB_1001_Low] = useState<number | null>(null);
          const [exceedThresholdWB_1001, setExceedThresholdWB_1001] = useState(false); 
          const [maintainWB_1001, setMaintainWB_1001] = useState<boolean>(false);
         
          useEffect(() => {
              const WB_1001Value = parseFloat(WB_1001 as any);
              const highValue = WB_1001_High ?? NaN;
              const lowValue = WB_1001_Low ?? NaN;
         
              if (!isNaN(WB_1001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWB_1001) {
                  setExceedThresholdWB_1001(WB_1001Value >= highValue || WB_1001Value <= lowValue);
              }
          }, [WB_1001, WB_1001_High, WB_1001_Low, maintainWB_1001]);
         
          const handleInputChangeWB_1001 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueWB_1001(event.target.value);
          };
         
          const handleInputChange2WB_1001 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2WB_1001(event.target.value);
          };
         
          const ChangeMaintainWB_1001 = async () => {
              try {
                  const newValue = !maintainWB_1001;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { WB_1001_Maintain: newValue }
                  );
                  setMaintainWB_1001(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          
          
          // =================================================================================================================== 

          const [GD_2004, setGD_2004] = useState<string | null>(null);
          const [inputValueGD_2004, setInputValueGD_2004] = useState<any>();
          const [inputValue2GD_2004, setInputValue2GD_2004] = useState<any>();
          const [GD_2004_High, setGD_2004_High] = useState<number | null>(null);
          const [GD_2004_Low, setGD_2004_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2004, setExceedThresholdGD_2004] = useState(false); 
          const [maintainGD_2004, setMaintainGD_2004] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_2004Value = parseFloat(GD_2004 as any);
              const highValue = GD_2004_High ?? NaN;
              const lowValue = GD_2004_Low ?? NaN;
         
              if (!isNaN(GD_2004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2004) {
                  setExceedThresholdGD_2004(GD_2004Value >= highValue || GD_2004Value <= lowValue);
              }
          }, [GD_2004, GD_2004_High, GD_2004_Low, maintainGD_2004]);
         
          const handleInputChangeGD_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueGD_2004(event.target.value);
          };
         
          const handleInputChange2GD_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2GD_2004(event.target.value);
          };
         
          const ChangeMaintainGD_2004 = async () => {
              try {
                  const newValue = !maintainGD_2004;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { GD_2004_Maintain: newValue }
                  );
                  setMaintainGD_2004(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
     
          
          // =================================================================================================================== 

          const [GD_2003, setGD_2003] = useState<string | null>(null);
          const [inputValueGD_2003, setInputValueGD_2003] = useState<any>();
          const [inputValue2GD_2003, setInputValue2GD_2003] = useState<any>();
          const [GD_2003_High, setGD_2003_High] = useState<number | null>(null);
          const [GD_2003_Low, setGD_2003_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2003, setExceedThresholdGD_2003] = useState(false); 
          const [maintainGD_2003, setMaintainGD_2003] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_2003Value = parseFloat(GD_2003 as any);
              const highValue = GD_2003_High ?? NaN;
              const lowValue = GD_2003_Low ?? NaN;
         
              if (!isNaN(GD_2003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2003) {
                  setExceedThresholdGD_2003(GD_2003Value >= highValue || GD_2003Value <= lowValue);
              }
          }, [GD_2003, GD_2003_High, GD_2003_Low, maintainGD_2003]);
         
          const handleInputChangeGD_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueGD_2003(event.target.value);
          };
         
          const handleInputChange2GD_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2GD_2003(event.target.value);
          };
         
          const ChangeMaintainGD_2003 = async () => {
              try {
                  const newValue = !maintainGD_2003;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { GD_2003_Maintain: newValue }
                  );
                  setMaintainGD_2003(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
     
     
          // =================================================================================================================== 

          const [GD_2002, setGD_2002] = useState<string | null>(null);
          const [inputValueGD_2002, setInputValueGD_2002] = useState<any>();
          const [inputValue2GD_2002, setInputValue2GD_2002] = useState<any>();
          const [GD_2002_High, setGD_2002_High] = useState<number | null>(null);
          const [GD_2002_Low, setGD_2002_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2002, setExceedThresholdGD_2002] = useState(false); 
          const [maintainGD_2002, setMaintainGD_2002] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_2002Value = parseFloat(GD_2002 as any);
              const highValue = GD_2002_High ?? NaN;
              const lowValue = GD_2002_Low ?? NaN;
         
              if (!isNaN(GD_2002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2002) {
                  setExceedThresholdGD_2002(GD_2002Value >= highValue || GD_2002Value <= lowValue);
              }
          }, [GD_2002, GD_2002_High, GD_2002_Low, maintainGD_2002]);
         
          const handleInputChangeGD_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueGD_2002(event.target.value);
          };
         
          const handleInputChange2GD_2002 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2GD_2002(event.target.value);
          };
         
          const ChangeMaintainGD_2002 = async () => {
              try {
                  const newValue = !maintainGD_2002;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { GD_2002_Maintain: newValue }
                  );
                  setMaintainGD_2002(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
     
          // =================================================================================================================== 

          const [GD_2005, setGD_2005] = useState<string | null>(null);
          const [inputValueGD_2005, setInputValueGD_2005] = useState<any>();
          const [inputValue2GD_2005, setInputValue2GD_2005] = useState<any>();
          const [GD_2005_High, setGD_2005_High] = useState<number | null>(null);
          const [GD_2005_Low, setGD_2005_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2005, setExceedThresholdGD_2005] = useState(false); 
          const [maintainGD_2005, setMaintainGD_2005] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_2005Value = parseFloat(GD_2005 as any);
              const highValue = GD_2005_High ?? NaN;
              const lowValue = GD_2005_Low ?? NaN;
         
              if (!isNaN(GD_2005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2005) {
                  setExceedThresholdGD_2005(GD_2005Value >= highValue || GD_2005Value <= lowValue);
              }
          }, [GD_2005, GD_2005_High, GD_2005_Low, maintainGD_2005]);
         
          const handleInputChangeGD_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueGD_2005(event.target.value);
          };
         
          const handleInputChange2GD_2005 = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2GD_2005(event.target.value);
          };
         
          const ChangeMaintainGD_2005 = async () => {
              try {
                  const newValue = !maintainGD_2005;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { GD_2005_Maintain: newValue }
                  );
                  setMaintainGD_2005(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [GD_2006, setGD_2006] = useState<string | null>(null);
    const [inputValueGD_2006, setInputValueGD_2006] = useState<any>();
    const [inputValue2GD_2006, setInputValue2GD_2006] = useState<any>();
    const [GD_2006_High, setGD_2006_High] = useState<number | null>(null);
    const [GD_2006_Low, setGD_2006_Low] = useState<number | null>(null);
    const [exceedThresholdGD_2006, setExceedThresholdGD_2006] = useState(false); 
    const [maintainGD_2006, setMaintainGD_2006] = useState<boolean>(false);
   
    useEffect(() => {
        const GD_2006Value = parseFloat(GD_2006 as any);
        const highValue = GD_2006_High ?? NaN;
        const lowValue = GD_2006_Low ?? NaN;
   
        if (!isNaN(GD_2006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_2006) {
            setExceedThresholdGD_2006(GD_2006Value >= highValue || GD_2006Value <= lowValue);
        }
    }, [GD_2006, GD_2006_High, GD_2006_Low, maintainGD_2006]);
   
    const handleInputChangeGD_2006 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueGD_2006(event.target.value);
    };
   
    const handleInputChange2GD_2006 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2GD_2006(event.target.value);
    };
   
    const ChangeMaintainGD_2006 = async () => {
        try {
            const newValue = !maintainGD_2006;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { GD_2006_Maintain: newValue }
            );
            setMaintainGD_2006(newValue);
        } catch (error) {
            console.error(error);
        }
    };

    // =================================================================================================================== 
    
        // =================================================================================================================== 

        const [TM_2002_SNG, setTM_2002_SNG] = useState<string | null>(null);
        const [inputValueTM_2002_SNG, setInputValueTM_2002_SNG] = useState<any>();
        const [inputValue2TM_2002_SNG, setInputValue2TM_2002_SNG] = useState<any>();
        const [TM_2002_SNG_High, setTM_2002_SNG_High] = useState<number | null>(null);
        const [TM_2002_SNG_Low, setTM_2002_SNG_Low] = useState<number | null>(null);
        const [exceedThresholdTM_2002_SNG, setExceedThresholdTM_2002_SNG] = useState(false); 
        const [maintainTM_2002_SNG, setMaintainTM_2002_SNG] = useState<boolean>(false);
       
        useEffect(() => {
            const TM_2002_SNGValue = parseFloat(TM_2002_SNG as any);
            const highValue = TM_2002_SNG_High ?? NaN;
            const lowValue = TM_2002_SNG_Low ?? NaN;
       
            if (!isNaN(TM_2002_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_2002_SNG) {
                setExceedThresholdTM_2002_SNG(TM_2002_SNGValue >= highValue || TM_2002_SNGValue <= lowValue);
            }
        }, [TM_2002_SNG, TM_2002_SNG_High, TM_2002_SNG_Low, maintainTM_2002_SNG]);
       
        const handleInputChangeTM_2002_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValueTM_2002_SNG(event.target.value);
        };
       
        const handleInputChange2TM_2002_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue2TM_2002_SNG(event.target.value);
        };
       
        const ChangeMaintainTM_2002_SNG = async () => {
            try {
                const newValue = !maintainTM_2002_SNG;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { TM_2002_SNG_Maintain: newValue }
                );
                setMaintainTM_2002_SNG(newValue);
            } catch (error) {
                console.error(error);
            }
        };
    
        // =================================================================================================================== 

            // =================================================================================================================== 

            const [TM_2003_SNG, setTM_2003_SNG] = useState<string | null>(null);
            const [inputValueTM_2003_SNG, setInputValueTM_2003_SNG] = useState<any>();
            const [inputValue2TM_2003_SNG, setInputValue2TM_2003_SNG] = useState<any>();
            const [TM_2003_SNG_High, setTM_2003_SNG_High] = useState<number | null>(null);
            const [TM_2003_SNG_Low, setTM_2003_SNG_Low] = useState<number | null>(null);
            const [exceedThresholdTM_2003_SNG, setExceedThresholdTM_2003_SNG] = useState(false); 
            const [maintainTM_2003_SNG, setMaintainTM_2003_SNG] = useState<boolean>(false);
           
            useEffect(() => {
                const TM_2003_SNGValue = parseFloat(TM_2003_SNG as any);
                const highValue = TM_2003_SNG_High ?? NaN;
                const lowValue = TM_2003_SNG_Low ?? NaN;
           
                if (!isNaN(TM_2003_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_2003_SNG) {
                    setExceedThresholdTM_2003_SNG(TM_2003_SNGValue >= highValue || TM_2003_SNGValue <= lowValue);
                }
            }, [TM_2003_SNG, TM_2003_SNG_High, TM_2003_SNG_Low, maintainTM_2003_SNG]);
           
            const handleInputChangeTM_2003_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValueTM_2003_SNG(event.target.value);
            };
           
            const handleInputChange2TM_2003_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue2TM_2003_SNG(event.target.value);
            };
           
            const ChangeMaintainTM_2003_SNG = async () => {
                try {
                    const newValue = !maintainTM_2003_SNG;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { TM_2003_SNG_Maintain: newValue }
                    );
                    setMaintainTM_2003_SNG(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
        

    // =================================================================================================================== 
    

    const [TOTAL_SNG, setTOTAL_SNG] = useState<string | null>(null);
    const [inputValueTOTAL_SNG, setInputValueTOTAL_SNG] = useState<any>();
    const [inputValue2TOTAL_SNG, setInputValue2TOTAL_SNG] = useState<any>();
    const [TOTAL_SNG_High, setTOTAL_SNG_High] = useState<number | null>(null);
    const [TOTAL_SNG_Low, setTOTAL_SNG_Low] = useState<number | null>(null);
    const [exceedThresholdTOTAL_SNG, setExceedThresholdTOTAL_SNG] = useState(false); 
    const [maintainTOTAL_SNG, setMaintainTOTAL_SNG] = useState<boolean>(false);
   
    useEffect(() => {
        const TOTAL_SNGValue = parseFloat(TOTAL_SNG as any);
        const highValue = TOTAL_SNG_High ?? NaN;
        const lowValue = TOTAL_SNG_Low ?? NaN;
   
        if (!isNaN(TOTAL_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTOTAL_SNG) {
            setExceedThresholdTOTAL_SNG(TOTAL_SNGValue >= highValue || TOTAL_SNGValue <= lowValue);
        }
    }, [TOTAL_SNG, TOTAL_SNG_High, TOTAL_SNG_Low, maintainTOTAL_SNG]);
   
    const handleInputChangeTOTAL_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueTOTAL_SNG(event.target.value);
    };
   
    const handleInputChange2TOTAL_SNG = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2TOTAL_SNG(event.target.value);
    };
   
    const ChangeMaintainTOTAL_SNG = async () => {
        try {
            const newValue = !maintainTOTAL_SNG;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { TOTAL_SNG_Maintain: newValue }
            );
            setMaintainTOTAL_SNG(newValue);
        } catch (error) {
            console.error(error);
        }
    };



    // =================================================================================================================== 
    
        // =================================================================================================================== 

        const [SDV_2004, setSDV_2004] = useState<string | null>(null);
        const [inputValueSDV_2004, setInputValueSDV_2004] = useState<any>();
        const [inputValue2SDV_2004, setInputValue2SDV_2004] = useState<any>();
        const [SDV_2004_High, setSDV_2004_High] = useState<number | null>(null);
        const [SDV_2004_Low, setSDV_2004_Low] = useState<number | null>(null);
        const [exceedThresholdSDV_2004, setExceedThresholdSDV_2004] = useState(false); 
        const [maintainSDV_2004, setMaintainSDV_2004] = useState<boolean>(false);
       
        useEffect(() => {
            const SDV_2004Value = parseFloat(SDV_2004 as any);
            const highValue = SDV_2004_High ?? NaN;
            const lowValue = SDV_2004_Low ?? NaN;
       
            if (!isNaN(SDV_2004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_2004) {
                setExceedThresholdSDV_2004(SDV_2004Value >= highValue || SDV_2004Value <= lowValue);
            }
        }, [SDV_2004, SDV_2004_High, SDV_2004_Low, maintainSDV_2004]);
       
        const handleInputChangeSDV_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValueSDV_2004(event.target.value);
        };
       
        const handleInputChange2SDV_2004 = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue2SDV_2004(event.target.value);
        };
       
        const ChangeMaintainSDV_2004 = async () => {
            try {
                const newValue = !maintainSDV_2004;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { SDV_2004_Maintain: newValue }
                );
                setMaintainSDV_2004(newValue);
            } catch (error) {
                console.error(error);
            }
        };


// =================================================================================================================== 


const [SDV_2003, setSDV_2003] = useState<string | null>(null);
const [inputValueSDV_2003, setInputValueSDV_2003] = useState<any>();
const [inputValue2SDV_2003, setInputValue2SDV_2003] = useState<any>();
const [SDV_2003_High, setSDV_2003_High] = useState<number | null>(null);
const [SDV_2003_Low, setSDV_2003_Low] = useState<number | null>(null);
const [exceedThresholdSDV_2003, setExceedThresholdSDV_2003] = useState(false); 
const [maintainSDV_2003, setMaintainSDV_2003] = useState<boolean>(false);

useEffect(() => {
    const SDV_2003Value = parseFloat(SDV_2003 as any);
    const highValue = SDV_2003_High ?? NaN;
    const lowValue = SDV_2003_Low ?? NaN;

    if (!isNaN(SDV_2003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_2003) {
        setExceedThresholdSDV_2003(SDV_2003Value >= highValue || SDV_2003Value <= lowValue);
    }
}, [SDV_2003, SDV_2003_High, SDV_2003_Low, maintainSDV_2003]);

const handleInputChangeSDV_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueSDV_2003(event.target.value);
};

const handleInputChange2SDV_2003 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2SDV_2003(event.target.value);
};

const ChangeMaintainSDV_2003 = async () => {
    try {
        const newValue = !maintainSDV_2003;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
            { SDV_2003_Maintain: newValue }
        );
        setMaintainSDV_2003(newValue);
    } catch (error) {
        console.error(error);
    }
};

// =================================================================================================================== 

    // =================================================================================================================== 

    const [GD1_STATUS, setGD1_STATUS] = useState<string | null>(null);
    const [inputValueGD1_STATUS, setInputValueGD1_STATUS] = useState<any>();
    const [inputValue2GD1_STATUS, setInputValue2GD1_STATUS] = useState<any>();
    const [GD1_STATUS_High, setGD1_STATUS_High] = useState<number | null>(null);
    const [GD1_STATUS_Low, setGD1_STATUS_Low] = useState<number | null>(null);
    const [exceedThresholdGD1_STATUS, setExceedThresholdGD1_STATUS] = useState(false); 
    const [maintainGD1_STATUS, setMaintainGD1_STATUS] = useState<boolean>(false);
    
    useEffect(() => {
        const GD1_STATUSValue = parseFloat(GD1_STATUS as any);
        const highValue = GD1_STATUS_High ?? NaN;
        const lowValue = GD1_STATUS_Low ?? NaN;
    
        if (!isNaN(GD1_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD1_STATUS) {
            setExceedThresholdGD1_STATUS(GD1_STATUSValue >= highValue || GD1_STATUSValue <= lowValue);
        }
    }, [GD1_STATUS, GD1_STATUS_High, GD1_STATUS_Low, maintainGD1_STATUS]);
    
    const handleInputChangeGD1_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueGD1_STATUS(event.target.value);
    };
    
    const handleInputChange2GD1_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2GD1_STATUS(event.target.value);
    };
    
    const ChangeMaintainGD1_STATUS = async () => {
        try {
            const newValue = !maintainGD1_STATUS;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { GD1_STATUS_Maintain: newValue }
            );
            setMaintainGD1_STATUS(newValue);
        } catch (error) {
            console.error(error);
        }
    };
    


// =================================================================================================================== 


        // =================================================================================================================== 

        const [GD2_STATUS, setGD2_STATUS] = useState<string | null>(null);
        const [inputValueGD2_STATUS, setInputValueGD2_STATUS] = useState<any>();
        const [inputValue2GD2_STATUS, setInputValue2GD2_STATUS] = useState<any>();
        const [GD2_STATUS_High, setGD2_STATUS_High] = useState<number | null>(null);
        const [GD2_STATUS_Low, setGD2_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD2_STATUS, setExceedThresholdGD2_STATUS] = useState(false); 
        const [maintainGD2_STATUS, setMaintainGD2_STATUS] = useState<boolean>(false);
        
        useEffect(() => {
            const GD2_STATUSValue = parseFloat(GD2_STATUS as any);
            const highValue = GD2_STATUS_High ?? NaN;
            const lowValue = GD2_STATUS_Low ?? NaN;
        
            if (!isNaN(GD2_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD2_STATUS) {
                setExceedThresholdGD2_STATUS(GD2_STATUSValue >= highValue || GD2_STATUSValue <= lowValue);
            }
        }, [GD2_STATUS, GD2_STATUS_High, GD2_STATUS_Low, maintainGD2_STATUS]);
        
        const handleInputChangeGD2_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValueGD2_STATUS(event.target.value);
        };
        
        const handleInputChange2GD2_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue2GD2_STATUS(event.target.value);
        };
        
        const ChangeMaintainGD2_STATUS = async () => {
            try {
                const newValue = !maintainGD2_STATUS;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { GD2_STATUS_Maintain: newValue }
                );
                setMaintainGD2_STATUS(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        
        
        
        // =================================================================================================================== 
        
        
        const [GD3_STATUS, setGD3_STATUS] = useState<string | null>(null);
        const [inputValueGD3_STATUS, setInputValueGD3_STATUS] = useState<any>();
        const [inputValue2GD3_STATUS, setInputValue2GD3_STATUS] = useState<any>();
        const [GD3_STATUS_High, setGD3_STATUS_High] = useState<number | null>(null);
        const [GD3_STATUS_Low, setGD3_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD3_STATUS, setExceedThresholdGD3_STATUS] = useState(false); 
        const [maintainGD3_STATUS, setMaintainGD3_STATUS] = useState<boolean>(false);
        
        useEffect(() => {
            const GD3_STATUSValue = parseFloat(GD3_STATUS as any);
            const highValue = GD3_STATUS_High ?? NaN;
            const lowValue = GD3_STATUS_Low ?? NaN;
        
            if (!isNaN(GD3_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD3_STATUS) {
                setExceedThresholdGD3_STATUS(GD3_STATUSValue >= highValue || GD3_STATUSValue <= lowValue);
            }
        }, [GD3_STATUS, GD3_STATUS_High, GD3_STATUS_Low, maintainGD3_STATUS]);
        
        const handleInputChangeGD3_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValueGD3_STATUS(event.target.value);
        };
        
        const handleInputChange2GD3_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue2GD3_STATUS(event.target.value);
        };
        
        const ChangeMaintainGD3_STATUS = async () => {
            try {
                const newValue = !maintainGD3_STATUS;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { GD3_STATUS_Maintain: newValue }
                );
                setMaintainGD3_STATUS(newValue);
            } catch (error) {
                console.error(error);
            }
        };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
            const [GD4_STATUS, setGD4_STATUS] = useState<string | null>(null);
            const [inputValueGD4_STATUS, setInputValueGD4_STATUS] = useState<any>();
            const [inputValue2GD4_STATUS, setInputValue2GD4_STATUS] = useState<any>();
            const [GD4_STATUS_High, setGD4_STATUS_High] = useState<number | null>(null);
            const [GD4_STATUS_Low, setGD4_STATUS_Low] = useState<number | null>(null);
            const [exceedThresholdGD4_STATUS, setExceedThresholdGD4_STATUS] = useState(false); 
            const [maintainGD4_STATUS, setMaintainGD4_STATUS] = useState<boolean>(false);
            
            useEffect(() => {
                const GD4_STATUSValue = parseFloat(GD4_STATUS as any);
                const highValue = GD4_STATUS_High ?? NaN;
                const lowValue = GD4_STATUS_Low ?? NaN;
            
                if (!isNaN(GD4_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD4_STATUS) {
                    setExceedThresholdGD4_STATUS(GD4_STATUSValue >= highValue || GD4_STATUSValue <= lowValue);
                }
            }, [GD4_STATUS, GD4_STATUS_High, GD4_STATUS_Low, maintainGD4_STATUS]);
            
            const handleInputChangeGD4_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValueGD4_STATUS(event.target.value);
            };
            
            const handleInputChange2GD4_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue2GD4_STATUS(event.target.value);
            };
            
            const ChangeMaintainGD4_STATUS = async () => {
                try {
                    const newValue = !maintainGD4_STATUS;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { GD4_STATUS_Maintain: newValue }
                    );
                    setMaintainGD4_STATUS(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            
        
        
        // =================================================================================================================== 
        

            // =================================================================================================================== 
        
   
            const [GD5_STATUS, setGD5_STATUS] = useState<string | null>(null);
            const [inputValueGD5_STATUS, setInputValueGD5_STATUS] = useState<any>();
            const [inputValue2GD5_STATUS, setInputValue2GD5_STATUS] = useState<any>();
            const [GD5_STATUS_High, setGD5_STATUS_High] = useState<number | null>(null);
            const [GD5_STATUS_Low, setGD5_STATUS_Low] = useState<number | null>(null);
            const [exceedThresholdGD5_STATUS, setExceedThresholdGD5_STATUS] = useState(false); 
            const [maintainGD5_STATUS, setMaintainGD5_STATUS] = useState<boolean>(false);
            
            useEffect(() => {
                const GD5_STATUSValue = parseFloat(GD5_STATUS as any);
                const highValue = GD5_STATUS_High ?? NaN;
                const lowValue = GD5_STATUS_Low ?? NaN;
            
                if (!isNaN(GD5_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD5_STATUS) {
                    setExceedThresholdGD5_STATUS(GD5_STATUSValue >= highValue || GD5_STATUSValue <= lowValue);
                }
            }, [GD5_STATUS, GD5_STATUS_High, GD5_STATUS_Low, maintainGD5_STATUS]);
            
            const handleInputChangeGD5_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValueGD5_STATUS(event.target.value);
            };
            
            const handleInputChange2GD5_STATUS = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue2GD5_STATUS(event.target.value);
            };
            
            const ChangeMaintainGD5_STATUS = async () => {
                try {
                    const newValue = !maintainGD5_STATUS;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { GD5_STATUS_Maintain: newValue }
                    );
                    setMaintainGD5_STATUS(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            
            
            
            // =================================================================================================================== 

            

            // =================================================================================================================== 
        
            const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
            const [inputValueEVC_02_Vm_of_Last_Day, setInputValueEVC_02_Vm_of_Last_Day] = useState<any>();
            const [inputValue2EVC_02_Vm_of_Last_Day, setInputValue2EVC_02_Vm_of_Last_Day] = useState<any>();
            const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
            const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
            const [exceedThresholdEVC_02_Vm_of_Last_Day, setExceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); 
            const [maintainEVC_02_Vm_of_Last_Day, setMaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);
            
            useEffect(() => {
                const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day as any);
                const highValue = EVC_02_Vm_of_Last_Day_High ?? NaN;
                const lowValue = EVC_02_Vm_of_Last_Day_Low ?? NaN;
            
                if (!isNaN(EVC_02_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Last_Day) {
                    setExceedThresholdEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_DayValue >= highValue || EVC_02_Vm_of_Last_DayValue <= lowValue);
                }
            }, [EVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low, maintainEVC_02_Vm_of_Last_Day]);
            
            const handleInputChangeEVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValueEVC_02_Vm_of_Last_Day(event.target.value);
            };
            
            const handleInputChange2EVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue2EVC_02_Vm_of_Last_Day(event.target.value);
            };
            
            const ChangeMaintainEVC_02_Vm_of_Last_Day = async () => {
                try {
                    const newValue = !maintainEVC_02_Vm_of_Last_Day;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                } catch (error) {
                    console.error(error);
                }
            };
            
            
            
            // =================================================================================================================== 
            
 // =================================================================================================================== 

 const [ESD, setESD] = useState<string | null>(null);
 const [inputValueESD, setInputValueESD] = useState<any>();
 const [inputValue2ESD, setInputValue2ESD] = useState<any>();
 const [ESD_High, setESD_High] = useState<number | null>(null);
 const [ESD_Low, setESD_Low] = useState<number | null>(null);
 const [exceedThresholdESD, setExceedThresholdESD] = useState(false); 
 const [maintainESD, setMaintainESD] = useState<boolean>(false);
 
 useEffect(() => {
     const ESDValue = parseFloat(ESD as any);
     const highValue = ESD_High ?? NaN;
     const lowValue = ESD_Low ?? NaN;
 
     if (!isNaN(ESDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD) {
         setExceedThresholdESD(ESDValue >= highValue || ESDValue <= lowValue);
     }
 }, [ESD, ESD_High, ESD_Low, maintainESD]);
 
 const handleInputChangeESD = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValueESD(event.target.value);
 };
 
 const handleInputChange2ESD = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue2ESD(event.target.value);
 };
 
 const ChangeMaintainESD = async () => {
     try {
         const newValue = !maintainESD;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
             { ESD_Maintain: newValue }
         );
         setMaintainESD(newValue);
     } catch (error) {
         console.error(error);
     }
 };
      // =================================================================================================================== 
      const [VAPORIZER_1, setVAPORIZER_1] = useState<string | null>(null);
      const [inputValueVAPORIZER_1, setInputValueVAPORIZER_1] = useState<any>();
      const [inputValue2VAPORIZER_1, setInputValue2VAPORIZER_1] = useState<any>();
      const [VAPORIZER_1_High, setVAPORIZER_1_High] = useState<number | null>(null);
      const [VAPORIZER_1_Low, setVAPORIZER_1_Low] = useState<number | null>(null);
      const [exceedThresholdVAPORIZER_1, setExceedThresholdVAPORIZER_1] = useState(false); 
      const [maintainVAPORIZER_1, setMaintainVAPORIZER_1] = useState<boolean>(false);
      
      useEffect(() => {
          const VAPORIZER_1Value = parseFloat(VAPORIZER_1 as any);
          const highValue = VAPORIZER_1_High ?? NaN;
          const lowValue = VAPORIZER_1_Low ?? NaN;
      
          if (!isNaN(VAPORIZER_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_1) {
              setExceedThresholdVAPORIZER_1(VAPORIZER_1Value >= highValue || VAPORIZER_1Value <= lowValue);
          }
      }, [VAPORIZER_1, VAPORIZER_1_High, VAPORIZER_1_Low, maintainVAPORIZER_1]);
      
      const handleInputChangeVAPORIZER_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValueVAPORIZER_1(event.target.value);
      };
      
      const handleInputChange2VAPORIZER_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue2VAPORIZER_1(event.target.value);
      };
      
      const ChangeMaintainVAPORIZER_1 = async () => {
          try {
              const newValue = !maintainVAPORIZER_1;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                  { VAPORIZER_1_Maintain: newValue }
              );
              setMaintainVAPORIZER_1(newValue);
          } catch (error) {
              console.error(error);
          }
      };
 
 
      // =================================================================================================================== 
 
 
      const [VAPORIZER_2, setVAPORIZER_2] = useState<string | null>(null);
      const [inputValueVAPORIZER_2, setInputValueVAPORIZER_2] = useState<any>();
      const [inputValue2VAPORIZER_2, setInputValue2VAPORIZER_2] = useState<any>();
      const [VAPORIZER_2_High, setVAPORIZER_2_High] = useState<number | null>(null);
      const [VAPORIZER_2_Low, setVAPORIZER_2_Low] = useState<number | null>(null);
      const [exceedThresholdVAPORIZER_2, setExceedThresholdVAPORIZER_2] = useState(false); 
      const [maintainVAPORIZER_2, setMaintainVAPORIZER_2] = useState<boolean>(false);
      
      useEffect(() => {
          const VAPORIZER_2Value = parseFloat(VAPORIZER_2 as any);
          const highValue = VAPORIZER_2_High ?? NaN;
          const lowValue = VAPORIZER_2_Low ?? NaN;
      
          if (!isNaN(VAPORIZER_2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_2) {
              setExceedThresholdVAPORIZER_2(VAPORIZER_2Value >= highValue || VAPORIZER_2Value <= lowValue);
          }
      }, [VAPORIZER_2, VAPORIZER_2_High, VAPORIZER_2_Low, maintainVAPORIZER_2]);
      
      const handleInputChangeVAPORIZER_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValueVAPORIZER_2(event.target.value);
      };
      
      const handleInputChange2VAPORIZER_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue2VAPORIZER_2(event.target.value);
      };
      
      const ChangeMaintainVAPORIZER_2 = async () => {
          try {
              const newValue = !maintainVAPORIZER_2;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                  { VAPORIZER_2_Maintain: newValue }
              );
              setMaintainVAPORIZER_2(newValue);
          } catch (error) {
              console.error(error);
          }
      };
 
 
      // =================================================================================================================== 
 
 
 
      const [VAPORIZER_3, setVAPORIZER_3] = useState<string | null>(null);
      const [inputValueVAPORIZER_3, setInputValueVAPORIZER_3] = useState<any>();
      const [inputValue2VAPORIZER_3, setInputValue2VAPORIZER_3] = useState<any>();
      const [VAPORIZER_3_High, setVAPORIZER_3_High] = useState<number | null>(null);
      const [VAPORIZER_3_Low, setVAPORIZER_3_Low] = useState<number | null>(null);
      const [exceedThresholdVAPORIZER_3, setExceedThresholdVAPORIZER_3] = useState(false); 
      const [maintainVAPORIZER_3, setMaintainVAPORIZER_3] = useState<boolean>(false);
      
      useEffect(() => {
          const VAPORIZER_3Value = parseFloat(VAPORIZER_3 as any);
          const highValue = VAPORIZER_3_High ?? NaN;
          const lowValue = VAPORIZER_3_Low ?? NaN;
      
          if (!isNaN(VAPORIZER_3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_3) {
              setExceedThresholdVAPORIZER_3(VAPORIZER_3Value >= highValue || VAPORIZER_3Value <= lowValue);
          }
      }, [VAPORIZER_3, VAPORIZER_3_High, VAPORIZER_3_Low, maintainVAPORIZER_3]);
      
      const handleInputChangeVAPORIZER_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValueVAPORIZER_3(event.target.value);
      };
      
      const handleInputChange2VAPORIZER_3 = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue2VAPORIZER_3(event.target.value);
      };
      
      const ChangeMaintainVAPORIZER_3 = async () => {
          try {
              const newValue = !maintainVAPORIZER_3;
              await httpApi.post(
                  `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                  { VAPORIZER_3_Maintain: newValue }
              );
              setMaintainVAPORIZER_3(newValue);
          } catch (error) {
              console.error(error);
          }
      };
 
      
      
           // =================================================================================================================== 
 
 
           const [VAPORIZER_4, setVAPORIZER_4] = useState<string | null>(null);
           const [inputValueVAPORIZER_4, setInputValueVAPORIZER_4] = useState<any>();
           const [inputValue2VAPORIZER_4, setInputValue2VAPORIZER_4] = useState<any>();
           const [VAPORIZER_4_High, setVAPORIZER_4_High] = useState<number | null>(null);
           const [VAPORIZER_4_Low, setVAPORIZER_4_Low] = useState<number | null>(null);
           const [exceedThresholdVAPORIZER_4, setExceedThresholdVAPORIZER_4] = useState(false); 
           const [maintainVAPORIZER_4, setMaintainVAPORIZER_4] = useState<boolean>(false);
           
           useEffect(() => {
               const VAPORIZER_4Value = parseFloat(VAPORIZER_4 as any);
               const highValue = VAPORIZER_4_High ?? NaN;
               const lowValue = VAPORIZER_4_Low ?? NaN;
           
               if (!isNaN(VAPORIZER_4Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_4) {
                   setExceedThresholdVAPORIZER_4(VAPORIZER_4Value >= highValue || VAPORIZER_4Value <= lowValue);
               }
           }, [VAPORIZER_4, VAPORIZER_4_High, VAPORIZER_4_Low, maintainVAPORIZER_4]);
           
           const handleInputChangeVAPORIZER_4 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValueVAPORIZER_4(event.target.value);
           };
           
           const handleInputChange2VAPORIZER_4 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2VAPORIZER_4(event.target.value);
           };
           
           const ChangeMaintainVAPORIZER_4 = async () => {
               try {
                   const newValue = !maintainVAPORIZER_4;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { VAPORIZER_4_Maintain: newValue }
                   );
                   setMaintainVAPORIZER_4(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
      
           
           // =================================================================================================================== 
 
           const [COOLING_V, setCOOLING_V] = useState<string | null>(null);
           const [inputValueCOOLING_V, setInputValueCOOLING_V] = useState<any>();
           const [inputValue2COOLING_V, setInputValue2COOLING_V] = useState<any>();
           const [COOLING_V_High, setCOOLING_V_High] = useState<number | null>(null);
           const [COOLING_V_Low, setCOOLING_V_Low] = useState<number | null>(null);
           const [exceedThresholdCOOLING_V, setExceedThresholdCOOLING_V] = useState(false); 
           const [maintainCOOLING_V, setMaintainCOOLING_V] = useState<boolean>(false);
           
           useEffect(() => {
               const COOLING_VValue = parseFloat(COOLING_V as any);
               const highValue = COOLING_V_High ?? NaN;
               const lowValue = COOLING_V_Low ?? NaN;
           
               if (!isNaN(COOLING_VValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainCOOLING_V) {
                   setExceedThresholdCOOLING_V(COOLING_VValue >= highValue || COOLING_VValue <= lowValue);
               }
           }, [COOLING_V, COOLING_V_High, COOLING_V_Low, maintainCOOLING_V]);
           
           const handleInputChangeCOOLING_V = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValueCOOLING_V(event.target.value);
           };
           
           const handleInputChange2COOLING_V = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2COOLING_V(event.target.value);
           };
           
           const ChangeMaintainCOOLING_V = async () => {
               try {
                   const newValue = !maintainCOOLING_V;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { COOLING_V_Maintain: newValue }
                   );
                   setMaintainCOOLING_V(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
           
           // =================================================================================================================== 
 
 
           const [PERCENT_LPG, setPERCENT_LPG] = useState<string | null>(null);
           const [inputValuePERCENT_LPG, setInputValuePERCENT_LPG] = useState<any>();
           const [inputValue2PERCENT_LPG, setInputValue2PERCENT_LPG] = useState<any>();
           const [PERCENT_LPG_High, setPERCENT_LPG_High] = useState<number | null>(null);
           const [PERCENT_LPG_Low, setPERCENT_LPG_Low] = useState<number | null>(null);
           const [exceedThresholdPERCENT_LPG, setExceedThresholdPERCENT_LPG] = useState(false); 
           const [maintainPERCENT_LPG, setMaintainPERCENT_LPG] = useState<boolean>(false);
           
           useEffect(() => {
               const PERCENT_LPGValue = parseFloat(PERCENT_LPG as any);
               const highValue = PERCENT_LPG_High ?? NaN;
               const lowValue = PERCENT_LPG_Low ?? NaN;
           
               if (!isNaN(PERCENT_LPGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPERCENT_LPG) {
                   setExceedThresholdPERCENT_LPG(PERCENT_LPGValue >= highValue || PERCENT_LPGValue <= lowValue);
               }
           }, [PERCENT_LPG, PERCENT_LPG_High, PERCENT_LPG_Low, maintainPERCENT_LPG]);
           
           const handleInputChangePERCENT_LPG = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValuePERCENT_LPG(event.target.value);
           };
           
           const handleInputChange2PERCENT_LPG = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2PERCENT_LPG(event.target.value);
           };
           
           const ChangeMaintainPERCENT_LPG = async () => {
               try {
                   const newValue = !maintainPERCENT_LPG;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { PERCENT_LPG_Maintain: newValue }
                   );
                   setMaintainPERCENT_LPG(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
           
           // =================================================================================================================== 
 
           const [FCV_2001, setFCV_2001] = useState<string | null>(null);
           const [inputValueFCV_2001, setInputValueFCV_2001] = useState<any>();
           const [inputValue2FCV_2001, setInputValue2FCV_2001] = useState<any>();
           const [FCV_2001_High, setFCV_2001_High] = useState<number | null>(null);
           const [FCV_2001_Low, setFCV_2001_Low] = useState<number | null>(null);
           const [exceedThresholdFCV_2001, setExceedThresholdFCV_2001] = useState(false); 
           const [maintainFCV_2001, setMaintainFCV_2001] = useState<boolean>(false);
           
           useEffect(() => {
               const FCV_2001Value = parseFloat(FCV_2001 as any);
               const highValue = FCV_2001_High ?? NaN;
               const lowValue = FCV_2001_Low ?? NaN;
           
               if (!isNaN(FCV_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFCV_2001) {
                   setExceedThresholdFCV_2001(FCV_2001Value >= highValue || FCV_2001Value <= lowValue);
               }
           }, [FCV_2001, FCV_2001_High, FCV_2001_Low, maintainFCV_2001]);
           
           const handleInputChangeFCV_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValueFCV_2001(event.target.value);
           };
           
           const handleInputChange2FCV_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2FCV_2001(event.target.value);
           };
           
           const ChangeMaintainFCV_2001 = async () => {
               try {
                   const newValue = !maintainFCV_2001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { FCV_2001_Maintain: newValue }
                   );
                   setMaintainFCV_2001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
           // =================================================================================================================== 
 
           const [PERCENT_AIR, setPERCENT_AIR] = useState<string | null>(null);
           const [inputValuePERCENT_AIR, setInputValuePERCENT_AIR] = useState<any>();
           const [inputValue2PERCENT_AIR, setInputValue2PERCENT_AIR] = useState<any>();
           const [PERCENT_AIR_High, setPERCENT_AIR_High] = useState<number | null>(null);
           const [PERCENT_AIR_Low, setPERCENT_AIR_Low] = useState<number | null>(null);
           const [exceedThresholdPERCENT_AIR, setExceedThresholdPERCENT_AIR] = useState(false); 
           const [maintainPERCENT_AIR, setMaintainPERCENT_AIR] = useState<boolean>(false);
           
           useEffect(() => {
               const PERCENT_AIRValue = parseFloat(PERCENT_AIR as any);
               const highValue = PERCENT_AIR_High ?? NaN;
               const lowValue = PERCENT_AIR_Low ?? NaN;
           
               if (!isNaN(PERCENT_AIRValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPERCENT_AIR) {
                   setExceedThresholdPERCENT_AIR(PERCENT_AIRValue >= highValue || PERCENT_AIRValue <= lowValue);
               }
           }, [PERCENT_AIR, PERCENT_AIR_High, PERCENT_AIR_Low, maintainPERCENT_AIR]);
           
           const handleInputChangePERCENT_AIR = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValuePERCENT_AIR(event.target.value);
           };
           
           const handleInputChange2PERCENT_AIR = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2PERCENT_AIR(event.target.value);
           };
           
           const ChangeMaintainPERCENT_AIR = async () => {
               try {
                   const newValue = !maintainPERCENT_AIR;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { PERCENT_AIR_Maintain: newValue }
                   );
                   setMaintainPERCENT_AIR(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
      
           // =================================================================================================================== 
           
     // =================================================================================================================== 
 
     const [HV_1001, setHV_1001] = useState<string | null>(null);
           const [inputValueHV_1001, setInputValueHV_1001] = useState<any>();
           const [inputValue2HV_1001, setInputValue2HV_1001] = useState<any>();
           const [HV_1001_High, setHV_1001_High] = useState<number | null>(null);
           const [HV_1001_Low, setHV_1001_Low] = useState<number | null>(null);
           const [exceedThresholdHV_1001, setExceedThresholdHV_1001] = useState(false); 
           const [maintainHV_1001, setMaintainHV_1001] = useState<boolean>(false);
           
           useEffect(() => {
               const HV_1001Value = parseFloat(HV_1001 as any);
               const highValue = HV_1001_High ?? NaN;
               const lowValue = HV_1001_Low ?? NaN;
           
               if (!isNaN(HV_1001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHV_1001) {
                   setExceedThresholdHV_1001(HV_1001Value >= highValue || HV_1001Value <= lowValue);
               }
           }, [HV_1001, HV_1001_High, HV_1001_Low, maintainHV_1001]);
           
           const handleInputChangeHV_1001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValueHV_1001(event.target.value);
           };
           
           const handleInputChange2HV_1001 = (event: React.ChangeEvent<HTMLInputElement>) => {
               setInputValue2HV_1001(event.target.value);
           };
           
           const ChangeMaintainHV_1001 = async () => {
               try {
                   const newValue = !maintainHV_1001;
                   await httpApi.post(
                       `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                       { HV_1001_Maintain: newValue }
                   );
                   setMaintainHV_1001(newValue);
               } catch (error) {
                   console.error(error);
               }
           };
      
 
 
     // =================================================================================================================== 
     
         // =================================================================================================================== 
 
         const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);
         const [inputValueFCV_MODE, setInputValueFCV_MODE] = useState<any>();
         const [inputValue2FCV_MODE, setInputValue2FCV_MODE] = useState<any>();
         const [FCV_MODE_High, setFCV_MODE_High] = useState<number | null>(null);
         const [FCV_MODE_Low, setFCV_MODE_Low] = useState<number | null>(null);
         const [exceedThresholdFCV_MODE, setExceedThresholdFCV_MODE] = useState(false); 
         const [maintainFCV_MODE, setMaintainFCV_MODE] = useState<boolean>(false);
         
         useEffect(() => {
             const FCV_MODEValue = parseFloat(FCV_MODE as any);
             const highValue = FCV_MODE_High ?? NaN;
             const lowValue = FCV_MODE_Low ?? NaN;
         
             if (!isNaN(FCV_MODEValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFCV_MODE) {
                 setExceedThresholdFCV_MODE(FCV_MODEValue >= highValue || FCV_MODEValue <= lowValue);
             }
         }, [FCV_MODE, FCV_MODE_High, FCV_MODE_Low, maintainFCV_MODE]);
         
         const handleInputChangeFCV_MODE = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValueFCV_MODE(event.target.value);
         };
         
         const handleInputChange2FCV_MODE = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValue2FCV_MODE(event.target.value);
         };
         
         const ChangeMaintainFCV_MODE = async () => {
             try {
                 const newValue = !maintainFCV_MODE;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { FCV_MODE_Maintain: newValue }
                 );
                 setMaintainFCV_MODE(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
    
     
     
         // =================================================================================================================== 
         
             // =================================================================================================================== 
 
             const [TOTAL_CNG, setTOTAL_CNG] = useState<string | null>(null);
             const [inputValueTOTAL_CNG, setInputValueTOTAL_CNG] = useState<any>();
             const [inputValue2TOTAL_CNG, setInputValue2TOTAL_CNG] = useState<any>();
             const [TOTAL_CNG_High, setTOTAL_CNG_High] = useState<number | null>(null);
             const [TOTAL_CNG_Low, setTOTAL_CNG_Low] = useState<number | null>(null);
             const [exceedThresholdTOTAL_CNG, setExceedThresholdTOTAL_CNG] = useState(false); 
             const [maintainTOTAL_CNG, setMaintainTOTAL_CNG] = useState<boolean>(false);
             
             useEffect(() => {
                 const TOTAL_CNGValue = parseFloat(TOTAL_CNG as any);
                 const highValue = TOTAL_CNG_High ?? NaN;
                 const lowValue = TOTAL_CNG_Low ?? NaN;
             
                 if (!isNaN(TOTAL_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTOTAL_CNG) {
                     setExceedThresholdTOTAL_CNG(TOTAL_CNGValue >= highValue || TOTAL_CNGValue <= lowValue);
                 }
             }, [TOTAL_CNG, TOTAL_CNG_High, TOTAL_CNG_Low, maintainTOTAL_CNG]);
             
             const handleInputChangeTOTAL_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setInputValueTOTAL_CNG(event.target.value);
             };
             
             const handleInputChange2TOTAL_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setInputValue2TOTAL_CNG(event.target.value);
             };
             
             const ChangeMaintainTOTAL_CNG = async () => {
                 try {
                     const newValue = !maintainTOTAL_CNG;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { TOTAL_CNG_Maintain: newValue }
                     );
                     setMaintainTOTAL_CNG(newValue);
                 } catch (error) {
                     console.error(error);
                 }
             };
 
     // =================================================================================================================== 
     
 

     const [TM_2002_CNG, setTM_2002_CNG] = useState<string | null>(null);
     const [inputValueTM_2002_CNG, setInputValueTM_2002_CNG] = useState<any>();
     const [inputValue2TM_2002_CNG, setInputValue2TM_2002_CNG] = useState<any>();
     const [TM_2002_CNG_High, setTM_2002_CNG_High] = useState<number | null>(null);
     const [TM_2002_CNG_Low, setTM_2002_CNG_Low] = useState<number | null>(null);
     const [exceedThresholdTM_2002_CNG, setExceedThresholdTM_2002_CNG] = useState(false); 
     const [maintainTM_2002_CNG, setMaintainTM_2002_CNG] = useState<boolean>(false);
     
     useEffect(() => {
         const TM_2002_CNGValue = parseFloat(TM_2002_CNG as any);
         const highValue = TM_2002_CNG_High ?? NaN;
         const lowValue = TM_2002_CNG_Low ?? NaN;
     
         if (!isNaN(TM_2002_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_2002_CNG) {
             setExceedThresholdTM_2002_CNG(TM_2002_CNGValue >= highValue || TM_2002_CNGValue <= lowValue);
         }
     }, [TM_2002_CNG, TM_2002_CNG_High, TM_2002_CNG_Low, maintainTM_2002_CNG]);
     
     const handleInputChangeTM_2002_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValueTM_2002_CNG(event.target.value);
     };
     
     const handleInputChange2TM_2002_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
         setInputValue2TM_2002_CNG(event.target.value);
     };
     
     const ChangeMaintainTM_2002_CNG = async () => {
         try {
             const newValue = !maintainTM_2002_CNG;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { TM_2002_CNG_Maintain: newValue }
             );
             setMaintainTM_2002_CNG(newValue);
         } catch (error) {
             console.error(error);
         }
     };
 
 
     // =================================================================================================================== 
     
         // =================================================================================================================== 
 
         const [TM_2003_CNG, setTM_2003_CNG] = useState<string | null>(null);
         const [inputValueTM_2003_CNG, setInputValueTM_2003_CNG] = useState<any>();
         const [inputValue2TM_2003_CNG, setInputValue2TM_2003_CNG] = useState<any>();
         const [TM_2003_CNG_High, setTM_2003_CNG_High] = useState<number | null>(null);
         const [TM_2003_CNG_Low, setTM_2003_CNG_Low] = useState<number | null>(null);
         const [exceedThresholdTM_2003_CNG, setExceedThresholdTM_2003_CNG] = useState(false); 
         const [maintainTM_2003_CNG, setMaintainTM_2003_CNG] = useState<boolean>(false);
         
         useEffect(() => {
             const TM_2003_CNGValue = parseFloat(TM_2003_CNG as any);
             const highValue = TM_2003_CNG_High ?? NaN;
             const lowValue = TM_2003_CNG_Low ?? NaN;
         
             if (!isNaN(TM_2003_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_2003_CNG) {
                 setExceedThresholdTM_2003_CNG(TM_2003_CNGValue >= highValue || TM_2003_CNGValue <= lowValue);
             }
         }, [TM_2003_CNG, TM_2003_CNG_High, TM_2003_CNG_Low, maintainTM_2003_CNG]);
         
         const handleInputChangeTM_2003_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValueTM_2003_CNG(event.target.value);
         };
         
         const handleInputChange2TM_2003_CNG = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValue2TM_2003_CNG(event.target.value);
         };
         
         const ChangeMaintainTM_2003_CNG = async () => {
             try {
                 const newValue = !maintainTM_2003_CNG;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { TM_2003_CNG_Maintain: newValue }
                 );
                 setMaintainTM_2003_CNG(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
     
 
 // =================================================================================================================== 
 
 
 const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
 const [inputValueWB_Setpoint, setInputValueWB_Setpoint] = useState<any>();
 const [inputValue2WB_Setpoint, setInputValue2WB_Setpoint] = useState<any>();
 const [WB_Setpoint_High, setWB_Setpoint_High] = useState<number | null>(null);
 const [WB_Setpoint_Low, setWB_Setpoint_Low] = useState<number | null>(null);
 const [exceedThresholdWB_Setpoint, setExceedThresholdWB_Setpoint] = useState(false); 
 const [maintainWB_Setpoint, setMaintainWB_Setpoint] = useState<boolean>(false);
 
 useEffect(() => {
     const WB_SetpointValue = parseFloat(WB_Setpoint as any);
     const highValue = WB_Setpoint_High ?? NaN;
     const lowValue = WB_Setpoint_Low ?? NaN;
 
     if (!isNaN(WB_SetpointValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWB_Setpoint) {
         setExceedThresholdWB_Setpoint(WB_SetpointValue >= highValue || WB_SetpointValue <= lowValue);
     }
 }, [WB_Setpoint, WB_Setpoint_High, WB_Setpoint_Low, maintainWB_Setpoint]);
 
 const handleInputChangeWB_Setpoint = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValueWB_Setpoint(event.target.value);
 };
 
 const handleInputChange2WB_Setpoint = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue2WB_Setpoint(event.target.value);
 };
 
 const ChangeMaintainWB_Setpoint = async () => {
     try {
         const newValue = !maintainWB_Setpoint;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
             { WB_Setpoint_Maintain: newValue }
         );
         setMaintainWB_Setpoint(newValue);
     } catch (error) {
         console.error(error);
     }
 };

 
 // =================================================================================================================== 
 
 
 
         // =================================================================================================================== 
 
   
 const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
 const [inputValueRATIO_MODE, setInputValueRATIO_MODE] = useState<any>();
 const [inputValue2RATIO_MODE, setInputValue2RATIO_MODE] = useState<any>();
 const [RATIO_MODE_High, setRATIO_MODE_High] = useState<number | null>(null);
 const [RATIO_MODE_Low, setRATIO_MODE_Low] = useState<number | null>(null);
 const [exceedThresholdRATIO_MODE, setExceedThresholdRATIO_MODE] = useState(false); 
 const [maintainRATIO_MODE, setMaintainRATIO_MODE] = useState<boolean>(false);
 
 useEffect(() => {
     const RATIO_MODEValue = parseFloat(RATIO_MODE as any);
     const highValue = RATIO_MODE_High ?? NaN;
     const lowValue = RATIO_MODE_Low ?? NaN;
 
     if (!isNaN(RATIO_MODEValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainRATIO_MODE) {
         setExceedThresholdRATIO_MODE(RATIO_MODEValue >= highValue || RATIO_MODEValue <= lowValue);
     }
 }, [RATIO_MODE, RATIO_MODE_High, RATIO_MODE_Low, maintainRATIO_MODE]);
 
 const handleInputChangeRATIO_MODE = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValueRATIO_MODE(event.target.value);
 };
 
 const handleInputChange2RATIO_MODE = (event: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue2RATIO_MODE(event.target.value);
 };
 
 const ChangeMaintainRATIO_MODE = async () => {
     try {
         const newValue = !maintainRATIO_MODE;
         await httpApi.post(
             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
             { RATIO_MODE_Maintain: newValue }
         );
         setMaintainRATIO_MODE(newValue);
     } catch (error) {
         console.error(error);
     }
 };

         
         
         // =================================================================================================================== 
         
    
         
        
          // =================================================================================================================== 

    
          const [HR_BC, setHR_BC] = useState<string | null>(null);
          const [inputValueHR_BC, setInputValueHR_BC] = useState<any>();
          const [inputValue2HR_BC, setInputValue2HR_BC] = useState<any>();
          const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
          const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
          const [exceedThresholdHR_BC, setExceedThresholdHR_BC] = useState(false); 
          const [maintainHR_BC, setMaintainHR_BC] = useState<boolean>(false);
          
          useEffect(() => {
              const HR_BCValue = parseFloat(HR_BC as any);
              const highValue = HR_BC_High ?? NaN;
              const lowValue = HR_BC_Low ?? NaN;
          
              if (!isNaN(HR_BCValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHR_BC) {
                  setExceedThresholdHR_BC(HR_BCValue >= highValue || HR_BCValue <= lowValue);
              }
          }, [HR_BC, HR_BC_High, HR_BC_Low, maintainHR_BC]);
          
          const handleInputChangeHR_BC = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValueHR_BC(event.target.value);
          };
          
          const handleInputChange2HR_BC = (event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue2HR_BC(event.target.value);
          };
          
          const ChangeMaintainHR_BC = async () => {
              try {
                  const newValue = !maintainHR_BC;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { HR_BC_Maintain: newValue }
                  );
                  setMaintainHR_BC(newValue);
              } catch (error) {
                  console.error(error);
              }
          };
          
         // =================================================================================================================== 
    
    
    
         const [SD, setSD] = useState<string | null>(null);
         const [inputValueSD, setInputValueSD] = useState<any>();
         const [inputValue2SD, setInputValue2SD] = useState<any>();
         const [SD_High, setSD_High] = useState<number | null>(null);
         const [SD_Low, setSD_Low] = useState<number | null>(null);
         const [exceedThresholdSD, setExceedThresholdSD] = useState(false); 
         const [maintainSD, setMaintainSD] = useState<boolean>(false);
         
         useEffect(() => {
             const SDValue = parseFloat(SD as any);
             const highValue = SD_High ?? NaN;
             const lowValue = SD_Low ?? NaN;
         
             if (!isNaN(SDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD) {
                 setExceedThresholdSD(SDValue >= highValue || SDValue <= lowValue);
             }
         }, [SD, SD_High, SD_Low, maintainSD]);
         
         const handleInputChangeSD = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValueSD(event.target.value);
         };
         
         const handleInputChange2SD = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValue2SD(event.target.value);
         };
         
         const ChangeMaintainSD = async () => {
             try {
                 const newValue = !maintainSD;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { SD_Maintain: newValue }
                 );
                 setMaintainSD(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
    
         // =================================================================================================================== 
    
         
    
         const [ESD_2001, setESD_2001] = useState<string | null>(null);
         const [inputValueESD_2001, setInputValueESD_2001] = useState<any>();
         const [inputValue2ESD_2001, setInputValue2ESD_2001] = useState<any>();
         const [ESD_2001_High, setESD_2001_High] = useState<number | null>(null);
         const [ESD_2001_Low, setESD_2001_Low] = useState<number | null>(null);
         const [exceedThresholdESD_2001, setExceedThresholdESD_2001] = useState(false); 
         const [maintainESD_2001, setMaintainESD_2001] = useState<boolean>(false);
         
         useEffect(() => {
             const ESD_2001Value = parseFloat(ESD_2001 as any);
             const highValue = ESD_2001_High ?? NaN;
             const lowValue = ESD_2001_Low ?? NaN;
         
             if (!isNaN(ESD_2001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD_2001) {
                 setExceedThresholdESD_2001(ESD_2001Value >= highValue || ESD_2001Value <= lowValue);
             }
         }, [ESD_2001, ESD_2001_High, ESD_2001_Low, maintainESD_2001]);
         
         const handleInputChangeESD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValueESD_2001(event.target.value);
         };
         
         const handleInputChange2ESD_2001 = (event: React.ChangeEvent<HTMLInputElement>) => {
             setInputValue2ESD_2001(event.target.value);
         };
         
         const ChangeMaintainESD_2001 = async () => {
             try {
                 const newValue = !maintainESD_2001;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { ESD_2001_Maintain: newValue }
                 );
                 setMaintainESD_2001(newValue);
             } catch (error) {
                 console.error(error);
             }
         };
         
              // =================================================================================================================== 
              
             // =================================================================================================================== 
    
    
    
             const [WIS_Calorimeter, setWIS_Calorimeter] = useState<string | null>(null);
             const [inputValueWIS_Calorimeter, setInputValueWIS_Calorimeter] = useState<any>();
             const [inputValue2WIS_Calorimeter, setInputValue2WIS_Calorimeter] = useState<any>();
             const [WIS_Calorimeter_High, setWIS_Calorimeter_High] = useState<number | null>(null);
             const [WIS_Calorimeter_Low, setWIS_Calorimeter_Low] = useState<number | null>(null);
             const [exceedThresholdWIS_Calorimeter, setExceedThresholdWIS_Calorimeter] = useState(false); 
             const [maintainWIS_Calorimeter, setMaintainWIS_Calorimeter] = useState<boolean>(false);
             
             useEffect(() => {
                 const WIS_CalorimeterValue = parseFloat(WIS_Calorimeter as any);
                 const highValue = WIS_Calorimeter_High ?? NaN;
                 const lowValue = WIS_Calorimeter_Low ?? NaN;
             
                 if (!isNaN(WIS_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWIS_Calorimeter) {
                     setExceedThresholdWIS_Calorimeter(WIS_CalorimeterValue >= highValue || WIS_CalorimeterValue <= lowValue);
                 }
             }, [WIS_Calorimeter, WIS_Calorimeter_High, WIS_Calorimeter_Low, maintainWIS_Calorimeter]);
             
             const handleInputChangeWIS_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setInputValueWIS_Calorimeter(event.target.value);
             };
             
             const handleInputChange2WIS_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setInputValue2WIS_Calorimeter(event.target.value);
             };
             
             const ChangeMaintainWIS_Calorimeter = async () => {
                 try {
                     const newValue = !maintainWIS_Calorimeter;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { WIS_Calorimeter_Maintain: newValue }
                     );
                     setMaintainWIS_Calorimeter(newValue);
                 } catch (error) {
                     console.error(error);
                 }
             };
        
             // =================================================================================================================== 
                   // =================================================================================================================== 
    
    
    
             
                   const [CVS_Calorimeter, setCVS_Calorimeter] = useState<string | null>(null);
                   const [inputValueCVS_Calorimeter, setInputValueCVS_Calorimeter] = useState<any>();
                   const [inputValue2CVS_Calorimeter, setInputValue2CVS_Calorimeter] = useState<any>();
                   const [CVS_Calorimeter_High, setCVS_Calorimeter_High] = useState<number | null>(null);
                   const [CVS_Calorimeter_Low, setCVS_Calorimeter_Low] = useState<number | null>(null);
                   const [exceedThresholdCVS_Calorimeter, setExceedThresholdCVS_Calorimeter] = useState(false); 
                   const [maintainCVS_Calorimeter, setMaintainCVS_Calorimeter] = useState<boolean>(false);
                   
                   useEffect(() => {
                       const CVS_CalorimeterValue = parseFloat(CVS_Calorimeter as any);
                       const highValue = CVS_Calorimeter_High ?? NaN;
                       const lowValue = CVS_Calorimeter_Low ?? NaN;
                   
                       if (!isNaN(CVS_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainCVS_Calorimeter) {
                           setExceedThresholdCVS_Calorimeter(CVS_CalorimeterValue >= highValue || CVS_CalorimeterValue <= lowValue);
                       }
                   }, [CVS_Calorimeter, CVS_Calorimeter_High, CVS_Calorimeter_Low, maintainCVS_Calorimeter]);
                   
                   const handleInputChangeCVS_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValueCVS_Calorimeter(event.target.value);
                   };
                   
                   const handleInputChange2CVS_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValue2CVS_Calorimeter(event.target.value);
                   };
                   
                   const ChangeMaintainCVS_Calorimeter = async () => {
                       try {
                           const newValue = !maintainCVS_Calorimeter;
                           await httpApi.post(
                               `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                               { CVS_Calorimeter_Maintain: newValue }
                           );
                           setMaintainCVS_Calorimeter(newValue);
                       } catch (error) {
                           console.error(error);
                       }
                   };
              
              
                   // =================================================================================================================== 

                


                             // =================================================================================================================== 
    
    
                             const [SG_Calorimeter, setSG_Calorimeter] = useState<string | null>(null);
                             const [inputValueSG_Calorimeter, setInputValueSG_Calorimeter] = useState<any>();
                             const [inputValue2SG_Calorimeter, setInputValue2SG_Calorimeter] = useState<any>();
                             const [SG_Calorimeter_High, setSG_Calorimeter_High] = useState<number | null>(null);
                             const [SG_Calorimeter_Low, setSG_Calorimeter_Low] = useState<number | null>(null);
                             const [exceedThresholdSG_Calorimeter, setExceedThresholdSG_Calorimeter] = useState(false); 
                             const [maintainSG_Calorimeter, setMaintainSG_Calorimeter] = useState<boolean>(false);
                             
                             useEffect(() => {
                                 const SG_CalorimeterValue = parseFloat(SG_Calorimeter as any);
                                 const highValue = SG_Calorimeter_High ?? NaN;
                                 const lowValue = SG_Calorimeter_Low ?? NaN;
                             
                                 if (!isNaN(SG_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSG_Calorimeter) {
                                     setExceedThresholdSG_Calorimeter(SG_CalorimeterValue >= highValue || SG_CalorimeterValue <= lowValue);
                                 }
                             }, [SG_Calorimeter, SG_Calorimeter_High, SG_Calorimeter_Low, maintainSG_Calorimeter]);
                             
                             const handleInputChangeSG_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                                 setInputValueSG_Calorimeter(event.target.value);
                             };
                             
                             const handleInputChange2SG_Calorimeter = (event: React.ChangeEvent<HTMLInputElement>) => {
                                 setInputValue2SG_Calorimeter(event.target.value);
                             };
                             
                             const ChangeMaintainSG_Calorimeter = async () => {
                                 try {
                                     const newValue = !maintainSG_Calorimeter;
                                     await httpApi.post(
                                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                                         { SG_Calorimeter_Maintain: newValue }
                                     );
                                     setMaintainSG_Calorimeter(newValue);
                                 } catch (error) {
                                     console.error(error);
                                 }
                             };
                        
                        
                             // =================================================================================================================== 



                             
                   // =================================================================================================================== 
    
    
    
                 
                   const [TD_4072_Conn_STT, setTD_4072_Conn_STT] = useState<string | null>(null);
                   const [inputValueTD_4072_Conn_STT, setInputValueTD_4072_Conn_STT] = useState<any>();
                   const [inputValue2TD_4072_Conn_STT, setInputValue2TD_4072_Conn_STT] = useState<any>();
                   const [TD_4072_Conn_STT_High, setTD_4072_Conn_STT_High] = useState<number | null>(null);
                   const [TD_4072_Conn_STT_Low, setTD_4072_Conn_STT_Low] = useState<number | null>(null);
                   const [exceedThresholdTD_4072_Conn_STT, setExceedThresholdTD_4072_Conn_STT] = useState(false); 
                   const [maintainTD_4072_Conn_STT, setMaintainTD_4072_Conn_STT] = useState<boolean>(false);
                   
                   useEffect(() => {
                       const TD_4072_Conn_STTValue = parseFloat(TD_4072_Conn_STT as any);
                       const highValue = TD_4072_Conn_STT_High ?? NaN;
                       const lowValue = TD_4072_Conn_STT_Low ?? NaN;
                   
                       if (!isNaN(TD_4072_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTD_4072_Conn_STT) {
                           setExceedThresholdTD_4072_Conn_STT(TD_4072_Conn_STTValue >= highValue || TD_4072_Conn_STTValue <= lowValue);
                       }
                   }, [TD_4072_Conn_STT, TD_4072_Conn_STT_High, TD_4072_Conn_STT_Low, maintainTD_4072_Conn_STT]);
                   
                   const handleInputChangeTD_4072_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValueTD_4072_Conn_STT(event.target.value);
                   };
                   
                   const handleInputChange2TD_4072_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValue2TD_4072_Conn_STT(event.target.value);
                   };
                   
                   const ChangeMaintainTD_4072_Conn_STT = async () => {
                       try {
                           const newValue = !maintainTD_4072_Conn_STT;
                           await httpApi.post(
                               `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                               { TD_4072_Conn_STT_Maintain: newValue }
                           );
                           setMaintainTD_4072_Conn_STT(newValue);
                       } catch (error) {
                           console.error(error);
                       }
                   };
              
              
                   // =================================================================================================================== 


                   

                             // =================================================================================================================== 
    
    
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
                             
                             const handleInputChangePLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                                 setInputValuePLC_Conn_STT(event.target.value);
                             };
                             
                             const handleInputChange2PLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
                                 setInputValue2PLC_Conn_STT(event.target.value);
                             };
                             
                             const ChangeMaintainPLC_Conn_STT = async () => {
                                 try {
                                     const newValue = !maintainPLC_Conn_STT;
                                     await httpApi.post(
                                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                                         { PLC_Conn_STT_Maintain: newValue }
                                     );
                                     setMaintainPLC_Conn_STT(newValue);
                                 } catch (error) {
                                     console.error(error);
                                 }
                             };
                        
                        
                             // =================================================================================================================== 
         // =================================================================================================================== 

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,

                {
                    TD_4072_Conn_STT_High: inputValueTD_4072_Conn_STT,TD_4072_Conn_STT_Low:inputValue2TD_4072_Conn_STT,
                    PLC_Conn_STT_High: inputValuePLC_Conn_STT,PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,
                    WIS_Calorimeter_High: inputValueWIS_Calorimeter,WIS_Calorimeter_Low:inputValue2WIS_Calorimeter,
                    CVS_Calorimeter_High: inputValueCVS_Calorimeter,CVS_Calorimeter_Low:inputValue2CVS_Calorimeter,
                    SG_Calorimeter_High: inputValueSG_Calorimeter,SG_Calorimeter_Low:inputValue2SG_Calorimeter,
                    HR_BC_High: inputValueHR_BC,HR_BC_Low:inputValue2HR_BC,
                    SD_High: inputValueSD,SD_Low:inputValue2SD,
                    ESD_2001_High: inputValueESD_2001,ESD_2001_Low:inputValue2ESD_2001,
                    PT_2005_High: inputValuePT_2005,PT_2005_Low:inputValue2PT_2005,
                    TT_2003_High: inputValueTT_2003,TT_2003_Low:inputValue2TT_2003,

                    PT_2004_High: inputValuePT_2004,PT_2004_Low:inputValue2PT_2004,
                    TT_2004_High: inputValueTT_2004,TT_2004_Low:inputValue2TT_2004,
                    TG_2005_High: inputValueTG_2005,TG_2005_Low:inputValue2TG_2005,
                    WB_1001_High: inputValueWB_1001,WB_1001_Low:inputValue2WB_1001,
                    GD_2002_High: inputValueGD_2002,GD_2002_Low:inputValue2GD_2002,
                    GD_2003_High: inputValueGD_2003,GD_2003_Low:inputValue2GD_2003,
                    GD_2004_High: inputValueGD_2004,GD_2004_Low:inputValue2GD_2004,
                    GD_2006_High: inputValueGD_2006,GD_2006_Low:inputValue2GD_2006,
                    GD_2005_High: inputValueGD_2005,GD_2005_Low:inputValue2GD_2005,
                    TM_2002_SNG_High: inputValueTM_2002_SNG,TM_2002_SNG_Low:inputValue2TM_2002_SNG,

                    TM_2003_SNG_High: inputValueTM_2003_SNG,TM_2003_SNG_Low:inputValue2TM_2003_SNG,
                    TOTAL_SNG_High: inputValueTOTAL_SNG,TOTAL_SNG_Low:inputValue2TOTAL_SNG,
                    SDV_2004_High: inputValueSDV_2004,SDV_2004_Low:inputValue2SDV_2004,         




                    SDV_2003_High: inputValueSDV_2003,SDV_2003_Low:inputValue2SDV_2003,
                    GD1_STATUS_High: inputValueGD1_STATUS,GD1_STATUS_Low:inputValue2GD1_STATUS,
                    GD2_STATUS_High: inputValueGD2_STATUS,GD2_STATUS_Low:inputValue2GD2_STATUS,
                    GD3_STATUS_High: inputValueGD3_STATUS,GD3_STATUS_Low:inputValue2GD3_STATUS,
                    GD4_STATUS_High: inputValueGD4_STATUS,GD4_STATUS_Low:inputValue2GD4_STATUS,
                    GD5_STATUS_High: inputValueGD5_STATUS,GD5_STATUS_Low:inputValue2GD5_STATUS,
                    EVC_02_Vm_of_Last_Day_High: inputValueEVC_02_Vm_of_Last_Day,EVC_02_Vm_of_Last_Day_Low:inputValue2EVC_02_Vm_of_Last_Day,

                    VAPORIZER_1_High: inputValueVAPORIZER_1,VAPORIZER_1_Low:inputValue2VAPORIZER_1,
                    VAPORIZER_2_High: inputValueVAPORIZER_2,VAPORIZER_2_Low:inputValue2VAPORIZER_2,
                    ESD_High: inputValueESD,ESD_Low:inputValue2ESD,
                    VAPORIZER_3_High: inputValueVAPORIZER_3,VAPORIZER_3_Low:inputValue2VAPORIZER_3,
                    VAPORIZER_4_High: inputValueVAPORIZER_4,VAPORIZER_4_Low:inputValue2VAPORIZER_4,
                    COOLING_V_High: inputValueCOOLING_V,COOLING_V_Low:inputValue2COOLING_V,
                    FCV_2001_High: inputValueFCV_2001,FCV_2001_Low:inputValue2FCV_2001,
                    PERCENT_LPG_High: inputValuePERCENT_LPG,PERCENT_LPG_Low:inputValue2PERCENT_LPG,
                    HV_1001_High: inputValueHV_1001,HV_1001_Low:inputValue2HV_1001,
                    PERCENT_AIR_High: inputValuePERCENT_AIR,PERCENT_AIR_Low:inputValue2PERCENT_AIR,


                    FCV_MODE_High: inputValueFCV_MODE,FCV_MODE_Low:inputValue2FCV_MODE,
                    TOTAL_CNG_High: inputValueTOTAL_CNG,TOTAL_CNG_Low:inputValue2TOTAL_CNG,
                    TM_2002_CNG_High: inputValueTM_2002_CNG,TM_2002_CNG_Low:inputValue2TM_2002_CNG,
                    TM_2003_CNG_High: inputValueTM_2003_CNG,TM_2003_CNG_Low:inputValue2TM_2003_CNG,
                    WB_Setpoint_High: inputValueWB_Setpoint,WB_Setpoint_Low:inputValue2WB_Setpoint,
                    RATIO_MODE_High: inputValueRATIO_MODE,RATIO_MODE_Low:inputValue2RATIO_MODE,
                    IOT_Gateway_Phone: inputGetwayPhone,
                    PCV_01: inputPCV_01, PCV_02: inputPCV_02,
                }
            );

            setGetWayPhoneOTSUKA(inputGetwayPhone);
            setPCV_02(inputPCV_02)
            setPCV_01(inputPCV_01)
            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);


            setPLC_Conn_STT_High(inputValuePLC_Conn_STT);
            setPLC_Conn_STT_Low(inputValue2PLC_Conn_STT);

            setTD_4072_Conn_STT_High(inputValueTD_4072_Conn_STT);
            setTD_4072_Conn_STT_Low(inputValue2TD_4072_Conn_STT);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setSD_High(inputValueSD);
            setSD_Low(inputValue2SD);

            setESD_2001_High(inputValueESD_2001);
            setESD_2001_Low(inputValue2ESD_2001);


            setWIS_Calorimeter_High(inputValueWIS_Calorimeter);
            setWIS_Calorimeter_Low(inputValue2WIS_Calorimeter);

            setCVS_Calorimeter_High(inputValueCVS_Calorimeter);
            setCVS_Calorimeter_Low(inputValue2CVS_Calorimeter);

            setSG_Calorimeter_High(inputValueSG_Calorimeter);
            setSG_Calorimeter_Low(inputValue2SG_Calorimeter);

        

            setPT_2004_High(inputValuePT_2004);
            setPT_2004_Low(inputValue2PT_2004);

            setPT_2005_High(inputValuePT_2005);
            setPT_2005_Low(inputValue2PT_2005);

            setTT_2003_High(inputValueTT_2003);
            setTT_2003_Low(inputValue2TT_2003);

            setTT_2003_High(inputValueTT_2003);
            setTT_2003_Low(inputValue2TT_2003);

            setTT_2004_High(inputValueTT_2004);
            setTT_2004_Low(inputValue2TT_2004);

            setTG_2005_High(inputValueTG_2005);
            setTG_2005_Low(inputValue2TG_2005);

            setWB_1001_High(inputValueWB_1001);
            setWB_1001_Low(inputValue2WB_1001);


            setGD_2002_High(inputValueGD_2002);
            setGD_2002_Low(inputValue2GD_2002);

            setGD_2003_High(inputValueGD_2003);
            setGD_2003_Low(inputValue2GD_2003);

            setGD_2004_High(inputValueGD_2004);
            setGD_2004_Low(inputValue2GD_2004);

            setGD_2006_High(inputValueGD_2006);
            setGD_2006_Low(inputValue2GD_2006);

            setGD_2005_High(inputValueGD_2005);
            setGD_2005_Low(inputValue2GD_2005);


            setTM_2003_SNG_High(inputValueTM_2003_SNG);
            setTM_2003_SNG_Low(inputValue2TM_2003_SNG);

            setTM_2002_SNG_High(inputValueTM_2002_SNG);
            setTM_2002_SNG_Low(inputValue2TM_2002_SNG);

            setTOTAL_SNG_High(inputValueTOTAL_SNG);
            setTOTAL_SNG_Low(inputValue2TOTAL_SNG);

            setSDV_2004_High(inputValueSDV_2004);
            setSDV_2004_Low(inputValue2SDV_2004);



            setGD2_STATUS_High(inputValueGD2_STATUS);
            setGD2_STATUS_Low(inputValue2GD2_STATUS);

            setGD3_STATUS_High(inputValueGD3_STATUS);
            setGD3_STATUS_Low(inputValue2GD3_STATUS);

            setGD4_STATUS_High(inputValueGD4_STATUS);
            setGD4_STATUS_Low(inputValue2GD4_STATUS);

            setGD5_STATUS_High(inputValueGD5_STATUS);
            setGD5_STATUS_Low(inputValue2GD5_STATUS);

            setEVC_02_Vm_of_Last_Day_High(inputValueEVC_02_Vm_of_Last_Day);
            setEVC_02_Vm_of_Last_Day_Low(inputValue2EVC_02_Vm_of_Last_Day);


          

    

    


            setVAPORIZER_1_High(inputValueVAPORIZER_1);
            setVAPORIZER_1_Low(inputValue2VAPORIZER_1);

            setVAPORIZER_2_High(inputValueVAPORIZER_2);
            setVAPORIZER_2_Low(inputValue2VAPORIZER_2);

            setVAPORIZER_2_High(inputValueVAPORIZER_2);
            setVAPORIZER_2_Low(inputValue2VAPORIZER_2);

            setVAPORIZER_3_High(inputValueVAPORIZER_3);
            setVAPORIZER_3_Low(inputValue2VAPORIZER_3);

            setVAPORIZER_4_High(inputValueVAPORIZER_4);
            setVAPORIZER_4_Low(inputValue2VAPORIZER_4);

            setCOOLING_V_High(inputValueCOOLING_V);
            setCOOLING_V_Low(inputValue2COOLING_V);




            setFCV_2001_High(inputValueFCV_2001);
            setFCV_2001_Low(inputValue2FCV_2001);

            setPERCENT_LPG_High(inputValuePERCENT_LPG);
            setPERCENT_LPG_Low(inputValue2PERCENT_LPG);

            setHV_1001_High(inputValueHV_1001);
            setHV_1001_Low(inputValue2HV_1001);

            setPERCENT_AIR_High(inputValuePERCENT_AIR);
            setPERCENT_AIR_Low(inputValue2PERCENT_AIR);


            setTOTAL_CNG_High(inputValueTOTAL_CNG);
            setTOTAL_CNG_Low(inputValue2TOTAL_CNG);

            setFCV_MODE_High(inputValueFCV_MODE);
            setFCV_MODE_Low(inputValue2FCV_MODE);

            setTM_2002_CNG_High(inputValueTM_2002_CNG);
            setTM_2002_CNG_Low(inputValue2TM_2002_CNG);

            setTM_2003_CNG_High(inputValueTM_2003_CNG);
            setTM_2003_CNG_Low(inputValue2TM_2003_CNG);



            setRATIO_MODE_High(inputValueRATIO_MODE);
            setRATIO_MODE_Low(inputValue2RATIO_MODE);

        

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 2000,
            });
        } catch (error) {
            console.log("error: ", error);
            toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 2000});
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
        setInputValueHR_BC(HR_BC_High); 
        setInputValue2HR_BC(HR_BC_Low); 

        setInputValueSD(SD_High); 
        setInputValue2SD(SD_Low); 

        setInputValueESD_2001(ESD_2001_High); 
        setInputValue2ESD_2001(ESD_2001_Low); 

        setInputValueTD_4072_Conn_STT(TD_4072_Conn_STT_High); 
        setInputValue2TD_4072_Conn_STT(TD_4072_Conn_STT_Low); 

        setInputValuePLC_Conn_STT(PLC_Conn_STT_High); 
        setInputValue2PLC_Conn_STT(PLC_Conn_STT_Low); 

        setInputValuePT_2004(PT_2004_High); 
        setInputValue2PT_2004(PT_2004_Low); 

        setInputValuePT_2005(PT_2005_High); 
        setInputValue2PT_2005(PT_2005_Low); 

        setInputValueTT_2003(TT_2003_High); 
        setInputValue2TT_2003(TT_2003_Low); 




        setInputValueWIS_Calorimeter(WIS_Calorimeter_High); 
        setInputValue2WIS_Calorimeter(WIS_Calorimeter_Low); 

        setInputValueCVS_Calorimeter(CVS_Calorimeter_High); 
        setInputValue2CVS_Calorimeter(CVS_Calorimeter_Low); 

        setInputValueSG_Calorimeter(SG_Calorimeter_High); 
        setInputValue2SG_Calorimeter(SG_Calorimeter_Low); 




        setInputValueTG_2005(TG_2005_High); 
        setInputValue2TG_2005(TG_2005_Low); 

        setInputValueWB_1001(WB_1001_High); 
        setInputValue2WB_1001(WB_1001_Low); 

        setInputValueTT_2004(TT_2004_High); 
        setInputValue2TT_2004(TT_2004_Low); 
        

        setInputValueGD_2003(GD_2003_High); 
        setInputValue2GD_2003(GD_2003_Low); 

        setInputValueGD_2004(GD_2004_High); 
        setInputValue2GD_2004(GD_2004_Low); 

        setInputValueGD_2002(GD_2002_High); 
        setInputValue2GD_2002(GD_2002_Low); 

        setInputValueGD_2005(GD_2005_High); 
        setInputValue2GD_2005(GD_2005_Low); 

        setInputValueGD_2006(GD_2006_High); 
        setInputValue2GD_2006(GD_2006_Low); 

        setInputValueTM_2002_SNG(TM_2002_SNG_High); 
        setInputValue2TM_2002_SNG(TM_2002_SNG_Low); 

        setInputValueTM_2003_SNG(TM_2003_SNG_High); 
        setInputValue2TM_2003_SNG(TM_2003_SNG_Low); 

        setInputValueTOTAL_SNG(TOTAL_SNG_High); 
        setInputValue2TOTAL_SNG(TOTAL_SNG_Low); 

        setInputValueSDV_2004(SDV_2004_High); 
        setInputValue2SDV_2004(SDV_2004_Low); 


        setInputValueSDV_2003(SDV_2003_High); 
        setInputValue2SDV_2003(SDV_2003_Low); 

        setInputValueGD1_STATUS(GD1_STATUS_High); 
        setInputValue2GD1_STATUS(GD1_STATUS_Low); 


        setInputValueGD2_STATUS(GD2_STATUS_High); 
        setInputValue2GD2_STATUS(GD2_STATUS_Low); 


        setInputValueGD3_STATUS(GD3_STATUS_High); 
        setInputValue2GD3_STATUS(GD3_STATUS_Low); 

        setInputValueGD4_STATUS(GD4_STATUS_High); 
        setInputValue2GD4_STATUS(GD4_STATUS_Low); 


        setInputValueGD5_STATUS(GD5_STATUS_High); 
        setInputValue2GD5_STATUS(GD5_STATUS_Low); 

        setInputValueEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_High); 
        setInputValue2EVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Low); 




     






        setInputValueESD(ESD_High); 
        setInputValue2ESD(ESD_Low); 

        setInputValueVAPORIZER_1(VAPORIZER_1_High); 
        setInputValue2VAPORIZER_1(VAPORIZER_1_Low); 

        setInputValueVAPORIZER_2(VAPORIZER_2_High); 
        setInputValue2VAPORIZER_2(VAPORIZER_2_Low); 



        setInputValueVAPORIZER_4(VAPORIZER_4_High); 
        setInputValue2VAPORIZER_4(VAPORIZER_4_Low); 

        setInputValueCOOLING_V(COOLING_V_High); 
        setInputValue2COOLING_V(COOLING_V_Low); 

        setInputValueVAPORIZER_3(VAPORIZER_3_High); 
        setInputValue2VAPORIZER_3(VAPORIZER_3_Low); 
        

        setInputValueFCV_2001(FCV_2001_High); 
        setInputValue2FCV_2001(FCV_2001_Low); 

        setInputValuePERCENT_LPG(PERCENT_LPG_High); 
        setInputValue2PERCENT_LPG(PERCENT_LPG_Low); 



        setInputValuePERCENT_AIR(PERCENT_AIR_High); 
        setInputValue2PERCENT_AIR(PERCENT_AIR_Low); 

        setInputValueHV_1001(HV_1001_High); 
        setInputValue2HV_1001(HV_1001_Low); 

        setInputValueFCV_MODE(FCV_MODE_High); 
        setInputValue2FCV_MODE(FCV_MODE_Low); 

        setInputValueTOTAL_CNG(TOTAL_CNG_High); 
        setInputValue2TOTAL_CNG(TOTAL_CNG_Low); 

        setInputValueTM_2002_CNG(TM_2002_CNG_High); 
        setInputValue2TM_2002_CNG(TM_2002_CNG_Low); 

        setInputValueTM_2003_CNG(TM_2003_CNG_High); 
        setInputValue2TM_2003_CNG(TM_2003_CNG_Low); 


        setInputValueWB_Setpoint(WB_Setpoint_High); 
        setInputValue2WB_Setpoint(WB_Setpoint_Low); 



        setInputValueRATIO_MODE(RATIO_MODE_High); 
        setInputValue2RATIO_MODE(RATIO_MODE_Low); 




   

    }, [
        TD_4072_Conn_STT_High, TD_4072_Conn_STT_Low 
        ,PLC_Conn_STT_High, PLC_Conn_STT_Low ,

        HR_BC_High, HR_BC_Low 
        ,SD_High, SD_Low ,


  
          ESD_2001_High,ESD_2001_Low,
        
        PT_2004_High, PT_2004_Low ,
        PT_2005_High, PT_2005_Low 
        ,TT_2003_High, TT_2003_Low ,


        TG_2005_High,TG_2005_Low,
         WB_1001_High,WB_1001_Low ,
          TT_2004_High,TT_2004_Low,

          GD_2003_High,GD_2003_Low,
          GD_2004_High,GD_2004_Low ,
           GD_2002_High,GD_2002_Low,
        
           GD_2005_High,GD_2005_Low,
           GD_2006_High,GD_2006_Low,

           TM_2002_SNG_High,TM_2002_SNG_Low,
           TM_2003_SNG_High,TM_2003_SNG_Low,

           TOTAL_SNG_High,TOTAL_SNG_Low,
           SDV_2004_High,SDV_2004_Low,

           GD1_STATUS_High,GD1_STATUS_Low,
           SDV_2003_High,SDV_2003_Low,


           GD2_STATUS_High,GD2_STATUS_Low,
           GD3_STATUS_High,GD3_STATUS_Low,
           GD4_STATUS_High,GD4_STATUS_Low,

           GD5_STATUS_High,GD5_STATUS_Low,

           EVC_02_Vm_of_Last_Day_High,EVC_02_Vm_of_Last_Day_Low,





           ESD_High, ESD_Low ,
        VAPORIZER_1_High, VAPORIZER_1_Low 
        ,VAPORIZER_2_High, VAPORIZER_2_Low ,


        VAPORIZER_4_High,VAPORIZER_4_Low,
         COOLING_V_High,COOLING_V_Low ,
          VAPORIZER_3_High,VAPORIZER_3_Low,

          FCV_2001_High,FCV_2001_Low,
          PERCENT_LPG_High,PERCENT_LPG_Low ,
        
           PERCENT_AIR_High,PERCENT_AIR_Low,
           HV_1001_High,HV_1001_Low,

           FCV_MODE_High,FCV_MODE_Low,
           TOTAL_CNG_High,TOTAL_CNG_Low,

           TM_2002_CNG_High,TM_2002_CNG_Low,
           TM_2003_CNG_High,TM_2003_CNG_Low,

           WB_Setpoint_High,WB_Setpoint_Low,


           RATIO_MODE_High,RATIO_MODE_Low,
           getWayPhoneOTSUKA,


           WIS_Calorimeter_High,WIS_Calorimeter_Low,
           CVS_Calorimeter_High,CVS_Calorimeter_Low,
           SG_Calorimeter_High,SG_Calorimeter_Low,
           PCV_01,
           PCV_02,
        ]);





        const handleMainTainAll = async (checked:any) => {
            try {
                const newMaintainPT_2004 = checked;
                const newMaintainPT_2005 = checked;
                const newMaintainTT_2003 = checked;
                const newMaintainTT_2004 = checked;
                const newMaintainWB_1001 = checked;
                const newMaintainTG_2005 = checked;
                const newMaintainGD_2002 = checked;
                const newMaintainGD_2003 = checked;
                const newMaintainGD_2004 = checked;
                const newMaintainGD_2005 = checked;
                const newMaintainGD_2006 = checked;
        
                const newMaintainTM_2002_SNG = checked;
                const newMaintainTM_2003_SNG = checked;
                const newMaintainTOTAL_SNG = checked;
                const newMaintainSDV_2004 = checked;
                const newMaintainSDV_2003 = checked;
                const newMaintainGD1_STATUS = checked;
                const newMaintainGD2_STATUS = checked;
                const newMaintainGD3_STATUS = checked;
                const newMaintainGD4_STATUS = checked;
                const newMaintainGD5_STATUS = checked;
        
                const newMaintainESD = checked;
                const newMaintainHR_BC = checked;
                const newMaintainSD = checked;
        
                const newMaintainVAPORIZER_1 = checked;
                const newMaintainVAPORIZER_2 = checked;
                const newMaintainVAPORIZER_3 = checked;
                const newMaintainVAPORIZER_4 = checked;
                const newMaintainCOOLING_V = checked;
                const newMaintainFCV_2001 = checked;
                const newMaintainPERCENT_LPG = checked;
                const newMaintainPERCENT_AIR = checked;
                const newMaintainHV_1001 = checked;
                const newMaintainRATIO_MODE = checked;
        
                const newMaintainFCV_MODE = checked;
                const newMaintainTOTAL_CNG = checked;
                const newMaintainTM_2002_CNG = checked;
                const newMaintainTM_2003_CNG = checked;
                const newMaintainWB_Setpoint = checked;
                const newMaintainWIS_Calorimeter = checked;
                const newMaintainCVS_Calorimeter = checked;
                const newMaintainSG_Calorimeter = checked;
        
                const newMaintainTD_4072_Conn_STT = checked;
                const newMaintainPLC_Conn_STT = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { PT_2004_Maintain: newMaintainPT_2004,
                       PT_2005_Maintain: newMaintainPT_2005,
                       TT_2003_Maintain: newMaintainTT_2003,
                       TT_2004_Maintain: newMaintainTT_2004,
                       WB_1001_Maintain: newMaintainWB_1001,
                       TG_2005_Maintain: newMaintainTG_2005,
                       GD_2002_Maintain: newMaintainGD_2002,
                       GD_2003_Maintain: newMaintainGD_2003,
                       GD_2004_Maintain: newMaintainGD_2004,
                       GD_2005_Maintain: newMaintainGD_2005,
                       GD_2006_Maintain: newMaintainGD_2006,
        
        
                       TM_2002_SNG_Maintain: newMaintainTM_2002_SNG,
                       TM_2003_SNG_Maintain: newMaintainTM_2003_SNG,
                       TOTAL_SNG_Maintain: newMaintainTOTAL_SNG,
                       SDV_2004_Maintain: newMaintainSDV_2004,
                       SDV_2003_Maintain: newMaintainSDV_2003,
                       GD1_STATUS_Maintain: newMaintainGD1_STATUS,
                       GD2_STATUS_Maintain: newMaintainGD2_STATUS,
                       GD3_STATUS_Maintain: newMaintainGD3_STATUS,
                       GD4_STATUS_Maintain: newMaintainGD4_STATUS,
                       GD5_STATUS_Maintain: newMaintainGD5_STATUS,
        
                       ESD_Maintain: newMaintainESD,
                       HR_BC_Maintain: newMaintainHR_BC,
                       SD_Maintain: newMaintainSD,
                       VAPORIZER_1_Maintain: newMaintainVAPORIZER_1,
                       VAPORIZER_2_Maintain: newMaintainVAPORIZER_2,
                       VAPORIZER_3_Maintain: newMaintainVAPORIZER_3,
                       VAPORIZER_4_Maintain: newMaintainVAPORIZER_4,
                       COOLING_V_Maintain: newMaintainCOOLING_V,
                       FCV_2001_Maintain: newMaintainFCV_2001,
                       PERCENT_LPG_Maintain: newMaintainPERCENT_LPG,
                       PERCENT_AIR_Maintain: newMaintainPERCENT_AIR,
                       HV_1001_Maintain: newMaintainHV_1001,
                       RATIO_MODE_Maintain: newMaintainRATIO_MODE,
        
                       FCV_MODE_Maintain: newMaintainFCV_MODE,
                       TOTAL_CNG_Maintain: newMaintainTOTAL_CNG,
                       TM_2002_CNG_Maintain: newMaintainTM_2002_CNG,
                       TM_2003_CNG_Maintain: newMaintainTM_2003_CNG,
                       WB_Setpoint_Maintain: newMaintainWB_Setpoint,
                       WIS_Calorimeter_Maintain: newMaintainWIS_Calorimeter,
                       CVS_Calorimeter_Maintain: newMaintainCVS_Calorimeter,
                       SG_Calorimeter_Maintain: newMaintainSG_Calorimeter,
        
                       TD_4072_Conn_STT_Maintain: newMaintainTD_4072_Conn_STT,
                       PLC_Conn_STT_Maintain: newMaintainPLC_Conn_STT,
                     }
                );
                setMaintainPT_2004(newMaintainPT_2004);
                setMaintainPT_2005(newMaintainPT_2005);
                setMaintainTT_2003(newMaintainTT_2003);
                setMaintainTT_2004(newMaintainTT_2004);
                setMaintainWB_1001(newMaintainWB_1001);
                setMaintainTG_2005(newMaintainTG_2005);
                setMaintainGD_2002(newMaintainGD_2002);
                setMaintainGD_2003(newMaintainGD_2003);
                setMaintainGD_2004(newMaintainGD_2004);
                setMaintainGD_2005(newMaintainGD_2005);
                setMaintainGD_2006(newMaintainGD_2006);
        
                setMaintainTM_2002_SNG(newMaintainTM_2002_SNG);
                setMaintainTM_2003_SNG(newMaintainTM_2003_SNG);
                setMaintainTOTAL_SNG(newMaintainTOTAL_SNG);
                setMaintainSDV_2004(newMaintainSDV_2004);
                setMaintainSDV_2003(newMaintainSDV_2003);
                setMaintainGD1_STATUS(newMaintainGD1_STATUS);
                setMaintainGD2_STATUS(newMaintainGD2_STATUS);
                setMaintainGD3_STATUS(newMaintainGD3_STATUS);
                setMaintainGD4_STATUS(newMaintainGD4_STATUS);
                setMaintainGD5_STATUS(newMaintainGD5_STATUS);
                
        
                setMaintainESD(newMaintainESD);
                setMaintainHR_BC(newMaintainHR_BC);
                setMaintainSD(newMaintainSD);
        
                setMaintainVAPORIZER_1(newMaintainVAPORIZER_1);
                setMaintainVAPORIZER_2(newMaintainVAPORIZER_2);
                setMaintainVAPORIZER_3(newMaintainVAPORIZER_3);
                setMaintainVAPORIZER_4(newMaintainVAPORIZER_4);
                setMaintainCOOLING_V(newMaintainCOOLING_V);
                setMaintainFCV_2001(newMaintainFCV_2001);
                setMaintainPERCENT_LPG(newMaintainPERCENT_LPG);
                setMaintainPERCENT_AIR(newMaintainPERCENT_AIR);
                setMaintainHV_1001(newMaintainHV_1001);
                setMaintainRATIO_MODE(newMaintainRATIO_MODE);
        
                setMaintainFCV_MODE(newMaintainFCV_MODE);
                setMaintainTOTAL_CNG(newMaintainTOTAL_CNG);
                setMaintainTM_2002_CNG(newMaintainTM_2002_CNG);
                setMaintainTM_2003_CNG(newMaintainTM_2003_CNG);
                setMaintainWB_Setpoint(newMaintainWB_Setpoint);
                setMaintainWIS_Calorimeter(newMaintainWIS_Calorimeter);
        
                setMaintainSG_Calorimeter(newMaintainSG_Calorimeter);
                setMaintainCVS_Calorimeter(newMaintainCVS_Calorimeter);
        
                setMaintainTD_4072_Conn_STT(newMaintainTD_4072_Conn_STT);
                setMaintainPLC_Conn_STT(newMaintainPLC_Conn_STT);
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainAll(isChecked);
        };

    


        const handleMainTainPLC = async (checked:any) => {
            try {
                const newMaintainPT_2004 = checked;
                const newMaintainPT_2005 = checked;
                const newMaintainTT_2003 = checked;
                const newMaintainTT_2004 = checked;
                const newMaintainWB_1001 = checked;
                const newMaintainTG_2005 = checked;
                const newMaintainGD_2002 = checked;
                const newMaintainGD_2003 = checked;
                const newMaintainGD_2004 = checked;
                const newMaintainGD_2005 = checked;
                const newMaintainGD_2006 = checked;
        
                const newMaintainTM_2002_SNG = checked;
                const newMaintainTM_2003_SNG = checked;
                const newMaintainTOTAL_SNG = checked;
                const newMaintainSDV_2004 = checked;
                const newMaintainSDV_2003 = checked;
                const newMaintainGD1_STATUS = checked;
                const newMaintainGD2_STATUS = checked;
                const newMaintainGD3_STATUS = checked;
                const newMaintainGD4_STATUS = checked;
                const newMaintainGD5_STATUS = checked;
        
                const newMaintainESD = checked;
                const newMaintainHR_BC = checked;
                const newMaintainSD = checked;
        
                const newMaintainVAPORIZER_1 = checked;
                const newMaintainVAPORIZER_2 = checked;
                const newMaintainVAPORIZER_3 = checked;
                const newMaintainVAPORIZER_4 = checked;
                const newMaintainCOOLING_V = checked;
                const newMaintainFCV_2001 = checked;
                const newMaintainPERCENT_LPG = checked;
                const newMaintainPERCENT_AIR = checked;
                const newMaintainHV_1001 = checked;
                const newMaintainRATIO_MODE = checked;
        
                const newMaintainFCV_MODE = checked;
                const newMaintainTOTAL_CNG = checked;
                const newMaintainTM_2002_CNG = checked;
                const newMaintainTM_2003_CNG = checked;
                const newMaintainWB_Setpoint = checked;
            
                const newMaintainPLC_Conn_STT = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { PT_2004_Maintain: newMaintainPT_2004,
                       PT_2005_Maintain: newMaintainPT_2005,
                       TT_2003_Maintain: newMaintainTT_2003,
                       TT_2004_Maintain: newMaintainTT_2004,
                       WB_1001_Maintain: newMaintainWB_1001,
                       TG_2005_Maintain: newMaintainTG_2005,
                       GD_2002_Maintain: newMaintainGD_2002,
                       GD_2003_Maintain: newMaintainGD_2003,
                       GD_2004_Maintain: newMaintainGD_2004,
                       GD_2005_Maintain: newMaintainGD_2005,
                       GD_2006_Maintain: newMaintainGD_2006,
        
        
                       TM_2002_SNG_Maintain: newMaintainTM_2002_SNG,
                       TM_2003_SNG_Maintain: newMaintainTM_2003_SNG,
                       TOTAL_SNG_Maintain: newMaintainTOTAL_SNG,
                       SDV_2004_Maintain: newMaintainSDV_2004,
                       SDV_2003_Maintain: newMaintainSDV_2003,
                       GD1_STATUS_Maintain: newMaintainGD1_STATUS,
                       GD2_STATUS_Maintain: newMaintainGD2_STATUS,
                       GD3_STATUS_Maintain: newMaintainGD3_STATUS,
                       GD4_STATUS_Maintain: newMaintainGD4_STATUS,
                       GD5_STATUS_Maintain: newMaintainGD5_STATUS,
        
                       ESD_Maintain: newMaintainESD,
                       HR_BC_Maintain: newMaintainHR_BC,
                       SD_Maintain: newMaintainSD,
                       VAPORIZER_1_Maintain: newMaintainVAPORIZER_1,
                       VAPORIZER_2_Maintain: newMaintainVAPORIZER_2,
                       VAPORIZER_3_Maintain: newMaintainVAPORIZER_3,
                       VAPORIZER_4_Maintain: newMaintainVAPORIZER_4,
                       COOLING_V_Maintain: newMaintainCOOLING_V,
                       FCV_2001_Maintain: newMaintainFCV_2001,
                       PERCENT_LPG_Maintain: newMaintainPERCENT_LPG,
                       PERCENT_AIR_Maintain: newMaintainPERCENT_AIR,
                       HV_1001_Maintain: newMaintainHV_1001,
                       RATIO_MODE_Maintain: newMaintainRATIO_MODE,
        
                       FCV_MODE_Maintain: newMaintainFCV_MODE,
                       TOTAL_CNG_Maintain: newMaintainTOTAL_CNG,
                       TM_2002_CNG_Maintain: newMaintainTM_2002_CNG,
                       TM_2003_CNG_Maintain: newMaintainTM_2003_CNG,
                       WB_Setpoint_Maintain: newMaintainWB_Setpoint,
                   
                       PLC_Conn_STT_Maintain: newMaintainPLC_Conn_STT,
                     }
                );
                setMaintainPT_2004(newMaintainPT_2004);
                setMaintainPT_2005(newMaintainPT_2005);
                setMaintainTT_2003(newMaintainTT_2003);
                setMaintainTT_2004(newMaintainTT_2004);
                setMaintainWB_1001(newMaintainWB_1001);
                setMaintainTG_2005(newMaintainTG_2005);
                setMaintainGD_2002(newMaintainGD_2002);
                setMaintainGD_2003(newMaintainGD_2003);
                setMaintainGD_2004(newMaintainGD_2004);
                setMaintainGD_2005(newMaintainGD_2005);
                setMaintainGD_2006(newMaintainGD_2006);
        
                setMaintainTM_2002_SNG(newMaintainTM_2002_SNG);
                setMaintainTM_2003_SNG(newMaintainTM_2003_SNG);
                setMaintainTOTAL_SNG(newMaintainTOTAL_SNG);
                setMaintainSDV_2004(newMaintainSDV_2004);
                setMaintainSDV_2003(newMaintainSDV_2003);
                setMaintainGD1_STATUS(newMaintainGD1_STATUS);
                setMaintainGD2_STATUS(newMaintainGD2_STATUS);
                setMaintainGD3_STATUS(newMaintainGD3_STATUS);
                setMaintainGD4_STATUS(newMaintainGD4_STATUS);
                setMaintainGD5_STATUS(newMaintainGD5_STATUS);
                
        
                setMaintainESD(newMaintainESD);
                setMaintainHR_BC(newMaintainHR_BC);
                setMaintainSD(newMaintainSD);
        
                setMaintainVAPORIZER_1(newMaintainVAPORIZER_1);
                setMaintainVAPORIZER_2(newMaintainVAPORIZER_2);
                setMaintainVAPORIZER_3(newMaintainVAPORIZER_3);
                setMaintainVAPORIZER_4(newMaintainVAPORIZER_4);
                setMaintainCOOLING_V(newMaintainCOOLING_V);
                setMaintainFCV_2001(newMaintainFCV_2001);
                setMaintainPERCENT_LPG(newMaintainPERCENT_LPG);
                setMaintainPERCENT_AIR(newMaintainPERCENT_AIR);
                setMaintainHV_1001(newMaintainHV_1001);
                setMaintainRATIO_MODE(newMaintainRATIO_MODE);
        
                setMaintainFCV_MODE(newMaintainFCV_MODE);
                setMaintainTOTAL_CNG(newMaintainTOTAL_CNG);
                setMaintainTM_2002_CNG(newMaintainTM_2002_CNG);
                setMaintainTM_2003_CNG(newMaintainTM_2003_CNG);
                setMaintainWB_Setpoint(newMaintainWB_Setpoint);
           
        
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
    maintainPT_2004 === true &&
    maintainPT_2005 === true &&
    maintainTT_2003 === true &&
    maintainTT_2004 === true &&
    maintainTG_2005 === true &&
    maintainWB_1001 === true &&
    maintainGD_2002 === true &&
    maintainGD_2003 === true &&
    maintainGD_2004 === true &&
    maintainGD_2005 === true &&
    maintainGD_2006 === true &&
    maintainTM_2002_SNG === true &&
    maintainTM_2003_SNG === true &&
    maintainTOTAL_SNG === true &&
    maintainSDV_2004 === true &&
    maintainSDV_2003 === true &&
    maintainGD1_STATUS === true &&
    maintainGD2_STATUS === true &&
    maintainGD3_STATUS === true &&
    maintainGD4_STATUS === true &&
    maintainGD5_STATUS === true &&
    maintainESD === true &&
    maintainHR_BC === true &&
    maintainSD === true &&
    maintainVAPORIZER_1 === true &&
    maintainVAPORIZER_2 === true &&
    maintainVAPORIZER_3 === true &&
    maintainVAPORIZER_4 === true &&
    maintainCOOLING_V === true &&
    maintainFCV_2001 === true &&
    maintainPERCENT_LPG === true &&
    maintainPERCENT_AIR === true &&
    maintainHV_1001 === true &&
    maintainRATIO_MODE === true &&
    maintainFCV_MODE === true &&
    maintainTOTAL_CNG === true &&
    maintainTM_2002_CNG === true &&
    maintainTM_2003_CNG === true &&
    maintainWB_Setpoint === true &&
    maintainPLC_Conn_STT === true;


        //=============================================================================

        const handleMainTainTD = async (checked:any) => {
            try {
             
                const newMaintainWIS_Calorimeter = checked;
                const newMaintainCVS_Calorimeter = checked;
                const newMaintainSG_Calorimeter = checked;
        
                const newMaintainTD_4072_Conn_STT = checked;
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { 
                       WIS_Calorimeter_Maintain: newMaintainWIS_Calorimeter,
                       CVS_Calorimeter_Maintain: newMaintainCVS_Calorimeter,
                       SG_Calorimeter_Maintain: newMaintainSG_Calorimeter,
        
                       TD_4072_Conn_STT_Maintain: newMaintainTD_4072_Conn_STT,
                     }
                );
        
                setMaintainWIS_Calorimeter(newMaintainWIS_Calorimeter);
        
                setMaintainSG_Calorimeter(newMaintainSG_Calorimeter);
                setMaintainCVS_Calorimeter(newMaintainCVS_Calorimeter);
        
                setMaintainTD_4072_Conn_STT(newMaintainTD_4072_Conn_STT);
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChangeTD = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainTD(isChecked);
        };

        const checkMaintainingTD = 
        maintainWIS_Calorimeter === true &&
        maintainCVS_Calorimeter === true &&
        maintainSG_Calorimeter === true &&
        maintainTD_4072_Conn_STT === true;
    
        //=============================================================================
       const handleCheckboxChangeALL = maintainPT_2004 === true &&
       maintainPT_2005 === true &&
       maintainTT_2003 === true &&
       maintainTT_2004 === true &&
       maintainTG_2005 === true &&
       maintainWB_1001 === true &&
       maintainGD_2002 === true &&
       maintainGD_2003 === true &&
       maintainGD_2004 === true &&
       maintainGD_2005 === true &&
       maintainGD_2006 === true &&
       maintainTM_2002_SNG === true &&
       maintainTM_2003_SNG === true &&
       maintainTOTAL_SNG === true &&
       maintainSDV_2004 === true &&
       maintainSDV_2003 === true &&
       maintainGD1_STATUS === true &&
       maintainGD2_STATUS === true &&
       maintainGD3_STATUS === true &&
       maintainGD4_STATUS === true &&
       maintainGD5_STATUS === true &&
       maintainESD === true &&
       maintainHR_BC === true &&
       maintainSD === true &&
       maintainVAPORIZER_1 === true &&
       maintainVAPORIZER_2 === true &&
       maintainVAPORIZER_3 === true &&
       maintainVAPORIZER_4 === true &&
       maintainCOOLING_V === true &&
       maintainFCV_2001 === true &&
       maintainPERCENT_LPG === true &&
       maintainPERCENT_AIR === true &&
       maintainHV_1001 === true &&
       maintainRATIO_MODE === true &&
       maintainFCV_MODE === true &&
       maintainTOTAL_CNG === true &&
       maintainTM_2002_CNG === true &&
       maintainTM_2003_CNG === true &&
       maintainWB_Setpoint === true &&
       maintainPLC_Conn_STT === true &&
         maintainWIS_Calorimeter === true &&
       maintainCVS_Calorimeter === true &&
       maintainSG_Calorimeter === true &&
       maintainTD_4072_Conn_STT === true;
        //=============================================================================

        const DataGD5_STATUS  = GD5_STATUS === "0" ? "Normal" : GD5_STATUS === "1" ? "Alarm" : null;
        const DataGD4_STATUS  = GD4_STATUS === "0" ? "Normal" : GD4_STATUS === "1" ? "Alarm" : null;
        const DataGD3_STATUS  = GD3_STATUS === "0" ? "Normal" : GD3_STATUS === "1" ? "Alarm" : null;
        const DataGD2_STATUS  = GD2_STATUS === "0" ? "Normal" : GD2_STATUS === "1" ? "Alarm" : null;
        const DataGD1_STATUS  = GD1_STATUS === "0" ? "Normal" : GD1_STATUS === "1" ? "Alarm" : null;

        const DataSDV_2004  = SDV_2004 === "0" ? "Close" : SDV_2004 === "1" ? "Open" : null;
        const DataSDV_2003  = SDV_2003 === "0" ? "Close" : SDV_2003 === "1" ? "Open" : null;

        const DataSD  = SD === "0" ? "Normal" : SD === "1" ? "Smoker Detected" : null;
        const DataHR_BC  = HR_BC === "0" ? "OFF" : HR_BC === "1" ? "ON" : null;
        const DataESD  = ESD === "0" ? "No Active" : ESD === "1" ? "Active" : null;

        const DataVAPORIZER_3  = VAPORIZER_3 === "0" ? "Stop" : VAPORIZER_3 === "1" ? "Run" : null;
        const DataVAPORIZER_2  = VAPORIZER_2 === "0" ? "Stop" : VAPORIZER_2 === "1" ? "Run" : null;
        const DataVAPORIZER_1  = VAPORIZER_1 === "0" ? "Stop" : VAPORIZER_1 === "1" ? "Run" : null;
        const DataVAPORIZER_4  = VAPORIZER_4 === "0" ? "Stop" : VAPORIZER_4 === "1" ? "Run" : null;

        const DataCOOLING_V  = COOLING_V === "0" ? "Stop" : COOLING_V === "1" ? "Run" : null;



        const DataFCV_MODE  = FCV_MODE === "0" ? "Manual" : FCV_MODE === "1" ? "Auto" : null;
        const DataRATIO_MODE  = RATIO_MODE === "0" ? "Manual" : RATIO_MODE === "1" ? "Auto" : null;
   
        const DataTD_4072_Conn_STT  = TD_4072_Conn_STT === "0" ? "Not Init" : TD_4072_Conn_STT === "1" ? "COM OK" : TD_4072_Conn_STT === "2" ? "Error" : null;
   
        const DataPLC_Conn_STT  = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null;
        
    const combineCss = {



        CSSHR_BC : {
            color:exceedThresholdHR_BC && !maintainHR_BC
            ? "#ff5656"
            : maintainHR_BC
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


        CSSESD_2001 : {
            color:exceedThresholdESD_2001 && !maintainESD_2001
            ? "#ff5656"
            : maintainESD_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


  

        CSSPT_2004 : {
            color:exceedThresholdPT_2004 && !maintainPT_2004
            ? "#ff5656"
            : maintainPT_2004
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPT_2005 : {
            color:exceedThresholdPT_2005 && !maintainPT_2005
            ? "#ff5656"
            : maintainPT_2005
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSTT_2003 : {
            color:exceedThresholdTT_2003 && !maintainTT_2003
            ? "#ff5656"
            : maintainTT_2003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSTT_2004 : {
            color:exceedThresholdTT_2004 && !maintainTT_2004
            ? "#ff5656"
            : maintainTT_2004
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSTG_2005 : {
            color:exceedThresholdTG_2005 && !maintainTG_2005
            ? "#ff5656"
            : maintainTG_2005
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSWB_1001 : {
            color:exceedThresholdWB_1001 && !maintainWB_1001
            ? "#ff5656"
            : maintainWB_1001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_2002 : {
            color:exceedThresholdGD_2002 && !maintainGD_2002
            ? "#ff5656"
            : maintainGD_2002
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_2003 : {
            color:exceedThresholdGD_2003 && !maintainGD_2003
            ? "#ff5656"
            : maintainGD_2003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD_2004 : {
            color:exceedThresholdGD_2004 && !maintainGD_2004
            ? "#ff5656"
            : maintainGD_2004
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSGD_2005 : {
            color:exceedThresholdGD_2005 && !maintainGD_2005
            ? "#ff5656"
            : maintainGD_2005
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSGD_2006 : {
            color:exceedThresholdGD_2006 && !maintainGD_2006
            ? "#ff5656"
            : maintainGD_2006
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTM_2002_SNG : {
            color:exceedThresholdTM_2002_SNG && !maintainTM_2002_SNG
            ? "#ff5656"
            : maintainTM_2002_SNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTM_2003_SNG : {
            color:exceedThresholdTM_2003_SNG && !maintainTM_2003_SNG
            ? "#ff5656"
            : maintainTM_2003_SNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSSDV_2004 : {
            color:exceedThresholdSDV_2004 && !maintainSDV_2004
            ? "#ff5656"
            : maintainSDV_2004
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTOTAL_SNG : {
            color:exceedThresholdTOTAL_SNG && !maintainTOTAL_SNG
            ? "#ff5656"
            : maintainTOTAL_SNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSSDV_2003 : {
            color:exceedThresholdSDV_2003 && !maintainSDV_2003
            ? "#ff5656"
            : maintainSDV_2003
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSGD1_STATUS : {
            color:exceedThresholdGD1_STATUS && !maintainGD1_STATUS
            ? "#ff5656"
            : maintainGD1_STATUS
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSGD2_STATUS : {
            color:exceedThresholdGD2_STATUS && !maintainGD2_STATUS
            ? "#ff5656"
            : maintainGD2_STATUS
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD3_STATUS : {
            color:exceedThresholdGD3_STATUS && !maintainGD3_STATUS
            ? "#ff5656"
            : maintainGD3_STATUS
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSGD4_STATUS : {
            color:exceedThresholdGD4_STATUS && !maintainGD4_STATUS
            ? "#ff5656"
            : maintainGD4_STATUS
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD5_STATUS : {
            color:exceedThresholdGD5_STATUS && !maintainGD5_STATUS
            ? "#ff5656"
            : maintainGD5_STATUS
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





     
      

  
       
        CSSESD : {
            color:exceedThresholdESD && !maintainESD
            ? "#ff5656"
            : maintainESD
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSVAPORIZER_1 : {
            color:exceedThresholdVAPORIZER_1 && !maintainVAPORIZER_1
            ? "#ff5656"
            : maintainVAPORIZER_1
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSVAPORIZER_2 : {
            color:exceedThresholdVAPORIZER_2 && !maintainVAPORIZER_2
            ? "#ff5656"
            : maintainVAPORIZER_2
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSVAPORIZER_3 : {
            color:exceedThresholdVAPORIZER_3 && !maintainVAPORIZER_3
            ? "#ff5656"
            : maintainVAPORIZER_3
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSVAPORIZER_4 : {
            color:exceedThresholdVAPORIZER_4 && !maintainVAPORIZER_4
            ? "#ff5656"
            : maintainVAPORIZER_4
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSCOOLING_V : {
            color:exceedThresholdCOOLING_V && !maintainCOOLING_V
            ? "#ff5656"
            : maintainCOOLING_V
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


     


        CSSFCV_2001 : {
            color:exceedThresholdFCV_2001 && !maintainFCV_2001
            ? "#ff5656"
            : maintainFCV_2001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSPERCENT_LPG : {
            color:exceedThresholdPERCENT_LPG && !maintainPERCENT_LPG
            ? "#ff5656"
            : maintainPERCENT_LPG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSPERCENT_AIR : {
            color:exceedThresholdPERCENT_AIR && !maintainPERCENT_AIR
            ? "#ff5656"
            : maintainPERCENT_AIR
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSHV_1001 : {
            color:exceedThresholdHV_1001 && !maintainHV_1001
            ? "#ff5656"
            : maintainHV_1001
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFCV_MODE : {
            color:exceedThresholdFCV_MODE && !maintainFCV_MODE
            ? "#ff5656"
            : maintainFCV_MODE
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTOTAL_CNG : {
            color:exceedThresholdTOTAL_CNG && !maintainTOTAL_CNG
            ? "#ff5656"
            : maintainTOTAL_CNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTM_2003_CNG : {
            color:exceedThresholdTM_2003_CNG && !maintainTM_2003_CNG
            ? "#ff5656"
            : maintainTM_2003_CNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTM_2002_CNG : {
            color:exceedThresholdTM_2002_CNG && !maintainTM_2002_CNG
            ? "#ff5656"
            : maintainTM_2002_CNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSWB_Setpoint : {
            color:exceedThresholdWB_Setpoint && !maintainWB_Setpoint
            ? "#ff5656"
            : maintainWB_Setpoint
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

      




        CSSRATIO_MODE : {
            color:exceedThresholdRATIO_MODE && !maintainRATIO_MODE
            ? "#ff5656"
            : maintainRATIO_MODE
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSWIS_Calorimeter : {
            color:exceedThresholdWIS_Calorimeter && !maintainWIS_Calorimeter
            ? "#ff5656"
            : maintainWIS_Calorimeter
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSCVS_Calorimeter : {
            color:exceedThresholdCVS_Calorimeter && !maintainCVS_Calorimeter
            ? "#ff5656"
            : maintainCVS_Calorimeter
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSSG_Calorimeter : {
            color:exceedThresholdSG_Calorimeter && !maintainSG_Calorimeter
            ? "#ff5656"
            : maintainSG_Calorimeter
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },



        CSSTD_4072_Conn_STT : {
            color:exceedThresholdTD_4072_Conn_STT && !maintainTD_4072_Conn_STT
            ? "#ff5656"
            : maintainTD_4072_Conn_STT
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
    EVC01: 'EVC01 -  Parameter & Configuration',
    Calorimeter: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> Calorimeter -  Parameter & Configuration   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
    <Checkbox
    disabled={TECH_OPER}
        style={{ marginRight: 5 }}
        onChange={handleCheckboxChangeTD}
        checked={checkMaintainingTD}
    />
<p style={{fontSize:15}}>Maintain Calorimeter</p>  </div>  </span>   ,
    PLC:  <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameter & Configuration   <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
    <Checkbox
    disabled={TECH_OPER}

        style={{ marginRight: 5 }}
        onChange={handleCheckboxChangePLC}
        checked={checkMaintainingPLC}
    />
<p style={{fontSize:15}}>Maintain PLC </p>  </div>  </span> ,
};


const formatValue = (value:any) => {
    return value !== null
        ? new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true, 
          }).format(parseFloat(value))
        : "";
};

          const PLC01 = [
            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2004} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2004}>Pressure Transmitter PT-2004</span> ,
    
             modbus: <span style={combineCss.CSSPT_2004}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPT_2004} > {formatValue(PT_2004)} {nameValue.BARG} </span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSPT_2004}   placeholder='High' step="0.1" type='number' value={inputValuePT_2004} onChange={handleInputChangePT_2004} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSPT_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2004} onChange={handleInputChange2PT_2004} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_2004}
             checked={maintainPT_2004}
         ></Checkbox>
    
            },
    
            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2005} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2005}>Pressure Transmitter PT-2005</span> ,
    
             modbus: <span style={combineCss.CSSPT_2005}>40003	 </span> ,
    
            value: <span style={combineCss.CSSPT_2005} > {formatValue(PT_2005)}  {nameValue.BARG}</span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSPT_2005}   placeholder='High' step="0.1" type='number' value={inputValuePT_2005} onChange={handleInputChangePT_2005} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSPT_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2005} onChange={handleInputChange2PT_2005} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_2005}
             checked={maintainPT_2005}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSTT_2003} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSTT_2003}>Temperature Transmitter TT-2003</span> ,
   
            modbus: <span style={combineCss.CSSTT_2003}>40005	 </span> ,
   
           value: <span style={combineCss.CSSTT_2003} > {formatValue(TT_2003)}  {nameValue.C}</span> , 
            high: <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTT_2003}   placeholder='High' step="0.1" type='number' value={inputValueTT_2003} onChange={handleInputChangeTT_2003} inputMode="decimal" />, 
            low:  <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTT_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2003} onChange={handleInputChange2TT_2003} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainTT_2003}
            checked={maintainTT_2003}
        ></Checkbox>
   
           },

           {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSTT_2004} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSTT_2004}>Temperature Transmitter TT-2004</span> ,
  
           modbus: <span style={combineCss.CSSTT_2004}>40007	 </span> ,
  
          value: <span style={combineCss.CSSTT_2004} > {formatValue(TT_2004)} {nameValue.C}</span> , 
           high: <InputText 
disabled={TECHNIAN_AUTH}
           
           style={combineCss.CSSTT_2004}   placeholder='High' step="0.1" type='number' value={inputValueTT_2004} onChange={handleInputChangeTT_2004} inputMode="decimal" />, 
           low:  <InputText 
disabled={TECHNIAN_AUTH}
           
           style={combineCss.CSSTT_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2004} onChange={handleInputChange2TT_2004} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox  
           disabled={TECH_OPER} 
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainTT_2004}
           checked={maintainTT_2004}
       ></Checkbox>
  
          },

          {
           mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSTG_2005} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSTG_2005}>TG-2005</span> ,
 
          modbus: <span style={combineCss.CSSTG_2005}>40009	 </span> ,
 
         value: <span style={combineCss.CSSTG_2005} > {formatValue(TG_2005)} {nameValue.C}</span> , 
          high: <InputText 
disabled={TECHNIAN_AUTH}
          
          style={combineCss.CSSTG_2005}   placeholder='High' step="0.1" type='number' value={inputValueTG_2005} onChange={handleInputChangeTG_2005} inputMode="decimal" />, 
          low:  <InputText 
disabled={TECHNIAN_AUTH}
          
          style={combineCss.CSSTG_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2TG_2005} onChange={handleInputChange2TG_2005} inputMode="decimal" />,
          update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
          Maintain:   <Checkbox  
          disabled={TECH_OPER} 
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainTG_2005}
          checked={maintainTG_2005}
      ></Checkbox>
 
         },
         {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSWB_1001} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSWB_1001}>Wobbe Index WB-1001</span> ,

         modbus: <span style={combineCss.CSSWB_1001}>40011	 </span> ,

        value: <span style={combineCss.CSSWB_1001} > {formatValue(WB_1001)} (MJ/Sm³)</span> , 
         high: <InputText 
disabled={TECHNIAN_AUTH}
         
         style={combineCss.CSSWB_1001}   placeholder='High' step="0.1" type='number' value={inputValueWB_1001} onChange={handleInputChangeWB_1001} inputMode="decimal" />, 
         low:  <InputText 
disabled={TECHNIAN_AUTH}
         
         style={combineCss.CSSWB_1001}   placeholder='Low' step="0.1" type='number' value={inputValue2WB_1001} onChange={handleInputChange2WB_1001} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox  
         disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainWB_1001}
         checked={maintainWB_1001}
     ></Checkbox>

        },

  
        {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSGD_2002} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_2002}>Gas Detector GD-2002</span> ,

        modbus: <span style={combineCss.CSSGD_2002}>40013	 </span> ,

       value: <span style={combineCss.CSSGD_2002} > {formatValue(GD_2002)} {nameValue.LEL}</span> , 
        high: <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSGD_2002}   placeholder='High' step="0.1" type='number' value={inputValueGD_2002} onChange={handleInputChangeGD_2002} inputMode="decimal" />, 
        low:  <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSGD_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2002} onChange={handleInputChange2GD_2002} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_2002}
        checked={maintainGD_2002}
    ></Checkbox>

       },
       {
          mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSGD_2003} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSGD_2003}>Gas Detector GD-2003</span> ,

       modbus: <span style={combineCss.CSSGD_2003}>40015	 </span> ,

      value: <span style={combineCss.CSSGD_2003} > {formatValue(GD_2003)} {nameValue.LEL}</span> , 
       high: <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSGD_2003}   placeholder='High' step="0.1" type='number' value={inputValueGD_2003} onChange={handleInputChangeGD_2003} inputMode="decimal" />, 
       low:  <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSGD_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2003} onChange={handleInputChange2GD_2003} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={TECH_OPER} 
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainGD_2003}
       checked={maintainGD_2003}
   ></Checkbox>

      },

        {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSGD_2004} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_2004}>Gas Detector GD-2004</span> ,

        modbus: <span style={combineCss.CSSGD_2004}>40017	 </span> ,

       value: <span style={combineCss.CSSGD_2004} > {formatValue(GD_2004)} {nameValue.LEL}</span> , 
        high: <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSGD_2004}   placeholder='High' step="0.1" type='number' value={inputValueGD_2004} onChange={handleInputChangeGD_2004} inputMode="decimal" />, 
        low:  <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSGD_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2004} onChange={handleInputChange2GD_2004} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_2004}
        checked={maintainGD_2004}
    ></Checkbox>

       },


       {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSGD_2005} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSGD_2005}>Gas Detector GD-2005</span> ,

       modbus: <span style={combineCss.CSSGD_2005}>40019	 </span> ,

      value: <span style={combineCss.CSSGD_2005} > {formatValue(GD_2005)} {nameValue.LEL}</span> , 
       high: <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSGD_2005}   placeholder='High' step="0.1" type='number' value={inputValueGD_2005} onChange={handleInputChangeGD_2005} inputMode="decimal" />, 
       low:  <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSGD_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2005} onChange={handleInputChange2GD_2005} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={TECH_OPER} 
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainGD_2005}
       checked={maintainGD_2005}
   ></Checkbox>

      },

              
      {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSGD_2006} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSGD_2006}>Gas Detector GD-2006</span> ,

      modbus: <span style={combineCss.CSSGD_2006}>40021	 </span> ,

     value: <span style={combineCss.CSSGD_2006} > {formatValue(GD_2006)} {nameValue.LEL}</span> , 
      high: <InputText 
disabled={TECHNIAN_AUTH}
      
      style={combineCss.CSSGD_2006}   placeholder='High' step="0.1" type='number' value={inputValueGD_2006} onChange={handleInputChangeGD_2006} inputMode="decimal" />, 
      low:  <InputText 
disabled={TECHNIAN_AUTH}
      
      style={combineCss.CSSGD_2006}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2006} onChange={handleInputChange2GD_2006} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox  
      disabled={TECH_OPER} 
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_2006}
      checked={maintainGD_2006}
  ></Checkbox>

     },


            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSTM_2002_SNG} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSTM_2002_SNG}>Tubine Meter TM_2002-SNG </span> ,
       
            modbus: <span style={combineCss.CSSTM_2002_SNG}>40023	 </span> ,
       
           value: <span style={combineCss.CSSTM_2002_SNG} > {formatValue(TM_2002_SNG)} (Sm³/h)</span> , 
            high: <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTM_2002_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2002_SNG} onChange={handleInputChangeTM_2002_SNG} inputMode="decimal" />, 
            low:  <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTM_2002_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2002_SNG} onChange={handleInputChange2TM_2002_SNG} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainTM_2002_SNG}
            checked={maintainTM_2002_SNG}
        ></Checkbox>
       
           },
    
        




    {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSTM_2003_SNG} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSTM_2003_SNG}>Tubine Meter TM_2003-SNG </span> ,

    modbus: <span style={combineCss.CSSTM_2003_SNG}>40025	 </span> ,

   value: <span style={combineCss.CSSTM_2003_SNG} > {formatValue(TM_2003_SNG)} (Sm³/h)</span> , 
    high: <InputText 
disabled={TECHNIAN_AUTH}
    
    style={combineCss.CSSTM_2003_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2003_SNG} onChange={handleInputChangeTM_2003_SNG} inputMode="decimal" />, 
    low:  <InputText 
disabled={TECHNIAN_AUTH}
    
    style={combineCss.CSSTM_2003_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2003_SNG} onChange={handleInputChange2TM_2003_SNG} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox  
    disabled={TECH_OPER} 
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainTM_2003_SNG}
    checked={maintainTM_2003_SNG}
></Checkbox>

   },


   {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTOTAL_SNG} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSTOTAL_SNG}>Total SNG </span> ,

   modbus: <span style={combineCss.CSSTOTAL_SNG}>40027	 </span> ,

  value: <span style={combineCss.CSSTOTAL_SNG} > {formatValue(TOTAL_SNG)} (Sm³)</span> , 
   high: <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSTOTAL_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTOTAL_SNG} onChange={handleInputChangeTOTAL_SNG} inputMode="decimal" />, 
   low:  <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSTOTAL_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TOTAL_SNG} onChange={handleInputChange2TOTAL_SNG} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={TECH_OPER} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainTOTAL_SNG}
   checked={maintainTOTAL_SNG}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSDV_2004} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSSDV_2004}>Shutdown Valve SDV-2004</span> ,

  modbus: <span style={combineCss.CSSSDV_2004}>40029 </span> ,

 value: <span style={combineCss.CSSSDV_2004} > {formatValue(SDV_2004)} {DataSDV_2004} </span> , 
  high: <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSSDV_2004}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2004} onChange={handleInputChangeSDV_2004} inputMode="decimal" />, 
  low:  <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSSDV_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2004} onChange={handleInputChange2SDV_2004} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={TECH_OPER} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainSDV_2004}
  checked={maintainSDV_2004}
></Checkbox>

 },

 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSDV_2003} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSSDV_2003}>Shutdown Valve SDV-2003</span> ,

   modbus: <span style={combineCss.CSSSDV_2003}>40031 </span> ,

  value: <span style={combineCss.CSSSDV_2003} > {formatValue(SDV_2003)} {DataSDV_2003}</span> , 
   high: <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSSDV_2003}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2003} onChange={handleInputChangeSDV_2003} inputMode="decimal" />, 
   low:  <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSSDV_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2003} onChange={handleInputChange2SDV_2003} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={TECH_OPER} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainSDV_2003}
   checked={maintainSDV_2003}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD1_STATUS} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSGD1_STATUS}>GD-2002 Status</span> ,

  modbus: <span style={combineCss.CSSGD1_STATUS}>40033	</span> ,

 value: <span style={combineCss.CSSGD1_STATUS} > {formatValue(GD1_STATUS)} {DataGD1_STATUS}</span> , 
  high: <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSGD1_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD1_STATUS} onChange={handleInputChangeGD1_STATUS} inputMode="decimal" />, 
  low:  <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSGD1_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1_STATUS} onChange={handleInputChange2GD1_STATUS} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={TECH_OPER} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainGD1_STATUS}
  checked={maintainGD1_STATUS}
></Checkbox>

 },




 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD2_STATUS} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSGD2_STATUS}>GD-2003 Status</span> ,

 modbus: <span style={combineCss.CSSGD2_STATUS}>40035 </span> ,

value: <span style={combineCss.CSSGD2_STATUS} > {formatValue(GD2_STATUS)} {DataGD2_STATUS}</span> , 
 high: <InputText 
disabled={TECHNIAN_AUTH}
 
 style={combineCss.CSSGD2_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD2_STATUS} onChange={handleInputChangeGD2_STATUS} inputMode="decimal" />, 
 low:  <InputText 
disabled={TECHNIAN_AUTH}
 
 style={combineCss.CSSGD2_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2_STATUS} onChange={handleInputChange2GD2_STATUS} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox  
 disabled={TECH_OPER} 
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainGD2_STATUS}
 checked={maintainGD2_STATUS}
></Checkbox>

},

{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD3_STATUS} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSGD3_STATUS}>GD-2004 Status</span> ,

  modbus: <span style={combineCss.CSSGD3_STATUS}>40037	</span> ,

 value: <span style={combineCss.CSSGD3_STATUS} > {formatValue(GD3_STATUS)} {DataGD3_STATUS}</span> , 
  high: <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSGD3_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD3_STATUS} onChange={handleInputChangeGD3_STATUS} inputMode="decimal" />, 
  low:  <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSGD3_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD3_STATUS} onChange={handleInputChange2GD3_STATUS} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={TECH_OPER} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainGD3_STATUS}
  checked={maintainGD3_STATUS}
></Checkbox>

 },


 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD4_STATUS} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSGD4_STATUS}>GD-2005 Status</span> ,

 modbus: <span style={combineCss.CSSGD4_STATUS}>40039 </span> ,

value: <span style={combineCss.CSSGD4_STATUS} > {formatValue(GD4_STATUS)} {DataGD4_STATUS}</span> , 
 high: <InputText 
disabled={TECHNIAN_AUTH}
 
 style={combineCss.CSSGD4_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD4_STATUS} onChange={handleInputChangeGD4_STATUS} inputMode="decimal" />, 
 low:  <InputText 
disabled={TECHNIAN_AUTH}
 
 style={combineCss.CSSGD4_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD4_STATUS} onChange={handleInputChange2GD4_STATUS} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox  
 disabled={TECH_OPER} 
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainGD4_STATUS}
 checked={maintainGD4_STATUS}
></Checkbox>

},


{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD5_STATUS} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSGD5_STATUS}>GD-2006 Status</span> ,

modbus: <span style={combineCss.CSSGD5_STATUS}>40041 </span> ,

value: <span style={combineCss.CSSGD5_STATUS} > {formatValue(GD5_STATUS)} {DataGD5_STATUS}</span> , 
high: <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSGD5_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD5_STATUS} onChange={handleInputChangeGD5_STATUS} inputMode="decimal" />, 
low:  <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSGD5_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD5_STATUS} onChange={handleInputChange2GD5_STATUS} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={TECH_OPER} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainGD5_STATUS}
checked={maintainGD5_STATUS}
></Checkbox>

},

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSESD} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSESD}>Emergency Shutdown</span> ,
    
             modbus: <span style={combineCss.CSSESD}>40043	</span> ,
    
            value: <span style={combineCss.CSSESD} > {formatValue(ESD)} {DataESD}</span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSESD}   placeholder='High' step="0.1" type='number' value={inputValueESD} onChange={handleInputChangeESD} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSESD}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD} onChange={handleInputChange2ESD} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainESD}
             checked={maintainESD}
         ></Checkbox>
    
            },
            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSHR_BC} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSHR_BC}>Horn And Beacon</span> ,
            
            modbus: <span style={combineCss.CSSHR_BC}>40045	 </span> ,
            
            value: <span style={combineCss.CSSHR_BC} > {formatValue(HR_BC)} {DataHR_BC}</span> , 
            high: <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
            low:  <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainHR_BC}
            checked={maintainHR_BC}
            ></Checkbox>
            
            },
         
{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD}> Smoker Detector</span> ,

modbus: <span style={combineCss.CSSSD}>40047	</span> ,

value: <span style={combineCss.CSSSD} > {formatValue(SD)} {DataSD}</span> , 
high: <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSSD}   placeholder='High' step="0.1" type='number' value={inputValueSD} onChange={handleInputChangeSD} inputMode="decimal" />, 
low:  <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSSD}   placeholder='Low' step="0.1" type='number' value={inputValue2SD} onChange={handleInputChange2SD} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={TECH_OPER} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD}
checked={maintainSD}
></Checkbox>

},

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSVAPORIZER_1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVAPORIZER_1}>VAPORIZER 1</span> ,
    
             modbus: <span style={combineCss.CSSVAPORIZER_1}>40049	</span> ,
    
            value: <span style={combineCss.CSSVAPORIZER_1} > {formatValue(VAPORIZER_1)} {DataVAPORIZER_1} </span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_1}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_1} onChange={handleInputChangeVAPORIZER_1} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_1}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_1} onChange={handleInputChange2VAPORIZER_1} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVAPORIZER_1}
             checked={maintainVAPORIZER_1}
         ></Checkbox>
    
            },
    
            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSVAPORIZER_2} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVAPORIZER_2}>VAPORIZER 2</span> ,
    
             modbus: <span style={combineCss.CSSVAPORIZER_2}>40051</span> ,
    
            value: <span style={combineCss.CSSVAPORIZER_2} > {formatValue(VAPORIZER_2)} {DataVAPORIZER_2} </span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_2}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_2} onChange={handleInputChangeVAPORIZER_2} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_2} onChange={handleInputChange2VAPORIZER_2} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVAPORIZER_2}
             checked={maintainVAPORIZER_2}
         ></Checkbox>
    
            },


            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSVAPORIZER_3} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVAPORIZER_3}>VAPORIZER 3</span> ,
    
             modbus: <span style={combineCss.CSSVAPORIZER_3}>40053	 </span> ,
    
            value: <span style={combineCss.CSSVAPORIZER_3} > {formatValue(VAPORIZER_3)} {DataVAPORIZER_3} </span> , 
             high: <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_3}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_3} onChange={handleInputChangeVAPORIZER_3} inputMode="decimal" />, 
             low:  <InputText 
disabled={TECHNIAN_AUTH}
             
             style={combineCss.CSSVAPORIZER_3}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_3} onChange={handleInputChange2VAPORIZER_3} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVAPORIZER_3}
             checked={maintainVAPORIZER_3}
         ></Checkbox>
    
            },

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSVAPORIZER_4} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSVAPORIZER_4}>VAPORIZER 4</span> ,
   
            modbus: <span style={combineCss.CSSVAPORIZER_4}>40055	 </span> ,
   
           value: <span style={combineCss.CSSVAPORIZER_4} > {formatValue(VAPORIZER_4)} {DataVAPORIZER_4} </span> , 
            high: <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSVAPORIZER_4}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_4} onChange={handleInputChangeVAPORIZER_4} inputMode="decimal" />, 
            low:  <InputText 
disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSVAPORIZER_4}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_4} onChange={handleInputChange2VAPORIZER_4} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainVAPORIZER_4}
            checked={maintainVAPORIZER_4}
        ></Checkbox>
   
           },


           {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSCOOLING_V} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSCOOLING_V}>COOLING V</span> ,
  
           modbus: <span style={combineCss.CSSCOOLING_V}>40057	 </span> ,
  
          value: <span style={combineCss.CSSCOOLING_V} > {formatValue(COOLING_V)} {DataCOOLING_V}</span> , 
           high: <InputText 
disabled={TECHNIAN_AUTH}
           
           style={combineCss.CSSCOOLING_V}   placeholder='High' step="0.1" type='number' value={inputValueCOOLING_V} onChange={handleInputChangeCOOLING_V} inputMode="decimal" />, 
           low:  <InputText 
disabled={TECHNIAN_AUTH}
           
           style={combineCss.CSSCOOLING_V}   placeholder='Low' step="0.1" type='number' value={inputValue2COOLING_V} onChange={handleInputChange2COOLING_V} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox  
           disabled={TECH_OPER} 
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainCOOLING_V}
           checked={maintainCOOLING_V}
       ></Checkbox>
  
          },





         {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSFCV_2001} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSFCV_2001}>FCV-2001</span> ,

         modbus: <span style={combineCss.CSSFCV_2001}>40059	 </span> ,

        value: <span style={combineCss.CSSFCV_2001} > {formatValue(FCV_2001)} (%) </span> , 
         high: <InputText 
disabled={TECHNIAN_AUTH}
         
         style={combineCss.CSSFCV_2001}   placeholder='High' step="0.1" type='number' value={inputValueFCV_2001} onChange={handleInputChangeFCV_2001} inputMode="decimal" />, 
         low:  <InputText 
disabled={TECHNIAN_AUTH}
         
         style={combineCss.CSSFCV_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2FCV_2001} onChange={handleInputChange2FCV_2001} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox  
         disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainFCV_2001}
         checked={maintainFCV_2001}
     ></Checkbox>

        },


        {
                               mainCategory: mainCategoryFC.PLC,

            
            timeUpdate: <span style={combineCss.CSSPERCENT_LPG} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSPERCENT_LPG}>% LPG</span> ,

        modbus: <span style={combineCss.CSSPERCENT_LPG}>40061	 </span> ,

       value: <span style={combineCss.CSSPERCENT_LPG} > {formatValue(PERCENT_LPG)} (%)</span> , 
        high: <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSPERCENT_LPG}   placeholder='High' step="0.1" type='number' value={inputValuePERCENT_LPG} onChange={handleInputChangePERCENT_LPG} inputMode="decimal" />, 
        low:  <InputText 
disabled={TECHNIAN_AUTH}
        
        style={combineCss.CSSPERCENT_LPG}   placeholder='Low' step="0.1" type='number' value={inputValue2PERCENT_LPG} onChange={handleInputChange2PERCENT_LPG} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainPERCENT_LPG}
        checked={maintainPERCENT_LPG}
    ></Checkbox>

       },



       {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSPERCENT_AIR} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSPERCENT_AIR}>% AIR</span> ,

       modbus: <span style={combineCss.CSSPERCENT_AIR}>40063	 </span> ,

      value: <span style={combineCss.CSSPERCENT_AIR} > {formatValue(PERCENT_AIR)} (%)</span> , 
       high: <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSPERCENT_AIR}   placeholder='High' step="0.1" type='number' value={inputValuePERCENT_AIR} onChange={handleInputChangePERCENT_AIR} inputMode="decimal" />, 
       low:  <InputText 
disabled={TECHNIAN_AUTH}
       
       style={combineCss.CSSPERCENT_AIR}   placeholder='Low' step="0.1" type='number' value={inputValue2PERCENT_AIR} onChange={handleInputChange2PERCENT_AIR} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={TECH_OPER} 
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainPERCENT_AIR}
       checked={maintainPERCENT_AIR}
   ></Checkbox>

      },


      {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSHV_1001} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSHV_1001}>Heat Value HV-1001</span> ,

      modbus: <span style={combineCss.CSSHV_1001}>40065	 </span> ,

     value: <span style={combineCss.CSSHV_1001} > {formatValue(HV_1001)} (MJ/Sm³)</span> , 
      high: <InputText 
disabled={TECHNIAN_AUTH}
      
      style={combineCss.CSSHV_1001}   placeholder='High' step="0.1" type='number' value={inputValueHV_1001} onChange={handleInputChangeHV_1001} inputMode="decimal" />, 
      low:  <InputText 
disabled={TECHNIAN_AUTH}
      
      style={combineCss.CSSHV_1001}   placeholder='Low' step="0.1" type='number' value={inputValue2HV_1001} onChange={handleInputChange2HV_1001} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox  
      disabled={TECH_OPER} 
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainHV_1001}
      checked={maintainHV_1001}
  ></Checkbox>

     },
     {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSRATIO_MODE} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSRATIO_MODE}>RATIO Mode</span> ,
    
     modbus: <span style={combineCss.CSSRATIO_MODE}>40067	 </span> ,
    
    value: <span style={combineCss.CSSRATIO_MODE} > {formatValue(RATIO_MODE)} {DataRATIO_MODE}</span> , 
     high: <InputText 
disabled={TECHNIAN_AUTH}
     
     style={combineCss.CSSRATIO_MODE}   placeholder='High' step="0.1" type='number' value={inputValueRATIO_MODE} onChange={handleInputChangeRATIO_MODE} inputMode="decimal" />, 
     low:  <InputText 
disabled={TECHNIAN_AUTH}
     
     style={combineCss.CSSRATIO_MODE}   placeholder='Low' step="0.1" type='number' value={inputValue2RATIO_MODE} onChange={handleInputChange2RATIO_MODE} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox  
     disabled={TECH_OPER} 
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainRATIO_MODE}
     checked={maintainRATIO_MODE}
    ></Checkbox>
    
    },


     {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSFCV_MODE} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSFCV_MODE}>FCV Mode</span> ,

     modbus: <span style={combineCss.CSSFCV_MODE}>40069	 </span> ,

    value: <span style={combineCss.CSSFCV_MODE} > {formatValue(FCV_MODE)} {DataFCV_MODE}</span> , 
     high: <InputText 
disabled={TECHNIAN_AUTH}
     
     style={combineCss.CSSFCV_MODE}   placeholder='High' step="0.1" type='number' value={inputValueFCV_MODE} onChange={handleInputChangeFCV_MODE} inputMode="decimal" />, 
     low:  <InputText 
disabled={TECHNIAN_AUTH}
     
     style={combineCss.CSSFCV_MODE}   placeholder='Low' step="0.1" type='number' value={inputValue2FCV_MODE} onChange={handleInputChange2FCV_MODE} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox  
     disabled={TECH_OPER} 
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainFCV_MODE}
     checked={maintainFCV_MODE}
 ></Checkbox>

    },


    {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSTOTAL_CNG} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSTOTAL_CNG}>Total CNG</span> ,

    modbus: <span style={combineCss.CSSTOTAL_CNG}>40071	 </span> ,

   value: <span style={combineCss.CSSTOTAL_CNG} > {formatValue(TOTAL_CNG)} (Sm³)</span> , 
    high: <InputText 
disabled={TECHNIAN_AUTH}
    
    style={combineCss.CSSTOTAL_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTOTAL_CNG} onChange={handleInputChangeTOTAL_CNG} inputMode="decimal" />, 
    low:  <InputText 
disabled={TECHNIAN_AUTH}
    
    style={combineCss.CSSTOTAL_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TOTAL_CNG} onChange={handleInputChange2TOTAL_CNG} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox  
    disabled={TECH_OPER} 
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainTOTAL_CNG}
    checked={maintainTOTAL_CNG}
></Checkbox>

   },


   {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTM_2002_CNG} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSTM_2002_CNG}>Tubine Meter TM_2002-CNG</span> ,

   modbus: <span style={combineCss.CSSTM_2002_CNG}>40073	 </span> ,

  value: <span style={combineCss.CSSTM_2002_CNG} > {formatValue(TM_2002_CNG)} (Sm³/h)</span> , 
   high: <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSTM_2002_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2002_CNG} onChange={handleInputChangeTM_2002_CNG} inputMode="decimal" />, 
   low:  <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSTM_2002_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2002_CNG} onChange={handleInputChange2TM_2002_CNG} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={TECH_OPER} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainTM_2002_CNG}
   checked={maintainTM_2002_CNG}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTM_2003_CNG} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSTM_2003_CNG}>Tubine Meter TM_2003-CNG</span> ,

  modbus: <span style={combineCss.CSSTM_2003_CNG}>40075	 </span> ,

 value: <span style={combineCss.CSSTM_2003_CNG} > {formatValue(TM_2003_CNG)} (Sm³/h)</span> , 
  high: <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSTM_2003_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2003_CNG} onChange={handleInputChangeTM_2003_CNG} inputMode="decimal" />, 
  low:  <InputText 
disabled={TECHNIAN_AUTH}
  
  style={combineCss.CSSTM_2003_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2003_CNG} onChange={handleInputChange2TM_2003_CNG} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={TECH_OPER} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainTM_2003_CNG}
  checked={maintainTM_2003_CNG}
></Checkbox>

 },

 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSWB_Setpoint} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSWB_Setpoint}>Wobbe Index Setpoint</span> ,

   modbus: <span style={combineCss.CSSWB_Setpoint}>40077	 </span> ,

  value: <span style={combineCss.CSSWB_Setpoint} > {formatValue(WB_Setpoint)} (MJ/Sm³)</span> , 
   high: <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSWB_Setpoint}   placeholder='High' step="0.1" type='number' value={inputValueWB_Setpoint} onChange={handleInputChangeWB_Setpoint} inputMode="decimal" />, 
   low:  <InputText 
disabled={TECHNIAN_AUTH}
   
   style={combineCss.CSSWB_Setpoint}   placeholder='Low' step="0.1" type='number' value={inputValue2WB_Setpoint} onChange={handleInputChange2WB_Setpoint} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={TECH_OPER} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainWB_Setpoint}
   checked={maintainWB_Setpoint}
></Checkbox>

  },



  {
    mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSPLC_Conn_STT} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSPLC_Conn_STT}>PLC Connection Status</span> ,

modbus: <span style={combineCss.CSSPLC_Conn_STT}>Status</span> ,

value: <span style={combineCss.CSSPLC_Conn_STT} > {formatValue(PLC_Conn_STT)} {DataPLC_Conn_STT}</span> , 
high: <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSPLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
low:  <InputText 
disabled={TECHNIAN_AUTH}

style={combineCss.CSSPLC_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={TECH_OPER} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainPLC_Conn_STT}
checked={maintainPLC_Conn_STT}
></Checkbox>

},

  

          ]


          const Calorimeter = [

            {
                mainCategory: mainCategoryFC.Calorimeter,
            
            timeUpdate: <span style={combineCss.CSSWIS_Calorimeter} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSWIS_Calorimeter}>WIS Calorimeter</span> ,
            
            modbus: <span style={combineCss.CSSWIS_Calorimeter}>40001	 </span> ,
            
            value: <span style={combineCss.CSSWIS_Calorimeter} > {formatValue(WIS_Calorimeter)}  (MJ/Sm³)</span> , 
            high: <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSWIS_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueWIS_Calorimeter} onChange={handleInputChangeWIS_Calorimeter} inputMode="decimal" />, 
            low:  <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSWIS_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2WIS_Calorimeter} onChange={handleInputChange2WIS_Calorimeter} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainWIS_Calorimeter}
            checked={maintainWIS_Calorimeter}
            ></Checkbox>
            
            },
            
            
            {
                mainCategory: mainCategoryFC.Calorimeter,
            
            timeUpdate: <span style={combineCss.CSSCVS_Calorimeter} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSCVS_Calorimeter}>CVS Calorimeter</span> ,
            
            modbus: <span style={combineCss.CSSCVS_Calorimeter}>40002	 </span> ,
            
            value: <span style={combineCss.CSSCVS_Calorimeter} > {formatValue(CVS_Calorimeter)}  (MJ/Sm³)</span> , 
            high: <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSCVS_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueCVS_Calorimeter} onChange={handleInputChangeCVS_Calorimeter} inputMode="decimal" />, 
            low:  <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSCVS_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2CVS_Calorimeter} onChange={handleInputChange2CVS_Calorimeter} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainCVS_Calorimeter}
            checked={maintainCVS_Calorimeter}
            ></Checkbox>
            
            },
            
            {
                mainCategory: mainCategoryFC.Calorimeter,
            
            timeUpdate: <span style={combineCss.CSSSG_Calorimeter} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSSG_Calorimeter}>SG Calorimeter</span> ,
            
            modbus: <span style={combineCss.CSSSG_Calorimeter}>40003	 </span> ,
            
            value: <span style={combineCss.CSSSG_Calorimeter} > {formatValue(SG_Calorimeter)} (rel)</span> , 
            high: <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSSG_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueSG_Calorimeter} onChange={handleInputChangeSG_Calorimeter} inputMode="decimal" />, 
            low:  <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSSG_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2SG_Calorimeter} onChange={handleInputChange2SG_Calorimeter} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainSG_Calorimeter}
            checked={maintainSG_Calorimeter}
            ></Checkbox>
            
            },

            {
                mainCategory: mainCategoryFC.Calorimeter,
            
            timeUpdate: <span style={combineCss.CSSTD_4072_Conn_STT} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSTD_4072_Conn_STT}>Calorimeter Connection Status</span> ,
            
            modbus: <span style={combineCss.CSSTD_4072_Conn_STT}>Status	 </span> ,
            
            value: <span style={combineCss.CSSTD_4072_Conn_STT} > {formatValue(TD_4072_Conn_STT)} {DataTD_4072_Conn_STT}</span> , 
            high: <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTD_4072_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueTD_4072_Conn_STT} onChange={handleInputChangeTD_4072_Conn_STT} inputMode="decimal" />, 
            low:  <InputText 
            disabled={TECHNIAN_AUTH}
            
            style={combineCss.CSSTD_4072_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2TD_4072_Conn_STT} onChange={handleInputChange2TD_4072_Conn_STT} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainTD_4072_Conn_STT}
            checked={maintainTD_4072_Conn_STT}
            ></Checkbox>
            
            },
            
          ]

          const combinedData = [ ...PLC01,...Calorimeter];

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
    const Configuration = [
        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-2003) (BarG)</span>,

            Value: (
                <InputText 
                disabled={AuthUpdatePCV}


                    style={combineCssAttribute.PCV}
                    step="0.1" type='number'
                    value={inputPCV_01}
                    onChange={handleInputPCV_01}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthUpdatePCV}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PSV-2004) (BarG)</span>,
            Value: (
                <InputText 
                disabled={AuthUpdatePCV}


                    style={combineCssAttribute.PCV}
                    step="0.1"
                    type='number'
                    value={inputPCV_02}
                    onChange={handleInputPCV_02}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthUpdatePCV}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },
        {
            Name: <span style={combineCssAttribute.PCV}>IOT gateway phone number </span>,

            Value: (
                <InputText 
                disabled={AuthUpdatePCV}


                    style={combineCssAttribute.PCV}
                    step="0.1" type='number'
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
                    inputMode="decimal"
                />
            ),

            Update: (
                <Button
                disabled={AuthUpdatePCV}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

    ];

    const maintainHeader = (
        <div>

                <Checkbox  
                disabled={TECH_OPER} 
                    style={{ marginRight: 5 }}
                    onChange={handleCheckboxChange}
                    checked={handleCheckboxChangeALL}
                />
            Maintain

        </div>
    );


       //=========================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, }}>
   
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>SNG BINH DUONG</h2>

<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
  <div style={{ width: '100%' }}>
    <DataTable 
       rowGroupMode="subheader"
       size={'small'}      resizableColumns
       tableStyle={{ minWidth: '50rem' }} 
      value={combinedData}  
      groupRowsBy="mainCategory"  
       sortOrder={1} 
       rowGroupHeaderTemplate={mainCategoryTemplate} >
      <Column field="timeUpdate" header="Time Update" />
      <Column field="modbus" header="Modbus" />
      <Column field="name" header="Name" />
      <Column field="value" header="Value" />
      <Column field="high" header="High" />
      <Column field="low" header="Low" />
        <Column field="Maintain" header={maintainHeader} />
     <Column field="update" header="Update"     
style={{ width: '45px' }} 
/>  
    </DataTable>
  </div>

  <div style={{ width: '100%', borderRadius: 5,}}>
    <h4>Station - Configuration</h4>
    <DataTable value={Configuration} size={'small'} selectionMode="single">
      <Column field="Name" header="Name" />
     
      <Column field="Value" header="value" />
    
      <Column
        field="Update" 
        header={<div style={{position:'relative', right:45}}>Update</div>} 
        style={{ display: 'flex', justifyContent: 'flex-end',right:45}} 
      />  
    </DataTable>
  </div>
</div>


<br />
<br />

</div>
  )
}
