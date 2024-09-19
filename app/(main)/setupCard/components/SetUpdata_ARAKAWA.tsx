

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
import { Calendar } from 'primereact/calendar';
import { namePCV_PSV, nameValue, PLC_ARAKAWA, TagName } from '../../SetupData/namValue';

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



export default function SetUpdata_ARAKAWA() {

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
            const res = await httpApi.get(
                `/plugins/telemetry/DEVICE/${id_ARAKAWA}/values/attributes/SERVER_SCOPE`
            );
     

            const EVC_01_Vb_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_High");
            setEVC_01_Vb_of_Last_Day_High(EVC_01_Vb_of_Last_Day_High?.value || null);
            const EVC_01_Vb_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vb_of_Last_Day_Low");
            setEVC_01_Vb_of_Last_Day_Low(EVC_01_Vb_of_Last_Day_Low?.value || null);
            const EVC_01_Vb_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vb_of_Last_Day_Maintain"
            );


            const EVC_01_Vm_of_Last_Day_High = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_High");
            setEVC_01_Vm_of_Last_Day_High(EVC_01_Vm_of_Last_Day_High?.value || null);
            const EVC_01_Vm_of_Last_Day_Low = res.data.find((item: any) => item.key === "EVC_01_Vm_of_Last_Day_Low");
            setEVC_01_Vm_of_Last_Day_Low(EVC_01_Vm_of_Last_Day_Low?.value || null);
            const EVC_01_Vm_of_Last_Day_Maintain = res.data.find(
                (item: any) => item.key === "EVC_01_Vm_of_Last_Day_Maintain"
            );

          
