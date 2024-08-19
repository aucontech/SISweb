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
import { id_OTSUKA, id_ZOCV } from "../../data-table-device/ID-DEVICE/IdDevice";
import BallValueCenter from "../ReactFlow/BallValueCenter";
import { OverlayPanel } from "primereact/overlaypanel";
import {
    ArrowRight,
    BallVavle,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    GD,
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
import AlarmOTSUKA from "@/layout/AlarmBell/AlarmOTSUKA";
import BallValueFirst from "../ReactFlow/BallValueFirst";
import BallValueLast from "../ReactFlow/BallValueLast";
import { edgePRU } from "../../PRU/GraphicPRU/edgePRU";
import { edgeZOVC } from "./edgeZOVC";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "./Api_ZOVC";
import AlarmZOCV from "@/layout/AlarmBell/AlarmZOCV";
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
const backGroundData = "white";
export const borderBox = "#aad4ff";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ffaa00";

export default function GraphicZOCV() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [active, setActive] = useState();

    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);
    const [data, setData] = useState<any[]>([]);




    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);

    const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);
    const [EVC_02_Conn_STTValue, setEVC_02_Conn_STTValue] = useState<
        string | null
    >(null);
    const [Conn_STT, setConn_STT] = useState<string | null>(null);
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);

    const toast = useRef<Toast>(null);

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
                                key: "active",
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
                setCheckConnectData(true);
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                    ws.current?.send(JSON.stringify(obj_PCV_PSV));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setCheckConnectData(false);
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

                        FC_01_Accumulated_Values_Uncorrected_Volume: setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Accumulated_Values_Volume: setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Flow_Rate: setFC_01_Current_Values_Flow_Rate,
                        FC_01_Current_Values_Uncorrected_Flow_Rate: setFC_01_Current_Values_Uncorrected_Flow_Rate,

                        FC_01_Current_Values_Static_Pressure: setFC_01_Current_Values_Static_Pressure,
                        
                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,
                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,

                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,

                        EVC_02_Pressure: setEVC_02_Pressure,

                     

                        PT_1103: setPT_1103,

                        SSV_1101: setNC,

                        EVC_02_Conn_STT: setEVC_02_Conn_STT,
                        Conn_STT: setConn_STT,

                        time: setTimeUpdate,
                    };

                    const valueStateMap: ValueStateMap = {
                        EVC_02_Conn_STT: setEVC_02_Conn_STTValue,
                        FC_01_Conn_STT: setConn_STTValue,
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
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

  

    //================================ PT 1902======================================================
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
  

    //================================ PT 1903======================================================
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
  

 

    //================================ SVF1 FIQ 1901 ======================================================
  
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
    


    //================================ GVF1 FIQ 1901 ======================================================
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
    


    //================================ SVA1 FIQ 1901 ======================================================
    //================================ GVF1 FIQ 1901 ======================================================
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
    

    //================================ GVA1 FIQ 1901 ======================================================
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
    


   
    //================================ ======================================================
         

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
  
    //================================ ======================================================
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
  

    //================================ ======================================================

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
  

    //================================ ======================================================

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
  

    //================================ ======================================================

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
   



    const [lineDuty1902, setLineduty1902] = useState<boolean>(true);

    const ChangeStatusFIQ = async () => {
        try {
            const newValue2 = !lineDuty1902;

            await httpApi.post(PostTelemetry_ZOVC, {
                FIQ1902_LineDuty: newValue2,
            });
            setLineduty1902(newValue2);

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
            const res = await httpApi.get(GetTelemetry_ZOVC);

      

            const EVC_02_Pressure_High = res.data.find((item: any) => item.key === "EVC_02_Pressure_High");
setEVC_02_Pressure_High(EVC_02_Pressure_High?.value || null);
const EVC_02_Pressure_Low = res.data.find((item: any) => item.key === "EVC_02_Pressure_Low");
setEVC_02_Pressure_Low(EVC_02_Pressure_Low?.value || null);
const EVC_02_Pressure_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Pressure_Maintain"
);
setMaintainEVC_02_Pressure(EVC_02_Pressure_Maintain?.value || false);

//===============================================================


const PT_1103_High = res.data.find((item: any) => item.key === "PT_1103_High");
setPT_1103_High(PT_1103_High?.value || null);
const PT_1103_Low = res.data.find((item: any) => item.key === "PT_1103_Low");
setPT_1103_Low(PT_1103_Low?.value || null);
const PT_1103_Maintain = res.data.find(
    (item: any) => item.key === "PT_1103_Maintain"
);
setMaintainPT_1103(PT_1103_Maintain?.value || false);

//===============================================================

const EVC_02_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
setEVC_02_Flow_at_Measurement_Condition_High(EVC_02_Flow_at_Measurement_Condition_High?.value || null);
const EVC_02_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
setEVC_02_Flow_at_Measurement_Condition_Low(EVC_02_Flow_at_Measurement_Condition_Low?.value || null);
const EVC_02_Flow_at_Measurement_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
);
setMaintainEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Maintain?.value || false);

