<template>
  <a-breadcrumb style="margin: 30px 0">
    <a-breadcrumb-item>
      <ShoppingCartOutlined />
      Outbound
    </a-breadcrumb-item>
    <a-breadcrumb-item>Items</a-breadcrumb-item>
  </a-breadcrumb>
  {{input}}
  <div style="width:300px">
  <a-input v-model:value="input"></a-input>
  </div>
  <!-- the  controls -->
  <a-row type="flex" justify="end" style="margin-bottom: 30px">
    <a-col flex="10">
      <a-input-search
        justify="right"
        placeholder="Search item"
        v-model:value="search_bar"
        style="width: 200px"
        size="medium"
      ></a-input-search>
    </a-col>
    <a-col flex="0">
      <a-space :size="12">
        <a-button type="primary" @click="handleTable('add')">Add Item</a-button>
        <a-popconfirm
          title="Are you sure you want to post the report?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="postReport()"
        >
          <a-button> Post Report </a-button>
        </a-popconfirm>
      </a-space>
    </a-col>
  </a-row>

  <a-table :dataSource="filteredScannedData" :columns="columns" bordered style="padding-bottom: 50px">
    <template #action="record">
      <div>
        <span>
          <a-button block type="primary" @click="handleTable('remove', record)">Cancel</a-button>
        </span>
      </div>
    </template>
    <template #item_weight="{ text }">
        {{ text + " gr" }}
    </template>
    <template #item_grade="{ text }">
        {{ text + " karat" }}
    </template>
    <template #item_price="{ text }">
        {{ formatRupiah(text, "Rp.") }}
    </template>
  </a-table>
</template>

<script>
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import { message } from 'ant-design-vue';
const axios = require("axios");
export default {
  components: {
    ShoppingCartOutlined,
  },
  data() {
    return {
      search_bar:"",
      input:"",
      data:[
        // {
        //   id:5,
        //   item_rfid_uid:"0878",
        //   item_name:"test",
        //   item_type:"test",
        //   item_weight:1.6,
        //   item_grade:12,
        //   item_price:2000000,
        // },
        // {
        //   id:4,
        //   item_rfid_uid:"0878",
        //   item_name:"test",
        //   item_type:"test",
        //   item_weight:1.6,
        //   item_grade:12,
        //   item_price:2000000,
        // }
      ],
      columns:[
        {
          title:"Actions",
          dataIndex:"action",
          Keys:"action",
          slots:{customRender:"action"},
          width:146,
        },
        {
          title:"RFID UID",
          dataIndex:"item_rfid_uid",
          Keys:"item_rfid_uid",
          width:146,
        },
        {
          title:"Name",
          dataIndex:"item_name",
          Keys:"item_name",
          width:300,
        },
        {
          title:"Type",
          dataIndex:"item_type",
          Keys:"item_type",
        },
        {
          title:"Weight",
          dataIndex:"item_weight",
          Keys:"item_weight",
          slots:{customRender:"item_weight"},
          width:100,
        },
        {
          title:"Grade",
          dataIndex:"item_grade",
          Keys:"item_grade",
          width:100,
          slots:{customRender:"item_grade"}
        },
        {
          title:"Price",
          dataIndex:"item_price",
          Keys:"item_price",
          slots:{customRender:"item_price"}
        },
      ]
    };
  },
  computed: {
    filteredScannedData() {
      return this.data.filter((tableData) => {
        return tableData.item_name
          .toLowerCase()
          .includes(this.search_bar.toLowerCase());
      });
    },
  },
  methods: {
    handleTable(operation, row){
      if(operation === 'add'){
        this.getScannedItem();
        
      }
      else if(operation === 'remove'){
        this.data.splice(row.index, 1);
      }
    },
    postReport(){
      const app = this;
      var item_id =[];
      for(var item in app.data){
        item_id.push({item_id:app.data[item].id});
      }
      axios.post(DEFAULT_ENDPOINT + "/post_outbound.php", item_id)
      .then(response=>{
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      });
    },
    getScannedItem(){
      var app = this;
      var getParameter = "?item_rfid_uid=" + this.input;
      axios.get(DEFAULT_ENDPOINT + "/get_scanned_item.php" + getParameter)
        .then(response =>{
          console.log(response.data);
          if(response.data.code === 'success'){
            const check = app.checkIfExist(response.data.item.item_rfid_uid);
            if(check === 'valid'){
              app.data.push(response.data.item);
            message.success(response.data.message);
            }
            else{
              message.warning('Item has already been scanned')
            }
          }
          else{
            message.error(response.data.message);
          }
        })
        .catch(err =>{
          console.log(err);
        });
    },
    checkIfExist(item_rfid_uid){
      var status ="valid";
      this.data.forEach((obj) => {
        if (obj.item_rfid_uid === item_rfid_uid) {
          status = 'duplicate'
          } 
      });
      return status;
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
};
</script>

<style></style>
