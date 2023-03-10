import { createRouter, createWebHistory,createWebHashHistory} from "vue-router";
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

import PageLou15 from "./views/lou/Lou15.vue";
import PageLou22 from "./views/lou/Lou22.vue";
import PageLou47 from "./views/lou/Lou47.vue";
import PageLou48 from "./views/lou/Lou48.vue";
import PageLou69 from "./views/lou/Lou69.vue";
import PageLou59 from "./views/lou/Lou59.vue";
import PageLou18 from "./views/lou/Lou18.vue";
import PageLou63 from "./views/lou/Lou63.vue";
import PageLou73 from "./views/lou/Lou73.vue";
import PageLou79 from "./views/lou/Lou79.vue";

import PageAreaTotal from "./views/AreaTotal.vue";
import PageAreaTotalByFloor from "./views/AreaTotalByFloor.vue";
import PageAreaDisplay from "./views/AreaDisplay.vue";
import PageSearchLou from "./views/SearchLou.vue";

import PageHome from "./views/Home.vue";

import PageMobileSearchLou from "./views/mobile/SearchLou.vue";

import PageError from "./views/Error.vue";
import { nextTick } from "vue";

const routes=[
  {
    path:"",
    name:"index",
    children:[
      {
        path:"",
        name:"",
        redirect:"home"
      },
      {
        path:"error",
        name:"error",
        component:PageError,
      },
      {
        path:"home",
        name:"home",
        component:PageHome
      },
      {
        path:"mobile",
        name:"mobile",
        children:[
          {
            path:"search-lou/:userkey",
            name:"search-lou-h5-userkey",
            component:PageMobileSearchLou,
            beforeEnter:(to,form)=>{
              const _userKey = to.params.userkey||0;
              if(!_userKey) return "error";
              
              const whiteKeysStr = import.meta.env.VITE_WHITE_KEYS,
                whiteKey = whiteKeysStr&&JSON.parse(whiteKeysStr)||"",
                isInWhiteList=whiteKey.indexOf(parseInt(_userKey))!=-1?true:false;
              
              // console.log("====",isInWhiteList,"====",whiteKey);
              if(!isInWhiteList){
                return "error";
              }
              return true;
            },
          },
          {
            path:"search-lou",
            name:"search-lou-h5",
            redirect:"error"
          }
        ]
      },
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
        path:"area",
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
    ],
  }
]
export default createRouter({
  history:createWebHashHistory(),
  routes
})