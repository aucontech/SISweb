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
            const VP_303_Low = res.data.find((item: any) => item.key === "VP_302_Low");
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

 // =================================================================================================================== 
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


            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

 // =================================================================================================================== 

    const [VP_303, setVP_303] = useState<string | null>(null);
const [audioPlayingVP_303, setAudioPlayingVP_303] = useState(false);
const [inputValueVP_303, setInputValueVP_303] = useState<any>();
const [inputValue2VP_303, setInputValue2VP_303] = useState<any>();
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
                    if (!audioPlayingVP_303) {
                        audioRef.current?.play();
                        setAudioPlayingVP_303(true);
                        setExceedThresholdVP_303(true);
                    }
                } else {
                    setAudioPlayingVP_303(false);
                    setExceedThresholdVP_303(false);
                }
            } 
        } 
    }, [VP_303_High, VP_303, audioPlayingVP_303, VP_303_Low,maintainVP_303]);

    useEffect(() => {
        if (audioPlayingVP_303) {
            const audioEnded = () => {
                setAudioPlayingVP_303(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingVP_303]);

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
     const [exceedThreshold302, setExceedThreshold302] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainVP_302, setMaintainVP_302] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof VP_302_High === 'string' && typeof VP_302_Low === 'string' && VP_302 !== null && maintainVP_302 === false
             ) {
                 const highValue = parseFloat(VP_302_High);
                 const lowValue = parseFloat(VP_302_Low);
                 const VP_302Value = parseFloat(VP_302);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VP_302Value)) {
                     if (highValue <= VP_302Value || VP_302Value <= lowValue) {
                         if (!audioPlayingVP_302) {
                             audioRef.current?.play();
                             setAudioPlayingVP_302(true);
                             setExceedThreshold302(true);
                         }
                     } else {
                        setAudioPlayingVP_302(false);
                         setExceedThreshold302(false);
                     }
                 } 
             } 
         }, [VP_302_High, VP_302, audioPlayingVP_302, VP_302_Low,maintainVP_302]);
     
         useEffect(() => {
             if (audioPlayingVP_302) {
                 const audioEnded = () => {
                    setAudioPlayingVP_302(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingVP_302]);
     
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
             if (typeof VP_301_High === 'string' && typeof VP_301_Low === 'string' && VP_301 !== null && maintainVP_301 === false
             ) {
                 const highValue = parseFloat(VP_301_High);
                 const lowValue = parseFloat(VP_301_Low);
                 const VP_301Value = parseFloat(VP_301);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VP_301Value)) {
                     if (highValue <= VP_301Value || VP_301Value <= lowValue) {
                         if (!audioPlayingVP_301) {
                             audioRef.current?.play();
                             setAudioPlayingVP_301(true);
                             setExceedThresholdVP_301(true);
                         }
                     } else {
                        setAudioPlayingVP_301(false);
                        setExceedThresholdVP_301(false);
                     }
                 } 
             } 
         }, [VP_301_High, VP_301, audioPlayingVP_301, VP_301_Low,maintainVP_301]);
     
         useEffect(() => {
             if (audioPlayingVP_301) {
                 const audioEnded = () => {
                    setAudioPlayingVP_301(false);
                 };
                 audioRef.current?.addEventListener('ended', audioEnded);
                 return () => {
                     audioRef.current?.removeEventListener('ended', audioEnded);
                 };
             }
         }, [audioPlayingVP_301]);
     
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
                  if (typeof GD_103_High_High === 'string' && typeof GD_103_High_Low === 'string' && GD_103_High !== null && maintainGD_103_High === false
                  ) {
                      const highValue = parseFloat(GD_103_High_High);
                      const lowValue = parseFloat(GD_103_High_Low);
                      const GD_103_HighValue = parseFloat(GD_103_High);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_103_HighValue)) {
                          if (highValue <= GD_103_HighValue || GD_103_HighValue <= lowValue) {
                              if (!audioPlayingGD_103_High) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_103_High(true);
                                  setExceedThresholdGD_103_High(true);
                              }
                          } else {
                             setAudioPlayingGD_103_High(false);
                             setExceedThresholdGD_103_High(false);
                          }
                      } 
                  } 
              }, [GD_103_High_High, GD_103_High, audioPlayingGD_103_High, GD_103_High_Low,maintainGD_103_High]);
          
              useEffect(() => {
                  if (audioPlayingGD_103_High) {
                      const audioEnded = () => {
                         setAudioPlayingGD_103_High(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_103_High]);
          
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
          const [audioPlayingGD_102_High, setAudioPlayingGD_102_High] = useState(false);
          const [inputValueGD_102_High, setInputValueGD_102_High] = useState<any>();
          const [inputValue2GD_102_High, setInputValue2GD_102_High] = useState<any>();
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
                              if (!audioPlayingGD_102_High) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_102_High(true);
                                  setExceedThresholdGD_102_High(true);
                              }
                          } else {
                             setAudioPlayingGD_102_High(false);
                             setExceedThresholdGD_102_High(false);
                          }
                      } 
                  } 
              }, [GD_102_High_High, GD_102_High, audioPlayingGD_102_High , GD_102_High_Low,maintainGD_102_High]);
          
              useEffect(() => {
                  if (audioPlayingGD_102_High) {
                      const audioEnded = () => {
                         setAudioPlayingGD_102_High(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_102_High]);
          
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
          const [audioPlayingGD_101_High, setAudioPlayingGD_101_High] = useState(false);
          const [inputValueGD_101_High, setInputValueGD_101_High] = useState<any>();
          const [inputValue2GD_101_High, setInputValue2GD_101_High] = useState<any>();
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
                              if (!audioPlayingGD_101_High) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_101_High(true);
                                  setExceedThresholdGD_101_High(true);
                              }
                          } else {
                             setAudioPlayingGD_101_High(false);
                             setExceedThresholdGD_101_High(false);
                          }
                      } 
                  } 
              }, [GD_101_High_High, GD_101_High, audioPlayingGD_101_High, GD_101_High_Low,maintainGD_101_High]);
          
              useEffect(() => {
                  if (audioPlayingGD_101_High) {
                      const audioEnded = () => {
                         setAudioPlayingGD_101_High(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_101_High]);
          
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
          const [audioPlayingGD_101_Low, setAudioPlayingGD_101_Low] = useState(false);
          const [inputValueGD_101_Low, setInputValueGD_101_Low] = useState<any>();
          const [inputValue2GD_101_Low, setInputValue2GD_101_Low] = useState<any>();
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
                              if (!audioPlayingGD_101_Low) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_101_Low(true);
                                  setExceedThresholdGD_101_Low(true);
                              }
                          } else {
                             setAudioPlayingGD_101_Low(false);
                             setExceedThresholdGD_101_Low(false);
                          }
                      } 
                  } 
              }, [GD_101_Low_High, GD_101_Low, audioPlayingGD_101_Low, GD_101_Low_Low,maintainGD_101_Low]);
          
              useEffect(() => {
                  if (audioPlayingGD_101_Low) {
                      const audioEnded = () => {
                         setAudioPlayingGD_101_Low(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_101_Low]);
          
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
          const [audioPlayingGD_102_Low, setAudioPlayingGD_102_Low] = useState(false);
          const [inputValueGD_102_Low, setInputValueGD_102_Low] = useState<any>();
          const [inputValue2GD_102_Low, setInputValue2GD_102_Low] = useState<any>();
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
                              if (!audioPlayingGD_102_Low) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_102_Low(true);
                                  setExceedThresholdGD_102_Low(true);
                              }
                          } else {
                             setAudioPlayingGD_102_Low(false);
                             setExceedThresholdGD_102_Low(false);
                          }
                      } 
                  } 
              }, [GD_102_Low_High, GD_102_Low, audioPlayingGD_102_Low, GD_102_Low_Low,maintainGD_102_Low]);
          
              useEffect(() => {
                  if (audioPlayingGD_102_Low) {
                      const audioEnded = () => {
                         setAudioPlayingGD_102_Low(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_102_Low]);
          
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
          const [audioPlayingGD_103_Low, setAudioPlayingGD_103_Low] = useState(false);
          const [inputValueGD_103_Low, setInputValueGD_103_Low] = useState<any>();
          const [inputValue2GD_103_Low, setInputValue2GD_103_Low] = useState<any>();
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
                              if (!audioPlayingGD_103_Low) {
                                  audioRef.current?.play();
                                  setAudioPlayingGD_103_Low(true);
                                  setExceedThresholdGD_103_Low(true);
                              }
                          } else {
                             setAudioPlayingGD_103_Low(false);
                             setExceedThresholdGD_103_Low(false);
                          }
                      } 
                  } 
              }, [GD_103_Low_High, GD_103_Low, audioPlayingGD_103_Low, GD_103_Low_Low,maintainGD_103_Low]);
          
              useEffect(() => {
                  if (audioPlayingGD_103_Low) {
                      const audioEnded = () => {
                         setAudioPlayingGD_103_Low(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingGD_103_Low]);
          
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
          const [audioPlayingSDV_301, setAudioPlayingSDV_301] = useState(false);
          const [inputValueSDV_301, setInputValueSDV_301] = useState<any>();
          const [inputValue2SDV_301, setInputValue2SDV_301] = useState<any>();
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
                              if (!audioPlayingSDV_301) {
                                  audioRef.current?.play();
                                  setAudioPlayingSDV_301(true);
                                  setExceedThresholdSDV_301(true);
                              }
                          } else {
                             setAudioPlayingSDV_301(false);
                             setExceedThresholdSDV_301(false);
                          }
                      } 
                  } 
              }, [SDV_301_High, SDV_301, audioPlayingSDV_301, SDV_301_Low,maintainSDV_301]);
          
              useEffect(() => {
                  if (audioPlayingSDV_301) {
                      const audioEnded = () => {
                         setAudioPlayingSDV_301(false);
                      };
                      audioRef.current?.addEventListener('ended', audioEnded);
                      return () => {
                          audioRef.current?.removeEventListener('ended', audioEnded);
                      };
                  }
              }, [audioPlayingSDV_301]);
          
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
            if (typeof SDV_302_High === 'string' && typeof SDV_302_Low === 'string' && SDV_302 !== null && maintainSDV_302 === false
            ) {
                const highValue = parseFloat(SDV_302_High);
                const lowValue = parseFloat(SDV_302_Low);
                const SDV_302Value = parseFloat(SDV_302);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_302Value)) {
                    if (highValue <= SDV_302Value || SDV_302Value <= lowValue) {
                        if (!audioPlayingSDV_302) {
                            audioRef.current?.play();
                            setAudioPlayingSDV_302(true);
                            setExceedThresholdSDV_302(true);
                        }
                    } else {
                       setAudioPlayingSDV_302(false);
                       setExceedThresholdSDV_302(false);
                    }
                } 
            } 
        }, [SDV_302_High, SDV_302, audioPlayingSDV_302, SDV_302_Low,maintainSDV_302]);
    
        useEffect(() => {
            if (audioPlayingSDV_302) {
                const audioEnded = () => {
                   setAudioPlayingSDV_302(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingSDV_302]);
    
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
                if (typeof V1_Flow_Meter_High === 'string' && typeof V1_Flow_Meter_Low === 'string' && V1_Flow_Meter !== null && maintainV1_Flow_Meter === false
                ) {
                    const highValue = parseFloat(V1_Flow_Meter_High);
                    const lowValue = parseFloat(V1_Flow_Meter_Low);
                    const V1_Flow_MeterValue = parseFloat(V1_Flow_Meter);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(V1_Flow_MeterValue)) {
                        if (highValue <= V1_Flow_MeterValue || V1_Flow_MeterValue <= lowValue) {
                            if (!audioPlayingV1_Flow_Meter) {
                                audioRef.current?.play();
                                setAudioPlayingV1_Flow_Meter(true);
                                setExceedThresholdV1_Flow_Meter(true);
                            }
                        } else {
                           setAudioPlayingV1_Flow_Meter(false);
                           setExceedThresholdV1_Flow_Meter(false);
                        }
                    } 
                } 
            }, [V1_Flow_Meter_High, V1_Flow_Meter, audioPlayingV1_Flow_Meter, V1_Flow_Meter_Low,maintainV1_Flow_Meter]);
        
            useEffect(() => {
                if (audioPlayingV1_Flow_Meter) {
                    const audioEnded = () => {
                       setAudioPlayingV1_Flow_Meter(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingV1_Flow_Meter]);
        
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
            if (typeof V2_Flow_Meter_High === 'string' && typeof V2_Flow_Meter_Low === 'string' && V2_Flow_Meter !== null && maintainV2_Flow_Meter === false
            ) {
                const highValue = parseFloat(V2_Flow_Meter_High);
                const lowValue = parseFloat(V2_Flow_Meter_Low);
                const V2_Flow_MeterValue = parseFloat(V2_Flow_Meter);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(V2_Flow_MeterValue)) {
                    if (highValue <= V2_Flow_MeterValue || V2_Flow_MeterValue <= lowValue) {
                        if (!audioPlayingV2_Flow_Meter) {
                            audioRef.current?.play();
                            setAudioPlayingV2_Flow_Meter(true);
                            setExceedThresholdV2_Flow_Meter(true);
                        }
                    } else {
                       setAudioPlayingV2_Flow_Meter(false);
                       setExceedThresholdV2_Flow_Meter(false);
                    }
                } 
            } 
        }, [V2_Flow_Meter_High, V2_Flow_Meter, audioPlayingV2_Flow_Meter, V2_Flow_Meter_Low,maintainV2_Flow_Meter]);
    
        useEffect(() => {
            if (audioPlayingV2_Flow_Meter) {
                const audioEnded = () => {
                   setAudioPlayingV2_Flow_Meter(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingV2_Flow_Meter]);
    
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
            if (typeof Pipe_Temp_High === 'string' && typeof Pipe_Temp_Low === 'string' && Pipe_Temp !== null && maintainPipe_Temp === false
            ) {
                const highValue = parseFloat(Pipe_Temp_High);
                const lowValue = parseFloat(Pipe_Temp_Low);
                const Pipe_TempValue = parseFloat(Pipe_Temp);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Pipe_TempValue)) {
                    if (highValue <= Pipe_TempValue || Pipe_TempValue <= lowValue) {
                        if (!audioPlayingPipe_Temp) {
                            audioRef.current?.play();
                            setAudioPlayingPipe_Temp(true);
                            setExceedThresholdPipe_Temp(true);
                        }
                    } else {
                       setAudioPlayingPipe_Temp(false);
                       setExceedThresholdPipe_Temp(false);
                    }
                } 
            } 
        }, [Pipe_Temp_High, Pipe_Temp, audioPlayingPipe_Temp, Pipe_Temp_Low,maintainPipe_Temp]);
    
        useEffect(() => {
            if (audioPlayingPipe_Temp) {
                const audioEnded = () => {
                   setAudioPlayingPipe_Temp(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingPipe_Temp]);
    
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
        if (typeof Pipe_Press_High === 'string' && typeof Pipe_Press_Low === 'string' && Pipe_Press !== null && maintainPipe_Press === false
        ) {
            const highValue = parseFloat(Pipe_Press_High);
            const lowValue = parseFloat(Pipe_Press_Low);
            const Pipe_PressValue = parseFloat(Pipe_Press);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Pipe_PressValue)) {
                if (highValue <= Pipe_PressValue || Pipe_PressValue <= lowValue) {
                    if (!audioPlayingPipe_Press) {
                        audioRef.current?.play();
                        setAudioPlayingPipe_Press(true);
                        setExceedThresholdPipe_Press(true);
                    }
                } else {
                   setAudioPlayingPipe_Press(false);
                   setExceedThresholdPipe_Press(false);
                }
            } 
        } 
    }, [Pipe_Press_High, Pipe_Press, audioPlayingPipe_Press, Pipe_Press_Low,maintainPipe_Press]);

    useEffect(() => {
        if (audioPlayingPipe_Press) {
            const audioEnded = () => {
               setAudioPlayingPipe_Press(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingPipe_Press]);

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
        if (typeof Tank_TT_301_High === 'string' && typeof Tank_TT_301_Low === 'string' && Tank_TT_301 !== null && maintainTank_TT_301 === false
        ) {
            const highValue = parseFloat(Tank_TT_301_High);
            const lowValue = parseFloat(Tank_TT_301_Low);
            const Tank_TT_301Value = parseFloat(Tank_TT_301);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_TT_301Value)) {
                if (highValue <= Tank_TT_301Value || Tank_TT_301Value <= lowValue) {
                    if (!audioPlayingTank_TT_301) {
                        audioRef.current?.play();
                        setAudioPlayingTank_TT_301(true);
                        setExceedThresholdTank_TT_301(true);
                    }
                } else {
                   setAudioPlayingTank_TT_301(false);
                   setExceedThresholdTank_TT_301(false);
                }
            } 
        } 
    }, [Tank_TT_301_High, Tank_TT_301, audioPlayingTank_TT_301, Tank_TT_301_Low,maintainTank_TT_301]);

    useEffect(() => {
        if (audioPlayingTank_TT_301) {
            const audioEnded = () => {
               setAudioPlayingTank_TT_301(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlayingTank_TT_301]);

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
    if (typeof Tank_PT_301_High === 'string' && typeof Tank_PT_301_Low === 'string' && Tank_PT_301 !== null && maintainTank_PT_301 === false
    ) {
        const highValue = parseFloat(Tank_PT_301_High);
        const lowValue = parseFloat(Tank_PT_301_Low);
        const Tank_PT_301Value = parseFloat(Tank_PT_301);

        if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_PT_301Value)) {
            if (highValue <= Tank_PT_301Value || Tank_PT_301Value <= lowValue) {
                if (!audioPlayingTank_PT_301) {
                    audioRef.current?.play();
                    setAudioPlayingTank_PT_301(true);
                    setExceedThresholdTank_PT_301(true);
                }
            } else {
               setAudioPlayingTank_PT_301(false);
               setExceedThresholdTank_PT_301(false);
            }
        } 
    } 
}, [Tank_PT_301_High, Tank_PT_301, audioPlayingTank_PT_301, Tank_PT_301_Low,maintainTank_PT_301]);

