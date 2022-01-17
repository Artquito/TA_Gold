import Outbound_Inserter from "./views/outbound_item.vue"
import Outbound_Report_Selector from "./views/outbound_report_selector.vue"
import Module from "./module.vue"

const routes = {
    path:"outbound",
    component: Module,
    children: [
        {
            path:"item",
            component:Outbound_Inserter
        },
        {
            path:"report",
            component:Module,
            children:[
                {
                    path:"",
                    component:Outbound_Report_Selector
                },
                {
                    path:":id",
                    component:Outbound_Inserter
                },
            ]
        }
    ],
}

export default routes;
