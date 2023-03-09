<script setup>
import loumap from "@/modal/qlhlou.min"
import {reactive,ref} from "vue";
import {get,set,find,forEach,toNumber} from "lodash";

import CMPRelations from "@/components/Relations.vue";
import {filterUniq} from "@/utils/index";

const filter = reactive({
    indexLou:"", // 0005
    username:"", // 李明
    house:"", // 47-1-1-101
})

// 是否找到当前用户
const hasFind = ref(false);
// 找到邻居列表，渲染用的
const listNeighbor = ref([]);

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
    listNeighbor.value=[];
    let currentUsers = [];
    // console.log("===search==",filter.indexLou)
    // 选房序号是唯一的可以精确匹配
    if(filter.indexLou){
        // let ret = find(list,{"选房序号":filter.indexLou});
        forEach(listFilterLou,(v)=>{
            let louindex=v["选房序号"],ret = parseInt(louindex)==filter.indexLou?true:false;
            // 找到匹配人就存入
            if(!!ret){
                currentUsers=[v];
            }
        });
    }else if(filter.username){
        // 被腾退人可能多个，需要模糊匹配
        forEach(listFilterLou,(v)=>{
            let ret = v["被腾退人"]==filter.username?true:false;
            // 找到匹配人就存入
            if(!!ret){
                currentUsers.push(v);
            }
        });
    }else if(filter.house){
        forEach(listFilterLou,(v)=>{
            // console.log("==vv=",v);
            // let ret = v["被腾退人"]==filter.username?true:false;
            let ret = find(v.lous,{"unitID":filter.house})
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

</script>
<template>
<div class="page search">
    <div class="filter">
        <div class="field">
            <label>选房序号：</label>
            <a-input allowClear v-model:value="filter.indexLou" placeholder="请输入选房序号" />
        </div>
        <div class="field">
            <label>被腾退人：</label>
            <a-input allowClear v-model:value="filter.username" placeholder="请输入被腾退人姓名" />
        </div>
        <div class="field">
            <label>房间地址：</label>
            <a-input allowClear v-model:value="filter.house" placeholder="如：47-1-1-101" />
        </div>
        <div class="field">
            <a-button type="primary" @click.stop="doSearch">搜索</a-button>
            <p class="tip">(*优先匹配选房序号)</p>
        </div>
    </div>
    <div class="content">
        <a-empty description="未找到相关数据" v-if="!hasFind" />
        <div class="result" v-else>
            <CMPRelations :neighbors="listNeighbor" />
        </div>
    </div>
</div>
</template>
<style lang="less" scoped>
.page.search{
    height:100%;
    >.filter{
        display:flex;
        padding:0 10px;
        >.field{
            margin-right:10px;
            display:flex;
            align-items: center;
            >.tip{padding:0;margin:0;margin-left:10px;color:grey;}
            >label{margin-right:5px;min-width:80px;}
            &:last-child{margin-right:0;}
        }
    }
    >.content{
        background-color:whitesmoke;
        margin-top:10px;
        display:flex;
        justify-content: center;
        width:100%;
        >.result{
            background-color:whitesmoke;
        }
    }
}
</style>