useEffect(() => {
    if (audioPlayingTank_PT_301) {
        const audioEnded = () => {
           setAudioPlayingTank_PT_301(false);
        };
        audioRef.current?.addEventListener('ended', audioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', audioEnded);
        };
    }
}, [audioPlayingTank_PT_301]);

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
                if (typeof Tank_01_Volume_High === 'string' && typeof Tank_01_Volume_Low === 'string' && Tank_01_Volume !== null && maintainTank_01_Volume === false
                ) {
                    const highValue = parseFloat(Tank_01_Volume_High);
                    const lowValue = parseFloat(Tank_01_Volume_Low);
                    const Tank_01_VolumeValue = parseFloat(Tank_01_Volume);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_01_VolumeValue)) {
                        if (highValue <= Tank_01_VolumeValue || Tank_01_VolumeValue <= lowValue) {
                            if (!audioPlayingTank_01_Volume) {
                                audioRef.current?.play();
                                setAudioPlayingTank_01_Volume(true);
                                setExceedThresholdTank_01_Volume(true);
                            }
                        } else {
                           setAudioPlayingTank_01_Volume(false);
                           setExceedThresholdTank_01_Volume(false);
                        }
                    } 
                } 
            }, [Tank_01_Volume_High, Tank_01_Volume, audioPlayingTank_01_Volume, Tank_01_Volume_Low,maintainTank_01_Volume]);
        
            useEffect(() => {
                if (audioPlayingTank_01_Volume) {
                    const audioEnded = () => {
                       setAudioPlayingTank_01_Volume(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingTank_01_Volume]);
        
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
                if (typeof Tank_01_Mass_High === 'string' && typeof Tank_01_Mass_Low === 'string' && Tank_01_Mass !== null && maintainTank_01_Mass === false
                ) {
                    const highValue = parseFloat(Tank_01_Mass_High);
                    const lowValue = parseFloat(Tank_01_Mass_Low);
                    const Tank_01_MassValue = parseFloat(Tank_01_Mass);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Tank_01_MassValue)) {
                        if (highValue <= Tank_01_MassValue || Tank_01_MassValue <= lowValue) {
                            if (!audioPlayingTank_01_Mass) {
                                audioRef.current?.play();
                                setAudioPlayingTank_01_Mass(true);
                                setExceedThresholdTank_01_Mass(true);
                            }
                        } else {
                           setAudioPlayingTank_01_Mass(false);
                           setExceedThresholdTank_01_Mass(false);
                        }
                    } 
                } 
            }, [Tank_01_Mass_High, Tank_01_Mass, audioPlayingTank_01_Mass, Tank_01_Mass_Low,maintainTank_01_Mass]);
        
            useEffect(() => {
                if (audioPlayingTank_01_Mass) {
                    const audioEnded = () => {
                       setAudioPlayingTank_01_Mass(false);
                    };
                    audioRef.current?.addEventListener('ended', audioEnded);
                    return () => {
                        audioRef.current?.removeEventListener('ended', audioEnded);
                    };
                }
            }, [audioPlayingTank_01_Mass]);
        
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
        const [audioPlayingTank_01_Level, setAudioPlayingTank_01_Level] = useState(false);
        const [inputValueTank_01_Level, setInputValueTank_01_Level] = useState<any>();
        const [inputValue2Tank_01_Level, setInputValue2Tank_01_Level] = useState<any>();
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
                        if (!audioPlayingTank_01_Level) {
                            audioRef.current?.play();
                            setAudioPlayingTank_01_Level(true);
                            setExceedThresholdTank_01_Level(true);
                        }
                    } else {
                       setAudioPlayingTank_01_Level(false);
                       setExceedThresholdTank_01_Level(false);
                    }
                } 
            } 
        }, [Tank_01_Level_High, Tank_01_Level, audioPlayingTank_01_Level, Tank_01_Level_Low,maintainTank_01_Level]);
        
        useEffect(() => {
            if (audioPlayingTank_01_Level) {
                const audioEnded = () => {
                   setAudioPlayingTank_01_Level(false);
                };
                audioRef.current?.addEventListener('ended', audioEnded);
                return () => {
                    audioRef.current?.removeEventListener('ended', audioEnded);
                };
            }
        }, [audioPlayingTank_01_Level]);
        
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

                }
            );
            setGetWayPhoneOTSUKA(inputGetwayPhone);

            setFlow_Meter_Total_High(inputValueFlow_Meter_Total);
            setFlow_Meter_Total_Low(inputValue2Flow_Meter_Total);

            setVP_302_High(inputValueVP_302);
            setVP_302_Low(inputValue2VP_302);

            setVP_301_High(inputValueVP_301);
            setVP_301_Low(inputValue2VP_301);

            setVP_301_High(inputValueVP_301);
            setVP_301_Low(inputValue2VP_301);

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


           Tank_01_Volume_High,Tank_01_Volume_Low,
           Tank_01_Mass_High,Tank_01_Mass_Low,
           Tank_01_Level_High,Tank_01_Level_Low,
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
  };
         
    
         
  const mainCategoryFC = {
    EVC: 'EVC01 -  Parameter & Configuration',
 
    PLC: 'PLC -  Parameter & Configuration'
};

        const dataEVC01 = [

            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_303} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_303}> VP 303</span> ,
    
             modbus: <span style={combineCss.CSSVP_303}>000009	 </span> ,
    
            value: <span style={combineCss.CSSVP_303} > {VP_303}</span> , 
             high: <InputText style={combineCss.CSSVP_303}   placeholder='High' step="0.1" type='number' value={inputValueVP_303} onChange={handleInputChangeVP_303} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSVP_303}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_303} onChange={handleInputChange2VP303} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_303}
             checked={maintainVP_303}
         ></Checkbox>
    
            },
    
         
            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_302} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_302}> VP 302</span> ,
    
             modbus: <span style={combineCss.CSSVP_302}>000011	 </span> ,
    
            value: <span style={combineCss.CSSVP_302} > {VP_302}</span> , 
             high: <InputText style={combineCss.CSSVP_302}   placeholder='High' step="0.1" type='number' value={inputValueVP_302} onChange={handleInputChangeVP_302} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSVP_302}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_302} onChange={handleInputChange2VP_302} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_302}
             checked={maintainVP_302}
         ></Checkbox>
    
            },
    
            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSVP_301} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSVP_301}> VP 301</span> ,
    
             modbus: <span style={combineCss.CSSVP_301}>000013	 </span> ,
    
            value: <span style={combineCss.CSSVP_301} > {VP_301}</span> , 
             high: <InputText style={combineCss.CSSVP_301}   placeholder='High' step="0.1" type='number' value={inputValueVP_301} onChange={handleInputChangeVP_301} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSVP_301}   placeholder='Low' step="0.1" type='number' value={inputValue2VP_301} onChange={handleInputChange2VP_301} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainVP_301}
             checked={maintainVP_301}
         ></Checkbox>
    
            },


            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSGD_103_High} >{PLC_STTValue}</span>,
             name: <span style={combineCss.CSSGD_103_High}>GD-103 High </span> ,
    
             modbus: <span style={combineCss.CSSGD_103_High}>000015	 </span> ,
    
            value: <span style={combineCss.CSSGD_103_High} > {GD_103_High}</span> , 
             high: <InputText style={combineCss.CSSGD_103_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_103_High} onChange={handleInputChangeGD_103_High} inputMode="decimal" />, 
             low:  <InputText style={combineCss.CSSGD_103_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_103_High} onChange={handleInputChange2GD_103_High} inputMode="decimal" />,
             update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
             Maintain:   <Checkbox
             style={{ marginRight: 20, }}
             onChange={ChangeMaintainGD_103_High}
             checked={maintainGD_103_High}
         ></Checkbox>
    
            },

            {
 mainCategory: mainCategoryFC.PLC ,
                
                timeUpdate: <span style={combineCss.CSSGD_102_High} >{PLC_STTValue}</span>,
            name: <span style={combineCss.CSSGD_102_High}>GD-102 High </span> ,
   
            modbus: <span style={combineCss.CSSGD_102_High}>000017	 </span> ,
   
           value: <span style={combineCss.CSSGD_102_High} > {GD_102_High}</span> , 
            high: <InputText style={combineCss.CSSGD_102_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_102_High} onChange={handleInputChangeGD_102_High} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSGD_102_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_102_High} onChange={handleInputChange2GD_102_High} inputMode="decimal" />,
            update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
            Maintain:   <Checkbox
            style={{ marginRight: 20, }}
            onChange={ChangeMaintainGD_102_High}
            checked={maintainGD_102_High}
        ></Checkbox>
   
           },


           {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_101_High} >{PLC_STTValue}</span>,
           name: <span style={combineCss.CSSGD_101_High}>GD-101 High </span> ,
  
           modbus: <span style={combineCss.CSSGD_101_High}>000019	 </span> ,
  
          value: <span style={combineCss.CSSGD_101_High} > {GD_101_High}</span> , 
           high: <InputText style={combineCss.CSSGD_101_High}   placeholder='High' step="0.1" type='number' value={inputValueGD_101_High} onChange={handleInputChangeGD_101_High} inputMode="decimal" />, 
           low:  <InputText style={combineCss.CSSGD_101_High}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_101_High} onChange={handleInputChange2GD_101_High} inputMode="decimal" />,
           update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
           Maintain:   <Checkbox
           style={{ marginRight: 20, }}
           onChange={ChangeMaintainGD_101_High}
           checked={maintainGD_101_High}
       ></Checkbox>
  
          },




          {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_103_Low} >{PLC_STTValue}</span>,
          name: <span style={combineCss.CSSGD_103_Low}>GD-103 Low </span> ,
 
          modbus: <span style={combineCss.CSSGD_103_Low}>000021	 </span> ,
 
         value: <span style={combineCss.CSSGD_103_Low} > {GD_103_Low}</span> , 
          high: <InputText style={combineCss.CSSGD_103_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_103_Low} onChange={handleInputChangeGD_103_Low} inputMode="decimal" />, 
          low:  <InputText style={combineCss.CSSGD_103_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_103_Low} onChange={handleInputChange2GD_103_Low} inputMode="decimal" />,
          update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
          Maintain:   <Checkbox
          style={{ marginRight: 20, }}
          onChange={ChangeMaintainGD_103_Low}
          checked={maintainGD_103_Low}
      ></Checkbox>
 
         },

         {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_102_Low} >{PLC_STTValue}</span>,
         name: <span style={combineCss.CSSGD_102_Low}>GD-102 Low </span> ,

         modbus: <span style={combineCss.CSSGD_102_Low}>000023	 </span> ,

        value: <span style={combineCss.CSSGD_102_Low} > {GD_102_Low}</span> , 
         high: <InputText style={combineCss.CSSGD_102_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_102_Low} onChange={handleInputChangeGD_102_Low} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSGD_102_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_102_Low} onChange={handleInputChange2GD_102_Low} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD_102_Low}
         checked={maintainGD_102_Low}
     ></Checkbox>

        },


        {
 mainCategory: mainCategoryFC.PLC ,
            
            timeUpdate: <span style={combineCss.CSSGD_101_Low} >{PLC_STTValue}</span>,
        name: <span style={combineCss.CSSGD_101_Low}>GD-101 Low </span> ,

        modbus: <span style={combineCss.CSSGD_101_Low}>000025	 </span> ,

       value: <span style={combineCss.CSSGD_101_Low} > {GD_101_Low}</span> , 
        high: <InputText style={combineCss.CSSGD_101_Low}   placeholder='High' step="0.1" type='number' value={inputValueGD_101_Low} onChange={handleInputChangeGD_101_Low} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSGD_101_Low}   placeholder='Low' step="0.1" type='number' value={inputValue2GD_101_Low} onChange={handleInputChange2GD_101_Low} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainGD_101_Low}
        checked={maintainGD_101_Low}
    ></Checkbox>

       },



       {
 mainCategory: mainCategoryFC.PLC ,
        
        timeUpdate: <span style={combineCss.CSSSDV_301} >{PLC_STTValue}</span>,
       name: <span style={combineCss.CSSSDV_301}> SDV 301  </span> ,

       modbus: <span style={combineCss.CSSSDV_301}>000001	 </span> ,

      value: <span style={combineCss.CSSSDV_301} > {SDV_301}</span> , 
       high: <InputText style={combineCss.CSSSDV_301}   placeholder='High' step="0.1" type='number' value={inputValueSDV_301} onChange={handleInputChangeSDV_301} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSSSDV_301}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_301} onChange={handleInputChange2SDV_301} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainSDV_301}
       checked={maintainSDV_301}
   ></Checkbox>

      },


      {
 mainCategory: mainCategoryFC.PLC ,
        
        timeUpdate: <span style={combineCss.CSSSDV_302} >{PLC_STTValue}</span>,
      name: <span style={combineCss.CSSSDV_302}>SDV 302</span> ,

      modbus: <span style={combineCss.CSSSDV_302}>000003	 </span> ,

     value: <span style={combineCss.CSSSDV_302} > {SDV_302}</span> , 
      high: <InputText style={combineCss.CSSSDV_302}   placeholder='High' step="0.1" type='number' value={inputValueSDV_302} onChange={handleInputChangeSDV_302} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSSDV_302}   placeholder='Low' step="0.1" type='number' value={inputValue2SDV_302} onChange={handleInputChange2SDV_302} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainSDV_302}
      checked={maintainSDV_302}
  ></Checkbox>

     },



     {
 mainCategory: mainCategoryFC.PLC ,
        
        timeUpdate: <span style={combineCss.CSSV1_Flow_Meter} >{PLC_STTValue}</span>,
     name: <span style={combineCss.CSSV1_Flow_Meter}> V1 Flow Meter </span> ,

     modbus: <span style={combineCss.CSSV1_Flow_Meter}>400001	 </span> ,

    value: <span style={combineCss.CSSV1_Flow_Meter} > {V1_Flow_Meter}</span> , 
     high: <InputText style={combineCss.CSSV1_Flow_Meter}   placeholder='High' step="0.1" type='number' value={inputValueV1_Flow_Meter} onChange={handleInputChangeV1_Flow_Meter} inputMode="decimal" />, 
     low:  <InputText style={combineCss.CSSV1_Flow_Meter}   placeholder='Low' step="0.1" type='number' value={inputValue2V1_Flow_Meter} onChange={handleInputChange2V1_Flow_Meter} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
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

   value: <span style={combineCss.CSSV2_Flow_Meter} > {V2_Flow_Meter}</span> , 
    high: <InputText style={combineCss.CSSV2_Flow_Meter}   placeholder='High' step="0.1" type='number' value={inputValueV2_Flow_Meter} onChange={handleInputChangeV2_Flow_Meter} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSV2_Flow_Meter}   placeholder='Low' step="0.1" type='number' value={inputValue2V2_Flow_Meter} onChange={handleInputChange2V2_Flow_Meter} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
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

  value: <span style={combineCss.CSSPipe_Temp} > {Pipe_Temp}</span> , 
   high: <InputText style={combineCss.CSSPipe_Temp}   placeholder='High' step="0.1" type='number' value={inputValuePipe_Temp} onChange={handleInputChangePipe_Temp} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSPipe_Temp}   placeholder='Low' step="0.1" type='number' value={inputValue2Pipe_Temp} onChange={handleInputChange2Pipe_Temp} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSPipe_Press} > {Pipe_Press}</span> , 
  high: <InputText style={combineCss.CSSPipe_Press}   placeholder='High' step="0.1" type='number' value={inputValuePipe_Press} onChange={handleInputChangePipe_Press} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSPipe_Press}   placeholder='Low' step="0.1" type='number' value={inputValue2Pipe_Press} onChange={handleInputChange2Pipe_Press} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

  value: <span style={combineCss.CSSTank_TT_301} > {Tank_TT_301}</span> , 
   high: <InputText style={combineCss.CSSTank_TT_301}   placeholder='High' step="0.1" type='number' value={inputValueTank_TT_301} onChange={handleInputChangeTank_TT_301} inputMode="decimal" />, 
   low:  <InputText style={combineCss.CSSTank_TT_301}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_TT_301} onChange={handleInputChange2Tank_TT_301} inputMode="decimal" />,
   update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
   Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSTank_PT_301} > {Tank_PT_301}</span> , 
  high: <InputText style={combineCss.CSSTank_PT_301}   placeholder='High' step="0.1" type='number' value={inputValueTank_PT_301} onChange={handleInputChangeTank_PT_301} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSTank_PT_301}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_PT_301} onChange={handleInputChange2Tank_PT_301} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

