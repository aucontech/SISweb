"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import { getTimesSeriesData } from "@/api/telemetry.api";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { saveOrUpdateTimeseriesData } from "@/api/telemetry.api";
import { Utils, UIUtils } from "@/service/Utils";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

interface Props {}

const Page: React.FC<Props> = () => {
    const [filters, setFilters] = useState<any>({});
    const [globalValue, setGlobalValue] = useState<number | null>(null); // Global value for "Update All"
    const [datas, setDatas] = useState<any[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const toast = useRef<any>(null);
    const _onFilterChange = (evt: any) => {
        console.log(evt);
        setFilters({ ...evt });
    };

    const _fetchSeverAttributesByDevice = (filters: any) => {
        let { devices, date } = filters;

        let params = {
            keys: "heating_value",
            startTs: date.getTime(),
            endTs: date.getTime() + 86400000,
        };

        let promises = devices.map((device: any) => {
            return getTimesSeriesData("DEVICE", device.id.id, params).then(
                (data) => {
                    return {
                        device: device,
                        data: data.data,
                        date: date.getTime(),
                    };
                }
            );
        });

        Promise.all(promises)
            .then((results) => {
                setDatas(results);
                console.log(results);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (filters.date && filters.devices && filters.devices.length > 0) {
            _fetchSeverAttributesByDevice(filters);
        }
    }, [filters, reload]);

    const valueTemplate = (rowData: any, options: any) => {
        const inputValue = rowData.data["heating_value"]?.[0]?.value || 0;

        const onValueChange = (e: any) => {
            const newDatas = [...datas];
            newDatas[options.rowIndex].data["heating_value"][0].value = e.value;
            setDatas(newDatas);
        };
        return (
            <InputNumber
                value={inputValue}
                onValueChange={onValueChange}
                mode="decimal"
                minFractionDigits={2}
                maxFractionDigits={5}
            />
        );
    };

    const dateTemplate = (rowData: any) => {
        let { date } = rowData;
        return date ? Utils.formatUnixTimeToString(date, "dd-MM-yyyy") : "";
    };

    const updateTemplate = (rowData: any) => {
        return <Button label="Update" onClick={() => _handleSave(rowData)} />;
    };

    const _handleSave = (rowData: any) => {
        let params = {
            ts: rowData.date,
            values: {
                heating_value: Number(
                    rowData.data["heating_value"][0].value
                ).toFixed(2),
            },
        };
        saveOrUpdateTimeseriesData(rowData.device.id.id, params)
            .then((resp) => {
                if (resp.status === 200) {
                    UIUtils.showInfo({
                        summary: "Success",
                        detail: "Save data success",
                        toast: toast.current,
                    });
                    setReload(!reload);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const _handleSaveAll = () => {
        console.log(globalValue);
        if (globalValue !== null) {
            const updatedDatas = datas.map((rowData) => {
                if (!rowData.data) {
                    rowData.data = {};
                }

                rowData.data["heating_value"] = [
                    { value: globalValue, ts: rowData.date },
                ];

                return rowData;
            });
            setDatas(updatedDatas);
        } else {
            return;
        }

        const promises = datas.map((rowData: any) => {
            let params = {
                ts: rowData.date,
                values: {
                    heating_value: Number(
                        rowData.data["heating_value"][0].value
                    ).toFixed(2),
                },
            };
            return saveOrUpdateTimeseriesData(rowData.device.id.id, params);
        });

        Promise.all(promises)
            .then(() => {
                UIUtils.showInfo({
                    summary: "Success",
                    detail: "All values updated successfully",
                    toast: toast.current,
                });
                setReload(!reload);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <Toast ref={toast} />

            <FilterGcValue
                onAction={_onFilterChange}
                showAsset={true}
                showDate={true}
            />
            <div className="flex flex-row-reverse gap-4 mb-3">
                <Button label="Update All" onClick={_handleSaveAll} />
                <InputNumber
                    value={globalValue}
                    onValueChange={(e: any) => setGlobalValue(e.value)}
                    placeholder="Enter value for all"
                    mode="decimal"
                    minFractionDigits={2}
                    maxFractionDigits={5}
                />
            </div>

            <div className="datatable-responsive">
                <DataTable
                    value={datas}
                    rows={100}
                    className="p-datatable-gridlines"
                >
                    <Column
                        field="date"
                        header="Time Update"
                        body={dateTemplate}
                    ></Column>
                    <Column field="device.name" header="Station Name"></Column>
                    <Column
                        header="Heating Value (MJ/Sm³)"
                        body={valueTemplate}
                    ></Column>
                    <Column header="Update" body={updateTemplate}></Column>
                </DataTable>
            </div>
        </>
    );
};

export default Page;
