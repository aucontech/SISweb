"use client";
import FilterDataTableReport from "./components/FilterDataTableReport";
import ChartReport from "./components/ChartReport";
import { useState } from "react";
const DataChartReport = () => {
    const [filters, setFilters] = useState<any>({});

    const _onFilterChange = (e: any) => {
        setFilters({ ...e });
    };
    return (
        <>
            <FilterDataTableReport
                showDevice={true}
                showDate={true}
                showTags={true}
                onAction={(e) => _onFilterChange(e)}
            />
            <ChartReport filters={filters} />
        </>
    );
};

export default DataChartReport;