value: <span style={combineCss.CSSTank_01_Volume} > {Tank_01_Volume}</span> , 
 high: <InputText style={combineCss.CSSTank_01_Volume}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Volume} onChange={handleInputChangeTank_01_Volume} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSTank_01_Volume}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Volume} onChange={handleInputChange2Tank_01_Volume} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
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

 value: <span style={combineCss.CSSTank_01_Mass} > {Tank_01_Mass}</span> , 
  high: <InputText style={combineCss.CSSTank_01_Mass}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Mass} onChange={handleInputChangeTank_01_Mass} inputMode="decimal" />, 
  low:  <InputText style={combineCss.CSSTank_01_Mass}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Mass} onChange={handleInputChange2Tank_01_Mass} inputMode="decimal" />,
  update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
  Maintain:   <Checkbox
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

value: <span style={combineCss.CSSTank_01_Level} > {Tank_01_Level}</span> , 
 high: <InputText style={combineCss.CSSTank_01_Level}   placeholder='High' step="0.1" type='number' value={inputValueTank_01_Level} onChange={handleInputChangeTank_01_Level} inputMode="decimal" />, 
 low:  <InputText style={combineCss.CSSTank_01_Level}   placeholder='Low' step="0.1" type='number' value={inputValue2Tank_01_Level} onChange={handleInputChange2Tank_01_Level} inputMode="decimal" />,
 update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainTank_01_Level}
 checked={maintainTank_01_Level}
