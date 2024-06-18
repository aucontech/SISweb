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
                        EVC_01_Vm_Adjustable_Counter: setGVA1,

                        EVC_02_Flow_at_Measurement_Condition: setGVF2,
                        EVC_02_Flow_at_Base_Condition: setSVF2,
                        EVC_02_Volume_at_Base_Condition: setSVA2,
                        EVC_02_Vm_Adjustable_Counter: setGVA2,

                        time: setTimeUpdate,


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
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/values/attributes/SERVER_SCOPE"
            );
    
            const highEK1PressureItem = res.data.find((item: any) => item.key === "High_EK1_Pressure");
            setHighEK1PressureValue(highEK1PressureItem?.value || null);
            const lowEK1PressureItem = res.data.find((item: any) => item.key === "Low_EK1_Pressure");
            setLowEK1PressureValue(lowEK1PressureItem?.value || null);

            const highEK2PressureItem = res.data.find((item: any) => item.key === "High_EK2_Pressure");
            setHighEK2PressureValue(highEK2PressureItem?.value || null);
            const lowEK2PressureItem = res.data.find((item: any) => item.key === "Low_EK2_Pressure");
            setLowEK2PressureValue(lowEK2PressureItem?.value || null);

            const highEK3PressureItem = res.data.find((item: any) => item.key === "High_EK3_Pressure");
            setHighEK3PressureValue(highEK3PressureItem?.value || null);
            const lowEK3PressureItem = res.data.find((item: any) => item.key === "Low_EK3_Pressure");
            setLowEK3PressureValue(lowEK3PressureItem?.value || null);


            const HighGD01 = res.data.find((item: any) => item.key === "GD_High_1");
            setHighGD01(HighGD01?.value || null);
            const LowGD01 = res.data.find((item: any) => item.key === "GD_Low_1");
            setLowGD01(LowGD01?.value || null);

            const HighGD02 = res.data.find((item: any) => item.key === "GD_High_2");
            setHighGD02(HighGD02?.value || null);
            const LowGD02 = res.data.find((item: any) => item.key === "GD_Low_2");
            setLowGD02(LowGD02?.value || null);

            const HighGD03 = res.data.find((item: any) => item.key === "GD_High_3");
            setHighGD03(HighGD03?.value || null);
            const LowGD03 = res.data.find((item: any) => item.key === "GD_Low_3");
            setLowGD03(LowGD03?.value || null);

            const HighGVF1 = res.data.find((item: any) => item.key === "GVF1_High");
            setHighGVF1(HighGVF1?.value || null);
            const LowGVF1 = res.data.find((item: any) => item.key === "GVF1_Low");
            setLowGVF1(LowGVF1?.value || null);

            const HighSVF1 = res.data.find((item: any) => item.key === "SVF1_High");
            setHighSVF1(HighSVF1?.value || null);
            const LowSVF1 = res.data.find((item: any) => item.key === "SVF1_Low");
            setLowSVF1(LowSVF1?.value || null);

            const HighSVA1 = res.data.find((item: any) => item.key === "SVA1_High");
            setHighSVA1(HighSVA1?.value || null);
            const LowSVA1 = res.data.find((item: any) => item.key === "SVA1_Low");
            setLowSVA1(LowSVA1?.value || null);

            const HighGVA1 = res.data.find((item: any) => item.key === "GVA1_High");
            setHighGVA1(HighGVA1?.value || null);
            const LowGVA1 = res.data.find((item: any) => item.key === "GVA1_Low");
            setLowGVA1(LowGVA1?.value || null);

            const HighGVF2 = res.data.find((item: any) => item.key === "GVF2_High");
            setHighGVF2(HighGVF2?.value || null);
            const LowGVF2 = res.data.find((item: any) => item.key === "GVF2_Low");
            setLowGVF2(LowGVF2?.value || null);

            const HighSVF2 = res.data.find((item: any) => item.key === "SVF2_High");
            setHighSVF2(HighSVF2?.value || null);
            const LowSVF2 = res.data.find((item: any) => item.key === "SVF2_Low");
            setLowSVF2(LowSVF2?.value || null);

            const HighSVA2 = res.data.find((item: any) => item.key === "SVA2_High");
            setHighSVA2(HighSVA2?.value || null);
            const LowSVA2 = res.data.find((item: any) => item.key === "SVA2_Low");
            setLowSVA2(LowSVA2?.value || null);

            const HighGVA2 = res.data.find((item: any) => item.key === "GVA2_High");
            setHighGVA2(HighGVA2?.value || null);
            const LowGVA2 = res.data.find((item: any) => item.key === "GVA2_Low");
            setLowGVA2(LowGVA2?.value || null);
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


    useEffect(() => {
        if (typeof highEK1PressureValue === 'string' && typeof lowEK1PressureValue === 'string' && PT02 !== null) {
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
    }, [highEK1PressureValue, PT02, audioPlaying, lowEK1PressureValue]);

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

// ========================== PT 1901 ============================================

// ========================== PT 1902 ============================================


const [PT03, setPT03] = useState<string | null>(null);
const [audioPlaying2, setAudioPlaying2] = useState(false);
const [inputValueEK2Hight, setInputValueEK2High] = useState<any>();
const [inputValueEK1Low, setInputValueEK2Low] = useState<any>();
const [highEK2PressureValue, setHighEK2PressureValue] = useState<number | null>(null);
const [lowEK2PressureValue, setLowEK2PressureValue] = useState<number | null>(null);
const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng



    useEffect(() => {
        if (typeof highEK2PressureValue === 'string' && typeof lowEK2PressureValue === 'string' && PT03 !== null) {
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
    }, [highEK2PressureValue, PT03, audioPlaying2, lowEK2PressureValue]);

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


// ========================== PT 1902 ============================================

// ========================== PT 1903 ============================================

const [PT01, setPT01] = useState<string | null>(null);
const [audioPlaying3, setAudioPlaying3] = useState(false);
const [inputValueEK3Hight, setInputValueEK3High] = useState<any>();
const [inputValueEK3Low, setInputValueEK3Low] = useState<any>();
const [highEK3PressureValue, setHighEK3PressureValue] = useState<number | null>(null);
const [lowEK3PressureValue, setLowEK3PressureValue] = useState<number | null>(null);
const [exceedThreshold3, setExceedThreshold3] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof highEK3PressureValue === 'string' && typeof lowEK3PressureValue === 'string' && PT01 !== null) {
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
    }, [highEK3PressureValue, PT01, audioPlaying3, lowEK3PressureValue]);

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


