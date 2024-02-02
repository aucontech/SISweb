"use client";

import axios from "axios";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect } from "react";
import { getNotifications } from "@/api/notification.api";

import ReadAllAlarms from "../alarm-all/ReadAllAlarms";
import UnReadAlarms from "../alarm-unread/UnReadAlarms";

const Banking = () => {
    useEffect(() => {
        try {
            getNotifications({
                pageSize: 10,
                page: 0,
                sortProperty: "createdTime",
                unreadOnly: false,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {}
    }, []);
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
