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
import { nameValue } from '../namValue';
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


    const [inputValue, setInputValue] = useState<any>();
    const [inputValue2, setInputValue2] = useState<any>();
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
                        DO_BC_01:setDO_BC_01


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
            setHighEVC_01_PressureValue(highEVC_01_Pressure?.value || null);
            const lowEVC_01_Pressure = res.data.find((item: any) => item.key === "EVC_01_Pressure_Low");
            setLowEVC_01_PressureValue(lowEVC_01_Pressure?.value || null);

            const highEVC_02_PressurePressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_High");
            setHighEVC_02_PressurePressureValue(highEVC_02_PressurePressureItem?.value || null);
            const lowEVC_02_PressurePressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_Low");
            setLowEVC_02_PressurePressureValue(lowEVC_02_PressurePressureItem?.value || null);

            const highPT1PressureItem = res.data.find((item: any) => item.key === "PT1_High");
            setHighPT1PressureValue(highPT1PressureItem?.value || null);
            const lowPT1PressureItem = res.data.find((item: any) => item.key === "PT1_Low");
            setLowPT1PressureValue(lowPT1PressureItem?.value || null);

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

            const HighGD1 = res.data.find((item: any) => item.key === "GD1_High");
            setHighGD1(HighGD1?.value || null);
            const LowGD1 = res.data.find((item: any) => item.key === "GD1_Low");
            setLowGD1(LowGD1?.value || null);

            const HighGD2 = res.data.find((item: any) => item.key === "GD2_High");
            setHighGD2(HighGD2?.value || null);
            const LowGD2 = res.data.find((item: any) => item.key === "GD2_Low");
            setLowGD2(LowGD2?.value || null);

            const HighGD3 = res.data.find((item: any) => item.key === "GD3_High");
            setHighGD3(HighGD3?.value || null);
            const LowGD3 = res.data.find((item: any) => item.key === "GD3_Low");
            setLowGD3(LowGD3?.value || null);


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

            const HighEVC_01_Flow_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_High");
            setHighEVC_01_Flow_at_Measurement_Condition(HighEVC_01_Flow_at_Measurement_Condition?.value || null);
            const LowEVC_01_Flow_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Low");
            setLowEVC_01_Flow_at_Measurement_Condition(LowEVC_01_Flow_at_Measurement_Condition?.value || null);

            const HighEVC_01_Flow_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High");
            setHighEVC_01_Flow_at_Base_Condition(HighEVC_01_Flow_at_Base_Condition?.value || null);
            const LowEVC_01_Flow_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low");
            setLowEVC_01_Flow_at_Base_Condition(LowEVC_01_Flow_at_Base_Condition?.value || null);

            const HighEVC_01_Volume_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_High");
            setHighEVC_01_Volume_at_Base_Condition(HighEVC_01_Volume_at_Base_Condition?.value || null);
            const LowEVC_01_Volume_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Low");
            setLowEVC_01_Volume_at_Base_Condition(LowEVC_01_Volume_at_Base_Condition?.value || null);

            const HighEVC_01_Volume_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_High");
            setHighEVC_01_Volume_at_Measurement_Condition(HighEVC_01_Volume_at_Measurement_Condition?.value || null);
            const LowEVC_01_Volume_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Low");
            setLowEVC_01_Volume_at_Measurement_Condition(LowEVC_01_Volume_at_Measurement_Condition?.value || null);

            const HighEVC_02_Flow_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
            setHighEVC_02_Flow_at_Measurement_Condition(HighEVC_02_Flow_at_Measurement_Condition?.value || null);
            const LowEVC_02_Flow_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
            setLowEVC_02_Flow_at_Measurement_Condition(LowEVC_02_Flow_at_Measurement_Condition?.value || null);

            const HighEVC_02_Flow_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High");
            setHighEVC_02_Flow_at_Base_Condition(HighEVC_02_Flow_at_Base_Condition?.value || null);
            const LowEVC_02_Flow_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low");
            setLowEVC_02_Flow_at_Base_Condition(LowEVC_02_Flow_at_Base_Condition?.value || null);

            const HighEVC_02_Volume_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
            setHighEVC_02_Volume_at_Base_Condition(HighEVC_02_Volume_at_Base_Condition?.value || null);
            const LowEVC_02_Volume_at_Base_Condition = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
            setLowEVC_02_Volume_at_Base_Condition(LowEVC_02_Volume_at_Base_Condition?.value || null);

            const HighEVC_02_Volume_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
            setHighEVC_02_Volume_at_Measurement_Condition(HighEVC_02_Volume_at_Measurement_Condition?.value || null);
            const LowEVC_02_Volume_at_Measurement_Condition = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
            setLowEVC_02_Volume_at_Measurement_Condition(LowEVC_02_Volume_at_Measurement_Condition?.value || null);


            const MaintainSVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );
            setMaintainEVC_01_Flow_at_Base_Condition(MaintainSVF_1?.value || false);

            const MaintainGVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_01_Flow_at_Measurement_Condition(MaintainGVF_1?.value || false);

            const MaintainSVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setMaintainEVC_01_Volume_at_Base_Condition(MaintainSVA_1?.value || false);

            const MaintainGVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_01_Volume_at_Measurement_Condition(MaintainGVA_1?.value || false);

            const MaintainSVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Maintain" 
            );
            setMaintainEVC_02_Flow_at_Base_Condition(MaintainSVF_2?.value || false);

            const MaintainGVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_02_Flow_at_Measurement_Condition(MaintainGVF_2?.value || false);

            const MaintainSVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            setMaintainEVC_02_Volume_at_Base_Condition(MaintainSVA_2?.value || false);

            const MaintainGVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainEVC_02_Volume_at_Measurement_Condition(MaintainGVA_2?.value || false);
//=====================================================================================

            const HightEVC_01_Temperature = res.data.find((item: any) => item.key === "EVC_01_Temperature_High");
            setHighEVC_01_Temperature(HightEVC_01_Temperature?.value || null);
            const LowEVC_01_Temperature = res.data.find((item: any) => item.key === "EVC_01_Temperature_Low");
            setLowEVC_01_Temperature(LowEVC_01_Temperature?.value || null);

            const HightEVC_02_Temperature = res.data.find((item: any) => item.key === "EVC_02_Temperature_High");
            setHighEVC_02_Temperature(HightEVC_02_Temperature?.value || null);
            const LowEVC_02_Temperature = res.data.find((item: any) => item.key === "EVC_02_Temperature_Low");
            setLowEVC_02_Temperature(LowEVC_02_Temperature?.value || null);


            const MaintainTemperature_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Maintain"
            );
            setMaintainEVC_01_Temperature(MaintainTemperature_01?.value || false);


            const MaintainTemperature_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );
            setMaintainEVC_02_Temperature(MaintainTemperature_02?.value || false);
//=====================================================================================


            const HighEVC_01_Remain_Battery_Service_Life = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_High");
            setHighEVC_01_Remain_Battery_Service_Life(HighEVC_01_Remain_Battery_Service_Life?.value || null);
            const LowEVC_01_Remain_Battery_Service_Life = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Low");
            setLowEVC_01_Remain_Battery_Service_Life(LowEVC_01_Remain_Battery_Service_Life?.value || null);

            const HighEVC_02_Remain_Battery_Service_Life = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_High");
            setHighEVC_02_Remain_Battery_Service_Life(HighEVC_02_Remain_Battery_Service_Life?.value || null);
            const LowEVC_02_Remain_Battery_Service_Life = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Low");
            setLowEVC_02_Remain_Battery_Service_Life(LowEVC_02_Remain_Battery_Service_Life?.value || null);


            const MaintainReBattery_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Maintain"
            );
            setMaintainEVC_01_Remain_Battery_Service_Life(MaintainReBattery_01?.value || false);

            const MaintainReBattery_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Maintain"
            );
            setMaintainEVC_02_Remain_Battery_Service_Life(MaintainReBattery_02?.value || false);
//=====================================================================================

            const HighEVC_01_Vm_of_Last_Day = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setHighEVC_01_Vm_of_Last_Day(HighEVC_01_Vm_of_Last_Day?.value || null);
            const LowEVC_01_Vm_of_Last_Day = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setLowEVC_01_Vm_of_Last_Day(LowEVC_01_Vm_of_Last_Day?.value || null);

            const HighEVC_01_Vm_of_Current_Day = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_High");
            setHighEVC_01_Vm_of_Current_Day(HighEVC_01_Vm_of_Current_Day?.value || null);
            const LowEVC_01_Vm_of_Current_Day = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_Low");
            setLowEVC_01_Vm_of_Current_Day(LowEVC_01_Vm_of_Current_Day?.value || null);


            const HighEVC_01_Vb_of_Last_Day = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_High");
            setHighEVC_01_Vb_of_Last_Day(HighEVC_01_Vb_of_Last_Day?.value || null);
            const LowEVC_01_Vb_of_Last_Day = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_Low");
            setLowEVC_01_Vb_of_Last_Day(LowEVC_01_Vb_of_Last_Day?.value || null);


            const HighEVC_02_Vb_of_Last_Day = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_High");
            setHighEVC_02_Vb_of_Last_Day(HighEVC_02_Vb_of_Last_Day?.value || null);
            const LowEVC_02_Vb_of_Last_Day = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_Low");
            setLowEVC_02_Vb_of_Last_Day(LowEVC_02_Vb_of_Last_Day?.value || null);


            const MaintainVmLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );
            setMaintainEVC_01_Vm_of_Last_Day(MaintainVmLastDay_01?.value || false);


            const MaintainVmLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );
            setMaintainEVC_02_Vm_of_Last_Day(MaintainVmLastDay_02?.value || false);


            const MaintainVbLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Last_Day_Maintain"
            );
            setMaintainEVC_01_Vb_of_Last_Day(MaintainVbLastDay_01?.value || false);


            const MaintainVbLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vb_of_Last_Day_Maintain"
            );
            setMaintainEVC_02_Vb_of_Last_Day(MaintainVbLastDay_02?.value || false);
//=====================================================================================


const HighEVC_02_Vm_of_Last_Day = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
setHighEVC_02_Vm_of_Last_Day(HighEVC_02_Vm_of_Last_Day?.value || null);
const LowEVC_02_Vm_of_Last_Day = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
setLowEVC_02_Vm_of_Last_Day(LowEVC_02_Vm_of_Last_Day?.value || null);

const HighEVC_02_Vm_of_Current_Day = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_High");
setHighEVC_02_Vm_of_Current_Day(HighEVC_02_Vm_of_Current_Day?.value || null);
const LowEVC_02_Vm_of_Current_Day = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_Low");
setLowEVC_02_Vm_of_Current_Day(LowEVC_02_Vm_of_Current_Day?.value || null);

const HighEVC_01_Vb_of_Current_Day = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_High");
setHighEVC_01_Vb_of_Current_Day(HighEVC_01_Vb_of_Current_Day?.value || null);
const LowEVC_01_Vb_of_Current_Day = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_Low");
setLowEVC_01_Vb_of_Current_Day(LowEVC_01_Vb_of_Current_Day?.value || null);


const HighEVC_02_Vb_of_Current_Day = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_High");
setHighEVC_02_Vb_of_Current_Day(HighEVC_02_Vb_of_Current_Day?.value || null);
const LowEVC_02_Vb_of_Current_Day = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_Low");
setLowEVC_02_Vb_of_Current_Day(LowEVC_02_Vb_of_Current_Day?.value || null);

const MaintainVmToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vm_of_Current_Day_Maintain"
);
setMaintainEVC_01_Vm_of_Current_Day(MaintainVmToDay_01?.value || false);


const MaintainVmToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vm_of_Current_Day_Maintain"
);
setMaintainEVC_02_Vm_of_Current_Day(MaintainVmToDay_02?.value || false);


const MaintainVbToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vb_of_Current_Day_Maintain"
);
setMaintainEVC_01_Vb_of_Current_Day(MaintainVbToDay_01?.value || false);


const MaintainVbToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vb_of_Current_Day_Maintain"
);
setMaintainEVC_02_Vb_of_Current_Day(MaintainVbToDay_02?.value || false);

//=====================================================================================

const HighDI_UPS_BATTERY = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
setHighDI_UPS_BATTERY(HighDI_UPS_BATTERY?.value || null);
const LowDI_UPS_BATTERY = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
setLowDI_UPS_BATTERY(LowDI_UPS_BATTERY?.value || null);

const MaintainDI_UPS_BATTERY = res.data.find(
    (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
);
setMaintainDI_UPS_BATTERY(MaintainDI_UPS_BATTERY?.value || false);
//=====================================================================================


const HighDI_UPS_CHARGING = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_High");
setHighDI_UPS_CHARGING(HighDI_UPS_CHARGING?.value || null);
const LowDI_UPS_CHARGING = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_Low");
setLowDI_UPS_CHARGING(LowDI_UPS_CHARGING?.value || null);
const MaintainDI_UPS_CHARGING = res.data.find(
    (item: any) => item.key === "DI_UPS_CHARGING_Maintain"
);
setMaintainDI_UPS_CHARGING(MaintainDI_UPS_CHARGING?.value || false);
//=====================================================================================

const HighDI_UPS_ALARM = res.data.find((item: any) => item.key === "DI_UPS_ALARM_High");
setHighDI_UPS_ALARM(HighDI_UPS_ALARM?.value || null);
const LowDI_UPS_ALARM = res.data.find((item: any) => item.key === "DI_UPS_ALARM_Low");
setLowDI_UPS_ALARM(LowDI_UPS_ALARM?.value || null);

const MaintainDI_UPS_ALARM = res.data.find(
    (item: any) => item.key === "DI_UPS_ALARM_Maintain"
);
setMaintainDI_UPS_ALARM(MaintainDI_UPS_ALARM?.value || false);
//=====================================================================================

const HighUPS_Mode = res.data.find((item: any) => item.key === "UPS_Mode_High");
setHighUPS_Mode(HighUPS_Mode?.value || null);
const LowUPS_Mode = res.data.find((item: any) => item.key === "UPS_Mode_Low");
setLowUPS_Mode(LowUPS_Mode?.value || null);

const MaintainUPS_Mode = res.data.find(
    (item: any) => item.key === "UPS_Mode_Maintain"
);
setMaintainUPS_Mode(MaintainUPS_Mode?.value || false);
//=====================================================================================
const HighDI_SELECT_SW = res.data.find((item: any) => item.key === "DI_SELECT_SW_High");
setHighDI_SELECT_SW(HighDI_SELECT_SW?.value || null);
const LowDI_SELECT_SW = res.data.find((item: any) => item.key === "DI_SELECT_SW_Low");
setLowDI_SELECT_SW(LowDI_SELECT_SW?.value || null);

const MaintainSelect = res.data.find(
    (item: any) => item.key === "DI_SELECT_SW_Maintain"
);
setMaintainDI_SELECT_SW(MaintainSelect?.value || false);
//=====================================================================================

const HighEmergency_NC = res.data.find((item: any) => item.key === "Emergency_NC_High");
setHighEmergency_NC(HighEmergency_NC?.value || null);
const LowEmergency_NC = res.data.find((item: any) => item.key === "Emergency_NC_Low");
setLowEmergency_NC(LowEmergency_NC?.value || null);

const MaintainEmergency_NC = res.data.find(
    (item: any) => item.key === "Emergency_NC_Maintain"
);
setMaintainEmergency_NC(MaintainEmergency_NC?.value || false);
//=====================================================================================

const HighEmergency_NO = res.data.find((item: any) => item.key === "Emergency_NO_High");
setHighEmergency_NO(HighEmergency_NO?.value || null);
const LowEmergency_NO = res.data.find((item: any) => item.key === "Emergency_NO_Low");
setLowEmergency_NO(LowEmergency_NO?.value || null);

const MaintainEmergency_NO = res.data.find(
    (item: any) => item.key === "Emergency_NO_Maintain"
);
setMaintainEmergency_NO(MaintainEmergency_NO?.value || false);
//=====================================================================================


//=====================================================================================

const HighDI_RESET = res.data.find((item: any) => item.key === "DI_RESET_High");
setHighDI_RESET(HighDI_RESET?.value || null);
const LowDI_RESET = res.data.find((item: any) => item.key === "DI_RESET_Low");
setLowDI_RESET(LowDI_RESET?.value || null);

const MaintainDI_RESET = res.data.find(
    (item: any) => item.key === "DI_RESET_Maintain"
);
setMaintainDI_RESET(MaintainDI_RESET?.value || false);
//=====================================================================================

//=====================================================================================

const HighDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_High");
setHighDO_HR_01(HighDIHorn?.value || null);
const LowDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_Low");
setLowDO_HR_01(LowDIHorn?.value || null);

const MaintainDIHorn = res.data.find(
    (item: any) => item.key === "DO_HR_01_Maintain"
);
setMaintainDO_HR_01(MaintainDIHorn?.value || false);
//=====================================================================================

//=====================================================================================

const HighSOLENOID = res.data.find((item: any) => item.key === "DO_SV_01_High");
setHighDO_SV1(HighSOLENOID?.value || null);
const LowSOLENOID = res.data.find((item: any) => item.key === "DO_SV_01_Low");
setLowDO_SV1(LowSOLENOID?.value || null);

const MaintainSOLENOID = res.data.find(
    (item: any) => item.key === "DO_SV_01_Maintain"
);
setMaintainDO_SV1(MaintainSOLENOID?.value || false);
//=====================================================================================



//=====================================================================================

const HighZSC = res.data.find((item: any) => item.key === "DI_ZSC_1_High");
setInputHighDI_ZSC_1(HighZSC?.value || null);
const LowZSC = res.data.find((item: any) => item.key === "DI_ZSC_1_Low");
setInputLowDI_ZSC_1(LowZSC?.value || null);

const MaintainZSC_0 = res.data.find(
    (item: any) => item.key === "DI_ZSC_1_Maintain"
);
setMaintainDI_ZSC_1(MaintainZSC_0?.value || false);
//=====================================================================================

//=====================================================================================

const HighZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_High");
setHighDI_ZSO_1(HighZSO?.value || null);
const LowZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_Low");
setLowDI_ZSO_1(LowZSO?.value || null);

const MaintainZSO = res.data.find(
    (item: any) => item.key === "DI_ZSO_1_Maintain"
);
setMaintainDI_ZSO_1(MaintainZSO?.value || false);
//=====================================================================================



//=====================================================================================

const HighDI_MAP_1 = res.data.find((item: any) => item.key === "DI_MAP_1_High");
setHighDI_MAP_1(HighDI_MAP_1?.value || null);
const LowMap = res.data.find((item: any) => item.key === "DI_MAP_1_Low");
setLowDI_MAP_1(LowMap?.value || null);

const MaintainMap = res.data.find(
    (item: any) => item.key === "DI_MAP_1_Maintain"
);
setMaintainDI_MAP_1(MaintainMap?.value || false);
//=====================================================================================

//=====================================================================================

const HighDO_BC_01 = res.data.find((item: any) => item.key === "DO_BC_01_High");
setHighDO_BC_01(HighDO_BC_01?.value || null);
const LowDO_BC_01 = res.data.find((item: any) => item.key === "DO_BC_01_Low");
setLowDO_BC_01(LowDO_BC_01?.value || null);

const MaintainDO_BC_01 = res.data.find(
    (item: any) => item.key === "DO_BC_01_Maintain"
);
setMaintainDO_BC_01(MaintainDO_BC_01?.value || false);
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
const [audioPlaying, setAudioPlaying] = useState(false);
const [inputValueEVC_01_Pressure, setInputValueEVC_01_Pressure] = useState<any>();
const [inputValue2EVC_01_Pressure, setInputValue2EVC_01_Pressure] = useState<any>();
const [highEVC_01_PressureValue, setHighEVC_01_PressureValue] = useState<number | null>(null);
const [lowEVC_01_PressureValue, setLowEVC_01_PressureValue] = useState<number | null>(null);
const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_01_Pressure, setMaintainEVC_01_Pressure] = useState<boolean>(false);


    useEffect(() => {
        if (typeof highEVC_01_PressureValue === 'string' && typeof lowEVC_01_PressureValue === 'string' && EVC_01_Pressure !== null && maintainEVC_01_Pressure === false
        ) {
            const highValue = parseFloat(highEVC_01_PressureValue);
            const lowValue = parseFloat(lowEVC_01_PressureValue);
            const EVC_01_PressureValue = parseFloat(EVC_01_Pressure);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_PressureValue)) {
                if (highValue <= EVC_01_PressureValue || EVC_01_PressureValue <= lowValue) {
                    if (!audioPlaying) {
                        audioRef.current?.play();
                        setAudioPlaying(true);
                        setExceedThreshold(true);
                    }
                } else {
                    setAudioPlaying(false);
                    setExceedThreshold(false);
                }
            } 
        } 
    }, [highEVC_01_PressureValue, EVC_01_Pressure, audioPlaying, lowEVC_01_PressureValue,maintainEVC_01_Pressure]);

    useEffect(() => {
        if (audioPlaying) {
            const audioEnded = () => {
                setAudioPlaying(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlaying]);

    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const handleInputChange2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2(newValue2);
    };
    const ChangeMaintainEVC_01_Pressure = async () => {
        try {
            const newValue = !maintainEVC_01_Pressure;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Pressure_Maintain: newValue }
            );
            setMaintainEVC_01_Pressure(newValue);
            
        } catch (error) {}
    };

// ========================== PT 1901 ============================================

// ========================== PT 1902 ============================================


const [EVC_02_Pressure, setEVC_02_Pressure] = useState<string | null>(null);
const [inputValueEVC_02_PressureHigh, setInputValueEVC_02_PressureHigh] = useState<any>();
const [inputValueEK1Low, setInputValueEVC_02_PressureLow] = useState<any>();
const [highEVC_02_PressurePressureValue, setHighEVC_02_PressurePressureValue] = useState<number | null>(null);
const [lowEVC_02_PressurePressureValue, setLowEVC_02_PressurePressureValue] = useState<number | null>(null);
const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Pressure, setMaintainEVC_02_Pressure] = useState<boolean>(false);



    useEffect(() => {
        if (typeof highEVC_02_PressurePressureValue === 'string' && typeof lowEVC_02_PressurePressureValue === 'string' && EVC_02_Pressure !== null && maintainEVC_02_Pressure === false) {
            const highValue = parseFloat(highEVC_02_PressurePressureValue);
            const lowValue = parseFloat(lowEVC_02_PressurePressureValue);
            const EVC_02_PressureValue = parseFloat(EVC_02_Pressure);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_PressureValue)) {
                if (highValue <= EVC_02_PressureValue || EVC_02_PressureValue <= lowValue) {
                        setExceedThreshold2(true);
                } else {
                    setExceedThreshold2(false);
                }
            } 
        } 
    }, [highEVC_02_PressurePressureValue, EVC_02_Pressure, lowEVC_02_PressurePressureValue, maintainEVC_02_Pressure]);

    const handleInputChangeEVC_02_PressureHigh = (event: any) => {
        const newValue = event.target.value;
        setInputValueEVC_02_PressureHigh(newValue);
    };

    const handleInputChangeEVC_02_PressureLow = (event: any) => {
        const newValue2 = event.target.value;
        setInputValueEVC_02_PressureLow(newValue2);
    };

    const ChangeMaintainEVC_02_Pressure = async () => {
        try {
            const newValue = !maintainEVC_02_Pressure;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Pressure_Maintain: newValue }
            );
            setMaintainEVC_02_Pressure(newValue);
            
        } catch (error) {}
    };
// ========================== PT 1902 ============================================

// ========================== PT 1903 ============================================

