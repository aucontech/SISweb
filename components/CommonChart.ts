export const getChartOptions = () => {
    if (typeof document === "undefined" || !document.body) {
        return {};
    }
    if (!document || !document.body) {
        return {};
    }
    let body = document.body;
    const textColor =
        getComputedStyle(body).getPropertyValue("--text-color") ||
        "rgba(0, 0, 0, 0.87)";

    const gridLinesColor =
        getComputedStyle(body).getPropertyValue("--divider-color") ||
        "rgba(160, 167, 181, .3)";
    const fontFamily = getComputedStyle(body).getPropertyValue("--font-family");
    return {
        animation: false,
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        interaction: {
            mode: "index",
            intersect: false,
        },
        legend: {
            display: true,
            labels: {
                fontFamily,
                fontColor: textColor,
                fontSize: 8,
            },
        },
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        fontFamily,
                        fontColor: "textColor",
                    },
                    gridLines: {
                        color: gridLinesColor,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontFamily,
                        fontColor: textColor,
                        maxRotation: 40,
                        minRotation: 30,
                    },
                    gridLines: {
                        color: "red",
                    },
                },
            ],
        },
    };
};
