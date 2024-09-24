import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./demoFlowOTS.css";
// import tingting from "./NotificationCuu.mp3";

import Image from "next/image";
import BallValue01 from "../ReactFlow/BallValue01";
import BallValue02 from "../ReactFlow/BallValue02";
import BallValue03 from "../ReactFlow/BallValue03";
import BallValue04 from "../ReactFlow/BallValue04";
import BallValue05 from "../ReactFlow/BallValue05";
import BallValue06 from "../ReactFlow/BallValue06";
import BallValue07 from "../ReactFlow/BallValue07";
import BallValue08 from "../ReactFlow/BallValue08";
import BallValue09 from "../ReactFlow/BallValue09";
import BallValue10 from "../ReactFlow/BallValue10";
import PCV_01_Otsuka from "../ReactFlow/PCV01_Otsuka";
import PCV_02_Otsuka from "../ReactFlow/PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import {
    id_OTSUKA,
    id_NITORI,
} from "../../data-table-device/ID-DEVICE/IdDevice";
import BallValueCenter from "../ReactFlow/BallValueCenter";
import { OverlayPanel } from "primereact/overlaypanel";
import {
    ArrowRight,
    BallVavle,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    GD,
    PCV,
    PTV,
    SVD_NC,
    SVD_NO,
    VavleWay,
    WhiteTriangleRight,
    juntionBottom,
    juntionTop,
    tankGas,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { httpApi } from "@/api/http.api";
import BallVavlePSV from "../ReactFlow/BallVavlePSV";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import BallValueFirst from "../ReactFlow/BallValueFirst";
import BallValueLast from "../ReactFlow/BallValueLast";
import { edgePRU } from "../../PRU/GraphicPRU/edgePRU";
import { edgeZOVC } from "./edgeZOVC";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "./Api_ZOVC";
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
const backGroundData = "white";
export const borderBox = "#aad4ff";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "yellow";

export default function GraphicNITORI() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [active, setActive] = useState();

    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);
    const [data, setData] = useState<any[]>([]);

    const [GVF1, setGVF1] = useState<string | null>(null);
    const [SVF1, setSVF1] = useState<string | null>(null);
    const [SVA1, setSVA1] = useState<string | null>(null);
    const [GVA1, setGVA1] = useState<string | null>(null);

    const [GVF2, setGVF2] = useState<string | null>(null);
    const [SVF2, setSVF2] = useState<string | null>(null);
    const [SVA2, setSVA2] = useState<string | null>(null);
    const [GVA2, setGVA2] = useState<string | null>(null);



    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);

    const [FC_Conn_STT, setFC_Conn_STT] = useState<string | null>(null);
    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STT, setConn_STT] = useState<string | null>(null);
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);

    const toast = useRef<Toast>(null);
    
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
 //=====================================================================================
  
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
                 entityId: id_NITORI,
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

         ws.current.onmessage = (evt) => {
            let dataReceived = JSON.parse(evt.data);
            if (dataReceived.update !== null) {
                setData(prevData => [...prevData, dataReceived]);
                
                const keys = Object?.keys(dataReceived.data);
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

                    GD1: setGD1,
                    GD2: setGD2,
                    PT1: setPT1,

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
                    DI_ZSO_1: setDI_ZSO_1,
                    DI_ZSC_1: setDI_ZSC_1,

                    EVC_01_Conn_STT: setEVC_01_Conn_STT,
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
                            .padStart(2, "0")} ${date
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}:${date
                            .getSeconds()
                            .toString()
                            .padStart(2, "0")}`;
                        valueStateMap[key]?.(formattedDate);
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


  



    //============================GD =============================
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
    
    
              const [EVC_01_Conn_STT, setEVC_01_Conn_STT] = useState<string | null>(null);
     
              const [EVC_01_Conn_STT_High, setEVC_01_Conn_STT_High] = useState<number | null>(null);
              const [EVC_01_Conn_STT_Low, setEVC_01_Conn_STT_Low] = useState<number | null>(null);
              const [exceedThresholdEVC_01_Conn_STT, setExceedThresholdEVC_01_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
              
              const [maintainEVC_01_Conn_STT, setMaintainEVC_01_Conn_STT] = useState<boolean>(false);
              
              
              useEffect(() => {
                const EVC_01_Conn_STTValue = parseFloat(EVC_01_Conn_STT as any);
                const highValue = EVC_01_Conn_STT_High ?? NaN;
                const lowValue = EVC_01_Conn_STT_Low ?? NaN;
            
                if (!isNaN(EVC_01_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Conn_STT) {
                    setExceedThresholdEVC_01_Conn_STT(EVC_01_Conn_STTValue >= highValue || EVC_01_Conn_STTValue <= lowValue);
                }
            }, [EVC_01_Conn_STT, EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low, maintainEVC_01_Conn_STT]);
              
             
             // =================================================================================================================== 
    
             const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
    
            const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
            const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
            const [exceedThresholdPLC_Conn_STT, setExceedThresholdPLC_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof PLC_Conn_STT_High === 'string' && typeof PLC_Conn_STT_Low === 'string' && PLC_Conn_STT !== null && maintainPLC_Conn_STT === false
             ) {
                 const highValue = parseFloat(PLC_Conn_STT_High);
                 const lowValue = parseFloat(PLC_Conn_STT_Low);
                 const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PLC_Conn_STTValue)) {
                     if (highValue <= PLC_Conn_STTValue || PLC_Conn_STTValue <= lowValue) {
                             setExceedThresholdPLC_Conn_STT(true);
                     } else {
                        setExceedThresholdPLC_Conn_STT(false);
                     }
                 } 
             } 
         }, [PLC_Conn_STT_High, PLC_Conn_STT, PLC_Conn_STT_Low,maintainPLC_Conn_STT]);
     
      
    
         //======================================================================================================================
    //================================ GVA1 FIQ 1901 ======================================================
    const [lineDuty1901, setLineduty1901] = useState<boolean>(true);

    const ChangeStatusFIQ = async () => {
        try {
            const newValue1 = lineDuty1901;

            await httpApi.post(PostTelemetry_ZOVC, {
                Line_Duty_01: true,
            });
            setLineduty1901(newValue1);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };
    const confirmLineDuty = () => {
        confirmDialog({
            header: "Comfirmation",
            message: "Are you sure to change Line Duty?",
            icon: "pi pi-info-circle",
            accept: () => ChangeStatusFIQ(),
        });
    };

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


            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );
            const EVC_01_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_High");
            setEVC_01_Conn_STT_High(EVC_01_Conn_STT_High?.value || null);
            const EVC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_Low");
            setEVC_01_Conn_STT_Low(EVC_01_Conn_STT_Low?.value || null);
            const EVC_01_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Conn_STT_Maintain"
            );
            const Active = res.data.find(
                (item: any) => item.key === "active"
            );
            setActive(Active?.value || false);




            const Line_Duty_01 = res.data.find((item: any) => item.key === "Line_Duty_01");

            setLineduty1901(Line_Duty_01?.value || null);
          



            
 // =================================================================================================================== 



 setMaintainEVC_01_Conn_STT(EVC_01_Conn_STT_Maintain?.value || false);

 setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);

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

        useEffect(() => {

            fetchData();
    
            if (
                (exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life) ||
                (exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature) ||
                (exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure) ||
                (exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition) ||
                (exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition) ||
                (exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition) ||
                (exceedThresholdEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition) ||
                (exceedThresholdEVC_01_Vb_of_Current_Day && !maintainEVC_01_Vb_of_Current_Day) ||
                (exceedThresholdEVC_01_Vm_of_Current_Day && !maintainEVC_01_Vm_of_Current_Day) ||
                (exceedThresholdEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day) ||
                (exceedThresholdEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day) ||
                (exceedThresholdEVC_01_Conn_STT && !maintainEVC_01_Conn_STT) ||
                (exceedThresholdGD1 && !maintainGD1) ||
                (exceedThresholdGD2 && !maintainGD2) ||
                (exceedThresholdPT1 && !maintainPT1) ||
                (exceedThresholdDI_ZSO_1 && !maintainDI_ZSO_1) ||
                (exceedThresholdDI_ZSC_1 && !maintainDI_ZSC_1) ||
                (exceedThresholdDI_MAP_1 && !maintainDI_MAP_1) ||
                (exceedThresholdDI_UPS_BATTERY && !maintainDI_UPS_BATTERY) ||
                (exceedThresholdDI_UPS_CHARGING && !maintainDI_UPS_CHARGING) ||
                (exceedThresholdDI_UPS_ALARM && !maintainDI_UPS_ALARM) ||
                (exceedThresholdDI_SELECT_SW && !maintainDI_SELECT_SW) ||
                (exceedThresholdDI_RESET && !maintainDI_RESET) ||
                (exceedThresholdEmergency_NO && !maintainEmergency_NO) ||
                (exceedThresholdEmergency_NC && !maintainEmergency_NC) ||
                (exceedThresholdUPS_Mode && !maintainUPS_Mode) ||
                (exceedThresholdDO_HR_01 && !maintainDO_HR_01) ||
                (exceedThresholdDO_BC_01 && !maintainDO_BC_01) ||
                (exceedThresholdDO_SV_01 && !maintainDO_SV_01) ||
                (exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT)
            ) {
                setAlarmMessage("ALARM");
            } else if (
                maintainEVC_01_Remain_Battery_Service_Life ||
                maintainEVC_01_Temperature ||
                maintainEVC_01_Pressure ||
                maintainEVC_01_Volume_at_Base_Condition ||
                maintainEVC_01_Volume_at_Measurement_Condition ||
                maintainEVC_01_Flow_at_Base_Condition ||
                maintainEVC_01_Flow_at_Measurement_Condition ||
                maintainEVC_01_Vb_of_Current_Day ||
                maintainEVC_01_Vm_of_Current_Day ||
                maintainEVC_01_Vb_of_Last_Day ||
                maintainEVC_01_Vm_of_Last_Day ||
                maintainEVC_01_Conn_STT ||
                maintainGD1 ||
                maintainGD2 ||
                maintainPT1 ||
                maintainDI_ZSO_1 ||
                maintainDI_ZSC_1 ||
                maintainDI_MAP_1 ||
                maintainDI_UPS_BATTERY ||
                maintainDI_UPS_CHARGING ||
                maintainDI_UPS_ALARM ||
                maintainDI_SELECT_SW ||
                maintainDI_RESET ||
                maintainEmergency_NO ||
                maintainEmergency_NC ||
                maintainUPS_Mode ||
                maintainDO_HR_01 ||
                maintainDO_BC_01 ||
                maintainDO_SV_01 ||
                maintainPLC_Conn_STT
            ) {
                setAlarmMessage("Maintaining");
            } else {
                setAlarmMessage(null);
            }
        }, [
            exceedThresholdEVC_01_Remain_Battery_Service_Life, maintainEVC_01_Remain_Battery_Service_Life,
            exceedThresholdEVC_01_Temperature, maintainEVC_01_Temperature,
            exceedThresholdEVC_01_Pressure, maintainEVC_01_Pressure,
            exceedThresholdEVC_01_Volume_at_Base_Condition, maintainEVC_01_Volume_at_Base_Condition,
            exceedThresholdEVC_01_Volume_at_Measurement_Condition, maintainEVC_01_Volume_at_Measurement_Condition,
            exceedThresholdEVC_01_Flow_at_Base_Condition, maintainEVC_01_Flow_at_Base_Condition,
            exceedThresholdEVC_01_Flow_at_Measurement_Condition, maintainEVC_01_Flow_at_Measurement_Condition,
            exceedThresholdEVC_01_Vb_of_Current_Day, maintainEVC_01_Vb_of_Current_Day,
            exceedThresholdEVC_01_Vm_of_Current_Day, maintainEVC_01_Vm_of_Current_Day,
            exceedThresholdEVC_01_Vb_of_Last_Day, maintainEVC_01_Vb_of_Last_Day,
            exceedThresholdEVC_01_Vm_of_Last_Day, maintainEVC_01_Vm_of_Last_Day,
            exceedThresholdEVC_01_Conn_STT, maintainEVC_01_Conn_STT,
            exceedThresholdGD1, maintainGD1,
            exceedThresholdGD2, maintainGD2,
            exceedThresholdPT1, maintainPT1,
            exceedThresholdDI_ZSO_1, maintainDI_ZSO_1,
            exceedThresholdDI_ZSC_1, maintainDI_ZSC_1,
            exceedThresholdDI_MAP_1, maintainDI_MAP_1,
            exceedThresholdDI_UPS_BATTERY, maintainDI_UPS_BATTERY,
            exceedThresholdDI_UPS_CHARGING, maintainDI_UPS_CHARGING,
            exceedThresholdDI_UPS_ALARM, maintainDI_UPS_ALARM,
            exceedThresholdDI_SELECT_SW, maintainDI_SELECT_SW,
            exceedThresholdDI_RESET, maintainDI_RESET,
            exceedThresholdEmergency_NO, maintainEmergency_NO,
            exceedThresholdEmergency_NC, maintainEmergency_NC,
            exceedThresholdUPS_Mode, maintainUPS_Mode,
            exceedThresholdDO_HR_01, maintainDO_HR_01,
            exceedThresholdDO_BC_01, maintainDO_BC_01,
            exceedThresholdDO_SV_01, maintainDO_SV_01,
            exceedThresholdPLC_Conn_STT, maintainPLC_Conn_STT
        ]);
        

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PCV1901: "PT-1901",
        PT_1902: "PT-1902",
        PT_1903: "PT-1903",

        TT: "TT",
    };

    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "BarG",
        CC: "°C",
    };

    const paragraphContents: Record<string, string> = {
        SVF: "Standard Volume Flow Rate",
        GVF: "Gross Volume Flow Rate",
        SVA: "Standard Volume Accumulated",
        GVA: "Gross Volume Accumulated",
        PT: "Pressure Transmitter",
        TT: "Temperature Transmitter",
        PSV: "Pressure Safety Valve",
        PCV: "Pressure Control Valve",
        SSV: "Slam Shut Off Valve",
        SDV: "Shutdown valve",
    };
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
            if (node.id === "data4") {
                const roundedSVF1 =
                EVC_01_Flow_at_Base_Condition !== null ? parseFloat(EVC_01_Flow_at_Base_Condition).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                    exceedThresholdEVC_01_Flow_at_Base_Condition && !maintainEVC_01_Flow_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Flow_at_Base_Condition
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVF_1()}
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
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(EVC_01_Flow_at_Base_Condition)}
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
            if (node.id === "data3") {
                const roundedGVF1 =
                EVC_01_Flow_at_Measurement_Condition !== null ? parseFloat(EVC_01_Flow_at_Measurement_Condition).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                    exceedThresholdEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Flow_at_Measurement_Condition
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVF_1()}
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
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(EVC_01_Flow_at_Measurement_Condition)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
                const roundedSVA1 =
                EVC_01_Volume_at_Base_Condition !== null ? parseFloat(EVC_01_Volume_at_Base_Condition).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                    exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Volume_at_Base_Condition
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVA_1()}
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
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(EVC_01_Volume_at_Base_Condition)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
                const roundedGVA1 =
                EVC_01_Volume_at_Measurement_Condition !== null ? parseFloat(EVC_01_Volume_at_Measurement_Condition).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    background:
                                    exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_01_Volume_at_Measurement_Condition
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVA_1()}
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
                                        {ValueGas.GVA} :
                                    </p>

                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(EVC_01_Volume_at_Measurement_Condition)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
                const roundedSVF2 =
                    SVF2 !== null ? parseFloat(SVF2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    // backgroundColor:
                                    //     exceedThresholdSVF2 && !maintainSVF2
                                    //         ? "#ff5656"
                                    //         : maintainSVF2
                                    //         ? "orange"
                                    //         : "transparent",
                                }}
                                // onClick={() => confirmSVF_2()}
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
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {/* {roundedSVF2} */}
                                        Not used
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
            if (node.id === "data6") {
                const roundedGVF2 =
                    GVF2 !== null ? parseFloat(GVF2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    // backgroundColor:
                                    //     exceedThresholdGVF2 && !maintainGVF2
                                    //         ? "#ff5656"
                                    //         : maintainGVF2
                                    //         ? "orange"
                                    //         : "transparent",
                                }}
                                // onClick={() => confirmGVF_2()}
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
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {/* {roundedGVF2} */}
                                        Not used
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
                const roundedSVA2 =
                    SVA2 !== null ? parseFloat(SVA2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    // backgroundColor:
                                    //     exceedThresholdSVA2 && !maintainSVA2
                                    //         ? "#ff5656"
                                    //         : maintainSVA2
                                    //         ? "orange"
                                    //         : "transparent",
                                }}
                                // onClick={() => confirmSVA_2()}
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
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {/* {roundedSVA2} */}
                                        Not used
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
         

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    
                                    // padding: 2,
                                    borderRadius: 5,
                                    // backgroundColor:
                                    //     exceedThresholdGVA2 && !maintainGVA2
                                    //         ? "#ff5656"
                                    //         : maintainGVA2
                                    //         ? "orange"
                                    //         : "transparent",
                                }}
                                // onClick={() => confirmGVA_2()}
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
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {/* {roundedGVA2} */}
                                        Not used
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans01") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                    exceedThresholdPT1 && !maintainPT1
                                            ? "#ff5656"
                                            : maintainPT1
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPT_1903()}
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
                                        PT-1303:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(PT1)}
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
            if (node.id === "Pressure_Trans02") {

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                    exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
                                            ? "#ff5656"
                                            : maintainEVC_01_Pressure
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPCV1901()}
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
                                        PT-1301:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {/* {roundedEVC_01_Pressure} */}
                                        {formatValue(EVC_01_Pressure)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
          

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                   
                                }}
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
                                        PT-1302:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,

                                        }}
                                    >
                                        {/* {roundedPT02} */}
                                        Not used
                                    </p>
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
                                        Gateway{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        EVC{" "}
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        PLC{" "}
                                    </p>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        <p style={{ marginLeft: 5 }}>
                                            {active === true ? (
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
                                        {EVC_01_Conn_STT === "1" ? (
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
                                    {FC_Conn_STTValue}
                                    </p>
                                    <p
                                      
                                    >
                                    </p>
                                    <p
                              
                                    >
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            //  =============================== GD ===================================

            if (node.id === "GD1_Value1901") {
                const roundedGD01 =
                    GD1 !== null ? parseFloat(GD1).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    right: 4,
                                    backgroundColor:
                                    exceedThresholdGD1 && !maintainGD1
                                            ? "#ff5656"
                                            : maintainGD1
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1901()}
                            >
                                <p>{roundedGD01} %LEL</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
                const roundedGD02 =
                    GD2 !== null ? parseFloat(GD2).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    right: 4,

                                    backgroundColor:
                                        exceedThresholdGD2 && !maintainGD2
                                            ? "#ff5656"
                                            : maintainGD2
                                            ? "orange"
                                            : "transparent",

                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD2()}
                            >
                                <p>{roundedGD02} %LEL</p>
                            </div>
                        ),
                    },
                };
            }
         
            if (node.id === "SDV_IMG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>

                                {DI_ZSO_1 === "1" ? SVD_NO : DI_ZSO_1 === "0" ? SVD_NC : null}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FIQ_1901") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                FIQ-1301
                                {lineDuty1901 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "FIQ_1902") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                // onClick={confirmLineDuty}
                            >
                                FIQ-1302 
                                {/* {lineDuty1902 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )} */}
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

    // const storedPositionString = localStorage.getItem("positionsDemo");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
        const initialPositions = {
            AlarmCenter: { x: 482.05200728443185, y: 413.3377226840123 },
            ArrowRight: { x: 600.6812903546922, y: 1023.2137288625802 },
            ArrowRight1: { x: -1309.5952585721552, y: 1028.6160429390827 },
            BallValue01: { x: -1099.8623120428465, y: 1132.8426285378578 },
            BallValue02: { x: -930.1995649132355, y: 1134.349598926105 },
            BallValue03: { x: -196.79621954129698, y: 899.1124566834239 },
            BallValue04: { x: -195.60396011679137, y: 1130.0961562807925 },
            BallValue05: { x: 69.02660980686983, y: 900.275444950572 },
            BallValue06: { x: 68.14677001999206, y: 1130.2445342820436 },
            BallValue07: { x: -760.558494130737, y: 813.9595916722001 },
            BallValue08: { x: -318.78277994435996, y: 813.2368352599929 },
            BallValue09: { x: -761.5161533656683, y: 1218.0953144552127 },
            BallValue10: { x: -319.2587189121365, y: 1218.2687283598136 },
            BallValueCenter: { x: -490.3799459557838, y: 1016.4944766882877 },
            BallValueCenter_Check: {
                x: 90.96636981528951,
                y: 1084.2937921267353,
            },
            BallValueCenter_None: {
                x: -474.0480962199408,
                y: 1047.4658048132944,
            },
            BallValueCenter_None2: {
                x: -458.43233108676895,
                y: 1047.9161594286932,
            },
            BallValueFirst: { x: 540.6382414025647, y: 1009.8554479041943 },
            BallValueLast: { x: -1235.1015481288755, y: 1014.1731832196431 },
            BallValuePSV: { x: 365.7214870733153, y: 969.1157106130481 },
            BallValuePSVNone: { x: 384.29818356393537, y: 983.3599694543407 },
            BallValueSDV_2: { x: 460.0534879934596, y: 1126.0467878081538 },
            ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
            FIQ_1901: { x: -650.6050171712068, y: 419.4180175567138 },
            FIQ_1902: { x: -650.7978554063068, y: 1302.7206372374262 },
            FIQ_none: { x: -489.9470769137962, y: 797.3702269986474 },
            FIQ_none2: { x: -490.92064731860467, y: 1201.8983996314123 },
            FIQ_none11: { x: -461.4522399597448, y: 842.2526102310347 },
            FIQ_none22: { x: -461.411272356637, y: 1246.8432149457044 },
            Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
            Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
            GD1: { x: -721.106774380396, y: 1036.124815356864 },
            GD1_Name1901: { x: -750.5717919879045, y: 963.6033250363372 },
            GD1_Value1901: { x: -750.6929582767964, y: 998.3450746708818 },
            GD2: { x: -108.63790203727399, y: 1034.2608683363853 },
            GD2_Name1902: { x: -138.3576747080346, y: 962.2555967945655 },
            GD2_Value1902: { x: -138.105199084697, y: 996.9067838824453 },
            GD3: { x: -33.45865823821708, y: 1023.4968146950976 },
            GD3_Name1903: { x: -38.935748158151824, y: 965.0434170104967 },
            GD3_Value1903: { x: -38.71667918527706, y: 990.28449275314 },
            GD_none1: { x: -695.6714460801703, y: 1055.524751466512 },
            GD_none2: { x: -83.45659585230814, y: 1055.0452836615555 },
            GD_none3: { x: -8.569329151370312, y: 1040.1027102105159 },
            HELP: { x: 750.7851455025582, y: 336.66019515746984 },
            Header: { x: -1150.982952877127, y: 405.9855378563634 },

            Line2_NONE: { x: -884.3336203769039, y: 1046.097424130381 },
            Line2_NONE1: { x: -771.9885863058424, y: 1046.097424130381 },
            LineBall_1_1: { x: -1308.5317402818896, y: 1046.4869361614612 },
            PCV01: { x: -71.72419522919697, y: 872.1992339822971 },
            PCV02: { x: -70.59914284418218, y: 1102.7742211636619 },
            PCV_NUM01: { x: -150.01994102955004, y: 822.7337186204609 },
            PCV_NUM02: { x: -152.59143023214534, y: 1177.587987672237 },
            PCV_ballVavle_Small1: {
                x: -9.97812688216436,
                y: 890.3528829879407,
            },
            PCV_ballVavle_Small1_none1: {
                x: -85.98048131286686,
                y: 906.7535606409883,
            },
            PCV_ballVavle_Small1_none2: {
                x: -87.01319099046559,
                y: 1140.2927546567473,
            },
            PCV_ballVavle_Small2: {
                x: -10.924423457684213,
                y: 1121.8809236143888,
            },
            PCV_ballVavle_Small2_none1: {
                x: -3.980775175783833,
                y: 937.8135634050248,
            },
            PCV_ballVavle_Small2_none2: {
                x: -4.242106929766209,
                y: 1168.0979210360842,
            },
            PCV_none1: { x: -81.53859921276154, y: 931.6359691613542 },
            PCV_none2: { x: -82.81357330202869, y: 1160.4579021505795 },
            PSV01: { x: 375.16283692916215, y: 850.6784784974753 },
            PSV_01: { x: 363.01399102294744, y: 918.1847523730952 },
            PSV_02: { x: 343.50657410430927, y: 898.8234351782597 },
            PSV_03: { x: 336.37235462546346, y: 853.2472414915732 },
            PSV_None01: { x: 443.9871838308024, y: 1041.2984512500652 },
            PSV_None02: { x: 384.4148444470081, y: 944.3475775498915 },
            PSV_None03: { x: 362.95828329018167, y: 922.9843066623179 },
            PSV_None04: { x: 359.78841525116593, y: 873.6633118651833 },
            PT1: { x: 212.46666801628896, y: 967.0006757895978 },
            PT2: { x: -714.758294622871, y: 1169.7084571677146 },
            PT3: { x: -724.0493263648187, y: 765.418717530157 },
            PT_col1: { x: 244.93092240769465, y: 1029.6619231307786 },
            PT_col2: { x: -691.4134359761592, y: 827.2156614482261 },
            PT_col3: { x: -682.6744823539359, y: 1232.1938517905614 },
            PT_none1: { x: 244.47093596247453, y: 1035.3795085307177 },
            PT_none2: { x: -691.2272311787543, y: 799.8737796553648 },
            PT_none3: { x: -681.713304101358, y: 1200.4279572443495 },
            PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
            PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
            Pressure_Trans01: { x: 89.44115443547344, y: 744.1939817620072 },
            Pressure_Trans02: {
                x: -1062.2957790075757,
                y: 715.1286867309525,
            },
            Pressure_Trans03: {
                x: -1063.1765921652548,
                y: 1304.9210038322592,
            },
            SDV: { x: -1130.2804525595525, y: 949.2231976259577 },

            SDV2: { x: 428.80808378008487, y: 947.7631672170489 },
            SDV_Ball: { x: -1082.1826908317034, y: 1163.7430466784738 },
            SDV_Ball2: { x: 476.86464803916624, y: 1155.8236963022298 },
            SDV_IMG: { x: -1105.7858651854403, y: 995.2834321094119 },
            SDV_IMG2: { x: 452.64818322228166, y: 990.890204545138 },
            SDV_Name_none: { x: -1249.6461839977737, y: 902.8410000476873 },
            SDV_Name_none2: { x: -535.6461839977737, y: 897.8410000476873 },
            SDV_None: { x: -1079.6286470234306, y: 1045.6886789070904 },
            SDV_None2: { x: 479.4466067147644, y: 1040.4900272412854 },
            T_juntion_11: { x: -415.1375899376694, y: 826.41338351339 },
            T_juntion_14: { x: -636.9217801711462, y: 1199.4187412355468 },
            Tank: { x: -948.2826352307409, y: 978.1950517663572 },
            Tank_Ball: { x: -912.3215564493197, y: 1165.3460365617266 },
            Tank_None: { x: -921.0872417249408, y: 1047.5256700271339 },
            Temperature_Trans01: {
                x: -607.828356494313,
                y: 562.8487535527242,
            },
            Temperature_Trans02: {
                x: -796.1166124474211,
                y: 1445.5258186779024,
            },
            VavleWay: { x: -548.7343955645046, y: 1023.9896019770438 },
            animation_line7: { x: -726.8677999585877, y: 845.0411827415849 },
            animation_line8: { x: -302.1278181476729, y: 845.0900138040361 },
            animation_line9: { x: -735.8615775891575, y: 1250.0032163426715 },
            animation_line10: {
                x: -302.52565055103537,
                y: 1250.145137738511,
            },
            animation_line11: {
                x: -379.70039074752606,
                y: 845.4885740100881,
            },
            animation_line12: {
                x: -456.7744720087678,
                y: 1047.6913485484115,
            },
            animation_line13: {
                x: -471.36187766507726,
                y: 1047.0994790430639,
            },
            animation_line14: {
                x: -601.6773380252566,
                y: 1249.8269450159223,
            },
            animation_line15: {
                x: -300.41401361805697,
                y: 1249.8955661985747,
            },
            borderWhite: { x: -1277.3840968192662, y: 415.6555633656558 },

            data1: { x: -651.6400825086595, y: 713.9244953651255 },
            data2: { x: -651.9488814472836, y: 632.5798654521193 },
            data3: { x: -651.6999350711712, y: 551.1437463452924 },
            data4: { x: -651.1845372665591, y: 470.1543746383694 },
            data5: { x: -651.0957995367963, y: 1353.5548802685278 },
            data6: { x: -651.0202138003872, y: 1434.493187346574 },
            data7: { x: -650.5805679457492, y: 1514.910450348262 },
            data8: { x: -650.0546506070804, y: 1595.5292310859375 },
            line1: { x: -1217.4244277428284, y: 1046.0775967596373 },
            line2: { x: -759.1307313177314, y: 1046.097424130381 },
            line3: { x: -743.0134159304, y: 844.6163804041859 },
            line4: { x: -743.9949690251686, y: 1249.172245093845 },
            line5: { x: -300.65784806763253, y: 844.3342440262651 },
            line6: { x: -300.98065704991916, y: 1249.1529639630187 },
            line7: { x: -241.6382268189932, y: 1041.7359796478943 },
            line8: { x: -178.3476951217882, y: 930.3833450683701 },
            line9: { x: -178.37038145875272, y: 1161.2417569105805 },
            line10: { x: 86.69745659087829, y: 930.5099856332267 },
            line11: { x: 86.19431979613125, y: 1161.0153295862324 },
            line12: { x: 116.83816603164496, y: 1040.345253330986 },
            line13: { x: 557.9496069421656, y: 1041.1289059139096 },
            lineBall_13_1: { x: 615.3267333790442, y: 1041.1289059139096 },
            overlay_SmallVavle1: {
                x: -593.2918361488164,
                y: 1011.397327575481,
            },
            overlay_SmallVavle2: {
                x: -1263.7593947324417,
                y: 1290.7025144885476,
            },
            overlay_line7: { x: -234.00651420480602, y: 1043.3202658573925 },
            overlay_line13: { x: 150.3917593807463, y: 915.3092652673095 },
            timeUpdate3: { x: -1256.5918369525343, y: 500.00871223251704 },

        };
    const [positions, setPositions] = useState(initialPositions);

    const lineColor = "yellow";

    const [isAnimated07, setIsAnimated07] = useState<boolean>(false);
    const [isAnimated08, setIsAnimated08] = useState<boolean>(false);
    const [isAnimated09, setIsAnimated09] = useState<boolean>(false);
    const [isAnimated10, setIsAnimated10] = useState<boolean>(false);
    const [isAnimatedCenter, setIsAnimatedCenter] = useState<boolean>(false);

    const animated_center = (value: boolean) => {
        setIsAnimatedCenter(value);
    };
    const animated_07 = (value: boolean) => {
        setIsAnimated07(value);
    };
    const animated_08 = (value: boolean) => {
        setIsAnimated08(value);
    };
    const animated_09 = (value: boolean) => {
        setIsAnimated09(value);
    };
    const animated_10 = (value: boolean) => {
        setIsAnimated10(value);
    };

    useEffect(() => {
        const updatedEdges07_08 = edge7.map((edge) => ({
            ...edge,
            animated: isAnimated07,
            style: {
                strokeWidth: isAnimated07 && !isAnimatedCenter ? 3 : 10,
                stroke: isAnimated07 && !isAnimatedCenter ? "orange" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 10, // Thêm điều kiện ở đây
                stroke: isAnimated09 && !isAnimatedCenter ? "orange" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 10,
                stroke: isAnimatedCenter ? "orange" : lineColor,
            },
        }));

        const allEdges = [
            ...edgeZOVC,

            ...updatedEdgesCenter,
            ...(isAnimatedCenter ? [] : updatedEdges07_08), // Thêm điều kiện ở đây

            ...(isAnimatedCenter ? [] : updatedEdges09_10), // Thêm điều kiện ở đây
        ];

        setEdges(allEdges);
    }, [isAnimated07, isAnimated09, isAnimatedCenter]);

    const edge7 = [
        {
            id: "animation_line7-animation_line8",
            source: "animation_line7",
            target: "animation_line8",
            animated: isAnimated07,
            type: "smoothstep",
        },
    ];
    const edge9 = [
        {
            id: "animation_line9-animation_line10",
            source: "animation_line9",
            target: "animation_line10",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const egdeCenter = [
        {
            id: "animation_line7-animation_line11",
            source: "animation_line7",
            target: "animation_line11",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line11-animation_line12",
            source: "animation_line11",
            target: "animation_line12",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line13-animation_line14",
            source: "animation_line13",
            target: "animation_line14",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line14-animation_line15",
            source: "animation_line14",
            target: "animation_line15",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([...edge7]);

    const [initialNodes, setInitialNodes] = useState([
        //============================ animated_Line =======================================
        //============================ animated_Line =======================================

        {
            id: "animation_line7",
            position: positions.animation_line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 10,
                height: 1,
            },
        },
        {
            id: "animation_line8",
            position: positions.animation_line8,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line9",
            position: positions.animation_line9,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line10",
            position: positions.animation_line10,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "animation_line11",
            position: positions.animation_line11,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 1,
                height: 1,
            },
        },

        {
            id: "animation_line12",
            position: positions.animation_line12,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line13",
            position: positions.animation_line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line14",
            position: positions.animation_line14,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: 'none',
                width: 1,
                height: 1,
            },
        },
        {
            id: "animation_line15",
            position: positions.animation_line15,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        // ============================== line =========================================
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 10,
                background: background,
            },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: "none",
            },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div>4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div>5</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div>6</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line7",
            position: positions.line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 35, height: 5, background: line },
        },
        {
            id: "line8",
            position: positions.line8,
            type: "custom",
            data: {
                label: <div>8</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line9",
            position: positions.line9,
            type: "custom",
            data: {
                label: <div>9</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line10",
            position: positions.line10,
            type: "custom",
            data: {
                label: <div>10</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line11",
            position: positions.line11,
            type: "custom",
            data: {
                label: <div>11</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "line12",
            position: positions.line12,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 10,
                height: 22,
            },
        },
        {
            id: "line13",
            position: positions.line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
            },
        },

        // ============================== line =========================================

        {
            id: "SDV",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        SDV-1301
                    </div>
                ),
            },
            position: positions.SDV,
            zIndex: 99999,

            style: {
                color:'white',
                background: "green",
                border: "1px solid white",
                width: 130,
                height: 45,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "SDV_None",
            position: positions.SDV_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: line,
                width: 30,
                height: 1,
            },
        },
        {
            id: "SDV_Ball",
            position: positions.SDV_Ball,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 22,
                opacity: 0.01,
            },
        },
        {
            id: "SDV_IMG",
            position: positions.SDV_IMG,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 0,
                height: 0,
            },
        },

        //=================== Ball vavle ==================================
        {
            id: "BallValue01",
            position: positions.BallValue01,
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
            id: "BallValue02",
            position: positions.BallValue02,
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
            id: "BallValue03",
            position: positions.BallValue03,
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
            id: "BallValue04",
            position: positions.BallValue04,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue04 />
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
            id: "BallValue05",
            position: positions.BallValue05,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue05 />
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
            id: "BallValue06",
            position: positions.BallValue06,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue06 />
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
            id: "BallValue07",
            position: positions.BallValue07,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue07 onDataLine7={animated_07} />
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
            id: "BallValue08",
            position: positions.BallValue08,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue08 onDataLine8={animated_08} />
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
            id: "BallValue09",
            position: positions.BallValue09,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue09 onDataLine09={animated_09} />
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
            id: "BallValue10",
            position: positions.BallValue10,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue10 onDataLine10={animated_10} />
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
            id: "BallValueFirst",
            position: positions.BallValueFirst,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueFirst />
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
            id: "BallValueLast",
            position: positions.BallValueLast,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueLast />
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
        // ================= Tank ======================
        {
            id: "Tank",
            position: positions.Tank,
            type: "custom",
            data: {
                label: <div>{tankGas}</div>,
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "Tank_None",
            position: positions.Tank_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#ffaa00",
                background: "#ffaa00",
                width: 55,
                height: 1,
            },
        },
        {
            id: "Tank_Ball",
            position: positions.Tank_Ball,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 35,
                height: 2,
                opacity: 0.01,
            },
        },

        // ================= PCV =============================

        {
            id: "PCV01",
            position: positions.PCV01,
            type: "custom",
            data: {
                label: (
                    <div>
                        {/* <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        /> */}
                        {PCV}
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "PCV02",
            position: positions.PCV02,
            type: "custom",
            data: {
                label: (
                    <div>
                        {/* <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        /> */}
                        {PCV}
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        // {
        //     id: "PCV_ballVavle_Small1",
        //     position: positions.PCV_ballVavle_Small1,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div>
        //                 <Image
        //                     src="/layout/imgGraphic/BallValueRight.png"
        //                     width={30}
        //                     height={30}
        //                     alt="Picture of the author"
        //                 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },
        // {
        //     id: "PCV_ballVavle_Small2",
        //     position: positions.PCV_ballVavle_Small2,
        //     type: "custom",
        //     data: {
        //         label: (
        //             <div>
        //                 <Image
        //                     src="/layout/imgGraphic/BallValueRight.png"
        //                     width={30}
        //                     height={30}
        //                     alt="Picture of the author"
        //                 />
        //             </div>
        //         ),
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },

        // {
        //     id: "PCV_ballVavle_Small1_none1",
        //     position: positions.PCV_ballVavle_Small1_none1,
        //     type: "custom",
        //     data: {
        //         label: <div> </div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 30,
        //         height: 1,
        //     },
        // },
        // {
        //     id: "PCV_ballVavle_Small2_none1",
        //     position: positions.PCV_ballVavle_Small2_none1,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Left,
        //     targetPosition: Position.Top,
        //     style: {
        //         border: "#333333",
        //         background: "none",
        //         width: 30,
        //         height: 1,
        //     },
        // },
        // {
        //     id: "PCV_ballVavle_Small1_none2",
        //     position: positions.PCV_ballVavle_Small1_none2,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 30,
        //         height: 1,
        //     },
        // },
        // {
        //     id: "PCV_ballVavle_Small2_none2",
        //     position: positions.PCV_ballVavle_Small2_none2,
        //     type: "custom",
        //     data: {
        //         label: <div> </div>,
        //     },

        //     sourcePosition: Position.Left,
        //     targetPosition: Position.Top,
        //     style: {
        //         border: "#333333",
        //         background: "none",
        //         width: 30,
        //         height: 1,
        //     },
        // },

        {
            id: "PCV_NUM01",
            position: positions.PCV_NUM01,
            type: "custom",
            data: {
                label: (
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PCV_01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: 'none',
                width: 350,
                background: 'none',
                // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "PCV_NUM02",
            position: positions.PCV_NUM02,
            type: "custom",
            data: {
                label: (
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PCV_02_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                border: 'none',
                width: 350,

                background: 'none',
                // Thêm box shadow với màu (0, 255, 255)
            },
        },
        // {
        //     id: "PCV_none1",
        //     position: positions.PCV_none1,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Left,
        //     style: {
        //         height: 1,
        //         width: 1,
        //     },
        // },
        // {
        //     id: "PCV_none2",
        //     position: positions.PCV_none2,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Bottom,
        //     targetPosition: Position.Left,
        //     style: {
        //         height: 1,
        //         width: 1,
        //     },
        // },

        // ==================== FIQ =============================
        {
            id: "FIQ_1901",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                        }}
                        onClick={confirmLineDuty}
                    >
                        {/* FIQ-1901
                        {lineDuty1901 && <span>1901</span>} */}
                        Not used
                    </div>
                ),
            },
            position: positions.FIQ_1901,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 400,
                height: 50,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "FIQ_1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                        }}
                        onClick={confirmLineDuty}
                    >
                        FIQ-1902
                        {/* {lineDuty1902 && <span>1902</span>} */}
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 400,
                height: 50,
            },
            targetPosition: Position.Top,
        },
        {
            id: "FIQ_none",
            position: positions.FIQ_none,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                background: background,
                height: 1,
                width: 1,
                border: background,
            },
            zIndex: 9999,
        },
        {
            id: "FIQ_none2",
            position: positions.FIQ_none2,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                background: background,
                height: 1,
                width: 1,
                border: background,
            },
            zIndex: 9999,
        },

        {
            id: "FIQ_none11",
            position: positions.FIQ_none11,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },
        {
            id: "FIQ_none22",
            position: positions.FIQ_none22,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                height: 1,
                width: 1,
            },
        },
        // ==================== Ball center =============================
        {
            id: "BallValueCenter",
            position: positions.BallValueCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueCenter onDataLineCenter={animated_center} />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "BallValueCenter_None",
            position: positions.BallValueCenter_None,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 10,
                height: 10,
                opacity: 0.01,
            },
        },
        {
            id: "BallValueCenter_None2",
            position: positions.BallValueCenter_None2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 10,
                height: 10,
                opacity: 0.01,
            },
        },
        {
            id: "BallValuePSV",
            position: positions.BallValuePSV,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavlePSV />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "BallValuePSVNone",
            position: positions.BallValuePSVNone,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 22,
                height: 40,
            },
        },
        {
            id: "VavleWay",
            position: positions.VavleWay,
            type: "custom",
            data: {
                label: <div>{VavleWay}</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 99999,
        },
        // =================== data ================================

        {
            id: "data1",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data1,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data2",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data2,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data3",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data3,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data4",
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

            position: positions.data4,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "data5",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data5,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Top,
        },
        {
            id: "data6",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data6,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Left,
        },
        {
            id: "data7",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data7,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Top,
        },
        {
            id: "data8",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data8,

            style: {
                border: "1px solid white",
                width: 400,
                
            },
            targetPosition: Position.Top,
        },
        // ============= PSV =====================

        {
            id: "PSV_01",
            position: positions.PSV_01,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV_02",
            position: positions.PSV_02,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV_03",
            position: positions.PSV_03,
            type: "custom",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                background: background,
                border: "none",
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None01",
            position: positions.PSV_None01,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None02",
            position: positions.PSV_None02,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None03",
            position: positions.PSV_None03,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Bottom,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },
        {
            id: "PSV_None04",
            position: positions.PSV_None04,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
        },

        {
            id: "PSV01",
            position: positions.PSV01,
            type: "custom",
            data: {
                label: (
                    <div style={{ display: "flex", marginTop: 5 }}>
                        <PSV01_Otsuka />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Bottom,
            style: {
                border: 'none',
                width: 330,
                background: 'none',
                // Thêm box shadow với màu (0, 255, 255)
            },
        },

        // =================  PT ===================================

        {
            id: "Pressure_Trans01",
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
            position: positions.Pressure_Trans01,

            style: {
                border: 'none',
                width: 330,
                background: 'white',
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "Pressure_Trans02",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    ></div>
                ),
            },
            position: positions.Pressure_Trans02,

            style: {
                border: 'none',
                width: 330,
                background: 'white',
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Right,
        },
        {
            id: "Pressure_Trans03",
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
            position: positions.Pressure_Trans03,

            style: {
                border: 'none',
                width: 330,
                background: 'white',
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Right,
        },
        {
            id: "PT1",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT1,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT2",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PT2,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT3",
            data: {
                label: <div>{PTV}</div>,
            },
            zIndex: 9999,

            position: positions.PT3,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PT_none1",
            position: positions.PT_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: 'none',
                background: 'none',
                width: 10,
                height: 1,
            },
        },
        {
            id: "PT_none2",
            position: positions.PT_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 10,
                height: 1,
            },
        },
        {
            id: "PT_none3",
            position: positions.PT_none3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 20,
                height: 1,
            },
        },
        {
            id: "PT_col1",
            position: positions.PT_col1,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 0,
                height: 25,

                borderRadius: "none",
            },
        },
        {
            id: "PT_col2",
            position: positions.PT_col2,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 10,
                height: 25,

                borderRadius: "none",
            },
        },
        {
            id: "PT_col3",
            position: positions.PT_col3,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 999999,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: line,
                background: line,
                width: 10,
                height: 25,

                borderRadius: "none",
            },
        },

        //  ================== TT ======================

        // ================ header ========================

        {
            id: "Header",
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
                                    fontSize: 55,
                                    fontWeight: 600,
                                    color: "#ffaa00",
                                }}
                            >
                               Gebeng CG
                            </p>
                        </div>
                    </div>
                ),
            },

            position: positions.Header,
            zIndex: 9999,

            style: {
                background: background,
                border: background,
                width: 400,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // {
        //     id: "HELP",
        //     data: {
        //         label: (
        //             <div>
        //                 <div
        //                     style={{
        //                         textAlign: "center",
        //                         cursor: "pointer",
        //                     }}
        //                 >
        //                     <p
        //                         style={{
        //                             width: 50,
        //                             height: 50,
        //                             border: "5px solid white",
        //                             borderRadius: 50,
        //                             fontWeight: 600,
        //                             color: "white",
        //                             fontSize: 30,
        //                         }}
        //                         onClick={() => setVisible(true)}
        //                     >
        //                         ?
        //                     </p>
        //                 </div>
        //             </div>
        //         ),
        //     },

        //     position: positions.HELP,

        //     style: {
        //         background: background,
        //         border: background,
        //         width: 10,
        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // =============== TIME  =======================

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
                width: 500,
                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        //====================== Conneted ===================

        {
            id: "ConnectData",
            data: {
                label: <div></div>,
            },

            position: positions.ConnectData,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        // =================== Arrow ======================

        {
            id: "ArrowRight",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            position: positions.ArrowRight,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "ArrowRight1",
            data: {
                label: <div>{ArrowRight}</div>,
            },

            position: positions.ArrowRight1,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        // {
        //     id: "Flow1",
        //     data: {
        //         label: <div>{ArrowRight}</div>,
        //     },

        //     position: positions.Flow1,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        // {
        //     id: "Flow2",
        //     data: {
        //         label: <div>{ArrowRight}</div>,
        //     },

        //     position: positions.Flow2,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        // ================ PT ICONS ===================

        // ============= GD =====================

        {
            id: "GD1",
            data: {
                label: <div>{GD}</div>,
            },

            position: positions.GD1,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Top,
        },
        {
            id: "GD2",
            data: {
                label: <div>{GD}</div>,
            },

            position: positions.GD2,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },
        // {
        //     id: "GD3",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD3,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Top,
        // },
        {
            id: "GD1_Name1901",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                            position: "relative",
                            bottom: 5,
                        }}
                    >
                        GD-1301
                    </div>
                ),
            },
            position: positions.GD1_Name1901,

            style: {
                color:'white',
                background: "green",
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Left,
        },
        {
            id: "GD2_Name1902",
            data: {
                label: (
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                            position: "relative",
                            bottom: 5,
                        }}
                    >
                        GD-1302
                    </div>
                ),
            },
            position: positions.GD2_Name1902,

            style: {
                color:'white',

                background: "green",
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Left,
        },
        // {
        //     id: "GD3_Name1903",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     fontSize: 20,
        //                     fontWeight: 500,
        //                     position: "relative",
        //                     bottom: 5,
        //                 }}
        //             >
        //                 GD-1903
        //             </div>
        //         ),
        //     },
        //     position: positions.GD3_Name1903,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },

        {
            id: "GD1_Value1901",
            data: {
                label: <div style={{}}> </div>,
            },
            position: positions.GD1_Value1901,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "GD2_Value1902",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.GD2_Value1902,

            style: {
                background: 'white',
                border: "1px solid white",
                width: 130,
                height: 35,
            },
            targetPosition: Position.Bottom,
        },
        // {
        //     id: "GD3_Value1903",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     color: "green",
        //                     fontSize: 18,
        //                     fontWeight: 600,
        //                 }}
        //             >
        //                 {" "}
        //             </div>
        //         ),
        //     },
        //     position: positions.GD3_Value1903,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },

        {
            id: "GD_none1",
            position: positions.GD_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 10,
                height: 1,
            },
        },
        {
            id: "GD_none2",
            position: positions.GD_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: colorIMG_none,
                width: 10,
                height: 1,
            },
        },
        // {
        //     id: "GD_none3",
        //     position: positions.GD_none3,
        //     type: "custom",
        //     data: {
        //         label: <div></div>,
        //     },

        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Right,
        //     style: {
        //         border: "#333333",
        //         background: colorIMG_none,
        //         width: 10,
        //         height: 1,
        //     },
        // },

        // ============ border white ======================
        {
            id: "borderWhite",
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
            position: positions.borderWhite,
            zIndex:99999,
            style: {
                background: 'none',
                border: "1px solid white",
                width: 580,
                height: 270,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },
        // =================== overlay =================================

        {
            id: "overlay_SmallVavle1",
            position: positions.overlay_SmallVavle1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 50,
                height: 1,
            },
        },
        {
            id: "overlay_SmallVavle2",
            position: positions.overlay_SmallVavle2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: background,
                background: background,
                width: 50,
                height: 1,
            },
        },

        //============================ T_JUNTION ==========================

        // {
        //     id: "T_juntion_11",
        //     position: positions.T_juntion_11,
        //     type: "custom",
        //     data: {
        //         label: <div>{juntionBottom}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },

        // {
        //     id: "T_juntion_14",
        //     position: positions.T_juntion_14,
        //     type: "custom",
        //     data: {
        //         label: <div>{juntionTop}</div>,
        //     },

        //     sourcePosition: Position.Right,
        //     targetPosition: Position.Left,
        //     style: {
        //         border: "#333333",
        //         background: background,
        //         width: 1,
        //         height: 1,
        //     },
        //     zIndex: 9999,
        // },

        //===============================  Alarm center ===========================

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
                width: 200,
                borderRadius: 5,
            },
        },

        {
            id: "LineBall_1_1",
            position: positions.LineBall_1_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
            },
        },

        {
            id: "lineBall_13_1",
            position: positions.lineBall_13_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
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
                if (id === "SDV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV: position,
                    }));
                } else if (id === "SDV_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_None: position,
                    }));
                } else if (id === "SDV_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_IMG: position,
                    }));
                } else if (id === "SDV_Ball") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_Ball: position,
                    }));
                }
                // ================================== end item ==================================

                // ============ line =========================
                else if (id === "line1") {
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
                } else if (id === "line4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line4: position,
                    }));
                } else if (id === "line5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line5: position,
                    }));
                } else if (id === "line6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line6: position,
                    }));
                } else if (id === "line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line7: position,
                    }));
                } else if (id === "line8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line8: position,
                    }));
                } else if (id === "line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line9: position,
                    }));
                } else if (id === "line10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line10: position,
                    }));
                } else if (id === "line11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line11: position,
                    }));
                } else if (id === "line12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line12: position,
                    }));
                } else if (id === "line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line13: position,
                    }));
                }

                // ============ ball vavle ===========================
                else if (id === "BallValue01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue01: position,
                    }));
                } else if (id === "BallValue02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue02: position,
                    }));
                } else if (id === "BallValue03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue03: position,
                    }));
                } else if (id === "BallValue04") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue04: position,
                    }));
                } else if (id === "BallValue05") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue05: position,
                    }));
                } else if (id === "BallValue06") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue06: position,
                    }));
                } else if (id === "BallValue07") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue07: position,
                    }));
                } else if (id === "BallValue08") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue08: position,
                    }));
                } else if (id === "BallValue09") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue09: position,
                    }));
                } else if (id === "BallValue10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValue10: position,
                    }));
                } else if (id === "BallValueFirst") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueFirst: position,
                    }));
                } else if (id === "BallValueLast") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueLast: position,
                    }));
                }
                // ============ ball vavle ===========================
                else if (id === "Tank") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank: position,
                    }));
                } else if (id === "Tank_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_None: position,
                    }));
                } else if (id === "Tank_Ball") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_Ball: position,
                    }));
                }
                // ============ PCV ===========================
                else if (id === "PCV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV01: position,
                    }));
                } else if (id === "PCV02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV02: position,
                    }));
                } else if (id === "PCV_NUM01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM01: position,
                    }));
                } else if (id === "PCV_NUM02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM02: position,
                    }));
                } else if (id === "PCV_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_none1: position,
                    }));
                } else if (id === "PCV_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_none2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1_none1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small1_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small1_none2: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2_none1: position,
                    }));
                } else if (id === "PCV_ballVavle_Small2_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_ballVavle_Small2_none2: position,
                    }));
                }

                // ============ FIQ ===========================
                else if (id === "FIQ_1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1901: position,
                    }));
                } else if (id === "FIQ_1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1902: position,
                    }));
                } else if (id === "FIQ_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none: position,
                    }));
                } else if (id === "FIQ_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none2: position,
                    }));
                } else if (id === "FIQ_none11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none11: position,
                    }));
                } else if (id === "FIQ_none22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_none22: position,
                    }));
                }
                // ============ Ball center ===========================
                else if (id === "BallValueCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter: position,
                    }));
                } else if (id === "BallValueCenter_Check") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_Check: position,
                    }));
                } else if (id === "BallValueCenter_None") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_None: position,
                    }));
                } else if (id === "BallValueCenter_None2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValueCenter_None2: position,
                    }));
                } else if (id === "BallValuePSV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValuePSV: position,
                    }));
                } else if (id === "BallValuePSVNone") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallValuePSVNone: position,
                    }));
                } else if (id === "VavleWay") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VavleWay: position,
                    }));
                }
                // ========================= data ==========================
                else if (id === "data1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data1: position,
                    }));
                } else if (id === "data2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data2: position,
                    }));
                } else if (id === "data3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data3: position,
                    }));
                } else if (id === "data4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data4: position,
                    }));
                } else if (id === "data5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data5: position,
                    }));
                } else if (id === "data6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data6: position,
                    }));
                } else if (id === "data7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data7: position,
                    }));
                } else if (id === "data8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data8: position,
                    }));
                }
                // ========================= PSV ==========================
                else if (id === "PSV_01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_01: position,
                    }));
                } else if (id === "PSV_02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_02: position,
                    }));
                } else if (id === "PSV_03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_03: position,
                    }));
                } else if (id === "PSV_None01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None01: position,
                    }));
                } else if (id === "PSV_None02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None02: position,
                    }));
                } else if (id === "PSV_None03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None03: position,
                    }));
                } else if (id === "PSV_None04") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_None04: position,
                    }));
                } else if (id === "PSV01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV01: position,
                    }));
                }
                //  ================ PT ===================
                else if (id === "Pressure_Trans01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans01: position,
                    }));
                } else if (id === "Pressure_Trans02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans02: position,
                    }));
                } else if (id === "Pressure_Trans03") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans03: position,
                    }));
                } else if (id === "PT1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT1: position,
                    }));
                } else if (id === "PT2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT2: position,
                    }));
                } else if (id === "PT3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT3: position,
                    }));
                } else if (id === "PT_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none1: position,
                    }));
                } else if (id === "PT_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none2: position,
                    }));
                } else if (id === "PT_none3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_none3: position,
                    }));
                } else if (id === "PT_col1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col1: position,
                    }));
                } else if (id === "PT_col2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col2: position,
                    }));
                } else if (id === "PT_col3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_col3: position,
                    }));
                }

                // ================ TT =================
                else if (id === "Temperature_Trans01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_Trans01: position,
                    }));
                } else if (id === "Temperature_Trans02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Temperature_Trans02: position,
                    }));
                }
                // ============= header ===============
                else if (id === "Header") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Header: position,
                    }));
                } else if (id === "HELP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        HELP: position,
                    }));
                }
                // ============= Time Update ==================
                else if (id === "timeUpdate") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate: position,
                    }));
                } else if (id === "timeUpdate2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate2: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                }
                // ============= Connected ===================
                else if (id === "ConnectData") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ConnectData: position,
                    }));
                }
                // ============= Arrow ======================
                else if (id === "ArrowRight") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight: position,
                    }));
                } else if (id === "ArrowRight1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight1: position,
                    }));
                } else if (id === "Flow1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow1: position,
                    }));
                } else if (id === "Flow2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow2: position,
                    }));
                }
                // =========== PT ICONS1 ==================

                //================ GD ====================
                else if (id === "GD1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1: position,
                    }));
                } else if (id === "GD2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2: position,
                    }));
                } else if (id === "GD3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3: position,
                    }));
                } else if (id === "GD1_Name1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1_Name1901: position,
                    }));
                } else if (id === "GD2_Name1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2_Name1902: position,
                    }));
                } else if (id === "GD3_Name1903") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3_Name1903: position,
                    }));
                } else if (id === "GD1_Value1901") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD1_Value1901: position,
                    }));
                } else if (id === "GD2_Value1902") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD2_Value1902: position,
                    }));
                } else if (id === "GD3_Value1903") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD3_Value1903: position,
                    }));
                } else if (id === "GD_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none1: position,
                    }));
                } else if (id === "GD_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none2: position,
                    }));
                } else if (id === "GD_none3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_none3: position,
                    }));
                }
                // ===================== border white ==================
                else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                }
                // ==================== overlay ========================
                else if (id === "overlay_SmallVavle1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_SmallVavle1: position,
                    }));
                } else if (id === "overlay_SmallVavle2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        overlay_SmallVavle2: position,
                    }));
                }
                //========================== animation line =======================
                else if (id === "animation_line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line7: position,
                    }));
                } else if (id === "animation_line8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line8: position,
                    }));
                } else if (id === "animation_line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line9: position,
                    }));
                } else if (id === "animation_line10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line10: position,
                    }));
                } else if (id === "animation_line11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line11: position,
                    }));
                } else if (id === "animation_line12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line12: position,
                    }));
                } else if (id === "animation_line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line13: position,
                    }));
                } else if (id === "animation_line14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line14: position,
                    }));
                } else if (id === "animation_line15") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        animation_line15: position,
                    }));
                }
                //========================== T juntion icon  =======================
                else if (id === "T_juntion_11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        T_juntion_11: position,
                    }));
                } else if (id === "T_juntion_14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        T_juntion_14: position,
                    }));
                }
                //========================== AlarmCenter  =======================
                else if (id === "AlarmCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AlarmCenter: position,
                    }));
                } else if (id === "LineBall_1_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        LineBall_1_1: position,
                    }));
                } else if (id === "lineBall_13_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        lineBall_13_1: position,
                    }));
                }
            }
        },
        [setNodes, setPositions, editingEnabled]
    );

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };
    // useEffect(() => {
    //     localStorage.setItem("positionsDemo", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <audio ref={audioRef}>
                <source
                    src="/audios/mixkit-police-siren-us-1643-_1_.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}

            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                style={{
                    width: 500,
                    fontWeight: 500,
                    fontSize: 17,
                }}
            >
                {Object.keys(paragraphContents).map(
                    (key: string, index: number) => (
                        <p key={index}>
                            {key} - {paragraphContents[key]} <hr />
                        </p>
                    )
                )}
            </Dialog>
            <div
            key={resetKey}
                style={{
                    borderRadius: 5,
                    //width: "auto",
                    height: "100%",
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
