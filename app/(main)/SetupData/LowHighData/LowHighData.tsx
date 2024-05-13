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

interface StateMap {

    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;

}

export default function LowHighData() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);

    const toast = useRef<Toast>(null);

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
                        EVC_01_Pressure: setPT02,
                        EVC_02_Pressure: setPT03,
                        PT1:setPT01,

                        GD1:setGD01,
                        GD2:setGD02,
                        GD3:setGD03,

                        EVC_01_Flow_at_Measurement_Condition: setGVF1,
                        EVC_01_Flow_at_Base_Condition: setSVF1,
                        EVC_01_Volume_at_Base_Condition: setSVA1,
                        EVC_01_Volume_at_Measurement_Condition: setGVA1,

                        EVC_02_Flow_at_Measurement_Condition: setGVF2,
                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Volume_at_Measurement_Condition: setGVA2,

                        time: setTimeUpdate,


                        EVC_01_Temperature:setTemperature01,
                        EVC_02_Temperature:setTemperature02,

                        EVC_01_Remain_Battery_Service_Life:setRebattery01,
                        EVC_02_Remain_Battery_Service_Life:setRebattery02,



                        EVC_01_Vm_of_Last_Day: setVmLastDay01 ,
                        EVC_02_Vm_of_Last_Day:setVmLastDay02 , 

                        EVC_01_Vb_of_Last_Day: setVbLastDay01 ,
                        EVC_02_Vb_of_Last_Day:setVbLastDay02 , 


                        EVC_01_Vm_of_Current_Day:setVmToDay01,
                        EVC_02_Vm_of_Current_Day:setVmToDay02,

                        EVC_01_Vb_of_Current_Day: setVbToDay01 ,
                        EVC_02_Vb_of_Current_Day: setVbToDay02,

                     

                        DI_UPS_BATTERY:setUpsBattery,
                        DI_UPS_CHARGING:setUpsCharging,
                        DI_UPS_ALARM:setUpsAlarm,
                        UPS_Mode:setUpsMode,

                        DI_SELECT_SW:setSelectSW,

                        Emergency_NC:setEmergencyNC,
                        Emergency_NO:setEmergencyNO,

                        DI_RESET:setDIReset,
                        DO_HR_01:setDOHorn,

                        
                        DI_MAP_1:setMap,
                        DI_ZSC_1: setZSC_1,
                        DI_ZSO_1: setZSO_1,
                        DO_SV1:setDO_SV1,
                        DO_BC_01:setBeacon


                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
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
//=====================================================================================
    
            const highEK1PressureItem = res.data.find((item: any) => item.key === "EVC_01_Pressure_High");
            setHighEK1PressureValue(highEK1PressureItem?.value || null);
            const lowEK1PressureItem = res.data.find((item: any) => item.key === "EVC_01_Pressure_Low");
            setLowEK1PressureValue(lowEK1PressureItem?.value || null);

            const highEK2PressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_High");
            setHighEK2PressureValue(highEK2PressureItem?.value || null);
            const lowEK2PressureItem = res.data.find((item: any) => item.key === "EVC_02_Pressure_Low");
            setLowEK2PressureValue(lowEK2PressureItem?.value || null);

            const highEK3PressureItem = res.data.find((item: any) => item.key === "PT1_High");
            setHighEK3PressureValue(highEK3PressureItem?.value || null);
            const lowEK3PressureItem = res.data.find((item: any) => item.key === "PT1_Low");
            setLowEK3PressureValue(lowEK3PressureItem?.value || null);

            const MaintainPT_1901 = res.data.find(
                (item: any) => item.key === "EVC_01_Pressure_Maintain"
            );
            setMaintainPT_1901(MaintainPT_1901?.value || false);

            const MaintainPT_1902 = res.data.find(
                (item: any) => item.key === "EVC_02_Pressure_Maintain"
            );
            setMaintainPT_1902(MaintainPT_1902?.value || false);

            const MaintainPT_1903 = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );
            setMaintainPT_1903(MaintainPT_1903?.value || false);
//=====================================================================================

            const HighGD01 = res.data.find((item: any) => item.key === "GD1_High");
            setHighGD01(HighGD01?.value || null);
            const LowGD01 = res.data.find((item: any) => item.key === "GD1_Low");
            setLowGD01(LowGD01?.value || null);

            const HighGD02 = res.data.find((item: any) => item.key === "GD2_High");
            setHighGD02(HighGD02?.value || null);
            const LowGD02 = res.data.find((item: any) => item.key === "GD2_Low");
            setLowGD02(LowGD02?.value || null);

            const HighGD03 = res.data.find((item: any) => item.key === "GD3_High");
            setHighGD03(HighGD03?.value || null);
            const LowGD03 = res.data.find((item: any) => item.key === "GD3_Low");
            setLowGD03(LowGD03?.value || null);


            const MaintainGD_1901 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setMaintainGD_1901(MaintainGD_1901?.value || false);

            const MaintainGD_1902 = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD_1902(MaintainGD_1902?.value || false);

            const MaintainGD_1903 = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
            );
            setMaintainGD_1903(MaintainGD_1903?.value || false);            
//=====================================================================================

            const HighGVF1 = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_High");
            setHighGVF1(HighGVF1?.value || null);
            const LowGVF1 = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Low");
            setLowGVF1(LowGVF1?.value || null);

            const HighSVF1 = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_High");
            setHighSVF1(HighSVF1?.value || null);
            const LowSVF1 = res.data.find((item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Low");
            setLowSVF1(LowSVF1?.value || null);

            const HighSVA1 = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_High");
            setHighSVA1(HighSVA1?.value || null);
            const LowSVA1 = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Low");
            setLowSVA1(LowSVA1?.value || null);

            const HighGVA1 = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_High");
            setHighGVA1(HighGVA1?.value || null);
            const LowGVA1 = res.data.find((item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Low");
            setLowGVA1(LowGVA1?.value || null);

            const HighGVF2 = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_High");
            setHighGVF2(HighGVF2?.value || null);
            const LowGVF2 = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Low");
            setLowGVF2(LowGVF2?.value || null);

            const HighSVF2 = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_High");
            setHighSVF2(HighSVF2?.value || null);
            const LowSVF2 = res.data.find((item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Low");
            setLowSVF2(LowSVF2?.value || null);

            const HighSVA2 = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_High");
            setHighSVA2(HighSVA2?.value || null);
            const LowSVA2 = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Low");
            setLowSVA2(LowSVA2?.value || null);

            const HighGVA2 = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_High");
            setHighGVA2(HighGVA2?.value || null);
            const LowGVA2 = res.data.find((item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Low");
            setLowGVA2(LowGVA2?.value || null);


            const MaintainSVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Base_Condition_Maintain"
            );
            setMaintainSVF1(MaintainSVF_1?.value || false);

            const MaintainGVF_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainGVF1(MaintainGVF_1?.value || false);

            const MaintainSVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Base_Condition_Maintain"
            );
            setMaintainSVA1(MaintainSVA_1?.value || false);

            const MaintainGVA_1 = res.data.find(
                (item: any) => item.key === "EVC_01_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainGVA1(MaintainGVA_1?.value || false);

            const MaintainSVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Base_Condition_Maintain" 
            );
            setMaintainSVF2(MaintainSVF_2?.value || false);

            const MaintainGVF_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Flow_at_Measurement_Condition_Maintain"
            );
            setMaintainGVF2(MaintainGVF_2?.value || false);

            const MaintainSVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Base_Condition_Maintain"
            );
            setMaintainSVA2(MaintainSVA_2?.value || false);

            const MaintainGVA_2 = res.data.find(
                (item: any) => item.key === "EVC_02_Volume_at_Measurement_Condition_Maintain"
            );
            setMaintainGVA2(MaintainGVA_2?.value || false);
//=====================================================================================

            const HightTemperature01 = res.data.find((item: any) => item.key === "EVC_01_Temperature_High");
            setHighTemperature01(HightTemperature01?.value || null);
            const LowTemperature01 = res.data.find((item: any) => item.key === "EVC_01_Temperature_Low");
            setLowTemperature01(LowTemperature01?.value || null);

            const HightTemperature02 = res.data.find((item: any) => item.key === "EVC_02_Temperature_High");
            setHighTemperature02(HightTemperature02?.value || null);
            const LowTemperature02 = res.data.find((item: any) => item.key === "EVC_02_Temperature_Low");
            setLowTemperature02(LowTemperature02?.value || null);


            const MaintainTemperature_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Temperature_Maintain"
            );
            setMaintainTemperature01(MaintainTemperature_01?.value || false);


            const MaintainTemperature_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Temperature_Maintain"
            );
            setMaintainTemperature02(MaintainTemperature_02?.value || false);
//=====================================================================================


            const HighReBattery01 = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_High");
            setHighReBattery01(HighReBattery01?.value || null);
            const LowReBattery01 = res.data.find((item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Low");
            setLowReBattery01(LowReBattery01?.value || null);

            const HighReBattery02 = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_High");
            setHighReBattery02(HighReBattery02?.value || null);
            const LowReBattery02 = res.data.find((item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Low");
            setLowReBattery02(LowReBattery02?.value || null);


            const MaintainReBattery_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Remain_Battery_Service_Life_Maintain"
            );
            setMaintainReBattery01(MaintainReBattery_01?.value || false);

            const MaintainReBattery_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Remain_Battery_Service_Life_Maintain"
            );
            setMaintainReBattery02(MaintainReBattery_02?.value || false);
//=====================================================================================

            const HighVmLastDay01 = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setHighVmLastDay01(HighVmLastDay01?.value || null);
            const LowVmLastDay01 = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setLowVmLastDay01(LowVmLastDay01?.value || null);


            const HighVmLastDay02 = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_High");
            setHighVmLastDay02(HighVmLastDay02?.value || null);
            const LowVmLastDay02 = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Last_Day_Low");
            setLowVmLastDay02(LowVmLastDay02?.value || null);

            const HighVbLastDay01 = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_High");
            setHighVbLastDay01(HighVbLastDay01?.value || null);
            const LowVbLastDay01 = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_Low");
            setLowVbLastDay01(LowVbLastDay01?.value || null);


            const HighVbLastDay02 = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_High");
            setHighVbLastDay02(HighVbLastDay02?.value || null);
            const LowVbLastDay02 = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Last_Day_Low");
            setLowVbLastDay02(LowVbLastDay02?.value || null);


            const MaintainVmLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );
            setMaintainVmLastDay01(MaintainVmLastDay_01?.value || false);


            const MaintainVmLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vm_of_Last_Day_Maintain"
            );
            setMaintainVmLastDay02(MaintainVmLastDay_02?.value || false);


            const MaintainVbLastDay_01 = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Last_Day_Maintain"
            );
            setMaintainVbLastDay01(MaintainVbLastDay_01?.value || false);


            const MaintainVbLastDay_02 = res.data.find(
                (item: any) => item.key === "EVC_02_Vb_of_Last_Day_Maintain"
            );
            setMaintainVbLastDay02(MaintainVbLastDay_02?.value || false);
//=====================================================================================

const HighVmToDay01 = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_High");
setHighVmToDay01(HighVmToDay01?.value || null);
const LowVmToDay01 = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Current_Day_Low");
setLowVmToDay01(LowVmToDay01?.value || null);


const HighVmToDay02 = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_High");
setHighVmToDay02(HighVmToDay02?.value || null);
const LowVmToDay02 = res.data.find((item: any) => item.key === "EVC_02_Vm_of_Current_Day_Low");
setLowVmToDay02(LowVmToDay02?.value || null);

const HighVbToDay01 = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_High");
setHighVbToDay01(HighVbToDay01?.value || null);
const LowVbToDay01 = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Current_Day_Low");
setLowVbToDay01(LowVbToDay01?.value || null);


const HighVbToDay02 = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_High");
setHighVbToDay02(HighVbToDay02?.value || null);
const LowVbToDay02 = res.data.find((item: any) => item.key === "EVC_02_Vb_of_Current_Day_Low");
setLowVbToDay02(LowVbToDay02?.value || null);

const MaintainVmToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vm_of_Current_Day_Maintain"
);
setMaintainVmToDay01(MaintainVmToDay_01?.value || false);


const MaintainVmToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vm_of_Current_Day_Maintain"
);
setMaintainVmToDay02(MaintainVmToDay_02?.value || false);


const MaintainVbToDay_01 = res.data.find(
    (item: any) => item.key === "EVC_01_Vb_of_Current_Day_Maintain"
);
setMaintainVbToDay01(MaintainVbToDay_01?.value || false);


const MaintainVbToDay_02 = res.data.find(
    (item: any) => item.key === "EVC_02_Vb_of_Current_Day_Maintain"
);
setMaintainVbToDay02(MaintainVbToDay_02?.value || false);

//=====================================================================================

const HighUpsBattery = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_High");
setHighUpsBattery(HighUpsBattery?.value || null);
const LowUpsBattery = res.data.find((item: any) => item.key === "DI_UPS_BATTERY_Low");
setLowUpsBattery(LowUpsBattery?.value || null);

const MaintainUpsBattery = res.data.find(
    (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
);
setMaintainUpsBattery(MaintainUpsBattery?.value || false);
//=====================================================================================


const HighUpsCharging = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_High");
setHighUpsCharging(HighUpsCharging?.value || null);
const LowUpsCharging = res.data.find((item: any) => item.key === "DI_UPS_CHARGING_Low");
setLowUpsCharging(LowUpsCharging?.value || null);
const MaintainUpsCharging = res.data.find(
    (item: any) => item.key === "DI_UPS_CHARGING_Maintain"
);
setMaintainUpsCharging(MaintainUpsCharging?.value || false);
//=====================================================================================

const HighUpsAlarm = res.data.find((item: any) => item.key === "DI_UPS_ALARM_High");
setHighUpsAlarm(HighUpsAlarm?.value || null);
const LowUpsAlarm = res.data.find((item: any) => item.key === "DI_UPS_ALARM_Low");
setLowUpsAlarm(LowUpsAlarm?.value || null);

const MaintainUpsAlarm = res.data.find(
    (item: any) => item.key === "DI_UPS_ALARM_Maintain"
);
setMaintainUpsAlarm(MaintainUpsAlarm?.value || false);
//=====================================================================================

const HighUpsMode = res.data.find((item: any) => item.key === "UPS_Mode_High");
setHighUpsMode(HighUpsMode?.value || null);
const LowUpsMode = res.data.find((item: any) => item.key === "UPS_Mode_Low");
setLowUpsMode(LowUpsMode?.value || null);

const MaintainUpsMode = res.data.find(
    (item: any) => item.key === "UPS_Mode_Maintain"
);
setMaintainUpsMode(MaintainUpsMode?.value || false);
//=====================================================================================
const HighSelectSW = res.data.find((item: any) => item.key === "DI_SELECT_SW_High");
setHighSelectSW(HighSelectSW?.value || null);
const LowSelectSW = res.data.find((item: any) => item.key === "DI_SELECT_SW_Low");
setLowSelectSW(LowSelectSW?.value || null);

const MaintainSelect = res.data.find(
    (item: any) => item.key === "DI_SELECT_SW_Maintain"
);
setMaintainSelectSW(MaintainSelect?.value || false);
//=====================================================================================

const HighEmergencyNC = res.data.find((item: any) => item.key === "Emergency_NC_High");
setHighEmergencyNC(HighEmergencyNC?.value || null);
const LowEmergencyNC = res.data.find((item: any) => item.key === "Emergency_NC_Low");
setLowEmergencyNC(LowEmergencyNC?.value || null);

const MaintainEmergencyNC = res.data.find(
    (item: any) => item.key === "Emergency_NC_Maintain"
);
setMaintainEmergencyNC(MaintainEmergencyNC?.value || false);
//=====================================================================================

const HighEmergencyNO = res.data.find((item: any) => item.key === "Emergency_NO_High");
setHighEmergencyNO(HighEmergencyNO?.value || null);
const LowEmergencyNO = res.data.find((item: any) => item.key === "Emergency_NO_Low");
setLowEmergencyNO(LowEmergencyNO?.value || null);

const MaintainEmergencyNO = res.data.find(
    (item: any) => item.key === "Emergency_NO_Maintain"
);
setMaintainEmergencyNO(MaintainEmergencyNO?.value || false);
//=====================================================================================


//=====================================================================================

const HighDIReset = res.data.find((item: any) => item.key === "DI_RESET_High");
setHighDIReset(HighDIReset?.value || null);
const LowDIReset = res.data.find((item: any) => item.key === "DI_RESET_Low");
setLowDIReset(LowDIReset?.value || null);

const MaintainDIReset = res.data.find(
    (item: any) => item.key === "DI_RESET_Maintain"
);
setMaintainDIReset(MaintainDIReset?.value || false);
//=====================================================================================

//=====================================================================================

const HighDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_High");
setHighDOHorn(HighDIHorn?.value || null);
const LowDIHorn = res.data.find((item: any) => item.key === "DO_HR_01_Low");
setLowDOHorn(LowDIHorn?.value || null);

const MaintainDIHorn = res.data.find(
    (item: any) => item.key === "DO_HR_01_Maintain"
);
setMaintainDOHorn(MaintainDIHorn?.value || false);
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
setInputHighZSC_1(HighZSC?.value || null);
const LowZSC = res.data.find((item: any) => item.key === "DI_ZSC_1_Low");
setInputLowZSC_1(LowZSC?.value || null);

const MaintainZSC_0 = res.data.find(
    (item: any) => item.key === "DI_ZSO_1_Maintain"
);
setMaintainZSC_1(MaintainZSC_0?.value || false);
//=====================================================================================

//=====================================================================================

const HighZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_High");
setHighZSO_1(HighZSO?.value || null);
const LowZSO = res.data.find((item: any) => item.key === "DI_ZSO_1_Low");
setLowZSO_1(LowZSO?.value || null);

const MaintainZSO = res.data.find(
    (item: any) => item.key === "DI_ZSC_1_Maintain"
);
setMaintainZSO_1(MaintainZSO?.value || false);
//=====================================================================================



//=====================================================================================

const HighMap = res.data.find((item: any) => item.key === "DI_MAP_1_High");
setHighMap(HighMap?.value || null);
const LowMap = res.data.find((item: any) => item.key === "DI_MAP_1_Low");
setLowMap(LowMap?.value || null);

const MaintainMap = res.data.find(
    (item: any) => item.key === "DI_MAP_1_Maintain"
);
setMaintainMap(MaintainMap?.value || false);
//=====================================================================================

//=====================================================================================

const HighBeacon = res.data.find((item: any) => item.key === "DO_BC_01_High");
setHighBeacon(HighBeacon?.value || null);
const LowBeacon = res.data.find((item: any) => item.key === "DO_BC_01_Low");
setLowBeacon(LowBeacon?.value || null);

const MaintainBeacon = res.data.find(
    (item: any) => item.key === "DO_BC_01_Maintain"
);
setMaintainBeacon(MaintainBeacon?.value || false);
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
const [PT02, setPT02] = useState<string | null>(null);
const [audioPlaying, setAudioPlaying] = useState(false);
const [inputValue, setInputValue] = useState<any>();
const [inputValue2, setInputValue2] = useState<any>();
const [highEK1PressureValue, setHighEK1PressureValue] = useState<number | null>(null);
const [lowEK1PressureValue, setLowEK1PressureValue] = useState<number | null>(null);
const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainPT_1901, setMaintainPT_1901] = useState<boolean>(false);


    useEffect(() => {
        if (typeof highEK1PressureValue === 'string' && typeof lowEK1PressureValue === 'string' && PT02 !== null && maintainPT_1901 === false
        ) {
            const highValue = parseFloat(highEK1PressureValue);
            const lowValue = parseFloat(lowEK1PressureValue);
            const PT02Value = parseFloat(PT02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT02Value)) {
                if (highValue < PT02Value || PT02Value < lowValue) {
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
    }, [highEK1PressureValue, PT02, audioPlaying, lowEK1PressureValue,maintainPT_1901]);

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
    const ChangeMaintainPT_1901 = async () => {
        try {
            const newValue = !maintainPT_1901;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Pressure_Maintain: newValue }
            );
            setMaintainPT_1901(newValue);
            
        } catch (error) {}
    };

