import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./demoFlowOTS.css";
// import tingting from "./NotificationCuu.mp3";

import Image from "next/image";
import BallValue01 from "../ReactFlow/BallValue01";
import BallValue02 from "../ReactFlow/BallValue02";
import BallValue03 from "../ReactFlow/BallValue03";
import BallValue04 from "../ReactFlow/BallValue04";
import BallValue05 from "../ReactFlow/BallValue05";
import BallValue06 from "../ReactFlow/BallValue06";
import BallValue07 from "../ReactFlow/BallValue07";
import BallValue08 from "../ReactFlow/BallValue08";
import BallValue09 from "../ReactFlow/BallValue09";
import BallValue10 from "../ReactFlow/BallValue10";
import PCV_01_Otsuka from "../ReactFlow/PCV01_Otsuka";
import PCV_02_Otsuka from "../ReactFlow/PCV02_Otsuka";
import { readToken } from "@/service/localStorage";
import { id_LGDS } from "../../data-table-device/ID-DEVICE/IdDevice";
import BallValueCenter from "../ReactFlow/BallValueCenter";
import { OverlayPanel } from "primereact/overlaypanel";
import {
    ArrowLeftLGDS,
    ArrowRightLGDS,
    BallVavle,
    BlackTriangle,
    BlackTriangleRight,
    FIQ,
    PCV_LGDS,
    PTV,
    SVD_NO,
    tankGas,
    VavleWay,
    WhiteTriangleRight,
} from "./iconSVG";
import PSV01_Otsuka from "../ReactFlow/PSV01_Otsuka";
import { Dialog } from "primereact/dialog";
import { httpApi } from "@/api/http.api";
import BallVavlePSV from "../ReactFlow/BallVavlePSV";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import BallValueFirst from "../ReactFlow/BallValueFirst";
import BallValueLast from "../ReactFlow/BallValueLast";
import { edgePRU } from "../../PRU/GraphicPRU/edgePRU";
import { edgeZOVC } from "./edgeZOVC";
import { GetTelemetry_ZOVC, PostTelemetry_ZOVC } from "./Api_ZOVC";
import BallVavleSDV_TOP from "../ReactFlow/BallVavleSDV_TOP";
import BallVavleSDV_TOP1 from "../ReactFlow/BallVavleSDV_TOP";
import BallVavleSDV_BOTTOM1 from "../ReactFlow/BallVavleSDV_BOTTOM";
import PSV02_Otsuka from "../ReactFlow/PSV02_Otsuka";
import BallValue11 from "../ReactFlow/BallValue11";
import BallValue12 from "../ReactFlow/BallValue12";
import BallValue13 from "../ReactFlow/BallValue13";
import BallValueSDV1 from "../ReactFlow/BallValueSDV1";
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
interface StateMap2 {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";
const backGroundData = "white";
export const borderBox = "white";

export const colorNameValue = "black";
export const colorData = "green";
export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "orange";

export default function GraphicStaion1() {
    const [visible, setVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [active, setActive] = useState<any>();

    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);
    const [data, setData] = useState<any[]>([]);

    const [FC_Conn_STTValue, setFC_Conn_STTValue] = useState<string | null>(
        null
    );
    const [Conn_STT, setConn_STT] = useState<string | null>(null);
    const [Conn_STTValue, setConn_STTValue] = useState<string | null>(null);
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);

    const toast = useRef<Toast>(null);
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    //=====================================================================================

    const [resetKey, setResetKey] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const [cmdId, setCmdId] = useState(1); // Track cmdId for requests

