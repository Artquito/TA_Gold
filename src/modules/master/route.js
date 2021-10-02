import Module from "./module.vue";
import ProductList from "./views/list_products.vue";

const routes = {
    path: "master",
    component: Module,
    children: [
        {
            path: "barang",
            component: Module,
            children: [
                {
                    path: "",
                    component: ProductList,
                }
            ]
        }
    ]
}

export default routes;