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
import SetUpdata_VREC from './VREC/SetUpdata_VREC';
import SetUpdata_LGDS from './LGDS/SetUpdata_LGDS';
import SetUpdata_LGDSTest from './LGDS/SetUpdata_LGDSTest';

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<SetUpdata_LGDS />);
  const [NG, setNG] = useState<string>('LGDS');
  const [SNG, setSNG] = useState<string>('SNG');

  const [CNG, setCNG] = useState<string>('CNG');
  const [LPG, setLPG] = useState<string>('LPG');

  const stationList ={ 
    stationList :'Station list'
  }

  const NG_Click = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setNG(newLabel);
    }
    setCNG('CNG');
    setSNG('SNG');
    setLPG('LPG')
  };

  const CNG_CLICK = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setCNG(newLabel);
    }
    setNG('NG');
    setSNG('SNG');
    setLPG('LPG')


  };

  const SNG_Click = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setSNG(newLabel);
    }
    setNG('NG');
    setCNG('CNG');
    setLPG('LPG')

  };


  const LPG_Click = (component: React.ReactNode, newLabel?: string) => {
    if (component === null && newLabel) {
      setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
    } else {
      setActiveComponent(component);
    }
    if (newLabel) {
      setLPG(newLabel);
    }
    setNG('NG');
    setCNG('CNG');
    setSNG('SNG')
  };

  const items = [
    {
      label: NG,
      icon: 'pi pi-box',
      items: [
        [
          {
            label: stationList.stationList,
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

              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU />, 'PCN PRU') },

              // { label: 'LGDS-Test', command: () => NG_Click(<SetUpdata_LGDSTest/>, 'LGDS-Test') },


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
            label: stationList.stationList,
            items: [
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
            label: stationList.stationList,
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
            label: stationList.stationList,
            items: [
         
              { label: 'MEIKO', command: () => LPG_Click(<SetUpdata_Meiko/> , 'MEIKO ') },


            
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
