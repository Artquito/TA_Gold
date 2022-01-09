<template>
  <div>
    <h1 style="margin-top: 24px">{{ date_range[0] }} - {{ date_range[1] }}</h1>

    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <!-- this is a series of buttons -->
      <a-col>
        <a-range-picker @change="onChange" size="large" separator="-" />
      </a-col>
      <a-col style="padding-left: 10px">
        <a-button type="primary" size="large"
          >Find Majority In Timeframe</a-button
        >
      </a-col>
    </a-row>

    <!-- this is the data display -->
    <a-row type="flex">
      <a-col flex="1.5" style="padding-right: 60px">
        <!-- this is the styles if you want the card head to have a different color -->
        <!-- :headStyle="{background :'#1b5292', color :'#f0f2f5'}" -->
        <a-card size="large" title="Majority Category">
          <span style="font-size: 14px"> Bracelet </span>
        </a-card>
      </a-col>
      <a-col flex="8">
        <canvas
          width="300"
          height="100"
          ref="majority_category_chart"
          style="border: 1px solid #f0f0f0"
        ></canvas>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import majority_chart_config from "./category_chart"
const axios = require("axios");
const ctx = "";
var myChart = new Chart(ctx, majority_chart_config);
export default {
  data() {
    return {
      date_range: [],
      // myChart:[],
      planetChartData: {
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
              text: "Bracelet Outbound Historical Data",
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
                stepSize:1,
                
              },
            },
          },
        },
      },
    };
  },
  methods: {
    onChange(date, dateString) {
      this.date_range = dateString;
      // myChart.data.datasets[0].data = [1 ,2 ,3 ,4];
      myChart.data.datasets[0].data = [2 ,4 ,3 ,8];
      myChart.data.labels.push("2022-01-06");
      myChart.update();
      // myChart.update();
      // console.log(date, dateString);
      // this.postAnalysis();
    },
    postAnalysis() {
      // var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/analysis.php")
        .then(function (response) {
          console.log("this is the test response:");
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // createChart(chart){
      
      
    // }
  },
  mounted() {
      Chart.defaults.font.family =
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
      const ctx = this.$refs.majority_category_chart;
      myChart = new Chart(ctx, majority_chart_config);
  },
};
</script>
