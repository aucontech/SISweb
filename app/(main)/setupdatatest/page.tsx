"use client";
import { useEffect, useState } from "react";
import SetupDataTable from "./components/SetupDataTable";
import { TagItem } from "./components/SetupDataTable";
import { HeaderItem } from "./components/SetupDataTable";
import { getSeverAttributesByDeviceandKeys } from "@/api/telemetry.api";
import { OTSUKA_DEVICE_ID } from "@/constants/constans";
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
    const _fetchInfoSetupData = async () => {
        const data = await getSeverAttributesByDeviceandKeys(
            OTSUKA_DEVICE_ID,
            "setupdata"
        );
        console.log(data);
        setInfosSetupdata(data?.data[0]?.value?.setupevcfcplc);
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
        </div>
    );
};
export default SetupDataTest;