    const connectWebSocket = (cmdId: number) => {
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_LGDS,
                    scope: "LATEST_TELEMETRY",
                    cmdId: cmdId, // Use dynamic cmdId for new requests
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

            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData((prevData) => [...prevData, dataReceived]); // Update data state with new message
                    const keys = Object.keys(dataReceived.data);

                    const stateMap: StateMap = {
                        FC_Lithium_Battery_Status: setFC_Lithium_Battery_Status,
                        FC_Battery_Voltage: setFC_Battery_Voltage,
                        FC_System_Voltage: setFC_System_Voltage,
                        FC_Charger_Voltage: setFC_Charger_Voltage,

                        FC_01_Current_Values_Flow_Rate:
                            setFC_01_Current_Values_Flow_Rate,
                        FC_01_Current_Values_Uncorrected_Flow_Rate:
                            setFC_01_Current_Values_Uncorrected_Flow_Rate,
                        FC_01_Accumulated_Values_Uncorrected_Volume:
                            setFC_01_Accumulated_Values_Uncorrected_Volume,
                        FC_01_Accumulated_Values_Volume:
                            setFC_01_Accumulated_Values_Volume,
                        FC_01_Current_Values_Static_Pressure:
                            setFC_01_Current_Values_Static_Pressure,

                        FC_01_Current_Values_Temperature:
                            setFC_01_Current_Values_Temperature,
                        FC_01_Yesterday_Values_Uncorrected_Volume:
                            setFC_01_Yesterday_Values_Uncorrected_Volume,
                        FC_01_Yesterday_Values_Volume:
                            setFC_01_Yesterday_Values_Volume,
                        FC_01_Today_Values_Uncorrected_Volume:
                            setFC_01_Today_Values_Uncorrected_Volume,
                        FC_01_Today_Values_Volume: setFC_01_Today_Values_Volume,

                        FC_02_Current_Values_Flow_Rate:
                            setFC_02_Current_Values_Flow_Rate,
                        FC_02_Current_Values_Uncorrected_Flow_Rate:
                            setFC_02_Current_Values_Uncorrected_Flow_Rate,
                        FC_02_Accumulated_Values_Uncorrected_Volume:
                            setFC_02_Accumulated_Values_Uncorrected_Volume,
                        FC_02_Accumulated_Values_Volume:
                            setFC_02_Accumulated_Values_Volume,
                        FC_02_Current_Values_Static_Pressure:
                            setFC_02_Current_Values_Static_Pressure,

                        FC_02_Current_Values_Temperature:
                            setFC_02_Current_Values_Temperature,
                        FC_02_Yesterday_Values_Uncorrected_Volume:
                            setFC_02_Yesterday_Values_Uncorrected_Volume,
                        FC_02_Yesterday_Values_Volume:
                            setFC_02_Yesterday_Values_Volume,
                        FC_02_Today_Values_Uncorrected_Volume:
                            setFC_02_Today_Values_Uncorrected_Volume,
                        FC_02_Today_Values_Volume: setFC_02_Today_Values_Volume,

                        PT_1003: setPT_1003,

                        GD1: setGD1,
                        GD2: setGD2,
                        PT1: setPT1,
                        DI_ZSO_1: setDI_ZSO_1,
                        DI_ZSC_1: setDI_ZSC_1,

                        DI_ZSO_2: setDI_ZSO_2,
                        DI_ZSC_2: setDI_ZSC_2,

                        DI_UPS_BATTERY: setDI_UPS_BATTERY,
                        DI_UPS_CHARGING: setDI_UPS_CHARGING,
                        DI_UPS_ALARM: setDI_UPS_ALARM,
                        UPS_Mode: setUPS_Mode,
                        DI_MAP_1: setDI_MAP_1,

                        DI_SELECT_SW: setDI_SELECT_SW,
                        DI_RESET: setDI_RESET,
                        Emergency_NO: setEmergency_NO,
                        Emergency_NC: setEmergency_NC,
                        DI_SD_1: setDI_SD_1,
                        DO_HR_01: setDO_HR_01,
                        DO_BC_01: setDO_BC_01,
                        DO_SV_01: setDO_SV_01,
                        DO_SV_02: setDO_SV_02,

                        FC_Conn_STT: setFC_Conn_STT,
                        PLC_Conn_STT: setConn_STT,
                    };

                    const valueStateMap: ValueStateMap = {
                        FC_Conn_STT: setFC_Conn_STTValue,
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
                                .padStart(2, "0")} ${date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}:${date
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`;
                            valueStateMap[key]?.(formattedDate);
                        }
                        fetchData();
                    });
                }
            };
        }
    };
    useEffect(() => {
        fetchData();
    }, [isOnline]);

    useEffect(() => {
        if (isOnline) {
            // Initial connection
            connectWebSocket(cmdId);
            fetchData();
        }

        return () => {
            if (ws.current) {
                console.log("Cleaning up WebSocket connection.");
                ws.current.close();
            }
        };
    }, [isOnline, cmdId]); // Reconnect if isOnline or cmdId changes

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            console.log("Back online. Reconnecting WebSocket with new cmdId.");
            setCmdId((prevCmdId) => prevCmdId + 1); // Increment cmdId on reconnect
            fetchData();
        };

        const handleOffline = () => {
            setIsOnline(false);
            console.log("Offline detected. Closing WebSocket.");
            if (ws.current) {
                ws.current.close(); // Close WebSocket when offline
            }
        };

        // Attach event listeners for online/offline status
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            // Cleanup event listeners on unmount
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    //============================GD =============================

    // ===================================================================================================================

    const [FC_Lithium_Battery_Status, setFC_Lithium_Battery_Status] = useState<
        string | null
    >(null);

    const [FC_Lithium_Battery_Status_High, setFC_Lithium_Battery_Status_High] =
        useState<number | null>(null);
    const [FC_Lithium_Battery_Status_Low, setFC_Lithium_Battery_Status_Low] =
        useState<number | null>(null);
    const [
        exceedThresholdFC_Lithium_Battery_Status,
        setExceedThresholdFC_Lithium_Battery_Status,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_Lithium_Battery_Status,
        setMaintainFC_Lithium_Battery_Status,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_Lithium_Battery_StatusValue = parseFloat(
            FC_Lithium_Battery_Status as any
        );
        const highValue = FC_Lithium_Battery_Status_High ?? NaN;
        const lowValue = FC_Lithium_Battery_Status_Low ?? NaN;

        if (
            !isNaN(FC_Lithium_Battery_StatusValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_Lithium_Battery_Status
        ) {
            setExceedThresholdFC_Lithium_Battery_Status(
                FC_Lithium_Battery_StatusValue >= highValue ||
                    FC_Lithium_Battery_StatusValue <= lowValue
            );
        }
    }, [
        FC_Lithium_Battery_Status,
        FC_Lithium_Battery_Status_High,
        FC_Lithium_Battery_Status_Low,
        maintainFC_Lithium_Battery_Status,
    ]);

    // ===================================================================================================================

    const [FC_Battery_Voltage, setFC_Battery_Voltage] = useState<string | null>(
        null
    );
    const [FC_Battery_Voltage_High, setFC_Battery_Voltage_High] = useState<
        number | null
    >(null);
    const [FC_Battery_Voltage_Low, setFC_Battery_Voltage_Low] = useState<
        number | null
    >(null);
    const [
        exceedThresholdFC_Battery_Voltage,
        setExceedThresholdFC_Battery_Voltage,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainFC_Battery_Voltage, setMaintainFC_Battery_Voltage] =
        useState<boolean>(false);

    useEffect(() => {
        const FC_Battery_VoltageValue = parseFloat(FC_Battery_Voltage as any);
        const highValue = FC_Battery_Voltage_High ?? NaN;
        const lowValue = FC_Battery_Voltage_Low ?? NaN;

        if (
            !isNaN(FC_Battery_VoltageValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_Battery_Voltage
        ) {
            setExceedThresholdFC_Battery_Voltage(
                FC_Battery_VoltageValue >= highValue ||
                    FC_Battery_VoltageValue <= lowValue
            );
        }
    }, [
        FC_Battery_Voltage,
        FC_Battery_Voltage_High,
        FC_Battery_Voltage_Low,
        maintainFC_Battery_Voltage,
    ]);

    // ===================================================================================================================

    const [FC_System_Voltage, setFC_System_Voltage] = useState<string | null>(
        null
    );

    const [FC_System_Voltage_High, setFC_System_Voltage_High] = useState<
        number | null
    >(null);
    const [FC_System_Voltage_Low, setFC_System_Voltage_Low] = useState<
        number | null
    >(null);
    const [
        exceedThresholdFC_System_Voltage,
        setExceedThresholdFC_System_Voltage,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainFC_System_Voltage, setMaintainFC_System_Voltage] =
        useState<boolean>(false);

    useEffect(() => {
        const FC_System_VoltageValue = parseFloat(FC_System_Voltage as any);
        const highValue = FC_System_Voltage_High ?? NaN;
        const lowValue = FC_System_Voltage_Low ?? NaN;

        if (
            !isNaN(FC_System_VoltageValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_System_Voltage
        ) {
            setExceedThresholdFC_System_Voltage(
                FC_System_VoltageValue >= highValue ||
                    FC_System_VoltageValue <= lowValue
            );
        }
    }, [
        FC_System_Voltage,
        FC_System_Voltage_High,
        FC_System_Voltage_Low,
        maintainFC_System_Voltage,
    ]);

    // ===================================================================================================================

    const [FC_Charger_Voltage, setFC_Charger_Voltage] = useState<string | null>(
        null
    );
    const [FC_Charger_Voltage_High, setFC_Charger_Voltage_High] = useState<
        number | null
    >(null);
    const [FC_Charger_Voltage_Low, setFC_Charger_Voltage_Low] = useState<
        number | null
    >(null);
    const [
        exceedThresholdFC_Charger_Voltage,
        setExceedThresholdFC_Charger_Voltage,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainFC_Charger_Voltage, setMaintainFC_Charger_Voltage] =
        useState<boolean>(false);

    useEffect(() => {
        const FC_Charger_VoltageValue = parseFloat(FC_Charger_Voltage as any);
        const highValue = FC_Charger_Voltage_High ?? NaN;
        const lowValue = FC_Charger_Voltage_Low ?? NaN;

        if (
            !isNaN(FC_Charger_VoltageValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_Charger_Voltage
        ) {
            setExceedThresholdFC_Charger_Voltage(
                FC_Charger_VoltageValue >= highValue ||
                    FC_Charger_VoltageValue <= lowValue
            );
        }
    }, [
        FC_Charger_Voltage,
        FC_Charger_Voltage_High,
        FC_Charger_Voltage_Low,
        maintainFC_Charger_Voltage,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Current_Values_Temperature,
        setFC_02_Current_Values_Temperature,
    ] = useState<string | null>(null);

    const [
        FC_02_Current_Values_Temperature_High,
        setFC_02_Current_Values_Temperature_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Temperature_Low,
        setFC_02_Current_Values_Temperature_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Temperature,
        setExceedThresholdFC_02_Current_Values_Temperature,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Temperature,
        setMaintainFC_02_Current_Values_Temperature,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_TemperatureValue = parseFloat(
            FC_02_Current_Values_Temperature as any
        );
        const highValue = FC_02_Current_Values_Temperature_High ?? NaN;
        const lowValue = FC_02_Current_Values_Temperature_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_TemperatureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Temperature
        ) {
            setExceedThresholdFC_02_Current_Values_Temperature(
                FC_02_Current_Values_TemperatureValue >= highValue ||
                    FC_02_Current_Values_TemperatureValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Temperature,
        FC_02_Current_Values_Temperature_High,
        FC_02_Current_Values_Temperature_Low,
        maintainFC_02_Current_Values_Temperature,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Current_Values_Static_Pressure,
        setFC_02_Current_Values_Static_Pressure,
    ] = useState<string | null>(null);

    const [
        FC_02_Current_Values_Static_Pressure_High,
        setFC_02_Current_Values_Static_Pressure_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Static_Pressure_Low,
        setFC_02_Current_Values_Static_Pressure_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Static_Pressure,
        setExceedThresholdFC_02_Current_Values_Static_Pressure,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Static_Pressure,
        setMaintainFC_02_Current_Values_Static_Pressure,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Static_PressureValue = parseFloat(
            FC_02_Current_Values_Static_Pressure as any
        );
        const highValue = FC_02_Current_Values_Static_Pressure_High ?? NaN;
        const lowValue = FC_02_Current_Values_Static_Pressure_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Static_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Static_Pressure
        ) {
            setExceedThresholdFC_02_Current_Values_Static_Pressure(
                FC_02_Current_Values_Static_PressureValue >= highValue ||
                    FC_02_Current_Values_Static_PressureValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Static_Pressure,
        FC_02_Current_Values_Static_Pressure_High,
        FC_02_Current_Values_Static_Pressure_Low,
        maintainFC_02_Current_Values_Static_Pressure,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Accumulated_Values_Uncorrected_Volume,
        setFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_02_Accumulated_Values_Uncorrected_Volume_High,
        setFC_02_Accumulated_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Accumulated_Values_Uncorrected_Volume_Low,
        setFC_02_Accumulated_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume,
        setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Accumulated_Values_Uncorrected_Volume,
        setMaintainFC_02_Accumulated_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(
            FC_02_Accumulated_Values_Uncorrected_Volume as any
        );
        const highValue =
            FC_02_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_02_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Accumulated_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Accumulated_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume(
                FC_02_Accumulated_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_02_Accumulated_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Accumulated_Values_Uncorrected_Volume,
        FC_02_Accumulated_Values_Uncorrected_Volume_High,
        FC_02_Accumulated_Values_Uncorrected_Volume_Low,
        maintainFC_02_Accumulated_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Accumulated_Values_Volume,
        setFC_02_Accumulated_Values_Volume,
    ] = useState<string | null>(null);
    const [
        FC_02_Accumulated_Values_Volume_High,
        setFC_02_Accumulated_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Accumulated_Values_Volume_Low,
        setFC_02_Accumulated_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Accumulated_Values_Volume,
        setExceedThresholdFC_02_Accumulated_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Accumulated_Values_Volume,
        setMaintainFC_02_Accumulated_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Accumulated_Values_VolumeValue = parseFloat(
            FC_02_Accumulated_Values_Volume as any
        );
        const highValue = FC_02_Accumulated_Values_Volume_High ?? NaN;
        const lowValue = FC_02_Accumulated_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Accumulated_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Accumulated_Values_Volume
        ) {
            setExceedThresholdFC_02_Accumulated_Values_Volume(
                FC_02_Accumulated_Values_VolumeValue >= highValue ||
                    FC_02_Accumulated_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Accumulated_Values_Volume,
        FC_02_Accumulated_Values_Volume_High,
        FC_02_Accumulated_Values_Volume_Low,
        maintainFC_02_Accumulated_Values_Volume,
    ]);

    // ===================================================================================================================

    const [FC_02_Current_Values_Flow_Rate, setFC_02_Current_Values_Flow_Rate] =
        useState<string | null>(null);

    const [
        FC_02_Current_Values_Flow_Rate_High,
        setFC_02_Current_Values_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Flow_Rate_Low,
        setFC_02_Current_Values_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Flow_Rate,
        setExceedThresholdFC_02_Current_Values_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Flow_Rate,
        setMaintainFC_02_Current_Values_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Flow_RateValue = parseFloat(
            FC_02_Current_Values_Flow_Rate as any
        );
        const highValue = FC_02_Current_Values_Flow_Rate_High ?? NaN;
        const lowValue = FC_02_Current_Values_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Flow_Rate
        ) {
            setExceedThresholdFC_02_Current_Values_Flow_Rate(
                FC_02_Current_Values_Flow_RateValue >= highValue ||
                    FC_02_Current_Values_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Flow_Rate,
        FC_02_Current_Values_Flow_Rate_High,
        FC_02_Current_Values_Flow_Rate_Low,
        maintainFC_02_Current_Values_Flow_Rate,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate,
        setFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<string | null>(null);

    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate_High,
        setFC_02_Current_Values_Uncorrected_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Current_Values_Uncorrected_Flow_Rate_Low,
        setFC_02_Current_Values_Uncorrected_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate,
        setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
        setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Current_Values_Uncorrected_Flow_RateValue = parseFloat(
            FC_02_Current_Values_Uncorrected_Flow_Rate as any
        );
        const highValue =
            FC_02_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
        const lowValue = FC_02_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_02_Current_Values_Uncorrected_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
        ) {
            setExceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate(
                FC_02_Current_Values_Uncorrected_Flow_RateValue >= highValue ||
                    FC_02_Current_Values_Uncorrected_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_02_Current_Values_Uncorrected_Flow_Rate,
        FC_02_Current_Values_Uncorrected_Flow_Rate_High,
        FC_02_Current_Values_Uncorrected_Flow_Rate_Low,
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
    ]);

    // ===================================================================================================================

    const [
        FC_02_Today_Values_Uncorrected_Volume,
        setFC_02_Today_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);
    const [
        FC_02_Today_Values_Uncorrected_Volume_High,
        setFC_02_Today_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Today_Values_Uncorrected_Volume_Low,
        setFC_02_Today_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Today_Values_Uncorrected_Volume,
        setExceedThresholdFC_02_Today_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Today_Values_Uncorrected_Volume,
        setMaintainFC_02_Today_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Today_Values_Uncorrected_VolumeValue = parseFloat(
            FC_02_Today_Values_Uncorrected_Volume as any
        );
        const highValue = FC_02_Today_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_02_Today_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Today_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Today_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_02_Today_Values_Uncorrected_Volume(
                FC_02_Today_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_02_Today_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Today_Values_Uncorrected_Volume,
        FC_02_Today_Values_Uncorrected_Volume_High,
        FC_02_Today_Values_Uncorrected_Volume_Low,
        maintainFC_02_Today_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================

    const [FC_02_Today_Values_Volume, setFC_02_Today_Values_Volume] = useState<
        string | null
    >(null);
    const [FC_02_Today_Values_Volume_High, setFC_02_Today_Values_Volume_High] =
        useState<number | null>(null);
    const [FC_02_Today_Values_Volume_Low, setFC_02_Today_Values_Volume_Low] =
        useState<number | null>(null);
    const [
        exceedThresholdFC_02_Today_Values_Volume,
        setExceedThresholdFC_02_Today_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Today_Values_Volume,
        setMaintainFC_02_Today_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Today_Values_VolumeValue = parseFloat(
            FC_02_Today_Values_Volume as any
        );
        const highValue = FC_02_Today_Values_Volume_High ?? NaN;
        const lowValue = FC_02_Today_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Today_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Today_Values_Volume
        ) {
            setExceedThresholdFC_02_Today_Values_Volume(
                FC_02_Today_Values_VolumeValue >= highValue ||
                    FC_02_Today_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Today_Values_Volume,
        FC_02_Today_Values_Volume_High,
        FC_02_Today_Values_Volume_Low,
        maintainFC_02_Today_Values_Volume,
    ]);

    // ===================================================================================================================

    const [FC_02_Yesterday_Values_Volume, setFC_02_Yesterday_Values_Volume] =
        useState<string | null>(null);
    const [
        FC_02_Yesterday_Values_Volume_High,
        setFC_02_Yesterday_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Yesterday_Values_Volume_Low,
        setFC_02_Yesterday_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Yesterday_Values_Volume,
        setExceedThresholdFC_02_Yesterday_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Yesterday_Values_Volume,
        setMaintainFC_02_Yesterday_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_02_Yesterday_Values_VolumeValue = parseFloat(
            FC_02_Yesterday_Values_Volume as any
        );
        const highValue = FC_02_Yesterday_Values_Volume_High ?? NaN;
        const lowValue = FC_02_Yesterday_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_02_Yesterday_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_02_Yesterday_Values_Volume
        ) {
            setExceedThresholdFC_02_Yesterday_Values_Volume(
                FC_02_Yesterday_Values_VolumeValue >= highValue ||
                    FC_02_Yesterday_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_02_Yesterday_Values_Volume,
        FC_02_Yesterday_Values_Volume_High,
        FC_02_Yesterday_Values_Volume_Low,
        maintainFC_02_Yesterday_Values_Volume,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [
        FC_02_Yesterday_Values_Uncorrected_Volume,
        setFC_02_Yesterday_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_02_Yesterday_Values_Uncorrected_Volume_High,
        setFC_02_Yesterday_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_02_Yesterday_Values_Uncorrected_Volume_Low,
        setFC_02_Yesterday_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume,
        setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_02_Yesterday_Values_Uncorrected_Volume,
        setMaintainFC_02_Yesterday_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof FC_02_Yesterday_Values_Uncorrected_Volume_High ===
                "string" &&
            typeof FC_02_Yesterday_Values_Uncorrected_Volume_Low === "string" &&
            FC_02_Yesterday_Values_Uncorrected_Volume !== null &&
            maintainFC_02_Yesterday_Values_Uncorrected_Volume === false
        ) {
            const highValue = parseFloat(
                FC_02_Yesterday_Values_Uncorrected_Volume_High
            );
            const lowValue = parseFloat(
                FC_02_Yesterday_Values_Uncorrected_Volume_Low
            );
            const FC_02_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(
                FC_02_Yesterday_Values_Uncorrected_Volume
            );

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(FC_02_Yesterday_Values_Uncorrected_VolumeValue)
            ) {
                if (
                    highValue <=
                        FC_02_Yesterday_Values_Uncorrected_VolumeValue ||
                    FC_02_Yesterday_Values_Uncorrected_VolumeValue <= lowValue
                ) {
                    setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume(
                        true
                    );
                } else {
                    setExceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume(
                        false
                    );
                }
            }
        }
    }, [
        FC_02_Yesterday_Values_Uncorrected_Volume_High,
        FC_02_Yesterday_Values_Uncorrected_Volume,
        FC_02_Yesterday_Values_Uncorrected_Volume_Low,
        maintainFC_02_Yesterday_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================
    // ===================================================================================================================

    const [GD1, setGD1] = useState<string | null>(null);
    const [GD1_High, setGD1_High] = useState<number | null>(null);
    const [GD1_Low, setGD1_Low] = useState<number | null>(null);
    const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainGD1, setMaintainGD1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof GD1_High === "string" &&
            typeof GD1_Low === "string" &&
            GD1 !== null &&
            maintainGD1 === false
        ) {
            const highValue = parseFloat(GD1_High);
            const lowValue = parseFloat(GD1_Low);
            const GD1Value = parseFloat(GD1);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1Value)) {
                if (highValue <= GD1Value || GD1Value <= lowValue) {
                    setExceedThresholdGD1(true);
                } else {
                    setExceedThresholdGD1(false);
                }
            }
        }
    }, [GD1_High, GD1, GD1_Low, maintainGD1]);

    // ===================================================================================================================

    const [GD2, setGD2] = useState<string | null>(null);
    const [GD2_High, setGD2_High] = useState<number | null>(null);
    const [GD2_Low, setGD2_Low] = useState<number | null>(null);
    const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainGD2, setMaintainGD2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof GD2_High === "string" &&
            typeof GD2_Low === "string" &&
            GD2 !== null &&
            maintainGD2 === false
        ) {
            const highValue = parseFloat(GD2_High);
            const lowValue = parseFloat(GD2_Low);
            const GD2Value = parseFloat(GD2);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2Value)) {
                if (highValue <= GD2Value || GD2Value <= lowValue) {
                    setExceedThresholdGD2(true);
                } else {
                    setExceedThresholdGD2(false);
                }
            }
        }
    }, [GD2_High, GD2, GD2_Low, maintainGD2]);

    // ===================================================================================================================

    const [PT1, setPT1] = useState<string | null>(null);

    const [PT1_High, setPT1_High] = useState<number | null>(null);
    const [PT1_Low, setPT1_Low] = useState<number | null>(null);
    const [exceedThresholdPT1, setExceedThresholdPT1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPT1, setMaintainPT1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof PT1_High === "string" &&
            typeof PT1_Low === "string" &&
            PT1 !== null &&
            maintainPT1 === false
        ) {
            const highValue = parseFloat(PT1_High);
            const lowValue = parseFloat(PT1_Low);
            const PT1Value = parseFloat(PT1);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT1Value)) {
                if (highValue <= PT1Value || PT1Value <= lowValue) {
                    setExceedThresholdPT1(true);
                } else {
                    setExceedThresholdPT1(false);
                }
            }
        }
    }, [PT1_High, PT1, PT1_Low, maintainPT1]);

    // ===================================================================================================================

    const [DI_ZSO_1, setDI_ZSO_1] = useState<string | null>(null);
    const [DI_ZSO_1_High, setDI_ZSO_1_High] = useState<number | null>(null);
    const [DI_ZSO_1_Low, setDI_ZSO_1_Low] = useState<number | null>(null);
    const [exceedThresholdDI_ZSO_1, setExceedThresholdDI_ZSO_1] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_ZSO_1, setMaintainDI_ZSO_1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_ZSO_1_High === "string" &&
            typeof DI_ZSO_1_Low === "string" &&
            DI_ZSO_1 !== null &&
            maintainDI_ZSO_1 === false
        ) {
            const highValue = parseFloat(DI_ZSO_1_High);
            const lowValue = parseFloat(DI_ZSO_1_Low);
            const DI_ZSO_1Value = parseFloat(DI_ZSO_1);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_ZSO_1Value)
            ) {
                if (highValue <= DI_ZSO_1Value || DI_ZSO_1Value <= lowValue) {
                    setExceedThresholdDI_ZSO_1(true);
                } else {
                    setExceedThresholdDI_ZSO_1(false);
                }
            }
        }
    }, [DI_ZSO_1_High, DI_ZSO_1, DI_ZSO_1_Low, maintainDI_ZSO_1]);

    // ===================================================================================================================

    const [DI_ZSC_1, setDI_ZSC_1] = useState<string | null>(null);
    const [DI_ZSC_1_High, setDI_ZSC_1_High] = useState<number | null>(null);
    const [DI_ZSC_1_Low, setDI_ZSC_1_Low] = useState<number | null>(null);
    const [exceedThresholdDI_ZSC_1, setExceedThresholdDI_ZSC_1] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_ZSC_1, setMaintainDI_ZSC_1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_ZSC_1_High === "string" &&
            typeof DI_ZSC_1_Low === "string" &&
            DI_ZSC_1 !== null &&
            maintainDI_ZSC_1 === false
        ) {
            const highValue = parseFloat(DI_ZSC_1_High);
            const lowValue = parseFloat(DI_ZSC_1_Low);
            const DI_ZSC_1Value = parseFloat(DI_ZSC_1);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_ZSC_1Value)
            ) {
                if (highValue <= DI_ZSC_1Value || DI_ZSC_1Value <= lowValue) {
                    setExceedThresholdDI_ZSC_1(true);
                } else {
                    setExceedThresholdDI_ZSC_1(false);
                }
            }
        }
    }, [DI_ZSC_1_High, DI_ZSC_1, DI_ZSC_1_Low, maintainDI_ZSC_1]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_ZSO_2, setDI_ZSO_2] = useState<string | null>(null);
    const [DI_ZSO_2_High, setDI_ZSO_2_High] = useState<number | null>(null);
    const [DI_ZSO_2_Low, setDI_ZSO_2_Low] = useState<number | null>(null);
    const [exceedThresholdDI_ZSO_2, setExceedThresholdDI_ZSO_2] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_ZSO_2, setMaintainDI_ZSO_2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_ZSO_2_High === "string" &&
            typeof DI_ZSO_2_Low === "string" &&
            DI_ZSO_2 !== null &&
            maintainDI_ZSO_2 === false
        ) {
            const highValue = parseFloat(DI_ZSO_2_High);
            const lowValue = parseFloat(DI_ZSO_2_Low);
            const DI_ZSO_2Value = parseFloat(DI_ZSO_2);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_ZSO_2Value)
            ) {
                if (highValue <= DI_ZSO_2Value || DI_ZSO_2Value <= lowValue) {
                    setExceedThresholdDI_ZSO_2(true);
                } else {
                    setExceedThresholdDI_ZSO_2(false);
                }
            }
        }
    }, [DI_ZSO_2_High, DI_ZSO_2, DI_ZSO_2_Low, maintainDI_ZSO_2]);

    // ===================================================================================================================

    const [DI_ZSC_2, setDI_ZSC_2] = useState<string | null>(null);
    const [DI_ZSC_2_High, setDI_ZSC_2_High] = useState<number | null>(null);
    const [DI_ZSC_2_Low, setDI_ZSC_2_Low] = useState<number | null>(null);
    const [exceedThresholdDI_ZSC_2, setExceedThresholdDI_ZSC_2] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_ZSC_2, setMaintainDI_ZSC_2] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_ZSC_2_High === "string" &&
            typeof DI_ZSC_2_Low === "string" &&
            DI_ZSC_2 !== null &&
            maintainDI_ZSC_2 === false
        ) {
            const highValue = parseFloat(DI_ZSC_2_High);
            const lowValue = parseFloat(DI_ZSC_2_Low);
            const DI_ZSC_2Value = parseFloat(DI_ZSC_2);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_ZSC_2Value)
            ) {
                if (highValue <= DI_ZSC_2Value || DI_ZSC_2Value <= lowValue) {
                    setExceedThresholdDI_ZSC_2(true);
                } else {
                    setExceedThresholdDI_ZSC_2(false);
                }
            }
        }
    }, [DI_ZSC_2_High, DI_ZSC_2, DI_ZSC_2_Low, maintainDI_ZSC_2]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_MAP_1, setDI_MAP_1] = useState<string | null>(null);
    const [DI_MAP_1_High, setDI_MAP_1_High] = useState<number | null>(null);
    const [DI_MAP_1_Low, setDI_MAP_1_Low] = useState<number | null>(null);
    const [exceedThresholdDI_MAP_1, setExceedThresholdDI_MAP_1] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_MAP_1, setMaintainDI_MAP_1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_MAP_1_High === "string" &&
            typeof DI_MAP_1_Low === "string" &&
            DI_MAP_1 !== null &&
            maintainDI_MAP_1 === false
        ) {
            const highValue = parseFloat(DI_MAP_1_High);
            const lowValue = parseFloat(DI_MAP_1_Low);
            const DI_MAP_1Value = parseFloat(DI_MAP_1);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_MAP_1Value)
            ) {
                if (highValue <= DI_MAP_1Value || DI_MAP_1Value <= lowValue) {
                    setExceedThresholdDI_MAP_1(true);
                } else {
                    setExceedThresholdDI_MAP_1(false);
                }
            }
        }
    }, [DI_MAP_1_High, DI_MAP_1, DI_MAP_1_Low, maintainDI_MAP_1]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_UPS_CHARGING, setDI_UPS_CHARGING] = useState<string | null>(null);
    const [DI_UPS_CHARGING_High, setDI_UPS_CHARGING_High] = useState<
        number | null
    >(null);
    const [DI_UPS_CHARGING_Low, setDI_UPS_CHARGING_Low] = useState<
        number | null
    >(null);
    const [exceedThresholdDI_UPS_CHARGING, setExceedThresholdDI_UPS_CHARGING] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_UPS_CHARGING, setMaintainDI_UPS_CHARGING] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_UPS_CHARGING_High === "string" &&
            typeof DI_UPS_CHARGING_Low === "string" &&
            DI_UPS_CHARGING !== null &&
            maintainDI_UPS_CHARGING === false
        ) {
            const highValue = parseFloat(DI_UPS_CHARGING_High);
            const lowValue = parseFloat(DI_UPS_CHARGING_Low);
            const DI_UPS_CHARGINGValue = parseFloat(DI_UPS_CHARGING);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_UPS_CHARGINGValue)
            ) {
                if (
                    highValue <= DI_UPS_CHARGINGValue ||
                    DI_UPS_CHARGINGValue <= lowValue
                ) {
                    setExceedThresholdDI_UPS_CHARGING(true);
                } else {
                    setExceedThresholdDI_UPS_CHARGING(false);
                }
            }
        }
    }, [
        DI_UPS_CHARGING_High,
        DI_UPS_CHARGING,
        DI_UPS_CHARGING_Low,
        maintainDI_UPS_CHARGING,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_UPS_ALARM, setDI_UPS_ALARM] = useState<string | null>(null);

    const [DI_UPS_ALARM_High, setDI_UPS_ALARM_High] = useState<number | null>(
        null
    );
    const [DI_UPS_ALARM_Low, setDI_UPS_ALARM_Low] = useState<number | null>(
        null
    );
    const [exceedThresholdDI_UPS_ALARM, setExceedThresholdDI_UPS_ALARM] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_UPS_ALARM, setMaintainDI_UPS_ALARM] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_UPS_ALARM_High === "string" &&
            typeof DI_UPS_ALARM_Low === "string" &&
            DI_UPS_ALARM !== null &&
            maintainDI_UPS_ALARM === false
        ) {
            const highValue = parseFloat(DI_UPS_ALARM_High);
            const lowValue = parseFloat(DI_UPS_ALARM_Low);
            const DI_UPS_ALARMValue = parseFloat(DI_UPS_ALARM);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_UPS_ALARMValue)
            ) {
                if (
                    highValue <= DI_UPS_ALARMValue ||
                    DI_UPS_ALARMValue <= lowValue
                ) {
                    setExceedThresholdDI_UPS_ALARM(true);
                } else {
                    setExceedThresholdDI_UPS_ALARM(false);
                }
            }
        }
    }, [
        DI_UPS_ALARM_High,
        DI_UPS_ALARM,
        DI_UPS_ALARM_Low,
        maintainDI_UPS_ALARM,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_SELECT_SW, setDI_SELECT_SW] = useState<string | null>(null);

    const [DI_SELECT_SW_High, setDI_SELECT_SW_High] = useState<number | null>(
        null
    );
    const [DI_SELECT_SW_Low, setDI_SELECT_SW_Low] = useState<number | null>(
        null
    );
    const [exceedThresholdDI_SELECT_SW, setExceedThresholdDI_SELECT_SW] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDI_SELECT_SW, setMaintainDI_SELECT_SW] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_SELECT_SW_High === "string" &&
            typeof DI_SELECT_SW_Low === "string" &&
            DI_SELECT_SW !== null &&
            maintainDI_SELECT_SW === false
        ) {
            const highValue = parseFloat(DI_SELECT_SW_High);
            const lowValue = parseFloat(DI_SELECT_SW_Low);
            const DI_SELECT_SWValue = parseFloat(DI_SELECT_SW);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_SELECT_SWValue)
            ) {
                if (
                    highValue <= DI_SELECT_SWValue ||
                    DI_SELECT_SWValue <= lowValue
                ) {
                    setExceedThresholdDI_SELECT_SW(true);
                } else {
                    setExceedThresholdDI_SELECT_SW(false);
                }
            }
        }
    }, [
        DI_SELECT_SW_High,
        DI_SELECT_SW,
        DI_SELECT_SW_Low,
        maintainDI_SELECT_SW,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [Emergency_NC, setEmergency_NC] = useState<string | null>(null);

    const [Emergency_NC_High, setEmergency_NC_High] = useState<number | null>(
        null
    );
    const [Emergency_NC_Low, setEmergency_NC_Low] = useState<number | null>(
        null
    );
    const [exceedThresholdEmergency_NC, setExceedThresholdEmergency_NC] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainEmergency_NC, setMaintainEmergency_NC] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof Emergency_NC_High === "string" &&
            typeof Emergency_NC_Low === "string" &&
            Emergency_NC !== null &&
            maintainEmergency_NC === false
        ) {
            const highValue = parseFloat(Emergency_NC_High);
            const lowValue = parseFloat(Emergency_NC_Low);
            const Emergency_NCValue = parseFloat(Emergency_NC);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Emergency_NCValue)
            ) {
                if (
                    highValue <= Emergency_NCValue ||
                    Emergency_NCValue <= lowValue
                ) {
                    setExceedThresholdEmergency_NC(true);
                } else {
                    setExceedThresholdEmergency_NC(false);
                }
            }
        }
    }, [
        Emergency_NC_High,
        Emergency_NC,
        Emergency_NC_Low,
        maintainEmergency_NC,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DI_UPS_BATTERY, setDI_UPS_BATTERY] = useState<string | null>(null);

    const [DI_UPS_BATTERY_High, setDI_UPS_BATTERY_High] = useState<
        number | null
    >(null);
    const [DI_UPS_BATTERY_Low, setDI_UPS_BATTERY_Low] = useState<number | null>(
        null
    );
    const [exceedThresholdDI_UPS_BATTERY, setExceedThresholdDI_UPS_BATTERY] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDI_UPS_BATTERY, setMaintainDI_UPS_BATTERY] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_UPS_BATTERY_High === "string" &&
            typeof DI_UPS_BATTERY_Low === "string" &&
            DI_UPS_BATTERY !== null &&
            maintainDI_UPS_BATTERY === false
        ) {
            const highValue = parseFloat(DI_UPS_BATTERY_High);
            const lowValue = parseFloat(DI_UPS_BATTERY_Low);
            const DI_UPS_BATTERYValue = parseFloat(DI_UPS_BATTERY);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_UPS_BATTERYValue)
            ) {
                if (
                    highValue <= DI_UPS_BATTERYValue ||
                    DI_UPS_BATTERYValue <= lowValue
                ) {
                    setExceedThresholdDI_UPS_BATTERY(true);
                } else {
                    setExceedThresholdDI_UPS_BATTERY(false);
                }
            }
        }
    }, [
        DI_UPS_BATTERY_High,
        DI_UPS_BATTERY,
        DI_UPS_BATTERY_Low,
        maintainDI_UPS_BATTERY,
    ]);

    // ===================================================================================================================

    const [Emergency_NO, setEmergency_NO] = useState<string | null>(null);
    const [Emergency_NO_High, setEmergency_NO_High] = useState<number | null>(
        null
    );
    const [Emergency_NO_Low, setEmergency_NO_Low] = useState<number | null>(
        null
    );
    const [exceedThresholdEmergency_NO, setExceedThresholdEmergency_NO] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainEmergency_NO, setMaintainEmergency_NO] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof Emergency_NO_High === "string" &&
            typeof Emergency_NO_Low === "string" &&
            Emergency_NO !== null &&
            maintainEmergency_NO === false
        ) {
            const highValue = parseFloat(Emergency_NO_High);
            const lowValue = parseFloat(Emergency_NO_Low);
            const Emergency_NOValue = parseFloat(Emergency_NO);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(Emergency_NOValue)
            ) {
                if (
                    highValue <= Emergency_NOValue ||
                    Emergency_NOValue <= lowValue
                ) {
                    setExceedThresholdEmergency_NO(true);
                } else {
                    setExceedThresholdEmergency_NO(false);
                }
            }
        }
    }, [
        Emergency_NO_High,
        Emergency_NO,
        ,
        Emergency_NO_Low,
        maintainEmergency_NO,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [UPS_Mode, setUPS_Mode] = useState<string | null>(null);
    const [UPS_Mode_High, setUPS_Mode_High] = useState<number | null>(null);
    const [UPS_Mode_Low, setUPS_Mode_Low] = useState<number | null>(null);
    const [exceedThresholdUPS_Mode, setExceedThresholdUPS_Mode] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainUPS_Mode, setMaintainUPS_Mode] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof UPS_Mode_High === "string" &&
            typeof UPS_Mode_Low === "string" &&
            UPS_Mode !== null &&
            maintainUPS_Mode === false
        ) {
            const highValue = parseFloat(UPS_Mode_High);
            const lowValue = parseFloat(UPS_Mode_Low);
            const UPS_ModeValue = parseFloat(UPS_Mode);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(UPS_ModeValue)
            ) {
                if (highValue <= UPS_ModeValue || UPS_ModeValue <= lowValue) {
                    setExceedThresholdUPS_Mode(true);
                } else {
                    setExceedThresholdUPS_Mode(false);
                }
            }
        }
    }, [UPS_Mode_High, UPS_Mode, , UPS_Mode_Low, maintainUPS_Mode]);

    // ===================================================================================================================

    const [DO_HR_01, setDO_HR_01] = useState<string | null>(null);

    const [DO_HR_01_High, setDO_HR_01_High] = useState<number | null>(null);
    const [DO_HR_01_Low, setDO_HR_01_Low] = useState<number | null>(null);
    const [exceedThresholdDO_HR_01, setExceedThresholdDO_HR_01] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDO_HR_01, setMaintainDO_HR_01] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DO_HR_01_High === "string" &&
            typeof DO_HR_01_Low === "string" &&
            DO_HR_01 !== null &&
            maintainDO_HR_01 === false
        ) {
            const highValue = parseFloat(DO_HR_01_High);
            const lowValue = parseFloat(DO_HR_01_Low);
            const DO_HR_01Value = parseFloat(DO_HR_01);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DO_HR_01Value)
            ) {
                if (highValue <= DO_HR_01Value || DO_HR_01Value <= lowValue) {
                    setExceedThresholdDO_HR_01(true);
                } else {
                    setExceedThresholdDO_HR_01(false);
                }
            }
        }
    }, [DO_HR_01_High, DO_HR_01, DO_HR_01_Low, maintainDO_HR_01]);

    // ===================================================================================================================

    const [DI_RESET, setDI_RESET] = useState<string | null>(null);

    const [DI_RESET_High, setDI_RESET_High] = useState<number | null>(null);
    const [DI_RESET_Low, setDI_RESET_Low] = useState<number | null>(null);
    const [exceedThresholdDI_RESET, setExceedThresholdDI_RESET] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDI_RESET, setMaintainDI_RESET] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_RESET_High === "string" &&
            typeof DI_RESET_Low === "string" &&
            DI_RESET !== null &&
            maintainDI_RESET === false
        ) {
            const highValue = parseFloat(DI_RESET_High);
            const lowValue = parseFloat(DI_RESET_Low);
            const DI_RESETValue = parseFloat(DI_RESET);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DI_RESETValue)
            ) {
                if (highValue <= DI_RESETValue || DI_RESETValue <= lowValue) {
                    setExceedThresholdDI_RESET(true);
                } else {
                    setExceedThresholdDI_RESET(false);
                }
            }
        }
    }, [DI_RESET_High, DI_RESET, DI_RESET_Low, maintainDI_RESET]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DO_BC_01, setDO_BC_01] = useState<string | null>(null);

    const [DO_BC_01_High, setDO_BC_01_High] = useState<number | null>(null);
    const [DO_BC_01_Low, setDO_BC_01_Low] = useState<number | null>(null);
    const [exceedThresholdDO_BC_01, setExceedThresholdDO_BC_01] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDO_BC_01, setMaintainDO_BC_01] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DO_BC_01_High === "string" &&
            typeof DO_BC_01_Low === "string" &&
            DO_BC_01 !== null &&
            maintainDO_BC_01 === false
        ) {
            const highValue = parseFloat(DO_BC_01_High);
            const lowValue = parseFloat(DO_BC_01_Low);
            const DO_BC_01Value = parseFloat(DO_BC_01);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DO_BC_01Value)
            ) {
                if (highValue <= DO_BC_01Value || DO_BC_01Value <= lowValue) {
                    setExceedThresholdDO_BC_01(true);
                } else {
                    setExceedThresholdDO_BC_01(false);
                }
            }
        }
    }, [DO_BC_01_High, DO_BC_01, DO_BC_01_Low, maintainDO_BC_01]);

    // ===================================================================================================================

    const [DO_SV_01, setDO_SV_01] = useState<string | null>(null);

    const [DO_SV_01_High, setDO_SV_01_High] = useState<number | null>(null);
    const [DO_SV_01_Low, setDO_SV_01_Low] = useState<number | null>(null);
    const [exceedThresholdDO_SV_01, setExceedThresholdDO_SV_01] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDO_SV_01, setMaintainDO_SV_01] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DO_SV_01_High === "string" &&
            typeof DO_SV_01_Low === "string" &&
            DO_SV_01 !== null &&
            maintainDO_SV_01 === false
        ) {
            const highValue = parseFloat(DO_SV_01_High);
            const lowValue = parseFloat(DO_SV_01_Low);
            const DO_SV_01Value = parseFloat(DO_SV_01);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DO_SV_01Value)
            ) {
                if (highValue <= DO_SV_01Value || DO_SV_01Value <= lowValue) {
                    setExceedThresholdDO_SV_01(true);
                } else {
                    setExceedThresholdDO_SV_01(false);
                }
            }
        }
    }, [DO_SV_01_High, DO_SV_01, DO_SV_01_Low, maintainDO_SV_01]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [DO_SV_02, setDO_SV_02] = useState<string | null>(null);

    const [DO_SV_02_High, setDO_SV_02_High] = useState<number | null>(null);
    const [DO_SV_02_Low, setDO_SV_02_Low] = useState<number | null>(null);
    const [exceedThresholdDO_SV_02, setExceedThresholdDO_SV_02] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainDO_SV_02, setMaintainDO_SV_02] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DO_SV_02_High === "string" &&
            typeof DO_SV_02_Low === "string" &&
            DO_SV_02 !== null &&
            maintainDO_SV_02 === false
        ) {
            const highValue = parseFloat(DO_SV_02_High);
            const lowValue = parseFloat(DO_SV_02_Low);
            const DO_SV_02Value = parseFloat(DO_SV_02);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(DO_SV_02Value)
            ) {
                if (highValue <= DO_SV_02Value || DO_SV_02Value <= lowValue) {
                    setExceedThresholdDO_SV_02(true);
                } else {
                    setExceedThresholdDO_SV_02(false);
                }
            }
        }
    }, [DO_SV_02_High, DO_SV_02, DO_SV_02_Low, maintainDO_SV_02]);

    // ===================================================================================================================

    const [DI_SD_1, setDI_SD_1] = useState<string | null>(null);

    const [DI_SD_1_High, setDI_SD_1_High] = useState<number | null>(null);
    const [DI_SD_1_Low, setDI_SD_1_Low] = useState<number | null>(null);
    const [exceedThresholdDI_SD_1, setExceedThresholdDI_SD_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainDI_SD_1, setMaintainDI_SD_1] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof DI_SD_1_High === "string" &&
            typeof DI_SD_1_Low === "string" &&
            DI_SD_1 !== null &&
            maintainDI_SD_1 === false
        ) {
            const highValue = parseFloat(DI_SD_1_High);
            const lowValue = parseFloat(DI_SD_1_Low);
            const DI_SD_1Value = parseFloat(DI_SD_1);

            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(DI_SD_1Value)) {
                if (highValue <= DI_SD_1Value || DI_SD_1Value <= lowValue) {
                    setExceedThresholdDI_SD_1(true);
                } else {
                    setExceedThresholdDI_SD_1(false);
                }
            }
        }
    }, [DI_SD_1_High, DI_SD_1, DI_SD_1_Low, maintainDI_SD_1]);

    //======================================================================================================================

    // ===================================================================================================================

    const [
        FC_01_Current_Values_Temperature,
        setFC_01_Current_Values_Temperature,
    ] = useState<string | null>(null);

    const [
        FC_01_Current_Values_Temperature_High,
        setFC_01_Current_Values_Temperature_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Temperature_Low,
        setFC_01_Current_Values_Temperature_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Temperature,
        setExceedThresholdFC_01_Current_Values_Temperature,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Temperature,
        setMaintainFC_01_Current_Values_Temperature,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_TemperatureValue = parseFloat(
            FC_01_Current_Values_Temperature as any
        );
        const highValue = FC_01_Current_Values_Temperature_High ?? NaN;
        const lowValue = FC_01_Current_Values_Temperature_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_TemperatureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Temperature
        ) {
            setExceedThresholdFC_01_Current_Values_Temperature(
                FC_01_Current_Values_TemperatureValue >= highValue ||
                    FC_01_Current_Values_TemperatureValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Temperature,
        FC_01_Current_Values_Temperature_High,
        FC_01_Current_Values_Temperature_Low,
        maintainFC_01_Current_Values_Temperature,
    ]);

    // ===================================================================================================================

    const [
        FC_01_Current_Values_Static_Pressure,
        setFC_01_Current_Values_Static_Pressure,
    ] = useState<string | null>(null);

    const [
        FC_01_Current_Values_Static_Pressure_High,
        setFC_01_Current_Values_Static_Pressure_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Static_Pressure_Low,
        setFC_01_Current_Values_Static_Pressure_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Static_Pressure,
        setExceedThresholdFC_01_Current_Values_Static_Pressure,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Static_Pressure,
        setMaintainFC_01_Current_Values_Static_Pressure,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Static_PressureValue = parseFloat(
            FC_01_Current_Values_Static_Pressure as any
        );
        const highValue = FC_01_Current_Values_Static_Pressure_High ?? NaN;
        const lowValue = FC_01_Current_Values_Static_Pressure_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Static_PressureValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Static_Pressure
        ) {
            setExceedThresholdFC_01_Current_Values_Static_Pressure(
                FC_01_Current_Values_Static_PressureValue >= highValue ||
                    FC_01_Current_Values_Static_PressureValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Static_Pressure,
        FC_01_Current_Values_Static_Pressure_High,
        FC_01_Current_Values_Static_Pressure_Low,
        maintainFC_01_Current_Values_Static_Pressure,
    ]);

    // ===================================================================================================================

    const [
        FC_01_Accumulated_Values_Uncorrected_Volume,
        setFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_01_Accumulated_Values_Uncorrected_Volume_High,
        setFC_01_Accumulated_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Accumulated_Values_Uncorrected_Volume_Low,
        setFC_01_Accumulated_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume,
        setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_01_Accumulated_Values_Uncorrected_Volume,
        setMaintainFC_01_Accumulated_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Accumulated_Values_Uncorrected_VolumeValue = parseFloat(
            FC_01_Accumulated_Values_Uncorrected_Volume as any
        );
        const highValue =
            FC_01_Accumulated_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_01_Accumulated_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Accumulated_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Accumulated_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume(
                FC_01_Accumulated_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_01_Accumulated_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Accumulated_Values_Uncorrected_Volume,
        FC_01_Accumulated_Values_Uncorrected_Volume_High,
        FC_01_Accumulated_Values_Uncorrected_Volume_Low,
        maintainFC_01_Accumulated_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================

    const [
        FC_01_Accumulated_Values_Volume,
        setFC_01_Accumulated_Values_Volume,
    ] = useState<string | null>(null);
    const [
        FC_01_Accumulated_Values_Volume_High,
        setFC_01_Accumulated_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Accumulated_Values_Volume_Low,
        setFC_01_Accumulated_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Accumulated_Values_Volume,
        setExceedThresholdFC_01_Accumulated_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_01_Accumulated_Values_Volume,
        setMaintainFC_01_Accumulated_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Accumulated_Values_VolumeValue = parseFloat(
            FC_01_Accumulated_Values_Volume as any
        );
        const highValue = FC_01_Accumulated_Values_Volume_High ?? NaN;
        const lowValue = FC_01_Accumulated_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Accumulated_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Accumulated_Values_Volume
        ) {
            setExceedThresholdFC_01_Accumulated_Values_Volume(
                FC_01_Accumulated_Values_VolumeValue >= highValue ||
                    FC_01_Accumulated_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Accumulated_Values_Volume,
        FC_01_Accumulated_Values_Volume_High,
        FC_01_Accumulated_Values_Volume_Low,
        maintainFC_01_Accumulated_Values_Volume,
    ]);

    // ===================================================================================================================

    const [FC_01_Current_Values_Flow_Rate, setFC_01_Current_Values_Flow_Rate] =
        useState<string | null>(null);

    const [
        FC_01_Current_Values_Flow_Rate_High,
        setFC_01_Current_Values_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Flow_Rate_Low,
        setFC_01_Current_Values_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Flow_Rate,
        setExceedThresholdFC_01_Current_Values_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Flow_Rate,
        setMaintainFC_01_Current_Values_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Flow_RateValue = parseFloat(
            FC_01_Current_Values_Flow_Rate as any
        );
        const highValue = FC_01_Current_Values_Flow_Rate_High ?? NaN;
        const lowValue = FC_01_Current_Values_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Flow_Rate
        ) {
            setExceedThresholdFC_01_Current_Values_Flow_Rate(
                FC_01_Current_Values_Flow_RateValue >= highValue ||
                    FC_01_Current_Values_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Flow_Rate,
        FC_01_Current_Values_Flow_Rate_High,
        FC_01_Current_Values_Flow_Rate_Low,
        maintainFC_01_Current_Values_Flow_Rate,
    ]);

    // ===================================================================================================================

    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate,
        setFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<string | null>(null);

    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate_High,
        setFC_01_Current_Values_Uncorrected_Flow_Rate_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Current_Values_Uncorrected_Flow_Rate_Low,
        setFC_01_Current_Values_Uncorrected_Flow_Rate_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate,
        setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
        setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Current_Values_Uncorrected_Flow_RateValue = parseFloat(
            FC_01_Current_Values_Uncorrected_Flow_Rate as any
        );
        const highValue =
            FC_01_Current_Values_Uncorrected_Flow_Rate_High ?? NaN;
        const lowValue = FC_01_Current_Values_Uncorrected_Flow_Rate_Low ?? NaN;

        if (
            !isNaN(FC_01_Current_Values_Uncorrected_Flow_RateValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
        ) {
            setExceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate(
                FC_01_Current_Values_Uncorrected_Flow_RateValue >= highValue ||
                    FC_01_Current_Values_Uncorrected_Flow_RateValue <= lowValue
            );
        }
    }, [
        FC_01_Current_Values_Uncorrected_Flow_Rate,
        FC_01_Current_Values_Uncorrected_Flow_Rate_High,
        FC_01_Current_Values_Uncorrected_Flow_Rate_Low,
        maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
    ]);

    // ===================================================================================================================

    const [
        FC_01_Today_Values_Uncorrected_Volume,
        setFC_01_Today_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);
    const [
        FC_01_Today_Values_Uncorrected_Volume_High,
        setFC_01_Today_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Today_Values_Uncorrected_Volume_Low,
        setFC_01_Today_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Today_Values_Uncorrected_Volume,
        setExceedThresholdFC_01_Today_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_01_Today_Values_Uncorrected_Volume,
        setMaintainFC_01_Today_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Today_Values_Uncorrected_VolumeValue = parseFloat(
            FC_01_Today_Values_Uncorrected_Volume as any
        );
        const highValue = FC_01_Today_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_01_Today_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Today_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Today_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_01_Today_Values_Uncorrected_Volume(
                FC_01_Today_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_01_Today_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Today_Values_Uncorrected_Volume,
        FC_01_Today_Values_Uncorrected_Volume_High,
        FC_01_Today_Values_Uncorrected_Volume_Low,
        maintainFC_01_Today_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================

    const [FC_01_Today_Values_Volume, setFC_01_Today_Values_Volume] = useState<
        string | null
    >(null);
    const [FC_01_Today_Values_Volume_High, setFC_01_Today_Values_Volume_High] =
        useState<number | null>(null);
    const [FC_01_Today_Values_Volume_Low, setFC_01_Today_Values_Volume_Low] =
        useState<number | null>(null);
    const [
        exceedThresholdFC_01_Today_Values_Volume,
        setExceedThresholdFC_01_Today_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_01_Today_Values_Volume,
        setMaintainFC_01_Today_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Today_Values_VolumeValue = parseFloat(
            FC_01_Today_Values_Volume as any
        );
        const highValue = FC_01_Today_Values_Volume_High ?? NaN;
        const lowValue = FC_01_Today_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Today_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Today_Values_Volume
        ) {
            setExceedThresholdFC_01_Today_Values_Volume(
                FC_01_Today_Values_VolumeValue >= highValue ||
                    FC_01_Today_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Today_Values_Volume,
        FC_01_Today_Values_Volume_High,
        FC_01_Today_Values_Volume_Low,
        maintainFC_01_Today_Values_Volume,
    ]);

    // ===================================================================================================================

    const [FC_01_Yesterday_Values_Volume, setFC_01_Yesterday_Values_Volume] =
        useState<string | null>(null);

    const [
        FC_01_Yesterday_Values_Volume_High,
        setFC_01_Yesterday_Values_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Yesterday_Values_Volume_Low,
        setFC_01_Yesterday_Values_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Yesterday_Values_Volume,
        setExceedThresholdFC_01_Yesterday_Values_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [
        maintainFC_01_Yesterday_Values_Volume,
        setMaintainFC_01_Yesterday_Values_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Yesterday_Values_VolumeValue = parseFloat(
            FC_01_Yesterday_Values_Volume as any
        );
        const highValue = FC_01_Yesterday_Values_Volume_High ?? NaN;
        const lowValue = FC_01_Yesterday_Values_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Yesterday_Values_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Yesterday_Values_Volume
        ) {
            setExceedThresholdFC_01_Yesterday_Values_Volume(
                FC_01_Yesterday_Values_VolumeValue >= highValue ||
                    FC_01_Yesterday_Values_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Yesterday_Values_Volume,
        FC_01_Yesterday_Values_Volume_High,
        FC_01_Yesterday_Values_Volume_Low,
        maintainFC_01_Yesterday_Values_Volume,
    ]);

    // ===================================================================================================================

    // ===================================================================================================================

    const [
        FC_01_Yesterday_Values_Uncorrected_Volume,
        setFC_01_Yesterday_Values_Uncorrected_Volume,
    ] = useState<string | null>(null);

    const [
        FC_01_Yesterday_Values_Uncorrected_Volume_High,
        setFC_01_Yesterday_Values_Uncorrected_Volume_High,
    ] = useState<number | null>(null);
    const [
        FC_01_Yesterday_Values_Uncorrected_Volume_Low,
        setFC_01_Yesterday_Values_Uncorrected_Volume_Low,
    ] = useState<number | null>(null);
    const [
        exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume,
        setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume,
    ] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [
        maintainFC_01_Yesterday_Values_Uncorrected_Volume,
        setMaintainFC_01_Yesterday_Values_Uncorrected_Volume,
    ] = useState<boolean>(false);

    useEffect(() => {
        const FC_01_Yesterday_Values_Uncorrected_VolumeValue = parseFloat(
            FC_01_Yesterday_Values_Uncorrected_Volume as any
        );
        const highValue = FC_01_Yesterday_Values_Uncorrected_Volume_High ?? NaN;
        const lowValue = FC_01_Yesterday_Values_Uncorrected_Volume_Low ?? NaN;

        if (
            !isNaN(FC_01_Yesterday_Values_Uncorrected_VolumeValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_01_Yesterday_Values_Uncorrected_Volume
        ) {
            setExceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume(
                FC_01_Yesterday_Values_Uncorrected_VolumeValue >= highValue ||
                    FC_01_Yesterday_Values_Uncorrected_VolumeValue <= lowValue
            );
        }
    }, [
        FC_01_Yesterday_Values_Uncorrected_Volume,
        FC_01_Yesterday_Values_Uncorrected_Volume_High,
        FC_01_Yesterday_Values_Uncorrected_Volume_Low,
        maintainFC_01_Yesterday_Values_Uncorrected_Volume,
    ]);

    // ===================================================================================================================

    const [PT_1003, setPT_1003] = useState<string | null>(null);

    const [PT_1003_High, setPT_1003_High] = useState<number | null>(null);
    const [PT_1003_Low, setPT_1003_Low] = useState<number | null>(null);
    const [exceedThresholdPT_1003, setExceedThresholdPT_1003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainPT_1003, setMaintainPT_1003] = useState<boolean>(false);

    useEffect(() => {
        const PT_1003Value = parseFloat(PT_1003 as any);
        const highValue = PT_1003_High ?? NaN;
        const lowValue = PT_1003_Low ?? NaN;

        if (
            !isNaN(PT_1003Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainPT_1003
        ) {
            setExceedThresholdPT_1003(
                PT_1003Value >= highValue || PT_1003Value <= lowValue
            );
        }
    }, [PT_1003, PT_1003_High, PT_1003_Low, maintainPT_1003]);

    // ===================================================================================================================
    // ===================================================================================================================

    const [FC_Conn_STT, setFC_Conn_STT] = useState<string | null>(null);

    const [FC_Conn_STT_High, setFC_Conn_STT_High] = useState<number | null>(
        null
    );
    const [FC_Conn_STT_Low, setFC_Conn_STT_Low] = useState<number | null>(null);
    const [exceedThresholdFC_Conn_STT, setExceedThresholdFC_Conn_STT] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [maintainFC_Conn_STT, setMaintainFC_Conn_STT] =
        useState<boolean>(false);

    useEffect(() => {
        const FC_Conn_STTValue = parseFloat(FC_Conn_STT as any);
        const highValue = FC_Conn_STT_High ?? NaN;
        const lowValue = FC_Conn_STT_Low ?? NaN;

        if (
            !isNaN(FC_Conn_STTValue) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainFC_Conn_STT
        ) {
            setExceedThresholdFC_Conn_STT(
                FC_Conn_STTValue >= highValue || FC_Conn_STTValue <= lowValue
            );
        }
    }, [FC_Conn_STT, FC_Conn_STT_High, FC_Conn_STT_Low, maintainFC_Conn_STT]);

    // ===================================================================================================================

    const [lineDuty1901, setLineduty1901] = useState<boolean>(false);
    const [lineDuty1902, setLineduty1902] = useState<boolean>(true);

    const ChangeStatusFIQ = async () => {
        try {
            const newValue1 = !lineDuty1901;
            const newValue2 = !lineDuty1902;

            await httpApi.post(PostTelemetry_ZOVC, {
                Line_Duty_01: newValue1,
                Line_Duty_02: newValue2,
            });
            setLineduty1901(newValue1);
            setLineduty1902(newValue2);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
            fetchData();
        } catch (error) {}
    };
    const confirmLineDuty = () => {
        confirmDialog({
            header: "Comfirmation",
            message: "Are you sure to change Line Duty?",
            icon: "pi pi-info-circle",
            accept: () => ChangeStatusFIQ(),
        });
    };

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_LGDS}/values/attributes/SERVER_SCOPE`
            );

            const FC_Lithium_Battery_Status_High = res.data.find(
                (item: any) => item.key === "FC_Lithium_Battery_Status_High"
            );
            setFC_Lithium_Battery_Status_High(
                FC_Lithium_Battery_Status_High?.value || null
            );
            const FC_Lithium_Battery_Status_Low = res.data.find(
                (item: any) => item.key === "FC_Lithium_Battery_Status_Low"
            );
            setFC_Lithium_Battery_Status_Low(
                FC_Lithium_Battery_Status_Low?.value || null
            );
            const MaintainFC_Lithium_Battery_Status = res.data.find(
                (item: any) => item.key === "FC_Lithium_Battery_Status_Maintain"
            );

            const FC_Battery_Voltage_High = res.data.find(
                (item: any) => item.key === "FC_Battery_Voltage_High"
            );
            setFC_Battery_Voltage_High(FC_Battery_Voltage_High?.value || null);
            const FC_Battery_Voltage_Low = res.data.find(
                (item: any) => item.key === "FC_Battery_Voltage_Low"
            );
            setFC_Battery_Voltage_Low(FC_Battery_Voltage_Low?.value || null);
            const FC_Battery_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_Battery_Voltage_Maintain"
            );