// ========================== PT 1903 ============================================

// ========================== GD_01 ============================================

const [GD01, setGD01] = useState<string | null>(null);
const [AudioGD01, setAudioGD01] = useState(false);
const [inputHighGD01, setInputHighGD01] = useState<any>();
const [inputLowGD01, setInputLowGD01] = useState<any>();
const [HighGD01, setHighGD01] = useState<number | null>(null);
const [LowGD01, setLowGD01] = useState<number | null>(null);
const [AlarmGD01, setAlarmGD01] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGD01 === 'string' && typeof LowGD01 === 'string' && GD01 !== null) {
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
    }, [HighGD01, GD01, AudioGD01, LowGD01]);

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


// ========================== GD_01 ============================================

// ========================== GD_02 ============================================
const [GD02, setGD02] = useState<string | null>(null);
const [AudioGD02, setAudioGD02] = useState(false);
const [inputHighGD02, setInputHighGD02] = useState<any>();
const [inputLowGD02, setInputLowGD02] = useState<any>();
const [HighGD02, setHighGD02] = useState<number | null>(null);
const [LowGD02, setLowGD02] = useState<number | null>(null);
const [AlarmGD02, setAlarmGD02] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGD02 === 'string' && typeof LowGD02 === 'string' && GD02 !== null) {
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
    }, [HighGD02, GD02, AudioGD02, LowGD02]);

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

// ========================== GD_02 ============================================


// ========================== GD_03 ============================================
const [GD03, setGD03] = useState<string | null>(null);
const [AudioGD03, setAudioGD03] = useState(false);
const [inputHighGD03, setInputHighGD03] = useState<any>();
const [inputLowGD03, setInputLowGD03] = useState<any>();
const [HighGD03, setHighGD03] = useState<number | null>(null);
const [LowGD03, setLowGD03] = useState<number | null>(null);
const [AlarmGD03, setAlarmGD03] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGD03 === 'string' && typeof LowGD03 === 'string' && GD03 !== null) {
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
    }, [HighGD03, GD03, AudioGD03, LowGD03]);

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

// ========================== GD_03 ============================================


