"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import {
    getSeverAttributesByAsset,
    getSeverAttributesByDevice,
    getTimesSeriesData,
    saveOrUpdateSeverAttributesByAsseet,
    saveOrUpdateSeverAttributesByDevice,
    saveOrUpdateTimeseriesData,
    saveOrUpdateTimeseriesDataByAsset,
} from "@/api/telemetry.api";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { UIUtils, Utils } from "@/service/Utils";
import { co } from "@fullcalendar/core/internal-common";

interface Props {}
const defaultValue = {
    heatValue: 0,
};
const Page: React.FC<Props> = () => {
    const [filters, setFilters] = useState<any>({});
    const [gcData, setGcData] = useState<any>([]);
    const [seletetedData, setSeletetedData] = useState<any>([]);
    const [isNewData, setIsNewData] = useState<boolean>(false);
    const toast = useRef<any>(null);
    const _onFilterChange = (evt: any) => {
        console.log(evt);
        setFilters({ ...evt });
    };

    const _fetchSeverAttributesByDevice = useCallback((filters: any) => {
        console.log(filters);
        let { asset, date } = filters;
        console.log(asset);
        if (asset && asset.id && date) {
            let params = {
                keys: "heat_value",
                startTs: date.getTime(),
                endTs: date.getTime() + 86400000,
            };
            getTimesSeriesData("ASSET", asset.id.id, params)
                .then((resp) => resp.data)
                .then((resp) => {
                    console.log(resp);
                    let data = resp["heat_value"] || [];
                    if (data.length > 0) {
                        setSeletetedData({
                            heatValue: data[data.length - 1].value,
                        });
                    } else {
                        setSeletetedData({
                            heatValue: 0,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // getTimesSeriesData("DEVICE", <F></F>ilters?.device?.id?.id)
        //     .then((resp) => resp.data)
        //     .then((resp) => {
        //         let gcDatas = resp.filter((dt: any) => dt.key === "gc");
        //         if (gcDatas && gcDatas.length > 0) {
        //             let gcData = gcDatas[0];
        //             setGcData(gcData);
        //             let seletedGcDatas = gcData.value.filter(
        //                 (dt: any) => dt.date === filters.date.getTime()
        //             );
        //             if (seletedGcDatas && seletedGcDatas.length > 0) {
        //                 setSeletetedData(seletedGcDatas[0]);
        //                 setIsNewData(false);
        //             } else {
        //                 setSeletetedData({
        //                     date: filters.date.getTime(),
        //                     ...defaultValue,
        //                 });
        //                 setIsNewData(true);
        //             }
        //         } else {
        //             setIsNewData(true);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);

    const _handleSave = () => {
        let { asset, date } = filters;
        let params = {
            ts: date.getTime(),
            values: {
                heat_value: Number(seletetedData.heatValue).toFixed(2),
            },
        };
        console.log(params);
        saveOrUpdateTimeseriesDataByAsset(asset.id.id, params)
            .then((resp) => {
                if (resp.status === 200) {
                    UIUtils.showInfo({
                        summary: "Success",
                        detail: "Save data success",
                        toast: toast.current,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                UIUtils.showError({
                    error: err?.response?.message,
                    toast: toast.current,
                });
            });
    };
    const handleChangeB1 = (e: any) => {
        setSeletetedData((prevState: any) => ({
            ...prevState,
            heatValue: e.value, // Directly use e.value
        }));
    };

    useEffect(() => {
        if (filters.date && filters.asset) {
            _fetchSeverAttributesByDevice(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice]);

    return (
        <>
            <Toast ref={toast} />
            <FilterGcValue
                onAction={_onFilterChange}
                showAsset={true}
                showDate={true}
            />

            <div className="card">
                <div className="col">
                    Heat Value :{" "}
                    <InputNumber
                        value={seletetedData.heatValue || 0} // default to 0 if undefined
                        onChange={(e) => handleChangeB1(e)}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                    />
                </div>

                <div className="col">
                    <Button
                        onClick={_handleSave}
                        label="Save"
                        disabled={
                            !filters.date || !filters.asset || !filters.asset.id
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
