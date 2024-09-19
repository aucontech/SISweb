import React, { useEffect, useRef, useState } from 'react'
import { id_THACHTHAT } from '../../data-table-device/ID-DEVICE/IdDevice';
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
import { nameValue } from '../namValue';
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
export default function SetUpdata_Meiko() {

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
                    entityId: id_THACHTHAT,
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
                           
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_THACHTHAT,
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
                        VP_303: setVP_303,
                        VP_302: setVP_302,
                        VP_301: setVP_301,
                        GD_103_High: setGD_103_High,
                        GD_102_High: setGD_102_High,
                        GD_101_High: setGD_101_High,

                        GD_103_Low: setGD_103_Low,
                        GD_102_Low: setGD_102_Low,
                        GD_101_Low: setGD_101_Low,

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
                        PLC_Conn_STT:setPLC_Conn_STT

                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
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
            const MaintainVP_303 = res.data.find(
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

            const V2_Flow_Meter_High = res.data.find((item: any) => item.key === "V2_Flow_Meter_High");
            setV2_Flow_Meter_High(V2_Flow_Meter_High?.value || null);
            const V2_Flow_Meter_Low = res.data.find((item: any) => item.key === "V2_Flow_Meter_Low");
            setV2_Flow_Meter_Low(V2_Flow_Meter_Low?.value || null);
            const V2_Flow_Meter_Maintain = res.data.find(
                (item: any) => item.key === "V2_Flow_Meter_Maintain"
            );

            const Pipe_Temp_High = res.data.find((item: any) => item.key === "Pipe_Temp_High");
            setPipe_Temp_High(Pipe_Temp_High?.value || null);
            const Pipe_Temp_Low = res.data.find((item: any) => item.key === "Pipe_Temp_Low");
            setPipe_Temp_Low(Pipe_Temp_Low?.value || null);
            const Pipe_Temp_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Temp_Maintain"
            );

            const Pipe_Press_High = res.data.find((item: any) => item.key === "Pipe_Press_High");
            setPipe_Press_High(Pipe_Press_High?.value || null);
            const Pipe_Press_Low = res.data.find((item: any) => item.key === "Pipe_Press_Low");
            setPipe_Press_Low(Pipe_Press_Low?.value || null);
            const Pipe_Press_Maintain = res.data.find(
                (item: any) => item.key === "Pipe_Press_Maintain"
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

 setMaintainConsumption_Flow(Consumption_Flow_Maintain?.value || false);


 setMaintainFlow_Velocity(Flow_Velocity_Maintain?.value || false);


            setMaintainVP_303(MaintainVP_303?.value || false);


            setMaintainVP_302(VP_302_Maintain?.value || false);

            setMaintainVP_301(VP_301_Maintain?.value || false);


            setMaintainGD_103_High(GD_103_High_Maintain?.value || false);


            setMaintainGD_102_High(GD_102_High_Maintain?.value || false);


            setMaintainGD_101_High(GD_101_High_Maintain?.value || false);


            setMaintainTank_01_Level(Tank_01_Level_Maintain?.value || false);

            
            setMaintainTank_01_Mass(Tank_01_Mass_Maintain?.value || false);
            
            setMaintainTank_01_Volume(Tank_01_Volume_Maintain?.value || false);

            
            setMaintainTank_PT_301(Tank_PT_301_Maintain?.value || false);

            setMaintainTank_TT_301(Tank_TT_301_Maintain?.value || false);


            setMaintainPipe_Press(Pipe_Press_Maintain?.value || false);

            setMaintainPipe_Temp(Pipe_Temp_Maintain?.value || false);

            setMaintainV2_Flow_Meter(V2_Flow_Meter_Maintain?.value || false);


            setMaintainV1_Flow_Meter(V1_Flow_Meter_Maintain?.value || false);

            setMaintainSDV_302(SDV_302_Maintain?.value || false);


            setMaintainSDV_301(SDV_301_Maintain?.value || false);

            setMaintainGD_101_Low(GD_101_Low_Maintain?.value || false);


            setMaintainGD_102_Low(GD_102_Low_Maintain?.value || false);


            setMaintainGD_103_Low(GD_103_Low_Maintain?.value || false);

            setMaintainFlow_Meter_Total(Flow_Meter_Total_Maintain?.value || false);
            setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);


            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };


 // =================================================================================================================== 

    const [VP_303, setVP_303] = useState<string | null>(null);
const [inputValueVP_303, setInputValueVP_303] = useState<any>();
const [inputValue2VP_303, setInputValue2VP_303] = useState<any>();
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

    const handleInputChangeVP_303 = (event: any) => {
        const newValue = event.target.value;
        setInputValueVP_303(newValue);
    };

    const handleInputChange2VP303 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2VP_303(newValue2);
    };
    const ChangeMaintainVP_303 = async () => {
        try {
            const newValue = !maintainVP_303;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                { VP_303_Maintain: newValue }
            );
            setMaintainVP_303(newValue);
            
        } catch (error) {}
    };


    

     // =================================================================================================================== 

     const [VP_302, setVP_302] = useState<string | null>(null);
     const [audioPlayingVP_302, setAudioPlayingVP_302] = useState(false);
     const [inputValueVP_302, setInputValueVP_302] = useState<any>();
     const [inputValue2VP_302, setInputValue2VP_302] = useState<any>();
     const [VP_302_High, setVP_302_High] = useState<number | null>(null);
     const [VP_302_Low, setVP_302_Low] = useState<number | null>(null);
     const [exceedThreshold302, setExceedThresholdVP_302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainVP_302, setMaintainVP_302] = useState<boolean>(false);
     
     
  