const [PT1, setPT1] = useState<string | null>(null);
const [audioPlaying3, setAudioPlaying3] = useState(false);
const [inputValuePT1High, setInputValuePT1High] = useState<any>();
const [inputValuePT1Low, setInputValuePT1Low] = useState<any>();
const [highPT1PressureValue, setHighPT1PressureValue] = useState<number | null>(null);
const [lowPT1PressureValue, setLowPT1PressureValue] = useState<number | null>(null);
const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainPT1, setMaintainPT1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof highPT1PressureValue === 'string' && typeof lowPT1PressureValue === 'string' && PT1 !== null && maintainPT1 === false  ) {
            const highValue = parseFloat(highPT1PressureValue);
            const lowValue = parseFloat(lowPT1PressureValue);
            const PT1Value = parseFloat(PT1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT1Value)) {
                if (highValue <= PT1Value || PT1Value <= lowValue) {
                    if (!audioPlaying3) {
                        audioRef.current?.play();
                        setAudioPlaying3(true);
                        setExceedThreshold3(true);
                    }
                } else {
                    setAudioPlaying3(false);
                    setExceedThreshold3(false);
                }
            } 
        } 
    }, [highPT1PressureValue, PT1, audioPlaying3, lowPT1PressureValue,maintainPT1]);

    useEffect(() => {
        if (audioPlaying3) {
            const audioEnded = () => {
                setAudioPlaying3(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlaying3]);

    const handleInputChangePT1High = (event: any) => {
        const newValue = event.target.value;
        setInputValuePT1High(newValue);
    };

    const handleInputChangePT1Low = (event: any) => {
        const newValue2 = event.target.value;
        setInputValuePT1Low(newValue2);
    };

    const ChangeMaintainPT1 = async () => {
        try {
            const newValue = !maintainPT1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PT1_Maintain: newValue }
            );
            setMaintainPT1(newValue);
            
        } catch (error) {}
    };
// ========================== PT 1903 ============================================

// ========================== GD_01 ============================================

const [GD1, setGD1] = useState<string | null>(null);
const [AudioGD1, setAudioGD1] = useState(false);
const [inputHighGD1, setInputHighGD1] = useState<any>();
const [inputLowGD1, setInputLowGD1] = useState<any>();
const [HighGD1, setHighGD1] = useState<number | null>(null);
const [LowGD1, setLowGD1] = useState<number | null>(null);
const [AlarmGD1, setAlarmGD1] = useState(false);
const [maintainGD1, setMaintainGD1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD1 === 'string' && typeof LowGD1 === 'string' && GD1 !== null && maintainGD1 === false) {
            const highValue = parseFloat(HighGD1);
            const lowValue = parseFloat(LowGD1);
            const GD1Value = parseFloat(GD1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1Value)) {
                if (highValue <= GD1Value || GD1Value <= lowValue) {
                    if (!AudioGD1) {
                        audioRef.current?.play();
                        setAudioGD1(true);
                        setAlarmGD1(true);
                    }
                } else {
                    setAudioGD1(false);
                    setAlarmGD1(false);
                }
            } 
        } 
    }, [HighGD1, GD1, AudioGD1, LowGD1,maintainGD1]);

    useEffect(() => {
        if (AudioGD1) {
            const audioEnded = () => {
                setAudioGD1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD1]);

    const handleInputChangeHighGD1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD1(newValue);
    };

    const handleInputChangeLowGD1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD1(newValue2);
    };

    const ChangeMaintainGD_01 = async () => {
        try {
            const newValue = !maintainGD1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD1_Maintain: newValue }
            );
            setMaintainGD1(newValue);
            
        } catch (error) {}
    };
// ========================== GD_01 ============================================

// ========================== GD_02 ============================================
const [GD2, setGD2] = useState<string | null>(null);
const [AudioGD2, setAudioGD2] = useState(false);
const [inputHighGD2, setInputHighGD2] = useState<any>();
const [inputLowGD2, setInputLowGD2] = useState<any>();
const [HighGD2, setHighGD2] = useState<number | null>(null);
const [LowGD2, setLowGD2] = useState<number | null>(null);
const [AlarmGD2, setAlarmGD2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGD2, setMaintainGD2] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD2 === 'string' && typeof LowGD2 === 'string' && GD2 !== null && maintainGD2=== false ) {
            const highValue = parseFloat(HighGD2);
            const lowValue = parseFloat(LowGD2);
            const GD2Value = parseFloat(GD2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2Value)) {
                if (highValue <= GD2Value || GD2Value <= lowValue) {
                    if (!AudioGD2) {
                        audioRef.current?.play();
                        setAudioGD2(true);
                        setAlarmGD2(true);
                    }
                } else {
                    setAudioGD2(false);
                    setAlarmGD2(false);
                }
            } 
        } 
    }, [HighGD2, GD2, AudioGD2, LowGD2,maintainGD2]);

    useEffect(() => {
        if (AlarmGD2) {
            const audioEnded = () => {
                setAudioGD2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD2]);

    const handleInputChangeHighGD2 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD2(newValue);
    };

    const handleInputChangeLowGD2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD2(newValue2);
    };
    const ChangeMaintainGD_02 = async () => {
        try {
            const newValue = !maintainGD2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD2_Maintain: newValue }
            );
            setMaintainGD2(newValue);
            
        } catch (error) {}
    };
// ========================== GD_02 ============================================


// ========================== GD3 ============================================
const [GD3, setGD3] = useState<string | null>(null);
const [AudioGD3, setAudioGD3] = useState(false);
const [inputHighGD3, setInputHighGD3] = useState<any>();
const [inputLowGD3, setInputLowGD3] = useState<any>();
const [HighGD3, setHighGD3] = useState<number | null>(null);
const [LowGD3, setLowGD3] = useState<number | null>(null);
const [AlarmGD3, setAlarmGD3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGD3, setMaintainGD3] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD3 === 'string' && typeof LowGD3 === 'string' && GD3 !== null && maintainGD3 === false ) {
            const highValue = parseFloat(HighGD3);
            const lowValue = parseFloat(LowGD3);
            const GD3Value = parseFloat(GD3);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD3Value)) {
                if (highValue <= GD3Value || GD3Value <= lowValue) {
                    if (!AudioGD3) {
                        audioRef.current?.play();
                        setAudioGD3(true);
                        setAlarmGD3(true);
                    }
                } else {
                    setAudioGD3(false);
                    setAlarmGD3(false);
                }
            } 
        } 
    }, [HighGD3, GD3, AudioGD3, LowGD3,maintainGD3]);

    useEffect(() => {
        if (AudioGD3) {
            const audioEnded = () => {
                setAudioGD3(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD3]);

    const handleInputChangeHighGD3 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD3(newValue);
    };

    const handleInputChangeLowGD3 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD3(newValue2);
    };
    const ChangeMaintainGD3 = async () => {
        try {
            const newValue = !maintainGD3;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD3_Maintain: newValue }
            );
            setMaintainGD3(newValue);
            
            
        } catch (error) {}
    };
// ========================== GD3 ============================================


// ========================== EVC_01_Flow_at_Measurement_Condition- FIQ-1901  ============================================
const [EVC_01_Flow_at_Measurement_Condition, setEVC_01_Flow_at_Measurement_Condition] = useState<string | null>(null);
const [AudioEVC_01_Flow_at_Measurement_Condition, setAudioEVC_01_Flow_at_Measurement_Condition] = useState(false);
const [inputHighEVC_01_Flow_at_Measurement_Condition, setInputHighEVC_01_Flow_at_Measurement_Condition] = useState<any>();
const [inputLowEVC_01_Flow_at_Measurement_Condition, setInputLowEVC_01_Flow_at_Measurement_Condition] = useState<any>();
const [HighEVC_01_Flow_at_Measurement_Condition, setHighEVC_01_Flow_at_Measurement_Condition] = useState<number | null>(null);
const [LowEVC_01_Flow_at_Measurement_Condition, setLowEVC_01_Flow_at_Measurement_Condition] = useState<number | null>(null);
const [AlarmEVC_01_Flow_at_Measurement_Condition, setAlarmEVC_01_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Flow_at_Measurement_Condition, setMaintainEVC_01_Flow_at_Measurement_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Flow_at_Measurement_Condition === 'string' && typeof LowEVC_01_Flow_at_Measurement_Condition === 'string' && EVC_01_Flow_at_Measurement_Condition !== null && maintainEVC_01_Flow_at_Measurement_Condition === false) {
            const highValue = parseFloat(HighEVC_01_Flow_at_Measurement_Condition);
            const lowValue = parseFloat(LowEVC_01_Flow_at_Measurement_Condition);
            const EVC_01_Flow_at_Measurement_ConditionValue = parseFloat(EVC_01_Flow_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_01_Flow_at_Measurement_ConditionValue || EVC_01_Flow_at_Measurement_ConditionValue <= lowValue) {
                    if (!AudioEVC_01_Flow_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Flow_at_Measurement_Condition(true);
                        setAlarmEVC_01_Flow_at_Measurement_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Flow_at_Measurement_Condition(false);
                    setAlarmEVC_01_Flow_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [HighEVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition, AudioEVC_01_Flow_at_Measurement_Condition, LowEVC_01_Flow_at_Measurement_Condition,maintainEVC_01_Flow_at_Measurement_Condition]);

    useEffect(() => {
        if (AlarmEVC_01_Flow_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Flow_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Flow_at_Measurement_Condition]);

    const handleInputChangeHighEVC_01_Flow_at_Measurement_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Flow_at_Measurement_Condition(newValue);
    };

    const handleInputChangeLowEVC_01_Flow_at_Measurement_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Flow_at_Measurement_Condition(newValue2);
    };
    const ChangeMaintainGVF_01 = async () => {
        try {
            const newValue = !maintainEVC_01_Flow_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_01_Flow_at_Measurement_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_01_Flow_at_Measurement_Condition- FIQ-1901 ============================================

// ========================== EVC_01_Flow_at_Base_Condition- FIQ-1901  ============================================
const [EVC_01_Flow_at_Base_Condition, setEVC_01_Flow_at_Base_Condition] = useState<string | null>(null);
const [AudioEVC_01_Flow_at_Base_Condition, setAudioEVC_01_Flow_at_Base_Condition] = useState(false);
const [inputHighEVC_01_Flow_at_Base_Condition, setInputHighEVC_01_Flow_at_Base_Condition] = useState<any>();
const [inputLowEVC_01_Flow_at_Base_Condition, setInputLowEVC_01_Flow_at_Base_Condition] = useState<any>();
const [HighEVC_01_Flow_at_Base_Condition, setHighEVC_01_Flow_at_Base_Condition] = useState<number | null>(null);
const [LowEVC_01_Flow_at_Base_Condition, setLowEVC_01_Flow_at_Base_Condition] = useState<number | null>(null);
const [AlarmEVC_01_Flow_at_Base_Condition, setAlarmEVC_01_Flow_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Flow_at_Base_Condition, setMaintainEVC_01_Flow_at_Base_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Flow_at_Base_Condition === 'string' && typeof LowEVC_01_Flow_at_Base_Condition === 'string' && EVC_01_Flow_at_Base_Condition !== null && maintainEVC_01_Flow_at_Base_Condition === false) {
            const highValue = parseFloat(HighEVC_01_Flow_at_Base_Condition);
            const lowValue = parseFloat(LowEVC_01_Flow_at_Base_Condition);
            const EVC_01_Flow_at_Base_ConditionValue = parseFloat(EVC_01_Flow_at_Base_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Flow_at_Base_ConditionValue)) {
                if (highValue <= EVC_01_Flow_at_Base_ConditionValue || EVC_01_Flow_at_Base_ConditionValue <= lowValue) {
                    if (!AudioEVC_01_Flow_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Flow_at_Base_Condition(true);
                        setAlarmEVC_01_Flow_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Flow_at_Base_Condition(false);
                    setAlarmEVC_01_Flow_at_Base_Condition(false);
                }
            } 
        } 
    }, [HighEVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition, AudioEVC_01_Flow_at_Base_Condition, LowEVC_01_Flow_at_Base_Condition,maintainEVC_01_Flow_at_Base_Condition]);

    useEffect(() => {
        if (AudioEVC_01_Flow_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Flow_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Flow_at_Base_Condition]);

    const handleInputChangeHighEVC_01_Flow_at_Base_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Flow_at_Base_Condition(newValue);
    };

    const handleInputChangeLowEVC_01_Flow_at_Base_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Flow_at_Base_Condition(newValue2);
    };

    const ChangeMaintainSVF_01 = async () => {
        try {
            const newValue = !maintainEVC_01_Flow_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
            );
            setMaintainEVC_01_Flow_at_Base_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_01_Flow_at_Base_Condition- FIQ-1901 ============================================


// ========================== EVC_01_Volume_at_Base_Condition- FIQ-1901  ============================================
const [EVC_01_Volume_at_Base_Condition, setEVC_01_Volume_at_Base_Condition] = useState<string | null>(null);
const [AudioEVC_01_Volume_at_Base_Condition, setAudioEVC_01_Volume_at_Base_Condition] = useState(false);
const [inputHighEVC_01_Volume_at_Base_Condition, setInputHighEVC_01_Volume_at_Base_Condition] = useState<any>();
const [inputLowEVC_01_Volume_at_Base_Condition, setInputLowEVC_01_Volume_at_Base_Condition] = useState<any>();
const [HighEVC_01_Volume_at_Base_Condition, setHighEVC_01_Volume_at_Base_Condition] = useState<number | null>(null);
const [LowEVC_01_Volume_at_Base_Condition, setLowEVC_01_Volume_at_Base_Condition] = useState<number | null>(null);
const [AlarmEVC_01_Volume_at_Base_Condition, setAlarmEVC_01_Volume_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_01_Volume_at_Base_Condition, setMaintainEVC_01_Volume_at_Base_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Volume_at_Base_Condition === 'string' && typeof LowEVC_01_Volume_at_Base_Condition === 'string' && EVC_01_Volume_at_Base_Condition !== null && maintainEVC_01_Volume_at_Base_Condition === false) {
            const highValue = parseFloat(HighEVC_01_Volume_at_Base_Condition);
            const lowValue = parseFloat(LowEVC_01_Volume_at_Base_Condition);
            const EVC_01_Volume_at_Base_ConditionValue = parseFloat(EVC_01_Volume_at_Base_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Base_ConditionValue)) {
                if (highValue <= EVC_01_Volume_at_Base_ConditionValue || EVC_01_Volume_at_Base_ConditionValue <= lowValue) {
                    if (!AudioEVC_01_Volume_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Volume_at_Base_Condition(true);
                        setAlarmEVC_01_Volume_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Volume_at_Base_Condition(false);
                    setAlarmEVC_01_Volume_at_Base_Condition(false);
                }
            } 
        } 
    }, [HighEVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition, AudioEVC_01_Volume_at_Base_Condition, LowEVC_01_Volume_at_Base_Condition,maintainEVC_01_Volume_at_Base_Condition]);

    useEffect(() => {
        if (AudioEVC_01_Volume_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Volume_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Volume_at_Base_Condition]);

    const handleInputChangeHighEVC_01_Volume_at_Base_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Volume_at_Base_Condition(newValue);
    };

    const handleInputChangeLowEVC_01_Volume_at_Base_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Volume_at_Base_Condition(newValue2);
    };
    const ChangeMaintainSVA_01 = async () => {
        try {
            const newValue = !maintainEVC_01_Volume_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Volume_at_Base_Condition_Maintain: newValue }
            );
            setMaintainEVC_01_Volume_at_Base_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_01_Volume_at_Base_Condition- FIQ-1901 ============================================

