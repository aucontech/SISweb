import React, { useEffect, useRef, useState } from "react";
import { id_SNG_BinhDuong, id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";
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
export default function ScoreCard_SNG_BINHDUONG() {
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
                    entityId: id_SNG_BinhDuong,
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
                  



                        PT_2004: setPT_2004,
                        PT_2005: setPT_2005,
                        TT_2003: setTT_2003,
                        TT_2004: setTT_2004,
                        WB_1001: setWB_1001,
                        TG_2005: setTG_2005,

                        GD_2002: setGD_2002,
                        GD_2003: setGD_2003,
                        GD_2004: setGD_2004,

                        GD_2005: setGD_2005,
                        GD_2006: setGD_2006,


                        TM_2002_SNG: setTM_2002_SNG,
                    
                        TM_2003_SNG: setTM_2003_SNG,


                        TOTAL_SNG: setTOTAL_SNG,
                        SDV_2004: setSDV_2004,




                        SDV_2003: setSDV_2003,
                        Flow_Meter_Total: setFlow_Meter_Total,
                        
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
                        FCV_2001: setFCV_2001,




                        PERCENT_LPG: setPERCENT_LPG,
                        PERCENT_AIR: setPERCENT_AIR,
                        HV_1001: setHV_1001,
                        RATIO_MODE: setRATIO_MODE,
                        FCV_MODE: setFCV_MODE,
                        TOTAL_CNG: setTOTAL_CNG,

                        TM2002_CNG: setTM2002_CNG,
                        TM2003_CNG: setTM2003_CNG,
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
                `/plugins/telemetry/DEVICE/${id_SNG_BinhDuong}/values/attributes/SERVER_SCOPE`
            );



    
          

            const PT_2004_High = res.data.find((item: any) => item.key === "PT_2004_High");
            setPT_2004_High(PT_2004_High?.value || null);
            const PT_2004_Low = res.data.find((item: any) => item.key === "PT_2004_Low");
            setPT_2004_Low(PT_2004_Low?.value || null);
            const PT_2004_Maintain = res.data.find(
                (item: any) => item.key === "PT_2004_Maintain"
            );


            const PT_2005_High = res.data.find((item: any) => item.key === "PT_2005_High");
            setPT_2005_High(PT_2005_High?.value || null);
            const PT_2005_Low = res.data.find((item: any) => item.key === "PT_2005_Low");
            setPT_2005_Low(PT_2005_Low?.value || null);
            const PT_2005_Maintain = res.data.find(
                (item: any) => item.key === "PT_2005_Maintain"
            );

            const TT_2003_High = res.data.find((item: any) => item.key === "TT_2003_High");
            setTT_2003_High(TT_2003_High?.value || null);
            const TT_2003_Low = res.data.find((item: any) => item.key === "TT_2003_Low");
            setTT_2003_Low(TT_2003_Low?.value || null);
            const TT_2003_Maintain = res.data.find(
                (item: any) => item.key === "TT_2003_Maintain"
            );

            const TT_2004_High = res.data.find((item: any) => item.key === "TT_2004_High");
            setTT_2004_High(TT_2004_High?.value || null);
            const TT_2004_Low = res.data.find((item: any) => item.key === "TT_2004_Low");
            setTT_2004_Low(TT_2004_Low?.value || null);
            const TT_2004_Maintain = res.data.find(
                (item: any) => item.key === "TT_2004_Maintain"
            );


            const WB_1001_High = res.data.find((item: any) => item.key === "WB_1001_High");
            setWB_1001_High(WB_1001_High?.value || null);
            const WB_1001_Low = res.data.find((item: any) => item.key === "WB_1001_Low");
            setWB_1001_Low(WB_1001_Low?.value || null);
            const WB_1001_Maintain = res.data.find(
                (item: any) => item.key === "WB_1001_Maintain"
            );



            const GD5_STATUS_High = res.data.find((item: any) => item.key === "GD5_STATUS_High");
            setGD5_STATUS_High(GD5_STATUS_High?.value || null);
            const GD5_STATUS_Low = res.data.find((item: any) => item.key === "GD5_STATUS_Low");
            setGD5_STATUS_Low(GD5_STATUS_Low?.value || null);
            const GD5_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD5_STATUS_Maintain"
            );

            const GD_2002_High = res.data.find((item: any) => item.key === "GD_2002_High");
            setGD_2002_High(GD_2002_High?.value || null);
            const GD_2002_Low = res.data.find((item: any) => item.key === "GD_2002_Low");
            setGD_2002_Low(GD_2002_Low?.value || null);
            const GD_2002_Maintain = res.data.find(
                (item: any) => item.key === "GD_2002_Maintain"
            );

            const GD_2003_High = res.data.find((item: any) => item.key === "GD_2003_High");
            setGD_2003_High(GD_2003_High?.value || null);
            const GD_2003_Low = res.data.find((item: any) => item.key === "GD_2003_Low");
            setGD_2003_Low(GD_2003_Low?.value || null);
            const GD_2003_Maintain = res.data.find(
                (item: any) => item.key === "GD_2003_Maintain"
            );

            const GD_2005_High = res.data.find((item: any) => item.key === "GD_2005_High");
            setGD_2005_High(GD_2005_High?.value || null);
            const GD_2005_Low = res.data.find((item: any) => item.key === "GD_2005_Low");
            setGD_2005_Low(GD_2005_Low?.value || null);
            const GD_2005_Maintain = res.data.find(
                (item: any) => item.key === "GD_2005_Maintain"
            );

            const TM_2002_SNG_High = res.data.find((item: any) => item.key === "TM_2002_SNG_High");
            setTM_2002_SNG_High(TM_2002_SNG_High?.value || null);
            const TM_2002_SNG_Low = res.data.find((item: any) => item.key === "TM_2002_SNG_Low");
            setTM_2002_SNG_Low(TM_2002_SNG_Low?.value || null);
            const TM_2002_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2002_SNG_Maintain"
            );


            const TG_2005_High = res.data.find((item: any) => item.key === "TG_2005_High");
            setTG_2005_High(TG_2005_High?.value || null);
            const TG_2005_Low = res.data.find((item: any) => item.key === "TG_2005_Low");
            setTG_2005_Low(TG_2005_Low?.value || null);
            const TG_2005_Maintain = res.data.find(
                (item: any) => item.key === "TG_2005_Maintain"
            );

            const GD_2006_High = res.data.find((item: any) => item.key === "GD_2006_High");
            setGD_2006_High(GD_2006_High?.value || null);
            const GD_2006_Low = res.data.find((item: any) => item.key === "GD_2006_Low");
            setGD_2006_Low(GD_2006_Low?.value || null);
            const GD_2006_Maintain = res.data.find(
                (item: any) => item.key === "GD_2006_Maintain"
            );

            const GD_2004_High = res.data.find((item: any) => item.key === "GD_2004_High");
            setGD_2004_High(GD_2004_High?.value || null);
            const GD_2004_Low = res.data.find((item: any) => item.key === "GD_2004_Low");
            setGD_2004_Low(GD_2004_Low?.value || null);
            const GD_2004_Maintain = res.data.find(
                (item: any) => item.key === "GD_2004_Maintain"
            );

            const TOTAL_SNG_High = res.data.find((item: any) => item.key === "TOTAL_SNG_High");
            setTOTAL_SNG_High(TOTAL_SNG_High?.value || null);
            const TOTAL_SNG_Low = res.data.find((item: any) => item.key === "TOTAL_SNG_Low");
            setTOTAL_SNG_Low(TOTAL_SNG_Low?.value || null);
            const TOTAL_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TOTAL_SNG_Maintain"
            );
            const SDV_2004_High = res.data.find((item: any) => item.key === "SDV_2004_High");
            setSDV_2004_High(SDV_2004_High?.value || null);
            const SDV_2004_Low = res.data.find((item: any) => item.key === "SDV_2004_Low");
            setSDV_2004_Low(SDV_2004_Low?.value || null);
            const SDV_2004_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2004_Maintain"
            );

            const GD2_STATUS_High = res.data.find((item: any) => item.key === "GD2_STATUS_High");
            setGD2_STATUS_High(GD2_STATUS_High?.value || null);
            const GD2_STATUS_Low = res.data.find((item: any) => item.key === "GD2_STATUS_Low");
            setGD2_STATUS_Low(GD2_STATUS_Low?.value || null);
            const GD2_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD2_STATUS_Maintain"
            );
            const TM_2003_SNG_High = res.data.find((item: any) => item.key === "TM_2003_SNG_High");
            setTM_2003_SNG_High(TM_2003_SNG_High?.value || null);
            const TM_2003_SNG_Low = res.data.find((item: any) => item.key === "TM_2003_SNG_Low");
            setTM_2003_SNG_Low(TM_2003_SNG_Low?.value || null);
            const TM_2003_SNG_Maintain = res.data.find(
                (item: any) => item.key === "TM_2003_SNG_Maintain"
            );

            const GD1_STATUS_High = res.data.find((item: any) => item.key === "GD1_STATUS_High");
            setGD1_STATUS_High(GD1_STATUS_High?.value || null);
            const GD1_STATUS_Low = res.data.find((item: any) => item.key === "GD1_STATUS_Low");
            setGD1_STATUS_Low(GD1_STATUS_Low?.value || null);
            const GD1_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD1_STATUS_Maintain"
            );

            const SDV_2003_High = res.data.find((item: any) => item.key === "SDV_2003_High");
            setSDV_2003_High(SDV_2003_High?.value || null);
            const SDV_2003_Low = res.data.find((item: any) => item.key === "SDV_2003_Low");
            setSDV_2003_Low(SDV_2003_Low?.value || null);
            const SDV_2003_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2003_Maintain"
            );

            const Flow_Meter_Total_High = res.data.find((item: any) => item.key === "Flow_Meter_Total_High");
            setFlow_Meter_Total_High(Flow_Meter_Total_High?.value || null);
            const Flow_Meter_Total_Low = res.data.find((item: any) => item.key === "Flow_Meter_Total_Low");
            setFlow_Meter_Total_Low(Flow_Meter_Total_Low?.value || null);
            const Flow_Meter_Total_Maintain = res.data.find(
                (item: any) => item.key === "SDV_2003_Maintain"
            );


            const GD4_STATUS_High = res.data.find((item: any) => item.key === "GD4_STATUS_High");
            setGD4_STATUS_High(GD4_STATUS_High?.value || null);
            const GD4_STATUS_Low = res.data.find((item: any) => item.key === "GD4_STATUS_Low");
            setGD4_STATUS_Low(GD4_STATUS_Low?.value || null);
            const GD4_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD4_STATUS_Maintain"
            );

            const GD3_STATUS_High = res.data.find((item: any) => item.key === "GD3_STATUS_High");
            setGD3_STATUS_High(GD3_STATUS_High?.value || null);
            const GD3_STATUS_Low = res.data.find((item: any) => item.key === "GD3_STATUS_Low");
            setGD3_STATUS_Low(GD3_STATUS_Low?.value || null);
            const GD3_STATUS_Maintain = res.data.find(
                (item: any) => item.key === "GD3_STATUS_Maintain"
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

            const FCV_2001_High = res.data.find((item: any) => item.key === "FCV_2001_High");
            setFCV_2001_High(FCV_2001_High?.value || null);
            const FCV_2001_Low = res.data.find((item: any) => item.key === "FCV_2001_Low");
            setFCV_2001_Low(FCV_2001_Low?.value || null);
            const FCV_2001_Maintain = res.data.find(
                (item: any) => item.key === "FCV_2001_Maintain"
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

            const HV_1001_High = res.data.find((item: any) => item.key === "HV_1001_High");
            setHV_1001_High(HV_1001_High?.value || null);
            const HV_1001_Low = res.data.find((item: any) => item.key === "HV_1001_Low");
            setHV_1001_Low(HV_1001_Low?.value || null);
            const HV_1001_Maintain = res.data.find(
                (item: any) => item.key === "HV_1001_Maintain"
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



            
            const TM2002_CNG_High = res.data.find((item: any) => item.key === "TM2002_CNG_High");
            setTM2002_CNG_High(TM2002_CNG_High?.value || null);
            const TM2002_CNG_Low = res.data.find((item: any) => item.key === "TM2002_CNG_Low");
            setTM2002_CNG_Low(TM2002_CNG_Low?.value || null);
            const TM2002_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM2002_CNG_Maintain"
            );
            const WB_Setpoint_High = res.data.find((item: any) => item.key === "WB_Setpoint_High");
            setWB_Setpoint_High(WB_Setpoint_High?.value || null);
            const WB_Setpoint_Low = res.data.find((item: any) => item.key === "WB_Setpoint_Low");
            setWB_Setpoint_Low(WB_Setpoint_Low?.value || null);
            const WB_Setpoint_Maintain = res.data.find(
                (item: any) => item.key === "WB_Setpoint_Maintain"
            );
            const TM2003_CNG_High = res.data.find((item: any) => item.key === "TM2003_CNG_High");
            setTM2003_CNG_High(TM2003_CNG_High?.value || null);
            const TM2003_CNG_Low = res.data.find((item: any) => item.key === "TM2003_CNG_Low");
            setTM2003_CNG_Low(TM2003_CNG_Low?.value || null);
            const TM2003_CNG_Maintain = res.data.find(
                (item: any) => item.key === "TM2003_CNG_Maintain"
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


 setMaintainFCV_2001(FCV_2001_Maintain?.value || false);



 setMaintainPERCENT_LPG(PERCENT_LPG_Maintain?.value || false);


 setMaintainPERCENT_AIR(PERCENT_AIR_Maintain?.value || false);


 setMaintainHV_1001(HV_1001_Maintain?.value || false);


 setMaintainRATIO_MODE(RATIO_MODE_Maintain?.value || false);

 setMaintainFCV_MODE(FCV_MODE_Maintain?.value || false);
 setMaintainTOTAL_CNG(TOTAL_CNG_Maintain?.value || false);

 setMaintainTM2002_CNG(TM2002_CNG_Maintain?.value || false);

 setMaintainWB_Setpoint(WB_Setpoint_Maintain?.value || false);

 setMaintainTM2003_CNG(TM2003_CNG_Maintain?.value || false);
 setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);



 setMaintainWIS_Calorimeter(WIS_Calorimeter_Maintain?.value || false);

 
           

            setMaintainPT_2004(PT_2004_Maintain?.value || false);


            setMaintainPT_2005(PT_2005_Maintain?.value || false);


            setMaintainTT_2003(TT_2003_Maintain?.value || false);


            setMaintainTT_2004(TT_2004_Maintain?.value || false);


            setMaintainGD_2004(GD_2004_Maintain?.value || false);

            setMaintainGD_2005(GD_2005_Maintain?.value || false);
            
            setMaintainGD_2006(GD_2006_Maintain?.value || false);
            
            setMaintainTG_2005(TG_2005_Maintain?.value || false);

            
            setMaintainTM_2002_SNG(TM_2002_SNG_Maintain?.value || false);
            setMaintainTM_2003_SNG(TM_2003_SNG_Maintain?.value || false);



            setMaintainCVS_Calorimeter(CVS_Calorimeter_Maintain?.value || false);


            setMaintainGD_2003(GD_2003_Maintain?.value || false);


            setMaintainGD_2002(GD_2002_Maintain?.value || false);


            setMaintainGD5_STATUS(GD5_STATUS_Maintain?.value || false);





            setMaintainWB_1001(WB_1001_Maintain?.value || false);

            setMaintainTOTAL_SNG(TOTAL_SNG_Maintain?.value || false);


            setMaintainSDV_2004(SDV_2004_Maintain?.value || false);


            setMaintainGD2_STATUS(GD2_STATUS_Maintain?.value || false);

            setMaintainGD1_STATUS(GD1_STATUS_Maintain?.value || false);

            setMaintainSDV_2003(SDV_2003_Maintain?.value || false);

            setMaintainFlow_Meter_Total(Flow_Meter_Total_Maintain?.value || false);


            setMaintainGD3_STATUS(GD3_STATUS_Maintain?.value || false);


            setMaintainGD4_STATUS(GD4_STATUS_Maintain?.value || false);

 setMaintainSG_Calorimeter(SG_Calorimeter_Maintain?.value || false);

           
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
// =================================================================================================================== 
         // =================================================================================================================== 
     
         const [FCV_2001, setFCV_2001] = useState<string | null>(null);
         const [FCV_2001_High, setFCV_2001_High] = useState<number | null>(null);
         const [FCV_2001_Low, setFCV_2001_Low] = useState<number | null>(null);
         const [exceedThresholdFCV_2001, setExceedThresholdFCV_2001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         
         const [maintainFCV_2001, setMaintainFCV_2001] = useState<boolean>(false);
         
         
         useEffect(() => {
             if (typeof FCV_2001_High === 'string' && typeof FCV_2001_Low === 'string' && FCV_2001 !== null && maintainFCV_2001 === false
             ) {
                 const highValue = parseFloat(FCV_2001_High);
                 const lowValue = parseFloat(FCV_2001_Low);
                 const FCV_2001Value = parseFloat(FCV_2001);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FCV_2001Value)) {
                     if (highValue <= FCV_2001Value || FCV_2001Value <= lowValue) {
                             setExceedThresholdFCV_2001(true);
                     } else {
                        setExceedThresholdFCV_2001(false);
                     }
                 } 
             } 
         }, [FCV_2001_High, FCV_2001, , FCV_2001_Low,maintainFCV_2001]);
         
    
     // =================================================================================================================== 

     const [VAPORIZER_4, setVAPORIZER_4] = useState<string | null>(null);
     const [VAPORIZER_4_High, setVAPORIZER_4_High] = useState<number | null>(null);
     const [VAPORIZER_4_Low, setVAPORIZER_4_Low] = useState<number | null>(null);
     const [exceedThresholdVAPORIZER_4, setExceedThresholdVAPORIZER_4] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainVAPORIZER_4, setMaintainVAPORIZER_4] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof VAPORIZER_4_High === 'string' && typeof VAPORIZER_4_Low === 'string' && VAPORIZER_4 !== null && maintainVAPORIZER_4 === false
             ) {
                 const highValue = parseFloat(VAPORIZER_4_High);
                 const lowValue = parseFloat(VAPORIZER_4_Low);
                 const VAPORIZER_4Value = parseFloat(VAPORIZER_4);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_4Value)) {
                     if (highValue <= VAPORIZER_4Value || VAPORIZER_4Value <= lowValue) {
                             setExceedThresholdVAPORIZER_4(true);
                     } else {
                        setExceedThresholdVAPORIZER_4(false);
                     }
                 } 
             } 
         }, [VAPORIZER_4_High, VAPORIZER_4, VAPORIZER_4_Low,maintainVAPORIZER_4]);
     
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [COOLING_V, setCOOLING_V] = useState<string | null>(null);

 const [COOLING_V_High, setCOOLING_V_High] = useState<number | null>(null);
 const [COOLING_V_Low, setCOOLING_V_Low] = useState<number | null>(null);
 const [exceedThresholdCOOLING_V, setExceedThresholdCOOLING_V] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainCOOLING_V, setMaintainCOOLING_V] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof COOLING_V_High === 'string' && typeof COOLING_V_Low === 'string' && COOLING_V !== null && maintainCOOLING_V === false
         ) {
             const highValue = parseFloat(COOLING_V_High);
             const lowValue = parseFloat(COOLING_V_Low);
             const COOLING_VValue = parseFloat(COOLING_V);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(COOLING_VValue)) {
                 if (highValue <= COOLING_VValue || COOLING_VValue <= lowValue) {
                         setExceedThresholdCOOLING_V(true);
                 } else {
                    setExceedThresholdCOOLING_V(false);
                 }
             } 
         } 
     }, [COOLING_V_High, COOLING_V, COOLING_V_Low,maintainCOOLING_V]);
 



 // =================================================================================================================== 