useEffect(() => {
    const VP_302Value = parseFloat(VP_302 as any);
    const highValue = VP_302_High ?? NaN;
    const lowValue = VP_302_Low ?? NaN;

    if (!isNaN(VP_302Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVP_302) {
        setExceedThresholdVP_302(VP_302Value >= highValue || VP_302Value <= lowValue);
    }
}, [VP_302, VP_302_High, VP_302_Low, maintainVP_302]);
     
         const handleInputChangeVP_302 = (event: any) => {
             const newValue = event.target.value;
             setInputValueVP_302(newValue);
         };
     
         const handleInputChange2VP_302 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2VP_302(newValue2);
         };
         const ChangeMaintainVP_302 = async () => {
             try {
                 const newValue = !maintainVP_302;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                     { VP_302_Maintain: newValue }
                 );
                 setMaintainVP_302(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 


     const [VP_301, setVP_301] = useState<string | null>(null);
     const [audioPlayingVP_301, setAudioPlayingVP_301] = useState(false);
     const [inputValueVP_301, setInputValueVP_301] = useState<any>();
     const [inputValue2VP_301, setInputValue2VP_301] = useState<any>();
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
     
         const handleInputChangeVP_301 = (event: any) => {
             const newValue = event.target.value;
             setInputValueVP_301(newValue);
         };
     
         const handleInputChange2VP_301 = (event: any) => {
             const newValue2 = event.target.value;
             setInputValue2VP_301(newValue2);
         };
         const ChangeMaintainVP_301 = async () => {
             try {
                 const newValue = !maintainVP_301;
                 await httpApi.post(
                     `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                     { VP_301_Maintain: newValue }
                 );
                 setMaintainVP_301(newValue);
                 
             } catch (error) {}
         };


     // =================================================================================================================== 



          const [GD_103_High, setGD_103_High] = useState<string | null>(null);
          const [audioPlayingGD_103_High, setAudioPlayingGD_103_High] = useState(false);
          const [inputValueGD_103_High, setInputValueGD_103_High] = useState<any>();
          const [inputValue2GD_103_High, setInputValue2GD_103_High] = useState<any>();
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
          
              const handleInputChangeGD_103_High = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_103_High(newValue);
              };
          
              const handleInputChange2GD_103_High = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_103_High(newValue2);
              };
              const ChangeMaintainGD_103_High = async () => {
                  try {
                      const newValue = !maintainGD_103_High;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_103_High_Maintain: newValue }
                      );
                      setMaintainGD_103_High(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [GD_102_High, setGD_102_High] = useState<string | null>(null);
          const [inputValueGD_102_High, setInputValueGD_102_High] = useState<any>();
          const [inputValue2GD_102_High, setInputValue2GD_102_High] = useState<any>();
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
          
              const handleInputChangeGD_102_High = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_102_High(newValue);
              };
          
              const handleInputChange2GD_102_High = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_102_High(newValue2);
              };
              const ChangeMaintainGD_102_High = async () => {
                  try {
                      const newValue = !maintainGD_102_High;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_102_High_Maintain: newValue }
                      );
                      setMaintainGD_102_High(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_101_High, setGD_101_High] = useState<string | null>(null);
          const [inputValueGD_101_High, setInputValueGD_101_High] = useState<any>();
          const [inputValue2GD_101_High, setInputValue2GD_101_High] = useState<any>();
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
          
           
          
              const handleInputChangeGD_101_High = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_101_High(newValue);
              };
          
              const handleInputChange2GD_101_High = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_101_High(newValue2);
              };
              const ChangeMaintainGD_101_High = async () => {
                  try {
                      const newValue = !maintainGD_101_High;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_101_High_Maintain: newValue }
                      );
                      setMaintainGD_101_High(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 


          const [GD_101_Low, setGD_101_Low] = useState<string | null>(null);
          const [inputValueGD_101_Low, setInputValueGD_101_Low] = useState<any>();
          const [inputValue2GD_101_Low, setInputValue2GD_101_Low] = useState<any>();
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
          
              const handleInputChangeGD_101_Low = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_101_Low(newValue);
              };
          
              const handleInputChange2GD_101_Low = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_101_Low(newValue2);
              };
              const ChangeMaintainGD_101_Low = async () => {
                  try {
                      const newValue = !maintainGD_101_Low;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_101_Low_Maintain: newValue }
                      );
                      setMaintainGD_101_Low(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_102_Low, setGD_102_Low] = useState<string | null>(null);
          const [inputValueGD_102_Low, setInputValueGD_102_Low] = useState<any>();
          const [inputValue2GD_102_Low, setInputValue2GD_102_Low] = useState<any>();
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
          
              const handleInputChangeGD_102_Low = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_102_Low(newValue);
              };
          
              const handleInputChange2GD_102_Low = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_102_Low(newValue2);
              };
              const ChangeMaintainGD_102_Low = async () => {
                  try {
                      const newValue = !maintainGD_102_Low;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_102_Low_Maintain: newValue }
                      );
                      setMaintainGD_102_Low(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [GD_103_Low, setGD_103_Low] = useState<string | null>(null);
          const [inputValueGD_103_Low, setInputValueGD_103_Low] = useState<any>();
          const [inputValue2GD_103_Low, setInputValue2GD_103_Low] = useState<any>();
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
          
              const handleInputChangeGD_103_Low = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueGD_103_Low(newValue);
              };
          
              const handleInputChange2GD_103_Low = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2GD_103_Low(newValue2);
              };
              const ChangeMaintainGD_103_Low = async () => {
                  try {
                      const newValue = !maintainGD_103_Low;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { GD_103_Low_Maintain: newValue }
                      );
                      setMaintainGD_103_Low(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

          const [SDV_301, setSDV_301] = useState<string | null>(null);
          const [inputValueSDV_301, setInputValueSDV_301] = useState<any>();
          const [inputValue2SDV_301, setInputValue2SDV_301] = useState<any>();
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
          
              const handleInputChangeSDV_301 = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueSDV_301(newValue);
              };
          
              const handleInputChange2SDV_301 = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2SDV_301(newValue2);
              };
              const ChangeMaintainSDV_301 = async () => {
                  try {
                      const newValue = !maintainSDV_301;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                          { SDV_301_Maintain: newValue }
                      );
                      setMaintainSDV_301(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [SDV_302, setSDV_302] = useState<string | null>(null);
    const [audioPlayingSDV_302, setAudioPlayingSDV_302] = useState(false);
    const [inputValueSDV_302, setInputValueSDV_302] = useState<any>();
    const [inputValue2SDV_302, setInputValue2SDV_302] = useState<any>();
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
    
        const handleInputChangeSDV_302 = (event: any) => {
            const newValue = event.target.value;
            setInputValueSDV_302(newValue);
        };
    
        const handleInputChange2SDV_302 = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2SDV_302(newValue2);
        };
        const ChangeMaintainSDV_302 = async () => {
            try {
                const newValue = !maintainSDV_302;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                    { SDV_302_Maintain: newValue }
                );
                setMaintainSDV_302(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

        const [V1_Flow_Meter, setV1_Flow_Meter] = useState<string | null>(null);
        const [audioPlayingV1_Flow_Meter, setAudioPlayingV1_Flow_Meter] = useState(false);
        const [inputValueV1_Flow_Meter, setInputValueV1_Flow_Meter] = useState<any>();
        const [inputValue2V1_Flow_Meter, setInputValue2V1_Flow_Meter] = useState<any>();
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
        
            const handleInputChangeV1_Flow_Meter = (event: any) => {
                const newValue = event.target.value;
                setInputValueV1_Flow_Meter(newValue);
            };
        
            const handleInputChange2V1_Flow_Meter = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2V1_Flow_Meter(newValue2);
            };
            const ChangeMaintainV1_Flow_Meter = async () => {
                try {
                    const newValue = !maintainV1_Flow_Meter;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                        { V1_Flow_Meter_Maintain: newValue }
                    );
                    setMaintainV1_Flow_Meter(newValue);
                    
                } catch (error) {}
            };
    
    
        // =================================================================================================================== 

            // =================================================================================================================== 

    const [V2_Flow_Meter, setV2_Flow_Meter] = useState<string | null>(null);
    const [audioPlayingV2_Flow_Meter, setAudioPlayingV2_Flow_Meter] = useState(false);
    const [inputValueV2_Flow_Meter, setInputValueV2_Flow_Meter] = useState<any>();
    const [inputValue2V2_Flow_Meter, setInputValue2V2_Flow_Meter] = useState<any>();
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
    
        const handleInputChangeV2_Flow_Meter = (event: any) => {
            const newValue = event.target.value;
            setInputValueV2_Flow_Meter(newValue);
        };
    
        const handleInputChange2V2_Flow_Meter = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2V2_Flow_Meter(newValue2);
        };
        const ChangeMaintainV2_Flow_Meter = async () => {
            try {
                const newValue = !maintainV2_Flow_Meter;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                    { V2_Flow_Meter_Maintain: newValue }
                );
                setMaintainV2_Flow_Meter(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 


    const [Pipe_Temp, setPipe_Temp] = useState<string | null>(null);
    const [audioPlayingPipe_Temp, setAudioPlayingPipe_Temp] = useState(false);
    const [inputValuePipe_Temp, setInputValuePipe_Temp] = useState<any>();
    const [inputValue2Pipe_Temp, setInputValue2Pipe_Temp] = useState<any>();
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
    
        const handleInputChangePipe_Temp = (event: any) => {
            const newValue = event.target.value;
            setInputValuePipe_Temp(newValue);
        };
    
        const handleInputChange2Pipe_Temp = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2Pipe_Temp(newValue2);
        };
        const ChangeMaintainPipe_Temp = async () => {
            try {
                const newValue = !maintainPipe_Temp;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                    { Pipe_Temp_Maintain: newValue }
                );
                setMaintainPipe_Temp(newValue);
                
            } catch (error) {}
        };


    // =================================================================================================================== 

        // =================================================================================================================== 

const [Pipe_Press, setPipe_Press] = useState<string | null>(null);
const [audioPlayingPipe_Press, setAudioPlayingPipe_Press] = useState(false);
const [inputValuePipe_Press, setInputValuePipe_Press] = useState<any>();
const [inputValue2Pipe_Press, setInputValue2Pipe_Press] = useState<any>();
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

    const handleInputChangePipe_Press = (event: any) => {
        const newValue = event.target.value;
        setInputValuePipe_Press(newValue);
    };

    const handleInputChange2Pipe_Press = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2Pipe_Press(newValue2);
    };
    const ChangeMaintainPipe_Press = async () => {
        try {
            const newValue = !maintainPipe_Press;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                { Pipe_Press_Maintain: newValue }
            );
            setMaintainPipe_Press(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 


const [Tank_TT_301, setTank_TT_301] = useState<string | null>(null);
const [audioPlayingTank_TT_301, setAudioPlayingTank_TT_301] = useState(false);
const [inputValueTank_TT_301, setInputValueTank_TT_301] = useState<any>();
const [inputValue2Tank_TT_301, setInputValue2Tank_TT_301] = useState<any>();
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

    const handleInputChangeTank_TT_301 = (event: any) => {
        const newValue = event.target.value;
        setInputValueTank_TT_301(newValue);
    };

    const handleInputChange2Tank_TT_301 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2Tank_TT_301(newValue2);
    };
    const ChangeMaintainTank_TT_301 = async () => {
        try {
            const newValue = !maintainTank_TT_301;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                { Tank_TT_301_Maintain: newValue }
            );
            setMaintainTank_TT_301(newValue);
            
        } catch (error) {}
    };


// =================================================================================================================== 

    // =================================================================================================================== 

const [Tank_PT_301, setTank_PT_301] = useState<string | null>(null);
const [audioPlayingTank_PT_301, setAudioPlayingTank_PT_301] = useState(false);
const [inputValueTank_PT_301, setInputValueTank_PT_301] = useState<any>();
const [inputValue2Tank_PT_301, setInputValue2Tank_PT_301] = useState<any>();
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

const handleInputChangeTank_PT_301 = (event: any) => {
    const newValue = event.target.value;
    setInputValueTank_PT_301(newValue);
};

const handleInputChange2Tank_PT_301 = (event: any) => {
    const newValue2 = event.target.value;
    setInputValue2Tank_PT_301(newValue2);
};
const ChangeMaintainTank_PT_301 = async () => {
    try {
        const newValue = !maintainTank_PT_301;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
            { Tank_PT_301_Maintain: newValue }
        );
        setMaintainTank_PT_301(newValue);
        
    } catch (error) {}
};


// =================================================================================================================== 


        // =================================================================================================================== 

        const [Tank_01_Volume, setTank_01_Volume] = useState<string | null>(null);
        const [audioPlayingTank_01_Volume, setAudioPlayingTank_01_Volume] = useState(false);
        const [inputValueTank_01_Volume, setInputValueTank_01_Volume] = useState<any>();
        const [inputValue2Tank_01_Volume, setInputValue2Tank_01_Volume] = useState<any>();
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
        
            const handleInputChangeTank_01_Volume = (event: any) => {
                const newValue = event.target.value;
                setInputValueTank_01_Volume(newValue);
            };
        
            const handleInputChange2Tank_01_Volume = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2Tank_01_Volume(newValue2);
            };
            const ChangeMaintainTank_01_Volume = async () => {
                try {
                    const newValue = !maintainTank_01_Volume;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                        { Tank_01_Volume_Maintain: newValue }
                    );
                    setMaintainTank_01_Volume(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
        
        const [Tank_01_Mass, setTank_01_Mass] = useState<string | null>(null);
        const [audioPlayingTank_01_Mass, setAudioPlayingTank_01_Mass] = useState(false);
        const [inputValueTank_01_Mass, setInputValueTank_01_Mass] = useState<any>();
        const [inputValue2Tank_01_Mass, setInputValue2Tank_01_Mass] = useState<any>();
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
        
            const handleInputChangeTank_01_Mass = (event: any) => {
                const newValue = event.target.value;
                setInputValueTank_01_Mass(newValue);
            };
        
            const handleInputChange2Tank_01_Mass = (event: any) => {
                const newValue2 = event.target.value;
                setInputValue2Tank_01_Mass(newValue2);
            };
            const ChangeMaintainTank_01_Mass = async () => {
                try {
                    const newValue = !maintainTank_01_Mass;
                    await httpApi.post(
                        `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                        { Tank_01_Mass_Maintain: newValue }
                    );
                    setMaintainTank_01_Mass(newValue);
                    
                } catch (error) {}
            };
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [Tank_01_Level, setTank_01_Level] = useState<string | null>(null);
        const [inputValueTank_01_Level, setInputValueTank_01_Level] = useState<any>();
        const [inputValue2Tank_01_Level, setInputValue2Tank_01_Level] = useState<any>();
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
        
        const handleInputChangeTank_01_Level = (event: any) => {
            const newValue = event.target.value;
            setInputValueTank_01_Level(newValue);
        };
        
        const handleInputChange2Tank_01_Level = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2Tank_01_Level(newValue2);
        };
        const ChangeMaintainTank_01_Level = async () => {
            try {
                const newValue = !maintainTank_01_Level;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                    { Tank_01_Level_Maintain: newValue }
                );
                setMaintainTank_01_Level(newValue);
                
            } catch (error) {}
        };
        
        
        // =================================================================================================================== 
        
          // =================================================================================================================== 
        
          const [Flow_Meter_Total, setFlow_Meter_Total] = useState<string | null>(null);
          const [audioPlayingFlow_Meter_Total, setAudioPlayingFlow_Meter_Total] = useState(false);
          const [inputValueFlow_Meter_Total, setInputValueFlow_Meter_Total] = useState<any>();
          const [inputValue2Flow_Meter_Total, setInputValue2Flow_Meter_Total] = useState<any>();
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
                          if (!audioPlayingFlow_Meter_Total) {
                              audioRef.current?.play();
                              setAudioPlayingFlow_Meter_Total(true);
                              setExceedThresholdFlow_Meter_Total(true);
                          }
                      } else {
                         setAudioPlayingFlow_Meter_Total(false);
                         setExceedThresholdFlow_Meter_Total(false);
                      }
                  } 
              } 
          }, [Flow_Meter_Total_High, Flow_Meter_Total, audioPlayingFlow_Meter_Total, Flow_Meter_Total_Low,maintainFlow_Meter_Total]);
          
          useEffect(() => {
              if (audioPlayingFlow_Meter_Total) {
                  const audioEnded = () => {
                     setAudioPlayingFlow_Meter_Total(false);
                  };
                  audioRef.current?.addEventListener('ended', audioEnded);
                  return () => {
                      audioRef.current?.removeEventListener('ended', audioEnded);
                  };
              }
          }, [audioPlayingFlow_Meter_Total]);
          
          const handleInputChangeFlow_Meter_Total = (event: any) => {
              const newValue = event.target.value;
              setInputValueFlow_Meter_Total(newValue);
          };
          
          const handleInputChange2Flow_Meter_Total = (event: any) => {
              const newValue2 = event.target.value;
              setInputValue2Flow_Meter_Total(newValue2);
          };
          const ChangeMaintainFlow_Meter_Total = async () => {
              try {
                  const newValue = !maintainFlow_Meter_Total;
                  await httpApi.post(
                      `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                      { Flow_Meter_Total_Maintain: newValue }
                  );
                  setMaintainFlow_Meter_Total(newValue);
                  
              } catch (error) {}
          };
          
          
          // =================================================================================================================== 



                  // =================================================================================================================== 
        
                  const [Consumption_Flow, setConsumption_Flow] = useState<string | null>(null);
                  const [audioPlayingConsumption_Flow, setAudioPlayingConsumption_Flow] = useState(false);
                  const [inputValueConsumption_Flow, setInputValueConsumption_Flow] = useState<any>();
                  const [inputValue2Consumption_Flow, setInputValue2Consumption_Flow] = useState<any>();
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
                
                  
                  const handleInputChangeConsumption_Flow = (event: any) => {
                      const newValue = event.target.value;
                      setInputValueConsumption_Flow(newValue);
                  };
                  
                  const handleInputChange2Consumption_Flow = (event: any) => {
                      const newValue2 = event.target.value;
                      setInputValue2Consumption_Flow(newValue2);
                  };
                  const ChangeMaintainConsumption_Flow = async () => {
                      try {
                          const newValue = !maintainConsumption_Flow;
                          await httpApi.post(
                              `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                              { Consumption_Flow_Maintain: newValue }
                          );
                          setMaintainConsumption_Flow(newValue);
                          
                      } catch (error) {}
                  };
                  
                  
                  // =================================================================================================================== 


                         // =================================================================================================================== 
        
                         const [Flow_Velocity, setFlow_Velocity] = useState<string | null>(null);
                         const [audioPlayingFlow_Velocity, setAudioPlayingFlow_Velocity] = useState(false);
                         const [inputValueFlow_Velocity, setInputValueFlow_Velocity] = useState<any>();
                         const [inputValue2Flow_Velocity, setInputValue2Flow_Velocity] = useState<any>();
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
                         
                         const handleInputChangeFlow_Velocity = (event: any) => {
                             const newValue = event.target.value;
                             setInputValueFlow_Velocity(newValue);
                         };
                         
                         const handleInputChange2Flow_Velocity = (event: any) => {
                             const newValue2 = event.target.value;
                             setInputValue2Flow_Velocity(newValue2);
                         };
                         const ChangeMaintainFlow_Velocity = async () => {
                             try {
                                 const newValue = !maintainFlow_Velocity;
                                 await httpApi.post(
                                     `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                                     { Flow_Velocity_Maintain: newValue }
                                 );
                                 setMaintainFlow_Velocity(newValue);
                                 
                             } catch (error) {}
                         };
                         

                         // =================================================================================================================== 
        
                         const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
                         const [audioPlayingPLC_Conn_STT, setAudioPlayingPLC_Conn_STT] = useState(false);
                         const [inputValuePLC_Conn_STT, setInputValuePLC_Conn_STT] = useState<any>();
                         const [inputValue2PLC_Conn_STT, setInputValue2PLC_Conn_STT] = useState<any>();
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
                         
                         const handleInputChangePLC_Conn_STT = (event: any) => {
                             const newValue = event.target.value;
                             setInputValuePLC_Conn_STT(newValue);
                         };
                         
                         const handleInputChange2PLC_Conn_STT = (event: any) => {
                             const newValue2 = event.target.value;
                             setInputValue2PLC_Conn_STT(newValue2);
                         };
                         const ChangeMaintainPLC_Conn_STT = async () => {
                             try {
                                 const newValue = !maintainPLC_Conn_STT;
                                 await httpApi.post(
                                     `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                                     { PLC_Conn_STT_Maintain: newValue }
                                 );
                                 setMaintainPLC_Conn_STT(newValue);
                                 
                             } catch (error) {}
                         };
                         
                         
                         
                         // =================================================================================================================== 
        



        const handleMainTainPLC = async (checked: any) => {
            try {
                // Set all new variables to the checked value
                const newMaintainVP_303 = checked;
                const newMaintainVP_302 = checked;
                const newMaintainVP_301 = checked;
                const newMaintainGD_103_High = checked;
                const newMaintainGD_102_High = checked;
                const newMaintainGD_101_High = checked;
                const newMaintainGD_103_Low = checked;
                const newMaintainGD_102_Low = checked;
                const newMaintainGD_101_Low = checked;
                const newMaintainSDV_301 = checked;
                const newMaintainSDV_302 = checked;
                const newMaintainV1_Flow_Meter = checked;
                const newMaintainV2_Flow_Meter = checked;
                const newMaintainPipe_Temp = checked;
                const newMaintainPipe_Press = checked;
                const newMaintainTank_TT_301 = checked;
                const newMaintainTank_PT_301 = checked;
                const newMaintainTank_01_Volume = checked;
                const newMaintainTank_01_Mass = checked;
                const newMaintainTank_01_Level = checked;
                const newMaintainConsumption_Flow = checked;
                const newMaintainFlow_Velocity = checked;
                const newMaintainPLC_Conn_STT = checked;
        
                // Send the data using the API
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                    {
                    
                        VP_303_Maintain: newMaintainVP_303,
                        VP_302_Maintain: newMaintainVP_302,
                        VP_301_Maintain: newMaintainVP_301,
                        GD_103_High_Maintain: newMaintainGD_103_High,
                        GD_102_High_Maintain: newMaintainGD_102_High,
                        GD_101_High_Maintain: newMaintainGD_101_High,
                        GD_103_Low_Maintain: newMaintainGD_103_Low,
                        GD_102_Low_Maintain: newMaintainGD_102_Low,
                        GD_101_Low_Maintain: newMaintainGD_101_Low,
                        SDV_301_Maintain: newMaintainSDV_301,
                        SDV_302_Maintain: newMaintainSDV_302,
                        V1_Flow_Meter_Maintain: newMaintainV1_Flow_Meter,
                        V2_Flow_Meter_Maintain: newMaintainV2_Flow_Meter,
                        Pipe_Temp_Maintain: newMaintainPipe_Temp,
                        Pipe_Press_Maintain: newMaintainPipe_Press,
                        Tank_TT_301_Maintain: newMaintainTank_TT_301,
                        Tank_PT_301_Maintain: newMaintainTank_PT_301,
                        Tank_01_Volume_Maintain: newMaintainTank_01_Volume,
                        Tank_01_Mass_Maintain: newMaintainTank_01_Mass,
                        Tank_01_Level_Maintain: newMaintainTank_01_Level,
                        Consumption_Flow_Maintain: newMaintainConsumption_Flow,
                        Flow_Velocity_Maintain: newMaintainFlow_Velocity,
                        PLC_Conn_STT_Maintain: newMaintainPLC_Conn_STT
                    }
                );
        
                // Update the states locally, just like Mode_ATS and ATS_Auto_Man
                setMaintainVP_303(newMaintainVP_303);
                setMaintainVP_302(newMaintainVP_302);
                setMaintainVP_301(newMaintainVP_301);
                setMaintainGD_103_High(newMaintainGD_103_High);
                setMaintainGD_102_High(newMaintainGD_102_High);
                setMaintainGD_101_High(newMaintainGD_101_High);
                setMaintainGD_103_Low(newMaintainGD_103_Low);
                setMaintainGD_102_Low(newMaintainGD_102_Low);
                setMaintainGD_101_Low(newMaintainGD_101_Low);
                setMaintainSDV_301(newMaintainSDV_301);
                setMaintainSDV_302(newMaintainSDV_302);
                setMaintainV1_Flow_Meter(newMaintainV1_Flow_Meter);
                setMaintainV2_Flow_Meter(newMaintainV2_Flow_Meter);
                setMaintainPipe_Temp(newMaintainPipe_Temp);
                setMaintainPipe_Press(newMaintainPipe_Press);
                setMaintainTank_TT_301(newMaintainTank_TT_301);
                setMaintainTank_PT_301(newMaintainTank_PT_301);
                setMaintainTank_01_Volume(newMaintainTank_01_Volume);
                setMaintainTank_01_Mass(newMaintainTank_01_Mass);
                setMaintainTank_01_Level(newMaintainTank_01_Level);
                setMaintainConsumption_Flow(newMaintainConsumption_Flow);
                setMaintainFlow_Velocity(newMaintainFlow_Velocity);
                setMaintainPLC_Conn_STT(newMaintainPLC_Conn_STT);
        
            } catch (error) {
                console.error('Error updating maintain telemetry values:', error);
            }
        };
        const handleCheckboxChangePLC = (e:any) => {
            const isChecked = e.checked;
        
            handleMainTainPLC(isChecked);
        };


        const checkMaintainingPLC = 
        maintainVP_303 === true &&
              maintainVP_302 === true &&
              maintainVP_301 === true &&
              maintainGD_103_High === true &&
              maintainGD_102_High === true &&
              maintainGD_101_High === true &&
              maintainGD_103_Low === true &&
              maintainGD_102_Low === true &&
              maintainGD_101_Low === true &&
              maintainSDV_301 === true &&
              maintainSDV_302 === true &&
              maintainV1_Flow_Meter === true &&
              maintainV2_Flow_Meter === true &&
              maintainPipe_Temp === true &&
              maintainPipe_Press === true &&
              maintainTank_TT_301 === true &&
              maintainTank_PT_301 === true &&
              maintainTank_01_Volume === true &&
              maintainTank_01_Mass === true &&
              maintainTank_01_Level === true &&
              maintainConsumption_Flow === true &&
              maintainFlow_Velocity === true &&
              maintainPLC_Conn_STT === true;
          
              const maintainHeader = (
                <div>
        
                        <Checkbox disabled={TECH_OPER}
                            style={{ marginRight: 5 }}
                            onChange={handleCheckboxChangePLC}
                            checked={checkMaintainingPLC}
                        />
                    Maintain
        
                </div>
            );

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_THACHTHAT}/SERVER_SCOPE`,
                { VP_302_High: inputValueVP_302,VP_302_Low:inputValue2VP_302,
                    VP_301_High: inputValueVP_301,VP_301_Low:inputValue2VP_301,
                    VP_303_High: inputValueVP_303,VP_303_Low:inputValue2VP_303,


                    GD_103_High_High: inputValueGD_103_High,GD_103_High_Low:inputValue2GD_103_High,
                    GD_102_High_High: inputValueGD_102_High,GD_102_High_Low:inputValue2GD_102_High,
                    GD_101_High_High: inputValueGD_101_High,GD_101_High_Low:inputValue2GD_101_High,

                    GD_103_Low_High: inputValueGD_103_Low,GD_103_Low_Low:inputValue2GD_103_Low,
                    GD_102_Low_High: inputValueGD_102_Low,GD_102_Low_Low:inputValue2GD_102_Low,
                    GD_101_Low_High: inputValueGD_101_Low,GD_101_Low_Low:inputValue2GD_101_Low,


                    SDV_302_High: inputValueSDV_302,SDV_302_Low:inputValue2SDV_302,
                    SDV_301_High: inputValueSDV_301,SDV_301_Low:inputValue2SDV_301,


                    V1_Flow_Meter_High: inputValueV1_Flow_Meter,V1_Flow_Meter_Low:inputValue2V1_Flow_Meter,
                    V2_Flow_Meter_High: inputValueV2_Flow_Meter,V2_Flow_Meter_Low:inputValue2V2_Flow_Meter,

                    Pipe_Temp_High: inputValuePipe_Temp,Pipe_Temp_Low:inputValue2Pipe_Temp,
                    Pipe_Press_High: inputValuePipe_Press,Pipe_Press_Low:inputValue2Pipe_Press,

                    Tank_TT_301_High: inputValueTank_TT_301,Tank_TT_301_Low:inputValue2Tank_TT_301,
                    Tank_PT_301_High: inputValueTank_PT_301,Tank_PT_301_Low:inputValue2Tank_PT_301,


                    Tank_01_Volume_High: inputValueTank_01_Volume,Tank_01_Volume_Low:inputValue2Tank_01_Volume,
                    Tank_01_Mass_High: inputValueTank_01_Mass,Tank_01_Mass_Low:inputValue2Tank_01_Mass,
                    Tank_01_Level_High: inputValueTank_01_Level,Tank_01_Level_Low:inputValue2Tank_01_Level,
                    Flow_Meter_Total_High: inputValueFlow_Meter_Total,Flow_Meter_Total_Low:inputValue2Flow_Meter_Total,

                    IOT_Gateway_Phone: inputGetwayPhone,


                    Consumption_Flow_High: inputValueConsumption_Flow,Consumption_Flow_Low:inputValue2Consumption_Flow,
                    Flow_Velocity_High: inputValueFlow_Velocity,Flow_Velocity_Low:inputValue2Flow_Velocity,
                    PLC_Conn_STT_High: inputValuePLC_Conn_STT,PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,

                }
            );
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setFlow_Meter_Total_High(inputValueFlow_Meter_Total);
            setFlow_Meter_Total_Low(inputValue2Flow_Meter_Total);

            setVP_303_High(inputValueVP_303);
            setVP_303_Low(inputValue2VP_303);

            setVP_302_High(inputValueVP_302);
            setVP_302_Low(inputValue2VP_302);

            setVP_301_High(inputValueVP_301);
            setVP_301_Low(inputValue2VP_301);

    

            setConsumption_Flow_High(inputValueConsumption_Flow);
            setConsumption_Flow_Low(inputValue2Consumption_Flow);

            setFlow_Velocity_High(inputValueFlow_Velocity);
            setFlow_Velocity_Low(inputValue2Flow_Velocity);



            setGD_103_High_High(inputValueGD_103_High);
            setGD_103_High_Low(inputValue2GD_103_High);

            setGD_102_High_High(inputValueGD_102_High);
            setGD_102_High_Low(inputValue2GD_102_High);

            setGD_101_High_High(inputValueGD_101_High);
            setGD_101_High_Low(inputValue2GD_101_High);


            setGD_103_Low_High(inputValueGD_103_Low);
            setGD_103_Low_Low(inputValue2GD_103_Low);

            setGD_102_Low_High(inputValueGD_102_Low);
            setGD_102_Low_Low(inputValue2GD_102_Low);

            setGD_101_Low_High(inputValueGD_101_Low);
            setGD_101_Low_Low(inputValue2GD_101_Low);

            setSDV_302_High(inputValueSDV_302);
            setSDV_302_Low(inputValue2SDV_302);

            setSDV_301_High(inputValueSDV_301);
            setSDV_301_Low(inputValue2SDV_301);


            setV2_Flow_Meter_High(inputValueV2_Flow_Meter);
            setV2_Flow_Meter_Low(inputValue2V2_Flow_Meter);

            setV1_Flow_Meter_High(inputValueV1_Flow_Meter);
            setV1_Flow_Meter_Low(inputValue2V1_Flow_Meter);

            setPipe_Temp_High(inputValuePipe_Temp);
            setPipe_Temp_Low(inputValue2Pipe_Temp);

            setPipe_Press_High(inputValuePipe_Press);
            setPipe_Press_Low(inputValue2Pipe_Press);



            setTank_01_Volume_High(inputValueTank_01_Volume);
            setTank_01_Volume_Low(inputValue2Tank_01_Volume);

            setTank_01_Mass_High(inputValueTank_01_Mass);
            setTank_01_Mass_Low(inputValue2Tank_01_Mass);

            setTank_01_Level_High(inputValueTank_01_Level);
            setTank_01_Level_Low(inputValue2Tank_01_Level);

            setPLC_Conn_STT_High(inputValuePLC_Conn_STT);
            setPLC_Conn_STT_Low(inputValue2PLC_Conn_STT);
            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
        } catch (error) {
            console.log("error: ", error);
            toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
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


        setInputValueFlow_Meter_Total(Flow_Meter_Total_High); 
        setInputValue2Flow_Meter_Total(Flow_Meter_Total_Low); 

        setInputValueVP_303(VP_303_High); 
        setInputValue2VP_303(VP_303_Low); 

        setInputValueVP_302(VP_302_High); 
        setInputValue2VP_302(VP_302_Low); 

        setInputValueVP_301(VP_301_High); 
        setInputValue2VP_301(VP_301_Low); 


        setInputValueConsumption_Flow(Consumption_Flow_High); 
        setInputValue2Consumption_Flow(Consumption_Flow_Low); 

        setInputValueFlow_Velocity(Flow_Velocity_High); 
        setInputValue2Flow_Velocity(Flow_Velocity_Low); 



        setInputValueGD_102_High(GD_102_High_High); 
        setInputValue2GD_102_High(GD_102_High_Low); 

        setInputValueGD_101_High(GD_101_High_High); 
        setInputValue2GD_101_High(GD_101_High_Low); 

        setInputValueGD_103_High(GD_103_High_High); 
        setInputValue2GD_103_High(GD_103_High_Low); 
        

        setInputValueGD_102_Low(GD_102_Low_High); 
        setInputValue2GD_102_Low(GD_102_Low_Low); 

        setInputValueGD_101_Low(GD_101_Low_High); 
        setInputValue2GD_101_Low(GD_101_Low_Low); 

        setInputValueGD_103_Low(GD_103_Low_High); 
        setInputValue2GD_103_Low(GD_103_Low_Low); 

        setInputValueSDV_301(SDV_301_High); 
        setInputValue2SDV_301(SDV_301_Low); 

        setInputValueSDV_302(SDV_302_High); 
        setInputValue2SDV_302(SDV_302_Low); 

        setInputValueV1_Flow_Meter(V1_Flow_Meter_High); 
        setInputValue2V1_Flow_Meter(V1_Flow_Meter_Low); 

        setInputValueV2_Flow_Meter(V2_Flow_Meter_High); 
        setInputValue2V2_Flow_Meter(V2_Flow_Meter_Low); 

        setInputValuePipe_Temp(Pipe_Temp_High); 
        setInputValue2Pipe_Temp(Pipe_Temp_Low); 

        setInputValuePipe_Press(Pipe_Press_High); 
        setInputValue2Pipe_Press(Pipe_Press_Low); 


        setInputValueTank_TT_301(Tank_TT_301_High); 
        setInputValue2Tank_TT_301(Tank_TT_301_Low); 

        setInputValueTank_PT_301(Tank_PT_301_High); 
        setInputValue2Tank_PT_301(Tank_PT_301_Low); 


        setInputValueTank_01_Volume(Tank_01_Volume_High); 
        setInputValue2Tank_01_Volume(Tank_01_Volume_Low); 


        setInputValueTank_01_Mass(Tank_01_Mass_High); 
        setInputValue2Tank_01_Mass(Tank_01_Mass_Low); 

        setInputValueTank_01_Level(Tank_01_Level_High); 
        setInputValue2Tank_01_Level(Tank_01_Level_Low); 


        setInputValuePLC_Conn_STT(PLC_Conn_STT_High); 
        setInputValue2PLC_Conn_STT(PLC_Conn_STT_Low); 

    }, [VP_303_High, VP_303_Low ,
        VP_302_High, VP_302_Low 
        ,VP_301_High, VP_301_Low ,
        ,Flow_Meter_Total_High, Flow_Meter_Total_Low ,


        GD_102_High_High,GD_102_High_Low,
         GD_101_High_High,GD_101_High_Low ,
          GD_103_High_High,GD_103_High_Low,

          GD_102_Low_High,GD_102_Low_Low,
          GD_101_Low_High,GD_101_Low_Low ,
           GD_103_Low_High,GD_103_Low_Low,
        
           SDV_301_High,SDV_301_Low,
           SDV_302_High,SDV_302_Low,

           V1_Flow_Meter_High,V1_Flow_Meter_Low,
           V2_Flow_Meter_High,V2_Flow_Meter_Low,

           Pipe_Temp_High,Pipe_Temp_Low,
           Pipe_Press_High,Pipe_Press_Low,

           Tank_PT_301_High,Tank_PT_301_Low,
           Tank_TT_301_High,Tank_TT_301_Low,


           Consumption_Flow_High,Consumption_Flow_Low,
           Flow_Velocity_High,Flow_Velocity_Low,

           Tank_01_Volume_High,Tank_01_Volume_Low,
           Tank_01_Mass_High,Tank_01_Mass_Low,
           Tank_01_Level_High,Tank_01_Level_Low,
           PLC_Conn_STT_High,PLC_Conn_STT_Low,

           getWayPhoneOTSUKA,

        ]);


        
    const combineCss = {

        CSSFlow_Meter_Total : {
            color:exceedThresholdFlow_Meter_Total && !maintainFlow_Meter_Total
            ? "#ff5656"
            : maintainFlow_Meter_Total
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSVP_303 : {
            color:exceedThresholdVP_303 && !maintainVP_303
            ? "#ff5656"
            : maintainVP_303
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSVP_302 : {
            color:exceedThreshold302 && !maintainVP_302
            ? "#ff5656"
            : maintainVP_302
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSVP_301 : {
            color:exceedThresholdVP_301 && !maintainVP_301
            ? "#ff5656"
            : maintainVP_301
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_103_High : {
            color:exceedThresholdGD_103_High && !maintainGD_103_High
            ? "#ff5656"
            : maintainGD_103_High
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_102_High : {
            color:exceedThresholdGD_102_High && !maintainGD_102_High
            ? "#ff5656"
            : maintainGD_102_High
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD_101_High : {
            color:exceedThresholdGD_101_High && !maintainGD_101_High
            ? "#ff5656"
            : maintainGD_101_High
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_103_Low : {
            color:exceedThresholdGD_103_Low && !maintainGD_103_Low
            ? "#ff5656"
            : maintainGD_103_Low
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSGD_102_Low : {
            color:exceedThresholdGD_102_Low && !maintainGD_102_Low
            ? "#ff5656"
            : maintainGD_102_Low
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },
        CSSGD_101_Low : {
            color:exceedThresholdGD_101_Low && !maintainGD_101_Low
            ? "#ff5656"
            : maintainGD_101_Low
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

  
        CSSSDV_301 : {
            color:exceedThresholdSDV_301 && !maintainSDV_301
            ? "#ff5656"
            : maintainSDV_301
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSSDV_302 : {
            color:exceedThresholdSDV_302 && !maintainSDV_302
            ? "#ff5656"
            : maintainSDV_302
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSV1_Flow_Meter : {
            color:exceedThresholdV1_Flow_Meter && !maintainV1_Flow_Meter
            ? "#ff5656"
            : maintainV1_Flow_Meter
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSV2_Flow_Meter : {
            color:exceedThresholdV2_Flow_Meter && !maintainV2_Flow_Meter
            ? "#ff5656"
            : maintainV2_Flow_Meter
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPipe_Press : {
            color:exceedThresholdPipe_Press && !maintainPipe_Press
            ? "#ff5656"
            : maintainPipe_Press
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSPipe_Temp : {
            color:exceedThresholdPipe_Temp && !maintainPipe_Temp
            ? "#ff5656"
            : maintainPipe_Temp
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSTank_TT_301 : {
            color:exceedThresholdTank_TT_301 && !maintainTank_TT_301
            ? "#ff5656"
            : maintainTank_TT_301
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTank_PT_301 : {
            color:exceedThresholdTank_PT_301 && !maintainTank_PT_301
            ? "#ff5656"
            : maintainTank_PT_301
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },




        CSSTank_01_Volume : {
            color:exceedThresholdTank_01_Volume && !maintainTank_01_Volume
            ? "#ff5656"
            : maintainTank_01_Volume
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSTank_01_Mass : {
            color:exceedThresholdTank_01_Mass && !maintainTank_01_Mass
            ? "#ff5656"
            : maintainTank_01_Mass
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSTank_01_Level : {
            color:exceedThresholdTank_01_Level && !maintainTank_01_Level
            ? "#ff5656"
            : maintainTank_01_Level
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },


        CSSConsumption_Flow : {
            color:exceedThresholdConsumption_Flow && !maintainConsumption_Flow
            ? "#ff5656"
            : maintainConsumption_Flow
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSFlow_Velocity : {
            color:exceedThresholdFlow_Velocity && !maintainFlow_Velocity
            ? "#ff5656"
            : maintainFlow_Velocity
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
         
    
  const DataVP_303  = VP_303 === "0" ? "Stop" : VP_303 === "1" ? "Run" : null;
  const DataVP_302  = VP_302 === "0" ? "Stop" : VP_302 === "1" ? "Run" : null;
  const DataVP_301  = VP_301 === "0" ? "Stop" : VP_301 === "1" ? "Run" : null;
  const DataGD_103_High  = GD_103_High === "0" ? "Normal" : GD_103_High === "1" ? "Alarm" : null;
  const DataGD_102_High  = GD_102_High === "0" ? "Normal" : GD_102_High === "1" ? "Alarm" : null;

  const DataGD_101_High  = GD_101_High === "0" ? "Normal" : GD_101_High === "1" ? "Alarm" : null;
  const DataGD_103_Low  = GD_103_Low === "0" ? "Normal" : GD_103_Low === "1" ? "Alarm" : null;

  const DataGD_102_Low  = GD_102_Low === "0" ? "Normal" : GD_102_Low === "1" ? "Alarm" : null;
  const DataGD_101_Low  = GD_101_Low === "0" ? "Normal" : GD_101_Low === "1" ? "Alarm" : null;
  const DataSDV_301  = SDV_301 === "0" ? "OFF" : SDV_301 === "1" ? "ON" : null;

  const DataSDV_302  = SDV_302 === "0" ? "OFF" : SDV_302 === "1" ? "ON" : null;
  const DataPLC_Conn_STT  = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null;;
         
  const mainCategoryFC = {
    EVC: 'EVC01 -  Parameter & Configuration',
 
    PLC: 'PLC -  Parameter & Configuration'
};


const formatValue = (value:any) => {
    return value !== null
        ? new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true, 
          }).format(parseFloat(value))
        : "";
};
        const dataEVC01 = [

     {
        mainCategory: mainCategoryFC.PLC ,
               
               timeUpdate: <span style={combineCss.CSSV1_Flow_Meter} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSV1_Flow_Meter}> V1 Flow Meter  </span> ,
       
            modbus: <span style={combineCss.CSSV1_Flow_Meter}>400001	 </span> ,
       
           value: <span style={combineCss.CSSV1_Flow_Meter} > {formatValue(V1_Flow_Meter)} {nameValue.m3}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSV1_Flow_Meter}   placeholder='High' step="0.1" type='number' value={inputValueV1_Flow_Meter} onChange={handleInputChangeV1_Flow_Meter} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSV1_Flow_Meter}   placeholder='Low' step="0.1" type='number' value={inputValue2V1_Flow_Meter} onChange={handleInputChange2V1_Flow_Meter} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
            Maintain:   <Checkbox disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainV1_Flow_Meter}
            checked={maintainV1_Flow_Meter}
        ></Checkbox>
       
           },
       
       
           {
        mainCategory: mainCategoryFC.PLC ,
               
               timeUpdate: <span style={combineCss.CSSV2_Flow_Meter} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSV2_Flow_Meter}>V2 Flow Meter</span> ,
       
           modbus: <span style={combineCss.CSSV2_Flow_Meter}>400003	 </span> ,
       
          value: <span style={combineCss.CSSV2_Flow_Meter} > {formatValue(V2_Flow_Meter)} {nameValue.m3}</span> , 
           high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSV2_Flow_Meter}   placeholder='High' step="0.1" type='number' value={inputValueV2_Flow_Meter} onChange={handleInputChangeV2_Flow_Meter} inputMode="decimal" />, 
           low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSV2_Flow_Meter}   placeholder='Low' step="0.1" type='number' value={inputValue2V2_Flow_Meter} onChange={handleInputChange2V2_Flow_Meter} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
           Maintain:   <Checkbox disabled={TECH_OPER} 
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainV2_Flow_Meter}
           checked={maintainV2_Flow_Meter}
       ></Checkbox>
       
          },
       
       
          {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSPipe_Temp} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSPipe_Temp}>Pipe Temp</span> ,
       
          modbus: <span style={combineCss.CSSPipe_Temp}>400005	 </span> ,
       
         value: <span style={combineCss.CSSPipe_Temp} > {formatValue(Pipe_Temp)} {nameValue.C}</span> , 
          high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPipe_Temp}   placeholder='High' step="0.1" type='number' value={inputValuePipe_Temp} onChange={handleInputChangePipe_Temp} inputMode="decimal" />, 
          low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPipe_Temp}   placeholder='Low' step="0.1" type='number' value={inputValue2Pipe_Temp} onChange={handleInputChange2Pipe_Temp} inputMode="decimal" />,
          update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
          Maintain:   <Checkbox disabled={TECH_OPER} 
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainPipe_Temp}
          checked={maintainPipe_Temp}
       ></Checkbox>
       
         },
       
       
         {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSPipe_Press} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSPipe_Press}>Pipe Press</span> ,
       
         modbus: <span style={combineCss.CSSPipe_Press}>400007	 </span> ,
       
        value: <span style={combineCss.CSSPipe_Press} > {formatValue(Pipe_Press)} ( Bar )</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPipe_Press}   placeholder='High' step="0.1" type='number' value={inputValuePipe_Press} onChange={handleInputChangePipe_Press} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPipe_Press}   placeholder='Low' step="0.1" type='number' value={inputValue2Pipe_Press} onChange={handleInputChange2Pipe_Press} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
         Maintain:   <Checkbox disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainPipe_Press}
         checked={maintainPipe_Press}
       ></Checkbox>
       
        },
       
        {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSTank_TT_301} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSTank_TT_301}>Tank TT-301</span> ,
       
          modbus: <span style={combineCss.CSSTank_TT_301}>400009	 </span> ,
       
         value: <span style={combineCss.CSSTank_TT_301} > {formatValue(Tank_TT_301)} {nameValue.C}</span> , 
          high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_TT_301}   placeholder='High' step="0.1" type='number' value={inputValueTank_TT_301} onChange={handleInputChangeTank_TT_301} inputMode="decimal" />, 
          low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_TT_301}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_TT_301} onChange={handleInputChange2Tank_TT_301} inputMode="decimal" />,
          update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
          Maintain:   <Checkbox disabled={TECH_OPER} 
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainTank_TT_301}
          checked={maintainTank_TT_301}
       ></Checkbox>
       
         },
       
       
         {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSTank_PT_301} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSTank_PT_301}>Tank PT-301</span> ,
       
         modbus: <span style={combineCss.CSSTank_PT_301}>400011	 </span> ,
       
        value: <span style={combineCss.CSSTank_PT_301} > {formatValue(Tank_PT_301)} ( Bar )</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_PT_301}   placeholder='High' step="0.1" type='number' value={inputValueTank_PT_301} onChange={handleInputChangeTank_PT_301} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_PT_301}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_PT_301} onChange={handleInputChange2Tank_PT_301} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
         Maintain:   <Checkbox disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainTank_PT_301}
         checked={maintainTank_PT_301}
       ></Checkbox>
       
        },
       
       
       
       
        {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSTank_01_Volume} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSTank_01_Volume}>Tank-01 Volume</span> ,
       
        modbus: <span style={combineCss.CSSTank_01_Volume}>400013	 </span> ,
       
       value: <span style={combineCss.CSSTank_01_Volume} > {formatValue(Tank_01_Volume)} ( L )</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Volume}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Volume} onChange={handleInputChangeTank_01_Volume} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Volume} onChange={handleInputChange2Tank_01_Volume} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
        Maintain:   <Checkbox disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainTank_01_Volume}
        checked={maintainTank_01_Volume}
       ></Checkbox>
       
       },
       
       {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSTank_01_Mass} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSTank_01_Mass}>Tank-01 Mass</span> ,
       
         modbus: <span style={combineCss.CSSTank_01_Mass}>400015	 </span> ,
       
        value: <span style={combineCss.CSSTank_01_Mass} > {formatValue(Tank_01_Mass)} ( Kg )</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Mass}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Mass} onChange={handleInputChangeTank_01_Mass} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Mass}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Mass} onChange={handleInputChange2Tank_01_Mass} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
         Maintain:   <Checkbox disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainTank_01_Mass}
         checked={maintainTank_01_Mass}
       ></Checkbox>
       
        },
       
       
        {
        mainCategory: mainCategoryFC.PLC ,
           
           timeUpdate: <span style={combineCss.CSSTank_01_Level} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSTank_01_Level}>Tank-01 Level</span> ,
       
        modbus: <span style={combineCss.CSSTank_01_Level}>400017	 </span> ,
       
       value: <span style={combineCss.CSSTank_01_Level} > {formatValue(Tank_01_Level)} ( % )</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Level}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Level} onChange={handleInputChangeTank_01_Level} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSTank_01_Level}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Level} onChange={handleInputChange2Tank_01_Level} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
        Maintain:   <Checkbox disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainTank_01_Level}
        checked={maintainTank_01_Level}
       ></Checkbox>
       
       },
       
       
       
       {
           mainCategory: mainCategoryFC.PLC ,
              
              timeUpdate: <span style={combineCss.CSSConsumption_Flow} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSConsumption_Flow}>Consumption Flow</span> ,
          
            modbus: <span style={combineCss.CSSConsumption_Flow}>400019	 </span> ,
          
           value: <span style={combineCss.CSSConsumption_Flow} > {formatValue(Consumption_Flow)} {nameValue.m3}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSConsumption_Flow}   placeholder='High' step="0.1" type='number' value={inputValueConsumption_Flow} onChange={handleInputChangeConsumption_Flow} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSConsumption_Flow}   placeholder='Low' step="0.1" type='number' value={inputValue2Consumption_Flow} onChange={handleInputChange2Consumption_Flow} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
            Maintain:   <Checkbox disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainConsumption_Flow}
            checked={maintainConsumption_Flow}
          ></Checkbox>
          
           },
          
          
           {
           mainCategory: mainCategoryFC.PLC ,
              
              timeUpdate: <span style={combineCss.CSSFlow_Velocity} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSFlow_Velocity}>Flow Velocity</span> ,
          
           modbus: <span style={combineCss.CSSFlow_Velocity}>400021	 </span> ,
          
          value: <span style={combineCss.CSSFlow_Velocity} > {formatValue(Flow_Velocity)} {nameValue.m3h}</span> , 
           high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSFlow_Velocity}   placeholder='High' step="0.1" type='number' value={inputValueFlow_Velocity} onChange={handleInputChangeFlow_Velocity} inputMode="decimal" />, 
           low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSFlow_Velocity}   placeholder='Low' step="0.1" type='number' value={inputValue2Flow_Velocity} onChange={handleInputChange2Flow_Velocity} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
           Maintain:   <Checkbox disabled={TECH_OPER} 
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainFlow_Velocity}
           checked={maintainFlow_Velocity}
          ></Checkbox>
          
          },
       

            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_303} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_303}> VP 303</span> ,
    
             modbus: <span style={combineCss.CSSVP_303}>500009	 </span> ,
    
            value: <span style={combineCss.CSSVP_303} > {formatValue(VP_303)} {DataVP_303}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_303}   placeholder='High' step="0.1" type='number' value={inputValueVP_303} onChange={handleInputChangeVP_303} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_303}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_303} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
             Maintain:   <Checkbox disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_303}
             checked={maintainVP_303}
         ></Checkbox>
    
            },
    
         
            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_302} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_302}> VP 302</span> ,
    
             modbus: <span style={combineCss.CSSVP_302}>500011	 </span> ,
    
            value: <span style={combineCss.CSSVP_302} > {formatValue(VP_302)} {DataVP_302}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_302}   placeholder='High' step="0.1" type='number' value={inputValueVP_302} onChange={handleInputChangeVP_302} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_302}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_302} onChange={handleInputChange2VP_302} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
             Maintain:   <Checkbox disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_302}
             checked={maintainVP_302}
         ></Checkbox>
    
            },
    
            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_301} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_301}> VP 301</span> ,
    
             modbus: <span style={combineCss.CSSVP_301}>500013	 </span> ,
    
            value: <span style={combineCss.CSSVP_301} > {formatValue(VP_301)} {DataVP_301}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_301}   placeholder='High' step="0.1" type='number' value={inputValueVP_301} onChange={handleInputChangeVP_301} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSVP_301}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_301} onChange={handleInputChange2VP_301} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
             Maintain:   <Checkbox disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_301}
             checked={maintainVP_301}
         ></Checkbox>
    
            },


            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSGD_103_High} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD_103_High}>GD-103 High </span> ,
    
             modbus: <span style={combineCss.CSSGD_103_High}>300015	 </span> ,
    
            value: <span style={combineCss.CSSGD_103_High} > {formatValue(GD_103_High)} {DataGD_103_High}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_103_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_103_High} onChange={handleInputChangeGD_103_High} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_103_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_103_High} onChange={handleInputChange2GD_103_High} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
             Maintain:   <Checkbox disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD_103_High}
             checked={maintainGD_103_High}
         ></Checkbox>
    
            },

            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSGD_102_High} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSGD_102_High}>GD-102 High </span> ,
   
            modbus: <span style={combineCss.CSSGD_102_High}>300017	 </span> ,
   
           value: <span style={combineCss.CSSGD_102_High} > {formatValue(GD_102_High)} {DataGD_102_High}</span> , 
            high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_102_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_102_High} onChange={handleInputChangeGD_102_High} inputMode="decimal" />, 
            low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_102_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_102_High} onChange={handleInputChange2GD_102_High} inputMode="decimal" />,
            update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
            Maintain:   <Checkbox disabled={TECH_OPER} 
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainGD_102_High}
            checked={maintainGD_102_High}
        ></Checkbox>
   
           },


           {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_101_High} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSGD_101_High}>GD-101 High </span> ,
  
           modbus: <span style={combineCss.CSSGD_101_High}>300019	 </span> ,
  
          value: <span style={combineCss.CSSGD_101_High} > {formatValue(GD_101_High)} {DataGD_101_High}</span> , 
           high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_101_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_101_High} onChange={handleInputChangeGD_101_High} inputMode="decimal" />, 
           low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_101_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_101_High} onChange={handleInputChange2GD_101_High} inputMode="decimal" />,
           update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
           Maintain:   <Checkbox disabled={TECH_OPER} 
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainGD_101_High}
           checked={maintainGD_101_High}
       ></Checkbox>
  
          },




          {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_103_Low} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSGD_103_Low}>GD-103 Low </span> ,
 
          modbus: <span style={combineCss.CSSGD_103_Low}>300021	 </span> ,
 
         value: <span style={combineCss.CSSGD_103_Low} > {formatValue(GD_103_Low)} {DataGD_103_Low}</span> , 
          high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_103_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_103_Low} onChange={handleInputChangeGD_103_Low} inputMode="decimal" />, 
          low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_103_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_103_Low} onChange={handleInputChange2GD_103_Low} inputMode="decimal" />,
          update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
          Maintain:   <Checkbox disabled={TECH_OPER} 
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainGD_103_Low}
          checked={maintainGD_103_Low}
      ></Checkbox>
 
         },

         {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_102_Low} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSGD_102_Low}>GD-102 Low </span> ,

         modbus: <span style={combineCss.CSSGD_102_Low}>300023	 </span> ,

        value: <span style={combineCss.CSSGD_102_Low} > {formatValue(GD_102_Low)} {DataGD_102_Low}</span> , 
         high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_102_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_102_Low} onChange={handleInputChangeGD_102_Low} inputMode="decimal" />, 
         low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_102_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_102_Low} onChange={handleInputChange2GD_102_Low} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
         Maintain:   <Checkbox disabled={TECH_OPER} 
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD_102_Low}
         checked={maintainGD_102_Low}
     ></Checkbox>

        },


        {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_101_Low} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_101_Low}>GD-101 Low </span> ,

        modbus: <span style={combineCss.CSSGD_101_Low}>300025	 </span> ,

       value: <span style={combineCss.CSSGD_101_Low} > {formatValue(GD_101_Low)} {DataGD_101_Low}</span> , 
        high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_101_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_101_Low} onChange={handleInputChangeGD_101_Low} inputMode="decimal" />, 
        low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSGD_101_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_101_Low} onChange={handleInputChange2GD_101_Low} inputMode="decimal" />,
        update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
        Maintain:   <Checkbox disabled={TECH_OPER} 
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_101_Low}
        checked={maintainGD_101_Low}
    ></Checkbox>

       },



       {
 mainCategory: mainCategoryFC.PLC ,
        
        timeUpdate: <span style={combineCss.CSSSDV_301} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_301}> SDV 301  </span> ,

       modbus: <span style={combineCss.CSSSDV_301}>500001	 </span> ,

      value: <span style={combineCss.CSSSDV_301} > {formatValue(SDV_301)} {DataSDV_301}</span> , 
       high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_301}   placeholder='High' step="0.1" type='number' value={inputValueSDV_301} onChange={handleInputChangeSDV_301} inputMode="decimal" />, 
       low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_301}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_301} onChange={handleInputChange2SDV_301} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
       Maintain:   <Checkbox disabled={TECH_OPER} 
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainSDV_301}
       checked={maintainSDV_301}
   ></Checkbox>

      },


      {
 mainCategory: mainCategoryFC.PLC ,
        
        timeUpdate: <span style={combineCss.CSSSDV_302} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_302}>SDV 302</span> ,

      modbus: <span style={combineCss.CSSSDV_302}>500003	 </span> ,

     value: <span style={combineCss.CSSSDV_302} > {SDV_302} {DataSDV_302}</span> , 
      high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_302}   placeholder='High' step="0.1" type='number' value={inputValueSDV_302} onChange={handleInputChangeSDV_302} inputMode="decimal" />, 
      low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSSDV_302}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_302} onChange={handleInputChange2SDV_302} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
      Maintain:   <Checkbox disabled={TECH_OPER} 
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainSDV_302}
      checked={maintainSDV_302}
  ></Checkbox>

     },
     {
        mainCategory: mainCategoryFC.PLC ,
               
               timeUpdate: <span style={combineCss.CSSPLC_Conn_STT} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSPLC_Conn_STT}>PLC Connection Status</span> ,
       
             modbus: <span style={combineCss.CSSPLC_Conn_STT}>Status	 </span> ,
       
            value: <span style={combineCss.CSSPLC_Conn_STT} > {PLC_Conn_STT} {DataPLC_Conn_STT}</span> , 
             high: <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
             low:  <InputText disabled={TECHNIAN_AUTH} style={combineCss.CSSPLC_Conn_STT}   placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
             update:  <Button className='buttonUpdateSetData' onClick={confirmUpData} label='Update' disabled={TECHNIAN_AUTH} />,
             Maintain:   <Checkbox disabled={TECH_OPER} 
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainPLC_Conn_STT}
             checked={maintainPLC_Conn_STT}
         ></Checkbox>
       
            },


          ]

          const combinedData = [ ...dataEVC01 ];

          const mainCategoryTemplate = (data: any) => {
              return (
                  <div style={{fontWeight:600, fontSize:23,background:'#f8fafc', marginTop:10}}>
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

    const Configuration = [
       
        {
            Name: <span style={combineCssAttribute.PCV}>IOT gateway phone number </span>,

            Value: (
                <InputText
                disabled={TECHNIAN_AUTH}
              style={combineCssAttribute.PCV}
                    step="0.1"
                    type="Name"
                    value={inputGetwayPhone}
                    onChange={handleInputChangeGetWayPhone}
                    inputMode="decimal"
                />
            ),

                
        
            
            Update: (
                <Button
                disabled={TECHNIAN_AUTH}

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, }}>
   
    <Toast ref={toast} />

    <ConfirmDialog />

<h2>MEIKO</h2>

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