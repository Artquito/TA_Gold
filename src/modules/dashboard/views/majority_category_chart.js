export const majority_chart_config = {
    type: "line",
    data: {
        labels: ['date 1', 'date 2', 'date 3'],
        datasets: [
            {
                label: "Total Sales",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [2 , 1, 3],
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