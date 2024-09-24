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
import LowHighData from "../OTSUKA/LowHighData/LowHighData";
import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";
import ScoreCard_SNG_PRU from "./components/ScoreCard_SNG_PRU";
import ScoreCard_SNG_BINHDUONG from "./components/ScoreCard_SNG_BINHDUONG";
import ScoreCard_SNG_HUNGYEN from "./components/ScoreCard_SNG_HUNGYEN";
import ScoreCard_CNG_PRU from "./components/ScoreCard_CNG_PRU";
import ScoreCard_CNG_BINHDUONG from "./components/ScoreCard_CNG_BINHDUONG";
import ScoreCard_CNG_HUNGYEN from "./components/ScoreCard_CNG_HUNGYEN";
import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import LPG_Scorecard from "./LPG_Scorecard/LPG_Scorecard";

import "./ScoreCard.css"

interface stationOptions {
  label: string;
  value: string;
}

import "./ScoreCard.css";

type StationListType = {
  [key: string]: JSX.Element;
};

const ScoreCard = () => {
    const [selectedStations, setSelectedStations] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
  
    const stationList: StationListType = {
      Sarawak: <ScoreCard_LGDS />,
      "Pengerang": <ScoreCard_ZOCV />,
      "Kulai CG": <ScoreCard_KOA />,
      "Gebeng CG": <ScoreCard_Nitori />,
      "Kluang CG": <ScoreCard_Yoshino />,
      "Teluk Kalong CG": <ScoreCard_IGUACU />,
      "Gambang CG": <ScoreCard_Arakawa />,
      "Prai CG": <ScoreCard_SPMCV />,
      "Pasir Gudang CG": <ScoreCard_VREC />,
      // Melaka: <ScoreCard_Otsuka />,
      // MEIKO: <ScoreCard_Meiko />,
      // SNG: <ScoreCard_SNG_PRU />,
      // "SNG BINH DUONG": <ScoreCard_SNG_BINHDUONG />,
      // "SNG HUNG YEN": <ScoreCard_SNG_HUNGYEN />,
      // "CNG PHU MY 3": <ScoreCard_CNG_PRU />,
      // "CNG BINH DUONG": <ScoreCard_CNG_BINHDUONG />,
      // "CNG HUNG YEN": <ScoreCard_CNG_HUNGYEN />,
    };
  
    const stationOption: stationOptions[] = Object.keys(stationList).map((key) => ({
      label: key,
      value: key,
    }));
  
    const handleStationSelect = (e: any) => {
      setSelectedStations(e.value);
      if (e.value.length > 0) {
        setActiveIndex(4); // Switch to the station tab
      }
    };
    const panelFooterTemplate = () => {
      const length = selectedStations ? selectedStations.length : 0;

      return (
          <div className="py-2 px-3">
              <b>{length}</b> item{length > 1 ? 's' : ''} selected.
          </div>
      );
  };
    const InputSearch = () => {
      return (
        <div>
          <MultiSelect
            value={selectedStations}
            options={stationOption}
            onChange={handleStationSelect}
            optionLabel="label"
            placeholder="Select stations"
            display="chip"
            className="p-multiselect-custom"
            panelFooterTemplate={panelFooterTemplate}
            style={{height:51,alignItems:'center'}}

          />
        </div>
      );
    };


    return (
      <div >
        <div
          style={{
            borderRadius:5,
            zIndex:99 ,
            position: "sticky",
      top: 63, 
      background:'white',
      boxShadow: '2px 2x 3px rgba(0, 0, 0, 0.5)', 
          }}
        >
          <div style={{display:'flex',justifyContent:'space-between', height:51,  }}>
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              renderActiveOnly={false}
            >
              <TabPanel header="NG" />
              {/* <TabPanel header="SNG" />
              <TabPanel header="CNG" />
              <TabPanel header="LPG" /> */}
              <TabPanel  header={<span className="pi pi-fw pi-table"></span>} />
            </TabView>
          <div style={{ marginLeft: "auto", }}>{InputSearch()}</div>

          </div>
  
        </div>
  
        <div style={{marginTop:5}}  >
  {activeIndex === 0 && <NG_Scorecard />}
  {/* {activeIndex === 1 && <SNG_Scorecard />}
  {activeIndex === 2 && <CNG_Scorecard />}
  {activeIndex === 3 && <LPG_Scorecard />} */}
  {activeIndex === 4 && (
    <div  className="responsive">
      {selectedStations.length === 0 ? (
        <h2> Use the Select Station </h2>
      ) : (
        selectedStations.map((stationKey) => (
          <div key={stationKey}>
            {stationList[stationKey] || (
              <h2>Component not found for {stationKey}</h2>
            )}
          </div>
        ))
      )}
    </div>
  )}
</div>

      </div>
    );
  };
  
  export default ScoreCard;
  
