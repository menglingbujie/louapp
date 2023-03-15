<script setup>
import {ref} from "vue";
import gloumap from "@/modal/area69"
import {countLou,displayCun,parseLouByArea} from "@/utils/index";

import { useHouseInfo } from '@/utils/use/useHouseInfo';
const { getHouseInfo } = useHouseInfo();
const land = '69'; //地块

const isLoading =ref(true);
parseLouByArea(gloumap,land);
isLoading.value=false;

const firstlout = gloumap.slice(0,4);
const secondlout = gloumap.slice(4,5);
const thirdlout = gloumap.slice(5,8);
const fourlout = gloumap.slice(8);
const {_total3,_total2,_total1,_total3done,_total2done,_total1done} = countLou(gloumap);

function displayDoor(door){
  if(!door){return;}
  if(!door.user){
    // console.log("===door==",door);
    return door.door+"<br>未选<br>未知村";
  }
  // console.log("===",door.user);
  return door.door+"<br>"+door.user["被腾退人"]+"<br>"+displayCun(door.user["村落简称"]);
}
</script>
<template>
<div class="area">
  <a-spin class="loading" :spinning="isLoading" size="large" />
  <h2 class="title">69号地</h2>
  <ul class="list">
      <li class="item">
          <label>三居总共：{{ _total3 }}套，已选{{ _total3done }}套，未选{{ (_total3-_total3done) }}套</label>
      </li>
      <li class="item">
          <label>两居总共：{{ _total2 }}套，已选{{ _total2done }}套，未选{{ (_total2-_total2done) }}套</label>
      </li>
      <li class="item">
          <label>一居总共：{{ _total1 }}套，已选{{ _total1done }}套，未选{{ (_total1-_total1done) }}套</label>
      </li>
  </ul>
  <div class="parts four">
    <div class="part" v-for="(p,index) in firstlout" :class="'p'+index"  :key="'part1-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts one">
    <div class="part" v-for="(p,index) in secondlout" :class="'p'+index"  :key="'part2-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts three">
    <div class="part" v-for="(p,index) in thirdlout" :class="'p'+index"  :key="'part3-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts four">
    <div class="part" v-for="(p,index) in fourlout" :class="'p'+index"  :key="'part4-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style lang="less" scoped>
@import "@/assets/less/color";
.area{
  display:flex;
  flex-direction: column;
  >.parts{
    &.one{
      >.part{width:100%;}
    }
    &.four{
      >.part{width:20%;}
    }
    >.part{
      min-height:200px;
      // padding:0 10%;
      float:left;
      width:30%;
      text-align: center;
    }
  }
  .part{
    margin-top:10px;
    >.list{
      display:flex;
      justify-content: center;
      >.unit{
        >.list{
          >.door{
            display:flex;
            padding:0 6px;
            >.d{
              min-width:68px;
              padding:0 8px;
              border:1px solid @color_black;
              &.t1{
                background-color:@color_one;
              }
              &.t2{background-color:@color_two;}
              &.t3{
                background-color:@color_three;
              }
              &.selected{
                background-color:white;
                color:black;
                position:relative;
              }
            }
          }
        }
      }
    }
  }
}
</style>