"use client";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";

import FilterReport from "./components/FilterReport";
import { ReportRequest, getReport } from "@/api/report.api";
import { exportReport } from "@/api/report.api";
import { saveAs } from "file-saver";
import { UIUtils, Utils } from "@/service/Utils";
import { Checkbox } from "primereact/checkbox";
import {
    OTSUKA_DEVICE_ID,
    CNGHY_DEVICE_ID,
    CNGBD_DEVICE_ID,
} from "@/constants/constans";
import { Toast } from "primereact/toast";

const defaultValue = {
    grossVolumeVmB1: 0,
    grossVolumeVmB2: 0,
    standardVolumeVbB1: 0.0,
    standardVolumeVbB2: 0.0,
    heatingValueLine1: 0,
    heatingValueLine2: 0,
    energyQB1: 0,
    energyQB2: 0,
    avgTemperatureB1: 0.0,
    avgTemperatureB2: 0.0,
    avgPressureB1: 0.0,
    avgPressureB2: 0.0,
    grossVolumeAccumulatedB1: 0,
    grossVolumeAccumulatedB2: 0,
    standardVolumeAccumulatedB1: 0,
    standardVolumeAccumulatedB2: 0,
    reportDate: null, // Example timestamp, adjust as needed
    deviceName: "",
};

