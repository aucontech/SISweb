import React, { useEffect, useRef, useState } from "react";
import { id_SNG_HungYen, id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_SNG_HUNGYEN() {
    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);


    const [EVC_STT01, setEVC_STT01] = useState<any | null>(null);

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
                    entityId: id_SNG_HungYen,
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
                  



                        PT_3005: setPT_3005,
                        PT_3006: setPT_3006,
                        TT_3003: setTT_3003,
                        TT_3004: setTT_3004,
                        WB_3001: setWB_3001,
                        TG_3005: setTG_3005,

                        GD_3002: setGD_3002,
                        GD_3003: setGD_3003,
                        GD_3004: setGD_3004,

                        GD_3005: setGD_3005,
                        GD_3006: setGD_3006,


                        TM_3002_SNG: setTM_3002_SNG,
                    
                        TM_3003_SNG: setTM_3003_SNG,


                        TOTAL_SNG: setTOTAL_SNG,
                        SDV_3004: setSDV_3004,




                        SDV_3003: setSDV_3003,
                        
                        GD1_STATUS: setGD1_STATUS,
                        GD2_STATUS: setGD2_STATUS,
                        GD3_STATUS: setGD3_STATUS,
                        GD4_STATUS: setGD4_STATUS,
                        GD5_STATUS: setGD5_STATUS,


                        ESD: setESD,
                        HR_BC: setHR_BC,
                        SD: setSD,
                        VAPORIZER_1: setVAPORIZER_1,
                        VAPORIZER_2: setVAPORIZER_2,
                        VAPORIZER_3: setVAPORIZER_3,

                        VAPORIZER_4: setVAPORIZER_4,
                        COOLING_V: setCOOLING_V,
                        FCV_3001: setFCV_3001,




                        PERCENT_LPG: setPERCENT_LPG,
                        PERCENT_AIR: setPERCENT_AIR,
                        HV_3001: setHV_3001,
                        RATIO_MODE: setRATIO_MODE,
                        FCV_MODE: setFCV_MODE,
                        TOTAL_CNG: setTOTAL_CNG,

                        TM3002_CNG: setTM3002_CNG,
                        TM3003_CNG: setTM3003_CNG,
                        WB_Setpoint: setWB_Setpoint,
                        WIS_Calorimeter: setWIS_Calorimeter,
                        CVS_Calorimeter: setCVS_Calorimeter,

                        SG_Calorimeter: setSG_Calorimeter,

                        
                        TD_4072_Conn_STT: setTD_4072_Conn_STT,
                        PLC_Conn_STT: setPLC_Conn_STT,




                    };
                    const valueStateMap: ValueStateMap = {
                        TD_4072_Conn_STT: setFC_Conn_STTValue,
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
                `/plugins/telemetry/DEVICE/${id_SNG_HungYen}/values/attributes/SERVER_SCOPE`
            );



    
          

            const PT_3005_High = res.data.find((item: any) => item.key === "PT_3005_High");
            setPT_3005_High(PT_3005_High?.value || null);
            const PT_3005_Low = res.data.find((item: any) => item.key === "PT_3005_Low");
            setPT_3005_Low(PT_3005_Low?.value || null);
            const PT_3005_Maintain = res.data.find(
                (item: any) => item.key === "PT_3005_Maintain"
            );


            const PT_3006_High = res.data.find((item: any) => item.key === "PT_3006_High");
            setPT_3006_High(PT_3006_High?.value || null);
            const PT_3006_Low = res.data.find((item: any) => item.key === "PT_3006_Low");
            setPT_3006_Low(PT_3006_Low?.value || null);
            const PT_3006_Maintain = res.data.find(
                (item: any) => item.key === "PT_3006_Maintain"
            );

            const TT_3003_High = res.data.find((item: any) => item.key === "TT_3003_High");
            setTT_3003_High(TT_3003_High?.value || null);
            const TT_3003_Low = res.data.find((item: any) => item.key === "TT_3003_Low");
            setTT_3003_Low(TT_3003_Low?.value || null);
            const TT_3003_Maintain = res.data.find(
                (item: any) => item.key === "TT_3003_Maintain"
            );

            const TT_3004_High = res.data.find((item: any) => item.key === "TT_3004_High");
            setTT_3004_High(TT_3004_High?.value || null);
            const TT_3004_Low = res.data.find((item: any) => item.key === "TT_3004_Low");
            setTT_3004_Low(TT_3004_Low?.value || null);
            const TT_3004_Maintain = res.data.find(
                (item: any) => item.key === "TT_3004_Maintain"
            );


            const WB_3001_High = res.data.find((item: any) => item.key === "WB_3001_High");
            setWB_3001_High(WB_3001_High?.value || null);
            const WB_3001_Low = res.data.find((item: any) => item.key === "WB_3001_Low");
            setWB_3001_Low(WB_3001_Low?.value || null);
            const WB_3001_Maintain = res.data.find(
                (item: any) => item.key === "WB_3001_Maintain"
            );



       
            const GD_3002_High = res.data.find((item: any) => item.key === "GD_3002_High");
            setGD_3002_High(GD_3002_High?.value || null);
            const GD_3002_Low = res.data.find((item: any) => item.key === "GD_3002_Low");
            setGD_3002_Low(GD_3002_Low?.value || null);
            const GD_3002_Maintain = res.data.find(
                (item: any) => item.key === "GD_3002_Maintain"
            );

            const GD_3003_High = res.data.find((item: any) => item.key === "GD_3003_High");
            setGD_3003_High(GD_3003_High?.value || null);
            const GD_3003_Low = res.data.find((item: any) => item.key === "GD_3003_Low");
            setGD_3003_Low(GD_3003_Low?.value || null);
            const GD_3003_Maintain = res.data.find(
                (item: any) => item.key === "GD_3003_Maintain"
            );

            const GD_3005_High = res.data.find((item: any) => item.key === "GD_3005_High");
            setGD_3005_High(GD_3005_High?.value || null);
            const GD_3005_Low = res.data.find((item: any) => item.key === "GD_3005_Low");
            setGD_3005_Low(GD_3005_Low?.value || null);
            const GD_3005_Maintain = res.data.find(
                (item: any) => item.key === "GD_3005_Maintain"
            );

            const TM_3002_SNG_High = res.data.find((item: any) => item.key === "TM_3002_SNG_High");
            setTM_3002_SNG_High(TM_3002_SNG_High?.value || null);
            const TM_3002_SNG_Low = res.data.find((item: any) => item.key === "TM_3002_SNG_Low");
            setTM_3002_SNG_Low(TM_3002_SNG_Low?.value || null);
            const TM_3002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3002_SNG_Maintain"
            );


            const TG_3005_High = res.data.find((item: any) => item.key === "TG_3005_High");
            setTG_3005_High(TG_3005_High?.value || null);
            const TG_3005_Low = res.data.find((item: any) => item.key === "TG_3005_Low");
            setTG_3005_Low(TG_3005_Low?.value || null);
            const TG_3005_Maintain = res.data.find(
                (item: any) => item.key === "TG_3005_Maintain"
            );

            const GD_3006_High = res.data.find((item: any) => item.key === "GD_3006_High");
            setGD_3006_High(GD_3006_High?.value || null);
            const GD_3006_Low = res.data.find((item: any) => item.key === "GD_3006_Low");
            setGD_3006_Low(GD_3006_Low?.value || null);
            const GD_3006_Maintain = res.data.find(
                (item: any) => item.key === "GD_3006_Maintain"
            );

            const GD_3004_High = res.data.find((item: any) => item.key === "GD_3004_High");
            setGD_3004_High(GD_3004_High?.value || null);
            const GD_3004_Low = res.data.find((item: any) => item.key === "GD_3004_Low");
            setGD_3004_Low(GD_3004_Low?.value || null);
            const GD_3004_Maintain = res.data.find(
                (item: any) => item.key === "GD_3004_Maintain"
            );

            const TOTAL_SNG_High = res.data.find((item: any) => item.key === "TOTAL_SNG_High");
            setTOTAL_SNG_High(TOTAL_SNG_High?.value || null);
            const TOTAL_SNG_Low = res.data.find((item: any) => item.key === "TOTAL_SNG_Low");
            setTOTAL_SNG_Low(TOTAL_SNG_Low?.value || null);
            const TOTAL_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Maintain"
            );
            const SDV_3004_High = res.data.find((item: any) => item.key === "SDV_3004_High");
            setSDV_3004_High(SDV_3004_High?.value || null);
            const SDV_3004_Low = res.data.find((item: any) => item.key === "SDV_3004_Low");
            setSDV_3004_Low(SDV_3004_Low?.value || null);
            const SDV_3004_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3004_Maintain"
            );
            const GD1_STATUS_High = res.data.find((item: any) => item.key === "GD1_STATUS_High");
            setGD1_STATUS_High(GD1_STATUS_High?.value || null);
            const GD1_STATUS_Low = res.data.find((item: any) => item.key === "GD1_STATUS_Low");
            setGD1_STATUS_Low(GD1_STATUS_Low?.value || null);
            const GD1_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD1_STATUS_Maintain"
            );
            const GD2_STATUS_High = res.data.find((item: any) => item.key === "GD2_STATUS_High");
            setGD2_STATUS_High(GD2_STATUS_High?.value || null);
            const GD2_STATUS_Low = res.data.find((item: any) => item.key === "GD2_STATUS_Low");
            setGD2_STATUS_Low(GD2_STATUS_Low?.value || null);
            const GD2_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD2_STATUS_Maintain"
            );
            const GD3_STATUS_High = res.data.find((item: any) => item.key === "GD3_STATUS_High");
            setGD3_STATUS_High(GD3_STATUS_High?.value || null);
            const GD3_STATUS_Low = res.data.find((item: any) => item.key === "GD3_STATUS_Low");
            setGD3_STATUS_Low(GD3_STATUS_Low?.value || null);
            const GD3_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD3_STATUS_Maintain"
            );

            const GD4_STATUS_High = res.data.find((item: any) => item.key === "GD4_STATUS_High");
            setGD4_STATUS_High(GD4_STATUS_High?.value || null);
            const GD4_STATUS_Low = res.data.find((item: any) => item.key === "GD4_STATUS_Low");
            setGD4_STATUS_Low(GD4_STATUS_Low?.value || null);
            const GD4_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD4_STATUS_Maintain"
            );
            const GD5_STATUS_High = res.data.find((item: any) => item.key === "GD5_STATUS_High");
            setGD5_STATUS_High(GD5_STATUS_High?.value || null);
            const GD5_STATUS_Low = res.data.find((item: any) => item.key === "GD5_STATUS_Low");
            setGD5_STATUS_Low(GD5_STATUS_Low?.value || null);
            const GD5_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD5_STATUS_Maintain"
            );



            const TM_3003_SNG_High = res.data.find((item: any) => item.key === "TM_3003_SNG_High");
            setTM_3003_SNG_High(TM_3003_SNG_High?.value || null);
            const TM_3003_SNG_Low = res.data.find((item: any) => item.key === "TM_3003_SNG_Low");
            setTM_3003_SNG_Low(TM_3003_SNG_Low?.value || null);
            const TM_3003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_3003_SNG_Maintain"
            );

     

            const SDV_3003_High = res.data.find((item: any) => item.key === "SDV_3003_High");
            setSDV_3003_High(SDV_3003_High?.value || null);
            const SDV_3003_Low = res.data.find((item: any) => item.key === "SDV_3003_Low");
            setSDV_3003_Low(SDV_3003_Low?.value || null);
            const SDV_3003_Maintain = res.data.find(
                (item: any) => item.key === "SDV_3003_Maintain"
            );

     

      

          

            const ESD_High = res.data.find((item: any) => item.key === "ESD_High");
            setESD_High(ESD_High?.value || null);
            const ESD_Low = res.data.find((item: any) => item.key === "ESD_Low");
            setESD_Low(ESD_Low?.value || null);
            const ESD_Maintain = res.data.find(
                (item: any) => item.key === "ESD_Maintain"
            );


            const HR_BC_High = res.data.find((item: any) => item.key === "HR_BC_High");
            setHR_BC_High(HR_BC_High?.value || null);
            const HR_BC_Low = res.data.find((item: any) => item.key === "HR_BC_Low");
            setHR_BC_Low(HR_BC_Low?.value || null);
            const HR_BC_Maintain = res.data.find(
                (item: any) => item.key === "HR_BC_Maintain"
            );

            const SD_High = res.data.find((item: any) => item.key === "SD_High");
            setSD_High(SD_High?.value || null);
            const SD_Low = res.data.find((item: any) => item.key === "SD_Low");
            setSD_Low(SD_Low?.value || null);
            const SD_Maintain = res.data.find(
                (item: any) => item.key === "SD_Maintain"
            );



            const VAPORIZER_1_High = res.data.find((item: any) => item.key === "VAPORIZER_1_High");
            setVAPORIZER_1_High(VAPORIZER_1_High?.value || null);
            const VAPORIZER_1_Low = res.data.find((item: any) => item.key === "VAPORIZER_1_Low");
            setVAPORIZER_1_Low(VAPORIZER_1_Low?.value || null);
            const VAPORIZER_1_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_1_Maintain"
            );


            const VAPORIZER_2_High = res.data.find((item: any) => item.key === "VAPORIZER_2_High");
            setVAPORIZER_2_High(VAPORIZER_2_High?.value || null);
            const VAPORIZER_2_Low = res.data.find((item: any) => item.key === "VAPORIZER_2_Low");
            setVAPORIZER_2_Low(VAPORIZER_2_Low?.value || null);
            const VAPORIZER_2_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_2_Maintain"
            );

            const VAPORIZER_3_High = res.data.find((item: any) => item.key === "VAPORIZER_3_High");
            setVAPORIZER_3_High(VAPORIZER_3_High?.value || null);
            const VAPORIZER_3_Low = res.data.find((item: any) => item.key === "VAPORIZER_3_Low");
            setVAPORIZER_3_Low(VAPORIZER_3_Low?.value || null);
            const VAPORIZER_3_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_3_Maintain"
            );


            const VAPORIZER_4_High = res.data.find((item: any) => item.key === "VAPORIZER_4_High");
            setVAPORIZER_4_High(VAPORIZER_4_High?.value || null);
            const VAPORIZER_4_Low = res.data.find((item: any) => item.key === "VAPORIZER_4_Low");
            setVAPORIZER_4_Low(VAPORIZER_4_Low?.value || null);
            const VAPORIZER_4_Maintain = res.data.find(
                (item: any) => item.key === "VAPORIZER_4_Maintain"
            );


            const COOLING_V_High = res.data.find((item: any) => item.key === "COOLING_V_High");
            setCOOLING_V_High(COOLING_V_High?.value || null);
            const COOLING_V_Low = res.data.find((item: any) => item.key === "COOLING_V_Low");
            setCOOLING_V_Low(COOLING_V_Low?.value || null);
            const COOLING_V_Maintain = res.data.find(
                (item: any) => item.key === "COOLING_V_Maintain"
            );

            const FCV_3001_High = res.data.find((item: any) => item.key === "FCV_3001_High");
            setFCV_3001_High(FCV_3001_High?.value || null);
            const FCV_3001_Low = res.data.find((item: any) => item.key === "FCV_3001_Low");
            setFCV_3001_Low(FCV_3001_Low?.value || null);
            const FCV_3001_Maintain = res.data.find(
                (item: any) => item.key === "FCV_3001_Maintain"
            );





        const PERCENT_LPG_High = res.data.find((item: any) => item.key === "PERCENT_LPG_High");
            setPERCENT_LPG_High(PERCENT_LPG_High?.value || null);
            const PERCENT_LPG_Low = res.data.find((item: any) => item.key === "PERCENT_LPG_Low");
            setPERCENT_LPG_Low(PERCENT_LPG_Low?.value || null);
            const PERCENT_LPG_Maintain = res.data.find(
                (item: any) => item.key === "PERCENT_LPG_Maintain"
            );


            const PERCENT_AIR_High = res.data.find((item: any) => item.key === "PERCENT_AIR_High");
            setPERCENT_AIR_High(PERCENT_AIR_High?.value || null);
            const PERCENT_AIR_Low = res.data.find((item: any) => item.key === "PERCENT_AIR_Low");
            setPERCENT_AIR_Low(PERCENT_AIR_Low?.value || null);
            const PERCENT_AIR_Maintain = res.data.find(
                (item: any) => item.key === "PERCENT_AIR_Maintain"
            );

            const HV_3001_High = res.data.find((item: any) => item.key === "HV_3001_High");
            setHV_3001_High(HV_3001_High?.value || null);
            const HV_3001_Low = res.data.find((item: any) => item.key === "HV_3001_Low");
            setHV_3001_Low(HV_3001_Low?.value || null);
            const HV_3001_Maintain = res.data.find(
                (item: any) => item.key === "HV_3001_Maintain"
            );

            const RATIO_MODE_High = res.data.find((item: any) => item.key === "RATIO_MODE_High");
            setRATIO_MODE_High(RATIO_MODE_High?.value || null);
            const RATIO_MODE_Low = res.data.find((item: any) => item.key === "RATIO_MODE_Low");
            setRATIO_MODE_Low(RATIO_MODE_Low?.value || null);
            const RATIO_MODE_Maintain = res.data.find(
                (item: any) => item.key === "RATIO_MODE_Maintain"
            );


            const FCV_MODE_High = res.data.find((item: any) => item.key === "FCV_MODE_High");
            setFCV_MODE_High(FCV_MODE_High?.value || null);
            const FCV_MODE_Low = res.data.find((item: any) => item.key === "FCV_MODE_Low");
            setFCV_MODE_Low(FCV_MODE_Low?.value || null);
            const FCV_MODE_Maintain = res.data.find(
                (item: any) => item.key === "FCV_MODE_Maintain"
            );
            const TOTAL_CNG_High = res.data.find((item: any) => item.key === "TOTAL_CNG_High");
            setTOTAL_CNG_High(TOTAL_CNG_High?.value || null);
            const TOTAL_CNG_Low = res.data.find((item: any) => item.key === "TOTAL_CNG_Low");
            setTOTAL_CNG_Low(TOTAL_CNG_Low?.value || null);
            const TOTAL_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_CNG_Maintain"
            );



            
            const TM3002_CNG_High = res.data.find((item: any) => item.key === "TM3002_CNG_High");
            setTM3002_CNG_High(TM3002_CNG_High?.value || null);
            const TM3002_CNG_Low = res.data.find((item: any) => item.key === "TM3002_CNG_Low");
            setTM3002_CNG_Low(TM3002_CNG_Low?.value || null);
            const TM3002_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM3002_CNG_Maintain"
            );
            const WB_Setpoint_High = res.data.find((item: any) => item.key === "WB_Setpoint_High");
            setWB_Setpoint_High(WB_Setpoint_High?.value || null);
            const WB_Setpoint_Low = res.data.find((item: any) => item.key === "WB_Setpoint_Low");
            setWB_Setpoint_Low(WB_Setpoint_Low?.value || null);
            const WB_Setpoint_Maintain = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );
            const TM3003_CNG_High = res.data.find((item: any) => item.key === "TM3003_CNG_High");
            setTM3003_CNG_High(TM3003_CNG_High?.value || null);
            const TM3003_CNG_Low = res.data.find((item: any) => item.key === "TM3003_CNG_Low");
            setTM3003_CNG_Low(TM3003_CNG_Low?.value || null);
            const TM3003_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM3003_CNG_Maintain"
            );

            const WIS_Calorimeter_High = res.data.find((item: any) => item.key === "WIS_Calorimeter_High");
            setWIS_Calorimeter_High(WIS_Calorimeter_High?.value || null);
            const WIS_Calorimeter_Low = res.data.find((item: any) => item.key === "WIS_Calorimeter_Low");
            setWIS_Calorimeter_Low(WIS_Calorimeter_Low?.value || null);
            const WIS_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "WIS_Calorimeter_Maintain"
            );

            const CVS_Calorimeter_High = res.data.find((item: any) => item.key === "CVS_Calorimeter_High");
            setCVS_Calorimeter_High(CVS_Calorimeter_High?.value || null);
            const CVS_Calorimeter_Low = res.data.find((item: any) => item.key === "CVS_Calorimeter_Low");
            setCVS_Calorimeter_Low(CVS_Calorimeter_Low?.value || null);
            const CVS_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "CVS_Calorimeter_Maintain"
            );

            const SG_Calorimeter_High = res.data.find((item: any) => item.key === "SG_Calorimeter_High");
            setSG_Calorimeter_High(SG_Calorimeter_High?.value || null);
            const SG_Calorimeter_Low = res.data.find((item: any) => item.key === "SG_Calorimeter_Low");
            setSG_Calorimeter_Low(SG_Calorimeter_Low?.value || null);
            const SG_Calorimeter_Maintain = res.data.find(
                (item: any) => item.key === "SG_Calorimeter_Maintain"
            );



            const PLC_Conn_STT_High = res.data.find((item: any) => item.key === "PLC_Conn_STT_High");
            setPLC_Conn_STT_High(PLC_Conn_STT_High?.value || null);
            const PLC_Conn_STT_Low = res.data.find((item: any) => item.key === "PLC_Conn_STT_Low");
            setPLC_Conn_STT_Low(PLC_Conn_STT_Low?.value || null);
            const PLC_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "PLC_Conn_STT_Maintain"
            );

            const TD_4072_Conn_STT_High = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_High");
            setTD_4072_Conn_STT_High(TD_4072_Conn_STT_High?.value || null);
            const TD_4072_Conn_STT_Low = res.data.find((item: any) => item.key === "TD_4072_Conn_STT_Low");
            setTD_4072_Conn_STT_Low(TD_4072_Conn_STT_Low?.value || null);
            const TD_4072_Conn_STT_Maintain = res.data.find(
                (item: any) => item.key === "TD_4072_Conn_STT_Maintain"
            );


 // =================================================================================================================== 


 setMaintainPLC_Conn_STT(PLC_Conn_STT_Maintain?.value || false);


 setMaintainTD_4072_Conn_STT(TD_4072_Conn_STT_Maintain?.value || false);
            

 setMaintainESD(ESD_Maintain?.value || false);


 setMaintainHR_BC(HR_BC_Maintain?.value || false);


 setMaintainSD(SD_Maintain?.value || false);

 setMaintainVAPORIZER_1(VAPORIZER_1_Maintain?.value || false);


 setMaintainVAPORIZER_2(VAPORIZER_2_Maintain?.value || false);


 setMaintainVAPORIZER_3(VAPORIZER_3_Maintain?.value || false);

 setMaintainVAPORIZER_4(VAPORIZER_4_Maintain?.value || false);


 setMaintainCOOLING_V(COOLING_V_Maintain?.value || false);


 setMaintainFCV_3001(FCV_3001_Maintain?.value || false);



 setMaintainPERCENT_LPG(PERCENT_LPG_Maintain?.value || false);


 setMaintainPERCENT_AIR(PERCENT_AIR_Maintain?.value || false);


 setMaintainHV_3001(HV_3001_Maintain?.value || false);


 setMaintainRATIO_MODE(RATIO_MODE_Maintain?.value || false);

 setMaintainFCV_MODE(FCV_MODE_Maintain?.value || false);
 setMaintainTOTAL_CNG(TOTAL_CNG_Maintain?.value || false);

 setMaintainTM3002_CNG(TM3002_CNG_Maintain?.value || false);

 setMaintainWB_Setpoint(WB_Setpoint_Maintain?.value || false);

 setMaintainTM3003_CNG(TM3003_CNG_Maintain?.value || false);
 setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);



 setMaintainWIS_Calorimeter(WIS_Calorimeter_Maintain?.value || false);

 
           

            setMaintainPT_3005(PT_3005_Maintain?.value || false);


            setMaintainPT_3006(PT_3006_Maintain?.value || false);


            setMaintainTT_3003(TT_3003_Maintain?.value || false);


            setMaintainTT_3004(TT_3004_Maintain?.value || false);


            setMaintainGD_3004(GD_3004_Maintain?.value || false);

            setMaintainGD_3005(GD_3005_Maintain?.value || false);
            
            setMaintainGD_3006(GD_3006_Maintain?.value || false);
            
            setMaintainTG_3005(TG_3005_Maintain?.value || false);

            
            setMaintainTM_3002_SNG(TM_3002_SNG_Maintain?.value || false);
            setMaintainTM_3003_SNG(TM_3003_SNG_Maintain?.value || false);



            setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);


            setMaintainGD_3003(GD_3003_Maintain?.value || false);


            setMaintainGD_3002(GD_3002_Maintain?.value || false);


            setMaintainGD5_STATUS(GD5_STATUS_Maintain?.value || false);





            setMaintainWB_3001(WB_3001_Maintain?.value || false);

            setMaintainTOTAL_SNG(TOTAL_SNG_Maintain?.value || false);


            setMaintainSDV_3004(SDV_3004_Maintain?.value || false);


            setMaintainGD2_STATUS(GD2_STATUS_Maintain?.value || false);

            setMaintainGD1_STATUS(GD1_STATUS_Maintain?.value || false);

            setMaintainSDV_3003(SDV_3003_Maintain?.value || false);



            setMaintainGD3_STATUS(GD3_STATUS_Maintain?.value || false);


            setMaintainGD4_STATUS(GD4_STATUS_Maintain?.value || false);

 setMaintainSG_Calorimeter(SG_Calorimeter_Maintain?.value || false);

           
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 

        

