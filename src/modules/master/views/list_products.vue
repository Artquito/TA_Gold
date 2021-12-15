<template>
  <div>
    <div class="breadcrums" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Master Tray</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <a-col flex="8">
        <a-input-search
          justify="right"
          placeholder="Search tray"
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
            Add Tray
          </a-button>
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
          <a-modal
            v-model:visible="visible"
            title="Form Barang"
            :footer="null"
            @cancel="closeForm()"
          >
            <a-form layout="vertical" @submit="postData()">
              <a-form-item label="Nama Barang">
                <a-input
                  placeholder="Input nama barang"
                  v-model:value="apiParameters.nama"
                  name="name"
                  required
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Merek">
                <a-input
                  placeholder="Input merek barang"
                  v-model:value="apiParameters.merek"
                  required
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Varian">
                <a-input
                  placeholder="Input varian barang"
                  v-model:value="apiParameters.varian"
                  required
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Satuan Grosir">
                <a-input
                  placeholder="Input satuan grosir barang"
                  v-model:value="apiParameters.satuan_grosir"
                  required
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Satuan Eceran">
                <a-input
                  placeholder="Input satuan eceran barang"
                  v-model:value="apiParameters.satuan_eceran"
                  required
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Harga Beli Grosir">
                <a-input-number
                  :step="1000"
                  placeholder="Input harga beli grosir barang"
                  v-model:value="apiParameters.harga_beli_grosir"
                  required
                ></a-input-number>
              </a-form-item>
              <a-form-item label="Harga Jual Grosir">
                <a-input-number
                  :step="1000"
                  placeholder="Input harga jual grosir barang"
                  v-model:value="apiParameters.harga_jual_grosir"
                  required
                ></a-input-number>
              </a-form-item>
              <a-form-item label="Harga Jual Eceran">
                <a-input-number
                  :step="1000"
                  placeholder="Input harga jual eceran barang"
                  v-model:value="apiParameters.harga_jual_eceran"
                  required
                ></a-input-number>
              </a-form-item>
              <a-form-item v-if="isInputing" label="Stok Gudang">
                <a-input-number
                  :step="1"
                  placeholder="Input stok gudang"
                  v-model:value="apiParameters.stok_gudang"
                  required
                ></a-input-number>
              </a-form-item>
              <a-form-item v-if="isInputing" label="Stok Toko">
                <a-input-number
                  :step="1"
                  placeholder="Input stok toko"
                  v-model:value="apiParameters.stok_toko"
                  type="number"
                ></a-input-number>
              </a-form-item>
              <a-space>
                <a-button key="submit" type="primary" html-type="submit">
                  <span v-if="apiParameters.key == ''"> Tambah</span>
                  <span v-else>Ubah</span>
                </a-button>
                <a-button key="back" @click="closeForm()">Batal</a-button>
              </a-space>
            </a-form>
          </a-modal>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      :dataSource="filteredData"
      :columns="columns"
      bordered
      class="change-color"
      style="padding-bottom: 50px"
    >
      <template #action="{ record }">
        <div>
          <span>
            <a-button type="primary" block @click="handleEdit(record)"
              >Details</a-button
            >
          </span>
        </div>
      </template>
      <template #harga_beli_grosir="{ text }">
        {{ formatRupiah(text, "Rp.") }}
      </template>
      <template #harga_jual_grosir="{ text }">
        {{ formatRupiah(text, "Rp.") }}
      </template>
      <template #harga_jual_eceran="{ text }">
        {{ formatRupiah(text, "Rp.") }}
      </template>
    </a-table>
  </div>
</template>

<script>
import {
  PlusOutlined,
  AppstoreOutlined,
  CloudDownloadOutlined,
  InboxOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
const axios = require("axios");
export default {
  data() {
    return {
      search_bar: "",
      fileList: [],
      data: [],
      apiParameters: {
        key: "",
        nama: "",
        merek: "",
        varian: "",
        satuan_grosir: "",
        satuan_eceran: "",
        harga_beli_grosir: "",
        harga_jual_grosir: "",
        harga_jual_eceran: "",
        stok_gudang: "",
        stok_toko: "",
      },
      columns: [
        {
          title: "Actions",
          dataIndex: "action",
          key: "action",
          width: 146,
          slots: { customRender: "action" },
        },
        {
          title: "Tray Id",
          dataIndex: "key",
          key: "key",
        },
      ],
      visible: false,
      importIsVisible: false,
      isInputing: false,
    };
  },
  components: {
    PlusOutlined,
    AppstoreOutlined,
    CloudDownloadOutlined,
    InboxOutlined,
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
        .get(DEFAULT_ENDPOINT + "/api/v1/products")
        .then(function (response) {
          app.data = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postData: function () {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/api/v1/product", {
          params: {
            data: app.apiParameters,
          },
        })
        .then(function (response) {
          app.apiParameters = {
            key: "",
            nama: "",
            merek: "",
            varian: "",
            satuan_grosir: "",
            satuan_eceran: "",
            harga_beli_grosir: "",
            harga_jual_grosir: "",
            harga_jual_eceran: "",
            stok_gudang: "",
            stok_toko: "",
          };
          app.visible = false;
          notification[response.data.result.code]({
            message: response.data.result.message,
            description: response.data.result.description,
          });
          app.getData();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleEdit: function (record) {
      let data = JSON.parse(JSON.stringify(record));

      console.log(data);
      this.visible = true;
      this.apiParameters = data;
      console.log(this.apiParameters);
    },
    closeForm: function () {
      this.visible = false;
      this.isInputing = false;
      this.apiParameters = {
        key: "",
        nama: "",
        merek: "",
        varian: "",
        satuan_grosir: "",
        satuan_eceran: "",
        harga_beli_grosir: "",
        harga_jual_grosir: "",
        harga_jual_eceran: "",
        stok_gudang: "",
        stok_toko: "",
      };
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
.ant-table-thead > tr > th {
  background-color: #1b5292 !important;
  color: white !important;
}
div.ant-input-number {
  width: 100% !important;
}
</style>
