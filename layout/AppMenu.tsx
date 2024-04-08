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
                {
                    label: "OTSUKA",
                    icon: "pi pi-fw pi-image",
                    to: "/OTSUKA",
                },
            ],
        },
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Overview",
                    icon: "pi pi-fw pi-home",
                    // to: "/notifications",
                },
                {
                    label: "Station Details",
                    icon: "pi pi-fw pi-home",
                    to: "/devices",
                },
            ],
        },
        {
            label: "Alarm",
            icon: "pi pi-home",
            items: [
                {
                    label: "Alarm Summary",
                    icon: "pi pi-fw pi-comment",
                    to: "/notifications",
                },
                {
                    label: "Alarm History",
                    icon: "pi pi-fw pi-calendar",
                    to: "/alarmhistory",
                },
            ],
        },
        {
            label: "Device",
            icon: "pi pi-home",
            items: [
                {
                    label: "Device List",
                    icon: "pi pi-fw pi-list",
                    to: "/notifications",
                },
                {
                    label: "Device Profile",
                    icon: "pi pi-fw pi-table",
                    to: "/devices",
                },
                {
                    label: "Chart",
                    icon: "pi pi-fw pi-chart-bar",
                    // to: "/devices",
                },
            ],
        },
        {
            label: "Summary",
            icon: "pi pi-home",
            items: [
                {
                    label: "Table",
                    icon: "pi pi-fw pi-table",
                    // to: "/notifications",
                },
                {
                    label: "List",
                    icon: "pi pi-fw pi-list",
                    // to: "/devices",
                },
            ],
        },
        {
            label: "Report",
            icon: "pi pi-home",
            items: [
                {
                    label: "Customer Report",
                    icon: "pi pi-fw pi-table",
                    // to: "/notifications",
                },
                {
                    label: "All In One Report",
                    icon: "pi pi-fw pi-list",
                    // to: "/devices",
                },
                {
                    label: "File Manager",
                    icon: "pi pi-fw pi-file",
                    // to: "/devices",
                },
            ],
        },
        {
            label: "Setting",
            icon: "pi pi-home",
            items: [
                {
                    label: "User",
                    icon: "pi pi-fw pi-user",
                    // to: "/notifications",
                },
                {
                    label: "About Us",
                    icon: "pi pi-fw pi-user",
                    // to: "/devices",
                },
                {
                    label: "Help",
                    icon: "pi pi-fw pi-question-circle",
                    // to: "/devices",
                },
                {
                    label: "Contact Us",
                    icon: "pi pi-fw pi-phone",
                    // to: "/devices",
                },
                {
                    label: "Documentation",
                    icon: "pi pi-fw pi-exclamation-circle",
                    // to: "/devices",
                },
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
