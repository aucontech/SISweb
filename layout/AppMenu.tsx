import type { MenuModel } from "@/types";
import AppSubMenu from "./AppSubMenu";
import { useCallback, useEffect, useState } from "react";
import { readUser } from "@/service/localStorage";
import { getDeviceByCustomer } from "@/api/device.api";
import { MEIKO_DEVICE_ID, OTSUKA_DEVICE_ID } from "@/constants/constans";

const AppMenu = () => {
    const [model, setModel] = useState<MenuModel[]>([]);
    const _fetchDataDevciesByCustomer = useCallback(async () => {
        try {
            const user = readUser();
            const response = await getDeviceByCustomer(user.customerId.id, {
                page: 0,
                pageSize: 100,
            });
            const data = response.data.data; // Assuming response structure has a data attribute
            console.log(data);
            return data; // Ensure this matches the structure you expect
        } catch (err) {
            console.log(err);
            return []; // Return an empty array or handle the error as needed
        }
    }, []);

    useEffect(() => {
        const user = readUser();
        if (user && user.authority === "CUSTOMER_USER") {
            let modelData: MenuModel[] = [
                {
                    label: "Station detail",
                    icon: "pi pi-home",
                    items: [],
                },

                {
                    label: "Alarms",
                    icon: "pi pi-home",
                    items: [
                        {
                            label: "Alarm Summary",
                            icon: "pi pi-fw pi-comment",
                            to: "/alarmsummarycustomer",
                        },
                    ],
                },
                {
                    label: "Settings",
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
            _fetchDataDevciesByCustomer()
                .then((res) => {
                    let deviceIds = res.map((item: any) => item.id.id);
                    if (deviceIds && deviceIds.length > 0) {
                        switch (deviceIds[0]) {
                            case OTSUKA_DEVICE_ID:
                                if (
                                    modelData &&
                                    modelData.length > 0 &&
                                    modelData[0].items
                                ) {
                                    modelData[0].items.push({
                                        label: "Graphics",
                                        icon: "pi pi-fw pi-image",
                                        to: "/OTSUKA",
                                    });
                                }
                                setModel(modelData);
                                break;

                            case MEIKO_DEVICE_ID:
                                if (
                                    modelData &&
                                    modelData.length > 0 &&
                                    modelData[0].items
                                ) {
                                    modelData[0].items.push({
                                        label: "Graphics",
                                        icon: "pi pi-fw pi-image",
                                        to: "/Graphic/MEIKO",
                                    });
                                }
                                break;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
                    label: "Alarms",
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
                    label: "Devices",
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
                    label: "Reports",
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
                    label: "Settings",
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
    }, [_fetchDataDevciesByCustomer]);

    return <AppSubMenu model={model} />;
};

export default AppMenu;
