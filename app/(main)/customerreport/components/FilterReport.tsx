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
    const items = [
        {
            label: "Furniture",
            icon: "pi pi-box",
            items: [],
        },
        {
            label: "Electronics",
            icon: "pi pi-mobile",
            items: [],
        },
        {
            label: "Sports",
            icon: "pi pi-clock",
            items: [],
        },
    ];

    const _fetchStations = useCallback(() => {
        let reqParams = {
            fromId: "d209a5b0-a484-11ee-a634-093bc1146158",
            fromType: "ASSET",
            relationType: "Contains",
            relationTypeGroup: "COMMON",
        };
        getRelations(reqParams)
            .then((resp) => resp.data)
            .then((resp) => {
                let data = resp || [];
                if (data.length > 0) {
                    let pms = data.map((dt: any) => {
                        //console.log(dt);
                        return getAssetById(dt["to"]["id"]);
                    });
                    Promise.all(pms)
                        .then((resp) => resp.map((dt: any) => dt.data))
                        .then((resp) => {
                            resp.forEach((it: any) => {
                                it.label = `${it.name}`;
                            });
                            console.log(resp); // list asset
                            let pms = resp.map((dt: any) => {
                                let reqParams = {
                                    fromId: dt.id.id,
                                    fromType: "ASSET",
                                    relationType: "Contains",
                                    relationTypeGroup: "COMMON",
                                };
                                return getRelations(reqParams);
                            });

                            Promise.all(pms)
                                .then((resp) => resp.map((dt: any) => dt.data))
                                .then((resp) => {
                                    console.log(resp);
                                    let data = resp || [];
                                    let pms = data.map((dt: any) => {
                                        for (let i = 0; i < dt.length; i++) {
                                            return getDeviceById(
                                                dt[i]["to"]["id"]
                                            );
                                        }
                                    });
                                    Promise.all(pms)
                                        .then((resp) =>
                                            resp.map((dt: any) => dt.data)
                                        )
                                        .then((resp) => {
                                            resp.forEach((it: any) => {
                                                it.label = `${it.name}`;
                                            });
                                            // setSuggDevices(resp);
                                            console.log(resp); // list device
                                        })
                                        .catch((e) => {
                                            console.log(e);
                                            //setSuggDevices([]);
                                        });
                                });
                        })
                        .catch((e) => {
                            console.log(e);
                            //  setSuggAssets([]);
                        });
                }
            })
            .catch((e) => {
                console.log(e);
                //  setSuggAssets([]);
            });
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
                        <MegaMenu model={items} />
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
