import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/index";
import Master from "@/modules/master";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [Master.route]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