// ========================== EVC_01_Volume_at_Measurement_Condition- FIQ-1901  ============================================
const [EVC_01_Volume_at_Measurement_Condition, setEVC_01_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [AudioEVC_01_Volume_at_Measurement_Condition, setAudioEVC_01_Volume_at_Measurement_Condition] = useState(false);
const [inputHighEVC_01_Volume_at_Measurement_Condition, setInputHighEVC_01_Volume_at_Measurement_Condition] = useState<any>();
const [inputLowEVC_01_Volume_at_Measurement_Condition, setInputLowEVC_01_Volume_at_Measurement_Condition] = useState<any>();
const [HighEVC_01_Volume_at_Measurement_Condition, setHighEVC_01_Volume_at_Measurement_Condition] = useState<number | null>(null);
const [LowEVC_01_Volume_at_Measurement_Condition, setLowEVC_01_Volume_at_Measurement_Condition] = useState<number | null>(null);
const [AlarmEVC_01_Volume_at_Measurement_Condition, setAlarmEVC_01_Volume_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_01_Volume_at_Measurement_Condition, setMaintainEVC_01_Volume_at_Measurement_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Volume_at_Measurement_Condition === 'string' && typeof LowEVC_01_Volume_at_Measurement_Condition === 'string' && EVC_01_Volume_at_Measurement_Condition !== null && maintainEVC_01_Volume_at_Measurement_Condition === false) {
            const highValue = parseFloat(HighEVC_01_Volume_at_Measurement_Condition);
            const lowValue = parseFloat(LowEVC_01_Volume_at_Measurement_Condition);
            const EVC_01_Volume_at_Measurement_ConditionValue = parseFloat(EVC_01_Volume_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Volume_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_01_Volume_at_Measurement_ConditionValue || EVC_01_Volume_at_Measurement_ConditionValue <= lowValue) {
                    if (!AudioEVC_01_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_01_Volume_at_Measurement_Condition(true);
                        setAlarmEVC_01_Volume_at_Measurement_Condition(true);
                    }
                } else {
                    setAudioEVC_01_Volume_at_Measurement_Condition(false);
                    setAlarmEVC_01_Volume_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [HighEVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition, AudioEVC_01_Volume_at_Measurement_Condition, LowEVC_01_Volume_at_Measurement_Condition,maintainEVC_01_Volume_at_Measurement_Condition]);

    useEffect(() => {
        if (AudioEVC_01_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_01_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Volume_at_Measurement_Condition]);

    const handleInputChangeHighEVC_01_Volume_at_Measurement_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Volume_at_Measurement_Condition(newValue);
    };

    const handleInputChangeLowEVC_01_Volume_at_Measurement_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Volume_at_Measurement_Condition(newValue2);
    };
    const ChangeMaintainGVA_01 = async () => {
        try {
            const newValue = !maintainEVC_01_Volume_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_01_Volume_at_Measurement_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_01_Volume_at_Measurement_Condition- FIQ-1901 ============================================

// ========================== EVC_02_Flow_at_Measurement_Condition- FIQ-19012 ============================================
const [EVC_02_Flow_at_Measurement_Condition, setEVC_02_Flow_at_Measurement_Condition] = useState<string | null>(null);
const [AudioEVC_02_Flow_at_Measurement_Condition, setAudioEVC_02_Flow_at_Measurement_Condition] = useState(false);
const [inputHighEVC_02_Flow_at_Measurement_Condition, setInputHighEVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [inputLowEVC_02_Flow_at_Measurement_Condition, setInputLowEVC_02_Flow_at_Measurement_Condition] = useState<any>();
const [HighEVC_02_Flow_at_Measurement_Condition, setHighEVC_02_Flow_at_Measurement_Condition] = useState<number | null>(null);
const [LowEVC_02_Flow_at_Measurement_Condition, setLowEVC_02_Flow_at_Measurement_Condition] = useState<number | null>(null);
const [AlarmEVC_02_Flow_at_Measurement_Condition, setAlarmEVC_02_Flow_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainEVC_02_Flow_at_Measurement_Condition, setMaintainEVC_02_Flow_at_Measurement_Condition] = useState<boolean>(false);


    useEffect(() => {
        if (typeof HighEVC_02_Flow_at_Measurement_Condition === 'string' && typeof LowEVC_02_Flow_at_Measurement_Condition === 'string' && EVC_02_Flow_at_Measurement_Condition !== null && maintainEVC_02_Flow_at_Measurement_Condition === false) {
            const highValue = parseFloat(HighEVC_02_Flow_at_Measurement_Condition);
            const lowValue = parseFloat(LowEVC_02_Flow_at_Measurement_Condition);
            const EVC_02_Flow_at_Measurement_ConditionValue = parseFloat(EVC_02_Flow_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_02_Flow_at_Measurement_ConditionValue || EVC_02_Flow_at_Measurement_ConditionValue <= lowValue) {
                    if (!AudioEVC_02_Flow_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Flow_at_Measurement_Condition(true);
                        setAlarmEVC_02_Flow_at_Measurement_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Flow_at_Measurement_Condition(false);
                    setAlarmEVC_02_Flow_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [HighEVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition, AudioEVC_02_Flow_at_Measurement_Condition, LowEVC_02_Flow_at_Measurement_Condition,maintainEVC_02_Flow_at_Measurement_Condition]);

    useEffect(() => {
        if (AlarmEVC_02_Flow_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Flow_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Flow_at_Measurement_Condition]);

    const handleInputChangeHighEVC_02_Flow_at_Measurement_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Flow_at_Measurement_Condition(newValue);
    };

    const handleInputChangeLowEVC_02_Flow_at_Measurement_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Flow_at_Measurement_Condition(newValue2);
    };
    const ChangeMaintainGVF_02 = async () => {
        try {
            const newValue = !maintainEVC_02_Flow_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Flow_at_Measurement_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_02_Flow_at_Measurement_Condition- FIQ-1902 ============================================

// ========================== EVC_02_Flow_at_Base_Condition- FIQ-1902  ============================================
const [EVC_02_Flow_at_Base_Condition, setEVC_02_Flow_at_Base_Condition] = useState<string | null>(null);
const [AudioEVC_02_Flow_at_Base_Condition, setAudioEVC_02_Flow_at_Base_Condition] = useState(false);
const [inputHighEVC_02_Flow_at_Base_Condition, setInputHighEVC_02_Flow_at_Base_Condition] = useState<any>();
const [inputLowEVC_02_Flow_at_Base_Condition, setInputLowEVC_02_Flow_at_Base_Condition] = useState<any>();
const [HighEVC_02_Flow_at_Base_Condition, setHighEVC_02_Flow_at_Base_Condition] = useState<number | null>(null);
const [LowEVC_02_Flow_at_Base_Condition, setLowEVC_02_Flow_at_Base_Condition] = useState<number | null>(null);
const [AlarmEVC_02_Flow_at_Base_Condition, setAlarmEVC_02_Flow_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Flow_at_Base_Condition, setMaintainEVC_02_Flow_at_Base_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Flow_at_Base_Condition === 'string' && typeof LowEVC_02_Flow_at_Base_Condition === 'string' && EVC_02_Flow_at_Base_Condition !== null && maintainEVC_02_Flow_at_Base_Condition === false) {
            const highValue = parseFloat(HighEVC_02_Flow_at_Base_Condition);
            const lowValue = parseFloat(LowEVC_02_Flow_at_Base_Condition);
            const EVC_02_Flow_at_Base_ConditionValue = parseFloat(EVC_02_Flow_at_Base_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Flow_at_Base_ConditionValue)) {
                if (highValue <= EVC_02_Flow_at_Base_ConditionValue || EVC_02_Flow_at_Base_ConditionValue <= lowValue) {
                    if (!AudioEVC_02_Flow_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Flow_at_Base_Condition(true);
                        setAlarmEVC_02_Flow_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Flow_at_Base_Condition(false);
                    setAlarmEVC_02_Flow_at_Base_Condition(false);
                }
            } 
        } 
    }, [HighEVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition, AudioEVC_02_Flow_at_Base_Condition, LowEVC_02_Flow_at_Base_Condition,maintainEVC_02_Flow_at_Base_Condition]);

    useEffect(() => {
        if (AudioEVC_02_Flow_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Flow_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Flow_at_Base_Condition]);

    const handleInputChangeHighEVC_02_Flow_at_Base_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Flow_at_Base_Condition(newValue);
    };

    const handleInputChangeLowEVC_02_Flow_at_Base_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Flow_at_Base_Condition(newValue2);
    };
    const ChangeMaintainSVF_02 = async () => {
        try {
            const newValue = !maintainEVC_02_Flow_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Flow_at_Base_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_02_Flow_at_Base_Condition- FIQ-1902 ============================================


// ========================== EVC_02_Volume_at_Base_Condition- FIQ-1902  ============================================
const [EVC_02_Volume_at_Base_Condition, setEVC_02_Volume_at_Base_Condition] = useState<string | null>(null);
const [AudioEVC_02_Volume_at_Base_Condition, setAudioEVC_02_Volume_at_Base_Condition] = useState(false);
const [inputHighEVC_02_Volume_at_Base_Condition, setInputHighEVC_02_Volume_at_Base_Condition] = useState<any>();
const [inputLowEVC_02_Volume_at_Base_Condition, setInputLowEVC_02_Volume_at_Base_Condition] = useState<any>();
const [HighEVC_02_Volume_at_Base_Condition, setHighEVC_02_Volume_at_Base_Condition] = useState<number | null>(null);
const [LowEVC_02_Volume_at_Base_Condition, setLowEVC_02_Volume_at_Base_Condition] = useState<number | null>(null);
const [AlarmEVC_02_Volume_at_Base_Condition, setAlarmEVC_02_Volume_at_Base_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Volume_at_Base_Condition, setMaintainEVC_02_Volume_at_Base_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Volume_at_Base_Condition === 'string' && typeof LowEVC_02_Volume_at_Base_Condition === 'string' && EVC_02_Volume_at_Base_Condition !== null && maintainEVC_02_Volume_at_Base_Condition === false) {
            const highValue = parseFloat(HighEVC_02_Volume_at_Base_Condition);
            const lowValue = parseFloat(LowEVC_02_Volume_at_Base_Condition);
            const EVC_02_Volume_at_Base_ConditionValue = parseFloat(EVC_02_Volume_at_Base_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Base_ConditionValue)) {
                if (highValue <= EVC_02_Volume_at_Base_ConditionValue || EVC_02_Volume_at_Base_ConditionValue <= lowValue) {
                    if (!AudioEVC_02_Volume_at_Base_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Volume_at_Base_Condition(true);
                        setAlarmEVC_02_Volume_at_Base_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Volume_at_Base_Condition(false);
                    setAlarmEVC_02_Volume_at_Base_Condition(false);
                }
            } 
        } 
    }, [HighEVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition, AudioEVC_02_Volume_at_Base_Condition, LowEVC_02_Volume_at_Base_Condition,maintainEVC_02_Volume_at_Base_Condition]);

    useEffect(() => {
        if (AudioEVC_02_Volume_at_Base_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Volume_at_Base_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Volume_at_Base_Condition]);

    const handleInputChangeHighEVC_02_Volume_at_Base_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Volume_at_Base_Condition(newValue);
    };

    const handleInputChangeLowEVC_02_Volume_at_Base_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Volume_at_Base_Condition(newValue2);
    };
    const ChangeMaintainSVA_02 = async () => {
        try {
            const newValue = !maintainEVC_02_Volume_at_Base_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Volume_at_Base_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_02_Volume_at_Base_Condition- FIQ-1902 ============================================

// ========================== EVC_02_Volume_at_Measurement_Condition- FIQ-1902  ============================================
const [EVC_02_Volume_at_Measurement_Condition, setEVC_02_Volume_at_Measurement_Condition] = useState<string | null>(null);
const [AudioEVC_02_Volume_at_Measurement_Condition, setAudioEVC_02_Volume_at_Measurement_Condition] = useState(false);
const [inputHighEVC_02_Volume_at_Measurement_Condition, setInputHighEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [inputLowEVC_02_Volume_at_Measurement_Condition, setInputLowEVC_02_Volume_at_Measurement_Condition] = useState<any>();
const [HighEVC_02_Volume_at_Measurement_Condition, setHighEVC_02_Volume_at_Measurement_Condition] = useState<number | null>(null);
const [LowEVC_02_Volume_at_Measurement_Condition, setLowEVC_02_Volume_at_Measurement_Condition] = useState<number | null>(null);
const [AlarmEVC_02_Volume_at_Measurement_Condition, setAlarmEVC_02_Volume_at_Measurement_Condition] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Volume_at_Measurement_Condition, setMaintainEVC_02_Volume_at_Measurement_Condition] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Volume_at_Measurement_Condition === 'string' && typeof LowEVC_02_Volume_at_Measurement_Condition === 'string' && EVC_02_Volume_at_Measurement_Condition !== null && maintainEVC_02_Volume_at_Measurement_Condition === false) {
            const highValue = parseFloat(HighEVC_02_Volume_at_Measurement_Condition);
            const lowValue = parseFloat(LowEVC_02_Volume_at_Measurement_Condition);
            const EVC_02_Volume_at_Measurement_ConditionValue = parseFloat(EVC_02_Volume_at_Measurement_Condition);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Volume_at_Measurement_ConditionValue)) {
                if (highValue <= EVC_02_Volume_at_Measurement_ConditionValue || EVC_02_Volume_at_Measurement_ConditionValue <= lowValue) {
                    if (!AudioEVC_02_Volume_at_Measurement_Condition) {
                        audioRef.current?.play();
                        setAudioEVC_02_Volume_at_Measurement_Condition(true);
                        setAlarmEVC_02_Volume_at_Measurement_Condition(true);
                    }
                } else {
                    setAudioEVC_02_Volume_at_Measurement_Condition(false);
                    setAlarmEVC_02_Volume_at_Measurement_Condition(false);
                }
            } 
        } 
    }, [HighEVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition, AudioEVC_02_Volume_at_Measurement_Condition, LowEVC_02_Volume_at_Measurement_Condition,maintainEVC_02_Volume_at_Measurement_Condition]);

    useEffect(() => {
        if (AudioEVC_02_Volume_at_Measurement_Condition) {
            const audioEnded = () => {
                setAudioEVC_02_Volume_at_Measurement_Condition(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Volume_at_Measurement_Condition]);

    const handleInputChangeHighEVC_02_Volume_at_Measurement_Condition = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Volume_at_Measurement_Condition(newValue);
    };

    const handleInputChangeLowEVC_02_Volume_at_Measurement_Condition = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Volume_at_Measurement_Condition(newValue2);
    };
    const ChangeMaintainGVA_02 = async () => {
        try {
            const newValue = !maintainEVC_02_Volume_at_Measurement_Condition;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainEVC_02_Volume_at_Measurement_Condition(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC_02_Volume_at_Measurement_Condition- FIQ-1901 ============================================

// ========================== EVC 01 TEMPERATURE ============================================
const [EVC_01_Temperature, setEVC_01_Temperature] = useState<string | null>(null);

const [AudioEVC_01_Temperature, setAudioEVC_01_Temperature] = useState(false);
const [inputHighEVC_01_Temperature, setInputHighEVC_01_Temperature] = useState<any>();
const [inputLowEVC_01_Temperature, setInputLowEVC_01_Temperature] = useState<any>();
const [HighEVC_01_Temperature, setHighEVC_01_Temperature] = useState<number | null>(null);
const [LowEVC_01_Temperature, setLowEVC_01_Temperature] = useState<number | null>(null);
const [AlarmEVC_01_Temperature, setAlarmEVC_01_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Temperature, setMaintainEVC_01_Temperature] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Temperature === 'string' && typeof LowEVC_01_Temperature === 'string' && EVC_01_Temperature !== null && maintainEVC_01_Temperature === false) {
            const highValue = parseFloat(HighEVC_01_Temperature);
            const lowValue = parseFloat(LowEVC_01_Temperature);
            const EVC_01_TemperatureValue = parseFloat(EVC_01_Temperature);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_TemperatureValue)) {
                if (highValue <= EVC_01_TemperatureValue || EVC_01_TemperatureValue <= lowValue) {
                    if (!AudioEVC_01_Temperature) {
                        audioRef.current?.play();
                        setAudioEVC_01_Temperature(true);
                        setAlarmEVC_01_Temperature(true);
                    }
                } else {
                    setAudioEVC_01_Temperature(false);
                    setAlarmEVC_01_Temperature(false);
                }
            } 
        } 
    }, [HighEVC_01_Temperature, EVC_01_Temperature, AudioEVC_01_Temperature, LowEVC_01_Temperature,maintainEVC_01_Temperature]);

    useEffect(() => {
        if (AudioEVC_01_Temperature) {
            const audioEnded = () => {
                setAudioEVC_01_Temperature(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Temperature]);

    const handleInputChangeHighEVC_01_Temperature = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Temperature(newValue);
    };

    const handleInputChangeLowEVC_01_Temperature = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Temperature(newValue2);
    };
    const ChangeMaintainEVC_01_Temperature = async () => {
        try {
            const newValue = !maintainEVC_01_Temperature;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Temperature_Maintain: newValue }
            );
            setMaintainEVC_01_Temperature(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC 01 TEMPERATURE ============================================

const [EVC_02_Temperature, setEVC_02_Temperature] = useState<string | null>(null);

const [AudioEVC_02_Temperature, setAudioEVC_02_Temperature] = useState(false);
const [inputHighEVC_02_Temperature, setInputHighEVC_02_Temperature] = useState<any>();
const [inputLowEVC_02_Temperature, setInputLowEVC_02_Temperature] = useState<any>();
const [HighEVC_02_Temperature, setHighEVC_02_Temperature] = useState<number | null>(null);
const [LowEVC_02_Temperature, setLowEVC_02_Temperature] = useState<number | null>(null);
const [AlarmEVC_02_Temperature, setAlarmEVC_02_Temperature] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Temperature, setMaintainEVC_02_Temperature] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Temperature === 'string' && typeof LowEVC_02_Temperature === 'string' && EVC_02_Temperature !== null && maintainEVC_02_Temperature === false) {
            const highValue = parseFloat(HighEVC_02_Temperature);
            const lowValue = parseFloat(LowEVC_02_Temperature);
            const EVC_02_TemperatureValue = parseFloat(EVC_02_Temperature);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_TemperatureValue)) {
                if (highValue <= EVC_02_TemperatureValue || EVC_02_TemperatureValue <= lowValue) {
                    if (!AudioEVC_02_Temperature) {
                        audioRef.current?.play();
                        setAudioEVC_02_Temperature(true);
                        setAlarmEVC_02_Temperature(true);
                    }
                } else {
                    setAudioEVC_02_Temperature(false);
                    setAlarmEVC_02_Temperature(false);
                }
            } 
        } 
    }, [HighEVC_02_Temperature, EVC_02_Temperature, AudioEVC_02_Temperature, LowEVC_02_Temperature,maintainEVC_02_Temperature]);

    useEffect(() => {
        if (AudioEVC_02_Temperature) {
            const audioEnded = () => {
                setAudioEVC_02_Temperature(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Temperature]);

    const handleInputChangeHighEVC_02_Temperature = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Temperature(newValue);
    };

    const handleInputChangeLowEVC_02_Temperature = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Temperature(newValue2);
    };
    const ChangeMaintainEVC_02_Temperature = async () => {
        try {
            const newValue = !maintainEVC_02_Temperature;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Temperature_Maintain: newValue }
            );
            setMaintainEVC_02_Temperature(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC 01 TEMPERATURE ============================================


// ========================== Remain battery 01 ============================================
const [EVC_01_Remain_Battery_Service_Life,setEVC_01_Remain_Battery_Service_Life] = useState<string | null>(null);


const [AudioEVC_01_Remain_Battery_Service_Life, setAudioEVC_01_Remain_Battery_Service_Life] = useState(false);
const [inputHighEVC_01_Remain_Battery_Service_Life, setInputHighEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [inputLowEVC_01_Remain_Battery_Service_Life, setInputLowEVC_01_Remain_Battery_Service_Life] = useState<any>();
const [HighEVC_01_Remain_Battery_Service_Life, setHighEVC_01_Remain_Battery_Service_Life] = useState<number | null>(null);
const [LowEVC_01_Remain_Battery_Service_Life, setLowEVC_01_Remain_Battery_Service_Life] = useState<number | null>(null);
const [AlarmEVC_01_Remain_Battery_Service_Life, setAlarmEVC_01_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Remain_Battery_Service_Life, setMaintainEVC_01_Remain_Battery_Service_Life] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Remain_Battery_Service_Life === 'string' && typeof LowEVC_01_Remain_Battery_Service_Life === 'string' && EVC_01_Remain_Battery_Service_Life !== null && maintainEVC_01_Remain_Battery_Service_Life === false) {
            const highValue = parseFloat(HighEVC_01_Remain_Battery_Service_Life);
            const lowValue = parseFloat(LowEVC_01_Remain_Battery_Service_Life);
            const EVC_01_Remain_Battery_Service_LifeValue = parseFloat(EVC_01_Remain_Battery_Service_Life);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Remain_Battery_Service_LifeValue)) {
                if (highValue <= EVC_01_Remain_Battery_Service_LifeValue || EVC_01_Remain_Battery_Service_LifeValue <= lowValue) {
                    if (!AudioEVC_01_Remain_Battery_Service_Life) {
                        audioRef.current?.play();
                        setAudioEVC_01_Remain_Battery_Service_Life(true);
                        setAlarmEVC_01_Remain_Battery_Service_Life(true);
                    }
                } else {
                    setAudioEVC_01_Remain_Battery_Service_Life(false);
                    setAlarmEVC_01_Remain_Battery_Service_Life(false);
                }
            } 
        } 
    }, [HighEVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life, AudioEVC_01_Remain_Battery_Service_Life, LowEVC_01_Remain_Battery_Service_Life,maintainEVC_01_Remain_Battery_Service_Life]);

    useEffect(() => {
        if (AudioEVC_01_Remain_Battery_Service_Life) {
            const audioEnded = () => {
                setAudioEVC_01_Remain_Battery_Service_Life(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Remain_Battery_Service_Life]);

    const handleInputChangeHighEVC_01_Remain_Battery_Service_Life = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Remain_Battery_Service_Life(newValue);
    };

    const handleInputChangeLowEVC_01_Remain_Battery_Service_Life = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Remain_Battery_Service_Life(newValue2);
    };
    const ChangeMaintainEVC_01_Remain_Battery_Service_Life = async () => {
        try {
            const newValue = !maintainEVC_01_Remain_Battery_Service_Life;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Remain_Battery_Service_Life_Maintain: newValue }
            );
            setMaintainEVC_01_Remain_Battery_Service_Life(newValue);
            
            
        } catch (error) {}
    };
// ========================== Remain battery 01 ============================================

// ==========================Remain battery 02 ============================================
const [EVC_02_Remain_Battery_Service_Life,setEVC_02_Remain_Battery_Service_Life] = useState<string | null>(null);

const [AudioEVC_02_Remain_Battery_Service_Life, setAudioEVC_02_Remain_Battery_Service_Life] = useState(false);
const [inputHighEVC_02_Remain_Battery_Service_Life, setInputHighEVC_02_Remain_Battery_Service_Life] = useState<any>();
const [inputLowEVC_02_Remain_Battery_Service_Life, setInputLowEVC_02_Remain_Battery_Service_Life] = useState<any>();
const [HighEVC_02_Remain_Battery_Service_Life, setHighEVC_02_Remain_Battery_Service_Life] = useState<number | null>(null);
const [LowEVC_02_Remain_Battery_Service_Life, setLowEVC_02_Remain_Battery_Service_Life] = useState<number | null>(null);
const [AlarmEVC_02_Remain_Battery_Service_Life, setAlarmEVC_02_Remain_Battery_Service_Life] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Remain_Battery_Service_Life, setMaintainEVC_02_Remain_Battery_Service_Life] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Remain_Battery_Service_Life === 'string' && typeof LowEVC_02_Remain_Battery_Service_Life === 'string' && EVC_02_Remain_Battery_Service_Life !== null && maintainEVC_02_Remain_Battery_Service_Life === false) {
            const highValue = parseFloat(HighEVC_02_Remain_Battery_Service_Life);
            const lowValue = parseFloat(LowEVC_02_Remain_Battery_Service_Life);
            const EVC_02_Remain_Battery_Service_LifeValue = parseFloat(EVC_02_Remain_Battery_Service_Life);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Remain_Battery_Service_LifeValue)) {
                if (highValue <= EVC_02_Remain_Battery_Service_LifeValue || EVC_02_Remain_Battery_Service_LifeValue <= lowValue) {
                    if (!AudioEVC_02_Remain_Battery_Service_Life) {
                        audioRef.current?.play();
                        setAudioEVC_02_Remain_Battery_Service_Life(true);
                        setAlarmEVC_02_Remain_Battery_Service_Life(true);
                    }
                } else {
                    setAudioEVC_02_Remain_Battery_Service_Life(false);
                    setAlarmEVC_02_Remain_Battery_Service_Life(false);
                }
            } 
        } 
    }, [HighEVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life, AudioEVC_02_Remain_Battery_Service_Life, LowEVC_02_Remain_Battery_Service_Life,maintainEVC_02_Remain_Battery_Service_Life]);

    useEffect(() => {
        if (AudioEVC_02_Remain_Battery_Service_Life) {
            const audioEnded = () => {
                setAudioEVC_02_Remain_Battery_Service_Life(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Remain_Battery_Service_Life]);

    const handleInputChangeHighEVC_02_Remain_Battery_Service_Life = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Remain_Battery_Service_Life(newValue);
    };

    const handleInputChangeLowEVC_02_Remain_Battery_Service_Life = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Remain_Battery_Service_Life(newValue2);
    };
    const ChangeMaintainEVC_02_Remain_Battery_Service_Life = async () => {
        try {
            const newValue = !maintainEVC_02_Remain_Battery_Service_Life;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
            );
            setMaintainEVC_02_Remain_Battery_Service_Life(newValue);
            
            
        } catch (error) {}
    };
// ========================== Remain battery 02 ============================================

// ========================== VM LAST DAY 01 ============================================
const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);
const [AudioEVC_01_Vm_of_Last_Day, setAudioEVC_01_Vm_of_Last_Day] = useState(false);
const [inputHighEVC_01_Vm_of_Last_Day, setInputHighEVC_01_Vm_of_Last_Day] = useState<any>();
const [inputLowEVC_01_Vm_of_Last_Day, setInputLowEVC_01_Vm_of_Last_Day] = useState<any>();
const [HighEVC_01_Vm_of_Last_Day, setHighEVC_01_Vm_of_Last_Day] = useState<number | null>(null);
const [LowEVC_01_Vm_of_Last_Day, setLowEVC_01_Vm_of_Last_Day] = useState<number | null>(null);
const [AlarmEVC_01_Vm_of_Last_Day, setAlarmEVC_01_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Vm_of_Last_Day, setMaintainEVC_01_Vm_of_Last_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Vm_of_Last_Day === 'string' && typeof LowEVC_01_Vm_of_Last_Day === 'string' && EVC_01_Vm_of_Last_Day !== null && maintainEVC_01_Vm_of_Last_Day === false) {
            const highValue = parseFloat(HighEVC_01_Vm_of_Last_Day);
            const lowValue = parseFloat(LowEVC_01_Vm_of_Last_Day);
            const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Last_DayValue)) {
                if (highValue <= EVC_01_Vm_of_Last_DayValue || EVC_01_Vm_of_Last_DayValue <= lowValue) {
                    if (!AudioEVC_01_Vm_of_Last_Day) {
                        audioRef.current?.play();
                        setAudioEVC_01_Vm_of_Last_Day(true);
                        setAlarmEVC_01_Vm_of_Last_Day(true);
                    }
                } else {
                    setAudioEVC_01_Vm_of_Last_Day(false);
                    setAlarmEVC_01_Vm_of_Last_Day(false);
                }
            } 
        } 
    }, [HighEVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day, AudioEVC_01_Vm_of_Last_Day, LowEVC_01_Vm_of_Last_Day,maintainEVC_01_Vm_of_Last_Day]);

    useEffect(() => {
        if (AudioEVC_01_Vm_of_Last_Day) {
            const audioEnded = () => {
                setAudioEVC_01_Vm_of_Last_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Vm_of_Last_Day]);

    const handleInputChangeHighEVC_01_Vm_of_Last_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Vm_of_Last_Day(newValue);
    };

    const handleInputChangeLowEVC_01_Vm_of_Last_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Vm_of_Last_Day(newValue2);
    };
    const ChangeMaintainEVC_01_Vm_of_Last_Day = async () => {
        try {
            const newValue = !maintainEVC_01_Vm_of_Last_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vm_of_Last_Day_Maintain: newValue }
            );
            setMaintainEVC_01_Vm_of_Last_Day(newValue);
            
            
        } catch (error) {}
    };
// ==========================VM LAST DAY 01 ============================================

// ==========================VM LAST DAY 01  ============================================
const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
const [AudioEVC_02_Vm_of_Last_Day, setAudioEVC_02_Vm_of_Last_Day] = useState(false);
const [inputHighEVC_02_Vm_of_Last_Day, setInputHighEVC_02_Vm_of_Last_Day] = useState<any>();
const [inputLowEVC_02_Vm_of_Last_Day, setInputLowEVC_02_Vm_of_Last_Day] = useState<any>();
const [HighEVC_02_Vm_of_Last_Day, setHighEVC_02_Vm_of_Last_Day] = useState<number | null>(null);
const [LowEVC_02_Vm_of_Last_Day, setLowEVC_02_Vm_of_Last_Day] = useState<number | null>(null);
const [AlarmEVC_02_Vm_of_Last_Day, setAlarmEVC_02_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Vm_of_Last_Day, setMaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Vm_of_Last_Day === 'string' && typeof LowEVC_02_Vm_of_Last_Day === 'string' && EVC_02_Vm_of_Last_Day !== null && maintainEVC_02_Vm_of_Last_Day === false) {
            const highValue = parseFloat(HighEVC_02_Vm_of_Last_Day);
            const lowValue = parseFloat(LowEVC_02_Vm_of_Last_Day);
            const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Last_DayValue)) {
                if (highValue <= EVC_02_Vm_of_Last_DayValue || EVC_02_Vm_of_Last_DayValue <= lowValue) {
                    if (!AudioEVC_02_Vm_of_Last_Day) {
                        audioRef.current?.play();
                        setAudioEVC_02_Vm_of_Last_Day(true);
                        setAlarmEVC_02_Vm_of_Last_Day(true);
                    }
                } else {
                    setAudioEVC_02_Vm_of_Last_Day(false);
                    setAlarmEVC_02_Vm_of_Last_Day(false);
                }
            } 
        } 
    }, [HighEVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day, AudioEVC_02_Vm_of_Last_Day, LowEVC_02_Vm_of_Last_Day,maintainEVC_02_Vm_of_Last_Day]);

    useEffect(() => {
        if (AudioEVC_02_Vm_of_Last_Day) {
            const audioEnded = () => {
                setAudioEVC_02_Vm_of_Last_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Vm_of_Last_Day]);

    const handleInputChangeHighEVC_02_Vm_of_Last_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Vm_of_Last_Day(newValue);
    };

    const handleInputChangeLowEVC_02_Vm_of_Last_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Vm_of_Last_Day(newValue2);
    };
    const ChangeMaintainEVC_02_Vm_of_Last_Day = async () => {
        try {
            const newValue = !maintainEVC_02_Vm_of_Last_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vm_of_Last_Day_Maintain: newValue }
            );
            setMaintainEVC_02_Vm_of_Last_Day(newValue);
            
            
        } catch (error) {}
    };
// ========================== VM LAST DAY 01 ============================================



// ========================== Vb LAST DAY 01 ============================================
const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
const [AudioEVC_01_Vb_of_Last_Day, setAudioEVC_01_Vb_of_Last_Day] = useState(false);
const [inputHighEVC_01_Vb_of_Last_Day, setInputHighEVC_01_Vb_of_Last_Day] = useState<any>();
const [inputLowEVC_01_Vb_of_Last_Day, setInputLowEVC_01_Vb_of_Last_Day] = useState<any>();
const [HighEVC_01_Vb_of_Last_Day, setHighEVC_01_Vb_of_Last_Day] = useState<number | null>(null);
const [LowEVC_01_Vb_of_Last_Day, setLowEVC_01_Vb_of_Last_Day] = useState<number | null>(null);
const [AlarmEVC_01_Vb_of_Last_Day, setAlarmEVC_01_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Vb_of_Last_Day, setMaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Vb_of_Last_Day === 'string' && typeof LowEVC_01_Vb_of_Last_Day === 'string' && EVC_01_Vb_of_Last_Day !== null && maintainEVC_01_Vb_of_Last_Day === false) {
            const highValue = parseFloat(HighEVC_01_Vb_of_Last_Day);
            const lowValue = parseFloat(LowEVC_01_Vb_of_Last_Day);
            const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vb_of_Last_DayValue)) {
                if (highValue <= EVC_01_Vb_of_Last_DayValue || EVC_01_Vb_of_Last_DayValue <= lowValue) {
                    if (!AudioEVC_01_Vb_of_Last_Day) {
                        audioRef.current?.play();
                        setAudioEVC_01_Vb_of_Last_Day(true);
                        setAlarmEVC_01_Vb_of_Last_Day(true);
                    }
                } else {
                    setAudioEVC_01_Vb_of_Last_Day(false);
                    setAlarmEVC_01_Vb_of_Last_Day(false);
                }
            } 
        } 
    }, [HighEVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day, AudioEVC_01_Vb_of_Last_Day, LowEVC_01_Vb_of_Last_Day,maintainEVC_01_Vb_of_Last_Day]);

    useEffect(() => {
        if (AudioEVC_01_Vb_of_Last_Day) {
            const audioEnded = () => {
                setAudioEVC_01_Vb_of_Last_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Vb_of_Last_Day]);

    const handleInputChangeHighEVC_01_Vb_of_Last_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Vb_of_Last_Day(newValue);
    };

    const handleInputChangeLowEVC_01_Vb_of_Last_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Vb_of_Last_Day(newValue2);
    };
    const ChangeMaintainEVC_01_Vb_of_Last_Day = async () => {
        try {
            const newValue = !maintainEVC_01_Vb_of_Last_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vb_of_Last_Day_Maintain: newValue }
            );
            setMaintainEVC_01_Vb_of_Last_Day(newValue);
            
            
        } catch (error) {}
    };
