"use client";
import AlarmList from "./components/AlarmList";
import FilterAlarm from "./components/FilterAlarm";
import { useState } from "react";
const Alarm = () => {
    const [filters, setFilters] = useState<any>({});
    const _onFilterChange = (evt: any) => {
        setFilters(evt);
    };
    return (
        <>
            <div>
                <FilterAlarm
                    onAction={_onFilterChange}
                    showDevice={true}
                    showDate={true}
                />
            </div>
            <AlarmList filters={filters} />
        </>
    );
};

export default Alarm;
