"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useCallback, useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Calendar } from "primereact/calendar";
import { MegaMenu } from "primereact/megamenu";
import { getAlarmTypes } from "@/api/alarm.api";
import { getRelations } from "@/api/relation.api";
import { getAssetById } from "@/api/assets.api";
import { getDeviceById } from "@/api/device.api";
import { get, set } from "lodash";
import { co } from "@fullcalendar/core/internal-common";
interface Props {
    showDevice?: boolean;
    showDate?: boolean;
    showAlarmType?: boolean;
    onAction: (evt: any) => void;
}
const defFilter = {
    device: null,
    date: null,
    alarmType: null,
};
const FilterReport: React.FC<Props> = ({
    showDevice,
    onAction,
    showAlarmType,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggAlarmType, setSuggAlarmType] = useState<any>([]);
    const [menuItems, setMenuItems] = useState<any>([]);
    // const items = [
    //     {
    //         label: "Furniture",
    //         icon: "pi pi-box",
    //         items: [],
    //     },
    //     {
    //         label: "Electronics",
    //         icon: "pi pi-mobile",
    //         items: [],
    //     },
    //     {
    //         label: "Sports",
    //         icon: "pi pi-clock",
    //         items: [],
    //     },
    // ];

    const _fetchStations = useCallback(async () => {
        try {
            let reqParams = {
                fromId: "d209a5b0-a484-11ee-a634-093bc1146158",
                fromType: "ASSET",
                relationType: "Contains",
                relationTypeGroup: "COMMON",
            };
            const resp = await getRelations(reqParams);
            const data = resp.data || [];

            if (data.length > 0) {
                const menuItems = await Promise.all(
                    data.map(async (dt: any) => {
                        let item = {
                            label: "",
                            icon: "pi pi-clock",
                            command: () => {
                                console.log("device");
                            },
                        };
                        try {
                            const assetResp = await getAssetById(
                                dt["to"]["id"]
                            );
                            const asset = assetResp.data || {};
                            let reqParams = {
                                fromId: asset.id.id,
                                fromType: "ASSET",
                                relationType: "Contains",
                                relationTypeGroup: "COMMON",
                            };
                            const resp = await getRelations(reqParams);
                            const datare = resp.data || [];
                            let devices = await Promise.all(
                                datare.map(async (dt: any) => {
                                    const deviceResp = await getDeviceById(
                                        dt["to"]["id"]
                                    );
                                    const device = deviceResp.data || {};
                                    console.log(device);
                                    return {
                                        //data: device,
                                        // label: "station list",
                                        items: [
                                            {
                                                label: device["name"],
                                                data: device,
                                                command: () => {
                                                    //how to get data
                                                    console.log(device);
                                                },
                                            },
                                        ], // Gán trực tiếp các thiết bị vào `items` của `item`
                                    };
                                })
                            );
                            console.log(devices);
                            item.label = asset["name"];
                            item["items"] = [[...devices]];
                            //   item.items = devices; // Gán trực tiếp các thiết bị vào `items` của `item`
                        } catch (e) {
                            console.log(e);
                        }
                        return item;
                    })
                );
                console.log(menuItems);
                setMenuItems(menuItems); // Cập nhật menuItems sau khi tất cả các lời gọi API hoàn thành
            }
        } catch (e) {
            console.log(e);
        }
    }, []);
    useEffect(() => {
        _fetchStations();
    }, [_fetchStations]);

    useEffect(() => {
        let newFilter = {
            ...defFilter,
        };
        setEditFilter(editFilter);
    }, []);
    const _onSuggDevices = (evt: any) => {
        getDevices({ page: 0, pageSize: 50, textSearch: evt.query })
            .then((resp) => resp.data)
            .then((res) => {
                res.data.forEach((it: any) => {
                    it.label = `${it.name}`;
                });
                setSuggDevices([...res.data]);
            })
            .catch((err) => {
                setSuggDevices([]);
            });
    };
    const _processFilterChange: (field: string, value: any) => any = (
        field: string,
        value: any
    ) => {
        let newFil = { ...editFilter };
        newFil[field] = value;
        setEditFilter(newFil);
        onAction(newFil);
    };
    const _onSuggAlarmType = (evt: any) => {
        getAlarmTypes({ page: 0, pageSize: 50, textSearch: evt.query })
            .then((resp) => resp.data)
            .then((resp) => {
                setSuggAlarmType([...resp.data]);
            })
            .catch((err) => {
                setSuggAlarmType([]);
            });
    };
    return (
        <>
            <div className="grid p-fluid">
                {showDevice && (
                    <div className="col-12 lg:col-6">
                        {/* <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                suggestions={suggDevices}
                                field="label"
                                value={editFilter.device}
                                completeMethod={_onSuggDevices}
                                onChange={(e) =>
                                    _processFilterChange("device", e.value)
                                }
                            />
                            <label>Device</label>
                        </span> */}
                        <MegaMenu model={menuItems} />
                    </div>
                )}
                {showDevice && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <Calendar
                                value={editFilter.date}
                                onChange={(e) => {
                                    _processFilterChange("date", e.value);
                                }}
                            />
                            <label>Select Date</label>
                        </span>
                    </div>
                )}
                {showAlarmType && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                field="type"
                                value={editFilter.alarmType}
                                onChange={(e) => {
                                    _processFilterChange("alarmType", e.value);
                                }}
                                suggestions={suggAlarmType}
                                completeMethod={_onSuggAlarmType}
                            />
                            <label>Alarm type</label>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterReport;
