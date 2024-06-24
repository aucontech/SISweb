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
} from "@/api/telemetry.api";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { UIUtils } from "@/service/Utils";

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
        let { device, date } = filters;
        if (device && device.id && date) {
            let params = {
                keys: "heat_value",
                startTs: date.getTime(),
                endTs: date.getTime() + 86400000,
            };
            getTimesSeriesData("DEVICE", device.id.id, params)
                .then((resp) => resp.data)
                .then((resp) => {
                    console.log(resp);
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
        let { device, date } = filters;
        let params = {
            ts: date.getTime(),
            values: {
                heat_value: seletetedData.heatValue,
            },
        };
        console.log(params);
        saveOrUpdateTimeseriesData(device.id.id, params)
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
        if (filters.date && filters.device) {
            _fetchSeverAttributesByDevice(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice]);

    return (
        <>
            <Toast ref={toast} />
            <FilterGcValue
                onAction={_onFilterChange}
                showDevice={true}
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
                            !filters.date ||
                            !filters.device ||
                            !filters.device.id
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
