import React, { useEffect, useRef, useState } from "react";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
export default function ScoreCard_Otsuka() {

    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);

    const [GVF1, setGVF1] = useState<string | null>(null);
    const [SVF1, setSVF1] = useState<string | null>(null);
    const [SVA1, setSVA1] = useState<string | null>(null);
    const [GVA1, setGVA1] = useState<string | null>(null);

    const [GVF2, setGVF2] = useState<string | null>(null);
    const [SVF2, setSVF2] = useState<string | null>(null);
    const [SVA2, setSVA2] = useState<string | null>(null);
    const [GVA2, setGVA2] = useState<string | null>(null);

    const [PT01, setPT01] = useState<string | null>(null);
    const [PT02, setPT02] = useState<string | null>(null);
    const [PT03, setPT03] = useState<string | null>(null);

    const [GD1, SetGD1] = useState<string | null>(null);
    const [GD2, SetGD2] = useState<string | null>(null);
    const [GD3, SetGD3] = useState<string | null>(null);

    const [NC, setNC] = useState<string | null>(null);
    const [NO, setNO] = useState<string | null>(null);

    const [Temperature01, setTemperature01] = useState<string | null>(null);
    const [Temperature02, setTemperature02] = useState<string | null>(null);

    const [VmLastDay01, setVmLastDay01] = useState<string | null>(null);
    const [VmLastDay02, setVmLastDay02] = useState<string | null>(null);

    const [VbLastDay01, setVbLastDay01] = useState<string | null>(null);
    const [VbLastDay02, setVbLastDay02] = useState<string | null>(null);

    const [VmToday01,setVmToday01] =  useState<string | null>(null);
    const [VmToday02,setVmToday02] =  useState<string | null>(null);

    const [VbToDay01, setVbToDay01] = useState<string | null>(null);
    const [VbToDay02, setVbToDay02] = useState<string | null>(null);

    const [ReBattery01,setRebattery01] = useState<string | null>(null);
    const [ReBattery02,setRebattery02] = useState<string | null>(null);

    const [UpsBattery,setUpsBattery] = useState<string | null>(null);
    const [UpsCharging,setUpsCharging] = useState<string | null>(null);
    const [UpsAlarm,setUpsAlarm] = useState<string | null>(null);
    const [UpsMode,setUpsMode] = useState<string | null>(null);

    const [SelectSW,setSelectSW] = useState<string | null>(null);

    const [EmergencyNC,setEmergencyNC] =useState<string | null>(null);
    const [EmergencyNO,setEmergencyNO] =useState<string | null>(null);

    const [DIReset,setDIReset] =useState<string | null>(null);

    const [DOHorn,setDOHorn] =useState<string | null>(null);
    const [DOBeacon,setDOBeacon] =useState<string | null>(null);
    const [Map,setMap] =useState<string | null>(null);

    const [DO_SV1,setDO_SV1] = useState<string | null>(null);


    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

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
                        EVC_01_Flow_at_Base_Condition: setSVF1,
                        EVC_01_Flow_at_Measurement_Condition: setGVF1,

                        EVC_01_Volume_at_Base_Condition: setSVA1,
                        EVC_01_Vm_Adjustable_Counter: setGVA1,
                        EVC_01_Pressure: setPT01,

                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Flow_at_Measurement_Condition: setGVF2,

                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Vm_Adjustable_Counter: setGVA2,

                        EVC_02_Pressure: setPT02,

                        GD1: SetGD1,
                        GD2: SetGD2,
                        GD3: SetGD3,

                        PT1: setPT03,

                        time:setTimeUpdate,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        EVC_01_Temperature:setTemperature01,
                        EVC_02_Temperature:setTemperature02,

                        EVC_01_Vm_of_Last_Day: setVmLastDay01 ,
                        EVC_02_Vm_of_Last_Day:setVmLastDay02 , 

                        EVC_01_Vb_of_Last_Day: setVbLastDay01 ,
                        EVC_02_Vb_of_Last_Day:setVbLastDay02 , 


                        EVC_01_Vm_of_Current_Day:setVmToday01,
                        EVC_02_Vm_of_Current_Day:setVmToday02,

                        EVC_01_Vb_of_Current_Day: setVbToDay01 ,
                        EVC_02_Vb_of_Current_Day: setVbToDay02,

                        EVC_01_Remain_Battery_Service_Life:setRebattery01,
                        EVC_02_Remain_Battery_Service_Life:setRebattery02,



                        DI_UPS_BATTERY:setUpsBattery,
                        DI_UPS_CHARGING:setUpsCharging,
                        DI_UPS_ALARM:setUpsAlarm,
                        UPS_Mode:setUpsMode,

                        DI_SELECT_SW:setSelectSW,

                        Emergency_NC:setEmergencyNC,
                        Emergency_NO:setEmergencyNO,

                        DI_RESET:setDIReset,
                        DO_HR_01:setDOHorn,
                        DO_BC_01:setDOBeacon,

                        DO_SV1:setDO_SV1,

                        DI_MAP_1:setMap
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }
            };
        }
    }, [data]);




  return (
    <div>


        <div style={{width:'100%', display:'flex', justifyContent:'space-between' }} >

            <div style={{width:'49%', height:'auto', fontWeight:600}}>
                    <div style={{display:'flex', }}  >
                        <div style={{width:'65%', border:'1px solid black', }}>

                            <div>
                                <div style={{border:'0.5px solid black',background:'#21c43a', padding:5, textAlign:'center'}}>
                                    OTSUKA
                                </div>
                                <div style={{border:'0.5px solid black', padding:5, textAlign:'center',background:'#B0C4DE'}}>
                                    EVC Parameter - {timeUpdate?.slice(10,19)}
                                </div>
                                <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Output Pressure (Bara)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Temperature (°C)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Flow (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Flow (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Accumulated (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Accumulated (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Vm Yesterday (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Vb Yesterday (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Vm Today (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Vb Today (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Remainning Battery (Months)</p>
                            </div>
                        </div>

                        <div >

                            <div style={{border:'0.5px solid black',padding:5, background:'#B0C4DE', textAlign:'center'}}>
                            PLC Parameter - {timeUpdate?.slice(10,19)}
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Input Pressure (BarG)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1901 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1902 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1903 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-SOLENOID (0: OFF - 1: ON)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-ZSO (0: OFF - 1: ON) </p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-ZSC (0: OFF - 1: ON) </p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_BATTERY (0 :Normal - 1: Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_CHARGING (0: Normal - 1: Charging)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_ALARM  (0: Normal - 1: Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_MODE (Normal -UPS Running -Charging - No Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SELECT_SW (0: Local - 1: Remote)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>RESET (0: OFF - 1: ON)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Emergency Stop_NC (0: Emergency - 1: Normal)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Emergency Stop_NO (0: Normal - 1: Emergency) </p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>HORN (0: OFF - 1: ON)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>BEACON (0: OFF - 1: ON)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>MAP (0: Normal - 1: Emergency)</p>
                            </div> 
                        </div>
                    </div>
                        <div style={{width:'35%', border:'1px solid black', textAlign:'center'}} >
                        <div>
                            <div style={{border:'0.5px solid black',background:'#21c43a', padding:5}}>

                            {timeUpdate?.slice(0,10)}

                            </div>
                           <div style={{display:'flex'}}>

                            <div style={{width:'50%',}}>
                            <div style={{textAlign:'center', padding:5, border:'0.5px solid black' ,background:'#B0C4DE' }} >
                                <p>EVC-1901</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{PT01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{Temperature01}</p>
                            </div> 
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{GVF1}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{SVF1}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{GVA1}</p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{SVA1}</p>
                            </div>
                           <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VmLastDay01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VbLastDay01}</p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VmToday01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VbToDay01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{ReBattery01}</p>
                            </div>
                            </div>





                            <div style={{width:'50%'}}>
                            <div style={{textAlign:'center', padding:5, border:'0.5px solid black' ,background:'#B0C4DE' }}>
                                <p>
                                EVC-1902
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {PT02}
                                </p>
                            </div> 
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {Temperature02}
                                </p>
                            </div><div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GVF2}
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {SVF2}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GVA2}
                                </p>
                            </div>  <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {SVA2}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                <p>{VmLastDay02}</p>

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                <p>{VbLastDay02}</p>

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {VmToday02}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                            <p>{VbToDay02}</p>

                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {ReBattery02}
                                </p>
                            </div>

                            </div>

                           </div>
                            
                        </div>
                        <div>
                        <div >
                                <div style={{border:'0.5px solid black',padding:5,background:'#B0C4DE'}}>

                                    <p>

                            S7-1200

                                    </p>
                            </div>

                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {PT03}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD1}
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD2}
                               
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD3}
                              
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {DO_SV1}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {NO}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {NC}

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsBattery}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsCharging}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsAlarm}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {UpsMode}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {SelectSW}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {DIReset}
                                </p>
                            </div> 
                             <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {EmergencyNC}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {EmergencyNO}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {DOHorn}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                              {DOBeacon}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {Map}
                                </p>
                            </div>
                        </div>

                        </div>

                    </div>
                </div>
                
                </div>   
        
                <div style={{width:'49%', height:'auto', fontWeight:600}}>
                    <div style={{display:'flex', }}  >
                        <div style={{width:'65%', border:'1px solid black', }}>

                            <div>
                                <div style={{border:'0.5px solid black',background:'#21c43a', padding:5, textAlign:'center'}}>
                                IGUACU
                                </div>
                                <div style={{border:'0.5px solid black', padding:5, textAlign:'center',background:'#B0C4DE'}}>
                                    EVC Parameter - {timeUpdate?.slice(10,19)}
                                </div>
                                <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Output Pressure (Bara)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Temperature (°C)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Flow (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Flow (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Accumulated (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Accumulated (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Vm Yesterday (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Vb Yesterday (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gross Volume Vm Today (m³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Standard Volume Vb Today (Sm³)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Remainning Battery (Months)</p>
                            </div>
                        </div>

                        <div >

                            <div style={{border:'0.5px solid black',padding:5, background:'#B0C4DE', textAlign:'center'}}>
                            PLC Parameter - {timeUpdate?.slice(10,19)}
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Input Pressure (BarG)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1901 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1902 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Gas Detector GD-1903 (%LEL)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-SOLENOID (0: OFF - 1: ON)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-ZSO (0: OFF - 1: ON) </p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SDV-ZSC (0: OFF - 1: ON) </p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_BATTERY (0 :Normal - 1: Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_CHARGING (0: Normal - 1: Charging)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_ALARM  (0: Normal - 1: Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>UPS_MODE (Normal -UPS Running -Charging - No Battery)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>SELECT_SW (0: Local - 1: Remote)</p>
                            </div>
                            <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>RESET (0: OFF - 1: ON)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Emergency Stop_NC (0: Emergency - 1: Normal)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>Emergency Stop_NO (0: Normal - 1: Emergency) </p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>HORN (0: OFF - 1: ON)</p>
                            </div>  <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>BEACON (0: OFF - 1: ON)</p>
                            </div> <div style={{alignItems:'flex-start', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>MAP (0: Normal - 1: Emergency)</p>
                            </div> 
                        </div>
                    </div>
                        <div style={{width:'35%', border:'1px solid black', textAlign:'center'}} >
                        <div>
                            <div style={{border:'0.5px solid black',background:'#21c43a', padding:5}}>

                            {timeUpdate?.slice(0,10)}

                            </div>
                           <div style={{display:'flex'}}>

                            <div style={{width:'50%',}}>
                            <div style={{textAlign:'center', padding:5, border:'0.5px solid black' ,background:'#B0C4DE' }} >
                                <p>EVC-1901</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{PT01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{Temperature01}</p>
                            </div> 
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{GVF1}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{SVF1}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{GVA1}</p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{SVA1}</p>
                            </div>
                           <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VmLastDay01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VbLastDay01}</p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VmToday01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{VbToDay01}</p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }} >
                                <p>{ReBattery01}</p>
                            </div>
                            </div>





                            <div style={{width:'50%'}}>
                            <div style={{textAlign:'center', padding:5, border:'0.5px solid black' ,background:'#B0C4DE' }}>
                                <p>
                                EVC-1902
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {PT02}
                                </p>
                            </div> 
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {Temperature02}
                                </p>
                            </div><div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GVF2}
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {SVF2}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GVA2}
                                </p>
                            </div>  <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {SVA2}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                <p>{VmLastDay02}</p>

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                <p>{VbLastDay02}</p>

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {VmToday02}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                            <p>{VbToDay02}</p>

                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {ReBattery02}
                                </p>
                            </div>

                            </div>

                           </div>
                            
                        </div>
                        <div>
                        <div >
                                <div style={{border:'0.5px solid black',padding:5,background:'#B0C4DE'}}>

                                    <p>

                            S7-1200

                                    </p>
                            </div>

                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {PT03}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD1}
                                </p>
                            </div>
                            <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD2}
                               
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {GD3}
                              
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {DO_SV1}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {NO}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {NC}

                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsBattery}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsCharging}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {UpsAlarm}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {UpsMode}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {SelectSW}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {DIReset}
                                </p>
                            </div> 
                             <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {EmergencyNC}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {EmergencyNO}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                               {DOHorn}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                              {DOBeacon}
                                </p>
                            </div> <div style={{textAlign:'center', padding:3, border:'0.5px solid black',fontSize:11  }}>
                                <p>
                                {Map}
                                </p>
                            </div>
                        </div>

                        </div>

                    </div>
                </div>
                
                </div> 
        </div>
    <br />
 


    </div>
  )
}
