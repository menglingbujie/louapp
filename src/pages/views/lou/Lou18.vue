<script setup>
import {ref} from "vue";
import gloumap from "@/modal/area18"
import {countLou,displayCun,parseLouByArea} from "@/utils/index";

import { useHouseInfo } from '@/utils/use/useHouseInfo';
const { getHouseInfo } = useHouseInfo();
const land = '18'; //地块

const isLoading =ref(true);
parseLouByArea(gloumap,land);
isLoading.value=false;

// console.log("===loumap==",loumap);
const firstlout = gloumap[0];
const louother = gloumap.slice(1,gloumap.length-3);
const lastlout = gloumap.slice(gloumap.length-3);
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
<div class="area a15">
  <a-spin class="loading" :spinning="isLoading" size="large" />
  <h2 class="title">18号地</h2>
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
  <div class="parts one">
    <div class="part">
      <h3 class="tpart">#1号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in firstlout.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{firstlout.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+(door[1].type||firstlout.type)]"
                @click="getHouseInfo({land, p: firstlout, unit: firstlout.units.length-idx, door: door[1]})" 
                v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+(door[0].type||firstlout.type)]"
                @click="getHouseInfo({land, p: firstlout, unit: firstlout.units.length-idx, door: door[0]})" 
                v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts two">
    <div class="part" v-for="(p,index) in louother" :class="'p'+index"  :key="'part-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <template v-if="!!door[3]">
                <div class="d" :class="[{'selected':!!door[3].user?true:false},'t'+(door[3].type||p.type)]"
                  @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[3]})" 
                  v-html="displayDoor(door[3])"></div>
              </template>
              <template v-if="!!door[2]">
                <div class="d" :class="[{'selected':!!door[2].user?true:false},'t'+(door[2].type||p.type)]"
                @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[2]})" 
                v-html="displayDoor(door[2])"></div>
              </template>
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
    <div class="part" v-for="(p,index) in lastlout" :class="'p'+index"  :key="'part-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[1]})" v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+p.type]"
              @click="getHouseInfo({land, p, unit: p.units.length-idx, door: door[0]})" v-html="displayDoor(door[0])"></div>
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
  min-width:1920px;
  display:flex;
  flex-direction: column;
  >.parts{
    &.one{
      >.part{
        padding:0;
        border:none;
        width:100%;
      }
    }
    &.two{
      >.part{
        padding:0;
        border:none;
        width:50%;
      }
    }
    &.three{
      >.part{
        border:none;
        padding:0;
        &:nth-child(1){width:40%;}
        &:nth-child(2){width:30%;}
        &:nth-child(3){width:30%;}
      }
    }
    >.part{
      min-height:200px;
      float:left;
      padding:0 10%;
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
              &.t2{
                background-color:@color_two;
              }
              &.t3{
                background-color: @color_three;
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