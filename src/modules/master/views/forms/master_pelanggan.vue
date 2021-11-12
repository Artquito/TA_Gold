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
            placeholder="Input item name"
            v-model:value="apiParameters.item_name"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Provinsi">
          <a-input
            placeholder="Input provinsi supplier"
            v-model:value="apiParameters.provinsi"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Kota">
          <a-input
            placeholder="Input kota supplier"
            v-model:value="apiParameters.kota"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Alamat">
          <a-input
            placeholder="Input alamat supplier"
            v-model:value="apiParameters.alamat"
            required
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Nomor Telpon">
          <a-input
            placeholder="Input nomor telpon supplier"
            v-model:value="apiParameters.no_telepon"
            required
          >
          </a-input>
        </a-form-item>
        <a-space>
          <a-button key="submit" type="primary" html-type="submit">
            <span v-if="apiParameters.key == ''"> Tambah</span>
            <span v-else>Ubah</span>
          </a-button>
          <a-button key="back" @click="handleForm('close')">Batal</a-button>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { DEFAULT_ENDPOINT } from "@/core/api.js";
import { notification } from "ant-design-vue";
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
    handleEdit: function (record) {
      this.handleForm("open", false);
      if (record !== "undefined") {
        let data = JSON.parse(JSON.stringify(record));
        this.mVisible = true;
        this.apiParameters = data;
      }
    },
    postData: function () {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/api/v1/customer", {
          params: {
            data: app.apiParameters,
          },
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
          notification[response.data.result.code]({
            message: response.data.result.message,
            description: response.data.result.description,
          });
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