const [VAPORIZER_1, setVAPORIZER_1] = useState<string | null>(null);
const [VAPORIZER_1_High, setVAPORIZER_1_High] = useState<number | null>(null);
const [VAPORIZER_1_Low, setVAPORIZER_1_Low] = useState<number | null>(null);
const [exceedThresholdVAPORIZER_1, setExceedThresholdVAPORIZER_1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVAPORIZER_1, setMaintainVAPORIZER_1] = useState<boolean>(false);


    useEffect(() => {
        if (typeof VAPORIZER_1_High === 'string' && typeof VAPORIZER_1_Low === 'string' && VAPORIZER_1 !== null && maintainVAPORIZER_1 === false
        ) {
            const highValue = parseFloat(VAPORIZER_1_High);
            const lowValue = parseFloat(VAPORIZER_1_Low);
            const VAPORIZER_1Value = parseFloat(VAPORIZER_1);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_1Value)) {
                if (highValue <= VAPORIZER_1Value || VAPORIZER_1Value <= lowValue) {
                        setExceedThresholdVAPORIZER_1(true);
                } else {
                   setExceedThresholdVAPORIZER_1(false);
                }
            } 
        } 
    }, [VAPORIZER_1_High, VAPORIZER_1, VAPORIZER_1_Low,maintainVAPORIZER_1]);




// =================================================================================================================== 

