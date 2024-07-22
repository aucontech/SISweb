"use client";

import { TabPanel, TabView } from "primereact/tabview";
import NG_Scorecard from "./NG_Scorecard/NG_Scorecard";
import ScoreCard_Meiko from "./components/ScoreCard_Meiko";
import ScoreCard_Nitori from "./components/ScoreCard_Nitori";
import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";
import ScoreCard_Yoshino from "./components/ScoreCard_Yoshino";

const ScoreCard = () => {
    return (
        

        <div>
            <TabView>
                <TabPanel header="NG">
                    <NG_Scorecard />
                </TabPanel>
                    
                <TabPanel header="SNG">Updating...</TabPanel>

                <TabPanel header="CNG">Updating...</TabPanel>

                <TabPanel header="LPG"> 
                    <ScoreCard_Meiko />
                </TabPanel>
            </TabView>

        
            </div>
    );
};

export default ScoreCard;
