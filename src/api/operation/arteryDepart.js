import fetch from '../../utils/fetch'

/**
 * order/load/v1/list
 *根据配载类型组织机构查询到货列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postSelectLoadMainInfoList(params) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList', params).then(res => {
    return res.data || {}
  })
}

/**
 * order/load/v1/loadDepart
 * 配载发车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putLoadDepart(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/loadDepart?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}

/**
 * /order/load/v1/cancelLoadTruck
 取消装车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putCancelLoadTruck(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/cancelLoadTruck?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}

/**
 * /order/load/v1/cancelLoadTruck
 /order/load/v1/cancelLoadDepart
 取消配载发车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putCancelLoadDepart(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/cancelLoadDepart/?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}

//合同
//查看
export function getLookContract(loadId) {
  return fetch.get('/api-order/order/load/v1/contract/' + loadId)
}

//修改
// {
//   "loadId":"修改的配载id",
//   "nomineeCompany":"委托方",
//   "contractName":"合同名称",
//   "contractNo":"合同编号",
//   "remark":"备注"
// }

export function getEditContract(params) {
  return fetch.put('/api-order/order/load/v1/contract', params)
}

/**
 *************************************************
 *
 *                    智能配载--干线
 * 
 * ***********************************************
 */

/**
 * 智能配载_获得标准车型列表
 * @param  {[type]} params [description]
 */
export function getIntnteSMainInfoList(params) {
  return fetch.get('/api-order/aitransport/tmsstandardcar/v1/', params).then(res => {
    return res.data
  })
}
/**
 * 智能配载 得到配载方案
 * @param  {[type]} params [description]
 */
export function getIntnteInit(params) {
  return fetch.post('/api-order/aitransport/intelligen/v1/init', params).then(res => {
    return res.data
  })
}
/**
 * 智能配载_批量插入(把配载插入放到一个数组中)
 * @param  {[type]} params [description]
 */
export function postIntnteSmartLoad(params) {
  return fetch.post('/api-order/order/load/v1/smartLoad', params)
}

//系统车型获取车型列表
//sign 1查询系统车型 2查询当前网点自定义车型 3查询系统车型+当前网点自定义车型
export function getIntnteCarInfo(orgid, sign) {
  return fetch.get('/api-order/aitransport/pzcarinfotms/v1/getCarInfo/?orgid=' + orgid + '&sign=' + sign, ).then(res => {
    return res.data
  })
}

//_添加自定义车型
export function postPzcarinfotms(params) {
  return fetch.post('/api-order/aitransport/pzcarinfotms/v1/', params)
}

//_修改自定义车型
export function putPzcarinfotms(params) {
  return fetch.put('/api-order/aitransport/pzcarinfotms/v1/', params)
}

//_删除自定义车型
export function deletePzcarinfotms(id) {
  return fetch.delete('/api-order/aitransport/pzcarinfotms/v1/' + id)
}
// 查询方案列表
export function postLoadSchemeList(params) {
  return fetch.post('/api-order/aitransport/tmssmartloadscheme/v1/loadSchemeList/', params).then(res => {
    return res.data
  })
}
// 修改保存方案
export function putUpdateScheme(params) {
  return fetch.put('/api-order/aitransport/tmssmartloadscheme/v1/updateScheme/', params).then(res => {
    return res.data
  })
}
// 删除当前方案组
export function deleteScheme(params) {
  return fetch.delete('/api-order/aitransport/tmssmartloadscheme/v1/deleteScheme/?schemeGroup=' + params.schemeGroup + '&orgid=' + params.orgid).then(res => {
    return res.data
  })
}
// 删除当前方案
export function deleteSchemeById(params) {
  return fetch.delete('/api-order/aitransport/tmssmartloadscheme/v1/deleteSchemeById/?schemeId=' + params.schemeId).then(res => {
    return res.data
  })
}
// 新增保存方案
export function postSaveScheme(params) {
  return fetch.post('/api-order/aitransport/tmssmartloadscheme/v1/saveScheme/', params).then(res => {
    return res.data
  })
}
// 查看当前方案组
export function selectSchemeGroupDetail(params) {
  return fetch.get('/api-order/aitransport/tmssmartloadscheme/v1/selectSchemeGroupDetail?schemeGroup=' + params.schemeGroup + '&orgid=' + params.orgid).then(res => {
    return res.data
  })
}
// 到达网点查询城市及运单信息 新增智能时的弹框
export function getRepertoryInfo(arriveOrgid) {
  return fetch.get('/api-order/aitransport/tmssmartloadscheme/v1/getRepertoryInfo?arriveOrgid=' + arriveOrgid).then(res => {
    return res.data
  })
}