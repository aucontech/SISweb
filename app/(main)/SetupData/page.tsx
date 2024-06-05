"use client";
import React, { useState } from 'react';
import DemoFlowOTS from '../OTSUKA/demoGraphicOtsuka/demoFlowOTS';
import { MegaMenu } from 'primereact/megamenu';
import GraphicPRU from '../PRU/GraphicPRU/GraphicPRU';
import GraphicZOCV from '../ZOVC/GraphicZOVC/graphicZOVC';
import AlarmOTSUKA from '@/layout/AlarmBell/AlarmOTSUKA';
import GraphicARAKAWA from '../ARAKAWA/GraphicArakawa/graphicARAKAWA';
import GraphicSPMCV from '../SPMCV/GraphicSPMCV/graphicSPMCV';
import SetUpdata_Meiko from '../SetupData/Meiko/SetUpdata_Meiko';
import LowHighData from './LowHighData/LowHighData';

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<LowHighData />);
  const [phuMy3Label, setPhuMy3Label] = useState<string>('OTSUKA');

  const [HaNoi, setHaNoi] = useState<string>('Meiko');

  const [binhDuongLabel, setBinhDuongLabel] = useState<string>('BINH DUONG');

  const handleItemClick = (component: React.ReactNode, newLabel?: string) => {
    setActiveComponent(component);
    if (newLabel) {
      setPhuMy3Label(newLabel);
    }
    setBinhDuongLabel('BINH DUONG');
    setHaNoi('Ha Noi');

  };

  const handleItemClick2 = (component: React.ReactNode, newLabel?: string) => {
    setActiveComponent(component);
    if (newLabel) {
      setBinhDuongLabel(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
  };
  const handleItemClick3 = (component: React.ReactNode, newLabel?: string) => {
    setActiveComponent(component);
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
              { label: 'CNG PRU', command: () => handleItemClick(null, 'PCN PRU') },

              { label: 'ZOVC EVC', command: () => handleItemClick(null, 'ZOVC EVC') },
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
  ];

  return (
    <>
      <MegaMenu model={items} style={{ borderRadius: 5 }} />
      {activeComponent}
    </>
  );
}
