import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/index";
import Master from "@/modules/master";
import Order from "@/modules/order";
import Dashboard from "@/modules/dashboard";
import Login from "@/views/login.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [Dashboard.route, Master.route, Order.route]
  },
  {
    path: "/login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