            const FC_System_Voltage_High = res.data.find(
                (item: any) => item.key === "FC_System_Voltage_High"
            );
            setFC_System_Voltage_High(FC_System_Voltage_High?.value || null);
            const FC_System_Voltage_Low = res.data.find(
                (item: any) => item.key === "FC_System_Voltage_Low"
            );
            setFC_System_Voltage_Low(FC_System_Voltage_Low?.value || null);
            const FC_System_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_System_Voltage_Maintain"
            );

            const FC_Charger_Voltage_High = res.data.find(
                (item: any) => item.key === "FC_Charger_Voltage_High"
            );
            setFC_Charger_Voltage_High(FC_Charger_Voltage_High?.value || null);
            const FC_Charger_Voltage_Low = res.data.find(
                (item: any) => item.key === "FC_Charger_Voltage_Low"
            );
            setFC_Charger_Voltage_Low(FC_Charger_Voltage_Low?.value || null);
            const FC_Charger_Voltage_Maintain = res.data.find(
                (item: any) => item.key === "FC_Charger_Voltage_Maintain"
            );

            const FC_01_Today_Values_Volume_High = res.data.find(
                (item: any) => item.key === "FC_01_Today_Values_Volume_High"
            );
            setFC_01_Today_Values_Volume_High(
                FC_01_Today_Values_Volume_High?.value || null
            );
            const FC_01_Today_Values_Volume_Low = res.data.find(
                (item: any) => item.key === "FC_01_Today_Values_Volume_Low"
            );
            setFC_01_Today_Values_Volume_Low(
                FC_01_Today_Values_Volume_Low?.value || null
            );
            const FC_01_Today_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_01_Today_Values_Volume_Maintain"
            );

            const FC_01_Today_Values_Uncorrected_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Today_Values_Uncorrected_Volume_High"
            );
            setFC_01_Today_Values_Uncorrected_Volume_High(
                FC_01_Today_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_01_Today_Values_Uncorrected_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Today_Values_Uncorrected_Volume_Low"
            );
            setFC_01_Today_Values_Uncorrected_Volume_Low(
                FC_01_Today_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_01_Today_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Today_Values_Uncorrected_Volume_Maintain"
                );

            const FC_01_Yesterday_Values_Volume_High = res.data.find(
                (item: any) => item.key === "FC_01_Yesterday_Values_Volume_High"
            );
            setFC_01_Yesterday_Values_Volume_High(
                FC_01_Yesterday_Values_Volume_High?.value || null
            );
            const FC_01_Yesterday_Values_Volume_Low = res.data.find(
                (item: any) => item.key === "FC_01_Yesterday_Values_Volume_Low"
            );
            setFC_01_Yesterday_Values_Volume_Low(
                FC_01_Yesterday_Values_Volume_Low?.value || null
            );
            const FC_01_Yesterday_Values_Volume_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Yesterday_Values_Volume_Maintain"
            );

            const FC_01_Yesterday_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Yesterday_Values_Uncorrected_Volume_High"
                );
            setFC_01_Yesterday_Values_Uncorrected_Volume_High(
                FC_01_Yesterday_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_01_Yesterday_Values_Uncorrected_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Yesterday_Values_Uncorrected_Volume_Low"
            );
            setFC_01_Yesterday_Values_Uncorrected_Volume_Low(
                FC_01_Yesterday_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_01_Yesterday_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Yesterday_Values_Uncorrected_Volume_Maintain"
                );

            const FC_01_Accumulated_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_High"
                );
            setFC_01_Accumulated_Values_Uncorrected_Volume_High(
                FC_01_Accumulated_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_01_Accumulated_Values_Uncorrected_Volume_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_Low"
                );
            setFC_01_Accumulated_Values_Uncorrected_Volume_Low(
                FC_01_Accumulated_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_01_Accumulated_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Accumulated_Values_Uncorrected_Volume_Maintain"
                );

            const FC_01_Accumulated_Values_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_High"
            );
            setFC_01_Accumulated_Values_Volume_High(
                FC_01_Accumulated_Values_Volume_High?.value || null
            );
            const FC_01_Accumulated_Values_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_Low"
            );
            setFC_01_Accumulated_Values_Volume_Low(
                FC_01_Accumulated_Values_Volume_Low?.value || null
            );
            const FC_01_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Accumulated_Values_Volume_Maintain"
            );

            const FC_01_Current_Values_Static_Pressure_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_High"
            );
            setFC_01_Current_Values_Static_Pressure_High(
                FC_01_Current_Values_Static_Pressure_High?.value || null
            );
            const FC_01_Current_Values_Static_Pressure_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Low"
            );
            setFC_01_Current_Values_Static_Pressure_Low(
                FC_01_Current_Values_Static_Pressure_Low?.value || null
            );
            const FC_01_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Static_Pressure_Maintain"
            );

            const FC_01_Current_Values_Temperature_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Temperature_High"
            );
            setFC_01_Current_Values_Temperature_High(
                FC_01_Current_Values_Temperature_High?.value || null
            );
            const FC_01_Current_Values_Temperature_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Temperature_Low"
            );
            setFC_01_Current_Values_Temperature_Low(
                FC_01_Current_Values_Temperature_Low?.value || null
            );
            const FC_01_Current_Values_Temperature_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Temperature_Maintain"
            );

            const FC_01_Current_Values_Flow_Rate_High = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Flow_Rate_High"
            );
            setFC_01_Current_Values_Flow_Rate_High(
                FC_01_Current_Values_Flow_Rate_High?.value || null
            );
            const FC_01_Current_Values_Flow_Rate_Low = res.data.find(
                (item: any) => item.key === "FC_01_Current_Values_Flow_Rate_Low"
            );
            setFC_01_Current_Values_Flow_Rate_Low(
                FC_01_Current_Values_Flow_Rate_Low?.value || null
            );
            const FC_01_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_01_Current_Values_Flow_Rate_Maintain"
            );

            const FC_01_Current_Values_Uncorrected_Flow_Rate_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_High"
                );
            setFC_01_Current_Values_Uncorrected_Flow_Rate_High(
                FC_01_Current_Values_Uncorrected_Flow_Rate_High?.value || null
            );
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_Low"
                );
            setFC_01_Current_Values_Uncorrected_Flow_Rate_Low(
                FC_01_Current_Values_Uncorrected_Flow_Rate_Low?.value || null
            );
            const FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain"
                );

            const FC_02_Today_Values_Uncorrected_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Today_Values_Uncorrected_Volume_High"
            );
            setFC_02_Today_Values_Uncorrected_Volume_High(
                FC_02_Today_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_02_Today_Values_Uncorrected_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Today_Values_Uncorrected_Volume_Low"
            );
            setFC_02_Today_Values_Uncorrected_Volume_Low(
                FC_02_Today_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_02_Today_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Today_Values_Uncorrected_Volume_Maintain"
                );

            const FC_02_Accumulated_Values_Volume_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_High"
            );
            setFC_02_Accumulated_Values_Volume_High(
                FC_02_Accumulated_Values_Volume_High?.value || null
            );
            const FC_02_Accumulated_Values_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_Low"
            );
            setFC_02_Accumulated_Values_Volume_Low(
                FC_02_Accumulated_Values_Volume_Low?.value || null
            );
            const FC_02_Accumulated_Values_Volume_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Accumulated_Values_Volume_Maintain"
            );

            const FC_02_Current_Values_Static_Pressure_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_High"
            );
            setFC_02_Current_Values_Static_Pressure_High(
                FC_02_Current_Values_Static_Pressure_High?.value || null
            );
            const FC_02_Current_Values_Static_Pressure_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Low"
            );
            setFC_02_Current_Values_Static_Pressure_Low(
                FC_02_Current_Values_Static_Pressure_Low?.value || null
            );
            const FC_02_Current_Values_Static_Pressure_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Static_Pressure_Maintain"
            );

            const FC_02_Current_Values_Temperature_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Temperature_High"
            );
            setFC_02_Current_Values_Temperature_High(
                FC_02_Current_Values_Temperature_High?.value || null
            );
            const FC_02_Current_Values_Temperature_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Temperature_Low"
            );
            setFC_02_Current_Values_Temperature_Low(
                FC_02_Current_Values_Temperature_Low?.value || null
            );
            const FC_02_Current_Values_Temperature_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Temperature_Maintain"
            );

            const FC_02_Current_Values_Flow_Rate_High = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Flow_Rate_High"
            );
            setFC_02_Current_Values_Flow_Rate_High(
                FC_02_Current_Values_Flow_Rate_High?.value || null
            );
            const FC_02_Current_Values_Flow_Rate_Low = res.data.find(
                (item: any) => item.key === "FC_02_Current_Values_Flow_Rate_Low"
            );
            setFC_02_Current_Values_Flow_Rate_Low(
                FC_02_Current_Values_Flow_Rate_Low?.value || null
            );
            const FC_02_Current_Values_Flow_Rate_Maintain = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Current_Values_Flow_Rate_Maintain"
            );

            const FC_02_Current_Values_Uncorrected_Flow_Rate_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_High"
                );
            setFC_02_Current_Values_Uncorrected_Flow_Rate_High(
                FC_02_Current_Values_Uncorrected_Flow_Rate_High?.value || null
            );
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_Low"
                );
            setFC_02_Current_Values_Uncorrected_Flow_Rate_Low(
                FC_02_Current_Values_Uncorrected_Flow_Rate_Low?.value || null
            );
            const FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain"
                );

            const FC_02_Today_Values_Volume_High = res.data.find(
                (item: any) => item.key === "FC_02_Today_Values_Volume_High"
            );
            setFC_02_Today_Values_Volume_High(
                FC_02_Today_Values_Volume_High?.value || null
            );
            const FC_02_Today_Values_Volume_Low = res.data.find(
                (item: any) => item.key === "FC_02_Today_Values_Volume_Low"
            );
            setFC_02_Today_Values_Volume_Low(
                FC_02_Today_Values_Volume_Low?.value || null
            );
            const FC_02_Today_Values_Volume_Maintain = res.data.find(
                (item: any) => item.key === "FC_02_Today_Values_Volume_Maintain"
            );

            const FC_02_Accumulated_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_High"
                );
            setFC_02_Accumulated_Values_Uncorrected_Volume_High(
                FC_02_Accumulated_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_02_Accumulated_Values_Uncorrected_Volume_Low =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_Low"
                );
            setFC_02_Accumulated_Values_Uncorrected_Volume_Low(
                FC_02_Accumulated_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_02_Accumulated_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Accumulated_Values_Uncorrected_Volume_Maintain"
                );
            const FC_02_Yesterday_Values_Volume_High = res.data.find(
                (item: any) => item.key === "FC_02_Yesterday_Values_Volume_High"
            );
            setFC_02_Yesterday_Values_Volume_High(
                FC_02_Yesterday_Values_Volume_High?.value || null
            );
            const FC_02_Yesterday_Values_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_Low"
            );
            setFC_02_Yesterday_Values_Volume_Low(
                FC_02_Yesterday_Values_Volume_Low?.value || null
            );
            const MaintainFC_02_Yesterday_Values_Volume = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Yesterday_Values_Volume_Maintain"
            );

            const FC_02_Yesterday_Values_Uncorrected_Volume_High =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Yesterday_Values_Uncorrected_Volume_High"
                );
            setFC_02_Yesterday_Values_Uncorrected_Volume_High(
                FC_02_Yesterday_Values_Uncorrected_Volume_High?.value || null
            );
            const FC_02_Yesterday_Values_Uncorrected_Volume_Low = res.data.find(
                (item: any) =>
                    item.key === "FC_02_Yesterday_Values_Uncorrected_Volume_Low"
            );
            setFC_02_Yesterday_Values_Uncorrected_Volume_Low(
                FC_02_Yesterday_Values_Uncorrected_Volume_Low?.value || null
            );
            const FC_02_Yesterday_Values_Uncorrected_Volume_Maintain =
                res.data.find(
                    (item: any) =>
                        item.key ===
                        "FC_02_Yesterday_Values_Uncorrected_Volume_Maintain"
                );

            const PT_1003_High = res.data.find(
                (item: any) => item.key === "PT_1003_High"
            );
            setPT_1003_High(PT_1003_High?.value || null);
            const PT_1003_Low = res.data.find(
                (item: any) => item.key === "PT_1003_Low"
            );
            setPT_1003_Low(PT_1003_Low?.value || null);
            const PT_1003_Maintain = res.data.find(
                (item: any) => item.key === "PT_1003_Maintain"
            );

            const DO_HR_01_High = res.data.find(
                (item: any) => item.key === "DO_HR_01_High"
            );
            setDO_HR_01_High(DO_HR_01_High?.value || null);
            const DO_HR_01_Low = res.data.find(
                (item: any) => item.key === "DO_HR_01_Low"
            );
            setDO_HR_01_Low(DO_HR_01_Low?.value || null);
            const DO_HR_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_HR_01_Maintain"
            );

            const DO_BC_01_High = res.data.find(
                (item: any) => item.key === "DO_BC_01_High"
            );
            setDO_BC_01_High(DO_BC_01_High?.value || null);
            const DO_BC_01_Low = res.data.find(
                (item: any) => item.key === "DO_BC_01_Low"
            );
            setDO_BC_01_Low(DO_BC_01_Low?.value || null);
            const DO_BC_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_BC_01_Maintain"
            );

            const DO_SV_01_High = res.data.find(
                (item: any) => item.key === "DO_SV_01_High"
            );
            setDO_SV_01_High(DO_SV_01_High?.value || null);
            const DO_SV_01_Low = res.data.find(
                (item: any) => item.key === "DO_SV_01_Low"
            );
            setDO_SV_01_Low(DO_SV_01_Low?.value || null);
            const DO_SV_01_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_01_Maintain"
            );

            const DO_SV_02_High = res.data.find(
                (item: any) => item.key === "DO_SV_02_High"
            );
            setDO_SV_02_High(DO_SV_02_High?.value || null);
            const DO_SV_02_Low = res.data.find(
                (item: any) => item.key === "DO_SV_02_Low"
            );
            setDO_SV_02_Low(DO_SV_02_Low?.value || null);
            const DO_SV_02_Maintain = res.data.find(
                (item: any) => item.key === "DO_SV_02_Maintain"
            );

            const GD1_High = res.data.find(
                (item: any) => item.key === "GD1_High"
            );
            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find(
                (item: any) => item.key === "GD1_Low"
            );
            setGD1_Low(GD1_Low?.value || null);
            const GD1_Maintain = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );

            const GD2_High = res.data.find(
                (item: any) => item.key === "GD2_High"
            );
            setGD2_High(GD2_High?.value || null);
            const GD2_Low = res.data.find(
                (item: any) => item.key === "GD2_Low"
            );
            setGD2_Low(GD2_Low?.value || null);
            const GD2_Maintain = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );

            const PT1_High = res.data.find(
                (item: any) => item.key === "PT1_High"
            );
            setPT1_High(PT1_High?.value || null);
            const PT1_Low = res.data.find(
                (item: any) => item.key === "PT1_Low"
            );
            setPT1_Low(PT1_Low?.value || null);
            const PT1_Maintain = res.data.find(
                (item: any) => item.key === "PT1_Maintain"
            );

            const DI_ZSO_1_High = res.data.find(
                (item: any) => item.key === "DI_ZSO_1_High"
            );
            setDI_ZSO_1_High(DI_ZSO_1_High?.value || null);
            const DI_ZSO_1_Low = res.data.find(
                (item: any) => item.key === "DI_ZSO_1_Low"
            );
            setDI_ZSO_1_Low(DI_ZSO_1_Low?.value || null);
            const DI_ZSO_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSO_1_Maintain"
            );

            const DI_ZSC_1_High = res.data.find(
                (item: any) => item.key === "DI_ZSC_1_High"
            );
            setDI_ZSC_1_High(DI_ZSC_1_High?.value || null);
            const DI_ZSC_1_Low = res.data.find(
                (item: any) => item.key === "DI_ZSC_1_Low"
            );
            setDI_ZSC_1_Low(DI_ZSC_1_Low?.value || null);
            const DI_ZSC_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSC_1_Maintain"
            );

            const DI_ZSO_2_High = res.data.find(
                (item: any) => item.key === "DI_ZSO_2_High"
            );
            setDI_ZSO_2_High(DI_ZSO_2_High?.value || null);
            const DI_ZSO_2_Low = res.data.find(
                (item: any) => item.key === "DI_ZSO_2_Low"
            );
            setDI_ZSO_2_Low(DI_ZSO_2_Low?.value || null);
            const DI_ZSO_2_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSO_2_Maintain"
            );

            const DI_ZSC_2_High = res.data.find(
                (item: any) => item.key === "DI_ZSC_2_High"
            );
            setDI_ZSC_2_High(DI_ZSC_2_High?.value || null);
            const DI_ZSC_2_Low = res.data.find(
                (item: any) => item.key === "DI_ZSC_2_Low"
            );
            setDI_ZSC_2_Low(DI_ZSC_2_Low?.value || null);
            const DI_ZSC_2_Maintain = res.data.find(
                (item: any) => item.key === "DI_ZSC_2_Maintain"
            );

            const DI_MAP_1_High = res.data.find(
                (item: any) => item.key === "DI_MAP_1_High"
            );
            setDI_MAP_1_High(DI_MAP_1_High?.value || null);
            const DI_MAP_1_Low = res.data.find(
                (item: any) => item.key === "DI_MAP_1_Low"
            );
            setDI_MAP_1_Low(DI_MAP_1_Low?.value || null);
            const DI_MAP_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_MAP_1_Maintain"
            );

            const DI_UPS_CHARGING_High = res.data.find(
                (item: any) => item.key === "DI_UPS_CHARGING_High"
            );
            setDI_UPS_CHARGING_High(DI_UPS_CHARGING_High?.value || null);
            const DI_UPS_CHARGING_Low = res.data.find(
                (item: any) => item.key === "DI_UPS_CHARGING_Low"
            );
            setDI_UPS_CHARGING_Low(DI_UPS_CHARGING_Low?.value || null);
            const DI_UPS_CHARGING_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_CHARGING_Maintain"
            );

            const DI_UPS_ALARM_High = res.data.find(
                (item: any) => item.key === "DI_UPS_ALARM_High"
            );
            setDI_UPS_ALARM_High(DI_UPS_ALARM_High?.value || null);
            const DI_UPS_ALARM_Low = res.data.find(
                (item: any) => item.key === "DI_UPS_ALARM_Low"
            );
            setDI_UPS_ALARM_Low(DI_UPS_ALARM_Low?.value || null);
            const DI_UPS_ALARM_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_ALARM_Maintain"
            );

            const DI_SELECT_SW_High = res.data.find(
                (item: any) => item.key === "DI_SELECT_SW_High"
            );
            setDI_SELECT_SW_High(DI_SELECT_SW_High?.value || null);
            const DI_SELECT_SW_Low = res.data.find(
                (item: any) => item.key === "DI_SELECT_SW_Low"
            );
            setDI_SELECT_SW_Low(DI_SELECT_SW_Low?.value || null);
            const DI_SELECT_SW_Maintain = res.data.find(
                (item: any) => item.key === "DI_SELECT_SW_Maintain"
            );

            const DI_RESET_High = res.data.find(
                (item: any) => item.key === "DI_RESET_High"
            );
            setDI_RESET_High(DI_RESET_High?.value || null);
            const DI_RESET_Low = res.data.find(
                (item: any) => item.key === "DI_RESET_Low"
            );
            setDI_RESET_Low(DI_RESET_Low?.value || null);
            const DI_RESET_Maintain = res.data.find(
                (item: any) => item.key === "DI_RESET_Maintain"
            );

            const Emergency_NO_High = res.data.find(
                (item: any) => item.key === "Emergency_NO_High"
            );
            setEmergency_NO_High(Emergency_NO_High?.value || null);
            const Emergency_NO_Low = res.data.find(
                (item: any) => item.key === "Emergency_NO_Low"
            );
            setEmergency_NO_Low(Emergency_NO_Low?.value || null);
            const Emergency_NO_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NO_Maintain"
            );

            const DI_UPS_BATTERY_High = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_High"
            );
            setDI_UPS_BATTERY_High(DI_UPS_BATTERY_High?.value || null);
            const DI_UPS_BATTERY_Low = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_Low"
            );
            setDI_UPS_BATTERY_Low(DI_UPS_BATTERY_Low?.value || null);
            const DI_UPS_BATTERY_Maintain = res.data.find(
                (item: any) => item.key === "DI_UPS_BATTERY_Maintain"
            );

            const Emergency_NC_High = res.data.find(
                (item: any) => item.key === "Emergency_NC_High"
            );
            setEmergency_NC_High(Emergency_NC_High?.value || null);
            const Emergency_NC_Low = res.data.find(
                (item: any) => item.key === "Emergency_NC_Low"
            );
            setEmergency_NC_Low(Emergency_NC_Low?.value || null);
            const Emergency_NC_Maintain = res.data.find(
                (item: any) => item.key === "Emergency_NC_Maintain"
            );

            const UPS_Mode_High = res.data.find(
                (item: any) => item.key === "UPS_Mode_High"
            );
            setUPS_Mode_High(UPS_Mode_High?.value || null);
            const UPS_Mode_Low = res.data.find(
                (item: any) => item.key === "UPS_Mode_Low"
            );
            setUPS_Mode_Low(UPS_Mode_Low?.value || null);
            const UPS_Mode_Maintain = res.data.find(
                (item: any) => item.key === "UPS_Mode_Maintain"
            );

            const DI_SD_1_High = res.data.find(
                (item: any) => item.key === "DI_SD_1_High"
            );
            setDI_SD_1_High(DI_SD_1_High?.value || null);
            const DI_SD_1_Low = res.data.find(
                (item: any) => item.key === "DI_SD_1_Low"
            );
            setDI_SD_1_Low(DI_SD_1_Low?.value || null);
            const DI_SD_1_Maintain = res.data.find(
                (item: any) => item.key === "DI_SD_1_Maintain"
            );

            const FC_Conn_STT_High = res.data.find(
                (item: any) => item.key === "FC_Conn_STT_High"
            );
            setFC_Conn_STT_High(FC_Conn_STT_High?.value || null);
            const FC_Conn_STT_Low = res.data.find(
                (item: any) => item.key === "FC_Conn_STT_Low"
            );
            setFC_Conn_STT_Low(FC_Conn_STT_Low?.value || null);
            const FC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "FC_Conn_STT_Maintain"
            );
            setMaintainFC_Conn_STT(FC_Conn_STT_Maintain?.value || false);

            const Active = res.data.find((item: any) => item.key === "active");
            setActive(Active?.value || false);

            // ===================================================================================================================

            setMaintainDI_SD_1(DI_SD_1_Maintain?.value || false);
            setMaintainPT_1003(PT_1003_Maintain?.value || false);

            setMaintainFC_02_Accumulated_Values_Uncorrected_Volume(
                FC_02_Accumulated_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );

            setMaintainFC_02_Today_Values_Volume(
                FC_02_Today_Values_Volume_Maintain?.value || false
            );

            setMaintainFC_02_Current_Values_Uncorrected_Flow_Rate(
                FC_02_Current_Values_Uncorrected_Flow_Rate_Maintain?.value ||
                    false
            );

            setMaintainFC_02_Current_Values_Flow_Rate(
                FC_02_Current_Values_Flow_Rate_Maintain?.value || false
            );

            setMaintainFC_02_Current_Values_Temperature(
                FC_02_Current_Values_Temperature_Maintain?.value || false
            );

            setMaintainFC_02_Current_Values_Static_Pressure(
                FC_02_Current_Values_Static_Pressure_Maintain?.value || false
            );

            setMaintainFC_02_Accumulated_Values_Volume(
                FC_02_Accumulated_Values_Volume_Maintain?.value || false
            );

            setMaintainFC_02_Today_Values_Uncorrected_Volume(
                FC_02_Today_Values_Uncorrected_Volume_Maintain?.value || false
            );

            setMaintainFC_02_Yesterday_Values_Volume(
                MaintainFC_02_Yesterday_Values_Volume?.value || false
            );

            setMaintainFC_02_Yesterday_Values_Uncorrected_Volume(
                FC_02_Yesterday_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );

            setMaintainFC_01_Yesterday_Values_Uncorrected_Volume(
                FC_01_Yesterday_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );

            setMaintainFC_01_Yesterday_Values_Volume(
                FC_01_Yesterday_Values_Volume_Maintain?.value || false
            );

            setMaintainFC_01_Today_Values_Uncorrected_Volume(
                FC_01_Today_Values_Uncorrected_Volume_Maintain?.value || false
            );

            setMaintainFC_01_Today_Values_Volume(
                FC_01_Today_Values_Volume_Maintain?.value || false
            );
            setMaintainFC_01_Current_Values_Uncorrected_Flow_Rate(
                FC_01_Current_Values_Uncorrected_Flow_Rate_Maintain?.value ||
                    false
            );

            setMaintainFC_01_Current_Values_Flow_Rate(
                FC_01_Current_Values_Flow_Rate_Maintain?.value || false
            );

            setMaintainFC_01_Current_Values_Temperature(
                FC_01_Current_Values_Temperature_Maintain?.value || false
            );

            setMaintainFC_01_Current_Values_Static_Pressure(
                FC_01_Current_Values_Static_Pressure_Maintain?.value || false
            );

            setMaintainFC_01_Accumulated_Values_Volume(
                FC_01_Accumulated_Values_Volume_Maintain?.value || false
            );

            setMaintainFC_01_Accumulated_Values_Uncorrected_Volume(
                FC_01_Accumulated_Values_Uncorrected_Volume_Maintain?.value ||
                    false
            );

            setMaintainFC_Charger_Voltage(
                FC_Charger_Voltage_Maintain?.value || false
            );

            setMaintainFC_System_Voltage(
                FC_System_Voltage_Maintain?.value || false
            );

            setMaintainFC_Battery_Voltage(
                FC_Battery_Voltage_Maintain?.value || false
            );

            setMaintainFC_Lithium_Battery_Status(
                MaintainFC_Lithium_Battery_Status?.value || false
            );

            setMaintainDO_HR_01(DO_HR_01_Maintain?.value || false);

            setMaintainDO_BC_01(DO_BC_01_Maintain?.value || false);

            setMaintainDO_SV_01(DO_SV_01_Maintain?.value || false);

            setMaintainDO_SV_02(DO_SV_02_Maintain?.value || false);

            setMaintainGD1(GD1_Maintain?.value || false);

            setMaintainGD2(GD2_Maintain?.value || false);

            setMaintainPT1(PT1_Maintain?.value || false);

            setMaintainDI_ZSO_1(DI_ZSO_1_Maintain?.value || false);

            setMaintainUPS_Mode(UPS_Mode_Maintain?.value || false);

            setMaintainEmergency_NC(Emergency_NC_Maintain?.value || false);

            setMaintainDI_UPS_BATTERY(DI_UPS_BATTERY_Maintain?.value || false);

            setMaintainEmergency_NO(Emergency_NO_Maintain?.value || false);

            setMaintainDI_RESET(DI_RESET_Maintain?.value || false);

            setMaintainDI_SELECT_SW(DI_SELECT_SW_Maintain?.value || false);

            setMaintainDI_UPS_ALARM(DI_UPS_ALARM_Maintain?.value || false);

            setMaintainDI_UPS_CHARGING(
                DI_UPS_CHARGING_Maintain?.value || false
            );

            setMaintainDI_MAP_1(DI_MAP_1_Maintain?.value || false);

            setMaintainDI_ZSC_2(DI_ZSC_2_Maintain?.value || false);

            setMaintainDI_ZSO_2(DI_ZSO_2_Maintain?.value || false);

            setMaintainDI_ZSC_1(DI_ZSC_1_Maintain?.value || false);

            const Line_Duty_01 = res.data.find(
                (item: any) => item.key === "Line_Duty_01"
            );

            setLineduty1901(Line_Duty_01?.value || null);
            const Line_Duty_02 = res.data.find(
                (item: any) => item.key === "Line_Duty_02"
            );
            setLineduty1902(Line_Duty_02?.value || null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PCV1901: "PT-1901",
        PT_1902: "PT-1902",
        PT_1903: "PT-1903",
        TT: "TT",
    };

    const KeyGas = {
        SM3H: "Sm³/h",
        M3H: "m³/h",
        SM3: "Sm³",
        M3: "m³",
        BAR: "BarG",
        CC: "°C",
    };

    const paragraphContents: Record<string, string> = {
        SVF: "Standard Volume Flow Rate",
        GVF: "Gross Volume Flow Rate",
        SVA: "Standard Volume Accumulated",
        GVA: "Gross Volume Accumulated",
        PT: "Pressure Transmitter",
        TT: "Temperature Transmitter",
        PSV: "Pressure Safety Valve",
        PCV: "Pressure Control Valve",
        SSV: "Slam Shut Off Valve",
        SDV: "Shutdown valve",
    };

    const formatValue = (value: any) => {
        return value !== null
            ? new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                  useGrouping: true,
              }).format(parseFloat(value))
            : "";
    };

    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "data4") {
                const rounded_FC_01_Current_Values_Flow_Rate =
                    FC_01_Current_Values_Flow_Rate !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_01_Current_Values_Flow_Rate.toString()
                              )
                          )
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Flow_Rate &&
                                        !maintainFC_01_Current_Values_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Flow_Rate
                                            ? "orange"
                                            : "transparent",
                                }}

                                // onClick={() => confirmSVF_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_01_Current_Values_Flow_Rate &&
                                                !maintainFC_01_Current_Values_Flow_Rate
                                                    ? "white"
                                                    : maintainFC_01_Current_Values_Flow_Rate
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_01_Current_Values_Flow_Rate
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data3") {
                const rounded_FC_01_Current_Values_Uncorrected_Flow_Rate =
                    FC_01_Current_Values_Uncorrected_Flow_Rate !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_01_Current_Values_Uncorrected_Flow_Rate.toString()
                              )
                          )
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate &&
                                        !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVF_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate &&
                                                !maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                                    ? "white"
                                                    : maintainFC_01_Current_Values_Uncorrected_Flow_Rate
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_01_Current_Values_Uncorrected_Flow_Rate
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data2") {
                const rounded_FC_01_Accumulated_Values_Volume =
                    FC_01_Accumulated_Values_Volume !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_01_Accumulated_Values_Volume.toString()
                              )
                          )
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_01_Accumulated_Values_Volume &&
                                        !maintainFC_01_Accumulated_Values_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Volume
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVA_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_01_Accumulated_Values_Volume &&
                                                !maintainFC_01_Accumulated_Values_Volume
                                                    ? "white"
                                                    : maintainFC_01_Accumulated_Values_Volume
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_01_Accumulated_Values_Volume
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data1") {
                const rounded_FC_01_Accumulated_Values_Uncorrected_Volume =
                    FC_01_Accumulated_Values_Uncorrected_Volume !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_01_Accumulated_Values_Uncorrected_Volume.toString()
                              )
                          )
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    color: "white",
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    background:
                                        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume &&
                                        !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                            ? "#ff5656"
                                            : maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVA_1()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume &&
                                                !maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                                    ? "white"
                                                    : maintainFC_01_Accumulated_Values_Uncorrected_Volume
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.GVA} :
                                    </p>

                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_01_Accumulated_Values_Uncorrected_Volume
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data5") {
                const rounded_FC_02_Current_Values_Flow_Rate =
                    FC_02_Current_Values_Flow_Rate !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_02_Current_Values_Flow_Rate.toString()
                              )
                          )
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Flow_Rate &&
                                        !maintainFC_02_Current_Values_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Flow_Rate
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVF_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_02_Current_Values_Flow_Rate &&
                                                !maintainFC_02_Current_Values_Flow_Rate
                                                    ? "white"
                                                    : maintainFC_02_Current_Values_Flow_Rate
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.SVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_02_Current_Values_Flow_Rate
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data6") {
                const rounded_FC_02_Current_Values_Uncorrected_Flow_Rate =
                    FC_02_Current_Values_Uncorrected_Flow_Rate !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_02_Current_Values_Uncorrected_Flow_Rate.toString()
                              )
                          )
                        : "";
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate &&
                                        !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVF_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate &&
                                                !maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                                                    ? "white"
                                                    : maintainFC_02_Current_Values_Uncorrected_Flow_Rate
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.GVF} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {formatValue(
                                            FC_02_Current_Values_Uncorrected_Flow_Rate
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3H}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data7") {
                const rounded_FC_02_Accumulated_Values_Volume =
                    FC_02_Accumulated_Values_Volume !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_02_Accumulated_Values_Volume.toString()
                              )
                          )
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Accumulated_Values_Volume &&
                                        !maintainFC_02_Accumulated_Values_Volume
                                            ? "#ff5656"
                                            : maintainFC_02_Accumulated_Values_Volume
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmSVA_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_02_Accumulated_Values_Volume &&
                                                !maintainFC_02_Accumulated_Values_Volume
                                                    ? "white"
                                                    : maintainFC_02_Accumulated_Values_Volume
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.SVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(
                                            FC_02_Accumulated_Values_Volume
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.SM3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "data8") {
                const rounded_FC_02_Accumulated_Values_Uncorrected_Volume =
                    FC_02_Accumulated_Values_Uncorrected_Volume !== null
                        ? new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          }).format(
                              parseFloat(
                                  FC_02_Accumulated_Values_Uncorrected_Volume.toString()
                              )
                          )
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    // padding: 2,
                                    borderRadius: 5,
                                    backgroundColor:
                                        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume &&
                                        !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                                            ? "#ff5656"
                                            : maintainFC_02_Accumulated_Values_Uncorrected_Volume
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmGVA_2()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume &&
                                                !maintainFC_02_Accumulated_Values_Uncorrected_Volume
                                                    ? "white"
                                                    : maintainFC_02_Accumulated_Values_Uncorrected_Volume
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        {ValueGas.GVA} :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(
                                            FC_02_Accumulated_Values_Uncorrected_Volume
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.M3}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans01") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdPT_1003 &&
                                        !maintainPT_1003
                                            ? "#ff5656"
                                            : maintainPT_1003
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPT_1903()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdPT_1003 &&
                                                !maintainPT_1003
                                                    ? "white"
                                                    : maintainPT_1003
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        Input Pressure:
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(PT_1003)}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarG
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans02") {
                const roundedFC_01_Current_Values_Static_Pressure =
                    FC_01_Current_Values_Static_Pressure !== null
                        ? parseFloat(
                              FC_01_Current_Values_Static_Pressure
                          ).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 23,
                                    fontWeight: 500,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFC_01_Current_Values_Static_Pressure &&
                                        !maintainFC_01_Current_Values_Static_Pressure
                                            ? "#ff5656"
                                            : maintainFC_01_Current_Values_Static_Pressure
                                            ? "orange"
                                            : "transparent",
                                }}
                                // onClick={() => confirmPCV1901()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                exceedThresholdFC_01_Current_Values_Static_Pressure &&
                                                !maintainFC_01_Current_Values_Static_Pressure
                                                    ? "white"
                                                    : maintainFC_01_Current_Values_Static_Pressure
                                                    ? "white"
                                                    : "orange",
                                        }}
                                    >
                                        Output Pressure:
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {/* {roundedFC_01_Current_Values_Static_Pressure} */}
                                        {formatValue(
                                            FC_01_Current_Values_Static_Pressure
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "white",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    BarA
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "Pressure_Trans03") {
                const roundedFC_02_Current_Values_Static_Pressure =
                    FC_02_Current_Values_Static_Pressure !== null
                        ? parseFloat(
                              FC_02_Current_Values_Static_Pressure
                          ).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    // padding: 2,
                                    borderRadius: 5,
                                    fontSize: 30,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        exceedThresholdFC_02_Current_Values_Static_Pressure &&
                                        !maintainFC_02_Current_Values_Static_Pressure
                                            ? "#ff5656"
                                            : maintainFC_02_Current_Values_Static_Pressure
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmFC_02_Current_Values_Static_Pressure()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    <p style={{ color: colorNameValue }}>
                                        PT-1002:
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {formatValue(
                                            FC_02_Current_Values_Static_Pressure
                                        )}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    Bar
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "timeUpdate3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,

                                    display: "flex",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        Gateway{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        FC{" "}
                                    </p>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        <p style={{ marginLeft: 5 }}>
                                            {active === true ? (
                                                <span
                                                    style={{
                                                        color: "#25d125",
                                                    }}
                                                >
                                                    Online
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color: "#ff5656",
                                                    }}
                                                >
                                                    Offline
                                                </span>
                                            )}
                                        </p>
                                        {FC_Conn_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        {FC_Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    ></p>
                                </div>
                            </div>
                        ),
                    },
                };
            }
            //  =============================== GD ===================================

            if (node.id === "GD1_Value1901") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    right: 4,
                                    backgroundColor:
                                        exceedThresholdGD1 && !maintainGD1
                                            ? "#ff5656"
                                            : maintainGD1
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1901()}
                            >
                                <p>{GD1} %LEL</p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "GD2_Value1902") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    position: "relative",
                                    bottom: 5,

                                    borderRadius: 2,
                                    right: 4,

                                    backgroundColor:
                                        exceedThresholdGD2 && !maintainGD2
                                            ? "#ff5656"
                                            : maintainGD2
                                            ? "orange"
                                            : "transparent",

                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmGD_1902()}
                            >
                                <p>{GD2} %LEL</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_IMG") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>{SVD_NO}</div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_IMG2") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>{SVD_NO}</div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "SDV_IMG3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div>
                                <div>
                                    {/* {NO === "1"
                                        ? SVD_NO
                                        : NO === "0"
                                        ? SVD_NC
                                        : null} */}
                                    {SVD_NO}
                                </div>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "FIQ_1901") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FC-1001
                                {lineDuty1901 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "FIQ_1902") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 27,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={confirmLineDuty}
                            >
                                FC-1002
                                {lineDuty1902 && (
                                    <span style={{ marginLeft: 30 }}>
                                        <i
                                            className="pi pi-check"
                                            style={{
                                                fontSize: 35,
                                                color: "green",
                                                fontWeight: 700,
                                            }}
                                        ></i>
                                    </span>
                                )}
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "AlarmCenter") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 40,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                // onClick={confirmLineDuty}
                            >
                                {alarmMessage && (
                                    <div className="alarm-message">
                                        {alarmMessage === "ALARM" ? (
                                            <span
                                                style={{
                                                    background: "red",
                                                    color: "white",
                                                    padding: "5px",
                                                    borderRadius: "3px",
                                                }}
                                            >
                                                {alarmMessage}
                                            </span>
                                        ) : alarmMessage === "Maintaining" ? (
                                            <span
                                                style={{
                                                    background: "orange",
                                                    color: "white",
                                                    padding: "5px",
                                                    borderRadius: "3px",
                                                }}
                                            >
                                                {alarmMessage}
                                            </span>
                                        ) : null}
                                    </div>
                                )}

                                {/* {alarmMessage} */}
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "timeUpdate3") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,

                                    display: "flex",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        Gateway{" "}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        FC{" "}
                                    </p>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                            display: "flex",
                                        }}
                                    >
                                        {" "}
                                        :
                                    </p>
                                </div>

                                <div style={{}}>
                                    <p style={{ marginLeft: 5 }}>
                                        <p style={{ marginLeft: 5 }}>
                                            {active === true ? (
                                                <span
                                                    style={{
                                                        color: "#25d125",
                                                    }}
                                                >
                                                    Online
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color: "#ff5656",
                                                    }}
                                                >
                                                    Offline
                                                </span>
                                            )}
                                        </p>
                                        {FC_Conn_STT === "1" ? (
                                            <span
                                                style={{
                                                    color: "#25d125",
                                                }}
                                            >
                                                Connected
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#ff5656",
                                                }}
                                            >
                                                Disconnect
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        {FC_Conn_STTValue}
                                    </p>
                                    <p
                                        style={{
                                            color: "white",
                                        }}
                                    ></p>
                                </div>
                            </div>
                        ),
                    },
                };
            }

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    // const storedPositionString = localStorage.getItem("positionsStation1");

    // const initialPositions = storedPositionString
    //     ? JSON.parse(storedPositionString)
    //     : {
    const initialPositions = {
        ArrowLeft1: { x: 70.80683998601398, y: 1649.360404545284 },
        ArrowLeft2: { x: 300.24889562316326, y: 1648.463264323256 },
        ArrowLeft3: { x: -147.03279355441217, y: 1648.7729531105015 },
        ArrowLeft4: { x: -348.8727941455311, y: 1648.4429695834062 },
        ArrowLeft5: { x: -327.22357349571735, y: 983.8228432857818 },
        ArrowLeft6: { x: -554.2449125135798, y: 1650.1074892133163 },
        ArrowRight1: { x: -1171.3503527970543, y: 1010.838328435673 },
        ArrowRight2: { x: -192.26630204961194, y: 959.7926698789865 },
        ArrowRight3: { x: 63.7991308964215, y: 958.1300358305643 },
        ArrowRight4: { x: -62.05505560659205, y: 1281.9447842181582 },
        ArrowRight5: { x: -326.9324788630221, y: 1119.1830445243488 },
        ArrowRight6: { x: -1170.6162034701915, y: 1281.3612068930154 },
        ArrowRight7: { x: -936.2881839270202, y: 1011.0045689113003 },
        ArrowRight8: { x: 815.0869792921062, y: 1115.1331389427157 },
        ArrowRight9: { x: 626.0122546328847, y: 1114.7639455103138 },
        ArrowRight10: { x: 310.106765359037, y: 955.5109846728951 },
        ArrowRight11: { x: -316.6395037280155, y: 1281.1651182233984 },
        ArrowRight12: { x: -543.9461794461627, y: 1011.2130354719432 },
        Ball_1: { x: -1002.1540152357474, y: 1284.8967593091372 },
        Ball_2: { x: -1001.7037249478651, y: 1015.5694424871908 },
        Ball_3: { x: -796.1753510751475, y: 1014.5293663885575 },
        Ball_4: { x: -594.6880627949854, y: 1015.0182627834936 },
        Ball_5: { x: -252.34554026736518, y: 962.0520002223236 },
        Ball_6: { x: 133.61099782167952, y: 1285.5012237071835 },
        Ball_7: { x: -408.0778877937685, y: 1285.6030390225217 },
        Ball_8: { x: 129.52740182364823, y: 962.730379731122 },
        Ball_9: { x: -120.8106510011111, y: 962.126659791528 },
        Ball_10: { x: -120.45803216451232, y: 1286.3043039274771 },
        Ball_21: { x: 257.36756937899474, y: 959.697950483516 },
        Ball_22: { x: 257.4712320255406, y: 1285.8217329491467 },
        Ball_23: { x: 556.0306362594578, y: 1286.0802657671068 },
        Ball_24: { x: 533.7286465566424, y: 959.9371373901681 },
        Ball_Arrow: { x: -26.178705894634888, y: 1130.4368982573587 },
        Ball_Center: { x: 32.99732812678664, y: 1121.9231851115933 },
        Ball_Last: { x: 1083.4734961601034, y: 1118.7702967541966 },
        Ball_PSV: { x: -277.5270503941649, y: 1060.5010724188335 },
        Ball_SDV_1: { x: -691.117998264808, y: 1111.4501847295983 },
        Ball_SDV_2: { x: 927.1462182321169, y: 1220.046035850855 },
        Ball_Small_1: { x: 491.7057517753409, y: 1272.5244751518114 },
        Ball_Small_2: { x: 486.54063790117664, y: 946.8307751670075 },
        FIQ_1_IMG: { x: 7.426305658706411, y: 1267.878596444663 },
        FIQ_1_NON: { x: 37.78417434386884, y: 1275.4680636159535 },
        FIQ_2_IMG: { x: 7.424064289514547, y: 945.5844810063686 },
        FIQ_2_NON: { x: 36.811438387391945, y: 964.0214642895583 },
        Header: { x: -1169.5687093040035, y: 566.153076389645 },
        PCV1: { x: 401.7562316524744, y: 1270.3587160528914 },
        PCV1_none1: { x: 429.9846841270418, y: 969.5356388835302 },
        PCV1_none2: { x: 431.2402274026139, y: 1295.4273827669172 },
        PCV2: { x: 400.5731404350574, y: 944.14763536896 },
        PCV2_none1: { x: 497.17387216109614, y: 998.0331292701401 },
        PCV2_none2: { x: 502.42847988139124, y: 1324.4494270673638 },
        PCV_NUM01: { x: 289.97119619395505, y: 861.9203393400161 },
        PCV_NUM02: { x: 291.9418419587673, y: 1369.3879482099635 },
        PT_COL_1: { x: -838.9627908268365, y: 1008.3135067445331 },
        PT_COL_2: { x: 800.3100552386497, y: 1112.9702724849426 },
        PT_IMG_1: { x: -871.3081669427478, y: 945.0639549314378 },
        PT_IMG_2: { x: 767.9072344387844, y: 1049.469849982712 },
        Pressure_Trans01: { x: -1003.9617715201172, y: 838.1272663738199 },
        Pressure_Trans02: { x: 635.1594253277461, y: 861.2799336024309 },
        SDV_LINE6: { x: -708.3978300391769, y: 981.5026854102861 },
        SDV_LINE6_NAME: { x: -732.2027886390686, y: 933.8927682105026 },
        SDV_LINE7: { x: 911.4024297672285, y: 1085.5789235413577 },
        SDV_LINE7_NAME: { x: 884.1078897777516, y: 1040.6715493265597 },
        SDV_NON1: { x: -673.7892272357531, y: 1143.459309338155 },
        SDV_NON2: { x: -693.1257051668601, y: 1046.7298432790153 },
        SDV_NON3: { x: 944.3053853115945, y: 1251.6834860447348 },
        SDV_NON4: { x: 926.2934777345737, y: 1151.6863439792057 },
        Station2: { x: -783.9541227461544, y: 1791.9862453748287 },
        Station3: { x: -178.12234755043983, y: 1795.6864146659916 },
        Station4: { x: -378.4755427822713, y: 1794.3270068177396 },
        Station5: { x: -582.008873184103, y: 1793.5597047493632 },
        Station6: { x: 272.6463119100941, y: 1795.9986315431704 },
        Station7: { x: 18.521867776247575, y: 1796.4566866766143 },
        Station8: { x: 676.730324895667, y: 1794.865496751783 },
        Station9: { x: 477.148405991921, y: 1795.7239040075906 },
        Tank: { x: -471.8491524556945, y: 968.8737178626768 },
        Tank_Name: { x: -479.9774896505711, y: 903.2309862412246 },
        borderWhite: { x: -1327.9788742383255, y: 560.1210551008136 },
        data1: { x: -103.15423072020653, y: 861.205783524047 },
        data2: { x: -103.41768247125054, y: 787.8261219608379 },
        data3: { x: -103.75308584284522, y: 714.2000355637527 },
        data4: { x: -103.4831968766506, y: 640.575122945293 },
        data5: { x: -102.52508080991166, y: 1369.3696253484848 },
        data6: { x: -102.47385863886143, y: 1442.3755311625578 },
        data7: { x: -102.53147123851167, y: 1515.2601465744929 },
        data8: { x: -102.42369687327391, y: 1588.7564082900412 },
        line1: { x: -1213.6281398603076, y: 1046.2942677786787 },
        line1_Name: { x: -1325.0728063162799, y: 1025.638575288994 },
        line2: { x: -1205.804716392042, y: 1316.3700838133445 },
        line2_Name: { x: -1322.4231580879728, y: 1295.1667307777207 },
        line3: { x: -984.1479726009184, y: 1045.5206742603311 },
        line4: { x: -984.7190373942689, y: 1315.5920694726296 },
        line5: { x: -778.9438493843093, y: 1045.4703346741583 },
        line6: { x: -676.3291796967488, y: 1045.431804839495 },
        line7: { x: -576.5411082893928, y: 1046.3096648354242 },
        line8: { x: -432.07080662539727, y: 1045.4419671772653 },
        line9: { x: -389.44704906465745, y: 1315.416493669179 },
        line10: { x: -357.2982795972111, y: 1154.4001642602998 },
        line11: { x: -266.58007633135446, y: 1077.8736646077737 },
        line12: { x: -361.9350364765795, y: 1018.1573346937878 },
        line13: { x: -379.7188320425952, y: 994.0852608261773 },
        line14: { x: -234.39340621574243, y: 994.1136348301156 },
        line15: { x: -104.2739086089499, y: 994.1406223413721 },
        line16: { x: -103.27429171747147, y: 1317.0068677838206 },
        line17: { x: 147.49410807009815, y: 994.1707022117523 },
        line18: { x: 151.4556395221927, y: 1316.9658199873434 },
        line19: { x: 166.87892366306454, y: 1151.3174439754396 },
        line20: { x: 257.95057449494124, y: 1151.3242663904882 },
        line21: { x: 274.8359951164879, y: 991.6383513832209 },
        line22: { x: 274.5973960061776, y: 1317.4869019572664 },
        line23: { x: 573.8507489885311, y: 1317.569803409326 },
        line24: { x: 551.227431814638, y: 991.8233854554337 },
        line25: { x: 586.8958961875392, y: 1150.4971560041965 },
        line26: { x: 1101.2098189017306, y: 1150.4008658316943 },
        line27: { x: -726.6858044062238, y: 1684.016942153777 },
        line28: { x: -588.3524710728906, y: 1684.016942153777 },
        line29: { x: -726.6858044062238, y: 1721.6836088204439 },
        line_center1: { x: 143.27766339452606, y: 993.5914962028294 },
        line_center2: { x: 50.17579303327713, y: 1153.404525012583 },
        line_center3: { x: 10.682459160556405, y: 1153.5524624404293 },
        line_center4: { x: -101.93414189486886, y: 1317.763155000088 },
        timeUpdate3: { x: -1287.373388294895, y: 671.2012964315752 },
    };
    const [positions, setPositions] = useState(initialPositions);

    //=============================================================================================

    useEffect(() => {
        if (
            (exceedThresholdFC_Lithium_Battery_Status &&
                !maintainFC_Lithium_Battery_Status) ||
            (exceedThresholdFC_Battery_Voltage &&
                !maintainFC_Battery_Voltage) ||
            (exceedThresholdFC_System_Voltage && !maintainFC_System_Voltage) ||
            (exceedThresholdFC_Charger_Voltage &&
                !maintainFC_Charger_Voltage) ||
            (exceedThresholdFC_Conn_STT && !maintainFC_Conn_STT) ||
            (exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume &&
                !maintainFC_01_Accumulated_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_01_Accumulated_Values_Volume &&
                !maintainFC_01_Accumulated_Values_Volume) ||
            (exceedThresholdFC_01_Current_Values_Static_Pressure &&
                !maintainFC_01_Current_Values_Static_Pressure) ||
            (exceedThresholdFC_01_Current_Values_Temperature &&
                !maintainFC_01_Current_Values_Temperature) ||
            (exceedThresholdFC_01_Current_Values_Flow_Rate &&
                !maintainFC_01_Current_Values_Flow_Rate) ||
            (exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate &&
                !maintainFC_01_Current_Values_Uncorrected_Flow_Rate) ||
            (exceedThresholdFC_01_Today_Values_Volume &&
                !maintainFC_01_Today_Values_Volume) ||
            (exceedThresholdFC_01_Today_Values_Uncorrected_Volume &&
                !maintainFC_01_Today_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_01_Yesterday_Values_Volume &&
                !maintainFC_01_Yesterday_Values_Volume) ||
            (exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume &&
                !maintainFC_01_Yesterday_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume &&
                !maintainFC_02_Accumulated_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Accumulated_Values_Volume &&
                !maintainFC_02_Accumulated_Values_Volume) ||
            (exceedThresholdFC_02_Current_Values_Static_Pressure &&
                !maintainFC_02_Current_Values_Static_Pressure) ||
            (exceedThresholdFC_02_Current_Values_Temperature &&
                !maintainFC_02_Current_Values_Temperature) ||
            (exceedThresholdFC_02_Current_Values_Flow_Rate &&
                !maintainFC_02_Current_Values_Flow_Rate) ||
            (exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate &&
                !maintainFC_02_Current_Values_Uncorrected_Flow_Rate) ||
            (exceedThresholdFC_02_Today_Values_Volume &&
                !maintainFC_02_Today_Values_Volume) ||
            (exceedThresholdFC_02_Today_Values_Uncorrected_Volume &&
                !maintainFC_02_Today_Values_Uncorrected_Volume) ||
            (exceedThresholdFC_02_Yesterday_Values_Volume &&
                !maintainFC_02_Yesterday_Values_Volume) ||
            (exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume &&
                !maintainFC_02_Yesterday_Values_Uncorrected_Volume) ||
            (exceedThresholdPT_1003 && !maintainPT_1003)
        ) {
            setAlarmMessage("ALARM");
        } else if (
            maintainFC_Lithium_Battery_Status ||
            maintainFC_Battery_Voltage ||
            maintainFC_System_Voltage ||
            maintainFC_Charger_Voltage ||
            maintainFC_Conn_STT ||
            maintainFC_01_Accumulated_Values_Uncorrected_Volume ||
            maintainFC_01_Accumulated_Values_Volume ||
            maintainFC_01_Current_Values_Static_Pressure ||
            maintainFC_01_Current_Values_Temperature ||
            maintainFC_01_Current_Values_Flow_Rate ||
            maintainFC_01_Current_Values_Uncorrected_Flow_Rate ||
            maintainFC_01_Today_Values_Volume ||
            maintainFC_01_Today_Values_Uncorrected_Volume ||
            maintainFC_01_Yesterday_Values_Volume ||
            maintainFC_01_Yesterday_Values_Uncorrected_Volume ||
            maintainFC_02_Accumulated_Values_Uncorrected_Volume ||
            maintainFC_02_Accumulated_Values_Volume ||
            maintainFC_02_Current_Values_Static_Pressure ||
            maintainFC_02_Current_Values_Temperature ||
            maintainFC_02_Current_Values_Flow_Rate ||
            maintainFC_02_Current_Values_Uncorrected_Flow_Rate ||
            maintainFC_02_Today_Values_Volume ||
            maintainFC_02_Today_Values_Uncorrected_Volume ||
            maintainFC_02_Yesterday_Values_Volume ||
            maintainFC_02_Yesterday_Values_Uncorrected_Volume ||
            maintainPT_1003
        ) {
            setAlarmMessage("Maintaining");
        } else {
            setAlarmMessage(null);
        }
    }, [
        exceedThresholdFC_Lithium_Battery_Status,
        maintainFC_Lithium_Battery_Status,
        exceedThresholdFC_Battery_Voltage,
        maintainFC_Battery_Voltage,
        exceedThresholdFC_System_Voltage,
        maintainFC_System_Voltage,
        exceedThresholdFC_Charger_Voltage,
        maintainFC_Charger_Voltage,
        exceedThresholdFC_Conn_STT,
        maintainFC_Conn_STT,
        exceedThresholdFC_01_Accumulated_Values_Uncorrected_Volume,
        maintainFC_01_Accumulated_Values_Uncorrected_Volume,
        exceedThresholdFC_01_Accumulated_Values_Volume,
        maintainFC_01_Accumulated_Values_Volume,
        exceedThresholdFC_01_Current_Values_Static_Pressure,
        maintainFC_01_Current_Values_Static_Pressure,
        exceedThresholdFC_01_Current_Values_Temperature,
        maintainFC_01_Current_Values_Temperature,
        exceedThresholdFC_01_Current_Values_Flow_Rate,
        maintainFC_01_Current_Values_Flow_Rate,
        exceedThresholdFC_01_Current_Values_Uncorrected_Flow_Rate,
        maintainFC_01_Current_Values_Uncorrected_Flow_Rate,
        exceedThresholdFC_01_Today_Values_Volume,
        maintainFC_01_Today_Values_Volume,
        exceedThresholdFC_01_Today_Values_Uncorrected_Volume,
        maintainFC_01_Today_Values_Uncorrected_Volume,
        exceedThresholdFC_01_Yesterday_Values_Volume,
        maintainFC_01_Yesterday_Values_Volume,
        exceedThresholdFC_01_Yesterday_Values_Uncorrected_Volume,
        maintainFC_01_Yesterday_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Accumulated_Values_Uncorrected_Volume,
        maintainFC_02_Accumulated_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Accumulated_Values_Volume,
        maintainFC_02_Accumulated_Values_Volume,
        exceedThresholdFC_02_Current_Values_Static_Pressure,
        maintainFC_02_Current_Values_Static_Pressure,
        exceedThresholdFC_02_Current_Values_Temperature,
        maintainFC_02_Current_Values_Temperature,
        exceedThresholdFC_02_Current_Values_Flow_Rate,
        maintainFC_02_Current_Values_Flow_Rate,
        exceedThresholdFC_02_Current_Values_Uncorrected_Flow_Rate,
        maintainFC_02_Current_Values_Uncorrected_Flow_Rate,
        exceedThresholdFC_02_Today_Values_Volume,
        maintainFC_02_Today_Values_Volume,
        exceedThresholdFC_02_Today_Values_Uncorrected_Volume,
        maintainFC_02_Today_Values_Uncorrected_Volume,
        exceedThresholdFC_02_Yesterday_Values_Volume,
        maintainFC_02_Yesterday_Values_Volume,
        exceedThresholdFC_02_Yesterday_Values_Uncorrected_Volume,
        maintainFC_02_Yesterday_Values_Uncorrected_Volume,
        exceedThresholdPT_1003,
        maintainPT_1003,
    ]);

    //=============================================================================================

    const lineColor = "yellow";

    const [isAnimated07, setIsAnimated07] = useState<boolean>(false);
    const [isAnimated08, setIsAnimated08] = useState<boolean>(false);
    const [isAnimated09, setIsAnimated09] = useState<boolean>(false);
    const [isAnimated10, setIsAnimated10] = useState<boolean>(false);
    const [isAnimatedCenter, setIsAnimatedCenter] = useState<boolean>(false);

    const animated_center = (value: boolean) => {
        setIsAnimatedCenter(value);
    };
    const animated_07 = (value: boolean) => {
        setIsAnimated07(value);
    };
    const animated_08 = (value: boolean) => {
        setIsAnimated08(value);
    };
    const animated_09 = (value: boolean) => {
        setIsAnimated09(value);
    };
    const animated_10 = (value: boolean) => {
        setIsAnimated10(value);
    };

    useEffect(() => {
        const updatedEdges07_08 = edge7.map((edge) => ({
            ...edge,
            animated: isAnimated07,
            style: {
                strokeWidth: isAnimated07 && !isAnimatedCenter ? 3 : 10,
                stroke:
                    isAnimated07 && !isAnimatedCenter ? "orange" : lineColor,
            },
        }));

        const updatedEdges09_10 = edge9.map((edge) => ({
            ...edge,
            animated: isAnimated09 && !isAnimatedCenter, // Bổ sung điều kiện !isAnimatedCenter ở đây
            style: {
                strokeWidth: isAnimated09 && !isAnimatedCenter ? 3 : 10, // Thêm điều kiện ở đây
                stroke:
                    isAnimated09 && !isAnimatedCenter ? "orange" : lineColor, // Thêm điều kiện ở đây
            },
        }));

        const updatedEdgesCenter = egdeCenter.map((edge) => ({
            ...edge,
            animated: isAnimatedCenter,
            style: {
                strokeWidth: isAnimatedCenter ? 3 : 10,
                stroke: isAnimatedCenter ? "orange" : lineColor,
            },
        }));

        const allEdges = [
            ...edgeZOVC,

            ...updatedEdgesCenter,
            ...(isAnimatedCenter ? [] : updatedEdges07_08), // Thêm điều kiện ở đây

            ...(isAnimatedCenter ? [] : updatedEdges09_10), // Thêm điều kiện ở đây
        ];

        setEdges(allEdges);
    }, [isAnimated07, isAnimated09, isAnimatedCenter]);

    const edge7 = [
        {
            id: "animation_line7-animation_line8",
            source: "animation_line7",
            target: "animation_line8",
            animated: isAnimated07,
            type: "smoothstep",
        },
    ];
    const edge9 = [
        {
            id: "animation_line9-animation_line10",
            source: "animation_line9",
            target: "animation_line10",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const egdeCenter = [
        {
            id: "animation_line7-animation_line11",
            source: "animation_line7",
            target: "animation_line11",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line11-animation_line12",
            source: "animation_line11",
            target: "animation_line12",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line13-animation_line14",
            source: "animation_line13",
            target: "animation_line14",
            animated: isAnimated09,
            type: "smoothstep",
        },
        {
            id: "animation_line14-animation_line15",
            source: "animation_line14",
            target: "animation_line15",
            animated: isAnimated09,
            type: "smoothstep",
        },
    ];

    const [OnOpLine1, setOnOpLine1] = useState<boolean>(false);

    const OnLine1 = (value: boolean) => {
        setOnOpLine1(value);
    };

    const boxShadowStyle = OnOpLine1
        ? "0px 4px 10px rgba(0, 255, 0, 0.5)" // Example shadow when true
        : "0px 4px 10px rgba(255, 0, 0, 0.5)"; // Example shadow when false

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([...edge7]);

    const [initialNodes, setInitialNodes] = useState([
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 10,
                background: "none",
                color: "white",
            },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: "none",
                color: "white",
            },
        },
        {
            id: "line3",
            position: positions.line3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,

                color: "white",
            },
        },
        {
            id: "line4",
            position: positions.line4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,

                color: "white",
            },
        },
        {
            id: "line5",
            position: positions.line5,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,

                color: "white",
            },
        },
        {
            id: "line6",
            position: positions.line6,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,
            },
        },
        {
            id: "line7",
            position: positions.line7,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 10,
                background: "none",
                color: "white",
            },
        },
        {
            id: "line8",
            position: positions.line8,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,
                color: "white",
            },
        },
        {
            id: "line9",
            position: positions.line9,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 22,
                color: "white",
            },
        },
        {
            id: "line10",
            position: positions.line10,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",

                background: "none",
                width: 10,
                height: 10,

                color: "white",
            },
        },
        {
            id: "line11",
            position: positions.line11,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",

                background: "none",
                width: 35,
                height: 35,

                color: "white",
            },
        },
        {
            id: "line12",
            position: positions.line12,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "#333333",
                background: "none",
                width: 10,
                height: 22,
                color: "white",
            },
        },
        {
            id: "line13",
            position: positions.line13,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line14",
            position: positions.line14,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line15",
            position: positions.line15,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line16",
            position: positions.line16,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line17",
            position: positions.line17,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line18",
            position: positions.line18,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line19",
            position: positions.line19,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line20",
            position: positions.line20,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line21",
            position: positions.line21,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line22",
            position: positions.line22,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line23",
            position: positions.line23,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "line24",
            position: positions.line24,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line25",
            position: positions.line25,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line26",
            position: positions.line26,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line27",
            position: positions.line27,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: "none",
                color: "white",
            },
        },

        {
            id: "line28",
            position: positions.line28,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: "none",
                color: "white",
            },
        },

        {
            id: "line29",
            position: positions.line29,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: "none",
                color: "white",
            },
        },
        //=================================================

        {
            id: "Station2",
            position: positions.Station2,
            type: "custom",
            data: {
                label: <div>Melaka</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Top,
            style: {
                border: "none",
                background: background,
                color: "white",
                fontSize: 25,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "Station3",
            position: positions.Station3,
            type: "custom",
            data: {
                label: <div>Selangor</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                background: background,
                color: "white",
                fontSize: 25,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "Station4",
            position: positions.Station4,
            type: "custom",
            data: {
                label: <div>Sabah</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",

                background: background,
                color: "white",
                fontSize: 25,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "Station5",
            position: positions.Station5,
            type: "custom",
            data: {
                label: <div>Penang</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                background: background,
                color: "white",
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
        },

        {
            id: "Station6",
            position: positions.Station6,
            type: "custom",
            data: {
                label: <div>Johor</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },

        {
            id: "Station7",
            position: positions.Station7,
            type: "custom",
            data: {
                label: <div> Kota Kinabalu</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,
                width: 200,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },
        {
            id: "Station8",
            position: positions.Station8,
            type: "custom",
            data: {
                label: <div>Perlis</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },

        {
            id: "Station9",
            position: positions.Station9,
            type: "custom",
            data: {
                label: <div>Pengerang</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },

        {
            id: "line1_Name",
            position: positions.line1_Name,
            type: "custom",
            data: {
                label: <div>Line 1</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },

        {
            id: "line2_Name",
            position: positions.line2_Name,
            type: "custom",
            data: {
                label: <div>Line 2</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Right,
            style: {
                border: "none",
                fontSize: 25,

                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)

                background: background,
                color: "white",
            },
        },

        //====================================================

        {
            id: "line_center1",
            position: positions.line_center1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line_center2",
            position: positions.line_center2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line_center3",
            position: positions.line_center3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "line_center4",
            position: positions.line_center4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 1,
                background: background,
                color: "white",
            },
        },
        //===================================================================

        {
            id: "SDV_LINE6",
            position: positions.SDV_LINE6,
            type: "custom",
            data: {
                label: <div>{SVD_NO}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "SDV_LINE6_NAME",
            position: positions.SDV_LINE6_NAME,
            type: "custom",
            data: {
                label: <div>SDV-1001</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 20,
                border: "none",
                fontWeight: 600,

                background: "green",
                color: "white",
            },
        },

        {
            id: "SDV_LINE7",
            position: positions.SDV_LINE7,
            type: "custom",
            data: {
                label: <div>{SVD_NO}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 30,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "SDV_LINE7_NAME",
            position: positions.SDV_LINE7_NAME,
            type: "custom",
            data: {
                label: <div>SDV-1002</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 20,
                border: "none",
                fontWeight: 600,

                background: "green",
                color: "white",
            },
        },

        {
            id: "SDV_NON1",
            position: positions.SDV_NON1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 10,
                background: "none",
                color: "white",
            },
        },
        {
            id: "SDV_NON2",
            position: positions.SDV_NON2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 70,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "SDV_NON3",
            position: positions.SDV_NON3,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 35,
                height: 10,
                background: "none",
                color: "white",
            },
        },
        {
            id: "SDV_NON4",
            position: positions.SDV_NON4,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 70,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "Ball_SDV_1",
            position: positions.Ball_SDV_1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueSDV1 />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "Ball_SDV_2",
            position: positions.Ball_SDV_2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueSDV1 />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 10,
                background: "none",
                color: "white",
            },
        },

        {
            id: "Ball_PSV",
            position: positions.Ball_PSV,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavlePSV />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 10,
                background: "none",
                color: "white",
                zIndex: 9999999,
            },
        },

        //================================================

        {
            id: "Ball_1",
            position: positions.Ball_1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue01 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_2",
            position: positions.Ball_2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue02 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_3",
            position: positions.Ball_3,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue03 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_4",
            position: positions.Ball_4,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue04 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_5",
            position: positions.Ball_5,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue05 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
                zIndex: 99999,
            },
        },

        {
            id: "Ball_6",
            position: positions.Ball_6,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue06 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_7",
            position: positions.Ball_7,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue07 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },
        {
            id: "Ball_8",
            position: positions.Ball_8,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue08 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },
        {
            id: "Ball_9",
            position: positions.Ball_9,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue09 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_10",
            position: positions.Ball_10,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueFirst />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_21",
            position: positions.Ball_21,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue10 />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "Ball_22",
            position: positions.Ball_22,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue11 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "Ball_23",
            position: positions.Ball_23,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue12 />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },
        {
            id: "Ball_24",
            position: positions.Ball_24,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValue13 />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_Center",
            position: positions.Ball_Center,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueCenter />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_Arrow",
            position: positions.Ball_Arrow,
            type: "custom",
            data: {
                label: <div>{VavleWay}</div>,
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_Last",
            position: positions.Ball_Last,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallValueLast />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: background,
                color: "white",
            },
        },

        {
            id: "Ball_Small_1",
            position: positions.Ball_Small_1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: "none",
                color: "white",
            },
        },

        {
            id: "Ball_Small_2",
            position: positions.Ball_Small_2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/BallValueRight.png"
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            style: {
                border: "none",
                width: 1,
                height: 1,
                background: "none",
                color: "white",
            },
        },
        {
            id: "Tank",
            position: positions.Tank,
            type: "custom",
            data: {
                label: <div>{tankGas}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "Tank_Name",
            position: positions.Tank_Name,
            type: "custom",
            data: {
                label: <div>Buffet Tank</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                fontSize: 25,
                border: background,
                width: 200,
                background: background,
                color: "white",
            },
        },

        //===================================================

        {
            id: "FIQ_1_IMG",
            position: positions.FIQ_1_IMG,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "FIQ_2_IMG",
            position: positions.FIQ_2_IMG,
            type: "custom",
            data: {
                label: <div>{FIQ}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: background,
                width: 0,
                height: 0,
                background: background,
                color: "white",
            },
        },

        {
            id: "FIQ_1_NON",
            position: positions.FIQ_1_NON,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Bottom,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "FIQ_2_NON",
            position: positions.FIQ_2_NON,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        //===================================================

        {
            id: "data1",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data1,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "data2",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data2,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data3",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data3,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data4",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data4,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "data8",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data8,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data7",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.data7,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data6",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data6,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "data5",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.data5,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Top,
        },

        //===================================================================

        {
            id: "PT_IMG_1",
            position: positions.PT_IMG_1,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "none",
                color: "white",
            },
        },
        {
            id: "PT_IMG_2",
            position: positions.PT_IMG_2,
            type: "custom",
            data: {
                label: <div>{PTV}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "none",
                color: "white",
            },
        },
        {
            id: "PT_COL_1",
            position: positions.PT_COL_1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "orange",
                color: "white",
                zIndex: 9999,
            },
        },
        {
            id: "PT_COL_2",
            position: positions.PT_COL_2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,

            style: {
                border: "none",
                width: 0,
                height: 50,
                background: "orange",
                color: "white",
                zIndex: 99999,
            },
        },

        {
            id: "Pressure_Trans01",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.Pressure_Trans01,

            style: {
                background: "none",
                border: "1px solid white",
                width: 350,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "Pressure_Trans02",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },

            position: positions.Pressure_Trans02,

            style: {
                background: "none",
                border: "1px solid white",
                width: 350,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        //===================================================================

        {
            id: "PCV1",
            position: positions.PCV1,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },
        {
            id: "PCV2",
            position: positions.PCV2,
            type: "custom",
            data: {
                label: (
                    <div>
                        <Image
                            src="/layout/imgGraphic/PVC.png"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
                    </div>
                ),
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "PCV1_none1",
            position: positions.PCV1_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },
        {
            id: "PCV2_none1",
            position: positions.PCV2_none1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "PCV1_none2",
            position: positions.PCV1_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },
        {
            id: "PCV2_none2",
            position: positions.PCV2_none2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "PCV_NUM01",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 500,
                        }}
                    >
                        <PCV_01_Otsuka />
                    </div>
                ),
            },
            position: positions.PCV_NUM01,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PCV_NUM02",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        <PCV_02_Otsuka />
                    </div>
                ),
            },

            position: positions.PCV_NUM02,

            style: {
                background: "none",
                border: "1px solid white",
                width: 300,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        //========================================================

        {
            id: "borderWhite",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 32,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.borderWhite,
            style: {
                background: background,
                border: "1px solid white",
                width: 580,
                height: 250,
                borderRadius: 50,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "timeUpdate3",
            data: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: 60,
                                    fontWeight: 600,
                                    color: "yellow",
                                }}
                            ></p>
                        </div>
                    </div>
                ),
            },

            position: positions.timeUpdate3,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: 500,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "Header",
            data: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: 55,
                                    fontWeight: 600,
                                    color: "orange",
                                }}
                            >
                                Sarawak
                            </p>
                        </div>
                    </div>
                ),
            },

            position: positions.Header,
            zIndex: 9999,

            style: {
                background: background,
                border: background,
                width: 10,

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        //=================================================

        {
            id: "ArrowRight1",
            position: positions.ArrowRight1,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight2",
            position: positions.ArrowRight2,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight3",
            position: positions.ArrowRight3,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight4",
            position: positions.ArrowRight4,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight5",
            position: positions.ArrowRight5,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight6",
            position: positions.ArrowRight6,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight7",
            position: positions.ArrowRight7,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight8",
            position: positions.ArrowRight8,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight9",
            position: positions.ArrowRight9,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight10",
            position: positions.ArrowRight10,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight11",
            position: positions.ArrowRight11,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowRight12",
            position: positions.ArrowRight12,
            type: "custom",
            data: {
                label: <div>{ArrowRightLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        //====================================

        {
            id: "ArrowLeft1",
            position: positions.ArrowLeft1,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowLeft2",
            position: positions.ArrowLeft2,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowLeft3",
            position: positions.ArrowLeft3,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowLeft4",
            position: positions.ArrowLeft4,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },
        {
            id: "ArrowLeft5",
            position: positions.ArrowLeft5,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },

        {
            id: "ArrowLeft6",
            position: positions.ArrowLeft6,
            type: "custom",
            data: {
                label: <div>{ArrowLeftLGDS}</div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 0,
                height: 0,
                background: "none",
                color: "white",
            },
        },
    ]);

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const onNodeDragStop = useCallback(
        (event: any, node: any) => {
            if (editingEnabled) {
                const { id, position } = node;
                setNodes((prevNodes) =>
                    prevNodes.map((n) =>
                        n.id === id ? { ...n, position: position } : n
                    )
                );

                // ============ line =========================
                if (id === "line1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line1: position,
                    }));
                } else if (id === "line2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line2: position,
                    }));
                } else if (id === "line3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line3: position,
                    }));
                } else if (id === "line4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line4: position,
                    }));
                } else if (id === "line5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line5: position,
                    }));
                } else if (id === "line6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line6: position,
                    }));
                } else if (id === "line7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line7: position,
                    }));
                } else if (id === "line8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line8: position,
                    }));
                } else if (id === "line9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line9: position,
                    }));
                } else if (id === "line10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line10: position,
                    }));
                } else if (id === "line11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line11: position,
                    }));
                } else if (id === "line12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line12: position,
                    }));
                } else if (id === "line13") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line13: position,
                    }));
                } else if (id === "line14") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line14: position,
                    }));
                } else if (id === "line15") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line15: position,
                    }));
                } else if (id === "line16") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line16: position,
                    }));
                } else if (id === "line17") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line17: position,
                    }));
                } else if (id === "line18") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line18: position,
                    }));
                } else if (id === "line19") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line19: position,
                    }));
                } else if (id === "line20") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line20: position,
                    }));
                } else if (id === "line21") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line21: position,
                    }));
                } else if (id === "line22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line22: position,
                    }));
                } else if (id === "line23") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line23: position,
                    }));
                } else if (id === "line24") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line24: position,
                    }));
                } else if (id === "line26") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line26: position,
                    }));
                } else if (id === "line25") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line25: position,
                    }));
                } else if (id === "line27") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line27: position,
                    }));
                } else if (id === "line28") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line28: position,
                    }));
                } else if (id === "line29") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line29: position,
                    }));
                }

                //====================================================
                else if (id === "Station2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station2: position,
                    }));
                } else if (id === "Station3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station3: position,
                    }));
                } else if (id === "Station4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station4: position,
                    }));
                } else if (id === "Station5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station5: position,
                    }));
                } else if (id === "Station6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station6: position,
                    }));
                } else if (id === "Station7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station7: position,
                    }));
                } else if (id === "Station8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station8: position,
                    }));
                } else if (id === "Station9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Station9: position,
                    }));
                } else if (id === "line1_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line1_Name: position,
                    }));
                } else if (id === "line2_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line2_Name: position,
                    }));
                }
                //====================================================
                else if (id === "line_center1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line_center1: position,
                    }));
                } else if (id === "line_center2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line_center2: position,
                    }));
                } else if (id === "line_center3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line_center3: position,
                    }));
                } else if (id === "line_center4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        line_center4: position,
                    }));
                }
                //===========================================
                else if (id === "SDV_LINE6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_LINE6: position,
                    }));
                } else if (id === "SDV_LINE7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_LINE7: position,
                    }));
                } else if (id === "SDV_LINE6_NAME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_LINE6_NAME: position,
                    }));
                } else if (id === "SDV_LINE7_NAME") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_LINE7_NAME: position,
                    }));
                } else if (id === "SDV_NON1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_NON1: position,
                    }));
                } else if (id === "SDV_NON2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_NON2: position,
                    }));
                } else if (id === "SDV_NON3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_NON3: position,
                    }));
                } else if (id === "SDV_NON4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        SDV_NON4: position,
                    }));
                }

                //===========================================
                else if (id === "FIQ_1_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1_IMG: position,
                    }));
                } else if (id === "FIQ_2_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_2_IMG: position,
                    }));
                } else if (id === "FIQ_1_NON") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_1_NON: position,
                    }));
                } else if (id === "FIQ_2_NON") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        FIQ_2_NON: position,
                    }));
                }

                //===========================================
                else if (id === "Ball_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_1: position,
                    }));
                } else if (id === "Ball_2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_2: position,
                    }));
                } else if (id === "Ball_3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_3: position,
                    }));
                } else if (id === "Ball_4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_4: position,
                    }));
                } else if (id === "Ball_5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_5: position,
                    }));
                } else if (id === "Ball_6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_6: position,
                    }));
                } else if (id === "Ball_7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_7: position,
                    }));
                } else if (id === "Ball_8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_8: position,
                    }));
                } else if (id === "Ball_9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_9: position,
                    }));
                } else if (id === "Ball_10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_10: position,
                    }));
                } else if (id === "Ball_21") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_21: position,
                    }));
                } else if (id === "Ball_22") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_22: position,
                    }));
                } else if (id === "Ball_23") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_23: position,
                    }));
                } else if (id === "Ball_24") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_24: position,
                    }));
                } else if (id === "Ball_SDV_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_SDV_1: position,
                    }));
                } else if (id === "Ball_SDV_2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_SDV_2: position,
                    }));
                } else if (id === "Ball_Center") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_Center: position,
                    }));
                } else if (id === "Ball_Arrow") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_Arrow: position,
                    }));
                } else if (id === "Ball_PSV") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_PSV: position,
                    }));
                } else if (id === "Ball_Last") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_Last: position,
                    }));
                } else if (id === "Ball_Small_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_Small_1: position,
                    }));
                } else if (id === "Ball_Small_2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Ball_Small_2: position,
                    }));
                }
                //===========================================
                else if (id === "data1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data1: position,
                    }));
                } else if (id === "data2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data2: position,
                    }));
                } else if (id === "data3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data3: position,
                    }));
                } else if (id === "data4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data4: position,
                    }));
                } else if (id === "data5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data5: position,
                    }));
                } else if (id === "data6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data6: position,
                    }));
                } else if (id === "data7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data7: position,
                    }));
                } else if (id === "data8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        data8: position,
                    }));
                }
                //===========================================
                else if (id === "Tank") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank: position,
                    }));
                } else if (id === "Tank_Name") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Tank_Name: position,
                    }));
                }
                //===========================================
                else if (id === "PT_COL_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_COL_1: position,
                    }));
                } else if (id === "PT_COL_2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_COL_2: position,
                    }));
                } else if (id === "PT_IMG_1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_IMG_1: position,
                    }));
                } else if (id === "PT_IMG_2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PT_IMG_2: position,
                    }));
                } else if (id === "Pressure_Trans01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans01: position,
                    }));
                } else if (id === "Pressure_Trans02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Pressure_Trans02: position,
                    }));
                }
                //===========================================
                else if (id === "PCV1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV1: position,
                    }));
                } else if (id === "PCV2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV2: position,
                    }));
                } else if (id === "PCV1_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV1_none1: position,
                    }));
                } else if (id === "PCV2_none1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV2_none1: position,
                    }));
                } else if (id === "PCV1_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV1_none2: position,
                    }));
                } else if (id === "PCV2_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV2_none2: position,
                    }));
                } else if (id === "PCV_NUM01") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM01: position,
                    }));
                } else if (id === "PCV_NUM02") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_NUM02: position,
                    }));
                }
                //==============================================================
                else if (id === "borderWhite") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        borderWhite: position,
                    }));
                } else if (id === "timeUpdate3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        timeUpdate3: position,
                    }));
                } else if (id === "Header") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        Header: position,
                    }));
                }

                //==============================================================
                else if (id === "ArrowRight1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight1: position,
                    }));
                } else if (id === "ArrowRight2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight2: position,
                    }));
                } else if (id === "ArrowRight3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight3: position,
                    }));
                } else if (id === "ArrowRight4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight4: position,
                    }));
                } else if (id === "ArrowRight5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight5: position,
                    }));
                } else if (id === "ArrowRight6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight6: position,
                    }));
                } else if (id === "ArrowRight7") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight7: position,
                    }));
                } else if (id === "ArrowRight8") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight8: position,
                    }));
                } else if (id === "ArrowRight9") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight9: position,
                    }));
                } else if (id === "ArrowRight10") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight10: position,
                    }));
                } else if (id === "ArrowRight11") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight11: position,
                    }));
                } else if (id === "ArrowRight12") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowRight12: position,
                    }));
                }
                //==============================================
                else if (id === "ArrowLeft1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft1: position,
                    }));
                } else if (id === "ArrowLeft2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft2: position,
                    }));
                } else if (id === "ArrowLeft3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft3: position,
                    }));
                } else if (id === "ArrowLeft4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft4: position,
                    }));
                } else if (id === "ArrowLeft5") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft5: position,
                    }));
                } else if (id === "ArrowLeft6") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        ArrowLeft6: position,
                    }));
                }
            }
        },

        [setNodes, setPositions, editingEnabled]
    );

    // const toggleEditing = () => {
    //     setEditingEnabled(!editingEnabled);
    // };
    // useEffect(() => {
    //     localStorage.setItem("positionsStation1", JSON.stringify(positions));
    // }, [positions]);

    return (
        <>
            {/* <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button> */}
            {/* <p>Trạng thái kết nối: {isOnline ? 'Online' : 'Offline'}</p> */}

            <Toast ref={toast} />
            <ConfirmDialog />

            {/* <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                style={{
                    width: 500,
                    fontWeight: 500,
                    fontSize: 17,
                }}
            >
                {Object.keys(paragraphContents).map(
                    (key: string, index: number) => (
                        <p key={index}>
                            {key} - {paragraphContents[key]} <hr />
                        </p>
                    )
                )}
            </Dialog> */}
            <div
                key={resetKey}
                style={{
                    borderRadius: 5,
                    //width: "auto",
                    height: "100%",
                    alignItems: "center",
                    background: background,
                }}
            >
                {/* {!editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.02)",

                            zIndex: 999,
                            opacity: 0.2,
                        }}
                    ></div>
                )}

                {editingEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    ></div>
                )} */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // onNodeDragStop={onNodeDragStop}
                    nodesDraggable={false} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.3}
                    maxZoom={3}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
