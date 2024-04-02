import type { MenuModel } from "@/types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Alarm History",
                    icon: "pi pi-fw pi-image",
                    to: "/alarmhistory",
                },
                // {
                //     label: "Realtime Monitoring",
                //     icon: "pi pi-fw pi-image",
                //     to: "/realtimemonitoring",
                // },
                {
                    label: "Notifications center",
                    icon: "pi pi-fw pi-image",
                    to: "/notifications",
                },
                {
                    label: "Devices",
                    icon: "pi pi-fw pi-image",
                    to: "/devices",
                },
                {
                    label: "Device Profiles",
                    icon: "pi pi-fw pi-image",
                    to: "/deviceprofiles",
                },
                // {
                //     label: "OTSUKA",
                //     icon: "pi pi-fw pi-image",
                //     to: "/OTSUKA",
                // },
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
