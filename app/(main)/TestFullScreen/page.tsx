"use client";
import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScoreCard.css";
import { httpApi } from "@/api/http.api";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}
const id_test = "d4602b70-61d7-11ef-9c7b-0938a6cf0867";

export default function SetupData_Test() {
    const [data, setData] = useState<any[]>([]);
    const token = readToken();
    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);

    const [globalAlarm, setGlobalAlarm] = useState<boolean>(false);

    useEffect(() => {
        ws.current = new WebSocket(url);
        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_test,
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
                        GD1: setGD1,
                        GD2: setGD2,
                        GD3: setGD3,
                    };
                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }
                fetchData();
            };
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_test}/values/attributes/SERVER_SCOPE`
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

            const GD3_High = res.data.find(
                (item: any) => item.key === "GD3_High"
            );
            setGD3_High(GD3_High?.value || null);
            const GD3_Low = res.data.find(
                (item: any) => item.key === "GD3_Low"
            );
            setGD3_Low(GD3_Low?.value || null);
            const GD3_Maintain = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
            );
            setMaintainGD1(GD1_Maintain?.value || false);
            setMaintainGD2(GD2_Maintain?.value || false);
            setMaintainGD3(GD3_Maintain?.value || false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ====================

    const [GD1, setGD1] = useState<string | null>(null);
    const [GD1_High, setGD1_High] = useState<number | null>(null);
    const [GD1_Low, setGD1_Low] = useState<number | null>(null);
    const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false);
    const [maintainGD1, setMaintainGD1] = useState<boolean>(false);
    useEffect(() => {
        const GD1Value = parseFloat(GD1 as any);
        const highValue = GD1_High ?? NaN;
        const lowValue = GD1_Low ?? NaN;

        if (
            !isNaN(GD1Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD1
        ) {
            setExceedThresholdGD1(
                GD1Value >= highValue || GD1Value <= lowValue
            );
        }
    }, [GD1, GD1_High, GD1_Low, maintainGD1]);

    const [GD2, setGD2] = useState<string | null>(null);
    const [GD2_High, setGD2_High] = useState<number | null>(null);
    const [GD2_Low, setGD2_Low] = useState<number | null>(null);
    const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false);
    const [maintainGD2, setMaintainGD2] = useState<boolean>(false);
    useEffect(() => {
        const GD2Value = parseFloat(GD2 as any);
        const highValue = GD2_High ?? NaN;
        const lowValue = GD2_Low ?? NaN;

        if (
            !isNaN(GD2Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD2
        ) {
            setExceedThresholdGD2(
                GD2Value >= highValue || GD2Value <= lowValue
            );
        }
    }, [GD2, GD2_High, GD2_Low, maintainGD2]);

    const [GD3, setGD3] = useState<string | null>(null);
    const [GD3_High, setGD3_High] = useState<number | null>(null);
    const [GD3_Low, setGD3_Low] = useState<number | null>(null);
    const [exceedThresholdGD3, setExceedThresholdGD3] = useState(false);
    const [maintainGD3, setMaintainGD3] = useState<boolean>(false);
    useEffect(() => {
        const GD3Value = parseFloat(GD3 as any);
        const highValue = GD3_High ?? NaN;
        const lowValue = GD3_Low ?? NaN;

        if (
            !isNaN(GD3Value) &&
            !isNaN(highValue) &&
            !isNaN(lowValue) &&
            !maintainGD3
        ) {
            setExceedThresholdGD3(
                GD3Value >= highValue || GD3Value <= lowValue
            );
        }
    }, [GD3, GD3_High, GD3_Low, maintainGD3]);

    const TagsName = ["GD1", "GD2"];

    useEffect(() => {
        if (
            (exceedThresholdGD1 && !maintainGD1) ||
            (exceedThresholdGD2 && !maintainGD2) ||
            (exceedThresholdGD3 && !maintainGD3)
        ) {
            setAlarmMessage("ALARM");
        } else if (maintainGD1 || maintainGD2 || maintainGD3) {
            setAlarmMessage("Maintaining");
        } else {
            setAlarmMessage(null);
        }
    }, [
        exceedThresholdGD1,
        exceedThresholdGD2,
        exceedThresholdGD3,

        maintainGD1,
        maintainGD2,
        maintainGD3,
    ]);

    // ====================

    const tagNamePLC = {
        PT01: "Input Pressure PT-1903 (BarG)",
        GD1: "Gas Detector GD-1901 (%LEL)",
        GD2: "Gas Detector GD-1902 (%LEL)",

        GD3: "Gas Detector GD-1903 (%LEL)",
    };

    const combineCss = {
        CSSGD1: {
            color:
                exceedThresholdGD1 && !maintainGD1
                    ? "#ff5656"
                    : maintainGD1
                    ? "orange"
                    : "",
            fontWeight: exceedThresholdGD1 || maintainGD1 ? 600 : "",
            fontSize: exceedThresholdGD1 || maintainGD1 ? 18 : "",
        },
        CSSGD2: {
            color:
                exceedThresholdGD2 && !maintainGD2
                    ? "#ff5656"
                    : maintainGD2
                    ? "orange"
                    : "",
            fontWeight: exceedThresholdGD2 || maintainGD2 ? 600 : "",
            fontSize: exceedThresholdGD2 || maintainGD2 ? 18 : "",
        },

        CSSGD3: {
            color:
                exceedThresholdGD3 && !maintainGD3
                    ? "#ff5656"
                    : maintainGD3
                    ? "orange"
                    : "",
            fontWeight: exceedThresholdGD3 || maintainGD3 ? 600 : "",
            fontSize: exceedThresholdGD3 || maintainGD3 ? 18 : "",
        },
    };
    const dataPLC = [
        {
            name: <span>{tagNamePLC.GD1}</span>,
            PLC: (
                <span style={combineCss.CSSGD1}>
                    {} {GD1}
                </span>
            ),
        },
        {
            name: <span>{tagNamePLC.GD2}</span>,
            PLC: <span style={combineCss.CSSGD2}> {GD2}</span>,
        },
        {
            name: <span>{tagNamePLC.GD3}</span>,
            PLC: <span style={combineCss.CSSGD3}> {GD3}</span>,
        },
    ];

    return (
        <>
            <DataTable value={dataPLC} size="small" selectionMode="single">
                <Column
                    field="name"
                    header={<span className="id556"> PLC Parameter</span>}
                ></Column>
                <Column
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    field="PLC"
                ></Column>
            </DataTable>

            {alarmMessage && (
                <div className="alarm-message">{alarmMessage}</div>
            )}
            {/* {globalAlarm && <div className="global-alarm">Alarm</div>} */}
        </>
    );
}
