import React, { useEffect, useRef, useState } from "react";
import { id_THACHTHAT, id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css";
import SetAttribute1 from "../../OTSUKA/title-OTK";
import { httpApi } from "@/api/http.api";
import { DotGreen, DotRed } from "./SVG_Scorecard";

import "./ScoreCard.css"

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
export default function ScoreCard_Meiko() {
    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);


    const [EVC_STT01, setEVC_STT01] = useState<any | null>(null);
    const [PLC_Conn_STT, setPLC_Conn_STT] = useState<any | null>(null);

    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_THACHTHAT,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
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
                  



                        VP_303: setVP_303,
                        VP_302: setVP_302,
                        VP_301: setVP_301,
                        GD_103_High: setGD_103_High,
                        GD_102_High: setGD_102_High,
                        GD_101_High: setGD_101_High,

                        GD_103_Low: setGD_103_Low,
                        GD_101_Low: setGD_101_Low,
                        GD_102_Low: setGD_102_Low,

                        SDV_301: setSDV_301,
                        SDV_302: setSDV_302,


                        V1_Flow_Meter: setV1_Flow_Meter,
                        V2_Flow_Meter: setV2_Flow_Meter,


                        Pipe_Temp: setPipe_Temp,
                        Pipe_Press: setPipe_Press,


                        Tank_TT_301: setTank_TT_301,
                        Tank_PT_301: setTank_PT_301,


                        Tank_01_Volume: setTank_01_Volume,

                        
                        EVC_01_Conn_STT: setEVC_STT01,


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
                fetchData()
            };
        }
    }, [data]);


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



            const SDV_301_High = res.data.find((item: any) => item.key === "SDV_301_High");
            setSDV_301_High(SDV_301_High?.value || null);
            const SDV_301_Low = res.data.find((item: any) => item.key === "SDV_301_Low");
            setSDV_301_Low(SDV_301_Low?.value || null);
            const SDV_301_Maintain = res.data.find(
                (item: any) => item.key === "SDV_301_Maintain"
            );

            const GD_103_Low_High = res.data.find((item: any) => item.key === "GD_103_Low_High");
            setGD_103_Low_High(GD_103_Low_High?.value || null);
            const GD_103_Low_Low = res.data.find((item: any) => item.key === "GD_103_Low_Low");
            setGD_103_Low_Low(GD_103_Low_Low?.value || null);
            const GD_103_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_103_Low_Maintain"
            );

            const GD_101_Low_High = res.data.find((item: any) => item.key === "GD_101_Low_High");
            setGD_101_Low_High(GD_101_Low_High?.value || null);
            const GD_101_Low_Low = res.data.find((item: any) => item.key === "GD_101_Low_Low");
            setGD_101_Low_Low(GD_101_Low_Low?.value || null);
            const GD_101_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_101_Low_Maintain"
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


            const GD_101_High_High = res.data.find((item: any) => item.key === "GD_101_High_High");
            setGD_101_High_High(GD_101_High_High?.value || null);
            const GD_101_High_Low = res.data.find((item: any) => item.key === "GD_101_High_Low");
            setGD_101_High_Low(GD_101_High_Low?.value || null);
            const GD_101_High_Maintain = res.data.find(
                (item: any) => item.key === "GD_101_High_Maintain"
            );

            const V2_Flow_Meter_High = res.data.find((item: any) => item.key === "V2_Flow_Meter_High");
            setV2_Flow_Meter_High(V2_Flow_Meter_High?.value || null);
            const V2_Flow_Meter_Low = res.data.find((item: any) => item.key === "V2_Flow_Meter_Low");
            setV2_Flow_Meter_Low(V2_Flow_Meter_Low?.value || null);
            const V2_Flow_Meter_Maintain = res.data.find(
                (item: any) => item.key === "V2_Flow_Meter_Maintain"
            );

            const GD_102_Low_High = res.data.find((item: any) => item.key === "GD_102_Low_High");
            setGD_102_Low_High(GD_102_Low_High?.value || null);
            const GD_102_Low_Low = res.data.find((item: any) => item.key === "GD_102_Low_Low");
            setGD_102_Low_Low(GD_102_Low_Low?.value || null);
            const GD_102_Low_Maintain = res.data.find(
                (item: any) => item.key === "GD_102_Low_Maintain"
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

 // =================================================================================================================== 



            



           

            setMaintainVP_303(VP_303_Maintain?.value || false);


            setMaintainVP_302(VP_302_Maintain?.value || false);


            setMaintainVP_301(VP_301_Maintain?.value || false);


            setMaintainGD_103_High(GD_103_High_Maintain?.value || false);


            setMaintainGD_102_Low(GD_102_Low_Maintain?.value || false);

            setMaintainV1_Flow_Meter(V1_Flow_Meter_Maintain?.value || false);
            
            setMaintainV2_Flow_Meter(V2_Flow_Meter_Maintain?.value || false);
            
            setMaintainGD_101_High(GD_101_High_Maintain?.value || false);

            
            setMaintainPipe_Temp(Pipe_Temp_Maintain?.value || false);



            setMaintainSDV_302(SDV_302_Maintain?.value || false);


            setMaintainGD_101_Low(GD_101_Low_Maintain?.value || false);


            setMaintainGD_103_Low(GD_103_Low_Maintain?.value || false);

            setMaintainSDV_301(SDV_301_Maintain?.value || false);





            setMaintainGD_102_High(GD_102_High_Maintain?.value || false);

            setMaintainTank_TT_301(Tank_TT_301_Maintain?.value || false);


            setMaintainTank_PT_301(Tank_PT_301_Maintain?.value || false);


            setMaintainTank_01_Volume(Tank_01_Volume_Maintain?.value || false);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 


  // =================================================================================================================== 
 
 
  const [VP_303, setVP_303] = useState<string | null>(null);
  const [VP_303_High, setVP_303_High] = useState<number | null>(null);
  const [VP_303_Low, setVP_303_Low] = useState<number | null>(null);
  const [exceedThresholdVP_303, setExceedThresholdVP_303] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
  const [maintainVP_303, setMaintainVP_303] = useState<boolean>(false);
  
  
      useEffect(() => {
          if (typeof VP_303_High === 'string' && typeof VP_303_Low === 'string' && VP_303 !== null && maintainVP_303 === false
          ) {
              const highValue = parseFloat(VP_303_High);
              const lowValue = parseFloat(VP_303_Low);
              const VP_303Value = parseFloat(VP_303);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VP_303Value)) {
                  if (highValue <= VP_303Value || VP_303Value <= lowValue) {
                          setExceedThresholdVP_303(true);
                  } else {
                     setExceedThresholdVP_303(false);
                  }
              } 
          } 
      }, [VP_303_High, VP_303, VP_303_Low,maintainVP_303]);


  // =================================================================================================================== 



       const [VP_302, setVP_302] = useState<string | null>(null);
       const [VP_302_High, setVP_302_High] = useState<number | null>(null);
       const [VP_302_Low, setVP_302_Low] = useState<number | null>(null);
       const [exceedThresholdVP_302, setExceedThresholdVP_302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainVP_302, setMaintainVP_302] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof VP_302_High === 'string' && typeof VP_302_Low === 'string' && VP_302 !== null && maintainVP_302 === false
               ) {
                   const highValue = parseFloat(VP_302_High);
                   const lowValue = parseFloat(VP_302_Low);
                   const VP_302Value = parseFloat(VP_302);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VP_302Value)) {
                       if (highValue <= VP_302Value || VP_302Value <= lowValue) {
                               setExceedThresholdVP_302(true);
                       } else {
                          setExceedThresholdVP_302(false);
                       }
                   } 
               } 
           }, [VP_302_High, VP_302, VP_302_Low,maintainVP_302]);
       

  
       // =================================================================================================================== 


       const [VP_301, setVP_301] = useState<string | null>(null);

       const [VP_301_High, setVP_301_High] = useState<number | null>(null);
       const [VP_301_Low, setVP_301_Low] = useState<number | null>(null);
       const [exceedThresholdVP_301, setExceedThresholdVP_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       
       const [maintainVP_301, setMaintainVP_301] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof VP_301_High === 'string' && typeof VP_301_Low === 'string' && VP_301 !== null && maintainVP_301 === false
               ) {
                   const highValue = parseFloat(VP_301_High);
                   const lowValue = parseFloat(VP_301_Low);
                   const VP_301Value = parseFloat(VP_301);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VP_301Value)) {
                       if (highValue <= VP_301Value || VP_301Value <= lowValue) {
                               setExceedThresholdVP_301(true);
                       } else {
                          setExceedThresholdVP_301(false);
                       }
                   } 
               } 
           }, [VP_301_High, VP_301 , VP_301_Low,maintainVP_301]);
       

  
       // =================================================================================================================== 

       const [GD_103_High, setGD_103_High] = useState<string | null>(null);
       const [GD_103_High_High, setGD_103_High_High] = useState<number | null>(null);
       const [GD_103_High_Low, setGD_103_High_Low] = useState<number | null>(null);
       const [exceedThresholdGD_103_High, setExceedThresholdGD_103_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD_103_High, setMaintainGD_103_High] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof GD_103_High_High === 'string' && typeof GD_103_High_Low === 'string' && GD_103_High !== null && maintainGD_103_High === false
               ) {
                   const highValue = parseFloat(GD_103_High_High);
                   const lowValue = parseFloat(GD_103_High_Low);
                   const GD_103_HighValue = parseFloat(GD_103_High);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_103_HighValue)) {
                       if (highValue <= GD_103_HighValue || GD_103_HighValue <= lowValue) {
                               setExceedThresholdGD_103_High(true);
                       } else {
                          setExceedThresholdGD_103_High(false);
                       }
                   } 
               } 
           }, [GD_103_High_High, GD_103_High, GD_103_High_Low,maintainGD_103_High]);
       

  
  
       // =================================================================================================================== 

       const [GD_102_High, setGD_102_High] = useState<string | null>(null);
       const [GD_102_High_High, setGD_102_High_High] = useState<number | null>(null);
       const [GD_102_High_Low, setGD_102_High_Low] = useState<number | null>(null);
       const [exceedThresholdGD_102_High, setExceedThresholdGD_102_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainGD_102_High, setMaintainGD_102_High] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof GD_102_High_High === 'string' && typeof GD_102_High_Low === 'string' && GD_102_High !== null && maintainGD_102_High === false
               ) {
                   const highValue = parseFloat(GD_102_High_High);
                   const lowValue = parseFloat(GD_102_High_Low);
                   const GD_102_HighValue = parseFloat(GD_102_High);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_102_HighValue)) {
                       if (highValue <= GD_102_HighValue || GD_102_HighValue <= lowValue) {
                               setExceedThresholdGD_102_High(true);
                       } else {
                          setExceedThresholdGD_102_High(false);
                       }
                   } 
               } 
           }, [GD_102_High_High, GD_102_High, GD_102_High_Low,maintainGD_102_High]);
       
 
  
       // =================================================================================================================== 




 // =================================================================================================================== 

 const [SDV_301, setSDV_301] = useState<string | null>(null);
 const [SDV_301_High, setSDV_301_High] = useState<number | null>(null);
 const [SDV_301_Low, setSDV_301_Low] = useState<number | null>(null);
 const [exceedThresholdSDV_301, setExceedThresholdSDV_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainSDV_301, setMaintainSDV_301] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof SDV_301_High === 'string' && typeof SDV_301_Low === 'string' && SDV_301 !== null && maintainSDV_301 === false
         ) {
             const highValue = parseFloat(SDV_301_High);
             const lowValue = parseFloat(SDV_301_Low);
             const SDV_301Value = parseFloat(SDV_301);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_301Value)) {
                 if (highValue <= SDV_301Value || SDV_301Value <= lowValue) {
                         setExceedThresholdSDV_301(true);
                 } else {
                    setExceedThresholdSDV_301(false);
                 }
             } 
         } 
     }, [SDV_301_High, SDV_301, SDV_301_Low,maintainSDV_301]);
 


 // =================================================================================================================== 

     // =================================================================================================================== 

     const [GD_103_Low, setGD_103_Low] = useState<string | null>(null);
     const [GD_103_Low_High, setGD_103_Low_High] = useState<number | null>(null);
     const [GD_103_Low_Low, setGD_103_Low_Low] = useState<number | null>(null);
     const [exceedThresholdGD_103_Low, setExceedThresholdGD_103_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainGD_103_Low, setMaintainGD_103_Low] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof GD_103_Low_High === 'string' && typeof GD_103_Low_Low === 'string' && GD_103_Low !== null && maintainGD_103_Low === false
             ) {
                 const highValue = parseFloat(GD_103_Low_High);
                 const lowValue = parseFloat(GD_103_Low_Low);
                 const GD_103_LowValue = parseFloat(GD_103_Low);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_103_LowValue)) {
                     if (highValue <= GD_103_LowValue || GD_103_LowValue <= lowValue) {
                             setExceedThresholdGD_103_Low(true);
                     } else {
                        setExceedThresholdGD_103_Low(false);
                     }
                 } 
             } 
         }, [GD_103_Low_High, GD_103_Low, GD_103_Low_Low,maintainGD_103_Low]);
     
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [GD_101_Low, setGD_101_Low] = useState<string | null>(null);

 const [GD_101_Low_High, setGD_101_Low_High] = useState<number | null>(null);
 const [GD_101_Low_Low, setGD_101_Low_Low] = useState<number | null>(null);
 const [exceedThresholdGD_101_Low, setExceedThresholdGD_101_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainGD_101_Low, setMaintainGD_101_Low] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof GD_101_Low_High === 'string' && typeof GD_101_Low_Low === 'string' && GD_101_Low !== null && maintainGD_101_Low === false
         ) {
             const highValue = parseFloat(GD_101_Low_High);
             const lowValue = parseFloat(GD_101_Low_Low);
             const GD_101_LowValue = parseFloat(GD_101_Low);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_101_LowValue)) {
                 if (highValue <= GD_101_LowValue || GD_101_LowValue <= lowValue) {
                         setExceedThresholdGD_101_Low(true);
                 } else {
                    setExceedThresholdGD_101_Low(false);
                 }
             } 
         } 
     }, [GD_101_Low_High, GD_101_Low, GD_101_Low_Low,maintainGD_101_Low]);
 



 // =================================================================================================================== 


     // =================================================================================================================== 