const [TT_3004, setTT_3004] = useState<string | null>(null);
const [TT_3004_High, setTT_3004_High] = useState<number | null>(null);
const [TT_3004_Low, setTT_3004_Low] = useState<number | null>(null);
const [exceedThresholdTT_3004, setExceedThresholdTT_3004] = useState(false); 
const [maintainTT_3004, setMaintainTT_3004] = useState<boolean>(false);

useEffect(() => {
    const TT_3004Value = parseFloat(TT_3004 as any);
    const highValue = TT_3004_High ?? NaN;
    const lowValue = TT_3004_Low ?? NaN;

    if (!isNaN(TT_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3004) {
        setExceedThresholdTT_3004(TT_3004Value >= highValue || TT_3004Value <= lowValue);
    }
}, [TT_3004, TT_3004_High, TT_3004_Low, maintainTT_3004]);





const [PT_3005, setPT_3005] = useState<string | null>(null);
const [PT_3005_High, setPT_3005_High] = useState<number | null>(null);
const [PT_3005_Low, setPT_3005_Low] = useState<number | null>(null);
const [exceedThresholdPT_3005, setExceedThresholdPT_3005] = useState(false); 
const [maintainPT_3005, setMaintainPT_3005] = useState<boolean>(false);

useEffect(() => {
const PT_3005Value = parseFloat(PT_3005 as any);
const highValue = PT_3005_High ?? NaN;
const lowValue = PT_3005_Low ?? NaN;

if (!isNaN(PT_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3005) {
 setExceedThresholdPT_3005(PT_3005Value >= highValue || PT_3005Value <= lowValue);
}
}, [PT_3005, PT_3005_High, PT_3005_Low, maintainPT_3005]);







// =================================================================================================================== 

const [PT_3006, setPT_3006] = useState<string | null>(null);
const [PT_3006_High, setPT_3006_High] = useState<number | null>(null);
const [PT_3006_Low, setPT_3006_Low] = useState<number | null>(null);
const [exceedThresholdPT_3006, setExceedThresholdPT_3006] = useState(false); 
const [maintainPT_3006, setMaintainPT_3006] = useState<boolean>(false);

useEffect(() => {
 const PT_3006Value = parseFloat(PT_3006 as any);
 const highValue = PT_3006_High ?? NaN;
 const lowValue = PT_3006_Low ?? NaN;

 if (!isNaN(PT_3006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPT_3006) {
     setExceedThresholdPT_3006(PT_3006Value >= highValue || PT_3006Value <= lowValue);
 }
}, [PT_3006, PT_3006_High, PT_3006_Low, maintainPT_3006,






]);






// =================================================================================================================== 


const [TT_3003, setTT_3003] = useState<string | null>(null);
const [TT_3003_High, setTT_3003_High] = useState<number | null>(null);
const [TT_3003_Low, setTT_3003_Low] = useState<number | null>(null);
const [exceedThresholdTT_3003, setExceedThresholdTT_3003] = useState(false); 
const [maintainTT_3003, setMaintainTT_3003] = useState<boolean>(false);

useEffect(() => {
 const TT_3003Value = parseFloat(TT_3003 as any);
 const highValue = TT_3003_High ?? NaN;
 const lowValue = TT_3003_Low ?? NaN;

 if (!isNaN(TT_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTT_3003) {
     setExceedThresholdTT_3003(TT_3003Value >= highValue || TT_3003Value <= lowValue);
 }
}, [TT_3003, TT_3003_High, TT_3003_Low, maintainTT_3003]);







  // =================================================================================================================== 


  const [TG_3005, setTG_3005] = useState<string | null>(null);
const [TG_3005_High, setTG_3005_High] = useState<number | null>(null);
const [TG_3005_Low, setTG_3005_Low] = useState<number | null>(null);
const [exceedThresholdTG_3005, setExceedThresholdTG_3005] = useState(false); 
const [maintainTG_3005, setMaintainTG_3005] = useState<boolean>(false);

useEffect(() => {
 const TG_3005Value = parseFloat(TG_3005 as any);
 const highValue = TG_3005_High ?? NaN;
 const lowValue = TG_3005_Low ?? NaN;

 if (!isNaN(TG_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTG_3005) {
     setExceedThresholdTG_3005(TG_3005Value >= highValue || TG_3005Value <= lowValue);
 }
}, [TG_3005, TG_3005_High, TG_3005_Low, maintainTG_3005]);







  // =================================================================================================================== 
  const [WB_3001, setWB_3001] = useState<string | null>(null);
  const [WB_3001_High, setWB_3001_High] = useState<number | null>(null);
  const [WB_3001_Low, setWB_3001_Low] = useState<number | null>(null);
  const [exceedThresholdWB_3001, setExceedThresholdWB_3001] = useState(false); 
  const [maintainWB_3001, setMaintainWB_3001] = useState<boolean>(false);
 
  useEffect(() => {
      const WB_3001Value = parseFloat(WB_3001 as any);
      const highValue = WB_3001_High ?? NaN;
      const lowValue = WB_3001_Low ?? NaN;
 
      if (!isNaN(WB_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWB_3001) {
          setExceedThresholdWB_3001(WB_3001Value >= highValue || WB_3001Value <= lowValue);
      }
  }, [WB_3001, WB_3001_High, WB_3001_Low, maintainWB_3001]);
 
  
 
  

  
  
  // =================================================================================================================== 

  const [GD_3004, setGD_3004] = useState<string | null>(null);
  const [GD_3004_High, setGD_3004_High] = useState<number | null>(null);
  const [GD_3004_Low, setGD_3004_Low] = useState<number | null>(null);
  const [exceedThresholdGD_3004, setExceedThresholdGD_3004] = useState(false); 
  const [maintainGD_3004, setMaintainGD_3004] = useState<boolean>(false);
 
  useEffect(() => {
      const GD_3004Value = parseFloat(GD_3004 as any);
      const highValue = GD_3004_High ?? NaN;
      const lowValue = GD_3004_Low ?? NaN;
 
      if (!isNaN(GD_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3004) {
          setExceedThresholdGD_3004(GD_3004Value >= highValue || GD_3004Value <= lowValue);
      }
  }, [GD_3004, GD_3004_High, GD_3004_Low, maintainGD_3004]);
 
  
 
  
 

  
  // =================================================================================================================== 

  const [GD_3003, setGD_3003] = useState<string | null>(null);
  const [GD_3003_High, setGD_3003_High] = useState<number | null>(null);
  const [GD_3003_Low, setGD_3003_Low] = useState<number | null>(null);
  const [exceedThresholdGD_3003, setExceedThresholdGD_3003] = useState(false); 
  const [maintainGD_3003, setMaintainGD_3003] = useState<boolean>(false);
 
  useEffect(() => {
      const GD_3003Value = parseFloat(GD_3003 as any);
      const highValue = GD_3003_High ?? NaN;
      const lowValue = GD_3003_Low ?? NaN;
 
      if (!isNaN(GD_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3003) {
          setExceedThresholdGD_3003(GD_3003Value >= highValue || GD_3003Value <= lowValue);
      }
  }, [GD_3003, GD_3003_High, GD_3003_Low, maintainGD_3003]);
 
  
 
  
 



  // =================================================================================================================== 

  const [GD_3002, setGD_3002] = useState<string | null>(null);
  const [GD_3002_High, setGD_3002_High] = useState<number | null>(null);
  const [GD_3002_Low, setGD_3002_Low] = useState<number | null>(null);
  const [exceedThresholdGD_3002, setExceedThresholdGD_3002] = useState(false); 
  const [maintainGD_3002, setMaintainGD_3002] = useState<boolean>(false);
 
  useEffect(() => {
      const GD_3002Value = parseFloat(GD_3002 as any);
      const highValue = GD_3002_High ?? NaN;
      const lowValue = GD_3002_Low ?? NaN;
 
      if (!isNaN(GD_3002Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3002) {
          setExceedThresholdGD_3002(GD_3002Value >= highValue || GD_3002Value <= lowValue);
      }
  }, [GD_3002, GD_3002_High, GD_3002_Low, maintainGD_3002]);
 
  
 
  
 


  // =================================================================================================================== 

  const [GD_3005, setGD_3005] = useState<string | null>(null);
  const [GD_3005_High, setGD_3005_High] = useState<number | null>(null);
  const [GD_3005_Low, setGD_3005_Low] = useState<number | null>(null);
  const [exceedThresholdGD_3005, setExceedThresholdGD_3005] = useState(false); 
  const [maintainGD_3005, setMaintainGD_3005] = useState<boolean>(false);
 
  useEffect(() => {
      const GD_3005Value = parseFloat(GD_3005 as any);
      const highValue = GD_3005_High ?? NaN;
      const lowValue = GD_3005_Low ?? NaN;
 
      if (!isNaN(GD_3005Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3005) {
          setExceedThresholdGD_3005(GD_3005Value >= highValue || GD_3005Value <= lowValue);
      }
  }, [GD_3005, GD_3005_High, GD_3005_Low, maintainGD_3005]);
 


  // =================================================================================================================== 

// =================================================================================================================== 

const [GD_3006, setGD_3006] = useState<string | null>(null);
const [GD_3006_High, setGD_3006_High] = useState<number | null>(null);
const [GD_3006_Low, setGD_3006_Low] = useState<number | null>(null);
const [exceedThresholdGD_3006, setExceedThresholdGD_3006] = useState(false); 
const [maintainGD_3006, setMaintainGD_3006] = useState<boolean>(false);

useEffect(() => {
const GD_3006Value = parseFloat(GD_3006 as any);
const highValue = GD_3006_High ?? NaN;
const lowValue = GD_3006_Low ?? NaN;

if (!isNaN(GD_3006Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD_3006) {
    setExceedThresholdGD_3006(GD_3006Value >= highValue || GD_3006Value <= lowValue);
}
}, [GD_3006, GD_3006_High, GD_3006_Low, maintainGD_3006]);






// =================================================================================================================== 

// =================================================================================================================== 

const [TM_3002_SNG, setTM_3002_SNG] = useState<string | null>(null);
const [TM_3002_SNG_High, setTM_3002_SNG_High] = useState<number | null>(null);
const [TM_3002_SNG_Low, setTM_3002_SNG_Low] = useState<number | null>(null);
const [exceedThresholdTM_3002_SNG, setExceedThresholdTM_3002_SNG] = useState(false); 
const [maintainTM_3002_SNG, setMaintainTM_3002_SNG] = useState<boolean>(false);

useEffect(() => {
    const TM_3002_SNGValue = parseFloat(TM_3002_SNG as any);
    const highValue = TM_3002_SNG_High ?? NaN;
    const lowValue = TM_3002_SNG_Low ?? NaN;

    if (!isNaN(TM_3002_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_3002_SNG) {
        setExceedThresholdTM_3002_SNG(TM_3002_SNGValue >= highValue || TM_3002_SNGValue <= lowValue);
    }
}, [TM_3002_SNG, TM_3002_SNG_High, TM_3002_SNG_Low, maintainTM_3002_SNG]);






// =================================================================================================================== 

    // =================================================================================================================== 

    const [TM_3003_SNG, setTM_3003_SNG] = useState<string | null>(null);
    const [TM_3003_SNG_High, setTM_3003_SNG_High] = useState<number | null>(null);
    const [TM_3003_SNG_Low, setTM_3003_SNG_Low] = useState<number | null>(null);
    const [exceedThresholdTM_3003_SNG, setExceedThresholdTM_3003_SNG] = useState(false); 
    const [maintainTM_3003_SNG, setMaintainTM_3003_SNG] = useState<boolean>(false);
   
    useEffect(() => {
        const TM_3003_SNGValue = parseFloat(TM_3003_SNG as any);
        const highValue = TM_3003_SNG_High ?? NaN;
        const lowValue = TM_3003_SNG_Low ?? NaN;
   
        if (!isNaN(TM_3003_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM_3003_SNG) {
            setExceedThresholdTM_3003_SNG(TM_3003_SNGValue >= highValue || TM_3003_SNGValue <= lowValue);
        }
    }, [TM_3003_SNG, TM_3003_SNG_High, TM_3003_SNG_Low, maintainTM_3003_SNG]);
   
    
   
    



// =================================================================================================================== 


const [TOTAL_SNG, setTOTAL_SNG] = useState<string | null>(null);
const [TOTAL_SNG_High, setTOTAL_SNG_High] = useState<number | null>(null);
const [TOTAL_SNG_Low, setTOTAL_SNG_Low] = useState<number | null>(null);
const [exceedThresholdTOTAL_SNG, setExceedThresholdTOTAL_SNG] = useState(false); 
const [maintainTOTAL_SNG, setMaintainTOTAL_SNG] = useState<boolean>(false);

useEffect(() => {
const TOTAL_SNGValue = parseFloat(TOTAL_SNG as any);
const highValue = TOTAL_SNG_High ?? NaN;
const lowValue = TOTAL_SNG_Low ?? NaN;

if (!isNaN(TOTAL_SNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTOTAL_SNG) {
    setExceedThresholdTOTAL_SNG(TOTAL_SNGValue >= highValue || TOTAL_SNGValue <= lowValue);
}
}, [TOTAL_SNG, TOTAL_SNG_High, TOTAL_SNG_Low, maintainTOTAL_SNG]);



// =================================================================================================================== 

// =================================================================================================================== 

const [SDV_3004, setSDV_3004] = useState<string | null>(null);
const [SDV_3004_High, setSDV_3004_High] = useState<number | null>(null);
const [SDV_3004_Low, setSDV_3004_Low] = useState<number | null>(null);
const [exceedThresholdSDV_3004, setExceedThresholdSDV_3004] = useState(false); 
const [maintainSDV_3004, setMaintainSDV_3004] = useState<boolean>(false);

useEffect(() => {
    const SDV_3004Value = parseFloat(SDV_3004 as any);
    const highValue = SDV_3004_High ?? NaN;
    const lowValue = SDV_3004_Low ?? NaN;

    if (!isNaN(SDV_3004Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3004) {
        setExceedThresholdSDV_3004(SDV_3004Value >= highValue || SDV_3004Value <= lowValue);
    }
}, [SDV_3004, SDV_3004_High, SDV_3004_Low, maintainSDV_3004]);







// =================================================================================================================== 


const [SDV_3003, setSDV_3003] = useState<string | null>(null);
const [SDV_3003_High, setSDV_3003_High] = useState<number | null>(null);
const [SDV_3003_Low, setSDV_3003_Low] = useState<number | null>(null);
const [exceedThresholdSDV_3003, setExceedThresholdSDV_3003] = useState(false); 
const [maintainSDV_3003, setMaintainSDV_3003] = useState<boolean>(false);

useEffect(() => {
const SDV_3003Value = parseFloat(SDV_3003 as any);
const highValue = SDV_3003_High ?? NaN;
const lowValue = SDV_3003_Low ?? NaN;

if (!isNaN(SDV_3003Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSDV_3003) {
setExceedThresholdSDV_3003(SDV_3003Value >= highValue || SDV_3003Value <= lowValue);
}
}, [SDV_3003, SDV_3003_High, SDV_3003_Low, maintainSDV_3003]);



// =================================================================================================================== 

// =================================================================================================================== 

const [GD1_STATUS, setGD1_STATUS] = useState<string | null>(null);
const [GD1_STATUS_High, setGD1_STATUS_High] = useState<number | null>(null);
const [GD1_STATUS_Low, setGD1_STATUS_Low] = useState<number | null>(null);
const [exceedThresholdGD1_STATUS, setExceedThresholdGD1_STATUS] = useState(false); 
const [maintainGD1_STATUS, setMaintainGD1_STATUS] = useState<boolean>(false);

useEffect(() => {
const GD1_STATUSValue = parseFloat(GD1_STATUS as any);
const highValue = GD1_STATUS_High ?? NaN;
const lowValue = GD1_STATUS_Low ?? NaN;

if (!isNaN(GD1_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD1_STATUS) {
    setExceedThresholdGD1_STATUS(GD1_STATUSValue >= highValue || GD1_STATUSValue <= lowValue);
}
}, [GD1_STATUS, GD1_STATUS_High, GD1_STATUS_Low, maintainGD1_STATUS]);







// =================================================================================================================== 


// =================================================================================================================== 

const [GD2_STATUS, setGD2_STATUS] = useState<string | null>(null);
const [GD2_STATUS_High, setGD2_STATUS_High] = useState<number | null>(null);
const [GD2_STATUS_Low, setGD2_STATUS_Low] = useState<number | null>(null);
const [exceedThresholdGD2_STATUS, setExceedThresholdGD2_STATUS] = useState(false); 
const [maintainGD2_STATUS, setMaintainGD2_STATUS] = useState<boolean>(false);

useEffect(() => {
    const GD2_STATUSValue = parseFloat(GD2_STATUS as any);
    const highValue = GD2_STATUS_High ?? NaN;
    const lowValue = GD2_STATUS_Low ?? NaN;

    if (!isNaN(GD2_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD2_STATUS) {
        setExceedThresholdGD2_STATUS(GD2_STATUSValue >= highValue || GD2_STATUSValue <= lowValue);
    }
}, [GD2_STATUS, GD2_STATUS_High, GD2_STATUS_Low, maintainGD2_STATUS]);





// =================================================================================================================== 


const [GD3_STATUS, setGD3_STATUS] = useState<string | null>(null);
const [GD3_STATUS_High, setGD3_STATUS_High] = useState<number | null>(null);
const [GD3_STATUS_Low, setGD3_STATUS_Low] = useState<number | null>(null);
const [exceedThresholdGD3_STATUS, setExceedThresholdGD3_STATUS] = useState(false); 
const [maintainGD3_STATUS, setMaintainGD3_STATUS] = useState<boolean>(false);

useEffect(() => {
    const GD3_STATUSValue = parseFloat(GD3_STATUS as any);
    const highValue = GD3_STATUS_High ?? NaN;
    const lowValue = GD3_STATUS_Low ?? NaN;

    if (!isNaN(GD3_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD3_STATUS) {
        setExceedThresholdGD3_STATUS(GD3_STATUSValue >= highValue || GD3_STATUSValue <= lowValue);
    }
}, [GD3_STATUS, GD3_STATUS_High, GD3_STATUS_Low, maintainGD3_STATUS]);








// =================================================================================================================== 

    // =================================================================================================================== 

    const [GD4_STATUS, setGD4_STATUS] = useState<string | null>(null);
    const [GD4_STATUS_High, setGD4_STATUS_High] = useState<number | null>(null);
    const [GD4_STATUS_Low, setGD4_STATUS_Low] = useState<number | null>(null);
    const [exceedThresholdGD4_STATUS, setExceedThresholdGD4_STATUS] = useState(false); 
    const [maintainGD4_STATUS, setMaintainGD4_STATUS] = useState<boolean>(false);
    
    useEffect(() => {
        const GD4_STATUSValue = parseFloat(GD4_STATUS as any);
        const highValue = GD4_STATUS_High ?? NaN;
        const lowValue = GD4_STATUS_Low ?? NaN;
    
        if (!isNaN(GD4_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD4_STATUS) {
            setExceedThresholdGD4_STATUS(GD4_STATUSValue >= highValue || GD4_STATUSValue <= lowValue);
        }
    }, [GD4_STATUS, GD4_STATUS_High, GD4_STATUS_Low, maintainGD4_STATUS]);
    
    
    
    
    



// =================================================================================================================== 


    // =================================================================================================================== 


    const [GD5_STATUS, setGD5_STATUS] = useState<string | null>(null);
    const [GD5_STATUS_High, setGD5_STATUS_High] = useState<number | null>(null);
    const [GD5_STATUS_Low, setGD5_STATUS_Low] = useState<number | null>(null);
    const [exceedThresholdGD5_STATUS, setExceedThresholdGD5_STATUS] = useState(false); 
    const [maintainGD5_STATUS, setMaintainGD5_STATUS] = useState<boolean>(false);
    
    useEffect(() => {
        const GD5_STATUSValue = parseFloat(GD5_STATUS as any);
        const highValue = GD5_STATUS_High ?? NaN;
        const lowValue = GD5_STATUS_Low ?? NaN;
    
        if (!isNaN(GD5_STATUSValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD5_STATUS) {
            setExceedThresholdGD5_STATUS(GD5_STATUSValue >= highValue || GD5_STATUSValue <= lowValue);
        }
    }, [GD5_STATUS, GD5_STATUS_High, GD5_STATUS_Low, maintainGD5_STATUS]);
    
    
    
    

    
    
    // =================================================================================================================== 

    

    // =================================================================================================================== 

    const [EVC_02_Vm_of_Last_Day, setEVC_02_Vm_of_Last_Day] = useState<string | null>(null);
    const [EVC_02_Vm_of_Last_Day_High, setEVC_02_Vm_of_Last_Day_High] = useState<number | null>(null);
    const [EVC_02_Vm_of_Last_Day_Low, setEVC_02_Vm_of_Last_Day_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_02_Vm_of_Last_Day, setExceedThresholdEVC_02_Vm_of_Last_Day] = useState(false); 
    const [maintainEVC_02_Vm_of_Last_Day, setMaintainEVC_02_Vm_of_Last_Day] = useState<boolean>(false);
    
    useEffect(() => {
        const EVC_02_Vm_of_Last_DayValue = parseFloat(EVC_02_Vm_of_Last_Day as any);
        const highValue = EVC_02_Vm_of_Last_Day_High ?? NaN;
        const lowValue = EVC_02_Vm_of_Last_Day_Low ?? NaN;
    
        if (!isNaN(EVC_02_Vm_of_Last_DayValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainEVC_02_Vm_of_Last_Day) {
            setExceedThresholdEVC_02_Vm_of_Last_Day(EVC_02_Vm_of_Last_DayValue >= highValue || EVC_02_Vm_of_Last_DayValue <= lowValue);
        }
    }, [EVC_02_Vm_of_Last_Day, EVC_02_Vm_of_Last_Day_High, EVC_02_Vm_of_Last_Day_Low, maintainEVC_02_Vm_of_Last_Day]);
    
    
    
    
    
    
    
    
    
    // =================================================================================================================== 
    
// =================================================================================================================== 

const [ESD, setESD] = useState<string | null>(null);
const [ESD_High, setESD_High] = useState<number | null>(null);
const [ESD_Low, setESD_Low] = useState<number | null>(null);
const [exceedThresholdESD, setExceedThresholdESD] = useState(false); 
const [maintainESD, setMaintainESD] = useState<boolean>(false);

useEffect(() => {
const ESDValue = parseFloat(ESD as any);
const highValue = ESD_High ?? NaN;
const lowValue = ESD_Low ?? NaN;

if (!isNaN(ESDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD) {
 setExceedThresholdESD(ESDValue >= highValue || ESDValue <= lowValue);
}
}, [ESD, ESD_High, ESD_Low, maintainESD]);






// =================================================================================================================== 
const [VAPORIZER_1, setVAPORIZER_1] = useState<string | null>(null);
const [VAPORIZER_1_High, setVAPORIZER_1_High] = useState<number | null>(null);
const [VAPORIZER_1_Low, setVAPORIZER_1_Low] = useState<number | null>(null);
const [exceedThresholdVAPORIZER_1, setExceedThresholdVAPORIZER_1] = useState(false); 
const [maintainVAPORIZER_1, setMaintainVAPORIZER_1] = useState<boolean>(false);

useEffect(() => {
  const VAPORIZER_1Value = parseFloat(VAPORIZER_1 as any);
  const highValue = VAPORIZER_1_High ?? NaN;
  const lowValue = VAPORIZER_1_Low ?? NaN;

  if (!isNaN(VAPORIZER_1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_1) {
      setExceedThresholdVAPORIZER_1(VAPORIZER_1Value >= highValue || VAPORIZER_1Value <= lowValue);
  }
}, [VAPORIZER_1, VAPORIZER_1_High, VAPORIZER_1_Low, maintainVAPORIZER_1]);








// =================================================================================================================== 


const [VAPORIZER_2, setVAPORIZER_2] = useState<string | null>(null);
const [VAPORIZER_2_High, setVAPORIZER_2_High] = useState<number | null>(null);
const [VAPORIZER_2_Low, setVAPORIZER_2_Low] = useState<number | null>(null);
const [exceedThresholdVAPORIZER_2, setExceedThresholdVAPORIZER_2] = useState(false); 
const [maintainVAPORIZER_2, setMaintainVAPORIZER_2] = useState<boolean>(false);

useEffect(() => {
  const VAPORIZER_2Value = parseFloat(VAPORIZER_2 as any);
  const highValue = VAPORIZER_2_High ?? NaN;
  const lowValue = VAPORIZER_2_Low ?? NaN;

  if (!isNaN(VAPORIZER_2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_2) {
      setExceedThresholdVAPORIZER_2(VAPORIZER_2Value >= highValue || VAPORIZER_2Value <= lowValue);
  }
}, [VAPORIZER_2, VAPORIZER_2_High, VAPORIZER_2_Low, maintainVAPORIZER_2]);








// =================================================================================================================== 



const [VAPORIZER_3, setVAPORIZER_3] = useState<string | null>(null);
const [VAPORIZER_3_High, setVAPORIZER_3_High] = useState<number | null>(null);
const [VAPORIZER_3_Low, setVAPORIZER_3_Low] = useState<number | null>(null);
const [exceedThresholdVAPORIZER_3, setExceedThresholdVAPORIZER_3] = useState(false); 
const [maintainVAPORIZER_3, setMaintainVAPORIZER_3] = useState<boolean>(false);

useEffect(() => {
  const VAPORIZER_3Value = parseFloat(VAPORIZER_3 as any);
  const highValue = VAPORIZER_3_High ?? NaN;
  const lowValue = VAPORIZER_3_Low ?? NaN;

  if (!isNaN(VAPORIZER_3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_3) {
      setExceedThresholdVAPORIZER_3(VAPORIZER_3Value >= highValue || VAPORIZER_3Value <= lowValue);
  }
}, [VAPORIZER_3, VAPORIZER_3_High, VAPORIZER_3_Low, maintainVAPORIZER_3]);








   // =================================================================================================================== 


   const [VAPORIZER_4, setVAPORIZER_4] = useState<string | null>(null);
   const [VAPORIZER_4_High, setVAPORIZER_4_High] = useState<number | null>(null);
   const [VAPORIZER_4_Low, setVAPORIZER_4_Low] = useState<number | null>(null);
   const [exceedThresholdVAPORIZER_4, setExceedThresholdVAPORIZER_4] = useState(false); 
   const [maintainVAPORIZER_4, setMaintainVAPORIZER_4] = useState<boolean>(false);
   
   useEffect(() => {
       const VAPORIZER_4Value = parseFloat(VAPORIZER_4 as any);
       const highValue = VAPORIZER_4_High ?? NaN;
       const lowValue = VAPORIZER_4_Low ?? NaN;
   
       if (!isNaN(VAPORIZER_4Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainVAPORIZER_4) {
           setExceedThresholdVAPORIZER_4(VAPORIZER_4Value >= highValue || VAPORIZER_4Value <= lowValue);
       }
   }, [VAPORIZER_4, VAPORIZER_4_High, VAPORIZER_4_Low, maintainVAPORIZER_4]);
   
   
   
   

   
   // =================================================================================================================== 

   const [COOLING_V, setCOOLING_V] = useState<string | null>(null);
   const [COOLING_V_High, setCOOLING_V_High] = useState<number | null>(null);
   const [COOLING_V_Low, setCOOLING_V_Low] = useState<number | null>(null);
   const [exceedThresholdCOOLING_V, setExceedThresholdCOOLING_V] = useState(false); 
   const [maintainCOOLING_V, setMaintainCOOLING_V] = useState<boolean>(false);
   
   useEffect(() => {
       const COOLING_VValue = parseFloat(COOLING_V as any);
       const highValue = COOLING_V_High ?? NaN;
       const lowValue = COOLING_V_Low ?? NaN;
   
       if (!isNaN(COOLING_VValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainCOOLING_V) {
           setExceedThresholdCOOLING_V(COOLING_VValue >= highValue || COOLING_VValue <= lowValue);
       }
   }, [COOLING_V, COOLING_V_High, COOLING_V_Low, maintainCOOLING_V]);
   

   
   // =================================================================================================================== 


   const [PERCENT_LPG, setPERCENT_LPG] = useState<string | null>(null);
   const [PERCENT_LPG_High, setPERCENT_LPG_High] = useState<number | null>(null);
   const [PERCENT_LPG_Low, setPERCENT_LPG_Low] = useState<number | null>(null);
   const [exceedThresholdPERCENT_LPG, setExceedThresholdPERCENT_LPG] = useState(false); 
   const [maintainPERCENT_LPG, setMaintainPERCENT_LPG] = useState<boolean>(false);
   
   useEffect(() => {
       const PERCENT_LPGValue = parseFloat(PERCENT_LPG as any);
       const highValue = PERCENT_LPG_High ?? NaN;
       const lowValue = PERCENT_LPG_Low ?? NaN;
   
       if (!isNaN(PERCENT_LPGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPERCENT_LPG) {
           setExceedThresholdPERCENT_LPG(PERCENT_LPGValue >= highValue || PERCENT_LPGValue <= lowValue);
       }
   }, [PERCENT_LPG, PERCENT_LPG_High, PERCENT_LPG_Low, maintainPERCENT_LPG]);
   
   
   
   


   
   // =================================================================================================================== 

   const [FCV_3001, setFCV_3001] = useState<string | null>(null);
   const [FCV_3001_High, setFCV_3001_High] = useState<number | null>(null);
   const [FCV_3001_Low, setFCV_3001_Low] = useState<number | null>(null);
   const [exceedThresholdFCV_3001, setExceedThresholdFCV_3001] = useState(false); 
   const [maintainFCV_3001, setMaintainFCV_3001] = useState<boolean>(false);
   
   useEffect(() => {
       const FCV_3001Value = parseFloat(FCV_3001 as any);
       const highValue = FCV_3001_High ?? NaN;
       const lowValue = FCV_3001_Low ?? NaN;
   
       if (!isNaN(FCV_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFCV_3001) {
           setExceedThresholdFCV_3001(FCV_3001Value >= highValue || FCV_3001Value <= lowValue);
       }
   }, [FCV_3001, FCV_3001_High, FCV_3001_Low, maintainFCV_3001]);
   
   


   // =================================================================================================================== 

   const [PERCENT_AIR, setPERCENT_AIR] = useState<string | null>(null);
   const [PERCENT_AIR_High, setPERCENT_AIR_High] = useState<number | null>(null);
   const [PERCENT_AIR_Low, setPERCENT_AIR_Low] = useState<number | null>(null);
   const [exceedThresholdPERCENT_AIR, setExceedThresholdPERCENT_AIR] = useState(false); 
   const [maintainPERCENT_AIR, setMaintainPERCENT_AIR] = useState<boolean>(false);
   
   useEffect(() => {
       const PERCENT_AIRValue = parseFloat(PERCENT_AIR as any);
       const highValue = PERCENT_AIR_High ?? NaN;
       const lowValue = PERCENT_AIR_Low ?? NaN;
   
       if (!isNaN(PERCENT_AIRValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPERCENT_AIR) {
           setExceedThresholdPERCENT_AIR(PERCENT_AIRValue >= highValue || PERCENT_AIRValue <= lowValue);
       }
   }, [PERCENT_AIR, PERCENT_AIR_High, PERCENT_AIR_Low, maintainPERCENT_AIR]);
   
 


   // =================================================================================================================== 
   
// =================================================================================================================== 

const [HV_3001, setHV_3001] = useState<string | null>(null);
   const [HV_3001_High, setHV_3001_High] = useState<number | null>(null);
   const [HV_3001_Low, setHV_3001_Low] = useState<number | null>(null);
   const [exceedThresholdHV_3001, setExceedThresholdHV_3001] = useState(false); 
   const [maintainHV_3001, setMaintainHV_3001] = useState<boolean>(false);
   
   useEffect(() => {
       const HV_3001Value = parseFloat(HV_3001 as any);
       const highValue = HV_3001_High ?? NaN;
       const lowValue = HV_3001_Low ?? NaN;
   
       if (!isNaN(HV_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHV_3001) {
           setExceedThresholdHV_3001(HV_3001Value >= highValue || HV_3001Value <= lowValue);
       }
   }, [HV_3001, HV_3001_High, HV_3001_Low, maintainHV_3001]);
   



// =================================================================================================================== 

 // =================================================================================================================== 

 const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);
 const [FCV_MODE_High, setFCV_MODE_High] = useState<number | null>(null);
 const [FCV_MODE_Low, setFCV_MODE_Low] = useState<number | null>(null);
 const [exceedThresholdFCV_MODE, setExceedThresholdFCV_MODE] = useState(false); 
 const [maintainFCV_MODE, setMaintainFCV_MODE] = useState<boolean>(false);
 
 useEffect(() => {
     const FCV_MODEValue = parseFloat(FCV_MODE as any);
     const highValue = FCV_MODE_High ?? NaN;
     const lowValue = FCV_MODE_Low ?? NaN;
 
     if (!isNaN(FCV_MODEValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainFCV_MODE) {
         setExceedThresholdFCV_MODE(FCV_MODEValue >= highValue || FCV_MODEValue <= lowValue);
     }
 }, [FCV_MODE, FCV_MODE_High, FCV_MODE_Low, maintainFCV_MODE]);



 // =================================================================================================================== 
 
     // =================================================================================================================== 

     const [TOTAL_CNG, setTOTAL_CNG] = useState<string | null>(null);
     const [TOTAL_CNG_High, setTOTAL_CNG_High] = useState<number | null>(null);
     const [TOTAL_CNG_Low, setTOTAL_CNG_Low] = useState<number | null>(null);
     const [exceedThresholdTOTAL_CNG, setExceedThresholdTOTAL_CNG] = useState(false); 
     const [maintainTOTAL_CNG, setMaintainTOTAL_CNG] = useState<boolean>(false);
     
     useEffect(() => {
         const TOTAL_CNGValue = parseFloat(TOTAL_CNG as any);
         const highValue = TOTAL_CNG_High ?? NaN;
         const lowValue = TOTAL_CNG_Low ?? NaN;
     
         if (!isNaN(TOTAL_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTOTAL_CNG) {
             setExceedThresholdTOTAL_CNG(TOTAL_CNGValue >= highValue || TOTAL_CNGValue <= lowValue);
         }
     }, [TOTAL_CNG, TOTAL_CNG_High, TOTAL_CNG_Low, maintainTOTAL_CNG]);
     
     
     
     
    
// =================================================================================================================== 



const [TM3002_CNG, setTM3002_CNG] = useState<string | null>(null);
const [TM3002_CNG_High, setTM3002_CNG_High] = useState<number | null>(null);
const [TM3002_CNG_Low, setTM3002_CNG_Low] = useState<number | null>(null);
const [exceedThresholdTM3002_CNG, setExceedThresholdTM3002_CNG] = useState(false); 
const [maintainTM3002_CNG, setMaintainTM3002_CNG] = useState<boolean>(false);

useEffect(() => {
 const TM3002_CNGValue = parseFloat(TM3002_CNG as any);
 const highValue = TM3002_CNG_High ?? NaN;
 const lowValue = TM3002_CNG_Low ?? NaN;

 if (!isNaN(TM3002_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM3002_CNG) {
     setExceedThresholdTM3002_CNG(TM3002_CNGValue >= highValue || TM3002_CNGValue <= lowValue);
 }
}, [TM3002_CNG, TM3002_CNG_High, TM3002_CNG_Low, maintainTM3002_CNG]);




// =================================================================================================================== 

 // =================================================================================================================== 

 const [TM3003_CNG, setTM3003_CNG] = useState<string | null>(null);
 const [TM3003_CNG_High, setTM3003_CNG_High] = useState<number | null>(null);
 const [TM3003_CNG_Low, setTM3003_CNG_Low] = useState<number | null>(null);
 const [exceedThresholdTM3003_CNG, setExceedThresholdTM3003_CNG] = useState(false); 
 const [maintainTM3003_CNG, setMaintainTM3003_CNG] = useState<boolean>(false);
 
 useEffect(() => {
     const TM3003_CNGValue = parseFloat(TM3003_CNG as any);
     const highValue = TM3003_CNG_High ?? NaN;
     const lowValue = TM3003_CNG_Low ?? NaN;
 
     if (!isNaN(TM3003_CNGValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTM3003_CNG) {
         setExceedThresholdTM3003_CNG(TM3003_CNGValue >= highValue || TM3003_CNGValue <= lowValue);
     }
 }, [TM3003_CNG, TM3003_CNG_High, TM3003_CNG_Low, maintainTM3003_CNG]);
 
 


// =================================================================================================================== 


const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
const [WB_Setpoint_High, setWB_Setpoint_High] = useState<number | null>(null);
const [WB_Setpoint_Low, setWB_Setpoint_Low] = useState<number | null>(null);
const [exceedThresholdWB_Setpoint, setExceedThresholdWB_Setpoint] = useState(false); 
const [maintainWB_Setpoint, setMaintainWB_Setpoint] = useState<boolean>(false);

useEffect(() => {
const WB_SetpointValue = parseFloat(WB_Setpoint as any);
const highValue = WB_Setpoint_High ?? NaN;
const lowValue = WB_Setpoint_Low ?? NaN;

if (!isNaN(WB_SetpointValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWB_Setpoint) {
 setExceedThresholdWB_Setpoint(WB_SetpointValue >= highValue || WB_SetpointValue <= lowValue);
}
}, [WB_Setpoint, WB_Setpoint_High, WB_Setpoint_Low, maintainWB_Setpoint]);




// =================================================================================================================== 



 // =================================================================================================================== 


const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
const [RATIO_MODE_High, setRATIO_MODE_High] = useState<number | null>(null);
const [RATIO_MODE_Low, setRATIO_MODE_Low] = useState<number | null>(null);
const [exceedThresholdRATIO_MODE, setExceedThresholdRATIO_MODE] = useState(false); 
const [maintainRATIO_MODE, setMaintainRATIO_MODE] = useState<boolean>(false);

useEffect(() => {
const RATIO_MODEValue = parseFloat(RATIO_MODE as any);
const highValue = RATIO_MODE_High ?? NaN;
const lowValue = RATIO_MODE_Low ?? NaN;

if (!isNaN(RATIO_MODEValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainRATIO_MODE) {
 setExceedThresholdRATIO_MODE(RATIO_MODEValue >= highValue || RATIO_MODEValue <= lowValue);
}
}, [RATIO_MODE, RATIO_MODE_High, RATIO_MODE_Low, maintainRATIO_MODE]);


 
 // =================================================================================================================== 
 

 

  // =================================================================================================================== 


  const [HR_BC, setHR_BC] = useState<string | null>(null);
  const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
  const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
  const [exceedThresholdHR_BC, setExceedThresholdHR_BC] = useState(false); 
  const [maintainHR_BC, setMaintainHR_BC] = useState<boolean>(false);
  
  useEffect(() => {
      const HR_BCValue = parseFloat(HR_BC as any);
      const highValue = HR_BC_High ?? NaN;
      const lowValue = HR_BC_Low ?? NaN;
  
      if (!isNaN(HR_BCValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainHR_BC) {
          setExceedThresholdHR_BC(HR_BCValue >= highValue || HR_BCValue <= lowValue);
      }
  }, [HR_BC, HR_BC_High, HR_BC_Low, maintainHR_BC]);
  
  

 // =================================================================================================================== 



 const [SD, setSD] = useState<string | null>(null);
 const [SD_High, setSD_High] = useState<number | null>(null);
 const [SD_Low, setSD_Low] = useState<number | null>(null);
 const [exceedThresholdSD, setExceedThresholdSD] = useState(false); 
 const [maintainSD, setMaintainSD] = useState<boolean>(false);
 
 useEffect(() => {
     const SDValue = parseFloat(SD as any);
     const highValue = SD_High ?? NaN;
     const lowValue = SD_Low ?? NaN;
 
     if (!isNaN(SDValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSD) {
         setExceedThresholdSD(SDValue >= highValue || SDValue <= lowValue);
     }
 }, [SD, SD_High, SD_Low, maintainSD]);
 


 // =================================================================================================================== 

 

 const [ESD_3001, setESD_3001] = useState<string | null>(null);
 const [ESD_3001_High, setESD_3001_High] = useState<number | null>(null);
 const [ESD_3001_Low, setESD_3001_Low] = useState<number | null>(null);
 const [exceedThresholdESD_3001, setExceedThresholdESD_3001] = useState(false); 
 const [maintainESD_3001, setMaintainESD_3001] = useState<boolean>(false);
 
 useEffect(() => {
     const ESD_3001Value = parseFloat(ESD_3001 as any);
     const highValue = ESD_3001_High ?? NaN;
     const lowValue = ESD_3001_Low ?? NaN;
 
     if (!isNaN(ESD_3001Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainESD_3001) {
         setExceedThresholdESD_3001(ESD_3001Value >= highValue || ESD_3001Value <= lowValue);
     }
 }, [ESD_3001, ESD_3001_High, ESD_3001_Low, maintainESD_3001]);
 

 
      // =================================================================================================================== 
      
     // =================================================================================================================== 



     const [WIS_Calorimeter, setWIS_Calorimeter] = useState<string | null>(null);
     const [WIS_Calorimeter_High, setWIS_Calorimeter_High] = useState<number | null>(null);
     const [WIS_Calorimeter_Low, setWIS_Calorimeter_Low] = useState<number | null>(null);
     const [exceedThresholdWIS_Calorimeter, setExceedThresholdWIS_Calorimeter] = useState(false); 
     const [maintainWIS_Calorimeter, setMaintainWIS_Calorimeter] = useState<boolean>(false);
     
     useEffect(() => {
         const WIS_CalorimeterValue = parseFloat(WIS_Calorimeter as any);
         const highValue = WIS_Calorimeter_High ?? NaN;
         const lowValue = WIS_Calorimeter_Low ?? NaN;
     
         if (!isNaN(WIS_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainWIS_Calorimeter) {
             setExceedThresholdWIS_Calorimeter(WIS_CalorimeterValue >= highValue || WIS_CalorimeterValue <= lowValue);
         }
     }, [WIS_Calorimeter, WIS_Calorimeter_High, WIS_Calorimeter_Low, maintainWIS_Calorimeter]);
     


     // =================================================================================================================== 
           // =================================================================================================================== 



     
           const [CVS_Calorimeter, setCVS_Calorimeter] = useState<string | null>(null);
           const [CVS_Calorimeter_High, setCVS_Calorimeter_High] = useState<number | null>(null);
           const [CVS_Calorimeter_Low, setCVS_Calorimeter_Low] = useState<number | null>(null);
           const [exceedThresholdCVS_Calorimeter, setExceedThresholdCVS_Calorimeter] = useState(false); 
           const [maintainCVS_Calorimeter, setMaintainCVS_Calorimeter] = useState<boolean>(false);
           
           useEffect(() => {
               const CVS_CalorimeterValue = parseFloat(CVS_Calorimeter as any);
               const highValue = CVS_Calorimeter_High ?? NaN;
               const lowValue = CVS_Calorimeter_Low ?? NaN;
           
               if (!isNaN(CVS_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainCVS_Calorimeter) {
                   setExceedThresholdCVS_Calorimeter(CVS_CalorimeterValue >= highValue || CVS_CalorimeterValue <= lowValue);
               }
           }, [CVS_Calorimeter, CVS_Calorimeter_High, CVS_Calorimeter_Low, maintainCVS_Calorimeter]);
           
           

      
      
           // =================================================================================================================== 

           


                     // =================================================================================================================== 


                     const [SG_Calorimeter, setSG_Calorimeter] = useState<string | null>(null);
                     const [SG_Calorimeter_High, setSG_Calorimeter_High] = useState<number | null>(null);
                     const [SG_Calorimeter_Low, setSG_Calorimeter_Low] = useState<number | null>(null);
                     const [exceedThresholdSG_Calorimeter, setExceedThresholdSG_Calorimeter] = useState(false); 
                     const [maintainSG_Calorimeter, setMaintainSG_Calorimeter] = useState<boolean>(false);
                     
                     useEffect(() => {
                         const SG_CalorimeterValue = parseFloat(SG_Calorimeter as any);
                         const highValue = SG_Calorimeter_High ?? NaN;
                         const lowValue = SG_Calorimeter_Low ?? NaN;
                     
                         if (!isNaN(SG_CalorimeterValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainSG_Calorimeter) {
                             setExceedThresholdSG_Calorimeter(SG_CalorimeterValue >= highValue || SG_CalorimeterValue <= lowValue);
                         }
                     }, [SG_Calorimeter, SG_Calorimeter_High, SG_Calorimeter_Low, maintainSG_Calorimeter]);
                     
   
                
                
                     // =================================================================================================================== 



                     
           // =================================================================================================================== 



         
           const [TD_4072_Conn_STT, setTD_4072_Conn_STT] = useState<string | null>(null);
           const [TD_4072_Conn_STT_High, setTD_4072_Conn_STT_High] = useState<number | null>(null);
           const [TD_4072_Conn_STT_Low, setTD_4072_Conn_STT_Low] = useState<number | null>(null);
           const [exceedThresholdTD_4072_Conn_STT, setExceedThresholdTD_4072_Conn_STT] = useState(false); 
           const [maintainTD_4072_Conn_STT, setMaintainTD_4072_Conn_STT] = useState<boolean>(false);
           
           useEffect(() => {
               const TD_4072_Conn_STTValue = parseFloat(TD_4072_Conn_STT as any);
               const highValue = TD_4072_Conn_STT_High ?? NaN;
               const lowValue = TD_4072_Conn_STT_Low ?? NaN;
           
               if (!isNaN(TD_4072_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainTD_4072_Conn_STT) {
                   setExceedThresholdTD_4072_Conn_STT(TD_4072_Conn_STTValue >= highValue || TD_4072_Conn_STTValue <= lowValue);
               }
           }, [TD_4072_Conn_STT, TD_4072_Conn_STT_High, TD_4072_Conn_STT_Low, maintainTD_4072_Conn_STT]);
           
           

      
           // =================================================================================================================== 


           

                     // =================================================================================================================== 


                     const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);
                     const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
                     const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
                     const [exceedThresholdPLC_Conn_STT, setExceedThresholdPLC_Conn_STT] = useState(false); 
                     const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);
                     
                     useEffect(() => {
                         const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT as any);
                         const highValue = PLC_Conn_STT_High ?? NaN;
                         const lowValue = PLC_Conn_STT_Low ?? NaN;
                     
                         if (!isNaN(PLC_Conn_STTValue) && !isNaN(highValue) && !isNaN(lowValue) && !maintainPLC_Conn_STT) {
                             setExceedThresholdPLC_Conn_STT(PLC_Conn_STTValue >= highValue || PLC_Conn_STTValue <= lowValue);
                         }
                     }, [PLC_Conn_STT, PLC_Conn_STT_High, PLC_Conn_STT_Low, maintainPLC_Conn_STT]);
                     
                     

                
                     // =================================================================================================================== 
 // =================================================================================================================== 

// =================================================================================================================== 
       
       

     //======================================================================================================================

    const tagNamePLC = {
        PT_3005: "Pressure Transmitter PT-3005 (BarG)",
        PT_3006: "Pressure Transmitter PT-3006 (BarG)",
        TT_3003: "Temperature Transmitter TT-3003 (˚C)",
        TT_3004: "Temperature Transmitter TT-3004 (˚C) ",
        TG_3005: "TG-3005 (˚C)",

        WB_3001: "Wobbe Index WB-1001 (MJ/Sm³)",

      


        GD_3002: "Gas Detector GD-3002 (%LEL)",
        GD_3003: "Gas Detector GD-3003 (%LEL)",
        GD_3004: "Gas Detector GD-3004 (%LEL)",
        GD_3005: `Gas Detector GD-3005 (%LEL)`,
        GD_3006: `Gas Detector GD-3006 (%LEL)`,

        TM_3002_SNG:`Tubine Meter TM3002-SNG${nameValue.Sm3h}`,
        TM_3003_SNG:`Tubine Meter TM3003-SNG${nameValue.Sm3h}`,
        TOTAL_SNG: `Total SNG ${nameValue.m3}`,

        SDV_3004:"Shutdown Valve SDV-3004 (0: Close - 1: Open)",
        SDV_3003:"Shutdown Valve SDV-3003 (0: Close - 1: Open)",

        
        


        GD1_STATUS:"GD-3002 Status (0: Normal - 1: Alarm)",
        GD2_STATUS:"GD-3003 Status (0: Normal - 1: Alarm)",
        GD3_STATUS:"GD-3004 Status (0: Normal - 1: Alarm)",
        GD4_STATUS:"GD-3005 Status (0: Normal - 1: Alarm)",
        GD5_STATUS:"GD-3006 Status (0: Normal - 1: Alarm)",


        SD: "Smoke Detector (0: Normal - 1: Smoker Detected) ",
        HR_BC: "Horn And Beacon (0: OFF - 1: ON)",
        ESD: "Emergency Shutdown (0: No Active - 1: Active)",
        VAPORIZER_3: "VAPORIZER 3 (0: Stop - 1: Run)",
        VAPORIZER_2: "VAPORIZER 2 (0: Stop - 1: Run)",
        VAPORIZER_1: "VAPORIZER 1 (0: Stop - 1: Run)",


        VAPORIZER_4: "VAPORIZER 4 (0: Stop - 1: Run)",
        COOLING_V: " COOLING V  (0: Stop - 1: Run)",

        FCV_3001: "FCV-3001 (%)",
    
        PERCENT_LPG:"% LPG (%)",
        PERCENT_AIR:"% AIR (%)",
        HV_3001:"Heat Value HV-1001 (MJ/Sm³)",
        RATIO_MODE:"RATIO Mode (0: Manual - 1: Auto )",
        FCV_MODE:"FCV MODE (0: Manual - 1: Auto )",
        TOTAL_CNG: "Total CNG (Sm³)",
        TM3002_CNG: "Tubine Meter TM3002-CNG (Sm³/h)",
        TM3003_CNG: "Tubine Meter TM3003-CNG (Sm³/h)",
        WB_Setpoint: "Wobbe Index Setpoint (MJ/Sm³)",
        WIS_Calorimeter: "WIS Calorimeter (MJ/Sm³)", 
        CVS_Calorimeter: "CVS Calorimeter (MJ/Sm³)",
        SG_Calorimeter: "SG Calorimeter (rel)",

        PLC_Conn_STT:"PLC Connection Status (0: Not Init - 1: COM OK - 2: Error)",
        TD_4072_Conn_STT:"Calorimeter Connection Status (0: Not Init - 1: COM OK - 2: Error)",


    };

        const DataTT_3003  = TT_3003 === "0" ? "Stop" : TT_3003 === "1" ? "Run" : null;
        const DataPT_3006  = PT_3006 === "0" ? "Stop" : PT_3006 === "1" ? "Run" : null;
        const DataPT_3005  = PT_3005 === "0" ? "Stop" : PT_3005 === "1" ? "Run" : null;

        const DataTG_3005  = TG_3005 === "0" ? "Normal" : TG_3005 === "1" ? "Alarm" : null;
        const DataWB_3001  = WB_3001 === "0" ? "Normal" : WB_3001 === "1" ? "Alarm" : null;
        const DataTT_3004  = TT_3004 === "0" ? "Normal" : TT_3004 === "1" ? "Alarm" : null;

        const DataGD_3003  = GD_3003 === "0" ? "Normal" : GD_3003 === "1" ? "Alarm" : null;
        const DataGD_3004  = GD_3004 === "0" ? "Normal" : GD_3004 === "1" ? "Alarm" : null;
        const DataGD_3002  = GD_3002 === "0" ? "Normal" : GD_3002 === "1" ? "Alarm" : null;

        const DataGD5_STATUS  = GD5_STATUS === "0" ? "Normal" : GD5_STATUS === "1" ? "Alarm" : null;
        const DataGD4_STATUS  = GD4_STATUS === "0" ? "Normal" : GD4_STATUS === "1" ? "Alarm" : null;
        const DataGD3_STATUS  = GD3_STATUS === "0" ? "Normal" : GD3_STATUS === "1" ? "Alarm" : null;
        const DataGD2_STATUS  = GD2_STATUS === "0" ? "Normal" : GD2_STATUS === "1" ? "Alarm" : null;
        const DataGD1_STATUS  = GD1_STATUS === "0" ? "Normal" : GD1_STATUS === "1" ? "Alarm" : null;

        const DataSDV_3004  = SDV_3004 === "0" ? "Close" : SDV_3004 === "1" ? "Open" : null;
        const DataSDV_3003  = SDV_3003 === "0" ? "Close" : SDV_3003 === "1" ? "Open" : null;

        const DataSD  = SD === "0" ? "Normal" : SD === "1" ? "Smoker Detected" : null;
        const DataHR_BC  = HR_BC === "0" ? "OFF" : HR_BC === "1" ? "ON" : null;
        const DataESD  = ESD === "0" ? "No Active" : ESD === "1" ? "Active" : null;

        const DataVAPORIZER_3  = VAPORIZER_3 === "0" ? "Stop" : VAPORIZER_3 === "1" ? "Run" : null;
        const DataVAPORIZER_2  = VAPORIZER_2 === "0" ? "Stop" : VAPORIZER_2 === "1" ? "Run" : null;
        const DataVAPORIZER_1  = VAPORIZER_1 === "0" ? "Stop" : VAPORIZER_1 === "1" ? "Run" : null;
        const DataVAPORIZER_4  = VAPORIZER_4 === "0" ? "Stop" : VAPORIZER_4 === "1" ? "Run" : null;

        const DataCOOLING_V  = COOLING_V === "0" ? "Stop" : COOLING_V === "1" ? "Run" : null;



        const DataFCV_MODE  = FCV_MODE === "0" ? "Manual" : FCV_MODE === "1" ? "Auto" : null;
        const DataRATIO_MODE  = RATIO_MODE === "0" ? "Manual" : RATIO_MODE === "1" ? "Auto" : null;
   
        const DataTD_4072_Conn_STT  = TD_4072_Conn_STT === "0" ? "Not Init" : TD_4072_Conn_STT === "1" ? "COM OK" : TD_4072_Conn_STT === "2" ? "Error" : null;
   
        const DataPLC_Conn_STT  = PLC_Conn_STT === "0" ? "Not Init" : PLC_Conn_STT === "1" ? "COM OK" : PLC_Conn_STT === "2" ? "Error" : null;

            const combineCss = {

                CSSPT_3005 : {
                    color:exceedThresholdPT_3005 && !maintainPT_3005
                    ? "#ff5656"
                    : maintainPT_3005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_3005 || maintainPT_3005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_3005 || maintainPT_3005)
                    ? 18
                    : ""
                },
        
                CSSPT_3006 : {
                    color:exceedThresholdPT_3006 && !maintainPT_3006
                    ? "#ff5656"
                    : maintainPT_3006
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_3006 || maintainPT_3006)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_3006 || maintainPT_3006)
                    ? 18
                    : ""
                },
        
        
                CSSTT_3003 : {
                    color:exceedThresholdTT_3003 && !maintainTT_3003
                    ? "#ff5656"
                    : maintainTT_3003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_3003 || maintainTT_3003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_3003 || maintainTT_3003)
                    ? 18
                    : ""
                },
                CSSTT_3004 : {
                    color:exceedThresholdTT_3004 && !maintainTT_3004
                    ? "#ff5656"
                    : maintainTT_3004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_3004 || maintainTT_3004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_3004 || maintainTT_3004)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSWB_3001 : {
                    color:exceedThresholdWB_3001 && !maintainWB_3001
                    ? "#ff5656"
                    : maintainWB_3001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdWB_3001 || maintainWB_3001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdWB_3001 || maintainWB_3001)
                    ? 18
                    : ""
                },
           
        
                CSSGD5_STATUS : {
                    color:exceedThresholdGD5_STATUS && !maintainGD5_STATUS
                    ? "#ff5656"
                    : maintainGD5_STATUS
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD5_STATUS || maintainGD5_STATUS)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD5_STATUS || maintainGD5_STATUS)
                    ? 18
                    : ""
                },
        
                CSSGD_3002 : {
                    color:exceedThresholdGD_3002 && !maintainGD_3002
                    ? "#ff5656"
                    : maintainGD_3002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_3002 || maintainGD_3002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_3002 || maintainGD_3002)
                    ? 18
                    : ""
                },
        
                CSSGD_3003 : {
                    color:exceedThresholdGD_3003 && !maintainGD_3003
                    ? "#ff5656"
                    : maintainGD_3003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_3003 || maintainGD_3003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_3003 || maintainGD_3003)
                    ? 18
                    : ""
                },
        
        
          
        
        
                CSSGD_3005 : {
                    color:exceedThresholdGD_3005 && !maintainGD_3005
                    ? "#ff5656"
                    : maintainGD_3005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_3005 || maintainGD_3005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_3005 || maintainGD_3005)
                    ? 18
                    : ""
                },
        
                CSSGD_3006 : {
                    color:exceedThresholdGD_3006 && !maintainGD_3006
                    ? "#ff5656"
                    : maintainGD_3006
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_3006 || maintainGD_3006)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_3006 || maintainGD_3006)
                    ? 18
                    : ""
                },
        
        
        
        
                CSSTG_3005 : {
                    color:exceedThresholdTG_3005 && !maintainTG_3005
                    ? "#ff5656"
                    : maintainTG_3005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTG_3005 || maintainTG_3005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTG_3005 || maintainTG_3005)
                    ? 18
                    : ""
                },
        
        
                CSSTM_3002_SNG : {
                         color:exceedThresholdTM_3002_SNG && !maintainTM_3002_SNG
                    ? "#ff5656"
                    : maintainTM_3002_SNG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTM_3002_SNG || maintainTM_3002_SNG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTM_3002_SNG || maintainTM_3002_SNG)
                    ? 18
                    : ""
                },
                CSSTM_3003_SNG : {
                    color:exceedThresholdTM_3003_SNG && !maintainTM_3003_SNG
                    ? "#ff5656"
                    : maintainTM_3003_SNG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTM_3003_SNG || maintainTM_3003_SNG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTM_3003_SNG || maintainTM_3003_SNG)
                    ? 18
                    : ""
                },
        
                CSSGD_3004 : {
                    color:exceedThresholdGD_3004 && !maintainGD_3004
                    ? "#ff5656"
                    : maintainGD_3004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_3004 || maintainGD_3004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_3004 || maintainGD_3004)
                    ? 18
                    : ""
                },
        
                CSSGD2_STATUS : {
                    color:exceedThresholdGD2_STATUS && !maintainGD2_STATUS
                    ? "#ff5656"
                    : maintainGD2_STATUS
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD2_STATUS || maintainGD2_STATUS)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD2_STATUS || maintainGD2_STATUS)
                    ? 18
                    : ""
                },
                CSSTOTAL_SNG : {
                    color:exceedThresholdTOTAL_SNG && !maintainTOTAL_SNG
                    ? "#ff5656"
                    : maintainTOTAL_SNG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTOTAL_SNG || maintainTOTAL_SNG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTOTAL_SNG || maintainTOTAL_SNG)
                    ? 18
                    : ""
                },
                CSSSDV_3004 : {
                    color:exceedThresholdSDV_3004 && !maintainSDV_3004
                    ? "#ff5656"
                    : maintainSDV_3004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_3004 || maintainSDV_3004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_3004 || maintainSDV_3004)
                    ? 18
                    : ""
                },



                CSSGD1_STATUS : {
                    color:exceedThresholdGD1_STATUS && !maintainGD1_STATUS
               ? "#ff5656"
               : maintainGD1_STATUS
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdGD1_STATUS || maintainGD1_STATUS)
               ? 600
               : "",
               fontSize: (exceedThresholdGD1_STATUS || maintainGD1_STATUS)
               ? 18
               : ""
           },
   
           CSSSDV_3003 : {
               color:exceedThresholdSDV_3003 && !maintainSDV_3003
               ? "#ff5656"
               : maintainSDV_3003
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdSDV_3003 || maintainSDV_3003)
               ? 600
               : "",
               fontSize: (exceedThresholdSDV_3003 || maintainSDV_3003)
               ? 18
               : ""
           },
   
       
           CSSGD3_STATUS : {
               color:exceedThresholdGD3_STATUS && !maintainGD3_STATUS
               ? "#ff5656"
               : maintainGD3_STATUS
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdGD3_STATUS || maintainGD3_STATUS)
               ? 600
               : "",
               fontSize: (exceedThresholdGD3_STATUS || maintainGD3_STATUS)
               ? 18
               : ""
           },
           CSSGD4_STATUS : {
               color:exceedThresholdGD4_STATUS && !maintainGD4_STATUS
               ? "#ff5656"
               : maintainGD4_STATUS
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdGD4_STATUS || maintainGD4_STATUS)
               ? 600
               : "",
               fontSize: (exceedThresholdGD4_STATUS || maintainGD4_STATUS)
               ? 18
               : ""
           },
   
           CSSESD : {
            color:exceedThresholdESD && !maintainESD
            ? "#ff5656"
            : maintainESD
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdESD || maintainESD)
            ? 600
            : "",
            fontSize: (exceedThresholdESD || maintainESD)
            ? 18
            : ""
        },


        CSSHR_BC : {
            color:exceedThresholdHR_BC && !maintainHR_BC
            ? "#ff5656"
            : maintainHR_BC
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdHR_BC || maintainHR_BC)
            ? 600
            : "",
            fontSize: (exceedThresholdHR_BC || maintainHR_BC)
            ? 18
            : ""
        },


        CSSSD : {
            color:exceedThresholdSD && !maintainSD
            ? "#ff5656"
            : maintainSD
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdSD || maintainSD)
            ? 600
            : "",
            fontSize: (exceedThresholdSD || maintainSD)
            ? 18
            : ""
        },
        CSSVAPORIZER_1 : {
            color:exceedThresholdVAPORIZER_1 && !maintainVAPORIZER_1
            ? "#ff5656"
            : maintainVAPORIZER_1
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdVAPORIZER_1 || maintainVAPORIZER_1)
            ? 600
            : "",
            fontSize: (exceedThresholdVAPORIZER_1 || maintainVAPORIZER_1)
            ? 18
            : ""
        },


        CSSVAPORIZER_3 : {
            color:exceedThresholdVAPORIZER_3 && !maintainVAPORIZER_3
            ? "#ff5656"
            : maintainVAPORIZER_3
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdVAPORIZER_3 || maintainVAPORIZER_3)
            ? 600
            : "",
            fontSize: (exceedThresholdVAPORIZER_3 || maintainVAPORIZER_3)
            ? 18
            : ""
        },



        CSSVAPORIZER_2 : {
            color:exceedThresholdVAPORIZER_2 && !maintainVAPORIZER_2
            ? "#ff5656"
            : maintainVAPORIZER_2
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdVAPORIZER_2 || maintainVAPORIZER_2)
            ? 600
            : "",
            fontSize: (exceedThresholdVAPORIZER_2 || maintainVAPORIZER_2)
            ? 18
            : ""
        },
   

     

        CSSVAPORIZER_4 : {
            color:exceedThresholdVAPORIZER_4 && !maintainVAPORIZER_4
            ? "#ff5656"
            : maintainVAPORIZER_4
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdVAPORIZER_4 || maintainVAPORIZER_4)
            ? 600
            : "",
            fontSize: (exceedThresholdVAPORIZER_4 || maintainVAPORIZER_4)
            ? 18
            : ""
        },

        CSSCOOLING_V : {
            color:exceedThresholdCOOLING_V && !maintainCOOLING_V
            ? "#ff5656"
            : maintainCOOLING_V
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdCOOLING_V || maintainCOOLING_V)
            ? 600
            : "",
            fontSize: (exceedThresholdCOOLING_V || maintainCOOLING_V)
            ? 18
            : ""
        },


        CSSFCV_3001 : {
            color:exceedThresholdFCV_3001 && !maintainFCV_3001
            ? "#ff5656"
            : maintainFCV_3001
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdFCV_3001 || maintainFCV_3001)
            ? 600
            : "",
            fontSize: (exceedThresholdFCV_3001 || maintainFCV_3001)
            ? 18
            : ""
        },


        
        CSSPERCENT_LPG : {
            color:exceedThresholdPERCENT_LPG && !maintainPERCENT_LPG
            ? "#ff5656"
            : maintainPERCENT_LPG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdPERCENT_LPG || maintainPERCENT_LPG)
            ? 600
            : "",
            fontSize: (exceedThresholdPERCENT_LPG || maintainPERCENT_LPG)
            ? 18
            : ""
        },


        CSSPERCENT_AIR : {
            color:exceedThresholdPERCENT_AIR && !maintainPERCENT_AIR
            ? "#ff5656"
            : maintainPERCENT_AIR
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdPERCENT_AIR || maintainPERCENT_AIR)
            ? 600
            : "",
            fontSize: (exceedThresholdPERCENT_AIR || maintainPERCENT_AIR)
            ? 18
            : ""
        },


        CSSHV_3001 : {
            color:exceedThresholdHV_3001 && !maintainHV_3001
            ? "#ff5656"
            : maintainHV_3001
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdHV_3001 || maintainHV_3001)
            ? 600
            : "",
            fontSize: (exceedThresholdHV_3001 || maintainHV_3001)
            ? 18
            : ""
        },
        CSSRATIO_MODE : {
            color:exceedThresholdRATIO_MODE && !maintainRATIO_MODE
            ? "#ff5656"
            : maintainRATIO_MODE
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdRATIO_MODE || maintainRATIO_MODE)
            ? 600
            : "",
            fontSize: (exceedThresholdRATIO_MODE || maintainRATIO_MODE)
            ? 18
            : ""
        },


        CSSTOTAL_CNG : {
            color:exceedThresholdTOTAL_CNG && !maintainTOTAL_CNG
            ? "#ff5656"
            : maintainTOTAL_CNG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTOTAL_CNG || maintainTOTAL_CNG)
            ? 600
            : "",
            fontSize: (exceedThresholdTOTAL_CNG || maintainTOTAL_CNG)
            ? 18
            : ""
        },



        CSSFCV_MODE : {
            color:exceedThresholdFCV_MODE && !maintainFCV_MODE
            ? "#ff5656"
            : maintainFCV_MODE
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdFCV_MODE || maintainFCV_MODE)
            ? 600
            : "",
            fontSize: (exceedThresholdFCV_MODE || maintainFCV_MODE)
            ? 18
            : ""
        },
   

     

        CSSTM3002_CNG : {
            color:exceedThresholdTM3002_CNG && !maintainTM3002_CNG
            ? "#ff5656"
            : maintainTM3002_CNG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTM3002_CNG || maintainTM3002_CNG)
            ? 600
            : "",
            fontSize: (exceedThresholdTM3002_CNG || maintainTM3002_CNG)
            ? 18
            : ""
        },

        CSSTM3003_CNG : {
            color:exceedThresholdTM3003_CNG && !maintainTM3003_CNG
            ? "#ff5656"
            : maintainTM3003_CNG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTM3003_CNG || maintainTM3003_CNG)
            ? 600
            : "",
            fontSize: (exceedThresholdTM3003_CNG || maintainTM3003_CNG)
            ? 18
            : ""
        },


        CSSWB_Setpoint : {
            color:exceedThresholdWB_Setpoint && !maintainWB_Setpoint
            ? "#ff5656"
            : maintainWB_Setpoint
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdWB_Setpoint || maintainWB_Setpoint)
            ? 600
            : "",
            fontSize: (exceedThresholdWB_Setpoint || maintainWB_Setpoint)
            ? 18
            : ""
        },

        CSSCVS_Calorimeter : {
            color:exceedThresholdCVS_Calorimeter && !maintainCVS_Calorimeter
            ? "#ff5656"
            : maintainCVS_Calorimeter
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdCVS_Calorimeter || maintainCVS_Calorimeter)
            ? 600
            : "",
            fontSize: (exceedThresholdCVS_Calorimeter || maintainCVS_Calorimeter)
            ? 18
            : ""
        },

  
        CSSWIS_Calorimeter : {
            color:exceedThresholdWIS_Calorimeter && !maintainWIS_Calorimeter
            ? "#ff5656"
            : maintainWIS_Calorimeter
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdWIS_Calorimeter || maintainWIS_Calorimeter)
            ? 600
            : "",
            fontSize: (exceedThresholdWIS_Calorimeter || maintainWIS_Calorimeter)
            ? 18
            : ""
        },

        CSSSG_Calorimeter : {
            color:exceedThresholdSG_Calorimeter && !maintainSG_Calorimeter
            ? "#ff5656"
            : maintainSG_Calorimeter
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdSG_Calorimeter || maintainSG_Calorimeter)
            ? 600
            : "",
            fontSize: (exceedThresholdSG_Calorimeter || maintainSG_Calorimeter)
            ? 18
            : ""
        },


        CSSPLC_Conn_STT : {
            color:exceedThresholdPLC_Conn_STT && !maintainPLC_Conn_STT
            ? "#ff5656"
            : maintainPLC_Conn_STT
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdPLC_Conn_STT || maintainPLC_Conn_STT)
            ? 600
            : "",
            fontSize: (exceedThresholdPLC_Conn_STT || maintainPLC_Conn_STT)
            ? 18
            : ""
        },

        CSSTD_4072_Conn_STT : {
            color:exceedThresholdTD_4072_Conn_STT && !maintainTD_4072_Conn_STT
            ? "#ff5656"
            : maintainTD_4072_Conn_STT
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTD_4072_Conn_STT || maintainTD_4072_Conn_STT)
            ? 600
            : "",
            fontSize: (exceedThresholdTD_4072_Conn_STT || maintainTD_4072_Conn_STT)
            ? 18
            : ""
        },
        
          };




    const dataPLC = [
        {
            name: <span>{tagNamePLC.PT_3005}</span>,
            PLC: <span style={combineCss.CSSPT_3005}>{} {PT_3005} {DataPT_3005}</span>,
        },

        {
            name: <span>{tagNamePLC.PT_3006}</span>,
            PLC: <span style={combineCss.CSSPT_3006}> {PT_3006} {DataPT_3006}</span>,
        },
     
        {
            name: <span>{tagNamePLC.TT_3004}</span>,
            PLC: <span style={combineCss.CSSTT_3004}>{TT_3004} {DataTT_3004}</span>,
        },
        {
            name: <span>{tagNamePLC.TT_3003}</span>,
            PLC: <span style={combineCss.CSSTT_3003}> {TT_3003} {DataTT_3003}</span>,
        },
   
        {
            name: <span>{tagNamePLC.TG_3005}</span>,
            PLC: <span style={combineCss.CSSTG_3005}> {TG_3005} {DataTG_3005}</span>,
        },
      
        {
            name: <span>{tagNamePLC.WB_3001}</span>,
            PLC: <span style={combineCss.CSSWB_3001}>{WB_3001} {DataWB_3001}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_3002}</span>,
            PLC: <span style={combineCss.CSSGD_3002}> {GD_3002} {DataGD_3002}</span>,
        },
           
        {
            name: <span>{tagNamePLC.GD_3003}</span>,
            PLC: <span style={combineCss.CSSGD_3003}>{GD_3003} {DataGD_3003}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_3004}</span>,
            PLC: <span style={combineCss.CSSGD_3004}> {GD_3004} {DataGD_3004}</span>,
        },
      
      
        {
            name: <span>{tagNamePLC.GD_3005}</span>,
            PLC: <span style={combineCss.CSSGD_3005}>{GD_3005} </span>,
        },
        {
            name: <span>{tagNamePLC.GD_3006}</span>,
            PLC: <span style={combineCss.CSSGD_3006}> {GD_3006} </span>,
        },


        {
            name: <span>{tagNamePLC.TM_3002_SNG}</span>,
            PLC: <span style={combineCss.CSSTM_3002_SNG}>{TM_3002_SNG} </span>,
        },
     
        {
            name: <span>{tagNamePLC.TM_3003_SNG}</span>,
            PLC: <span style={combineCss.CSSTM_3003_SNG}>{TM_3003_SNG}</span>,
        },
        {
            name: <span>{tagNamePLC.TOTAL_SNG}</span>,
            PLC: <span style={combineCss.CSSTOTAL_SNG}>{TOTAL_SNG}  </span>,
        },
        {
            name: <span>{tagNamePLC.SDV_3004}</span>,
            PLC: <span style={combineCss.CSSSDV_3004}> {SDV_3004}  {DataSDV_3004}</span>,
        },

        {
            name: <span>{tagNamePLC.SDV_3003}</span>,
            PLC: <span style={combineCss.CSSSDV_3003}>{SDV_3003} {DataSDV_3003}</span>,
        },

