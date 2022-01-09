import Module from "./module.vue";
import dashboard from "./views/dashboard";

const routes = {
    path: "dashboard",
    component: Module,
    children: [
        {
            path: "",
            component: dashboard,
        },
    ],

}

export default routes;