// ========================== PT 1901 ============================================

// ========================== PT 1902 ============================================


const [PT03, setPT03] = useState<string | null>(null);
const [audioPlaying2, setAudioPlaying2] = useState(false);
const [inputValueEK2Hight, setInputValueEK2High] = useState<any>();
const [inputValueEK1Low, setInputValueEK2Low] = useState<any>();
const [highEK2PressureValue, setHighEK2PressureValue] = useState<number | null>(null);
const [lowEK2PressureValue, setLowEK2PressureValue] = useState<number | null>(null);
const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainPT_1902, setMaintainPT_1902] = useState<boolean>(false);



    useEffect(() => {
        if (typeof highEK2PressureValue === 'string' && typeof lowEK2PressureValue === 'string' && PT03 !== null && maintainPT_1902 === false) {
            const highValue = parseFloat(highEK2PressureValue);
            const lowValue = parseFloat(lowEK2PressureValue);
            const PT03Value = parseFloat(PT03);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT03Value)) {
                if (highValue < PT03Value || PT03Value < lowValue) {
                    if (!audioPlaying2) {
                        audioRef.current?.play();
                        setAudioPlaying2(true);
                        setExceedThreshold2(true);
                    }
                } else {
                    setAudioPlaying2(false);
                    setExceedThreshold2(false);
                }
            } 
        } 
    }, [highEK2PressureValue, PT03, audioPlaying2, lowEK2PressureValue, maintainPT_1902]);

    useEffect(() => {
        if (audioPlaying2) {
            const audioEnded = () => {
                setAudioPlaying2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [audioPlaying2]);
    const handleInputChangeEK2High = (event: any) => {
        const newValue = event.target.value;
        setInputValueEK2High(newValue);
    };

    const handleInputChangeEK2Low = (event: any) => {
        const newValue2 = event.target.value;
        setInputValueEK2Low(newValue2);
    };

    const ChangeMaintainPT_1902 = async () => {
        try {
            const newValue = !maintainPT_1902;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Pressure_Maintain: newValue }
            );
            setMaintainPT_1902(newValue);
            
        } catch (error) {}
    };
// ========================== PT 1902 ============================================

// ========================== PT 1903 ============================================

const [PT01, setPT01] = useState<string | null>(null);
const [audioPlaying3, setAudioPlaying3] = useState(false);
const [inputValueEK3Hight, setInputValueEK3High] = useState<any>();
const [inputValueEK3Low, setInputValueEK3Low] = useState<any>();
const [highEK3PressureValue, setHighEK3PressureValue] = useState<number | null>(null);
const [lowEK3PressureValue, setLowEK3PressureValue] = useState<number | null>(null);
const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainPT_1903, setMaintainPT_1903] = useState<boolean>(false);

    useEffect(() => {
        if (typeof highEK3PressureValue === 'string' && typeof lowEK3PressureValue === 'string' && PT01 !== null && maintainPT_1903 === false  ) {
            const highValue = parseFloat(highEK3PressureValue);
            const lowValue = parseFloat(lowEK3PressureValue);
            const PT01Value = parseFloat(PT01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT01Value)) {
                if (highValue < PT01Value || PT01Value < lowValue) {
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
    }, [highEK3PressureValue, PT01, audioPlaying3, lowEK3PressureValue,maintainPT_1903]);

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

    const handleInputChangeEK3High = (event: any) => {
        const newValue = event.target.value;
        setInputValueEK3High(newValue);
    };

    const handleInputChangeEK3Low = (event: any) => {
        const newValue2 = event.target.value;
        setInputValueEK3Low(newValue2);
    };

    const ChangeMaintainPT_1903 = async () => {
        try {
            const newValue = !maintainPT_1903;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { PT1_Maintain: newValue }
            );
            setMaintainPT_1903(newValue);
            
        } catch (error) {}
    };
// ========================== PT 1903 ============================================

// ========================== GD_01 ============================================

const [GD01, setGD01] = useState<string | null>(null);
const [AudioGD01, setAudioGD01] = useState(false);
const [inputHighGD01, setInputHighGD01] = useState<any>();
const [inputLowGD01, setInputLowGD01] = useState<any>();
const [HighGD01, setHighGD01] = useState<number | null>(null);
const [LowGD01, setLowGD01] = useState<number | null>(null);
const [AlarmGD01, setAlarmGD01] = useState(false);
const [maintainGD_1901, setMaintainGD_1901] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD01 === 'string' && typeof LowGD01 === 'string' && GD01 !== null && maintainGD_1901 === false) {
            const highValue = parseFloat(HighGD01);
            const lowValue = parseFloat(LowGD01);
            const GD01Value = parseFloat(GD01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD01Value)) {
                if (highValue < GD01Value || GD01Value < lowValue) {
                    if (!AudioGD01) {
                        audioRef.current?.play();
                        setAudioGD01(true);
                        setAlarmGD01(true);
                    }
                } else {
                    setAudioGD01(false);
                    setAlarmGD01(false);
                }
            } 
        } 
    }, [HighGD01, GD01, AudioGD01, LowGD01,maintainGD_1901]);

    useEffect(() => {
        if (AudioGD01) {
            const audioEnded = () => {
                setAudioGD01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD01]);

    const handleInputChangeHighGD01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD01(newValue);
    };

    const handleInputChangeLowGD01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD01(newValue2);
    };

    const ChangeMaintainGD_01 = async () => {
        try {
            const newValue = !maintainGD_1901;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD1_Maintain: newValue }
            );
            setMaintainGD_1901(newValue);
            
        } catch (error) {}
    };
// ========================== GD_01 ============================================

// ========================== GD_02 ============================================
const [GD02, setGD02] = useState<string | null>(null);
const [AudioGD02, setAudioGD02] = useState(false);
const [inputHighGD02, setInputHighGD02] = useState<any>();
const [inputLowGD02, setInputLowGD02] = useState<any>();
const [HighGD02, setHighGD02] = useState<number | null>(null);
const [LowGD02, setLowGD02] = useState<number | null>(null);
const [AlarmGD02, setAlarmGD02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGD_1902, setMaintainGD_1902] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD02 === 'string' && typeof LowGD02 === 'string' && GD02 !== null && maintainGD_1902=== false ) {
            const highValue = parseFloat(HighGD02);
            const lowValue = parseFloat(LowGD02);
            const GD02Value = parseFloat(GD02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD02Value)) {
                if (highValue < GD02Value || GD02Value < lowValue) {
                    if (!AudioGD02) {
                        audioRef.current?.play();
                        setAudioGD02(true);
                        setAlarmGD02(true);
                    }
                } else {
                    setAudioGD02(false);
                    setAlarmGD02(false);
                }
            } 
        } 
    }, [HighGD02, GD02, AudioGD02, LowGD02,maintainGD_1902]);

    useEffect(() => {
        if (AlarmGD02) {
            const audioEnded = () => {
                setAudioGD02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD02]);

    const handleInputChangeHighGD02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD02(newValue);
    };

    const handleInputChangeLowGD02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD02(newValue2);
    };
    const ChangeMaintainGD_02 = async () => {
        try {
            const newValue = !maintainGD_1902;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD2_Maintain: newValue }
            );
            setMaintainGD_1902(newValue);
            
        } catch (error) {}
    };
// ========================== GD_02 ============================================


// ========================== GD_03 ============================================
const [GD03, setGD03] = useState<string | null>(null);
const [AudioGD03, setAudioGD03] = useState(false);
const [inputHighGD03, setInputHighGD03] = useState<any>();
const [inputLowGD03, setInputLowGD03] = useState<any>();
const [HighGD03, setHighGD03] = useState<number | null>(null);
const [LowGD03, setLowGD03] = useState<number | null>(null);
const [AlarmGD03, setAlarmGD03] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGD_1903, setMaintainGD_1903] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGD03 === 'string' && typeof LowGD03 === 'string' && GD03 !== null && maintainGD_1903 === false ) {
            const highValue = parseFloat(HighGD03);
            const lowValue = parseFloat(LowGD03);
            const GD03Value = parseFloat(GD03);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD03Value)) {
                if (highValue < GD03Value || GD03Value < lowValue) {
                    if (!AudioGD03) {
                        audioRef.current?.play();
                        setAudioGD03(true);
                        setAlarmGD03(true);
                    }
                } else {
                    setAudioGD03(false);
                    setAlarmGD03(false);
                }
            } 
        } 
    }, [HighGD03, GD03, AudioGD03, LowGD03,maintainGD_1903]);

    useEffect(() => {
        if (AudioGD03) {
            const audioEnded = () => {
                setAudioGD03(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGD03]);

    const handleInputChangeHighGD03 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGD03(newValue);
    };

    const handleInputChangeLowGD03 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGD03(newValue2);
    };
    const ChangeMaintainGD_03 = async () => {
        try {
            const newValue = !maintainGD_1903;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { GD3_Maintain: newValue }
            );
            setMaintainGD_1903(newValue);
            
            
        } catch (error) {}
    };
// ========================== GD_03 ============================================


// ========================== GVF1- FIQ-1901  ============================================
const [GVF1, setGVF1] = useState<string | null>(null);
const [AudioGVF1, setAudioGVF1] = useState(false);
const [inputHighGVF1, setInputHighGVF1] = useState<any>();
const [inputLowGVF1, setInputLowGVF1] = useState<any>();
const [HighGVF1, setHighGVF1] = useState<number | null>(null);
const [LowGVF1, setLowGVF1] = useState<number | null>(null);
const [AlarmGVF1, setAlarmGVF1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGVF1, setMaintainGVF1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGVF1 === 'string' && typeof LowGVF1 === 'string' && GVF1 !== null && maintainGVF1 === false) {
            const highValue = parseFloat(HighGVF1);
            const lowValue = parseFloat(LowGVF1);
            const GVF1Value = parseFloat(GVF1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GVF1Value)) {
                if (highValue < GVF1Value || GVF1Value < lowValue) {
                    if (!AudioGVF1) {
                        audioRef.current?.play();
                        setAudioGVF1(true);
                        setAlarmGVF1(true);
                    }
                } else {
                    setAudioGVF1(false);
                    setAlarmGVF1(false);
                }
            } 
        } 
    }, [HighGVF1, GVF1, AudioGVF1, LowGVF1,maintainGVF1]);

    useEffect(() => {
        if (AlarmGVF1) {
            const audioEnded = () => {
                setAudioGVF1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGVF1]);

    const handleInputChangeHighGVF1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGVF1(newValue);
    };

    const handleInputChangeLowGVF1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGVF1(newValue2);
    };
    const ChangeMaintainGVF_01 = async () => {
        try {
            const newValue = !maintainGVF1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Flow_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainGVF1(newValue);
            
            
        } catch (error) {}
    };
// ========================== GVF1- FIQ-1901 ============================================

// ========================== SVF1- FIQ-1901  ============================================
const [SVF1, setSVF1] = useState<string | null>(null);
const [AudioSVF1, setAudioSVF1] = useState(false);
const [inputHighSVF1, setInputHighSVF1] = useState<any>();
const [inputLowSVF1, setInputLowSVF1] = useState<any>();
const [HighSVF1, setHighSVF1] = useState<number | null>(null);
const [LowSVF1, setLowSVF1] = useState<number | null>(null);
const [AlarmSVF1, setAlarmSVF1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainSVF1, setMaintainSVF1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighSVF1 === 'string' && typeof LowSVF1 === 'string' && SVF1 !== null && maintainSVF1 === false) {
            const highValue = parseFloat(HighSVF1);
            const lowValue = parseFloat(LowSVF1);
            const SVF1Value = parseFloat(SVF1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SVF1Value)) {
                if (highValue < SVF1Value || SVF1Value < lowValue) {
                    if (!AudioSVF1) {
                        audioRef.current?.play();
                        setAudioSVF1(true);
                        setAlarmSVF1(true);
                    }
                } else {
                    setAudioSVF1(false);
                    setAlarmSVF1(false);
                }
            } 
        } 
    }, [HighSVF1, SVF1, AudioSVF1, LowSVF1,maintainSVF1]);

    useEffect(() => {
        if (AudioSVF1) {
            const audioEnded = () => {
                setAudioSVF1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioSVF1]);

    const handleInputChangeHighSVF1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighSVF1(newValue);
    };

    const handleInputChangeLowSVF1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowSVF1(newValue2);
    };

    const ChangeMaintainSVF_01 = async () => {
        try {
            const newValue = !maintainSVF1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Flow_at_Base_Condition_Maintain: newValue }
            );
            setMaintainSVF1(newValue);
            
            
        } catch (error) {}
    };
// ========================== SVF1- FIQ-1901 ============================================


// ========================== SVA1- FIQ-1901  ============================================
const [SVA1, setSVA1] = useState<string | null>(null);
const [AudioSVA1, setAudioSVA1] = useState(false);
const [inputHighSVA1, setInputHighSVA1] = useState<any>();
const [inputLowSVA1, setInputLowSVA1] = useState<any>();
const [HighSVA1, setHighSVA1] = useState<number | null>(null);
const [LowSVA1, setLowSVA1] = useState<number | null>(null);
const [AlarmSVA1, setAlarmSVA1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSVA1, setMaintainSVA1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighSVA1 === 'string' && typeof LowSVA1 === 'string' && SVA1 !== null && maintainSVA1 === false) {
            const highValue = parseFloat(HighSVA1);
            const lowValue = parseFloat(LowSVA1);
            const SVA1Value = parseFloat(SVA1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SVA1Value)) {
                if (highValue < SVA1Value || SVA1Value < lowValue) {
                    if (!AudioSVA1) {
                        audioRef.current?.play();
                        setAudioSVA1(true);
                        setAlarmSVA1(true);
                    }
                } else {
                    setAudioSVA1(false);
                    setAlarmSVA1(false);
                }
            } 
        } 
    }, [HighSVA1, SVA1, AudioSVA1, LowSVA1,maintainSVA1]);

    useEffect(() => {
        if (AudioSVA1) {
            const audioEnded = () => {
                setAudioSVA1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioSVA1]);

    const handleInputChangeHighSVA1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighSVA1(newValue);
    };

    const handleInputChangeLowSVA1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowSVA1(newValue2);
    };
    const ChangeMaintainSVA_01 = async () => {
        try {
            const newValue = !maintainSVA1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Volume_at_Base_Condition_Maintain: newValue }
            );
            setMaintainSVA1(newValue);
            
            
        } catch (error) {}
    };
// ========================== SVA1- FIQ-1901 ============================================

// ========================== GVA1- FIQ-1901  ============================================
const [GVA1, setGVA1] = useState<string | null>(null);
const [AudioGVA1, setAudioGVA1] = useState(false);
const [inputHighGVA1, setInputHighGVA1] = useState<any>();
const [inputLowGVA1, setInputLowGVA1] = useState<any>();
const [HighGVA1, setHighGVA1] = useState<number | null>(null);
const [LowGVA1, setLowGVA1] = useState<number | null>(null);
const [AlarmGVA1, setAlarmGVA1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainGVA1, setMaintainGVA1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGVA1 === 'string' && typeof LowGVA1 === 'string' && GVA1 !== null && maintainGVA1 === false) {
            const highValue = parseFloat(HighGVA1);
            const lowValue = parseFloat(LowGVA1);
            const GVA1Value = parseFloat(GVA1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GVA1Value)) {
                if (highValue < GVA1Value || GVA1Value < lowValue) {
                    if (!AudioGVA1) {
                        audioRef.current?.play();
                        setAudioGVA1(true);
                        setAlarmGVA1(true);
                    }
                } else {
                    setAudioGVA1(false);
                    setAlarmGVA1(false);
                }
            } 
        } 
    }, [HighGVA1, GVA1, AudioGVA1, LowGVA1,maintainGVA1]);

    useEffect(() => {
        if (AudioGVA1) {
            const audioEnded = () => {
                setAudioGVA1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGVA1]);

    const handleInputChangeHighGVA1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGVA1(newValue);
    };

    const handleInputChangeLowGVA1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGVA1(newValue2);
    };
    const ChangeMaintainGVA_01 = async () => {
        try {
            const newValue = !maintainGVA1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainGVA1(newValue);
            
            
        } catch (error) {}
    };
// ========================== GVA1- FIQ-1901 ============================================

