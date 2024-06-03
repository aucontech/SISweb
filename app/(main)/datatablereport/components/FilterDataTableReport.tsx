"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { getTimeseriesKeys } from "@/api/telemetry.api";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
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
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggTags, setSuggTags] = useState<any>([]);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [unitSuggestions, setUnitSuggestions] = useState<any[]>([]);

    // ... m
    useEffect(() => {
        let newFilter = {
            ...defFilter,
        };
        console.log(newFilter);
        setEditFilter({ ...newFilter });
    }, []);

    const _onOkSettingTagForm = () => {
        onAction(editFilter);
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
                //onClick={() => setIsClearConditionFormVisible(false)}
            />
        </div>
    );
    const _onSuggUnits = () => {
        setUnitSuggestions([
            { label: "°C", value: "°C" },
            { label: "cm³", value: "cm³" },
            { label: "m³", value: "m³" },
        ]);
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
    };
    const _handleChangeTag = (index: number, field: string, value: any) => {
        if (field === "key") {
            const isKeyDuplicate = editFilter.tags.some(
                (tag: any) => tag.key === value
            );

            if (isKeyDuplicate) {
                console.error(
                    "Error: Duplicate key detected. Please enter a unique key."
                );
                return;
            }
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
                    <>
                        <div key={index} className="formgrid grid">
                            <div className="field col">
                                <label>Key</label>
                                <AutoComplete
                                    dropdown
                                    value={dt.key}
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
                                    // completeMethod={_onSuggValueTypes}
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
                                        _handleChangeTag(
                                            index,
                                            "unit",
                                            e.value
                                        );
                                    }}
                                    completeMethod={_onSuggUnits}
                                />
                            </div>
                            <div className="field col">
                                <label>Action</label>
                                <Button onClick={handleDeleteTagSetting(index)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </>
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
                                onChange={(e) => {
                                    _processFilterChange("dates", e.value);
                                }}
                                showTime
                                hourFormat="24"
                                dateFormat="dd/mm/yy"
                            />
                            <label>Select Date</label>
                        </span>
                    </div>
                )}
                {showTags && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <Button
                                // dropdown
                                // multiple
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
                header="Condition Form"
                visible={isFormVisible}
                onHide={() => setIsFormVisible(false)}
                footer={footerClearConditionForm}
                style={{ width: "50vw" }}
            >
                <div className="card p-fluid">{_renderSettingTagForm()}</div>
                <Button onClick={handleAddTagSetting}>Add</Button>
            </Dialog>
        </>
    );
};

export default FilterDataTableReport;