// ========================== GVF1- FIQ-1901  ============================================
const [GVF1, setGVF1] = useState<string | null>(null);
const [AudioGVF1, setAudioGVF1] = useState(false);
const [inputHighGVF1, setInputHighGVF1] = useState<any>();
const [inputLowGVF1, setInputLowGVF1] = useState<any>();
const [HighGVF1, setHighGVF1] = useState<number | null>(null);
const [LowGVF1, setLowGVF1] = useState<number | null>(null);
const [AlarmGVF1, setAlarmGVF1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGVF1 === 'string' && typeof LowGVF1 === 'string' && GVF1 !== null) {
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
    }, [HighGVF1, GVF1, AudioGVF1, LowGVF1]);

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

// ========================== GVF1- FIQ-1901 ============================================

// ========================== SVF1- FIQ-1901  ============================================
const [SVF1, setSVF1] = useState<string | null>(null);
const [AudioSVF1, setAudioSVF1] = useState(false);
const [inputHighSVF1, setInputHighSVF1] = useState<any>();
const [inputLowSVF1, setInputLowSVF1] = useState<any>();
const [HighSVF1, setHighSVF1] = useState<number | null>(null);
const [LowSVF1, setLowSVF1] = useState<number | null>(null);
const [AlarmSVF1, setAlarmSVF1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighSVF1 === 'string' && typeof LowSVF1 === 'string' && SVF1 !== null) {
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
    }, [HighSVF1, SVF1, AudioSVF1, LowSVF1]);

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

// ========================== SVF1- FIQ-1901 ============================================


// ========================== SVA1- FIQ-1901  ============================================
const [SVA1, setSVA1] = useState<string | null>(null);
const [AudioSVA1, setAudioSVA1] = useState(false);
const [inputHighSVA1, setInputHighSVA1] = useState<any>();
const [inputLowSVA1, setInputLowSVA1] = useState<any>();
const [HighSVA1, setHighSVA1] = useState<number | null>(null);
const [LowSVA1, setLowSVA1] = useState<number | null>(null);
const [AlarmSVA1, setAlarmSVA1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighSVA1 === 'string' && typeof LowSVA1 === 'string' && SVA1 !== null) {
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
    }, [HighSVA1, SVA1, AudioSVA1, LowSVA1]);

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

// ========================== SVA1- FIQ-1901 ============================================

// ========================== GVA1- FIQ-1901  ============================================
const [GVA1, setGVA1] = useState<string | null>(null);
const [AudioGVA1, setAudioGVA1] = useState(false);
const [inputHighGVA1, setInputHighGVA1] = useState<any>();
const [inputLowGVA1, setInputLowGVA1] = useState<any>();
const [HighGVA1, setHighGVA1] = useState<number | null>(null);
const [LowGVA1, setLowGVA1] = useState<number | null>(null);
const [AlarmGVA1, setAlarmGVA1] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGVA1 === 'string' && typeof LowGVA1 === 'string' && GVA1 !== null) {
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
    }, [HighGVA1, GVA1, AudioGVA1, LowGVA1]);

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

// ========================== GVA1- FIQ-1901 ============================================

// ========================== GVF2- FIQ-19012 ============================================
const [GVF2, setGVF2] = useState<string | null>(null);
const [AudioGVF2, setAudioGVF2] = useState(false);
const [inputHighGVF2, setInputHighGVF2] = useState<any>();
const [inputLowGVF2, setInputLowGVF2] = useState<any>();
const [HighGVF2, setHighGVF2] = useState<number | null>(null);
const [LowGVF2, setLowGVF2] = useState<number | null>(null);
const [AlarmGVF2, setAlarmGVF2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGVF2 === 'string' && typeof LowGVF2 === 'string' && GVF2 !== null) {
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
    }, [HighGVF2, GVF2, AudioGVF2, LowGVF2]);

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

// ========================== GVF2- FIQ-1902 ============================================

// ========================== SVF2- FIQ-1902  ============================================
const [SVF2, setSVF2] = useState<string | null>(null);
const [AudioSVF2, setAudioSVF2] = useState(false);
const [inputHighSVF2, setInputHighSVF2] = useState<any>();
const [inputLowSVF2, setInputLowSVF2] = useState<any>();
const [HighSVF2, setHighSVF2] = useState<number | null>(null);
const [LowSVF2, setLowSVF2] = useState<number | null>(null);
const [AlarmSVF2, setAlarmSVF2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighSVF2 === 'string' && typeof LowSVF2 === 'string' && SVF2 !== null) {
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
    }, [HighSVF2, SVF2, AudioSVF2, LowSVF2]);

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

