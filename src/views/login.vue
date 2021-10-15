<template>
  <div class="login-form">
    <div class="child">
      <a-card class="child" title="Login" style="width: 300px">
        <a-row justify="center" :gutter="[0, 20]">
          <a-col>
            <a-space direction="vertical" :size="20">
              <a-input
                size="large"
                placeholder="masukan username"
                v-model:value="username"
              >
                <template #prefix>
                  <PlusOutlined />
                </template>
              </a-input>
              <a-input-password
                size="large"
                placeholder="masukan password"
                v-model:value="password"
              >
              </a-input-password>
            </a-space>
          </a-col>
          <a-col>
            <a-button type="primary" class="login-button" @click="userAuth()"
              >Login</a-button
            >
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { notification } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { DEFAULT_ENDPOINT } from "@/core/api.js";
const axios = require("axios");
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  component: {
    PlusOutlined,
  },
  methods: {
    checkUser(code){
      if(code == "success"){
        notification["success"]({
            message: "Login Berhasil",
            description:
              "Mengarahkan anda ke halaman utama",
        });
        this.$router.replace("/");
        
      }
      else{
        notification["error"]({
            message: "Login Gagal",
            description:
              "Mohon maaf username dan password tidak cocok mohon coba lagi",
          });
      }
    },
    userAuth() {
      var app = this;
      axios
        .post(DEFAULT_ENDPOINT + "/api/v1/user/auth", {
          params: {
            data: {
              username: app.username,
              password: app.password,
            },
          },
        })
        .then(function (response) {
          let code = response.data.result.code;
          app.checkUser(code);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login-form {
  height: 100%;
  width: 100%;
}
a-card.child {
  color: blue;
}
.child {
  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-button {
  width: 225px;
}
</style>