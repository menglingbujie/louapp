<script setup>
import qlhloumap from "@/modal/qlhlou.min"
import loumap from "@/modal/area22"
import {countLou,displayCun,filterUniq} from "@/utils/index";

import {forEach,cloneDeep,set,toNumber,find} from "lodash";

import { useHouseInfo } from '@/utils/use/useHouseInfo';
const { getHouseInfo } = useHouseInfo();
const land = '22'; //地块

const firstlout = loumap[0];
const secondlout = loumap[1];
const thirdlout = loumap[2];
const fourlout = loumap[3];

const loumapother = loumap.slice(4);
const {_total3,_total2,_total1,_total3done,_total2done,_total1done} = countLou(loumap);

function displayDoor(door){
  if(!door){return;}
  if(!door.user){
    // console.log("===door==",door);
    return door.door+"<br>未选<br>未知村";
  }
  // console.log("===",door.user);
  return door.door+"<br>"+door.user["被腾退人"]+"<br>"+displayCun(door.user["村落简称"]);
}
// 定义每个地块楼的排列顺序
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
  // console.log("==users==",users);
  // console.log("==lous==",lous);
  forEach(users,(user)=>{
    const _unitID = user.unitID,
      _unitObj = _unitID.split("-"),
      _numLou = toNumber(_unitObj[1]),
      _numUnit = toNumber(_unitObj[2]),
      _numRoom = toNumber(_unitObj[3]);

    // console.log("===usr=="+_lou+"=="+_unit+"--"+_room)
    let _room1 = parseInt(_numRoom/100),
    _room2 = parseInt(_numRoom%100);
    // console.log(`=${_lou}=${_unit}=${(_room1-1)}`,lous[_lou-1].units[_unit-1])

    // unit需要跟lou的part做匹配
    const _lou = find(lous,{part:_numLou});
    // console.log("====",_lou,"===",_numLou)
    // console.log("===",_lou,"===",_numLou,"===",_unit)
    const _arrUnits = _lou.units[_numUnit-1];
    // console.log("====",_arrUnits)
    if(_arrUnits){
      const _louCeng = _arrUnits.length;
      // set(_arrUnits[_louCeng-_room1][_room2-1],"user",user);
      set(_arrUnits[_louCeng-_room1][_room2-1],"user",user);
    }
  })
  // console.log("===user===",lous);
}
// 地块归位
function tidyLouArea(arr){
  let nbsArr=[];
  forEach(arr,(u)=>{
    forEach(u.lous,(l)=>{
      if(l.area=="22"){
        nbsArr.push(parseUser(u,l));
      }
    })
  })

  // 往原始排序里添加user字段
  doInsertUserToLou(nbsArr,loumap);
}
// 根据地块整理数据
function parseLouByArea(){
  const _list = qlhloumap.list||[];
  // 滤重
  const _lous = filterUniq(_list);
  // console.log("===",_lous)

  // 用户地块归位
  tidyLouArea(_lous);
}
parseLouByArea();
</script>
<template>
<div class="area a15">
  <h2 class="title">22号地</h2>
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
  <div class="parts double">
    <div class="part">
      <h3 class="tpart">#2号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in secondlout.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{secondlout.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: secondlout, unit: secondlout.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: secondlout, unit: secondlout.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part">
      <h3 class="tpart">#1号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in firstlout.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{firstlout.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: firstlout, unit: firstlout.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: firstlout, unit: firstlout.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parts double">
    <div class="part">
      <h3 class="tpart">#3号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in thirdlout.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{thirdlout.units.length-idx+1}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: thirdlout, unit: thirdlout.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: thirdlout, unit: thirdlout.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part">
      <h3 class="tpart">#4号楼</h3>
      <div class="list">
        <div class="unit" v-for="u,idx in fourlout.units.reverse()" :key="'unit-'+idx">
          <h4 class="tunit">{{fourlout.units.length-idx}}单元</h4>
          <div class="list">
            <div class="door" v-for="door,didx in u" :key="'door'+didx">
              <div class="d" :class="[{'selected':!!door[1].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: fourlout, unit: fourlout.units.length-idx, door: door[1]})"
              v-html="displayDoor(door[1])"></div>
              <div class="d" :class="[{'selected':!!door[0].user?true:false},'t'+firstlout.type]"
              @click="getHouseInfo({land, p: fourlout, unit: fourlout.units.length-idx, door: door[0]})"
              v-html="displayDoor(door[0])"></div>
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
    &.double{
      >.part{
        border:none;
        padding:0 10%;
        width:30%;
      }
    }
    >.part{
      min-height:200px;
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
              min-width:64px;
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