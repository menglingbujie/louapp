<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router"
const currentNav = ref<string>("dashboard");
const route = useRoute();
// console.log("===route==",route.params);
const userkey = route.params.userkey;
if(userkey){
  currentNav.value="dashboard/"+userkey;
}
function gotoLink(url:string){
  if(url=="dashboard"){
    if(userkey){
      url=url+"/"+userkey;
    }
  }
  console.log("====",url);
  currentNav.value=url;
}
</script>
<template>
<a-layout class="page home">
  <a-layout-header class="header">
    <h2 class="title">京西棚改选房</h2>
    <nav class="navs">
      <span class="nav" :class="{'current':currentNav=='dashboard'}" @click.stop="gotoLink('dashboard')">选房概览</span>
      <span class="nav" :class="{'current':currentNav=='search-lou'}" @click.stop="gotoLink('search-lou')">找邻居</span>
      <span class="nav" :class="{'current':currentNav=='area-total'}" @click.stop="gotoLink('area-total')">选房统计</span>
      <span class="nav" :class="{'current':currentNav=='area-total-by-floor'}" @click.stop="gotoLink('area-total-by-floor')">剩余房源</span>
    </nav>
  </a-layout-header>
  <a-layout-content class="container">
    <iframe :src="'/louapp/dist/#/'+currentNav" class="ifrhome"></iframe>
  </a-layout-content>
</a-layout>
</template>
<style lang="less" scoped>
.page.home{
  >.header{
    display:flex;
    >.title{
      color:white;
    }
    >.navs{
      overflow:hidden;
      margin-left:30px;
      >.nav{
        cursor: pointer;
        color:white;
        font-size:14px;
        display:inline-block;
        margin-left:10px;
        font-weight: 600;
        &:first-child{margin-left:0;}
        &.current{
          color:aquamarine;
        }
      }
    }
  }
  >.container{
    >.ifrhome{
      width:100%;height:100%;
      border:none;outline:none;
      padding:0;margin:0;
    }
  }
}
</style>