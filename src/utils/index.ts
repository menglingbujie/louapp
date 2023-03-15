import {forEach,set,toString,toNumber,get,find,cloneDeep} from "lodash";
import {Village} from "@/utils/enum";
import qlhloumap from "@/modal/qlhlou.min"
// 定义每个地块楼的排列顺序
function parseUser(u:any,l:any){
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
    let _room1 = Math.floor(_numRoom/100),
    _room2 = _numRoom%100;
    // console.log(`=${_lou}=${_unit}=${(_room1-1)}`,lous[_lou-1].units[_unit-1])

    // unit需要跟lou的part做匹配
    const _lou = find(lous,{part:_numLou});
    // console.log("====lou==",user,"===",_lou,"===",_numLou,"===",_numUnit,"===",_room1,"===",_room2)
    // if(!_lou){return;}

    const _arrUnits = _lou.units[_numUnit-1];
    // console.log("==units==",_arrUnits)

    if(!_arrUnits){
      return;
    }
    const _louCeng = _arrUnits.length;
    // if(_louCeng<_room1){return;}
    set(_arrUnits[_louCeng-_room1][_room2-1],"user",user);
  })
  // console.log("===user===",lous);
}

// 地块归位
function tidyLouArea(arr,loumap,area){
  let nbsArr:any[]=[];
  forEach(arr,(u)=>{
    forEach(u.lous,(l)=>{
      // console.log("====",l.area,"===",area);
      if(l.area!=toNumber(area)){
        return;
      }
      nbsArr.push(parseUser(u,l));
    })
  })

  // 往原始排序里添加user字段
  doInsertUserToLou(nbsArr,loumap);
}
// 根据地块整理数据
export function parseLouByArea(loumap,area){
  const _list =qlhloumap.list||[];
  // 滤重
  const _lous = filterUniq(_list);
  // console.log("====lous==",_lous)

  // 用户地块归位
  tidyLouArea(_lous,loumap,area);
}

export function displayCun(cun){
  return get(Village,cun)||"未知村";
}
export function starCardID(idstr){
  return idstr.replace(/(\w{6})\w*(\w{4})/,'$1********$2');
}
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

/**
 * 把选房信息拆分为房屋数组信息
 * 如那个地块，几号楼，几单元，几室
 */
export function parseLouInfo(str){
  // 分号分割楼数
  let _listLou:any[] = [];
  const _lous = str.split(";");
  // console.log("===",_lous);
  forEach(_lous,(l)=>{
      if(!l){return;}
      
      // 冒号分割地块，空格分割楼-单元，”单元“分割单元和室
      let lou = {area:"",lou:"",unit:"",room:"",unitID:"",roomType:""},
          _splLou = l.split("："),
          _area = parseInt(_splLou[0]),
          _units = _splLou[1];
      lou.area=toString(_area);
      if(_units){
          const _splitLou = _units.split(" "),
              _house=parseInt(_splitLou[0]),
              _splitUnit=_splitLou[1].split("单元"),
              _roomType = _splitLou[2];

          lou.lou=toString(_house);

          let _unit = toNumber(_splitUnit[0]),
          _room = toNumber(_splitUnit[1]);

          lou.unit = _unit;
          lou.room = _room;
          lou.roomType=_roomType;

          set(lou,`key_${_area}_${_house}_${_unit}_${_room}`)
          set(lou,"unitID",`${_area}-${_house}-${_unit}-${_room}`)
          /**
           * 邻居的unitID
           * UID:up unit id 上楼
           * DID: down unit id 下楼
           * NID: neighbor unit id 邻居
          */  
          set(lou,"unitUID",`${_area}-${_house}-${_unit}-${_room+100}`)
          set(lou,"unitDID",`${_area}-${_house}-${_unit}-${_room-100}`)
          let _nroom=0;
          if(!(_room%2)){  
              _nroom = _room-1;
          }else{
              _nroom = _room+1;
          }
          set(lou,"unitNID",`${_area}-${_house}-${_unit}-${_nroom}`)
      }
      _listLou.push(lou);
  })
  // console.log("===",_listLou);
  return _listLou;
}

// 过滤重复并增加lous的数组
export function filterUniq(list){
  let _lous:any[]=[];
  /**
   * 过滤重复的, 优先取选房套数多的
   * 这里重复包括同一个用户多次选择的，还有同名不同户的情况
   * 如果是同一个人需要合并选房信息
   */
  let _usermap = new Map();
  forEach(list,(u)=>{
      let _tu = _usermap.get(u["选房序号"]),
          _cpu=null;
      // 没有重复则加入map
      if(!!_tu){
          const _infolou=_tu["第一轮选房信息"]||"",
              _infolou2=_tu["第2轮选房信息"]||"",
              _infolou3=_tu["第1轮选房信息"]||"";
          // console.log("==tu=",_tu,"===",_infolou,"==",_infolou2,"===",_infolou3)
          if(!_infolou||!_infolou2||!_infolou3){
              if(!_tu["选房信息"]){
                  _tu["选房信息"] = "";
              }
              if(_infolou3){
                  _tu["选房信息"]+=_infolou3;
                  delete _tu["第1轮选房信息"];
              }
              if(_infolou2){
                  _tu["选房信息"]+=_infolou2;
                  delete _tu["第2轮选房信息"];
              }
              if(_infolou){
                  _tu["选房信息"]+=_infolou;
                  delete _tu["第一轮选房信息"];
              }
          }

          _cpu = _tu;

          // console.log("==2==",_tu,"===",u);
      }else{
          if(!u["选房信息"]){
              u["选房信息"] = "";
          }
          const _infolou=u["第一轮选房信息"]||"",
              _infolou2=u["第2轮选房信息"]||"",
              _infolou3=u["第1轮选房信息"]||"";
          if(_infolou3){
              u["选房信息"]+=_infolou3;
              delete u["第1轮选房信息"];
          }
          if(_infolou2){
              u["选房信息"]+=_infolou2;
              delete u["第2轮选房信息"];
          }
          if(_infolou){
              u["选房信息"]+=_infolou;
              delete u["第一轮选房信息"];
          }
          _cpu=u;
          // console.log("==1=====",u);
      }
      // 格式化选房信息
      set(_cpu,"lous",parseLouInfo(_cpu["选房信息"]));
      _usermap.set(u["选房序号"],_cpu)
  })
  // console.log("==map==",list,"===",_usermap);
  _usermap.forEach((u)=>{
      _lous.push(u);
  })
  return _lous;
}