// ==========================Vb LAST DAY 01 ============================================

// ==========================Vb LAST DAY 02  ============================================
const [EVC_02_Vb_of_Last_Day, setEVC_02_Vb_of_Last_Day] = useState<string | null>(null);
const [AudioEVC_02_Vb_of_Last_Day, setAudioEVC_02_Vb_of_Last_Day] = useState(false);
const [inputHighEVC_02_Vb_of_Last_Day, setInputHighEVC_02_Vb_of_Last_Day] = useState<any>();
const [inputLowEVC_02_Vb_of_Last_Day, setInputLowEVC_02_Vb_of_Last_Day] = useState<any>();
const [HighEVC_02_Vb_of_Last_Day, setHighEVC_02_Vb_of_Last_Day] = useState<number | null>(null);
const [LowEVC_02_Vb_of_Last_Day, setLowEVC_02_Vb_of_Last_Day] = useState<number | null>(null);
const [AlarmEVC_02_Vb_of_Last_Day, setAlarmEVC_02_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Vb_of_Last_Day, setMaintainEVC_02_Vb_of_Last_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Vb_of_Last_Day === 'string' && typeof LowEVC_02_Vb_of_Last_Day === 'string' && EVC_02_Vb_of_Last_Day !== null && maintainEVC_02_Vb_of_Last_Day === false) {
            const highValue = parseFloat(HighEVC_02_Vb_of_Last_Day);
            const lowValue = parseFloat(LowEVC_02_Vb_of_Last_Day);
            const EVC_02_Vb_of_Last_DayValue = parseFloat(EVC_02_Vb_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Last_DayValue)) {
                if (highValue <= EVC_02_Vb_of_Last_DayValue || EVC_02_Vb_of_Last_DayValue <= lowValue) {
                    if (!AudioEVC_02_Vb_of_Last_Day) {
                        audioRef.current?.play();
                        setAudioEVC_02_Vb_of_Last_Day(true);
                        setAlarmEVC_02_Vb_of_Last_Day(true);
                    }
                } else {
                    setAudioEVC_02_Vb_of_Last_Day(false);
                    setAlarmEVC_02_Vb_of_Last_Day(false);
                }
            } 
        } 
    }, [HighEVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day, AudioEVC_02_Vb_of_Last_Day, LowEVC_02_Vb_of_Last_Day,maintainEVC_02_Vb_of_Last_Day]);

    useEffect(() => {
        if (AudioEVC_02_Vb_of_Last_Day) {
            const audioEnded = () => {
                setAudioEVC_02_Vb_of_Last_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Vb_of_Last_Day]);

    const handleInputChangeHighEVC_02_Vb_of_Last_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Vb_of_Last_Day(newValue);
    };

    const handleInputChangeLowEVC_02_Vb_of_Last_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Vb_of_Last_Day(newValue2);
    };
    const ChangeMaintainEVC_02_Vb_of_Last_Day = async () => {
        try {
            const newValue = !maintainEVC_02_Vb_of_Last_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vb_of_Last_Day_Maintain: newValue }
            );
            setMaintainEVC_02_Vb_of_Last_Day(newValue);
            
            
        } catch (error) {}
    };
// ========================== Vb LAST DAY 02 ============================================

//=============================================================================================


// ========================== VM to DAY 01 ============================================
const [EVC_01_Vm_of_Current_Day, setEVC_01_Vm_of_Current_Day] = useState<string | null>(null);
const [AudioEVC_01_Vm_of_Current_Day, setAudioEVC_01_Vm_of_Current_Day] = useState(false);
const [inputHighEVC_01_Vm_of_Current_Day, setInputHighEVC_01_Vm_of_Current_Day] = useState<any>();
const [inputLowEVC_01_Vm_of_Current_Day, setInputLowEVC_01_Vm_of_Current_Day] = useState<any>();
const [HighEVC_01_Vm_of_Current_Day, setHighEVC_01_Vm_of_Current_Day] = useState<number | null>(null);
const [LowEVC_01_Vm_of_Current_Day, setLowEVC_01_Vm_of_Current_Day] = useState<number | null>(null);
const [AlarmEVC_01_Vm_of_Current_Day, setAlarmEVC_01_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Vm_of_Current_Day, setMaintainEVC_01_Vm_of_Current_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Vm_of_Current_Day === 'string' && typeof LowEVC_01_Vm_of_Current_Day === 'string' && EVC_01_Vm_of_Current_Day !== null && maintainEVC_01_Vm_of_Current_Day === false) {
            const highValue = parseFloat(HighEVC_01_Vm_of_Current_Day);
            const lowValue = parseFloat(LowEVC_01_Vm_of_Current_Day);
            const EVC_01_Vm_of_Current_DayValue = parseFloat(EVC_01_Vm_of_Current_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Current_DayValue)) {
                if (highValue <= EVC_01_Vm_of_Current_DayValue || EVC_01_Vm_of_Current_DayValue <= lowValue) {
                    if (!AudioEVC_01_Vm_of_Current_Day) {
                        audioRef.current?.play();
                        setAudioEVC_01_Vm_of_Current_Day(true);
                        setAlarmEVC_01_Vm_of_Current_Day(true);
                    }
                } else {
                    setAudioEVC_01_Vm_of_Current_Day(false);
                    setAlarmEVC_01_Vm_of_Current_Day(false);
                }
            } 
        } 
    }, [HighEVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day, AudioEVC_01_Vm_of_Current_Day, LowEVC_01_Vm_of_Current_Day,maintainEVC_01_Vm_of_Current_Day]);

    useEffect(() => {
        if (AudioEVC_01_Vm_of_Current_Day) {
            const audioEnded = () => {
                setAudioEVC_01_Vm_of_Current_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Vm_of_Current_Day]);

    const handleInputChangeHighEVC_01_Vm_of_Current_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Vm_of_Current_Day(newValue);
    };

    const handleInputChangeLowEVC_01_Vm_of_Current_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Vm_of_Current_Day(newValue2);
    };
    const ChangeMaintainEVC_01_Vm_of_Current_Day = async () => {
        try {
            const newValue = !maintainEVC_01_Vm_of_Current_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vm_of_Current_Day_Maintain: newValue }
            );
            setMaintainEVC_01_Vm_of_Current_Day(newValue);
            
            
        } catch (error) {}
    };
// ==========================VM LAST DAY 01 ============================================

// ==========================VM LAST DAY 01  ============================================
const [EVC_02_Vm_of_Current_Day, setEVC_02_Vm_of_Current_Day] = useState<string | null>(null);
const [AudioEVC_02_Vm_of_Current_Day, setAudioEVC_02_Vm_of_Current_Day] = useState(false);
const [inputHighEVC_02_Vm_of_Current_Day, setInputHighEVC_02_Vm_of_Current_Day] = useState<any>();
const [inputLowEVC_02_Vm_of_Current_Day, setInputLowEVC_02_Vm_of_Current_Day] = useState<any>();
const [HighEVC_02_Vm_of_Current_Day, setHighEVC_02_Vm_of_Current_Day] = useState<number | null>(null);
const [LowEVC_02_Vm_of_Current_Day, setLowEVC_02_Vm_of_Current_Day] = useState<number | null>(null);
const [AlarmEVC_02_Vm_of_Current_Day, setAlarmEVC_02_Vm_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Vm_of_Current_Day, setMaintainEVC_02_Vm_of_Current_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Vm_of_Current_Day === 'string' && typeof LowEVC_02_Vm_of_Current_Day === 'string' && EVC_02_Vm_of_Current_Day !== null && maintainEVC_02_Vm_of_Current_Day === false) {
            const highValue = parseFloat(HighEVC_02_Vm_of_Current_Day);
            const lowValue = parseFloat(LowEVC_02_Vm_of_Current_Day);
            const EVC_02_Vm_of_Current_DayValue = parseFloat(EVC_02_Vm_of_Current_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vm_of_Current_DayValue)) {
                if (highValue <= EVC_02_Vm_of_Current_DayValue || EVC_02_Vm_of_Current_DayValue <= lowValue) {
                    if (!AudioEVC_02_Vm_of_Current_Day) {
                        audioRef.current?.play();
                        setAudioEVC_02_Vm_of_Current_Day(true);
                        setAlarmEVC_02_Vm_of_Current_Day(true);
                    }
                } else {
                    setAudioEVC_02_Vm_of_Current_Day(false);
                    setAlarmEVC_02_Vm_of_Current_Day(false);
                }
            } 
        } 
    }, [HighEVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day, AudioEVC_02_Vm_of_Current_Day, LowEVC_02_Vm_of_Current_Day,maintainEVC_02_Vm_of_Current_Day]);

    useEffect(() => {
        if (AudioEVC_02_Vm_of_Current_Day) {
            const audioEnded = () => {
                setAudioEVC_02_Vm_of_Current_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Vm_of_Current_Day]);

    const handleInputChangeHighEVC_02_Vm_of_Current_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Vm_of_Current_Day(newValue);
    };

    const handleInputChangeLowEVC_02_Vm_of_Current_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Vm_of_Current_Day(newValue2);
    };
    const ChangeMaintainEVC_02_Vm_of_Current_Day = async () => {
        try {
            const newValue = !maintainEVC_02_Vm_of_Current_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vm_of_Current_Day_Maintain: newValue }
            );
            setMaintainEVC_02_Vm_of_Current_Day(newValue);
            
            
        } catch (error) {}
    };
// ========================== VM LAST DAY 01 ============================================



// ========================== Vb LAST DAY 01 ============================================
const [EVC_01_Vb_of_Current_Day, setEVC_01_Vb_of_Current_Day] = useState<string | null>(null);
const [AudioEVC_01_Vb_of_Current_Day, setAudioEVC_01_Vb_of_Current_Day] = useState(false);
const [inputHighEVC_01_Vb_of_Current_Day, setInputHighEVC_01_Vb_of_Current_Day] = useState<any>();
const [inputLowEVC_01_Vb_of_Current_Day, setInputLowEVC_01_Vb_of_Current_Day] = useState<any>();
const [HighEVC_01_Vb_of_Current_Day, setHighEVC_01_Vb_of_Current_Day] = useState<number | null>(null);
const [LowEVC_01_Vb_of_Current_Day, setLowEVC_01_Vb_of_Current_Day] = useState<number | null>(null);
const [AlarmEVC_01_Vb_of_Current_Day, setAlarmEVC_01_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_01_Vb_of_Current_Day, setMaintainEVC_01_Vb_of_Current_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_01_Vb_of_Current_Day === 'string' && typeof LowEVC_01_Vb_of_Current_Day === 'string' && EVC_01_Vb_of_Current_Day !== null && maintainEVC_01_Vb_of_Current_Day === false) {
            const highValue = parseFloat(HighEVC_01_Vb_of_Current_Day);
            const lowValue = parseFloat(LowEVC_01_Vb_of_Current_Day);
            const EVC_01_Vb_of_Current_DayValue = parseFloat(EVC_01_Vb_of_Current_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vb_of_Current_DayValue)) {
                if (highValue <= EVC_01_Vb_of_Current_DayValue || EVC_01_Vb_of_Current_DayValue <= lowValue) {
                    if (!AudioEVC_01_Vb_of_Current_Day) {
                        audioRef.current?.play();
                        setAudioEVC_01_Vb_of_Current_Day(true);
                        setAlarmEVC_01_Vb_of_Current_Day(true);
                    }
                } else {
                    setAudioEVC_01_Vb_of_Current_Day(false);
                    setAlarmEVC_01_Vb_of_Current_Day(false);
                }
            } 
        } 
    }, [HighEVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day, AudioEVC_01_Vb_of_Current_Day, LowEVC_01_Vb_of_Current_Day,maintainEVC_01_Vb_of_Current_Day]);

    useEffect(() => {
        if (AudioEVC_01_Vb_of_Current_Day) {
            const audioEnded = () => {
                setAudioEVC_01_Vb_of_Current_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_01_Vb_of_Current_Day]);

    const handleInputChangeHighEVC_01_Vb_of_Current_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_01_Vb_of_Current_Day(newValue);
    };

    const handleInputChangeLowEVC_01_Vb_of_Current_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_01_Vb_of_Current_Day(newValue2);
    };
    const ChangeMaintainEVC_01_Vb_of_Current_Day = async () => {
        try {
            const newValue = !maintainEVC_01_Vb_of_Current_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vb_of_Current_Day_Maintain: newValue }
            );
            setMaintainEVC_01_Vb_of_Current_Day(newValue);
            
            
        } catch (error) {}
    };
// ==========================Vb LAST DAY 01 ============================================

// ==========================Vb LAST DAY 02  ============================================
const [EVC_02_Vb_of_Current_Day, setEVC_02_Vb_of_Current_Day] = useState<string | null>(null);
const [AudioEVC_02_Vb_of_Current_Day, setAudioEVC_02_Vb_of_Current_Day] = useState(false);
const [inputHighEVC_02_Vb_of_Current_Day, setInputHighEVC_02_Vb_of_Current_Day] = useState<any>();
const [inputLowEVC_02_Vb_of_Current_Day, setInputLowEVC_02_Vb_of_Current_Day] = useState<any>();
const [HighEVC_02_Vb_of_Current_Day, setHighEVC_02_Vb_of_Current_Day] = useState<number | null>(null);
const [LowEVC_02_Vb_of_Current_Day, setLowEVC_02_Vb_of_Current_Day] = useState<number | null>(null);
const [AlarmEVC_02_Vb_of_Current_Day, setAlarmEVC_02_Vb_of_Current_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEVC_02_Vb_of_Current_Day, setMaintainEVC_02_Vb_of_Current_Day] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEVC_02_Vb_of_Current_Day === 'string' && typeof LowEVC_02_Vb_of_Current_Day === 'string' && EVC_02_Vb_of_Current_Day !== null && maintainEVC_02_Vb_of_Current_Day === false) {
            const highValue = parseFloat(HighEVC_02_Vb_of_Current_Day);
            const lowValue = parseFloat(LowEVC_02_Vb_of_Current_Day);
            const EVC_02_Vb_of_Current_DayValue = parseFloat(EVC_02_Vb_of_Current_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_02_Vb_of_Current_DayValue)) {
                if (highValue <= EVC_02_Vb_of_Current_DayValue || EVC_02_Vb_of_Current_DayValue <= lowValue) {
                    if (!AudioEVC_02_Vb_of_Current_Day) {
                        audioRef.current?.play();
                        setAudioEVC_02_Vb_of_Current_Day(true);
                        setAlarmEVC_02_Vb_of_Current_Day(true);
                    }
                } else {
                    setAudioEVC_02_Vb_of_Current_Day(false);
                    setAlarmEVC_02_Vb_of_Current_Day(false);
                }
            } 
        } 
    }, [HighEVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day, AudioEVC_02_Vb_of_Current_Day, LowEVC_02_Vb_of_Current_Day,maintainEVC_02_Vb_of_Current_Day]);

    useEffect(() => {
        if (AudioEVC_02_Vb_of_Current_Day) {
            const audioEnded = () => {
                setAudioEVC_02_Vb_of_Current_Day(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEVC_02_Vb_of_Current_Day]);

    const handleInputChangeHighEVC_02_Vb_of_Current_Day = (event: any) => {
        const newValue = event.target.value;
        setInputHighEVC_02_Vb_of_Current_Day(newValue);
    };

    const handleInputChangeLowEVC_02_Vb_of_Current_Day = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEVC_02_Vb_of_Current_Day(newValue2);
    };
    const ChangeMaintainEVC_02_Vb_of_Current_Day = async () => {
        try {
            const newValue = !maintainEVC_02_Vb_of_Current_Day;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vb_of_Current_Day_Maintain: newValue }
            );
            setMaintainEVC_02_Vb_of_Current_Day(newValue);
            
            
        } catch (error) {}
    };
// ========================== Vb LAST DAY 02 ============================================
//===========================================================================================

