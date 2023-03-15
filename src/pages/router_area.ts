import { createRouter,createWebHashHistory} from "vue-router";
import PageArea15 from "./views/area/Area15.vue";
import PageArea22 from "./views/area/Area22.vue";
import PageArea47 from "./views/area/Area47.vue";
import PageArea48 from "./views/area/Area48.vue";
import PageArea69 from "./views/area/Area69.vue";
import PageArea59 from "./views/area/Area59.vue";
import PageArea18 from "./views/area/Area18.vue";
import PageArea63 from "./views/area/Area63.vue";
import PageArea73 from "./views/area/Area73.vue";
import PageArea79 from "./views/area/Area79.vue";
const routes=[
  {
    path:"",
    name:"area",
    children:[
      {
        path:"15",
        name:"area15",
        component:PageArea15
      },
      {
        path:"18",
        name:"area18",
        component:PageArea18
      },
      {
        path:"22",
        name:"area22",
        component:PageArea22
      },
      {
        path:"47",
        name:"area47",
        component:PageArea47
      },
      {
        path:"48",
        name:"area48",
        component:PageArea48
      },
      {
        path:"59",
        name:"area59",
        component:PageArea59
      },
      {
        path:"63",
        name:"area63",
        component:PageArea63
      },
      {
        path:"69",
        name:"area69",
        component:PageArea69
      },
      {
        path:"73",
        name:"area73",
        component:PageArea73
      },
      {
        path:"79",
        name:"area79",
        component:PageArea79
      },
    ]
  }
]
export default createRouter({
  history:createWebHashHistory(),
  routes
})