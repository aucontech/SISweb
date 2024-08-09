"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Dialog } from "primereact/dialog";
import {
    getSeverAttributesByDeviceandKeys,
    getTimeseriesKeys,
} from "@/api/telemetry.api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "./FilterDataTableReport.module.css";

import { MultiSelect } from "primereact/multiselect";
import dayjs from "dayjs"; // Import dayjs

import { DatePicker } from "antd"; // Import DatePicker from Ant Design

const { RangePicker } = DatePicker; // Destructure RangePicker from DatePicker

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
    tags: [
        {
            key: "",
            name: "",
            unit: null,
        },
    ],
};
const FilterDataTableReport: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showTags,
}) => {
    const [editFilter, setEditFilter] = useState<any>(defFilter);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggTags, setSuggTags] = useState<any>([]);
    const [suggAllTags, setSuggAllTags] = useState<any>([]);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [unitSuggestions, setUnitSuggestions] = useState<any[]>([]);
    const [unitAttribute, setUnitAttribute] = useState<any>({});

    // useEffect(() => {
    //     if (editFilter.dates) {
    //         setDateRange([
    //             dayjs(editFilter.dates[0]),
    //             dayjs(editFilter.dates[1]),
    //         ]);
    //     }
    // }, [editFilter.dates]);

    const handleDateRangeChange = (dates: any) => {
        console.log(dates);
        if (dates !== null) {
            const startDate = dates[0] ? dates[0] : null;
            const endDate = dates[1] ? dates[1] : null;
            const dateRange = [startDate, endDate];
            _processFilterChange("dates", dateRange);
        } else {
            _processFilterChange("dates", null);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedFilter = localStorage.getItem("filterDataTableReport");
            if (storedFilter) {
                const parsedFilter = JSON.parse(storedFilter);
                // Parse dates from localStorage
                parsedFilter.dates = parsedFilter.dates
                    ? parsedFilter.dates.map((dateStr: string) =>
                          dayjs(dateStr)
                      )
                    : null;
                setEditFilter(parsedFilter);
                onAction(parsedFilter);
            }
        }
    }, []);
    const _processFilterChange: (field: string, value: any) => any = (
        field: string,
        value: any
    ) => {
        let newFil = { ...editFilter };
        newFil[field] = value;
        setEditFilter(newFil);
        onAction(newFil);
        localStorage.setItem("filterDataTableReport", JSON.stringify(newFil));
    };
    const _onOkSettingTagForm = () => {
        let tags = [...editFilter.tags].filter((tag: any) => tag.key !== "");
        _processFilterChange("tags", tags);
        setIsFormVisible(false);
    };
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
    const footerClearConditionForm = (
        <div>
            <Button
                label="Ok"
                icon="pi pi-check"
                onClick={_onOkSettingTagForm}
                autoFocus
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setIsFormVisible(false)}
            />
        </div>
    );
    const _onSuggUnits = (e: any) => {
        let serach = e.query;
        const units = [
            { label: "month", value: "month" },
            { label: "˚C", value: "˚C" },
            { label: "BARA", value: "BARA" },
            { label: "SM³", value: "SM³" },
            { label: "M³", value: "M³" },
            { label: "SM³/H", value: "SM³/H" },
            { label: "M³/H", value: "M³/H" },
            { label: "% LEL", value: "% LEL" },
            { label: "BARG", value: "BARG" },
        ];
        //find and filter
        let filtered: any[] = [];
        for (let i = 0; i < units.length; i++) {
            let unit = units[i];
            if (unit.label.toLowerCase().includes(serach.toLowerCase())) {
                filtered.push(unit);
            }
        }
        setUnitSuggestions(filtered);
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
                    console.error(error);
                });
        }
    };
    const _handleChangeTag = (index: number, field: string, value: any) => {
        if (field === "key") {
            const isKeyDuplicate = [...editFilter.tags].some(
                (tag: any) => tag.key === value
            );

            if (isKeyDuplicate) {
                console.error(
                    "Error: Duplicate key detected. Please enter a unique key."
                );
                return;
            }
        }
        if (field === "unit" && typeof value === "string") {
            setEditFilter((prevFilter: any) => {
                const updatedTags = [...prevFilter.tags];
                updatedTags[index] = {
                    ...updatedTags[index],
                    [field]: { label: value, value: value },
                };
                return { ...prevFilter, tags: updatedTags };
            });
            return;
        }
        if (field === "key") {
            setEditFilter((prevFilter: any) => {
                const updatedTags = [...prevFilter.tags];
                updatedTags[index] = {
                    ...updatedTags[index],
                    [field]: value,
                    name: value,
                    unit: {
                        label: unitAttribute[value] ? unitAttribute[value] : "",
                        value: unitAttribute[value] ? unitAttribute[value] : "",
                    },
                };
                return { ...prevFilter, tags: updatedTags };
            });
            return;
        }
        setEditFilter((prevFilter: any) => {
            const updatedTags = [...prevFilter.tags];
            updatedTags[index] = { ...updatedTags[index], [field]: value };
            return { ...prevFilter, tags: updatedTags };
        });
    };

    const handleDeleteTagSetting = (index: number) => {
        return () => {
            setEditFilter((prevFilter: any) => {
                const updatedTags = [...prevFilter.tags];
                updatedTags.splice(index, 1);
                return { ...prevFilter, tags: updatedTags };
            });
        };
    };
    const _renderSettingTagForm = () => {
        let { tags } = editFilter;
        if (tags && tags.length > 0) {
            return tags.map((dt: any, index: number) => {
                return (
                    <div key={index} className="formgrid grid">
                        <div className="field col">
                            <label>Key</label>
                            <AutoComplete
                                dropdown
                                value={dt?.key}
                                suggestions={suggTags}
                                completeMethod={_onSuggTags}
                                onChange={(e) => {
                                    _handleChangeTag(index, "key", e.value);
                                }}
                            />
                        </div>
                        <div className="field col">
                            <label>Name</label>
                            <InputText
                                value={dt.name}
                                onChange={(e: any) => {
                                    _handleChangeTag(
                                        index,
                                        "name",
                                        e.target.value
                                    );
                                }}
                            />
                        </div>
                        <div className="field col">
                            <label>Unit</label>
                            <AutoComplete
                                dropdown
                                field="label"
                                suggestions={unitSuggestions}
                                value={dt.unit}
                                onChange={(e) => {
                                    _handleChangeTag(index, "unit", e.value);
                                }}
                                completeMethod={(e) => _onSuggUnits(e)}
                            />
                        </div>
                        <div className="field col">
                            <label className="w-full">Action</label>
                            <Button
                                className="w-6"
                                onClick={handleDeleteTagSetting(index)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                );
            });
        }
    };
    const handleAddTagSetting = () => {
        setEditFilter((prevFilter: any) => ({
            ...prevFilter,
            tags: [
                ...prevFilter.tags,
                { key: "", name: "", unit: null }, // Add a new empty tag object
            ],
        }));
    };
    const _handleAddMultiTagSetting = (values: any) => {
        let newTags = values.map((key: string) => ({
            key,
            name: key,
            unit: {
                label: unitAttribute[key] ? unitAttribute[key] : "",
                value: unitAttribute[key] ? unitAttribute[key] : "",
            },
        }));

        setEditFilter((prevFilter: any) => ({
            ...prevFilter,
            tags: [...newTags],
        }));
    };
    const handleDateRangeOk = (dates: any) => {
        console.log(dates);
        if (dates && dates.length === 2 && dates[0] && dates[1]) {
            const [start, end] = dates;
            const dateRange = [start, end];
            _processFilterChange("dates", dateRange);
        }
    };

    useEffect(() => {
        if (editFilter.device && editFilter.device.id) {
            let pm1 = getTimeseriesKeys("DEVICE", editFilter.device.id.id);
            let pm2 = getSeverAttributesByDeviceandKeys(
                editFilter.device.id.id,
                "Units"
            );
            Promise.all([pm1, pm2])
                .then((resp) => {
                    let keys = resp[0].data;
                    let units = resp[1].data;
                    if (units && units.length > 0) {
                        let unitObj = units[0]["value"];
                        setUnitAttribute(unitObj);
                    }
                    setSuggAllTags(keys);
                    setSuggTags(keys);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [editFilter.device]);

    return (
        <>
            <div className="grid p-fluid">
                {showDevice && (
                    <div className="col-12 lg:col-3 md:col-3">
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
                    <div className="col-12 lg:col-3 md:col-3">
                        <div className={styles.dateRangeWrapper}>
                            <div className={styles.floatLabel}>
                                <RangePicker
                                    showTime
                                    style={{ padding: "0.65rem" }}
                                    format="DD/MM/YYYY HH:mm"
                                    placeholder={["Start Time", "End Time"]}
                                    value={
                                        editFilter.dates
                                            ? // editFilter.dates.length === 2 &
                                              // editFilter.dates[0] &&
                                              // editFilter.dates[1]
                                              [
                                                  editFilter.dates[0]
                                                      ? dayjs(
                                                            editFilter.dates[0]
                                                        )
                                                      : null,
                                                  editFilter.dates[1]
                                                      ? dayjs(
                                                            editFilter.dates[1]
                                                        )
                                                      : null,
                                              ]
                                            : null
                                    }
                                    onChange={(dates) =>
                                        handleDateRangeChange(dates)
                                    }
                                    onOk={handleDateRangeOk}
                                    className={
                                        editFilter.dates &&
                                        editFilter.dates.length > 0
                                            ? "ant-picker-has-value"
                                            : ""
                                    }
                                />
                                <label>Select date</label>
                            </div>
                        </div>
                    </div>
                )}
                {showTags && (
                    <div className="col-12 lg:col-3 md:col-4">
                        <span className="p-float-label">
                            <Button
                                // dropdown
                                className="w-6 flex justify-content-center"
                                onClick={() => setIsFormVisible(true)}
                                value={editFilter.tags}
                                // onChange={(e) => {
                                //     _processFilterChange("tags", e.value);
                                // }}
                                // suggestions={suggTags}
                                // completeMethod={_onSuggTags}
                            >
                                Add tags
                            </Button>
                        </span>
                    </div>
                )}
            </div>
            <Dialog
                header="Setting Tags Form"
                visible={isFormVisible}
                onHide={() => setIsFormVisible(false)}
                footer={footerClearConditionForm}
                style={{ width: "50vw" }}
            >
                <div className="card p-fluid">
                    <MultiSelect
                        value={
                            editFilter.tags && editFilter.tags.length > 0
                                ? editFilter.tags.map((tag: any) => tag.key)
                                : []
                        }
                        options={suggAllTags}
                        onChange={(e) => {
                            _handleAddMultiTagSetting(e.value);
                        }}
                    />
                    <br />
                    {_renderSettingTagForm()}
                </div>
                <Button onClick={handleAddTagSetting}>Add</Button>
            </Dialog>
        </>
    );
};

export default FilterDataTableReport;
