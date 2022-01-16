<template>
  <div>
    <a-modal
      :visible="modal_visible"
      title="Form Supplier"
      :footer="null"
      @cancel="handleForm('close')"
    >
      <!-- this is the scan card view -->
      <div v-if="local_api_parameters.item_rfid_uid === ''">
        <a-row type="flex" justify="center" align="middle">
          <a-col>
            <ScanOutlined style="font-size: 10em; color: #08c" />
          </a-col>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
          <a-col>
            <a-typography-title :level="3" style="margin-top: 40px">
              Please Scan an Item to Continue
            </a-typography-title>
          </a-col>
        </a-row>
      </div>
      <!-- this is the form view -->
      <a-form
        v-if="local_api_parameters.item_rfid_uid !== ''"
        layout="vertical"
        @submit="postData()"
      >
        <a-form-item label="Item UID">
          <a-input
            placeholder="No UID scanned"
            v-model:value="local_api_parameters.item_rfid_uid"
            name="item_rfid_uid"
            :disabled="true"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Name">
          <a-input
            placeholder="Input name of item"
            v-model:value="local_api_parameters.item_name"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Type">
          <a-input
            placeholder="Input the type of item"
            v-model:value="local_api_parameters.item_type"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Price">
          <a-input-number
            placeholder="Input the price of item"
            :step="10000"
            :formatter="value => `IDR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/[^0-9]\s?|(,*)/g, '')"
            v-model:value="local_api_parameters.item_price"
            required
          >
          </a-input-number>
        </a-form-item>
        <a-form-item label="Item Grade">
          <a-input-number
            placeholder="Input the gold grade of item in karats"
            :formatter="value => `${value} karat`"
            :parser="value => value.replace(/\s?[karat]|([^0-9])/g, '')"
            v-model:value="local_api_parameters.item_grade"
            required
          >
          </a-input-number>
        </a-form-item>
        <a-form-item label="Item Weight">
          <a-input-number
            placeholder="Input the weight of item in grams"
            :step="0.1"
            :formatter="value => `${value} gr`"
            :parser="value => value.replace(/\s?[gr]|[^0-9\.]/g,'')"
            v-model:value="local_api_parameters.item_weight"
            required
          >
          </a-input-number>
        </a-form-item>
        <a-form-item label="Item Tray">
          <a-input
            placeholder="Input the item tray"
            v-model:value="local_api_parameters.item_tray_id"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Supplier">
          <a-input
            placeholder="Input the item supplier name"
            v-model:value="local_api_parameters.item_supplier"
            required
          >
          </a-input>
        </a-form-item>
        <a-space>
          <a-button key="submit" type="primary" html-type="submit">
            <span v-if="local_api_parameters.id === ''">Add</span>
            <span v-else>Change</span>
          </a-button>
          <a-button key="back" @click="handleForm('close')">Cancel</a-button>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import { message } from "ant-design-vue";
import { ScanOutlined } from "@ant-design/icons-vue";
const axios = require("axios");
export default {
  components: {
    ScanOutlined,
  },
  data() {
    return {
      local_api_parameters: {
        id: "",
        item_rfid_uid: "",
        item_name: "",
        item_type: "",
        item_price: "",
        item_grade: "",
        item_weight: "",
        item_tray_id:"",
        item_supplier: "",
        item_arrival: "",
        item_status: "",
      },
      topic: "test",
      device_topic: "ESP8266Client/reader01/test",
    };
  },
  props: ["api_parameters", "modal_visible"],
  watch: {
    api_parameters: function(new_value){
      let copy = JSON.parse(JSON.stringify(new_value));
      this.local_api_parameters = copy;
    }
  },
  methods: {
    postData() {
      var app = this;
      var payload = this.local_api_parameters;
      axios
        .post(DEFAULT_ENDPOINT + "/insert_item.php", payload)
        .then(response => {
          console.log(response);
          if(response.data.code === "success"){
            message.success(response.data.message);
            app.getData();
          }
          else{
            message.error(response.data.message);
          }
          this.$emit("reset-parameters");
          this.$emit("handle-form-modal", "close");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      this.$emit("get-data");
    },
    handleForm(action) {
      if (action == "close") {
        // this.$globalClient.disconnect();
        //change this to  unsubscribe
        this.$emit("handle-form-modal", "close");
        this.$emit("reset-parameters");
      } 
      // else {
      //   if (!this.$isConnected) {
      //     this.connect();
      //   }
      //   this.$emit("handle-modal-form", "open");
      // }
    },
    checkForDuplicate(item_rfid_uid){
      var app = this;
      var getParameter = "?item_rfid_uid=" + item_rfid_uid;
      axios.get(DEFAULT_ENDPOINT + "/check_item_duplicate.php" + getParameter)
        .then(response =>{
          if(response.data.code === "valid"){
            app.local_api_parameters.item_rfid_uid = item_rfid_uid;
            app.$emit("handle-form-modal", "open");
            message.success("Item scanned");
          }
          else{
            message.error("Item tag is in an active state")
          }
        })
        .catch(err =>{
          console.log(err);
        });
    },
    onConnectionLost(responseObject) {
      this.$setConnection(false);
      console.log("disconnected");
      console.log("onConnectionLost:" + responseObject.errorMessage);
    },
    onMessageArrived(payload) {
      if (this.local_api_parameters.item_rfid_uid === "") {
        this.checkForDuplicate(payload.payloadString);
      } 
      else {
        message.warning("Input busy");
      }
    },
    setupPaho(){
      this.$globalClient.onConnectionLost = this.onConnectionLost;
      this.$globalClient.onMessageArrived = this.onMessageArrived;
      this.$globalClient.subscribe(this.topic);
      this.$globalClient.publish(this.device_topic, "1", 1, true);
      this.$setConnection(true);
      message.success('Master item setup complete');
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
