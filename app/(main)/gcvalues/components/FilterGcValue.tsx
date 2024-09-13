"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useRef, useState } from "react";
import { getDeviceById } from "@/api/device.api";
import { Calendar } from "primereact/calendar";

import { getAssetById } from "@/api/assets.api";
import { Toast } from "primereact/toast";
import { getRelations } from "@/api/relation.api";
import { ASSET_SOGECCUSTOMERREPORT_ID } from "@/constants/constans";
interface Props {
    showDevice?: boolean;
    showDate?: boolean;
    showAsset?: boolean;
    showAlarmType?: boolean;
    onAction: (evt: any) => void;
}
const defFilter = {
    device: null,
    date: null,
    asset: null,
    alarmType: null,
    devices: [],
};
const FilterGcValue: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showAsset,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggAssets, setSuggAssets] = useState<any>([]);

    const toast = useRef<Toast>(null);
    useEffect(() => {
        let newFilter = {
            ...defFilter,
        };
        setEditFilter(editFilter);
    }, []);
    useEffect(() => {
        if (editFilter && editFilter.asset && editFilter.asset.id) {
            console.log(editFilter.asset);
            let reqParams = {
                fromId: editFilter.asset.id.id,
                fromType: "ASSET",
                relationType: "Contains",
                relationTypeGroup: "COMMON",
            };
            getRelations(reqParams)
                .then((resp) => resp.data)
                .then((resp) => {
                    console.log(resp);
                    let data = resp || [];
                    if (data.length > 0) {
                        let pms = data.map((dt: any) => {
                            return getDeviceById(dt["to"]["id"]);
                        });
                        Promise.all(pms)
                            .then((resp) => resp.map((dt: any) => dt.data))
                            .then((resp) => {
                                // resp.forEach((it: any) => {
                                //     it.label = `${it.name}`;
                                // });
                                // setSuggDevices(resp);
                                let newEditFilter = {
                                    ...editFilter,
                                    devices: resp,
                                };
                                setEditFilter(newEditFilter);
                                onAction(newEditFilter);
                            })
                            .catch((e) => {
                                console.log(e);
                                setSuggDevices([]);
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // setSuggAssets([]);
                });
        } else {
            let newEditFilter = {
                ...editFilter,
                devices: [],
            };
            setEditFilter(newEditFilter);
            onAction(newEditFilter);
        }
    }, [editFilter.asset]);
    const _onSuggDevices = (evt: any) => {
        if (editFilter && editFilter.asset && editFilter.asset.id) {
            console.log(editFilter.asset);
            let reqParams = {
                fromId: editFilter.asset.id.id,
                fromType: "ASSET",
                relationType: "Contains",
                relationTypeGroup: "COMMON",
            };
            getRelations(reqParams)
                .then((resp) => resp.data)
                .then((resp) => {
                    console.log(resp);
                    let data = resp || [];
                    if (data.length > 0) {
                        let pms = data.map((dt: any) => {
                            return getDeviceById(dt["to"]["id"]);
                        });
                        Promise.all(pms)
                            .then((resp) => resp.map((dt: any) => dt.data))
                            .then((resp) => {
                                resp.forEach((it: any) => {
                                    it.label = `${it.name}`;
                                });
                                setSuggDevices(resp);
                            })
                            .catch((e) => {
                                console.log(e);
                                setSuggDevices([]);
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // setSuggAssets([]);
                });
        } else {
            setSuggDevices([]);
        }
    };
    const _onSuggAssets = (evt: any) => {
        let reqParams = {
            fromId: ASSET_SOGECCUSTOMERREPORT_ID,
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
                        return getAssetById(dt["to"]["id"]);
                    });
                    Promise.all(pms)
                        .then((resp) => resp.map((dt: any) => dt.data))
                        .then((resp) => {
                            resp.forEach((it: any) => {
                                it.label = `${it.name}`;
                            });
                            setSuggAssets(resp);
                        })
                        .catch((e) => {
                            console.log(e);
                            setSuggAssets([]);
                        });
                }
            })
            .catch((e) => {
                console.log(e);
                setSuggAssets([]);
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

    return (
        <>
            <Toast ref={toast} />
            <div className="grid p-fluid">
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
                {showAsset && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                suggestions={suggAssets}
                                field="label"
                                value={editFilter.asset}
                                completeMethod={_onSuggAssets}
                                onChange={(e) =>
                                    _processFilterChange("asset", e.value)
                                }
                            />
                            <label>Type</label>
                        </span>
                    </div>
                )}
                {showDevice && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
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
                            <label>Devices</label>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterGcValue;
