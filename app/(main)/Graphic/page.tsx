"use client"
import React, { useState } from 'react';
import DemoFlowOTS from '../OTSUKA/demoGraphicOtsuka/demoFlowOTS';
import { MegaMenu } from 'primereact/megamenu';
import GraphicPRU from '../PRU/GraphicPRU/GraphicPRU';
import GraphicZOCV from '../ZOVC/GraphicZOVC/graphicZOVC';

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
    setPhuMy3Label('PHU MY 3')
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
              { label: 'OSTUKA', command: () => handleItemClick(<DemoFlowOTS />, 'OTSUKA') },
              // { label: 'CNG PRU', command: () => handleItemClick(<GraphicPRU/>, 'PCN PRU') },
              { label: 'CNG PRU', command: () => handleItemClick(null, 'PCN PRU') },

              { label: 'ZOVC EVC', command: () => handleItemClick(<GraphicZOCV/>, 'ZOVC EVC') },
              { label: 'KOA', command: () => handleItemClick(null, 'KOA') },
              { label: 'NITORI', command: () => handleItemClick(null, 'NITORI') }
            ]
          }
        ],
        [
          {
            label: '',
            items: [
              { label: 'YOSHINO', command: () => handleItemClick(null, 'YOSHINO') },
              { label: 'IGUACU', command: () => handleItemClick(null, 'IGUACU') },
              { label: 'SPMCV', command: () => handleItemClick(null, 'SPMCV') },
              { label: 'KOA', command: () => handleItemClick(null, 'KOA') },
              { label: 'ARAKAWA', command: () => handleItemClick(null, 'ARAKAWA') }
            ]
          },
        ],
      ]
    },
    // {
    //   label: binhDuongLabel,
    //   icon: 'pi pi-mobile',
    //   items: [
    //     [
    //       {
    //         label: 'Computer',
    //         items: [{ label: '1122', command: () => handleItemClick2(null, '1122') }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
    //       }
    //     ],
    //     [
    //       {
    //         label: 'Home Theater',
    //         items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
    //       }
    //     ],
    //     [
    //       {
    //         label: 'Gaming',
    //         items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
    //       }
    //     ],
    //     [
    //       {
    //         label: 'Appliances',
    //         items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vacuum Cleaner' }, { label: 'Washing Machine' }]
    //       }
    //     ]
    //   ]
    // },
  ];

  return (
    <>
      <MegaMenu model={items} style={{ borderRadius: 5,}} />
        {activeComponent}
    </>
  );
}
