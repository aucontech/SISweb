import React, { useEffect, useRef, useState } from "react";
import { id_SNG_BinhDuong, id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css";
import SetAttribute1 from "../../OTSUKA/title-OTK";
import { httpApi } from "@/api/http.api";
import { DotGreen, DotRed } from "./SVG_Scorecard";

import "./ScoreCard.css"
import { nameValue } from "../../SetupData/namValue";

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
export default function ScoreCard_SNG_BINHDUONG() {
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
                    entityId: id_SNG_BinhDuong,
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
                  



                        PT_2004: setPT_2004,
                        PT_2005: setPT_2005,
                        TT_2003: setTT_2003,
                        TT_2004: setTT_2004,
                        GD_102_High: setGD_102_High,
                        TG_2005: setTG_2005,

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


                        Tank_01_Mass: setTank_01_Mass,
                        Tank_01_Level: setTank_01_Level,
                        Flow_Meter_Total: setFlow_Meter_Total,

                        Consumption_Flow: setConsumption_Flow,
                        Flow_Velocity: setFlow_Velocity,

                        
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
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/values/attributes/SERVER_SCOPE`
            );



    
          

            const PT_2004_High = res.data.find((item: any) => item.key === "PT_2004_High");
            setPT_2004_High(PT_2004_High?.value || null);
            const PT_2004_Low = res.data.find((item: any) => item.key === "PT_2004_Low");
            setPT_2004_Low(PT_2004_Low?.value || null);
            const PT_2004_Maintain = res.data.find(
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


            const TG_2005_High = res.data.find((item: any) => item.key === "TG_2005_High");
            setTG_2005_High(TG_2005_High?.value || null);
            const TG_2005_Low = res.data.find((item: any) => item.key === "TG_2005_Low");
            setTG_2005_Low(TG_2005_Low?.value || null);
            const TG_2005_Maintain = res.data.find(
                (item: any) => item.key === "TG_2005_Maintain"
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

 // =================================================================================================================== 



            



           

            setMaintainPT_2004(PT_2004_Maintain?.value || false);


            setMaintainPT_2005(PT_2005_Maintain?.value || false);


            setMaintainTT_2003(TT_2003_Maintain?.value || false);


            setMaintainTT_2004(TT_2004_Maintain?.value || false);


            setMaintainGD_102_Low(GD_102_Low_Maintain?.value || false);

            setMaintainV1_Flow_Meter(V1_Flow_Meter_Maintain?.value || false);
            
            setMaintainV2_Flow_Meter(V2_Flow_Meter_Maintain?.value || false);
            
            setMaintainTG_2005(TG_2005_Maintain?.value || false);

            
            setMaintainPipe_Temp(Pipe_Temp_Maintain?.value || false);



            setMaintainSDV_302(SDV_302_Maintain?.value || false);


            setMaintainGD_101_Low(GD_101_Low_Maintain?.value || false);


            setMaintainGD_103_Low(GD_103_Low_Maintain?.value || false);

            setMaintainSDV_301(SDV_301_Maintain?.value || false);





            setMaintainGD_102_High(GD_102_High_Maintain?.value || false);

            setMaintainTank_TT_301(Tank_TT_301_Maintain?.value || false);


            setMaintainTank_PT_301(Tank_PT_301_Maintain?.value || false);


            setMaintainTank_01_Volume(Tank_01_Volume_Maintain?.value || false);

            setMaintainTank_01_Mass(Tank_01_Mass_Maintain?.value || false);

            setMaintainTank_01_Level(Tank_01_Level_Maintain?.value || false);

            setMaintainFlow_Meter_Total(Flow_Meter_Total_Maintain?.value || false);


            setMaintainConsumption_Flow(Consumption_Flow_Maintain?.value || false);


            setMaintainFlow_Velocity(Flow_Velocity_Maintain?.value || false);
           
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 


  // =================================================================================================================== 
 
 
  const [PT_2004, setPT_2004] = useState<string | null>(null);
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
                          setExceedThresholdPT_2004(true);
                  } else {
                     setExceedThresholdPT_2004(false);
                  }
              } 
          } 
      }, [PT_2004_High, PT_2004, PT_2004_Low,maintainPT_2004]);


  // =================================================================================================================== 



       const [PT_2005, setPT_2005] = useState<string | null>(null);
       const [PT_2005_High, setPT_2005_High] = useState<number | null>(null);
       const [PT_2005_Low, setPT_2005_Low] = useState<number | null>(null);
       const [exceedThresholdPT_2005, setExceedThresholdPT_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainPT_2005, setMaintainPT_2005] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof PT_2005_High === 'string' && typeof PT_2005_Low === 'string' && PT_2005 !== null && maintainPT_2005 === false
               ) {
                   const highValue = parseFloat(PT_2005_High);
                   const lowValue = parseFloat(PT_2005_Low);
                   const PT_2005Value = parseFloat(PT_2005);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2005Value)) {
                       if (highValue <= PT_2005Value || PT_2005Value <= lowValue) {
                               setExceedThresholdPT_2005(true);
                       } else {
                          setExceedThresholdPT_2005(false);
                       }
                   } 
               } 
           }, [PT_2005_High, PT_2005, PT_2005_Low,maintainPT_2005]);
       

  
       // =================================================================================================================== 


       const [TT_2003, setTT_2003] = useState<string | null>(null);

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
                               setExceedThresholdTT_2003(true);
                       } else {
                          setExceedThresholdTT_2003(false);
                       }
                   } 
               } 
           }, [TT_2003_High, TT_2003 , TT_2003_Low,maintainTT_2003]);
       

  
       // =================================================================================================================== 

       const [TT_2004, setTT_2004] = useState<string | null>(null);
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
                               setExceedThresholdTT_2004(true);
                       } else {
                          setExceedThresholdTT_2004(false);
                       }
                   } 
               } 
           }, [TT_2004_High, TT_2004, TT_2004_Low,maintainTT_2004]);
       

  
  
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

     const [TG_2005, setTG_2005] = useState<string | null>(null);
    
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
                             setExceedThresholdTG_2005(true);
                     } else {
                        setExceedThresholdTG_2005(false);
                     }
                 } 
             } 
         }, [TG_2005_High, TG_2005, TG_2005_Low,maintainTG_2005]);
     
 
     
     
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
         // =================================================================================================================== 
        
        
        const [Tank_01_Mass, setTank_01_Mass] = useState<string | null>(null);

        const [Tank_01_Mass_High, setTank_01_Mass_High] = useState<number | null>(null);
        const [Tank_01_Mass_Low, setTank_01_Mass_Low] = useState<number | null>(null);
        const [exceedThresholdTank_01_Mass, setExceedThresholdTank_01_Mass] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainTank_01_Mass, setMaintainTank_01_Mass] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof Tank_01_Mass_High === 'string' && typeof Tank_01_Mass_Low === 'string' && Tank_01_Mass !== null && maintainTank_01_Mass === false
                ) {
                    const highValue = parseFloat(Tank_01_Mass_High);
                    const lowValue = parseFloat(Tank_01_Mass_Low);
                    const Tank_01_MassValue = parseFloat(Tank_01_Mass);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_01_MassValue)) {
                        if (highValue <= Tank_01_MassValue || Tank_01_MassValue <= lowValue) {
                                setExceedThresholdTank_01_Mass(true);
                        } else {
                           setExceedThresholdTank_01_Mass(false);
                        }
                    } 
                } 
            }, [Tank_01_Mass_High, Tank_01_Mass, Tank_01_Mass_Low,maintainTank_01_Mass]);
        
         
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [Tank_01_Level, setTank_01_Level] = useState<string | null>(null);
   
        const [Tank_01_Level_High, setTank_01_Level_High] = useState<number | null>(null);
        const [Tank_01_Level_Low, setTank_01_Level_Low] = useState<number | null>(null);
        const [exceedThresholdTank_01_Level, setExceedThresholdTank_01_Level] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainTank_01_Level, setMaintainTank_01_Level] = useState<boolean>(false);
        
        
        useEffect(() => {
            if (typeof Tank_01_Level_High === 'string' && typeof Tank_01_Level_Low === 'string' && Tank_01_Level !== null && maintainTank_01_Level === false
            ) {
                const highValue = parseFloat(Tank_01_Level_High);
                const lowValue = parseFloat(Tank_01_Level_Low);
                const Tank_01_LevelValue = parseFloat(Tank_01_Level);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_01_LevelValue)) {
                    if (highValue <= Tank_01_LevelValue || Tank_01_LevelValue <= lowValue) {
                            setExceedThresholdTank_01_Level(true);
                    } else {
                       setExceedThresholdTank_01_Level(false);
                    }
                } 
            } 
        }, [Tank_01_Level_High, Tank_01_Level, Tank_01_Level_Low,maintainTank_01_Level]);
        
 
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
                      if (typeof Consumption_Flow_High === 'string' && typeof Consumption_Flow_Low === 'string' && Consumption_Flow !== null && maintainConsumption_Flow === false
                      ) {
                          const highValue = parseFloat(Consumption_Flow_High);
                          const lowValue = parseFloat(Consumption_Flow_Low);
                          const Consumption_FlowValue = parseFloat(Consumption_Flow);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Consumption_FlowValue)) {
                              if (highValue <= Consumption_FlowValue || Consumption_FlowValue <= lowValue) {
                                      setExceedThresholdConsumption_Flow(true);
                              } else {
                                 setExceedThresholdConsumption_Flow(false);
                              }
                          } 
                      } 
                  }, [Consumption_Flow_High, Consumption_Flow, Consumption_Flow_Low,maintainConsumption_Flow]);
                  
      
                  
                  // =================================================================================================================== 


                         // =================================================================================================================== 
        
                         const [Flow_Velocity, setFlow_Velocity] = useState<string | null>(null);
                
                         const [Flow_Velocity_High, setFlow_Velocity_High] = useState<number | null>(null);
                         const [Flow_Velocity_Low, setFlow_Velocity_Low] = useState<number | null>(null);
                         const [exceedThresholdFlow_Velocity, setExceedThresholdFlow_Velocity] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                         
                         const [maintainFlow_Velocity, setMaintainFlow_Velocity] = useState<boolean>(false);
                         
                         
                         useEffect(() => {
                             if (typeof Flow_Velocity_High === 'string' && typeof Flow_Velocity_Low === 'string' && Flow_Velocity !== null && maintainFlow_Velocity === false
                             ) {
                                 const highValue = parseFloat(Flow_Velocity_High);
                                 const lowValue = parseFloat(Flow_Velocity_Low);
                                 const Flow_VelocityValue = parseFloat(Flow_Velocity);
                         
                                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Flow_VelocityValue)) {
                                     if (highValue <= Flow_VelocityValue || Flow_VelocityValue <= lowValue) {
                                             setExceedThresholdFlow_Velocity(true);
                                     } else {
                                        setExceedThresholdFlow_Velocity(false);
                                     }
                                 } 
                             } 
                         }, [Flow_Velocity_High, Flow_Velocity, Flow_Velocity_Low,maintainFlow_Velocity]);
                         
                     
                         
                         
                         // =================================================================================================================== 
  

     //======================================================================================================================

    const tagNamePLC = {
        PT_2005: "Pressure Transmitter PT-2005 (BarG)",
        PT_2004: "Pressure Transmitter PT-2004 (BarG)",
        TT_2004: "Temperature Transmitter TT-2003 (˚C)",
        TT_2003: "Temperature Transmitter TT-2004 (˚C) ",
        TG_2005: "TG-2005 (˚C)",

        GD_102_High: "GD 102 High (0: Normal - 1: Alarm)",


        GD_103_Low: "GD 103 Low (0: Normal - 1: Alarm)",
        GD_102_Low: "GD 102 Low (0: Normal - 1: Alarm)",

        GD_101_Low: "GD 101 Low (0: Normal - 1: Alarm)",

        SDV_302: "SDV 302 (0: Off - 1: On)",
        SDV_301: "SDV 301 (0: Off - 1: On)",

        V1_Flow_Meter: `V1 Flow Meter ${nameValue.m3}`,
        V2_Flow_Meter: `V2 Flow Meter ${nameValue.m3}`,

        Pipe_Temp:`Pipe Temp ${nameValue.C}`,
        Pipe_Press:`Pipe Press  (Bar)`,

        Tank_TT_301: `Tank TT 301  ${nameValue.C}`,

        Tank_PT_301: `Tank PT 301 (Bar)`,

        Tank_01_Level: `Tank_01_Level `,

        HORN: `HORN (0: OFF - 1: ON)`,
        Tank_01_Volume: `SDV SOLENOID (0: Off - 1: On)`,

        Consumption_Flow: `Consumption Flow ${nameValue.m3}`,
        Flow_Velocity:`Flow Velocity ${nameValue.m3h}`


    };

        const DataTT_2003  = TT_2003 === "0" ? "Stop" : TT_2003 === "1" ? "Run" : null;
        const DataPT_2005  = PT_2005 === "0" ? "Stop" : PT_2005 === "1" ? "Run" : null;
        const DataPT_2004  = PT_2004 === "0" ? "Stop" : PT_2004 === "1" ? "Run" : null;

        const DataTG_2005  = TG_2005 === "0" ? "Normal" : TG_2005 === "1" ? "Alarm" : null;
        const DataGD_102_High  = GD_102_High === "0" ? "Normal" : GD_102_High === "1" ? "Alarm" : null;
        const DataTT_2004  = TT_2004 === "0" ? "Normal" : TT_2004 === "1" ? "Alarm" : null;

        const DataGD_101_Low  = GD_101_Low === "0" ? "Normal" : GD_101_Low === "1" ? "Alarm" : null;
        const DataGD_102_Low  = GD_102_Low === "0" ? "Normal" : GD_102_Low === "1" ? "Alarm" : null;
        const DataGD_103_Low  = GD_103_Low === "0" ? "Normal" : GD_103_Low === "1" ? "Alarm" : null;

        const DataSDV_301  = SDV_301 === "0" ? "Off" : SDV_301 === "1" ? "On" : null;
        const DataSDV_302  = SDV_302 === "0" ? "Off" : SDV_302 === "1" ? "On" : null;


            const combineCss = {





            
        
                CSSPT_2004 : {
                    color:exceedThresholdPT_2004 && !maintainPT_2004
                    ? "#ff5656"
                    : maintainPT_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2004 || maintainPT_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2004 || maintainPT_2004)
                    ? 18
                    : ""
                },
        
        
                CSSPT_2005 : {
                    color:exceedThresholdPT_2005 && !maintainPT_2005
                    ? "#ff5656"
                    : maintainPT_2005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2005 || maintainPT_2005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2005 || maintainPT_2005)
                    ? 18
                    : ""
                },
        
        
                CSSTT_2003 : {
                    color:exceedThresholdTT_2003 && !maintainTT_2003
                    ? "#ff5656"
                    : maintainTT_2003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2003 || maintainTT_2003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2003 || maintainTT_2003)
                    ? 18
                    : ""
                },
                CSSTT_2004 : {
                    color:exceedThresholdTT_2004 && !maintainTT_2004
                    ? "#ff5656"
                    : maintainTT_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2004 || maintainTT_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2004 || maintainTT_2004)
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
        
        
        
        
                CSSTG_2005 : {
                    color:exceedThresholdTG_2005 && !maintainTG_2005
                    ? "#ff5656"
                    : maintainTG_2005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTG_2005 || maintainTG_2005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTG_2005 || maintainTG_2005)
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



                CSSTank_01_Mass : {
                    color:exceedThresholdTank_01_Mass && !maintainTank_01_Mass
               ? "#ff5656"
               : maintainTank_01_Mass
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdTank_01_Mass || maintainTank_01_Mass)
               ? 600
               : "",
               fontSize: (exceedThresholdTank_01_Mass || maintainTank_01_Mass)
               ? 18
               : ""
           },
   
           CSSTank_01_Level : {
               color:exceedThresholdTank_01_Level && !maintainTank_01_Level
               ? "#ff5656"
               : maintainTank_01_Level
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdTank_01_Level || maintainTank_01_Level)
               ? 600
               : "",
               fontSize: (exceedThresholdTank_01_Level || maintainTank_01_Level)
               ? 18
               : ""
           },
   
           CSSFlow_Meter_Total : {
               color:exceedThresholdFlow_Meter_Total && !maintainFlow_Meter_Total
               ? "#ff5656"
               : maintainFlow_Meter_Total
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdFlow_Meter_Total || maintainFlow_Meter_Total)
               ? 600
               : "",
               fontSize: (exceedThresholdFlow_Meter_Total || maintainFlow_Meter_Total)
               ? 18
               : ""
           },
           CSSConsumption_Flow : {
               color:exceedThresholdConsumption_Flow && !maintainConsumption_Flow
               ? "#ff5656"
               : maintainConsumption_Flow
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdConsumption_Flow || maintainConsumption_Flow)
               ? 600
               : "",
               fontSize: (exceedThresholdConsumption_Flow || maintainConsumption_Flow)
               ? 18
               : ""
           },
           CSSFlow_Velocity : {
               color:exceedThresholdFlow_Velocity && !maintainFlow_Velocity
               ? "#ff5656"
               : maintainFlow_Velocity
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdFlow_Velocity || maintainFlow_Velocity)
               ? 600
               : "",
               fontSize: (exceedThresholdFlow_Velocity || maintainFlow_Velocity)
               ? 18
               : ""
           },
   
        
          };




    const dataPLC = [
        {
            name: <span>{tagNamePLC.PT_2004}</span>,
            PLC: <span style={combineCss.CSSPT_2004}>{} {PT_2004} {DataPT_2004}</span>,
        },

        {
            name: <span>{tagNamePLC.PT_2005}</span>,
            PLC: <span style={combineCss.CSSPT_2005}> {PT_2005} {DataPT_2005}</span>,
        },
     
        {
            name: <span>{tagNamePLC.TT_2004}</span>,
            PLC: <span style={combineCss.CSSGD_102_High}>{GD_102_High} {DataGD_102_High}</span>,
        },
        {
            name: <span>{tagNamePLC.TT_2003}</span>,
            PLC: <span style={combineCss.CSSTT_2003}> {TT_2003} {DataTT_2003}</span>,
        },
   
        {
            name: <span>{tagNamePLC.TG_2005}</span>,
            PLC: <span style={combineCss.CSSTG_2005}> {TG_2005} {DataTG_2005}</span>,
        },
      

        {
            name: <span>{tagNamePLC.V1_Flow_Meter}</span>,
            PLC: <span style={combineCss.CSSV1_Flow_Meter}>{V1_Flow_Meter} </span>,
        },
        {
            name: <span>{tagNamePLC.V2_Flow_Meter}</span>,
            PLC: <span style={combineCss.CSSV2_Flow_Meter}> {V2_Flow_Meter} </span>,
        },


        {
            name: <span>{tagNamePLC.Pipe_Temp}</span>,
            PLC: <span style={combineCss.CSSPipe_Temp}>{Pipe_Temp} </span>,
        },
     
        {
            name: <span>{tagNamePLC.Pipe_Press}</span>,
            PLC: <span style={combineCss.CSSPipe_Press}>{Pipe_Press}</span>,
        },
        {
            name: <span>{tagNamePLC.Tank_TT_301}</span>,
            PLC: <span style={combineCss.CSSTank_TT_301}>{Tank_TT_301}  </span>,
        },
        {
            name: <span>{tagNamePLC.Tank_PT_301}</span>,
            PLC: <span style={combineCss.CSSTank_PT_301}> {Tank_PT_301} </span>,
        },

        {
            name: <span>Tank Level (%)</span>,
            PLC: <span style={combineCss.CSSTank_01_Level}>{Tank_01_Level} </span>,
        },

    
//===

        {
            name: <span>Tank Mass (Kg)</span>,
            PLC: <span style={combineCss.CSSTank_01_Mass}>{Tank_01_Mass}  </span>,
        },
     
        {
            name: <span>Tank Volume (L)</span>,
            PLC: <span style={combineCss.CSSTank_01_Mass}>{Tank_01_Volume}  </span>,
        },
      


        {
            name: <span>{tagNamePLC.Consumption_Flow}</span>,
            PLC: <span style={combineCss.CSSConsumption_Flow}>{Consumption_Flow} </span>,
        },
        {
            name: <span>{tagNamePLC.Flow_Velocity}</span>,
            PLC: <span style={combineCss.CSSFlow_Velocity}> {Flow_Velocity} </span>,
        },
     
     
    
        {
            name: <span>{tagNamePLC.GD_102_High}</span>,
            PLC: <span style={combineCss.CSSTT_2004}>{TT_2004} {DataTT_2004}</span>,
        },
      
      
        {
            name: <span>{tagNamePLC.GD_101_Low}</span>,
            PLC: <span style={combineCss.CSSGD_101_Low}>{GD_101_Low} {DataGD_101_Low}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_102_Low}</span>,
            PLC: <span style={combineCss.CSSGD_102_Low}> {GD_102_Low} {DataGD_102_Low}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_103_Low}</span>,
            PLC: <span style={combineCss.CSSGD_103_Low}> {GD_103_Low} {DataGD_103_Low}</span>,
        },

     
 


        {
            name: <span>{tagNamePLC.SDV_301}</span>,
            PLC: <span style={combineCss.CSSSDV_301}> {SDV_301} {DataSDV_301}</span>,
        },
        
        {
            name: <span>{tagNamePLC.SDV_302}</span>,
            PLC: <span style={combineCss.CSSSDV_302}>{SDV_302} {DataSDV_302}</span>,
        },
      
    ];

    return (
        <div >
            <div  >
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
                            header={PLC_Conn_STT === "1" ? (

                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>PLC Value</p>
   
                               </div>
                              
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                   {DotRed}  <p style={{marginLeft:5}}>PLC Value</p>
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
