import { TabView, TabPanel } from "primereact/tabview";
import NotificationList from "./components/NotificationList";

const Banking = () => {
    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <TabView>
                    <TabPanel header=" UnRead">
                    <NotificationList unreadOnly={true} />
                    </TabPanel>
                    <TabPanel header="Read">
                    <NotificationList unreadOnly={false} />

                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default Banking;
