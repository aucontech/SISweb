"use client";
import React, { useEffect, useState } from 'react';
import DemoFlowOTS from '../OTSUKA/demoGraphicOtsuka/demoFlowOTS';
import { MegaMenu } from 'primereact/megamenu';
import GraphicPRU from '../PRU/GraphicPRU/GraphicPRU';
import GraphicZOCV from '../ZOVC/GraphicZOVC/graphicZOVC';
import AlarmOTSUKA from '@/layout/AlarmBell/AlarmOTSUKA';
import GraphicARAKAWA from '../ARAKAWA/GraphicArakawa/graphicARAKAWA';
import GraphicSPMCV from '../SPMCV/GraphicSPMCV/graphicSPMCV';
import SetUpdata_Meiko from '../SetupData/Meiko/SetUpdata_Meiko';
import Graphic_MEIKO from './MEIKO/GraphicMeiko/Graphic_MEIKO';
import GraphicOTSUKA from '@/app/listGraphic/OTSUKA/Graphic-OTSUKA';
import Graphic_OTSUKA from './OTSUKA/demoGraphicOtsuka/Graphic_OTSUKA';
import TestFullScreen from '../TestFullScreen/page';
import './GraphicSogec.css'
import { MdOutlineZoomOutMap } from "react-icons/md";
import Graphic_CNG_HUNGYEN from '../CNG_HUNGYEN/GraphicPRU/Graphic_CNG_HUNGYEN';
import Graphic_CNG_BINHDUONG from '../CNG_BINHDUONG/GraphicPRU/Graphic_CNG_BINHDUONG';
import GraphicYOSHINO from '../YOSHINO/GraphicZOVC/graphicYOSHINO';
import GraphicVREC from '../VREC/GraphicVREC/graphicVREC';

export default function GraphicSogec() {

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

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

  const stationList ={ 
    stationList :'List Graphic'
  }

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
              { label: 'OTSUKA', command: () => NG_Click(<DemoFlowOTS />, 'OTSUKA') },
              { label: 'ARAKAWA', command: () => NG_Click(<GraphicARAKAWA />, 'ARAKAWA') },
              { label: 'SPMCV', command: () => NG_Click(<GraphicSPMCV />, 'SPMCV') },
              { label: 'LGDS', command: () => NG_Click(<TestFullScreen/>, 'LGDS') },

              // { label: 'CNG PRU', command: () => NG_Click(<GraphicPRU />, 'PCN PRU') },
              { label: 'VREC', command: () => NG_Click(<GraphicVREC/>, 'VREC') },

              { label: 'ZOVC EVC', command: () => NG_Click(<GraphicZOCV />, 'ZOVC EVC') },
              { label: 'KOA', command: () => NG_Click(null, 'KOA') },
              { label: 'NITORI', command: () => NG_Click(null, 'NITORI') },
              { label: 'YOSHINO', command: () => NG_Click(<GraphicYOSHINO/>, 'YOSHINO') },
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
            label: stationList.stationList,
            items: [
         
              { label: ' SNG BINH DUONG', command: () => SNG_Click(null , ' SNG BINH DUONG') },
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
            label: stationList.stationList,
            items: [
         
              { label: 'CNG BINH DUONG', command: () => CNG_CLICK(<Graphic_CNG_BINHDUONG/> , 'CNG BINH DUONG ') },
              { label: 'CNG HUNG YEN', command: () => CNG_CLICK(<Graphic_CNG_HUNGYEN/> , 'CNG HUNG YEN ') },
              { label: 'CNG PHU MY 3', command: () => CNG_CLICK(<GraphicPRU/> , 'CNG PHU MY 3 ') },


            
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

      {!isFullscreen && (
        <div className=''  style={{
          position: 'absolute', 
          top: '105px', 
          right: '40px', 
          cursor:'pointer',
          width:40,
          height:40,
          textAlign:'center',
          justifyContent:'center',
          borderRadius:'5px',


        
        }}  >
         <MdOutlineZoomOutMap style={{marginTop:3}} size={35} className='GraphicSogec' onClick={handleFullscreenToggle} />

        </div>
      )}
      <div style={{height:'100%'}} id="component" className={isFullscreen ? 'fullscreen' : ''}>
      {activeComponent}
        {isFullscreen && (
          <button onClick={handleFullscreenToggle} className="exit-button">
          </button>
        )}
      </div>
      </>
  );
}
