import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Paho from "paho-mqtt";

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount("#app");
let generatedCID = Math.floor(Math.random() * 10000);
app.config.globalProperties.$globalClient = new Paho.Client(
    "localhost",
    9001,
    "webclient/item_master/01" + generatedCID
);
app.config.globalProperties.$isConnected = false;
