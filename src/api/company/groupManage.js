import fetch from '../../utils/fetch'

/**
 * 获取所有网点的信息
 */
export function getAllOrgInfo() {
  return fetch.get('/api-system/system/org/v1/tree')
}

/**
 * 根据组织id获取列表
 */
export function getOrgId(id) {
  return fetch.get('/api-system/system/org/v1/'+id)
}

/**
 * 保存组织机构数据
 */
export function postOrgSaveDate(data) {
  return fetch.post('/api-system/system/org/v1/save/', data)
}

// 特殊字段判断
export function isEmpty(o) {
  if (o === undefined) {
    return
  }
  if (o == null) {
    return
  }
  return o
}

/*转换时间戳方法
使用例子：alert(dateFormat_1(1525283454000))
 */
export function fmtDate(longTypeDate){
  var dateType = "";
  var date = new Date();
  date.setTime(longTypeDate);
  dateType += date.getFullYear();  //年
  dateType += "-" + getMonth(date); //月
  dateType += "-" + getDay(date);  //日
  return dateType;
}
//返回 01-12 的月份值
export function getMonth(date){
  var month = "";
  month = date.getMonth() + 1; //getMonth()得到的月份是0-11
  if(month<10){
    month = "0" + month;
  }
  return month;
}
//返回01-30的日期
export function getDay(date){
  var day = "";
  day = date.getDate();
  if(day<10){
    day = "0" + day;
  }
  return day;
}
