"use client";
import React, { useState } from 'react';
import DemoFlowOTS from '../OTSUKA/demoGraphicOtsuka/demoFlowOTS';
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

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<LowHighData />);
  const [phuMy3Label, setPhuMy3Label] = useState<string>('OTSUKA');

  const [HaNoi, setHaNoi] = useState<string>('HA NOI');

  const [binhDuongLabel, setBinhDuongLabel] = useState<string>('BINH DUONG');
  const [hungyenLabel, sethungyenLabel] = useState<string>('HUNG YEN');

  const PhuMyClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setPhuMy3Label(newLabel);
    }
    setBinhDuongLabel('BINH DUONG');
    setHaNoi('HA NOI');
    sethungyenLabel('HUNG YEN')
  };

  const BinhDuongClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setBinhDuongLabel(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
    setHaNoi('HA NOI');
    sethungyenLabel('HUNG YEN')


  };

  const HaNoiClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setHaNoi(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
    setBinhDuongLabel('BINH DUONG');
    sethungyenLabel('HUNG YEN')

  };


  const HungYenClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      sethungyenLabel(newLabel);
    }
    setPhuMy3Label('PHU MY 3');
    setBinhDuongLabel('BINH DUONG');
    setHaNoi('HA NOI')
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
              { label: 'OTSUKA', command: () => PhuMyClick(<LowHighData />, 'OTSUKA') },
              { label: 'ARAKAWA', command: () => PhuMyClick(<SetUpdata_ARAKAWA/>, 'ARAKAWA') },
              { label: 'SPMCV', command: () => PhuMyClick(<SetUpdata_SPMCV/>, 'SPMCV') },

              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU />, 'PCN PRU') },
              { label: 'CNG PRU', command: () => PhuMyClick(<SetUpdata_PRU/>, 'CNG PRU') },

              { label: 'ZOCV', command: () => PhuMyClick(<SetUpdata_ZOVC/>, 'ZOCV') },
              { label: 'NITORI', command: () => PhuMyClick(<SetUpdata_NITORI/>, 'NITORI') },
              { label: 'YOSHINO', command: () => PhuMyClick(<SetUpdata_YOSHINO/>, 'YOSHINO') },
              { label: 'IGUACU', command: () => PhuMyClick(<SetUpdata_IGUACU/>, 'IGUACU') },
              { label: 'KOA', command: () => PhuMyClick(<SetUpdata_KOA/>, 'KOA') },
              // { label: 'ARAKAWA', command: () => handleItemClick(null, 'ARAKAWA') }
            ]
          }
        ],
       
      ]
    },
    {
      label: hungyenLabel,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: '',
            items: [
         
              { label: ' CNG HUNG YEN', command: () => HungYenClick(<SetUpdata_HUNGYEN/> , ' CNG HUNG YEN') },
              { label: ' SNG HUNG YEN', command: () => HungYenClick(<SetUpdata_HUNGYEN_SNG/> , ' SNG HUNG YEN') },

            
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
         
              { label: 'CNG BINH DUONG', command: () => BinhDuongClick(<SetUpdata_CNG_BINHDUONG/> , 'CNG BINH DUONG ') },
              { label: 'SNG BINH DUONG', command: () => BinhDuongClick(<SetUpdata_SNG_BINHDUONG/> , 'SNG BINH DUONG ') },

            
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
         
              { label: 'MEIKO', command: () => HaNoiClick(<SetUpdata_Meiko/> , 'MEIKO ') },


            
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
