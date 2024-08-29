import React, { useEffect, useRef, useState } from 'react';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { fetchData } from 'next-auth/client/_utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./LowHighOtsuka.css"
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import SetAttribute from './SetAttribute';
import { Calendar } from 'primereact/calendar';
import SetAttribute1 from '../../OTSUKA/title-OTK';
import { PLC_OTSUKA, TagName, nameValue } from '../namValue';
import SetAttributeTest from './SetAttributeTest';
import { UserOperator, UserTechnican } from '../../userID/UserID';

interface StateMap {

    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;

}
const id_test = 'd4602b70-61d7-11ef-9c7b-0938a6cf0867'
export default function LowHighDataTestAlarm() {

    const [PLC_STTValue, setPLC_STTValue] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
    const [data, setData] = useState<any[]>([]);

    const toast = useRef<Toast>(null);

              

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
                            fetchData()
                        };
                    }
                }, [data]);

    const fetchData = async () => {
        try {
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_test}/values/attributes/SERVER_SCOPE`
            );
            const GD1_High = res.data.find((item: any) => item.key === "GD1_High");

            setGD1_High(GD1_High?.value || null);
            const GD1_Low = res.data.find((item: any) => item.key === "GD1_Low");
            setGD1_Low(GD1_Low?.value || null);

            const GD2_High = res.data.find((item: any) => item.key === "GD2_High");
            setGD2_High(GD2_High?.value || null);
            const GD2_Low = res.data.find((item: any) => item.key === "GD2_Low");
            setGD2_Low(GD2_Low?.value || null);




            const GD3_High = res.data.find((item: any) => item.key === "GD3_High");
            setGD3_High(GD3_High?.value || null);
            const GD3_Low = res.data.find((item: any) => item.key === "GD3_Low");
            setGD3_Low(GD3_Low?.value || null);

            const MaintainGD1 = res.data.find(
                (item: any) => item.key === "GD1_Maintain"
            );
            setMaintainGD1(MaintainGD1?.value || false);

            const MaintainGD2 = res.data.find(
                (item: any) => item.key === "GD2_Maintain"
            );
            setMaintainGD2(MaintainGD2?.value || false);


            const MaintainGD3 = res.data.find(
                (item: any) => item.key === "GD3_Maintain"
            );
            setMaintainGD3(MaintainGD3?.value || false);


} catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
// ========================== PT 1901 ============================================

const [GD1, setGD1] = useState<string | null>(null);
const [inputValueGD1, setInputValueGD1] = useState<any>();
const [inputValue2GD1, setInputValue2GD1] = useState<any>();
const [GD1_High, setGD1_High] = useState<number | null>(null);
const [GD1_Low, setGD1_Low] = useState<number | null>(null);
const [exceedThresholdGD1, setExceedThresholdGD1] = useState(false); 
const [maintainGD1, setMaintainGD1] = useState<boolean>(false);

useEffect(() => {
    const GD1Value = parseFloat(GD1 as any);
    const highValue = GD1_High ?? NaN;
    const lowValue = GD1_Low ?? NaN;

    if (!isNaN(GD1Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD1) {
        setExceedThresholdGD1(GD1Value >= highValue || GD1Value <= lowValue);
    }
}, [GD1, GD1_High, GD1_Low, maintainGD1]);

const handleInputChangeGD1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD1(event.target.value);
};

const handleInputChange2GD1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD1(event.target.value);
};

const ChangeMaintainGD1 = async () => {
    try {
        const newValue = !maintainGD1;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_test}/SERVER_SCOPE`,
            { GD1_Maintain: newValue }
        );
        setMaintainGD1(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================

// ========================== PT 1903 ============================================

const [GD2, setGD2] = useState<string | null>(null);
const [inputValueGD2, setInputValueGD2] = useState<any>();
const [inputValue2GD2, setInputValue2GD2] = useState<any>();
const [GD2_High, setGD2_High] = useState<number | null>(null);
const [GD2_Low, setGD2_Low] = useState<number | null>(null);
const [exceedThresholdGD2, setExceedThresholdGD2] = useState(false); 
const [maintainGD2, setMaintainGD2] = useState<boolean>(false);

useEffect(() => {
    const GD2Value = parseFloat(GD2 as any);
    const highValue = GD2_High ?? NaN;
    const lowValue = GD2_Low ?? NaN;

    if (!isNaN(GD2Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD2) {
        setExceedThresholdGD2(GD2Value >= highValue || GD2Value <= lowValue);
    }
}, [GD2, GD2_High, GD2_Low, maintainGD2]);

const handleInputChangeGD2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD2(event.target.value);
};

const handleInputChange2GD2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD2(event.target.value);
};

