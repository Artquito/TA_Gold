import Module from "./module.vue";
import Item_Attendace_Check from "./views/item_attendance_check.vue";

const routes = {
    path: "attendance",
    component: Module,
    children: [
        {
            path: "check",
            component: Item_Attendace_Check,
        },
    ],

}

export default routes;