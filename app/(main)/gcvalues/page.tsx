"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import {
    getTimesSeriesData,
    saveOrUpdateTimeseriesDataByAsset,
} from "@/api/telemetry.api";
import { Toast } from "primereact/toast";

import GcValueForm from "./components/GcValueForm";

interface Props {}
const defaultValue = {
    heatValue: 0,
};
const Page: React.FC<Props> = () => {
    const [filters, setFilters] = useState<any>({});

    const [seletetedData, setSeletetedData] = useState<any>([]);
    const [datas, setDatas] = useState<any[]>([]);
    const toast = useRef<any>(null);
    const _onFilterChange = (evt: any) => {
        console.log(evt);
        setFilters({ ...evt });
    };

    const _fetchSeverAttributesByDevice = useCallback((filters: any) => {
        console.log(filters);
        let { device, date } = filters;
        //console.log(asset);
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
    const _fetchSeverAttributesByDevice1 = useCallback((filters: any) => {
        console.log(filters);
        let { devices, date } = filters;
        //console.log(asset);

        let params = {
            keys: "heat_value",
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
                    }; // Attach the device info to the data
                }
            );
        });

        Promise.all(promises)
            .then((results) => {
                setDatas(results); // results is now an array of {device, data}
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log(filters);
        if (filters.date && filters.device && filters.device.id) {
            _fetchSeverAttributesByDevice(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice]);

    useEffect(() => {
        console.log(filters);
        if (filters.date && filters.devices && filters.devices.length > 0) {
            _fetchSeverAttributesByDevice1(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice1]);
    console.log(datas);
    return (
        <>
            <Toast ref={toast} />
            <FilterGcValue
                onAction={_onFilterChange}
                showAsset={true}
                showDate={true}
            />

            <div className="grid">
                {datas &&
                    datas.length > 0 &&
                    datas.map((data, index) => (
                        <div className="col-4" key={index}>
                            <GcValueForm data={data} />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Page;
