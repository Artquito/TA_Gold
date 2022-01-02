<template>
  <div>
    <div class="breadcrumbs" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="pelanggan"> Master Item </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- this is the buttons on top of the table -->
    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <a-col flex="8">
        <a-input-search
          justify="right"
          placeholder="Search item"
          style="width: 200px"
          v-model:value="search_bar"
          size="medium"
        />
      </a-col>
      <a-col flex="0">
        <a-space :size="12">
          <a-button v-if="false" type="primary" @click="importIsVisible = true">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
          <form-pelanggan
            :cIsInputing="true"
            @getData="getData()"
          ></form-pelanggan>
          <!-- this is for the supplier form add -->
        </a-space>
      </a-col>
    </a-row>
    <!-- this is the import csv button -->
    <a-modal
      title="Upload File Excel"
      v-model:visible="importIsVisible"
      :footer="null"
    >
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        action=""
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Upload File Excel di Sini</p>
        <p class="ant-upload-hint">Hanya mendukung unggahan tunggal</p>
      </a-upload-dragger>
      <a-divider />
      <a-row type="flex">
        <a-col :flex="1">
          <a-button type="primary">Unggah</a-button>
        </a-col>
        <a-col :flex="20">
          <a-button type="dashed">Download File Contoh</a-button>
        </a-col>
        <a-col :flex="0">
          <a-button
            type="regular"
            @click="
              {
                importIsVisible = false;
                fileList = [];
              }
            "
            >Batal</a-button
          >
        </a-col>
      </a-row>
    </a-modal>

    <a-table
      :dataSource="filteredData"
      :columns="columns"
      :scroll="{ x: 1800 }"
      bordered
      class="change-color"
      style="padding-bottom: 50px"
    >
      <template #action="{ record }">
        <div>
          <span>
            <form-pelanggan
              :cIsInputing="false"
              :cApiParameters="record"
              @getData="getData()"
            ></form-pelanggan>
          </span>
        </div>
      </template>
      <template #item_price="{ text }">
        {{ formatRupiah(text, "Rp.") }}
      </template>
    </a-table>
  </div>
</template>

<script>
import formPelanggan from "./forms/master_pelanggan";
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  InboxOutlined,
} from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
const axios = require("axios");
export default {
  components: {
    AppstoreOutlined,
    CloudDownloadOutlined,
    InboxOutlined,
    "form-pelanggan": formPelanggan,
  },
  props:['test'],
  data() {
    return {
      search_bar: "",
      importIsVisible: false,
      fileList: [],
      data: [],
      columns: [
        {
          title: "Actions",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" },
        },
        {
          title: "ID",
          dataIndex: "id",
          Key: "id",
          width: 127,
        },
        {
          title: "Item RFID UID",
          dataIndex: "item_rfid_uid",
          Key: "item_rfid_uid",
        },
        {
          title: "Name",
          dataIndex: "item_name",
          width: 300,
        },
        {
          title: "Type",
          dataIndex: "item_type",
        },
        {
          title: "Price",
          dataIndex: "item_price",
          slots: { customRender: "item_price" },
        },
        {
          title: "Grade",
          dataIndex: "item_grade",
        },
        {
          title: "Weight",
          dataIndex: "item_weight",
        },
        {
          title: "Supplier",
          dataIndex: "item_supplier",
        },
        {
          title: "Date of Arrival",
          dataIndex: "item_arrival",
          width: 200,
        },
        {
          title: "Status",
          dataIndex: "item_status",
        },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((tableData) => {
        return tableData.item_name
          .toLowerCase()
          .includes(this.search_bar.toLowerCase());
      });
    },
  },
  methods: {
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
    getData: function () {
      var app = this;

      axios
        .get(DEFAULT_ENDPOINT + "/item.php")
        .then(function (response) {
          app.data = response.data;
          console.log("this is the mutation");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
