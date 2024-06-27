import React, { useEffect, useRef, useState } from 'react'
import "../graphic-otk/graphic-OTK.css"
import { readToken } from '@/service/localStorage';
import { id_VREC } from '../../data-table-device/ID-DEVICE/IdDevice';
interface StateMap {
    [key: string]: React.Dispatch<React.SetStateAction<string | null>> | undefined;
  }

export default function DataOtsuka() {

    const [data, setData] = useState<any[]>([]);
    const token = readToken()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [flowRate, setFlowRate] = useState<string | null>(null);
    const [pipePressure, setPipePressure] = useState<string | null>(null);
    const [liquidLever, setLiquidLever] = useState<string | null>(null);
    const [tankPressureAI, setTankPreesureAI] = useState<string | null>(null);

    const [spare01AI, setSpare01AI] = useState<string | null>(null);
    const [spare02AI, setSpare02AI] = useState<string | null>(null);
    const [spare03AI, setSpare03AI] = useState<string | null>(null);
    const [spare04AI, setSpare04AI] = useState<string | null>(null);

    const [temprerature01AI, setTemperature01AI] = useState<string | null>(null);
    const [temprerature02AI, setTemperature02AI] = useState<string | null>(null);

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
                    entityId: id_VREC,
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

                      "Flow_Rate_AI": setFlowRate,
                      "Pipe_Pressure_AI": setPipePressure,
                      "Liquid_Level_AI":setLiquidLever,
                     "Tank_Pressure_AI":setTankPreesureAI,

                     "Spare_01_AI":setSpare01AI,
                     "Spare_02_AI":setSpare02AI,
                     "Spare_03_AI":setSpare03AI,
                     "Spare_04_AI":setSpare04AI,
                     "Temperature_01_AI":setTemperature01AI,
                     "Temperature_02_AI":setTemperature02AI,
                     "Solenoid_01_DO":setSolenoid01Do

                  };
  
                  keys.forEach((key) => {
                      if (stateMap[key]) {
                          const value = dataReceived.data[key][0][1];
                          const slicedValue = value.slice(0, 6);
                          stateMap[key]?.(slicedValue);
                      }
                  });
                  if (keys.includes("Flow_Rate_AI")) {
                    const timeUpdate = dataReceived.data["time"][0][1];
                    setTimeUpdate(timeUpdate);
                }
              }
          };
      }
  }, [data]);
  return (
    <>

     <text
                            x="980"
                            y="40"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerTime"
                            id="UID_1701153734203"
                        >
                          Last update {timeUpdate}
                        </text>
{/* --------------------------------------------------------------------------------------------------------------------------------- */}


                        <text
                            x="650"
                            y="120"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                             {flowRate}
                        </text>
                        <text
                            x="650"
                            y="155"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                              {pipePressure}
                        </text>
                        <text
                            x="650"
                            y="190"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {liquidLever}
                        </text>
                        <text
                            x="650"
                            y="225"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {tankPressureAI}
                        </text>

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

                        <text
                            x="650"
                            y="575"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {spare01AI}
                        </text>
                        <text
                            x="650"
                            y="610"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {spare02AI}
                        </text>
                        <text
                            x="650"
                            y="645"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {spare03AI}
                        </text>
                        <text
                            x="650"
                            y="680"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {spare04AI}
                        </text>
{/* --------------------------------------------------------------------------------------------------------------------------------- */}

                        <text
                            x="410"
                            y="120"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {temprerature01AI}
                        </text>
                        <text
                            x="610"
                            y="400"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"
                            id="UID_1701153734203"
                        >
                            {temprerature02AI}
                        </text>
                        <text
                            x="1035"
                            y="256"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainer"

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
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                            FRA : 
                        </text>
                        <text
                            x="570"
                            y="155"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                             PPA : 
                        </text>
                        <text
                            x="570"
                            y="190"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           LLA : 
                        </text>
                        <text
                            x="570"
                            y="225"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           TPA :  
                        </text>

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

                        <text
                            x="570"
                            y="575"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                          S01A :  
                        </text>
                        <text
                            x="570"
                            y="610"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                          S02A :  
                        </text>
                        <text
                            x="570"
                            y="645"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           S03A:   
                        </text>
                        <text
                            x="570"
                            y="680"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           S04A : 
                        </text>
{/* --------------------------------------------------------------------------------------------------------------------------------- */}

                        <text
                            x="335"
                            y="120"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           T01A :  
                        </text>
                        <text
                            x="530"
                            y="400"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"
                            id="UID_1701153734203"
                        >
                           T02A :
                        </text>
                        <text
                            x="955"
                            y="256"
                            transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                            className="nativeContainerName"

                            id="UID_1701153734203"
                        >
                           S01D : 
                        </text>

    </>
  )
}
