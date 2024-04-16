"use client";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "./CustomerReport.module.css";
import FilterReport from "./components/FilterReport";
import { ReportRequest, getReport } from "@/api/report.api";
import { co } from "@fullcalendar/core/internal-common";

const defaultValue = {
    grossVolumeVmB1: 0,
    grossVolumeVmB2: 0,
    standardVolumeVbB1: 0.0,
    standardVolumeVbB2: 0.0,
    heatingValueB1: 0,
    heatingValueB2: 0,
    energyQB1: 0,
    energyQB2: 0,
    avgTemperatureB1: 0.0,
    avgTemperatureB2: 0.0,
    avgPresssureB1: 0.0,
    avgPresssureB2: 0.0,
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
            // Example request parameters, adjust as needed
            deviceId: filters.device.id.id,
            date: filters.date.getTime(),
        };
        console.log(reqParams);
        getReport(reqParams)
            .then((resp) => resp.data)
            .then((resp) => {
                console.log(resp);
                setReportData({ ...resp, deviceInfo: filters.device });
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

    console.log(reportData);
    const handleDutyClick = (duty: string) => {
        let newReportData = { ...reportData };
        switch (duty) {
            case "grossVolumeVmB1":
                newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB1;
                setReportData(newReportData);
                break;
            case "grossVolumeVmB2":
                newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB2;
                setReportData(newReportData);
                break;
            case "standardVolumeVbB1":
                newReportData.standardVolumeVbCon =
                    newReportData.standardVolumeVbB1;
                setReportData(newReportData);
                break;
            case "standardVolumeVbB2":
                newReportData.standardVolumeVbCon =
                    newReportData.standardVolumeVbB2;
                setReportData(newReportData);
                break;
            case "heatingValueB1":
                newReportData.heatingValueCon = newReportData.heatingValueB1;
                setReportData(newReportData);
                break;
            case "heatingValueB2":
                newReportData.heatingValueCon = newReportData.heatingValueB2;
                setReportData(newReportData);
                break;

            case "energyQB1":
                newReportData.energyCon = newReportData.energyQB1;
                setReportData(newReportData);
                break;

            case "energyQB2":
                newReportData.energyCon = newReportData.energyQB2;
                setReportData(newReportData);
                break;
            case "avgTemperatureB1":
                console.log("avgTemperatureB1");
                newReportData.avgTemperatureCon =
                    newReportData.avgTemperatureB1;
                setReportData(newReportData);
                break;
            case "avgTemperatureB2":
                console.log("avgTemperatureB2");
                newReportData.avgTemperatureCon =
                    newReportData.avgTemperatureB2;
                setReportData(newReportData);
                break;
            case "avgPresssureB1":
                console.log("avgPresssureB1");
                newReportData.avgPresssureCon = newReportData.avgPresssureB1;
                setReportData(newReportData);
                break;
            case "avgPresssureB2":
                newReportData.avgPresssureCon = newReportData.avgPresssureB2;
                setReportData(newReportData);
                break;
            case "grossVolumeAccumulatedB1":
                newReportData.grossVolumeAccumulatedCon =
                    newReportData.grossVolumeAccumulatedB1;
                setReportData(newReportData);
                break;
            case "grossVolumeAccumulatedB2":
                newReportData.grossVolumeAccumulatedCon =
                    newReportData.grossVolumeAccumulatedB2;
                setReportData(newReportData);
                break;
            case "standardVolumeAccumulatedB1":
                newReportData.standardVolumeAccumulatedCon =
                    newReportData.standardVolumeAccumulatedB1;
                setReportData(newReportData);
                break;
            case "standardVolumeAccumulatedB2":
                newReportData.standardVolumeAccumulatedCon =
                    newReportData.standardVolumeAccumulatedB2;
                setReportData(newReportData);
                break;
            default:
                console.log("default");
                break;
        }
    };
    return (
        <>
            <FilterReport
                onAction={_onFilterChange}
                showDevice={true}
                showDate={true}
            />
            <Button>Get Report</Button>
            {reportData.device && <h2>{reportData.device.name} CUSTOMER</h2>}
            <div className={styles.grid}>
                <div className={styles.col}>
                    <p className={styles.label}>Daily Report</p>
                    <p className={styles.label}>Gross Volume Vm (m3)</p>
                    <p className={styles.label}>Standard Volume Vb (Sm3)</p>
                    <p className={styles.label}>Gross Heating Value (Mj/Sm3)</p>
                    <p className={styles.label}>Energy Q (MMBTU)</p>
                    <p className={styles.label}>Average Temperature (℃)</p>
                    <p className={styles.label}>Average Pressure (Bara)</p>
                    <p className={styles.label}>
                        Gross Volume Accumulated (m3)
                    </p>
                    <p className={styles.label}>
                        Standard Volume Accumulated (Sm3)
                    </p>
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">EVC 1901</p>
                    <InputText
                        value={reportData.grossVolumeVmB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.standardVolumeVbB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.heatingValueB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.energyQB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.avgTemperatureB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.avgPresssureB1}
                        className="w-full text-center"
                    />

                    <InputText
                        value={reportData.grossVolumeAccumulatedB1}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.standardVolumeAccumulatedB1}
                        className="w-full text-center"
                    />
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">Duty</p>
                    <Button
                        onClick={() => handleDutyClick("grossVolumeVmB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("standardVolumeVbB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("heatingValueB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("energyQB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("avgTemperatureB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("avgPresssureB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() =>
                            handleDutyClick("grossVolumeAccumulatedB1")
                        }
                        className="w-full"
                    >
                        Action
                    </Button>

                    <Button
                        onClick={() =>
                            handleDutyClick("standardVolumeAccumulatedB1")
                        }
                        className="w-full"
                    >
                        Action
                    </Button>
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">EVC 1902</p>
                    <InputText
                        value={reportData.grossVolumeVmB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.standardVolumeVbB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.heatingValueB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.energyQB2}
                        className="w-full text-center"
                    />

                    <InputText
                        value={reportData.avgTemperatureB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.avgPresssureB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.grossVolumeAccumulatedB2}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData.standardVolumeAccumulatedB2}
                        className="w-full text-center"
                    />
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">Duty</p>
                    <Button
                        onClick={() => handleDutyClick("grossVolumeVmB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("standardVolumeVbB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("heatingValueB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("energyQB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("avgTemperatureB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() => handleDutyClick("avgPresssureB2")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() =>
                            handleDutyClick("grossVolumeAccumulatedB2")
                        }
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button
                        onClick={() =>
                            handleDutyClick("standardVolumeAccumulatedB2")
                        }
                        className="w-full"
                    >
                        Action
                    </Button>
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">Consumption</p>
                    <InputText
                        value={reportData?.grossVolumeVmCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.standardVolumeVbCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.heatingValueCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.energyCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.avgTemperatureCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.avgPresssureCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.grossVolumeAccumulatedCon ?? ""}
                        className="w-full text-center"
                    />
                    <InputText
                        value={reportData?.standardVolumeAccumulatedCon ?? ""}
                        className="w-full text-center"
                    />
                </div>
            </div>
        </>
    );
};

export default CustomerReport;
