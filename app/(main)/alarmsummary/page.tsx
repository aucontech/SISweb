"use client";
import AlarmList from "./components/AlarmList";
import FilterAlarm from "./components/FilterAlarm";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getDeviceById } from "@/api/device.api";
const Alarm = () => {
    const searchParams = useSearchParams();
    const deviceId = searchParams.get("deviceId");
    const [filters, setFilters] = useState<any>({});
    const _onFilterChange = (evt: any) => {
        setFilters(evt);
    };

    useEffect(() => {
        if (deviceId !== null) {
            getDeviceById(deviceId)
                .then((resp) => resp.data)
                .then((res) => {
                    setFilters({ ...filters, device: res });
                })
                .catch((err) => console.log(err));
        }
    }, [deviceId]);

    return (
        <>
            <div>
                <FilterAlarm
                    onAction={_onFilterChange}
                    showDevice={true}
                    showDate={true}
                    showAlarmType={true}
                />
            </div>
            <AlarmList filters={filters} />
        </>
    );
};

export default Alarm;
