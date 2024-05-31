"use client";
import FilterDataChartReport from "./components/FilterDataChartReport";
import ChartReport from "./components/ChartReport";
import { useState } from "react";
const DataChartReport = () => {
    const [filters, setFilters] = useState<any>({});

    const _onFilterChange = (e: any) => {
        setFilters({ ...e });
    };
    return (
        <>
            <FilterDataChartReport
                showDevice={true}
                showDate={true}
                showTags={true}
                onAction={(e) => _onFilterChange(e)}
            />
            <div>
                <ChartReport filters={filters} />
            </div>
        </>
    );
};

export default DataChartReport;
