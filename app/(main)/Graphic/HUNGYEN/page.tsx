
"use client";



import { MegaMenu } from 'primereact/megamenu';
import React, { useState } from 'react'
import Graphic_CNG_HUNGYEN from '../../CNG_HUNGYEN/GraphicPRU/Graphic_CNG_HUNGYEN';
import Graphic_SNG_HUNGYEN from '../../SNG/SNG_HUNGYEN/Graphic_SNG_HUNGYEN/Graphic_SNG_HUNGYEN';


export default function Page() {
    const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Graphic_CNG_HUNGYEN />);

    const [CNG, setCNG] = useState<string>(' CNG HUNG YEN');

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
    
                  { label: 'CNG HUNG YEN', command: () => CNG_CLICK(<Graphic_CNG_HUNGYEN
                  />, 'CNG HUNG YEN') },
                  { label: 'SNG HUNG YEN', command: () => CNG_CLICK(<Graphic_SNG_HUNGYEN/>, 'SNG HUNG YEN') },
                
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
