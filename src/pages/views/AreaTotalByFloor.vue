<script setup>
import {ref} from "vue"
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
import _ from "lodash";

let unselectArr=ref([]);
function countLout(arr,area){
  unselectArr.value = [];
  let _obj = {
    area:("所属地块"+area), // 地块
    lou:[],
  }
  _.forEach(arr,(v)=>{
    // console.log("===v==",v);
    let _lobj={
      lou:v.part+"号楼",
      units:[],
    }
    _.forEach(v.units,(u,idx)=>{
      // console.log("===d==",d);
      let _uobj = {
        unit:(idx+1)+"单元",
        floor1:[],
        floor2:[],
        floor3:[]
      }
      _.forEach(u,(d)=>{
        _.forEach(d,(m)=>{
          // 统计已选套数
          if(m.status!=1){
            // 未选的
            if(v.type==1||m.type==1){
              _uobj.floor1.push(m.door);
            }else if(v.type==2||m.type==2){
              _uobj.floor2.push(m.door);
            }else if(v.type==3||m.type==3){
              _uobj.floor3.push(m.door);
            }
          }
        })
      })

      _lobj.units.push(_uobj);
    })
    _obj.lou.push(_lobj);
  })
  unselectArr.value.push(_obj);
  // console.log("====",_obj);
}
const currentMenu = ref(["a15"]);
function doCountLou(area){
  currentMenu.value = ['a'+area];
  switch(area){
    case 15:{
      countLout(loumap15,15);
      break;
    }
    case 18:{
      countLout(loumap18,18);
      break;
    }
    case 22:{
      countLout(loumap22,22);
      break;
    }
    case 47:{
      countLout(loumap47,47);
      break;
    }
    case 48:{
      countLout(loumap48,48);
      break;
    }
    case 59:{
      countLout(loumap59,59);
      break;
    }
    case 63:{
      countLout(loumap63,63);
      break;
    }
    case 69:{
      countLout(loumap69,69);
      break;
    }
    case 73:{
      countLout(loumap73,73);
      break;
    }
    case 79:{
      countLout(loumap79,79);
      break;
    }
  }
}
doCountLou(15)

const activeKeys = ref(['house3','house2','house1']);
function doCollapse(col){
  activeKeys.value=[col]
}
function doCollapseAll(){
  activeKeys.value = ['house3','house2','house1'];
}
</script>
<template>
<a-layout class="area_total">
  <!-- <a-layout-header class="header">
    <h3 class="title">未选情况统计</h3>
  </a-layout-header> -->
  <a-layout-content class="container">
    <a-menu class="menus" :selectedKeys="currentMenu">
      <a-menu-item key="a15" @click.stop="doCountLou(15)">#15地块</a-menu-item>
      <a-menu-item key="a18" @click.stop="doCountLou(18)">#18地块</a-menu-item>
      <a-menu-item key="a22" @click.stop="doCountLou(22)">#22地块</a-menu-item>
      <a-menu-item key="a47" @click.stop="doCountLou(47)">#47地块</a-menu-item>
      <a-menu-item key="a48" @click.stop="doCountLou(48)">#48地块</a-menu-item>

      <a-menu-item key="a59" @click.stop="doCountLou(59)">#59地块</a-menu-item>
      <a-menu-item key="a63" @click.stop="doCountLou(63)">#63地块</a-menu-item>
      <a-menu-item key="a69" @click.stop="doCountLou(69)">#69地块</a-menu-item>
      <a-menu-item key="a73" @click.stop="doCountLou(73)">#73地块</a-menu-item>
      <a-menu-item key="a79" @click.stop="doCountLou(79)">#79地块</a-menu-item>
    </a-menu>
    <div class="content">
      <div class="section" v-for="ar,idx in unselectArr" :key="'unselect-'+idx">
        <h4 class="title">#{{ar.area}}</h4>
        <a-button class="btn" type="primary" size="small" @click.stop="doCollapseAll">全部展开</a-button>
        <a-collapse :activeKey="activeKeys">
          <a-collapse-panel key="house3" header="三居" @click.stop="doCollapse('house3')">
            <a-list class="lou" v-for="lou,lidx in ar.lou" :key="'lou'+lidx">
              <a-list class="unit" v-for="u,uidx in lou.units" :key="'unit'+uidx"  v-show="(!!u.floor3&&u.floor3.length>0)">
                <!-- <div v-for="f,fidx in u.floor3" :key="'floor'+fidx">
                  <a-list-item v-if="f=='201'||f=='202'||f=='101'||f=='102'">低层：{{!!f?lou.lou+"-"+u.unit+"-"+f:"无"}}</a-list-item>
                  <a-list-item v-else>高层：{{(!!f)?lou.lou+"-"+u.unit+"-"+f:"无"}}</a-list-item>
                </div> -->
                <a-list-item>{{(!!u.floor3&&u.floor3.length>0)?lou.lou+"-"+u.unit+"-"+u.floor3.toString():"无"}}</a-list-item>
              </a-list>
            </a-list>
          </a-collapse-panel>
          <a-collapse-panel key="house2" header="两居" @click.stop="doCollapse('house2')">
            <a-list class="lou" v-for="lou,lidx in ar.lou" :key="'lou'+lidx">
              <a-list class="unit" v-for="u,uidx in lou.units" :key="'unit'+uidx" v-show="(!!u.floor2&&u.floor2.length>0)">
                <a-list-item>{{(!!u.floor2&&u.floor2.length>0)?lou.lou+"-"+u.unit+"-"+u.floor2.toString():"无"}}</a-list-item>
              </a-list>
            </a-list>
          </a-collapse-panel>
          <a-collapse-panel key="house1" header="一居" @click.stop="doCollapse('house1')">
            <a-list class="lou" v-for="lou,lidx in ar.lou" :key="'lou'+lidx">
              <a-list class="unit" v-for="u,uidx in lou.units" :key="'unit'+uidx"  v-show="(!!u.floor1&&u.floor1.length>0)">
                <a-list-item>{{(!!u.floor1&&u.floor1.length>0)?lou.lou+"-"+u.unit+"-"+u.floor1.toString():"无"}}</a-list-item>
              </a-list>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </a-layout-content>
</a-layout>
</template>
<style lang="less" scoped>
.area_total{
  position:fixed;top:0;left:0;
  width:100%;height:100%;
  .header{
    >.title{
      color:whitesmoke;
    }
  }
  .container{
    >.menus{
      float:left;
      margin-right:10px;
    }
    >.content{
      overflow:hidden;
      max-height:100%;height:100%;
      overflow-y:auto;
      >.section{
        text-align: left;
        >.title{
          display:block;
          padding:5px 0;
        }
        >.btn{
          margin:5px 0;
        }
      }
    }
  }
}
</style>