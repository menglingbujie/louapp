<script setup>
import loumap from "@/modal/area79"
import {countLou} from "@/utils/index"
const firstlout = loumap.slice(0,3);
const loumapother = loumap.slice(3);
const {_total3,_total2,_total1,_total3done,_total2done,_total1done} = countLou(loumap);
</script>
<template>
<div class="area">
  <h2 class="title">79号地</h2>
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
  <div class="parts third">
    <div class="part" :class="'p'+index" v-for="(p,index) in firstlout" :key="'part-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':(door[1].status==1)?true:false},'t'+(door[1].type||p.type)]">{{door[1].door}}</div>
              <div class="d" :class="[{'selected':(door[0].status==1)?true:false},'t'+(door[0].type||p.type)]">{{door[0].door}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts">
    <div class="part" :class="'p'+index" v-for="(p,index) in loumapother" :key="'part-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':(door[1].status==1)?true:false},'t'+(door[1].type||p.type)]">{{door[1].door}}</div>
              <div class="d" :class="[{'selected':(door[0].status==1)?true:false},'t'+(door[0].type||p.type)]">{{door[0].door}}</div>
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
    &.third{
      >.part{
        padding:0;
        width:30%;
      }
    }
    >.part{
      min-height:200px;
      padding:0 10%;
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