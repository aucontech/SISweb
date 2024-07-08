"use client";
import AlarmList from "../components/AlarmList";
import FilterAlarm from "../components/FilterAlarm";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getDeviceById } from "@/api/device.api";
const Alarm = () => {
    const searchParams = useSearchParams();
    const deviceid = searchParams.get("deviceid");
    const [filters, setFilters] = useState<any>({});
    const _onFilterChange = (evt: any) => {
        setFilters(evt);
    };

    useEffect(() => {
        if (deviceid !== null) {
            getDeviceById(deviceid)
                .then((resp) => resp.data)
                .then((res) => {
                    setFilters({ ...filters, device: res });
                })
                .catch((err) => console.log(err));
        }
    }, [deviceid]);

    return (
        <>
            <div>
                <FilterAlarm
                    onAction={_onFilterChange}
                    showDevice={true}
                    showDate={true}
                    showStatus={true}
                    showSeverity={true}
                />
            </div>
            <AlarmList filters={filters} />
        </>
    );
};

export default Alarm;