//===

        {
            name: <span>{tagNamePLC.GD1_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD1_STATUS}>{GD1_STATUS}  {DataGD1_STATUS}</span>,
        },
     
        {
            name: <span>{tagNamePLC.GD2_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD2_STATUS}>{GD2_STATUS}  {DataGD2_STATUS}</span>,
        },
      


        {
            name: <span>{tagNamePLC.GD3_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD3_STATUS}>{GD3_STATUS}  {DataGD3_STATUS}</span>,
        },
        {
            name: <span>{tagNamePLC.GD4_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD4_STATUS}> {GD4_STATUS}  {DataGD4_STATUS}</span>,
        },
     
 

        {
            name: <span>{tagNamePLC.GD5_STATUS}</span>,
            PLC: <span style={combineCss.CSSGD5_STATUS}> {GD5_STATUS} {DataGD5_STATUS}</span>,
        },
        
        {
            name: <span>{tagNamePLC.SD}</span>,
            PLC: <span style={combineCss.CSSSD}> {SD} {DataSD}</span>,
        },
   
        {
            name: <span>{tagNamePLC.HR_BC}</span>,
            PLC: <span style={combineCss.CSSHR_BC}> {HR_BC} {DataHR_BC}</span>,
        },
        {
            name: <span>{tagNamePLC.ESD}</span>,
            PLC: <span style={combineCss.CSSESD}>{} {ESD} {DataESD}</span>,
        },
        {
            name: <span>{tagNamePLC.VAPORIZER_1}</span>,
            PLC: <span style={combineCss.CSSVAPORIZER_1}>{VAPORIZER_1} {DataVAPORIZER_1}</span>,
        },
        {
            name: <span>{tagNamePLC.VAPORIZER_2}</span>,
            PLC: <span style={combineCss.CSSVAPORIZER_2}>{VAPORIZER_2} {DataVAPORIZER_2}</span>,
        },
   
        {
            name: <span>{tagNamePLC.VAPORIZER_3}</span>,
            PLC: <span style={combineCss.CSSVAPORIZER_3}> {VAPORIZER_3} {DataVAPORIZER_3}</span>,
        },
     
        {
            name: <span>{tagNamePLC.VAPORIZER_4}</span>,
            PLC: <span style={combineCss.CSSVAPORIZER_4}> {VAPORIZER_4} {DataVAPORIZER_4}</span>,
        },
        {
            name: <span>{tagNamePLC.COOLING_V}</span>,
            PLC: <span style={combineCss.CSSCOOLING_V}>{COOLING_V} {DataCOOLING_V}</span>,
        },
        {
            name: <span>{tagNamePLC.FCV_3001}</span>,
            PLC: <span style={combineCss.CSSFCV_3001}> {FCV_3001} </span>,
        },
     
     

     
        {
            name: <span>{tagNamePLC.PERCENT_LPG}</span>,
            PLC: <span style={combineCss.CSSPERCENT_LPG}>{} {PERCENT_LPG} </span>,
        },
        {
            name: <span>{tagNamePLC.PERCENT_AIR}</span>,
            PLC: <span style={combineCss.CSSPERCENT_AIR}> {PERCENT_AIR} </span>,
        },
        {
            name: <span>{tagNamePLC.HV_3001}</span>,
            PLC: <span style={combineCss.CSSHV_3001}> {HV_3001} </span>,
        },
   
        {
            name: <span>{tagNamePLC.TOTAL_CNG}</span>,
            PLC: <span style={combineCss.CSSTOTAL_CNG}> {TOTAL_CNG} </span>,
        },
        {
            name: <span>{tagNamePLC.RATIO_MODE}</span>,
            PLC: <span style={combineCss.CSSFCV_MODE}>{FCV_MODE} {DataFCV_MODE}</span>,
        },
        {
            name: <span>{tagNamePLC.FCV_MODE}</span>,
            PLC: <span style={combineCss.CSSRATIO_MODE}>{RATIO_MODE} {DataRATIO_MODE}</span>,
        },
      
        {
            name: <span>{tagNamePLC.TM3002_CNG}</span>,
            PLC: <span style={combineCss.CSSTM3002_CNG}> {TM3002_CNG} </span>,
        },

        {
            name: <span>{tagNamePLC.TM3003_CNG}</span>,
            PLC: <span style={combineCss.CSSTM3003_CNG}>{TM3003_CNG} </span>,
        },
        {
            name: <span>{tagNamePLC.WB_Setpoint}</span>,
            PLC: <span style={combineCss.CSSWB_Setpoint}> {WB_Setpoint}</span>,
        },
    
     
       





    ];

    const TD_CON_STT = [
        {
            name: <span>{tagNamePLC.WIS_Calorimeter}</span>,
            PLC: <span style={combineCss.CSSWIS_Calorimeter}> {WIS_Calorimeter} </span>,
        },
        
        {
            name: <span>{tagNamePLC.CVS_Calorimeter}</span>,
            PLC: <span style={combineCss.CSSCVS_Calorimeter}>{CVS_Calorimeter} </span>,
        },

        {
            name: <span>{tagNamePLC.SG_Calorimeter}</span>,
            PLC: <span style={combineCss.CSSSG_Calorimeter}> {SG_Calorimeter}</span>,
        },

     

      

    ]

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
                            SNG HUNG YEN
                        </div>

                        
                       
                    </div>
            
                    <div
                        style={{
                            alignItems: "center",
                            padding: "0px 5px 5px 5px",

                        }}
                    >
                        <div style={{  fontWeight: 500 , display:'flex', justifyContent:'flex-end'}}>
                           <p style={{fontWeight:700}}>PLC</p> : {Conn_STTValue}

                        </div>
                        <div style={{  fontWeight: 500 , display:'flex',justifyContent:'flex-end'}}>
                           <p style={{fontWeight:700}}>Calorimeter</p> : {FC_Conn_STTValue}

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
                    <DataTable value={TD_CON_STT} size="small" selectionMode="single">
                        <Column  field="name" header={<span className="id556" > Calorimeter Parameter</span>}></Column>
                        <Column
                        style={{display:'flex', justifyContent:'flex-end'}}

                            field="PLC"
                            header={TD_4072_Conn_STT === "1" ? (
                                <div style={{ border:`2px solid #31D454`, padding:5,borderRadius:15, display:'flex', textAlign:'center', alignItems:'center', justifyContent:'center', }}>
                                {DotGreen} <p style={{marginLeft:5}}>Calorimeter Value</p>
                               </div>
                                
                            ) : (
                                <div style={{ border:`2px solid red` , padding:5, borderRadius:15,display:'flex', textAlign:'center', alignItems:'center',justifyContent:'center',  }}>
                                {DotRed}  <p style={{marginLeft:5}}>Calorimeter Value</p>
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
