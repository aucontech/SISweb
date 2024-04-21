"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import {
    getSeverAttributesByAsset,
    saveOrUpdateSeverAttributesByAsseet,
} from "@/api/telemetry.api";
import { Toast } from "primereact/toast";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { UIUtils } from "@/service/Utils";

interface Props {}
const defaultValue = {
    heatingValueB1: 0,
    heatingValueB2: 0,
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
        console.log(filters);

        getSeverAttributesByAsset(filters?.asset?.id?.id)
            .then((resp) => resp.data)
            .then((resp) => {
                let gcDatas = resp.filter((dt: any) => dt.key === "gc");
                if (gcDatas && gcDatas.length > 0) {
                    let gcData = gcDatas[0];
                    console.log(gcData);
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

                    //  console.log(seletedGcData);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSave = () => {
        console.log(gcData);
        console.log(seletetedData);
        let key = gcData.key;
        let values = gcData.value;
        if (isNewData) {
            values.push(seletetedData);
        } else {
            values = values.map((dt: any) => {
                if (dt.date === seletetedData.date) {
                    return seletetedData;
                }
                return dt;
            });

            console.log(values);
        }
        let attribute = {
            [key]: values,
        };
        saveOrUpdateSeverAttributesByAsseet(filters.asset.id.id, attribute)
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
    const handleChangeB1 = (e: any) => {
        setSeletetedData((prevState: any) => ({
            ...prevState,
            heatingValueB1: e.value, // Directly use e.value
        }));
    };

    const handleChangeB2 = (e: any) => {
        setSeletetedData((prevState: any) => ({
            ...prevState,
            heatingValueB2: e.value, // Directly use e.value
        }));
    };

    useEffect(() => {
        console.log(filters);
        if (filters.date && filters.asset) {
            _fetchSeverAttributesByAsset(filters);
        }
    }, [filters, _fetchSeverAttributesByAsset]);

    console.log(filters);
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
                    {" "}
                    Heating Value B1 :{" "}
                    <InputNumber
                        value={seletetedData.heatingValueB1 || 0} // default to 0 if undefined
                        onChange={(e) => handleChangeB1(e)}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                    />
                </div>
                <div className="col">
                    {" "}
                    Heating Value B2 :{" "}
                    <InputNumber
                        value={seletetedData.heatingValueB2 || 0} // default to 0 if undefined
                        onChange={(e) => handleChangeB2(e)}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                    />
                </div>
                <div className="col">
                    <Button
                        onClick={handleSave}
                        label="Save"
                        disabled={!filters.date || !filters.asset}
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
