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

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<DemoFlowOTS />);
  const [phuMy3Label, setPhuMy3Label] = useState<string>('OTSUKA');
  const [binhDuongLabel, setBinhDuongLabel] = useState<string>('BINH DUONG');

  const handleItemClick = (component: React.ReactNode, newLabel?: string) => {
    setActiveComponent(component);
    if (newLabel) {
      setPhuMy3Label(newLabel);
    }
    setBinhDuongLabel('BINH DUONG');
  };

  const handleItemClick2 = (component: React.ReactNode, newLabel?: string) => {
    setActiveComponent(component);
    if (newLabel) {
      setBinhDuongLabel(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
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
              { label: 'OTSUKA', command: () => handleItemClick(<DemoFlowOTS />, 'OTSUKA') },
              { label: 'ARAKAWA', command: () => handleItemClick(<GraphicARAKAWA />, 'ARAKAWA') },
              { label: 'SPMCV', command: () => handleItemClick(<GraphicSPMCV />, 'SPMCV') },

              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU />, 'PCN PRU') },
              { label: 'CNG PRU', command: () => handleItemClick(null, 'CNG PRU') },

              { label: 'ZOVC EVC', command: () => handleItemClick(<GraphicZOCV />, 'ZOVC EVC') },
              { label: 'KOA', command: () => handleItemClick(null, 'KOA') },
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
  ];

  return (
    <>
      <MegaMenu model={items} style={{ borderRadius: 5 }} />
      {activeComponent}
    </>
  );
}
