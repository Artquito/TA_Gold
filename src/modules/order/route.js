import Module from "./module.vue";
import ListOrderPurchase from "./views/list_order_purchase";

const routes = {
    path: "order",
    component: Module,
    children: [
        {
            path: "pembelian",
            component: Module,
            children: [
                {
                    path: "",
                    component: ListOrderPurchase,
                }
            ],
        },
    ],

}

export default routes;