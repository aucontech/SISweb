import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { edgePRU } from "./edgePRU";
import { Button } from "primereact/button";

import Image from "next/image";
import {
    ArrowRight,
    BlackTriangle,
    FIQ,
    GD,
    GaugeTemperature,
    PCV,
    PTV,
    SDV_Meiko,
    SDV_OFF,
    SDV_ON,
    SVD_NC,
    SVD_NO,
    TankLine,
    TankMeiko,
    VP_Black,
    VP_OFF,
    VP_ON,
    V_V1_V2,
    WhiteTriangleRight,
    arrowDown,
    arrowLeft,
    arrowUp,
    gaugePM,
    icon20,
    icon40,
} from "./iconSVG";
import "./ForCssGraphic.css";

import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { id_SNG_HungYen } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";
import { BlackTriangleRight } from "@/app/(main)/PRU/GraphicPRU/iconSVG";
import BallValue01 from "../BallValueSNG_HUNGYEN/BallValue01";
import BallValue02 from "../BallValueSNG_HUNGYEN/BallValue02";
import BallValue03 from "../BallValueSNG_HUNGYEN/BallValue03";
import PSV01 from "../BallValueSNG_HUNGYEN/PSV01";
import PSV02 from "../BallValueSNG_HUNGYEN/PSV02";
import { nameValue } from "@/app/(main)/SetupData/namValue";

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

interface StateMap2 {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
const background = "#036E9B";
export const colorNameValue = "black";
export const colorData = "green";
export const borderBox = "white";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ff7f00";
export const line2 = "#ffaa00";
export const line3 = "#ffe900";

export default function Graphic_SNG_HUNGYEN() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;


    const [SDV, setSDV] = useState<string | null>(null);

    const [PLC_STT, setPLC_STT] = useState<string | null>(null);

    const [PLC_STTValue, setPLC_STTValue] = useState<any>();
    const [active, setActive] = useState();


