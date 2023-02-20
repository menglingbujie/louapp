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
import {countAllLou} from "@/utils/index"
import {concat} from "lodash"
const {
  _total3,
  _total2,
  _total1,
  _total3done,
  _total2done,
  _total1done,
  total,
  alldone
} = countAllLou(concat(loumap15,loumap18,loumap22,loumap47,loumap48,loumap59,loumap63,loumap69,loumap73,loumap79));
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
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  >.warn{
    color:red;
  }
}
</style>