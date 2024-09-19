"use client";
import React, { useEffect, useState } from 'react';
import { MegaMenu } from 'primereact/megamenu';

import SetUpdata_Meiko from '../SetupData/Meiko/SetUpdata_Meiko';
import LowHighData from './LowHighData/LowHighData';
import SetUpdata_ZOVC from './ZOVC/SetUpdata_ZOVC';
import SetUpdata_PRU from './PRU/SetUpdata_PRU';
import SetUpdata_CNG_BINHDUONG from './CNG_BINHDUONG/SetUpdata_CNG_BINHDUONG';
import SetUpdata_HUNGYEN from './CNG_HUNGYEN/SetUpdata_HUNGYEN';
import SetUpdata_HUNGYEN_SNG from './SNG_HUNGYEN/SetUpdata_HUNGYEN_SNG';
import SetUpdata_SNG_BINHDUONG from './SNG_BINHDUONG/SetUpdata_SNG_BINHDUONG';
import SetUpdata_IGUACU from './IGUACU/SetUpdata_IGUACU';
import SetUpdata_KOA from './KOA/SetUpdata_KOA';
import SetUpdata_YOSHINO from './YOSHINO/SetUpdata_YOSHINO';
import SetUpdata_NITORI from './NITORI/SetUpdata_NITORI';
import SetUpdata_ARAKAWA from './ARAKAWA/SetUpdata_ARAKAWA';
import SetUpdata_SPMCV from './SPMCV/SetUpdata_SPMCV';
import SetUpdata_VREC from './VREC/SetUpdata_VREC';
import SetUpdata_LGDS from './LGDS/SetUpdata_LGDS';
import SetUpdata_SNG_PRU from './SNG_PRU/SetUpdata_SNG_PRU';

