"use client";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { getDevices } from "@/api/device.api";
import { Calendar } from "primereact/calendar";
import { getAlarmTypes } from "@/api/alarm.api";
import { readUser } from "@/service/localStorage";
import { MultiSelect } from "primereact/multiselect";
import { getDeviceByCustomer } from "@/api/device.api";
interface Props {
    showDevice?: boolean;
    showDate?: boolean;
    showAlarmType?: boolean;
    showSeverity?: boolean;
    showStatus?: boolean;
    onAction: (evt: any) => void;
}
const defFilter = {
    device: null,
    dates: null,
    alarmType: null,
    severity: [],
};
const FilterAlarm: React.FC<Props> = ({
    showDevice,
    onAction,
    showDate,
    showAlarmType,
    showSeverity,
    showStatus,
}) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const [suggAlarmType, setSuggAlarmType] = useState<any>([]);
    const [severityOps, setSeverityOps] = useState<any>([
        {
            label: "CRITICAL",
            value: "CRITICAL",
        },
        {
            label: "MAINTAINED",
            value: "MAJOR",
        },
    ]);
    const [statusOps, setStatusOps] = useState<any>([
        {
            label: "ACTIVE",
            value: "ACTIVE",
        },
        {
            label: "CLEARED",
            value: "CLEARED",
        },
    ]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    useEffect(() => {
        const user = readUser();
        if (user) {
            setCurrentUser(user);
        }
        console.log("user", user);
    }, []);

    useEffect(() => {
        let newFilter = {
            ...defFilter,
        };
        setEditFilter(newFilter);
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
    const _onSuggDevicesByCustomer = (evt: any) => {
        if (!currentUser?.customerId?.id) return;

        getDeviceByCustomer(currentUser.customerId.id, {
            page: 0,
            pageSize: 50,
        })
            .then((resp) => resp.data)
            .then((res) => {
                console.log("res", res);
                res.data.forEach((it: any) => {
                    it.label = `${it.name}`;
                });
                setSuggDevices([...res.data]);
            })
            .catch((err) => {
                console.log("err", err);
                setSuggDevices([]);
            });
    };
    const _processFilterChange: (field: string, value: any) => any = (
        field: string,
        value: any
    ) => {
        console.log(value);
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
                {showDevice &&
                    currentUser &&
                    currentUser.authority === "TENANT_ADMIN" && (
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
                {showDevice &&
                    currentUser &&
                    currentUser.authority === "CUSTOMER_USER" && (
                        <div className="col-12 lg:col-3">
                            <span className="p-float-label">
                                <AutoComplete
                                    dropdown
                                    suggestions={suggDevices}
                                    field="label"
                                    value={editFilter.device}
                                    completeMethod={_onSuggDevicesByCustomer}
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

                {showSeverity && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <MultiSelect
                                optionLabel="label"
                                options={severityOps}
                                value={editFilter.severity}
                                onChange={(e) => {
                                    _processFilterChange("severity", e.value);
                                }}
                            />
                            <label>Severity</label>
                        </span>
                    </div>
                )}
                {showStatus && (
                    <div className="col-12 lg:col-3">
                        <span className="p-float-label">
                            <MultiSelect
                                optionLabel="label"
                                options={statusOps}
                                value={editFilter.status}
                                onChange={(e) => {
                                    _processFilterChange("status", e.value);
                                }}
                            />
                            <label>Status</label>
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default FilterAlarm;
