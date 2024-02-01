"use client";

import axios from "axios";
import { TabPanel, TabView } from "primereact/tabview";

import ReadAllAlarms from "../alarm-all/ReadAllAlarms";
import UnReadAlarms from "../alarm-unread/UnReadAlarms";

const Banking = () => {
    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <TabView>
                    <TabPanel header="Unread">
                        <UnReadAlarms />
                    </TabPanel>

                    <TabPanel header="All">
                        <ReadAllAlarms />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default Banking;
