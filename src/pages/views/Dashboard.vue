<script setup>
import { Village } from '@/utils/enum';

import {ref} from "vue";

const currentMenu = ref([""]);
const currentUrl = ref("");
function gotoLou(url){
  currentUrl.value=url;
}
// 根据地块显示楼的情况
function doShowLouStatus(area){
  currentMenu.value = ['a'+area];
  gotoLou(`/louapp/dist/lou.html#/${area}`);
}

const visible = ref(false);
let selectedHouse = ref("");
let selectedTitle = ref("");

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

doShowLouStatus(15);
</script>
<template>
<a-layout class="page dashboard">
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
      <keep-alive>
        <iframe 
        frameborder="0"
        class="ifr" 
        :src="currentUrl"></iframe>
      </keep-alive>
    </div>
  </a-layout-content>
  <!-- 抽屉 -->
  <a-drawer
    v-model:visible="visible"
    style="color: red"
    title="House Information"
    placement="right"
    :mask="false">
    <a-card 
      :title="selectedTitle" 
      :bordered="false" 
      style="width: 300px">
      <a-avatar :size="64"></a-avatar>
      <p>业主： <a-tag color="green">{{ selectedHouse['被腾退人'] }}</a-tag></p>
      <p>村落： <a-tag color="orange">{{ Village[selectedHouse['村落简称']] }}</a-tag></p>
    </a-card>
  </a-drawer>
</a-layout>
</template>
<style lang="less" scoped>
.page.dashboard{
  >.container{
    >.menus{
      float:left;
      margin-right:10px;
    }
    >.content{
      overflow:hidden;
      max-height:100%;height:100%;
      overflow-y:hidden;
      background-color:whitesmoke;
      >.ifr{
        border:none;outline:none;
        width:100%;height:100%;
      }
    }
  }
}
</style>