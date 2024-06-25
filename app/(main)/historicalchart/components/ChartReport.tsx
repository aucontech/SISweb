"use client";
import {
    getSeverAttributesByDeviceandKeys,
    getTimesSeriesData,
} from "@/api/telemetry.api";
import { useEffect, useState, useCallback } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//import Zoom from "chartjs-plugin-zoom";
import { Utils } from "@/service/Utils";
import { Chart } from "primereact/chart";
import dynamic from "next/dynamic";
interface Props {
    filters: any;
}

const colors = [
    "#6366f1",
    "#e53e3e",
    "#38a169",
    "#dd6b20",
    "#d69e2e",
    "#718096",
    "#4fd1c5",
    "#d53f8c",
];

//@ts-ignore
const Zoom = dynamic(() => import("chartjs-plugin-zoom"), {
    ssr: false,
});
//const pluginZoon = [Zoom];
const ChartReport: React.FC<Props> = ({ filters }) => {
    let zoomPlugin = null;
    const [pluginZoom, setPluginZoom] = useState([]); // Initially empty
    if (typeof window !== "undefined") {
        zoomPlugin = [Zoom];
    }
    const [options, setOptions] = useState({
        maintainAspectRatio: false,
        aspectRatio: 0.5,
        interaction: {
            mode: "index",
            intersect: false,
        },
        responsive: true,
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with mouse wheel
                    },
                    pinch: {
                        enabled: true, // Enable zooming with pinch gesture
                    },
                    mode: "xy", // Allow zooming in both x and y directions
                },
                pan: {
                    enabled: true, // Enable panning
                    mode: "xy", // Allow panning in both x and y directions
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 30, // Giới hạn số lượng nhãn hiển thị
                    autoSkip: true, // Tự động bỏ qua nhãn để tránh chồng chéo
                },
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            // y: {
            //     beginAtZero: true,
            //     grid: {
            //         display: false,
            //     },
            // },
        },
        // datasets: [
        //     {
        //         // ... dữ liệu của bạn ...
        //         pointRadius: 0, // Ẩn mặc định
        //         hoverRadius: 5, // Hiển thị khi di chuột với bán kính 5px
        //     },
        // ],
    });
    const [loading, setLoading] = useState(false);
    const [data, setChartData] = useState<any>({});

    const _fetchUnitsData = useCallback(async ({ deviceId }) => {
        return await getSeverAttributesByDeviceandKeys(deviceId, "Units")
            .then((resp) => resp.data)
            .then((res) => {
                if (res && res.length > 0) {
                    return res[0].value;
                } else {
                    return {};
                }
            })
            .catch((err) => {
                console.log(err);
                return {};
            });
    }, []);
    const _fetchDataTimeseries = useCallback(async ({ filters }) => {
        setLoading(true);
        console.log(filters);
        let { device, tags, dates, agg, interval } = filters;

        if (
            dates &&
            dates.length === 2 &&
            dates[0] != null &&
            dates[1] !== null &&
            device &&
            device.id &&
            tags &&
            tags.length > 0
        ) {
            let reqParams: any = {
                keys: tags.join(","),
                startTs: dates[0].getTime(),
                endTs: dates[1].getTime(),
                orderBy: "ASC",
                limit: 50000,
            };

            if (agg && agg.value !== "NONE" && interval) {
                reqParams = {
                    ...reqParams,
                    agg: agg.value,
                    interval: interval.value,
                };
            } else {
                reqParams = {
                    ...reqParams,
                };
            }
            let units = await _fetchUnitsData({ deviceId: device.id.id });

            getTimesSeriesData("DEVICE", device.id.id, reqParams)
                .then((resp) => resp.data)
                .then((res) => {
                    let keys = Object.keys(res);
                    let labels = res[keys[0]].map((dt: any) =>
                        Utils.formatUnixTimeToString(dt.ts, "dd-MM HH:mm")
                    );

                    console.log(units);
                    let datasets = keys.map((key, index) => {
                        let values = res[key].map((d: any) => d.value);
                        if (units[key]) {
                            key = `${key} (${units[key]})`;
                        }
                        return {
                            label: key,
                            data: values,
                            fill: false,
                            pointRadius: 0,
                            hoverRadius: 5,
                            backgroundColor: colors[index],
                            borderColor: colors[index],
                            tension: 0.4,
                        };
                    });

                    let dataChart = {
                        labels,
                        datasets,
                    };

                    setChartData(dataChart);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        _fetchDataTimeseries({ filters });
    }, [filters, _fetchDataTimeseries]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("chartjs-plugin-zoom").then((mod) => {
                //@ts-ignore
                setPluginZoom([mod.default]); // Set the plugin when it is safe to use window
            });
        }
    }, []);

    return (
        <div>
            {loading ? (
                <div className="spinner-container">
                    <ProgressSpinner />
                </div>
            ) : (
                <Chart
                    type="line"
                    data={data}
                    plugins={pluginZoom}
                    options={options}
                ></Chart>
            )}
        </div>
    );
};

export default ChartReport;