const [SDV_302, setSDV_302] = useState<string | null>(null);

const [SDV_302_High, setSDV_302_High] = useState<number | null>(null);
const [SDV_302_Low, setSDV_302_Low] = useState<number | null>(null);
const [exceedThresholdSDV_302, setExceedThresholdSDV_302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSDV_302, setMaintainSDV_302] = useState<boolean>(false);


 useEffect(() => {
     if (typeof SDV_302_High === 'string' && typeof SDV_302_Low === 'string' && SDV_302 !== null && maintainSDV_302 === false
     ) {
         const highValue = parseFloat(SDV_302_High);
         const lowValue = parseFloat(SDV_302_Low);
         const SDV_302Value = parseFloat(SDV_302);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_302Value)) {
             if (highValue <= SDV_302Value || SDV_302Value <= lowValue) {
            
                     setExceedThresholdSDV_302(true);
             } else {
                setExceedThresholdSDV_302(false);
             }
         } 
     } 
 }, [SDV_302_High, SDV_302, SDV_302_Low,maintainSDV_302]);




// =================================================================================================================== 




 // =================================================================================================================== 

const [Pipe_Temp, setPipe_Temp] = useState<string | null>(null);

const [Pipe_Temp_High, setPipe_Temp_High] = useState<number | null>(null);
const [Pipe_Temp_Low, setPipe_Temp_Low] = useState<number | null>(null);
const [exceedThresholdPipe_Temp, setExceedThresholdPipe_Temp] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainPipe_Temp, setMaintainPipe_Temp] = useState<boolean>(false);


