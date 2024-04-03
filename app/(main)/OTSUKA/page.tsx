"use client";
import { TabView, TabPanel } from "primereact/tabview";
import TelemetryOTSUKA from "./telemetryOTSUKA/telemetryOTSUKA";
import GraphicOTK from "./graphic-otk/page";
import ReactFlow from "./ReactFlow/ReactFlow";
import Inital from "./ReactFlow/inital";
import DemoFlowOTS from "./demoGraphicOtsuka/demoFlowOTS";
const TabOtsuka = () => {
    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <TabView>

                    <TabPanel header="Graphic">
                        <ReactFlow />
                    </TabPanel>

                    <TabPanel header="Telemetry">
                        <TelemetryOTSUKA />
                    </TabPanel>

                    <TabPanel header="Graphic">
                        <GraphicOTK />
                    </TabPanel>
                  <TabPanel header="Graphic">
                <DemoFlowOTS/>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default TabOtsuka;


