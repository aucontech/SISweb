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
    
    const AuthUpdate = userId === UserTechnican.A  ||
    userId === UserTechnican.Q ||
     userId ===  UserTechnican.N ||
      userId === UserTechnican.T  ||
       userId === UserTechnican.TN ||
        userId === UserTechnican.DT ||
        userId === UserTechnican.KL ; 
    
    
    const AuthInput = userId !== UserTechnican.A  && 
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


            const AuthInputHighLow = userId !== UserTechnican.A  && 
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
                        TM2002_CNG: setTM2002_CNG,
                        TM2003_CNG: setTM2003_CNG,
                        
                        WB_Setpoint: setWB_Setpoint,


                        ESD_2001: setESD_2001,
                   
                        WIS_Calorimeter: setWIS_Calorimeter,
                        CVS_Calorimeter: setCVS_Calorimeter,
                        SG_Calorimeter :setSG_Calorimeter,
                  
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
            const ESD_Low = res.data.find((item: any) => item.key === "VAPORIZER_1_Low");
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

            const TM2002_CNG_High = res.data.find((item: any) => item.key === "TM2002_CNG_High");
            setTM2002_CNG_High(TM2002_CNG_High?.value || null);
            const TM2002_CNG_Low = res.data.find((item: any) => item.key === "TM2002_CNG_Low");
            setTM2002_CNG_Low(TM2002_CNG_Low?.value || null);
            const TM2002_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM2002_CNG_Maintain"
            );

            const TM2003_CNG_High = res.data.find((item: any) => item.key === "TM2003_CNG_High");
            setTM2003_CNG_High(TM2003_CNG_High?.value || null);
            const TM2003_CNG_Low = res.data.find((item: any) => item.key === "TM2003_CNG_Low");
            setTM2003_CNG_Low(TM2003_CNG_Low?.value || null);
            const TM2003_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM2003_CNG_Maintain"
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

         
 // =================================================================================================================== 
 setMaintainWIS_Calorimeter(WIS_Calorimeter_Maintain?.value || false);

 setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);

 setMaintainSG_Calorimeter(SG_Calorimeter_Maintain?.value || false);


            setMaintainHR_BC(HR_BC_Maintain?.value || false);

            setMaintainSD(SD_Maintain?.value || false);

            setMaintainESD_2001(ESD_2001_Maintain?.value || false);


      


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






         

            setMaintainEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Maintain?.value || false);


            setMaintainGD_2005(GD_2005_Maintain?.value || false);

            setMaintainGD_2004(GD_2004_Maintain?.value || false);


            setMaintainGD_2003(GD_2003_Maintain?.value || false);


            setMaintainGD_2002(GD_2002_Maintain?.value || false);

            setMaintainWB_1001(WB_1001_Maintain?.value || false);


            setMaintainTG_2005(TG_2005_Maintain?.value || false);

            setMaintainTT_2004(TT_2004_Maintain?.value || false);

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


            setMaintainTM2003_CNG(TM2003_CNG_Maintain?.value || false);

            setMaintainTM2002_CNG(TM2002_CNG_Maintain?.value || false);

            setMaintainTOTAL_CNG(TOTAL_CNG_Maintain?.value || false);


            setMaintainFCV_MODE(FCV_MODE_Maintain?.value || false);

            setMaintainHV_1001(HV_1001_Maintain?.value || false);


            setMaintainPERCENT_AIR(PERCENT_AIR_Maintain?.value || false);

            setMaintainPERCENT_LPG(PERCENT_LPG_Maintain?.value || false);


            setMaintainFCV_2001(FCV_2001_Maintain?.value || false);




            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };


        

 // =================================================================================================================== 

    const [PT_2004, setPT_2004] = useState<string | null>(null);
