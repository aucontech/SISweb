
import React, { useEffect, useRef, useState } from 'react'
import { id_ARAKAWA } from '../../data-table-device/ID-DEVICE/IdDevice';
import { Toast } from 'primereact/toast';
import { readToken } from '@/service/localStorage';
import { httpApi } from '@/api/http.api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import "./LowHighOtsuka.css"
import { Button } from 'primereact/button';
import { namePCV_PSV, nameValue, PLC_ARAKAWA, TagName } from '../../SetupData/namValue';

interface StateMap {

    [key: string]:
        | React.Dispatch<React.SetStateAction<string | null>>
        | undefined;

}



export default function SetUpdata_ARAKAWA() {

    const token = readToken();

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
                    entityId: id_ARAKAWA,
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

                    const keys = Object?.keys(dataReceived.data);
                    const stateMap: StateMap = {
                  
                        EVC_01_Vb_of_Last_Day: setEVC_01_Vb_of_Last_Day,
                        EVC_01_Vm_of_Last_Day: setEVC_01_Vm_of_Last_Day,

                    
                  
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
        const res = await httpApi.get(`/plugins/telemetry/DEVICE/${id_ARAKAWA}/values/attributes/SERVER_SCOPE`);
        const keysToFetch = ["EVC_01_Vb_of_Last_Day_High", "EVC_01_Vb_of_Last_Day_Low", "EVC_01_Vb_of_Last_Day_Maintain", "EVC_01_Vm_of_Last_Day_High", "EVC_01_Vm_of_Last_Day_Low", "EVC_01_Vm_of_Last_Day_Maintain"];
        
        keysToFetch.forEach((key) => {
            const value = res.data.find((item: any) => item.key === key)?.value || null;
            switch (key) {
                case "EVC_01_Vb_of_Last_Day_High":
                    setEVC_01_Vb_of_Last_Day_High(value);
                    break;
                case "EVC_01_Vb_of_Last_Day_Low":
                    setEVC_01_Vb_of_Last_Day_Low(value);
                    break;
                case "EVC_01_Vb_of_Last_Day_Maintain":
                    setMaintainEVC_01_Vb_of_Last_Day(value);
                    break;
                case "EVC_01_Vm_of_Last_Day_High":
                    setEVC_01_Vm_of_Last_Day_High(value);
                    break;
                case "EVC_01_Vm_of_Last_Day_Low":
                    setEVC_01_Vm_of_Last_Day_Low(value);
                    break;
                case "EVC_01_Vm_of_Last_Day_Maintain":
                    setMaintainEVC_01_Vm_of_Last_Day(value);
                    break;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


          const [EVC_01_Vb_of_Last_Day, setEVC_01_Vb_of_Last_Day] = useState<string | null>(null);
          const [inputValueEVC_01_Vb_of_Last_Day, setInputValueEVC_01_Vb_of_Last_Day] = useState<any>();
          const [inputValue2EVC_01_Vb_of_Last_Day, setInputValue2EVC_01_Vb_of_Last_Day] = useState<any>();
          const [EVC_01_Vb_of_Last_Day_High, setEVC_01_Vb_of_Last_Day_High] = useState<number | null>(null);
          const [EVC_01_Vb_of_Last_Day_Low, setEVC_01_Vb_of_Last_Day_Low] = useState<number | null>(null);
          const [exceedThresholdEVC_01_Vb_of_Last_Day, setExceedThresholdEVC_01_Vb_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
          
          const [maintainEVC_01_Vb_of_Last_Day, setMaintainEVC_01_Vb_of_Last_Day] = useState<boolean>(false);
              const handleInputChangeEVC_01_Vb_of_Last_Day = (event: any) => {
                  const newValue = event.target.value;
                  setInputValueEVC_01_Vb_of_Last_Day(newValue);
              };
          
              const handleInputChange2EVC_01_Vb_of_Last_Day = (event: any) => {
                  const newValue2 = event.target.value;
                  setInputValue2EVC_01_Vb_of_Last_Day(newValue2);
              };
              const ChangeMaintainEVC_01_Vb_of_Last_Day = async () => {
                  try {
                      const newValue = !maintainEVC_01_Vb_of_Last_Day;
                      await httpApi.post(
                          `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,
                          { EVC_01_Vb_of_Last_Day_Maintain: newValue }
                      );
                      setMaintainEVC_01_Vb_of_Last_Day(newValue);
                      
                  } catch (error) {}
              };
     
     
          // =================================================================================================================== 

    // =================================================================================================================== 

    const [EVC_01_Vm_of_Last_Day, setEVC_01_Vm_of_Last_Day] = useState<string | null>(null);
    const [inputValueEVC_01_Vm_of_Last_Day, setInputValueEVC_01_Vm_of_Last_Day] = useState<any>();
    const [inputValue2EVC_01_Vm_of_Last_Day, setInputValue2EVC_01_Vm_of_Last_Day] = useState<any>();
    const [EVC_01_Vm_of_Last_Day_High, setEVC_01_Vm_of_Last_Day_High] = useState<number | null>(null);
    const [EVC_01_Vm_of_Last_Day_Low, setEVC_01_Vm_of_Last_Day_Low] = useState<number | null>(null);
    const [exceedThresholdEVC_01_Vm_of_Last_Day, setExceedThresholdEVC_01_Vm_of_Last_Day] = useState(false); // State để lưu trữ trạng thái vượt ngưỡng
    
    const [maintainEVC_01_Vm_of_Last_Day, setMaintainEVC_01_Vm_of_Last_Day] = useState<boolean>(false);
    
      
        const handleInputChangeEVC_01_Vm_of_Last_Day = (event: any) => {
            const newValue = event.target.value;
            setInputValueEVC_01_Vm_of_Last_Day(newValue);
        };
    
        const handleInputChange2EVC_01_Vm_of_Last_Day = (event: any) => {
            const newValue2 = event.target.value;
            setInputValue2EVC_01_Vm_of_Last_Day(newValue2);
        };
        const ChangeMaintainEVC_01_Vm_of_Last_Day = async () => {
            try {
                const newValue = !maintainEVC_01_Vm_of_Last_Day;
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,
                    { EVC_01_Vm_of_Last_Day_Maintain: newValue }
                );
                setMaintainEVC_01_Vm_of_Last_Day(newValue);
                
            } catch (error) {}
        };

     

    // =================================================================================================================== 
  
    const checkThreshold = (high: string | null, low: string | null, value: string | null, maintain: boolean, setExceedThreshold: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (typeof high === 'string' && typeof low === 'string' && value !== null && maintain === false) {
            const highValue = parseFloat(high);
            const lowValue = parseFloat(low);
            const valueParsed = parseFloat(value);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(valueParsed)) {
                if (highValue <= valueParsed || valueParsed <= lowValue) {
                    setExceedThreshold(true);
                } else {
                    setExceedThreshold(false);
                }
            }
        }
    };
       
    useEffect(() => {
        checkThreshold(EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day_Low, EVC_01_Vm_of_Last_Day, maintainEVC_01_Vm_of_Last_Day, setExceedThresholdEVC_01_Vm_of_Last_Day);
        checkThreshold(EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day_Low, EVC_01_Vb_of_Last_Day, maintainEVC_01_Vb_of_Last_Day, setExceedThresholdEVC_01_Vb_of_Last_Day);
    }, [
        EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day, EVC_01_Vm_of_Last_Day_Low, maintainEVC_01_Vm_of_Last_Day,
        EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low, maintainEVC_01_Vb_of_Last_Day,
    ]);
    

    const handleButtonClick = async () => {
        try {
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,

                {
                    
                    EVC_01_Vm_of_Last_Day_High: inputValueEVC_01_Vm_of_Last_Day,EVC_01_Vm_of_Last_Day_Low:inputValue2EVC_01_Vm_of_Last_Day,
                    EVC_01_Vb_of_Last_Day_High: inputValueEVC_01_Vb_of_Last_Day,EVC_01_Vb_of_Last_Day_Low:inputValue2EVC_01_Vb_of_Last_Day,
                }
            );
            setEVC_01_Vm_of_Last_Day_High(inputValueEVC_01_Vm_of_Last_Day);
            setEVC_01_Vm_of_Last_Day_Low(inputValue2EVC_01_Vm_of_Last_Day);

            setEVC_01_Vb_of_Last_Day_High(inputValueEVC_01_Vb_of_Last_Day);
            setEVC_01_Vb_of_Last_Day_Low(inputValue2EVC_01_Vb_of_Last_Day);
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

    useEffect(() => {

        setInputValueEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_High); 
        setInputValue2EVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Low); 

        setInputValueEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_High); 
        setInputValue2EVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Low); 
    }, [
        
        
           EVC_01_Vb_of_Last_Day_High,EVC_01_Vb_of_Last_Day_Low,
           EVC_01_Vm_of_Last_Day_High,EVC_01_Vm_of_Last_Day_Low,
        ]);
   
    //============================================================================================
        
    const combineCss = {
        CSSEVC_01_Vb_of_Last_Day : {
            color:exceedThresholdEVC_01_Vb_of_Last_Day && !maintainEVC_01_Vb_of_Last_Day
            ? "#ff5656"
            : maintainEVC_01_Vb_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

        CSSEVC_01_Vm_of_Last_Day : {
            color:exceedThresholdEVC_01_Vm_of_Last_Day && !maintainEVC_01_Vm_of_Last_Day
            ? "#ff5656"
            : maintainEVC_01_Vm_of_Last_Day
            ? "orange"
            : "" ,
            height:25,
            fontWeight:400,
        },

       

  };
  const mainCategoryFC = {
    EVC:"sadasdadad",
 
    PLC:"assdlkadk"
};


const formatValue = (value:any) => {
    return value !== null
        ? new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true, 
          }).format(parseFloat(value))
        : "";
};


        const dataEVC01 = [

       {
        mainCategory:mainCategoryFC.EVC,
       name: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>{TagName.Vb_Yesterday}</span> ,

       modbus: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day}>40866	 </span> ,

      value: <span style={combineCss.CSSEVC_01_Vb_of_Last_Day} > {formatValue(EVC_01_Vb_of_Last_Day)} {nameValue.Sm3}</span> , 
       high: <InputText  style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vb_of_Last_Day} onChange={handleInputChangeEVC_01_Vb_of_Last_Day} inputMode="decimal" />, 
       low:  <InputText  style={combineCss.CSSEVC_01_Vb_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vb_of_Last_Day} onChange={handleInputChange2EVC_01_Vb_of_Last_Day} inputMode="decimal" />,
       update:  <Button className='buttonUpdateSetData' onClick={confirmUpData}  label='Update' />,
       Maintain:   <Checkbox
       style={{ marginRight: 20, }}
       onChange={ChangeMaintainEVC_01_Vb_of_Last_Day}
       checked={maintainEVC_01_Vb_of_Last_Day}
   ></Checkbox>

      },

              
      {
        mainCategory:mainCategoryFC.EVC,
      name: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>{TagName.Vm_Yesterday}</span> ,

      modbus: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day}>40868	 </span> ,

     value: <span style={combineCss.CSSEVC_01_Vm_of_Last_Day} > {formatValue(EVC_01_Vm_of_Last_Day)} {nameValue.m3}</span> , 
      high: <InputText  style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='High' step="0.1" type='number' value={inputValueEVC_01_Vm_of_Last_Day} onChange={handleInputChangeEVC_01_Vm_of_Last_Day} inputMode="decimal" />, 
      low:  <InputText  style={combineCss.CSSEVC_01_Vm_of_Last_Day}   placeholder='Low' step="0.1" type='number' value={inputValue2EVC_01_Vm_of_Last_Day} onChange={handleInputChange2EVC_01_Vm_of_Last_Day} inputMode="decimal" />,
      update:  <Button className='buttonUpdateSetData' onClick={confirmUpData}  label='Update' />,
      Maintain:   <Checkbox
      style={{ marginRight: 20, }}
      onChange={ChangeMaintainEVC_01_Vm_of_Last_Day}
      checked={maintainEVC_01_Vm_of_Last_Day}
  ></Checkbox>

     },

      ]

      const combinedData = [ ...dataEVC01 ,];

      const mainCategoryTemplate = (data: any) => {
          return (
              <div style={{fontWeight:600, fontSize:23,background:'#f8fafc'}}>
                  <span >{data.mainCategory}</span>
              </div>
          );
      };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  borderRadius:10, }}>
   
        <Toast ref={toast} />

        <ConfirmDialog />

<h2>ARAKAWA</h2>

<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <DataTable 
       rowGroupMode="subheader"
       size={'small'}      resizableColumns
       tableStyle={{ minWidth: '50rem' }} 
      value={combinedData}  
      groupRowsBy="mainCategory"  
       sortOrder={1} 
       rowGroupHeaderTemplate={mainCategoryTemplate} >
      <Column field="timeUpdate" header="Time Update" />
      <Column field="modbus" header="Modbus" />
      <Column field="name" header="Name" />
      <Column field="value" header="Value" />
      <Column field="high" header="High" />
      <Column field="low" header="Low" />
        <Column field="Maintain" header="Maintain" />
     <Column field="update" header="Update"     
style={{ width: '133px' }} 
/>  
    </DataTable>
  
</div>




</div>
  )
}
