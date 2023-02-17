<script setup>
import loumap from "@/modal/area48"
import _ from "lodash";
let _total3 = 0;
let _total2 = 0;
let _total1 = 0;
let _total3done = 0;
let _total2done = 0;
let _total1done = 0;
function countLout(arr){
    _.forEach(arr,(v)=>{
        _.forEach(v.units,(u)=>{
            _.forEach(u,(d)=>{
                _.forEach(d,(m)=>{
                    if(!!m.type){
                      if(m.type==3){
                        _total3++;
                      }else if(m.type==2){
                          _total2++;
                      }else if(m.type==1){
                          _total1++;
                      }
                    }else{
                      if(v.type==3){
                        _total3++;
                      }else if(v.type==2){
                        _total2++;
                      }else if(v.type==1){
                        _total1++;
                      }
                    }
                    if(m.status==1){
                        if(v.type==3||m.type==3){
                            _total3done++;
                        }else if(v.type==2||m.type==2){
                            _total2done++;
                        }else if(v.type==1||m.type==1){
                            _total1done++;
                        }              
                    }
                })
            })
        })
    })
}
countLout(loumap);
</script>
<template>
<div class="area a15">
  <h2 class="title">48号地</h2>
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
  <div class="parts">
    <div class="part" :class="'p'+index" v-for="(p,index) in loumap" :key="'part-'+index">
      <h3 class="tpart">#{{p.part}}号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in p.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{p.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <template v-if="!!door[3]">
                <div class="d" :class="[{'selected':(door[3].status==1)?true:false},'t'+(door[3].type||p.type)]">{{door[3].door}}</div>
              </template>
              <template v-if="!!door[2]">
                <div class="d" :class="[{'selected':(door[2].status==1)?true:false},'t'+(door[2].type||p.type)]">{{door[2].door}}</div>
              </template>
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
    >.part{
      float:left;
      width:50%;
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