const [VAPORIZER_2, setVAPORIZER_2] = useState<string | null>(null);
const [VAPORIZER_2_High, setVAPORIZER_2_High] = useState<number | null>(null);
const [VAPORIZER_2_Low, setVAPORIZER_2_Low] = useState<number | null>(null);
const [exceedThresholdVAPORIZER_2, setExceedThresholdVAPORIZER_2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainVAPORIZER_2, setMaintainVAPORIZER_2] = useState<boolean>(false);


    useEffect(() => {
        if (typeof VAPORIZER_2_High === 'string' && typeof VAPORIZER_2_Low === 'string' && VAPORIZER_2 !== null && maintainVAPORIZER_2 === false
        ) {
            const highValue = parseFloat(VAPORIZER_2_High);
            const lowValue = parseFloat(VAPORIZER_2_Low);
            const VAPORIZER_2Value = parseFloat(VAPORIZER_2);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_2Value)) {
                if (highValue <= VAPORIZER_2Value || VAPORIZER_2Value <= lowValue) {
                        setExceedThresholdVAPORIZER_2(true);
                } else {
                   setExceedThresholdVAPORIZER_2(false);
                }
            } 
        } 
    }, [VAPORIZER_2_High, VAPORIZER_2, VAPORIZER_2_Low,maintainVAPORIZER_2]);



// =================================================================================================================== 


     // =================================================================================================================== 

     const [VAPORIZER_3, setVAPORIZER_3] = useState<string | null>(null);
    
     const [VAPORIZER_3_High, setVAPORIZER_3_High] = useState<number | null>(null);
     const [VAPORIZER_3_Low, setVAPORIZER_3_Low] = useState<number | null>(null);
     const [exceedThresholdVAPORIZER_3, setExceedThresholdVAPORIZER_3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainVAPORIZER_3, setMaintainVAPORIZER_3] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof VAPORIZER_3_High === 'string' && typeof VAPORIZER_3_Low === 'string' && VAPORIZER_3 !== null && maintainVAPORIZER_3 === false
             ) {
                 const highValue = parseFloat(VAPORIZER_3_High);
                 const lowValue = parseFloat(VAPORIZER_3_Low);
                 const VAPORIZER_3Value = parseFloat(VAPORIZER_3);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(VAPORIZER_3Value)) {
                     if (highValue <= VAPORIZER_3Value || VAPORIZER_3Value <= lowValue) {
                             setExceedThresholdVAPORIZER_3(true);
                     } else {
                        setExceedThresholdVAPORIZER_3(false);
                     }
                 } 
             } 
         }, [VAPORIZER_3_High, VAPORIZER_3, VAPORIZER_3_Low,maintainVAPORIZER_3]);
     
   // =================================================================================================================== 
 
 
   const [ESD, setESD] = useState<string | null>(null);
   const [ESD_High, setESD_High] = useState<number | null>(null);
   const [ESD_Low, setESD_Low] = useState<number | null>(null);
   const [exceedThresholdESD, setExceedThresholdESD] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
   const [maintainESD, setMaintainESD] = useState<boolean>(false);
   
   
       useEffect(() => {
           if (typeof ESD_High === 'string' && typeof ESD_Low === 'string' && ESD !== null && maintainESD === false
           ) {
               const highValue = parseFloat(ESD_High);
               const lowValue = parseFloat(ESD_Low);
               const ESDValue = parseFloat(ESD);
       
               if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(ESDValue)) {
                   if (highValue <= ESDValue || ESDValue <= lowValue) {
                           setExceedThresholdESD(true);
                   } else {
                      setExceedThresholdESD(false);
                   }
               } 
           } 
       }, [ESD_High, ESD, ESD_Low,maintainESD]);
 
 
   // =================================================================================================================== 
 
 
 
        const [HR_BC, setHR_BC] = useState<string | null>(null);
        const [HR_BC_High, setHR_BC_High] = useState<number | null>(null);
        const [HR_BC_Low, setHR_BC_Low] = useState<number | null>(null);
        const [exceedThresholdHR_BC, setExceedThresholdHR_BC] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        const [maintainHR_BC, setMaintainHR_BC] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof HR_BC_High === 'string' && typeof HR_BC_Low === 'string' && HR_BC !== null && maintainHR_BC === false
                ) {
                    const highValue = parseFloat(HR_BC_High);
                    const lowValue = parseFloat(HR_BC_Low);
                    const HR_BCValue = parseFloat(HR_BC);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HR_BCValue)) {
                        if (highValue <= HR_BCValue || HR_BCValue <= lowValue) {
                                setExceedThresholdHR_BC(true);
                        } else {
                           setExceedThresholdHR_BC(false);
                        }
                    } 
                } 
            }, [HR_BC_High, HR_BC, HR_BC_Low,maintainHR_BC]);
        
 
   
        // =================================================================================================================== 
 
 
        const [SD, setSD] = useState<string | null>(null);
 
        const [SD_High, setSD_High] = useState<number | null>(null);
        const [SD_Low, setSD_Low] = useState<number | null>(null);
        const [exceedThresholdSD, setExceedThresholdSD] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainSD, setMaintainSD] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof SD_High === 'string' && typeof SD_Low === 'string' && SD !== null && maintainSD === false
                ) {
                    const highValue = parseFloat(SD_High);
                    const lowValue = parseFloat(SD_Low);
                    const SDValue = parseFloat(SD);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDValue)) {
                        if (highValue <= SDValue || SDValue <= lowValue) {
                                setExceedThresholdSD(true);
                        } else {
                           setExceedThresholdSD(false);
                        }
                    } 
                } 
            }, [SD_High, SD , SD_Low,maintainSD]);
        

  // =================================================================================================================== 
 
 
  const [PT_2004, setPT_2004] = useState<string | null>(null);
  const [PT_2004_High, setPT_2004_High] = useState<number | null>(null);
  const [PT_2004_Low, setPT_2004_Low] = useState<number | null>(null);
  const [exceedThresholdPT_2004, setExceedThresholdPT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
  const [maintainPT_2004, setMaintainPT_2004] = useState<boolean>(false);
  
  
      useEffect(() => {
          if (typeof PT_2004_High === 'string' && typeof PT_2004_Low === 'string' && PT_2004 !== null && maintainPT_2004 === false
          ) {
              const highValue = parseFloat(PT_2004_High);
              const lowValue = parseFloat(PT_2004_Low);
              const PT_2004Value = parseFloat(PT_2004);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2004Value)) {
                  if (highValue <= PT_2004Value || PT_2004Value <= lowValue) {
                          setExceedThresholdPT_2004(true);
                  } else {
                     setExceedThresholdPT_2004(false);
                  }
              } 
          } 
      }, [PT_2004_High, PT_2004, PT_2004_Low,maintainPT_2004]);


  // =================================================================================================================== 



       const [PT_2005, setPT_2005] = useState<string | null>(null);
       const [PT_2005_High, setPT_2005_High] = useState<number | null>(null);
       const [PT_2005_Low, setPT_2005_Low] = useState<number | null>(null);
       const [exceedThresholdPT_2005, setExceedThresholdPT_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainPT_2005, setMaintainPT_2005] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof PT_2005_High === 'string' && typeof PT_2005_Low === 'string' && PT_2005 !== null && maintainPT_2005 === false
               ) {
                   const highValue = parseFloat(PT_2005_High);
                   const lowValue = parseFloat(PT_2005_Low);
                   const PT_2005Value = parseFloat(PT_2005);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PT_2005Value)) {
                       if (highValue <= PT_2005Value || PT_2005Value <= lowValue) {
                               setExceedThresholdPT_2005(true);
                       } else {
                          setExceedThresholdPT_2005(false);
                       }
                   } 
               } 
           }, [PT_2005_High, PT_2005, PT_2005_Low,maintainPT_2005]);
       

  
       // =================================================================================================================== 


       const [TT_2003, setTT_2003] = useState<string | null>(null);

       const [TT_2003_High, setTT_2003_High] = useState<number | null>(null);
       const [TT_2003_Low, setTT_2003_Low] = useState<number | null>(null);
       const [exceedThresholdTT_2003, setExceedThresholdTT_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       
       const [maintainTT_2003, setMaintainTT_2003] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof TT_2003_High === 'string' && typeof TT_2003_Low === 'string' && TT_2003 !== null && maintainTT_2003 === false
               ) {
                   const highValue = parseFloat(TT_2003_High);
                   const lowValue = parseFloat(TT_2003_Low);
                   const TT_2003Value = parseFloat(TT_2003);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2003Value)) {
                       if (highValue <= TT_2003Value || TT_2003Value <= lowValue) {
                               setExceedThresholdTT_2003(true);
                       } else {
                          setExceedThresholdTT_2003(false);
                       }
                   } 
               } 
           }, [TT_2003_High, TT_2003 , TT_2003_Low,maintainTT_2003]);
       

  
       // =================================================================================================================== 

       const [TT_2004, setTT_2004] = useState<string | null>(null);
       const [TT_2004_High, setTT_2004_High] = useState<number | null>(null);
       const [TT_2004_Low, setTT_2004_Low] = useState<number | null>(null);
       const [exceedThresholdTT_2004, setExceedThresholdTT_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainTT_2004, setMaintainTT_2004] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof TT_2004_High === 'string' && typeof TT_2004_Low === 'string' && TT_2004 !== null && maintainTT_2004 === false
               ) {
                   const highValue = parseFloat(TT_2004_High);
                   const lowValue = parseFloat(TT_2004_Low);
                   const TT_2004Value = parseFloat(TT_2004);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TT_2004Value)) {
                       if (highValue <= TT_2004Value || TT_2004Value <= lowValue) {
                               setExceedThresholdTT_2004(true);
                       } else {
                          setExceedThresholdTT_2004(false);
                       }
                   } 
               } 
           }, [TT_2004_High, TT_2004, TT_2004_Low,maintainTT_2004]);
       

  
  
       // =================================================================================================================== 

       const [WB_1001, setWB_1001] = useState<string | null>(null);
       const [WB_1001_High, setWB_1001_High] = useState<number | null>(null);
       const [WB_1001_Low, setWB_1001_Low] = useState<number | null>(null);
       const [exceedThresholdWB_1001, setExceedThresholdWB_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainWB_1001, setMaintainWB_1001] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof WB_1001_High === 'string' && typeof WB_1001_Low === 'string' && WB_1001 !== null && maintainWB_1001 === false
               ) {
                   const highValue = parseFloat(WB_1001_High);
                   const lowValue = parseFloat(WB_1001_Low);
                   const WB_1001Value = parseFloat(WB_1001);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WB_1001Value)) {
                       if (highValue <= WB_1001Value || WB_1001Value <= lowValue) {
                               setExceedThresholdWB_1001(true);
                       } else {
                          setExceedThresholdWB_1001(false);
                       }
                   } 
               } 
           }, [WB_1001_High, WB_1001, WB_1001_Low,maintainWB_1001]);
       
 
  
       // =================================================================================================================== 




 // =================================================================================================================== 

 const [GD5_STATUS, setGD5_STATUS] = useState<string | null>(null);
 const [GD5_STATUS_High, setGD5_STATUS_High] = useState<number | null>(null);
 const [GD5_STATUS_Low, setGD5_STATUS_Low] = useState<number | null>(null);
 const [exceedThresholdGD5_STATUS, setExceedThresholdGD5_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainGD5_STATUS, setMaintainGD5_STATUS] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof GD5_STATUS_High === 'string' && typeof GD5_STATUS_Low === 'string' && GD5_STATUS !== null && maintainGD5_STATUS === false
         ) {
             const highValue = parseFloat(GD5_STATUS_High);
             const lowValue = parseFloat(GD5_STATUS_Low);
             const GD5_STATUSValue = parseFloat(GD5_STATUS);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD5_STATUSValue)) {
                 if (highValue <= GD5_STATUSValue || GD5_STATUSValue <= lowValue) {
                         setExceedThresholdGD5_STATUS(true);
                 } else {
                    setExceedThresholdGD5_STATUS(false);
                 }
             } 
         } 
     }, [GD5_STATUS_High, GD5_STATUS, GD5_STATUS_Low,maintainGD5_STATUS]);
 


 // =================================================================================================================== 

     // =================================================================================================================== 

     const [GD_2002, setGD_2002] = useState<string | null>(null);
     const [GD_2002_High, setGD_2002_High] = useState<number | null>(null);
     const [GD_2002_Low, setGD_2002_Low] = useState<number | null>(null);
     const [exceedThresholdGD_2002, setExceedThresholdGD_2002] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainGD_2002, setMaintainGD_2002] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof GD_2002_High === 'string' && typeof GD_2002_Low === 'string' && GD_2002 !== null && maintainGD_2002 === false
             ) {
                 const highValue = parseFloat(GD_2002_High);
                 const lowValue = parseFloat(GD_2002_Low);
                 const GD_2002Value = parseFloat(GD_2002);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2002Value)) {
                     if (highValue <= GD_2002Value || GD_2002Value <= lowValue) {
                             setExceedThresholdGD_2002(true);
                     } else {
                        setExceedThresholdGD_2002(false);
                     }
                 } 
             } 
         }, [GD_2002_High, GD_2002, GD_2002_Low,maintainGD_2002]);
     
   
 
     // =================================================================================================================== 

         // =================================================================================================================== 

 const [GD_2003, setGD_2003] = useState<string | null>(null);

 const [GD_2003_High, setGD_2003_High] = useState<number | null>(null);
 const [GD_2003_Low, setGD_2003_Low] = useState<number | null>(null);
 const [exceedThresholdGD_2003, setExceedThresholdGD_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainGD_2003, setMaintainGD_2003] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof GD_2003_High === 'string' && typeof GD_2003_Low === 'string' && GD_2003 !== null && maintainGD_2003 === false
         ) {
             const highValue = parseFloat(GD_2003_High);
             const lowValue = parseFloat(GD_2003_Low);
             const GD_2003Value = parseFloat(GD_2003);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2003Value)) {
                 if (highValue <= GD_2003Value || GD_2003Value <= lowValue) {
                         setExceedThresholdGD_2003(true);
                 } else {
                    setExceedThresholdGD_2003(false);
                 }
             } 
         } 
     }, [GD_2003_High, GD_2003, GD_2003_Low,maintainGD_2003]);
 



 // =================================================================================================================== 


 



 // =================================================================================================================== 

