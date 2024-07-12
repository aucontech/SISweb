"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import FilterGcValue from "./components/FilterGcValue";
import { getTimesSeriesData } from "@/api/telemetry.api";
import { Toast } from "primereact/toast";

import GcValueForm from "./components/GcValueForm";

interface Props {}

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
    }, []);
    const _fetchSeverAttributesByDevice1 = useCallback((filters: any) => {
        let { devices, date } = filters;

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
                    };
                }
            );
        });

        Promise.all(promises)
            .then((results) => {
                setDatas(results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (filters.date && filters.device && filters.device.id) {
            _fetchSeverAttributesByDevice(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice]);

    useEffect(() => {
        if (filters.date && filters.devices && filters.devices.length > 0) {
            _fetchSeverAttributesByDevice1(filters);
        }
    }, [filters, _fetchSeverAttributesByDevice1]);

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
                        <div
                            className="lg:col-4 sm:col-12 md:col-6"
                            key={index}
                        >
                            <GcValueForm data={data} />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Page;
