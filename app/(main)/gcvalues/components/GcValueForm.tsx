"use client";
import { use, useEffect, useRef, useState } from "react";
import { getDeviceById } from "@/api/device.api";
import { Toast } from "primereact/toast";
import { getRelations } from "@/api/relation.api";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { saveOrUpdateTimeseriesData } from "@/api/telemetry.api";
import { UIUtils } from "@/service/Utils";

interface Props {
    data: any;
}

const GcValueForm: React.FC<Props> = ({ data }) => {
    const [editFilter, setEditFilter] = useState<any>([]);
    const [gcData, setGcData] = useState<any>([]);
    const [suggDevices, setSuggDevices] = useState<any>([]);
    const toast = useRef<Toast>(null);
    useEffect(() => {
        console.log(data);
        let gcValue = {
            date: data.date,
            device: data.device,
            heating_value:
                data.data &&
                data.data.heating_value &&
                data.data.heating_value.length > 0
                    ? Number(data.data.heating_value[0].value)
                    : 0,
        };
        setGcData(gcValue);
    }, [data]);
    useEffect(() => {
        if (editFilter && editFilter.asset && editFilter.asset.id) {
            console.log(editFilter.asset);
            let reqParams = {
                fromId: editFilter.asset.id.id,
                fromType: "ASSET",
                relationType: "Contains",
                relationTypeGroup: "COMMON",
            };
            getRelations(reqParams)
                .then((resp) => resp.data)
                .then((resp) => {
                    console.log(resp);
                    let data = resp || [];
                    if (data.length > 0) {
                        let pms = data.map((dt: any) => {
                            return getDeviceById(dt["to"]["id"]);
                        });
                        Promise.all(pms)
                            .then((resp) => resp.map((dt: any) => dt.data))
                            .then((resp) => {
                                // resp.forEach((it: any) => {
                                //     it.label = `${it.name}`;
                                // });
                                // setSuggDevices(resp);
                                let newEditFilter = {
                                    ...editFilter,
                                    devices: resp,
                                };
                                setEditFilter(newEditFilter);
                                onAction(newEditFilter);
                            })
                            .catch((e) => {
                                console.log(e);
                                setSuggDevices([]);
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // setSuggAssets([]);
                });
        } else {
            setSuggDevices([]);
        }
    }, [editFilter.asset]);

    const handleChangeValue = (e: any) => {
        let newData = { ...gcData };
        newData.heating_value = e.value;
        setGcData(newData);
    };
    const _handleSave = () => {
        let params = {
            ts: gcData.date,
            values: {
                heating_value: Number(gcData.heating_value).toFixed(2),
            },
        };
        saveOrUpdateTimeseriesData(gcData.device.id.id, params)
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
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to save data",
                });
            });
    };
    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <div className="col">
                    <h3>{gcData?.device?.name}</h3>
                    Heating Value :{" "}
                    <InputNumber
                        // check if gcData.data.heat_value[0] is not null
                        value={gcData.heating_value}
                        onChange={(e) => handleChangeValue(e)}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                    />
                </div>

                <div className="col">
                    <Button
                        onClick={_handleSave}
                        label="Save"
                        // disabled={
                        //     !filters.date ||
                        //     !filters.device ||
                        //     !filters.device.id
                        // }
                    />
                </div>
            </div>
        </>
    );
};

export default GcValueForm;