const [audioPlayingPT_2004, setAudioPlayingPT_2004] = useState(false);
const [inputValuePT_2004, setInputValuePT_2004] = useState<any>();
const [inputValue2PT_2004, setInputValue2PT_2004] = useState<any>();
const [PT_2004_High, setPT_2004_High] = useState<number | null>(null);
const [PT_2004_Low, setPT_2004_Low] = useState<number | null>(null);
const [exceedThresholdPT_2004, setExceedThresholdPT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainPT_2004, setMaintainPT_2004] = useState<boolean>(false);


    useEffect(() => {
        if (typeof PT_2004_High === 'string' && typeof PT_2004_Low === 'string' && PT_2004 !== null && maintainPT_2004 === false
        ) {
            const highValue = parseFloat(PT_2004_High);
            const lowValue = parseFloat(PT_2004_Low);
            const PT_2004Value = parseFloat(PT_2004);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2004Value)) {
                if (highValue <= PT_2004Value || PT_2004Value <= lowValue) {
                    if (!audioPlayingPT_2004) {
                        audioRef.current?.play();
                        setAudioPlayingPT_2004(true);
                        setExceedThresholdPT_2004(true);
                    }
                } else {
                    setAudioPlayingPT_2004(false);
                    setExceedThresholdPT_2004(false);
                }
            } 
        } 
    }, [PT_2004_High, PT_2004, audioPlayingPT_2004, PT_2004_Low,maintainPT_2004]);

    useEffect(() => {
        if (audioPlayingPT_2004) {
            const audioEnded = () => {
                setAudioPlayingPT_2004(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingPT_2004]);

    const handleInputChangePT_2004 = (event: any) => {
        const newValue = event.target.value;
        setInputValuePT_2004(newValue);
    };

    const handleInputChange2PT_2004 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2PT_2004(newValue2);
    };
    const ChangeMaintainPT_2004 = async () => {
        try {
            const newValue = !maintainPT_2004;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { PT_2004_Maintain: newValue }
            );
            setMaintainPT_2004(newValue);
            
        } catch (error) {}
    };


     // =================================================================================================================== 

     const [PT_2005, setPT_2005] = useState<string | null>(null);
     const [audioPlayingPT_2005, setAudioPlayingPT_2005] = useState(false);
     const [inputValuePT_2005, setInputValuePT_2005] = useState<any>();
     const [inputValue2PT_2005, setInputValue2PT_2005] = useState<any>();
     const [PT_2005_High, setPT_2005_High] = useState<number | null>(null);
     const [PT_2005_Low, setPT_2005_Low] = useState<number | null>(null);
     const [exceedThresholdTemperature, setExceedThresholdTemperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainPT_2005, setMaintainPT_2005] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof PT_2005_High === 'string' && typeof PT_2005_Low === 'string' && PT_2005 !== null && maintainPT_2005 === false
             ) {
                 const highValue = parseFloat(PT_2005_High);
                 const lowValue = parseFloat(PT_2005_Low);
                 const PT_2005Value = parseFloat(PT_2005);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2005Value)) {
                     if (highValue <= PT_2005Value || PT_2005Value <= lowValue) {
                         if (!audioPlayingPT_2005) {
                             audioRef.current?.play();
                             setAudioPlayingPT_2005(true);
                             setExceedThresholdTemperature(true);
                         }
                     } else {
                        setAudioPlayingPT_2005(false);
                         setExceedThresholdTemperature(false);
                     }
                 } 
             } 
         }, [PT_2005_High, PT_2005, audioPlayingPT_2005, PT_2005_Low,maintainPT_2005]);
     
         useEffect(() => {
             if (audioPlayingPT_2005) {
                 const audioEnded = () => {
                    setAudioPlayingPT_2005(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingPT_2005]);
     
         const handleInputChangePT_2005 = (event: any) => {
             const newValue = event.target.value;
             setInputValuePT_2005(newValue);
         };
     
         const handleInputChange2PT_2005 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2PT_2005(newValue2);
         };
         const ChangeMaintainPT_2005 = async () => {
             try {
                 const newValue = !maintainPT_2005;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { PT_2005_Maintain: newValue }
                 );
                 setMaintainPT_2005(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 


     const [TT_2003, setTT_2003] = useState<string | null>(null);
     const [audioPlayingTT_2003, setAudioPlayingTT_2003] = useState(false);
     const [inputValueTT_2003, setInputValueTT_2003] = useState<any>();
     const [inputValue2TT_2003, setInputValue2TT_2003] = useState<any>();
     const [TT_2003_High, setTT_2003_High] = useState<number | null>(null);
     const [TT_2003_Low, setTT_2003_Low] = useState<number | null>(null);
     const [exceedThresholdTT_2003, setExceedThresholdTT_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTT_2003, setMaintainTT_2003] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TT_2003_High === 'string' && typeof TT_2003_Low === 'string' && TT_2003 !== null && maintainTT_2003 === false
             ) {
                 const highValue = parseFloat(TT_2003_High);
                 const lowValue = parseFloat(TT_2003_Low);
                 const TT_2003Value = parseFloat(TT_2003);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2003Value)) {
                     if (highValue <= TT_2003Value || TT_2003Value <= lowValue) {
                         if (!audioPlayingTT_2003) {
                             audioRef.current?.play();
                             setAudioPlayingTT_2003(true);
                             setExceedThresholdTT_2003(true);
                         }
                     } else {
                        setAudioPlayingTT_2003(false);
                        setExceedThresholdTT_2003(false);
                     }
                 } 
             } 
         }, [TT_2003_High, TT_2003, audioPlayingTT_2003, TT_2003_Low,maintainTT_2003]);
     
         useEffect(() => {
             if (audioPlayingTT_2003) {
                 const audioEnded = () => {
                    setAudioPlayingTT_2003(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingTT_2003]);
     
         const handleInputChangeTT_2003 = (event: any) => {
             const newValue = event.target.value;
             setInputValueTT_2003(newValue);
         };
     
         const handleInputChange2TT_2003 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2TT_2003(newValue2);
         };
         const ChangeMaintainTT_2003 = async () => {
             try {
                 const newValue = !maintainTT_2003;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { TT_2003_Maintain: newValue }
                 );
                 setMaintainTT_2003(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 



          const [TT_2004, setTT_2004] = useState<string | null>(null);
          const [audioPlayingTT_2004, setAudioPlayingTT_2004] = useState(false);
          const [inputValueTT_2004, setInputValueTT_2004] = useState<any>();
          const [inputValue2TT_2004, setInputValue2TT_2004] = useState<any>();
          const [TT_2004_High, setTT_2004_High] = useState<number | null>(null);
          const [TT_2004_Low, setTT_2004_Low] = useState<number | null>(null);
          const [exceedThresholdTT_2004, setExceedThresholdTT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainTT_2004, setMaintainTT_2004] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof TT_2004_High === 'string' && typeof TT_2004_Low === 'string' && TT_2004 !== null && maintainTT_2004 === false
                  ) {
                      const highValue = parseFloat(TT_2004_High);
                      const lowValue = parseFloat(TT_2004_Low);
                      const TT_2004Value = parseFloat(TT_2004);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2004Value)) {
                          if (highValue <= TT_2004Value || TT_2004Value <= lowValue) {
                              if (!audioPlayingTT_2004) {
                                  audioRef.current?.play();
                                  setAudioPlayingTT_2004(true);
                                  setExceedThresholdTT_2004(true);
                              }
                          } else {
                             setAudioPlayingTT_2004(false);
                             setExceedThresholdTT_2004(false);
                          }
                      } 
                  } 
              }, [TT_2004_High, TT_2004, audioPlayingTT_2004, TT_2004_Low,maintainTT_2004]);
          
              useEffect(() => {
                  if (audioPlayingTT_2004) {
                      const audioEnded = () => {
                         setAudioPlayingTT_2004(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingTT_2004]);
          
              const handleInputChangeTT_2004 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueTT_2004(newValue);
              };
          
              const handleInputChange2TT_2004 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2TT_2004(newValue2);
              };
              const ChangeMaintainTT_2004 = async () => {
                  try {
                      const newValue = !maintainTT_2004;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { TT_2004_Maintain: newValue }
                      );
                      setMaintainTT_2004(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [TG_2005, setTG_2005] = useState<string | null>(null);
          const [audioPlayingTG_2005, setAudioPlayingTG_2005] = useState(false);
          const [inputValueTG_2005, setInputValueTG_2005] = useState<any>();
          const [inputValue2TG_2005, setInputValue2TG_2005] = useState<any>();
          const [TG_2005_High, setTG_2005_High] = useState<number | null>(null);
          const [TG_2005_Low, setTG_2005_Low] = useState<number | null>(null);
          const [exceedThresholdTG_2005, setExceedThresholdTG_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainTG_2005, setMaintainTG_2005] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof TG_2005_High === 'string' && typeof TG_2005_Low === 'string' && TG_2005 !== null && maintainTG_2005 === false
                  ) {
                      const highValue = parseFloat(TG_2005_High);
                      const lowValue = parseFloat(TG_2005_Low);
                      const TG_2005Value = parseFloat(TG_2005);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TG_2005Value)) {
                          if (highValue <= TG_2005Value || TG_2005Value <= lowValue) {
                              if (!audioPlayingTG_2005) {
                                  audioRef.current?.play();
                                  setAudioPlayingTG_2005(true);
                                  setExceedThresholdTG_2005(true);
                              }
                          } else {
                             setAudioPlayingTG_2005(false);
                             setExceedThresholdTG_2005(false);
                          }
                      } 
                  } 
              }, [TG_2005_High, TG_2005, audioPlayingTG_2005 , TG_2005_Low,maintainTG_2005]);
          
              useEffect(() => {
                  if (audioPlayingTG_2005) {
                      const audioEnded = () => {
                         setAudioPlayingTG_2005(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingTG_2005]);
          
              const handleInputChangeTG_2005 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueTG_2005(newValue);
              };
          
              const handleInputChange2TG_2005 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2TG_2005(newValue2);
              };
              const ChangeMaintainTG_2005 = async () => {
                  try {
                      const newValue = !maintainTG_2005;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { TG_2005_Maintain: newValue }
                      );
                      setMaintainTG_2005(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [WB_1001, setWB_1001] = useState<string | null>(null);
          const [audioPlayingWB_1001, setAudioPlayingWB_1001] = useState(false);
          const [inputValueWB_1001, setInputValueWB_1001] = useState<any>();
          const [inputValue2WB_1001, setInputValue2WB_1001] = useState<any>();
          const [WB_1001_High, setWB_1001_High] = useState<number | null>(null);
          const [WB_1001_Low, setWB_1001_Low] = useState<number | null>(null);
          const [exceedThresholdWB_1001, setExceedThresholdWB_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainWB_1001, setMaintainWB_1001] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof WB_1001_High === 'string' && typeof WB_1001_Low === 'string' && WB_1001 !== null && maintainWB_1001 === false
                  ) {
                      const highValue = parseFloat(WB_1001_High);
                      const lowValue = parseFloat(WB_1001_Low);
                      const WB_1001Value = parseFloat(WB_1001);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WB_1001Value)) {
                          if (highValue <= WB_1001Value || WB_1001Value <= lowValue) {
                              if (!audioPlayingWB_1001) {
                                  audioRef.current?.play();
                                  setAudioPlayingWB_1001(true);
                                  setExceedThresholdWB_1001(true);
                              }
                          } else {
                             setAudioPlayingWB_1001(false);
                             setExceedThresholdWB_1001(false);
                          }
                      } 
                  } 
              }, [WB_1001_High, WB_1001, audioPlayingWB_1001, WB_1001_Low,maintainWB_1001]);
          
              useEffect(() => {
                  if (audioPlayingWB_1001) {
                      const audioEnded = () => {
                         setAudioPlayingWB_1001(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingWB_1001]);
          
              const handleInputChangeWB_1001 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueWB_1001(newValue);
              };
          
              const handleInputChange2WB_1001 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2WB_1001(newValue2);
              };
              const ChangeMaintainWB_1001 = async () => {
                  try {
                      const newValue = !maintainWB_1001;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { WB_1001_Maintain: newValue }
                      );
                      setMaintainWB_1001(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [GD_2004, setGD_2004] = useState<string | null>(null);
          const [audioPlayingGD_2004, setAudioPlayingGD_2004] = useState(false);
          const [inputValueGD_2004, setInputValueGD_2004] = useState<any>();
          const [inputValue2GD_2004, setInputValue2GD_2004] = useState<any>();
          const [GD_2004_High, setGD_2004_High] = useState<number | null>(null);
          const [GD_2004_Low, setGD_2004_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2004, setExceedThresholdGD_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainGD_2004, setMaintainGD_2004] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof GD_2004_High === 'string' && typeof GD_2004_Low === 'string' && GD_2004 !== null && maintainGD_2004 === false
                  ) {
                      const highValue = parseFloat(GD_2004_High);
                      const lowValue = parseFloat(GD_2004_Low);
                      const GD_2004Value = parseFloat(GD_2004);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2004Value)) {
                          if (highValue <= GD_2004Value || GD_2004Value <= lowValue) {
                              if (!audioPlayingGD_2004) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_2004(true);
                                  setExceedThresholdGD_2004(true);
                              }
                          } else {
                             setAudioPlayingGD_2004(false);
                             setExceedThresholdGD_2004(false);
                          }
                      } 
                  } 
              }, [GD_2004_High, GD_2004, audioPlayingGD_2004, GD_2004_Low,maintainGD_2004]);
          
              useEffect(() => {
                  if (audioPlayingGD_2004) {
                      const audioEnded = () => {
                         setAudioPlayingGD_2004(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_2004]);
          
              const handleInputChangeGD_2004 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_2004(newValue);
              };
          
              const handleInputChange2GD_2004 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_2004(newValue2);
              };
              const ChangeMaintainGD_2004 = async () => {
                  try {
                      const newValue = !maintainGD_2004;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { GD_2004_Maintain: newValue }
                      );
                      setMaintainGD_2004(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_2003, setGD_2003] = useState<string | null>(null);
          const [audioPlayingGD_2003, setAudioPlayingGD_2003] = useState(false);
          const [inputValueGD_2003, setInputValueGD_2003] = useState<any>();
          const [inputValue2GD_2003, setInputValue2GD_2003] = useState<any>();
          const [GD_2003_High, setGD_2003_High] = useState<number | null>(null);
          const [GD_2003_Low, setGD_2003_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2003, setExceedThresholdGD_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainGD_2003, setMaintainGD_2003] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof GD_2003_High === 'string' && typeof GD_2003_Low === 'string' && GD_2003 !== null && maintainGD_2003 === false
                  ) {
                      const highValue = parseFloat(GD_2003_High);
                      const lowValue = parseFloat(GD_2003_Low);
                      const GD_2003Value = parseFloat(GD_2003);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2003Value)) {
                          if (highValue <= GD_2003Value || GD_2003Value <= lowValue) {
                              if (!audioPlayingGD_2003) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_2003(true);
                                  setExceedThresholdGD_2003(true);
                              }
                          } else {
                             setAudioPlayingGD_2003(false);
                             setExceedThresholdGD_2003(false);
                          }
                      } 
                  } 
              }, [GD_2003_High, GD_2003, audioPlayingGD_2003, GD_2003_Low,maintainGD_2003]);
          
              useEffect(() => {
                  if (audioPlayingGD_2003) {
                      const audioEnded = () => {
                         setAudioPlayingGD_2003(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_2003]);
          
              const handleInputChangeGD_2003 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_2003(newValue);
              };
          
              const handleInputChange2GD_2003 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_2003(newValue2);
              };
              const ChangeMaintainGD_2003 = async () => {
                  try {
                      const newValue = !maintainGD_2003;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { GD_2003_Maintain: newValue }
                      );
                      setMaintainGD_2003(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_2002, setGD_2002] = useState<string | null>(null);
          const [audioPlayingGD_2002, setAudioPlayingGD_2002] = useState(false);
          const [inputValueGD_2002, setInputValueGD_2002] = useState<any>();
          const [inputValue2GD_2002, setInputValue2GD_2002] = useState<any>();
          const [GD_2002_High, setGD_2002_High] = useState<number | null>(null);
          const [GD_2002_Low, setGD_2002_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2002, setExceedThresholdGD_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainGD_2002, setMaintainGD_2002] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof GD_2002_High === 'string' && typeof GD_2002_Low === 'string' && GD_2002 !== null && maintainGD_2002 === false
                  ) {
                      const highValue = parseFloat(GD_2002_High);
                      const lowValue = parseFloat(GD_2002_Low);
                      const GD_2002Value = parseFloat(GD_2002);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2002Value)) {
                          if (highValue <= GD_2002Value || GD_2002Value <= lowValue) {
                              if (!audioPlayingGD_2002) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_2002(true);
                                  setExceedThresholdGD_2002(true);
                              }
                          } else {
                             setAudioPlayingGD_2002(false);
                             setExceedThresholdGD_2002(false);
                          }
                      } 
                  } 
              }, [GD_2002_High, GD_2002, audioPlayingGD_2002, GD_2002_Low,maintainGD_2002]);
          
              useEffect(() => {
                  if (audioPlayingGD_2002) {
                      const audioEnded = () => {
                         setAudioPlayingGD_2002(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_2002]);
          
              const handleInputChangeGD_2002 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_2002(newValue);
              };
          
              const handleInputChange2GD_2002 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_2002(newValue2);
              };
              const ChangeMaintainGD_2002 = async () => {
                  try {
                      const newValue = !maintainGD_2002;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { GD_2002_Maintain: newValue }
                      );
                      setMaintainGD_2002(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_2005, setGD_2005] = useState<string | null>(null);
          const [audioPlayingGD_2005, setAudioPlayingGD_2005] = useState(false);
          const [inputValueGD_2005, setInputValueGD_2005] = useState<any>();
          const [inputValue2GD_2005, setInputValue2GD_2005] = useState<any>();
          const [GD_2005_High, setGD_2005_High] = useState<number | null>(null);
          const [GD_2005_Low, setGD_2005_Low] = useState<number | null>(null);
          const [exceedThresholdGD_2005, setExceedThresholdGD_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainGD_2005, setMaintainGD_2005] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof GD_2005_High === 'string' && typeof GD_2005_Low === 'string' && GD_2005 !== null && maintainGD_2005 === false
                  ) {
                      const highValue = parseFloat(GD_2005_High);
                      const lowValue = parseFloat(GD_2005_Low);
                      const GD_2005Value = parseFloat(GD_2005);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2005Value)) {
                          if (highValue <= GD_2005Value || GD_2005Value <= lowValue) {
                              if (!audioPlayingGD_2005) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_2005(true);
                                  setExceedThresholdGD_2005(true);
                              }
                          } else {
                             setAudioPlayingGD_2005(false);
                             setExceedThresholdGD_2005(false);
                          }
                      } 
                  } 
              }, [GD_2005_High, GD_2005, audioPlayingGD_2005, GD_2005_Low,maintainGD_2005]);
          
              useEffect(() => {
                  if (audioPlayingGD_2005) {
                      const audioEnded = () => {
                         setAudioPlayingGD_2005(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_2005]);
          
              const handleInputChangeGD_2005 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_2005(newValue);
              };
          
              const handleInputChange2GD_2005 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_2005(newValue2);
              };
              const ChangeMaintainGD_2005 = async () => {
                  try {
                      const newValue = !maintainGD_2005;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                          { GD_2005_Maintain: newValue }
                      );
                      setMaintainGD_2005(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [GD_2006, setGD_2006] = useState<string | null>(null);
    const [audioPlayingGD_2006, setAudioPlayingGD_2006] = useState(false);
    const [inputValueGD_2006, setInputValueGD_2006] = useState<any>();
    const [inputValue2GD_2006, setInputValue2GD_2006] = useState<any>();
    const [GD_2006_High, setGD_2006_High] = useState<number | null>(null);
    const [GD_2006_Low, setGD_2006_Low] = useState<number | null>(null);
    const [exceedThresholdGD_2006, setExceedThresholdGD_2006] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainGD_2006, setMaintainGD_2006] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof GD_2006_High === 'string' && typeof GD_2006_Low === 'string' && GD_2006 !== null && maintainGD_2006 === false
            ) {
                const highValue = parseFloat(GD_2006_High);
                const lowValue = parseFloat(GD_2006_Low);
                const GD_2006Value = parseFloat(GD_2006);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2006Value)) {
                    if (highValue <= GD_2006Value || GD_2006Value <= lowValue) {
                        if (!audioPlayingGD_2006) {
                            audioRef.current?.play();
                            setAudioPlayingGD_2006(true);
                            setExceedThresholdGD_2006(true);
                        }
                    } else {
                       setAudioPlayingGD_2006(false);
                       setExceedThresholdGD_2006(false);
                    }
                } 
            } 
        }, [GD_2006_High, GD_2006, audioPlayingGD_2006, GD_2006_Low,maintainGD_2006]);
    
        useEffect(() => {
            if (audioPlayingGD_2006) {
                const audioEnded = () => {
                   setAudioPlayingGD_2006(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingGD_2006]);
    
        const handleInputChangeGD_2006 = (event: any) => {
            const newValue = event.target.value;
            setInputValueGD_2006(newValue);
        };
    
        const handleInputChange2GD_2006 = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2GD_2006(newValue2);
        };
        const ChangeMaintainGD_2006 = async () => {
            try {
                const newValue = !maintainGD_2006;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { GD_2006_Maintain: newValue }
                );
                setMaintainGD_2006(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

        const [TM_2002_SNG, setTM_2002_SNG] = useState<string | null>(null);
        const [audioPlayingTM_2002_SNG, setAudioPlayingTM_2002_SNG] = useState(false);
        const [inputValueTM_2002_SNG, setInputValueTM_2002_SNG] = useState<any>();
        const [inputValue2TM_2002_SNG, setInputValue2TM_2002_SNG] = useState<any>();
        const [TM_2002_SNG_High, setTM_2002_SNG_High] = useState<number | null>(null);
        const [TM_2002_SNG_Low, setTM_2002_SNG_Low] = useState<number | null>(null);
        const [exceedThresholdTM_2002_SNG, setExceedThresholdTM_2002_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainTM_2002_SNG, setMaintainTM_2002_SNG] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof TM_2002_SNG_High === 'string' && typeof TM_2002_SNG_Low === 'string' && TM_2002_SNG !== null && maintainTM_2002_SNG === false
                ) {
                    const highValue = parseFloat(TM_2002_SNG_High);
                    const lowValue = parseFloat(TM_2002_SNG_Low);
                    const TM_2002_SNGValue = parseFloat(TM_2002_SNG);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM_2002_SNGValue)) {
                        if (highValue <= TM_2002_SNGValue || TM_2002_SNGValue <= lowValue) {
                            if (!audioPlayingTM_2002_SNG) {
                                audioRef.current?.play();
                                setAudioPlayingTM_2002_SNG(true);
                                setExceedThresholdTM_2002_SNG(true);
                            }
                        } else {
                           setAudioPlayingTM_2002_SNG(false);
                           setExceedThresholdTM_2002_SNG(false);
                        }
                    } 
                } 
            }, [TM_2002_SNG_High, TM_2002_SNG, audioPlayingTM_2002_SNG, TM_2002_SNG_Low,maintainTM_2002_SNG]);
        
            useEffect(() => {
                if (audioPlayingTM_2002_SNG) {
                    const audioEnded = () => {
                       setAudioPlayingTM_2002_SNG(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingTM_2002_SNG]);
        
            const handleInputChangeTM_2002_SNG = (event: any) => {
                const newValue = event.target.value;
                setInputValueTM_2002_SNG(newValue);
            };
        
            const handleInputChange2TM_2002_SNG = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2TM_2002_SNG(newValue2);
            };
            const ChangeMaintainTM_2002_SNG = async () => {
                try {
                    const newValue = !maintainTM_2002_SNG;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { TM_2002_SNG_Maintain: newValue }
                    );
                    setMaintainTM_2002_SNG(newValue);
                    
                } catch (error) {}
            };
    
    
        // =================================================================================================================== 

            // =================================================================================================================== 

    const [TM_2003_SNG, setTM_2003_SNG] = useState<string | null>(null);
    const [audioPlayingTM_2003_SNG, setAudioPlayingTM_2003_SNG] = useState(false);
    const [inputValueTM_2003_SNG, setInputValueTM_2003_SNG] = useState<any>();
    const [inputValue2TM_2003_SNG, setInputValue2TM_2003_SNG] = useState<any>();
    const [TM_2003_SNG_High, setTM_2003_SNG_High] = useState<number | null>(null);
    const [TM_2003_SNG_Low, setTM_2003_SNG_Low] = useState<number | null>(null);
    const [exceedThresholdTM_2003_SNG, setExceedThresholdTM_2003_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainTM_2003_SNG, setMaintainTM_2003_SNG] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof TM_2003_SNG_High === 'string' && typeof TM_2003_SNG_Low === 'string' && TM_2003_SNG !== null && maintainTM_2003_SNG === false
            ) {
                const highValue = parseFloat(TM_2003_SNG_High);
                const lowValue = parseFloat(TM_2003_SNG_Low);
                const TM_2003_SNGValue = parseFloat(TM_2003_SNG);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM_2003_SNGValue)) {
                    if (highValue <= TM_2003_SNGValue || TM_2003_SNGValue <= lowValue) {
                        if (!audioPlayingTM_2003_SNG) {
                            audioRef.current?.play();
                            setAudioPlayingTM_2003_SNG(true);
                            setExceedThresholdTM_2003_SNG(true);
                        }
                    } else {
                       setAudioPlayingTM_2003_SNG(false);
                       setExceedThresholdTM_2003_SNG(false);
                    }
                } 
            } 
        }, [TM_2003_SNG_High, TM_2003_SNG, audioPlayingTM_2003_SNG, TM_2003_SNG_Low,maintainTM_2003_SNG]);
    
        useEffect(() => {
            if (audioPlayingTM_2003_SNG) {
                const audioEnded = () => {
                   setAudioPlayingTM_2003_SNG(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingTM_2003_SNG]);
    
        const handleInputChangeTM_2003_SNG = (event: any) => {
            const newValue = event.target.value;
            setInputValueTM_2003_SNG(newValue);
        };
    
        const handleInputChange2TM_2003_SNG = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2TM_2003_SNG(newValue2);
        };
        const ChangeMaintainTM_2003_SNG = async () => {
            try {
                const newValue = !maintainTM_2003_SNG;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { TM_2003_SNG_Maintain: newValue }
                );
                setMaintainTM_2003_SNG(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 


    const [TOTAL_SNG, setTOTAL_SNG] = useState<string | null>(null);
    const [audioPlayingTOTAL_SNG, setAudioPlayingTOTAL_SNG] = useState(false);
    const [inputValueTOTAL_SNG, setInputValueTOTAL_SNG] = useState<any>();
    const [inputValue2TOTAL_SNG, setInputValue2TOTAL_SNG] = useState<any>();
    const [TOTAL_SNG_High, setTOTAL_SNG_High] = useState<number | null>(null);
    const [TOTAL_SNG_Low, setTOTAL_SNG_Low] = useState<number | null>(null);
    const [exceedThresholdTOTAL_SNG, setExceedThresholdTOTAL_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainTOTAL_SNG, setMaintainTOTAL_SNG] = useState<boolean>(false);
    
    
        useEffect(() => {
            if (typeof TOTAL_SNG_High === 'string' && typeof TOTAL_SNG_Low === 'string' && TOTAL_SNG !== null && maintainTOTAL_SNG === false
            ) {
                const highValue = parseFloat(TOTAL_SNG_High);
                const lowValue = parseFloat(TOTAL_SNG_Low);
                const TOTAL_SNGValue = parseFloat(TOTAL_SNG);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TOTAL_SNGValue)) {
                    if (highValue <= TOTAL_SNGValue || TOTAL_SNGValue <= lowValue) {
                        if (!audioPlayingTOTAL_SNG) {
                            audioRef.current?.play();
                            setAudioPlayingTOTAL_SNG(true);
                            setExceedThresholdTOTAL_SNG(true);
                        }
                    } else {
                       setAudioPlayingTOTAL_SNG(false);
                       setExceedThresholdTOTAL_SNG(false);
                    }
                } 
            } 
        }, [TOTAL_SNG_High, TOTAL_SNG, audioPlayingTOTAL_SNG, TOTAL_SNG_Low,maintainTOTAL_SNG]);
    
        useEffect(() => {
            if (audioPlayingTOTAL_SNG) {
                const audioEnded = () => {
                   setAudioPlayingTOTAL_SNG(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingTOTAL_SNG]);
    
        const handleInputChangeTOTAL_SNG = (event: any) => {
            const newValue = event.target.value;
            setInputValueTOTAL_SNG(newValue);
        };
    
        const handleInputChange2TOTAL_SNG = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2TOTAL_SNG(newValue2);
        };
        const ChangeMaintainTOTAL_SNG = async () => {
            try {
                const newValue = !maintainTOTAL_SNG;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { TOTAL_SNG_Maintain: newValue }
                );
                setMaintainTOTAL_SNG(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

const [SDV_2004, setSDV_2004] = useState<string | null>(null);
const [audioPlayingSDV_2004, setAudioPlayingSDV_2004] = useState(false);
const [inputValueSDV_2004, setInputValueSDV_2004] = useState<any>();
const [inputValue2SDV_2004, setInputValue2SDV_2004] = useState<any>();
const [SDV_2004_High, setSDV_2004_High] = useState<number | null>(null);
const [SDV_2004_Low, setSDV_2004_Low] = useState<number | null>(null);
const [exceedThresholdSDV_2004, setExceedThresholdSDV_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSDV_2004, setMaintainSDV_2004] = useState<boolean>(false);


    useEffect(() => {
        if (typeof SDV_2004_High === 'string' && typeof SDV_2004_Low === 'string' && SDV_2004 !== null && maintainSDV_2004 === false
        ) {
            const highValue = parseFloat(SDV_2004_High);
            const lowValue = parseFloat(SDV_2004_Low);
            const SDV_2004Value = parseFloat(SDV_2004);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2004Value)) {
                if (highValue <= SDV_2004Value || SDV_2004Value <= lowValue) {
                    if (!audioPlayingSDV_2004) {
                        audioRef.current?.play();
                        setAudioPlayingSDV_2004(true);
                        setExceedThresholdSDV_2004(true);
                    }
                } else {
                   setAudioPlayingSDV_2004(false);
                   setExceedThresholdSDV_2004(false);
                }
            } 
        } 
    }, [SDV_2004_High, SDV_2004, audioPlayingSDV_2004, SDV_2004_Low,maintainSDV_2004]);

    useEffect(() => {
        if (audioPlayingSDV_2004) {
            const audioEnded = () => {
               setAudioPlayingSDV_2004(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingSDV_2004]);

    const handleInputChangeSDV_2004 = (event: any) => {
        const newValue = event.target.value;
        setInputValueSDV_2004(newValue);
    };

    const handleInputChange2SDV_2004 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2SDV_2004(newValue2);
    };
    const ChangeMaintainSDV_2004 = async () => {
        try {
            const newValue = !maintainSDV_2004;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { SDV_2004_Maintain: newValue }
            );
            setMaintainSDV_2004(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 


const [SDV_2003, setSDV_2003] = useState<string | null>(null);
const [audioPlayingSDV_2003, setAudioPlayingSDV_2003] = useState(false);
const [inputValueSDV_2003, setInputValueSDV_2003] = useState<any>();
const [inputValue2SDV_2003, setInputValue2SDV_2003] = useState<any>();
const [SDV_2003_High, setSDV_2003_High] = useState<number | null>(null);
const [SDV_2003_Low, setSDV_2003_Low] = useState<number | null>(null);
const [exceedThresholdSDV_2003, setExceedThresholdSDV_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSDV_2003, setMaintainSDV_2003] = useState<boolean>(false);


    useEffect(() => {
        if (typeof SDV_2003_High === 'string' && typeof SDV_2003_Low === 'string' && SDV_2003 !== null && maintainSDV_2003 === false
        ) {
            const highValue = parseFloat(SDV_2003_High);
            const lowValue = parseFloat(SDV_2003_Low);
            const SDV_2003Value = parseFloat(SDV_2003);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2003Value)) {
                if (highValue <= SDV_2003Value || SDV_2003Value <= lowValue) {
                    if (!audioPlayingSDV_2003) {
                        audioRef.current?.play();
                        setAudioPlayingSDV_2003(true);
                        setExceedThresholdSDV_2003(true);
                    }
                } else {
                   setAudioPlayingSDV_2003(false);
                   setExceedThresholdSDV_2003(false);
                }
            } 
        } 
    }, [SDV_2003_High, SDV_2003, audioPlayingSDV_2003, SDV_2003_Low,maintainSDV_2003]);

    useEffect(() => {
        if (audioPlayingSDV_2003) {
            const audioEnded = () => {
               setAudioPlayingSDV_2003(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingSDV_2003]);

    const handleInputChangeSDV_2003 = (event: any) => {
        const newValue = event.target.value;
        setInputValueSDV_2003(newValue);
    };

    const handleInputChange2SDV_2003 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2SDV_2003(newValue2);
    };
    const ChangeMaintainSDV_2003 = async () => {
        try {
            const newValue = !maintainSDV_2003;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                { SDV_2003_Maintain: newValue }
            );
            setMaintainSDV_2003(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 

    // =================================================================================================================== 

const [GD1_STATUS, setGD1_STATUS] = useState<string | null>(null);
const [audioPlayingGD1_STATUS, setAudioPlayingGD1_STATUS] = useState(false);
const [inputValueGD1_STATUS, setInputValueGD1_STATUS] = useState<any>();
const [inputValue2GD1_STATUS, setInputValue2GD1_STATUS] = useState<any>();
const [GD1_STATUS_High, setGD1_STATUS_High] = useState<number | null>(null);
const [GD1_STATUS_Low, setGD1_STATUS_Low] = useState<number | null>(null);
const [exceedThresholdGD1_STATUS, setExceedThresholdGD1_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainGD1_STATUS, setMaintainGD1_STATUS] = useState<boolean>(false);


useEffect(() => {
    if (typeof GD1_STATUS_High === 'string' && typeof GD1_STATUS_Low === 'string' && GD1_STATUS !== null && maintainGD1_STATUS === false
    ) {
        const highValue = parseFloat(GD1_STATUS_High);
        const lowValue = parseFloat(GD1_STATUS_Low);
        const GD1_STATUSValue = parseFloat(GD1_STATUS);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1_STATUSValue)) {
            if (highValue <= GD1_STATUSValue || GD1_STATUSValue <= lowValue) {
                if (!audioPlayingGD1_STATUS) {
                    audioRef.current?.play();
                    setAudioPlayingGD1_STATUS(true);
                    setExceedThresholdGD1_STATUS(true);
                }
            } else {
               setAudioPlayingGD1_STATUS(false);
               setExceedThresholdGD1_STATUS(false);
            }
        } 
    } 
}, [GD1_STATUS_High, GD1_STATUS, audioPlayingGD1_STATUS, GD1_STATUS_Low,maintainGD1_STATUS]);

useEffect(() => {
    if (audioPlayingGD1_STATUS) {
        const audioEnded = () => {
           setAudioPlayingGD1_STATUS(false);
        };
        audioRef.current?.addEventListener('ended', audioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', audioEnded);
        };
    }
}, [audioPlayingGD1_STATUS]);

const handleInputChangeGD1_STATUS = (event: any) => {
    const newValue = event.target.value;
    setInputValueGD1_STATUS(newValue);
};

const handleInputChange2GD1_STATUS = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2GD1_STATUS(newValue2);
};
const ChangeMaintainGD1_STATUS = async () => {
    try {
        const newValue = !maintainGD1_STATUS;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
            { GD1_STATUS_Maintain: newValue }
        );
        setMaintainGD1_STATUS(newValue);
        
    } catch (error) {}
};


// =================================================================================================================== 


        // =================================================================================================================== 

        const [GD2_STATUS, setGD2_STATUS] = useState<string | null>(null);
        const [audioPlayingGD2_STATUS, setAudioPlayingGD2_STATUS] = useState(false);
        const [inputValueGD2_STATUS, setInputValueGD2_STATUS] = useState<any>();
        const [inputValue2GD2_STATUS, setInputValue2GD2_STATUS] = useState<any>();
        const [GD2_STATUS_High, setGD2_STATUS_High] = useState<number | null>(null);
        const [GD2_STATUS_Low, setGD2_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD2_STATUS, setExceedThresholdGD2_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainGD2_STATUS, setMaintainGD2_STATUS] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof GD2_STATUS_High === 'string' && typeof GD2_STATUS_Low === 'string' && GD2_STATUS !== null && maintainGD2_STATUS === false
                ) {
                    const highValue = parseFloat(GD2_STATUS_High);
                    const lowValue = parseFloat(GD2_STATUS_Low);
                    const GD2_STATUSValue = parseFloat(GD2_STATUS);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2_STATUSValue)) {
                        if (highValue <= GD2_STATUSValue || GD2_STATUSValue <= lowValue) {
                            if (!audioPlayingGD2_STATUS) {
                                audioRef.current?.play();
                                setAudioPlayingGD2_STATUS(true);
                                setExceedThresholdGD2_STATUS(true);
                            }
                        } else {
                           setAudioPlayingGD2_STATUS(false);
                           setExceedThresholdGD2_STATUS(false);
                        }
                    } 
                } 
            }, [GD2_STATUS_High, GD2_STATUS, audioPlayingGD2_STATUS, GD2_STATUS_Low,maintainGD2_STATUS]);
        
            useEffect(() => {
                if (audioPlayingGD2_STATUS) {
                    const audioEnded = () => {
                       setAudioPlayingGD2_STATUS(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingGD2_STATUS]);
        
            const handleInputChangeGD2_STATUS = (event: any) => {
                const newValue = event.target.value;
                setInputValueGD2_STATUS(newValue);
            };
        
            const handleInputChange2GD2_STATUS = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2GD2_STATUS(newValue2);
            };
            const ChangeMaintainGD2_STATUS = async () => {
                try {
                    const newValue = !maintainGD2_STATUS;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { GD2_STATUS_Maintain: newValue }
                    );
                    setMaintainGD2_STATUS(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
        
        const [GD3_STATUS, setGD3_STATUS] = useState<string | null>(null);
        const [audioPlayingGD3_STATUS, setAudioPlayingGD3_STATUS] = useState(false);
        const [inputValueGD3_STATUS, setInputValueGD3_STATUS] = useState<any>();
        const [inputValue2GD3_STATUS, setInputValue2GD3_STATUS] = useState<any>();
        const [GD3_STATUS_High, setGD3_STATUS_High] = useState<number | null>(null);
        const [GD3_STATUS_Low, setGD3_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD3_STATUS, setExceedThresholdGD3_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainGD3_STATUS, setMaintainGD3_STATUS] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof GD3_STATUS_High === 'string' && typeof GD3_STATUS_Low === 'string' && GD3_STATUS !== null && maintainGD3_STATUS === false
                ) {
                    const highValue = parseFloat(GD3_STATUS_High);
                    const lowValue = parseFloat(GD3_STATUS_Low);
                    const GD3_STATUSValue = parseFloat(GD3_STATUS);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD3_STATUSValue)) {
                        if (highValue <= GD3_STATUSValue || GD3_STATUSValue <= lowValue) {
                            if (!audioPlayingGD3_STATUS) {
                                audioRef.current?.play();
                                setAudioPlayingGD3_STATUS(true);
                                setExceedThresholdGD3_STATUS(true);
                            }
                        } else {
                           setAudioPlayingGD3_STATUS(false);
                           setExceedThresholdGD3_STATUS(false);
                        }
                    } 
                } 
            }, [GD3_STATUS_High, GD3_STATUS, audioPlayingGD3_STATUS, GD3_STATUS_Low,maintainGD3_STATUS]);
        
            useEffect(() => {
                if (audioPlayingGD3_STATUS) {
                    const audioEnded = () => {
                       setAudioPlayingGD3_STATUS(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingGD3_STATUS]);
        
            const handleInputChangeGD3_STATUS = (event: any) => {
                const newValue = event.target.value;
                setInputValueGD3_STATUS(newValue);
            };
        
            const handleInputChange2GD3_STATUS = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2GD3_STATUS(newValue2);
            };
            const ChangeMaintainGD3_STATUS = async () => {
                try {
                    const newValue = !maintainGD3_STATUS;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { GD3_STATUS_Maintain: newValue }
                    );
                    setMaintainGD3_STATUS(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [GD4_STATUS, setGD4_STATUS] = useState<string | null>(null);
        const [audioPlayingGD4_STATUS, setAudioPlayingGD4_STATUS] = useState(false);
        const [inputValueGD4_STATUS, setInputValueGD4_STATUS] = useState<any>();
        const [inputValue2GD4_STATUS, setInputValue2GD4_STATUS] = useState<any>();
        const [GD4_STATUS_High, setGD4_STATUS_High] = useState<number | null>(null);
        const [GD4_STATUS_Low, setGD4_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD4_STATUS, setExceedThresholdGD4_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainGD4_STATUS, setMaintainGD4_STATUS] = useState<boolean>(false);
        
        
        useEffect(() => {
            if (typeof GD4_STATUS_High === 'string' && typeof GD4_STATUS_Low === 'string' && GD4_STATUS !== null && maintainGD4_STATUS === false
            ) {
                const highValue = parseFloat(GD4_STATUS_High);
                const lowValue = parseFloat(GD4_STATUS_Low);
                const GD4_STATUSValue = parseFloat(GD4_STATUS);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD4_STATUSValue)) {
                    if (highValue <= GD4_STATUSValue || GD4_STATUSValue <= lowValue) {
                        if (!audioPlayingGD4_STATUS) {
                            audioRef.current?.play();
                            setAudioPlayingGD4_STATUS(true);
                            setExceedThresholdGD4_STATUS(true);
                        }
                    } else {
                       setAudioPlayingGD4_STATUS(false);
                       setExceedThresholdGD4_STATUS(false);
                    }
                } 
            } 
        }, [GD4_STATUS_High, GD4_STATUS, audioPlayingGD4_STATUS, GD4_STATUS_Low,maintainGD4_STATUS]);
        
        useEffect(() => {
            if (audioPlayingGD4_STATUS) {
                const audioEnded = () => {
                   setAudioPlayingGD4_STATUS(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingGD4_STATUS]);
        
        const handleInputChangeGD4_STATUS = (event: any) => {
            const newValue = event.target.value;
            setInputValueGD4_STATUS(newValue);
        };
        
        const handleInputChange2GD4_STATUS = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2GD4_STATUS(newValue2);
        };
        const ChangeMaintainGD4_STATUS = async () => {
            try {
                const newValue = !maintainGD4_STATUS;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                    { GD4_STATUS_Maintain: newValue }
                );
                setMaintainGD4_STATUS(newValue);
                
            } catch (error) {}
        };
        
        
        // =================================================================================================================== 
        

            // =================================================================================================================== 
        
            const [GD5_STATUS, setGD5_STATUS] = useState<string | null>(null);
            const [audioPlayingGD5_STATUS, setAudioPlayingGD5_STATUS] = useState(false);
            const [inputValueGD5_STATUS, setInputValueGD5_STATUS] = useState<any>();
            const [inputValue2GD5_STATUS, setInputValue2GD5_STATUS] = useState<any>();
            const [GD5_STATUS_High, setGD5_STATUS_High] = useState<number | null>(null);
            const [GD5_STATUS_Low, setGD5_STATUS_Low] = useState<number | null>(null);
            const [exceedThresholdGD5_STATUS, setExceedThresholdGD5_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainGD5_STATUS, setMaintainGD5_STATUS] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof GD5_STATUS_High === 'string' && typeof GD5_STATUS_Low === 'string' && GD5_STATUS !== null && maintainGD5_STATUS === false
                ) {
                    const highValue = parseFloat(GD5_STATUS_High);
                    const lowValue = parseFloat(GD5_STATUS_Low);
                    const GD5_STATUSValue = parseFloat(GD5_STATUS);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD5_STATUSValue)) {
                        if (highValue <= GD5_STATUSValue || GD5_STATUSValue <= lowValue) {
                            if (!audioPlayingGD5_STATUS) {
                                audioRef.current?.play();
                                setAudioPlayingGD5_STATUS(true);
                                setExceedThresholdGD5_STATUS(true);
                            }
                        } else {
                           setAudioPlayingGD5_STATUS(false);
                           setExceedThresholdGD5_STATUS(false);
                        }
                    } 
                } 
            }, [GD5_STATUS_High, GD5_STATUS, audioPlayingGD5_STATUS, GD5_STATUS_Low,maintainGD5_STATUS]);
            
            useEffect(() => {
                if (audioPlayingGD5_STATUS) {
                    const audioEnded = () => {
                       setAudioPlayingGD5_STATUS(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingGD5_STATUS]);
            
            const handleInputChangeGD5_STATUS = (event: any) => {
                const newValue = event.target.value;
                setInputValueGD5_STATUS(newValue);
            };
            
            const handleInputChange2GD5_STATUS = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2GD5_STATUS(newValue2);
            };
            const ChangeMaintainGD5_STATUS = async () => {
                try {
                    const newValue = !maintainGD5_STATUS;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { GD5_STATUS_Maintain: newValue }
                    );
                    setMaintainGD5_STATUS(newValue);
                    
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
                        `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                        { EVC_02_Vm_of_Last_Day_Maintain: newValue }
                    );
                    setMaintainEVC_02_Vm_of_Last_Day(newValue);
                    
                } catch (error) {}
            };
            
            
            // =================================================================================================================== 

 // =================================================================================================================== 

 const [ESD, setESD] = useState<string | null>(null);
 const [audioPlayingESD, setAudioPlayingESD] = useState(false);
 const [inputValueESD, setInputValueESD] = useState<any>();
 const [inputValue2ESD, setInputValue2ESD] = useState<any>();
 const [ESD_High, setESD_High] = useState<number | null>(null);
 const [ESD_Low, setESD_Low] = useState<number | null>(null);
 const [exceedThresholdESD, setExceedThresholdESD] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainESD, setMaintainESD] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof ESD_High === 'string' && typeof ESD_Low === 'string' && ESD !== null && maintainESD === false
         ) {
             const highValue = parseFloat(ESD_High);
             const lowValue = parseFloat(ESD_Low);
             const ESDValue = parseFloat(ESD);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESDValue)) {
                 if (highValue <= ESDValue || ESDValue <= lowValue) {
                     if (!audioPlayingESD) {
                         audioRef.current?.play();
                         setAudioPlayingESD(true);
                         setExceedThresholdESD(true);
                     }
                 } else {
                     setAudioPlayingESD(false);
                     setExceedThresholdESD(false);
                 }
             } 
         } 
     }, [ESD_High, ESD, audioPlayingESD, ESD_Low,maintainESD]);
 
     useEffect(() => {
         if (audioPlayingESD) {
             const audioEnded = () => {
                 setAudioPlayingESD(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingESD]);
 
     const handleInputChangeESD = (event: any) => {
         const newValue = event.target.value;
         setInputValueESD(newValue);
     };
 
     const handleInputChange2VP303 = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2ESD(newValue2);
     };
     const ChangeMaintainESD = async () => {
         try {
             const newValue = !maintainESD;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { ESD_Maintain: newValue }
             );
             setMaintainESD(newValue);
             
         } catch (error) {}
     };
 
 
      // =================================================================================================================== 
 
      const [VAPORIZER_1, setVAPORIZER_1] = useState<string | null>(null);
      const [audioPlayingVAPORIZER_1, setAudioPlayingVAPORIZER_1] = useState(false);
      const [inputValueVAPORIZER_1, setInputValueVAPORIZER_1] = useState<any>();
      const [inputValue2VAPORIZER_1, setInputValue2VAPORIZER_1] = useState<any>();
      const [VAPORIZER_1_High, setVAPORIZER_1_High] = useState<number | null>(null);
      const [VAPORIZER_1_Low, setVAPORIZER_1_Low] = useState<number | null>(null);
      const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainVAPORIZER_1, setMaintainVAPORIZER_1] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof VAPORIZER_1_High === 'string' && typeof VAPORIZER_1_Low === 'string' && VAPORIZER_1 !== null && maintainVAPORIZER_1 === false
              ) {
                  const highValue = parseFloat(VAPORIZER_1_High);
                  const lowValue = parseFloat(VAPORIZER_1_Low);
                  const VAPORIZER_1Value = parseFloat(VAPORIZER_1);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_1Value)) {
                      if (highValue <= VAPORIZER_1Value || VAPORIZER_1Value <= lowValue) {
                          if (!audioPlayingVAPORIZER_1) {
                              audioRef.current?.play();
                              setAudioPlayingVAPORIZER_1(true);
                              setExceedThreshold302(true);
                          }
                      } else {
                         setAudioPlayingVAPORIZER_1(false);
                          setExceedThreshold302(false);
                      }
                  } 
              } 
          }, [VAPORIZER_1_High, VAPORIZER_1, audioPlayingVAPORIZER_1, VAPORIZER_1_Low,maintainVAPORIZER_1]);
      
          useEffect(() => {
              if (audioPlayingVAPORIZER_1) {
                  const audioEnded = () => {
                     setAudioPlayingVAPORIZER_1(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingVAPORIZER_1]);
      
          const handleInputChangeVAPORIZER_1 = (event: any) => {
              const newValue = event.target.value;
              setInputValueVAPORIZER_1(newValue);
          };
      
          const handleInputChange2VAPORIZER_1 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2VAPORIZER_1(newValue2);
          };
          const ChangeMaintainVAPORIZER_1 = async () => {
              try {
                  const newValue = !maintainVAPORIZER_1;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { VAPORIZER_1_Maintain: newValue }
                  );
                  setMaintainVAPORIZER_1(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
      const [VAPORIZER_2, setVAPORIZER_2] = useState<string | null>(null);
      const [audioPlayingVAPORIZER_2, setAudioPlayingVAPORIZER_2] = useState(false);
      const [inputValueVAPORIZER_2, setInputValueVAPORIZER_2] = useState<any>();
      const [inputValue2VAPORIZER_2, setInputValue2VAPORIZER_2] = useState<any>();
      const [VAPORIZER_2_High, setVAPORIZER_2_High] = useState<number | null>(null);
      const [VAPORIZER_2_Low, setVAPORIZER_2_Low] = useState<number | null>(null);
      const [exceedThresholdVAPORIZER_2, setExceedThresholdVAPORIZER_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
      
      const [maintainVAPORIZER_2, setMaintainVAPORIZER_2] = useState<boolean>(false);
      
      
          useEffect(() => {
              if (typeof VAPORIZER_2_High === 'string' && typeof VAPORIZER_2_Low === 'string' && VAPORIZER_2 !== null && maintainVAPORIZER_2 === false
              ) {
                  const highValue = parseFloat(VAPORIZER_2_High);
                  const lowValue = parseFloat(VAPORIZER_2_Low);
                  const VAPORIZER_2Value = parseFloat(VAPORIZER_2);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_2Value)) {
                      if (highValue <= VAPORIZER_2Value || VAPORIZER_2Value <= lowValue) {
                          if (!audioPlayingVAPORIZER_2) {
                              audioRef.current?.play();
                              setAudioPlayingVAPORIZER_2(true);
                              setExceedThresholdVAPORIZER_2(true);
                          }
                      } else {
                         setAudioPlayingVAPORIZER_2(false);
                         setExceedThresholdVAPORIZER_2(false);
                      }
                  } 
              } 
          }, [VAPORIZER_2_High, VAPORIZER_2, audioPlayingVAPORIZER_2, VAPORIZER_2_Low,maintainVAPORIZER_2]);
      
          useEffect(() => {
              if (audioPlayingVAPORIZER_2) {
                  const audioEnded = () => {
                     setAudioPlayingVAPORIZER_2(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingVAPORIZER_2]);
      
          const handleInputChangeVAPORIZER_2 = (event: any) => {
              const newValue = event.target.value;
              setInputValueVAPORIZER_2(newValue);
          };
      
          const handleInputChange2VAPORIZER_2 = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2VAPORIZER_2(newValue2);
          };
          const ChangeMaintainVAPORIZER_2 = async () => {
              try {
                  const newValue = !maintainVAPORIZER_2;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                      { VAPORIZER_2_Maintain: newValue }
                  );
                  setMaintainVAPORIZER_2(newValue);
                  
              } catch (error) {}
          };
 
 
      // =================================================================================================================== 
 
 
 
           const [VAPORIZER_3, setVAPORIZER_3] = useState<string | null>(null);
           const [audioPlayingVAPORIZER_3, setAudioPlayingVAPORIZER_3] = useState(false);
           const [inputValueVAPORIZER_3, setInputValueVAPORIZER_3] = useState<any>();
           const [inputValue2VAPORIZER_3, setInputValue2VAPORIZER_3] = useState<any>();
           const [VAPORIZER_3_High, setVAPORIZER_3_High] = useState<number | null>(null);
           const [VAPORIZER_3_Low, setVAPORIZER_3_Low] = useState<number | null>(null);
           const [exceedThresholdVAPORIZER_3, setExceedThresholdVAPORIZER_3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainVAPORIZER_3, setMaintainVAPORIZER_3] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof VAPORIZER_3_High === 'string' && typeof VAPORIZER_3_Low === 'string' && VAPORIZER_3 !== null && maintainVAPORIZER_3 === false
                   ) {
                       const highValue = parseFloat(VAPORIZER_3_High);
                       const lowValue = parseFloat(VAPORIZER_3_Low);
                       const VAPORIZER_3Value = parseFloat(VAPORIZER_3);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_3Value)) {
                           if (highValue <= VAPORIZER_3Value || VAPORIZER_3Value <= lowValue) {
                               if (!audioPlayingVAPORIZER_3) {
                                   audioRef.current?.play();
                                   setAudioPlayingVAPORIZER_3(true);
                                   setExceedThresholdVAPORIZER_3(true);
                               }
                           } else {
                              setAudioPlayingVAPORIZER_3(false);
                              setExceedThresholdVAPORIZER_3(false);
                           }
                       } 
                   } 
               }, [VAPORIZER_3_High, VAPORIZER_3, audioPlayingVAPORIZER_3, VAPORIZER_3_Low,maintainVAPORIZER_3]);
           
               useEffect(() => {
                   if (audioPlayingVAPORIZER_3) {
                       const audioEnded = () => {
                          setAudioPlayingVAPORIZER_3(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingVAPORIZER_3]);
           
               const handleInputChangeVAPORIZER_3 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueVAPORIZER_3(newValue);
               };
           
               const handleInputChange2VAPORIZER_3 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2VAPORIZER_3(newValue2);
               };
               const ChangeMaintainVAPORIZER_3 = async () => {
                   try {
                       const newValue = !maintainVAPORIZER_3;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { VAPORIZER_3_Maintain: newValue }
                       );
                       setMaintainVAPORIZER_3(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [VAPORIZER_4, setVAPORIZER_4] = useState<string | null>(null);
           const [audioPlayingVAPORIZER_4, setAudioPlayingVAPORIZER_4] = useState(false);
           const [inputValueVAPORIZER_4, setInputValueVAPORIZER_4] = useState<any>();
           const [inputValue2VAPORIZER_4, setInputValue2VAPORIZER_4] = useState<any>();
           const [VAPORIZER_4_High, setVAPORIZER_4_High] = useState<number | null>(null);
           const [VAPORIZER_4_Low, setVAPORIZER_4_Low] = useState<number | null>(null);
           const [exceedThresholdVAPORIZER_4, setExceedThresholdVAPORIZER_4] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainVAPORIZER_4, setMaintainVAPORIZER_4] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof VAPORIZER_4_High === 'string' && typeof VAPORIZER_4_Low === 'string' && VAPORIZER_4 !== null && maintainVAPORIZER_4 === false
                   ) {
                       const highValue = parseFloat(VAPORIZER_4_High);
                       const lowValue = parseFloat(VAPORIZER_4_Low);
                       const VAPORIZER_4Value = parseFloat(VAPORIZER_4);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_4Value)) {
                           if (highValue <= VAPORIZER_4Value || VAPORIZER_4Value <= lowValue) {
                               if (!audioPlayingVAPORIZER_4) {
                                   audioRef.current?.play();
                                   setAudioPlayingVAPORIZER_4(true);
                                   setExceedThresholdVAPORIZER_4(true);
                               }
                           } else {
                              setAudioPlayingVAPORIZER_4(false);
                              setExceedThresholdVAPORIZER_4(false);
                           }
                       } 
                   } 
               }, [VAPORIZER_4_High, VAPORIZER_4, audioPlayingVAPORIZER_4 , VAPORIZER_4_Low,maintainVAPORIZER_4]);
           
               useEffect(() => {
                   if (audioPlayingVAPORIZER_4) {
                       const audioEnded = () => {
                          setAudioPlayingVAPORIZER_4(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingVAPORIZER_4]);
           
               const handleInputChangeVAPORIZER_4 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueVAPORIZER_4(newValue);
               };
           
               const handleInputChange2VAPORIZER_4 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2VAPORIZER_4(newValue2);
               };
               const ChangeMaintainVAPORIZER_4 = async () => {
                   try {
                       const newValue = !maintainVAPORIZER_4;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { VAPORIZER_4_Maintain: newValue }
                       );
                       setMaintainVAPORIZER_4(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [COOLING_V, setCOOLING_V] = useState<string | null>(null);
           const [audioPlayingCOOLING_V, setAudioPlayingCOOLING_V] = useState(false);
           const [inputValueCOOLING_V, setInputValueCOOLING_V] = useState<any>();
           const [inputValue2COOLING_V, setInputValue2COOLING_V] = useState<any>();
           const [COOLING_V_High, setCOOLING_V_High] = useState<number | null>(null);
           const [COOLING_V_Low, setCOOLING_V_Low] = useState<number | null>(null);
           const [exceedThresholdCOOLING_V, setExceedThresholdCOOLING_V] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainCOOLING_V, setMaintainCOOLING_V] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof COOLING_V_High === 'string' && typeof COOLING_V_Low === 'string' && COOLING_V !== null && maintainCOOLING_V === false
                   ) {
                       const highValue = parseFloat(COOLING_V_High);
                       const lowValue = parseFloat(COOLING_V_Low);
                       const COOLING_VValue = parseFloat(COOLING_V);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(COOLING_VValue)) {
                           if (highValue <= COOLING_VValue || COOLING_VValue <= lowValue) {
                               if (!audioPlayingCOOLING_V) {
                                   audioRef.current?.play();
                                   setAudioPlayingCOOLING_V(true);
                                   setExceedThresholdCOOLING_V(true);
                               }
                           } else {
                              setAudioPlayingCOOLING_V(false);
                              setExceedThresholdCOOLING_V(false);
                           }
                       } 
                   } 
               }, [COOLING_V_High, COOLING_V, audioPlayingCOOLING_V, COOLING_V_Low,maintainCOOLING_V]);
           
               useEffect(() => {
                   if (audioPlayingCOOLING_V) {
                       const audioEnded = () => {
                          setAudioPlayingCOOLING_V(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingCOOLING_V]);
           
               const handleInputChangeCOOLING_V = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueCOOLING_V(newValue);
               };
           
               const handleInputChange2COOLING_V = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2COOLING_V(newValue2);
               };
               const ChangeMaintainCOOLING_V = async () => {
                   try {
                       const newValue = !maintainCOOLING_V;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { COOLING_V_Maintain: newValue }
                       );
                       setMaintainCOOLING_V(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [PERCENT_LPG, setPERCENT_LPG] = useState<string | null>(null);
           const [audioPlayingPERCENT_LPG, setAudioPlayingPERCENT_LPG] = useState(false);
           const [inputValuePERCENT_LPG, setInputValuePERCENT_LPG] = useState<any>();
           const [inputValue2PERCENT_LPG, setInputValue2PERCENT_LPG] = useState<any>();
           const [PERCENT_LPG_High, setPERCENT_LPG_High] = useState<number | null>(null);
           const [PERCENT_LPG_Low, setPERCENT_LPG_Low] = useState<number | null>(null);
           const [exceedThresholdPERCENT_LPG, setExceedThresholdPERCENT_LPG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPERCENT_LPG, setMaintainPERCENT_LPG] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PERCENT_LPG_High === 'string' && typeof PERCENT_LPG_Low === 'string' && PERCENT_LPG !== null && maintainPERCENT_LPG === false
                   ) {
                       const highValue = parseFloat(PERCENT_LPG_High);
                       const lowValue = parseFloat(PERCENT_LPG_Low);
                       const PERCENT_LPGValue = parseFloat(PERCENT_LPG);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PERCENT_LPGValue)) {
                           if (highValue <= PERCENT_LPGValue || PERCENT_LPGValue <= lowValue) {
                               if (!audioPlayingPERCENT_LPG) {
                                   audioRef.current?.play();
                                   setAudioPlayingPERCENT_LPG(true);
                                   setExceedThresholdPERCENT_LPG(true);
                               }
                           } else {
                              setAudioPlayingPERCENT_LPG(false);
                              setExceedThresholdPERCENT_LPG(false);
                           }
                       } 
                   } 
               }, [PERCENT_LPG_High, PERCENT_LPG, audioPlayingPERCENT_LPG, PERCENT_LPG_Low,maintainPERCENT_LPG]);
           
               useEffect(() => {
                   if (audioPlayingPERCENT_LPG) {
                       const audioEnded = () => {
                          setAudioPlayingPERCENT_LPG(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPERCENT_LPG]);
           
               const handleInputChangePERCENT_LPG = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePERCENT_LPG(newValue);
               };
           
               const handleInputChange2PERCENT_LPG = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PERCENT_LPG(newValue2);
               };
               const ChangeMaintainPERCENT_LPG = async () => {
                   try {
                       const newValue = !maintainPERCENT_LPG;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { PERCENT_LPG_Maintain: newValue }
                       );
                       setMaintainPERCENT_LPG(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
           const [FCV_2001, setFCV_2001] = useState<string | null>(null);
           const [audioPlayingFCV_2001, setAudioPlayingFCV_2001] = useState(false);
           const [inputValueFCV_2001, setInputValueFCV_2001] = useState<any>();
           const [inputValue2FCV_2001, setInputValue2FCV_2001] = useState<any>();
           const [FCV_2001_High, setFCV_2001_High] = useState<number | null>(null);
           const [FCV_2001_Low, setFCV_2001_Low] = useState<number | null>(null);
           const [exceedThresholdFCV_2001, setExceedThresholdFCV_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainFCV_2001, setMaintainFCV_2001] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof FCV_2001_High === 'string' && typeof FCV_2001_Low === 'string' && FCV_2001 !== null && maintainFCV_2001 === false
                   ) {
                       const highValue = parseFloat(FCV_2001_High);
                       const lowValue = parseFloat(FCV_2001_Low);
                       const FCV_2001Value = parseFloat(FCV_2001);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FCV_2001Value)) {
                           if (highValue <= FCV_2001Value || FCV_2001Value <= lowValue) {
                               if (!audioPlayingFCV_2001) {
                                   audioRef.current?.play();
                                   setAudioPlayingFCV_2001(true);
                                   setExceedThresholdFCV_2001(true);
                               }
                           } else {
                              setAudioPlayingFCV_2001(false);
                              setExceedThresholdFCV_2001(false);
                           }
                       } 
                   } 
               }, [FCV_2001_High, FCV_2001, audioPlayingFCV_2001, FCV_2001_Low,maintainFCV_2001]);
           
               useEffect(() => {
                   if (audioPlayingFCV_2001) {
                       const audioEnded = () => {
                          setAudioPlayingFCV_2001(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingFCV_2001]);
           
               const handleInputChangeFCV_2001 = (event: any) => {
                   const newValue = event.target.value;
                   setInputValueFCV_2001(newValue);
               };
           
               const handleInputChange2FCV_2001 = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2FCV_2001(newValue2);
               };
               const ChangeMaintainFCV_2001 = async () => {
                   try {
                       const newValue = !maintainFCV_2001;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { FCV_2001_Maintain: newValue }
                       );
                       setMaintainFCV_2001(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
 
           const [PERCENT_AIR, setPERCENT_AIR] = useState<string | null>(null);
           const [audioPlayingPERCENT_AIR, setAudioPlayingPERCENT_AIR] = useState(false);
           const [inputValuePERCENT_AIR, setInputValuePERCENT_AIR] = useState<any>();
           const [inputValue2PERCENT_AIR, setInputValue2PERCENT_AIR] = useState<any>();
           const [PERCENT_AIR_High, setPERCENT_AIR_High] = useState<number | null>(null);
           const [PERCENT_AIR_Low, setPERCENT_AIR_Low] = useState<number | null>(null);
           const [exceedThresholdPERCENT_AIR, setExceedThresholdPERCENT_AIR] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
           
           const [maintainPERCENT_AIR, setMaintainPERCENT_AIR] = useState<boolean>(false);
           
           
               useEffect(() => {
                   if (typeof PERCENT_AIR_High === 'string' && typeof PERCENT_AIR_Low === 'string' && PERCENT_AIR !== null && maintainPERCENT_AIR === false
                   ) {
                       const highValue = parseFloat(PERCENT_AIR_High);
                       const lowValue = parseFloat(PERCENT_AIR_Low);
                       const PERCENT_AIRValue = parseFloat(PERCENT_AIR);
               
                       if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PERCENT_AIRValue)) {
                           if (highValue <= PERCENT_AIRValue || PERCENT_AIRValue <= lowValue) {
                               if (!audioPlayingPERCENT_AIR) {
                                   audioRef.current?.play();
                                   setAudioPlayingPERCENT_AIR(true);
                                   setExceedThresholdPERCENT_AIR(true);
                               }
                           } else {
                              setAudioPlayingPERCENT_AIR(false);
                              setExceedThresholdPERCENT_AIR(false);
                           }
                       } 
                   } 
               }, [PERCENT_AIR_High, PERCENT_AIR, audioPlayingPERCENT_AIR, PERCENT_AIR_Low,maintainPERCENT_AIR]);
           
               useEffect(() => {
                   if (audioPlayingPERCENT_AIR) {
                       const audioEnded = () => {
                          setAudioPlayingPERCENT_AIR(false);
                       };
                       audioRef.current?.addEventListener('ended', audioEnded);
                       return () => {
                           audioRef.current?.removeEventListener('ended', audioEnded);
                       };
                   }
               }, [audioPlayingPERCENT_AIR]);
           
               const handleInputChangePERCENT_AIR = (event: any) => {
                   const newValue = event.target.value;
                   setInputValuePERCENT_AIR(newValue);
               };
           
               const handleInputChange2PERCENT_AIR = (event: any) => {
                   const newValue2 = event.target.value;
                   setInputValue2PERCENT_AIR(newValue2);
               };
               const ChangeMaintainPERCENT_AIR = async () => {
                   try {
                       const newValue = !maintainPERCENT_AIR;
                       await httpApi.post(
                           `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                           { PERCENT_AIR_Maintain: newValue }
                       );
                       setMaintainPERCENT_AIR(newValue);
                       
                   } catch (error) {}
               };
      
      
           // =================================================================================================================== 
 
     // =================================================================================================================== 
 
     const [HV_1001, setHV_1001] = useState<string | null>(null);
     const [audioPlayingHV_1001, setAudioPlayingHV_1001] = useState(false);
     const [inputValueHV_1001, setInputValueHV_1001] = useState<any>();
     const [inputValue2HV_1001, setInputValue2HV_1001] = useState<any>();
     const [HV_1001_High, setHV_1001_High] = useState<number | null>(null);
     const [HV_1001_Low, setHV_1001_Low] = useState<number | null>(null);
     const [exceedThresholdHV_1001, setExceedThresholdHV_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainHV_1001, setMaintainHV_1001] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof HV_1001_High === 'string' && typeof HV_1001_Low === 'string' && HV_1001 !== null && maintainHV_1001 === false
             ) {
                 const highValue = parseFloat(HV_1001_High);
                 const lowValue = parseFloat(HV_1001_Low);
                 const HV_1001Value = parseFloat(HV_1001);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HV_1001Value)) {
                     if (highValue <= HV_1001Value || HV_1001Value <= lowValue) {
                         if (!audioPlayingHV_1001) {
                             audioRef.current?.play();
                             setAudioPlayingHV_1001(true);
                             setExceedThresholdHV_1001(true);
                         }
                     } else {
                        setAudioPlayingHV_1001(false);
                        setExceedThresholdHV_1001(false);
                     }
                 } 
             } 
         }, [HV_1001_High, HV_1001, audioPlayingHV_1001, HV_1001_Low,maintainHV_1001]);
     
         useEffect(() => {
             if (audioPlayingHV_1001) {
                 const audioEnded = () => {
                    setAudioPlayingHV_1001(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingHV_1001]);
     
         const handleInputChangeHV_1001 = (event: any) => {
             const newValue = event.target.value;
             setInputValueHV_1001(newValue);
         };
     
         const handleInputChange2HV_1001 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2HV_1001(newValue2);
         };
         const ChangeMaintainHV_1001 = async () => {
             try {
                 const newValue = !maintainHV_1001;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { HV_1001_Maintain: newValue }
                 );
                 setMaintainHV_1001(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
         // =================================================================================================================== 
 
         const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);
         const [audioPlayingFCV_MODE, setAudioPlayingFCV_MODE] = useState(false);
         const [inputValueFCV_MODE, setInputValueFCV_MODE] = useState<any>();
         const [inputValue2FCV_MODE, setInputValue2FCV_MODE] = useState<any>();
         const [FCV_MODE_High, setFCV_MODE_High] = useState<number | null>(null);
         const [FCV_MODE_Low, setFCV_MODE_Low] = useState<number | null>(null);
         const [exceedThresholdFCV_MODE, setExceedThresholdFCV_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainFCV_MODE, setMaintainFCV_MODE] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof FCV_MODE_High === 'string' && typeof FCV_MODE_Low === 'string' && FCV_MODE !== null && maintainFCV_MODE === false
                 ) {
                     const highValue = parseFloat(FCV_MODE_High);
                     const lowValue = parseFloat(FCV_MODE_Low);
                     const FCV_MODEValue = parseFloat(FCV_MODE);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FCV_MODEValue)) {
                         if (highValue <= FCV_MODEValue || FCV_MODEValue <= lowValue) {
                             if (!audioPlayingFCV_MODE) {
                                 audioRef.current?.play();
                                 setAudioPlayingFCV_MODE(true);
                                 setExceedThresholdFCV_MODE(true);
                             }
                         } else {
                            setAudioPlayingFCV_MODE(false);
                            setExceedThresholdFCV_MODE(false);
                         }
                     } 
                 } 
             }, [FCV_MODE_High, FCV_MODE, audioPlayingFCV_MODE, FCV_MODE_Low,maintainFCV_MODE]);
         
             useEffect(() => {
                 if (audioPlayingFCV_MODE) {
                     const audioEnded = () => {
                        setAudioPlayingFCV_MODE(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingFCV_MODE]);
         
             const handleInputChangeFCV_MODE = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueFCV_MODE(newValue);
             };
         
             const handleInputChange2FCV_MODE = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2FCV_MODE(newValue2);
             };
             const ChangeMaintainFCV_MODE = async () => {
                 try {
                     const newValue = !maintainFCV_MODE;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { FCV_MODE_Maintain: newValue }
                     );
                     setMaintainFCV_MODE(newValue);
                     
                 } catch (error) {}
             };
     
     
         // =================================================================================================================== 
 
             // =================================================================================================================== 
 
     const [TOTAL_CNG, setTOTAL_CNG] = useState<string | null>(null);
     const [audioPlayingTOTAL_CNG, setAudioPlayingTOTAL_CNG] = useState(false);
     const [inputValueTOTAL_CNG, setInputValueTOTAL_CNG] = useState<any>();
     const [inputValue2TOTAL_CNG, setInputValue2TOTAL_CNG] = useState<any>();
     const [TOTAL_CNG_High, setTOTAL_CNG_High] = useState<number | null>(null);
     const [TOTAL_CNG_Low, setTOTAL_CNG_Low] = useState<number | null>(null);
     const [exceedThresholdTOTAL_CNG, setExceedThresholdTOTAL_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTOTAL_CNG, setMaintainTOTAL_CNG] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TOTAL_CNG_High === 'string' && typeof TOTAL_CNG_Low === 'string' && TOTAL_CNG !== null && maintainTOTAL_CNG === false
             ) {
                 const highValue = parseFloat(TOTAL_CNG_High);
                 const lowValue = parseFloat(TOTAL_CNG_Low);
                 const TOTAL_CNGValue = parseFloat(TOTAL_CNG);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TOTAL_CNGValue)) {
                     if (highValue <= TOTAL_CNGValue || TOTAL_CNGValue <= lowValue) {
                         if (!audioPlayingTOTAL_CNG) {
                             audioRef.current?.play();
                             setAudioPlayingTOTAL_CNG(true);
                             setExceedThresholdTOTAL_CNG(true);
                         }
                     } else {
                        setAudioPlayingTOTAL_CNG(false);
                        setExceedThresholdTOTAL_CNG(false);
                     }
                 } 
             } 
         }, [TOTAL_CNG_High, TOTAL_CNG, audioPlayingTOTAL_CNG, TOTAL_CNG_Low,maintainTOTAL_CNG]);
     
         useEffect(() => {
             if (audioPlayingTOTAL_CNG) {
                 const audioEnded = () => {
                    setAudioPlayingTOTAL_CNG(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingTOTAL_CNG]);
     
         const handleInputChangeTOTAL_CNG = (event: any) => {
             const newValue = event.target.value;
             setInputValueTOTAL_CNG(newValue);
         };
     
         const handleInputChange2TOTAL_CNG = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2TOTAL_CNG(newValue2);
         };
         const ChangeMaintainTOTAL_CNG = async () => {
             try {
                 const newValue = !maintainTOTAL_CNG;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { TOTAL_CNG_Maintain: newValue }
                 );
                 setMaintainTOTAL_CNG(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
 
     const [TM2002_CNG, setTM2002_CNG] = useState<string | null>(null);
     const [audioPlayingTM2002_CNG, setAudioPlayingTM2002_CNG] = useState(false);
     const [inputValueTM2002_CNG, setInputValueTM2002_CNG] = useState<any>();
     const [inputValue2TM2002_CNG, setInputValue2TM2002_CNG] = useState<any>();
     const [TM2002_CNG_High, setTM2002_CNG_High] = useState<number | null>(null);
     const [TM2002_CNG_Low, setTM2002_CNG_Low] = useState<number | null>(null);
     const [exceedThresholdTM2002_CNG, setExceedThresholdTM2002_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTM2002_CNG, setMaintainTM2002_CNG] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TM2002_CNG_High === 'string' && typeof TM2002_CNG_Low === 'string' && TM2002_CNG !== null && maintainTM2002_CNG === false
             ) {
                 const highValue = parseFloat(TM2002_CNG_High);
                 const lowValue = parseFloat(TM2002_CNG_Low);
                 const TM2002_CNGValue = parseFloat(TM2002_CNG);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM2002_CNGValue)) {
                     if (highValue <= TM2002_CNGValue || TM2002_CNGValue <= lowValue) {
                         if (!audioPlayingTM2002_CNG) {
                             audioRef.current?.play();
                             setAudioPlayingTM2002_CNG(true);
                             setExceedThresholdTM2002_CNG(true);
                         }
                     } else {
                        setAudioPlayingTM2002_CNG(false);
                        setExceedThresholdTM2002_CNG(false);
                     }
                 } 
             } 
         }, [TM2002_CNG_High, TM2002_CNG, audioPlayingTM2002_CNG, TM2002_CNG_Low,maintainTM2002_CNG]);
     
         useEffect(() => {
             if (audioPlayingTM2002_CNG) {
                 const audioEnded = () => {
                    setAudioPlayingTM2002_CNG(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingTM2002_CNG]);
     
         const handleInputChangeTM2002_CNG = (event: any) => {
             const newValue = event.target.value;
             setInputValueTM2002_CNG(newValue);
         };
     
         const handleInputChange2TM2002_CNG = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2TM2002_CNG(newValue2);
         };
         const ChangeMaintainTM2002_CNG = async () => {
             try {
                 const newValue = !maintainTM2002_CNG;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                     { TM2002_CNG_Maintain: newValue }
                 );
                 setMaintainTM2002_CNG(newValue);
                 
             } catch (error) {}
         };
 
 
     // =================================================================================================================== 
 
         // =================================================================================================================== 
 
 const [TM2003_CNG, setTM2003_CNG] = useState<string | null>(null);
 const [audioPlayingTM2003_CNG, setAudioPlayingTM2003_CNG] = useState(false);
 const [inputValueTM2003_CNG, setInputValueTM2003_CNG] = useState<any>();
 const [inputValue2TM2003_CNG, setInputValue2TM2003_CNG] = useState<any>();
 const [TM2003_CNG_High, setTM2003_CNG_High] = useState<number | null>(null);
 const [TM2003_CNG_Low, setTM2003_CNG_Low] = useState<number | null>(null);
 const [exceedThresholdTM2003_CNG, setExceedThresholdTM2003_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainTM2003_CNG, setMaintainTM2003_CNG] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof TM2003_CNG_High === 'string' && typeof TM2003_CNG_Low === 'string' && TM2003_CNG !== null && maintainTM2003_CNG === false
         ) {
             const highValue = parseFloat(TM2003_CNG_High);
             const lowValue = parseFloat(TM2003_CNG_Low);
             const TM2003_CNGValue = parseFloat(TM2003_CNG);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM2003_CNGValue)) {
                 if (highValue <= TM2003_CNGValue || TM2003_CNGValue <= lowValue) {
                     if (!audioPlayingTM2003_CNG) {
                         audioRef.current?.play();
                         setAudioPlayingTM2003_CNG(true);
                         setExceedThresholdTM2003_CNG(true);
                     }
                 } else {
                    setAudioPlayingTM2003_CNG(false);
                    setExceedThresholdTM2003_CNG(false);
                 }
             } 
         } 
     }, [TM2003_CNG_High, TM2003_CNG, audioPlayingTM2003_CNG, TM2003_CNG_Low,maintainTM2003_CNG]);
 
     useEffect(() => {
         if (audioPlayingTM2003_CNG) {
             const audioEnded = () => {
                setAudioPlayingTM2003_CNG(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingTM2003_CNG]);
 
     const handleInputChangeTM2003_CNG = (event: any) => {
         const newValue = event.target.value;
         setInputValueTM2003_CNG(newValue);
     };
 
     const handleInputChange2TM2003_CNG = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2TM2003_CNG(newValue2);
     };
     const ChangeMaintainTM2003_CNG = async () => {
         try {
             const newValue = !maintainTM2003_CNG;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { TM2003_CNG_Maintain: newValue }
             );
             setMaintainTM2003_CNG(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
 
 const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
 const [audioPlayingWB_Setpoint, setAudioPlayingWB_Setpoint] = useState(false);
 const [inputValueWB_Setpoint, setInputValueWB_Setpoint] = useState<any>();
 const [inputValue2WB_Setpoint, setInputValue2WB_Setpoint] = useState<any>();
 const [WB_Setpoint_High, setWB_Setpoint_High] = useState<number | null>(null);
 const [WB_Setpoint_Low, setWB_Setpoint_Low] = useState<number | null>(null);
 const [exceedThresholdWB_Setpoint, setExceedThresholdWB_Setpoint] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainWB_Setpoint, setMaintainWB_Setpoint] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof WB_Setpoint_High === 'string' && typeof WB_Setpoint_Low === 'string' && WB_Setpoint !== null && maintainWB_Setpoint === false
         ) {
             const highValue = parseFloat(WB_Setpoint_High);
             const lowValue = parseFloat(WB_Setpoint_Low);
             const WB_SetpointValue = parseFloat(WB_Setpoint);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WB_SetpointValue)) {
                 if (highValue <= WB_SetpointValue || WB_SetpointValue <= lowValue) {
                     if (!audioPlayingWB_Setpoint) {
                         audioRef.current?.play();
                         setAudioPlayingWB_Setpoint(true);
                         setExceedThresholdWB_Setpoint(true);
                     }
                 } else {
                    setAudioPlayingWB_Setpoint(false);
                    setExceedThresholdWB_Setpoint(false);
                 }
             } 
         } 
     }, [WB_Setpoint_High, WB_Setpoint, audioPlayingWB_Setpoint, WB_Setpoint_Low,maintainWB_Setpoint]);
 
     useEffect(() => {
         if (audioPlayingWB_Setpoint) {
             const audioEnded = () => {
                setAudioPlayingWB_Setpoint(false);
             };
             audioRef.current?.addEventListener('ended', audioEnded);
             return () => {
                 audioRef.current?.removeEventListener('ended', audioEnded);
             };
         }
     }, [audioPlayingWB_Setpoint]);
 
     const handleInputChangeWB_Setpoint = (event: any) => {
         const newValue = event.target.value;
         setInputValueWB_Setpoint(newValue);
     };
 
     const handleInputChange2WB_Setpoint = (event: any) => {
         const newValue2 = event.target.value;
         setInputValue2WB_Setpoint(newValue2);
     };
     const ChangeMaintainWB_Setpoint = async () => {
         try {
             const newValue = !maintainWB_Setpoint;
             await httpApi.post(
                 `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                 { WB_Setpoint_Maintain: newValue }
             );
             setMaintainWB_Setpoint(newValue);
             
         } catch (error) {}
     };
 
 
 // =================================================================================================================== 
 
 
 
         // =================================================================================================================== 
 
         const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
         const [audioPlayingRATIO_MODE, setAudioPlayingRATIO_MODE] = useState(false);
         const [inputValueRATIO_MODE, setInputValueRATIO_MODE] = useState<any>();
         const [inputValue2RATIO_MODE, setInputValue2RATIO_MODE] = useState<any>();
         const [RATIO_MODE_High, setRATIO_MODE_High] = useState<number | null>(null);
         const [RATIO_MODE_Low, setRATIO_MODE_Low] = useState<number | null>(null);
         const [exceedThresholdRATIO_MODE, setExceedThresholdRATIO_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainRATIO_MODE, setMaintainRATIO_MODE] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof RATIO_MODE_High === 'string' && typeof RATIO_MODE_Low === 'string' && RATIO_MODE !== null && maintainRATIO_MODE === false
                 ) {
                     const highValue = parseFloat(RATIO_MODE_High);
                     const lowValue = parseFloat(RATIO_MODE_Low);
                     const RATIO_MODEValue = parseFloat(RATIO_MODE);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(RATIO_MODEValue)) {
                         if (highValue <= RATIO_MODEValue || RATIO_MODEValue <= lowValue) {
                             if (!audioPlayingRATIO_MODE) {
                                 audioRef.current?.play();
                                 setAudioPlayingRATIO_MODE(true);
                                 setExceedThresholdRATIO_MODE(true);
                             }
                         } else {
                            setAudioPlayingRATIO_MODE(false);
                            setExceedThresholdRATIO_MODE(false);
                         }
                     } 
                 } 
             }, [RATIO_MODE_High, RATIO_MODE, audioPlayingRATIO_MODE, RATIO_MODE_Low,maintainRATIO_MODE]);
         
             useEffect(() => {
                 if (audioPlayingRATIO_MODE) {
                     const audioEnded = () => {
                        setAudioPlayingRATIO_MODE(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingRATIO_MODE]);
         
             const handleInputChangeRATIO_MODE = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueRATIO_MODE(newValue);
             };
         
             const handleInputChange2RATIO_MODE = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2RATIO_MODE(newValue2);
             };
             const ChangeMaintainRATIO_MODE = async () => {
                 try {
                     const newValue = !maintainRATIO_MODE;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { RATIO_MODE_Maintain: newValue }
                     );
                     setMaintainRATIO_MODE(newValue);
                     
                 } catch (error) {}
             };
         
         
         // =================================================================================================================== 
         
    
         
        
          // =================================================================================================================== 

    
         const [HR_BC, setHR_BC] = useState<string | null>(null);
         const [audioPlayingHR_BC, setAudioPlayingHR_BC] = useState(false);
         const [inputValueHR_BC, setInputValueHR_BC] = useState<any>();
         const [inputValue2HR_BC, setInputValue2HR_BC] = useState<any>();
         const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
         const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
         const [exceedThresholdHR_BC, setExceedThresholdHR_BC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainHR_BC, setMaintainHR_BC] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof HR_BC_High === 'string' && typeof HR_BC_Low === 'string' && HR_BC !== null && maintainHR_BC === false
                 ) {
                     const highValue = parseFloat(HR_BC_High);
                     const lowValue = parseFloat(HR_BC_Low);
                     const HR_BCValue = parseFloat(HR_BC);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HR_BCValue)) {
                         if (highValue <= HR_BCValue || HR_BCValue <= lowValue) {
                             if (!audioPlayingHR_BC) {
                                 audioRef.current?.play();
                                 setAudioPlayingHR_BC(true);
                                 setExceedThresholdHR_BC(true);
                             }
                         } else {
                            setAudioPlayingHR_BC(false);
                             setExceedThresholdHR_BC(false);
                         }
                     } 
                 } 
             }, [HR_BC_High, HR_BC, audioPlayingHR_BC, HR_BC_Low,maintainHR_BC]);
         
             useEffect(() => {
                 if (audioPlayingHR_BC) {
                     const audioEnded = () => {
                        setAudioPlayingHR_BC(false);
                     };
                     audioRef.current?.addEventListener('ended', audioEnded);
                     return () => {
                         audioRef.current?.removeEventListener('ended', audioEnded);
                     };
                 }
             }, [audioPlayingHR_BC]);
         
             const handleInputChangeHR_BC = (event: any) => {
                 const newValue = event.target.value;
                 setInputValueHR_BC(newValue);
             };
         
             const handleInputChange2HR_BC = (event: any) => {
                 const newValue2 = event.target.value;
                 setInputValue2HR_BC(newValue2);
             };
             const ChangeMaintainHR_BC = async () => {
                 try {
                     const newValue = !maintainHR_BC;
                     await httpApi.post(
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { HR_BC_Maintain: newValue }
                     );
                     setMaintainHR_BC(newValue);
                     
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
                         `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                         { SD_Maintain: newValue }
                     );
                     setMaintainSD(newValue);
                     
                 } catch (error) {}
             };
    
    
         // =================================================================================================================== 
    
    
    
              const [ESD_2001, setESD_2001] = useState<string | null>(null);
              const [audioPlayingESD_2001, setAudioPlayingESD_2001] = useState(false);
              const [inputValueESD_2001, setInputValueESD_2001] = useState<any>();
              const [inputValue2ESD_2001, setInputValue2ESD_2001] = useState<any>();
              const [ESD_2001_High, setESD_2001_High] = useState<number | null>(null);
              const [ESD_2001_Low, setESD_2001_Low] = useState<number | null>(null);
              const [exceedThresholdESD_2001, setExceedThresholdESD_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainESD_2001, setMaintainESD_2001] = useState<boolean>(false);
              
              
                  useEffect(() => {
                      if (typeof ESD_2001_High === 'string' && typeof ESD_2001_Low === 'string' && ESD_2001 !== null && maintainESD_2001 === false
                      ) {
                          const highValue = parseFloat(ESD_2001_High);
                          const lowValue = parseFloat(ESD_2001_Low);
                          const ESD_2001Value = parseFloat(ESD_2001);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESD_2001Value)) {
                              if (highValue <= ESD_2001Value || ESD_2001Value <= lowValue) {
                                  if (!audioPlayingESD_2001) {
                                      audioRef.current?.play();
                                      setAudioPlayingESD_2001(true);
                                      setExceedThresholdESD_2001(true);
                                  }
                              } else {
                                 setAudioPlayingESD_2001(false);
                                 setExceedThresholdESD_2001(false);
                              }
                          } 
                      } 
                  }, [ESD_2001_High, ESD_2001, audioPlayingESD_2001, ESD_2001_Low,maintainESD_2001]);
              
                  useEffect(() => {
                      if (audioPlayingESD_2001) {
                          const audioEnded = () => {
                             setAudioPlayingESD_2001(false);
                          };
                          audioRef.current?.addEventListener('ended', audioEnded);
                          return () => {
                              audioRef.current?.removeEventListener('ended', audioEnded);
                          };
                      }
                  }, [audioPlayingESD_2001]);
              
                  const handleInputChangeESD_2001 = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueESD_2001(newValue);
                  };
              
                  const handleInputChange2ESD_2001 = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2ESD_2001(newValue2);
                  };
                  const ChangeMaintainESD_2001 = async () => {
                      try {
                          const newValue = !maintainESD_2001;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                              { ESD_2001_Maintain: newValue }
                          );
                          setMaintainESD_2001(newValue);
                          
                      } catch (error) {}
                  };
         
         
              // =================================================================================================================== 
    
             // =================================================================================================================== 
    
    
    
             const [WIS_Calorimeter, setWIS_Calorimeter] = useState<string | null>(null);
             const [audioPlayingWIS_Calorimeter, setAudioPlayingWIS_Calorimeter] = useState(false);
             const [inputValueWIS_Calorimeter, setInputValueWIS_Calorimeter] = useState<any>();
             const [inputValue2WIS_Calorimeter, setInputValue2WIS_Calorimeter] = useState<any>();
             const [WIS_Calorimeter_High, setWIS_Calorimeter_High] = useState<number | null>(null);
             const [WIS_Calorimeter_Low, setWIS_Calorimeter_Low] = useState<number | null>(null);
             const [exceedThresholdWIS_Calorimeter, setExceedThresholdWIS_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
             
             const [maintainWIS_Calorimeter, setMaintainWIS_Calorimeter] = useState<boolean>(false);
             
             
                 useEffect(() => {
                     if (typeof WIS_Calorimeter_High === 'string' && typeof WIS_Calorimeter_Low === 'string' && WIS_Calorimeter !== null && maintainWIS_Calorimeter === false
                     ) {
                         const highValue = parseFloat(WIS_Calorimeter_High);
                         const lowValue = parseFloat(WIS_Calorimeter_Low);
                         const WIS_CalorimeterValue = parseFloat(WIS_Calorimeter);
                 
                         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WIS_CalorimeterValue)) {
                             if (highValue <= WIS_CalorimeterValue || WIS_CalorimeterValue <= lowValue) {
                                 if (!audioPlayingWIS_Calorimeter) {
                                     audioRef.current?.play();
                                     setAudioPlayingWIS_Calorimeter(true);
                                     setExceedThresholdWIS_Calorimeter(true);
                                 }
                             } else {
                                setAudioPlayingWIS_Calorimeter(false);
                                setExceedThresholdWIS_Calorimeter(false);
                             }
                         } 
                     } 
                 }, [WIS_Calorimeter_High, WIS_Calorimeter, audioPlayingWIS_Calorimeter, WIS_Calorimeter_Low,maintainWIS_Calorimeter]);
             
                 useEffect(() => {
                     if (audioPlayingWIS_Calorimeter) {
                         const audioEnded = () => {
                            setAudioPlayingWIS_Calorimeter(false);
                         };
                         audioRef.current?.addEventListener('ended', audioEnded);
                         return () => {
                             audioRef.current?.removeEventListener('ended', audioEnded);
                         };
                     }
                 }, [audioPlayingWIS_Calorimeter]);
             
                 const handleInputChangeWIS_Calorimeter = (event: any) => {
                     const newValue = event.target.value;
                     setInputValueWIS_Calorimeter(newValue);
                 };
             
                 const handleInputChange2WIS_Calorimeter = (event: any) => {
                     const newValue2 = event.target.value;
                     setInputValue2WIS_Calorimeter(newValue2);
                 };
                 const ChangeMaintainWIS_Calorimeter = async () => {
                     try {
                         const newValue = !maintainWIS_Calorimeter;
                         await httpApi.post(
                             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                             { WIS_Calorimeter_Maintain: newValue }
                         );
                         setMaintainWIS_Calorimeter(newValue);
                         
                     } catch (error) {}
                 };
        
        
             // =================================================================================================================== 
         
                   // =================================================================================================================== 
    
    
    
                   const [CVS_Calorimeter, setCVS_Calorimeter] = useState<string | null>(null);
                   const [audioPlayingCVS_Calorimeter, setAudioPlayingCVS_Calorimeter] = useState(false);
                   const [inputValueCVS_Calorimeter, setInputValueCVS_Calorimeter] = useState<any>();
                   const [inputValue2CVS_Calorimeter, setInputValue2CVS_Calorimeter] = useState<any>();
                   const [CVS_Calorimeter_High, setCVS_Calorimeter_High] = useState<number | null>(null);
                   const [CVS_Calorimeter_Low, setCVS_Calorimeter_Low] = useState<number | null>(null);
                   const [exceedThresholdCVS_Calorimeter, setExceedThresholdCVS_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                   
                   const [maintainCVS_Calorimeter, setMaintainCVS_Calorimeter] = useState<boolean>(false);
                   
                   
                       useEffect(() => {
                           if (typeof CVS_Calorimeter_High === 'string' && typeof CVS_Calorimeter_Low === 'string' && CVS_Calorimeter !== null && maintainCVS_Calorimeter === false
                           ) {
                               const highValue = parseFloat(CVS_Calorimeter_High);
                               const lowValue = parseFloat(CVS_Calorimeter_Low);
                               const CVS_CalorimeterValue = parseFloat(CVS_Calorimeter);
                       
                               if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(CVS_CalorimeterValue)) {
                                   if (highValue <= CVS_CalorimeterValue || CVS_CalorimeterValue <= lowValue) {
                                       if (!audioPlayingCVS_Calorimeter) {
                                           audioRef.current?.play();
                                           setAudioPlayingCVS_Calorimeter(true);
                                           setExceedThresholdCVS_Calorimeter(true);
                                       }
                                   } else {
                                      setAudioPlayingCVS_Calorimeter(false);
                                      setExceedThresholdCVS_Calorimeter(false);
                                   }
                               } 
                           } 
                       }, [CVS_Calorimeter_High, CVS_Calorimeter, audioPlayingCVS_Calorimeter, CVS_Calorimeter_Low,maintainCVS_Calorimeter]);
                   
                       useEffect(() => {
                           if (audioPlayingCVS_Calorimeter) {
                               const audioEnded = () => {
                                  setAudioPlayingCVS_Calorimeter(false);
                               };
                               audioRef.current?.addEventListener('ended', audioEnded);
                               return () => {
                                   audioRef.current?.removeEventListener('ended', audioEnded);
                               };
                           }
                       }, [audioPlayingCVS_Calorimeter]);
                   
                       const handleInputChangeCVS_Calorimeter = (event: any) => {
                           const newValue = event.target.value;
                           setInputValueCVS_Calorimeter(newValue);
                       };
                   
                       const handleInputChange2CVS_Calorimeter = (event: any) => {
                           const newValue2 = event.target.value;
                           setInputValue2CVS_Calorimeter(newValue2);
                       };
                       const ChangeMaintainCVS_Calorimeter = async () => {
                           try {
                               const newValue = !maintainCVS_Calorimeter;
                               await httpApi.post(
                                   `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                                   { CVS_Calorimeter_Maintain: newValue }
                               );
                               setMaintainCVS_Calorimeter(newValue);
                               
                           } catch (error) {}
                       };
              
              
                   // =================================================================================================================== 




                             // =================================================================================================================== 
    
    
    
                             const [SG_Calorimeter, setSG_Calorimeter] = useState<string | null>(null);
                             const [audioPlayingSG_Calorimeter, setAudioPlayingSG_Calorimeter] = useState(false);
                             const [inputValueSG_Calorimeter, setInputValueSG_Calorimeter] = useState<any>();
                             const [inputValue2SG_Calorimeter, setInputValue2SG_Calorimeter] = useState<any>();
                             const [SG_Calorimeter_High, setSG_Calorimeter_High] = useState<number | null>(null);
                             const [SG_Calorimeter_Low, setSG_Calorimeter_Low] = useState<number | null>(null);
                             const [exceedThresholdSG_Calorimeter, setExceedThresholdSG_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                             
                             const [maintainSG_Calorimeter, setMaintainSG_Calorimeter] = useState<boolean>(false);
                             
                             
                                 useEffect(() => {
                                     if (typeof SG_Calorimeter_High === 'string' && typeof SG_Calorimeter_Low === 'string' && SG_Calorimeter !== null && maintainSG_Calorimeter === false
                                     ) {
                                         const highValue = parseFloat(SG_Calorimeter_High);
                                         const lowValue = parseFloat(SG_Calorimeter_Low);
                                         const SG_CalorimeterValue = parseFloat(SG_Calorimeter);
                                 
                                         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SG_CalorimeterValue)) {
                                             if (highValue <= SG_CalorimeterValue || SG_CalorimeterValue <= lowValue) {
                                                 if (!audioPlayingSG_Calorimeter) {
                                                     audioRef.current?.play();
                                                     setAudioPlayingSG_Calorimeter(true);
                                                     setExceedThresholdSG_Calorimeter(true);
                                                 }
                                             } else {
                                                setAudioPlayingSG_Calorimeter(false);
                                                setExceedThresholdSG_Calorimeter(false);
                                             }
                                         } 
                                     } 
                                 }, [SG_Calorimeter_High, SG_Calorimeter, audioPlayingSG_Calorimeter, SG_Calorimeter_Low,maintainSG_Calorimeter]);
                             
                                 useEffect(() => {
                                     if (audioPlayingSG_Calorimeter) {
                                         const audioEnded = () => {
                                            setAudioPlayingSG_Calorimeter(false);
                                         };
                                         audioRef.current?.addEventListener('ended', audioEnded);
                                         return () => {
                                             audioRef.current?.removeEventListener('ended', audioEnded);
                                         };
                                     }
                                 }, [audioPlayingSG_Calorimeter]);
                             
                                 const handleInputChangeSG_Calorimeter = (event: any) => {
                                     const newValue = event.target.value;
                                     setInputValueSG_Calorimeter(newValue);
                                 };
                             
                                 const handleInputChange2SG_Calorimeter = (event: any) => {
                                     const newValue2 = event.target.value;
                                     setInputValue2SG_Calorimeter(newValue2);
                                 };
                                 const ChangeMaintainSG_Calorimeter = async () => {
                                     try {
                                         const newValue = !maintainSG_Calorimeter;
                                         await httpApi.post(
                                             `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,
                                             { SG_Calorimeter_Maintain: newValue }
                                         );
                                         setMaintainSG_Calorimeter(newValue);
                                         
                                     } catch (error) {}
                                 };
                        
                        
                             // =================================================================================================================== 
         // =================================================================================================================== 
         




    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/SERVER_SCOPE`,



                {


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

                    TM2002_CNG_High: inputValueTM2002_CNG,TM2002_CNG_Low:inputValue2TM2002_CNG,
                    TM2003_CNG_High: inputValueTM2003_CNG,TM2003_CNG_Low:inputValue2TM2003_CNG,

                    WB_Setpoint_High: inputValueWB_Setpoint,WB_Setpoint_Low:inputValue2WB_Setpoint,


                    RATIO_MODE_High: inputValueRATIO_MODE,RATIO_MODE_Low:inputValue2RATIO_MODE,
                    IOT_Gateway_Phone: inputGetwayPhone,
                    PCV_01: inputPCV_01,
                    PCV_02: inputPCV_02,
                }
            );
     
            setGetWayPhoneOTSUKA(inputGetwayPhone);
            setPCV_02(inputPCV_02)
            setPCV_01(inputPCV_01)
            setHR_BC_High(inputValueHR_BC);
            setHR_BC_Low(inputValue2HR_BC);

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

            setTM2002_CNG_High(inputValueTM2002_CNG);
            setTM2002_CNG_Low(inputValue2TM2002_CNG);

            setTM2003_CNG_High(inputValueTM2003_CNG);
            setTM2003_CNG_Low(inputValue2TM2003_CNG);



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

        setInputValueTM2002_CNG(TM2002_CNG_High); 
        setInputValue2TM2002_CNG(TM2002_CNG_Low); 

        setInputValueTM2003_CNG(TM2003_CNG_High); 
        setInputValue2TM2003_CNG(TM2003_CNG_Low); 


        setInputValueWB_Setpoint(WB_Setpoint_High); 
        setInputValue2WB_Setpoint(WB_Setpoint_Low); 



        setInputValueRATIO_MODE(RATIO_MODE_High); 
        setInputValue2RATIO_MODE(RATIO_MODE_Low); 




   

    }, [
        
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

           TM2002_CNG_High,TM2002_CNG_Low,
           TM2003_CNG_High,TM2003_CNG_Low,

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
                const newMaintainTM2002_CNG = checked;
                const newMaintainTM2003_CNG = checked;
                const newMaintainWB_Setpoint = checked;
                const newMaintainWIS_Calorimeter = checked;
                const newMaintainCVS_Calorimeter = checked;
                const newMaintainSG_Calorimeter = checked;
        
        
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
                       TM2002_CNG_Maintain: newMaintainTM2002_CNG,
                       TM2003_CNG_Maintain: newMaintainTM2003_CNG,
                       WB_Setpoint_Maintain: newMaintainWB_Setpoint,
                       WIS_Calorimeter_Maintain: newMaintainWIS_Calorimeter,
                       CVS_Calorimeter_Maintain: newMaintainCVS_Calorimeter,
                       SG_Calorimeter_Maintain: newMaintainSG_Calorimeter,
        
        
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
                setMaintainTM2002_CNG(newMaintainTM2002_CNG);
                setMaintainTM2003_CNG(newMaintainTM2003_CNG);
                setMaintainWB_Setpoint(newMaintainWB_Setpoint);
                setMaintainWIS_Calorimeter(newMaintainWIS_Calorimeter);
        
                setMaintainSG_Calorimeter(newMaintainSG_Calorimeter);
                setMaintainCVS_Calorimeter(newMaintainCVS_Calorimeter);
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainAll(isChecked);
        };

        const maintainHeader = (
            <div>
    
                {!AuthInput && (
                    <Checkbox  
                    disabled={AuthInput} 
                        style={{ marginRight: 5 }}
                        onChange={handleCheckboxChange}
                        checked={maintainPT_2005}
                    />
                )} 
                Maintain
    
            </div>
        );




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
            color:exceedThresholdTemperature && !maintainPT_2005
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
            color:exceedThreshold302 && !maintainVAPORIZER_1
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

        CSSTM2003_CNG : {
            color:exceedThresholdTM2003_CNG && !maintainTM2003_CNG
            ? "#ff5656"
            : maintainTM2003_CNG
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTM2002_CNG : {
            color:exceedThresholdTM2002_CNG && !maintainTM2002_CNG
            ? "#ff5656"
            : maintainTM2002_CNG
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
  };
         
    
  const mainCategoryFC = {
    EVC01: 'EVC01 -  Parameter & Configuration',
    EVC02: 'EVC02 -  Parameter & Configuration',
    PLC: 'PLC -  Parameter & Configuration'
};

          const PLC01 = [
      

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2004} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2004}>Pressure Transmitter PT-2005</span> ,
    
             modbus: <span style={combineCss.CSSPT_2004}>40001	 </span> ,
    
            value: <span style={combineCss.CSSPT_2004} > {PT_2004} {nameValue.BARG} </span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSPT_2004}   placeholder='High' step="0.1" type='number' value={inputValuePT_2004} onChange={handleInputChangePT_2004} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSPT_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2004} onChange={handleInputChange2PT_2004} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPT_2004}
             checked={maintainPT_2004}
         ></Checkbox>
    
            },
    
         
            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSPT_2005} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPT_2005}>Pressure Transmitter PT-2006</span> ,
    
             modbus: <span style={combineCss.CSSPT_2005}>40003	 </span> ,
    
            value: <span style={combineCss.CSSPT_2005} > {PT_2005}  {nameValue.BARG}</span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSPT_2005}   placeholder='High' step="0.1" type='number' value={inputValuePT_2005} onChange={handleInputChangePT_2005} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSPT_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2PT_2005} onChange={handleInputChange2PT_2005} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
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
   
           value: <span style={combineCss.CSSTT_2003} > {TT_2003}  {nameValue.C}</span> , 
            high: <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSTT_2003}   placeholder='High' step="0.1" type='number' value={inputValueTT_2003} onChange={handleInputChangeTT_2003} inputMode="decimal" />, 
            low:  <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSTT_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2003} onChange={handleInputChange2TT_2003} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={AuthInput} 
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
  
          value: <span style={combineCss.CSSTT_2004} > {TT_2004} {nameValue.C}</span> , 
           high: <InputText 
disabled={AuthInputHighLow}
           
           style={combineCss.CSSTT_2004}   placeholder='High' step="0.1" type='number' value={inputValueTT_2004} onChange={handleInputChangeTT_2004} inputMode="decimal" />, 
           low:  <InputText 
disabled={AuthInputHighLow}
           
           style={combineCss.CSSTT_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2TT_2004} onChange={handleInputChange2TT_2004} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox  
           disabled={AuthInput} 
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
 
         value: <span style={combineCss.CSSTG_2005} > {TG_2005} {nameValue.C}</span> , 
          high: <InputText 
disabled={AuthInputHighLow}
          
          style={combineCss.CSSTG_2005}   placeholder='High' step="0.1" type='number' value={inputValueTG_2005} onChange={handleInputChangeTG_2005} inputMode="decimal" />, 
          low:  <InputText 
disabled={AuthInputHighLow}
          
          style={combineCss.CSSTG_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2TG_2005} onChange={handleInputChange2TG_2005} inputMode="decimal" />,
          update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
          Maintain:   <Checkbox  
          disabled={AuthInput} 
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

        value: <span style={combineCss.CSSWB_1001} > {WB_1001} ( MJ/Sm³ )</span> , 
         high: <InputText 
disabled={AuthInputHighLow}
         
         style={combineCss.CSSWB_1001}   placeholder='High' step="0.1" type='number' value={inputValueWB_1001} onChange={handleInputChangeWB_1001} inputMode="decimal" />, 
         low:  <InputText 
disabled={AuthInputHighLow}
         
         style={combineCss.CSSWB_1001}   placeholder='Low' step="0.1" type='number' value={inputValue2WB_1001} onChange={handleInputChange2WB_1001} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox  
         disabled={AuthInput} 
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

       value: <span style={combineCss.CSSGD_2002} > {GD_2002} {nameValue.LEL}</span> , 
        high: <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSGD_2002}   placeholder='High' step="0.1" type='number' value={inputValueGD_2002} onChange={handleInputChangeGD_2002} inputMode="decimal" />, 
        low:  <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSGD_2002}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2002} onChange={handleInputChange2GD_2002} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={AuthInput} 
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

      value: <span style={combineCss.CSSGD_2003} > {GD_2003} {nameValue.LEL}</span> , 
       high: <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSGD_2003}   placeholder='High' step="0.1" type='number' value={inputValueGD_2003} onChange={handleInputChangeGD_2003} inputMode="decimal" />, 
       low:  <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSGD_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2003} onChange={handleInputChange2GD_2003} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={AuthInput} 
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

       value: <span style={combineCss.CSSGD_2004} > {GD_2004} {nameValue.LEL}</span> , 
        high: <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSGD_2004}   placeholder='High' step="0.1" type='number' value={inputValueGD_2004} onChange={handleInputChangeGD_2004} inputMode="decimal" />, 
        low:  <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSGD_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2004} onChange={handleInputChange2GD_2004} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={AuthInput} 
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

      value: <span style={combineCss.CSSGD_2005} > {GD_2005} {nameValue.LEL}</span> , 
       high: <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSGD_2005}   placeholder='High' step="0.1" type='number' value={inputValueGD_2005} onChange={handleInputChangeGD_2005} inputMode="decimal" />, 
       low:  <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSGD_2005}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2005} onChange={handleInputChange2GD_2005} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={AuthInput} 
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

     value: <span style={combineCss.CSSGD_2006} > {GD_2006} {nameValue.LEL}</span> , 
      high: <InputText 
disabled={AuthInputHighLow}
      
      style={combineCss.CSSGD_2006}   placeholder='High' step="0.1" type='number' value={inputValueGD_2006} onChange={handleInputChangeGD_2006} inputMode="decimal" />, 
      low:  <InputText 
disabled={AuthInputHighLow}
      
      style={combineCss.CSSGD_2006}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_2006} onChange={handleInputChange2GD_2006} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox  
      disabled={AuthInput} 
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_2006}
      checked={maintainGD_2006}
  ></Checkbox>

     },


            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSTM_2002_SNG} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSTM_2002_SNG}>Tubine Meter TM2002-SNG</span> ,
       
            modbus: <span style={combineCss.CSSTM_2002_SNG}>40023	 </span> ,
       
           value: <span style={combineCss.CSSTM_2002_SNG} > {TM_2002_SNG}</span> , 
            high: <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSTM_2002_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2002_SNG} onChange={handleInputChangeTM_2002_SNG} inputMode="decimal" />, 
            low:  <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSTM_2002_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2002_SNG} onChange={handleInputChange2TM_2002_SNG} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={AuthInput} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainTM_2002_SNG}
            checked={maintainTM_2002_SNG}
        ></Checkbox>
       
           },
    
        




    {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSTM_2003_SNG} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSTM_2003_SNG}>Tubine Meter TM2003-SNG</span> ,

    modbus: <span style={combineCss.CSSTM_2003_SNG}>40025	 </span> ,

   value: <span style={combineCss.CSSTM_2003_SNG} > {TM_2003_SNG}</span> , 
    high: <InputText 
disabled={AuthInputHighLow}
    
    style={combineCss.CSSTM_2003_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTM_2003_SNG} onChange={handleInputChangeTM_2003_SNG} inputMode="decimal" />, 
    low:  <InputText 
disabled={AuthInputHighLow}
    
    style={combineCss.CSSTM_2003_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM_2003_SNG} onChange={handleInputChange2TM_2003_SNG} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox  
    disabled={AuthInput} 
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainTM_2003_SNG}
    checked={maintainTM_2003_SNG}
></Checkbox>

   },


   {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTOTAL_SNG} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSTOTAL_SNG}>Total SNG</span> ,

   modbus: <span style={combineCss.CSSTOTAL_SNG}>40027	 </span> ,

  value: <span style={combineCss.CSSTOTAL_SNG} > {TOTAL_SNG}</span> , 
   high: <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSTOTAL_SNG}   placeholder='High' step="0.1" type='number' value={inputValueTOTAL_SNG} onChange={handleInputChangeTOTAL_SNG} inputMode="decimal" />, 
   low:  <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSTOTAL_SNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TOTAL_SNG} onChange={handleInputChange2TOTAL_SNG} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={AuthInput} 
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

 value: <span style={combineCss.CSSSDV_2004} > {SDV_2004} {DataSDV_2004} </span> , 
  high: <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSSDV_2004}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2004} onChange={handleInputChangeSDV_2004} inputMode="decimal" />, 
  low:  <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSSDV_2004}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2004} onChange={handleInputChange2SDV_2004} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={AuthInput} 
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

  value: <span style={combineCss.CSSSDV_2003} > {SDV_2003} {DataSDV_2003}</span> , 
   high: <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSSDV_2003}   placeholder='High' step="0.1" type='number' value={inputValueSDV_2003} onChange={handleInputChangeSDV_2003} inputMode="decimal" />, 
   low:  <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSSDV_2003}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_2003} onChange={handleInputChange2SDV_2003} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={AuthInput} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainSDV_2003}
   checked={maintainSDV_2003}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD1_STATUS} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSGD1_STATUS}>GD-2002 Status</span> ,

  modbus: <span style={combineCss.CSSGD1_STATUS}>40033	{DataGD1_STATUS}</span> ,

 value: <span style={combineCss.CSSGD1_STATUS} > {GD1_STATUS}</span> , 
  high: <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSGD1_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD1_STATUS} onChange={handleInputChangeGD1_STATUS} inputMode="decimal" />, 
  low:  <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSGD1_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1_STATUS} onChange={handleInputChange2GD1_STATUS} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={AuthInput} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainGD1_STATUS}
  checked={maintainGD1_STATUS}
></Checkbox>

 },




 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD2_STATUS} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSGD2_STATUS}>GD-2003 Status</span> ,

 modbus: <span style={combineCss.CSSGD2_STATUS}>40035 {DataGD2_STATUS}</span> ,

value: <span style={combineCss.CSSGD2_STATUS} > {GD2_STATUS}</span> , 
 high: <InputText 
disabled={AuthInputHighLow}
 
 style={combineCss.CSSGD2_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD2_STATUS} onChange={handleInputChangeGD2_STATUS} inputMode="decimal" />, 
 low:  <InputText 
disabled={AuthInputHighLow}
 
 style={combineCss.CSSGD2_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2_STATUS} onChange={handleInputChange2GD2_STATUS} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox  
 disabled={AuthInput} 
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainGD2_STATUS}
 checked={maintainGD2_STATUS}
></Checkbox>

},

{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD3_STATUS} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSGD3_STATUS}>GD-2004 Status</span> ,

  modbus: <span style={combineCss.CSSGD3_STATUS}>40037	{DataGD3_STATUS}</span> ,

 value: <span style={combineCss.CSSGD3_STATUS} > {GD3_STATUS}</span> , 
  high: <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSGD3_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD3_STATUS} onChange={handleInputChangeGD3_STATUS} inputMode="decimal" />, 
  low:  <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSGD3_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD3_STATUS} onChange={handleInputChange2GD3_STATUS} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={AuthInput} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainGD3_STATUS}
  checked={maintainGD3_STATUS}
></Checkbox>

 },


 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD4_STATUS} >{PLC_STTValue}</span>,
 name: <span style={combineCss.CSSGD4_STATUS}>GD-2005 Status</span> ,

 modbus: <span style={combineCss.CSSGD4_STATUS}>40039 {DataGD4_STATUS}</span> ,

value: <span style={combineCss.CSSGD4_STATUS} > {GD4_STATUS}</span> , 
 high: <InputText 
disabled={AuthInputHighLow}
 
 style={combineCss.CSSGD4_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD4_STATUS} onChange={handleInputChangeGD4_STATUS} inputMode="decimal" />, 
 low:  <InputText 
disabled={AuthInputHighLow}
 
 style={combineCss.CSSGD4_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD4_STATUS} onChange={handleInputChange2GD4_STATUS} inputMode="decimal" />,
 update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
 Maintain:   <Checkbox  
 disabled={AuthInput} 
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainGD4_STATUS}
 checked={maintainGD4_STATUS}
></Checkbox>

},


{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSGD5_STATUS} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSGD5_STATUS}>GD-2006 Status</span> ,

modbus: <span style={combineCss.CSSGD5_STATUS}>40041 {DataGD5_STATUS}</span> ,

value: <span style={combineCss.CSSGD5_STATUS} > {GD5_STATUS}</span> , 
high: <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSGD5_STATUS}   placeholder='High' step="0.1" type='number' value={inputValueGD5_STATUS} onChange={handleInputChangeGD5_STATUS} inputMode="decimal" />, 
low:  <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSGD5_STATUS}   placeholder='Low' step="0.1" type='number' value={inputValue2GD5_STATUS} onChange={handleInputChange2GD5_STATUS} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={AuthInput} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainGD5_STATUS}
checked={maintainGD5_STATUS}
></Checkbox>

},

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSESD} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSESD}>Emergency Shutdown</span> ,
    
             modbus: <span style={combineCss.CSSESD}>40043	{DataESD}</span> ,
    
            value: <span style={combineCss.CSSESD} > {ESD}</span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSESD}   placeholder='High' step="0.1" type='number' value={inputValueESD} onChange={handleInputChangeESD} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSESD}   placeholder='Low' step="0.1" type='number' value={inputValue2ESD} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
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
            
            value: <span style={combineCss.CSSHR_BC} > {HR_BC} {DataHR_BC}</span> , 
            high: <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSHR_BC}   placeholder='High' step="0.1" type='number' value={inputValueHR_BC} onChange={handleInputChangeHR_BC} inputMode="decimal" />, 
            low:  <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSHR_BC}   placeholder='Low' step="0.1" type='number' value={inputValue2HR_BC} onChange={handleInputChange2HR_BC} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={AuthInput} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainHR_BC}
            checked={maintainHR_BC}
            ></Checkbox>
            
            },
         
{
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSSD} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSD}> Smoker Detector</span> ,

modbus: <span style={combineCss.CSSSD}>40047	{DataSD}</span> ,

value: <span style={combineCss.CSSSD} > {SD}</span> , 
high: <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSSD}   placeholder='High' step="0.1" type='number' value={inputValueSD} onChange={handleInputChangeSD} inputMode="decimal" />, 
low:  <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSSD}   placeholder='Low' step="0.1" type='number' value={inputValue2SD} onChange={handleInputChange2SD} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={AuthInput} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainSD}
checked={maintainSD}
></Checkbox>

},

            {
                mainCategory: mainCategoryFC.PLC,
                
                timeUpdate: <span style={combineCss.CSSVAPORIZER_1} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVAPORIZER_1}>VAPORIZER 1</span> ,
    
             modbus: <span style={combineCss.CSSVAPORIZER_1}>40049	{DataVAPORIZER_1} </span> ,
    
            value: <span style={combineCss.CSSVAPORIZER_1} > {VAPORIZER_1}</span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_1}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_1} onChange={handleInputChangeVAPORIZER_1} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_1}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_1} onChange={handleInputChange2VAPORIZER_1} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
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
    
            value: <span style={combineCss.CSSVAPORIZER_2} > {VAPORIZER_2} {DataVAPORIZER_2} </span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_2}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_2} onChange={handleInputChangeVAPORIZER_2} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_2}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_2} onChange={handleInputChange2VAPORIZER_2} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
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
    
            value: <span style={combineCss.CSSVAPORIZER_3} > {VAPORIZER_3} {DataVAPORIZER_3} </span> , 
             high: <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_3}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_3} onChange={handleInputChangeVAPORIZER_3} inputMode="decimal" />, 
             low:  <InputText 
disabled={AuthInputHighLow}
             
             style={combineCss.CSSVAPORIZER_3}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_3} onChange={handleInputChange2VAPORIZER_3} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
             Maintain:   <Checkbox  
             disabled={AuthInput} 
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
   
           value: <span style={combineCss.CSSVAPORIZER_4} > {VAPORIZER_4} {DataVAPORIZER_4} </span> , 
            high: <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSVAPORIZER_4}   placeholder='High' step="0.1" type='number' value={inputValueVAPORIZER_4} onChange={handleInputChangeVAPORIZER_4} inputMode="decimal" />, 
            low:  <InputText 
disabled={AuthInputHighLow}
            
            style={combineCss.CSSVAPORIZER_4}   placeholder='Low' step="0.1" type='number' value={inputValue2VAPORIZER_4} onChange={handleInputChange2VAPORIZER_4} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
            Maintain:   <Checkbox  
            disabled={AuthInput} 
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
  
          value: <span style={combineCss.CSSCOOLING_V} > {COOLING_V} {DataCOOLING_V}</span> , 
           high: <InputText 
disabled={AuthInputHighLow}
           
           style={combineCss.CSSCOOLING_V}   placeholder='High' step="0.1" type='number' value={inputValueCOOLING_V} onChange={handleInputChangeCOOLING_V} inputMode="decimal" />, 
           low:  <InputText 
disabled={AuthInputHighLow}
           
           style={combineCss.CSSCOOLING_V}   placeholder='Low' step="0.1" type='number' value={inputValue2COOLING_V} onChange={handleInputChange2COOLING_V} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
           Maintain:   <Checkbox  
           disabled={AuthInput} 
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

        value: <span style={combineCss.CSSFCV_2001} > {FCV_2001} (%) </span> , 
         high: <InputText 
disabled={AuthInputHighLow}
         
         style={combineCss.CSSFCV_2001}   placeholder='High' step="0.1" type='number' value={inputValueFCV_2001} onChange={handleInputChangeFCV_2001} inputMode="decimal" />, 
         low:  <InputText 
disabled={AuthInputHighLow}
         
         style={combineCss.CSSFCV_2001}   placeholder='Low' step="0.1" type='number' value={inputValue2FCV_2001} onChange={handleInputChange2FCV_2001} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
         Maintain:   <Checkbox  
         disabled={AuthInput} 
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

       value: <span style={combineCss.CSSPERCENT_LPG} > {PERCENT_LPG} (%)</span> , 
        high: <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSPERCENT_LPG}   placeholder='High' step="0.1" type='number' value={inputValuePERCENT_LPG} onChange={handleInputChangePERCENT_LPG} inputMode="decimal" />, 
        low:  <InputText 
disabled={AuthInputHighLow}
        
        style={combineCss.CSSPERCENT_LPG}   placeholder='Low' step="0.1" type='number' value={inputValue2PERCENT_LPG} onChange={handleInputChange2PERCENT_LPG} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
        Maintain:   <Checkbox  
        disabled={AuthInput} 
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

      value: <span style={combineCss.CSSPERCENT_AIR} > {PERCENT_AIR} (%)</span> , 
       high: <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSPERCENT_AIR}   placeholder='High' step="0.1" type='number' value={inputValuePERCENT_AIR} onChange={handleInputChangePERCENT_AIR} inputMode="decimal" />, 
       low:  <InputText 
disabled={AuthInputHighLow}
       
       style={combineCss.CSSPERCENT_AIR}   placeholder='Low' step="0.1" type='number' value={inputValue2PERCENT_AIR} onChange={handleInputChange2PERCENT_AIR} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
       Maintain:   <Checkbox  
       disabled={AuthInput} 
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainPERCENT_AIR}
       checked={maintainPERCENT_AIR}
   ></Checkbox>

      },


      {
                                              mainCategory: mainCategoryFC.PLC,

        
        timeUpdate: <span style={combineCss.CSSHV_1001} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSHV_1001}>Heat Value HV-2001</span> ,

      modbus: <span style={combineCss.CSSHV_1001}>40065	 </span> ,

     value: <span style={combineCss.CSSHV_1001} > {HV_1001} (MJ/Sm³)</span> , 
      high: <InputText 
disabled={AuthInputHighLow}
      
      style={combineCss.CSSHV_1001}   placeholder='High' step="0.1" type='number' value={inputValueHV_1001} onChange={handleInputChangeHV_1001} inputMode="decimal" />, 
      low:  <InputText 
disabled={AuthInputHighLow}
      
      style={combineCss.CSSHV_1001}   placeholder='Low' step="0.1" type='number' value={inputValue2HV_1001} onChange={handleInputChange2HV_1001} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
      Maintain:   <Checkbox  
      disabled={AuthInput} 
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
    
    value: <span style={combineCss.CSSRATIO_MODE} > {RATIO_MODE} {DataRATIO_MODE}</span> , 
     high: <InputText 
disabled={AuthInputHighLow}
     
     style={combineCss.CSSRATIO_MODE}   placeholder='High' step="0.1" type='number' value={inputValueRATIO_MODE} onChange={handleInputChangeRATIO_MODE} inputMode="decimal" />, 
     low:  <InputText 
disabled={AuthInputHighLow}
     
     style={combineCss.CSSRATIO_MODE}   placeholder='Low' step="0.1" type='number' value={inputValue2RATIO_MODE} onChange={handleInputChange2RATIO_MODE} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox  
     disabled={AuthInput} 
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

    value: <span style={combineCss.CSSFCV_MODE} > {FCV_MODE} {DataFCV_MODE}</span> , 
     high: <InputText 
disabled={AuthInputHighLow}
     
     style={combineCss.CSSFCV_MODE}   placeholder='High' step="0.1" type='number' value={inputValueFCV_MODE} onChange={handleInputChangeFCV_MODE} inputMode="decimal" />, 
     low:  <InputText 
disabled={AuthInputHighLow}
     
     style={combineCss.CSSFCV_MODE}   placeholder='Low' step="0.1" type='number' value={inputValue2FCV_MODE} onChange={handleInputChange2FCV_MODE} inputMode="decimal" />,
     update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
     Maintain:   <Checkbox  
     disabled={AuthInput} 
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

   value: <span style={combineCss.CSSTOTAL_CNG} > {TOTAL_CNG} . </span> , 
    high: <InputText 
disabled={AuthInputHighLow}
    
    style={combineCss.CSSTOTAL_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTOTAL_CNG} onChange={handleInputChangeTOTAL_CNG} inputMode="decimal" />, 
    low:  <InputText 
disabled={AuthInputHighLow}
    
    style={combineCss.CSSTOTAL_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TOTAL_CNG} onChange={handleInputChange2TOTAL_CNG} inputMode="decimal" />,
    update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
    Maintain:   <Checkbox  
    disabled={AuthInput} 
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainTOTAL_CNG}
    checked={maintainTOTAL_CNG}
></Checkbox>

   },


   {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTM2002_CNG} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSTM2002_CNG}>Tubine Meter TM2002-CNG</span> ,

   modbus: <span style={combineCss.CSSTM2002_CNG}>40073	 </span> ,

  value: <span style={combineCss.CSSTM2002_CNG} > {TM2002_CNG}</span> , 
   high: <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSTM2002_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTM2002_CNG} onChange={handleInputChangeTM2002_CNG} inputMode="decimal" />, 
   low:  <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSTM2002_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM2002_CNG} onChange={handleInputChange2TM2002_CNG} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={AuthInput} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainTM2002_CNG}
   checked={maintainTM2002_CNG}
></Checkbox>

  },


  {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSTM2003_CNG} >{PLC_STTValue}</span>,
  name: <span style={combineCss.CSSTM2003_CNG}>Tubine Meter TM2003-CNG</span> ,

  modbus: <span style={combineCss.CSSTM2003_CNG}>40075	 </span> ,

 value: <span style={combineCss.CSSTM2003_CNG} > {TM2003_CNG}</span> , 
  high: <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSTM2003_CNG}   placeholder='High' step="0.1" type='number' value={inputValueTM2003_CNG} onChange={handleInputChangeTM2003_CNG} inputMode="decimal" />, 
  low:  <InputText 
disabled={AuthInputHighLow}
  
  style={combineCss.CSSTM2003_CNG}   placeholder='Low' step="0.1" type='number' value={inputValue2TM2003_CNG} onChange={handleInputChange2TM2003_CNG} inputMode="decimal" />,
  update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
  Maintain:   <Checkbox  
  disabled={AuthInput} 
  style={{ marginRight: 20, }}
  onChange={ChangeMaintainTM2003_CNG}
  checked={maintainTM2003_CNG}
></Checkbox>

 },

 {
                mainCategory: mainCategoryFC.PLC,
    
    timeUpdate: <span style={combineCss.CSSWB_Setpoint} >{PLC_STTValue}</span>,
   name: <span style={combineCss.CSSWB_Setpoint}>Wobbe Index Setpoint</span> ,

   modbus: <span style={combineCss.CSSWB_Setpoint}>40077	 </span> ,

  value: <span style={combineCss.CSSWB_Setpoint} > {WB_Setpoint} (MJ/Sm³)</span> , 
   high: <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSWB_Setpoint}   placeholder='High' step="0.1" type='number' value={inputValueWB_Setpoint} onChange={handleInputChangeWB_Setpoint} inputMode="decimal" />, 
   low:  <InputText 
disabled={AuthInputHighLow}
   
   style={combineCss.CSSWB_Setpoint}   placeholder='Low' step="0.1" type='number' value={inputValue2WB_Setpoint} onChange={handleInputChange2WB_Setpoint} inputMode="decimal" />,
   update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
   Maintain:   <Checkbox  
   disabled={AuthInput} 
   style={{ marginRight: 20, }}
   onChange={ChangeMaintainWB_Setpoint}
   checked={maintainWB_Setpoint}
></Checkbox>

  },



  {
    mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSWIS_Calorimeter} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSWIS_Calorimeter}>WIS Calorimeter</span> ,

modbus: <span style={combineCss.CSSWIS_Calorimeter}>40001	 </span> ,

value: <span style={combineCss.CSSWIS_Calorimeter} > {WIS_Calorimeter}  (MJ/Sm³)</span> , 
high: <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSWIS_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueWIS_Calorimeter} onChange={handleInputChangeWIS_Calorimeter} inputMode="decimal" />, 
low:  <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSWIS_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2WIS_Calorimeter} onChange={handleInputChange2WIS_Calorimeter} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={AuthInput} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainWIS_Calorimeter}
checked={maintainWIS_Calorimeter}
></Checkbox>

},


{
    mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSCVS_Calorimeter} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSCVS_Calorimeter}>CVS Calorimeter</span> ,

modbus: <span style={combineCss.CSSCVS_Calorimeter}>40002	 </span> ,

value: <span style={combineCss.CSSCVS_Calorimeter} > {CVS_Calorimeter}  (MJ/Sm³)</span> , 
high: <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSCVS_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueCVS_Calorimeter} onChange={handleInputChangeCVS_Calorimeter} inputMode="decimal" />, 
low:  <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSCVS_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2CVS_Calorimeter} onChange={handleInputChange2CVS_Calorimeter} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={AuthInput} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainCVS_Calorimeter}
checked={maintainCVS_Calorimeter}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC,

timeUpdate: <span style={combineCss.CSSSG_Calorimeter} >{PLC_STTValue}</span>,
name: <span style={combineCss.CSSSG_Calorimeter}>SG Calorimeter</span> ,

modbus: <span style={combineCss.CSSSG_Calorimeter}>40003	 </span> ,

value: <span style={combineCss.CSSSG_Calorimeter} > {SG_Calorimeter} (rel)</span> , 
high: <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSSG_Calorimeter}   placeholder='High' step="0.1" type='number' value={inputValueSG_Calorimeter} onChange={handleInputChangeSG_Calorimeter} inputMode="decimal" />, 
low:  <InputText 
disabled={AuthInputHighLow}

style={combineCss.CSSSG_Calorimeter}   placeholder='Low' step="0.1" type='number' value={inputValue2SG_Calorimeter} onChange={handleInputChange2SG_Calorimeter} inputMode="decimal" />,
update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={AuthUpdatePCV} />,
Maintain:   <Checkbox  
disabled={AuthInput} 
style={{ marginRight: 20, }}
onChange={ChangeMaintainSG_Calorimeter}
checked={maintainSG_Calorimeter}
></Checkbox>

},

  

          ]

          const combinedData = [ ...PLC01];

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
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-2003) (BarG)</span>,

            Value: (
                <InputText 
                disabled={AuthUpdatePCV}


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
                disabled={AuthUpdatePCV}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

        {
            Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-2004) (BarG)</span>,
            Value: (
                <InputText 
                disabled={AuthUpdatePCV}


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
                disabled={AuthUpdatePCV}
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
                disabled={AuthUpdatePCV}


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
                disabled={AuthUpdatePCV}
                    className="buttonUpdateSetData"
                    style={{ marginTop: 5 }}
                    label="Update"
                    onClick={confirmUpData}
                />
            ),
        },

    ];

       //=========================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10,marginTop:10 }}>
        <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>SNG BINH DUONG</h2>

   

<div style={{width:'100%' , borderRadius:5 }}>

        

<DataTable  size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}   >
{/* <Column field="modbus" header="Modbus" /> */}
<Column field="timeUpdate" header="Time Update" />

<Column field="modbus" header="Modbus" />

<Column field="name" header="Name" />

<Column field="value" header="Value" />
<Column  field="high" header="High" />
<Column field="low" header="Low" />
{AuthInput ? " " :  <Column field="Maintain" header={maintainHeader} />
}
      {AuthInput ?  " " : <Column field="update" header="Update" /> }

</DataTable>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:20 }}>
                <h4>Station - Configuration </h4>
                <DataTable value={Configuration} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    {AuthInput ? " " : 
                         <Column field="Update" header="Update" />  

}
                </DataTable>
            </div>
</div>
<br />
<br />

</div>
  )
}
