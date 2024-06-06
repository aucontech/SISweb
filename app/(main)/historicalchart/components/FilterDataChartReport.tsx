"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Utils } from "@/service/Utils";
import { Calendar } from "primereact/calendar";
import { getTimeseriesKeys } from "@/api/telemetry.api";
import { set } from "lodash";
interface Props {
    showDevice: boolean;
    showDate?: boolean;
    showAlarmType?: boolean;
    showTags?: boolean;
    showAggregations?: boolean;
    // showDates?: boolean;
    onAction: (evt: any) => void;
}

const defFilter = {
    device: null,
    dates: null,
    agg: null,
    tags: [],
};

const FilterDataChartReport: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showTags,
    showAggregations,
}) => {
    const [editFilter, setEditFilter] = useState<any>(defFilter);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggTags, setSuggTags] = useState<any>([]);
    const [suggAggFuncs, setSuggAggFuncs] = useState<any>([]);
    const [suggestGroupInterval, setSuggestGroupInterval] = useState<any>([]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedFilter = localStorage.getItem("filterDataChartReport");
            if (storedFilter) {
                const parsedFilter = JSON.parse(storedFilter);
                console.log(parsedFilter);
                // Parse dates from localStorage
                parsedFilter.dates = parsedFilter.dates
                    ? parsedFilter.dates.map((dateStr: string) =>
                          Utils.parseDateFromStorage(dateStr)
                      )
                    : null;

                setEditFilter(parsedFilter);
                onAction(parsedFilter);
            }
        }
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
                console.error("Failed to fetch devices:", err);
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
        localStorage.setItem("filterDataChartReport", JSON.stringify(newFil));
    };

    const _onSuggTags = (evt: any) => {
        let search = evt.query;
        if (editFilter.device) {
            getTimeseriesKeys("DEVICE", editFilter.device.id.id)
                .then((resp) => resp.data)
                .then((res) => {
                    const regex = new RegExp(`^${search}`, "i");
                    setSuggTags(res.filter((item: any) => regex.test(item)));
                })
                .catch((error) => {
                    console.error("Failed to fetch tags:", error);
                    setSuggTags([]); // Handle errors by clearing suggestions
                });
        }
    };
    const _onSuggAggregations = () => {
        setSuggAggFuncs([
            { label: "AVG", value: "AVG" },
            // { label: "MAX", value: "MAX" },
            // { label: "MIN", value: "MIN" },
            // { label: "COUNT", value: "COUNT" },
            // { label: "SUM", value: "SUM" },
            { label: "NONE", value: "NONE" },
        ]);
    };

    const _onGroupInterval = () => {
        setSuggestGroupInterval([
            { label: "30 minutes", value: 1800000 },
            { label: "60 minutes", value: 3600000 },
            { label: "2 hours", value: 7200000 },
            { label: "5 hours", value: 18000000 },
        ]);
    };

    // const _onGroupInterval = () =>
    //     setSuggestGroupInterval([
    //         { label: "30 minutes", value: 1800000 },
    //         { label: "60 mitues", value: 3600000 },
    //         { label: "2 hours", value: 7200000 },
    //         { label: "5 hours", value: 7200000 },
    //     ]);
    // }
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         // Format dates before storing
    //         const filterToStore = {
    //             ...editFilter,
    //             dates: editFilter.dates
    //                 ? editFilter.dates.map((date: Date) =>
    //                       formatDateForStorage(date)
    //                   )
    //                 : null,
    //         };
    //         localStorage.setItem(
    //             "filterDataChartReport",
    //             JSON.stringify(filterToStore)
    //         );
    //     }
    // }, [editFilter]);
    console.log(editFilter);
    return (
        <>
            <div className="grid p-fluid">
                {showDevice && (
                    <div className="col-12 lg:col-2">
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
                                dateFormat="dd/mm/yy"
                            />
                            <label>Select Date</label>
                        </span>
                    </div>
                )}
                {showTags && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                multiple
                                //  field="type"
                                style={{
                                    width: "100%",
                                    maxHeight: "100px",
                                    overflowY: "hidden",
                                    overflowX: "auto",
                                }}
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
                {showAggregations && (
                    <div className="col-12 lg:col-2">
                        <span className="p-float-label">
                            <AutoComplete
                                dropdown
                                field="label"
                                value={editFilter.agg}
                                onChange={(e) => {
                                    _processFilterChange("agg", e.value);
                                }}
                                suggestions={suggAggFuncs}
                                completeMethod={_onSuggAggregations}
                            />
                            <label>Aggregation function</label>
                        </span>
                    </div>
                )}
                {editFilter &&
                    editFilter.avg &&
                    editFilter.avg.label !== "NONE" && (
                        <div className="col-12 lg:col-2">
                            <span className="p-float-label">
                                <AutoComplete
                                    dropdown
                                    field="label"
                                    value={editFilter.interval}
                                    onChange={(e) => {
                                        _processFilterChange(
                                            "interval",
                                            e.value
                                        );
                                    }}
                                    suggestions={suggestGroupInterval}
                                    completeMethod={_onGroupInterval}
                                />
                                <label>Grouping interval</label>
                            </span>
                        </div>
                    )}
            </div>
        </>
    );
};

export default FilterDataChartReport;
