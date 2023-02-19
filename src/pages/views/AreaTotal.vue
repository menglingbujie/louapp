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
                        if(v.type==1||m.type==1){
                          _total1done++;
                        }else if(v.type==2||m.type==2){
                          _total2done++;
                        }else if(v.type==3||m.type==3){
                          _total3done++;
                        }              
                    }
                })
            })
        })
    })
}
countLout(loumap15);
countLout(loumap18);
countLout(loumap22);
countLout(loumap47);
countLout(loumap48);
countLout(loumap59);
countLout(loumap69);
countLout(loumap63);
countLout(loumap73);
countLout(loumap79);
const total =_total3+_total2+_total1, alldone=_total3done+_total2done+_total1done;
const updateDataTime=ref(import.meta.env.VITE_UPDATE_DATA_TIME);
</script>
<template>
<div class="area_total">
    <h3>总共10个地块共{{total}}套, 已选{{alldone}}，未选{{total-alldone}}，以下汇总统计信息({{updateDataTime}} by 梦令布孑)</h3>
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
</div>
</template>
<style lang="less" scoped>
.area_total{
    >.warn{
        color:red;
    }
}
</style>