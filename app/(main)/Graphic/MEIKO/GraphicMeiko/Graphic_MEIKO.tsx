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
import BallVavle_Line2_Top from "../BallVavlueMEIKO/BallVavle_Line2_Top";
import BallVavle_Line2_Bottom from "../BallVavlueMEIKO/BallVavle_Line2_Bottom";
import Image from "next/image";
import "./ForCssGraphic.css";
import {
    ArrowRight,
    BlackTriangle,
    GD,
    GaugeTemperature,
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
    arrowLeft,
    gaugePM,
    icon20,
    icon40,
} from "./iconSVG";
import BallVavle_Line3_Top from "../BallVavlueMEIKO/BallVavle_Line3_Top";
import BallVavle_Line3_Bottom from "../BallVavlueMEIKO/BallVavle_Line3_Bottom";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";
import { id_THACHTHAT } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";
import { BlackTriangleRight } from "@/app/(main)/PRU/GraphicPRU/iconSVG";
import { formatDate } from "@/app/(main)/dateUtils/dateUtils";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

interface StateMap2 {
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
export const borderBox = "white";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ff7f00";
export const line2 = "#ffaa00";
export const line3 = "#ffe900";

export default function Graphic_MEIKO() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);



    const toast = useRef<Toast>(null);

    const [PCV_6001A, setPCV_6001A] = useState();
    const [PCV_6001B, setPCV_6001B] = useState();
    const [PCV_6002A, setPCV_6002A] = useState();
    const [PCV_6002B, setPCV_6002B] = useState();

    const [PLC_STT, setPLC_STT] = useState<string | null>(null);

    const [PLC_STTValue, setPLC_STTValue] = useState<any>();
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);
    const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    
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
                   entityId: id_THACHTHAT,
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
            try {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.update !== null) {
                    setData(prevData => [...prevData, dataReceived]);


                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap =  {
                        Tank_01_Level: setTank_01_Level,
                        Tank_01_Volume: setTank_01_Volume,
                        Tank_01_Mass: setTank_01_Mass,
                        Tank_PT_301: setTank_PT_301,
                        Tank_TT_301: setTank_TT_301,
                        Pipe_Temp: setPipe_Temp,
                        Pipe_Press: setPipe_Press,
                        Flow_Meter_Total: setFlow_Meter_Total,
                        Consumption_Flow: setConsumption_Flow,
                        Flow_Velocity: setFlow_Velocity,
                        V1_Flow_Meter: setV1_Flow_Meter,
                        V2_Flow_Meter: setV2_Flow_Meter,
                        GD_101_High: setGD_101_High,
                        GD_101_Low: setGD_101_Low,
                        GD_102_High: setGD_102_High,
                        GD_102_Low: setGD_102_Low,
                        GD_103_High: setGD_103_High,
                        GD_103_Low: setGD_103_Low,
                        SDV_301: setSDV_301,
                        SDV_302: setSDV_302,
                        VP_301: setVP_301,
                        VP_302: setVP_302,
                        VP_303: setVP_303,
                        PLC_Conn_STT: setPLC_Conn_STT,

                    };

                    const valueStateMap: ValueStateMap = {
                        PLC_Conn_STT: setPLC_STTValue,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            stateMap[key]?.(value);
                        }
                        if (valueStateMap[key]) {
                            const value = dataReceived.data[key][0][0];
                            const formattedDate = formatDate(value)
                            valueStateMap[key]?.(formattedDate);
                        }
                    });
                }
            } catch (error) {
                console.error("Error handling WebSocket message:", error);
            }
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
        Tank_01_Level: " Tank 01",
        Tank_01_Volume: "Volume",
        Tank_01_Mass: "Mass",
        Tank_PT_301: "PT 301",
        Tank_TT_301: "TT 301",
        VP_301: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "sm³/h",
        M3H: "m³/h",
        SM3: "sm³",
        M3: "m³",
        BAR: "BarG",
        CC: "°C",
        BARG: "%",
    };
    //================================ Tank_01_Level================================

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/values/attributes/SERVER_SCOPE`
            );



    
          

            const VP_303_High = res.data.find((item: any) => item.key === "VP_303_High");
            setVP_303_High(VP_303_High?.value || null);
            const VP_303_Low = res.data.find((item: any) => item.key === "VP_303_Low");
            setVP_303_Low(VP_303_Low?.value || null);
            const VP_303_Maintain = res.data.find(
                (item: any) => item.key === "VP_303_Maintain"
            );


            const VP_302_High = res.data.find((item: any) => item.key === "VP_302_High");
            setVP_302_High(VP_302_High?.value || null);
            const VP_302_Low = res.data.find((item: any) => item.key === "VP_302_Low");
            setVP_302_Low(VP_302_Low?.value || null);
            const VP_302_Maintain = res.data.find(
                (item: any) => item.key === "VP_302_Maintain"
            );

            const VP_301_High = res.data.find((item: any) => item.key === "VP_301_High");
            setVP_301_High(VP_301_High?.value || null);
            const VP_301_Low = res.data.find((item: any) => item.key === "VP_301_Low");
            setVP_301_Low(VP_301_Low?.value || null);
            const VP_301_Maintain = res.data.find(
                (item: any) => item.key === "VP_301_Maintain"
            );

            const GD_103_High_High = res.data.find((item: any) => item.key === "GD_103_High_High");
            setGD_103_High_High(GD_103_High_High?.value || null);
            const GD_103_High_Low = res.data.find((item: any) => item.key === "GD_103_High_Low");
            setGD_103_High_Low(GD_103_High_Low?.value || null);
            const GD_103_High_Maintain = res.data.find(
                (item: any) => item.key === "GD_103_High_Maintain"
            );


            const GD_102_High_High = res.data.find((item: any) => item.key === "GD_102_High_High");
            setGD_102_High_High(GD_102_High_High?.value || null);
            const GD_102_High_Low = res.data.find((item: any) => item.key === "GD_102_High_Low");
            setGD_102_High_Low(GD_102_High_Low?.value || null);
            const GD_102_High_Maintain = res.data.find(
                (item: any) => item.key === "GD_102_High_Maintain"
            );
            const GD_101_High_High = res.data.find((item: any) => item.key === "GD_101_High_High");
            setGD_101_High_High(GD_101_High_High?.value || null);
            const GD_101_High_Low = res.data.find((item: any) => item.key === "GD_101_High_Low");
            setGD_101_High_Low(GD_101_High_Low?.value || null);
            const GD_101_High_Maintain = res.data.find(
                (item: any) => item.key === "GD_101_High_Maintain"
            );



            
            const GD_103_Low_High = res.data.find((item: any) => item.key === "GD_103_Low_High");
            setGD_103_Low_High(GD_103_Low_High?.value || null);
            const GD_103_Low_Low = res.data.find((item: any) => item.key === "GD_103_Low_Low");
            setGD_103_Low_Low(GD_103_Low_Low?.value || null);
            const GD_103_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_103_Low_Maintain"
            );
            const GD_102_Low_High = res.data.find((item: any) => item.key === "GD_102_Low_High");
            setGD_102_Low_High(GD_102_Low_High?.value || null);
            const GD_102_Low_Low = res.data.find((item: any) => item.key === "GD_102_Low_Low");
            setGD_102_Low_Low(GD_102_Low_Low?.value || null);
            const GD_102_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_102_Low_Maintain"
            );
            const GD_101_Low_High = res.data.find((item: any) => item.key === "GD_101_Low_High");
            setGD_101_Low_High(GD_101_Low_High?.value || null);
            const GD_101_Low_Low = res.data.find((item: any) => item.key === "GD_101_Low_Low");
            setGD_101_Low_Low(GD_101_Low_Low?.value || null);
            const GD_101_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_101_Low_Maintain"
            );

            const SDV_301_High = res.data.find((item: any) => item.key === "SDV_301_High");
            setSDV_301_High(SDV_301_High?.value || null);
            const SDV_301_Low = res.data.find((item: any) => item.key === "SDV_301_Low");
            setSDV_301_Low(SDV_301_Low?.value || null);
            const SDV_301_Maintain = res.data.find(
                (item: any) => item.key === "SDV_301_Maintain"
            );

            const SDV_302_High = res.data.find((item: any) => item.key === "SDV_302_High");
            setSDV_302_High(SDV_302_High?.value || null);
            const SDV_302_Low = res.data.find((item: any) => item.key === "SDV_302_Low");
            setSDV_302_Low(SDV_302_Low?.value || null);
            const SDV_302_Maintain = res.data.find(
                (item: any) => item.key === "SDV_302_Maintain"
            );



            const V1_Flow_Meter_High = res.data.find((item: any) => item.key === "V1_Flow_Meter_High");
            setV1_Flow_Meter_High(V1_Flow_Meter_High?.value || null);
            const V1_Flow_Meter_Low = res.data.find((item: any) => item.key === "V1_Flow_Meter_Low");
            setV1_Flow_Meter_Low(V1_Flow_Meter_Low?.value || null);
            const V1_Flow_Meter_Maintain = res.data.find(
                (item: any) => item.key === "V1_Flow_Meter_Maintain"
            );

            const Pipe_Temp_High = res.data.find((item: any) => item.key === "Pipe_Temp_High");
            setPipe_Temp_High(Pipe_Temp_High?.value || null);
            const Pipe_Temp_Low = res.data.find((item: any) => item.key === "Pipe_Temp_Low");
            setPipe_Temp_Low(Pipe_Temp_Low?.value || null);
            const Pipe_Temp_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Temp_Maintain"
            );


           
            const V2_Flow_Meter_High = res.data.find((item: any) => item.key === "V2_Flow_Meter_High");
            setV2_Flow_Meter_High(V2_Flow_Meter_High?.value || null);
            const V2_Flow_Meter_Low = res.data.find((item: any) => item.key === "V2_Flow_Meter_Low");
            setV2_Flow_Meter_Low(V2_Flow_Meter_Low?.value || null);
            const V2_Flow_Meter_Maintain = res.data.find(
                (item: any) => item.key === "V2_Flow_Meter_Maintain"
            );

        

            const Tank_TT_301_High = res.data.find((item: any) => item.key === "Tank_TT_301_High");
            setTank_TT_301_High(Tank_TT_301_High?.value || null);
            const Tank_TT_301_Low = res.data.find((item: any) => item.key === "Tank_TT_301_Low");
            setTank_TT_301_Low(Tank_TT_301_Low?.value || null);
            const Tank_TT_301_Maintain = res.data.find(
                (item: any) => item.key === "Tank_TT_301_Maintain"
            );
            const Tank_PT_301_High = res.data.find((item: any) => item.key === "Tank_PT_301_High");
            setTank_PT_301_High(Tank_PT_301_High?.value || null);
            const Tank_PT_301_Low = res.data.find((item: any) => item.key === "Tank_PT_301_Low");
            setTank_PT_301_Low(Tank_PT_301_Low?.value || null);
            const Tank_PT_301_Maintain = res.data.find(
                (item: any) => item.key === "Tank_PT_301_Maintain"
            );

            const Tank_01_Volume_High = res.data.find((item: any) => item.key === "Tank_01_Volume_High");
            setTank_01_Volume_High(Tank_01_Volume_High?.value || null);
            const Tank_01_Volume_Low = res.data.find((item: any) => item.key === "Tank_01_Volume_Low");
            setTank_01_Volume_Low(Tank_01_Volume_Low?.value || null);
            const Tank_01_Volume_Maintain = res.data.find(
                (item: any) => item.key === "Tank_01_Volume_Maintain"
            );
            const Pipe_Press_High = res.data.find((item: any) => item.key === "Pipe_Press_High");
            setPipe_Press_High(Pipe_Press_High?.value || null);
            const Pipe_Press_Low = res.data.find((item: any) => item.key === "Pipe_Press_Low");
            setPipe_Press_Low(Pipe_Press_Low?.value || null);
            const Pipe_Press_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Press_Maintain"
            );

            const Tank_01_Mass_High = res.data.find((item: any) => item.key === "Tank_01_Mass_High");
            setTank_01_Mass_High(Tank_01_Mass_High?.value || null);
            const Tank_01_Mass_Low = res.data.find((item: any) => item.key === "Tank_01_Mass_Low");
            setTank_01_Mass_Low(Tank_01_Mass_Low?.value || null);
            const Tank_01_Mass_Maintain = res.data.find(
                (item: any) => item.key === "Tank_01_Mass_Maintain"
            );

            const Tank_01_Level_High = res.data.find((item: any) => item.key === "Tank_01_Level_High");
            setTank_01_Level_High(Tank_01_Level_High?.value || null);
            const Tank_01_Level_Low = res.data.find((item: any) => item.key === "Tank_01_Level_Low");
            setTank_01_Level_Low(Tank_01_Level_Low?.value || null);
            const Tank_01_Level_Maintain = res.data.find(
                (item: any) => item.key === "Tank_01_Level_Maintain"
            );

            const Flow_Meter_Total_High = res.data.find((item: any) => item.key === "Flow_Meter_Total_High");
            setFlow_Meter_Total_High(Flow_Meter_Total_High?.value || null);
            const Flow_Meter_Total_Low = res.data.find((item: any) => item.key === "Flow_Meter_Total_Low");
            setFlow_Meter_Total_Low(Flow_Meter_Total_Low?.value || null);
            const Flow_Meter_Total_Maintain = res.data.find(
                (item: any) => item.key === "Tank_01_Level_Maintain"
            );


            const Flow_Velocity_High = res.data.find((item: any) => item.key === "Flow_Velocity_High");
            setFlow_Velocity_High(Flow_Velocity_High?.value || null);
            const Flow_Velocity_Low = res.data.find((item: any) => item.key === "Flow_Velocity_Low");
            setFlow_Velocity_Low(Flow_Velocity_Low?.value || null);
            const Flow_Velocity_Maintain = res.data.find(
                (item: any) => item.key === "Flow_Velocity_Maintain"
            );

            const Consumption_Flow_High = res.data.find((item: any) => item.key === "Consumption_Flow_High");
            setConsumption_Flow_High(Consumption_Flow_High?.value || null);
            const Consumption_Flow_Low = res.data.find((item: any) => item.key === "Consumption_Flow_Low");
            setConsumption_Flow_Low(Consumption_Flow_Low?.value || null);
            const Consumption_Flow_Maintain = res.data.find(
                (item: any) => item.key === "Consumption_Flow_Maintain"
            );

            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );
 // =================================================================================================================== 
            setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);


            setMaintainVP_303(VP_303_Maintain?.value || false);

            setMaintainVP_302(VP_302_Maintain?.value || false);

            setMaintainVP_301(VP_301_Maintain?.value || false);

            setMaintainGD_103_High(GD_103_High_Maintain?.value || false);

            setMaintainGD_102_High(GD_102_High_Maintain?.value || false);

            setMaintainGD_101_High(GD_101_High_Maintain?.value || false);

            setMaintainGD_103_Low(GD_103_Low_Maintain?.value || false);

            setMaintainGD_102_Low(GD_102_Low_Maintain?.value || false);

            setMaintainGD_101_Low(GD_101_Low_Maintain?.value || false);

            setMaintainSDV_302(SDV_302_Maintain?.value || false);

            setMaintainSDV_301(SDV_301_Maintain?.value || false);

            setMaintainV1_Flow_Meter(V1_Flow_Meter_Maintain?.value || false);
            
            setMaintainV2_Flow_Meter(V2_Flow_Meter_Maintain?.value || false);

            setMaintainPipe_Temp(Pipe_Temp_Maintain?.value || false);

            setMaintainTank_TT_301(Tank_TT_301_Maintain?.value || false);

            setMaintainTank_PT_301(Tank_PT_301_Maintain?.value || false);

            setMaintainTank_01_Volume(Tank_01_Volume_Maintain?.value || false);

            setMaintainTank_01_Mass(Tank_01_Mass_Maintain?.value || false);

            setMaintainTank_01_Level(Tank_01_Level_Maintain?.value || false);

            setMaintainFlow_Meter_Total(Flow_Meter_Total_Maintain?.value || false);

            setMaintainConsumption_Flow(Consumption_Flow_Maintain?.value || false);

            setMaintainFlow_Velocity(Flow_Velocity_Maintain?.value || false);

            setMaintainPipe_Press(Pipe_Press_Maintain?.value || false);
           
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

    
  const [VP_303, setVP_303] = useState<string | null>(null);
  const [VP_303_High, setVP_303_High] = useState<number | null>(null);
  const [VP_303_Low, setVP_303_Low] = useState<number | null>(null);
  const [exceedThresholdVP_303, setExceedThresholdVP_303] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
  const [maintainVP_303, setMaintainVP_303] = useState<boolean>(false);
  
  
  useEffect(() => {
    const VP_303Value = parseFloat(VP_303 as any);
    const highValue = VP_303_High ?? NaN;
    const lowValue = VP_303_Low ?? NaN;

    if (!isNaN(VP_303Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVP_303) {
        setExceedThresholdVP_303(VP_303Value >= highValue || VP_303Value <= lowValue);
    }
}, [VP_303, VP_303_High, VP_303_Low, maintainVP_303]);


  // =================================================================================================================== 



       const [VP_302, setVP_302] = useState<string | null>(null);
       const [VP_302_High, setVP_302_High] = useState<number | null>(null);
       const [VP_302_Low, setVP_302_Low] = useState<number | null>(null);
       const [exceedThresholdVP_302, setExceedThresholdVP_302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainVP_302, setMaintainVP_302] = useState<boolean>(false);
       
  
       useEffect(() => {
        const VP_302Value = parseFloat(VP_302 as any);
        const highValue = VP_302_High ?? NaN;
        const lowValue = VP_302_Low ?? NaN;
    
        if (!isNaN(VP_302Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVP_302) {
            setExceedThresholdVP_302(VP_302Value >= highValue || VP_302Value <= lowValue);
        }
    }, [VP_302, VP_302_High, VP_302_Low, maintainVP_302]);
       

  
       // =================================================================================================================== 


       const [VP_301, setVP_301] = useState<string | null>(null);

       const [VP_301_High, setVP_301_High] = useState<number | null>(null);
       const [VP_301_Low, setVP_301_Low] = useState<number | null>(null);
       const [exceedThresholdVP_301, setExceedThresholdVP_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       
       const [maintainVP_301, setMaintainVP_301] = useState<boolean>(false);
       
       
       useEffect(() => {
        const VP_301Value = parseFloat(VP_301 as any);
        const highValue = VP_301_High ?? NaN;
        const lowValue = VP_301_Low ?? NaN;
    
        if (!isNaN(VP_301Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVP_301) {
            setExceedThresholdVP_301(VP_301Value >= highValue || VP_301Value <= lowValue);
        }
    }, [VP_301, VP_301_High, VP_301_Low, maintainVP_301]);
       

  
       // =================================================================================================================== 

       const [GD_103_High, setGD_103_High] = useState<string | null>(null);
       const [GD_103_High_High, setGD_103_High_High] = useState<number | null>(null);
       const [GD_103_High_Low, setGD_103_High_Low] = useState<number | null>(null);
       const [exceedThresholdGD_103_High, setExceedThresholdGD_103_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD_103_High, setMaintainGD_103_High] = useState<boolean>(false);
       
       
       useEffect(() => {
        const GD_103_HighValue = parseFloat(GD_103_High as any);
        const highValue = GD_103_High_High ?? NaN;
        const lowValue = GD_103_High_Low ?? NaN;
    
        if (!isNaN(GD_103_HighValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_103_High) {
            setExceedThresholdGD_103_High(GD_103_HighValue >= highValue || GD_103_HighValue <= lowValue);
        }
    }, [GD_103_High, GD_103_High_High, GD_103_High_Low, maintainGD_103_High]);

  
  
       // =================================================================================================================== 

       const [GD_102_High, setGD_102_High] = useState<string | null>(null);
       const [GD_102_High_High, setGD_102_High_High] = useState<number | null>(null);
       const [GD_102_High_Low, setGD_102_High_Low] = useState<number | null>(null);
       const [exceedThresholdGD_102_High, setExceedThresholdGD_102_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD_102_High, setMaintainGD_102_High] = useState<boolean>(false);
       
       
       useEffect(() => {
        const GD_102_HighValue = parseFloat(GD_102_High as any);
        const highValue = GD_102_High_High ?? NaN;
        const lowValue = GD_102_High_Low ?? NaN;
    
        if (!isNaN(GD_102_HighValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_102_High) {
            setExceedThresholdGD_102_High(GD_102_HighValue >= highValue || GD_102_HighValue <= lowValue);
        }
    }, [GD_102_High, GD_102_High_High, GD_102_High_Low, maintainGD_102_High]);
       
 
  
       // =================================================================================================================== 

 // =================================================================================================================== 

 const [GD_101_High, setGD_101_High] = useState<string | null>(null);
    
 const [GD_101_High_High, setGD_101_High_High] = useState<number | null>(null);
 const [GD_101_High_Low, setGD_101_High_Low] = useState<number | null>(null);
 const [exceedThresholdGD_101_High, setExceedThresholdGD_101_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainGD_101_High, setMaintainGD_101_High] = useState<boolean>(false);
 
 
 useEffect(() => {
    const GD_101_HighValue = parseFloat(GD_101_High as any);
    const highValue = GD_101_High_High ?? NaN;
    const lowValue = GD_101_High_Low ?? NaN;

    if (!isNaN(GD_101_HighValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_101_High) {
        setExceedThresholdGD_101_High(GD_101_HighValue >= highValue || GD_101_HighValue <= lowValue);
    }
}, [GD_101_High, GD_101_High_High, GD_101_High_Low, maintainGD_101_High]);
 


     // =================================================================================================================== 

     const [GD_103_Low, setGD_103_Low] = useState<string | null>(null);
     const [GD_103_Low_High, setGD_103_Low_High] = useState<number | null>(null);
     const [GD_103_Low_Low, setGD_103_Low_Low] = useState<number | null>(null);
     const [exceedThresholdGD_103_Low, setExceedThresholdGD_103_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainGD_103_Low, setMaintainGD_103_Low] = useState<boolean>(false);
     
     
     useEffect(() => {
        const GD_103_LowValue = parseFloat(GD_103_Low as any);
        const highValue = GD_103_Low_High ?? NaN;
        const lowValue = GD_103_Low_Low ?? NaN;
    
        if (!isNaN(GD_103_LowValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_103_Low) {
            setExceedThresholdGD_103_Low(GD_103_LowValue >= highValue || GD_103_LowValue <= lowValue);
        }
    }, [GD_103_Low, GD_103_Low_High, GD_103_Low_Low, maintainGD_103_Low]);
      
     
   
 
     // =================================================================================================================== 
            // =================================================================================================================== 
     
            const [GD_102_Low, setGD_102_Low] = useState<string | null>(null);
            const [GD_102_Low_High, setGD_102_Low_High] = useState<number | null>(null);
            const [GD_102_Low_Low, setGD_102_Low_Low] = useState<number | null>(null);
            const [exceedThresholdGD_102_Low, setExceedThresholdGD_102_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainGD_102_Low, setMaintainGD_102_Low] = useState<boolean>(false);
            
            
            useEffect(() => {
                const GD_102_LowValue = parseFloat(GD_102_Low as any);
                const highValue = GD_102_Low_High ?? NaN;
                const lowValue = GD_102_Low_Low ?? NaN;
            
                if (!isNaN(GD_102_LowValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_102_Low) {
                    setExceedThresholdGD_102_Low(GD_102_LowValue >= highValue || GD_102_LowValue <= lowValue);
                }
            }, [GD_102_Low, GD_102_Low_High, GD_102_Low_Low, maintainGD_102_Low]);
              
            
         // =================================================================================================================== 

         const [GD_101_Low, setGD_101_Low] = useState<string | null>(null);

         const [GD_101_Low_High, setGD_101_Low_High] = useState<number | null>(null);
         const [GD_101_Low_Low, setGD_101_Low_Low] = useState<number | null>(null);
         const [exceedThresholdGD_101_Low, setExceedThresholdGD_101_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         const [maintainGD_101_Low, setMaintainGD_101_Low] = useState<boolean>(false);
         
         
         useEffect(() => {
            const GD_101_LowValue = parseFloat(GD_101_Low as any);
            const highValue = GD_101_Low_High ?? NaN;
            const lowValue = GD_101_Low_Low ?? NaN;
        
            if (!isNaN(GD_101_LowValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_101_Low) {
                setExceedThresholdGD_101_Low(GD_101_LowValue >= highValue || GD_101_LowValue <= lowValue);
            }
        }, [GD_101_Low, GD_101_Low_High, GD_101_Low_Low, maintainGD_101_Low]);
         
        
        
        
         // =================================================================================================================== 

 // =================================================================================================================== 

 const [SDV_301, setSDV_301] = useState<string | null>(null);
 const [SDV_301_High, setSDV_301_High] = useState<number | null>(null);
 const [SDV_301_Low, setSDV_301_Low] = useState<number | null>(null);
 const [exceedThresholdSDV_301, setExceedThresholdSDV_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainSDV_301, setMaintainSDV_301] = useState<boolean>(false);
 
 
 useEffect(() => {
    const SDV_301Value = parseFloat(SDV_301 as any);
    const highValue = SDV_301_High ?? NaN;
    const lowValue = SDV_301_Low ?? NaN;

    if (!isNaN(SDV_301Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_301) {
        setExceedThresholdSDV_301(SDV_301Value >= highValue || SDV_301Value <= lowValue);
    }
}, [SDV_301, SDV_301_High, SDV_301_Low, maintainSDV_301]);
  
 


 // =================================================================================================================== 


     // =================================================================================================================== 




     // =================================================================================================================== 

const [SDV_302, setSDV_302] = useState<string | null>(null);

const [SDV_302_High, setSDV_302_High] = useState<number | null>(null);
const [SDV_302_Low, setSDV_302_Low] = useState<number | null>(null);
const [exceedThresholdSDV_302, setExceedThresholdSDV_302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSDV_302, setMaintainSDV_302] = useState<boolean>(false);


useEffect(() => {
    const SDV_302Value = parseFloat(SDV_302 as any);
    const highValue = SDV_302_High ?? NaN;
    const lowValue = SDV_302_Low ?? NaN;

    if (!isNaN(SDV_302Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_302) {
        setExceedThresholdSDV_302(SDV_302Value >= highValue || SDV_302Value <= lowValue);
    }
}, [SDV_302, SDV_302_High, SDV_302_Low, maintainSDV_302]);




// =================================================================================================================== 




 // =================================================================================================================== 

const [Pipe_Temp, setPipe_Temp] = useState<string | null>(null);

const [Pipe_Temp_High, setPipe_Temp_High] = useState<number | null>(null);
const [Pipe_Temp_Low, setPipe_Temp_Low] = useState<number | null>(null);
const [exceedThresholdPipe_Temp, setExceedThresholdPipe_Temp] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainPipe_Temp, setMaintainPipe_Temp] = useState<boolean>(false);

useEffect(() => {
    const Pipe_TempValue = parseFloat(Pipe_Temp as any);
    const highValue = Pipe_Temp_High ?? NaN;
    const lowValue = Pipe_Temp_Low ?? NaN;

    if (!isNaN(Pipe_TempValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPipe_Temp) {
        setExceedThresholdPipe_Temp(Pipe_TempValue >= highValue || Pipe_TempValue <= lowValue);
    }
}, [Pipe_Temp, Pipe_Temp_High, Pipe_Temp_Low, maintainPipe_Temp]);




// =================================================================================================================== 


    
 
     
     
     // =================================================================================================================== 
     
     
     const [V2_Flow_Meter, setV2_Flow_Meter] = useState<string | null>(null);
     const [V2_Flow_Meter_High, setV2_Flow_Meter_High] = useState<number | null>(null);
     const [V2_Flow_Meter_Low, setV2_Flow_Meter_Low] = useState<number | null>(null);
     const [exceedThresholdV2_Flow_Meter, setExceedThresholdV2_Flow_Meter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainV2_Flow_Meter, setMaintainV2_Flow_Meter] = useState<boolean>(false);
     
     
     useEffect(() => {
        const V2_Flow_MeterValue = parseFloat(V2_Flow_Meter as any);
        const highValue = V2_Flow_Meter_High ?? NaN;
        const lowValue = V2_Flow_Meter_Low ?? NaN;
    
        if (!isNaN(V2_Flow_MeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainV2_Flow_Meter) {
            setExceedThresholdV2_Flow_Meter(V2_Flow_MeterValue >= highValue || V2_Flow_MeterValue <= lowValue);
        }
    }, [V2_Flow_Meter, V2_Flow_Meter_High, V2_Flow_Meter_Low, maintainV2_Flow_Meter]);
     
     
     
     
     // =================================================================================================================== 


      // =================================================================================================================== 


     const [Tank_TT_301, setTank_TT_301] = useState<string | null>(null);

     const [Tank_TT_301_High, setTank_TT_301_High] = useState<number | null>(null);
     const [Tank_TT_301_Low, setTank_TT_301_Low] = useState<number | null>(null);
     const [exceedThresholdTank_TT_301, setExceedThresholdTank_TT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTank_TT_301, setMaintainTank_TT_301] = useState<boolean>(false);
     
     
     useEffect(() => {
        const Tank_TT_301Value = parseFloat(Tank_TT_301 as any);
        const highValue = Tank_TT_301_High ?? NaN;
        const lowValue = Tank_TT_301_Low ?? NaN;
    
        if (!isNaN(Tank_TT_301Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTank_TT_301) {
            setExceedThresholdTank_TT_301(Tank_TT_301Value >= highValue || Tank_TT_301Value <= lowValue);
        }
    }, [Tank_TT_301, Tank_TT_301_High, Tank_TT_301_Low, maintainTank_TT_301]);
      

     // =================================================================================================================== 


     const [V1_Flow_Meter, setV1_Flow_Meter] = useState<string | null>(null);

     const [V1_Flow_Meter_High, setV1_Flow_Meter_High] = useState<number | null>(null);
     const [V1_Flow_Meter_Low, setV1_Flow_Meter_Low] = useState<number | null>(null);
     const [exceedThresholdV1_Flow_Meter, setExceedThresholdV1_Flow_Meter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainV1_Flow_Meter, setMaintainV1_Flow_Meter] = useState<boolean>(false);
     
     useEffect(() => {
        const V1_Flow_MeterValue = parseFloat(V1_Flow_Meter as any);
        const highValue = V1_Flow_Meter_High ?? NaN;
        const lowValue = V1_Flow_Meter_Low ?? NaN;
    
        if (!isNaN(V1_Flow_MeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainV1_Flow_Meter) {
            setExceedThresholdV1_Flow_Meter(V1_Flow_MeterValue >= highValue || V1_Flow_MeterValue <= lowValue);
        }
    }, [V1_Flow_Meter, V1_Flow_Meter_High, V1_Flow_Meter_Low, maintainV1_Flow_Meter]);
     
   
     
     // =================================================================================================================== 


     // =================================================================================================================== 



          const [Tank_PT_301, setTank_PT_301] = useState<string | null>(null);
  
          const [Tank_PT_301_High, setTank_PT_301_High] = useState<number | null>(null);
          const [Tank_PT_301_Low, setTank_PT_301_Low] = useState<number | null>(null);
          const [exceedThresholdTank_PT_301, setExceedThresholdTank_PT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          const [maintainTank_PT_301, setMaintainTank_PT_301] = useState<boolean>(false);
          
          
          useEffect(() => {
            const Tank_PT_301Value = parseFloat(Tank_PT_301 as any);
            const highValue = Tank_PT_301_High ?? NaN;
            const lowValue = Tank_PT_301_Low ?? NaN;
        
            if (!isNaN(Tank_PT_301Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTank_PT_301) {
                setExceedThresholdTank_PT_301(Tank_PT_301Value >= highValue || Tank_PT_301Value <= lowValue);
            }
        }, [Tank_PT_301, Tank_PT_301_High, Tank_PT_301_Low, maintainTank_PT_301]);
          
           
     
          // =================================================================================================================== 


          const [Tank_01_Volume, setTank_01_Volume] = useState<string | null>(null);
 
          const [Tank_01_Volume_High, setTank_01_Volume_High] = useState<number | null>(null);
          const [Tank_01_Volume_Low, setTank_01_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdTank_01_Volume, setExceedThresholdTank_01_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainTank_01_Volume, setMaintainTank_01_Volume] = useState<boolean>(false);
          
          
          useEffect(() => {
            const Tank_01_VolumeValue = parseFloat(Tank_01_Volume as any);
            const highValue = Tank_01_Volume_High ?? NaN;
            const lowValue = Tank_01_Volume_Low ?? NaN;
        
            if (!isNaN(Tank_01_VolumeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTank_01_Volume) {
                setExceedThresholdTank_01_Volume(Tank_01_VolumeValue >= highValue || Tank_01_VolumeValue <= lowValue);
            }
        }, [Tank_01_Volume, Tank_01_Volume_High, Tank_01_Volume_Low, maintainTank_01_Volume]);
          
       
    
         
         // =================================================================================================================== 

         const [Pipe_Press, setPipe_Press] = useState<string | null>(null);

        const [Pipe_Press_High, setPipe_Press_High] = useState<number | null>(null);
        const [Pipe_Press_Low, setPipe_Press_Low] = useState<number | null>(null);
        const [exceedThresholdPipe_Press, setExceedThresholdPipe_Press] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        const [maintainPipe_Press, setMaintainPipe_Press] = useState<boolean>(false);
 
 
        useEffect(() => {
            const Pipe_PressValue = parseFloat(Pipe_Press as any);
            const highValue = Pipe_Press_High ?? NaN;
            const lowValue = Pipe_Press_Low ?? NaN;
        
            if (!isNaN(Pipe_PressValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPipe_Press) {
                setExceedThresholdPipe_Press(Pipe_PressValue >= highValue || Pipe_PressValue <= lowValue);
            }
        }, [Pipe_Press, Pipe_Press_High, Pipe_Press_Low, maintainPipe_Press]);
        
         // =================================================================================================================== 
        
        
        const [Tank_01_Mass, setTank_01_Mass] = useState<string | null>(null);

        const [Tank_01_Mass_High, setTank_01_Mass_High] = useState<number | null>(null);
        const [Tank_01_Mass_Low, setTank_01_Mass_Low] = useState<number | null>(null);
        const [exceedThresholdTank_01_Mass, setExceedThresholdTank_01_Mass] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainTank_01_Mass, setMaintainTank_01_Mass] = useState<boolean>(false);
        
        
        useEffect(() => {
            const Tank_01_MassValue = parseFloat(Tank_01_Mass as any);
            const highValue = Tank_01_Mass_High ?? NaN;
            const lowValue = Tank_01_Mass_Low ?? NaN;
        
            if (!isNaN(Tank_01_MassValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTank_01_Mass) {
                setExceedThresholdTank_01_Mass(Tank_01_MassValue >= highValue || Tank_01_MassValue <= lowValue);
            }
        }, [Tank_01_Mass, Tank_01_Mass_High, Tank_01_Mass_Low, maintainTank_01_Mass]);
        
         
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [Tank_01_Level, setTank_01_Level] = useState<string | null>(null);
   
        const [Tank_01_Level_High, setTank_01_Level_High] = useState<number | null>(null);
        const [Tank_01_Level_Low, setTank_01_Level_Low] = useState<number | null>(null);
        const [exceedThresholdTank_01_Level, setExceedThresholdTank_01_Level] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainTank_01_Level, setMaintainTank_01_Level] = useState<boolean>(false);
        
        
        useEffect(() => {
            const Tank_01_LevelValue = parseFloat(Tank_01_Level as any);
            const highValue = Tank_01_Level_High ?? NaN;
            const lowValue = Tank_01_Level_Low ?? NaN;
        
            if (!isNaN(Tank_01_LevelValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTank_01_Level) {
                setExceedThresholdTank_01_Level(Tank_01_LevelValue >= highValue || Tank_01_LevelValue <= lowValue);
            }
        }, [Tank_01_Level, Tank_01_Level_High, Tank_01_Level_Low, maintainTank_01_Level]);
        
 
        // =================================================================================================================== 
        
          // =================================================================================================================== 
        
          const [Flow_Meter_Total, setFlow_Meter_Total] = useState<string | null>(null);
       
          const [Flow_Meter_Total_High, setFlow_Meter_Total_High] = useState<number | null>(null);
          const [Flow_Meter_Total_Low, setFlow_Meter_Total_Low] = useState<number | null>(null);
          const [exceedThresholdFlow_Meter_Total, setExceedThresholdFlow_Meter_Total] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainFlow_Meter_Total, setMaintainFlow_Meter_Total] = useState<boolean>(false);
          
          
          useEffect(() => {
              if (typeof Flow_Meter_Total_High === 'string' && typeof Flow_Meter_Total_Low === 'string' && Flow_Meter_Total !== null && maintainFlow_Meter_Total === false
              ) {
                  const highValue = parseFloat(Flow_Meter_Total_High);
                  const lowValue = parseFloat(Flow_Meter_Total_Low);
                  const Flow_Meter_TotalValue = parseFloat(Flow_Meter_Total);
          
                  if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Flow_Meter_TotalValue)) {
                      if (highValue <= Flow_Meter_TotalValue || Flow_Meter_TotalValue <= lowValue) {
                              setExceedThresholdFlow_Meter_Total(true);
                      } else {
                         setExceedThresholdFlow_Meter_Total(false);
                      }
                  } 
              } 
          }, [Flow_Meter_Total_High, Flow_Meter_Total, Flow_Meter_Total_Low,maintainFlow_Meter_Total]);
          
       
          
          
          // =================================================================================================================== 



                  // =================================================================================================================== 
        
                  const [Consumption_Flow, setConsumption_Flow] = useState<string | null>(null);
                  const [Consumption_Flow_High, setConsumption_Flow_High] = useState<number | null>(null);
                  const [Consumption_Flow_Low, setConsumption_Flow_Low] = useState<number | null>(null);
                  const [exceedThresholdConsumption_Flow, setExceedThresholdConsumption_Flow] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                  
                  const [maintainConsumption_Flow, setMaintainConsumption_Flow] = useState<boolean>(false);
                  
                  useEffect(() => {
                    const Consumption_FlowValue = parseFloat(Consumption_Flow as any);
                    const highValue = Consumption_Flow_High ?? NaN;
                    const lowValue = Consumption_Flow_Low ?? NaN;
                
                    if (!isNaN(Consumption_FlowValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainConsumption_Flow) {
                        setExceedThresholdConsumption_Flow(Consumption_FlowValue >= highValue || Consumption_FlowValue <= lowValue);
                    }
                }, [Consumption_Flow, Consumption_Flow_High, Consumption_Flow_Low, maintainConsumption_Flow]);
                
                  
                  
      
                  
                  // =================================================================================================================== 


                         const [Flow_Velocity, setFlow_Velocity] = useState<string | null>(null);
                
                         const [Flow_Velocity_High, setFlow_Velocity_High] = useState<number | null>(null);
                         const [Flow_Velocity_Low, setFlow_Velocity_Low] = useState<number | null>(null);
                         const [exceedThresholdFlow_Velocity, setExceedThresholdFlow_Velocity] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                         
                         const [maintainFlow_Velocity, setMaintainFlow_Velocity] = useState<boolean>(false);
                         
                         
                         useEffect(() => {
                            const Flow_VelocityValue = parseFloat(Flow_Velocity as any);
                            const highValue = Flow_Velocity_High ?? NaN;
                            const lowValue = Flow_Velocity_Low ?? NaN;
                        
                            if (!isNaN(Flow_VelocityValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFlow_Velocity) {
                                setExceedThresholdFlow_Velocity(Flow_VelocityValue >= highValue || Flow_VelocityValue <= lowValue);
                            }
                        }, [Flow_Velocity, Flow_Velocity_High, Flow_Velocity_Low, maintainFlow_Velocity]);
                         
                     
                         
                         
  

     //======================================================================================================================


     const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
                
     const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
     const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
     const [exceedThresholdPLC_Conn_STT, setExceedThresholdPLC_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);
     
     
     useEffect(() => {
        const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
        const highValue = PLC_Conn_STT_High ?? NaN;
        const lowValue = PLC_Conn_STT_Low ?? NaN;
    
        if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
            setExceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
        }
    }, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);
     

     
  

//======================================================================================================================
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
            if (node.id === "Tank_01_Level") {
                const roundedPT02 =
                    Tank_01_Level !== null
                        ? parseFloat(Tank_01_Level).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTank_01_Level &&
                                        !maintainTank_01_Level
                                            ? "#ff5656"
                                            : maintainTank_01_Level
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
                                        {ValueGas.Tank_01_Level} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Tank_01_Level)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Tank_01_Volume_DATA") {
                const roundedPT02 =
                    Tank_01_Volume !== null
                        ? parseFloat(Tank_01_Volume).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTank_01_Volume &&
                                        !maintainTank_01_Volume
                                            ? "#ff5656"
                                            : maintainTank_01_Volume
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
                                        {ValueGas.Tank_01_Volume} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Tank_01_Volume)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    L
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Tank_01_Mass_DATA") {
                const roundedPT02 =
                    Tank_01_Mass !== null
                        ? parseFloat(Tank_01_Mass).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTank_01_Mass &&
                                        !maintainTank_01_Mass
                                            ? "#ff5656"
                                            : maintainTank_01_Mass
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
                                        {ValueGas.Tank_01_Mass} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Tank_01_Mass)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    Kg
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Tank_PT_301_DATA") {
                const roundedPT02 =
                    Tank_PT_301 !== null
                        ? parseFloat(Tank_PT_301).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTank_PT_301 &&
                                        !maintainTank_PT_301
                                            ? "#ff5656"
                                            : maintainTank_PT_301
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
                                        {ValueGas.Tank_PT_301} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Tank_PT_301)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    Bar
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Tank_TT_301_DATA") {
                const roundedPT02 =
                    Tank_TT_301 !== null
                        ? parseFloat(Tank_TT_301).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdTank_TT_301 &&
                                        !maintainTank_TT_301
                                            ? "#ff5656"
                                            : maintainTank_TT_301
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
                                        {ValueGas.Tank_TT_301} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Tank_TT_301)}
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

            if (node.id === "TT_LINE3_TOP_DATA") {
                const roundedPT02 =
                    Pipe_Temp !== null ? parseFloat(Pipe_Temp).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPipe_Temp &&
                                        !maintainPipe_Temp
                                            ? "#ff5656"
                                            : maintainPipe_Temp
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
                                        {ValueGas.EVC_01_Temperature} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Pipe_Temp)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_LINE3_BOTTOM_DATA") {
                const roundedPT02 =
                    Pipe_Press !== null
                        ? parseFloat(Pipe_Press).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPipe_Press &&
                                        !maintainPipe_Press
                                            ? "#ff5656"
                                            : maintainPipe_Press
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
                                        {ValueGas.EVC_02_Temperature} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(Pipe_Press)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(PCV_6001B)}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(PCV_6002A)}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 500,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(PCV_6002B)}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GAUGE1_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPipe_Temp &&
                                        !maintainPipe_Temp
                                            ? "#ff5656"
                                            : exceedThresholdPipe_Temp
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>TT-301</p>
                                <p style={{ color: colorData }}> {formatValue(Pipe_Temp)}</p>
                                <p style={{ color: colorNameValue }}>°C</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GAUGE2_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPipe_Press &&
                                        !maintainPipe_Press
                                            ? "#ff5656"
                                            : maintainPipe_Press
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>PT-301</p>
                                <p style={{ color: colorData }}>{formatValue(Pipe_Press)}</p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "VP") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_301 === "1"
                                    ? VP_ON
                                    : VP_301 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "VP2") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_302 === "1"
                                    ? VP_ON
                                    : VP_302 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "VP3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {VP_303 === "1"
                                    ? VP_ON
                                    : VP_303 === "0"
                                    ? VP_OFF
                                    : VP_Black}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_301") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV_301 === "1"
                                    ? SVD_NO
                                    : SDV_301 === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "SDV_302") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {SDV_302 === "1"
                                    ? SVD_NO
                                    : SDV_302 === "0"
                                    ? SVD_NC
                                    : null}
                            </div>
                        ),
                    },
                };
            }
            {
                icon40;
            }

            if (node.id === "GD_101") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_101_High === "0" && GD_101_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: Normal
                                    </span>
                                ) : GD_101_High === "0" &&
                                  GD_101_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 20%
                                    </span>
                                ) : GD_101_High === "1" &&
                                  GD_101_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 40%
                                    </span>
                                ) : GD_101_High === "1" &&
                                  GD_101_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-101: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GD_102") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_102_High === "0" && GD_102_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: Normal
                                    </span>
                                ) : GD_102_High === "0" &&
                                  GD_102_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 20%
                                    </span>
                                ) : GD_102_High === "1" &&
                                  GD_102_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 40%
                                    </span>
                                ) : GD_102_High === "1" &&
                                  GD_102_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "red",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-102: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "GD_103") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                {GD_103_High === "0" && GD_103_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: Normal
                                    </span>
                                ) : GD_103_High === "0" &&
                                  GD_103_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 20%
                                    </span>
                                ) : GD_103_High === "1" &&
                                  GD_103_Low === "0" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 40%
                                    </span>
                                ) : GD_103_High === "1" &&
                                  GD_103_Low === "1" ? (
                                    <span
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            color: "green",
                                            padding: 5,
                                            background: "white",
                                            borderRadius: 5,
                                        }}
                                    >
                                        {" "}
                                        GD-103: 40%
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Flow_Meter_Total") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFlow_Meter_Total &&
                                        !maintainFlow_Meter_Total
                                            ? "#ff5656"
                                            : maintainTank_01_Level
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>Total</p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(Flow_Meter_Total)}
                                </p>
                                <p style={{ color: colorNameValue }}>m³</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Flow_Velocity") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFlow_Velocity &&
                                        !maintainFlow_Velocity
                                            ? "#ff5656"
                                            : maintainFlow_Velocity
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    Flow rate :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(Flow_Velocity)}
                                </p>
                                <p style={{ color: colorNameValue }}>m³/h</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "Consumption_Flow") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    borderRadius: 5,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdConsumption_Flow &&
                                        !maintainConsumption_Flow
                                            ? "#ff5656"
                                            : maintainConsumption_Flow
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    {" "}
                                    Volume :
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {formatValue(Consumption_Flow)}
                                </p>
                                <p style={{ color: colorNameValue }}>m³</p>
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
                                    fontSize: 20,
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
                                        PLC :{" "}
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        {PLC_Conn_STT == "1" ? (
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

                                            fontSize: 20,
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
            (exceedThresholdVP_303 && !maintainVP_303) ||
            (exceedThresholdVP_302 && !maintainVP_302) ||
            (exceedThresholdVP_301 && !maintainVP_301) ||
            (exceedThresholdGD_103_High && !maintainGD_103_High) ||
            (exceedThresholdGD_102_High && !maintainGD_102_High) ||
            (exceedThresholdGD_101_High && !maintainGD_101_High) ||
            (exceedThresholdGD_103_Low && !maintainGD_103_Low) ||
            (exceedThresholdGD_102_Low && !maintainGD_102_Low) ||
            (exceedThresholdGD_101_Low && !maintainGD_101_Low) ||
            (exceedThresholdSDV_301 && !maintainSDV_301) ||
            (exceedThresholdSDV_302 && !maintainSDV_302) ||
            (exceedThresholdV1_Flow_Meter && !maintainV1_Flow_Meter) ||
            (exceedThresholdV2_Flow_Meter && !maintainV2_Flow_Meter) ||
            (exceedThresholdPipe_Temp && !maintainPipe_Temp) ||
            (exceedThresholdPipe_Press && !maintainPipe_Press) ||
            (exceedThresholdTank_TT_301 && !maintainTank_TT_301) ||
            (exceedThresholdTank_PT_301 && !maintainTank_PT_301) ||
            (exceedThresholdTank_01_Volume && !maintainTank_01_Volume) ||
            (exceedThresholdTank_01_Mass && !maintainTank_01_Mass) ||
            (exceedThresholdTank_01_Level && !maintainTank_01_Level) ||
            (exceedThresholdConsumption_Flow && !maintainConsumption_Flow) ||
            (exceedThresholdFlow_Velocity && !maintainFlow_Velocity) ||
            (exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT)
        ) {
            setAlarmMessage("ALARM");
        } else if (
            maintainVP_303 ||
            maintainVP_302 ||
            maintainVP_301 ||
            maintainGD_103_High ||
            maintainGD_102_High ||
            maintainGD_101_High ||
            maintainGD_103_Low ||
            maintainGD_102_Low ||
            maintainGD_101_Low ||
            maintainSDV_301 ||
            maintainSDV_302 ||
            maintainV1_Flow_Meter ||
            maintainV2_Flow_Meter ||
            maintainPipe_Temp ||
            maintainPipe_Press ||
            maintainTank_TT_301 ||
            maintainTank_PT_301 ||
            maintainTank_01_Volume ||
            maintainTank_01_Mass ||
            maintainTank_01_Level ||
            maintainConsumption_Flow ||
            maintainFlow_Velocity ||
            maintainPLC_Conn_STT
        ) {
            setAlarmMessage("Maintaining");
        } else {
            setAlarmMessage(null);
        }
    }, [
        exceedThresholdVP_303,
        exceedThresholdVP_302,
        exceedThresholdVP_301,
        exceedThresholdGD_103_High,
        exceedThresholdGD_102_High,
        exceedThresholdGD_101_High,
        exceedThresholdGD_103_Low,
        exceedThresholdGD_102_Low,
        exceedThresholdGD_101_Low,
        exceedThresholdSDV_301,
        exceedThresholdSDV_302,
        exceedThresholdV1_Flow_Meter,
        exceedThresholdV2_Flow_Meter,
        exceedThresholdPipe_Temp,
        exceedThresholdPipe_Press,
        exceedThresholdTank_TT_301,
        exceedThresholdTank_PT_301,
        exceedThresholdTank_01_Volume,
        exceedThresholdTank_01_Mass,
        exceedThresholdTank_01_Level,
        exceedThresholdConsumption_Flow,
        exceedThresholdFlow_Velocity,
        exceedThresholdPLC_Conn_STT,
        maintainVP_303,
        maintainVP_302,
        maintainVP_301,
        maintainGD_103_High,
        maintainGD_102_High,
        maintainGD_101_High,
        maintainGD_103_Low,
        maintainGD_102_Low,
        maintainGD_101_Low,
        maintainSDV_301,
        maintainSDV_302,
        maintainV1_Flow_Meter,
        maintainV2_Flow_Meter,
        maintainPipe_Temp,
        maintainPipe_Press,
        maintainTank_TT_301,
        maintainTank_PT_301,
        maintainTank_01_Volume,
        maintainTank_01_Mass,
        maintainTank_01_Level,
        maintainConsumption_Flow,
        maintainFlow_Velocity,
        maintainPLC_Conn_STT
    ]);
    
    // const storedPositionString = localStorage.getItem("positionMEIKO");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
              const initialPositions = {
              AlarmCenter: 
              {x: -1070.656010579281, y: 948.6025727841745},
              Arrow1: { x: -1798.7404159285081, y: 1350.2778201259491 },
              Arrow2: { x: -1799.4040618064364, y: 1572.6893953174156 },
              Arrow3: { x: -1795.5121036284552, y: 1137.7753315581074 },
              Arrow4: { x: -1918.8136370318027, y: 1639.7830586231873 },
              Arrow5: { x: -1199.2011725396155, y: 1409.6455630137743 },
              Arrow6: { x: -2588.820048024849, y: 1853.3368908473872 },
              Consumption_Flow: {
                  x: -1425.9118125115174,
                  y: 1692.2083168548222,
              },
              Flow_Meter_Total: {
                  x: -1375.2483772861924,
                  y: 1583.7634831928456,
              },
              Flow_Velocity: { x: -1425.8140032143524, y: 1764.5714815528183 },
              GAUGE1: { x: -1979.7921364437966, y: 1791.7199182172499 },
              GAUGE1_DATA: { x: -2353.3846200774683, y: 1714.2404706328946 },
              GAUGE1_line: { x: -1947.0017814120106, y: 1855.1775750371462 },
              GAUGE1_none: { x: -2238.123813829105, y: 1813.6161327796551 },
              GAUGE2: { x: -2270.994422607397, y: 1790.364861090794 },
              GAUGE2_DATA: { x: -2063.1656207491224, y: 1714.1082591069098 },
              GAUGE2_line: { x: -2238.5985837922944, y: 1853.4921275399352 },
              GAUGE2_none: { x: -1948.0954313302516, y: 1815.0493435546312 },
              GD_101: { x: -2571.9675482403272, y: 1569.9067122209883 },
              GD_101_image: { x: -2528.2178196178907, y: 1611.421475537121 },
              GD_102: { x: -1585.7607414284262, y: 1132.057625207372 },
              GD_102_image: { x: -1547.2403069234554, y: 1173.5300034762545 },
              GD_103: { x: -1311.1208817172487, y: 1473.3217803471587 },
              GD_103_image: { x: -1265.9894560141006, y: 1515.7980343845345 },
              SDV_301: { x: -2171.8467915457322, y: 1609.5774078379447 },
              SDV_301_Name: { x: -2205.729548004464, y: 1571.7428553032842 },
              SDV_302: { x: -1658.7588940297596, y: 1828.297501126015 },
              SDV_302_Name: { x: -1690.2215668253937, y: 1789.501694210081 },
              TankLine: { x: -1085.943275857915, y: 1196.7075313031683 },
              TankMEIKO: { x: -2658.5437371549433, y: 1048.221263138637 },
              Tank_01_Level: { x: -2404.2104502406, y: 1160.458933174752 },
              Tank_01_Mass_DATA: {
                  x: -2261.9645049248525,
                  y: 1339.3080409726458,
              },
              Tank_01_Volume_DATA: {
                  x: -2262.1242354364954,
                  y: 1256.1486040736902,
              },
              Tank_PT_301_DATA: { x: -2606.351168611004, y: 1256.562365426704 },
              Tank_TT_301_DATA: {
                  x: -2604.858785680239,
                  y: 1339.9729547971892,
              },
              V1_Flow_Meter: { x: -1126.4637630930329, y: 1023.2343195212084 },
              V2_Flow_Meter: { x: -1126.4637630930329, y: 1023.2343195212084 },
              VP: { x: -1695.4717144848992, y: 1072.4723415063643 },
              VP2: { x: -1691.4593235868685, y: 1288.4691872494548 },
              VP2_Name: { x: -1694.3571945467743, y: 1240.5997579642828 },
              VP3: { x: -1692.5108117815766, y: 1504.3166370162628 },
              VP3_Name: { x: -1693.0688436867517, y: 1458.0897040093807 },
              VP_Name: { x: -1694.8736173773216, y: 1026.7209168657334 },
              V_V1_V2: { x: -1265.9827727401046, y: 1829.073726911313 },
              bor1: { x: -2616.9096316888476, y: 1087.3243394936028 },
              bor2: { x: -865.1512218888312, y: 1107.8994423073616 },
              bor3: { x: -2576.8078213113167, y: 1886.894788044694 },
              bor4: { x: -356.4329469573597, y: 1859.0590100592938 },
              borderWhite: { x: -2572.8363750694525, y: 943.4663593260848 },
              buffer: { x: -1067.4873043319767, y: 1145.4964718652618 },
              fadeBOTTOM1: { x: -1891.3874692725385, y: 1737.7166359613877 },
              fadeBOTTOM2: { x: -1364.2545505356688, y: 1674.416428177142 },
              fadeTOP1: { x: -1890.2348282742848, y: 1378.8574681978128 },
              fadeTOP2: { x: -1509.5590805972508, y: 1438.436842883119 },
              line1: { x: -2341.909447394958, y: 1464.882831297186 },
              line2: { x: -1903.0169361379424, y: 1660.5369371389736 },
              line3: { x: -1658.3181879030346, y: 1626.9387345710913 },
              line3_1: { x: -1612.9638298061684, y: 1535.1188994538006 },
              line4: { x: -1647.3843601042042, y: 1404.6521948968616 },
              line4_1: { x: -1612.5847456080564, y: 1309.5573056021929 },
              line5: { x: -1650.317529815112, y: 1192.3957357858808 },
              line5_1: { x: -1613.6632435927077, y: 1101.6164362040377 },
              line6: { x: -2564.086975301377, y: 1879.3076438615028 },
              line_Top_6: { x: -1014.1923558865307, y: 1430.149407462271 },
              timeUpdate3: { x: -2558.911150405856, y: 1021.6758768483903 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================

        // ============================== line =========================================
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
        // {
        //     id: "Flow_Meter_Total",
        //     data: {
        //         label: (
        //             <div
        //                 style={{
        //                     color: "green",
        //                     fontSize: 25,
        //                     fontWeight: 600,
        //                 }}
        //             >
        //                 {" "}
        //                 Flow Total
        //             </div>
        //         ),
        //     },
        //     position: positions.Flow_Meter_Total,

        //     style: {
        //         border: background,
        //         width: 300,

        //         background: borderBox,
        //         // Thêm box shadow với màu (0, 255, 255)
        //     },
        //     sourcePosition: Position.Top,
        //     targetPosition: Position.Bottom,
        // },
        {
            id: "Consumption_Flow",
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
                        Flow Total
                    </div>
                ),
            },
            position: positions.Consumption_Flow,

            style: {
                border: background,
                width: 400,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "Flow_Velocity",
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
                        Flow Total
                    </div>
                ),
            },
            position: positions.Flow_Velocity,

            style: {
                border: background,
                width: 400,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },

        {
            id: "GAUGE1_DATA",
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
            position: positions.GAUGE1_DATA,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "GAUGE2_DATA",
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
            position: positions.GAUGE2_DATA,

            style: {
                border: background,
                width: 250,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },
        {
            id: "GAUGE1_none",
            position: positions.GAUGE1_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE2_none",
            position: positions.GAUGE2_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE1",
            position: positions.GAUGE1,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "GAUGE2",
            position: positions.GAUGE2,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "GAUGE1_line",
            position: positions.GAUGE1_line,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 9999,

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 35, background: line },
        },
        {
            id: "GAUGE2_line",
            position: positions.GAUGE2_line,
            type: "custom",
            data: {
                label: <div></div>,
            },
            zIndex: 9999,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 35, background: line },
        },
        {
            id: "Arrow6",
            position: positions.Arrow6,
            type: "custom",
            data: {
                label: <div>{arrowLeft}</div>,
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
            id: "TankMEIKO",
            position: positions.TankMEIKO,
            type: "custom",
            data: {
                label: (
                    <div style={{ width: 400, height: 230 }}>{TankMeiko}</div>
                ),
            },
            zIndex: -99999,
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "TankLine",
            position: positions.TankLine,
            type: "custom",
            data: {
                label: <div style={{ width: 0, height: 0 }}>{TankLine}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ============================== line =========================================

        {
            id: "GD_101",
            position: positions.GD_101,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 300,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_101_image",
            position: positions.GD_101_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },

        {
            id: "GD_102",
            position: positions.GD_102,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 300,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_102_image",
            position: positions.GD_102_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },

        {
            id: "GD_103",
            position: positions.GD_103,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 300,
                height: 10,
                background: "none",
            },
        },
        {
            id: "GD_103_image",
            position: positions.GD_103_image,
            type: "custom",
            data: {
                label: <div style={{ width: 200, height: 0 }}>{GD}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 10,
                background: "none",
            },
        },
        {
            id: "VP",
            position: positions.VP,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_OFF}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP2",
            position: positions.VP2,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_ON}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP3",
            position: positions.VP3,
            type: "custom",
            data: {
                label: <div style={{ width: 10, height: 0 }}>{VP_ON}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "VP_Name",
            position: positions.VP_Name,
            type: "custom",
            data: {
                label: <div>VP-301</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "VP2_Name",
            position: positions.VP2_Name,
            type: "custom",
            data: {
                label: <div>VP-302</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,

                background: "white",
                borderRadius: 5,
            },
        },

        {
            id: "VP3_Name",
            position: positions.VP3_Name,
            type: "custom",
            data: {
                label: <div>VP-303</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 25,
                fontWeight: 600,
                padding: 5,

                background: "white",
                borderRadius: 5,
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

            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 18,
                fontWeight: 500,
                padding: 5,

                background: "none",
                borderRadius: 5,
                border: "none",
            },
            zIndex: 99999,
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
            style: { border: "none", width: 0, height: 10, background: "none" },
            zIndex: 99999,
        },

        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line3_1",
            position: positions.line3_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line4_1",
            position: positions.line4_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line5_1",
            position: positions.line5_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "line_Top_6",
            position: positions.line_Top_6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        // ============================== line =========================================
        {
            id: "buffer",
            position: positions.buffer,
            type: "custom",
            data: {
                label: <div>Buffer Tank</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                fontSize: 25,
                fontWeight: 500,
                padding: 5,
                width: 200,

                background: background,
                color: "white",
                border: "none",
                borderRadius: 5,
            },
        },
        {
            id: "Tank_01_Level",
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
            position: positions.Tank_01_Level,

            style: {
                border: background,
                width: 270,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_01_Volume_DATA",
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
            position: positions.Tank_01_Volume_DATA,

            style: {
                border: background,
                width: 330,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_01_Mass_DATA",
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
            position: positions.Tank_01_Mass_DATA,

            style: {
                border: background,
                width: 330,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "Tank_PT_301_DATA",
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
            position: positions.Tank_PT_301_DATA,

            style: {
                border: background,
                width: 330,

                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "Tank_TT_301_DATA",
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
            position: positions.Tank_TT_301_DATA,

            style: {
                border: background,
                width: 330,
                background: borderBox,
                // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "SDV_301_Name",
            position: positions.SDV_301_Name,
            type: "custom",
            data: {
                label: <div>SDV-301</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 22,
                fontWeight: 600,
                padding: 5,
                border: "none",

                background: "green",
                color: "white",
                borderRadius: 5,
            },
        },
        {
            id: "SDV_302_Name",
            position: positions.SDV_302_Name,
            type: "custom",
            data: {
                label: <div>SDV-302</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 22,
                fontWeight: 600,
                padding: 5,
                background: "green",
                border: "none",
                color: "white",
                borderRadius: 5,
            },
        },

        {
            id: "SDV_301",
            position: positions.SDV_301,
            type: "custom",
            data: {
                label: <div>111</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },
        {
            id: "SDV_302",
            position: positions.SDV_302,
            type: "custom",
            data: {
                label: <div>222</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
        },

        {
            id: "V_V1_V2",
            position: positions.V_V1_V2,
            type: "custom",
            data: {
                label: <div>{V_V1_V2}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 0, height: 10, background: "none" },
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
                        MEIKO
                    </div>
                ),
            },
            position: positions.borderWhite,

            style: {
                background: background,
                border: "1px solid white",
                width: 450,
                height: 140,
                borderRadius: 50,
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
                if (id === "Tank_01_Level") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_01_Level: position,
                    }));
                } else if (id === "Tank_01_Volume_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_01_Volume_DATA: position,
                    }));
                } else if (id === "Tank_01_Mass_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_01_Mass_DATA: position,
                    }));
                } else if (id === "Tank_PT_301_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_PT_301_DATA: position,
                    }));
                } else if (id === "Tank_TT_301_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_TT_301_DATA: position,
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
                } else if (id === "line6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line6: position,
                    }));
                } else if (id === "TankMEIKO") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TankMEIKO: position,
                    }));
                } else if (id === "TankLine") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TankLine: position,
                    }));
                } else if (id === "Arrow1") {
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
                } else if (id === "line5_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line5_1: position,
                    }));
                } else if (id === "line3_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line3_1: position,
                    }));
                } else if (id === "line4_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line4_1: position,
                    }));
                } else if (id === "line_Top_6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line_Top_6: position,
                    }));
                } else if (id === "VP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP: position,
                    }));
                } else if (id === "VP2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP2: position,
                    }));
                } else if (id === "VP3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP3: position,
                    }));
                } else if (id === "VP_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP_Name: position,
                    }));
                } else if (id === "VP2_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP2_Name: position,
                    }));
                } else if (id === "VP3_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        VP3_Name: position,
                    }));
                } else if (id === "SDV_301_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_301_Name: position,
                    }));
                } else if (id === "SDV_302_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_302_Name: position,
                    }));
                } else if (id === "SDV_301") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_301: position,
                    }));
                } else if (id === "SDV_302") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_302: position,
                    }));
                } else if (id === "GAUGE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE1: position,
                    }));
                } else if (id === "GAUGE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE2: position,
                    }));
                } else if (id === "GAUGE1_line") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE1_line: position,
                    }));
                } else if (id === "GAUGE2_line") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE2_line: position,
                    }));
                } else if (id === "GAUGE1_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE1_none: position,
                    }));
                } else if (id === "GAUGE2_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE2_none: position,
                    }));
                } else if (id === "GAUGE1_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE1_DATA: position,
                    }));
                } else if (id === "GAUGE2_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GAUGE2_DATA: position,
                    }));
                } else if (id === "GD_101") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_101: position,
                    }));
                } else if (id === "GD_101_image") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_101_image: position,
                    }));
                } else if (id === "GD_102") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_102: position,
                    }));
                } else if (id === "GD_102_image") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_102_image: position,
                    }));
                } else if (id === "GD_103") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_103: position,
                    }));
                } else if (id === "GD_103_image") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        GD_103_image: position,
                    }));
                } else if (id === "V_V1_V2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        V_V1_V2: position,
                    }));
                } else if (id === "Flow_Meter_Total") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow_Meter_Total: position,
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
                } else if (id === "AlarmCenter") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        AlarmCenter: position,
                    }));
                } else if (id === "Flow_Velocity") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Flow_Velocity: position,
                    }));
                } else if (id === "Consumption_Flow") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Consumption_Flow: position,
                    }));
                } else if (id === "buffer") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        buffer: position,
                    }));
                }

                //========================== pit line 1 =========================
            }
        },
        [setNodes, setPositions, editingEnabled]
    );
    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };

    // useEffect(() => {
    //     localStorage.setItem("positionMEIKO", JSON.stringify(positions));
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
