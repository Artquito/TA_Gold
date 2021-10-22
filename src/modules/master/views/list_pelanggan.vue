<template>
  <div>
    <div class="breadcrumbs" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="pelanggan"> Master Pelanggan </router-link>
        </a-breadcrumb-item>
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
          <form-pelanggan
            :cIsInputing="true"
            @getData="getData()"
          ></form-pelanggan>
          <!-- this is for the supplier form add -->
        </a-space>
      </a-col>
    </a-row>
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
      :scroll="{ x: 1300 }"
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
          dataIndex: "no_telepon",
          width: 300,
        },
      ],
    };
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
        .get(DEFAULT_ENDPOINT + "/api/v1/customers")
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