></Checkbox>

},

{
    mainCategory: mainCategoryFC.PLC ,
       
       timeUpdate: <span style={combineCss.CSSFlow_Meter_Total} >{PLC_STTValue}</span>,
    name: <span style={combineCss.CSSFlow_Meter_Total}>Flow Meter Total</span> ,
   
    modbus: <span style={combineCss.CSSFlow_Meter_Total}>not available	 </span> ,
   
   value: <span style={combineCss.CSSFlow_Meter_Total} > {Flow_Meter_Total}</span> , 
    high: <InputText style={combineCss.CSSFlow_Meter_Total}   placeholder='High' step="0.1" type='number' value={inputValueFlow_Meter_Total} onChange={handleInputChangeFlow_Meter_Total} inputMode="decimal" />, 
    low:  <InputText style={combineCss.CSSFlow_Meter_Total}   placeholder='Low' step="0.1" type='number' value={inputValue2Flow_Meter_Total} onChange={handleInputChange2Flow_Meter_Total} inputMode="decimal" />,
    update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainFlow_Meter_Total}
    checked={maintainFlow_Meter_Total}
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
            Name: <span style={combineCssAttribute.PCV}>IOT getway phone number </span>,

            Value: (
                <InputText
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
<h2>MEIKO</h2>

<div style={{width:'100%' ,  borderRadius:5 }}>
    <DataTable  size={'small'} selectionMode="single"   value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory"
                    sortOrder={1} scrollable  rowGroupHeaderTemplate={mainCategoryTemplate}   >
  {/* <Column field="modbus" header="Modbus" /> */}
  <Column field="timeUpdate" header="Time Update" />

  <Column field="modbus" header="Modbus" />

  <Column field="name" header="Name" />

  <Column field="value" header="Value" />
  <Column  field="high" header="High" />
  <Column field="low" header="Low" />
  <Column field="Maintain" header="Maintain" />
  <Column field="update" header="Update" />

</DataTable>
<div  style={{ width: "100%",  borderRadius: 5, marginTop:10 }}>
                <h4>Station - Configuration </h4>
                <DataTable value={Configuration} size={"small"} selectionMode="single" >
                    <Column field="Name" header="Name" />

                    <Column field="Value" header="Value" />

                    <Column field="Update" header="Update" />
                </DataTable>
            </div>
</div>
<br />
<br />
</div>
  )
}
