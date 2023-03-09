<script setup>
import loumap from "@/modal/qlhlou.min"
import {reactive,ref} from "vue";
import {get,set,find,forEach,toNumber} from "lodash";

import CMPMobileRelations from "@/components/mobile/Relations.vue";
import {filterUniq} from "@/utils/index";

const filter = ref({
  indexLou:"", // 0005
  username:"", // 李明
  house:"", // 47-1-1-101
})

// 是否找到当前用户
const hasFind = ref(false);
// 找到邻居列表，渲染用的
const listNeighbor = ref([]);
const isShowSearchPro=ref(false);
function showSearchPro(){
  isShowSearchPro.value = true;
}
function hideSearchPro(){
  isShowSearchPro.value = false;
}

// 过滤好的选房列表
const listFilterLou =filterUniq(loumap.list||[]);

function doFind(unitid){
    let _result = null;
    forEach(listFilterLou,(l)=>{
        let ret = find(l.lous,{unitID:unitid})
        if(ret){
            _result = l;
            return;
        }
    })
    // console.log("==result==",unitid,"==",_result);
    return _result;
}
// 查找邻居
function findNeighbor(users){
    // console.log("===users==",users);
    let _result = [];
    forEach(users,(u)=>{
        forEach(u.lous,(lou)=>{
            let _UNID = get(lou,"unitUID"),
                _DNID = get(lou,"unitDID"),
                _NNID = get(lou,"unitNID"),
                _UID=get(lou,"unitID"),
                _roomType=get(lou,"roomType");
            // 通过unitID找邻居
            // console.log("==v==",_UID,"==",_UNID,"==",_DNID,"==",_NNID);
            const _userUp = doFind(_UNID);
            const _userDown = doFind(_DNID);
            const _userNB = doFind(_NNID);
            _result.push({lou:_UID+" "+_roomType,self:u,up:_userUp,down:_userDown,nb:_userNB});
            // console.log("====",_userUp,"==",_userDown,"==",_userNB)
        })
    })
    return _result;
}
// 找到当前用户
function doSearch(){
  hideSearchPro();
  listNeighbor.value=[];
  let currentUsers = [],_filter = filter.value;
  // console.log("===search==",_filter)
  // 选房序号是唯一的可以精确匹配
  if(_filter.indexLou){
      // let ret = find(list,{"选房序号":_filter.indexLou});
      forEach(listFilterLou,(v)=>{
          let louindex=v["选房序号"],ret = parseInt(louindex)==_filter.indexLou?true:false;
          // 找到匹配人就存入
          if(!!ret){
              currentUsers=[v];
          }
      });
  }else if(_filter.username){
      // 被腾退人可能多个，需要模糊匹配
      forEach(listFilterLou,(v)=>{
          let ret = v["被腾退人"]==_filter.username?true:false;
          // 找到匹配人就存入
          if(!!ret){
              currentUsers.push(v);
          }
      });
  }else if(_filter.house){
      forEach(listFilterLou,(v)=>{
          // console.log("==vv=",v);
          // let ret = v["被腾退人"]==_filter.username?true:false;
          let ret = find(v.lous,{"unitID":_filter.house})
          // console.log("===",ret);
          // // 找到匹配人就存入
          if(!!ret){
              currentUsers.push(v);
          }
      });
  }
  // console.log("==ret 1=",currentUsers)
  // 是否找到
  hasFind.value=(!!currentUsers&&currentUsers.length>0)?true:false;
  // 找到当前用户后再二次匹配周边邻居

  const nbs = findNeighbor(currentUsers);
  // console.log("==nbs===",currentUsers,"===",nbs);

  if(!nbs||nbs.length<=0) return;

  listNeighbor.value = nbs;

  // console.log("====list==",listNeighbor)
}