//===============================================================
const EVC_02_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
setEVC_02_Volume_at_Base_Condition_High(EVC_02_Volume_at_Base_Condition_High?.value || null);
const EVC_02_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
setEVC_02_Volume_at_Base_Condition_Low(EVC_02_Volume_at_Base_Condition_Low?.value || null);
const EVC_02_Volume_at_Base_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
);
setMaintainEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Maintain?.value || false);

//===============================================================\

const EVC_02_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
setEVC_02_Volume_at_Measurement_Condition_High(EVC_02_Volume_at_Measurement_Condition_High?.value || null);
const EVC_02_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
setEVC_02_Volume_at_Measurement_Condition_Low(EVC_02_Volume_at_Measurement_Condition_Low?.value || null);
const EVC_02_Volume_at_Measurement_Condition_Maintain = res.data.find(
    (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
);
setMaintainEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Maintain?.value || false);

//===============================================================


            const FC_01_Accumulated_Values_Uncorrected_Volume_High = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_High");
            setFC_01_Accumulated_Values_Uncorrected_Volume_High(FC_01_Accumulated_Values_Uncorrected_Volume_High?.value || null);
            const FC_01_Accumulated_Values_Uncorrected_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_Low");
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(FC_01_Accumulated_Values_Uncorrected_Volume_Low?.value || null);
            const FC_01_Accumulated_Values_Uncorrected_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Accumulated_Values_Uncorrected_Volume_Maintain"
            );
            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value || false);

            const FC_01_Accumulated_Values_Volume_High = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Volume_High");
            setFC_01_Accumulated_Values_Volume_High(FC_01_Accumulated_Values_Volume_High?.value || null);
            const FC_01_Accumulated_Values_Volume_Low = res.data.find((item: any) => item.key === "FC_01_Accumulated_Values_Volume_Low");
            setFC_01_Accumulated_Values_Volume_Low(FC_01_Accumulated_Values_Volume_Low?.value || null);
            const FC_01_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Accumulated_Values_Volume_Maintain"
            );
            setMaintainFC_01_Accumulated_Values_Volume(FC_01_Accumulated_Values_Volume_Maintain?.value || false);

            const FC_01_Current_Values_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Flow_Rate_High");
            setFC_01_Current_Values_Flow_Rate_High(FC_01_Current_Values_Flow_Rate_High?.value || null);
            const FC_01_Current_Values_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Low");
            setFC_01_Current_Values_Flow_Rate_Low(FC_01_Current_Values_Flow_Rate_Low?.value || null);
            const FC_01_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Maintain"
            );
            setMaintainFC_01_Current_Values_Flow_Rate(FC_01_Current_Values_Flow_Rate_Maintain?.value || false);


            const FC_01_Current_Values_Uncorrected_Flow_Rate_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_High");
            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(FC_01_Current_Values_Uncorrected_Flow_Rate_High?.value || null);
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_Low");
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(FC_01_Current_Values_Uncorrected_Flow_Rate_Low?.value || null);
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain"
            );
            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value || false);



            const FC_01_Current_Values_Static_Pressure_High = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_High");
            setFC_01_Current_Values_Static_Pressure_High(FC_01_Current_Values_Static_Pressure_High?.value || null);
            const FC_01_Current_Values_Static_Pressure_Low = res.data.find((item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Low");
            setFC_01_Current_Values_Static_Pressure_Low(FC_01_Current_Values_Static_Pressure_Low?.value || null);
            const FC_01_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
            );
            setMaintainFC_01_Current_Values_Static_Pressure(FC_01_Current_Values_Static_Pressure_Maintain?.value || false);

            const LineDuty1902 = res.data.find(
                (item: any) => item.key === "FIQ1902_LineDuty"
            );
            setLineduty1902(LineDuty1902?.value || false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
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
        BAR: "BarA",
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

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
                const roundedFC_01_Current_Values_Flow_Rate =
                    FC_01_Current_Values_Flow_Rate !== null ? parseFloat(FC_01_Current_Values_Flow_Rate).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Flow_Rate && !maintainFC_01_Current_Values_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Flow_Rate
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
                                        {ValueGas.SVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                   {roundedFC_01_Current_Values_Flow_Rate}
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
                const roundedFC_01_Current_Values_Uncorrected_Flow_Rate =
                    FC_01_Current_Values_Uncorrected_Flow_Rate !== null ? parseFloat(FC_01_Current_Values_Uncorrected_Flow_Rate).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate && !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
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
                                        {ValueGas.GVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedFC_01_Current_Values_Uncorrected_Flow_Rate}
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
                const roundedFC_01_Accumulated_Values_Volume =
                    FC_01_Accumulated_Values_Volume !== null ? parseFloat(FC_01_Accumulated_Values_Volume).toFixed(2) : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Accumulated_Values_Volume && !maintainFC_01_Accumulated_Values_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Volume
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
                                        {ValueGas.SVA}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedFC_01_Accumulated_Values_Volume}
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
                const roundedFC_01_Accumulated_Values_Uncorrected_Volume =
                    FC_01_Accumulated_Values_Uncorrected_Volume !== null ? parseFloat(FC_01_Accumulated_Values_Uncorrected_Volume).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    background:
                                        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume && !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Uncorrected_Volume
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
                                        {ValueGas.GVA}:
                                    </p>

                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedFC_01_Accumulated_Values_Uncorrected_Volume}
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
                const roundedEVC_02_Flow_at_Base_Condition =
                    EVC_02_Flow_at_Base_Condition !== null ? parseFloat(EVC_02_Flow_at_Base_Condition).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Flow_at_Base_Condition
                                            ? "orange"
                                            : "transparent",
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
                                        {ValueGas.SVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedEVC_02_Flow_at_Base_Condition}
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
                const roundedEVC_02_Flow_at_Measurement_Condition =
                    EVC_02_Flow_at_Measurement_Condition !== null ? parseFloat(EVC_02_Flow_at_Measurement_Condition).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Flow_at_Measurement_Condition && !maintainEVC_02_Flow_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Flow_at_Measurement_Condition
                                            ? "orange"
                                            : "transparent",
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
                                        {ValueGas.GVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedEVC_02_Flow_at_Measurement_Condition}
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
                const roundedEVC_02_Volume_at_Base_Condition =
                    EVC_02_Volume_at_Base_Condition !== null ? parseFloat(EVC_02_Volume_at_Base_Condition).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Volume_at_Base_Condition && !maintainEVC_02_Volume_at_Base_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Volume_at_Base_Condition
                                            ? "orange"
                                            : "transparent",
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
                                        {ValueGas.GVF}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {roundedEVC_02_Volume_at_Base_Condition}
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
            if (node.id === "data8") {
                const roundedEVC_02_Volume_at_Measurement_Condition =
                    EVC_02_Volume_at_Measurement_Condition !== null ? parseFloat(EVC_02_Volume_at_Measurement_Condition).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    bottom: 7,
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
                                            ? "#ff5656"
                                            : maintainEVC_02_Volume_at_Measurement_Condition
                                            ? "orange"
                                            : "transparent",
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
                                        {ValueGas.GVA}:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedEVC_02_Volume_at_Measurement_Condition}
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
                const roundedPT_1103 =
                    PT_1103 !== null ? parseFloat(PT_1103).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_1103 && !maintainPT_1103
                                            ? "#ff5656"
                                            : maintainPT_1103
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
                                        PT-1103:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT_1103}
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
                const roundedFC_01_Current_Values_Static_Pressure =
                    FC_01_Current_Values_Static_Pressure !== null ? parseFloat(FC_01_Current_Values_Static_Pressure).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Static_Pressure && !maintainFC_01_Current_Values_Static_Pressure
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Static_Pressure
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
                                        PT-1101:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {/* {roundedEVC_01_Pressure} */}
                                        {roundedFC_01_Current_Values_Static_Pressure}
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
                const roundedEVC_02_Pressure =
                    EVC_02_Pressure !== null ? parseFloat(EVC_02_Pressure).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
                                            ? "#ff5656"
                                            : maintainEVC_02_Pressure
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
                                        PT-1102:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedEVC_02_Pressure}
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

            if (node.id === "timeUpdate3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
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

                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        EVC 02 :{" "}
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
                                        {Conn_STT === "1" ? (
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
                                        {EVC_02_Conn_STT === "1" ? (
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

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        null
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",

                                            fontSize: 15,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {EVC_02_Conn_STTValue}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            //  =============================== GD ===================================

            if (node.id === "SDV_IMG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {NC === "1" && <div>{SVD_NO}</div>}
                                {NC === "0" && <div>{SVD_NC}</div>}
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                // onClick={confirmLineDuty}
                            >
                                {/* FIQ-1901
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
                                )} */}
                                FC-1101 
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
                                    fontSize: 22,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                EVC-1102
                                {lineDuty1902 && (
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
            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionsDemo");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
              AlarmCenter: { x: -141.93537908754035, y: 551.5742065897153 },
              ArrowRight: { x: 489.13814192842443, y: 1024.194783335719 },
              ArrowRight1: { x: -1292.9283737310109, y: 1027.1532161432224 },
              BallValue01: { x: -1102.8623120428465, y: 1133.3426285378578 },
              BallValue02: { x: -941.0488084444129, y: 1131.9611112928555 },
              BallValue03: { x: -195.29621954129698, y: 899.319045428541 },
              BallValue04: { x: -195.24252213921113, y: 1130.9608395881485 },
              BallValue05: { x: 69.02660980686983, y: 900.275444950572 },
              BallValue06: { x: 68.4817333577081, y: 1129.866264933931 },
              BallValue07: { x: -760.558494130737, y: 813.9595916722001 },
              BallValue08: { x: -318.78277994435996, y: 813.2368352599929 },
              BallValue09: { x: -761.5161533656683, y: 1218.0953144552127 },
              BallValue10: { x: -319.6976758927896, y: 1218.790918561744 },
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
              BallValueFirst: { x: 402.65262421132076, y: 1010.0430441067174 },
              BallValueLast: { x: -1228.9348814622088, y: 1014.5065165529766 },
              BallValuePSV: { x: 289.72148707331525, y: 956.6157106130481 },
              BallValuePSVNone: { x: 307.79818356393537, y: 974.3599694543407 },
              ConnectData: { x: -1224.1375965271236, y: 779.7488024784055 },
              FIQ_1901: { x: -600.2178332288872, y: 530.5500772634006 },
              FIQ_1902: { x: -600.782593545606, y: 1307.348642657379 },
              FIQ_none: { x: -489.9470769137962, y: 797.3702269986474 },
              FIQ_none2: { x: -490.92064731860467, y: 1201.8983996314123 },
              FIQ_none11: { x: -461.4522399597448, y: 842.2526102310347 },
              FIQ_none22: { x: -461.411272356637, y: 1246.8432149457044 },
              Flow1: { x: -853.4576431348205, y: 1498.5512757003828 },
              Flow2: { x: -444.10018252327654, y: 1498.2070645557653 },
              GD1: { x: -744.9526824268976, y: 1027.0908034534227 },
              GD1_Name1901: { x: -750.5717919879045, y: 967.8438653513034 },
              GD1_Value1901: { x: -750.6929582767964, y: 992.5597991500013 },
              GD2: { x: -336.41350123805245, y: 1027.8276262499467 },
              GD2_Name1902: { x: -341.1593682888764, y: 968.5169520281263 },
              GD2_Value1902: { x: -341.38343464809464, y: 994.1346171684966 },
              GD3: { x: -33.45865823821708, y: 1023.4968146950976 },
              GD3_Name1903: { x: -38.935748158151824, y: 965.0434170104967 },
              GD3_Value1903: { x: -38.71667918527706, y: 990.28449275314 },
              GD_none1: { x: -720.3956940812873, y: 1045.5612154866174 },
              GD_none2: { x: -311.4848030174507, y: 1042.5915840896632 },
              GD_none3: { x: -8.569329151370312, y: 1040.1027102105159 },
              HELP: { x: 750.7851455025582, y: 336.66019515746984 },
              Header: { x: -1128.591121975559, y: 485.690264872979 },
              Line2_NONE: { x: -884.3336203769039, y: 1046.097424130381 },
              Line2_NONE1: { x: -766.4885863058424, y: 1046.097424130381 },
              LineBall_1_1: { x: -1291.5317402818896, y: 1045.9869361614612 },
              PCV01: { x: -114.47814833790082, y: 884.6622322842105 },
              PCV02: { x: -114.56950836930204, y: 1115.7032165712826 },
              PCV_NUM01: { x: -204.40249819080248, y: 785.6363564017703 },
              PCV_NUM02: { x: -204.8853562638497, y: 1213.9700787578358 },
              PCV_ballVavle_Small1: {
                  x: -11.97812688216436,
                  y: 890.8528829879407,
              },
              PCV_ballVavle_Small1_none1: {
                  x: -89.98048131286686,
                  y: 907.7535606409883,
              },
              PCV_ballVavle_Small1_none2: {
                  x: -89.7402289790491,
                  y: 1139.8134902831985,
              },
              PCV_ballVavle_Small2: {
                  x: -15.158237434475012,
                  y: 1121.3341270820497,
              },
              PCV_ballVavle_Small2_none1: {
                  x: -5.480775175783833,
                  y: 937.8135634050248,
              },
              PCV_ballVavle_Small2_none2: {
                  x: -8.74110200672402,
                  y: 1169.0225930073495,
              },
              PCV_none1: { x: -84.8563367756937, y: 930.9844638821777 },
              PCV_none2: { x: -85.63902265954965, y: 1161.9945398306136 },
              PSV01: { x: 164.5653138749226, y: 709.1940849015447 },
              PSV_01: { x: 286.01399102294744, y: 901.1847523730952 },
              PSV_02: { x: 268.17221043298656, y: 881.9653957553064 },
              PSV_03: { x: 262.0916184180753, y: 802.6731232227132 },
              PSV_None01: { x: 418.98718383080245, y: 1042.2984512500652 },
              PSV_None02: { x: 308.4148444470081, y: 926.8475775498915 },
              PSV_None03: { x: 286.04347842295704, y: 903.492198579528 },
              PSV_None04: { x: 284.45405157984317, y: 822.562379864356 },
              PT1: { x: 213.0618246319408, y: 955.7378090988041 },
              PT2: { x: -708.258294622871, y: 1154.2084571677146 },
              PT3: { x: -714.6813595253996, y: 749.7451241622731 },
              PT_col1: { x: 246.04113453009694, y: 1018.1824590657144 },
              PT_col2: { x: -682.0454691367402, y: 812.7156614482261 },
              PT_col3: { x: -676.1744823539359, y: 1217.1938517905614 },
              PT_none1: { x: 245.97093596247453, y: 1028.088833192043 },
              PT_none2: { x: -681.8592643393351, y: 782.4202415551159 },
              PT_none3: { x: -675.213304101358, y: 1184.4279572443495 },
              PVC_none1: { x: -559.5285900583461, y: 935.5671930782875 },
              PVC_none2: { x: -554.5116204107262, y: 1246.839418457314 },
              Pressure_Trans01: { x: 126.61009850783876, y: 1213.572155461012 },
              Pressure_Trans02: {
                  x: -1019.4423849427775,
                  y: 706.6585420699575,
              },
              Pressure_Trans03: {
                  x: -1022.6221979715284,
                  y: 1306.0599379762566,
              },
              SDV: { x: -1130.2804525595525, y: 949.2231976259577 },
              SDV_Ball: { x: -1085.6826908317034, y: 1163.7430466784738 },
              SDV_IMG: { x: -1109.2858651854403, y: 995.7834321094119 },
              SDV_Name_none: { x: -1249.6461839977737, y: 902.8410000476873 },
              SDV_None: { x: -1082.6286470234306, y: 1047.1886789070904 },
              T_juntion_11: { x: -415.1375899376694, y: 826.41338351339 },
              T_juntion_14: { x: -636.9217801711462, y: 1199.4187412355468 },
              Tank: { x: -956.0017188978301, y: 983.9072016916937 },
              Tank_Ball: { x: -923.0480270305792, y: 1163.8460365617266 },
              Tank_None: { x: -932.920575058274, y: 1046.859003360467 },
              Temperature_Trans01: {
                  x: -607.828356494313,
                  y: 562.8487535527242,
              },
              Temperature_Trans02: {
                  x: -796.1166124474211,
                  y: 1445.5258186779024,
              },
              VavleWay: { x: -549.7343955645046, y: 1023.9896019770438 },
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
              borderWhite: { x: -1265.7775227661382, y: 483.227073164883 },
              data1: { x: -600.2396652303086, y: 733.0298552462513 },
              data2: { x: -600.6538263836953, y: 682.3968450603423 },
              data3: { x: -600.4792235982375, y: 631.8178888851007 },
              data4: { x: -600.1016616532435, y: 580.9222883481272 },
              data5: { x: -600.9941090494707, y: 1357.5928722234303 },
              data6: { x: -600.8317496942007, y: 1408.2027063708313 },
              data7: { x: -600.8761635213684, y: 1458.4550015900893 },
              data8: { x: -600.4659556614379, y: 1508.8491719032568 },
              line1: { x: -1210.9244277428284, y: 1045.9109300929706 },
              line2: { x: -848.6307313177314, y: 1046.097424130381 },
              line3: { x: -743.0134159304, y: 844.6163804041859 },
              line4: { x: -743.9949690251686, y: 1249.172245093845 },
              line5: { x: -300.65784806763253, y: 844.3342440262651 },
              line6: { x: -300.98065704991916, y: 1249.1529639630187 },
              line7: { x: -241.6382268189932, y: 1041.7359796478943 },
              line8: { x: -178.3476951217882, y: 930.3833450683701 },
              line9: { x: -178.37038145875272, y: 1161.2417569105805 },
              line10: { x: 86.69745659087829, y: 930.5099856332267 },
              line11: { x: 86.19431979613125, y: 1161.0153295862324 },
              line12: { x: 116.11229608478766, y: 1041.0743208648537 },
              line13: { x: 420.3312960971492, y: 1041.9713896720348 },
              lineBall_13_1: { x: 503.3312960971493, y: 1041.9713896720348 },
              overlay_SmallVavle1: {
                  x: -593.2918361488164,
                  y: 1011.397327575481,
              },
              overlay_SmallVavle2: {
                  x: -1263.7593947324417,
                  y: 1290.7025144885476,
              },
              overlay_line7: { x: -359.506514204806, y: 1091.8202658573925 },
              overlay_line13: { x: 305.0008480217779, y: 1098.180980141821 },
              timeUpdate3: { x: -1237.6690589838854, y: 555.0282539654617 },
          };
    const [positions, setPositions] = useState(initialPositions);

    const lineColor = "#ffaa00";

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
                stroke: isAnimated07 && !isAnimatedCenter ? "white" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 10, // Thêm điều kiện ở đây
                stroke: isAnimated09 && !isAnimatedCenter ? "white" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 10,
                stroke: isAnimatedCenter ? "white" : lineColor,
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
                background: background,
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
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        SSV-1101
                    </div>
                ),
            },
            position: positions.SDV,
            zIndex: 99999,

            style: {
                background: "yellow",
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
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
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
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
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
            id: "PCV_ballVavle_Small1",
            position: positions.PCV_ballVavle_Small1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
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
            id: "PCV_ballVavle_Small2",
            position: positions.PCV_ballVavle_Small2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
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
            id: "PCV_ballVavle_Small1_none1",
            position: positions.PCV_ballVavle_Small1_none1,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small2_none1",
            position: positions.PCV_ballVavle_Small2_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: "none",
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small1_none2",
            position: positions.PCV_ballVavle_Small1_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: background,
                width: 30,
                height: 1,
            },
        },
        {
            id: "PCV_ballVavle_Small2_none2",
            position: positions.PCV_ballVavle_Small2_none2,
            type: "custom",
            data: {
                label: <div> </div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Top,
            style: {
                border: "#333333",
                background: "none",
                width: 30,
                height: 1,
            },
        },

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
                border: background,
                width: 260,
                background: borderBox,
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
                border: background,
                width: 260,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
        },
        {
            id: "PCV_none1",
            position: positions.PCV_none1,
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
            id: "PCV_none2",
            position: positions.PCV_none2,
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
                width: 300,
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
                        FIQ-1102
                        {lineDuty1902 && <span>1902</span>}
                    </div>
                ),
            },
            position: positions.FIQ_1902,

            style: {
                background: "#ffffaa",
                border: "1px solid white",
                width: 300,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                background: borderBox,
                border: "1px solid white",
                width: 300,
                height: 50,
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
                border: background,
                width: 260,
                background: borderBox,
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
                border: background,
                width: 260,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Top,
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
                border: background,
                width: 260,
                background: borderBox,
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
                border: background,
                width: 260,
                background: borderBox,
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
                border: "#333333",
                background: colorIMG_none,
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
                height: 40,

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
                height: 40,

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
                height: 40,

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
                                    fontSize: 45,
                                    fontWeight: 600,
                                    color: "#ffaa00",
                                }}
                            >
                                ZOCV
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
                width: 10,

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
                width: 370,

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

        // // ============= GD =====================

        // {
        //     id: "GD1",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD1,
        //     zIndex: 9999,
        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Top,
        // },
        // {
        //     id: "GD2",
        //     data: {
        //         label: <div>{GD}</div>,
        //     },

        //     position: positions.GD2,
        //     zIndex: 9999,

        //     style: {
        //         background: background,
        //         border: "none",
        //         width: "10px",

        //         height: 10,
        //     },
        //     targetPosition: Position.Left,
        // },
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
        // {
        //     id: "GD1_Name1901",
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
        //                 GD-1901
        //             </div>
        //         ),
        //     },
        //     position: positions.GD1_Name1901,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },
        // {
        //     id: "GD2_Name1902",
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
        //                 GD-1902
        //             </div>
        //         ),
        //     },
        //     position: positions.GD2_Name1902,

        //     style: {
        //         background: "yellow",
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Left,
        // },
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

        // {
        //     id: "GD1_Value1901",
        //     data: {
        //         label: <div style={{}}> </div>,
        //     },
        //     position: positions.GD1_Value1901,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },
        // {
        //     id: "GD2_Value1902",
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
        //     position: positions.GD2_Value1902,

        //     style: {
        //         background: borderBox,
        //         border: "1px solid white",
        //         width: 130,
        //         height: 35,
        //     },
        //     targetPosition: Position.Bottom,
        // },
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

        // {
        //     id: "GD_none1",
        //     position: positions.GD_none1,
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
        // {
        //     id: "GD_none2",
        //     position: positions.GD_none2,
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

            style: {
                background: background,
                border: "1px solid white",
                width: 420,
                height: 190,
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

        {
            id: "T_juntion_11",
            position: positions.T_juntion_11,
            type: "custom",
            data: {
                label: <div>{juntionBottom}</div>,
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
            id: "T_juntion_14",
            position: positions.T_juntion_14,
            type: "custom",
            data: {
                label: <div>{juntionTop}</div>,
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

        //===============================  Alarm center ===========================

        {
            id: "AlarmCenter",
            position: positions.AlarmCenter,
            type: "custom",
            data: {
                label: (
                    <div>
                        <AlarmZOCV />
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
        //=====================================================================
        {
            id: "Line2_NONE",
            position: positions.Line2_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
            },
        },
        {
            id: "Line2_NONE1",
            position: positions.Line2_NONE1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 1,
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
                }

                //===================================================================
                else if (id === "Line2_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE: position,
                    }));
                } else if (id === "Line2_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Line2_NONE1: position,
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
