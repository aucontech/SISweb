"use client";
import ListGraphic from "@/app/listGraphic/components/listGraphic";
import ListTelemetry from "@/app/listTelemetry/components/listTelemetry";
import { TabView, TabPanel } from "primereact/tabview";
import { useContext, useState } from "react";

const DataTable = ({}) => {

    const [uhy,setuhy] = useState()

    return (
        <div className="grid">
            <div style={{ width: "100%" }}>

                <TabView>
                    <TabPanel header="Graphic">
                        <ListGraphic/>
                    </TabPanel> 
                    <TabPanel header="Telemetry">
                        <ListTelemetry/>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DataTable;
