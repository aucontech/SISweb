"use client";
import { Page } from "@/types";
import { useEffect, useRef, useState, useContext } from "react";
import { readToken } from "@/service/localStorage";
import { Utils } from "@/service/Utils";
import { Chart } from "primereact/chart";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { ChartData, ChartOptions } from "chart.js";
import "chartjs-adapter-luxon";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";

const plugins = [StreamingPlugin];
const RealtimeMonitoring: Page = () => {
    const ws = useRef<WebSocket | null>(null);
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const { layoutConfig } = useContext(LayoutContext);
    let token: string | null = "";
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [data, setData] = useState([]);
    if (typeof window !== "undefined") {
        token = readToken();
    }
    const sendData = (data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    };

    const connectWebSocket = () => {
        ws.current = new WebSocket(
            `${process.env.baseUrlWebsocket}/telemetry?token=${token}`
        );
        ws.current.onopen = () => {
            let data = {
                attrSubCmds: [],
                tsSubCmds: [],
                historyCmds: [],
                entityDataCmds: [
                    {
                        query: {
                            entityFilter: {
                                type: "singleEntity",
                                singleEntity: {
                                    entityType: "DEVICE",
                                    id: "28e76d70-a3ce-11ee-9ca1-8f006c3fce43",
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
                entityDataUnsubscribeCmds: [],
                alarmDataCmds: [],
                alarmDataUnsubscribeCmds: [],
                entityCountCmds: [],
                entityCountUnsubscribeCmds: [],
                alarmCountCmds: [],
                alarmCountUnsubscribeCmds: [],
            };
            let data1 = {
                attrSubCmds: [],
                tsSubCmds: [],
                historyCmds: [],
                entityDataCmds: [
                    {
                        cmdId: 1,
                        tsCmd: {
                            keys: ["Flow_Rate_AI"],
                            startTs: Utils.getUnixTimeMilliseconds(),
                            timeWindow: 61000,
                            interval: 1000,
                            limit: 61,
                            agg: "AVG",
                        },
                    },
                ],
                entityDataUnsubscribeCmds: [],
                alarmDataCmds: [],
                alarmDataUnsubscribeCmds: [],
                entityCountCmds: [],
                entityCountUnsubscribeCmds: [],
                alarmCountCmds: [],
                alarmCountUnsubscribeCmds: [],
            };

            //  sendData(JSON.stringify(data));
            // sendData(JSON.stringify(data1));

            sendData(JSON.stringify(data));

            //ws.current?.send(JSON.stringify(data1));
        };

        ws.current.onmessage = (evt: any) => {
            let data1 = {
                attrSubCmds: [],
                tsSubCmds: [],
                historyCmds: [],
                entityDataCmds: [
                    {
                        cmdId: 1,
                        tsCmd: {
                            keys: ["Flow_Rate_AI"],
                            startTs: Utils.getUnixTimeMilliseconds(),
                            timeWindow: 61000,
                            interval: 1000,
                            limit: 61,
                            agg: "AVG",
                        },
                    },
                ],
                entityDataUnsubscribeCmds: [],
                alarmDataCmds: [],
                alarmDataUnsubscribeCmds: [],
                entityCountCmds: [],
                entityCountUnsubscribeCmds: [],
                alarmCountCmds: [],
                alarmCountUnsubscribeCmds: [],
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
            console.log("WebSocket connection closed. Trying to reconnect...");
            setTimeout(connectWebSocket, 5000); // Thử kết nối lại sau 5 giây
        };
        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    };
    useEffect(() => {
        connectWebSocket();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [token]);

    const updateChartData = (message: any) => {
        console.log(message);
        let flowRateAI = message.update[0].timeseries.Flow_Rate_AI;
        console.log(flowRateAI);
        setChartData((currentData: any) => {
            // Chuyển đổi timestamp từ Unix time in milliseconds sang định dạng ngày giờ
            // const date = new Date(timestamp);
            // const formattedTime = Utils.formatUnixTimeToString(
            //     Number(timestamp),
            //     "HH:mm:ss"
            // );
            let newLabels = [...currentData.labels]; // Thêm nhãn mới
            let newData = [...currentData.datasets[0].data]; // Thêm dữ liệu mới
            flowRateAI.forEach((item: any) => {
                newLabels.push(
                    Utils.formatUnixTimeToString(item["ts"], "HH:mm:ss")
                );
                newData.push(item["value"]);
            });
            // const newData = [...currentData.datasets[0].data, value]; // Thêm dữ liệu mới
            // Giới hạn số lượng điểm dữ liệu, ví dụ: giữ 20 điểm dữ liệu mới nhất
            if (newLabels.length > 10) {
                newLabels = [...newLabels].slice(-10); // Loại bỏ nhãn đầu tiên
                //   newData.shift(); // Loại bỏ dữ liệu đầu tiên
            }
            if (newData.length > 10) {
                newData = [...newData].slice(-10);
            }
            console.log("new label", newLabels);
            return {
                ...currentData,
                labels: newLabels,
                datasets: [{ ...currentData.datasets[0], data: newData }],
            };
        });
    };
    useEffect(() => {
        const initChart = () => {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue("--text-color");
            const textColorSecondary = documentStyle.getPropertyValue(
                "--text-color-secondary"
            );
            const surfaceBorder =
                documentStyle.getPropertyValue("--surface-border");

            const data: ChartData = {
                labels: [],
                datasets: [
                    {
                        label: "Flow_Rate_AI",
                        data: [],
                        fill: true,
                        borderColor: "#6366f1",
                        tension: 0.4,
                        backgroundColor: "rgba(99,102,220,0.2)",
                    },
                ],
            };

            const options: ChartOptions = {
                animation: false,
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                    tooltip: {},
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                },
                onClick: (event) => {},
            };

            setChartData(data);
            setChartOptions(options);
        };
        initChart();
    }, [layoutConfig]);
    return (
        <>
            <div className="col-12 xl:col-8">
                <div className="card">
                    <div className="text-900 text-xl font-semibold mb-3">
                        Overview
                    </div>
                    <Chart
                        type="line"
                        data={chartData}
                        options={chartOptions}
                        plugins={plugins}
                    ></Chart>
                </div>
            </div>
        </>
    );
};
export default RealtimeMonitoring;