// ========================== GVF2- FIQ-19012 ============================================
const [GVF2, setGVF2] = useState<string | null>(null);
const [AudioGVF2, setAudioGVF2] = useState(false);
const [inputHighGVF2, setInputHighGVF2] = useState<any>();
const [inputLowGVF2, setInputLowGVF2] = useState<any>();
const [HighGVF2, setHighGVF2] = useState<number | null>(null);
const [LowGVF2, setLowGVF2] = useState<number | null>(null);
const [AlarmGVF2, setAlarmGVF2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainGVF2, setMaintainGVF2] = useState<boolean>(false);


    useEffect(() => {
        if (typeof HighGVF2 === 'string' && typeof LowGVF2 === 'string' && GVF2 !== null && maintainGVF2 === false) {
            const highValue = parseFloat(HighGVF2);
            const lowValue = parseFloat(LowGVF2);
            const GVF2Value = parseFloat(GVF2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GVF2Value)) {
                if (highValue < GVF2Value || GVF2Value < lowValue) {
                    if (!AudioGVF2) {
                        audioRef.current?.play();
                        setAudioGVF2(true);
                        setAlarmGVF2(true);
                    }
                } else {
                    setAudioGVF2(false);
                    setAlarmGVF2(false);
                }
            } 
        } 
    }, [HighGVF2, GVF2, AudioGVF2, LowGVF2,maintainGVF2]);

    useEffect(() => {
        if (AlarmGVF2) {
            const audioEnded = () => {
                setAudioGVF2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGVF2]);

    const handleInputChangeHighGVF2 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGVF2(newValue);
    };

    const handleInputChangeLowGVF2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGVF2(newValue2);
    };
    const ChangeMaintainGVF_02 = async () => {
        try {
            const newValue = !maintainGVF2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Flow_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainGVF2(newValue);
            
            
        } catch (error) {}
    };
// ========================== GVF2- FIQ-1902 ============================================

// ========================== SVF2- FIQ-1902  ============================================
const [SVF2, setSVF2] = useState<string | null>(null);
const [AudioSVF2, setAudioSVF2] = useState(false);
const [inputHighSVF2, setInputHighSVF2] = useState<any>();
const [inputLowSVF2, setInputLowSVF2] = useState<any>();
const [HighSVF2, setHighSVF2] = useState<number | null>(null);
const [LowSVF2, setLowSVF2] = useState<number | null>(null);
const [AlarmSVF2, setAlarmSVF2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainSVF2, setMaintainSVF2] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighSVF2 === 'string' && typeof LowSVF2 === 'string' && SVF2 !== null && maintainSVF2 === false) {
            const highValue = parseFloat(HighSVF2);
            const lowValue = parseFloat(LowSVF2);
            const SVF2Value = parseFloat(SVF2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SVF2Value)) {
                if (highValue < SVF2Value || SVF2Value < lowValue) {
                    if (!AudioSVF2) {
                        audioRef.current?.play();
                        setAudioSVF2(true);
                        setAlarmSVF2(true);
                    }
                } else {
                    setAudioSVF2(false);
                    setAlarmSVF2(false);
                }
            } 
        } 
    }, [HighSVF2, SVF2, AudioSVF2, LowSVF2,maintainSVF2]);

    useEffect(() => {
        if (AudioSVF2) {
            const audioEnded = () => {
                setAudioSVF2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioSVF2]);

    const handleInputChangeHighSVF2 = (event: any) => {
        const newValue = event.target.value;
        setInputHighSVF2(newValue);
    };

    const handleInputChangeLowSVF2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowSVF2(newValue2);
    };
    const ChangeMaintainSVF_02 = async () => {
        try {
            const newValue = !maintainSVF2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Flow_at_Base_Condition_Maintain: newValue }
            );
            setMaintainSVF2(newValue);
            
            
        } catch (error) {}
    };
// ========================== SVF2- FIQ-1902 ============================================


// ========================== SVA2- FIQ-1902  ============================================
const [SVA2, setSVA2] = useState<string | null>(null);
const [AudioSVA2, setAudioSVA2] = useState(false);
const [inputHighSVA2, setInputHighSVA2] = useState<any>();
const [inputLowSVA2, setInputLowSVA2] = useState<any>();
const [HighSVA2, setHighSVA2] = useState<number | null>(null);
const [LowSVA2, setLowSVA2] = useState<number | null>(null);
const [AlarmSVA2, setAlarmSVA2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainSVA2, setMaintainSVA2] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighSVA2 === 'string' && typeof LowSVA2 === 'string' && SVA2 !== null && maintainSVA2 === false) {
            const highValue = parseFloat(HighSVA2);
            const lowValue = parseFloat(LowSVA2);
            const SVA2Value = parseFloat(SVA2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SVA2Value)) {
                if (highValue < SVA2Value || SVA2Value < lowValue) {
                    if (!AudioSVA2) {
                        audioRef.current?.play();
                        setAudioSVA2(true);
                        setAlarmSVA2(true);
                    }
                } else {
                    setAudioSVA2(false);
                    setAlarmSVA2(false);
                }
            } 
        } 
    }, [HighSVA2, SVA2, AudioSVA2, LowSVA2,maintainSVA2]);

    useEffect(() => {
        if (AudioSVA2) {
            const audioEnded = () => {
                setAudioSVA2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioSVA2]);

    const handleInputChangeHighSVA2 = (event: any) => {
        const newValue = event.target.value;
        setInputHighSVA2(newValue);
    };

    const handleInputChangeLowSVA2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowSVA2(newValue2);
    };
    const ChangeMaintainSVA_02 = async () => {
        try {
            const newValue = !maintainSVA2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Base_Condition_Maintain: newValue }
            );
            setMaintainSVA2(newValue);
            
            
        } catch (error) {}
    };
// ========================== SVA2- FIQ-1902 ============================================

// ========================== GVA2- FIQ-1902  ============================================
const [GVA2, setGVA2] = useState<string | null>(null);
const [AudioGVA2, setAudioGVA2] = useState(false);
const [inputHighGVA2, setInputHighGVA2] = useState<any>();
const [inputLowGVA2, setInputLowGVA2] = useState<any>();
const [HighGVA2, setHighGVA2] = useState<number | null>(null);
const [LowGVA2, setLowGVA2] = useState<number | null>(null);
const [AlarmGVA2, setAlarmGVA2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainGVA2, setMaintainGVA2] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighGVA2 === 'string' && typeof LowGVA2 === 'string' && GVA2 !== null && maintainGVA2 === false) {
            const highValue = parseFloat(HighGVA2);
            const lowValue = parseFloat(LowGVA2);
            const GVA2Value = parseFloat(GVA2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GVA2Value)) {
                if (highValue < GVA2Value || GVA2Value < lowValue) {
                    if (!AudioGVA2) {
                        audioRef.current?.play();
                        setAudioGVA2(true);
                        setAlarmGVA2(true);
                    }
                } else {
                    setAudioGVA2(false);
                    setAlarmGVA2(false);
                }
            } 
        } 
    }, [HighGVA2, GVA2, AudioGVA2, LowGVA2,maintainGVA2]);

    useEffect(() => {
        if (AudioGVA2) {
            const audioEnded = () => {
                setAudioGVA2(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioGVA2]);

    const handleInputChangeHighGVA2 = (event: any) => {
        const newValue = event.target.value;
        setInputHighGVA2(newValue);
    };

    const handleInputChangeLowGVA2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowGVA2(newValue2);
    };
    const ChangeMaintainGVA_02 = async () => {
        try {
            const newValue = !maintainGVA2;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Volume_at_Measurement_Condition_Maintain: newValue }
            );
            setMaintainGVA2(newValue);
            
            
        } catch (error) {}
    };
// ========================== GVA2- FIQ-1901 ============================================

// ========================== EVC 01 TEMPERATURE ============================================
const [Temperature01, setTemperature01] = useState<string | null>(null);

const [AudioTemperature01, setAudioTemperature01] = useState(false);
const [inputHighTemperature01, setInputHighTemperature01] = useState<any>();
const [inputLowTemperature01, setInputLowTemperature01] = useState<any>();
const [HighTemperature01, setHighTemperature01] = useState<number | null>(null);
const [LowTemperature01, setLowTemperature01] = useState<number | null>(null);
const [AlarmTemperature01, setAlarmTemperature01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainTemperature01, setMaintainTemperature01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighTemperature01 === 'string' && typeof LowTemperature01 === 'string' && Temperature01 !== null && maintainTemperature01 === false) {
            const highValue = parseFloat(HighTemperature01);
            const lowValue = parseFloat(LowTemperature01);
            const Temperature01Value = parseFloat(Temperature01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Temperature01Value)) {
                if (highValue < Temperature01Value || Temperature01Value < lowValue) {
                    if (!AudioTemperature01) {
                        audioRef.current?.play();
                        setAudioTemperature01(true);
                        setAlarmTemperature01(true);
                    }
                } else {
                    setAudioTemperature01(false);
                    setAlarmTemperature01(false);
                }
            } 
        } 
    }, [HighTemperature01, Temperature01, AudioTemperature01, LowTemperature01,maintainTemperature01]);

    useEffect(() => {
        if (AudioTemperature01) {
            const audioEnded = () => {
                setAudioTemperature01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioTemperature01]);

    const handleInputChangeHighTemperature01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighTemperature01(newValue);
    };

    const handleInputChangeLowTemperature01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowTemperature01(newValue2);
    };
    const ChangeMaintainTemperature01 = async () => {
        try {
            const newValue = !maintainTemperature01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Temperature_Maintain: newValue }
            );
            setMaintainTemperature01(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC 01 TEMPERATURE ============================================

const [Temperature02, setTemperature02] = useState<string | null>(null);

const [AudioTemperature02, setAudioTemperature02] = useState(false);
const [inputHighTemperature02, setInputHighTemperature02] = useState<any>();
const [inputLowTemperature02, setInputLowTemperature02] = useState<any>();
const [HighTemperature02, setHighTemperature02] = useState<number | null>(null);
const [LowTemperature02, setLowTemperature02] = useState<number | null>(null);
const [AlarmTemperature02, setAlarmTemperature02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainTemperature02, setMaintainTemperature02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighTemperature02 === 'string' && typeof LowTemperature02 === 'string' && Temperature02 !== null && maintainTemperature02 === false) {
            const highValue = parseFloat(HighTemperature02);
            const lowValue = parseFloat(LowTemperature02);
            const Temperature02Value = parseFloat(Temperature02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(Temperature02Value)) {
                if (highValue < Temperature02Value || Temperature02Value < lowValue) {
                    if (!AudioTemperature02) {
                        audioRef.current?.play();
                        setAudioTemperature02(true);
                        setAlarmTemperature02(true);
                    }
                } else {
                    setAudioTemperature02(false);
                    setAlarmTemperature02(false);
                }
            } 
        } 
    }, [HighTemperature02, Temperature02, AudioTemperature02, LowTemperature02,maintainTemperature02]);

    useEffect(() => {
        if (AudioTemperature02) {
            const audioEnded = () => {
                setAudioTemperature02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioTemperature02]);

    const handleInputChangeHighTemperature02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighTemperature02(newValue);
    };

    const handleInputChangeLowTemperature02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowTemperature02(newValue2);
    };
    const ChangeMaintainTemperature02 = async () => {
        try {
            const newValue = !maintainTemperature02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Temperature_Maintain: newValue }
            );
            setMaintainTemperature02(newValue);
            
            
        } catch (error) {}
    };
// ========================== EVC 01 TEMPERATURE ============================================


// ========================== Remain battery 01 ============================================
const [ReBattery01,setRebattery01] = useState<string | null>(null);


const [AudioReBattery01, setAudioReBattery01] = useState(false);
const [inputHighReBattery01, setInputHighReBattery01] = useState<any>();
const [inputLowReBattery01, setInputLowReBattery01] = useState<any>();
const [HighReBattery01, setHighReBattery01] = useState<number | null>(null);
const [LowReBattery01, setLowReBattery01] = useState<number | null>(null);
const [AlarmReBattery01, setAlarmReBattery01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainReBattery01, setMaintainReBattery01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighReBattery01 === 'string' && typeof LowReBattery01 === 'string' && ReBattery01 !== null && maintainReBattery01 === false) {
            const highValue = parseFloat(HighReBattery01);
            const lowValue = parseFloat(LowReBattery01);
            const ReBattery01Value = parseFloat(ReBattery01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ReBattery01Value)) {
                if (highValue < ReBattery01Value || ReBattery01Value < lowValue) {
                    if (!AudioReBattery01) {
                        audioRef.current?.play();
                        setAudioReBattery01(true);
                        setAlarmReBattery01(true);
                    }
                } else {
                    setAudioReBattery01(false);
                    setAlarmReBattery01(false);
                }
            } 
        } 
    }, [HighReBattery01, ReBattery01, AudioReBattery01, LowReBattery01,maintainReBattery01]);

    useEffect(() => {
        if (AudioReBattery01) {
            const audioEnded = () => {
                setAudioReBattery01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioReBattery01]);

    const handleInputChangeHighReBattery01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighReBattery01(newValue);
    };

    const handleInputChangeLowReBattery01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowReBattery01(newValue2);
    };
    const ChangeMaintainReBattery01 = async () => {
        try {
            const newValue = !maintainReBattery01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Remain_Battery_Service_Life_Maintain: newValue }
            );
            setMaintainReBattery01(newValue);
            
            
        } catch (error) {}
    };
// ========================== Remain battery 01 ============================================

// ==========================Remain battery 02 ============================================
const [ReBattery02,setRebattery02] = useState<string | null>(null);

const [AudioReBattery02, setAudioReBattery02] = useState(false);
const [inputHighReBattery02, setInputHighReBattery02] = useState<any>();
const [inputLowReBattery02, setInputLowReBattery02] = useState<any>();
const [HighReBattery02, setHighReBattery02] = useState<number | null>(null);
const [LowReBattery02, setLowReBattery02] = useState<number | null>(null);
const [AlarmReBattery02, setAlarmReBattery02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainReBattery02, setMaintainReBattery02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighReBattery02 === 'string' && typeof LowReBattery02 === 'string' && ReBattery02 !== null && maintainReBattery02 === false) {
            const highValue = parseFloat(HighReBattery02);
            const lowValue = parseFloat(LowReBattery02);
            const ReBattery02Value = parseFloat(ReBattery02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ReBattery02Value)) {
                if (highValue < ReBattery02Value || ReBattery02Value < lowValue) {
                    if (!AudioReBattery02) {
                        audioRef.current?.play();
                        setAudioReBattery02(true);
                        setAlarmReBattery02(true);
                    }
                } else {
                    setAudioReBattery02(false);
                    setAlarmReBattery02(false);
                }
            } 
        } 
    }, [HighReBattery02, ReBattery02, AudioReBattery02, LowReBattery02,maintainReBattery02]);

    useEffect(() => {
        if (AudioReBattery02) {
            const audioEnded = () => {
                setAudioReBattery02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioReBattery02]);

    const handleInputChangeHighReBattery02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighReBattery02(newValue);
    };

    const handleInputChangeLowReBattery02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowReBattery02(newValue2);
    };
    const ChangeMaintainReBattery02 = async () => {
        try {
            const newValue = !maintainReBattery02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Remain_Battery_Service_Life_Maintain: newValue }
            );
            setMaintainReBattery02(newValue);
            
            
        } catch (error) {}
    };
// ========================== Remain battery 02 ============================================

// ========================== VM LAST DAY 01 ============================================
const [VmLastDay01, setVmLastDay01] = useState<string | null>(null);
const [AudioVmLastDay01, setAudioVmLastDay01] = useState(false);
const [inputHighVmLastDay01, setInputHighVmLastDay01] = useState<any>();
const [inputLowVmLastDay01, setInputLowVmLastDay01] = useState<any>();
const [HighVmLastDay01, setHighVmLastDay01] = useState<number | null>(null);
const [LowVmLastDay01, setLowVmLastDay01] = useState<number | null>(null);
const [AlarmVmLastDay01, setAlarmVmLastDay01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVmLastDay01, setMaintainVmLastDay01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVmLastDay01 === 'string' && typeof LowVmLastDay01 === 'string' && VmLastDay01 !== null && maintainVmLastDay01 === false) {
            const highValue = parseFloat(HighVmLastDay01);
            const lowValue = parseFloat(LowVmLastDay01);
            const VmLastDay01Value = parseFloat(VmLastDay01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VmLastDay01Value)) {
                if (highValue < VmLastDay01Value || VmLastDay01Value < lowValue) {
                    if (!AudioVmLastDay01) {
                        audioRef.current?.play();
                        setAudioVmLastDay01(true);
                        setAlarmVmLastDay01(true);
                    }
                } else {
                    setAudioVmLastDay01(false);
                    setAlarmVmLastDay01(false);
                }
            } 
        } 
    }, [HighVmLastDay01, VmLastDay01, AudioVmLastDay01, LowVmLastDay01,maintainVmLastDay01]);

    useEffect(() => {
        if (AudioVmLastDay01) {
            const audioEnded = () => {
                setAudioVmLastDay01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVmLastDay01]);

    const handleInputChangeHighVmLastDay01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVmLastDay01(newValue);
    };

    const handleInputChangeLowVmLastDay01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVmLastDay01(newValue2);
    };
    const ChangeMaintainVmLastDay01 = async () => {
        try {
            const newValue = !maintainVmLastDay01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vm_of_Last_Day_Maintain: newValue }
            );
            setMaintainVmLastDay01(newValue);
            
            
        } catch (error) {}
    };
// ==========================VM LAST DAY 01 ============================================

