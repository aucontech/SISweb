"use client";
import { TabView, TabPanel } from "primereact/tabview";
import DemoFlowOTS from "./demoGraphicOtsuka/demoFlowOTS";
import LowHighData from "./LowHighData/LowHighData";
import AlarmOTSUKA from "@/layout/AlarmBell/AlarmOTSUKA";
import GraphicPRU from "./demoGraphicOtsuka/graphicPRU";
const TabOtsuka = () => {
    return (
            <div style={{ width: "100%", height:'100%' }}>
                                
                {/* <TabView>
              
                 
                     <TabPanel header="Graphic">
                        <DemoFlowOTS />
                    </TabPanel>
                  
                    <TabPanel header="Set Data">
                       <GraphicPRU/>
                    </TabPanel>
             
                </TabView> */}
                <DemoFlowOTS />
            </div>
    );
};

export default TabOtsuka;
