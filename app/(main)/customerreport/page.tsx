"use client";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "./CustomerReport.module.css";
import FilterReport from "./components/FilterReport";
import { ReportRequest, getReport } from "@/api/report.api";
import { exportReport } from "@/api/report.api";
import { saveAs } from "file-saver";
import { Utils } from "@/service/Utils";

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
    const [reportData, setReportData] = useState<any>({});

    const _onFilterChange = (evt: any) => {
        setFilters(evt);
    };

    const _fetchDateReport = useCallback((filters: any) => {
        let reqParams: ReportRequest = {
            deviceId: filters.device.id.id,
            date: filters.date.getTime(),
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
            });
    };
    const handleDutyClickLine1 = () => {
        let newReportData = { ...reportData };
        newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB1;
        newReportData.standardVolumeVbCon = newReportData.standardVolumeVbB1;
        newReportData.heatingValueCon = newReportData.heatingValueLine1;
        newReportData.energyCon = newReportData.energyQB1;
        newReportData.avgTemperatureCon = newReportData.avgTemperatureB1;
        newReportData.avgPressureCon = newReportData.avgPressureB1;
        newReportData.grossVolumeAccumulatedCon =
            newReportData.grossVolumeAccumulatedB1;
        newReportData.standardVolumeAccumulatedCon =
            newReportData.standardVolumeAccumulatedB1;
        setReportData(newReportData);
    };
    const handleDutyClickLine2 = () => {
        let newReportData = { ...reportData };
        newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB2;
        newReportData.standardVolumeVbCon = newReportData.standardVolumeVbB2;
        newReportData.heatingValueCon = newReportData.heatingValueLine2;
        newReportData.energyCon = newReportData.energyQB2;
        newReportData.avgTemperatureCon = newReportData.avgTemperatureB2;
        newReportData.avgPressureCon = newReportData.avgPressureB2;
        newReportData.grossVolumeAccumulatedCon =
            newReportData.grossVolumeAccumulatedB2;
        newReportData.standardVolumeAccumulatedCon =
            newReportData.standardVolumeAccumulatedB2;
        setReportData(newReportData);
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
    return (
        <>
            <div>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
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
            <div style={{ background: "white", borderRadius: 5 }}>
                <div className={styles.grid}>
                    <div>
                        <p
                            style={{
                                fontSize: 23,
                                fontWeight: 500,
                                marginBottom: 33,
                                marginTop: 10,
                            }}
                        >
                            Daily Report
                        </p>
                        <p className={styles.label}>Gross Volume Vm (m³)</p>
                        <p className={styles.label}>Standard Volume Vb (Sm³)</p>
                        <p className={styles.label}>
                            Gross Heating Value (MJ/Sm³)
                        </p>
                        <p className={styles.label}>Energy Q (MMBTU)</p>
                        <p className={styles.label}>Average Temperature (℃)</p>
                        <p className={styles.label}>Average Pressure (Bara)</p>
                        <p className={styles.label}>
                            Gross Volume Accumulated (m³)
                        </p>
                        <p className={styles.label}>
                            Standard Volume Accumulated (Sm³)
                        </p>
                    </div>
                    <div className={styles.col}>
                        <p
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            EVC 1901
                        </p>
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
                        <InputText
                            type="number"
                            value={reportData.energyQB1}
                            className="w-full text-center mt-2"
                            disabled={true}
                        />
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
                        <InputText
                            type="number"
                            value={reportData.avgPressureB1}
                            className="w-full text-center mt-2"
                            onChange={(e) => {
                                onChangeValue(e.target.value, "avgPressureB1");
                            }}
                        />

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
                    </div>
                    <div className={styles.col}>
                        <p
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            Duty
                        </p>
                        {/* <Button
                            onClick={() => handleDutyClick("grossVolumeVmB1")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() =>
                                handleDutyClick("standardVolumeVbB1")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() => handleDutyClick("heatingValueLine1")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() => handleDutyClick("energyQB1")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        <Button
                            onClick={() => handleDutyClickLine1()}
                            className="w-full mt-2"
                        >
                            Action
                        </Button>
                        {/* <Button
                            onClick={() => handleDutyClick("avgPressureB1")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() =>
                                handleDutyClick("grossVolumeAccumulatedB1")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}

                        {/* <Button
                            onClick={() =>
                                handleDutyClick("standardVolumeAccumulatedB1")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                    </div>
                    <div className={styles.col}>
                        <p
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            EVC 1902
                        </p>
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
                        <InputText
                            type="number"
                            value={reportData.energyQB2}
                            className="w-full text-center mt-2"
                            disabled={true}
                        />

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
                        <InputText
                            type="number"
                            value={reportData.avgPressureB2}
                            className="w-full text-center mt-2"
                            onChange={(e) => {
                                onChangeValue(e.target.value, "avgPressureB2");
                            }}
                        />
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
                    </div>
                    <div className={styles.col}>
                        <p
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            Duty
                        </p>
                        {/* <Button
                            onClick={() => handleDutyClick("grossVolumeVmB2")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() =>
                                handleDutyClick("standardVolumeVbB2")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() => handleDutyClick("heatingValueLine2")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        <Button
                            onClick={() => handleDutyClickLine2()}
                            className="w-full mt-2"
                        >
                            Action
                        </Button>
                        {/* <Button
                            onClick={() => handleDutyClick("avgTemperatureB2")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() => handleDutyClick("avgPressureB2")}
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() =>
                                handleDutyClick("grossVolumeAccumulatedB2")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                        {/* <Button
                            onClick={() =>
                                handleDutyClick("standardVolumeAccumulatedB2")
                            }
                            className="w-full mt-2"
                        >
                            Action
                        </Button> */}
                    </div>
                    <div className={styles.col}>
                        <p
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "center",
                            }}
                        >
                            Consumption
                        </p>
                        <InputText
                            value={reportData?.grossVolumeVmCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.standardVolumeVbCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.heatingValueCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.energyCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.avgTemperatureCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.avgPressureCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={reportData?.grossVolumeAccumulatedCon ?? ""}
                            className="w-full text-center mt-2"
                        />
                        <InputText
                            value={
                                reportData?.standardVolumeAccumulatedCon ?? ""
                            }
                            className="w-full text-center mt-2"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerReport;