// ==========================VM LAST DAY 01  ============================================
const [VmLastDay02, setVmLastDay02] = useState<string | null>(null);
const [AudioVmLastDay02, setAudioVmLastDay02] = useState(false);
const [inputHighVmLastDay02, setInputHighVmLastDay02] = useState<any>();
const [inputLowVmLastDay02, setInputLowVmLastDay02] = useState<any>();
const [HighVmLastDay02, setHighVmLastDay02] = useState<number | null>(null);
const [LowVmLastDay02, setLowVmLastDay02] = useState<number | null>(null);
const [AlarmVmLastDay02, setAlarmVmLastDay02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVmLastDay02, setMaintainVmLastDay02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVmLastDay02 === 'string' && typeof LowVmLastDay02 === 'string' && VmLastDay02 !== null && maintainVmLastDay02 === false) {
            const highValue = parseFloat(HighVmLastDay02);
            const lowValue = parseFloat(LowVmLastDay02);
            const VmLastDay02Value = parseFloat(VmLastDay02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VmLastDay02Value)) {
                if (highValue < VmLastDay02Value || VmLastDay02Value < lowValue) {
                    if (!AudioVmLastDay02) {
                        audioRef.current?.play();
                        setAudioVmLastDay02(true);
                        setAlarmVmLastDay02(true);
                    }
                } else {
                    setAudioVmLastDay02(false);
                    setAlarmVmLastDay02(false);
                }
            } 
        } 
    }, [HighVmLastDay02, VmLastDay02, AudioVmLastDay02, LowVmLastDay02,maintainVmLastDay02]);

    useEffect(() => {
        if (AudioVmLastDay02) {
            const audioEnded = () => {
                setAudioVmLastDay02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVmLastDay02]);

    const handleInputChangeHighVmLastDay02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVmLastDay02(newValue);
    };

    const handleInputChangeLowVmLastDay02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVmLastDay02(newValue2);
    };
    const ChangeMaintainVmLastDay02 = async () => {
        try {
            const newValue = !maintainVmLastDay02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vm_of_Last_Day_Maintain: newValue }
            );
            setMaintainVmLastDay02(newValue);
            
            
        } catch (error) {}
    };
// ========================== VM LAST DAY 01 ============================================



// ========================== Vb LAST DAY 01 ============================================
const [VbLastDay01, setVbLastDay01] = useState<string | null>(null);
const [AudioVbLastDay01, setAudioVbLastDay01] = useState(false);
const [inputHighVbLastDay01, setInputHighVbLastDay01] = useState<any>();
const [inputLowVbLastDay01, setInputLowVbLastDay01] = useState<any>();
const [HighVbLastDay01, setHighVbLastDay01] = useState<number | null>(null);
const [LowVbLastDay01, setLowVbLastDay01] = useState<number | null>(null);
const [AlarmVbLastDay01, setAlarmVbLastDay01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVbLastDay01, setMaintainVbLastDay01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVbLastDay01 === 'string' && typeof LowVbLastDay01 === 'string' && VbLastDay01 !== null && maintainVbLastDay01 === false) {
            const highValue = parseFloat(HighVbLastDay01);
            const lowValue = parseFloat(LowVbLastDay01);
            const VbLastDay01Value = parseFloat(VbLastDay01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VbLastDay01Value)) {
                if (highValue < VbLastDay01Value || VbLastDay01Value < lowValue) {
                    if (!AudioVbLastDay01) {
                        audioRef.current?.play();
                        setAudioVbLastDay01(true);
                        setAlarmVbLastDay01(true);
                    }
                } else {
                    setAudioVbLastDay01(false);
                    setAlarmVbLastDay01(false);
                }
            } 
        } 
    }, [HighVbLastDay01, VbLastDay01, AudioVbLastDay01, LowVbLastDay01,maintainVbLastDay01]);

    useEffect(() => {
        if (AudioVbLastDay01) {
            const audioEnded = () => {
                setAudioVbLastDay01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVbLastDay01]);

    const handleInputChangeHighVbLastDay01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVbLastDay01(newValue);
    };

    const handleInputChangeLowVbLastDay01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVbLastDay01(newValue2);
    };
    const ChangeMaintainVbLastDay01 = async () => {
        try {
            const newValue = !maintainVbLastDay01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vb_of_Last_Day_Maintain: newValue }
            );
            setMaintainVbLastDay01(newValue);
            
            
        } catch (error) {}
    };
// ==========================Vb LAST DAY 01 ============================================

// ==========================Vb LAST DAY 02  ============================================
const [VbLastDay02, setVbLastDay02] = useState<string | null>(null);
const [AudioVbLastDay02, setAudioVbLastDay02] = useState(false);
const [inputHighVbLastDay02, setInputHighVbLastDay02] = useState<any>();
const [inputLowVbLastDay02, setInputLowVbLastDay02] = useState<any>();
const [HighVbLastDay02, setHighVbLastDay02] = useState<number | null>(null);
const [LowVbLastDay02, setLowVbLastDay02] = useState<number | null>(null);
const [AlarmVbLastDay02, setAlarmVbLastDay02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVbLastDay02, setMaintainVbLastDay02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVbLastDay02 === 'string' && typeof LowVbLastDay02 === 'string' && VbLastDay02 !== null && maintainVbLastDay02 === false) {
            const highValue = parseFloat(HighVbLastDay02);
            const lowValue = parseFloat(LowVbLastDay02);
            const VbLastDay02Value = parseFloat(VbLastDay02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VbLastDay02Value)) {
                if (highValue < VbLastDay02Value || VbLastDay02Value < lowValue) {
                    if (!AudioVbLastDay02) {
                        audioRef.current?.play();
                        setAudioVbLastDay02(true);
                        setAlarmVbLastDay02(true);
                    }
                } else {
                    setAudioVbLastDay02(false);
                    setAlarmVbLastDay02(false);
                }
            } 
        } 
    }, [HighVbLastDay02, VbLastDay02, AudioVbLastDay02, LowVbLastDay02,maintainVbLastDay02]);

    useEffect(() => {
        if (AudioVbLastDay02) {
            const audioEnded = () => {
                setAudioVbLastDay02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVbLastDay02]);

    const handleInputChangeHighVbLastDay02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVbLastDay02(newValue);
    };

    const handleInputChangeLowVbLastDay02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVbLastDay02(newValue2);
    };
    const ChangeMaintainVbLastDay02 = async () => {
        try {
            const newValue = !maintainVbLastDay02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vb_of_Last_Day_Maintain: newValue }
            );
            setMaintainVbLastDay02(newValue);
            
            
        } catch (error) {}
    };
// ========================== Vb LAST DAY 02 ============================================

//=============================================================================================


// ========================== VM to DAY 01 ============================================
const [VmToDay01, setVmToDay01] = useState<string | null>(null);
const [AudioVmToDay01, setAudioVmToDay01] = useState(false);
const [inputHighVmToDay01, setInputHighVmToDay01] = useState<any>();
const [inputLowVmToDay01, setInputLowVmToDay01] = useState<any>();
const [HighVmToDay01, setHighVmToDay01] = useState<number | null>(null);
const [LowVmToDay01, setLowVmToDay01] = useState<number | null>(null);
const [AlarmVmToDay01, setAlarmVmToDay01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVmToDay01, setMaintainVmToDay01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVmToDay01 === 'string' && typeof LowVmToDay01 === 'string' && VmToDay01 !== null && maintainVmToDay01 === false) {
            const highValue = parseFloat(HighVmToDay01);
            const lowValue = parseFloat(LowVmToDay01);
            const VmToDay01Value = parseFloat(VmToDay01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VmToDay01Value)) {
                if (highValue < VmToDay01Value || VmToDay01Value < lowValue) {
                    if (!AudioVmToDay01) {
                        audioRef.current?.play();
                        setAudioVmToDay01(true);
                        setAlarmVmToDay01(true);
                    }
                } else {
                    setAudioVmToDay01(false);
                    setAlarmVmToDay01(false);
                }
            } 
        } 
    }, [HighVmToDay01, VmToDay01, AudioVmToDay01, LowVmToDay01,maintainVmToDay01]);

    useEffect(() => {
        if (AudioVmToDay01) {
            const audioEnded = () => {
                setAudioVmToDay01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVmToDay01]);

    const handleInputChangeHighVmToDay01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVmToDay01(newValue);
    };

    const handleInputChangeLowVmToDay01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVmToDay01(newValue2);
    };
    const ChangeMaintainVmToDay01 = async () => {
        try {
            const newValue = !maintainVmToDay01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vm_of_Current_Day_Maintain: newValue }
            );
            setMaintainVmToDay01(newValue);
            
            
        } catch (error) {}
    };
// ==========================VM LAST DAY 01 ============================================

// ==========================VM LAST DAY 01  ============================================
const [VmToDay02, setVmToDay02] = useState<string | null>(null);
const [AudioVmToDay02, setAudioVmToDay02] = useState(false);
const [inputHighVmToDay02, setInputHighVmToDay02] = useState<any>();
const [inputLowVmToDay02, setInputLowVmToDay02] = useState<any>();
const [HighVmToDay02, setHighVmToDay02] = useState<number | null>(null);
const [LowVmToDay02, setLowVmToDay02] = useState<number | null>(null);
const [AlarmVmToDay02, setAlarmVmToDay02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVmToDay02, setMaintainVmToDay02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVmToDay02 === 'string' && typeof LowVmToDay02 === 'string' && VmToDay02 !== null && maintainVmToDay02 === false) {
            const highValue = parseFloat(HighVmToDay02);
            const lowValue = parseFloat(LowVmToDay02);
            const VmToDay02Value = parseFloat(VmToDay02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VmToDay02Value)) {
                if (highValue < VmToDay02Value || VmToDay02Value < lowValue) {
                    if (!AudioVmToDay02) {
                        audioRef.current?.play();
                        setAudioVmToDay02(true);
                        setAlarmVmToDay02(true);
                    }
                } else {
                    setAudioVmToDay02(false);
                    setAlarmVmToDay02(false);
                }
            } 
        } 
    }, [HighVmToDay02, VmToDay02, AudioVmToDay02, LowVmToDay02,maintainVmToDay02]);

    useEffect(() => {
        if (AudioVmToDay02) {
            const audioEnded = () => {
                setAudioVmToDay02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVmToDay02]);

    const handleInputChangeHighVmToDay02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVmToDay02(newValue);
    };

    const handleInputChangeLowVmToDay02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVmToDay02(newValue2);
    };
    const ChangeMaintainVmToDay02 = async () => {
        try {
            const newValue = !maintainVmToDay02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vm_of_Current_Day_Maintain: newValue }
            );
            setMaintainVmToDay02(newValue);
            
            
        } catch (error) {}
    };
// ========================== VM LAST DAY 01 ============================================



// ========================== Vb LAST DAY 01 ============================================
const [VbToDay01, setVbToDay01] = useState<string | null>(null);
const [AudioVbToDay01, setAudioVbToDay01] = useState(false);
const [inputHighVbToDay01, setInputHighVbToDay01] = useState<any>();
const [inputLowVbToDay01, setInputLowVbToDay01] = useState<any>();
const [HighVbToDay01, setHighVbToDay01] = useState<number | null>(null);
const [LowVbToDay01, setLowVbToDay01] = useState<number | null>(null);
const [AlarmVbToDay01, setAlarmVbToDay01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVbToDay01, setMaintainVbToDay01] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVbToDay01 === 'string' && typeof LowVbToDay01 === 'string' && VbToDay01 !== null && maintainVbToDay01 === false) {
            const highValue = parseFloat(HighVbToDay01);
            const lowValue = parseFloat(LowVbToDay01);
            const VbToDay01Value = parseFloat(VbToDay01);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VbToDay01Value)) {
                if (highValue < VbToDay01Value || VbToDay01Value < lowValue) {
                    if (!AudioVbToDay01) {
                        audioRef.current?.play();
                        setAudioVbToDay01(true);
                        setAlarmVbToDay01(true);
                    }
                } else {
                    setAudioVbToDay01(false);
                    setAlarmVbToDay01(false);
                }
            } 
        } 
    }, [HighVbToDay01, VbToDay01, AudioVbToDay01, LowVbToDay01,maintainVbToDay01]);

    useEffect(() => {
        if (AudioVbToDay01) {
            const audioEnded = () => {
                setAudioVbToDay01(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVbToDay01]);

    const handleInputChangeHighVbToDay01 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVbToDay01(newValue);
    };

    const handleInputChangeLowVbToDay01 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVbToDay01(newValue2);
    };
    const ChangeMaintainVbToDay01 = async () => {
        try {
            const newValue = !maintainVbToDay01;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Vb_of_Current_Day_Maintain: newValue }
            );
            setMaintainVbToDay01(newValue);
            
            
        } catch (error) {}
    };
// ==========================Vb LAST DAY 01 ============================================

// ==========================Vb LAST DAY 02  ============================================
const [VbToDay02, setVbToDay02] = useState<string | null>(null);
const [AudioVbToDay02, setAudioVbToDay02] = useState(false);
const [inputHighVbToDay02, setInputHighVbToDay02] = useState<any>();
const [inputLowVbToDay02, setInputLowVbToDay02] = useState<any>();
const [HighVbToDay02, setHighVbToDay02] = useState<number | null>(null);
const [LowVbToDay02, setLowVbToDay02] = useState<number | null>(null);
const [AlarmVbToDay02, setAlarmVbToDay02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVbToDay02, setMaintainVbToDay02] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighVbToDay02 === 'string' && typeof LowVbToDay02 === 'string' && VbToDay02 !== null && maintainVbToDay02 === false) {
            const highValue = parseFloat(HighVbToDay02);
            const lowValue = parseFloat(LowVbToDay02);
            const VbToDay02Value = parseFloat(VbToDay02);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VbToDay02Value)) {
                if (highValue < VbToDay02Value || VbToDay02Value < lowValue) {
                    if (!AudioVbToDay02) {
                        audioRef.current?.play();
                        setAudioVbToDay02(true);
                        setAlarmVbToDay02(true);
                    }
                } else {
                    setAudioVbToDay02(false);
                    setAlarmVbToDay02(false);
                }
            } 
        } 
    }, [HighVbToDay02, VbToDay02, AudioVbToDay02, LowVbToDay02,maintainVbToDay02]);

    useEffect(() => {
        if (AudioVbToDay02) {
            const audioEnded = () => {
                setAudioVbToDay02(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioVbToDay02]);

    const handleInputChangeHighVbToDay02 = (event: any) => {
        const newValue = event.target.value;
        setInputHighVbToDay02(newValue);
    };

    const handleInputChangeLowVbToDay02 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowVbToDay02(newValue2);
    };
    const ChangeMaintainVbToDay02 = async () => {
        try {
            const newValue = !maintainVbToDay02;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_02_Vb_of_Current_Day_Maintain: newValue }
            );
            setMaintainVbToDay02(newValue);
            
            
        } catch (error) {}
    };
// ========================== Vb LAST DAY 02 ============================================
//===========================================================================================

