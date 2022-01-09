export const majority_chart_config = {
    type: "line",
    data: {
        labels: ["2022-01-03", "2022-01-04", "2022-01-05"],
        datasets: [
            {
                label: "Total Sales",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [2, 1, 4],
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Category Outbound Historical Data",
                font: { weight: "bold", size: "14px" },
            },
            legend: false,
        },
        layout: {
            padding: 30,
        },
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 1,

                },
            },
        },
    },
};

export default majority_chart_config;