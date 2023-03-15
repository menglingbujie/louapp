import { createRouter,createWebHashHistory} from "vue-router";

import PageAreaTotal from "./views/AreaTotal.vue";
import PageAreaTotalByFloor from "./views/AreaTotalByFloor.vue";
import PageAreaDisplay from "./views/AreaDisplay.vue";
import PageSearchLou from "./views/SearchLou.vue";

import PageHome from "./views/Home.vue";
import PageDashboard from "./views/Dashboard.vue";

import PageMobileSearchLou from "./views/mobile/SearchLou.vue";

import PageError from "./views/Error.vue";

function checkIsInWhiteList(userKey:string){
  const whiteKeysStr = import.meta.env.VITE_WHITE_KEYS;
  const whiteKey = whiteKeysStr&&whiteKeysStr.split(",")||[],
    isInWhiteList=whiteKey.indexOf(userKey)!=-1?true:false;
  
  // console.log("====",isInWhiteList,"====",whiteKey)
  return isInWhiteList;
}
const routes=[
  {
    path:"",
    name:"index",
    children:[
      {
        path:"",
        redirect:"home"
      },
      {
        path:"error",
        name:"error",
        component:PageError,
      },
      {
        path:"dashboard/:userkey",
        name:"dashboard-userkey",
        component:PageDashboard,
        beforeEnter:(to,form)=>{
          const _userKey = to.params.userkey||0;
          if(!_userKey) return "error";
          
          const isInWhiteList = checkIsInWhiteList(_userKey);
          
          // console.log("====",isInWhiteList,"====",whiteKey);
          if(!isInWhiteList){
            return "error";
          }
          return true;
        },
      },
      {
        path:"dashboard",
        name:"dashboard",
        // component:PageDashboard,
        redirect:"error"
      },
      {
        path:"home/:userkey",
        name:"home-userkey",
        component:PageHome,
        beforeEnter:(to,form)=>{
          const _userKey = to.params.userkey||0;
          if(!_userKey) return "error";
          
          const isInWhiteList = checkIsInWhiteList(_userKey);
          
          // console.log("====",isInWhiteList,"====",whiteKey);
          if(!isInWhiteList){
            return "error";
          }
          return true;
        },
      },
      // {
      //   path:"home",
      //   name:"home",
      //   // component:PageHome,
      //   redirect:"error"
      // },
      {
        path:"search-lou",
        name:"search-lou",
        component:PageSearchLou,
      },
      {
        path:"area-display",
        name:"area-display",
        component:PageAreaDisplay,
      },
      {
        path:"area-total",
        name:"area-total",
        component:PageAreaTotal,
      },
      {
        path:"area-total-by-floor",
        name:"area-total-by-floor",
        component:PageAreaTotalByFloor,
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
              
              const isInWhiteList = checkIsInWhiteList(_userKey);
              
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
    ]
  }
]
export default createRouter({
  history:createWebHashHistory(),
  routes
})