useEffect(() => {
 if (typeof Pipe_Temp_High === 'string' && typeof Pipe_Temp_Low === 'string' && Pipe_Temp !== null && maintainPipe_Temp === false
 ) {
     const highValue = parseFloat(Pipe_Temp_High);
     const lowValue = parseFloat(Pipe_Temp_Low);
     const Pipe_TempValue = parseFloat(Pipe_Temp);

     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Pipe_TempValue)) {
         if (highValue <= Pipe_TempValue || Pipe_TempValue <= lowValue) {
                 setExceedThresholdPipe_Temp(true);
         } else {
            setExceedThresholdPipe_Temp(false);
         }
     } 
 } 
}, [Pipe_Temp_High, Pipe_Temp, Pipe_Temp_Low,maintainPipe_Temp]);




// =================================================================================================================== 


     // =================================================================================================================== 

     const [GD_101_High, setGD_101_High] = useState<string | null>(null);
    
     const [GD_101_High_High, setGD_101_High_High] = useState<number | null>(null);
     const [GD_101_High_Low, setGD_101_High_Low] = useState<number | null>(null);
     const [exceedThresholdGD_101_High, setExceedThresholdGD_101_High] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainGD_101_High, setMaintainGD_101_High] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof GD_101_High_High === 'string' && typeof GD_101_High_Low === 'string' && GD_101_High !== null && maintainGD_101_High === false
             ) {
                 const highValue = parseFloat(GD_101_High_High);
                 const lowValue = parseFloat(GD_101_High_Low);
                 const GD_101_HighValue = parseFloat(GD_101_High);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_101_HighValue)) {
                     if (highValue <= GD_101_HighValue || GD_101_HighValue <= lowValue) {
                             setExceedThresholdGD_101_High(true);
                     } else {
                        setExceedThresholdGD_101_High(false);
                     }
                 } 
             } 
         }, [GD_101_High_High, GD_101_High, GD_101_High_Low,maintainGD_101_High]);
     
 
     
     
     // =================================================================================================================== 
     
     
     const [V2_Flow_Meter, setV2_Flow_Meter] = useState<string | null>(null);
     const [V2_Flow_Meter_High, setV2_Flow_Meter_High] = useState<number | null>(null);
     const [V2_Flow_Meter_Low, setV2_Flow_Meter_Low] = useState<number | null>(null);
     const [exceedThresholdV2_Flow_Meter, setExceedThresholdV2_Flow_Meter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainV2_Flow_Meter, setMaintainV2_Flow_Meter] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof V2_Flow_Meter_High === 'string' && typeof V2_Flow_Meter_Low === 'string' && V2_Flow_Meter !== null && maintainV2_Flow_Meter === false
             ) {
                 const highValue = parseFloat(V2_Flow_Meter_High);
                 const lowValue = parseFloat(V2_Flow_Meter_Low);
                 const V2_Flow_MeterValue = parseFloat(V2_Flow_Meter);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(V2_Flow_MeterValue)) {
                     if (highValue <= V2_Flow_MeterValue || V2_Flow_MeterValue <= lowValue) {
                         
                             setExceedThresholdV2_Flow_Meter(true);
                     } else {
                        setExceedThresholdV2_Flow_Meter(false);
                     }
                 } 
             } 
         }, [V2_Flow_Meter_High, V2_Flow_Meter, , V2_Flow_Meter_Low,maintainV2_Flow_Meter]);
     
     
     
     
     // =================================================================================================================== 
     
         // =================================================================================================================== 
     
     const [GD_102_Low, setGD_102_Low] = useState<string | null>(null);
     const [GD_102_Low_High, setGD_102_Low_High] = useState<number | null>(null);
     const [GD_102_Low_Low, setGD_102_Low_Low] = useState<number | null>(null);
     const [exceedThresholdGD_102_Low, setExceedThresholdGD_102_Low] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainGD_102_Low, setMaintainGD_102_Low] = useState<boolean>(false);
     
     
     useEffect(() => {
         if (typeof GD_102_Low_High === 'string' && typeof GD_102_Low_Low === 'string' && GD_102_Low !== null && maintainGD_102_Low === false
         ) {
             const highValue = parseFloat(GD_102_Low_High);
             const lowValue = parseFloat(GD_102_Low_Low);
             const GD_102_LowValue = parseFloat(GD_102_Low);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_102_LowValue)) {
                 if (highValue <= GD_102_LowValue || GD_102_LowValue <= lowValue) {
                         setExceedThresholdGD_102_Low(true);
                 } else {
                    setExceedThresholdGD_102_Low(false);
                 }
             } 
         } 
     }, [GD_102_Low_High, GD_102_Low, , GD_102_Low_Low,maintainGD_102_Low]);
     

      // =================================================================================================================== 


     const [Tank_TT_301, setTank_TT_301] = useState<string | null>(null);

     const [Tank_TT_301_High, setTank_TT_301_High] = useState<number | null>(null);
     const [Tank_TT_301_Low, setTank_TT_301_Low] = useState<number | null>(null);
     const [exceedThresholdTank_TT_301, setExceedThresholdTank_TT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTank_TT_301, setMaintainTank_TT_301] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof Tank_TT_301_High === 'string' && typeof Tank_TT_301_Low === 'string' && Tank_TT_301 !== null && maintainTank_TT_301 === false
             ) {
                 const highValue = parseFloat(Tank_TT_301_High);
                 const lowValue = parseFloat(Tank_TT_301_Low);
                 const Tank_TT_301Value = parseFloat(Tank_TT_301);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_TT_301Value)) {
                     if (highValue <= Tank_TT_301Value || Tank_TT_301Value <= lowValue) {
                             setExceedThresholdTank_TT_301(true);
                     } else {
                         setExceedThresholdTank_TT_301(false);
                     }
                 } 
             } 
         }, [Tank_TT_301_High, Tank_TT_301, Tank_TT_301_Low,maintainTank_TT_301]);
     
      

     // =================================================================================================================== 


     const [V1_Flow_Meter, setV1_Flow_Meter] = useState<string | null>(null);

     const [V1_Flow_Meter_High, setV1_Flow_Meter_High] = useState<number | null>(null);
     const [V1_Flow_Meter_Low, setV1_Flow_Meter_Low] = useState<number | null>(null);
     const [exceedThresholdV1_Flow_Meter, setExceedThresholdV1_Flow_Meter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainV1_Flow_Meter, setMaintainV1_Flow_Meter] = useState<boolean>(false);
     
     
      useEffect(() => {
          if (typeof V1_Flow_Meter_High === 'string' && typeof V1_Flow_Meter_Low === 'string' && V1_Flow_Meter !== null && maintainV1_Flow_Meter === false
          ) {
              const highValue = parseFloat(V1_Flow_Meter_High);
              const lowValue = parseFloat(V1_Flow_Meter_Low);
              const V1_Flow_MeterValue = parseFloat(V1_Flow_Meter);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(V1_Flow_MeterValue)) {
                  if (highValue <= V1_Flow_MeterValue || V1_Flow_MeterValue <= lowValue) {
                          setExceedThresholdV1_Flow_Meter(true);
                  } else {
                     setExceedThresholdV1_Flow_Meter(false);
                  }
              } 
          } 
      }, [V1_Flow_Meter_High, V1_Flow_Meter, V1_Flow_Meter_Low,maintainV1_Flow_Meter]);
     
   
     
     // =================================================================================================================== 


     // =================================================================================================================== 



          const [Tank_PT_301, setTank_PT_301] = useState<string | null>(null);
  
          const [Tank_PT_301_High, setTank_PT_301_High] = useState<number | null>(null);
          const [Tank_PT_301_Low, setTank_PT_301_Low] = useState<number | null>(null);
          const [exceedThresholdTank_PT_301, setExceedThresholdTank_PT_301] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          const [maintainTank_PT_301, setMaintainTank_PT_301] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof Tank_PT_301_High === 'string' && typeof Tank_PT_301_Low === 'string' && Tank_PT_301 !== null && maintainTank_PT_301 === false
                  ) {
                      const highValue = parseFloat(Tank_PT_301_High);
                      const lowValue = parseFloat(Tank_PT_301_Low);
                      const Tank_PT_301Value = parseFloat(Tank_PT_301);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_PT_301Value)) {
                          if (highValue <= Tank_PT_301Value || Tank_PT_301Value <= lowValue) {
                                  setExceedThresholdTank_PT_301(true);
                          } else {
                             setExceedThresholdTank_PT_301(false);
                          }
                      } 
                  } 
              }, [Tank_PT_301_High, Tank_PT_301, Tank_PT_301_Low,maintainTank_PT_301]);
          
           
     
          // =================================================================================================================== 


          const [Tank_01_Volume, setTank_01_Volume] = useState<string | null>(null);
 
          const [Tank_01_Volume_High, setTank_01_Volume_High] = useState<number | null>(null);
          const [Tank_01_Volume_Low, setTank_01_Volume_Low] = useState<number | null>(null);
          const [exceedThresholdTank_01_Volume, setExceedThresholdTank_01_Volume] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainTank_01_Volume, setMaintainTank_01_Volume] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof Tank_01_Volume_High === 'string' && typeof Tank_01_Volume_Low === 'string' && Tank_01_Volume !== null && maintainTank_01_Volume === false
                  ) {
                      const highValue = parseFloat(Tank_01_Volume_High);
                      const lowValue = parseFloat(Tank_01_Volume_Low);
                      const Tank_01_VolumeValue = parseFloat(Tank_01_Volume);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_01_VolumeValue)) {
                          if (highValue <= Tank_01_VolumeValue || Tank_01_VolumeValue <= lowValue) {
                                  setExceedThresholdTank_01_Volume(true);
                          } else {
                             setExceedThresholdTank_01_Volume(false);
                          }
                      } 
                  } 
              }, [Tank_01_Volume_High, Tank_01_Volume , Tank_01_Volume_Low,maintainTank_01_Volume]);
          
       
    
         
         // =================================================================================================================== 

         const [Pipe_Press, setPipe_Press] = useState<string | null>(null);

        const [Pipe_Press_High, setPipe_Press_High] = useState<number | null>(null);
        const [Pipe_Press_Low, setPipe_Press_Low] = useState<number | null>(null);
        const [exceedThresholdPipe_Press, setExceedThresholdPipe_Press] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        const [maintainPipe_Press, setMaintainPipe_Press] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof Pipe_Press_High === 'string' && typeof Pipe_Press_Low === 'string' && Pipe_Press !== null && maintainPipe_Press === false
         ) {
             const highValue = parseFloat(Pipe_Press_High);
             const lowValue = parseFloat(Pipe_Press_Low);
             const Pipe_PressValue = parseFloat(Pipe_Press);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Pipe_PressValue)) {
                 if (highValue <= Pipe_PressValue || Pipe_PressValue <= lowValue) {
                         setExceedThresholdPipe_Press(true);
                 } else {
                    setExceedThresholdPipe_Press(false);
                 }
             } 
         } 
     }, [Pipe_Press_High, Pipe_Press, Pipe_Press_Low,maintainPipe_Press]);
 
  

     //======================================================================================================================
    const tagNameEVC = {
        InputPressure: "Input Pressure (BarA)",
        Temperature: "Temperature (°C)",
        GVF: "Gross Volume Flow (m³/h)",
        SVF: "Standard Volume Flow (Sm³/h)",
        GVA: "Gross Volume Accumulated (m³)",
        SVA: "Standard Volume Accumulated (Sm³)",
        VbToday: "Standard Volume Vb Today (Sm³)",
        VbLastDay: "Standard Volume Vb Yesterday (Sm³)",
        VmToday: "Gross Volume Vm Today (m³)",
        VmLastDay: "Gross Volume Vm Yesterday (m³)",
        ReBattery: "Remainning Battery (Months)",
    };

    const tagNamePLC = {
        PT01: "Output Pressure (BarG)",
        VP_303: "Gas Detector GD-1301 (%LEL)",
        VP_302: "Gas Detector GD-1302 (%LEL)",
        ZSC: "SDV-ZSC (0: ON - 1: OFF)",
        ZSO: "SDV-ZSO (0: OFF - 1: ON)",
        UPS_BATTERY: "UPS BATTERY (0 :Normal - 1: Battery)",
        UPS_CHARGING: "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM: "UPS ALARM (0: Normal - 1: Battery)",

        Smoker_Detected: "SD 1 (0: Normal - 1: Smoker Detected)",

        GD_102_Low:
            "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4:Normal)",
        SELECT_SW: "SELECT SW (0: Local - 1: Remote)",
        RESET: "RESET (0: OFF - 1: ON)",
        EmergencyNO: "Emergency Stop NO (0: Normal - 1: Emergency)",
        EmergencyNC: "Emergency Stop NC (0: Emergency - 1: Normal )",
        HORN: "HORN (0: OFF - 1: ON)",
        BEACON: "BEACON (0: OFF - 1: ON)",
        MAP: "MAP (0: Normal - 1: Emergency)",
        Tank_01_Volume: "SDV SOLENOID (0: Off - 1: On)",

    };

    const DataRESET = V1_Flow_Meter === "0" ? "Off" : V1_Flow_Meter === "1" ? "On" : null;
    const DataTank_01_Volume = Tank_01_Volume === "0" ? "Off" : Tank_01_Volume === "1" ? "On" : null;
    const DataMap1 = SDV_301 === "0" ? "Normal" : V1_Flow_Meter === "1" ? "Emergency" : null;

    const DataSmoker_Detected = Pipe_Press === "0" ? "Normal" : Pipe_Press === "1" ? "Smoker Detected" : null;

    const DataCharging =
        GD_103_Low === "0"
            ? "Normal"
            : GD_103_Low === "1"
            ? "Charging"
            : null;
    const DataBattery =
        GD_101_High === "0" ? "Normal" : GD_101_High === "1" ? "Battery" : null;
    const DataAlarm =
        GD_101_Low === "0" ? "Normal" : GD_101_Low === "1" ? "No Battery" : null;
    const DataMode =
        GD_102_Low === "0"
            ? "Error"
            : GD_102_Low === "1"
            ? "Using Running"
            : GD_102_Low === "2"
            ? "Charging"
            : GD_102_Low === "3"
            ? "No Battery"
            : GD_102_Low === "4"
            ? "Normal"
            : null;
    const DataZSC_1 = GD_103_High === "0" ? " On" : GD_103_High === "1" ? "Off" : null;
    const DataZSO_1 = GD_102_High === "0" ? " On" : GD_102_High === "1" ? "Off" : null;

    const DataSDV_302 =
        SDV_302 === "0" ? "Local" : SDV_302 === "1" ? "Remote" : null;
    const DataHorn = Tank_TT_301 === "0" ? "Off" : Tank_TT_301 === "1" ? "On" : null;
    const DataBeacon =
        Tank_PT_301 === "0" ? "Off" : Tank_PT_301 === "1" ? "On" : null;
    const DataV2_Flow_Meter =
        V2_Flow_Meter === "0"
            ? " Normal"
            : V2_Flow_Meter === "1"
            ? "Emergency"
            : null;
    const DataPipe_Temp =
        Pipe_Temp === "0"
            ? "Emergency"
            : Pipe_Temp === "1"
            ? " Normal"
            : null;



            const combineCss = {



    


            
        
                CSSVP_303 : {
                    color:exceedThresholdVP_303 && !maintainVP_303
                    ? "#ff5656"
                    : maintainVP_303
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdVP_303 || maintainVP_303)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdVP_303 || maintainVP_303)
                    ? 18
                    : ""
                },
        
        
                CSSVP_302 : {
                    color:exceedThresholdVP_302 && !maintainVP_302
                    ? "#ff5656"
                    : maintainVP_302
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdVP_302 || maintainVP_302)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdVP_302 || maintainVP_302)
                    ? 18
                    : ""
                },
        
        
                CSSVP_301 : {
                    color:exceedThresholdVP_301 && !maintainVP_301
                    ? "#ff5656"
                    : maintainVP_301
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdVP_301 || maintainVP_301)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdVP_301 || maintainVP_301)
                    ? 18
                    : ""
                },
                CSSGD_103_High : {
                    color:exceedThresholdGD_103_High && !maintainGD_103_High
                    ? "#ff5656"
                    : maintainGD_103_High
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_103_High || maintainGD_103_High)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_103_High || maintainGD_103_High)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSGD_102_High : {
                    color:exceedThresholdGD_102_High && !maintainGD_102_High
                    ? "#ff5656"
                    : maintainGD_102_High
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_102_High || maintainGD_102_High)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_102_High || maintainGD_102_High)
                    ? 18
                    : ""
                },
           
        
                CSSSDV_301 : {
                    color:exceedThresholdSDV_301 && !maintainSDV_301
                    ? "#ff5656"
                    : maintainSDV_301
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_301 || maintainSDV_301)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_301 || maintainSDV_301)
                    ? 18
                    : ""
                },
        
                CSSGD_103_Low : {
                    color:exceedThresholdGD_103_Low && !maintainGD_103_Low
                    ? "#ff5656"
                    : maintainGD_103_Low
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_103_Low || maintainGD_103_Low)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_103_Low || maintainGD_103_Low)
                    ? 18
                    : ""
                },
        
                CSSGD_101_Low : {
                    color:exceedThresholdGD_101_Low && !maintainGD_101_Low
                    ? "#ff5656"
                    : maintainGD_101_Low
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_101_Low || maintainGD_101_Low)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_101_Low || maintainGD_101_Low)
                    ? 18
                    : ""
                },
        
                CSSSDV_302 : {
                    color:exceedThresholdSDV_302 && !maintainSDV_302
                    ? "#ff5656"
                    : maintainSDV_302
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_302 || maintainSDV_302)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_302 || maintainSDV_302)
                    ? 18
                    : ""
                },
        
                CSSPipe_Press : {
                    color:exceedThresholdPipe_Press && !maintainPipe_Press
                    ? "#ff5656"
                    : maintainPipe_Press
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPipe_Press || maintainPipe_Press)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPipe_Press || maintainPipe_Press)
                    ? 18
                    : ""
                },
        
        
                CSSV1_Flow_Meter : {
                    color:exceedThresholdV1_Flow_Meter && !maintainV1_Flow_Meter
                    ? "#ff5656"
                    : maintainV1_Flow_Meter
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdV1_Flow_Meter || maintainV1_Flow_Meter)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdV1_Flow_Meter || maintainV1_Flow_Meter)
                    ? 18
                    : ""
                },
        
                CSSV2_Flow_Meter : {
                    color:exceedThresholdV2_Flow_Meter && !maintainV2_Flow_Meter
                    ? "#ff5656"
                    : maintainV2_Flow_Meter
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdV2_Flow_Meter || maintainV2_Flow_Meter)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdV2_Flow_Meter || maintainV2_Flow_Meter)
                    ? 18
                    : ""
                },
        
        
        
        
                CSSGD_101_High : {
                    color:exceedThresholdGD_101_High && !maintainGD_101_High
                    ? "#ff5656"
                    : maintainGD_101_High
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_101_High || maintainGD_101_High)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_101_High || maintainGD_101_High)
                    ? 18
                    : ""
                },
        
        
                CSSPipe_Temp : {
                         color:exceedThresholdPipe_Temp && !maintainPipe_Temp
                    ? "#ff5656"
                    : maintainPipe_Temp
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPipe_Temp || maintainPipe_Temp)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPipe_Temp || maintainPipe_Temp)
                    ? 18
                    : ""
                },
        
                CSSGD_102_Low : {
                    color:exceedThresholdGD_102_Low && !maintainGD_102_Low
                    ? "#ff5656"
                    : maintainGD_102_Low
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_102_Low || maintainGD_102_Low)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_102_Low || maintainGD_102_Low)
                    ? 18
                    : ""
                },
        
                CSSTank_01_Volume : {
                    color:exceedThresholdTank_01_Volume && !maintainTank_01_Volume
                    ? "#ff5656"
                    : maintainTank_01_Volume
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTank_01_Volume || maintainTank_01_Volume)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTank_01_Volume || maintainTank_01_Volume)
                    ? 18
                    : ""
                },
                CSSTank_TT_301 : {
                    color:exceedThresholdTank_TT_301 && !maintainTank_TT_301
                    ? "#ff5656"
                    : maintainTank_TT_301
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTank_TT_301 || maintainTank_TT_301)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTank_TT_301 || maintainTank_TT_301)
                    ? 18
                    : ""
                },
                CSSTank_PT_301 : {
                    color:exceedThresholdTank_PT_301 && !maintainTank_PT_301
                    ? "#ff5656"
                    : maintainTank_PT_301
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTank_PT_301 || maintainTank_PT_301)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTank_PT_301 || maintainTank_PT_301)
                    ? 18
                    : ""
                },
        
          };



    // const dataEVC = [
    //     {
    //         name: <span>{tagNameEVC.InputPressure}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Pressure}>{EVC_01_Pressure}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.Temperature}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Temperature}>{EVC_01_Temperature}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.SVF}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Base_Condition}>{EVC_01_Flow_at_Base_Condition}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.GVF}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Flow_at_Measurement_Condition}>{EVC_01_Flow_at_Measurement_Condition}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.SVA}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Base_Condition}>{EVC_01_Volume_at_Base_Condition}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.GVA}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Volume_at_Measurement_Condition}>{EVC_01_Volume_at_Measurement_Condition}</span>,
    //     },
     

    //     {
    //         name: <span>{tagNameEVC.VbToday}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Current_Day}>{EVC_01_Vb_of_Current_Day}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.VbLastDay}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{EVC_01_Vb_of_Last_Day}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.VmToday}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Current_Day}>{EVC_01_Vm_of_Current_Day}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.VmLastDay}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>{EVC_01_Vm_of_Last_Day}</span>,
    //     },
    //     {
    //         name: <span>{tagNameEVC.ReBattery}</span>,
    //         evc1901: <span style={combineCss.CSSEVC_01_Remain_Battery_Service_Life}>{EVC_01_Remain_Battery_Service_Life}</span>,
    //     },
    // ];

    const dataPLC = [
        {
            name: <span>{tagNamePLC.PT01}</span>,
            PLC: <span style={combineCss.CSSVP_301}> {VP_301}</span>,
        },
        {
            name: <span>{tagNamePLC.VP_303}</span>,
            PLC: <span style={combineCss.CSSVP_303}>{} {VP_303}</span>,
        },
        {
            name: <span>{tagNamePLC.VP_302}</span>,
            PLC: <span style={combineCss.CSSVP_302}> {VP_302}</span>,
        },
    
      

        {
            name: <span>{tagNamePLC.ZSO}</span>,
            PLC: <span style={combineCss.CSSGD_103_High}>{GD_103_High} {DataZSO_1}</span>,
        },
      
        {
            name: <span>{tagNamePLC.ZSC}</span>,
            PLC: <span style={combineCss.CSSGD_102_High}>{GD_102_High} {DataZSC_1}</span>,
        },
      
        {
            name: <span>{tagNamePLC.UPS_BATTERY}</span>,
            PLC: <span style={combineCss.CSSGD_101_High}> {GD_101_High} {DataBattery}</span>,
        },
        {
            name: <span>{tagNamePLC.UPS_CHARGING}</span>,
            PLC: <span style={combineCss.CSSGD_103_Low}> {GD_103_Low} {DataCharging}</span>,
        },

     
        {
            name: <span>{tagNamePLC.UPS_ALARM}</span>,
            PLC: <span style={combineCss.CSSGD_101_Low}>{GD_101_Low} {DataAlarm}</span>,
        },

        // {
        //     name: <span>{tagNamePLC.Smoker_Detected}</span>,
        //     PLC: <span style={combineCss.CSSPipe_Press}>{Pipe_Press} {DataSmoker_Detected}</span>,
        // },
        {
            name: <span>{tagNamePLC.GD_102_Low}</span>,
            PLC: <span style={combineCss.CSSGD_102_Low}> {GD_102_Low} {DataMode}</span>,
        },


        

        {
            name: <span>{tagNamePLC.RESET}</span>,
            PLC: <span style={combineCss.CSSV1_Flow_Meter}>{V1_Flow_Meter} {DataRESET}</span>,
        },
        {
            name: <span>{tagNamePLC.EmergencyNO}</span>,
            PLC: <span style={combineCss.CSSV2_Flow_Meter}> {V2_Flow_Meter} {DataV2_Flow_Meter}</span>,
        },
        {
            name: <span>{tagNamePLC.EmergencyNC}</span>,
            PLC: <span style={combineCss.CSSPipe_Temp}>{Pipe_Temp} {DataPipe_Temp}</span>,
        },
     

        {
            name: <span>{tagNamePLC.HORN}</span>,
            PLC: <span style={combineCss.CSSTank_TT_301}>{Tank_TT_301} {DataHorn}</span>,
        },
        {
            name: <span>{tagNamePLC.BEACON}</span>,
            PLC: <span style={combineCss.CSSTank_PT_301}> {Tank_PT_301} {DataBeacon}</span>,
        },
        {
            name: <span>{tagNamePLC.SELECT_SW}</span>,
            PLC: <span style={combineCss.CSSSDV_302}>{SDV_302} {DataSDV_302}</span>,
        },
        {
            name: <span>{tagNamePLC.MAP}</span>,
            PLC: <span style={combineCss.CSSSDV_301}> {SDV_301} {DataMap1}</span>,
        },
    ];

    return (
        <div >
            <div style={{border:'1px solid gray', borderRadius:"10px 10px 0 0"}} >
                <div
                    style={{
                        background: "#64758B",
                        color: "white",
                        borderRadius: "10px 10px 0 0",
                        display:'flex',
                        justifyContent:'space-between'
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "5px 5px 0px 5px",
                        }}
                    >
                        <div style={{ fontSize: 30, fontWeight: 700 }}>
                            {" "}
                            MEIKO
                        </div>

                        
                       
                    </div>
            
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px 5px 5px",
                            justifyContent: "space-between",

                        }}
                    >
                       
                        <div style={{  fontWeight: 500 , display:'flex'}}>
                           <p style={{fontWeight:700}}>PLC</p> : {Conn_STTValue}
                        </div>
                    </div>
                </div>
                    <DataTable value={dataPLC} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > PLC Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="PLC"
                            header={PLC_Conn_STT === "0" ? (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                   {DotRed}  <p style={{marginLeft:5}}>PLC Value</p>
                                </div>
                            ) : (
                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                 {DotGreen} <p style={{marginLeft:5}}>PLC Value</p>
    
                                </div>
                            )}
                        ></Column>
                    </DataTable>
                
            </div>

            {/* <div>
                <SetAttribute1/>
            </div> */}

        </div>
    );
}
