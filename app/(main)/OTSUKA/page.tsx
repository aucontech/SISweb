"use client";
import { TabView, TabPanel } from "primereact/tabview";
import DemoFlowOTS from "./demoGraphicOtsuka/demoFlowOTS";
import LowHighData from "./LowHighData/LowHighData";
const TabOtsuka = () => {


    return (
        <div className="grid">
            <div style={{ width: "100%" }}>

                
                {/* <TabView>
              
                 
                     <TabPanel header="Graphic">
                        <DemoFlowOTS />
                    </TabPanel>
                  
                    <TabPanel header="Set Data">
                        <LowHighData />
                    </TabPanel>
             
                </TabView> */}
                        <DemoFlowOTS />

            </div>
        </div>
    );
};

export default TabOtsuka;