const [UpsBattery,setUpsBattery] = useState<string | null>(null);
const [AudioUpsBattery, setAudioUpsBattery] = useState(false);
const [inputHighUpsBattery, setInputHighUpsBattery] = useState<any>();
const [inputLowUpsBattery, setInputLowUpsBattery] = useState<any>();
const [HighUpsBattery, setHighUpsBattery] = useState<number | null>(null);
const [LowUpsBattery, setLowUpsBattery] = useState<number | null>(null);
const [AlarmUpsBattery, setAlarmUpsBattery] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainUpsBattery, setMaintainUpsBattery] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighUpsBattery === 'string' && typeof LowUpsBattery === 'string' && UpsBattery !== null && maintainUpsBattery === false) {
            const highValue = parseFloat(HighUpsBattery);
            const lowValue = parseFloat(LowUpsBattery);
            const UpsBatteryValue = parseFloat(UpsBattery);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UpsBatteryValue)) {
                if (highValue < UpsBatteryValue || UpsBatteryValue < lowValue) {
                    if (!AudioUpsBattery) {
                        audioRef.current?.play();
                        setAudioUpsBattery(true);
                        setAlarmUpsBattery(true);
                    }
                } else {
                    setAudioUpsBattery(false);
                    setAlarmUpsBattery(false);
                }
            } 
        } 
    }, [HighUpsBattery, UpsBattery, AudioUpsBattery, LowUpsBattery,maintainUpsBattery]);

    useEffect(() => {
        if (AudioUpsBattery) {
            const audioEnded = () => {
                setAudioUpsBattery(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioUpsBattery]);

    const handleInputChangeHighUpsBattery = (event: any) => {
        const newValue = event.target.value;
        setInputHighUpsBattery(newValue);
    };

    const handleInputChangeLowUpsBattery = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowUpsBattery(newValue2);
    };
    const ChangeMaintainUpsBattery = async () => {
        try {
            const newValue = !maintainUpsBattery;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_BATTERY_Maintain: newValue }
            );
            setMaintainUpsBattery(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [UpsCharging,setUpsCharging] = useState<string | null>(null);

const [AudioUpsCharging, setAudioUpsCharging] = useState(false);
const [inputHighUpsCharging, setInputHighUpsCharging] = useState<any>();
const [inputLowUpsCharging, setInputLowUpsCharging] = useState<any>();
const [HighUpsCharging, setHighUpsCharging] = useState<number | null>(null);
const [LowUpsCharging, setLowUpsCharging] = useState<number | null>(null);
const [AlarmUpsCharging, setAlarmUpsCharging] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainUpsCharging, setMaintainUpsCharging] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighUpsCharging === 'string' && typeof LowUpsCharging === 'string' && UpsCharging !== null && maintainUpsCharging === false) {
            const highValue = parseFloat(HighUpsCharging);
            const lowValue = parseFloat(LowUpsCharging);
            const UpsChargingValue = parseFloat(UpsCharging);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UpsChargingValue)) {
                if (highValue < UpsChargingValue || UpsChargingValue < lowValue) {
                    if (!AudioUpsCharging) {
                        audioRef.current?.play();
                        setAudioUpsCharging(true);
                        setAlarmUpsCharging(true);
                    }
                } else {
                    setAudioUpsCharging(false);
                    setAlarmUpsCharging(false);
                }
            } 
        } 
    }, [HighUpsCharging, UpsCharging, AudioUpsCharging, LowUpsCharging,maintainUpsCharging]);

    useEffect(() => {
        if (AudioUpsCharging) {
            const audioEnded = () => {
                setAudioUpsCharging(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioUpsCharging]);

    const handleInputChangeHighUpsCharging = (event: any) => {
        const newValue = event.target.value;
        setInputHighUpsCharging(newValue);
    };

    const handleInputChangeLowUpsCharging = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowUpsCharging(newValue2);
    };
    const ChangeMaintainUpsCharging = async () => {
        try {
            const newValue = !maintainUpsCharging;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_CHARGING_Maintain: newValue }
            );
            setMaintainUpsCharging(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [UpsAlarm,setUpsAlarm] = useState<string | null>(null);
const [AudioUpsAlarm, setAudioUpsAlarm] = useState(false);
const [inputHighUpsAlarm, setInputHighUpsAlarm] = useState<any>();
const [inputLowUpsAlarm, setInputLowUpsAlarm] = useState<any>();
const [HighUpsAlarm, setHighUpsAlarm] = useState<number | null>(null);
const [LowUpsAlarm, setLowUpsAlarm] = useState<number | null>(null);
const [AlarmUpsAlarm, setAlarmUpsAlarm] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainUpsAlarm, setMaintainUpsAlarm] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighUpsAlarm === 'string' && typeof LowUpsAlarm === 'string' && UpsAlarm !== null && maintainUpsAlarm === false) {
            const highValue = parseFloat(HighUpsAlarm);
            const lowValue = parseFloat(LowUpsAlarm);
            const UpsAlarmValue = parseFloat(UpsAlarm);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UpsAlarmValue)) {
                if (highValue < UpsAlarmValue || UpsAlarmValue < lowValue) {
                    if (!AudioUpsAlarm) {
                        audioRef.current?.play();
                        setAudioUpsAlarm(true);
                        setAlarmUpsAlarm(true);
                    }
                } else {
                    setAudioUpsAlarm(false);
                    setAlarmUpsAlarm(false);
                }
            } 
        } 
    }, [HighUpsAlarm, UpsAlarm, AudioUpsAlarm, LowUpsAlarm,maintainUpsAlarm]);

    useEffect(() => {
        if (AudioUpsAlarm) {
            const audioEnded = () => {
                setAudioUpsAlarm(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioUpsAlarm]);

    const handleInputChangeHighUpsAlarm = (event: any) => {
        const newValue = event.target.value;
        setInputHighUpsAlarm(newValue);
    };

    const handleInputChangeLowUpsAlarm = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowUpsAlarm(newValue2);
    };
    const ChangeMaintainUpsAlarm = async () => {
        try {
            const newValue = !maintainUpsAlarm;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_UPS_ALARM_Maintain: newValue }
            );
            setMaintainUpsAlarm(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [UpsMode,setUpsMode] = useState<string | null>(null);
const [AudioUpsMode, setAudioUpsMode] = useState(false);
const [inputHighUpsMode, setInputHighUpsMode] = useState<any>();
const [inputLowUpsMode, setInputLowUpsMode] = useState<any>();
const [HighUpsMode, setHighUpsMode] = useState<number | null>(null);
const [LowUpsMode, setLowUpsMode] = useState<number | null>(null);
const [AlarmUpsMode, setAlarmUpsMode] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainUpsMode, setMaintainUpsMode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighUpsMode === 'string' && typeof LowUpsMode === 'string' && UpsMode !== null && maintainUpsMode === false) {
            const highValue = parseFloat(HighUpsMode);
            const lowValue = parseFloat(LowUpsMode);
            const UpsModeValue = parseFloat(UpsMode);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(UpsModeValue)) {
                if (highValue < UpsModeValue || UpsModeValue < lowValue) {
                    if (!AudioUpsMode) {
                        audioRef.current?.play();
                        setAudioUpsMode(true);
                        setAlarmUpsMode(true);
                    }
                } else {
                    setAudioUpsMode(false);
                    setAlarmUpsMode(false);
                }
            } 
        } 
    }, [HighUpsMode, UpsMode, AudioUpsMode, LowUpsMode,maintainUpsMode]);

    useEffect(() => {
        if (AudioUpsMode) {
            const audioEnded = () => {
                setAudioUpsMode(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioUpsMode]);

    const handleInputChangeHighUpsMode = (event: any) => {
        const newValue = event.target.value;
        setInputHighUpsMode(newValue);
    };

    const handleInputChangeLowUpsMode = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowUpsMode(newValue2);
    };
    const ChangeMaintainUpsMode = async () => {
        try {
            const newValue = !maintainUpsMode;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { UPS_Mode_Maintain: newValue }
            );
            setMaintainUpsMode(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================


//===========================================================================================

const [SelectSW,setSelectSW] = useState<string | null>(null);
const [AudioSelectSW, setAudioSelectSW] = useState(false);
const [inputHighSelectSW, setInputHighSelectSW] = useState<any>();
const [inputLowSelectSW, setInputLowSelectSW] = useState<any>();
const [HighSelectSW, setHighSelectSW] = useState<number | null>(null);
const [LowSelectSW, setLowSelectSW] = useState<number | null>(null);
const [AlarmSelectSW, setAlarmSelectSW] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainSelectSW, setMaintainSelectSW] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighSelectSW === 'string' && typeof LowSelectSW === 'string' && SelectSW !== null && maintainSelectSW === false) {
            const highValue = parseFloat(HighSelectSW);
            const lowValue = parseFloat(LowSelectSW);
            const SelectSWValue = parseFloat(SelectSW);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SelectSWValue)) {
                if (highValue < SelectSWValue || SelectSWValue < lowValue) {
                    if (!AudioSelectSW) {
                        audioRef.current?.play();
                        setAudioSelectSW(true);
                        setAlarmSelectSW(true);
                    }
                } else {
                    setAudioSelectSW(false);
                    setAlarmSelectSW(false);
                }
            } 
        } 
    }, [HighSelectSW, SelectSW, AudioSelectSW, LowSelectSW,maintainSelectSW]);

    useEffect(() => {
        if (AudioSelectSW) {
            const audioEnded = () => {
                setAudioSelectSW(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioSelectSW]);

    const handleInputChangeHighSelectSW = (event: any) => {
        const newValue = event.target.value;
        setInputHighSelectSW(newValue);
    };

    const handleInputChangeLowSelectSW = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowSelectSW(newValue2);
    };
    const ChangeMaintainSelectSW = async () => {
        try {
            const newValue = !maintainSelectSW;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_SELECT_SW_Maintain: newValue }
            );
            setMaintainSelectSW(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [EmergencyNC,setEmergencyNC] =useState<string | null>(null);

const [AudioEmergencyNC, setAudioEmergencyNC] = useState(false);
const [inputHighEmergencyNC, setInputHighEmergencyNC] = useState<any>();
const [inputLowEmergencyNC, setInputLowEmergencyNC] = useState<any>();
const [HighEmergencyNC, setHighEmergencyNC] = useState<number | null>(null);
const [LowEmergencyNC, setLowEmergencyNC] = useState<number | null>(null);
const [AlarmEmergencyNC, setAlarmEmergencyNC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEmergencyNC, setMaintainEmergencyNC] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEmergencyNC === 'string' && typeof LowEmergencyNC === 'string' && EmergencyNC !== null && maintainEmergencyNC === false) {
            const highValue = parseFloat(HighEmergencyNC);
            const lowValue = parseFloat(LowEmergencyNC);
            const EmergencyNCValue = parseFloat(EmergencyNC);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EmergencyNCValue)) {
                if (highValue < EmergencyNCValue || EmergencyNCValue < lowValue) {
                    if (!AudioEmergencyNC) {
                        audioRef.current?.play();
                        setAudioEmergencyNC(true);
                        setAlarmEmergencyNC(true);
                    }
                } else {
                    setAudioEmergencyNC(false);
                    setAlarmEmergencyNC(false);
                }
            } 
        } 
    }, [HighEmergencyNC, EmergencyNC, AudioEmergencyNC, LowEmergencyNC,maintainEmergencyNC]);

    useEffect(() => {
        if (AudioEmergencyNC) {
            const audioEnded = () => {
                setAudioEmergencyNC(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEmergencyNC]);

    const handleInputChangeHighEmergencyNC = (event: any) => {
        const newValue = event.target.value;
        setInputHighEmergencyNC(newValue);
    };

    const handleInputChangeLowEmergencyNC = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEmergencyNC(newValue2);
    };
    const ChangeMaintainEmergencyNC = async () => {
        try {
            const newValue = !maintainEmergencyNC;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { Emergency_NC_Maintain: newValue }
            );
            setMaintainEmergencyNC(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [EmergencyNO,setEmergencyNO] =useState<string | null>(null);


const [AudioEmergencyNO, setAudioEmergencyNO] = useState(false);
const [inputHighEmergencyNO, setInputHighEmergencyNO] = useState<any>();
const [inputLowEmergencyNO, setInputLowEmergencyNO] = useState<any>();
const [HighEmergencyNO, setHighEmergencyNO] = useState<number | null>(null);
const [LowEmergencyNO, setLowEmergencyNO] = useState<number | null>(null);
const [AlarmEmergencyNO, setAlarmEmergencyNO] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainEmergencyNO, setMaintainEmergencyNO] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighEmergencyNO === 'string' && typeof LowEmergencyNO === 'string' && EmergencyNO !== null && maintainEmergencyNO === false) {
            const highValue = parseFloat(HighEmergencyNO);
            const lowValue = parseFloat(LowEmergencyNO);
            const EmergencyNOValue = parseFloat(EmergencyNO);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EmergencyNOValue)) {
                if (highValue < EmergencyNOValue || EmergencyNOValue < lowValue) {
                    if (!AudioEmergencyNO) {
                        audioRef.current?.play();
                        setAudioEmergencyNO(true);
                        setAlarmEmergencyNO(true);
                    }
                } else {
                    setAudioEmergencyNO(false);
                    setAlarmEmergencyNO(false);
                }
            } 
        } 
    }, [HighEmergencyNO, EmergencyNO, AudioEmergencyNO, LowEmergencyNO,maintainEmergencyNO]);

    useEffect(() => {
        if (AudioEmergencyNO) {
            const audioEnded = () => {
                setAudioEmergencyNO(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioEmergencyNO]);

    const handleInputChangeHighEmergencyNO = (event: any) => {
        const newValue = event.target.value;
        setInputHighEmergencyNO(newValue);
    };

    const handleInputChangeLowEmergencyNO = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowEmergencyNO(newValue2);
    };
    const ChangeMaintainEmergencyNO = async () => {
        try {
            const newValue = !maintainEmergencyNO;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { Emergency_NO_Maintain: newValue }
            );
            setMaintainEmergencyNO(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [DIReset,setDIReset] =useState<string | null>(null);

const [AudioDIReset, setAudioDIReset] = useState(false);
const [inputHighDIReset, setInputHighDIReset] = useState<any>();
const [inputLowDIReset, setInputLowDIReset] = useState<any>();
const [HighDIReset, setHighDIReset] = useState<number | null>(null);
const [LowDIReset, setLowDIReset] = useState<number | null>(null);
const [AlarmDIReset, setAlarmDIReset] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDIReset, setMaintainDIReset] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDIReset === 'string' && typeof LowDIReset === 'string' && DIReset !== null && maintainDIReset === false) {
            const highValue = parseFloat(HighDIReset);
            const lowValue = parseFloat(LowDIReset);
            const DIResetValue = parseFloat(DIReset);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DIResetValue)) {
                if (highValue < DIResetValue || DIResetValue < lowValue) {
                    if (!AudioDIReset) {
                        audioRef.current?.play();
                        setAudioDIReset(true);
                        setAlarmDIReset(true);
                    }
                } else {
                    setAudioDIReset(false);
                    setAlarmDIReset(false);
                }
            } 
        } 
    }, [HighDIReset, DIReset, AudioDIReset, LowDIReset,maintainDIReset]);

    useEffect(() => {
        if (AudioDIReset) {
            const audioEnded = () => {
                setAudioDIReset(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDIReset]);

    const handleInputChangeHighDIReset = (event: any) => {
        const newValue = event.target.value;
        setInputHighDIReset(newValue);
    };

    const handleInputChangeLowDIReset = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDIReset(newValue2);
    };
    const ChangeMaintainDIReset = async () => {
        try {
            const newValue = !maintainDIReset;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_RESET_Maintain: newValue }
            );
            setMaintainDIReset(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [DOHorn,setDOHorn] =useState<string | null>(null);


const [AudioDOHorn, setAudioDOHorn] = useState(false);
const [inputHighDOHorn, setInputHighDOHorn] = useState<any>();
const [inputLowDOHorn, setInputLowDOHorn] = useState<any>();
const [HighDOHorn, setHighDOHorn] = useState<number | null>(null);
const [LowDOHorn, setLowDOHorn] = useState<number | null>(null);
const [AlarmDOHorn, setAlarmDOHorn] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainDOHorn, setMaintainDOHorn] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighDOHorn === 'string' && typeof LowDOHorn === 'string' && DOHorn !== null && maintainDOHorn === false) {
            const highValue = parseFloat(HighDOHorn);
            const lowValue = parseFloat(LowDOHorn);
            const DOHornValue = parseFloat(DOHorn);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DOHornValue)) {
                if (highValue < DOHornValue || DOHornValue < lowValue) {
                    if (!AudioDOHorn) {
                        audioRef.current?.play();
                        setAudioDOHorn(true);
                        setAlarmDOHorn(true);
                    }
                } else {
                    setAudioDOHorn(false);
                    setAlarmDOHorn(false);
                }
            } 
        } 
    }, [HighDOHorn, DOHorn, AudioDOHorn, LowDOHorn,maintainDOHorn]);

    useEffect(() => {
        if (AudioDOHorn) {
            const audioEnded = () => {
                setAudioDOHorn(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioDOHorn]);

    const handleInputChangeHighDOHorn = (event: any) => {
        const newValue = event.target.value;
        setInputHighDOHorn(newValue);
    };

    const handleInputChangeLowDOHorn = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowDOHorn(newValue2);
    };
    const ChangeMaintainDOHorn = async () => {
        try {
            const newValue = !maintainDOHorn;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DO_HR_01_Maintain: newValue }
            );
            setMaintainDOHorn(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================




//===========================================================================================

const [Map,setMap] =useState<string | null>(null);

const [AudioMap, setAudioMap] = useState(false);
const [inputHighMap, setInputHighMap] = useState<any>();
const [inputLowMap, setInputLowMap] = useState<any>();
const [HighMap, setHighMap] = useState<number | null>(null);
const [LowMap, setLowMap] = useState<number | null>(null);
const [AlarmMap, setAlarmMap] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainMap, setMaintainMap] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighMap === 'string' && typeof LowMap === 'string' && Map !== null && maintainMap === false) {
            const highValue = parseFloat(HighMap);
            const lowValue = parseFloat(LowMap);
            const MapValue = parseFloat(Map);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(MapValue)) {
                if (highValue < MapValue || MapValue < lowValue) {
                    if (!AudioMap) {
                        audioRef.current?.play();
                        setAudioMap(true);
                        setAlarmMap(true);
                    }
                } else {
                    setAudioMap(false);
                    setAlarmMap(false);
                }
            } 
        } 
    }, [HighMap, Map, AudioMap, LowMap,maintainMap]);

    useEffect(() => {
        if (AudioMap) {
            const audioEnded = () => {
                setAudioMap(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioMap]);

    const handleInputChangeHighMap = (event: any) => {
        const newValue = event.target.value;
        setInputHighMap(newValue);
    };

    const handleInputChangeLowMap = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowMap(newValue2);
    };
    const ChangeMaintainMap = async () => {
        try {
            const newValue = !maintainMap;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_MAP_1_Maintain: newValue }
            );
            setMaintainMap(newValue);
            
            
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
                if (highValue < DO_SV1Value || DO_SV1Value < lowValue) {
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

const [ZSC_1,setZSC_1] =useState<string | null>(null);

const [AudioZSC_1, setAudioZSC_1] = useState(false);
const [inputHighZSC_1, setInputHighZSC_1] = useState<any>();
const [inputLowZSC_1, setInputLowZSC_1] = useState<any>();
const [HighZSC_1, setHighZSC_1] = useState<number | null>(null);
const [LowZSC_1, setLowZSC_1] = useState<number | null>(null);
const [AlarmZSC_1, setAlarmZSC_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainZSC_1, setMaintainZSC_1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighZSC_1 === 'string' && typeof LowZSC_1 === 'string' && ZSC_1 !== null && maintainZSC_1 === false) {
            const highValue = parseFloat(HighZSC_1);
            const lowValue = parseFloat(LowZSC_1);
            const ZSC_1Value = parseFloat(ZSC_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ZSC_1Value)) {
                if (highValue < ZSC_1Value || ZSC_1Value < lowValue) {
                    if (!AudioZSC_1) {
                        audioRef.current?.play();
                        setAudioZSC_1(true);
                        setAlarmZSC_1(true);
                    }
                } else {
                    setAudioZSC_1(false);
                    setAlarmZSC_1(false);
                }
            } 
        } 
    }, [HighZSC_1, ZSC_1, AudioZSC_1, LowZSC_1,maintainZSC_1]);

    useEffect(() => {
        if (AudioZSC_1) {
            const audioEnded = () => {
                setAudioZSC_1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioZSC_1]);

    const handleInputChangeHighZSC_1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighZSC_1(newValue);
    };

    const handleInputChangeLowZSC_1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowZSC_1(newValue2);
    };
    const ChangeMaintainZSC_1 = async () => {
        try {
            const newValue = !maintainZSC_1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_ZSC_1_Maintain: newValue }
            );
            setMaintainZSC_1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================
//===========================================================================================

const [ZSO_1,setZSO_1] =useState<string | null>(null);

const [AudioZSO_1, setAudioZSO_1] = useState(false);
const [inputHighZSO_1, setInputHighZSO_1] = useState<any>();
const [inputLowZSO_1, setInputLowZSO_1] = useState<any>();
const [HighZSO_1, setHighZSO_1] = useState<number | null>(null);
const [LowZSO_1, setLowZSO_1] = useState<number | null>(null);
const [AlarmZSO_1, setAlarmZSO_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainZSO_1, setMaintainZSO_1] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighZSO_1 === 'string' && typeof LowZSO_1 === 'string' && ZSO_1 !== null && maintainZSO_1 === false) {
            const highValue = parseFloat(HighZSO_1);
            const lowValue = parseFloat(LowZSO_1);
            const ZSO_1Value = parseFloat(ZSO_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ZSO_1Value)) {
                if (highValue < ZSO_1Value || ZSO_1Value < lowValue) {
                    if (!AudioZSO_1) {
                        audioRef.current?.play();
                        setAudioZSO_1(true);
                        setAlarmZSO_1(true);
                    }
                } else {
                    setAudioZSO_1(false);
                    setAlarmZSO_1(false);
                }
            } 
        } 
    }, [HighZSO_1, ZSO_1, AudioZSO_1, LowZSO_1,maintainZSO_1]);

    useEffect(() => {
        if (AudioZSO_1) {
            const audioEnded = () => {
                setAudioZSO_1(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioZSO_1]);

    const handleInputChangeHighZSO_1 = (event: any) => {
        const newValue = event.target.value;
        setInputHighZSO_1(newValue);
    };

    const handleInputChangeLowZSO_1 = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowZSO_1(newValue2);
    };
    const ChangeMaintainZSO_1 = async () => {
        try {
            const newValue = !maintainZSO_1;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DI_ZSO_1_Maintain: newValue }
            );
            setMaintainZSO_1(newValue);
            
            
        } catch (error) {}
    };


