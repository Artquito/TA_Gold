import Module from "./module.vue";
import List_Tray from "./views/list_tray.vue";
import List_Supplier from "./views/list_supplier.vue";
import List_Item from "./views/list_item";

const routes = {
    path: "master",
    component: Module,
    children: [
        
        {
            path: "tray",
            component: Module,
            children: [
                {
                    path: "",
                    component: List_Tray,
                }
            
            ],
        },
        {
            path: "supplier",
            component: Module,
            children: [
                {
                    path: "",
                    component: List_Supplier,
                }
            
            ],
        },
        {
            path: "item",
            component: Module,
            children: [
                {
                    path: "",
                    component: List_Item,
                }
            
            ], 
        },
    ],
    
}

export default routes;