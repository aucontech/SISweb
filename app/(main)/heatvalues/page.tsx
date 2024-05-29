"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import {
    getSeverAttributesByDevice,
    saveOrUpdateSeverAttributesByDevice,
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

    const _fetchSeverAttributesByAsset = useCallback((filters: any) => {
        getSeverAttributesByDevice(filters?.device?.id?.id)
            .then((resp) => resp.data)
            .then((resp) => {
                let gcDatas = resp.filter((dt: any) => dt.key === "gc");
                if (gcDatas && gcDatas.length > 0) {
                    let gcData = gcDatas[0];
                    setGcData(gcData);
                    let seletedGcDatas = gcData.value.filter(
                        (dt: any) => dt.date === filters.date.getTime()
                    );
                    if (seletedGcDatas && seletedGcDatas.length > 0) {
                        setSeletetedData(seletedGcDatas[0]);
                        setIsNewData(false);
                    } else {
                        setSeletetedData({
                            date: filters.date.getTime(),
                            ...defaultValue,
                        });
                        setIsNewData(true);
                    }
                } else {
                    setIsNewData(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSave = () => {
        let key = gcData.key || "gc";
        let values = gcData.value || [];
        if (isNewData) {
            let newSeletetedData = {
                ...seletetedData,
                date: filters.date.getTime(),
            };
            values.push(newSeletetedData);
        } else {
            values = values.map((dt: any) => {
                if (dt.date === seletetedData.date) {
                    return seletetedData;
                }
                return dt;
            });
        }
        values.sort((a: any, b: any) => a.date - b.date);
        let attribute = {
            [key]: values,
        };
        saveOrUpdateSeverAttributesByDevice(filters.device.id.id, attribute)
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
                UIUtils.showError({
                    error: err?.response?.message,
                    toast: toast.current,
                });
            });
    };

    const handleChangeHeatvalue = (e: any) => {
        setSeletetedData((prevState: any) => ({
            ...prevState,
            heatValue: e.value, // Directly use e.value
        }));
    };

    useEffect(() => {
        console.log(filters);
        if (filters.date && filters.device) {
            _fetchSeverAttributesByAsset(filters);
        }
    }, [filters, _fetchSeverAttributesByAsset]);

    console.log(filters);
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
                    {" "}
                    Heat Value :{" "}
                    <InputNumber
                        value={seletetedData.heatValue || 0} // default to 0 if undefined
                        onChange={(e) => handleChangeHeatvalue(e)}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                    />
                </div>

                <div className="col">
                    <Button
                        onClick={handleSave}
                        label="Save"
                        disabled={!filters.date || !filters.device}
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
