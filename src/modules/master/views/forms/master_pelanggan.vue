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
      <a-form layout="vertical" @submit="postData()">
        <a-form-item label="Item UID">
          <a-input
            placeholder="No UID scanned"
            v-model:value="apiParameters.item_rfid_uid"
            name="item_rfid_uid"
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
import { PlusOutlined } from "@ant-design/icons-vue";
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
    };
  },
  props: ["cApiParameters", "cIsInputing"],
  methods: {
    //handeleEdit is there to handle an edit event when a user clicks the details button
    handleEdit: function (record) { // records taken from the props cApiParameters
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
        this.mVisible = true;
      }
      if (isInputing !== "undefined") {
        this.isInputing = isInputing;
      }
    },
  },
  components: {
    PlusOutlined,
  },
};
</script>
