import { getDevices } from "@/api/device.api";

import { Dropdown } from "primereact/dropdown";
import React, { useCallback, useEffect, useState } from "react";
import GraphicIGUACU from "../IGUACU/Graphic-IGUACU";
import GraphicThachThat from "../THACHTHAT/Graphic-ThachThat";
import GraphicOTSUKA from "../OTSUKA/Graphic-OTSUKA";
import {
    id_IGUECU,
    id_OTSUKA,
    id_THACHTHAT,
} from "@/app/(main)/data-table-device/ID-DEVICE/IdDevice";

export default function ListGraphic() {
    const [devices, setDevices] = useState<any[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [selectedDeviceName, setSelectedDeviceName] = useState<string>("");

    const _fetchDataDevices = useCallback(
        ({ pageSize, page }: { pageSize: number; page: number }) => {
            getDevices({ pageSize, page, sortProperty: "createdTime" })
                .then((resp) => resp.data)
                .then((res) => {
                    setDevices([...res.data]);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        []
    );

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 50,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {},
    });

    useEffect(() => {
        _fetchDataDevices({ pageSize: lazyState.rows, page: lazyState.page });
    }, [lazyState]);

    useEffect(() => {
        const storedDeviceID = localStorage.getItem("deviceID");
        const storedDeviceName = localStorage.getItem("deviceName");

        if (storedDeviceID) {
            setSelectedDevice(storedDeviceID);
        }

        if (storedDeviceName) {
            setSelectedDeviceName(storedDeviceName);
        }
    }, []);

    const handleChangeID = (value: any) => {
        const selectedDeviceObject = devices.find(
            (device) => device.id.id === value
        );
        if (selectedDeviceObject) {
            setSelectedDevice(value);
            setSelectedDeviceName(selectedDeviceObject.name);
            localStorage.setItem("deviceID", value);
            localStorage.setItem("deviceName", selectedDeviceObject.name);
        }
    };

    const renderGraphicComponent = () => {
        const selectedDeviceObject = devices.find(
            (device) => device.id.id === selectedDevice
        );
        if (selectedDeviceObject) {
            switch (selectedDeviceObject.id.id) {
                case id_IGUECU:
                    return <GraphicIGUACU />;
                case id_THACHTHAT:
                    return <GraphicThachThat />;
                case id_OTSUKA:
                    return <GraphicOTSUKA />;
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <div>
            <Dropdown
                value={selectedDevice}
                options={devices.map((device) => ({
                    label: device.name,
                    value: device.id.id,
                }))}
                onChange={(e) => handleChangeID(e.value)}
                optionLabel="label"
                placeholder="Select a Device"
                className="w-full md:w-14rem"
            />

            {renderGraphicComponent()}
        </div>
    );
}
