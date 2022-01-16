<template>
  <div class="intiation" v-if="!operating" style="margin-top: 30px">
    <a-typography-title :level="3">
      Start Item Attendance Check
    </a-typography-title>
    <a-typography-text>
      To start your checking procedure pelase pick a tray you are inspecting
      <br />
      then click the start button.
    </a-typography-text>
    <br />
    <a-space style="margin-top: 10px" direction="vertical">
      <a-auto-complete
        v-model:value="tray_selection_value"
        :options="trays"
        style="width: 200px"
        placeholder="Pick your tray here"
        :filter-option="filteredData"
      />
      <a-button @click="getTrayItems()" type="primary">Start</a-button>
    </a-space>
  </div>

  <div class="scanning_state" v-if="operating">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs" style="margin: 30px 0px">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <AppstoreOutlined />
            Item Check
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="order/pembelian">Attendance Check</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <!-- Items left to scan  -->
      <div>
        <a-row :gutter="16">
          <!-- Order Pembelian Selesai -->
          <a-col class="gutter-row" :span="8">
            <a-card size="small" title="Scanner">
              <span style="font-size: 25px">
                Items to Scan : {{ scan_count }}
              </span>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <!-- Input and Button -->
      <a-row justify="end" type="flex" style="margin: 30px 0px">
        <a-col flex="8">
          <a-input-search
            justify="right"
            placeholder="Search item"
            style="width: 200px"
            v-model:value="search_bar"
            size="medium"
          />
          <!-- <a-button type="primary" style="margin-left: 20px" @click="test()"
            >test scan</a-button
          > -->
        </a-col>

        <!-- this is a series of buttons -->
        <a-col flex="0">
          <a-space :size="12">
            <!-- <a-button type="primary">
              <CloudDownloadOutlined />
              Import CSV
            </a-button> -->
            <!-- <a-button type="primary" @click="postReport(true)">
              Finish Scan
            </a-button> -->
            <a-popconfirm
              title="Are you sure you want to finish the scan?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="postReport(true)"
            >
              <a-button type="primary">
              Finish Scan
              </a-button>
            </a-popconfirm>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :dataSource="filteredScannedData"
        :scroll="{ x: 1300 }"
        bordered
        class="change-color"
        style="padding-bottom: 100px; margin-top: 10px; z-index: -9999"
      >
        <template #status="{ record }">
          <a-badge :status="checkStatus(record.status)" :text="record.status" />
        </template>
        <template #item_price="{ text }">
          {{ formatRupiah(text, "Rp.") }}
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import { notification, message } from "ant-design-vue";
const axios = require("axios");
export default {
  components: {
    AppstoreOutlined,
  },
  data() {
    return {
      search_bar: "",
      operating: false,
      scan_count: 10,
      tray_selection_value: "",
      topic: "test",
      device_topic: "ESP8266Client/reader01/test",

      trays: [{ value: "K01" }, { value: "K02" }, { value: "K03" }],

      data: [
        {
          id: "1",
          item_rfid_uid: "OR/PEMB/221101",
          item_name: "test 1",
          status: "selesai",
          item_price: 100000,
          item_type: "test",
        },
      ],
      columns: [
        {
          title: "Item RFID UID",
          dataIndex: "item_rfid_uid",
          key: "item_rfid_uid",
          width: 200,
        },
        {
          title: "Name",
          dataIndex: "item_name",
          Key: "item_name",
          width: 200,
        },
        {
          title: "Status",
          dataIndex: "status",
          Key: "status",
          width: 150,
          slots: { customRender: "status" },
        },
        {
          title: "Price",
          dataIndex: "item_price",
          Key: "item_price",
          width: 200,
          slots: { customRender: "item_price" },
        },
        {
          title: "Type",
          dataIndex: "item_type",
          Key: "item_type",
          width: 150,
        },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.trays.filter((tableData) => {
        return tableData.value
          .toLowerCase()
          .includes(this.tray_selection_value.toLowerCase());
      });
    },
    filteredScannedData() {
      return this.data.filter((tableData) => {
        return tableData.item_name
          .toLowerCase()
          .includes(this.search_bar.toLowerCase());
      });
    },
  },
  methods: {
    // gives the status state to the badge in table
    // because ant can only read "error" and "success"
    checkStatus(value) {
      if (value == "scanned") {
        return "success";
      } else {
        return "error";
      }
    },

    // sorts the table data everytime a new tag is scanned
    sortData(obj) {
      this.data = obj.sort(function (
        comparison_first_element,
        comparison_second_element
      ) {
        if (
          comparison_first_element.status === "scanned" &&
          comparison_second_element.status === "not scanned"
        ) {
          return 1;
        } else if (
          comparison_first_element.status === "not scanned" &&
          comparison_second_element.status === "scanned"
        ) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.data);
    },

    test() {
      // var scanned_tag = ["1051046063", "1201335777"];
      // var scanned_tag_i = 0;
      // // scans all tags, see if they are already scanned, if not then it changes the status to scanned
      // // then sort them so that the scanned elements moves to the bottom of the table
      // scanned_tag.forEach(() => {
      //   this.data.forEach((obj) => {
      //     if (
      //       obj.status === "not scanned" &&
      //       obj.item_rfid_uid == scanned_tag[scanned_tag_i]
      //     ) {
      //       obj.status = "scanned";
      //       this.scan_count--;
      //       scanned_tag_i++;
      //       this.sortData(this.data);
      //       return;
      //     } else if (
      //       obj.status === "scanned" &&
      //       obj.item_rfid_uid == scanned_tag
      //     ) {
      //       console.log("this item has already been scanned");
      //     }
      //   });
      // });
      // //this is to post the data when all of the items is scanned
      // if (this.scan_count <= 0) {
      //   notification["success"]({
      //     message: "Tray Fully Scanned",
      //   });
      //   this.operating = false;
      // }
    },

    //renames the "id" of the requested data to "value" so ant-autocomplete can read it
    renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },

    getTray() {
      var app = this;
      axios
        .get(DEFAULT_ENDPOINT + "/tray.php")
        .then(function (response) {
          // replaces the object poperty "id" with "value" instead
          const updatedJson = response.data;
          updatedJson.forEach((obj) => app.renameKey(obj, "id", "value"));

          app.trays = updatedJson;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getTrayItems() {
      var app = this;
      var getParameter = "?item_tray_id=" + this.tray_selection_value;
      axios
        .get(DEFAULT_ENDPOINT + "/items_in_tray.php" + getParameter)
        .then(function (response) {
          app.data = response.data.tray_data;

          app.data.forEach((obj) => {
            obj.status = "not scanned";
          });
          app.scan_count = app.data.length;
          notification[response.data.code]({
            message: response.data.message,
          });
          if (response.data.code == "success") {
            app.operating = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    formatRupiah: function (angka, prefix) {
      angka = angka.toString();
      var number_string = angka.replace(/[^,\d]/g, "").toString();
      var split = number_string.split(",");
      var sisa = split[0].length % 3;
      var rupiah = split[0].substr(0, sisa);
      var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      var separator;

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },

    postReport(fullyscanned) {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/item_check_report.php", app.data)
        .then(function (response) {
          console.log("this is the test response:");
          console.log(response);
          if (fullyscanned) {
            notification["success"]({
              message: "Tray Scanned with Items missing",
            });
          }
          app.operating = false;
        })
        .catch(function (err) {
          app.operating = false;
          console.log(err);
        });
    },

    //the paho controls
    onConnectionLost: function (responseObject) {
      this.$setConnection(false);
      console.log("disconnected");
      console.log("onConnectionLost:" + responseObject.errorMessage);
    },

    onMessageArrived: function (message) {
      var scanned_tag = [];
      scanned_tag.push(message.payloadString);
      var scanned_tag_i = 0;

      // scans all tags, see if they are already scanned, if not then it changes the status to scanned
      // then sort them so that the scanned elements moves to the bottom of the table
      scanned_tag.forEach(() => {
        this.data.forEach((obj) => {
          if (
            obj.status === "not scanned" &&
            obj.item_rfid_uid == scanned_tag[scanned_tag_i]
          ) {
            obj.status = "scanned";
            this.scan_count--;
            scanned_tag_i++;

            this.sortData(this.data);
            return;
          } else if (
            obj.status === "scanned" &&
            obj.item_rfid_uid == scanned_tag
          ) {
            console.log("this item has already been scanned");
          }
        });
      });

      //this is to post the data when all of the items is scanned
      if (this.scan_count <= 0) {
        notification["success"]({
          message: "Tray Fully Scanned",
        });
        this.postReport(false);
      }
    },
    setupPaho(){
      this.$globalClient.onConnectionLost = this.onConnectionLost;
      this.$globalClient.onMessageArrived = this.onMessageArrived;
      this.$setConnection(true);
      this.$globalClient.subscribe(this.topic);
      this.$globalClient.publish(this.device_topic, "1", 1, true);
      message.success('Item attendance setup complete');
    },
    connect(){
      this.$globalClient.connect({
        onSuccess:this.setupPaho,
        keepAliveInterval:5
      });
    },
  },
  mounted() {
    this.$nextTick(()=>{
      if(!this.$isConnected){
      this.connect();
      }
      else{
         this.setupPaho();
      }
      this.getTray();

    });
  },
};
</script>
