import { createRouter,createWebHashHistory} from "vue-router";

import PageLou15 from "./views/lou/Lou15.vue";
import PageLou18 from "./views/lou/Lou18.vue";
import PageLou22 from "./views/lou/Lou22.vue";
import PageLou47 from "./views/lou/Lou47.vue";
import PageLou48 from "./views/lou/Lou48.vue";
import PageLou69 from "./views/lou/Lou69.vue";
import PageLou59 from "./views/lou/Lou59.vue";
import PageLou63 from "./views/lou/Lou63.vue";
import PageLou73 from "./views/lou/Lou73.vue";
import PageLou79 from "./views/lou/Lou79.vue";
const routes=[
  {
    path:"",
    name:"lou",
    children:[
      {
        path:"15",
        name:"lou15",
        component:PageLou15
      },
      {
        path:"18",
        name:"lou18",
        component:PageLou18
      },
      {
        path:"22",
        name:"lou22",
        component:PageLou22
      },
      {
        path:"47",
        name:"lou47",
        component:PageLou47
      },
      {
        path:"48",
        name:"lou48",
        component:PageLou48
      },
      {
        path:"59",
        name:"lou59",
        component:PageLou59
      },
      {
        path:"63",
        name:"lou63",
        component:PageLou63
      },
      {
        path:"69",
        name:"lou69",
        component:PageLou69
      },
      {
        path:"73",
        name:"lou73",
        component:PageLou73
      },
      {
        path:"79",
        name:"lou79",
        component:PageLou79
      },
    ]
  }
]
export default createRouter({
  history:createWebHashHistory(),
  routes
})