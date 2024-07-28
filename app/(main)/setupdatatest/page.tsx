import SetupDataTable from "./components/SetupDataTable";
import { TagItem } from "./components/SetupDataTable";
import { HeaderItem } from "./components/SetupDataTable";
const tags: TagItem[] = [
    {
        tagname: "temperature",
        key: "EVC_01_Pressure",
        unit: "C",
    },
    {
        tagname: "temperature 02",
        key: "EVC_02_Pressure",
        unit: "C",
    },

    {
        tagname: "UPS mode",
        key: "UPS_Mode",
        unit: {
            0: "Normal",
            1: "Bypass",
            2: "Battery",
        },
    },
];
const headers: HeaderItem[] = [
    {
        headername: "Time Update",
        key: "updateTime",
    },
    {
        headername: "Modbus",
        key: "modBus",
    },
    {
        headername: "Name",
        key: "name",
    },

    {
        headername: "Value",
        key: "value",
    },
    {
        headername: "High",
        key: "high",
    },
    {
        headername: "Low",
        key: "low",
    },
    {
        headername: "Maintain",
        key: "isMaintain",
    },
    {
        headername: "Update",
        key: "update",
    },
];

const page = () => {
    return (
        <div>
            <h1>SetupDataTest</h1>
            <SetupDataTable
                headers={headers}
                tags={tags}
                title="EVC-1901 - Parameters & Configurations"
            ></SetupDataTable>
            <SetupDataTable
                headers={headers}
                tags={tags}
                title="EVC-1902 - Parameters & Configurations"
            ></SetupDataTable>
        </div>
    );
};
export default page;
