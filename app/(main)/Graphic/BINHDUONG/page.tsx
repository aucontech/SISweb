
"use client";



import { MegaMenu } from 'primereact/megamenu';
import React, { useState } from 'react'
import Graphic_SNG_BINHDUONG from '../../SNG/SNG_BINHDUONG/Graphic_SNG_BINHDUONG/Graphic_SNG_BINHDUONG';
import Graphic_CNG_BINHDUONG from '../../CNG_BINHDUONG/GraphicPRU/Graphic_CNG_BINHDUONG';

export default function Page() {
    const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Graphic_CNG_BINHDUONG />);

    const [CNG, setCNG] = useState<string>(' CNG BINH DUONG');

    const stationList ={ 
        stationList :'Station list'
      }
    const CNG_CLICK = (component: React.ReactNode, newLabel?: string) => {
        if (component === null && newLabel) {
          setActiveComponent(<h2 style={{textAlign:'center', }}> {newLabel} Updating...</h2>);
        } else {
          setActiveComponent(component);
        }
        if (newLabel) {
            setCNG(newLabel);
          }
  
    
    
      };

      const items = [
      
        {
          label: CNG,
          icon: 'pi pi-box',
          items: [
            [
              {
                label: stationList.stationList,
                items: [
    
                  { label: 'CNG BINH DUONG', command: () => CNG_CLICK(<Graphic_CNG_BINHDUONG
                  />, 'CNG BINH DUONG') },
                  { label: 'SNG BINH DUONG', command: () => CNG_CLICK(<Graphic_SNG_BINHDUONG/>, 'SNG BINH DUONG') },
                
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
  )
}