    const totalHeight = 620;
    const totalWidth = 50;


    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);

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
                    entityId: id_SNG_HungYen,
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

                
                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        PT_3005: setPT_3005,
                        PT_3006: setPT_3006,
                        TT_3003: setTT_3003,
                        TT_3004: setTT_3004,
                        WB_3001: setWB_3001,
                        TG_3005: setTG_3005,

                        GD_3002: setGD_3002,
                        GD_3003: setGD_3003,
                        GD_3004: setGD_3004,

                        GD_3005: setGD_3005,
                        GD_3006: setGD_3006,


                        TM_3002_SNG: setTM_3002_SNG,
                    
                        TM_3003_SNG: setTM_3003_SNG,


                        TOTAL_SNG: setTOTAL_SNG,
                 
                        
                        GD1_STATUS: setGD1_STATUS,
                        GD2_STATUS: setGD2_STATUS,
                        GD3_STATUS: setGD3_STATUS,
                        GD4_STATUS: setGD4_STATUS,
                        GD5_STATUS: setGD5_STATUS,


                        ESD: setESD,
                        HR_BC: setHR_BC,
                        SD: setSD,
                        VAPORIZER_1: setVAPORIZER_1,
                        VAPORIZER_2: setVAPORIZER_2,
                        VAPORIZER_3: setVAPORIZER_3,

                        VAPORIZER_4: setVAPORIZER_4,
                        COOLING_V: setCOOLING_V,
                        FCV_3001: setFCV_3001,


                        HV_3001: setHV_3001,
                        RATIO_MODE: setRATIO_MODE,
                        FCV_MODE: setFCV_MODE,
                        TOTAL_CNG: setTOTAL_CNG,

                        TM3002_CNG: setTM3002_CNG,
                        TM3003_CNG: setTM3003_CNG,
                        WB_Setpoint: setWB_Setpoint,
                        WIS_Calorimeter: setWIS_Calorimeter,
                        CVS_Calorimeter: setCVS_Calorimeter,

                        SG_Calorimeter: setSG_Calorimeter,

                        
                        

                        SDV_3004: setSDV_3004,
                        SDV_3003: setSDV_3003,
                        TD_4072_Conn_STT: setTD_4072_Conn_STT,
                        PLC_Conn_STT: setPLC_Conn_STT,
                        PERCENT_LPG: setPERCENT_LPG,
                        PERCENT_AIR: setPERCENT_AIR,

                    };
                    const valueStateMap: ValueStateMap = {
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
                        dataReceived.data.data[0].latest.ATTRIBUTE.active.value;
                    setActive(ballValue);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.setActive.value;
                    setActive(updatedData);
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
   



    


    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PT_3005: " Tank 01",
        PT_3006: "Volume",
        TM_3002_SNG: "TM-3002",
        TM_3003_SNG: "TM-3003",
        TT_3003: "TT 301",
        VP_301: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "Bara",
        CC: "°C",
        BARG: "%",
    };
    //================================ PT_3005================================

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_SNG_HungYen}/values/attributes/SERVER_SCOPE`
            );



    
          

            const PT_3005_High = res.data.find((item: any) => item.key === "PT_3005_High");
            setPT_3005_High(PT_3005_High?.value || null);
            const PT_3005_Low = res.data.find((item: any) => item.key === "PT_3005_Low");
            setPT_3005_Low(PT_3005_Low?.value || null);
            const PT_3005_Maintain = res.data.find(
                (item: any) => item.key === "PT_3005_Maintain"
            );


            const PT_3006_High = res.data.find((item: any) => item.key === "PT_3006_High");
            setPT_3006_High(PT_3006_High?.value || null);
            const PT_3006_Low = res.data.find((item: any) => item.key === "PT_3006_Low");
            setPT_3006_Low(PT_3006_Low?.value || null);
            const PT_3006_Maintain = res.data.find(
                (item: any) => item.key === "PT_3006_Maintain"
            );

            const TT_3003_High = res.data.find((item: any) => item.key === "TT_3003_High");
            setTT_3003_High(TT_3003_High?.value || null);
            const TT_3003_Low = res.data.find((item: any) => item.key === "TT_3003_Low");
            setTT_3003_Low(TT_3003_Low?.value || null);
            const TT_3003_Maintain = res.data.find(
                (item: any) => item.key === "TT_3003_Maintain"
            );

            const TT_3004_High = res.data.find((item: any) => item.key === "TT_3004_High");
            setTT_3004_High(TT_3004_High?.value || null);
            const TT_3004_Low = res.data.find((item: any) => item.key === "TT_3004_Low");
            setTT_3004_Low(TT_3004_Low?.value || null);
            const TT_3004_Maintain = res.data.find(
                (item: any) => item.key === "TT_3004_Maintain"
            );


            const WB_3001_High = res.data.find((item: any) => item.key === "WB_3001_High");
            setWB_3001_High(WB_3001_High?.value || null);
            const WB_3001_Low = res.data.find((item: any) => item.key === "WB_3001_Low");
            setWB_3001_Low(WB_3001_Low?.value || null);
            const WB_3001_Maintain = res.data.find(
                (item: any) => item.key === "WB_3001_Maintain"
            );



       
            const GD_3002_High = res.data.find((item: any) => item.key === "GD_3002_High");
            setGD_3002_High(GD_3002_High?.value || null);
            const GD_3002_Low = res.data.find((item: any) => item.key === "GD_3002_Low");
            setGD_3002_Low(GD_3002_Low?.value || null);
            const GD_3002_Maintain = res.data.find(
                (item: any) => item.key === "GD_3002_Maintain"
            );

            const GD_3003_High = res.data.find((item: any) => item.key === "GD_3003_High");
            setGD_3003_High(GD_3003_High?.value || null);
            const GD_3003_Low = res.data.find((item: any) => item.key === "GD_3003_Low");
            setGD_3003_Low(GD_3003_Low?.value || null);
            const GD_3003_Maintain = res.data.find(
                (item: any) => item.key === "GD_3003_Maintain"
            );

            const GD_3005_High = res.data.find((item: any) => item.key === "GD_3005_High");
            setGD_3005_High(GD_3005_High?.value || null);
            const GD_3005_Low = res.data.find((item: any) => item.key === "GD_3005_Low");
            setGD_3005_Low(GD_3005_Low?.value || null);
            const GD_3005_Maintain = res.data.find(
                (item: any) => item.key === "GD_3005_Maintain"
            );

            const TM_3002_SNG_High = res.data.find((item: any) => item.key === "TM_3002_SNG_High");
            setTM_3002_SNG_High(TM_3002_SNG_High?.value || null);
            const TM_3002_SNG_Low = res.data.find((item: any) => item.key === "TM_3002_SNG_Low");
            setTM_3002_SNG_Low(TM_3002_SNG_Low?.value || null);
            const TM_3002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3002_SNG_Maintain"
            );


            const TG_3005_High = res.data.find((item: any) => item.key === "TG_3005_High");
            setTG_3005_High(TG_3005_High?.value || null);
            const TG_3005_Low = res.data.find((item: any) => item.key === "TG_3005_Low");
            setTG_3005_Low(TG_3005_Low?.value || null);
            const TG_3005_Maintain = res.data.find(
                (item: any) => item.key === "TG_3005_Maintain"
            );

            const GD_3006_High = res.data.find((item: any) => item.key === "GD_3006_High");
            setGD_3006_High(GD_3006_High?.value || null);
            const GD_3006_Low = res.data.find((item: any) => item.key === "GD_3006_Low");
            setGD_3006_Low(GD_3006_Low?.value || null);
            const GD_3006_Maintain = res.data.find(
                (item: any) => item.key === "GD_3006_Maintain"
            );

            const GD_3004_High = res.data.find((item: any) => item.key === "GD_3004_High");
            setGD_3004_High(GD_3004_High?.value || null);
            const GD_3004_Low = res.data.find((item: any) => item.key === "GD_3004_Low");
            setGD_3004_Low(GD_3004_Low?.value || null);
            const GD_3004_Maintain = res.data.find(
                (item: any) => item.key === "GD_3004_Maintain"
            );

            const TOTAL_SNG_High = res.data.find((item: any) => item.key === "TOTAL_SNG_High");
            setTOTAL_SNG_High(TOTAL_SNG_High?.value || null);
            const TOTAL_SNG_Low = res.data.find((item: any) => item.key === "TOTAL_SNG_Low");
            setTOTAL_SNG_Low(TOTAL_SNG_Low?.value || null);
            const TOTAL_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Maintain"
            );
            const SDV_3004_High = res.data.find((item: any) => item.key === "SDV_3004_High");
            setSDV_3004_High(SDV_3004_High?.value || null);
            const SDV_3004_Low = res.data.find((item: any) => item.key === "SDV_3004_Low");
            setSDV_3004_Low(SDV_3004_Low?.value || null);
            const SDV_3004_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3004_Maintain"
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



            const TM_3003_SNG_High = res.data.find((item: any) => item.key === "TM_3003_SNG_High");
            setTM_3003_SNG_High(TM_3003_SNG_High?.value || null);
            const TM_3003_SNG_Low = res.data.find((item: any) => item.key === "TM_3003_SNG_Low");
            setTM_3003_SNG_Low(TM_3003_SNG_Low?.value || null);
            const TM_3003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3003_SNG_Maintain"
            );

     

            const SDV_3003_High = res.data.find((item: any) => item.key === "SDV_3003_High");
            setSDV_3003_High(SDV_3003_High?.value || null);
            const SDV_3003_Low = res.data.find((item: any) => item.key === "SDV_3003_Low");
            setSDV_3003_Low(SDV_3003_Low?.value || null);
            const SDV_3003_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3003_Maintain"
            );


            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const ESD_Maintain = res.data.find(
                (item: any) => item.key === "ESD_Maintain"
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

            const FCV_3001_High = res.data.find((item: any) => item.key === "FCV_3001_High");
            setFCV_3001_High(FCV_3001_High?.value || null);
            const FCV_3001_Low = res.data.find((item: any) => item.key === "FCV_3001_Low");
            setFCV_3001_Low(FCV_3001_Low?.value || null);
            const FCV_3001_Maintain = res.data.find(
                (item: any) => item.key === "FCV_3001_Maintain"
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

            const HV_3001_High = res.data.find((item: any) => item.key === "HV_3001_High");
            setHV_3001_High(HV_3001_High?.value || null);
            const HV_3001_Low = res.data.find((item: any) => item.key === "HV_3001_Low");
            setHV_3001_Low(HV_3001_Low?.value || null);
            const HV_3001_Maintain = res.data.find(
                (item: any) => item.key === "HV_3001_Maintain"
            );

            const RATIO_MODE_High = res.data.find((item: any) => item.key === "RATIO_MODE_High");
            setRATIO_MODE_High(RATIO_MODE_High?.value || null);
            const RATIO_MODE_Low = res.data.find((item: any) => item.key === "RATIO_MODE_Low");
            setRATIO_MODE_Low(RATIO_MODE_Low?.value || null);
            const RATIO_MODE_Maintain = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Maintain"
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



            
            const TM3002_CNG_High = res.data.find((item: any) => item.key === "TM3002_CNG_High");
            setTM3002_CNG_High(TM3002_CNG_High?.value || null);
            const TM3002_CNG_Low = res.data.find((item: any) => item.key === "TM3002_CNG_Low");
            setTM3002_CNG_Low(TM3002_CNG_Low?.value || null);
            const TM3002_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM3002_CNG_Maintain"
            );
            const WB_Setpoint_High = res.data.find((item: any) => item.key === "WB_Setpoint_High");
            setWB_Setpoint_High(WB_Setpoint_High?.value || null);
            const WB_Setpoint_Low = res.data.find((item: any) => item.key === "WB_Setpoint_Low");
            setWB_Setpoint_Low(WB_Setpoint_Low?.value || null);
            const WB_Setpoint_Maintain = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );
            const TM3003_CNG_High = res.data.find((item: any) => item.key === "TM3003_CNG_High");
            setTM3003_CNG_High(TM3003_CNG_High?.value || null);
            const TM3003_CNG_Low = res.data.find((item: any) => item.key === "TM3003_CNG_Low");
            setTM3003_CNG_Low(TM3003_CNG_Low?.value || null);
            const TM3003_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM3003_CNG_Maintain"
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



            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );

            const TD_4072_Conn_STT_High = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_High");
            setTD_4072_Conn_STT_High(TD_4072_Conn_STT_High?.value || null);
            const TD_4072_Conn_STT_Low = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_Low");
            setTD_4072_Conn_STT_Low(TD_4072_Conn_STT_Low?.value || null);
            const TD_4072_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "TD_4072_Conn_STT_Maintain"
            );

            const Active = res.data.find(
                (item: any) => item.key === "active"
            );
            setActive(Active?.value || false);
            
 // =================================================================================================================== 


 setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);


 setMaintainTD_4072_Conn_STT(TD_4072_Conn_STT_Maintain?.value || false);
            

 setMaintainESD(ESD_Maintain?.value || false);


 setMaintainHR_BC(HR_BC_Maintain?.value || false);


 setMaintainSD(SD_Maintain?.value || false);

 setMaintainVAPORIZER_1(VAPORIZER_1_Maintain?.value || false);


 setMaintainVAPORIZER_2(VAPORIZER_2_Maintain?.value || false);


 setMaintainVAPORIZER_3(VAPORIZER_3_Maintain?.value || false);

 setMaintainVAPORIZER_4(VAPORIZER_4_Maintain?.value || false);


 setMaintainCOOLING_V(COOLING_V_Maintain?.value || false);


 setMaintainFCV_3001(FCV_3001_Maintain?.value || false);



 setMaintainPERCENT_LPG(PERCENT_LPG_Maintain?.value || false);


 setMaintainPERCENT_AIR(PERCENT_AIR_Maintain?.value || false);


 setMaintainHV_3001(HV_3001_Maintain?.value || false);


 setMaintainRATIO_MODE(RATIO_MODE_Maintain?.value || false);

 setMaintainFCV_MODE(FCV_MODE_Maintain?.value || false);
 setMaintainTOTAL_CNG(TOTAL_CNG_Maintain?.value || false);

 setMaintainTM3002_CNG(TM3002_CNG_Maintain?.value || false);

 setMaintainWB_Setpoint(WB_Setpoint_Maintain?.value || false);

 setMaintainTM3003_CNG(TM3003_CNG_Maintain?.value || false);
 setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);



 setMaintainWIS_Calorimeter(WIS_Calorimeter_Maintain?.value || false);

 
           

            setMaintainPT_3005(PT_3005_Maintain?.value || false);


            setMaintainPT_3006(PT_3006_Maintain?.value || false);


            setMaintainTT_3003(TT_3003_Maintain?.value || false);


            setMaintainTT_3004(TT_3004_Maintain?.value || false);


            setMaintainGD_3004(GD_3004_Maintain?.value || false);

            setMaintainGD_3005(GD_3005_Maintain?.value || false);
            
            setMaintainGD_3006(GD_3006_Maintain?.value || false);
            
            setMaintainTG_3005(TG_3005_Maintain?.value || false);

            
            setMaintainTM_3002_SNG(TM_3002_SNG_Maintain?.value || false);
            setMaintainTM_3003_SNG(TM_3003_SNG_Maintain?.value || false);



            setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);


            setMaintainGD_3003(GD_3003_Maintain?.value || false);


            setMaintainGD_3002(GD_3002_Maintain?.value || false);


            setMaintainGD5_STATUS(GD5_STATUS_Maintain?.value || false);





            setMaintainWB_3001(WB_3001_Maintain?.value || false);

            setMaintainTOTAL_SNG(TOTAL_SNG_Maintain?.value || false);


            setMaintainSDV_3004(SDV_3004_Maintain?.value || false);


            setMaintainGD2_STATUS(GD2_STATUS_Maintain?.value || false);

            setMaintainGD1_STATUS(GD1_STATUS_Maintain?.value || false);

            setMaintainSDV_3003(SDV_3003_Maintain?.value || false);



            setMaintainGD3_STATUS(GD3_STATUS_Maintain?.value || false);


            setMaintainGD4_STATUS(GD4_STATUS_Maintain?.value || false);

 setMaintainSG_Calorimeter(SG_Calorimeter_Maintain?.value || false);

           
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

        const [TT_3004, setTT_3004] = useState<string | null>(null);
        const [TT_3004_High, setTT_3004_High] = useState<number | null>(null);
        const [TT_3004_Low, setTT_3004_Low] = useState<number | null>(null);
        const [exceedThresholdTT_3004, setExceedThresholdTT_3004] = useState(false); 
        const [maintainTT_3004, setMaintainTT_3004] = useState<boolean>(false);
        
        useEffect(() => {
            const TT_3004Value = parseFloat(TT_3004 as any);
            const highValue = TT_3004_High ?? NaN;
            const lowValue = TT_3004_Low ?? NaN;
        
            if (!isNaN(TT_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3004) {
                setExceedThresholdTT_3004(TT_3004Value >= highValue || TT_3004Value <= lowValue);
            }
        }, [TT_3004, TT_3004_High, TT_3004_Low, maintainTT_3004]);
        
        
        
        
        
        const [PT_3005, setPT_3005] = useState<string | null>(null);
        const [PT_3005_High, setPT_3005_High] = useState<number | null>(null);
        const [PT_3005_Low, setPT_3005_Low] = useState<number | null>(null);
        const [exceedThresholdPT_3005, setExceedThresholdPT_3005] = useState(false); 
        const [maintainPT_3005, setMaintainPT_3005] = useState<boolean>(false);
        
        useEffect(() => {
        const PT_3005Value = parseFloat(PT_3005 as any);
        const highValue = PT_3005_High ?? NaN;
        const lowValue = PT_3005_Low ?? NaN;
        
        if (!isNaN(PT_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3005) {
         setExceedThresholdPT_3005(PT_3005Value >= highValue || PT_3005Value <= lowValue);
        }
        }, [PT_3005, PT_3005_High, PT_3005_Low, maintainPT_3005]);
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
        const [PT_3006, setPT_3006] = useState<string | null>(null);
        const [PT_3006_High, setPT_3006_High] = useState<number | null>(null);
        const [PT_3006_Low, setPT_3006_Low] = useState<number | null>(null);
        const [exceedThresholdPT_3006, setExceedThresholdPT_3006] = useState(false); 
        const [maintainPT_3006, setMaintainPT_3006] = useState<boolean>(false);
        
        useEffect(() => {
         const PT_3006Value = parseFloat(PT_3006 as any);
         const highValue = PT_3006_High ?? NaN;
         const lowValue = PT_3006_Low ?? NaN;
        
         if (!isNaN(PT_3006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3006) {
             setExceedThresholdPT_3006(PT_3006Value >= highValue || PT_3006Value <= lowValue);
         }
        }, [PT_3006, PT_3006_High, PT_3006_Low, maintainPT_3006,
        
        
        
        
        
        
        ]);
        
        
        
        
        
        
        // =================================================================================================================== 
        
        
        const [TT_3003, setTT_3003] = useState<string | null>(null);
        const [TT_3003_High, setTT_3003_High] = useState<number | null>(null);
        const [TT_3003_Low, setTT_3003_Low] = useState<number | null>(null);
        const [exceedThresholdTT_3003, setExceedThresholdTT_3003] = useState(false); 
        const [maintainTT_3003, setMaintainTT_3003] = useState<boolean>(false);
        
        useEffect(() => {
         const TT_3003Value = parseFloat(TT_3003 as any);
         const highValue = TT_3003_High ?? NaN;
         const lowValue = TT_3003_Low ?? NaN;
        
         if (!isNaN(TT_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3003) {
             setExceedThresholdTT_3003(TT_3003Value >= highValue || TT_3003Value <= lowValue);
         }
        }, [TT_3003, TT_3003_High, TT_3003_Low, maintainTT_3003]);
        
        
        
        
        
        
        
          // =================================================================================================================== 
        
        
          const [TG_3005, setTG_3005] = useState<string | null>(null);
        const [TG_3005_High, setTG_3005_High] = useState<number | null>(null);
        const [TG_3005_Low, setTG_3005_Low] = useState<number | null>(null);
        const [exceedThresholdTG_3005, setExceedThresholdTG_3005] = useState(false); 
        const [maintainTG_3005, setMaintainTG_3005] = useState<boolean>(false);
        
        useEffect(() => {
         const TG_3005Value = parseFloat(TG_3005 as any);
         const highValue = TG_3005_High ?? NaN;
         const lowValue = TG_3005_Low ?? NaN;
        
         if (!isNaN(TG_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTG_3005) {
             setExceedThresholdTG_3005(TG_3005Value >= highValue || TG_3005Value <= lowValue);
         }
        }, [TG_3005, TG_3005_High, TG_3005_Low, maintainTG_3005]);
        
        
        
        
        
        
        
          // =================================================================================================================== 
          const [WB_3001, setWB_3001] = useState<string | null>(null);
          const [WB_3001_High, setWB_3001_High] = useState<number | null>(null);
          const [WB_3001_Low, setWB_3001_Low] = useState<number | null>(null);
          const [exceedThresholdWB_3001, setExceedThresholdWB_3001] = useState(false); 
          const [maintainWB_3001, setMaintainWB_3001] = useState<boolean>(false);
         
          useEffect(() => {
              const WB_3001Value = parseFloat(WB_3001 as any);
              const highValue = WB_3001_High ?? NaN;
              const lowValue = WB_3001_Low ?? NaN;
         
              if (!isNaN(WB_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWB_3001) {
                  setExceedThresholdWB_3001(WB_3001Value >= highValue || WB_3001Value <= lowValue);
              }
          }, [WB_3001, WB_3001_High, WB_3001_Low, maintainWB_3001]);
         
          
         
          
        
          
          
          // =================================================================================================================== 
        
          const [GD_3004, setGD_3004] = useState<string | null>(null);
          const [GD_3004_High, setGD_3004_High] = useState<number | null>(null);
          const [GD_3004_Low, setGD_3004_Low] = useState<number | null>(null);
          const [exceedThresholdGD_3004, setExceedThresholdGD_3004] = useState(false); 
          const [maintainGD_3004, setMaintainGD_3004] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_3004Value = parseFloat(GD_3004 as any);
              const highValue = GD_3004_High ?? NaN;
              const lowValue = GD_3004_Low ?? NaN;
         
              if (!isNaN(GD_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3004) {
                  setExceedThresholdGD_3004(GD_3004Value >= highValue || GD_3004Value <= lowValue);
              }
          }, [GD_3004, GD_3004_High, GD_3004_Low, maintainGD_3004]);
         
          
         
          
         
        
          
          // =================================================================================================================== 
        
          const [GD_3003, setGD_3003] = useState<string | null>(null);
          const [GD_3003_High, setGD_3003_High] = useState<number | null>(null);
          const [GD_3003_Low, setGD_3003_Low] = useState<number | null>(null);
          const [exceedThresholdGD_3003, setExceedThresholdGD_3003] = useState(false); 
          const [maintainGD_3003, setMaintainGD_3003] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_3003Value = parseFloat(GD_3003 as any);
              const highValue = GD_3003_High ?? NaN;
              const lowValue = GD_3003_Low ?? NaN;
         
              if (!isNaN(GD_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3003) {
                  setExceedThresholdGD_3003(GD_3003Value >= highValue || GD_3003Value <= lowValue);
              }
          }, [GD_3003, GD_3003_High, GD_3003_Low, maintainGD_3003]);
         
          
         
          
         
        
        
        
          // =================================================================================================================== 
        
          const [GD_3002, setGD_3002] = useState<string | null>(null);
          const [GD_3002_High, setGD_3002_High] = useState<number | null>(null);
          const [GD_3002_Low, setGD_3002_Low] = useState<number | null>(null);
          const [exceedThresholdGD_3002, setExceedThresholdGD_3002] = useState(false); 
          const [maintainGD_3002, setMaintainGD_3002] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_3002Value = parseFloat(GD_3002 as any);
              const highValue = GD_3002_High ?? NaN;
              const lowValue = GD_3002_Low ?? NaN;
         
              if (!isNaN(GD_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3002) {
                  setExceedThresholdGD_3002(GD_3002Value >= highValue || GD_3002Value <= lowValue);
              }
          }, [GD_3002, GD_3002_High, GD_3002_Low, maintainGD_3002]);
         
          
         
          
         
        
        
          // =================================================================================================================== 
        
          const [GD_3005, setGD_3005] = useState<string | null>(null);
          const [GD_3005_High, setGD_3005_High] = useState<number | null>(null);
          const [GD_3005_Low, setGD_3005_Low] = useState<number | null>(null);
          const [exceedThresholdGD_3005, setExceedThresholdGD_3005] = useState(false); 
          const [maintainGD_3005, setMaintainGD_3005] = useState<boolean>(false);
         
          useEffect(() => {
              const GD_3005Value = parseFloat(GD_3005 as any);
              const highValue = GD_3005_High ?? NaN;
              const lowValue = GD_3005_Low ?? NaN;
         
              if (!isNaN(GD_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3005) {
                  setExceedThresholdGD_3005(GD_3005Value >= highValue || GD_3005Value <= lowValue);
              }
          }, [GD_3005, GD_3005_High, GD_3005_Low, maintainGD_3005]);
         
        
        
          // =================================================================================================================== 
        
        // =================================================================================================================== 
        
        const [GD_3006, setGD_3006] = useState<string | null>(null);
        const [GD_3006_High, setGD_3006_High] = useState<number | null>(null);
        const [GD_3006_Low, setGD_3006_Low] = useState<number | null>(null);
        const [exceedThresholdGD_3006, setExceedThresholdGD_3006] = useState(false); 
        const [maintainGD_3006, setMaintainGD_3006] = useState<boolean>(false);
        
        useEffect(() => {
        const GD_3006Value = parseFloat(GD_3006 as any);
        const highValue = GD_3006_High ?? NaN;
        const lowValue = GD_3006_Low ?? NaN;
        
        if (!isNaN(GD_3006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3006) {
            setExceedThresholdGD_3006(GD_3006Value >= highValue || GD_3006Value <= lowValue);
        }
        }, [GD_3006, GD_3006_High, GD_3006_Low, maintainGD_3006]);
        
        
        
        
        
        
        // =================================================================================================================== 
        
        // =================================================================================================================== 
        
        const [TM_3002_SNG, setTM_3002_SNG] = useState<string | null>(null);
        const [TM_3002_SNG_High, setTM_3002_SNG_High] = useState<number | null>(null);
        const [TM_3002_SNG_Low, setTM_3002_SNG_Low] = useState<number | null>(null);
        const [exceedThresholdTM_3002_SNG, setExceedThresholdTM_3002_SNG] = useState(false); 
        const [maintainTM_3002_SNG, setMaintainTM_3002_SNG] = useState<boolean>(false);
        
        useEffect(() => {
            const TM_3002_SNGValue = parseFloat(TM_3002_SNG as any);
            const highValue = TM_3002_SNG_High ?? NaN;
            const lowValue = TM_3002_SNG_Low ?? NaN;
        
            if (!isNaN(TM_3002_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_3002_SNG) {
                setExceedThresholdTM_3002_SNG(TM_3002_SNGValue >= highValue || TM_3002_SNGValue <= lowValue);
            }
        }, [TM_3002_SNG, TM_3002_SNG_High, TM_3002_SNG_Low, maintainTM_3002_SNG]);
        
        
        
        
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
            const [TM_3003_SNG, setTM_3003_SNG] = useState<string | null>(null);
            const [TM_3003_SNG_High, setTM_3003_SNG_High] = useState<number | null>(null);
            const [TM_3003_SNG_Low, setTM_3003_SNG_Low] = useState<number | null>(null);
            const [exceedThresholdTM_3003_SNG, setExceedThresholdTM_3003_SNG] = useState(false); 
            const [maintainTM_3003_SNG, setMaintainTM_3003_SNG] = useState<boolean>(false);
           
            useEffect(() => {
                const TM_3003_SNGValue = parseFloat(TM_3003_SNG as any);
                const highValue = TM_3003_SNG_High ?? NaN;
                const lowValue = TM_3003_SNG_Low ?? NaN;
           
                if (!isNaN(TM_3003_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_3003_SNG) {
                    setExceedThresholdTM_3003_SNG(TM_3003_SNGValue >= highValue || TM_3003_SNGValue <= lowValue);
                }
            }, [TM_3003_SNG, TM_3003_SNG_High, TM_3003_SNG_Low, maintainTM_3003_SNG]);
           
            
           
            
        
        
        
        // =================================================================================================================== 
        
        
        const [TOTAL_SNG, setTOTAL_SNG] = useState<string | null>(null);
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
        
        
        
        // =================================================================================================================== 
        
        // =================================================================================================================== 
        
        const [SDV_3004, setSDV_3004] = useState<string | null>(null);
        const [SDV_3004_High, setSDV_3004_High] = useState<number | null>(null);
        const [SDV_3004_Low, setSDV_3004_Low] = useState<number | null>(null);
        const [exceedThresholdSDV_3004, setExceedThresholdSDV_3004] = useState(false); 
        const [maintainSDV_3004, setMaintainSDV_3004] = useState<boolean>(false);
        
        useEffect(() => {
            const SDV_3004Value = parseFloat(SDV_3004 as any);
            const highValue = SDV_3004_High ?? NaN;
            const lowValue = SDV_3004_Low ?? NaN;
        
            if (!isNaN(SDV_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3004) {
                setExceedThresholdSDV_3004(SDV_3004Value >= highValue || SDV_3004Value <= lowValue);
            }
        }, [SDV_3004, SDV_3004_High, SDV_3004_Low, maintainSDV_3004]);
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
        
        const [SDV_3003, setSDV_3003] = useState<string | null>(null);
        const [SDV_3003_High, setSDV_3003_High] = useState<number | null>(null);
        const [SDV_3003_Low, setSDV_3003_Low] = useState<number | null>(null);
        const [exceedThresholdSDV_3003, setExceedThresholdSDV_3003] = useState(false); 
        const [maintainSDV_3003, setMaintainSDV_3003] = useState<boolean>(false);
        
        useEffect(() => {
        const SDV_3003Value = parseFloat(SDV_3003 as any);
        const highValue = SDV_3003_High ?? NaN;
        const lowValue = SDV_3003_Low ?? NaN;
        
        if (!isNaN(SDV_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3003) {
        setExceedThresholdSDV_3003(SDV_3003Value >= highValue || SDV_3003Value <= lowValue);
        }
        }, [SDV_3003, SDV_3003_High, SDV_3003_Low, maintainSDV_3003]);
        
        
        
        // =================================================================================================================== 
        
        // =================================================================================================================== 
        
        const [GD1_STATUS, setGD1_STATUS] = useState<string | null>(null);
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
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
        
        // =================================================================================================================== 
        
        const [GD2_STATUS, setGD2_STATUS] = useState<string | null>(null);
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
        
        
        
        
        
        // =================================================================================================================== 
        
        
        const [GD3_STATUS, setGD3_STATUS] = useState<string | null>(null);
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
        
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
            const [GD4_STATUS, setGD4_STATUS] = useState<string | null>(null);
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
            
            
            
            
            
        
        
        
        // =================================================================================================================== 
        
        
            // =================================================================================================================== 
        
        
            const [GD5_STATUS, setGD5_STATUS] = useState<string | null>(null);
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
            
            
            
            
        
            
            
            // =================================================================================================================== 
        
            
        
            // =================================================================================================================== 
        
            const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
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
            
            
            
            
            
            
            
            
            
            // =================================================================================================================== 
            
        // =================================================================================================================== 
        
        const [ESD, setESD] = useState<string | null>(null);
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
        
        
        
        
        
        
        // =================================================================================================================== 
        const [VAPORIZER_1, setVAPORIZER_1] = useState<string | null>(null);
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
        
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
        
        const [VAPORIZER_2, setVAPORIZER_2] = useState<string | null>(null);
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
        
        
        
        
        
        
        
        
        // =================================================================================================================== 
        
        
        
        const [VAPORIZER_3, setVAPORIZER_3] = useState<string | null>(null);
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
        
        
        
        
        
        
        
        
           // =================================================================================================================== 
        
        
           const [VAPORIZER_4, setVAPORIZER_4] = useState<string | null>(null);
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
           
           
           
           
        
           
           // =================================================================================================================== 
        
           const [COOLING_V, setCOOLING_V] = useState<string | null>(null);
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
           
        
           
           // =================================================================================================================== 
        
        
           const [PERCENT_LPG, setPERCENT_LPG] = useState<any | null>(null);
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
           
           
           
           
        
    const DataLPG = (totalHeight * PERCENT_LPG) / 100;
        
           
           // =================================================================================================================== 
        
           const [FCV_3001, setFCV_3001] = useState<string | null>(null);
           const [FCV_3001_High, setFCV_3001_High] = useState<number | null>(null);
           const [FCV_3001_Low, setFCV_3001_Low] = useState<number | null>(null);
           const [exceedThresholdFCV_3001, setExceedThresholdFCV_3001] = useState(false); 
           const [maintainFCV_3001, setMaintainFCV_3001] = useState<boolean>(false);
           
           useEffect(() => {
               const FCV_3001Value = parseFloat(FCV_3001 as any);
               const highValue = FCV_3001_High ?? NaN;
               const lowValue = FCV_3001_Low ?? NaN;
           
               if (!isNaN(FCV_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFCV_3001) {
                   setExceedThresholdFCV_3001(FCV_3001Value >= highValue || FCV_3001Value <= lowValue);
               }
           }, [FCV_3001, FCV_3001_High, FCV_3001_Low, maintainFCV_3001]);
           
           
        
        
           // =================================================================================================================== 
        
           const [PERCENT_AIR, setPERCENT_AIR] = useState<any | null>(null);
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
    const DataAir = (totalHeight * PERCENT_AIR) / 100;
           
         
        
        
           // =================================================================================================================== 
           
        // =================================================================================================================== 
        
        const [HV_3001, setHV_3001] = useState<string | null>(null);
           const [HV_3001_High, setHV_3001_High] = useState<number | null>(null);
           const [HV_3001_Low, setHV_3001_Low] = useState<number | null>(null);
           const [exceedThresholdHV_3001, setExceedThresholdHV_3001] = useState(false); 
           const [maintainHV_3001, setMaintainHV_3001] = useState<boolean>(false);
           
           useEffect(() => {
               const HV_3001Value = parseFloat(HV_3001 as any);
               const highValue = HV_3001_High ?? NaN;
               const lowValue = HV_3001_Low ?? NaN;
           
               if (!isNaN(HV_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHV_3001) {
                   setExceedThresholdHV_3001(HV_3001Value >= highValue || HV_3001Value <= lowValue);
               }
           }, [HV_3001, HV_3001_High, HV_3001_Low, maintainHV_3001]);
           
        
        
        
        // =================================================================================================================== 
        
         // =================================================================================================================== 
        
         const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);
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
        
        
        
         // =================================================================================================================== 
         
             // =================================================================================================================== 
        
             const [TOTAL_CNG, setTOTAL_CNG] = useState<string | null>(null);
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
             
             
             
             
            
        // =================================================================================================================== 
        
        
        
        const [TM3002_CNG, setTM3002_CNG] = useState<string | null>(null);
        const [TM3002_CNG_High, setTM3002_CNG_High] = useState<number | null>(null);
        const [TM3002_CNG_Low, setTM3002_CNG_Low] = useState<number | null>(null);
        const [exceedThresholdTM3002_CNG, setExceedThresholdTM3002_CNG] = useState(false); 
        const [maintainTM3002_CNG, setMaintainTM3002_CNG] = useState<boolean>(false);
        
        useEffect(() => {
         const TM3002_CNGValue = parseFloat(TM3002_CNG as any);
         const highValue = TM3002_CNG_High ?? NaN;
         const lowValue = TM3002_CNG_Low ?? NaN;
        
         if (!isNaN(TM3002_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM3002_CNG) {
             setExceedThresholdTM3002_CNG(TM3002_CNGValue >= highValue || TM3002_CNGValue <= lowValue);
         }
        }, [TM3002_CNG, TM3002_CNG_High, TM3002_CNG_Low, maintainTM3002_CNG]);
        
        
        
        
        // =================================================================================================================== 
        
         // =================================================================================================================== 
        
         const [TM3003_CNG, setTM3003_CNG] = useState<string | null>(null);
         const [TM3003_CNG_High, setTM3003_CNG_High] = useState<number | null>(null);
         const [TM3003_CNG_Low, setTM3003_CNG_Low] = useState<number | null>(null);
         const [exceedThresholdTM3003_CNG, setExceedThresholdTM3003_CNG] = useState(false); 
         const [maintainTM3003_CNG, setMaintainTM3003_CNG] = useState<boolean>(false);
         
         useEffect(() => {
             const TM3003_CNGValue = parseFloat(TM3003_CNG as any);
             const highValue = TM3003_CNG_High ?? NaN;
             const lowValue = TM3003_CNG_Low ?? NaN;
         
             if (!isNaN(TM3003_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM3003_CNG) {
                 setExceedThresholdTM3003_CNG(TM3003_CNGValue >= highValue || TM3003_CNGValue <= lowValue);
             }
         }, [TM3003_CNG, TM3003_CNG_High, TM3003_CNG_Low, maintainTM3003_CNG]);
         
         
        
        
        // =================================================================================================================== 
        
        
        const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
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
        
        
        
        
        // =================================================================================================================== 
        
        
        
         // =================================================================================================================== 
        
        
        const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
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
        
        
         
         // =================================================================================================================== 
         
        
         
        
          // =================================================================================================================== 
        
        
          const [HR_BC, setHR_BC] = useState<string | null>(null);
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
          
          
        
         // =================================================================================================================== 
        
        
        
         const [SD, setSD] = useState<string | null>(null);
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
         
        
        
         // =================================================================================================================== 
        
         
        
         const [ESD_3001, setESD_3001] = useState<string | null>(null);
         const [ESD_3001_High, setESD_3001_High] = useState<number | null>(null);
         const [ESD_3001_Low, setESD_3001_Low] = useState<number | null>(null);
         const [exceedThresholdESD_3001, setExceedThresholdESD_3001] = useState(false); 
         const [maintainESD_3001, setMaintainESD_3001] = useState<boolean>(false);
         
         useEffect(() => {
             const ESD_3001Value = parseFloat(ESD_3001 as any);
             const highValue = ESD_3001_High ?? NaN;
             const lowValue = ESD_3001_Low ?? NaN;
         
             if (!isNaN(ESD_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD_3001) {
                 setExceedThresholdESD_3001(ESD_3001Value >= highValue || ESD_3001Value <= lowValue);
             }
         }, [ESD_3001, ESD_3001_High, ESD_3001_Low, maintainESD_3001]);
         
        
         
              // =================================================================================================================== 
              
             // =================================================================================================================== 
        
        
        
             const [WIS_Calorimeter, setWIS_Calorimeter] = useState<string | null>(null);
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
             
        
        
             // =================================================================================================================== 
                   // =================================================================================================================== 
        
        
        
             
                   const [CVS_Calorimeter, setCVS_Calorimeter] = useState<string | null>(null);
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
                   
                   
        
              
              
                   // =================================================================================================================== 
        
                   
        
        
                             // =================================================================================================================== 
        
        
                             const [SG_Calorimeter, setSG_Calorimeter] = useState<string | null>(null);
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
                             
           
                        
                        
                             // =================================================================================================================== 
        
        
        
                             
                   // =================================================================================================================== 
        
        
        
                 
                   const [TD_4072_Conn_STT, setTD_4072_Conn_STT] = useState<string | null>(null);
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
                   
                   
        
              
                   // =================================================================================================================== 
        
        
                   
        
                             // =================================================================================================================== 
        
        
                             const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
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
                             
                             
        
                        
                         
                         
                         
                         
                             // =================================================================================================================== 
   
                             const formatValue = (value:any) => {
                                return value !== null
                                    ? new Intl.NumberFormat('en-US', {
                                          maximumFractionDigits: 2,
                                          useGrouping: true, 
                                      }).format(parseFloat(value))
                                    : "";
                            };
                        
   
                             useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            // if (node.id === "timeUpdate3") {
            //     return {
            //         ...node,
            //         data: {
            //             ...node.data,
            //             label: (
            //                 <div
            //                     style={{
            //                         fontSize: 20,
            //                         fontWeight: 500,

            //                         display: "flex",
            //                     }}
            //                 >
            //                     <div>
            //                         <p
            //                             style={{
            //                                 color: "white",
            //                                 display: "flex",
            //                             }}
            //                         >
            //                             {" "}
            //                             PLC :{" "}
            //                         </p>
            //                     </div>

            //                     <div style={{}}>
            //                         <p style={{ marginLeft: 5 }}>
            //                             {PLC_STT == "1" ? (
            //                                 <span
            //                                     style={{
            //                                         color: "#25d125",
            //                                     }}
            //                                 >
            //                                     Connected
            //                                 </span>
            //                             ) : (
            //                                 <span
            //                                     style={{
            //                                         color: "#ff5656",
            //                                     }}
            //                                 >
            //                                     Disconnect
            //                                 </span>
            //                             )}
            //                         </p>
            //                     </div>
            //                     <div>
            //                         <p
            //                             style={{
            //                                 color: "white",

            //                                 fontSize: 20,
            //                                 marginLeft: 15,
            //                             }}
            //                         >
            //                             {PLC_STTValue}
            //                         </p>
            //                     </div>
            //                 </div>
            //             ),
            //         },
            //     };
            // }
            if (node.id === "PT_3005") {
              
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3005 &&
                                        !maintainPT_3005
                                            ? "#ff5656"
                                            : maintainPT_3005
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        PT-3005:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(PT_3005)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PT_3006") {
   

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3006 &&
                                        !maintainPT_3006
                                            ? "#ff5656"
                                            : maintainPT_3006
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        PT-3006:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(PT_3006)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_3002_SNG") {
        

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTM_3002_SNG &&
                                        !maintainTM_3002_SNG
                                            ? "#ff5656"
                                            : maintainTM_3002_SNG
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.TM_3002_SNG}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(TM_3002_SNG)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_3003_SNG") {
             

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTM_3003_SNG &&
                                        !maintainTM_3003_SNG
                                            ? "#ff5656"
                                            : maintainTM_3003_SNG
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        {ValueGas.TM_3003_SNG}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(TM_3003_SNG)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_3003") {
                const roundedPT02 =
                    TT_3003 !== null ? parseFloat(TT_3003).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTT_3003 &&
                                        !maintainTT_3003
                                            ? "#ff5656"
                                            : maintainTT_3003
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        TT-3003:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(TT_3003)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_3004") {
                const roundedPT02 =
                    TT_3004 !== null ? parseFloat(TT_3004).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTT_3004 &&
                                        !maintainTT_3004
                                            ? "#ff5656"
                                            : maintainTT_3004
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        TT-3004:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(TT_3003)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    °C
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV_3004 === "1"
                                    ? SVD_NO
                                    : SDV_3004 === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FCV_3001") {
                const roundedPT02 =
                    FCV_3001 !== null ? parseFloat(FCV_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFCV_3001 &&
                                        !maintainFCV_3001
                                            ? "#ff5656"
                                            : maintainFCV_3001
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        FCV-3001:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 5,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    %
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "WB_3001") {
                const roundedPT02 =
                    WB_3001 !== null ? parseFloat(WB_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdWB_3001 &&
                                        !maintainWB_3001
                                            ? "#ff5656"
                                            : maintainWB_3001
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        WB-3001:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(WB_3001)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    MJ/Sm³
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "TOTAL_VOLUME") {
                const roundedPT02 =
                    WB_Setpoint !== null
                        ? parseFloat(WB_Setpoint).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTOTAL_SNG &&
                                        !maintainTOTAL_SNG
                                            ? "#ff5656"
                                            : maintainTOTAL_SNG
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        TOTAL SNG
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 5,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(TOTAL_SNG)}
                                    </p>
                                    <p
                                        style={{
                                            color: colorNameValue,
                                            position: "relative",
                                        }}
                                    >
                                        {KeyGas.SM3}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "WB_Setpoint") {
                const roundedPT02 =
                    WB_Setpoint !== null
                        ? parseFloat(WB_Setpoint).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdWB_Setpoint &&
                                        !maintainWB_Setpoint
                                            ? "#ff5656"
                                            : maintainWB_Setpoint
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        SET POINT
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 5,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(WB_Setpoint)}
                                    </p>
                                    <p
                                        style={{
                                            color: colorNameValue,
                                            position: "relative",
                                        }}
                                    >
                                        MJ/Sm³
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "HV_3001") {
                const roundedPT02 =
                    HV_3001 !== null ? parseFloat(HV_3001).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdHV_3001 &&
                                        !maintainHV_3001
                                            ? "#ff5656"
                                            : maintainHV_3001
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        HV REAL
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 5,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(HV_3001)}
                                    </p>
                                    <p
                                        style={{
                                            color: colorNameValue,
                                            position: "relative",
                                        }}
                                    >
                                        MJ/Sm³
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "RATIO_MODE") {
                const roundedPT02 =
                    RATIO_MODE !== null
                        ? parseFloat(RATIO_MODE).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdRATIO_MODE &&
                                        !maintainRATIO_MODE
                                            ? "#ff5656"
                                            : maintainRATIO_MODE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        RATIO MODE
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",

                                        textAlign: "center",
                                        justifyContent: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    {RATIO_MODE === "0" ? (
                                        <div style={{ color: colorData }}>
                                            Manual
                                        </div>
                                    ) : (
                                        <div style={{ color: colorData }}>
                                            Auto
                                        </div>
                                    )}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FCV_MODE") {
                const roundedPT02 =
                    FCV_MODE !== null ? parseFloat(FCV_MODE).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFCV_MODE &&
                                        !maintainFCV_MODE
                                            ? "#ff5656"
                                            : maintainFCV_MODE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        FCV MODE
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",

                                        textAlign: "center",
                                        justifyContent: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    {FCV_MODE === "0" ? (
                                        <div style={{ color: colorData }}>
                                            Manual
                                        </div>
                                    ) : (
                                        <div style={{ color: colorData }}>
                                            Auto
                                        </div>
                                    )}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "timeUpdate3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 600,

                                    display: "flex",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        Gateway
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        PLC
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        :
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        :{" "}
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        <p style={{ marginLeft: 5 }}>
                                            {active === "true" ? (
                                                <span
                                                    style={{
                                                        color: "#25d125",
                                                    }}
                                                >
                                                    Online
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color: "#ff5656",
                                                    }}
                                                >
                                                    Offline
                                                </span>
                                            )}
                                        </p>
                                    </p>

                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_Conn_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        {PLC_STTValue}
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    ></p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "percent") {
                return {
                    ...node,

                    data: {
                        ...node.data,
                        label: (
                            <div
                                className="column-chart"
                                style={{
                                    height: `${totalHeight}px`,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    width: "120px",
                                    position: "relative",
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column-reverse",
                                    }}
                                    className="column"
                                >
                                    <div
                                        className="id"
                                        style={{
                                            height: `${DataLPG}px`,
                                            width: "100%",
                                            textAlign: "center",
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#ff7f00",
                                            position: "absolute",
                                            top: "0",
                                        }}
                                    ></div>
                                    <div
                                        className="name"
                                        style={{
                                            height: `${DataAir}px`,
                                            width: "100%",
                                            textAlign: "center",
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "blue",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "DATA_LPG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div style={{ fontSize: "25px", fontWeight: 600 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    LPG
                                </p>

                                <p>{PERCENT_LPG} %</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "DATA_AIR") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div style={{ fontSize: "25px", fontWeight: 600 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    AIR
                                </p>

                                <p>{PERCENT_AIR} %</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "AlarmCenter") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                // onClick={confirmLineDuty}
                            >
                                {alarmMessage && (
                                    <div className="alarm-message">
                                        {alarmMessage === "ALARM" ? (
                                            <span
                                                style={{
                                                    background: "red",
                                                    color: "white",
                                                    padding: "5px",
                                                    borderRadius: "3px",
                                                }}
                                            >
                                                {alarmMessage}
                                            </span>
                                        ) : alarmMessage === "Maintaining" ? (
                                            <span
                                                style={{
                                                    background: "orange",
                                                    color: "white",
                                                    padding: "5px",
                                                    borderRadius: "3px",
                                                }}
                                            >
                                                {alarmMessage}
                                            </span>
                                        ) : null}
                                    </div>
                                )}

                                {/* {alarmMessage} */}
                            </div>
                        ),
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);
    useEffect(() => {
        if (
            (exceedThresholdPT_3005 && !maintainPT_3005) ||
            (exceedThresholdPT_3006 && !maintainPT_3006) ||
            (exceedThresholdTT_3003 && !maintainTT_3003) ||
            (exceedThresholdTT_3004 && !maintainTT_3004) ||
            (exceedThresholdTG_3005 && !maintainTG_3005) ||
            (exceedThresholdWB_3001 && !maintainWB_3001) ||
            (exceedThresholdGD_3002 && !maintainGD_3002) ||
            (exceedThresholdGD_3003 && !maintainGD_3003) ||
            (exceedThresholdGD_3004 && !maintainGD_3004) ||
            (exceedThresholdGD_3005 && !maintainGD_3005) ||
            (exceedThresholdGD_3006 && !maintainGD_3006) ||
            (exceedThresholdTM_3002_SNG && !maintainTM_3002_SNG) ||
            (exceedThresholdTM_3003_SNG && !maintainTM_3003_SNG) ||
            (exceedThresholdTOTAL_SNG && !maintainTOTAL_SNG) ||
            (exceedThresholdSDV_3004 && !maintainSDV_3004) ||
            (exceedThresholdSDV_3003 && !maintainSDV_3003) ||
            (exceedThresholdGD1_STATUS && !maintainGD1_STATUS) ||
            (exceedThresholdGD2_STATUS && !maintainGD2_STATUS) ||
            (exceedThresholdGD3_STATUS && !maintainGD3_STATUS) ||
            (exceedThresholdGD4_STATUS && !maintainGD4_STATUS) ||
            (exceedThresholdGD5_STATUS && !maintainGD5_STATUS) ||
            (exceedThresholdESD && !maintainESD) ||
            (exceedThresholdHR_BC && !maintainHR_BC) ||
            (exceedThresholdSD && !maintainSD) ||
            (exceedThresholdVAPORIZER_1 && !maintainVAPORIZER_1) ||
            (exceedThresholdVAPORIZER_2 && !maintainVAPORIZER_2) ||
            (exceedThresholdVAPORIZER_3 && !maintainVAPORIZER_3) ||
            (exceedThresholdVAPORIZER_4 && !maintainVAPORIZER_4) ||
            (exceedThresholdCOOLING_V && !maintainCOOLING_V) ||
            (exceedThresholdFCV_3001 && !maintainFCV_3001) ||
            (exceedThresholdPERCENT_LPG && !maintainPERCENT_LPG) ||
            (exceedThresholdPERCENT_AIR && !maintainPERCENT_AIR) ||
            (exceedThresholdHV_3001 && !maintainHV_3001) ||
            (exceedThresholdRATIO_MODE && !maintainRATIO_MODE) ||
            (exceedThresholdFCV_MODE && !maintainFCV_MODE) ||
            (exceedThresholdTOTAL_CNG && !maintainTOTAL_CNG) ||
            (exceedThresholdTM3002_CNG && !maintainTM3002_CNG) ||
            (exceedThresholdTM3003_CNG && !maintainTM3003_CNG) ||
            (exceedThresholdWB_Setpoint && !maintainWB_Setpoint) ||
            (exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT) ||
            (exceedThresholdWIS_Calorimeter && !maintainWIS_Calorimeter) ||
            (exceedThresholdCVS_Calorimeter && !maintainCVS_Calorimeter) ||
            (exceedThresholdSG_Calorimeter && !maintainSG_Calorimeter) ||
            (exceedThresholdTD_4072_Conn_STT && !maintainTD_4072_Conn_STT)
        ) {
            setAlarmMessage("ALARM");
        } else if (
            maintainPT_3005 ||
            maintainPT_3006 ||
            maintainTT_3003 ||
            maintainTT_3004 ||
            maintainTG_3005 ||
            maintainWB_3001 ||
            maintainGD_3002 ||
            maintainGD_3003 ||
            maintainGD_3004 ||
            maintainGD_3005 ||
            maintainGD_3006 ||
            maintainTM_3002_SNG ||
            maintainTM_3003_SNG ||
            maintainTOTAL_SNG ||
            maintainSDV_3004 ||
            maintainSDV_3003 ||
            maintainGD1_STATUS ||
            maintainGD2_STATUS ||
            maintainGD3_STATUS ||
            maintainGD4_STATUS ||
            maintainGD5_STATUS ||
            maintainESD ||
            maintainHR_BC ||
            maintainSD ||
            maintainVAPORIZER_1 ||
            maintainVAPORIZER_2 ||
            maintainVAPORIZER_3 ||
            maintainVAPORIZER_4 ||
            maintainCOOLING_V ||
            maintainFCV_3001 ||
            maintainPERCENT_LPG ||
            maintainPERCENT_AIR ||
            maintainHV_3001 ||
            maintainRATIO_MODE ||
            maintainFCV_MODE ||
            maintainTOTAL_CNG ||
            maintainTM3002_CNG ||
            maintainTM3003_CNG ||
            maintainWB_Setpoint ||
            maintainPLC_Conn_STT ||
            maintainWIS_Calorimeter ||
            maintainCVS_Calorimeter ||
            maintainSG_Calorimeter ||
            maintainTD_4072_Conn_STT
        ) {
            setAlarmMessage("Maintaining");
        } else {
            setAlarmMessage(null);
        }
    }, [
        exceedThresholdPT_3005,
        exceedThresholdPT_3006,
        exceedThresholdTT_3003,
        exceedThresholdTT_3004,
        exceedThresholdTG_3005,
        exceedThresholdWB_3001,
        exceedThresholdGD_3002,
        exceedThresholdGD_3003,
        exceedThresholdGD_3004,
        exceedThresholdGD_3005,
        exceedThresholdGD_3006,
        exceedThresholdTM_3002_SNG,
        exceedThresholdTM_3003_SNG,
        exceedThresholdTOTAL_SNG,
        exceedThresholdSDV_3004,
        exceedThresholdSDV_3003,
        exceedThresholdGD1_STATUS,
        exceedThresholdGD2_STATUS,
        exceedThresholdGD3_STATUS,
        exceedThresholdGD4_STATUS,
        exceedThresholdGD5_STATUS,
        exceedThresholdESD,
        exceedThresholdHR_BC,
        exceedThresholdSD,
        exceedThresholdVAPORIZER_1,
        exceedThresholdVAPORIZER_2,
        exceedThresholdVAPORIZER_3,
        exceedThresholdVAPORIZER_4,
        exceedThresholdCOOLING_V,
        exceedThresholdFCV_3001,
        exceedThresholdPERCENT_LPG,
        exceedThresholdPERCENT_AIR,
        exceedThresholdHV_3001,
        exceedThresholdRATIO_MODE,
        exceedThresholdFCV_MODE,
        exceedThresholdTOTAL_CNG,
        exceedThresholdTM3002_CNG,
        exceedThresholdTM3003_CNG,
        exceedThresholdWB_Setpoint,
        exceedThresholdPLC_Conn_STT,
        exceedThresholdWIS_Calorimeter,
        exceedThresholdCVS_Calorimeter,
        exceedThresholdSG_Calorimeter,
        exceedThresholdTD_4072_Conn_STT,
        maintainPT_3005,
        maintainPT_3006,
        maintainTT_3003,
        maintainTT_3004,
        maintainTG_3005,
        maintainWB_3001,
        maintainGD_3002,
        maintainGD_3003,
        maintainGD_3004,
        maintainGD_3005,
        maintainGD_3006,
        maintainTM_3002_SNG,
        maintainTM_3003_SNG,
        maintainTOTAL_SNG,
        maintainSDV_3004,
        maintainSDV_3003,
        maintainGD1_STATUS,
        maintainGD2_STATUS,
        maintainGD3_STATUS,
        maintainGD4_STATUS,
        maintainGD5_STATUS,
        maintainESD,
        maintainHR_BC,
        maintainSD,
        maintainVAPORIZER_1,
        maintainVAPORIZER_2,
        maintainVAPORIZER_3,
        maintainVAPORIZER_4,
        maintainCOOLING_V,
        maintainFCV_3001,
        maintainPERCENT_LPG,
        maintainPERCENT_AIR,
        maintainHV_3001,
        maintainRATIO_MODE,
        maintainFCV_MODE,
        maintainTOTAL_CNG,
        maintainTM3002_CNG,
        maintainTM3003_CNG,
        maintainWB_Setpoint,
        maintainPLC_Conn_STT,
        maintainWIS_Calorimeter,
        maintainCVS_Calorimeter,
        maintainSG_Calorimeter,
        maintainTD_4072_Conn_STT
    ]);
    
    // const storedPositionString = localStorage.getItem("positionSNG_HUNGYEN");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
                const initialPositions = {
              AIR_INLET: { x: -2721.4692108086797, y: 2176.2834278407945 },
              AlarmCenter: { x: -800.5294119726459, y: 1246.647867192829 },
              Arrow1: { x: -1239.020658935167, y: 1537.2353073134132 },
              Arrow2: { x: -2475.0425893851816, y: 2163.170126568243 },
              Arrow3: { x: -2475.4133131231856, y: 1536.7414426555551 },
              Arrow4: { x: -1693.6503468684703, y: 2162.7842771612222 },
              Arrow5: { x: -1689.55458682678, y: 1537.1981899664577 },
              Arrow6: { x: -2155.232133118623, y: 2162.892754328932 },
              Arrow7: { x: -2152.4892809737867, y: 1536.548663065121 },
              Arrow8: { x: -1325.488619172965, y: 2162.3958068122806 },
              Arrow9: { x: -2482.2340390452687, y: 1869.0031042931803 },
              Arrow10: { x: -1142.531516958929, y: 1871.8272271253613 },
              Arrow11: { x: -972.1220766830197, y: 2014.4794086100776 },
              Arrow12: { x: -971.7810854275426, y: 1728.2651848777923 },
              BUFFER_TANK: { x: -1958.1757845426985, y: 1620.103924022733 },
              BUFFER_TANK_NAME: {
                  x: -1874.7436375336874,
                  y: 1617.0729924052746,
              },
              BallValue11: { x: -2562.687334970434, y: 1525.380959202904 },
              BallValue22: { x: -2568.3193414331317, y: 1857.5519670170406 },
              BallValue33: { x: -2565.343560648521, y: 2151.586409954696 },
              DATA_AIR: { x: -787.1794744946745, y: 2214.105613896207 },
              DATA_LPG: { x: -794.9699574379098, y: 1440.04907533999 },
              FCV_3001: { x: -1265.380278411609, y: 2033.0134255077428 },
              FCV_BOTTOM: { x: -1177.3958179076185, y: 2125.64217446725 },
              FCV_MODE: { x: -1132.3050547590105, y: 1256.5220916366088 },
              FCV_TOP: { x: -1308.5150887771715, y: 1507.9011102989418 },
              HV_3001: { x: -1962.3798384027098, y: 1257.7884339657485 },
              LPG_INLET: { x: -2718.540224197164, y: 1549.9092777776768 },
              LineTankLeft1: { x: -2526.8297727250642, y: 1895.1957023502964 },
              LineTankLeft2: { x: -1903.8600266450999, y: 1826.842413014107 },
              LineTankRight1: { x: -1611.644057434805, y: 1830.0526187533744 },
              LineTankRight2: { x: -920.551115995792, y: 1898.0333573875023 },
              MIXED_GAS_OUT: { x: -2723.1498211288877, y: 1860.5241143297756 },
              PCV_BOTTOM: { x: -1941.5006376772965, y: 2124.1143674165332 },
              PCV_TOP: { x: -1941.3905252439354, y: 1498.9109870766606 },
              PSV01: { x: -2524.555753361747, y: 1396.1332968176719 },
              PSV01_IMG: { x: -2438.813095850789, y: 1509.5596531094666 },
              PSV02: { x: -2520.3740303520035, y: 2026.2666342841972 },
              PSV02_IMG: { x: -2437.4724669071406, y: 2135.119959178102 },
              PTV_BOTTOM: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_BOTTOM_COL: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_TOP: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_TOP_COL: { x: -2434.736534286145, y: 2280.792696466395 },
              PT_3005: { x: -2471.664063337078, y: 2033.0814204854948 },
              PT_3006: { x: -2470.3667157991454, y: 1407.7312703661125 },
              PT_3006_BOTTOM: { x: -2357.4070589613248, y: 1480.1899240725122 },
              PT_3006_BOTTOM_COL: {
                  x: -2324.228242946996,
                  y: 2168.551405587348,
              },
              PT_3006_TOP: { x: -2356.699804151609, y: 2105.8388943507994 },
              PT_3006_TOP_COL: { x: -2324.8299824844635, y: 1543.359650359493 },
              RATIO_MODE: { x: -1410.6416464768204, y: 1256.368255138329 },
              SDV: { x: -1401.52488436053, y: 1832.5718544031654 },
              SDV_Name: { x: -1427.3255910567475, y: 1786.4718259796846 },

              TM_3002_SNG: { x: -2095.417756376634, y: 2033.3833726505547 },
              TM_3003_SNG: { x: -2095.502746920485, y: 1408.4757791779782 },
              TOTAL_VOLUME: { x: -1687.4440455409626, y: 1257.580931640653 },
              TT_3003: { x: -1637.8195582649814, y: 2033.1515562141199 },
              TT_3004: { x: -1637.7114602399151, y: 1408.0071147369952 },
              Temperature_BOTTOM: {
                  x: -1509.910977255419,
                  y: 2122.0227411020805,
              },
              Temperature_BOTTOM_COL: {
                  x: -1488.2351777921092,
                  y: 1543.7586670126352,
              },
              Temperature_TOP: { x: -1511.081132475102, y: 1494.4602818377164 },
              Temperature_TOP_COL: {
                  x: -1487.5658780437623,
                  y: 2171.0198173738618,
              },
              WB_3001: { x: -1919.4385466492083, y: 1728.2615884419017 },
              WB_Setpoint: { x: -2236.7052623296595, y: 1258.7416601549014 },
              borderWhite: { x: -2857.034393780186, y: 1153.4381617663353 },
              line1: { x: -2520.638664749054, y: 1563.7956401030622 },
              line2: { x: -945.3136370318025, y: 1897.7955179886687 },
              line3: { x: -2524.296141994977, y: 2189.2006419886534 },
              percent: { x: -802.620762343302, y: 1565.641363272772 },
              timeUpdate3: { x: -2820.484797907167, y: 1247.8726878582834 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================

        // ============================== line =========================================
        // {
        //     id: "timeUpdate3",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     display: "flex",
        //                     justifyContent: "space-between",
        //                     textAlign: "center",
        //                     alignItems: "center",
        //                 }}
        //             >
        //                 <div>
        //                     <p
        //                         style={{
        //                             fontSize: 60,
        //                             fontWeight: 500,
        //                             color: "#ffaa00",
        //                         }}
        //                     ></p>
        //                 </div>
        //             </div>
        //         ),
        //     },

        //     position: positions.timeUpdate3,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: 430,

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        {
            id: "Arrow4",
            position: positions.Arrow4,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow1",
            position: positions.Arrow1,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "Arrow2",
            position: positions.Arrow2,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow3",
            position: positions.Arrow3,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow5",
            position: positions.Arrow5,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow6",
            position: positions.Arrow6,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "Arrow7",
            position: positions.Arrow7,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow8",
            position: positions.Arrow8,
            type: "custom",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow9",
            position: positions.Arrow9,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow10",
            position: positions.Arrow10,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow11",
            position: positions.Arrow11,
            type: "custom",
            data: {
                label: <div>{arrowDown}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Arrow12",
            position: positions.Arrow12,
            type: "custom",
            data: {
                label: <div>{arrowUp}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        //==========================================================================

        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ==============================================================================

        // ================================================================================
        {
            id: "PCV_TOP",
            position: positions.PCV_TOP,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PCV_BOTTOM",
            position: positions.PCV_BOTTOM,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "FCV_BOTTOM",
            position: positions.FCV_BOTTOM,
            type: "custom",
            data: {
                label: <div> {FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "LineTankRight1",
            position: positions.LineTankRight1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "LineTankRight2",
            position: positions.LineTankRight2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "LineTankLeft1",
            position: positions.LineTankLeft1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "LineTankLeft2",
            position: positions.LineTankLeft2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "BUFFER_TANK",
            position: positions.BUFFER_TANK,
            type: "custom",
            data: {
                label: <div>{TankMeiko}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_3006_BOTTOM",
            position: positions.PT_3006_BOTTOM,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_3006_TOP",
            position: positions.PT_3006_TOP,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "PT_3006_BOTTOM_COL",
            position: positions.PT_3006_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 9999999,

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 30, background: "blue" },
        },

        {
            id: "PT_3006_TOP_COL",
            position: positions.PT_3006_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 9999999,
            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 0,
                height: 30,
                background: "#ff7f00",
            },
        },

        {
            id: "Temperature_TOP_COL",
            position: positions.Temperature_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 30, background: "blue" },
        },

        {
            id: "Temperature_BOTTOM_COL",
            position: positions.Temperature_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 0,
                height: 30,
                background: "#ff7f00",
            },
        },

        {
            id: "Temperature_TOP",
            position: positions.Temperature_TOP,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "Temperature_BOTTOM",
            position: positions.Temperature_BOTTOM,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "BUFFER_TANK_NAME",
            position: positions.BUFFER_TANK_NAME,
            type: "custom",
            data: {
                label: <div>BUFFER TANK </div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 250,
                height: 10,
                background: "none",
                fontSize: 30,
                fontWeight: 600,
                color: "white",
            },
        },

        {
            id: "BallValue11",
            position: positions.BallValue11,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue01 />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: background,

                background: background,
                width: 10,
                height: 20,
            },
            zIndex: 99999,
        },
        {
            id: "BallValue22",
            position: positions.BallValue22,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue02 />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: background,

                background: background,
                width: 10,
                height: 20,
            },
            zIndex: 99999,
        },
        {
            id: "BallValue33",
            position: positions.BallValue33,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue03 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,

                background: background,
                width: 1,
                height: 1,
            },
        },

        {
            id: "PT_3005",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PT_3005,

            style: {
                border: background,
                width: 320,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "PT_3006",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PT_3006,

            style: {
                border: background,
                width: 320,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TM_3002_SNG",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TM_3002_SNG,

            style: {
                border: background,
                width: 400,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TM_3003_SNG",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TM_3003_SNG,

            style: {
                border: background,
                width: 400,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TT_3004",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TT_3004,

            style: {
                border: background,
                width: 320,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TT_3003",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TT_3003,

            style: {
                border: background,
                width: 320,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "FCV_3001",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.FCV_3001,

            style: {
                border: background,
                width: 280,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "WB_3001",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.WB_3001,
            zIndex: 999999,
            style: {
                border: background,
                width: 350,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "SDV_Name",
            position: positions.SDV_Name,
            type: "custom",
            data: {
                label: <div>SDV-3004</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,
                border:'none',
                color:'white',
                background: "green",
                borderRadius: 5,
            },
        },

        {
            id: "LPG_INLET",
            position: positions.LPG_INLET,
            type: "custom",
            data: {
                label: <div>LPG INLET</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,
                color: "white",
                background: "green",
                borderRadius: 5,
                border: "none",
            },
        },

        {
            id: "MIXED_GAS_OUT",
            position: positions.MIXED_GAS_OUT,
            type: "custom",
            data: {
                label: <div>MIXED GAS OUT</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,
                color: "white",
                background: "green",
                borderRadius: 5,
                border: "none",
            },
        },

        {
            id: "AIR_INLET",
            position: positions.AIR_INLET,
            type: "custom",
            data: {
                label: <div>AIR INLET</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,
                color: "white",
                background: "green",
                borderRadius: 5,
                border: "none",
            },
        },

        {
            id: "SDV",
            position: positions.SDV,
            type: "custom",
            data: {
                label: <div>111</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        // {
        //     id: "PSV01",
        //     position: positions.PSV01,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div style={{ display: "flex", marginTop: 5 }}>
        //                 <PSV01 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Bottom,
        //     style: {
        //         border: background,
        //         width: 260,
        //         background: borderBox,
        //         // Thêm box shadow với màu (0, 255, 255)
        //     },
        // },

        // {
        //     id: "PSV02",
        //     position: positions.PSV02,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div style={{ display: "flex", marginTop: 5 }}>
        //                 <PSV02 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Bottom,
        //     style: {
        //         border: background,
        //         width: 260,
        //         background: borderBox,
        //         // Thêm box shadow với màu (0, 255, 255)
        //     },
        // },

        // {
        //     id: "PSV01_IMG",
        //     position: positions.PSV01_IMG,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div>
        //                 <Image
        //                     src="/layout/imgGraphic/PVC.png"
        //                     width={70}
        //                     height={70}
        //                     alt="Picture of the author"
        //                 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: { border: "none", width: 0, height: 10, background: "none" },
        // },

        // {
        //     id: "PSV02_IMG",
        //     position: positions.PSV02_IMG,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div>
        //                 <Image
        //                     src="/layout/imgGraphic/PVC.png"
        //                     width={70}
        //                     height={70}
        //                     alt="Picture of the author"
        //                 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: { border: "none", width: 0, height: 10, background: "none" },
        // },

        {
            id: "WB_Setpoint",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.WB_Setpoint,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "HV_3001",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.HV_3001,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "RATIO_MODE",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.RATIO_MODE,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "FCV_MODE",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.FCV_MODE,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "TOTAL_VOLUME",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        TOTAL SNG
                        <div style={{ marginTop: 10 }}></div>
                    </div>
                ),
            },
            position: positions.TOTAL_VOLUME,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "borderWhite",
            data: {
                label: (
                    <div
                        style={{
                            color: line,
                            fontSize: 50,
                            fontWeight: 600,
                        }}
                    >
                        SNG HUNG YEN
                    </div>
                ),
            },
            position: positions.borderWhite,

            style: {
                background: background,
                border: "1px solid white",
                width: 600,
                height: 220,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "timeUpdate3",
            data: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: 60,
                                    fontWeight: 500,
                                    color: "#ffaa00",
                                }}
                            ></p>
                        </div>
                    </div>
                ),
            },

            position: positions.timeUpdate3,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: 550,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "percent",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.percent,

            style: {
                background: "none",
                border: "none",
                width: 0,
                height: 0,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "DATA_LPG",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        LPG
                    </div>
                ),
            },
            position: positions.DATA_LPG,

            style: {
                background: borderBox,
                border: borderBox,
                width: 120,
                height: 120,
                borderRadius: 100,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "DATA_AIR",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        AIR
                    </div>
                ),
            },
            position: positions.DATA_AIR,

            style: {
                background: borderBox,
                border: borderBox,
                width: 120,
                height: 120,
                borderRadius: 100,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                background: backgroundGraphic,
                border: "none",
                width: 0,
                borderRadius: 5,
            },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);

    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );

                if (id === "Arrow1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow1: position,
                    }));
                } else if (id === "Arrow2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow2: position,
                    }));
                } else if (id === "Arrow3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow3: position,
                    }));
                } else if (id === "Arrow4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow4: position,
                    }));
                } else if (id === "Arrow8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow8: position,
                    }));
                } else if (id === "Arrow5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow5: position,
                    }));
                } else if (id === "Arrow6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow6: position,
                    }));
                } else if (id === "Arrow7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow7: position,
                    }));
                } else if (id === "Arrow9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow9: position,
                    }));
                } else if (id === "Arrow10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow10: position,
                    }));
                } else if (id === "Arrow11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow11: position,
                    }));
                } else if (id === "Arrow12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Arrow12: position,
                    }));
                } else if (id === "line1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line1: position,
                    }));
                } else if (id === "line2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line2: position,
                    }));
                } else if (id === "line3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line3: position,
                    }));
                } else if (id === "BUFFER_TANK") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BUFFER_TANK: position,
                    }));
                } else if (id === "LineTankLeft1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankLeft1: position,
                    }));
                } else if (id === "LineTankLeft2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankLeft2: position,
                    }));
                } else if (id === "LineTankRight1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankRight1: position,
                    }));
                } else if (id === "LineTankRight2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineTankRight2: position,
                    }));
                } else if (id === "BUFFER_TANK_NAME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BUFFER_TANK_NAME: position,
                    }));
                } else if (id === "PT_3006_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3006_BOTTOM: position,
                    }));
                } else if (id === "PT_3006_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3006_TOP: position,
                    }));
                } else if (id === "PT_3006_BOTTOM_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3006_BOTTOM_COL: position,
                    }));
                } else if (id === "PT_3006_TOP_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3006_TOP_COL: position,
                    }));
                } else if (id === "Temperature_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_TOP: position,
                    }));
                } else if (id === "Temperature_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_BOTTOM: position,
                    }));
                } else if (id === "Temperature_TOP_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_TOP_COL: position,
                    }));
                } else if (id === "Temperature_BOTTOM_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_BOTTOM_COL: position,
                    }));
                } else if (id === "PCV_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_TOP: position,
                    }));
                } else if (id === "PCV_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_BOTTOM: position,
                    }));
                } else if (id === "FCV_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_TOP: position,
                    }));
                } else if (id === "FCV_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_BOTTOM: position,
                    }));
                } else if (id === "BallValue11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue11: position,
                    }));
                } else if (id === "BallValue22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue22: position,
                    }));
                } else if (id === "BallValue33") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue33: position,
                    }));
                } else if (id === "PT_3005") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3005: position,
                    }));
                } else if (id === "PT_3006") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_3006: position,
                    }));
                } else if (id === "TM_3002_SNG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM_3002_SNG: position,
                    }));
                } else if (id === "TM_3003_SNG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TM_3003_SNG: position,
                    }));
                } else if (id === "TT_3003") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3003: position,
                    }));
                } else if (id === "TT_3004") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_3004: position,
                    }));
                } else if (id === "FCV_3001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_3001: position,
                    }));
                } else if (id === "SDV_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Name: position,
                    }));
                } else if (id === "SDV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV: position,
                    }));
                } else if (id === "WB_3001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        WB_3001: position,
                    }));
                } else if (id === "PSV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01: position,
                    }));
                } else if (id === "PSV02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV02: position,
                    }));
                } else if (id === "PSV01_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01_IMG: position,
                    }));
                } else if (id === "PSV02_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV02_IMG: position,
                    }));
                } else if (id === "WB_Setpoint") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        WB_Setpoint: position,
                    }));
                } else if (id === "HV_3001") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        HV_3001: position,
                    }));
                } else if (id === "RATIO_MODE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        RATIO_MODE: position,
                    }));
                } else if (id === "TOTAL_VOLUME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TOTAL_VOLUME: position,
                    }));
                } else if (id === "FCV_MODE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FCV_MODE: position,
                    }));
                } else if (id === "LPG_INLET") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LPG_INLET: position,
                    }));
                } else if (id === "MIXED_GAS_OUT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        MIXED_GAS_OUT: position,
                    }));
                } else if (id === "AIR_INLET") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AIR_INLET: position,
                    }));
                } else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                }
                //========================== pt line 1 =========================
                else if (id === "percent") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        percent: position,
                    }));
                } else if (id === "DATA_LPG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        DATA_LPG: position,
                    }));
                } else if (id === "DATA_AIR") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        DATA_AIR: position,
                    }));
                } else if (id === "AlarmCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AlarmCenter: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );
    // const toggleEditing = () => {
    //     setEditingEnabled(!editingEnabled);
    // };

    // useEffect(() => {
    //     localStorage.setItem("positionSNG_HUNGYEN", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
            <div

            key={resetKey}
                style={{
                    // width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                    background: background,
                }}
            >
                {/* {!editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.02)",

                            zIndex: 999,
                            opacity: 0.2,
                        }}
                    ></div>
                )}

                {editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    ></div>
                )} */}

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // onNodeDragStop={onNodeDragStop}
                    nodesDraggable={false} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.3}
                    maxZoom={3}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
1;
