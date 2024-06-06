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
import ExportToExcel from "./ExportToExcel";
import { readUser } from "@/service/localStorage";
interface Props {
    filters: any;
}

const DataTableReportList: React.FC<Props> = ({ filters }) => {
    const [tableData, setTableData] = useState<any>([]);
    const [columns, setColumns] = useState<any>([]);
    const [columnExcelHeaders, setColumnExcelHeaders] = useState<any>([
        {
            key: "ts",
            name: "Timestamp",
        },
    ]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    useEffect(() => {
        const user = readUser();
        if (user) {
            setCurrentUser(user);
        }
        //console.log("user", user);
    }, []);
    const _fetchDataTimeseries = useCallback(({ filters }) => {
        let { device, tags, dates } = filters;
        if (!tags || tags.length === 0) {
            return [];
        }
        let tagNames = tags.map((tag: any) => tag.key);
        // console.log(dates);
        if (
            dates &&
            dates.length === 2 &&
            dates[0] != null &&
            dates[1] !== null &&
            device &&
            device.id &&
            tagNames &&
            tagNames.length > 0
        ) {
            let reqParams: any = {
                keys: tagNames.join(","),
                startTs: dates[0].getTime(),
                endTs: dates[1].getTime(),
                orderBy: "ASC",
                limit: 100000,
            };
            getTimesSeriesData("DEVICE", device?.id.id, reqParams)
                .then((resp) => resp.data)
                .then((res) => {
                    // console.log(res);
                    // console.log(tags);
                    const tagUnitLookup: { [key: string]: string } = {};
                    tags.forEach((tag: any) => {
                        tagUnitLookup[tag.key] = tag.unit ? tag.unit.value : "";
                    });

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

                            // Add unit to the value
                            rowData[key] = dataPoint
                                ? `${dataPoint.value}` // Add unit from lookup
                                : "";
                        });
                        return rowData;
                    });

                    // Set table data and columns dynamically
                    setTableData(formattedData);

                    // Get column names (name from tags)
                    //console.log(tags);

                    const columnNames = tags.map((tag: any) => {
                        let unitStr = tag?.unit?.value
                            ? `(${tag.unit.value})`
                            : "";
                        return {
                            field: tag.key,
                            header: (tag.name ? tag.name : tag.key) + unitStr,
                        };
                    });

                    setColumns(columnNames);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    useEffect(() => {
        let { tags } = filters;
        if (typeof tags !== "undefined" && tags && tags.length > 0) {
            let excelHeader = tags.map((tag: any) => {
                let unitStr = tag?.unit?.value ? `(${tag.unit.value})` : "";
                return {
                    key: tag.key,
                    name: (tag.name ? tag.name : tag.key) + unitStr,
                };
            });
            excelHeader = [{ key: "ts", name: "Timestamp" }, ...excelHeader];
            setColumnExcelHeaders([...excelHeader]);
        }
    }, [filters]);

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
                    />
                ))}
            </DataTable>

            <ExportToExcel
                filters={filters}
                data={tableData}
                columns={columnExcelHeaders}
                user={currentUser}
            />
        </div>
    );
};

export default DataTableReportList;
