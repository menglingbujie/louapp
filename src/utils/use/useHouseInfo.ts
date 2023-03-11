import { ref } from 'vue';
import qlhlou from '@/modal/qlhlou.min';

/** 房子信息
 * @last-modified 2023/03/08
 * @param {object} {land, p, unit, door} */
export const useHouseInfo = () => {
  let info = ref();

  function getHouseInfo(param: {land: string, p: string, unit: string, door: string}){
    const { land, p, unit, door } = param
    let searchHouse = `00${land}地块：${p.part}号楼 ${unit}单元${door.door}`;
    qlhlou.list.forEach((item) => {
      if(item['第1轮选房信息'] && item['第1轮选房信息'].includes(searchHouse) ){
        info.value = item;
      }
      if(item['第2轮选房信息'] && item['第2轮选房信息'].includes(searchHouse) ){
        info.value = item;
      }
      if(item['选房信息'] && item['选房信息'].includes(searchHouse) ){
        info.value = item;
      }
    })
    // console.log('----getHouseInfo--info-->', info);
    let data = { type: 'house', title: searchHouse,  content: info.value }
    parent.postMessage(JSON.stringify(data), '*')
  }
  return { info, getHouseInfo }
}
