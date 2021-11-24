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
            Order
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="order/pembelian">Pembelian</router-link>
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
            placeholder="input search text"
            style="width: 200px"
            v-model:value="search_bar"
            size="medium"
          />
          <a-button type="primary" style="margin-left: 20px" @click="test()"
            >test scan</a-button
          >
        </a-col>

        <!-- this is a series of buttons -->
        <!-- <a-col flex="1">
          <a-space :size="12">
            <a-button type="primary">
              <CloudDownloadOutlined />
              Import CSV
            </a-button>
            <a-button type="primary"> Buat Pembelian Baru </a-button>
          </a-space>
        </a-col> -->
      </a-row>

      <a-table
        :columns="columns"
        :dataSource="operation_data.data"
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
import { notification } from "ant-design-vue";
const axios = require("axios");
export default {
  components: {
    AppstoreOutlined,
  },
  data() {
    return {
      operating: false,
      scan_count: 10,
      tray_selection_value: "",

      trays: [{ value: "K01" }, { value: "K02" }, { value: "K03" }],

      operation_data: {
        statistics: {
          selesai: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 895000,
          },
          menunggu: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 112000,
          },
          jatuh_tempo: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 21000,
          },
        },
        data: [
          {
            item_rfid_uid: "OR/PEMB/221101",
            item_name: "test 1",
            status: "selesai",
            item_price: 100000,
            item_type: "test",
          },
        ],
      },

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
  },
  methods: {
    checkStatus(value){
      if(value == "scanned"){
        return "success"
      }
      else{
        return "error"
      }
    },
    test() {
      var scanned_tag = "1051046063";
      this.operation_data.data.forEach((obj) => {
        if (obj.status === "not scanned" && obj.item_rfid_uid == scanned_tag) {
          obj.status= "scanned";
          this.scan_count--;
          return;
        }
        else if(obj.status === "scanned" && obj.item_rfid_uid == scanned_tag){
          console.log("this item has already been scanned");
        }
      });
      if(this.scan_count <= 0){
        this.operating = false;
      }
    },
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
          app.operation_data.data = response.data.tray_data;

          app.operation_data.data.forEach((obj) => {
            obj.status = "not scanned";
          });
          app.scan_count = app.operation_data.data.length;
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
  },
  created() {
    this.getTray();
  },
};
</script>
