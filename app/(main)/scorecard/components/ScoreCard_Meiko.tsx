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

 // =================================================================================================================== 

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
// =================================================================================================================== 


  // =================================================================================================================== 
 
 
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

    const tagNamePLC = {
        VP_301: "VP-301 (0: Stop - 1: Run) ",
        VP_302: "VP-302 (0: Stop - 1: Run)",
        VP_303: "VP-303 (0: Stop - 1: Run)",
        GD_101_High: "GD-101 High (0: Normal - 1: Alarm)",
        GD_102_High: "GD-102 High (0: Normal - 1: Alarm)",
        GD_103_High: "GD-103 High (0: Normal - 1: Alarm)",


        GD_103_Low: "GD-103 Low (0: Normal - 1: Alarm)",
        GD_102_Low: "GD-102 Low (0: Normal - 1: Alarm)",
        GD_101_Low: "GD-101 Low (0: Normal - 1: Alarm)",

        SDV_302: "SDV-302 (0: OFF - 1: ON)",
        SDV_301: "SDV-301 (0: OFF - 1: ON)",

        V1_Flow_Meter: `V1 Flow Meter ${nameValue.m3}`,
        V2_Flow_Meter: `V2 Flow Meter ${nameValue.m3}`,

        Pipe_Temp:`Pipe Temp ${nameValue.C}`,
        Pipe_Press:`Pipe Press (Bar)`,

        Tank_TT_301: `Tank TT-301  ${nameValue.C}`,

        Tank_PT_301: `Tank PT-301 (Bar)`,

        Tank_01_Level: `Tank-01 Level `,

        HORN: `HORN (0: OFF - 1: ON)`,
        Tank_01_Volume: `Tank-01 Volume `,

        Consumption_Flow: `Consumption Flow ${nameValue.m3}`,
        Flow_Velocity:`Flow Velocity ${nameValue.m3h}`


    };

        const DataVP_301  = VP_301 === "0" ? "Stop" : VP_301 === "1" ? "Run" : null;
        const DataVP_302  = VP_302 === "0" ? "Stop" : VP_302 === "1" ? "Run" : null;
        const DataVP_303  = VP_303 === "0" ? "Stop" : VP_303 === "1" ? "Run" : null;

        const DataGD_101_High  = GD_101_High === "0" ? "Normal" : GD_101_High === "1" ? "Alarm" : null;
        const DataGD_102_High  = GD_102_High === "0" ? "Normal" : GD_102_High === "1" ? "Alarm" : null;
        const DataGD_103_High  = GD_103_High === "0" ? "Normal" : GD_103_High === "1" ? "Alarm" : null;

        const DataGD_101_Low  = GD_101_Low === "0" ? "Normal" : GD_101_Low === "1" ? "Alarm" : null;
        const DataGD_102_Low  = GD_102_Low === "0" ? "Normal" : GD_102_Low === "1" ? "Alarm" : null;
        const DataGD_103_Low  = GD_103_Low === "0" ? "Normal" : GD_103_Low === "1" ? "Alarm" : null;

        const DataSDV_301  = SDV_301 === "0" ? "OFF" : SDV_301 === "1" ? "ON" : null;
        const DataSDV_302  = SDV_302 === "0" ? "OFF" : SDV_302 === "1" ? "ON" : null;


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
            name: <span>Tank-01 Level (%)</span>,
            PLC: <span style={combineCss.CSSTank_01_Level}>{Tank_01_Level} </span>,
        },

    
//===

        {
            name: <span>Tank-01 Mass (Kg)</span>,
            PLC: <span style={combineCss.CSSTank_01_Mass}>{Tank_01_Mass}  </span>,
        },
     
        {
            name: <span>Tank-01 Volume (L)</span>,
            PLC: <span style={combineCss.CSSTank_01_Volume}>{Tank_01_Volume}  </span>,
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
            name: <span>{tagNamePLC.VP_301}</span>,
            PLC: <span style={combineCss.CSSVP_301}> {VP_301} {DataVP_301}</span>,
        },
   
        {
            name: <span>{tagNamePLC.VP_302}</span>,
            PLC: <span style={combineCss.CSSVP_302}> {VP_302} {DataVP_302}</span>,
        },
        {
            name: <span>{tagNamePLC.VP_303}</span>,
            PLC: <span style={combineCss.CSSVP_303}>{} {VP_303} {DataVP_303}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_101_High}</span>,
            PLC: <span style={combineCss.CSSGD_101_High}> {GD_101_High} {DataGD_101_High}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_103_High}</span>,
            PLC: <span style={combineCss.CSSGD_102_High}>{GD_102_High} {DataGD_102_High}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_102_High}</span>,
            PLC: <span style={combineCss.CSSGD_103_High}>{GD_103_High} {DataGD_103_High}</span>,
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
        <div style={{width:'60%'}} >
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

        

    );
}
