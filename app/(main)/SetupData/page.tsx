"use client";
import React, { useState } from 'react';
import DemoFlowOTS from '../OTSUKA/demoGraphicOtsuka/demoFlowOTS';
import { MegaMenu } from 'primereact/megamenu';

import SetUpdata_Meiko from '../SetupData/Meiko/SetUpdata_Meiko';
import LowHighData from './LowHighData/LowHighData';
import SetUpdata_ZOVC from './ZOVC/SetUpdata_ZOVC';
import SetUpdata_PRU from './PRU/SetUpdata_PRU';
import SetUpdata_CNG_BINHDUONG from './CNG_BINHDUONG/SetUpdata_CNG_BINHDUONG';

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<LowHighData />);
  const [phuMy3Label, setPhuMy3Label] = useState<string>('OTSUKA');

  const [HaNoi, setHaNoi] = useState<string>('Ha Noi');

  const [binhDuongLabel, setBinhDuongLabel] = useState<string>('BINH DUONG');

  const handleItemClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setPhuMy3Label(newLabel);
    }
    setBinhDuongLabel('BINH DUONG');
    setHaNoi('Ha Noi');
  };

  const handleItemClick2 = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setBinhDuongLabel(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
    setHaNoi('Ha Noi');


  };

  const handleItemClick3 = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setHaNoi(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
    setBinhDuongLabel('BINH DUONG');
  };
  const items = [
    {
      label: phuMy3Label,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: '',
            items: [
              // { label: 'Test', command: () => handleItemClick(<AlarmOTSUKA />, 'Test') },
              { label: 'OTSUKA', command: () => handleItemClick(<LowHighData />, 'OTSUKA') },
              { label: 'ARAKAWA', command: () => handleItemClick(null, 'ARAKAWA') },
              { label: 'SPMCV', command: () => handleItemClick(null, 'SPMCV') },

              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU />, 'PCN PRU') },
              { label: 'CNG PRU', command: () => handleItemClick(<SetUpdata_PRU/>, 'CNG PRU') },

              { label: 'ZOVC EVC', command: () => handleItemClick(<SetUpdata_ZOVC/>, 'ZOVC EVC') },
              { label: 'NITORI', command: () => handleItemClick(null, 'NITORI') },
              { label: 'YOSHINO', command: () => handleItemClick(null, 'YOSHINO') },
              { label: 'IGUACU', command: () => handleItemClick(null, 'IGUACU') },
              { label: 'SPMCV', command: () => handleItemClick(null, 'SPMCV') },
              { label: 'KOA', command: () => handleItemClick(null, 'KOA') },
              // { label: 'ARAKAWA', command: () => handleItemClick(null, 'ARAKAWA') }
            ]
          }
        ],
       
      ]
    },
    {
      label: HaNoi,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: '',
            items: [
         
              { label: 'Meiko', command: () => handleItemClick3(<SetUpdata_Meiko/> , 'Meiko') },

            
            ]
          }
        ],
       
      ]
    },

    {
      label: binhDuongLabel,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: '',
            items: [
         
              { label: 'CNG BINH DUONG', command: () => handleItemClick2(<SetUpdata_CNG_BINHDUONG/> , 'CNG BINH DUONG ') },

            
            ]
          }
        ],
       
      ]
    },
  ];

  return (
    <>
      <MegaMenu model={items} style={{ borderRadius: 5 }} />
      {activeComponent}
    </>
  );
}