//===========================================================================================

//===========================================================================================

const [Beacon,setBeacon] =useState<string | null>(null);
const [AudioBeacon, setAudioBeacon] = useState(false);
const [inputHighBeacon, setInputHighBeacon] = useState<any>();
const [inputLowBeacon, setInputLowBeacon] = useState<any>();
const [HighBeacon, setHighBeacon] = useState<number | null>(null);
const [LowBeacon, setLowBeacon] = useState<number | null>(null);
const [AlarmBeacon, setAlarmBeacon] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainBeacon, setMaintainBeacon] = useState<boolean>(false);

    useEffect(() => {
        if (typeof HighBeacon === 'string' && typeof LowBeacon === 'string' && Beacon !== null && maintainBeacon === false) {
            const highValue = parseFloat(HighBeacon);
            const lowValue = parseFloat(LowBeacon);
            const BeaconValue = parseFloat(Beacon);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(BeaconValue)) {
                if (highValue < BeaconValue || BeaconValue < lowValue) {
                    if (!AudioBeacon) {
                        audioRef.current?.play();
                        setAudioBeacon(true);
                        setAlarmBeacon(true);
                    }
                } else {
                    setAudioBeacon(false);
                    setAlarmBeacon(false);
                }
            } 
        } 
    }, [HighBeacon, Beacon, AudioBeacon, LowBeacon,maintainBeacon]);

    useEffect(() => {
        if (AudioBeacon) {
            const audioEnded = () => {
                setAudioBeacon(false);
            };
            audioRef.current?.addEventListener('ended', audioEnded);
            return () => {
                audioRef.current?.removeEventListener('ended', audioEnded);
            };
        }
    }, [AudioBeacon]);

    const handleInputChangeHighBeacon = (event: any) => {
        const newValue = event.target.value;
        setInputHighBeacon(newValue);
    };

    const handleInputChangeLowBeacon = (event: any) => {
        const newValue2 = event.target.value;
        setInputLowBeacon(newValue2);
    };
    const ChangeMaintainBeacon = async () => {
        try {
            const newValue = !maintainBeacon;
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { DO_BC_01_Maintain: newValue }
            );
            setMaintainBeacon(newValue);
            
            
        } catch (error) {}
    };