doSearch();
function doSearchCancel(){
  filter.value={
    indexLou:"",
    username:"",
    house:"",
  }
  hideSearchPro();
}
</script>
<template>
<div class="page_m search">
  <div class="panel search_pro" :class="{'show':isShowSearchPro}">
    <div class="header">
      <h3 class="title">高级检索</h3>
      <button class="btn close" data-type="icon" @click.stop="hideSearchPro"></button>
    </div>
    <div class="form">
      <p class="tip">* 优先匹配选房序号, 如用以下搜索需要先清空选房序号</p>
      <div class="field first">
          <label>被腾退人：</label>
          <input v-model="filter.username" placeholder="请输入被腾退人姓名" />
      </div>
      <div class="field">
          <label>房间地址：</label>
          <input v-model="filter.house" placeholder="如：47-1-1-101" />
      </div>
      <div class="field">
        <button class="btn" @click.stop="doSearch">确定</button>
        <button class="btn" @click.stop="doSearchCancel">取消</button>
      </div>
    </div>
  </div>
  <div class="filter">
      <div class="field">
        <label>选房序号：</label>
        <input v-model="filter.indexLou" placeholder="请输入选房序号" />
      </div>
      <div class="field">
        <button class="btn search" data-type="icon" @click.stop="doSearch"></button>
        <button class="btn search_pro" data-type="icon" @click.stop="showSearchPro"></button>
      </div>
  </div>
  <div class="content">
    <a-empty class="empty" description="未找到相关数据" v-if="!hasFind" />
    <div class="result" v-else>
      <CMPMobile-Relations :neighbors="listNeighbor" />
    </div>
  </div>
</div>
</template>
<style lang="less" scoped>
.page_m.search{
  *{box-sizing: border-box;}
  input,button{
    border:none;
    outline:none;
  }
  button,p{
    padding:0;margin:0;
    background:none;
  }
  button{
    font-size:.14rem;
    position: relative;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    padding: .04rem .15rem;
    border-radius: .04rem;

    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    &[data-type='icon']{
      padding:0;
      border:1px solid rgba(0,0,0,0.52);
    }
  }
  input{
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: .08rem;
    padding: .05rem .1rem;
    font-size: .14rem;
    &:focus{
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
    }
  }
  >.panel.search_pro{
    position:fixed;z-index:999;
    width:60%;height:100%;
    background-color:#eee;
    right:-100%;top:0;
    transition:all .3s linear;
    &.show{
      right:0;
    }
    >.header{
      position:relative;
      border-bottom:1px solid rgba(#aaa,.4);
      >.title{
        text-align:center;
        font-size:.14rem;
        padding:.1rem 0;
        width:100%;
      }
      >.btn.close{
        position:absolute;right:.15rem;top:.1rem;
        font-size:0;padding:0;
        border:none;
        width:.2rem;height:.2rem;
        background:url("data:image/png;base64,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") no-repeat center;
        background-size:cover;
      }
    }
    >.form{
      display:flex;
      flex-direction: column;
      >.tip{padding:0;margin:0;color: red;text-align:left;padding:.1rem;}
      >.field{
        margin-top:.2rem;
        padding:0 .14rem;
        text-align: left;
        &.first{margin-top:0;}
        >label{
          font-size:.14rem;
          display:block;
        }
        >input{width:100%;}
        >.btn{
          &:last-child{margin-left:.15rem;}
        }
      }
    }
  }
  >.filter{
    background-color:white;
    position:fixed;
    top:0;left:0;
    z-index:99;
    width:100%;
    height:.46rem;
    display:flex;
    padding:0 .1rem;
    justify-content: center;
    border-bottom:1px solid lightgray;
    >.field{
      margin-right:.1rem;
      display:flex;
      align-items: center;
      >.tip{padding:0;margin:0;margin-left:.1rem;color:grey;}
      >label{
        text-align:center;
        margin-right:.05rem;
      }
      >label,>input{font-size:.14rem;}
      &:last-child{margin-right:0;}
      >.btn{
        width:.24rem;height:.24rem;
        &:last-child{margin-left:.1rem;}
        &.search{
          background:url("data:image/png;base64,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") no-repeat center;
          background-size:cover;
        }
        &.search_pro{
          background:url("data:image/png;base64,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") no-repeat center;
          background-size:cover;
        }
      }
    }
  }
  >.content{
    padding-top:.48rem;
    display:flex;
    flex-direction: column;
    >.result{
      width:100%;
      padding:0 .1rem .1rem;
      background-color:whitesmoke;
    }
  }
}
</style>