const [TM_2002_SNG, setTM_2002_SNG] = useState<string | null>(null);

const [TM_2002_SNG_High, setTM_2002_SNG_High] = useState<number | null>(null);
const [TM_2002_SNG_Low, setTM_2002_SNG_Low] = useState<number | null>(null);
const [exceedThresholdTM_2002_SNG, setExceedThresholdTM_2002_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
const [maintainTM_2002_SNG, setMaintainTM_2002_SNG] = useState<boolean>(false);


useEffect(() => {
 if (typeof TM_2002_SNG_High === 'string' && typeof TM_2002_SNG_Low === 'string' && TM_2002_SNG !== null && maintainTM_2002_SNG === false
 ) {
     const highValue = parseFloat(TM_2002_SNG_High);
     const lowValue = parseFloat(TM_2002_SNG_Low);
     const TM_2002_SNGValue = parseFloat(TM_2002_SNG);

     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM_2002_SNGValue)) {
         if (highValue <= TM_2002_SNGValue || TM_2002_SNGValue <= lowValue) {
                 setExceedThresholdTM_2002_SNG(true);
         } else {
            setExceedThresholdTM_2002_SNG(false);
         }
     } 
 } 
}, [TM_2002_SNG_High, TM_2002_SNG, TM_2002_SNG_Low,maintainTM_2002_SNG]);