//===========================================================================================


    useEffect(() => {

        setInputValue(highEK1PressureValue); 
        setInputValue2(lowEK1PressureValue); 

        setInputValueEK2High(highEK2PressureValue); 
        setInputValueEK2Low(lowEK2PressureValue); 

        setInputValueEK3High(highEK3PressureValue); 
        setInputValueEK3Low(lowEK3PressureValue);    
        
        setInputHighGD01(HighGD01)
        setInputLowGD01(LowGD01)

        setInputHighGD02(HighGD02)
        setInputLowGD02(LowGD02)

        setInputHighGD03(HighGD03)
        setInputLowGD03(LowGD03)

        setInputHighGVF1(HighGVF1)
        setInputLowGVF1(LowGVF1)

        setInputHighSVF1(HighSVF1)
        setInputLowSVF1(LowSVF1)

        setInputHighSVA1(HighSVA1)
        setInputLowSVA1(LowSVA1)

        setInputHighGVA1(HighGVA1)
        setInputLowGVA1(LowGVA1)

        setInputHighGVF2(HighGVF2)
        setInputLowGVF2(LowGVF2)

        setInputHighSVF2(HighSVF2)
        setInputLowSVF2(LowSVF2)

        setInputHighSVA2(HighSVA2)
        setInputLowSVA2(LowSVA2)

        setInputHighGVA2(HighGVA2)
        setInputLowGVA2(LowGVA2)

        setInputHighTemperature01(HighTemperature01)
        setInputLowTemperature01(LowTemperature01)

        setInputHighTemperature02(HighTemperature02)
        setInputLowTemperature02(LowTemperature02)

        setInputHighReBattery01(HighReBattery01)
        setInputLowReBattery01(LowReBattery01)

        setInputHighReBattery02(HighReBattery02)
        setInputLowReBattery02(LowReBattery02)

        setInputHighVmLastDay01(HighVmLastDay01)
        setInputLowVmLastDay01(LowVmLastDay01)

        setInputHighVmLastDay02(HighVmLastDay02)
        setInputLowVmLastDay02(LowVmLastDay02)

        setInputHighVbLastDay01(HighVbLastDay01)
        setInputLowVbLastDay01(LowVbLastDay01)

        setInputHighVbLastDay02(HighVbLastDay02)
        setInputLowVbLastDay02(LowVbLastDay02)

        setInputHighVmToDay01(HighVmToDay01)
        setInputLowVmToDay01(LowVmToDay01)

        setInputHighVmToDay02(HighVmToDay02)
        setInputLowVmToDay02(LowVmToDay02)

        setInputHighVbToDay01(HighVbToDay01)
        setInputLowVbToDay01(LowVbToDay01)

        setInputHighVbToDay02(HighVbToDay02)
        setInputLowVbToDay02(LowVbToDay02)

        setInputHighUpsBattery(HighUpsBattery)
        setInputLowUpsBattery(LowUpsBattery)

        setInputHighUpsCharging(HighUpsCharging)
        setInputLowUpsCharging(LowUpsCharging)

        setInputHighUpsAlarm(HighUpsAlarm)
        setInputLowUpsAlarm(LowUpsAlarm)

        setInputHighUpsMode(HighUpsMode)
        setInputLowUpsMode(LowUpsMode)

        setInputHighSelectSW(HighSelectSW)
        setInputLowSelectSW(LowSelectSW)

        setInputHighEmergencyNC(HighEmergencyNC)
        setInputLowEmergencyNC(LowEmergencyNC)

        setInputHighEmergencyNO(HighEmergencyNO)
        setInputLowEmergencyNO(LowEmergencyNO)

        setInputHighDIReset(HighDIReset)
        setInputLowDIReset(LowDIReset)

        setInputHighDOHorn(HighDOHorn)
        setInputLowDOHorn(LowDOHorn)

        setInputHighMap(HighMap)
        setInputLowMap(LowMap)

        setInputHighZSC_1(HighZSC_1)
        setInputLowZSC_1(LowZSC_1)

        setInputHighZSO_1(HighZSO_1)
        setInputLowZSO_1(LowZSO_1)

        setInputHighDO_SV1(HighDO_SV1)
        setInputLowDO_SV1(LowDO_SV1)


        setInputHighBeacon(HighBeacon)
        setInputLowBeacon(LowBeacon)

    }, [highEK1PressureValue, lowEK1PressureValue,
         highEK2PressureValue, lowEK2PressureValue ,
         highEK3PressureValue, lowEK3PressureValue, 
         HighGD01, LowGD01,
         HighGD02, LowGD02,
         HighGD03, LowGD03 ,

         HighGVF1, LowGVF1 ,
         HighSVF1, LowSVF1 ,
         HighSVA1, LowSVA1 ,
         HighGVA1, LowGVA1 ,

         HighGVF2, LowGVF2 ,
         HighSVF2, LowSVF2 ,
         HighSVA2, LowSVA2 ,
         HighGVA2, LowGVA2 ,

         HighTemperature01, LowTemperature01 ,
         HighTemperature02, LowTemperature02 ,

         HighReBattery01, LowReBattery01 ,
         HighReBattery02, LowReBattery02 ,

         HighVmLastDay01, LowVmLastDay01 ,
         HighVmLastDay02, LowVmLastDay02 ,
         HighVbLastDay01, LowVbLastDay01 ,
         HighVbLastDay02, LowVbLastDay02 ,

         HighVmToDay01, LowVmToDay01 ,
         HighVmToDay02, LowVmToDay02 ,
         HighVbToDay01, LowVbToDay01 ,
         HighVbToDay02, LowVbToDay02 ,

         HighUpsBattery, LowUpsBattery ,
         HighUpsCharging, LowUpsCharging ,
         HighUpsAlarm, LowUpsAlarm ,
         HighUpsMode, LowUpsMode ,

         HighSelectSW, LowSelectSW ,

         HighEmergencyNO, LowEmergencyNO ,
         HighEmergencyNC, LowEmergencyNC ,

         HighDIReset, LowDIReset ,

         HighDOHorn, LowDOHorn ,
         HighMap, LowMap ,
         
         HighZSC_1, LowZSC_1 ,
         HighZSO_1, LowZSO_1 ,
         HighDO_SV1, LowDO_SV1 ,
         HighBeacon, LowBeacon ,
         
        ]);
    
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`,
                { EVC_01_Pressure_High: inputValue,EVC_01_Pressure_Low:inputValue2,
                    EVC_02_Pressure_High: inputValueEK2Hight, EVC_02_Pressure_Low:inputValueEK1Low,
                    PT1_High:inputValueEK3Hight, PT1_Low:inputValueEK3Low,
                
                    GD1_High:inputHighGD01, GD1_Low:inputLowGD01,
                    GD2_High:inputHighGD02, GD2_Low:inputLowGD02,
                    GD3_High:inputHighGD03, GD3_Low:inputLowGD03,

                    EVC_01_Flow_at_Measurement_Condition_High:inputHighGVF1, EVC_01_Flow_at_Measurement_Condition_Low:inputLowGVF1,
                    EVC_01_Flow_at_Base_Condition_High:inputHighSVF1, EVC_01_Flow_at_Base_Condition_Low:inputLowSVF1,
                    EVC_01_Volume_at_Base_Condition_High:inputHighSVA1, EVC_01_Volume_at_Base_Condition_Low:inputLowSVA1,
                    EVC_01_Volume_at_Measurement_Condition_High:inputHighGVA1, EVC_01_Volume_at_Measurement_Condition_Low:inputLowGVA1,

                    EVC_02_Flow_at_Measurement_Condition_High:inputHighGVF2, EVC_02_Flow_at_Measurement_Condition_Low:inputLowGVF2,
                    EVC_02_Flow_at_Base_Condition_High:inputHighSVF2, EVC_02_Flow_at_Base_Condition_Low:inputLowSVF2,
                    EVC_02_Volume_at_Base_Condition_High:inputHighSVA2, EVC_02_Volume_at_Base_Condition_Low:inputLowSVA2,
                    EVC_02_Volume_at_Measurement_Condition_High:inputHighGVA2, EVC_02_Volume_at_Measurement_Condition_Low:inputLowGVA2,

                    EVC_01_Temperature_High:inputHighTemperature01, EVC_01_Temperature_Low:inputLowTemperature01,
                    EVC_02_Temperature_High:inputHighTemperature02, EVC_02_Temperature_Low:inputLowTemperature02,

                    EVC_01_Remain_Battery_Service_Life_High:inputHighReBattery01, EVC_01_Remain_Battery_Service_Life_Low:inputLowReBattery01,
                    EVC_02_Remain_Battery_Service_Life_High:inputHighReBattery02, EVC_02_Remain_Battery_Service_Life_Low:inputLowReBattery02,

                    EVC_01_Vm_of_Last_Day_High:inputHighVmLastDay01, EVC_01_Vm_of_Last_Day_Low:inputLowVmLastDay01,
                    EVC_02_Vm_of_Last_Day_High:inputHighVmLastDay02, EVC_02_Vm_of_Last_Day_Low:inputLowVmLastDay02,

                    EVC_01_Vb_of_Last_Day_High:inputHighVbLastDay01, EVC_01_Vb_of_Last_Day_Low:inputLowVbLastDay01,
                    EVC_02_Vb_of_Last_Day_High:inputHighVbLastDay02, EVC_02_Vb_of_Last_Day_Low:inputLowVbLastDay02,

                    EVC_01_Vb_of_Current_Day_High:inputHighVbToDay01, EVC_01_Vb_of_Current_Day_Low:inputLowVbToDay01,
                    EVC_02_Vb_of_Current_Day_High:inputHighVbToDay02, EVC_02_Vb_of_Current_Day_Low:inputLowVbToDay02,

                    EVC_01_Vm_of_Current_Day_High:inputHighVmToDay01, EVC_01_Vm_of_Current_Day_Low:inputLowVmToDay01,
                    EVC_02_Vm_of_Current_Day_High:inputHighVmToDay02, EVC_02_Vm_of_Current_Day_Low:inputLowVmToDay02,

                    DI_UPS_BATTERY_High:inputHighUpsBattery, DI_UPS_BATTERY_Low:inputLowUpsBattery,
                    DI_UPS_CHARGING_High:inputHighUpsCharging, DI_UPS_CHARGING_Low:inputLowUpsCharging,

                    DI_UPS_ALARM_High:inputHighUpsAlarm, DI_UPS_ALARM_Low:inputLowUpsAlarm,
                    UPS_Mode_High:inputHighUpsMode, UPS_Mode_Low:inputLowUpsMode,

                    DI_SELECT_SW_High:inputHighSelectSW, DI_SELECT_SW_Low:inputLowSelectSW,

                    Emergency_NO_High:inputHighEmergencyNO, Emergency_NO_Low:inputLowEmergencyNO,
                    Emergency_NC_High:inputHighEmergencyNC, Emergency_NC_Low:inputLowEmergencyNC,

                    DI_RESET_High:inputHighDIReset, DI_RESET_Low:inputLowDIReset,

                    DO_HR_01_High:inputHighDOHorn, DO_HR_01_Low:inputLowDOHorn,

                    DI_MAP_1_High:inputHighMap, DI_MAP_1_Low:inputLowMap,

                    DI_ZSC_1_High:inputHighZSC_1, DI_ZSC_1_Low:inputLowZSC_1,
                    DI_ZSO_1_High:inputHighZSO_1, DI_ZSO_1_Low:inputLowZSO_1,

                    DO_SV_01_High:inputHighDO_SV1, DO_SV_01_Low:inputLowDO_SV1,
                    DO_BC_01_High:inputHighBeacon, DO_BC_01_Low:inputLowBeacon,

                }
            );

            setHighEK1PressureValue(inputValue);
            setLowEK1PressureValue(inputValue2);

            setHighEK2PressureValue(inputValueEK2Hight);
            setLowEK2PressureValue(inputValueEK1Low);

            setHighEK3PressureValue(inputValueEK3Hight);
            setLowEK3PressureValue(inputValueEK3Low);


            setHighGD01(inputHighGD01);
            setLowGD01(inputLowGD01);

            setHighGD02(inputHighGD02);
            setLowGD02(inputLowGD02);

            setHighGD03(inputHighGD03);
            setLowGD03(inputLowGD03);


            setHighGVF1(inputHighGVF1);
            setLowGVF1(inputLowGVF1);

            setHighSVF1(inputHighSVF1);
            setLowSVF1(inputLowSVF1);

            setHighSVA1(inputHighSVA1);
            setLowSVA1(inputLowSVA1);

            setHighGVA1(inputHighGVA1);
            setLowGVA1(inputLowGVA1);

            setHighGVF2(inputHighGVF2);
            setLowGVF2(inputLowGVF2);

            setHighSVF2(inputHighSVF2);
            setLowSVF2(inputLowSVF2);

            setHighSVA2(inputHighSVA2);
            setLowSVA2(inputLowSVA2);

            setHighGVA2(inputHighGVA2);
            setLowGVA2(inputLowGVA2);

            setHighTemperature01(inputHighTemperature01);
            setLowTemperature01(inputLowTemperature01);


            setHighTemperature02(inputHighTemperature02);
            setLowTemperature02(inputLowTemperature02);


            setHighReBattery01(inputHighReBattery01);
            setLowReBattery01(inputLowReBattery01);

            setHighReBattery02(inputHighReBattery02);
            setLowReBattery02(inputLowReBattery02);


            setHighVmLastDay01(inputHighVmLastDay01);
            setLowVmLastDay01(inputLowVmLastDay01);

            setHighVmLastDay02(inputHighVmLastDay02);
            setLowVmLastDay02(inputLowVmLastDay02);


            setHighVbLastDay01(inputHighVbLastDay01);
            setLowVbLastDay01(inputLowVbLastDay01);

            setHighVbLastDay02(inputHighVbLastDay02);
            setLowVbLastDay02(inputLowVbLastDay02);

            setHighVbToDay01(inputHighVbToDay01);
            setLowVbToDay01(inputLowVbToDay01);

            setHighVbToDay02(inputHighVbToDay02);
            setLowVbToDay02(inputLowVbToDay02);

            setHighVmToDay01(inputHighVmToDay01);
            setLowVmToDay01(inputLowVmToDay01);

            setHighVmToDay02(inputHighVmToDay02);
            setLowVmToDay02(inputLowVmToDay02);

            setHighUpsBattery(inputHighUpsBattery);
            setLowUpsBattery(inputLowUpsBattery);


            setHighUpsCharging(inputHighUpsCharging);
            setLowUpsCharging(inputLowUpsCharging);

            setHighUpsAlarm(inputHighUpsAlarm);
            setLowUpsAlarm(inputLowUpsAlarm);

            setHighUpsMode(inputHighUpsMode);
            setLowUpsMode(inputLowUpsMode);

            setHighSelectSW(inputHighSelectSW);
            setLowSelectSW(inputLowSelectSW);

            setHighEmergencyNC(inputHighEmergencyNC);
            setLowEmergencyNC(inputLowEmergencyNC);

            setHighEmergencyNO(inputHighEmergencyNO);
            setLowEmergencyNO(inputLowEmergencyNO);

            setHighDIReset(inputHighDIReset);
            setLowDIReset(inputLowDIReset);

            setHighDOHorn(inputHighDOHorn);
            setLowDOHorn(inputLowDOHorn);

            setHighMap(inputHighMap);
            setLowMap(inputLowMap);

            setHighZSC_1(inputHighZSC_1);
            setLowZSC_1(inputLowZSC_1);

            setHighZSO_1(inputHighZSO_1);
            setLowZSO_1(inputLowZSO_1);


            setHighDO_SV1(inputHighDO_SV1);
            setLowDO_SV1(inputLowDO_SV1);

            setHighBeacon(inputHighBeacon);
            setLowBeacon(inputLowBeacon);

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
            CSSpt02 : {
                color:exceedThreshold && !maintainPT_1901
                ? "#ff5656"
                : maintainPT_1901
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSSpt03 : {
                color:exceedThreshold2 && !maintainPT_1902
                ? "#ff5656"
                : maintainPT_1902
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSSpt01 : {
                color:exceedThreshold3 && !maintainPT_1903
                ? "#ff5656"
                : maintainPT_1903
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSSgd01 : {
                color:AlarmGD01 && !maintainGD_1901
                ? "#ff5656"
                : maintainGD_1901
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSSgd02 : {
                color:AlarmGD02 && !maintainGD_1902
                ? "#ff5656"
                : maintainGD_1902
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSSgd03 : {
                color:AlarmGD03 && !maintainGD_1903
                ? "#ff5656"
                : maintainGD_1903
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_GVF1 : {
                color:AlarmGVF1 && !maintainGVF1
                ? "#ff5656"
                : maintainGVF1
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_SVF1 : {
                color:AlarmSVF1&& !maintainSVF1
                ? "#ff5656"
                : maintainSVF1
                ? "orange"
                : ""    ,
                height:25,
                fontWeight:400,
                padding:10
            },
             CSS_SVA1 : {
                color:AlarmSVA1 && !maintainSVA1
                ? "#ff5656"
                : maintainSVA1
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_GVA1 : {
                color:AlarmGVA1 && !maintainGVA1
                ? "#ff5656"
                : maintainGVA1
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_GVF2 : {
                color:AlarmGVF2 && !maintainGVF2
                ? "#ff5656"
                : maintainGVF2
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_SVF2 : {
                color:AlarmSVF2 && !maintainSVF2
                ? "#ff5656"
                : maintainSVF2
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                padding:10
            },
             CSS_SVA2 : {
                color:AlarmSVA2&& !maintainSVA2
                ? "#ff5656"
                : maintainSVA2
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_GVA2 : {
                color:AlarmGVA2 && !maintainGVA2
                ? "#ff5656"
                : maintainGVA2
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_Temperature : {
                color:AlarmTemperature01 && !maintainTemperature01
                ? "#ff5656"
                : maintainTemperature01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_Temperature02 : {
                color:AlarmTemperature02 && !maintainTemperature02
                ? "#ff5656"
                : maintainTemperature02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_Rebattery : {
                color:AlarmReBattery01 && !maintainReBattery01
                ? "#ff5656"
                : maintainReBattery01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_Rebattery02 : {
                color:AlarmReBattery02 && !maintainReBattery02
                ? "#ff5656"
                : maintainReBattery02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_VmLastDay01 : {
                color:AlarmVmLastDay01 && !maintainVmLastDay01
                ? "#ff5656"
                : maintainVmLastDay01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_VmLastDay02 : {
                color:AlarmVmLastDay02 && !maintainVmLastDay02
                ? "#ff5656"
                : maintainVmLastDay02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_VbLastDay01 : {
                color:AlarmVbLastDay01 && !maintainVbLastDay01
                ? "#ff5656"
                : maintainVbLastDay01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_VbLastDay02 : {
                color:AlarmVbLastDay02 && !maintainVbLastDay02
                ? "#ff5656"
                : maintainVbLastDay02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_VmToDay01 : {
                color:AlarmVmToDay01 && !maintainVmToDay01
                ? "#ff5656"
                : maintainVmToDay01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_VmToDay02 : {
                color:AlarmVmToDay02 && !maintainVmToDay02
                ? "#ff5656"
                : maintainVmToDay02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_VbToDay01 : {
                color:AlarmVbToDay01 && !maintainVbToDay01
                ? "#ff5656"
                : maintainVbToDay01
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_VbToDay02 : {
                color:AlarmVbToDay02 && !maintainVbToDay02
                ? "#ff5656"
                : maintainVbToDay02
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_UpsBattery : {
                color:AlarmUpsBattery && !maintainUpsBattery
                ? "#ff5656"
                : maintainUpsBattery
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_UpsCharging: {
                color:AlarmUpsCharging && !maintainUpsCharging
                ? "#ff5656"
                : maintainUpsCharging
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_UpsAlarm: {
                color:AlarmUpsAlarm && !maintainUpsAlarm
                ? "#ff5656"
                : maintainUpsAlarm
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
            CSS_UpsMode: {
                color:AlarmUpsMode && !maintainUpsMode
                ? "#ff5656"
                : maintainUpsMode
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            }, 
              CSS_SelectSW: {
                color:AlarmSelectSW && !maintainSelectSW
                ? "#ff5656"
                : maintainSelectSW
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_EmergencyNO: {
                color:AlarmEmergencyNO && !maintainEmergencyNO
                ? "#ff5656"
                : maintainEmergencyNO
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_EmergencyNC: {
                color:AlarmEmergencyNC && !maintainEmergencyNC
                ? "#ff5656"
                : maintainEmergencyNC
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_Reset: {
                color:AlarmDIReset && !maintainDIReset
                ? "#ff5656"
                : maintainDIReset
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_Horn: {
                color:AlarmDOHorn && !maintainDOHorn
                ? "#ff5656"
                : maintainDOHorn
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
           

            CSS_Map: {
                color:AlarmMap && !maintainMap
                ? "#ff5656"
                : maintainMap
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_ZSC: {
                color:AlarmZSC_1 && !maintainZSC_1
                ? "#ff5656"
                : maintainZSC_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },


            CSS_ZSO: {
                color:AlarmZSO_1 && !maintainZSO_1
                ? "#ff5656"
                : maintainZSO_1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
              CSS_SELENOID: {
                color:AlarmDO_SV1 && !maintainDO_SV1
                ? "#ff5656"
                : maintainDO_SV1
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },

            CSS_Beacon: {
                color:AlarmBeacon && !maintainBeacon
                ? "#ff5656"
                : maintainBeacon
                ? "orange"
                : "" ,
                height:25,
                fontWeight:400,
                padding:10
            },
      };
      const SVF1format = SVF1 !== null ? parseFloat(SVF1).toFixed(2) : "";
      const GVF1format = GVF1 !== null ? parseFloat(GVF1).toFixed(2) : "";
      const SVA1format = SVA1 !== null ? parseFloat(SVA1).toFixed(2) : "";
      const GVA1format = GVA1 !== null ? parseFloat(GVA1).toFixed(2) : "";

      const VBTodayformat = VbToDay01 !== null ? parseFloat(VbToDay01).toFixed(2) : "";
      const VMTodayformat = VmToDay01 !== null ? parseFloat(VmToDay01).toFixed(2) : "";
      const VBLastdayformat = VbLastDay01 !== null ? parseFloat(VbLastDay01).toFixed(2) : "";
      const VMLastdayformat = VmLastDay01 !== null ? parseFloat(VmLastDay01).toFixed(2) : "";

      const dataEVC01 = [


        { timeUpdate: <span style={combineCss.CSS_SVF1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVF1}>SVF FIQ-1901	 </span> ,

        value: <span style={combineCss.CSS_SVF1} > {SVF1format} sm³/h </span> , 
         high: <InputText style={combineCss.CSS_SVF1}   placeholder='High' step="0.1" type='number' value={inputHighSVF1} onChange={handleInputChangeHighSVF1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVF1}   placeholder='Low' step="0.1" type='number' value={inputLowSVF1} onChange={handleInputChangeLowSVF1} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVF_01}
         checked={maintainSVF1}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSS_GVF1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVF1}>GVF FIQ-1901	 </span> ,


        value: <span style={combineCss.CSS_GVF1} > {GVF1format} m³/h</span> , 
         high: <InputText style={combineCss.CSS_GVF1}   placeholder='High' step="0.1" type='number' value={inputHighGVF1} onChange={handleInputChangeHighGVF1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVF1}   placeholder='Low' step="0.1" type='number' value={inputLowGVF1} onChange={handleInputChangeLowGVF1} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVF_01}
         checked={maintainGVF1}
     ></Checkbox>

        },
       
          { timeUpdate: <span style={combineCss.CSS_SVA1} >{timeUpdate}</span>,
        name: <span  style={combineCss.CSS_SVA1}>SVA FIQ-1901	 </span> ,
        // modbus: <span  style={combineCss.CSS_SVA1}>40854	 </span> ,

        value: <span style={combineCss.CSS_SVA1} >  {SVA1format} sm³</span> , 
         high: <InputText style={combineCss.CSS_SVA1}   placeholder='High' step="0.1" type='number' value={inputHighSVA1} onChange={handleInputChangeHighSVA1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVA1}   placeholder='Low' step="0.1" type='number' value={inputLowSVA1} onChange={handleInputChangeLowSVA1} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVA_01}
         checked={maintainSVA1}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSS_GVA1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVA1}>GVA FIQ-1901	 </span> ,
        // modbus: <span  style={combineCss.CSS_GVA1}>40872	 </span> ,

        value: <span style={combineCss.CSS_GVA1} > {GVA1format} m³</span> , 
         high: <InputText style={combineCss.CSS_GVA1}   placeholder='High' step="0.1" type='number' value={inputHighGVA1} onChange={handleInputChangeHighGVA1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVA1}   placeholder='Low' step="0.1" type='number' value={inputLowGVA1} onChange={handleInputChangeLowGVA1} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVA_01}
         checked={maintainGVA1}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSSpt02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSpt02}>PT-1901 </span> ,
        value: <span style={combineCss.CSSpt02} > {PT02} Bara</span> , 
        high: <InputText style={combineCss.CSSpt02}  placeholder='High' step="0.1" type='number' value={inputValue} onChange={handleInputChange} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSpt02}   placeholder='Low' step="0.1" type='number' value={inputValue2} onChange={handleInputChange2} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainPT_1901}
     checked={maintainPT_1901}
 ></Checkbox>
    },


        { timeUpdate: <span style={combineCss.CSS_VbToDay01} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VbToDay01}> VB Today</span> ,

        value: <span style={combineCss.CSS_VbToDay01} > {VBTodayformat} Sm³</span>, 
        high: <InputText style={combineCss.CSS_VbToDay01}   placeholder='High' step="0.1" type='number' value={inputHighVbToDay01} onChange={handleInputChangeHighVbToDay01} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VbToDay01}    placeholder='Low' step="0.1" type='number' value={inputLowVbToDay01} onChange={handleInputChangeLowVbToDay01} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVbToDay01}
        checked={maintainVbToDay01}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_VmToDay01} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VmToDay01}> VM Today</span> ,

        value: <span style={combineCss.CSS_VmToDay01} > {VMTodayformat} m³</span>, 
        high: <InputText style={combineCss.CSS_VmToDay01}   placeholder='High' step="0.1" type='number' value={inputHighVmToDay01} onChange={handleInputChangeHighVmToDay01} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VmToDay01}    placeholder='Low' step="0.1" type='number' value={inputLowVmToDay01} onChange={handleInputChangeLowVmToDay01} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVmToDay01}
        checked={maintainVmToDay01}
    ></Checkbox>

       },

       { timeUpdate: <span style={combineCss.CSS_VbLastDay01} >{timeUpdate}</span>,
       name: <span style={combineCss.CSS_VbLastDay01}> VB Yesterday</span> ,

       value: <span style={combineCss.CSS_VbLastDay01} > {VBLastdayformat} Sm³</span>, 
       high: <InputText style={combineCss.CSS_VbLastDay01}   placeholder='High' step="0.1" type='number' value={inputHighVbLastDay01} onChange={handleInputChangeHighVbLastDay01} inputMode="decimal" />, 
       low:  <InputText style={combineCss.CSS_VbLastDay01}    placeholder='Low' step="0.1" type='number' value={inputLowVbLastDay01} onChange={handleInputChangeLowVbLastDay01} inputMode="decimal" />,
       update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainVbLastDay01}
       checked={maintainVbLastDay01}
   ></Checkbox>

      },

        { timeUpdate: <span style={combineCss.CSS_VmLastDay01} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VmLastDay01}> VM Yesterday </span> ,

        value: <span style={combineCss.CSS_VmLastDay01} > {VMLastdayformat} m³</span>, 
        high: <InputText style={combineCss.CSS_VmLastDay01}   placeholder='High' step="0.1" type='number' value={inputHighVmLastDay01} onChange={handleInputChangeHighVmLastDay01} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VmLastDay01}    placeholder='Low' step="0.1" type='number' value={inputLowVmLastDay01} onChange={handleInputChangeLowVmLastDay01} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVmLastDay01}
        checked={maintainVmLastDay01}
    ></Checkbox>

       },

  

        { timeUpdate: <span style={combineCss.CSS_Rebattery} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Rebattery}> Remain Battery</span> ,

        value: <span style={combineCss.CSS_Rebattery} > {ReBattery01} Months </span>, 
        high: <InputText style={combineCss.CSS_Rebattery}   placeholder='High' step="0.1" type='number' value={inputHighReBattery01} onChange={handleInputChangeHighReBattery01} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Rebattery}    placeholder='Low' step="0.1" type='number' value={inputLowReBattery01} onChange={handleInputChangeLowReBattery01} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainReBattery01}
        checked={maintainReBattery01}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_Temperature} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Temperature}>Temperature </span> ,

        value: <span style={combineCss.CSS_Temperature} > {Temperature01} °C</span>, 
        high: <InputText style={combineCss.CSS_Temperature}   placeholder='High' step="0.1" type='number' value={inputHighTemperature01} onChange={handleInputChangeHighTemperature01} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Temperature}    placeholder='Low' step="0.1" type='number' value={inputLowTemperature01} onChange={handleInputChangeLowTemperature01} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainTemperature01}
        checked={maintainTemperature01}
    ></Checkbox>

       },
        

  

      ]
      const SVF2format = SVF2 !== null ? parseFloat(SVF2).toFixed(2) : "";
      const GVF2format = GVF2 !== null ? parseFloat(GVF2).toFixed(2) : "";
      const SVA2format = SVA2 !== null ? parseFloat(SVA2).toFixed(2) : "";
      const GVA2format = GVA2 !== null ? parseFloat(GVA2).toFixed(2) : "";

      const VBTodayformat2 = VbToDay02 !== null ? parseFloat(VbToDay02).toFixed(2) : "";
      const VMTodayformat2 = VmToDay02 !== null ? parseFloat(VmToDay02).toFixed(2) : "";
      const VBLastdayformat2 = VbLastDay02 !== null ? parseFloat(VbLastDay02).toFixed(2) : "";
      const c = VmLastDay02 !== null ? parseFloat(VmLastDay02).toFixed(2) : "";
      const dataEVC02 = [

        { timeUpdate: <span style={combineCss.CSS_SVF2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVF2}>SVF FIQ-1902	 </span> ,
        // modbus: <span style={combineCss.CSS_SVF2}>  40858 </span> ,

        value: <span style={combineCss.CSS_SVF2} > {SVF2format} m³/h </span> , 
         high: <InputText style={combineCss.CSS_SVF2}   placeholder='High' step="0.1" type='number' value={inputHighSVF2} onChange={handleInputChangeHighSVF2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVF2}   placeholder='Low' step="0.1" type='number' value={inputLowSVF2} onChange={handleInputChangeLowSVF2} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVF_02}
         checked={maintainSVF2}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSS_GVF2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVF2}>GVF FIQ-1902	 </span> ,

        value: <span style={combineCss.CSS_GVF2} > {GVF2format} m³/h</span> , 
         high: <InputText style={combineCss.CSS_GVF2}   placeholder='High' step="0.1" type='number' value={inputHighGVF2} onChange={handleInputChangeHighGVF2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVF2}   placeholder='Low' step="0.1" type='number' value={inputLowGVF2} onChange={handleInputChangeLowGVF2} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVF_02}
         checked={maintainGVF2}
     ></Checkbox>
         

        },
          { timeUpdate: <span style={combineCss.CSS_SVA2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVA2}>SVA FIQ-1902	 </span> ,

        value: <span style={combineCss.CSS_SVA2} > {SVA2format} sm³</span> , 
         high: <InputText style={combineCss.CSS_SVA2}   placeholder='High' step="0.1" type='number' value={inputHighSVA2} onChange={handleInputChangeHighSVA2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVA2}   placeholder='Low' step="0.1" type='number' value={inputLowSVA2} onChange={handleInputChangeLowSVA2} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainSVA_02}
         checked={maintainSVA2}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSS_GVA2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVA2}>GVA FIQ-1902	 </span> ,

        value: <span style={combineCss.CSS_GVA2} > {GVA2format} m³</span> , 
         high: <InputText style={combineCss.CSS_GVA2}   placeholder='High' step="0.1" type='number' value={inputHighGVA2} onChange={handleInputChangeHighGVA2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVA2}   placeholder='Low' step="0.1" type='number' value={inputLowGVA2} onChange={handleInputChangeLowGVA2} inputMode="decimal" />,
         update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGVA_02} 
         checked={maintainGVA2}
     ></Checkbox>

        },
        { timeUpdate: <span style={combineCss.CSSpt03} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSpt03}>PT-1902 </span> ,
        value: <span style={combineCss.CSSpt03} > {PT03} Bara</span> , 
        high: <InputText style={combineCss.CSSpt03}  placeholder='High' step="0.1" type='number' value={inputValueEK2Hight} onChange={handleInputChangeEK2High} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSSpt03}   placeholder='High' step="0.1" type='number' value={inputValueEK1Low} onChange={handleInputChangeEK2Low} inputMode="decimal" />,
     update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
     Maintain:   <Checkbox
     style={{ marginRight: 20, }}
     onChange={ChangeMaintainPT_1902}
     checked={maintainPT_1902}
 ></Checkbox>
    },

        { timeUpdate: <span style={combineCss.CSS_VbToDay02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VbToDay02}> VB Today</span> ,

        value: <span style={combineCss.CSS_VbToDay02} > {VBTodayformat2} Sm³</span>, 
        high: <InputText style={combineCss.CSS_VbToDay02}   placeholder='High' step="0.1" type='number' value={inputHighVbToDay02} onChange={handleInputChangeHighVbToDay02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VbToDay02}    placeholder='Low' step="0.1" type='number' value={inputLowVbToDay02} onChange={handleInputChangeLowVbToDay02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVbToDay02}
        checked={maintainVbToDay02}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_VmToDay02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VmToDay02}> VM Today</span> ,

        value: <span style={combineCss.CSS_VmToDay02} > {VMTodayformat2} m³</span>, 
        high: <InputText style={combineCss.CSS_VmToDay02}   placeholder='High' step="0.1" type='number' value={inputHighVmToDay02} onChange={handleInputChangeHighVmToDay02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VmToDay02}    placeholder='Low' step="0.1" type='number' value={inputLowVmToDay02} onChange={handleInputChangeLowVmToDay02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVmToDay02}
        checked={maintainVmToDay02}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_VbLastDay02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VbLastDay02}> VB Yesterday</span> ,

        value: <span style={combineCss.CSS_VbLastDay02} > {VBLastdayformat2} Sm³</span>, 
        high: <InputText style={combineCss.CSS_VbLastDay02}   placeholder='High' step="0.1" type='number' value={inputHighVbLastDay02} onChange={handleInputChangeHighVbLastDay02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VbLastDay02}    placeholder='Low' step="0.1" type='number' value={inputLowVbLastDay02} onChange={handleInputChangeLowVbLastDay02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVbLastDay02}
        checked={maintainVbLastDay02}
    ></Checkbox>

       },
        { timeUpdate: <span style={combineCss.CSS_VmLastDay02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_VmLastDay02}> VM Yesterday </span> ,

        value: <span style={combineCss.CSS_VmLastDay02} > {VBLastdayformat2} m³</span>, 
        high: <InputText style={combineCss.CSS_VmLastDay02}   placeholder='High' step="0.1" type='number' value={inputHighVmLastDay02} onChange={handleInputChangeHighVmLastDay02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_VmLastDay02}    placeholder='Low' step="0.1" type='number' value={inputLowVmLastDay02} onChange={handleInputChangeLowVmLastDay02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainVmLastDay02}
        checked={maintainVmLastDay02}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_Rebattery02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Rebattery02}> Remain Battery</span> ,

        value: <span style={combineCss.CSS_Rebattery02} > {ReBattery02} Months</span>, 
        high: <InputText style={combineCss.CSS_Rebattery02}   placeholder='High' step="0.1" type='number' value={inputHighReBattery02} onChange={handleInputChangeHighReBattery02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Rebattery02}    placeholder='Low' step="0.1" type='number' value={inputLowReBattery02} onChange={handleInputChangeLowReBattery02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainReBattery02}
        checked={maintainReBattery02}
    ></Checkbox>

       },

        { timeUpdate: <span style={combineCss.CSS_Temperature02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Temperature02}>Temperature </span> ,

        value: <span style={combineCss.CSS_Temperature02} > {Temperature02} °C</span>, 
        high: <InputText style={combineCss.CSS_Temperature02}   placeholder='High' step="0.1" type='number' value={inputHighTemperature02} onChange={handleInputChangeHighTemperature02} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Temperature02}    placeholder='Low' step="0.1" type='number' value={inputLowTemperature02} onChange={handleInputChangeLowTemperature02} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData'   onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainTemperature02}
        checked={maintainTemperature02}
    ></Checkbox>

       },

      ]

      const DataCharging = UpsCharging === "0" ? "Normal" : UpsCharging === "1" ? "Charging" : null
      const DataBattery = UpsBattery === "0" ? "Normal" : UpsBattery === "1" ? "Battery" : null
      const DataAlarm = UpsAlarm === "0" ? "Normal" : UpsAlarm === "1" ? "No Battery" : null
      const DataMode = UpsMode === "0" ? "Error" : UpsMode === "1" ? "Using Battery" : UpsMode === "2" ? "Charging Battery" : UpsMode === "3" ? "Disconnected Battery" : UpsMode === "4" ? "Normal" : null
      const DataZSC_1 = ZSC_1 === "0" ? "On" : ZSC_1 === "1" ? "Off" : null
      const DataZSO_1 = ZSO_1 === "0" ? "Off" : ZSO_1 === "1" ? "On" : null
      const DataSelectSW = SelectSW === "0" ? "Local" : SelectSW === "1" ? "Remote" : null
      const DataReset = DIReset === "0" ? "Off" : DIReset === "1" ? "On" : null
      const DataHorn = DOHorn === "0" ? "Off" : DOHorn === "1" ? "On" : null
      const DataBeacon = Beacon === "0" ? "Off" : Beacon === "1" ? "On" : null
      const DataSV_1 = DO_SV1 === "0" ? "Off" : DO_SV1 === "1" ? "On" : null
      const DataEmergencyNC = EmergencyNC === "0" ? "Emergency" : EmergencyNC === "1" ? "Normal" : null
      const DataEmergencyNO = EmergencyNO === "0" ? "Normal" : EmergencyNO === "1" ? "Emergency" : null
      const DataMap = Map === "0" ? "Normal" : Map === "1" ? "Emergency" : null


      const PT01format =
      PT01 !== null ? parseFloat(PT01).toFixed(2) : "";

      const dataPLC = [

        { timeUpdate: <span style={combineCss.CSSpt01} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSpt01}>PT-1903 </span> ,
        value: <span style={combineCss.CSSpt01} > {PT01format} BarG</span> , 
         high: <InputText style={combineCss.CSSpt01}   placeholder='High' step="0.1" type='number' value={inputValueEK3Hight} onChange={handleInputChangeEK3High} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSpt01}   placeholder='Low' step="0.1" type='number' value={inputValueEK3Low} onChange={handleInputChangeEK3Low} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainPT_1903}
      checked={maintainPT_1903}
  ></Checkbox>

        },

     { timeUpdate: <span style={combineCss.CSSgd01} >{timeUpdate}</span>,
     name: <span style={combineCss.CSSgd01}>GD-1901 </span> ,
     value: <span style={combineCss.CSSgd01} > {GD01} LEL</span> , 
      high: <InputText style={combineCss.CSSgd01}   placeholder='High' step="0.1" type='number' value={inputHighGD01} onChange={handleInputChangeHighGD01} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSgd01}   placeholder='Low' step="0.1" type='number' value={inputLowGD01} onChange={handleInputChangeLowGD01} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_01}
      checked={maintainGD_1901}
  ></Checkbox>

     },

     { timeUpdate: <span style={combineCss.CSSgd02} >{timeUpdate}</span>,
     name: <span style={combineCss.CSSgd02}>GD-1902 </span> ,
     value: <span style={combineCss.CSSgd02} > {GD02} LEL</span> , 
      high: <InputText style={combineCss.CSSgd02}   placeholder='High' step="0.1" type='number' value={inputHighGD02} onChange={handleInputChangeHighGD02} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSgd02}   placeholder='Low' step="0.1" type='number' value={inputLowGD02} onChange={handleInputChangeLowGD02} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_02}
      checked={maintainGD_1902}
  ></Checkbox>

     },

     { timeUpdate: <span style={combineCss.CSSgd03} >{timeUpdate}</span>,
     name: <span style={combineCss.CSSgd03}>GD-1903 </span> ,
     value: <span style={combineCss.CSSgd03} > {GD03} LEL</span> , 
      high: <InputText style={combineCss.CSSgd03}   placeholder='High' step="0.1" type='number' value={inputHighGD03} onChange={handleInputChangeHighGD03} inputMode="decimal" />, 
      low:  <InputText style={combineCss.CSSgd03}   placeholder='Low' step="0.1" type='number' value={inputLowGD03} onChange={handleInputChangeLowGD03} inputMode="decimal" />,
      update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainGD_03}
      checked={maintainGD_1903}
  ></Checkbox>

     },

     
        { timeUpdate: <span style={combineCss.CSS_UpsCharging} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_UpsCharging}>UPS CHARGING </span> ,
        value: <span style={combineCss.CSS_UpsCharging} > {UpsCharging} {DataCharging}</span> , 
        high: <InputText style={combineCss.CSS_UpsCharging}   placeholder='High' step="0.1" type='number' value={inputHighUpsCharging} onChange={handleInputChangeHighUpsCharging} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_UpsCharging}   placeholder='Low' step="0.1" type='number' value={inputLowUpsCharging} onChange={handleInputChangeLowUpsCharging} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainUpsCharging}
        checked={maintainUpsCharging}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_UpsBattery} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_UpsBattery}>UPS BATTERY </span> ,
        value: <span style={combineCss.CSS_UpsBattery} > {UpsBattery} {DataBattery}</span> , 
        high: <InputText style={combineCss.CSS_UpsBattery}   placeholder='High' step="0.1" type='number' value={inputHighUpsBattery} onChange={handleInputChangeHighUpsBattery} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_UpsBattery}   placeholder='Low' step="0.1" type='number' value={inputLowUpsBattery} onChange={handleInputChangeLowUpsBattery} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainUpsBattery}
        checked={maintainUpsBattery}
    ></Checkbox>
        },
        { timeUpdate: <span style={combineCss.CSS_UpsAlarm} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_UpsAlarm}>UPS ALARM </span> ,
        value: <span style={combineCss.CSS_UpsAlarm} > {UpsAlarm} {DataAlarm}</span> , 
        high: <InputText style={combineCss.CSS_UpsAlarm}   placeholder='High' step="0.1" type='number' value={inputHighUpsAlarm} onChange={handleInputChangeHighUpsAlarm} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_UpsAlarm}   placeholder='Low' step="0.1" type='number' value={inputLowUpsAlarm} onChange={handleInputChangeLowUpsAlarm} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainUpsAlarm}
        checked={maintainUpsAlarm}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_UpsMode} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_UpsMode}>UPS MODE </span> ,
        value: <span style={combineCss.CSS_UpsMode} > {UpsMode} {DataMode}</span> , 
        high: <InputText style={combineCss.CSS_UpsMode}   placeholder='High' step="0.1" type='number' value={inputHighUpsMode} onChange={handleInputChangeHighUpsMode} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_UpsMode}   placeholder='Low' step="0.1" type='number' value={inputLowUpsMode} onChange={handleInputChangeLowUpsMode} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainUpsMode}
        checked={maintainUpsMode}
    ></Checkbox>
        },
       
    
        { timeUpdate: <span style={combineCss.CSS_SelectSW} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SelectSW}>SELECT SW </span> ,
        value: <span style={combineCss.CSS_SelectSW} > {SelectSW} {DataSelectSW}</span> , 
        high: <InputText style={combineCss.CSS_SelectSW}   placeholder='High' step="0.1" type='number' value={inputHighSelectSW} onChange={handleInputChangeHighSelectSW} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_SelectSW}   placeholder='Low' step="0.1" type='number' value={inputLowSelectSW} onChange={handleInputChangeLowSelectSW} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainSelectSW}
        checked={maintainSelectSW}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_Reset} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Reset}>RESET </span> ,
        value: <span style={combineCss.CSS_Reset} > {DIReset} {DataReset}</span> , 
        high: <InputText style={combineCss.CSS_Reset}   placeholder='High' step="0.1" type='number' value={inputHighDIReset} onChange={handleInputChangeHighDIReset} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Reset}   placeholder='Low' step="0.1" type='number' value={inputLowDIReset} onChange={handleInputChangeLowDIReset} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDIReset}
        checked={maintainDIReset}
    ></Checkbox>
        },
     
        { timeUpdate: <span style={combineCss.CSS_SELENOID} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SELENOID}>SDV-SOLENOID </span> ,
        value: <span style={combineCss.CSS_SELENOID} > {DO_SV1} {DataSV_1}</span> , 
        high: <InputText style={combineCss.CSS_SELENOID}   placeholder='High' step="0.1" type='number' value={inputHighDO_SV1} onChange={handleInputChangeHighDO_SV1} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_SELENOID}   placeholder='Low' step="0.1" type='number' value={inputLowDO_SV1} onChange={handleInputChangeLowDO_SV1} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDO_SV1}
        checked={maintainDO_SV1}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_EmergencyNC} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_EmergencyNC}>Emergency NC </span> ,
        value: <span style={combineCss.CSS_EmergencyNC} > {EmergencyNC} {DataEmergencyNC}</span> , 
        high: <InputText style={combineCss.CSS_EmergencyNC}   placeholder='High' step="0.1" type='number' value={inputHighEmergencyNC} onChange={handleInputChangeHighEmergencyNC} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_EmergencyNC}   placeholder='Low' step="0.1" type='number' value={inputLowEmergencyNC} onChange={handleInputChangeLowEmergencyNC} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEmergencyNC}
        checked={maintainEmergencyNC}
    ></Checkbox>
        },
        { timeUpdate: <span style={combineCss.CSS_EmergencyNO} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_EmergencyNO}>Emergency NO </span> ,
        value: <span style={combineCss.CSS_EmergencyNO} > {EmergencyNO} {DataEmergencyNO}</span> , 
        high: <InputText style={combineCss.CSS_EmergencyNO}   placeholder='High' step="0.1" type='number' value={inputHighEmergencyNO} onChange={handleInputChangeHighEmergencyNO} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_EmergencyNO}   placeholder='Low' step="0.1" type='number' value={inputLowEmergencyNO} onChange={handleInputChangeLowEmergencyNO} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainEmergencyNO}
        checked={maintainEmergencyNO}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_Horn} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Horn}>Horn </span> ,
        value: <span style={combineCss.CSS_Horn} > {DOHorn} {DataHorn}</span> , 
        high: <InputText style={combineCss.CSS_Horn}   placeholder='High' step="0.1" type='number' value={inputHighDOHorn} onChange={handleInputChangeHighDOHorn} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Horn}   placeholder='Low' step="0.1" type='number' value={inputLowDOHorn} onChange={handleInputChangeLowDOHorn} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainDOHorn}
        checked={maintainDOHorn}
    ></Checkbox>
        },
        { timeUpdate: <span style={combineCss.CSS_ZSC} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_ZSC}>SDV ZSC 1 </span> ,
        value: <span style={combineCss.CSS_ZSC} > {ZSC_1} {DataZSC_1}</span> , 
        high: <InputText style={combineCss.CSS_ZSC}   placeholder='High' step="0.1" type='number' value={inputHighZSC_1} onChange={handleInputChangeHighZSC_1} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_ZSC}   placeholder='Low' step="0.1" type='number' value={inputLowZSC_1} onChange={handleInputChangeLowZSC_1} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainZSC_1}
        checked={maintainZSC_1}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_ZSO} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_ZSO}>SDV ZSO </span> ,
        value: <span style={combineCss.CSS_ZSO} > {ZSO_1} {DataZSO_1}</span> , 
        high: <InputText style={combineCss.CSS_ZSO}   placeholder='High' step="0.1" type='number' value={inputHighZSO_1} onChange={handleInputChangeHighZSO_1} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_ZSO}   placeholder='Low' step="0.1" type='number' value={inputLowZSO_1} onChange={handleInputChangeLowZSO_1} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainZSO_1}
        checked={maintainZSO_1}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_Map} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Map}>MAP </span> ,
        value: <span style={combineCss.CSS_Map} > {Map} {DataMap}</span> , 
        high: <InputText style={combineCss.CSS_Map}   placeholder='High' step="0.1" type='number' value={inputHighMap} onChange={handleInputChangeHighMap} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Map}   placeholder='Low' step="0.1" type='number' value={inputLowMap} onChange={handleInputChangeLowMap} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainMap}
        checked={maintainMap}
    ></Checkbox>
        },

        { timeUpdate: <span style={combineCss.CSS_Beacon} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_Beacon}>Beacon </span> ,
        value: <span style={combineCss.CSS_Beacon} > {Beacon} {DataBeacon}</span> , 
        high: <InputText style={combineCss.CSS_Beacon}   placeholder='High' step="0.1" type='number' value={inputHighBeacon} onChange={handleInputChangeHighBeacon} inputMode="decimal" />, 
        low:  <InputText style={combineCss.CSS_Beacon}   placeholder='Low' step="0.1" type='number' value={inputLowBeacon} onChange={handleInputChangeLowBeacon} inputMode="decimal" />,
        update:  <button className='buttonUpdateSetData' onClick={confirmUpData} > Update </button>,
        Maintain:   <Checkbox
        style={{ marginRight: 20, }}
        onChange={ChangeMaintainBeacon}
        checked={maintainBeacon}
    ></Checkbox>
        },
      ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  padding:10, borderRadius:10 }}>
            
            <audio ref={audioRef}>
            <source src="/audios/mixkit-police-siren-us-1643-_1_.mp3" type="audio/mpeg" />
        </audio>
        <Toast ref={toast} />

        <ConfirmDialog />


            <div>

                <div style={{display:'flex' }}>
        <h2>OTSUKA</h2>

        </div>
        <hr />
        </div>


     
      
        <div style={{width:'100%' , padding:10, borderRadius:5 }}>

            <h4>EVC 01 -  Prameter & configuration  </h4>
        <DataTable  value={dataEVC01} size={'small'}    >
      <Column field="timeUpdate" header="Time Update" />
      {/* <Column field="modbus" header="Modbus" /> */}

      <Column field="name" header="Name" />

      <Column field="value" header="Value" />
      <Column  field="high" header="High" />
      <Column field="low" header="Low" />
      <Column field="Maintain" header="Maintain" />
      <Column field="update" header="Update" />

    </DataTable>

    </div>
<br />

    <div style={{width:'100%' , padding:10, borderRadius:5  }}>

<h4>EVC 02 - Parameter & configuration</h4>
<DataTable  value={dataEVC02} size={'small'}    >
<Column field="timeUpdate" header="Time Update" />
{/* <Column field="modbus" header="Modbus" /> */}

<Column field="name" header="Name" />

<Column field="value" header="Value" />
<Column  field="high" header="High" />
<Column field="low" header="Low" />
<Column field="Maintain" header="Maintain" />
<Column field="update" header="Update" />

</DataTable>
</div>
<br />

<div style={{width:'100%' ,  padding:10,  borderRadius:5 }}>

<h4>PLC - Parameter & configuration</h4>
<DataTable  value={dataPLC} size={'small'}    >
<Column field="timeUpdate" header="Time Update" />
{/* <Column field="modbus" header="Modbus" /> */}

<Column field="name" header="Name" />

<Column field="value" header="Value" />
<Column  field="high" header="High" />
<Column field="low" header="Low" />
<Column field="Maintain" header="Maintain" />
<Column field="update" header="Update" />

</DataTable>
<br />

</div>
<div style={{width:'100%' ,  padding:5,  borderRadius:5 }}>

<SetAttribute/>
</div>
    </div>
    
    );
}
