import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Position,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { edgePRU } from "./edgePRU";
import { Button } from "primereact/button";
import BallVavle_Line2_Top from "../BallVavlePRU/BallVavle_Line2_Top";
import BallVavle_Line2_Bottom from "../BallVavlePRU/BallVavle_Line2_Bottom";
import Image from "next/image";
import {
    BlackTriangle,
    GaugeTemperature,
    PTV,
    WhiteTriangleRight,
} from "./iconSVG";
import { BlackTriangleRight } from "../../ZOVC/GraphicZOVC/iconSVG";
import BallVavle_Line3_Top from "../BallVavlePRU/BallVavle_Line3_Top";
import BallVavle_Line3_Bottom from "../BallVavlePRU/BallVavle_Line3_Bottom";
import { id_CNG_PRU } from "../../data-table-device/ID-DEVICE/IdDevice";
import { readToken } from "@/service/localStorage";
import { httpApi } from "@/api/http.api";
import { Toast } from "primereact/toast";

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

const background = "#036E9B";
export const colorNameValue = "black";
export const colorData = "green";
export const borderBox = "#aad4ff";

export const backgroundGraphic = background;
export const colorIMG_none = "#000";
export const line = "#ff7f00";
export const line2 = "#ffaa00";
export const line3 = "#ffe900";

