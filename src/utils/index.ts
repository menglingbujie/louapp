import {forEach} from "lodash";
export function countLou(arr){
  let _total3 = 0;
  let _total2 = 0;
  let _total1 = 0;
  let _total3done = 0;
  let _total2done = 0;
  let _total1done = 0;

  forEach(arr,(v)=>{
    forEach(v.units,(u)=>{
      forEach(u,(d)=>{
        forEach(d,(m)=>{
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
  return {
    _total3,
    _total2,
    _total1,
    _total3done,
    _total2done,
    _total1done,
  }
}

export function countAllLou(arr){
  const {
    _total3,
    _total2,
    _total1,
    _total3done,
    _total2done,
    _total1done
  } = countLou(arr);
  const total = _total3+_total2+_total1,
    alldone = _total3done+_total2done+_total1done;
  return {
    _total3,
    _total2,
    _total1,
    _total3done,
    _total2done,
    _total1done,
    total,
    alldone,
  };
}