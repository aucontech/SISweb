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

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<LowHighData />);
  const [phuMy3Label, setPhuMy3Label] = useState<string>('OTSUKA');

  const [HaNoi, setHaNoi] = useState<string>('HA NOI');

  const [binhDuongLabel, setBinhDuongLabel] = useState<string>('BINH DUONG');
  const [hungyenLabel, sethungyenLabel] = useState<string>('HUNG YEN');

  const PhuMyClick = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
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
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
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
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
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
      setActiveComponent(<span style={{textAlign:'center', fontWeight:500, fontSize:40}}> {newLabel} Updating...</span>);
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
              { label: 'ARAKAWA', command: () => PhuMyClick(null, 'ARAKAWA') },
              { label: 'SPMCV', command: () => PhuMyClick(null, 'SPMCV') },

              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU />, 'PCN PRU') },
              { label: 'CNG PRU', command: () => PhuMyClick(<SetUpdata_PRU/>, 'CNG PRU') },

              { label: 'ZOVC EVC', command: () => PhuMyClick(<SetUpdata_ZOVC/>, 'ZOVC EVC') },
              { label: 'NITORI', command: () => PhuMyClick(null, 'NITORI') },
              { label: 'YOSHINO', command: () => PhuMyClick(null, 'YOSHINO') },
              { label: 'IGUACU', command: () => PhuMyClick(null, 'IGUACU') },
              { label: 'SPMCV', command: () => PhuMyClick(null, 'SPMCV') },
              { label: 'KOA', command: () => PhuMyClick(null, 'KOA') },
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
