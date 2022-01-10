import Outbound from "./views/outbound_item.vue"
import Module from "./module.vue"

const routes = {
    path:"outbound",
    component: Module,
    children: [
        {
            path:"item",
            component:Outbound
        }
    ],
}

export default routes;