const ChangeMaintainGD2 = async () => {
    try {
        const newValue = !maintainGD2;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_test}/SERVER_SCOPE`,
            { GD2_Maintain: newValue }
        );
        setMaintainGD2(newValue);
    } catch (error) {
        console.error(error);
    }
};
// ========================== PT 1903 ============================================

const [GD3, setGD3] = useState<string | null>(null);
const [inputValueGD3, setInputValueGD3] = useState<any>();
const [inputValue2GD3, setInputValue2GD3] = useState<any>();
const [GD3_High, setGD3_High] = useState<number | null>(null);
const [GD3_Low, setGD3_Low] = useState<number | null>(null);
const [exceedThresholdGD3, setExceedThresholdGD3] = useState(false); 
const [maintainGD3, setMaintainGD3] = useState<boolean>(false);

useEffect(() => {
    const GD3Value = parseFloat(GD3 as any);
    const highValue = GD3_High ?? NaN;
    const lowValue = GD3_Low ?? NaN;

    if (!isNaN(GD3Value) && !isNaN(highValue) && !isNaN(lowValue) && !maintainGD3) {
        setExceedThresholdGD3(GD3Value >= highValue || GD3Value <= lowValue);
    }
}, [GD3, GD3_High, GD3_Low, maintainGD3]);

const handleInputChangeGD3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueGD3(event.target.value);
};

const handleInputChange2GD3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2GD3(event.target.value);
};

const ChangeMaintainGD3 = async () => {
    try {
        const newValue = !maintainGD3;
        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_test}/SERVER_SCOPE`,
            { GD3_Maintain: newValue }
        );
        setMaintainGD3(newValue);
    } catch (error) {
        console.error(error);
    }
};





const handleMainTainAll = async (checked:any) => {
    try {

        const newMaintainGD1 = checked;
        const newMaintainGD2 = checked;

        await httpApi.post(
            `/plugins/telemetry/DEVICE/${id_test}/SERVER_SCOPE`,
            { 
               GD1_Maintain: newMaintainGD1,
               GD2_Maintain: newMaintainGD2,
             }
            )
        setMaintainGD1(newMaintainGD1);
        setMaintainGD2(newMaintainGD2);

    } catch (error) {
        console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
    }
};