export default function GraphicPRU() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const token = readToken();
    const [data, setData] = useState<any[]>([]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const toast = useRef<Toast>(null);

    const [PIT_6001A, setPIT_6001A] = useState<string | null>(null);
    const [PIT_6001B, setPIT_6001B] = useState<string | null>(null);
    const [PIT_6002A, setPIT_6002A] = useState<string | null>(null);
    const [PIT_6002B, setPIT_6002B] = useState<string | null>(null);
    const [PIT_6003A, setPIT_6003A] = useState<string | null>(null);
    const [PIT_6003B, setPIT_6003B] = useState<string | null>(null);

    const [EVC01_TEMPERATURE, setEVC01_TEMPERATURE] = useState<string | null>(
        null
    );
    const [EVC02_TEMPERATURE, setEVC02_TEMPERATURE] = useState<string | null>(
        null
    );

    const [PCV_6001A, setPCV_6001A] = useState();
    const [PCV_6001B, setPCV_6001B] = useState();
    const [PCV_6002A, setPCV_6002A] = useState();
    const [PCV_6002B, setPCV_6002B] = useState();

    const [PSV_6001A, setPSV_6001A] = useState();
    const [PSV_6001B, setPSV_6001B] = useState();
    const [PSV_6002A, setPSV_6002A] = useState();
    const [PSV_6002B, setPSV_6002B] = useState();
    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_CNG_PRU,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        const obj_PCV_PSV = {
            entityDataCmds: [
                {
                    cmdId: 1,
                    latestCmd: {
                        keys: [
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },
                        ],
                    },
                    query: {
                        entityFilter: {
                            type: "singleEntity",
                            singleEntity: {
                                entityType: "DEVICE",
                                id: id_CNG_PRU,
                            },
                        },
                        pageLink: {
                            pageSize: 1,
                            page: 0,
                            sortOrder: {
                                key: {
                                    type: "ENTITY_FIELD",
                                    key: "createdTime",
                                },
                                direction: "DESC",
                            },
                        },
                        entityFields: [
                            {
                                type: "ENTITY_FIELD",
                                key: "name",
                            },
                            {
                                type: "ENTITY_FIELD",
                                key: "label",
                            },
                            {
                                type: "ENTITY_FIELD",
                                key: "additionalInfo",
                            },
                        ],
                        latestValues: [
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6001B",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002A",
                            },
                            {
                                type: "ATTRIBUTE",
                                key: "PCV_6002B",
                            },
                        ],
                    },
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                    ws.current?.send(JSON.stringify(obj_PCV_PSV));
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
            ws.current.onmessage = (event) => {
                let dataReceived = JSON.parse(event.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        PIT_6001A: setPIT_6001A,
                        PIT_6001B: setPIT_6001B,
                        PIT_6002A: setPIT_6002A,
                        PIT_6002B: setPIT_6002B,
                        EVC_01_Pressure: setPIT_6003A,
                        EVC_02_Pressure: setPIT_6003B,
                        EVC_01_Temperature: setEVC01_TEMPERATURE,
                        EVC_02_Temperature: setEVC02_TEMPERATURE,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }

                if (dataReceived.data && dataReceived.data.data?.length > 0) {
                    const ballValue =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001A
                            .value;
                    setPCV_6001A(ballValue);
                    const ballValueB =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6001B
                            .value;
                    setPCV_6001B(ballValueB);
                    const ballValue2B =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002B
                            .value;
                    setPCV_6002B(ballValue2B);
                    const ballValue2A =
                        dataReceived.data.data[0].latest.ATTRIBUTE.PCV_6002A
                            .value;
                    setPCV_6002A(ballValue2A);
                } else if (
                    dataReceived.update &&
                    dataReceived.update?.length > 0
                ) {
                    const updatedData =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001A.value;
                    setPCV_6001A(updatedData);
                    const updatedDataB =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6001B.value;
                    setPCV_6001B(updatedDataB);

                    const ballValue2B =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002A.value;
                    setPCV_6002A(ballValue2B);
                    const updatedData2A =
                        dataReceived.update[0].latest.ATTRIBUTE.PCV_6002B.value;
                    setPCV_6002B(updatedData2A);
                }
            };
        }
    }, [data]);

    const ValueGas = {
        SVF: "SVF",
        GVF: "GVF",
        SVA: "SVA",
        GVA: "GVA",
        PT: "PT",
        PIT_6001A: "PIT_6001A",
        PIT_6001B: "PIT_6001B",
        PIT_6002A: "PIT_6002A",
        PIT_6002B: "PIT_6002B",
        PIT_6003A: "EVC 01 Pressure",
        PIT_6003B: "EVC 02 Pressure",

        EVC_01_Temperature: "EVC 01 Temperature",
        EVC_02_Temperature: "EVC 02 Temperature",
        TT: "TT",
    };
    const KeyGas = {
        SM3H: "sm³/h",
        M3H: "m³/h",
        SM3: "sm³",
        M3: "m³",
        BAR: "Bara",
        CC: "°C",
        BARG: "BARG",
    };
    //================================ PIT_6001A================================

    const [audioPIT_6001A, setaudioPIT_6001A] = useState(false);
    const [HighPIT_6001A, setHighPIT_6001A] = useState<number | null>(null);
    const [LowPIT_6001A, setLowPIT_6001A] = useState<number | null>(null);
    const [audioColorPIT_6001A, setaudioColorPIT_6001A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6001A, setMaintainPIT_6001A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6001A === "string" &&
            typeof LowPIT_6001A === "string" &&
            PIT_6001A !== null &&
            maintainPIT_6001A === false
        ) {
            const highValue = parseFloat(HighPIT_6001A);
            const lowValue = parseFloat(LowPIT_6001A);
            const PIT_6001AValue = parseFloat(PIT_6001A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6001AValue)
            ) {
                if (highValue < PIT_6001AValue || PIT_6001AValue < lowValue) {
                    if (!audioPIT_6001A) {
                        audioRef.current?.play();
                        setaudioPIT_6001A(true);
                        setaudioColorPIT_6001A(true);
                    }
                } else {
                    setaudioPIT_6001A(false);
                    setaudioColorPIT_6001A(false);
                }
            }
        }
    }, [
        HighPIT_6001A,
        PIT_6001A,
        audioPIT_6001A,
        LowPIT_6001A,
        maintainPIT_6001A,
    ]);

    useEffect(() => {
        if (audioPIT_6001A) {
            const audioEnded = () => {
                setaudioPIT_6001A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6001A]);

    //================================ PIT_6001A======================================================

    //================================ PIT_6001B================================

    const [audioPIT_6001B, setaudioPIT_6001B] = useState(false);
    const [HighPIT_6001B, setHighPIT_6001B] = useState<number | null>(null);
    const [LowPIT_6001B, setLowPIT_6001B] = useState<number | null>(null);
    const [audioColorPIT_6001B, setaudioColorPIT_6001B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6001B, setMaintainPIT_6001B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6001B === "string" &&
            typeof LowPIT_6001B === "string" &&
            PIT_6001B !== null &&
            maintainPIT_6001B === false
        ) {
            const highValue = parseFloat(HighPIT_6001B);
            const lowValue = parseFloat(LowPIT_6001B);
            const PIT_6001BValue = parseFloat(PIT_6001B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6001BValue)
            ) {
                if (highValue < PIT_6001BValue || PIT_6001BValue < lowValue) {
                    if (!audioPIT_6001B) {
                        audioRef.current?.play();
                        setaudioPIT_6001B(true);
                        setaudioColorPIT_6001B(true);
                    }
                } else {
                    setaudioPIT_6001B(false);
                    setaudioColorPIT_6001B(false);
                }
            }
        }
    }, [
        HighPIT_6001B,
        PIT_6001B,
        audioPIT_6001B,
        LowPIT_6001B,
        maintainPIT_6001B,
    ]);

    useEffect(() => {
        if (audioPIT_6001B) {
            const audioEnded = () => {
                setaudioPIT_6001B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6001B]);

    //================================ PIT_6001B ======================================================

    //================================ PIT_6002A================================

    const [audioPIT_6002A, setaudioPIT_6002A] = useState(false);
    const [HighPIT_6002A, setHighPIT_6002A] = useState<number | null>(null);
    const [LowPIT_6002A, setLowPIT_6002A] = useState<number | null>(null);
    const [audioColorPIT_6002A, setaudioColorPIT_6002A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6002A, setMaintainPIT_6002A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6002A === "string" &&
            typeof LowPIT_6002A === "string" &&
            PIT_6002A !== null &&
            maintainPIT_6002A === false
        ) {
            const highValue = parseFloat(HighPIT_6002A);
            const lowValue = parseFloat(LowPIT_6002A);
            const PIT_6002AValue = parseFloat(PIT_6002A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6002AValue)
            ) {
                if (highValue < PIT_6002AValue || PIT_6002AValue < lowValue) {
                    if (!audioPIT_6002A) {
                        audioRef.current?.play();
                        setaudioPIT_6002A(true);
                        setaudioColorPIT_6002A(true);
                    }
                } else {
                    setaudioPIT_6002A(false);
                    setaudioColorPIT_6002A(false);
                }
            }
        }
    }, [
        HighPIT_6002A,
        PIT_6002A,
        audioPIT_6002A,
        LowPIT_6002A,
        maintainPIT_6002A,
    ]);

    useEffect(() => {
        if (audioPIT_6002A) {
            const audioEnded = () => {
                setaudioPIT_6002A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6002A]);

    //================================ PIT_6002A ======================================================

    //================================ PIT_6002B================================

    const [audioPIT_6002B, setaudioPIT_6002B] = useState(false);
    const [HighPIT_6002B, setHighPIT_6002B] = useState<number | null>(null);
    const [LowPIT_6002B, setLowPIT_6002B] = useState<number | null>(null);
    const [audioColorPIT_6002B, setaudioColorPIT_6002B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6002B, setMaintainPIT_6002B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6002B === "string" &&
            typeof LowPIT_6002B === "string" &&
            PIT_6002B !== null &&
            maintainPIT_6002B === false
        ) {
            const highValue = parseFloat(HighPIT_6002B);
            const lowValue = parseFloat(LowPIT_6002B);
            const PIT_6002BValue = parseFloat(PIT_6002B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6002BValue)
            ) {
                if (highValue < PIT_6002BValue || PIT_6002BValue < lowValue) {
                    if (!audioPIT_6002B) {
                        audioRef.current?.play();
                        setaudioPIT_6002B(true);
                        setaudioColorPIT_6002B(true);
                    }
                } else {
                    setaudioPIT_6002B(false);
                    setaudioColorPIT_6002B(false);
                }
            }
        }
    }, [
        HighPIT_6002B,
        PIT_6002B,
        audioPIT_6002B,
        LowPIT_6002B,
        maintainPIT_6002B,
    ]);

    useEffect(() => {
        if (audioPIT_6002B) {
            const audioEnded = () => {
                setaudioPIT_6002B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6002B]);

    //================================ PIT_6002B ======================================================

    //================================ PIT_6003B================================

    const [audioPIT_6003B, setaudioPIT_6003B] = useState(false);
    const [HighPIT_6003B, setHighPIT_6003B] = useState<number | null>(null);
    const [LowPIT_6003B, setLowPIT_6003B] = useState<number | null>(null);
    const [audioColorPIT_6003B, setaudioColorPIT_6003B] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6003B, setMaintainPIT_6003B] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6003B === "string" &&
            typeof LowPIT_6003B === "string" &&
            PIT_6003B !== null &&
            maintainPIT_6003B === false
        ) {
            const highValue = parseFloat(HighPIT_6003B);
            const lowValue = parseFloat(LowPIT_6003B);
            const PIT_6003BValue = parseFloat(PIT_6003B);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6003BValue)
            ) {
                if (highValue < PIT_6003BValue || PIT_6003BValue < lowValue) {
                    if (!audioPIT_6003B) {
                        audioRef.current?.play();
                        setaudioPIT_6003B(true);
                        setaudioColorPIT_6003B(true);
                    }
                } else {
                    setaudioPIT_6003B(false);
                    setaudioColorPIT_6003B(false);
                }
            }
        }
    }, [
        HighPIT_6003B,
        PIT_6003B,
        audioPIT_6003B,
        LowPIT_6003B,
        maintainPIT_6003B,
    ]);

    useEffect(() => {
        if (audioPIT_6003B) {
            const audioEnded = () => {
                setaudioPIT_6003B(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6003B]);

    //================================ PIT_6003B ======================================================

    //================================ PIT_6003A================================

    const [audioPIT_6003A, setaudioPIT_6003A] = useState(false);
    const [HighPIT_6003A, setHighPIT_6003A] = useState<number | null>(null);
    const [LowPIT_6003A, setLowPIT_6003A] = useState<number | null>(null);
    const [audioColorPIT_6003A, setaudioColorPIT_6003A] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainPIT_6003A, setMaintainPIT_6003A] = useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighPIT_6003A === "string" &&
            typeof LowPIT_6003A === "string" &&
            PIT_6003A !== null &&
            maintainPIT_6003A === false
        ) {
            const highValue = parseFloat(HighPIT_6003A);
            const lowValue = parseFloat(LowPIT_6003A);
            const PIT_6003AValue = parseFloat(PIT_6003A);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(PIT_6003AValue)
            ) {
                if (highValue < PIT_6003AValue || PIT_6003AValue < lowValue) {
                    if (!audioPIT_6003A) {
                        audioRef.current?.play();
                        setaudioPIT_6003A(true);
                        setaudioColorPIT_6003A(true);
                    }
                } else {
                    setaudioPIT_6003A(false);
                    setaudioColorPIT_6003A(false);
                }
            }
        }
    }, [
        HighPIT_6003A,
        PIT_6003A,
        audioPIT_6003A,
        LowPIT_6003A,
        maintainPIT_6003A,
    ]);

    useEffect(() => {
        if (audioPIT_6003A) {
            const audioEnded = () => {
                setaudioPIT_6003A(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioPIT_6003A]);

    //================================ PIT_6003A ======================================================

    //================================ EVC01_TEMPERATURE================================

    const [audioEVC01_TEMPERATURE, setaudioEVC01_TEMPERATURE] = useState(false);
    const [HighEVC01_TEMPERATURE, setHighEVC01_TEMPERATURE] = useState<
        number | null
    >(null);
    const [LowEVC01_TEMPERATURE, setLowEVC01_TEMPERATURE] = useState<
        number | null
    >(null);
    const [audioColorEVC01_TEMPERATURE, setaudioColorEVC01_TEMPERATURE] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC01_TEMPERATURE, setMaintainEVC01_TEMPERATURE] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC01_TEMPERATURE === "string" &&
            typeof LowEVC01_TEMPERATURE === "string" &&
            EVC01_TEMPERATURE !== null &&
            maintainEVC01_TEMPERATURE === false
        ) {
            const highValue = parseFloat(HighEVC01_TEMPERATURE);
            const lowValue = parseFloat(LowEVC01_TEMPERATURE);
            const EVC01_TEMPERATUREValue = parseFloat(EVC01_TEMPERATURE);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC01_TEMPERATUREValue)
            ) {
                if (
                    highValue < EVC01_TEMPERATUREValue ||
                    EVC01_TEMPERATUREValue < lowValue
                ) {
                    if (!audioEVC01_TEMPERATURE) {
                        audioRef.current?.play();
                        setaudioEVC01_TEMPERATURE(true);
                        setaudioColorEVC01_TEMPERATURE(true);
                    }
                } else {
                    setaudioEVC01_TEMPERATURE(false);
                    setaudioColorEVC01_TEMPERATURE(false);
                }
            }
        }
    }, [
        HighEVC01_TEMPERATURE,
        EVC01_TEMPERATURE,
        audioEVC01_TEMPERATURE,
        LowEVC01_TEMPERATURE,
        maintainEVC01_TEMPERATURE,
    ]);

    useEffect(() => {
        if (audioEVC01_TEMPERATURE) {
            const audioEnded = () => {
                setaudioEVC01_TEMPERATURE(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC01_TEMPERATURE]);

    //================================ EVC01_TEMPERATURE ======================================================
    //================================ EVC02_TEMPERATURE================================

    const [audioEVC02_TEMPERATURE, setaudioEVC02_TEMPERATURE] = useState(false);
    const [HighEVC02_TEMPERATURE, setHighEVC02_TEMPERATURE] = useState<
        number | null
    >(null);
    const [LowEVC02_TEMPERATURE, setLowEVC02_TEMPERATURE] = useState<
        number | null
    >(null);
    const [audioColorEVC02_TEMPERATURE, setaudioColorEVC02_TEMPERATURE] =
        useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const [maintainEVC02_TEMPERATURE, setMaintainEVC02_TEMPERATURE] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            typeof HighEVC02_TEMPERATURE === "string" &&
            typeof LowEVC02_TEMPERATURE === "string" &&
            EVC02_TEMPERATURE !== null &&
            maintainEVC02_TEMPERATURE === false
        ) {
            const highValue = parseFloat(HighEVC02_TEMPERATURE);
            const lowValue = parseFloat(LowEVC02_TEMPERATURE);
            const EVC02_TEMPERATUREValue = parseFloat(EVC02_TEMPERATURE);

            if (
                !isNaN(highValue) &&
                !isNaN(lowValue) &&
                !isNaN(EVC02_TEMPERATUREValue)
            ) {
                if (
                    highValue < EVC02_TEMPERATUREValue ||
                    EVC02_TEMPERATUREValue < lowValue
                ) {
                    if (!audioEVC02_TEMPERATURE) {
                        audioRef.current?.play();
                        setaudioEVC02_TEMPERATURE(true);
                        setaudioColorEVC02_TEMPERATURE(true);
                    }
                } else {
                    setaudioEVC02_TEMPERATURE(false);
                    setaudioColorEVC02_TEMPERATURE(false);
                }
            }
        }
    }, [
        HighEVC02_TEMPERATURE,
        EVC02_TEMPERATURE,
        audioEVC02_TEMPERATURE,
        LowEVC02_TEMPERATURE,
        maintainEVC02_TEMPERATURE,
    ]);

    useEffect(() => {
        if (audioEVC02_TEMPERATURE) {
            const audioEnded = () => {
                setaudioEVC02_TEMPERATURE(false);
            };
            audioRef.current?.addEventListener("ended", audioEnded);
            return () => {
                audioRef.current?.removeEventListener("ended", audioEnded);
            };
        }
    }, [audioEVC02_TEMPERATURE]);

    //================================ EVC02_TEMPERATURE ======================================================
    useEffect(() => {
        const updatedNodes = nodes.map((node) => {
            if (node.id === "PIT_6001A_DATA") {
                const roundedPT02 =
                    PIT_6001A !== null ? parseFloat(PIT_6001A).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6001A &&
                                        !maintainPIT_6001A
                                            ? "#ff5656"
                                            : maintainPIT_6001A
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6001A} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_6001B_DATA") {
                const roundedPT02 =
                    PIT_6001B !== null ? parseFloat(PIT_6001B).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6001B &&
                                        !maintainPIT_6001B
                                            ? "#ff5656"
                                            : maintainPIT_6001B
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6001B} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PIT_6002A_DATA") {
                const roundedPT02 =
                    PIT_6002A !== null ? parseFloat(PIT_6002A).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6002A &&
                                        !maintainPIT_6002A
                                            ? "#ff5656"
                                            : maintainPIT_6002A
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6002A} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_6002B_DATA") {
                const roundedPT02 =
                    PIT_6002B !== null ? parseFloat(PIT_6002B).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6002B &&
                                        !maintainPIT_6002B
                                            ? "#ff5656"
                                            : maintainPIT_6002B
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6002B} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_6003B_DATA") {
                const roundedPT02 =
                    PIT_6003B !== null ? parseFloat(PIT_6003B).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6003B &&
                                        !maintainPIT_6003B
                                            ? "#ff5656"
                                            : maintainPIT_6003B
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6003B} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "PIT_6003A_DATA") {
                const roundedPT02 =
                    PIT_6003A !== null ? parseFloat(PIT_6003A).toFixed(2) : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorPIT_6003A &&
                                        !maintainPIT_6003A
                                            ? "#ff5656"
                                            : maintainPIT_6003A
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.PIT_6003A} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "TT_LINE3_TOP_DATA") {
                const roundedPT02 =
                    EVC01_TEMPERATURE !== null
                        ? parseFloat(EVC01_TEMPERATURE).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorEVC01_TEMPERATURE &&
                                        !maintainEVC01_TEMPERATURE
                                            ? "#ff5656"
                                            : maintainEVC01_TEMPERATURE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.EVC_01_Temperature} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }
            if (node.id === "TT_LINE3_BOTTOM_DATA") {
                const roundedPT02 =
                    EVC02_TEMPERATURE !== null
                        ? parseFloat(EVC02_TEMPERATURE).toFixed(2)
                        : "";

                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    padding: 2,
                                    borderRadius: 5,
                                    fontSize: 15,
                                    fontWeight: 400,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    backgroundColor:
                                        audioColorEVC02_TEMPERATURE &&
                                        !maintainEVC02_TEMPERATURE
                                            ? "#ff5656"
                                            : maintainEVC02_TEMPERATURE
                                            ? "orange"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                // onClick={() => confirmPT_1902()}
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
                                        {ValueGas.EVC_02_Temperature} :
                                    </p>
                                    <p
                                        style={{
                                            color: colorData,
                                            marginLeft: 15,
                                        }}
                                    >
                                        {roundedPT02}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: colorNameValue,
                                        position: "relative",
                                        top: 5,
                                    }}
                                >
                                    {KeyGas.BARG}
                                </p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line2_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6001B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6001B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Top_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002A
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6002A}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            if (node.id === "PCV_line3_Bottom_DATA") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: (
                            <div
                                style={{
                                    fontSize: 15,
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: 400,
                                }}
                            >
                                <p style={{ color: colorNameValue }}>
                                    PCV 6002B
                                </p>
                                <p style={{ color: colorData }}>
                                    {" "}
                                    {PCV_6002B}{" "}
                                </p>
                                <p style={{ color: colorNameValue }}>Bar</p>
                            </div>
                        ),
                    },
                };
            }

            return node;
        });
        setNodes(updatedNodes);
    }, [data]);

    const storedPositionString = localStorage.getItem("positionPRU");

    const initialPositions = storedPositionString
        ? JSON.parse(storedPositionString)
        : {
              BallVavleLine2_Bottom: {
                  x: -1661.682672878477,
                  y: 1481.0920733587484,
              },
              BallVavleLine2_Bottom_none: {
                  x: -1650.5994566252746,
                  y: 1097.5108416746705,
              },
              BallVavleLine2_Top: {
                  x: -1664.44860296679,
                  y: 1067.0182929442992,
              },
              BallVavleLine2_Top_none: {
                  x: -1648.09187529084,
                  y: 1512.8588877121745,
              },
              BallVavleLine3_Bottom_none: {
                  x: -1041.741391119952,
                  y: 1512.874739139494,
              },
              BallVavleLine3_Top_none: {
                  x: -1041.835305416093,
                  y: 1098.6038429612424,
              },
              BallVavle_Line3_Bottom: {
                  x: -1055.7447266578888,
                  y: 1481.3573758374714,
              },
              BallVavle_Line3_Top: {
                  x: -1055.184690275061,
                  y: 1066.5277844741972,
              },
              PCV_line1_Bottom: { x: -2059.46440478068, y: 1051.690596866844 },
              PCV_line1_Bottom_SmallBallVavle: {
                  x: -1959.916081354473,
                  y: 1469.1895625081877,
              },
              PCV_line1_Bottom_none: {
                  x: -2033.416081354473,
                  y: 1480.8357187400395,
              },
              PCV_line1_Bottom_none2: {
                  x: -1948.4145711922317,
                  y: 1518.503878770942,
              },
              PCV_line1_Top: { x: -2063.2209588415735, y: 1465.9672706188694 },
              PCV_line1_Top_SmallBallVavle: {
                  x: -1955.363015032123,
                  y: 1056.514175669431,
              },
              PCV_line1_Top_none: {
                  x: -2029.3085400395037,
                  y: 1067.755196238937,
              },
              PCV_line1_Top_none2: {
                  x: -1943.863015032123,
                  y: 1106.014175669431,
              },
              PCV_line2_Bottom: {
                  x: -1588.4683688979046,
                  y: 1051.8472667971257,
              },
              PCV_line2_Bottom_DATA: {
                  x: -2108.2870218126836,
                  y: 1379.1541893713072,
              },
              PCV_line2_Bottom_SmallBallVavle: {
                  x: -1486.9036877800625,
                  y: 1056.0055835082862,
              },
              PCV_line2_Bottom_none: {
                  x: -1559.0670889230703,
                  y: 1066.5206445548827,
              },
              PCV_line2_Bottom_none2: {
                  x: -1475.720019744693,
                  y: 1104.4215156026714,
              },
              PCV_line2_Top: { x: -1589.6374674741153, y: 1464.8486249567595 },
              PCV_line2_Top_DATA: {
                  x: -2103.5752064067256,
                  y: 963.6236193186844,
              },
              PCV_line2_Top_SmallBallVavle: {
                  x: -1483.6177892854255,
                  y: 1469.3848130414924,
              },
              PCV_line2_Top_none: {
                  x: -1472.3253266041704,
                  y: 1520.498001843855,
              },
              PCV_line2_Top_none2: {
                  x: -1560.2798867415365,
                  y: 1482.2617504326024,
              },
              PCV_line3_Bottom_DATA: {
                  x: -1635.479772997573,
                  y: 1357.2032297810738,
              },
              PCV_line3_Top_DATA: {
                  x: -1633.9147192749952,
                  y: 932.8288019246183,
              },
              PIT_6001A_COL: { x: -2194.366805384612, y: 1463.874739139494 },
              PIT_6001A_DATA: { x: -2298.2195257750554, y: 1148.2720373943414 },
              PIT_6001A_IMG: { x: -2226.866805384612, y: 1400.374739139494 },
              PIT_6001A_NONE: { x: -2197.8690826568136, y: 1007.3191633358758 },
              PIT_6001B_COL: { x: -2197.6600827175034, y: 1050.3588175915195 },
              PIT_6001B_DATA: { x: -2295.305987848855, y: 1574.1161153431308 },
              PIT_6001B_IMG: { x: -2230.624481311542, y: 986.990895895738 },
              PIT_6001B_NONE: { x: -2193.7144666730205, y: 1424.0282015242046 },
              PIT_6002A_COL: { x: -1866.4577639723273, y: 1462.4297119508683 },
              PIT_6002A_DATA: { x: -1965.1320919014574, y: 1150.1494057668044 },
              PIT_6002A_IMG: { x: -1898.7568597618636, y: 1399.3826957761635 },
              PIT_6002A_NONE: { x: -1865.795938216313, y: 1009.610885120657 },
              PIT_6002B_COL: { x: -1866.073792487846, y: 1050.0079742479018 },
              PIT_6002B_DATA: { x: -1963.734241413912, y: 1574.8390393492748 },
              PIT_6002B_IMG: { x: -1898.5737924878463, y: 986.4938130080379 },
              PIT_6002B_NONE: { x: -1866.220994341128, y: 1425.5940219176825 },
              PIT_6003A_COL: { x: -1422.6213132405162, y: 1463.468095326561 },
              PIT_6003A_DATA: { x: -1538.7707636492055, y: 1153.0952635427002 },
              PIT_6003A_IMG: { x: -1455.2210748964526, y: 1400.4111483146833 },
              PIT_6003A_NONE: { x: -1424.2458626037571, y: 1021.7335838041611 },
              PIT_6003B_COL: { x: -1425.0343776799361, y: 1050.2965580409796 },
              PIT_6003B_DATA: { x: -1536.6141948782108, y: 1573.3609066613965 },
              PIT_6003B_IMG: { x: -1457.3119231476958, y: 987.4972191813588 },
              PIT_6003B_NONE: { x: -1422.6407988495287, y: 1424.3535206118927 },
              PSV_LINE2_BOTTOM: {
                  x: -1740.5499935425808,
                  y: 1021.4152979362718,
              },
              PSV_LINE2_BOTTOM_HALFCIRCLE: {
                  x: -1266.1474092778985,
                  y: 943.9517620367403,
              },
              PSV_LINE2_BOTTOM_NONE: {
                  x: -1718.3515671112975,
                  y: 1070.542505015602,
              },
              PSV_LINE2_BOTTOM_NONE1: {
                  x: -1741.7830527009469,
                  y: 1432.6252337777432,
              },
              PSV_LINE2_BOTTOM_NONE2: {
                  x: -1742.6123310219864,
                  y: 1377.8993730119664,
              },
              PSV_LINE2_BOTTOM_RIGHT: {
                  x: -1760.0864447641275,
                  y: 1002.261090283854,
              },
              PSV_LINE2_TOP: { x: -1741.762582600041, y: 1428.90071831721 },
              PSV_LINE2_TOP_HALFCIRCLE: {
                  x: -1763.0861113674155,
                  y: 950.1586579328373,
              },
              PSV_LINE2_TOP_NONE: { x: -1719.609015298378, y: 1478.4738962378 },
              PSV_LINE2_TOP_NONE1: {
                  x: -1741.292471045089,
                  y: 1024.6454245613245,
              },
              PSV_LINE2_TOP_NONE2: {
                  x: -1739.6279244378063,
                  y: 970.6923874449885,
              },
              PSV_LINE2_TOP_RIGHT: {
                  x: -1760.932470452269,
                  y: 1409.788926569184,
              },
              PSV_LINE3_BOTTOM: {
                  x: -1241.9662551779466,
                  y: 1017.2912953863099,
              },
              PSV_LINE3_BOTTOM_HALFCIRCLE: {
                  x: -1766.2849260256212,
                  y: 1357.309168723579,
              },
              PSV_LINE3_BOTTOM_NONE: {
                  x: -1212.1740869021496,
                  y: 1482.673575129763,
              },
              PSV_LINE3_BOTTOM_NONE1: {
                  x: -1234.6943213706072,
                  y: 1436.0560745736848,
              },
              PSV_LINE3_BOTTOM_NONE2: {
                  x: -1235.6368665307696,
                  y: 1382.4374704915526,
              },
              PSV_LINE3_BOTTOM_RIGHT: {
                  x: -1261.8081518592426,
                  y: 997.532009870901,
              },
              PSV_LINE3_TOP: { x: -1235.1897637926832, y: 1433.6788607117933 },
              PSV_LINE3_TOP_HALFCIRCLE: {
                  x: -1260.1083626642362,
                  y: 1361.3375074809244,
              },
              PSV_LINE3_TOP_NONE: {
                  x: -1219.9913727940623,
                  y: 1066.3862945267433,
              },
              PSV_LINE3_TOP_NONE1: {
                  x: -1243.1459580683222,
                  y: 1020.1249803904852,
              },
              PSV_LINE3_TOP_NONE2: {
                  x: -1242.4987054998287,
                  y: 963.723626602304,
              },
              PSV_LINE3_TOP_RIGHT: {
                  x: -1254.4104579359896,
                  y: 1415.3142896015559,
              },
              TT_LINE3_BOTTOM: { x: -1385.9797151172984, y: 957.0963830824246 },
              TT_LINE3_BOTTOM_COL: {
                  x: -1362.8971911342087,
                  y: 1007.3441734368228,
              },
              TT_LINE3_BOTTOM_DATA: {
                  x: -1697.0284752207394,
                  y: 1255.3437256233833,
              },
              TT_LINE3_BOTTOM_NONE: {
                  x: -1361.3563019384721,
                  y: 1396.8762550311894,
              },
              TT_LINE3_TOP: { x: -1384.3876204395422, y: 1377.3823609961598 },
              TT_LINE3_TOP_COL: {
                  x: -1360.9590194746786,
                  y: 1427.2945127887838,
              },
              TT_LINE3_TOP_DATA: {
                  x: -1696.9692364646844,
                  y: 831.6603912826675,
              },
              TT_LINE3_TOP_NONE: {
                  x: -1362.8266325377226,
                  y: 977.2539852046791,
              },
              bor1: { x: -2700.9096316888476, y: 759.3243394936028 },
              bor2: { x: -363.1512218888312, y: 767.8994423073616 },
              bor3: { x: -2684.8078213113167, y: 1892.894788044694 },
              bor4: { x: -356.4329469573597, y: 1859.0590100592938 },
              line1: { x: -2407.3097089925586, y: 1684.7936897594798 },
              line2: { x: -2407.050402509801, y: 1563.500870252391 },
              line3: { x: -2030.8329144167883, y: 1098.5296705520232 },
              line4: { x: -2033.455135048047, y: 1512.635009158724 },
              line5: { x: -1559.5270533882806, y: 1098.3740496757796 },
              line6: { x: -1559.7769633031824, y: 1512.7897157412472 },
              line7: { x: -1037.2523044337722, y: 1098.3970630005836 },
              line8: { x: -1037.4547238233984, y: 1512.874739139494 },
              line9: { x: -857.0596312479826, y: 1298.254701596991 },
          };

    const [positions, setPositions] = useState(initialPositions);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const [edges, setEdges, onEdgesChange] = useEdgesState<any>(edgePRU);

    const [initialNodes, setInitialNodes] = useState([
        // ============================== line =========================================
        {
            id: "bor1",
            position: positions.bor1,
            type: "custom",
            data: {
                label: <div>b1</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor2",
            position: positions.bor2,
            type: "custom",
            data: {
                label: <div>b2</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor3",
            position: positions.bor3,
            type: "custom",
            data: {
                label: <div>b3</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 30, height: 10, background: line },
        },
        {
            id: "bor4",
            position: positions.bor4,
            type: "custom",
            data: {
                label: <div>b4</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },

        //==================================================================
        {
            id: "line1",
            position: positions.line1,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Left,
            style: { border: "none", width: 10, height: 10, background: line },
        },
        {
            id: "line2",
            position: positions.line2,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
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
            style: { border: "none", width: 10, height: 10, background: line },
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
                width: 10,
                height: 10,
                background: "none",
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
                width: 10,
                height: 10,
                background: "none",
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
            style: { border: "none", width: 10, height: 10, background: line },
        },

        //==========================Ball vavle line 2  ==========================
        {
            id: "BallVavleLine2_Top_none",
            position: positions.BallVavleLine2_Top_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine2_Bottom_none",
            position: positions.BallVavleLine2_Bottom_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine2_Top",
            position: positions.BallVavleLine2_Top,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line2_Top />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "BallVavleLine2_Bottom",
            position: positions.BallVavleLine2_Bottom,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line2_Bottom />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        //==========================Ball vavle line 3  ==========================
        {
            id: "BallVavleLine3_Top_none",
            position: positions.BallVavleLine3_Top_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavleLine3_Bottom_none",
            position: positions.BallVavleLine3_Bottom_none,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 43,
                height: 10,
                background: background,
            },
        },
        {
            id: "BallVavle_Line3_Top",
            position: positions.BallVavle_Line3_Top,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line3_Top />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "BallVavle_Line3_Bottom",
            position: positions.BallVavle_Line3_Bottom,
            type: "custom",
            data: {
                label: (
                    <div>
                        <BallVavle_Line3_Bottom />
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        //==========================Ball vavle ==========================

        {
            id: "PCV_line2_Top",
            position: positions.PCV_line2_Top,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "PCV_line2_Bottom",
            position: positions.PCV_line2_Bottom,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line1_Top",
            position: positions.PCV_line1_Top,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },
        {
            id: "PCV_line1_Bottom",
            position: positions.PCV_line1_Bottom,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "#333333",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line1_Bottom_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Bottom_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line1_Top_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Top_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_line2_Bottom_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line2_Bottom_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line2_Top_none",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line2_Top_none,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_line1_Bottom_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Bottom_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line1_Top_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line1_Top_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
        },

        {
            id: "PCV_line2_Bottom_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line2_Bottom_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },
        {
            id: "PCV_line2_Top_none2",
            data: {
                label: <div></div>,
            },

            position: positions.PCV_line2_Top_none2,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Top,
            sourcePosition: Position.Top,
        },

        {
            id: "PCV_line1_Bottom_SmallBallVavle",
            position: positions.PCV_line1_Bottom_SmallBallVavle,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line1_Top_SmallBallVavle",
            position: positions.PCV_line1_Top_SmallBallVavle,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line2_Top_SmallBallVavle",
            position: positions.PCV_line2_Top_SmallBallVavle,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line2_Bottom_SmallBallVavle",
            position: positions.PCV_line2_Bottom_SmallBallVavle,
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

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                background: background,
                width: 1,
                height: 1,
            },
            zIndex: 9999,
        },

        {
            id: "PCV_line2_Top_DATA",
            position: positions.PCV_line2_Top_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 170,
                height: 45,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
        },

        {
            id: "PCV_line2_Bottom_DATA",
            position: positions.PCV_line2_Bottom_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 170,
                height: 45,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },

        {
            id: "PCV_line3_Top_DATA",
            position: positions.PCV_line3_Top_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 170,
                height: 45,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
        },

        {
            id: "PCV_line3_Bottom_DATA",
            position: positions.PCV_line3_Bottom_DATA,
            type: "custom",
            data: {
                label: <div></div>,
            },

            style: {
                border: background,
                width: 170,
                height: 45,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Bottom,
        },
        //==============PIT ===================

        {
            id: "PIT_6001A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6001A_IMG,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6001B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6001B_IMG,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6002A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6002A_IMG,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6002B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6002B_IMG,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6003A_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6003A_IMG,
            zIndex: 9999,
            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6003B_IMG",
            data: {
                label: <div>{PTV}</div>,
            },

            position: positions.PIT_6003B_IMG,
            zIndex: 9999,

            style: {
                background: background,
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6001A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001A_COL,
            zIndex: 9999,
            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6001B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001B_COL,
            zIndex: 9999,

            style: {
                background: line,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6002A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002A_COL,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6002B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002B_COL,
            zIndex: 9999,

            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6003A_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6003A_COL,
            zIndex: 9999,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6003B_COL",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6003B_COL,
            zIndex: 9999,

            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 60,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6001A_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6001A_DATA,

            style: {
                border: background,
                width: 220,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6001B_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6001B_DATA,

            style: {
                border: background,
                width: 220,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6002A_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6002A_DATA,

            style: {
                border: background,
                width: 220,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6002B_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6002B_DATA,

            style: {
                border: background,
                width: 220,

                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "PIT_6003A_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6003A_DATA,

            style: {
                border: background,
                width: 250,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },
        {
            id: "PIT_6003B_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.PIT_6003B_DATA,

            style: {
                border: background,
                width: 250,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Top,
        },

        {
            id: "PIT_6001A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001A_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6001B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6001B_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6002A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002A_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6002B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6002B_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PIT_6003A_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6003A_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PIT_6003B_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PIT_6003B_NONE,
            zIndex: 9999,

            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 0,
            },
            targetPosition: Position.Bottom,
        },

        //===========================  TT LINE ==================================

        {
            id: "TT_LINE3_TOP_COL",
            position: positions.TT_LINE3_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 100,
                background: line3,
            },
        },
        {
            id: "TT_LINE3_BOTTOM_COL",
            position: positions.TT_LINE3_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 100,
                background: line3,
            },
        },
        {
            id: "TT_LINE3_TOP",
            position: positions.TT_LINE3_TOP,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "TT_LINE3_BOTTOM",
            position: positions.TT_LINE3_BOTTOM,
            type: "custom",
            data: {
                label: <div>{GaugeTemperature}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        //================================  ==================================

        {
            id: "TT_LINE3_TOP_COL",
            position: positions.TT_LINE3_TOP_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,

            style: {
                border: "none",
                width: 10,
                height: 100,
                background: line3,
            },
        },
        {
            id: "TT_LINE3_BOTTOM_COL",
            position: positions.TT_LINE3_BOTTOM_COL,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 100,
                background: line3,
            },
        },

        {
            id: "TT_LINE3_BOTTOM_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TT_LINE3_BOTTOM_DATA,

            style: {
                border: background,
                width: 285,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },
        {
            id: "TT_LINE3_BOTTOM_NONE",
            position: positions.TT_LINE3_BOTTOM_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Top,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "TT_LINE3_TOP_DATA",
            data: {
                label: (
                    <div
                        style={{
                            color: "green",
                            fontSize: 25,
                            fontWeight: 600,
                        }}
                    >
                        {" "}
                    </div>
                ),
            },
            position: positions.TT_LINE3_TOP_DATA,

            style: {
                border: background,
                width: 285,
                background: borderBox,
                boxShadow: "0px 0px 30px 0px  rgba(0, 255, 255, 1)", // Thêm box shadow với màu (0, 255, 255)
            },
            sourcePosition: Position.Right,
        },
        {
            id: "TT_LINE3_TOP_NONE",
            position: positions.TT_LINE3_TOP_NONE,
            type: "custom",
            data: {
                label: <div></div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Top,
            style: {
                width: 10,
                height: 10,
                background: "none",
            },
        },
        //========================== PSV line 2  ========================

        {
            id: "PSV_LINE2_TOP",
            position: positions.PSV_LINE2_TOP,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            zIndex: 9999,

            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_BOTTOM",
            position: positions.PSV_LINE2_BOTTOM,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            zIndex: 9999,

            targetPosition: Position.Left,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE2_TOP_RIGHT",
            position: positions.PSV_LINE2_TOP_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_BOTTOM_RIGHT",
            position: positions.PSV_LINE2_BOTTOM_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE2_TOP_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_LINE2_BOTTOM_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE,
            zIndex: 9999,
            style: {
                background: line2,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE2_BOTTOM_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE2_BOTTOM_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE2_TOP_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE2_TOP_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        //=====================================

        {
            id: "PSV_LINE2_TOP_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE2_TOP_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_TOP_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        {
            id: "PSV_LINE2_BOTTOM_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE2_BOTTOM_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE2_BOTTOM_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        //========================== PSV line 3  ========================

        {
            id: "PSV_LINE3_TOP_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },
        {
            id: "PSV_LINE3_BOTTOM_NONE",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE,
            style: {
                background: line3,
                border: "none",
                width: "10px",

                height: 40,
            },
            targetPosition: Position.Bottom,
        },

        //------------------------------
        {
            id: "PSV_LINE3_TOP_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE3_TOP_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_TOP_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },

        {
            id: "PSV_LINE3_BOTTOM_NONE1",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE1,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            sourcePosition: Position.Left,
        },
        {
            id: "PSV_LINE3_BOTTOM_NONE2",
            data: {
                label: <div></div>,
            },

            position: positions.PSV_LINE3_BOTTOM_NONE2,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Left,
        },
        //------------------------------

        {
            id: "PSV_LINE3_TOP",
            position: positions.PSV_LINE3_TOP,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE3_BOTTOM",
            position: positions.PSV_LINE3_BOTTOM,
            type: "custom",
            data: {
                label: <div>{BlackTriangle}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE3_TOP_RIGHT",
            position: positions.PSV_LINE3_TOP_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,

            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },
        {
            id: "PSV_LINE3_BOTTOM_RIGHT",
            position: positions.PSV_LINE3_BOTTOM_RIGHT,
            type: "custom",
            data: {
                label: <div>{BlackTriangleRight}</div>,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            zIndex: 9999,
            style: {
                border: "none",
                width: 10,
                height: 10,
                background: "none",
            },
        },

        {
            id: "PSV_LINE3_BOTTOM_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE3_BOTTOM_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
        },

        {
            id: "PSV_LINE3_TOP_HALFCIRCLE",
            data: {
                label: <div>{WhiteTriangleRight}</div>,
            },

            position: positions.PSV_LINE3_TOP_HALFCIRCLE,
            zIndex: 9999,
            style: {
                background: "none",
                border: "none",
                width: "10px",

                height: 10,
            },
            targetPosition: Position.Bottom,
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
                if (id === "bor1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor1: position,
                    }));
                } else if (id === "bor2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor2: position,
                    }));
                } else if (id === "bor3") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor3: position,
                    }));
                } else if (id === "bor4") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        bor4: position,
                    }));
                } else if (id === "line1") {
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
                }

                //======================= BallVavle 2 ====================================
                else if (id === "BallVavleLine2_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Top: position,
                    }));
                } else if (id === "BallVavleLine2_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Bottom: position,
                    }));
                } else if (id === "BallVavleLine2_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Top_none: position,
                    }));
                } else if (id === "BallVavleLine2_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine2_Bottom_none: position,
                    }));
                }

                //======================= BallVavle 3 ====================================
                else if (id === "BallVavle_Line3_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavle_Line3_Top: position,
                    }));
                } else if (id === "BallVavle_Line3_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavle_Line3_Bottom: position,
                    }));
                } else if (id === "BallVavleLine3_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine3_Top_none: position,
                    }));
                } else if (id === "BallVavleLine3_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        BallVavleLine3_Bottom_none: position,
                    }));
                }

                //======================= BallVavle ====================================
                else if (id === "PCV_line2_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top: position,
                    }));
                } else if (id === "PCV_line2_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom: position,
                    }));
                } else if (id === "PCV_line1_Top") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top: position,
                    }));
                } else if (id === "PCV_line1_Bottom") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom: position,
                    }));
                } else if (id === "PCV_line1_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_none: position,
                    }));
                } else if (id === "PCV_line1_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_none: position,
                    }));
                } else if (id === "PCV_line2_Bottom_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom_none: position,
                    }));
                } else if (id === "PCV_line2_Top_none") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top_none: position,
                    }));
                } else if (id === "PCV_line1_Bottom_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_none2: position,
                    }));
                } else if (id === "PCV_line1_Top_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_none2: position,
                    }));
                } else if (id === "PCV_line2_Bottom_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom_none2: position,
                    }));
                } else if (id === "PCV_line2_Top_none2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top_none2: position,
                    }));
                } else if (id === "PCV_line1_Bottom_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Bottom_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line2_Bottom_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line2_Top_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line1_Top_SmallBallVavle") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line1_Top_SmallBallVavle: position,
                    }));
                } else if (id === "PCV_line2_Top_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Top_DATA: position,
                    }));
                } else if (id === "PCV_line3_Top_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line3_Top_DATA: position,
                    }));
                } else if (id === "PCV_line2_Bottom_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line2_Bottom_DATA: position,
                    }));
                } else if (id === "PCV_line3_Bottom_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PCV_line3_Bottom_DATA: position,
                    }));
                }
                //======================= BallVavle ====================================
                else if (id === "PIT_6002A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_IMG: position,
                    }));
                } else if (id === "PIT_6002B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_IMG: position,
                    }));
                } else if (id === "PIT_6001A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_IMG: position,
                    }));
                } else if (id === "PIT_6001B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_IMG: position,
                    }));
                } else if (id === "PIT_6003A_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003A_IMG: position,
                    }));
                } else if (id === "PIT_6003B_IMG") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003B_IMG: position,
                    }));
                } else if (id === "PIT_6003A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003A_COL: position,
                    }));
                } else if (id === "PIT_6003B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003B_COL: position,
                    }));
                } else if (id === "PIT_6002A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_COL: position,
                    }));
                } else if (id === "PIT_6002B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_COL: position,
                    }));
                } else if (id === "PIT_6001A_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_COL: position,
                    }));
                } else if (id === "PIT_6001B_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_COL: position,
                    }));
                } else if (id === "PIT_6001A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_DATA: position,
                    }));
                } else if (id === "PIT_6001B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_DATA: position,
                    }));
                } else if (id === "PIT_6002A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_DATA: position,
                    }));
                } else if (id === "PIT_6002B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_DATA: position,
                    }));
                } else if (id === "PIT_6003A_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003A_DATA: position,
                    }));
                } else if (id === "PIT_6003B_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003B_DATA: position,
                    }));
                } else if (id === "PIT_6001A_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001A_NONE: position,
                    }));
                } else if (id === "PIT_6001B_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6001B_NONE: position,
                    }));
                } else if (id === "PIT_6002A_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002A_NONE: position,
                    }));
                } else if (id === "PIT_6002B_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6002B_NONE: position,
                    }));
                } else if (id === "PIT_6003A_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003A_NONE: position,
                    }));
                } else if (id === "PIT_6003B_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PIT_6003B_NONE: position,
                    }));
                }

                //======================= BallVavle ====================================
                else if (id === "TT_LINE3_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_TOP: position,
                    }));
                } else if (id === "TT_LINE3_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_BOTTOM: position,
                    }));
                } else if (id === "TT_LINE3_TOP_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_TOP_COL: position,
                    }));
                } else if (id === "TT_LINE3_BOTTOM_COL") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_BOTTOM_COL: position,
                    }));
                } else if (id === "TT_LINE3_TOP_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_TOP_DATA: position,
                    }));
                } else if (id === "TT_LINE3_BOTTOM_DATA") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_BOTTOM_DATA: position,
                    }));
                } else if (id === "TT_LINE3_TOP_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_TOP_NONE: position,
                    }));
                } else if (id === "TT_LINE3_BOTTOM_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        TT_LINE3_BOTTOM_NONE: position,
                    }));
                }

                // ========================= PSV LINE 2  ===============================
                else if (id === "PSV_LINE2_TOP_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE1: position,
                    }));
                } else if (id === "PSV_LINE2_TOP_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_TOP_NONE2: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE1: position,
                    }));
                } else if (id === "PSV_LINE2_BOTTOM_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE2_BOTTOM_NONE2: position,
                    }));
                }

                // ========================= PSV LINE 2  ===============================
                else if (id === "PSV_LINE3_TOP_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE: position,
                    }));
                } else if (id === "PSV_LINE3_TOP") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_RIGHT") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_RIGHT: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE1: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_NONE2: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE1") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE1: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_NONE2") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_NONE2: position,
                    }));
                } else if (id === "PSV_LINE3_BOTTOM_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_BOTTOM_HALFCIRCLE: position,
                    }));
                } else if (id === "PSV_LINE3_TOP_HALFCIRCLE") {
                    setPositions((prevPositions: any) => ({
                        ...prevPositions,
                        PSV_LINE3_TOP_HALFCIRCLE: position,
                    }));
                }
                // ========================= Data  ===============================

                //========================== pit line 1 =========================
            }
        },
        [setNodes, setPositions, editingEnabled]
    );
    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    };

    useEffect(() => {
        localStorage.setItem("positionPRU", JSON.stringify(positions));
    }, [positions]);

    return (
        <>
            {PCV_6001A} {PCV_6001B}
            <Button onClick={toggleEditing}>
                {editingEnabled ? <span>SAVE</span> : <span>EDIT</span>}
            </Button>
            <div
                style={{
                    // width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    alignItems: "center",
                    background: background,
                }}
            >
                {!editingEnabled && (
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
                )}

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    // nodesDraggable={true} // Cho phép kéo thả các nút
                    fitView
                    minZoom={0.5}
                    maxZoom={2}
                >
                    <Controls style={{ position: "absolute", top: 0 }} />

                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