// ========================== SVF2- FIQ-1902 ============================================


// ========================== SVA2- FIQ-1902  ============================================
const [SVA2, setSVA2] = useState<string | null>(null);
const [AudioSVA2, setAudioSVA2] = useState(false);
const [inputHighSVA2, setInputHighSVA2] = useState<any>();
const [inputLowSVA2, setInputLowSVA2] = useState<any>();
const [HighSVA2, setHighSVA2] = useState<number | null>(null);
const [LowSVA2, setLowSVA2] = useState<number | null>(null);
const [AlarmSVA2, setAlarmSVA2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighSVA2 === 'string' && typeof LowSVA2 === 'string' && SVA2 !== null) {
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
    }, [HighSVA2, SVA2, AudioSVA2, LowSVA2]);

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

// ========================== SVA2- FIQ-1902 ============================================

// ========================== GVA2- FIQ-1902  ============================================
const [GVA2, setGVA2] = useState<string | null>(null);
const [AudioGVA2, setAudioGVA2] = useState(false);
const [inputHighGVA2, setInputHighGVA2] = useState<any>();
const [inputLowGVA2, setInputLowGVA2] = useState<any>();
const [HighGVA2, setHighGVA2] = useState<number | null>(null);
const [LowGVA2, setLowGVA2] = useState<number | null>(null);
const [AlarmGVA2, setAlarmGVA2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    useEffect(() => {
        if (typeof HighGVA2 === 'string' && typeof LowGVA2 === 'string' && GVA2 !== null) {
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
    }, [HighGVA2, GVA2, AudioGVA2, LowGVA2]);

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

// ========================== GVA2- FIQ-1901 ============================================

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
        ]);
    
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                { High_EK1_Pressure: inputValue,Low_EK1_Pressure:inputValue2,
                    High_EK2_Pressure: inputValueEK2Hight, Low_EK2_Pressure:inputValueEK1Low,
                    High_EK3_Pressure:inputValueEK3Hight, Low_EK3_Pressure:inputValueEK3Low,
                
                    GD_High_1:inputHighGD01, GD_Low_1:inputLowGD01,
                    GD_High_2:inputHighGD02, GD_Low_2:inputLowGD02,
                    GD_High_3:inputHighGD03, GD_Low_3:inputLowGD03,


                    GVF1_High:inputHighGVF1, GVF1_Low:inputLowGVF1,
                    SVF1_High:inputHighSVF1, SVF1_Low:inputLowSVF1,
                    SVA1_High:inputHighSVA1, SVA1_Low:inputLowSVA1,
                    GVA1_High:inputHighGVA1, GVA1_Low:inputLowGVA1,


                    GVF2_High:inputHighGVF2, GVF2_Low:inputLowGVF2,
                    SVF2_High:inputHighSVF2, SVF2_Low:inputLowSVF2,
                    SVA2_High:inputHighSVA2, SVA2_Low:inputLowSVA2,
                    GVA2_High:inputHighGVA2, GVA2_Low:inputLowGVA2,
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
        } catch (error) {
            console.log("error: ", error);
           
        }
    };


      const combineCss = {
            CSSpt02 : {
                color:exceedThreshold ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSSpt03 : {
                color:exceedThreshold2 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSSpt01 : {
                color:exceedThreshold3 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },

            CSSgd01 : {
                color:AlarmGD01 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSSgd02 : {
                color:AlarmGD02 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSSgd03 : {
                color:AlarmGD03 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_GVF1 : {
                color:AlarmGVF1 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_SVF1 : {
                color:AlarmSVF1 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
             CSS_SVA1 : {
                color:AlarmSVA1 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_GVA1 : {
                color:AlarmGVA1 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_GVF2 : {
                color:AlarmGVF2 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_SVF2 : {
                color:AlarmSVF2 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
             CSS_SVA2 : {
                color:AlarmSVA2 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
            CSS_GVA2 : {
                color:AlarmGVA2 ?'red' :  'black'  ,
                height:25,
                fontWeight:400
            },
      };
    const data1 = [
        { timeUpdate: <span style={combineCss.CSSpt02} >{timeUpdate}</span>,
         name: <span style={combineCss.CSSpt02}>PT-1901</span> ,
         value: <span style={combineCss.CSSpt02} > {PT02} Bara</span>, 
         high: <InputText style={combineCss.CSSpt02}   placeholder='High' step="0.1" type='number' value={inputValue} onChange={handleInputChange} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSpt02}    placeholder='High' step="0.1" type='number' value={inputValue2} onChange={handleInputChange2} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },

        { timeUpdate: <span style={combineCss.CSSpt03} >{timeUpdate}</span>,
            name: <span style={combineCss.CSSpt03}>PT-1902 </span> ,
            value: <span style={combineCss.CSSpt03} > {PT03} Bara</span> , 
            high: <InputText style={combineCss.CSSpt03}  placeholder='High' step="0.1" type='number' value={inputValueEK2Hight} onChange={handleInputChangeEK2High} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSpt03}   placeholder='High' step="0.1" type='number' value={inputValueEK1Low} onChange={handleInputChangeEK2Low} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

          
        },

        { timeUpdate: <span style={combineCss.CSSpt01} >{timeUpdate}</span>,
           name: <span style={combineCss.CSSpt01}>PT-1903 </span> ,
           value: <span style={combineCss.CSSpt01} > {PT01} BarG</span> , 
            high: <InputText style={combineCss.CSSpt01}   placeholder='High' step="0.1" type='number' value={inputValueEK3Hight} onChange={handleInputChangeEK3High} inputMode="decimal" />, 
            low:  <InputText style={combineCss.CSSpt01}   placeholder='High' step="0.1" type='number' value={inputValueEK3Low} onChange={handleInputChangeEK3Low} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

           },

        { timeUpdate: <span style={combineCss.CSSgd01} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSgd01}>GD-1901 </span> ,
        value: <span style={combineCss.CSSgd01} > {GD01} LEL</span> , 
         high: <InputText style={combineCss.CSSgd01}   placeholder='High' step="0.1" type='number' value={inputHighGD01} onChange={handleInputChangeHighGD01} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSgd01}   placeholder='High' step="0.1" type='number' value={inputLowGD01} onChange={handleInputChangeLowGD01} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },

        { timeUpdate: <span style={combineCss.CSSgd02} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSgd02}>GD-1902 </span> ,
        value: <span style={combineCss.CSSgd02} > {GD02} LEL</span> , 
         high: <InputText style={combineCss.CSSgd02}   placeholder='High' step="0.1" type='number' value={inputHighGD02} onChange={handleInputChangeHighGD02} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSgd02}   placeholder='High' step="0.1" type='number' value={inputLowGD02} onChange={handleInputChangeLowGD02} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },

        { timeUpdate: <span style={combineCss.CSSgd03} >{timeUpdate}</span>,
        name: <span style={combineCss.CSSgd03}>GD-1903 </span> ,
        value: <span style={combineCss.CSSgd03} > {GD03} LEL</span> , 
         high: <InputText style={combineCss.CSSgd03}   placeholder='High' step="0.1" type='number' value={inputHighGD03} onChange={handleInputChangeHighGD03} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSSgd03}   placeholder='High' step="0.1" type='number' value={inputLowGD03} onChange={handleInputChangeLowGD03} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
        { timeUpdate: <span style={combineCss.CSS_GVF1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVF1}>GVF FIQ-1901	 </span> ,
        value: <span style={combineCss.CSS_GVF1} > {GVF1} sm³/h</span> , 
         high: <InputText style={combineCss.CSS_GVF1}   placeholder='High' step="0.1" type='number' value={inputHighGVF1} onChange={handleInputChangeHighGVF1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVF1}   placeholder='High' step="0.1" type='number' value={inputLowGVF1} onChange={handleInputChangeLowGVF1} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
        { timeUpdate: <span style={combineCss.CSS_SVF1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVF1}>SVF FIQ-1901	 </span> ,
        value: <span style={combineCss.CSS_SVF1} > {SVF1} m³/h</span> , 
         high: <InputText style={combineCss.CSS_SVF1}   placeholder='High' step="0.1" type='number' value={inputHighSVF1} onChange={handleInputChangeHighSVF1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVF1}   placeholder='High' step="0.1" type='number' value={inputLowSVF1} onChange={handleInputChangeLowSVF1} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
          { timeUpdate: <span style={combineCss.CSS_SVA1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVA1}>SVA FIQ-1901	 </span> ,
        value: <span style={combineCss.CSS_SVA1} >  {SVA1} sm³</span> , 
         high: <InputText style={combineCss.CSS_SVA1}   placeholder='High' step="0.1" type='number' value={inputHighSVA1} onChange={handleInputChangeHighSVA1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVA1}   placeholder='High' step="0.1" type='number' value={inputLowSVA1} onChange={handleInputChangeLowSVA1} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
        { timeUpdate: <span style={combineCss.CSS_GVA1} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVA1}>GVA FIQ-1901	 </span> ,
        value: <span style={combineCss.CSS_GVA1} > {GVA1} m³</span> , 
         high: <InputText style={combineCss.CSS_GVA1}   placeholder='High' step="0.1" type='number' value={inputHighGVA1} onChange={handleInputChangeHighGVA1} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVA1}   placeholder='High' step="0.1" type='number' value={inputLowGVA1} onChange={handleInputChangeLowGVA1} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },

        { timeUpdate: <span style={combineCss.CSS_GVF2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVF2}>GVF FIQ-1902	 </span> ,
        value: <span style={combineCss.CSS_GVF2} > {GVF2} sm³/h</span> , 
         high: <InputText style={combineCss.CSS_GVF2}   placeholder='High' step="0.1" type='number' value={inputHighGVF2} onChange={handleInputChangeHighGVF2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVF2}   placeholder='High' step="0.1" type='number' value={inputLowGVF2} onChange={handleInputChangeLowGVF2} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
        { timeUpdate: <span style={combineCss.CSS_SVF2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVF2}>SVF FIQ-1902	 </span> ,
        value: <span style={combineCss.CSS_SVF2} > {SVF2} m³/h</span> , 
         high: <InputText style={combineCss.CSS_SVF2}   placeholder='High' step="0.1" type='number' value={inputHighSVF2} onChange={handleInputChangeHighSVF2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVF2}   placeholder='High' step="0.1" type='number' value={inputLowSVF2} onChange={handleInputChangeLowSVF2} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
          { timeUpdate: <span style={combineCss.CSS_SVA2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_SVA2}>SVA FIQ-1902	 </span> ,
        value: <span style={combineCss.CSS_SVA2} > {SVA2} sm³</span> , 
         high: <InputText style={combineCss.CSS_SVA2}   placeholder='High' step="0.1" type='number' value={inputHighSVA2} onChange={handleInputChangeHighSVA2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_SVA2}   placeholder='High' step="0.1" type='number' value={inputLowSVA2} onChange={handleInputChangeLowSVA2} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
        { timeUpdate: <span style={combineCss.CSS_GVA2} >{timeUpdate}</span>,
        name: <span style={combineCss.CSS_GVA2}>GVA FIQ-1902	 </span> ,
        value: <span style={combineCss.CSS_GVA2} > {GVA2} m³</span> , 
         high: <InputText style={combineCss.CSS_GVA2}   placeholder='High' step="0.1" type='number' value={inputHighGVA2} onChange={handleInputChangeHighGVA2} inputMode="decimal" />, 
         low:  <InputText style={combineCss.CSS_GVA2}   placeholder='High' step="0.1" type='number' value={inputLowGVA2} onChange={handleInputChangeLowGVA2} inputMode="decimal" />,
         update:  <button style={{height:25, borderRadius:5, border:'none', color:'white', background:'#036E9B', cursor:'pointer'}} onClick={handleButtonClick} > update </button>

        },
      ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background:'white', padding:10, borderRadius:10 }}>
            <div>

                <div style={{display:'flex' }}>
        <h2>OSTUKA</h2>

        </div>
        <hr />
        </div>
        <audio ref={audioRef}>
            <source src="/audios/NotificationCuu.mp3" type="audio/mpeg" />
        </audio>

      
      
        <div style={{width:'100%'}}>
        <DataTable value={data1} size={'small'} >
      <Column field="timeUpdate" header="Time Update" />
      <Column field="name" header="Name" />
      <Column field="value" header="Value" />
      <Column  field="high" header="High" />
      <Column field="low" header="Low" />
      <Column field="update" header="update" />

    </DataTable>
    </div>
    </div>
    
    );
}
