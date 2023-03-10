<script setup>
import { Village } from '@/utils/enum';
import loumap from "@/modal/qlhlou.min"
import loumap15 from "@/modal/area15"
import loumap18 from "@/modal/area18"
import loumap22 from "@/modal/area22"
import loumap47 from "@/modal/area47"
import loumap48 from "@/modal/area48"
import loumap59 from "@/modal/area59"
import loumap69 from "@/modal/area69"
import loumap63 from "@/modal/area63"
import loumap73 from "@/modal/area73"
import loumap79 from "@/modal/area79"

import CMPLou15 from "@/components/lou/Lou15.vue";
// import CMPLou18 from "@/components/lou/Lou18.vue";
// import CMPLou22 from "@/components/lou/Lou22.vue";
// import CMPLou47 from "@/components/lou/Lou47.vue";
// import CMPLou48 from "@/components/lou/Lou48.vue";
// import CMPLou59 from "@/components/lou/Lou59.vue";
// import CMPLou63 from "@/components/lou/Lou63.vue";
// import CMPLou69 from "@/components/lou/Lou69.vue";
// import CMPLou73 from "@/components/lou/Lou73.vue";
// import CMPLou79 from "@/components/lou/Lou79.vue";

import {ref} from "vue";
import {forEach,cloneDeep,set,toNumber} from "lodash";
import {filterUniq} from "@/utils/index";

// 定义每个地块楼的排列顺序

// 地块排序
function sortLouArea(arr){

}
function parseUser(u,l){
  let _u =cloneDeep(u);

  set(_u,"unitID",l.unitID);
  set(_u,"lou",l.lou);
  set(_u,"unit",l.unit);
  set(_u,"room",l.room);
  delete _u["选房信息"];
  delete _u.lous;

  return _u;
}
function doInsertUserToLou(users,lous){
  // 遍历users然后解析user的unitID，然后把当前user放到响应的lou里
  forEach(users,(user)=>{
    const _unitID = user.unitID,
      _unitObj = _unitID.split("-"),
      _lou = toNumber(_unitObj[1]),
      _unit = toNumber(_unitObj[2]),
      _room = toNumber(_unitObj[3]);

    // console.log("===usr=="+_lou+"=="+_unit+"--"+_room)
    let _room1 = parseInt(_room/100),
    _room2 = parseInt(_room%100);
    // console.log(`=${_lou}=${_unit}=${(_room1-1)}`,lous[_lou-1].units[_unit-1])
    const _arrUnits = lous[_lou-1].units[_unit-1];
    if(_arrUnits){
      const _louCeng = _arrUnits.length;
      set(lous[_lou-1].units[_unit-1][_louCeng-_room1][_room2-1],"user",user);
    }
  })
  // console.log("===user===",lous);
}
// 地块归位
function tidyLouArea(arr){
  let nbs15=[];
  let nbs18=[];
  let nbs22=[];
  let nbs47=[];
  let nbs48=[];
  let nbs59=[];
  let nbs63=[];
  let nbs69=[];
  let nbs73=[];
  let nbs79=[];
  forEach(arr,(u)=>{
    forEach(u.lous,(l)=>{
      switch(l.area){
        case "15":{nbs15.push(parseUser(u,l));}break;
        case "18":{nbs18.push(parseUser(u,l));}break;
        case "22":{nbs22.push(parseUser(u,l));}break;
        case "47":{nbs47.push(parseUser(u,l));}break;
        case "48":{nbs48.push(parseUser(u,l));}break;
        case "59":{nbs59.push(parseUser(u,l));}break;
        case "63":{nbs63.push(parseUser(u,l));}break;
        case "69":{nbs69.push(parseUser(u,l));}break;
        case "73":{nbs73.push(parseUser(u,l));}break;
        case "79":{nbs79.push(parseUser(u,l));}break;
      }
    })
  })

  // 往原始排序里添加user字段
  doInsertUserToLou(nbs15,loumap15);
  // doInsertUserToLou(nbs18,loumap18);
  // doInsertUserToLou(nbs22,loumap22);
  // doInsertUserToLou(nbs47,loumap47);
  // doInsertUserToLou(nbs48,loumap48);
  // doInsertUserToLou(nbs59,loumap59);
  // doInsertUserToLou(nbs63,loumap63);
  // doInsertUserToLou(nbs69,loumap69);
  // doInsertUserToLou(nbs73,loumap73);
  // doInsertUserToLou(nbs79,loumap79);
}
// 根据地块整理数据
function parseLouByArea(){
  const _list = loumap.list||[];
  // 滤重
  const _lous = filterUniq(_list);
  // console.log("===",_lous)

  // 用户地块归位
  tidyLouArea(_lous);
}
parseLouByArea();
const currentMenu = ref(["a15"]);
// 根据地块显示楼的情况
function doShowLouStatus(area){
  currentMenu.value = ['a'+area];
  console.log("==area==",area);
}

const visible = ref(false);
let selectedHouse = ref();
let selectedTitle = ref();

window.addEventListener("message", receiveMessage, false);
function receiveMessage(event){  
  const data = event?.data && (typeof event.data === 'string') && JSON.parse(event.data);
  const { type, title, content } = data;
  if(type === 'house'){
    visible.value = true;
    selectedTitle.value = title;
    selectedHouse.value = content;
  }
}
</script>
<template>
<a-layout class="page home">
  <a-layout-header class="header">
    <h2 class="title">客官里边请</h2>
  </a-layout-header>
  <a-layout-content class="container">
    <a-menu class="menus" :selectedKeys="currentMenu">
      <a-menu-item key="a15" @click.stop="doShowLouStatus(15)">#15地块</a-menu-item>
      <a-menu-item key="a18" @click.stop="doShowLouStatus(18)">#18地块</a-menu-item>
      <a-menu-item key="a22" @click.stop="doShowLouStatus(22)">#22地块</a-menu-item>
      <a-menu-item key="a47" @click.stop="doShowLouStatus(47)">#47地块</a-menu-item>
      <a-menu-item key="a48" @click.stop="doShowLouStatus(48)">#48地块</a-menu-item>

      <a-menu-item key="a59" @click.stop="doShowLouStatus(59)">#59地块</a-menu-item>
      <a-menu-item key="a63" @click.stop="doShowLouStatus(63)">#63地块</a-menu-item>
      <a-menu-item key="a69" @click.stop="doShowLouStatus(69)">#69地块</a-menu-item>
      <a-menu-item key="a73" @click.stop="doShowLouStatus(73)">#73地块</a-menu-item>
      <a-menu-item key="a79" @click.stop="doShowLouStatus(79)">#79地块</a-menu-item>
    </a-menu>
    <div class="content">
      <CMPLou15 :data="loumap15" />
    </div>
  </a-layout-content>
  <!-- 抽屉 -->
  <a-drawer
    v-model:visible="visible"
    style="color: red"
    title="House Information"
    placement="right"
    :mask="false"
    @after-visible-change="afterVisibleChange">
    <a-card :title="selectedTitle" :bordered="false" style="width: 300px">
      <a-avatar :size="64"> 
      </a-avatar>
      <p>业主： <a-tag color="green">{{ selectedHouse['被腾退人'] }}</a-tag></p>
      <p>村落： <a-tag color="orange">{{ Village[selectedHouse['村落简称']] }}</a-tag></p>
    </a-card>
  </a-drawer>
</a-layout>
</template>
<style lang="less" scoped>
.page.home{
  >.header{
    >.title{
      color:white;
      display:none;
    }
  }
  >.container{
    >.menus{
      float:left;
      margin-right:10px;
    }
  }
}
</style>