//=====================================================================================



 // =================================================================================================================== 



            

            setMaintainEVC_01_Vm_of_Last_Day(EVC_01_Vm_of_Last_Day_Maintain?.value || false);




            setMaintainEVC_01_Vb_of_Last_Day(EVC_01_Vb_of_Last_Day_Maintain?.value || false);

        


           

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
  
    useEffect(() => {
        
        
        if (typeof EVC_01_Vm_of_Last_Day_High === 'string' && typeof EVC_01_Vm_of_Last_Day_Low === 'string' && EVC_01_Vm_of_Last_Day !== null && maintainEVC_01_Vm_of_Last_Day === false
        ) {
            const highValue = parseFloat(EVC_01_Vm_of_Last_Day_High);
            const lowValue = parseFloat(EVC_01_Vm_of_Last_Day_Low);
            const EVC_01_Vm_of_Last_DayValue = parseFloat(EVC_01_Vm_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vm_of_Last_DayValue)) {
                if (highValue <= EVC_01_Vm_of_Last_DayValue || EVC_01_Vm_of_Last_DayValue <= lowValue) {
                        setExceedThresholdEVC_01_Vm_of_Last_Day(true);
                } else {
                   setExceedThresholdEVC_01_Vm_of_Last_Day(false);
                }
            } 
        } 
        if (typeof EVC_01_Vb_of_Last_Day_High === 'string' && typeof EVC_01_Vb_of_Last_Day_Low === 'string' && EVC_01_Vb_of_Last_Day !== null && maintainEVC_01_Vb_of_Last_Day === false
        ) {
            const highValue = parseFloat(EVC_01_Vb_of_Last_Day_High);
            const lowValue = parseFloat(EVC_01_Vb_of_Last_Day_Low);
            const EVC_01_Vb_of_Last_DayValue = parseFloat(EVC_01_Vb_of_Last_Day);
    
            if (!isNaN(highValue) && !isNaN(lowValue) && !isNaN(EVC_01_Vb_of_Last_DayValue)) {
                if (highValue <= EVC_01_Vb_of_Last_DayValue || EVC_01_Vb_of_Last_DayValue <= lowValue) {
                        setExceedThresholdEVC_01_Vb_of_Last_Day(true);
                } else {
                   setExceedThresholdEVC_01_Vb_of_Last_Day(false);
                }
            } 
        } 
    }, [
        

        EVC_01_Vm_of_Last_Day_High, EVC_01_Vm_of_Last_Day, , EVC_01_Vm_of_Last_Day_Low,maintainEVC_01_Vm_of_Last_Day,
        EVC_01_Vb_of_Last_Day_High, EVC_01_Vb_of_Last_Day, EVC_01_Vb_of_Last_Day_Low,maintainEVC_01_Vb_of_Last_Day,



    
    
    
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

        const handleMainTainAll = async (checked:any) => {
            try {
                const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
                const newmaintainEVC_01_Temperature = checked;
                const newmaintainEVC_01_Volume_at_Base_Condition = checked;
                const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_01_Pressure = checked;
                const newMaintainEVC_01_Flow_at_Base_Condition = checked;
                const newmaintainEVC_01_Vm_of_Current_Day = checked;
                const newMaintainEVC_01_Vb_of_Current_Day = checked;
                const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_01_Vb_of_Last_Day = checked;
                const newmaintainEVC_01_Vm_of_Last_Day = checked;
        
        
       
        
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,
                    { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
                       EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
                       EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
                       EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
                       EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
                       EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
                       EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
                       EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
                       EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
                       EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
                       EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,
        
        
               
        
                     }
                );
             
                setMaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
                setMaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);
        
     
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChange = (e:any) => {
            const isChecked = e.checked;
            handleMainTainAll(isChecked);
        };
        

        const handleCheckboxChangeALL = 
      
        maintainEVC_01_Vb_of_Last_Day === true &&
        maintainEVC_01_Vm_of_Last_Day === true 
    //============================================================================================

   const handleMainTainEVC = async (checked:any) => {
            try {
                const newMaintainEVC_01_Remain_Battery_Service_Life = checked;
                const newmaintainEVC_01_Temperature = checked;
                const newmaintainEVC_01_Volume_at_Base_Condition = checked;
                const newmaintainEVC_01_Volume_at_Measurement_Condition = checked;
                const newMaintainEVC_01_Pressure = checked;
                const newMaintainEVC_01_Flow_at_Base_Condition = checked;
                const newmaintainEVC_01_Vm_of_Current_Day = checked;
                const newMaintainEVC_01_Vb_of_Current_Day = checked;
                const newmaintainEVC_01_Flow_at_Measurement_Condition = checked;
                const newmaintainEVC_01_Vb_of_Last_Day = checked;
                const newmaintainEVC_01_Vm_of_Last_Day = checked;
                const newmaintainEVC_01_Conn_STT = checked;
        
        
        
        
                await httpApi.post(
                    `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,
                    { EVC_01_Remain_Battery_Service_Life_Maintain: newMaintainEVC_01_Remain_Battery_Service_Life,
                       EVC_01_Temperature_Maintain: newmaintainEVC_01_Temperature,
                       EVC_01_Volume_at_Base_Condition_Maintain: newmaintainEVC_01_Volume_at_Base_Condition,
                       EVC_01_Volume_at_Measurement_Condition_Maintain: newmaintainEVC_01_Volume_at_Measurement_Condition,
                       EVC_01_Pressure_Maintain: newMaintainEVC_01_Pressure,
                       EVC_01_Flow_at_Base_Condition_Maintain: newMaintainEVC_01_Flow_at_Base_Condition,
                       EVC_01_Vm_of_Current_Day_Maintain: newmaintainEVC_01_Vm_of_Current_Day,
                       EVC_01_Vb_of_Current_Day_Maintain: newMaintainEVC_01_Vb_of_Current_Day,
                       EVC_01_Flow_at_Measurement_Condition_Maintain: newmaintainEVC_01_Flow_at_Measurement_Condition,
                       EVC_01_Vb_of_Last_Day_Maintain: newmaintainEVC_01_Vb_of_Last_Day,
                       EVC_01_Vm_of_Last_Day_Maintain: newmaintainEVC_01_Vm_of_Last_Day,
                       EVC_01_Conn_STT_Maintain: newmaintainEVC_01_Conn_STT,
        
                     }
                );
            
                setMaintainEVC_01_Vb_of_Last_Day(newmaintainEVC_01_Vb_of_Last_Day);
                setMaintainEVC_01_Vm_of_Last_Day(newmaintainEVC_01_Vm_of_Last_Day);
        
                
       
        
        
            } catch (error) {
                console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
            }
        };
        
        const handleCheckboxChangeEVC = (e:any) => {
            const isChecked = e.checked;
            handleMainTainEVC(isChecked);
        };

        //============================================================================================
    const handleMainTainPLC = async (checked:any) => {
        try {
   
    
    
            const newMaintainGD1 = checked;
            const newMaintainGD2 = checked;
    
            const newMaintainPT1 = checked;
            const newMaintainDI_ZSO_1 = checked;
            const newMaintainDI_ZSC_1 = checked;
            const newmaintainDI_MAP_1 = checked;
            const newmaintainDI_UPS_CHARGING = checked;
            const newmaintainDI_UPS_ALARM = checked;
            const newmaintainDI_SELECT_SW = checked;
            const newmaintainDI_RESET = checked;
            const newmaintainDI_UPS_BATTERY = checked;
            const newmaintainDO_SV1 = checked;
    
            const newmaintainEmergency_NO = checked;
            const newmaintainEmergency_NC = checked;
            const newmaintainUPS_Mode = checked;
            const newmaintainDO_HR_01 = checked;
            const newmaintainDO_BC_01 = checked;
            const newMaintainDO_SV_01 = checked;
            const newmaintainPLC_Conn_STT = checked;
  
    
    
            await httpApi.post(
                `/plugins/telemetry/DEVICE/${id_ARAKAWA}/SERVER_SCOPE`,
                { 
    
                   GD1_Maintain: newMaintainGD1,
                   GD2_Maintain: newMaintainGD2,
                   PT1_Maintain: newMaintainPT1,
                    DI_ZSO_1_Maintain: newMaintainDI_ZSO_1,
                   DI_ZSC_1_Maintain: newMaintainDI_ZSC_1,
                   DI_MAP_1_Maintain: newmaintainDI_MAP_1,
                   DI_UPS_CHARGING_Maintain: newmaintainDI_UPS_CHARGING,
                   DI_UPS_ALARM_Maintain: newmaintainDI_UPS_ALARM,
                   DI_SELECT_SW_Maintain: newmaintainDI_SELECT_SW,
                   DI_RESET_Maintain: newmaintainDI_RESET,
                   DI_UPS_BATTERY_Maintain: newmaintainDI_UPS_BATTERY,
                   DO_SV1_Maintain: newmaintainDO_SV1,
    
                   Emergency_NO_Maintain: newmaintainEmergency_NO,
                   Emergency_NC_Maintain: newmaintainEmergency_NC,
                   UPS_Mode_Maintain: newmaintainUPS_Mode,
                   DO_HR_01_Maintain: newmaintainDO_HR_01,
                   DO_BC_01_Maintain: newmaintainDO_BC_01,
                   DO_SV_01_Maintain: newMaintainDO_SV_01,
                   PLC_Conn_STT_Maintain: newmaintainPLC_Conn_STT,
           
    
    
                 }
            );
   
    
            
    
       
    
        } catch (error) {
            console.error('Error updating maintainEVC_01_Remain_Battery_Service_Life:', error);
        }
    };
    
    const handleCheckboxChangePLC = (e:any) => {
        const isChecked = e.checked;
        handleMainTainPLC(isChecked);
    };
    


        
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

       //=========================================================================


       const combineCssAttribute = {
        PCV: {
            height: 25,
            fontWeight: 400,
        },
    };
  

  
    // const configuration = [
    //     {
    //         Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1601) (BarG)</span>,

    //         Value: (
    //             <InputText 
    //                 style={combineCssAttribute.PCV}
    //                 placeholder="High"
    //                 step="0.1"
    //                 type="Name"
    //                 value={inputPCV_01}
    //                 onChange={handleInputPCV_01}
    //                 inputMode="decimal"
    //             />
    //         ),

    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"
    //                 style={{ marginTop: 5 }}
    //                 label="Update"
    //                 onClick={confirmUpData}
    //             />
    //         ),
    //     },

    //     {
    //         Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.control} (PCV-1602) (BarG)</span>,

    //         Value: (
    //             <InputText 
    //                 style={combineCssAttribute.PCV}
    //                 placeholder="High"
    //                 step="0.1"
    //                 type="Name"
    //                 value={inputPCV_02}
    //                 onChange={handleInputPCV_02}
    //                 inputMode="decimal"
    //             />
    //         ),

    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"
    //                 style={{ marginTop: 5 }}
    //                 label="Update"
    //                 onClick={confirmUpData}
    //             />
    //         ),
    //     },

    //     {
    //         Name: <span style={combineCssAttribute.PCV}>{namePCV_PSV.safety} (PCV-1601) (BarG)</span>,

    //         Value: (
    //             <InputText 
    //                 style={combineCssAttribute.PCV}
    //                 placeholder="High"
    //                 step="0.1"
    //                 type="Name"
    //                 value={inputPSV_01}
    //                 onChange={handleInputPSV_01}
    //                 inputMode="decimal"
    //             />
    //         ),

    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"
    //                 style={{ marginTop: 5 }}
    //                 label="Update"
    //                 onClick={confirmUpData}
    //             />
    //         ),
    //     },
    //     {
    //         Name: <span style={combineCssAttribute.PCV}>IOT getway phone number </span>,

    //         Value: (
    //             <InputText 
    //                 style={combineCssAttribute.PCV}
    //                 placeholder="High"
    //                 step="0.1"
    //                 type="Name"
    //                 value={inputGetwayPhone}
    //                 onChange={handleInputChangeGetWayPhone}
    //                 inputMode="decimal"
    //             />
    //         ),

    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"
    //                 style={{ marginTop: 5 }}
    //                 label="Update"
    //                 onClick={confirmUpData}
    //             />
    //         ),
    //     },


    //     {
    //         Name: (
    //             <span style={combineCssTime.PCV}>
    //                 {ConfigurationName.EVC_01_Battery_Installation_Date}
    //             </span>
    //         ),
          
    //         Value: (
    //             <Calendar
    //                 style={combineCssTime.PCV}
    //                 value={date2}
    //                 onChange={handleDateChange}

    //                 showTime={false}
    //                 inputId="timeEVC_02"
    //                 dateFormat="dd-mm-yy"
    //             />
    //         ),
           
    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"
    //                 style={{ marginTop: 5 }}
    //                 label="Update"
    //                 onClick={confirmUpData}
    //             />
    //         ),
    //     },
    //     {
    //         Name: (
    //             <span style={combineCssTime.PCV}>
    //                 {ConfigurationName.EVC_01_Battery_Expiration_Date}
    //             </span>
    //         ),
          
         
    //         Value: (
    //             <Calendar
                
    //                 style={combineCssTime.PCV}
    //                 value={date}
    //                 disabled

    //                 showTime={false}
    //                 inputId="timeEVC_01"
    //                 dateFormat="dd-mm-yy"
    //             />
    //         ),
    //         Update: (
    //             <Button
    //                 className="buttonUpdateSetData"

    //                 disabled
    //                 style={{ marginTop: 5,cursor:"no-drop" }}
    //                 label="Update"
    //             />
    //         ),
           
    //     },

    // ];


   
    const maintainHeader = (
        <div>

        
                <Checkbox
                    style={{ marginRight: 5 }}
                    onChange={handleCheckboxChange}
                    checked={handleCheckboxChangeALL}
                />
            
            Maintain

        </div>
    );

       //=========================================================================

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
        <Column field="Maintain" header={maintainHeader} />
     <Column field="update" header="Update"     
style={{ width: '133px' }} 
/>  
    </DataTable>
  
</div>




</div>
  )
}