//===========================================================================================

    useEffect(() => {
        setInputValueGD1(GD1_High)
        setInputValue2GD1(GD1_Low)

        setInputValueGD2(GD2_High)
        setInputValue2GD2(GD2_Low)

        setInputValueGD3(GD3_High)
        setInputValue2GD3(GD3_Low)

    }, [
         GD1_High, GD1_Low,
         GD2_High, GD2_Low,
         GD3_High, GD3_Low,

        ]);
    
    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_test}/SERVER_SCOPE`,
                { 

                  
                    GD1_High:inputValueGD1, GD1_Low:inputValue2GD1,
                    GD2_High:inputValueGD2, GD2_Low:inputValue2GD2,
                    GD3_High:inputValueGD3, GD3_Low:inputValue2GD3,
                  

                }
            );

            setGD1_High(inputValueGD1);
            setGD1_Low(inputValue2GD1);
            setGD2_High(inputValueGD2);
            setGD2_Low(inputValue2GD2);
            setGD3_High(inputValueGD3);
            setGD3_Low(inputValue2GD3);

            toast.current?.show({
                severity: "info",
                detail: "Success ",
                life: 3000,
            });
        } catch (error) {
            console.log("error: ", error);
            toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});

           
        }
    };

    const confirmUpData = () => {
        confirmDialog({
            message: "Are you sure you updated the data?",
            header: "Confirmation",
            icon: "pi pi-info-circle",
            accept: () => handleButtonClick(),
        });
    }


      const combineCss = {
          
            CSSGD1 : {
                color:exceedThresholdGD1 && !maintainGD1
                ? "#ff5656"
                : maintainGD1
                ? "orange"
                : ""  ,
                height:25,
                fontWeight:400,
                
            },
            CSSGD2 : {
                color:exceedThresholdGD2 && !maintainGD2
                ? "#ff5656"
                : maintainGD2
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
            CSSGD3 : {
                color:exceedThresholdGD3 && !maintainGD3
                ? "#ff5656"
                : maintainGD3
                ? "orange"
                : ""   ,
                height:25,
                fontWeight:400,
                
            },
      };




    const modbusPLC = {
        GD1:"DB5F106",
        GD2:"DB5F110",
  
        GD3:"DB5F110",
    }
 
    const mainCategoryEVC = {
    
     
        PLC:  <p style={{fontSize:15}}>Maintain PLC</p> 
    };
    



      const paragraphContentsPLC = {

        GD1:"Gas Detector GD-1901",
        GD2:"Gas Detector GD-1902",
      
      }


      

      const dataPLC = [
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSGD1} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSGD1}>{modbusPLC.GD1}</span> ,
   
        name: <span style={combineCss.CSSGD1}>{PLC_OTSUKA.GD1} </span> ,
        value: <span style={combineCss.CSSGD1} > {GD1} {nameValue.LEL}</span> , 
         high: <InputText  
         
         style={combineCss.CSSGD1}   placeholder='High' step="0.1" type='number' value={inputValueGD1} onChange={handleInputChangeGD1} inputMode="decimal" />, 
         low:  <InputText  
         
         style={combineCss.CSSGD1}   placeholder='Low' step="0.1" type='number' value={inputValue2GD1} onChange={handleInputChange2GD1} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD1}
         checked={maintainGD1}
     ></Checkbox>
   
        },
   
        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSGD2} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSGD2}>{modbusPLC.GD2}</span> ,
   
        name: <span style={combineCss.CSSGD2}>{PLC_OTSUKA.GD2} </span> ,
        value: <span style={combineCss.CSSGD2} > {GD2} {nameValue.LEL}</span> , 
         high: <InputText  
         
         style={combineCss.CSSGD2}   placeholder='High' step="0.1" type='number' value={inputValueGD2} onChange={handleInputChangeGD2} inputMode="decimal" />, 
         low:  <InputText  
         
         style={combineCss.CSSGD2}   placeholder='Low' step="0.1" type='number' value={inputValue2GD2} onChange={handleInputChange2GD2} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD2}
         checked={maintainGD2}
     ></Checkbox>
   
        },

        {
            mainCategory: mainCategoryEVC.PLC,
           
           timeUpdate: <span style={combineCss.CSSGD3} >{PLC_STTValue}</span>,
        modbus: <span style={combineCss.CSSGD3}>{modbusPLC.GD3}</span> ,
   
        name: <span style={combineCss.CSSGD3}>{PLC_OTSUKA.GD3} </span> ,
        value: <span style={combineCss.CSSGD3} > {GD3} {nameValue.LEL}</span> , 
         high: <InputText  
         
         style={combineCss.CSSGD3}   placeholder='High' step="0.1" type='number' value={inputValueGD3} onChange={handleInputChangeGD3} inputMode="decimal" />, 
         low:  <InputText  
         
         style={combineCss.CSSGD3}   placeholder='Low' step="0.1" type='number' value={inputValue2GD3} onChange={handleInputChange2GD3} inputMode="decimal" />,
         update:  <Button className='buttonUpdateSetData' onClick={confirmUpData}   label='Update'  /> ,
         Maintain:   <Checkbox
         style={{ marginRight: 20, }}
         onChange={ChangeMaintainGD3}
         checked={maintainGD3}
     ></Checkbox>
   
        },
      ]

      const combinedData = [ ...dataPLC];

      const mainCategoryTemplate = (data: any) => {
          return (
              <div style={{fontWeight:600, fontSize:23,background:'#f8faEVC'}}>
                  <span >{data.mainCategory}</span>
              </div>
          );
      };
   

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:10 }}>
            
         
        <Toast ref={toast} />

        <ConfirmDialog />

        <h2>OTSUKA</h2>
     
      
        <div style={{width:'100%' ,  borderRadius:5 }}>

        <DataTable rowGroupMode="subheader"
                size={'small'}      resizableColumns
        tableStyle={{ minWidth: '50rem' }}   value={combinedData}  groupRowsBy="mainCategory"  
        sortOrder={1}   rowGroupHeaderTemplate={mainCategoryTemplate}   >

      <Column field="timeUpdate" header="Time Update" />
      <Column field="modbus" header="Address" />

      <Column field="name" header="Name" />

      <Column field="value" header="Value" />
      <Column  field="high" header="High" />
      <Column field="low" header="Low" />
    <Column field="Maintain" header='Maintain' />
     <Column field="update" header="Update" /> 

    </DataTable>

    </div>

    </div>
    
    );
}
