import React, { useEffect, useRef, useState } from "react";

import { readToken } from "@/service/localStorage";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from "date-fns";
import { Utils } from "@/service/Utils";
import { id_OTSUKA } from "../../data-table-device/ID-DEVICE/IdDevice";

export default function LastetTelemetry() {
    const ws = useRef<WebSocket | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [sensorData, setSensorData] = useState<any>([]);

    const [textSearch, setTextSearch] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [lazyState, setlazyState] = useState({
        rows: 10,
    });

    const sensorDataCount = sensorData.length;

    useEffect(() => {
        const token = readToken();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_OTSUKA,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                2;
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setLoading(false);
            };
        }

        return () => {
            if (ws.current) {
                console.log("Cleaning up WebSocket connection.");
                ws.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    const keys = Object.keys(dataReceived.data);
                    const sensorDataArray = keys.map((key: any) => {
                        const valueArray = dataReceived.data[key][0];
                        const timestamp = valueArray[0];
                        const value = valueArray[1];
                        return { name: key, value, timestamp };
                    });
                    setSensorData(sensorDataArray);
                    setLoading(false);
                    // audioRef.current?.play();
                }
            };
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setTextSearch(value);
    };

    const filteredSensorData = sensorData.filter((sensor: any) =>
        sensor.name.toLowerCase().replace(/_/g, " ").includes(textSearch)
    );

    const renderHeader = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 10px 10px 0px",
                }}
            >
                <div>
                    <p style={{ fontSize: 25, fontWeight: 500 }}>EWON OTSUKA</p>
                </div>
                <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                        <i className="pi pi-search"></i>
                        <InputText
                            placeholder="Global Search"
                            value={textSearch}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </span>
                </div>
            </div>
        );
    };

    const _renderCreatedTime = (row: any) => {
        let timestamp = row.timestamp;
        return timestamp ? Utils.formatUnixTimeToString(timestamp) : "";
    };

    return (
        <div style={{ alignItems: "center" }}>
            {loading ? (
                <div style={{ display: "flex" }}>
                    <ProgressSpinner />
                </div>
            ) : (
                <div>
                    <DataTable
                        style={{ borderRadius: 5 }}
                        rows={lazyState.rows}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        header={renderHeader}
                        value={filteredSensorData}
                        className="datatable-responsive"
                        paginator
                        emptyMessage={"No products found"}
                        paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        totalRecords={sensorDataCount}
                    >
                        <Column
                            field="timestamp"
                            header="Last Update"
                            headerClassName="white-space-nowrap w-1"
                            body={_renderCreatedTime}
                        ></Column>
                        <Column
                            field="name"
                            header="Name"
                            headerClassName="white-space-nowrap w-1 "
                            body={(rowData) => (
                                <span>{rowData.name.replace(/_/g, " ")}</span>
                            )}
                        ></Column>

                        <Column
                            field="value"
                            header="Value"
                            headerClassName="white-space-nowrap w-1 h-5"
                            body={(rowData) => <span>{rowData.value}</span>}
                        ></Column>
                    </DataTable>
                </div>
            )}
        </div>
    );
}
