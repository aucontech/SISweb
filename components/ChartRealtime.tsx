import { useRef, useState, useContext, useCallback, useEffect } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { UIUtils, Utils } from "@/service/Utils";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import { readToken } from "@/service/localStorage";
import { getChartOptions } from "./CommonChart";
interface Props {
    tag: string;
    deviceId: string;
}

let chartOptions = getChartOptions();
const ChartRealtime: React.FC<Props> = ({ tag, deviceId }) => {
    const ws = useRef<WebSocket | null>(null);
    // const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const { layoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState(true);
    const sendData = useCallback((data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    }, []);
    const updateChartData = useCallback((message: any) => {
        let dataReceives = message.update[0].timeseries[tag];

        setChartData((currentData: any) => {
            let newLabels = [...currentData.labels];
            let newData = [...currentData.datasets[0].data];
            dataReceives.forEach((item: any) => {
                newLabels.push(
                    Utils.formatUnixTimeToString(item["ts"], "HH:mm:ss")
                );
                newData.push(item["value"]);
            });

            if (newLabels.length > 10) {
                newLabels = newLabels.slice(-10);
            }
            if (newData.length > 10) {
                newData = newData.slice(-10);
            }
            return {
                ...currentData,
                labels: newLabels,
                datasets: [{ ...currentData.datasets[0], data: newData }],
            };
        });
    }, []); // Add dependencies inside this array if there are any

    const connectWebSocket = useCallback(
        (token: string) => {
            ws.current = new WebSocket(
                `${process.env.baseUrlWebsocket}/telemetry?token=${token}`
            );
            ws.current.onopen = () => {
                setLoading(false);
                let data = {
                    entityDataCmds: [
                        {
                            query: {
                                entityFilter: {
                                    type: "singleEntity",
                                    singleEntity: {
                                        entityType: "DEVICE",
                                        id: deviceId,
                                    },
                                },
                                pageLink: {
                                    pageSize: 1024,
                                    page: 0,
                                    sortOrder: {
                                        key: {
                                            type: "ENTITY_FIELD",
                                            key: "createdTime",
                                        },
                                        direction: "DESC",
                                    },
                                },
                                entityFields: [
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "name",
                                    },
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "label",
                                    },
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "additionalInfo",
                                    },
                                ],
                                latestValues: [],
                            },
                            cmdId: 1,
                        },
                    ],
                };

                sendData(JSON.stringify(data));
            };

            ws.current.onmessage = (evt: any) => {
                //console.log(Utils.getUnixTimeMilliseconds());
                let data1 = {
                    entityDataCmds: [
                        {
                            cmdId: 1,
                            tsCmd: {
                                keys: [tag],
                                startTs: Utils.getUnixTimeMilliseconds(),
                                timeWindow: 61000,
                                interval: 10000,
                                limit: 61,
                                agg: "AVG",
                            },
                        },
                    ],
                };
                let message = JSON.parse(evt.data);
                if (message.data) {
                    sendData(JSON.stringify(data1));
                } else {
                    console.log(JSON.parse(evt.data));
                    updateChartData(JSON.parse(evt.data));
                }
            };
            ws.current.onclose = () => {
                console.log(
                    "WebSocket connection closed. Trying to reconnect..."
                );
                setTimeout(connectWebSocket, 10000); // Thử kết nối lại sau 5 giây
            };
            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
                // UIUtils.showError({});
            };
        },
        [sendData]
    );

    useEffect(() => {
        const initChart = () => {
            // const documentStyle = getComputedStyle(document.documentElement);
            // const textColor = documentStyle.getPropertyValue("--text-color");
            // const textColorSecondary = documentStyle.getPropertyValue(
            //     "--text-color-secondary"
            // );
            // const surfaceBorder =
            //     documentStyle.getPropertyValue("--surface-border");
            const data: ChartData = {
                labels: [],
                datasets: [
                    {
                        label: tag,
                        data: [],
                        fill: true,
                        borderColor: "#6366f1",
                        tension: 0.4,
                        backgroundColor: "rgba(99,102,220,0.2)",
                    },
                ],
            };
            // const options: ChartOptions = {
            //     animation: false,
            //     responsive: true,
            //     plugins: {
            //         legend: {
            //             labels: {
            //                 color: textColor,
            //             },
            //         },
            //         tooltip: {},
            //     },
            //     scales: {
            //         x: {
            //             ticks: {
            //                 color: textColorSecondary,
            //             },
            //             grid: {
            //                 color: surfaceBorder,
            //             },
            //         },
            //         y: {
            //             ticks: {
            //                 color: textColorSecondary,
            //             },
            //             grid: {
            //                 color: surfaceBorder,
            //             },
            //         },
            //     },
            // };
            setChartData(data);
        };
        initChart();
    }, [layoutConfig]);

    useEffect(() => {
        let token: string | null = null;
        if (typeof window !== "undefined") {
            token = readToken();
            if (token) {
                connectWebSocket(token);
            }
        }
    }, []);
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="col-12 xl:col-8">
                    <div className="card">
                        <div className="text-900 text-xl font-semibold mb-3">
                            Overview
                        </div>
                        <Chart
                            type="line"
                            data={chartData}
                            options={chartOptions}
                            // plugins={plugins}
                        ></Chart>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChartRealtime;
