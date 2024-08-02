import React, { useEffect, useRef, useState } from 'react';
import { id_OTSUKA } from '../../data-table-device/ID-DEVICE/IdDevice';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { fetchData } from 'next-auth/client/_utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./LowHighOtsuka.css"
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import SetAttribute from './SetAttribute';
import { Calendar } from 'primereact/calendar';
import SetAttribute1 from '../../OTSUKA/title-OTK';
import { PLC_OTSUKA, TagName, nameValue } from '../namValue';
import SetAttributeTest from './SetAttributeTest';
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
export default function LowHighData() {

    const [EVC_STT01Value, setEVC_STT01Value] = useState<string | null>(null);
    const [EVC_STT02Value, setEVC_STT02Value] = useState<string | null>(null);
    const [PLC_STTValue, setPLC_STTValue] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);

    const toast = useRef<Toast>(null);
    const [upData, setUpData] = useState<any>([]);
    const [upData2, setUpData2] = useState<any>([]);
    const [upData3, setUpData3] = useState<any>([]);
    const [getWayPhoneOTSUKA,setGetWayPhoneOTSUKA] = useState<any>()

    const [timeEVC_01,setTimeEVC_01] = useState<any>()
    const [timeEVC_02,setTimeEVC_02] = useState<any>()
    const [timeEVC_03,setTimeEVC_03] = useState<any>()
    const [timeEVC_04,setTimeEVC_04] = useState<any>()



    const [inputValue3, setInputValue3] = useState<any>();
    const [ inputGetwayPhone, setInputGetwayPhone] = useState<any>()

    const Authorization = localStorage.getItem('user');
    const userData = Authorization ? JSON.parse(Authorization) : null;
     const userId = userData?.id?.id;
    
    const AuthUpdate = userId === UserTechnican.A  ||
    userId === UserTechnican.Q ||
     userId ===  UserTechnican.N ||
      userId === UserTechnican.T  ||
       userId === UserTechnican.TN ||
        userId === UserTechnican.DT ||
        userId === UserTechnican.KL ; 
    
    
    const AuthInput = userId !== UserTechnican.A  && 
    userId !== UserTechnican.Q &&
    userId !==  UserTechnican.N &&
     userId !== UserTechnican.T  &&
      userId !== UserTechnican.TN &&
        userId !== UserTechnican.DT &&
        userId !== UserTechnican.KL &&
        userId !== UserOperator.VHPM3 &&
        userId !== UserOperator.TTVHpm3 ; 

        const AuthUpdatePCV = userId !== UserTechnican.A  &&
        userId !== UserTechnican.Q &&
         userId !==  UserTechnican.N &&
          userId !== UserTechnican.T  &&
           userId !== UserTechnican.TN &&
            userId !== UserTechnican.DT &&
            userId !== UserTechnican.KL ;


            const AuthInputHighLow = userId !== UserTechnican.A  && 
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
                    entityId: id_OTSUKA,
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
                        EVC_01_Pressure: setEVC_01_Pressure,
                        EVC_02_Pressure: setEVC_02_Pressure,
                        PT1:setPT1,

                        GD1:setGD1,
                        GD2:setGD2,
                        GD3:setGD3,

                        EVC_01_Flow_at_Measurement_Condition: setEVC_01_Flow_at_Measurement_Condition,
                        EVC_01_Flow_at_Base_Condition: setEVC_01_Flow_at_Base_Condition,
                        EVC_01_Volume_at_Base_Condition: setEVC_01_Volume_at_Base_Condition,
                        EVC_01_Volume_at_Measurement_Condition: setEVC_01_Volume_at_Measurement_Condition,

                        EVC_02_Flow_at_Measurement_Condition: setEVC_02_Flow_at_Measurement_Condition,
                        EVC_02_Flow_at_Base_Condition: setEVC_02_Flow_at_Base_Condition,
                        EVC_02_Volume_at_Base_Condition: setEVC_02_Volume_at_Base_Condition,
                        EVC_02_Volume_at_Measurement_Condition: setEVC_02_Volume_at_Measurement_Condition,

                        time: setTimeUpdate,


                        EVC_01_Temperature:setEVC_01_Temperature,
                        EVC_02_Temperature:setEVC_02_Temperature,

                        EVC_01_Remain_Battery_Service_Life:setEVC_01_Remain_Battery_Service_Life,
                        EVC_02_Remain_Battery_Service_Life:setEVC_02_Remain_Battery_Service_Life,



                        EVC_01_Vm_of_Last_Day: setEVC_01_Vm_of_Last_Day ,
                        EVC_02_Vm_of_Last_Day:setEVC_02_Vm_of_Last_Day , 

                        EVC_01_Vb_of_Last_Day: setEVC_01_Vb_of_Last_Day ,
                        EVC_02_Vb_of_Last_Day:setEVC_02_Vb_of_Last_Day , 


                        EVC_01_Vm_of_Current_Day:setEVC_01_Vm_of_Current_Day,
                        EVC_02_Vm_of_Current_Day:setEVC_02_Vm_of_Current_Day,

                        EVC_01_Vb_of_Current_Day: setEVC_01_Vb_of_Current_Day ,
                        EVC_02_Vb_of_Current_Day: setEVC_02_Vb_of_Current_Day,

                     

                        DI_UPS_BATTERY:setDI_UPS_BATTERY,
                        DI_UPS_CHARGING:setDI_UPS_CHARGING,
                        DI_UPS_ALARM:setDI_UPS_ALARM,
                        UPS_Mode:setUPS_Mode,

                        DI_SELECT_SW:setDI_SELECT_SW,

                        Emergency_NC:setEmergency_NC,
                        Emergency_NO:setEmergency_NO,

                        DI_RESET:setDI_RESET,
                        DO_HR_01:setDO_HR_01,

                        
                        DI_MAP_1:setDI_MAP_1,
                        DI_ZSC_1: setDI_ZSC_1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DO_SV1:setDO_SV1,
                        DO_BC_01:setDO_BC_01,

                        EVC_01_Conn_STT: setEVC_01_Conn_STT,
                        EVC_02_Conn_STT: setEVC_02_Conn_STT,
                        PLC_Conn_STT: setPLC_Conn_STT,

                    };
                    const valueStateMap: ValueStateMap = {
                        EVC_01_Conn_STT: setEVC_STT01Value,
                        EVC_02_Conn_STT: setEVC_STT02Value,
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

              
                fetchData()
            };
        }
    }, [data]);


    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/values/attributes/SERVER_SCOPE`
            );

            const getwayIOT = res.data.find((item: any) => item.key === "IOT_Gateway_Phone");
            setGetWayPhoneOTSUKA(getwayIOT?.value || null);
//=====================================================================================
    
            const highEVC_01_Pressure = res.data.find((item: any) => item.key === "EVC_01_Pressure_High");
            setEVC_01_Pressure_High(highEVC_01_Pressure?.value || null);
            const lowEVC_01_Pressure = res.data.find((item: any) => item.key === "EVC_01_Pressure_Low");
            setEVC_01_Pressure_Low(lowEVC_01_Pressure?.value || null);

            const highEVC_02_PressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_High");
            setEVC_02_Pressure_High(highEVC_02_PressureItem?.value || null);
            const lowEVC_02_PressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_Low");
            setEVC_02_Pressure_Low(lowEVC_02_PressureItem?.value || null);

            const highPT1PressureItem = res.data.find((item: any) => item.key === "PT1_High");
            setPT1_High(highPT1PressureItem?.value || null);
            const lowPT1PressureItem = res.data.find((item: any) => item.key === "PT1_Low");
            setPT1_Low(lowPT1PressureItem?.value || null);

            const MaintainEVC_01_Pressure = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );
            setMaintainEVC_01_Pressure(MaintainEVC_01_Pressure?.value || false);

            const MaintainEVC_02_Pressure = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Maintain"
            );
            setMaintainEVC_02_Pressure(MaintainEVC_02_Pressure?.value || false);

            const MaintainPT1 = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );
            setMaintainPT1(MaintainPT1?.value || false);
//=====================================================================================

            const GD1_High = res.data.find((item: any) => item.key === "GD1_High");
            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find((item: any) => item.key === "GD1_Low");
            setGD1_Low(GD1_Low?.value || null);

            const GD2_High = res.data.find((item: any) => item.key === "GD2_High");
            setGD2_High(GD2_High?.value || null);
            const GD2_Low = res.data.find((item: any) => item.key === "GD2_Low");
            setGD2_Low(GD2_Low?.value || null);

            const GD3_High = res.data.find((item: any) => item.key === "GD3_High");
            setGD3_High(GD3_High?.value || null);
            const GD3_Low = res.data.find((item: any) => item.key === "GD3_Low");
            setGD3_Low(GD3_Low?.value || null);


            const MaintainGD1 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setMaintainGD1(MaintainGD1?.value || false);

            const MaintainGD2 = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD2(MaintainGD2?.value || false);

            const MaintainGD3 = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
            );
            setMaintainGD3(MaintainGD3?.value || false);            
//=====================================================================================

            const EVC_01_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_High");
            setEVC_01_Flow_at_Measurement_Condition_High(EVC_01_Flow_at_Measurement_Condition_High?.value || null);
            const EVC_01_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Low");
            setEVC_01_Flow_at_Measurement_Condition_Low(EVC_01_Flow_at_Measurement_Condition_Low?.value || null);

            const EVC_01_Flow_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High");
            setEVC_01_Flow_at_Base_Condition_High(EVC_01_Flow_at_Base_Condition_High?.value || null);
            const EVC_01_Flow_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low");
            setEVC_01_Flow_at_Base_Condition_Low(EVC_01_Flow_at_Base_Condition_Low?.value || null);

            const EVC_01_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_High");
            setEVC_01_Volume_at_Base_Condition_High(EVC_01_Volume_at_Base_Condition_High?.value || null);
            const EVC_01_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Low");
            setEVC_01_Volume_at_Base_Condition_Low(EVC_01_Volume_at_Base_Condition_Low?.value || null);

            const EVC_01_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_High");
            setEVC_01_Volume_at_Measurement_Condition_High(EVC_01_Volume_at_Measurement_Condition_High?.value || null);
            const EVC_01_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Low");
            setEVC_01_Volume_at_Measurement_Condition_Low(EVC_01_Volume_at_Measurement_Condition_Low?.value || null);

            const EVC_02_Flow_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
            setEVC_02_Flow_at_Measurement_Condition_High(EVC_02_Flow_at_Measurement_Condition_High?.value || null);
            const EVC_02_Flow_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
            setEVC_02_Flow_at_Measurement_Condition_Low(EVC_02_Flow_at_Measurement_Condition_Low?.value || null);

            const EVC_02_Flow_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High");
            setEVC_02_Flow_at_Base_Condition_High(EVC_02_Flow_at_Base_Condition_High?.value || null);
            const EVC_02_Flow_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low");
            setEVC_02_Flow_at_Base_Condition_Low(EVC_02_Flow_at_Base_Condition_Low?.value || null);

            const EVC_02_Volume_at_Base_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
            setEVC_02_Volume_at_Base_Condition_High(EVC_02_Volume_at_Base_Condition_High?.value || null);
            const EVC_02_Volume_at_Base_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
            setEVC_02_Volume_at_Base_Condition_Low(EVC_02_Volume_at_Base_Condition_Low?.value || null);

            const EVC_02_Volume_at_Measurement_Condition_High = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
            setEVC_02_Volume_at_Measurement_Condition_High(EVC_02_Volume_at_Measurement_Condition_High?.value || null);
            const EVC_02_Volume_at_Measurement_Condition_Low = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
            setEVC_02_Volume_at_Measurement_Condition_Low(EVC_02_Volume_at_Measurement_Condition_Low?.value || null);


            const MaintainSVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );
            setmaintainEVC_01_Flow_at_Base_Condition(MaintainSVF_1?.value || false);

            const MaintainGVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_01_Flow_at_Measurement_Condition(MaintainGVF_1?.value || false);

            const MaintainSVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setmaintainEVC_01_Volume_at_Base_Condition(MaintainSVA_1?.value || false);

            const MaintainGVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_01_Volume_at_Measurement_Condition(MaintainGVA_1?.value || false);

            const MaintainSVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Maintain" 
            );
            setmaintainEVC_02_Flow_at_Base_Condition(MaintainSVF_2?.value || false);

            const MaintainGVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_02_Flow_at_Measurement_Condition(MaintainGVF_2?.value || false);

            const MaintainSVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            setmaintainEVC_02_Volume_at_Base_Condition(MaintainSVA_2?.value || false);

            const MaintainGVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
            );
            setmaintainEVC_02_Volume_at_Measurement_Condition(MaintainGVA_2?.value || false);
//=====================================================================================

            const HightEVC_01_Temperature = res.data.find((item: any) => item.key === "EVC_01_Temperature_High");
            setEVC_01_Temperature_High(HightEVC_01_Temperature?.value || null);
            const EVC_01_Temperature_Low = res.data.find((item: any) => item.key === "EVC_01_Temperature_Low");
            setEVC_01_Temperature_Low(EVC_01_Temperature_Low?.value || null);

            const HightEVC_02_Temperature = res.data.find((item: any) => item.key === "EVC_02_Temperature_High");
            setEVC_02_Temperature_High(HightEVC_02_Temperature?.value || null);
            const EVC_02_Temperature_Low = res.data.find((item: any) => item.key === "EVC_02_Temperature_Low");
            setEVC_02_Temperature_Low(EVC_02_Temperature_Low?.value || null);


            const MaintainTemperature_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Maintain"
            );
            setmaintainEVC_01_Temperature(MaintainTemperature_01?.value || false);


            const MaintainTemperature_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );
            setmaintainEVC_02_Temperature(MaintainTemperature_02?.value || false);
//=====================================================================================


            const EVC_01_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_High");
            setEVC_01_Remain_Battery_Service_Life_High(EVC_01_Remain_Battery_Service_Life_High?.value || null);
            const EVC_01_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Low");
            setEVC_01_Remain_Battery_Service_Life_Low(EVC_01_Remain_Battery_Service_Life_Low?.value || null);

            const EVC_02_Remain_Battery_Service_Life_High = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_High");
            setEVC_02_Remain_Battery_Service_Life_High(EVC_02_Remain_Battery_Service_Life_High?.value || null);
            const EVC_02_Remain_Battery_Service_Life_Low = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Low");
            setEVC_02_Remain_Battery_Service_Life_Low(EVC_02_Remain_Battery_Service_Life_Low?.value || null);


            const MaintainReBattery_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Maintain"
            );
            setmaintainEVC_01_Remain_Battery_Service_Life(MaintainReBattery_01?.value || false);

            const MaintainReBattery_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Maintain"
            );
            setmaintainEVC_02_Remain_Battery_Service_Life(MaintainReBattery_02?.value || false);
//=====================================================================================

            const EVC_01_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setEVC_01_Vm_of_Last_Day_High(EVC_01_Vm_of_Last_Day_High?.value || null);
            const EVC_01_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setEVC_01_Vm_of_Last_Day_Low(EVC_01_Vm_of_Last_Day_Low?.value || null);

            const EVC_01_Vm_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_High");
            setEVC_01_Vm_of_Current_Day_High(EVC_01_Vm_of_Current_Day_High?.value || null);
            const EVC_01_Vm_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_Low");
            setEVC_01_Vm_of_Current_Day_Low(EVC_01_Vm_of_Current_Day_Low?.value || null);


            const EVC_01_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_High");
            setEVC_01_Vb_of_Last_Day_High(EVC_01_Vb_of_Last_Day_High?.value || null);
            const EVC_01_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_Low");
            setEVC_01_Vb_of_Last_Day_Low(EVC_01_Vb_of_Last_Day_Low?.value || null);


            const EVC_02_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_High");
            setEVC_02_Vb_of_Last_Day_High(EVC_02_Vb_of_Last_Day_High?.value || null);
            const EVC_02_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_Low");
            setEVC_02_Vb_of_Last_Day_Low(EVC_02_Vb_of_Last_Day_Low?.value || null);


            const MaintainVmLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );
            setmaintainEVC_01_Vm_of_Last_Day(MaintainVmLastDay_01?.value || false);


            const MaintainVmLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );
            setmaintainEVC_02_Vm_of_Last_Day(MaintainVmLastDay_02?.value || false);


            const MaintainVbLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Last_Day_Maintain"
            );
            setmaintainEVC_01_Vb_of_Last_Day(MaintainVbLastDay_01?.value || false);


            const MaintainVbLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vb_of_Last_Day_Maintain"
            );
            setmaintainEVC_02_Vb_of_Last_Day(MaintainVbLastDay_02?.value || false);
//=====================================================================================


const EVC_02_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
setEVC_02_Vm_of_Last_Day_High(EVC_02_Vm_of_Last_Day_High?.value || null);
const EVC_02_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
setEVC_02_Vm_of_Last_Day_Low(EVC_02_Vm_of_Last_Day_Low?.value || null);

const EVC_02_Vm_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_High");
setEVC_02_Vm_of_Current_Day_High(EVC_02_Vm_of_Current_Day_High?.value || null);
const EVC_02_Vm_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_Low");
setEVC_02_Vm_of_Current_Day_Low(EVC_02_Vm_of_Current_Day_Low?.value || null);

const EVC_01_Vb_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_High");
setEVC_01_Vb_of_Current_Day_High(EVC_01_Vb_of_Current_Day_High?.value || null);
const EVC_01_Vb_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_Low");
setEVC_01_Vb_of_Current_Day_Low(EVC_01_Vb_of_Current_Day_Low?.value || null);


const EVC_02_Vb_of_Current_Day_High = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_High");
setEVC_02_Vb_of_Current_Day_High(EVC_02_Vb_of_Current_Day_High?.value || null);
const EVC_02_Vb_of_Current_Day_Low = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_Low");
setEVC_02_Vb_of_Current_Day_Low(EVC_02_Vb_of_Current_Day_Low?.value || null);

const MaintainVmToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vm_of_Current_Day_Maintain"
);
setmaintainEVC_01_Vm_of_Current_Day(MaintainVmToDay_01?.value || false);


const MaintainVmToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vm_of_Current_Day_Maintain"
);
setmaintainEVC_02_Vm_of_Current_Day(MaintainVmToDay_02?.value || false);


const MaintainVbToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vb_of_Current_Day_Maintain"
);
setMaintainEVC_01_Vb_of_Current_Day(MaintainVbToDay_01?.value || false);


const MaintainVbToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vb_of_Current_Day_Maintain"
);
setmaintainEVC_02_Vb_of_Current_Day(MaintainVbToDay_02?.value || false);

//=====================================================================================

const DI_UPS_BATTERY_High = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
setDI_UPS_BATTERY_High(DI_UPS_BATTERY_High?.value || null);
const DI_UPS_BATTERY_Low = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
setDI_UPS_BATTERY_Low(DI_UPS_BATTERY_Low?.value || null);

const maintainDI_UPS_BATTERY = res.data.find(
    (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
);
setmaintainDI_UPS_BATTERY(maintainDI_UPS_BATTERY?.value || false);
//=====================================================================================


const DI_UPS_CHARGING_High = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_High");
setDI_UPS_CHARGING_High(DI_UPS_CHARGING_High?.value || null);
const DI_UPS_CHARGING_Low = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_Low");
setDI_UPS_CHARGING_Low(DI_UPS_CHARGING_Low?.value || null);
const maintainDI_UPS_CHARGING = res.data.find(
    (item: any) => item.key === "DI_UPS_CHARGING_Maintain"
);
setmaintainDI_UPS_CHARGING(maintainDI_UPS_CHARGING?.value || false);
//=====================================================================================

const DI_UPS_ALARM_High = res.data.find((item: any) => item.key === "DI_UPS_ALARM_High");
setDI_UPS_ALARM_High(DI_UPS_ALARM_High?.value || null);
const DI_UPS_ALARM_Low = res.data.find((item: any) => item.key === "DI_UPS_ALARM_Low");
setDI_UPS_ALARM_Low(DI_UPS_ALARM_Low?.value || null);

const maintainDI_UPS_ALARM = res.data.find(
    (item: any) => item.key === "DI_UPS_ALARM_Maintain"
);
setmaintainDI_UPS_ALARM(maintainDI_UPS_ALARM?.value || false);
//=====================================================================================

const UPS_Mode_High = res.data.find((item: any) => item.key === "UPS_Mode_High");
setUPS_Mode_High(UPS_Mode_High?.value || null);
const UPS_Mode_Low = res.data.find((item: any) => item.key === "UPS_Mode_Low");
setUPS_Mode_Low(UPS_Mode_Low?.value || null);

const maintainUPS_Mode = res.data.find(
    (item: any) => item.key === "UPS_Mode_Maintain"
);
setmaintainUPS_Mode(maintainUPS_Mode?.value || false);
//=====================================================================================
const DI_SELECT_SW_High = res.data.find((item: any) => item.key === "DI_SELECT_SW_High");
setDI_SELECT_SW_High(DI_SELECT_SW_High?.value || null);
const DI_SELECT_SW_Low = res.data.find((item: any) => item.key === "DI_SELECT_SW_Low");
setDI_SELECT_SW_Low(DI_SELECT_SW_Low?.value || null);

const MaintainSelect = res.data.find(
    (item: any) => item.key === "DI_SELECT_SW_Maintain"
);
setmaintainDI_SELECT_SW(MaintainSelect?.value || false);
//=====================================================================================

const Emergency_NC_High = res.data.find((item: any) => item.key === "Emergency_NC_High");
setEmergency_NC_High(Emergency_NC_High?.value || null);
const Emergency_NC_Low = res.data.find((item: any) => item.key === "Emergency_NC_Low");
setEmergency_NC_Low(Emergency_NC_Low?.value || null);

const maintainEmergency_NC = res.data.find(
    (item: any) => item.key === "Emergency_NC_Maintain"
);
setmaintainEmergency_NC(maintainEmergency_NC?.value || false);
//=====================================================================================

const Emergency_NO_High = res.data.find((item: any) => item.key === "Emergency_NO_High");
setEmergency_NO_High(Emergency_NO_High?.value || null);
const Emergency_NO_Low = res.data.find((item: any) => item.key === "Emergency_NO_Low");
setEmergency_NO_Low(Emergency_NO_Low?.value || null);

const maintainEmergency_NO = res.data.find(
    (item: any) => item.key === "Emergency_NO_Maintain"
);
setmaintainEmergency_NO(maintainEmergency_NO?.value || false);
//=====================================================================================


//=====================================================================================

const DI_RESET_High = res.data.find((item: any) => item.key === "DI_RESET_High");
setDI_RESET_High(DI_RESET_High?.value || null);
const DI_RESET_Low = res.data.find((item: any) => item.key === "DI_RESET_Low");
setDI_RESET_Low(DI_RESET_Low?.value || null);

const maintainDI_RESET = res.data.find(
    (item: any) => item.key === "DI_RESET_Maintain"
);
setmaintainDI_RESET(maintainDI_RESET?.value || false);
//=====================================================================================

//=====================================================================================

const HighDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_High");
setDO_HR_01_High(HighDIHorn?.value || null);
const LowDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_Low");
setDO_HR_01_Low(LowDIHorn?.value || null);

const MaintainDIHorn = res.data.find(
    (item: any) => item.key === "DO_HR_01_Maintain"
);
setmaintainDO_HR_01(MaintainDIHorn?.value || false);
//=====================================================================================

//=====================================================================================

const HighSOLENOID = res.data.find((item: any) => item.key === "DO_SV_01_High");
setDO_SV1_High(HighSOLENOID?.value || null);
const LowSOLENOID = res.data.find((item: any) => item.key === "DO_SV_01_Low");
setDO_SV1_Low(LowSOLENOID?.value || null);

const MaintainSOLENOID = res.data.find(
    (item: any) => item.key === "DO_SV_0_01_Maintain"
);
setmaintainDO_SV1(MaintainSOLENOID?.value || false);
//=====================================================================================



//=====================================================================================

const HighZSC = res.data.find((item: any) => item.key === "DI_ZSC_1_High");
setinputValueDI_ZSC_1(HighZSC?.value || null);
const LowZSC = res.data.find((item: any) => item.key === "DI_ZSC_1_Low");
setinputValue2DI_ZSC_1(LowZSC?.value || null);

const MaintainZSC_0 = res.data.find(
    (item: any) => item.key === "DI_ZSC_1_Maintain"
);
setmaintainDI_ZSC_1(MaintainZSC_0?.value || false);
//=====================================================================================

//=====================================================================================

const HighZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_High");
setDI_ZSO_1_High(HighZSO?.value || null);
const LowZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_Low");
setDI_ZSO_1_Low(LowZSO?.value || null);

const MaintainZSO = res.data.find(
    (item: any) => item.key === "DI_ZSO_1_Maintain"
);
setmaintainDI_ZSO_1(MaintainZSO?.value || false);
//=====================================================================================



//=====================================================================================

const DI_MAP_1_High = res.data.find((item: any) => item.key === "DI_MAP_1_High");
setDI_MAP_1_High(DI_MAP_1_High?.value || null);
const LowMap = res.data.find((item: any) => item.key === "DI_MAP_1_Low");
setDI_MAP_1_Low(LowMap?.value || null);

const MaintainMap = res.data.find(
    (item: any) => item.key === "DI_MAP_1_Maintain"
);
setmaintainDI_MAP_1(MaintainMap?.value || false);
//=====================================================================================

//=====================================================================================

const DO_BC_01_High = res.data.find((item: any) => item.key === "DO_BC_01_High");
setDO_BC_01_High(DO_BC_01_High?.value || null);
const DO_BC_01_Low = res.data.find((item: any) => item.key === "DO_BC_01_Low");
setDO_BC_01_Low(DO_BC_01_Low?.value || null);

const maintainDO_BC_01 = res.data.find(
    (item: any) => item.key === "DO_BC_01_Maintain"
);
setmaintainDO_BC_01(maintainDO_BC_01?.value || false);
//=====================================================================================

//=====================================================================================

const EVC_01_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_High");
setEVC_01_Conn_STT_High(EVC_01_Conn_STT_High?.value || null);
const EVC_01_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_01_Conn_STT_Low");
setEVC_01_Conn_STT_Low(EVC_01_Conn_STT_Low?.value || null);

const maintainEVC_01_Conn_STT = res.data.find(
    (item: any) => item.key === "EVC_01_Conn_STT_Maintain"
);
setmaintainEVC_01_Conn_STT(maintainEVC_01_Conn_STT?.value || false);
//=====================================================================================

//=====================================================================================

const EVC_02_Conn_STT_High = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_High");
setEVC_02_Conn_STT_High(EVC_02_Conn_STT_High?.value || null);
const EVC_02_Conn_STT_Low = res.data.find((item: any) => item.key === "EVC_02_Conn_STT_Low");
setEVC_02_Conn_STT_Low(EVC_02_Conn_STT_Low?.value || null);

const maintainEVC_02_Conn_STT = res.data.find(
    (item: any) => item.key === "EVC_02_Conn_STT_Maintain"
);
setmaintainEVC_02_Conn_STT(maintainEVC_02_Conn_STT?.value || false);
//=====================================================================================

//=====================================================================================

const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);

const maintainPLC_Conn_STT = res.data.find(
    (item: any) => item.key === "PLC_Conn_STT_Maintain"
);
setmaintainPLC_Conn_STT(maintainPLC_Conn_STT?.value || false);
//=====================================================================================

//=====================================================================================

} catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
// ========================== PT 1901 ============================================

const [EVC_01_Pressure, setEVC_01_Pressure] = useState<string | null>(null);
const [inputValueEVC_01_Pressure, setInputValueEVC_01_Pressure] = useState<any>();
const [inputValue2EVC_01_Pressure, setInputValue2EVC_01_Pressure] = useState<any>();
const [EVC_01_Pressure_High, setEVC_01_Pressure_High] = useState<number | null>(null);
const [EVC_01_Pressure_Low, setEVC_01_Pressure_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Pressure, setExceedThresholdEVC_01_Pressure] = useState(false); 
const [maintainEVC_01_Pressure, setMaintainEVC_01_Pressure] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_PressureValue = parseFloat(EVC_01_Pressure as any);
    const highValue = EVC_01_Pressure_High ?? NaN;
    const lowValue = EVC_01_Pressure_Low ?? NaN;

    if (!isNaN(EVC_01_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Pressure) {
        setExceedThresholdEVC_01_Pressure(EVC_01_PressureValue >= highValue || EVC_01_PressureValue <= lowValue);
    }
}, [EVC_01_Pressure, EVC_01_Pressure_High, EVC_01_Pressure_Low, maintainEVC_01_Pressure]);

const handleInputChangeEVC_01_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueEVC_01_Pressure(event.target.value);
};

const handleInputChange2EVC_01_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2EVC_01_Pressure(event.target.value);
};

const ChangeMaintainEVC_01_Pressure = async () => {
    try {
        const newValue = !maintainEVC_01_Pressure;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Pressure_Maintain: newValue }
        );
        setMaintainEVC_01_Pressure(newValue);
    } catch (error) {
        console.error(error);
    }
};





// ========================== PT 1901 ============================================

// ========================== PT 1902 ============================================

const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
const [inputValueEVC_02_Pressure, setInputValueEVC_02_Pressure] = useState<any>();
const [inputValue2EVC_02_Pressure, setInputValue2EVC_02_Pressure] = useState<any>();
const [EVC_02_Pressure_High, setEVC_02_Pressure_High] = useState<number | null>(null);
const [EVC_02_Pressure_Low, setEVC_02_Pressure_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Pressure, setExceedThresholdEVC_02_Pressure] = useState(false); 
const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_PressureValue = parseFloat(EVC_02_Pressure as any);
    const highValue = EVC_02_Pressure_High ?? NaN;
    const lowValue = EVC_02_Pressure_Low ?? NaN;

    if (!isNaN(EVC_02_PressureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Pressure) {
        setExceedThresholdEVC_02_Pressure(EVC_02_PressureValue >= highValue || EVC_02_PressureValue <= lowValue);
    }
}, [EVC_02_Pressure, EVC_02_Pressure_High, EVC_02_Pressure_Low, maintainEVC_02_Pressure]);

const handleInputChangeEVC_02_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueEVC_02_Pressure(event.target.value);
};

const handleInputChange2EVC_02_Pressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2EVC_02_Pressure(event.target.value);
};

const ChangeMaintainEVC_02_Pressure = async () => {
    try {
        const newValue = !maintainEVC_02_Pressure;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Pressure_Maintain: newValue }
        );
        setMaintainEVC_02_Pressure(newValue);
    } catch (error) {
        console.error(error);
    }
};

// ========================== PT 1902 ============================================
// ========================== PT 1903 ============================================

const [PT1, setPT1] = useState<string | null>(null);
const [inputValuePT1, setInputValuePT1] = useState<any>();
const [inputValue2PT1, setInputValue2PT1] = useState<any>();
const [PT1_High, setPT1_High] = useState<number | null>(null);
const [PT1_Low, setPT1_Low] = useState<number | null>(null);
const [exceedThresholdPT1, setExceedThresholdPT1] = useState(false); 
const [maintainPT1, setMaintainPT1] = useState<boolean>(false);

useEffect(() => {
    const PT1Value = parseFloat(PT1 as any);
    const highValue = PT1_High ?? NaN;
    const lowValue = PT1_Low ?? NaN;

    if (!isNaN(PT1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT1) {
        setExceedThresholdPT1(PT1Value >= highValue || PT1Value <= lowValue);
    }
}, [PT1, PT1_High, PT1_Low, maintainPT1]);

const handleInputChangePT1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValuePT1(event.target.value);
};

const handleInputChange2PT1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2PT1(event.target.value);
};

const ChangeMaintainPT1 = async () => {
    try {
        const newValue = !maintainPT1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { PT1_Maintain: newValue }
        );
        setMaintainPT1(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================

const [GD1, setGD1] = useState<string | null>(null);
const [inputValueGD1, setInputValueGD1] = useState<any>();
const [inputValue2GD1, setInputValue2GD1] = useState<any>();
const [GD1_High, setGD1_High] = useState<number | null>(null);
const [GD1_Low, setGD1_Low] = useState<number | null>(null);
const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); 
const [maintainGD1, setMaintainGD1] = useState<boolean>(false);

useEffect(() => {
    const GD1Value = parseFloat(GD1 as any);
    const highValue = GD1_High ?? NaN;
    const lowValue = GD1_Low ?? NaN;

    if (!isNaN(GD1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD1) {
        setExceedThresholdGD1(GD1Value >= highValue || GD1Value <= lowValue);
    }
}, [GD1, GD1_High, GD1_Low, maintainGD1]);

const handleInputChangeGD1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD1(event.target.value);
};

const handleInputChange2GD1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD1(event.target.value);
};

const ChangeMaintainGD1 = async () => {
    try {
        const newValue = !maintainGD1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { GD1_Maintain: newValue }
        );
        setMaintainGD1(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================

// ========================== PT 1903 ============================================

const [GD2, setGD2] = useState<string | null>(null);
const [inputValueGD2, setInputValueGD2] = useState<any>();
const [inputValue2GD2, setInputValue2GD2] = useState<any>();
const [GD2_High, setGD2_High] = useState<number | null>(null);
const [GD2_Low, setGD2_Low] = useState<number | null>(null);
const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); 
const [maintainGD2, setMaintainGD2] = useState<boolean>(false);

useEffect(() => {
    const GD2Value = parseFloat(GD2 as any);
    const highValue = GD2_High ?? NaN;
    const lowValue = GD2_Low ?? NaN;

    if (!isNaN(GD2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD2) {
        setExceedThresholdGD2(GD2Value >= highValue || GD2Value <= lowValue);
    }
}, [GD2, GD2_High, GD2_Low, maintainGD2]);

const handleInputChangeGD2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD2(event.target.value);
};

const handleInputChange2GD2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD2(event.target.value);
};

const ChangeMaintainGD2 = async () => {
    try {
        const newValue = !maintainGD2;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { GD2_Maintain: newValue }
        );
        setMaintainGD2(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================

// ========================== PT 1903 ============================================

const [GD3, setGD3] = useState<string | null>(null);
const [inputValueGD3, setInputValueGD3] = useState<any>();
const [inputValue2GD3, setInputValue2GD3] = useState<any>();
const [GD3_High, setGD3_High] = useState<number | null>(null);
const [GD3_Low, setGD3_Low] = useState<number | null>(null);
const [exceedThresholdGD3, setExceedThresholdGD3] = useState(false); 
const [maintainGD3, setMaintainGD3] = useState<boolean>(false);

useEffect(() => {
    const GD3Value = parseFloat(GD3 as any);
    const highValue = GD3_High ?? NaN;
    const lowValue = GD3_Low ?? NaN;

    if (!isNaN(GD3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD3) {
        setExceedThresholdGD3(GD3Value >= highValue || GD3Value <= lowValue);
    }
}, [GD3, GD3_High, GD3_Low, maintainGD3]);

const handleInputChangeGD3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD3(event.target.value);
};

const handleInputChange2GD3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD3(event.target.value);
};

const ChangeMaintainGD3 = async () => {
    try {
        const newValue = !maintainGD3;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { GD3_Maintain: newValue }
        );
        setMaintainGD3(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== GD3 ============================================

// ========================== PT 1903 ============================================

const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_01_Flow_at_Measurement_Condition, setinputValueEVC_01_Flow_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_01_Flow_at_Measurement_Condition, setinputValue2EVC_01_Flow_at_Measurement_Condition] = useState<any>();
const [EVC_01_Flow_at_Measurement_Condition_High, setEVC_01_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_01_Flow_at_Measurement_Condition_Low, setEVC_01_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Flow_at_Measurement_Condition, setexceedThresholdEVC_01_Flow_at_Measurement_Condition] = useState(false); 
const [maintainEVC_01_Flow_at_Measurement_Condition, setmaintainEVC_01_Flow_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition as any);
    const highValue = EVC_01_Flow_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_01_Flow_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_01_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Measurement_Condition) {
        setexceedThresholdEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_ConditionValue >= highValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition_Low, maintainEVC_01_Flow_at_Measurement_Condition]);

const handleInputChangeEVC_01_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Flow_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_01_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Flow_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_01_Flow_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_01_Flow_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_01_Flow_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



// ========================== PT 1903 ============================================

const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
const [inputValueEVC_01_Flow_at_Base_Condition, setinputValueEVC_01_Flow_at_Base_Condition] = useState<any>();
const [inputValue2EVC_01_Flow_at_Base_Condition, setinputValue2EVC_01_Flow_at_Base_Condition] = useState<any>();
const [EVC_01_Flow_at_Base_Condition_High, setEVC_01_Flow_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_01_Flow_at_Base_Condition_Low, setEVC_01_Flow_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Flow_at_Base_Condition, setexceedThresholdEVC_01_Flow_at_Base_Condition] = useState(false); 
const [maintainEVC_01_Flow_at_Base_Condition, setmaintainEVC_01_Flow_at_Base_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition as any);
    const highValue = EVC_01_Flow_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_01_Flow_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_01_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Flow_at_Base_Condition) {
        setexceedThresholdEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_ConditionValue >= highValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition_Low, maintainEVC_01_Flow_at_Base_Condition]);

const handleInputChangeEVC_01_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Flow_at_Base_Condition(event.target.value);
};

const handleInputChange2EVC_01_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Flow_at_Base_Condition(event.target.value);
};

const ChangemaintainEVC_01_Flow_at_Base_Condition = async () => {
    try {
        const newValue = !maintainEVC_01_Flow_at_Base_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
        );
        setmaintainEVC_01_Flow_at_Base_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================


const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
const [inputValueEVC_01_Volume_at_Base_Condition, setinputValueEVC_01_Volume_at_Base_Condition] = useState<any>();
const [inputValue2EVC_01_Volume_at_Base_Condition, setinputValue2EVC_01_Volume_at_Base_Condition] = useState<any>();
const [EVC_01_Volume_at_Base_Condition_High, setEVC_01_Volume_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_01_Volume_at_Base_Condition_Low, setEVC_01_Volume_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Volume_at_Base_Condition, setexceedThresholdEVC_01_Volume_at_Base_Condition] = useState(false); 
const [maintainEVC_01_Volume_at_Base_Condition, setmaintainEVC_01_Volume_at_Base_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition as any);
    const highValue = EVC_01_Volume_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_01_Volume_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_01_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Base_Condition) {
        setexceedThresholdEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_ConditionValue >= highValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition_Low, maintainEVC_01_Volume_at_Base_Condition]);

const handleInputChangeEVC_01_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Volume_at_Base_Condition(event.target.value);
};

const handleInputChange2EVC_01_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Volume_at_Base_Condition(event.target.value);
};

const ChangemaintainEVC_01_Volume_at_Base_Condition = async () => {
    try {
        const newValue = !maintainEVC_01_Volume_at_Base_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Volume_at_Base_Condition_Maintain: newValue }
        );
        setmaintainEVC_01_Volume_at_Base_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};




const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_01_Volume_at_Measurement_Condition, setinputValueEVC_01_Volume_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_01_Volume_at_Measurement_Condition, setinputValue2EVC_01_Volume_at_Measurement_Condition] = useState<any>();
const [EVC_01_Volume_at_Measurement_Condition_High, setEVC_01_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_01_Volume_at_Measurement_Condition_Low, setEVC_01_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Volume_at_Measurement_Condition, setexceedThresholdEVC_01_Volume_at_Measurement_Condition] = useState(false); 
const [maintainEVC_01_Volume_at_Measurement_Condition, setmaintainEVC_01_Volume_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition as any);
    const highValue = EVC_01_Volume_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_01_Volume_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_01_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Volume_at_Measurement_Condition) {
        setexceedThresholdEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_ConditionValue >= highValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition_Low, maintainEVC_01_Volume_at_Measurement_Condition]);

const handleInputChangeEVC_01_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Volume_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_01_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Volume_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_01_Volume_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_01_Volume_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Volume_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_01_Volume_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Flow_at_Measurement_Condition, setinputValueEVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Flow_at_Measurement_Condition, setinputValue2EVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [EVC_02_Flow_at_Measurement_Condition_High, setEVC_02_Flow_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Flow_at_Measurement_Condition_Low, setEVC_02_Flow_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Flow_at_Measurement_Condition, setexceedThresholdEVC_02_Flow_at_Measurement_Condition] = useState(false); 
const [maintainEVC_02_Flow_at_Measurement_Condition, setmaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition as any);
    const highValue = EVC_02_Flow_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_02_Flow_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Flow_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Measurement_Condition) {
        setexceedThresholdEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_ConditionValue >= highValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition_Low, maintainEVC_02_Flow_at_Measurement_Condition]);

const handleInputChangeEVC_02_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Flow_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_02_Flow_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Flow_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_02_Flow_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Flow_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Flow_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== EVC_02_Flow_at_Base_Condition- FIQ-1902  ============================================


const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Flow_at_Base_Condition, setinputValueEVC_02_Flow_at_Base_Condition] = useState<any>();
const [inputValue2EVC_02_Flow_at_Base_Condition, setinputValue2EVC_02_Flow_at_Base_Condition] = useState<any>();
const [EVC_02_Flow_at_Base_Condition_High, setEVC_02_Flow_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_02_Flow_at_Base_Condition_Low, setEVC_02_Flow_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Flow_at_Base_Condition, setexceedThresholdEVC_02_Flow_at_Base_Condition] = useState(false); 
const [maintainEVC_02_Flow_at_Base_Condition, setmaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition as any);
    const highValue = EVC_02_Flow_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_02_Flow_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Flow_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Flow_at_Base_Condition) {
        setexceedThresholdEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_ConditionValue >= highValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition_Low, maintainEVC_02_Flow_at_Base_Condition]);

const handleInputChangeEVC_02_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Flow_at_Base_Condition(event.target.value);
};

const handleInputChange2EVC_02_Flow_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Flow_at_Base_Condition(event.target.value);
};

const ChangemaintainEVC_02_Flow_at_Base_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Flow_at_Base_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Flow_at_Base_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};

const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Volume_at_Base_Condition, setinputValueEVC_02_Volume_at_Base_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Base_Condition, setinputValue2EVC_02_Volume_at_Base_Condition] = useState<any>();
const [EVC_02_Volume_at_Base_Condition_High, setEVC_02_Volume_at_Base_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Base_Condition_Low, setEVC_02_Volume_at_Base_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Base_Condition, setexceedThresholdEVC_02_Volume_at_Base_Condition] = useState(false); 
const [maintainEVC_02_Volume_at_Base_Condition, setmaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition as any);
    const highValue = EVC_02_Volume_at_Base_Condition_High ?? NaN;
    const lowValue = EVC_02_Volume_at_Base_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Volume_at_Base_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Base_Condition) {
        setexceedThresholdEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_ConditionValue >= highValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue);
    }
}, [EVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition_Low, maintainEVC_02_Volume_at_Base_Condition]);

const handleInputChangeEVC_02_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Volume_at_Base_Condition(event.target.value);
};

const handleInputChange2EVC_02_Volume_at_Base_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Volume_at_Base_Condition(event.target.value);
};

const ChangemaintainEVC_02_Volume_at_Base_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Volume_at_Base_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Volume_at_Base_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [inputValueEVC_02_Volume_at_Measurement_Condition, setinputValueEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [inputValue2EVC_02_Volume_at_Measurement_Condition, setinputValue2EVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [EVC_02_Volume_at_Measurement_Condition_High, setEVC_02_Volume_at_Measurement_Condition_High] = useState<number | null>(null);
const [EVC_02_Volume_at_Measurement_Condition_Low, setEVC_02_Volume_at_Measurement_Condition_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Volume_at_Measurement_Condition, setexceedThresholdEVC_02_Volume_at_Measurement_Condition] = useState(false); 
const [maintainEVC_02_Volume_at_Measurement_Condition, setmaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition as any);
    const highValue = EVC_02_Volume_at_Measurement_Condition_High ?? NaN;
    const lowValue = EVC_02_Volume_at_Measurement_Condition_Low ?? NaN;

    if (!isNaN(EVC_02_Volume_at_Measurement_ConditionValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Volume_at_Measurement_Condition) {
        setexceedThresholdEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_ConditionValue >= highValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue);
    }
}, [EVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition_Low, maintainEVC_02_Volume_at_Measurement_Condition]);

const handleInputChangeEVC_02_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Volume_at_Measurement_Condition(event.target.value);
};

const handleInputChange2EVC_02_Volume_at_Measurement_Condition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Volume_at_Measurement_Condition(event.target.value);
};

const ChangemaintainEVC_02_Volume_at_Measurement_Condition = async () => {
    try {
        const newValue = !maintainEVC_02_Volume_at_Measurement_Condition;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
        );
        setmaintainEVC_02_Volume_at_Measurement_Condition(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);
const [inputValueEVC_01_Temperature, setinputValueEVC_01_Temperature] = useState<any>();
const [inputValue2EVC_01_Temperature, setinputValue2EVC_01_Temperature] = useState<any>();
const [EVC_01_Temperature_High, setEVC_01_Temperature_High] = useState<number | null>(null);
const [EVC_01_Temperature_Low, setEVC_01_Temperature_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Temperature, setexceedThresholdEVC_01_Temperature] = useState(false); 
const [maintainEVC_01_Temperature, setmaintainEVC_01_Temperature] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature as any);
    const highValue = EVC_01_Temperature_High ?? NaN;
    const lowValue = EVC_01_Temperature_Low ?? NaN;

    if (!isNaN(EVC_01_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Temperature) {
        setexceedThresholdEVC_01_Temperature(EVC_01_TemperatureValue >= highValue || EVC_01_TemperatureValue <= lowValue);
    }
}, [EVC_01_Temperature, EVC_01_Temperature_High, EVC_01_Temperature_Low, maintainEVC_01_Temperature]);

const handleInputChangeEVC_01_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Temperature(event.target.value);
};

const handleInputChange2EVC_01_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Temperature(event.target.value);
};

const ChangemaintainEVC_01_Temperature = async () => {
    try {
        const newValue = !maintainEVC_01_Temperature;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Temperature_Maintain: newValue }
        );
        setmaintainEVC_01_Temperature(newValue);
    } catch (error) {
        console.error(error);
    }
};

//=============================================================================================================
const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);
const [inputValueEVC_02_Temperature, setinputValueEVC_02_Temperature] = useState<any>();
const [inputValue2EVC_02_Temperature, setinputValue2EVC_02_Temperature] = useState<any>();
const [EVC_02_Temperature_High, setEVC_02_Temperature_High] = useState<number | null>(null);
const [EVC_02_Temperature_Low, setEVC_02_Temperature_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Temperature, setexceedThresholdEVC_02_Temperature] = useState(false); 
const [maintainEVC_02_Temperature, setmaintainEVC_02_Temperature] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature as any);
    const highValue = EVC_02_Temperature_High ?? NaN;
    const lowValue = EVC_02_Temperature_Low ?? NaN;

    if (!isNaN(EVC_02_TemperatureValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Temperature) {
        setexceedThresholdEVC_02_Temperature(EVC_02_TemperatureValue >= highValue || EVC_02_TemperatureValue <= lowValue);
    }
}, [EVC_02_Temperature, EVC_02_Temperature_High, EVC_02_Temperature_Low, maintainEVC_02_Temperature]);

const handleInputChangeEVC_02_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Temperature(event.target.value);
};

const handleInputChange2EVC_02_Temperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Temperature(event.target.value);
};

const ChangemaintainEVC_02_Temperature = async () => {
    try {
        const newValue = !maintainEVC_02_Temperature;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Temperature_Maintain: newValue }
        );
        setmaintainEVC_02_Temperature(newValue);
    } catch (error) {
        console.error(error);
    }
};

//=============================================================================================================

const [EVC_01_Remain_Battery_Service_Life, setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);
const [inputValueEVC_01_Remain_Battery_Service_Life, setinputValueEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_01_Remain_Battery_Service_Life, setinputValue2EVC_01_Remain_Battery_Service_Life] = useState<any>();
const [EVC_01_Remain_Battery_Service_Life_High, setEVC_01_Remain_Battery_Service_Life_High] = useState<number | null>(null);
const [EVC_01_Remain_Battery_Service_Life_Low, setEVC_01_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Remain_Battery_Service_Life, setexceedThresholdEVC_01_Remain_Battery_Service_Life] = useState(false); 
const [maintainEVC_01_Remain_Battery_Service_Life, setmaintainEVC_01_Remain_Battery_Service_Life] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life as any);
    const highValue = EVC_01_Remain_Battery_Service_Life_High ?? NaN;
    const lowValue = EVC_01_Remain_Battery_Service_Life_Low ?? NaN;

    if (!isNaN(EVC_01_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Remain_Battery_Service_Life) {
        setexceedThresholdEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_LifeValue >= highValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue);
    }
}, [EVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low, maintainEVC_01_Remain_Battery_Service_Life]);

const handleInputChangeEVC_01_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Remain_Battery_Service_Life(event.target.value);
};

const handleInputChange2EVC_01_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Remain_Battery_Service_Life(event.target.value);
};

const ChangemaintainEVC_01_Remain_Battery_Service_Life = async () => {
    try {
        const newValue = !maintainEVC_01_Remain_Battery_Service_Life;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Remain_Battery_Service_Life_Maintain: newValue }
        );
        setmaintainEVC_01_Remain_Battery_Service_Life(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Remain_Battery_Service_Life, setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);
const [inputValueEVC_02_Remain_Battery_Service_Life, setinputValueEVC_02_Remain_Battery_Service_Life] = useState<any>();
const [inputValue2EVC_02_Remain_Battery_Service_Life, setinputValue2EVC_02_Remain_Battery_Service_Life] = useState<any>();
const [EVC_02_Remain_Battery_Service_Life_High, setEVC_02_Remain_Battery_Service_Life_High] = useState<number | null>(null);
const [EVC_02_Remain_Battery_Service_Life_Low, setEVC_02_Remain_Battery_Service_Life_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Remain_Battery_Service_Life, setexceedThresholdEVC_02_Remain_Battery_Service_Life] = useState(false); 
const [maintainEVC_02_Remain_Battery_Service_Life, setmaintainEVC_02_Remain_Battery_Service_Life] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life as any);
    const highValue = EVC_02_Remain_Battery_Service_Life_High ?? NaN;
    const lowValue = EVC_02_Remain_Battery_Service_Life_Low ?? NaN;

    if (!isNaN(EVC_02_Remain_Battery_Service_LifeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Remain_Battery_Service_Life) {
        setexceedThresholdEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_LifeValue >= highValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue);
    }
}, [EVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life_Low, maintainEVC_02_Remain_Battery_Service_Life]);

const handleInputChangeEVC_02_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Remain_Battery_Service_Life(event.target.value);
};

const handleInputChange2EVC_02_Remain_Battery_Service_Life = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Remain_Battery_Service_Life(event.target.value);
};

const ChangemaintainEVC_02_Remain_Battery_Service_Life = async () => {
    try {
        const newValue = !maintainEVC_02_Remain_Battery_Service_Life;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
        );
        setmaintainEVC_02_Remain_Battery_Service_Life(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
const [inputValueEVC_02_Vm_of_Last_Day, setinputValueEVC_02_Vm_of_Last_Day] = useState<any>();
const [inputValue2EVC_02_Vm_of_Last_Day, setinputValue2EVC_02_Vm_of_Last_Day] = useState<any>();
const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vm_of_Last_Day, setexceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); 
const [maintainEVC_02_Vm_of_Last_Day, setmaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day as any);
    const highValue = EVC_02_Vm_of_Last_Day_High ?? NaN;
    const lowValue = EVC_02_Vm_of_Last_Day_Low ?? NaN;

    if (!isNaN(EVC_02_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Last_Day) {
        setexceedThresholdEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_DayValue >= highValue || EVC_02_Vm_of_Last_DayValue <= lowValue);
    }
}, [EVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low, maintainEVC_02_Vm_of_Last_Day]);

const handleInputChangeEVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Vm_of_Last_Day(event.target.value);
};

const handleInputChange2EVC_02_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Vm_of_Last_Day(event.target.value);
};

const ChangemaintainEVC_02_Vm_of_Last_Day = async () => {
    try {
        const newValue = !maintainEVC_02_Vm_of_Last_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Vm_of_Last_Day_Maintain: newValue }
        );
        setmaintainEVC_01_Vm_of_Last_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
const [inputValueEVC_01_Vb_of_Last_Day, setinputValueEVC_01_Vb_of_Last_Day] = useState<any>();
const [inputValue2EVC_01_Vb_of_Last_Day, setinputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
const [EVC_01_Vb_of_Last_Day_High, setEVC_01_Vb_of_Last_Day_High] = useState<number | null>(null);
const [EVC_01_Vb_of_Last_Day_Low, setEVC_01_Vb_of_Last_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Vb_of_Last_Day, setexceedThresholdEVC_01_Vb_of_Last_Day] = useState(false); 
const [maintainEVC_01_Vb_of_Last_Day, setmaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day as any);
    const highValue = EVC_01_Vb_of_Last_Day_High ?? NaN;
    const lowValue = EVC_01_Vb_of_Last_Day_Low ?? NaN;

    if (!isNaN(EVC_01_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Last_Day) {
        setexceedThresholdEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_DayValue >= highValue || EVC_01_Vb_of_Last_DayValue <= lowValue);
    }
}, [EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day_Low, maintainEVC_01_Vb_of_Last_Day]);

const handleInputChangeEVC_01_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Vb_of_Last_Day(event.target.value);
};

const handleInputChange2EVC_01_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Vb_of_Last_Day(event.target.value);
};

const ChangemaintainEVC_01_Vb_of_Last_Day = async () => {
    try {
        const newValue = !maintainEVC_01_Vb_of_Last_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Vb_of_Last_Day_Maintain: newValue }
        );
        setmaintainEVC_01_Vm_of_Last_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};






const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);
const [inputValueEVC_01_Vm_of_Last_Day, setinputValueEVC_01_Vm_of_Last_Day] = useState<any>();
const [inputValue2EVC_01_Vm_of_Last_Day, setinputValue2EVC_01_Vm_of_Last_Day] = useState<any>();
const [EVC_01_Vm_of_Last_Day_High, setEVC_01_Vm_of_Last_Day_High] = useState<number | null>(null);
const [EVC_01_Vm_of_Last_Day_Low, setEVC_01_Vm_of_Last_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Vm_of_Last_Day, setexceedThresholdEVC_01_Vm_of_Last_Day] = useState(false); 
const [maintainEVC_01_Vm_of_Last_Day, setmaintainEVC_01_Vm_of_Last_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day as any);
    const highValue = EVC_01_Vm_of_Last_Day_High ?? NaN;
    const lowValue = EVC_01_Vm_of_Last_Day_Low ?? NaN;

    if (!isNaN(EVC_01_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Last_Day) {
        setexceedThresholdEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_DayValue >= highValue || EVC_01_Vm_of_Last_DayValue <= lowValue);
    }
}, [EVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day_Low, maintainEVC_01_Vm_of_Last_Day]);

const handleInputChangeEVC_01_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Vm_of_Last_Day(event.target.value);
};

const handleInputChange2EVC_01_Vm_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Vm_of_Last_Day(event.target.value);
};

const ChangemaintainEVC_01_Vm_of_Last_Day = async () => {
    try {
        const newValue = !maintainEVC_01_Vm_of_Last_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Vm_of_Last_Day_Maintain: newValue }
        );
        setmaintainEVC_01_Vm_of_Last_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
const [inputValueEVC_02_Vb_of_Last_Day, setinputValueEVC_02_Vb_of_Last_Day] = useState<any>();
const [inputValue2EVC_02_Vb_of_Last_Day, setinputValue2EVC_02_Vb_of_Last_Day] = useState<any>();
const [EVC_02_Vb_of_Last_Day_High, setEVC_02_Vb_of_Last_Day_High] = useState<number | null>(null);
const [EVC_02_Vb_of_Last_Day_Low, setEVC_02_Vb_of_Last_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vb_of_Last_Day, setexceedThresholdEVC_02_Vb_of_Last_Day] = useState(false); 
const [maintainEVC_02_Vb_of_Last_Day, setmaintainEVC_02_Vb_of_Last_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day as any);
    const highValue = EVC_02_Vb_of_Last_Day_High ?? NaN;
    const lowValue = EVC_02_Vb_of_Last_Day_Low ?? NaN;

    if (!isNaN(EVC_02_Vb_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Last_Day) {
        setexceedThresholdEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_DayValue >= highValue || EVC_02_Vb_of_Last_DayValue <= lowValue);
    }
}, [EVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day_Low, maintainEVC_02_Vb_of_Last_Day]);

const handleInputChangeEVC_02_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Vb_of_Last_Day(event.target.value);
};

const handleInputChange2EVC_02_Vb_of_Last_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Vb_of_Last_Day(event.target.value);
};

const ChangemaintainEVC_02_Vb_of_Last_Day = async () => {
    try {
        const newValue = !maintainEVC_02_Vb_of_Last_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Vb_of_Last_Day_Maintain: newValue }
        );
        setmaintainEVC_02_Vb_of_Last_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
const [inputValueEVC_01_Vm_of_Current_Day, setinputValueEVC_01_Vm_of_Current_Day] = useState<any>();
const [inputValue2EVC_01_Vm_of_Current_Day, setinputValue2EVC_01_Vm_of_Current_Day] = useState<any>();
const [EVC_01_Vm_of_Current_Day_High, setEVC_01_Vm_of_Current_Day_High] = useState<number | null>(null);
const [EVC_01_Vm_of_Current_Day_Low, setEVC_01_Vm_of_Current_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Vm_of_Current_Day, setexceedThresholdEVC_01_Vm_of_Current_Day] = useState(false); 
const [maintainEVC_01_Vm_of_Current_Day, setmaintainEVC_01_Vm_of_Current_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Vm_of_Current_DayValue = parseFloat(EVC_01_Vm_of_Current_Day as any);
    const highValue = EVC_01_Vm_of_Current_Day_High ?? NaN;
    const lowValue = EVC_01_Vm_of_Current_Day_Low ?? NaN;

    if (!isNaN(EVC_01_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vm_of_Current_Day) {
        setexceedThresholdEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_DayValue >= highValue || EVC_01_Vm_of_Current_DayValue <= lowValue);
    }
}, [EVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day_Low, maintainEVC_01_Vm_of_Current_Day]);

const handleInputChangeEVC_01_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Vm_of_Current_Day(event.target.value);
};

const handleInputChange2EVC_01_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Vm_of_Current_Day(event.target.value);
};

const ChangemaintainEVC_01_Vm_of_Current_Day = async () => {
    try {
        const newValue = !maintainEVC_01_Vm_of_Current_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Vm_of_Current_Day_Maintain: newValue }
        );
        setmaintainEVC_01_Vm_of_Current_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
const [inputValueEVC_02_Vm_of_Current_Day, setinputValueEVC_02_Vm_of_Current_Day] = useState<any>();
const [inputValue2EVC_02_Vm_of_Current_Day, setinputValue2EVC_02_Vm_of_Current_Day] = useState<any>();
const [EVC_02_Vm_of_Current_Day_High, setEVC_02_Vm_of_Current_Day_High] = useState<number | null>(null);
const [EVC_02_Vm_of_Current_Day_Low, setEVC_02_Vm_of_Current_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vm_of_Current_Day, setexceedThresholdEVC_02_Vm_of_Current_Day] = useState(false); 
const [maintainEVC_02_Vm_of_Current_Day, setmaintainEVC_02_Vm_of_Current_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day as any);
    const highValue = EVC_02_Vm_of_Current_Day_High ?? NaN;
    const lowValue = EVC_02_Vm_of_Current_Day_Low ?? NaN;

    if (!isNaN(EVC_02_Vm_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Current_Day) {
        setexceedThresholdEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_DayValue >= highValue || EVC_02_Vm_of_Current_DayValue <= lowValue);
    }
}, [EVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day_Low, maintainEVC_02_Vm_of_Current_Day]);

const handleInputChangeEVC_02_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Vm_of_Current_Day(event.target.value);
};

const handleInputChange2EVC_02_Vm_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Vm_of_Current_Day(event.target.value);
};

const ChangemaintainEVC_02_Vm_of_Current_Day = async () => {
    try {
        const newValue = !maintainEVC_02_Vm_of_Current_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Vm_of_Current_Day_Maintain: newValue }
        );
        setmaintainEVC_02_Vm_of_Current_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};

const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
const [inputValueEVC_01_Vb_of_Current_Day, setinputValueEVC_01_Vb_of_Current_Day] = useState<any>();
const [inputValue2EVC_01_Vb_of_Current_Day, setinputValue2EVC_01_Vb_of_Current_Day] = useState<any>();
const [EVC_01_Vb_of_Current_Day_High, setEVC_01_Vb_of_Current_Day_High] = useState<number | null>(null);
const [EVC_01_Vb_of_Current_Day_Low, setEVC_01_Vb_of_Current_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Vb_of_Current_Day, setexceedThresholdEVC_01_Vb_of_Current_Day] = useState(false); 
const [maintainEVC_01_Vb_of_Current_Day, setMaintainEVC_01_Vb_of_Current_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Vb_of_Current_DayValue = parseFloat(EVC_01_Vb_of_Current_Day as any);
    const highValue = EVC_01_Vb_of_Current_Day_High ?? NaN;
    const lowValue = EVC_01_Vb_of_Current_Day_Low ?? NaN;

    if (!isNaN(EVC_01_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Vb_of_Current_Day) {
        setexceedThresholdEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_DayValue >= highValue || EVC_01_Vb_of_Current_DayValue <= lowValue);
    }
}, [EVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day_Low, maintainEVC_01_Vb_of_Current_Day]);

const handleInputChangeEVC_01_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Vb_of_Current_Day(event.target.value);
};

const handleInputChange2EVC_01_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Vb_of_Current_Day(event.target.value);
};

const ChangemaintainEVC_01_Vb_of_Current_Day = async () => {
    try {
        const newValue = !maintainEVC_01_Vb_of_Current_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Vb_of_Current_Day_Maintain: newValue }
        );
        setMaintainEVC_01_Vb_of_Current_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
const [inputValueEVC_02_Vb_of_Current_Day, setinputValueEVC_02_Vb_of_Current_Day] = useState<any>();
const [inputValue2EVC_02_Vb_of_Current_Day, setinputValue2EVC_02_Vb_of_Current_Day] = useState<any>();
const [EVC_02_Vb_of_Current_Day_High, setEVC_02_Vb_of_Current_Day_High] = useState<number | null>(null);
const [EVC_02_Vb_of_Current_Day_Low, setEVC_02_Vb_of_Current_Day_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Vb_of_Current_Day, setexceedThresholdEVC_02_Vb_of_Current_Day] = useState(false); 
const [maintainEVC_02_Vb_of_Current_Day, setmaintainEVC_02_Vb_of_Current_Day] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day as any);
    const highValue = EVC_02_Vb_of_Current_Day_High ?? NaN;
    const lowValue = EVC_02_Vb_of_Current_Day_Low ?? NaN;

    if (!isNaN(EVC_02_Vb_of_Current_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vb_of_Current_Day) {
        setexceedThresholdEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_DayValue >= highValue || EVC_02_Vb_of_Current_DayValue <= lowValue);
    }
}, [EVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day_Low, maintainEVC_02_Vb_of_Current_Day]);

const handleInputChangeEVC_02_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Vb_of_Current_Day(event.target.value);
};

const handleInputChange2EVC_02_Vb_of_Current_Day = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Vb_of_Current_Day(event.target.value);
};

const ChangemaintainEVC_02_Vb_of_Current_Day = async () => {
    try {
        const newValue = !maintainEVC_02_Vb_of_Current_Day;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Vb_of_Current_Day_Maintain: newValue }
        );
        setmaintainEVC_02_Vb_of_Current_Day(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [DI_UPS_BATTERY, setDI_UPS_BATTERY] = useState<string | null>(null);
const [inputValueDI_UPS_BATTERY, setinputValueDI_UPS_BATTERY] = useState<any>();
const [inputValue2DI_UPS_BATTERY, setinputValue2DI_UPS_BATTERY] = useState<any>();
const [DI_UPS_BATTERY_High, setDI_UPS_BATTERY_High] = useState<number | null>(null);
const [DI_UPS_BATTERY_Low, setDI_UPS_BATTERY_Low] = useState<number | null>(null);
const [exceedThresholdDI_UPS_BATTERY, setexceedThresholdDI_UPS_BATTERY] = useState(false); 
const [maintainDI_UPS_BATTERY, setmaintainDI_UPS_BATTERY] = useState<boolean>(false);

useEffect(() => {
    const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY as any);
    const highValue = DI_UPS_BATTERY_High ?? NaN;
    const lowValue = DI_UPS_BATTERY_Low ?? NaN;

    if (!isNaN(DI_UPS_BATTERYValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_BATTERY) {
        setexceedThresholdDI_UPS_BATTERY(DI_UPS_BATTERYValue >= highValue || DI_UPS_BATTERYValue <= lowValue);
    }
}, [DI_UPS_BATTERY, DI_UPS_BATTERY_High, DI_UPS_BATTERY_Low, maintainDI_UPS_BATTERY]);

const handleInputChangeDI_UPS_BATTERY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_UPS_BATTERY(event.target.value);
};

const handleInputChange2DI_UPS_BATTERY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_UPS_BATTERY(event.target.value);
};

const ChangemaintainDI_UPS_BATTERY = async () => {
    try {
        const newValue = !maintainDI_UPS_BATTERY;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_UPS_BATTERY_Maintain: newValue }
        );
        setmaintainDI_UPS_BATTERY(newValue);
    } catch (error) {
        console.error(error);
    }
};

const [DI_UPS_CHARGING, setDI_UPS_CHARGING] = useState<string | null>(null);
const [inputValueDI_UPS_CHARGING, setinputValueDI_UPS_CHARGING] = useState<any>();
const [inputValue2DI_UPS_CHARGING, setinputValue2DI_UPS_CHARGING] = useState<any>();
const [DI_UPS_CHARGING_High, setDI_UPS_CHARGING_High] = useState<number | null>(null);
const [DI_UPS_CHARGING_Low, setDI_UPS_CHARGING_Low] = useState<number | null>(null);
const [exceedThresholdDI_UPS_CHARGING, setexceedThresholdDI_UPS_CHARGING] = useState(false); 
const [maintainDI_UPS_CHARGING, setmaintainDI_UPS_CHARGING] = useState<boolean>(false);

useEffect(() => {
    const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING as any);
    const highValue = DI_UPS_CHARGING_High ?? NaN;
    const lowValue = DI_UPS_CHARGING_Low ?? NaN;

    if (!isNaN(DI_UPS_CHARGINGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_CHARGING) {
        setexceedThresholdDI_UPS_CHARGING(DI_UPS_CHARGINGValue >= highValue || DI_UPS_CHARGINGValue <= lowValue);
    }
}, [DI_UPS_CHARGING, DI_UPS_CHARGING_High, DI_UPS_CHARGING_Low, maintainDI_UPS_CHARGING]);

const handleInputChangeDI_UPS_CHARGING = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_UPS_CHARGING(event.target.value);
};

const handleInputChange2DI_UPS_CHARGING = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_UPS_CHARGING(event.target.value);
};

const ChangemaintainDI_UPS_CHARGING = async () => {
    try {
        const newValue = !maintainDI_UPS_CHARGING;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_UPS_CHARGING_Maintain: newValue }
        );
        setmaintainDI_UPS_CHARGING(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [DI_UPS_ALARM, setDI_UPS_ALARM] = useState<string | null>(null);
const [inputValueDI_UPS_ALARM, setinputValueDI_UPS_ALARM] = useState<any>();
const [inputValue2DI_UPS_ALARM, setinputValue2DI_UPS_ALARM] = useState<any>();
const [DI_UPS_ALARM_High, setDI_UPS_ALARM_High] = useState<number | null>(null);
const [DI_UPS_ALARM_Low, setDI_UPS_ALARM_Low] = useState<number | null>(null);
const [exceedThresholdDI_UPS_ALARM, setexceedThresholdDI_UPS_ALARM] = useState(false); 
const [maintainDI_UPS_ALARM, setmaintainDI_UPS_ALARM] = useState<boolean>(false);

useEffect(() => {
    const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM as any);
    const highValue = DI_UPS_ALARM_High ?? NaN;
    const lowValue = DI_UPS_ALARM_Low ?? NaN;

    if (!isNaN(DI_UPS_ALARMValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_UPS_ALARM) {
        setexceedThresholdDI_UPS_ALARM(DI_UPS_ALARMValue >= highValue || DI_UPS_ALARMValue <= lowValue);
    }
}, [DI_UPS_ALARM, DI_UPS_ALARM_High, DI_UPS_ALARM_Low, maintainDI_UPS_ALARM]);

const handleInputChangeDI_UPS_ALARM = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_UPS_ALARM(event.target.value);
};

const handleInputChange2DI_UPS_ALARM = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_UPS_ALARM(event.target.value);
};

const ChangemaintainDI_UPS_ALARM = async () => {
    try {
        const newValue = !maintainDI_UPS_ALARM;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_UPS_ALARM_Maintain: newValue }
        );
        setmaintainDI_UPS_ALARM(newValue);
    } catch (error) {
        console.error(error);
    }
};





const [UPS_Mode, setUPS_Mode] = useState<string | null>(null);
const [inputValueUPS_Mode, setinputValueUPS_Mode] = useState<any>();
const [inputValue2UPS_Mode, setinputValue2UPS_Mode] = useState<any>();
const [UPS_Mode_High, setUPS_Mode_High] = useState<number | null>(null);
const [UPS_Mode_Low, setUPS_Mode_Low] = useState<number | null>(null);
const [exceedThresholdUPS_Mode, setexceedThresholdUPS_Mode] = useState(false); 
const [maintainUPS_Mode, setmaintainUPS_Mode] = useState<boolean>(false);

useEffect(() => {
    const UPS_ModeValue = parseFloat(UPS_Mode as any);
    const highValue = UPS_Mode_High ?? NaN;
    const lowValue = UPS_Mode_Low ?? NaN;

    if (!isNaN(UPS_ModeValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainUPS_Mode) {
        setexceedThresholdUPS_Mode(UPS_ModeValue >= highValue || UPS_ModeValue <= lowValue);
    }
}, [UPS_Mode, UPS_Mode_High, UPS_Mode_Low, maintainUPS_Mode]);

const handleInputChangeUPS_Mode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueUPS_Mode(event.target.value);
};

const handleInputChange2UPS_Mode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2UPS_Mode(event.target.value);
};

const ChangemaintainUPS_Mode = async () => {
    try {
        const newValue = !maintainUPS_Mode;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { UPS_Mode_Maintain: newValue }
        );
        setmaintainUPS_Mode(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [DI_SELECT_SW, setDI_SELECT_SW] = useState<string | null>(null);
const [inputValueDI_SELECT_SW, setinputValueDI_SELECT_SW] = useState<any>();
const [inputValue2DI_SELECT_SW, setinputValue2DI_SELECT_SW] = useState<any>();
const [DI_SELECT_SW_High, setDI_SELECT_SW_High] = useState<number | null>(null);
const [DI_SELECT_SW_Low, setDI_SELECT_SW_Low] = useState<number | null>(null);
const [exceedThresholdDI_SELECT_SW, setexceedThresholdDI_SELECT_SW] = useState(false); 
const [maintainDI_SELECT_SW, setmaintainDI_SELECT_SW] = useState<boolean>(false);

useEffect(() => {
    const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW as any);
    const highValue = DI_SELECT_SW_High ?? NaN;
    const lowValue = DI_SELECT_SW_Low ?? NaN;

    if (!isNaN(DI_SELECT_SWValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_SELECT_SW) {
        setexceedThresholdDI_SELECT_SW(DI_SELECT_SWValue >= highValue || DI_SELECT_SWValue <= lowValue);
    }
}, [DI_SELECT_SW, DI_SELECT_SW_High, DI_SELECT_SW_Low, maintainDI_SELECT_SW]);

const handleInputChangeDI_SELECT_SW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_SELECT_SW(event.target.value);
};

const handleInputChange2DI_SELECT_SW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_SELECT_SW(event.target.value);
};

const ChangemaintainDI_SELECT_SW = async () => {
    try {
        const newValue = !maintainDI_SELECT_SW;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_SELECT_SW_Maintain: newValue }
        );
        setmaintainDI_SELECT_SW(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [Emergency_NC, setEmergency_NC] = useState<string | null>(null);
const [inputValueEmergency_NC, setinputValueEmergency_NC] = useState<any>();
const [inputValue2Emergency_NC, setinputValue2Emergency_NC] = useState<any>();
const [Emergency_NC_High, setEmergency_NC_High] = useState<number | null>(null);
const [Emergency_NC_Low, setEmergency_NC_Low] = useState<number | null>(null);
const [exceedThresholdEmergency_NC, setexceedThresholdEmergency_NC] = useState(false); 
const [maintainEmergency_NC, setmaintainEmergency_NC] = useState<boolean>(false);

useEffect(() => {
    const Emergency_NCValue = parseFloat(Emergency_NC as any);
    const highValue = Emergency_NC_High ?? NaN;
    const lowValue = Emergency_NC_Low ?? NaN;

    if (!isNaN(Emergency_NCValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEmergency_NC) {
        setexceedThresholdEmergency_NC(Emergency_NCValue >= highValue || Emergency_NCValue <= lowValue);
    }
}, [Emergency_NC, Emergency_NC_High, Emergency_NC_Low, maintainEmergency_NC]);

const handleInputChangeEmergency_NC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEmergency_NC(event.target.value);
};

const handleInputChange2Emergency_NC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2Emergency_NC(event.target.value);
};

const ChangemaintainEmergency_NC = async () => {
    try {
        const newValue = !maintainEmergency_NC;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { Emergency_NC_Maintain: newValue }
        );
        setmaintainEmergency_NC(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [Emergency_NO, setEmergency_NO] = useState<string | null>(null);
const [inputValueEmergency_NO, setinputValueEmergency_NO] = useState<any>();
const [inputValue2Emergency_NO, setinputValue2Emergency_NO] = useState<any>();
const [Emergency_NO_High, setEmergency_NO_High] = useState<number | null>(null);
const [Emergency_NO_Low, setEmergency_NO_Low] = useState<number | null>(null);
const [exceedThresholdEmergency_NO, setexceedThresholdEmergency_NO] = useState(false); 
const [maintainEmergency_NO, setmaintainEmergency_NO] = useState<boolean>(false);

useEffect(() => {
    const Emergency_NOValue = parseFloat(Emergency_NO as any);
    const highValue = Emergency_NO_High ?? NaN;
    const lowValue = Emergency_NO_Low ?? NaN;

    if (!isNaN(Emergency_NOValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEmergency_NO) {
        setexceedThresholdEmergency_NO(Emergency_NOValue >= highValue || Emergency_NOValue <= lowValue);
    }
}, [Emergency_NO, Emergency_NO_High, Emergency_NO_Low, maintainEmergency_NO]);

const handleInputChangeEmergency_NO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEmergency_NO(event.target.value);
};

const handleInputChange2Emergency_NO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2Emergency_NO(event.target.value);
};

const ChangemaintainEmergency_NO = async () => {
    try {
        const newValue = !maintainEmergency_NO;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { Emergency_NO_Maintain: newValue }
        );
        setmaintainEmergency_NO(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [DI_RESET, setDI_RESET] = useState<string | null>(null);
const [inputValueDI_RESET, setinputValueDI_RESET] = useState<any>();
const [inputValue2DI_RESET, setinputValue2DI_RESET] = useState<any>();
const [DI_RESET_High, setDI_RESET_High] = useState<number | null>(null);
const [DI_RESET_Low, setDI_RESET_Low] = useState<number | null>(null);
const [exceedThresholdDI_RESET, setexceedThresholdDI_RESET] = useState(false); 
const [maintainDI_RESET, setmaintainDI_RESET] = useState<boolean>(false);

useEffect(() => {
    const DI_RESETValue = parseFloat(DI_RESET as any);
    const highValue = DI_RESET_High ?? NaN;
    const lowValue = DI_RESET_Low ?? NaN;

    if (!isNaN(DI_RESETValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_RESET) {
        setexceedThresholdDI_RESET(DI_RESETValue >= highValue || DI_RESETValue <= lowValue);
    }
}, [DI_RESET, DI_RESET_High, DI_RESET_Low, maintainDI_RESET]);

const handleInputChangeDI_RESET = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_RESET(event.target.value);
};

const handleInputChange2DI_RESET = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_RESET(event.target.value);
};

const ChangemaintainDI_RESET = async () => {
    try {
        const newValue = !maintainDI_RESET;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_RESET_Maintain: newValue }
        );
        setmaintainDI_RESET(newValue);
    } catch (error) {
        console.error(error);
    }
};




const [DO_HR_01, setDO_HR_01] = useState<string | null>(null);
const [inputValueDO_HR_01, setinputValueDO_HR_01] = useState<any>();
const [inputValue2DO_HR_01, setinputValue2DO_HR_01] = useState<any>();
const [DO_HR_01_High, setDO_HR_01_High] = useState<number | null>(null);
const [DO_HR_01_Low, setDO_HR_01_Low] = useState<number | null>(null);
const [exceedThresholdDO_HR_01, setexceedThresholdDO_HR_01] = useState(false); 
const [maintainDO_HR_01, setmaintainDO_HR_01] = useState<boolean>(false);

useEffect(() => {
    const DO_HR_01Value = parseFloat(DO_HR_01 as any);
    const highValue = DO_HR_01_High ?? NaN;
    const lowValue = DO_HR_01_Low ?? NaN;

    if (!isNaN(DO_HR_01Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_HR_01) {
        setexceedThresholdDO_HR_01(DO_HR_01Value >= highValue || DO_HR_01Value <= lowValue);
    }
}, [DO_HR_01, DO_HR_01_High, DO_HR_01_Low, maintainDO_HR_01]);

const handleInputChangeDO_HR_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDO_HR_01(event.target.value);
};

const handleInputChange2DO_HR_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DO_HR_01(event.target.value);
};

const ChangemaintainDO_HR_01 = async () => {
    try {
        const newValue = !maintainDO_HR_01;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DO_HR_01_Maintain: newValue }
        );
        setmaintainDO_HR_01(newValue);
    } catch (error) {
        console.error(error);
    }
};




const [DI_MAP_1, setDI_MAP_1] = useState<string | null>(null);
const [inputValueDI_MAP_1, setinputValueDI_MAP_1] = useState<any>();
const [inputValue2DI_MAP_1, setinputValue2DI_MAP_1] = useState<any>();
const [DI_MAP_1_High, setDI_MAP_1_High] = useState<number | null>(null);
const [DI_MAP_1_Low, setDI_MAP_1_Low] = useState<number | null>(null);
const [exceedThresholdDI_MAP_1, setexceedThresholdDI_MAP_1] = useState(false); 
const [maintainDI_MAP_1, setmaintainDI_MAP_1] = useState<boolean>(false);

useEffect(() => {
    const DI_MAP_1Value = parseFloat(DI_MAP_1 as any);
    const highValue = DI_MAP_1_High ?? NaN;
    const lowValue = DI_MAP_1_Low ?? NaN;

    if (!isNaN(DI_MAP_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_MAP_1) {
        setexceedThresholdDI_MAP_1(DI_MAP_1Value >= highValue || DI_MAP_1Value <= lowValue);
    }
}, [DI_MAP_1, DI_MAP_1_High, DI_MAP_1_Low, maintainDI_MAP_1]);

const handleInputChangeDI_MAP_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_MAP_1(event.target.value);
};

const handleInputChange2DI_MAP_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_MAP_1(event.target.value);
};

const ChangemaintainDI_MAP_1 = async () => {
    try {
        const newValue = !maintainDI_MAP_1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_MAP_1_Maintain: newValue }
        );
        setmaintainDI_MAP_1(newValue);
    } catch (error) {
        console.error(error);
    }
};




const [DO_SV1, setDO_SV1] = useState<string | null>(null);
const [inputValueDO_SV1, setinputValueDO_SV1] = useState<any>();
const [inputValue2DO_SV1, setinputValue2DO_SV1] = useState<any>();
const [DO_SV1_High, setDO_SV1_High] = useState<number | null>(null);
const [DO_SV1_Low, setDO_SV1_Low] = useState<number | null>(null);
const [exceedThresholdDO_SV1, setexceedThresholdDO_SV1] = useState(false); 
const [maintainDO_SV1, setmaintainDO_SV1] = useState<boolean>(false);

useEffect(() => {
    const DO_SV1Value = parseFloat(DO_SV1 as any);
    const highValue = DO_SV1_High ?? NaN;
    const lowValue = DO_SV1_Low ?? NaN;

    if (!isNaN(DO_SV1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_SV1) {
        setexceedThresholdDO_SV1(DO_SV1Value >= highValue || DO_SV1Value <= lowValue);
    }
}, [DO_SV1, DO_SV1_High, DO_SV1_Low, maintainDO_SV1]);

const handleInputChangeDO_SV1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDO_SV1(event.target.value);
};

const handleInputChange2DO_SV1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DO_SV1(event.target.value);
};

const ChangemaintainDO_SV1 = async () => {
    try {
        const newValue = !maintainDO_SV1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DO_SV1_Maintain: newValue }
        );
        setmaintainDO_SV1(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [DI_ZSC_1, setDI_ZSC_1] = useState<string | null>(null);
const [inputValueDI_ZSC_1, setinputValueDI_ZSC_1] = useState<any>();
const [inputValue2DI_ZSC_1, setinputValue2DI_ZSC_1] = useState<any>();
const [DI_ZSC_1_High, setDI_ZSC_1_High] = useState<number | null>(null);
const [DI_ZSC_1_Low, setDI_ZSC_1_Low] = useState<number | null>(null);
const [exceedThresholdDI_ZSC_1, setexceedThresholdDI_ZSC_1] = useState(false); 
const [maintainDI_ZSC_1, setmaintainDI_ZSC_1] = useState<boolean>(false);

useEffect(() => {
    const DI_ZSC_1Value = parseFloat(DI_ZSC_1 as any);
    const highValue = DI_ZSC_1_High ?? NaN;
    const lowValue = DI_ZSC_1_Low ?? NaN;

    if (!isNaN(DI_ZSC_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_ZSC_1) {
        setexceedThresholdDI_ZSC_1(DI_ZSC_1Value >= highValue || DI_ZSC_1Value <= lowValue);
    }
}, [DI_ZSC_1, DI_ZSC_1_High, DI_ZSC_1_Low, maintainDI_ZSC_1]);

const handleInputChangeDI_ZSC_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_ZSC_1(event.target.value);
};

const handleInputChange2DI_ZSC_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_ZSC_1(event.target.value);
};

const ChangemaintainDI_ZSC_1 = async () => {
    try {
        const newValue = !maintainDI_ZSC_1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_ZSC_1_Maintain: newValue }
        );
        setmaintainDI_ZSC_1(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [DI_ZSO_1, setDI_ZSO_1] = useState<string | null>(null);
const [inputValueDI_ZSO_1, setinputValueDI_ZSO_1] = useState<any>();
const [inputValue2DI_ZSO_1, setinputValue2DI_ZSO_1] = useState<any>();
const [DI_ZSO_1_High, setDI_ZSO_1_High] = useState<number | null>(null);
const [DI_ZSO_1_Low, setDI_ZSO_1_Low] = useState<number | null>(null);
const [exceedThresholdDI_ZSO_1, setexceedThresholdDI_ZSO_1] = useState(false); 
const [maintainDI_ZSO_1, setmaintainDI_ZSO_1] = useState<boolean>(false);

useEffect(() => {
    const DI_ZSO_1Value = parseFloat(DI_ZSO_1 as any);
    const highValue = DI_ZSO_1_High ?? NaN;
    const lowValue = DI_ZSO_1_Low ?? NaN;

    if (!isNaN(DI_ZSO_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDI_ZSO_1) {
        setexceedThresholdDI_ZSO_1(DI_ZSO_1Value >= highValue || DI_ZSO_1Value <= lowValue);
    }
}, [DI_ZSO_1, DI_ZSO_1_High, DI_ZSO_1_Low, maintainDI_ZSO_1]);

const handleInputChangeDI_ZSO_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDI_ZSO_1(event.target.value);
};

const handleInputChange2DI_ZSO_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DI_ZSO_1(event.target.value);
};

const ChangemaintainDI_ZSO_1 = async () => {
    try {
        const newValue = !maintainDI_ZSO_1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DI_ZSO_1_Maintain: newValue }
        );
        setmaintainDI_ZSO_1(newValue);
    } catch (error) {
        console.error(error);
    }
};


const [DO_BC_01, setDO_BC_01] = useState<string | null>(null);
const [inputValueDO_BC_01, setinputValueDO_BC_01] = useState<any>();
const [inputValue2DO_BC_01, setinputValue2DO_BC_01] = useState<any>();
const [DO_BC_01_High, setDO_BC_01_High] = useState<number | null>(null);
const [DO_BC_01_Low, setDO_BC_01_Low] = useState<number | null>(null);
const [exceedThresholdDO_BC_01, setexceedThresholdDO_BC_01] = useState(false); 
const [maintainDO_BC_01, setmaintainDO_BC_01] = useState<boolean>(false);

useEffect(() => {
    const DO_BC_01Value = parseFloat(DO_BC_01 as any);
    const highValue = DO_BC_01_High ?? NaN;
    const lowValue = DO_BC_01_Low ?? NaN;

    if (!isNaN(DO_BC_01Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainDO_BC_01) {
        setexceedThresholdDO_BC_01(DO_BC_01Value >= highValue || DO_BC_01Value <= lowValue);
    }
}, [DO_BC_01, DO_BC_01_High, DO_BC_01_Low, maintainDO_BC_01]);

const handleInputChangeDO_BC_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueDO_BC_01(event.target.value);
};

const handleInputChange2DO_BC_01 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2DO_BC_01(event.target.value);
};

const ChangemaintainDO_BC_01 = async () => {
    try {
        const newValue = !maintainDO_BC_01;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { DO_BC_01_Maintain: newValue }
        );
        setmaintainDO_BC_01(newValue);
    } catch (error) {
        console.error(error);
    }
};

const [EVC_01_Conn_STT, setEVC_01_Conn_STT] = useState<string | null>(null);
const [inputValueEVC_01_Conn_STT, setinputValueEVC_01_Conn_STT] = useState<any>();
const [inputValue2EVC_01_Conn_STT, setinputValue2EVC_01_Conn_STT] = useState<any>();
const [EVC_01_Conn_STT_High, setEVC_01_Conn_STT_High] = useState<number | null>(null);
const [EVC_01_Conn_STT_Low, setEVC_01_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdEVC_01_Conn_STT, setexceedThresholdEVC_01_Conn_STT] = useState(false); 
const [maintainEVC_01_Conn_STT, setmaintainEVC_01_Conn_STT] = useState<boolean>(false);

useEffect(() => {
    const EVC_01_Conn_STTValue = parseFloat(EVC_01_Conn_STT as any);
    const highValue = EVC_01_Conn_STT_High ?? NaN;
    const lowValue = EVC_01_Conn_STT_Low ?? NaN;

    if (!isNaN(EVC_01_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_01_Conn_STT) {
        setexceedThresholdEVC_01_Conn_STT(EVC_01_Conn_STTValue >= highValue || EVC_01_Conn_STTValue <= lowValue);
    }
}, [EVC_01_Conn_STT, EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low, maintainEVC_01_Conn_STT]);

const handleInputChangeEVC_01_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_01_Conn_STT(event.target.value);
};

const handleInputChange2EVC_01_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_01_Conn_STT(event.target.value);
};

const ChangemaintainEVC_01_Conn_STT = async () => {
    try {
        const newValue = !maintainEVC_01_Conn_STT;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Conn_STT_Maintain: newValue }
        );
        setmaintainEVC_01_Conn_STT(newValue);
    } catch (error) {
        console.error(error);
    }
};



const [EVC_02_Conn_STT, setEVC_02_Conn_STT] = useState<string | null>(null);
const [inputValueEVC_02_Conn_STT, setinputValueEVC_02_Conn_STT] = useState<any>();
const [inputValue2EVC_02_Conn_STT, setinputValue2EVC_02_Conn_STT] = useState<any>();
const [EVC_02_Conn_STT_High, setEVC_02_Conn_STT_High] = useState<number | null>(null);
const [EVC_02_Conn_STT_Low, setEVC_02_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdEVC_02_Conn_STT, setexceedThresholdEVC_02_Conn_STT] = useState(false); 
const [maintainEVC_02_Conn_STT, setmaintainEVC_02_Conn_STT] = useState<boolean>(false);

useEffect(() => {
    const EVC_02_Conn_STTValue = parseFloat(EVC_02_Conn_STT as any);
    const highValue = EVC_02_Conn_STT_High ?? NaN;
    const lowValue = EVC_02_Conn_STT_Low ?? NaN;

    if (!isNaN(EVC_02_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Conn_STT) {
        setexceedThresholdEVC_02_Conn_STT(EVC_02_Conn_STTValue >= highValue || EVC_02_Conn_STTValue <= lowValue);
    }
}, [EVC_02_Conn_STT, EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low, maintainEVC_02_Conn_STT]);

const handleInputChangeEVC_02_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValueEVC_02_Conn_STT(event.target.value);
};

const handleInputChange2EVC_02_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2EVC_02_Conn_STT(event.target.value);
};

const ChangemaintainEVC_02_Conn_STT = async () => {
    try {
        const newValue = !maintainEVC_02_Conn_STT;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Conn_STT_Maintain: newValue }
        );
        setmaintainEVC_02_Conn_STT(newValue);
    } catch (error) {
        console.error(error);
    }
};




const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
const [inputValuePLC_Conn_STT, setinputValuePLC_Conn_STT] = useState<any>();
const [inputValue2PLC_Conn_STT, setinputValue2PLC_Conn_STT] = useState<any>();
const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdPLC_Conn_STT, setexceedThresholdPLC_Conn_STT] = useState(false); 
const [maintainPLC_Conn_STT, setmaintainPLC_Conn_STT] = useState<boolean>(false);

useEffect(() => {
    const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
    const highValue = PLC_Conn_STT_High ?? NaN;
    const lowValue = PLC_Conn_STT_Low ?? NaN;

    if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
        setexceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
    }
}, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);

const handleInputChangePLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValuePLC_Conn_STT(event.target.value);
};

const handleInputChange2PLC_Conn_STT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue2PLC_Conn_STT(event.target.value);
};

const ChangemaintainPLC_Conn_STT = async () => {
    try {
        const newValue = !maintainPLC_Conn_STT;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { PLC_Conn_STT_Maintain: newValue }
        );
        setmaintainPLC_Conn_STT(newValue);
    } catch (error) {
        console.error(error);
    }
};



//===========================================================================================


//===========================================================================================
const handleInputChangeGetWayPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue : any = event.target.value;
    setGetWayPhoneOTSUKA(newValue);
};


const handleButtonClickGetwayPhone = async () => {
    try {
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { IOT_Gateway_Phone: inputGetwayPhone,}
        );
     

        toast.current?.show({
            severity: "info",
            detail: "Successfully changed IOT gateway phone number  ",
            life: 3000,
        });
    } catch (error) {
        console.log("error: ", error);
        toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Message Content",
            life: 3000,
        });
    }
};

const confirmUpChangeGatewayPhone = () => {
    confirmDialog({
        message: "Are you sure update IOT gateway phone?",
        header: "Confirmation",
        icon: "pi pi-info-circle",
        accept: () => handleButtonClickGetwayPhone(),
    });
};



const handleMainTainAll = async (checked:any) => {
    try {
        const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
        const newmaintainEVC_01_Temperature = checked;
        const newmaintainEVC_01_Volume_at_Base_Condition = checked;
        const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_01_Pressure = checked;
        const newMaintainEVC_01_Flow_at_Base_Condition = checked;
        const newmaintainEVC_01_Vm_of_Current_Day = checked;
        const newMaintainEVC_01_Vb_of_Current_Day = checked;
        const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
        const newmaintainEVC_01_Vb_of_Last_Day = checked;
        const newmaintainEVC_01_Vm_of_Last_Day = checked;

        const newmaintainEVC_02_Remain_Battery_Service_Life = checked;
        const newMaintainEVC_02_Temperature = checked;
        const newmaintainEVC_02_Volume_at_Base_Condition = checked;
        const newmaintainEVC_02_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_02_Pressure = checked;
        const newmaintainEVC_02_Flow_at_Base_Condition = checked;
        const newmaintainEVC_02_Vm_of_Current_Day = checked;
        const newmaintainEVC_02_Vb_of_Current_Day = checked;
        const newmaintainEVC_02_Flow_at_Measurement_Condition = checked;
        const newmaintainEVC_02_Vb_of_Last_Day = checked;
        const newmaintainEVC_02_Vm_of_Last_Day = checked;

        const newMaintainGD1 = checked;
        const newMaintainGD2 = checked;
        const newMaintainGD3 = checked;

        const newMaintainPT1 = checked;
        const newMaintainDI_DI_ZSO_1 = checked;
        const newMaintainDI_DI_ZSC_1 = checked;
        const newmaintainDI_MAP_1 = checked;
        const newmaintainDI_UPS_CHARGING = checked;
        const newmaintainDI_UPS_ALARM = checked;
        const newmaintainDI_SELECT_SW = checked;
        const newmaintainDI_RESET = checked;
        const newmaintainDI_UPS_BATTERY = checked;
        const newmaintainDO_SV1 = checked;

        const newmaintainEmergency_NO = checked;
        const newmaintainEmergency_NC = checked;
        const newmaintainUPS_Mode = checked;
        const newmaintainDO_HR_01 = checked;
        const newmaintainDO_BC_01 = checked;
        const newMaintainDO_SV_0_01 = checked;
        const newmaintainPLC_Conn_STT = checked;
        const newmaintainEVC_01_Conn_STT = checked;
        const newmaintainEVC_02_Conn_STT = checked;


        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
               EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
               EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
               EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
               EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
               EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
               EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
               EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
               EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
               EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
               EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,


               EVC_02_Remain_Battery_Service_Life_Maintain: newmaintainEVC_02_Remain_Battery_Service_Life,
               EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
               EVC_02_Volume_at_Base_Condition_Maintain: newmaintainEVC_02_Volume_at_Base_Condition,
               EVC_02_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_02_Volume_at_Measurement_Condition,
               EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
               EVC_02_Flow_at_Base_Condition_Maintain: newmaintainEVC_02_Flow_at_Base_Condition,
               EVC_02_Vm_of_Current_Day_Maintain: newmaintainEVC_02_Vm_of_Current_Day,
               EVC_02_Vb_of_Current_Day_Maintain: newmaintainEVC_02_Vb_of_Current_Day,
               EVC_02_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_02_Flow_at_Measurement_Condition,
               EVC_02_Vb_of_Last_Day_Maintain: newmaintainEVC_02_Vb_of_Last_Day,
               EVC_02_Vm_of_Last_Day_Maintain: newmaintainEVC_02_Vm_of_Last_Day,

               GD1_Maintain: newMaintainGD1,
               GD2_Maintain: newMaintainGD2,
               GD3_Maintain: newMaintainGD3,
               PT1_Maintain: newMaintainPT1,
            DI_ZSO_1_Maintain: newMaintainDI_DI_ZSO_1,
               DI_ZSC_1_Maintain: newMaintainDI_DI_ZSC_1,
               DI_MAP_1_Maintain: newmaintainDI_MAP_1,
               DI_UPS_CHARGING_Maintain: newmaintainDI_UPS_CHARGING,
               DI_UPS_ALARM_Maintain: newmaintainDI_UPS_ALARM,
               DI_SELECT_SW_Maintain: newmaintainDI_SELECT_SW,
               DI_RESET_Maintain: newmaintainDI_RESET,
               DI_UPS_BATTERY_Maintain: newmaintainDI_UPS_BATTERY,
               DO_SV1_Maintain: newmaintainDO_SV1,

               Emergency_NO_Maintain: newmaintainEmergency_NO,
               Emergency_NC_Maintain: newmaintainEmergency_NC,
               UPS_Mode_Maintain: newmaintainUPS_Mode,
               DO_HR_01_Maintain: newmaintainDO_HR_01,
               DO_BC_01_Maintain: newmaintainDO_BC_01,
               DO_SV_0_01_Maintain: newMaintainDO_SV_0_01,
               PLC_Conn_STT_Maintain: newmaintainPLC_Conn_STT,
               EVC_01_Conn_STT_Maintain: newmaintainEVC_01_Conn_STT,
               EVC_02_Conn_STT_Maintain: newmaintainEVC_02_Conn_STT,


             }
        );
        setmaintainEVC_01_Remain_Battery_Service_Life(newMaintainEVC_01_Remain_Battery_Service_Life);
        setmaintainEVC_01_Temperature(newmaintainEVC_01_Temperature);
        setmaintainEVC_01_Volume_at_Base_Condition(newmaintainEVC_01_Volume_at_Base_Condition);
        setmaintainEVC_01_Volume_at_Measurement_Condition(newmaintainEVC_01_Volume_at_Measurement_Condition);
        setMaintainEVC_01_Pressure(newMaintainEVC_01_Pressure);
        setmaintainEVC_01_Flow_at_Base_Condition(newMaintainEVC_01_Flow_at_Base_Condition);
        setmaintainEVC_01_Vm_of_Current_Day(newmaintainEVC_01_Vm_of_Current_Day);
        setMaintainEVC_01_Vb_of_Current_Day(newMaintainEVC_01_Vb_of_Current_Day);
        setmaintainEVC_01_Flow_at_Measurement_Condition(newmaintainEVC_01_Flow_at_Measurement_Condition);
        setmaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
        setmaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);

        setmaintainEVC_02_Remain_Battery_Service_Life(newmaintainEVC_02_Remain_Battery_Service_Life);
        setmaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
        setmaintainEVC_02_Volume_at_Base_Condition(newmaintainEVC_02_Volume_at_Base_Condition);
        setmaintainEVC_02_Volume_at_Measurement_Condition(newmaintainEVC_02_Volume_at_Measurement_Condition);
        setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
        setmaintainEVC_02_Flow_at_Base_Condition(newmaintainEVC_02_Flow_at_Base_Condition);
        setmaintainEVC_02_Vm_of_Current_Day(newmaintainEVC_02_Vm_of_Current_Day);
        setmaintainEVC_02_Vb_of_Current_Day(newmaintainEVC_02_Vb_of_Current_Day);
        setmaintainEVC_02_Flow_at_Measurement_Condition(newmaintainEVC_02_Flow_at_Measurement_Condition);
        setmaintainEVC_02_Vb_of_Last_Day(newmaintainEVC_02_Vb_of_Last_Day);
        setmaintainEVC_02_Vm_of_Last_Day(newmaintainEVC_02_Vm_of_Last_Day);
        

        setMaintainGD1(newMaintainGD1);
        setMaintainGD2(newMaintainGD2);
        setMaintainGD3(newMaintainGD3);

        setMaintainPT1(newMaintainPT1);
        setmaintainDI_ZSO_1(newMaintainDI_DI_ZSO_1);
        setmaintainDI_ZSC_1(newMaintainDI_DI_ZSC_1);
        setmaintainDI_MAP_1(newmaintainDI_MAP_1);
        setmaintainDI_UPS_CHARGING(newmaintainDI_UPS_CHARGING);
        setmaintainDI_UPS_ALARM(newmaintainDI_UPS_ALARM);
        setmaintainDI_SELECT_SW(newmaintainDI_SELECT_SW);
        setmaintainDI_RESET(newmaintainDI_RESET);
        setmaintainDI_UPS_BATTERY(newmaintainDI_UPS_BATTERY);
        setmaintainDO_SV1(newmaintainDO_SV1);

        setmaintainEmergency_NO(newmaintainEmergency_NO);
        setmaintainEmergency_NC(newmaintainEmergency_NC);
        setmaintainUPS_Mode(newmaintainUPS_Mode);
        setmaintainDO_HR_01(newmaintainDO_HR_01);
        setmaintainDO_BC_01(newmaintainDO_BC_01);

        setmaintainEVC_01_Conn_STT(newmaintainEVC_01_Conn_STT);
        setmaintainEVC_02_Conn_STT(newmaintainEVC_02_Conn_STT);
        setmaintainPLC_Conn_STT(newmaintainPLC_Conn_STT);


    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};

const handleCheckboxChange = (e:any) => {
    const isChecked = e.checked;

    handleMainTainAll(isChecked);
};


const handleMainTainEVC01 = async (checked:any) => {
    try {
        const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
        const newmaintainEVC_01_Temperature = checked;
        const newmaintainEVC_01_Volume_at_Base_Condition = checked;
        const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_01_Pressure = checked;
        const newMaintainEVC_01_Flow_at_Base_Condition = checked;
        const newmaintainEVC_01_Vm_of_Current_Day = checked;
        const newMaintainEVC_01_Vb_of_Current_Day = checked;
        const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
        const newmaintainEVC_01_Vb_of_Last_Day = checked;
        const newmaintainEVC_01_Vm_of_Last_Day = checked;
        const newmaintainEVC_01_Conn_STT = checked;

   

        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
               EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
               EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
               EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
               EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
               EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
               EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
               EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
               EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
               EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
               EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,
               EVC_01_Conn_STT_Maintain: newmaintainEVC_01_Conn_STT,


             }
        );
        setmaintainEVC_01_Remain_Battery_Service_Life(newMaintainEVC_01_Remain_Battery_Service_Life);
        setmaintainEVC_01_Temperature(newmaintainEVC_01_Temperature);
        setmaintainEVC_01_Volume_at_Base_Condition(newmaintainEVC_01_Volume_at_Base_Condition);
        setmaintainEVC_01_Volume_at_Measurement_Condition(newmaintainEVC_01_Volume_at_Measurement_Condition);
        setMaintainEVC_01_Pressure(newMaintainEVC_01_Pressure);
        setmaintainEVC_01_Flow_at_Base_Condition(newMaintainEVC_01_Flow_at_Base_Condition);
        setmaintainEVC_01_Vm_of_Current_Day(newmaintainEVC_01_Vm_of_Current_Day);
        setMaintainEVC_01_Vb_of_Current_Day(newMaintainEVC_01_Vb_of_Current_Day);
        setmaintainEVC_01_Flow_at_Measurement_Condition(newmaintainEVC_01_Flow_at_Measurement_Condition);
        setmaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
        setmaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);
        setmaintainEVC_01_Conn_STT(newmaintainEVC_01_Conn_STT);

       
    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};

const handleCheckboxChangeEVC01 = (e:any) => {
    const isChecked = e.checked;

    handleMainTainEVC01(isChecked);
};


const handleMainTainEVC02 = async (checked:any) => {
    try {
        const newmaintainEVC_02_Remain_Battery_Service_Life = checked;
        const newMaintainEVC_02_Temperature = checked;
        const newmaintainEVC_02_Volume_at_Base_Condition = checked;
        const newmaintainEVC_02_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_02_Pressure = checked;
        const newmaintainEVC_02_Flow_at_Base_Condition = checked;
        const newmaintainEVC_02_Vm_of_Current_Day = checked;
        const newmaintainEVC_02_Vb_of_Current_Day = checked;
        const newmaintainEVC_02_Flow_at_Measurement_Condition = checked;
        const newmaintainEVC_02_Vb_of_Last_Day = checked;
        const newmaintainEVC_02_Vm_of_Last_Day = checked;
        const newmaintainEVC_02_Conn_STT = checked;

   

        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_02_Remain_Battery_Service_Life_Maintain: newmaintainEVC_02_Remain_Battery_Service_Life,
               EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
               EVC_02_Volume_at_Base_Condition_Maintain: newmaintainEVC_02_Volume_at_Base_Condition,
               EVC_02_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_02_Volume_at_Measurement_Condition,
               EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
               EVC_02_Flow_at_Base_Condition_Maintain: newmaintainEVC_02_Flow_at_Base_Condition,
               EVC_02_Vm_of_Current_Day_Maintain: newmaintainEVC_02_Vm_of_Current_Day,
               EVC_02_Vb_of_Current_Day_Maintain: newmaintainEVC_02_Vb_of_Current_Day,
               EVC_02_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_02_Flow_at_Measurement_Condition,
               EVC_02_Vb_of_Last_Day_Maintain: newmaintainEVC_02_Vb_of_Last_Day,
               EVC_02_Vm_of_Last_Day_Maintain: newmaintainEVC_02_Vm_of_Last_Day,
               EVC_02_Conn_STT_Maintain: newmaintainEVC_02_Conn_STT,


             }
        );
        setmaintainEVC_02_Remain_Battery_Service_Life(newmaintainEVC_02_Remain_Battery_Service_Life);
        setmaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
        setmaintainEVC_02_Volume_at_Base_Condition(newmaintainEVC_02_Volume_at_Base_Condition);
        setmaintainEVC_02_Volume_at_Measurement_Condition(newmaintainEVC_02_Volume_at_Measurement_Condition);
        setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
        setmaintainEVC_02_Flow_at_Base_Condition(newmaintainEVC_02_Flow_at_Base_Condition);
        setmaintainEVC_02_Vm_of_Current_Day(newmaintainEVC_02_Vm_of_Current_Day);
        setmaintainEVC_02_Vb_of_Current_Day(newmaintainEVC_02_Vb_of_Current_Day);
        setmaintainEVC_02_Flow_at_Measurement_Condition(newmaintainEVC_02_Flow_at_Measurement_Condition);
        setmaintainEVC_02_Vb_of_Last_Day(newmaintainEVC_02_Vb_of_Last_Day);
        setmaintainEVC_02_Vm_of_Last_Day(newmaintainEVC_02_Vm_of_Last_Day);
        setmaintainEVC_02_Conn_STT(newmaintainEVC_02_Conn_STT);

       
    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};

const handleCheckboxChangeEVC02 = (e:any) => {
    const isChecked = e.checked;

    handleMainTainEVC02(isChecked);
};



const handleMainTainPLC = async (checked:any) => {
    try {
        const newMaintainGD1 = checked;
        const newMaintainGD2 = checked;
        const newMaintainGD3 = checked;

        const newMaintainPT1 = checked;
        const newMaintainDI_DI_ZSO_1 = checked;
        const newMaintainDI_DI_ZSC_1 = checked;
        const newmaintainDI_MAP_1 = checked;
        const newmaintainDI_UPS_CHARGING = checked;
        const newmaintainDI_UPS_ALARM = checked;
        const newmaintainDI_SELECT_SW = checked;
        const newmaintainDI_RESET = checked;
        const newmaintainDI_UPS_BATTERY = checked;
        const newmaintainDO_SV1 = checked;

        const newmaintainEmergency_NO = checked;
        const newmaintainEmergency_NC = checked;
        const newmaintainUPS_Mode = checked;
        const newmaintainDO_HR_01 = checked;
        const newmaintainDO_BC_01 = checked;
        const newMaintainDO_SV_0_01 = checked;
        const newmaintainPLC_Conn_STT = checked;

   

        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            {                GD1_Maintain: newMaintainGD1,
                GD2_Maintain: newMaintainGD2,
                GD3_Maintain: newMaintainGD3,
                PT1_Maintain: newMaintainPT1,
                DI_ZSO_1_Maintain: newMaintainDI_DI_ZSO_1,
                DI_ZSC_1_Maintain: newMaintainDI_DI_ZSC_1,
                DI_MAP_1_Maintain: newmaintainDI_MAP_1,
                DI_UPS_CHARGING_Maintain: newmaintainDI_UPS_CHARGING,
                DI_UPS_ALARM_Maintain: newmaintainDI_UPS_ALARM,
                DI_SELECT_SW_Maintain: newmaintainDI_SELECT_SW,
                DI_RESET_Maintain: newmaintainDI_RESET,
                DI_UPS_BATTERY_Maintain: newmaintainDI_UPS_BATTERY,
                DO_SV1_Maintain: newmaintainDO_SV1,
 
                Emergency_NO_Maintain: newmaintainEmergency_NO,
                Emergency_NC_Maintain: newmaintainEmergency_NC,
                UPS_Mode_Maintain: newmaintainUPS_Mode,
                DO_HR_01_Maintain: newmaintainDO_HR_01,
                DO_BC_01_Maintain: newmaintainDO_BC_01,
                DO_SV_0_01_Maintain: newMaintainDO_SV_0_01,
                PLC_Conn_STT_Maintain: newmaintainPLC_Conn_STT,


             }
        );
        setMaintainGD1(newMaintainGD1);
        setMaintainGD2(newMaintainGD2);
        setMaintainGD3(newMaintainGD3);

        setMaintainPT1(newMaintainPT1);
        setmaintainDI_ZSO_1(newMaintainDI_DI_ZSO_1);
        setmaintainDI_ZSC_1(newMaintainDI_DI_ZSC_1);
        setmaintainDI_MAP_1(newmaintainDI_MAP_1);
        setmaintainDI_UPS_CHARGING(newmaintainDI_UPS_CHARGING);
        setmaintainDI_UPS_ALARM(newmaintainDI_UPS_ALARM);
        setmaintainDI_SELECT_SW(newmaintainDI_SELECT_SW);
        setmaintainDI_RESET(newmaintainDI_RESET);
        setmaintainDI_UPS_BATTERY(newmaintainDI_UPS_BATTERY);
        setmaintainDO_SV1(newmaintainDO_SV1);

        setmaintainEmergency_NO(newmaintainEmergency_NO);
        setmaintainEmergency_NC(newmaintainEmergency_NC);
        setmaintainUPS_Mode(newmaintainUPS_Mode);
        setmaintainDO_HR_01(newmaintainDO_HR_01);
        setmaintainDO_BC_01(newmaintainDO_BC_01);
        setmaintainPLC_Conn_STT(newmaintainPLC_Conn_STT);


       
    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};

const handleCheckboxChangePLC = (e:any) => {
    const isChecked = e.checked;

    handleMainTainPLC(isChecked);
};


//===========================================================================================





//===========================================================================================

    useEffect(() => {
        setInputGetwayPhone(getWayPhoneOTSUKA)

      

        setInputValueEVC_01_Pressure(EVC_01_Pressure_High); 
        setInputValue2EVC_01_Pressure(EVC_01_Pressure_Low); 

        setInputValueEVC_02_Pressure(EVC_02_Pressure_High); 
        setInputValue2EVC_02_Pressure(EVC_02_Pressure_Low); 

        setInputValuePT1(PT1_High); 
        setInputValue2PT1(PT1_Low);    
        
        setInputValueGD1(GD1_High)
        setInputValue2GD1(GD1_Low)

        setInputValueGD2(GD2_High)
        setInputValue2GD2(GD2_Low)

        setInputValueGD3(GD3_High)
        setInputValue2GD3(GD3_Low)

        setinputValueEVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_High)
        setinputValue2EVC_01_Flow_at_Measurement_Condition(EVC_01_Flow_at_Measurement_Condition_Low)

        setinputValueEVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_High)
        setinputValue2EVC_01_Flow_at_Base_Condition(EVC_01_Flow_at_Base_Condition_Low)

        setinputValueEVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_High)
        setinputValue2EVC_01_Volume_at_Base_Condition(EVC_01_Volume_at_Base_Condition_Low)

        setinputValueEVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_High)
        setinputValue2EVC_01_Volume_at_Measurement_Condition(EVC_01_Volume_at_Measurement_Condition_Low)

        setinputValueEVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_High)
        setinputValue2EVC_02_Flow_at_Measurement_Condition(EVC_02_Flow_at_Measurement_Condition_Low)

        setinputValueEVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_High)
        setinputValue2EVC_02_Flow_at_Base_Condition(EVC_02_Flow_at_Base_Condition_Low)

        setinputValueEVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_High)
        setinputValue2EVC_02_Volume_at_Base_Condition(EVC_02_Volume_at_Base_Condition_Low)

        setinputValueEVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_High)
        setinputValue2EVC_02_Volume_at_Measurement_Condition(EVC_02_Volume_at_Measurement_Condition_Low)

        setinputValueEVC_01_Temperature(EVC_01_Temperature_High)
        setinputValue2EVC_01_Temperature(EVC_01_Temperature_Low)

        setinputValueEVC_02_Temperature(EVC_02_Temperature_High)
        setinputValue2EVC_02_Temperature(EVC_02_Temperature_Low)

        setinputValueEVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_High)
        setinputValue2EVC_01_Remain_Battery_Service_Life(EVC_01_Remain_Battery_Service_Life_Low)

        setinputValueEVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_High)
        setinputValue2EVC_02_Remain_Battery_Service_Life(EVC_02_Remain_Battery_Service_Life_Low)

        setinputValueEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_High)
        setinputValue2EVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Low)

        setinputValueEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_High)
        setinputValue2EVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_Day_Low)

        setinputValueEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_High)
        setinputValue2EVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Low)

        setinputValueEVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_High)
        setinputValue2EVC_02_Vb_of_Last_Day(EVC_02_Vb_of_Last_Day_Low)

        setinputValueEVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_High)
        setinputValue2EVC_01_Vm_of_Current_Day(EVC_01_Vm_of_Current_Day_Low)

        setinputValueEVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_High)
        setinputValue2EVC_02_Vm_of_Current_Day(EVC_02_Vm_of_Current_Day_Low)

        setinputValueEVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_High)
        setinputValue2EVC_01_Vb_of_Current_Day(EVC_01_Vb_of_Current_Day_Low)

        setinputValueEVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_High)
        setinputValue2EVC_02_Vb_of_Current_Day(EVC_02_Vb_of_Current_Day_Low)

        setinputValueDI_UPS_BATTERY(DI_UPS_BATTERY_High)
        setinputValue2DI_UPS_BATTERY(DI_UPS_BATTERY_Low)

        setinputValueDI_UPS_CHARGING(DI_UPS_CHARGING_High)
        setinputValue2DI_UPS_CHARGING(DI_UPS_CHARGING_Low)

        setinputValueDI_UPS_ALARM(DI_UPS_ALARM_High)
        setinputValue2DI_UPS_ALARM(DI_UPS_ALARM_Low)

        setinputValueUPS_Mode(UPS_Mode_High)
        setinputValue2UPS_Mode(UPS_Mode_Low)

        setinputValueDI_SELECT_SW(DI_SELECT_SW_High)
        setinputValue2DI_SELECT_SW(DI_SELECT_SW_Low)

        setinputValueEmergency_NC(Emergency_NC_High)
        setinputValue2Emergency_NC(Emergency_NC_Low)

        setinputValueEmergency_NO(Emergency_NO_High)
        setinputValue2Emergency_NO(Emergency_NO_Low)

        setinputValueDI_RESET(DI_RESET_High)
        setinputValue2DI_RESET(DI_RESET_Low)

        setinputValueDO_HR_01(DO_HR_01_High)
        setinputValue2DO_HR_01(DO_HR_01_Low)

        setinputValueDI_MAP_1(DI_MAP_1_High)
        setinputValue2DI_MAP_1(DI_MAP_1_Low)

        setinputValueDI_ZSC_1(DI_ZSC_1_High)
        setinputValue2DI_ZSC_1(DI_ZSC_1_Low)

        setinputValueDI_ZSO_1(DI_ZSO_1_High)
        setinputValue2DI_ZSO_1(DI_ZSO_1_Low)

        setinputValueDO_SV1(DO_SV1_High)
        setinputValue2DO_SV1(DO_SV1_Low)


        setinputValueDO_BC_01(DO_BC_01_High)
        setinputValue2DO_BC_01(DO_BC_01_Low)



        setinputValueEVC_01_Conn_STT(EVC_01_Conn_STT_High)
        setinputValue2EVC_01_Conn_STT(EVC_01_Conn_STT_Low)

        setinputValueEVC_02_Conn_STT(EVC_02_Conn_STT_High)
        setinputValue2EVC_02_Conn_STT(EVC_02_Conn_STT_Low)


        setinputValuePLC_Conn_STT(PLC_Conn_STT_High)
        setinputValue2PLC_Conn_STT(PLC_Conn_STT_Low)

    }, [EVC_01_Pressure_High, EVC_01_Pressure_Low,
        EVC_02_Pressure_High, EVC_02_Pressure_Low ,
         PT1_High, PT1_Low, 
         GD1_High, GD1_Low,
         GD2_High, GD2_Low,
         GD3_High, GD3_Low ,
         EVC_01_Flow_at_Measurement_Condition_High, EVC_01_Flow_at_Measurement_Condition_Low ,
         EVC_01_Flow_at_Base_Condition_High, EVC_01_Flow_at_Base_Condition_Low ,
         EVC_01_Volume_at_Base_Condition_High, EVC_01_Volume_at_Base_Condition_Low ,
         EVC_01_Volume_at_Measurement_Condition_High, EVC_01_Volume_at_Measurement_Condition_Low ,

         EVC_02_Flow_at_Measurement_Condition_High, EVC_02_Flow_at_Measurement_Condition_Low ,
         EVC_02_Flow_at_Base_Condition_High, EVC_02_Flow_at_Base_Condition_Low ,
         EVC_02_Volume_at_Base_Condition_High, EVC_02_Volume_at_Base_Condition_Low ,
         EVC_02_Volume_at_Measurement_Condition_High, EVC_02_Volume_at_Measurement_Condition_Low ,
         EVC_01_Temperature_High, EVC_01_Temperature_Low ,
         EVC_02_Temperature_High, EVC_02_Temperature_Low ,
         EVC_01_Remain_Battery_Service_Life_High, EVC_01_Remain_Battery_Service_Life_Low ,
         EVC_02_Remain_Battery_Service_Life_High, EVC_02_Remain_Battery_Service_Life_Low ,
         EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day_Low ,
         EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low ,

         EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day_Low ,
         EVC_02_Vb_of_Last_Day_High, EVC_02_Vb_of_Last_Day_Low ,
         EVC_01_Vm_of_Current_Day_High, EVC_01_Vm_of_Current_Day_Low ,
         EVC_02_Vm_of_Current_Day_High, EVC_02_Vm_of_Current_Day_Low ,
         EVC_01_Vb_of_Current_Day_High, EVC_01_Vb_of_Current_Day_Low ,
         EVC_02_Vb_of_Current_Day_High, EVC_02_Vb_of_Current_Day_Low ,
         DI_UPS_BATTERY_High, DI_UPS_BATTERY_Low ,
         DI_UPS_CHARGING_High, DI_UPS_CHARGING_Low ,
         DI_UPS_ALARM_High, DI_UPS_ALARM_Low ,
         UPS_Mode_High, UPS_Mode_Low ,

         DI_SELECT_SW_High, DI_SELECT_SW_Low ,
         Emergency_NO_High, Emergency_NO_Low ,
         Emergency_NC_High, Emergency_NC_Low ,
         DI_RESET_High, DI_RESET_Low ,
         DO_HR_01_High, DO_HR_01_Low ,
         DI_MAP_1_High, DI_MAP_1_Low ,
         DI_ZSC_1_High, DI_ZSC_1_Low ,
         DI_ZSO_1_High, DI_ZSO_1_Low ,
         DO_SV1_High, DO_SV1_Low ,
         DO_BC_01_High, DO_BC_01_Low ,


         EVC_01_Conn_STT_High, EVC_01_Conn_STT_Low ,
         EVC_02_Conn_STT_High, EVC_02_Conn_STT_Low ,
         PLC_Conn_STT_High, PLC_Conn_STT_Low ,

         getWayPhoneOTSUKA
         
        ]);
    
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { 

                    EVC_01_Pressure_High: inputValueEVC_01_Pressure, EVC_01_Pressure_Low:inputValue2EVC_01_Pressure,
                    EVC_02_Pressure_High: inputValueEVC_02_Pressure, EVC_02_Pressure_Low:inputValue2EVC_02_Pressure,
                    PT1_High:inputValuePT1, PT1_Low:inputValue2PT1,
                    GD1_High:inputValueGD1, GD1_Low:inputValue2GD1,
                    GD2_High:inputValueGD2, GD2_Low:inputValue2GD2,
                    GD3_High:inputValueGD3, GD3_Low:inputValue2GD3,
                    EVC_01_Flow_at_Measurement_Condition_High:inputValueEVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_Low:inputValue2EVC_01_Flow_at_Measurement_Condition,
                    EVC_01_Flow_at_Base_Condition_High:inputValueEVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_Low:inputValue2EVC_01_Flow_at_Base_Condition,
                    EVC_01_Volume_at_Base_Condition_High:inputValueEVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_Low:inputValue2EVC_01_Volume_at_Base_Condition,
                    EVC_01_Volume_at_Measurement_Condition_High:inputValueEVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_Low:inputValue2EVC_01_Volume_at_Measurement_Condition,

                    EVC_02_Flow_at_Measurement_Condition_High:inputValueEVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_Low:inputValue2EVC_02_Flow_at_Measurement_Condition,
                    EVC_02_Flow_at_Base_Condition_High:inputValueEVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_Low:inputValue2EVC_02_Flow_at_Base_Condition,
                    EVC_02_Volume_at_Base_Condition_High:inputValueEVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_Low:inputValue2EVC_02_Volume_at_Base_Condition,
                    EVC_02_Volume_at_Measurement_Condition_High:inputValueEVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_Low:inputValue2EVC_02_Volume_at_Measurement_Condition,
                    EVC_01_Temperature_High:inputValueEVC_01_Temperature, EVC_01_Temperature_Low:inputValue2EVC_01_Temperature,
                    EVC_02_Temperature_High:inputValueEVC_02_Temperature, EVC_02_Temperature_Low:inputValue2EVC_02_Temperature,
                    EVC_01_Remain_Battery_Service_Life_High:inputValueEVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_Low:inputValue2EVC_01_Remain_Battery_Service_Life,
                    EVC_02_Remain_Battery_Service_Life_High:inputValueEVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_Low:inputValue2EVC_02_Remain_Battery_Service_Life,
                    EVC_01_Vm_of_Last_Day_High:inputValueEVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low:inputValue2EVC_01_Vm_of_Last_Day,
                    EVC_02_Vm_of_Last_Day_High:inputValueEVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_Low:inputValue2EVC_02_Vm_of_Last_Day,

                    EVC_01_Vb_of_Last_Day_High:inputValueEVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low:inputValue2EVC_01_Vb_of_Last_Day,
                    EVC_02_Vb_of_Last_Day_High:inputValueEVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_Low:inputValue2EVC_02_Vb_of_Last_Day,
                    EVC_01_Vb_of_Current_Day_High:inputValueEVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_Low:inputValue2EVC_01_Vb_of_Current_Day,
                    EVC_02_Vb_of_Current_Day_High:inputValueEVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_Low:inputValue2EVC_02_Vb_of_Current_Day,
                    EVC_01_Vm_of_Current_Day_High:inputValueEVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_Low:inputValue2EVC_01_Vm_of_Current_Day,
                    EVC_02_Vm_of_Current_Day_High:inputValueEVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_Low:inputValue2EVC_02_Vm_of_Current_Day,
                    DI_UPS_BATTERY_High:inputValueDI_UPS_BATTERY, DI_UPS_BATTERY_Low:inputValue2DI_UPS_BATTERY,
                    DI_UPS_CHARGING_High:inputValueDI_UPS_CHARGING, DI_UPS_CHARGING_Low:inputValue2DI_UPS_CHARGING,
                    DI_UPS_ALARM_High:inputValueDI_UPS_ALARM, DI_UPS_ALARM_Low:inputValue2DI_UPS_ALARM,
                    UPS_Mode_High:inputValueUPS_Mode, UPS_Mode_Low:inputValue2UPS_Mode,

                    DI_SELECT_SW_High:inputValueDI_SELECT_SW, DI_SELECT_SW_Low:inputValue2DI_SELECT_SW,
                    Emergency_NO_High:inputValueEmergency_NO, Emergency_NO_Low:inputValue2Emergency_NO,
                    Emergency_NC_High:inputValueEmergency_NC, Emergency_NC_Low:inputValue2Emergency_NC,
                    DI_RESET_High:inputValueDI_RESET, DI_RESET_Low:inputValue2DI_RESET,
                    DO_HR_01_High:inputValueDO_HR_01, DO_HR_01_Low:inputValue2DO_HR_01,
                    DI_MAP_1_High:inputValueDI_MAP_1, DI_MAP_1_Low:inputValue2DI_MAP_1,
                   DI_ZSC_1_High:inputValueDI_ZSC_1, DI_ZSC_1_Low:inputValue2DI_ZSC_1,
                   DI_ZSO_1_High:inputValueDI_ZSO_1, DI_ZSO_1_Low:inputValue2DI_ZSO_1,
                    DO_SV_0_01_High:inputValueDO_SV1, DO_SV_0_01_Low:inputValue2DO_SV1,
                    DO_BC_01_High:inputValueDO_BC_01, DO_BC_01_Low:inputValue2DO_BC_01,


                    EVC_01_Conn_STT_High:inputValueEVC_01_Conn_STT, EVC_01_Conn_STT_Low:inputValue2EVC_01_Conn_STT,

                   EVC_02_Conn_STT_High:inputValueEVC_02_Conn_STT,EVC_02_Conn_STT_Low:inputValue2EVC_02_Conn_STT,
                    PLC_Conn_STT_High:inputValuePLC_Conn_STT, PLC_Conn_STT_Low:inputValue2PLC_Conn_STT,


            IOT_Gateway_Phone:inputGetwayPhone

                }
            );

            setEVC_01_Pressure_High(inputValueEVC_01_Pressure);
            setEVC_01_Pressure_Low(inputValue2EVC_01_Pressure);
            setInputValueEVC_02_Pressure(inputValueEVC_02_Pressure);
            setInputValue2EVC_02_Pressure(inputValue2EVC_02_Pressure);
            setPT1_High(inputValuePT1);
            setPT1_Low(inputValue2PT1);
            setGD1_High(inputValueGD1);
            setGD1_Low(inputValue2GD1);
            setGD2_High(inputValueGD2);
            setGD2_Low(inputValue2GD2);
            setGD3_High(inputValueGD3);
            setGD3_Low(inputValue2GD3);
            setEVC_01_Flow_at_Measurement_Condition_High(inputValueEVC_01_Flow_at_Measurement_Condition);
            setEVC_01_Flow_at_Measurement_Condition_Low(inputValue2EVC_01_Flow_at_Measurement_Condition);
            setEVC_01_Flow_at_Base_Condition_High(inputValueEVC_01_Flow_at_Base_Condition);
            setEVC_01_Flow_at_Base_Condition_Low(inputValue2EVC_01_Flow_at_Base_Condition);
            setEVC_01_Volume_at_Base_Condition_High(inputValueEVC_01_Volume_at_Base_Condition);
            setEVC_01_Volume_at_Base_Condition_Low(inputValue2EVC_01_Volume_at_Base_Condition);
            setEVC_01_Volume_at_Measurement_Condition_High(inputValueEVC_01_Volume_at_Measurement_Condition);
            setEVC_01_Volume_at_Measurement_Condition_Low(inputValue2EVC_01_Volume_at_Measurement_Condition);

            setEVC_02_Flow_at_Measurement_Condition_High(inputValueEVC_02_Flow_at_Measurement_Condition);
            setEVC_02_Flow_at_Measurement_Condition_Low(inputValue2EVC_02_Flow_at_Measurement_Condition);
            setEVC_02_Flow_at_Base_Condition_High(inputValueEVC_02_Flow_at_Base_Condition);
            setEVC_02_Flow_at_Base_Condition_Low(inputValue2EVC_02_Flow_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_High(inputValueEVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Base_Condition_Low(inputValue2EVC_02_Volume_at_Base_Condition);
            setEVC_02_Volume_at_Measurement_Condition_High(inputValueEVC_02_Volume_at_Measurement_Condition);
            setEVC_02_Volume_at_Measurement_Condition_Low(inputValue2EVC_02_Volume_at_Measurement_Condition);
            setEVC_01_Temperature_High(inputValueEVC_01_Temperature);
            setEVC_01_Temperature_Low(inputValue2EVC_01_Temperature);
            setEVC_02_Temperature_High(inputValueEVC_02_Temperature);
            setEVC_02_Temperature_Low(inputValue2EVC_02_Temperature);
            setEVC_01_Remain_Battery_Service_Life_High(inputValueEVC_01_Remain_Battery_Service_Life);
            setEVC_01_Remain_Battery_Service_Life_Low(inputValue2EVC_01_Remain_Battery_Service_Life);
            setEVC_02_Remain_Battery_Service_Life_High(inputValueEVC_02_Remain_Battery_Service_Life);
            setEVC_02_Remain_Battery_Service_Life_Low(inputValue2EVC_02_Remain_Battery_Service_Life);
            setEVC_01_Vm_of_Last_Day_High(inputValueEVC_01_Vm_of_Last_Day);
            setEVC_01_Vm_of_Last_Day_Low(inputValue2EVC_01_Vm_of_Last_Day);

            setEVC_02_Vm_of_Last_Day_High(inputValueEVC_02_Vm_of_Last_Day);
            setEVC_02_Vm_of_Last_Day_Low(inputValue2EVC_02_Vm_of_Last_Day);
            setEVC_01_Vb_of_Last_Day_High(inputValueEVC_01_Vb_of_Last_Day);
            setEVC_01_Vb_of_Last_Day_Low(inputValue2EVC_01_Vb_of_Last_Day);
            setEVC_02_Vb_of_Last_Day_High(inputValueEVC_02_Vb_of_Last_Day);
            setEVC_02_Vb_of_Last_Day_Low(inputValue2EVC_02_Vb_of_Last_Day);
            setEVC_01_Vb_of_Current_Day_High(inputValueEVC_01_Vb_of_Current_Day);
            setEVC_01_Vb_of_Current_Day_Low(inputValue2EVC_01_Vb_of_Current_Day);
            setEVC_02_Vb_of_Current_Day_High(inputValueEVC_02_Vb_of_Current_Day);
            setEVC_02_Vb_of_Current_Day_Low(inputValue2EVC_02_Vb_of_Current_Day);
            setEVC_01_Vm_of_Current_Day_High(inputValueEVC_01_Vm_of_Current_Day);
            setEVC_01_Vm_of_Current_Day_Low(inputValue2EVC_01_Vm_of_Current_Day);
            setEVC_02_Vm_of_Current_Day_High(inputValueEVC_02_Vm_of_Current_Day);
            setEVC_02_Vm_of_Current_Day_Low(inputValue2EVC_02_Vm_of_Current_Day);
            setDI_UPS_BATTERY_High(inputValueDI_UPS_BATTERY);
            setDI_UPS_BATTERY_Low(inputValue2DI_UPS_BATTERY);
            setDI_UPS_CHARGING_High(inputValueDI_UPS_CHARGING);
            setDI_UPS_CHARGING_Low(inputValue2DI_UPS_CHARGING);
            setDI_UPS_ALARM_High(inputValueDI_UPS_ALARM);
            setDI_UPS_ALARM_Low(inputValue2DI_UPS_ALARM);

            setUPS_Mode_High(inputValueUPS_Mode);
            setUPS_Mode_Low(inputValue2UPS_Mode);
            setDI_SELECT_SW_High(inputValueDI_SELECT_SW);
            setDI_SELECT_SW_Low(inputValue2DI_SELECT_SW);
            setEmergency_NC_High(inputValueEmergency_NC);
            setEmergency_NC_Low(inputValue2Emergency_NC);
            setEmergency_NO_High(inputValueEmergency_NO);
            setEmergency_NO_Low(inputValue2Emergency_NO);
            setDI_RESET_High(inputValueDI_RESET);
            setDI_RESET_Low(inputValue2DI_RESET);
            setDO_HR_01_High(inputValueDO_HR_01);
            setDO_HR_01_Low(inputValue2DO_HR_01);
            setDI_MAP_1_High(inputValueDI_MAP_1);
            setDI_MAP_1_Low(inputValue2DI_MAP_1);
            setDI_ZSC_1_High(inputValueDI_ZSC_1);
            setDI_ZSC_1_Low(inputValue2DI_ZSC_1);
            setDI_ZSO_1_High(inputValueDI_ZSO_1);
            setDI_ZSO_1_Low(inputValue2DI_ZSO_1);
            setDO_SV1_High(inputValueDO_SV1);
            setDO_SV1_Low(inputValue2DO_SV1);
            setDO_BC_01_High(inputValueDO_BC_01);
            setDO_BC_01_Low(inputValue2DO_BC_01);



            setEVC_02_Conn_STT_High(inputValueEVC_02_Conn_STT);
            setEVC_02_Conn_STT_Low(inputValue2EVC_02_Conn_STT);


            setEVC_01_Conn_STT_High(inputValueEVC_01_Conn_STT);
            setEVC_01_Conn_STT_Low(inputValue2EVC_01_Conn_STT);

            setPLC_Conn_STT_High(inputValuePLC_Conn_STT);
            setPLC_Conn_STT_Low(inputValue2PLC_Conn_STT);

            setGetWayPhoneOTSUKA(inputGetwayPhone);

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


      const combineCss = {
            CSSEVC_01_Pressure : {
                color:exceedThresholdEVC_01_Pressure && !maintainEVC_01_Pressure
                ? "#ff5656"
                : maintainEVC_01_Pressure
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSSEVC_02_Pressure : {
                color:exceedThresholdEVC_02_Pressure && !maintainEVC_02_Pressure
                ? "#ff5656"
                : maintainEVC_02_Pressure
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSSPT1 : {
                color:exceedThresholdPT1 && !maintainPT1
                ? "#ff5656"
                : maintainPT1
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },

            CSSGD1 : {
                color:exceedThresholdGD1 && !maintainGD1
                ? "#ff5656"
                : maintainGD1
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSSGD2 : {
                color:exceedThresholdGD2 && !maintainGD2
                ? "#ff5656"
                : maintainGD2
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSSgd3 : {
                color:exceedThresholdGD3 && !maintainGD3
                ? "#ff5656"
                : maintainGD3
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Flow_at_Measurement_Condition : {
                color:exceedThresholdEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_01_Flow_at_Measurement_Condition
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Flow_at_Base_Condition : {
                color:exceedThresholdEVC_01_Flow_at_Base_Condition&& !maintainEVC_01_Flow_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_01_Flow_at_Base_Condition
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                
            },
             CSS_EVC_01_Volume_at_Base_Condition : {
                color:exceedThresholdEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_01_Volume_at_Base_Condition
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Volume_at_Measurement_Condition : {
                color:exceedThresholdEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_01_Volume_at_Measurement_Condition
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Flow_at_Measurement_Condition : {
                color:exceedThresholdEVC_02_Flow_at_Measurement_Condition && !maintainEVC_02_Flow_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_02_Flow_at_Measurement_Condition
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Flow_at_Base_Condition : {
                color:exceedThresholdEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_02_Flow_at_Base_Condition
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
             CSS_EVC_02_Volume_at_Base_Condition : {
                color:exceedThresholdEVC_02_Volume_at_Base_Condition&& !maintainEVC_02_Volume_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_02_Volume_at_Base_Condition
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Volume_at_Measurement_Condition : {
                color:exceedThresholdEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_02_Volume_at_Measurement_Condition
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Temperature : {
                color:exceedThresholdEVC_01_Temperature && !maintainEVC_01_Temperature
                ? "#ff5656"
                : maintainEVC_01_Temperature
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_02_Temperature : {
                color:exceedThresholdEVC_02_Temperature && !maintainEVC_02_Temperature
                ? "#ff5656"
                : maintainEVC_02_Temperature
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_Rebattery : {
                color:exceedThresholdEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
                ? "#ff5656"
                : maintainEVC_01_Remain_Battery_Service_Life
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Remain_Battery_Service_Life : {
                color:exceedThresholdEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
                ? "#ff5656"
                : maintainEVC_02_Remain_Battery_Service_Life
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vm_of_Last_Day : {
                color:exceedThresholdEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day
                ? "#ff5656"
                : maintainEVC_01_Vm_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vm_of_Last_Day : {
                color:exceedThresholdEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
                ? "#ff5656"
                : maintainEVC_02_Vm_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vb_of_Last_Day : {
                color:exceedThresholdEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day
                ? "#ff5656"
                : maintainEVC_01_Vb_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vb_of_Last_Day : {
                color:exceedThresholdEVC_02_Vb_of_Last_Day && !maintainEVC_02_Vb_of_Last_Day
                ? "#ff5656"
                : maintainEVC_02_Vb_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_EVC_01_Vm_of_Current_Day : {
                color:exceedThresholdEVC_01_Vm_of_Current_Day && !maintainEVC_01_Vm_of_Current_Day
                ? "#ff5656"
                : maintainEVC_01_Vm_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vm_of_Current_Day : {
                color:exceedThresholdEVC_02_Vm_of_Current_Day && !maintainEVC_02_Vm_of_Current_Day
                ? "#ff5656"
                : maintainEVC_02_Vm_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vb_of_Current_Day : {
                color:exceedThresholdEVC_01_Vb_of_Current_Day && !maintainEVC_01_Vb_of_Current_Day
                ? "#ff5656"
                : maintainEVC_01_Vb_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vb_of_Current_Day : {
                color:exceedThresholdEVC_02_Vb_of_Current_Day && !maintainEVC_02_Vb_of_Current_Day
                ? "#ff5656"
                : maintainEVC_02_Vb_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_DI_UPS_BATTERY : {
                color:exceedThresholdDI_UPS_BATTERY && !maintainDI_UPS_BATTERY
                ? "#ff5656"
                : maintainDI_UPS_BATTERY
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_DI_UPS_CHARGING: {
                color:exceedThresholdDI_UPS_CHARGING && !maintainDI_UPS_CHARGING
                ? "#ff5656"
                : maintainDI_UPS_CHARGING
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_DI_UPS_ALARM: {
                color:exceedThresholdDI_UPS_ALARM && !maintainDI_UPS_ALARM
                ? "#ff5656"
                : maintainDI_UPS_ALARM
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_UPS_Mode: {
                color:exceedThresholdUPS_Mode && !maintainUPS_Mode
                ? "#ff5656"
                : maintainUPS_Mode
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            }, 
              CSS_DI_SELECT_SW: {
                color:exceedThresholdDI_SELECT_SW && !maintainDI_SELECT_SW
                ? "#ff5656"
                : maintainDI_SELECT_SW
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Emergency_NO: {
                color:exceedThresholdEmergency_NO && !maintainEmergency_NO
                ? "#ff5656"
                : maintainEmergency_NO
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Emergency_NC: {
                color:exceedThresholdEmergency_NC && !maintainEmergency_NC
                ? "#ff5656"
                : maintainEmergency_NC
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Reset: {
                color:exceedThresholdDI_RESET && !maintainDI_RESET
                ? "#ff5656"
                : maintainDI_RESET
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Horn: {
                color:exceedThresholdDO_HR_01 && !maintainDO_HR_01
                ? "#ff5656"
                : maintainDO_HR_01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
           

            CSS_Map: {
                color:exceedThresholdDI_MAP_1 && !maintainDI_MAP_1
                ? "#ff5656"
                : maintainDI_MAP_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_ZSC: {
                color:exceedThresholdDI_ZSC_1 && !maintainDI_ZSC_1
                ? "#ff5656"
                : maintainDI_ZSC_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_ZSO: {
                color:exceedThresholdDI_ZSO_1 && !maintainDI_ZSO_1
                ? "#ff5656"
                : maintainDI_ZSO_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
              CSS_SELENOID: {
                color:exceedThresholdDO_SV1 && !maintainDO_SV1
                ? "#ff5656"
                : maintainDO_SV1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_DO_BC_01: {
                color:exceedThresholdDO_BC_01 && !maintainDO_BC_01
                ? "#ff5656"
                : maintainDO_BC_01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },



            CSS_EVC_01_Conn_STT: {
                color:exceedThresholdEVC_01_Conn_STT && !maintainEVC_01_Conn_STT
                ? "#ff5656"
                : maintainEVC_01_Conn_STT
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
              CSS_PLC_Conn_STT: {
                color:exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT
                ? "#ff5656"
                : maintainPLC_Conn_STT
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_EVC_02_Conn_STT: {
                color:exceedThresholdEVC_02_Conn_STT && !maintainEVC_02_Conn_STT
                ? "#ff5656"
                : maintainEVC_02_Conn_STT
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
      };
      const EVC_01_Flow_at_Base_Conditionformat = EVC_01_Flow_at_Base_Condition !== null ? parseFloat(EVC_01_Flow_at_Base_Condition).toFixed(2) : "";
      const EVC_01_Flow_at_Measurement_Conditionformat = EVC_01_Flow_at_Measurement_Condition !== null ? parseFloat(EVC_01_Flow_at_Measurement_Condition).toFixed(2) : "";
      const EVC_01_Volume_at_Base_Conditionformat = EVC_01_Volume_at_Base_Condition !== null ? parseFloat(EVC_01_Volume_at_Base_Condition).toFixed(2) : "";
      const EVC_01_Volume_at_Measurement_Conditionformat = EVC_01_Volume_at_Measurement_Condition !== null ? parseFloat(EVC_01_Volume_at_Measurement_Condition).toFixed(2) : "";

      const VBTodayformat = EVC_01_Vb_of_Current_Day !== null ? parseFloat(EVC_01_Vb_of_Current_Day).toFixed(2) : "";
      const VMTodayformat = EVC_01_Vm_of_Current_Day !== null ? parseFloat(EVC_01_Vm_of_Current_Day).toFixed(2) : "";
      const VBLastdayformat = EVC_01_Vb_of_Last_Day !== null ? parseFloat(EVC_01_Vb_of_Last_Day).toFixed(2) : "";
      const VMLastdayformat = EVC_01_Vm_of_Last_Day !== null ? parseFloat(EVC_01_Vm_of_Last_Day).toFixed(2) : "";


    const modbusEVC1 = {

        
  

        SVF: "40858",
        GVF: "40860",
        SVA: "40854",
        GVA: "40856",

        PT: "40852",
        TT: "40850",

        VB_TODAY:"40862",
        VB_Yesterday:"40866",
        VM_TODAY:"40864",
        VM_Yesterday:"40868",
        ReBattery:"40002",
        EVC_01_Conn_STT:"Status",
        EVC_02_Conn_STT:"Status"

    }

    const modbusEVC2 = {
        SVF: "40010",
        GVF: "40012",
        SVA: "40006",
        GVA: "40008",

        PT: "40004",
        TT: "40850",


        VB_TODAY:"40014",
        VB_Yesterday:"40018",
        VM_TODAY:"40016",
        VM_Yesterday:"40020",
        ReBattery:"40001",
      
    }

    const modbusPLC = {
        PT1:"DB5F114",
        GD1:"DB5F106",
        GD2:"DB5F110",
        GD3:"DB5F118",
        
        SDV_ZSO:"DB5W16",
        SDV_ZSC:"DB5W18",
        DI_MAP_1:"DB5W24",
        UPS_BATTERY:"DB5W26",
        UPS_CHARGING:"DB5W28",
        UPS_ALARM:"DB5W30",
        DI_SELECT_SW:"DB5W34",
        RESET:"DB5W36",
        Emergency_Stop_NO:"DB5W38",
        Emergency_Stop_NC:"DB5W40",
        UPS_MODE:"DB5W42",
        SDV_SOLENOID:"DB5W54",
        HORN:"DB5W50",
        DO_BC_01:"DB5W52",
        PLC_Conn_STT:"Status"
    }
    const DataCharging = DI_UPS_CHARGING === "0" ? "Normal" : DI_UPS_CHARGING === "1" ? "Charging" : null
    const DataBattery = DI_UPS_BATTERY === "0" ? "Normal" : DI_UPS_BATTERY === "1" ? "Battery" : null
    const DataAlarm = DI_UPS_ALARM === "0" ? "Normal" : DI_UPS_ALARM === "1" ? "No Battery" : null
    const DataMode = UPS_Mode === "0" ? "N/A" : UPS_Mode === "1" ? "UPS Running" : UPS_Mode === "2" ? "Charging" : UPS_Mode === "3" ? "No Battery" : UPS_Mode === "4" ? "Normal" : null
    const DataDI_ZSC_1 = DI_ZSC_1 === "0" ? "ON" : DI_ZSC_1 === "1" ? "OFF" : null
    const DataDI_ZSO_1 = DI_ZSO_1 === "0" ? "OFF" : DI_ZSO_1 === "1" ? "ON" : null
    const DataDI_SELECT_SW = DI_SELECT_SW === "0" ? "Local" : DI_SELECT_SW === "1" ? "Remote" : null
    const DataReset = DI_RESET === "0" ? "OFF" : DI_RESET === "1" ? "ON" : null
    const DataHorn = DO_HR_01 === "0" ? "OFF" : DO_HR_01 === "1" ? "ON" : null
    const DataDO_BC_01 = DO_BC_01 === "0" ? "OFF" : DO_BC_01 === "1" ? "ON" : null
    const DataSV_1 = DO_SV1 === "0" ? "OFF" : DO_SV1 === "1" ? "ON" : null
    const DataEmergency_NC = Emergency_NC === "0" ? "Emergency" : Emergency_NC === "1" ? "Normal" : null
    const DataEmergency_NO = Emergency_NO === "0" ? "Normal" : Emergency_NO === "1" ? "Emergency" : null
    const DataDI_MAP_1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null

 
    const DataEVC_01_Conn_STT = EVC_01_Conn_STT === "0" ? "Not Init" : EVC_01_Conn_STT === "1" ? "COM OK" : EVC_01_Conn_STT === "2" ? "Error" : null
    const DataEVC_02_Conn_STT = EVC_02_Conn_STT === "0" ? "Not Init" : EVC_02_Conn_STT === "1" ? "COM OK" : EVC_02_Conn_STT === "2" ? "Error" : null
    const DataPLC_Conn_STT = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null

    const mainCategoryEVC = {
       
        EVC01: <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> EVC-1901 -  Parameters & Configurations  {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangeEVC01}
                checked={maintainEVC_01_Remain_Battery_Service_Life}
            />
        <p style={{fontSize:15}}>Maintain EVC-1901</p>  </div> )}  </span>,
        EVC02:  <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> EVC-1902 -  Parameters & Configurations  {!AuthInput && ( <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}>  
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangeEVC02}
                checked={maintainEVC_02_Remain_Battery_Service_Life}
            />
         <p style={{fontSize:15}}>Maintain EVC-1902</p>  </div> )} </span>,
        PLC:  <span  style={{display:'flex',textAlign:'center', justifyContent:'space-between'  }}> PLC -  Parameters & Configurations  {!AuthInput && (  <div style={{display:'flex' , textAlign:'center', alignItems:'center',}}> 
            <Checkbox
                style={{ marginRight: 5 }}
                onChange={handleCheckboxChangePLC}
                checked={maintainGD1}
            />
         <p style={{fontSize:15}}>Maintain PLC</p>  </div> )} </span>
    };
    

      const dataEVC01 = [

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_Rebattery} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_Rebattery}>{modbusEVC1.ReBattery}</span> ,

        name: <span style={combineCss.CSS_Rebattery}>{TagName.EVC_01_Remain_Battery_Service_Life}</span> ,

        value: <span style={combineCss.CSS_Rebattery} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month} </span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_Rebattery}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_Rebattery}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Remain_Battery_Service_Life}
        checked={maintainEVC_01_Remain_Battery_Service_Life}
    ></Checkbox>

         },


        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_Temperature} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSS_Temperature}>{TagName.EVC_01_Temperature} </span> ,
    modbus: <span style={combineCss.CSS_Temperature}>{modbusEVC1.TT}</span> ,

    value: <span style={combineCss.CSS_Temperature} > {EVC_01_Temperature} {nameValue.C}</span>, 
    high: <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Temperature} onChange={handleInputChangeEVC_01_Temperature} inputMode="decimal" />, 
    low:  <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_Temperature}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Temperature} onChange={handleInputChange2EVC_01_Temperature} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_01_Temperature}
    checked={maintainEVC_01_Temperature}
></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSSEVC_01_Pressure}>{modbusEVC1.PT}</span> ,

        name: <span style={combineCss.CSSEVC_01_Pressure}>{TagName.Output_Pressure} </span> ,
        value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_01_Pressure}  placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChangeEVC_01_Pressure} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2EVC_01_Pressure} inputMode="decimal" />,
     update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainEVC_01_Pressure}
     checked={maintainEVC_01_Pressure}
 ></Checkbox>
        },


        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>{modbusEVC1.SVA}</span> ,

        name: <span  style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>{TagName.SVA} </span> ,
        // modbus: <span  style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>40854	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition} >  {EVC_01_Volume_at_Base_Conditionformat}  {nameValue.Sm3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Base_Condition} onChange={handleInputChange2EVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_01_Volume_at_Base_Condition}
         checked={maintainEVC_01_Volume_at_Base_Condition}
     ></Checkbox>

        },
        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>{modbusEVC1.GVA}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>{TagName.GVA}	 </span> ,
        // modbus: <span  style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>40872	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Conditionformat} {nameValue.m3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_01_Volume_at_Measurement_Condition}
         checked={maintainEVC_01_Volume_at_Measurement_Condition}
     ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}> {modbusEVC1.SVF}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}>{TagName.SVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Conditionformat}  {nameValue.Sm3h}  </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Base_Condition} onChange={handleInputChange2EVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_01_Flow_at_Base_Condition}
         checked={maintainEVC_01_Flow_at_Base_Condition}
     ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}>{modbusEVC1.GVF}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}>{TagName.GVF} </span> ,


        value: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Conditionformat}  {nameValue.m3h}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_01_Flow_at_Measurement_Condition}
         checked={maintainEVC_01_Flow_at_Measurement_Condition}
     ></Checkbox>

        },
       

      
       


        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day}>{modbusEVC1.VB_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day}> {TagName.Vb_Today}</span> ,

        value: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day} > {VBTodayformat} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Current_Day} onChange={handleInputChangeEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vb_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Current_Day} onChange={handleInputChange2EVC_01_Vb_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Vb_of_Current_Day}
        checked={maintainEVC_01_Vb_of_Current_Day}
    ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day}>{modbusEVC1.VM_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day}>{TagName.Vm_Today}</span> ,
        value: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day} > {VMTodayformat} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Current_Day} onChange={handleInputChangeEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Current_Day} onChange={handleInputChange2EVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Vm_of_Current_Day}
        checked={maintainEVC_01_Vm_of_Current_Day}
    ></Checkbox>

        },

       { 
            mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
       modbus: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day}>{modbusEVC1.VB_Yesterday}</span> ,

       name: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day}> {TagName.Vb_Yesterday}</span> ,

       value: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day} > {VBLastdayformat} {nameValue.Sm3}</span>, 
       high: <InputText  
 disabled={AuthInputHighLow}
       
       style={combineCss.CSS_EVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText  
 disabled={AuthInputHighLow}
       
       style={combineCss.CSS_EVC_01_Vb_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day}>{modbusEVC1.VM_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day}> {TagName.Vm_Yesterday} </span> ,

        value: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day} > {VMLastdayformat} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Vm_of_Last_Day}
        checked={maintainEVC_01_Vm_of_Last_Day}
    ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Conn_STT} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Conn_STT}>{modbusEVC1.EVC_01_Conn_STT}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Conn_STT}> {TagName.EVC_01_Conn_STT} </span> ,

        value: <span style={combineCss.CSS_EVC_01_Conn_STT} > {EVC_01_Conn_STT} {DataEVC_01_Conn_STT}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Conn_STT} onChange={handleInputChangeEVC_01_Conn_STT} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Conn_STT} onChange={handleInputChange2EVC_01_Conn_STT} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_01_Conn_STT}
        checked={maintainEVC_01_Conn_STT}
    ></Checkbox>

        },

   

      ]


      const EVC_02_Flow_at_Base_Conditionformat = EVC_02_Flow_at_Base_Condition !== null ? parseFloat(EVC_02_Flow_at_Base_Condition).toFixed(2) : "";
      const EVC_02_Flow_at_Measurement_Conditionformat = EVC_02_Flow_at_Measurement_Condition !== null ? parseFloat(EVC_02_Flow_at_Measurement_Condition).toFixed(2) : "";
      const EVC_02_Volume_at_Base_Conditionformat = EVC_02_Volume_at_Base_Condition !== null ? parseFloat(EVC_02_Volume_at_Base_Condition).toFixed(2) : "";
      const EVC_02_Volume_at_Measurement_Conditionformat = EVC_02_Volume_at_Measurement_Condition !== null ? parseFloat(EVC_02_Volume_at_Measurement_Condition).toFixed(2) : "";

      const VBTodayformat2 = EVC_02_Vb_of_Current_Day !== null ? parseFloat(EVC_02_Vb_of_Current_Day).toFixed(2) : "";
      const VMTodayformat2 = EVC_02_Vm_of_Current_Day !== null ? parseFloat(EVC_02_Vm_of_Current_Day).toFixed(2) : "";
      const VBLastdayformat2 = EVC_02_Vb_of_Last_Day !== null ? parseFloat(EVC_02_Vb_of_Last_Day).toFixed(2) : "";
      const VmLastdayformat2 = EVC_02_Vm_of_Last_Day !== null ? parseFloat(EVC_02_Vm_of_Last_Day).toFixed(2) : "";

      const c = EVC_02_Vm_of_Last_Day !== null ? parseFloat(EVC_02_Vm_of_Last_Day).toFixed(2) : "";

      const dataEVC02 = [

        {
            mainCategory: mainCategoryEVC.EVC02,
            timeUpdate: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,

        modbus: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}>{modbusEVC2.ReBattery}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}>{TagName.EVC_01_Remain_Battery_Service_Life}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Remain_Battery_Service_Life} onChange={handleInputChange2EVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_02_Remain_Battery_Service_Life}
        checked={maintainEVC_02_Remain_Battery_Service_Life}
    ></Checkbox>

       },
       {
        
        mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSS_EVC_02_Temperature} >{EVC_STT02Value}</span>,
    modbus: <span style={combineCss.CSS_EVC_02_Temperature}>{modbusEVC2.TT}</span> ,
    
    name: <span style={combineCss.CSS_EVC_02_Temperature}>{TagName.EVC_01_Temperature}</span> ,
    
    value: <span style={combineCss.CSS_EVC_02_Temperature} > {EVC_02_Temperature}  {nameValue.C}</span>, 
    high: <InputText  
    disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Temperature} onChange={handleInputChangeEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText  
    disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Temperature}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Temperature} onChange={handleInputChange2EVC_02_Temperature} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_02_Temperature}
    checked={maintainEVC_02_Temperature}
    ></Checkbox>
    
    },
       {
            
        mainCategory: mainCategoryEVC.EVC02,
        
        timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
    modbus: <span style={combineCss.CSSEVC_02_Pressure}>{modbusEVC2.PT}</span> ,

    name: <span style={combineCss.CSSEVC_02_Pressure}>{TagName.Output_Pressure}</span> ,
    value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
    high: <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSSEVC_02_Pressure}  placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Pressure} onChange={handleInputChangeEVC_02_Pressure} inputMode="decimal" />, 
    low:  <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValue2EVC_02_Pressure} onChange={handleInputChange2EVC_02_Pressure} inputMode="decimal" />,
 update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangeMaintainEVC_02_Pressure}
 checked={maintainEVC_02_Pressure}
></Checkbox>
},

{
            
    mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
modbus: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}>{modbusEVC2.SVA}</span> ,

name: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}>{TagName.SVA}	 </span> ,

value: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Conditionformat} {nameValue.Sm3}</span> , 
 high: <InputText  
disabled={AuthInputHighLow}
 
 style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
 low:  <InputText  
disabled={AuthInputHighLow}
 
 style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Base_Condition} onChange={handleInputChange2EVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
 update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainEVC_02_Volume_at_Base_Condition}
 checked={maintainEVC_02_Volume_at_Base_Condition}
></Checkbox>

},
{
            
    mainCategory: mainCategoryEVC.EVC02,
    
    timeUpdate: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition} >{EVC_STT02Value}</span>,
modbus: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}>{modbusEVC2.GVA}</span> ,

name: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}>{TagName.GVA}	 </span> ,

value: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Conditionformat} {nameValue.m3}</span> , 
 high: <InputText  
disabled={AuthInputHighLow}
 
 style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
 low:  <InputText  
disabled={AuthInputHighLow}
 
 style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Volume_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
 update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
 Maintain:   <Checkbox
 style={{ marginRight: 20, }}
 onChange={ChangemaintainEVC_02_Volume_at_Measurement_Condition} 
 checked={maintainEVC_02_Volume_at_Measurement_Condition}
></Checkbox>

},
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}>{modbusEVC2.SVF}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}>{TagName.SVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Conditionformat} {nameValue.Sm3h} </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Base_Condition} onChange={handleInputChange2EVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_02_Flow_at_Base_Condition}
         checked={maintainEVC_02_Flow_at_Base_Condition}
     ></Checkbox>

        },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}>{modbusEVC2.GVF}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}>{TagName.GVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Conditionformat} {nameValue.m3h} </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Flow_at_Measurement_Condition} onChange={handleInputChange2EVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangemaintainEVC_02_Flow_at_Measurement_Condition}
         checked={maintainEVC_02_Flow_at_Measurement_Condition}
     ></Checkbox>
         

        },
         
       
     



        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day}>{modbusEVC2.VB_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day}> {TagName.Vb_Today}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day} > {VBTodayformat2} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Current_Day} onChange={handleInputChangeEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Current_Day} onChange={handleInputChange2EVC_02_Vb_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_02_Vb_of_Current_Day}
        checked={maintainEVC_02_Vb_of_Current_Day}
    ></Checkbox>

       },

        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day}>{modbusEVC2.VM_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day}> {TagName.Vm_Today}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day} > {VMTodayformat2} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Current_Day} onChange={handleInputChangeEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Current_Day} onChange={handleInputChange2EVC_02_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_02_Vm_of_Current_Day}
        checked={maintainEVC_02_Vm_of_Current_Day}
    ></Checkbox>

       },

        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day}>{modbusEVC2.VB_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day}> {TagName.Vb_Yesterday}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day} > {VBLastdayformat2} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vb_of_Last_Day} onChange={handleInputChangeEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vb_of_Last_Day} onChange={handleInputChange2EVC_02_Vb_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_02_Vb_of_Last_Day}
        checked={maintainEVC_02_Vb_of_Last_Day}
    ></Checkbox>

       },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day}>{modbusEVC2.VM_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day}> {TagName.Vm_Yesterday}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day} > {VmLastdayformat2} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Vm_of_Last_Day} onChange={handleInputChangeEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Vm_of_Last_Day} onChange={handleInputChange2EVC_02_Vm_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEVC_02_Vm_of_Last_Day}
        checked={maintainEVC_02_Vm_of_Last_Day}
    ></Checkbox>

       },
       { 
        mainCategory: mainCategoryEVC.EVC02,
        
        timeUpdate: <span style={combineCss.CSS_EVC_02_Conn_STT} >{EVC_STT01Value}</span>,
    modbus: <span style={combineCss.CSS_EVC_02_Conn_STT}>{modbusEVC1.EVC_02_Conn_STT}</span> ,

    name: <span style={combineCss.CSS_EVC_02_Conn_STT}> {TagName.EVC_02_Conn_STT} </span> ,

    value: <span style={combineCss.CSS_EVC_02_Conn_STT} > {EVC_02_Conn_STT} {DataEVC_02_Conn_STT}</span>, 
    high: <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValueEVC_02_Conn_STT} onChange={handleInputChangeEVC_02_Conn_STT} inputMode="decimal" />, 
    low:  <InputText  
disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2EVC_02_Conn_STT} onChange={handleInputChange2EVC_02_Conn_STT} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangemaintainEVC_02_Conn_STT}
    checked={maintainEVC_02_Conn_STT}
></Checkbox>

    },

 
       
      ]





      const PT1format =
      PT1 !== null ? parseFloat(PT1).toFixed(2) : "";


      const paragraphContentsPLC = {

        EVC_02_Pressure:"Input Pressure PT-1903",
        GD1:"Gas Detector GD-1901",
        GD2:"Gas Detector GD-1902",
        GD3:"Gas Detector GD-1903",
        SOLENOID:"SDV-SOLENOID",
        SDV_SZC:"SDV-ZSC",
        SDV_SZO:"SDV-ZSO",
        UPS_BATTERY:"UPS BATTERY",
        UPS_CHARGING:"UPS CHARGING",
        UPS_ALARM:" UPS ALARM",
        UPS_MODE:"UPS MODE",
        SELECT_SW:"SELECT SW",
        RESET:"RESET",
        EMERGENCY_NO:"Emergency Stop NO",
        EMERGENCY_NC:"Emergency Stop NC",
        HORN:"HORN",
        DO_BC_01:"BEACON",
        MAP:"MAP",
      }


      

      const dataPLC = [
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSGD1}>{modbusPLC.GD1}</span> ,
   
        name: <span style={combineCss.CSSGD1}>{PLC_OTSUKA.GD1} </span> ,
        value: <span style={combineCss.CSSGD1} > {GD1} {nameValue.LEL}</span> , 
         high: <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputValueGD1} onChange={handleInputChangeGD1} inputMode="decimal" />, 
         low:  <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1} onChange={handleInputChange2GD1} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD1}
         checked={maintainGD1}
     ></Checkbox>
   
        },
   
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSGD2}>{modbusPLC.GD2}</span> ,
   
        name: <span style={combineCss.CSSGD2}>{PLC_OTSUKA.GD2} </span> ,
        value: <span style={combineCss.CSSGD2} > {GD2} {nameValue.LEL}</span> , 
         high: <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputValueGD2} onChange={handleInputChangeGD2} inputMode="decimal" />, 
         low:  <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2} onChange={handleInputChange2GD2} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD2}
         checked={maintainGD2}
     ></Checkbox>
   
        },

        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSgd3} >{PLC_STTValue}</span>,
        modbus: <span  style={combineCss.CSSgd3}>{modbusPLC.GD3}</span> ,
   
        name: <span style={combineCss.CSSgd3}>{PLC_OTSUKA.GD3}</span> ,
        value: <span style={combineCss.CSSgd3} > {GD3} {nameValue.LEL}</span> , 
         high: <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSgd3}   placeholder='High' step="0.1" type='number' value={inputValueGD3} onChange={handleInputChangeGD3} inputMode="decimal" />, 
         low:  <InputText  
    disabled={AuthInput}
         
         style={combineCss.CSSgd3}   placeholder='Low' step="0.1" type='number' value={inputValue2GD3} onChange={handleInputChange2GD3} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD3}
         checked={maintainGD3}
     ></Checkbox>
   
        },
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSSPT1} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSPT1}>{modbusPLC.PT1}</span> ,

        name: <span style={combineCss.CSSPT1}>{PLC_OTSUKA.PT1}</span> ,
        value: <span style={combineCss.CSSPT1} > {PT1format} {nameValue.BARG}</span> , 
         high: <InputText  
 disabled={AuthInput}
         
         style={combineCss.CSSPT1}   placeholder='High' step="0.1" type='number' value={inputValuePT1} onChange={handleInputChangePT1} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInput}
         
         style={combineCss.CSSPT1}   placeholder='Low' step="0.1" type='number' value={inputValue2PT1} onChange={handleInputChange2PT1} inputMode="decimal" />,
      update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainPT1}
      checked={maintainPT1}
  ></Checkbox>

        },

        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSS_ZSO} >{PLC_STTValue}</span>,
    modbus: <span style={combineCss.CSS_ZSO}>{modbusPLC.SDV_ZSO}</span> ,

       name: <span style={combineCss.CSS_ZSO}>{PLC_OTSUKA.DI_ZSO_1} </span> ,
       value: <span style={combineCss.CSS_ZSO} > {DI_ZSO_1} {DataDI_ZSO_1}</span> , 
       high: <InputText  
 disabled={AuthInput}
       
       style={combineCss.CSS_ZSO}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSO_1} onChange={handleInputChangeDI_ZSO_1} inputMode="decimal" />, 
       low:  <InputText  
 disabled={AuthInput}
       
       style={combineCss.CSS_ZSO}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSO_1} onChange={handleInputChange2DI_ZSO_1} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainDI_ZSO_1}
       checked={maintainDI_ZSO_1}
   ></Checkbox>
       },
       
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_ZSC} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_ZSC}>{modbusPLC.SDV_ZSC}</span> ,

        name: <span style={combineCss.CSS_ZSC}>{PLC_OTSUKA.DI_ZSC_1} </span> ,
        value: <span style={combineCss.CSS_ZSC} > {DI_ZSC_1} {DataDI_ZSC_1}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_ZSC}   placeholder='High' step="0.1" type='number' value={inputValueDI_ZSC_1} onChange={handleInputChangeDI_ZSC_1} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_ZSC}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_ZSC_1} onChange={handleInputChange2DI_ZSC_1} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDI_ZSC_1}
        checked={maintainDI_ZSC_1}
    ></Checkbox>
        },

        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSS_Map} >{PLC_STTValue}</span>,
    modbus: <span style={combineCss.CSS_Map}>{modbusPLC.DI_MAP_1}</span> ,

       name: <span style={combineCss.CSS_Map}>{paragraphContentsPLC.MAP} </span> ,
       value: <span style={combineCss.CSS_Map} > {DI_MAP_1} {DataDI_MAP_1}</span> , 
       high: <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_Map}   placeholder='High' step="0.1" type='number' value={inputValueDI_MAP_1} onChange={handleInputChangeDI_MAP_1} inputMode="decimal" />, 
       low:  <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_Map}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_MAP_1} onChange={handleInputChange2DI_MAP_1} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainDI_MAP_1}
       checked={maintainDI_MAP_1}
   ></Checkbox>
       },

        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSS_DI_UPS_BATTERY} >{PLC_STTValue}</span>,
    modbus: <span style={combineCss.CSS_DI_UPS_BATTERY} >{modbusPLC.UPS_BATTERY}</span> ,

       name: <span style={combineCss.CSS_DI_UPS_BATTERY}>{TagName.UPS_BATTERY}</span> ,
       value: <span style={combineCss.CSS_DI_UPS_BATTERY} > {DI_UPS_BATTERY} {DataBattery}</span> , 
       high: <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_DI_UPS_BATTERY}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_BATTERY} onChange={handleInputChangeDI_UPS_BATTERY} inputMode="decimal" />, 
       low:  <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_DI_UPS_BATTERY}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_BATTERY} onChange={handleInputChange2DI_UPS_BATTERY} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainDI_UPS_BATTERY}
       checked={maintainDI_UPS_BATTERY}
   ></Checkbox>
       },
      
     
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_UPS_CHARGING} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_UPS_CHARGING}>{modbusPLC.UPS_CHARGING}</span> ,

        name: <span style={combineCss.CSS_DI_UPS_CHARGING}>{TagName.UPS_CHARGING}</span> ,
        value: <span style={combineCss.CSS_DI_UPS_CHARGING} > {DI_UPS_CHARGING} {DataCharging}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_CHARGING}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_CHARGING} onChange={handleInputChangeDI_UPS_CHARGING} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_CHARGING}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_CHARGING} onChange={handleInputChange2DI_UPS_CHARGING} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDI_UPS_CHARGING}
        checked={maintainDI_UPS_CHARGING}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_UPS_ALARM} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_UPS_ALARM}>{modbusPLC.UPS_ALARM}</span> ,

        name: <span style={combineCss.CSS_DI_UPS_ALARM}>{TagName.UPS_ALARM} </span> ,
        value: <span style={combineCss.CSS_DI_UPS_ALARM} > {DI_UPS_ALARM} {DataAlarm}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_ALARM}   placeholder='High' step="0.1" type='number' value={inputValueDI_UPS_ALARM} onChange={handleInputChangeDI_UPS_ALARM} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_ALARM}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_UPS_ALARM} onChange={handleInputChange2DI_UPS_ALARM} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDI_UPS_ALARM}
        checked={maintainDI_UPS_ALARM}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_UPS_Mode} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_UPS_Mode}>{modbusPLC.UPS_MODE}</span> ,

        name: <span style={combineCss.CSS_UPS_Mode}>{TagName.UPS_MODE} </span> ,
        value: <span style={combineCss.CSS_UPS_Mode} > {UPS_Mode} {DataMode}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_UPS_Mode}   placeholder='High' step="0.1" type='number' value={inputValueUPS_Mode} onChange={handleInputChangeUPS_Mode} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_UPS_Mode}   placeholder='Low' step="0.1" type='number' value={inputValue2UPS_Mode} onChange={handleInputChange2UPS_Mode} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainUPS_Mode}
        checked={maintainUPS_Mode}
    ></Checkbox>
        },
       
    
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_SELECT_SW} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_SELECT_SW}>{modbusPLC.DI_SELECT_SW}</span> ,

        name: <span style={combineCss.CSS_DI_SELECT_SW}>{TagName.SELECT_SW}</span> ,
        value: <span style={combineCss.CSS_DI_SELECT_SW} > {DI_SELECT_SW} {DataDI_SELECT_SW}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_SELECT_SW}   placeholder='High' step="0.1" type='number' value={inputValueDI_SELECT_SW} onChange={handleInputChangeDI_SELECT_SW} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_SELECT_SW}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_SELECT_SW} onChange={handleInputChange2DI_SELECT_SW} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDI_SELECT_SW}
        checked={maintainDI_SELECT_SW}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Reset} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_Reset}>{modbusPLC.RESET}</span> ,

        name: <span style={combineCss.CSS_Reset}>{TagName.RESET} </span> ,
        value: <span style={combineCss.CSS_Reset} > {DI_RESET} {DataReset}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Reset}   placeholder='High' step="0.1" type='number' value={inputValueDI_RESET} onChange={handleInputChangeDI_RESET} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Reset}   placeholder='Low' step="0.1" type='number' value={inputValue2DI_RESET} onChange={handleInputChange2DI_RESET} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDI_RESET}
        checked={maintainDI_RESET}
    ></Checkbox>
        },
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSS_Emergency_NO} >{PLC_STTValue}</span>,
    modbus : <span style={combineCss.CSS_Emergency_NO}>{modbusPLC.Emergency_Stop_NO}</span> ,

       name: <span style={combineCss.CSS_Emergency_NO}>{TagName.EMER_NO}</span> ,
       value: <span style={combineCss.CSS_Emergency_NO} > {Emergency_NO} {DataEmergency_NO}</span> , 
       high: <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_Emergency_NO}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NO} onChange={handleInputChangeEmergency_NO} inputMode="decimal" />, 
       low:  <InputText  
disabled={AuthInput}
       
       style={combineCss.CSS_Emergency_NO}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NO} onChange={handleInputChange2Emergency_NO} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangemaintainEmergency_NO}
       checked={maintainEmergency_NO}
   ></Checkbox>
       },
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Emergency_NC} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_Emergency_NC}>{modbusPLC.Emergency_Stop_NC}</span> ,

        name: <span style={combineCss.CSS_Emergency_NC}>{TagName.EMER_NC} </span> ,
        value: <span style={combineCss.CSS_Emergency_NC} > {Emergency_NC} {DataEmergency_NC}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NC}   placeholder='High' step="0.1" type='number' value={inputValueEmergency_NC} onChange={handleInputChangeEmergency_NC} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NC}   placeholder='Low' step="0.1" type='number' value={inputValue2Emergency_NC} onChange={handleInputChange2Emergency_NC} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainEmergency_NC}
        checked={maintainEmergency_NC}
    ></Checkbox>
        },
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_SELENOID} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_SELENOID}>{modbusPLC.SDV_SOLENOID}</span> ,

        name: <span style={combineCss.CSS_SELENOID}>{PLC_OTSUKA.SV_1} </span> ,
        value: <span style={combineCss.CSS_SELENOID} > {DO_SV1} {DataSV_1}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_SELENOID}   placeholder='High' step="0.1" type='number' value={inputValueDO_SV1} onChange={handleInputChangeDO_SV1} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_SELENOID}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_SV1} onChange={handleInputChange2DO_SV1} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV}  className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDO_SV1}
        checked={maintainDO_SV1}
    ></Checkbox>
        },
     
     

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Horn} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_Horn}>{modbusPLC.HORN}</span> ,

        name: <span style={combineCss.CSS_Horn}>{paragraphContentsPLC.HORN} </span> ,
        value: <span style={combineCss.CSS_Horn} > {DO_HR_01} {DataHorn}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Horn}   placeholder='High' step="0.1" type='number' value={inputValueDO_HR_01} onChange={handleInputChangeDO_HR_01} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Horn}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_HR_01} onChange={handleInputChange2DO_HR_01} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDO_HR_01}
        checked={maintainDO_HR_01}
    ></Checkbox>
        },
      
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DO_BC_01} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DO_BC_01}>{modbusPLC.DO_BC_01}</span> ,

        name: <span style={combineCss.CSS_DO_BC_01}>{paragraphContentsPLC.DO_BC_01} </span> ,
        value: <span style={combineCss.CSS_DO_BC_01} > {DO_BC_01} {DataDO_BC_01}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DO_BC_01}   placeholder='High' step="0.1" type='number' value={inputValueDO_BC_01} onChange={handleInputChangeDO_BC_01} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DO_BC_01}   placeholder='Low' step="0.1" type='number' value={inputValue2DO_BC_01} onChange={handleInputChange2DO_BC_01} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainDO_BC_01}
        checked={maintainDO_BC_01}
    ></Checkbox>
        },
        { 
            mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_PLC_Conn_STT} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_PLC_Conn_STT}>{modbusPLC.PLC_Conn_STT}</span> ,
    
        name: <span style={combineCss.CSS_PLC_Conn_STT}> {TagName.PLC_Conn_STT} </span> ,
    
        value: <span style={combineCss.CSS_PLC_Conn_STT} > {PLC_Conn_STT} {DataPLC_Conn_STT}</span>, 
        high: <InputText  
    disabled={AuthInputHighLow}
        
        style={combineCss.CSS_PLC_Conn_STT}   placeholder='High' step="0.1" type='number' value={inputValuePLC_Conn_STT} onChange={handleInputChangePLC_Conn_STT} inputMode="decimal" />, 
        low:  <InputText  
    disabled={AuthInputHighLow}
        
        style={combineCss.CSS_PLC_Conn_STT}    placeholder='Low' step="0.1" type='number' value={inputValue2PLC_Conn_STT} onChange={handleInputChange2PLC_Conn_STT} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangemaintainPLC_Conn_STT}
        checked={maintainPLC_Conn_STT}
    ></Checkbox>
    
        },
      ]

      const combinedData = [...dataEVC01, ...dataEVC02, ...dataPLC];

      const mainCategoryTemplate = (data: any) => {
          return (
              <div style={{fontWeight:600, fontSize:23,background:'#f8faEVC'}}>
                  <span >{data.mainCategory}</span>
              </div>
          );
      };
      const maintainHeader = (
        <div>

            {!AuthInput && (
                <Checkbox
                    style={{ marginRight: 5 }}
                    onChange={handleCheckboxChange}
                    checked={maintainEVC_01_Remain_Battery_Service_Life}
                />
            )} 
            Maintain

        </div>
    );


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:10 }}>
            
         
        <Toast ref={toast} />

        <ConfirmDialog />

        <h2>OTSUKA</h2>
     
      
        <div style={{width:'100%' ,  borderRadius:5 }}>

        <DataTable rowGroupMode="subheader"
                size={'small'}      resizableColumns
        tableStyle={{ minWidth: '50rem' }}   value={combinedData}  groupRowsBy="mainCategory"  
        sortOrder={1}   rowGroupHeaderTemplate={mainCategoryTemplate}   >

      <Column field="timeUpdate" header="Time Update" />
      <Column field="modbus" header="Address" />

      <Column field="name" header="Name" />

      <Column field="value" header="Value" />
      <Column  field="high" header="High" />
      <Column field="low" header="Low" />
      {AuthInput ? " " :  <Column field="Maintain" header={maintainHeader} />
}
      {AuthInput ?  " " : <Column field="update" header="Update" /> }

    </DataTable>

    </div>
<br />



<div style={{width:'100%' ,  borderRadius:5,   }}>

<SetAttribute/>
</div>

{/* <div style={{width:'100%' ,  borderRadius:5,   }}>

<SetAttributeTest/>
</div> */}
<br />
<br />
        
    </div>
    
    );
}