const CustomerReport = () => {
    const [filters, setFilters] = useState<any>({});
    const [isClient, setIsClient] = useState(false);
    const [reportData, setReportData] = useState<any>({});
    const [isLine1Selected, setIsLine1Selected] = useState<boolean>(false);
    const [isLine2Selected, setIsLine2Selected] = useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const _onFilterChange = (evt: any) => {
        setFilters(evt);
    };
    useEffect(() => {
        setIsClient(true);
    }, []);
    const _fetchDateReport = useCallback((filters: any) => {
        let reqParams: ReportRequest = {
            deviceId: filters?.device?.id?.id,
            date: filters?.date.getTime(),
        };
        getReport(reqParams)
            .then((resp) => resp.data)
            .then((resp) => {
                console.log(resp);
                setReportData({
                    ...resp,
                    heatingValueLine1: resp.heatValue,
                    heatingValueLine2: resp.heatValue,
                    deviceInfo: filters.device,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        //console.log(filters);
    }, []);

    useEffect(() => {
        if (filters.date && filters.device) {
            //setReportData({ ...defaultValue, deviceInfo: filters.device });

            //setSelectedDevice(filters.device);
            _fetchDateReport(filters);
        }
    }, [filters, _fetchDateReport]);

    // const handleDutyClick = (duty: string) => {
    //     let newReportData = { ...reportData };
    //     switch (duty) {
    //         case "grossVolumeVmB1":
    //             newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB1;
    //             setReportData(newReportData);
    //             break;
    //         case "grossVolumeVmB2":
    //             newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB2;
    //             setReportData(newReportData);
    //             break;
    //         case "standardVolumeVbB1":
    //             newReportData.standardVolumeVbCon =
    //                 newReportData.standardVolumeVbB1;
    //             setReportData(newReportData);
    //             break;
    //         case "standardVolumeVbB2":
    //             newReportData.standardVolumeVbCon =
    //                 newReportData.standardVolumeVbB2;
    //             setReportData(newReportData);
    //             break;
    //         case "heatingValueLine1":
    //             newReportData.heatingValueCon = newReportData.heatingValueLine1;
    //             setReportData(newReportData);
    //             break;
    //         case "heatingValueLine2":
    //             newReportData.heatingValueCon = newReportData.heatingValueLine2;
    //             setReportData(newReportData);
    //             break;

    //         case "energyQB1":
    //             newReportData.energyCon = newReportData.energyQB1;
    //             setReportData(newReportData);
    //             break;

    //         case "energyQB2":
    //             newReportData.energyCon = newReportData.energyQB2;
    //             setReportData(newReportData);
    //             break;
    //         case "avgTemperatureB1":
    //             console.log("avgTemperatureB1");
    //             newReportData.avgTemperatureCon =
    //                 newReportData.avgTemperatureB1;
    //             setReportData(newReportData);
    //             break;
    //         case "avgTemperatureB2":
    //             console.log("avgTemperatureB2");
    //             newReportData.avgTemperatureCon =
    //                 newReportData.avgTemperatureB2;
    //             setReportData(newReportData);
    //             break;
    //         case "avgPressureB1":
    //             console.log("avgPressureB1");
    //             newReportData.avgPressureCon = newReportData.avgPressureB1;
    //             setReportData(newReportData);
    //             break;
    //         case "avgPressureB2":
    //             newReportData.avgPressureCon = newReportData.avgPressureB2;
    //             setReportData(newReportData);
    //             break;
    //         case "grossVolumeAccumulatedB1":
    //             newReportData.grossVolumeAccumulatedCon =
    //                 newReportData.grossVolumeAccumulatedB1;
    //             setReportData(newReportData);
    //             break;
    //         case "grossVolumeAccumulatedB2":
    //             newReportData.grossVolumeAccumulatedCon =
    //                 newReportData.grossVolumeAccumulatedB2;
    //             setReportData(newReportData);
    //             break;
    //         case "standardVolumeAccumulatedB1":
    //             newReportData.standardVolumeAccumulatedCon =
    //                 newReportData.standardVolumeAccumulatedB1;
    //             setReportData(newReportData);
    //             break;
    //         case "standardVolumeAccumulatedB2":
    //             newReportData.standardVolumeAccumulatedCon =
    //                 newReportData.standardVolumeAccumulatedB2;
    //             setReportData(newReportData);
    //             break;
    //         default:
    //             console.log("default");
    //             break;
    //     }
    // };

    const handleExportReport = () => {
        exportReport(reportData)
            .then((response: any) => {
                // const contentDisposition = response.headers.get('content-disposition');
                const contentDisposition =
                    response.headers["content-disposition"];
                let fileName = "report.xlsx";
                // In giá trị của Content-Disposition
                console.log(contentDisposition);
                if (contentDisposition) {
                    // Sử dụng Regular Expression để tìm filename
                    const filenameMatch =
                        contentDisposition.match(/filename="([^"]+)"/);

                    // Kiểm tra xem có tìm thấy kết quả phù hợp không
                    if (filenameMatch) {
                        fileName = filenameMatch[1];
                        console.log("Tên file:", fileName);
                    } else {
                        console.log(
                            "Không tìm thấy tên file trong Content-Disposition"
                        );
                    }
                } else {
                    console.log("Header Content-Disposition không tồn tại");
                }
                // if (contentDisposition) {
                //     const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                //     if (filenameMatch && filenameMatch[1]) {
                //         filename = filenameMatch[1].replace(/['"]/g, '');  // Clean up the filename string
                //     }
                // }
                saveAs(response.data, fileName);
            })
            .catch((err) => {
                console.error("Error exporting report:", err);
                UIUtils.showError({
                    toast: toast.current,
                    error: err?.message,
                });
            });
    };
    const _renderLineName = (line: number) => {
        if (filters.device && filters.device.id) {
            let deviceId = filters.device.id.id;
            if (line === 1) {
                switch (deviceId) {
                    case OTSUKA_DEVICE_ID:
                        return (
                            <>
                                EVC 1901 <br />
                                <Checkbox
                                    checked={isLine1Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line1")
                                    }
                                />
                            </>
                        );
                    case CNGHY_DEVICE_ID:
                        return (
                            <>
                                EVC 3001 <br />
                                <Checkbox
                                    checked={isLine1Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line1")
                                    }
                                />
                            </>
                        );
                    case CNGBD_DEVICE_ID:
                        return (
                            <>
                                EVC 2001 <br />
                                <Checkbox
                                    checked={isLine1Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line1")
                                    }
                                />
                            </>
                        );
                    default:
                        return (
                            <>
                                Line 1 <br />
                                <Checkbox
                                    checked={isLine1Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line1")
                                    }
                                />
                            </>
                        );
                }
            } else {
                switch (deviceId) {
                    case OTSUKA_DEVICE_ID:
                        return (
                            <>
                                EVC 1902 <br />
                                <Checkbox
                                    checked={isLine2Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line2")
                                    }
                                />
                            </>
                        );
                    case CNGHY_DEVICE_ID:
                        return (
                            <>
                                EVC 3002 <br />
                                <Checkbox
                                    checked={isLine2Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line2")
                                    }
                                />
                            </>
                        );
                    case CNGBD_DEVICE_ID:
                        return (
                            <>
                                EVC 2002 <br />
                                <Checkbox
                                    checked={isLine2Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line2")
                                    }
                                />
                            </>
                        );
                    default:
                        return (
                            <>
                                Line 2<br />
                                <Checkbox
                                    checked={isLine2Selected}
                                    onChange={(e: any) =>
                                        _onSelectLine(e.checked, "line2")
                                    }
                                />
                            </>
                        );
                }
            }
        }
    };

    const onChangeValue = (value: any, field: string) => {
        let newReportData = { ...reportData };
        let energyQB1 = 0;
        let energyQB2 = 0;
        switch (field) {
            case "grossVolumeVmB1":
                setReportData({ ...newReportData, grossVolumeVmB1: value });
                break;
            case "grossVolumeVmB2":
                setReportData({ ...newReportData, grossVolumeVmB2: value });
                break;
            case "standardVolumeVbB1":
                if (newReportData.heatingValueLine1 > 0) {
                    energyQB1 = Utils.round(Number(value) * 0.000947817, 2);
                }
                setReportData({
                    ...newReportData,
                    energyQB1,
                    standardVolumeVbB1: value,
                });
                break;
            case "standardVolumeVbB2":
                if (newReportData.heatingValueLine2 > 0) {
                    energyQB2 = Utils.round(Number(value) * 0.000947817, 2);
                }
                setReportData({
                    ...newReportData,
                    energyQB2,
                    standardVolumeVbB2: value,
                });
                break;
            case "heatingValueLine1":
                energyQB1 = 0;
                if (value > 0) {
                    energyQB1 = Utils.round(
                        Number(newReportData.standardVolumeVbB1) * 0.000947817,
                        2
                    );
                    //console.log("energyQB1", energyQB1);
                }
                setReportData({
                    ...newReportData,
                    heatingValueLine1: value,
                    energyQB1,
                });
                break;
            case "heatingValueLine2":
                if (value > 0) {
                    energyQB2 = Utils.round(
                        Number(newReportData.standardVolumeVbB2) * 0.000947817,
                        2
                    );
                }
                setReportData({
                    ...newReportData,
                    heatingValueLine2: value,
                    energyQB2,
                });
                break;

            case "energyQB1":
                // newReportData.energyCon = newReportData.energyQB1;
                // setReportData(newReportData);
                break;

            case "energyQB2":
                // newReportData.energyCon = newReportData.energyQB2;
                // setReportData(newReportData);
                break;
            case "avgTemperatureB1":
                setReportData({ ...newReportData, avgTemperatureB1: value });
                break;
            case "avgTemperatureB2":
                setReportData({ ...newReportData, avgTemperatureB2: value });
                break;
            case "avgPressureB1":
                setReportData({ ...newReportData, avgPressureB1: value });
                break;
            case "avgPressureB2":
                setReportData({ ...newReportData, avgPressureB2: value });
                break;
            case "grossVolumeAccumulatedB1":
                setReportData({
                    ...newReportData,
                    grossVolumeAccumulatedB1: value,
                });

                break;
            case "grossVolumeAccumulatedB2":
                setReportData({
                    ...reportData,
                    grossVolumeAccumulatedB2: value,
                });
                break;
            case "standardVolumeAccumulatedB1":
                setReportData({
                    ...newReportData,
                    standardVolumeAccumulatedB1: value,
                });
                break;
            case "standardVolumeAccumulatedB2":
                setReportData({
                    ...newReportData,
                    standardVolumeAccumulatedB2: value,
                });
                break;
            default:
                break;
        }
    };

    const _onSelectLine = (value: any, field: string) => {
        if (field === "line1") {
            let newReportData = { ...reportData };
            newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB1;
            newReportData.standardVolumeVbCon =
                newReportData.standardVolumeVbB1;
            newReportData.heatingValueCon = newReportData.heatingValueLine1;
            newReportData.energyCon = newReportData.energyQB1;
            newReportData.avgTemperatureCon = newReportData.avgTemperatureB1;
            newReportData.avgPressureCon = newReportData.avgPressureB1;
            newReportData.grossVolumeAccumulatedCon =
                newReportData.grossVolumeAccumulatedB1;
            newReportData.standardVolumeAccumulatedCon =
                newReportData.standardVolumeAccumulatedB1;
            newReportData.isLine1Selected = true;
            newReportData.isLine2Selected = false;
            setReportData(newReportData);
            setIsLine1Selected(true);
            setIsLine2Selected(false);
        }
        if (field === "line2") {
            let newReportData = { ...reportData };
            newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB2;
            newReportData.standardVolumeVbCon =
                newReportData.standardVolumeVbB2;
            newReportData.heatingValueCon = newReportData.heatingValueLine2;
            newReportData.energyCon = newReportData.energyQB2;
            newReportData.avgTemperatureCon = newReportData.avgTemperatureB2;
            newReportData.avgPressureCon = newReportData.avgPressureB2;
            newReportData.grossVolumeAccumulatedCon =
                newReportData.grossVolumeAccumulatedB2;
            newReportData.standardVolumeAccumulatedCon =
                newReportData.standardVolumeAccumulatedB2;
            newReportData.isLine1Selected = false;
            newReportData.isLine2Selected = true;
            setReportData(newReportData);
            setIsLine1Selected(false);
            setIsLine2Selected(true);
        }
    };

    return (
        <>
            <div>
                <Toast ref={toast} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ width: "80%" }}>
                        <FilterReport
                            onAction={_onFilterChange}
                            showDevice={true}
                            showDate={true}
                        />
                    </div>

                    <div style={{}}>
                        <Button onClick={handleExportReport}>
                            Export Report
                        </Button>
                    </div>
                </div>
            </div>
            {reportData.device && <h2>{reportData.device.name} CUSTOMER</h2>}

            {isClient && (
                <table>
                    <tr>
                        <th>Daily report</th>
                        <th>
                            {_renderLineName(1)} <br />
                        </th>
                        <th>
                            {_renderLineName(2)} <br />
                        </th>
                        <th>Consumption</th>
                    </tr>
                    <tr>
                        <td>Gross Volume Vm (m³)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.grossVolumeVmB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    console.log("value", e);
                                    onChangeValue(
                                        e.target.value,
                                        "grossVolumeVmB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.grossVolumeVmB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "grossVolumeVmB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.grossVolumeVmCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Standard Volume Vb (Sm³)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.standardVolumeVbB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "standardVolumeVbB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.standardVolumeVbB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "standardVolumeVbB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.standardVolumeVbCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Gross Heating Value (MJ/Sm³)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.heatingValueLine1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "heatingValueLine1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.heatingValueLine2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "heatingValueLine2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.heatingValueCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Energy Q (MMBTU)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.energyQB1}
                                className="w-full text-center mt-2"
                                disabled={true}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.energyQB2}
                                className="w-full text-center mt-2"
                                disabled={true}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.energyCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Average Temperature (℃)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.avgTemperatureB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "avgTemperatureB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.avgTemperatureB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "avgTemperatureB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.avgTemperatureCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Average Pressure (Bara)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.avgPressureB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "avgPressureB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.avgPressureB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "avgPressureB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={reportData?.avgPressureCon ?? ""}
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Gross Volume Accumulated (m³)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.grossVolumeAccumulatedB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "grossVolumeAccumulatedB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.grossVolumeAccumulatedB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "grossVolumeAccumulatedB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={
                                    reportData?.grossVolumeAccumulatedCon ?? ""
                                }
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Standard Volume Accumulated (Sm³)</td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.standardVolumeAccumulatedB1}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "standardVolumeAccumulatedB1"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                type="number"
                                value={reportData.standardVolumeAccumulatedB2}
                                className="w-full text-center mt-2"
                                onChange={(e) => {
                                    onChangeValue(
                                        e.target.value,
                                        "standardVolumeAccumulatedB2"
                                    );
                                }}
                            />
                        </td>
                        <td>
                            <InputText
                                value={
                                    reportData?.standardVolumeAccumulatedCon ??
                                    ""
                                }
                                className="w-full text-center mt-2"
                            />
                        </td>
                    </tr>
                </table>
            )}
        </>
    );
};

export default CustomerReport;
