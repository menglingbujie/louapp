<script setup>
import {nextTick, ref} from "vue"
import {get} from "lodash"
import {starCardID} from "@/utils/index"
const props = defineProps({
    title:String,
    neighbor:{
        type:Object,
        default:{},
    }
});
const uname = props.neighbor&&props.neighbor["被腾退人"]||"无";
const uid = props.neighbor&&props.neighbor["身份证号"]||"无";
const country = props.neighbor&&props.neighbor["村落简称"]||"无";
const no = props.neighbor&&props.neighbor["选房序号"]||"无";
const house = props.neighbor&&props.neighbor["选房信息"]||"无";
const info = ref({
    uname,
    uid,
    country,
    no,
    house
})
const hasNeighbor = ref(!!props.neighbor);
const cunMap = {
    BS:"北四位",
    NS:"南四位",
    XY:"晓幼营",
    CL:"常乐寺",
    XS:"西石府",
    SW:"上万"
}
function displayCun(cun){
    return get(cunMap,cun)
}
function displayUID(uid){
    return starCardID(uid);
}
// console.log("===",props.neighbor)
</script>
<template>
<a-card  :title="props.title" class="user self">
    <a-empty v-if="!hasNeighbor"></a-empty>
    <a-list v-else>
        <a-list-item class="item">
            <label>姓名：</label>
            <p>{{info.uname}}</p>
        </a-list-item>
        <!-- <a-list-item class="item uid">
            <label>身份证号：</label>
            <p>{{displayUID(info.uid)}}</p>
        </a-list-item> -->
        <a-list-item class="item">
            <label>村落：</label>
            <p>{{displayCun(info.country)}}</p>
        </a-list-item>
        <!-- <a-list-item class="item">
            <label>选房序号：</label>
            <p>{{info.no}}</p>
        </a-list-item> -->
        <!-- <a-list-item class="item">
            <label>选房信息：</label>
            <p>{{info.house}}</p>
        </a-list-item> -->
    </a-list>
</a-card>
</template>
<style lang="less" scoped>
.item{
    width:200px;
    display:flex;
    align-items:center;
    >p{margin:0;padding:0;}
}
</style>