// =================================================================================================================== 


     // =================================================================================================================== 

     const [TG_2005, setTG_2005] = useState<string | null>(null);
    
     const [TG_2005_High, setTG_2005_High] = useState<number | null>(null);
     const [TG_2005_Low, setTG_2005_Low] = useState<number | null>(null);
     const [exceedThresholdTG_2005, setExceedThresholdTG_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTG_2005, setMaintainTG_2005] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TG_2005_High === 'string' && typeof TG_2005_Low === 'string' && TG_2005 !== null && maintainTG_2005 === false
             ) {
                 const highValue = parseFloat(TG_2005_High);
                 const lowValue = parseFloat(TG_2005_Low);
                 const TG_2005Value = parseFloat(TG_2005);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TG_2005Value)) {
                     if (highValue <= TG_2005Value || TG_2005Value <= lowValue) {
                             setExceedThresholdTG_2005(true);
                     } else {
                        setExceedThresholdTG_2005(false);
                     }
                 } 
             } 
         }, [TG_2005_High, TG_2005, TG_2005_Low,maintainTG_2005]);
     
 
     
     
     // =================================================================================================================== 
     
     
     const [GD_2006, setGD_2006] = useState<string | null>(null);
     const [GD_2006_High, setGD_2006_High] = useState<number | null>(null);
     const [GD_2006_Low, setGD_2006_Low] = useState<number | null>(null);
     const [exceedThresholdGD_2006, setExceedThresholdGD_2006] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainGD_2006, setMaintainGD_2006] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof GD_2006_High === 'string' && typeof GD_2006_Low === 'string' && GD_2006 !== null && maintainGD_2006 === false
             ) {
                 const highValue = parseFloat(GD_2006_High);
                 const lowValue = parseFloat(GD_2006_Low);
                 const GD_2006Value = parseFloat(GD_2006);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2006Value)) {
                     if (highValue <= GD_2006Value || GD_2006Value <= lowValue) {
                         
                             setExceedThresholdGD_2006(true);
                     } else {
                        setExceedThresholdGD_2006(false);
                     }
                 } 
             } 
         }, [GD_2006_High, GD_2006, , GD_2006_Low,maintainGD_2006]);
     
     
     
     
     // =================================================================================================================== 
     
         // =================================================================================================================== 
     
     const [GD_2004, setGD_2004] = useState<string | null>(null);
     const [GD_2004_High, setGD_2004_High] = useState<number | null>(null);
     const [GD_2004_Low, setGD_2004_Low] = useState<number | null>(null);
     const [exceedThresholdGD_2004, setExceedThresholdGD_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainGD_2004, setMaintainGD_2004] = useState<boolean>(false);
     
     
     useEffect(() => {
         if (typeof GD_2004_High === 'string' && typeof GD_2004_Low === 'string' && GD_2004 !== null && maintainGD_2004 === false
         ) {
             const highValue = parseFloat(GD_2004_High);
             const lowValue = parseFloat(GD_2004_Low);
             const GD_2004Value = parseFloat(GD_2004);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2004Value)) {
                 if (highValue <= GD_2004Value || GD_2004Value <= lowValue) {
                         setExceedThresholdGD_2004(true);
                 } else {
                    setExceedThresholdGD_2004(false);
                 }
             } 
         } 
     }, [GD_2004_High, GD_2004, , GD_2004_Low,maintainGD_2004]);
     

      // =================================================================================================================== 


     const [TOTAL_SNG, setTOTAL_SNG] = useState<string | null>(null);

     const [TOTAL_SNG_High, setTOTAL_SNG_High] = useState<number | null>(null);
     const [TOTAL_SNG_Low, setTOTAL_SNG_Low] = useState<number | null>(null);
     const [exceedThresholdTOTAL_SNG, setExceedThresholdTOTAL_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainTOTAL_SNG, setMaintainTOTAL_SNG] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TOTAL_SNG_High === 'string' && typeof TOTAL_SNG_Low === 'string' && TOTAL_SNG !== null && maintainTOTAL_SNG === false
             ) {
                 const highValue = parseFloat(TOTAL_SNG_High);
                 const lowValue = parseFloat(TOTAL_SNG_Low);
                 const TOTAL_SNGValue = parseFloat(TOTAL_SNG);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TOTAL_SNGValue)) {
                     if (highValue <= TOTAL_SNGValue || TOTAL_SNGValue <= lowValue) {
                             setExceedThresholdTOTAL_SNG(true);
                     } else {
                         setExceedThresholdTOTAL_SNG(false);
                     }
                 } 
             } 
         }, [TOTAL_SNG_High, TOTAL_SNG, TOTAL_SNG_Low,maintainTOTAL_SNG]);
     
      

     // =================================================================================================================== 


     const [GD_2005, setGD_2005] = useState<string | null>(null);

     const [GD_2005_High, setGD_2005_High] = useState<number | null>(null);
     const [GD_2005_Low, setGD_2005_Low] = useState<number | null>(null);
     const [exceedThresholdGD_2005, setExceedThresholdGD_2005] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     
     const [maintainGD_2005, setMaintainGD_2005] = useState<boolean>(false);
     
     
      useEffect(() => {
          if (typeof GD_2005_High === 'string' && typeof GD_2005_Low === 'string' && GD_2005 !== null && maintainGD_2005 === false
          ) {
              const highValue = parseFloat(GD_2005_High);
              const lowValue = parseFloat(GD_2005_Low);
              const GD_2005Value = parseFloat(GD_2005);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD_2005Value)) {
                  if (highValue <= GD_2005Value || GD_2005Value <= lowValue) {
                          setExceedThresholdGD_2005(true);
                  } else {
                     setExceedThresholdGD_2005(false);
                  }
              } 
          } 
      }, [GD_2005_High, GD_2005, GD_2005_Low,maintainGD_2005]);
     
   
     
     // =================================================================================================================== 


     // =================================================================================================================== 



          const [SDV_2004, setSDV_2004] = useState<string | null>(null);
  
          const [SDV_2004_High, setSDV_2004_High] = useState<number | null>(null);
          const [SDV_2004_Low, setSDV_2004_Low] = useState<number | null>(null);
          const [exceedThresholdSDV_2004, setExceedThresholdSDV_2004] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          const [maintainSDV_2004, setMaintainSDV_2004] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof SDV_2004_High === 'string' && typeof SDV_2004_Low === 'string' && SDV_2004 !== null && maintainSDV_2004 === false
                  ) {
                      const highValue = parseFloat(SDV_2004_High);
                      const lowValue = parseFloat(SDV_2004_Low);
                      const SDV_2004Value = parseFloat(SDV_2004);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2004Value)) {
                          if (highValue <= SDV_2004Value || SDV_2004Value <= lowValue) {
                                  setExceedThresholdSDV_2004(true);
                          } else {
                             setExceedThresholdSDV_2004(false);
                          }
                      } 
                  } 
              }, [SDV_2004_High, SDV_2004, SDV_2004_Low,maintainSDV_2004]);
          
           
     
          // =================================================================================================================== 


          const [GD2_STATUS, setGD2_STATUS] = useState<string | null>(null);
 
          const [GD2_STATUS_High, setGD2_STATUS_High] = useState<number | null>(null);
          const [GD2_STATUS_Low, setGD2_STATUS_Low] = useState<number | null>(null);
          const [exceedThresholdGD2_STATUS, setExceedThresholdGD2_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainGD2_STATUS, setMaintainGD2_STATUS] = useState<boolean>(false);
          
          
              useEffect(() => {
                  if (typeof GD2_STATUS_High === 'string' && typeof GD2_STATUS_Low === 'string' && GD2_STATUS !== null && maintainGD2_STATUS === false
                  ) {
                      const highValue = parseFloat(GD2_STATUS_High);
                      const lowValue = parseFloat(GD2_STATUS_Low);
                      const GD2_STATUSValue = parseFloat(GD2_STATUS);
              
                      if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD2_STATUSValue)) {
                          if (highValue <= GD2_STATUSValue || GD2_STATUSValue <= lowValue) {
                                  setExceedThresholdGD2_STATUS(true);
                          } else {
                             setExceedThresholdGD2_STATUS(false);
                          }
                      } 
                  } 
              }, [GD2_STATUS_High, GD2_STATUS , GD2_STATUS_Low,maintainGD2_STATUS]);
          
       
    
         
         // =================================================================================================================== 

         const [TM_2003_SNG, setTM_2003_SNG] = useState<string | null>(null);

        const [TM_2003_SNG_High, setTM_2003_SNG_High] = useState<number | null>(null);
        const [TM_2003_SNG_Low, setTM_2003_SNG_Low] = useState<number | null>(null);
        const [exceedThresholdTM_2003_SNG, setExceedThresholdTM_2003_SNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        const [maintainTM_2003_SNG, setMaintainTM_2003_SNG] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof TM_2003_SNG_High === 'string' && typeof TM_2003_SNG_Low === 'string' && TM_2003_SNG !== null && maintainTM_2003_SNG === false
         ) {
             const highValue = parseFloat(TM_2003_SNG_High);
             const lowValue = parseFloat(TM_2003_SNG_Low);
             const TM_2003_SNGValue = parseFloat(TM_2003_SNG);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM_2003_SNGValue)) {
                 if (highValue <= TM_2003_SNGValue || TM_2003_SNGValue <= lowValue) {
                         setExceedThresholdTM_2003_SNG(true);
                 } else {
                    setExceedThresholdTM_2003_SNG(false);
                 }
             } 
         } 
     }, [TM_2003_SNG_High, TM_2003_SNG, TM_2003_SNG_Low,maintainTM_2003_SNG]);
         // =================================================================================================================== 
        
        
        const [GD1_STATUS, setGD1_STATUS] = useState<string | null>(null);

        const [GD1_STATUS_High, setGD1_STATUS_High] = useState<number | null>(null);
        const [GD1_STATUS_Low, setGD1_STATUS_Low] = useState<number | null>(null);
        const [exceedThresholdGD1_STATUS, setExceedThresholdGD1_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainGD1_STATUS, setMaintainGD1_STATUS] = useState<boolean>(false);
        
        
            useEffect(() => {
                if (typeof GD1_STATUS_High === 'string' && typeof GD1_STATUS_Low === 'string' && GD1_STATUS !== null && maintainGD1_STATUS === false
                ) {
                    const highValue = parseFloat(GD1_STATUS_High);
                    const lowValue = parseFloat(GD1_STATUS_Low);
                    const GD1_STATUSValue = parseFloat(GD1_STATUS);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD1_STATUSValue)) {
                        if (highValue <= GD1_STATUSValue || GD1_STATUSValue <= lowValue) {
                                setExceedThresholdGD1_STATUS(true);
                        } else {
                           setExceedThresholdGD1_STATUS(false);
                        }
                    } 
                } 
            }, [GD1_STATUS_High, GD1_STATUS, GD1_STATUS_Low,maintainGD1_STATUS]);
        
         
        
        
        // =================================================================================================================== 
        
            // =================================================================================================================== 
        
        const [SDV_2003, setSDV_2003] = useState<string | null>(null);
   
        const [SDV_2003_High, setSDV_2003_High] = useState<number | null>(null);
        const [SDV_2003_Low, setSDV_2003_Low] = useState<number | null>(null);
        const [exceedThresholdSDV_2003, setExceedThresholdSDV_2003] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
        
        const [maintainSDV_2003, setMaintainSDV_2003] = useState<boolean>(false);
        
        
        useEffect(() => {
            if (typeof SDV_2003_High === 'string' && typeof SDV_2003_Low === 'string' && SDV_2003 !== null && maintainSDV_2003 === false
            ) {
                const highValue = parseFloat(SDV_2003_High);
                const lowValue = parseFloat(SDV_2003_Low);
                const SDV_2003Value = parseFloat(SDV_2003);
        
                if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SDV_2003Value)) {
                    if (highValue <= SDV_2003Value || SDV_2003Value <= lowValue) {
                            setExceedThresholdSDV_2003(true);
                    } else {
                       setExceedThresholdSDV_2003(false);
                    }
                } 
            } 
        }, [SDV_2003_High, SDV_2003, SDV_2003_Low,maintainSDV_2003]);
        
 
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
        
                  const [GD3_STATUS, setGD3_STATUS] = useState<string | null>(null);
                  const [GD3_STATUS_High, setGD3_STATUS_High] = useState<number | null>(null);
                  const [GD3_STATUS_Low, setGD3_STATUS_Low] = useState<number | null>(null);
                  const [exceedThresholdGD3_STATUS, setExceedThresholdGD3_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                  
                  const [maintainGD3_STATUS, setMaintainGD3_STATUS] = useState<boolean>(false);
                  
                  
                  useEffect(() => {
                      if (typeof GD3_STATUS_High === 'string' && typeof GD3_STATUS_Low === 'string' && GD3_STATUS !== null && maintainGD3_STATUS === false
                      ) {
                          const highValue = parseFloat(GD3_STATUS_High);
                          const lowValue = parseFloat(GD3_STATUS_Low);
                          const GD3_STATUSValue = parseFloat(GD3_STATUS);
                  
                          if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD3_STATUSValue)) {
                              if (highValue <= GD3_STATUSValue || GD3_STATUSValue <= lowValue) {
                                      setExceedThresholdGD3_STATUS(true);
                              } else {
                                 setExceedThresholdGD3_STATUS(false);
                              }
                          } 
                      } 
                  }, [GD3_STATUS_High, GD3_STATUS, GD3_STATUS_Low,maintainGD3_STATUS]);
                  
      
                  
                  // =================================================================================================================== 


                         // =================================================================================================================== 
        
                         const [GD4_STATUS, setGD4_STATUS] = useState<string | null>(null);
                
                         const [GD4_STATUS_High, setGD4_STATUS_High] = useState<number | null>(null);
                         const [GD4_STATUS_Low, setGD4_STATUS_Low] = useState<number | null>(null);
                         const [exceedThresholdGD4_STATUS, setExceedThresholdGD4_STATUS] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
                         
                         const [maintainGD4_STATUS, setMaintainGD4_STATUS] = useState<boolean>(false);
                         
                         
                         useEffect(() => {
                             if (typeof GD4_STATUS_High === 'string' && typeof GD4_STATUS_Low === 'string' && GD4_STATUS !== null && maintainGD4_STATUS === false
                             ) {
                                 const highValue = parseFloat(GD4_STATUS_High);
                                 const lowValue = parseFloat(GD4_STATUS_Low);
                                 const GD4_STATUSValue = parseFloat(GD4_STATUS);
                         
                                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(GD4_STATUSValue)) {
                                     if (highValue <= GD4_STATUSValue || GD4_STATUSValue <= lowValue) {
                                             setExceedThresholdGD4_STATUS(true);
                                     } else {
                                        setExceedThresholdGD4_STATUS(false);
                                     }
                                 } 
                             } 
                         }, [GD4_STATUS_High, GD4_STATUS, GD4_STATUS_Low,maintainGD4_STATUS]);
                         
                     
                         
                         
                         // =================================================================================================================== 

 
  // =================================================================================================================== 
 
 
  const [PERCENT_LPG, setPERCENT_LPG] = useState<string | null>(null);
  const [PERCENT_LPG_High, setPERCENT_LPG_High] = useState<number | null>(null);
  const [PERCENT_LPG_Low, setPERCENT_LPG_Low] = useState<number | null>(null);
  const [exceedThresholdPERCENT_LPG, setExceedThresholdPERCENT_LPG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
  const [maintainPERCENT_LPG, setMaintainPERCENT_LPG] = useState<boolean>(false);
  
  
      useEffect(() => {
          if (typeof PERCENT_LPG_High === 'string' && typeof PERCENT_LPG_Low === 'string' && PERCENT_LPG !== null && maintainPERCENT_LPG === false
          ) {
              const highValue = parseFloat(PERCENT_LPG_High);
              const lowValue = parseFloat(PERCENT_LPG_Low);
              const PERCENT_LPGValue = parseFloat(PERCENT_LPG);
      
              if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PERCENT_LPGValue)) {
                  if (highValue <= PERCENT_LPGValue || PERCENT_LPGValue <= lowValue) {
                          setExceedThresholdPERCENT_LPG(true);
                  } else {
                     setExceedThresholdPERCENT_LPG(false);
                  }
              } 
          } 
      }, [PERCENT_LPG_High, PERCENT_LPG, PERCENT_LPG_Low,maintainPERCENT_LPG]);


  // =================================================================================================================== 



       const [PERCENT_AIR, setPERCENT_AIR] = useState<string | null>(null);
       const [PERCENT_AIR_High, setPERCENT_AIR_High] = useState<number | null>(null);
       const [PERCENT_AIR_Low, setPERCENT_AIR_Low] = useState<number | null>(null);
       const [exceedThresholdPERCENT_AIR, setExceedThresholdPERCENT_AIR] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainPERCENT_AIR, setMaintainPERCENT_AIR] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof PERCENT_AIR_High === 'string' && typeof PERCENT_AIR_Low === 'string' && PERCENT_AIR !== null && maintainPERCENT_AIR === false
               ) {
                   const highValue = parseFloat(PERCENT_AIR_High);
                   const lowValue = parseFloat(PERCENT_AIR_Low);
                   const PERCENT_AIRValue = parseFloat(PERCENT_AIR);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PERCENT_AIRValue)) {
                       if (highValue <= PERCENT_AIRValue || PERCENT_AIRValue <= lowValue) {
                               setExceedThresholdPERCENT_AIR(true);
                       } else {
                          setExceedThresholdPERCENT_AIR(false);
                       }
                   } 
               } 
           }, [PERCENT_AIR_High, PERCENT_AIR, PERCENT_AIR_Low,maintainPERCENT_AIR]);
       

  
       // =================================================================================================================== 


       const [HV_1001, setHV_1001] = useState<string | null>(null);

       const [HV_1001_High, setHV_1001_High] = useState<number | null>(null);
       const [HV_1001_Low, setHV_1001_Low] = useState<number | null>(null);
       const [exceedThresholdHV_1001, setExceedThresholdHV_1001] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       
       const [maintainHV_1001, setMaintainHV_1001] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof HV_1001_High === 'string' && typeof HV_1001_Low === 'string' && HV_1001 !== null && maintainHV_1001 === false
               ) {
                   const highValue = parseFloat(HV_1001_High);
                   const lowValue = parseFloat(HV_1001_Low);
                   const HV_1001Value = parseFloat(HV_1001);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(HV_1001Value)) {
                       if (highValue <= HV_1001Value || HV_1001Value <= lowValue) {
                               setExceedThresholdHV_1001(true);
                       } else {
                          setExceedThresholdHV_1001(false);
                       }
                   } 
               } 
           }, [HV_1001_High, HV_1001 , HV_1001_Low,maintainHV_1001]);
       

  
       // =================================================================================================================== 

       const [RATIO_MODE, setRATIO_MODE] = useState<string | null>(null);
       const [RATIO_MODE_High, setRATIO_MODE_High] = useState<number | null>(null);
       const [RATIO_MODE_Low, setRATIO_MODE_Low] = useState<number | null>(null);
       const [exceedThresholdRATIO_MODE, setExceedThresholdRATIO_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainRATIO_MODE, setMaintainRATIO_MODE] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof RATIO_MODE_High === 'string' && typeof RATIO_MODE_Low === 'string' && RATIO_MODE !== null && maintainRATIO_MODE === false
               ) {
                   const highValue = parseFloat(RATIO_MODE_High);
                   const lowValue = parseFloat(RATIO_MODE_Low);
                   const RATIO_MODEValue = parseFloat(RATIO_MODE);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(RATIO_MODEValue)) {
                       if (highValue <= RATIO_MODEValue || RATIO_MODEValue <= lowValue) {
                               setExceedThresholdRATIO_MODE(true);
                       } else {
                          setExceedThresholdRATIO_MODE(false);
                       }
                   } 
               } 
           }, [RATIO_MODE_High, RATIO_MODE, RATIO_MODE_Low,maintainRATIO_MODE]);
       

  
  
       // =================================================================================================================== 

       const [FCV_MODE, setFCV_MODE] = useState<string | null>(null);
       const [FCV_MODE_High, setFCV_MODE_High] = useState<number | null>(null);
       const [FCV_MODE_Low, setFCV_MODE_Low] = useState<number | null>(null);
       const [exceedThresholdFCV_MODE, setExceedThresholdFCV_MODE] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
       const [maintainFCV_MODE, setMaintainFCV_MODE] = useState<boolean>(false);
       
       
           useEffect(() => {
               if (typeof FCV_MODE_High === 'string' && typeof FCV_MODE_Low === 'string' && FCV_MODE !== null && maintainFCV_MODE === false
               ) {
                   const highValue = parseFloat(FCV_MODE_High);
                   const lowValue = parseFloat(FCV_MODE_Low);
                   const FCV_MODEValue = parseFloat(FCV_MODE);
           
                   if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(FCV_MODEValue)) {
                       if (highValue <= FCV_MODEValue || FCV_MODEValue <= lowValue) {
                               setExceedThresholdFCV_MODE(true);
                       } else {
                          setExceedThresholdFCV_MODE(false);
                       }
                   } 
               } 
           }, [FCV_MODE_High, FCV_MODE, FCV_MODE_Low,maintainFCV_MODE]);
       
 
  
       // =================================================================================================================== 

 // =================================================================================================================== 

 const [TOTAL_CNG, setTOTAL_CNG] = useState<string | null>(null);
    
 const [TOTAL_CNG_High, setTOTAL_CNG_High] = useState<number | null>(null);
 const [TOTAL_CNG_Low, setTOTAL_CNG_Low] = useState<number | null>(null);
 const [exceedThresholdTOTAL_CNG, setExceedThresholdTOTAL_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 
 const [maintainTOTAL_CNG, setMaintainTOTAL_CNG] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof TOTAL_CNG_High === 'string' && typeof TOTAL_CNG_Low === 'string' && TOTAL_CNG !== null && maintainTOTAL_CNG === false
         ) {
             const highValue = parseFloat(TOTAL_CNG_High);
             const lowValue = parseFloat(TOTAL_CNG_Low);
             const TOTAL_CNGValue = parseFloat(TOTAL_CNG);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TOTAL_CNGValue)) {
                 if (highValue <= TOTAL_CNGValue || TOTAL_CNGValue <= lowValue) {
                         setExceedThresholdTOTAL_CNG(true);
                 } else {
                    setExceedThresholdTOTAL_CNG(false);
                 }
             } 
         } 
     }, [TOTAL_CNG_High, TOTAL_CNG, TOTAL_CNG_Low,maintainTOTAL_CNG]);
 


     // =================================================================================================================== 

     const [TM2002_CNG, setTM2002_CNG] = useState<string | null>(null);
     const [TM2002_CNG_High, setTM2002_CNG_High] = useState<number | null>(null);
     const [TM2002_CNG_Low, setTM2002_CNG_Low] = useState<number | null>(null);
     const [exceedThresholdTM2002_CNG, setExceedThresholdTM2002_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
     const [maintainTM2002_CNG, setMaintainTM2002_CNG] = useState<boolean>(false);
     
     
         useEffect(() => {
             if (typeof TM2002_CNG_High === 'string' && typeof TM2002_CNG_Low === 'string' && TM2002_CNG !== null && maintainTM2002_CNG === false
             ) {
                 const highValue = parseFloat(TM2002_CNG_High);
                 const lowValue = parseFloat(TM2002_CNG_Low);
                 const TM2002_CNGValue = parseFloat(TM2002_CNG);
         
                 if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM2002_CNGValue)) {
                     if (highValue <= TM2002_CNGValue || TM2002_CNGValue <= lowValue) {
                             setExceedThresholdTM2002_CNG(true);
                     } else {
                        setExceedThresholdTM2002_CNG(false);
                     }
                 } 
             } 
         }, [TM2002_CNG_High, TM2002_CNG, TM2002_CNG_Low,maintainTM2002_CNG]);
     
   
 
     // =================================================================================================================== 
            // =================================================================================================================== 
     
            const [WB_Setpoint, setWB_Setpoint] = useState<string | null>(null);
            const [WB_Setpoint_High, setWB_Setpoint_High] = useState<number | null>(null);
            const [WB_Setpoint_Low, setWB_Setpoint_Low] = useState<number | null>(null);
            const [exceedThresholdWB_Setpoint, setExceedThresholdWB_Setpoint] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
            
            const [maintainWB_Setpoint, setMaintainWB_Setpoint] = useState<boolean>(false);
            
            
            useEffect(() => {
                if (typeof WB_Setpoint_High === 'string' && typeof WB_Setpoint_Low === 'string' && WB_Setpoint !== null && maintainWB_Setpoint === false
                ) {
                    const highValue = parseFloat(WB_Setpoint_High);
                    const lowValue = parseFloat(WB_Setpoint_Low);
                    const WB_SetpointValue = parseFloat(WB_Setpoint);
            
                    if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WB_SetpointValue)) {
                        if (highValue <= WB_SetpointValue || WB_SetpointValue <= lowValue) {
                                setExceedThresholdWB_Setpoint(true);
                        } else {
                           setExceedThresholdWB_Setpoint(false);
                        }
                    } 
                } 
            }, [WB_Setpoint_High, WB_Setpoint, , WB_Setpoint_Low,maintainWB_Setpoint]);
            
         // =================================================================================================================== 

         const [TM2003_CNG, setTM2003_CNG] = useState<string | null>(null);

         const [TM2003_CNG_High, setTM2003_CNG_High] = useState<number | null>(null);
         const [TM2003_CNG_Low, setTM2003_CNG_Low] = useState<number | null>(null);
         const [exceedThresholdTM2003_CNG, setExceedThresholdTM2003_CNG] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
         const [maintainTM2003_CNG, setMaintainTM2003_CNG] = useState<boolean>(false);
         
         
             useEffect(() => {
                 if (typeof TM2003_CNG_High === 'string' && typeof TM2003_CNG_Low === 'string' && TM2003_CNG !== null && maintainTM2003_CNG === false
                 ) {
                     const highValue = parseFloat(TM2003_CNG_High);
                     const lowValue = parseFloat(TM2003_CNG_Low);
                     const TM2003_CNGValue = parseFloat(TM2003_CNG);
             
                     if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TM2003_CNGValue)) {
                         if (highValue <= TM2003_CNGValue || TM2003_CNGValue <= lowValue) {
                                 setExceedThresholdTM2003_CNG(true);
                         } else {
                            setExceedThresholdTM2003_CNG(false);
                         }
                     } 
                 } 
             }, [TM2003_CNG_High, TM2003_CNG, TM2003_CNG_Low,maintainTM2003_CNG]);
         
        
        
        
         // =================================================================================================================== 

 // =================================================================================================================== 

 const [WIS_Calorimeter, setWIS_Calorimeter] = useState<string | null>(null);
 const [WIS_Calorimeter_High, setWIS_Calorimeter_High] = useState<number | null>(null);
 const [WIS_Calorimeter_Low, setWIS_Calorimeter_Low] = useState<number | null>(null);
 const [exceedThresholdWIS_Calorimeter, setExceedThresholdWIS_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
 const [maintainWIS_Calorimeter, setMaintainWIS_Calorimeter] = useState<boolean>(false);
 
 
     useEffect(() => {
         if (typeof WIS_Calorimeter_High === 'string' && typeof WIS_Calorimeter_Low === 'string' && WIS_Calorimeter !== null && maintainWIS_Calorimeter === false
         ) {
             const highValue = parseFloat(WIS_Calorimeter_High);
             const lowValue = parseFloat(WIS_Calorimeter_Low);
             const WIS_CalorimeterValue = parseFloat(WIS_Calorimeter);
     
             if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(WIS_CalorimeterValue)) {
                 if (highValue <= WIS_CalorimeterValue || WIS_CalorimeterValue <= lowValue) {
                         setExceedThresholdWIS_Calorimeter(true);
                 } else {
                    setExceedThresholdWIS_Calorimeter(false);
                 }
             } 
         } 
     }, [WIS_Calorimeter_High, WIS_Calorimeter, WIS_Calorimeter_Low,maintainWIS_Calorimeter]);
 


 // =================================================================================================================== 


     // =================================================================================================================== 




     // =================================================================================================================== 