const [DI_UPS_BATTERY,setDI_UPS_BATTERY] = useState<string | null>(null);
const [AudioDI_UPS_BATTERY, setAudioDI_UPS_BATTERY] = useState(false);
const [inputHighDI_UPS_BATTERY, setInputHighDI_UPS_BATTERY] = useState<any>();
const [inputLowDI_UPS_BATTERY, setInputLowDI_UPS_BATTERY] = useState<any>();
const [HighDI_UPS_BATTERY, setHighDI_UPS_BATTERY] = useState<number | null>(null);
const [LowDI_UPS_BATTERY, setLowDI_UPS_BATTERY] = useState<number | null>(null);
const [AlarmDI_UPS_BATTERY, setAlarmDI_UPS_BATTERY] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_UPS_BATTERY, setMaintainDI_UPS_BATTERY] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_UPS_BATTERY === 'string' && typeof LowDI_UPS_BATTERY === 'string' && DI_UPS_BATTERY !== null && maintainDI_UPS_BATTERY === false) {
            const highValue = parseFloat(HighDI_UPS_BATTERY);
            const lowValue = parseFloat(LowDI_UPS_BATTERY);
            const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_BATTERYValue)) {
                if (highValue <= DI_UPS_BATTERYValue || DI_UPS_BATTERYValue <= lowValue) {
                    if (!AudioDI_UPS_BATTERY) {
                        audioRef.current?.play();
                        setAudioDI_UPS_BATTERY(true);
                        setAlarmDI_UPS_BATTERY(true);
                    }
                } else {
                    setAudioDI_UPS_BATTERY(false);
                    setAlarmDI_UPS_BATTERY(false);
                }
            } 
        } 
    }, [HighDI_UPS_BATTERY, DI_UPS_BATTERY, AudioDI_UPS_BATTERY, LowDI_UPS_BATTERY,maintainDI_UPS_BATTERY]);

    useEffect(() => {
        if (AudioDI_UPS_BATTERY) {
            const audioEnded = () => {
                setAudioDI_UPS_BATTERY(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_UPS_BATTERY]);

    const handleInputChangeHighDI_UPS_BATTERY = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_UPS_BATTERY(newValue);
    };

    const handleInputChangeLowDI_UPS_BATTERY = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_UPS_BATTERY(newValue2);
    };
    const ChangeMaintainDI_UPS_BATTERY = async () => {
        try {
            const newValue = !maintainDI_UPS_BATTERY;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_BATTERY_Maintain: newValue }
            );
            setMaintainDI_UPS_BATTERY(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [DI_UPS_CHARGING,setDI_UPS_CHARGING] = useState<string | null>(null);

const [AudioDI_UPS_CHARGING, setAudioDI_UPS_CHARGING] = useState(false);
const [inputHighDI_UPS_CHARGING, setInputHighDI_UPS_CHARGING] = useState<any>();
const [inputLowDI_UPS_CHARGING, setInputLowDI_UPS_CHARGING] = useState<any>();
const [HighDI_UPS_CHARGING, setHighDI_UPS_CHARGING] = useState<number | null>(null);
const [LowDI_UPS_CHARGING, setLowDI_UPS_CHARGING] = useState<number | null>(null);
const [AlarmDI_UPS_CHARGING, setAlarmDI_UPS_CHARGING] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_UPS_CHARGING, setMaintainDI_UPS_CHARGING] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_UPS_CHARGING === 'string' && typeof LowDI_UPS_CHARGING === 'string' && DI_UPS_CHARGING !== null && maintainDI_UPS_CHARGING === false) {
            const highValue = parseFloat(HighDI_UPS_CHARGING);
            const lowValue = parseFloat(LowDI_UPS_CHARGING);
            const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_CHARGINGValue)) {
                if (highValue <= DI_UPS_CHARGINGValue || DI_UPS_CHARGINGValue <= lowValue) {
                    if (!AudioDI_UPS_CHARGING) {
                        audioRef.current?.play();
                        setAudioDI_UPS_CHARGING(true);
                        setAlarmDI_UPS_CHARGING(true);
                    }
                } else {
                    setAudioDI_UPS_CHARGING(false);
                    setAlarmDI_UPS_CHARGING(false);
                }
            } 
        } 
    }, [HighDI_UPS_CHARGING, DI_UPS_CHARGING, AudioDI_UPS_CHARGING, LowDI_UPS_CHARGING,maintainDI_UPS_CHARGING]);

    useEffect(() => {
        if (AudioDI_UPS_CHARGING) {
            const audioEnded = () => {
                setAudioDI_UPS_CHARGING(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_UPS_CHARGING]);

    const handleInputChangeHighDI_UPS_CHARGING = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_UPS_CHARGING(newValue);
    };

    const handleInputChangeLowDI_UPS_CHARGING = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_UPS_CHARGING(newValue2);
    };
    const ChangeMaintainDI_UPS_CHARGING = async () => {
        try {
            const newValue = !maintainDI_UPS_CHARGING;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_CHARGING_Maintain: newValue }
            );
            setMaintainDI_UPS_CHARGING(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [DI_UPS_ALARM,setDI_UPS_ALARM] = useState<string | null>(null);
const [AudioDI_UPS_ALARM, setAudioDI_UPS_ALARM] = useState(false);
const [inputHighDI_UPS_ALARM, setInputHighDI_UPS_ALARM] = useState<any>();
const [inputLowDI_UPS_ALARM, setInputLowDI_UPS_ALARM] = useState<any>();
const [HighDI_UPS_ALARM, setHighDI_UPS_ALARM] = useState<number | null>(null);
const [LowDI_UPS_ALARM, setLowDI_UPS_ALARM] = useState<number | null>(null);
const [AlarmDI_UPS_ALARM, setAlarmDI_UPS_ALARM] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_UPS_ALARM, setMaintainDI_UPS_ALARM] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_UPS_ALARM === 'string' && typeof LowDI_UPS_ALARM === 'string' && DI_UPS_ALARM !== null && maintainDI_UPS_ALARM === false) {
            const highValue = parseFloat(HighDI_UPS_ALARM);
            const lowValue = parseFloat(LowDI_UPS_ALARM);
            const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_UPS_ALARMValue)) {
                if (highValue <= DI_UPS_ALARMValue || DI_UPS_ALARMValue <= lowValue) {
                    if (!AudioDI_UPS_ALARM) {
                        audioRef.current?.play();
                        setAudioDI_UPS_ALARM(true);
                        setAlarmDI_UPS_ALARM(true);
                    }
                } else {
                    setAudioDI_UPS_ALARM(false);
                    setAlarmDI_UPS_ALARM(false);
                }
            } 
        } 
    }, [HighDI_UPS_ALARM, DI_UPS_ALARM, AudioDI_UPS_ALARM, LowDI_UPS_ALARM,maintainDI_UPS_ALARM]);

    useEffect(() => {
        if (AudioDI_UPS_ALARM) {
            const audioEnded = () => {
                setAudioDI_UPS_ALARM(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_UPS_ALARM]);

    const handleInputChangeHighDI_UPS_ALARM = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_UPS_ALARM(newValue);
    };

    const handleInputChangeLowDI_UPS_ALARM = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_UPS_ALARM(newValue2);
    };
    const ChangeMaintainDI_UPS_ALARM = async () => {
        try {
            const newValue = !maintainDI_UPS_ALARM;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_ALARM_Maintain: newValue }
            );
            setMaintainDI_UPS_ALARM(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [UPS_Mode,setUPS_Mode] = useState<string | null>(null);
const [AudioUPS_Mode, setAudioUPS_Mode] = useState(false);
const [inputHighUPS_Mode, setInputHighUPS_Mode] = useState<any>();
const [inputLowUPS_Mode, setInputLowUPS_Mode] = useState<any>();
const [HighUPS_Mode, setHighUPS_Mode] = useState<number | null>(null);
const [LowUPS_Mode, setLowUPS_Mode] = useState<number | null>(null);
const [AlarmUPS_Mode, setAlarmUPS_Mode] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainUPS_Mode, setMaintainUPS_Mode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighUPS_Mode === 'string' && typeof LowUPS_Mode === 'string' && UPS_Mode !== null && maintainUPS_Mode === false) {
            const highValue = parseFloat(HighUPS_Mode);
            const lowValue = parseFloat(LowUPS_Mode);
            const UPS_ModeValue = parseFloat(UPS_Mode);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UPS_ModeValue)) {
                if (highValue <= UPS_ModeValue || UPS_ModeValue <= lowValue) {
                    if (!AudioUPS_Mode) {
                        audioRef.current?.play();
                        setAudioUPS_Mode(true);
                        setAlarmUPS_Mode(true);
                    }
                } else {
                    setAudioUPS_Mode(false);
                    setAlarmUPS_Mode(false);
                }
            } 
        } 
    }, [HighUPS_Mode, UPS_Mode, AudioUPS_Mode, LowUPS_Mode,maintainUPS_Mode]);

    useEffect(() => {
        if (AudioUPS_Mode) {
            const audioEnded = () => {
                setAudioUPS_Mode(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioUPS_Mode]);

    const handleInputChangeHighUPS_Mode = (event: any) => {
        const newValue = event.target.value;
        setInputHighUPS_Mode(newValue);
    };

    const handleInputChangeLowUPS_Mode = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowUPS_Mode(newValue2);
    };
    const ChangeMaintainUPS_Mode = async () => {
        try {
            const newValue = !maintainUPS_Mode;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { UPS_Mode_Maintain: newValue }
            );
            setMaintainUPS_Mode(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================


//===========================================================================================

const [DI_SELECT_SW,setDI_SELECT_SW] = useState<string | null>(null);
const [AudioDI_SELECT_SW, setAudioDI_SELECT_SW] = useState(false);
const [inputHighDI_SELECT_SW, setInputHighDI_SELECT_SW] = useState<any>();
const [inputLowDI_SELECT_SW, setInputLowDI_SELECT_SW] = useState<any>();
const [HighDI_SELECT_SW, setHighDI_SELECT_SW] = useState<number | null>(null);
const [LowDI_SELECT_SW, setLowDI_SELECT_SW] = useState<number | null>(null);
const [AlarmDI_SELECT_SW, setAlarmDI_SELECT_SW] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_SELECT_SW, setMaintainDI_SELECT_SW] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_SELECT_SW === 'string' && typeof LowDI_SELECT_SW === 'string' && DI_SELECT_SW !== null && maintainDI_SELECT_SW === false) {
            const highValue = parseFloat(HighDI_SELECT_SW);
            const lowValue = parseFloat(LowDI_SELECT_SW);
            const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SELECT_SWValue)) {
                if (highValue <= DI_SELECT_SWValue || DI_SELECT_SWValue <= lowValue) {
                    if (!AudioDI_SELECT_SW) {
                        audioRef.current?.play();
                        setAudioDI_SELECT_SW(true);
                        setAlarmDI_SELECT_SW(true);
                    }
                } else {
                    setAudioDI_SELECT_SW(false);
                    setAlarmDI_SELECT_SW(false);
                }
            } 
        } 
    }, [HighDI_SELECT_SW, DI_SELECT_SW, AudioDI_SELECT_SW, LowDI_SELECT_SW,maintainDI_SELECT_SW]);

    useEffect(() => {
        if (AudioDI_SELECT_SW) {
            const audioEnded = () => {
                setAudioDI_SELECT_SW(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_SELECT_SW]);

    const handleInputChangeHighDI_SELECT_SW = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_SELECT_SW(newValue);
    };

    const handleInputChangeLowDI_SELECT_SW = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_SELECT_SW(newValue2);
    };
    const ChangeMaintainDI_SELECT_SW = async () => {
        try {
            const newValue = !maintainDI_SELECT_SW;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_SELECT_SW_Maintain: newValue }
            );
            setMaintainDI_SELECT_SW(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [Emergency_NC,setEmergency_NC] =useState<string | null>(null);

const [AudioEmergency_NC, setAudioEmergency_NC] = useState(false);
const [inputHighEmergency_NC, setInputHighEmergency_NC] = useState<any>();
const [inputLowEmergency_NC, setInputLowEmergency_NC] = useState<any>();
const [HighEmergency_NC, setHighEmergency_NC] = useState<number | null>(null);
const [LowEmergency_NC, setLowEmergency_NC] = useState<number | null>(null);
const [AlarmEmergency_NC, setAlarmEmergency_NC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEmergency_NC, setMaintainEmergency_NC] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEmergency_NC === 'string' && typeof LowEmergency_NC === 'string' && Emergency_NC !== null && maintainEmergency_NC === false) {
            const highValue = parseFloat(HighEmergency_NC);
            const lowValue = parseFloat(LowEmergency_NC);
            const Emergency_NCValue = parseFloat(Emergency_NC);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NCValue)) {
                if (highValue <= Emergency_NCValue || Emergency_NCValue <= lowValue) {
                    if (!AudioEmergency_NC) {
                        audioRef.current?.play();
                        setAudioEmergency_NC(true);
                        setAlarmEmergency_NC(true);
                    }
                } else {
                    setAudioEmergency_NC(false);
                    setAlarmEmergency_NC(false);
                }
            } 
        } 
    }, [HighEmergency_NC, Emergency_NC, AudioEmergency_NC, LowEmergency_NC,maintainEmergency_NC]);

    useEffect(() => {
        if (AudioEmergency_NC) {
            const audioEnded = () => {
                setAudioEmergency_NC(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEmergency_NC]);

    const handleInputChangeHighEmergency_NC = (event: any) => {
        const newValue = event.target.value;
        setInputHighEmergency_NC(newValue);
    };

    const handleInputChangeLowEmergency_NC = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEmergency_NC(newValue2);
    };
    const ChangeMaintainEmergency_NC = async () => {
        try {
            const newValue = !maintainEmergency_NC;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { Emergency_NC_Maintain: newValue }
            );
            setMaintainEmergency_NC(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [Emergency_NO,setEmergency_NO] =useState<string | null>(null);


const [AudioEmergency_NO, setAudioEmergency_NO] = useState(false);
const [inputHighEmergency_NO, setInputHighEmergency_NO] = useState<any>();
const [inputLowEmergency_NO, setInputLowEmergency_NO] = useState<any>();
const [HighEmergency_NO, setHighEmergency_NO] = useState<number | null>(null);
const [LowEmergency_NO, setLowEmergency_NO] = useState<number | null>(null);
const [AlarmEmergency_NO, setAlarmEmergency_NO] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEmergency_NO, setMaintainEmergency_NO] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEmergency_NO === 'string' && typeof LowEmergency_NO === 'string' && Emergency_NO !== null && maintainEmergency_NO === false) {
            const highValue = parseFloat(HighEmergency_NO);
            const lowValue = parseFloat(LowEmergency_NO);
            const Emergency_NOValue = parseFloat(Emergency_NO);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Emergency_NOValue)) {
                if (highValue <= Emergency_NOValue || Emergency_NOValue <= lowValue) {
                    if (!AudioEmergency_NO) {
                        audioRef.current?.play();
                        setAudioEmergency_NO(true);
                        setAlarmEmergency_NO(true);
                    }
                } else {
                    setAudioEmergency_NO(false);
                    setAlarmEmergency_NO(false);
                }
            } 
        } 
    }, [HighEmergency_NO, Emergency_NO, AudioEmergency_NO, LowEmergency_NO,maintainEmergency_NO]);

    useEffect(() => {
        if (AudioEmergency_NO) {
            const audioEnded = () => {
                setAudioEmergency_NO(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEmergency_NO]);

    const handleInputChangeHighEmergency_NO = (event: any) => {
        const newValue = event.target.value;
        setInputHighEmergency_NO(newValue);
    };

    const handleInputChangeLowEmergency_NO = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEmergency_NO(newValue2);
    };
    const ChangeMaintainEmergency_NO = async () => {
        try {
            const newValue = !maintainEmergency_NO;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { Emergency_NO_Maintain: newValue }
            );
            setMaintainEmergency_NO(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [DI_RESET,setDI_RESET] =useState<string | null>(null);

const [AudioDI_RESET, setAudioDI_RESET] = useState(false);
const [inputHighDI_RESET, setInputHighDI_RESET] = useState<any>();
const [inputLowDI_RESET, setInputLowDI_RESET] = useState<any>();
const [HighDI_RESET, setHighDI_RESET] = useState<number | null>(null);
const [LowDI_RESET, setLowDI_RESET] = useState<number | null>(null);
const [AlarmDI_RESET, setAlarmDI_RESET] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_RESET, setMaintainDI_RESET] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_RESET === 'string' && typeof LowDI_RESET === 'string' && DI_RESET !== null && maintainDI_RESET === false) {
            const highValue = parseFloat(HighDI_RESET);
            const lowValue = parseFloat(LowDI_RESET);
            const DI_RESETValue = parseFloat(DI_RESET);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_RESETValue)) {
                if (highValue <= DI_RESETValue || DI_RESETValue <= lowValue) {
                    if (!AudioDI_RESET) {
                        audioRef.current?.play();
                        setAudioDI_RESET(true);
                        setAlarmDI_RESET(true);
                    }
                } else {
                    setAudioDI_RESET(false);
                    setAlarmDI_RESET(false);
                }
            } 
        } 
    }, [HighDI_RESET, DI_RESET, AudioDI_RESET, LowDI_RESET,maintainDI_RESET]);

    useEffect(() => {
        if (AudioDI_RESET) {
            const audioEnded = () => {
                setAudioDI_RESET(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_RESET]);

    const handleInputChangeHighDI_RESET = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_RESET(newValue);
    };

    const handleInputChangeLowDI_RESET = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_RESET(newValue2);
    };
    const ChangeMaintainDI_RESET = async () => {
        try {
            const newValue = !maintainDI_RESET;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_RESET_Maintain: newValue }
            );
            setMaintainDI_RESET(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [DO_HR_01,setDO_HR_01] =useState<string | null>(null);


const [AudioDO_HR_01, setAudioDO_HR_01] = useState(false);
const [inputHighDO_HR_01, setInputHighDO_HR_01] = useState<any>();
const [inputLowDO_HR_01, setInputLowDO_HR_01] = useState<any>();
const [HighDO_HR_01, setHighDO_HR_01] = useState<number | null>(null);
const [LowDO_HR_01, setLowDO_HR_01] = useState<number | null>(null);
const [AlarmDO_HR_01, setAlarmDO_HR_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDO_HR_01, setMaintainDO_HR_01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDO_HR_01 === 'string' && typeof LowDO_HR_01 === 'string' && DO_HR_01 !== null && maintainDO_HR_01 === false) {
            const highValue = parseFloat(HighDO_HR_01);
            const lowValue = parseFloat(LowDO_HR_01);
            const DO_HR_01Value = parseFloat(DO_HR_01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_HR_01Value)) {
                if (highValue <= DO_HR_01Value || DO_HR_01Value <= lowValue) {
                    if (!AudioDO_HR_01) {
                        audioRef.current?.play();
                        setAudioDO_HR_01(true);
                        setAlarmDO_HR_01(true);
                    }
                } else {
                    setAudioDO_HR_01(false);
                    setAlarmDO_HR_01(false);
                }
            } 
        } 
    }, [HighDO_HR_01, DO_HR_01, AudioDO_HR_01, LowDO_HR_01,maintainDO_HR_01]);

    useEffect(() => {
        if (AudioDO_HR_01) {
            const audioEnded = () => {
                setAudioDO_HR_01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDO_HR_01]);

    const handleInputChangeHighDO_HR_01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDO_HR_01(newValue);
    };

    const handleInputChangeLowDO_HR_01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDO_HR_01(newValue2);
    };
    const ChangeMaintainDO_HR_01 = async () => {
        try {
            const newValue = !maintainDO_HR_01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DO_HR_01_Maintain: newValue }
            );
            setMaintainDO_HR_01(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================




//===========================================================================================

const [DI_MAP_1,setDI_MAP_1] = useState<string | null>(null);

const [AudioDI_MAP_1, setAudioDI_MAP_1] = useState(false);
const [inputHighDI_MAP_1, setInputHighDI_MAP_1] = useState<any>();
const [inputLowDI_MAP_1, setInputLowDI_MAP_1] = useState<any>();
const [HighDI_MAP_1, setHighDI_MAP_1] = useState<number | null>(null);
const [LowDI_MAP_1, setLowDI_MAP_1] = useState<number | null>(null);
const [AlarmDI_MAP_1, setAlarmDI_MAP_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_MAP_1, setMaintainDI_MAP_1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_MAP_1 === 'string' && typeof LowDI_MAP_1 === 'string' && DI_MAP_1 !== null && maintainDI_MAP_1 === false) {
            const highValue = parseFloat(HighDI_MAP_1);
            const lowValue = parseFloat(LowDI_MAP_1);
            const DI_MAP_1Value = parseFloat(DI_MAP_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_MAP_1Value)) {
                if (highValue <= DI_MAP_1Value || DI_MAP_1Value <= lowValue) {
                    if (!AudioDI_MAP_1) {
                        audioRef.current?.play();
                        setAudioDI_MAP_1(true);
                        setAlarmDI_MAP_1(true);
                    }
                } else {
                    setAudioDI_MAP_1(false);
                    setAlarmDI_MAP_1(false);
                }
            } 
        } 
    }, [HighDI_MAP_1, DI_MAP_1, AudioDI_MAP_1, LowDI_MAP_1,maintainDI_MAP_1]);

    useEffect(() => {
        if (AudioDI_MAP_1) {
            const audioEnded = () => {
                setAudioDI_MAP_1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_MAP_1]);

    const handleInputChangeHighDI_MAP_1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_MAP_1(newValue);
    };

    const handleInputChangeLowDI_MAP_1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_MAP_1(newValue2);
    };
    const ChangeMaintainDI_MAP_1 = async () => {
        try {
            const newValue = !maintainDI_MAP_1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_MAP_1_Maintain: newValue }
            );
            setMaintainDI_MAP_1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [DO_SV1,setDO_SV1] =useState<string | null>(null);

const [AudioDO_SV1, setAudioDO_SV1] = useState(false);
const [inputHighDO_SV1, setInputHighDO_SV1] = useState<any>();
const [inputLowDO_SV1, setInputLowDO_SV1] = useState<any>();
const [HighDO_SV1, setHighDO_SV1] = useState<number | null>(null);
const [LowDO_SV1, setLowDO_SV1] = useState<number | null>(null);
const [AlarmDO_SV1, setAlarmDO_SV1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDO_SV1, setMaintainDO_SV1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDO_SV1 === 'string' && typeof LowDO_SV1 === 'string' && DO_SV1 !== null && maintainDO_SV1 === false) {
            const highValue = parseFloat(HighDO_SV1);
            const lowValue = parseFloat(LowDO_SV1);
            const DO_SV1Value = parseFloat(DO_SV1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_SV1Value)) {
                if (highValue <= DO_SV1Value || DO_SV1Value <= lowValue) {
                    if (!AudioDO_SV1) {
                        audioRef.current?.play();
                        setAudioDO_SV1(true);
                        setAlarmDO_SV1(true);
                    }
                } else {
                    setAudioDO_SV1(false);
                    setAlarmDO_SV1(false);
                }
            } 
        } 
    }, [HighDO_SV1, DO_SV1, AudioDO_SV1, LowDO_SV1,maintainDO_SV1]);

    useEffect(() => {
        if (AudioDO_SV1) {
            const audioEnded = () => {
                setAudioDO_SV1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDO_SV1]);

    const handleInputChangeHighDO_SV1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDO_SV1(newValue);
    };

    const handleInputChangeLowDO_SV1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDO_SV1(newValue2);
    };
    const ChangeMaintainDO_SV1 = async () => {
        try {
            const newValue = !maintainDO_SV1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DO_SV_01_Maintain: newValue }
            );
            setMaintainDO_SV1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [DI_ZSC_1,setDI_ZSC_1] =useState<string | null>(null);

const [AudioDI_ZSC_1, setAudioDI_ZSC_1] = useState(false);
const [inputHighDI_ZSC_1, setInputHighDI_ZSC_1] = useState<any>();
const [inputLowDI_ZSC_1, setInputLowDI_ZSC_1] = useState<any>();
const [HighDI_ZSC_1, setHighDI_ZSC_1] = useState<number | null>(null);
const [LowDI_ZSC_1, setLowDI_ZSC_1] = useState<number | null>(null);
const [AlarmDI_ZSC_1, setAlarmDI_ZSC_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_ZSC_1, setMaintainDI_ZSC_1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_ZSC_1 === 'string' && typeof LowDI_ZSC_1 === 'string' && DI_ZSC_1 !== null && maintainDI_ZSC_1 === false) {
            const highValue = parseFloat(HighDI_ZSC_1);
            const lowValue = parseFloat(LowDI_ZSC_1);
            const DI_ZSC_1Value = parseFloat(DI_ZSC_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSC_1Value)) {
                if (highValue <= DI_ZSC_1Value || DI_ZSC_1Value <= lowValue) {
                    if (!AudioDI_ZSC_1) {
                        audioRef.current?.play();
                        setAudioDI_ZSC_1(true);
                        setAlarmDI_ZSC_1(true);
                    }
                } else {
                    setAudioDI_ZSC_1(false);
                    setAlarmDI_ZSC_1(false);
                }
            } 
        } 
    }, [HighDI_ZSC_1, DI_ZSC_1, AudioDI_ZSC_1, LowDI_ZSC_1,maintainDI_ZSC_1]);

    useEffect(() => {
        if (AudioDI_ZSC_1) {
            const audioEnded = () => {
                setAudioDI_ZSC_1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_ZSC_1]);

    const handleInputChangeHighDI_ZSC_1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_ZSC_1(newValue);
    };

    const handleInputChangeLowDI_ZSC_1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_ZSC_1(newValue2);
    };
    const ChangeMaintainDI_ZSC_1 = async () => {
        try {
            const newValue = !maintainDI_ZSC_1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_DI_ZSC_1_Maintain: newValue }
            );
            setMaintainDI_ZSC_1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================


//===========================================================================================

const [DI_ZSO_1,setDI_ZSO_1] =useState<string | null>(null);

const [AudioDI_ZSO_1, setAudioDI_ZSO_1] = useState(false);
const [inputHighDI_ZSO_1, setInputHighDI_ZSO_1] = useState<any>();
const [inputLowDI_ZSO_1, setInputLowDI_ZSO_1] = useState<any>();
const [HighDI_ZSO_1, setHighDI_ZSO_1] = useState<number | null>(null);
const [LowDI_ZSO_1, setLowDI_ZSO_1] = useState<number | null>(null);
const [AlarmDI_ZSO_1, setAlarmDI_ZSO_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDI_ZSO_1, setMaintainDI_ZSO_1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDI_ZSO_1 === 'string' && typeof LowDI_ZSO_1 === 'string' && DI_ZSO_1 !== null && maintainDI_ZSO_1 === false) {
            const highValue = parseFloat(HighDI_ZSO_1);
            const lowValue = parseFloat(LowDI_ZSO_1);
            const DI_ZSO_1Value = parseFloat(DI_ZSO_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_ZSO_1Value)) {
                if (highValue <= DI_ZSO_1Value || DI_ZSO_1Value <= lowValue) {
                    if (!AudioDI_ZSO_1) {
                        audioRef.current?.play();
                        setAudioDI_ZSO_1(true);
                        setAlarmDI_ZSO_1(true);
                    }
                } else {
                    setAudioDI_ZSO_1(false);
                    setAlarmDI_ZSO_1(false);
                }
            } 
        } 
    }, [HighDI_ZSO_1, DI_ZSO_1, AudioDI_ZSO_1, LowDI_ZSO_1,maintainDI_ZSO_1]);

    useEffect(() => {
        if (AudioDI_ZSO_1) {
            const audioEnded = () => {
                setAudioDI_ZSO_1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDI_ZSO_1]);

    const handleInputChangeHighDI_ZSO_1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDI_ZSO_1(newValue);
    };

    const handleInputChangeLowDI_ZSO_1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDI_ZSO_1(newValue2);
    };
    const ChangeMaintainDI_ZSO_1 = async () => {
        try {
            const newValue = !maintainDI_ZSO_1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_DI_ZSO_1_Maintain: newValue }
            );
            setMaintainDI_ZSO_1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [DO_BC_01,setDO_BC_01] = useState<string | null>(null);
