import Module from "./module.vue";
import ProductList from "./views/list_products.vue";
import SupplierList from "./views/list_supplier.vue";
import PelangganList from "./views/list_pelanggan";

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
            
            ],
        },
        {
            path: "supplier",
            component: Module,
            children: [
                {
                    path: "",
                    component: SupplierList,
                }
            
            ],
        },
        {
            path: "pelanggan",
            component: Module,
            children: [
                {
                    path: "",
                    component: PelangganList,
                }
            
            ], 
        }
            
        
    ]
}

export default routes;