"use client";
import { TabView, TabPanel } from "primereact/tabview";
import TelemetryOTSUKA from "./telemetryOTSUKA/telemetryOTSUKA";
import GraphicOTK from "./graphic-otk/page";
import ReactFlow from "./ReactFlow/ReactFlow";
import Inital from "./ReactFlow/inital";
import DemoFlowOTS from "./demoGraphicOtsuka/demoFlowOTS";
import ReactFlowHigh from "./ReactFlow/ReactFlow";
import LowHighData from "./LowHighData/LowHighData";
const TabOtsuka = () => {
    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <TabView>
                    <TabPanel header="Graphic">
                        <DemoFlowOTS />
                    </TabPanel>
                    <TabPanel header="Telemetry">
                        <TelemetryOTSUKA />
                    </TabPanel>
                    {/* <TabPanel header="LowHigh Data">
                        <LowHighData />
                    </TabPanel> */}
                </TabView>
            </div>
        </div>
    );
};

export default TabOtsuka;