import LowHighDataTestAlarm from './LowHigTestAlarm/LowHighData';
import { InputText } from 'primereact/inputtext';

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<SetUpdata_LGDS />);
  const [NG, setNG] = useState<string>('NG');
  const [SNG, setSNG] = useState<string>('SNG');

  const [CNG, setCNG] = useState<string>('CNG');
  const [LPG, setLPG] = useState<string>('LPG');

  const [searchItem,setSearchItem] = useState<any>()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true); // Track the first render

  // useEffect(() => {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }

    // const stationList = {
    //   'LGDS': <SetUpdata_LGDS />,
    //   'ZOCV': <SetUpdata_ZOVC />,
    //   'KOA': <SetUpdata_KOA />,
    //   'NITORI': <SetUpdata_NITORI />,
    //   'YOSHINO': <SetUpdata_YOSHINO />,
    //   'IGUACU': <SetUpdata_IGUACU />,
    //   'ARAKAWA': <SetUpdata_ARAKAWA />,
    //   'SPMCV': <SetUpdata_SPMCV />,
    //   'VREC': <SetUpdata_VREC />,
    //   'OTSUKA': <LowHighData />,

      
    //   'MEIKO': <SetUpdata_Meiko />,


    //   'SNG': <SetUpdata_SNG_PRU />,

    //   'SNG BINH DUONG': <SetUpdata_SNG_BINHDUONG />,
    //   'SNG HUNG YEN': <SetUpdata_HUNGYEN_SNG />,
    //   'CNG PHU MY 3': <SetUpdata_PRU />,
    //   'CNG BINH DUONG': <SetUpdata_CNG_BINHDUONG />,
    //   'CNG HUNG YEN': <SetUpdata_HUNGYEN />,
    // };
    // const stationGroup = {
    //   NG: ['LGDS', 'ZOCV', 'KOA', 'NITORI', 'YOSHINO', 'IGUACU', 'ARAKAWA', 'SPMCV', 'VREC', 'OTSUKA'],
    //   LPG: ['MEIKO'],
    //   SNG : ['SNG BINH DUONG','SNG HUNG YEN',"SNG"],
    //   CNG:["CNG PHU MY 3",'CNG BINH DUONG','CNG HUNG YEN']
    // };
    // const newTimeoutId = setTimeout(() => {
    //   const normalizedSearchTerm = searchItem?.replace(/\s+/g, '').toUpperCase();
    //   if (isFirstRender) {
    //     setActiveComponent(<SetUpdata_LGDS />);
    //     setNG("LGDS")

    //     setLPG("LPG");
    //     setCNG("CNG");
    //     setSNG("SNG");
    //     setIsFirstRender(false); 
    //     return; 
    //   }
    //   const filteredList = Object.keys(stationList).filter(key => {
    //     const normalizedKey = key.replace(/\s+/g, '').toUpperCase();
    //     return normalizedKey.includes(normalizedSearchTerm);
    //   });
    
    //   if (searchItem === '') {
    //     setActiveComponent(<SetUpdata_LGDS />);
    //     setNG("LGDS")

    //     setLPG("LPG")
    //     setCNG("CNG")
    //     setSNG("SNG")

    //   } else if (filteredList.length === 1) {
    //     const selectedKey = filteredList[0] as keyof typeof stationList;
    //     setActiveComponent(stationList[selectedKey]);
    
    //     let groupName: string | undefined;
    //     for (const [group, stations] of Object.entries(stationGroup)) {
    //       if (stations.includes(selectedKey)) {
    //         groupName = group;
    //         break;
    //       }
    //     }
    
    //     if (groupName === 'SNG') {
    //       setSNG(selectedKey);
    //       setNG('NG');
    //       setCNG('CNG');
    //       setLPG('LPG');
    //     } else if (groupName === 'CNG') {
    //       setCNG(selectedKey);
    //       setNG('NG');
    //       setSNG('SNG');
    //       setLPG('LPG');
    //     } else if (groupName === 'NG') {
    //       setNG(selectedKey);
    //       setCNG('CNG');
    //       setSNG('SNG');
    //       setLPG('LPG');
    //     } else if (groupName === 'LPG') {
    //       setLPG(selectedKey);
    //       setNG("NG");
    //       setCNG('CNG');
    //       setSNG("SNG");
    //     } 
    //   }
    
      
    //   else if (normalizedSearchTerm === 'SNG' || normalizedSearchTerm === "SNG ") {
    //     setActiveComponent(stationList['SNG']);
    //     setSNG('SNG');
    //   }  else {
    //     setActiveComponent(<h2 style={{ textAlign: 'center' }}>Multiple matches found. Refine your search.</h2>);
    //     setNG("NG")

    //     setLPG("LPG")
    //     setCNG("CNG")
    //     setSNG("SNG")
     
    //   }
    // }, 1000);
    
  
    
  //   setTimeoutId(newTimeoutId);
  // }, [searchItem]);

  // const InputSearch = () => {
  //   return <div>
  //   <InputText
  //         type="text"
  //         value={searchItem}
  //         onChange={handleSearchChange}
  //         placeholder="Search..."
  //         style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
  //       />
  //   </div>
  // }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchItem(e.target.value);
    };
  
    const NG_Click = (component: React.ReactNode, newLabel?: string) => {
      if (component === null && newLabel) {
        setActiveComponent(<h2 style={{ textAlign: 'center' }}>{newLabel} Updating...</h2>);
      } else {
        setActiveComponent(component);
      }
      if (newLabel) {
        setNG(newLabel);
        // setSearchItem(newLabel); 
      }
      setCNG('CNG');
      setSNG('SNG');
      setLPG('LPG');

    };
    
    const CNG_CLICK = (component: React.ReactNode, newLabel?: string) => {
      if (component === null && newLabel) {
        setActiveComponent(<h2 style={{ textAlign: 'center' }}>{newLabel} Updating...</h2>);
      } else {
        setActiveComponent(component);
      }
      if (newLabel) {
        setCNG(newLabel);
        setSearchItem(newLabel); 
      }
      setNG('NG');
      setSNG('SNG');
      setLPG('LPG');

    };
    
    const SNG_Click = (component: React.ReactNode, newLabel?: string) => {
      if (component === null && newLabel) {
        setActiveComponent(<h2 style={{ textAlign: 'center' }}>{newLabel} Updating...</h2>);
      } else {
        setActiveComponent(component);
      }
      if (newLabel) {
        setSNG(newLabel);
        setSearchItem(newLabel); 
      }
      setNG('NG');
      setCNG('CNG');
      setLPG('LPG');

    };
    
    const LPG_Click = (component: React.ReactNode, newLabel?: string) => {
      if (component === null && newLabel) {
        setActiveComponent(<h2 style={{ textAlign: 'center' }}>{newLabel} Updating...</h2>);
      } else {
        setActiveComponent(component);
      }
      if (newLabel) {
        setLPG(newLabel);
        setSearchItem(newLabel); 
      }
      setNG('NG');
      setCNG('CNG');
      setSNG('SNG');

    };
    



  const items = [
    {
      label: NG,
      icon: 'pi pi-box',
      items: [
        [
          {
            label:  "Station List" ,
            items: [
              // { label: 'Test', command: () => handleItemClick(<AlarmOTSUKA />, 'Test') },

              { label: 'LGDS', command: () => NG_Click(<SetUpdata_LGDS/>, 'LGDS') },
              { label: 'ZOCV', command: () => NG_Click(<SetUpdata_ZOVC/>, 'ZOCV') },
              { label: 'KOA', command: () => NG_Click(<SetUpdata_KOA/>, 'KOA') },
              { label: 'NITORI', command: () => NG_Click(<SetUpdata_NITORI/>, 'NITORI') },
              { label: 'YOSHINO', command: () => NG_Click(<SetUpdata_YOSHINO/>, 'YOSHINO') },
              { label: 'IGUACU', command: () => NG_Click(<SetUpdata_IGUACU/>, 'IGUACU') },
              { label: 'ARAKAWA', command: () => NG_Click(<SetUpdata_ARAKAWA/>, 'ARAKAWA') },
              { label: 'SPMCV', command: () => NG_Click(<SetUpdata_SPMCV/>, 'SPMCV') },
              { label: 'VREC', command: () => NG_Click(<SetUpdata_VREC/>, 'VREC') },

              { label: 'OTSUKA', command: () => NG_Click(<LowHighData />, 'OTSUKA') },

              // { label: 'Test-Setup', command: () => NG_Click(<LowHighDataTestAlarm/>, 'Test-Setup') },
              // { label: 'ARAKAWA', command: () => handleItemClick(null, 'ARAKAWA') }
            ]
          }
        ],
       
      ]
    },
    {
      label: SNG,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: "Station List",
            items: [
              { label:  'SNG ', command: () => SNG_Click(<SetUpdata_SNG_PRU/> , ' SNG ') },

              { label:  'SNG BINH DUONG', command: () => SNG_Click(<SetUpdata_SNG_BINHDUONG/> , ' SNG BINH DUONG') },
              { label: 'SNG HUNG YEN', command: () => SNG_Click(<SetUpdata_HUNGYEN_SNG/>, 'SNG HUNG YEN') },

            
            ]
          }
        ],
       
      ]
    },

    {
      label: CNG,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: "Station List",
            items: [

              { label: 'CNG PHU MY 3', command: () => CNG_CLICK(<SetUpdata_PRU/>, 'CNG PHU MY 3') },
              { label: 'CNG BINH DUONG', command: () => CNG_CLICK(<SetUpdata_CNG_BINHDUONG/> , 'CNG BINH DUONG') },
              { label: 'CNG HUNG YEN', command: () => CNG_CLICK( <SetUpdata_HUNGYEN/> , 'CNG HUNG YEN') },

            
            ]
          }
        ],
      ]
    },

    {
      label: LPG,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: "Station List",
            items: [
         
              { label: 'MEIKO', command: () => LPG_Click(<SetUpdata_Meiko/> , 'MEIKO ') },


            
            ]
          }
        ],
       
      ]
    },
  ];


  return (
    <div >
      {/* <div
                    className=""
                    style={{
                        position: "absolute",
                        top: "80px",
                        right: "40px",
                        cursor: "pointer",
                        textAlign: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                    }}
                >
                   {InputSearch()}
                </div> */}

                <div style={{position:'sticky', top:63, zIndex:9999}}>
      <MegaMenu model={items} style={{ borderRadius: 5, background:'white' }} />
      </div>

      {activeComponent}
    </div>
  );
}
