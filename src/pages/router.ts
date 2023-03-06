import { createRouter, createWebHistory,createWebHashHistory} from "vue-router";
import PageArea15 from "./views/Area15.vue";
import PageArea22 from "./views/Area22.vue";
import PageArea47 from "./views/Area47.vue";
import PageArea48 from "./views/Area48.vue";
import PageArea69 from "./views/Area69.vue";
import PageArea59 from "./views/Area59.vue";
import PageArea18 from "./views/Area18.vue";
import PageArea63 from "./views/Area63.vue";
import PageArea73 from "./views/Area73.vue";
import PageArea79 from "./views/Area79.vue";

import PageAreaTotal from "./views/AreaTotal.vue";
import PageAreaTotalByFloor from "./views/AreaTotalByFloor.vue";
import PageAreaDisplay from "./views/AreaDisplay.vue";
import PageSearchLou from "./views/SearchLou.vue";
const routes=[
  {
    path:"",
    name:"index",
    children:[
      {
        path:"search-lou",
        name:"search-lou",
        component:PageSearchLou,
      },
      {
        path:"area_display",
        name:"area_display",
        component:PageAreaDisplay,
      },
      {
        path:"area_total",
        name:"area_total",
        component:PageAreaTotal,
      },
      {
        path:"area_total_by_floor",
        name:"area_total_by_floor",
        component:PageAreaTotalByFloor,
      },
      {
        path:"area59",
        name:"area59",
        component:PageArea59
      },
      {
        path:"area18",
        name:"area18",
        component:PageArea18
      },
      {
        path:"area15",
        name:"area15",
        component:PageArea15
      },
      {
        path:"area22",
        name:"area22",
        component:PageArea22
      },
      {
        path:"area69",
        name:"area69",
        component:PageArea69
      },
      {
        path:"area47",
        name:"area47",
        component:PageArea47
      },
      {
        path:"area48",
        name:"area48",
        component:PageArea48
      },
      {
        path:"area63",
        name:"area63",
        component:PageArea63
      },
      {
        path:"area73",
        name:"area73",
        component:PageArea73
      },
      {
        path:"area79",
        name:"area79",
        component:PageArea79
      }
    ],
  }
]
export default createRouter({
  history:createWebHashHistory(),
  routes
})