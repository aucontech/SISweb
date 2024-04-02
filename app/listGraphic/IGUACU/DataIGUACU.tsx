import React, { useEffect, useRef, useState } from "react";
import { readToken } from "@/service/localStorage";
import styles from "../components/GraphicCss.module.css";
import { OverlayPanel } from "primereact/overlaypanel";
import { id_IGUECU } from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

export default function DataIGUACU() {
    const DeviceName = localStorage.getItem("deviceName");

    const [data, setData] = useState<any[]>([]);

    const token = readToken();
    const op = useRef<OverlayPanel>(null);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const [flowRate, setFlowRate] = useState<string | null>(null);
    const [pipePressure, setPipePressure] = useState<string | null>(null);
    const [liquidLever, setLiquidLever] = useState<string | null>(null);
    const [tankPressureAI, setTankPreesureAI] = useState<string | null>(null);

    const [spare01AI, setSpare01AI] = useState<string | null>(null);
    const [spare02AI, setSpare02AI] = useState<string | null>(null);
    const [spare03AI, setSpare03AI] = useState<string | null>(null);
    const [spare04AI, setSpare04AI] = useState<string | null>(null);

    const [temprerature01AI, setTemperature01AI] = useState<string | null>(
        null
    );
    const [temprerature02AI, setTemperature02AI] = useState<string | null>(
        null
    );

    const [solenoido01Do, setSolenoid01Do] = useState<string | null>(null);

    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_IGUECU,
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
    }, [url]);
    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        Flow_Rate_AI: setFlowRate,
                        Pipe_Pressure_AI: setPipePressure,
                        Liquid_Level_AI: setLiquidLever,
                        Tank_Pressure_AI: setTankPreesureAI,

                        Spare_01_AI: setSpare01AI,
                        Spare_02_AI: setSpare02AI,
                        Spare_03_AI: setSpare03AI,
                        Spare_04_AI: setSpare04AI,

                        Temperature_01_AI: setTemperature01AI,
                        Temperature_02_AI: setTemperature02AI,
                        Solenoid_01_DO: setSolenoid01Do,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key];
                            const slicedValue = value.slice(0, 6);
                            stateMap[key]?.(slicedValue);
                        }
                    });

                    const timeUpdate = dataReceived.data["time"];
                    setTimeUpdate(timeUpdate);
                }
            };
        }
    }, [data]);
    const paragraphContents: Record<string, string> = {
        FRA: "FRA :",
        PPA: "PPA :",
        LLA: "LLA :",
        TPA: "TPA :",
        S01A: "S01A :",
        S02A: "S02A :",
        S03A: "S03A :",
        S04A: "S04A :",
        T01A: "T01A :",
        T02A: "T02A :",
        S01D: "S01D :",
    };

    return (
        <>
            <text
                x="50"
                y="40"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameDevice}
                id="UID_1701153734203"
            >
                {DeviceName}
            </text>
            <text
                x="950"
                y="40"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                Last update {timeUpdate}
            </text>
            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="650"
                y="120"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {flowRate}
            </text>
            <text
                x="650"
                y="155"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {pipePressure}
            </text>
            <text
                x="650"
                y="190"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {liquidLever}
            </text>
            <text
                x="650"
                y="225"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {tankPressureAI}
            </text>
            {/* ______________________________________________________________________________________________________________________________________ */}
            <text
                x="780"
                y="120"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                SM3/H
            </text>
            <text
                x="780"
                y="155"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                M3/H
            </text>
            <text
                x="780"
                y="190"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                SM3
            </text>
            <text
                x="780"
                y="225"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                M3
            </text>

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="650"
                y="575"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {spare01AI}
            </text>
            <text
                x="650"
                y="610"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {spare02AI}
            </text>
            <text
                x="650"
                y="645"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {spare03AI}
            </text>
            <text
                x="650"
                y="680"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {spare04AI}
            </text>
            {/* ______________________________________________________________________________________________________________________________________ */}

            <text
                x="780"
                y="575"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                SM3/H
            </text>
            <text
                x="780"
                y="610"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                M3/H
            </text>
            <text
                x="780"
                y="645"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                SM3
            </text>
            <text
                x="780"
                y="680"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                M3
            </text>

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="410"
                y="120"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {temprerature01AI}
            </text>
            <text
                x="610"
                y="400"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {temprerature02AI}
            </text>
            <text
                x="1035"
                y="256"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.ValueData}
                id="UID_1701153734203"
            >
                {solenoido01Do}
            </text>

            {/*  */}

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}
            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="570"
                y="120"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.FRA}
            </text>
            <text
                x="570"
                y="155"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.PPA}
            </text>
            <text
                x="570"
                y="190"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.LLA}
            </text>
            <text
                x="570"
                y="225"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.TPA}
            </text>

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="570"
                y="575"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.S01A}
            </text>
            <text
                x="570"
                y="610"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.S02A}
            </text>
            <text
                x="570"
                y="645"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.S03A}
            </text>
            <text
                x="570"
                y="680"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.S04A}
            </text>
            {/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <text
                x="335"
                y="120"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.T01A}
            </text>
            <text
                x="530"
                y="400"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.T02A}
            </text>
            <text
                x="955"
                y="256"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameData}
                id="UID_1701153734203"
            >
                {paragraphContents.S01D}
            </text>
        </>
    );
}
