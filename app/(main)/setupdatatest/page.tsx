"use client";
import { useEffect, useState } from "react";
import SetupDataTable from "./components/SetupDataTable";

import { getSeverAttributesByDeviceandKeys } from "@/api/telemetry.api";
import { OTSUKA_DEVICE_ID } from "@/constants/constans";
import StationConfig from "./components/StationConfig";
// const tags: TagItem[] = [
//     {
//         tagname: "temperature",
//         key: "EVC_01_Pressure",
//         unit: "C",
//     },
//     {
//         tagname: "temperature 02",
//         key: "EVC_02_Pressure",
//         unit: "C",
//     },

//     {
//         tagname: "UPS mode",
//         key: "UPS_Mode",
//         unit: {
//             0: "Normal",
//             1: "Bypass",
//             2: "Battery",
//         },
//     },
// ];
// const headers: HeaderItem[] = [
//     {
//         headername: "Updated Time",
//         key: "updatedTime",
//     },
//     {
//         headername: "Modbus",
//         key: "modBus",
//     },
//     {
//         headername: "Name",
//         key: "name",
//     },

//     {
//         headername: "Value",
//         key: "value",
//     },
//     {
//         headername: "High",
//         key: "high",
//     },
//     {
//         headername: "Low",
//         key: "low",
//     },
//     {
//         headername: "Maintain",
//         key: "isMaintain",
//     },
//     {
//         headername: "Update",
//         key: "update",
//     },
// ];

const SetupDataTest = () => {
    const [infosSetupdata, setInfosSetupdata] = useState<any[]>([]);
    const [stationConfig, setStationConfig] = useState<any[]>([]);
    const _fetchInfoSetupData = async () => {
        const data = await getSeverAttributesByDeviceandKeys(
            OTSUKA_DEVICE_ID,
            "setupdata"
        );
        console.log(data);
        setInfosSetupdata(data?.data[0]?.value?.setupevcfcplc);
        setStationConfig(data?.data[0]?.value?.stationconfig);
    };

    useEffect(() => {
        console.log("SetupDataTest");
        _fetchInfoSetupData();
    }, []);
    console.log(infosSetupdata);
    return (
        <div>
            <h1>SetupDataTest</h1>
            {/* foreach through infosetupdata */}
            {infosSetupdata &&
                infosSetupdata.length > 0 &&
                infosSetupdata.map((info: any, index: number) => {
                    return (
                        <SetupDataTable
                            headers={info.headers}
                            tags={info.tags}
                            title={info.title}
                            key={index}
                        ></SetupDataTable>
                    );
                })}
            {stationConfig &&
                stationConfig.length > 0 &&
                stationConfig.map((info: any, index: number) => {
                    return (
                        <StationConfig
                            headers={info.headers}
                            tags={info.tags}
                            title={info.title}
                            key={index}
                        ></StationConfig>
                    );
                })}
        </div>
    );
};
export default SetupDataTest;
