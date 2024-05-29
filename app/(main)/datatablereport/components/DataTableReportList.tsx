"use client";
import { getTimesSeriesData } from "@/api/telemetry.api";
import { useEffect, useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Utils } from "@/service/Utils";
import { orderBy } from "lodash";

interface Props {
    filters: any;
}

const DataTableReportList: React.FC<Props> = ({ filters }) => {
    const [tableData, setTableData] = useState<any>([]);
    const [columns, setColumns] = useState<any>([]);

    const _fetchDataTimeseries = useCallback(({ filters }) => {
        let { device, tags, dates } = filters;
        console.log(dates);
        if (
            dates &&
            dates.length === 2 &&
            dates[0] != null &&
            dates[1] !== null &&
            device &&
            tags &&
            tags.length > 0
        ) {
            let reqParams: any = {
                keys: tags.join(","),
                startTs: dates[0].getTime(),
                endTs: dates[1].getTime(),
                orderBy: "ASC",
                limit: 30000,
            };
            getTimesSeriesData("DEVICE", device.id.id, reqParams)
                .then((resp) => resp.data)
                .then((res) => {
                    // Get all unique timestamps
                    const timestamps = [
                        ...new Set(
                            Object.values(res).flatMap((arr: any) =>
                                arr.map((item: any) => item.ts)
                            )
                        ),
                    ];

                    // Format data for DataTable
                    const formattedData = timestamps.map((ts) => {
                        const rowData = {
                            ts: Utils.formatUnixTimeToString(ts),
                        };
                        Object.keys(res).forEach((key: string) => {
                            const dataPoint = res[key].find(
                                (item: any) => item.ts === ts
                            );
                            rowData[key] = dataPoint ? dataPoint.value : "";
                        });
                        return rowData;
                    });

                    // Set table data and columns dynamically
                    setTableData(formattedData);
                    setColumns(
                        Object.keys(res).map((key) => ({
                            field: key,
                            header: key,
                        }))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        _fetchDataTimeseries({ filters });
    }, [filters, _fetchDataTimeseries]);

    return (
        <div>
            <DataTable
                paginator
                rows={10}
                first={0}
                // onPage={onCustomPageChange} // Add this line
                value={tableData}
            >
                <Column
                    field="ts"
                    header="Time"
                    //headerStyle={{ textAlign: "center" }}
                />
                {columns.map((col: any) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        // headerStyle={{ textAlign: "center" }}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default DataTableReportList;
