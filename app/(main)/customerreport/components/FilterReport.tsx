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
import { ASSET_SOGECCUSTOMERREPORT_ID } from "@/constants/constans";
interface Props {
    showDevice?: boolean;
    showDate?: boolean;
    showAlarmType?: boolean;
    onAction: (evt: any) => void;
}
interface MenuItem {
    id: string;
    originalLabel: string;
    label: string;
    icon: string;
    command?: () => void;
    items?: any[]; // Định nghĩa items là một mảng các MenuItem
}
const defFilter = {
    device: null,
    date: null,
    alarmType: null,
};
const FilterReport: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showAlarmType,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);

    const [suggAlarmType, setSuggAlarmType] = useState<any>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const _fetchStations = useCallback(async () => {
        try {
            let reqParams = {
                fromId: ASSET_SOGECCUSTOMERREPORT_ID,
                fromType: "ASSET",
                relationType: "Contains",
                relationTypeGroup: "COMMON",
            };
            const resp = await getRelations(reqParams);
            const data = resp.data || [];

            if (data.length > 0) {
                const menuItems = await Promise.all(
                    data.map(async (dt: any) => {
                        let item: MenuItem = {
                            id: dt["to"]["id"],
                            originalLabel: dt["name"], // Thêm originalLabel để lưu tên gốc của station
                            label: "",
                            icon: "pi pi-box",
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

                                    return {
                                        items: [
                                            {
                                                label: device["name"],
                                                data: device,
                                                command: () => {
                                                    _processFilterChange(
                                                        "device",
                                                        device,
                                                        asset.id.id
                                                    );
                                                },
                                            },
                                        ], // Gán trực tiếp các thiết bị vào `items` của `item`
                                    };
                                })
                            );
                            item.label = asset["name"];
                            item.originalLabel = asset["name"]; // Lưu tên gốc
                            item["items"] = [[...devices]];
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

    const _processFilterChange = (
        field: string,
        value: any,
        stationId?: string
    ) => {
        let newFil = { ...editFilter };
        newFil[field] = value;
        setEditFilter(newFil);
        console.log("newFil", menuItems);
        if (field === "device") {
            setMenuItems((prevItems) =>
                prevItems.map((item) => {
                    if (item.id === stationId) {
                        return {
                            ...item,
                            label: `${value.name}`,
                        };
                    } else {
                        return {
                            ...item,
                            label: `${item.originalLabel}`,
                        };
                    }
                })
            );
        }

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
    console.log("menuItems", menuItems);
    return (
        <>
            <div className="grid p-fluid">
                {showDevice && (
                    <div className="col-12 lg:col-5">
                        <MegaMenu model={menuItems} />
                    </div>
                )}
                {showDate && (
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
