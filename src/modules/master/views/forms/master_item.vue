<template>
  <div>
    <a-button
      type="primary"
      v-if="cIsInputing"
      @click="handleForm('open', true)"
    >
      <PlusOutlined />
      Add Item
    </a-button>
    <a-button
      type="primary"
      block
      v-if="!cIsInputing"
      @click="handleEdit(cApiParameters)"
    >
      Details
    </a-button>
    <a-modal
      v-model:visible="mVisible"
      title="Form Supplier"
      :footer="null"
      @cancel="handleForm('close')"
    >
      <!-- this is the scan card view -->
      <div v-if="apiParameters.item_rfid_uid == ''">
        <a-row type="flex" justify="center" align="middle">
          <a-col>
            <ScanOutlined style="font-size: 10em; color: #08c" />
          </a-col>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
          <a-col>
            <a-typography-title :level="3" style="margin-top: 40px"
              >Please Scan Your Card to Continue</a-typography-title
            >
          </a-col>
        </a-row>
      </div>
      <!-- this is the form view -->
      <a-form
        v-if="!apiParameters.item_rfid_uid == ''"
        layout="vertical"
        @submit="postData()"
      >
        <a-form-item label="Item UID">
          <a-input
            placeholder="No UID scanned"
            v-model:value="apiParameters.item_rfid_uid"
            name="item_rfid_uid"
            :disabled="true"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Name">
          <a-input
            placeholder="Input name of item"
            v-model:value="apiParameters.item_name"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Type">
          <a-input
            placeholder="Input the type of item"
            v-model:value="apiParameters.item_type"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Price">
          <a-input
            placeholder="Input the price of item"
            v-model:value="apiParameters.item_price"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Grade">
          <a-input
            placeholder="Input the gold grade of item in karats"
            v-model:value="apiParameters.item_grade"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Weight">
          <a-input
            placeholder="Input the weight of item in grams"
            v-model:value="apiParameters.item_weight"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Item Supplier">
          <a-input
            placeholder="Input the item supplier name"
            v-model:value="apiParameters.item_supplier"
            required
          >
          </a-input>
        </a-form-item>
        <a-space>
          <a-button key="submit" type="primary" html-type="submit">
            <span v-if="apiParameters.id == ''">Add</span>
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
// import { notification } from "ant-design-vue";
import { PlusOutlined, ScanOutlined } from "@ant-design/icons-vue";
// import { Alert } from "ant-design-vue";
const axios = require("axios");
export default {
  data() {
    return {
      mVisible: false,
      apiParameters: {
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
      topic: "test",
    };
  },
  props: ["cApiParameters", "cIsInputing"],
  methods: {
    //handeleEdit is there to handle an edit event when a user clicks the details button
    handleEdit: function (record) {
      // records taken from the props cApiParameters
      this.handleForm("open", false);
      if (record !== "undefined") {
        let data = JSON.parse(JSON.stringify(record)); // this turns the recorded data index into json format
        this.mVisible = true; // this makes the modal appear
        this.apiParameters = data; //assigns it to the local api parameters
      }
    },
    postData: function () {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/insert_item.php", {
          item_rfid_uid: app.apiParameters.item_rfid_uid,
          item_name: app.apiParameters.item_name,
          item_type: app.apiParameters.item_type,
          item_price: app.apiParameters.item_price,
          item_grade: app.apiParameters.item_grade,
          item_weight: app.apiParameters.item_weight,
          item_supplier: app.apiParameters.item_supplier,
          item_arrival: app.apiParameters.item_arrival,
          item_status: app.apiParameters.item_status,
        })
        .then(function (response) {
          app.apiParameters = {
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
          console.log("server post request");
          console.log(response);
          app.getData();
          app.mVisible = false;
          // notification[response.data.result.code]({
          //   message: response.data.result.message,
          //   description: response.data.result.description,
          // });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getData: function () {
      this.$emit("getData");
    },
    handleForm: function (action, isInputing) {
      // this.$emit("formAction");
      if (action == "close") {
        // this.$globalClient.disconnect();
        //change this to  unsubscribe
        this.mVisible = false;
        this.apiParameters = {
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
      } else {
        if (!this.$isConnected) {
          this.connect();
        }
        this.mVisible = true;
      }
      if (isInputing !== "undefined") {
        this.isInputing = isInputing;
      }
    },
    onConnectionLost: function (responseObject) {
      this.$setConnection(false);
      console.log("disconnected");
      console.log("onConnectionLost:" + responseObject.errorMessage);
    },
    onMessageArrived: function (message) {
      if (this.apiParameters.item_rfid_uid == "") {
        this.apiParameters.item_rfid_uid = message.payloadString;
        this.mVisible = true;
        console.log("onMessageArrived:" + message.payloadString);
      } else {
        console.log("Input Bussy");
      }
    },
    onConnect: function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      this.$setConnection(true);
      this.$globalClient.subscribe(this.topic);
      // var message = new Paho.Message("Hello");
      // message.destinationName = this.topic;
      // this.client.send(message);
    },
    connect: function () {
      this.$globalClient.connect({
        onSuccess: this.onConnect,
        keepAliveInterval: 5,
      });
      this.$globalClient.onConnectionLost = this.onConnectionLost;
      this.$globalClient.onMessageArrived = this.onMessageArrived;
    },
  },
  mounted() {
    console.log(this.$isConnected);
    this.$nextTick(()=>{
      if(!this.$isConnected){
      this.connect();
      }
      else{
         this.$globalClient.subscribe(this.topic);
      }
    })
  },
  components: {
    PlusOutlined,
    ScanOutlined,
  },
};
</script>
