"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useRef, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Calendar } from "primereact/calendar";
import { getAlarmTypes } from "@/api/alarm.api";
import { getAssetById, getAssets } from "@/api/assets.api";
import { Toast } from "primereact/toast";
import { getRelations } from "@/api/relation.api";
import { dt } from "@fullcalendar/core/internal-common";
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
};
const FilterGcValue: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showAsset,
    showAlarmType,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggAssets, setSuggAssets] = useState<any>([]);
    const [suggAlarmType, setSuggAlarmType] = useState<any>([]);
    const toast = useRef<Toast>(null);
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
    const _onSuggAssets = async (evt: any) => {
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

                setSuggAssets(data);
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
            <Toast ref={toast} />
            <div className="grid p-fluid">
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
                            <label>Device</label>
                        </span>
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
                            <label>Assets</label>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterGcValue;