const [CVS_Calorimeter, setCVS_Calorimeter] = useState<string | null>(null);

const [CVS_Calorimeter_High, setCVS_Calorimeter_High] = useState<number | null>(null);
const [CVS_Calorimeter_Low, setCVS_Calorimeter_Low] = useState<number | null>(null);
const [exceedThresholdCVS_Calorimeter, setExceedThresholdCVS_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainCVS_Calorimeter, setMaintainCVS_Calorimeter] = useState<boolean>(false);


 useEffect(() => {
     if (typeof CVS_Calorimeter_High === 'string' && typeof CVS_Calorimeter_Low === 'string' && CVS_Calorimeter !== null && maintainCVS_Calorimeter === false
     ) {
         const highValue = parseFloat(CVS_Calorimeter_High);
         const lowValue = parseFloat(CVS_Calorimeter_Low);
         const CVS_CalorimeterValue = parseFloat(CVS_Calorimeter);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(CVS_CalorimeterValue)) {
             if (highValue <= CVS_CalorimeterValue || CVS_CalorimeterValue <= lowValue) {
            
                     setExceedThresholdCVS_Calorimeter(true);
             } else {
                setExceedThresholdCVS_Calorimeter(false);
             }
         } 
     } 
 }, [CVS_Calorimeter_High, CVS_Calorimeter, CVS_Calorimeter_Low,maintainCVS_Calorimeter]);