const [AudioDO_BC_01, setAudioDO_BC_01] = useState(false);
const [inputHighDO_BC_01, setInputHighDO_BC_01] = useState<any>();
const [inputLowDO_BC_01, setInputLowDO_BC_01] = useState<any>();
const [HighDO_BC_01, setHighDO_BC_01] = useState<number | null>(null);
const [LowDO_BC_01, setLowDO_BC_01] = useState<number | null>(null);
const [AlarmDO_BC_01, setAlarmDO_BC_01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDO_BC_01, setMaintainDO_BC_01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDO_BC_01 === 'string' && typeof LowDO_BC_01 === 'string' && DO_BC_01 !== null && maintainDO_BC_01 === false) {
            const highValue = parseFloat(HighDO_BC_01);
            const lowValue = parseFloat(LowDO_BC_01);
            const DO_BC_01Value = parseFloat(DO_BC_01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DO_BC_01Value)) {
                if (highValue <= DO_BC_01Value || DO_BC_01Value <= lowValue) {
                    if (!AudioDO_BC_01) {
                        audioRef.current?.play();
                        setAudioDO_BC_01(true);
                        setAlarmDO_BC_01(true);
                    }
                } else {
                    setAudioDO_BC_01(false);
                    setAlarmDO_BC_01(false);
                }
            } 
        } 
    }, [HighDO_BC_01, DO_BC_01, AudioDO_BC_01, LowDO_BC_01,maintainDO_BC_01]);

    useEffect(() => {
        if (AudioDO_BC_01) {
            const audioEnded = () => {
                setAudioDO_BC_01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDO_BC_01]);

    const handleInputChangeHighDO_BC_01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighDO_BC_01(newValue);
    };

    const handleInputChangeLowDO_BC_01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDO_BC_01(newValue2);
    };
    const ChangeMaintainDO_BC_01 = async () => {
        try {
            const newValue = !maintainDO_BC_01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DO_BC_01_Maintain: newValue }
            );
            setMaintainDO_BC_01(newValue);
            
            
        } catch (error) {}
    };

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
        const newMaintainEVC_01_Temperature = checked;
        const newMaintainEVC_01_Volume_at_Base_Condition = checked;
        const newMaintainEVC_01_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_01_Pressure = checked;
        const newMaintainEVC_01_Flow_at_Base_Condition = checked;
        const newMaintainEVC_01_Vm_of_Current_Day = checked;
        const newMaintainEVC_01_Vb_of_Current_Day = checked;
        const newMaintainEVC_01_Flow_at_Measurement_Condition = checked;
        const newMaintainEVC_01_Vb_of_Last_Day = checked;
        const newMaintainEVC_01_Vm_of_Last_Day = checked;

        const newMaintainEVC_02_Remain_Battery_Service_Life = checked;
        const newMaintainEVC_02_Temperature = checked;
        const newMaintainEVC_02_Volume_at_Base_Condition = checked;
        const newMaintainEVC_02_Volume_at_Measurement_Condition = checked;
        const newMaintainEVC_02_Pressure = checked;
        const newMaintainEVC_02_Flow_at_Base_Condition = checked;
        const newMaintainEVC_02_Vm_of_Current_Day = checked;
        const newMaintainEVC_02_Vb_of_Current_Day = checked;
        const newMaintainEVC_02_Flow_at_Measurement_Condition = checked;
        const newMaintainEVC_02_Vb_of_Last_Day = checked;
        const newMaintainEVC_02_Vm_of_Last_Day = checked;

        const newMaintainGD1 = checked;
        const newMaintainGD2 = checked;
        const newMaintainGD3 = checked;

        const newMaintainPT1 = checked;
        const newMaintainDI_DI_ZSO_1 = checked;
        const newMaintainDI_DI_ZSC_1 = checked;
        const newMaintainDI_MAP_1 = checked;
        const newMaintainDI_UPS_CHARGING = checked;
        const newMaintainDI_UPS_ALARM = checked;
        const newMaintainDI_SELECT_SW = checked;
        const newMaintainDI_RESET = checked;
        const newMaintainDI_UPS_BATTERY = checked;
        const newMaintainDO_SV1 = checked;

        const newMaintainEmergency_NO = checked;
        const newMaintainEmergency_NC = checked;
        const newMaintainUPS_Mode = checked;
        const newMaintainDO_HR_01 = checked;
        const newMaintainDO_BC_01 = checked;
        const newMaintainDO_SV_01 = checked;

        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
            { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
               EVC_01_Temperature_Maintain: newMaintainEVC_01_Temperature,
               EVC_01_Volume_at_Base_Condition_Maintain: newMaintainEVC_01_Volume_at_Base_Condition,
               EVC_01_Volume_at_Measurement_Condition_Maintain: newMaintainEVC_01_Volume_at_Measurement_Condition,
               EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
               EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
               EVC_01_Vm_of_Current_Day_Maintain: newMaintainEVC_01_Vm_of_Current_Day,
               EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
               EVC_01_Flow_at_Measurement_Condition_Maintain: newMaintainEVC_01_Flow_at_Measurement_Condition,
               EVC_01_Vb_of_Last_Day_Maintain: newMaintainEVC_01_Vb_of_Last_Day,
               EVC_01_Vm_of_Last_Day_Maintain: newMaintainEVC_01_Vm_of_Last_Day,


               EVC_02_Remain_Battery_Service_Life_Maintain: newMaintainEVC_02_Remain_Battery_Service_Life,
               EVC_02_Temperature_Maintain: newMaintainEVC_02_Temperature,
               EVC_02_Volume_at_Base_Condition_Maintain: newMaintainEVC_02_Volume_at_Base_Condition,
               EVC_02_Volume_at_Measurement_Condition_Maintain: newMaintainEVC_02_Volume_at_Measurement_Condition,
               EVC_02_Pressure_Maintain: newMaintainEVC_02_Pressure,
               EVC_02_Flow_at_Base_Condition_Maintain: newMaintainEVC_02_Flow_at_Base_Condition,
               EVC_02_Vm_of_Current_Day_Maintain: newMaintainEVC_02_Vm_of_Current_Day,
               EVC_02_Vb_of_Current_Day_Maintain: newMaintainEVC_02_Vb_of_Current_Day,
               EVC_02_Flow_at_Measurement_Condition_Maintain: newMaintainEVC_02_Flow_at_Measurement_Condition,
               EVC_02_Vb_of_Last_Day_Maintain: newMaintainEVC_02_Vb_of_Last_Day,
               EVC_02_Vm_of_Last_Day_Maintain: newMaintainEVC_02_Vm_of_Last_Day,

               GD1_Maintain: newMaintainGD1,
               GD2_Maintain: newMaintainGD2,
               GD3_Maintain: newMaintainGD3,

               PT1_Maintain: newMaintainPT1,
               DI_DI_ZSO_1_Maintain: newMaintainDI_DI_ZSO_1,
               DI_DI_ZSC_1_Maintain: newMaintainDI_DI_ZSC_1,
               DI_MAP_1_Maintain: newMaintainDI_MAP_1,
               DI_UPS_CHARGING_Maintain: newMaintainDI_UPS_CHARGING,
               DI_UPS_ALARM_Maintain: newMaintainDI_UPS_ALARM,
               DI_SELECT_SW_Maintain: newMaintainDI_SELECT_SW,
               DI_RESET_Maintain: newMaintainDI_RESET,
               DI_UPS_BATTERY_Maintain: newMaintainDI_UPS_BATTERY,
               DO_SV1_Maintain: newMaintainDO_SV1,

               Emergency_NO_Maintain: newMaintainEmergency_NO,
               Emergency_NC_Maintain: newMaintainEmergency_NC,
               UPS_Mode_Maintain: newMaintainUPS_Mode,
               DO_HR_01_Maintain: newMaintainDO_HR_01,
               DO_BC_01_Maintain: newMaintainDO_BC_01,
               DO_SV_01_Maintain: newMaintainDO_SV_01,


             }
        );
        setMaintainEVC_01_Remain_Battery_Service_Life(newMaintainEVC_01_Remain_Battery_Service_Life);
        setMaintainEVC_01_Temperature(newMaintainEVC_01_Temperature);
        setMaintainEVC_01_Volume_at_Base_Condition(newMaintainEVC_01_Volume_at_Base_Condition);
        setMaintainEVC_01_Volume_at_Measurement_Condition(newMaintainEVC_01_Volume_at_Measurement_Condition);
        setMaintainEVC_01_Pressure(newMaintainEVC_01_Pressure);
        setMaintainEVC_01_Flow_at_Base_Condition(newMaintainEVC_01_Flow_at_Base_Condition);
        setMaintainEVC_01_Vm_of_Current_Day(newMaintainEVC_01_Vm_of_Current_Day);
        setMaintainEVC_01_Vb_of_Current_Day(newMaintainEVC_01_Vb_of_Current_Day);
        setMaintainEVC_01_Flow_at_Measurement_Condition(newMaintainEVC_01_Flow_at_Measurement_Condition);
        setMaintainEVC_01_Vb_of_Last_Day(newMaintainEVC_01_Vb_of_Last_Day);
        setMaintainEVC_01_Vm_of_Last_Day(newMaintainEVC_01_Vm_of_Last_Day);

        setMaintainEVC_02_Remain_Battery_Service_Life(newMaintainEVC_02_Remain_Battery_Service_Life);
        setMaintainEVC_02_Temperature(newMaintainEVC_02_Temperature);
        setMaintainEVC_02_Volume_at_Base_Condition(newMaintainEVC_02_Volume_at_Base_Condition);
        setMaintainEVC_02_Volume_at_Measurement_Condition(newMaintainEVC_02_Volume_at_Measurement_Condition);
        setMaintainEVC_02_Pressure(newMaintainEVC_02_Pressure);
        setMaintainEVC_02_Flow_at_Base_Condition(newMaintainEVC_02_Flow_at_Base_Condition);
        setMaintainEVC_02_Vm_of_Current_Day(newMaintainEVC_02_Vm_of_Current_Day);
        setMaintainEVC_02_Vb_of_Current_Day(newMaintainEVC_02_Vb_of_Current_Day);
        setMaintainEVC_02_Flow_at_Measurement_Condition(newMaintainEVC_02_Flow_at_Measurement_Condition);
        setMaintainEVC_02_Vb_of_Last_Day(newMaintainEVC_02_Vb_of_Last_Day);
        setMaintainEVC_02_Vm_of_Last_Day(newMaintainEVC_02_Vm_of_Last_Day);
        

        setMaintainGD1(newMaintainGD1);
        setMaintainGD2(newMaintainGD2);
        setMaintainGD3(newMaintainGD3);

        setMaintainPT1(newMaintainPT1);
        setMaintainDI_ZSO_1(newMaintainDI_DI_ZSO_1);
        setMaintainDI_ZSC_1(newMaintainDI_DI_ZSC_1);
        setMaintainDI_MAP_1(newMaintainDI_MAP_1);
        setMaintainDI_UPS_CHARGING(newMaintainDI_UPS_CHARGING);
        setMaintainDI_UPS_ALARM(newMaintainDI_UPS_ALARM);
        setMaintainDI_SELECT_SW(newMaintainDI_SELECT_SW);
        setMaintainDI_RESET(newMaintainDI_RESET);
        setMaintainDI_UPS_BATTERY(newMaintainDI_UPS_BATTERY);
        setMaintainDO_SV1(newMaintainDO_SV1);

        setMaintainEmergency_NO(newMaintainEmergency_NO);
        setMaintainEmergency_NC(newMaintainEmergency_NC);
        setMaintainUPS_Mode(newMaintainUPS_Mode);
        setMaintainDO_HR_01(newMaintainDO_HR_01);
        setMaintainDO_BC_01(newMaintainDO_BC_01);




    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};

const handleCheckboxChange = (e:any) => {
    const isChecked = e.checked;

    handleMainTainAll(isChecked);
};

//===========================================================================================





