"use client";

import { TabPanel, TabView } from "primereact/tabview";
import NG_Scorecard from "./NG_Scorecard/NG_Scorecard";
import ScoreCard_Meiko from "./components/ScoreCard_Meiko";
import ScoreCard_Nitori from "./components/ScoreCard_Nitori";
import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";
import ScoreCard_Yoshino from "./components/ScoreCard_Yoshino";
import SNG_Scorecard from "./SNG_Scorecard/SNG_Scorecard";
import CNG_Scorecard from "./CNG_Scorecard/CNG_Scorecard";

const ScoreCard = () => {
    return (
        

        < > 
            <TabView   >
                <TabPanel header="NG">
                    <NG_Scorecard />
                </TabPanel>
                    
                <TabPanel header="SNG"><SNG_Scorecard/></TabPanel>

                <TabPanel header="CNG"><CNG_Scorecard/></TabPanel>

                <TabPanel header="LPG"> 
                    <ScoreCard_Meiko />
                </TabPanel>
            </TabView>

        
            </>
    );
};

export default ScoreCard;
