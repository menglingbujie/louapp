<script setup>
import loumap from "@/modal/qlhlou"
import {reactive,ref} from "vue";
import {find} from "lodash";
// console.log("===",loumap);
const cunMap = {
    BS:"北四位",
    NS:"南四位",
    XY:"晓幼营",
    CL:"常乐寺",
    XS:"西石府",
}
const list = loumap.list||[];
const filter = reactive({
    indexLou:"",
    username:"",
    userID:"",
})

const hasFind = ref(false);

function doSearch(){
    let currentUser = null;
    console.log("===search==",filter.indexLou)
    if(filter.indexLou){
        currentUser = find(list,{"选房序号":filter.indexLou});
    }else if(filter.username){
        currentUser = find(list,{"被腾退人":filter.username});
        
    }
    console.log("==ret 2=",currentUser)
    hasFind.value=!!currentUser?true:false;
    // 找到当前用户后再二次匹配周边邻居
}
</script>
<template>
<div class="page search">
    <div class="filter">
        <div class="field">
            <label>选房序号：</label>
            <a-input v-model:value="filter.indexLou" placeholder="请输入选房序号" />
        </div>
        <div class="field">
            <label>被腾退人：</label>
            <a-input v-model:value="filter.username" placeholder="请输入被腾退人姓名" />
        </div>
        <div class="field">
            <a-button type="primary" @click.stop="doSearch">搜索</a-button>
            <p class="tip">(*优先匹配选房序号)</p>
        </div>
    </div>
    <div class="content">
        <a-empty description="未找到相关数据" v-if="!hasFind" />
        <div class="result" v-else>
            Result
        </div>
    </div>
</div>
</template>
<style lang="less" scoped>
.page.search{
    >.filter{
        display:flex;
        padding:0 10px;
        >.field{
            margin-right:10px;
            display:flex;
            align-items: center;
            >.tip{padding:0;margin:0;margin-left:10px;color:grey;}
            >label{margin-right:10px;width:100px;}
            &:last-child{margin-right:0;}
        }
    }
    >.content{
        border:1px solid red;
        margin-top:10px;
        display:flex;
        justify-content: center;
    }
}
</style>