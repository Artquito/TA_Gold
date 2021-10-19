<template>
  <div>
    <div class="breadcrums" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Master Barang</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <a-col flex="8">
        <a-input-search
          justify="right"
          placeholder="input search text"
          style="width: 200px"
          v-model:value="search_bar"
          size="medium"
        />
      </a-col>
      <a-col flex="1">
        <a-space :size="12">
          <a-button type="primary" @click="importIsVisible = true">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
          <a-button
            type="primary"
            @click="
              {
                visible = true;
                isInputing = true;
              }
            "
          >
            <PlusOutlined />
            Tambah Supplier
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-table
      :dataSource="filteredData"
      :columns="columns"
      :scroll="{ x: 1300 }"
      bordered
      class="change-color"
      style="padding-bottom: 50px"
    >
    </a-table>
  </div>
</template>

<script>
import {
  PlusOutlined,
  AppstoreOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons-vue";
// import { notification } from "ant-design-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
const axios = require("axios");
export default {
  data() {
    return {
      search_bar: "",
      data: [],
      columns: [
        {
          title: "ID",
          dataIndex: "key",
          Key: "key",
          width: 127,
        },
        {
          title: "Nama",
          dataIndex: "nama",
          Key: "nama",
          width: 300,
        },
        {
          title: "Negara",
          dataIndex: "negara",
        },
        {
          title: "Provinsi",
          dataIndex: "provinsi",
        },
        {
          title: "Kota",
          dataIndex: "kota",
        },
        {
          title: "Alamat",
          dataIndex: "alamat",
        },
        {
          title: "Nomor Telpon",
          dataIndex: "no_telpon",
          width: 300,
        },
      ],
    };
  },
  components: {
    PlusOutlined,
    AppstoreOutlined,
    CloudDownloadOutlined,
  },
  computed: {
    filteredData() {
      return this.data.filter((tableData) => {
        return tableData.nama
          .toLowerCase()
          .includes(this.search_bar.toLowerCase());
      });
    },
  },
  methods: {
    getData: function () {
      var app = this;

      axios
        .get(DEFAULT_ENDPOINT + "/api/v1/suppliers")
        .then(function (response) {
          app.data = response.data;
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