import type { MenuModel } from "@/types";
import AppSubMenu from "./AppSubMenu";
import { useEffect, useState } from "react";
import { readUser } from "@/service/localStorage";
const AppMenu = () => {
    const [model, setModel] = useState<MenuModel[]>([]);
    useEffect(() => {
        const user = readUser();
        if (user && user.authority === "CUSTOMER_USER") {
            const modelData: MenuModel[] = [
                {
                    label: "Station detail",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Graphics",
                            icon: "pi pi-fw pi-home",
                            to: "/OTSUKA",
                        },
                        // {
                        //     label: "Setup Data",
                        //     icon: "pi pi-fw pi-home",
                        //     to: "/SetupData",
                        // },
                        // {
                        //     label: "Score card",
                        //     icon: "pi pi-fw pi-home",
                        //     to: "/scorecard",
                        // },
                    ],
                },
                {
                    label: "Alarm" ,
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Alarm Summary",
                            icon: "pi pi-fw pi-comment",
                            to: "/alarmsummarycustomer",
                        },
                        // {
                        //     label: "Alarm History",
                        //     icon: "pi pi-fw pi-calendar",
                        //     to: "/alarmhistorycustomer",
                        // },
                    ],
                },
                {
                    label: "Setting",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "User",
                            icon: "pi pi-fw pi-user",
                            to: "/user",
                        },
                    ],
                },
            ];
            setModel(modelData);
        } else {
            const modelData: MenuModel[] = [

               
                {
                    label: "Dashboards",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Overview",
                            icon: "pi pi-fw pi-home",
                            to: "/scorecard",
                        },
                    ],
                },

                {
                    label: "Station Details",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Graphics",
                            icon: "pi pi-fw pi-image",
                            to: "/Graphic",
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
                            to: "/alarmsummary",
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
                            label: "Setup Data",
                            icon: "pi pi-fw pi-sliders-h",
                            to: "/SetupData",
                        },
                        {
                            label: "Station List",
                            icon: "pi pi-fw pi-list",
                            to: "/devices",
                        },
                        // {
                        //     label: "Device Profile",
                        //     icon: "pi pi-fw pi-table",
                        //     to: "/deviceprofiles",
                        // },
                    ],
                },
                // {
                //     label: "Summary",
                //     icon: "pi pi-home",
                //     items: [
                //         {
                //             label: "Table",
                //             icon: "pi pi-fw pi-table",
                //             // to: "/notifications",
                //         },
                //         {
                //             label: "List",
                //             icon: "pi pi-fw pi-list",
                //             // to: "/devices",
                //         },
                //     ],
                // },
                {
                    label: "Report",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Customer Report",
                            icon: "pi pi-fw pi-table",
                            to: "/customerreport",
                        },
                        {
                            label: "GC values",
                            icon: "pi pi-fw pi-table",
                            to: "/gcvalues",
                        },

                        {
                            label: "Data Table Report",
                            icon: "pi pi-fw pi-comment",
                            to: "/datatablereport",
                        },
                        {
                            label: "Historical Chart",
                            icon: "pi pi-fw pi-chart-bar",
                            to: "/historicalchart",
                        },
                        {
                            label: "File Manager",
                            icon: "pi pi-fw pi-file",
                            to: "/filemanager",
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
                            to: "/user",
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
            setModel(modelData);
        }
    }, []);

    return <AppSubMenu model={model} />;
};

export default AppMenu;
