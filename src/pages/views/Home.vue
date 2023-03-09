<script setup>
import loumap from "@/modal/qlhlou.min"
import {ref} from "vue";
import {forEach,cloneDeep,set} from "lodash";
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
// 地块归位
function tidyLouArea(arr){
  let loumap15=[];
  let loumap18=[];
  let loumap22=[];
  let loumap47=[];
  let loumap48=[];
  let loumap59=[];
  let loumap63=[];
  let loumap69=[];
  let loumap73=[];
  let loumap79=[];
  forEach(arr,(u)=>{
    forEach(u.lous,(l)=>{
      switch(l.area){
        case "15":{loumap15.push(parseUser(u,l));}break;
        case "18":{loumap18.push(parseUser(u,l));}break;
        case "22":{loumap22.push(parseUser(u,l));}break;
        case "47":{loumap47.push(parseUser(u,l));}break;
        case "48":{loumap48.push(parseUser(u,l));}break;
        case "59":{loumap59.push(parseUser(u,l));}break;
        case "63":{loumap63.push(parseUser(u,l));}break;
        case "69":{loumap69.push(parseUser(u,l));}break;
        case "73":{loumap73.push(parseUser(u,l));}break;
        case "79":{loumap79.push(parseUser(u,l));}break;
      }
    })
  })

  console.log("===lou 15==",loumap15);
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
  </a-layout-content>
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