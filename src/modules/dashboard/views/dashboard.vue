<template>
  <div>
    <!-- <h1 style="margin-top: 24px">{{ date_range.start_date }} - {{ date_range.end_date }}</h1> -->

    <a-row justify="end" type="flex" style="margin: 60px 0px">
      <!-- this is a series of buttons -->
      <a-col>
        <a-range-picker @change="onChange" size="large" separator="-" />
      </a-col>
      <a-col style="padding-left: 10px">
        <a-button type="primary" size="large" 
        @click="postAnalysis(date_range)"
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
          <span style="font-size: 14px"> {{majority_category}} </span>
        </a-card>
      </a-col>
      <a-col flex="8" width="1158" height="385">
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
import { message } from 'ant-design-vue';
import Chart from "chart.js/auto";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import majority_chart_config from "./majority_category_chart"
const axios = require("axios");
var ctx = "";
var myChart = new Chart(ctx, majority_chart_config);
export default {
  data() {
    return {
      date_range: {
        start_date : "",
        end_date : "",
      },
      majority_category:"The majority category",
    };
  },
  methods: {
    onChange(date, dateString) {
      this.date_range = {
        start_date : dateString [0],
        end_date : dateString [1],
      };
    },
    postAnalysis(date_range) {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/analysis.php", date_range)
        .then(function (response) {
          console.log(response);
          //check if majority_data exist
          if(response.data.majority_category_historical_report.code === "success"){
            message.success('Majority found');
            app.majority_category = app.sentenceCase(response.data.majority_category_historical_report.majority_category);
            myChart.data.labels = response.data.majority_category_historical_report.outbound_date;
            myChart.data.datasets[0].data = response.data.majority_category_historical_report.outbound_total_sales;
            myChart.options.plugins.title.text = app.majority_category + " Outbound Historical Data";
            myChart.update();
          }
          else if (response.data.majority_category_historical_report.code === "no majority"){
            message.error('No majority found in timeframe');
            this.renderDefaultChart();
          }
          else{
            message.error('No data found in timeframe');
            app.renderDefaultChart();
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    renderDefaultChart(){
      myChart.data.labels = ['date 1', 'date 2', 'date 3'];
      myChart.data.datasets[0].data = [2 , 1, 3];
      myChart.options.plugins.title.text = "Category Outbound Historical Data";
      this.majority_category = "The majority category";
      myChart.update();
    },
    sentenceCase(text){
      return text && text[0].toUpperCase() + text.slice(1);
    },
  },
  mounted() {
      Chart.defaults.font.family =
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
      ctx = this.$refs.majority_category_chart;
      myChart = new Chart(ctx, majority_chart_config);

  },
};
</script>
