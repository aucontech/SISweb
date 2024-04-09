import React, { useEffect, useRef, useState } from 'react';
import { id_OTSUKA } from '../../data-table-device/ID-DEVICE/IdDevice';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import tingting from "./NotificationCuu.mp3";
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
    const [dataApi,setDataApi] = useState<any>([]);
    const [highEK1PressureValue, setHighEK1PressureValue] = useState<number | null>(null);
    const [lowEK1PressureValue, setLowEK1PressureValue] = useState<number | null>(null);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const [inputValue, setInputValue] = useState<any>(); 
    const [inputValue2, setInputValue2] = useState<any>(); 

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
                        EK1_Pressure: setPT02,
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
                if (highEK1PressureItem) {
                    setHighEK1PressureValue(highEK1PressureItem.value);
                }
                const lowEK1PressureItem = res.data.find((item: any) => item.key === "Low_EK1_Pressure");
                if (lowEK1PressureItem) {
                    setLowEK1PressureValue(lowEK1PressureItem.value);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    useEffect(() => {

        fetchData()
    },[])

    useEffect(() => {
        if (highEK1PressureValue !== null && PT02 !== null) {
            if (parseFloat(highEK1PressureValue) < parseFloat(PT02) || parseFloat(PT02) <  parseFloat(lowEK1PressureValue)) {
                if (!audioPlaying) {
                    audioRef.current?.play();
                    setAudioPlaying(true);
                }
            } else {
                setAudioPlaying(false);
            }
        }
        fetchData()

    }, [highEK1PressureValue, PT02, audioPlaying,lowEK1PressureValue]);

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

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
                { High_EK1_Pressure: inputValue,Low_EK1_Pressure:inputValue2 }
            );
            setHighEK1PressureValue(inputValue)
            setLowEK1PressureValue(inputValue2)

            op.current?.hide();
           
        } catch (error) {
            console.log("error: ", error);
           
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value); 

        setInputValue(newValue);

    };
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue2 = Number(event.target.value); 

        setInputValue2(newValue2);

    };
    const handleButtonToggle = (e: React.MouseEvent) => {
        op.current?.toggle(e); 
        setInputValue(highEK1PressureValue);
        setInputValue2(lowEK1PressureValue);

    };


    return (
        <div>
            <audio ref={audioRef}>
                <source src={tingting} type="audio/mpeg" />
            </audio>
            <div style={{border:'none',fontSize:25,  display:'flex',cursor:'pointer' }} onClick={handleButtonToggle}> <p style={{color:'#ffaa00',}}>PVC-1901: </p>  </div>
            
            <OverlayPanel ref={op}>
                <div>
                <InputText placeholder='High' keyfilter="int" value={inputValue} onChange={handleInputChange} />
                <InputText placeholder='Low' keyfilter="int" value={inputValue2} onChange={handleInputChange2} />

                    <Button label="Update" onClick={handleButtonClick} />
                </div>
            </OverlayPanel>
            {PT02}
        </div>
    )
}