// =================================================================================================================== 
   
const [SG_Calorimeter, setSG_Calorimeter] = useState<string | null>(null);

const [SG_Calorimeter_High, setSG_Calorimeter_High] = useState<number | null>(null);
const [SG_Calorimeter_Low, setSG_Calorimeter_Low] = useState<number | null>(null);
const [exceedThresholdSG_Calorimeter, setExceedThresholdSG_Calorimeter] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainSG_Calorimeter, setMaintainSG_Calorimeter] = useState<boolean>(false);


 useEffect(() => {
     if (typeof SG_Calorimeter_High === 'string' && typeof SG_Calorimeter_Low === 'string' && SG_Calorimeter !== null && maintainSG_Calorimeter === false
     ) {
         const highValue = parseFloat(SG_Calorimeter_High);
         const lowValue = parseFloat(SG_Calorimeter_Low);
         const SG_CalorimeterValue = parseFloat(SG_Calorimeter);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(SG_CalorimeterValue)) {
             if (highValue <= SG_CalorimeterValue || SG_CalorimeterValue <= lowValue) {
            
                     setExceedThresholdSG_Calorimeter(true);
             } else {
                setExceedThresholdSG_Calorimeter(false);
             }
         } 
     } 
 }, [SG_Calorimeter_High, SG_Calorimeter, SG_Calorimeter_Low,maintainSG_Calorimeter]);




// =================================================================================================================== 

const [PLC_Conn_STT, setPLC_Conn_STT] = useState<string | null>(null);

const [PLC_Conn_STT_High, setPLC_Conn_STT_High] = useState<number | null>(null);
const [PLC_Conn_STT_Low, setPLC_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdPLC_Conn_STT, setExceedThresholdPLC_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainPLC_Conn_STT, setMaintainPLC_Conn_STT] = useState<boolean>(false);


 useEffect(() => {
     if (typeof PLC_Conn_STT_High === 'string' && typeof PLC_Conn_STT_Low === 'string' && PLC_Conn_STT !== null && maintainPLC_Conn_STT === false
     ) {
         const highValue = parseFloat(PLC_Conn_STT_High);
         const lowValue = parseFloat(PLC_Conn_STT_Low);
         const PLC_Conn_STTValue = parseFloat(PLC_Conn_STT);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(PLC_Conn_STTValue)) {
             if (highValue <= PLC_Conn_STTValue || PLC_Conn_STTValue <= lowValue) {
            
                     setExceedThresholdPLC_Conn_STT(true);
             } else {
                setExceedThresholdPLC_Conn_STT(false);
             }
         } 
     } 
 }, [PLC_Conn_STT_High, PLC_Conn_STT, PLC_Conn_STT_Low,maintainPLC_Conn_STT]);




// =================================================================================================================== 


const [TD_4072_Conn_STT, setTD_4072_Conn_STT] = useState<string | null>(null);

const [TD_4072_Conn_STT_High, setTD_4072_Conn_STT_High] = useState<number | null>(null);
const [TD_4072_Conn_STT_Low, setTD_4072_Conn_STT_Low] = useState<number | null>(null);
const [exceedThresholdTD_4072_Conn_STT, setExceedThresholdTD_4072_Conn_STT] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

const [maintainTD_4072_Conn_STT, setMaintainTD_4072_Conn_STT] = useState<boolean>(false);


 useEffect(() => {
     if (typeof TD_4072_Conn_STT_High === 'string' && typeof TD_4072_Conn_STT_Low === 'string' && TD_4072_Conn_STT !== null && maintainTD_4072_Conn_STT === false
     ) {
         const highValue = parseFloat(TD_4072_Conn_STT_High);
         const lowValue = parseFloat(TD_4072_Conn_STT_Low);
         const TD_4072_Conn_STTValue = parseFloat(TD_4072_Conn_STT);
 
         if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(TD_4072_Conn_STTValue)) {
             if (highValue <= TD_4072_Conn_STTValue || TD_4072_Conn_STTValue <= lowValue) {
            
                     setExceedThresholdTD_4072_Conn_STT(true);
             } else {
                setExceedThresholdTD_4072_Conn_STT(false);
             }
         } 
     } 
 }, [TD_4072_Conn_STT_High, TD_4072_Conn_STT, TD_4072_Conn_STT_Low,maintainTD_4072_Conn_STT]);




// =================================================================================================================== 

