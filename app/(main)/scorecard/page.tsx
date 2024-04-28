"use client";

import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";

const ScoreCard = () => {


    return (
        <div className="grid">
            <div style={{ width: "100%" }}>

                
                {/* <TabView>
              
                 
                     <TabPanel header="Graphic">
                        <DemoFlowOTS />
                    </TabPanel>
                  
                
             
                </TabView> */}

                <ScoreCard_Otsuka/>

            </div>
        </div>
    );
};

export default ScoreCard;
