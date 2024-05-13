import React, { useEffect, useRef, useState } from "react";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css"

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
export default function ScoreCard_Otsuka() {
    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    const [VmToday01, setVmToday01] = useState<string | null>(null);
    const [VmToday02, setVmToday02] = useState<string | null>(null);

    const [VbToDay01, setVbToDay01] = useState<string | null>(null);
    const [VbToDay02, setVbToDay02] = useState<string | null>(null);

    const [ReBattery01, setRebattery01] = useState<string | null>(null);
    const [ReBattery02, setRebattery02] = useState<string | null>(null);

    const [UpsBattery, setUpsBattery] = useState<string | null>(null);
    const [UpsCharging, setUpsCharging] = useState<string | null>(null);
    const [UpsAlarm, setUpsAlarm] = useState<string | null>(null);
    const [UpsMode, setUpsMode] = useState<string | null>(null);

    const [SelectSW, setSelectSW] = useState<string | null>(null);

    const [EmergencyNC, setEmergencyNC] = useState<string | null>(null);
    const [EmergencyNO, setEmergencyNO] = useState<string | null>(null);

    const [DIReset, setDIReset] = useState<string | null>(null);

    const [DOHorn, setDOHorn] = useState<string | null>(null);
    const [DOBeacon, setDOBeacon] = useState<string | null>(null);
    const [Map, setMap] = useState<string | null>(null);

    const [DO_SV1, setDO_SV1] = useState<string | null>(null);
    const [EVC_STT01, setEVC_STT01] = useState<any | null>(null);
 

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

                        time: setTimeUpdate,

                        DI_ZSC_1: setNC,
                        DI_ZSO_1: setNO,

                        EVC_01_Temperature: setTemperature01,
                        EVC_02_Temperature: setTemperature02,

                        EVC_01_Vm_of_Last_Day: setVmLastDay01,
                        EVC_02_Vm_of_Last_Day: setVmLastDay02,

                        EVC_01_Vb_of_Last_Day: setVbLastDay01,
                        EVC_02_Vb_of_Last_Day: setVbLastDay02,

                        EVC_01_Vm_of_Current_Day: setVmToday01,
                        EVC_02_Vm_of_Current_Day: setVmToday02,

                        EVC_01_Vb_of_Current_Day: setVbToDay01,
                        EVC_02_Vb_of_Current_Day: setVbToDay02,

                        EVC_01_Remain_Battery_Service_Life: setRebattery01,
                        EVC_02_Remain_Battery_Service_Life: setRebattery02,

                        DI_UPS_BATTERY: setUpsBattery,
                        DI_UPS_CHARGING: setUpsCharging,
                        DI_UPS_ALARM: setUpsAlarm,
                        UPS_Mode: setUpsMode,

                        DI_SELECT_SW: setSelectSW,

                        Emergency_NC: setEmergencyNC,
                        Emergency_NO: setEmergencyNO,

                        DI_RESET: setDIReset,
                        DO_HR_01: setDOHorn,
                        DO_BC_01: setDOBeacon,

                        DO_SV1: setDO_SV1,

                        DI_MAP_1: setMap,

                        EVC_01_Conn_STT: setEVC_STT01,

                 
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

    const tagNameEVC = {
        outputPressure: "Output Pressure (Bara)",
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
        PT03: "Input Pressure (BarG)",
        GD1: "Gas Detector GD-1901 (%LEL)",
        GD2: "Gas Detector GD-1902 (%LEL)",
        GD3: "Gas Detector GD-1903 (%LEL)",
        DO_SV1: "SDV-SOLENOID (0: OFF - 1: ON)",
        ZSC: "SDV-ZSC (0: ON - 1: OFF)",
        ZSO: "SDV-ZSO (0: OFF - 1: ON)",
        UPS_BATTERY : "UPS BATTERY (0 :Normal - 1: Battery)",
        UPS_CHARGING : "UPS CHARGING (0: Normal - 1: Charging)",
        UPS_ALARM : "UPS ALARM (0: Normal - 1: Battery)",
        UPS_MODE :  "UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4:Normal)",
        SELECT_SW:"SELECT SW (0: Local - 1: Remote)",
        RESET:"RESET (0: OFF - 1: ON)",
        EmergencyStop_NC:"Emergency Stop NC (0: Emergency - 1: Normal)",
        EmergencyStop_NO:"Emergency Stop NO (0: Normal - 1: Emergency)",
        HORN:"HORN (0: OFF - 1: ON)",
        BEACON:"BEACON (0: OFF - 1: ON)" ,
        MAP:"MAP (0: Normal - 1: Emergency)" ,

  
    };
    const DataCharging = UpsCharging === "0" ? "Normal" : UpsCharging === "1" ? "Charging" : null
    const DataBattery = UpsBattery === "0" ? "Normal" : UpsBattery === "1" ? "Battery" : null
    const DataAlarm = UpsAlarm === "0" ? "Normal" : UpsAlarm === "1" ? "No Battery" : null
    const DataMode = UpsMode === "0" ? "Error" : UpsMode === "1" ? "Using Battery" : UpsMode === "2" ? "Charging Battery" : UpsMode === "3" ? "Disconnected Battery" : UpsMode === "4" ? "Normal" : null
    const DataZSC_1 = NC === "0" ? "Off" : NC === "1" ? "On" : null
    const DataZSO_1 = NO === "0" ? "Off" : NO === "1" ? "On" : null
    const DataSelectSW = SelectSW === "0" ? "Local" : SelectSW === "1" ? "Remote" : null
    const DataReset = DIReset === "0" ? "Off" : DIReset === "1" ? "On" : null
    const DataHorn = DOHorn === "0" ? "Off" : DOHorn === "1" ? "On" : null
    const DataBeacon = DOBeacon === "0" ? "Off" : DOBeacon === "1" ? "On" : null
    const DataSV_1 = DO_SV1 === "0" ? "Off" : DO_SV1 === "1" ? "On" : null
    const DataEmergencyNC = EmergencyNC === "0" ? " Emergency" : EmergencyNC === "1" ? "Normal" : null
    const DataEmergencyNO = EmergencyNO === "0" ? "Normal" : EmergencyNO === "1" ? " Emergency" : null
    const DataMap = Map === "0" ? "Normal" : Map === "1" ? "Emergency" : null


    const dataEVC = [
        {
            name: <span>{tagNameEVC.outputPressure}</span>,
            evc1901: <span style={{}}>{PT01}</span>,
            evc1902: <span style={{}}> {PT02}</span>,
        },
        {
            name: <span>{tagNameEVC.Temperature}</span>,
            evc1901: <span style={{}}>{Temperature01}</span>,
            evc1902: <span style={{}}> {Temperature02}</span>,
        },
        {
            name: <span>{tagNameEVC.GVF}</span>,
            evc1901: <span style={{}}>{GVF1}</span>,
            evc1902: <span style={{}}> {GVF2}</span>,
        },
        {
            name: <span>{tagNameEVC.SVF}</span>,
            evc1901: <span style={{}}>{SVF1}</span>,
            evc1902: <span style={{}}> {SVF2}</span>,
        },
        {
            name: <span>{tagNameEVC.GVA}</span>,
            evc1901: <span style={{}}>{GVA1}</span>,
            evc1902: <span style={{}}> {GVA2}</span>,
        },
        {
            name: <span>{tagNameEVC.SVA}</span>,
            evc1901: <span style={{}}>{SVA1}</span>,
            evc1902: <span style={{}}> {SVA2}</span>,
        },

        {
            name: <span>{tagNameEVC.VbToday}</span>,
            evc1901: <span style={{}}>{VbToDay01}</span>,
            evc1902: <span style={{}}> {VbToDay02}</span>,
        },
        {
            name: <span>{tagNameEVC.VbLastDay}</span>,
            evc1901: <span style={{}}>{VbLastDay01}</span>,
            evc1902: <span style={{}}> {VbLastDay02}</span>,
        },
        {
            name: <span>{tagNameEVC.VmToday}</span>,
            evc1901: <span style={{}}>{VmToday01}</span>,
            evc1902: <span style={{}}> {VmToday02}</span>,
        },
        {
            name: <span>{tagNameEVC.VmLastDay}</span>,
            evc1901: <span style={{}}>{VmLastDay01}</span>,
            evc1902: <span style={{}}> {VmLastDay02}</span>,
        },
        {
            name: <span>{tagNameEVC.ReBattery}</span>,
            evc1901: <span style={{}}>{ReBattery01}</span>,
            evc1902: <span style={{}}> {ReBattery02}</span>,
        },
    ];

    const dataPLC = [
        {
            name: <span>{tagNamePLC.PT03}</span>,
            PLC: <span style={{}}>{PT03}</span>,
        },
        {
            name: <span>{tagNamePLC.GD1}</span>,
            PLC: <span style={{}}>{GD1}</span>,
        },
        {
            name: <span>{tagNamePLC.GD2}</span>,
            PLC: <span style={{}}>{GD2}</span>,
        },
        {
            name: <span>{tagNamePLC.GD3}</span>,
            PLC: <span style={{}}>{GD3}</span>,
        },
        {
            name: <span>{tagNamePLC.DO_SV1}</span>,
            PLC: <span style={{}}>{DataSV_1}</span>,
        },
        {
            name: <span>{tagNamePLC.ZSC}</span>,
            PLC: <span style={{}}>{DataZSC_1}</span>,
        },
        {
            name: <span>{tagNamePLC.ZSO}</span>,
            PLC: <span style={{}}>{DataZSO_1}</span>,
        },
        {
            name: <span>{tagNamePLC.UPS_BATTERY}</span>,
            PLC: <span style={{}}>{DataBattery}</span>,
        },
        {
            name: <span>{tagNamePLC.UPS_CHARGING}</span>,
            PLC: <span style={{}}>{DataCharging}</span>,
        },
        {
            name: <span>{tagNamePLC.UPS_ALARM}</span>,
            PLC: <span style={{}}>{DataAlarm}</span>,
        },
        {
            name: <span>{tagNamePLC.UPS_MODE}</span>,
            PLC: <span style={{}}>{DataMode}</span>,
        },
        {
            name: <span>{tagNamePLC.SELECT_SW}</span>,
            PLC: <span style={{}}>{DataSelectSW}</span>,
        },
        {
            name: <span>{tagNamePLC.RESET}</span>,
            PLC: <span style={{}}>{DataReset}</span>,
        },
        {
            name: <span>{tagNamePLC.EmergencyStop_NO}</span>,
            PLC: <span style={{}}>{DataEmergencyNO}</span>,
        },
        {
            name: <span>{tagNamePLC.EmergencyStop_NC}</span>,
            PLC: <span style={{}}>{DataEmergencyNC}</span>,
        },
      
        {
            name: <span>{tagNamePLC.HORN}</span>,
            PLC: <span style={{}}>{DataHorn}</span>,
        },
        {
            name: <span>{tagNamePLC.BEACON}</span>,
            PLC: <span style={{}}>{DataBeacon}</span>,
        },
        {
            name: <span>{tagNamePLC.MAP}</span>,
            PLC: <span style={{}}>{DataMap}</span>,
        },
    ];

    return (
        <div>
            <div style={{ width: "49%" }}>
                <div
                    style={{
                        background: "#64758B",
                        color: "white",
                        borderRadius: "10px 10px 0 0",
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
                            OTSUKA
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 600 }}>
                            {" "}
                            Connection
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px 0px 5px",
                        }}
                    >
                        <div style={{ width: "50%" }}>
                            {" "}
                            Otsuka Thang Nutrition Co. Ltd
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "50%",
                            }}
                        >
                            {" "}
                            <div>
                                Status :{" "}
                                {EVC_STT01 === "0" ? (
                                    <span style={{ color: "red" }}>
                                        {" "}
                                        Disconnect

                                    </span>
                                ) : (
                                    <span style={{ color: "#3DE644" }}>
                                        {" "}
                                        Good

                                    </span>
                                )}{" "}
                            </div>{" "}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px 5px 5px",
                        }}
                    >
                        <div style={{ width: "50%" }}>
                            Phu My 3 Specialized Industrial Park
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "50%",
                            }}
                        >
                            {" "}
                            <div>Updated on : {timeUpdate} </div>{" "}
                        </div>
                    </div>
                </div>
                <DataTable
                    value={dataEVC}
                    size="small"
                >
                    <Column field="name" header="EVC Parameter"></Column>
                    <Column
                        field="evc1901"
                        header={
                            <span
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                EVC-1901
                            </span>
                        }
                    ></Column>
                    <Column field="evc1902" header="EVC-1902"></Column>
                </DataTable>
                
                    <div>
                    <DataTable
                    value={dataPLC}
                    size="small"
                >
                    <Column field="name" header="PLC Parameter"></Column>
                    <Column
                        field="PLC"
                        header={
                            <span
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                S7-1200
                            </span>
                        }
                    ></Column>
                </DataTable>
               
                </div>
            </div>

            
      
     
        </div>
    );
}
