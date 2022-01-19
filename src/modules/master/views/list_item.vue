<template>
  <div>
    <div class="breadcrumbs" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="item"> Master Item </router-link>
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
          <a-button type="primary" @click="handleFormModal('open')">
            <PlusOutlined />
            <span>Add Item</span>
          </a-button>
      </a-col>
    </a-row>
    <!-- this is the modal form -->
    <form-pelanggan
      :modal_visible="modal_visible"
      :api_parameters="api_parameters"
      @handle-form-modal="handleFormModal($event)"
      @get-data="getData()"
      @reset-parameters="resetParameters()"
    ></form-pelanggan>
    <!-- this is the table -->
    <a-table
      :dataSource="filteredData"
      :columns="columns"
      :scroll="{ x: 1900 }"
      bordered
      style="padding-bottom: 50px"
    >
      <template #action="{ record }">
          <span>
            <a-button @click="handleFormModal('edit',record)" block>
              <span>Edit</span>
            </a-button>
          </span>
      </template>
      <template #item_weight="{ text }">
        {{ text + " gr" }}
      </template>
      <template #item_supplier ="{ text }">
        {{capitalizeName(text)}}
      </template>
      <template #item_grade="{ text }">
        {{ text + " karat" }}
      </template>
      <template #item_price="{ text }">
        {{ formatRupiah(text, "IDR ") }}
      </template>
    </a-table>
  </div>
</template>

<script>
import formPelanggan from "./forms/master_item";
import {
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
const axios = require("axios");
export default {
  components: {
    AppstoreOutlined,
    PlusOutlined,
    "form-pelanggan": formPelanggan,
  },
  data() {
    return {
      api_parameters: {
        id: "",
        item_rfid_uid: "",
        item_name: "",
        item_type: "",
        item_price: "",
        item_grade: "",
        item_weight: "",
        item_supplier: "",
        item_arrival: "",
        item_status: "",
      },
      modal_visible:false,
      search_bar: "",
      data: [],
      columns: [
        {
          title: "Actions",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" },
          width: 100,
        },
        {
          title: "ID",
          dataIndex: "id",
          Key: "id",
          width: 100,
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
          width: 220,
        },
        {
          title: "Price",
          dataIndex: "item_price",
          slots: { customRender: "item_price" },
        },
        {
          title: "Grade",
          dataIndex: "item_grade",
          slots: { customRender: "item_grade" },
          width: 100,
        },
        {
          title: "Weight",
          dataIndex: "item_weight",
          slots: { customRender: "item_weight" },
          width: 100,
        },
        {
          title:"Tray",
          dataIndex: 'item_tray_id',
          width:100,
        },
        {
          title: "Supplier",
          dataIndex: "item_supplier",
          slots: { customRender: "item_supplier" },
          width: 220,
        },
        {
          title: "Date of Arrival",
          dataIndex: "item_arrival",
          width: 220,
        },
        {
          title: "Status",
          dataIndex: "item_status",
          width: 100,
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
    handleFormModal(task, record){
      if(task === "edit"){
        if (record !== "undefined") {
          let data = JSON.parse(JSON.stringify(record)); // this turns the recorded data index into json format
          data.item_supplier = data.item_supplier_id;
          delete data["item_supplier_id"]
          this.api_parameters = data; //assigns it to the local api parameters
        }
      }
      if(task === "open" || task === "edit"){
        // console.log(this.api_parameters);
        this.modal_visible = true;
      }
      else{
        this.modal_visible =false;
        this.resetParameters();
      }
    },
    getData: function () {
      var app = this;

      axios
        .get(DEFAULT_ENDPOINT + "/item.php")
        .then(function (response) {
          app.data = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    resetParameters(){
      this.api_parameters = {
          id: "",
          item_rfid_uid: "",
          item_name: "",
          item_type: "",
          item_price: "",
          item_grade: "",
          item_weight: "",
          item_supplier: "",
          item_arrival: "",
          item_status: "",
        };
    },
    formatRupiah(angka, prefix) {
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
      return prefix == undefined ? rupiah : rupiah ? "IDR " + rupiah : "";
    },
    capitalizeName(name){
      let altered_text = name.split(" ");
      for(name in altered_text){
        altered_text[name] = altered_text[name][0].toUpperCase() + altered_text[name].substr(1);
      }
      return altered_text.join(" "); 
    },
  },
  created() {
    this.getData();
  },
};
</script>
