"use client";
import FilterDataTableReport from "./components/FilterDataTableReport";
import DataTableReportList from "./components/DataTableReportList";
import { useState } from "react";
const DataTableReport = () => {
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
            <DataTableReportList filters={filters} />
        </>
    );
};

export default DataTableReport;
