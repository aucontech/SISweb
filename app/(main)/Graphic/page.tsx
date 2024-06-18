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
import Graphic_MEIKO from './MEIKO/GraphicMeiko/Graphic_MEIKO';

export default function GraphicSogec() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<DemoFlowOTS />);
  const [NG, setNG] = useState<string>('OTSUKA');
  const [SNG, setSNG] = useState<string>('SNG');

  const [CNG, setCNG] = useState<string>('CNG');
  const [LPG, setLPG] = useState<string>('LPG');
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
            label: '',
            items: [
              // { label: 'Test', command: () => handleItemClick(<AlarmOTSUKA />, 'Test') },
              { label: 'OTSUKA', command: () => NG_Click(<DemoFlowOTS />, 'OTSUKA') },
              { label: 'ARAKAWA', command: () => NG_Click(<GraphicARAKAWA />, 'ARAKAWA') },
              { label: 'SPMCV', command: () => NG_Click(<GraphicSPMCV />, 'SPMCV') },
              { label: 'LGDS', command: () => NG_Click(null, 'LGDS') },

              // { label: 'CNG PRU', command: () => NG_Click(<GraphicPRU />, 'PCN PRU') },
              { label: 'VREC', command: () => NG_Click(null, 'VREC') },

              { label: 'ZOVC EVC', command: () => NG_Click(<GraphicZOCV />, 'ZOVC EVC') },
              { label: 'KOA', command: () => NG_Click(null, 'KOA') },
              { label: 'NITORI', command: () => NG_Click(null, 'NITORI') },
              { label: 'YOSHINO', command: () => NG_Click(null, 'YOSHINO') },
              { label: 'IGUACU', command: () => NG_Click(null, 'IGUACU') },
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
            label: '',
            items: [
         
              { label: ' CNG BINH DUONG', command: () => SNG_Click(null , ' CNG BINH DUONG') },
              { label: ' SNG HUNG YEN', command: () => SNG_Click(null , ' SNG HUNG YEN') },

            
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
            label: '',
            items: [
         
              { label: 'CNG BINH DUONG', command: () => CNG_CLICK(null , 'CNG BINH DUONG ') },
              { label: 'SNG HUNG YEN', command: () => CNG_CLICK(null , 'SNG HUNG YEN ') },
              { label: 'SNG PHU MY 3', command: () => CNG_CLICK(null , 'SNG PHU MY 3 ') },


            
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
            label: '',
            items: [
         
              { label: 'MEIKO', command: () => LPG_Click(<Graphic_MEIKO/>, 'MEIKO ') },


            
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
