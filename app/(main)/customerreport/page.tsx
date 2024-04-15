"use client";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "./CustomerReport.module.css";
import FilterReport from "./components/FilterReport";
import { ReportRequest, getReport } from "@/api/report.api";

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
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
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
                setReportData(resp);
            })
            .catch((error) => {
                console.log(error);
            });
        //console.log(filters);
    }, []);
    useEffect(() => {
        if (filters.date && filters.device) {
            setSelectedDevice(filters.device);
            _fetchDateReport(filters);
        }
    }, [filters, _fetchDateReport]);

    console.log(selectedDevice);
    const handleDutyClick = (duty: string) => {
        let newReportData = { ...reportData };
        switch (duty) {
            case "grossVolumeVmB1":
                console.log("grossVolumeVmB1");
                newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB1;
                setReportData(newReportData);
                break;
            case "grossVolumeVmB2":
                console.log("grossVolumeVmB2");
                newReportData.grossVolumeVmCon = newReportData.grossVolumeVmB2;
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
            {selectedDevice && <h2>{selectedDevice.name} CUSTOMER</h2>}
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
                        onClick={() => handleDutyClick("grossVolumeVmB1")}
                        className="w-full"
                    >
                        Action
                    </Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
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
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                    <Button className="w-full">Action</Button>
                </div>
                <div className={styles.col}>
                    <p className="w-full text-center">Consumption</p>
                    <InputText
                        value={reportData?.grossVolumeVmCon}
                        className="w-full text-center"
                    />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                    <InputText className="w-full" />
                </div>
            </div>
        </>
    );
};

export default CustomerReport;
