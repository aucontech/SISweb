"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Utils } from "@/service/Utils";
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
    const [editFilter, setEditFilter] = useState<any>(defFilter);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggTags, setSuggTags] = useState<any>([]);

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

    // }, []);
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
                                dateFormat="dd/mm/yy"
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