//===========================================================================================

    useEffect(() => {
        setInputGetwayPhone(getWayPhoneOTSUKA)

        setInputValue(highEVC_01_PressureValue); 
        setInputValue2(lowEVC_01_PressureValue); 

        setInputValueEVC_01_Pressure(highEVC_01_PressureValue); 
        setInputValue2EVC_01_Pressure(lowEVC_01_PressureValue); 

        setInputValueEVC_02_PressureHigh(highEVC_02_PressurePressureValue); 
        setInputValueEVC_02_PressureLow(lowEVC_02_PressurePressureValue); 

        setInputValuePT1High(highPT1PressureValue); 
        setInputValuePT1Low(lowPT1PressureValue);    
        
        setInputHighGD1(HighGD1)
        setInputLowGD1(LowGD1)

        setInputHighGD2(HighGD2)
        setInputLowGD2(LowGD2)

        setInputHighGD3(HighGD3)
        setInputLowGD3(LowGD3)

        setInputHighEVC_01_Flow_at_Measurement_Condition(HighEVC_01_Flow_at_Measurement_Condition)
        setInputLowEVC_01_Flow_at_Measurement_Condition(LowEVC_01_Flow_at_Measurement_Condition)

        setInputHighEVC_01_Flow_at_Base_Condition(HighEVC_01_Flow_at_Base_Condition)
        setInputLowEVC_01_Flow_at_Base_Condition(LowEVC_01_Flow_at_Base_Condition)

        setInputHighEVC_01_Volume_at_Base_Condition(HighEVC_01_Volume_at_Base_Condition)
        setInputLowEVC_01_Volume_at_Base_Condition(LowEVC_01_Volume_at_Base_Condition)

        setInputHighEVC_01_Volume_at_Measurement_Condition(HighEVC_01_Volume_at_Measurement_Condition)
        setInputLowEVC_01_Volume_at_Measurement_Condition(LowEVC_01_Volume_at_Measurement_Condition)

        setInputHighEVC_02_Flow_at_Measurement_Condition(HighEVC_02_Flow_at_Measurement_Condition)
        setInputLowEVC_02_Flow_at_Measurement_Condition(LowEVC_02_Flow_at_Measurement_Condition)

        setInputHighEVC_02_Flow_at_Base_Condition(HighEVC_02_Flow_at_Base_Condition)
        setInputLowEVC_02_Flow_at_Base_Condition(LowEVC_02_Flow_at_Base_Condition)

        setInputHighEVC_02_Volume_at_Base_Condition(HighEVC_02_Volume_at_Base_Condition)
        setInputLowEVC_02_Volume_at_Base_Condition(LowEVC_02_Volume_at_Base_Condition)

        setInputHighEVC_02_Volume_at_Measurement_Condition(HighEVC_02_Volume_at_Measurement_Condition)
        setInputLowEVC_02_Volume_at_Measurement_Condition(LowEVC_02_Volume_at_Measurement_Condition)

        setInputHighEVC_01_Temperature(HighEVC_01_Temperature)
        setInputLowEVC_01_Temperature(LowEVC_01_Temperature)

        setInputHighEVC_02_Temperature(HighEVC_02_Temperature)
        setInputLowEVC_02_Temperature(LowEVC_02_Temperature)

        setInputHighEVC_01_Remain_Battery_Service_Life(HighEVC_01_Remain_Battery_Service_Life)
        setInputLowEVC_01_Remain_Battery_Service_Life(LowEVC_01_Remain_Battery_Service_Life)

        setInputHighEVC_02_Remain_Battery_Service_Life(HighEVC_02_Remain_Battery_Service_Life)
        setInputLowEVC_02_Remain_Battery_Service_Life(LowEVC_02_Remain_Battery_Service_Life)

        setInputHighEVC_01_Vm_of_Last_Day(HighEVC_01_Vm_of_Last_Day)
        setInputLowEVC_01_Vm_of_Last_Day(LowEVC_01_Vm_of_Last_Day)

        setInputHighEVC_02_Vm_of_Last_Day(HighEVC_02_Vm_of_Last_Day)
        setInputLowEVC_02_Vm_of_Last_Day(LowEVC_02_Vm_of_Last_Day)

        setInputHighEVC_01_Vb_of_Last_Day(HighEVC_01_Vb_of_Last_Day)
        setInputLowEVC_01_Vb_of_Last_Day(LowEVC_01_Vb_of_Last_Day)

        setInputHighEVC_02_Vb_of_Last_Day(HighEVC_02_Vb_of_Last_Day)
        setInputLowEVC_02_Vb_of_Last_Day(LowEVC_02_Vb_of_Last_Day)

        setInputHighEVC_01_Vm_of_Current_Day(HighEVC_01_Vm_of_Current_Day)
        setInputLowEVC_01_Vm_of_Current_Day(LowEVC_01_Vm_of_Current_Day)

        setInputHighEVC_02_Vm_of_Current_Day(HighEVC_02_Vm_of_Current_Day)
        setInputLowEVC_02_Vm_of_Current_Day(LowEVC_02_Vm_of_Current_Day)

        setInputHighEVC_01_Vb_of_Current_Day(HighEVC_01_Vb_of_Current_Day)
        setInputLowEVC_01_Vb_of_Current_Day(LowEVC_01_Vb_of_Current_Day)

        setInputHighEVC_02_Vb_of_Current_Day(HighEVC_02_Vb_of_Current_Day)
        setInputLowEVC_02_Vb_of_Current_Day(LowEVC_02_Vb_of_Current_Day)

        setInputHighDI_UPS_BATTERY(HighDI_UPS_BATTERY)
        setInputLowDI_UPS_BATTERY(LowDI_UPS_BATTERY)

        setInputHighDI_UPS_CHARGING(HighDI_UPS_CHARGING)
        setInputLowDI_UPS_CHARGING(LowDI_UPS_CHARGING)

        setInputHighDI_UPS_ALARM(HighDI_UPS_ALARM)
        setInputLowDI_UPS_ALARM(LowDI_UPS_ALARM)

        setInputHighUPS_Mode(HighUPS_Mode)
        setInputLowUPS_Mode(LowUPS_Mode)

        setInputHighDI_SELECT_SW(HighDI_SELECT_SW)
        setInputLowDI_SELECT_SW(LowDI_SELECT_SW)

        setInputHighEmergency_NC(HighEmergency_NC)
        setInputLowEmergency_NC(LowEmergency_NC)

        setInputHighEmergency_NO(HighEmergency_NO)
        setInputLowEmergency_NO(LowEmergency_NO)

        setInputHighDI_RESET(HighDI_RESET)
        setInputLowDI_RESET(LowDI_RESET)

        setInputHighDO_HR_01(HighDO_HR_01)
        setInputLowDO_HR_01(LowDO_HR_01)

        setInputHighDI_MAP_1(HighDI_MAP_1)
        setInputLowDI_MAP_1(LowDI_MAP_1)

        setInputHighDI_ZSC_1(HighDI_ZSC_1)
        setInputLowDI_ZSC_1(LowDI_ZSC_1)

        setInputHighDI_ZSO_1(HighDI_ZSO_1)
        setInputLowDI_ZSO_1(LowDI_ZSO_1)

        setInputHighDO_SV1(HighDO_SV1)
        setInputLowDO_SV1(LowDO_SV1)


        setInputHighDO_BC_01(HighDO_BC_01)
        setInputLowDO_BC_01(LowDO_BC_01)

    }, [highEVC_01_PressureValue, lowEVC_01_PressureValue,
         highEVC_02_PressurePressureValue, lowEVC_02_PressurePressureValue ,
         highPT1PressureValue, lowPT1PressureValue, 
         HighGD1, LowGD1,
         HighGD2, LowGD2,
         HighGD3, LowGD3 ,

         HighEVC_01_Flow_at_Measurement_Condition, LowEVC_01_Flow_at_Measurement_Condition ,
         HighEVC_01_Flow_at_Base_Condition, LowEVC_01_Flow_at_Base_Condition ,
         HighEVC_01_Volume_at_Base_Condition, LowEVC_01_Volume_at_Base_Condition ,
         HighEVC_01_Volume_at_Measurement_Condition, LowEVC_01_Volume_at_Measurement_Condition ,

         HighEVC_02_Flow_at_Measurement_Condition, LowEVC_02_Flow_at_Measurement_Condition ,
         HighEVC_02_Flow_at_Base_Condition, LowEVC_02_Flow_at_Base_Condition ,
         HighEVC_02_Volume_at_Base_Condition, LowEVC_02_Volume_at_Base_Condition ,
         HighEVC_02_Volume_at_Measurement_Condition, LowEVC_02_Volume_at_Measurement_Condition ,

         HighEVC_01_Temperature, LowEVC_01_Temperature ,
         HighEVC_02_Temperature, LowEVC_02_Temperature ,

         HighEVC_01_Remain_Battery_Service_Life, LowEVC_01_Remain_Battery_Service_Life ,
         HighEVC_02_Remain_Battery_Service_Life, LowEVC_02_Remain_Battery_Service_Life ,

         HighEVC_01_Vm_of_Last_Day, LowEVC_01_Vm_of_Last_Day ,
         HighEVC_02_Vm_of_Last_Day, LowEVC_02_Vm_of_Last_Day ,
         HighEVC_01_Vb_of_Last_Day, LowEVC_01_Vb_of_Last_Day ,
         HighEVC_02_Vb_of_Last_Day, LowEVC_02_Vb_of_Last_Day ,

         HighEVC_01_Vm_of_Current_Day, LowEVC_01_Vm_of_Current_Day ,
         HighEVC_02_Vm_of_Current_Day, LowEVC_02_Vm_of_Current_Day ,
         HighEVC_01_Vb_of_Current_Day, LowEVC_01_Vb_of_Current_Day ,
         HighEVC_02_Vb_of_Current_Day, LowEVC_02_Vb_of_Current_Day ,

         HighDI_UPS_BATTERY, LowDI_UPS_BATTERY ,
         HighDI_UPS_CHARGING, LowDI_UPS_CHARGING ,
         HighDI_UPS_ALARM, LowDI_UPS_ALARM ,
         HighUPS_Mode, LowUPS_Mode ,

         HighDI_SELECT_SW, LowDI_SELECT_SW ,

         HighEmergency_NO, LowEmergency_NO ,
         HighEmergency_NC, LowEmergency_NC ,

         HighDI_RESET, LowDI_RESET ,

         HighDO_HR_01, LowDO_HR_01 ,
         HighDI_MAP_1, LowDI_MAP_1 ,
         
         HighDI_ZSC_1, LowDI_ZSC_1 ,
         HighDI_ZSO_1, LowDI_ZSO_1 ,
         HighDO_SV1, LowDO_SV1 ,
         HighDO_BC_01, LowDO_BC_01 ,

         getWayPhoneOTSUKA
         
        ]);
    
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Pressure_High: inputValue,EVC_01_Pressure_Low:inputValue2,
                    EVC_02_Pressure_High: inputValueEVC_02_PressureHigh, EVC_02_Pressure_Low:inputValueEK1Low,
                    PT1_High:inputValuePT1High, PT1_Low:inputValuePT1Low,
                
                    GD1_High:inputHighGD1, GD1_Low:inputLowGD1,
                    GD2_High:inputHighGD2, GD2_Low:inputLowGD2,
                    GD3_High:inputHighGD3, GD3_Low:inputLowGD3,

                    EVC_01_Flow_at_Measurement_Condition_High:inputHighEVC_01_Flow_at_Measurement_Condition, EVC_01_Flow_at_Measurement_Condition_Low:inputLowEVC_01_Flow_at_Measurement_Condition,
                    EVC_01_Flow_at_Base_Condition_High:inputHighEVC_01_Flow_at_Base_Condition, EVC_01_Flow_at_Base_Condition_Low:inputLowEVC_01_Flow_at_Base_Condition,
                    EVC_01_Volume_at_Base_Condition_High:inputHighEVC_01_Volume_at_Base_Condition, EVC_01_Volume_at_Base_Condition_Low:inputLowEVC_01_Volume_at_Base_Condition,
                    EVC_01_Volume_at_Measurement_Condition_High:inputHighEVC_01_Volume_at_Measurement_Condition, EVC_01_Volume_at_Measurement_Condition_Low:inputLowEVC_01_Volume_at_Measurement_Condition,

                    EVC_02_Flow_at_Measurement_Condition_High:inputHighEVC_02_Flow_at_Measurement_Condition, EVC_02_Flow_at_Measurement_Condition_Low:inputLowEVC_02_Flow_at_Measurement_Condition,
                    EVC_02_Flow_at_Base_Condition_High:inputHighEVC_02_Flow_at_Base_Condition, EVC_02_Flow_at_Base_Condition_Low:inputLowEVC_02_Flow_at_Base_Condition,
                    EVC_02_Volume_at_Base_Condition_High:inputHighEVC_02_Volume_at_Base_Condition, EVC_02_Volume_at_Base_Condition_Low:inputLowEVC_02_Volume_at_Base_Condition,
                    EVC_02_Volume_at_Measurement_Condition_High:inputHighEVC_02_Volume_at_Measurement_Condition, EVC_02_Volume_at_Measurement_Condition_Low:inputLowEVC_02_Volume_at_Measurement_Condition,

                    EVC_01_Temperature_High:inputHighEVC_01_Temperature, EVC_01_Temperature_Low:inputLowEVC_01_Temperature,
                    EVC_02_Temperature_High:inputHighEVC_02_Temperature, EVC_02_Temperature_Low:inputLowEVC_02_Temperature,

                    EVC_01_Remain_Battery_Service_Life_High:inputHighEVC_01_Remain_Battery_Service_Life, EVC_01_Remain_Battery_Service_Life_Low:inputLowEVC_01_Remain_Battery_Service_Life,
                    EVC_02_Remain_Battery_Service_Life_High:inputHighEVC_02_Remain_Battery_Service_Life, EVC_02_Remain_Battery_Service_Life_Low:inputLowEVC_02_Remain_Battery_Service_Life,

                    EVC_01_Vm_of_Last_Day_High:inputHighEVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low:inputLowEVC_01_Vm_of_Last_Day,
                    EVC_02_Vm_of_Last_Day_High:inputHighEVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_Low:inputLowEVC_02_Vm_of_Last_Day,

                    EVC_01_Vb_of_Last_Day_High:inputHighEVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low:inputLowEVC_01_Vb_of_Last_Day,
                    EVC_02_Vb_of_Last_Day_High:inputHighEVC_02_Vb_of_Last_Day, EVC_02_Vb_of_Last_Day_Low:inputLowEVC_02_Vb_of_Last_Day,

                    EVC_01_Vb_of_Current_Day_High:inputHighEVC_01_Vb_of_Current_Day, EVC_01_Vb_of_Current_Day_Low:inputLowEVC_01_Vb_of_Current_Day,
                    EVC_02_Vb_of_Current_Day_High:inputHighEVC_02_Vb_of_Current_Day, EVC_02_Vb_of_Current_Day_Low:inputLowEVC_02_Vb_of_Current_Day,

                    EVC_01_Vm_of_Current_Day_High:inputHighEVC_01_Vm_of_Current_Day, EVC_01_Vm_of_Current_Day_Low:inputLowEVC_01_Vm_of_Current_Day,
                    EVC_02_Vm_of_Current_Day_High:inputHighEVC_02_Vm_of_Current_Day, EVC_02_Vm_of_Current_Day_Low:inputLowEVC_02_Vm_of_Current_Day,

                    DI_UPS_BATTERY_High:inputHighDI_UPS_BATTERY, DI_UPS_BATTERY_Low:inputLowDI_UPS_BATTERY,
                    DI_UPS_CHARGING_High:inputHighDI_UPS_CHARGING, DI_UPS_CHARGING_Low:inputLowDI_UPS_CHARGING,

                    DI_UPS_ALARM_High:inputHighDI_UPS_ALARM, DI_UPS_ALARM_Low:inputLowDI_UPS_ALARM,
                    UPS_Mode_High:inputHighUPS_Mode, UPS_Mode_Low:inputLowUPS_Mode,

                    DI_SELECT_SW_High:inputHighDI_SELECT_SW, DI_SELECT_SW_Low:inputLowDI_SELECT_SW,

                    Emergency_NO_High:inputHighEmergency_NO, Emergency_NO_Low:inputLowEmergency_NO,
                    Emergency_NC_High:inputHighEmergency_NC, Emergency_NC_Low:inputLowEmergency_NC,

                    DI_RESET_High:inputHighDI_RESET, DI_RESET_Low:inputLowDI_RESET,

                    DO_HR_01_High:inputHighDO_HR_01, DO_HR_01_Low:inputLowDO_HR_01,

                    DI_MAP_1_High:inputHighDI_MAP_1, DI_MAP_1_Low:inputLowDI_MAP_1,

                    DI_DI_ZSC_1_High:inputHighDI_ZSC_1, DI_DI_ZSC_1_Low:inputLowDI_ZSC_1,
                    DI_DI_ZSO_1_High:inputHighDI_ZSO_1, DI_DI_ZSO_1_Low:inputLowDI_ZSO_1,

                    DO_SV_01_High:inputHighDO_SV1, DO_SV_01_Low:inputLowDO_SV1,
                    DO_BC_01_High:inputHighDO_BC_01, DO_BC_01_Low:inputLowDO_BC_01,


            IOT_Gateway_Phone:inputGetwayPhone

                }
            );

            setHighEVC_01_PressureValue(inputValue);
            setLowEVC_01_PressureValue(inputValue2);

            setHighEVC_02_PressurePressureValue(inputValueEVC_02_PressureHigh);
            setLowEVC_02_PressurePressureValue(inputValueEK1Low);

            setHighPT1PressureValue(inputValuePT1High);
            setLowPT1PressureValue(inputValuePT1Low);


            setHighGD1(inputHighGD1);
            setLowGD1(inputLowGD1);

            setHighGD2(inputHighGD2);
            setLowGD2(inputLowGD2);

            setHighGD3(inputHighGD3);
            setLowGD3(inputLowGD3);


            setHighEVC_01_Flow_at_Measurement_Condition(inputHighEVC_01_Flow_at_Measurement_Condition);
            setLowEVC_01_Flow_at_Measurement_Condition(inputLowEVC_01_Flow_at_Measurement_Condition);

            setHighEVC_01_Flow_at_Base_Condition(inputHighEVC_01_Flow_at_Base_Condition);
            setLowEVC_01_Flow_at_Base_Condition(inputLowEVC_01_Flow_at_Base_Condition);

            setHighEVC_01_Volume_at_Base_Condition(inputHighEVC_01_Volume_at_Base_Condition);
            setLowEVC_01_Volume_at_Base_Condition(inputLowEVC_01_Volume_at_Base_Condition);

            setHighEVC_01_Volume_at_Measurement_Condition(inputHighEVC_01_Volume_at_Measurement_Condition);
            setLowEVC_01_Volume_at_Measurement_Condition(inputLowEVC_01_Volume_at_Measurement_Condition);

            setHighEVC_02_Flow_at_Measurement_Condition(inputHighEVC_02_Flow_at_Measurement_Condition);
            setLowEVC_02_Flow_at_Measurement_Condition(inputLowEVC_02_Flow_at_Measurement_Condition);

            setHighEVC_02_Flow_at_Base_Condition(inputHighEVC_02_Flow_at_Base_Condition);
            setLowEVC_02_Flow_at_Base_Condition(inputLowEVC_02_Flow_at_Base_Condition);

            setHighEVC_02_Volume_at_Base_Condition(inputHighEVC_02_Volume_at_Base_Condition);
            setLowEVC_02_Volume_at_Base_Condition(inputLowEVC_02_Volume_at_Base_Condition);

            setHighEVC_02_Volume_at_Measurement_Condition(inputHighEVC_02_Volume_at_Measurement_Condition);
            setLowEVC_02_Volume_at_Measurement_Condition(inputLowEVC_02_Volume_at_Measurement_Condition);

            setHighEVC_01_Temperature(inputHighEVC_01_Temperature);
            setLowEVC_01_Temperature(inputLowEVC_01_Temperature);


            setHighEVC_02_Temperature(inputHighEVC_02_Temperature);
            setLowEVC_02_Temperature(inputLowEVC_02_Temperature);


            setHighEVC_01_Remain_Battery_Service_Life(inputHighEVC_01_Remain_Battery_Service_Life);
            setLowEVC_01_Remain_Battery_Service_Life(inputLowEVC_01_Remain_Battery_Service_Life);

            setHighEVC_02_Remain_Battery_Service_Life(inputHighEVC_02_Remain_Battery_Service_Life);
            setLowEVC_02_Remain_Battery_Service_Life(inputLowEVC_02_Remain_Battery_Service_Life);


            setHighEVC_01_Vm_of_Last_Day(inputHighEVC_01_Vm_of_Last_Day);
            setLowEVC_01_Vm_of_Last_Day(inputLowEVC_01_Vm_of_Last_Day);

            setHighEVC_02_Vm_of_Last_Day(inputHighEVC_02_Vm_of_Last_Day);
            setLowEVC_02_Vm_of_Last_Day(inputLowEVC_02_Vm_of_Last_Day);


            setHighEVC_01_Vb_of_Last_Day(inputHighEVC_01_Vb_of_Last_Day);
            setLowEVC_01_Vb_of_Last_Day(inputLowEVC_01_Vb_of_Last_Day);

            setHighEVC_02_Vb_of_Last_Day(inputHighEVC_02_Vb_of_Last_Day);
            setLowEVC_02_Vb_of_Last_Day(inputLowEVC_02_Vb_of_Last_Day);

            setHighEVC_01_Vb_of_Current_Day(inputHighEVC_01_Vb_of_Current_Day);
            setLowEVC_01_Vb_of_Current_Day(inputLowEVC_01_Vb_of_Current_Day);

            setHighEVC_02_Vb_of_Current_Day(inputHighEVC_02_Vb_of_Current_Day);
            setLowEVC_02_Vb_of_Current_Day(inputLowEVC_02_Vb_of_Current_Day);

            setHighEVC_01_Vm_of_Current_Day(inputHighEVC_01_Vm_of_Current_Day);
            setLowEVC_01_Vm_of_Current_Day(inputLowEVC_01_Vm_of_Current_Day);

            setHighEVC_02_Vm_of_Current_Day(inputHighEVC_02_Vm_of_Current_Day);
            setLowEVC_02_Vm_of_Current_Day(inputLowEVC_02_Vm_of_Current_Day);

            setHighDI_UPS_BATTERY(inputHighDI_UPS_BATTERY);
            setLowDI_UPS_BATTERY(inputLowDI_UPS_BATTERY);


            setHighDI_UPS_CHARGING(inputHighDI_UPS_CHARGING);
            setLowDI_UPS_CHARGING(inputLowDI_UPS_CHARGING);

            setHighDI_UPS_ALARM(inputHighDI_UPS_ALARM);
            setLowDI_UPS_ALARM(inputLowDI_UPS_ALARM);

            setHighUPS_Mode(inputHighUPS_Mode);
            setLowUPS_Mode(inputLowUPS_Mode);

            setHighDI_SELECT_SW(inputHighDI_SELECT_SW);
            setLowDI_SELECT_SW(inputLowDI_SELECT_SW);

            setHighEmergency_NC(inputHighEmergency_NC);
            setLowEmergency_NC(inputLowEmergency_NC);

            setHighEmergency_NO(inputHighEmergency_NO);
            setLowEmergency_NO(inputLowEmergency_NO);

            setHighDI_RESET(inputHighDI_RESET);
            setLowDI_RESET(inputLowDI_RESET);

            setHighDO_HR_01(inputHighDO_HR_01);
            setLowDO_HR_01(inputLowDO_HR_01);

            setHighDI_MAP_1(inputHighDI_MAP_1);
            setLowDI_MAP_1(inputLowDI_MAP_1);

            setHighDI_ZSC_1(inputHighDI_ZSC_1);
            setLowDI_ZSC_1(inputLowDI_ZSC_1);

            setHighDI_ZSO_1(inputHighDI_ZSO_1);
            setLowDI_ZSO_1(inputLowDI_ZSO_1);


            setHighDO_SV1(inputHighDO_SV1);
            setLowDO_SV1(inputLowDO_SV1);

            setHighDO_BC_01(inputHighDO_BC_01);
            setLowDO_BC_01(inputLowDO_BC_01);

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
                color:exceedThreshold && !maintainEVC_01_Pressure
                ? "#ff5656"
                : maintainEVC_01_Pressure
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSSEVC_02_Pressure : {
                color:exceedThreshold2 && !maintainEVC_02_Pressure
                ? "#ff5656"
                : maintainEVC_02_Pressure
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSSPT1 : {
                color:exceedThreshold3 && !maintainPT1
                ? "#ff5656"
                : maintainPT1
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },

            CSSGD1 : {
                color:AlarmGD1 && !maintainGD1
                ? "#ff5656"
                : maintainGD1
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSSGD2 : {
                color:AlarmGD2 && !maintainGD2
                ? "#ff5656"
                : maintainGD2
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSSgd3 : {
                color:AlarmGD3 && !maintainGD3
                ? "#ff5656"
                : maintainGD3
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Flow_at_Measurement_Condition : {
                color:AlarmEVC_01_Flow_at_Measurement_Condition && !maintainEVC_01_Flow_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_01_Flow_at_Measurement_Condition
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Flow_at_Base_Condition : {
                color:AlarmEVC_01_Flow_at_Base_Condition&& !maintainEVC_01_Flow_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_01_Flow_at_Base_Condition
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                
            },
             CSS_EVC_01_Volume_at_Base_Condition : {
                color:AlarmEVC_01_Volume_at_Base_Condition && !maintainEVC_01_Volume_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_01_Volume_at_Base_Condition
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_01_Volume_at_Measurement_Condition : {
                color:AlarmEVC_01_Volume_at_Measurement_Condition && !maintainEVC_01_Volume_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_01_Volume_at_Measurement_Condition
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Flow_at_Measurement_Condition : {
                color:AlarmEVC_02_Flow_at_Measurement_Condition && !maintainEVC_02_Flow_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_02_Flow_at_Measurement_Condition
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Flow_at_Base_Condition : {
                color:AlarmEVC_02_Flow_at_Base_Condition && !maintainEVC_02_Flow_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_02_Flow_at_Base_Condition
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
             CSS_EVC_02_Volume_at_Base_Condition : {
                color:AlarmEVC_02_Volume_at_Base_Condition&& !maintainEVC_02_Volume_at_Base_Condition
                ? "#ff5656"
                : maintainEVC_02_Volume_at_Base_Condition
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Volume_at_Measurement_Condition : {
                color:AlarmEVC_02_Volume_at_Measurement_Condition && !maintainEVC_02_Volume_at_Measurement_Condition
                ? "#ff5656"
                : maintainEVC_02_Volume_at_Measurement_Condition
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Temperature : {
                color:AlarmEVC_01_Temperature && !maintainEVC_01_Temperature
                ? "#ff5656"
                : maintainEVC_01_Temperature
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_02_Temperature : {
                color:AlarmEVC_02_Temperature && !maintainEVC_02_Temperature
                ? "#ff5656"
                : maintainEVC_02_Temperature
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_Rebattery : {
                color:AlarmEVC_01_Remain_Battery_Service_Life && !maintainEVC_01_Remain_Battery_Service_Life
                ? "#ff5656"
                : maintainEVC_01_Remain_Battery_Service_Life
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Remain_Battery_Service_Life : {
                color:AlarmEVC_02_Remain_Battery_Service_Life && !maintainEVC_02_Remain_Battery_Service_Life
                ? "#ff5656"
                : maintainEVC_02_Remain_Battery_Service_Life
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vm_of_Last_Day : {
                color:AlarmEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day
                ? "#ff5656"
                : maintainEVC_01_Vm_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vm_of_Last_Day : {
                color:AlarmEVC_02_Vm_of_Last_Day && !maintainEVC_02_Vm_of_Last_Day
                ? "#ff5656"
                : maintainEVC_02_Vm_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vb_of_Last_Day : {
                color:AlarmEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day
                ? "#ff5656"
                : maintainEVC_01_Vb_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vb_of_Last_Day : {
                color:AlarmEVC_02_Vb_of_Last_Day && !maintainEVC_02_Vb_of_Last_Day
                ? "#ff5656"
                : maintainEVC_02_Vb_of_Last_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_EVC_01_Vm_of_Current_Day : {
                color:AlarmEVC_01_Vm_of_Current_Day && !maintainEVC_01_Vm_of_Current_Day
                ? "#ff5656"
                : maintainEVC_01_Vm_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vm_of_Current_Day : {
                color:AlarmEVC_02_Vm_of_Current_Day && !maintainEVC_02_Vm_of_Current_Day
                ? "#ff5656"
                : maintainEVC_02_Vm_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_EVC_01_Vb_of_Current_Day : {
                color:AlarmEVC_01_Vb_of_Current_Day && !maintainEVC_01_Vb_of_Current_Day
                ? "#ff5656"
                : maintainEVC_01_Vb_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_EVC_02_Vb_of_Current_Day : {
                color:AlarmEVC_02_Vb_of_Current_Day && !maintainEVC_02_Vb_of_Current_Day
                ? "#ff5656"
                : maintainEVC_02_Vb_of_Current_Day
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_DI_UPS_BATTERY : {
                color:AlarmDI_UPS_BATTERY && !maintainDI_UPS_BATTERY
                ? "#ff5656"
                : maintainDI_UPS_BATTERY
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_DI_UPS_CHARGING: {
                color:AlarmDI_UPS_CHARGING && !maintainDI_UPS_CHARGING
                ? "#ff5656"
                : maintainDI_UPS_CHARGING
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_DI_UPS_ALARM: {
                color:AlarmDI_UPS_ALARM && !maintainDI_UPS_ALARM
                ? "#ff5656"
                : maintainDI_UPS_ALARM
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
            CSS_UPS_Mode: {
                color:AlarmUPS_Mode && !maintainUPS_Mode
                ? "#ff5656"
                : maintainUPS_Mode
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            }, 
              CSS_DI_SELECT_SW: {
                color:AlarmDI_SELECT_SW && !maintainDI_SELECT_SW
                ? "#ff5656"
                : maintainDI_SELECT_SW
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Emergency_NO: {
                color:AlarmEmergency_NO && !maintainEmergency_NO
                ? "#ff5656"
                : maintainEmergency_NO
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Emergency_NC: {
                color:AlarmEmergency_NC && !maintainEmergency_NC
                ? "#ff5656"
                : maintainEmergency_NC
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Reset: {
                color:AlarmDI_RESET && !maintainDI_RESET
                ? "#ff5656"
                : maintainDI_RESET
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_Horn: {
                color:AlarmDO_HR_01 && !maintainDO_HR_01
                ? "#ff5656"
                : maintainDO_HR_01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
           

            CSS_Map: {
                color:AlarmDI_MAP_1 && !maintainDI_MAP_1
                ? "#ff5656"
                : maintainDI_MAP_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_ZSC: {
                color:AlarmDI_ZSC_1 && !maintainDI_ZSC_1
                ? "#ff5656"
                : maintainDI_ZSC_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },


            CSS_ZSO: {
                color:AlarmDI_ZSO_1 && !maintainDI_ZSO_1
                ? "#ff5656"
                : maintainDI_ZSO_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },
              CSS_SELENOID: {
                color:AlarmDO_SV1 && !maintainDO_SV1
                ? "#ff5656"
                : maintainDO_SV1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                
            },

            CSS_DO_BC_01: {
                color:AlarmDO_BC_01 && !maintainDO_BC_01
                ? "#ff5656"
                : maintainDO_BC_01
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

      const paragraphContents = {

        SVF: "Standard Volume Flow",
        GVF: "Gross Volume Flow",
        SVA: "Standard Volume Accumulated",
        GVA: "Gross Volume Accumulated",

        PT: "Output Pressure",
        TT: "Temperature",

        PSV: "Pressure Safety Valve",
        PCV1: "Pressure Control Valve 1901",
        PCV2: "Pressure Control Valve 1902",

        SSV: "Slam Shut Off Valve",
        SDV: "Shutdown valve",

        VB_TODAY:"Standard Volume Vb Today",
        VB_Yesterday:"Standard Volume Vb Yesterday ",
        VM_TODAY:"Gross Volume Vm Today",
        VM_Yesterday:"Gross Volume Vm Yesterday",
        ReBattery:"Remainning Battery"
    };

    const modbusEVC1 = {

        
        SVF: "40010",
        GVF: "40012",
        SVA: "40006",
        GVA: "40008",

        PT: "40004",
        TT: "40002",


        VB_TODAY:"40014",
        VB_Yesterday:"40018",
        VM_TODAY:"40016",
        VM_Yesterday:"40020",
        ReBattery:"40001"

    }

    const modbusEVC2 = {

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
        ReBattery:"40001"
    }

    const modbusPLC = {
        PT1:"40006",
        GD1:"40002",
        GD2:"40004",
        GD3:"40030",
        
        SDV_ZSO:"40008",
        SDV_ZSC:"40010",
        DI_MAP_1:"40013",
        UPS_BATTERY:"40014",
        UPS_CHARGING:"40015",
        UPS_ALARM:"40016",
        DI_SELECT_SW:"40018",
        RESET:"40019",
        Emergency_Stop_NO:"40020",
        Emergency_Stop_NC:"40021",
        UPS_MODE:"40021",
        SDV_SOLENOID:"40028",
        HORN:"40026",
        DO_BC_01:"40027"
    }

    const mainCategoryEVC = {
       
        EVC01: <span  style={{display:'flex', justifyContent:'space-between'}}> EVC-1901 -  Parameters & Configurations   {AuthInput ? " " : <Checkbox
        
    
        style={{ marginRight: 183, marginTop:5 }}
        onChange={handleCheckboxChange}
        checked={maintainEVC_01_Remain_Battery_Service_Life}
    /> } </span>,
        EVC02: 'EVC-1902 -  Parameters & Configurations',
        PLC: 'PLC -  Parameters & Configurations'
    };
    

      const dataEVC01 = [

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}> {modbusEVC1.SVF}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}>{paragraphContents.SVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Flow_at_Base_Condition} > {EVC_01_Flow_at_Base_Conditionformat}  {nameValue.Sm3h}  </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeHighEVC_01_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Flow_at_Base_Condition} onChange={handleInputChangeLowEVC_01_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVF_01}
         checked={maintainEVC_01_Flow_at_Base_Condition}
     ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}>{modbusEVC1.GVF}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}>{paragraphContents.GVF} </span> ,


        value: <span style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition} > {EVC_01_Flow_at_Measurement_Conditionformat}  {nameValue.m3h}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeHighEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Flow_at_Measurement_Condition} onChange={handleInputChangeLowEVC_01_Flow_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVF_01}
         checked={maintainEVC_01_Flow_at_Measurement_Condition}
     ></Checkbox>

        },
       
          { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>{modbusEVC1.SVA}</span> ,

        name: <span  style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>{paragraphContents.SVA}	 </span> ,
        // modbus: <span  style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}>40854	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Volume_at_Base_Condition} >  {EVC_01_Volume_at_Base_Conditionformat}  {nameValue.Sm3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeHighEVC_01_Volume_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Volume_at_Base_Condition} onChange={handleInputChangeLowEVC_01_Volume_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVA_01}
         checked={maintainEVC_01_Volume_at_Base_Condition}
     ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>{modbusEVC1.GVA}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>{paragraphContents.GVA}	 </span> ,
        // modbus: <span  style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}>40872	 </span> ,

        value: <span style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition} > {EVC_01_Volume_at_Measurement_Conditionformat} {nameValue.m3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeHighEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_01_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Volume_at_Measurement_Condition} onChange={handleInputChangeLowEVC_01_Volume_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVA_01}
         checked={maintainEVC_01_Volume_at_Measurement_Condition}
     ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSSEVC_01_Pressure} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSSEVC_01_Pressure}>{modbusEVC1.PT}</span> ,

        name: <span style={combineCss.CSSEVC_01_Pressure}>{'Output Pressure'} </span> ,
        value: <span style={combineCss.CSSEVC_01_Pressure} > {EVC_01_Pressure} {nameValue.Bara}</span> , 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_01_Pressure}  placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Pressure} onChange={handleInputChange} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_01_Pressure}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Pressure} onChange={handleInputChange2} inputMode="decimal" />,
     update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainEVC_01_Pressure}
     checked={maintainEVC_01_Pressure}
 ></Checkbox>
        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_Temperature} >{EVC_STT01Value}</span>,
    name: <span style={combineCss.CSS_Temperature}>{paragraphContents.TT} </span> ,
    modbus: <span style={combineCss.CSS_Temperature}>{modbusEVC1.TT}</span> ,

    value: <span style={combineCss.CSS_Temperature} > {EVC_01_Temperature} {nameValue.C}</span>, 
    high: <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_Temperature}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Temperature} onChange={handleInputChangeHighEVC_01_Temperature} inputMode="decimal" />, 
    low:  <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_Temperature}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Temperature} onChange={handleInputChangeLowEVC_01_Temperature} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_01_Temperature}
    checked={maintainEVC_01_Temperature}
></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day}>{modbusEVC1.VB_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day}> {paragraphContents.VB_TODAY}</span> ,

        value: <span style={combineCss.CSS_EVC_01_Vb_of_Current_Day} > {VBTodayformat} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Vb_of_Current_Day} onChange={handleInputChangeHighEVC_01_Vb_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vb_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Vb_of_Current_Day} onChange={handleInputChangeLowEVC_01_Vb_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vb_of_Current_Day}
        checked={maintainEVC_01_Vb_of_Current_Day}
    ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day}>{modbusEVC1.VM_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day}>{paragraphContents.VM_TODAY}</span> ,
        value: <span style={combineCss.CSS_EVC_01_Vm_of_Current_Day} > {VMTodayformat} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Vm_of_Current_Day} onChange={handleInputChangeHighEVC_01_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Vm_of_Current_Day} onChange={handleInputChangeLowEVC_01_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vm_of_Current_Day}
        checked={maintainEVC_01_Vm_of_Current_Day}
    ></Checkbox>

        },

       { 
            mainCategory: mainCategoryEVC.EVC01,
        
        timeUpdate: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day} >{EVC_STT01Value}</span>,
       modbus: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day}>{modbusEVC1.VB_Yesterday}</span> ,

       name: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day}> {paragraphContents.VB_Yesterday}</span> ,

       value: <span style={combineCss.CSS_EVC_01_Vb_of_Last_Day} > {VBLastdayformat} {nameValue.Sm3}</span>, 
       high: <InputText  
 disabled={AuthInputHighLow}
       
       style={combineCss.CSS_EVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Vb_of_Last_Day} onChange={handleInputChangeHighEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText  
 disabled={AuthInputHighLow}
       
       style={combineCss.CSS_EVC_01_Vb_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Vb_of_Last_Day} onChange={handleInputChangeLowEVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day}>{modbusEVC1.VM_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day}> {paragraphContents.VM_Yesterday} </span> ,

        value: <span style={combineCss.CSS_EVC_01_Vm_of_Last_Day} > {VMLastdayformat} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Vm_of_Last_Day} onChange={handleInputChangeHighEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_01_Vm_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Vm_of_Last_Day} onChange={handleInputChangeLowEVC_01_Vm_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Vm_of_Last_Day}
        checked={maintainEVC_01_Vm_of_Last_Day}
    ></Checkbox>

        },

        { 
            mainCategory: mainCategoryEVC.EVC01,
            
            timeUpdate: <span style={combineCss.CSS_Rebattery} >{EVC_STT01Value}</span>,
        modbus: <span style={combineCss.CSS_Rebattery}>{modbusEVC1.ReBattery}</span> ,

        name: <span style={combineCss.CSS_Rebattery}>{paragraphContents.ReBattery}</span> ,

        value: <span style={combineCss.CSS_Rebattery} > {EVC_01_Remain_Battery_Service_Life} {nameValue.month} </span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_Rebattery}   placeholder='High' step="0.1" type='number' value={inputHighEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeHighEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_Rebattery}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_01_Remain_Battery_Service_Life} onChange={handleInputChangeLowEVC_01_Remain_Battery_Service_Life} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_01_Remain_Battery_Service_Life}
        checked={maintainEVC_01_Remain_Battery_Service_Life}
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
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}>{modbusEVC2.SVF}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}>{paragraphContents.SVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Flow_at_Base_Condition} > {EVC_02_Flow_at_Base_Conditionformat} {nameValue.Sm3h} </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeHighEVC_02_Flow_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Flow_at_Base_Condition} onChange={handleInputChangeLowEVC_02_Flow_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVF_02}
         checked={maintainEVC_02_Flow_at_Base_Condition}
     ></Checkbox>

        },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}>{modbusEVC2.GVF}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}>{paragraphContents.GVF}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition} > {EVC_02_Flow_at_Measurement_Conditionformat} {nameValue.m3h} </span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeHighEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Flow_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Flow_at_Measurement_Condition} onChange={handleInputChangeLowEVC_02_Flow_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVF_02}
         checked={maintainEVC_02_Flow_at_Measurement_Condition}
     ></Checkbox>
         

        },
          {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}>{modbusEVC2.SVA}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}>{paragraphContents.SVA}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Volume_at_Base_Condition} > {EVC_02_Volume_at_Base_Conditionformat} {nameValue.Sm3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeHighEVC_02_Volume_at_Base_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Volume_at_Base_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Volume_at_Base_Condition} onChange={handleInputChangeLowEVC_02_Volume_at_Base_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVA_02}
         checked={maintainEVC_02_Volume_at_Base_Condition}
     ></Checkbox>

        },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}>{modbusEVC2.GVA}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}>{paragraphContents.GVA}	 </span> ,

        value: <span style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition} > {EVC_02_Volume_at_Measurement_Conditionformat} {nameValue.m3}</span> , 
         high: <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeHighEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInputHighLow}
         
         style={combineCss.CSS_EVC_02_Volume_at_Measurement_Condition}   placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Volume_at_Measurement_Condition} onChange={handleInputChangeLowEVC_02_Volume_at_Measurement_Condition} inputMode="decimal" />,
         update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVA_02} 
         checked={maintainEVC_02_Volume_at_Measurement_Condition}
     ></Checkbox>

        },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSSEVC_02_Pressure} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSSEVC_02_Pressure}>{modbusEVC2.PT}</span> ,

        name: <span style={combineCss.CSSEVC_02_Pressure}>{'Output Pressure'} </span> ,
        value: <span style={combineCss.CSSEVC_02_Pressure} > {EVC_02_Pressure} {nameValue.Bara}</span> , 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_02_Pressure}  placeholder='High' step="0.1" type='number' value={inputValueEVC_02_PressureHigh} onChange={handleInputChangeEVC_02_PressureHigh} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSSEVC_02_Pressure}   placeholder='High' step="0.1" type='number' value={inputValueEK1Low} onChange={handleInputChangeEVC_02_PressureLow} inputMode="decimal" />,
     update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainEVC_02_Pressure}
     checked={maintainEVC_02_Pressure}
 ></Checkbox>
    },
    {
        
            mainCategory: mainCategoryEVC.EVC02,
        
        timeUpdate: <span style={combineCss.CSS_EVC_02_Temperature} >{EVC_STT02Value}</span>,
    modbus: <span style={combineCss.CSS_EVC_02_Temperature}>{modbusEVC2.TT}</span> ,

    name: <span style={combineCss.CSS_EVC_02_Temperature}>{paragraphContents.TT} </span> ,

    value: <span style={combineCss.CSS_EVC_02_Temperature} > {EVC_02_Temperature}  {nameValue.C}</span>, 
    high: <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Temperature}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Temperature} onChange={handleInputChangeHighEVC_02_Temperature} inputMode="decimal" />, 
    low:  <InputText  
 disabled={AuthInputHighLow}
    
    style={combineCss.CSS_EVC_02_Temperature}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Temperature} onChange={handleInputChangeLowEVC_02_Temperature} inputMode="decimal" />,
    update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
    Maintain:   <Checkbox
    style={{ marginRight: 20, }}
    onChange={ChangeMaintainEVC_02_Temperature}
    checked={maintainEVC_02_Temperature}