// =================================================================================================================== 
       
       

     //======================================================================================================================

    const tagNamePLC = {
        PT_2005: "Pressure Transmitter PT-2005 (BarG)",
        PT_2004: "Pressure Transmitter PT-2004 (BarG)",
        TT_2003: "Temperature Transmitter TT-2003 (˚C)",
        TT_2004: "Temperature Transmitter TT-2004 (˚C) ",
        TG_2005: "TG-2005 (˚C)",

        WB_1001: "Wobbe Index WB-1001 (MJ/M3)",

      


        GD_2002: "Gas Detector GD-2002 (%LEL)",
        GD_2003: "Gas Detector GD-2003 (%LEL)",
        GD_2004: "Gas Detector GD-2004 (%LEL)",
        GD_2005: `Gas Detector GD-2005 (%LEL)`,
        GD_2006: `Gas Detector GD-2006 (%LEL)`,

        TM_2002_SNG:`Tubine Meter TM2002-SNG`,
        TM_2003_SNG:`Tubine Meter TM2003-SNG`,
        TOTAL_SNG: `Total SNG`,

        SDV_2004:"Shutdown Valve SDV-2004 (0: Close - 1: Open)",
        SDV_2003:"Shutdown Valve SDV-2003 (0: Close - 1: Open)",

        
        


        GD1_STATUS:"GD-2002 Status (0: Normal - 1: Alarm)",
        GD2_STATUS:"GD-2003 Status (0: Normal - 1: Alarm)",
        GD3_STATUS:"GD-2004 Status (0: Normal - 1: Alarm)",
        GD4_STATUS:"GD-2005 Status (0: Normal - 1: Alarm)",
        GD5_STATUS:"GD-2006 Status (0: Normal - 1: Alarm)",


        SD: "Emergency Shutdown (0: Normal - 1: Smoker Detected) ",
        HR_BC: "Horn And Beacon (0: OFF - 1: ON)",
        ESD: "Emergency Shutdown (0: No Active - 1: Active)",
        VAPORIZER_3: "VAPORIZER 3 (0: Stop - 1: Run)",
        VAPORIZER_2: "VAPORIZER 2 (0: Stop - 1: Run)",
        VAPORIZER_1: "VAPORIZER 1 (0: Stop - 1: Run)",


        VAPORIZER_4: "VAPORIZER 4 (0: Stop - 1: Run)",
        COOLING_V: " COOLING V  (0: Stop - 1: Run)",

        FCV_2001: "FCV-2001 (%)",
    
        PERCENT_LPG:"% LPG (%)",
        PERCENT_AIR:"% AIR (%)",
        HV_1001:"Heat Value HV-1001 (MJ/Sm³)",
        RATIO_MODE:"RATIO Mode (0: Manual - 1: Auto )",
        FCV_MODE:"FCV MODE (0: Manual - 1: Auto )",
        TOTAL_CNG: "Total CNG",
        TM2002_CNG: "Tubine Meter TM2002-CNG",
        TM2003_CNG: "Tubine Meter TM2003-CNG",
        WB_Setpoint: "Wobbe Index Setpoint (MJ/Sm³)",
        WIS_Calorimeter: "WIS Calorimeter (MJ/Sm³)", 
        CVS_Calorimeter: "CVS Calorimeter (MJ/Sm³)",
        SG_Calorimeter: "SG Calorimeter (rel)",

        PLC_Conn_STT:"PLC Connection Status (0: Not Init - 1: COM OK - 2: Error)",
        TD_4072_Conn_STT:"Calorimeter Connection Status (0: Not Init - 1: COM OK - 2: Error)",


    };

        const DataTT_2003  = TT_2003 === "0" ? "Stop" : TT_2003 === "1" ? "Run" : null;
        const DataPT_2005  = PT_2005 === "0" ? "Stop" : PT_2005 === "1" ? "Run" : null;
        const DataPT_2004  = PT_2004 === "0" ? "Stop" : PT_2004 === "1" ? "Run" : null;

        const DataTG_2005  = TG_2005 === "0" ? "Normal" : TG_2005 === "1" ? "Alarm" : null;
        const DataWB_1001  = WB_1001 === "0" ? "Normal" : WB_1001 === "1" ? "Alarm" : null;
        const DataTT_2004  = TT_2004 === "0" ? "Normal" : TT_2004 === "1" ? "Alarm" : null;

        const DataGD_2003  = GD_2003 === "0" ? "Normal" : GD_2003 === "1" ? "Alarm" : null;
        const DataGD_2004  = GD_2004 === "0" ? "Normal" : GD_2004 === "1" ? "Alarm" : null;
        const DataGD_2002  = GD_2002 === "0" ? "Normal" : GD_2002 === "1" ? "Alarm" : null;

        const DataGD5_STATUS  = GD5_STATUS === "0" ? "Normal" : GD5_STATUS === "1" ? "Alarm" : null;
        const DataGD4_STATUS  = GD4_STATUS === "0" ? "Normal" : GD4_STATUS === "1" ? "Alarm" : null;
        const DataGD3_STATUS  = GD3_STATUS === "0" ? "Normal" : GD3_STATUS === "1" ? "Alarm" : null;
        const DataGD2_STATUS  = GD2_STATUS === "0" ? "Normal" : GD2_STATUS === "1" ? "Alarm" : null;
        const DataGD1_STATUS  = GD1_STATUS === "0" ? "Normal" : GD1_STATUS === "1" ? "Alarm" : null;

        const DataSDV_2004  = SDV_2004 === "0" ? "Close" : SDV_2004 === "1" ? "Open" : null;
        const DataSDV_2003  = SDV_2003 === "0" ? "Close" : SDV_2003 === "1" ? "Open" : null;

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

                CSSPT_2004 : {
                    color:exceedThresholdPT_2004 && !maintainPT_2004
                    ? "#ff5656"
                    : maintainPT_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2004 || maintainPT_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2004 || maintainPT_2004)
                    ? 18
                    : ""
                },
        
                CSSPT_2005 : {
                    color:exceedThresholdPT_2005 && !maintainPT_2005
                    ? "#ff5656"
                    : maintainPT_2005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdPT_2005 || maintainPT_2005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdPT_2005 || maintainPT_2005)
                    ? 18
                    : ""
                },
        
        
                CSSTT_2003 : {
                    color:exceedThresholdTT_2003 && !maintainTT_2003
                    ? "#ff5656"
                    : maintainTT_2003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2003 || maintainTT_2003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2003 || maintainTT_2003)
                    ? 18
                    : ""
                },
                CSSTT_2004 : {
                    color:exceedThresholdTT_2004 && !maintainTT_2004
                    ? "#ff5656"
                    : maintainTT_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTT_2004 || maintainTT_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTT_2004 || maintainTT_2004)
                    ? 18
                    : ""
                },
        
        
             
        
        
                CSSWB_1001 : {
                    color:exceedThresholdWB_1001 && !maintainWB_1001
                    ? "#ff5656"
                    : maintainWB_1001
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdWB_1001 || maintainWB_1001)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdWB_1001 || maintainWB_1001)
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
        
                CSSGD_2002 : {
                    color:exceedThresholdGD_2002 && !maintainGD_2002
                    ? "#ff5656"
                    : maintainGD_2002
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2002 || maintainGD_2002)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2002 || maintainGD_2002)
                    ? 18
                    : ""
                },
        
                CSSGD_2003 : {
                    color:exceedThresholdGD_2003 && !maintainGD_2003
                    ? "#ff5656"
                    : maintainGD_2003
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2003 || maintainGD_2003)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2003 || maintainGD_2003)
                    ? 18
                    : ""
                },
        
        
          
        
        
                CSSGD_2005 : {
                    color:exceedThresholdGD_2005 && !maintainGD_2005
                    ? "#ff5656"
                    : maintainGD_2005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2005 || maintainGD_2005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2005 || maintainGD_2005)
                    ? 18
                    : ""
                },
        
                CSSGD_2006 : {
                    color:exceedThresholdGD_2006 && !maintainGD_2006
                    ? "#ff5656"
                    : maintainGD_2006
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2006 || maintainGD_2006)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2006 || maintainGD_2006)
                    ? 18
                    : ""
                },
        
        
        
        
                CSSTG_2005 : {
                    color:exceedThresholdTG_2005 && !maintainTG_2005
                    ? "#ff5656"
                    : maintainTG_2005
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTG_2005 || maintainTG_2005)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTG_2005 || maintainTG_2005)
                    ? 18
                    : ""
                },
        
        
                CSSTM_2002_SNG : {
                         color:exceedThresholdTM_2002_SNG && !maintainTM_2002_SNG
                    ? "#ff5656"
                    : maintainTM_2002_SNG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTM_2002_SNG || maintainTM_2002_SNG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTM_2002_SNG || maintainTM_2002_SNG)
                    ? 18
                    : ""
                },
                CSSTM_2003_SNG : {
                    color:exceedThresholdTM_2003_SNG && !maintainTM_2003_SNG
                    ? "#ff5656"
                    : maintainTM_2003_SNG
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdTM_2003_SNG || maintainTM_2003_SNG)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdTM_2003_SNG || maintainTM_2003_SNG)
                    ? 18
                    : ""
                },
        
                CSSGD_2004 : {
                    color:exceedThresholdGD_2004 && !maintainGD_2004
                    ? "#ff5656"
                    : maintainGD_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdGD_2004 || maintainGD_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdGD_2004 || maintainGD_2004)
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
                CSSSDV_2004 : {
                    color:exceedThresholdSDV_2004 && !maintainSDV_2004
                    ? "#ff5656"
                    : maintainSDV_2004
                    ? "orange"
                    : "" ,
                    fontWeight: (exceedThresholdSDV_2004 || maintainSDV_2004)
                    ? 600
                    : "",
                    fontSize: (exceedThresholdSDV_2004 || maintainSDV_2004)
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
   
           CSSSDV_2003 : {
               color:exceedThresholdSDV_2003 && !maintainSDV_2003
               ? "#ff5656"
               : maintainSDV_2003
               ? "orange"
               : "" ,
               fontWeight: (exceedThresholdSDV_2003 || maintainSDV_2003)
               ? 600
               : "",
               fontSize: (exceedThresholdSDV_2003 || maintainSDV_2003)
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


        CSSFCV_2001 : {
            color:exceedThresholdFCV_2001 && !maintainFCV_2001
            ? "#ff5656"
            : maintainFCV_2001
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdFCV_2001 || maintainFCV_2001)
            ? 600
            : "",
            fontSize: (exceedThresholdFCV_2001 || maintainFCV_2001)
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


        CSSHV_1001 : {
            color:exceedThresholdHV_1001 && !maintainHV_1001
            ? "#ff5656"
            : maintainHV_1001
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdHV_1001 || maintainHV_1001)
            ? 600
            : "",
            fontSize: (exceedThresholdHV_1001 || maintainHV_1001)
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
   

     

        CSSTM2002_CNG : {
            color:exceedThresholdTM2002_CNG && !maintainTM2002_CNG
            ? "#ff5656"
            : maintainTM2002_CNG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTM2002_CNG || maintainTM2002_CNG)
            ? 600
            : "",
            fontSize: (exceedThresholdTM2002_CNG || maintainTM2002_CNG)
            ? 18
            : ""
        },

        CSSTM2003_CNG : {
            color:exceedThresholdTM2003_CNG && !maintainTM2003_CNG
            ? "#ff5656"
            : maintainTM2003_CNG
            ? "orange"
            : "" ,
            fontWeight: (exceedThresholdTM2003_CNG || maintainTM2003_CNG)
            ? 600
            : "",
            fontSize: (exceedThresholdTM2003_CNG || maintainTM2003_CNG)
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
            name: <span>{tagNamePLC.PT_2004}</span>,
            PLC: <span style={combineCss.CSSPT_2004}>{} {PT_2004} {DataPT_2004}</span>,
        },

        {
            name: <span>{tagNamePLC.PT_2005}</span>,
            PLC: <span style={combineCss.CSSPT_2005}> {PT_2005} {DataPT_2005}</span>,
        },
     
        {
            name: <span>{tagNamePLC.TT_2004}</span>,
            PLC: <span style={combineCss.CSSTT_2004}>{TT_2004} {DataTT_2004}</span>,
        },
        {
            name: <span>{tagNamePLC.TT_2003}</span>,
            PLC: <span style={combineCss.CSSTT_2003}> {TT_2003} {DataTT_2003}</span>,
        },
   
        {
            name: <span>{tagNamePLC.TG_2005}</span>,
            PLC: <span style={combineCss.CSSTG_2005}> {TG_2005} {DataTG_2005}</span>,
        },
      
        {
            name: <span>{tagNamePLC.WB_1001}</span>,
            PLC: <span style={combineCss.CSSWB_1001}>{WB_1001} {DataWB_1001}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_2002}</span>,
            PLC: <span style={combineCss.CSSGD_2002}> {GD_2002} {DataGD_2002}</span>,
        },
           
        {
            name: <span>{tagNamePLC.GD_2003}</span>,
            PLC: <span style={combineCss.CSSGD_2003}>{GD_2003} {DataGD_2003}</span>,
        },
        {
            name: <span>{tagNamePLC.GD_2004}</span>,
            PLC: <span style={combineCss.CSSGD_2004}> {GD_2004} {DataGD_2004}</span>,
        },
      
      
        {
            name: <span>{tagNamePLC.GD_2005}</span>,
            PLC: <span style={combineCss.CSSGD_2005}>{GD_2005} </span>,
        },
        {
            name: <span>{tagNamePLC.GD_2006}</span>,
            PLC: <span style={combineCss.CSSGD_2006}> {GD_2006} </span>,
        },


        {
            name: <span>{tagNamePLC.TM_2002_SNG}</span>,
            PLC: <span style={combineCss.CSSTM_2002_SNG}>{TM_2002_SNG} </span>,
        },
     
        {
            name: <span>{tagNamePLC.TM_2003_SNG}</span>,
            PLC: <span style={combineCss.CSSTM_2003_SNG}>{TM_2003_SNG}</span>,
        },
        {
            name: <span>{tagNamePLC.TOTAL_SNG}</span>,
            PLC: <span style={combineCss.CSSTOTAL_SNG}>{TOTAL_SNG}  </span>,
        },
        {
            name: <span>{tagNamePLC.SDV_2004}</span>,
            PLC: <span style={combineCss.CSSSDV_2004}> {SDV_2004}  {DataSDV_2004}</span>,
        },

        {
            name: <span>{tagNamePLC.SDV_2003}</span>,
            PLC: <span style={combineCss.CSSSDV_2003}>{SDV_2003} {DataSDV_2003}</span>,
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
            name: <span>{tagNamePLC.VAPORIZER_2}</span>,
            PLC: <span style={combineCss.CSSVAPORIZER_1}>{VAPORIZER_1} {DataVAPORIZER_1}</span>,
        },
        {
            name: <span>{tagNamePLC.VAPORIZER_1}</span>,
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
            name: <span>{tagNamePLC.FCV_2001}</span>,
            PLC: <span style={combineCss.CSSFCV_2001}> {FCV_2001} </span>,
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
            name: <span>{tagNamePLC.HV_1001}</span>,
            PLC: <span style={combineCss.CSSHV_1001}> {HV_1001} </span>,
        },
   
        {
            name: <span>{tagNamePLC.TOTAL_CNG}</span>,
            PLC: <span style={combineCss.CSSTOTAL_CNG}> {TOTAL_CNG}</span>,
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
            name: <span>{tagNamePLC.TM2002_CNG}</span>,
            PLC: <span style={combineCss.CSSTM2002_CNG}> {TM2002_CNG} </span>,
        },

        {
            name: <span>{tagNamePLC.TM2003_CNG}</span>,
            PLC: <span style={combineCss.CSSTM2003_CNG}>{TM2003_CNG} </span>,
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
                            SNG BINH DUONG
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
