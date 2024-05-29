"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Calendar } from "primereact/calendar";

import { getTimeseriesKeys } from "@/api/telemetry.api";

interface Props {
    showDevice: boolean;
    showDate?: boolean;
    showAlarmType?: boolean;
    showTags?: boolean;
    // showDates?: boolean;
    onAction: (evt: any) => void;
}
const defFilter = {
    device: null,
    dates: null,
    tags: [],
};
const FilterDataChartReport: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showTags,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggTags, setSuggTags] = useState<any>([]);

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
    const _onSuggTags = (evt: any) => {
        if (editFilter.device) {
            console.log(editFilter.device);
            getTimeseriesKeys("DEVICE", editFilter.device.id.id)
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setSuggTags([...res]);
                })
                .catch((error) => {});
        }
        // getAlarmTypes({ page: 0, pageSize: 50, textSearch: evt.query })
        //     .then((resp) => resp.data)
        //     .then((resp) => {
        //         setSuggAlarmType([...resp.data]);
        //     })
        //     .catch((err) => {
        //         setSuggAlarmType([]);
        //     });
    };
    return (
        <>
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
                                value={editFilter.dates}
                                selectionMode="range"
                                showTime
                                hourFormat="24"
                                onChange={(e) => {
                                    _processFilterChange("dates", e.value);
                                }}
                            />
                            <label>Select Date</label>
                        </span>
                    </div>
                )}
                {showTags && (
                    <div className="col-12 lg:col-6">
                        <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                multiple
                                //  field="type"
                                value={editFilter.tags}
                                onChange={(e) => {
                                    _processFilterChange("tags", e.value);
                                }}
                                suggestions={suggTags}
                                completeMethod={_onSuggTags}
                            />
                            <label>Tags Name</label>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterDataChartReport;
