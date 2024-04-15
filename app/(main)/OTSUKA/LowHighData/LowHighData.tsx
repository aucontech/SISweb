import React, { useEffect, useRef, useState } from 'react';
import { id_OTSUKA } from '../../data-table-device/ID-DEVICE/IdDevice';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { fetchData } from 'next-auth/client/_utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface StateMap {
    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;
}

export default function LowHighData() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);
    const [PT02, setPT02] = useState<string | null>(null);
    const [PT03, setPT03] = useState<string | null>(null);

    const [dataApi,setDataApi] = useState<any>([]);
    const [highEK1PressureValue, setHighEK1PressureValue] = useState<number | null>(null);
    const [lowEK1PressureValue, setLowEK1PressureValue] = useState<number | null>(null);


    const [highEK2PressureValue, setHighEK2PressureValue] = useState<number | null>(null);
    const [lowEK2PressureValue, setLowEK2PressureValue] = useState<number | null>(null);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioPlaying2, setAudioPlaying2] = useState(false);

    const [inputValueEK2Hight, setInputValueEK2High] = useState<any>();
    const [inputValueEK1Low, setInputValueEK2Low] = useState<any>();



    const [inputValue, setInputValue] = useState<any>();
    const [inputValue2, setInputValue2] = useState<any>();
    const [exceedThreshold, setExceedThreshold] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    const [exceedThreshold2, setExceedThreshold2] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng

    const op = useRef<OverlayPanel>(null);



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
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    useEffect(() => {
        setInputValue(highEK1PressureValue); 
        setInputValue2(lowEK1PressureValue); 

        setInputValueEK2High(highEK2PressureValue); 
        setInputValueEK2Low(lowEK2PressureValue); 
    }, [highEK1PressureValue, lowEK1PressureValue, highEK2PressureValue, lowEK2PressureValue]);
    
    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const handleInputChange2 = (event: any) => {
        const newValue2 = event.target.value;
        setInputValue2(newValue2);
    };


    const handleInputChangeEK2High = (event: any) => {
        const newValue = event.target.value;
        setInputValueEK2High(newValue);
    };

    const handleInputChangeEK2Low = (event: any) => {
        const newValue2 = event.target.value;
        setInputValueEK2Low(newValue2);
    };

 
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                { High_EK1_Pressure: inputValue,Low_EK1_Pressure:inputValue2,High_EK2_Pressure: inputValueEK2Hight, Low_EK2_Pressure:inputValueEK1Low }
            );

            setHighEK1PressureValue(inputValue);
            setLowEK1PressureValue(inputValue2);

            setHighEK2PressureValue(inputValueEK2Hight);
            setLowEK2PressureValue(inputValueEK1Low);

            op.current?.hide();
           
        } catch (error) {
            console.log("error: ", error);
           
        }
    };

  

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <audio ref={audioRef}>
            <source src="/audios/Notification.mp3" type="audio/mpeg" />
        </audio>

        <h1>OSTUKA</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%', }}>
            <tbody style={{borderRadius:10}}>
                <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize:20, fontWeight:500 }}>Name</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize:20, fontWeight:500 }}>Value</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize:20, fontWeight:500 }}>High</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize:20, fontWeight:500 }}>Low</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize:20, fontWeight:500 }}>Update</td>
                </tr>

                <tr style={{ backgroundColor: exceedThreshold ? '#ff5656' : '#e5e5e5',  }} >
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', color: exceedThreshold ? 'white' : 'black' }}>PT-1901</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{PT02}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='High' step="0.1" type='number' value={inputValue} onChange={handleInputChange} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='Low' step="0.1" type='number' value={inputValue2} onChange={handleInputChange2} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                                 <Button label="Update"  onClick={handleButtonClick} />

                    </td>
                </tr>


                <tr style={{ backgroundColor: exceedThreshold2 ? '#ff5656' : '#e5e5e5',  }} >
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', color: exceedThreshold2 ? 'white' : 'black' }}>PT-1902</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{PT03}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='High' step="0.1" type='number' value={inputValueEK2Hight} onChange={handleInputChangeEK2High} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='Low' step="0.1" type='number' value={inputValueEK1Low} onChange={handleInputChangeEK2Low} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                                 <Button label="Update"  onClick={handleButtonClick} />

                    </td>
                </tr>

                     
                <tr style={{ backgroundColor: exceedThreshold ? '#ff5656' : '#e5e5e5',  }} >
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', color: exceedThreshold ? 'white' : 'black' }}>PT-1901</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{PT02}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='High' step="0.1" type='number' value={inputValue} onChange={handleInputChange} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='Low' step="0.1" type='number' value={inputValue2} onChange={handleInputChange2} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                                 <Button label="Update"  onClick={handleButtonClick} />

                    </td>
                </tr>



                     
                <tr style={{ backgroundColor: exceedThreshold ? '#ff5656' : '#e5e5e5',  }} >
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', color: exceedThreshold ? 'white' : 'black' }}>PT-1901</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>{PT02}</td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='High' step="0.1" type='number' value={inputValue} onChange={handleInputChange} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <InputText placeholder='Low' step="0.1" type='number' value={inputValue2} onChange={handleInputChange2} inputMode="decimal" />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                                 <Button label="Update"  onClick={handleButtonClick} />

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    );
}
