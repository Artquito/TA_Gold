<template>
  <a-breadcrumb style="margin: 30px 0">
    <a-breadcrumb-item>
      <ShoppingCartOutlined />
      Outbound
    </a-breadcrumb-item>
    <a-breadcrumb-item>Items</a-breadcrumb-item>
  </a-breadcrumb>
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
        <a-button type="primary" @click="input_modal_is_on=true">Add Item</a-button>
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
  <!-- the add item instruction -->
  <a-modal 
  :visible="input_modal_is_on"
  title="Add Outbound Items"
  :footer="null"
  @cancel="input_modal_is_on=false">
    <a-row type="flex" justify="center" align="middle">
      <a-col>
        <ScanOutlined style="font-size: 10em; color: #08c" />
      </a-col>
      <a-col>
        <a-typography-title :level="3" akign style="margin-top: 40px; margin-bottom:0; text-align:center;">
          Put Item Tag In Front of Scanner to Add Item to List
        </a-typography-title>
      </a-col>
    </a-row>
    <a-divider style="margin:12px 0"/>
    <a-row type="flex" justify="left" align="middle">
      <a-col>
        <a-typography-paragraph style="width: 350px;margin-bottom:0;"> 
          <strong>Note :</strong> You can just scan the item tag without needing to click the add button again
        </a-typography-paragraph>
      </a-col>
    </a-row>
  </a-modal>
  <!-- the table -->
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
import { ShoppingCartOutlined,ScanOutlined } from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import { message } from 'ant-design-vue';
const axios = require("axios");
export default {
  components: {
    ShoppingCartOutlined,
    ScanOutlined,
  },
  data() {
    return {
      input_modal_is_on:false,

      topic: "test",
      device_topic: "ESP8266Client/reader01/test",
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
        this.getScannedItem(this.input);
        
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
        let code = response.data.code;
        if(code === "success"){
          message.success("Report successfully posted");
          app.data = [];
        }
        else{
          message.error("Something went wrong, try again!");
        }
      })
      .catch(err=>{
        console.log(err);
      });
    },
    getScannedItem(input){
      var app = this;
      var getParameter = "?item_rfid_uid=" + input;
      axios.get(DEFAULT_ENDPOINT + "/get_scanned_item.php" + getParameter)
        .then(response =>{
          if(response.data.code === 'success'){
            const check = app.checkIfExist(this.data,response.data.item.item_rfid_uid);
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
    checkIfExist(data,item_rfid_uid){
      var status ="valid";
      data.forEach((obj) => {
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
    onMessageArrived(message){
      var item_rfid_uid = message.payloadString;
      this.getScannedItem(item_rfid_uid);
    },
    onConnectionLost: function (responseObject) {
      this.$setConnection(false);
      message.warning('Disconected');
      console.log("onConnectionLost:" + responseObject.errorMessage);
    },
    setupPaho(){
      this.$globalClient.onConnectionLost = this.onConnectionLost;
      this.$globalClient.onMessageArrived = this.onMessageArrived;
      this.$setConnection(true);
      this.$globalClient.subscribe(this.topic);
      this.$globalClient.publish(this.device_topic, "1", 1, true);
      message.success('Otubound setup complete');
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
    });
  },
};
</script>

<style></style>
