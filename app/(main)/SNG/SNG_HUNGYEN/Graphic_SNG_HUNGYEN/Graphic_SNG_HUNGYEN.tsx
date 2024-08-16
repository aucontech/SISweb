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
import "./ForCssGraphic.css"

import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { id_SNG_HungYen } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";
import { BlackTriangleRight } from "@/app/(main)/PRU/GraphicPRU/iconSVG";
import AlarmMeiko from "@/layout/AlarmBell/AlarmMeiko";
import BallValue01 from "../BallValueSNG_HUNGYEN/BallValue01";
import BallValue02 from "../BallValueSNG_HUNGYEN/BallValue02";
import BallValue03 from "../BallValueSNG_HUNGYEN/BallValue03";
import PSV01 from "../BallValueSNG_HUNGYEN/PSV01";
import PSV02 from "../BallValueSNG_HUNGYEN/PSV02";
import AlarmSNG_HUNGYEN from "@/layout/AlarmBell/AlarmSNG_HUNGYEN";
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
const background = "#036E9B";
export const colorNameValue = "black";
export const colorData = "green";
export const borderBox = "#aad4ff";

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

    const toast = useRef<Toast>(null);
 

    const [SDV, setSDV] = useState<string | null>(null);


 
    const [PLC_STT, setPLC_STT] = useState<string | null>(null);

    const [PLC_STTValue, setPLC_STTValue] = useState<any>();
    const [active, setActive] = useState();
    const [LPG, setLPG] = useState<any>();
    const [AIR, setAIR] = useState<any>();

    const totalHeight = 620;
    const totalWidth = 50;

    const DataLPG = (totalHeight * LPG) / 100;
    const DataAir = (totalHeight * AIR) / 100;
    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_SNG_HungYen,
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
                                key: "active",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_SNG_HungYen,
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
                                key: "active",
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
            ws.current.onmessage = (event) => {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        PT_3005: setPT_3005,
                        PT_3006: setPT_3006,
                        TM_3002_SNG: setTM_3002_SNG,
                        TM_3003_SNG: setTM_3003_SNG,
                        TT_3003: setTT_3003,
                        TT_3004: setTT_3004,

                        FCV_3001: setFCV_3001,

                        SDV_3004: setSDV,

                        WB_3001: setWB_3001,

                        WB_Setpoint: setWB_Setpoint,
                        HV_3001: setHV_3001,

                        RATIO_MODE: setRATIO_MODE,
                        FCV_MODE: setFCV_MODE,

                        TOTAL_SNG: setTOTAL_SNG,
                        PLC_Conn_STT: setPLC_STT,

                        PERCENT_AIR: setAIR,
                        PERCENT_LPG: setLPG,
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
    }, [data]);

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

            const PT_3005_High = res.data.find(
                (item: any) => item.key === "PT_3005_High"
            );
            setPT_3005_High(PT_3005_High?.value || null);
            const PT_3005_Low = res.data.find(
                (item: any) => item.key === "PT_3005_Low"
            );
            setPT_3005_Low(PT_3005_Low?.value || null);

            const maintainPT_3005 = res.data.find(
                (item: any) => item.key === "PT_3005_Maintain"
            );
            setMaintainPT_3005(maintainPT_3005?.value || false);
            //===========================================================================================

            const PT_3006_High = res.data.find(
                (item: any) => item.key === "PT_3006_High"
            );
            setPT_3006_High(PT_3006_High?.value || null);
            const PT_3006_Low = res.data.find(
                (item: any) => item.key === "PT_3006_Low"
            );
            setPT_3006_Low(PT_3006_Low?.value || null);

            const MaintainPT_3006 = res.data.find(
                (item: any) => item.key === "PT_3006_Maintain"
            );
            setMaintainPT_3006(MaintainPT_3006?.value || false);
            //===========================================================================================

            const HighTM_3002_SNG = res.data.find(
                (item: any) => item.key === "TM_3002_SNG_High"
            );
            setTM_3002_SNG_High(HighTM_3002_SNG?.value || null);
            const LowTM_3002_SNG = res.data.find(
                (item: any) => item.key === "TM_3002_SNG_Low"
            );
            setTM_3002_SNG_Low(LowTM_3002_SNG?.value || null);

            const TM_3002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3002_SNG_Maintain"
            );
            setMaintainTM_3002_SNG(TM_3002_SNG_Maintain?.value || false);

            //===========================================================================================

            const HighTM_3003_SNG = res.data.find(
                (item: any) => item.key === "TM_3003_SNG_High"
            );
            setTM_3003_SNG_High(HighTM_3003_SNG?.value || null);

            const LowTM_3003_SNG = res.data.find(
                (item: any) => item.key === "TM_3003_SNG_Low"
            );
            setTM_3003_SNG_Low(LowTM_3003_SNG?.value || null);

            const TM_3003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3003_SNG_Maintain"
            );
            setMaintainTM_3003_SNG(TM_3003_SNG_Maintain?.value || false);
            //===========================================================================================

            const TT_3003_High = res.data.find(
                (item: any) => item.key === "TT_3003_High"
            );
            setTT_3003_High(TT_3003_High?.value || null);

            const LowTT_3003 = res.data.find(
                (item: any) => item.key === "TT_3003_Low"
            );
            setTT_3003_Low(LowTT_3003?.value || null);

            const TT_3003_Maintain = res.data.find(
                (item: any) => item.key === "TT_3003_Maintain"
            );
            setMaintainTT_3003(TT_3003_Maintain?.value || false);

            //===========================================================================================

            const TT_3004_High = res.data.find(
                (item: any) => item.key === "TT_3004_High"
            );
            setTT_3004_High(TT_3004_High?.value || null);
            const TT_3004_Low = res.data.find(
                (item: any) => item.key === "TT_3004_Low"
            );
            setTT_3004_Low(TT_3004_Low?.value || null);

            const MaintainTT_3004 = res.data.find(
                (item: any) => item.key === "TT_3004_Maintain"
            );
            setMaintainTT_3004(MaintainTT_3004?.value || false);
            //===========================================================================================

            const HighFCV_3001 = res.data.find(
                (item: any) => item.key === "FCV_3001_High"
            );
            setFCV_3001_High(HighFCV_3001?.value || null);
            const LowFCV_3001 = res.data.find(
                (item: any) => item.key === "FCV_3001_Low"
            );
            setFCV_3001_Low(LowFCV_3001?.value || null);

            const MaintainFCV_3001 = res.data.find(
                (item: any) => item.key === "FCV_3001_Maintain"
            );
            setMaintainFCV_3001(MaintainFCV_3001?.value || false);
            //===========================================================================================

            const HighWB_3001 = res.data.find(
                (item: any) => item.key === "WB_3001_High"
            );
            setWB_3001_High(HighWB_3001?.value || null);
            const LowWB_3001 = res.data.find(
                (item: any) => item.key === "WB_3001_Low"
            );
            setWB_3001_Low(LowWB_3001?.value || null);

            const MaintainWB_3001 = res.data.find(
                (item: any) => item.key === "WB_3001_Maintain"
            );
            setMaintainWB_3001(MaintainWB_3001?.value || false);
            //===========================================================================================
            const HighWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_High"
            );
            setWB_Setpoint_High(HighWB_Setpoint?.value || null);
            const LowWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Low"
            );
            setWB_Setpoint_Low(LowWB_Setpoint?.value || null);

            const MaintainWB_Setpoint = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );
            setMaintainWB_Setpoint(MaintainWB_Setpoint?.value || false);
            //===========================================================================================

            const HighHV_3001 = res.data.find(
                (item: any) => item.key === "HV_3001_High"
            );
            setHV_3001_High(HighHV_3001?.value || null);
            const LowHV_3001 = res.data.find(
                (item: any) => item.key === "HV_3001_Low"
            );
            setHV_3001_Low(LowHV_3001?.value || null);

            const MaintainHV_3001 = res.data.find(
                (item: any) => item.key === "HV_3001_Maintain"
            );
            setMaintainHV_3001(MaintainHV_3001?.value || false);
            //===========================================================================================

            const HighRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_High"
            );
            setRATIO_MODE_High(HighRATIO_MODE?.value || null);
            const LowRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Low"
            );
            setRATIO_MODE_Low(LowRATIO_MODE?.value || null);

            const MaintainRATIO_MODE = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Maintain"
            );
            setMaintainRATIO_MODE(MaintainRATIO_MODE?.value || false);
            //===========================================================================================

            const HighFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_High"
            );
            setFCV_MODE_High(HighFCV_MODE?.value || null);
            const LowFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_Low"
            );
            setFCV_MODE_Low(LowFCV_MODE?.value || null);

            const MaintainFCV_MODE = res.data.find(
                (item: any) => item.key === "FCV_MODE_Maintain"
            );
            setMaintainFCV_MODE(MaintainFCV_MODE?.value || false);



            //===========================================================================================

   const HighTOTAL_SNG = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_High"
            );
            setTOTAL_SNG_High(HighTOTAL_SNG?.value || null);
            const LowTOTAL_SNG = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Low"
            );
            setTOTAL_SNG_Low(LowTOTAL_SNG?.value || null);

            const MaintainTOTAL_SNG = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Maintain"
            );
            setMaintainTOTAL_SNG(MaintainTOTAL_SNG?.value || false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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

    //======================================================================================


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
        //================================ TT_3003================================


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
        

    //================================ Flow_Meter_Total ======================================================


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
    
    
     //======================================================================================


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
   
    
   


    //================================ TT_3004======================================================
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
    
    //================================ FCV_3001======================================================

    //================================ WB_3001================================
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
   
    
   

    //================================ WB_3001 ======================================================


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

    //================================ WB_Setpoint======================================================
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
    

    //================================ HV_3001======================================================
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
    

    //================================ RATIO_MODE======================================================

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



    
   
    //================================ FCV_MODE======================================================


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



    
   
    //================================ FCV_MODE======================================================
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
                const roundedPT02 =
                    PT_3005 !== null ? parseFloat(PT_3005).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3005 && !maintainPT_3005
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
                                        PT-3005 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PT_3006") {
                const roundedPT02 =
                    PT_3006 !== null ? parseFloat(PT_3006).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_3006 && !maintainPT_3006
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
                                        PT-3006 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_3002_SNG") {
                const roundedPT02 =
                    TM_3002_SNG !== null
                        ? parseFloat(TM_3002_SNG).toFixed(2)
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
                                    fontSize: 20,
                                    fontWeight: 500,
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
                                        {ValueGas.TM_3002_SNG} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TM_3003_SNG") {
                const roundedPT02 =
                    TM_3003_SNG !== null
                        ? parseFloat(TM_3003_SNG).toFixed(2)
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
                                    fontSize: 20,
                                    fontWeight: 500,
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
                                        {ValueGas.TM_3003_SNG} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTT_3003 && !maintainTT_3003
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
                                        TT-3003 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTT_3004 && !maintainTT_3004
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
                                        TT-3004 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                {SDV === "1"
                                    ? SVD_NO
                                    : SDV === "0"
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFCV_3001 && !maintainFCV_3001
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
                                        FCV-3001 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdWB_3001 && !maintainWB_3001
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
                                        WB-3001 :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
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
                                    fontSize: 20,
                                    fontWeight: 500,
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
                                    {TOTAL_SNG}

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
                                    fontSize: 20,
                                    fontWeight: 500,
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
                                        {roundedPT02}
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdHV_3001 && !maintainHV_3001
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
                                        {roundedPT02}
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
                                    fontSize: 20,
                                    fontWeight: 500,
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
                                    fontSize: 20,
                                    fontWeight: 500,
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFCV_MODE && !maintainFCV_MODE
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
                                    fontSize: 18,
                                    fontWeight: 500,

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
                                        {" "}
                                        Gateway :{" "}
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        PLC :{" "}
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
                                                    Active
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color: "#ff5656",
                                                    }}
                                                >
                                                    Un Active
                                                </span>
                                            )}
                                        </p>
                                    </p>

                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_STT === "1" ? (
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
                                            color: background,

                                            fontSize: 18,
                                            marginLeft: 15,
                                        }}
                                    >
                                        null
                                    </p>

                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 18,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {PLC_STTValue}
                                    </p>
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
                            <div style={{ fontSize: "23px", fontWeight: 500 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    LPG
                                </p>

                                <p>{LPG} %</p>
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
                            <div style={{ fontSize: "23px", fontWeight: 500 }}>
                                <p
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    AIR
                                </p>

                                <p>{AIR} %</p>
                            </div>
                        ),
                    },
                };
            }

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionMEIKO");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
              AIR_INLET: { x: -2721.4692108086797, y: 2178.2907767624192 },
              Arrow1: { x: -1239.020658935167, y: 1537.2353073134132 },
              Arrow2: { x: -2246.4848054605154, y: 2163.170126568243 },
              Arrow3: { x: -2248.2397512254984, y: 1536.7414426555551 },
              Arrow4: { x: -1557.0888105506951, y: 2163.558085755739 },
              Arrow5: { x: -1566.4728623125252, y: 1536.6111860122028 },
              Arrow6: { x: -1991.4757732732585, y: 2163.2121664995484 },
              Arrow7: { x: -1984.5166487488032, y: 1536.691171840094 },
              Arrow8: { x: -1255.0116069020437, y: 2163.3701843909553 },
              Arrow9: { x: -2342.972586495079, y: 1868.4236338489889 },
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
              FCV_3001: { x: -1254.3812438605855, y: 2023.7863110251546 },
              FCV_BOTTOM: { x: -1168.803254788462, y: 2125.64217446725 },
              FCV_MODE: { x: -1132.3050547590105, y: 1256.5220916366088 },
              FCV_TOP: { x: -1308.5150887771715, y: 1507.9011102989418 },
              HV_3001: { x: -1962.3798384027098, y: 1257.7884339657485 },
              LPG_INLET: { x: -2719.878456811581, y: 1551.2475103920935 },
              LineTankLeft1: { x: -2526.8297727250642, y: 1895.1957023502964 },
              LineTankLeft2: { x: -1903.8600266450999, y: 1826.842413014107 },
              LineTankRight1: { x: -1611.644057434805, y: 1830.0526187533744 },
              LineTankRight2: { x: -920.551115995792, y: 1898.0333573875023 },
              MIXED_GAS_OUT: { x: -2723.1498211288877, y: 1866.5461610946509 },
              PCV_BOTTOM: { x: -1805.6040907182978, y: 2124.1143674165332 },
              PCV_TOP: { x: -1805.969879472551, y: 1499.8300133358384 },
              PSV01: { x: -2524.555753361747, y: 1396.1332968176719 },
              PSV01_IMG: { x: -2438.813095850789, y: 1509.5596531094666 },
              PSV02: { x: -2520.3740303520035, y: 2026.2666342841972 },
              PSV02_IMG: { x: -2437.4724669071406, y: 2135.119959178102 },
              PTV_BOTTOM: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_BOTTOM_COL: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_TOP: { x: -2434.736534286145, y: 2280.792696466395 },
              PTV_TOP_COL: { x: -2434.736534286145, y: 2280.792696466395 },
              PT_3005: { x: -2235.931274709016, y: 1396.3343394173278 },
              PT_3006: { x: -2231.444162009503, y: 2025.8739669330853 },
              PT_3006_BOTTOM: { x: -2151.853482122052, y: 1462.0794767738978 },
              PT_3006_BOTTOM_COL: {
                  x: -2112.3024448062247,
                  y: 2150.519770963608,
              },
              PT_3006_TOP: { x: -2144.4698414713403, y: 2088.5281306737793 },
              PT_3006_TOP_COL: {
                  x: -2119.2764056451915,
                  y: 1524.7964418784134,
              },
              RATIO_MODE: { x: -1410.6416464768204, y: 1256.368255138329 },
              SDV: { x: -1401.52488436053, y: 1832.5718544031654 },
              SDV_Name: { x: -1425.5257248610396, y: 1798.1112206166258 },
              TM_3002_SNG: { x: -1888.131178519121, y: 1398.176397881909 },
              TM_3003_SNG: { x: -1888.6614296514017, y: 2024.619337816509 },
              TOTAL_VOLUME: { x: -1687.4440455409626, y: 1257.580931640653 },
              TT_3003: { x: -1552.7725000031662, y: 1397.4615647145274 },
              TT_3004: { x: -1562.9435099464908, y: 2023.3170986034156 },
              Temperature_BOTTOM: {
                  x: -1450.8321181787871,
                  y: 2103.867900090218,
              },
              Temperature_BOTTOM_COL: {
                  x: -1421.4588626631796,
                  y: 1524.090167367983,
              },
              Temperature_TOP: {
                  x: -1444.3531433973876,
                  y: 1473.6968496650152,
              },
              Temperature_TOP_COL: {
                  x: -1428.5197678449044,
                  y: 2154.1174370168173,
              },
              WB_3001: { x: -1896.9232355027152, y: 1735.774769535127 },
              WB_Setpoint: { x: -2236.7052623296595, y: 1258.7416601549014 },
              borderWhite: { x: -2857.034393780186, y: 1153.4381617663353 },
              line1: { x: -2520.638664749054, y: 1563.7956401030622 },
              line2: { x: -945.3136370318025, y: 1897.7955179886687 },
              line3: { x: -2524.296141994977, y: 2189.2006419886534 },
              percent: { x: -802.620762343302, y: 1565.641363272772 },
              timeUpdate3: { x: -2820.484797907167, y: 1247.8726878582834 },

        AlarmCenter: {x: -800.5294119726459, y: 1246.647867192829},

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
            zIndex:9999999,

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 50, background: "blue" },
        },

        {
            id: "PT_3006_TOP_COL",
            position: positions.PT_3006_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },
zIndex:9999999,
            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 0,
                height: 50,
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
            style: { border: "none", width: 0, height: 50, background: "blue" },
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
                height: 50,
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
                width: 270,

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
                width: 270,

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
                width: 270,

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
                width: 270,

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
                width: 270,

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
                width: 270,

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
                width: 270,

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
zIndex:999999,
            style: {
                border: background,
                width: 300,

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
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "white",
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
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
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
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
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
                fontSize: 20,
                fontWeight: 500,
                padding: 5,

                background: "white",
                borderRadius: 5,
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
                height: 103,

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
                width: 500,
                height: 200,
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
                width: 430,

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
                        <AlarmSNG_HUNGYEN />
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
    //     localStorage.setItem("positionMEIKO", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
            <div
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
                    minZoom={0.5}
                    maxZoom={2}
                >
                    <Controls style={{ position: "absolute", top: 0 }} />

                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
1;
