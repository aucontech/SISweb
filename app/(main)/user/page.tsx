"use client";
import { useEffect } from "react";
import ProfileSetting from "./components/ProfileSetting";
import PasswordSetting from "./components/PasswordSetting";
import { TabView, TabPanel } from "primereact/tabview";
import { readUser } from "@/service/localStorage";
import { useState } from "react";
const ProfileSettings = () => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const user = readUser();
        console.log("user", user);
        if (user) setUser(user);
    }, []);
    return (
        <>
            <TabView>
                <TabPanel header="Profile setting">
                    <ProfileSetting user={user} />
                </TabPanel>
                <TabPanel header="Password setting">
                    <PasswordSetting />
                </TabPanel>
            </TabView>
        </>
    );
};
export default ProfileSettings;
