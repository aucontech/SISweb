"use client";

import { TabPanel, TabView } from "primereact/tabview";
import NG_Scorecard from "./NG_Scorecard/NG_Scorecard";
import ScoreCard_Meiko from "./components/ScoreCard_Meiko";

import SNG_Scorecard from "./SNG_Scorecard/SNG_Scorecard";
import CNG_Scorecard from "./CNG_Scorecard/CNG_Scorecard";
import 'primeicons/primeicons.css';
import ScoreCard_LGDS from "./components/ScoreCard_LGDS";
import ScoreCard_ZOCV from "./components/ScoreCard_ZOCV";
import ScoreCard_KOA from "./components/ScoreCard_KOA";
import ScoreCard_Nitori from "./components/ScoreCard_Nitori";
import ScoreCard_Yoshino from "./components/ScoreCard_Yoshino";
import ScoreCard_IGUACU from "./components/ScoreCard_IGUACU";
import ScoreCard_Arakawa from "./components/ScoreCard_Arakawa";
import ScoreCard_SPMCV from "./components/ScoreCard_SPMCV";
import ScoreCard_VREC from "./components/ScoreCard_VREC";
import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";
import ScoreCard_SNG_PRU from "./components/ScoreCard_SNG_PRU";
import ScoreCard_SNG_BINHDUONG from "./components/ScoreCard_SNG_BINHDUONG";
import ScoreCard_SNG_HUNGYEN from "./components/ScoreCard_SNG_HUNGYEN";
import ScoreCard_CNG_PRU from "./components/ScoreCard_CNG_PRU";
import ScoreCard_CNG_BINHDUONG from "./components/ScoreCard_CNG_BINHDUONG";
import ScoreCard_CNG_HUNGYEN from "./components/ScoreCard_CNG_HUNGYEN";
import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import LPG_Scorecard from "./LPG_Scorecard/LPG_Scorecard";
interface stationOptions {
    label: string;
    value: string;
  }
import "./ScoreCard.css"
import { dropRight } from "lodash";
type StationListType = {
    [key: string]: JSX.Element;
};

const ScoreCard = () => {
   
    const [selectedStations, setSelectedStations] = useState<string[]>([]);

 
    const [activeIndex, setActiveIndex] = useState(0); // To control the active tab index

    const stationList : StationListType = {
        'LGDS': <ScoreCard_LGDS />,
        'ZOCV': <ScoreCard_ZOCV />,
        'KOA': <ScoreCard_KOA />,
        'NITORI': <ScoreCard_Nitori />,
        'YOSHINO': <ScoreCard_Yoshino />,
        'IGUACU': <ScoreCard_IGUACU/>,
        'ARAKAWA': <ScoreCard_Arakawa />,
        'SPMCV': <ScoreCard_SPMCV />,
        'VREC': <ScoreCard_VREC />,
        'OTSUKA': <ScoreCard_Otsuka />,
  
        
        'MEIKO': <ScoreCard_Meiko />,
  
        'SNG': <ScoreCard_SNG_PRU />,
  
        'SNG BINH DUONG': <ScoreCard_SNG_BINHDUONG />,
        'SNG HUNG YEN': <ScoreCard_SNG_HUNGYEN />,
        'CNG PHU MY 3': <ScoreCard_CNG_PRU />,
        'CNG BINH DUONG': <ScoreCard_CNG_BINHDUONG />,
        'CNG HUNG YEN': <ScoreCard_CNG_HUNGYEN />,
      };

      const stationOption: stationOptions[] = Object.keys(stationList).map(key => ({
        label: key,
        value: key
      }));
      const handleStationSelect = (e: any) => {
        setSelectedStations(e.value);
        
        if (e.value.length > 0) {
            setActiveIndex(4); 
        } else {
            setActiveIndex(0); 
        }
    };
      const InputSearch = () => {
        return <div>
        
            <MultiSelect
        value={selectedStations}
        options={stationOption}
        onChange={handleStationSelect}
        optionLabel="label"
        placeholder="Select stations"
        display="chip"
        className="p-multiselect-custom"
        style={{height:52}}
      />
        </div>
      }
      
      
    return (
        <> 

  <div
    style={{
      display: "flex",
      justifyContent: "space-between", // Aligns tabs on the left and InputSearch on the right
      alignItems: "center", // Vertically aligns them in the same row
      borderBottom: "1px solid #ddd" // Optional: Adds a bottom border to match the tab header style
    }}
  >
    {/* Tab headers (controlled by activeIndex) */}
    <div style={{width:'100%'}}>
      <TabView  activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} renderActiveOnly={false}>
        <TabPanel header="NG" />
        <TabPanel header="SNG" />
        <TabPanel header="CNG" />
        <TabPanel header="LPG" />
        <TabPanel header={<span className="pi pi-fw pi-table"></span>} />
      </TabView>
    </div>

    <div style={{ marginLeft: "auto", marginBottom:39 }}>
      {InputSearch()}
    </div>
  </div>

  {/* Tab content */}
  <div>
    {activeIndex === 0 && <NG_Scorecard />}
    {activeIndex === 1 && <SNG_Scorecard />}
    {activeIndex === 2 && <CNG_Scorecard />}
    {activeIndex === 3 && <LPG_Scorecard />}
    {activeIndex === 4 && (
      selectedStations.map((stationKey) => (
        <div key={stationKey}>
          {stationList[stationKey] || <h2>Component not found for {stationKey}</h2>}
        </div>
      ))
    )}
  </div>

        
            </>
    );
};

export default ScoreCard;
