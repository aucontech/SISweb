"use client";
import { TabView, TabPanel } from "primereact/tabview";
import TelemetryOTSUKA from "./telemetryOTSUKA/telemetryOTSUKA";
import GraphicOTK from "./graphic-otk/page";
import ReactFlow from "./ReactFlow/ReactFlow";
import Inital from "./ReactFlow/inital";
import DemoFlowOTS from "./demoGraphicOtsuka/demoFlowOTS";
import ReactFlowHigh from "./ReactFlow/ReactFlow";
import LowHighData from "./LowHighData/LowHighData";
import SDV_Otsuka from "./ReactFlow/SDV_Otsuka";
import GraphicFlow from "./demoGraphicOtsuka/GraphicFlow";
const TabOtsuka = () => {
    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <TabView>
                    <TabPanel header="Graphic">
                        <GraphicFlow />
                    </TabPanel>
                    <TabPanel header="Telemetry">
                        <TelemetryOTSUKA />
                    </TabPanel>
                    {/* <TabPanel header="LowHigh Data">
                        <LowHighData />
                    </TabPanel>
                    <TabPanel header="LowHigh Data">
                        <SDV_Otsuka />
                    </TabPanel>
                    <TabPanel header="LowHigh Data">
                        <GraphicFlow />
                    </TabPanel> */}
                </TabView>
            </div>
        </div>
    );
};

export default TabOtsuka;
