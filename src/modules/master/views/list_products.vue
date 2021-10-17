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

      <!-- <a-col flex="1">
        
      </a-col> -->

      <a-col flex="1">
        <a-space :size="20">
          <a-button type="primary">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
          <a-button type="primary" @click="visible = true">
            <PlusOutlined />
            Tambah Barang
          </a-button>
          <a-modal v-model:visible="visible" title="Form Input Barang">
            <template #footer>
              <a-button key="back">Batal</a-button>
              <a-button key="submit" type="primary">Tambah</a-button>
            </template>
            <a-form layout="vertical">
              <a-form-item label="Nama Barang">
                <a-input placeholder="Input nama barang"> </a-input>
              </a-form-item>
              <a-form-item label="Merek">
                <a-input placeholder="Input merek barang"> </a-input>
              </a-form-item>
              <a-form-item label="Varian">
                <a-input placeholder="Input varian barang"> </a-input>
              </a-form-item>
              <a-form-item label="Satuan Grosir">
                <a-input placeholder="Input satuan grosir barang"> </a-input>
              </a-form-item>
              <a-form-item label="Satuan Eceran">
                <a-input placeholder="Input satuan eceran barang"> </a-input>
              </a-form-item>
              <a-form-item label="Harga Beli Grosir">
                <a-input placeholder="Input harga beli grosir barang">
                </a-input>
              </a-form-item>
              <a-form-item label="Harga Jual Grosir">
                <a-input placeholder="Input harga jual grosir barang">
                </a-input>
              </a-form-item>
              <a-form-item label="Harga Jual Eceran">
                <a-input placeholder="Input jual eceran barang"> </a-input>
              </a-form-item>
              <a-form-item label="Stok Gudang">
                <a-input placeholder="Input stok gudang"> </a-input>
              </a-form-item>
              <a-form-item label="Stok Toko">
                <a-input placeholder="Input stok toko"> </a-input>
              </a-form-item>
            </a-form>
          </a-modal>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      :dataSource="filteredData"
      :columns="columns"
      :scroll="{ x: 1800 }"
      bordered
      class="change-color"
      style="padding-bottom: 50px;"
    >
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
} from "@ant-design/icons-vue";
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
          key: "key",
        },
        {
          title: "Nama Barang",
          dataIndex: "nama",
          key: "nama",
          width: 300,
        },
        {
          title: "Merek",
          dataIndex: "merek",
          key: "merek",
        },
        {
          title: "Varian",
          dataIndex: "varian",
          key: "varian",
        },
        {
          title: "Satuan Grosir",
          dataIndex: "satuan_grosir",
          key: "satuan_grosir",
        },
        {
          title: "Satuan Eceran",
          dataIndex: "satuan_eceran",
          key: "satuan_eceran",
        },
        {
          title: "Harga Beli Grosir",
          dataIndex: "harga_beli_grosir",
          key: "harga_beli_grosir",
          slots: { customRender: "harga_beli_grosir" },
        },
        {
          title: "Harga Jual Grosir",
          dataIndex: "harga_jual_grosir",
          key: "harga_jual_grosir",
          slots: { customRender: "harga_jual_grosir" },
        },
        {
          title: "Harga Jual Eceran",
          dataIndex: "harga_jual_eceran",
          key: "harga_jual_eceran",
          slots: { customRender: "harga_jual_eceran" },
        },
        {
          title: "Stok Gudang",
          dataIndex: "stok_gudang",
          key: "stok_gudang",
        },
        {
          title: "Stok Toko",
          dataIndex: "stok_toko",
          key: "stok_toko",
        },
      ],
      visible: false,
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
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.table-header{
  background-color: blue;
}
</style>