></Checkbox>

   },


        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day}>{modbusEVC2.VB_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day}> {paragraphContents.VB_TODAY}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vb_of_Current_Day} > {VBTodayformat2} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Vb_of_Current_Day} onChange={handleInputChangeHighEVC_02_Vb_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Vb_of_Current_Day} onChange={handleInputChangeLowEVC_02_Vb_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_02_Vb_of_Current_Day}
        checked={maintainEVC_02_Vb_of_Current_Day}
    ></Checkbox>

       },

        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day}>{modbusEVC2.VM_TODAY}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day}> {paragraphContents.VM_TODAY}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vm_of_Current_Day} > {VMTodayformat2} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Current_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Vm_of_Current_Day} onChange={handleInputChangeHighEVC_02_Vm_of_Current_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Current_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Vm_of_Current_Day} onChange={handleInputChangeLowEVC_02_Vm_of_Current_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_02_Vm_of_Current_Day}
        checked={maintainEVC_02_Vm_of_Current_Day}
    ></Checkbox>

       },

        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day}>{modbusEVC2.VB_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day}> {paragraphContents.VB_Yesterday}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Vb_of_Last_Day} > {VBLastdayformat2} {nameValue.Sm3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Vb_of_Last_Day} onChange={handleInputChangeHighEVC_02_Vb_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vb_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Vb_of_Last_Day} onChange={handleInputChangeLowEVC_02_Vb_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_02_Vb_of_Last_Day}
        checked={maintainEVC_02_Vb_of_Last_Day}
    ></Checkbox>

       },
        {
            
            mainCategory: mainCategoryEVC.EVC02,
            
            timeUpdate: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day} >{EVC_STT02Value}</span>,
        modbus: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day}>{modbusEVC2.VM_Yesterday}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day}> {paragraphContents.VM_Yesterday} </span> ,

        value: <span style={combineCss.CSS_EVC_02_Vm_of_Last_Day} > {VmLastdayformat2} {nameValue.m3}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Vm_of_Last_Day} onChange={handleInputChangeHighEVC_02_Vm_of_Last_Day} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Vm_of_Last_Day}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Vm_of_Last_Day} onChange={handleInputChangeLowEVC_02_Vm_of_Last_Day} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_02_Vm_of_Last_Day}
        checked={maintainEVC_02_Vm_of_Last_Day}
    ></Checkbox>

       },

        {
            mainCategory: mainCategoryEVC.EVC02,
            timeUpdate: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life} >{EVC_STT02Value}</span>,

        modbus: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}>{modbusEVC2.ReBattery}</span> ,

        name: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}>{paragraphContents.ReBattery}</span> ,

        value: <span style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life} > {EVC_02_Remain_Battery_Service_Life} {nameValue.month}</span>, 
        high: <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}   placeholder='High' step="0.1" type='number' value={inputHighEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeHighEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInputHighLow}
        
        style={combineCss.CSS_EVC_02_Remain_Battery_Service_Life}    placeholder='Low' step="0.1" type='number' value={inputLowEVC_02_Remain_Battery_Service_Life} onChange={handleInputChangeLowEVC_02_Remain_Battery_Service_Life} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData'   onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEVC_02_Remain_Battery_Service_Life}
        checked={maintainEVC_02_Remain_Battery_Service_Life}
    ></Checkbox>

       },

       
      ]

      const DataCharging = DI_UPS_CHARGING === "0" ? "Normal" : DI_UPS_CHARGING === "1" ? "Charging" : null
      const DataBattery = DI_UPS_BATTERY === "0" ? "Normal" : DI_UPS_BATTERY === "1" ? "Battery" : null
      const DataAlarm = DI_UPS_ALARM === "0" ? "Normal" : DI_UPS_ALARM === "1" ? "No Battery" : null
      const DataMode = UPS_Mode === "0" ? "Error" : UPS_Mode === "1" ? "Using Battery" : UPS_Mode === "2" ? "Charging Battery" : UPS_Mode === "3" ? "Disconnected Battery" : UPS_Mode === "4" ? "Normal" : null
      const DataDI_ZSC_1 = DI_ZSC_1 === "0" ? "On" : DI_ZSC_1 === "1" ? "Off" : null
      const DataDI_ZSO_1 = DI_ZSO_1 === "0" ? "Off" : DI_ZSO_1 === "1" ? "On" : null
      const DataDI_SELECT_SW = DI_SELECT_SW === "0" ? "Local" : DI_SELECT_SW === "1" ? "Remote" : null
      const DataReset = DI_RESET === "0" ? "Off" : DI_RESET === "1" ? "On" : null
      const DataHorn = DO_HR_01 === "0" ? "Off" : DO_HR_01 === "1" ? "On" : null
      const DataDO_BC_01 = DO_BC_01 === "0" ? "Off" : DO_BC_01 === "1" ? "On" : null
      const DataSV_1 = DO_SV1 === "0" ? "Off" : DO_SV1 === "1" ? "On" : null
      const DataEmergency_NC = Emergency_NC === "0" ? "Emergency" : Emergency_NC === "1" ? "Normal" : null
      const DataEmergency_NO = Emergency_NO === "0" ? "Normal" : Emergency_NO === "1" ? "Emergency" : null
      const DataDI_MAP_1 = DI_MAP_1 === "0" ? "Normal" : DI_MAP_1 === "1" ? "Emergency" : null


      const PT1format =
      PT1 !== null ? parseFloat(PT1).toFixed(2) : "";


      const paragraphContentsPLC = {

        EVC_02_Pressure:"Input Pressure",
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
            
            timeUpdate: <span style={combineCss.CSSPT1} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSPT1}>{modbusPLC.PT1}</span> ,

        name: <span style={combineCss.CSSPT1}>{'Input Pressure'} </span> ,
        value: <span style={combineCss.CSSPT1} > {PT1format} {nameValue.BARG}</span> , 
         high: <InputText  
 disabled={AuthInput}
         
         style={combineCss.CSSPT1}   placeholder='High' step="0.1" type='number' value={inputValuePT1High} onChange={handleInputChangePT1High} inputMode="decimal" />, 
         low:  <InputText  
 disabled={AuthInput}
         
         style={combineCss.CSSPT1}   placeholder='Low' step="0.1" type='number' value={inputValuePT1Low} onChange={handleInputChangePT1Low} inputMode="decimal" />,
      update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainPT1}
      checked={maintainPT1}
  ></Checkbox>

        },

     {
         mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSSGD1}>{modbusPLC.GD1}</span> ,

     name: <span style={combineCss.CSSGD1}>{paragraphContentsPLC.GD1} </span> ,
     value: <span style={combineCss.CSSGD1} > {GD1} {nameValue.LEL}</span> , 
      high: <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputHighGD1} onChange={handleInputChangeHighGD1} inputMode="decimal" />, 
      low:  <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputLowGD1} onChange={handleInputChangeLowGD1} inputMode="decimal" />,
      update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_01}
      checked={maintainGD1}
  ></Checkbox>

     },

     {
         mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSSGD2}>{modbusPLC.GD2}</span> ,

     name: <span style={combineCss.CSSGD2}>{paragraphContentsPLC.GD2} </span> ,
     value: <span style={combineCss.CSSGD2} > {GD2} {nameValue.LEL}</span> , 
      high: <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputHighGD2} onChange={handleInputChangeHighGD2} inputMode="decimal" />, 
      low:  <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputLowGD2} onChange={handleInputChangeLowGD2} inputMode="decimal" />,
      update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_02}
      checked={maintainGD2}
  ></Checkbox>

     },

     {
         mainCategory: mainCategoryEVC.PLC,
        
        timeUpdate: <span style={combineCss.CSSgd3} >{PLC_STTValue}</span>,
     modbus: <span  style={combineCss.CSSgd3}>{modbusPLC.GD3}</span> ,

     name: <span style={combineCss.CSSgd3}>{paragraphContentsPLC.GD3}</span> ,
     value: <span style={combineCss.CSSgd3} > {GD3} {nameValue.LEL}</span> , 
      high: <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSgd3}   placeholder='High' step="0.1" type='number' value={inputHighGD3} onChange={handleInputChangeHighGD3} inputMode="decimal" />, 
      low:  <InputText  
 disabled={AuthInput}
      
      style={combineCss.CSSgd3}   placeholder='Low' step="0.1" type='number' value={inputLowGD3} onChange={handleInputChangeLowGD3} inputMode="decimal" />,
      update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD3}
      checked={maintainGD3}
  ></Checkbox>

     },

     
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_UPS_CHARGING} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_UPS_CHARGING}>{modbusPLC.UPS_CHARGING}</span> ,

        name: <span style={combineCss.CSS_DI_UPS_CHARGING}>{paragraphContentsPLC.UPS_CHARGING} </span> ,
        value: <span style={combineCss.CSS_DI_UPS_CHARGING} > {DI_UPS_CHARGING} {DataCharging}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_CHARGING}   placeholder='High' step="0.1" type='number' value={inputHighDI_UPS_CHARGING} onChange={handleInputChangeHighDI_UPS_CHARGING} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_CHARGING}   placeholder='Low' step="0.1" type='number' value={inputLowDI_UPS_CHARGING} onChange={handleInputChangeLowDI_UPS_CHARGING} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_UPS_CHARGING}
        checked={maintainDI_UPS_CHARGING}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_UPS_BATTERY} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_UPS_BATTERY} >{modbusPLC.UPS_BATTERY}</span> ,

        name: <span style={combineCss.CSS_DI_UPS_BATTERY}>{paragraphContentsPLC.UPS_BATTERY} </span> ,
        value: <span style={combineCss.CSS_DI_UPS_BATTERY} > {DI_UPS_BATTERY} {DataBattery}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_BATTERY}   placeholder='High' step="0.1" type='number' value={inputHighDI_UPS_BATTERY} onChange={handleInputChangeHighDI_UPS_BATTERY} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_BATTERY}   placeholder='Low' step="0.1" type='number' value={inputLowDI_UPS_BATTERY} onChange={handleInputChangeLowDI_UPS_BATTERY} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_UPS_BATTERY}
        checked={maintainDI_UPS_BATTERY}
    ></Checkbox>
        },
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_UPS_ALARM} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_UPS_ALARM}>{modbusPLC.UPS_ALARM}</span> ,

        name: <span style={combineCss.CSS_DI_UPS_ALARM}>{paragraphContentsPLC.UPS_ALARM} </span> ,
        value: <span style={combineCss.CSS_DI_UPS_ALARM} > {DI_UPS_ALARM} {DataAlarm}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_ALARM}   placeholder='High' step="0.1" type='number' value={inputHighDI_UPS_ALARM} onChange={handleInputChangeHighDI_UPS_ALARM} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_UPS_ALARM}   placeholder='Low' step="0.1" type='number' value={inputLowDI_UPS_ALARM} onChange={handleInputChangeLowDI_UPS_ALARM} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_UPS_ALARM}
        checked={maintainDI_UPS_ALARM}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_UPS_Mode} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_UPS_Mode}>{modbusPLC.UPS_MODE}</span> ,

        name: <span style={combineCss.CSS_UPS_Mode}>{paragraphContentsPLC.UPS_MODE} </span> ,
        value: <span style={combineCss.CSS_UPS_Mode} > {UPS_Mode} {DataMode}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_UPS_Mode}   placeholder='High' step="0.1" type='number' value={inputHighUPS_Mode} onChange={handleInputChangeHighUPS_Mode} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_UPS_Mode}   placeholder='Low' step="0.1" type='number' value={inputLowUPS_Mode} onChange={handleInputChangeLowUPS_Mode} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainUPS_Mode}
        checked={maintainUPS_Mode}
    ></Checkbox>
        },
       
    
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_DI_SELECT_SW} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_DI_SELECT_SW}>{modbusPLC.DI_SELECT_SW}</span> ,

        name: <span style={combineCss.CSS_DI_SELECT_SW}>{paragraphContentsPLC.SELECT_SW} </span> ,
        value: <span style={combineCss.CSS_DI_SELECT_SW} > {DI_SELECT_SW} {DataDI_SELECT_SW}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_SELECT_SW}   placeholder='High' step="0.1" type='number' value={inputHighDI_SELECT_SW} onChange={handleInputChangeHighDI_SELECT_SW} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DI_SELECT_SW}   placeholder='Low' step="0.1" type='number' value={inputLowDI_SELECT_SW} onChange={handleInputChangeLowDI_SELECT_SW} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_SELECT_SW}
        checked={maintainDI_SELECT_SW}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Reset} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_Reset}>{modbusPLC.RESET}</span> ,

        name: <span style={combineCss.CSS_Reset}>{paragraphContentsPLC.RESET} </span> ,
        value: <span style={combineCss.CSS_Reset} > {DI_RESET} {DataReset}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Reset}   placeholder='High' step="0.1" type='number' value={inputHighDI_RESET} onChange={handleInputChangeHighDI_RESET} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Reset}   placeholder='Low' step="0.1" type='number' value={inputLowDI_RESET} onChange={handleInputChangeLowDI_RESET} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_RESET}
        checked={maintainDI_RESET}
    ></Checkbox>
        },
     
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_SELENOID} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_SELENOID}>{modbusPLC.SDV_SOLENOID}</span> ,

        name: <span style={combineCss.CSS_SELENOID}>{paragraphContentsPLC.SOLENOID} </span> ,
        value: <span style={combineCss.CSS_SELENOID} > {DO_SV1} {DataSV_1}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_SELENOID}   placeholder='High' step="0.1" type='number' value={inputHighDO_SV1} onChange={handleInputChangeHighDO_SV1} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_SELENOID}   placeholder='Low' step="0.1" type='number' value={inputLowDO_SV1} onChange={handleInputChangeLowDO_SV1} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV}  className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDO_SV1}
        checked={maintainDO_SV1}
    ></Checkbox>
        },

        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Emergency_NC} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_Emergency_NC}>{modbusPLC.Emergency_Stop_NC}</span> ,

        name: <span style={combineCss.CSS_Emergency_NC}>{paragraphContentsPLC.EMERGENCY_NC} </span> ,
        value: <span style={combineCss.CSS_Emergency_NC} > {Emergency_NC} {DataEmergency_NC}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NC}   placeholder='High' step="0.1" type='number' value={inputHighEmergency_NC} onChange={handleInputChangeHighEmergency_NC} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NC}   placeholder='Low' step="0.1" type='number' value={inputLowEmergency_NC} onChange={handleInputChangeLowEmergency_NC} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEmergency_NC}
        checked={maintainEmergency_NC}
    ></Checkbox>
        },
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_Emergency_NO} >{PLC_STTValue}</span>,
     modbus : <span style={combineCss.CSS_Emergency_NO}>{modbusPLC.Emergency_Stop_NO}</span> ,

        name: <span style={combineCss.CSS_Emergency_NO}>{paragraphContentsPLC.EMERGENCY_NO} </span> ,
        value: <span style={combineCss.CSS_Emergency_NO} > {Emergency_NO} {DataEmergency_NO}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NO}   placeholder='High' step="0.1" type='number' value={inputHighEmergency_NO} onChange={handleInputChangeHighEmergency_NO} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Emergency_NO}   placeholder='Low' step="0.1" type='number' value={inputLowEmergency_NO} onChange={handleInputChangeLowEmergency_NO} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEmergency_NO}
        checked={maintainEmergency_NO}
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
        
        style={combineCss.CSS_Horn}   placeholder='High' step="0.1" type='number' value={inputHighDO_HR_01} onChange={handleInputChangeHighDO_HR_01} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Horn}   placeholder='Low' step="0.1" type='number' value={inputLowDO_HR_01} onChange={handleInputChangeLowDO_HR_01} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDO_HR_01}
        checked={maintainDO_HR_01}
    ></Checkbox>
        },
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSS_ZSO} >{PLC_STTValue}</span>,
    modbus: <span style={combineCss.CSS_ZSO}>{modbusPLC.SDV_ZSO}</span> ,

       name: <span style={combineCss.CSS_ZSO}>{paragraphContentsPLC.SDV_SZO} </span> ,
       value: <span style={combineCss.CSS_ZSO} > {DI_ZSO_1} {DataDI_ZSO_1}</span> , 
       high: <InputText  
 disabled={AuthInput}
       
       style={combineCss.CSS_ZSO}   placeholder='High' step="0.1" type='number' value={inputHighDI_ZSO_1} onChange={handleInputChangeHighDI_ZSO_1} inputMode="decimal" />, 
       low:  <InputText  
 disabled={AuthInput}
       
       style={combineCss.CSS_ZSO}   placeholder='Low' step="0.1" type='number' value={inputLowDI_ZSO_1} onChange={handleInputChangeLowDI_ZSO_1} inputMode="decimal" />,
       update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainDI_ZSO_1}
       checked={maintainDI_ZSO_1}
   ></Checkbox>
       },
       
        {
             mainCategory: mainCategoryEVC.PLC,
            
            timeUpdate: <span style={combineCss.CSS_ZSC} >{PLC_STTValue}</span>,
     modbus: <span style={combineCss.CSS_ZSC}>{modbusPLC.SDV_ZSC}</span> ,

        name: <span style={combineCss.CSS_ZSC}>{paragraphContentsPLC.SDV_SZC} </span> ,
        value: <span style={combineCss.CSS_ZSC} > {DI_ZSC_1} {DataDI_ZSC_1}</span> , 
        high: <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_ZSC}   placeholder='High' step="0.1" type='number' value={inputHighDI_ZSC_1} onChange={handleInputChangeHighDI_ZSC_1} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_ZSC}   placeholder='Low' step="0.1" type='number' value={inputLowDI_ZSC_1} onChange={handleInputChangeLowDI_ZSC_1} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_ZSC_1}
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
        
        style={combineCss.CSS_Map}   placeholder='High' step="0.1" type='number' value={inputHighDI_MAP_1} onChange={handleInputChangeHighDI_MAP_1} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_Map}   placeholder='Low' step="0.1" type='number' value={inputLowDI_MAP_1} onChange={handleInputChangeLowDI_MAP_1} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDI_MAP_1}
        checked={maintainDI_MAP_1}
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
        
        style={combineCss.CSS_DO_BC_01}   placeholder='High' step="0.1" type='number' value={inputHighDO_BC_01} onChange={handleInputChangeHighDO_BC_01} inputMode="decimal" />, 
        low:  <InputText  
 disabled={AuthInput}
        
        style={combineCss.CSS_DO_BC_01}   placeholder='Low' step="0.1" type='number' value={inputLowDO_BC_01} onChange={handleInputChangeLowDO_BC_01} inputMode="decimal" />,
        update:  <Button disabled={AuthUpdatePCV} className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDO_BC_01}
        checked={maintainDO_BC_01}
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
      

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:10 }}>
            
         
        <Toast ref={toast} />

        <ConfirmDialog />

        <h2>OTSUKA</h2>
     
      
        <div style={{width:'100%' ,  borderRadius:5 }}>

        <DataTable  size={'small'}    value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" 
                    sortOrder={1}   rowGroupHeaderTemplate={mainCategoryTemplate}   >

      <Column field="timeUpdate" header="Time Update" />
      <Column field="modbus" header="Modbus" />

      <Column field="name" header="Name" />

      <Column field="value" header="Value" />
      <Column  field="high" header="High" />
      <Column field="low" header="Low" />
      {AuthInput ? " " :  <Column field="Maintain" header="Maintain" />
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
