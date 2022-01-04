<template>
  <div>
    <h1 style="margin-top:24px">{{date_range[0]}} - {{date_range[1]}}</h1>
  
    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <!-- this is a series of buttons -->
      <a-col>
        <a-range-picker @change="onChange" size="large" separator='-' />
      </a-col>
      <a-col style="padding-left: 10px">
        <a-button type="primary" size='large'>Find Majority In Timeframe</a-button>
      </a-col>
    </a-row>

    <!-- this is the data display -->
    <a-row type="flex">
      <a-col flex="1.5" style="padding-right: 60px">
        <!-- this is the styles if you want the card head to have a different color -->
        <!-- :headStyle="{background :'#1b5292', color :'#f0f2f5'}" -->
        <a-card size="large" title="Majority Category" >
          <span style="font-size: 14px"> Bracelet </span>
        </a-card>
      </a-col>
      <a-col flex="8">
        <canvas
          width="300"
          height="100"
          id="popularItemChart"
          style="border: 1px solid #f0f0f0"
        ></canvas>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      // test:"his",
      date_range: [],
      planetChartData: {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: [0, 10, 5, 2, 20, 30, 45],
            },
          ],
        },
        options: {
          responsive: true,
          // lineTension: 1,
          plugins: {
            title: {
              display: true,
              text: "Bracelet Outbound Historical Data",
              font: { weight: "bold", size: "14px" },
            },
            legend: false,
          },
          layout: {
            padding: 30,
          },
          scales: {
            // padding: 300,
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  // padding: 300,
                },
              },
            ],
          },
        },
      },
    };
  },
  methods: {
    onChange(date, dateString){
      this.date_range = dateString;
      console.log(date, dateString);
    }
  },
  mounted() {
    Chart.defaults.font.family =
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
    const ctx = document.getElementById("popularItemChart");
    new Chart(ctx, this.planetChartData);
  },
};
</script>
